const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {
  try {
    console.log("REGISTER REQUEST:", req.body);

    const {
      name,
      email,
      password,
      role
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email is already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    await User.create({
      name,
      email,
      password: hashedPassword,
      role:
        role === "employer"
          ? "employer"
          : "candidate"
    });

    console.log("USER CREATED:", email);

    return res.status(201).json({
      message: "Registration successful"
    });

  } catch (error) {
    console.error(
      "REGISTER ERROR:",
      error
    );

    return res.status(500).json({
      message: error.message
    });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const valid = await bcrypt.compare(
      password,
      user.password
    );

    if (!valid) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
   console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      message: error.message
    });
  }
});


module.exports = router;
