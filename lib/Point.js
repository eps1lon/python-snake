"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Point {
    constructor(x, y) {
        this.width = 1;
        this.height = 1;
        this.x = x;
        this.y = y;
    }
    distance(other) {
        return Math.sqrt(Math.pow(Math.abs(this.x - other.x), 2)
            + Math.pow(Math.abs(this.y - other.y), 2));
    }
    add(other) {
        return new Point(this.x + other.x, this.y + other.y);
    }
    sub(other) {
        return new Point(this.x - other.x, this.y - other.y);
    }
    additiveInverseOf(other) {
        return this.add(other).equals(exports.ZERO);
    }
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
    offset() {
        return this;
    }
    occupiedArea() {
        return [[1]];
    }
}
exports.Point = Point;
exports.ZERO = new Point(0, 0);
exports.default = Point;
