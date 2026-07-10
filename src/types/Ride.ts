import type { Park } from "./Park";

export interface Ride {
  park1: Park;
  park2: Park;
  date: string;
  time: string;
  distance: number;
}
