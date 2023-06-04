"use strict";
//pagination div
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const next2 = document.getElementById("next2");
const prev2 = document.getElementById("prev2");
const card_layout = document.getElementById("card_wrapper");
//api
const url = "https://api.consumet.org/meta/anilist/recent-episodes";
let page = 1;
//navbar
const nav = document.getElementById("nav");
const nav_mobile = document.querySelector(".nav-mobile");
nav.addEventListener("click", () => {
  nav.classList.toggle("is-active");
  nav_mobile.classList.toggle("nav-mobile-active");
});

//carousel container
const carousel_container = document.querySelector(".carousel-container");
//loader
const loader_container = document.querySelector(".loader-container");
const loader = document.querySelector(".three-body");
loader_container.style.display = "flex";
loader.style.display = "inline-block";
//search container
const search_container = document.querySelector(".upper-container");
search_container.style.display = "none";
//pagination container
const btn_container = document.querySelector(".btn-container");
btn_container.style.display = "none";
const subheading = document.querySelector(".subheading");
//footer container
const footer = document.querySelector(".footer");
//carousel function
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
const swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: true,
  },
  autoplay: {
    delay: 2800,
    disableOnInteraction: false,
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    },
  },
});

//get anime
const fetchAnime = async () => {
  try {
    const data = await axios.get(`${url}?page=${page}&perPage=21`);
    const { results } = data.data;
    loader_container.style.display = "none";
    loader.style.display = "none";
    carousel_container.style.display = "flex";
    search_container.style.display = "flex";
    subheading.style.display = "flex";
    footer.style.display = "block";
    btn_container.style.display = "flex";
    for (let i = 4; i <= 12; i++) {
      //carousel add image
      console.log(results[i]);
      const carousel_image = document.createElement("img");
      carousel_image.src = results[i].image;
      carousel_image.alt = results[i].image;

      const carousel_inner_wrapper = document.createElement("div");
      carousel_inner_wrapper.classList.add("carousel-wrapper");
      //left div
      const carousel_left_div = document.createElement("div");
      carousel_left_div.classList.add("carousel-leftDiv");
      const imageLeftDiv =  document.createElement("div");
      imageLeftDiv.classList.add("imageLeftDiv");
      const imageLeft = document.createElement("img");
      imageLeft.src = results[i].image;
      imageLeft.alt = results[i].image;
      imageLeftDiv.append(imageLeft);
      const imageEpisodeTitle = document.createElement("p");
      imageEpisodeTitle.innerText = `Episode: ${results[i].episodeNumber}`;
      carousel_left_div.append(imageLeftDiv,imageEpisodeTitle)
     //right div
      const carousel_right_div = document.createElement("div");
      carousel_right_div.classList.add("carousel-rightDiv");
      const episode_description = document.createElement("p");
      episode_description.innerText = `Episode Title: ${results[i].episodeTitle}`;
      episode_description.classList.add("carousel_description");
      const button_carousel = document.createElement("button");
      button_carousel.innerHTML = "Check Anime";
      button_carousel.classList.add("button_carousel");
      button_carousel.classList.add("button");
      button_carousel.classList.add("is-link");
      button_carousel.addEventListener("click", () => {
        getCard(results[i]);
      })
      const typeAnime = document.createElement("p");
      typeAnime.classList.add("typeAnime");
      typeAnime.innerText = `Type: ${results[i].type}`;
      carousel_right_div.append(episode_description, button_carousel, typeAnime);

      carousel_inner_wrapper.append(carousel_left_div,carousel_right_div);
      //bottom text
      const carousel_text = document.createElement("h2");
      carousel_text.classList.add("carousel_text");
      carousel_text.innerText = results[i].title.english
        ? `${results[i].title.english}`
        : `${results[i].title.userPreferred}`;
      const swiper_wrapper = document.querySelector(".swiper-wrapper");
      const swiper_slide = document.createElement("div");
      swiper_slide.classList.add("swiper-slide");
      swiper_slide.classList.add("overlay");
      // append all
      swiper_slide.append(carousel_image, carousel_text,carousel_inner_wrapper);
      swiper_wrapper.append(swiper_slide);
    }
    results.forEach((anime) => {
      //recent anime
      const checkAnimeTitle = anime.title.english
        ? `${anime.title.english}`
        : `${anime.title.userPreferred}`;
      const card = document.createElement("div");
      card.classList.add("card");
      const recentEp = document.createElement("div");
      recentEp.classList.add("recent-episode-container");
      const recentEpText = document.createElement("p");
      recentEp.innerText = `Episode ${anime.episodeNumber}`;
      recentEp.append(recentEpText);
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
      card_image.append(figure, recentEp);
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

//pagination
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

//get anime details then linked to another page
const getCard = (anime) => {
  localStorage.setItem("anime-info", JSON.stringify(anime));
  window.location.href = "../anime-details/anime-details.html";
};

//serach anime data
const searchAnimeData = async (inputData) => {
  try {
    const getAnimeResult = await axios.get(
      `https://api.consumet.org/meta/anilist/${inputData}?page=${page}&perPage=21`
    );

    const { results } = getAnimeResult.data;
    loader_container.style.display = "none";
    loader.style.display = "none";
    search_container.style.display = "flex";
    btn_container.style.display = "flex";
    subheading.style.display = "flex";
    subheading.innerText = "Search Results";
    results.forEach((anime) => {
      console.log(anime);
      const checkAnimeTitle = anime.title.english
        ? `${anime.title.english}`
        : `${anime.title.userPreferred}`;
      const card = document.createElement("div");
      card.classList.add("card");
      const recentEp = document.createElement("div");
      recentEp.classList.add("recent-episode-container");
      const recentEpText = document.createElement("p");
      recentEp.innerText = `Episode ${anime.currentEpisodeCount}`;
      recentEp.append(recentEpText);
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
      card_image.append(figure, recentEp);
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

const searchBar = document.getElementById("search");
searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    let searchValue = searchBar.value.trim();
    if (searchValue.length === 0) {
      alert("Please enter a value..");
    } else {
      loader_container.style.display = "flex";
      loader.style.display = "inline-block";
      next.style.display = "none";
      prev.style.display = "none";
      subheading.style.display = "none";
      card_layout.innerHTML = " ";
      searchAnimeData(searchValue);
      next2.style.display = "flex";
      prev2.style.display = "flex";
    }
  }
});

//pagination for search anime
next2.addEventListener("click", () => {
  page++;
  card_layout.innerHTML = " ";
  searchAnimeData();
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
    searchBar.focus();
    const enterKeyEvent = new KeyboardEvent("keydown", { key: "Enter" });
    searchBar.dispatchEvent(enterKeyEvent);
  }
});
