import plane from '../../plane';
import Point from '../../Point';
import InvalidSegment from '../InvalidSegment';
import Segment from '../Segment';

describe('Segment', () => {
  it('should not accept diagonals', () => {
    expect(new Segment(new Point(0, 0), new Point(0, 1)))
      .toBeInstanceOf(Segment);

    expect(new Segment(new Point(1, 0), new Point(2, 0)))
      .toBeInstanceOf(Segment);

    expect(() => {
      return new Segment(new Point(0, 0), new Point(1, 1));
    }).toThrow('InvalidSegment: no diagonals allowed');

    expect(() => {
      return new Segment(new Point(2, 3), new Point(4, 2));
    }).toThrow('InvalidSegment: no diagonals allowed');
  });

  it('should be empty with zero length', () => {
    expect(new Segment(new Point(12, 5), new Point(12, 5)).isEmpty())
      .toBe(true);

    expect(new Segment(new Point(12, 5), new Point(12, 5.01)).isEmpty())
      .toBe(false);
  });

  it('should have a direction', () => {
    let dir = new Segment(new Point(0, 5), new Point(0, 234)).direction(plane);

    expect(dir).toBeDefined();
    if (dir !== undefined) {
      expect(dir.delta.equals(new Point(0, 1)))
        .toBe(true);
    }

    dir = new Segment(new Point(0, 5), new Point(0, -5)).direction(plane);

    expect(dir).toBeDefined();
    if (dir !== undefined) {
      expect(dir.delta.equals(new Point(0, -1)))
        .toBe(true);
    }

    dir = new Segment(new Point(0, 0), new Point(-344235, 0)).direction(plane);

    expect(dir).toBeDefined();
    if (dir !== undefined) {
      expect(dir.delta.equals(new Point(-1, 0)))
        .toBe(true);
    }

    dir = new Segment(new Point(0, 2), new Point(0, 5)).direction(plane);

    expect(dir).toBeDefined();
    if (dir !== undefined) {
      expect(dir.delta.equals(new Point(0, 1)))
        .toBe(true);
    }
  });

  it('should recognize connecting segments', () => {
    const a = new Point(2, 0);
    const b = new Point(2, 8);
    const c = new Point(-3, 8);
    const d = new Point(-3, 4);

    expect(new Segment(a, b).connectsTo(new Segment(b, c)))
      .toBe(true);

    expect(new Segment(a, b).connectsTo(new Segment(c, d)))
      .toBe(false);

    expect(new Segment(b, c).connectsTo(new Segment(c, d)))
      .toBe(true);
  });

  it('should generate discrete points', () => {
    const orderEqual
      = (actual: Point[], expected: Point[]) =>
        points.every((point, i) => point.equals(expected[i]));

    let points = [...new Segment(new Point(0, 0), new Point(0, 4)).points()];
    let expected = [
      new Point(0, 0),
      new Point(0, 1),
      new Point(0, 2),
      new Point(0, 3),
      new Point(0, 4),
    ];

    expect(orderEqual(points, expected))
      .toBe(true);

    points = [...new Segment(new Point(0, 0), new Point(0, 0)).points()];
    expected = [];

    expect(orderEqual(points, expected))
      .toBe(true);

    points = [...new Segment(new Point(0, 0), new Point(0, 1)).points()];
    expected = [
      new Point(0, 0),
      new Point(0, 1),
    ];

    expect(orderEqual(points, expected))
      .toBe(true);
  });

  describe('connection', () => {
    const a = new Point(2, 1);
    const b = new Point(2, 5);
    const c = new Point(-2, 5);
    const d = new Point(-2, 1);

    it('should connect if end equals start of other', () => {
      expect(new Segment(a, b).connectsTo(new Segment(b, c)))
        .toBe(true);
      expect(new Segment(b, c).connectsTo(new Segment(c, d)))
        .toBe(true);
      expect(new Segment(c, d).connectsTo(new Segment(d, a)))
        .toBe(true);
    });

    it('shouldnt connect if any other points connect', () => {
      expect(new Segment(a, b).connectsTo(new Segment(a, d)))
        .toBe(false);
      expect(new Segment(a, b).connectsTo(new Segment(c, b)))
        .toBe(false);
      expect(new Segment(a, b).connectsTo(new Segment(d, a)))
        .toBe(false);
    });
  });
});
