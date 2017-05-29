from abc import ABCMeta, abstractmethod

class Display(metaclass=ABCMeta):
  @abstractmethod
  def show(self, screen):
    pass

  @abstractmethod
  def debug(self, text):
    pass

  @abstractmethod
  def tearDown(self):
    pass