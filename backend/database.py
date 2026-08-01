from pathlib import Path
from schemas import Task
import sqlite3

DB_PATH = Path(__file__).parent / "database.db"

connect = sqlite3.connect(DB_PATH)
connect.row_factory = sqlite3.Row

cursor = connect.cursor()

cursor.execute("" \
"CREATE TABLE IF NOT EXISTS tasks (" \
"id INTEGER PRIMARY KEY AUTOINCREMENT," \
"title TEXT NOT NULL," \
"priority TEXT NOT NULL," \
"due_date TEXT NOT NULL,"
"completed BOOL NOT NULL)")

connect.commit()

def get_tasks():
    cursor.execute("SELECT * FROM tasks")
    return cursor.fetchall()

def find_task(id : int):
    cursor.execute("SELECT * FROM tasks WHERE id = ?", (id,))
    return cursor.fetchone()

def add_task(data : Task):
    cursor.execute("INSERT INTO tasks (title, priority, due_date completed) VALUES (?,?,?,?)", (data.title, data.priority, data.due_date, False))
    connect.commit()
    return data

def remove_task(id : int):
    cursor.execute("DELETE FROM tasks WHERE id = ?", (id,))
    connect.commit()

def update_task(id : int, data : Task):
    task = find_task(id)

    if data.title is not None:
        cursor.execute("UPDATE tasks SET title = ? WHERE id = ?", (data.title, id))
    if data.priority is not None:
        cursor.execute("UPDATE tasks SET priority = ? WHERE id = ?", (data.priority, id))
    if data.due_date is not None:
            cursor.execute("UPDATE tasks SET due_date = ? WHERE id = ?", (data.due_date, id))
    if data.completed is not None:
        cursor.execute("UPDATE tasks SET completed = ? WHERE id = ?", (not task["completed"], id))

    connect.commit()