import Direction, { fromPoint, Orientation } from '../Direction';
import Point from '../Point';
import InvalidSegment from './InvalidSegment';

class Segment {
  public readonly start: Point;
  public readonly end: Point;

  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;

    if (this.start.x !== this.end.x && this.start.y !== this.end.y) {
      throw new InvalidSegment('no diagonals allowed');
    }
  }

  public length() {
    return this.start.distance(this.end);
  }

  public isEmpty() {
    return this.length() === 0;
  }

  public direction(plane: Orientation): Direction | undefined {
    const point = this.norm();

    if (point !== undefined) {
      return fromPoint(point, plane);
    } else {
      return undefined;
    }
  }

  public norm() {
    const x_length = this.end.x - this.start.x;
    const y_length = this.end.y - this.start.y;

    if (x_length) {
      return new Point(Math.abs(x_length) / x_length, 0);
    } else if (y_length) {
      return new Point(0, Math.abs(y_length) / y_length);
    } else {
      return undefined;
    }
  }

  public connectsTo(other: Segment) {
    return this.end.equals(other.start);
  }

  public equals(other: Segment) {
    return this.start.equals(other.start)
      && this.end.equals(other.end);
  }

  public *points() {
    const norm = this.norm();

    if (norm !== undefined && norm.distance(new Point(0, 0)) === 1) {
      let cur = this.start;

      while (cur.equals(this.end) === false) {
        yield cur;
        cur = cur.add(norm);
      }

      yield cur; // last point
    }
  }
}

export default Segment;
