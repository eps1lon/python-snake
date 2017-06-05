import unittest

from src.snake.Body import Body
from src.snake.Segment import Segment
from src.Point import Point

class TestHeadTail(unittest.TestCase):
  def setUp(self):
    self.a = Point(0, 0)
    self.b = Point(0, 2)
    self.c = Point(-4, 2)
    self.d = Point(-4, 8)

    self.A = Segment(self.a, self.b)
    self.B = Segment(self.b, self.c)
    self.C = Segment(self.c, self.d)

  def testHead(self):
    self.assertEqual(Body([self.A]).head(), self.A)
    self.assertEqual(Body([self.B, self.C]).head(), self.C)
    self.assertEqual(Body([self.A, self.B, self.C]).head(), self.C)

  def testTails(self):
    self.assertEqual(Body([self.A]).tail(), self.A)
    self.assertEqual(Body([self.A, self.B]).tail(), self.A)
    self.assertEqual(Body([self.A, self.B, self.C]).tail(), self.A)

  def testSingle(self):
    body = Body([self.A])
    self.assertEqual(body.head(), body.tail())

    body = Body([self.A, self.B, self.C])
    self.assertNotEqual(body.head(), body.tail())

class TestGrowth(unittest.TestCase):
  def setUp(self):
    self.a = Point(0, 0)
    self.b = Point(0, 2)
    self.c = Point(-4, 4)

  def testNormalizedDelta(self):
    with self.assertRaises(Exception):
      Body([Segment(self.a, self.b)]).turnTo(Point(0, 2))

  def testGrowthInwards(self):
    body = Body([Segment(self.a, self.b)])
    inverse_norm = Segment(self.b, self.a).norm()

    self.assertIsNotNone(inverse_norm)
    with self.assertRaises(Exception):
      body.turnTo(inverse_norm)

  def testProlong(self):
    body = Body([Segment(self.a, self.b)])

    body = body.prolong()
    self.assertEqual(len(body.segments), 2)
    self.assertEqual(body.head(), Segment(self.b, Point(0, 3)))

    body = body.prolong()
    self.assertEqual(len(body.segments), 3)
    self.assertEqual(body.head(), Segment(Point(0, 3), Point(0, 4)))

    # turn
    body = body.turnTo(Point(-1, 0))

    body = body.prolong()
    body = body.prolong()
    body = body.prolong()

    self.assertEqual(body.head().end, self.c)

class TestShrinking(unittest.TestCase):
  def setUp(self):
    self.a = Point(0, 0)
    self.b = Point(0, 4)
    self.c = Point(-4, 4)

  def testEmptyTail(self):
    with self.assertRaises(Exception):
      Body([Segment(self.a, self.a)]).shorten()

  def testShorten(self):
    body = Body([
      Segment(self.a, self.b),
      Segment(self.b, self.c),
    ])

    self.assertEqual(
      len(body.shorten().segments),
      len(body.segments)
    )

    body = body.shorten().shorten().shorten().shorten()

    with self.assertRaises(Exception):
      body.shorten()

class TestSanitization(unittest.TestCase):
  def setUp(self):
    self.a = Point(0, 0)
    self.b = Point(0, 2)
    self.c = Point(-4, 4)

    self.body = Body([Segment(self.a, self.b)])

  def testConnectRedundant(self):
    prolonged = self.body.prolong().prolong()

    self.assertEqual(len(prolonged.segments), 3)
    self.assertEqual(len(prolonged.sanitize().segments), 1)

  def testEmptyRemoval(self):
    turned = self.body.turnTo(Point(-1, 0))
    shortened = turned.shorten().shorten()

    self.assertEqual(len(shortened.segments), 2)
    self.assertEqual(len(shortened.sanitize().segments), 1)

class TestArea(unittest.TestCase):
  def testDimensions(self):
    body = Body([
      Segment(Point(-3, 0), Point(5, 0)),
      Segment(Point(5, 0), Point(5, 3)),
    ])

    self.assertEqual(body.width, 8)
    self.assertEqual(body.height, 3)

    self.assertListEqual(
      body.dimensions(),
      [-3, 0, 5, 3]
    )

  def testOccupiedArea(self):
    body = Body([
      Segment(Point(-1, 1), Point(3, 1)),
      Segment(Point(3, 1), Point(3, -2)),
      Segment(Point(3, -2), Point(1, -2)),
      Segment(Point(1, -2), Point(1, 1)),
    ])

    self.assertListEqual(
      body.occupiedArea(),
      [
        [0, 0, 1, 1, 1],
        [0, 0, 1, 0, 1],
        [0, 0, 1, 0, 1],
        [1, 1, 2, 1, 1],
      ]
    )

    body2 = Body([
      Segment(Point(0, 0), Point(5, 0)),
      Segment( Point(5, 0), Point(8, 0)),
      Segment(Point(8, 0), Point(8, 3)),
      Segment(Point(8, 3), Point(10, 3)),
      Segment(Point(10, 3), Point(10, 4)),
    ])

    self.assertListEqual(
      body2.occupiedArea(),
      [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      ]
    )

class TestValidity(unittest.TestCase):
  def setUp(self):
    self.a = Point(2, 5)
    self.b = Point(4, 5)
    self.c = Point(4, 2)
    self.d = Point(3, 2)

    self.connecting_segments = [
      Segment(self.a, self.b),
      Segment(self.b, self.c),
      Segment(self.c, self.d),
    ]

  def testConnected(self):
    self.assertTrue(Body(self.connecting_segments).isValid())
    self.assertTrue(Body(self.connecting_segments[1:]).isValid())

  def testSplitApart(self):
    self.assertFalse(Body([
      self.connecting_segments[0],
      self.connecting_segments[2],
    ]).isValid())

  def testCollision(self):
    a = Point(0, 0)
    b = Point(2, 0)
    c = Point(2, 2)
    d = Point(0, 2)

    self.assertFalse(Body([
      Segment(a, b),
      Segment(b, c),
      Segment(c, d),
    ]).collidesWithItself())

    self.assertTrue(Body([
      Segment(a, b),
      Segment(b, c),
      Segment(c, d),
      Segment(d, a),
    ]).collidesWithItself())