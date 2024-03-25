import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required:[true,"Please provide a user name"],
      },
      email: {
        type: String,
        required:[true,"Please provide a user email"],
        unique: true,
      },
      password: {
        type: String,
        required:[true,"Please provide a user password"],
      },
      isVerified:{
        type:Boolean,
        default:false
      },
      isAdmin: { type: Boolean, default: false },
      forgotPasswordToken:{type:String},
      forgotPasswordTokenExpiry:{type:Date},
      verifyToken:{type:String},
      verifyTokenExpiry:{type:Date}
    },
    { timestamps: true }
)

const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema)

export default UserModel