// Select elements once and store them in variables
const publicationSelect = document.getElementById("publication");
const gradeSelect = document.getElementById("grade");
const modeSelect = document.getElementById("mode");
const videosList = document.getElementById('videos');
const videoEmbed = document.getElementById('video');

// Use destructuring directly in function argument
function showVideo(container, videos, v_index) {
    const { video_id, video_title } = videos[v_index];
    const prev = document.querySelector(".active");
    prev?.classList.remove("active");
    container.classList.add("active");
    if (modeSelect.selectedOptions[0].value === "local") {
        const selectedGrade = parseInt(gradeSelect.selectedOptions[0].value);
        const selectedPublication = publicationSelect.selectedOptions[0].value;
        videoEmbed.innerHTML = `
            <video class="vd-embed" controls>
                <source src="kokugo/${selectedPublication}/${selectedGrade}/[${v_index}] ${video_title}.mp4" type="video/mp4">
            </video>
        `;
    }
    else {
        videoEmbed.innerHTML = `
            <iframe class="vd-embed" src="https://www.youtube.com/embed/${video_id}" title="${video_title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        `;
    }
}

// Simplify the creation of video elements
function createVideoElement(videos, v_index) {
    const video = videos[v_index];
    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-item';
    videoContainer.onclick = () => showVideo(videoContainer, videos, v_index);

    videoContainer.innerHTML = `
        <img class="video-thumbnail" src="${video.video_thumbnail}">
        <div class="video-title">${video.video_title}</div>
    `;

    return videoContainer;
}

function populatePlaylist(){
    videosList.innerHTML = "";

    // Use a loop to populate the playlist
    const { playlists } = DATA.publications[publicationSelect.selectedOptions[0].value];
    const selectedGrade = parseInt(gradeSelect.selectedOptions[0].value);

    if (playlists && playlists[selectedGrade]) {
        const { playlist_url, videos } = playlists[selectedGrade];
        console.log(videos);

        for (const v_index in videos) {
            const videoElement = createVideoElement(videos, v_index);
            if (v_index == 1) {
                videoElement.classList.add("active");
                showVideo(videoElement, videos, 1);
            }
            videosList.appendChild(videoElement);
        }
    } else {
        console.error("Invalid publication or grade selected.");
    }
}

populatePlaylist()
publicationSelect.onchange = () => populatePlaylist();
gradeSelect.onchange = () => populatePlaylist();
modeSelect.onchange = () => populatePlaylist();
