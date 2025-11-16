
"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  async function submit(e) {
    e.preventDefault();

    await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form)
    });

    alert("Registration successful!");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <form onSubmit={submit} className="bg-white p-8 shadow-xl rounded-xl w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>

        <input className="input" placeholder="Full Name"
          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}/>

        <input className="input" placeholder="Email"
          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/>

        <input type="password" className="input" placeholder="Password"
          value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}/>

        <button className="btn-primary w-full mt-4">Register</button>
      </form>
    </div>
  );
}
