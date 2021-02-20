function rot13(str) {
  return str
    .split("")
    .map((el) =>
      el.charCodeAt(0) >= 65 && el.charCodeAt(0) <= 90
        ? el.charCodeAt(0) + 13 <= 90
          ? String.fromCharCode(el.charCodeAt(0) + 13)
          : String.fromCharCode(el.charCodeAt(0) - 13)
        : el
    )
    .join("");
}
