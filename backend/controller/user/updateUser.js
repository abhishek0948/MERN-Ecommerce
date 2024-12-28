const userModel = require("../../models/userModel");

exports.updateUser = async (req,res,next) => {
    try {
        const sessionUser = req.user?._id;
        // console.log(sessionUser);

        const {userId , name , email , role} = req.body;
        // console.log("User Id",userId);
        // console.log("name:",name);
        // console.log("email:",email);
        // console.log("Role",role);

        const payload = {
            ...(email && {email : email}),
            ...(name && {name : name}),
            ...(role && {role : role})
        }
        
        const user = await userModel.findById(sessionUser);
        // console.log("user.role",user.role);

        const updateUser = await userModel.findByIdAndUpdate(userId,payload);
        
        res.status(200).json({
            data: updateUser,
            message: "User Updated",
            success: true,
            error: false
        })

    } catch (err) {
        return res.status(400).json({
            message: err,
            success: false,
            error: true
        })
    }
}