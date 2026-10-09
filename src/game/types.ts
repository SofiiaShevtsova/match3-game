export type TileType = 'square' | 'circle' | 'diamond' | 'triangle' | 'hexagon';

export type Tile = {
  id: number;
  type: TileType; 
};

export type Board = (Tile | null)[][];

export type Position = {
  row: number;
  col: number;
};