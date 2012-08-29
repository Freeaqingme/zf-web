/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.grid._Selector"],["require","dojox.grid.Selection"],["require","dojox.grid._View"],["require","dojox.grid._Builder"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.grid._Selector"]){_4._hasResource["dojox.grid._Selector"]=true;_4.provide("dojox.grid._Selector");_4.require("dojox.grid.Selection");_4.require("dojox.grid._View");_4.require("dojox.grid._Builder");(function(){_6.grid._InputSelectorHeaderBuilder=_4.extend(function(_7){_6.grid._HeaderBuilder.call(this,_7);},_6.grid._HeaderBuilder.prototype,{generateHtml:function(){var w=this.view.contentWidth||0;var _8=this.view.grid.selection.getSelectedCount();var _9=(_8&&_8==this.view.grid.rowCount)?" dijitCheckBoxChecked dijitChecked":"";return "<table style=\"width:"+w+"px;\" "+"border=\"0\" cellspacing=\"0\" cellpadding=\"0\" "+"role=\"presentation\"><tr><th style=\"text-align: center;\">"+"<div class=\"dojoxGridCheckSelector dijitReset dijitInline dijitCheckBox"+_9+"\"></div></th></tr></table>";},doclick:function(e){var _a=this.view.grid.selection.getSelectedCount();this.view._selectionChanging=true;if(_a==this.view.grid.rowCount){this.view.grid.selection.deselectAll();}else{this.view.grid.selection.selectRange(0,this.view.grid.rowCount-1);}this.view._selectionChanging=false;this.view.onSelectionChanged();return true;}});_6.grid._SelectorContentBuilder=_4.extend(function(_b){_6.grid._ContentBuilder.call(this,_b);},_6.grid._ContentBuilder.prototype,{generateHtml:function(_c,_d){var w=this.view.contentWidth||0;return "<table class=\"dojoxGridRowbarTable\" style=\"width:"+w+"px;\" border=\"0\" "+"cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\"><tr>"+"<td  style=\"text-align: center;\" class=\"dojoxGridRowbarInner\">"+this.getCellContent(_d)+"</td></tr></table>";},getCellContent:function(_e){return "&nbsp;";},findTarget:function(){var t=_6.grid._ContentBuilder.prototype.findTarget.apply(this,arguments);return t;},domouseover:function(e){this.view.grid.onMouseOverRow(e);},domouseout:function(e){if(!this.isIntraRowEvent(e)){this.view.grid.onMouseOutRow(e);}},doclick:function(e){var _f=e.rowIndex;var _10=this.view.grid.selection.isSelected(_f);var _11=this.view.grid.selection.mode;if(!_10){if(_11=="single"){this.view.grid.selection.select(_f);}else{if(_11!="none"){this.view.grid.selection.addToSelection(_f);}}}else{this.view.grid.selection.deselect(_f);}return true;}});_6.grid._InputSelectorContentBuilder=_4.extend(function(_12){_6.grid._SelectorContentBuilder.call(this,_12);},_6.grid._SelectorContentBuilder.prototype,{getCellContent:function(_13){var v=this.view;var _14=v.inputType=="checkbox"?"CheckBox":"Radio";var _15=!!v.grid.selection.isSelected(_13)?" dijit"+_14+"Checked dijitChecked":"";return "<div class=\"dojoxGridCheckSelector dijitReset dijitInline dijit"+_14+_15+"\"></div>";}});_4.declare("dojox.grid._Selector",_6.grid._View,{inputType:"",selectionMode:"",defaultWidth:"2em",noscroll:true,padBorderWidth:2,_contentBuilderClass:_6.grid._SelectorContentBuilder,postCreate:function(){this.inherited(arguments);if(this.selectionMode){this.grid.selection.mode=this.selectionMode;}this.connect(this.grid.selection,"onSelected","onSelected");this.connect(this.grid.selection,"onDeselected","onDeselected");},buildRendering:function(){this.inherited(arguments);this.scrollboxNode.style.overflow="hidden";},getWidth:function(){return this.viewWidth||this.defaultWidth;},resize:function(){this.adaptHeight();},setStructure:function(s){this.inherited(arguments);if(s.defaultWidth){this.defaultWidth=s.defaultWidth;}},adaptWidth:function(){if(!("contentWidth" in this)&&this.contentNode){this.contentWidth=this.contentNode.offsetWidth-this.padBorderWidth;}},doStyleRowNode:function(_16,_17){var n=["dojoxGridRowbar dojoxGridNonNormalizedCell"];if(this.grid.rows.isOver(_16)){n.push("dojoxGridRowbarOver");}if(this.grid.selection.isSelected(_16)){n.push("dojoxGridRowbarSelected");}_17.className=n.join(" ");},onSelected:function(_18){this.grid.updateRow(_18);},onDeselected:function(_19){this.grid.updateRow(_19);}});if(!_6.grid._View.prototype._headerBuilderClass&&!_6.grid._View.prototype._contentBuilderClass){_6.grid._Selector.prototype.postCreate=function(){this.connect(this.scrollboxNode,"onscroll","doscroll");_6.grid.util.funnelEvents(this.contentNode,this,"doContentEvent",["mouseover","mouseout","click","dblclick","contextmenu","mousedown"]);_6.grid.util.funnelEvents(this.headerNode,this,"doHeaderEvent",["dblclick","mouseover","mouseout","mousemove","mousedown","click","contextmenu"]);if(this._contentBuilderClass){this.content=new this._contentBuilderClass(this);}else{this.content=new _6.grid._ContentBuilder(this);}if(this._headerBuilderClass){this.header=new this._headerBuilderClass(this);}else{this.header=new _6.grid._HeaderBuilder(this);}if(!_4._isBodyLtr()){this.headerNodeContainer.style.width="";}this.connect(this.grid.selection,"onSelected","onSelected");this.connect(this.grid.selection,"onDeselected","onDeselected");};}_4.declare("dojox.grid._RadioSelector",_6.grid._Selector,{inputType:"radio",selectionMode:"single",_contentBuilderClass:_6.grid._InputSelectorContentBuilder,buildRendering:function(){this.inherited(arguments);this.headerNode.style.visibility="hidden";},renderHeader:function(){}});_4.declare("dojox.grid._CheckBoxSelector",_6.grid._Selector,{inputType:"checkbox",_headerBuilderClass:_6.grid._InputSelectorHeaderBuilder,_contentBuilderClass:_6.grid._InputSelectorContentBuilder,postCreate:function(){this.inherited(arguments);this.connect(this.grid,"onSelectionChanged","onSelectionChanged");this.connect(this.grid,"updateRowCount","_updateVisibility");},renderHeader:function(){this.inherited(arguments);this._updateVisibility(this.grid.rowCount);},_updateVisibility:function(_1a){this.headerNode.style.visibility=_1a?"":"hidden";},onSelectionChanged:function(){if(this._selectionChanging){return;}var _1b=_4.query(".dojoxGridCheckSelector",this.headerNode)[0];var g=this.grid;var s=(g.rowCount&&g.rowCount==g.selection.getSelectedCount());g.allItemsSelected=s||false;_4.toggleClass(_1b,"dijitChecked",g.allItemsSelected);_4.toggleClass(_1b,"dijitCheckBoxChecked",g.allItemsSelected);}});})();}}};});