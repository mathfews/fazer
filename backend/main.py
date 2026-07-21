from fastapi import FastAPI
from pydantic import BaseModel
from itertools import count

id_generator = count(start=0)

class Task(BaseModel):
    id: int | None = 0
    title: str
    priority: str
    completed: bool | None = False

app = FastAPI()

db = []

@app.post("/tasks/")
async def add_task(task: Task):
    task.id = next(id_generator)
    db.append(task)

@app.get("/tasks/{id}")
async def get_task(id: int):
    for task in db:
        if task.id == id:
            return task

@app.delete("/tasks/{id}")
async def delete_task(id: int):
    for task in db:
        if task.id == id:
            db.remove(task)

@app.get("/tasks/")
async def get_all_tasks():
    return db