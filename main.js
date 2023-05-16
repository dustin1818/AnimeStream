"use strict";

const next = document.getElementById("next");
const prev = document.getElementById("prev");
const next2 = document.getElementById("next2");
const prev2 = document.getElementById("prev2");
const card_layout = document.getElementById("card_wrapper");
const url = "https://api.consumet.org/anime/gogoanime/recent-episodes";
let page = 1;

const nav = document.getElementById("nav");
const nav_mobile = document.querySelector(".nav-mobile");
nav.addEventListener("click", () => {
  nav.classList.toggle("is-active");
  nav_mobile.classList.toggle("nav-mobile-active");
});

const loader_container = document.querySelector(".loader-container");
const loader = document.querySelector(".three-body");
loader_container.style.display = "flex";
loader.style.display = "inline-block";

const search_container = document.querySelector(".upper-container");
search_container.style.display = "none";

const btn_container = document.querySelector(".btn-container");
btn_container.style.display = "none";

const fetchAnime = async () => {
  try {
    const data = await axios.get(`${url}?page=${page}`);
    const { results } = data.data;
    loader_container.style.display = "none";
    loader.style.display = "none";
    search_container.style.display = "flex";
    btn_container.style.display = "flex";
    results.forEach((anime) => {
      const checkAnimeTitle = anime.title ? `${anime.title}` : `${anime.id}`;
      const card = document.createElement("div");
      card.classList.add("card");
      const card_image = document.createElement("div");
      card_image.classList.add("card-image");
      const figure = document.createElement("figure");
      figure.classList.add("image");
      figure.classList.add("is-4by3");
      const img = document.createElement("img");
      img.classList.add("img_card");
      img.src = anime.image;
      img.alt = anime.image;
      figure.appendChild(img);
      card_image.appendChild(figure);
      const container = document.createElement("div");
      container.classList.add("container");
      container.classList.add("is-fullhd");
      const notification = document.createElement("div");
      notification.classList.add("notification");
      notification.classList.add("is-link");
      const p = document.createElement("p");
      p.innerText = checkAnimeTitle;
      notification.appendChild(p);
      container.appendChild(notification);
      card.append(card_image, container);
      card.addEventListener("click", () => {
        getCard(anime);
      });
      card_layout.appendChild(card);
    });
  } catch (err) {
    loader_container.style.display = "none";
    loader.style.display = "none";
    search_container.style.display = "none";
    btn_container.style.display = "none";
    throw new Error(err.message);
  }
};

fetchAnime();

next.addEventListener("click", () => {
  loader_container.style.display = "flex";
  loader.style.display = "inline-block";
  page += 1;
  card_layout.innerHTML = " ";
  fetchAnime();
});
prev.addEventListener("click", (e) => {
  if (page === 1) {
    e.preventDefault();
  } else {
    loader_container.style.display = "flex";
    loader.style.display = "inline-block";
    page -= 1;
    card_layout.innerHTML = " ";
    fetchAnime();
  }
});

const getCard = (anime) => {
  localStorage.setItem("anime-info", JSON.stringify(anime));
  window.location.href = "./anime-details/anime-details.html";
};

const searchAnimeData = async (inputData) => {
  try {
    const getAnimeResult = await axios.get(
      `https://api.consumet.org/anime/gogoanime/${inputData}?page=${page}`
    );

    console.log(getAnimeResult.data, `This is page ${page}`);
    const { results } = getAnimeResult.data;
    loader_container.style.display = "none";
    loader.style.display = "none";
    search_container.style.display = "flex";
    btn_container.style.display = "flex";
    results.forEach((anime) => {
      const checkAnimeTitle = anime.title ? `${anime.title}` : `${anime.id}`;
      const card = document.createElement("div");
      card.classList.add("card");
      const card_image = document.createElement("div");
      card_image.classList.add("card-image");
      const figure = document.createElement("figure");
      figure.classList.add("image");
      figure.classList.add("is-4by3");
      const img = document.createElement("img");
      img.classList.add("img_card");
      img.src = anime.image;
      img.alt = anime.image;
      figure.appendChild(img);
      card_image.appendChild(figure);
      const container = document.createElement("div");
      container.classList.add("container");
      container.classList.add("is-fullhd");
      const notification = document.createElement("div");
      notification.classList.add("notification");
      notification.classList.add("is-link");
      const p = document.createElement("p");
      p.innerText = checkAnimeTitle;
      notification.appendChild(p);
      container.appendChild(notification);
      card.append(card_image, container);
      card.addEventListener("click", () => {
        getCard(anime);
      });
      card_layout.appendChild(card);
    });
  } catch (err) {
    loader_container.style.display = "none";
    loader.style.display = "none";
    search_container.style.display = "none";
    btn_container.style.display = "none";
    throw new Error(err.message);
  }
};

const searchBar = document.querySelector(".input");

searchBar.addEventListener("keydown", (e) => {
  let searchValue = searchBar.value;
  if (e.key === "Enter") {
    if (/^\s/.test(searchValue)) {
      searchValue = "";
    }
    loader_container.style.display = "flex";
    loader.style.display = "inline-block";
    next.style.display = "none";
    prev.style.display = "none";
    card_layout.innerHTML = " ";
    searchAnimeData(searchValue);
    next2.style.display = "flex";
    prev2.style.display = "flex";
  }
});

next2.addEventListener("click", () => {
  page++;
  console.log(page);
  card_layout.innerHTML = " ";
  searchAnimeData();
  console.log(searchBar.value);
  searchBar.focus();
  const enterKeyEvent = new KeyboardEvent("keydown", { key: "Enter" });
  searchBar.dispatchEvent(enterKeyEvent);
});
prev2.addEventListener("click", (e) => {
  if (page === 1) {
    e.preventDefault();
  } else {
    page--;
    card_layout.innerHTML = " ";
    searchAnimeData();
    console.log(searchBar.value);
    searchBar.focus();
    const enterKeyEvent = new KeyboardEvent("keydown", { key: "Enter" });
    searchBar.dispatchEvent(enterKeyEvent);
  }
});
