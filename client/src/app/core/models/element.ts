import { MapData } from "./mapData";

export interface Element {
  id: number;
  name: string;
  description?: string;
  status: string;
  imageUrl?: string;
  tags: string[];
  coordinates?: Coordinates;
  map?: MapData;
}
export interface Coordinates{
  x: number,
  y: number
}