# TaskFlow - User Guide (How It Works)

TaskFlow kiyanne Admin (Manager) saha Workers athara wada manage karana system ekak. Meka use karana widiha pahasuwen:

---

## 🚀 Step 1: System Eka Start Kirima
1. **Desktop eke athi `start-taskflow.bat` file eka click karanna.**
2. Windows dekak (Server & Client) open wei. Ewa **CLOSE** karanna epa.
3. Automatically browser eka open wela `http://localhost:5173` site ekata yai.

---

## 🔑 Step 2: Register Kirima (Admin Account Eka Hadaganna)
System eka aluth nisa mulinma **Admin** kenek register wenna oni.
1. Browser eke **Login** page ekata yanna.
2. Pahalin thiyana "Don't have an account? Ask your Admin" text eka click karanna nathnam **`/register`** type karanna URL eke.
3. **Admin Account Ekak Hadanna:**
   - **Name:** Oyage nama (e.g., Manager)
   - **Email:** `admin@taskflow.com` (ona ekak use karanna puluwan)
   - **Password:** Kamathi ekak
   - **Role:** **Admin** (Meka godak wadagath!)
4. Dan `Register` click karanna. Ewita oyawa automatic login page ekata yawai.

---

## 📋 Step 3: Admin Dashboard (Manager Ta)
Dan aluthin hadapu admin account eken Log wenna. Oyata me dewal karanna puluwan:

### 1. Assign Tasks (Wada Bara Dima)
- Udinma thiyana **"Assign Task"** button eka click karanna.
- **Title:** Wade nama (e.g., Fix Computer A)
- **Description:** Karanna ona de wisthara karanna.
- **Assign To:** Worker ge **Email** eka methanata danna (e.g., `worker1@gmail.com`).
- **Priority:** High / Medium / Low.
- **Deadline:** Wade iwara karanna ona welawa.
- Click `Assign Task`.

### 2. View Status (Wada Balima)
- Pahala thiyana Table eken hama worker kenekgema wada wala tatwaya (Pending, Ongoing, Completed) balanna puluwan.
- Filter Bar eka use karala eka worker kenekge wada witharak unath balanna puluwan.

---

## 🛠️ Step 4: Worker Dashboard (Sewakayanta)
Dan api hithamu oya worker kenek kiyala.
1. Worker kenek widiyata Register wenna (Role = **Worker**).
2. Login unahama, **Admin oyaagen email ekata assign karapu wada witharai** penne.
3. **Start Task:** Wade patan gannakota `Start` button eka obanna (Status -> Ongoing).
4. **Complete Task:** Wade iwara unahama `Upload Proof` button eka click karala photo ekak upload karanna. Ethakota wade **Completed** kiyala mark wenawa.

---

## 📱 Mobile Support (Phone Eken Yana Hati)
Meka **PWA (Progressive Web App)** ekak nisa phone ekata install karaganna puluwan.
1. Phone eke browser eken site ekata yanna (Network eke host karala thiyenna oni).
2. Browser menu eken **"Add to Home Screen"** or **"Install App"** danna.
3. App ekak widiyata phone eke wada karanna puluwan.

---

## ❓ FAQ
*   **MongoDB Error Enawada?**
    Make sure MongoDB service eka oyage machine eke run wenawada kiyala (`mongod`).

*   **Images Penne Nadda?**
    Uploads folder eka `server/uploads` athule thiyenne. Eka local machine eke save wenne.

If any issues, contact support (Developer).
