//>>built
define("dojox/rpc/Rest",["dojo","dojox"],function(h,g){function i(c,d,a){c.addCallback(function(d){if(c.ioArgs.xhr&&a)a=c.ioArgs.xhr.getResponseHeader("Content-Range"),c.fullLength=a&&(a=a.match(/\/(.*)/))&&parseInt(a[1]);return d});return c}h.getObject("rpc.Rest",!0,g);g.rpc&&g.rpc.transportRegistry&&g.rpc.transportRegistry.register("REST",function(c){return"REST"==c},{getExecutor:function(c,d,a){return new g.rpc.Rest(d.name,(d.contentType||a._smd.contentType||"").match(/json|javascript/),null,function(c,
e){var b=a._getRequest(d,[c]);b.url=b.target+(b.data?"?"+b.data:"");if(e&&(0<=e.start||0<=e.count))b.headers=b.headers||{},b.headers.Range="items="+(e.start||"0")+"-"+("count"in e&&Infinity!=e.count?e.count+(e.start||0)-1:"");return b})}});var f;f=g.rpc.Rest=function(c,d,a,j){function e(a){b[a]=function(c,d){return f._change(a,b,c,d)}}var b;b=function(a,c){return f._get(b,a,c)};b.isJson=d;b._schema=a;b.cache={serialize:d?(g.json&&g.json.ref||h).toJson:function(a){return a}};b._getRequest=j||function(a,
b){h.isObject(a)&&(a=(a=h.objectToQuery(a))?"?"+a:"");if(b&&b.sort&&!b.queryStr){for(var a=a+((a?"&":"?")+"sort("),e=0;e<b.sort.length;e++)var f=b.sort[e],a=a+((0<e?",":"")+(f.descending?"-":"+")+encodeURIComponent(f.attribute));a+=")"}e={url:c+(null==a?"":a),handleAs:d?"json":"text",contentType:d?"application/json":"text/plain",sync:g.rpc._sync,headers:{Accept:d?"application/json,application/javascript":"*/*"}};if(b&&(0<=b.start||0<=b.count))e.headers.Range="items="+(b.start||"0")+"-"+("count"in
b&&Infinity!=b.count?b.count+(b.start||0)-1:"");g.rpc._sync=!1;return e};e("put");e("post");e("delete");b.servicePath=c;return b};f._index={};f._timeStamps={};f._change=function(c,d,a,f){a=d._getRequest(a);a[c+"Data"]=f;return i(h.xhr(c.toUpperCase(),a,!0),d)};f._get=function(c,d,a){a=a||{};return i(h.xhrGet(c._getRequest(d,a)),c,0<=a.start||0<=a.count,d)};return f});