const resultArea = document.getElementById("results");
const api = "https://wind-bow.glitch.me/twitch-api/";
const users = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas",
];

const getUser = async (user) => {
  const data = await fetch(`${api}users/${user}`);
  const parsedData = await data.json();
  return parsedData;
};

const getStream = async (user) => {
  const data = await fetch(`${api}streams/${user}`);
  const parsedData = await data.json();
  return parsedData;
};

document.onload(
  users.forEach(async (el) => {
    const user = await getUser(el);
    const stream = await getStream(el);
    const card = {
      name: user.display_name,
      bio: user.bio,
      username: user.name,
      stream: "offline",
    };
    if (stream.stream) card.stream = stream.stream.game
    if (!user.bio) card.bio = "Not Provided"
    resultArea.innerHTML += `<div class="card"><p class="title"><a href="https://twitch.tv/${card.username}">${
      card.name
    }</a></p><p class="bio">Biography: ${
      card.bio
    }</p><p class="stream">Streaming: ${
      card.stream
    }</p>`;
  })
);
