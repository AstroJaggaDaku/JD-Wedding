import User from "@/models/User";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return Response.json({ error: "All fields required" }, { status: 400 });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return Response.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      premium: false,
      canViewProfiles: true,
    });

    return Response.json(
      { success: true, userId: newUser._id },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
