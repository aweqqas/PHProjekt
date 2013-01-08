//>>built
define("dojox/drawing/manager/Stencil",["dojo","../util/oo","../defaults"],function(c,f,g){var e;return f.declare(function(a){e=a.surface;this.canvas=a.canvas;this.undo=a.undo;this.mouse=a.mouse;this.keys=a.keys;this.anchors=a.anchors;this.stencils={};this.selectedStencils={};this._mouseHandle=this.mouse.register(this);c.connect(this.keys,"onArrow",this,"onArrow");c.connect(this.keys,"onEsc",this,"deselect");c.connect(this.keys,"onDelete",this,"onDelete")},{_dragBegun:!1,_wasDragged:!1,_secondClick:!1,
_isBusy:!1,setRecentStencil:function(a){this.recent=a},getRecentStencil:function(){return this.recent},register:function(a){if(a.isText&&!a.editMode&&a.deleteEmptyCreate&&!a.getText())return console.warn("EMPTY CREATE DELETE",a),a.destroy(),!1;this.stencils[a.id]=a;this.setRecentStencil(a);a.execText&&(a._text&&!a.editMode&&this.selectItem(a),a.connect("execText",this,function(){a.isText&&a.deleteEmptyModify&&!a.getText()?(console.warn("EMPTY MOD DELETE",a),this.deleteItem(a)):a.selectOnExec&&this.selectItem(a)}));
a.connect("deselect",this,function(){!this._isBusy&&this.isSelected(a)&&this.deselectItem(a)});a.connect("select",this,function(){!this._isBusy&&!this.isSelected(a)&&this.selectItem(a)});return a},unregister:function(a){a&&(a.selected&&this.onDeselect(a),delete this.stencils[a.id])},onArrow:function(a){this.hasSelected()&&(this.saveThrottledState(),this.group.applyTransform({dx:a.x,dy:a.y}))},_throttleVrl:null,_throttle:!1,throttleTime:400,_lastmxx:-1,_lastmxy:-1,saveMoveState:function(){var a=this.group.getTransform();
if(!(a.dx==this._lastmxx&&a.dy==this._lastmxy))this._lastmxx=a.dx,this._lastmxy=a.dy,this.undo.add({before:c.hitch(this.group,"setTransform",a)})},saveThrottledState:function(){clearTimeout(this._throttleVrl);clearInterval(this._throttleVrl);this._throttleVrl=setTimeout(c.hitch(this,function(){this._throttle=!1;this.saveMoveState()}),this.throttleTime);if(!this._throttle)this._throttle=!0,this.saveMoveState()},unDelete:function(a){for(var b in a)a[b].render(),this.onSelect(a[b])},onDelete:function(a){!0!==
a&&this.undo.add({before:c.hitch(this,"unDelete",this.selectedStencils),after:c.hitch(this,"onDelete",!0)});this.withSelected(function(a){this.anchors.remove(a);var d=a.id;a.destroy();delete this.stencils[d]});this.selectedStencils={}},deleteItem:function(a){if(this.hasSelected()){var b=[],d;for(d in this.selectedStencils)if(this.selectedStencils.id==a.id){if(1==this.hasSelected()){this.onDelete();return}}else b.push(this.selectedStencils.id);this.deselect();this.selectItem(a);this.onDelete();c.forEach(b,
function(a){this.selectItem(a)},this)}else this.selectItem(a),this.onDelete()},removeAll:function(){this.selectAll();this._isBusy=!0;this.onDelete();this.stencils={};this._isBusy=!1},setSelectionGroup:function(){this.withSelected(function(a){this.onDeselect(a,!0)});this.group&&(e.remove(this.group),this.group.removeShape());this.group=e.createGroup();this.group.setTransform({dx:0,dy:0});this.withSelected(function(a){this.group.add(a.container);a.select()})},setConstraint:function(){var a=Infinity,
b=Infinity;this.withSelected(function(d){d=d.getBounds();a=Math.min(d.y1,a);b=Math.min(d.x1,b)});this.constrain={l:-b,t:-a}},onDeselect:function(a,b){b||delete this.selectedStencils[a.id];this.anchors.remove(a);e.add(a.container);a.selected&&a.deselect();a.applyTransform(this.group.getTransform())},deselectItem:function(a){this.onDeselect(a)},deselect:function(){this.withSelected(function(a){this.onDeselect(a)});this._wasDragged=this._dragBegun=!1},onSelect:function(a){a||console.error("null stencil is not selected:",
this.stencils);this.selectedStencils[a.id]||(this.selectedStencils[a.id]=a,this.group.add(a.container),a.select(),1==this.hasSelected()&&this.anchors.add(a,this.group))},selectAll:function(){this._isBusy=!0;for(var a in this.stencils)this.selectItem(a);this._isBusy=!1},selectItem:function(a){a=this.stencils["string"==typeof a?a:a.id];this.setSelectionGroup();this.onSelect(a);this.group.moveToFront();this.setConstraint()},onLabelDoubleClick:function(a){this.selectedStencils[a.id]&&this.deselect()},
onStencilDoubleClick:function(a){if(this.selectedStencils[a.id]&&this.selectedStencils[a.id].edit)a=this.selectedStencils[a.id],a.editMode=!0,this.deselect(),a.edit()},onAnchorUp:function(){this.setConstraint()},onStencilDown:function(a){if(this.stencils[a.id])if(this.setRecentStencil(this.stencils[a.id]),this._isBusy=!0,this.selectedStencils[a.id]&&this.keys.meta)this.onDeselect(this.selectedStencils[a.id]),1==this.hasSelected()&&this.withSelected(function(a){this.anchors.add(a,this.group)}),this.group.moveToFront(),
this.setConstraint();else if(this.selectedStencils[a.id]){var b=this.group.getTransform();this._offx=a.x-b.dx;this._offy=a.y-b.dy}else this.keys.meta||this.deselect(),this.selectItem(a.id),b=this.group.getTransform(),this._offx=a.x-b.dx,this._offy=a.y-b.dx,this.orgx=a.x,this.orgy=a.y,this._isBusy=!1,this.undo.add({before:function(){},after:function(){}})},onLabelDown:function(a,b){this.onStencilDown(a,b)},onStencilUp:function(){},onLabelUp:function(a){this.onStencilUp(a)},onStencilDrag:function(a){if(this._dragBegun){this.saveThrottledState();
var b=a.x-a.last.x,d=a.y-a.last.y,c=this.constrain,e=g.anchors.marginZero,b=a.x-this._offx,d=a.y-this._offy;b<c.l+e&&(b=c.l+e);d<c.t+e&&(d=c.t+e);this.group.setTransform({dx:b,dy:d})}else this.onBeginDrag(a),this._dragBegun=!0},onLabelDrag:function(a){this.onStencilDrag(a)},onDragEnd:function(){this._dragBegun=!1},onBeginDrag:function(){this._wasDragged=!0},onDown:function(){this.deselect()},onStencilOver:function(a){c.style(a.id,"cursor","move")},onStencilOut:function(a){c.style(a.id,"cursor","crosshair")},
exporter:function(){var a=[],b;for(b in this.stencils)this.stencils[b].enabled&&a.push(this.stencils[b].exporter());return a},listStencils:function(){return this.stencils},toSelected:function(a){var b=Array.prototype.slice.call(arguments).splice(1),c;for(c in this.selectedStencils){var e=this.selectedStencils[c];e[a].apply(e,b)}},withSelected:function(a){var a=c.hitch(this,a),b;for(b in this.selectedStencils)a(this.selectedStencils[b])},withUnselected:function(a){var a=c.hitch(this,a),b;for(b in this.stencils)!this.stencils[b].selected&&
a(this.stencils[b])},withStencils:function(a){var a=c.hitch(this,a),b;for(b in this.stencils)a(this.stencils[b])},hasSelected:function(){var a=0,b;for(b in this.selectedStencils)a++;return a},isSelected:function(a){return!!this.selectedStencils[a.id]}})});