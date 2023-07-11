const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const userSchema = new Schema({
  password: {
    type: String,
    minlength: 6,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: emailRegexp,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
});

const User = model("user", userSchema);

const registerSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().required().pattern(emailRegexp),
  subscription: Joi.string().valueOf("starter", "pro", "business"),
});

const loginSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().required().pattern(emailRegexp),
});

const schemas = { register: registerSchema, login: loginSchema };

module.exports = { User, schemas };
