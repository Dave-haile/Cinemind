import json
from app import app, db
from lib.generateID import generate_unique_public_id
from extensions import db
from models import Movie, User, Genre  # Your Movie model
from werkzeug.security import generate_password_hash

def seed_movies():
  movies_data = [
  {
    "description": "A mind-bending thriller",
    "duration": 148,
    "genres": [
      "Sci-Fi",
      "Thriller"
    ],
    "release_year": 2010,
    "title": "Inception",
    "video_url": "https://example.com/inception.mp4",
    "cover_img": "https://example.com/inception.jpg",
    "public_id": generate_unique_public_id(),
  },
  {
    "description": "Two imprisoned men bond over a number of years",
    "duration": 142,
    "genres": [
      "Drama"
    ],
    "release_year": 1994,
    "title": "The Shawshank Redemption",
    "video_url": "https://example.com/shawshank.mp4",
    "cover_img": "https://example.com/shawshank.jpg",
    "public_id": generate_unique_public_id(),
  },
  {
    "description": "Batman faces the Joker, a criminal mastermind",
    "duration": 152,
    "genres": [
      "Drama",
      "Action",
      "Crime"
    ],
    "release_year": 2008,
    "title": "The Dark Knight",
    "video_url": "https://example.com/darkknight.mp4",
    "public_id": generate_unique_public_id(),
    "cover_img": "https://example.com/darkknight.jpg"
  },
  {
    "description": "A poor family schemes to become employed by a wealthy family",
    "duration": 132,
    "genres": [
      "Thriller",
      "Drama",
      "Comedy"
    ],
    "release_year": 2019,
    "title": "Parasite",
    "video_url": "https://example.com/parasite.mp4",
    "public_id": generate_unique_public_id(),
    "cover_img": "https://example.com/parasite.jpg"
  },
  {
    "description": "A young girl wanders into a world ruled by gods, witches, and spirits",
    "duration": 125,
    "genres": [
      "Animation",
      "Adventure",
      "Family"
    ],
    "release_year": 2001,
    "title": "Spirited Away",
    "video_url": "https://example.com/spiritedaway.mp4",
    "public_id": generate_unique_public_id(),
    "cover_img": "https://example.com/spiritedaway.jpg"
  },
  {
    "description": "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine",
    "duration": 154,
    "genres": [
      "Drama",
      "Crime"
    ],
    "release_year": 1994,
    "title": "Pulp Fiction",
    "video_url": "https://example.com/pulpfiction.mp4",
    "public_id": generate_unique_public_id(),
    "cover_img": "https://example.com/pulpfiction.jpg"
  },
  {
    "description": "A young African-American visits his white girlfriend's parents",
    "duration": 104,
    "genres": [
      "Thriller",
      "Horror",
      "Mystery"
    ],
    "release_year": 2017,
    "title": "Get Out",
    "video_url": "https://example.com/getout.mp4",
    "public_id": generate_unique_public_id(),
    "cover_img": "https://example.com/getout.jpg"
  },
  {
    "description": "A jazz pianist falls for an aspiring actress in Los Angeles",
    "duration": 128,
    "genres": [
      "Drama",
      "Comedy",
      "Music"
    ],
    "release_year": 2016,
    "title": "La La Land",
    "video_url": "https://example.com/lalaland.mp4",
    "public_id": generate_unique_public_id(),
    "cover_img": "https://example.com/lalaland.jpg"
  },
  {
    "description": "A team of explorers travel through a wormhole in space",
    "duration": 169,
    "genres": [
      "Sci-Fi",
      "Drama",
      "Adventure"
    ],
    "release_year": 2014,
    "title": "Interstellar",
    "video_url": "https://example.com/interstellar.mp4",
    "public_id": generate_unique_public_id(),
    "cover_img": "https://example.com/interstellar.jpg"
  },
  {
    "description": "An aging Chinese immigrant is swept up in an insane adventure",
    "duration": 139,
    "genres": [
      "Action",
      "Comedy",
      "Adventure"
    ],
    "release_year": 2022,
    "title": "Everything Everywhere All at Once",
    "public_id": generate_unique_public_id(),
    "video_url": "https://example.com/eeaa.mp4",
    "cover_img": "https://example.com/eeaa.jpg"
  }
    ]


    
  for movie_data in movies_data:
    movie = Movie(
        title=movie_data["title"],
        description=movie_data["description"],
        release_year=movie_data["release_year"],
        duration=movie_data["duration"],
        video_url=movie_data.get("video_url"),
        cover_img=movie_data.get("cover_img"),
        public_id=movie_data["public_id"]
    )

    db.session.add(movie)  # 👈 ADD FIRST

    for genre_name in movie_data["genres"]:
        genre = Genre.query.filter_by(name=genre_name).first()
        if not genre:
            genre = Genre(name=genre_name)
            db.session.add(genre)
        movie.genres.append(genre)

    db.session.commit()

    print(f"Seeded {len(movies_data)} movies")

def seed_users():
  user = User(
    username="dave",
    email="dave@cinemind.com",
    password_hash=generate_password_hash("password123")
  )
  db.session.add(user)
  db.session.commit()
  print('user seeded')
    
if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()  # Create tables if they don't exist
        seed_movies()
        seed_users()