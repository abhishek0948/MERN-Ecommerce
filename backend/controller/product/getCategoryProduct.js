const productModel = require('../../models/productModel.js');

exports.getCategoryProduct = async (req, res, next) => {
  try {
    const ProductCategories = await productModel.distinct("category");

    const ProductByCategory = [];

    for(const category of ProductCategories) {
        const product = await productModel.findOne({ category });
        ProductByCategory.push(product);
    }

    // console.log(ProductByCategory);

    return res.status(200).json({
        message: "Category Fetched",
        success: true,
        error: false,
        data: ProductByCategory
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message || "An error occurred while updating the product",
      success: false,
      error: true,
    });
  }
};
