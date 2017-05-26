"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Direction_1 = require("../Direction");
const Point_1 = require("../Point");
const InvalidSegment_1 = require("./InvalidSegment");
class Segment {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        if (this.start.x !== this.end.x && this.start.y !== this.end.y) {
            throw new InvalidSegment_1.default('no diagonals allowed');
        }
    }
    length() {
        return this.start.distance(this.end);
    }
    isEmpty() {
        return this.length() === 0;
    }
    direction(plane) {
        const point = this.norm();
        if (point !== undefined) {
            return Direction_1.fromPoint(point, plane);
        }
        else {
            return undefined;
        }
    }
    norm() {
        const x_length = this.end.x - this.start.x;
        const y_length = this.end.y - this.start.y;
        if (x_length) {
            return new Point_1.default(Math.abs(x_length) / x_length, 0);
        }
        else if (y_length) {
            return new Point_1.default(0, Math.abs(y_length) / y_length);
        }
        else {
            return undefined;
        }
    }
    connectsTo(other) {
        return this.end.equals(other.start);
    }
    equals(other) {
        return this.start.equals(other.start)
            && this.end.equals(other.end);
    }
    *points() {
        const norm = this.norm();
        if (norm !== undefined && norm.distance(new Point_1.default(0, 0)) === 1) {
            let cur = this.start;
            while (cur.equals(this.end) === false) {
                yield cur;
                cur = cur.add(norm);
            }
            yield cur; // last point
        }
    }
}
exports.default = Segment;
