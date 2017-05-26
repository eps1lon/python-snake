"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMatrix = (width, height) => {
    return [...new Array(height)]
        .map((row) => [...new Array(width)].map(() => 0));
};
exports.flatten = (deep) => deep.reduce((flat, elem) => flat.concat(Array.isArray(elem) ? exports.flatten(elem) : elem));
exports.rand = (min, max) => Math.round(Math.abs(max - min) * Math.random() + min);
