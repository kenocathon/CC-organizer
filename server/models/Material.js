const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
  materialName: {
    type: String,
    trim: true,
    required: "Material name is required"
  },
  cost: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true,
  }
})

module.exports = mongoose.model('material', MaterialSchema);