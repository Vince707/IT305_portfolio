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

    $(document).ready(function () {
        function addImages(container, folder, count) {
            for (let i = 1; i <= count; i++) {
                const imgElement = `<img class="grid-item card col-4 col-lg-2 m-3" 
                                        src="${folder}/${i}.jpg" 
                                        alt="Image ${i}" 
                                        id="${folder}/${i}.jpg" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#imageModal">`;
                container.append(imgElement);
            }
        }
    
        const landscapeColumns = $("#landscape-columns");
        const selfCaptureColumns = $("#self-capture-columns");
    
        // Add images for landscapes (1-50)
        addImages(landscapeColumns, "landscape", 50);
    
        // Add images for self-captures (1-41)
        addImages(selfCaptureColumns, "self-capture", 41);
    
        $(document).on("click", ".grid-item", function () {
            const imgSrc = $(this).attr("src");
            const imgAlt = $(this).attr("alt");
            
            $("#modalImage").attr("src", imgSrc);
            $("#imageModalLabel").text(imgAlt);
        });
    });
    

    /// FOR the Back to Top button
    let myButton = $("#myBtn");

    $(window).on("scroll", function() {
        if ($(window).scrollTop() > 20) {
            myButton.show();
        } else {
            myButton.hide();
        }
    });

    myButton.on("click", function() {
        $("html, body").animate({ scrollTop: 0 }, "fast");
    });

    /// FOR Animation
    function isElementInView(selector) {
        const element = $(selector);
        const windowTop = $(window).scrollTop();
        const windowBottom = windowTop + $(window).height();
        const elementTop = element.offset().top;
        const elementBottom = elementTop + element.outerHeight();
    
        return elementBottom >= windowTop && elementTop <= windowBottom;
    }
    function applyLeftAnimation(selector) {
        $(selector).animate(
            {
                opacity: 1,
                left: "0px"
            },
            1500,
            "swing"
        );
    }
    function applyTopAnimation(selector) {
        $(selector).animate(
            {
                opacity: 1,
                top: "0px"
            },
            1500,
            "swing"
        );
    }
    function applyBottomAnimation(selector) {
        $(selector).animate(
            {
                opacity: 1,
                bottom: "0px"
            },
            1500,
            "swing"
        );
    }
    applyLeftAnimation(".hero-image");
    applyBottomAnimation(".features-item");
    applyTopAnimation(".main-title");
    applyLeftAnimation(".about-me-subtitle");
    
    $(window).scroll(function () {
        if (isElementInView(".quote-home")) {
            applyTopAnimation(".quote-home");
        }
        if (isElementInView("#contact-section")) {
            applyLeftAnimation("#contact-section");
        }
    });

    /// Hero Section Name Effect
    $(document).ready(function () {
        let heroName = $("#hero-name");
        let heroNameEffects = [
            "fw-bold",
            "fw-bolder",
            "fw-medium",
            "fw-lighter",
            "text-decoration-line-through",
            "text-decoration-underline",
            "text-decoration-none",
            "font-monospace",
            "fst-italic",
            "fst-normal",
            "rotate-1",
            "shadow",
            "glow"
        ];
    
        function getRandomEffect() {
            return heroNameEffects[Math.floor(Math.random() * heroNameEffects.length)];
        }
    
        setInterval(function () {
            heroName.removeClass(heroNameEffects.join(" "));
            heroName.addClass(getRandomEffect());
        }, 300);
    });
    
});
