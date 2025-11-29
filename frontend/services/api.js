const API_BASE = '/api'

export async function apiFetch(path, opts={}){
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts
  })
  if (!res.ok) throw new Error('API error')
  return res.json().catch(()=>null)
}
