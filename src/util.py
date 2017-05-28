from random import randint

def buildMatrix(width, height):
  return [[0 for x in range(width)] for y in range(height)] 

def rand(a, b):
  return randint(a, b)