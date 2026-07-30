// ======================================
// APP.JS
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    initSmoothScroll();

    initReveal();

    initMobileMenu();

});


// ======================================
// SMOOTH SCROLL
// ======================================

function initSmoothScroll(){

    document.querySelectorAll('a[href^="#"]').forEach(link=>{

        link.addEventListener("click",e=>{

            const target=document.querySelector(link.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",
                block:"start"

            });

            setTimeout(()=>{

                history.replaceState(null,"",location.pathname);

            },500);

        });

    });

    if(location.hash){

        const target=document.querySelector(location.hash);

        if(target){

            target.scrollIntoView({

                behavior:"smooth",
                block:"start"

            });

        }

        setTimeout(()=>{

            history.replaceState(null,"",location.pathname);

        },500);

    }

}


// ======================================
// REVEAL
// ======================================

const revealObserver = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        entry.target.classList.add("show");

        revealObserver.unobserve(entry.target);

    });

},{
    threshold:.15
});


// ======================================
// INIT REVEAL
// ======================================

function initReveal(){

    // Section
    document.querySelectorAll(".hero,.category").forEach(el=>{

        if(!el.classList.contains("reveal")){

            el.classList.add("reveal");

        }

        revealObserver.observe(el);

    });

    // Card
    document.querySelectorAll(".card").forEach((card,index)=>{

        card.style.transitionDelay=`${index*0.08}s`;

        revealObserver.observe(card);

    });

}


// ======================================
// MOBILE MENU
// ======================================

function initMobileMenu(){

    const menuToggle=document.getElementById("menuToggle");

    const navbar=document.getElementById("navbar");

    const overlay=document.getElementById("menuOverlay");

    if(!menuToggle || !navbar || !overlay) return;

    menuToggle.onclick=()=>{

        navbar.classList.toggle("show");

        overlay.classList.toggle("show");

    };

    overlay.onclick=closeMenu;

    navbar.querySelectorAll("a").forEach(a=>{

        a.onclick=closeMenu;

    });

    function closeMenu(){

        navbar.classList.remove("show");

        overlay.classList.remove("show");

    }

}