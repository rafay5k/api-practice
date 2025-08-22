const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

// Virtual field to get user's phone numbers
userSchema.virtual('phoneNumbers', {
  ref: 'Phone',
  localField: '_id',
  foreignField: 'userId'
});

// Include virtual fields when converting to JSON
userSchema.set('toJSON', { virtuals: true });

// Create and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
