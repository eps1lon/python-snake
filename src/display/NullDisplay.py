from src.Display import Display

# mimics /dev/null
class NullDisplay(Display):
  def show(self, screen):
    pass

  def tearDown(self):
    pass