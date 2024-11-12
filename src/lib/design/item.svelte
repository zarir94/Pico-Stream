<script>
  export let id;
  export let type;
  export let title;
  export let img;
  export let rating;
  export let cls = '';
  export let style = '';
  export let empty = false;
  export let useflex = false;
</script>
{#if empty}
<div class="item {cls} {useflex ? 'flex-item' : ''}" style="visibility: hidden;{style}">
</div>
{:else}
<a role="button" class="item {cls} {useflex ? 'flex-item' : ''}" href="/watch-{type}-{id}" style="{style}">
  <div class="item-img">
    <figure class="image is-2by3">
      <img loading="lazy" src="{img ? img.replace('original', 'w185') : '/noimg.jpg'}" alt="{title}">
    </figure>
  </div>
  <div class="on-hover">
    <h5 class="ititle is-size-6">{title}</h5>
    <span class="irating is-size-6">
      <svg pointer-events="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg> {rating}</span>
  </div>
</a>
{/if}
<style>
  .item {
    float: left;
    width: calc(100% / var(--cols) - 0.75rem);
    margin: calc(0.75rem / 2);
    margin-top: 0px;
    margin-bottom: 0.75rem;
  }
  .item-img, figure, img {
    width: 100%;
    height: 100%;
  }
  .irating svg {
    color: rgb(255, 187, 0);
  }
  img[loading="lazy"] {
    animation: cs-sk-bg 1s infinite;
    color: transparent;
  }
  @keyframes cs-sk-bg {
    0%, 100% {
      background-color: rgba(53, 58, 70, 1);
    }
    50% {
      background-color: rgba(53, 58, 70, .5);
    }
  }
  .on-hover {
    opacity: 0;
    visibility: hidden;
    transition: all linear 220ms;
  }
  .item:hover .on-hover {
    opacity: 1;
    visibility: visible;
  }
  .item, .item * {
    cursor: pointer;
  }
  .item {
    position: relative;
    border-radius: 7px;
    overflow: hidden;
    transition: all linear 300ms;
    display: block;
  }
  .item:hover {
    box-shadow: 0px 0px 4px 1px #02f7e38f;
  }
  .ititle {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 50%, rgba(0,0,0,0) 90%);
    color: rgba(255, 255, 255, 0.8);
    padding: 4px 2px 3px 4px;
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .irating {
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    color: rgba(255, 255, 255, .8);
    padding: 0px 4px 0px 4px;
    border-bottom-left-radius: 5px;
  }
</style>