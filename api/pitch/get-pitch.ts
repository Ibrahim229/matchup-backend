
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
        pitches = await Pitch.aggregate([{
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

        ]);
    } else {
        pitches = await Pitch.find().populate("availabletyList");
    }


    res.json(pitches)
})

export default getPitch;