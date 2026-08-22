# TruthGuard AI — Frontend Client

Modern React + TypeScript + Vite web client for TruthGuard AI multi-agent news verification.

## Environment Configuration

The frontend relies on public environment variables. Create a `.env` file in the `client` root directory based on `.env.example`:

```bash
cp .env.example .env
```

### Public Variables

| Variable | Description | Default |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Base REST API URL of the backend server | `http://localhost:5000` |

> ⚠️ **Security Warning**: Only variables starting with `VITE_` are bundled into the frontend client. Never store secret provider keys (e.g. `OPENAI_API_KEY`, `GEMINI_API_KEY`) in the frontend application or `.env` files inside `client/`.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```
