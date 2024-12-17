from flask import Flask
from flask_cors import CORS

from routes import register_routes
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS
    CORS(app)
    
    # Register blueprints
    register_routes(app)
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)