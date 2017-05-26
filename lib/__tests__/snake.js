"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("../Point");
const Snake_1 = require("../Snake");
const Body_1 = require("../snake/Body");
const Segment_1 = require("../snake/Segment");
describe('Snake', () => {
    it('should grow headlong', () => {
        let snake = new Snake_1.default(new Body_1.default([
            new Segment_1.default(new Point_1.default(0, 0), new Point_1.default(1, 0)),
        ]));
        snake = snake.grow();
        expect(snake.body.occupiedArea())
            .toEqual([[1, 1, 1]]);
    });
    it('should move up', () => {
        let snake = new Snake_1.default(new Body_1.default([
            new Segment_1.default(new Point_1.default(0, 0), new Point_1.default(3, 0)),
        ]));
        expect(snake.body.occupiedArea())
            .toEqual([
            [1, 1, 1, 1],
        ]);
        snake = snake.up();
        expect(snake.body.occupiedArea())
            .toEqual([
            [0, 0, 1],
            [1, 1, 1],
        ]);
        snake = snake.up();
        expect(snake.body.occupiedArea())
            .toEqual([
            [0, 1],
            [0, 1],
            [1, 1],
        ]);
        snake = snake.up();
        expect(snake.body.occupiedArea())
            .toEqual([
            [1],
            [1],
            [1],
            [1],
        ]);
        snake = snake.up();
        expect(snake.body.occupiedArea())
            .toEqual([
            [1],
            [1],
            [1],
            [1],
        ]);
    });
    it('should move right', () => {
        let snake = new Snake_1.default(new Body_1.default([
            new Segment_1.default(new Point_1.default(0, 0), new Point_1.default(0, 3)),
        ]));
        expect(snake.body.occupiedArea()).toEqual([
            [1],
            [1],
            [1],
            [1],
        ]);
        snake = snake.right();
        expect(snake.body.occupiedArea()).toEqual([
            [1, 0],
            [1, 0],
            [1, 1],
        ]);
        snake = snake.right();
        expect(snake.body.occupiedArea()).toEqual([
            [1, 0, 0],
            [1, 1, 1],
        ]);
        snake = snake.right();
        expect(snake.body.occupiedArea()).toEqual([
            [1, 1, 1, 1],
        ]);
        snake = snake.right();
        expect(snake.body.occupiedArea()).toEqual([
            [1, 1, 1, 1],
        ]);
    });
    it('should move down', () => {
        let snake = new Snake_1.default(new Body_1.default([
            new Segment_1.default(new Point_1.default(0, 0), new Point_1.default(3, 0)),
        ]));
        expect(snake.body.occupiedArea()).toEqual([
            [1, 1, 1, 1],
        ]);
        snake = snake.down();
        expect(snake.body.occupiedArea()).toEqual([
            [1, 1, 1],
            [0, 0, 1],
        ]);
        snake = snake.down();
        expect(snake.body.occupiedArea()).toEqual([
            [1, 1],
            [0, 1],
            [0, 1],
        ]);
        snake = snake.down();
        expect(snake.body.occupiedArea()).toEqual([
            [1],
            [1],
            [1],
            [1],
        ]);
        snake = snake.down();
        expect(snake.body.occupiedArea()).toEqual([
            [1],
            [1],
            [1],
            [1],
        ]);
    });
    it('should move left', () => {
        let snake = new Snake_1.default(new Body_1.default([
            new Segment_1.default(new Point_1.default(0, 0), new Point_1.default(0, 3)),
        ]));
        expect(snake.body.occupiedArea()).toEqual([
            [1],
            [1],
            [1],
            [1],
        ]);
        snake = snake.left();
        expect(snake.body.occupiedArea()).toEqual([
            [0, 1],
            [0, 1],
            [1, 1],
        ]);
        snake = snake.left();
        expect(snake.body.occupiedArea()).toEqual([
            [0, 0, 1],
            [1, 1, 1],
        ]);
        snake = snake.left();
        expect(snake.body.occupiedArea()).toEqual([
            [1, 1, 1, 1],
        ]);
        snake = snake.left();
        expect(snake.body.occupiedArea()).toEqual([
            [1, 1, 1, 1],
        ]);
    });
    it('should move forward', () => {
        let snake = new Snake_1.default().grow().grow().up();
        snake = snake.forward();
        expect(snake.body.occupiedArea()).toEqual([
            [0, 0, 1],
            [0, 0, 1],
            [1, 1, 1],
        ]);
        snake = snake.forward();
        expect(snake.body.occupiedArea()).toEqual([
            [0, 1],
            [0, 1],
            [0, 1],
            [1, 1],
        ]);
        snake = snake.forward();
        expect(snake.body.occupiedArea()).toEqual([
            [1],
            [1],
            [1],
            [1],
            [1],
        ]);
        snake = snake.forward();
        expect(snake.body.occupiedArea()).toEqual([
            [1],
            [1],
            [1],
            [1],
            [1],
        ]);
    });
});
