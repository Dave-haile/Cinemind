from datetime import datetime
from extensions import db

# Association table for Movie <-> Genre
movie_genres = db.Table(
    'movie_genres',
    db.Column('movie_id', db.Integer, db.ForeignKey('movies.id'), primary_key=True),
    db.Column('genre_id', db.Integer, db.ForeignKey('genres.id'), primary_key=True),
)

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    ratings = db.relationship("Rating", backref="user", lazy=True)
    watch_history = db.relationship("WatchHistory", backref="user", lazy=True)
    watchlist = db.relationship("Watchlist", backref="user", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }


class Movie(db.Model):
    __tablename__ = "movies"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    release_year = db.Column(db.Integer)
    duration = db.Column(db.Integer)
    rating_avg = db.Column(db.Float, default=0.0)
    video_url = db.Column(db.String(255), nullable=True)
    cover_img = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    genres = db.relationship("Genre", secondary=movie_genres, back_populates="movies")
    ratings = db.relationship("Rating", backref="movie", lazy=True)


class Genre(db.Model):
    __tablename__ = "genres"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    movies = db.relationship("Movie", secondary=movie_genres, back_populates="genres")


class Rating(db.Model):
    __tablename__ = "ratings"

    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer, nullable=False)  # 1–5
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey("movies.id"), nullable=False)


class WatchHistory(db.Model):
    __tablename__ = "watch_history"

    id = db.Column(db.Integer, primary_key=True)
    watched_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey("movies.id"), nullable=False)
    last_position = db.Column(db.Integer, default=0)  # timestamp in seconds



class Watchlist(db.Model):
    __tablename__ = "watchlist"

    id = db.Column(db.Integer, primary_key=True)
    added_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey("movies.id"), nullable=False)
