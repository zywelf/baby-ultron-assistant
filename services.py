from database import documents
from models import DocumentCreate


def search_documents(keyword):
    risultati = [doc for doc in documents if keyword in doc["content"]]
    return risultati


def create_document(doc: DocumentCreate):
    new_id = len(documents) + 1
    new_document = {"id": new_id, "title": doc.title, "content": doc.content}
    documents.append(new_document)
    return new_document
