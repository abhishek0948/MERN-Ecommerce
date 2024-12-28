const productModel = require('../../models/productModel');

exports.filterProduct = async (req,res) => {
    try{
        const categoryList = req?.body?.category || [];
        console.log(categoryList);
        const products = await productModel.find({
            category: {
                "$in": categoryList
            }
        })

        res.status(200).json({
            message: "Category Checkbox fetched",
            success: true,
            error: false,
            data: products
        })
    } catch (err) {
        return res.json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}