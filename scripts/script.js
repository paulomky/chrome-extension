var btnArtiaPage = document.getElementById("btnArtiaPage");
var btnTopDeskPage = document.getElementById("btnTopdeskPage");

var artiaPage = document.getElementById("artia-page");
var topdeskPage = document.getElementById("topdesk-page");
var errorPage = document.getElementById("error-page");

btnArtiaPage.addEventListener("click", openArtiaPage);
btnTopDeskPage.addEventListener("click", openZendeskPage);

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
            },
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

        inputEmail.setAttribute("value", domain.hostname);
    })
}

function openArtiaPage(){
    artiaPage.style.display = "block";
    topdeskPage.style.display = "none";
    errorPage.style.display = "none";
}

function openZendeskPage(){
    artiaPage.style.display = "none";
    topdeskPage.style.display = "block";
    errorPage.style.display = "none";
}

function openErrorPage(){
    errorPage.style.display = "block";
    artiaPage.style.display = "none";
    topdeskPage.style.display = "none";
}