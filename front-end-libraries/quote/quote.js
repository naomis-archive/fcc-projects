let quoteData, parsedData, quoteList;

const setup = async () => {
  quoteData = await fetch(
    "https://raw.githubusercontent.com/BeccaLyria/discord-bot/main/src/utils/commands/motivational-quotes.json"
  );
  parsedData = await quoteData.json();
  quoteList = parsedData.motivationalQuotes;
  generateQuote()
};
const generateQuote = async () => {
  let i = Math.floor(Math.random() * quoteList.length);
  let quote = quoteList[i].quote;
  let auth = quoteList[i].author;
  document.getElementById("quotetext").innerHTML = quote;
  document.getElementById("quoteauthor").innerHTML = auth;
  document
    .getElementById("tweet-quote")
    .setAttribute(
      "href",
      `https://twitter.com/intent/tweet?text=${quote}\n--${auth}`
    );
};
