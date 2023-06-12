const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    /// extract the web tokens
    // req.cokkies.token
    const token = req.body.token;

    if (!token) {
      return res.status(402).json({
        success: true,
        message: "Token missing",
      });
    }
    try {
      const decode = jwt.verify(token, Process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "token invaild",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Somethimg went wrong,while verifying the token",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return res.status(401).json({
        success: true,
        message: "This is a protected route for student",
      });

    }
    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user role not matching",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: true,
        message: "This is a protected route for admin",
      });
    }
    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user role not matching",
    });
  }
};
