import Pitch from '../../db/pitch';
import asyncHandler from '../middlewares/async-handler';

const updateCloseTime = asyncHandler(async (req, res) => {
	if (req.user?.role == 'Admin') {
		const { id } = req.params;
		const { openT, closeT } = req.body;
		const openTime = new Date(openT);
		const closeTime = new Date(closeT);

		const pitch = await Pitch.findByIdAndUpdate(id, { openTime, closeTime }, { new: true });

		// @todo: can't update pitch time if there is events in old time

		res.json({ message: 'Pitch close time updated succesfully', pitchDetails: pitch });
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}
});

export default updateCloseTime;
