// components/Navbar.js
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profile", path: "/profile" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="fixed top-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg border border-white/20"
        aria-label="Open menu"
      >
        {open ? <X className="text-white" /> : <Menu className="text-white" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute right-0 mt-4 bg-black/60 backdrop-blur-md rounded-2xl shadow-xl p-4 flex flex-col gap-3 min-w-[180px]"
          >
            {navLinks.map((link) => (
              <motion.button
                key={link.path}
                whileHover={{ scale: 1.03 }}
                onClick={() => {
                  setOpen(false);
                  router.push(link.path);
                }}
                className="text-white text-left px-3 py-2 rounded-md hover:bg-white/10 transition font-medium"
              >
                {link.name}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={() => {
                localStorage.clear();
                setOpen(false);
                router.push("/login");
              }}
              className="mt-2 bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-md font-semibold"
            >
              Logout
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
