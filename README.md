# TypeAtlas 🧭

TypeAtlas is a playful, multi-step personality quiz built with Next.js. It blends your birth details, an MBTI-style quiz, an Ayurvedic dosha quiz, and a few optional "atlas signals" into a single shareable archetype — complete with practical, evidence-aware suggestions for daily life.

## Features

- **Guided quiz flow** — landing → birth details → MBTI quiz → dosha quiz → optional signals (Enneagram, Hogwarts house, love language, chronotype) → animated result reveal.
- **Rich archetype result** — combines Western and Chinese zodiac, birthstone, MBTI type, dominant dosha, and blood type into one profile.
- **Actionable extras** ✨ — a generated diet guide, evidence-based insights, a habit experiment, a circadian day planner, and a research field guide.
- **Resumable sessions** — progress is persisted to `localStorage` and reflected in URL parameters, so a refresh or shared link picks up right where you left off.
- **Live presence** — a small panel shows who else is taking the quiz right now, powered by server-sent events (`app/api/live-presence/*`) backed by an in-memory store.
- **Share & print** — results can be shared via `navigator.share` or the clipboard, and exported through the browser's print dialog.

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router) with React 19 and TypeScript
- [Tailwind CSS 3](https://tailwindcss.com) with the [shadcn/ui](https://ui.shadcn.com) component library (Radix UI primitives)
- [Framer Motion](https://www.framer.com/motion/) for animations, [Recharts](https://recharts.org) for charts, [Sonner](https://sonner.emilkowal.ski) for toasts

## Getting Started 🚀

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the development server         |
| `npm run build`     | Create a production build            |
| `npm run start`     | Serve the production build           |
| `npm run lint`      | Run ESLint                           |
| `npm run typecheck` | Type-check with `tsc --noEmit`       |

## Project Structure

```
app/                    Next.js entrypoints (layout, page, API routes)
  api/live-presence/    SSE stream, update, and leave endpoints
src/
  App.tsx               Root client component and quiz flow state machine
  sections/             Full-screen flow sections (landing, quiz, result, …)
  components/           Feature components (planner, insights, presence, …)
  components/ui/        shadcn/ui primitives
  data/                 Quiz questions and scoring (MBTI, dosha, zodiac, …)
  hooks/                Custom hooks (live presence, keyboard navigation, …)
  server/               In-memory live-presence store
  types/                Shared TypeScript types
```

## Notes

- The UI is mounted client-side because the experience relies on `localStorage`, `navigator.share`, the clipboard API, and browser printing.
- Tailwind scans both `app/` and `src/`.
- Live presence uses an in-memory store, so participant data resets on server restart and is scoped to a single server instance.
- TypeAtlas is for reflection and fun — it's not medical, nutritional, or psychological advice. 🌿
