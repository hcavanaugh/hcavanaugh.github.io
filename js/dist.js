//Javascript Functions for cavanaugh.dev
//Author: Heather Cavanaugh (unless otherwise noted)
//Notes: Built in Javascript (vanilla). Wanted to challenge myself to build without relying on jQuery or javascript libraries.

const galleryThumb = document.getElementsByClassName("project-gallery__item");
const featuredSlider = document.querySelector(".project-featured__images");
const featuredInfo = document.querySelector(".project-featured__info");

//Change data in featured project section
function projectGallery(event) {
    let newSlides = event.target.getElementsByClassName("project-gallery__slide");
    let newInfo = event.target.querySelector(".project-gallery__item-info");
    featuredSlides = featuredSlider.querySelectorAll(".project-gallery__slide"),
        slideCount = featuredSlides.length,
        currentSlide = 0,
        slideHeight = null,
        initialHeight = featuredSlides[0].clientHeight;
    let featuredInfoText = featuredInfo.querySelector(".project-gallery__item-info");

    for (let featuredSlide of featuredSlides) {
        featuredSlide.remove();
    }

    for (let newSlide of newSlides) {
        cloneSlides = newSlide.cloneNode(true);
        featuredSlider.append(cloneSlides);
    }

    featuredInfoText.remove();
    cloneInfo = newInfo.cloneNode(true);
    featuredInfo.append(cloneInfo);

    featuredSlides = featuredSlider.querySelectorAll(".project-gallery__slide"),
        slideCount = featuredSlides.length,
        currentSlide = 0,
        slideHeight = null,
        initialHeight = featuredSlides[0].clientHeight;
    featuredSlider.style.height = initialHeight + 'px';
    featuredSlides[0].classList.add("active");

}

for (let i = 0; i < galleryThumb.length; i++) {
    galleryThumb[i].addEventListener("click", projectGallery)
}
//End featured data swap

//Featured Slider Functions

let featuredSlides = featuredSlider.querySelectorAll(".project-gallery__slide"),
    slideCount = featuredSlides.length,
    currentSlide = 0,
    slideHeight = null,
    initialHeight = featuredSlides[0].clientHeight;
featuredSlider.style.height = initialHeight + 'px';

function galleryNavigation(n) {
    featuredSlides[currentSlide].className = "project-gallery__slide";
    currentSlide = (n + slideCount) % slideCount;
    featuredSlides[currentSlide].className = "project-gallery__slide active";
    slideHeight = featuredSlides[currentSlide].clientHeight;
    featuredSlider.style.height = slideHeight + 'px';

    window.addEventListener('resize', function() {
        resizedSlideHeight = featuredSlides[currentSlide].clientHeight;
        featuredSlider.style.height = resizedSlideHeight + 'px';
    });
}

function nextSlide(e) {
    galleryNavigation(currentSlide + 1);
    let code = e.keyCode;
    if (code == 39) {
        galleryNavigation(currentSlide + 1);
    }
};

function prevSlide(e) {
    galleryNavigation(currentSlide + -1);
    let code = e.keyCode;
    if (code == 37) {
        galleryNavigation(currentSlide + -1);
    }
};

//establish gallery navigation event listeners
const slideHandlers = {
    nextSlide: function(element) {
        document.querySelector(element).addEventListener('click', nextSlide);
        //change slide on keystroke
        document.body.addEventListener('keydown', nextSlide, false);
    },
    prevSlide: function(element) {
        document.querySelector(element).addEventListener('click', prevSlide);
        //change slide on keystroke
        document.body.addEventListener('keydown', prevSlide, false);
    }
}

//establish objects for function + event listener
slideHandlers.nextSlide('.btn--next');
slideHandlers.prevSlide('.btn--prev');


// Detect swipe events for touch devices, credit to Kirupa @ https://www.kirupa.com/html5/detecting_touch_swipe_gestures.htm
let initialX = null;
let initialY = null;

function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
};

function moveTouch(e) {
    if (initialX === null) {
        return;
    }
    if (initialY === null) {
        return;
    }
    let currentX = e.touches[0].clientX;
    let currentY = e.touches[0].clientY;
    let diffX = initialX - currentX;
    let diffY = initialY - currentY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
            // swiped left
            galleryNavigation(currentSlide + 1);
        } else {
            // swiped right
            galleryNavigation(currentSlide + -1);
        }
    }
    initialX = null;
    initialY = null;
    e.preventDefault();
};

//Event listeners for swipe slider function
featuredSlider.addEventListener("touchstart", startTouch, false);
featuredSlider.addEventListener("touchmove", moveTouch, false);