from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Movie, Rating, WatchHistory
from extensions import db
from sqlalchemy import func

rec_bp = Blueprint("recommendations", __name__, url_prefix="/recommend")


@rec_bp.route("/", methods=["GET"])
@jwt_required()
def get_recommendations():
    user_id = int(get_jwt_identity())

    # 1️⃣ Get user’s high-rated movies
    liked = Rating.query.filter(
        Rating.user_id == user_id,
        Rating.score >= 4
    ).all()

    if not liked:
        # Cold start: recommend top movies
        top_movies = Movie.query.limit(10).all()
        return jsonify([m.to_dict() for m in top_movies])

    liked_movie_ids = [r.movie_id for r in liked]

    # 2️⃣ Find genres user likes
    genres = db.session.query(Movie.genre)\
        .filter(Movie.id.in_(liked_movie_ids))\
        .group_by(Movie.genre).all()

    genre_list = [g[0] for g in genres]

    # 3️⃣ Recommend movies from same genres user hasn’t seen
    watched = WatchHistory.query.filter_by(user_id=user_id).all()
    watched_ids = [w.movie_id for w in watched]

    recommendations = Movie.query.filter(
        Movie.genre.in_(genre_list),
        ~Movie.id.in_(watched_ids)
    ).limit(10).all()

    return jsonify([m.to_dict() for m in recommendations])
    
@rec_bp.route("/collab", methods=["GET"])
@jwt_required()
def collaborative_recommendations():
    user_id = get_jwt_identity()

    # 1️⃣ Movies current user liked
    liked = Rating.query.filter(
        Rating.user_id == user_id,
        Rating.score >= 4
    ).all()

    if not liked:
        top_movies = Movie.query.order_by(Movie.rating_avg.desc()).limit(10).all()
        return jsonify([m.to_dict() for m in top_movies])

    liked_movie_ids = [r.movie_id for r in liked]

    # 2️⃣ Other users who liked same movies
    similar_users = Rating.query.filter(
        Rating.movie_id.in_(liked_movie_ids),
        Rating.user_id != user_id,
        Rating.score >= 4
    ).all()

    similar_user_ids = list(set(r.user_id for r in similar_users))

    if not similar_user_ids:
        return jsonify([])

    # 3️⃣ Movies those users liked
    recs = Rating.query.filter(
        Rating.user_id.in_(similar_user_ids),
        Rating.score >= 4,
        ~Rating.movie_id.in_(liked_movie_ids)
    ).all()

    rec_movie_ids = list(set(r.movie_id for r in recs))

    # 4️⃣ Exclude watched
    watched = WatchHistory.query.filter_by(user_id=user_id).all()
    watched_ids = [w.movie_id for w in watched]

    movies = Movie.query.filter(
        Movie.id.in_(rec_movie_ids),
        ~Movie.id.in_(watched_ids)
    ).limit(10).all()

    return jsonify([m.to_dict() for m in movies])
