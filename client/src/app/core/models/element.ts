export interface Element {
  id: number;
  name: string;
  description?: string;
  status: string;
  imageUrl?: string;
  tag: string[];
  coordinates?: Coordinates;
}
export interface Coordinates{
  x: number,
  y: number
}