from flask import Flask
from config import Config
from extensions import db, jwt
from flask_migrate import Migrate
from routes.auth import auth_bp
from routes.movies import movies_bp
from routes.recommendations import rec_bp
from routes.user import user_bp
from routes.user_actions import actions_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    Migrate(app, db)

    app.register_blueprint(auth_bp)
    app.register_blueprint(movies_bp)
    app.register_blueprint(actions_bp)
    app.register_blueprint(rec_bp)
    app.register_blueprint(user_bp)


    @app.route("/")
    def index():
        return "<h1>Welcome to the Movie Recommendation System API 1 </h1>"

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
