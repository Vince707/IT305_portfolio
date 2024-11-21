$(document).ready(function () {
    const video = document.getElementById("scrollVideo");
    const container = $(".video-parent-container");
    let containerHeight = container.height(); // Get initial container height
    let videoDuration = 10; // Default duration

    let targetTime = 0; // The desired video time based on scroll
    let currentTime = 0; // The current time of the video

    // Ensure video duration is set after metadata is loaded
    video.addEventListener("loadedmetadata", () => {
        videoDuration = video.duration;
    });

    // Recalculate container height on window resize
    $(window).on("resize", function () {
        containerHeight = container.height();
    });

    // On scroll, update the target time based on scroll progress
    $(window).on("scroll", function () {
        const scrollTop = $(window).scrollTop();
        const offsetTop = container.offset().top;

        // Ensure container height is valid
        if (containerHeight > 0) {
            const scrollProgress = Math.min(
                Math.max((scrollTop - offsetTop) / containerHeight, 0),
                1
            );
            targetTime = (scrollProgress * videoDuration) * 2;
        }
    });

    // Smoothly transition video time
    function smoothUpdate() {
        currentTime += (targetTime - currentTime) * 0.1; // Linear interpolation
        if (video.readyState >= 2) {
            video.currentTime = currentTime;
        }
        requestAnimationFrame(smoothUpdate);
    }

    // Start animation loop
    smoothUpdate();

    $("#current-year").text(new Date().getFullYear());
});
