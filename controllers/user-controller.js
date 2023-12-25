import User from "../models/User";
import Blog from "../models/Blog";
import bcrypt from "bcrypt";

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ msg: "No User found" });
  }
  return res.status(200).json({ users });
};
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ msg: "User Already exists" });
  }
  // Generate a salt
  const saltRounds = 10; // You can adjust this value based on your security requirements
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password using the generated salt
  const hashedPassword = bcrypt.hashSync(password, salt);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: []
  });

  try {
    await user.save(); // save the user of do not exist
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ msg: "User desn't exists" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ msg: "Incorrect Password" });
  }
  return res.status(200).json({ msg: "Login Successfull" });
};
