import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Sarayu() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-teal-800 to-blue-900 text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => router.push("/about")} className="absolute top-6 left-6 bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg text-black font-semibold">
        ⬅ Back
      </motion.button>

      <h1 className="text-5xl font-bold mb-6 text-cyan-300">🌿 Sarayu</h1>
      <p className="max-w-3xl text-center text-lg leading-relaxed text-gray-200">
        The researcher with a vision for a greener future. Sarayu ensures our projects
        align with sustainable practices and forward-thinking ideas.
      </p>
    </div>
  );
}
