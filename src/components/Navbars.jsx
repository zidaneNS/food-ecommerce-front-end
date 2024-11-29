import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Navbars = () => {
  const { auth, setAuth } = useAuth();
  return (
    <div className="fixed top-0 w-screen grid  grid-flow-col flex-1 justify-around px-4 py-2 dark:bg-purple-900 bg-purple-600 text-slate-300 text-2xl">
      <div className="font-bold col-span-2 flex items-center">
        Makan Sehat
      </div>
      <div className="grid gap-6 place-content-center grid-flow-col m-0 h-max p-0 col-span-1">
        <Link className="text-base cursor-pointer hover:bg-purple-700 dark:hover:bg-purple-950 text-inherit p-2" style={{textDecoration: 'none'}} >Home</Link>
        {auth.roles?.admin && (
        <Link className="text-base cursor-pointer hover:bg-purple-700 dark:hover:bg-purple-950 text-inherit p-2" style={{textDecoration: 'none'}} >Dashboard</Link>
        )}
        <Link className="text-base cursor-pointer hover:bg-purple-700 dark:hover:bg-purple-950 text-inherit p-2" style={{textDecoration: 'none'}} >Sign In</Link>
      </div>
      {auth.user && (
      <div className="grid place-content-center grid-flow-col gap-6 text-base col-span-1">
        <p className="flex m-0 items-center">{auth.user}</p>
        <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700" onClick={() => setAuth({})}>Logout</button>
      </div>
      )}
    </div>
  )
}

export default Navbars