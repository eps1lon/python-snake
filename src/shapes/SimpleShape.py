from ..Shape import Shape
from ..Point import ZERO

class SimpleShape(Shape):
  def __init__(self, area):
    super().__init__(area[0].length, area.length)

    self.area = area

  def occupiedArea(self):
    return self.area

  def offset(self):
    return ZERO