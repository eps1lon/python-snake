from ..Point import Point, ZERO
from ..Direction import Direction, fromPoint

class InvalidSegment(Exception):
  pass

class Segment(object):
  def __init__(self, start, end):
    self.start = start
    self.end = end

    if self.start.x != self.end.x and self.start.y != self.end.y:
      raise InvalidSegment('no diagonals allowed')

  def length(self):
    return self.start.distance(self.end)

  def isEmpty(self):
    return self.length() == 0.0

  def norm(self):
    x_length = self.end.x - self.start.x
    y_length = self.end.y - self.start.y

    if x_length != 0:
      return Point(abs(x_length) / x_length, 0)
    elif y_length != 0:
      return Point(0, abs(y_length) / y_length)
    else:
      return None

  def direction(self, plane):
    point = self.norm()

    if point is not None:
      return fromPoint(point, plane)
    else:
      return None

  def connectsTo(self, other):
    return self.end == other.start

  def __eq__(self, other):
    if type(self) is type(other):
      return self.start == other.start and self.end ==  other.end
    else:
      return False

  def points(self):
    norm = self.norm()

    if norm is not None and norm.distance(ZERO) == 1:
      cur = self.start

      while cur != self.end:
        yield cur
        cur = cur.add(norm)

      yield cur; # last point

  def __str__(self):
    return '{}--{}'.format(str(self.start), str(self.end))

  def __repr__(self):
    return str(self)