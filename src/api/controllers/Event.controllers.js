const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Review = require("../models/Review.models");
const Event = require("../models/Event.models");
const User = require("../models/User.models");
const validator = require("validator");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcript = require("bcrypt");

//------------------------------ CREATE ------------------------------
//----------------------------------------------------------------------

const createEvent = async (req, res, next) => {
  try {
  } catch (error) {}
};

//------------------------------ UPDATE ------------------------------
//----------------------------------------------------------------------

const updateEvent = async (req, res, next) => {
  try {
  } catch (error) {}
};

//------------------------------ DELETE ------------------------------
//----------------------------------------------------------------------

const deleteEvent = async (req, res, next) => {
  try {
    const { id, image } = req.params;
    await Event.findByIdAndDelete(id);

    if (await Event.findById(id)) {
      return res.status(404).json("El evento no se ha borrado");
    } else {
      deleteImgCloudinary(image);
      return res.status(200).json("Evento borrado");
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ GETBYALL ------------------------------
//----------------------------------------------------------------------

const getAll = async (req, res, next) => {
  try {
    const allEvent = await Event.find();
    if (allEvent) {
      return res.status(200).json(allEvent);
    } else {
      return res.status(404).json("Not found all Event");
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ GETBYNAME ------------------------------
//----------------------------------------------------------------------

const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const eventByName = await Event.find({ name });
    if (eventByName) {
      return res.status(200).json(eventByName);
    } else {
      return res.status(404).json("Not found Event by name");
    }
  } catch (error) {
    return next(error);
  }
};
//------------------------------ GETBYID ------------------------------
//----------------------------------------------------------------------

const getById = async (req, res, next) => {
  try {
    const {id} = req.params;
    const eventById = await Event.findById(id)

    if (eventById) {
      return res.status(200).json(eventById);
    } else {
       return res.status(404).json("not found eventById");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { createEvent, updateEvent, deleteEvent, getAll, getById, getByName };
