import Point from './Point';
import Screen from './Screen';
import Snake from './Snake';
export declare enum Command {
    UP = 0,
    RIGHT = 1,
    DOWN = 2,
    LEFT = 3,
}
declare class SnakeGame {
    readonly width: number;
    readonly height: number;
    private snake;
    private apples;
    private commands;
    constructor(width?: number, height?: number, snake?: Snake);
    isRunning(): boolean;
    invoke(cmd: Command): void;
    executeCommand(): void;
    tick(): void;
    screen(): Screen;
    collidesWithSnake(point: Point): boolean;
    createRandomApple(): Point | undefined;
    createTrivialApple(): Point | undefined;
    nextCommand(): Command | undefined;
}
export default SnakeGame;
