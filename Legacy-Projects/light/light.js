const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "teal",
  "white",
];
const lights = document.querySelectorAll("div.light");
let counter = 0;
let dot;

const listener = () => {
  event.target.classList.remove(...event.target.classList);
  event.target.classList.add("light");
  event.target.classList.add(colors[counter]);
};

const light = () => {
  dot = event.target;
  dot.classList.remove(...dot.classList);
  dot.classList.add("light");
  dot.classList.add(colors[counter]);
  lights.forEach((lightDot) => {
    lightDot.addEventListener("mouseover", listener);
  });
};

const clear = () => {
  event.target.classList.remove(...event.target.classList);
  event.target.classList.add("light");
};

const reset = () => {
  dot.classList.remove(...dot.classList);
  dot.classList.add("light");
};

const resetAll = () => {
  lights.forEach((light) => {
    light.classList.remove(...light.classList);
    light.classList.add("light");
  });
};

lights.forEach((lightDot) => {
  lightDot.addEventListener("mousedown", light);
  lightDot.addEventListener("dblclick", clear)
});

document.addEventListener("mouseup", () => {
  lights.forEach((lightDot) => {
    lightDot.removeEventListener("mouseover", listener);
  });
  counter++;
  if (counter >= colors.length) counter = 0;
});
