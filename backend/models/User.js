const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Agar satu email hanya bisa punya satu akun
  },
  password: {
    type: String,
    required: true,
  },
  // Menghubungkan ke Tutorial yang sudah diselesaikan (untuk statistik di profil)
  completed_tutorials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutorial',
    },
  ],
  static_stats: {
    hours_learned: { type: Number, default: 8.5 },
    certificates_earned: { type: Number, default: 3 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
