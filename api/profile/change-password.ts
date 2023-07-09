import asyncHandler from '../middlewares/async-handler';
const changePassword = asyncHandler(async (req, res, next) => {

    const newPassword = req.body.newPassword;
    var user = req.user;
    // update user password 
    user!.password = newPassword
    user!.markModified('password');
    user!.save()
    res.json({ "data": { "message": "Password changed successfully" } })
})

export default changePassword;