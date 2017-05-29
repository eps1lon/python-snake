#!/usr/bin/python3
import sys
from time import sleep

from src.SnakeGame import SnakeGame

from src.display.ConsoleOut import ConsoleOut
from src.display.NullDisplay import NullDisplay
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
    return NullDisplay()

def main():
  game = SnakeGame(None, 8, 8)

  try:
    display_arg = sys.argv[1]
  except IndexError:
    display_arg = None

  try:
    display = displayFromArg(display_arg)
    game.setDisplay(display)

    ticks_per_second = 20
    game.setTicksPerSecond(ticks_per_second)

    print('game running on {} with {} ticks/s'.format(
      display.__class__.__name__,
      
      ticks_per_second
    ))
    game.run()

    sleep(5)
  finally:
    game.tearDown()

if __name__ == "__main__":
  main()