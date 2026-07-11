import{BrowserRouter,Routes,Route,useLocation}from"react-router-dom"
import{useEffect}from"react"
import{AnimatePresence}from"framer-motion"
import{ThemeProvider}from"./context/ThemeContext"
import Navbar    from"./components/Navbar"
import Home      from"./pages/Home"
import Jobs      from"./pages/Jobs"
import JobDetail from"./pages/JobDetail"
import Companies from"./pages/Companies"
import Profile   from"./pages/Profile"

function ScrollTop(){
  const{pathname}=useLocation()
  useEffect(()=>window.scrollTo({top:0,behavior:"smooth"}),[pathname])
  return null
}

function AppRoutes(){
  const location=useLocation()
  return(
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"          element={<Home/>}/>
        <Route path="/jobs"      element={<Jobs/>}/>
        <Route path="/jobs/:id"  element={<JobDetail/>}/>
        <Route path="/companies" element={<Companies/>}/>
        <Route path="/profile"   element={<Profile/>}/>
      </Routes>
    </AnimatePresence>
  )
}

export default function App(){
  return(
    <ThemeProvider>
      <BrowserRouter>
        <ScrollTop/>
        <Navbar/>
        <AppRoutes/>
      </BrowserRouter>
    </ThemeProvider>
  )
}