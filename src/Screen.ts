import Point from './Point';
import Shape from './Shape';
import { buildMatrix } from './util';

export type ScreenMapper = (
  p: Point,
  screen_width: number,
  screen_height: number,
  shape_width: number,
  shape_height: number,
) => Point;

class Screen implements Shape {
  public readonly width: number;
  public readonly height: number;
  private shapes: Shape[];
  private point_mapping: ScreenMapper;

  constructor(
    width: number, height: number,
    map: ScreenMapper,
    shapes: Shape[] = []) {
    this.width = width;
    this.height = height;
    this.point_mapping = map;
    this.shapes = shapes;
  }

  public offset(): Point {
    return new Point(0, 0);
  }

  public occupiedArea(): number[][] {
    const { width, height } = this;
    const matrix = buildMatrix(width, height);

    this.shapes.forEach((shape) => {
      const { x, y } = shape.offset();
      const shape_width = shape.width;
      const shape_height = shape.height;

      shape.occupiedArea().forEach((row, dy) => {
        row.forEach((value, dx) => {
          const mapped = this.point_mapping(
            new Point(x + dx, y + dy),
            width, height,
            shape_width, shape_height,
          );

          matrix[mapped.y][mapped.x] += value;
        });
      });
    });

    return matrix;
  }

  public addShape(shape: Shape) {
    this.shapes.push(shape);
  }
}

export default Screen;
