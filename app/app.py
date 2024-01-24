import os, sqlite3

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
    db_path = APP_PATH + '\db\Grades.db'

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    cur.execute('SELECT * FROM KARAKTERER')
    rows = cur.fetchall()
    conn.close()

    return render_template("index.html", rows=rows)
