from src.Point import Point
from src.Screen import Screen
from src.Shape import Shape

def torusMod(n, size):
  if n < 0:
    return size - abs(n) % size
  else:
    return n % size

def torusMap(point, screen_width, screen_height, *_):
  return Point(
    torusMod(point.x, screen_width),
    torusMod(point.y, screen_height)
  )

class TorusScreen(Screen):
  def __init__(self, width, height, shapes = None):
    super().__init__(width, height, torusMap, shapes)

  def __str__(self):
    return '\n'.join(''.join(row) for row in self.occupiedArea())

  def __repr__(self):
    return str(self)