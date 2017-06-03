#!/usr/bin/python3
import sys
from time import sleep

from src.plane import plane
from src.Point import Point
from src.Snake import Snake
from src.SnakeGame import SnakeGame, Command
from src.util import rand

from src.display.ConsoleOut import ConsoleOut
from src.display.NullDisplay import NullDisplay
from src.display.ScrollingConsole import ScrollingConsole
try:
  import RPi.GPIO as GPIO
  from src.display.LedMatrix import LedMatrix

  # led matrix pins
  PIN_MODE = GPIO.BOARD
  ROWS = [8, 10, 12, 16, 18, 22, 24, 26]
  COLS = list(reversed([19, 21, 23, 29, 31, 33, 35, 37]))

  LED_MATRIX_AVAILABLE = True
# throws runtimeerror if not raspberry environment
except RuntimeError:
  LED_MATRIX_AVAILABLE = False

# possible args for display mode
ARG_DISPLAY_LED = 'led'
ARG_DISPLAY_CONSOLE = 'console'

def displayFromArg(arg):
  if arg == ARG_DISPLAY_LED:
    if LED_MATRIX_AVAILABLE:
      return LedMatrix.withPins(ROWS, COLS, PIN_MODE)
    else:
      print('Warning: no LedMatrix available')
      return NullDisplay()
  elif arg == ARG_DISPLAY_CONSOLE:
    return ConsoleOut()
  else:
    return ScrollingConsole()

def randomMovement(game):
  cmd = [
    Command.UP,
    Command.RIGHT,
    Command.DOWN,
    Command.LEFT,
  ][rand(0, 3)]

  game.invoke(cmd)
  
def main():
  game = SnakeGame(
    Snake.withLength(Point(0, 0), plane.right, 3),
    8, 8
  )

  try:
    display_arg = sys.argv[1]
  except IndexError:
    display_arg = None

  try:
    # display setup
    display = displayFromArg(display_arg)
    game.setDisplay(display)

    # game speed
    ticks_per_second = 1
    game.setTicksPerSecond(ticks_per_second)

    # testing 
    game.onBeforeTick = randomMovement

    # start game
    print('game running on {} with {} ticks/s'.format(
      display.__class__.__name__,
      ticks_per_second
    ))
    game.start()

    # block until game ends (interrupt, game over etc)
    game.join()
  finally:
    game.tearDown()

if __name__ == "__main__":
  main()