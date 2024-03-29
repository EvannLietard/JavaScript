const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  description: { type: String , required: true , unique: true},
  numberOfPlace: {type: Number,required: true}
}, { versionKey: false });
const dbConnection = require('../controllers/db.controller');
const Show = dbConnection.model('Show', showSchema);
module.exports = Show;
