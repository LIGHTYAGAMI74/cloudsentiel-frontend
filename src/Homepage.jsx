import { useState, useEffect } from "react";
import {
  ShieldCheckIcon,
  ClockIcon,
  ChartBarIcon,
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const THEME = {
  primary: "bg-gradient-to-r from-indigo-500 to-blue-600",
  secondary: "bg-gradient-to-r from-purple-400 to-pink-400",
  accent: "bg-blue-100/50",
  textMain: "text-slate-800",
  textSub: "text-slate-500",
  card: "bg-white/80 backdrop-blur-md border border-white shadow-xl shadow-blue-100/50",
};

export default function CloudsentielLanding() {
  const navigate = useNavigate(); // ✅ CORRECT HOOK USAGE

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F4FF] text-slate-800 overflow-x-hidden">
      
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 left-10 w-40 h-24 bg-white rounded-full blur-3xl opacity-60"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-64 h-40 bg-indigo-200 rounded-full blur-3xl opacity-40"
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 px-8 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className={`${THEME.primary} p-2 rounded-xl`}>
            <ShieldCheckIcon className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-indigo-900">
            Cloudsentiel AI
          </span>
        </div>

        <div className="p-2 bg-white rounded-full shadow">
          <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
        </div>
      </nav>

      {/* Main */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <h1 className="text-6xl font-black text-indigo-950">
            Cloud Intelligence,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              without the Boring Bits
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-lg">
            Meet Sentiel — the friendly AI that monitors your cloud security,
            performance, and costs in real time.
          </p>

          <div className="flex gap-4">
            {/* ✅ FIXED DASHBOARD BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
              className={`${THEME.primary} text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl`}
            >
              Go to Dashboard
            </motion.button>

            <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border">
              <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-indigo-500" />
              <span className="font-semibold text-indigo-900">AI Chat</span>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <div className="relative">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="flex justify-center"
          >
            <div className="w-80 h-48 bg-white rounded-[100px] shadow-2xl flex items-center justify-center">
              <div className="flex space-x-12">
                <div className="w-6 h-8 bg-indigo-900 rounded-full" />
                <div className="w-6 h-8 bg-indigo-900 rounded-full" />
              </div>
            </div>
          </motion.div>

          <div className="absolute -right-4 top-10 space-y-4">
            <div className={`${THEME.card} p-4 rounded-2xl w-56`}>
              <div className="flex items-center gap-2 mb-2">
                <ChartBarIcon className="h-5 w-5 text-indigo-500" />
                <span className="text-sm font-bold">Real-time Analytics</span>
              </div>
              <div className="h-12 flex items-end gap-1">
                {[40, 70, 50, 90, 60].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="w-full bg-indigo-400 rounded-t-sm"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full px-8 py-4 flex justify-end">
        <div className="bg-white px-6 py-3 rounded-2xl shadow flex items-center gap-4">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <ClockIcon className="h-5 w-5 text-white" />
          </div>
          <p className="text-xl font-mono font-bold text-indigo-900">
            {currentTime}
          </p>
        </div>
      </footer>
    </div>
  );
}
