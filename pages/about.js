// pages/aboutus.js
import { motion } from "framer-motion";

export default function AboutUs() {
  const team = [
    { name: "Shailendra", emoji: "💧", role: "Frontend, Firebase, UI/UX" },
    { name: "Dhruva", emoji: "⚙️", role: "Hardware & Integration" },
    { name: "Ankitha", emoji: "💡", role: "Project Coordination" },
    { name: "Dattatreya", emoji: "🔬", role: "Sensors & Testing" },
    { name: "Yashaswini", emoji: "💻", role: "Backend & Data" },
    { name: "Rajshekar Reddy", emoji: "⚡", role: "ESP32 & Ops" },
    { name: "Sarayu", emoji: "🌿", role: "Research & Sustainability" },
    { name: "Ranjith", emoji: "🛠️", role: "Mechanical Design" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-200 flex flex-col items-center justify-center p-10">
      <motion.h1
        className="text-5xl font-extrabold text-cyan-900 mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🌊 About <span className="text-cyan-600">JalSuddhi</span>
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {team.map((member, index) => (
          <motion.div
            key={index}
            className="bg-white/80 p-6 rounded-2xl shadow-lg text-center backdrop-blur-md border border-cyan-300 hover:scale-105 transition-transform"
            whileHover={{ y: -5 }}
          >
            <h2 className="text-2xl font-bold text-cyan-800">
              {member.emoji} {member.name}
            </h2>
            <p className="text-gray-700 mt-2">{member.role}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => (window.location.href = "/dashboard")}
        className="mt-10 bg-cyan-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-cyan-700"
      >
        ⬅ Back to Dashboard
      </motion.button>
    </div>
  );
}
