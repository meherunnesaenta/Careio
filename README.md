# 🏥 Care.IO – Service Booking Platform

Care.IO is a modern full-stack service booking platform designed for baby care and elderly care services. It connects users with trusted service providers, enabling seamless booking, secure payments, and real-time service tracking.

🌐 **Live Demo:** https://careio-gamma.vercel.app/

---

## 🚀 Features

### 👤 Authentication & Authorization

* Secure login & registration using NextAuth & JWT
* Role-based access control:

  * Admin
  * User
  * Service Provider

---

### 📅 Service Booking System

* Book services with real-time availability
* Track booking status:

  * Pending
  * Accepted
  * Completed

---

### 💳 Payment Integration

* Stripe payment gateway
* Webhook-based payment confirmation
* Secure transaction handling

---

### 📊 Admin Dashboard

* Manage users & service providers
* Monitor bookings
* View analytics & reports

---

### 🔔 Real-Time Features

* Booking status updates
* Email notifications
* Provider workflow tracking

---

### ⭐ Review & Rating

* Users can rate & review services
* Improves service quality & trust

---

### 📱 Responsive Design

* Fully responsive UI
* Optimized for mobile, tablet & desktop

---

## 🛠️ Tech Stack

### Frontend

* Next.js 16
* React 19
* Tailwind CSS
* Framer Motion

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* NextAuth
* JWT

### Payment

* Stripe

---

## 📂 Project Structure

```id="f0k2mz"
careio/
│── app/                # Next.js App Router
│── components/         # Reusable UI components
│── actions/            # Server actions / API logic
│── lib/                # DB & utility functions
│── models/             # MongoDB schemas
│── middleware/         # Auth & role protection
│── public/             # Static assets
│── styles/             # Global styles
```

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash id="y6k2qp"
git clone https://github.com/your-username/careio.git
cd careio
```

### 2️⃣ Install dependencies

```bash id="n3p9zs"
npm install
```

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env id="t9x4da"
MONGODB_URI=your_mongodb_connection
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

---

## ▶️ Run the Project

### Development

```bash id="r5c2pl"
npm run dev
```

### Production

```bash id="u8d1jq"
npm run build
npm start
```

---

## 🔐 Security Features

* Password hashing using bcrypt
* JWT-based authentication
* Protected API routes
* Secure Stripe payment processing

---

## 📡 API Highlights

* Authentication APIs
* Booking management APIs
* Payment webhook handling
* Role-based protected routes

---

## 🔑 Demo Access

Admin access is not publicly available for security reasons.
If you want to test admin or provider features, feel free to contact me.

---

## 📈 Future Improvements

* 💬 Live chat between user & provider
* 🤖 AI-based service recommendation
* 📱 Mobile app (React Native)
* 📊 Advanced analytics dashboard

---

## 🚀 Deployment

* Frontend: Vercel
* Backend: Vercel / Render / Railway

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed with ❤️ to simplify healthcare and caregiving service booking.

👩‍💻 Author

Meherun Nesa Enta
CSE Student | Web Developer
