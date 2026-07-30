// ======================================
// HOME.JS
// ======================================

const HOME = {
    home: {},
    banner: [],
    templates: [],
    categories: []
};

// ======================================
// LOAD HOME
// ======================================

async function loadHome() {

    try {

        showLoading();

        const [
            home,
            banner,
            templates,
            categories
        ] = await Promise.all([
            apiHome(),
            apiBanner(),
            apiTemplates(),
            apiCategories()
        ]);

        HOME.home = home ?? {};

        HOME.banner = Array.isArray(banner)
            ? banner
            : (banner?.items || []);

        HOME.templates = Array.isArray(templates)
            ? templates
            : (templates?.items || []);

        HOME.categories = Array.isArray(categories)
            ? categories
            : (categories?.items || []);

        console.group("HOME");

        console.log("Home:", HOME.home);
        console.log("Banner:", HOME.banner);
        console.log("Templates:", HOME.templates.length);
        console.log("Categories:", HOME.categories.length);

        console.groupEnd();

        renderHome();

    }
    catch (err) {

        console.error("HOME ERROR:", err);

        throw err;

    }
    finally {

        hideLoading();

    }

}



// ======================================
// RELOAD
// ======================================

async function reloadHome() {

    HOME.home = {};
    HOME.banner = [];
    HOME.templates = [];
    HOME.categories = [];

    await loadHome();

}



// ======================================
// TEMPLATE
// ======================================

function getTemplate(id) {

    return HOME.templates.find(item =>
        String(item.id) === String(id)
    ) || null;

}



// ======================================
// CATEGORY
// ======================================

function getCategory(id) {

    return HOME.categories.find(item =>
        String(item.id) === String(id)
    ) || null;

}



// ======================================
// CATEGORY TEMPLATE
// ======================================

function getCategoryTemplates(id) {

    return HOME.templates.filter(item =>
        String(item.categoryId) === String(id)
    );

}



// ======================================
// NEWEST
// ======================================

function getNewest(limit = CONFIG.HOME_LIMIT || 12) {

    return [...HOME.templates]
        .sort((a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        )
        .slice(0, limit);

}



// ======================================
// HOT
// ======================================

function getHot(limit = CONFIG.HOME_LIMIT || 12) {

    return [...HOME.templates]
        .sort((a, b) =>
            Number(b.views || 0) -
            Number(a.views || 0)
        )
        .slice(0, limit);

}



// ======================================
// DOWNLOAD
// ======================================

function getDownloadTop(limit = CONFIG.HOME_LIMIT || 12) {

    return [...HOME.templates]
        .sort((a, b) =>
            Number(b.downloads || 0) -
            Number(a.downloads || 0)
        )
        .slice(0, limit);

}



// ======================================
// LIKE
// ======================================

function getLikeTop(limit = CONFIG.HOME_LIMIT || 12) {

    return [...HOME.templates]
        .sort((a, b) =>
            Number(b.likes || 0) -
            Number(a.likes || 0)
        )
        .slice(0, limit);

}



// ======================================
// SEARCH
// ======================================

function searchLocal(keyword = "") {

    keyword = keyword
        .trim()
        .toLowerCase();

    if (!keyword)
        return HOME.templates;

    return HOME.templates.filter(item => {

        return (
            (item.title || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (item.description || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (item.tags || "")
                .toLowerCase()
                .includes(keyword)
        );

    });

}



// ======================================
// CHECK
// ======================================

function hasTemplates() {

    return HOME.templates.length > 0;

}

function hasBanner() {

    return HOME.banner.length > 0;

}

function hasCategories() {

    return HOME.categories.length > 0;

}



// ======================================
// CLEAR
// ======================================

function clearHome() {

    HOME.home = {};
    HOME.banner = [];
    HOME.templates = [];
    HOME.categories = [];

}