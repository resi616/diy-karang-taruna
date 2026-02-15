const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- MIDDLEWARE ---
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'https://diy-karang-taruna-webapp.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'CORS Policy: Access denied.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
);

// --- KONEKSI MONGODB ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Berhasil terhubung ke MongoDB'))
  .catch((err) => console.error('❌ Gagal koneksi ke MongoDB:', err));

// --- ROUTES ---
app.get('/', (req, res) => {
  res.send('API DIY Carpentry Karang Taruna Running...');
});

app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/tutorials', require('./routes/tutorialRoutes.js'));
app.use('/api/users', require('./routes/userRoutes.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
