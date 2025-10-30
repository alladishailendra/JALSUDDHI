// pages/goodwater.js
import Navbar from "../components/Navbar";

export default function GoodWater(){
  return (
    <div className="min-h-screen relative text-white" style={{backgroundImage:"url('/background.jpg')"}}>
      <Navbar />
      <div className="absolute inset-0 bg-black/60" />
      <main className="relative z-20 p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl neon font-bold mb-4">Good Water — What it means</h1>
        <div className="bg-black/40 rounded-2xl p-6 text-gray-200">
          <p>Clean water indicators include neutral pH, low turbidity, and acceptable TDS values. Jalsuddhi helps monitor and maintain these parameters.</p>
          <ul className="mt-4 list-disc ml-6">
            <li>pH near neutral (6.5–8.5)</li>
            <li>Low turbidity (clear)</li>
            <li>TDS appropriate to use-case</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
