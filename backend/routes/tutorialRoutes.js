const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Tutorial = require('../models/Tutorial');
const Category = require('../models/Category');
const User = require('../models/User');

// @route   GET api/tutorials/categories
// @desc    Ambil semua kategori untuk halaman HOME
router.get('/categories', auth, async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: 'tutorials',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'tutorialList',
        },
      },
      {
        $project: {
          name: 1,
          image: 1,
          description: 1,
          count: { $size: '$tutorialList' },
        },
      },
    ]);
    res.json(categories);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/tutorials/categories
// @desc    Tambah kategori baru
router.post('/categories', auth, async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const category = await newCategory.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- ROUTES UNTUK TUTORIAL ---
// @route   GET api/tutorials
// @desc    Ambil SEMUA tutorial
router.get('/', auth, async (req, res) => {
  try {
    const tutorials = await Tutorial.find().populate('categoryId', 'name');
    res.json(tutorials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tutorials/category/:categoryId
// @desc    Ambil semua tutorial berdasarkan ID kategori
router.get('/category/:categoryId', auth, async (req, res) => {
  try {
    const tutorials = await Tutorial.find({
      categoryId: req.params.categoryId,
    });
    res.json(tutorials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tutorials/:id
// @desc    Ambil detail satu tutorial berdasarkan ID
router.get('/:id', auth, async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id).populate(
      'categoryId',
      'name',
    );
    if (!tutorial)
      return res.status(404).json({ msg: 'Tutorial tidak ditemukan' });
    res.json(tutorial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/tutorials
// @desc    Tambah tutorial baru (Hubungkan ke categoryId)
router.post('/', auth, async (req, res) => {
  try {
    const newTutorial = new Tutorial(req.body);
    const tutorial = await newTutorial.save();
    res.json(tutorial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/tutorials/complete/:id
// @desc    Mark as Complete - Update progres user
router.put('/complete/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.completed_tutorials.includes(req.params.id)) {
      user.completed_tutorials.push(req.params.id);
      await user.save();
    }
    res.json({
      msg: 'Tutorial berhasil diselesaikan!',
      progress: user.completed_tutorials.length,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
