# Baby Ultron Assistant

A document assistant API built with FastAPI. Upload documents, search through
them, and (coming soon) ask questions about their content using AI.

This is a learning project built step by step — backend first (FastAPI),
then a React/TypeScript frontend, then an AI layer (RAG + agents) with
LangGraph.

## Tech stack

- **Python** + **FastAPI** — REST API
- *(planned)* React + TypeScript — frontend
- *(planned)* LangGraph — RAG and agent layer

## Current features

- `GET /documents` — list all documents
- `GET /documents/titles` — list document titles
- `GET /documents/search?keyword=` — search documents by content

## Getting started

```bash
python -m venv venv
source venv/Scripts/activate   # Windows (Git Bash)
pip install fastapi uvicorn
uvicorn main:app --reload
```

Then open http://127.0.0.1:8000/docs for the interactive API documentation.

## Roadmap

- [ ] POST endpoint to add documents
- [ ] Database (PostgreSQL) instead of in-memory storage
- [ ] React + TypeScript frontend
- [ ] AI layer: RAG + agents with LangGraph