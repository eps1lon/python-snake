from ..Shape import Shape
from ..Point import Point

class SimpleShape(Shape):
  def __init__(self, area, x0 = 0, y0 = 0):
    super().__init__(len(area[0]), len(area))

    self.area = area
    self._offset = Point(x0, y0)

  def occupiedArea(self):
    return self.area

  def offset(self):
    return self._offset