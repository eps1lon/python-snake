"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("../Point");
describe('Point', () => {
    it('should use euclidian distance', () => {
        expect(new Point_1.Point(0, 0).distance(new Point_1.Point(2, 2)))
            .toBeCloseTo(2.82842712475, 8);
        expect(new Point_1.Point(0, 0).distance(new Point_1.Point(-2, -2)))
            .toBeCloseTo(2.82842712475, 8);
        expect(new Point_1.Point(0, 0).distance(new Point_1.Point(0, 0)))
            .toBeCloseTo(0, 8);
        expect(new Point_1.Point(0, 0).distance(new Point_1.Point(0, 1)))
            .toBeCloseTo(1, 8);
    });
    it('should equal on equal coords', () => {
        expect(new Point_1.Point(0, 0).equals(new Point_1.Point(0, 0)))
            .toBe(true);
        expect(new Point_1.Point(0, 0).equals(new Point_1.Point(1, 0)))
            .toBe(false);
        expect(new Point_1.Point(0, 0).equals(new Point_1.Point(0, 1)))
            .toBe(false);
        expect(new Point_1.Point(0, 0).equals(new Point_1.Point(1, 1)))
            .toBe(false);
    });
    it('should use vector add/sub', () => {
        expect(new Point_1.Point(0, 1).add(new Point_1.Point(1, 0)).equals(new Point_1.Point(1, 1)))
            .toBe(true);
        expect(new Point_1.Point(-1, 1).add(new Point_1.Point(1, 0)).equals(new Point_1.Point(0, 1)))
            .toBe(true);
        expect(new Point_1.Point(-1, 1).sub(new Point_1.Point(1, 0)).equals(new Point_1.Point(-2, 1)))
            .toBe(true);
    });
    it('should check for additive inverse', () => {
        expect(new Point_1.Point(-1, 1).additiveInverseOf(new Point_1.Point(1, -1)))
            .toBe(true);
        expect(new Point_1.Point(-1, 0).additiveInverseOf(new Point_1.Point(1, 0)))
            .toBe(true);
        expect(new Point_1.Point(2, 6).additiveInverseOf(new Point_1.Point(-2, -6)))
            .toBe(true);
    });
    it('should have a shape', () => {
        const shape = new Point_1.Point(-1, 1);
        expect(shape.height).toBe(1);
        expect(shape.width).toBe(1);
        expect(shape.offset().equals(new Point_1.Point(-1, 1))).toBe(true);
        expect(shape.occupiedArea()).toEqual([[1]]);
    });
});
