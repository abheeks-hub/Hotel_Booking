# 🏨 Hotel Booking System

A full-stack hotel booking website that allows users to search for hotels, view room availability, and make reservations. Admins can manage hotel listings and oversee all bookings through a dedicated dashboard.

## ✨ Features

### User Features
- 🔍 Search hotels by location, dates, and guest count
- 🏠 View detailed hotel information and room availability
- 💳 Book rooms with real-time availability checking
- 👤 User authentication and profile management
- 📋 View booking history and manage reservations
- ⭐ Rate and review hotels

### Admin Features
- 🏢 Manage hotel listings (Create, Read, Update, Delete)
- 🛏️ Manage room types and availability
- 📊 View and manage all user reservations
- 👥 User management dashboard
- 📈 Booking analytics and insights

## 🛠️ Tech Stack

### Frontend
- **React** - UI library for building user interfaces
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS Modules/Tailwind** - Styling solution

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Bcrypt** - Password hashing
- **JWT** - Authentication tokens
- **Express Validator** - Request validation

## 📁 Project Structure

```
hotel-booking-system/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   ├── config/
    │   └── server.js
    ├── package.json
    └── .env
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd hotel-booking-system
```

2. **Setup Backend**
```bash
cd backend
npm install
```

3. **Configure Environment Variables**

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hotel-booking
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

4. **Setup Frontend**
```bash
cd frontend
npm install
```

5. **Configure Frontend API URL**

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

1. **Start MongoDB** (if running locally)
```bash
mongod
```

2. **Start Backend Server**
```bash
cd server
npm run dev
```

3. **Start Frontend Development Server**
```bash
cd client
npm run dev
```

4. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel by ID
- `POST /api/hotels` - Create hotel (Admin)
- `PUT /api/hotels/:id` - Update hotel (Admin)
- `DELETE /api/hotels/:id` - Delete hotel (Admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Admin
- `GET /api/admin/bookings` - Get all bookings
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/bookings/:id/status` - Update booking status

## 🗃️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  phone: String,
  createdAt: Date
}
```

### Hotel Model
```javascript
{
  name: String,
  description: String,
  location: Object,
  images: [String],
  amenities: [String],
  rooms: [RoomSchema],
  rating: Number,
  reviews: [ReviewSchema],
  createdAt: Date
}
```

### Booking Model
```javascript
{
  user: ObjectId (ref: User),
  hotel: ObjectId (ref: Hotel),
  room: String,
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  totalPrice: Number,
  status: String,
  createdAt: Date
}
```

## 🔐 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected routes and API endpoints
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 🎨 UI/UX Features

- Responsive design for all devices
- Intuitive search and filtering
- Real-time availability updates
- Loading states and error handling
- Smooth transitions and animations
- Accessible components

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📦 Build for Production

### Frontend
```bash
cd frontend
npm run build
```

### Backend
```bash
cd backend
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - Frontend Competition Submission

## 🙏 Acknowledgments

- Built for Frontend Competition
- Inspired by modern hotel booking platforms
- Thanks to the open-source community

---

**Note**: This is a competition submission project. For questions or support, please reach out to the development team.
