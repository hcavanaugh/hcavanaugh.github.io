///Javascript Functions for cavanaugh.dev
///Author: Heather Cavanaugh (unless otherwise noted)
///Notes: Built in Javascript (vanilla). Wanted to challenge myself to build without relying on jQuery or javascript libraries.

//Fire for tablet and desktop sessions:
const tb = window.matchMedia('(min-width: 768px)');

//Set these variables as global objects
const galleryThumbs = document.querySelectorAll('.project-gallery__item');
const featuredSlider = document.querySelector('.project-featured__images');
const featuredInfo = document.querySelector('.project-featured__info');

if (tb.matches) {

    //Change data in featured project section
    function featuredGallery(event) {
        let newSlides = event.target.querySelectorAll('.project-gallery__slide');
        let newInfo = event.target.querySelector('.project-gallery__item-info');
        featuredSlides = featuredSlider.querySelectorAll('.project-gallery__slide');
        let featuredInfoText = featuredInfo.querySelector('.project-gallery__item-info');
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

    }
    //End featured data swap functions

    //add selected class to first gallery thumbnail on load
    galleryThumbs[0].classList.add('selected');

    //toggle selected class for gallery thumbnails
    function mainGallery(event) {
        for (let galleryThumb of galleryThumbs) {
            galleryThumb.classList.remove('selected');
        }
        //add selected class to the clicked gallery thumbnail
        event.target.classList.add('selected');
        // const featuredProject = document.querySelector('#featuredProject');
        // if (featuredProject) {
        //     //scroll into featuredProject section
        //     featuredProject.scrollIntoView({ behavior: 'smooth' });
        // }
    }
    //End gallery thumbnail functions

    //Event listeners for gallery thumbnails + featured gallery data swap
    for (let i = 0; i < galleryThumbs.length; i++) {
        galleryThumbs[i].addEventListener('click', (event) => { featuredGallery(event) });
        galleryThumbs[i].addEventListener('click', (event) => { mainGallery(event) });
        galleryThumbs[i].addEventListener('keydown', (event) => { if (event.code === 'Enter') { featuredGallery(event) } });
        galleryThumbs[i].addEventListener('keydown', (event) => { if (event.code === 'Enter') { mainGallery(event) } });
    }

} //End featured slider functions

//Mobile menu functions

const mobileMenuTrigger = document.querySelector('.mobile-toggle');
const menu = document.querySelector('.main-menu__items');
const menuItem = document.querySelectorAll('.main-menu__link');

//open/close menu on tap
function menuToggle() {
    menu.classList.toggle('open');
    if (menu.classList.contains('open')) {
        mobileMenuTrigger.setAttribute('aria-expanded', 'true');
    } else {
        mobileMenuTrigger.setAttribute('aria-expanded', 'false');
    }

}

//If a user clicks one of the menu anchor links, close the menu
function scrollAndClose(e) {
    menu.classList.remove('open');
}

//Event listeners for mobile menu
mobileMenuTrigger.addEventListener('click', menuToggle);
for (let i = 0; i < menuItem.length; i++) {
    menuItem[i].addEventListener('click', scrollAndClose);
}

//Animation toggle

// const animationToggle = document.querySelector('#animation-toggle');
// const toggleContainer = document.querySelector('.animation-input-wrap');
// const heroSection = document.querySelector('.hero');
// animationToggle.addEventListener('click', toggleAnimation);
// toggleContainer.addEventListener('keydown',  (event) => { if (event.code === 'Enter') { toggleAnimation(); } });

// function toggleAnimation() {
//     animationToggle.toggleAttribute("checked");
//     if(animationToggle.hasAttribute('checked')) {
//         heroSection.classList.remove('stop-animation');
//     } else {
//         heroSection.classList.add('stop-animation');
//     }
// }

//Contact Form AJAX submission script

window.addEventListener('DOMContentLoaded', function() {

    // Set form objects

    let form = document.querySelector('#contact-form');
    let button = document.querySelector('#form-submit');
    let status = document.querySelector('#form-status');
    status.style = 'display: none ';

    // Success and Error functions for after the form is submitted

    function success() {
        form.reset();
        button.style = 'display: none ';
        status.style = 'display: block ';
        status.innerHTML = 'Thank you for contacting me. I will be in touch with you soon.';
    }

    function error() {
        status.innerHTML = 'There was a problem submitting your form entry. Please refresh the page and try again.';
    }

    // Handle the form submission event

    form.addEventListener('submit', function(ev) {
        ev.preventDefault();
        let data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
} //End Contact Form AJAX submission script