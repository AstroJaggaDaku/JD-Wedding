import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: String,
  title: String,
  message: String,
  read: { type: Boolean, default: false },
  meta: Object
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);
