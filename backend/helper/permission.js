const userModel = require('../models/userModel');

exports.adminPermission = async (userId) => {
    const user = await userModel.findById(userId);

    if (user.role == 'ADMIN') {
        return true;
    }

    return false;
}