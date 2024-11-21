$(document).ready(function () {
    /// FOR Home Page Scroll Effect on Videos
    const videos = $(".scrollVideo");
    const containers = $(".video-parent-container");

    const videoData = [];

    videos.each(function (index, video) {
        const container = $(containers[index]);
        const data = {
            video: video,
            container: container,
            containerHeight: container.height(),
            videoDuration: 10, 
            targetTime: 0,
            currentTime: 0,
        };

        video.addEventListener("loadedmetadata", () => {
            data.videoDuration = video.duration;
        });

        videoData.push(data);
    });

    $(window).on("resize", function () {
        videoData.forEach((data) => {
            data.containerHeight = data.container.height();
        });
    });

    $(window).on("scroll", function () {
        const scrollTop = $(window).scrollTop();

        videoData.forEach((data) => {
            const { video, container, containerHeight, videoDuration } = data;
            const offsetTop = container.offset().top;

            if (containerHeight > 0) {
                const scrollProgress = Math.min(
                    Math.max((scrollTop - offsetTop) / containerHeight, 0),
                    1
                );
                data.targetTime = scrollProgress * videoDuration * 2;
                
            }
        });
    });

    function smoothUpdate() {
        videoData.forEach((data) => {
            const { video, targetTime, currentTime } = data;

            data.currentTime += (targetTime - currentTime) * 0.1;
            if (video.readyState >= 2) {
                video.currentTime = data.currentTime;
            }
        });

        requestAnimationFrame(smoothUpdate);
    }

    smoothUpdate();

    /// FOR the footer 
    $("#current-year").text(new Date().getFullYear());

    // Function to dynamically add images to a container
    function addImages(container, folder, count) {
        for (let i = 1; i <= count; i++) {
            const imgElement = `<img class="cards col-6 col-lg-2 m-3" src="${folder}/${i}.jpg" alt="Image ${i}">`;
            container.append(imgElement);
        }
    }

    // Get the containers
    const landscapeColumns = $("#landscape-columns");
    const selfCaptureColumns = $("#self-capture-columns");

    // Add images for landscapes (1-50)
    addImages(landscapeColumns, "landscape", 50);

    // Add images for self-captures (1-36)
    addImages(selfCaptureColumns, "self-capture", 36);
});
