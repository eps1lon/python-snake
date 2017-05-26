"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("../Point");
const ZERO = new Point_1.default(0, 0);
function simpleShape(area) {
    return {
        offset: () => ZERO,
        width: area[0].length,
        height: area.length,
        occupiedArea: () => area,
    };
}
exports.simpleShape = simpleShape;
