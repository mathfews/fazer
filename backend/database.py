from pathlib import Path
import sqlite3

DB_PATH = Path(__file__).parent / "database.db"

connect = sqlite3.connect(DB_PATH)

cursor = connect.cursor()

cursor.execute("" \
"CREATE TABLE IF NOT EXISTS tasks (" \
"id INTEGER PRIMARY KEY AUTOINCREMENT," \
"title TEXT NOT NULL," \
"priority TEXT NOT NULL," \
"completed BOOL NOT NULL)")

connect.commit()

def get_tasks():
    cursor.execute("SELECT * FROM tasks")
    return cursor.fetchall()