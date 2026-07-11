import{motion}from"framer-motion"
import ScrollReveal from"./ScrollReveal"
import{useTheme}from"../context/ThemeContext"

const R=[
  {name:"Sarah Chen",     role:"Frontend Dev @ Google",   av:"👩‍💻",text:"JobPortal matched me with Google in just 3 weeks! The AI-powered matching is genuinely incredible.",stars:5},
  {name:"Marcus Thompson",role:"Product Manager @ Airbnb", av:"👨‍💼",text:"Every single application I sent got a response. The listing quality here is on another level.",stars:5},
  {name:"Priya Sharma",   role:"Data Scientist @ Netflix", av:"👩‍🔬",text:"Clean UI, powerful filters, and got hired in 2 weeks. This is how job search should work.",stars:5},
]

export default function Testimonials(){
  const{dark:T}=useTheme()
  const H=T?"#e8f4f0":"#0a1f1c"
  const S=T?"rgba(232,244,240,0.6)":"rgba(10,31,28,0.62)"

  return(
    <section className="py-24 px-5" style={{background:T?"#060d12":"#f0f9f7"}}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-4"
              style={{background:"rgba(13,148,136,0.1)",color:"#0d9488",
                border:"1px solid rgba(13,148,136,0.22)",letterSpacing:"0.1em"}}>
              SUCCESS STORIES
            </span>
            <h2 className="font-bold text-3xl md:text-4xl"
              style={{fontFamily:"'Cormorant Garamond',serif",color:H}}>
              Real People, <span className="gt">Real Results</span>
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {R.map((r,i)=>(
            <ScrollReveal key={r.name} delay={i*0.1}>
              <motion.div whileHover={{y:-5}}
                className="p-6 rounded-2xl relative group overflow-hidden card">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{background:"radial-gradient(circle at 50% 0%,rgba(13,148,136,0.06),transparent 70%)"}}/>
                <div className="flex mb-3">
                  {[...Array(r.stars)].map((_,j)=>(
                    <span key={j} style={{color:"#f59e0b",fontSize:12}}>★</span>
                  ))}
                </div>
                <div className="text-4xl leading-none mb-3 relative z-10"
                  style={{color:"rgba(13,148,136,0.2)",fontFamily:"Georgia,serif"}}>"</div>
                <p className="text-sm leading-relaxed mb-5 italic relative z-10" style={{color:S}}>
                  {r.text}
                </p>
                <div className="flex items-center gap-3 pt-4 relative z-10"
                  style={{borderTop:`1px solid ${T?"rgba(13,148,136,0.1)":"rgba(13,148,136,0.09)"}`}}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                    style={{background:"rgba(13,148,136,0.1)",border:"1px solid rgba(13,148,136,0.2)"}}>
                    {r.av}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{color:H}}>{r.name}</p>
                    <p className="text-xs" style={{color:"#0d9488"}}>{r.role}</p>
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