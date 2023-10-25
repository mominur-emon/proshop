const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

/*Auth user(login) and get token */
//POST/api/users/login
//public
const authUser = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Inavlid email or password ");
  }
});

/*Register user*/
//POST/api/users
//public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Inavlid user data ");
  }
});

/* logout user */
//POST/api/users/logout
//private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

/*get user profile*/
//GET/api/users/profile
//private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/*update user profile*/
//PUT/api/users/profile
//private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Not updated. User not found !");
  }
});

//GET users
//GET/api/users
//private/admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

//GET user by ID
//GET/api/users/:id
//private/admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

//delete users
//DELETE/api/users/:id
//private/admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

//update users
//PUT/api/users/:id
//private/admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
