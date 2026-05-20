import express from "express";


// Import Routes
import movieRoutes from './routes/movieRoutes.js';

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