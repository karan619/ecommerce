import User from "../models/User";
import jwt from "jsonwebtoken";

//Register

export const signUp = async (req, res) => {
  const { name, lastname, username, email, password, confirmpassword } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const result = await User.create({
      name,
      lastname,
      username,
      email,
      password,
      confirmpassword,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
    //console.log(err);
  }
};

//LogIn

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesnot exist" });
    }

    if (existingUser.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ email: existingUser.email }, "shhhh", {
      expiresIn: "1h",
    });

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json(err);
  }
};
