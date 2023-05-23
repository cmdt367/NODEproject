const {
  register,
  getAll,
  getById,
  getByName,
  forgotPassword,
  changePassword,
  login,
  logout,
  updateUser,
  deleteUser,
  createEvent,
  addToEvent,
} = require("../controllers/User.controllers");

const express = require("express");

const userRoutes = express.Router();

userRoutes.post = ("/register", register);
userRoutes.get = ("/", register);
console.log(userRoutes);
module.exports = userRoutes;
