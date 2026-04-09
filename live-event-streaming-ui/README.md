# Live Event Streaming UI Implementations

This directory contains two production-ready Tailwind implementations of the same Live Event page:

- `react-router-version` → React + React Router (`/` interactive home, `/event/:id` event detail)
- `next-app-router-version` → Next.js App Router (`/` interactive home, `/event/[id]` event detail)

Both include:

- Interactive home page with searchable/filterable live event cards
- Responsive 2-column layout (chat stacks below video on mobile)
- 16:9 embedded live player with skeleton loading
- Simulated live chat with auto-scroll and sticky input
- Event metadata section with live and viewer badges
- Glassmorphism, smooth transitions, and dark-mode-ready styling
