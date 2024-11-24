import Layout from "./components/Layout";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "./api/axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [updated, setUpdated] = useState(true);
  const [notes, setNotes] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await axios.get('/food', {
          headers: { 'Content-Type': 'application/json' }
        })
        const response2 = await axios.get('/note', {
          headers: { 'Content-Type': 'application/json' }
        })

        setNotes(response2.data.data);
        setFoods(response.data.data);
      } catch (err) {
        console.error(err)
      }
    }
    if (updated) {
      getFoods();
      setUpdated(false)
    }
  }, [updated])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home foods={foods} setUpdated={setUpdated} />} />
        <Route path="/dashboard" element={<Dashboard foods={foods} setUpdated={setUpdated} notes={notes} />} />
      </Route>
    </Routes>
  )
}

export default App