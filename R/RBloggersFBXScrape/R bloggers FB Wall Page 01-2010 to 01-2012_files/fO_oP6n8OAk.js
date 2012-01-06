/*1325568614,169776317*/

if (window.CavalryLogger) { CavalryLogger.start_js(["tB7Jl"]); }

function TypingDetector(a){this._input=a;this._ignoreKeys={};}TypingDetector.INACTIVE=0;TypingDetector.TYPING=1;TypingDetector.QUITTING=2;Class.mixin(TypingDetector,'Arbiter',{_timeout:7000,_currentState:TypingDetector.INACTIVE,init:function(){this.init=bagofholding;this.reset();Event.listen(this._input,'keyup',this._update.bind(this));onunloadRegister(this._onunload.bind(this));},reset:function(){clearTimeout(this._checkTimer);this._checkTimer=null;this._lastKeystrokeAt=null;this._currentState=TypingDetector.INACTIVE;},setIgnoreKeys:function(a){this._ignoreKeys=Object.from(a);},_onunload:function(){if(this._currentState==TypingDetector.TYPING)this._transition(TypingDetector.QUITTING);},_update:function(event){var a=Event.getKeyCode(event);var b=this._currentState;if(!this._ignoreKeys[a])if(Input.getValue(this._input).trim().length===0){if(b==TypingDetector.TYPING)this._transition(TypingDetector.INACTIVE);}else if(b==TypingDetector.TYPING){this._recordKeystroke();}else if(b==TypingDetector.INACTIVE){this._transition(TypingDetector.TYPING);this._recordKeystroke();}},_transition:function(a){this.reset();this._currentState=a;this.inform('change',a);},_recordKeystroke:function(){this._lastKeystrokeTime=Date.now();if(!this._checkTimer)this._checkTimer=this._checkTyping.bind(this).defer(this._timeout);},_checkTyping:function(){var a=this._lastKeystrokeTime+this._timeout;var b=Date.now();if(b>a){this._transition(TypingDetector.INACTIVE);}else{clearTimeout(this._checkTimer);this._checkTimer=this._checkTyping.bind(this).defer(a-b+10);}}});
__e("channel",["ChannelManager"],function(a,b){a.channel=a.channel||b('ChannelManager');},3);
__e("channel_manager",["ChannelManager"],function(a,b){a.channel_manager=a.channel_manager||b('ChannelManager');},3);
var Dock=window.Dock||copy_properties(new Arbiter(),{MIN_HEIGHT:140,INITIAL_FLYOUT_HEIGHT_OFFSET:10,init:function(a){this.init=bagofholding;this.rootEl=a;this.calculateViewportDimensions();this.calculateFlyoutHeightOffset();ChatQuietLinks.silence(this.rootEl);Event.listen(a,'click',this._onClick.bind(this));Event.listen(window,'resize',this._onWindowResize.bind(this));Toggler.subscribe(['show','hide'],function(e,d){var b=d.getActive();if(!DOM.contains(a,b))return;if(CSS.hasClass(b,'fbNub')){this.notifyNub(b,e);if(e==='show')this._resizeNubFlyout(b);}else{var c=Parent.byClass(b,'fbNubFlyout');if(c)CSS.conditionClass(c,'menuOpened',e==='show');}}.bind(this));this.inform('init',{},Arbiter.BEHAVIOR_PERSISTENT);},calculateViewportDimensions:function(){return (this.viewportDimensions=Vector2.getViewportDimensions());},calculateFlyoutHeightOffset:function(){this.flyoutHeightOffset=this.INITIAL_FLYOUT_HEIGHT_OFFSET+Vector2.getElementDimensions(this.rootEl).y;var a=ge('blueBar');if(a){var b=CSS.isFixed(a)?'viewport':'document';this.flyoutHeightOffset+=Vector2.getElementPosition(a,b).y+Vector2.getElementDimensions(a).y;}},toggle:function(b){var a=this._findFlyout(b);if(!a)return;this.subscribe('init',function(){Toggler.toggle(b);});},show:function(a){this.subscribe('init',function(){Toggler.show(a);});},showNub:function(a){CSS.show(a);},hide:function(a){this.subscribe('init',function(){var b=Toggler.getInstance(a);DOM.contains(a,b.getActive())&&b.hide();});},hideNub:function(a){CSS.hide(a);this.hide(a);},setUseMaxHeight:function(b,a){CSS.conditionClass(b,'maxHeight',a!==false);this._resizeNubFlyout(b);},_resizeNubFlyout:function(i){var e=this._findFlyout(i);if(!e||!(CSS.hasClass(i,'openToggler')||CSS.hasClass(i,'opened')))return;var j=DOM.find(e,'div.fbNubFlyoutOuter');var g=DOM.find(j,'div.fbNubFlyoutInner');var b=DOM.find(g,'div.fbNubFlyoutBody');CSS.setStyle(b,'height','auto');var l=Vector2.getElementPosition(e,'viewport');var d=Vector2.getElementDimensions(e);var a=Vector2.getElementDimensions(b);var c=Vector2.getElementDimensions(b.firstChild);var h=Math.max(this.MIN_HEIGHT,this.viewportDimensions.y-this.flyoutHeightOffset)-(this.viewportDimensions.y-l.y-d.y);CSS.setStyle(e,'max-height',h+'px');CSS.setStyle(j,'max-height',h+'px');d=Vector2.getElementDimensions(e);var m=Vector2.getElementDimensions(g);var k=m.y-a.y;if(d.y>k)CSS.setStyle(b,'height',(d.y-k)+'px');CSS.removeClass(e,'swapDirection');var f=Vector2.getElementPosition(e).x;CSS.conditionClass(e,'swapDirection',function(){if(f<0)return true;return (f+d.x>this.viewportDimensions.x);}.bind(this)());this.notifyNub(i,'resize');},resizeAllFlyouts:function(){var b=DOM.scry(this.rootEl,'div.fbNub.openToggler');b=b.concat(DOM.scry(this.rootEl,'div.fbNub.opened'));var a=b.length;while(a--)this._resizeNubFlyout(b[a]);},_onClick:function(event){var c=event.getTarget(),b=Parent.byClass(c,'fbNub');if(b){if(Parent.byClass(c,'fbNubFlyoutTitlebar')){var a=Parent.byTag(c,'a');if(!a||!a.rel){this.hide(b);return false;}}this.notifyNub(b,'click');}},_onWindowResize:function(event){this.calculateViewportDimensions();this.resizeAllFlyouts();},_findFlyout:function(a){return (flyoutEl=CSS.hasClass(a,'fbNubFlyout')?a:DOM.scry(a,'div.fbNubFlyout')[0]||null);},registerNubController:function(b,a){DataStore.set(b,'dock:nub:controller',a);a.subscribe('nub/button/content-changed',this.inform.shield(this,'resize',b));a.subscribe('nub/flyout/content-changed',this._resizeNubFlyout.shield(this,b));},unregisterNubController:function(a){DataStore.remove(a,'dock:nub:controller');},notifyNub:function(c,d,b){var a=DataStore.get(c,'dock:nub:controller');a&&a.inform(d,b);}});
function NubController(){}Class.mixin(NubController,'Arbiter',{init:function(a){this.el=a;Dock.registerNubController(a,this);return this;},buttonContentChanged:function(){this.inform('nub/button/content-changed');},flyoutContentChanged:function(){this.inform('nub/flyout/content-changed');},hide:function(){Dock.hide(this.el);},show:function(){Dock.show(this.el);}});
function SidebarTicker(){}SidebarTicker.prototype={ALMOST_ZERO:1e-07,init:function(){this._ticker=$('pagelet_ticker');this._initSubscriptions();CSS.addClass(document.documentElement,'ticker');if(CSS.hasClass(document.documentElement,'sidebarMode'))this._onSidebarShow();return this;},initResizeBehavior:function(c){var i=this._ticker;var e=i.parentNode;var d=this._saveResizedState.bind(this);var a=this.ALMOST_ZERO;var h;var j;var f;var g=function(l,event){h=event.clientY;j=i.offsetHeight;f=e.offsetHeight;};var k=function(n,event){var l=j+(event.clientY-h);var m=100-(((f-l)/f)*100);m=Math.max(a,Math.min(90,m));i.style.height=m+'%';if(n=='end'){d(m);Arbiter.inform('Ticker/resized');}window.ChatSidebar&&ChatSidebar.resize();};var b=new SimpleDrag(c);b.subscribe('start',g);b.subscribe(['update','end'],k);},_saveResizedState:function(a){new AsyncRequest('/ajax/feed/ticker/resize').setData({height:''+a}).setMethod('POST').send();},_initSubscriptions:function(){this._subscriptions=[Arbiter.subscribe('sidebar/show',this._onSidebarShow.bind(this))];},_onSidebarShow:function(){TickerController.show(this._ticker);}};
function is_rtl(c){for(var b=0;b<c.length;b++){var a=c.charCodeAt(b);if(a>=48)return a>=1470&&a<=1920;}return false;}
var Emote={_initialized:false,_imageBase:null,_emoteMap:null,_emoteOrderMap:null,_fbidEmoticonPattern:'\\[\\[[A-Za-z0-9\\.]+\\]\\]',_fbidEmoticonRegex:null,_imageURLs:null,_regex:null,_init:function(){var f=Env.static_base;Emote._imageBase=f+'images/emote/';Emote._blankImgSrc=f+'images/blank.gif';var a=['smile','frown','tongue','grin','gasp','wink','glasses','sunglasses','grumpy','unsure','cry','devil','angel','kiss','heart','kiki','squint','confused','upset','pacman','colonthree','like'];Emote._emoteMap={':-)':['\\:\\-\\)','smile'],':)':['\\:\\)','smile'],':]':['\\:\\]','smile'],'=)':['=\\)','smile'],':-(':['\\:\\-\\(','frown'],':(':['\\:\\(','frown'],':[':['\\:\\[','frown'],'=(':['=\\(','frown'],':-P':['\\:\\-P','tongue'],':P':['\\:P','tongue'],':-p':['\\:\\-p','tongue'],':p':['\\:p','tongue'],'=P':['=P','tongue'],':-D':['\\:\\-D','grin'],':D':['\\:D','grin'],'=D':['=D','grin'],':-O':['\\:\\-O','gasp'],':O':['\\:O','gasp'],':-o':['\\:\\-o','gasp'],':o':['\\:o','gasp'],';-)':['\\;\\-\\)','wink'],';)':['\\;\\)','wink'],'8-)':['8\\-\\)','glasses'],'8)':['8\\)','glasses'],'B-)':['B\\-\\)','glasses'],'B)':['B\\)','glasses'],'8-|':['8\\-\\|','sunglasses'],'8|':['8\\|','sunglasses'],'B-|':['B\\-\\|','sunglasses'],'B|':['B\\|','sunglasses'],'>:(':['>\\:\\(','grumpy'],'>:-(':['>\\:\\-\\(','grumpy'],':/':['\\:/','unsure'],':-/':['\\:\\-/','unsure'],':\\':['\\:\\\\','unsure'],':-\\':['\\:\\-\\\\','unsure'],":'(":["\\:'\\(",'cry'],'3:)':['3\\:\\)','devil'],'3:-)':['3\\:\\-\\)','devil'],'O:)':['O\\:\\)','angel'],'O:-)':['O\\:\\-\\)','angel'],':-*':['\\:\\-\\*','kiss'],':*':['\\:\\*','kiss'],'<3':['<3','heart'],'&lt;3':['&lt\\;3','heart'],'\u2665':['\u2665','heart'],'^_^':['\\^_\\^','kiki'],'-_-':['\\-_\\-','squint'],'o.O':['o\\.O','confused'],'O.o':['O\\.o','confused'],'>:O':['>\\:O','upset'],'>:-O':['>\\:\\-O','upset'],'>:o':['>\\:o','upset'],'>:-o':['>\\:\\-o','upset'],'>_<':['>_<','upset'],'>.<':['>\\.<','upset'],':v':['\\:v','pacman'],':|]':['\\:\\|\\]','robot'],':3':['\\:3','colonthree'],'<(")':['<\\(\\"\\)','penguin'],':putnam:':['\\:putnam\\:','putnam'],'(^^^)':['\\(\\^\\^\\^\\)','shark'],':42:':['\\:42\\:','42'],'(y)':['\\(y\\)','like'],'(Y)':['\\(Y\\)','like']};var d=[];if(Env.fbid_emoticons){Emote._fbidEmoticonRegex=new RegExp(Emote._fbidEmoticonPattern);d.push(Emote._fbidEmoticonPattern);}for(var c in Emote._emoteMap)d.push(Emote._emoteMap[c][0]);var e='(?:^|\\s|\'|"|\\.)('+d.join('|')+')(?:\\s|\'|"|\\.|,|!|\\?|<br>|$)';Emote._regex=new RegExp(e);Emote._emoteOrderMap={};for(var b=0;b<a.length;b++)Emote._emoteOrderMap[a[b]]=b;Emote._initialized=true;},htmlEmote:function(k,m){if(typeof m!='function')m=htmlize;if(!Emote._initialized)Emote._init();var j=0;var l=k;var i=[];while(true){var e=Emote._regex.exec(l);if(!e||!e.length)break;var b=e[1];var c=l.indexOf(b);var d='';var h='';if(Emote._fbidEmoticonRegex&&Emote._fbidEmoticonRegex.test(b)){h=b.substr(2,b.length-4);d='fbid';}else d=Emote._emoteMap[b][1];var a=l.substring(0,c);if(a)i.push(m(a));i.push('<span class="emote_text">');i.push(b);i.push('</span>');var f;if(d=='fbid'){if(Env.fbid_emoticons){i.push('<img class="emote_custom" src="');i.push(location.protocol);i.push("//graph.facebook.com/");i.push(htmlspecialchars(h));i.push('/picture" title="');i.push(b);i.push('" />');}}else if(typeof(f=Emote._emoteOrderMap[d])=='undefined'){i.push('<img class="emote_custom" src="');i.push(Emote._imageBase);i.push(d);i.push('.gif" title="');i.push(b);i.push('" />');}else{var g=f*-16;i.push('<img class="emote_img" src="');i.push(Emote._blankImgSrc);i.push('" style="background-position: ');i.push(g);i.push('px 0px" title="');i.push(b);i.push('" />');}l=l.substring(c+b.length);}if(l)i.push(m(l));return i.join('');}};
add_properties('Messaging',{getUserThreadURI:function(a){return URI(Env.www_base).setPath('/messages/'+a);},getInboxThreadURI:function(a){return URI(Env.www_base).setPath('/messages/?action=read&tid='+a);},markAsRead:function(a){a=$A(a);new AsyncRequest().setURI('/ajax/messaging/async.php').setData({action:'markRead',tids:a}).setMethod('POST').setHandler(bagofholding).setErrorHandler(bagofholding).send();MessagingEvents.inform('mark-as-read',{tids:a});},markUserThreadAsRead:function(a){new AsyncRequest().setURI('/ajax/messaging/async.php').setData({action:'chatMarkRead',other_user:a}).setMethod('POST').setHandler(bagofholding).setErrorHandler(bagofholding).send();MessagingEvents.inform('mark-as-read',{chat_ids:[a]});},unsubscribeFromThread:function(a){new AsyncRequest().setURI('/ajax/messaging/async.php').setData({action:'unsubscribe',tids:a}).setMethod('POST').setHandler(bagofholding).setErrorHandler(bagofholding).send();},emoteContent:function(b,c){for(var a=0;a<b.length;a++)this._emoteNode(b[a],c);},_emoteNode:function(f,h){if(!DOM.isTextNode(f)){var a=$A(f.childNodes);for(var d=0;d<a.length;d++)this._emoteNode(a[d],h);return;}var g=f.nodeValue;if(h)g=f.nodeValue.replace(/\n/g," ");var b=Emote.htmlEmote(g);if(!b||b==f.nodeValue)return;var c=HTML(b).getNodes();if(!c||!c.length)return;for(var e=c.length;e--;)DOM.insertAfter(f,c[e]);DOM.remove(f);}});
var MusicLogger=(function(){var a=5000;var c=null;var b={};function d(){c=null;if(count(b)>0)new AsyncRequest().setURI('/ajax/music/log.php').setData({types:JSON.stringify(b)}).send();b={};}return {PLATFORM:'platform',STATUS_EVENT_VIA:'status_event',BUMP_KEY:'bump_key',log:function(f,e){b[f]=b[f]||[];b[f].push(e);if(!c)c=d.defer(a,false);}};})();
var Music={providers:{},queuedCommand:null,lastStatus:{},_searching:{},lastProviderPlaying:null,init:function(a,c){for(var b in a){this.providers[b]=copy_properties(this.providers[b]||{offline:true},a[b]);var d=this.getRemoteClass(b);d.setTokens(this.providers[b].tokens);c&&d.reconnect();}this.listenForScrobble();return this;},persistSearchingFor:function(c,b){this._searching[c]=true;var a;if(this.providers[c])a=this.getRemoteClass(c);a&&a.persistSearchingFor&&a.persistSearchingFor(b);return this;},getRemoteClass:function(a){if(!this.providers[a])return null;if(!this.providers[a].instance)switch(a){case MusicProviders.SPOTIFY:if(window.SpotifyRemote){var c=new SpotifyRemote();c.init(this._receiveUpdate.bind(this,a),this.providers[a]);this.providers[a].instance=c;}break;default:if(window.WebBridgeRemote){var b=new WebBridgeRemote(this._receiveUpdate.bind(this,a),a,this.providers[a]);this.providers[a].instance=b;}break;}return this.providers[a].instance;},listenForScrobble:function(){Arbiter.subscribe(PresenceMessage.getArbiterMessageType('music_scrobbling'),function(b,a){if(a.obj.provider_name){a.obj.provider_data&&this.init(a.obj.provider_data);this._resetQueuedCommand(a.obj.provider_name);this.goOnline(a.obj.provider_name);}}.bind(this));this.listenForScrobble=bagofholding;},setTokens:function(a,b){this.getRemoteClass(a).setTokens(b);return this;},goOnline:function(b){var c=(b in this.providers);if(this._isOffline(b)){var a=this.isManualPlay(b);var d=c&&this.getRemoteClass(b);d&&d.attemptGoOnline(a);if(!this._searching[b]&&a&&(!d||!d.serviceRunning())){this.persistSearchingFor(b,60);this.launchPlayNowDialog(b,this.queuedCommand.data);}}return this;},goOffline:function(c,a,b){if(this.providers[c]){this._resetQueuedCommand(c);this._searching[c]=null;this.getRemoteClass(c).goOffline();}return this;},allProvidersOffline:function(){for(var a in this.providers)if(!this._isOffline(a))return false;return true;},allProvidersPaused:function(){for(var b in this.providers){var a=this._getLastStatus(b);if(a&&a.playing)return false;}return true;},playPauseSongList:function(b,e,c,d,a){copy_properties(a||{},{song_list:c,title:d||''});return this.playPauseSong(b,e,a);},playOrResumeSongList:function(b,g,e,f,a,d){copy_properties(a||{},{song_list:e,title:f||''});var c=this.providers[b];if(d){this.resume(b,g,a);}else this.playSong(b,g,a);return c&&this.getRemoteClass(b).serviceRunning();},playPauseSong:function(f,h,a){if(!f)f=this.lastProviderPlaying;if(a.ego_data){new AsyncRequest('/ajax/music/ego_log.php').setData({ego_data:a.ego_data}).send();delete a.ego_data;}var g=this.providers[f];var b=g?this._getLastStatus(f):{};var d=b.track&&MusicConstants.sameURLs(h,b.track.uri);var c=b.context&&MusicConstants.sameURLs(h,b.context.uri);var e=d||c;if(b.playing&&e){this.pause(f,h,a);}else if(e){this.resume(f,h,a);}else this.playSong(f,h,a);return g&&this.getRemoteClass(f).serviceRunning();},pauseOtherProviders:function(a){for(var b in this.providers)if(b!=a&&!this._isOffline(b))this.pause(b);},launchProviderOrPlay:function(e,h,d,b,f,g){if(f){if(window.MusicDiagnostics)this._diagLogAction(f,MusicDiagnostics.SWITCHED_PROVIDER);this.goOffline(f);}if(!this._isOffline(e)){this.playSong(e,h,d);var a=Dialog.getCurrent();a&&a.hide();}else if(e==MusicProviders.SPOTIFY){this.persistSearchingFor(e,60);if(window.MusicDiagnostics)this._diagLogAction(e,MusicDiagnostics.ATTEMPTING_LAUNCH,d);this.launchPlayNowDialog(e,copy_properties({uri:h},d),true);}else{!f&&MusicLogger.log(MusicLogger.BUMP_KEY,{provider:e,step:4,status:'okay'});var c={};c[e]=b;this.init(c);this.launchBridgeProvider(e,h,d,g);this.playSongSafeQueue(e,h,d);}},launchBridgeProvider:function(d,f,c,e){if(!this._isOffline(d)){var a=Dialog.getCurrent();a&&a.hide();return;}this.persistSearchingFor(d,60);var b=Music._getExternalContextData(c);this.getRemoteClass(d).launch(f,b,e);},launchPlayNowDialog:function(d,b,e){if(e)this.queuedCommand={provider:d,op:MusicConstants.OP.PLAY,data:b};var a=copy_properties({},b);var f={url:a.uri||a.url,context:a,listen_to:a.listen_to||null,button_id:a.button_id||null};delete f.context.uri;delete f.context.url;delete f.context.listen_to;delete f.context.button_id;if(this.providers[d]){this.getRemoteClass(d).launchPlayNowDialog(f);}else{var c;if(d===MusicProviders.SPOTIFY){c='/ajax/music/spotify_play_now.php?init_only';}else c='/ajax/music/web_bridge_play_now.php?init_only';Dialog.bootstrap(c,f,null,null,null,ge(a.button_id));}},playSongSafeQueue:function(b,c,a){if(!this._isOffline(b)||!this.queuedCommand||this.queuedCommand.provider!==b){this.playSong(b,c,a);}else this.providers[b]&&this.goOnline(b);},playSong:function(b,d,a,c){a=copy_properties(a||{},{uri:d});if(c&&c.id&&!a.button_id)a.button_id=c.id;this._sendOP(b,MusicConstants.OP.PLAY,a);},pause:function(b,c,a){a=copy_properties(a||{},{uri:c||null});this._sendOP(b,MusicConstants.OP.PAUSE,a);},resume:function(b,c,a){a=copy_properties(a||{},{uri:c});this._sendOP(b,MusicConstants.OP.RESUME,a);},queueLiveListenSession:function(a,b){if(!this._isOffline(b)){MusicLiveListen.getInstance().handleQueuedSession(a);return;}this.queuedCommand={op:MusicConstants.LIVE_LISTEN_OP.QUEUE_SESSION,provider:b,data:a};},reInform:function(d){var b=[];for(var a=0;a<d.length;a++){var c=d[a];if(this.providers[c]&&!this._isOffline(c))if(c==this.lastProviderPlaying){b.push(c);}else b.unshift(c);}for(var a=0;a<b.length;a++){var c=b[a];this._receive_STATUS_CHANGE_OP(c,MusicConstants.STATUS_CHANGE_OP.REINFORM,this.lastStatus[c],{});}return this;},isManualPlay:function(a){return !!(this.queuedCommand&&this.queuedCommand.provider===a);},isPlaying:function(b,c){var a=this.getLastStatus(b);return a.playing&&a.track&&(!c||MusicConstants.sameURLs(a.track.uri,c));},getLastStatus:function(a){var b=this.providers[a];return b?this._getLastStatus(a):{};},_resetQueuedCommand:function(a){if(!a||this.queuedCommand&&this.queuedCommand.provider==a)this.queuedCommand=null;},_receiveUpdate:function(d,c,a){if(a){a.provider=d;}else a={provider:d};var b=bagofholding;if(MusicConstants.DIAGNOSTIC_EVENT[c]){b=this._receiveDIAG_EVENT;}else if(MusicConstants.STATUS_CHANGE_OP[c]){b=this._receive_STATUS_CHANGE_OP;}else !MusicConstants.OP[c];b.call(this,d,c,a);},_receiveDIAG_EVENT:function(d,c,a){var b=MusicConstants.DIAGNOSTIC_EVENT;if(c===b.ONLINE){this._setOffline(d,false);if(this.queuedCommand&&this.queuedCommand.provider==d)this._replayQueuedCommand.bind(this,this.queuedCommand.provider,this.queuedCommand.op,this.queuedCommand.data).defer();this._resetQueuedCommand();}else if(c===b.IFRAME_POLLING){this._setLastStatus(d,{});}else if(c===b.RELAUNCH&&a.last_sent)this.launchPlayNowDialog(d,a.last_sent,true);MusicEvents.inform(b[c],a);if(c===b.OFFLINE){this._setOffline(d,true);this._setLastStatus(d,{});if(this.allProvidersOffline())MusicEvents.inform(MusicConstants.DIAGNOSTIC_EVENT.ALL_OFFLINE);}},_receive_STATUS_CHANGE_OP:function(e,c,a,b){b=b||this._getLastStatus(e);var d;for(d in b)if(typeof a[d]==='undefined')a[d]=null;var g;var f={};this._setLastStatus(e,a);for(d in a){g=MusicConstants.STATUS_CHANGE_EVENT[d];if(g)if(!f[g]&&!are_equal(b[d],a[d])){if(c!==MusicConstants.STATUS_CHANGE_OP.REINFORM)this._logMusicOP(e,g,a);if(a.playing){if(this.lastProviderPlaying!=e)this.pauseOtherProviders(e);this.lastProviderPlaying=e;}else if(this.allProvidersPaused())MusicEvents.inform(MusicConstants.DIAGNOSTIC_EVENT.ALL_PAUSED);MusicEvents.inform(g,a);f[g]=1;}}},_replayQueuedCommand:function(c,b,a){if(b===MusicConstants.OP.PLAY&&this.isPlaying(c,a.uri))return;if(b===MusicConstants.LIVE_LISTEN_OP.QUEUE_SESSION){MusicLiveListen.getInstance().handleQueuedSession(a);return;}this._sendOP(c,b,a,true);},_sendOP:function(d,c,a,e){var b=window.MusicDiagnostics&&c===MusicConstants.OP.PLAY;if(!this.providers[d]||this._isOffline(d)){if(!a._never_queue)this.queuedCommand={op:c,data:a,provider:d};b&&this._diagLogAction(d,MusicDiagnostics.ATTEMPTING_LAUNCH,a);this.goOnline(d);return;}else if(!e&&b)this._diagLogAction(d,MusicDiagnostics.LAUNCH_NOT_NEEDED);this._logMusicOP(d,c,a);var f=this._getExternalContextData(a);b&&this._diagLogAction(d,MusicDiagnostics.PLAY_SONG,a);this.getRemoteClass(d).send(c,f);},_getExternalContextData:function(b){var a={};for(var c in b)if(MusicConstants.ALLOWED_EXTERNAL_CONTEXT_PARAMS[c])a[c]=b[c];return a;},_logMusicOP:function(c,b,a){if(b===MusicConstants.OP.PLAY||b===MusicConstants.STATUS_CHANGE_EVENT.playing||b===MusicConstants.STATUS_CHANGE_EVENT.track)MusicLogger.log(MusicLogger.STATUS_EVENT_VIA,{op:b,provider:c,data:a});},_isOffline:function(a){if(!this.providers[a])return true;return this.providers[a].offline;},_setOffline:function(c,a){if(!this.providers[c])return this;this._searching[c]=null;this.providers[c].offline=a;if(!a&&!this.lastProviderPlaying){this.lastProviderPlaying=c;}else if(a&&this.lastProviderPlaying==c){this.lastProviderPlaying=null;for(var b in this.providers)if(this.isPlaying(b)){this.lastProviderPlaying=b;break;}else if(!this._isOffline(b))this.lastProviderPlaying=b;}return this;},_getLastStatus:function(a){if(!this.providers[a])return {};return this.lastStatus[a]||{};},_setLastStatus:function(a,b){if(!this.providers[a])return this;this.lastStatus[a]=b;return this;},_diagLogAction:function(c,a,b){if(window.MusicDiagnostics)MusicDiagnostics.userAction.curry(c,a,b).defer();}};
(function(){window.MusicLiveListen=function(){MusicLiveListen._instance=this;this._listeningWith=false;MusicEvents.subscribe([MusicConstants.DIAGNOSTIC_EVENT.SERVICE_ERROR,MusicConstants.DIAGNOSTIC_EVENT.ONLINE,MusicConstants.DIAGNOSTIC_EVENT.OFFLINE,MusicConstants.STATUS_CHANGE_EVENT.track,MusicConstants.STATUS_CHANGE_EVENT.playing],this._onlineStatusChange.bind(this));Arbiter.subscribe(['chat-display/loaded'],this._chatDisplayLoaded.bind(this));Arbiter.subscribe(['live_listen_chat/go_offline'],this._checkGoOffline.bind(this));};copy_properties(MusicLiveListen,{_instance:null,REASONABLE_SYNC_LATENCY:20,END_OF_SONG_WINDOW:10,MAX_PLAY_REQUESTS_TRIES:5,MIN_PLAY_REQUEST_RETRY_TIME:10000,SONG_UPDATE:'song_update',BEGIN_SESSION:'begin_session',END_SESSION:'end_session',LISTENER_ADD:'listener_add',LISTENER_REMOVE:'listener_remove',getInstance:function(){if(MusicLiveListen._instance)return MusicLiveListen._instance;return new MusicLiveListen();}});copy_properties(MusicLiveListen.prototype,{_session:null,_listeningWith:false,_queuedSong:null,_queuedSongRetryCount:0,_timeSkew:null,_currentSong:null,_newSessionActor:null,_hasUserMessages:false,_playRequestTimer:null,_lastTrackStatusChange:null,_chatDisplay:null,_jslog:JSLogger.create('music_live_listen'),_offlineConfirmed:false,getCurrentSession:function(){return this._session;},handleQueuedSession:function(a){if(this._privateListeningIsEnabled(a.provider)){Music.getRemoteClass(a.provider).send(MusicConstants.STATUS_CHANGE_OP.STATUS);setTimeout(function(e){var d=this._privateListeningIsEnabled(e.provider);if(d){var c=copy_properties({listen_to:e.listen_to},d);var b=new AsyncRequest().setData(c).setMethod('POST').setURI('/ajax/music/live_listen_private_listening_dialog.php').setErrorHandler(bagofholding);new Dialog().setAsync(b).show();return;}this.handleQueuedSession(e);}.bind(this,a),3000);return;}this._jslog.log('queued_session',a);new AsyncRequest().setURI('/ajax/music/live_listen.php').setData(a).setHandler(bagofholding).setAllowCrossPageTransition(true).send();},handlePrimerResponse:function(a){this._jslog.log('session_started',a);this._handleNewSession(a,true);},handleOnloadSession:function(a){this._handleNewSession(a,false,false);},handleUpdate:function(a){this._jslog.debug('handle_update',a);if(a.session&&(!this._session||this._session.session_id==a.session.session_id))this._hasUserMessages=a.session.has_user_messages;switch(a.action){case MusicLiveListen.SONG_UPDATE:if(!this._listeningWith)break;if(!this._session||(a.session.session_id!=this._session.session_id)){this._handleNewSession(a,false,true);break;}this._handleSongUpdate(a.song);break;case MusicLiveListen.BEGIN_SESSION:this._handleNewSession(a,false,true);break;case MusicLiveListen.END_SESSION:if(this._session&&a.session.session_id==this._session.session_id)this._handleEndSession((a.sender_uid&&a.session.user_id==a.sender_uid));break;case MusicLiveListen.LISTENER_ADD:case MusicLiveListen.LISTENER_REMOVE:if(this._session&&a.session.session_id==this._session.session_id)this._session=a.session;MusicEvents.inform(MusicConstants.LIVE_LISTEN_OP.LISTENER_UPDATE,a,Arbiter.BEHAVIOR_PERSISTENT);MusicEvents.inform(MusicConstants.LIVE_LISTEN_OP.SESSION_UPDATED,a.session,Arbiter.BEHAVIOR_STATE);break;}},isLeader:function(){return this._listeningWith&&this._session.is_leader;},_handleNewSession:function(c,a){if(this._session&&this._session.session_id==c.session.session_id)return;this._jslog.debug('handle_new_session',{payload:c,force_play:a});if(c.providers)Music.init(c.providers);this._timeSkew=Date.now()-c.session.server_time;this._session=c.session;this._currentSong=null;this._queuedSong=null;this._queuedSongRetryCount=0;this._offlineConfirmed=false;if(c.actor)this._newSessionActor=c.actor;var b=null;if(c.listen_to)b=c.listen_to;this._setListeningWith(true,this._session.is_leader,b);Music.goOnline(this._session.provider);c.song&&this._handleSongUpdate(c.song,a);this._initLiveListenChat();MusicEvents.inform(MusicConstants.LIVE_LISTEN_OP.SESSION_UPDATED,this._session,Arbiter.BEHAVIOR_STATE);},_getServerTime:function(){var a=Date.now();return this._timeSkew?a-this._timeSkew:a;},_privateListeningIsEnabled:function(b){if(b!==MusicProviders.SPOTIFY)return false;var a=Music.getLastStatus(b);if(!is_empty(a)&&a.open_graph_state&&(a.open_graph_state.posting_disabled||a.open_graph_state.private_session))return {posting_disabled:a.open_graph_state.posting_disabled,private_session:a.open_graph_state.private_session};return false;},_onlineStatusChange:function(c,b){if(!b||(this._session&&this._session.provider&&b.provider&&this._session.provider!=b.provider))return;switch(c){case MusicConstants.DIAGNOSTIC_EVENT.OFFLINE:if(this._listeningWith&&!this.isLeader())this._jslog.debug('offline_unsubscribe',this._session);break;case MusicConstants.DIAGNOSTIC_EVENT.ONLINE:case MusicConstants.STATUS_CHANGE_EVENT.track:case MusicConstants.STATUS_CHANGE_EVENT.playing:this._handleTrackStatusChange();break;case MusicConstants.DIAGNOSTIC_EVENT.SERVICE_ERROR:if(!this._queuedSong){if(this._session)return false;break;}if(b.code&&MusicConstants.ERROR[b.code]==='AUDIO_AD_PLAYING')break;var a=this._queuedSong;if(!b.song)b.song=a.url;this._queuedSong=null;this._queuedSongRetryCount=0;new AsyncRequest().setURI('/ajax/music/live_listen_play_error.php').setData(b).setHandler(function(d,f){if(!this._session)return;var e=f.payload;MusicEvents.inform(MusicConstants.LIVE_LISTEN_OP.PLAY_ERROR,{title:e.title,body:e.body,session:this._session,song:d},Arbiter.BEHAVIOR_PERSISTENT);}.bind(this,a)).setAllowCrossPageTransition(true).send();Music.pause(this._session.provider);return false;}},_handleTrackStatusChange:function(){if(this._session)this._setListeningWith(true,this.isLeader());if(this._listeningWith&&this._queuedSong){var a=Music.getLastStatus(this._session.provider);if(!is_empty(a)){if(a.track&&a.track.track_type&&a.track.track_type=='ad'){this._jslog.log('ad_playing',{session:this._session,last_status:a});return;}this._queuedSongRetryCount++;if(this._queuedSongRetryCount>MusicLiveListen.MAX_PLAY_REQUESTS_TRIES){this._queuedSong=null;this._queuedSongRetryCount=0;}else{this._jslog.debug('queued_song_update',{_queuedSong:this._queuedSong,session:this._session});this._handleSongUpdate(this._queuedSong);}}}},_chatDisplayLoaded:function(b,a){this._chatDisplay=a?a:null;if(this._chatDisplay)this._initLiveListenChat();},_initLiveListenChat:function(){if(this._session&&!this._session.chat_enabled)return;if(Chat.isOnline()){if(this._chatDisplay&&this._session){var a=Chat.getActiveChats();for(var b=0;b<a.length;b++)if(a[b]==this._session.session_id)return;this._jslog.log('chat_already_online',this._session);this._chatDisplay.loadTab(this._session.session_id,HTML(this._session.chat_name),HTML(this._session.chat_name),'livelisten');}}else if(!this.isLeader()){this._jslog.log('chat_going_online',this._session);Chat.goOnline(this._initLiveListenChat.bind(this));}else this._jslog.log('no_chat',this._session);},endSession:function(a){if(!this._session)return;new AsyncRequest().setURI('/ajax/music/live_listen_unsubscribe.php').setData({session_id:this._session.session_id}).setHandler(bagofholding).setAllowCrossPageTransition(true).send();this._handleEndSession(a);if(this.isLeader()){this._jslog.log('leader_unsubscribe',this._session);}else{Music.pause(this._session.provider);this._jslog.log('listener_unsubscribe',this._session);}},closeDialogAndGoOffline:function(){Dialog.getCurrent()&&Dialog.getCurrent().hide();this._jslog.debug('go_offline_leader');this._offlineConfirmed=true;require.ensure(['ChatVisibility'],function(a){a.goOffline(function(){var b=MusicLiveListen.getInstance();var c=b.getCurrentSession();if(c){if(b.isLeader()){b._jslog.log('go_offline_leader',c);}else b._jslog.log('go_offline_listener',c);b.endSession(true);}});});},_handleEndSession:function(b){if(!this._session)return;this._jslog.log('listener_unsubscribe',{session:this._session,user_initiated:b});var a=this._chatDisplay&&this._chatDisplay.tabs[this._session.session_id];if(a&&((this.isLeader()&&!a.focused&&!this._hasUserMessages)||b))this._chatDisplay.closeTab(this._session.session_id);this._setListeningWith(false);this._session=null;this._currentSong=null;this._queuedSong=null;this._newSessionActor=null;this._queuedSongRetryCount=0;this._hasUserMessages=false;this._playRequestTimer&&clearTimeout(this._playRequestTimer);this._playRequestTimer=null;this._lastTrackStatusChange=null;},_checkGoOffline:function(){if(this._offlineConfirmed||!this.getCurrentSession()||!this.getCurrentSession().chat_enabled||!this.getCurrentSession().current_count||this.getCurrentSession().current_count<2){this._jslog.debug('check_go_offline',true);return true;}var a=new AsyncRequest().setURI('/ajax/music/live_listen_go_offline.php').setData({live_listen_id:this._session.session_id}).setAllowCrossPageTransition(true);new Dialog().setAsync(a).show();this._jslog.log('check_go_offline',false);return false;},_goOfflineLeader:function(){this._jslog.debug('go_offline_leader');this._offlineConfirmed=true;require.ensure(['ChatVisibility'],function(a){a.goOffline(function(){MusicLiveListen.getInstance()._endLeaderSession();});});},_goOfflineListener:function(){this._jslog.debug('go_offline_listener');this._offlineConfirmed=true;require.ensure(['ChatVisibility'],function(a){a.goOffline(function(){MusicLiveListen.getInstance()._endListenerSession();});});},_handleSongUpdate:function(n,d){var g={song:n,force_play:d,session:this._session};this._jslog.debug('song_update',g);if(this.isLeader()){MusicEvents.inform(MusicConstants.LIVE_LISTEN_OP.SONG_PLAYING,{song:n,session:this._session},Arbiter.BEHAVIOR_PERSISTENT);return;}if(n.force_play){d=true;}else if(d)n.force_play=true;if((this._currentSong&&(n.created<this._currentSong.created))||(this._queuedSong&&(n.created<this._queuedSong.created)))return;if(this._queuedSong&&this._queuedSong.url!=n.url){this._queuedSongRetryCount=0;this._lastTrackStatusChange=null;}this._queuedSong=n;if(!d&&is_empty(Music.getLastStatus(this._session.provider))){this._jslog.debug('music_go_online',{msg:'no provider status yet'});Music.goOnline(n.provider);return;}var l=(n.request_id?n.request_id:n.expires);var c=false;var o=this._getServerTime();var i=(n.duration-(n.expires-Math.ceil(o/1000)));if(i<MusicLiveListen.REASONABLE_SYNC_LATENCY)i=0;g.offset=i;this._jslog.debug('song_update',g);if(!d&&i>=(n.duration-MusicLiveListen.END_OF_SONG_WINDOW)){this._jslog.log('song_expired',g);if(Music.isPlaying(this._session.provider,n.url)){this._jslog.log('song_expired_pausing',g);this._setCurrentSong(n);Music.pause(this._session.provider,n.url,{request_id:l});}return;}else if(Music.isPlaying(this._session.provider,n.url)){var b=this._currentSong;this._setCurrentSong(n);var e=Music.getLastStatus(this._session.provider);var a=n.duration-e.expires_in;a=a<0?0:a;g.current_offset=a;this._jslog.debug('song_update',g);var f=MusicLiveListen.REASONABLE_SYNC_LATENCY;var j=(i-f<0)?0:i-f;if(a&&(a<i+f&&a>=j)&&(b&&b.url==n.url&&b.expires>n.expires)){this._jslog.debug('song_update',{msg:'pausing song due to newer edge'});Music.pause(this._session.provider,n.url,{request_id:l});return;}else return;}if(window.MusicDiagnostics){var h={url:n.url,offset:i};MusicDiagnostics.userAction.curry(n.provider,MusicDiagnostics.LIVE_LISTEN_PLAY,h).defer();}if(!this._lastTrackStatusChange||(Date.now()>=(this._lastTrackStatusChange+MusicLiveListen.MIN_PLAY_REQUEST_RETRY_TIME))){this._lastTrackStatusChange=Date.now();}else{if(!this._playRequestTimer)this._playRequestTimer=setTimeout(this._handleTrackStatusChange.bind(this),MusicLiveListen.MIN_PLAY_REQUEST_RETRY_TIME);return;}this._playRequestTimer&&clearTimeout(this._playRequestTimer);this._playRequestTimer=null;var k={offset:i,_never_queue:true,request_id:l,listen_with_friends:this._session.session_id};g.play_data=k;this._jslog.debug('song_update',g);var m=n.is_update;if(Music.playOrResumeSongList(n.provider,n.url,[n.url],(this._session.spotify_title||''),k,m)){this._setListeningWith(true,this.isLeader());MusicEvents.inform(MusicConstants.LIVE_LISTEN_OP.SONG_PLAYING,{song:n,session:this._session},Arbiter.BEHAVIOR_PERSISTENT);}else if(!d){this._jslog.log('provider_go_online',g);Music.goOnline(n.provider);}else{this._jslog.log('play_now_dialog',g);Music.persistSearchingFor(n.provider,600);Music.launchPlayNowDialog(n.provider,{uri:n.url},false);}},_setCurrentSong:function(a){if(this._queuedSong.url==a.url){this._currentSong=a;this._queuedSong=null;this._queuedSongRetryCount=0;this._playRequestTimer&&clearTimeout(this._playRequestTimer);this._playRequestTimer=null;}},_setListeningWith:function(c,b,d){var a=this._session?{session:this._session}:{};if(d)a.listen_to=d;if(c&&this._newSessionActor)a.actor=this._newSessionActor;this._listeningWith=c;if(c){if(b){MusicEvents.inform(MusicConstants.LIVE_LISTEN_OP.NOW_LEADING,a,Arbiter.BEHAVIOR_STATE);}else MusicEvents.inform(MusicConstants.LIVE_LISTEN_OP.NOW_LISTENING,a,Arbiter.BEHAVIOR_STATE);}else MusicEvents.inform(MusicConstants.LIVE_LISTEN_OP.END_SESSION,a,Arbiter.BEHAVIOR_STATE);}});})();
__e("StickyArea",["event-extensions","ContextualLayer","css","DataStore","dom","vector"],function(i,k,j,h){k('event-extensions');var b=k('ContextualLayer');var a=k('css');var d=k('DataStore');var c=k('dom');var g=k('vector');function e(m){var l=a.getScrollParent(m.parentNode);this.node=m;this._extracted=false;this._placeholder=c.$N('div',{className:'uiStickyAreaPlaceholder'});f.getInstance(l).register(this);}e.fromJSON=function(l){return new e(l.root);};e.prototype={update:function(){if(this._extracted){g.getElementDimensions(this._placeholder).setElementWidth(this.node);g.getElementDimensions(this.node).setElementHeight(this._placeholder);}else g.getElementDimensions(this.node).setElementWidth(this.node).setElementHeight(this._placeholder);return this;},setExtracted:function(l){if(l===this._extracted)return this;if(l){this.update();c.replace(this.node,this._placeholder);}else{a.setStyle(this.node,'height',null);a.setStyle(this.node,'width',null);c.replace(this._placeholder,this.node);}this._extracted=l;return this;},getOffsetTop:function(){return (this._extracted?this._placeholder:this.node).offsetTop;}};function f(l){this.node=l;this._areas=[];this._fixTarget=null;this._fixedArea=null;this._initialized=false;this._layer=new b().init().setAutoFlip(false).setHideOnTransition(false).setParent(this.node.parentNode);this._listener=Event.listen(l,'scroll',this.update.bind(this));a.addClass(l,'uiStickyContainer');d.set(l,'StickyContainer',this);}f.getInstance=function(m){var l=d.get(m,'StickyContainer');return l||new f(m);};f.prototype={isDisplayed:function(){return this.node.offsetParent!==null;},register:function(l){this._areas.push(l);return this;},update:function(){if(!this.isDisplayed())return this;var n=null;var m=this;var r=this.node.scrollTop;for(var p=0;p<this._areas.length;p++){var l=this._areas[p];var q=l.getOffsetTop();if(q<=r){n=l;}else if(n){var o=g.getElementDimensions(n.node).y;if(q-o<r)m=l;break;}}this._init();if(this._fixedArea===n&&this._fixTarget===m){this._fixedArea&&this._fixedArea.update();}else{if(this._fixedArea&&this._fixedArea!==n)this._unfixArea(this._fixedArea);if(n)this._fixAreaTo(n,m);this._fixedArea=n;this._fixTarget=m;}return this;},destroy:function(){this._listener&&this._listener.remove();this._listener=null;},_init:function(){if(this._initialized)return;this._initialized=true;this._layer.updatePosition();},_fixAreaTo:function(l,m){this._layer.hide();l.setExtracted(true);if(m instanceof f){this._layer.setParent(this.node.parentNode).setContext(this.node);}else this._layer.setParent(this.node).setContext(m.node);this._layer.setContent(l.node).show();},_unfixArea:function(l){this._layer.hide();l.setExtracted(false);}};j.exports=e;});
__e("sticky-area",["StickyArea"],function(a,b){a.StickyArea=b('StickyArea');},3);