

var btnArtiaPage = document.getElementById("btnArtiaPage");
var btnTopDeskPage = document.getElementById("btnTopdeskPage");

// All "pages" from index.html
var artiaPage = document.getElementById("artia-page");
var zendeskPage = document.getElementById("zendesk-page");
var errorPage = document.getElementById("error-page");
var loginZendeskPage = document.getElementById("login-zendesk-page");

//btnArtiaPage.addEventListener("click", openArtiaPage);
//btnTopDeskPage.addEventListener("click", openZendeskPage);

var inputEmail = document.getElementById("inputEmail");

window.onload = function(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {

        let url = tabs[0].url;
        let domain = (new URL(url));

        const permissions = [
            {
                url: "app.artia.com",
                name: "Artia"
            },
            {
                url: "solinftec.zendesk.com",
                name: "Zendesk"
            }
        ]

        console.log(domain.hostname);
        console.log(permissions);

        var pFilter = permissions.filter(obj => {
            return obj.url === domain.hostname;
        })

        console.log(pFilter);

        if(pFilter.length > 0){
            window["open"+pFilter[0].name+"Page"]();
        }else {
            openErrorPage();
        }

    })
}

function noneAllPage(){
    artiaPage.style.display = "none";
    zendeskPage.style.display = "none";
    errorPage.style.display = "none";
    loginZendeskPage.style.display = "none";
}

function openArtiaPage(){
    noneAllPage();
    artiaPage.style.display = "block";
}

function openZendeskPage(){
    // if(getTokenZedesk() === ""){
    //     openLoginZendesk();
    // }else{
        noneAllPage();
        zendeskPage.style.display = "block";
    //}    
}

function openErrorPage(){
    artiagetToken();
    noneAllPage();
    errorPage.style.display = "block";
}

function getTokenZendesk(){
    var token = "";
    return token;
}

function openLoginZendesk(){
    noneAllPage();
    loginZendeskPage.style.display = "block";
}