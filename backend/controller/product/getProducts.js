const productModel = require("../../models/productModel.js")

exports.getAllProducts = async (req,res,next) => {
    try {
        const allProducts = await productModel.find().sort({ createdAt:-1 });

        res.status(200).json({
            message:"All products fetched",
            data: allProducts,
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