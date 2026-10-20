# Baby Ultron Assistant

A full-stack document assistant: a REST API backend with a React frontend to
list and create documents. Built as a learning and portfolio project, with an
AI layer (RAG / LangGraph) planned.

## Tech Stack

**Backend**

- Python + FastAPI
- Pydantic (request validation)
- Layered architecture (routes / services / data / models)

**Frontend**

- React + TypeScript
- Vite
- Tailwind CSS

## Features

- List all documents
- Create a new document (title + content)
- Search documents by keyword
- Typed end-to-end (Pydantic on the backend, TypeScript on the frontend)

## Architecture

The project is split into a separate backend and frontend that communicate over
HTTP (REST + JSON):
frontend (React SPA) → HTTP → backend (FastAPI)

The backend follows a layered structure:

main.py → routes (HTTP layer)
services.py → business logic
database.py → data (in-memory for now)
models.py → Pydantic models

## Getting Started

### Backend

```bash
cd baby-ultron-assistant
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install fastapi uvicorn
uvicorn main:app --reload       # runs on http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev                     # runs on http://localhost:5173
```

Make sure the backend is running before starting the frontend.

## Roadmap

- [ ] Edit and delete documents (PUT / DELETE)
- [ ] Persistent database (PostgreSQL) instead of in-memory storage
- [ ] AI layer: RAG / LangGraph for document Q&A
- [ ] Deployment
