from time import sleep, time
import RPi.GPIO as GPIO

from src.display.LedMatrix import LedMatrix
from src.screen.TorusScreen import TorusScreen
from src.shapes.big import shapes
from src.shapes.SimpleShape import SimpleShape

GPIO.setmode(GPIO.BOARD)

rows = [8, 10, 12, 16, 18, 22, 24, 26]
cols = list(reversed([19, 21, 23, 29, 31, 33, 35, 37]))

display = LedMatrix(rows, cols)

screen = TorusScreen(8, 8, [SimpleShape(shapes['hearts'])])

try:
  display.clear()

  for symbol, shape in shapes.items():
    display.show(TorusScreen(8, 8, [SimpleShape(shape)]))
    sleep(.2)
finally:
  display.tearDown()
