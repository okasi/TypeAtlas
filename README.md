# TypeAtlas

TypeAtlas is now a Next.js App Router application. The existing quiz flow remains in `src/App.tsx`, and the Next entrypoints live in `app/layout.tsx` and `app/page.tsx`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

## Notes

- The UI is mounted client-side because the experience relies on `localStorage`, `navigator.share`, clipboard APIs, and DOM-based PDF generation.
- Tailwind scans both `app/` and `src/`.
- Obsolete Vite entry/config files were removed as part of the migration.
