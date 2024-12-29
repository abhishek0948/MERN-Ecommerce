const orderModel = require('../../models/orderModel');
const userModel = require('../../models/userModel.js');

const allOrders = async (req,res) => {
    try {
        const userId = req?.headers["userid"];
        // console.log(userId);
        const user = await userModel.findById(userId);
        // console.log(user);
        console.log("In backend");
        if(!user || user.role!=="ADMIN") {
            return res.status(400).json({
                message: "You are not authorized to access this route",
                success: false,
                error: true
            })
        }

        const orders = await orderModel.find().sort({createdAt: -1});

        return res.status(200).json({
            message: "All orders Fetched",
            success: true,
            error: false,
            data: orders
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}

module.exports = allOrders;