export interface Park {
  parkid: number;
  name: string;
  googlemapdest: {
    lon: number;
    lat: number;
  };
}
