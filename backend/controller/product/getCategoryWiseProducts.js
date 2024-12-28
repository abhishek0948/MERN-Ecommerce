const productModel = require('../../models/productModel.js');

exports.getCategoryAllProducts = async (req,res,next) => {
    try{
        const {category} = req?.body || req?.query;
        // console.log(req.body);
        // console.log(req.query);
        // console.log(category);
        const Products = await productModel.find({category : category});
        
        res.status(200).json({
            message: "Category Products Fetched Success",
            succes: true,
            error: false,
            data: Products
        })

    } catch(err) {
        return res.status(400).json({
            message: err.message || "An error occurred while updating the product",
            success: false,
            error: true,
        });
    }
}