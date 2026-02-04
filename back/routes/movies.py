from datetime import datetime
import json
from lib.generateID import generate_unique_public_id
from flask import Blueprint, jsonify, redirect, request, send_from_directory
from sqlalchemy import func
from extensions import db
from models import Movie, Genre, WatchHistory
from flask_jwt_extended import get_jwt_identity, jwt_required

movies_bp = Blueprint("movies", __name__, url_prefix="/movies")

@movies_bp.route('/all', methods=["GET"])
def get_all_movies():
    movies = Movie.query.all()
    
    movies_list = []
    for movie in movies:
        movie_data = {
            "id": movie.id,
            "title": movie.title,
            "description": movie.description,
            "release_year": movie.release_year,
            "duration": movie.duration,
            "rating_avg": movie.rating_avg,
            "video_url": movie.video_url,
            "cover_img": movie.cover_img,
            "public_id": movie.public_id,
            "trailerUrl": movie.trailerUrl,
            "backdrop": movie.backdrop,
            "director": movie.director,
            "cast": json.loads(movie.cast) if movie.cast else [],
            "created_at": movie.created_at.isoformat() if movie.created_at else None,
            "genres": [genre.name for genre in movie.genres]
        }
        movies_list.append(movie_data)
    
    return jsonify(movies_list)

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
        query = query.join(Movie.genres).filter(Genre.name == genre)  # pyright: ignore[reportArgumentType]

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
                "video_url": m.video_url,
                "cover_img": m.cover_img,
                "public_id": m.public_id,
                "trailerUrl": m.trailerUrl,
                "backdrop": m.backdrop,
                "director": m.director,
                "cast": json.loads(m.cast) if m.cast else [],
                "created_at": m.created_at.isoformat() if m.created_at else None,
                "genres": [genre.name for genre in m.genres]
            } for m in movies
        ]
    })

@movies_bp.route("/watch/<string:public_id>", methods=["GET", "POST"])
@jwt_required()
def watch_movie(public_id):
    user_id = get_jwt_identity()
    movie = Movie.query.filter_by(public_id=public_id).first_or_404()
    movie_id = movie.id
    print("movie", movie)
    print("movie id", movie_id)

    # If POST, update last watched position
    if request.method == "POST":
        data = request.get_json()
        position = data.get("last_position", 0)

        history = WatchHistory.query.filter_by(user_id=user_id, movie_id=movie_id).first()
        if not history:
            history = WatchHistory(user_id=user_id, movie_id=movie_id, last_position=position)  # pyright: ignore[reportCallIssue]
            db.session.add(history)
        else:
            history.last_position = position
            history.watched_at = datetime.utcnow()  # pyright: ignore[reportAttributeAccessIssue]
        db.session.commit()
        return jsonify({"msg": "Progress saved"}), 200

    # GET: log watch if not exists
    history = WatchHistory.query.filter_by(user_id=user_id, movie_id=movie_id).first()
    if not history:
        history = WatchHistory(user_id=user_id, movie_id=movie_id)  # pyright: ignore[reportCallIssue]
        db.session.add(history)
        db.session.commit()

    # Serve the video file
    if not movie.video_url:
        return {"msg": "Video not available"}, 404

    # Check if it's a remote URL (starts with http/https)
    if movie.video_url.startswith(('http://', 'https://')):
        return jsonify({
            "id": movie.id,
                "title": movie.title,
                "description": movie.description,
                "release_year": movie.release_year,
                "duration": movie.duration,
                "rating_avg": movie.rating_avg,
                "video_url": movie.video_url,
                "cover_img": movie.cover_img,
                "public_id": movie.public_id,
                "trailerUrl": movie.trailerUrl,
                "backdrop": movie.backdrop,
                "director": movie.director,
                "cast": json.loads(movie.cast) if movie.cast else [],
                "created_at": movie.created_at.isoformat() if movie.created_at else None,
                "genres": [genre.name for genre in movie.genres]
        })

    # Otherwise, serve as local file
    folder = "static/videos"
    filename = movie.video_url.split("/")[-1]
    # Return the video file with a 200 OK so the frontend <video> element
    # (proxied through /api/watch) can stream it correctly.
    return send_from_directory(folder, filename), 200

@movies_bp.route("/<string:public_id>", methods=["GET"])
def get_movie(public_id):
    # Try to find by public_id first, then by id if public_id is numeric
    m = Movie.query.filter_by(public_id=public_id).first()
    if not m and public_id.isdigit():
        m = Movie.query.filter_by(id=int(public_id)).first()
    if not m:
        return {"error": "Movie not found"}, 404
    return jsonify({
        "id": m.id,
        "title": m.title,
        "description": m.description,
        "release_year": m.release_year,
        "duration": m.duration,
        "rating_avg": m.rating_avg,
        "video_url": m.video_url,
        "cover_img": m.cover_img,
        "public_id": m.public_id,
        "trailerUrl": m.trailerUrl,
        "backdrop": m.backdrop,
        "director": m.director,
        "cast": json.loads(m.cast) if m.cast else [],
        "created_at": m.created_at.isoformat() if m.created_at else None,
        "genres": [genre.name for genre in m.genres]
    })

@movies_bp.route("", methods=["POST"])
@jwt_required()
def create_movie():
    data = request.get_json()
    
    # Check required fields
    if not data.get("title"):
        return jsonify({"error": "Title is required"}), 400
    
    # Prepare cast data - convert list to JSON string
    cast_data = data.get("cast", [])
    if isinstance(cast_data, list):
        cast_json = json.dumps(cast_data)
    else:
        cast_json = None
    
    # Create movie with all available fields
    movie = Movie(
        title=data["title"],  # pyright: ignore[reportCallIssue]
        description=data.get("description"),  # pyright: ignore[reportCallIssue]
        release_year=data.get("release_year"),  # pyright: ignore[reportCallIssue]
        duration=data.get("duration"),  # pyright: ignore[reportCallIssue]
        rating_avg=data.get("rating_avg", 0.0),  # Default to 0.0  # pyright: ignore[reportCallIssue]
        video_url=data.get("video_url"),  # pyright: ignore[reportCallIssue]
        cover_img=data.get("cover_img"),  # pyright: ignore[reportCallIssue]
        public_id=generate_unique_public_id(),  # pyright: ignore[reportCallIssue]
        trailerUrl=data.get("trailerUrl"),  # pyright: ignore[reportCallIssue]
        backdrop=data.get("backdrop"),  # pyright: ignore[reportCallIssue]
        director=data.get("director"),  # pyright: ignore[reportCallIssue]
        cast=cast_json,  # Store as JSON string  # pyright: ignore[reportCallIssue]
    )
    
    # Handle genres
    genre_names = data.get("genres", [])
    for name in genre_names:
        genre = Genre.query.filter_by(name=name).first()
        if not genre:
            genre = Genre(name=name)  # pyright: ignore[reportCallIssue]
            db.session.add(genre)  # Add new genre to session
        movie.genres.append(genre)
    
    try:
        db.session.add(movie)
        db.session.commit()
        
        # Return the created movie with cast as list for better API response
        movie_data = {
            "id": movie.id,
            "title": movie.title,
            "description": movie.description,
            "release_year": movie.release_year,
            "duration": movie.duration,
            "rating_avg": movie.rating_avg,
            "video_url": movie.video_url,
            "cover_img": movie.cover_img,
            "public_id": movie.public_id,
            "trailerUrl": movie.trailerUrl,
            "backdrop": movie.backdrop,
            "director": movie.director,
            "cast": json.loads(movie.cast) if movie.cast else [],  # pyright: ignore[reportCallIssue]
            "created_at": movie.created_at.isoformat() if movie.created_at else None,
            "genres": [genre.name for genre in movie.genres]  # pyright: ignore[reportGeneralTypeIssues]
        }
        
        return jsonify({
            "message": "Movie created successfully",
            "movie": movie_data
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

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
            "genres": [g.name for g in m.genres]  # pyright: ignore[reportGeneralTypeIssues]
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

@movies_bp.route("/most-watched", methods=["GET"])
def most_watched_movies():
    # Get query parameters for pagination and filtering
    page = request.args.get("page", 1, type=int)
    limit = request.args.get("limit", 10, type=int)
    min_watches = request.args.get("min_watches", 1, type=int)  # Minimum watch count to include

    # Create a subquery to count watches per movie
    watch_counts = db.session.query(
        WatchHistory.movie_id,
        func.count(WatchHistory.id).label('watch_count')
    ).group_by(WatchHistory.movie_id).having(
        func.count(WatchHistory.id) >= min_watches
    ).subquery()

    # Query movies joined with watch counts, ordered by watch count
    query = Movie.query.join(
        watch_counts,
        Movie.id == watch_counts.c.movie_id
    ).order_by(
        watch_counts.c.watch_count.desc()
    )

    # Apply pagination
    pagination = query.paginate(page=page, per_page=limit, error_out=False)
    movies = pagination.items

    # Get watch counts for these movies
    movie_ids = [m.id for m in movies]
    watch_count_map = {}
    if movie_ids:
        counts = db.session.query(
            WatchHistory.movie_id,
            func.count(WatchHistory.id).label('watch_count')
        ).filter(
            WatchHistory.movie_id.in_(movie_ids)
        ).group_by(WatchHistory.movie_id).all()

        watch_count_map = {count.movie_id: count.watch_count for count in counts}

    # Format the response
    results = []
    for movie in movies:
        watch_count = watch_count_map.get(movie.id, 0)
        movie_data = {
            "id": movie.id,
            "title": movie.title,
            "description": movie.description,
            "release_year": movie.release_year,
            "duration": movie.duration,
            "rating_avg": movie.rating_avg,
            "video_url": movie.video_url,
            "cover_img": movie.cover_img,
            "public_id": movie.public_id,
            "trailerUrl": movie.trailerUrl,
            "backdrop": movie.backdrop,
            "director": movie.director,
            "cast": json.loads(movie.cast) if movie.cast else [],
            "created_at": movie.created_at.isoformat() if movie.created_at else None,
            "genres": [genre.name for genre in movie.genres],
            "watch_count": watch_count
        }
        results.append(movie_data)

    return jsonify({
        "page": page,
        "limit": limit,
        "total": pagination.total,
        "pages": pagination.pages,
        "min_watches": min_watches,
        "results": results
    })
