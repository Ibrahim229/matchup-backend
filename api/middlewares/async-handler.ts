import { Handler } from "express";
import { validationResult } from "express-validator";

const asyncHandler: (handler: Handler) => Handler = (handler) => {
    return async (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {

            await handler(req, res, next);
        } catch (error) {
            if (error.code && error.code == 11000) {
                handleDuplicateKeyError(error, res);
                return
            }
            console.error(error);
            res.status(500).json({ ok: false });
        }
    }
}
const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    res.status(code).json("Row with this name already exist!!");
}


export default asyncHandler;