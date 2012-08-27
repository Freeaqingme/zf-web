/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dijit.layout.ContentPane"],["require","dijit._Widget"],["require","dijit._Contained"],["require","dijit.layout._LayoutWidget"],["require","dojo.parser"],["require","dojo.string"],["require","dojo.html"],["requireLocalization","dijit","loading",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,ko,nb,nl,pl,pt,pt-pt,ru,sk,sl,sv,th,tr,zh,zh-tw","ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,ko,nb,nl,pl,pt,pt-pt,ru,sk,sl,sv,th,tr,zh,zh-tw"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dijit.layout.ContentPane"]){_4._hasResource["dijit.layout.ContentPane"]=true;_4.provide("dijit.layout.ContentPane");_4.require("dijit._Widget");_4.require("dijit._Contained");_4.require("dijit.layout._LayoutWidget");_4.require("dojo.parser");_4.require("dojo.string");_4.require("dojo.html");_4.declare("dijit.layout.ContentPane",_5._Widget,{href:"",extractContent:false,parseOnLoad:true,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,baseClass:"dijitContentPane",doLayout:true,ioArgs:{},isContainer:true,isLayoutContainer:true,onLoadDeferred:null,attributeMap:_4.delegate(_5._Widget.prototype.attributeMap,{title:[]}),postMixInProperties:function(){this.inherited(arguments);var _7=_4.i18n.getLocalization("dijit","loading",this.lang);this.loadingMessage=_4.string.substitute(this.loadingMessage,_7);this.errorMessage=_4.string.substitute(this.errorMessage,_7);if(!this.href&&this.srcNodeRef&&this.srcNodeRef.innerHTML){this.isLoaded=true;}},buildRendering:function(){this.inherited(arguments);if(!this.containerNode){this.containerNode=this.domNode;}},postCreate:function(){this.domNode.title="";if(!_4.attr(this.domNode,"role")){_5.setWaiRole(this.domNode,"group");}_4.addClass(this.domNode,this.baseClass);},startup:function(){if(this._started){return;}var _8=_5._Contained.prototype.getParent.call(this);this._childOfLayoutWidget=_8&&_8.isLayoutContainer;this._needLayout=!this._childOfLayoutWidget;if(this.isLoaded){_4.forEach(this.getChildren(),function(_9){_9.startup();});}if(this._isShown()||this.preload){this._onShow();}this.inherited(arguments);},_checkIfSingleChild:function(){var _a=_4.query("> *",this.containerNode).filter(function(_b){return _b.tagName!=="SCRIPT";}),_c=_a.filter(function(_d){return _4.hasAttr(_d,"dojoType")||_4.hasAttr(_d,"widgetId");}),_e=_4.filter(_c.map(_5.byNode),function(_f){return _f&&_f.domNode&&_f.resize;});if(_a.length==_c.length&&_e.length==1){this._singleChild=_e[0];}else{delete this._singleChild;}_4.toggleClass(this.containerNode,this.baseClass+"SingleChild",!!this._singleChild);},setHref:function(_10){_4.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use attr('href', ...) instead.","","2.0");return this.attr("href",_10);},_setHrefAttr:function(_11){this.cancel();this.onLoadDeferred=new _4.Deferred(_4.hitch(this,"cancel"));this.href=_11;if(this._created&&(this.preload||this._isShown())){this._load();}else{this._hrefChanged=true;}return this.onLoadDeferred;},setContent:function(_12){_4.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use attr('content', ...) instead.","","2.0");this.attr("content",_12);},_setContentAttr:function(_13){this.href="";this.cancel();this.onLoadDeferred=new _4.Deferred(_4.hitch(this,"cancel"));this._setContent(_13||"");this._isDownloaded=false;return this.onLoadDeferred;},_getContentAttr:function(){return this.containerNode.innerHTML;},cancel:function(){if(this._xhrDfd&&(this._xhrDfd.fired==-1)){this._xhrDfd.cancel();}delete this._xhrDfd;this.onLoadDeferred=null;},uninitialize:function(){if(this._beingDestroyed){this.cancel();}this.inherited(arguments);},destroyRecursive:function(_14){if(this._beingDestroyed){return;}this.inherited(arguments);},resize:function(_15,_16){if(!this._wasShown){this._onShow();}this._resizeCalled=true;if(_15){_4.marginBox(this.domNode,_15);}var cn=this.containerNode;if(cn===this.domNode){var mb=_16||{};_4.mixin(mb,_15||{});if(!("h" in mb)||!("w" in mb)){mb=_4.mixin(_4.marginBox(cn),mb);}this._contentBox=_5.layout.marginBox2contentBox(cn,mb);}else{this._contentBox=_4.contentBox(cn);}this._layoutChildren();},_isShown:function(){if(this._childOfLayoutWidget){if(this._resizeCalled&&"open" in this){return this.open;}return this._resizeCalled;}else{if("open" in this){return this.open;}else{var _17=this.domNode;return (_17.style.display!="none")&&(_17.style.visibility!="hidden")&&!_4.hasClass(_17,"dijitHidden");}}},_onShow:function(){if(this.href){if(!this._xhrDfd&&(!this.isLoaded||this._hrefChanged||this.refreshOnShow)){this.refresh();}}else{if(!this._childOfLayoutWidget&&this._needLayout){this._layoutChildren();}}this.inherited(arguments);this._wasShown=true;},refresh:function(){this.cancel();this.onLoadDeferred=new _4.Deferred(_4.hitch(this,"cancel"));this._load();return this.onLoadDeferred;},_load:function(){this._setContent(this.onDownloadStart(),true);var _18=this;var _19={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};if(_4.isObject(this.ioArgs)){_4.mixin(_19,this.ioArgs);}var _1a=(this._xhrDfd=(this.ioMethod||_4.xhrGet)(_19));_1a.addCallback(function(_1b){try{_18._isDownloaded=true;_18._setContent(_1b,false);_18.onDownloadEnd();}catch(err){_18._onError("Content",err);}delete _18._xhrDfd;return _1b;});_1a.addErrback(function(err){if(!_1a.canceled){_18._onError("Download",err);}delete _18._xhrDfd;return err;});delete this._hrefChanged;},_onLoadHandler:function(_1c){this.isLoaded=true;try{this.onLoadDeferred.callback(_1c);this.onLoad(_1c);}catch(e){console.error("Error "+this.widgetId+" running custom onLoad code: "+e.message);}},_onUnloadHandler:function(){this.isLoaded=false;try{this.onUnload();}catch(e){console.error("Error "+this.widgetId+" running custom onUnload code: "+e.message);}},destroyDescendants:function(){if(this.isLoaded){this._onUnloadHandler();}var _1d=this._contentSetter;_4.forEach(this.getChildren(),function(_1e){if(_1e.destroyRecursive){_1e.destroyRecursive();}});if(_1d){_4.forEach(_1d.parseResults,function(_1f){if(_1f.destroyRecursive&&_1f.domNode&&_1f.domNode.parentNode==_4.body()){_1f.destroyRecursive();}});delete _1d.parseResults;}_4.html._emptyNode(this.containerNode);delete this._singleChild;},_setContent:function(_20,_21){this.destroyDescendants();var _22=this._contentSetter;if(!(_22&&_22 instanceof _4.html._ContentSetter)){_22=this._contentSetter=new _4.html._ContentSetter({node:this.containerNode,_onError:_4.hitch(this,this._onError),onContentError:_4.hitch(this,function(e){var _23=this.onContentError(e);try{this.containerNode.innerHTML=_23;}catch(e){console.error("Fatal "+this.id+" could not change content due to "+e.message,e);}})});}var _24=_4.mixin({cleanContent:this.cleanContent,extractContent:this.extractContent,parseContent:this.parseOnLoad},this._contentSetterParams||{});_4.mixin(_22,_24);_22.set((_4.isObject(_20)&&_20.domNode)?_20.domNode:_20);delete this._contentSetterParams;if(!_21){_4.forEach(this.getChildren(),function(_25){if(!this.parseOnLoad||_25.getParent){_25.startup();}},this);this._scheduleLayout();this._onLoadHandler(_20);}},_onError:function(_26,err,_27){this.onLoadDeferred.errback(err);var _28=this["on"+_26+"Error"].call(this,err);if(_27){console.error(_27,err);}else{if(_28){this._setContent(_28,true);}}},_scheduleLayout:function(){if(this._isShown()){this._layoutChildren();}else{this._needLayout=true;}},_layoutChildren:function(){if(this.doLayout){this._checkIfSingleChild();}if(this._singleChild&&this._singleChild.resize){var cb=this._contentBox||_4.contentBox(this.containerNode);this._singleChild.resize({w:cb.w,h:cb.h});}else{_4.forEach(this.getChildren(),function(_29){if(_29.resize){_29.resize();}});}delete this._needLayout;},onLoad:function(_2a){},onUnload:function(){},onDownloadStart:function(){return this.loadingMessage;},onContentError:function(_2b){},onDownloadError:function(_2c){return this.errorMessage;},onDownloadEnd:function(){}});}}};});