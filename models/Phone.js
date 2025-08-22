const mongoose = require('mongoose');

// Define phone schema
const phoneSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  phoneType: {
    type: String,
    enum: ['mobile', 'home', 'work', 'other'],
    default: 'mobile'
  },
  isPrimary: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create and export the model
const Phone = mongoose.model('Phone', phoneSchema);
module.exports = Phone;