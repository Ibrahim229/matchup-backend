import { UserType } from "./db/user";

export { };

declare global {
    namespace Express {
        export interface Request {
            // user?:  UserType,
        }
    }
}
