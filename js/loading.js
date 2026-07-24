// =========================
// Loading
// =========================

const loader = document.getElementById("loader");
const percent = document.querySelector(".loader-percent");
const fill = document.getElementById("loadingFill");
const loadingText = document.querySelector(".loader-card p");

const LIMIT = 5;
const BLOCK_TIME = 60000; // 1 phút

let data = JSON.parse(localStorage.getItem("reload_limit")) || {
    count: 0,
    first: Date.now(),
    blockedUntil: 0
};

const now = Date.now();


// =========================
// Load CSS
// =========================

function loadCSS(href){

    return new Promise((resolve,reject)=>{

        const link=document.createElement("link");

        link.rel="stylesheet";

        link.href=href;

        link.onload=resolve;

        link.onerror=reject;

        document.head.appendChild(link);

    });

}


// =========================
// Load JS
// =========================

function loadScript(src){

    return new Promise((resolve,reject)=>{

        const script=document.createElement("script");

        script.src=src;

        script.onload=resolve;

        script.onerror=reject;

        document.body.appendChild(script);

    });

}


// =========================
// Load Website
// =========================

async function startApp(){

    try{

        // =========================
        // CSS
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
            loadCSS("css/responsive.css")

        ]);


        // =========================
        // JS
        // =========================

        await Promise.all([

            loadScript("js/app.js")

            // Hoặc chia nhiều file

            /*
            loadScript("js/api.js"),
            loadScript("js/header.js"),
            loadScript("js/home.js"),
            loadScript("js/movie.js"),
            loadScript("js/watch.js")
            */

        ]);

    }
    catch(err){

        console.error("Load Error:",err);

    }

}


// =========================
// Ẩn Website
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
// Hiện Website
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
// Đếm ngược khi bị chặn
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

            <div style="font-size:42px;font-weight:800;color:#2563eb;margin-top:18px">
                ${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}
            </div>

            <div style="margin-top:15px;color:#666">
                Vui lòng chờ...
            </div>

        `;

    }

    update();

    setInterval(update,1000);

}


// =========================
// Kiểm tra số lần tải
// =========================

if(now<data.blockedUntil){

    startCountdown(data.blockedUntil);

}
else{

    if(now-data.first>BLOCK_TIME){

        data.count=0;
        data.first=now;

    }

    data.count++;

    localStorage.setItem(
        "reload_limit",
        JSON.stringify(data)
    );

    if(data.count>LIMIT){

        data.blockedUntil=now+BLOCK_TIME;

        localStorage.setItem(
            "reload_limit",
            JSON.stringify(data)
        );

        startCountdown(data.blockedUntil);

    }
    else{

        hidePage();

        let progress=0;

        const timer=setInterval(()=>{

            progress++;

            percent.textContent=progress+"%";

            fill.style.width=progress+"%";

            if(progress>=100){

                clearInterval(timer);

                (async()=>{

                    await startApp();

                    showPage();

                    loader.classList.add("hide");

                })();

            }

        },18);

    }

}