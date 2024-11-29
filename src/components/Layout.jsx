import { Outlet } from "react-router-dom"
import Navbars from "./Navbars"

const Layout = () => {
  return (
    <div className="App bg-slate-200 dark:bg-slate-900">
        <Navbars />
        <Outlet />
    </div>
  )
}

export default Layout