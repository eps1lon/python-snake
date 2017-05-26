"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("./Point");
exports.pointsList = (shape) => {
    const points = [];
    shape.occupiedArea().forEach((row, y) => row.forEach((value, x) => {
        points.push([new Point_1.default(x, y).add(shape.offset()), value]);
    }));
    return points;
};
exports.filteredPoints = (fn, shape) => {
    return exports.pointsList(shape)
        .filter((entry) => fn(entry[1]))
        .map((entry) => entry[0]);
};
exports.occupiedPoints = (shape) => {
    return exports.filteredPoints((value) => value > 0, shape);
};
exports.unoccupiedPoints = (shape) => {
    return exports.filteredPoints((value) => value === 0, shape);
};
