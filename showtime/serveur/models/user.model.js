const mongoose = require('mongoose');
const Ticket = require('./ticket.model');


const userSchema = new mongoose.Schema({
  name: { type: String },
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  
  isAdmin: { type: Boolean, default: false },
  tickets: [{type: mongoose.Schema.Types.ObjectId, ref:'Ticket'}],
}, 
{ versionKey: false });
const dbConnection = require('../controllers/db.controller');


const User = dbConnection.model('User', userSchema);
module.exports = User;