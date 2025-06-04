import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
ROOT_DIR = os.path.abspath(os.path.join(BASE_DIR, os.pardir))

# Change this if changind .db file.
DB_FILENAME = "Grades.db"

DB_PATH = os.path.join(ROOT_DIR, "db", DB_FILENAME)
SQLALCHEMY_DATABASE_URI = f"sqlite:///{DB_PATH}"

DEBUG = True