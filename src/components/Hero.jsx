import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"

const TRENDING = ["React Developer","UI/UX Designer","Data Scientist","DevOps","Product Manager"]
const PILLS    = [
  { text:"💼 $140k · Remote",     top:"22%", left:"2%",  delay:0.2 },
  { text:"🎨 UI Designer · NYC",  top:"35%", right:"2%", delay:0.5 },
  { text:"📊 Data Lead · $130k",  top:"64%", left:"2%",  delay:0.8 },
  { text:"🚀 PM · San Francisco", top:"72%", right:"2%", delay:1.1 },
]

export default function Hero() {
  const { dark } = useTheme()
  const [q, setQ] = useState("")
  const navigate  = useNavigate()

  const bg = dark
    ? "radial-gradient(ellipse 80% 60% at 50% -5%,rgba(124,58,237,0.2) 0%,transparent 65%), #0f0e17"
    : "radial-gradient(ellipse 80% 60% at 50% -5%,rgba(124,58,237,0.1) 0%,transparent 65%), #faf9f6"

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background:bg }}>

      {/* Soft grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:`linear-gradient(${dark?"rgba(124,58,237,0.04)":"rgba(124,58,237,0.05)"} 1px,transparent 1px),
                           linear-gradient(90deg,${dark?"rgba(124,58,237,0.04)":"rgba(124,58,237,0.05)"} 1px,transparent 1px)`,
          backgroundSize:"52px 52px",
        }} />

      {/* Glow blob */}
      <div className="absolute pointer-events-none"
        style={{ top:"-10%", left:"50%", transform:"translateX(-50%)",
          width:700, height:400, borderRadius:"50%",
          background:"radial-gradient(circle,rgba(124,58,237,0.1) 0%,transparent 70%)", filter:"blur(70px)" }} />

      {/* Floating pills */}
      {PILLS.map((p,i)=>(
        <motion.div key={i}
          initial={{ opacity:0, x: p.left?-20:20 }}
          animate={{ opacity:1, x:0 }}
          transition={{ delay:p.delay+0.8, duration:0.7 }}
          className="absolute hidden xl:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium"
          style={{
            top:p.top, left:p.left, right:p.right,
            background: dark?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.92)",
            border:`1px solid ${dark?"rgba(124,58,237,0.2)":"rgba(124,58,237,0.15)"}`,
            backdropFilter:"blur(12px)",
            color: dark?"rgba(255,255,254,0.75)":"rgba(15,14,23,0.7)",
            boxShadow: dark?"none":"0 4px 20px rgba(124,58,237,0.08)",
            animation:`floatY ${4.5+i*0.6}s ease-in-out infinite`,
          }}>
          {p.text}
        </motion.div>
      ))}

      {/* Center content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center pt-28 pb-20">

        {/* Live badge */}
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:0.55}}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold mb-9"
          style={{
            background: dark?"rgba(124,58,237,0.1)":"rgba(124,58,237,0.07)",
            border:`1px solid ${dark?"rgba(124,58,237,0.28)":"rgba(124,58,237,0.2)"}`,
            color:"#7c3aed",
          }}>
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full opacity-60"
              style={{ background:"#7c3aed", animation:"pulse-dot 1.6s ease-in-out infinite" }} />
            <span className="relative w-2 h-2 rounded-full" style={{ background:"#7c3aed" }} />
          </span>
          50,000+ Jobs Live · Updated Daily
        </motion.div>

        {/* Heading */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y:"100%", opacity:0 }}
            animate={{ y:0, opacity:1 }}
            transition={{ delay:0.18, duration:0.85, ease:[0.22,1,0.36,1] }}
            className="font-bold leading-[1.1] tracking-tight"
            style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:"clamp(2.6rem,6.5vw,5rem)",
              color: dark?"#fffffe":"#0f0e17",
            }}>
            Find Your
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-7">
          <motion.h1
            initial={{ y:"100%", opacity:0 }}
            animate={{ y:0, opacity:1 }}
            transition={{ delay:0.32, duration:0.85, ease:[0.22,1,0.36,1] }}
            className="font-bold leading-[1.1] tracking-tight gradient-text"
            style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:"clamp(2.6rem,6.5vw,5rem)",
            }}>
            Dream Career
          </motion.h1>
        </div>

        <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:0.5,duration:0.65}}
          className="text-base md:text-lg max-w-md mx-auto mb-10 leading-relaxed"
          style={{ color: dark?"rgba(255,255,254,0.47)":"rgba(15,14,23,0.52)" }}>
          Smart job matching connects talented people with world-class companies. Your next opportunity starts here.
        </motion.p>

        {/* Search */}
        <motion.form onSubmit={e=>{e.preventDefault();navigate(`/jobs?q=${encodeURIComponent(q)}`)}}
          initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:0.64,duration:0.65}}
          className="flex flex-col sm:flex-row gap-2 p-2 rounded-2xl max-w-xl mx-auto mb-6"
          style={{
            background: dark?"rgba(255,255,255,0.04)":"#ffffff",
            border:`1px solid ${dark?"rgba(124,58,237,0.2)":"rgba(124,58,237,0.16)"}`,
            boxShadow: dark?"none":"0 8px 40px rgba(124,58,237,0.1)",
          }}>
          <div className="flex items-center gap-3 flex-1 px-4 py-2.5 rounded-xl"
            style={{ background: dark?"rgba(255,255,255,0.04)":"rgba(124,58,237,0.04)" }}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#7c3aed" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
            </svg>
            <input value={q} onChange={e=>setQ(e.target.value)}
              placeholder="Job title, skill, or company..."
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: dark?"#fffffe":"#0f0e17" }} />
          </div>
          <motion.button type="submit"
            whileHover={{ scale:1.03, boxShadow:"0 6px 24px rgba(124,58,237,0.4)" }}
            whileTap={{ scale:0.97 }}
            className="px-7 py-2.5 rounded-xl text-sm font-bold text-white flex-shrink-0"
            style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7)", cursor:"pointer" }}>
            Search →
          </motion.button>
        </motion.form>

        {/* Trending */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.82,duration:0.55}}
          className="flex items-center justify-center flex-wrap gap-2 mb-16">
          <span className="text-xs font-medium mr-1"
            style={{ color: dark?"rgba(255,255,254,0.3)":"rgba(15,14,23,0.38)" }}>Trending:</span>
          {TRENDING.map(t=>(
            <motion.button key={t} whileHover={{ scale:1.05 }}
              onClick={()=>navigate(`/jobs?q=${encodeURIComponent(t)}`)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                border:`1px solid ${dark?"rgba(255,255,255,0.09)":"rgba(124,58,237,0.16)"}`,
                color: dark?"rgba(255,255,254,0.52)":"rgba(124,58,237,0.75)",
                background: dark?"rgba(255,255,255,0.03)":"rgba(124,58,237,0.04)",
                cursor:"pointer",
              }}>
              {t}
            </motion.button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:1,duration:0.55}}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-10 max-w-xl mx-auto"
          style={{ borderTop:`1px solid ${dark?"rgba(255,255,255,0.07)":"rgba(124,58,237,0.1)"}` }}>
          {[["50K+","Active Jobs"],["12K+","Companies"],["2M+","Candidates"],["95%","Success Rate"]].map(([n,l])=>(
            <div key={l} className="text-center">
              <p className="font-bold text-xl mb-0.5 gradient-text">{n}</p>
              <p className="text-xs" style={{ color:dark?"rgba(255,255,254,0.35)":"rgba(15,14,23,0.45)", letterSpacing:"0.03em" }}>{l}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}