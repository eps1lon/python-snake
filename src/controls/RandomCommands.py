from src.Controls import Controls
from src.SnakeGame import Command
from src.util import rand

def _worker(controls):
  # dont do anything, just wait for stop
  controls.wait()

def randomMovement(game):
  cmd = [
    Command.UP,
    Command.RIGHT,
    Command.DOWN,
    Command.LEFT,
  ][rand(0, 3)]

  game.invoke(cmd)

class RandomCommands(Controls):
  def __init__(self):
    super().__init__(
      target=_worker,
      kwargs={
        'controls': self
      }
    )

  def start(self):
    self._game.onBeforeTick = randomMovement

  def stop(self, blocking=True):
    super().stop(blocking)

    self._game.onBeforeTick = lambda game: None

  def setGame(self, game):
    self._game = game

  def tearDown(self):
    self.stop(blocking=False)