import{useParams,Link,useNavigate}from"react-router-dom"
import{useState}from"react"
import{motion}from"framer-motion"
import{JOBS,LOGO}from"../data/jobs.jsx"
import Footer from"../components/Footer"
import{useTheme}from"../context/ThemeContext"
import ScrollReveal from"../components/ScrollReveal"

export default function JobDetail(){
  const{dark:T}=useTheme()
  const{id}=useParams()
  const nav=useNavigate()
  const job=JOBS.find(j=>j.id===+id)
  const[applied,setApplied]=useState(false)
  const[tab,setTab]=useState("desc")

  const H=T?"#e8f4f0":"#0a1f1c"
  const S=T?"rgba(232,244,240,0.5)":"rgba(10,31,28,0.55)"
  const cardBg=T?"rgba(255,255,255,0.04)":"#fff"
  const border=T?"rgba(13,148,136,0.15)":"rgba(13,148,136,0.12)"

  if(!job)return(
    <div className="pt-32 text-center min-h-screen"
      style={{background:T?"#060d12":"#f0f9f7"}}>
      <p className="text-lg mb-4" style={{color:H}}>Job not found</p>
      <Link to="/jobs" style={{color:"#0d9488"}}>← Back to Jobs</Link>
    </div>
  )

  const L=LOGO[job.company]
  const related=JOBS.filter(j=>j.id!==job.id&&j.category===job.category).slice(0,3)

  return(
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
      transition={{duration:0.45,ease:[0.22,1,0.36,1]}}
      style={{background:T?"#060d12":"#f0f9f7",minHeight:"100vh"}}>
      <div className="max-w-5xl mx-auto px-5 md:px-10 pt-28 pb-24">

        <Link to="/jobs" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
          style={{color:S,textDecoration:"none"}}
          onMouseEnter={e=>e.currentTarget.style.color="#0d9488"}
          onMouseLeave={e=>e.currentTarget.style.color=S}>
          ← Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="p-8 rounded-2xl mb-6"
                style={{background:cardBg,border:`1px solid ${border}`}}>

                {/* Top bar */}
                {job.featured&&(
                  <div className="h-0.5 w-full -mt-8 mb-8 -mx-8 px-0 rounded-t-2xl"
                    style={{background:"linear-gradient(90deg,#0d9488,#f59e0b,transparent)",width:"calc(100% + 64px)"}}/>
                )}

                <div className="flex items-start gap-5 mb-6">
                  <div className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center"
                    style={{background:T?"rgba(13,148,136,0.1)":"rgba(13,148,136,0.07)",
                      border:`1px solid ${T?"rgba(13,148,136,0.2)":"rgba(13,148,136,0.15)"}`}}>
                    {L?<L dark={T}/>:(
                      <span className="font-bold text-2xl gt">{job.company.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h1 className="font-bold text-2xl md:text-3xl mb-1"
                      style={{fontFamily:"'Cormorant Garamond',serif",color:H}}>
                      {job.title}
                    </h1>
                    <p className="font-semibold mb-2" style={{color:"#0d9488"}}>{job.company}</p>
                    <div className="flex flex-wrap gap-3 text-sm" style={{color:S}}>
                      <span>📍 {job.location}</span>
                      <span>🕐 {job.posted}</span>
                      <span>👥 {job.applicants} applicants</span>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map(t=>(
                    <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{background:T?"rgba(13,148,136,0.1)":"rgba(13,148,136,0.07)",
                        color:T?"#5eead4":"#0f766e",border:`1px solid ${T?"rgba(13,148,136,0.2)":"rgba(13,148,136,0.15)"}`}}>
                      {t}
                    </span>
                  ))}
                  {job.match&&(
                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{background:"rgba(245,158,11,0.12)",color:"#d97706",
                        border:"1px solid rgba(245,158,11,0.25)"}}>
                      {job.match}% Match
                    </span>
                  )}
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-6 p-1 rounded-xl"
                  style={{background:T?"rgba(255,255,255,0.04)":"rgba(13,148,136,0.06)"}}>
                  {[["desc","Description"],["care","Benefits"],["ship","Requirements"]].map(([k,l])=>(
                    <button key={k} onClick={()=>setTab(k)}
                      className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
                      style={{background:tab===k?"linear-gradient(135deg,#0d9488,#14b8a6)":"transparent",
                        color:tab===k?"#fff":S,border:"none",cursor:"pointer"}}>
                      {l}
                    </button>
                  ))}
                </div>

                {tab==="desc"&&(
                  <div>
                    <p className="text-sm leading-relaxed mb-4" style={{color:S}}>
                      We are looking for a talented <strong style={{color:H}}>{job.title}</strong> to join our growing team at <strong style={{color:"#0d9488"}}>{job.company}</strong>. This is an exciting opportunity to work on cutting-edge projects with a world-class team in a fast-paced, innovative environment.
                    </p>
                    <p className="text-sm leading-relaxed" style={{color:S}}>
                      You will collaborate with cross-functional teams, drive technical innovation, and help shape the future of our product. We value creativity, ownership, and a passion for excellence.
                    </p>
                  </div>
                )}
                {tab==="ship"&&(
                  <ul className="space-y-2">
                    {["3+ years of relevant experience",...job.tags.map(t=>`Proficiency in ${t}`),"Strong problem-solving skills","Excellent communication","Team player with growth mindset"].map(r=>(
                      <li key={r} className="flex items-start gap-2 text-sm" style={{color:S}}>
                        <span className="mt-0.5 flex-shrink-0" style={{color:"#0d9488"}}>✓</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
                {tab==="care"&&(
                  <ul className="space-y-2">
                    {[`Salary: ${job.salary}`,"Remote-friendly culture","Health, dental & vision","$2,000 annual learning budget","401k with company match","Flexible PTO policy"].map(o=>(
                      <li key={o} className="flex items-start gap-2 text-sm" style={{color:S}}>
                        <span className="flex-shrink-0" style={{color:"#f59e0b"}}>🎁</span>
                        {o}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ScrollReveal>

            {/* Related */}
            {related.length>0&&(
              <div>
                <h3 className="font-bold text-lg mb-4"
                  style={{fontFamily:"'Cormorant Garamond',serif",color:H}}>
                  Similar Jobs
                </h3>
                <div className="grid gap-4">
                  {related.map(j=>{
                    const RL=LOGO[j.company]
                    return(
                      <motion.div key={j.id} whileHover={{x:4}}
                        onClick={()=>nav(`/jobs/${j.id}`)}
                        className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all"
                        style={{background:cardBg,border:`1px solid ${border}`}}>
                        <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                          style={{background:T?"rgba(13,148,136,0.1)":"rgba(13,148,136,0.07)",
                            border:`1px solid ${T?"rgba(13,148,136,0.2)":"rgba(13,148,136,0.15)"}`}}>
                          {RL?<RL dark={T}/>:<span className="font-bold text-sm gt">{j.company.charAt(0)}</span>}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm" style={{color:H}}>{j.title}</p>
                          <p className="text-xs" style={{color:S}}>{j.company} · {j.location}</p>
                        </div>
                        <span className="text-xs font-bold" style={{color:"#0d9488"}}>{j.salary}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}
              transition={{delay:0.2}}
              className="sticky top-24 p-6 rounded-2xl"
              style={{background:cardBg,border:`1px solid ${border}`}}>

              <div className="text-center mb-6 pb-6"
                style={{borderBottom:`1px solid ${T?"rgba(13,148,136,0.1)":"rgba(13,148,136,0.09)"}`}}>
                <p className="text-3xl font-bold mb-0.5 gt"
                  style={{fontFamily:"'Cormorant Garamond',serif"}}>{job.salary}</p>
                <p className="text-xs" style={{color:S}}>per year</p>
              </div>

              {[["Type",job.type],["Location",job.location],["Category",job.category],
                ["Applicants",`${job.applicants} people`],["Posted",job.posted]].map(([l,v])=>(
                <div key={l} className="flex justify-between py-2.5 text-sm"
                  style={{borderBottom:`1px solid ${T?"rgba(13,148,136,0.08)":"rgba(13,148,136,0.07)"}`}}>
                  <span style={{color:S}}>{l}</span>
                  <span className="font-medium" style={{color:H}}>{v}</span>
                </div>
              ))}

              <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                onClick={()=>setApplied(true)}
                className="w-full mt-6 py-4 rounded-xl text-sm font-bold transition-all"
                style={{
                  background:applied?"rgba(13,148,136,0.12)":"linear-gradient(135deg,#0d9488,#14b8a6)",
                  color:applied?"#0d9488":"white",
                  border:applied?"1px solid rgba(13,148,136,0.35)":"none",
                  cursor:"pointer",boxShadow:applied?"none":"0 8px 24px rgba(13,148,136,0.38)"
                }}>
                {applied?"✅ Application Sent!":"Apply Now →"}
              </motion.button>

              <button onClick={()=>nav("/jobs")}
                className="w-full mt-3 py-3 rounded-xl text-sm font-medium"
                style={{border:`1px solid ${T?"rgba(13,148,136,0.2)":"rgba(13,148,136,0.18)"}`,
                  color:"#0d9488",background:"transparent",cursor:"pointer"}}>
                Save for Later 🔖
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer/>
    </motion.div>
  )
}