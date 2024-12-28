const userModel = require("../../models/userModel")

exports.allUsers = async (req,res,next) => {
    try {
        // console.log("User id",req.user._id);
        const allusers = await userModel.find();

        res.status(200).json({
            message:"All users fetched",
            data: allusers,
            success: true,
            error: false
        })
    } catch(err) {
        return res.status(400).json({
            message: err,
            success: false,
            error: true
        })
    }
}