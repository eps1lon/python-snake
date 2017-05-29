import sys
import curses

from src.Display import Display
from src.Screen import Screen

class ConsoleOut(Display):
  def __init__(self):
    self._stdscr = curses.initscr()

  def debug(self, text):
    # clear old
    self._stdscr.addstr(0, 0, ' ' * 20)

    self._stdscr.addstr(0, 0, text)
    self._stdscr.refresh()

  def show(self, screen: Screen):
    out = str(screen)

    self._stdscr.addstr(1, 0, out)
    self._stdscr.refresh()

  def tearDown(self):
    curses.endwin()

