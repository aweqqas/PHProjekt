//>>built
define("dojox/xmpp/TransportSession",["dojo","dijit","dojox","dojo/require!dojox/xmpp/bosh,dojox/xmpp/util,dojox/data/dom"],function(d,f,e){d.provide("dojox.xmpp.TransportSession");d.require("dojox.xmpp.bosh");d.require("dojox.xmpp.util");d.require("dojox.data.dom");e.xmpp.TransportSession=function(a){this.sendTimeout=1E3*(this.wait+20);if(a&&d.isObject(a)&&(d.mixin(this,a),this.useScriptSrcTransport))this.transportIframes=[]};d.extend(e.xmpp.TransportSession,{rid:0,hold:1,polling:1E3,secure:!1,wait:60,
lang:"en",submitContentType:"text/xml; charset=utf=8",serviceUrl:"/httpbind",defaultResource:"dojoIm",domain:"imserver.com",sendTimeout:0,useScriptSrcTransport:!1,keepAliveTimer:null,state:"NotReady",transmitState:"Idle",protocolPacketQueue:[],outboundQueue:[],outboundRequests:{},inboundQueue:[],deferredRequests:{},matchTypeIdAttribute:{},open:function(){this.status="notReady";this.rid=Math.round(1E9*Math.random());this.protocolPacketQueue=[];this.outboundQueue=[];this.outboundRequests={};this.inboundQueue=
[];this.deferredRequests={};this.matchTypeIdAttribute={};this.keepAliveTimer=setTimeout(d.hitch(this,"_keepAlive"),1E4);this.useScriptSrcTransport?e.xmpp.bosh.initialize({iframes:this.hold+1,load:d.hitch(this,function(){this._sendLogin()})}):this._sendLogin()},_sendLogin:function(){var a=this.rid++;this.addToOutboundQueue(e.xmpp.util.createElement("body",{content:this.submitContentType,hold:this.hold,rid:a,to:this.domain,secure:this.secure,wait:this.wait,"xml:lang":this.lang,"xmpp:version":"1.0",
xmlns:e.xmpp.xmpp.BODY_NS,"xmlns:xmpp":"urn:xmpp:xbosh"},!0),a)},_sendRestart:function(){var a=this.rid++;this.addToOutboundQueue(e.xmpp.util.createElement("body",{rid:a,sid:this.sid,to:this.domain,"xmpp:restart":"true","xml:lang":this.lang,xmlns:e.xmpp.xmpp.BODY_NS,"xmlns:xmpp":"urn:xmpp:xbosh"},!0),a)},processScriptSrc:function(a,b){var c=e.xml.parser.parse(a,"text/xml");c&&this.processDocument(c,b)},_keepAlive:function(){if(!("wait"==this.state||this.isTerminated()))this._dispatchPacket(),this.keepAliveTimer=
setTimeout(d.hitch(this,"_keepAlive"),1E4)},close:function(a){var b=this.rid++,c={sid:this.sid,rid:b,type:"terminate"},d=null;a?(d=new e.string.Builder(e.xmpp.util.createElement("body",c,!1)),d.append(a),d.append("</body>")):d=new e.string.Builder(e.xmpp.util.createElement("body",c,!1));this.addToOutboundQueue(d.toString(),b)},dispatchPacket:function(a,b,c,e){a&&this.protocolPacketQueue.push(a);a=new d.Deferred;if(b&&c&&(a.protocolMatchType=b,a.matchId=c,a.matchProperty=e||"id","id"!=a.matchProperty))this.matchTypeIdAttribute[b]=
a.matchProperty;this.deferredRequests[a.protocolMatchType+"-"+a.matchId]=a;if(!this.dispatchTimer)this.dispatchTimer=setTimeout(d.hitch(this,"_dispatchPacket"),600);return a},_dispatchPacket:function(){clearTimeout(this.dispatchTimer);delete this.dispatchTimer;if(this.sid&&this.authId&&!("error"!=this.transmitState&&0==this.protocolPacketQueue.length&&0<this.outboundQueue.length)&&!("wait"==this.state||this.isTerminated())){var a={sid:this.sid,xmlns:e.xmpp.xmpp.BODY_NS},b;if(0<this.protocolPacketQueue.length)a.rid=
this.rid++,b=new e.string.Builder(e.xmpp.util.createElement("body",a,!1)),b.append(this.processProtocolPacketQueue()),b.append("</body>"),delete this.lastPollTime;else{if(this.lastPollTime&&(b=(new Date).getTime(),b-this.lastPollTime<this.polling)){this.dispatchTimer=setTimeout(d.hitch(this,"_dispatchPacket"),this.polling-(b-this.lastPollTime)+10);return}a.rid=this.rid++;this.lastPollTime=(new Date).getTime();b=new e.string.Builder(e.xmpp.util.createElement("body",a,!0))}this.addToOutboundQueue(b.toString(),
a.rid)}},redispatchPacket:function(a){this.sendXml(this.outboundRequests[a],a)},addToOutboundQueue:function(a,b){this.outboundQueue.push({msg:a,rid:b});this.outboundRequests[b]=a;this.sendXml(a,b)},removeFromOutboundQueue:function(a){for(var b=0;b<this.outboundQueue.length;b++)if(a==this.outboundQueue[b].rid){this.outboundQueue.splice(b,1);break}delete this.outboundRequests[a]},processProtocolPacketQueue:function(){for(var a=new e.string.Builder,b=0;b<this.protocolPacketQueue.length;b++)a.append(this.protocolPacketQueue[b]);
this.protocolPacketQueue=[];return a.toString()},sendXml:function(a,b){if(this.isTerminated())return!1;this.transmitState="transmitting";var c=null,c=this.useScriptSrcTransport?e.xmpp.bosh.get({rid:b,url:this.serviceUrl+"?"+encodeURIComponent(a),error:d.hitch(this,function(){this.setState("Terminate","error");return!1}),timeout:this.sendTimeout}):d.rawXhrPost({contentType:"text/xml",url:this.serviceUrl,postData:a,handleAs:"xml",error:d.hitch(this,function(a,c){return this.processError(c.xhr.responseXML,
c.xhr.status,b)}),timeout:this.sendTimeout});c.addCallback(this,function(a){return this.processDocument(a,b)});return c},processDocument:function(a,b){if(this.isTerminated()||!a.firstChild)return!1;this.transmitState="idle";var c=a.firstChild;if(1>this.outboundQueue.length)return!1;var d=this.outboundQueue[0].rid;b==d?(this.removeFromOutboundQueue(b),this.processResponse(c,b),this.processInboundQueue()):b-d<this.hold+2&&this.addToInboundQueue(a,b);return a},processInboundQueue:function(){for(;0<this.inboundQueue.length;){var a=
this.inboundQueue.shift();this.processDocument(a.doc,a.rid)}},addToInboundQueue:function(a,b){for(var c=0;c<this.inboundQueue.length;c++)b<this.inboundQueue[c].rid||this.inboundQueue.splice(c,0,{doc:a,rid:b})},processResponse:function(a,b){if("terminate"==a.getAttribute("type")){var c="";"conflict"==a.firstChild.firstChild.nodeName&&(c="conflict");this.setState("Terminate",c)}else{if("Ready"!=this.state&&"Terminate"!=this.state){if(c=a.getAttribute("sid"))this.sid=c;else throw Error("No sid returned during xmpp session startup");
this.authId=a.getAttribute("authid");""==this.authId&&1>this.authRetries--&&(console.error("Unable to obtain Authorization ID"),this.terminateSession());this.wait=a.getAttribute("wait");if(a.getAttribute("polling"))this.polling=1E3*parseInt(a.getAttribute("polling"));this.inactivity=a.getAttribute("inactivity");this.setState("Ready")}d.forEach(a.childNodes,function(a){this.processProtocolResponse(a,b)},this);"idle"==this.transmitState&&this.dispatchPacket()}},processProtocolResponse:function(a){this.onProcessProtocolResponse(a);
var b=a.nodeName+"-"+a.getAttribute("id"),c=this.deferredRequests[b];c&&(c.callback(a),delete this.deferredRequests[b])},setState:function(a,b){if(this.state!=a){if(this["on"+a])this["on"+a](a,this.state,b);this.state=a}},isTerminated:function(){return"Terminate"==this.state},processError:function(a,b,c){if(this.isTerminated())return!1;if(200!=b){if(400<=b&&500>b)this.setState("Terminate",e);else return this.removeFromOutboundQueue(c),setTimeout(d.hitch(this,function(){this.dispatchPacket()}),200),
!0;return!1}this.removeFromOutboundQueue(c);if(a&&a.firstChild&&"terminate"==a.firstChild.getAttribute("type")){var a=a.firstChild.firstChild,e="";a&&"conflict"==a.nodeName&&(e="conflict");this.setState("Terminate",e);return!1}this.transmitState="error";setTimeout(d.hitch(this,function(){this.dispatchPacket()}),200);return!0},onTerminate:function(){},onProcessProtocolResponse:function(){},onReady:function(){}})});