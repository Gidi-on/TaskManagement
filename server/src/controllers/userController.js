import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

// user roles
const roles = {
  ADMIN: "admin",
  USER: "user",
};

//register user
const signUp = asyncHandler(async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password || !confirmPassword) {
    throw createHttpError(400, "Please fill all compulsory fields");
  }

  if (confirmPassword !== password) {
    throw createHttpError(400, "passwords don't match");
  }

  // check if user exists
  const existingUserEmail = await User.findOne({ email: email }).exec();
  if (existingUserEmail) {
    throw createHttpError(
      409,
      "A user with this email already exists. Please choose a different one or login instead."
    );
  }

  const existingUsername = await User.findOne({
    username: username,
  }).exec();
  if (existingUsername) {
    throw createHttpError(
      409,
      "A user with this username already exists. Please choose a different one or login instead."
    );
  }

  //create user
  const user = await User.create({
    username,
    email,
    password,
    confirmPassword,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    throw createHttpError(400, "Invalid user data");
  }
});

//signin user
const signIn = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw createHttpError(400, "Input fields cannot be empty");
  }

  // .select("+password +email") simply means to fetch both users pw and email
  const user = await User.findOne({ username: username })
    .select("+email +password")
    .exec();

  if (!user) throw createHttpError(401, "Invalid credentials");

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    throw createHttpError(401, "Invalid credentials");
  }
});

//signout user
const signOut = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Bye" });
});

export { signIn, signOut, signUp };
