import datetime
from flask import Blueprint, jsonify, request, send_from_directory
from sqlalchemy import func
from extensions import db
from models import Movie, Genre, WatchHistory
from flask_jwt_extended import get_jwt_identity, jwt_required

movies_bp = Blueprint("movies", __name__, url_prefix="/movies")


@movies_bp.route("", methods=["GET"])
def get_movies():
    q = request.args.get("q", "")
    genre = request.args.get("genre")
    page = request.args.get("page", 1, type=int)
    limit = request.args.get("limit", 10, type=int)

    query = Movie.query

    # 🔍 Search by title
    if q:
        query = query.filter(Movie.title.ilike(f"%{q}%"))

    # 🎭 Filter by genre
    if genre:
        query = query.join(Movie.genres).filter(Genre.name == genre)

    # 📄 Pagination
    pagination = query.paginate(page=page, per_page=limit, error_out=False)
    movies = pagination.items

    return jsonify({
        "page": page,
        "limit": limit,
        "total": pagination.total,
        "pages": pagination.pages,
        "results": [
            {
                "id": m.id,
                "title": m.title,
                "description": m.description,
                "release_year": m.release_year,
                "duration": m.duration,
                "rating_avg": m.rating_avg,
                "cover_img": m.cover_img,
                "genres": [g.name for g in m.genres],
            } for m in movies
        ]
    })

@movies_bp.route("/watch/<int:movie_id>", methods=["GET"])
@jwt_required()
def watch_movie(movie_id):
    user_id = get_jwt_identity()
    movie = Movie.query.get_or_404(movie_id)

    # If POST, update last watched position
    if request.method == "POST":
        data = request.get_json()
        position = data.get("last_position", 0)

        history = WatchHistory.query.filter_by(user_id=user_id, movie_id=movie_id).first()
        if not history:
            history = WatchHistory(user_id=user_id, movie_id=movie_id, last_position=position)
            db.session.add(history)
        else:
            history.last_position = position
            history.watched_at = datetime.utcnow()
        db.session.commit()
        return jsonify({"msg": "Progress saved"}), 200

    # GET: log watch if not exists
    history = WatchHistory.query.filter_by(user_id=user_id, movie_id=movie_id).first()
    if not history:
        history = WatchHistory(user_id=user_id, movie_id=movie_id)
        db.session.add(history)
        db.session.commit()

    # Serve the video file
    if not movie.video_url:
        return {"msg": "Video not available"}, 404

    folder = "static/videos"
    filename = movie.video_url.split("/")[-1]
    return send_from_directory(folder, filename)

@movies_bp.route("/<int:movie_id>", methods=["GET"])
def get_movie(movie_id):
    m = Movie.query.get_or_404(movie_id)
    return jsonify({
        "id": m.id,
        "title": m.title,
        "description": m.description,
        "release_year": m.release_year,
        "duration": m.duration,
        "rating_avg": m.rating_avg,
        "cover_img": m.cover_img,
        "genres": [g.name for g in m.genres]
    })


@movies_bp.route("", methods=["POST"])
@jwt_required()
def create_movie():
    data = request.get_json()

    movie = Movie(
        title=data["title"],
        description=data.get("description"),
        release_year=data.get("release_year"),
        duration=data.get("duration"),
        video_url=data.get("video_url"),
        cover_img= data.get("cover_img")
    )

    genre_names = data.get("genres", [])
    for name in genre_names:
        genre = Genre.query.filter_by(name=name).first()
        if not genre:
            genre = Genre(name=name)
        movie.genres.append(genre)

    db.session.add(movie)
    db.session.commit()

    return jsonify({"message": "Movie created"}), 201
@movies_bp.route("/trending", methods=["GET"])
def trending_movies():
    movies = db.session.query(Movie)\
        .join(WatchHistory)\
        .group_by(Movie.id)\
        .order_by(func.count(WatchHistory.id).desc())\
        .limit(10).all()

    return jsonify([
        {
            "id": m.id,
            "title": m.title,
            "rating_avg": m.rating_avg,
            "genres": [g.name for g in m.genres]
        } for m in movies
    ])
@movies_bp.route("/top-rated", methods=["GET"])
def top_rated_movies():
    movies = Movie.query.order_by(Movie.rating_avg.desc()).limit(10).all()

    return jsonify([
        {
            "id": m.id,
            "title": m.title,
            "rating_avg": m.rating_avg,
            "genres": [g.name for g in m.genres]
        } for m in movies
    ])
