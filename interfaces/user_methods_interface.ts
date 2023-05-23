import { Model } from "mongoose"

interface IUserDocument extends Document {
    fullName: string
    phoneNumber: string
    email: string
    age: number
    gender: string
    password: String
}

export interface IUser extends IUserDocument {
    comparePassword: (password: string, callback: any) => void
    toJson: () => Object
}

interface IUserModel extends Model<IUserDocument, {}> { }

export default IUserModel