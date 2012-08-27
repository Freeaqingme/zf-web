/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dijit._editor._Plugin"],["require","dijit._Widget"],["require","dijit.Editor"],["require","dijit.form.Button"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dijit._editor._Plugin"]){_4._hasResource["dijit._editor._Plugin"]=true;_4.provide("dijit._editor._Plugin");_4.require("dijit._Widget");_4.require("dijit.Editor");_4.require("dijit.form.Button");_4.declare("dijit._editor._Plugin",null,{constructor:function(_7,_8){this.params=_7||{};_4.mixin(this,this.params);this._connects=[];},editor:null,iconClassPrefix:"dijitEditorIcon",button:null,command:"",useDefaultCommand:true,buttonClass:_5.form.Button,getLabel:function(_9){return this.editor.commands[_9];},_initButton:function(){if(this.command.length){var _a=this.getLabel(this.command);var _b=this.iconClassPrefix+" "+this.iconClassPrefix+this.command.charAt(0).toUpperCase()+this.command.substr(1);if(!this.button){var _c=_4.mixin({label:_a,showLabel:false,iconClass:_b,dropDown:this.dropDown,tabIndex:"-1"},this.params||{});this.button=new this.buttonClass(_c);}}},destroy:function(){_4.forEach(this._connects,_4.disconnect);if(this.dropDown){this.dropDown.destroyRecursive();}},connect:function(o,f,tf){this._connects.push(_4.connect(o,f,this,tf));},updateState:function(){var e=this.editor,c=this.command,_d,_e;if(!e||!e.isLoaded||!c.length){return;}if(this.button){try{_e=e.queryCommandEnabled(c);if(this.enabled!==_e){this.enabled=_e;this.button.attr("disabled",!_e);}if(typeof this.button.checked=="boolean"){_d=e.queryCommandState(c);if(this.checked!==_d){this.checked=_d;this.button.attr("checked",e.queryCommandState(c));}}}catch(e){console.log(e);}}},setEditor:function(_f){this.editor=_f;this._initButton();if(this.command.length&&!this.editor.queryCommandAvailable(this.command)){if(this.button){this.button.domNode.style.display="none";}}if(this.button&&this.useDefaultCommand){this.connect(this.button,"onClick",_4.hitch(this.editor,"execCommand",this.command,this.commandArg));}this.connect(this.editor,"onNormalizedDisplayChanged","updateState");},setToolbar:function(_10){if(this.button){_10.addChild(this.button);}}});}}};});