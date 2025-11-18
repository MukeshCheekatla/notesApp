from dotenv import load_dotenv
load_dotenv()

from flask import Flask
from flask_cors import CORS
from config import config
from extensions import db
from routes.auth_routes import auth_bp
from routes.note_routes import note_bp

def create_app(config_name="development"):
    app = Flask(__name__)
    
    app.config.from_object(config[config_name])

    CORS(app)

    db.init_app(app)
    with app.app_context():
        db.create_all()

    app.register_blueprint(auth_bp)
    app.register_blueprint(note_bp)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
