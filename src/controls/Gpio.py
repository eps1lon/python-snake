from src.Controls import Controls
from src.SnakeGame import Command

import RPi.GPIO as GPIO

class Gpio(Controls):
  def __init__(self, left, right, mode=GPIO.BOARD):
    # we only simulate a thread
    super().__init__()

    self._left = left
    self._right = right
    self._mode = mode

    self._setUpPins()

  def start(self):
    self.stop()

    # create closure for self
    def callback(channel):
      if channel == self._left:
        self._game.invoke(Command.TURN_LEFT)
      elif channel == self._right:
        self._game.invoke(Command.TURN_RIGHT)
      else:
        print('unrecognized pin `{}`'.format(pin))

    for pin in self._pins:
      GPIO.add_event_detect(
        pin,
        edge=GPIO.RISING,
        callback=callback,
        bouncetime=10
      )

  # override
  def stop(self, blocking=True):
    for pin in self._pins:
      GPIO.remove_event_detect(pin)

  # override
  def run(self):
    pass

  # override
  def join(self):
    pass

  def setGame(self, game):
    self._game = game

  def tearDown(self):
    GPIO.setmode(self._mode)
    GPIO.cleanup(self._pins)

  @property
  def _pins(self):
    return [self._left, self._right]

  def _setUpPins(self):
    GPIO.setmode(self._mode)
    GPIO.setup(self._pins, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)