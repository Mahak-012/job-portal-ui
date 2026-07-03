import Hero            from "../components/Hero"
import Stats           from "../components/Stats"
import CategorySection from "../components/CategorySection"
import JobGrid         from "../components/JobGrid"
import HowItWorks      from "../components/HowItWorks"
import Testimonials    from "../components/Testimonials"
import Newsletter      from "../components/Newsletter"
import Footer          from "../components/Footer"
import { motion }      from "framer-motion"

export default function Home() {
  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }}
      exit={{ opacity:0, y:-16 }}
      transition={{ duration:0.45, ease:[0.22,1,0.36,1] }}>
      <Hero />
      <Stats />
      <CategorySection />
      <JobGrid title="Latest Opportunities" />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
      <Footer />
    </motion.div>
  )
}