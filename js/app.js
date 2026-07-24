document.addEventListener("DOMContentLoaded", () => {

    // ===== Cuộn mượt khi bấm menu =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Xóa # khỏi URL sau khi cuộn
            setTimeout(() => {
                history.replaceState(null, "", location.pathname);
            }, 500);

        });

    });

    // ===== Nếu mở bằng index.html#... =====
    if (location.hash) {

        const target = document.querySelector(location.hash);

        if (target) {

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

        // Xóa # khỏi URL
        setTimeout(() => {
            history.replaceState(null, "", location.pathname);
        }, 500);

    }

});
// =========================
// Reveal Animation
// =========================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

        }

    });

},{
    threshold:0.15
});

// Section
document.querySelectorAll(".category,.hero").forEach(el=>{

    el.classList.add("reveal");

    observer.observe(el);

});

// Card
document.querySelectorAll(".card").forEach((card,index)=>{

    card.style.transitionDelay = `${index*0.08}s`;

    observer.observe(card);

});

const menuToggle=document.getElementById("menuToggle");
const navbar=document.getElementById("navbar");
const overlay=document.getElementById("menuOverlay");

menuToggle.addEventListener("click",()=>{

    navbar.classList.toggle("show");
    overlay.classList.toggle("show");

});

overlay.addEventListener("click",()=>{

    navbar.classList.remove("show");
    overlay.classList.remove("show");

});

document.querySelectorAll(".navbar a").forEach(item=>{

    item.addEventListener("click",()=>{

        navbar.classList.remove("show");
        overlay.classList.remove("show");

    });

});