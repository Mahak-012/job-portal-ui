import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { COMPANIES } from "../data/jobs"
import Footer from "../components/Footer"

export default function Companies() {
  const navigate = useNavigate()

  return (
    <div style={{ background: "#05060f", minHeight: "100vh" }}>
      <div className="pt-28 pb-16 px-5 md:px-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="font-black text-5xl md:text-6xl text-white mb-3"
          style={{ fontFamily: "'Space Grotesk',sans-serif" }}
        >
          Top{" "}
          <span style={{ background: "linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Companies
          </span>
        </motion.h1>
        <p style={{ color: "rgba(255,255,255,0.4)" }}>Find your next great employer</p>
      </div>

      <div className="max-w-5xl mx-auto px-5 md:px-10 pb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {COMPANIES.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/jobs?q=${c.name}`)}
            className="cursor-pointer p-7 rounded-2xl text-center transition-all duration-300"
            style={{ background: "rgba(13,14,33,0.8)", border: "1px solid rgba(99,102,241,0.12)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.12)" }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.12)"; e.currentTarget.style.boxShadow = "none" }}
          >
            <div className="text-5xl mb-4">{c.logo}</div>
            <h3 className="font-bold text-white text-lg mb-1" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{c.name}</h3>
            <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>{c.followers} followers</p>
            <span className="px-4 py-1.5 rounded-lg text-xs font-bold"
              style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.2)" }}>
              {c.jobs} open roles
            </span>
          </motion.div>
        ))}
      </div>
      <Footer />
    </div>
  )
}