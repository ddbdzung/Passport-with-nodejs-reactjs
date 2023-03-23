const mongoose = require('mongoose')

const User = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    index: true,
  },
  profile: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
})
