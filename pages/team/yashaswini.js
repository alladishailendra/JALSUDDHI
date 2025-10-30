import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Yashaswini() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-800 via-sky-700 to-blue-800 text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => router.push("/about")} className="absolute top-6 left-6 bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg text-black font-semibold">
        ⬅ Back
      </motion.button>

      <h1 className="text-5xl font-bold mb-6 text-cyan-300">💻 Yashaswini</h1>
      <p className="max-w-3xl text-center text-lg leading-relaxed text-gray-200">
        The architect of logic and data flow. Yashaswini builds strong backends that
        make our systems robust, efficient, and intelligent.
      </p>
    </div>
  );
}
