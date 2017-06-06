#!/usr/bin/python3
import argparse
from time import sleep

from src.plane import plane
from src.Point import Point
from src.Snake import Snake
from src.SnakeGame import SnakeGame, Command

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

from src.controls.NullControls import NullControls
from src.controls.SnakeKeyboardControls import SnakeKeyboardControls
from src.controls.RandomCommands import RandomCommands
try:
  import RPi.GPIO as GPIO
  from src.controls.Gpio import Gpio as GpioControl

  # led matrix pins
  PIN_MODE_CONTROL = GPIO.BOARD
  INPUT_LEFT = 38
  INPUT_RIGHT = 40

  GPIO_CONTROL_AVAILABLE = True
# throws runtimeerror if not raspberry environment
except RuntimeError:
  GPIO_CONTROL_AVAILABLE = False

# possible args for display mode
ARG_DISPLAY_LED = 'led'
ARG_DISPLAY_CONSOLE = 'console'
ARG_DISPLAY_SCROLLING = 'scroll'

# possible args for control mode
ARG_CONTROL_KEYBOARD = 'keyboard'
ARG_CONTROL_GPIO = 'gpio'
ARG_CONTROL_RANDOM = 'random'

parser = argparse.ArgumentParser(description='snake written in python')
parser.add_argument(
  '-d', '--display',
  choices=[ARG_DISPLAY_CONSOLE, ARG_DISPLAY_LED, ARG_DISPLAY_SCROLLING],
  help='LED only available on raspberry'
)
parser.add_argument(
  '-c', '--controls',
  choices=[ARG_CONTROL_KEYBOARD, ARG_CONTROL_GPIO, ARG_CONTROL_RANDOM],
  help='random is computer, others are players'
)
parser.add_argument(
  '-s', '--speed',
  type=int,
  default=1,
  help='in ticks per second'
)
parser.add_argument(
  '--skip-intro',
  action='store_true',
  help='skip start screen'
)
parser.set_defaults(skip_intro=False)

def displayFromArg(arg):
  if arg == ARG_DISPLAY_LED:
    if LED_MATRIX_AVAILABLE:
      return LedMatrix.withPins(ROWS, COLS, PIN_MODE)
    else:
      print('Warning: no LedMatrix available')
      return NullDisplay()
  elif arg == ARG_DISPLAY_CONSOLE:
    return ConsoleOut()
  elif arg == ARG_DISPLAY_SCROLLING:
    return ScrollingConsole()
  else:
    return NullDisplay()

def controlsFromArg(arg):
  if arg == ARG_CONTROL_KEYBOARD:
    return SnakeKeyboardControls()
  elif arg == ARG_CONTROL_GPIO:
    if GPIO_CONTROL_AVAILABLE:
      return GpioControl(INPUT_LEFT, INPUT_RIGHT, PIN_MODE_CONTROL)
    else:
      print('Warning: no GpioControls available')
      return NullControls()
  elif arg == ARG_CONTROL_RANDOM:
    return RandomCommands()
  else:
    return NullControls()

def main():
  game = SnakeGame(
    Snake.withLength(Point(0, 0), plane.right, 3),
    8, 8
  )

  args = parser.parse_args()

  try:
    # display setup
    display = displayFromArg(args.display)
    game.setDisplay(display)

    # controls setup
    controls = controlsFromArg(args.controls)
    game.setControls(controls)

    # game speed
    ticks_per_second = args.speed
    game.setTicksPerSecond(ticks_per_second)

    # skip intro?
    if args.skip_intro:
      game.skipIntro()

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