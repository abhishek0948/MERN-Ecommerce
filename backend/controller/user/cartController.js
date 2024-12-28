const addToCartModel = require("../../models/cartModel");
const productModel = require('../../models/productModel.js');

// Add to Cart
exports.addToCart = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currerntUserId = req?.user._id;

    // console.log(currerntUserId);
    // console.log(productId);

    const productInCart = await addToCartModel.findOne({
      productId: productId,
    });

    if (productInCart) {
      return res.status(200).json({
        message: "Product Already in Cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currerntUserId,
    };

    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    return res.status(200).json({
      data: saveProduct,
      message: "Product Added to Cart",
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
      success: false,
      error: true,
    });
  }
};

// Count Number of products in Cart
exports.countCartProduts = async (req, res) => {
  try {
    const userId = req?.user?._id;
    const count = await addToCartModel.countDocuments({ userId: userId });

    return res.status(200).json({
        data:{
            count:count
        },
        message: "Count of products in cart fetched",
        success: true,
        error: false,
    })
    
  } catch (err) {
    return res.status(400).json({
      message: err,
      success: false,
      error: true,
    });
  }
};

// View Cart
exports.addToCartViewProducts = async (req,res,next) => {
  try{
    const userId = req?.user?._id;
    
    const allProducts = await addToCartModel.find({userId : userId}).populate('productId');

    res.status(200).json({
      data: allProducts,
      message: "All products in cart fetched",
      success: true,
      error: false
    })

  } catch (err) {
    return res.status(400).json({
      message: err,
      success: false,
      error: true,
    });
  }
}

// Update Cart Product Quantity
exports.updateAddToCartProduct = async (req,res) => {
  try{
    const userId = req?.user._id;
    // console.log("Request body",req.body);
    const addToCartProductId = req?.body._id;
    const qty = req?.body.quantity;


    const addToCartProduct = await addToCartModel.findById(addToCartProductId);

    if(!addToCartProduct) {
      return res.status(202).json({
        message: "Product Not found in cart",
        success: false,
        error: true
      })
    }

    addToCartProduct.quantity = qty;
    await addToCartProduct.save();

    return res.status(200).json({
      message: "In Controller",
      success: true,
      error: false,
      data: addToCartProduct
    })
    
  } catch (err) {
    return res.status(400).json({
      message: err,
      success: false,
      error: true,
    });
  }
}

exports.deleteAddToCartProduct = async (req,res) => {
  try {
    const userId = req?.user._id;
    const addToCartProductId = req?.body._id;

    const deletedProduct = await addToCartModel.deleteOne({_id : addToCartProductId});

    return res.status(200).json({
      message: "Removed from cart",
      success: true,
      error: false,
      data: deletedProduct
    })

  } catch (err) {
    return res.status(400).json({
      message: err,
      success: false,
      error: true,
    });
  }
}
