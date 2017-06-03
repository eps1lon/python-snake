from enum import Enum
from threading import Lock

from src.StoppableThread import StoppableThread
from src.Display import Display
from src.display.NullDisplay import NullDisplay
from src.Controls import Controls
from src.controls.NullControls import NullControls
from src.Point import Point
from src.Screen import Screen
from src.screen.TorusScreen import TorusScreen
from src.Snake import Snake, InvalidMovement
from src.util import rand

CHANCE_MAX_ROLL = 1e9
MAX_APPLES = 1

# default config
DEFAULT_TICKS_PER_SECOND = 5
DEFAULT_APPLE_CHANCE = CHANCE_MAX_ROLL # 100%

inf = float('inf')

def _game_worker(game):
  if game.ticks_ran >= game.run_for_ticks:
    # dont block or we will deadlock ourselve
    game.stop(blocking=False)
  else:
    game.tick()
    game.ticks_ran += 1

    game.wait(game._speed)

class Command(Enum):
  UP = 0
  RIGHT = 1
  DOWN = 2
  LEFT = 3

class SnakeGame(StoppableThread):
  def __init__(self, snake = None, width = 16, height = 16):
    super().__init__(
      target=_game_worker,
      kwargs={
        'game': self
      }
    )

    if snake is None:
      snake = Snake()
    
    self._setUpThreads()
    self._setUpCallbacks()

    self.snake = snake
    self.width = width
    self.height = height

    self.commands = []
    self.apples = []

    self.setDisplay(NullDisplay())
    self.setControls(NullControls())
    self.setTicksPerSecond(DEFAULT_TICKS_PER_SECOND)
    self.setAppleChance(DEFAULT_APPLE_CHANCE)

  def _setUpThreads(self):
    self.command_lock = Lock()

  def _setUpCallbacks(self):
    self.onBeforeTick = lambda game: None

  def start(self, for_ticks = inf):
    super().stop(blocking=True)

    self.run_for_ticks = for_ticks
    self.ticks_ran = 0

    self._controls.start()

    super().start()

  def stop(self):
    super().stop(blocking=True)
    self.reset()

    self._controls.stop(blocking=False)

  def reset(self):
    pass

  def isRunning(self):
    return not self._stop_game.is_set()
  
  def hasEnded(self):
    return False

  # command executed on next #tick
  def invoke(self, cmd):
    self.commands = [cmd]

  def executeCommand(self):
    if self.hasEnded() is True:
      raise Exception('game has ended')

    if len(self.commands) > 0:
      cmd = self.commands.pop(0)
    else:
      cmd = None

    try:
      if cmd is Command.UP:
        self.snake = self.snake.up()
      elif cmd is Command.RIGHT:
        self.snake = self.snake.right()
      elif cmd is Command.DOWN:
        self.snake = self.snake.down()
      elif cmd is Command.LEFT:
        self.snake = self.snake.left()
      else:
        self.snake = self.snake.forward()
    except InvalidMovement:
      self.snake = self.snake.forward()

  def tick(self):
    if self.hasEnded() is True:
      raise Exception('game has ended')

    self.onBeforeTick(self)

    old_snake = self.snake
    command = self.nextCommand()

    self.executeCommand()

    # ate powerup
    ate_apple = self.eating_apple()
    if ate_apple is not None:
      self.apples.remove(ate_apple)

      # restore tail
      self.snake.body = self.snake.body \
        .turnTailTo(old_snake.tail().norm().inverse()) \
        .sanitize()

    #self._display.debug('ate_apple {}'.format(str(ate_apple)))

    if len(self.apples) < MAX_APPLES and self.rollApple():
      apple = self.createRandomApple()
      
      if apple is not None:
        self.apples.append(apple)

      #self._display.debug('add apple: {}'.format(apple))

    # display
    self._display.show(self.screen())
    self._display.debug(str(command))

  def eating_apple(self):
    actual_mouth = self.screen().map(self.snake.mouth())

    for apple in self.apples:
      if actual_mouth == apple:
        return apple

    return None

  def screen(self):
    return TorusScreen(
      self.width, self.height, 
      [self.snake.body] + self.apples
    )

  def collidesWithSnake(self, point):
    return (
      TorusScreen(self.width, self.height, [self.snake.body, point])
    ).occupiedArea() == (
      TorusScreen(self.width, self.height, [self.snake.body])
    ).occupiedArea

  def rollApple(self):
    return self._apple_chance >= rand(1, CHANCE_MAX_ROLL)

  # creates a apple at a random pos
  def createRandomApple(self):
    candidates = self.screen().unoccupiedPoints()

    if len(candidates) > 0:
      index = rand(0, len(candidates) - 1)
      return candidates[index]
    else:
      return None

  # creates an apple infront of the snake
  def createTrivialApple(self):
    delta = self.snake.head().norm()

    if delta is not None:
      trivial = self.snake.head().end.add(delta)

      if self.collidesWithSnake(trivial) is False:
        return self.screen().map(trivial)

    return None

  def nextCommand(self):
    try:
      return self.commands[0]
    except IndexError:
      return None

  def setDisplay(self, display):
    if not isinstance(display, Display):
      raise TypeError('display needs to implement Display')

    self._display = display

  def setControls(self, controls):
    if not isinstance(controls, Controls):
      raise TypeError('controls needs to implement Controls')

    self._controls = controls
    controls.setGame(self)

  def setTicksPerSecond(self, ticks):
    self._speed = 1 / ticks

  def setAppleChance(self, chance):
    self._apple_chance = chance

  def tearDown(self):
    self.stop()
    self._display.tearDown()
    self._controls.tearDown()
