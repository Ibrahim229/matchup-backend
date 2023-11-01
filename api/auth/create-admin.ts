import User from '../../db/user';
import asyncHandler from '../middlewares/async-handler';

export const createAdmin = asyncHandler(async (req, res) => {
	console.log(req.body);

	const newUser = await User.create(req.body);

	res.json({ sucess: true, newUser });
});
