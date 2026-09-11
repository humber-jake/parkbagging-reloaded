import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Admin from "./pages/Admin";

import parks from "./data/parks.json";
import type { Ride } from "./types/Ride";
import { calculateDistance } from "./utils/distance";
import type { Park } from "./types/Park";

export default function App() {
  const [ride, setRide] = useState<Ride | null>(null);
  const [draftRide, setDraftRide] = useState<Ride | null>(null);

  function generateRide(
    date: string,
    time: string,
    seedPark1: string,
    seedPark2: string,
  ) {
    if (seedPark1 && seedPark1 === seedPark2) {
      return;
    }

    let distance = 0;

    while (!(distance > 3 && distance < 10)) {
      let park1: Park;
      let park2: Park;

      // Get park 1
      if (seedPark1) {
        park1 = parks.find((park) => park.name === seedPark1)!;
      } else {
        park1 = parks[Math.floor(Math.random() * parks.length)];
      }

      // Get park 2
      if (seedPark2) {
        park2 = parks.find((park) => park.name === seedPark2)!;
      } else {
        park2 = parks[Math.floor(Math.random() * parks.length)];

        // Don't randomly select the same park as park 1
        while (park2.name === park1.name) {
          park2 = parks[Math.floor(Math.random() * parks.length)];
        }
      }

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
