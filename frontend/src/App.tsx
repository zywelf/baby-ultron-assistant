import { useState, useEffect } from 'react'

interface DocumentItem {
  id: number
  title: string
  content: string
}

function App() {
  const [docs, setDocs] = useState<DocumentItem[]>([])

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
  return (
    <div>
      <h1>Baby Ultron - Documenti</h1>
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
