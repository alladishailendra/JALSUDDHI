import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const audioRef = useRef(null);

  useEffect(() => {
    // Play ambient sound on load
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  // --- Ripple effect setup ---
  useEffect(() => {
    const canvas = document.getElementById("rippleCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h;
    let ripples = [];

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    class Ripple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.opacity = 1;
      }
      update() {
        this.radius += 2;
        this.opacity -= 0.01;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(0, 224, 255, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      ripples.forEach((r, i) => {
        r.update();
        r.draw();
        if (r.opacity <= 0) ripples.splice(i, 1);
      });
      requestAnimationFrame(animate);
    }

    canvas.addEventListener("click", (e) => {
      ripples.push(new Ripple(e.clientX, e.clientY));
    });

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/pi-jalsuddhi.jpg')",
          filter: "brightness(0.7)",
        }}
      ></div>

      {/* Canvas water ripple layer */}
      <canvas
        id="rippleCanvas"
        className="absolute inset-0 z-0"
        style={{ pointerEvents: "none" }}
      ></canvas>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001f2e88] to-[#000000aa]"></div>

      {/* Ambient water sound */}
      <audio ref={audioRef} loop>
        <source src="/sounds/waterflow.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating bubbles */}
      {[...Array(12)].map((_, i) => (
        <div key={i} className={`bubble bubble-${i + 1}`}></div>
      ))}

      {/* Main animated content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.h1
          className="text-7xl md:text-8xl font-extrabold mb-8 neon-text tracking-wider"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          💧 JalSuddhi
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl mb-12 text-cyan-100 font-light"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Purifying Every Drop. Empowering Every Life.
        </motion.p>

        <motion.button
          onClick={() => router.push("/login")}
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 30px #00e0ff",
            textShadow: "0px 0px 10px #00e0ff",
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-cyan-500 text-black px-10 py-5 rounded-full font-semibold text-xl hover:bg-cyan-400 transition-all duration-300 shadow-xl"
        >
          Dive In →
        </motion.button>
      </motion.div>

      <style jsx>{`
        /* Neon text effect */
        .neon-text {
          color: #00e0ff;
          text-shadow: 0 0 5px #00e0ff, 0 0 10px #00e0ff, 0 0 20px #00e0ff,
            0 0 40px #00e0ff, 0 0 80px #00e0ff;
        }

        /* Bubble animations */
        .bubble {
          position: absolute;
          bottom: -100px;
          background: rgba(255, 255, 255, 0.25);
          border-radius: 50%;
          animation: rise 10s infinite ease-in;
        }

        ${Array.from({ length: 12 })
          .map(
            (_, i) => `
          .bubble-${i + 1} {
            left: ${Math.random() * 100}%;
            width: ${10 + Math.random() * 20}px;
            height: ${10 + Math.random() * 20}px;
            animation-delay: ${Math.random() * 5}s;
          }`
          )
          .join("\n")}

        @keyframes rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-110vh) scale(1.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
