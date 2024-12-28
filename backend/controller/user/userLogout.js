exports.userLogout = async (req,res,next) => {
    try{
        await res.clearCookie("token");
        res.json({
            message: "Logout successfully",
            success: true,
            error: false,
            data: []
        })
    } catch(err) {
        return res.json({
            message: err,
            success: false,
            error: true
        })
    }
}