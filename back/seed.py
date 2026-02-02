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
    "video_url": "https://example.com/shawshank.mp4",
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
    "video_url": "https://example.com/darkknight.mp4",
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
    "video_url": "https://example.com/parasite.mp4",
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
    "video_url": "https://example.com/spiritedaway.mp4",
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
    "video_url": "https://example.com/pulpfiction.mp4",
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
    "video_url": "https://example.com/getout.mp4",
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
    "video_url": "https://example.com/lalaland.mp4",
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
    "video_url": "https://example.com/interstellar.mp4",
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
    "video_url": "https://example.com/eeaa.mp4",
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
    "video_url": "https://www.youtube.com/embed/Way9Dexny3w",
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
  }

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