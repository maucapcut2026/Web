// ======================================
// SEARCH.JS
// Tìm kiếm
// ======================================


// ======================================
// SEARCH
// ======================================

let searchKeyword = "";


// ======================================
// INIT
// ======================================

function initSearch() {

    const input =

        document.getElementById("search");

    if (!input) return;

    input.addEventListener(

        "input",

        function () {

            searchKeyword =

                this.value.trim();

            searchTemplates(

                searchKeyword

            );

        }

    );

}


// ======================================
// SEARCH
// ======================================

function searchTemplates(keyword = "") {

    keyword =

        keyword

        .trim()

        .toLowerCase();

    if (!keyword) {

        renderTemplates(

            HOME.templates

        );

        return;

    }

    const list =

        HOME.templates.filter(item => {

            return (

                String(item.title || "")

                .toLowerCase()

                .includes(keyword)

                ||

                String(item.description || "")

                .toLowerCase()

                .includes(keyword)

                ||

                String(item.tags || "")

                .toLowerCase()

                .includes(keyword)

                ||

                String(item.slug || "")

                .toLowerCase()

                .includes(keyword)

            );

        });

    renderTemplates(list);

}


// ======================================
// CLEAR
// ======================================

function clearSearch() {

    searchKeyword = "";

    const input =

        document.getElementById(

            "search"

        );

    if (input)

        input.value = "";

    renderTemplates(

        HOME.templates

    );

}


// ======================================
// ENTER
// ======================================

function bindSearchEnter() {

    const input =

        document.getElementById(

            "search"

        );

    if (!input) return;

    input.addEventListener(

        "keydown",

        function (e) {

            if (

                e.key === "Enter"

            ) {

                searchTemplates(

                    this.value

                );

            }

        }

    );

}


// ======================================
// RESULT COUNT
// ======================================

function searchCount(keyword) {

    keyword =

        keyword

        .toLowerCase();

    return HOME.templates.filter(item =>

        String(item.title)

        .toLowerCase()

        .includes(keyword)

    ).length;

}