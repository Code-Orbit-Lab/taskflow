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
- **Frontend:** React
- **Auth:** JWT
- **Deployment:** Railway/Render (backend), Vercel (frontend)
- **CI:** GitHub Actions

## Project Docs

- [Project Blueprint](./PROJECT_BLUEPRINT.pdf) — full plan: roles, schema, API contract, workflow
- [API Contract](./docs/API_CONTRACT.md) — endpoint reference (coming soon)

## Getting Started

\`\`\`bash
git clone https://github.com/Zephyrex21/taskflow.git
cd taskflow

# backend
cd backend
npm install
npm run dev

# frontend
cd frontend
npm install
npm run dev
\`\`\`

## Branching & Contribution Flow

We follow a strict pull → branch → code → commit → push → PR → review →
merge loop. No one pushes directly to `main`. See the Project Blueprint
for full details.

## Status

🚧 In active development.