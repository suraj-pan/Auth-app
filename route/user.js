const express = require("express");
const router = express.Router();

const { login, signUp } = require("../controller/auth");
const { auth, isStudent, isAdmin } = require("../middleware/auth");
router.post("/login", login);
router.post("/signUp", signUp);

// protected route
router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected Route of test",
  });
});

router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected Route of Student",
  });
});
router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected Route of Admin",
  });
});

module.exports = router;
