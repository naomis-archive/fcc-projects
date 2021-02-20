import copy
import random
from collections import Counter
# Consider using the modules imported above.

class Hat:
  def __init__(self, **balls):
    arr = []
    for ball in balls:
      for _ in range(balls[ball]):
        arr.append(ball)
    self.contents = arr
  def draw(self, number):
    if (len(self.contents) < number):
      return self.contents
    rArr = []
    while (len(rArr) < number):
      gArr = self.contents
      rand = random.randint(0, len(gArr) - 1)
      rArr.append(gArr[rand])
      gArr.remove(gArr[rand])
    return rArr
def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
  num = 0
  m = 0
  while (num < num_experiments):
    newhat = copy.deepcopy(hat)
    result = newhat.draw(num_balls_drawn)
    obj = Counter(result)
    check = 0
    for key in expected_balls:
      if (obj[key] >= expected_balls[key]):
        check += 1
    if (check == len(expected_balls)):
      m += 1
    num += 1
  return m/num