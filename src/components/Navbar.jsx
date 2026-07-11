import{useState,useEffect}from"react"
import{Link,useLocation}from"react-router-dom"
import{motion,AnimatePresence}from"framer-motion"
import{useTheme}from"../context/ThemeContext"

export default function Navbar(){
  const{dark:T,toggle}=useTheme()
  const[scrolled,setScrolled]=useState(false)
  const[isMobile,setIsMobile]=useState(window.innerWidth<1024)
  const[menu,setMenu]=useState(false)
  const[signIn,setSignIn]=useState(false)
  const[loggedIn,setLoggedIn]=useState(false)
  const[form,setForm]=useState({email:"",pass:""})
  const loc=useLocation()

  useEffect(()=>{
    const s=()=>setScrolled(window.scrollY>16)
    const r=()=>{setIsMobile(window.innerWidth<1024);if(window.innerWidth>=1024)setMenu(false)}
    window.addEventListener("scroll",s);window.addEventListener("resize",r)
    return()=>{window.removeEventListener("scroll",s);window.removeEventListener("resize",r)}
  },[])
  useEffect(()=>setMenu(false),[loc])

  const NAV=[
    {to:"/",label:"Home"},{to:"/jobs",label:"Find Jobs"},
    {to:"/companies",label:"Companies"},{to:"/profile",label:"Profile"},
  ]

  const navBg=scrolled?(T?"rgba(6,13,18,0.97)":"rgba(240,249,247,0.97)"):"transparent"
  const tc=T?"rgba(232,244,240,0.65)":"rgba(10,31,28,0.65)"
  const border=T?"rgba(13,148,136,0.15)":"rgba(13,148,136,0.12)"

  const doSignIn=(e)=>{
    e.preventDefault()
    if(form.email&&form.pass){setLoggedIn(true);setSignIn(false)}
  }

  return(
    <>
      <motion.nav initial={{y:-72}} animate={{y:0}}
        transition={{duration:0.65,ease:[0.22,1,0.36,1]}}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{background:navBg,backdropFilter:scrolled?"blur(24px)":"none",
          borderBottom:scrolled?`1px solid ${border}`:"none"}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px"}}
          className="flex items-center justify-between h-[68px]">

          {/* Logo */}
          <Link to="/" style={{textDecoration:"none",flexShrink:0}}>
            <motion.div whileHover={{scale:1.04}} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white text-sm"
                style={{background:"linear-gradient(135deg,#0d9488,#f59e0b)",
                  boxShadow:"0 0 18px rgba(13,148,136,0.5)"}}>J</div>
              <span className="font-bold text-lg"
                style={{fontFamily:"'Cormorant Garamond',serif",
                  color:T?"#e8f4f0":"#0a1f1c",letterSpacing:"0.02em"}}>
                Job<span className="gt">Portal</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Links */}
          {!isMobile&&(
            <div className="flex items-center gap-1">
              {NAV.map(({to,label})=>{
                const active=loc.pathname===to
                return(
                  <Link key={to} to={to} style={{textDecoration:"none"}}>
                    <div className="relative px-4 py-2 rounded-xl text-sm font-medium cursor-pointer"
                      style={{color:active?"#0d9488":tc,transition:"color 0.2s"}}
                      onMouseEnter={e=>e.currentTarget.style.color="#0d9488"}
                      onMouseLeave={e=>e.currentTarget.style.color=active?"#0d9488":tc}>
                      {active&&(
                        <motion.div layoutId="nav-pill" className="absolute inset-0 rounded-xl"
                          style={{background:T?"rgba(13,148,136,0.12)":"rgba(13,148,136,0.08)"}}
                          transition={{type:"spring",stiffness:420,damping:32}}/>
                      )}
                      <span className="relative z-10">{label}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {/* Right */}
          <div className="flex items-center gap-2.5">
            {/* Theme */}
            <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={toggle}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{background:T?"rgba(255,255,255,0.06)":"rgba(13,148,136,0.08)",
                border:`1px solid ${border}`,cursor:"pointer"}}>
              <motion.span key={T?"m":"s"}
                initial={{rotate:-80,opacity:0}} animate={{rotate:0,opacity:1}}
                transition={{duration:0.3}}>
                {T?"🌙":"☀️"}
              </motion.span>
            </motion.button>

            {!isMobile&&(
              <>
                {loggedIn?(
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                    style={{background:"rgba(13,148,136,0.1)",border:"1px solid rgba(13,148,136,0.25)"}}>
                    <span className="w-2 h-2 rounded-full" style={{background:"#0d9488"}}/>
                    <span className="text-xs font-semibold" style={{color:"#0d9488"}}>Mahak</span>
                  </div>
                ):(
                  <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                    onClick={()=>setSignIn(true)}
                    className="btn-outline-teal px-4 py-2 text-sm">
                    Sign In
                  </motion.button>
                )}
                <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                  className="btn-teal px-5 py-2 text-sm">
                  <span>Post a Job</span>
                </motion.button>
              </>
            )}

            {/* Hamburger */}
            {isMobile&&(
              <button onClick={()=>setMenu(o=>!o)}
                className="flex flex-col gap-[5px] items-center justify-center w-9 h-9"
                style={{background:"none",border:"none",cursor:"pointer"}}>
                {[0,1,2].map(i=>(
                  <motion.span key={i}
                    animate={{rotate:menu&&i===0?45:menu&&i===2?-45:0,
                      y:menu&&i===0?7:menu&&i===2?-7:0,opacity:menu&&i===1?0:1}}
                    transition={{duration:0.24}}
                    style={{display:"block",width:20,height:2,borderRadius:2,
                      background:T?"rgba(232,244,240,0.8)":"rgba(10,31,28,0.8)"}}/>
                ))}
              </button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menu&&isMobile&&(
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="fixed inset-0 z-40"
              style={{background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)"}}
              onClick={()=>setMenu(false)}/>
            <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}}
              transition={{type:"tween",duration:0.32,ease:[0.22,1,0.36,1]}}
              className="fixed top-0 right-0 h-full z-50 flex flex-col"
              style={{width:280,background:T?"#060d12":"#f0f9f7",
                borderLeft:`1px solid ${border}`}}>
              <div className="flex items-center justify-between px-6 py-5"
                style={{borderBottom:`1px solid ${border}`}}>
                <span className="font-bold" style={{fontFamily:"'Cormorant Garamond',serif",
                  color:T?"#e8f4f0":"#0a1f1c"}}>
                  Job<span className="gt">Portal</span>
                </span>
                <button onClick={()=>setMenu(false)}
                  style={{background:"none",border:"none",cursor:"pointer",fontSize:20,
                    color:T?"rgba(232,244,240,0.5)":"rgba(10,31,28,0.5)"}}>✕</button>
              </div>
              <div className="flex flex-col gap-1 px-4 py-5 flex-1">
                {NAV.map(({to,label})=>{
                  const active=loc.pathname===to
                  return(
                    <Link key={to} to={to} style={{textDecoration:"none"}}>
                      <div className="py-3 px-4 rounded-xl text-sm font-medium"
                        style={{color:active?"#0d9488":T?"rgba(232,244,240,0.7)":"rgba(10,31,28,0.7)",
                          background:active?T?"rgba(13,148,136,0.12)":"rgba(13,148,136,0.08)":"transparent",
                          borderLeft:active?"3px solid #0d9488":"3px solid transparent"}}>
                        {label}
                      </div>
                    </Link>
                  )
                })}
              </div>
              <div className="px-4 pb-8 flex flex-col gap-3"
                style={{borderTop:`1px solid ${border}`,paddingTop:16}}>
                <button onClick={()=>{setMenu(false);setSignIn(true)}}
                  className="btn-outline-teal py-3 text-sm">Sign In</button>
                <button className="btn-teal py-3 text-sm"><span>Post a Job</span></button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sign In Modal */}
      <AnimatePresence>
        {signIn&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            style={{background:"rgba(0,0,0,0.65)",backdropFilter:"blur(12px)"}}
            onClick={()=>setSignIn(false)}>
            <motion.div initial={{scale:0.88,opacity:0,y:28}}
              animate={{scale:1,opacity:1,y:0}} exit={{scale:0.88,opacity:0,y:28}}
              transition={{duration:0.32,ease:[0.22,1,0.36,1]}}
              onClick={e=>e.stopPropagation()}
              className="relative w-full rounded-2xl p-8"
              style={{maxWidth:420,background:T?"#0d1a1c":"#fff",
                border:`1px solid ${border}`,boxShadow:"0 40px 100px rgba(0,0,0,0.4)"}}>
              <button onClick={()=>setSignIn(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg"
                style={{background:T?"rgba(255,255,255,0.07)":"rgba(10,31,28,0.06)",
                  border:"none",cursor:"pointer",
                  color:T?"rgba(232,244,240,0.5)":"rgba(10,31,28,0.45)"}}>✕</button>

              <div className="flex items-center gap-2 mb-7">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                  style={{background:"linear-gradient(135deg,#0d9488,#f59e0b)"}}>J</div>
                <span className="font-bold" style={{fontFamily:"'Cormorant Garamond',serif",
                  color:T?"#e8f4f0":"#0a1f1c"}}>
                  Job<span className="gt">Portal</span>
                </span>
              </div>

              <h2 className="font-bold text-2xl mb-1"
                style={{fontFamily:"'Cormorant Garamond',serif",
                  color:T?"#e8f4f0":"#0a1f1c"}}>
                Welcome back 👋
              </h2>
              <p className="text-sm mb-6"
                style={{color:T?"rgba(232,244,240,0.5)":"rgba(10,31,28,0.55)"}}>
                Sign in to find your dream job
              </p>

              <form onSubmit={doSignIn} className="flex flex-col gap-4">
                {[{label:"Email",key:"email",type:"email",ph:"you@example.com"},
                  {label:"Password",key:"pass",type:"password",ph:"••••••••"}].map(f=>(
                  <div key={f.key}>
                    <label className="block text-xs font-semibold mb-1.5"
                      style={{color:T?"rgba(232,244,240,0.65)":"rgba(10,31,28,0.65)"}}>
                      {f.label}
                    </label>
                    <input type={f.type} placeholder={f.ph} required
                      value={form[f.key]}
                      onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                      className="v-in w-full px-4 py-3 rounded-xl text-sm"/>
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs cursor-pointer"
                    style={{color:T?"rgba(232,244,240,0.5)":"rgba(10,31,28,0.55)"}}>
                    <input type="checkbox" className="accent-teal-600 w-3.5 h-3.5"/>
                    Remember me
                  </label>
                  <button type="button" className="text-xs font-semibold"
                    style={{color:"#0d9488",background:"none",border:"none",cursor:"pointer"}}>
                    Forgot password?
                  </button>
                </div>
                <motion.button type="submit"
                  whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                  className="btn-teal w-full py-3.5 text-sm mt-1">
                  <span>Sign In →</span>
                </motion.button>
              </form>

              <p className="text-center text-xs mt-5"
                style={{color:T?"rgba(232,244,240,0.4)":"rgba(10,31,28,0.45)"}}>
                No account?{" "}
                <button className="font-semibold"
                  style={{color:"#0d9488",background:"none",border:"none",cursor:"pointer"}}>
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