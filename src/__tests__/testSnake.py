import unittest

from src.Point import Point
from src.Snake import Snake
from src.snake.Body import Body
from src.snake.Segment import Segment

class TestSnake(unittest.TestCase):
  def testGrowth(self):
    snake = Snake(Body([
      Segment(Point(0, 0), Point(1, 0)),
    ]))

    snake = snake.grow()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [[1, 1, 1]]
    )

  def testUp(self):
    snake = Snake(Body([
      Segment(Point(0, 0), Point(3, 0)),
    ]))

    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [1, 1, 1, 1],
      ]
    )

    snake = snake.up()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [0, 0, 1],
        [1, 1, 1],
      ]
    )

    snake = snake.up()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [0, 1],
        [0, 1],
        [1, 1],
      ]
    )

    snake = snake.up()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [1],
        [1],
        [1],
        [1],
      ]
    )

    snake = snake.up()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [1],
        [1],
        [1],
        [1],
      ]
    )

  def testRight(self):
    snake = Snake(Body([
      Segment(Point(0, 0), Point(0, 3)),
    ]))

    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [1],
        [1],
        [1],
        [1],
      ]
    )

    snake = snake.right()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [1, 0],
        [1, 0],
        [1, 1],
      ]
    )

    snake = snake.right()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [1, 0, 0],
        [1, 1, 1],
      ]
    )

    snake = snake.right()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [1, 1, 1, 1],
      ]
    )

    snake = snake.right()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [1, 1, 1, 1],
      ]
    )

  def testDown(self):
    snake = Snake(Body([
      Segment(Point(0, 0), Point(3, 0)),
    ]))

    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [1, 1, 1, 1],
      ]
    )

    snake = snake.down()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [1, 1, 1],
        [0, 0, 1],
      ]
    )

    snake = snake.down()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [1, 1],
        [0, 1],
        [0, 1],
      ]
    )

    snake = snake.down()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [1],
        [1],
        [1],
        [1],
      ]
    )

    snake = snake.down()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [1],
        [1],
        [1],
        [1],
      ]
    )

  def testLeft(self):
    snake = Snake(Body([
      Segment(Point(0, 0), Point(0, 3)),
    ]))

    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [1],
        [1],
        [1],
        [1],
      ]
    )

    snake = snake.left()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [0, 1],
        [0, 1],
        [1, 1],
      ],
    )

    snake = snake.left()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [0, 0, 1],
        [1, 1, 1],
      ]
    )

    snake = snake.left()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [1, 1, 1, 1],
      ]
    )

    snake = snake.left()
    self.assertListEqual(
      snake.body.occupiedArea(), 
      [
        [1, 1, 1, 1],
      ]
    )

  def testForward(self):
    snake = Snake().grow().grow().up()

    snake = snake.forward()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [0, 0, 1],
        [0, 0, 1],
        [1, 1, 1],
      ]
    )

    snake = snake.forward()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [0, 1],
        [0, 1],
        [0, 1],
        [1, 1],
      ]
    )

    snake = snake.forward()
    self.assertListEqual(
      snake.body.occupiedArea(),
      [
        [1],
        [1],
        [1],
        [1],
        [1],
      ]
    )

    snake = snake.forward()
    self.assertListEqual(
      snake.body.occupiedArea(), 
      [
        [1],
        [1],
        [1],
        [1],
        [1],
      ]
    )