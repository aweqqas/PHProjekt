//>>built
require({cache:{"url:phpr/template/menubar.html":'<div class="menubarOuter">\n    <div class="menubarMiddle">\n        <table class="menubar"><tr>\n            <td class="bookingsButton button left" data-dojo-attach-point="bookingsButton"\n                ><div class="menuItem">Booking</div></td>\n            <td style=\'display: none;\' class="startButton button left" data-dojo-attach-point="startButton"\n                ><div class="menuItem">Start</div></td>\n            <td style=\'display: none;\' class="statisticsButton button left" data-dojo-attach-point="statisticsButton"\n                ><div class="menuItem">Statistics</div></td>\n            <td style="width: auto;"><div><b></b></div></td>\n            <td class="button right" data-dojo-type="phpr/Menubar/WarningIcon"><div><b></b></div></td>\n            <td class="logoutButton button right" data-dojo-attach-point="logoutButton"\n                ><div class="logoutIcon menuItem"></div></td>\n            </tr></table>\n    </div>\n</div>\n'}});
define("phpr/Menubar","dojo/_base/declare,dojo/_base/lang,dojo/on,dojo/dom-class,dijit/_Widget,dijit/_TemplatedMixin,dijit/_WidgetsInTemplateMixin,dijit/_CssStateMixin,dijit/Tooltip,dojo/topic,dojo/text!phpr/template/menubar.html,phpr/Menubar/WarningIcon".split(","),function(e,a,b,c,f,g,h,i,j,d,k){return e([f,g,h,i],{templateString:k,baseClass:"menuBar",cssStateNodes:{logoutButton:"dijit"},buildRendering:function(){this.inherited(arguments);this.own(b(this.startButton,"click",a.hitch(this,"onStartClick")),
b(this.bookingsButton,"click",a.hitch(this,"onBookingsClick")),b(this.statisticsButton,"click",a.hitch(this,"onStatisticsClick")),b(this.logoutButton,"click",a.hitch(this,"_logout")));this.own(new j({connectId:this.logoutButton,label:"Log out"}))},onStartClick:function(){d.publish("phpr/showLiveBooking");c.replace(this.domNode,"menubarOuter start")},onBookingsClick:function(){d.publish("phpr/showBookings");c.replace(this.domNode,"menubarOuter bookings")},onStatisticsClick:function(){d.publish("phpr/showStatistics");
c.replace(this.domNode,"menubarOuter statistics")},_logout:function(){window.location="index.php/Login/logout"}})});