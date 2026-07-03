import { createContext, useContext, useState, useEffect } from "react"
const Ctx = createContext()
export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false)
  useEffect(() => { document.body.className = dark ? "dark" : "light" }, [dark])
  return <Ctx.Provider value={{ dark, toggle: () => setDark(d => !d) }}>{children}</Ctx.Provider>
}
export const useTheme = () => useContext(Ctx)