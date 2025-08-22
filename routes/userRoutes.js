const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD Routes
router.post('/', userController.createUser);           // CREATE
router.get('/', userController.getAllUsers);           // READ all
router.get('/:id', userController.getUserById);        // READ one
router.put('/:id', userController.updateUser);         // UPDATE
router.delete('/:id', userController.deleteUser);      // DELETE

module.exports = router;
