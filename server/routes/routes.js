const express = require("express");
const { signUp, verifyEmail, login } = require("../controller/authController");
const { saveResult } = require("../controller/controller");

const router = express.Router();

router.post("/signup", signUp);
router.get("/verify-email", verifyEmail);
router.post("/login" , login)
router.post("/save-result" , saveResult)


module.exports = router;
