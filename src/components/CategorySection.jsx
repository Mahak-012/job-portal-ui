import{useNavigate}from"react-router-dom"
import{motion}from"framer-motion"
import ScrollReveal from"./ScrollReveal"
import{useTheme}from"../context/ThemeContext"
import{CATEGORIES}from"../data/jobs.jsx"

export default function CategorySection(){
  const{dark:T}=useTheme()
  const navigate=useNavigate()
  const H=T?"#e8f4f0":"#0a1f1c"

  return(
    <section className="py-24 px-5"
      style={{background:T?"rgba(6,13,18,0.98)":"#e6faf7"}}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-4"
              style={{background:"rgba(13,148,136,0.1)",color:"#0d9488",
                border:"1px solid rgba(13,148,136,0.22)",letterSpacing:"0.1em"}}>
              EXPLORE FIELDS
            </span>
            <h2 className="font-bold text-3xl md:text-4xl"
              style={{fontFamily:"'Cormorant Garamond',serif",color:H}}>
              Browse by <span className="gt">Category</span>
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map((cat,i)=>(
            <ScrollReveal key={cat.name} delay={i*0.06}>
              <motion.button whileHover={{y:-5,scale:1.02}}
                onClick={()=>navigate(`/jobs?category=${cat.name}`)}
                className="w-full p-5 rounded-2xl flex flex-col items-center text-center gap-2.5 group card transition-all duration-300"
                style={{cursor:"pointer"}}
                onMouseEnter={e=>{
                  e.currentTarget.style.borderColor=`${cat.color}50`
                  e.currentTarget.style.boxShadow=`0 10px 36px ${cat.color}18`
                }}
                onMouseLeave={e=>{
                  e.currentTarget.style.borderColor=T?"rgba(13,148,136,0.15)":"rgba(13,148,136,0.12)"
                  e.currentTarget.style.boxShadow=T?"none":"0 4px 24px rgba(13,148,136,0.07)"
                }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{background:`${cat.color}18`,border:`1px solid ${cat.color}30`}}>
                  {cat.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5" style={{color:H}}>{cat.name}</p>
                  <p className="text-xs" style={{color:`${cat.color}cc`}}>{cat.count.toLocaleString()} jobs</p>
                </div>
              </motion.button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}