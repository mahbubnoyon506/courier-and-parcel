const express = require('express');
const dotenv = require('dotenv');

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});