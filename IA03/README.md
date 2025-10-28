# User Registration System

A full-stack user registration application built with NestJS backend and React frontend.

## Features

### Backend (NestJS)
- User registration endpoint with email/password validation
- MongoDB integration with Mongoose
- Password hashing using bcrypt
- Global validation pipes
- CORS enabled for frontend communication
- Environment-based configuration

### Frontend (React + TypeScript)
- React Router for navigation (Home, Login, Sign Up pages)
- React Hook Form for form validation
- React Query (TanStack Query) for API state management
- Tailwind CSS for styling
- Responsive and accessible UI
- Real-time form validation with helpful error messages

## Tech Stack

**Backend:**
- NestJS
- MongoDB + Mongoose
- bcrypt
- class-validator
- TypeScript

**Frontend:**
- React 18
- TypeScript
- Vite
- React Router
- React Hook Form
- TanStack Query (React Query)
- Tailwind CSS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20.x or higher)
- npm (v10.x or higher)
- MongoDB (local instance or cloud service like MongoDB Atlas)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd IA03
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (or copy from .env.example)
cp .env.example .env

# Update .env with your MongoDB connection string
# MONGODB_URI=mongodb://localhost:27017/user-registration
# PORT=3000
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd ../frontend

# Install dependencies
npm install

# Create .env file (or copy from .env.example)
cp .env.example .env

# Update .env with your backend API URL
# VITE_API_URL=http://localhost:3000
```

## Running the Application

### Start MongoDB

If using a local MongoDB instance:

```bash
# On macOS/Linux
mongod

# On Windows
"C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe"
```

Or use a cloud service like MongoDB Atlas and update the connection string in `backend/.env`.

### Start Backend Server

```bash
# From the backend directory
cd backend
npm run start:dev

# Server will run on http://localhost:3000
```

### Start Frontend Development Server

```bash
# From the frontend directory (in a new terminal)
cd frontend
npm run dev

# Application will run on http://localhost:5173
```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Click "Sign Up" to create a new account
3. Fill in the registration form with:
   - A valid email address
   - A password (minimum 6 characters)
   - Confirm your password
4. Click "Sign Up" to register
5. Upon successful registration, you'll be redirected to the login page
6. The login page demonstrates the UI (mock authentication)

## API Endpoints

### POST /user/register

Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "email": "user@example.com",
    "createdAt": "2025-10-28T00:00:00.000Z"
  }
}
```

**Error Responses:**

- 409 Conflict (Email already exists):
```json
{
  "statusCode": 409,
  "message": "Email already exists"
}
```

- 400 Bad Request (Validation error):
```json
{
  "statusCode": 400,
  "message": [
    "Please provide a valid email address",
    "Password must be at least 6 characters long"
  ]
}
```

## Project Structure

```
IA03/
├── backend/
│   ├── src/
│   │   ├── user/
│   │   │   ├── dto/
│   │   │   │   └── register-user.dto.ts
│   │   │   ├── schemas/
│   │   │   │   └── user.schema.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   └── user.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.tsx
    │   │   ├── Login.tsx
    │   │   └── SignUp.tsx
    │   ├── services/
    │   │   └── api.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── .env
    └── package.json
```

## Environment Variables

### Backend (.env)

```
MONGODB_URI=mongodb://localhost:27017/user-registration
PORT=3000
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:3000
```

## Build for Production

### Backend

```bash
cd backend
npm run build
npm run start:prod
```

### Frontend

```bash
cd frontend
npm run build

# Preview production build
npm run preview
```

## Deployment

The application can be deployed to various platforms:

**Backend:**
- Heroku
- Railway
- Render
- DigitalOcean App Platform
- AWS Elastic Beanstalk

**Frontend:**
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

**Database:**
- MongoDB Atlas (recommended for cloud deployment)

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `backend/.env`
   - Verify network access if using MongoDB Atlas

2. **CORS Error**
   - Verify frontend URL is included in CORS configuration in `backend/src/main.ts`
   - Check that backend is running on the correct port

3. **Port Already in Use**
   - Change the port in `.env` files
   - Kill the process using the port: `lsof -ti:3000 | xargs kill` (macOS/Linux)

## License

This project is for educational purposes as part of the IA03 assignment.

## Author

Created for Advanced Web Development Course
