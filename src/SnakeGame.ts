import Display from './Display';
import Point from './Point';
import Screen from './Screen';
import TorusScreen from './screen/TorusScreen';
import { unoccupiedPoints } from './Shape';
import Snake from './Snake';
import { rand } from './util';

export enum Command {
  UP, RIGHT, DOWN, LEFT,
}

class SnakeGame {
  public readonly width: number;
  public readonly height: number;
  private snake: Snake;
  private apples: Point[] = [];
  private commands: Command[] = [];

  constructor(width: number = 16, height: number = 16, snake?: Snake) {
    if (snake === undefined) {
      snake = new Snake();
    }

    this.snake = snake;
    this.width = width;
    this.height = height;
  }

  public isRunning() {
    return true;
  }

  public invoke(cmd: Command): void {
    this.commands[0] = cmd;
  }

  public executeCommand(): void {
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

  public tick(): void {
    if (this.isRunning() === false) {
      throw new Error('game has stopped');
    }

    const old_snake = this.snake;

    this.executeCommand();

    // ate powerup
  }

  public screen(): Screen {
    return new TorusScreen(this.width, this.height, [
      this.snake.body,
      ...this.apples,
    ]);
  }

  public collidesWithSnake(point: Point) {
    const withPoint
      = new TorusScreen(this.width, this.height, [this.snake.body, point])
        .occupiedArea();
    return (new TorusScreen(this.width, this.height, [this.snake.body])
      .occupiedArea())
      .every((row, y) => row.every((v, x) => withPoint[y][x] === v));
  }

  // creates a apple at a random pos
  public createRandomApple(): Point | undefined {
    const candidates = unoccupiedPoints(this.screen());

    if (candidates.length > 0) {
      const index = rand(0, candidates.length - 1);
      return candidates[index];
    } else {
      return undefined;
    }
  }

  // creates an apple infront of the snake
  public createTrivialApple(): Point | undefined {
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

  public nextCommand(): Command | undefined {
    return this.commands[0];
  }
}

export default SnakeGame;
