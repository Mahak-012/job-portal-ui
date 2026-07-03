import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ScrollReveal from "./ScrollReveal"
import { useTheme } from "../context/ThemeContext"

export default function Newsletter() {
  const { dark } = useTheme()
  const [email, setEmail] = useState("")
  const [done,  setDone]  = useState(false)

  return (
    <section className="py-20 px-5"
      style={{ background: dark?"rgba(15,14,23,0.98)":"#f4f1fe" }}>
      <ScrollReveal>
        <div className="max-w-xl mx-auto text-center p-10 rounded-3xl"
          style={{
            background: dark?"rgba(124,58,237,0.08)":"rgba(255,255,255,0.9)",
            border:`1px solid ${dark?"rgba(124,58,237,0.2)":"rgba(124,58,237,0.16)"}`,
            boxShadow: dark?"none":"0 8px 40px rgba(124,58,237,0.1)",
          }}>
          <h2 className="font-bold text-2xl md:text-3xl mb-3"
            style={{ fontFamily:"'Playfair Display',serif", color:dark?"#fffffe":"#0f0e17" }}>
            Never Miss an Opportunity
          </h2>
          <p className="text-sm mb-7"
            style={{ color:dark?"rgba(255,255,254,0.42)":"rgba(15,14,23,0.5)" }}>
            Get personalized job alerts. Join 500K+ professionals.
          </p>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.p key="ok" initial={{scale:0.85,opacity:0}} animate={{scale:1,opacity:1}}
                className="text-sm font-bold py-3" style={{ color:"#059669" }}>
                ✅ Subscribed! Check your inbox.
              </motion.p>
            ) : (
              <motion.form key="form"
                onSubmit={e=>{e.preventDefault();if(email.includes("@")){setDone(true);setEmail("")}}}
                className="flex flex-col sm:flex-row gap-2">
                <input value={email} onChange={e=>setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                  style={{
                    background: dark?"rgba(255,255,255,0.06)":"rgba(124,58,237,0.04)",
                    border:`1px solid ${dark?"rgba(124,58,237,0.2)":"rgba(124,58,237,0.16)"}`,
                    color: dark?"#fffffe":"#0f0e17",
                  }}
                  onFocus={e=>e.target.style.borderColor="#7c3aed"}
                  onBlur={e=>e.target.style.borderColor=dark?"rgba(124,58,237,0.2)":"rgba(124,58,237,0.16)"}
                />
                <motion.button type="submit"
                  whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-white flex-shrink-0"
                  style={{ background:"linear-gradient(135deg,#7c3aed,#a855f7)", cursor:"pointer" }}>
                  Subscribe →
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </ScrollReveal>
    </section>
  )
}