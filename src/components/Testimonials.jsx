import { motion } from "framer-motion"
import ScrollReveal from "./ScrollReveal"
import { useTheme } from "../context/ThemeContext"

const R = [
  { name:"Sarah Chen",     role:"Frontend Dev @ Google",   av:"👩‍💻", text:"JobPortal helped me land Google in 3 weeks! The smart matching is genuinely incredible.", stars:5 },
  { name:"Marcus Thompson",role:"Product Manager @ Airbnb", av:"👨‍💼", text:"Every application I sent got a response. The quality of listings here is unmatched.", stars:5 },
  { name:"Priya Sharma",   role:"Data Scientist @ Netflix", av:"👩‍🔬", text:"Beautiful design, perfect filters, got hired in 2 weeks. This is how job search should feel.", stars:5 },
]

export default function Testimonials() {
  const { dark } = useTheme()
  return (
    <section className="py-24 px-5" style={{ background:dark?"#0f0e17":"#faf9f6" }}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-4"
              style={{ background:"rgba(124,58,237,0.1)", color:"#7c3aed",
                border:"1px solid rgba(124,58,237,0.2)", letterSpacing:"0.1em" }}>
              SUCCESS STORIES
            </span>
            <h2 className="font-bold text-3xl md:text-4xl"
              style={{ fontFamily:"'Playfair Display',serif", color:dark?"#fffffe":"#0f0e17" }}>
              Real People, <span className="gradient-text">Real Results</span>
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {R.map((r,i)=>(
            <ScrollReveal key={r.name} delay={i*0.1}>
              <motion.div whileHover={{ y:-4 }}
                className="p-6 rounded-2xl relative"
                style={{
                  background: dark?"rgba(255,255,255,0.04)":"#ffffff",
                  border:`1px solid ${dark?"rgba(255,255,255,0.07)":"rgba(124,58,237,0.1)"}`,
                  boxShadow: dark?"none":"0 2px 16px rgba(124,58,237,0.06)",
                }}>
                <div className="flex mb-3">
                  {[...Array(r.stars)].map((_,j)=>(
                    <span key={j} style={{ color:"#f59e0b", fontSize:12 }}>★</span>
                  ))}
                </div>
                <div className="text-4xl leading-none mb-3"
                  style={{ color:"rgba(124,58,237,0.18)", fontFamily:"Georgia,serif" }}>"</div>
                <p className="text-sm leading-relaxed mb-5 italic"
                  style={{ color:dark?"rgba(255,255,254,0.55)":"rgba(15,14,23,0.58)" }}>
                  {r.text}
                </p>
                <div className="flex items-center gap-3 pt-4"
                  style={{ borderTop:`1px solid ${dark?"rgba(255,255,255,0.06)":"rgba(124,58,237,0.08)"}` }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                    style={{ background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.18)" }}>
                    {r.av}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color:dark?"#fffffe":"#0f0e17" }}>{r.name}</p>
                    <p className="text-xs" style={{ color:"#7c3aed" }}>{r.role}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}