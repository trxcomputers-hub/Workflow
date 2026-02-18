# 📋 Project TaskFlow: Business & Technical Requirement Document

Meka 50+ workers la inna company ekakata thiyana Task Management System ekaka sampurna "Blueprint" eka.

---

## 1. Business Requirements (Business Logic)

### 1.1 Goal
Company eke wada amathaka wena eka nawaththela, efficiency eka wadi kirima saha management ekata "Real-time visibility" ekak laba dima.

### 1.2 User Roles & Access
1.  **Admin/Management:**
    * Hama user kenektama tasks assign kirima.
    * Hama user kenegema status eka (Pending, Ongoing, Done) balima.
    * Overdue tasks (deadline pahu wechcha) track kirima.
2.  **Workers:**
    * Thamange task list eka balima.
    * Aluth task ekak thamantama add karaganimata haki weema.
    * Task eka iwara karama "Proof of Work" (Image/File) upload kirima.

### 1.3 Key Features (The "Must-Haves")
* **Automated Reminders:** Task ekak assign karapu gaman email/notification yama.
* **Daily Digest:** Hama udema 8.30 ta eda dawase karanna thiyana wada tika summary ekak widiyata yama.
* **Status Tracking:** Task ekak status wenas karaddi eka Manager ta update weema.
* **Cross-Platform:** PC, Android, saha iPhone wala kisi aulak nathuwa wada kirima.

---

## 2. Technical Requirements (The Tech Stack)

Meka custom web app ekak nisa me tech stack eka recommend karami:

* **Frontend:** React.js + Tailwind CSS (Responsive UI ekata).
* **Backend:** Node.js (Express framework).
* **Database:** MongoDB Atlas (Cloud database).
* **Authentication:** JWT (JSON Web Tokens) - Secure login ekakata.
* **Hosting:** GitHub + Vercel (Frontend) & Render/Heroku (Backend).

---

## 3. Implementation Step-by-Step (The Roadmap)

### Phase 1: Database Architecture (MongoDB)
Database eke Tables (Collections) deka mehemai thiyenna ona:
1.  **User Schema:** `name, email, password, role(Admin/Worker)`
2.  **Task Schema:** `title, description, assignedTo(Email), priority(Low/Med/High), status(Pending/Ongoing/Completed), deadlineDate, deadlineTime, proofImageURL, createdBy`

### Phase 2: Frontend Design (React + Tailwind)
1.  **Login Screen:** Role eka anuwa dashboard ekata redirect wenna ona.
2.  **Admin Dashboard:** * Filter by Worker: "Sunil ge wada monawada?" kiyala balanna.
    * Add Task Modal: Task details danna form ekak.
3.  **Worker Dashboard:** * Simple List View: "Mage ada wada tika" witharai penna ona.
    * Status Toggle: Button ekak click karama Pending -> Ongoing wenna ona.

### Phase 3: Notifications & Connectivity
1.  **Nodemailer Integration:** Backend eken email notifications yawanna.
2.  **Responsive Testing:** Chrome DevTools use karala Mobile (iPhone/Android) view eka check kirima.
3.  **Progressive Web App (PWA):** `manifest.json` file eka add karala app eka phone ekata "Installable" kirima.

---

## 4. Deployment Instructions (GitHub Path)

1.  **Code Base:** Backend saha Frontend repo dekakata wen karanna.
2.  **GitHub Push:** Code eka GitHub repo ekata upload karanna.
3.  **Vercel Connection:** Vercel Dashboard gihin GitHub repo eka select karala `Environment Variables` (Database links, API keys) set karanna.
4.  **Live Link:** Workers lata link eka (e.g., `company-task.vercel.app`) laba dima.

---

## 5. Maintenance & Longevity
* **Backups:** Google Sheets ekakata weekly data export wenna script ekak danna (Durable wenna).
* **Logs:** System eke monawa hari error ekak awoth manager ta alert ekak ena widiyata hadanna.