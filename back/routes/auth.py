import random
from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db, jwt_denylist
from models import User
from flask_jwt_extended import create_access_token, get_jwt, jwt_required
from datetime import datetime, timedelta
from flask_mail import Message
from extensions import mail
import threading
import time

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

# Temporary storage for pending registrations (in production, use Redis/database)
pending_registrations = {}

# Cleanup expired registrations every 5 minutes
def cleanup_expired_registrations():
    while True:
        current_time = datetime.utcnow()
        expired_keys = [email for email, data in pending_registrations.items()
                       if current_time > data['expires']]
        for email in expired_keys:
            del pending_registrations[email]
        time.sleep(300)  # Check every 5 minutes

# Start cleanup thread
cleanup_thread = threading.Thread(target=cleanup_expired_registrations, daemon=True)
cleanup_thread.start()


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data or not data.get("username") or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Missing fields"}), 400

    # Check if user already exists
    if User.query.filter((User.username == data["username"]) | (User.email == data["email"])).first():
        return jsonify({"error": "User already exists"}), 409

    # Check if there's already a pending registration for this email
    if data["email"] in pending_registrations:
        # Remove expired pending registration
        if datetime.utcnow() > pending_registrations[data["email"]]['expires']:
            del pending_registrations[data["email"]]
        else:
            return jsonify({"error": "Verification email already sent. Please check your email."}), 409

    # Generate verification code
    code = str(random.randint(100000, 999999))
    expires = datetime.utcnow() + timedelta(minutes=10)

    # Store registration data temporarily
    pending_registrations[data["email"]] = {
        'username': data["username"],
        'email': data["email"],
        'password_hash': generate_password_hash(data["password"]),
        'code': code,
        'expires': expires,
        'last_sent': datetime.utcnow()
    }

    # Send email (handle failures gracefully)
    try:
        print(f"Sending email to: {data['email']}")
        print(f"MAIL_USERNAME: {current_app.config.get('MAIL_USERNAME')}")
        print(f"MAIL_DEFAULT_SENDER: {current_app.config.get('MAIL_DEFAULT_SENDER')}")

        msg = Message("Verify Your Email", recipients=[data["email"]])
        msg.body = f"Your verification code is: {code}"
        mail.send(msg)
        print("Email sent successfully!")
    except Exception as e:
        print(f"Email sending failed: {e}")
        # For development, we'll continue even if email fails
        # In production, you might want to handle this differently

    return jsonify({"message": "Registration initiated. Check your email for verification code.", "code": code}), 200


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Missing fields"}), 400

    user = User.query.filter_by(email=data["email"]).first()

    if not user or not check_password_hash(user.password_hash, data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token": access_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }), 200

@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    jwt_denylist.add(jti)

    return jsonify({"message": "Logged out & token revoked"}), 200


@auth_bp.route("/verify-email", methods=["POST"])
def verify_email():
    data = request.get_json()
    email = data.get("email")
    code = data.get("code")

    # Check if this is a pending registration
    if email in pending_registrations:
        registration_data = pending_registrations[email]

        # Check if code is correct
        if registration_data['code'] != code:
            return jsonify({"error": "Invalid code"}), 400

        # Check if code is expired
        if datetime.utcnow() > registration_data['expires']:
            del pending_registrations[email]  # Clean up expired registration
            return jsonify({"error": "Code expired"}), 400

        # Code is valid - create the user account
        user = User(
            username=registration_data['username'],
            email=registration_data['email'],
            password_hash=registration_data['password_hash'],
            is_verified=True
        )

        db.session.add(user)
        db.session.commit()

        # Clean up the pending registration
        del pending_registrations[email]

        return jsonify({"message": "Email verified successfully. Account created."}), 200

    # Check if this is an existing user trying to verify
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "No pending registration found"}), 404

    if user.is_verified:
        return jsonify({"message": "Already verified"}), 200

    if user.email_code != code:
        return jsonify({"error": "Invalid code"}), 400

    if user.email_code_expires < datetime.utcnow():
        return jsonify({"error": "Code expired"}), 400

    user.is_verified = True
    user.email_code = None
    user.email_code_expires = None
    db.session.commit()

    return jsonify({"message": "Email verified successfully"}), 200
    
@auth_bp.route("/resend-code", methods=["POST"])
def resend_code():
    data = request.get_json()
    email = data.get("email")

    # Check if there's a pending registration
    if email in pending_registrations:
        registration_data = pending_registrations[email]

        # Check if we recently sent a code (wait at least 10 seconds)
        if 'last_sent' in registration_data:
            time_since_sent = datetime.utcnow() - registration_data['last_sent']
            if time_since_sent < timedelta(seconds=10):
                remaining = 10 - time_since_sent.total_seconds()
                return jsonify({"error": f"Please wait {remaining:.0f} seconds before requesting a new code"}), 429

        # Generate new code
        code = str(random.randint(100000, 999999))
        registration_data['code'] = code
        registration_data['expires'] = datetime.utcnow() + timedelta(minutes=10)
        registration_data['last_sent'] = datetime.utcnow()

        # Send email
        try:
            msg = Message("New Verification Code", recipients=[email])
            msg.body = f"Your new code is: {code}"
            mail.send(msg)
        except Exception as e:
            print(f"Email sending failed: {e}")

        return jsonify({"message": "New code sent", "code": code}), 200

    # Check if this is an existing unverified user
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "No pending registration found"}), 404

    if user.is_verified:
        return jsonify({"message": "Account already verified"}), 200

    # For existing users, allow resending after 10 seconds
    # Since codes expire in 10 minutes, if remaining time > 9.5 minutes, less than 10 seconds have passed
    if user.email_code_expires:
        remaining_time = user.email_code_expires - datetime.utcnow()
        if remaining_time > timedelta(minutes=9, seconds=50):
            remaining_seconds = 10 - (timedelta(minutes=10) - remaining_time).total_seconds()
            return jsonify({"error": f"Please wait {remaining_seconds:.0f} seconds before requesting a new code"}), 429

    code = str(random.randint(100000, 999999))
    user.email_code = code
    user.email_code_expires = datetime.utcnow() + timedelta(minutes=10)
    db.session.commit()

    try:
        msg = Message("New Verification Code", recipients=[email])
        msg.body = f"Your new code is: {code}"
        mail.send(msg)
    except Exception as e:
        print(f"Email sending failed: {e}")

    return jsonify({"message": "New code sent"}), 200
