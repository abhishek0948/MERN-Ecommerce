const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

exports.userSignUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const existingUser = await userModel.findOne({ email });
    // console.log("Printing in backend",existingUser);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already in use", success: false, error: true });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    if (!hashedPassword) {
      throw new Error("Something went wrong in hasing password");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashedPassword,
    };

    const userData = new userModel(payload);
    userData
      .save()
      .then(() => {
        return res.status(201).json({
          data: userData,
          message: "User created successfully",
          success: true,
          error: false,
        });
      })
      .catch((error) => {
        res.status(500).json({
          data: [],
          message: "Error creating user",
          success: false,
          error: true,
        });
      });
  } catch (err) {
    console.log("Error in UserSup Controller", err);
    return res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
