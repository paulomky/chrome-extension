var btnArtiaPage = document.getElementById("btnArtiaPage");
var btnTopDeskPage = document.getElementById("btnTopdeskPage");

var artiaPage = document.getElementById("artia-page");
var topdeskPage = document.getElementById("topdesk-page");

btnArtiaPage.addEventListener("click", openArtiaPage);
btnTopDeskPage.addEventListener("click", openTopdeskPage);

function openArtiaPage(){
    artiaPage.style.display = "block";
    topdeskPage.style.display = "none";
}

function openTopdeskPage(){
    artiaPage.style.display = "none";
    topdeskPage.style.display = "block";
}