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
            console.error(error);
            res.status(500).json({ ok: false });
        }
    }
}

export default asyncHandler;