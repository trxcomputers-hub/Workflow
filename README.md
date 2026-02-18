# TaskFlow - Company Task Management System

Meka instruction.md eke sadahan karala thibba widiyata hadapu TaskFlow system eka.

## Features Implemented
1.  **Backend (Node.js + Express + MongoDB):**
    *   Authentication (JWT Login/Register).
    *   Task Management (Create, Read, Update Status).
    *   Role-based access (Admin vs Worker).
    *   File Upload for Proof of Work (Local storage for dev).
2.  **Frontend (React + Tailwind CSS):**
    *   Responsive UI for Mobile/Desktop.
    *   Admin Dashboard: Assign tasks, filter by worker/status.
    *   Worker Dashboard: View my tasks, update status, upload proof.
    *   PWA Support (Manifest included).

## How to Run

### 1. Backend (Server)
Open a terminal in the `taskflow` folder:
```bash
cd server
npm install  # (If not already installed)
npm run dev
```
*   Server runs on `http://localhost:5000`.
*   Ensure MongoDB is running locally or update `.env` with your MongoDB URI.
    *   Default URI: `mongodb://localhost:27017/taskflow`

### 2. Frontend (Client)
Open a **new** terminal in the `taskflow` folder:
```bash
cd client
npm install  # (If not already installed)
npm run dev
```
*   Client runs on `http://localhost:5173` (or similar).

## Usage Guide
1.  **Register:** Go to `/register` (e.g., `http://localhost:5173/register`) to create your first **Admin** user.
    *   Select Role: `Admin`.
2.  **Login:** Go to `/login` with your new credentials.
3.  **Admin Dashboard:**
    *   Create tasks for workers (assign by their email).
    *   Filter tasks.
4.  **Worker Dashboard:**
    *   Log in as a Worker (create another account with role `Worker`).
    *   See tasks assigned to your email.
    *   Click "Start" to move to `Ongoing`.
    *   Upload Proof Image to complete task.

## Deployment Notes
*   **Database:** Use MongoDB Atlas for production.
*   **File Uploads:** Currently saves to `server/uploads`. For production (Vercel/Heroku), use AWS S3 or Cloudinary.
*   **PWA:** Add `pwa-192x192.png` and `pwa-512x512.png` to `client/public` for valid PWA icons.

---
Instruction by Antigravity (Google DeepMind).
