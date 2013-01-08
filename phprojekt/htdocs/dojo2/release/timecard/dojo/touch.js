//>>built
define("dojo/touch","./_base/kernel,./_base/lang,./aspect,./dom,./on,./has,./mouse,./ready,./_base/window".split(","),function(k,l,a,m,c,g,f,n,d){function e(h){return function(b,a){return c(b,h,a)}}var a=g("touch"),i=!1;g("ios")&&(g=navigator.userAgent.match(/OS ([\d_]+)/)?RegExp.$1:"1",i=5>parseFloat(g.replace(/_/,".").replace(/_/g,"")));var j,b;a&&(n(function(){b=d.body();d.doc.addEventListener("touchstart",function(h){var a=b;b=h.target;c.emit(a,"dojotouchout",{target:a,relatedTarget:b,bubbles:!0});
c.emit(b,"dojotouchover",{target:b,relatedTarget:a,bubbles:!0})},!0);c(d.doc,"touchmove",function(a){if((a=d.doc.elementFromPoint(a.pageX-(i?0:d.global.pageXOffset),a.pageY-(i?0:d.global.pageYOffset)))&&b!==a)c.emit(b,"dojotouchout",{target:b,relatedTarget:a,bubbles:!0}),c.emit(a,"dojotouchover",{target:a,relatedTarget:b,bubbles:!0}),b=a})}),j=function(a,e){return c(d.doc,"touchmove",function(c){(a===d.doc||m.isDescendant(b,a))&&e.call(this,l.mixin({},c,{target:b,touches:c.touches,preventDefault:function(){c.preventDefault()},
stopPropagation:function(){c.stopPropagation()}}))})});f={press:e(a?"touchstart":"mousedown"),move:a?j:e("mousemove"),release:e(a?"touchend":"mouseup"),cancel:a?e("touchcancel"):f.leave,over:e(a?"dojotouchover":"mouseover"),out:e(a?"dojotouchout":"mouseout"),enter:f._eventHandler(a?"dojotouchover":"mouseover"),leave:f._eventHandler(a?"dojotouchout":"mouseout")};return k.touch=f});