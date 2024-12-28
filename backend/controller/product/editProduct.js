const productModel = require('../../models/productModel.js');
const adminPermissionCheck = require('../../helper/permission.js').adminPermission;

exports.editProduct = async (req, res, next) => {
  try {
    const sessionUser = req.user?._id;
    const isAdmin = await adminPermissionCheck(sessionUser);
    if (!isAdmin) {
      return res.status(403).json({
        message: "Permission Denied",
        error: true,
        success: false,
      });
    }

    const product = req.body;
    const _id = req.body._id;

    if (!_id) {
      return res.status(400).json({
        message: "Product ID is missing",
        success: false,
        error: true,
      });
    }

    const existingProduct = await productModel.findById(_id);
    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
        error: true,
      });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      _id,
      product
    );

    return res.status(200).json({
      message: "Product updated successfully",
      success: true,
      error: false,
      data: updatedProduct,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || "An error occurred while updating the product",
      success: false,
      error: true,
    });
  }
};
