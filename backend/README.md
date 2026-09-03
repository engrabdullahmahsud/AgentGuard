# AgentGuard Backend

FastAPI backend for the AgentGuard AI Agent Governance platform.

## Quick Start

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

## Development

- Health endpoint: `GET /api/v1/health`
- API docs: `GET /api/docs`
- Tests: `pytest`
