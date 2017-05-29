from enum import Enum
from threading import Thread, Event

from src.Display import Display
from src.display.NullDisplay import NullDisplay
from src.Point import Point
from src.Screen import Screen
from src.screen.TorusScreen import TorusScreen
from src.Snake import Snake
from src.util import rand

DEFAULT_TICKS_PER_SECOND = 5

def _game_worker(game):
  print('game_worker started')

  while not game._stop_game.is_set():
    game.tick()
    game._stop_game.wait(game._speed)

  game._worker_stopped.set()
  print('game_worker stopped')

class Command(Enum):
  UP = 0
  RIGHT = 1
  DOWN = 2
  LEFT = 3

class SnakeGame(object):
  def __init__(self, snake = None, width = 16, height = 16):
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
    self.setTicksPerSecond(DEFAULT_TICKS_PER_SECOND)

  def _setUpThreads(self):
    self._worker_thread = None

    self._stop_game = Event()
    self._stop_game.set()
    self._worker_stopped = Event()
    self._worker_stopped.set()

  def _setUpCallbacks(self):
    self.onBeforeTick = lambda game: None

  def run(self):
    self.pause()

    self._stop_game.clear()
    self._worker_stopped.clear()

    self._worker_thread = Thread(
      target=_game_worker,
      kwargs={
        'game': self,
      },
      name='game_worker'
    )
    self._worker_thread.start()

  def pause(self):
    self._stop_game.set()

    self._worker_stopped.wait()

  def stop(self):
    self.pause()
    self.reset()

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

    old_snake = self.snake

    if len(self.commands) > 0:
      cmd = self.commands.pop(0)
    else:
      cmd = None

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

  def tick(self):
    if self.hasEnded() is True:
      raise Exception('game has ended')

    self.onBeforeTick(self)

    old_snake = self.snake

    self.executeCommand()

    # ate powerup

    self._display.show(self.screen())

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
        self.apples.append(trivial)
        return trivial

    return None

  def nextCommand():
    return self.commands[0]

  def setDisplay(self, display):
    if not isinstance(display, Display):
      raise TypeError('display needs to implement Display')

    self._display = display

  def setTicksPerSecond(self, ticks):
    self._speed = 1 / ticks

  def tearDown(self):
    self.stop()
    self._display.tearDown()

  # blocks until thread for game ticks stops
  def join(self):
    if self._worker_thread is None:
      return
    else:
      self._worker_thread.join()
      return
