// ==UserScript==
// @id             DBINFO_JD
// @name           DoubanBookInfo_jd
// @version        2.0
// @namespace      
// @author         
// @description    
// @include        http://item.jd.com/*
// @run-at         document-end
// ==/UserScript==

// http://wiki.greasespot.net/UnsafeWindow
function showInfo(doubanJson) {
  // 信息插入的位置
  var insertPos = document.getElementById('name');
  if (doubanJson.msg === 'book_not_found') {
  	console.log('Book not found');
  	var errMsg = document.createTextNode('豆瓣中没有该书信息');
  	insertPos.appendChild(errMsg);
    //ratePos.innerHTML = originalContext + ' 豆瓣中没有该书信息。';
    return;
  }
  //console.log(doubanJson.alt);

  var doubanInfo = document.createElement('p');
  doubanInfo.setAttribute('style', 'color:green; font-size:14px')
  var doubanRate = document.createTextNode('豆瓣评分：' + doubanJson.rating.average + '（' + doubanJson.rating.numRaters + '人评分）');
  var doubanLink = document.createElement('a');
  doubanLink.setAttribute('href', doubanJson.alt);
  doubanLink.setAttribute('target', '_blank');
  var doubanLinkContent = document.createTextNode('豆瓣链接');
  doubanLink.appendChild(doubanLinkContent);
  doubanInfo.appendChild(doubanRate);
  doubanInfo.appendChild(doubanLink);
  //var insertPos = document.getElementById('name');
  insertPos.appendChild(doubanInfo);
}

var showInfoScript = document.createElement('script');
showInfoScript.appendChild(document.createTextNode(showInfo));

(document.body || document.head || document.documentElement).appendChild(showInfoScript);

// 插入豆瓣信息的位置
//var ratePos = document.getElementById('name');
//var infoInsertSpan = document.createElement('span');
//var infoInsert = document.createTextNode('正在从豆瓣查找该书信息');
//infoInsertSpan.appendChild(infoInsert);

// find book isbn
var bookDetail = document.getElementById('product-detail-1').getElementsByClassName('detail-list') [0];
var bookISBN = bookDetail.getElementsByClassName('fore4')[0].textContent.slice(5);
console.log(bookISBN);
var url = 'https://api.douban.com/v2/book/isbn/:' + bookISBN + '?callback=showInfo';
var doubanReq = document.createElement('script');
doubanReq.setAttribute('src', url);
document.body.appendChild(doubanReq);
