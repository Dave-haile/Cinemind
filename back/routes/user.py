from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User, WatchHistory, Rating

user_bp = Blueprint("user", __name__, url_prefix="/user")


@user_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(user.to_dict())


@user_bp.route("/stats", methods=["GET"])
@jwt_required()
def stats():
    user_id = get_jwt_identity()

    watched_count = WatchHistory.query.filter_by(user_id=user_id).count()
    rated_count = Rating.query.filter_by(user_id=user_id).count()
    liked_count = Rating.query.filter(Rating.user_id == user_id, Rating.score >= 4).count()

    return jsonify({
        "watched": watched_count,
        "rated": rated_count,
        "liked": liked_count
    })
