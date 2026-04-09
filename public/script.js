/*
script.js
Establishing consts related to the buttons.
*/
const slctBtn = document.getElementById("fetchBtn");
const rdmBtn = document.getElementById("rdmBtn");
const allBtn = document.getElementById("allBtn");
const catBtn = document.getElementById("catBtn");
const jokes = document.getElementById("joke-container");

/*
Upon clicking the Get Jokes button, this function fecthes 'jokebook/category/:category',
subbing the :category with either lameJoke or funnyJoke, and adding '?limit' if the 
user specified one. Then the fuction checks for exisiting children already appended to
joke-container and deletes them, then creates new divs, grabs the setup and delivery,
then appends them to the joke-container div.
*/
slctBtn.addEventListener("click", async () => {
    const category = document.getElementById("catselect").value;
    const limit = document.getElementById("limit").value;
    let url = `jokebook/category/${category}`;
    if (limit) {
        url += `?limit=${limit}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    while (jokes.firstChild) {
    jokes.removeChild(jokes.firstChild);
    }

    data.forEach(joke => {
        const card = document.createElement("div");
        card.classList.add("joke-item");

        const setup = document.createElement("div");
        setup.classList.add("setup");
        setup.textContent = joke.setup;

        const delivery = document.createElement("div");
        delivery.classList.add("delivery");
        delivery.textContent = joke.delivery;

        card.appendChild(setup);
        card.appendChild(delivery);
        jokes.appendChild(card);
    });
});

/*
Upon clicking the 'I'm feeling lucky.' button, this function fecthes 'jokebook/random',
then it does a similar process to the 'Get Jokes' button: erases previously appended divs
in joke-container, creates new divs, grabs the setup and delivery of the random joke, 
then appends them to joke-container.
*/
rdmBtn.addEventListener("click", async()=>{
    
    let url = 'jokebook/random';
    const res = await fetch(url);
    const data = await res.json();

    while (jokes.firstChild) {
    jokes.removeChild(jokes.firstChild);
    }

    data.forEach(joke => {
        const card = document.createElement("div");
        card.classList.add("joke-item");

        const setup = document.createElement("div");
        setup.classList.add("setup");
        setup.textContent = joke.setup;

        const delivery = document.createElement("div");
        delivery.classList.add("delivery");
        delivery.textContent = joke.delivery;

        card.appendChild(setup);
        card.appendChild(delivery);
        jokes.appendChild(card);
    });
});

/*
Upon clicking the 'Display all jokes' button, this function fecthes 'jokebook/',
then it repeats the process of the previous two functions.
*/
allBtn.addEventListener("click", async()=>{
    let url = 'jokebook';
    const res = await fetch(url);
    const data = await res.json();

    while (jokes.firstChild) {
    jokes.removeChild(jokes.firstChild);
    }

    data.forEach(joke => {
        const card = document.createElement("div");
        card.classList.add("joke-item");

        const setup = document.createElement("div");
        setup.classList.add("setup");
        setup.textContent = joke.setup;

        const delivery = document.createElement("div");
        delivery.classList.add("delivery");
        delivery.textContent = joke.delivery;

        card.appendChild(setup);
        card.appendChild(delivery);
        jokes.appendChild(card);
    });
});

/*
Upon clicking the 'Display categories' button, this function fecthes 'jokebook/categories',
then it makes a similar process to the functions above, only it only fetches the joke's 
category, and appends it to joke-container.
*/
catBtn.addEventListener("click", async()=>{
    let url = 'jokebook/categories';
    const res = await fetch(url);
    const data = await res.json();

    while (jokes.firstChild) {
    jokes.removeChild(jokes.firstChild);
    }

    data.forEach(joke => {
        const card = document.createElement("div");
        card.classList.add("joke-item");

        const category = document.createElement("div");
        category.classList.add("setup");
        category.textContent = joke.category;

        card.appendChild(category);
        jokes.appendChild(card);
    });
});

/*
Upon clicking 'Add to Jokebook' once th form is filled out, calls submitForm().
submitForm then fetches a POST rquest for 'jokebook/add', taking the JSON
stringified version of the form elements and putting them on the jokebook
database. 
*/
let addBtn = document.getElementById("save-joke");
addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    submitForm();
});


function submitForm() {
    let params = new FormData(document.getElementById("form-container")); // pass in entire form tag
    let jsonBody = JSON.stringify(Object.fromEntries(params)); //make form data json string.
    fetch("jokebook/add", {
        method: "POST",
        headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        },
    body: jsonBody,
    })
    .catch(alert);
}