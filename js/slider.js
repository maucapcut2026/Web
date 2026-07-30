// ======================================
// SLIDER.JS
// Banner Slider
// ======================================


// ======================================
// CONFIG
// ======================================

const SLIDER = {

    index: 0,

    timer: null,

    delay: 5000,

    autoplay: true

};


// ======================================
// INIT
// ======================================

function initSlider() {

    const slides =

        document.querySelectorAll(

            "#banner .slide"

        );

    if (!slides.length)

        return;

    showSlide(0);

    createDots();

    bindSlider();

    if (SLIDER.autoplay) {

        startSlider();

    }

}


// ======================================
// SHOW
// ======================================

function showSlide(index) {

    const slides =

        document.querySelectorAll(

            "#banner .slide"

        );

    const dots =

        document.querySelectorAll(

            ".slider-dot"

        );

    if (!slides.length)

        return;

    if (index < 0)

        index = slides.length - 1;

    if (index >= slides.length)

        index = 0;

    slides.forEach(slide =>

        slide.classList.remove(

            "active"

        )

    );

    dots.forEach(dot =>

        dot.classList.remove(

            "active"

        )

    );

    slides[index]

        .classList

        .add("active");

    if (dots[index])

        dots[index]

            .classList

            .add("active");

    SLIDER.index = index;

}


// ======================================
// NEXT
// ======================================

function nextSlide() {

    showSlide(

        SLIDER.index + 1

    );

}


// ======================================
// PREV
// ======================================

function prevSlide() {

    showSlide(

        SLIDER.index - 1

    );

}


// ======================================
// AUTOPLAY
// ======================================

function startSlider() {

    stopSlider();

    SLIDER.timer =

        setInterval(

            nextSlide,

            SLIDER.delay

        );

}


function stopSlider() {

    clearInterval(

        SLIDER.timer

    );

}


// ======================================
// DOTS
// ======================================

function createDots() {

    const banner =

        document.getElementById(

            "banner"

        );

    if (!banner)

        return;

    const slides =

        banner.querySelectorAll(

            ".slide"

        );

    if (!slides.length)

        return;

    let dots =

        banner.querySelector(

            ".slider-dots"

        );

    if (dots)

        dots.remove();

    dots =

        document.createElement(

            "div"

        );

    dots.className =

        "slider-dots";

    slides.forEach((_, i) => {

        const dot =

            document.createElement(

                "span"

            );

        dot.className =

            "slider-dot";

        dot.onclick = () => {

            showSlide(i);

            startSlider();

        };

        dots.appendChild(dot);

    });

    banner.appendChild(dots);

}


// ======================================
// EVENTS
// ======================================

function bindSlider() {

    const banner =

        document.getElementById(

            "banner"

        );

    if (!banner)

        return;

    banner.addEventListener(

        "mouseenter",

        stopSlider

    );

    banner.addEventListener(

        "mouseleave",

        startSlider

    );

    let startX = 0;

    banner.addEventListener(

        "touchstart",

        e => {

            startX =

                e.touches[0].clientX;

        }

    );

    banner.addEventListener(

        "touchend",

        e => {

            const endX =

                e.changedTouches[0].clientX;

            if (

                startX - endX >

                60

            ) {

                nextSlide();

            }

            else if (

                endX - startX >

                60

            ) {

                prevSlide();

            }

        }

    );

}


// ======================================
// REFRESH
// ======================================

function refreshSlider() {

    SLIDER.index = 0;

    stopSlider();

    initSlider();

}