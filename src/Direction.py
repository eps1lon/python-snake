from collections import namedtuple

from .Point import Point

Direction = namedtuple('Direction', ['delta', 'left', 'right'])
Orientation = namedtuple('Orientation', ['up', 'right', 'down', 'left'])

"""
point: Point
plane: Orientation
"""
def fromPoint(point, plane):
  for direction in plane._asdict():
    if direction.delta.equals(point):
      return direction

  return None