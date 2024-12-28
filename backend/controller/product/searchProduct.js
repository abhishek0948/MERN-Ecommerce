const productModel = require("../../models/productModel");

exports.searchProduct = async (req,res) => {
    try {
        const query = req.query.q;

        const regex = new RegExp(query,'i','g');

        const products = await productModel.find({
            "$or" : [
                {
                    productName: regex
                },
                {
                    category: regex
                }
            ]
        })

        return res.status(200).json({
            message: "Query Products fetched",
            success: true,
            error: false,
            data: products
        })

    } catch (err) {
        return res.status(400).json({
            message: err,
            success: false,
            error: true
        })
    }
}