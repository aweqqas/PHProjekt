//>>built
require({cache:{"url:dijit/form/templates/DropDownBox.html":'<div class="dijit dijitReset dijitInline dijitLeft"\n\tid="widget_${id}"\n\trole="combobox"\n\t><div class=\'dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer\'\n\t\tdata-dojo-attach-point="_buttonNode, _popupStateNode" role="presentation"\n\t\t><input class="dijitReset dijitInputField dijitArrowButtonInner" value="&#9660; " type="text" tabIndex="-1" readonly="readonly" role="presentation"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class=\'dijitReset dijitValidationContainer\'\n\t\t><input class="dijitReset dijitInputField dijitValidationIcon dijitValidationInner" value="&#935; " type="text" tabIndex="-1" readonly="readonly" role="presentation"\n\t/></div\n\t><div class="dijitReset dijitInputField dijitInputContainer"\n\t\t><input class=\'dijitReset dijitInputInner\' ${!nameAttrSetting} type="text" autocomplete="off"\n\t\t\tdata-dojo-attach-point="textbox,focusNode" role="textbox" aria-haspopup="true"\n\t/></div\n></div>\n'}});
define("dijit/form/_DateTimeTextBox","dojo/date,dojo/date/locale,dojo/date/stamp,dojo/_base/declare,dojo/_base/lang,./RangeBoundTextBox,../_HasDropDown,dojo/text!./templates/DropDownBox.html".split(","),function(g,h,f,i,e,j,k,l){return i("dijit.form._DateTimeTextBox",[j,k],{templateString:l,hasDownArrow:!0,cssStateNodes:{_buttonNode:"dijitDownArrowButton"},pattern:h.regexp,datePackage:"",postMixInProperties:function(){this.inherited(arguments);this._set("type","text")},compare:function(a,b){var c=
this._isInvalidDate(a),d=this._isInvalidDate(b);return c?d?0:-1:d?1:g.compare(a,b,this._selector)},forceWidth:!0,format:function(a,b){return!a?"":this.dateLocaleModule.format(a,b)},parse:function(a,b){return this.dateLocaleModule.parse(a,b)||(this._isEmpty(a)?null:void 0)},serialize:function(a,b){a.toGregorian&&(a=a.toGregorian());return f.toISOString(a,b)},dropDownDefaultValue:new Date,value:new Date(""),_blankValue:null,popupClass:"",_selector:"",constructor:function(a){this.dateModule=a.datePackage?
e.getObject(a.datePackage,!1):g;this.dateClassObj=this.dateModule.Date||Date;this.dateLocaleModule=a.datePackage?e.getObject(a.datePackage+".locale",!1):h;this._set("pattern",this.dateLocaleModule.regexp);this._invalidDate=this.constructor.prototype.value.toString()},buildRendering:function(){this.inherited(arguments);if(!this.hasDownArrow)this._buttonNode.style.display="none";if(!this.hasDownArrow)this._buttonNode=this.domNode,this.baseClass+=" dijitComboBoxOpenOnClick"},_setConstraintsAttr:function(a){a.selector=
this._selector;a.fullYear=!0;var b=f.fromISOString;if("string"==typeof a.min)a.min=b(a.min);if("string"==typeof a.max)a.max=b(a.max);this.inherited(arguments)},_isInvalidDate:function(a){return!a||isNaN(a)||"object"!=typeof a||a.toString()==this._invalidDate},_setValueAttr:function(a,b,c){void 0!==a&&("string"==typeof a&&(a=f.fromISOString(a)),this._isInvalidDate(a)&&(a=null),a instanceof Date&&!(this.dateClassObj instanceof Date)&&(a=new this.dateClassObj(a)));this.inherited(arguments);if(this.value instanceof
Date)this.filterString="";this.dropDown&&this.dropDown.set("value",a,!1)},_set:function(a,b){"value"==a&&this.value instanceof Date&&0==this.compare(b,this.value)||this.inherited(arguments)},_setDropDownDefaultValueAttr:function(a){this._isInvalidDate(a)&&(a=new this.dateClassObj);this.dropDownDefaultValue=a},openDropDown:function(a){this.dropDown&&this.dropDown.destroy();var b=e.isString(this.popupClass)?e.getObject(this.popupClass,!1):this.popupClass,c=this,d=this.get("value");this.dropDown=new b({onChange:function(a){c.set("value",
a,!0)},id:this.id+"_popup",dir:c.dir,lang:c.lang,value:d,currentFocus:!this._isInvalidDate(d)?d:this.dropDownDefaultValue,constraints:c.constraints,filterString:c.filterString,datePackage:c.params.datePackage,isDisabledDate:function(a){return!c.rangeCheck(a,c.constraints)}});this.inherited(arguments)},_getDisplayedValueAttr:function(){return this.textbox.value},_setDisplayedValueAttr:function(a,b){this._setValueAttr(this.parse(a,this.constraints),b,a)}})});