// ======================================
// UTILS.JS
// Hàm dùng chung
// ======================================


// ======================================
// QUERY
// ======================================

function $(selector) {

    return document.querySelector(selector);

}

function $$(selector) {

    return document.querySelectorAll(selector);

}


// ======================================
// CREATE ELEMENT
// ======================================

function create(tag, className = "") {

    const el = document.createElement(tag);

    if (className) {

        el.className = className;

    }

    return el;

}


// ======================================
// TEXT
// ======================================

function escapeHTML(text = "") {

    return String(text)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


// ======================================
// IMAGE
// ======================================

function image(url) {

    return url ||

        CONFIG.DEFAULT_IMAGE;

}


// ======================================
// DATE
// ======================================

function formatDate(date) {

    if (!date) return "";

    return new Date(date)

        .toLocaleDateString(

            "vi-VN"

        );

}


// ======================================
// NUMBER
// ======================================

function number(value) {

    return Number(value || 0)

        .toLocaleString("vi-VN");

}


// ======================================
// RANDOM
// ======================================

function random(min, max) {

    return Math.floor(

        Math.random() *

        (max - min + 1)

    ) + min;

}


// ======================================
// SLUG
// ======================================

function slug(text) {

    return String(text)

        .toLowerCase()

        .normalize("NFD")

        .replace(/[\u0300-\u036f]/g, "")

        .replace(/đ/g, "d")

        .replace(/[^a-z0-9]+/g, "-")

        .replace(/^-+|-+$/g, "");

}


// ======================================
// URL PARAM
// ======================================

function param(name) {

    return new URLSearchParams(

        location.search

    ).get(name);

}


// ======================================
// REDIRECT
// ======================================

function go(url) {

    location.href = url;

}


// ======================================
// DEBOUNCE
// ======================================

function debounce(fn, delay = 300) {

    let timer;

    return function () {

        clearTimeout(timer);

        timer = setTimeout(

            () => fn.apply(

                this,

                arguments

            ),

            delay

        );

    };

}


// ======================================
// COPY
// ======================================

async function copy(text) {

    try {

        await navigator.clipboard

            .writeText(text);

        return true;

    }

    catch {

        return false;

    }

}


// ======================================
// TOAST
// ======================================

function toast(message) {

    alert(message);

}


// ======================================
// LOADING
// ======================================

function showLoading() {

    const loader =

        $("#loader");

    if (loader) {

        loader.classList.remove(

            "hide"

        );

    }

}

function hideLoading() {

    const loader =

        $("#loader");

    if (loader) {

        loader.classList.add(

            "hide"

        );

    }

}


// ======================================
// EMPTY CHECK
// ======================================

function empty(value) {

    return value === null ||

        value === undefined ||

        value === "";

}


// ======================================
// ARRAY
// ======================================

function array(value) {

    return Array.isArray(value)

        ? value

        : [];

}


// ======================================
// OBJECT
// ======================================

function object(value) {

    return value &&

        typeof value === "object"

        ? value

        : {};

}


// ======================================
// DELAY
// ======================================

function sleep(ms) {

    return new Promise(resolve =>

        setTimeout(resolve, ms)

    );

}