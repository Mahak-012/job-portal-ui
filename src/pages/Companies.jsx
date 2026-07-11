import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { COMPANIES, LOGO } from "../data/jobs.jsx"
import Footer from "../components/Footer"
import ScrollReveal from "../components/ScrollReveal"
import { useTheme } from "../context/ThemeContext"

export default function Companies() {
  const { dark: T } = useTheme()
  const navigate = useNavigate()

  const H = T ? "#e8f4f0" : "#0a1f1c"
  const S = T ? "rgba(232,244,240,0.45)" : "rgba(10,31,28,0.5)"
  const cardBg = T ? "rgba(255,255,255,0.04)" : "#fff"
  const border = T ? "rgba(13,148,136,0.15)" : "rgba(13,148,136,0.12)"
  const bg = T ? "#060d12" : "#f0f9f7"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ background: bg, minHeight: "100vh" }}
    >
      {/* Header */}
      <div
        className="relative overflow-hidden text-center"
        style={{
          paddingTop: 108, paddingBottom: 48,
          paddingLeft: 20, paddingRight: 20,
          background: T
            ? "radial-gradient(ellipse 60% 70% at 50% 0%,rgba(13,148,136,0.16),transparent 65%),#060d12"
            : "radial-gradient(ellipse 60% 70% at 50% 0%,rgba(13,148,136,0.1),transparent 65%),#f0f9f7",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span
            className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(13,148,136,0.1)", color: "#0d9488",
              border: "1px solid rgba(13,148,136,0.22)", letterSpacing: "0.1em",
            }}
          >
            TOP EMPLOYERS
          </span>
          <h1
            className="font-bold mb-3"
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(2rem,5vw,3.4rem)",
              color: H,
            }}
          >
            World-Class <span className="gt">Companies</span>
          </h1>
          <p className="text-sm" style={{ color: S }}>
            {COMPANIES.length} top employers hiring right now
          </p>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {COMPANIES.map((c, i) => {
            const L = LOGO[c.name]
            return (
              <ScrollReveal key={c.name} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -6 }}
                  onClick={() => navigate(`/jobs?q=${c.name}`)}
                  className="cursor-pointer p-6 rounded-2xl text-center group relative overflow-hidden"
                  style={{
                    background: cardBg,
                    border: `1px solid ${border}`,
                    boxShadow: T
                      ? "0 2px 16px rgba(0,0,0,0.3)"
                      : "0 2px 16px rgba(13,148,136,0.07)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(13,148,136,0.38)"
                    e.currentTarget.style.boxShadow = T
                      ? "0 16px 48px rgba(0,0,0,0.4)"
                      : "0 16px 48px rgba(13,148,136,0.15)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = border
                    e.currentTarget.style.boxShadow = T
                      ? "0 2px 16px rgba(0,0,0,0.3)"
                      : "0 2px 16px rgba(13,148,136,0.07)"
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(circle at 50% 0%,rgba(13,148,136,0.07),transparent 70%)" }}
                  />

                  {/* Logo */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10"
                    style={{
                      background: T ? "rgba(13,148,136,0.1)" : "rgba(13,148,136,0.07)",
                      border: `1px solid ${T ? "rgba(13,148,136,0.2)" : "rgba(13,148,136,0.15)"}`,
                    }}
                  >
                    {L
                      ? <L dark={T} />
                      : <span className="font-bold text-2xl gt">{c.name.charAt(0)}</span>
                    }
                  </div>

                  <h3 className="font-bold text-sm mb-1 relative z-10" style={{ color: H }}>
                    {c.name}
                  </h3>
                  <p className="text-xs mb-1 relative z-10" style={{ color: "#0d9488" }}>
                    {c.industry}
                  </p>
                  <p className="text-xs mb-3 relative z-10" style={{ color: S }}>
                    {c.followers} followers
                  </p>

                  {/* Star Rating */}
                  <div className="flex items-center justify-center gap-0.5 mb-3 relative z-10">
                    {[...Array(5)].map((_, j) => (
                      <span key={j}
                        style={{
                          color: j < Math.floor(c.rating) ? "#f59e0b" : "rgba(245,158,11,0.22)",
                          fontSize: 11,
                        }}>
                        ★
                      </span>
                    ))}
                    <span className="text-xs ml-1" style={{ color: S }}>{c.rating}</span>
                  </div>

                  <span
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold relative z-10 inline-block"
                    style={{
                      background: "rgba(13,148,136,0.1)",
                      color: "#0d9488",
                      border: "1px solid rgba(13,148,136,0.2)",
                    }}
                  >
                    {c.jobs} open roles
                  </span>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>

      <Footer />
    </motion.div>
  )
}