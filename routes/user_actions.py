from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models import Rating, WatchHistory, Watchlist

actions_bp = Blueprint("actions", __name__, url_prefix="/actions")

@actions_bp.route('/rate', methods=["POST"])
@jwt_required()
def rate_movie():
    user_id = int(get_jwt_identity())
    data = request.get_json()

    rating = Rating.query.filter_by(user_id=user_id, movie_id=data["movie_id"]).first()
    if rating:
        rating.score = data["score"]
    else:
        rating = Rating(user_id=user_id, movie_id=data["movie_id"], score=data["score"])
        db.session.add(rating)

    db.session.commit()
    return jsonify({"message": "Rating saved"}), 200


@actions_bp.route("/watch", methods=["POST"])
@jwt_required()
def watch_movie():
    user_id = int(get_jwt_identity())
    data = request.get_json()

    entry = WatchHistory(user_id=user_id, movie_id=data["movie_id"])
    db.session.add(entry)
    db.session.commit()

    return jsonify({"message": "Watch history added"}), 201

@actions_bp.route("/watchlist", methods=["POST"])
@jwt_required()
def add_watchlist():
    user_id = int(get_jwt_identity())
    data = request.get_json()

    exists = Watchlist.query.filter_by(user_id=user_id, movie_id=data["movie_id"]).first()
    if exists:
        return jsonify({"message": "Already in watchlist"}), 200

    entry = Watchlist(user_id=user_id, movie_id=data["movie_id"])
    db.session.add(entry)
    db.session.commit()

    return jsonify({"message": "Added to watchlist"}), 201