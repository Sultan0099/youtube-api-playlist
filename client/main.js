let videoContainer = document.getElementById("video-container");
let videoCardContainer = document.getElementById("video-card-container");
let nextPageBtn = document.getElementById("next-page-btn");
let previousPageBtn = document.getElementById("previous-page-btn");
let showTotalVideo = document.getElementById("show-total");
let nextPageToken = null,
  prevPageToken = null,
  thumbnails = null;
function getPage(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      showTotalVideo.innerHTML = "Total videos " + data.pageInfo.totalResults;
      videoCardContainer.innerHTML = " ";
      if (data.nextPageToken) nextPageToken = data.nextPageToken;
      if (data.prevPageToken) prevPageToken = data.prevPageToken;
      appendVideo(data.items[0].snippet.resourceId.videoId);
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
  videoContainer.innerHTML = ` <iframe class="video" src="https://www.youtube.com/embed/${videoId}" style="border:none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}

function appendVideoCard(imgSrc, title, decription, videoId) {
  videoCardContainer.innerHTML += `<div class="card mb-3 videoCard" id="${videoId}" onclick = "changeVideo('${videoId}')" >
   <div class="row no-gutters">
         <div class="col-lg-4 col-md-4 col-sm-4 col-4">
           <img src=${imgSrc} class="card-img" alt="...">
         </div>
         <div class="col-lg-8 col-md-8 col-sm-8 col-8">
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
  let cards = document.querySelectorAll(".videoCard");
  let card = document.getElementById(id);

  cards.forEach(cd => {
    cd.style.backgroundColor = "white";
    cd.style.color = "black";
  });
  card.style.backgroundColor = "black";
  card.style.color = "white";
  appendVideo(id);
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

nextPageBtn.onclick = () => {
  if (nextPageToken) getPage(`/playlist/${nextPageToken}`);
};

previousPageBtn.onclick = () => {
  if (prevPageToken) getPage(`/playlist/${prevPageToken}`);
};

getPage("/playlist");
