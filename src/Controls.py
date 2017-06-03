from abc import ABCMeta, abstractmethod

from src.StoppableThread import StoppableThread

class Controls(StoppableThread, metaclass=ABCMeta):
  @abstractmethod
  def setGame(self, game):
    pass

  @abstractmethod
  def tearDown(self, game):
    pass