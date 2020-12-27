/*
  External links with favicons for PmWiki (may work on other websites)
  Written by Petko Yotov (c) 2020 pmwiki.org/petko

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published
  by the Free Software Foundation; either version 3 of the License, or
  (at your option) any later version.

  version: 20201203
*/

document.addEventListener('DOMContentLoaded', function(e){
  var self = document.querySelector('script#extlink-favicons');
  var selector = 'a.urllink';
  
  var providers = {
    google: "https://www.google.com/s2/favicons?domain=",
    duckduckgo: "https://external-content.duckduckgo.com/ip3/$1.ico",
    yandex: "https://favicon.yandex.net/favicon/"
  };
  var provider = 'google';
  
  if(self) {
    var attr = self.getAttribute('data-selector');
    if(attr) selector = attr;

    attr = self.getAttribute('data-provider');
    if(attr) provider = attr; 
  }
  var furl = providers.hasOwnProperty(provider)? providers[provider] : provider;
  
  var stylesheet = (function() {
    var style = document.createElement("style");
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    return style.sheet;
  })();
  
  var links = document.querySelectorAll(selector);
  
  var hostindex = 0;
  var extdomains = {};
  
  for(var i=0; i<links.length; i++) {
    if(links[i].tagName != 'A') continue;
    var host = links[i].hostname;
    if(host == location.hostname) { continue; }
    
    links[i].setAttribute('data-favicon', host);
    if(! extdomains.hasOwnProperty(host)) {
      var url = furl.match(/\$1/) ? furl.replace(/\$1/g, host) : furl+host;
      extdomains[host] = hostindex++;
      stylesheet.insertRule('a[data-favicon="'+host+'"]::after { background-image: url('+url+'); }', 0);
    }
  }
  if(! hostindex) { return;}
 
  stylesheet.insertRule('a[data-favicon]::after {'
    + 'background-position: 0 center;'
    + 'background-repeat: no-repeat;'
    + 'background-size: 16px 16px !important;'
    + 'content: "";'
    + 'height: 16px;'
    + 'margin-left: 2px;'
    + 'padding-left: 16px;'
    + 'vertical-align: middle;'
    + 'width: 16px;'
    + '}', 0);
});

