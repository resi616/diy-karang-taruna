const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET api/users/profile
// @desc    Ambil data profil user yang sedang login
router.get('/profile', auth, async (req, res) => {
  try {
    // Mengambil data user berdasarkan ID dari token
    // .populate digunakan untuk mengambil detail tutorial yang sudah diselesaikan
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('completed_tutorials', 'title category');

    if (!user) {
      return res.status(404).json({ msg: 'User tidak ditemukan' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
