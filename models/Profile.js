import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  age: Number,
  gender: String,
  height: String,
  religion: String,
  caste: String,
  education: String,
  occupation: String,
  salary: String,
  city: String,
  phone: String,
  about: String,
  image: String,
  approved: { type: Boolean, default: false },
  verified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
