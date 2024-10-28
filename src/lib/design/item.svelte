<script>
  export let title;
  export let img;
  export let rating;
  export let cls = '';
</script>
<div class="item {cls}">
  <div class="item-img">
    <figure class="image is-2by3">
      <img loading="lazy" src="{img.replace('original', 'w185')}" alt="{title}">
    </figure>
  </div>
  <div class="on-hover">
    <h5 class="ititle is-size-6">{title}</h5>
    <span class="irating is-size-6"><i class="bi bi-star"></i> {rating}</span>
  </div>
</div>
<style>
  .item, .item-img, figure, img {
    width: 100%;
    height: 100%;
  }
  img[loading="lazy"] {
    animation: cs-sk-bg 2s infinite;
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
    display: -webkit-box;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
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