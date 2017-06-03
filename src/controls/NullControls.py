from src.Controls import Controls

def _worker(controls):
  # dont do anything, just wait for stop
  controls.wait()

class NullControls(Controls):
  def __init__(self):
    super().__init__(
      target=_worker,
      kwargs={
        'controls': self
      }
    )

  def setGame(self, game):
    pass

  def tearDown(self):
    pass