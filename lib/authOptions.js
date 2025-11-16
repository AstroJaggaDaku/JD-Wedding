import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: { label: "Email", type: "text" }, password: { label: "Password", type: "password" } },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found");
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) throw new Error("Wrong password");
        return { id: user._id.toString(), name: user.name, email: user.email, role: user.role, canViewProfiles: user.canViewProfiles, premium: user.premium };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.canViewProfiles = user.canViewProfiles;
        token.premium = user.premium;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.canViewProfiles = token.canViewProfiles;
      session.user.premium = token.premium;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
