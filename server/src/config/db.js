const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         const mongoURI = process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/courier-parcel';

//         await mongoose.connect(mongoURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         console.log('MongoDB connected successfully');
//         return mongoose.connection;
//     } catch (error) {
//         console.error('MongoDB connection error:', error.message);
//         process.exit(1);
//     }
// };

let isConnected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = db.connections[0].readyState;
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        // Important: Do not use process.exit(1) on Vercel as it kills the function
    }
};

module.exports = connectDB;