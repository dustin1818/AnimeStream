//HLS VIDEO PLAYR WAS USED HERE
"use strict";

const ep_id = JSON.parse(localStorage.getItem("ep_id"));
console.log(ep_id);
const ep_list = JSON.parse(localStorage.getItem("ep-list"));
const nextBtn = document.getElementById("btn-next");
const prevBtn = document.getElementById("btn-prev");
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

//fetch episode function
const getEp = async () => {
  let episodeName = ep_id.id;
  console.log(episodeName);
  let serverData = await axios.get(
    `https://api.consumet.org/meta/anilist/servers/${episodeName}`
  );
  let streamServerData = serverData.data;
  Vidstreaming.addEventListener("click", () => {
    streamServerData.map((e) => {
      if (e.name === "Vidstreaming") {
        window.open(e.url, "_blank");
      }
    });
  });
  GogoServer.addEventListener("click", () => {
    streamServerData.map((e) => {
      if (e.name === "Gogo server") {
        window.open(e.url, "_blank");
      }
    });
  });
  Streamsb.addEventListener("click", () => {
    streamServerData.map((e) => {
      if (e.name === "Streamsb") {
        window.open(e.url, "_blank");
      }
    });
  });
  const { data } = await axios.get(
    `https://api.consumet.org/meta/anilist/watch/${episodeName}`
  );
  console.log(data);
  for (const iterator of data.sources) {
    console.log(iterator);
  }

  //find the quality and a condition that hides the button if the quality is not present
  const lowQualityVid = data.sources.find(quality => quality.quality === "360p");
  lowQualityVid ? lowQualityVid : lowQualityBtn.style.display = "none";
  const semilowQualityVid = data.sources.find(quality => quality.quality === "480p");
  semilowQualityVid ? semilowQualityVid : semilowQualityBtn.style.display = "none";
  const mediumQualityVid = data.sources.find(quality => quality.quality === "720p");
  mediumQualityVid ? mediumQualityVid : mediumQualityBtn.style.display = "none";
  const highQualityVid = data.sources.find(quality => quality.quality === "1080p");
  highQualityVid ? highQualityVid : highQualityBtn.style.display = "none";
  const autoQualityVid = data.sources.find(quality => quality.quality === "default");
  autoQualityVid ? autoQualityVid : autoQualityBtn.style.display = "none";
  const video = document.getElementById("video");
  const defaultOptions = {};
  if (Hls.isSupported()) {
    const hls = new Hls();
    //360p
    lowQualityBtn.addEventListener("click", () => {
      hls.loadSource(lowQualityVid.url);
    });

    //480p
    semilowQualityBtn.addEventListener("click", () => {
      hls.loadSource(semilowQualityVid.url);
    });

    //720p
    mediumQualityBtn.addEventListener("click", () => {
      hls.loadSource(mediumQualityVid.url);
    });

    //1080p
    highQualityBtn.addEventListener("click", () => {
      hls.loadSource(highQualityVid.url);
    });

    //auto
    autoQualityBtn.addEventListener("click", () => {
      hls.loadSource(autoQualityVid.url);
    });

    //conditonal statement if there is no quality, choose other quality
    if(highQualityVid){
      hls.loadSource(highQualityVid.url);
    }else if(mediumQualityVid){
      hls.loadSource(mediumQualityVid.url);
    }else if(semilowQualityVid){
      hls.loadSource(semilowQualityVid.url);
    }else if(lowQualityVid){
      hls.loadSource(lowQualityVid.url);
    }else if(autoQualityVid){
      hls.loadSource(autoQualityVid.url);
    }

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

let pageIncrementor = 1;
nextBtn.addEventListener("click", async () => {
  try{
     // for episode number page
  let text = ep_id.id;
  let EpPage = text.substring(text.lastIndexOf("episode-") + "episode-".length);
  console.log(`Current Page`, EpPage);
  //for episode name
  let text2 = ep_id.id;
  let EpName = text2.substring(
    0,
    text2.lastIndexOf("episode-") + "episode-".length
  );
  pageIncrementor += Number(EpPage) ;
  let pageString = pageIncrementor.toString();
  const nextEpName = EpName + pageString
  console.log("-------------")
  const nextEpData = await getNextEpisode(nextEpName);
  console.log(nextEpData);
  localStorage.setItem("ep_id",JSON.stringify(nextEpData));
  const storeNextEp = JSON.parse(localStorage.getItem("ep_id"));
  console.log(storeNextEp);
  window.location.reload();
  getEp();
  } catch(e) {
    alert("There is no episode next");
    console.log("Error",e);
  }
});

const getNextEpisode = async (nextEpTitle) => {
  const nextEpNameLink = nextEpTitle;
  console.log(nextEpNameLink) 
  const getNextEpData = await ep_list.find(episodeList => episodeList.id === nextEpNameLink);
  return getNextEpData;
}

let pageDecrementor = 1;
prevBtn.addEventListener("click", async () => {
  try{
     // for episode number page
  let text = ep_id.id;
  let EpPage = text.substring(text.lastIndexOf("episode-") + "episode-".length);
  console.log(`Current Page`, EpPage);
  //for episode name
  let text2 = ep_id.id;
  let EpName = text2.substring(
    0,
    text2.lastIndexOf("episode-") + "episode".length
  );
  pageDecrementor -= Number(EpPage) ;
  let pageString = pageDecrementor.toString();
  const nextEpName = EpName + pageString
  console.log("-------------")
  const nextEpData = await getPrevEpisode(nextEpName);
  console.log(nextEpData);
  localStorage.setItem("ep_id",JSON.stringify(nextEpData));
  const storeNextEp = JSON.parse(localStorage.getItem("ep_id"));
  console.log(storeNextEp);
  window.location.reload();
  getEp();
  } catch(e) {
    alert("There is no episode next");
    console.log("Error",e);
  }
});

const getPrevEpisode = async (nextEpTitle) => {
  const nextEpNameLink = nextEpTitle;
  console.log(nextEpNameLink) 
  const getNextEpData = await ep_list.find(episodeList => episodeList.id === nextEpNameLink);
  return getNextEpData;
}


