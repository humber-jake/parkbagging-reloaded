import type { Ride } from "../types/Ride";
import { formatTime } from "../utils/time";
import { formatDate } from "../utils/date";
import { calculateDistance } from "../utils/distance";
import "../styles/index.css";

interface HomeProps {
  ride: Ride | null;
}

const teaser = true;

export default function Home({ ride }: HomeProps) {
  let distance = 0;

  if (ride) {
    distance = calculateDistance(
      ride.park1.googlemapdest.lat,
      ride.park1.googlemapdest.lon,
      ride.park2.googlemapdest.lat,
      ride.park2.googlemapdest.lon,
    );
  }

  return (
    <div className={teaser ? "home-teaser" : "home"}>
      <img className="logo-image" src="/logo.png" alt="Parkbagging-reloaded" />

      {teaser && (
        <>
          <div className="teaser-overlay">
            <div className="continue">
              to be CONTINUED.... 🚲 🍻 ?<span className="cursor">_</span>
            </div>
          </div>
        </>
      )}
      {!teaser && (
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

          {ride && <h3 className="length">Ride Length - {distance}km</h3>}

          <p className="time">
            Meet @ {ride ? formatTime(ride.time) : "--:--"}(ish)
          </p>

          <div className="emojis">🚲🍻</div>
        </div>
      )}
    </div>
  );
}
