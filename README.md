# 🚀 TeamFlow

> A full-stack collaborative software engineering platform for project planning, task management, Root Cause Analysis (RCA), notifications, and team collaboration.

---

# 📖 Introduction

TeamFlow is a comprehensive project management and collaboration platform designed for software engineering teams. It provides a unified environment where teams can manage projects, assign and track tasks, perform Root Cause Analysis (RCA) for incidents, collaborate through comments and notifications, and monitor overall project progress.

Traditional project management often requires multiple disconnected tools for planning, communication, reporting, and incident tracking. TeamFlow brings these capabilities together into a single platform, improving collaboration, transparency, and accountability throughout the software development lifecycle.

The application follows a modern full-stack architecture using React, Express.js, Prisma ORM, and SQLite, providing a responsive, scalable, and maintainable solution.

---

# ✨ Features

## Authentication & Authorization

- Secure JWT Authentication
- Role-Based Access Control (RBAC)
- Four user roles:
  - Admin
  - Manager
  - Developer
  - Reviewer

---

## Project Management

- Create, edit and delete projects
- Project progress tracking
- Project statistics dashboard
- Team member management
- Project timeline
- Project status management

---

## Task Management

- Create, update and delete tasks
- Task priorities
- Task status workflow
- Task assignment
- Due date tracking
- Kanban Board
- List View
- Task filtering and searching

---

## Root Cause Analysis (RCA)

- Create RCA reports
- Edit RCA investigations
- RCA Sections
- Incident documentation
- Submit RCA
- Review workflow
- RCA status tracking

---

## Notifications

- In-app notifications
- Task notifications
- RCA notifications
- Mark notifications as read
- Notification history

---

## User Management

- User profile
- Team members
- Role management
- Avatar support

---

## Dashboard

- Overall project statistics
- Task overview
- Recent projects
- Recent RCAs
- Progress visualization

---

# 🎯 Why TeamFlow?

Software engineering teams frequently use separate tools for project planning, issue tracking, communication, and documentation. This often leads to duplicated work, inconsistent data, and reduced productivity.

TeamFlow addresses these challenges by:

- Centralizing project management
- Improving team collaboration
- Providing structured RCA workflows
- Tracking project progress
- Maintaining accountability through role-based permissions
- Reducing context switching between multiple tools

---

# 🏗️ Project Architecture

Frontend

- React
- TypeScript
- Tailwind CSS
- React Router
- Context API
- Axios

↓

Backend

- Express.js
- TypeScript
- Prisma ORM
- JWT Authentication
- REST APIs

↓

Database

- SQLite

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React

---

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT
- Bcrypt
- Multer
- Nodemailer

---

## Database

- SQLite
- Prisma ORM

---

# 📂 Project Structure

```
TeamFlow
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── contexts
│   ├── services
│   └── hooks
│
├── backend
│   ├── prisma
│   ├── src
│   │   ├── modules
│   │   ├── middleware
│   │   ├── routes
│   │   ├── lib
│   │   └── utils
│   └── uploads
```

---

# ⚙️ Setup Instructions

## Clone Repository

```bash
git clone https://github.com/ManvithaPola/TeamFlow
```

---

## Backend Setup

```bash
cd backend

npm install

npx prisma generate

npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Backend (.env)

```env
DATABASE_URL=file:./dev.db

JWT_SECRET=your_jwt_secret

PORT=5000

```

---

# 🔌 REST APIs

## Authentication

```
POST   /api/auth/register

POST   /api/auth/login

GET    /api/auth/me
```

---

## Projects

```
GET    /api/projects

POST   /api/projects

GET    /api/projects/:id

PUT    /api/projects/:id

DELETE /api/projects/:id
```

---

## Tasks

```
GET    /api/tasks

POST   /api/tasks

PUT    /api/tasks/:id

DELETE /api/tasks/:id
```

---

## RCA

```
GET    /api/rcas

POST   /api/rcas

PUT    /api/rcas/:id

DELETE /api/rcas/:id

PUT    /api/rcas/:id/submit

POST   /api/rcas/:id/review
```

---

## Notifications

```
GET    /api/notifications

PUT    /api/notifications/:id/read

PUT    /api/notifications/read-all
```

---

## Users

```
GET    /api/users

GET    /api/users/profile

PUT    /api/users/profile
```

---

# 🏆 Advantages

- Centralized collaboration platform
- Role-based security
- Structured project management
- Modular architecture
- Responsive UI
- Easy to extend
- Scalable backend
- Clean REST API architecture
- Separation of concerns
- Maintainable codebase

---

# 🧩 Approach Used

The application follows a layered architecture.

```
Presentation Layer
        ↓
Business Logic Layer
        ↓
Data Access Layer
        ↓
Database
```

Key architectural practices:

- Modular backend architecture
- RESTful API design
- Context API for state management
- Prisma ORM for database abstraction
- JWT-based authentication
- RBAC authorization
- Component-based frontend architecture

---

# 📌 Assumptions

- Users have valid login credentials.
- Projects are managed by Admins and Managers.
- Developers work on assigned tasks.
- Reviewers perform RCA reviews.
- Email notifications are configured through SMTP.
- SQLite is used for local development.

---

# ⚠️ Known Limitations

- SQLite is not suitable for production-scale deployments.
- Notifications are not real-time (no WebSockets).
- Dashboard analytics are basic.
- Review workflow supports a simplified approval process.

---

# 🚀 Future Improvements

- PostgreSQL deployment
- Docker support
- AI-assisted RCA suggestions
- Multi-project analytics
- Cloud file storage
- Audit logs
- Email templates
- Mobile application

---

# 📚 Conclusion

TeamFlow provides an integrated solution for managing software engineering projects by combining project planning, task management, Root Cause Analysis, notifications, and collaboration into a single platform.

The modular architecture, RESTful backend, and responsive frontend make the application easy to maintain and extend. By centralizing project workflows and enforcing role-based access control, TeamFlow improves transparency, accountability, and collaboration across software engineering teams.

The platform establishes a strong foundation for future enhancements such as real-time collaboration, advanced analytics, cloud deployment, and AI-assisted project management.

---

# 👩‍💻 Author

**Manvitha Pola**

B.Tech – Artificial Intelligence & Machine Learning

Sreenidhi Institute of Science and Technology

2026