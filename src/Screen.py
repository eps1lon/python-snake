from src.Point import Point
from src.Shape import Shape
from src.util import buildMatrix

class Screen(Shape):
  def __init__(self, width, height, map, shapes):
    self.width = width
    self.height = height
    self._point_mapping = map

    # putting a list as default shares the pointer to that list
    # among all instances
    if shapes is None:
      self._shapes = []
    else:
      self._shapes = shapes

  def offset(self):
    return Point(0, 0)

  def occupiedArea(self):
    width = self.width
    height = self.height
    matrix = buildMatrix(width, height)

    for shape in self._shapes:
      offset = shape.offset()
      x = offset.x
      y = offset.y
      shape_width = shape.width
      shape_height = shape.height

      for dy, row in enumerate(shape.occupiedArea()):
        for dx, value in enumerate(row):
          mapped = self._point_mapping(
            Point(x + dx, y + dy),
            width, height,
            shape_width, shape_height,
          )

          matrix[mapped.y][mapped.x] += value

    return matrix

  def addShape(self, shape):
    self._shapes.append(shape)
