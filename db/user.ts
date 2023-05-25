import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"
import IUserModel, { IUser } from "../interfaces/user_methods_interface";

const UserSchema = new Schema<IUser, IUserModel>({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, rqeuired: true, index: { unique: true } },
  email: { type: String, required: true, index: { unique: true } },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ["male", "female"] },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false }
});

UserSchema.pre("save", function (next) {
  const user = this
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error)
    } else {
      callback(null, isMatch)
    }
  })
}
UserSchema.methods.toJson = function () {
  return {
    fullname: this.fullName,
    phoneNumber: this.phoneNumber,
    email: this.email,
    age: this.age,
    gender: this.gender,
  }
}


const User = model('User', UserSchema);

export default User;