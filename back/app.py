import os
from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, jwt, mail
from flask_migrate import Migrate
from routes.auth import auth_bp
from routes.movies import movies_bp
from routes.recommendations import rec_bp
from routes.user import user_bp
from routes.user_actions import actions_bp

# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for frontend requests
    CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

    db.init_app(app)
    jwt.init_app(app)
    mail.init_app(app)
    Migrate(app, db)

    app.register_blueprint(auth_bp)
    app.register_blueprint(movies_bp)
    app.register_blueprint(actions_bp)
    app.register_blueprint(rec_bp)
    app.register_blueprint(user_bp)

    @app.route("/")
    def index():
        return "<h1>This is the Backend <a href='http://localhost:3000'> Click here </a> to go to the frontend </h1> "

    @app.route("/test-email")
    def test_email():
        from flask_mail import Message
        try:
            msg = Message("Test Email", recipients=["davehaile44@gmail.com"])
            msg.body = "This is a test email to verify email configuration."
            mail.send(msg)
            return "Email sent successfully!"
        except Exception as e:
            return f"Email failed: {str(e)}"

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
