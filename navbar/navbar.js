"use strict";

class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div id="progress-bar">
    <div class="bar"></div>
  </div>
        <nav class="navbar is-link p-4" role="navigation" aria-label="main navigation">
        <div class="navbar-brand" style="margin-right: 10px;">
          <a class="navbar-item " href="../index.html">
            <p class="title has-text-white">
              Anime Stream
            </p>
          </a>
    
          <a role="button" id="nav" class="navbar-burger" aria-label="menu" aria-expanded="false"
            data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
    
          <div class="nav-mobile">
            <a href="../index.html" onclick ="redirectToAnotherPage()" >
              Home
            </a>
    
            <a onclick = "redirectToAnotherPage2()">
              Top Airing
            </a>
    
            <a onclick = "redirectToAnotherPage3()">
              Popular
            </a>
            <a onclick = "redirectToAnotherPage4()">
              Movies
            </a>
          </div>
        </div>
    
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" onclick = "redirectToAnotherPage()">
              Home
            </a>
    
            <a  class="navbar-item" onclick = "redirectToAnotherPage2()">
              Top Airing
            </a>
    
            <a  class="navbar-item"  onclick = "redirectToAnotherPage3()">
              Popular
            </a>
    
            <a class="navbar-item" onclick = "redirectToAnotherPage4()">
              Movies
            </a>
          </div>
    
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a id="signup" class="button is-link" target="_blank" onclick = "redirectToAnotherPage5()">
                  <strong>Sign up</strong>
                </a>
                <a id="signup" class="button is-light" target="_blank" onclick = "redirectToAnotherPage6()">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    
        `;
  }
}

customElements.define("app-navbar", Navbar); // component to use navbar

const nav = document.getElementById("nav");
const nav_mobile = document.querySelector(".nav-mobile");
nav.addEventListener("click", () => {
  nav.classList.toggle("is-active");
  nav_mobile.classList.toggle("nav-mobile-active");
});

document.getElementById("progress-bar").style.display = "block";
let progressBar = document.querySelector("#progress-bar .bar");
let width = 0;
  // Show the progress bar
function redirectToAnotherPage() {
  let intervalId = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(intervalId);
      window.location.href = "../index.html";
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }
}
function redirectToAnotherPage2() {
  let intervalId = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      // Redirect to another page when the progress reaches 100%
      clearInterval(intervalId);
      window.location.href = "../top-airing/top-airing.html";
      
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }
}
function redirectToAnotherPage3() {
  let intervalId = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      // Redirect to another page when the progress reaches 100%
      clearInterval(intervalId);
      window.location.href = "../popular/popular.html";
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }
}
function redirectToAnotherPage4() {
  let intervalId = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      // Redirect to another page when the progress reaches 100%
      clearInterval(intervalId);
      window.location.href = "../movies/movies.html";
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }
}
function redirectToAnotherPage5() {
  let intervalId = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      // Redirect to another page when the progress reaches 100%
      clearInterval(intervalId);
      window.open("https://anilist.co/signup","_blank")
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }
}
function redirectToAnotherPage6() {
  let intervalId = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      // Redirect to another page when the progress reaches 100%
      clearInterval(intervalId);
      window.open("https://anilist.co/login","_blank")
      window.location.reload();
    } else {
      width++;
      progressBar.style.width = width + "%";
      window.location.reload();
    }
  }
}