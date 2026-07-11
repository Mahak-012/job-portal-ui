import{motion}from"framer-motion"
import ScrollReveal from"./ScrollReveal"
import{useTheme}from"../context/ThemeContext"

const STEPS=[
  {n:"01",icon:"👤",title:"Create Profile",  desc:"Build your professional profile with skills, experience, and portfolio links in minutes."},
  {n:"02",icon:"🔍",title:"Smart Search",    desc:"Our AI matches you with the most relevant jobs based on your skills and preferences."},
  {n:"03",icon:"📝",title:"Apply Instantly", desc:"One-click apply with your saved profile. Real-time application tracking dashboard."},
  {n:"04",icon:"🎉",title:"Get Hired",       desc:"Receive offers from top companies. 95% of our candidates land jobs within 30 days."},
]

export default function HowItWorks(){
  const{dark:T}=useTheme()
  const H=T?"#e8f4f0":"#0a1f1c"
  const S=T?"rgba(232,244,240,0.5)":"rgba(10,31,28,0.55)"

  return(
    <section className="py-24 px-5"
      style={{background:T?"rgba(6,13,18,0.98)":"#e6faf7"}}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-4"
              style={{background:"rgba(13,148,136,0.1)",color:"#0d9488",
                border:"1px solid rgba(13,148,136,0.22)",letterSpacing:"0.1em"}}>
              HOW IT WORKS
            </span>
            <h2 className="font-bold text-3xl md:text-4xl"
              style={{fontFamily:"'Cormorant Garamond',serif",color:H}}>
              4 Steps to Your <span className="gt">Dream Job</span>
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 relative">
          <div className="absolute top-10 left-[14%] right-[14%] h-px hidden md:block"
            style={{background:`linear-gradient(90deg,transparent,rgba(13,148,136,0.3),rgba(245,158,11,0.3),transparent)`}}/>
          {STEPS.map((s,i)=>(
            <ScrollReveal key={s.n} delay={i*0.1}>
              <motion.div whileHover={{y:-5}}
                className="relative text-center p-6 rounded-2xl card">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{background:"linear-gradient(135deg,#0d9488,#f59e0b)",
                    boxShadow:"0 4px 16px rgba(13,148,136,0.4)"}}>{s.n}</div>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mx-auto mt-4 mb-4"
                  style={{background:"rgba(13,148,136,0.1)",border:"1px solid rgba(13,148,136,0.18)"}}>
                  {s.icon}
                </div>
                <h3 className="font-semibold text-sm mb-2" style={{color:H}}>{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{color:S}}>{s.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}