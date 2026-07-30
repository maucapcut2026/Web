// ======================================
// API.JS
// Google Apps Script API
// ======================================



// ======================================
// GET REQUEST
// ======================================

async function request(action, params = {}) {

    const url = buildUrl(action, params);

    debug("GET:", url);

    const controller = new AbortController();

    const timeout = setTimeout(() => {

        controller.abort();

    }, CONFIG.API_TIMEOUT);

    try {

        const res = await fetch(url, {

            method: "GET",

            signal: controller.signal,

            headers: {

                "Accept": "application/json"

            }

        });

        clearTimeout(timeout);

        if (!res.ok) {

            throw new Error("HTTP " + res.status);

        }

        const json = await res.json();

        if (!json.success) {

            throw new Error(json.message);

        }

        return json.data;

    }

    catch (err) {

        clearTimeout(timeout);

        console.error(err);

        throw err;

    }

}



// ======================================
// POST REQUEST
// ======================================

async function post(action, body = {}) {

    debug("POST:", action);

    const controller = new AbortController();

    const timeout = setTimeout(() => {

        controller.abort();

    }, CONFIG.API_TIMEOUT);

    try {

        const res = await fetch(CONFIG.API_URL, {

            method: "POST",

            signal: controller.signal,

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                action,

                ...body

            })

        });

        clearTimeout(timeout);

        if (!res.ok) {

            throw new Error("HTTP " + res.status);

        }

        const json = await res.json();

        if (!json.success) {

            throw new Error(json.message);

        }

        return json.data;

    }

    catch (err) {

        clearTimeout(timeout);

        console.error(err);

        throw err;

    }

}



// ======================================
// HOME
// ======================================

function apiHome() {

    return request("getHome");

}



// ======================================
// BANNER
// ======================================

function apiBanner() {

    return request("getBanner");

}



// ======================================
// CATEGORY
// ======================================

function apiCategories() {

    return request("getCategories");

}

function apiCategory(id) {

    return request("getCategory", {

        id

    });

}



// ======================================
// TEMPLATE
// ======================================

function apiTemplates(page = 1) {

    return request("getTemplates", {

        page,

        limit: CONFIG.PAGE_SIZE

    });

}

function apiTemplate(id) {

    return request("getTemplate", {

        id

    });

}



// ======================================
// SEARCH
// ======================================

function apiSearch(keyword, page = 1) {

    return request("search", {

        q: keyword,

        page,

        limit: CONFIG.SEARCH_LIMIT

    });

}



// ======================================
// HEALTH CHECK
// ======================================

async function apiPing() {

    try {

        await apiHome();

        return true;

    }

    catch {

        return false;

    }

}