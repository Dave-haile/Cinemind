import json
from app import app, db
from lib.generateID import generate_unique_public_id
from extensions import db
from models import Movie, User, Genre  # Your Movie model
from werkzeug.security import generate_password_hash

def seed_movies():
  movies_data = [
  {
    "title": "The Shawshank Redemption",
    "description": "Two imprisoned men bond over a number of years",
    "cover_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYGPjcViyqt3tHK6bRqDfKitr4HJ5TD6YJ4VK-rHu3MS0JStek2AQdYE9vA1CtLwrl-JCjT1Ir7V2Hwn72dacjNPcQQj_V1DbB0020r1osMMCrK85Uw&s=10&ec=121507568",
    "genres": [
      "Drama",
      "Thriller"
    ],
    "release_year": 1994,
    "duration": 142,
    "rating_avg": "0.0",
    "video_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/NmzuHjWmXOc?si=QkCvd7PjwFAcH-FN",
    "backdrop": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop",
    "director": "Frank Darabont",
    "cast": [{"name": "Tim Robbins", "character": "Andy Dufresne", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"name": "Morgan Freeman", "character": "Ellis Boyd 'Red' Redding", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"name": "Bob Gunton", "character": "Warden Norton", "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    
    "title": "The Dark Knight",
    "description": "Batman faces the Joker, a criminal mastermind",
    "genres": [
      "Action",
      "Drama",
      "Crime"
    ],
    "cover_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQInedK7NF1W3mF7bNZAYZo8dw403YsNJa68qlmOFOo0H7wQA5gkWZFCiPGLT59Q0sMv2ED6FqCRRHTqz-0xFBhrQfzZ_tbkxpbCvVekkZS3g&s=10",
    "release_year": 2008,
    "duration": 152,
    "rating_avg": "0.0",
    "video_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/EXeTwQWrcwY?si=QkCvd7PjwFAcH-FN",
    "backdrop": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop",
    "director": "Christopher Nolan",
    "cast": [{"name": "Christian Bale", "character": "Batman", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"name": "Heath Ledger", "character": "Joker", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"name": "Aaron Eckhart", "character": "Harvey Dent", "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    
    "title": "Parasite",
    "description": "A poor family schemes to become employed by a wealthy family",
    "cover_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj0jcNvvvzH7VUdrA04DCWG6ypdCQtfgsP8iYLEQnZBD8kva0gYTVlCfIAUBx1hoL9IUBIl2H8r5sF74HVAA2y9ZGpgx3VJ0wx5uM8-PdphJDbuQuL&s=10&ec=121507568",
    "genres": [
      "Thriller",
      "Drama",
      "Comedy"
    ],
    "release_year": 2019,
    "duration": 132,
    "rating_avg": "0.0",
    "video_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/5xH0H-_dFyE?si=QkCvd7PjwFAcH-FN",
    "backdrop": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop",
    "director": "Bong Joon Ho",
    "cast": [{"name": "Song Kang-ho", "character": "Kim Ki-taek", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"name": "Lee Sun-kyun", "character": "Kim Ki-woo", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"name": "Cho Yeo-jeong", "character": "Choi Sun-kyung", "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    
    "title": "Spirited Away",
    "description": "A young girl wanders into a world ruled by gods, witches, and spirits",
    "cover_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkmm3aptnREtH1tY8bDO9DASfeHoK2sTFNRym4VmJRNln6elvy7EVH8ES-qLgJFOlrtCTFZynEgX4L1Exb05_SqfzCWs6esEPOgWodFibVxnV1KkZkjQ&s=10&ec=121507568",
    "genres": [
      "Animation",
      "Fantasy",
      "Family"
    ],
    "release_year": 2001,
    "duration": 125,
    "rating_avg": "0.0",
    "video_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/ByXuk9Qsd_0?si=QkCvd7PjwFAcH-FN",
    "backdrop": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop",
    "director": "Hayao Miyazaki",
    "cast": [{"name": "Daveigh Chase", "character": "Chihiro Ogino", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"name": "Jason Marsden", "character": "Haku", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"name": "Mary McDonnell", "character": "Yubaba", "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    
    "title": "Pulp Fiction",
    "description": "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine",
    "cover_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7uP46Nyssfu6GaIUgQwG0CAhkKGsdEr8Ln95QZfJ1T6cT8hkqm4NU-vCWhdz0OiFctFEMNQVfAuXAL80Jojl5w5kjsyGvK0GvOl8yPqPg&s=10",
    "genres": [
      "Crime",
      "Drama",
      "Thriller"
    ],
    "release_year": 1994,
    "duration": 154,
    "rating_avg": "0.0",
    "video_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/s7EdQ4FqbhY?si=QkCvd7PjwFAcH-FN",
    "backdrop": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop",
    "director": "Quentin Tarantino",
    "cast": [{"name": "John Travolta", "character": "Vincent Vega", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"name": "Samuel L. Jackson", "character": "Jules Winnfield", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"name": "Uma Thurman", "character": "Mia Wallace", "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    
    "title": "Get Out",
    "description": "A young African-American visits his white girlfriend''s parents",
    "cover_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBMirirUa7r-KDcYsb46GADHQmM2x9D0LE2EhD_EP3xyTtSPx06G6-LUbApg9APwbcCqxq209d8fZv9suvad8KmSEJsqdTSAkrbm5PibJq0Y5EUB7coQ&s=10&ec=121507568",
    "genres": [
      "Horror",
      "Thriller",
      "Mystery"
    ],
    "release_year": 2017,
    "duration": 104,
    "rating_avg": "0.0",
    "video_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/v8yrZVZidlQ?si=QkCvd7PjwFAcH-FN",
    "backdrop": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop",
    "director": "Jordan Peele",
    "cast": [{"name": "Daniel Kaluuya", "character": "Chris Washington", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"name": "Allison Williams", "character": "Rose", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"name": "Bradley Whitford", "character": "Dean", "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    
    "title": "La La Land",
    "description": "A jazz pianist falls for an aspiring actress in Los Angeles",
    "cover_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxOLrPOAqh296qReMAqAVaDn459WznQK7eBZrFBVmb80klTlPXClQHQrcat8q6cg3Z2EqHwb0Df1XReWDNY_3u5qQRwv9NjXhHCY_--8hnCQ&s=10",
    "genres": [
      "Romance",
      "Drama",
      "Music"
    ],
    "release_year": 2016,
    "duration": 128,
    "rating_avg": "0.0",
    "video_url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/1cuS9gYh-bA?si=QkCvd7PjwFAcH-FN",
    "backdrop": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop",
    "director": "Damien Chazelle",
    "cast": [{"id": 1, "name": "Ryan Gosling", "character": "Sebastian Wilder", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"id": 2, "name": "Emma Stone", "character": "Mia Dolan", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"id": 3, "name": "Rosemarie DeWitt", "character": "Laura", "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    
    "title": "Interstellar",
    "description": "A team of explorers travel through a wormhole in space",
    "cover_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBuaZrb4TU1HaNJQYCl46FUC9rFFHfMZ13qE3tKE4heIILru2O3E3Z9A2p6c5b5gat0FN6J3tANp-yliJuB-J1mouhBZXZaB1afqhhiUOGpED6zk_p5g&s=10&ec=121507568",
    "genres": [
      "Sci-Fi",
      "Adventure",
      "Drama"
    ],
    "release_year": 2014,
    "duration": 169,
    "rating_avg": "0.0",
    "video_url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/zSWdZVtXT7E?si=QkCvd7PjwFAcH-FN",
    "backdrop": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop",
    "director": "Christopher Nolan",
    "cast": [{"id": 1, "name": "Matthew McConaughey", "character": "Cooper", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"id": 2, "name": "Anne Hathaway", "character": "Murph", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"id": 3, "name": "Jessica Chastain", "character": "Brand", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    "title": "Everything Everywhere All at Once",
    "description": "An aging Chinese immigrant is swept up in an insane adventure",
    "cover_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR2PdVuNotQT5L3MdbkOfi8a7KQUEkxHGK0Q&s",
    "genres": [
      "Sci-Fi",
      "Adventure",
      "Drama"
    ],
    "release_year": 2022,
    "duration": 139,
    "rating_avg": "0.0",
    "video_url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/Way9Dexny3w?si=QkCvd7PjwFAcH-FN",
    "backdrop": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop",
    "director": "Dan Kwan, Daniel Scheinert",
      "cast": [{"id": 1, "name": "Michelle Yeoh", "character": "Mora Zarek", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"id": 2, "name": "Stephanie Hsu", "character": "Kynes", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"id": 3, "name": "Ke Huy Quan", "character": "Duncan Idaho", "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    "title": "Dune: Part Two",
    "description": "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.",
    "cover_img": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop",
    "genres": [
      "Action",
      "Adventure",
      "Sci-Fi"
    ],
    "release_year": 2024,
    "duration": 166,
    "rating_avg": "0.0",
    "video_url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/Way9Dexny3w",
    "backdrop": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop",
    "director": "Denis Villeneuve",
    "cast": [{"id": 1, "name": "Timothée Chalamet", "character": "Paul Atreides", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"id": 2, "name": "Zendaya", "character": "Chani", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"id": 3, "name": "Rebecca Ferguson", "character": "Lady Jessica", "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"},
    {"id": 4, "name": "Josh Brolin", "character": "Gurney Halleck", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"},
    {"id": 5, "name": "Austin Butler", "character": "Feyd-Rautha", "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    "title": "Oppenheimer",
    "description": "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    "cover_img": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    "genres": [
      "Biography",
      "Drama",
      "History"
    ],
    "release_year": 2023,
    "duration": 180,
    "rating_avg": "0.0",
    "video_url": "https://www.youtube.com/embed/uYPbbksJxIg",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/uYPbbksJxIg",
    "backdrop": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop",
    "director": "Christopher Nolan",
    "cast": [{"id": 1, "name": "Cillian Murphy", "character": "J. Robert Oppenheimer", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"id": 2, "name": "Emily Blunt", "character": "Kitty Oppenheimer", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"id": 3, "name": "Matt Damon", "character": "Leslie Groves", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"},
    {"id": 4, "name": "Robert Downey Jr.", "character": "Lewis Strauss", "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    "title": "The Batman",
    "description": "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city''s hidden corruption and question his family''s involvement.",
    "cover_img": "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    "genres": [
      "Action",
      "Crime",
      "Drama"
    ],
      "release_year": 2022,
    "duration": 176,
    "rating_avg": "0.0",
    "video_url": "https://www.youtube.com/embed/mqqft2x_Aa4",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/mqqft2x_Aa4",
    "backdrop": "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920&h=1080&fit=crop",
    "director": "Matt Reeves",
      "cast": [{"id": 1, "name": "Robert Pattinson", "character": "Batman", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"id": 2, "name": "Zoe Kravitz", "character": "Catwoman", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"id": 3, "name": "Jeffrey Wright", "character": "Commissioner Gordon", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    "title": "Interstellar",
    "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival as Earth becomes uninhabitable.",
    "cover_img": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop",
    "genres": [
      "Sci-Fi",
      "Adventure",
      "Drama"
    ],
    "release_year": 2014,
    "duration": 169,
    "rating_avg": "0.0",
    "video_url": "https://www.youtube.com/embed/zSWdZVtXT7E",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/zSWdZVtXT7E",
    "backdrop": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&h=1080&fit=crop",
    "director": "Christopher Nolan",
    "cast": [{"id": 1, "name": "Matthew McConaughey", "character": "Cooper", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"id": 2, "name": "Anne Hathaway", "character": "Murph", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"id": 3, "name": "Jessica Chastain", "character": "Brand", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    "title": "Blade Runner 2049",
    "description": "Young Blade Runner K''s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who''s been missing for thirty years.",
    "cover_img": "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
    "genres": [
      "Sci-Fi",
      "Adventure",
      "Drama"
    ],
    "release_year": 2017,
    "duration": 164,
    "rating_avg": "0.0",
    "video_url": "https://www.youtube.com/embed/gCcx85zbxz4",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/gCcx85zbxz4",
    "backdrop": "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
    "director": "Denis Villeneuve",
    "cast": [{"id": 1, "name": "Ryan Gosling", "character": "K", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"id": 2, "name": "Emma Stone", "character": "Joi", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"id": 3, "name": "Rosemarie DeWitt", "character": "Holly", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    "title": "Inception",
    "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    "cover_img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    "genres": [
      "Sci-Fi",
      "Adventure",
      "Drama"
    ],
    "release_year": 2010,
    "duration": 148,
    "rating_avg": "0.0",
    "video_url": "https://www.youtube.com/embed/YoHD9XEInc0",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/YoHD9XEInc0",
    "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
    "director": "Christopher Nolan",
    "cast": [{"id": 1, "name": "Joseph Gordon-Levitt", "character": "Arthur", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"id": 2, "name": "Ellen Page", "character": "Ariadne", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"id": 3, "name": "Tom Hardy", "character": "The Architect", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    "title": "The Matrix",
    "description": "A hacker discovers that the world he knows is a simulated reality",
    "cover_img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    "genres": [
      "Sci-Fi",
      "Action",
      "Drama"
    ],
    "release_year": 1999,
    "duration": 136,
    "rating_avg": "0.0",
    "video_url": "https://www.youtube.com/embed/vKQi3bBA1y8",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/vKQi3bBA1y8",
    "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
    "director": "The Wachowski Brothers",
    "cast": [{"id": 1, "name": "Keanu Reeves", "character": "Neo", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"id": 2, "name": "Laurence Fishburne", "character": "Morpheus", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"id": 3, "name": "Carrie-Anne Moss", "character": "Trinity", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    "title": "The Lord of the Rings: The Return of the King",
    "description": "Gandalf and Aragorn lead the World of Men against Sauron''s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    "cover_img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    "genres": [
      "Adventure",
      "Drama",
      "Fantasy"
    ],
    "release_year": 2003,
    "duration": 201,
    "rating_avg": "0.0",
    "video_url": "https://www.youtube.com/embed/r5X-hFf6Bwo",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/r5X-hFf6Bwo",
    "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
    "director": "Peter Jackson",
    "cast": [{"id": 1, "name": "Elijah Wood", "character": "Frodo Baggins", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"id": 2, "name": "Viggo Mortensen", "character": "Aragorn", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"id": 3, "name": "Ian McKellen", "character": "Gandalf", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    "title": "The Lord of the Rings: The Two Towers",
    "description": "Frodo and Sam are joined by Gollum''s cave-hobbit guide as they continue their mission to destroy the One Ring.",
    "cover_img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    "genres": [
      "Adventure",
      "Drama",
      "Fantasy"
    ],
    "release_year": 2002,
    "duration": 223,
    "rating_avg": "0.0",
    "video_url": "https://www.youtube.com/embed/5CecwA9SxjI",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/5CecwA9SxjI",
    "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
    "director": "Peter Jackson",
    "cast": [{"id": 1, "name": "Elijah Wood", "character": "Frodo Baggins", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"id": 2, "name": "Viggo Mortensen", "character": "Aragorn", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"id": 3, "name": "Ian McKellen", "character": "Gandalf", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    "title": "The Lord of the Rings: The Fellowship of the Ring",
    "description": "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the One Ring and save Middle-earth from the Dark Lord Sauron.",
    "cover_img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    "genres": [
      "Adventure",
      "Drama",
      "Fantasy"
    ],
    "release_year": 2001,
    "duration": 201,
    "rating_avg": "0.0",
    "video_url": "https://www.youtube.com/embed/r5X-hFf6Bwo",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/r5X-hFf6Bwo",
    "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
    "director": "Peter Jackson",
    "cast": [{"id": 1, "name": "Elijah Wood", "character": "Frodo Baggins", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"id": 2, "name": "Viggo Mortensen", "character": "Aragorn", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"id": 3, "name": "Ian McKellen", "character": "Gandalf", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    "title": "The Green Mile",
    "description": "A supernatural tale set on a death row in a prison in the 1930s. The story follows a supernaturalist who inmates a convicted murderer, Eugene 'Edge' DeRiviera, to see if he can prove the existence of the afterlife through deathbed repentance.",
    "cover_img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    "genres": [
      "Drama",
      "Fantasy",
      "Crime"
    ],
    "release_year": 1999,
    "duration": 189,
    "rating_avg": "0.0",
    "video_url": "https://www.youtube.com/embed/Ki4haFrqSrw",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/Ki4haFrqSrw",
    "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
    "director": "Frank Darabont",
    "cast": [{"id": 1, "name": "Tom Hanks", "character": "Paul Edgecomb", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"id": 2, "name": "Michael Clarke Duncan", "character": "Brutus 'Brutal' Howell", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"id": 3, "name": "David Morse", "character": "Warden Norton", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    "title": "The Silence of the Lambs",
    "description": "A young FBI trainee must seek the advice of the imprisoned Dr. Hannibal Lecter to catch a serial killer who skins his victims.",
    "cover_img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    "genres": [
      "Drama",
      "Thriller",
      "Crime"
    ],
    "release_year": 1991,
    "duration": 118,
    "rating_avg": "0.0",
    "video_url": "https://www.youtube.com/embed/hZWtF66Bw8s",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/hZWtF66Bw8s",
    "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
    "director": "Jonathan Demme",
    "cast": [{"id": 1, "name": "Jodie Foster", "character": "Clarice Starling", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"id": 2, "name": "Anthony Hopkins", "character": "Hannibal Lecter", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"id": 3, "name": "Scott Glenn", "character": "Jack Crawford", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    "title": "The Godfather",
    "description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    "cover_img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    "genres": [
      "Drama",
      "Crime",
      "Thriller"
    ],
    "release_year": 1972,
    "duration": 175,
    "rating_avg": "0.0",
    "video_url": "https://www.youtube.com/embed/sY1S34973zA",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/sY1S34973zA",
    "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
    "director": "Francis Ford Coppola",
    "cast": [{"id": 1, "name": "Marlon Brando", "character": "Vito Corleone", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"id": 2, "name": "Al Pacino", "character": "Michael Corleone", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"id": 3, "name": "James Caan", "character": "Sonny Corleone", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    "title": "The Godfather: Part II",
    "description": "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
    "cover_img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    "genres": [
      "Drama",
      "Crime",
      "Thriller"
    ],
    "release_year": 1974,
    "duration": 202,
    "rating_avg": "0.0",
    "video_url": "https://www.youtube.com/embed/9O1Iy9od7-A",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/9O1Iy9od7-A",
    "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
    "director": "Francis Ford Coppola",
    "cast": [{"id": 1, "name": "Marlon Brando", "character": "Vito Corleone", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"id": 2, "name": "Al Pacino", "character": "Michael Corleone", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"id": 3, "name": "James Caan", "character": "Sonny Corleone", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
  },
  {
    "title": "The Godfather: Part III",
    "description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    "cover_img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    "genres": [
      "Drama",
      "Crime",
      "Thriller"
    ],
    "release_year": 1990,
    "duration": 150,
    "rating_avg": "0.0",
    "video_url": "https://www.youtube.com/embed/9O1Iy9od7-A",
    "public_id": generate_unique_public_id(),
    "trailerUrl": "https://www.youtube.com/embed/9O1Iy9od7-A",
    "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
    "director": "Francis Ford Coppola",
    "cast": [{"id": 1, "name": "Marlon Brando", "character": "Vito Corleone", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
    {"id": 2, "name": "Al Pacino", "character": "Michael Corleone", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
    {"id": 3, "name": "James Caan", "character": "Sonny Corleone", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
  },
{
  "title": "Mad Max: Fury Road",
  "description": "A woman rebels against a tyrannical ruler in post-apocalyptic Australia in search of her home.",
  "cover_img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
  "genres": [
    "Action",
    "Adventure",
    "Sci-Fi"
  ],
  "release_year": 2015,
  "duration": 120,
  "rating_avg": "0.0",
  "video_url": "https://www.youtube.com/embed/hEJnMQG9evE",
  "public_id": generate_unique_public_id(),
  "trailerUrl": "https://www.youtube.com/embed/hEJnMQG9evE",
  "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
  "director": "George Miller",
  "cast": [{"id": 1, "name": "Tom Hardy", "character": "Max Rockatansky", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
  {"id": 2, "name": "Charlize Theron", "character": "Furiosa", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
  {"id": 3, "name": "Nicholas Hoult", "character": "Nux", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
},
{
  "title": "The Grand Budapest Hotel",
  "description": "A young woman becomes the ward of a famous but aging hotelier and falls in love with the hotel's heir.",
  "cover_img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
  "genres": [
    "Comedy",
    "Drama",
    "Thriller"
  ],
  "release_year": 2014,
  "duration": 99,
  "rating_avg": "0.0",
  "video_url": "https://www.youtube.com/embed/1Fg5iWmQjwk",
  "public_id": generate_unique_public_id(),
  "trailerUrl": "https://www.youtube.com/embed/1Fg5iWmQjwk",
  "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
  "director": "Wes Anderson",
  "cast": [{"id": 1, "name": "Ralph Fiennes", "character": "Monsieur Gustave", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
  {"id": 2, "name": "F. Murray Abraham", "character": "Zero Moustafa", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
  {"id": 3, "name": "Bill Murray", "character": "John Willoughby", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
},
# Marvel Movies
{
  "title": "The Avengers",
  "description": "Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.",
  "cover_img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
  "genres": [
    "Action",
    "Adventure",
    "Sci-Fi"
  ],
  "release_year": 2012,
  "duration": 143,
  "rating_avg": "0.0",
  "video_url": "https://www.youtube.com/embed/eOrNdBpGMv8",
  "public_id": generate_unique_public_id(),
  "trailerUrl": "https://www.youtube.com/embed/eOrNdBpGMv8",
  "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
  "director": "Joss Whedon",
  "cast": [{"id": 1, "name": "Robert Downey Jr.", "character": "Tony Stark / Iron Man", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
  {"id": 2, "name": "Chris Evans", "character": "Steve Rogers / Captain America", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
  {"id": 3, "name": "Mark Ruffalo", "character": "Bruce Banner / Hulk", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
},
{
  "title": "The Avengers: Age of Ultron",
  "description": "Tony Stark builds an artificial intelligence system named Ultron with the help of the Maximoff twins, with the warning that its desire for world domination may cause him to become dangerous to humanity.",
  "cover_img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
  "genres": [
    "Action",
    "Adventure",
    "Sci-Fi"
  ],
  "release_year": 2015,
  "duration": 141,
  "rating_avg": "0.0",
  "video_url": "https://www.youtube.com/embed/UlN97eZYCUA",
  "public_id": generate_unique_public_id(),
  "trailerUrl": "https://www.youtube.com/embed/UlN97eZYCUA",
  "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
  "director": "Joss Whedon",
  "cast": [{"id": 1, "name": "Robert Downey Jr.", "character": "Tony Stark / Iron Man", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
  {"id": 2, "name": "Chris Evans", "character": "Steve Rogers / Captain America", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
  {"id": 3, "name": "Mark Ruffalo", "character": "Bruce Banner / Hulk", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
},
{
  "title": "The Avengers: Infinity War",
  "description": "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
  "cover_img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
  "genres": [
    "Action",
    "Adventure",
    "Sci-Fi"
  ],
  "release_year": 2018,
  "duration": 149,
  "rating_avg": "0.0",
  "video_url": "https://www.youtube.com/embed/6ZfuNTqbHE8",
  "public_id": generate_unique_public_id(),
  "trailerUrl": "https://www.youtube.com/embed/6ZfuNTqbHE8",
  "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
  "director": "Joss Whedon",
  "cast": [{"id": 1, "name": "Robert Downey Jr.", "character": "Tony Stark / Iron Man", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
  {"id": 2, "name": "Chris Evans", "character": "Steve Rogers / Captain America", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
  {"id": 3, "name": "Mark Ruffalo", "character": "Bruce Banner / Hulk", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
},
{
  "title": "The Avengers: Endgame",
  "description": "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance.",
  "cover_img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
  "genres": [
    "Action",
    "Adventure",
    "Sci-Fi"
  ],
  "release_year": 2019,
  "duration": 181,
  "rating_avg": "0.0",
  "video_url": "https://www.youtube.com/embed/6ZfuNTqbHE8",
  "public_id": generate_unique_public_id(),
  "trailerUrl": "https://www.youtube.com/embed/6ZfuNTqbHE8",
  "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
  "director": "Joss Whedon",
  "cast": [{"id": 1, "name": "Robert Downey Jr.", "character": "Tony Stark / Iron Man", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
  {"id": 2, "name": "Chris Evans", "character": "Steve Rogers / Captain America", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
  {"id": 3, "name": "Mark Ruffalo", "character": "Bruce Banner / Hulk", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
},
{
  "title": "Captain America: The First Avenger",
  "description": "Steve Rogers, a frail man, transforms into Captain America after taking a dose of a super-soldier serum.",
  "cover_img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
  "genres": [
    "Action",
    "Adventure",
    "Sci-Fi"
  ],
  "release_year": 2011,
  "duration": 124,
  "rating_avg": "0.0",
  "video_url": "https://www.youtube.com/embed/JerVrbLldXw",
  "public_id": generate_unique_public_id(),
  "trailerUrl": "https://www.youtube.com/embed/JerVrbLldXw",
  "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
  "director": "Joe Johnston",
  "cast": [{"id": 1, "name": "Chris Evans", "character": "Steve Rogers / Captain America", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
  {"id": 2, "name": "Hugo Weaving", "character": "Johann Schmidt / Red Skull", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
  {"id": 3, "name": "Tommy Lee Jones", "character": "Colonel Chester Phillips", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
},
{
  "title": "Captain America: The Winter Soldier",
  "description": "Steve Rogers battles the Winter Soldier, a mysterious agent who is hunting him.",
  "cover_img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
  "genres": [
    "Action",
    "Adventure",
    "Sci-Fi"
  ],
  "release_year": 2014,
  "duration": 136,
  "rating_avg": "0.0",
  "video_url": "https://www.youtube.com/embed/dKrVegVI0Wg",
  "public_id": generate_unique_public_id(),
  "trailerUrl": "https://www.youtube.com/embed/dKrVegVI0Wg",
  "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
  "director": "Anthony Russo, Joe Russo",
  "cast": [{"id": 1, "name": "Chris Evans", "character": "Steve Rogers / Captain America", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
  {"id": 2, "name": "Scarlett Johansson", "character": "Black Widow", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
  {"id": 3, "name": "Samuel L. Jackson", "character": "Nick Fury", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"}]
},
]
  for movie_data in movies_data:
    movie = Movie(
        title=movie_data["title"],  # pyright: ignore[reportCallIssue]
        description=movie_data["description"],  # pyright: ignore[reportCallIssue]
        release_year=movie_data["release_year"],  # pyright: ignore[reportCallIssue]
        duration=movie_data["duration"],  # pyright: ignore[reportCallIssue]
        rating_avg=movie_data.get("rating_avg", 0.0),  # pyright: ignore[reportCallIssue]
        video_url=movie_data.get("video_url"),  # pyright: ignore[reportCallIssue]
        cover_img=movie_data.get("cover_img"),  # pyright: ignore[reportCallIssue]
        public_id=movie_data["public_id"],  # pyright: ignore[reportCallIssue]
        trailerUrl=movie_data.get("trailerUrl"),  # pyright: ignore[reportCallIssue]
        backdrop=movie_data.get("backdrop"),  # pyright: ignore[reportCallIssue]
        director=movie_data.get("director"),  # pyright: ignore[reportCallIssue]
        cast=json.dumps(movie_data.get("cast")),  # pyright: ignore[reportCallIssue]
    )

    db.session.add(movie)  # 👈 ADD FIRST

    for genre_name in movie_data["genres"]:
        genre = Genre.query.filter_by(name=genre_name).first()
        if not genre:
            genre = Genre(name=genre_name)  # pyright: ignore[reportCallIssue]
            db.session.add(genre)
        movie.genres.append(genre)

    db.session.commit()

    print(f"Seeded {len(movies_data)} movies")

def seed_users():
  user = User(
    username="dave",  # pyright: ignore[reportCallIssue]
    email="dave@cinemind.com",  # pyright: ignore[reportCallIssue]  
    password_hash=generate_password_hash("password123")  # pyright: ignore[reportCallIssue]
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