import{motion}from"framer-motion"
export default function ScrollReveal({children,delay=0,y=32,x=0,scale=1,className=""}){
  return(
    <motion.div className={className}
      initial={{opacity:0,y,x,scale}}
      whileInView={{opacity:1,y:0,x:0,scale:1}}
      viewport={{once:true,margin:"-50px"}}
      transition={{duration:0.65,delay,ease:[0.22,1,0.36,1]}}>
      {children}
    </motion.div>
  )
}