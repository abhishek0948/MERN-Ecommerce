exports.userLogout = async (req,res,next) => {
    try{
        const tokenOptions = {
            httpOnly : true,
            secure : true,
            sameSite: 'None'
        }

        await res.clearCookie("token",tokenOptions);
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