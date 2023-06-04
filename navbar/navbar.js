"use strict";

class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
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
            <a href="../index.html">
              Home
            </a>
    
            <a href="../top-airing/top-airing.html">
              Top Airing
            </a>
    
            <a href="../popular/popular.html">
              Popular
            </a>
            <a href="../movies/movies.html">
              Movies
            </a>
          </div>
        </div>
    
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a href="../index.html" class="navbar-item">
              Home
            </a>
    
            <a href="../top-airing/top-airing.html" class="navbar-item">
              Top Airing
            </a>
    
            <a href="../popular/popular.html" class="navbar-item">
              Popular
            </a>
    
            <a href="../movies/movies.html" class="navbar-item">
              Movies
            </a>
          </div>
    
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button  is-link" href ="https://anilist.co/signup" target="_blank">
                  <strong>Sign up</strong>
                </a>
                <a class="button is-light" href="https://anilist.co/login" target="_blank">
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

customElements.define("app-navbar", Navbar);
