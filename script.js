document.addEventListener("DOMContentLoaded", function () {
    const videoPlayer = document.getElementById("videoPlayer");
    const episodesMenu = document.getElementById("episodesMenu");
    const episodesBtn = document.getElementById("episodesBtn");
    const progressBar = document.getElementById("progressBar");
    const progress = document.getElementById("progress");
    const playPauseBtn = document.getElementById("playPause").querySelector("img");
    const volumeBtn = document.getElementById("volume").querySelector("img");
    let currentEpisode = 1;

    // 🎥 Google Drive Video Links
    const videoLinks = {
        1: "16gUkTsEspcONTTKLgc8xLH0vs6XYIjvF",
        2: "14GlbAUKiWvQWeRoAr3yxmkmnWHyYkGyQ",
        3: "1qbhy84QC1zoaXj2aZEyPo_4ItxODCkR2",
        4: "1GJ-Mkv6zQ62zzndApaYjyqTAgnIz57O9",
        5: "10ahpIiSxgmfREOo69UmYFVtMS_Ghsh_h"
    };

    // 🎬 Load Episode & AutoPlay
    function loadEpisode(ep) {
        if (!videoLinks[ep]) return;
        currentEpisode = ep;
        videoPlayer.src = `https://drive.google.com/file/d/${videoLinks[ep]}/preview`;
        
        // Highlight Active Episode
        document.querySelectorAll(".episodes-panel li").forEach(btn => btn.classList.remove("active"));
        document.querySelector(`[data-videoid="${videoLinks[ep]}"]`)?.classList.add("active");

        // Update Title Info
        document.querySelector(".video-info .episode-title").innerText = `Episode ${ep}`;
    }

    // 🎥 Auto-Load First Episode
    loadEpisode(1);

    // 🎮 Play/Pause Button
    document.getElementById("playPause").addEventListener("click", function () {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playPauseBtn.src = "pause-48.png";
        } else {
            videoPlayer.pause();
            playPauseBtn.src = "play-48.png";
        }
    });

    // ⏪ Rewind 10s
    document.getElementById("rewind").addEventListener("click", function () {
        videoPlayer.currentTime = Math.max(videoPlayer.currentTime - 10, 0);
    });

    // ⏩ Fast Forward 10s
    document.getElementById("fastForward").addEventListener("click", function () {
        videoPlayer.currentTime = Math.min(videoPlayer.currentTime + 10, videoPlayer.duration);
    });

    // 🔊 Mute/Unmute Toggle
    document.getElementById("volume").addEventListener("click", function () {
        videoPlayer.muted = !videoPlayer.muted;
        volumeBtn.src = videoPlayer.muted ? "mute.png" : "volume.png";
    });

    // 📊 Progress Bar Update
    function updateProgressBar() {
        if (!videoPlayer.duration) return;
        let percentage = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progress.style.width = `${percentage}%`;
    }
    setInterval(updateProgressBar, 500);

    // 📺 Toggle Episodes Menu
    episodesBtn.addEventListener("click", function () {
        episodesMenu.classList.toggle("active");
    });

    // 🔄 Load Episode on Click
    document.querySelectorAll(".episodes-panel li").forEach((episode) => {
        episode.addEventListener("click", function () {
            let episodeId = this.dataset.videoid;
            let epNumber = Object.keys(videoLinks).find(key => videoLinks[key] === episodeId);
            loadEpisode(epNumber);
            episodesMenu.classList.remove("active");
        });
    });

    // ⏭ Next Episode
    document.getElementById("next").addEventListener("click", function () {
        let nextEpisode = currentEpisode + 1;
        if (videoLinks[nextEpisode]) {
            loadEpisode(nextEpisode);
        }
    });

    // 🖥 Fullscreen Toggle
    document.getElementById("fullscreen").addEventListener("click", function () {
        if (!document.fullscreenElement) {
            videoPlayer.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    /* 🛑 Hide Controls on Idle */
    let idleTimer;
    function showControls() {
        document.getElementById("videoContainer").classList.remove("hide-controls");
        resetIdleTimer();
    }

    function hideControls() {
        document.getElementById("videoContainer").classList.add("hide-controls");
    }

    function resetIdleTimer() {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(hideControls, 3000);
    }

    // Detect User Activity
    function handleIdleState() {
        document.getElementById("videoContainer").addEventListener("mousemove", showControls);
        document.getElementById("videoContainer").addEventListener("mouseleave", hideControls);
    }

    handleIdleState();
});
