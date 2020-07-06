const mongoose = require('mongoose')
var DevicesSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    trim: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
})

const Devices = mongoose.model('Devices', DevicesSchema)
module.exports = Devices
