"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plane_1 = require("./plane");
const Point_1 = require("./Point");
const Body_1 = require("./snake/Body");
const Segment_1 = require("./snake/Segment");
const default_body = new Body_1.default([new Segment_1.default(new Point_1.default(0, 0), new Point_1.default(2, 0))]);
class Snake {
    static withDirection(start, dir) {
        return new Snake(new Body_1.default([
            new Segment_1.default(start, start.add(dir.delta)),
        ]));
    }
    constructor(body = default_body) {
        if (body.isValid() === false) {
            throw new Error('segments dont connect');
        }
        this.body = body;
    }
    head() {
        return this.body.head();
    }
    tail() {
        return this.body.tail();
    }
    up() {
        return this.moveTo(plane_1.default.up);
    }
    right() {
        return this.moveTo(plane_1.default.right);
    }
    down() {
        return this.moveTo(plane_1.default.down);
    }
    left() {
        return this.moveTo(plane_1.default.left);
    }
    direction() {
        return this.head().direction(plane_1.default);
    }
    grow() {
        return new Snake(this.body.prolong());
    }
    forward() {
        const dir = this.direction();
        if (dir === undefined) {
            throw new Error('no direction');
        }
        return this.moveTo(dir);
    }
    moveTo(new_dir) {
        const dir = this.direction();
        if (dir === undefined) {
            return Snake.withDirection(this.head().start, plane_1.default.up);
        }
        else if (dir.delta.additiveInverseOf(new_dir.delta) === false) {
            // cant move backwards
            // add to head
            const prolonged_body = this.body.turnTo(new_dir.delta);
            // shorten tail
            const new_body = prolonged_body.shorten();
            return new Snake(new_body.sanitize());
        }
        else {
            return this;
        }
    }
}
exports.default = Snake;
