
import Pitch from "../../db/pitch";
import asyncHandler from "../middlewares/async-handler";

const getPitch = asyncHandler(async (req, res) => {
    const { searchQuery, latitude, longitude } = req.query;
    var pitches: typeof Pitch[] = []

    if (searchQuery) {
        pitches = await Pitch.find({ name: { $regex: searchQuery, $options: 'i' } })
    } else if (latitude && longitude) {
        const lat = Number(latitude)
        const long = Number(longitude)
        const maxDistance = 10000
        pitches = await (await Pitch.aggregate([{
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [lat, long]
                },
                distanceField: 'distance',
                maxDistance,
                spherical: true,

            }
        },
        {
            $match: {
                distance: { $lt: maxDistance },
            },
        },
        {
            $lookup: {
                from: 'Period',
                localField: 'availabletyList', 
                foreignField: '_id',
                as: 'availabletyList', 
            },
        },

        ]))
    } else {
        pitches = await Pitch.find();
    }


    res.json(pitches)
})

export default getPitch;