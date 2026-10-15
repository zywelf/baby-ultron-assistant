from fastapi import FastAPI
from models import DocumentCreate
from database import documents
import services

app = FastAPI()


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
