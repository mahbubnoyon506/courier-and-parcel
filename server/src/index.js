const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
const authRoute = require("./routes/authRoutes")
const customersRoute = require("./routes/parcelRoutes")
const agetRoute = require("./routes/agentRoutes")
const adminRoute = require("./routes/adminRoutes");
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable CORS for frontend
app.use(cors({
    origin: process.env.FRONTEND_DOMAIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.options('*', cors());

// MongoDB Connection
connectDB();

// Starter route
app.get('/', (req, res) => {
    res.send('Courier and Parcel Server is running');
});

//routes
app.use("/api/auth/", authRoute)
app.use("/api/", customersRoute)
app.use("/api/", agetRoute)
app.use("/api/", adminRoute)

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start Server
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}