function telephoneCheck(str) {
  //proper brackets
  let openBrack = /\(/;
  let closeBrack = /\)/;
  let bothBrack = /[\(...\)]/;
  if (openBrack.test(str) == true && bothBrack.test(str) == false) return false;
  if (closeBrack.test(str) == true && bothBrack.test(str) == false)
    return false;
  //remove symbols
  let numOnly = str.replace(/[-\(\)\s]/g, "");
  //validate country code
  if (numOnly.length == 11 && numOnly.charAt(0) != 1) return false;
  //not enough numbers
  if (numOnly.length > 11 || numOnly.length < 10) return false;
  //perfect phone number
  if (numOnly.length == 10 && str.length == 10) return true;
  //more brackets
  if (str.charAt(5) == ")" && str.charAt(1) != "(") return false;
  //time to split the phone number yis
  if (str.charAt(0) == "(" && str.charAt(4) == ")") str = str.replace(/\(/, "");
  str = str.replace(/\s\(/, " ").replace(/\)\s/, " ");
  //check right chunks
  let chunkArr = str.split(/[-()\s+]/);
  if (numOnly.length == 11) {
    if (
      chunkArr[0].length != 1 ||
      chunkArr[1].length != 3 ||
      chunkArr[2].length != 3 ||
      chunkArr[3].length != 4
    )
      return false;
  }
  if (numOnly.length == 10) {
    if (
      chunkArr[0].length != 3 ||
      chunkArr[1].length != 3 ||
      chunkArr[2].length != 4
    )
      return false;
  }
  return true;
}
