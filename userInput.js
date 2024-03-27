/*
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('changeColor');
    // onClick's logic below:
    link.addEventListener('click', function() {
        document.getElementById("title").innerHTML = "Hola";
        //document.getElementById("search").value = "444"
        console.log(document.getElementById("search").value)
        var pageNumber = document.getElementById("search").value
        chrome.runtime.sendMessage({msg: pageNumber})//, res => {
          //console.log(res)
          //console.log(JSON.stringify(res))

        //});

    });
});
*/
var amtDeleted = 0;
var counter = 0;
var arrayButtons = []
var link3;
//var link2;
var port = chrome.runtime.connect()
chrome.runtime.sendMessage({start: "start", msg: "start", position: "start"})

//console.log("IM FROM THE FOREGROUNDDDDDDDDDDDDD")
//chrome.runtime.sendMessage()

function messageFromBackground(request, sender, sendResponse) {
  if (request.defaultTitlePgNum = request.defaultTitlePgNum) {
    //var pageNumber = request.defaultPage
  //  var bookmarkTitle = request.defaultTitle
    var titleAndPage = request.defaultTitlePgNum
  //  console.log("I GOT THE DEFAULT")
    //console.log(pageNumber)
    var paragraph = document.createElement('p')
    var goToButton = document.createElement('BUTTON')
    var goToIcon = document.createElement('INPUT')
    var trashButton = document.createElement('BUTTON')
    var trashIcon = document.createElement('INPUT')
    goToIcon.setAttribute("type", "image");
    goToIcon.classList.add('goToIcon')
    goToIcon.src = "goto_icon.png"
    trashIcon.setAttribute("type", "image");
    trashIcon.classList.add('trashIcon')
    trashIcon.src = "trash_icon.png"
    paragraph.classList.add('individualBookmark' + counter.toString())
    paragraph.id = "paragraph" + counter.toString()
    goToButton.classList.add('goToButton')
    //paragraph.id = counter.toString()
    goToButton.id = "btn" + counter.toString() + "btn"
    trashButton.id = "trashbtn" + counter.toString()
    //document.getElementById(goToButton.id).value = counter
    paragraph.innerText = titleAndPage
    bookmarkContainer.appendChild(paragraph)
    bookmarkContainer.appendChild(goToButton)
    paragraph.appendChild(goToButton)
    bookmarkContainer.appendChild(goToIcon)
    paragraph.appendChild(goToIcon)
    goToButton.appendChild(goToIcon)
    bookmarkContainer.appendChild(trashButton)
    paragraph.appendChild(trashButton)
    bookmarkContainer.appendChild(trashIcon)
    paragraph.appendChild(trashIcon)
    trashButton.appendChild(trashIcon)
    pageNumber = ""
    bookmarkTitle = ""
    if (document.getElementById(goToButton.id)) {
  //    console.log("shhhhhhhhhhhhhhhhhhhhh")
      document.addEventListener('DOMContentLoaded', buttonListener2(goToButton.id))
      document.addEventListener('DOMContentLoaded', trashListener(trashButton.id))
      //arrayButtons.push(goToButton.id)
    }
    counter +=1
  }
  chrome.runtime.onMessage.removeListener(messageFromBackground)
  chrome.runtime.onMessage.addListener(messageFromBackground)
}
chrome.runtime.onMessage.addListener(messageFromBackground)


var addBookmarkButton = document.getElementById("addBookmark")
var bookmarkContainer = document.getElementsByClassName("listContainer")[0]

function buttonListener(specificButton) {
//  console.log("LISTEN CHAPS")
  var link = document.getElementById(specificButton)  //addBookmark
  link.addEventListener('click', buttonClickListener)
  //document.addEventListener('DOMContentLoaded', buttonListener2("btn"+counter+"btn"))
}
document.addEventListener('DOMContentLoaded', buttonListener('addBookmark'))

function buttonListener2(specificButton) {
//  console.log("LISTEN")
  var link2 = document.getElementById(specificButton)  //addBookmark
  link2.addEventListener('click', function() {buttonClickListener2(specificButton)})
  //link3 = link2
}


function buttonClickListener2(specificButton) {
//  console.log(counter)
//  console.log("COUNTINGGGGGGGGGG")
//  console.log(specificButton)
  for (var i = 0; i < counter; i++) {
  //  console.log("FOR LOOP")
    if (specificButton.includes(i)) {
  //    console.log("send message")
  //    console.log(i.toString())
      chrome.runtime.sendMessage({position: i, msg: "refresh", trash: "none"})
    }
  }
  //document.removeEventListener('DOMContentLoaded', buttonListener2(specificButton))
  //document.getElementById(specificButton).removeEventListener('click', buttonClickListener(specificButton))
  //document.addEventListener('DOMContentLoaded', buttonListener2(specificButton))
}
/*
//chrome.runtime.sendMessage({button: "HOLA"})
function goToListener() {
  console.log(counter)
  var linkk = document.getElementById("btn3btn")
  if (linkk) {
    linkk.addEventListener('click', goToButtonClickListener)
  }
}
document.addEventListener('DOMContentLoaded', goToListener)


function goToButtonClickListener() {
  console.log("HII its me")
  chrome.runtime.sendMessage({button: "i"})
  document.removeEventListener('DOMContentLoaded', goToListener)
  document.addEventListener('DOMContentLoaded', goToListener)
  document.removeEventListener('click', goToButtonClickListener)
}
*/

function trashListener(specificButton) {
//  console.log("LISTEN CHAPS")
  var link3 = document.getElementById(specificButton)  //addBookmark
  link3.addEventListener('click', function() {trashClickListener(specificButton)})


}

function trashClickListener(specificButton) {
//  console.log(specificButton)
//  console.log(counter)
//  console.log(amtDeleted)
  for (var i = 0; i < counter+amtDeleted; i++) {
  //  console.log(i)
  //  console.log("FOR LOOPERRRR")
    if (specificButton.includes(i)) {
      par = document.getElementById("paragraph" + i.toString())
      par.remove();
      chrome.runtime.sendMessage({position: i, trash: "trash"})
      amtDeleted +=1
    }
  }


}


function buttonClickListener() {
//  console.log("SURPRISED MOTHERFKER")
  //document.getElementById("title").innerHTML = "Hola";
//  console.log(document.getElementById("search").value)
  var bookmarkTitle = document.getElementById('pageTitle').value
  var pageNumber = document.getElementById("search").value
  chrome.runtime.sendMessage({msg: pageNumber, msg2: bookmarkTitle, trash: "none"})

  var paragraph = document.createElement('p')
  var goToButton = document.createElement('BUTTON')
  paragraph.classList.add('individualBookmark' + counter.toString())
  paragraph.innerText = bookmarkTitle + " pg " + pageNumber
  bookmarkContainer.appendChild(paragraph)
  bookmarkContainer.appendChild(goToButton)

  var goToIcon = document.createElement('INPUT')
  var trashButton = document.createElement('BUTTON')
  var trashIcon = document.createElement('INPUT')
  goToIcon.setAttribute("type", "image");
  goToIcon.classList.add('goToIcon')
  goToIcon.src = "goto_icon.png"
  trashIcon.classList.add('trashIcon')
  trashIcon.setAttribute("type", "image");
  trashIcon.src = "trash_icon.png"
  paragraph.appendChild(goToButton)
  bookmarkContainer.appendChild(goToIcon)
  paragraph.appendChild(goToIcon)
  goToButton.appendChild(goToIcon)
  paragraph.id = "paragraph" + counter.toString()
  goToButton.id = "btn" + counter.toString() + "btn"
  trashButton.id = "trashbtn" + counter.toString()
  goToButton.classList.add('goToButton')
  bookmarkContainer.appendChild(trashButton)
  paragraph.appendChild(trashButton)
  bookmarkContainer.appendChild(trashIcon)
  paragraph.appendChild(trashIcon)
  trashButton.appendChild(trashIcon)
  pageNumber = ""
  bookmarkTitle = ""
  counter +=1
  if (document.getElementById(goToButton.id)) {
//    console.log("shhhhhhhhhhhhhhhhhhhhh")
    document.addEventListener('DOMContentLoaded', buttonListener2(goToButton.id))
    document.addEventListener('DOMContentLoaded', trashListener(trashButton.id))
  }
  //console.log(chrome.extension.getViews({type: "popup"}))
  document.removeEventListener('click', buttonClickListener)
  document.removeEventListener('DOMContentLoaded', buttonListener)
  document.addEventListener('DOMContentLoaded', buttonListener)

  chrome.runtime.onMessage.removeListener(messageFromBackground)
}
