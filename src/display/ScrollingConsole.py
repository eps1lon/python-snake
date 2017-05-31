from src.Display import Display
from src.Screen import Screen

class ScrollingConsole(Display):
  def debug(self, text):
    print('debug: {}'.format(text))

  def show(self, screen: Screen):
    print('show: \n{}'.format(str(screen)))

  def tearDown(self):
    pass
