import{useState,useMemo}from"react"
import{useSearchParams}from"react-router-dom"
import{motion}from"framer-motion"
import{JOBS,CATEGORIES}from"../data/jobs.jsx"
import JobCard from"../components/JobCard"
import Footer from"../components/Footer"
import ScrollReveal from"../components/ScrollReveal"
import{useTheme}from"../context/ThemeContext"

export default function Jobs(){
  const{dark:T}=useTheme()
  const[params]=useSearchParams()
  const[search,setSearch]=useState(params.get("q")||"")
  const[category,setCategory]=useState(params.get("category")||"All")
  const[type,setType]=useState("All")

  const filtered=useMemo(()=>
    JOBS.filter(j=>category==="All"||j.category===category)
        .filter(j=>type==="All"||j.type===type)
        .filter(j=>j.title.toLowerCase().includes(search.toLowerCase())||
                   j.company.toLowerCase().includes(search.toLowerCase()))
  ,[search,category,type])

  const H=T?"#e8f4f0":"#0a1f1c"
  const S=T?"rgba(232,244,240,0.45)":"rgba(10,31,28,0.55)"
  const iBg=T?"rgba(255,255,255,0.05)":"#fff"
  const iBorder=T?"rgba(13,148,136,0.22)":"rgba(13,148,136,0.18)"

  return(
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
      transition={{duration:0.45,ease:[0.22,1,0.36,1]}}
      style={{background:T?"#060d12":"#f0f9f7",minHeight:"100vh"}}>

      <div className="relative overflow-hidden text-center"
        style={{paddingTop:108,paddingBottom:48,paddingLeft:20,paddingRight:20,
          background:T
            ?"radial-gradient(ellipse 60% 70% at 50% 0%,rgba(13,148,136,0.16),transparent 65%),#060d12"
            :"radial-gradient(ellipse 60% 70% at 50% 0%,rgba(13,148,136,0.1),transparent 65%),#f0f9f7"}}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55}}>
          <span className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-5"
            style={{background:"rgba(13,148,136,0.1)",color:"#0d9488",
              border:"1px solid rgba(13,148,136,0.22)",letterSpacing:"0.1em"}}>
            FIND JOBS
          </span>
          <h1 className="font-bold mb-3"
            style={{fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(2rem,5vw,3.4rem)",color:H}}>
            Your Next <span className="gt">Opportunity</span>
          </h1>
          <p className="text-sm" style={{color:S}}>
            {filtered.length} positions · updated daily
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-24">
        <ScrollReveal y={20}>
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl"
              style={{background:iBg,border:`1.5px solid ${iBorder}`}}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#0d9488" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
              </svg>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search jobs, companies, skills..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{color:H,fontFamily:"'DM Sans',sans-serif"}}/>
              {search&&(
                <button onClick={()=>setSearch("")}
                  style={{background:"none",border:"none",color:"rgba(13,148,136,0.6)",
                    cursor:"pointer",fontSize:14}}>✕</button>
              )}
            </div>
            {[
              {val:category,set:setCategory,opts:["All",...CATEGORIES.map(c=>c.name)],ph:"Category"},
              {val:type,    set:setType,    opts:["All","Full-time","Contract","Part-time"],ph:"Job Type"},
            ].map(f=>(
              <select key={f.ph} value={f.val} onChange={e=>f.set(e.target.value)}
                className="px-4 py-3 rounded-xl text-sm outline-none cursor-pointer"
                style={{background:iBg,border:`1.5px solid ${iBorder}`,color:H,
                  minWidth:130,fontFamily:"'DM Sans',sans-serif"}}>
                <option value="All" style={{background:T?"#0d1a1c":"#fff"}}>{f.ph}</option>
                {f.opts.slice(1).map(o=>(
                  <option key={o} value={o} style={{background:T?"#0d1a1c":"#fff"}}>{o}</option>
                ))}
              </select>
            ))}
          </div>
          <p className="text-xs mb-8" style={{color:S}}>
            Showing <span style={{color:"#0d9488",fontWeight:600}}>{filtered.length}</span> results
            {search&&<> for "<span style={{color:"#0d9488"}}>{search}</span>"</>}
          </p>
        </ScrollReveal>

        {filtered.length===0?(
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-bold text-lg mb-2" style={{color:H}}>No jobs found</p>
            <p className="text-sm mb-6" style={{color:S}}>Try different filters</p>
            <button onClick={()=>{setSearch("");setCategory("All");setType("All")}}
              className="btn-teal px-6 py-2.5 text-sm"><span>Clear Filters</span></button>
          </div>
        ):(
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((job,i)=><JobCard key={job.id} job={job} index={i}/>)}
          </div>
        )}
      </div>
      <Footer/>
    </motion.div>
  )
}