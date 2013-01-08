//>>built
define("dojox/gfx/vml_attach","dojo/_base/kernel,dojo/_base/lang,./_base,./matrix,./path,dojo/_base/Color,./vml".split(","),function(q,j,g,k,r,l,i){q.experimental("dojox.gfx.vml_attach");i.attachNode=function(a){if(!a)return null;var d=null;switch(a.tagName.toLowerCase()){case i.Rect.nodeType:var a=d=new i.Rect(a),c=a.rawNode,b=c.outerHTML.match(/arcsize = \"(\d*\.?\d+[%f]?)\"/)[1],c=c.style,e=parseFloat(c.width),f=parseFloat(c.height),b=0<=b.indexOf("%")?parseFloat(b)/100:i._parseFloat(b);a.shape=
g.makeParameters(g.defaultRect,{x:parseInt(c.left),y:parseInt(c.top),width:e,height:f,r:Math.min(e,f)*b});break;case i.Ellipse.nodeType:a.style.width==a.style.height?(a=d=new i.Circle(a),b=a.rawNode.style,c=parseInt(b.width)/2,a.shape=g.makeParameters(g.defaultCircle,{cx:parseInt(b.left)+c,cy:parseInt(b.top)+c,r:c})):(a=d=new i.Ellipse(a),b=a.rawNode.style,c=parseInt(b.width)/2,e=parseInt(b.height)/2,a.shape=g.makeParameters(g.defaultEllipse,{cx:parseInt(b.left)+c,cy:parseInt(b.top)+e,rx:c,ry:e}));
break;case i.Path.nodeType:switch(a.getAttribute("dojoGfxType")){case "line":b=d=new i.Line(a);a=b.shape=j.clone(g.defaultLine);b=b.rawNode.path.v.match(g.pathVmlRegExp);if(!(7>b.length||"m"!=b[0]||"l"!=b[3]||"e"!=b[6]))a.x1=parseInt(b[1]),a.y1=parseInt(b[2]),a.x2=parseInt(b[4]),a.y2=parseInt(b[5]);break;case "polyline":b=d=new i.Polyline(a);a=b.shape=j.clone(g.defaultPolyline);b=b.rawNode.path.v.match(g.pathVmlRegExp);do if(!(3>b.length||"m"!=b[0]))if(c=parseInt(b[0]),e=parseInt(b[1]),!isNaN(c)&&
!isNaN(e)&&(a.points.push({x:c,y:e}),!(6>b.length||"l"!=b[3])))for(f=4;f<b.length;f+=2){c=parseInt(b[f]);e=parseInt(b[f+1]);if(isNaN(c)||isNaN(e))break;a.points.push({x:c,y:e})}while(0);break;case "path":d=new i.Path(a);m(d);break;case "text":d=new i.Text(a);n(d);o(d);a=d;p(a);b=a.matrix;c=a.fontStyle;if(b&&c)a.matrix=k.multiply(b,{dy:0.35*g.normalizedLength(c.size)});break;case "textpath":d=new i.TextPath(a),m(d),n(d),o(d)}break;case i.Image.nodeType:switch(a.getAttribute("dojoGfxType")){case "image":a=
d=new i.Image(a),a.shape=j.clone(g.defaultImage),a.shape.src=a.rawNode.firstChild.src,a=d.rawNode.filters["DXImageTransform.Microsoft.Matrix"],d.matrix=k.normalize({xx:a.M11,xy:a.M12,yx:a.M21,yy:a.M22,dx:a.Dx,dy:a.Dy})}break;default:return null}if(!(d instanceof i.Image)){a=d;b=null;c=a.rawNode;e=c.fill;if(e.on&&"gradient"==e.type){b=j.clone(g.defaultLinearGradient);rad=k._degToRad(e.angle);b.x2=Math.cos(rad);b.y2=Math.sin(rad);b.colors=[];c=e.colors.value.split(";");for(e=0;e<c.length;++e)(f=c[e].match(/\S+/g))&&
2==f.length&&b.colors.push({offset:i._parseFloat(f[0]),color:new l(f[1])})}else if(e.on&&"gradientradial"==e.type){b=j.clone(g.defaultRadialGradient);w=parseFloat(c.style.width);h=parseFloat(c.style.height);b.cx=isNaN(w)?0:e.focusposition.x*w;b.cy=isNaN(h)?0:e.focusposition.y*h;b.r=isNaN(w)?1:w/2;b.colors=[];c=e.colors.value.split(";");for(e=c.length-1;0<=e;--e)(f=c[e].match(/\S+/g))&&2==f.length&&b.colors.push({offset:i._parseFloat(f[0]),color:new l(f[1])})}else if(e.on&&"tile"==e.type)b=j.clone(g.defaultPattern),
b.width=g.pt2px(e.size.x),b.height=g.pt2px(e.size.y),b.x=e.origin.x*b.width,b.y=e.origin.y*b.height,b.src=e.src;else if(e.on&&c.fillcolor)b=new l(c.fillcolor+""),b.a=e.opacity;a.fillStyle=b;s(d);d instanceof i.Text||p(d)}return d};i.attachSurface=function(a){var d=new i.Surface;d.clipNode=a;var a=d.rawNode=a.firstChild,c=a.firstChild;if(!c||"rect"!=c.tagName)return null;d.bgNode=a;return d};var s=function(a){var d=a.rawNode;if(d.stroked){var a=a.strokeStyle=j.clone(g.defaultStroke),c=d.stroke;a.color=
new l(d.strokecolor.value);a.width=g.normalizedLength(d.strokeweight+"");a.color.a=c.opacity;a.cap=this._translate(this._capMapReversed,c.endcap);a.join="miter"==c.joinstyle?c.miterlimit:c.joinstyle;a.style=c.dashstyle}else a.strokeStyle=null},p=function(a){var d=a.rawNode.skew,c=d.matrix,d=d.offset;a.matrix=k.normalize({xx:c.xtox,xy:c.ytox,yx:c.xtoy,yy:c.ytoy,dx:g.pt2px(d.x),dy:g.pt2px(d.y)})},n=function(a){var d=a.shape=j.clone(g.defaultText),c=a.rawNode,b=c.path.v.match(g.pathVmlRegExp);do if(b&&
7==b.length){for(var e=c.childNodes,f=0;f<e.length&&"textpath"!=e[f].tagName;++f);if(!(f>=e.length)){a=e[f].style;d.text=e[f].string;switch(a["v-text-align"]){case "left":d.x=parseInt(b[1]);d.align="start";break;case "center":d.x=(parseInt(b[1])+parseInt(b[4]))/2;d.align="middle";break;case "right":d.x=parseInt(b[4]),d.align="end"}d.y=parseInt(b[2]);d.decoration=a["text-decoration"];d.rotated=a["v-rotate-letters"].toLowerCase()in i._bool;d.kerning=a["v-text-kern"].toLowerCase()in i._bool;return}}while(0);
a.shape=null},o=function(a){for(var d=a.fontStyle=j.clone(g.defaultFont),c=a.rawNode.childNodes,b=0;b<c.length&&"textpath"==c[b].tagName;++b);b>=c.length?a.fontStyle=null:(a=c[b].style,d.style=a.fontstyle,d.variant=a.fontvariant,d.weight=a.fontweight,d.size=a.fontsize,d.family=a.fontfamily)},m=function(a){for(var d=a.shape=j.clone(g.defaultPath),c=a.rawNode.path.v.match(g.pathVmlRegExp),a=[],b=!1,e=r._pathVmlToSvgMap;0<c.length;++c){var f=c[0];f in e?(b=!1,a.push(e[f])):b||(f=parseInt(f),isNaN(f)?
b=!0:a.push(f))}c=a.length;4<=c&&""==a[c-1]&&0==a[c-2]&&0==a[c-3]&&"l"==a[c-4]&&a.splice(c-4,4);if(c)d.path=a.join(" ")};return i});