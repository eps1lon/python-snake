"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("../Point");
const util_1 = require("../util");
const Segment_1 = require("./Segment");
class Body {
    constructor(body) {
        this.segments = body;
    }
    tail() {
        return this.segments[0];
    }
    head() {
        return this.segments[this.segments.length - 1];
    }
    isValid() {
        // body.skipFirst().every(segment => prev.connectsTo(segment))
        return this.segments
            .every((_, i, body) => i === 0 || body[i - 1].connectsTo(body[i]));
    }
    sanitize() {
        return this.connectReduntant().removeEmpty();
    }
    // removes empty ones: |--->|>|-> => |---->
    removeEmpty() {
        return new Body(this.segments.filter((segment) => segment.isEmpty() === false));
    }
    // connects redundant segments: |--->|--> => |----->
    connectReduntant() {
        let prev = this.tail().norm();
        const connected_segments = [this.tail()];
        for (const segment of this.segments) {
            const cur = segment.norm();
            if (prev !== undefined && cur !== undefined && prev.equals(cur)) {
                const last = connected_segments.length - 1;
                connected_segments[last]
                    = new Segment_1.default(connected_segments[last].start, segment.end);
            }
            else if (cur !== undefined) {
                connected_segments.push(segment);
            }
            prev = cur;
        }
        return new Body(connected_segments);
    }
    prolong() {
        const norm = this.head().norm();
        if (norm === undefined) {
            throw new Error('no direction to grow to');
        }
        return new Body(this.segments.slice().concat(new Segment_1.default(this.head().end, this.head().end.add(norm))));
    }
    shorten() {
        const norm = this.tail().norm();
        if (norm === undefined) {
            throw new Error('no direction to shorten from');
        }
        return new Body([
            new Segment_1.default(this.tail().start.add(norm), this.tail().end),
        ].concat(this.segments.slice(1)));
    }
    turnTo(delta) {
        if (delta.distance(new Point_1.default(0, 0)) !== 1) {
            throw new Error('no normalized delta');
        }
        const norm = this.head().norm();
        if (norm !== undefined && norm.additiveInverseOf(delta) === true) {
            throw new Error('cant grow inwards');
        }
        else {
            return new Body(this.segments.concat(new Segment_1.default(this.head().end, this.head().end.add(delta))));
        }
    }
    dimensions() {
        return this.segments.reduce((dimensions, segment) => {
            return [
                Math.min(dimensions[0], segment.start.x, segment.end.x),
                Math.min(dimensions[1], segment.start.y, segment.end.y),
                Math.max(dimensions[2], segment.start.x, segment.end.x),
                Math.max(dimensions[3], segment.start.y, segment.end.y),
            ];
        }, [
            Number.POSITIVE_INFINITY,
            Number.POSITIVE_INFINITY,
            Number.NEGATIVE_INFINITY,
            Number.NEGATIVE_INFINITY,
        ]);
    }
    get width() {
        const dimensions = this.dimensions();
        return Math.abs(dimensions[2] - dimensions[0]);
    }
    get height() {
        const dimensions = this.dimensions();
        return Math.abs(dimensions[3] - dimensions[1]);
    }
    occupiedArea() {
        const [x0, y0] = this.dimensions();
        const matrix = util_1.buildMatrix(this.width + 1, this.height + 1);
        let prev_end;
        this.segments.forEach((segment) => {
            for (const point of segment.points()) {
                // start and end overlap so discard those
                if (prev_end === undefined || !prev_end.equals(point)) {
                    matrix[point.y - y0][point.x - x0] += 1;
                }
            }
            prev_end = segment.end;
        });
        return matrix;
    }
    offset() {
        const dimensions = this.dimensions();
        return new Point_1.default(dimensions[0], dimensions[1]);
    }
}
exports.default = Body;
