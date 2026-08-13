# 🩺 DoctorMB

**DoctorMB** is a full-stack healthcare management platform designed to connect **customers, doctors, and administrators** in a unified medical management system.

The project provides a modern web interface for discovering doctors and medicines, managing appointments and medical information, while also providing dedicated portals for doctors and administrators.

> 🚧 **Project Status:** Active Development

---

## 📋 Table of Contents

* [Overview](#-overview)
* [Key Features](#-key-features)
* [System Architecture](#-system-architecture)
* [Technology Stack](#-technology-stack)
* [Project Structure](#-project-structure)
* [Core Modules](#-core-modules)
* [User Roles](#-user-roles)
* [Authentication & Authorization](#-authentication--authorization)
* [Getting Started](#-getting-started)
* [Environment Variables](#-environment-variables)
* [Development](#-development)
* [Production Build](#-production-build)
* [API Overview](#-api-overview)
* [Development Roadmap](#-development-roadmap)
* [Future Improvements](#-future-improvements)
* [Author](#-author)

---

## 🎯 Overview

DoctorMB is built as a **modular healthcare management system** with separate experiences for different types of users.

### Customer

Customers can:

* Register and authenticate
* Browse available doctors
* Search and filter doctors
* View doctor profiles
* View medical specialties
* Browse medicines
* Manage their account
* Book and manage appointments
* Access prescriptions and medical records

### Doctor

Doctors have a dedicated portal for managing their professional and clinical activities, including:

* Doctor dashboard
* Appointment management
* Patient management
* Consultation management
* Prescription management
* Schedule management
* Doctor profile
* Education
* Experience
* Certificates
* Awards
* Working history

### Administrator

Administrators have a dedicated management portal for managing the healthcare platform.

The current admin structure includes:

* Dashboard
* People management
* Doctor management
* Patient management
* User management
* Medicine management
* Reports

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* User registration
* User login
* JWT-based authentication
* Password hashing with `bcrypt`
* Protected routes
* Role-based access control
* Authentication guards
* User profile management

### 👨‍⚕️ Doctor Management

* Doctor profiles
* Medical specialties
* Doctor search
* Specialty filtering
* Consultation fee
* Experience
* Education
* Professional certificates
* Awards
* Working history
* Doctor ratings and reviews

### 👤 Patient Management

* Patient profiles
* Patient information management
* Doctor-patient relationships
* Medical information

### 📅 Appointment Management

* Create appointments
* Appointment scheduling
* Appointment status management
* Doctor availability
* Schedule validation
* Conflict/overlap checking

Supported appointment statuses include:

* `Scheduled`
* `Confirmed`
* `Completed`
* `Cancelled`
* `NoShow`

### 💊 Medicine Management

* Medicine management
* Medicine listing
* Medicine information
* Medicine search/filtering
* Admin medicine management

### 📄 Prescription Management

* Create prescriptions
* Prescription items
* Associate medicines with prescriptions
* Manage prescription information

### 🏥 Medical Records

* Patient medical records
* Clinical information
* Medical history management
* Doctor access to relevant patient information

### ⭐ Reviews

* Doctor reviews
* Doctor ratings
* Review statistics
* Total review tracking

### 🕐 Doctor Schedules

* Doctor availability
* Schedule creation
* Schedule validation
* Overlap detection
* Appointment-aware scheduling

---

## 🏗️ System Architecture

DoctorMB follows a **separated frontend/backend architecture**.

```text
                         ┌──────────────────────┐
                         │      DoctorMB        │
                         │   Healthcare System  │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
          ┌─────────────────┐             ┌─────────────────┐
          │    Frontend     │             │     Backend     │
          │    Next.js      │◄───────────►│     NestJS      │
          └────────┬────────┘     REST    └────────┬────────┘
                   │                               │
          ┌────────┴────────┐                      │
          │                 │                      ▼
          ▼                 ▼              ┌─────────────────┐
     Customer Portal   Admin / Doctor      │    MongoDB      │
                       Portals             │    Mongoose     │
                                            └─────────────────┘
```

### Frontend

The frontend is implemented as a modern Next.js application with feature-based organization.

```text
frontend_next/
└── src/
    ├── app/
    ├── features/
    │   ├── admin/
    │   ├── auth/
    │   ├── customers/
    │   └── doctor/
    ├── layouts/
    └── shared/
```

The repository currently organizes frontend functionality into separate feature domains for **admin, authentication, customers, and doctors**.

### Backend

The backend follows NestJS's modular architecture:

```text
backend_nest/
└── src/
    ├── appointments/
    ├── auth/
    ├── common/
    ├── counters/
    ├── database/
    │   └── seeds/
    ├── doctors/
    ├── experience/
    ├── medical-records/
    ├── medicines/
    ├── patient/
    ├── prescription-items/
    ├── prescriptions/
    ├── reviews/
    ├── schedules/
    ├── specialties/
    ├── users/
    ├── app.module.ts
    └── main.ts
```

The current backend source tree contains these domain modules, reflecting the modular design of the application.

---

## 🛠️ Technology Stack

### Frontend

| Technology          | Purpose                 |
| ------------------- | ----------------------- |
| **Next.js 16**      | React framework         |
| **React 19**        | UI development          |
| **TypeScript**      | Type-safe development   |
| **Tailwind CSS 4**  | Styling                 |
| **shadcn/ui**       | UI components           |
| **React Query**     | Server-state management |
| **Axios**           | HTTP client             |
| **React Hook Form** | Form management         |
| **Zod**             | Schema validation       |
| **Recharts**        | Data visualization      |
| **Lucide React**    | Icons                   |
| **Sonner**          | Toast notifications     |

These dependencies are currently defined in the frontend package configuration.

### Backend

| Technology            | Purpose                 |
| --------------------- | ----------------------- |
| **NestJS 11**         | Backend framework       |
| **TypeScript**        | Type-safe development   |
| **MongoDB**           | Database                |
| **Mongoose**          | ODM                     |
| **JWT**               | Authentication          |
| **Passport**          | Authentication strategy |
| **bcrypt**            | Password hashing        |
| **class-validator**   | DTO validation          |
| **class-transformer** | DTO transformation      |
| **Jest**              | Testing                 |
| **Supertest**         | API testing             |

The backend package configuration currently uses NestJS 11, Mongoose 9, Passport/JWT, bcrypt, validation libraries, Jest and Supertest.

---

## 📦 Project Structure

```text
DoctorMB/
│
├── backend_nest/
│   ├── src/
│   │   ├── appointments/
│   │   ├── auth/
│   │   ├── common/
│   │   ├── counters/
│   │   ├── database/
│   │   ├── doctors/
│   │   ├── experience/
│   │   ├── medical-records/
│   │   ├── medicines/
│   │   ├── patient/
│   │   ├── prescription-items/
│   │   ├── prescriptions/
│   │   ├── reviews/
│   │   ├── schedules/
│   │   ├── specialties/
│   │   └── users/
│   ├── test/
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend_next/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── features/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── customers/
│   │   │   └── doctor/
│   │   ├── layouts/
│   │   └── shared/
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── Help.txt
└── InterviewDocument.text
```

The repository is currently structured as a monorepo containing independent NestJS and Next.js applications.

---

## 👥 User Roles

DoctorMB is designed around role-based access.

```text
                    ┌──────────────┐
                    │     User     │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
          Customer       Doctor       Admin
              │            │            │
              ▼            ▼            ▼
         Healthcare     Doctor       Platform
          Services      Portal      Management
```

### Customer

Focuses on healthcare services:

* Doctors
* Appointments
* Medicines
* Prescriptions
* Medical records
* Personal account

### Doctor

Focuses on clinical and professional management:

* Appointments
* Patients
* Consultations
* Prescriptions
* Schedules
* Professional profile

### Admin

Focuses on system administration:

* Users
* Doctors
* Patients
* Medicines
* Reports
* Platform management

---

## 🔐 Authentication & Authorization

DoctorMB uses **JWT authentication** combined with **role-based authorization**.

### Authentication flow

```text
Client
  │
  │ POST /auth/login
  ▼
Auth Controller
  │
  ▼
Auth Service
  │
  ├── Validate credentials
  ├── Verify password
  └── Generate JWT
  │
  ▼
Access Token
  │
  ▼
Client
  │
  │ Authorization: Bearer <token>
  ▼
JWT Strategy
  │
  ▼
JWT Auth Guard
  │
  ▼
Protected Controller
```

Passwords are securely hashed using `bcrypt`, while JWT and Passport are used for authentication.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/LeeVanNgoc/DoctorMB.git

cd DoctorMB
```

---

### 2. Backend Setup

```bash
cd backend_nest
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Configure the required environment variables.

Start the backend in development mode:

```bash
npm run start:dev
```

The backend package provides development, production, build, lint, seed, unit-test and e2e-test scripts.

---

### 3. Database Setup

DoctorMB uses **MongoDB** with **Mongoose**.

Make sure you have a MongoDB instance available either locally or through MongoDB Atlas.

Configure the MongoDB connection string in `.env`.

Example:

```env
MONGODB_URI=mongodb://localhost:27017/doctormb
```

> Use your actual database configuration in production. Never commit credentials or secrets to Git.

---

### 4. Seed Initial Data

The backend includes a seed command for specialties:

```bash
npm run seed
```

This command runs the specialty seed script defined in the backend package configuration.

---

### 5. Frontend Setup

Open another terminal:

```bash
cd frontend_next
```

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5040
```

Start the development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:3000
```

The Next.js application uses `next dev` for development, `next build` for production builds, and `next start` for serving the production build.

---

## ⚙️ Environment Variables

### Backend

Example `.env`:

```env
PORT=5040

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

FRONTEND_PORT=http://localhost:3000
```

### Frontend

Example `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5040
```

> The exact environment variables may evolve as the application continues to be developed. Check `.env.example` in `backend_nest` for the latest backend configuration.

---

## 💻 Development

### Run Backend

```bash
cd backend_nest

npm run start:dev
```

### Run Frontend

```bash
cd frontend_next

npm run dev
```

You can run both applications simultaneously using two terminals.

---

## 🧪 Testing

### Backend Unit Tests

```bash
cd backend_nest

npm run test
```

### Watch Tests

```bash
npm run test:watch
```

### Coverage

```bash
npm run test:cov
```

### End-to-End Tests

```bash
npm run test:e2e
```

These testing scripts are already configured in the backend project.

---

## 🏭 Production Build

### Backend

```bash
cd backend_nest

npm run build
npm run start:prod
```

### Frontend

```bash
cd frontend_next

npm run build
npm run start
```

---

## 🔌 API Overview

The backend exposes RESTful APIs organized by business domain.

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
```

### Users

```text
GET    /api/users
GET    /api/users/:id
POST   /api/users
PATCH  /api/users/:id
DELETE /api/users/:id
```

### Doctors

```text
GET    /api/doctors
GET    /api/doctors/:id
POST   /api/doctors
PATCH  /api/doctors/:id
DELETE /api/doctors/:id
```

### Appointments

```text
GET    /api/appointments
GET    /api/appointments/:id
POST   /api/appointments
PATCH  /api/appointments/:id
DELETE /api/appointments/:id
```

### Medicines

```text
GET    /api/medicines
GET    /api/medicines/:id
POST   /api/medicines
PATCH  /api/medicines/:id
DELETE /api/medicines/:id
```

### Prescriptions

```text
GET    /api/prescriptions
GET    /api/prescriptions/:id
POST   /api/prescriptions
PATCH  /api/prescriptions/:id
DELETE /api/prescriptions/:id
```

> API endpoints are under active development and may change as individual modules evolve.

---

## 🧩 Core Modules

| Module                  | Status |
| ----------------------- | :----: |
| Project Setup           |    ✅   |
| Authentication          |    ✅   |
| Authorization / RBAC    |    ✅   |
| User Management         |    ✅   |
| Doctor Management       |    ✅   |
| Patient Management      |    ✅   |
| Medicine Management     |    ✅   |
| Appointment Management  |    ✅   |
| Prescription Management |    ✅   |
| Medical Records         |    ✅   |
| Reviews                 |   🔄   |
| Doctor Schedules        |   🔄   |
| Admin Dashboard API     |   🔄   |
| Dashboard Charts        |    ⏳   |
| Deployment              |    ⏳   |

---

## 🗺️ Development Roadmap

### Phase 1 — Project Setup

* [x] Backend setup
* [x] Frontend setup
* [x] Database connection
* [x] Project structure

### Phase 2 — Authentication

* [x] Registration
* [x] Login
* [x] JWT authentication
* [x] Password hashing
* [x] Protected routes

### Phase 3 — Authorization

* [x] Role-based access control
* [x] Customer role
* [x] Doctor role
* [x] Admin role
* [x] Authorization guards

### Phase 4 — User Module

* [x] User CRUD
* [x] User profile
* [x] Role management

### Phase 5 — Doctor Module

* [x] Doctor CRUD
* [x] Specialty relationship
* [x] Doctor search
* [x] Doctor filtering
* [x] Professional information

### Phase 6 — Patient Module

* [x] Patient management
* [x] Patient profile

### Phase 7 — Medicine Module

* [x] Medicine CRUD
* [x] Medicine listing
* [x] Medicine management

### Phase 8 — Appointment Module

* [x] Appointment creation
* [x] Appointment status
* [x] Schedule validation
* [x] Conflict checking

### Phase 9 — Prescription Module

* [x] Prescription management
* [x] Prescription items
* [x] Medicine association

### Phase 10 — Medical Record Module

* [x] Medical records
* [x] Patient medical information

### Phase 11 — Business Module Completion

* [ ] Complete review workflow
* [ ] Complete schedule workflow
* [ ] Improve business validation
* [ ] Improve admin management

### Phase 12 — Dashboard API

* [ ] Admin statistics
* [ ] Doctor statistics
* [ ] Appointment statistics
* [ ] Patient statistics
* [ ] Medicine statistics

### Phase 13 — Dashboard & Analytics

* [ ] Admin dashboard
* [ ] Doctor dashboard
* [ ] Appointment charts
* [ ] Revenue statistics
* [ ] Patient analytics

### Phase 14 — Deployment

* [ ] Production configuration
* [ ] Dockerization
* [ ] CI/CD
* [ ] Cloud deployment
* [ ] Domain configuration
* [ ] Monitoring

---

## 🔮 Future Improvements

Potential future improvements include:

* [ ] Online doctor consultation
* [ ] Real-time notifications
* [ ] Email notifications
* [ ] Payment integration
* [ ] Online prescription delivery
* [ ] Advanced search
* [ ] Redis caching
* [ ] Background jobs
* [ ] File/image storage
* [ ] Docker deployment
* [ ] CI/CD pipeline
* [ ] Cloud deployment
* [ ] API documentation with Swagger
* [ ] Advanced analytics
* [ ] Audit logs
* [ ] Improved security monitoring

---

## 📚 Architecture & Engineering Principles

The project is being developed with a focus on maintainability and scalability.

### Backend

* Modular architecture
* Separation of concerns
* DTO-based validation
* Dependency injection
* Repository/model abstraction through Mongoose
* Authentication guards
* Role-based authorization
* Business-rule validation

### Frontend

* Feature-based architecture
* Reusable components
* Shared UI components
* Separation between layouts and features
* Server-state management with React Query
* Form validation with React Hook Form + Zod
* TypeScript-first development

---

## 🔗 Repository

**GitHub:**
https://github.com/LeeVanNgoc/DoctorMB

---

## 👨‍💻 Author

**Lê Văn Ngọc**

Full-stack Developer

* Backend: NestJS, Node.js, MongoDB, Mongoose
* Frontend: Next.js, React, TypeScript
* Architecture: REST API, RBAC, modular architecture

---

## 📄 License

This project is currently intended primarily as a personal/portfolio development project.

License information may be added as the project moves toward public distribution.
