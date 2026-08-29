import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { ThemeProvider } from "./context/ThemeContext"
import Navbar    from "./components/Navbar"
import Home      from "./pages/Home"
import Jobs      from "./pages/Jobs"
import JobDetail from "./pages/JobDetail"
import Companies from "./pages/Companies"
import Profile   from "./pages/Profile"

function ScrollTop() {
  const { pathname } = useLocation()
  
  // ✅ Sahi syntax: curly braces add kar diye hain
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  
  return null
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollTop />
        <Navbar />
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/jobs"     element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/profile"  element={<Profile />} />
          <Route path="*"         element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}