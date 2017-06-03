import RPi.GPIO as GPIO

from src.Display import Display
from src.Screen import Screen
from src.StoppableThread import StoppableThread

def pinOn(pin):
  GPIO.output(pin, GPIO.HIGH)

def pinOff(pin):
  GPIO.output(pin, GPIO.LOW)

def displayMatrix(matrix, rows, cols):
  for i, row in enumerate(matrix):
    pinOn(rows[i])

    for j, is_on in enumerate(row):
      if is_on:
        pinOn(cols[j])
        pinOff(cols[j])

    pinOff(rows[i])

def _show_worker(display, matrix):
  displayMatrix(matrix, display.rows, display.cols)

class LedMatrix(Display):
  @staticmethod
  def withPins(rows, cols, mode):
    GPIO.setmode(mode)
    return LedMatrix(rows, cols)

  def __init__(self, rows, cols):
    self.rows = rows
    self.cols = cols

    self._openMatrix()
    self._worker = None

  def tearDown(self):
    self.clear()
    self._closeMatrix()

  def show(self, screen):
    self.clear()

    self._worker = self._setup_worker(screen)
    self._worker.start()

  def debug(self, text):
    print(text)

  def clear(self):
    if self._worker is not None:
      self._worker.stop(blocking=True)

    self.reset()

  @property
  def _pins(self):
    return self.rows + self.cols

  def _openMatrix(self):
    GPIO.setmode(GPIO.BOARD)
    for pin in self._pins:
      GPIO.setup(pin, GPIO.OUT)
      
  def _closeMatrix(self):
    GPIO.cleanup(self._pins)

  def reset(self):
    for pin in self._pins:
      pinOff(pin)

  def enableRow(self, y):
    pinOn(self.rows[y])

  def disableRow(self, y):
    pinOff(self.rows[y])

    for pin in self.cols:
      pinOff(pin) 

  def enableCol(self, x):
    pinOn(self.cols[x])

  def disableCol(self, x):
    pinOff(self.cols[x])

  def _setup_worker(self, screen):
    return StoppableThread(
      target=_show_worker,
      kwargs={
        'matrix': screen.occupiedArea(),
        'display': self
      }
    )
