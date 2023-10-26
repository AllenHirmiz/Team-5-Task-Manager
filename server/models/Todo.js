const { Schema } = require("mongoose");

const todoSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  datecreated: {
    type: Date,
    default: Date.now,
  },
  duedate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
  },
});

module.exports = todoSchema;
