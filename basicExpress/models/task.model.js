const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true, unique: true },
  urgency: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
      set: function(value) {
          if (value < 1) {
              return 1;
          } else if (value > 5) {
              return 5;
          } else {
              return value;
          }
      }
  }
}, { versionKey: false });
const dbConnection = require('../controllers/db.controller');
const Task = dbConnection.model('Task', taskSchema);
module.exports = Task;
