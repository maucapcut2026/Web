// ======================================
// CONFIG.JS
// Website Configuration
// ======================================

const CONFIG = {

    // ==================================
    // WEBSITE
    // ==================================

    SITE_NAME: "Mẫu CapCut 2026",

    VERSION: "1.0.0",

    DEBUG: true,

    // ==================================
    // API
    // ==================================

    API_URL:
        "https://api-web.maucapcut2026.workers.dev",

    API_TIMEOUT: 30000,

    // ==================================
    // Pagination
    // ==================================

    PAGE_SIZE: 20,

    HOME_LIMIT: 12,

    SEARCH_LIMIT: 20,

    // ==================================
    // Cache
    // ==================================

    CACHE_TIME: 60000,

    // ==================================
    // Slider
    // ==================================

    SLIDER_DELAY: 5000,

    AUTO_PLAY: true,

    // ==================================
    // Search
    // ==================================

    SEARCH_DELAY: 300,

    MIN_SEARCH_LENGTH: 2,

    // ==================================
    // Image
    // ==================================

    DEFAULT_THUMBNAIL:
        "images/no-image.png",

    DEFAULT_BANNER:
        "images/banner.jpg",

    DEFAULT_AVATAR:
        "images/avatar.png"

};


// ======================================
// API ACTION
// ======================================

const ACTION = {

    // Public

    HOME: "getHome",

    TEMPLATES: "getTemplates",

    TEMPLATE: "getTemplate",

    CATEGORIES: "getCategories",

    CATEGORY: "getCategory",

    SEARCH: "search",

    BANNER: "getBanner"

};


// ======================================
// API URL BUILDER
// ======================================

function buildUrl(action, params = {}) {

    const url = new URL(CONFIG.API_URL);

    url.searchParams.set(
        "action",
        action
    );

    Object.entries(params).forEach(([key, value]) => {

        if (
            value !== undefined &&
            value !== null &&
            value !== ""
        ) {

            url.searchParams.set(
                key,
                value
            );

        }

    });

    return url.toString();

}


// ======================================
// DEBUG
// ======================================

function debug(...args) {

    if (CONFIG.DEBUG) {

        console.log(...args);

    }

}