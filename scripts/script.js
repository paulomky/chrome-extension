var btnSubmitZendesk = document.getElementById("submit-zendesk");
var btnCreateTask = document.getElementById("btn-create-task");

// All "pages" from index.html
var artiaPage = document.getElementById("artia-page");
var zendeskPage = document.getElementById("zendesk-page");
var errorPage = document.getElementById("error-page");
var loginZendeskPage = document.getElementById("login-zendesk-page");

// Login Zendesk
var emailZendesk = document.getElementById("email-zendesk");
var passwordZendesk = document.getElementById("password-zendesk");

//btnArtiaPage.addEventListener("click", openArtiaPage);
//btnTopDeskPage.addEventListener("click", openZendeskPage);
btnSubmitZendesk.addEventListener("click", setTokenZendesk);
btnCreateTask.addEventListener("click", openZendeskPage);

var inputEmail = document.getElementById("inputEmail");

var zendeskTitle = document.getElementById("ticket-title");

var currentUrl = "";

window.onload = function(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {

        currentUrl = tabs[0].url;
        let domain = (new URL(currentUrl));

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

        var pFilter = permissions.filter(obj => {
            return obj.url === domain.hostname;
        })

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
    //   if(getTokenZedesk() === ""){
    //       openLoginZendesk();
    //   }else{
    getPayloadTicket();
    
    noneAllPage();
    zendeskPage.style.display = "block";
    //}    
}

function openErrorPage(){
    artiagetToken();
    noneAllPage();
    errorPage.style.display = "block";
}

function getTokenZedesk(){
    var token = "";
    return token;
}

function setTokenZendesk(){
    var token = utf8_to_b64(emailZendesk.value+":"+passwordZendesk.value);
    
    validZendeskToken(token);
}

function openLoginZendesk(){
    noneAllPage();
    loginZendeskPage.style.display = "block";
}

function validZendeskToken(token){
    console.log(token);
    //https://solinftec.zendesk.com/api/v2/account
    fetch('https://solinftec.zendesk.com/api/v2/account', {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain',
            'X-My-Custom-Header': 'value-v',
            // INÚTIL -> 'Authorization': 'Basic ' + token,
        }
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}

function getPayloadTicket(){
    var ticket_id = currentUrl.substring(
        currentUrl.indexOf("tickets/") + 8, 
        currentUrl.length
    );

    if(ticket_id > 0){
        getZendeskTitle(ticket_id);
        //getZendeskComments(ticket_id);
    }
}

//Get title ticket
function getZendeskTitle(ticket_id){
    var finalJSON = "";
    fetch(`https://solinftec.zendesk.com/api/v2/tickets/${ticket_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain',
            'X-My-Custom-Header': 'value-v',
            // INÚTIL -> 'Authorization': 'Basic ' + token,
        }
    })
    .then(response => response.text())
    .then(result => {
        finalJSON = JSON.parse(result);
        console.log("log getZendeskTitle");
        console.log(finalJSON.ticket.subject);
        console.log(zendeskTitle);
        zendeskTitle.value = finalJSON.ticket.subject;
    })
    .catch(error => console.log('error', error));
}

//Get comment ticket
function getZendeskComments(ticket_id){
    var finalJSON = "";
    var objComment = {};
    fetch(`https://solinftec.zendesk.com/api/v2/tickets/${ticket_id}/comments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain',
            'X-My-Custom-Header': 'value-v',
            // INÚTIL -> 'Authorization': 'Basic ' + token,
        }
    })
    .then(response => response.text())
    .then(result => {
        finalJSON = JSON.parse(result);
        console.log(finalJSON.comments[0].author_id);
        
        for(var i = 0; i < finalJSON.comments.length; i++){
            console.log(getNameById(finalJSON.comments[i].author_id));
        }

        //document.getElementById("ticket-title").value = finalJSON.ticket.subject;
    })
    .catch(error => console.log('error', error));
}

//Get name by author id
function getNameById(id){
    var userName = "";
    var finalJSON = "";
    fetch(`https://solinftec.zendesk.com/api/v2/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain',
            'X-My-Custom-Header': 'value-v',
            // INÚTIL -> 'Authorization': 'Basic ' + token,
        }
    })
    .then(response => response.text())
    .then(result => {
        finalJSON = JSON.parse(result);
        userName = finalJSON.user.name;
        //return userName;
        //document.getElementById("ticket-title").value = finalJSON.ticket.subject;
    })
    .catch(error => console.log('error', error));
}