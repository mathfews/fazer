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

def find_task(id):
    for task in db:
        if task.id == id:
            return task

@app.post("/tasks/")
async def add_task(task: Task):
    task.id = next(id_generator)
    db.append(task)

@app.get("/tasks/{id}")
async def get_task(id: int):
    return find_task(id)

@app.delete("/tasks/{id}")
async def delete_task(id: int):
    db.remove(find_task(id))

@app.patch("/tasks/{id}")
async def change_task_state(id: int):
    task = find_task(id)
    task.completed = not task.completed
    return task

@app.get("/tasks/")
async def get_all_tasks():
    return db