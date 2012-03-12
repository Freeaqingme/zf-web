/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.av.FLVideo"],["require","dijit._Widget"],["require","dojox.embed.Flash"],["require","dojox.av._Media"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.av.FLVideo"]){_4._hasResource["dojox.av.FLVideo"]=true;_4.provide("dojox.av.FLVideo");_4.experimental("dojox.av.FLVideo");_4.require("dijit._Widget");_4.require("dojox.embed.Flash");_4.require("dojox.av._Media");_4.declare("dojox.av.FLVideo",[_5._Widget,_6.av._Media],{_swfPath:_4.moduleUrl("dojox.av","resources/video.swf"),postCreate:function(){this._subs=[];this._cons=[];this.mediaUrl=this._normalizeUrl(this.mediaUrl);this.initialVolume=this._normalizeVolume(this.initialVolume);_4.global.swfIsInHTML=function(){return true;};var _7={path:this._swfPath.uri,width:"100%",height:"100%",minimumVersion:9,expressInstall:true,params:{allowFullScreen:true,wmode:"transparent"},vars:{videoUrl:this.mediaUrl,id:this.id,autoPlay:this.autoPlay,volume:this.initialVolume,isDebug:this.isDebug}};this._sub("stageClick","onClick");this._sub("stageSized","onSwfSized");this._sub("mediaStatus","onPlayerStatus");this._sub("mediaMeta","onMetaData");this._sub("mediaError","onError");this._sub("mediaStart","onStart");this._sub("mediaEnd","onEnd");this._flashObject=new _6.embed.Flash(_7,this.domNode);this._flashObject.onError=function(_8){console.error("Flash Error:",_8);};this._flashObject.onLoad=_4.hitch(this,function(_9){this.flashMedia=_9;this.isPlaying=this.autoPlay;this.isStopped=!this.autoPlay;this.onLoad(this.flashMedia);this._initStatus();this._update();});this.inherited(arguments);},play:function(_a){this.isPlaying=true;this.isStopped=false;this.flashMedia.doPlay(this._normalizeUrl(_a));},pause:function(){this.isPlaying=false;this.isStopped=false;this.flashMedia.pause();},seek:function(_b){this.flashMedia.seek(_b);},volume:function(_c){if(_c){if(!this.flashMedia){this.initialVolume=_c;}this.flashMedia.setVolume(this._normalizeVolume(_c));}if(!this.flashMedia||!this.flashMedia.doGetVolume){return this.initialVolume;}return this.flashMedia.getVolume();},_checkBuffer:function(_d,_e){if(this.percentDownloaded==100){if(this.isBuffering){this.onBuffer(false);this.flashMedia.doPlay();}return;}if(!this.isBuffering&&_e<0.1){this.onBuffer(true);this.flashMedia.pause();return;}var _f=this.percentDownloaded*0.01*this.duration;if(!this.isBuffering&&_d+this.minBufferTime*0.001>_f){this.onBuffer(true);this.flashMedia.pause();}else{if(this.isBuffering&&_d+this.bufferTime*0.001<=_f){this.onBuffer(false);this.flashMedia.doPlay();}}},_update:function(){var _10=Math.min(this.getTime()||0,this.duration);var _11=this.flashMedia.getLoaded();this.percentDownloaded=Math.ceil(_11.bytesLoaded/_11.bytesTotal*100);this.onDownloaded(this.percentDownloaded);this.onPosition(_10);if(this.duration){this._checkBuffer(_10,_11.buffer);}setTimeout(_4.hitch(this,"_update"),this.updateTime);}});}}};});