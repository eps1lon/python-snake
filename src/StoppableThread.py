from threading import Thread, Event

class StoppableThread(Thread):
  def __init__(self, **kwargs):
    super().__init__(**kwargs)

    self._do_stop = Event()
    self._do_stop.set()
    self._has_stopped = Event()
    self._has_stopped.set()
  
  def run(self):
    while not self._do_stop.is_set():
      self._target(*self._args, **self._kwargs)

    self._has_stopped.set()

  def start(self):
    self._do_stop.clear()
    self._has_stopped.clear()
    
    super().start()

  def wait(self, timeout=None):
    self._do_stop.wait(timeout)

  def stop(self, blocking=True):
    self._do_stop.set()

    if blocking is True:
      self._has_stopped.wait()
