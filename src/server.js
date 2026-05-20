import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

// Import Routes
import movieRoutes from './routes/movieRoutes.js';

config(); // Load environment variables from .env file
connectDB(); // Connect to the database

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// API Routes
app.use('/api', movieRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`);
});

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async () => {
        await disconnectDB(); // Ensure database connection is closed
        process.exit(1); // Exit the process with an error code
    })
});

// Handle uncaught exceptions (e.g., programming errors)
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    await disconnectDB(); // Ensure database connection is closed
    process.exit(1); // Exit the process with an error code
});

// Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully...");
    server.close(async () => {
        await disconnectDB(); // Ensure database connection is closed
        console.log("Server closed. Exiting process.");
        process.exit(0); // Exit the process with a success code
    });
});