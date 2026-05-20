import express from "express";
import { config } from "dotenv";


// Import Routes
import movieRoutes from './routes/movieRoutes.js';

config(); // Load environment variables from .env file

const app = express();

// API Routes
app.use('/api', movieRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`);
});