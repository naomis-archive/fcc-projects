const resultArea = document.getElementById("results")

const random = async () => {
    resultArea.innerHTML = ""
    const data = await fetch("https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=random&rnnamespace=0&rnlimit=5")
    const parsedData = await data.json()
    const articles = parsedData.query.random
    articles.forEach((el) => {
        const title = el.title
        const url = `https://en.wikipedia.org/wiki/${el.title}`
        resultArea.innerHTML += `<div class="card"><p class="title"><a class="article" href=${url}>${title}</a></p></div>`
    })
}

const search = async () => {
    resultArea.innerHTML = ""
    const query = document.getElementById("search").value;
    const data = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srnamespace=0&srsearch=${query}&srlimit=5`)
    const parsedData = await data.json()
    const articles = parsedData.query.search
    articles.forEach((el) => {
        const title = el.title
        const description = el.snippet
        const url = `https://en.wikipedia.org/wiki/${title}`
        resultArea.innerHTML += `<div class="card"><p class="title"><a class="article" href=${url}>${title}</a></p><p class="description">${description}...</p></div>`
    })
}