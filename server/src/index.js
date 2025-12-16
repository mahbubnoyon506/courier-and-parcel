const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();
const authRoute = require("./routes/authRoutes")
const customersRoute = require("./routes/parcelRoutes")
const agetRoute = require("./routes/agentRoutes")
const adminRoute = require("./routes/adminRoutes");
const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable CORS for frontend
app.use(cors({
    origin: 'http://localhost:3000',
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

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Example: Join a room based on user ID for notifications
    socket.on('joinRoom', (userId) => {
        socket.join(userId);
        console.log(`Socket ${socket.id} joined room ${userId}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});