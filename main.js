"use strict";

const next = document.getElementById("next");
const prev = document.getElementById("prev");
const card_layout = document.getElementById("card_wrapper");
const url = "https://api.consumet.org/anime/gogoanime/recent-episodes";
let page = 1;
let data = "";
const fetchAnime = async () => {
  try {
    data = await axios.get(`${url}?page=${page}`);
    console.log(data.data, page);
    const { results } = data.data;
    console.log(results);
    results.forEach((anime) => {
      const checkAnimeTitle = anime.title ? `${anime.title}` : `${anime.id}`
      const anime_DOM = `
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img class="img_card" src="${anime.image}" alt="${anime.image}">
          </figure>
          <div class="container is-fullhd">
            <div class="notification is-link">
              <p>${checkAnimeTitle}</p>  
            </div>
          </div>
        </div>
      </div>
      `;
      card_layout.innerHTML += anime_DOM;
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
prev.addEventListener("click", () => {
  page -= 1;
  card_layout.innerHTML = " ";
  fetchAnime();
});
