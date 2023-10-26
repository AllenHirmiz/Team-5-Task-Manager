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
      const todoData = await Todo.find();
      console.log(todoData);
      return todoData;
    },
    // Find by ID????
  },

  // Add query todo, find all

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
      //console.log(context);
      const todo = await Todo.create({
        username,
        title,
        description,
        datecreated,
        duedate,
        status,
      });
      console.log(todo);
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
      console.log("hitting saveTodo");
      if (context.user) {
        const update = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedTodos: savedData } },
          { new: true }
        );

        return update;
      }
      throw AuthenticationError;
      ("You need to be logged in!");
    },
    //remove a Todo from savedTodos
    removeTodo: async (parent, { TodoId }, context) => {
      if (context.user) {
        const removeTodo = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedTodos: { TodoId } } },
          { new: true }
        );

        return removeTodo;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
