let videoContainer = document.getElementById("video-container");
let videoCardContainer = document.getElementById("video-card-container");
let nextPageBtn = document.getElementById("next-page-btn");
let previousPageBtn = document.getElementById("previous-page-btn");
let nextPageToken = null,
  prevPageToken = null,
  thumbnails = null;
function getPage(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      videoCardContainer.innerHTML = " ";
      if (data.nextPageToken) nextPageToken = data.nextPageToken;
      if (data.prevPageToken) prevPageToken = data.prevPageToken;
      data.items.forEach(({ snippet }) => {
        if (!snippet.thumbnails.default.url) {
          thumbnails = snippet.thumbnails.medium.url;
        } else {
          thumbnails = snippet.thumbnails.default.url;
        }
        appendVideoCard(
          thumbnails,
          snippet.title,
          snippet.description.substring(0, 70) + "...",
          snippet.resourceId.videoId
        );
      });
    })
    .catch(err => console.log(err));
}
function appendVideo(videoId) {
  videoContainer.innerHTML = ` <iframe class="video" src="https://www.youtube.com/embed/${videoId}"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}

function appendVideoCard(imgSrc, title, decription, videoId) {
  videoCardContainer.innerHTML += `<div class="card mb-3 videoCard"  onclick = "changeVideo('${videoId}')" >
   <div class="row no-gutters">
         <div class="col-md-4">
           <img src=${imgSrc} class="card-img" alt="...">
         </div>
         <div class="col-md-8">
           <div class="card-body">
             <h6 class="card-title">${title}</h6>
             <p class="card-text font-weight-light">${decription}</p>
         </div>
       </div>
   </div>
</div>
</div>`;
}

function changeVideo(id) {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  appendVideo(id);
}

nextPageBtn.onclick = () => {
  if (nextPageToken) getPage(`/playlist/${nextPageToken}`);
};

previousPageBtn.onclick = () => {
  if (prevPageToken) getPage(`/playlist/${prevPageToken}`);
};

getPage("/playlist");
appendVideo("wBp0Rb-ZJak");
