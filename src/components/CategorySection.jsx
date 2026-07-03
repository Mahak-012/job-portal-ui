import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import ScrollReveal from "./ScrollReveal"
import { useTheme } from "../context/ThemeContext"
import { CATEGORIES } from "../data/jobs"

export default function CategorySection() {
  const { dark } = useTheme()
  const navigate  = useNavigate()

  return (
    <section className="py-24 px-5"
      style={{ background: dark?"rgba(15,14,23,0.98)":"#f4f1fe" }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-4"
              style={{ background:"rgba(124,58,237,0.1)", color:"#7c3aed",
                border:"1px solid rgba(124,58,237,0.2)", letterSpacing:"0.1em" }}>
              EXPLORE FIELDS
            </span>
            <h2 className="font-bold text-3xl md:text-4xl"
              style={{ fontFamily:"'Playfair Display',serif",
                color:dark?"#fffffe":"#0f0e17" }}>
              Browse by <span className="gradient-text">Category</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map((cat,i)=>(
            <ScrollReveal key={cat.name} delay={i*0.06}>
              <motion.button
                whileHover={{ y:-4, scale:1.02 }}
                onClick={()=>navigate(`/jobs?category=${cat.name}`)}
                className="w-full p-5 rounded-2xl flex flex-col items-center text-center gap-2.5 group transition-all duration-300"
                style={{
                  background: dark?"rgba(255,255,255,0.04)":"#ffffff",
                  border:`1px solid ${dark?"rgba(255,255,255,0.07)":"rgba(124,58,237,0.1)"}`,
                  boxShadow: dark?"none":"0 2px 14px rgba(124,58,237,0.06)",
                  cursor:"pointer",
                }}
                onMouseEnter={e=>{
                  e.currentTarget.style.borderColor=dark?"rgba(124,58,237,0.3)":"rgba(124,58,237,0.25)"
                  e.currentTarget.style.boxShadow=`0 8px 32px ${cat.color}1a`
                }}
                onMouseLeave={e=>{
                  e.currentTarget.style.borderColor=dark?"rgba(255,255,255,0.07)":"rgba(124,58,237,0.1)"
                  e.currentTarget.style.boxShadow=dark?"none":"0 2px 14px rgba(124,58,237,0.06)"
                }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background:`${cat.color}18`, border:`1px solid ${cat.color}28` }}>
                  {cat.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5"
                    style={{ color:dark?"#fffffe":"#0f0e17" }}>{cat.name}</p>
                  <p className="text-xs" style={{ color:`${cat.color}bb` }}>
                    {cat.count.toLocaleString()} jobs
                  </p>
                </div>
              </motion.button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}