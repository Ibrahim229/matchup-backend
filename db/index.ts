import mongoose from 'mongoose';

export const connectionPromise = mongoose.connect(process.env.MONGO_URI!);;