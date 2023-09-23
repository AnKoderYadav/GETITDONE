const Todo = require("../models/Todo");

module.exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.find().sort({ updatedAt: -1 });
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
  }
};

module.exports.saveTodo = async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
    });
    if (!todo) return res.send("Nothing");
    todo.save();
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.text = req.body.text;
    todo.save();
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteTodo = async (req, res) => {
  try {
    const data = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
