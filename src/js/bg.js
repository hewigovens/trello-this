var menuClicked = function(info, tab){
    console.log("trello this: " + info.pageUrl);
    chrome.tabs.insertCSS({file: "css/dropdown-menu.css"}, function(){
        chrome.tabs.executeScript({file: "js/content.js"});
    });
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
        chrome.notifications.create(request.link, {
            'type' : 'basic',
            'title': 'Trello card created',
            'message': request.text,
            'iconUrl': 'img/trello-48.png'}, function(){
                console.log('notification sent: ' + message);
            });
        chrome.notifications.onClicked.addListener(function(notification_id){
            chrome.tabs.create({url:notification_id});
        });

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
