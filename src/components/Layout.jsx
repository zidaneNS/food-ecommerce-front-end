import { Outlet } from "react-router-dom"
import Navbars from "./Navbars"

const Layout = () => {
  return (
    <div className="App">
        <Navbars />
        <Outlet />
    </div>
  )
}

export default Layout