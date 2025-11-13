🏨 Hotel Booking System

A full-stack Hotel Booking Website that enables users to search for hotels, view room availability, and make reservations.
Admins can manage hotels, rooms, and bookings through a secure dashboard.

✨ Features
👤 User Features

🔍 Search hotels by location, dates, and number of guests

🏠 View detailed hotel and room information

💳 Book rooms with real-time availability

🔐 Register and log in using secure password hashing

📋 View and manage booking history

⭐ Rate and review hotels

🛠️ Admin Features

🏢 Manage hotel listings (Add, Edit, Delete)

🛏️ Manage room types, availability, and pricing

👥 Manage users and their bookings

📊 View all reservations and booking analytics

🧩 Tech Stack
Frontend

HTML5 – Structure and layout

Tailwind CSS – Fast and responsive styling

JavaScript (Vanilla) – Dynamic content and interactivity

Fetch API / Axios – To communicate with backend APIs

Backend

Node.js – JavaScript runtime

Express.js – Backend web framework

MongoDB – NoSQL database for storing users, hotels, and bookings

Mongoose – ODM for MongoDB

Bcrypt – Secure password hashing

JWT – Authentication and authorization

CORS & Express Validator – Security and input validation

📁 Project Structure
hotel-booking-system/
├── client/
│   ├── assets/
│   ├── css/
│   ├── js/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── components/
│   │   └── main.js
│   ├── index.html
│   ├── hotel.html
│   ├── booking.html
│   ├── login.html
│   └── register.html
│
└── server/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   └── server.js
    ├── package.json
    └── .env

🚀 Getting Started
Prerequisites

Node.js (v14+)

MongoDB (Local or MongoDB Atlas)

npm or yarn

Installation Steps

Clone the repository

git clone https://github.com/abheeks-hub/Hotel_Booking.git
cd Hotel_Booking


Setup Backend

cd backend
npm install


Create Environment Variables
Inside /backend/.env:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/hotel-booking
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development


Setup Frontend

Open /frontend folder in VS Code

Link API URLs in your JS files (e.g. const BASE_URL = 'http://localhost:5000/api';)

Running the Application

Start MongoDB

mongod


Start Backend Server

cd backend
npm run dev


Open Frontend

Open frontend/index.html directly in your browser
or

Use a local server like Live Server in VS Code

Access Points

Frontend: http://localhost:5500
 (or your Live Server port)

Backend API: http://localhost:5000

📝 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	User login
GET	/api/auth/profile	Fetch user profile (Protected)
Hotels
Method	Endpoint	Description
GET	/api/hotels	Get all hotels
GET	/api/hotels/:id	Get specific hotel
POST	/api/hotels	Add new hotel (Admin only)
PUT	/api/hotels/:id	Update hotel info (Admin)
DELETE	/api/hotels/:id	Remove hotel (Admin)
Bookings
Method	Endpoint	Description
POST	/api/bookings	Create booking
GET	/api/bookings	Get user’s bookings
GET	/api/bookings/:id	Get booking by ID
PUT	/api/bookings/:id	Update booking
DELETE	/api/bookings/:id	Cancel booking
🗃️ Database Schemas
User Model
{
  name: String,
  email: { type: String, unique: true },
  password: String, // Hashed with bcrypt
  role: { type: String, default: "user" },
  phone: String,
  createdAt: { type: Date, default: Date.now }
}

Hotel Model
{
  name: String,
  description: String,
  location: String,
  images: [String],
  amenities: [String],
  rooms: [RoomSchema],
  rating: Number,
  createdAt: { type: Date, default: Date.now }
}

Booking Model
{
  user: { type: ObjectId, ref: "User" },
  hotel: { type: ObjectId, ref: "Hotel" },
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  totalPrice: Number,
  status: { type: String, default: "confirmed" },
  createdAt: { type: Date, default: Date.now }
}

🔐 Security Features

Passwords hashed using bcrypt

JWT authentication for secure login

Protected routes for users and admins

Input validation & sanitization

CORS properly configured

Environment variables hidden with .env

🎨 UI/UX Features

Fully responsive with Tailwind CSS

Simple, clean, and user-friendly layout

Loading states and error handling

Smooth transitions and modals

Mobile-first design

🧪 Testing
# Backend tests
cd backend
npm test

📦 Deployment
Backend
cd backend
npm start

Frontend

Upload all files in /frontend to your hosting provider (Netlify, Vercel, etc.)

🤝 Contributing

Contributions are welcome!
Please open an issue or submit a pull request.

📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Abheek – Developer & Maintainer
GitHub: abheeks-hub
