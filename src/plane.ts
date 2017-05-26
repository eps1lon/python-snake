import Direction, { Orientation } from './Direction';
import Point from './Point';

const plane: Orientation = {
  up: { delta: new Point(0, -1) } as Direction,
  right: { delta: new Point(+1, 0) } as Direction,
  down: { delta: new Point(0, +1) } as Direction,
  left: { delta: new Point(-1, 0) } as Direction,
};

plane.up.right = plane.right;
plane.right.right = plane.down;
plane.down.right = plane.left;
plane.left.right = plane.up;

plane.up.left = plane.left;
plane.left.left = plane.down;
plane.down.left = plane.right;
plane.right.left = plane.up;

export default plane;
