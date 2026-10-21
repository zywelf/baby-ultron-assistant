from fastapi import FastAPI
from models import DocumentCreate
from database import documents
import services
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],  # Allow the frontend to access to the backend
    allow_credentials=True,
    allow_methods=["*"],  # Allow GET, POST, etc.
    allow_headers=["*"],
)


# When a GET request hits the root path "/", FastAPI runs this function,
# which returns a dictionary {"status": "ok"} (auto-converted to JSON).
@app.get("/")
def read_root():
    return {"status": "ok"}


@app.get("/documents")
def list_documents():
    return {"documents": documents}


@app.get("/documents/titles")
def list_title():
    titles = [doc["title"] for doc in documents]
    return {"titles": titles}


@app.get("/documents/search")
def search_documents(keyword: str):
    return {"results": services.search_documents(keyword)}


@app.post("/documents", status_code=201)
def create_document(doc: DocumentCreate):
    return services.create_document(doc)


@app.delete("/documents/{doc_id}", status_code=204)
def delete_document(doc_id: int):
    return services.delete_document(doc_id)


@app.put("/documents/{doc_id}")
def update_document(doc_id: int, doc: DocumentCreate):
    return services.update_document(doc_id, doc)
