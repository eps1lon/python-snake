from abc import ABCMeta, abstractmethod

from .Point import Point

class Shape(metaclass=ABCMeta):
  def __init__(self, width, height):
    self.width = width
    self.height = height

  def pointsList(self):
    points = []

    for y, row in enumerate(self.occupiedArea()):
      for x, value in enumerate(row):
        points.append((Point(x, y).add(self.offset()), value))

    return points

  def filteredPoints(self, fn):
    return list(entry[0] for entry in self.pointsList() if fn(entry[1]))

  def occupiedPoints(self):
    return self.filteredPoints(lambda value: value > 0)

  def unoccupiedPoints(self):
    return self.filteredPoints(lambda value: value == 0)

  @abstractmethod
  def offset(self):
    pass

  @abstractmethod
  def occupiedArea(self):
    pass

  def __str__(self):
    return '\n'.join(''.join(str(v) for v in row) for row in self.occupiedArea())

  def __repr__(self):
    return str(self)