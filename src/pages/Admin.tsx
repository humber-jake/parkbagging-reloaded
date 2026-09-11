import { useState } from "react";
import type { Ride } from "../types/Ride";
import "../styles/index.css";
import { formatDate } from "../utils/date";
import { formatTime } from "../utils/time";
import Map from "../components/Map";
import "../styles/index.css";
import parks from "../data/parks.json";

const ADMIN_PIN = "1234";

interface AdminProps {
  ride: Ride | null;
  generateRide: (
    date: string,
    time: string,
    seedPark1: string,
    seedPark2: string,
  ) => void;
  saveRide: () => void;
}

export default function Admin({ generateRide, ride, saveRide }: AdminProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("18:30");
  const [seedPark1, setSeedPark1] = useState("");
  const [seedPark2, setSeedPark2] = useState("");
  const [pin, setPin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  function login() {
    if (pin === ADMIN_PIN) {
      setLoggedIn(true);
    } else {
      alert("Incorrect PIN");
    }
  }

  if (!loggedIn) {
    return (
      <div className="admin" style={{ padding: "2rem" }}>
        <h1>Admin Login</h1>

        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />

        <div className="admin-buttons">
          <button onClick={login}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <div>
        <label>
          Date:
          <input
            className="date-time-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Time:
          <input
            className="date-time-input"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          1st Park
          <select
            className="date-time-input"
            value={seedPark1}
            onChange={(e) => setSeedPark1(e.target.value)}
          >
            <option value="">Random</option>

            {parks.map((park) => (
              <option key={park.name} value={park.name}>
                {park.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          2nd Park
          <select
            className="date-time-input"
            value={seedPark2}
            onChange={(e) => setSeedPark2(e.target.value)}
          >
            <option value="">Random</option>

            {parks.map((park) => (
              <option key={park.name} value={park.name}>
                {park.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="admin-buttons">
        <button onClick={() => generateRide(date, time, seedPark1, seedPark2)}>
          Generate
        </button>
      </div>

      {ride && (
        <div className="ride-card">
          <h2 className="date">
            {" "}
            {ride ? formatDate(ride.date) : "No date selected"}
          </h2>

          <div className="parks">
            {ride ? (
              <>
                <h2>{ride.park1.name}</h2>
                <h2>{ride.park2.name}</h2>
                <Map park1={ride.park1} park2={ride.park2} />
              </>
            ) : (
              <h2>No parks selected yet</h2>
            )}
          </div>

          {ride && <h3 className="length">Ride Length - {ride.distance}km</h3>}

          <p className="time">
            Meet @ {ride ? formatTime(ride.time) : "--:--"}(ish)
          </p>

          <div className="emojis">🚲🍻</div>
        </div>
      )}

      <div className="admin-buttons">
        <button className="save-button" onClick={saveRide} disabled={!ride}>
          Save Ride
        </button>
      </div>
    </div>
  );
}
