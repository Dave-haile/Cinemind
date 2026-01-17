from flask import Flask
from config import Config
from extensions import db, jwt
from flask_migrate import Migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    Migrate(app, db)

    @app.route("/")
    def index():
        return {"message": "🎬 CineMind API is running"}

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
