import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // 🎵 Background water sound
  useEffect(() => {
    const audio = new Audio("/water.mp3");
    audio.loop = true;
    audio.volume = 0.2;
    audio.play().catch(() => {});
    return () => audio.pause();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Unable to create account. Try again.");
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/login.jpg')" }}
    >
      <motion.div
        className="backdrop-blur-xl bg-white/30 p-10 rounded-2xl shadow-2xl w-[90%] md:w-[400px] border border-white/40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-extrabold text-center mb-8 text-cyan-600">
          Create Account 💧
        </h1>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-white font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 rounded-md outline-none text-black bg-white/80 focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-white font-semibold mb-2">
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              className="w-full p-3 rounded-md outline-none text-black bg-white/80 focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute top-10 right-3 cursor-pointer text-gray-700"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #00e0ff" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-cyan-500 text-black font-semibold py-3 rounded-lg shadow-lg hover:bg-cyan-400 transition-all"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-center text-white mt-6">
          Already have an account?{" "}
          <span
            className="text-cyan-300 cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
