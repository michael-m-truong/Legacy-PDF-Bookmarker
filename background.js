//console.log("HOLA");
//var pdfActive = true
/*  */
var message = ""
var recieved = false
var url_pdf = ""
var tabID_pdf = ""
var start = "start"
var clickedPage;
var nums = [];
var titles = [];
var trashNums = [];
var trashTitles = [];

chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
      url_pdf = tabs[0].url;
      tabID_pdf = tabs[0].id;
      //console.log(tabURL);
      //console.log("query")
      //console.log(test_ID)

});

chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, current_tab_info => {
//    console.log(current_tab_info.url)
//    console.log("test")
  })
})


function myListener3(windowId) {
  //console.log("windowID " + windowId)
  chrome.tabs.query({
      active: true,
      currentWindow: true
  }, function(tabs) {
      url_pdf = tabs[0].url;
      tabID_pdf = tabs[0].id;
      //console.log(tabURL);
  //    console.log("query")
      //console.log(test_ID)
  });
  chrome.windows.onFocusChanged.removeListener(myListener3)
  chrome.windows.onFocusChanged.addListener(myListener3)
}
//chrome.windows.onFocusChanged.addListener(myListener3)

function myListener(tabId, info, tab) {
//  console.log("Hola")
//  console.log(tab.url)
  chrome.tabs.onUpdated.removeListener(myListener)
  chrome.tabs.onUpdated.addListener(myListener)
  url_pdf = tab.url
}

chrome.tabs.onUpdated.addListener(myListener);

function myListner2(tab) {
//  console.log('activated!')
  chrome.tabs.get(tab.tabId, current_tab_info => {
    //  console.log(current_tab_info.url)
      //console.log(message)
      url_pdf = current_tab_info.url
      tabID_pdf = tab.tabId
  //    console.log(url_pdf)
      //chrome.tabs.onActivated.removeListener(myListner2)
      //chrome.tabs.onActivated.addListener(myListner2)
  });
}
//chrome.tabs.onActivated.addListener(myListner2)

function messageSend(request, sender, sendResponse) {
  //console.log(request.msg)
  if (request.msg != request.start && request.msg != "refresh" && request.trash != "trash") {
  //  console.log("test!")
    //console.log("ITS MEEEEEE")
    //console.log(request.msg2)
    message = request.msg
    //console.log(message)
    nums.push(request.msg)
    titles.push(request.msg2)
  //  console.log(request.position)
  //  console.log(nums)
  //  console.log(titles)
  //  console.log("POSITIONNNN")
  //  console.log(nums)
  //  console.log(titles)
    chrome.storage.local.set({bookmarkPages: nums}, function() {
    //  console.log("Set array" + nums)
    });

    chrome.storage.local.set({bookmarkTitles: titles}, function() {
  //    console.log("Set array" + titles)
    });
    chrome.storage.local.get(null, function(items) {
  //    console.log(items)
    })
    /*chrome.tabs.update(tabID_pdf, {url: url_pdf.split("#")[0] + "#page=" + message})
    setTimeout(() => {
      chrome.tabs.reload(tabID_pdf)
      //console.log("refreshed")
    }, 10)*/
  //chrome.runtime.onMessage.removeListener(messageSend)
  //chrome.runtime.onMessage.addListener(messageSend)
  }
  chrome.runtime.onMessage.removeListener(messageSend)
  chrome.runtime.onMessage.addListener(messageSend)
}
chrome.runtime.onMessage.addListener(messageSend) //i may need this lol


function garbage(request, sender, sendResponse) {
  if (request.trash == "trash") {
    trashNums.push(request.position)
  }

}
chrome.runtime.onMessage.addListener(garbage)

function connection(externalPort) {
  externalPort.onDisconnect.addListener(function() {connection2(externalPort)})
}
chrome.runtime.onConnect.addListener(connection)

function connection2(externalPort) {
  var ignoreError = chrome.runtime.lastError;
//  console.log("onDisconnect");
  trashNums.sort()
  trashNums.reverse()
  for (var i = 0; i < trashNums.length; i++){
  //  console.log(nums)
    nums.splice(trashNums[i],1)
    titles.splice(trashNums[i],1)
//    console.log(nums)
  }
  chrome.storage.local.set({bookmarkPages: nums}, function() {
  //  console.log("Set array" + nums)
  });

  chrome.storage.local.set({bookmarkTitles: titles}, function() {
  //  console.log("Set array" + titles)
  });
  trashNums = []
  externalPort.onDisconnect.removeListener(connection2)
}



function startup(request, sender, sendResponse) {
//  console.log(nums)
//  console.log(titles)
  if (request.start == request.msg && request.start == request.position) {
  //  chrome.runtime.onMessage.addListener(messageSend)
  nums = []
  titles = []
  chrome.tabs.query({
      active: true,
      currentWindow: true
  }, function(tabs) {
      url_pdf = tabs[0].url;
      tabID_pdf = tabs[0].id;
      //console.log(tabURL);
    //  console.log("query")
      //console.log(test_ID)
  });
  chrome.storage.local.get(null, function(items) {
//    console.log(items)
  })
  //  console.log("WE STARTED")
    chrome.storage.local.get(['bookmarkPages', 'bookmarkTitles'], function(result) {
      for (var i = 0; i < result.bookmarkPages.length; i++) {
        nums.push(result.bookmarkPages[i])
        titles.push(result.bookmarkTitles[i])
        //console.log(result.bookmarkPages[i] + 10)
        savedPage = result.bookmarkPages[i].toString()
        //console.log(i)
        savedTitle = result.bookmarkTitles[i]
        //console.log(savedTitle)
        //chrome.runtime.sendMessage({defaultTitle: savedTitle})
        savedTitlePage = savedTitle + " pg " + savedPage
        chrome.runtime.sendMessage({defaultTitlePgNum: savedTitlePage})
      }
    });
  }
  chrome.runtime.onMessage.removeListener(startup)
  chrome.runtime.onMessage.addListener(startup)
//  console.log(nums)
//  console.log(titles)
}
chrome.runtime.onMessage.addListener(startup)

function begin(port) {
  start = "start"
  //console.log("HELOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  chrome.runtime.onConnect.removeListener(begin)
  chrome.runtime.onConnect.addListener(begin)
}
//chrome.runtime.onConnect.addListener(begin)

function testing(request, sender, sendResponse) {
  if (request.button == request.button) {
  //  console.log(request.button)
  }
  chrome.runtime.onMessage.removeListener(testing)
  chrome.runtime.onMessage.addListener(testing)
}
//chrome.runtime.onMessage.addListener(testing)

//---------------------------------ABOVE IMPT
/*
chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
    url_pdf = tabs[0].url;
    tabID_pdf = tabs[0].id;
    //console.log(tabURL);
    console.log("query")
    //console.log(test_ID)
});
*/
//-----------------------------------------------------

function goTo(request, sender, sendResponse) {
//  console.log(nums)
//  console.log(titles)
  if (request.position != "start" & request.msg == "refresh" && request.trash != "trash") {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        url_pdf = tabs[0].url;
        tabID_pdf = tabs[0].id;
        //console.log(tabURL);
      //  console.log("query")
        //console.log(test_ID)
    });
  //  console.log(request.position)
    chrome.storage.local.get(['bookmarkPages'], function(result) {
        clickedPage = result.bookmarkPages[request.position]
    //    console.log("clickedPage " + clickedPage)

        for (var i = 0; i < nums.length; i++) {
          //console.log(result.bookmarkPages[i] + 10)
          //console.log(result.bookmarkPages[i].toString())
          //chrome.runtime.sendMessage({defaultPage: savedPage})
        }
    //    console.log(clickedPage + "CLicked page")
        chrome.tabs.update(tabID_pdf, {url: url_pdf.split("#")[0] + "#page=" + clickedPage})
        setTimeout(() => {
          chrome.tabs.reload(tabID_pdf)
          //console.log("refreshed")
        }, 10)
    });

    chrome.runtime.onMessage.removeListener(goTo)
    chrome.runtime.onMessage.addListener(goTo)
  }
//  console.log(nums)
  //console.log(titles)
}
chrome.runtime.onMessage.addListener(goTo)

//nums = []
//titles = []


/*chrome.storage.local.set({bookmarkPages: nums}, function() {
  console.log("Set array" + nums)
});

chrome.storage.local.set({bookmarkTitles: titles}, function() {
  console.log("Set array" + titles)
}); */


chrome.storage.local.get(['bookmarkPages'], function(result) {
  for (var i = 0; i < result.bookmarkPages.length; i++) {
  //  console.log(result.bookmarkPages[i] + 10)
    //console.log(result.bookmarkPages[i].toString())
    //nums.push(result.bookmarkPages[i])
    //chrome.runtime.sendMessage({defaultPage: savedPage})
  }
//  console.log("hola")
});

chrome.storage.local.get(null, function(items) {
//  console.log(items)
})









/*
setTimeout(function() {
  nums.push(4,5)
  chrome.storage.local.get(['bookmarkPages'], function(result) {
    for (var i = 0; i < nums.length; i++) {
      console.log(result.bookmarkPages[i])
    }
  })
}, 3000)
*/
