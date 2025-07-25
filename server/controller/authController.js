const jwt = require("jsonwebtoken");
const sendMail = require("../utils/nodemailer");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const SECRET_KEY = process.env.JWT_SECRET;

const signUp = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const token = jwt.sign(
    { username, email, password: hashedPassword },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  const CLIENT_DOMAIN = process.env.CLIENT_URL || "http://localhost:5173";
  const SERVER_DOMAIN = process.env.SERVER_URL || "http://localhost:4000";

  const verificationLink = `${SERVER_DOMAIN}/api/verify-email?token=${token}`;

  const html = `
  <div style="background-color: #333438; padding: 40px 20px; font-family: Arial, sans-serif; text-align: center;">
    <h1 style="color: #e2b714; font-size: 28px; margin-bottom: 10px;">Type Sphere</h1>
    <h2 style="color: #ffffff; opacity: 0.9; font-size: 22px; margin-bottom: 15px;">Verify your email address</h2>
    <p style="color: #ffffff; opacity: 0.8; font-size: 16px; line-height: 1.5; max-width: 500px; margin: 0 auto 30px;">
      Please confirm that you want to use this as your Type Sphere account email address.
      Once it's done, you will be able to start using your account!
    </p>
    <a href="${verificationLink}" style="display: inline-block; background-color: #e2b714; color: white; text-decoration: none; padding: 12px 28px; font-size: 16px; font-weight: bold; border-radius: 5px; margin-top: 20px;">
      Verify my email
    </a>
  </div>
`;

  try {
    await sendMail({
      to: email,
      subject: "Email Verification - Type Sphere",
      html,
    });

    res
      .status(201)
      .json({ message: "Verification email sent. Please check your inbox." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) return res.status(400).send("Token is missing");
  const CLIENT_DOMAIN = process.env.CLIENT_URL || "http://localhost:5173";

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { username, email, password: hashedPassword } = decoded;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send("User already verified");

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isVerified: true,
    });

    await newUser.save();

    res.redirect("http://localhost:5173/login");
  } catch (err) {
    res.send(`
  <div style="text-align:center; padding: 20px;">
    <h2 style="color: red;">Invalid or expired verification link.</h2>
    <p><a href="${CLIENT_DOMAIN}/signup">Click here to go back to Signup</a></p>
  </div>
`);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Email not verified" });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1d" });

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signUp, verifyEmail, login };
