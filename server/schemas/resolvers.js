const { User, Todo } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    //query the single user based on their logged in status
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select("-password");
      }
      throw AuthenticationError;
    },
    todo: async (parent, args, context) => {
      return await Todo.find({});
    },
  },

  Mutation: {
    //create a new user and sign a token for that user
    addUser: async (parent, { username, email, password, name }, context) => {
      const user = await User.create({ username, email, password, name });
      const token = signToken(user);
      return { token, user };
    },
    //create a new todo
    addTodo: async (
      parent,
      { username, title, description, datecreated, duedate, status },
      context
    ) => {
      const todo = await Todo.create({
        username,
        title,
        description,
        datecreated,
        duedate,
        status,
      });
      return todo;
    },
    //log in the user with the appropriate credentials, sign a token
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
    //if user is logged in, save a Todo to user's Todo
    saveTodo: async (parent, { savedData }, context) => {
      if (context.user) {
        const update = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedTodos: savedData } },
          { new: true }
        );
        return update;
      }
      throw AuthenticationError;
    },
    //remove a Todo from savedTodos
    removeTodo: async (parent, { todoId }, context) => {
      const removeItem = await Todo.findOneAndRemove({
        _id: todoId,
      });
      return removeItem;
    },
    //edit a Todo based on its ID
    editTodo: async (parent, args, context) => {
      const { _id, ...taskFields } = args;
      return await Todo.findOneAndUpdate({ _id }, taskFields, { new: true });
    },
  },
};

module.exports = resolvers;
