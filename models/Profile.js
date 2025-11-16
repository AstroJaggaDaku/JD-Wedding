
import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userId: String,
  name: String,
  age: Number,
  gender: String,
  height: String,
  religion: String,
  caste: String,
  education: String,
  occupation: String,
  salary: String,
  address: String,
  phone: String,
  about: String,
  image: String,
  approved: { type: Boolean, default: false },
  verified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
