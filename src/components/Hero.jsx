import{useState}from"react"
import{useNavigate}from"react-router-dom"
import{motion}from"framer-motion"
import{useTheme}from"../context/ThemeContext"

const TRENDING=["React Developer","UI/UX Designer","Data Scientist","DevOps Engineer","Product Manager"]
const PILLS=[
  {text:"💼 $140k · Remote",    top:"20%",left:"2%", delay:0.3},
  {text:"🎨 UI Designer · NYC", top:"34%",right:"2%",delay:0.6},
  {text:"📊 Data Lead · $130k", top:"62%",left:"2%", delay:0.9},
  {text:"🚀 PM · San Francisco",top:"73%",right:"2%",delay:1.2},
]

export default function Hero(){
  const{dark:T}=useTheme()
  const[q,setQ]=useState("")
  const navigate=useNavigate()

  const bg=T
    ?"radial-gradient(ellipse 90% 60% at 50% -5%,rgba(13,148,136,0.2) 0%,transparent 65%),#060d12"
    :"radial-gradient(ellipse 90% 60% at 50% -5%,rgba(13,148,136,0.12) 0%,transparent 65%),#f0f9f7"
  const H=T?"#e8f4f0":"#0a1f1c"
  const S=T?"rgba(232,244,240,0.5)":"rgba(10,31,28,0.55)"

  return(
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{background:bg}}>

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:`linear-gradient(${T?"rgba(13,148,136,0.05)":"rgba(13,148,136,0.06)"} 1px,transparent 1px),
                         linear-gradient(90deg,${T?"rgba(13,148,136,0.05)":"rgba(13,148,136,0.06)"} 1px,transparent 1px)`,
        backgroundSize:"52px 52px"}}/>

      {/* Glow orbs */}
      <div className="absolute pointer-events-none"
        style={{top:"-10%",left:"50%",transform:"translateX(-50%)",
          width:700,height:400,borderRadius:"50%",
          background:"radial-gradient(circle,rgba(13,148,136,0.15) 0%,transparent 70%)",filter:"blur(80px)"}}/>
      <div className="absolute pointer-events-none"
        style={{bottom:"10%",right:"5%",width:300,height:300,borderRadius:"50%",
          background:"radial-gradient(circle,rgba(245,158,11,0.1) 0%,transparent 70%)",filter:"blur(60px)"}}/>

      {/* Floating pills */}
      {PILLS.map((p,i)=>(
        <motion.div key={i}
          initial={{opacity:0,x:p.left?-20:20}} animate={{opacity:1,x:0}}
          transition={{delay:p.delay+0.8,duration:0.7}}
          className="absolute hidden xl:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium float"
          style={{top:p.top,left:p.left,right:p.right,animationDelay:`${i*0.5}s`,
            background:T?"rgba(13,148,136,0.1)":"rgba(255,255,255,0.9)",
            border:`1px solid ${T?"rgba(13,148,136,0.25)":"rgba(13,148,136,0.2)"}`,
            backdropFilter:"blur(12px)",color:T?"rgba(232,244,240,0.8)":"rgba(10,31,28,0.75)",
            boxShadow:T?"none":"0 4px 20px rgba(13,148,136,0.1)"}}>
          {p.text}
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center pt-28 pb-20">

        {/* Badge */}
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold mb-8"
          style={{background:T?"rgba(13,148,136,0.1)":"rgba(13,148,136,0.08)",
            border:`1px solid ${T?"rgba(13,148,136,0.3)":"rgba(13,148,136,0.22)"}`,color:"#0d9488"}}>
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full pulse-dot" style={{background:"#0d9488"}}/>
            <span className="relative w-2 h-2 rounded-full" style={{background:"#0d9488"}}/>
          </span>
          50,000+ Jobs Live · Updated Daily
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-1">
          <motion.h1 initial={{y:"100%",opacity:0}} animate={{y:0,opacity:1}}
            transition={{delay:0.2,duration:0.85,ease:[0.22,1,0.36,1]}}
            className="font-bold leading-tight"
            style={{fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(2.6rem,7vw,5rem)",color:H}}>
            Discover Your
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1 initial={{y:"100%",opacity:0}} animate={{y:0,opacity:1}}
            transition={{delay:0.34,duration:0.85,ease:[0.22,1,0.36,1]}}
            className="font-bold leading-tight gt"
            style={{fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(2.6rem,7vw,5rem)"}}>
            Next Career Move
          </motion.h1>
        </div>

        <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}}
          transition={{delay:0.5,duration:0.65}}
          className="text-base md:text-lg max-w-md mx-auto mb-10 leading-relaxed" style={{color:S}}>
          AI-powered job matching connects you with world-class companies. Your dream career starts here.
        </motion.p>

        {/* Search */}
        <motion.form onSubmit={e=>{e.preventDefault();navigate(`/jobs?q=${encodeURIComponent(q)}`)}}
          initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:0.64,duration:0.65}}
          className="flex flex-col sm:flex-row gap-2 p-2 rounded-2xl max-w-xl mx-auto mb-6"
          style={{background:T?"rgba(13,148,136,0.06)":"#fff",
            border:`1px solid ${T?"rgba(13,148,136,0.22)":"rgba(13,148,136,0.18)"}`,
            boxShadow:T?"0 8px 40px rgba(0,0,0,0.3)":"0 8px 40px rgba(13,148,136,0.12)"}}>
          <div className="flex items-center gap-3 flex-1 px-4 py-2.5 rounded-xl"
            style={{background:T?"rgba(255,255,255,0.04)":"rgba(13,148,136,0.04)"}}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#0d9488" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
            </svg>
            <input value={q} onChange={e=>setQ(e.target.value)}
              placeholder="Job title, skill, or company..."
              className="flex-1 bg-transparent outline-none text-sm"
              style={{color:H,fontFamily:"'DM Sans',sans-serif"}}/>
          </div>
          <motion.button type="submit"
            whileHover={{scale:1.03}} whileTap={{scale:0.97}}
            className="btn-teal px-7 py-2.5 text-sm flex-shrink-0">
            <span>Search →</span>
          </motion.button>
        </motion.form>

        {/* Trending */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.82,duration:0.55}}
          className="flex items-center justify-center flex-wrap gap-2 mb-16">
          <span className="text-xs font-medium mr-1" style={{color:S}}>Trending:</span>
          {TRENDING.map(t=>(
            <motion.button key={t} whileHover={{scale:1.06}}
              onClick={()=>navigate(`/jobs?q=${encodeURIComponent(t)}`)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{border:`1px solid ${T?"rgba(13,148,136,0.2)":"rgba(13,148,136,0.18)"}`,
                color:T?"rgba(232,244,240,0.6)":"rgba(13,148,136,0.85)",
                background:T?"rgba(13,148,136,0.06)":"rgba(13,148,136,0.05)",cursor:"pointer"}}>
              {t}
            </motion.button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}}
          transition={{delay:1,duration:0.55}}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10"
          style={{borderTop:`1px solid ${T?"rgba(13,148,136,0.15)":"rgba(13,148,136,0.12)"}`}}>
          {[["50K+","Active Jobs"],["12K+","Companies"],["2M+","Candidates"],["95%","Success Rate"]].map(([n,l])=>(
            <div key={l} className="text-center">
              <p className="font-bold text-xl mb-0.5 gt">{n}</p>
              <p className="text-xs" style={{color:S,letterSpacing:"0.03em"}}>{l}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}