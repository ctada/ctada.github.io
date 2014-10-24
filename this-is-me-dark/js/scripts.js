/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/**
 * jQuery.LocalScroll - Animated scrolling navigation, using anchors.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 * @author Ariel Flesler
 * @version 1.2.7
 **/
;(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);

jQuery(function(){
jQuery.easing.easeOutExpo = function (x, t, b, c, d) {
return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
};
function selectNav() {
    jQuery(this)
        .parents('#iconmenu:first')
            .find('a')
                .removeClass('selected')
            .end()
        .end()
        .addClass('selected');
}
  jQuery('#iconmenu').find('a').click(selectNav);
    function trigger(data) {
        var el = jQuery('#iconmenu').find('a[href$="' + data.id + '"]').get(0);
        selectNav.call(el);
 }
    if (window.location.hash) {
        trigger({ id : window.location.hash.substr(1) });
    } else {
        jQuery('#iconmenu a:first').click();
}
jQuery.localScroll.defaults.axis = 'xy';
jQuery.localScroll({
	target: '#content',
	queue:true,
	duration:600,
	hash: false,
	easing: 'easeOutExpo',
	onAfter: trigger
});
});

/*
	Poptrox 0.1: Make your images pop POP!
	By nodethirtythree design | http://nodethirtythree.com/ | http://twitter.com/nodethirtythree
	Tested on IE6-9, Firefox, Opera, Safari, Safari/iOS, and Chrome.
	Dual licensed under the MIT license or GPL.
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	BETA RELEASE! Please email/tweet me bug reports, comments, suggestions, etc.
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	MIT LICENSE:
	Copyright (c) 2011 nodethirtythree design, http://nodethirtythree.com/
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
	files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use,
	copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
	Software is furnished to do so, subject to the following conditions:
	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	GPL LICENSE:
	Copyright (c) 2011 nodethirtythree design, http://nodethirtythree.com/
	This program is free software: you can redistribute it and/or modify it	under the terms of the GNU General Public License as
	published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is
	distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
	or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a copy of
	the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses/>. 
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
(function(jQuery) {
	jQuery.fn.poptrox = function(options) {

		// Settings

			var settings = jQuery.extend({
					preload:						false,				// If true, preload fullsize images in the background
					initialWidth:					400,				// Initial popup width
					initialHeight:					300,				// Initial popup height
					fadeSpeed:						100,				// Fade speed
					popupSpeed:						100,				// Popup (resize) speed
					overlayColor:					'#000000',			// Overlay color
					overlayOpacity:					0.75,				// Overlay opacity
					windowMargin:					50,					// Window margin size (in pixels; only comes into play when an image is larger than the viewport)
					isFixed:						false,				// If true, popup won't resize to fit images
					fixedWidth:						600,				// Fixed popup width (only used isFixed is true)
					fixedHeight:					400,				// Fixed popup height (only used if isFixed is true)
					easyClose:						true,				// If true, popup can be closed by clicking anywhere on the page
					usePopupLoader:					true,				// If true, show the loader
					usePopupCloser:					true,				// If true, show the closer button/link
					usePopupCaption:				true,				// If true, show the image caption
					popupClass:						'poptrox_popup',	// Popup class
					popupSelector:					null,				// (Advanced) Popup selector (use this if you want to replace the built-in popup)
					popupLoaderSelector:			'.loader',			// (Advanced) Loader selector
					popupCloserSelector:			'.closer',			// (Advanced) Closer selector
					popupCaptionSelector:			'.caption'			// (Advanced) Caption selector
			}, options);
			
		// Variables

			var __msie6 = (jQuery.browser.msie && jQuery.browser.version == 6), __msie67 = (jQuery.browser.msie && jQuery.browser.version < 8), __pos = (__msie6 ? 'absolute' : 'fixed');
			var isLocked = false, cache = new Array();

			var _top = jQuery(this);
			var _body = jQuery('body');
			var _overlay = jQuery('<div></div>');
			var _window = jQuery(window);
			var windowWidth = $(window).width(), windowHeight = $(window).height();

			if (settings.popupSelector)
				var _popup = jQuery(settings.popupSelector);
			else
			{
				var _popup = jQuery('<div class="' + settings.popupClass + '">' + (settings.popupLoaderSelector ? '<div class="loader">Loading</div>' : '') + '<div class="pic"></div>' + (settings.popupCaptionSelector ? '<div class="caption"></div>' : '') + (settings.popupCloserSelector ? '<a href="#" class="closer">Close</a>' : '') + '</div>');
				settings.popupLoaderSelector = '.loader';
				settings.popupCloserSelector = '.closer';
				settings.popupCaptionSelector = '.caption';
			}

			var _pic = _popup.find('.pic');
			var _loader = _popup.find(settings.popupLoaderSelector);
			var _caption = _popup.find(settings.popupCaptionSelector);
			var _closer = _popup.find(settings.popupCloserSelector);

			if (settings.usePopupLoader == false)
				_loader.remove();
			if (settings.usePopupCloser == false)
				_closer.remove();
			if (settings.usePopupCaption == false)
				_caption.remove();
		
		// Main

			_window
				.resize(function() {
					windowWidth = $(window).width(), windowHeight = $(window).height();
					_popup.trigger('poptrox_close');
				});

			_caption
				.bind('update', function(e, s) {
					_caption.html(s);
				});
			
			_closer
				.css('cursor', 'pointer')
				.click(function(e) {
					e.preventDefault();
					_popup.trigger('poptrox_close');
					return true;
				});

			_overlay
				.prependTo(__msie67 ? 'body' : 'html')
				.hide();

			if (__msie6)
				_overlay.css('position', 'absolute');
			else
				_overlay
					.css('position', __pos)
					.css('left', 0)
					.css('top', 0)
					.css('z-index', 100)
					.css('width', '200%')
					.css('height', '200%')
					.css('background-color', settings.overlayColor);

			if (settings.easyClose)
			{
				_pic
					.css('cursor', 'pointer')
					.click(function() {
						_popup.trigger('poptrox_close');
					});

				_overlay
					.css('cursor', 'pointer')
					.click(function() {
						_popup.trigger('poptrox_close');
					});
			}
			
			_popup
				.bind('poptrox_reset', function() {
					_popup
						.css('position', __pos)
						.css('z-index', 101)
						.css('width', settings.initialWidth + 'px')
						.css('height', settings.initialHeight + 'px')
						.css('left', (windowWidth / 2) + 'px')
						.css('top', (windowHeight / 2) + 'px')
						.css('top', (windowHeight / 2) + 'px')
						.css('margin-left', (-1 * (_popup.outerWidth() / 2)) + 'px')
						.css('margin-top', (-1 * (_popup.outerHeight() / 2)) + 'px')
					_loader.hide();
					_caption.hide();
					_closer.hide();
					_pic
						.html('')
						.hide();
				})
				.bind('poptrox_open', function(e, src, captionText) {
					if (isLocked)
						return true;
					isLocked = true;
					_body.css('overflow', 'hidden');
					_overlay
						.fadeTo(settings.fadeSpeed, settings.overlayOpacity, function() {
							_pic.css('text-indent', '-9999em').show().html('<img src="' + src + '" alt="" />');
							var img = _pic.find('img');
							_loader.fadeIn(300);
						
							if (settings.isFixed)
							{
								_popup
									.width(settings.fixedWidth)
									.height(settings.fixedHeight)
									.css('margin-left', (-1 * (_popup.innerWidth() / 2)) + 'px')
									.css('margin-top', (-1 * (_popup.innerHeight() / 2)) + 'px')
									.show();

								img.load(function() {
									_loader.hide();
									_caption.trigger('update', [captionText]).show();
									_closer.show();
									_pic.css('text-indent', 0).hide().fadeIn(settings.fadeSpeed, function() { isLocked = false; });
								});
							}
							else
							{
								_popup
									.show();
							
								img.load(function() {
									var dw = Math.abs(_popup.width() - _popup.outerWidth()), dh = Math.abs(_popup.height() - _popup.outerHeight());
									var nw = img.prop('width'), nh = img.prop('height');
									var uw = nw + dw, uh = nh + dh;
									var maxw = windowWidth - (settings.windowMargin * 2), maxh = windowHeight - (settings.windowMargin * 2);

									_loader.hide();
									
									if (uw > maxw || uh > maxh)
									{
										var multw = maxw / uw, multh = maxh / uh, m = Math.min(multw, multh);
										uw = m * uw; uh = m * uh;
										nw = uw - dw; nh = uh - dh;
										img.attr('width', nw).attr('height', nh);
									}
									
									_popup
										.animate({
											width: nw,
											height: nh,
											marginLeft: (-1 * (uw / 2)),
											marginTop: (-1 * (uh / 2))
										}, settings.popupSpeed, 'swing', function() {
											_caption.trigger('update', [captionText]).show();
											_closer.show();
											_pic.css('text-indent', 0).hide().fadeIn(settings.fadeSpeed, function() { isLocked = false; });
										});
								});
							}
								
						});
				})
				.bind('poptrox_close', function() {
					if (isLocked)
						return true;
					isLocked = true;
					_popup
						.hide()
						.trigger('poptrox_reset');
					_overlay
						.fadeOut(settings.fadeSpeed, function() {
							_body.css('overflow', 'auto');
							isLocked = false;
						});
				})
				.prependTo('body')
				.hide()
				.trigger('poptrox_reset');

			_window
				.keypress(function(e) {
					if (e.keyCode == 27) {
						e.preventDefault();
						_popup.trigger('poptrox_close');
					}
				});
			
			_top.find('a').each(function() {
				var a = jQuery(this), i = a.find('img'), title = i.attr('title'), src = a.attr('href');
				if (settings.preload) {
					var x = document.createElement('img'); x.src = src; cache.push(x);
				}
				i.attr('title', '');
				a
					.css('outline', 0)
					.click(function(e) {
						e.preventDefault();
						_popup.trigger('poptrox_open', [src, title]);
					});
			});
			
		return jQuery(this);
	};
})(jQuery);
