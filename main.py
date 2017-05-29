#!/usr/bin/python3

from src.SnakeGame import SnakeGame

def main():
  game = SnakeGame(None, 8, 8)

  game.run()

if __name__ == "__main__":
  main()