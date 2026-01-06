import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { auth } from "../firebase/config";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    emoji: "👤",
    email: "",
  });

  const [status, setStatus] = useState("");
  const emojis = ["👤", "👦", "👧", "🧑‍💻", "👩‍💻", "🧑"];

  // Load profile from localStorage
  useEffect(() => {
    if (!auth.currentUser) return;

    const savedProfile = localStorage.getItem(auth.currentUser.email);

    if (savedProfile) {
      setUser(JSON.parse(savedProfile));
    } else {
      setUser((prev) => ({
        ...prev,
        email: auth.currentUser.email,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  const handleEmojiSelect = (emoji) => {
    setUser({ ...user, emoji });
  };

  const handleSave = () => {
    if (!auth.currentUser) return;

    localStorage.setItem(auth.currentUser.email, JSON.stringify(user));
    setStatus("Profile saved successfully!");

    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-800 to-slate-700 text-white">
      <Navbar />

      <main className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 max-w-xl sm:max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-md border border-white/10 flex flex-col items-center gap-5 sm:gap-6 shadow-xl"
        >
          {/* Avatar */}
          <div className="text-5xl sm:text-6xl">
            {user.emoji}
          </div>

          {/* Name Input */}
          <input
            type="text"
            value={user.name}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full text-black p-3 rounded-lg bg-white/90 outline-none focus:ring-2 focus:ring-cyan-500 text-center font-semibold text-lg sm:text-xl"
          />

          {/* Emoji Picker */}
          <div className="flex flex-wrap justify-center gap-3">
            {emojis.map((e) => (
              <span
                key={e}
                onClick={() => handleEmojiSelect(e)}
                className={`cursor-pointer text-3xl sm:text-4xl transition-transform ${
                  user.emoji === e
                    ? "scale-125"
                    : "hover:scale-110"
                }`}
              >
                {e}
              </span>
            ))}
          </div>

          {/* Email */}
          <div className="w-full bg-white/20 p-3 rounded-lg text-center text-slate-200 text-sm sm:text-base break-all">
            📧 {user.email}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full mt-2 bg-cyan-500 text-black font-semibold py-3 rounded-xl shadow-lg hover:bg-cyan-400 active:scale-[0.98] transition-all"
          >
            Save Profile
          </button>

          {/* Status */}
          {status && (
            <p className="text-green-400 text-sm sm:text-base">
              {status}
            </p>
          )}
        </motion.div>
      </main>
    </div>
  );
}
