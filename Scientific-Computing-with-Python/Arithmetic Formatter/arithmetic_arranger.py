def arithmetic_arranger(problems, answer=False):
  line1 = ""
  line2 = ""
  line3 = ""
  line4 = ""
  if len(problems) > 5:
    return "Error: Too many problems."
  for i in problems:
    arr = i.split(" ")
    lineLength = 0
    if arr[1] != "+" and arr[1] != "-":
      return "Error: Operator must be '+' or '-'."
    if arr[0].isnumeric() == False or arr[2].isnumeric() == False:
      return "Error: Numbers must only contain digits."
    for j in arr:
      if len(j) > 4: 
        return "Error: Numbers cannot be more than four digits."
      if len(j) > lineLength:
        lineLength = len(j)
    if len(arr[0]) < lineLength:
      line1 = line1 + "  " + " "*(lineLength-len(arr[0])) + arr[0] + "    "
    elif len(arr[0]) == lineLength:
      line1 = line1 + "  " + arr[0] + "    "
    if len(arr[2]) < lineLength:
      line2 = line2 + arr[1] + " " + " "*(lineLength-len(arr[2])) + arr[2] + "    "
    elif len(arr[2]) == lineLength:
      line2 = line2 + arr[1] + " " + arr[2] + "    "
    line3 = line3 + "-"*(lineLength+2) + "    "
    solution = eval(arr[0] + arr[1] + arr[2])
    line4 = line4 + " "*(lineLength + 2 - (len(str(solution)))) + str(solution) + "    "
  arranged_problems = line1[:-4] + "\n" + line2[:-4] + "\n" + line3[:-4]
  if answer == True:
    arranged_problems = arranged_problems + "\n" + line4[:-4]
  return arranged_problems


print(arithmetic_arranger(["32 - 698", "1 - 3801", "45 + 43", "123 + 49"], True))