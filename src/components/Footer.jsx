import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"

const COLS = [
  { title:"Job Seekers", links:[["Find Jobs","/jobs"],["Companies","/companies"],["Profile","/profile"],["Saved Jobs","/profile"]] },
  { title:"Employers",   links:[["Post a Job","/jobs"],["Find Talent","/companies"],["Pricing","/"],["Dashboard","/"]] },
  { title:"Company",     links:[["About","/"],["Blog","/"],["Careers","/jobs"],["Contact","/"]] },
]

export default function Footer() {
  const { dark } = useTheme()
  const border = dark?"rgba(255,255,255,0.06)":"rgba(124,58,237,0.1)"

  return (
    <footer style={{ background:dark?"#0a0916":"#ede9fe", borderTop:`1px solid ${border}` }}>
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7)" }}>J</div>
              <span className="font-bold" style={{ color:dark?"#fffffe":"#0f0e17" }}>
                Job<span className="gradient-text">Portal</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-5"
              style={{ color:dark?"rgba(255,255,254,0.32)":"rgba(15,14,23,0.45)", maxWidth:200 }}>
              Connecting talent with opportunity. The smartest way to grow your career.
            </p>
            <div className="flex gap-2">
              {["𝕏","in","ig","▶"].map(s=>(
                <motion.button key={s} whileHover={{ scale:1.1, y:-1 }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                  style={{ border:`1px solid ${dark?"rgba(124,58,237,0.2)":"rgba(124,58,237,0.18)"}`,
                    color:dark?"rgba(255,255,254,0.38)":"rgba(124,58,237,0.6)",
                    background: dark?"rgba(124,58,237,0.07)":"rgba(124,58,237,0.06)",
                    cursor:"pointer" }}>
                  {s}
                </motion.button>
              ))}
            </div>
          </div>

          {COLS.map(col=>(
            <div key={col.title}>
              <p className="text-xs font-bold mb-4 tracking-widest" style={{ color:"#7c3aed" }}>
                {col.title.toUpperCase()}
              </p>
              <ul className="space-y-2.5">
                {col.links.map(([label,to])=>(
                  <li key={label}>
                    <Link to={to}
                      className="text-xs transition-all"
                      style={{ color:dark?"rgba(255,255,254,0.38)":"rgba(15,14,23,0.48)", textDecoration:"none" }}
                      onMouseEnter={e=>e.currentTarget.style.color="#7c3aed"}
                      onMouseLeave={e=>e.currentTarget.style.color=dark?"rgba(255,255,254,0.38)":"rgba(15,14,23,0.48)"}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-7 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop:`1px solid ${border}` }}>
          <p className="text-xs" style={{ color:dark?"rgba(255,255,254,0.22)":"rgba(15,14,23,0.38)" }}>
            © 2026 JobPortal. All rights reserved.
          </p>
          <p className="text-xs" style={{ color:dark?"rgba(255,255,254,0.22)":"rgba(15,14,23,0.38)" }}>
            Made with <span style={{ color:"#7c3aed" }}>♥</span> by{" "}
            <span className="font-semibold" style={{ color:"#7c3aed" }}>Mahak</span>
          </p>
        </div>
      </div>
    </footer>
  )
}