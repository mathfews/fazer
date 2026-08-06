from fastapi import FastAPI
from database import get_tasks, find_task, add_task, remove_task, update_task
from schemas import Task
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "http://127.0.0.1:8080",
    "http://localhost:8080",
    "http://localhost:63342",
    "https://fazerr.vercel.app/",
    "https://fazer-4l62.onrender.com/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
async def update_task_route(id: int, data: Task):
    return update_task(id, data)

@app.get("/tasks/")
async def get_all_tasks():
    return get_tasks()
