const User = require('../models/User');

// CREATE - Add new user
const createUser = async (req, res) => {
  try {
    const { name, age, city, email } = req.body;
    
    const newUser = new User({
      name,
      age,
      city,
      email
    });
    
    const savedUser = await newUser.save();
    res.status(201).json({
      message: 'User created successfully',
      user: savedUser
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating user',
      error: error.message
    });
  }
};

// READ - Get all users
const getAllUsers = async (req, res) => {
  try {
    let users;
    
    // Check if populate query parameter is present
    if (req.query.populate === 'phoneNumbers') {
      users = await User.find().populate('phoneNumbers');
    } else {
      users = await User.find();
    }
    
    res.status(200).json({
      message: 'Users retrieved successfully',
      users: users
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error getting users',
      error: error.message
    });
  }
};

// READ - Get single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      message: 'User retrieved successfully',
      user: user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error getting user',
      error: error.message
    });
  }
};

// UPDATE - Update user by ID
const updateUser = async (req, res) => {
  try {
    const { name, age, city, email } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, age, city, email },
      { new: true } // Returns updated document
    );
    
    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating user',
      error: error.message
    });
  }
};

// DELETE - Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    
    if (!deletedUser) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      message: 'User deleted successfully',
      user: deletedUser
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting user',
      error: error.message
    });
  }
};

// Export all functions
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
