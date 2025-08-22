const express = require('express');
const router = express.Router();
const phoneController = require('../controllers/phoneController');

// Phone Routes
router.post('/', phoneController.createPhone);                    // CREATE
router.get('/user/:userId', phoneController.getPhonesByUserId);   // READ by user
router.delete('/:id', phoneController.deletePhone);              // DELETE

module.exports = router;
