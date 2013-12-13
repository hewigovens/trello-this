var menuClicked = function(info, tab){
    console.log("trello this!");
    chrome.tabs.executeScript({file: "js/content.js"});
};

var contexts = ["page","selection","link","editable","image","video",
                "audio"];

var storage = localStorage;

chrome.contextMenus.create({"title": "Card this to Trello",
                            "contexts": contexts,
                            "onclick": menuClicked});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){

    console.log(request, sender);
    if (request.action === "showNotification") {
        var notification = webkitNotifications.createNotification("img/trello-48.png","Card this to Trello", request.text);
        notification.addEventListener('click', function(){
            notification.cancel();
            chrome.tabs.create({url:request.link});
        });
        notification.show();
        setTimeout(function(){
            notification.cancel();
        },2000);
    } else if (request.action === "getTrelloToken") {
        if (storage.trello_token) {
            sendResponse(storage.trello_token);
        } else{
            sendResponse("");
        }
    } else if(request.action === "setTrelloToken") {
        if (request.trello_token) {
            storage["trello_token"] = request.trello_token;
        };
    }
});
