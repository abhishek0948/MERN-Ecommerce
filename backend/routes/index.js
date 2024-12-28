const express = require('express');
const router = express.Router();

// Login Controllers
const userSignupController = require('../controller/user/userSignup.js');
const userSigninController = require('../controller/user/userSignin.js');

// Auth controllers
const userDetailsController = require('../controller/user/userDetailsController.js');
const authToken = require('../middleware/authToken.js');
const userLogout = require('../controller/user/userLogout.js');

// User Info Controllers
const allUsers  = require('../controller/user/allUsers.js');
const updateUser = require('../controller/user/updateUser.js');

// Product Controllers
const uploadProductController = require('../controller/product/uploadProduct.js');
const allProducts = require('../controller/product/getProducts.js');
const editProductController = require('../controller/product/editProduct.js');
const getCategoryProductController = require('../controller/product/getCategoryProduct.js');
const getCategoryWiseProducts = require('../controller/product/getCategoryWiseProducts.js');
const getProductDetails = require('../controller/product/getProductDetails.js');

// Cart Controllers
const cartController = require('../controller/user/cartController.js');
const searchProduct = require('../controller/product/searchProduct.js');
const { filterProduct } = require('../controller/product/filterProduct.js');
const { payment } = require('../controller/order/paymentController.js');

// User Login routes
router.post('/signup',userSignupController.userSignUpController);
router.post('/login',userSigninController.userSignInController);
router.get('/user-details',authToken.authToken,userDetailsController.userDetailsController); 
router.get('/userLogout',userLogout.userLogout);

// Admin routes
router.get('/all-user',authToken.authToken,allUsers.allUsers);
router.post('/update-user',authToken.authToken,updateUser.updateUser);

//Product routes
router.post('/upload-product',authToken.authToken,uploadProductController.uploadProductController);
router.post('/edit-product',authToken.authToken,editProductController.editProduct)
router.get('/all-products',allProducts.getAllProducts);
router.get('/get-CategoryProducts',getCategoryProductController.getCategoryProduct);
router.post('/category-products',getCategoryWiseProducts.getCategoryAllProducts);
router.get('/product-details',getProductDetails.getProductDetails);
router.get('/search',searchProduct.searchProduct);
router.post('/filter-product',filterProduct);

// Cart routes
router.post('/addtocart',authToken.authToken,cartController.addToCart);
router.get('/countAddToCartProducts',authToken.authToken,cartController.countCartProduts);
router.get('/viewcartproducts',authToken.authToken,cartController.addToCartViewProducts);
router.post('/update-cart-product',authToken.authToken,cartController.updateAddToCartProduct);
router.post('/delete-cart-product',authToken.authToken,cartController.deleteAddToCartProduct);

// Payment and order
router.post('/checkout',authToken.authToken,payment);

module.exports = router;