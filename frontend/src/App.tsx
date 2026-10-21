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
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [loadError, setLoadError] = useState<string>('')

  useEffect(() => {
    async function loadDocs() {
      try {
        const res = await fetch('http://localhost:8000/documents')
        const data = await res.json()
        setLoadError('')
        setDocs(data.documents)
      } catch (error) {
        console.error(error)
        setLoadError('Impossibile caricare i documenti.')
      } finally {
        setLoading(false)
      }
    }
    loadDocs()
  }, [])

  async function handleCreate() {
    if (title.trim() === '') {
      setError('Il titolo è obbligatorio!')
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

  async function handleDelete(id: number) {
    try {
      await fetch(`http://localhost:8000/documents/${id}`, { method: 'DELETE' })
      setDocs(docs.filter((doc) => doc.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  function startEdit(doc: DocumentItem) {
    setEditingId(doc.id)
    setTitle(doc.title)
    setContent(doc.content)
  }

  async function handleUpdate() {
    if (title.trim() === '') {
      setError('Il titolo è obbligatorio!')
      return
    }
    setError('')
    try {
      const updated: Omit<DocumentItem, 'id'> = { title: title.trim(), content }
      const res = await fetch(`http://localhost:8000/documents/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      const saved = await res.json()
      setDocs(docs.map((doc) => (doc.id === editingId ? saved : doc)))

      setEditingId(null)
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
            if (editingId === null) {
              handleCreate()
            } else {
              handleUpdate()
            }
          }}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-8 flex flex-col gap-3"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titolo"
            className="bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Contenuto"
            rows={4}
            className="bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <div className="flex gap-3">
            <button
              disabled={title.trim() === ''}
              className="bg-red-600 text-white rounded px-4 py-2 font-medium hover:bg-red-500 transition self-start uppercase tracking-wide text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              {editingId === null ? 'Crea' : 'Aggiorna'}
            </button>
            {editingId !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null)
                  setTitle('')
                  setContent('')
                }}
                className="bg-blue-600 text-white rounded px-4 py-2 font-medium hover:bg-blue-500 transition self-start uppercase tracking-wide text-sm"
              >
                Annulla
              </button>
            )}
          </div>
        </form>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="h-8 w-8 border-4 border-zinc-700 border-t-red-500 rounded-full animate-spin"></div>
          </div>
        ) : loadError ? (
          <p className="text-red-500 text-center py-10">{loadError}</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {docs.map((doc) => (
              <li
                key={doc.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-red-500/50 transition"
              >
                <h2 className="font-semibold text-zinc-100">{doc.title}</h2>
                <p className="text-zinc-400 text-sm mt-1">{doc.content}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="mt-2 text-red-500 text-sm hover:text-red-400"
                  >
                    Elimina
                  </button>
                  <button
                    onClick={() => startEdit(doc)}
                    className="mt-2 text-blue-500 text-sm hover:text-blue-400"
                  >
                    Modifica
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
