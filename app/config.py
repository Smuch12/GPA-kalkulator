import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
ROOT_DIR = os.path.abspath(os.path.join(BASE_DIR, os.pardir))

# Name of the SQLite database file. Change this in one place to update the
# database used by the whole application.
DB_FILENAME = os.environ.get("DB_FILENAME", "Grades.db")

# Absolute path to the database file.
DB_PATH = os.path.join(ROOT_DIR, "db", DB_FILENAME)

# SQLAlchemy connection string. Even though SQLAlchemy isn't actively used, this
# remains for future expansion.
SQLALCHEMY_DATABASE_URI = f"sqlite:///{DB_PATH}"

DEBUG = True