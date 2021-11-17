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

var actualCode = '(' + function() {
    // All code is executed in a local scope.
    // For example, the following does NOT overwrite the global `alert` method
    var alert = null;
    // To overwrite a global variable, prefix `window`:
    window.alert = null;
} + ')();';
var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();