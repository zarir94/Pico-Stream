<script>
  import menu from "$lib/menu.js";
</script>

<nav class="navbar has-background-black-ter has-shadow" aria-label="Navbar">
  <div class="container is-fullhd">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <h3 class="title is-4" style="font-weight: 700;">Pico Stream</h3>
      </a>
      <button on:click={function(e){document.getElementById(e.target.dataset.target).classList.toggle('is-active')}} class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasic">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>
    
    <div id="navbarBasic" class="navbar-menu">
      <div class="navbar-start">
        {#each Object.entries(menu) as [title, link]}
          <a class="navbar-item" href="{link}">{title}</a>
        {/each}
      </div>
      
      <div class="navbar-end">
        <div class="navbar-item">
          <form class="is-flex is-gap-1" action="/search">
            <input class="input" type="text" placeholder="Search anything...">
            <button class="button is-primary is-small">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</nav>