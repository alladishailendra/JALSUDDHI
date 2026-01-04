"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Controls() {
  const router = useRouter();

  const [espIp, setEspIp] = useState("");
  const [camIp, setCamIp] = useState("");
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const [sensorData, setSensorData] = useState({
    temperature: "--",
    ph: "--",
    turbidity: "--",
  });

  const [accelerator, setAccelerator] = useState(50); // 0-100%
  const speedRef = useRef(0);
  const speedInterval = useRef(null);

  /* Load saved IPs */
  useEffect(() => {
    const savedEsp = localStorage.getItem("espIp");
    const savedCam = localStorage.getItem("camIp");
    if (savedEsp) setEspIp(savedEsp);
    if (savedCam) setCamIp(savedCam);
  }, []);

  /* Connect to ESP */
  const handleConnect = async () => {
    if (!espIp || !camIp) {
      alert("Please enter both IP addresses!");
      return;
    }

    setConnecting(true);
    try {
      const res = await fetch(`${espIp}/ping`, { method: "GET", cache: "no-store" });
      if (!res.ok) throw new Error("ESP not reachable");

      localStorage.setItem("espIp", espIp);
      localStorage.setItem("camIp", camIp);
      setConnected(true);
    } catch (err) {
      alert("❌ ESP32 not reachable. Check WiFi & IP.");
      setConnected(false);
    } finally {
      setConnecting(false);
    }
  };

  /* Send motor command with speed & accelerator */
  const sendCommand = (dir) => {
    if (!connected) return;

    clearInterval(speedInterval.current);
    speedRef.current = 0;

    // Accelerate gradually, multiplied by accelerator slider
    speedInterval.current = setInterval(() => {
      if (speedRef.current < 100) speedRef.current += 5;
      const finalSpeed = Math.round((speedRef.current * accelerator) / 100);
      fetch(`${espIp}/move?dir=${dir}&speed=${finalSpeed}`).catch(() => {});
    }, 100);
  };

  const stopMovement = () => {
    clearInterval(speedInterval.current);
    speedRef.current = 0;
    fetch(`${espIp}/move?dir=stop&speed=0`).catch(() => {});
  };

  /* Servo */
  const handleServo = (angle) => {
    if (!connected) return;
    fetch(`${espIp}/servo?angle=${angle}`).catch(() => {});
  };

  /* Sensor polling */
  useEffect(() => {
    if (!connected) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${espIp}/sensor`, { cache: "no-store" });
        const data = await res.json();
        setSensorData(data);
      } catch {}
    }, 2000);

    return () => clearInterval(interval);
  }, [connected, espIp]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-blue-900 to-cyan-900 text-white overflow-y-auto">
      <div className="absolute inset-0 opacity-30 bg-[url('/water-texture.gif')] bg-cover bg-center pointer-events-none" />

      {/* NAV */}
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

      {/* TITLE */}
      <motion.h1
        className="pt-24 text-3xl md:text-4xl font-extrabold text-cyan-300 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🤖 JAL-SUDDHI BOT CONTROL CENTER
      </motion.h1>

      {/* IP INPUTS */}
      <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 bg-black/40 p-4 rounded-2xl mx-auto w-fit backdrop-blur-md">
        <div>
          <label className="text-sm text-cyan-200">ESP32 Bot IP</label>
          <input
            value={espIp}
            onChange={(e) => setEspIp(e.target.value)}
            placeholder="http://192.168.4.1"
            className="block w-64 px-3 py-2 mt-1 rounded-md bg-transparent border border-cyan-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div>
          <label className="text-sm text-cyan-200">ESP32-CAM IP</label>
          <input
            value={camIp}
            onChange={(e) => setCamIp(e.target.value)}
            placeholder="http://192.168.4.2"
            className="block w-64 px-3 py-2 mt-1 rounded-md bg-transparent border border-cyan-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <button
          onClick={handleConnect}
          disabled={connecting}
          className={`px-5 py-2 mt-5 md:mt-0 rounded-md font-semibold shadow ${
            connected
              ? "bg-green-500 text-black"
              : "bg-cyan-600 text-black hover:bg-cyan-500"
          }`}
        >
          {connecting ? "⏳ Connecting..." : connected ? "✅ Connected" : "🔗 Connect"}
        </button>
      </div>

      {/* MAIN */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 pb-20">
        {/* SERVO */}
        <div className="bg-black/50 p-5 rounded-2xl border border-cyan-600/30 shadow-md">
          <h3 className="text-lg font-semibold text-cyan-300 mb-3">
            Servo Control
          </h3>
          <input
            type="range"
            min="0"
            max="180"
            onChange={(e) => handleServo(e.target.value)}
            className="w-full accent-cyan-500"
          />
          <div className="flex justify-around mt-3">
            {[0, 90, 180].map((a) => (
              <button
                key={a}
                onClick={() => handleServo(a)}
                className="px-3 py-1 bg-white/10 rounded-md hover:bg-white/20"
              >
                {a}°
              </button>
            ))}
          </div>
        </div>

        {/* CAMERA + JOYSTICK */}
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="w-[380px] h-[280px] md:w-[520px] md:h-[360px] bg-black/60 border-4 border-cyan-500 rounded-2xl shadow-2xl overflow-hidden">
            {connected ? (
              <img
                src={`${camIp}/stream`}
                alt="ESP32-CAM"
                className="object-cover w-full h-full"
              />
            ) : (
              <p className="text-gray-300 text-sm flex items-center justify-center h-full">
                Camera Not Connected
              </p>
            )}
          </div>

          {/* JOYSTICK */}
          <div className="grid grid-cols-3 gap-5 mt-4">
            <div />
            <JoystickButton
              icon="⬆"
              onMouseDown={() => sendCommand("forward")}
              onMouseUp={stopMovement}
            />
            <div />
            <JoystickButton
              icon="⬅"
              onMouseDown={() => sendCommand("left")}
              onMouseUp={stopMovement}
            />
            <JoystickButton
              icon="⛔"
              color="red"
              onClick={stopMovement}
            />
            <JoystickButton
              icon="➡"
              onMouseDown={() => sendCommand("right")}
              onMouseUp={stopMovement}
            />
            <div />
            <JoystickButton
              icon="⬇"
              onMouseDown={() => sendCommand("backward")}
              onMouseUp={stopMovement}
            />
            <div />
          </div>

          {/* ACCELERATOR SLIDER */}
          <div className="mt-4 w-56">
            <label className="text-sm text-gray-300">Accelerator</label>
            <input
              type="range"
              min="0"
              max="100"
              value={accelerator}
              onChange={(e) => setAccelerator(parseInt(e.target.value))}
              className="w-full accent-cyan-500"
            />
            <p className="text-sm text-gray-300 text-center">{accelerator}%</p>
          </div>

          {/* SPEED METER */}
          <div className="mt-2 w-56 bg-white/20 rounded-full h-3 relative">
            <div
              className="bg-cyan-500 h-3 rounded-full transition-all"
              style={{ width: `${speedRef.current}%` }}
            />
          </div>
        </div>

        {/* SENSOR */}
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

/* COMPONENTS */
const JoystickButton = ({ icon, onClick, onMouseDown, onMouseUp, color = "cyan" }) => (
  <motion.button
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
    className={`w-20 h-20 md:w-24 md:h-24 text-3xl font-bold rounded-full shadow-lg text-black ${
      color === "red"
        ? "bg-red-600 hover:bg-red-500"
        : "bg-cyan-500 hover:bg-cyan-400"
    } border-4 border-white/40`}
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
