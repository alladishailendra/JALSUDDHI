import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Dhruva() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-blue-800 to-cyan-900 text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => router.push("/about")} className="absolute top-6 left-6 bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg text-black font-semibold">
        ⬅ Back
      </motion.button>

      <h1 className="text-5xl font-bold mb-6 text-cyan-300">⚙️ Dhruva</h1>
      <p className="max-w-3xl text-center text-lg leading-relaxed text-gray-200">
        The tech craftsman who bridges hardware and software with precision.
        Dhruva turns abstract concepts into working prototypes that perform flawlessly.
      </p>
    </div>
  );
}
