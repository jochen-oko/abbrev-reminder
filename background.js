
chrome.browserAction.onClicked.addListener(function(activeTab) {
    chrome.tabs.executeScript(null, {file: "contentscript.js"});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method === "getAbbrevs")
      sendResponse({status: localStorage['abbrevs']});
    else
      sendResponse({});
});