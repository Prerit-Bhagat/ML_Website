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
function fillData(cardclone,article) {
    const newimg=cardclone.query    
}