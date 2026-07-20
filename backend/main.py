from fastapi import FastAPI
from pydantic import BaseModel

class Task(BaseModel):
    title: str
    priority: str
    completed: bool 

app = FastAPI()

db = []

@app.post("/tasks/")
async def add_task(task: Task):
    db.append(task)

@app.get("/tasks/")
async def get_task():
    return db