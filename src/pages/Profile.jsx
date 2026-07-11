import{motion}from"framer-motion"
import{useState}from"react"
import{JOBS}from"../data/jobs.jsx"
import Footer from"../components/Footer"
import ScrollReveal from"../components/ScrollReveal"
import{useTheme}from"../context/ThemeContext"
import JobCard from"../components/JobCard"

const SAVED=JOBS.filter((_,i)=>i<4)
const APPLIED=JOBS.filter((_,i)=>i>=4&&i<7)

export default function Profile(){
  const{dark:T}=useTheme()
  const[tab,setTab]=useState("saved")
  const H=T?"#e8f4f0":"#0a1f1c"
  const S=T?"rgba(232,244,240,0.45)":"rgba(10,31,28,0.5)"
  const cardBg=T?"rgba(255,255,255,0.04)":"#fff"
  const border=T?"rgba(13,148,136,0.15)":"rgba(13,148,136,0.12)"

  const SKILLS=["React.js","JavaScript","Tailwind CSS","Next.js","Figma","SEO","UI/UX","TypeScript"]

  return(
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
      transition={{duration:0.45,ease:[0.22,1,0.36,1]}}
      style={{background:T?"#060d12":"#f0f9f7",minHeight:"100vh"}}>

      <div className="max-w-5xl mx-auto px-5 md:px-10 pt-28 pb-24">

        {/* Profile Header Card */}
        <ScrollReveal>
          <div className="p-8 rounded-2xl mb-6 relative overflow-hidden"
            style={{background:cardBg,border:`1px solid ${border}`}}>
            <div className="absolute top-0 left-0 right-0 h-0.5"
              style={{background:"linear-gradient(90deg,#0d9488,#f59e0b,transparent)"}}/>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                  style={{background:"linear-gradient(135deg,#0d9488,#f59e0b)"}}>
                  👩‍💻
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  style={{background:"#060d12",borderColor:T?"#060d12":"#f0f9f7"}}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{background:"#10b981"}}/>
                </div>
              </div>

              <div className="flex-1">
                <h1 className="font-bold text-2xl mb-1"
                  style={{fontFamily:"'Cormorant Garamond',serif",color:H}}>
                  Mahak Abdul Ghani
                </h1>
                <p className="text-sm mb-2" style={{color:"#0d9488"}}>
                  Frontend Developer · UI Designer · SEO Specialist
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full"
                    style={{background:"rgba(16,185,129,0.1)",color:"#10b981",
                      border:"1px solid rgba(16,185,129,0.25)"}}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{background:"#10b981"}}/>
                    Open to Work
                  </span>
                  <span className="text-xs" style={{color:S}}>📍 Lahore, Pakistan</span>
                  <span className="text-xs" style={{color:S}}>🎓 Virtual University</span>
                </div>
              </div>

              <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                className="btn-teal px-5 py-2.5 text-sm flex-shrink-0">
                <span>Edit Profile</span>
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[["15","Applications"],["3","Interviews"],["1","Offers"]].map(([n,l])=>(
                <div key={l} className="text-center p-4 rounded-xl"
                  style={{background:T?"rgba(13,148,136,0.07)":"rgba(13,148,136,0.06)"}}>
                  <p className="font-bold text-2xl gt mb-0.5"
                    style={{fontFamily:"'Cormorant Garamond',serif"}}>{n}</p>
                  <p className="text-xs" style={{color:S}}>{l}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <p className="text-xs font-bold tracking-widest mb-3" style={{color:"#0d9488"}}>SKILLS</p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map(sk=>(
                  <span key={sk} className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{background:T?"rgba(13,148,136,0.1)":"rgba(13,148,136,0.07)",
                      color:T?"#5eead4":"#0f766e",border:`1px solid ${T?"rgba(13,148,136,0.2)":"rgba(13,148,136,0.15)"}`}}>
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl mb-6"
          style={{background:T?"rgba(255,255,255,0.04)":"rgba(13,148,136,0.06)",width:"fit-content"}}>
          {[["saved","Saved Jobs"],["applied","Applied"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)}
              className="px-5 py-2.5 rounded-lg text-xs font-semibold transition-all"
              style={{background:tab===k?"linear-gradient(135deg,#0d9488,#14b8a6)":"transparent",
                color:tab===k?"#fff":S,border:"none",cursor:"pointer"}}>
              {l}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(tab==="saved"?SAVED:APPLIED).map((job,i)=>(
            <JobCard key={job.id} job={job} index={i}/>
          ))}
        </div>
      </div>
      <Footer/>
    </motion.div>
  )
}