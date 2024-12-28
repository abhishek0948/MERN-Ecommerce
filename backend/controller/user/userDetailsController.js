const userModel = require("../../models/userModel");

exports.userDetailsController = async (req,res,next) => {
    try {
        const user = await userModel.findById(req.user._id).select("-password");

        // console.log(user);
        if(!user) {
            return res.status(404).json({
                message: "User Not found",
                success: false,
                error:true
            })
        }
        
        return res.status(200).json({
            data: user,
            message: "Fetched details successfully",
            success: true,
            error: false
        });
    } catch (err) {
        return res.status(400).json({
            message: err,
            success: false,
            error: true
        })
    }
}