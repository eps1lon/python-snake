import sys
import curses

from src.Display import Display
from src.Screen import Screen

class ConsoleOut(Display):
  def __init__(self):
    self._calls = 0

    self._stdscr = curses.initscr()

  def show(self, screen: Screen):
    out = str(screen)

    self._stdscr.addstr(1, 0, out)
    self._stdscr.refresh()

    self._calls += 1

  def tearDown(self):
    curses.endwin()

