const slctBtn = document.getElementById("fetchBtn");
const rdmBtn = document.getElementById("rdmBtn");
const allBtn = document.getElementById("allBtn");
const catBtn = document.getElementById("catBtn");
const jokes = document.getElementById("joke-container");

slctBtn.addEventListener("click", async () => {
    const category = document.getElementById("category").value;
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