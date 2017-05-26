"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOrientationIdent = (ident, plane) => Object.keys(plane).indexOf(ident) !== -1;
exports.fromPoint = (point, plane) => {
    const ident = Object.keys(plane).filter((dir) => plane[dir].delta.equals(point))[0];
    if (exports.isOrientationIdent(ident, plane) === true) {
        return plane[ident];
    }
    else {
        return undefined;
    }
};
