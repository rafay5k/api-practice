const Phone = require('../models/phone');
const User = require('../models/User');

// CREATE - Add new phone number
const createPhone = async (req, res) => {
  try {
    const { userId, phoneNumber, phoneType, isPrimary } = req.body;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // If this is set as primary, unset other primary phones for this user
    if (isPrimary) {
      await Phone.updateMany(
        { userId: userId },
        { isPrimary: false }
      );
    }
    
    const newPhone = new Phone({
      userId,
      phoneNumber,
      phoneType,
      isPrimary
    });
    
    const savedPhone = await newPhone.save();
    res.status(201).json({
      message: 'Phone number added successfully',
      phone: savedPhone
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error adding phone number',
      error: error.message
    });
  }
};

// READ - Get all phone numbers for a user
const getPhonesByUserId = async (req, res) => {
  try {
    const phones = await Phone.find({ userId: req.params.userId });
    res.status(200).json({
      message: 'Phone numbers retrieved successfully',
      phones: phones
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error getting phone numbers',
      error: error.message
    });
  }
};

// DELETE - Delete phone number
const deletePhone = async (req, res) => {
  try {
    const deletedPhone = await Phone.findByIdAndDelete(req.params.id);
    
    if (!deletedPhone) {
      return res.status(404).json({
        message: 'Phone number not found'
      });
    }
    
    res.status(200).json({
      message: 'Phone number deleted successfully',
      phone: deletedPhone
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting phone number',
      error: error.message
    });
  }
};

module.exports = {
  createPhone,
  getPhonesByUserId,
  deletePhone
};
