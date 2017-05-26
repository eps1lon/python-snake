import Point from '../../Point';
import Shape from '../../Shape';
import TorusScreen from '../TorusScreen';

const mockShape = (
  area: number[][], x: number, y: number,
  width: number, height: number): Shape => {
  return {
    width, height,
    offset: () => new Point(x, y),
    occupiedArea: () => area,
  } as Shape;
};

describe('TorusScreen', () => {
  it('should init with 0', () => {
    const torus = new TorusScreen(5, 5);

    expect(torus.occupiedArea()).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });

  it('should add shapes', () => {
    const torus = new TorusScreen(5, 5);

    const line = mockShape([[1, 1, 1]], 1, 0, 3, 1);
    torus.addShape(line);

    expect(torus.occupiedArea()).toEqual([
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);

    const square = mockShape([[1, 1], [1, 1]], 2, 3, 2, 2);
    torus.addShape(square);

    expect(torus.occupiedArea()).toEqual([
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0],
    ]);

    const triangle = mockShape([[1, 0], [1, 1]], 0, 1, 2, 2);
    torus.addShape(triangle);

    expect(torus.occupiedArea()).toEqual([
      [0, 1, 1, 1, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0],
    ]);
  });

  it('should wrap coordinates', () => {
    const torus = new TorusScreen(5, 5);

    torus.addShape(mockShape([[1, 1, 1]], 4, 0, 3, 1));

    expect(torus.occupiedArea()).toEqual([
      [1, 1, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);

    torus.addShape(mockShape([[1, 1, 1]], -2, 1, 3, 1));

    expect(torus.occupiedArea()).toEqual([
      [1, 1, 0, 0, 1],
      [1, 0, 0, 1, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);

    torus.addShape(mockShape([[1], [1], [1]], -2, 1, 1, 3));

    expect(torus.occupiedArea()).toEqual([
      [1, 1, 0, 0, 1],
      [1, 0, 0, 2, 1],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0],
    ]);

    torus.addShape(mockShape([[1], [1], [1]], -2, -1, 1, 3));

    expect(torus.occupiedArea()).toEqual([
      [1, 1, 0, 1, 1],
      [1, 0, 0, 3, 1],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
    ]);

    torus.addShape(mockShape([[1], [1], [1], [1]], 1, 3, 1, 3));

    expect(torus.occupiedArea()).toEqual([
      [1, 2, 0, 1, 1],
      [1, 1, 0, 3, 1],
      [0, 0, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
    ]);
  });
});
