//>>built
require({cache:{"url:phpr/template/bookingList/bookingBlock.html":'<div class="bookingEntry">\n    <span data-dojo-attach-point="project" class="project"></span>\n    <span data-dojo-attach-point="time"    class="time"></span>\n    <button data-dojo-type="dijit/form/Button" type="button" data-dojo-attach-point="deleteButton"\n        data-dojo-props="showLabel: false, iconClass: \'deleteIcon\', baseClass: \'deleteButton\'"\n        data-dojo-attach-event="onClick:_delete" class="deleteButton"></button>\n    <button data-dojo-type="dijit/form/Button" type="button" data-dojo-attach-point="confirmDeleteButton"\n        data-dojo-props="iconClass: \'deleteIcon\'"\n        data-dojo-attach-event="onClick:_confirmDeletion" class="confirmDeleteButton">Delete?</button>\n    <button data-dojo-type="dijit/form/Button" type="button" data-dojo-attach-point="editButton"\n        data-dojo-props="showLabel: false, iconClass: \'editIcon\', baseClass: \'editButton\'"\n        data-dojo-attach-event="onClick:_edit" class="editButton"></button>\n    <span data-dojo-attach-point="notes" class="notes"></span>\n</div>\n'}});
define("phpr/BookingList/BookingBlock","dojo/_base/declare,dojo/_base/lang,dojo/_base/window,dojo/html,dojo/on,dojo/dom-class,dojo/date,dojo/date/locale,dojo/topic,dojo/query,dojo/json,dojo/NodeList-dom,dijit/_WidgetBase,dijit/_TemplatedMixin,dijit/_WidgetsInTemplateMixin,dojo/Evented,phpr/Timehelper,phpr/Api,dojo/text!phpr/template/bookingList/bookingBlock.html".split(","),function(k,g,l,f,h,d,m,i,n,o,p,w,q,r,s,t,j,u,v){var e=function(){o(".bookingEntry.selected, .bookingEntry.confirmDeletion").removeClass("selected confirmDeletion")};
h(l.doc,"click",e);return k([q,r,s,t],{store:null,booking:null,_actionTimeout:null,templateString:v,_setBookingAttr:function(a){u.projectTitleForId(a.projectId).then(g.hitch(this,function(a){f.set(this.project,a)}));var c=j.datetimeToJsDate(a.startDatetime),b=a.endTime||"",b=""!==b,d=i.format(c,{selector:"time"})+" - ";if(b){b=j.timeToJsDate(a.endTime);b.setDate(c.getDate());b.setMonth(c.getMonth());b.setFullYear(c.getFullYear());var c=m.difference(c,b,"minute"),e=Math.floor(c/60);f.set(this.time,
d+i.format(b,{selector:"time"})+" ("+e+"h "+c%60+"m)")}else f.set(this.time,d);f.set(this.notes,a.notes)},_delete:function(a){a.stopPropagation();this._doClickAction(function(){e();d.add(this.domNode,"confirmDeletion")})},_confirmDeletion:function(a){a.stopPropagation();this._doClickAction(function(){this.store.remove(this.booking.id).then(void 0,function(a){n.publish("notification",p.parse(a.responseText))})})},startup:function(){this.inherited(arguments);this.booking&&!0===this.booking.highlight&&
d.add(this.domNode,"highlight");this.own(h(this.domNode,"click",g.hitch(this,this._markSelected)))},_markSelected:function(a){a.stopPropagation();d.contains(this.domNode,"confirmDeletion")||(e(),d.add(this.domNode,"selected"))},_edit:function(){this.emit("editClick")},_doClickAction:function(a){clearTimeout(this._actionTimeout);this._actionTimeout=setTimeout(g.hitch(this,a),500)}})});