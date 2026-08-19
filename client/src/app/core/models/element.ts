export interface Element {
  id: number;
  name: string;
  group: 'small' | 'medium' | 'large';
  tag: string[];
  coordinates?: number[];
}