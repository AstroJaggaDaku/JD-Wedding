import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  image: String,
  role: { type: String, default: "user" },
  canViewProfiles: { type: Boolean, default: false },
  premium: { type: Boolean, default: false },
  premiumExpires: { type: Date, default: null }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
