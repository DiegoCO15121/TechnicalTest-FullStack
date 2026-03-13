# Technical Test – Fullstack Application

## Overview

This project is a full-stack application developed as part of a technical challenge.
It follows a **client–server architecture**, separating the frontend and backend into independent services.

The system supports authenticated operations, image uploads, and role-based access control, while maintaining a scalable and maintainable architecture.

The entire stack runs using Docker, allowing the project to be started with a single command.

---

# Project Structure

```
TechnicalTest
│
├── docker-compose.yml
│
├── client/        # Frontend (React + Vite)
├── server/        # Backend (NestJS API)
└── postgres/      # PostgreSQL data persistence
```

---

# Backend

The backend was built using **NestJS** and follows a modular architecture.

### Technologies

* **TypeORM** for database interaction
* **PostgreSQL** as the database
* **bcrypt** for password hashing
* **Multer** for handling file uploads
* **Amazon S3** for image storage

### Authentication

Authentication is implemented using **JWT stored in HTTP cookies**, supporting **role-based access control between `user` and `admin` roles**.

---

# Frontend

The frontend was developed using **React** with **Vite**, following the **Feature-Sliced Design (FSD)** architecture to organize the codebase into scalable layers.

### Technologies

* **Axios** for HTTP requests
* **React Query** for server-state management and caching
* **Zustand** for global client state
* **React Hook Form** for form management
* **Zod** to validate backend responses on the client
* **Tailwind CSS** for styling
* **Headless UI** for accessible UI components
* **Google Maps API** for address selection

---

# Running the Project

Clone the repository and start the application:

```bash
docker compose up --build
```

This command will start:

* Frontend → http://localhost:5173
* Backend → http://localhost:3000
* PostgreSQL database

---

# Key Design Decisions

* **Client/server separation** to keep frontend and backend independent.
* **Feature-Sliced Design (FSD)** to improve scalability and maintainability in the frontend.
* **Server state vs global state separation** using React Query and Zustand.
* **Cloud image storage** using Amazon S3 instead of local storage.
* **Containerized environment** with Docker to ensure reproducible development setups.
