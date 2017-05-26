import Point from '../Point';
import Snake from '../Snake';
import Body from '../snake/Body';
import Segment from '../snake/Segment';

describe('Snake', () => {
  it('should grow headlong', () => {
    let snake = new Snake(new Body([
      new Segment(new Point(0, 0), new Point(1, 0)),
    ]));

    snake = snake.grow();
    expect(snake.body.occupiedArea())
      .toEqual([[1, 1, 1]]);
  });

  it('should move up', () => {
    let snake = new Snake(new Body([
      new Segment(new Point(0, 0), new Point(3, 0)),
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
    let snake = new Snake(new Body([
      new Segment(new Point(0, 0), new Point(0, 3)),
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
    let snake = new Snake(new Body([
      new Segment(new Point(0, 0), new Point(3, 0)),
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
    let snake = new Snake(new Body([
      new Segment(new Point(0, 0), new Point(0, 3)),
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
    let snake = new Snake().grow().grow().up();

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
