// ======================================
// RENDER.JS
// ======================================

// =========================
// ELEMENT
// =========================

const heroImage = document.querySelector(".hero-image img");
const heroTitle = document.querySelector(".hero-text h1");
const heroDesc = document.querySelector(".hero-text p");

const newestSlider = document.querySelector("#new .slider");
const tiktokSlider = document.querySelector("#tiktok .slider");
const musicSlider = document.querySelector("#music .slider");
const effectSlider = document.querySelectorAll(".category .slider")[3];


// =========================
// IMAGE
// =========================

function getImage(item = {}) {

    return (
        item.thumbnail ||
        item.preview ||
        item.image ||
        item.cover ||
        "images/no-image.jpg"
    );

}


// =========================
// CARD
// =========================

function createCard(item) {

    return `
        <article class="card">

            <a href="template.html?id=${item.id}">

                <img
                    src="${getImage(item)}"
                    alt="${item.title || ""}"
                    loading="lazy"
                >

            </a>

            <h3>${item.title || ""}</h3>

            <p>${item.description || ""}</p>

        </article>
    `;

}


// =========================
// EMPTY
// =========================

function emptyHTML(text = "Không có dữ liệu") {

    return `
        <div class="empty">
            ${text}
        </div>
    `;

}


// =========================
// LIST
// =========================

function renderList(container, list = []) {

    if (!container) return;

    if (!Array.isArray(list) || list.length === 0) {

        container.innerHTML = emptyHTML();

        return;

    }

    container.innerHTML = list.map(createCard).join("");

}


// =========================
// HERO
// =========================

function renderHero(list = []) {

    if (!Array.isArray(list) || list.length === 0) return;

    const item = list[0];

    if (heroImage)
        heroImage.src = getImage(item);

    if (heroTitle)
        heroTitle.textContent = item.title || "Mẫu CapCut";

    if (heroDesc)
        heroDesc.textContent = item.description || "";

}


// =========================
// NEWEST
// =========================

function renderNewest() {

    renderList(
        newestSlider,
        getNewest(12)
    );

}


// =========================
// TIKTOK
// =========================

function renderTikTok() {

    let list = HOME.templates.filter(item => {

        const tag = (item.tags || "").toLowerCase();

        return tag.includes("tiktok") ||
               tag.includes("hot");

    });

    if (!list.length) {

        list = getHot(12);

    }

    renderList(tiktokSlider, list);

}


// =========================
// MUSIC
// =========================

function renderMusic() {

    let list = HOME.templates.filter(item => {

        const tag = (item.tags || "").toLowerCase();

        return tag.includes("music") ||
               tag.includes("nhạc") ||
               tag.includes("trend");

    });

    if (!list.length) {

        list = getDownloadTop(12);

    }

    renderList(musicSlider, list);

}


// =========================
// EFFECT
// =========================

function renderEffect() {

    if (!effectSlider) return;

    let list = HOME.templates.filter(item => {

        const tag = (item.tags || "").toLowerCase();

        return tag.includes("effect") ||
               tag.includes("hiệu ứng");

    });

    if (!list.length) {

        list = getLikeTop(12);

    }

    renderList(effectSlider, list);

}


// =========================
// HOME
// =========================

function renderHome() {

    console.log("HOME:", HOME);

    renderHero(HOME.banner);

    renderNewest();

    renderTikTok();

    renderMusic();

    renderEffect();

    if (typeof initSlider === "function") {

        initSlider();

    }

    if (typeof initReveal === "function") {

        initReveal();

    }

}


// =========================
// LOADING
// =========================

function showLoading() {

    document
        .getElementById("loader")
        ?.classList.remove("hide");

}

function hideLoading() {

    document
        .getElementById("loader")
        ?.classList.add("hide");

}


// =========================
// ERROR
// =========================

function showError(message) {

    console.error(message);

    // Không render lỗi lên giao diện.
    // Loading.js sẽ hiển thị Error Overlay (404).

}