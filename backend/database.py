from pathlib import Path
from schemas import Task
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

def find_task(id : int):
    cursor.execute("SELECT * FROM tasks WHERE id = ?", (id,))
    return cursor.fetchone()

def add_task(data : Task):
    cursor.execute("INSERT INTO tasks (title, priority, completed) VALUES (?,?,?)", (data.title, data.priority, False))
    connect.commit()
    return data