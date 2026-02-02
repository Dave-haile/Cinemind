import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key")
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "sqlite:///cinemind.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "secret")
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ["access"]
    # Extend JWT token expiration to 30 days so users don't have to login frequently
    JWT_ACCESS_TOKEN_EXPIRE = timedelta(days=30)
    DEBUG = os.environ.get("FLASK_DEBUG", "0") == "1"
    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get("MAIL_USERNAME")  # your email
    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")  # app password
    MAIL_DEFAULT_SENDER = MAIL_USERNAME