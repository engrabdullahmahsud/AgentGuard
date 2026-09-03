# AgentGuard

AI Agent Governance & Security Platform

## Overview

AgentGuard is an enterprise-grade platform for discovering, governing, and securing AI agents across your organization.

## Project Structure

```
AgentGuard/
├── frontend/          # Next.js 14 frontend (at repository root)
│   ├── src/app/       # App Router pages (8 routes)
│   ├── src/components/ # Reusable UI components
│   └── src/lib/       # Types, hooks, API client
│
├── backend/           # FastAPI backend (NEW)
│   ├── app/           # FastAPI application
│   ├── alembic/       # Database migrations
│   └── tests/         # Backend tests
│
├── docker/            # Docker files
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
│
└── .github/
    └── workflows/     # GitHub Actions CI/CD
```

## Quick Start

### Prerequisites

- Docker + Docker Compose
- Node.js 18+
- Python 3.11+

### 1. Start the Database

```bash
# From repository root
docker compose up -d postgres
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

Backend runs at: http://localhost:8000
- Health check: http://localhost:8000/api/v1/health
- API docs: http://localhost:8000/api/docs

### 3. Frontend Setup

```bash
# From repository root
npm install
npm run dev
```

Frontend runs at: http://localhost:3000

## Environment Variables

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql+asyncpg://agentguard:changeme@localhost:5432/agentguard
SECRET_KEY=your-secret-key-here
DEBUG=true
```

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## Available Scripts

### Frontend (repository root)

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run lint       # ESLint
npm run typecheck  # TypeScript check
```

### Backend

```bash
cd backend
source venv/bin/activate
pytest             # Run tests
pytest -v --cov    # With coverage
ruff check app/    # Lint
mypy app/          # Type check
alembic upgrade head  # Apply migrations
alembic revision --autogenerate -m "message"  # Create migration
```

## Testing

```bash
# Backend tests
cd backend
pytest -v

# Frontend tests
npm test
```

## Git Workflow

```bash
# Feature branches
git checkout -b feature/your-feature
git commit -m "feat: your feature"
git push origin feature/your-feature
# Open PR

# Main branch protection
# - Requires CI pass
# - Requires code review
# - No direct pushes
```

## CI/CD

GitHub Actions workflows:

- `.github/workflows/ci.yml` — Runs on every push/PR:
  - Frontend: lint, typecheck, build
  - Backend: test, lint, migrations
  - Security: gitleaks + CodeQL

## Security

- All secrets via environment variables
- `.env` files are gitignored
- `.env.example` contains placeholders only
- Gitleaks scans on every commit and in CI
- No credentials in source code or CI configs

## License

Proprietary — All rights reserved