"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("./Point");
const plane = {
    up: { delta: new Point_1.default(0, -1) },
    right: { delta: new Point_1.default(+1, 0) },
    down: { delta: new Point_1.default(0, +1) },
    left: { delta: new Point_1.default(-1, 0) },
};
plane.up.right = plane.right;
plane.right.right = plane.down;
plane.down.right = plane.left;
plane.left.right = plane.up;
plane.up.left = plane.left;
plane.left.left = plane.down;
plane.down.left = plane.right;
plane.right.left = plane.up;
exports.default = plane;
