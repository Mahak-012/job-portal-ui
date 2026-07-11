import{useState,useMemo}from"react"
import{motion}from"framer-motion"
import ScrollReveal from"./ScrollReveal"
import{useTheme}from"../context/ThemeContext"
import{JOBS}from"../data/jobs.jsx"
import JobCard from"./JobCard"

const TABS=["All","Featured","Remote","Full-time","Contract"]

export default function JobGrid({title="Latest Opportunities"}){
  const{dark:T}=useTheme()
  const[active,setActive]=useState("All")
  const filtered=useMemo(()=>{
    if(active==="All")return JOBS
    if(active==="Featured")return JOBS.filter(j=>j.featured)
    if(active==="Remote")return JOBS.filter(j=>j.location==="Remote")
    return JOBS.filter(j=>j.type===active)
  },[active])
  const H=T?"#e8f4f0":"#0a1f1c"
  const S=T?"rgba(232,244,240,0.5)":"rgba(10,31,28,0.55)"

  return(
    <section className="py-24 px-5" style={{background:T?"#060d12":"#f0f9f7"}}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">
            <div>
              <p className="text-xs font-bold tracking-widest mb-1" style={{color:"#0d9488"}}>OPPORTUNITIES</p>
              <h2 className="font-bold text-3xl md:text-4xl"
                style={{fontFamily:"'Cormorant Garamond',serif",color:H}}>{title}</h2>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {TABS.map(tab=>(
                <motion.button key={tab} whileTap={{scale:0.94}}
                  onClick={()=>setActive(tab)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                  style={{
                    background:active===tab?"linear-gradient(135deg,#0d9488,#14b8a6)":"transparent",
                    color:active===tab?"#fff":S,
                    border:active===tab?"none":`1px solid ${T?"rgba(13,148,136,0.2)":"rgba(13,148,136,0.18)"}`,
                    boxShadow:active===tab?"0 4px 16px rgba(13,148,136,0.38)":"none",cursor:"pointer"}}>
                  {tab}
                </motion.button>
              ))}
            </div>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((job,i)=><JobCard key={job.id} job={job} index={i}/>)}
        </div>
      </div>
    </section>
  )
}