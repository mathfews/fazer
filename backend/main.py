from fastapi import FastAPI
from pydantic import BaseModel

class Task(BaseModel):
    title: str
    priority: str
    completed: bool | None = False

app = FastAPI()

db = []

@app.post("/addTask/")
async def add_task(task: Task):
    db.append(task)
    return {"message": f"{task.title} successfully added"}

@app.get("/tasks/")
async def get_task():
    return db