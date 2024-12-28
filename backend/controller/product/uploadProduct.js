const productModel = require('../../models/productModel.js');
const adminPermissionCheck = require('../../helper/permission.js').adminPermission;

exports.uploadProductController = async (req,res,next) => {
    try {
        const sessionUser = req.user._id;
        const isAdmin = await adminPermissionCheck(sessionUser);

        if(!isAdmin){
            return res.status(200).json({
                message: "Permission Denied",
                error: true,
                success: false
            })
        }

        const product = {...req.body , userId:sessionUser}
        
        const uploadProduct = new productModel(product);
        const saveProduct = await uploadProduct.save();

        return res.status(201).json({
            message: "Product Upload Success",
            success: true,
            error: false,
            data: saveProduct
        })
    } catch (err) {
        return res.status(400).json({
            message: err,
            success: false,
            error: true
        })
    }
}