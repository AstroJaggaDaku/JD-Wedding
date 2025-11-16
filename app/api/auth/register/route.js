import User from "@/models/User";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    // Parse request body
    const body = await req.json();
    const { name, email, password } = body || {};

    // Basic validation
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "Name, email, and password are required" }), { status: 400 });
    }

    // Connect to DB
    await connectDB();

    // Check if user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "user",
      canViewProfiles: false,
      premium: false
    });

    return new Response(JSON.stringify({ success: true, userId: user._id }), { status: 200 });

  } catch (err) {
    console.error("Error in registration:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
