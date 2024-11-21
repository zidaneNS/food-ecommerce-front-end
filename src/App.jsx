import Layout from "./components/Layout";
import Home from "./components/Home";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "./api/axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [updated, setUpdated] = useState(true);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await axios.get('/food', {
          headers: { 'Content-Type': 'application/json' }
        })

        setFoods(response.data.data);
      } catch (err) {
        console.error(err)
      }
    }
    if (updated) {
      getFoods();
      setUpdated(prev => !prev)
    }
  }, [updated])
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home foods={foods} />} />
      </Route>
    </Routes>
  )
}

export default App