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

player.ready(function() {
  let controlBar = this.controlBar;
  this.on("play", function() {
    controlBar.playToggle.removeClass("vjs-paused");
    controlBar.playToggle.addClass("vjs-playing");
  });

  this.on('timeupdate', function() {
    const remainingTime = player.remainingTime();
    const remainingTimeString = formatTime(remainingTime);
    const remainingTimeDisplay = document.querySelector('.vjs-remaining-time-display');
    remainingTimeDisplay.innerHTML = remainingTimeString;
  });
  //helper function formatter
  function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const hoursCheck = hours ? hours + ':'  : '' // check if the video length has hours
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
  
    return ('' + hoursCheck).slice(-2) +
           ('0' + minutes).slice(-2) + ':' +
           ('0' + seconds).slice(-2);
  }

  this.on("pause", function() {
    controlBar.playToggle.removeClass("vjs-playing");
    controlBar.playToggle.addClass("vjs-paused");
  });
});


const getAnimeVideoEp = async () => {
  try {
    let episodeName = ep_id.id;
    console.log(episodeName);
    let streamSelections = "vidstreaming";
    Vidstreaming.addEventListener("click", () => {
      streamSelections = "vidstreaming";
    });
    GogoServer.addEventListener("click", () => {
      streamSelections = "gogocdn";
    });
    Streamsb.addEventListener("click", () => {
      streamSelections = "streamsb";
    });
    const { data } = await axios.get(
      `https://c.delusionz.xyz/anime/gogoanime/watch/${episodeName}?server=${streamSelections}`
    );

    //360p
    lowQualityBtn.addEventListener("click", () => {
      player.src(`${data.sources[0].url}`);
      console.log(data, streamSelections);
    });

    //480p
    semilowQualityBtn.addEventListener("click", () => {
      player.src(`${data.sources[1].url}`);
      console.log(data, streamSelections);
    });

    //720p
    mediumQualityBtn.addEventListener("click", () => {
      player.src(`${data.sources[2].url}`);
      console.log(data, streamSelections);
    });

    //1080p
    highQualityBtn.addEventListener("click", () => {
      player.src(`${data.sources[3].url}`);
      console.log(data, streamSelections);
    });

    //auto
    autoQualityBtn.addEventListener("click", () => {
      player.src(`${data.sources[4].url}`);
      console.log(data, streamSelections);
    });
    player.src(`${data.sources[3].url}`);
  } catch (e) {
    throw new Error(e.message);
  }
};

getAnimeVideoEp();
