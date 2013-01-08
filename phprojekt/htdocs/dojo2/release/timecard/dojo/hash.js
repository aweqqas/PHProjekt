//>>built
define("dojo/hash","./_base/kernel,require,./_base/config,./_base/connect,./_base/lang,./ready,./sniff".split(","),function(d,v,h,i,j,w,k){function q(a,f){var b=a.indexOf(f);return 0<=b?a.substring(b+1):""}function c(){return q(location.href,"#")}function m(){i.publish("/dojo/hashchange",[c()])}function s(){c()!==b&&(b=c(),m())}function t(a){if(e)if(e.isTransitioning())setTimeout(j.hitch(null,t,a),n);else{var b=e.iframe.location.href,c=b.indexOf("?");e.iframe.location.replace(b.substring(0,c)+"?"+
a)}else location.replace("#"+a),!u&&s()}function x(){function a(){b=c();i=g?b:q(r.href,"?");o=!1;p=null}var f=document.createElement("iframe"),e=h.dojoBlankHtmlUrl||v.toUrl("./resources/blank.html");h.useXDomain&&!h.dojoBlankHtmlUrl&&console.warn("dojo.hash: When using cross-domain Dojo builds, please save dojo/resources/blank.html to your domain and set djConfig.dojoBlankHtmlUrl to the path on your domain to blank.html");f.id="dojo-hash-iframe";f.src=e+"?"+c();f.style.display="none";document.body.appendChild(f);
this.iframe=d.global["dojo-hash-iframe"];var i,o,p,k,g,r=this.iframe.location;this.isTransitioning=function(){return o};this.pollLocation=function(){if(!g)try{var d=q(r.href,"?");if(document.title!=k)k=this.iframe.document.title=document.title}catch(h){g=!0,console.error("dojo.hash: Error adding history entry. Server unreachable.")}var l=c();if(o&&b===l)if(g||d===p)a(),m();else{setTimeout(j.hitch(this,this.pollLocation),0);return}else if(!(b===l&&(g||i===d))){if(b!==l){b=l;o=!0;p=l;f.src=e+"?"+p;
g=!1;setTimeout(j.hitch(this,this.pollLocation),0);return}if(!g)location.href="#"+r.search.substring(1),a(),m()}setTimeout(j.hitch(this,this.pollLocation),n)};a();setTimeout(j.hitch(this,this.pollLocation),n)}d.hash=function(a,b){if(!arguments.length)return c();"#"==a.charAt(0)&&(a=a.substring(1));b?t(a):location.href="#"+a;return a};var b,e,u,n=h.hashPollFrequency||100;w(function(){"onhashchange"in d.global&&(!k("ie")||8<=k("ie")&&"BackCompat"!=document.compatMode)?u=i.connect(d.global,"onhashchange",
m):document.addEventListener?(b=c(),setInterval(s,n)):document.attachEvent&&(e=new x)});return d.hash});