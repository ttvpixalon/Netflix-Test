document.addEventListener("DOMContentLoaded", function () {
    let iframe = document.getElementById("videoPlayer");

    // Force reload on first load to trigger autoplay
    iframe.src += "&autoplay=1";

    // Enable clicking on the iframe by re-enabling pointer events after 1 second
    setTimeout(() => {
        iframe.style.pointerEvents = "auto";
    }, 1000);
});
