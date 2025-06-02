import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "Grades.db")

def initialize_database():
    conn = sqlite3.connect(DB_PATH)
    with open(os.path.join(os.path.dirname(__file__), "schema.sql")) as f:
        conn.executescript(f.read())
    conn.commit()
    conn.close()

if __name__ == "__main__":
    initialize_database()
    print(f"Database created at {DB_PATH}")