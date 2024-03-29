const mongoose = require('mongoose');
const Show = require('./show.model');

const ticketSchema = new mongoose.Schema({

    name: {type: mongoose.Schema.Types.ObjectId, ref:'Show'},   default:[],
    nombredeticket : {type: Number},
  }, 
  { versionKey: false });
  const dbConnection = require('../controllers/db.controller');
  
  const Ticket = dbConnection.model('Ticket', ticketSchema);
  module.exports.model = Ticket;