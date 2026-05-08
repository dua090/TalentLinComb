# TalentLink AI

## Overview

TalentLink AI is an AI-powered recruitment platform that helps recruiters upload resumes, search candidates using natural language queries, analyze hiring insights, and manage talent efficiently.

The platform provides intelligent candidate discovery, AI-powered match insights, analytics dashboards, and resume management in a modern recruiter-focused interface.
    
---

# Features

- AI-powered smart candidate search
- Resume upload and parsing
- Talent pool management
- Candidate filtering and match scoring
- AI match insights
- Analytics dashboard
- Dark mode support
- Responsive UI
- JWT authentication

---

# Tech Stack

## Frontend

- React.js
- Tailwind CSS
- Recharts
- Lucide React
- Vite

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Gemini AI API

## Authentication

- JWT Authentication

---

# Project Structure

## Frontend

```bash
src/
│
├── components/
├── constants/
├── hooks/
├── pages/
├── services/
├── utils/
├── assets/
└── App.jsx
```

## Backend

```bash
backend/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── utils/
└── server.js
```

---

# Complete Installation Guide

## Step 1: Clone Repository

```bash
git clone <your-repository-url>
```

---

# Frontend Setup

## Step 2: Navigate to Frontend Folder

```bash
cd frontend
```

---

## Step 3: Install Frontend Dependencies

```bash
npm install
```

---

## Step 4: Create Frontend Environment File

Create a `.env` file inside the frontend root folder.

Add the following:

```env
VITE_API_URL=http://localhost:5000
```

---

## Step 5: Start Frontend Server

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# Backend Setup

## Step 6: Navigate to Backend Folder

```bash
cd backend
```

---

## Step 7: Install Backend Dependencies

```bash
npm install
```

---

## Step 8: Create Backend Environment File

Create a `.env` file inside the backend root folder.

Add the following:

```env
MONGO_URI=your_mongodb_connection_string

PORT=5000

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

---

## Step 9: Start Backend Server

```bash
npm run dev
```

Backend will run on:

```bash
http://localhost:5000
```

---

# Running the Application

## Start Backend

```bash
cd backend
npm run dev
```

---

## Start Frontend

```bash
cd frontend
npm run dev
```

---

# Available Modules

## Home Dashboard

- AI-powered candidate search
- AI match insights
- Quick recruiter actions
- Recently added talent

---

## Talent Pool

- Candidate listing
- Skill-based filtering
- Experience filtering
- Domain filtering
- Candidate match scoring
- Candidate profile modal

---

## Insights Dashboard

- Talent analytics
- Skill distribution charts
- Experience breakdown
- AI hiring insights
- Expertise analysis

---

## Resume Upload

- PDF resume upload
- Drag and drop support
- Resume parsing
- AI-powered extraction

---

# Environment Variables

## Frontend

```env
VITE_API_URL=http://localhost:5000
```

## Backend

```env
MONGO_URI=your_mongodb_connection_string

PORT=5000

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

---

# Screenshots

Add screenshots for:

- Home Dashboard
- AI Smart Search
- Talent Pool
- Insights Dashboard
- Resume Upload

Example folder structure:

```bash
screenshots/
├── home.png
├── talent-pool.png
├── insights.png
└── upload.png
```

---

# Future Enhancements

- Resume ranking system
- Advanced AI recommendations
- Recruiter collaboration
- Email integration
- Role-based access
- Candidate bookmarking

---

# Author

Developed by Mohammad Mohiddin, Mehak Dua.