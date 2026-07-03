import { motion } from "framer-motion"
import { JOBS } from "../data/jobs"
import Footer from "../components/Footer"

const SAVED = JOBS.filter((_, i) => i < 3)

export default function Profile() {
  return (
    <div style={{ background: "#05060f", minHeight: "100vh" }}>
      <div className="max-w-4xl mx-auto px-5 md:px-10 pt-28 pb-24">

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl mb-8"
          style={{ background: "rgba(13,14,33,0.8)", border: "1px solid rgba(99,102,241,0.2)" }}
        >
          <div className="flex items-center gap-5 mb-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
            >
              👩‍💻
            </div>
            <div>
              <h1 className="font-black text-2xl text-white mb-1" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Mahak</h1>
              <p className="text-sm mb-2" style={{ color: "#a5b4fc" }}>Frontend Developer</p>
              <span
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: "rgba(16,185,129,0.12)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)" }}
              >
                ● Open to Work
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[["15","Applications"],["3","Interviews"],["1","Offers"]].map(([n, l]) => (
              <div key={l} className="text-center p-4 rounded-xl" style={{ background: "rgba(99,102,241,0.06)" }}>
                <p className="font-black text-2xl text-white mb-0.5">{n}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{l}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Saved jobs */}
        <h2 className="font-bold text-lg text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Saved Jobs</h2>
        <div className="space-y-3">
          {SAVED.map((j, i) => (
            <motion.div
              key={j.id}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-5 rounded-xl"
              style={{ background: "rgba(13,14,33,0.8)", border: "1px solid rgba(99,102,241,0.12)" }}
            >
              <span className="text-3xl">{j.logo}</span>
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">{j.title}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{j.company} · {j.location}</p>
              </div>
              <span className="text-sm font-bold" style={{ color: "#a5b4fc" }}>{j.salary}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}