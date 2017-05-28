import unittest

from src.Direction import Direction, fromPoint, Orientation
from src.plane import plane
from src.Point import Point

class TestOrientation(unittest.TestCase):
  def testFromPoint(self):
    self.assertIsNone(fromPoint(Point(0, 0), plane))

    self.assertIsNotNone(fromPoint(Point(+1, 0), plane))

    self.assertIsNotNone(fromPoint(Point(-1, 0), plane))

    self.assertIsNotNone(fromPoint(Point(0, +1), plane))

    self.assertIsNotNone(fromPoint(Point(0, -1), plane))

  def testArrowKeys(self):
    self.assertIsNotNone(plane.up)
    self.assertIsNotNone(plane.right)
    self.assertIsNotNone(plane.down)
    self.assertIsNotNone(plane.left)
