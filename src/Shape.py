from abc import ABCMeta, abstractmethod

from .Point import Point

class Shape(metaclass=ABCMeta):
  def __init__(self, width, height):
    self.width = width
    self.height = height

  def pointsList(self):
    points = []

    for row, y in enumerate(self.occupiedArea()):
      for value, x in enumerate(row):
        points.append([Point(x, y).add(self.offset()), value])

    return points

  def filteredPoints(self, fn):
    return map(
      lambda entry: entry[0], 
      filter(
        lambda entry: fn(entry[1]), 
        self.pointsList()
      )
    )

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