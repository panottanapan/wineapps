const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Route Imports
const wineRoutes = require('./routes/wineRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// HTML Page Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'store.html')));
app.get('/wines', (req, res) => res.sendFile(path.join(__dirname, 'public', 'wines.html')));
app.get('/cellar', (req, res) => res.sendFile(path.join(__dirname, 'public', 'cellar.html')));
app.get('/cart', (req, res) => res.sendFile(path.join(__dirname, 'public', 'cart.html')));

// API Routes (MVC Pattern)
app.use('/api', authRoutes);
app.use('/api/wines', wineRoutes);
app.use('/api', orderRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});