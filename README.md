# TaskFlow

A collaborative task management app built by a 3-person team to practice
professional Git and GitHub workflows — branching, pull requests, code
review, merge conflict resolution, and deployment.

## Team

| Name | Role | Responsibility |
|---|---|---|
| Saurabh | Backend / Core API | Task CRUD, business logic |
| Gaurav | Frontend | UI, dashboard, API integration |
| Sumit | Auth & Integration/DevOps | Auth system, middleware, CI/CD |

## Tech Stack

- **Backend:** Node.js, Express, MongoDB (Atlas)
- **Frontend:** React (Vite)
- **Auth:** JWT
- **Deployment:** Railway/Render (backend), Vercel (frontend)
- **CI:** GitHub Actions

## Project Structure

```
taskflow/
├── backend/
│   ├── src/
│   │   ├── models/          # Task.js (done), User.js (pending)
│   │   ├── routes/          # task.routes.js (done), auth.routes.js (pending),
│   │   │                    # health.routes.js (pending)
│   │   ├── controllers/     # taskController.js (done), authController.js (pending)
│   │   ├── middleware/      # mockAuth.js (temporary), errorHandler.js,
│   │   │                    # verifyToken.js (pending)
│   │   ├── config/          # env.js, db.js
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/                 # Vite + React starter, UI work in progress
│   └── package.json
├── docs/
│   └── API_CONTRACT.md      # endpoint reference (coming soon)
├── PROJECT_BLUEPRINT.pdf    # full plan: roles, schema, API contract, workflow
├── .gitignore
└── README.md
```

## Getting Started

```bash
git clone https://github.com/Zephyrex21/taskflow.git
cd taskflow

# backend
cd backend
npm install
cp .env.example .env   # then fill in your own MONGO_URI
npm run dev

# frontend
cd frontend
npm install
npm run dev
```

## API Overview

| Endpoint | Method | Status |
|---|---|---|
| `/api/tasks` | GET, POST | ✅ Live (behind temporary mock auth) |
| `/api/tasks/:id` | GET, PUT, DELETE | ✅ Live (behind temporary mock auth) |
| `/api/tasks/:id/status` | PATCH | ✅ Live (behind temporary mock auth) |
| `/api/auth/register` | POST | 🚧 In progress |
| `/api/auth/login` | POST | 🚧 In progress |
| `/api/auth/me` | GET | 🚧 In progress |

**Note:** Task routes currently run behind a temporary `mockAuth` middleware
until the real JWT-based `verifyToken` middleware is merged. See
`backend/src/middleware/mockAuth.js` for details — it's clearly marked
and will be swapped out, not left in place.

## Branching & Contribution Flow

We follow a strict pull → branch → code → commit → push → PR → review →
merge loop. No one pushes directly to `main`. Branches are short-lived and
scoped to one feature. See the Project Blueprint for full details.

## Current Status

🚧 In active development.

- ✅ Backend & frontend scaffolding merged
- ✅ Task model, CRUD API, and routes merged (temporary mock auth)
- ✅ Backend restructured into `backend/` (package.json, lockfile, env moved out of root)
- 🚧 Auth system (JWT, User model, real middleware) — in progress
- 🚧 Frontend login/register/dashboard pages — in progress
- ⏳ Merge conflict practice, deployment — not started yet
