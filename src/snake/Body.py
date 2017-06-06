# python >= 3.5
# from math import inf
from functools import reduce

from src.Point import Point
from src.Shape import Shape
from src.util import buildMatrix
from src.snake.Segment import Segment

inf = float('inf')

class Body(Shape):
  def __init__(self, segments):
    if segments is None:
      raise Exception('segments is none')

    self.segments = segments

  def tail(self):
    return self.segments[0]

  def head(self):
    return self.segments[-1]

  def isValid(self):
    body = self.segments
    # body.skipFirst().every(segment => prev.connectsTo(segment))
    return all(body[i - 1].connectsTo(body[i]) for i in range(1, len(body)))

  def sanitize(self):
    return self.connectReduntant().removeEmpty()

  # removes empty ones: |--->|>|-> => |---->
  def removeEmpty(self): 
    # dont filter empty if only consisting of single segment
    if len(self.segments) <= 1:
      # return copy of segments
      return Body(list(self.segments))
    else:
      return Body(list(filter(
        lambda segment: segment.isEmpty() == False,
        self.segments
      )))

  # connects redundant segments: |--->|--> => |----->
  def connectReduntant(self):
    prev = self.tail().norm()
    connected_segments = [self.tail()]

    for segment in self.segments:
      cur = segment.norm()

      if prev is not None and cur is not None and prev == cur:
        last = len(connected_segments) - 1
        connected_segments[last] = (
          Segment(connected_segments[last].start, segment.end)
        )
      elif cur is not None:
        connected_segments.append(segment)

      prev = cur

    return Body(connected_segments)

  def prolong(self):
    norm = self.head().norm()

    if norm is None:
      raise Exception('no direction to grow to')

    return Body(
      self.segments
      + [Segment(self.head().end, self.head().end.add(norm))]
    )

  def shorten(self):
    norm = self.tail().norm()

    if norm is None:
      raise Exception('no direction to shorten from')

    return Body([
      Segment(self.tail().start.add(norm), self.tail().end),
    ] + self.segments[1:])

  def turnTo(self, delta):
    if delta.distance(Point(0, 0)) != 1:
      raise Exception('no normalized delta')

    norm = self.head().norm()

    if norm is not None and norm.additiveInverseOf(delta) is True:
      raise Exception('cant grow inwards')
    else:
      return Body(self.segments + [Segment(
        self.head().end,
        self.head().end.add(delta),
      )])

  def turnTailTo(self, delta):
    if delta.distance(Point(0, 0)) != 1:
      raise Exception('no normalized delta')

    norm = self.tail().norm()

    if norm is not None and norm == delta is True:
      raise Exception('cant grow inwards')
    else:
      return Body([Segment(
        self.tail().start.add(delta),
        self.tail().start
      )] + self.segments)

  def dimensions(self):
    def reduceDimensions(dimensions, segment):
      return [
        min(dimensions[0], segment.start.x, segment.end.x),
        min(dimensions[1], segment.start.y, segment.end.y),
        max(dimensions[2], segment.start.x, segment.end.x),
        max(dimensions[3], segment.start.y, segment.end.y)
      ]

    return reduce(reduceDimensions, self.segments, [inf, inf, -inf, -inf])

  @property
  def width(self):
    dimensions = self.dimensions()
    return abs(dimensions[2] - dimensions[0])

  @property
  def height(self):
    dimensions = self.dimensions()
    return abs(dimensions[3] - dimensions[1])

  def occupiedArea(self):
    x0, y0, *rest = self.dimensions()

    matrix = buildMatrix(self.width + 1, self.height + 1)

    prev_end = None
    for segment in self.segments:
      for point in segment.points():
        # start and end overlap so discard those
        if prev_end is None or prev_end != point:
          matrix[int(point.y - y0)][int(point.x - x0)] += 1

      prev_end = segment.end

    return matrix

  def offset(self):
    dimensions = self.dimensions()
    return Point(dimensions[0], dimensions[1])
  
  def length(self):
    return len([value for point, value in self.pointsList() if value > 0])  