# Fazer

A full-stack task management application built to practice modern web development. The project started as a vanilla JavaScript application using LocalStorage and gradually evolved into a FastAPI-powered application with SQLite persistence and a deployed production environment.

- Live Demo: https://fazerr.vercel.app

- Backend API: https://fazer-4l62.onrender.com/docs

## Features

- [x] Create, edit and delete tasks
- [x] Mark tasks as completed
- [x] Edit task title, priority and due date
- [x] Search tasks by title
- [x] Filter tasks by:
    - Status
    - Priority
    - Due date
- [x] Inbox, Today and Next 7 Days pages
- [x] Context menu for task actions
- [x] REST API built with FastAPI
- [x] Full CRUD integration between frontend and backend
- [x] SQLite data persistence
- [x] Online deployment (Vercel + Render)

## Tech Stack

### Frontend

- HTML
- CSS
- JavaScript (ES Modules)

### Backend

- Python
- FastAPI
- Pydantic
- SQLite

## Project Status

The application currently uses a full-stack architecture with a FastAPI backend, SQLite database, and separate frontend/backend deployments.

The project was developed incrementally, evolving through multiple stages:

- LocalStorage-based frontend
- FastAPI in-memory backend
- SQLite persistence
- Full CRUD API
- Production deployment

## Future Improvements

- [ ] User authentication
- [ ] PostgreSQL migration
- [ ] Responsive design
- [ ] Inbox improvements
- [ ] "Someday" page
- [ ] API documentation improvements
- [ ] Task labels
- [ ] Drag-and-drop task ordering