// pages/dashboard.js
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-800 text-white overflow-hidden">
      <Navbar />

      {/* decorative animated background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -left-40 -top-40 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 opacity-20 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-120px] top-20 w-80 h-80 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 opacity-18 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <main className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Dashboard
        </motion.h1>
        <p className="text-cyan-200 mb-8 max-w-2xl">
          Control and monitor your JAL SUDDHI system. Use the Controls page to operate the bot, view camera streams and monitor sensor values.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ scale: 1.03 }} className="bg-white/6 p-6 rounded-2xl backdrop-blur-md border border-white/8">
            <h3 className="font-semibold text-lg mb-2">System Status</h3>
            <p className="text-sm text-slate-200">All systems nominal</p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-green-500 text-black rounded-full text-sm font-semibold">Online</span>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="bg-white/6 p-6 rounded-2xl backdrop-blur-md border border-white/8">
            <h3 className="font-semibold text-lg mb-2">ESP32 Controls</h3>
            <p className="text-sm text-slate-200">Open controls to send commands and view camera.</p>
            <div className="mt-4">
              <button onClick={() => (window.location.href = "/controls")} className="px-4 py-2 bg-cyan-500 rounded-md text-black font-semibold">Open Controls</button>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="bg-white/6 p-6 rounded-2xl backdrop-blur-md border border-white/8">
            <h3 className="font-semibold text-lg mb-2">Recent Data</h3>
            <p className="text-sm text-slate-200">Live sensor readings will appear here.</p>
            <div className="mt-4 space-y-1">
              <div className="text-sm">pH: <span className="font-semibold">7.2</span></div>
              <div className="text-sm">Turbidity: <span className="font-semibold">3 NTU</span></div>
              <div className="text-sm">TDS: <span className="font-semibold">220 ppm</span></div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
