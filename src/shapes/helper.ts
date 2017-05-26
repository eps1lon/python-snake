import Point from '../Point';
import Shape from '../Shape';

const ZERO = new Point(0, 0);

export function simpleShape(area: number[][]): Shape {
  return {
    offset: () => ZERO,
    width: area[0].length,
    height: area.length,
    occupiedArea: () => area,
  };
}
