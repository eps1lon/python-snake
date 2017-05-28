import unittest

from src.plane import plane
from src.Point import Point
from src.snake.Segment import Segment, InvalidSegment

class TestSegment(unittest.TestCase):
  def testDiagonals(self):
    self.assertIsInstance(
      Segment(Point(0, 0), Point(0, 1)),
      Segment
    )

    self.assertIsInstance(
      Segment(Point(1, 0), Point(2, 0)),
      Segment
    )

    with self.assertRaises(InvalidSegment):
      Segment(Point(0, 0), Point(1, 1))

    with self.assertRaises(InvalidSegment):
      Segment(Point(2, 3), Point(4, 2))

  def testEmpty(self):
    self.assertTrue(Segment(Point(12, 5), Point(12, 5)).isEmpty())

    self.assertFalse(Segment(Point(12, 5), Point(12, 5.01)).isEmpty())

  def testDirection(self):
    dir = Segment(Point(0, 5), Point(0, 234)).direction(plane)

    self.assertIsNotNone(dir)
    self.assertTrue(dir.delta == Point(0, 1))

    dir = Segment(Point(0, 5), Point(0, -5)).direction(plane)

    self.assertIsNotNone(dir)
    self.assertTrue(dir.delta == Point(0, -1))

    dir = Segment(Point(0, 0), Point(-344235, 0)).direction(plane)

    self.assertIsNotNone(dir)
    self.assertTrue(dir.delta == Point(-1, 0))

    dir = Segment(Point(0, 2), Point(0, 5)).direction(plane)

    self.assertIsNotNone(dir)
    self.assertTrue(dir.delta == Point(0, 1))

  def testConnection(self):
    """
      it should recognize connecting segments
    """
    a = Point(2, 0)
    b = Point(2, 8)
    c = Point(-3, 8)
    d = Point(-3, 4)

    self.assertTrue(Segment(a, b).connectsTo(Segment(b, c)))

    self.assertFalse(Segment(a, b).connectsTo(Segment(c, d)))

    self.assertTrue(Segment(b, c).connectsTo(Segment(c, d)))

    a = Point(2, 1)
    b = Point(2, 5)
    c = Point(-2, 5)
    d = Point(-2, 1)

    """
      it should connect if end equals start of other
    """
    self.assertTrue(Segment(a, b).connectsTo(Segment(b, c)))
    self.assertTrue(Segment(b, c).connectsTo(Segment(c, d)))
    self.assertTrue(Segment(c, d).connectsTo(Segment(d, a)))

    """
      it shouldnt connect if any other points connect
    """
    self.assertFalse(Segment(a, b).connectsTo(Segment(a, d)))
    self.assertFalse(Segment(a, b).connectsTo(Segment(c, b)))
    self.assertFalse(Segment(a, b).connectsTo(Segment(d, a)))

  def testPoints(self):
    self.assertListEqual(
      list(Segment(Point(0, 0), Point(0, 4)).points()),
      [
        Point(0, 0),
        Point(0, 1),
        Point(0, 2),
        Point(0, 3),
        Point(0, 4),
      ]
    )

    self.assertListEqual(
      list(Segment(Point(0, 0), Point(0, 0)).points()),
      []
    )

    self.assertListEqual(
      list(Segment(Point(0, 0), Point(0, 1)).points()),
      [
        Point(0, 0),
        Point(0, 1)
      ]
    )