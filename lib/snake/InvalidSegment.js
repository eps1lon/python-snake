"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidSegment extends Error {
    constructor(message) {
        super(`InvalidSegment: ${message}`);
    }
}
exports.default = InvalidSegment;
