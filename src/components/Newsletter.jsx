import{useState}from"react"
import{motion,AnimatePresence}from"framer-motion"
import ScrollReveal from"./ScrollReveal"
import{useTheme}from"../context/ThemeContext"

export default function Newsletter(){
  const{dark:T}=useTheme()
  const[email,setEmail]=useState("")
  const[done,setDone]=useState(false)
  const H=T?"#e8f4f0":"#0a1f1c"
  const S=T?"rgba(232,244,240,0.5)":"rgba(10,31,28,0.55)"

  return(
    <section className="py-20 px-5"
      style={{background:T?"rgba(6,13,18,0.98)":"#e6faf7"}}>
      <ScrollReveal>
        <div className="max-w-xl mx-auto text-center p-10 rounded-3xl"
          style={{background:T?"rgba(13,148,136,0.07)":"rgba(255,255,255,0.9)",
            border:`1px solid ${T?"rgba(13,148,136,0.2)":"rgba(13,148,136,0.18)"}`,
            boxShadow:T?"0 8px 40px rgba(0,0,0,0.3)":"0 8px 40px rgba(13,148,136,0.1)"}}>
          <h2 className="font-bold text-2xl md:text-3xl mb-3"
            style={{fontFamily:"'Cormorant Garamond',serif",color:H}}>
            Never Miss an Opportunity
          </h2>
          <p className="text-sm mb-7" style={{color:S}}>
            Personalized job alerts delivered to your inbox. Join 500K+ professionals.
          </p>
          <AnimatePresence mode="wait">
            {done?(
              <motion.p key="ok" initial={{scale:0.85,opacity:0}} animate={{scale:1,opacity:1}}
                className="text-sm font-bold py-3" style={{color:"#0d9488"}}>
                ✅ Subscribed! Check your inbox.
              </motion.p>
            ):(
              <motion.form key="form"
                onSubmit={e=>{e.preventDefault();if(email.includes("@")){setDone(true);setEmail("")}}}
                className="flex flex-col sm:flex-row gap-2">
                <input value={email} onChange={e=>setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="v-in flex-1 px-4 py-3 rounded-xl text-sm"/>
                <motion.button type="submit"
                  whileHover={{scale:1.04}} whileTap={{scale:0.97}}
                  className="btn-teal px-6 py-3 text-sm flex-shrink-0">
                  <span>Subscribe →</span>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </ScrollReveal>
    </section>
  )
}