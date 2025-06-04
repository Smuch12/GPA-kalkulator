import os
import sqlite3
from app.config import DB_PATH

def initialize_database():
    conn = sqlite3.connect(DB_PATH)
    schema_path = os.path.join(os.path.dirname(__file__), "schema.sql")
    if os.path.exists(schema_path):
        with open(schema_path) as f:
            conn.executescript(f.read())
    conn.commit()
    conn.close()

if __name__ == "__main__":
    initialize_database()
    print(f"Database created at {DB_PATH}")
