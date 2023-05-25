const player = videojs("my-video");

const ep_id = JSON.parse(localStorage.getItem("ep_id"));
console.log(ep_id);

const nav = document.getElementById("nav");
const nav_mobile = document.querySelector(".nav-mobile");
nav.addEventListener("click", () => {
  nav.classList.toggle("is-active");
  nav_mobile.classList.toggle("nav-mobile-active");
});

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

const goBack = () => {
  window.location.href = "../anime-details/anime-details.html";
};

player.ready(function () {
  let controlBar = this.controlBar;
  this.on("play", function () {
    controlBar.playToggle.removeClass("vjs-paused");
    controlBar.playToggle.addClass("vjs-playing");
  });

  this.on("timeupdate", function () {
    const remainingTime = player.remainingTime();
    const remainingTimeString = formatTime(remainingTime);
    const remainingTimeDisplay = document.querySelector(
      ".vjs-remaining-time-display"
    );
    remainingTimeDisplay.innerHTML = remainingTimeString;
  });
  //helper function formatter
  function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    // check if the video length has hours == hoursCheck
    const hoursCheck = hours ? hours + ":" : "";
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return (
      ("" + hoursCheck).slice(-2) +
      ("0" + minutes).slice(-2) +
      ":" +
      ("0" + seconds).slice(-2)
    );
  }

  this.on("pause", function () {
    controlBar.playToggle.removeClass("vjs-playing");
    controlBar.playToggle.addClass("vjs-paused");
  });
});

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
  player.currentTime(0);
  alert("Choose a video quality");
});

const getAnimeVideoEp = async () => {
  try {
    let episodeName = ep_id.id;
    console.log(episodeName);
    let streamSelections = "vidstreaming";
    const { data } = await axios.get(
      `https://c.delusionz.xyz/anime/gogoanime/watch/${episodeName}?server=${streamSelections}`
    );

    //360p
    lowQualityBtn.addEventListener("click", () => {
      alert('Updating quality');
      player.currentTime(0);
      player.src(`${data.sources[0].url}`);
    });

    //480p
    semilowQualityBtn.addEventListener("click", () => {
      alert('Updating quality');
      player.currentTime(0);
      player.src(`${data.sources[1].url}`);
    });

    //720p
    mediumQualityBtn.addEventListener("click", () => {
      alert('Updating quality');
      player.currentTime(0);
      player.src(`${data.sources[2].url}`);
    });

    //1080p
    highQualityBtn.addEventListener("click", () => {
      alert('Updating quality');
      player.currentTime(0);
      player.src(`${data.sources[3].url}`);
    });

    //auto
    autoQualityBtn.addEventListener("click", () => {
      alert('Updating quality');
      player.currentTime(0);
      player.src(`${data.sources[4].url}`);
    });
    alert('Video will start playing');
    player.currentTime(0);
    player.src(`${data.sources[3].url}`);
  } catch (e) {
    throw new Error(e.message);
  }
};

getAnimeVideoEp();
