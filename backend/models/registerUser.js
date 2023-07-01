import mongoose from "mongoose";

const RegisterUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      min: 4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    file: {
      type: String,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Login",
    }
  },
  { timestamps: true }
);
const RegisterUserModel = mongoose.model("User", RegisterUserSchema);
export default RegisterUserModel;
