// pages/contact.js
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const phone = "+91 9381504389";
  const email = "alladishailupendra@gmail.com";
  const timerRef = useRef(null);
  const [copied, setCopied] = useState("");

  const copy = async (text, which) => {
    await navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(""), 2000);
  };

  const startHold = (text, which) => {
    timerRef.current = setTimeout(() => copy(text, which), 900);
  };
  const endHold = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
      <Navbar />
      <main className="relative z-10 px-6 py-20 max-w-3xl mx-auto text-center">
        <motion.h1 className="text-4xl font-bold mb-4">Contact</motion.h1>
        <p className="text-cyan-100 mb-8">Press & hold (or tap) to copy contact details</p>

        <div className="space-y-4">
          <div
            onMouseDown={() => startHold(phone, "phone")}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={() => startHold(phone, "phone")}
            onTouchEnd={endHold}
            onClick={() => copy(phone, "phone")}
            className="bg-white/6 p-4 rounded-lg cursor-pointer hover:bg-white/8"
          >
            <div className="text-lg">📱 {phone}</div>
            <div className="text-sm text-slate-200">{copied === "phone" ? "Copied!" : "Tap & hold to copy"}</div>
          </div>

          <div
            onMouseDown={() => startHold(email, "email")}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={() => startHold(email, "email")}
            onTouchEnd={endHold}
            onClick={() => copy(email, "email")}
            className="bg-white/6 p-4 rounded-lg cursor-pointer hover:bg-white/8"
          >
            <div className="text-lg">✉️ {email}</div>
            <div className="text-sm text-slate-200">{copied === "email" ? "Copied!" : "Tap & hold to copy"}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
