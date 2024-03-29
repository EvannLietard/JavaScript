const mongoose = require('mongoose');
const Ticket = require('./ticket.model');


const userSchema = new mongoose.Schema({
  username : String,
  login : {
            type : String,
            required : true,
            unique : true
          },
  password : {
              type : String,
              required : true
             },
  admin : {
            type : Boolean,
            default: false
          },
  tickets: [{type: mongoose.Schema.Types.ObjectId, ref:'Ticket'}],
});

const dbConnection = require('../controllers/db.controller');


const User = dbConnection.model('User', userSchema);
module.exports.model = User;