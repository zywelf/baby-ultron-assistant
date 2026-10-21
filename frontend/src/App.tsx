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
  const [error, setError] = useState<string>('')

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
    if (title.trim() === '') {
      setError('Il titolo è obbligatorio')
      return
    }
    setError('')
    try {
      const newDoc: Omit<DocumentItem, 'id'> = { title: title.trim(), content }
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 tracking-tight">
          <span className="text-red-500">⬢</span> BABY ULTRON
          <span className="text-zinc-500 text-lg font-normal"> / documenti</span>
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleCreate()
          }}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-8 flex flex-col gap-3"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titolo"
            className="bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Contenuto"
            className="bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            disabled={title.trim() === ''}
            className="bg-red-600 text-white rounded px-4 py-2 font-medium hover:bg-red-500 transition self-start uppercase tracking-wide text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Crea
          </button>
        </form>

        <ul className="flex flex-col gap-3">
          {docs.map((doc) => (
            <li
              key={doc.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-red-500/50 transition"
            >
              <h2 className="font-semibold text-zinc-100">{doc.title}</h2>
              <p className="text-zinc-400 text-sm mt-1">{doc.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
