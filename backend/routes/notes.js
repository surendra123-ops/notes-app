const express = require('express');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all notes for authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, tag } = req.query;
    const query = { author: req.userId };

    // Add search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    // Add tag filter
    if (tag) {
      query.tags = { $in: [tag] };
    }

    const notes = await Note.find(query)
      .sort({ isPinned: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('author', 'name email');

    const total = await Note.countDocuments(query);

    res.json({
      notes,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single note
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const note = await Note.findOne({ 
      _id: req.params.id, 
      author: req.userId 
    }).populate('author', 'name email');

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ note });
  } catch (error) {
    console.error('Get note error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new note
router.post('/', authenticateToken, [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
  body('content').isLength({ min: 1, max: 10000 }).withMessage('Content must be between 1 and 10000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { title, content, tags, color, isPinned } = req.body;

    const note = new Note({
      title,
      content,
      author: req.userId,
      tags: tags || [],
      color: color || '#ffffff',
      isPinned: isPinned || false
    });

    await note.save();
    await note.populate('author', 'name email');

    res.status(201).json({ 
      message: 'Note created successfully',
      note 
    });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update note
router.put('/:id', authenticateToken, [
  body('title').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
  body('content').optional().isLength({ min: 1, max: 10000 }).withMessage('Content must be between 1 and 10000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { title, content, tags, color, isPinned } = req.body;
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (tags !== undefined) updateData.tags = tags;
    if (color !== undefined) updateData.color = color;
    if (isPinned !== undefined) updateData.isPinned = isPinned;

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, author: req.userId },
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'name email');

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ 
      message: 'Note updated successfully',
      note 
    });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete note
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ 
      _id: req.params.id, 
      author: req.userId 
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user's tags
router.get('/tags/all', authenticateToken, async (req, res) => {
  try {
    const tags = await Note.distinct('tags', { author: req.userId });
    res.json({ tags });
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;