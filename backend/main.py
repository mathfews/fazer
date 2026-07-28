from fastapi import FastAPI
from database import get_tasks, find_task, add_task
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