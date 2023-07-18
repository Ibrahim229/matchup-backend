import { Model } from "mongoose"
import { UserType } from "../db/user"

interface IUserDocument extends Document {
    fullName: string
    phoneNumber: string
    email: string
    age: number
    gender: string
    password: string
    isVerified: boolean,
    userPic: string,
    role: string
}

export interface IUser extends IUserDocument {
    comparePassword: (password: string, callback: any) => void
    toJson: () => Object
}
export interface UserAnalytics extends UserType {
    bookings: number
}

interface IUserModel extends Model<IUserDocument, {}> { }

export default IUserModel