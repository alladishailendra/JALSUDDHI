"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Controls() {
  const router = useRouter();
  const [espIp, setEspIp] = useState("");
  const [camIp, setCamIp] = useState("");
  const [connected, setConnected] = useState(false);
  const [sensorData, setSensorData] = useState({
    temperature: "--",
    ph: "--",
    turbidity: "--",
  });

  useEffect(() => {
    const savedEsp = localStorage.getItem("espIp");
    const savedCam = localStorage.getItem("camIp");
    if (savedEsp) setEspIp(savedEsp);
    if (savedCam) setCamIp(savedCam);
  }, []);

  const handleConnect = () => {
    if (espIp && camIp) {
      localStorage.setItem("espIp", espIp);
      localStorage.setItem("camIp", camIp);
      setConnected(true);
    } else {
      alert("Please enter both IP addresses!");
    }
  };

  const sendCommand = async (cmd) => {
    if (!espIp) return alert("Enter ESP32 IP first!");
    try {
      await fetch(`${espIp}/move?dir=${cmd}`);
    } catch (err) {
      console.log("Command error:", err.message);
    }
  };

  const handleServo = async (angle) => {
    if (!espIp) return;
    try {
      await fetch(`${espIp}/servo?angle=${angle}`);
    } catch (err) {
      console.log("Servo error:", err.message);
    }
  };

  useEffect(() => {
    if (!connected) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${espIp}/sensor`);
        const data = await res.json();
        setSensorData(data);
      } catch {
        // ignore fetch errors
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [connected, espIp]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-blue-900 to-cyan-900 text-white overflow-y-auto">
      <div className="absolute inset-0 opacity-30 bg-[url('/water-texture.gif')] bg-cover bg-center pointer-events-none" />

      {/* Navigation Buttons */}
      <div className="absolute top-6 left-6 z-30 flex gap-3">
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg text-black font-bold shadow"
        >
          ⬅ Dashboard
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-black font-bold shadow"
        >
          🏠 Home
        </button>
      </div>

      {/* Title */}
      <motion.h1
        className="pt-24 text-3xl md:text-4xl font-extrabold text-cyan-300 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🤖 JAL-SUDDHI BOT CONTROL CENTER
      </motion.h1>

      {/* IP Inputs */}
      <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 bg-black/40 p-4 rounded-2xl mx-auto w-fit backdrop-blur-md">
        <div>
          <label className="text-sm text-cyan-200">ESP32 Bot IP</label>
          <input
            value={espIp}
            onChange={(e) => setEspIp(e.target.value)}
            placeholder="http://192.168.x.x"
            className="block w-64 px-3 py-2 mt-1 rounded-md bg-transparent border border-cyan-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div>
          <label className="text-sm text-cyan-200">ESP32-CAM IP</label>
          <input
            value={camIp}
            onChange={(e) => setCamIp(e.target.value)}
            placeholder="http://192.168.x.x"
            className="block w-64 px-3 py-2 mt-1 rounded-md bg-transparent border border-cyan-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <button
          onClick={handleConnect}
          className={`px-5 py-2 mt-5 md:mt-0 rounded-md font-semibold ${
            connected
              ? "bg-green-500 text-black"
              : "bg-cyan-600 text-black hover:bg-cyan-500"
          } shadow`}
        >
          {connected ? "✅ Connected" : "🔗 Connect"}
        </button>
      </div>

      {/* Main Layout */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 pb-20">
        {/* Servo */}
        <div className="bg-black/50 p-5 rounded-2xl border border-cyan-600/30 shadow-md">
          <h3 className="text-lg font-semibold text-cyan-300 mb-3">Servo Control</h3>
          <input
            type="range"
            min="0"
            max="180"
            onChange={(e) => handleServo(e.target.value)}
            className="w-full accent-cyan-500"
          />
          <p className="mt-2 text-sm text-gray-300 text-center">
            Adjust Servo Angle
          </p>
          <div className="flex justify-around mt-3">
            {[0, 90, 180].map((angle) => (
              <button
                key={angle}
                onClick={() => handleServo(angle)}
                className="px-3 py-1 bg-white/10 rounded-md hover:bg-white/20"
              >
                {angle}°
              </button>
            ))}
          </div>
        </div>

        {/* Camera + Joystick */}
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="w-[380px] h-[280px] md:w-[520px] md:h-[360px] bg-black/60 border-4 border-cyan-500 rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center relative">
            {camIp ? (
              <img
                src={`${camIp}/stream`}
                alt="ESP32-CAM Stream"
                className="object-cover w-full h-full"
              />
            ) : (
              <p className="text-gray-300 text-sm text-center">
                Camera Stream Not Set
              </p>
            )}
          </div>

          {/* Enlarged Joystick */}
          <div className="grid grid-cols-3 gap-5 items-center justify-center">
            <div></div>
            <JoystickButton icon="⬆" onClick={() => sendCommand("forward")} />
            <div></div>

            <JoystickButton icon="⬅" onClick={() => sendCommand("left")} />
            <JoystickButton
              icon="⛔"
              color="red"
              onClick={() => sendCommand("stop")}
            />
            <JoystickButton icon="➡" onClick={() => sendCommand("right")} />

            <div></div>
            <JoystickButton icon="⬇" onClick={() => sendCommand("backward")} />
            <div></div>
          </div>
        </div>

        {/* Sensor Readings */}
        <div className="bg-black/50 p-5 rounded-2xl border border-cyan-600/30 shadow-md text-center">
          <h3 className="text-lg font-semibold text-cyan-300 mb-3">
            Sensor Readings
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <SensorBox label="🌡 Temp" value={sensorData.temperature} />
            <SensorBox label="💧 pH" value={sensorData.ph} />
            <SensorBox label="🌫 Turbidity" value={sensorData.turbidity} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable Components */
const JoystickButton = ({ icon, onClick, color = "cyan" }) => (
  <motion.button
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`w-20 h-20 md:w-24 md:h-24 text-3xl font-bold rounded-full shadow-lg text-black ${
      color === "red"
        ? "bg-red-600 hover:bg-red-500"
        : "bg-cyan-500 hover:bg-cyan-400"
    } border-4 border-white/40 transition-all duration-200`}
  >
    {icon}
  </motion.button>
);

const SensorBox = ({ label, value }) => (
  <div className="bg-white/10 p-3 rounded-lg">
    <div className="text-sm text-gray-300">{label}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);
