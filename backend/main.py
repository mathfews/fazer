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

@app.get("/tasks/")
async def get_task():
    return db