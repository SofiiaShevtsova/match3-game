import { TileType } from "../types";

export const TILE_STYLES: Record<TileType, { color: string; shape: string }> = {
  square:   { color: '#f1c40f', shape: 'square' },
  circle:   { color: '#2ecc71', shape: 'circle' },
  diamond:  { color: '#3498db', shape: 'diamond' },
  triangle: { color: '#9b59b6', shape: 'triangle' },
  hexagon:  { color: '#e74c3c', shape: 'heart' },
};