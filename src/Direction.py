from namedlist import namedlist

from .Point import Point

Direction = namedlist('Direction', ['delta', 'left', 'right'])
Orientation = namedlist('Orientation', ['up', 'right', 'down', 'left'])

"""
point: Point
plane: Orientation
"""
def fromPoint(point, plane):
  for direction in plane._asdict().values():
    if direction.delta == point:
      return direction

  return None