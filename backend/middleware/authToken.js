const jwt = require("jsonwebtoken");

exports.authToken = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;

    if (!token) {
      return res.json({
        message: "User not Login",
        success: false,
        error: true,
      });
    }

    await jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      // console.log(decoded);

      if (err) {
        console.log("Error in Auth:", err);
        return res.status(400).json({
          message: "Token is invalid or expired",
          success: false,
          error: true,
        });
      }

      req.user = req.user || {};
      req.user._id = decoded?._id;
      next();
    });
  } catch (err) {
    res.status(400).json({
      data: [],
      message: err,
      error: true,
      success: false,
    });
  }
};
