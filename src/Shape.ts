import Point from './Point';

interface Shape {
  width: number;
  height: number;
  offset(): Point;
  occupiedArea(): number[][];
}

export default Shape;

export const pointsList = (shape: Shape): Array<[Point, number]> => {
  const points: Array<[Point, number]> = [];

  shape.occupiedArea().forEach((row, y) =>
    row.forEach((value, x) => {
      points.push([new Point(x, y).add(shape.offset()), value]);
    }));

  return points;
};

export const filteredPoints
  = (fn: (value: number) => boolean, shape: Shape): Point[] => {
  return pointsList(shape)
    .filter((entry) => fn(entry[1]))
    .map((entry) => entry[0]);
};

export const occupiedPoints = (shape: Shape): Point[] => {
  return filteredPoints((value) => value > 0, shape);
};

export const unoccupiedPoints = (shape: Shape): Point[] => {
  return filteredPoints((value) => value === 0, shape);
};
