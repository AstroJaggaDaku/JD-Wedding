
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User";

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const pw = await bcrypt.hash("Aezakmi@666", 10);

  await User.create({
    name: "Super Admin",
    email: "pubgsu21@gmail.com",
    password: pw,
    role: "ADMIN",
    canViewProfiles: true
  });

  console.log("Admin user created!");
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
