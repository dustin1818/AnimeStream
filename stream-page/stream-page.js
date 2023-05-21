const player = document.getElementById("my-video");
const ep_id = JSON.parse(localStorage.getItem("ep_id"));
console.log(ep_id);

const nav = document.getElementById("nav");
const nav_mobile = document.querySelector(".nav-mobile");
nav.addEventListener("click", () => {
  nav.classList.toggle("is-active");
  nav_mobile.classList.toggle("nav-mobile-active");
})

//quality button
// const lowQualityBtn = document.getElementById("360p");
// const semilowQualityBtn = document.getElementById("480p");
// const mediumQualityBtn = document.getElementById("720p");
// const highQualityBtn = document.getElementById("1080p");

//server button
const Vidstreaming = document.getElementById("Vidstreaming");
const GogoServer = document.getElementById("GogoServer");
const Streamsb = document.getElementById("Streamsb");
const Xstreamcdn = document.getElementById("Xstreamcdn");
const Mp4Upload = document.getElementById("Mp4Upload");
const Doodstream = document.getElementById("Doodstream");

const goBack = () => {
    window.location.href = "../anime-details/anime-details.html";
}

const getAnimeVideoEp = async () => {
    let episodeName = ep_id.id;
    console.log(episodeName);
    // let streamSelections = "vidcloud";
    try{
        const {data} = await axios.get(`https://c.delusionz.xyz/anime/gogoanime/servers/${episodeName}`);
        console.log(data);

         const vidstream = data.find(vidstream => vidstream.name === "Vidstreaming")
        //button function for vidstreaming
         Vidstreaming.addEventListener("click", () => {
          vidstream ? window.location.href = vidstream.url : alert('Server Error, Choose another one.')
         })
         const gogostream = data.find(gogostream => gogostream.name === "Gogo server")
        //button function for gogostream
        GogoServer.addEventListener("click", () => {
          gogostream ? window.location.href = gogostream.url : alert('Server Error, Choose another one.')
         })
         const streamsbstream = data.find(streamsbstream => streamsbstream.name === "Streamsb")
        //button function for streamsbstream
        Streamsb.addEventListener("click", () => {
          streamsbstream ? window.location.href = streamsbstream.url : alert('Server Error, Choose another one.')
         })
         const xstreamcdnstream = data.find(xstreamcdnstream => xstreamcdnstream.name === "Xstreamcdn")
        //button function for xstreamcdnstream
        Xstreamcdn.addEventListener("click", () => {
          xstreamcdnstream ? window.location.href = xstreamcdnstream.url : alert('Server Error, Choose another one.')
         })
         const mp4uploadstream = data.find(mp4uploadstream => mp4uploadstream.name === "Mp4Upload")
        //button function for mp4uploadstream
        Mp4Upload.addEventListener("click", () => {
          mp4uploadstream ? window.location.href = mp4uploadstream.url : alert('Server Error, Choose another one.')
         })
         const doodstream = data.find(doodstream => doodstream.name === "Doodstream")
        //button function for doodstream
        Doodstream.addEventListener("click", () => {
          doodstream ? window.location.href = doodstream.url : alert('Server Error, Choose another one.')
         })
    }catch(e){
        throw new Error(e.message);
    }
}


getAnimeVideoEp();

