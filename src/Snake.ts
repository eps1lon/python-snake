import Direction, { Orientation } from './Direction';
import plane from './plane';
import Point, { ZERO } from './Point';
import Body from './snake/Body';
import Segment from './snake/Segment';

const default_body = new Body([new Segment(new Point(0, 0), new Point(2, 0))]);

class Snake {
  public static withDirection(start: Point, dir: Direction) {
    return new Snake(new Body([
      new Segment(start, start.add(dir.delta)),
    ]));
  }

  public readonly body: Body;
  public readonly plane: Orientation;

  constructor(body = default_body) {
    if (body.isValid() === false) {
      throw new Error('segments dont connect');
    }

    this.body = body;
  }

  public head(): Segment {
    return this.body.head();
  }

  public tail(): Segment {
    return this.body.tail();
  }

  public up(): Snake {
    return this.moveTo(plane.up);
  }

  public right(): Snake {
    return this.moveTo(plane.right);
  }

  public down(): Snake {
    return this.moveTo(plane.down);
  }

  public left(): Snake {
    return this.moveTo(plane.left);
  }

  public direction(): Direction | undefined {
    return this.head().direction(plane);
  }

  public grow() {
    return new Snake(this.body.prolong());
  }

  public forward(): Snake {
    const dir = this.direction();

    if (dir === undefined) {
      throw new Error('no direction');
    }

    return this.moveTo(dir);
  }

  private moveTo(new_dir: Direction): Snake {
    const dir = this.direction();
    if (dir === undefined) {
      return Snake.withDirection(this.head().start, plane.up);
    } else if (dir.delta.additiveInverseOf(new_dir.delta) === false) {
      // cant move backwards

      // add to head
      const prolonged_body = this.body.turnTo(new_dir.delta);

      // shorten tail
      const new_body = prolonged_body.shorten();

      return new Snake(new_body.sanitize());
    } else {
      return this;
    }
  }
}

export default Snake;
