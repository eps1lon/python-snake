import Shape from './Shape';

export class Point implements Shape {
  public readonly x: number;
  public readonly y: number;
  public width: number = 1;
  public height: number = 1;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public distance(other: Point) {
    return Math.sqrt(
      Math.abs(this.x - other.x) ** 2
      + Math.abs(this.y - other.y) ** 2,
    );
  }

  public add(other: Point) {
    return new Point(this.x + other.x, this.y + other.y);
  }

  public sub(other: Point) {
    return new Point(this.x - other.x, this.y - other.y);
  }

  public additiveInverseOf(other: Point) {
    return this.add(other).equals(ZERO);
  }

  public equals(other: Point) {
    return this.x === other.x && this.y === other.y;
  }

  public offset() {
    return this;
  }

  public occupiedArea() {
    return [[1]];
  }
}

export const ZERO = new Point(0, 0);

export default Point;
