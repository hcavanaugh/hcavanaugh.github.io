///Javascript Functions for cavanaugh.dev
///Author: Heather Cavanaugh (unless otherwise noted)
///Notes: Built in Javascript (vanilla). Wanted to challenge myself to build without relying on jQuery or javascript libraries.

//Fire for tablet and desktop sessions:
const tb = window.matchMedia('(min-width: 768px)');

//Set these variables as global objects
const galleryThumbs = document.getElementsByClassName("project-gallery__item");
const featuredSlider = document.querySelector(".project-featured__images");
const featuredInfo = document.querySelector(".project-featured__info");

if (tb.matches) {

    //Change data in featured project section
    function featuredGallery(event) {
        let newSlides = event.target.getElementsByClassName("project-gallery__slide");
        let newInfo = event.target.querySelector(".project-gallery__item-info");
        featuredSlides = featuredSlider.querySelectorAll(".project-gallery__slide");
        let featuredInfoText = featuredInfo.querySelector(".project-gallery__item-info");
        //remove pre-existing slides in featured slider container
        for (let featuredSlide of featuredSlides) {
            featuredSlide.remove();
        }
        //clone data from gallery item
        for (let newSlide of newSlides) {
            cloneSlides = newSlide.cloneNode(true);
            featuredSlider.append(cloneSlides);
        }
        //insert cloned data into the featured slider container
        featuredInfoText.remove();
        cloneInfo = newInfo.cloneNode(true);
        featuredInfo.append(cloneInfo);

        //reset variables for featured slider + height to finish this loop function
        featuredSlides = featuredSlider.querySelectorAll(".project-gallery__slide"),
            slideCount = featuredSlides.length,
            currentSlide = 0,
            slideHeight = null,
            initialHeight = featuredSlides[0].clientHeight;
        featuredSlider.style.height = initialHeight + 'px';
        //set first image as active in the slider
        featuredSlides[0].classList.add("active");

    }
    //End featured data swap functions

    //add selected class to first gallery thumbnail on load
    galleryThumbs[0].classList.add("selected");

    //toggle selected class for gallery thumbnails
    function mainGallery() {
        for (let galleryThumb of galleryThumbs) {
            galleryThumb.classList.remove("selected");
        }
        //add selected class to the clicked gallery thumbnail
        event.target.classList.add("selected");
    }
    //End gallery thumbnail functions

    //Event listeners for gallery thumbnails + featured gallery data swap
    for (let i = 0; i < galleryThumbs.length; i++) {
        galleryThumbs[i].addEventListener("click", featuredGallery);
        galleryThumbs[i].addEventListener("click", mainGallery);
    }

    //Featured Slider Functions
    //Set featured slider height and obj variables on load
    let featuredSlides = featuredSlider.querySelectorAll(".project-gallery__slide"),
        slideCount = featuredSlides.length,
        currentSlide = 0,
        slideHeight = null,
        initialHeight = featuredSlides[0].clientHeight;
    featuredSlider.style.height = initialHeight + 'px';

    //Slider resize height function
    function galleryNavigation(n) {
        featuredSlides[currentSlide].className = "project-gallery__slide";
        currentSlide = (n + slideCount) % slideCount;
        featuredSlides[currentSlide].className = "project-gallery__slide active";
        slideHeight = featuredSlides[currentSlide].clientHeight;
        featuredSlider.style.height = slideHeight + 'px';

        //resize featured slider height to image
        window.addEventListener('resize', function() {
            resizedSlideHeight = featuredSlides[currentSlide].clientHeight;
            featuredSlider.style.height = resizedSlideHeight + 'px';
        });
    }
    //Slider arrow navigation functions
    function nextSlide(e) {
        galleryNavigation(currentSlide + 1);
        let code = e.keyCode;
        //allow keyboard navigation
        if (code == 39) {
            galleryNavigation(currentSlide + 1);
        }
    };

    function prevSlide(e) {
        galleryNavigation(currentSlide + -1);
        let code = e.keyCode;
        //allow keyboard navigation
        if (code == 37) {
            galleryNavigation(currentSlide + -1);
        }
    };

    //Establish slider navigation event listeners
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

    //Establish objects for navigation function + event listener
    slideHandlers.nextSlide('.btn--next');
    slideHandlers.prevSlide('.btn--prev');


    // Detect swipe events for tablet touch devices, credit to Kirupa @ https://www.kirupa.com/html5/detecting_touch_swipe_gestures.htm
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

} //End featured slider functions

//Sticky menu scroll navigation
const hero = document.querySelector("#home");
const about = document.querySelector("#about");
const nav = document.querySelector(".main-menu");
let heroHeight = hero.clientHeight;

function scrollPosition() {
    //add sticky class once user scrolls past hero section
    if (window.scrollY > heroHeight) {
        about.style.marginTop = "60px";
        nav.classList.add("sticky");
    }
    //remove sticky class if user is viewing the hero section
    if (window.scrollY < heroHeight) {
        about.style.marginTop = "0";
        nav.classList.remove("sticky");
    }
};

document.addEventListener("scroll", scrollPosition);
//End Sticky menu scroll navigation

//Mobile menu functions

const mobileMenuTrigger = document.querySelector(".mobile-toggle");
const menu = document.querySelector(".main-menu__items");
const menuItem = document.querySelectorAll(".main-menu__link");
//open/close menu on tap
function menuToggle() {
    menu.classList.toggle("open");
}

//If a user clicks one of the menu anchor links, close the menu
function scrollAndClose(e) {
    menu.classList.remove("open");

    //Note: scroll script in place as a fallback for CSS 'scroll-behavior'

    //   const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
    //   e.preventDefault();
    //   let anchorLink = this.getAttribute('href');
    //   const anchor = document.querySelector(anchorLink)
    //   const originalTop = distanceToTop(anchor);
    //   console.log(originalTop);
    //   window.scrollBy({ top: originalTop, behavior: 'smooth' });
}

//Event listeners for mobile menu
mobileMenuTrigger.addEventListener("click", menuToggle);
for (let i = 0; i < menuItem.length; i++) {
    menuItem[i].addEventListener("click", scrollAndClose);
}