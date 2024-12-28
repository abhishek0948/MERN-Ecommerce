const productModel = require('../../models/productModel.js');

exports.getProductDetails = async (req,res,next) => {
    try {  
        const id = req?.query.id;
        // console.log(req?.query.id);
        const product = await productModel.findById(id);

        return res.status(200).json({
            message: "Product Details Fetched",
            success: true,
            error: false,
            data: product
        })
    } catch(err) {
        return res.status(202).json({
            message: err.message || "An error occurred while fetching Product Details",
            success: false,
            error: true,
        });
    }
}
