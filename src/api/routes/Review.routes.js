const isAdmin = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");

const {
  deleteReview,
  getAll,
  getById,
  createReview,
} = require("../controllers/Review.controllers");

const express = require("express");

const reviewRoutes = express.Router();

reviewRoutes.delete("/deleteReview", deleteReview);
reviewRoutes.get("/", getAll);
reviewRoutes.get("/:id", getById);
reviewRoutes.post("/createReview", createReview);

module.exports = reviewRoutes;
