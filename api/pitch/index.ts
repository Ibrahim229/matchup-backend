import { Router } from "express";
import upload from "../../config/multer";
import createPitch from "./create-pitch";
import getPitch from "./get-pitch";
import updatePitch from "./update-pitch";
import deletePitch from "./delete-pitch";
import recommendedRouter from "./recommended";
import deletePitchImage from "./delete-pitch-image";
import updateCloseTime from "./update-close-time";
import passport from "passport";


const pitchRouter = Router();
pitchRouter.use("/recommended", recommendedRouter)
pitchRouter.get('', getPitch);
pitchRouter.post('',passport.authenticate('jwt', { session: false }), upload.array("images", 6), createPitch);
pitchRouter.put('/:id',passport.authenticate('jwt', { session: false }), upload.array("images", 6), updatePitch);
pitchRouter.put('/updateCloseTime/:id',passport.authenticate('jwt', { session: false }), updateCloseTime);
pitchRouter.delete('/:id',passport.authenticate('jwt', { session: false }), deletePitch);
pitchRouter.delete('/deletePitchImage/:id',passport.authenticate('jwt', { session: false }), deletePitchImage);


export default pitchRouter;