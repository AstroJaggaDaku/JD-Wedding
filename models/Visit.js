import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema({
  visitorId: String,
  profileId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Visit || mongoose.model("Visit", VisitSchema);
