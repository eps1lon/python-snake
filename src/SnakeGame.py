from enum import Enum

from src.Display import Display
from src.Point import Point
from src.Screen import Screen
from src.screen.TorusScreen import TorusScreen
from src.Snake import Snake
from src.util import rand

class Command(Enum):
  UP = 0
  RIGHT = 1
  DOWN = 2
  LEFT = 3

class SnakeGame(object):
  def __init__(self, snake = None, width = 16, height = 16):
    if snake is None:
      snake = Snake()

    self.snake = snake
    self.width = width
    self.height = height

    self.commands = []
    self.apples = []

  def isRunning(self):
    return True

  # command executed on next #tick
  def invoke(self, cmd):
    self.commands = [cmd]

  def executeCommand(self):
    if self.isRunning() is False:
      raise Exception('game has stopped')

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
    if self.isRunning() is False:
      raise Exception('game has stopped')

    old_snake = self.snake

    self.executeCommand()

    # ate powerup

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
