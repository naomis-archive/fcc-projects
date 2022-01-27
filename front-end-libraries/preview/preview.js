function setup() {
  let placeholder = `# Welcome to my Markdown Previewer!

## This app brought to you by Naomi Carrigan
### Here's some instructions!
  
In-line code goes between two backticks: \`<div></div>\`

\`\`\`
// multi-line code works like this!

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
**bold** text uses two asterisks.
*italic* text uses one asterisk.
Three asterisks gives you ***both***!
Use tildes to ~~cross stuff out~~.

You can add links like this: [links](https://www.freecodecamp.com)

With the >, do some...
> Block Quotes!

Even add tables!

Header | Header | Header?
------------ | ------------- | ------------- 
Neat | Cool | Haha
Woah | Okay. | Enough

- Bulleted lists with the - symbol.
  - You can indent them.
     - For more bullets.
        - That look like this.


1. Numbered lists with numbers!
1. Use just 1s if you want! 
1. But it still works!
2. Switch it up!
10. Use random numbers!

And finally... images!

![Oh no a bug!](https://github.com/nhcarrigan/nhcarrigan.github.io/blob/master/img/bug.jpg?raw=true)
`;

  document.getElementById("editor").defaultValue = placeholder;
  document.getElementById("preview").innerHTML = marked(placeholder, [
    (breaks = true),
  ]);
}
marked.setOptions({
  breaks: true,
  gfm: true,
});
function runCode() {
  let input = document.getElementById("editor").value;
  document.getElementById("preview").innerHTML = marked(input, [
    (breaks = true),
  ]);
}
