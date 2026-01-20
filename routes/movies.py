from flask import Blueprint, jsonify, request
from extensions import db
from models import Movie, Genre
from flask_jwt_extended import jwt_required

movies_bp = Blueprint("movies", __name__, url_prefix="/movies")


@movies_bp.route("", methods=["GET"])
def get_movies():
    movies = Movie.query.all()
    return jsonify([
        {
            "id": m.id,
            "title": m.title,
            "description": m.description,
            "release_year": m.release_year,
            "duration": m.duration,
            "rating_avg": m.rating_avg,
            "genres": [g.name for g in m.genres]
        } for m in movies
    ])


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
        duration=data.get("duration")
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
