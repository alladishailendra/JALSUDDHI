import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function About() {
  const router = useRouter();

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
    <div className="relative min-h-screen bg-gradient-to-b from-blue-900 to-cyan-800 text-white flex flex-col items-center justify-start px-4 pt-20 pb-10 overflow-x-hidden">
      
      {/* 🔙 Navigation Buttons */}
      <div className="absolute top-6 left-6 flex flex-col sm:flex-row gap-2 z-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/dashboard")}
          className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg text-black font-semibold shadow-md"
        >
          ⬅ Dashboard
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-black font-semibold shadow-md"
        >
          🏠 Home
        </motion.button>
      </div>

      {/* 🧠 Title */}
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-cyan-300 text-center mt-10 mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🌟 About Us
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl text-center text-gray-200 max-w-3xl leading-relaxed mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        We are a passionate team of innovators, creators, and engineers — united
        by a shared goal: to build technology that makes a difference. Each of
        us brings unique strengths to the table, blending creativity, logic, and
        design into powerful, real-world solutions.
      </motion.p>

      {/* 👥 Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-2">
        {team.map((member, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-md border border-cyan-400 p-6 rounded-xl text-center shadow-lg cursor-pointer hover:bg-cyan-600/30 transition-all"
            onClick={() => router.push(`/team/${member.name.toLowerCase().replace(/ /g, "")}`)}
          >
            <h2 className="text-2xl font-semibold text-cyan-300 mb-2">
              {member.emoji} {member.name}
            </h2>
            <p className="text-gray-200">{member.role}</p>
          </motion.div>
        ))}
      </div>

      {/* 🚀 Closing Note */}
      <motion.div
        className="text-center mt-16 max-w-3xl text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-cyan-300 mb-2">
          🚀 Together, We Build the Future
        </h2>
        <p>
          Innovation isn’t just what we do — it’s who we are. From ideation to
          implementation, our team combines creativity, technical skill, and
          purpose to bring technology closer to people and the planet.
        </p>
      </motion.div>
    </div>
  );
}
