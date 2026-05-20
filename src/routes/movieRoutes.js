import express from "express";

const router = express.Router();

router.get('/movies', (req, res) => {
    res.json({ message: 'List of movies' });
});

router.post('/movies', (req, res) => {
    res.json({ message: 'Movie created' });
});

router.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Details of movie with ID: ${id}` });
});

router.put('/movies/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Movie with ID: ${id} updated` });
});

router.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Movie with ID: ${id} deleted` });
});

export default router;