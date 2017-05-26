"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Direction_1 = require("../Direction");
const plane_1 = require("../plane");
const Point_1 = require("../Point");
describe('Orientation', () => {
    it('should find the directions from the points (delta)', () => {
        expect(Direction_1.fromPoint(new Point_1.default(0, 0), plane_1.default))
            .toBeUndefined();
        expect(Direction_1.fromPoint(new Point_1.default(+1, 0), plane_1.default))
            .toBeDefined();
        expect(Direction_1.fromPoint(new Point_1.default(-1, 0), plane_1.default))
            .toBeDefined();
        expect(Direction_1.fromPoint(new Point_1.default(0, +1), plane_1.default))
            .toBeDefined();
        expect(Direction_1.fromPoint(new Point_1.default(0, -1), plane_1.default))
            .toBeDefined();
    });
    it('should have all arrow keys idents', () => {
        'up right down left'.split(' ').forEach((ident) => {
            expect(Direction_1.isOrientationIdent(ident, plane_1.default))
                .toBe(true);
        });
        expect(Direction_1.isOrientationIdent('non existing', plane_1.default))
            .toBe(false);
        expect(Direction_1.isOrientationIdent('dow', plane_1.default))
            .toBe(false);
    });
});
