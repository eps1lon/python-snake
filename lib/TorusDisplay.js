import Point from './Point';
import { buildMatrix } from './util';
const torusMod = (n, size) => n < 0 ? size - Math.abs(n) % size : n % size;
class TorusDisplay {
    constructor(width, height, shapes = []) {
        this.shapes = shapes;
        this.width = width;
        this.height = height;
    }
    display(shape) {
        return new TorusDisplay(this.width, this.height, this.shapes.concat(shape));
    }
    occupiedArea() {
        const { width, height } = this;
        const matrix = buildMatrix(width, height);
        this.shapes.forEach((shape) => {
            const { x, y } = shape.offset();
            shape.occupiedArea().forEach((row, dy) => {
                row.forEach((value, dx) => {
                    matrix[torusMod(y + dy, height)][torusMod(x + dx, width)] += value;
                });
            });
        });
        return matrix;
    }
    offset() {
        return new Point(0, 0);
    }
}
export default TorusDisplay;
