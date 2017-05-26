"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("./Point");
const util_1 = require("./util");
class Screen {
    constructor(width, height, map, shapes = []) {
        this.width = width;
        this.height = height;
        this.point_mapping = map;
        this.shapes = shapes;
    }
    offset() {
        return new Point_1.default(0, 0);
    }
    occupiedArea() {
        const { width, height } = this;
        const matrix = util_1.buildMatrix(width, height);
        this.shapes.forEach((shape) => {
            const { x, y } = shape.offset();
            const shape_width = shape.width;
            const shape_height = shape.height;
            shape.occupiedArea().forEach((row, dy) => {
                row.forEach((value, dx) => {
                    const mapped = this.point_mapping(new Point_1.default(x + dx, y + dy), width, height, shape_width, shape_height);
                    matrix[mapped.y][mapped.x] += value;
                });
            });
        });
        return matrix;
    }
    addShape(shape) {
        this.shapes.push(shape);
    }
}
exports.default = Screen;
