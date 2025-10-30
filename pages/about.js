import { motion } from "framer-motion";
import { useRouter } from "next/router";

const teamMembers = [
  { name: "Shailendra", emoji: "💧", role: "Frontend, Firebase, UI/UX", link: "/team/shailendra" },
  { name: "Dhruva", emoji: "⚙️", role: "Hardware & Integration", link: "/team/dhruva" },
  { name: "Ankitha", emoji: "💡", role: "Project Coordination", link: "/team/ankitha" },
  { name: "Dattatreya", emoji: "🔬", role: "Sensors & Testing", link: "/team/dattatreya" },
  { name: "Yashaswini", emoji: "💻", role: "Backend & Data", link: "/team/yashaswini" },
  { name: "Rajshekar Reddy", emoji: "⚡", role: "ESP32 & Ops", link: "/team/rajshekar" },
  { name: "Sarayu", emoji: "🌿", role: "Research & Sustainability", link: "/team/sarayu" },
  { name: "Ranjith", emoji: "🛠️", role: "Mechanical Design", link: "/team/ranjith" },
];

export default function About() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-black text-white overflow-hidden">
      {/* 🌊 Animated Background */}
      <motion.div
        className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center opacity-30"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🔙 Back Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.push("/dashboard")}
        className="absolute top-6 left-6 bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg text-black font-semibold shadow-md z-10"
      >
        ⬅ Dashboard
      </motion.button>

      {/* 💧 Title */}
      <motion.h1
        className="text-5xl font-bold mb-6 z-10 text-cyan-300 drop-shadow-lg"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        🌟 About Us — JalSuddhi Team
      </motion.h1>

      <p className="max-w-3xl text-center text-gray-200 mb-10 z-10">
        We’re a passionate team of innovators, creators, and engineers — building technology that purifies water, connects devices, and drives sustainability.
      </p>

      {/* 👥 Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10">
        {teamMembers.map((member, i) => (
          <motion.div
            key={i}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center cursor-pointer transition-all"
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push(member.link)}
          >
            <div className="text-4xl mb-3">{member.emoji}</div>
            <h2 className="text-xl font-bold text-cyan-300">{member.name}</h2>
            <p className="text-gray-300 text-sm">{member.role}</p>
          </motion.div>
        ))}
      </div>

      <motion.footer
        className="mt-10 text-gray-400 text-sm z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🚀 Together We Build the Future | JalSuddhi © 2025
      </motion.footer>
    </div>
  );
}
