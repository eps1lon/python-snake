from time import sleep

from src.Display import Display
from src.display.ConsoleOut import ConsoleOut 
from src.SnakeGame import SnakeGame, Command
from src.util import rand

if __name__ == '__main__':
  display = ConsoleOut()
  game = SnakeGame(None, 8, 8)
  try:
    for i in range(0, 5):
      game.tick()

      if rand(0, 1) == 0:
        cmd = [
          Command.UP,
          Command.RIGHT,
          Command.DOWN,
          Command.LEFT,
        ][rand(0, 3)]

        game.invoke(cmd)

      display.show(game.screen())
      sleep(1)
  finally:
    display.tearDown()
