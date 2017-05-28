import RPi.GPIO as GPIO
from threading import Thread, Event

from src.Display import Display
from src.Screen import Screen

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

def _show_worker(matrix, display):
  #print('show worker called')

  while display._do_show.is_set():
    displayMatrix(matrix, display.rows, display.cols)

  display._worker_stopped.set()
  #print('show worker stopped')

class LedMatrix(Display):
  def __init__(self, rows, cols):
    self.rows = rows
    self.cols = cols

    self._do_show = Event()
    self._worker_stopped = Event()
    self._worker_stopped.set()

    self._openMatrix()

  def tearDown(self):
    self.clear()
    self._closeMatrix()

  def show(self, screen):
    self.clear()

    self._do_show.set()
    self._worker_stopped.clear()

    Thread(
      target=_show_worker,
      kwargs={
        'display': self,
        'matrix': screen.occupiedArea()
      },
      name='show_worker'
    ).start()

  def clear(self):
    self._do_show.clear()

    self._worker_stopped.wait()

    self.reset()

    

  @property
  def _pins(self):
    return self.rows + self.cols

  def _openMatrix(self):
    GPIO.setmode(GPIO.BOARD)
    for pin in self._pins:
      GPIO.setup(pin, GPIO.OUT)
      
  def _closeMatrix(self):
    GPIO.cleanup()

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
