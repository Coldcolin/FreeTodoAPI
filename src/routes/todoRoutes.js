const express = require('express');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');
const router = express.Router();

// Create todo (authenticated)
router.post('/create-todo', auth, async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      user: req.user._id
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get one todo
router.get('/get-one-todo/:todoId', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all todos (non-trash)
router.get('/get-all-todos', async (req, res) => {
  try {
    const todos = await Todo.find({ isTrash: false });
    res.json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all trash todos (authenticated)
router.get('/get-all-trash-todos', auth, async (req, res) => {
  try {
    const todos = await Todo.find({
      user: req.user._id,
      isTrash: true
    });
    res.json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Trash todo (authenticated)
router.patch('/trash-todo/:todoId', auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.todoId,
      user: req.user._id
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.isTrash = true;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update todo
router.patch('/update-todo/:todoId', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'isCompleted'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    updates.forEach(update => todo[update] = req.body[update]);
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete todo permanently
router.delete('/delete-todo/:todoId', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.todoId);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
