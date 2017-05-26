"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("../../Point");
const TorusScreen_1 = require("../TorusScreen");
const mockShape = (area, x, y, width, height) => {
    return {
        width, height,
        offset: () => new Point_1.default(x, y),
        occupiedArea: () => area,
    };
};
describe('TorusScreen', () => {
    it('should init with 0', () => {
        const torus = new TorusScreen_1.default(5, 5);
        expect(torus.occupiedArea()).toEqual([
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]);
    });
    it('should add shapes', () => {
        const torus = new TorusScreen_1.default(5, 5);
        const line = mockShape([[1, 1, 1]], 1, 0, 3, 1);
        torus.addShape(line);
        expect(torus.occupiedArea()).toEqual([
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]);
        const square = mockShape([[1, 1], [1, 1]], 2, 3, 2, 2);
        torus.addShape(square);
        expect(torus.occupiedArea()).toEqual([
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 0, 1, 1, 0],
        ]);
        const triangle = mockShape([[1, 0], [1, 1]], 0, 1, 2, 2);
        torus.addShape(triangle);
        expect(torus.occupiedArea()).toEqual([
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 0, 1, 1, 0],
        ]);
    });
    it('should wrap coordinates', () => {
        const torus = new TorusScreen_1.default(5, 5);
        torus.addShape(mockShape([[1, 1, 1]], 4, 0, 3, 1));
        expect(torus.occupiedArea()).toEqual([
            [1, 1, 0, 0, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]);
        torus.addShape(mockShape([[1, 1, 1]], -2, 1, 3, 1));
        expect(torus.occupiedArea()).toEqual([
            [1, 1, 0, 0, 1],
            [1, 0, 0, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]);
        torus.addShape(mockShape([[1], [1], [1]], -2, 1, 1, 3));
        expect(torus.occupiedArea()).toEqual([
            [1, 1, 0, 0, 1],
            [1, 0, 0, 2, 1],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0],
        ]);
        torus.addShape(mockShape([[1], [1], [1]], -2, -1, 1, 3));
        expect(torus.occupiedArea()).toEqual([
            [1, 1, 0, 1, 1],
            [1, 0, 0, 3, 1],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0],
        ]);
        torus.addShape(mockShape([[1], [1], [1], [1]], 1, 3, 1, 3));
        expect(torus.occupiedArea()).toEqual([
            [1, 2, 0, 1, 1],
            [1, 1, 0, 3, 1],
            [0, 0, 0, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0],
        ]);
    });
});
