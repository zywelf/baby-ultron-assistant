# Import the "class" FastAPI from the package installed fastapi
from fastapi import FastAPI

# Create an object from the class FastAPI (since the class end with "()", app is an instance since referring specifically class FastAPI)
app = FastAPI()

# Temporary simple list where we save docs (before adding later a DB)
documents = [
  {"id": 1, "title": "report.pdf", "content": "dati finanziari Q1"},
  {"id": 2, "title": "notes.txt", "content": "appunti riunione"},
  {"id": 3, "title": "todo.md", "content": "lista cose da fare"},
]


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
  risultati = [doc for doc in documents if keyword in doc["content"]]
  return {"results": risultati}
