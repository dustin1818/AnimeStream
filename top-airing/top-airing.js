"use strict";

const next = document.getElementById("next");
const prev = document.getElementById("prev");
const card_layout = document.getElementById("card_wrapper");
const url = "https://api.consumet.org/anime/gogoanime/top-airing";
let page = 1;

const nav = document.getElementById('nav');
const nav_mobile = document.querySelector('.nav-mobile');
nav.addEventListener('click', () => {
  nav.classList.toggle('is-active');
  nav_mobile.classList.toggle('nav-mobile-active');
})

const fetchAnime = async () => {
  try {
    const data = await axios.get(`${url}?page=${page}`);
    console.log(data.data, page);
    const { results } = data.data;
    console.log(results);
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
    throw new Error(err.message);
  }
};

fetchAnime();

next.addEventListener("click", () => {
  page += 1;
  card_layout.innerHTML = " ";
  fetchAnime();
});
prev.addEventListener("click", (e) => {
  if (page === 1) {
    e.preventDefault();
  } else {
    page -= 1;
    card_layout.innerHTML = " ";
    fetchAnime();
  }
});

const getCard = (anime) => {
  console.log(anime);
  localStorage.setItem("anime-info", JSON.stringify(anime));
  window.location.href = "../anime-details/anime-details.html";
};
