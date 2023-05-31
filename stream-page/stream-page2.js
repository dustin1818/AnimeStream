//HLS VIDEO PLAYR WAS USED HERE
"use strict";

const ep_id = JSON.parse(localStorage.getItem("ep_id"));
console.log(ep_id);
const ep_list = JSON.parse(localStorage.getItem("ep-list"));
const nextBtn = document.getElementById("btn-next");
const nav = document.getElementById("nav");
const nav_mobile = document.querySelector(".nav-mobile");
nav.addEventListener("click", () => {
  nav.classList.toggle("is-active");
  nav_mobile.classList.toggle("nav-mobile-active");
});

const goBack = () => {
  window.location.href = "../anime-details/anime-details.html";
};

//quality button
const lowQualityBtn = document.getElementById("360p");
const semilowQualityBtn = document.getElementById("480p");
const mediumQualityBtn = document.getElementById("720p");
const highQualityBtn = document.getElementById("1080p");
const autoQualityBtn = document.getElementById("auto");

//server button
const Vidstreaming = document.getElementById("Vidstreaming");
const GogoServer = document.getElementById("GogoServer");
const Streamsb = document.getElementById("Streamsb");

const getEp = async () => {
  let episodeName = ep_id.id;
  let serverData = await axios.get(`https://c.delusionz.xyz/meta/anilist/servers/${episodeName}`);
  let streamServerData = serverData.data;
  Vidstreaming.addEventListener("click", () => {
    streamServerData.map((e) => {
      if(e.name === "Vidstreaming"){
        window.open(e.url, "_blank");
      }
  });
});
  GogoServer.addEventListener("click", () => {
    streamServerData.map((e) => {
      if(e.name === "Gogo server"){
        window.open(e.url, "_blank");
      }
  });
  });
  Streamsb.addEventListener("click", () => {
    streamServerData.map((e) => {
      if(e.name === "Streamsb"){
        window.open(e.url, "_blank");
      }
  });
  });
  const { data } = await axios.get(
    `https://api.consumet.org/meta/anilist/watch/${episodeName}`
  );
  const lowQualityVid = data.sources[0].url;
  const semilowQualityVid = data.sources[1].url;
  const mediumQualityVid = data.sources[2].url;
  const highQualityVid = data.sources[3].url;
  const autoQualityVid = data.sources[4].url;
  const video = document.getElementById("video");
  console.log(data);
  const defaultOptions = {};
  if (Hls.isSupported()) {
    const hls = new Hls();
    //360p
    lowQualityBtn.addEventListener("click", () => {
      hls.loadSource(lowQualityVid);
    });

    //480p
    semilowQualityBtn.addEventListener("click", () => {
      hls.loadSource(semilowQualityVid);
    });

    //720p
    mediumQualityBtn.addEventListener("click", () => {
      hls.loadSource(mediumQualityVid);
    });

    //1080p
    highQualityBtn.addEventListener("click", () => {
      hls.loadSource(highQualityVid);
    });

    //auto
    autoQualityBtn.addEventListener("click", () => {
      hls.loadSource(autoQualityVid);
    });

    let x = 0
    let y = ''
    nextBtn.addEventListener("click", () => {
      console.log(ep_list);
      const epNow = ep_list.find((animeEp) => animeEp.id === ep_id.id)
      console.log(epNow);
      const nextEP = epNow.number + 1;
      ep_list.forEach((episodes) => {
        if(nextEP === episodes.number){
          let nextEpName = episodes.id;
          const fetchSecondEp = async () => {
            const { data } = await axios.get(
              `https://api.consumet.org/meta/anilist/watch/${nextEpName}`
            );
            console.log(data.sources[3].url);
            hls.loadSource(data.sources[3].url); 
          }
          fetchSecondEp();
        }
      })

    })

    hls.loadSource(highQualityVid);
    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
      const availableQualities = hls.levels.map((l) => l.height);
      defaultOptions.controls = [
        "play-large",
        "restart",
        "rewind",
        "play",
        "fast-forward",
        "progress",
        "current-time",
        "duration",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ];

      defaultOptions.quality = {
        default: availableQualities[0],
        options: availableQualities,
        forced: true,
        onChange: (e) => updateQuality(e),
      };
      new Plyr(video, defaultOptions);
    });
    hls.attachMedia(video);
    window.hls = hls;
  }
  function updateQuality(newQuality) {
    window.hls.levels.forEach((level, levelIndex) => {
      if (level.height === newQuality) {
        window.hls.currentLevel = levelIndex;
      }
    });
  }
};

getEp();
