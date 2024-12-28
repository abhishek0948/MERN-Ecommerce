const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.userSignInController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields",
        success: false,
        error: true,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    const checkPassword = await bcrypt.compare(password,user.password);

    if(!checkPassword) {
        return res.json({
            message:"Incorrect Password",
            success: false,
            error: true
        })
    }

    const tokenData = {
      _id : user._id,
      email : user.email
    }

    const token = jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY, {expiresIn :60*60});
  
    const tokenOptions = {
      httpOnly : true,
      secure : true
    }

    return res.cookie("token",token,tokenOptions).status(200).json({
      message: `Welcome back ${user.name}`,
      success: true,
      error: false,
      data : token
    })

  } catch (err) {
    return res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
