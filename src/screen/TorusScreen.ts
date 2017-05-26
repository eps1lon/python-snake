import Point from '../Point';
import Screen from '../Screen';
import Shape from '../Shape';

const torusMod = (n: number, size: number) =>
  n < 0 ? size - Math.abs(n) % size : n % size;

class TorusScreen extends Screen {
  constructor(width: number, height: number, shapes: Shape[] = []) {
    super(
      width, height,
      (point, screen_width, screen_height) => new Point(
        torusMod(point.x, screen_width),
        torusMod(point.y, screen_height),
      ),
      shapes,
    );
  }

  public toString() {
    return this.occupiedArea().map((row) => row.join('')).join('\n');
  }
}

export default TorusScreen;
