import { useState, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import { JOBS, CATEGORIES } from "../data/jobs"
import JobCard from "../components/JobCard"
import Footer from "../components/Footer"
import ScrollReveal from "../components/ScrollReveal"
import { useTheme } from "../context/ThemeContext"

export default function Jobs() {
  const { dark } = useTheme()
  const [params]   = useSearchParams()
  const [search,   setSearch]   = useState(params.get("q")||"")
  const [category, setCategory] = useState(params.get("category")||"All")
  const [type,     setType]     = useState("All")

  const filtered = useMemo(()=>
    JOBS
      .filter(j=>category==="All"||j.category===category)
      .filter(j=>type==="All"||j.type===type)
      .filter(j=>j.title.toLowerCase().includes(search.toLowerCase())||
                 j.company.toLowerCase().includes(search.toLowerCase()))
  ,[search,category,type])

  const inputBg = dark?"rgba(255,255,255,0.04)":"#ffffff"
  const inputBorder = dark?"rgba(124,58,237,0.18)":"rgba(124,58,237,0.16)"
  const inputColor  = dark?"#fffffe":"#0f0e17"

  return (
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
      transition={{duration:0.45, ease:[0.22,1,0.36,1]}}
      style={{ background:dark?"#0f0e17":"#faf9f6", minHeight:"100vh" }}>

      {/* Header */}
      <div className="relative overflow-hidden text-center"
        style={{
          paddingTop:108, paddingBottom:48, paddingLeft:20, paddingRight:20,
          background: dark
            ?"radial-gradient(ellipse 60% 70% at 50% 0%,rgba(124,58,237,0.14),transparent 65%), #0f0e17"
            :"radial-gradient(ellipse 60% 70% at 50% 0%,rgba(124,58,237,0.09),transparent 65%), #faf9f6",
        }}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55}}>
          <span className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-5"
            style={{ background:"rgba(124,58,237,0.1)", color:"#7c3aed",
              border:"1px solid rgba(124,58,237,0.2)", letterSpacing:"0.1em" }}>
            FIND JOBS
          </span>
          <h1 className="font-bold mb-3"
            style={{ fontFamily:"'Playfair Display',serif",
              fontSize:"clamp(2rem,5vw,3.4rem)", color:dark?"#fffffe":"#0f0e17" }}>
            Your Next <span className="gradient-text">Opportunity</span>
          </h1>
          <p className="text-sm" style={{ color:dark?"rgba(255,255,254,0.4)":"rgba(15,14,23,0.5)" }}>
            {filtered.length} positions · updated daily
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-24">

        {/* Filters */}
        <ScrollReveal y={20}>
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl"
              style={{ background:inputBg, border:`1px solid ${inputBorder}` }}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#7c3aed" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
              </svg>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search jobs, companies, skills..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color:inputColor }} />
              {search && (
                <button onClick={()=>setSearch("")}
                  style={{ background:"none", border:"none", color:"rgba(124,58,237,0.55)", cursor:"pointer", fontSize:14 }}>✕</button>
              )}
            </div>

            {[
              { val:category, set:setCategory, opts:["All",...CATEGORIES.map(c=>c.name)], ph:"Category" },
              { val:type,     set:setType,     opts:["All","Full-time","Contract","Part-time"], ph:"Job Type" },
            ].map(f=>(
              <select key={f.ph} value={f.val} onChange={e=>f.set(e.target.value)}
                className="px-4 py-3 rounded-xl text-sm outline-none cursor-pointer"
                style={{ background:inputBg, border:`1px solid ${inputBorder}`, color:inputColor,
                  minWidth:130, fontFamily:"'DM Sans',sans-serif" }}>
                <option value="All" style={{ background:dark?"#17162a":"#fff" }}>{f.ph}</option>
                {f.opts.slice(1).map(o=>(
                  <option key={o} value={o} style={{ background:dark?"#17162a":"#fff" }}>{o}</option>
                ))}
              </select>
            ))}
          </div>
          <p className="text-xs mb-8" style={{ color:dark?"rgba(255,255,254,0.3)":"rgba(15,14,23,0.42)" }}>
            Showing <span style={{ color:"#7c3aed", fontWeight:600 }}>{filtered.length}</span> results
            {search&&<> for "<span style={{ color:"#7c3aed" }}>{search}</span>"</>}
          </p>
        </ScrollReveal>

        {/* Grid */}
        {filtered.length===0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-bold text-lg mb-2" style={{ color:dark?"#fffffe":"#0f0e17" }}>No jobs found</p>
            <p className="text-sm mb-6" style={{ color:dark?"rgba(255,255,254,0.4)":"rgba(15,14,23,0.48)" }}>
              Try different search terms
            </p>
            <button onClick={()=>{setSearch("");setCategory("All");setType("All")}}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7)", cursor:"pointer" }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((job,i)=><JobCard key={job.id} job={job} index={i} />)}
          </div>
        )}
      </div>
      <Footer />
    </motion.div>
  )
}