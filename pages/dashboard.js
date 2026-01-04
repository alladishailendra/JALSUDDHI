import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [espStatus, setEspStatus] = useState("offline");

  useEffect(() => {
    const espIp = localStorage.getItem("espIp");

    if (!espIp) {
      setEspStatus("offline");
      return;
    }

    const checkESP = async () => {
      try {
        const res = await fetch(`${espIp}/ping`, {
          cache: "no-store",
        });
        if (res.ok) {
          setEspStatus("online");
        } else {
          setEspStatus("offline");
        }
      } catch {
        setEspStatus("offline");
      }
    };

    checkESP();
    const interval = setInterval(checkESP, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-800 text-white overflow-hidden">
      <Navbar />

      {/* 🌌 Decorative Animated Background Shapes */}
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

      {/* 💧 Dashboard Main Section */}
      <main className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Dashboard
        </motion.h1>

        <p className="text-cyan-200 mb-8 max-w-2xl">
          Control and monitor your <span className="text-cyan-400 font-semibold">JAL SUDDHI</span> system.
          Manage the bot, view live video feeds, and monitor real-time sensor readings.
        </p>

        {/* 📊 Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 🟢 System Status */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10"
          >
            <h3 className="font-semibold text-lg mb-2">System Status</h3>
            <p className="text-sm text-slate-200">All systems nominal</p>
            <div className="mt-4 flex gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  espStatus === "online"
                    ? "bg-green-500 text-black"
                    : "bg-red-500 text-white"
                }`}
              >
                {espStatus === "online" ? "🟢 Online" : "🔴 Offline"}
              </span>
            </div>
          </motion.div>

          {/* ⚙️ ESP32 Controls */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10"
          >
            <h3 className="font-semibold text-lg mb-2">ESP32 Controls</h3>
            <p className="text-sm text-slate-200">
              Control motors, servos, and monitor ESP32 data.
            </p>
            <div className="mt-4">
              <button
                onClick={() => (window.location.href = "/controls")}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-md text-black font-semibold"
              >
                Open Controls
              </button>
            </div>
          </motion.div>

          {/* 📈 Recent Sensor Data */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10"
          >
            <h3 className="font-semibold text-lg mb-2">Recent Data</h3>
            <p className="text-sm text-slate-200">
              Live sensor readings from your system.
            </p>
            <div className="mt-4 space-y-1">
              <div className="text-sm">
                pH: <span className="font-semibold">7.2</span>
              </div>
              <div className="text-sm">
                Turbidity: <span className="font-semibold">3 NTU</span>
              </div>
              <div className="text-sm">
                TDS: <span className="font-semibold">220 ppm</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 💧 Learn / Good Water Section */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="mt-8 bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10 text-center"
        >
          <h3 className="font-semibold text-lg mb-3 text-cyan-300">
            Learn About Clean Water
          </h3>
          <p className="text-sm text-slate-200 mb-4">
            Explore how the JALSUDDHI system purifies water sustainably using
            filtration, sensors, and IoT integration.
          </p>
          <button
            onClick={() => (window.location.href = "/goodwater")}
            className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold rounded-xl shadow-md hover:scale-105 transition-transform"
          >
            💧 Learn More
          </button>
        </motion.div>
      </main>
    </div>
  );
}
