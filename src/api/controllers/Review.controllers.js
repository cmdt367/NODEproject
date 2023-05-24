const Review = require("../models/Review.models");
const Event = require("../models/Event.models");
const User = require("../models/User.models");

//------------------------------ CREATE REVIEW ------------------------------
//--------------------------------------------------------------------------
const createReview = async (req, res, next) => {
  try {
    const { email, eventId, description, userId, points } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("No existe el usuario");
    } else {
      const newReview = new Review({
        event: eventId,
        description: description,
        user: userId,
        points: points,
      });

      const savedReview = await newReview.save();

      if (savedReview) {
        const event = await Event.findById(eventId);
        if (!event) {
          return res.status(404).json("El evento no existe");
        }

        await User.findByIdAndUpdate(user._id, {
          $push: { review: savedReview._id },
        });

        await Event.findByIdAndUpdate(eventId, {
          $push: { review: savedReview._id },
        });
        return res.status(200).json(savedReview);
      } else {
        return res.status(404).json("No se ha creado correctamente la reseña");
      }
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ DELETE ------------------------------
//----------------------------------------------------------------------
// Modificado
const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);

    if (await Review.find(id)) {
      return res.status(404).json("La Review no se ha borrado");
    } else {
      return res.status(200).json("Review borrada");
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ GETBYALL ------------------------------
//----------------------------------------------------------------------

const getAll = async (req, res, next) => {
  try {
    const { all } = req.params;
    const getByAll = await Review.find({ all }).populate("event user");
    if (getByAll) {
      return res.status(200).json(getByAll);
    } else {
      return res.status(404).json("Not found get by all");
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ GETBYID ------------------------------
//----------------------------------------------------------------------

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getById = await Review.findById(id).populate("event user");
    if (getById) {
      return res.status(200).json(getById);
    } else {
      return res.status(404).json("Not found get by id");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { createReview, deleteReview, getAll, getById };
