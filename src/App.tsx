import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Admin from "./pages/Admin";

import parks from "./data/parks.json";
import type { Ride } from "./types/Ride";
import { calculateDistance } from "./utils/distance";

export default function App() {
  const [ride, setRide] = useState<Ride | null>(null);

  function generateRide(date: string, time: string) {
    const firstIndex = Math.floor(Math.random() * parks.length);

    let secondIndex = Math.floor(Math.random() * parks.length);

    while (secondIndex === firstIndex) {
      secondIndex = Math.floor(Math.random() * parks.length);
    }

    const park1 = parks[firstIndex];
    const park2 = parks[secondIndex];

    const distance = calculateDistance(
      park1.googlemapdest.lat,
      park1.googlemapdest.lon,
      park2.googlemapdest.lat,
      park2.googlemapdest.lon,
    );

    setRide({
      park1,
      park2,
      date,
      time,
      distance,
    });
  }

  return (
    <>
      <nav className="nav">
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home ride={ride} />} />

        <Route
          path="/admin"
          element={<Admin generateRide={generateRide} ride={ride} />}
        />
      </Routes>
    </>
  );
}
