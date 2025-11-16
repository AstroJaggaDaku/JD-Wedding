
"use client";
import { useState } from "react";

export default function ProfileForm({ userId }) {
  const [form, setForm] = useState({
    name: "", age: "", gender: "", height: "", religion: "", caste: "",
    education: "", occupation: "", salary: "", address: "", phone: "", about: "",
    image: null
  });

  async function submit(e) {
    e.preventDefault();
    const body = new FormData();

    Object.entries(form).forEach(([k, v]) => body.append(k, v));
    body.append("userId", userId);

    await fetch("/api/profiles/create", {
      method: "POST",
      body
    });

    alert("Profile saved!");
  }

  return (
    <form onSubmit={submit} className="space-y-3 bg-white p-6 shadow-xl rounded-xl">
      {Object.keys(form).map(key =>
        key !== "image" && key !== "about" ? (
          <input key={key} className="input" placeholder={key}
            onChange={e => setForm({ ...form, [key]: e.target.value })} />
        ) : null
      )}

      <textarea className="input" placeholder="About"
        onChange={e => setForm({ ...form, about: e.target.value })}/>

      <input type="file" onChange={e => setForm({ ...form, image: e.target.files[0] })}/>

      <button className="btn-primary w-full">Save Profile</button>
    </form>
  );
}
