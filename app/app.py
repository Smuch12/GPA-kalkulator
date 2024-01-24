import os

from flask import (
    Flask,
    render_template,
)


APP_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
app = Flask(
    __name__,
    template_folder=os.path.join(APP_PATH, "templates/"),
    static_folder=os.path.join(APP_PATH, "static/"),
)

@app.get("/")
def index_html():
    return render_template("index.html")
