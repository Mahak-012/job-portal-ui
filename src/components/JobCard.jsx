import{useState}from"react"
import{useNavigate}from"react-router-dom"
import{motion}from"framer-motion"
import{useTheme}from"../context/ThemeContext"
import{LOGO}from"../data/jobs.jsx"

const TYPE={
  "Full-time":{bg:"rgba(13,148,136,0.12)",color:"#0d9488",border:"rgba(13,148,136,0.25)"},
  "Contract": {bg:"rgba(245,158,11,0.12)", color:"#d97706",border:"rgba(245,158,11,0.25)"},
  "Part-time":{bg:"rgba(6,182,212,0.12)",  color:"#0891b2",border:"rgba(6,182,212,0.25)"},
}

function CompLogo({name,dark}){
  const L=LOGO[name]
  return(
    <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center"
      style={{background:dark?"rgba(13,148,136,0.1)":"rgba(13,148,136,0.07)",
        border:`1px solid ${dark?"rgba(13,148,136,0.2)":"rgba(13,148,136,0.15)"}`}}>
      {L?<L dark={dark}/>:(
        <span className="font-bold text-sm"
          style={{background:"linear-gradient(135deg,#0d9488,#f59e0b)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
          {name.charAt(0)}
        </span>
      )}
    </div>
  )
}

export default function JobCard({job,index=0}){
  const{dark:T}=useTheme()
  const[saved,setSaved]=useState(false)
  const navigate=useNavigate()
  const ts=TYPE[job.type]||TYPE["Full-time"]

  const H=T?"#e8f4f0":"#0a1f1c"
  const S=T?"rgba(232,244,240,0.45)":"rgba(10,31,28,0.5)"
  const cardBg=T?"rgba(255,255,255,0.04)":"#ffffff"
  const cardBorder=T?"rgba(13,148,136,0.15)":"rgba(13,148,136,0.12)"
  const tagBg=T?"rgba(13,148,136,0.1)":"rgba(13,148,136,0.07)"
  const tagColor=T?"#5eead4":"#0f766e"
  const tagBorder=T?"rgba(13,148,136,0.2)":"rgba(13,148,136,0.15)"
  const footerBorder=T?"rgba(13,148,136,0.1)":"rgba(13,148,136,0.09)"
  const salaryColor=T?"#2dd4bf":"#0d9488"

  return(
    <motion.article
      initial={{opacity:0,y:24}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true,margin:"-40px"}}
      transition={{delay:index*0.055,duration:0.55,ease:[0.22,1,0.36,1]}}
      whileHover={{y:-5,transition:{duration:0.28}}}
      onClick={()=>navigate(`/jobs/${job.id}`)}
      className="cursor-pointer flex flex-col rounded-2xl overflow-hidden relative group"
      style={{background:cardBg,border:`1px solid ${cardBorder}`,
        boxShadow:T?"0 2px 16px rgba(0,0,0,0.3)":"0 2px 20px rgba(13,148,136,0.07)",
        transition:"box-shadow 0.3s,border-color 0.3s"}}
      onMouseEnter={e=>{
        e.currentTarget.style.borderColor=T?"rgba(13,148,136,0.4)":"rgba(13,148,136,0.3)"
        e.currentTarget.style.boxShadow=T?"0 16px 48px rgba(0,0,0,0.35)":"0 16px 48px rgba(13,148,136,0.14)"
      }}
      onMouseLeave={e=>{
        e.currentTarget.style.borderColor=cardBorder
        e.currentTarget.style.boxShadow=T?"0 2px 16px rgba(0,0,0,0.3)":"0 2px 20px rgba(13,148,136,0.07)"
      }}>

      {/* Featured stripe */}
      {job.featured&&(
        <div className="h-0.5 w-full"
          style={{background:"linear-gradient(90deg,#0d9488,#f59e0b,transparent)"}}/>
      )}

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 rounded-2xl"
        style={{background:`radial-gradient(circle at 50% 0%,${T?"rgba(13,148,136,0.07)":"rgba(13,148,136,0.04)"},transparent 65%)`}}/>

      <div className="p-5 flex flex-col flex-1">

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <CompLogo name={job.company} dark={T}/>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm leading-snug mb-0.5 truncate" style={{color:H}}>
                {job.title}
              </h3>
              <p className="text-xs" style={{color:S}}>{job.company}</p>
            </div>
          </div>
          <motion.button whileTap={{scale:0.82}}
            onClick={e=>{e.stopPropagation();setSaved(s=>!s)}}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-all"
            style={{background:saved?"rgba(13,148,136,0.15)":T?"rgba(255,255,255,0.06)":"rgba(13,148,136,0.06)",
              border:`1px solid ${saved?"rgba(13,148,136,0.35)":T?"rgba(255,255,255,0.1)":"rgba(13,148,136,0.12)"}`,
              color:saved?"#0d9488":S,cursor:"pointer"}}>
            {saved?"♥":"♡"}
          </motion.button>
        </div>

        {/* Badges row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {job.featured&&(
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
              style={{background:"rgba(245,158,11,0.12)",color:"#d97706",
                border:"1px solid rgba(245,158,11,0.25)"}}>
              ⚡ Featured
            </span>
          )}
          {job.match&&(
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
              style={{background:"rgba(13,148,136,0.1)",color:"#0d9488",
                border:"1px solid rgba(13,148,136,0.2)"}}>
              {job.match}% Match
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
          {[`📍 ${job.location}`,`👥 ${job.applicants}`,`🕐 ${job.posted}`].map(m=>(
            <span key={m} className="text-xs" style={{color:S}}>{m}</span>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {job.tags.slice(0,3).map(t=>(
            <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{background:tagBg,color:tagColor,border:`1px solid ${tagBorder}`}}>
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4"
          style={{borderTop:`1px solid ${footerBorder}`}}>
          <div>
            <span className="font-bold text-sm" style={{color:salaryColor}}>{job.salary}</span>
            <span className="text-xs ml-1" style={{color:S}}>/yr</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap"
              style={{background:ts.bg,color:ts.color,border:`1px solid ${ts.border}`}}>
              {job.type}
            </span>
            <motion.button whileHover={{scale:1.06}} whileTap={{scale:0.94}}
              onClick={e=>{e.stopPropagation();navigate(`/jobs/${job.id}`)}}
              className="btn-teal px-3.5 py-1.5 text-xs whitespace-nowrap">
              <span>Apply →</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}