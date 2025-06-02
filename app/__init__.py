import os
import sqlite3
import time
from flask import Flask
from .routes import bp as main_bp

def create_app():
    app = Flask(
        __name__, 
        template_folder=os.path.join(os.path.dirname(__file__), "../templates"),
        static_folder=os.path.join(os.path.dirname(__file__), "../static"),
    )
    app.config.from_object("app.config")
    app.register_blueprint(main_bp)

    return app