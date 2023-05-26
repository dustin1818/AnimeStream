//HLS VIDEO PLAYR WAS USED HERE

const ep_id = JSON.parse(localStorage.getItem("ep_id"));
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
  let streamSelections = "vidstreaming";
  Vidstreaming.addEventListener("click", () => {
    streamSelections = "vidstreaming";
    alert("Choose a video quality");
  });
  GogoServer.addEventListener("click", () => {
    streamSelections = "gogocdn";
    alert("Choose a video quality");
  });
  Streamsb.addEventListener("click", () => {
    streamSelections = "streamsb";
    alert("Choose a video quality");
  });
  const { data } = await axios.get(
    `https://c.delusionz.xyz/anime/gogoanime/watch/${episodeName}?server=${streamSelections}`
  );
  console.log(data);
  const lowQualityVid = data.sources[0].url;
  const semilowQualityVid = data.sources[1].url;
  const mediumQualityVid = data.sources[2].url;
  const highQualityVid = data.sources[3].url;
  const autoQualityVid = data.sources[4].url;
  const video = document.getElementById("video");
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
