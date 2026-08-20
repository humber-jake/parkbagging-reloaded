import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { Polyline } from "react-leaflet";
import L from "leaflet";

import type { Park } from "../types/Park";

interface RoutingProps {
  park1: Park;
  park2: Park;
}

export default function Routing({ park1, park2 }: RoutingProps) {
  const map = useMap();

  const [route, setRoute] = useState<L.LatLng[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function getRoute() {
      try {
        const apiKey = import.meta.env.VITE_GRAPHHOPPER_API_KEY;

        const params = new URLSearchParams({
          profile: "bike",
          points_encoded: "false",
          key: apiKey,
        });

        params.append(
          "point",
          `${park1.googlemapdest.lat},${park1.googlemapdest.lon}`,
        );

        params.append(
          "point",
          `${park2.googlemapdest.lat},${park2.googlemapdest.lon}`,
        );

        const response = await fetch(
          `https://graphhopper.com/api/1/route?${params.toString()}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`GraphHopper request failed: ${response.status}`);
        }

        const data = await response.json();

        const coordinates = data.paths[0].points.coordinates;

        const routeCoordinates = coordinates.map(
          ([lon, lat]: [number, number]) => L.latLng(lat, lon),
        );

        setRoute(routeCoordinates);

        const bounds = L.latLngBounds(routeCoordinates);

        // Include the parks themselves
        bounds.extend([park1.googlemapdest.lat, park1.googlemapdest.lon]);

        bounds.extend([park2.googlemapdest.lat, park2.googlemapdest.lon]);

        map.fitBounds(bounds, {
          padding: [50, 50],
        });
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Failed to get route:", error);
        }
      }
    }

    getRoute();

    return () => {
      controller.abort();
    };
  }, [map, park1, park2]);

  return (
    <Polyline
      positions={route}
      pathOptions={{
        weight: 5,
        color: "#f100c7",
      }}
    />
  );
}
