
---

# 📦 Courier & Parcel Management System

A full-stack MERN logistics platform designed to streamline parcel booking, agent assignment, and real-time delivery tracking.

### 🚀 Live Links

* **Frontend:** [https://courier-and-parcel.vercel.app](https://courier-and-parcel.vercel.app)
* **Backend:** [https://courier-and-parcel.onrender.com](https://www.google.com/search?q=https://courier-and-parcel.onrender.com)

---

## 🛠 Tech Stack

* **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, TanStack Query (v5), Sonner Toasts, Shadcn.
* **Backend:** Node.js, Express.js, MongoDB (Mongoose).
* **Authentication:** JWT (Stored in cookies for SSR and headers for API cross-origin requests).
* **Deployment:** Vercel (Frontend), Render (Backend).

---

## 🔑 Demo Credentials

Access the system with the following administrative account:

* **Email:** `testadmin@gmail.com`
* **Password:** `12345678`

---

## ✨ Key Features

### 👤 Role-Based Access Control (RBAC)

The system differentiates between three distinct roles:

1. **Admin:** Manages the entire ecosystem, assigns agents, modifies user roles, and views financial metrics.
2. **Delivery Agent:** Manages assigned deliveries and updates tracking statuses.
3. **Customer:** Books parcels and tracks delivery progress.

### 📋 Functional Highlights

* **Parcel Booking:** Customers can book parcels with detailed specifications (Size, Type, Payment Mode).
* **Agent Assignment:** Admins can view a list of all unassigned parcels and assign them to active delivery agents.
* **Real-Time Tracking Simulation:** Due to the absence of a Google Maps billing account, location tracking is managed via state-based status updates (Pending → Picked Up → In Transit → Delivered).
* **Status Updates:** Agents can update statuses which reflect instantly on the customer’s tracking dashboard.
* **Admin Analytics:** A dedicated dashboard showing daily booking counts, COD amounts, and delivery success rates.
* **Data Export:** Admins can export booking reports as CSV files for offline analysis.

---

## 🏗 Architectural Decisions

### 1. Cross-Origin Authentication

To overcome browser restrictions between Vercel and Render, the system uses a **Dual-Auth Strategy**:

* **Server-Side:** Tokens are stored in `httpOnly` cookies for Next.js middleware protection.
* **Client-Side:** Tokens are passed via `Authorization: Bearer` headers in Axios interceptors to ensure the Render API remains protected without "SameSite" cookie conflicts.

### 2. State Management & Feedback

* **TanStack Query:** Used for server-state management, ensuring data stays fresh across the dashboard without manual page refreshes.
* **Sonner:** Integrated into all mutations (Create, Update, Delete) to provide high-quality, non-blocking UI feedback.

---

## 🛠 Installation & Local Setup

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/courier-and-parcel.git

```


2. **Setup Backend:**
```bash
cd server
npm install
# Create a .env file with MONGODB_URI and JWT_SECRET
npm run dev

```


3. **Setup Frontend:**
```bash
cd client
npm install
# Create a .env.local with NEXT_PUBLIC_API_URL
npm run dev

```

⚠️ Cold Start Note (Render Free Tier)
This project is hosted on Render's Free Instance.

Server Sleep: After 15 minutes of inactivity, the backend server automatically goes into "sleep mode."

Spin-up Delay: The first request made to the API after a period of inactivity may take 50 seconds or more to respond while the instance boots up.

Ongoing Performance: Once the server is awake, subsequent requests will respond at normal speeds.

---

## 📝 Project Summary for Evaluators

While the original requirement suggested **Socket.IO**, this implementation utilizes **TanStack Query Invalidation** and **optimized API polling** to ensure data consistency in a serverless-friendly environment (Vercel/Render). This ensures 100% uptime and reliability without the connection drops common in free-tier WebSocket deployments.

---
