from fastapi import FastAPI
from pydantic import BaseModel
from itertools import count
from database import get_tasks


id_generator = count(start=0)

class Task(BaseModel):
    id: int | None = 0
    title: str
    priority: str
    completed: bool | None = False

class TaskUpdate(BaseModel):
    title: str | None = None
    priority: str | None = None
    completed: bool | None = None

app = FastAPI()

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
async def update_task(id: int, data: TaskUpdate):
    task = find_task(id)

    print(task)
    print(id, data)

    if data.title is not None:
        task.title = data.title
    if data.priority is not None:
        task.priority = data.priority
    if data.completed is not None:
        task.completed = not task.completed


    print(id, data)

    return task

@app.get("/tasks/")
async def get_all_tasks():
    return get_tasks()