"use client"

import { useCallback, useRef, useState } from "react"
import { askStream, AskResponse } from "@/lib/api/askStream"

interface StreamState {
  status: string
  streaming: boolean
  result: AskResponse | null
  error: string | null
  partial: string
}

const INITIAL_STATE: StreamState = {
  status: "",
  streaming: false,
  result: null,
  error: null,
  partial: "",
}

export function useAskStream() {
  const [state, setState] = useState<StreamState>(INITIAL_STATE)
  const abortRef = useRef<AbortController | null>(null)
  const tokenBufRef = useRef("")

  const ask = useCallback(async (
    query: string,
    language: "en" | "hi" | "ar" = "en",
    history: { role: "user" | "assistant"; content: string }[] = [],
  ) => {
    abortRef.current?.abort()
    abortRef.current = new AbortController()
    tokenBufRef.current = ""

    setState({ status: "Thinking…", streaming: true, result: null, error: null, partial: "" })

    try {
      for await (const event of askStream(query, language, history, abortRef.current.signal)) {
        switch (event.type) {
          case "status":
            setState((s) => ({ ...s, status: event.message }))
            break
          case "token":
            tokenBufRef.current += event.text
            setState((s) => ({ ...s, partial: tokenBufRef.current }))
            break
          case "result":
            setState((s) => ({ ...s, result: event.data, status: "", partial: "" }))
            break
          case "error":
            setState((s) => ({
              ...s,
              error: "Couldn't generate a full analysis. Try rephrasing your question.",
              status: "",
            }))
            break
          case "done":
            setState((s) => ({ ...s, streaming: false }))
            break
        }
      }
    } catch (err: unknown) {
      if ((err as Error).name !== "AbortError") {
        setState((s) => ({
          ...s,
          error: (err as Error).message ?? "Something went wrong.",
        }))
      }
    } finally {
      setState((s) => ({ ...s, streaming: false }))
    }
  }, [])

  const cancel = useCallback(() => {
    abortRef.current?.abort()
    setState((s) => ({ ...s, streaming: false, status: "" }))
  }, [])

  const reset = useCallback(() => {
    abortRef.current?.abort()
    setState(INITIAL_STATE)
    tokenBufRef.current = ""
  }, [])

  return { ...state, ask, cancel, reset }
}
