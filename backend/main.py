from fastapi import FastAPI
from database import get_tasks, find_task, add_task, remove_task, update_task
from schemas import Task, TaskUpdate

app = FastAPI()

@app.post("/tasks/")
async def create_task(task: Task):
    add_task(task)

@app.get("/tasks/{id}")
async def get_task(id: int):
    return find_task(id)

@app.delete("/tasks/{id}")
async def delete_task(id: int):
    remove_task(id)

@app.patch("/tasks/{id}")
async def update_task_route(id: int, data: TaskUpdate):
    return update_task(id, data)

@app.get("/tasks/")
async def get_all_tasks():
    return get_tasks()