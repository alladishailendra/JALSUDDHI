// pages/goodwater.js
import { motion } from "framer-motion";

export default function GoodWater() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-100 text-slate-800 px-6 py-12 overflow-y-auto">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center text-blue-700 mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        💧 When is Water Considered Pure?
      </motion.h1>

      <div className="max-w-4xl mx-auto space-y-10 leading-relaxed">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="bg-white/70 shadow-lg backdrop-blur-md p-6 rounded-2xl border border-blue-100"
        >
          <p className="text-lg mb-4">
            Pure water is free from harmful impurities and safe for consumption.
            The quality of water is determined through key parameters such as{" "}
            <span className="font-semibold text-blue-700">pH</span>,{" "}
            <span className="font-semibold text-blue-700">Turbidity</span>, and{" "}
            <span className="font-semibold text-blue-700">
              Total Dissolved Solids (TDS)
            </span>
            .
          </p>

          <h2 className="text-2xl font-bold text-blue-700 mb-3">1️⃣ pH Level</h2>
          <p>
            <strong>Ideal range:</strong> 6.5 – 8.5 <br />
            Water within this range is neither too acidic nor too alkaline,
            making it safe for drinking and daily use.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="bg-white/70 shadow-lg backdrop-blur-md p-6 rounded-2xl border border-blue-100"
        >
          <h2 className="text-3xl font-bold text-blue-700 mb-3">
            💧 Kinds of Water Filters
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Sediment Filters:</strong> Remove dust, sand, and rust.
              Ideal for muddy water areas.
            </li>
            <li>
              <strong>Activated Carbon Filters:</strong> Eliminate chlorine and
              bad odors.
            </li>
            <li>
              <strong>Reverse Osmosis (RO):</strong> Remove salts and heavy
              metals — best for high TDS water.
            </li>
            <li>
              <strong>Ultraviolet (UV):</strong> Kills bacteria and viruses
              without chemicals.
            </li>
            <li>
              <strong>Ultrafiltration (UF):</strong> Works without electricity
              and retains essential minerals.
            </li>
            <li>
              <strong>Activated Alkaline Filters:</strong> Add essential
              minerals and balance pH.
            </li>
            <li>
              <strong>Gravity-Based Filters:</strong> Ideal for low TDS and
              power-free areas.
            </li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
          className="bg-white/70 shadow-lg backdrop-blur-md p-6 rounded-2xl border border-blue-100"
        >
          <h2 className="text-3xl font-bold text-blue-700 mb-3">
            🌿 Choosing the Right Filter
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>Check your water source (borewell, municipal, tank).</li>
            <li>Test TDS and pH levels before selecting a system.</li>
            <li>
              Combine filters (RO + UV + UF) for complete purification.
            </li>
            <li>Maintain your system regularly for best quality.</li>
            <li>
              Balanced pH ensures better taste and prevents corrosion.
            </li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1.2 }}
          className="bg-white/70 shadow-lg backdrop-blur-md p-6 rounded-2xl border border-blue-100"
        >
          <h2 className="text-3xl font-bold text-blue-700 mb-3">2️⃣ Turbidity</h2>
          <p>
            <strong>Ideal turbidity:</strong> Less than 1 NTU. Low turbidity
            means clear, clean water without suspended particles.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.2 }}
          className="bg-white/70 shadow-lg backdrop-blur-md p-6 rounded-2xl border border-blue-100"
        >
          <h2 className="text-3xl font-bold text-blue-700 mb-3">
            3️⃣ Total Dissolved Solids (TDS)
          </h2>
          <p>
            <strong>Ideal range:</strong> 50–250 mg/L. <br /> High TDS affects
            taste and may indicate contamination, while very low TDS can make
            water taste flat.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 1.2 }}
          className="bg-white/70 shadow-lg backdrop-blur-md p-6 rounded-2xl border border-blue-100"
        >
          <h2 className="text-3xl font-bold text-blue-700 mb-3">
            🌿 Key Points About Pure Water
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>Safe for drinking, cooking, and hygiene.</li>
            <li>Colorless, odorless, and tasteless.</li>
            <li>Free from pathogens, chemicals, and heavy metals.</li>
            <li>Promotes health and proper body function.</li>
            <li>Regular testing helps maintain purity.</li>
          </ul>
        </motion.section>

        {/* Button back to dashboard */}
        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/dashboard")}
            className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition-all"
          >
            ⬅ Back to Dashboard
          </motion.button>
        </div>
      </div>
    </div>
  );
}
