const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// ========================
// REGISTER
// ========================

router.post("/register", async (req, res) => {
  try {
    console.log("REGISTER REQUEST:", req.body);

    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;
    const role = req.body.role;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email is already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role:
        role === "employer"
          ? "employer"
          : "candidate"
    });

    console.log(
      "USER CREATED:",
      user._id
    );

    return res.status(201).json({
      message: "Registration successful"
    });

  } catch (error) {

    console.error(
      "REGISTER ERROR:",
      error
    );

    return res.status(500).json({
      message: error.message || "Server error"
    });
  }
});


// ========================
// LOGIN
// ========================

router.post("/login", async (req, res) => {
  try {

    const email =
      req.body.email?.trim().toLowerCase();

    const password =
      req.body.password;

    console.log(
      "LOGIN REQUEST:",
      email
    );

    const user =
      await User.findOne({ email });

    console.log(
      "USER FOUND:",
      !!user
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const valid =
      await bcrypt.compare(
        password,
        user.password
      );

    console.log(
      "PASSWORD VALID:",
      valid
    );

    if (!valid) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token =
      jwt.sign(
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
  res.status(500).json({
    message: "Server error"
  });
  }

    return res.status(500).json({
      message: error.message || "Server error"
    });
  }
});


module.exports = router;
