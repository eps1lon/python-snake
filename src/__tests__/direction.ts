import Direction, {
  fromPoint, isOrientationIdent, Orientation,
} from '../Direction';
import plane from '../plane';
import Point from '../Point';

describe('Orientation', () => {
  it('should find the directions from the points (delta)', () => {
    expect(fromPoint(new Point(0, 0), plane))
      .toBeUndefined();

    expect(fromPoint(new Point(+1, 0), plane))
      .toBeDefined();

    expect(fromPoint(new Point(-1, 0), plane))
      .toBeDefined();

    expect(fromPoint(new Point(0, +1), plane))
      .toBeDefined();

    expect(fromPoint(new Point(0, -1), plane))
      .toBeDefined();
  });

  it('should have all arrow keys idents', () => {
    'up right down left'.split(' ').forEach((ident) => {
      expect(isOrientationIdent(ident, plane))
        .toBe(true);
    });

    expect(isOrientationIdent('non existing', plane))
        .toBe(false);

    expect(isOrientationIdent('dow', plane))
        .toBe(false);
  });
});
