from threading import Thread, Event

def _worker_wrapper(instance):
  while not instance._stop.is_set():
    instance._worker(instance, **instance._kwargs)

  instance._has_stopped.set()

class StoppableThread(Thread):
  def __init__(self, target, kwargs, **super_kwargs):
    # always got super_kwargs.target is no attr of dict
    self._worker = target
    self._kwargs = kwargs

    super_kwargs['target'] = _worker_wrapper
    super_kwargs['kwargs'] = {
      'instance': self
    }

    super().__init__(**super_kwargs)

    self._stop = Event()
    self._stop.set()
    self._has_stopped = Event()
    self._has_stopped.set()

  def start(self):
    self._stop.clear()
    self._has_stopped.clear()
    
    super().start()

  def wait(self, timeout=None):
    self._stop.wait(timeout)

  def stop(self, blocking=True):
    self._stop.set()

    if blocking is True:
      self._has_stopped.wait()
