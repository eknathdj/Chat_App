# Architecture & Interview Talking Points


## Architecture (simple)
- Frontend: React app built with Vite -> static files served by nginx (or `vite preview` in dev)
- Backend: Node + Express + Socket.IO (authoritative message broker)
- Redis: optional adapter for scaling Socket.IO across multiple backend instances
- nginx: reverse proxy for static site + socket proxy


## Docker-specific topics to