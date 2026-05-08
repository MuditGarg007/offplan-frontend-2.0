# Frontend: Consume JSONL Stream from `/ask/stream`

## What changed on backend

`/ask/stream` no longer returns SSE (`data: {...}\n\n`).  
Now returns **JSONL** (`text/plain; charset=utf-8`) — one JSON object per line, `\n`-terminated.

Old format (dead):
```
data: {"type":"result","data":{...}}\n\n
```

New format:
```
{"type":"status","message":"Retrieving context…"}\n
{"type":"token","text":"{\""}\n
{"type":"title","content":"Off-Plan vs Ready Properties"}\n
{"type":"heading","content":"Payment Plans"}\n
{"type":"text","content":"Most developers offer 60/40..."}\n
{"type":"bullet","content":"Emaar: 10% down, handover in 2027"}\n
{"type":"result","data":{...full AskResponse...}}\n
{"type":"done"}\n
```

---

## Event types (in arrival order)

| type | fields | when |
|------|--------|------|
| `status` | `message: string` | pipeline progress (retrieving, generating) |
| `token` | `text: string` | raw LLM JSON fragment while generating |
| `title` | `content: string` | response title — render immediately |
| `heading` | `content: string`, `metadata?: {faq?: bool}` | section heading |
| `text` | `content: string`, `metadata?: {faq?: bool}` | prose paragraph |
| `bullet` | `content: string` | bullet point or key point |
| `result` | `data: AskResponse` | full parsed payload (always arrives) |
| `error` | `message: string` | pipeline failed, fallback returned |
| `done` | — | stream closed |

Structured chunks (`title`, `heading`, `text`, `bullet`) arrive **after** all `token` events, just before `result`. Render them progressively. `result` is the source of truth — use it to replace/hydrate any state you built from structured chunks.

---

## How to read the stream

Use `fetch` + `ReadableStream`. Do NOT use `EventSource` — that's for SSE, not JSONL.

```ts
async function askStream(
  query: string,
  language = 'en',
  history: Array<{ role: string; content: string }> = [],
  onChunk: (event: StreamEvent) => void,
) {
  const res = await fetch('/ask/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, language, history }),
  });

  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';        // last partial line stays in buffer

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        const event: StreamEvent = JSON.parse(trimmed);
        onChunk(event);
      } catch {
        console.warn('[stream] unparseable line:', trimmed);
      }
    }
  }
}
```

### TypeScript types

```ts
type StreamEvent =
  | { type: 'status';  message: string }
  | { type: 'token';   text: string }
  | { type: 'title';   content: string }
  | { type: 'heading'; content: string; metadata?: { faq?: boolean } }
  | { type: 'text';    content: string; metadata?: { faq?: boolean } }
  | { type: 'bullet';  content: string }
  | { type: 'result';  data: AskResponse }
  | { type: 'error';   message: string }
  | { type: 'done' };

interface AskResponse {
  title?:          string;
  sections:        Section[];
  key_points:      string[];
  faq:             { question: string; answer: string }[];
  sources:         string[];
  chunk_count:     number;
  intent_score:    number;
  lead_trigger:    boolean;
  suggested_cta:   string;
  page_available:  boolean;
  page_slug?:      string;
  metadata?:       Record<string, unknown>;
}

interface Section {
  heading?: string;
  body?:    string;
  bullets:  string[];
}
```

---

## Recommended render strategy

```ts
// State
let statusText = '';
let streamedChunks: StreamEvent[] = [];   // title/heading/text/bullet
let finalResult: AskResponse | null = null;
let isStreaming = false;

function handleChunk(event: StreamEvent) {
  switch (event.type) {
    case 'status':
      statusText = event.message;          // show spinner label
      break;

    case 'token':
      // Optional: show raw token stream in a <pre> for debugging.
      // Most UIs skip rendering tokens and wait for structured chunks.
      break;

    case 'title':
    case 'heading':
    case 'text':
    case 'bullet':
      streamedChunks.push(event);          // append to live render list
      break;

    case 'result':
      finalResult = event.data;
      // Hydrate lead trigger, CTA, sources, page_slug from finalResult.
      // Structured chunks already rendered; no need to re-render body.
      isStreaming = false;
      break;

    case 'error':
      console.error('[stream] backend error:', event.message);
      // finalResult still arrives after error — render it as fallback.
      break;

    case 'done':
      isStreaming = false;
      break;
  }
}
```

### Chunk → UI mapping

| type | render as |
|------|-----------|
| `title` | `<h1>` or chat bubble header |
| `heading` | `<h2>` (default) or `<h3>` if `metadata.faq` |
| `text` | `<p>` |
| `bullet` | `<li>` inside `<ul>` |

Group consecutive `bullet` events into one `<ul>`. When `heading` interrupts a bullet run, close the `<ul>` before rendering the heading.

---

## With JWT auth

```ts
const res = await fetch('/ask/stream', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({ query, language, history }),
});
```

---

## Edge cases

| Scenario | Behaviour |
|----------|-----------|
| Cache hit | No `token` events. Structured chunks + `result` + `done` only. |
| Greeting query | No `token` events. Structured chunks + `result` + `done` only. |
| Refusal (low similarity) | Structured chunks contain refusal text. `result.metadata.refused = true`. |
| Pipeline error | `error` event fires, then `result` with fallback payload, then `done`. |
| Network drop mid-stream | `reader.read()` throws — catch and show error state. |
| Empty `content` field | Skip rendering, backend may emit empty strings. |

---

## Test with curl

```bash
curl -N -X POST http://localhost:8000/ask/stream \
  -H "Content-Type: application/json" \
  -d '{"query":"What are off-plan properties in Dubai?","language":"en"}' 
```

Each line should appear separately and be valid JSON. Pipe to `| python -m json.tool` to validate line-by-line.

---

## What NOT to change

- `/ask` (non-streaming) endpoint: unchanged, returns full `AskResponse` JSON.
- `EventSource` API: do not use — only works with SSE, not JSONL.
- Backend URL: still `POST /ask/stream`.
