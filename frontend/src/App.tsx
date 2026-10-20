import { useState, useEffect } from 'react'

interface DocumentItem {
  id: number
  title: string
  content: string
}

function App() {
  const [docs, setDocs] = useState<DocumentItem[]>([])
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    async function loadDocs() {
      try {
        const res = await fetch('http://localhost:8000/documents')
        const data = await res.json()
        setDocs(data.documents)
      } catch (error) {
        console.error(error)
      }
    }
    loadDocs()
  }, [])

  async function handleCreate() {
    try {
      const newDoc: Omit<DocumentItem, 'id'> = { title, content }
      const res = await fetch('http://localhost:8000/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDoc),
      })
      const created = await res.json()
      setDocs([...docs, created])
      setTitle('')
      setContent('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Baby Ultron - Documenti</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleCreate()
        }}
      >
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titolo" />
        <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Contenuto" />
        <button>Crea</button>
      </form>
      <ul>
        {docs.map((doc) => (
          <li key={doc.id}>
            <strong>{doc.title}</strong> - {doc.content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
