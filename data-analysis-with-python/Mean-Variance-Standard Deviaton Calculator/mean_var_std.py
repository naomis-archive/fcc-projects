import numpy as np

def calculate(list):
  if (len(list) != 9):
    raise ValueError("List must contain nine numbers.")

  array = np.array([[list[0], list[1], list[2]], [list[3], list[4], list[5]], [list[6], list[7], list[8]]])

  calculations = {"mean": [array.mean(0).tolist(), array.mean(1).tolist(), array.mean()], "variance": [array.var(0).tolist(), array.var(1).tolist(), array.var()], "standard deviation": [array.std(0).tolist(), array.std(1).tolist(), array.std()], "max": [array.max(0).tolist(), array.max(1).tolist(), array.max().tolist()], "min": [array.min(0).tolist(), array.min(1).tolist(), array.min().tolist()], "sum": [array.sum(0).tolist(), array.sum(1).tolist(), array.sum()]}

  return calculations