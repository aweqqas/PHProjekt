//>>built
define("dojox/encoding/digests/SHA1",["./_base"],function(f){function k(b,c){b[c>>5]|=128<<24-c%32;b[(c+64>>9<<4)+15]=c;for(var a=Array(80),d=1732584193,i=-271733879,e=-1732584194,j=271733878,h=-1009589776,k=0;k<b.length;k+=16){for(var l=d,m=i,n=e,o=j,p=h,g=0;80>g;g++){a[g]=16>g?b[k+g]:(a[g-3]^a[g-8]^a[g-14]^a[g-16])<<1|(a[g-3]^a[g-8]^a[g-14]^a[g-16])>>>31;var q=f.addWords(f.addWords(d<<5|d>>>27,20>g?i&e|~i&j:40>g?i^e^j:60>g?i&e|i&j|e&j:i^e^j),f.addWords(f.addWords(h,a[g]),20>g?1518500249:40>g?1859775393:
60>g?-1894007588:-899497514)),h=j,j=e,e=i<<30|i>>>2,i=d,d=q}d=f.addWords(d,l);i=f.addWords(i,m);e=f.addWords(e,n);j=f.addWords(j,o);h=f.addWords(h,p)}return[d,i,e,j,h]}function l(b){for(var c=[],a=0,d=b.length*h;a<d;a+=h)c[a>>5]|=(b.charCodeAt(a/h)&m)<<32-h-a%32;return c}function n(b){for(var c=[],a=0,d=4*b.length;a<d;a++)c.push("0123456789abcdef".charAt(b[a>>2]>>8*(3-a%4)+4&15),"0123456789abcdef".charAt(b[a>>2]>>8*(3-a%4)&15));return c.join("")}function o(b){for(var c=[],a=0,d=32*b.length;a<d;a+=
h)c.push(String.fromCharCode(b[a>>5]>>>32-h-a%32&m));return c.join("")}function p(b){for(var c=[],a=0,d=4*b.length;a<d;a+=3)for(var f=(b[a>>2]>>8*(3-a%4)&255)<<16|(b[a+1>>2]>>8*(3-(a+1)%4)&255)<<8|b[a+2>>2]>>8*(3-(a+2)%4)&255,e=0;4>e;e++)8*a+6*e>32*b.length?c.push("="):c.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(f>>6*(3-e)&63));return c.join("")}var h=8,m=(1<<h)-1;f.SHA1=function(b,c){var a=c||f.outputTypes.Base64,d=k(l(b),b.length*h);switch(a){case f.outputTypes.Raw:return d;
case f.outputTypes.Hex:return n(d);case f.outputTypes.String:return o(d);default:return p(d)}};f.SHA1._hmac=function(b,c,a){var a=a||f.outputTypes.Base64,d=l(c);16<d.length&&(d=k(d,c.length*h));for(var i=Array(16),c=Array(16),e=0;16>e;e++)i[e]=d[e]^909522486,c[e]=d[e]^1549556828;b=k(i.concat(l(b)),512+b.length*h);b=k(c.concat(b),672);switch(a){case f.outputTypes.Raw:return b;case f.outputTypes.Hex:return n(b);case f.outputTypes.String:return o(b);default:return p(b)}};return f.SHA1});