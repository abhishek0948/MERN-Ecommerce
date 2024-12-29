const orderModel = require("../../models/orderModel");
const userModel = require("../../models/userModel");

exports.orderController = async (req,res) => {
    try {
        const userId = req?.headers["userid"];

        const user = await userModel.findById(userId);

        if(!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
                error: true
            })
        }

        const orderList = await orderModel.find({userId: userId}).sort({createdAt: -1})

        return res.status(200).json({
            message: "User Orders fetched Successfully",
            success: true,
            error: false,
            data: orderList
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}