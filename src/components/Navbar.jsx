import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../context/ThemeContext"

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const [scrolled,  setScrolled]  = useState(false)
  const [isMobile,  setIsMobile]  = useState(window.innerWidth < 1024)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [signIn,    setSignIn]    = useState(false)
  const [loggedIn,  setLoggedIn]  = useState(false)
  const [form,      setForm]      = useState({ email:"", pass:"" })
  const location = useLocation()

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 16)
    const r = () => { setIsMobile(window.innerWidth<1024); if(window.innerWidth>=1024) setMenuOpen(false) }
    window.addEventListener("scroll",s); window.addEventListener("resize",r)
    return () => { window.removeEventListener("scroll",s); window.removeEventListener("resize",r) }
  },[])
  useEffect(() => setMenuOpen(false), [location])

  const NAV = [
    {to:"/",         label:"Home"},
    {to:"/jobs",     label:"Find Jobs"},
    {to:"/companies",label:"Companies"},
    {to:"/profile",  label:"Profile"},
  ]

  const navBg = scrolled
    ? dark ? "rgba(15,14,23,0.96)" : "rgba(250,249,246,0.97)"
    : "transparent"

  const textColor = dark ? "rgba(255,255,254,0.65)" : "rgba(15,14,23,0.6)"
  const activeColor = "#7c3aed"

  const submitSignIn = (e) => {
    e.preventDefault()
    if(form.email && form.pass){ setLoggedIn(true); setSignIn(false) }
  }

  return (
    <>
      <motion.nav
        initial={{ y:-72 }} animate={{ y:0 }}
        transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: navBg,
          backdropFilter: scrolled?"blur(22px)":"none",
          borderBottom: scrolled ? `1px solid ${dark?"rgba(124,58,237,0.12)":"rgba(124,58,237,0.1)"}` : "none",
        }}
      >
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 28px" }}
          className="flex items-center justify-between h-[68px] gap-4">

          {/* Logo */}
          <Link to="/" style={{ textDecoration:"none", flexShrink:0 }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7)" }}>J</div>
              <span className="font-bold text-lg" style={{ color: dark?"#fffffe":"#0f0e17" }}>
                Job<span className="gradient-text">Portal</span>
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          {!isMobile && (
            <div className="flex items-center gap-0.5">
              {NAV.map(({to,label}) => {
                const active = location.pathname === to
                return (
                  <Link key={to} to={to} style={{ textDecoration:"none" }}>
                    <div className="relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer"
                      style={{ color: active ? activeColor : textColor }}
                      onMouseEnter={e => e.currentTarget.style.color=activeColor}
                      onMouseLeave={e => e.currentTarget.style.color = active ? activeColor : textColor}>
                      {active && (
                        <motion.div layoutId="nav-pill"
                          className="absolute inset-0 rounded-xl"
                          style={{ background: dark?"rgba(124,58,237,0.12)":"rgba(124,58,237,0.08)" }}
                          transition={{ type:"spring", stiffness:420, damping:32 }} />
                      )}
                      <span className="relative z-10">{label}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-2.5">

            {/* Theme toggle */}
            <motion.button whileHover={{ scale:1.08 }} whileTap={{ scale:0.92 }}
              onClick={toggle}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
              style={{
                background: dark?"rgba(255,255,255,0.07)":"rgba(124,58,237,0.08)",
                border:`1px solid ${dark?"rgba(255,255,255,0.1)":"rgba(124,58,237,0.14)"}`,
                cursor:"pointer",
              }}>
              <motion.span key={dark?"m":"s"}
                initial={{ rotate:-80,opacity:0 }} animate={{ rotate:0,opacity:1 }}
                transition={{ duration:0.28 }}>
                {dark ? "🌙" : "☀️"}
              </motion.span>
            </motion.button>

            {!isMobile && (
              <>
                {loggedIn ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                    style={{ background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.2)" }}>
                    <span className="w-2 h-2 rounded-full" style={{ background:"#7c3aed" }}/>
                    <span className="text-xs font-semibold" style={{ color:"#7c3aed" }}>Mahak</span>
                  </div>
                ) : (
                  <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                    onClick={()=>setSignIn(true)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold"
                    style={{
                      color:"#7c3aed",
                      border:"1px solid rgba(124,58,237,0.28)",
                      background: dark?"rgba(124,58,237,0.08)":"rgba(124,58,237,0.06)",
                      cursor:"pointer",
                    }}>
                    Sign In
                  </motion.button>
                )}
                <motion.button whileHover={{ scale:1.03, boxShadow:"0 8px 28px rgba(124,58,237,0.38)" }}
                  whileTap={{ scale:0.97 }}
                  className="px-5 py-2 rounded-xl text-sm font-bold text-white"
                  style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7)", cursor:"pointer" }}>
                  Post a Job
                </motion.button>
              </>
            )}

            {/* Hamburger */}
            {isMobile && (
              <button onClick={()=>setMenuOpen(o=>!o)}
                className="flex flex-col gap-[5px] items-center justify-center w-9 h-9"
                style={{ background:"none", border:"none", cursor:"pointer" }}>
                {[0,1,2].map(i=>(
                  <motion.span key={i}
                    animate={{
                      rotate:  menuOpen&&i===0?45:menuOpen&&i===2?-45:0,
                      y:       menuOpen&&i===0?7 :menuOpen&&i===2?-7 :0,
                      opacity: menuOpen&&i===1?0 :1,
                    }}
                    transition={{ duration:0.24 }}
                    style={{ display:"block", width:20, height:2, borderRadius:2,
                      background: dark?"rgba(255,255,254,0.7)":"rgba(15,14,23,0.7)" }} />
                ))}
              </button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="fixed inset-0 z-40"
              style={{ background:"rgba(0,0,0,0.4)", backdropFilter:"blur(4px)" }}
              onClick={()=>setMenuOpen(false)} />
            <motion.div
              initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}}
              transition={{ type:"tween", duration:0.32, ease:[0.22,1,0.36,1] }}
              className="fixed top-0 right-0 h-full z-50 flex flex-col"
              style={{ width:276, background: dark?"#0f0e17":"#faf9f6",
                borderLeft:`1px solid ${dark?"rgba(124,58,237,0.18)":"rgba(124,58,237,0.12)"}` }}>

              <div className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom:`1px solid ${dark?"rgba(255,255,255,0.06)":"rgba(15,14,23,0.08)"}` }}>
                <span className="font-bold text-base" style={{ color:dark?"#fffffe":"#0f0e17" }}>
                  Job<span className="gradient-text">Portal</span>
                </span>
                <button onClick={()=>setMenuOpen(false)}
                  style={{ background:"none",border:"none",cursor:"pointer",
                    color:dark?"rgba(255,255,254,0.4)":"rgba(15,14,23,0.4)", fontSize:20 }}>✕</button>
              </div>

              <div className="flex flex-col gap-1 px-4 py-5 flex-1">
                {NAV.map(({to,label})=>{
                  const active = location.pathname===to
                  return (
                    <Link key={to} to={to} style={{ textDecoration:"none" }}>
                      <div className="py-3 px-4 rounded-xl text-sm font-medium transition-all"
                        style={{
                          color: active?"#7c3aed": dark?"rgba(255,255,254,0.6)":"rgba(15,14,23,0.6)",
                          background: active ? dark?"rgba(124,58,237,0.12)":"rgba(124,58,237,0.08)" : "transparent",
                          borderLeft: active?"3px solid #7c3aed":"3px solid transparent",
                        }}>
                        {label}
                      </div>
                    </Link>
                  )
                })}
              </div>

              <div className="px-4 pb-8 flex flex-col gap-3"
                style={{ borderTop:`1px solid ${dark?"rgba(255,255,255,0.06)":"rgba(15,14,23,0.07)"}`, paddingTop:16 }}>
                <button onClick={()=>{setMenuOpen(false);setSignIn(true)}}
                  className="py-3 rounded-xl text-sm font-semibold"
                  style={{ border:"1px solid rgba(124,58,237,0.28)", color:"#7c3aed", background:"transparent", cursor:"pointer" }}>
                  Sign In
                </button>
                <button className="py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7)", cursor:"pointer" }}>
                  Post a Job
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sign In Modal */}
      <AnimatePresence>
        {signIn && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            style={{ background:"rgba(0,0,0,0.55)", backdropFilter:"blur(10px)" }}
            onClick={()=>setSignIn(false)}>
            <motion.div
              initial={{scale:0.88,opacity:0,y:28}} animate={{scale:1,opacity:1,y:0}}
              exit={{scale:0.88,opacity:0,y:28}}
              transition={{ duration:0.32, ease:[0.22,1,0.36,1] }}
              onClick={e=>e.stopPropagation()}
              className="relative w-full rounded-2xl p-8"
              style={{
                maxWidth:420,
                background: dark?"#17162a":"#ffffff",
                border:`1px solid ${dark?"rgba(124,58,237,0.25)":"rgba(124,58,237,0.15)"}`,
                boxShadow:"0 32px 80px rgba(0,0,0,0.28)",
              }}>
              <button onClick={()=>setSignIn(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg"
                style={{ background: dark?"rgba(255,255,255,0.06)":"rgba(15,14,23,0.05)",
                  border:"none", cursor:"pointer",
                  color: dark?"rgba(255,255,254,0.4)":"rgba(15,14,23,0.4)" }}>✕</button>

              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                  style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7)" }}>J</div>
                <span className="font-bold" style={{ color:dark?"#fffffe":"#0f0e17" }}>
                  Job<span className="gradient-text">Portal</span>
                </span>
              </div>

              <h2 className="font-bold text-2xl mb-1" style={{ color:dark?"#fffffe":"#0f0e17" }}>
                Welcome back 👋
              </h2>
              <p className="text-sm mb-6" style={{ color:dark?"rgba(255,255,254,0.42)":"rgba(15,14,23,0.48)" }}>
                Sign in to find your dream job
              </p>

              <form onSubmit={submitSignIn} className="flex flex-col gap-4">
                {[
                  {label:"Email",    key:"email", type:"email",    ph:"you@example.com"},
                  {label:"Password", key:"pass",  type:"password", ph:"••••••••"},
                ].map(f=>(
                  <div key={f.key}>
                    <label className="block text-xs font-semibold mb-1.5"
                      style={{ color:dark?"rgba(255,255,254,0.55)":"rgba(15,14,23,0.55)" }}>
                      {f.label}
                    </label>
                    <input type={f.type} placeholder={f.ph} required
                      value={form[f.key]}
                      onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: dark?"rgba(255,255,255,0.05)":"rgba(124,58,237,0.04)",
                        border:`1px solid ${dark?"rgba(124,58,237,0.2)":"rgba(124,58,237,0.16)"}`,
                        color: dark?"#fffffe":"#0f0e17",
                      }}
                      onFocus={e=>e.target.style.borderColor="#7c3aed"}
                      onBlur={e=>e.target.style.borderColor=dark?"rgba(124,58,237,0.2)":"rgba(124,58,237,0.16)"}
                    />
                  </div>
                ))}

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-xs"
                    style={{ color:dark?"rgba(255,255,254,0.45)":"rgba(15,14,23,0.5)" }}>
                    <input type="checkbox" className="accent-violet-600 w-3.5 h-3.5" />
                    Remember me
                  </label>
                  <button type="button" className="text-xs font-semibold"
                    style={{ color:"#7c3aed", background:"none", border:"none", cursor:"pointer" }}>
                    Forgot password?
                  </button>
                </div>

                <motion.button type="submit"
                  whileHover={{ scale:1.02, boxShadow:"0 8px 28px rgba(124,58,237,0.38)" }}
                  whileTap={{ scale:0.97 }}
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-white mt-1"
                  style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7)", cursor:"pointer" }}>
                  Sign In →
                </motion.button>
              </form>

              <p className="text-center text-xs mt-5"
                style={{ color:dark?"rgba(255,255,254,0.35)":"rgba(15,14,23,0.42)" }}>
                No account?{" "}
                <button className="font-semibold"
                  style={{ color:"#7c3aed", background:"none", border:"none", cursor:"pointer" }}>
                  Create one free
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}