let count = 0;
function getLocation() {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(parsePosition);
  }
  return alert("Please allow location access for this feature!");
}

function parsePosition(position) {
  const lat = parseFloat(position.coords.latitude);
  const lon = parseFloat(position.coords.longitude);
  console.log(lat);
  console.log(lon);
  return getWeather(lat, lon);
}

async function getWeather(lat, lon) {
  lat = parseFloat(lat);
  lon = parseFloat(lon);
  if (isNaN(lat) || isNaN(lon)) {
    return alert("Latitude and Longitude must be numerical values.");
  }
  await fetch(
    `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (
        parseInt(lat) !== parseInt(data.coord.lat) ||
        parseInt(lon) !== parseInt(data.coord.lon)
      ) {
        count = count + 1;
        if (count < 5) {
          return getWeather(lat, lon);
        } else {
          count = 0;
          return alert("Oh no! I got lost in space! Please try again.");
        }
      }
      document.getElementById("location").innerText = data.name;
      document.getElementById("temp").innerText =
        data.main.temp.toFixed(2) + " °C";
      document.getElementById("cond").innerText = data.weather[0].description;
      if (data.weather[0].icon) {
        document
          .getElementById("condimg")
          .setAttribute("src", data.weather[0].icon);
      }
      if (!data.weather[0].icon) {
        document.getElementById("condimg").setAttribute("src", "./null.jpg");
      }
    });
}

function submit() {
  let lat = document.getElementById("latinput").value;
  let lon = document.getElementById("loninput").value;
  console.log(lat);
  return getWeather(lat, lon);
}

function convert() {
  let value = document.getElementById("temp").innerText;
  let arr = value.split(" ");
  console.log(arr);
  if (arr[1] == "°F") {
    let temp = (arr[0] - 32) * (5 / 9);
    return (document.getElementById("temp").innerText =
      temp.toFixed(2) + " °C");
  }
  if (arr[1] == "°C") {
    let temp = arr[0] * (9 / 5) + 32;
    return (document.getElementById("temp").innerText =
      temp.toFixed(2) + " °F");
  }
}
