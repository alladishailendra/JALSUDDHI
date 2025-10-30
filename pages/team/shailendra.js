import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Shailendra() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-sky-800 to-blue-900 text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/about")}
        className="absolute top-6 left-6 bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg text-black font-semibold"
      >
        ⬅ Back
      </motion.button>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold mb-6 text-cyan-300"
      >
        💧 Shailendra
      </motion.h1>

      <p className="max-w-3xl text-center text-lg leading-relaxed text-gray-200">
        The creative mind behind every screen you see. Shailendra ensures seamless
        user experiences and brings design ideas to life through clean, functional
        interfaces. With deep expertise in <strong>Frontend, Firebase, and UI/UX</strong>,
        he transforms concepts into intuitive and beautiful web experiences.
      </p>
    </div>
  );
}
