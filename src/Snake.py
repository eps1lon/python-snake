from src.Direction import Direction, Orientation
from src.plane import plane
from src.Point import Point, ZERO
from src.snake.Body import Body
from src.snake.Segment import Segment

default_body = Body([Segment(Point(0, 0), Point(2, 0))])

class InvalidMovement(Exception):
  pass

class Snake(object):
  @staticmethod
  def withDirection(start, dir):
    return Snake.withLength(start, dir, 1)

  @staticmethod
  def withLength(start, dir, length):
    return Snake(Body([
      Segment(start, start.add(Point(dir.delta.x * length, dir.delta.y * length))),
    ]))

  def __init__(self, body = default_body):
    if body.isValid() is False:
      raise Exception('segments dont connect')

    self.body = body

  def mouth(self):
    return self.head().end

  def head(self):
    return self.body.head()

  def tail(self):
    return self.body.tail()

  def up(self):
    return self._moveTo(plane.up)

  def right(self):
    return self._moveTo(plane.right)

  def down(self):
    return self._moveTo(plane.down)

  def left(self):
    return self._moveTo(plane.left)

  def direction(self):
    return self.head().direction(plane)

  def grow(self):
    return Snake(self.body.prolong())

  def forward(self):
    dir = self.direction()

    if dir is None:
      raise Exception('no direction')

    return self._moveTo(dir)

  # private
  def _moveTo(self, new_dir):
    dir = self.direction()

    if dir is None:
      return Snake.withDirection(self.head().start, plane.up)
    elif dir.delta.additiveInverseOf(new_dir.delta) is False:
      # cant move backwards

      # add to head
      prolonged_body = self.body.turnTo(new_dir.delta)

      # shorten tail
      new_body = prolonged_body.shorten()

      return Snake(new_body.sanitize())
    else:
      raise InvalidMovement('no movement backwards allowed')
