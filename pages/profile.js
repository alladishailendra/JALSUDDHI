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
  const [status, setStatus] = useState(""); // save feedback
  const emojis = ["👤", "👦", "👧", "🧑‍💻", "👩‍💻", "🧑"];

  // Load profile from localStorage or set defaults
  useEffect(() => {
    if (auth.currentUser) {
      const savedProfile = localStorage.getItem(auth.currentUser.email);
      if (savedProfile) {
        setUser(JSON.parse(savedProfile));
      } else {
        setUser((prev) => ({
          ...prev,
          email: auth.currentUser.email,
        }));
      }
    }
  }, []);

  const handleChange = (e) => setUser({ ...user, name: e.target.value });
  const handleEmojiSelect = (emoji) => setUser({ ...user, emoji });

  const handleSave = () => {
    if (!auth.currentUser) return;
    localStorage.setItem(auth.currentUser.email, JSON.stringify(user));
    setStatus("Profile saved successfully!");
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-800 to-slate-700 text-white">
      <Navbar />
      <main className="relative z-10 px-6 py-20 max-w-3xl mx-auto">
        <motion.div
          className="bg-white/6 p-8 rounded-2xl backdrop-blur-md border border-white/8 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Emoji Display */}
          <div className="text-6xl">{user.emoji}</div>

          {/* Username Input */}
          <input
            type="text"
            value={user.name}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full text-black p-2 rounded-md outline-none bg-white/80 focus:ring-2 focus:ring-cyan-500 text-center font-semibold text-xl"
          />

          {/* Emoji Picker */}
          <div className="flex gap-3 mt-3 flex-wrap justify-center">
            {emojis.map((e) => (
              <span
                key={e}
                onClick={() => handleEmojiSelect(e)}
                className={`cursor-pointer text-3xl p-1 rounded-md transition-transform ${
                  user.emoji === e ? "scale-125" : ""
                }`}
              >
                {e}
              </span>
            ))}
          </div>

          {/* Email Block */}
          <div className="mt-6 p-2 bg-white/20 rounded-md w-full text-center text-slate-200 font-medium">
            📧 {user.email}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="mt-6 w-full bg-cyan-500 text-black font-semibold py-3 rounded-lg shadow-lg hover:bg-cyan-400 transition-all"
          >
            Save Profile
          </button>

          {/* Status */}
          {status && <p className="text-green-400 mt-2">{status}</p>}
        </motion.div>
      </main>
    </div>
  );
}
