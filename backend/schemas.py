from pydantic import BaseModel

class Task(BaseModel):
    title: str | None = None
    priority: str | None = None
    completed: bool | None = None