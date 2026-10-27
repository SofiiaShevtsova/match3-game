let startId = 0;
const tiles = ["square", "circle", "diamond", "triangle", "heart"] as const;

export const createTile = (type: number) => {
  startId = startId + 1;
  return { id: startId, type: tiles[type] };
};
