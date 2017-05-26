"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plane_1 = require("../../plane");
const Point_1 = require("../../Point");
const Segment_1 = require("../Segment");
describe('Segment', () => {
    it('should not accept diagonals', () => {
        expect(new Segment_1.default(new Point_1.default(0, 0), new Point_1.default(0, 1)))
            .toBeInstanceOf(Segment_1.default);
        expect(new Segment_1.default(new Point_1.default(1, 0), new Point_1.default(2, 0)))
            .toBeInstanceOf(Segment_1.default);
        expect(() => {
            return new Segment_1.default(new Point_1.default(0, 0), new Point_1.default(1, 1));
        }).toThrow('InvalidSegment: no diagonals allowed');
        expect(() => {
            return new Segment_1.default(new Point_1.default(2, 3), new Point_1.default(4, 2));
        }).toThrow('InvalidSegment: no diagonals allowed');
    });
    it('should be empty with zero length', () => {
        expect(new Segment_1.default(new Point_1.default(12, 5), new Point_1.default(12, 5)).isEmpty())
            .toBe(true);
        expect(new Segment_1.default(new Point_1.default(12, 5), new Point_1.default(12, 5.01)).isEmpty())
            .toBe(false);
    });
    it('should have a direction', () => {
        let dir = new Segment_1.default(new Point_1.default(0, 5), new Point_1.default(0, 234)).direction(plane_1.default);
        expect(dir).toBeDefined();
        if (dir !== undefined) {
            expect(dir.delta.equals(new Point_1.default(0, 1)))
                .toBe(true);
        }
        dir = new Segment_1.default(new Point_1.default(0, 5), new Point_1.default(0, -5)).direction(plane_1.default);
        expect(dir).toBeDefined();
        if (dir !== undefined) {
            expect(dir.delta.equals(new Point_1.default(0, -1)))
                .toBe(true);
        }
        dir = new Segment_1.default(new Point_1.default(0, 0), new Point_1.default(-344235, 0)).direction(plane_1.default);
        expect(dir).toBeDefined();
        if (dir !== undefined) {
            expect(dir.delta.equals(new Point_1.default(-1, 0)))
                .toBe(true);
        }
        dir = new Segment_1.default(new Point_1.default(0, 2), new Point_1.default(0, 5)).direction(plane_1.default);
        expect(dir).toBeDefined();
        if (dir !== undefined) {
            expect(dir.delta.equals(new Point_1.default(0, 1)))
                .toBe(true);
        }
    });
    it('should recognize connecting segments', () => {
        const a = new Point_1.default(2, 0);
        const b = new Point_1.default(2, 8);
        const c = new Point_1.default(-3, 8);
        const d = new Point_1.default(-3, 4);
        expect(new Segment_1.default(a, b).connectsTo(new Segment_1.default(b, c)))
            .toBe(true);
        expect(new Segment_1.default(a, b).connectsTo(new Segment_1.default(c, d)))
            .toBe(false);
        expect(new Segment_1.default(b, c).connectsTo(new Segment_1.default(c, d)))
            .toBe(true);
    });
    it('should generate discrete points', () => {
        const orderEqual = (actual, expected) => points.every((point, i) => point.equals(expected[i]));
        let points = [...new Segment_1.default(new Point_1.default(0, 0), new Point_1.default(0, 4)).points()];
        let expected = [
            new Point_1.default(0, 0),
            new Point_1.default(0, 1),
            new Point_1.default(0, 2),
            new Point_1.default(0, 3),
            new Point_1.default(0, 4),
        ];
        expect(orderEqual(points, expected))
            .toBe(true);
        points = [...new Segment_1.default(new Point_1.default(0, 0), new Point_1.default(0, 0)).points()];
        expected = [];
        expect(orderEqual(points, expected))
            .toBe(true);
        points = [...new Segment_1.default(new Point_1.default(0, 0), new Point_1.default(0, 1)).points()];
        expected = [
            new Point_1.default(0, 0),
            new Point_1.default(0, 1),
        ];
        expect(orderEqual(points, expected))
            .toBe(true);
    });
    describe('connection', () => {
        const a = new Point_1.default(2, 1);
        const b = new Point_1.default(2, 5);
        const c = new Point_1.default(-2, 5);
        const d = new Point_1.default(-2, 1);
        it('should connect if end equals start of other', () => {
            expect(new Segment_1.default(a, b).connectsTo(new Segment_1.default(b, c)))
                .toBe(true);
            expect(new Segment_1.default(b, c).connectsTo(new Segment_1.default(c, d)))
                .toBe(true);
            expect(new Segment_1.default(c, d).connectsTo(new Segment_1.default(d, a)))
                .toBe(true);
        });
        it('shouldnt connect if any other points connect', () => {
            expect(new Segment_1.default(a, b).connectsTo(new Segment_1.default(a, d)))
                .toBe(false);
            expect(new Segment_1.default(a, b).connectsTo(new Segment_1.default(c, b)))
                .toBe(false);
            expect(new Segment_1.default(a, b).connectsTo(new Segment_1.default(d, a)))
                .toBe(false);
        });
    });
});
