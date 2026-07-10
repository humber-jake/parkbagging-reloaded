import { useState } from "react";
import type { Ride } from "../types/Ride";
import "../styles/index.css";
import { formatDate } from "../utils/date";
import { formatTime } from "../utils/time";

const ADMIN_PIN = "1234";

interface AdminProps {
  generateRide: (date: string, time: string) => void;
  ride: Ride | null;
}

export default function Admin({ generateRide, ride }: AdminProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("18:30");
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

        <button onClick={login} style={{ marginLeft: "1rem" }}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="admin">
      <h1>Admin</h1>

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

      <button onClick={() => generateRide(date, time)}>Generate</button>

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
    </div>
  );
}
