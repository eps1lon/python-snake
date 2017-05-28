from .Point import Point
from .Direction import Direction, Orientation

plane = Orientation(
  up=Direction(delta=Point(0, -1), left=None, right=None),
  right=Direction(delta=Point(+1, 0), left=None, right=None),
  down=Direction(delta=Point(0, +1), left=None, right=None),
  left=Direction(delta=Point(-1, 0), left=None, right=None),
)

plane.up.right = plane.right
plane.right.right = plane.down
plane.down.right = plane.left
plane.left.right = plane.up

plane.up.left = plane.left
plane.left.left = plane.down
plane.down.left = plane.right
plane.right.left = plane.up