import { useParams, Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { motion } from "framer-motion"
import { JOBS } from "../data/jobs"
import Footer from "../components/Footer"

export default function JobDetail() {
  const { id }   = useParams()
  const navigate  = useNavigate()
  const job       = JOBS.find(j => j.id === +id)
  const [applied, setApplied] = useState(false)

  if (!job) return (
    <div className="pt-32 text-center min-h-screen" style={{ background: "#05060f" }}>
      <p className="text-white text-xl mb-4">Job not found</p>
      <Link to="/jobs" className="text-indigo-400 underline">← Back to Jobs</Link>
    </div>
  )

  const related = JOBS.filter(j => j.id !== job.id && j.category === job.category).slice(0, 3)

  return (
    <div style={{ background: "#05060f", minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-5 md:px-10 pt-28 pb-24">

        <Link to="/jobs" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-white"
          style={{ color: "rgba(255,255,255,0.4)" }}>
          ← Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl mb-6"
              style={{ background: "rgba(13,14,33,0.8)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <div className="flex items-start gap-5 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {job.logo}
                </div>
                <div>
                  <h1 className="font-black text-2xl md:text-3xl text-white mb-1" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                    {job.title}
                  </h1>
                  <p className="text-base font-semibold mb-2" style={{ color: "#a5b4fc" }}>{job.company}</p>
                  <div className="flex flex-wrap gap-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                    <span>📍 {job.location}</span>
                    <span>🕐 {job.posted}</span>
                    <span>👥 {job.applicants} applicants</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.tags.map(t => (
                  <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.2)" }}>
                    {t}
                  </span>
                ))}
              </div>

              <h2 className="font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>About the Role</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                We are looking for a talented {job.title} to join our growing team at {job.company}. This is an exciting opportunity to work on cutting-edge projects. You will build and maintain high-quality applications, collaborate with cross-functional teams, and drive technical innovation.
              </p>

              <h2 className="font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Requirements</h2>
              <ul className="space-y-2 mb-6">
                {["3+ years of relevant experience", ...job.tags.map(t => `Proficiency in ${t}`), "Strong problem-solving skills", "Excellent communication skills"].map(r => (
                  <li key={r} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <span style={{ color: "#6366f1" }}>✓</span> {r}
                  </li>
                ))}
              </ul>

              <h2 className="font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>What We Offer</h2>
              <ul className="space-y-2">
                {[`Salary: ${job.salary}`, "Remote-friendly culture", "Health & dental insurance", "$2,000 annual learning budget", "401k with company match"].map(o => (
                  <li key={o} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <span>🎁</span> {o}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Related */}
            {related.length > 0 && (
              <div>
                <h3 className="font-bold text-lg text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Similar Jobs</h3>
                <div className="grid gap-4">
                  {related.map(j => (
                    <div
                      key={j.id}
                      onClick={() => navigate(`/jobs/${j.id}`)}
                      className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5"
                      style={{ background: "rgba(13,14,33,0.7)", border: "1px solid rgba(99,102,241,0.12)" }}
                    >
                      <span className="text-2xl">{j.logo}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-white">{j.title}</p>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{j.company} · {j.location}</p>
                      </div>
                      <span className="text-xs font-bold" style={{ color: "#a5b4fc" }}>{j.salary}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="sticky top-24 p-6 rounded-2xl"
              style={{ background: "rgba(13,14,33,0.8)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <div className="text-center mb-6 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-3xl font-black text-white mb-0.5" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{job.salary}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>per year</p>
              </div>

              {[["Type",job.type],["Location",job.location],["Category",job.category],["Applicants",`${job.applicants} people`]].map(([l,v]) => (
                <div key={l} className="flex justify-between py-2.5 text-sm" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>{l}</span>
                  <span className="font-medium text-white">{v}</span>
                </div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(99,102,241,0.5)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setApplied(true)}
                className="w-full mt-6 py-4 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: applied ? "rgba(16,185,129,0.15)" : "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  color: applied ? "#10b981" : "white",
                  border: applied ? "1px solid rgba(16,185,129,0.4)" : "none",
                }}
              >
                {applied ? "✅ Application Sent!" : "Apply Now →"}
              </motion.button>

              <button
                onClick={() => navigate("/jobs")}
                className="w-full mt-3 py-3 rounded-xl text-sm font-medium transition-all"
                style={{ border: "1px solid rgba(99,102,241,0.25)", color: "#a5b4fc", background: "transparent" }}
              >
                Save for Later 🔖
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}