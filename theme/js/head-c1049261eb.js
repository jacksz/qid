!function e(r,n,o){function t(a,s){if(!n[a]){if(!r[a]){var d="function"==typeof require&&require;if(!s&&d)return d(a,!0);if(i)return i(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var c=n[a]={exports:{}};r[a][0].call(c.exports,function(e){var n=r[a][1][e];return t(n?n:e)},c,c.exports,e,r,n,o)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<o.length;a++)t(o[a]);return t}({1:[function(e,r,n){r.exports=function(e){var r=document.getElementsByTagName("html")[0];e?(r.className=r.className+" modern-browser",window.modernBrowser=!0):(r.className=r.className+" not-modern-browser",window.modernBrowser=!1)}},{}],2:[function(e,r,n){var o=e("modern-browser");o(Modernizr.video),window.screenSize=function(){return"undefined"==typeof matchMedia?"lap":matchMedia("only screen and (min-width: 36em)").matches?"lap":"hand"}()},{"modern-browser":1}]},{},[2]);