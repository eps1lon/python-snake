import unittest

from src.Point import Point
from src.Shape import Shape
from src.shapes.SimpleShape import SimpleShape
from src.screen.TorusScreen import TorusScreen


class TestTorusScreen(unittest.TestCase):
  def testInit(self):
    torus = TorusScreen(5, 5)

    self.assertListEqual(
      torus.occupiedArea(), 
      [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]
    )

  def testAdd(self):
    torus = TorusScreen(5, 5)

    line = SimpleShape([[1, 1, 1]], 1, 0)
    torus.addShape(line)

    self.assertListEqual(
      torus.occupiedArea(),
      [
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]
    )

    square = SimpleShape([[1, 1], [1, 1]], 2, 3)
    torus.addShape(square)

    self.assertListEqual(
      torus.occupiedArea(),
      [
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 1, 0],
      ]
    )

    triangle = SimpleShape([[1, 0], [1, 1]], 0, 1)
    torus.addShape(triangle)

    self.assertListEqual(
      torus.occupiedArea(),
      [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 1, 0],
      ]
    )

  def testWrap(self):
    torus = TorusScreen(5, 5)

    torus.addShape(SimpleShape([[1, 1, 1]], 4, 0))

    self.assertListEqual(
      torus.occupiedArea(), 
      [
        [1, 1, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]
    )

    return

    torus.addShape(SimpleShape([[1, 1, 1]], -2, 1))

    self.assertListEqual(
      torus.occupiedArea(),
      [
        [1, 1, 0, 0, 1],
        [1, 0, 0, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]
    )

    torus.addShape(SimpleShape([[1], [1], [1]], -2, 1))

    self.assertListEqual(
      torus.occupiedArea(),
      [
        [1, 1, 0, 0, 1],
        [1, 0, 0, 2, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0],
      ]
    )

    torus.addShape(SimpleShape([[1], [1], [1]], -2, -1))

    self.assertListEqual(
      torus.occupiedArea(),
      [
        [1, 1, 0, 1, 1],
        [1, 0, 0, 3, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0],
      ]
    )

    torus.addShape(SimpleShape([[1], [1], [1], [1]], 1, 3))

    self.assertListEqual(
      torus.occupiedArea(),
      [
        [1, 2, 0, 1, 1],
        [1, 1, 0, 3, 1],
        [0, 0, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
      ]
    )
