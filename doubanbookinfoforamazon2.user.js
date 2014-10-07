// ==UserScript==
// @id             douban book info for Amazon.cn
// @name           douban book info for Amazon.cn
// @version        1.0
// @namespace      
// @author         yushengjsman
// @description    using douban api JSONP
// @include        http://www.amazon.cn/*
// @run-at         document-end
// ==/UserScript==

// http://wiki.greasespot.net/UnsafeWindow
unsafeWindow.showInfo = function(doubanJson) {
  //console.log("dsafefe!!");
  if (doubanJson.msg === 'book_not_found') {
    ratePos.innerHTML = originalContext + ' 豆瓣中没有该书信息。';
    return;
  }
  //console.log(doubanJson.alt);

  var doubanInfo = document.createElement('span');
  var doubanRate = document.createTextNode('豆瓣评分：' + doubanJson.rating.average + '（' + doubanJson.rating.numRaters + '人评分）');
  var doubanLink = document.createElement('a');
  doubanLink.setAttribute('href', doubanJson.alt);
  doubanLink.setAttribute('target', '_blank');
  var doubanLinkContent = document.createTextNode('豆瓣链接');
  doubanLink.appendChild(doubanLinkContent);
  doubanInfo.appendChild(doubanRate);
  doubanInfo.appendChild(doubanLink);
  var insertPos = document.getElementById('qpeTitleTag_feature_div');
  var insertParent = document.getElementById('centerCol');
  //console.log(doubanJson.alt);
  // console.log("FFUCK");
  ratePos.innerHTML = originalContext;
  insertParent.insertBefore(doubanInfo, insertPos)
}

var ratePos = document.getElementById('byline');
var originalContext = ratePos.innerHTML;
//console.log(ratePos.innerHTML);
var tempStr = '正在从豆瓣查找该书信息';
ratePos.innerHTML = ratePos.innerHTML + tempStr;
// find book isbn
var bookDetail = document.getElementById('detail_bullets_id').getElementsByClassName('content') [0].childNodes[1].children;
var flag = 0;
for (var i = 0; i < bookDetail.length; i++) {
  if (bookDetail[i].getElementsByTagName('b') [0].childNodes[0].textContent === '条形码:') {
    bookISBN = bookDetail[i].childNodes[1].textContent.trim();
    flag = 1;
    break;
  }
}



if (flag === 0) {
  console.log('ISBN not found...');
} 
else {
  console.log(bookISBN);
  var url = 'https://api.douban.com/v2/book/isbn/:' + bookISBN + '?callback=showInfo';
  var doubanReq = document.createElement('script');
  doubanReq.setAttribute('src', url);
  document.body.appendChild(doubanReq);
}

