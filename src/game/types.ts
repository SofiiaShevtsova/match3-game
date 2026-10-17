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

export type LevelConfig = {
  id: number;
  tileTypeCount: number; 
  rowsCount: number;
  colCount: number;
  goal: number;        
  moves: number;      
};

export type UserData = {
  playerName: string;
  finishedLevel: number;
  totalPoints: number;
};