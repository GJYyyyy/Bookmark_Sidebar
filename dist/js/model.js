/*! (c) Philipp König under GPL-3.0 */
"use strict";var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};!function(){var b=null,c={},d=null,e=[],f={updateUrls:"https://blockbyte.de/ajax/extensions/updateUrls",userdata:"https://blockbyte.de/ajax/extensions/userdata"},g={},h={af:"Afrikaans",ar:"Arabic",hy:"Armenian",be:"Belarusian",bg:"Bulgarian",ca:"Catalan","zh-CN":"Chinese (Simplified)","zh-TW":"Chinese (Traditional)",hr:"Croatian",cs:"Czech",da:"Danish",nl:"Dutch",en:"English",eo:"Esperanto",et:"Estonian",tl:"Filipino",fi:"Finnish",fr:"French",de:"German",el:"Greek",iw:"Hebrew",hi:"Hindi",hu:"Hungarian",is:"Icelandic",id:"Indonesian",it:"Italian",ja:"Japanese",ko:"Korean",lv:"Latvian",lt:"Lithuanian",no:"Norwegian",fa:"Persian",pl:"Polish",pt:"Portuguese",ro:"Romanian",ru:"Russian",sr:"Serbian",sk:"Slovak",sl:"Slovenian",es:"Spanish",sw:"Swahili",sv:"Swedish",th:"Thai",tr:"Turkish",uk:"Ukrainian",vi:"Vietnamese"},i={get:function(a,b){chrome.bookmarks.get(""+a,b)},getSubTree:function(a,b){chrome.bookmarks.getSubTree(""+a,b)},removeTree:function(a,b){chrome.bookmarks.removeTree(""+a,b)},update:function(a,b,c){chrome.bookmarks.update(""+a,b,c)},create:function(a,b){chrome.bookmarks.create(a,b)},move:function(a,b,c){chrome.bookmarks.move(""+a,b,c)},search:function(a,b){chrome.bookmarks.search(a,b)}},j=function(b){b.id&&B(null,function(){void 0===d.data[b.id]&&(void 0===d.data["node_"+b.id]?d.data[b.id]={c:0}:d.data[b.id]={c:d.data["node_"+b.id]}),"object"!==a(d.data[b.id])&&(d.data[b.id]={c:d.data[b.id]}),d.data[b.id].c++,d.data[b.id].d=+new Date,delete d.data["node_"+b.id];!function a(){var b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"sync";d.storageType=b,chrome.storage[b].set({clickCounter:d},function(){var b=chrome.runtime.lastError;void 0===b?c.clickCounter&&(delete c.clickCounter,A()):"sync"===d.storageType&&-1!==b.message.search("QUOTA_BYTES_PER_ITEM")&&(a("local"),chrome.storage.sync.remove(["clickCounter"]))})}()})},k=function(a,b){j(a),a.newTab&&!0===a.newTab?chrome.tabs.query({active:!0,currentWindow:!0},function(b){chrome.tabs.create({url:a.href,active:void 0===a.active||!!a.active,index:b[0].index+1,openerTabId:b[0].id},function(a){c.openedByExtension=a.id,A()})}):a.incognito&&!0===a.incognito?chrome.windows.create({url:a.href,state:"maximized",incognito:!0}):chrome.tabs.query({active:!0,currentWindow:!0},function(b){chrome.tabs.update(b[0].id,{url:a.href},function(a){c.openedByExtension=a.id,A()})})},l=function(a,b){var c=new Image;c.onload=function(){var a=document.createElement("canvas");a.width=this.width,a.height=this.height,a.getContext("2d").drawImage(this,0,0);var c=a.toDataURL("image/png");b({img:c})},c.src="chrome://favicon/size/16@2x/"+a.url},m=function(a,b){B(null,function(){b({viewAmounts:d.data,counterStartDate:c.installationDate})})},n=function(a,b){i.getSubTree(a.id,function(a){b({bookmarks:a})})},o=function(a,b){i.search(a.searchVal,function(a){b({bookmarks:a})})},p=function(a,b){void 0===c.openedByExtension&&i.search({url:a.url},function(b){b.some(function(b){return b.url===a.url&&(j(b),!0)})}),delete c.openedByExtension,A()},q=function(a,b){var c={parentId:""+a.parentId,index:a.index};i.move(a.id,c,function(){b({moved:a.id})})},r=function(a,b){var c={title:a.title};a.url&&(c.url=a.url),i.update(a.id,c,function(){var c=chrome.runtime.lastError;b(void 0===c?{updated:a.id}:{error:c.message})})},s=function(a,b){var c={parentId:a.parentId,index:a.index||0,title:a.title,url:a.url?a.url:null};i.create(c,function(){var c=chrome.runtime.lastError;b(void 0===c?{created:a.id}:{error:c.message})})},t=function(a,b){i.removeTree(a.id,function(){b({deleted:a.id})})},u=function(a,b){if(a.abort&&!0===a.abort)e.forEach(function(a){a.abort()});else{var c=new XMLHttpRequest;c.open("POST",f.updateUrls,!0),c.onload=function(){var a=JSON.parse(c.responseText);b(a)};var d=new FormData;d.append("url",a.url),d.append("ua",navigator.userAgent),d.append("lang",chrome.i18n.getUILanguage()),c.send(d),e.push(c)}},v=function(a,b){D(function(a){b({infos:a})})},w=function a(b,c){if(b.lang){var d=function(a){var d=a.langVars,e=new XMLHttpRequest;e.open("GET",chrome.extension.getURL("_locales/"+b.lang+"/messages.json"),!0),e.onload=function(){var a=JSON.parse(e.responseText);Object.assign(d,a),g[b.lang]=d,c({langVars:d})},e.send()};b.defaultLang&&b.defaultLang!==b.lang?a({lang:b.defaultLang},d):d({langVars:{}})}},x=function(a,d){var e=!1;null===b&&(+new Date-c.installationDate)/864e5>5&&(e=!0),d({showMask:e})},y=function(a,d){chrome.storage.sync.set({shareUserdata:a.share}),b=a.share,c.lastShareDate=0,A()},z={realUrl:u,addViewAmount:p,bookmarks:n,searchBookmarks:o,moveBookmark:q,updateBookmark:r,createBookmark:s,deleteBookmark:t,shareUserdata:y,shareUserdataMask:x,languageInfos:v,langvars:w,favicon:l,openLink:k,viewAmounts:m};chrome.extension.onMessage.addListener(function(a,b,c){return z[a.type]&&z[a.type](a,c),!0}),chrome.browserAction.onClicked.addListener(function(){chrome.tabs.query({active:!0,currentWindow:!0},function(a){chrome.tabs.sendMessage(a[0].id,{action:"toggleSidebar"})})}),chrome.runtime.onInstalled.addListener(function(a){if("install"===a.reason)chrome.tabs.create({url:chrome.extension.getURL("html/howto.html")});else if("update"===a.reason){var b=chrome.runtime.getManifest().version,d=a.previousVersion.split("."),e=b.split(".");chrome.storage.local.remove(["languageInfos"]),d[0]===e[0]&&d[1]===e[1]||(chrome.storage.sync.get(["model"],function(a){void 0===a.model||void 0!==a.model.updateNotification&&a.model.updateNotification===b||(c.updateNotification=b,A(function(){chrome.tabs.create({url:chrome.extension.getURL("html/changelog.html")})}))}),chrome.storage.sync.get(null,function(a){if(a.behaviour&&(void 0===a.behaviour.rememberState&&void 0!==a.behaviour.rememberScroll&&(a.behaviour.rememberState=!1===a.behaviour.rememberScroll?"openStates":"all"),delete a.behaviour.rememberScroll,delete a.behaviour.model,delete a.behaviour.clickCounter,delete a.behaviour.clickCounterStartDate,chrome.storage.sync.set({behaviour:a.behaviour})),void 0===a.appearance&&(a.appearance={}),void 0===a.appearance.styles&&(a.appearance.styles={}),void 0===a.appearance.styles.bookmarksDirIcon||"dir"===a.appearance.styles.bookmarksDirIcon?a.appearance.styles.bookmarksDirIcon="dir-2":"dir-alt1"===a.appearance.styles.bookmarksDirIcon?(a.appearance.styles.bookmarksDirIcon="dir-1",a.appearance.styles.bookmarksDirColor="rgb(240,180,12)"):"dir-alt2"===a.appearance.styles.bookmarksDirIcon&&(a.appearance.styles.bookmarksDirIcon="dir-1"),delete a.appearance.addVisual,chrome.storage.sync.set({appearance:a.appearance}),!a.shareUserdata||"n"!==a.shareUserdata&&"y"!==a.shareUserdata||chrome.storage.sync.set({shareUserdata:"y"===a.shareUserdata}),chrome.storage.sync.remove(["clickCounter","lastShareDate","scrollPos","openStates","installationDate","uuid","entriesLocked","addVisual","middleClickActive"]),a.model&&void 0!==a.model.shareUserdata&&void 0===a.shareUserdata){var b=a.model.shareUserdata;"y"===b?chrome.storage.sync.set({shareUserdata:!0}):"n"===b?chrome.storage.sync.set({shareUserdata:!0}):"boolean"==typeof b&&chrome.storage.sync.set({shareUserdata:b})}}))}});var A=function(a){Object.getOwnPropertyNames(c).length>0&&chrome.storage.sync.set({model:c},function(){"function"==typeof a&&a()})},B=function a(b,e){b||(b="sync"),chrome.storage[b].get(["clickCounter"],function(f){void 0===f.clickCounter?"sync"===b?a("local",e):(d={storageType:"sync",data:c.clickCounter||{}},"function"==typeof e&&e()):(d={storageType:b,data:f.clickCounter.data},"function"==typeof e&&e())})},C=function(){chrome.storage.sync.get(["model","shareUserdata"],function(a){c=a.model||{},b=void 0===a.shareUserdata?null:a.shareUserdata,void 0===c.uuid&&(c.uuid=function(){var a=+new Date;return window.performance&&"function"==typeof window.performance.now&&(a+=window.performance.now()),"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(b){var c=(a+16*Math.random())%16|0;return a=Math.floor(a/16),("x"===b?c:3&c|8).toString(16)})}()),void 0===c.installationDate&&(c.installationDate=+new Date),B(),A()})},D=function(a){chrome.storage.local.get(["languageInfos"],function(b){if(b&&b.languageInfos&&(+new Date-b.languageInfos.updated)/36e5<8)"function"==typeof a&&a(b.languageInfos.infos);else{var c=Object.keys(h).length,d=0,e={};Object.keys(h).forEach(function(b){e[b]={name:b,label:h[b],available:!1};var f=new XMLHttpRequest;["load","error"].forEach(function(g){f.addEventListener(g,function(){d++,"load"===g&&(e[b].available=!0),d===c&&(chrome.storage.local.set({languageInfos:{infos:e,updated:+new Date}}),"function"==typeof a&&a(e))})}),f.open("HEAD",chrome.extension.getURL("_locales/"+b+"/messages.json"),!0),f.send()})}})},E=function(){chrome.storage.sync.get(null,function(a){if(void 0!==a.model&&void 0!==a.model.uuid&&(void 0===a.model.lastShareDate||(+new Date-a.model.lastShareDate)/36e5>8)){c.lastShareDate=+new Date,A();var b=function(a){var b=new XMLHttpRequest;b.open("POST",f.userdata,!0);var c=new FormData;c.append("data",JSON.stringify(a)),b.send(c)},d=chrome.runtime.getManifest();a.uuid=a.model.uuid,"Dev"!==d.version_name&&"update_url"in d||(a.uuid="Dev"),a.extension={name:d.name,version:d.version},void 0!==a.shareUserdata&&!0===a.shareUserdata?i.getSubTree("0",function(c){a.bookmarkAmount=0;c&&c[0]&&c[0].children&&c[0].children.length>0&&function b(c){for(var d=0;d<c.length;d++){var e=c[d];e.url?a.bookmarkAmount++:e.children&&b(e.children)}}(c[0].children),a.ua=navigator.userAgent,a.lang=chrome.i18n.getUILanguage(),a.installationDate=a.model.installationDate,delete a.utility,delete a.model,delete a.clickCounter,b(a)}):b({uuid:a.uuid,extension:a.extension,shareUserdata:void 0===a.shareUserdata?"undefined":a.shareUserdata})}})};!function(){C(),E()}()}();