import sys, termios

from src.controls.getch import getch
from src.Controls import Controls
from src.SnakeGame import Command

def _worker(controls, **kwargs):
  input = getch()

  if ord(input) == 3:
    raise KeyboardInterrupt()
  else:
    controls.processCommand(input)

class SnakeKeyboardControls(Controls):
  def __init__(self):
    super().__init__(
      target=_worker,
      kwargs={
        'controls': self
      }
    )

    self._old_settings = termios.tcgetattr(sys.stdin)
    self._game = None

  def setGame(self, game):
    self._game = game

  def processCommand(self, char):
    cmd = self.parseCommand(char)

    self._game.invoke(cmd)

  def parseCommand(self, char):
    num = ord(char)

    if num == 119:
      return Command.UP
    elif num == 100:
      return Command.RIGHT
    elif num == 115:
      return Command.DOWN
    elif num == 97:
      return Command.LEFT
    else:
      return None

  def tearDown(self):
    self.stop(blocking=False)
    termios.tcsetattr(sys.stdin, termios.TCSADRAIN, self._old_settings)