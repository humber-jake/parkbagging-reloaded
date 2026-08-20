export async function getRoute(
  startLat: number,
  startLon: number,
  endLat: number,
  endLon: number,
) {
  const key = import.meta.env.VITE_GRAPHHOPPER_API_KEY;

  const params = new URLSearchParams({
    profile: "bike",
    points_encoded: "false",
    key,
  });

  params.append("point", `${startLat},${startLon}`);
  params.append("point", `${endLat},${endLon}`);

  const response = await fetch(
    `https://graphhopper.com/api/1/route?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch route");
  }

  return response.json();
}
