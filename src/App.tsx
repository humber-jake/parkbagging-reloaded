import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Admin from "./pages/Admin";

import parks from "./data/parks.json";
import type { Ride } from "./types/Ride";
import { calculateDistance } from "./utils/distance";

export default function App() {
  const [ride, setRide] = useState<Ride | null>(null);
  const [draftRide, setDraftRide] = useState<Ride | null>(null);

  function generateRide(date: string, time: string) {
    let distance = 0;

    while (!(distance > 3 && distance < 10)) {
      const firstIndex = Math.floor(Math.random() * parks.length);

      let secondIndex = Math.floor(Math.random() * parks.length);

      while (secondIndex === firstIndex) {
        secondIndex = Math.floor(Math.random() * parks.length);
      }

      const park1 = parks[firstIndex];
      const park2 = parks[secondIndex];

      distance = calculateDistance(
        park1.googlemapdest.lat,
        park1.googlemapdest.lon,
        park2.googlemapdest.lat,
        park2.googlemapdest.lon,
      );

      setDraftRide({
        park1,
        park2,
        date,
        time,
        distance,
      });
    }
  }

  function saveRide() {
    if (draftRide) {
      setRide(draftRide);
    }
  }

  return (
    <>
      <nav className="nav">
        {ride && (
          <img
            className={"nav-logo"}
            src="/logo.png"
            alt="Parkbagging-reloaded"
          />
        )}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home ride={ride} />} />

        <Route
          path="/admin"
          element={
            <Admin
              ride={draftRide}
              generateRide={generateRide}
              saveRide={saveRide}
            />
          }
        />
      </Routes>
    </>
  );
}
