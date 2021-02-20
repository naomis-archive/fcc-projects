import math
from itertools import zip_longest
class Category:
  def __init__(self, name):
    self.name = name
    self.ledger = []
    self.total = 0
  def check_funds(self, amount):
    if (self.total < amount):
      return False
    return True
  def deposit(self, amount, description=""):
    self.ledger.append({"amount": amount, "description": description})
    self.total += amount
    return self.ledger
  def withdraw(self, amount, description=""):
    if not self.check_funds(amount):
      return False
    self.total -= amount
    self.ledger.append({"amount": -amount, "description": description})
    return True
  def get_balance(self):
    return self.total
  def transfer(self, amount, category):
    if not self.check_funds(amount):
      return False
    self.withdraw(amount, "Transfer to " + category.name)
    category.deposit(amount, "Transfer from " + self.name)
    return True
  def __str__(self):
    line = ("*" * int((30-len(self.name))/2)) + self.name + ("*" * int((30-len(self.name))/2)) + "\n"
    for item in self.ledger:
      desc = item["description"][0:23]
      val = "{:7.2f}".format(item["amount"])
      line = line + desc + (" " * (30 - len(desc) - len(val))) + val + "\n"
    line = line + "Total:" + "{:7.2f}".format(self.total)
    return line
def create_spend_chart(categories):
  title = "Percentage spent by category"
  step1 = ["100|", " 90|", " 80|", " 70|", " 60|", " 50|", " 40|", " 30|", " 20|", " 10|", "  0|"]
  arr1 = [step1]
  total = 0
  for cat in categories:
    for item in cat.ledger:
      if (item["amount"] < 0):
        total -= item["amount"]
  for cat in categories:
    temparr = []
    temptotal = 0
    for item in cat.ledger:
      if (item["amount"] < 0):
        temptotal -= item["amount"]
    percent = math.ceil(temptotal/total * 10)
    num = 0
    while (num < percent):
      temparr.append("o")
      num += 1
    while (len(temparr) < 11):
      temparr.insert(0, " ")
    arr1.append(temparr)
  breakline = "    ----------"
  arr2 = [["    "]]
  for cat in categories:
    arr2.append(list(cat.name))
  longest = 0
  for each in arr2:
    if (len(each) > longest):
      longest = len(each)
  while (len(arr2[0]) < longest):
    arr2[0].append("    ")
  for each in arr2:
    while (len(each) < longest):
      each.append(" ")

  line1 = ""
  for i in range(len(arr1[0])):
    for x in arr1:
      if (arr1.index(x) == 0):
        line1 = line1 + x[i] + " "
      else:
        line1 = line1 + x[i] + "  "
    line1 = line1 + "\n"
  
  line2 = ""
  for i in range(longest):
    for x in arr2:
      if (arr2.index(x) == 0):
        line2 = line2 + x[i] + " "
      else:
        line2 = line2 + x[i] + "  "
    if (i < longest-1):
      line2 = line2 + "\n"
  return title + "\n" + line1 + breakline + "\n" + line2
