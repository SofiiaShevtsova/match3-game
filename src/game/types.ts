export type TileType = 'square' | 'circle' | 'diamond' | 'triangle' | 'hexagon';

export type Tile = {
  id: number;
  type: TileType; 
};

// board [col][row]
export type Board = (Tile | null)[][];

export type Position = {
  row: number;
  col: number;
};

export type Result = {
  points: number;
  board: Board;
}