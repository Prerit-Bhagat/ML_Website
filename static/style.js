const apikey='f1509c8659604977a6b6414e13812a21';
const url='https://newsapi.org/v2/everything?q=';

window.addEventListener("load",()=>{fetchnews('India')});

async function fetchnews(country) {
    const res=await fetch(`${url}${country}&apiKey=${apikey}`);
    const data=await res.json();
    bindData(data.articles);
    console.log(data)
}
function bindData(articles) {
    const cardcontainer=document.getElementsByClassName('card-container');
    const cardnews=document.getElementsByClassName('card-news');

    cardcontainer.innerHTML="";

    articles.forEach(element => {
        if (!element.urlToImage) {
            return;
        }
        const cardclone=cardnews.content.cloneNode(true);
        fillData(cardclone,element)
        cardcontainer.appendChild(cardclone);
    });
}
function fillData(cardClone,article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}