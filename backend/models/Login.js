import mongoose from "mongoose";

const LoginUser = mongoose.Schema({
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
});
const Loginuser=mongoose.model("Login",LoginUser);
export default Loginuser;
