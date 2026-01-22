import json
from app import app, db
from models import Movie  # Your Movie model

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
    "title": "Inception"
  },
  {
    "description": "Two imprisoned men bond over a number of years",
    "duration": 142,
    "genres": [
      "Drama"
    ],
    "release_year": 1994,
    "title": "The Shawshank Redemption"
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
    "title": "The Dark Knight"
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
    "title": "Parasite"
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
    "title": "Spirited Away"
  },
  {
    "description": "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine",
    "duration": 154,
    "genres": [
      "Drama",
      "Crime"
    ],
    "release_year": 1994,
    "title": "Pulp Fiction"
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
    "title": "Get Out"
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
    "title": "La La Land"
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
    "title": "Interstellar"
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
    "title": "Everything Everywhere All at Once"
  }
    ]
    
    for movie_data in movies_data:
        movie = Movie(
            title=movie_data["title"],
            description=movie_data["description"],
            release_year=movie_data["release_year"],
            duration=movie_data["duration"],
            genres=movie_data["genres"]  # Assuming genres is an array field
        )
        db.session.add(movie)
    
    db.session.commit()
    print(f"Seeded {len(movies_data)} movies")

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
        seed_movies()