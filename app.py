import os, sqlite3, time

from flask import (
    Flask,
    render_template,
    url_for,
    redirect,
    request
)

APP_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'GPA-kalkulator'))
app = Flask(
    __name__,
    template_folder=os.path.join(APP_PATH, "templates"),
    static_folder=os.path.join(APP_PATH, "static/"),
)
db_path = os.path.join(APP_PATH, 'db', 'Grades.db')

def get_db_connection():
    retries = 5
    for _ in range(retries):
        try:
            conn = sqlite3.connect(db_path, timeout=10)
            return conn
        except sqlite3.OperationalError as e:
            if "database is locked" in str(e):
                time.sleep(1)
            else:
                raise
    raise sqlite3.OperationalError("Maximum retries reached, database is still locked")

@app.get("/")
def index_html():
    conn = get_db_connection()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    cur.execute('SELECT * FROM KARAKTERER')
    rows = cur.fetchall()
    conn.close()

    return render_template('index.html', rows=rows)


@app.route('/add', methods=['POST'])
def add_grade():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute("INSERT INTO KARAKTERER (Emnekode, Emnenavn, karakter, Studiepoeng, Dato) VALUES (?, ?, ?, ?, ?)",
              (request.form['Emnekode'],
               request.form['Emnenavn'],
               request.form['karakter'],
               request.form['Studiepoeng'],
               request.form['Dato']))
    conn.commit()
    conn.close()
    return redirect(url_for("index_html"))


@app.route('/remove', methods=['POST'])
def remove_grade():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute("DELETE FROM KARAKTERER WHERE Emnekode = ?", (request.form['Emnekode'],))
    conn.commit()
    conn.close()
    return redirect(url_for('index_html'))
