const videoPlayer = document.getElementById("videoPlayer");
const videoContainer = document.getElementById("videoContainer");
const playPauseBtn = document.getElementById("playPause").querySelector("img");
const volumeBtn = document.getElementById("volume").querySelector("img");
const progress = document.getElementById("progress");
const scrubber = document.getElementById("scrubber");
const progressBar = document.getElementById("progressBar");

// 🎥 Google Drive Video Links (Using Preview Mode)
const videoLinks = {
    1: "16gUkTsEspcONTTKLgc8xLH0vs6XYIjvF",
    2: "14GlbAUKiWvQWeRoAr3yxmkmnWHyYkGyQ",
    3: "1qbhy84QC1zoaXj2aZEyPo_4ItxODCkR2",
    4: "1GJ-Mkv6zQ62zzndApaYjyqTAgnIz57O9",
    5: "10ahpIiSxgmfREOo69UmYFVtMS_Ghsh_h",
    6: "18Dl2dYkQbCnPWEs596ZCSRc_oIXEK0fQ",
    7: "14GgIsy2WRlFq9kBwSET55kJIdbxwBOMM",
    8: "1KDdiu8agRRh72XbrwwaRHEKUlW1KCBY8",
    9: "1fch1Upb5mLqmgASR9Sj4dYtz-wovdqJv",
    10: "1e5raClbsRyyeMwyapXrmTXbocVv0caiv",
    11: "1PHqjhMdCTfOnWbW-qTWN-wPb6FqOlf1u",
    12: "1zu_zCCuizN1lWtwRwZ9vMgOLB9BXLveM",
};

// 🎬 Load Episode
function loadEpisode(ep) {
    videoPlayer.src = `https://drive.google.com/file/d/${videoLinks[ep]}/preview`;

    videoPlayer.play();

    // Highlight active episode
    document.querySelectorAll(".episode-list li").forEach((btn) =>
        btn.classList.remove("active")
    );
    document.getElementById(`episode-${ep}`).classList.add("active");

    // Update Title Info
    document.querySelector(".video-info h1").innerText = "SAKAMOTO DAYS";
    document.querySelector(
        ".video-info .episode-title"
    ).innerText = `Episode ${ep}`;
    document.querySelector(".video-info .description").innerText =
        "Description for episode " + ep;

    // Hide controls initially (like Netflix)
    videoContainer.classList.add("paused");
    setTimeout(() => videoContainer.classList.remove("paused"), 3000);
}

// 📌 Play/Pause Function
function togglePlayPause() {
    if (videoPlayer.paused) {
        videoPlayer.play();
        playPauseBtn.src = "pause-48.png";
        videoContainer.classList.remove("paused");
    } else {
        videoPlayer.pause();
        playPauseBtn.src = "play-48.png";
        videoContainer.classList.add("paused");
    }
}

// ⏪ Rewind 10 Seconds
document.getElementById("rewind").addEventListener("click", () => {
    videoPlayer.currentTime = Math.max(videoPlayer.currentTime - 10, 0);
});

// ⏩ Fast Forward 10 Seconds
document.getElementById("fastForward").addEventListener("click", () => {
    videoPlayer.currentTime = Math.min(
        videoPlayer.currentTime + 10,
        videoPlayer.duration
    );
});

// 🔊 Volume Mute/Unmute
document.getElementById("volume").addEventListener("click", function () {
    videoPlayer.muted = !videoPlayer.muted;
    volumeBtn.src = videoPlayer.muted ? "mute.png" : "volume.png";
});

// 📊 Progress Bar Update (Smooth & Responsive)
function updateProgressBar() {
    setInterval(() => {
        let percentage = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progress.style.width = `${percentage}%`;
        scrubber.style.left = `calc(${percentage}% - 6px)`;
    }, 500);
}

// 🎯 Handle Scrubbing (Dragging Progress Bar)
let isDragging = false;
progressBar.addEventListener("mousedown", (event) => {
    isDragging = true;
    seek(event);
});
document.addEventListener("mouseup", () => (isDragging = false));
document.addEventListener("mousemove", (event) => {
    if (isDragging) seek(event);
});

function seek(event) {
    let rect = progressBar.getBoundingClientRect();
    let percentage = Math.max(
        0,
        Math.min(1, (event.clientX - rect.left) / rect.width)
    );
    videoPlayer.currentTime = percentage * videoPlayer.duration;
}

// 🖥 Fullscreen Toggle
document.getElementById("fullscreen").addEventListener("click", function () {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

/* 🛑 Hide Controls on Idle */
let idleTimer;
function showControls() {
    videoContainer.classList.remove("hide-controls");
    resetIdleTimer();
}
function hideControls() {
    videoContainer.classList.add("hide-controls");
}
function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(hideControls, 3000);
}
function handleIdleState() {
    videoContainer.addEventListener("mousemove", showControls);
    videoContainer.addEventListener("mouseleave", hideControls);
}

// Load first episode by default
loadEpisode(1);
