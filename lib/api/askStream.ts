import { API_BASE } from "@/lib/api/config"

export interface Section {
  heading: string | null
  body: string | null
  bullets: string[]
}

export interface AskResponse {
  title?: string
  summary?: string
  response?: string
  sections?: Section[]
  key_points: string[]
  faq: { question: string; answer: string }[]
  sources: string[]
  chunk_count: number
  intent_score: number
  lead_trigger: boolean
  suggested_cta: string
  page_available: boolean
  page_slug: string | null
  metadata: { cached: boolean; fallback?: boolean; pipeline_ms?: number; streamed?: boolean }
}

export type AskStreamEvent =
  | { type: "status"; message: string }
  | { type: "token"; text: string }
  | { type: "result"; data: AskResponse }
  | { type: "error"; message: string }
  | { type: "done" }

export async function* askStream(
  query: string,
  language: "en" | "hi" | "ar" = "en",
  history: { role: "user" | "assistant"; content: string }[] = [],
  signal?: AbortSignal,
): AsyncGenerator<AskStreamEvent> {
  const res = await fetch(`${API_BASE}/ask/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      language,
      history: history.slice(-6).filter((m) => m.content.trim().length > 0),
    }),
    signal,
  })

  if (!res.ok) {
    if (res.status === 429) {
      throw new Error("You're sending messages too quickly. Please wait a moment.")
    }
    const err = await res.json().catch(() => ({})) as { detail?: string }
    throw new Error(err?.detail ?? `HTTP ${res.status}`)
  }

  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  let buffer = ""

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split("\n")
    buffer = lines.pop() ?? ""

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue
      try {
        const event = JSON.parse(line.slice(6)) as AskStreamEvent
        yield event
        if (event.type === "done") return
      } catch {
        // malformed SSE chunk — skip
      }
    }
  }
}
