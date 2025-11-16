"use client";

import { useState, useEffect } from "react";

export default function ProfileForm({ userId }) {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    religion: "",
    caste: "",
    education: "",
    occupation: "",
    salary: "",
    city: "",
    phone: "",
    about: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch existing profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`/api/profiles/get?id=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
        setImagePreview(data.image || "");
      } catch (err) {
        console.error(err);
      }
    }
    if (userId) fetchProfile();
  }, [userId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    setLoading(true);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setProfile((prev) => ({ ...prev, image: data.secure_url }));
      setImagePreview(data.secure_url);
    } catch (err) {
      console.error("Image upload failed:", err);
      setMessage("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/profiles/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profile, userId }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Your Profile</h2>

      {message && <p className="mb-4 text-sm text-red-600">{message}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Age</label>
            <input
              type="number"
              name="age"
              value={profile.age}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Gender</label>
            <select name="gender" value={profile.gender} onChange={handleChange} className="input" required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Height</label>
            <input type="text" name="height" value={profile.height} onChange={handleChange} className="input" />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Religion</label>
            <input type="text" name="religion" value={profile.religion} onChange={handleChange} className="input" />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Caste</label>
            <input type="text" name="caste" value={profile.caste} onChange={handleChange} className="input" />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Education</label>
            <input type="text" name="education" value={profile.education} onChange={handleChange} className="input" />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Occupation</label>
            <input type="text" name="occupation" value={profile.occupation} onChange={handleChange} className="input" />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Salary</label>
            <input type="text" name="salary" value={profile.salary} onChange={handleChange} className="input" />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-semibold">City</label>
            <input type="text" name="city" value={profile.city} onChange={handleChange} className="input" />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Phone</label>
          <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="input" />
        </div>

        <div>
          <label className="block mb-1 font-semibold">About</label>
          <textarea
            name="about"
            value={profile.about}
            onChange={handleChange}
            className="input h-24 resize-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImage} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-full" />}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-2 px-4 mt-4 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
