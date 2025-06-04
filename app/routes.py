import os
import sqlite3
import time
from flask import (
    Blueprint,
    render_template,
    url_for,
    redirect,
    request,
    current_app as app
)
from .config import DB_PATH

bp = Blueprint("main", __name__)

def get_db_connection():
    retries = 5
    for _ in range(retries):
        try:
            conn = sqlite3.connect(DB_PATH, timeout=10)
            conn.row_factory = sqlite3.Row
            return conn
        except sqlite3.OperationalError as e:
            if "database is locked" in str(e):
                time.sleep(1)
            else:
                raise
    raise sqlite3.OperationalError("Database is still locked")

@bp.route("/", methods=["GET"])
def index():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM KARAKTERER")
    rows = cur.fetchall()
    conn.close()
    return render_template("index.html", rows=rows)

@bp.route("/add", methods=["POST"])
def add_grade():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute(
        "INSERT INTO KARAKTERER (Emnekode, Emnenavn, karakter, Studiepoeng, Dato) VALUES (?, ?, ?, ?, ?)",
        (
            request.form["Emnekode"],
            request.form["Emnenavn"],
            request.form["karakter"],
            request.form["Studiepoeng"],
            request.form["Dato"],
        ),
    )
    conn.commit()
    conn.close()
    return redirect(url_for("main.index"))

@bp.route("/remove", methods=["POST"])
def remove_grade():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute("DELETE FROM KARAKTERER WHERE Emnekode = ?", (request.form["Emnekode"],))
    conn.commit()
    conn.close()
    return redirect(url_for("main.index"))