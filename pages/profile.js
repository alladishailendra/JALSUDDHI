// pages/profile.js
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Profile() {
  const user = {
    name: "Shailendra",
    title: "Frontend Developer • Firebase • UI/UX",
    bio: "Building intuitive dashboards and real-time IoT integrations for clean water solutions.",
    email: "alladishailupendra@gmail.com",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-800 to-slate-700 text-white">
      <Navbar />
      <main className="relative z-10 px-6 py-20 max-w-3xl mx-auto">
        <motion.div className="bg-white/6 p-8 rounded-2xl backdrop-blur-md border border-white/8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-6">
            <img src="/bot.png" alt="avatar" className="w-28 h-28 rounded-full border-4 border-cyan-400 object-cover" />
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-cyan-200 mt-1">{user.title}</p>
              <p className="mt-3 text-sm text-slate-200">{user.bio}</p>
              <p className="mt-3 text-sm text-slate-200">📧 {user.email}</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
