import unittest
from ..Point import Point

class TestPoint(unittest.TestCase):
  def test_euclidian(self):
    self.assertAlmostEqual(
      Point(0, 0).distance(Point(2, 2)),
      2.82842712475
    )

    self.assertAlmostEqual(
      Point(0, 0).distance(Point(-2, -2)),
      2.82842712475
    )

    self.assertAlmostEqual(
      Point(0, 0).distance(Point(0, 0)),
      0
    )

    self.assertAlmostEqual(
      Point(0, 0).distance(Point(0, 1)),
      1
    )

  def testEqual(self):
    self.assertEqual(Point(0, 0), Point(0, 0))

    self.assertNotEqual(Point(0, 0), Point(1, 0))

    self.assertNotEqual(Point(0, 0), Point(0, 1))

    self.assertNotEqual(Point(0, 0), Point(1, 1))