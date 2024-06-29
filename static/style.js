const apikey='f1509c8659604977a6b6414e13812a21';
const url='https://newsapi.org/v2/everything?q=';

window.addEventListener("load",()=>{fetchnews('Mental Stress')});
const pageSize=24;
async function fetchnews(country) {
    const res=await fetch(`${url}${country}&pageSize=${pageSize}&apiKey=${apikey}`);
    const data=await res.json();
    bindData(data.articles);
    console.log(data)
}
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";
    // articles=articles[30]
    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone, article) {
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
const searchInput = document.getElementById('Searchinput');
const searchBtn = document.getElementById('Searchbtn');

// Function to handle search action
function performSearch() {
    const searchTerm = searchInput.value.trim(); // Get the trimmed value of search input
    console.log(searchTerm)
    if (searchTerm !== '') {
        // Process the search term (for example, display it somewhere)
        console.log('Search term:', searchTerm);
        fetchnews(searchTerm)
        // Clear the input field
        searchInput.value = '';
    } else {
        alert('Please enter a search term.');
    }
}
// console.log(searchBtn)
// console.log(searchInput)

// Event listener for Enter key press in the input field
searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        // Prevent form submission
        performSearch();
        event.preventDefault(); 
        event.preventDefault(); 
    }
});

// Event listener for click on the search button
searchBtn.addEventListener('click', function(event) {
    performSearch();
    event.preventDefault(); 
});

text=document.getElementsByClassName('card-content');
// console.log(text)
text.addEventListener("on")
