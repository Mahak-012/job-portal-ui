import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import ScrollReveal from "./ScrollReveal"
import { useTheme } from "../context/ThemeContext"

function CountUp({ end, suffix="" }) {
  const [n, setN]   = useState(0)
  const ref   = useRef(null)
  const done  = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if(e.isIntersecting && !done.current) {
        done.current = true
        let cur = 0; const step = end/55
        const t = setInterval(()=>{ cur+=step; if(cur>=end){setN(end);clearInterval(t)}else setN(Math.floor(cur)) }, 18)
      }
    },{ threshold:0.5 })
    if(ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  },[end])
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>
}

const DATA = [
  { icon:"💼", n:50000, s:"+", label:"Jobs Posted",    sub:"Updated every day"    },
  { icon:"🏢", n:12000, s:"+", label:"Companies",      sub:"Startups to F500"     },
  { icon:"👤", n:2000,  s:"M+",label:"Candidates",     sub:"Across 50+ countries" },
  { icon:"✅", n:95,    s:"%", label:"Placement Rate", sub:"Land jobs in 30 days" },
]

export default function Stats() {
  const { dark } = useTheme()
  return (
    <section className="py-20 px-5"
      style={{ background: dark?"#0f0e17":"#faf9f6",
        borderTop:`1px solid ${dark?"rgba(255,255,255,0.05)":"rgba(124,58,237,0.08)"}` }}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {DATA.map((d,i)=>(
          <ScrollReveal key={d.label} delay={i*0.08}>
            <motion.div whileHover={{ y:-3 }}
              className="p-6 rounded-2xl text-center"
              style={{
                background: dark?"rgba(255,255,255,0.04)":"#ffffff",
                border:`1px solid ${dark?"rgba(255,255,255,0.07)":"rgba(124,58,237,0.1)"}`,
                boxShadow: dark?"none":"0 2px 16px rgba(124,58,237,0.06)",
              }}>
              <div className="text-2xl mb-3">{d.icon}</div>
              <p className="font-bold text-2xl mb-0.5 gradient-text">
                <CountUp end={d.n} suffix={d.s} />
              </p>
              <p className="font-semibold text-sm mb-0.5"
                style={{ color: dark?"#c4b5fd":"#6d28d9" }}>{d.label}</p>
              <p className="text-xs" style={{ color:dark?"rgba(255,255,254,0.32)":"rgba(15,14,23,0.42)" }}>
                {d.sub}
              </p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}