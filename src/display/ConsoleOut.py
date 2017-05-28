import sys
import curses

from src.Display import Display
from src.Screen import Screen

class ConsoleOut(Display):
  def __init__(self):
    self._calls = 0

  def show(self, screen: Screen):
    out = str(screen)
    # TODO relative movement of cursor
    print("\033[1;1H" + out)

    self._calls += 1

  def tearDown(self):
    pass

