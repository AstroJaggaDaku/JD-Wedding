
"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <form onSubmit={onSubmit} className="bg-white p-8 shadow-xl rounded-xl w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <input className="input" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} />

        <input type="password" className="input" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)} />

        <button className="btn-primary w-full mt-4">Login</button>

        <button type="button" className="btn-google w-full mt-2"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
          Login with Google
        </button>
      </form>
    </div>
  );
}
