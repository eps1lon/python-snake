from abc import ABCMeta, abstractmethod

class Display(metaclass=ABCMeta):
  @abstractmethod
  def show(self, screen):
    pass

  @abstractmethod
  def tearDown(self):
    pass