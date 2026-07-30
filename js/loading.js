// ======================================
// LOADING.JS
// P1 - Config / Element / Utils
// ======================================


// =========================
// ELEMENT
// =========================

const loader = document.getElementById("loader");

const percent = document.querySelector(".loader-percent");

const fill = document.getElementById("loadingFill");

const loadingText = document.querySelector(".loader-card p");


// =========================
// CONFIG
// =========================

const LIMIT = 5;

const BLOCK_TIME = 60 * 1000;

const API_TIMEOUT = 30000;


// =========================
// RELOAD DATA
// =========================

let reloadData = JSON.parse(

    localStorage.getItem("reload_limit")

) || {

    count: 0,

    first: Date.now(),

    blockedUntil: 0

};

const NOW = Date.now();


// =========================
// WEBSITE STATE
// =========================

let progress = 0;

let finished = false;

let hasError = false;

let errorMessage = "";

let timer = null;


// =========================
// LOAD CSS
// =========================

function loadCSS(href){

    return new Promise((resolve,reject)=>{

        if(document.querySelector(`link[href="${href}"]`)){

            resolve();

            return;

        }

        const link=document.createElement("link");

        link.rel="stylesheet";

        link.href=href;

        link.onload=resolve;

        link.onerror=()=>reject(

            new Error("Không thể tải CSS: "+href)

        );

        document.head.appendChild(link);

    });

}


// =========================
// LOAD JS
// =========================

function loadScript(src){

    return new Promise((resolve,reject)=>{

        if(document.querySelector(`script[src="${src}"]`)){

            resolve();

            return;

        }

        const script=document.createElement("script");

        script.src=src;

        script.defer=true;

        script.onload=resolve;

        script.onerror=()=>reject(

            new Error("Không thể tải JS: "+src)

        );

        document.body.appendChild(script);

    });

}


// =========================
// TIMEOUT
// =========================

function timeout(ms){

    return new Promise((_,reject)=>{

        setTimeout(()=>{

            reject(

                new Error("Máy chủ phản hồi quá lâu.")

            );

        },ms);

    });

}


// =========================
// HIDE WEBSITE
// =========================

function hidePage(){

    document.body.style.overflow="hidden";

    [...document.body.children].forEach(el=>{

        if(el.id!=="loader"){

            el.style.display="none";

        }

    });

}


// =========================
// SHOW WEBSITE
// =========================

function showPage(){

    [...document.body.children].forEach(el=>{

        if(el.id!=="loader"){

            el.style.display="";

        }

    });

    document.body.style.overflow="";

}


// =========================
// UPDATE PROGRESS
// =========================

function updateProgress(value){

    progress=Math.min(value,100);

    percent.textContent=progress+"%";

    fill.style.width=progress+"%";

}
// ======================================
// P2 - START APP
// ======================================


// =========================
// START APP
// =========================

async function startApp(){

    // =========================
    // LOAD CSS
    // =========================

    await Promise.all([

        loadCSS("css/reset.css"),
        loadCSS("css/variables.css"),
        loadCSS("css/header.css"),
        loadCSS("css/navbar.css"),
        loadCSS("css/hero.css"),
        loadCSS("css/section.css"),
        loadCSS("css/category.css"),
        loadCSS("css/slider.css"),
        loadCSS("css/card.css"),
        loadCSS("css/footer.css"),
        loadCSS("css/animation.css"),
        loadCSS("css/dark.css"),
        loadCSS("css/error.css"),
        loadCSS("css/responsive.css")

    ]);


    // =========================
    // LOAD JS
    // =========================

    await loadScript("js/config.js");

    await loadScript("js/utils.js");


    await Promise.all([

        loadScript("js/api.js"),
        loadScript("js/render.js"),
        loadScript("js/slider.js"),
        loadScript("js/category.js"),
        loadScript("js/search.js"),
        loadScript("js/home.js")

    ]);


    await loadScript("js/app.js");


    // =========================
    // LOAD HOME (API)
    // =========================

    if(typeof loadHome==="function"){

        await Promise.race([

            loadHome(),

            timeout(API_TIMEOUT)

        ]);

    }

}


// =========================
// START WEBSITE
// =========================

async function bootWebsite(){

    try{

        await startApp();

        finished=true;

    }

    catch(err){

        console.error(err);

        hasError=true;

        errorMessage=err.message||"Không thể kết nối máy chủ.";

        finished=true;

    }

}


// =========================
// START LOADING
// =========================

function beginLoading(){

    hidePage();

    progress=0;

    updateProgress(0);

    bootWebsite();

}
// ======================================
// P3 - Progress + Error Overlay
// ======================================


// =========================
// UPDATE LOADING
// =========================

function startProgress(){

    timer = setInterval(()=>{

        // =====================
        // Chưa tải xong
        // =====================

        if(!finished){

            if(progress < 70){

                progress += 2;

            }

            else if(progress < 90){

                progress++;

            }

        }

        // =====================
        // Đã tải xong
        // =====================

        else{

            if(progress < 100){

                progress += 2;

            }

        }

        if(progress > 100){

            progress = 100;

        }

        updateProgress(progress);

        // =====================
        // Hoàn tất
        // =====================

        if(progress >= 100 && finished){

            clearInterval(timer);

            timer = null;

            setTimeout(()=>{

                if(hasError){

                    showErrorPage(errorMessage);

                }

                else{

                    showPage();

                    loader.classList.add("hide");

                }

            },250);

        }

    },20);

}


// =========================
// ERROR PAGE
// =========================

function showErrorPage(message){

    // Bỏ giới hạn tải lại khi API lỗi
    localStorage.removeItem("reload_limit");

    showPage();

    loader.classList.add("hide");

    document.body.style.overflow="hidden";

    if(document.getElementById("api-error-overlay")){

        return;

    }

    const overlay=document.createElement("div");

    overlay.id="api-error-overlay";

    overlay.innerHTML=`

        <div class="api-error-box">

            <div class="api-error-code">

                404

            </div>

            <h2>

                Không thể tải dữ liệu

            </h2>

            <p>

                ${message}

            </p>

            <button id="retryLoading">

                Thử lại

            </button>

        </div>

    `;

    document.body.appendChild(overlay);


    document
        .getElementById("retryLoading")
        .addEventListener("click",()=>{

            location.reload();

        });

}


// =========================
// REMOVE ERROR
// =========================

function removeErrorPage(){

    const overlay=document.getElementById(

        "api-error-overlay"

    );

    if(overlay){

        overlay.remove();

    }

}
// ======================================
// P4 - Reload Limit + Main
// ======================================


// =========================
// COUNTDOWN
// =========================

function startCountdown(endTime){

    hidePage();

    loader.classList.remove("hide");

    percent.textContent="";

    fill.style.width="100%";

    function update(){

        const left=endTime-Date.now();

        if(left<=0){

            localStorage.removeItem("reload_limit");

            location.reload();

            return;

        }

        const m=Math.floor(left/60000);

        const s=Math.floor((left%60000)/1000);

        loadingText.innerHTML=`

            <div style="font-size:18px;font-weight:700">

                ⚠️ Bạn đã tải trang quá nhiều lần

            </div>

            <div style="
                font-size:42px;
                font-weight:800;
                color:#2563eb;
                margin-top:18px;
            ">

                ${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}

            </div>

            <div style="
                margin-top:15px;
                color:#666;
            ">

                Vui lòng chờ...

            </div>

        `;

    }

    update();

    setInterval(update,1000);

}


// =========================
// CHECK RELOAD LIMIT
// =========================

function checkReloadLimit(){

    if(NOW<reloadData.blockedUntil){

        startCountdown(reloadData.blockedUntil);

        return false;

    }

    if(NOW-reloadData.first>BLOCK_TIME){

        reloadData.count=0;

        reloadData.first=NOW;

    }

    reloadData.count++;

    localStorage.setItem(

        "reload_limit",

        JSON.stringify(reloadData)

    );

    if(reloadData.count>LIMIT){

        reloadData.blockedUntil=NOW+BLOCK_TIME;

        localStorage.setItem(

            "reload_limit",

            JSON.stringify(reloadData)

        );

        startCountdown(reloadData.blockedUntil);

        return false;

    }

    return true;

}


// =========================
// MAIN
// =========================

(function(){

    if(!checkReloadLimit()){

        return;

    }

    beginLoading();

    startProgress();

})();