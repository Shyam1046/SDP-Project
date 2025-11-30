import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userType: { type: String, enum: ["student", "faculty"], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  facultyCode: { type: String },
});

export default mongoose.model("User", userSchema);
