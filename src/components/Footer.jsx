import{Link}from"react-router-dom"
import{motion}from"framer-motion"
import{useTheme}from"../context/ThemeContext"

const COLS=[
  {title:"Job Seekers",links:[["Find Jobs","/jobs"],["Companies","/companies"],["Profile","/profile"],["Saved Jobs","/profile"]]},
  {title:"Employers",  links:[["Post a Job","/jobs"],["Find Talent","/companies"],["Pricing","/"],["Dashboard","/"]]},
  {title:"Company",    links:[["About","/"],["Blog","/"],["Careers","/jobs"],["Contact","/"]]},
]

export default function Footer(){
  const{dark:T}=useTheme()
  const border=T?"rgba(13,148,136,0.12)":"rgba(13,148,136,0.12)"
  const textMuted=T?"rgba(232,244,240,0.35)":"rgba(10,31,28,0.45)"
  const linkColor=T?"rgba(232,244,240,0.45)":"rgba(10,31,28,0.55)"
  const H=T?"#e8f4f0":"#0a1f1c"

  return(
    <footer style={{background:T?"#03080b":"#d0f0ea",borderTop:`1px solid ${border}`}}>
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                style={{background:"linear-gradient(135deg,#0d9488,#f59e0b)"}}>J</div>
              <span className="font-bold" style={{fontFamily:"'Cormorant Garamond',serif",color:H}}>
                Job<span className="gt">Portal</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-5" style={{color:textMuted,maxWidth:200}}>
              Connecting talented people with world-class companies. Your career growth starts here.
            </p>
            <div className="flex gap-2">
              {["𝕏","in","ig","▶"].map(s=>(
                <motion.button key={s} whileHover={{scale:1.12,y:-1}}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                  style={{border:`1px solid ${T?"rgba(13,148,136,0.22)":"rgba(13,148,136,0.2)"}`,
                    color:T?"rgba(232,244,240,0.45)":"rgba(13,148,136,0.7)",
                    background:"rgba(13,148,136,0.07)",cursor:"pointer"}}>
                  {s}
                </motion.button>
              ))}
            </div>
          </div>
          {COLS.map(col=>(
            <div key={col.title}>
              <p className="text-xs font-bold mb-4 tracking-widest" style={{color:"#0d9488"}}>
                {col.title.toUpperCase()}
              </p>
              <ul className="space-y-2.5">
                {col.links.map(([label,to])=>(
                  <li key={label}>
                    <Link to={to} style={{color:linkColor,textDecoration:"none",fontSize:12,
                      display:"inline-block",transition:"all 0.2s"}}
                      onMouseEnter={e=>e.currentTarget.style.color="#0d9488"}
                      onMouseLeave={e=>e.currentTarget.style.color=linkColor}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-7 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{borderTop:`1px solid ${border}`}}>
          <p className="text-xs" style={{color:textMuted}}>© 2026 JobPortal. All rights reserved.</p>
          <p className="text-xs" style={{color:textMuted}}>
            Made with <span style={{color:"#f59e0b"}}>♥</span> by{" "}
            <span className="font-semibold" style={{color:"#0d9488"}}>Mahak</span>
          </p>
        </div>
      </div>
    </footer>
  )
}