# TalentLink AI — AI-Powered Recruitment Workspace

## Overview

TalentLink AI is an AI-powered recruitment workspace designed to streamline candidate discovery, resume parsing, recruiter analytics, and talent management.

The platform enables recruiters to:

- Upload and parse resumes using AI
- Search candidates using natural language queries
- Analyze talent insights and hiring trends
- Manage talent pools efficiently
- Evaluate candidate profile relevance using intelligent scoring

---

# Key Features

## AI Smart Search
- Natural language candidate search
- AI-powered query parsing
- Skill-based candidate recommendations
- Match insights and profile alignment

## Talent Pool Management
- Infinite scrolling candidate grid
- Skill filtering
- Experience filtering
- Domain-based filtering
- Dynamic profile scoring
- Candidate profile modal

## Resume Intelligence
- Resume upload with drag-and-drop
- AI-powered resume parsing
- Automatic skill extraction
- Candidate profile generation

## Insights Dashboard
- Talent analytics
- Skill distribution charts
- Experience breakdown
- Domain expertise analysis
- Hiring trend insights

## Authentication
- JWT-based authentication
- Protected routes
- Secure API access

## User Experience
- Fully responsive UI
- Dark mode support
- Modern recruiter-focused design
- Optimized recruiter workflow

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Lucide React
- Recharts

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## AI Integration
- Google Gemini API

## Authentication
- JWT Authentication

---

# Monorepo Structure

```bash
AI-Powered-CMIT/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── package.json
│   └── server.js
│
├── README.md
└── .gitignore
```

---

# Complete Installation Guide

## Prerequisites

Before running the project, ensure the following are installed:

- Node.js (Recommended: v20 LTS)
- npm
- MongoDB Atlas Account
- Google Gemini API Key
- Git

---

# Step 1 — Clone Repository

```bash
git clone https://github.com/evolve-hack-2026/AI-Powered-CMIT.git
```

---

# Step 2 — Navigate to Project Folder

```bash
cd AI-Powered-CMIT
```

---

# Frontend Setup

## Step 3 — Navigate to Frontend Folder

```bash
cd frontend
```

---

## Step 4 — Install Frontend Dependencies

```bash
npm install
```

---

## Step 5 — Create Frontend Environment File

Create a `.env` file inside the `frontend` folder.

```env
VITE_API_URL=http://localhost:5000
```

---

## Step 6 — Start Frontend Development Server

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Backend Setup

## Step 7 — Open New Terminal

Navigate to backend folder:

```bash
cd backend
```

---

## Step 8 — Install Backend Dependencies

```bash
npm install
```

---

## Step 9 — Create Backend Environment File

Create a `.env` file inside the `backend` folder.

```env
MONGO_URI=your_mongodb_connection_string

PORT=5000

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

---

## Step 10 — Start Backend Server

```bash
npm run dev
```

Backend runs on:

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

# Core Modules

## Home Dashboard
- AI recruiter workspace
- Smart candidate discovery
- Recently added talent
- AI search interface

---

## Talent Pool
- Candidate exploration
- Dynamic filters
- Skill-based matching
- Profile insights
- Infinite scroll loading

---

## Resume Upload
- Resume upload system
- AI parsing support
- Manual candidate entry
- Source identification (AI Parsed / Manual Entry)

---

## Insights Dashboard
- Skill distribution analytics
- Hiring domain analysis
- Experience visualization
- Recruiter insights

---

# Environment Variables

## Frontend

```env
VITE_API_URL=http://localhost:5000
```

---

## Backend

```env
MONGO_URI=your_mongodb_connection_string

PORT=5000

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

---

# Screenshots

Recommended screenshots:

- Home Dashboard
- Smart AI Search
- Talent Pool
- Candidate Modal
- Resume Upload
- Insights Dashboard

Example:

```bash
screenshots/
├── home.png
├── smart-search.png
├── talent-pool.png
├── upload.png
└── insights.png
```

---

# Future Enhancements

- Resume ranking engine
- AI recommendation optimization
- Recruiter collaboration tools
- Email integration
- Candidate bookmarking
- Role-based access management
- Advanced semantic search

---

# Contributors

Developed by:

- Mohammad Mohiddin
- Mehak Dua