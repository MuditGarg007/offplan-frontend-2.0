"use client"

import { useCallback, useRef, useState } from "react"
import { parse } from "best-effort-json-parser"
import { askStream, AskResponse, StructuredChunk } from "@/lib/api/askStream"

interface StreamState {
  status: string
  streaming: boolean
  result: AskResponse | null
  error: string | null
  chunks: StructuredChunk[]
}

const INITIAL_STATE: StreamState = {
  status: "",
  streaming: false,
  result: null,
  error: null,
  chunks: [],
}

type ParsedShape = {
  title?: unknown
  sections?: unknown
  key_points?: unknown
  faq?: unknown
}

function isStr(v: unknown): v is string {
  return typeof v === "string"
}

function buildChunks(parsed: unknown): StructuredChunk[] {
  const out: StructuredChunk[] = []
  if (!parsed || typeof parsed !== "object") return out
  const p = parsed as ParsedShape

  if (isStr(p.title) && p.title.trim()) {
    out.push({ type: "title", content: p.title })
  }

  if (Array.isArray(p.sections)) {
    for (const sec of p.sections) {
      if (!sec || typeof sec !== "object") continue
      const s = sec as { heading?: unknown; body?: unknown; bullets?: unknown }
      if (isStr(s.heading) && s.heading.trim()) {
        out.push({ type: "heading", content: s.heading })
      }
      if (isStr(s.body) && s.body.trim()) {
        out.push({ type: "text", content: s.body })
      }
      if (Array.isArray(s.bullets)) {
        for (const b of s.bullets) {
          if (isStr(b) && b.trim()) {
            out.push({ type: "bullet", content: b })
          }
        }
      }
    }
  }

  if (Array.isArray(p.key_points)) {
    for (const kp of p.key_points) {
      if (isStr(kp) && kp.trim()) {
        out.push({ type: "bullet", content: kp })
      }
    }
  }

  if (Array.isArray(p.faq)) {
    for (const f of p.faq) {
      if (!f || typeof f !== "object") continue
      const fi = f as { question?: unknown; answer?: unknown }
      if (isStr(fi.question) && fi.question.trim()) {
        out.push({ type: "heading", content: fi.question, metadata: { faq: true } })
      }
      if (isStr(fi.answer) && fi.answer.trim()) {
        out.push({ type: "text", content: fi.answer, metadata: { faq: true } })
      }
    }
  }

  return out
}

function chunksEqual(a: StructuredChunk[], b: StructuredChunk[]): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    const x = a[i]
    const y = b[i]
    if (x.type !== y.type || x.content !== y.content) return false
  }
  return true
}

export function useAskStream() {
  const [state, setState] = useState<StreamState>(INITIAL_STATE)
  const abortRef = useRef<AbortController | null>(null)

  const ask = useCallback(async (
    query: string,
    language: "en" | "hi" | "ar" = "en",
    history: { role: "user" | "assistant"; content: string }[] = [],
  ) => {
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    setState({ status: "Thinking…", streaming: true, result: null, error: null, chunks: [] })

    let accumulated = ""
    let lastChunks: StructuredChunk[] = []

    try {
      for await (const event of askStream(query, language, history, abortRef.current.signal)) {
        switch (event.type) {
          case "status":
            setState((s) => (s.chunks.length === 0 ? { ...s, status: event.message } : s))
            break

          case "token": {
            accumulated += event.text
            try {
              const parsed = parse(accumulated)
              const next = buildChunks(parsed)
              if (next.length > 0 && !chunksEqual(next, lastChunks)) {
                lastChunks = next
                setState((s) => ({ ...s, chunks: next, status: "" }))
              }
            } catch {
              // partial parser may still throw on very early fragments — ignore
            }
            break
          }

          case "title":
          case "heading":
          case "text":
          case "bullet":
            // post-stream structured chunks from backend — ignored, we built
            // them progressively from token stream. result event hydrates final.
            break

          case "result": {
            // canonical payload — rebuild chunks from it (covers cached/refusal
            // paths that emit no tokens) and store for metadata access.
            const fromResult = buildChunks(event.data)
            setState((s) => ({
              ...s,
              result: event.data,
              chunks: s.chunks.length > 0 ? s.chunks : fromResult,
              status: "",
            }))
            lastChunks = fromResult
            break
          }

          case "error":
            setState((s) => ({
              ...s,
              error: "Couldn't generate a full analysis. Try rephrasing your question.",
              status: "",
            }))
            break

          case "done":
            setState((s) => ({ ...s, streaming: false, status: "" }))
            break
        }
      }
    } catch (err: unknown) {
      if ((err as Error).name !== "AbortError") {
        setState((s) => ({
          ...s,
          error: (err as Error).message ?? "Something went wrong.",
          streaming: false,
        }))
      }
    } finally {
      setState((s) => (s.streaming ? { ...s, streaming: false } : s))
    }
  }, [])

  const cancel = useCallback(() => {
    abortRef.current?.abort()
    setState((s) => ({ ...s, streaming: false, status: "" }))
  }, [])

  const reset = useCallback(() => {
    abortRef.current?.abort()
    setState(INITIAL_STATE)
  }, [])

  return { ...state, ask, cancel, reset }
}
