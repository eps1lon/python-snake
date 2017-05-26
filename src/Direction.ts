import Point from './Point';

export default Direction;

interface Direction {
  delta: Point;
  left: Direction;
  right: Direction;
}

export interface Orientation {
  [k: string]: Direction;
  up: Direction;
  right: Direction;
  down: Direction;
  left: Direction;
}

export type OrientationIdent = keyof Orientation;

export const isOrientationIdent
  = (ident: string, plane: Orientation): ident is OrientationIdent =>
  Object.keys(plane).indexOf(ident) !== -1;

export const fromPoint = (point: Point, plane: Orientation) => {
  const ident
    = Object.keys(plane).filter((dir) => plane[dir].delta.equals(point))[0];

  if (isOrientationIdent(ident, plane) === true) {
    return plane[ident];
  } else {
    return undefined;
  }
};
