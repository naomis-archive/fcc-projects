def add_time(start, duration, dayname=False):
  daynamecount = -1
  if dayname:
    dayname = dayname.lower()
    if dayname == "sunday":
      daynamecount = 0
    if dayname == "monday":
      daynamecount = 1
    if dayname == "tuesday":
      daynamecount = 2
    if dayname == "wednesday":
      daynamecount = 3
    if dayname == "thursday":
      daynamecount = 4
    if dayname == "friday":
      daynamecount = 5
    if dayname == "saturday":
      daynamecount = 6
  days = 0
  daystring = ""
  newdayname = ""
  arr1 = start.split(" ")
  ampm = arr1[1]
  subarr1 = arr1[0].split(":")
  hours = subarr1[0]
  minutes = subarr1[1]
  arr2 = duration.split(":")
  addhours = arr2[0]
  addminutes = arr2[1]
  newminutes = int(minutes) + int(addminutes)
  newhours = int(hours) + int(addhours)
  while newminutes >= 60:
    newminutes = newminutes - 60
    newhours = newhours + 1
    if newhours % 12 == 0:
      if ampm == "AM":
        ampm = "PM"
      elif ampm == "PM":
        ampm = "AM"
        days = days + 1
      if daynamecount > -1:
        daynamecount = daynamecount + 1
  while newhours > 12:
    if newhours > 12:
      newhours = newhours - 12
    if ampm == "AM":
      ampm = "PM"
    elif ampm == "PM":
      ampm = "AM"
      days = days + 1
      if daynamecount > -1:
        daynamecount = daynamecount + 1
    if newhours == 12:
      break
  newhours = str(newhours)
  newminutes = str(newminutes)
  if len(newminutes) == 1:
    newminutes = "0" + newminutes
  new_time = newhours + ":" + newminutes + " " + ampm
  if daynamecount > -1:
    while daynamecount > 6:
      daynamecount = daynamecount - 7
    if daynamecount == 0:
      new_time = new_time + ", Sunday"
    if daynamecount == 1:
      new_time = new_time + ", Monday"
    if daynamecount == 2:
      new_time = new_time + ", Tuesday"
    if daynamecount == 3:
      new_time = new_time + ", Wednesday"
    if daynamecount == 4:
      new_time = new_time + ", Thursday"
    if daynamecount == 5:
      new_time = new_time + ", Friday"
    if daynamecount == 6:
      new_time = new_time + ", Saturday"
  if days == 1:
    daystring = "(next day)"
    new_time = new_time + " " + daystring
  if days > 1:
    daystring = "(" + str(days) + " days later)"
    new_time = new_time + " " + daystring
  return new_time