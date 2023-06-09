import { Router } from "express";
import upload from "../../config/multer";
import createPitch from "./create-pitch";
import getPitch from "./get-pitch";
import updatePitch from "./update-pitch";
import deletePitch from "./delete-pitch";


const pitchRouter = Router();

pitchRouter.get('', getPitch);
pitchRouter.post('', upload.array("images", 6), createPitch);
pitchRouter.put('/:id', upload.array("images", 6), updatePitch);
pitchRouter.delete('/:id', deletePitch);


export default pitchRouter;