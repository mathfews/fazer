from pydantic import BaseModel

class Task(BaseModel):
    id: int | None = 0
    title: str
    priority: str
    completed: bool | None = False

class TaskUpdate(BaseModel):
    title: str | None = None
    priority: str | None = None
    completed: bool | None = None