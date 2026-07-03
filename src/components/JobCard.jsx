import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"


const TYPE = {
  "Full-time": { bg:"rgba(124,58,237,0.1)",  color:"#7c3aed", border:"rgba(124,58,237,0.22)" },
  "Contract":  { bg:"rgba(245,158,11,0.1)",  color:"#d97706", border:"rgba(245,158,11,0.22)" },
  "Part-time": { bg:"rgba(16,185,129,0.1)",  color:"#059669", border:"rgba(16,185,129,0.22)" },
}

export default function JobCard({ job, index=0 }) {
  const { dark } = useTheme()
  const [saved, setSaved] = useState(false)
  const navigate = useNavigate()
  const ts = TYPE[job.type] || TYPE["Full-time"]

  return (
    <motion.article
      initial={{ opacity:0, y:24 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-40px" }}
      transition={{ delay:index*0.055, duration:0.55, ease:[0.22,1,0.36,1] }}
      whileHover={{ y:-4, transition:{ duration:0.28 } }}
      onClick={()=>navigate(`/jobs/${job.id}`)}
      className="cursor-pointer flex flex-col rounded-2xl overflow-hidden relative"
      style={{
        background: dark ? "rgba(255,255,255,0.04)" : "#ffffff",
        border:`1px solid ${dark?"rgba(255,255,255,0.08)":"rgba(124,58,237,0.1)"}`,
        boxShadow: dark?"0 2px 16px rgba(0,0,0,0.25)":"0 2px 16px rgba(124,58,237,0.06)",
        transition:"box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={e=>{
        e.currentTarget.style.borderColor=dark?"rgba(124,58,237,0.35)":"rgba(124,58,237,0.28)"
        e.currentTarget.style.boxShadow=dark?"0 12px 40px rgba(0,0,0,0.3)":"0 12px 40px rgba(124,58,237,0.12)"
      }}
      onMouseLeave={e=>{
        e.currentTarget.style.borderColor=dark?"rgba(255,255,255,0.08)":"rgba(124,58,237,0.1)"
        e.currentTarget.style.boxShadow=dark?"0 2px 16px rgba(0,0,0,0.25)":"0 2px 16px rgba(124,58,237,0.06)"
      }}
    >
      {/* Featured top bar */}
      {job.featured && (
        <div className="h-0.5 w-full"
          style={{ background:"linear-gradient(90deg,#7c3aed,#a855f7,transparent)" }} />
      )}

      <div className="p-5 flex flex-col flex-1">

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Logo */}
            <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center text-xl"
              style={{
                background: dark?"rgba(255,255,255,0.07)":"rgba(124,58,237,0.07)",
                border:`1px solid ${dark?"rgba(255,255,255,0.1)":"rgba(124,58,237,0.12)"}`,
              }}>
              {job.logo}
            </div>
            {/* Title + company */}
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm leading-snug mb-0.5 truncate"
                style={{ color:dark?"#fffffe":"#0f0e17" }}>
                {job.title}
              </h3>
              <p className="text-xs truncate"
                style={{ color:dark?"rgba(255,255,254,0.42)":"rgba(15,14,23,0.48)" }}>
                {job.company}
              </p>
            </div>
          </div>

          {/* Save btn */}
          <motion.button whileTap={{ scale:0.82 }}
            onClick={e=>{e.stopPropagation();setSaved(s=>!s)}}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-all"
            style={{
              background: saved?"rgba(124,58,237,0.14)": dark?"rgba(255,255,255,0.06)":"rgba(124,58,237,0.06)",
              border:`1px solid ${saved?"rgba(124,58,237,0.3)": dark?"rgba(255,255,255,0.09)":"rgba(124,58,237,0.1)"}`,
              color: saved?"#7c3aed": dark?"rgba(255,255,254,0.35)":"rgba(15,14,23,0.35)",
              cursor:"pointer",
            }}>
            {saved?"♥":"♡"}
          </motion.button>
        </div>

        {/* Featured badge */}
        {job.featured && (
          <div className="mb-3">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
              style={{ background:"rgba(124,58,237,0.1)", color:"#7c3aed", border:"1px solid rgba(124,58,237,0.2)" }}>
              ⚡ Featured
            </span>
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
          {[`📍 ${job.location}`,`👥 ${job.applicants}`,`🕐 ${job.posted}`].map(m=>(
            <span key={m} className="text-xs"
              style={{ color:dark?"rgba(255,255,254,0.38)":"rgba(15,14,23,0.46)" }}>
              {m}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {job.tags.slice(0,3).map(t=>(
            <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{
                background: dark?"rgba(124,58,237,0.1)":"rgba(124,58,237,0.06)",
                color: dark?"#c4b5fd":"#6d28d9",
                border:`1px solid ${dark?"rgba(124,58,237,0.2)":"rgba(124,58,237,0.14)"}`,
              }}>
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4"
          style={{ borderTop:`1px solid ${dark?"rgba(255,255,255,0.06)":"rgba(124,58,237,0.08)"}` }}>
          <div>
            <span className="font-bold text-sm" style={{ color:"#7c3aed" }}>{job.salary}</span>
            <span className="text-xs ml-1"
              style={{ color:dark?"rgba(255,255,254,0.28)":"rgba(15,14,23,0.38)" }}>/yr</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap"
              style={{ background:ts.bg, color:ts.color, border:`1px solid ${ts.border}` }}>
              {job.type}
            </span>
            <motion.button
              whileHover={{ scale:1.06 }} whileTap={{ scale:0.94 }}
              onClick={e=>{e.stopPropagation();navigate(`/jobs/${job.id}`)}}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white whitespace-nowrap"
              style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7)", cursor:"pointer" }}>
              Apply →
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}