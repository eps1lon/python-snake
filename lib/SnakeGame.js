"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TorusScreen_1 = require("./screen/TorusScreen");
const Shape_1 = require("./Shape");
const Snake_1 = require("./Snake");
const util_1 = require("./util");
var Command;
(function (Command) {
    Command[Command["UP"] = 0] = "UP";
    Command[Command["RIGHT"] = 1] = "RIGHT";
    Command[Command["DOWN"] = 2] = "DOWN";
    Command[Command["LEFT"] = 3] = "LEFT";
})(Command = exports.Command || (exports.Command = {}));
class SnakeGame {
    constructor(width = 16, height = 16, snake) {
        this.apples = [];
        this.commands = [];
        if (snake === undefined) {
            snake = new Snake_1.default();
        }
        this.snake = snake;
        this.width = width;
        this.height = height;
    }
    isRunning() {
        return true;
    }
    invoke(cmd) {
        this.commands[0] = cmd;
    }
    executeCommand() {
        if (this.isRunning() === false) {
            throw new Error('game has stopped');
        }
        const old_snake = this.snake;
        const cmd = this.commands.shift();
        switch (cmd) {
            case Command.UP:
                this.snake = this.snake.up();
                break;
            case Command.RIGHT:
                this.snake = this.snake.right();
                break;
            case Command.DOWN:
                this.snake = this.snake.down();
                break;
            case Command.LEFT:
                this.snake = this.snake.left();
                break;
            default:
                this.snake = this.snake.forward();
                break;
        }
    }
    tick() {
        if (this.isRunning() === false) {
            throw new Error('game has stopped');
        }
        const old_snake = this.snake;
        this.executeCommand();
        // ate powerup
    }
    screen() {
        return new TorusScreen_1.default(this.width, this.height, [
            this.snake.body,
            ...this.apples,
        ]);
    }
    collidesWithSnake(point) {
        const withPoint = new TorusScreen_1.default(this.width, this.height, [this.snake.body, point])
            .occupiedArea();
        return (new TorusScreen_1.default(this.width, this.height, [this.snake.body])
            .occupiedArea())
            .every((row, y) => row.every((v, x) => withPoint[y][x] === v));
    }
    // creates a apple at a random pos
    createRandomApple() {
        const candidates = Shape_1.unoccupiedPoints(this.screen());
        if (candidates.length > 0) {
            const index = util_1.rand(0, candidates.length - 1);
            return candidates[index];
        }
        else {
            return undefined;
        }
    }
    // creates an apple infront of the snake
    createTrivialApple() {
        const delta = this.snake.head().norm();
        if (delta !== undefined) {
            const trivial = this.snake.head().end.add(delta);
            if (!this.collidesWithSnake(trivial)) {
                this.apples.push(trivial);
                return trivial;
            }
        }
        return undefined;
    }
    nextCommand() {
        return this.commands[0];
    }
}
exports.default = SnakeGame;
