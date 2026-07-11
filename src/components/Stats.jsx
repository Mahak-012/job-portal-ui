import{useEffect,useRef,useState}from"react"
import{motion}from"framer-motion"
import ScrollReveal from"./ScrollReveal"
import{useTheme}from"../context/ThemeContext"

function CountUp({end,suffix=""}){
  const[n,setN]=useState(0)
  const ref=useRef(null),done=useRef(false)
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!done.current){
        done.current=true;let c=0;const s=end/55
        const t=setInterval(()=>{c+=s;if(c>=end){setN(end);clearInterval(t)}else setN(Math.floor(c))},18)
      }
    },{threshold:0.5})
    if(ref.current)obs.observe(ref.current)
    return()=>obs.disconnect()
  },[end])
  return<span ref={ref}>{n.toLocaleString()}{suffix}</span>
}

const DATA=[
  {icon:"💼",n:50000,s:"+",label:"Jobs Posted",   sub:"Updated daily"},
  {icon:"🏢",n:12000,s:"+",label:"Companies",     sub:"Global employers"},
  {icon:"👤",n:2000, s:"M+",label:"Candidates",   sub:"50+ countries"},
  {icon:"✅",n:95,   s:"%", label:"Success Rate", sub:"Placed in 30 days"},
]

export default function Stats(){
  const{dark:T}=useTheme()
  return(
    <section className="py-20 px-5"
      style={{background:T?"#060d12":"#f0f9f7",
        borderTop:`1px solid ${T?"rgba(13,148,136,0.1)":"rgba(13,148,136,0.1)"}`}}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {DATA.map((d,i)=>(
          <ScrollReveal key={d.label} delay={i*0.08}>
            <motion.div whileHover={{y:-4}}
              className="p-6 rounded-2xl text-center relative overflow-hidden group card">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{background:"radial-gradient(circle at 50% 0%,rgba(13,148,136,0.08),transparent 70%)"}}/>
              <div className="text-2xl mb-3 relative z-10">{d.icon}</div>
              <p className="font-bold text-2xl mb-0.5 gt relative z-10">
                <CountUp end={d.n} suffix={d.s}/>
              </p>
              <p className="font-semibold text-sm mb-0.5 relative z-10"
                style={{color:"#0d9488"}}>{d.label}</p>
              <p className="text-xs relative z-10"
                style={{color:T?"rgba(232,244,240,0.38)":"rgba(10,31,28,0.48)"}}>{d.sub}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}