import math

class Point(object):
  def __init__(self, x, y):
    self.width = 1
    self.height = 1

    self.x = x
    self.y = y

  def distance(self, other):
    return math.sqrt(
        abs(self.x - other.x) ** 2
        + abs(self.y - other.y) ** 2,
    )

  def add(self, other):
    return Point(self.x + other.x, self.y + other.y)

  def sub(self, other):
    return Point(self.x - other.x, self.y - other.y)

  def additiveInverseOf(self, other):
    return self.add(other).equals(ZERO)

  def __eq__(self, other):
    if type(self) is type(other):
      return self.x == other.x and self.y == other.y
    else:
      return False

  def offset(self):
    return self

  def occupiedArea(self):
    return [[1]]

ZERO = Point(0, 0)
