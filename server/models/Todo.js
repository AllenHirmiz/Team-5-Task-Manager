const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
  username: {
    type: String,
    required: false,
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

const Todo = model("Todo", todoSchema);

module.exports = Todo;
