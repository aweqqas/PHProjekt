//>>built
define("dojox/mobile/RoundRectCategory",["dojo/_base/declare","dojo/_base/window","dojo/dom-construct","dijit/_Contained","dijit/_WidgetBase"],function(b,f,c,d,e){return b("dojox.mobile.RoundRectCategory",[e,d],{label:"",tag:"h2",baseClass:"mblRoundRectCategory",buildRendering:function(){var a=this.domNode=this.containerNode=this.srcNodeRef||c.create(this.tag);this.inherited(arguments);if(!this.label&&1===a.childNodes.length&&3===a.firstChild.nodeType)this.label=a.firstChild.nodeValue},_setLabelAttr:function(a){this.label=
a;this.domNode.innerHTML=this._cv?this._cv(a):a}})});