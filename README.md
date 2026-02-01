
# Taskflow – Task Management Web Application (Submission for Earnest Fintech Ltd.)

Taskflow is a full-stack task management web application that helps users efficiently create, track, filter, and manage their daily tasks. It is built with a modern tech stack focusing on scalability, clean architecture, and real-world production practices.

## Features

### Authentication
- User registration and login
- Secure authentication flow
- Protected routes for authenticated users

### Task Management
- Create, update, and delete tasks
- Mark tasks as completed or pending
- Paginated task listing
- Search tasks by title
- Filter tasks by completion status

### Dashboard
- Centralized dashboard for task management
- Real-time updates after task actions
- Clean and responsive UI

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios
- React Context API (Authentication state)

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication

### Tooling & DevOps
- Prisma Studio
- RESTful API architecture
- Environment-based configuration
- Modular project structure

## Project Structure

```

Taskflow/
│
├── frontend/
│   ├── app/                # Next.js App Router
│   ├── components/         # Reusable UI components
│   ├── context/            # Auth context
│   ├── lib/                # API helpers
│   └── styles/             # Global styles
│
├── backend/
│   ├── modules/
│   │   ├── auth/           # Authentication logic
│   │   └── tasks/          # Task CRUD operations
│   ├── prisma/             # Prisma schema & migrations
│   └── server.ts           # Express server entry
│
└── README.md

```

## Environment Variables

### Backend (`backend/.env`)
```

DATABASE_URL=postgresql://user:password@localhost:5432/taskflow
JWT_SECRET=your_jwt_secret
PORT=4000

```

### Frontend (`frontend/.env.local`)
```

NEXT_PUBLIC_API_URL=[http://localhost:4000](http://localhost:4000)

````

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow
````

### 2. Backend Setup

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

Backend will run at:

```
http://localhost:4000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:3000
```

## API Overview

### Auth

* POST /api/auth/register
* POST /api/auth/login

### Tasks

* GET /api/tasks
* POST /api/tasks
* PUT /api/tasks/:id
* DELETE /api/tasks/:id

## Security & Best Practices

* JWT-based authentication
* Password hashing
* Environment variable isolation
* Server-side validation
* Modular and scalable architecture

## Future Enhancements

* Task categories and priorities
* Due dates and reminders
* Role-based access control
* Drag-and-drop task ordering
* Analytics and productivity insights

## Author

**Deepanshu Chauhan**
Full Stack Developer
Focused on building scalable, production-ready web applications.

## Acknowledgements

* Next.js
* Prisma
* Tailwind CSS
* Express.js

```
