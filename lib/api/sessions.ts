import { API_BASE } from "@/lib/api/config"

export interface SessionListItem {
  id: string
  client_session_id: string
  title: string
  message_count: number
  last_message_preview: string | null
  intent_detected: boolean
  started_at: string
  updated_at: string
}

export interface SessionDetail {
  id: string
  client_session_id: string
  title: string
  messages: { role: "user" | "assistant"; content: string }[]
  intent_detected: boolean
  intent: unknown
  started_at: string
  updated_at: string
}

export const PENDING_SESSION_KEY = "offplan_pending_session_id"

function authHeaders(token?: string | null) {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export async function createSession(opts?: {
  clientSessionId?: string
  title?: string
  token?: string | null
}): Promise<SessionListItem> {
  const body: Record<string, string> = {}
  if (opts?.clientSessionId) body.client_session_id = opts.clientSessionId
  if (opts?.title) body.title = opts.title

  const res = await fetch(`${API_BASE}/chat/sessions`, {
    method: "POST",
    headers: authHeaders(opts?.token),
    body: JSON.stringify(body),
  })

  if (!res.ok) throw new Error(`Failed to create session: HTTP ${res.status}`)
  return res.json()
}

export async function listSessions(
  token: string,
  page = 1,
  limit = 20,
): Promise<{ sessions: SessionListItem[]; total: number; page: number; pages: number }> {
  const res = await fetch(`${API_BASE}/chat/sessions?page=${page}&limit=${limit}`, {
    headers: authHeaders(token),
  })

  if (!res.ok) throw new Error(`Failed to list sessions: HTTP ${res.status}`)
  return res.json()
}

export async function getSession(id: string, token: string): Promise<SessionDetail> {
  const res = await fetch(`${API_BASE}/chat/sessions/${id}`, {
    headers: authHeaders(token),
  })

  if (!res.ok) throw new Error(`Failed to load session: HTTP ${res.status}`)
  return res.json()
}

export async function deleteSession(id: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE}/chat/sessions/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  })

  if (!res.ok) throw new Error(`Failed to delete session: HTTP ${res.status}`)
}

export async function renameSession(
  id: string,
  title: string,
  token: string,
): Promise<SessionDetail> {
  const res = await fetch(`${API_BASE}/chat/sessions/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify({ title }),
  })

  if (!res.ok) throw new Error(`Failed to rename session: HTTP ${res.status}`)
  return res.json()
}
