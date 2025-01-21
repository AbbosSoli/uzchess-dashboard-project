import jsonServer from 'json-server';
import express from 'express';
import path from 'path';

const app = express();
const router = jsonServer.router('db.json'); // Path to db.json
const middlewares = jsonServer.defaults();

// Serve JSON Server routes at /api
app.use('/api', middlewares, router);

// Serve React app
app.use(express.static(path.join(__dirname, 'dist'))); // Adjust to your build directory
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
