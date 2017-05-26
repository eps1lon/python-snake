"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("../Point");
const Screen_1 = require("../Screen");
const torusMod = (n, size) => n < 0 ? size - Math.abs(n) % size : n % size;
class TorusScreen extends Screen_1.default {
    constructor(width, height, shapes = []) {
        super(width, height, (point, screen_width, screen_height) => new Point_1.default(torusMod(point.x, screen_width), torusMod(point.y, screen_height)), shapes);
    }
    toString() {
        return this.occupiedArea().map((row) => row.join('')).join('\n');
    }
}
exports.default = TorusScreen;
