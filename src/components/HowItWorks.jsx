import { motion } from "framer-motion"
import ScrollReveal from "./ScrollReveal"
import { useTheme } from "../context/ThemeContext"

const STEPS = [
  { n:"01", icon:"👤", title:"Create Profile",  desc:"Build your profile in minutes — add skills, portfolio, and experience links." },
  { n:"02", icon:"🔍", title:"Search & Filter", desc:"Explore 50K+ jobs filtered by role, location, salary, and more." },
  { n:"03", icon:"📝", title:"Apply Easily",    desc:"One-click apply with your saved profile. Track all applications live." },
  { n:"04", icon:"🎉", title:"Get Hired",        desc:"Receive offers, negotiate your salary and start your dream career." },
]

export default function HowItWorks() {
  const { dark } = useTheme()
  return (
    <section className="py-24 px-5"
      style={{ background: dark?"rgba(15,14,23,0.98)":"#f4f1fe" }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-4"
              style={{ background:"rgba(124,58,237,0.1)", color:"#7c3aed",
                border:"1px solid rgba(124,58,237,0.2)", letterSpacing:"0.1em" }}>
              HOW IT WORKS
            </span>
            <h2 className="font-bold text-3xl md:text-4xl"
              style={{ fontFamily:"'Playfair Display',serif", color:dark?"#fffffe":"#0f0e17" }}>
              4 Steps to Your <span className="gradient-text">Dream Job</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 relative">
          <div className="absolute top-10 left-[14%] right-[14%] h-px hidden md:block"
            style={{ background:`linear-gradient(90deg,transparent,${dark?"rgba(124,58,237,0.3)":"rgba(124,58,237,0.25)"},transparent)` }} />
          {STEPS.map((s,i)=>(
            <ScrollReveal key={s.n} delay={i*0.1}>
              <motion.div whileHover={{ y:-4 }}
                className="relative text-center p-6 rounded-2xl"
                style={{
                  background: dark?"rgba(255,255,255,0.04)":"#ffffff",
                  border:`1px solid ${dark?"rgba(255,255,255,0.07)":"rgba(124,58,237,0.1)"}`,
                  boxShadow: dark?"none":"0 2px 16px rgba(124,58,237,0.06)",
                }}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7)",
                    boxShadow:"0 4px 16px rgba(124,58,237,0.4)" }}>
                  {s.n}
                </div>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mx-auto mt-3 mb-4"
                  style={{ background:"rgba(124,58,237,0.08)", border:"1px solid rgba(124,58,237,0.15)" }}>
                  {s.icon}
                </div>
                <h3 className="font-semibold text-sm mb-2" style={{ color:dark?"#fffffe":"#0f0e17" }}>
                  {s.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color:dark?"rgba(255,255,254,0.4)":"rgba(15,14,23,0.5)" }}>
                  {s.desc}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}