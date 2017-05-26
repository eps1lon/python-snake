import Point from '../../Point';
import Body from '../Body';
import Segment from '../Segment';

describe('Body', () => {
  describe('head/tail', () => {
    const a = new Point(0, 0);
    const b = new Point(0, 2);
    const c = new Point(-4, 2);
    const d = new Point(-4, 8);

    const A = new Segment(a, b);
    const B = new Segment(b, c);
    const C = new Segment(c, d);

    it('should return the first segment as the head', () => {
      expect(new Body([A]).head().equals(A));
      expect(new Body([B, C]).head().equals(C));
      expect(new Body([A, B, C]).head().equals(C));
    });

    it('should return the last segment as the tails', () => {
      expect(new Body([A]).tail().equals(A))
        .toBe(true);
      expect(new Body([A, B]).tail().equals(A))
        .toBe(true);
      expect(new Body([A, B, C]).tail().equals(A))
        .toBe(true);
    });

    it('should return the same segment with a single segment', () => {
      let body = new Body([A]);
      expect(body.head().equals(body.tail()))
        .toBe(true);

      body = new Body([A, B, C]);
      expect(body.head().equals(body.tail()))
        .toBe(false);
    });
  });

  describe('growth', () => {
    const a = new Point(0, 0);
    const b = new Point(0, 2);
    const c = new Point(-4, 4);

    it('should only accept normalized deltas', () => {
      expect(() => {
        return new Body([new Segment(a, b)]).turnTo(new Point(0, 2));
      }).toThrow();
    });

    it('should not grow inwards', () => {
      const body = new Body([new Segment(a, b)]);
      const inverse_norm = new Segment(b, a).norm();

      expect(inverse_norm).toBeDefined();
      if (inverse_norm !== undefined) {
        expect(() => body.turnTo(inverse_norm))
          .toThrow();
      }
    });

    it('should prolong individual segments', () => {
      let body = new Body([new Segment(a, b)]);

      body = body.prolong();
      expect(body.segments.length)
      .toBe(2);
      expect(body.head().equals(new Segment(b, new Point(0, 3))))
        .toBe(true);

      body = body.prolong();
      expect(body.segments.length)
        .toBe(3);
      expect(body.head().equals(new Segment(new Point(0, 3), new Point(0, 4))))
        .toBe(true);

      // turn
      body = body.turnTo(new Point(-1, 0));

      body = body.prolong();
      body = body.prolong();
      body = body.prolong();

      expect(body.head().end.equals(c))
        .toBe(true);
    });
  });

  describe('shrinking', () => {
    const a = new Point(0, 0);
    const b = new Point(0, 4);
    const c = new Point(-4, 4);

    it('should throw when the tail is already empty', () => {
      expect(() => new Body([new Segment(a, a)]).shorten())
        .toThrow();
    });

    it('should shorten the tail segment', () => {
      let body = new Body([
        new Segment(a, b),
        new Segment(b, c),
      ]);

      expect(body.shorten().segments.length)
        .toBe(body.segments.length);

      body = body.shorten().shorten().shorten().shorten();

      expect(() => body.shorten())
        .toThrow();
    });
  });

  describe('sanitization', () => {
    const a = new Point(0, 0);
    const b = new Point(0, 2);
    const c = new Point(-4, 4);

    const body = new Body([new Segment(a, b)]);

    it('should connect redundant segments', () => {
      const prolonged = body.prolong().prolong();

      expect(prolonged.segments.length)
        .toBe(3);
      expect(prolonged.sanitize().segments.length)
        .toBe(1);
    });

    it('should remove empty segments', () => {
      const turned = body.turnTo(new Point(-1, 0));
      const shortened = turned.shorten().shorten();

      expect(shortened.segments.length)
        .toBe(2);
      expect(shortened.sanitize().segments.length)
        .toBe(1);
    });
  });

  describe('area', () => {
    it('should calculate correct dimensions', () => {
      const body = new Body([
        new Segment(new Point(-3, 0), new Point(5, 0)),
        new Segment(new Point(5, 0), new Point(5, 3)),
      ]);

      expect(body.width).toBe(8);
      expect(body.height).toBe(3);

      expect(body.dimensions())
        .toEqual([-3, 0, 5, 3]);
    });

    it('should know which points are occupied', () => {
      const body = new Body([
        new Segment(new Point(-1, 1), new Point(3, 1)),
        new Segment(new Point(3, 1), new Point(3, -2)),
        new Segment(new Point(3, -2), new Point(1, -2)),
        new Segment(new Point(1, -2), new Point(1, 1)),
      ]);

      expect(body.occupiedArea())
        .toEqual([
          [0, 0, 1, 1, 1],
          [0, 0, 1, 0, 1],
          [0, 0, 1, 0, 1],
          [1, 1, 2, 1, 1],
        ]);

      const body2 = new Body([
        new Segment(new Point(0, 0), new Point(5, 0)),
        new Segment(new Point(5, 0), new Point(8, 0)),
        new Segment(new Point(8, 0), new Point(8, 3)),
        new Segment(new Point(8, 3), new Point(10, 3)),
        new Segment(new Point(10, 3), new Point(10, 4)),
      ]);

      expect(body2.occupiedArea())
        .toEqual([
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        ]);
    });
  });

  describe('validity', () => {
    const a = new Point(2, 5);
    const b = new Point(4, 5);
    const c = new Point(4, 2);
    const d = new Point(3, 2);

    const connecting_segments = [
      new Segment(a, b),
      new Segment(b, c),
      new Segment(c, d),
    ];

    it('should be valid on connected segments', () => {
      expect(new Body(connecting_segments).isValid())
        .toBe(true);
      expect(new Body(connecting_segments.slice(1)).isValid())
        .toBe(true);
    });

    it('should be invalid on split apart segments', () => {
      expect(new Body([
        connecting_segments[0],
        connecting_segments[2],
      ]).isValid())
        .toBe(false);
    });
  });
});
