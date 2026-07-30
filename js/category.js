// ======================================
// CATEGORY.JS
// Danh mục
// ======================================


// ======================================
// CURRENT
// ======================================

let currentCategory = "";


// ======================================
// INIT
// ======================================

function initCategory() {

    const params =

        new URLSearchParams(

            location.search

        );

    currentCategory =

        params.get("category") || "";

    if (currentCategory) {

        filterCategory(

            currentCategory

        );

    }

}


// ======================================
// FILTER
// ======================================

function filterCategory(id) {

    currentCategory = id;

    const list =

        HOME.templates.filter(item =>

            String(item.categoryId) ===

            String(id)

        );

    renderTemplates(list);

    activeCategory(id);

}


// ======================================
// ALL
// ======================================

function showAllCategory() {

    currentCategory = "";

    renderTemplates(

        HOME.templates

    );

    activeCategory("");

}


// ======================================
// ACTIVE
// ======================================

function activeCategory(id) {

    document

        .querySelectorAll(

            ".category-item"

        )

        .forEach(item => {

            item.classList.remove(

                "active"

            );

            if (

                item.dataset.id == id

            ) {

                item.classList.add(

                    "active"

                );

            }

        });

}


// ======================================
// EVENTS
// ======================================

function bindCategory() {

    document.addEventListener(

        "click",

        e => {

            const item =

                e.target.closest(

                    ".category-item"

                );

            if (!item)

                return;

            e.preventDefault();

            const id =

                item.dataset.id;

            if (!id) {

                showAllCategory();

                return;

            }

            filterCategory(id);

        }

    );

}


// ======================================
// COUNT
// ======================================

function categoryCount(id) {

    return HOME.templates.filter(

        item =>

        String(item.categoryId) ===

        String(id)

    ).length;

}


// ======================================
// GET NAME
// ======================================

function categoryName(id) {

    const item =

        HOME.categories.find(

            c =>

            String(c.id) ===

            String(id)

        );

    return item ?

        item.name :

        "";

}