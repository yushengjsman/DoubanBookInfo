// ==UserScript==
// @id             douban book info for Amazon.cn
// @name           douban book info for Amazon.cn
// @version        2.0
// @namespace      
// @author         yushengjsman
// @description    using douban api JSONP
// @include        http://www.amazon.cn/*
// @run-at         document-end
// ==/UserScript==

// http://wiki.greasespot.net/UnsafeWindow
function showInfo(doubanJson) {
  // 信息插入位置
  var insertPos = document.getElementById('qpeTitleTag_feature_div');
  var insertParent = document.getElementById('centerCol');
  if (doubanJson.msg === 'book_not_found') {
  var errMsg = document.createTextNode('豆瓣中没有该书信息');
    insertParent.insertBefore(errMsg, insertPos);
    return;
  }

  var doubanInfo = document.createElement('span');
  doubanInfo.setAttribute('style', 'color:green; font-size:14px')
  var doubanRate = document.createTextNode('豆瓣评分：' + doubanJson.rating.average + '（' + doubanJson.rating.numRaters + '人评分）');
  var doubanLink = document.createElement('a');
  doubanLink.setAttribute('href', doubanJson.alt);
  doubanLink.setAttribute('target', '_blank');
  var doubanLinkContent = document.createTextNode('豆瓣链接');
  doubanLink.appendChild(doubanLinkContent);
  doubanInfo.appendChild(doubanRate);
  doubanInfo.appendChild(doubanLink);
  insertParent.insertBefore(doubanInfo, insertPos)
}

var showInfoScript = document.createElement('script');
showInfoScript.appendChild(document.createTextNode(showInfo));

(document.body || document.head || document.documentElement).appendChild(showInfoScript);

//var ratePos = document.getElementById('byline');
//var originalContext = ratePos.innerHTML;
//console.log(ratePos.innerHTML);
//var tempStr = '正在从豆瓣查找该书信息';
//ratePos.innerHTML = ratePos.innerHTML + tempStr;
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

