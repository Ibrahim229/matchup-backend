import { Router } from "express";
import upload from "../../config/multer";
import createPitch from "./create-pitch";
import getPitch from "./get-pitch";
import updatePitch from "./update-pitch";
import deletePitch from "./delete-pitch";
import recommendedRouter from "./recommended";
import deletePitchImage from "./delete-pitch-image";
import updateCloseTime from "./update-close-time";


const pitchRouter = Router();
pitchRouter.use("/recommended", recommendedRouter)
pitchRouter.get('', getPitch);
pitchRouter.post('', upload.array("images", 6), createPitch);
pitchRouter.put('/:id', upload.array("images", 6), updatePitch);
pitchRouter.put('/updateCloseTime/:id', updateCloseTime);
pitchRouter.delete('/:id', deletePitch);
pitchRouter.delete('/deletePitchImage/:id', deletePitchImage);


export default pitchRouter;