//>>built
require({cache:{"url:phpr/template/menubar/warningIcon.html":'<td class="empty">\n    <div class="menuItem"></div>\n    <div class="menuContainer">\n        <div class="menu" data-dojo-type="dijit/DropDownMenu" data-dojo-attach-point="menu"></div>\n    </div>\n</td>\n'}});
define("phpr/Menubar/WarningIcon","dojo/_base/declare,dojo/_base/lang,dojo/_base/array,dojo/on,dojo/topic,dojo/window,dojo/dom-class,dojo/dom-style,dojo/dom-geometry,dojo/dom-construct,dojo/dom-class,dijit/_Widget,dijit/_TemplatedMixin,dijit/_WidgetsInTemplateMixin,dijit/_CssStateMixin,dijit/MenuItem,phpr/Api,dojo/text!phpr/template/menubar/warningIcon.html,dijit/DropDownMenu".split(","),function(j,d,e,k,f,l,g,s,t,u,h,m,n,o,p,i,q,r){return j([m,n,o,p],{baseClass:"warningIconButton",templateString:r,
state:"closed",itemCount:0,byTag:null,constructor:function(){this.byTag={};f.subscribe("notification",dojo.hitch(this,this._addNotification));f.subscribe("notification/clear",dojo.hitch(this,this._clearNotifications))},postCreate:function(){this.inherited(arguments);this.own(k(this.domNode,"click",d.hitch(this,"onClick")));l.get(this.domNode.ownerDocument).onerror=function(a){q.defaultErrorHandler(a)}},onClick:function(){this.toggleState()},toggleState:function(){this.isOpen()?this.closeMenu():this.openMenu()},
openMenu:function(){g.add(this.domNode,"open");this.state="open"},closeMenu:function(){g.remove(this.domNode,"open");this.state="closed"},isOpen:function(){return"open"===this.state},_remove:function(a){this.menu.removeChild(a);delete this.menu.focusedChild;a.destroyRecursive();this.itemCount-=1;0===this.itemCount&&(this._markEmpty(),this.closeMenu())},_addNotification:function(a,b){this._markNotEmpty();var c=new i({iconClass:"warningIcon",label:a.message});c.own(c.on("click",dojo.hitch(this,this._remove,
c)));this.menu.addChild(c,0);this.itemCount+=1;0<this.itemCount&&this.openMenu();this.byTag[b]=this.byTag[b]||[];this.byTag[b].push(c)},_clearNotifications:function(a){if(void 0===a){for(var b in this.byTag)e.forEach(this.byTag[b],d.hitch(this,this._remove));this.byTag={}}else e.forEach(this.byTag[a],d.hitch(this,this._remove)),delete this.byTag[a]},dummyItem:new i,_markEmpty:function(){this.menu.addChild(this.dummyItem);h.add(this.domNode,"empty")},_markNotEmpty:function(){this.menu.removeChild(this.dummyItem);
h.remove(this.domNode,"empty")}})});