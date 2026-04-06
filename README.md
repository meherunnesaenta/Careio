🏥 Care.IO – Service Booking Platform

Care.IO is a modern service booking platform designed for baby care and elderly care services. It connects users with trusted service providers, enabling seamless booking, secure payments, and real-time service tracking.

live link : https://careio-gamma.vercel.app/

🚀 Features
👤 User Authentication & Authorization
Secure login & registration using JWT and NextAuth
Role-based access control:
Admin
User
Service Provider
📅 Service Booking System
Book services with real-time availability checking
Track booking status (pending, accepted, completed)
💳 Secure Payment Integration
Integrated with Stripe
Webhook-based payment confirmation
Secure transaction handling
📊 Admin Dashboard
User & provider management
Booking analytics
Service monitoring system
🔔 Real-Time Features
Booking status updates
Notifications (email-based)
Provider workflow tracking
⭐ Review & Rating System
Users can rate and review services
Improves service quality and trust
📱 Responsive UI
Fully responsive design
Works on mobile, tablet, and desktop
🛠️ Tech Stack
Frontend
Next.js
Tailwind CSS
Framer Motion
Backend
Node.js
Express.js
Database
MongoDB
Authentication
JWT
NextAuth
Payment
Stripe
📂 Project Structure
careio/
│── app/                # Next.js App Router
│── components/         # Reusable UI components
│── actions/            # Server actions (API logic)
│── lib/                # Database & utility functions
│── public/             # Static assets
│── styles/             # Global styles
│── models/             # MongoDB schemas
│── middleware/         # Auth & role protection
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/careio.git
cd careio
2️⃣ Install dependencies
npm install
3️⃣ Setup Environment Variables

Create a .env.local file:

MONGODB_URI=your_mongodb_connection
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
▶️ Run the Project
Development
npm run dev
Production Build
npm run build
npm start
🔐 Security Features
Password hashing using bcrypt
JWT-based authentication
Protected API routes
Stripe secure payment processing
📡 API Highlights
User authentication APIs
Booking management APIs
Payment webhook handling
Role-based protected routes
📈 Future Improvements
Live chat between user & provider
AI-based service recommendation
Mobile app (React Native)
Advanced analytics dashboard
🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

📜 License

This project is licensed under the MIT License.

👩‍💻 Author

Meherun Nesa Enta
CSE Student | Web Developer
