/*
CSS Browser Selector v0.4.0 (Nov 02, 2010)
Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/
Contributors: http://rafael.adm.br/css_browser_selector#contributors

v0.5.0 (Oct 11, 2011)
andrew relkin

v0.6.0 (Oct 28, 2011)
Gerson Goulart

v0.7.0 (Nov 02, 2011)
Gerson Goulart

Modified, now detects:
  - any version of Firefox (Keeping backwards compatibility with class naming in v.0.4.0)
  - more versions of Windows (Win8, Win7, Vista, XP, Win2k)
  - more versions of IE under unique conditions
  - more detailed support for Opera
  - if "no-js" in HTML class: removes and replaces with "js" (<html class="no-js">)

identifies
  - browsers: Firefox; IE; Opera; Safari; Chrome, Konqueror, Iron
  - browser versions: (most importantly: ie6, ie7, ie8, ie9)
  - rendering engines: Webkit; Mozilla; Gecko
  - platforms/OSes: Mac; Win: Win7, Vista, XP, Win2k; FreeBSD; Linux/x11 
  - devices: Ipod; Ipad; Iphone; WebTV; Blackberry; Android; J2me; mobile(generic)
  - enabled technology: JS
*/

;(function(u) {

	var
		// Most repeated keywords.
		g = 'gecko',
		w = 'webkit',
		s = 'safari',
		o = 'opera',
		m = 'mobile',
		h = document.documentElement,
		parse = function(u) {
			var
				// Navigator's User Agent, in lower caps.
				ua = u.toLowerCase(),
				// Function `is` returns `true` if value `t` is found on `ua`, returns `false` if not found.
				is = function (t) {
					return ua.indexOf(t) > -1
				},
				b = [
					// hat tip: https://github.com/kevingessner/css_browser_selector/
					// via https://github.com/verbatim/css_browser_selector
					(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua)) ? ('ie ie'+(/trident\/4\.0/.test(ua) ? '8' : RegExp.$1))
					// Updated Firefox do output both "ff" and "firefox" classes
					:(is('firefox/')&&/firefox\/(\S+)/.exec(ua)) ? (g + ' ff' + RegExp.$1.split('.')[0] + ' ff' + RegExp.$1.split('.')[0] + '_' + RegExp.$1.split('.')[1][0] + ' firefox' + RegExp.$1.split('.')[0] + ' firefox' + RegExp.$1.split('.')[0] + '_' + RegExp.$1.split('.')[1][0])
					:is('gecko/') ? g
					// Updated opera line to output major and minor versions
					:(is('opera/')&&/version\/(\S+)/.exec(ua)) ? (o + ' ' + o + RegExp.$1.split('.')[0] + ' ' + o + RegExp.$1.split('.')[0] + '_' + RegExp.$1.split('.')[1][0])
					:(/opera[\/|\s](\S+)/.exec(ua)) ? (o + ' ' + o + RegExp.$1.split('.')[0])
					:is('konqueror') ? 'konqueror'
					:is('blackberry') ? m + ' blackberry'
					:is('android') ? m + ' android'
					:is('chrome') ? w + ' chrome'
					:is('iron') ? w + ' iron'
					// Updated webkit line to output version number when available, only "webkit safari" when it's not.
					:(is('applewebkit/')&&/version\/(\S+)/.exec(ua)) ? w + ' ' + s + ' ' + s + RegExp.$1.split('.')[0]
					:is('applewebkit/') ? w + ' ' + s
					:is('mozilla/') ? g : ''
				],
				os = [
					 is('j2me') ? m + ' j2me'
					:is('iphone') ? m + ' iphone'
					:is('ipod') ? m + ' ipod'
					:is('ipad') ? m + ' ipad'
					:is('mac') ? 'mac'
					:is('darwin') ? 'mac'
					:is('webtv') ? 'webtv'
					// hat tip: https://github.com/saar/css_browser_selector
					// via https://github.com/verbatim/css_browser_selector
					:is('win')?'win'+ (
						 is('windows nt 6.2')?' win8'
						:is('windows nt 6.1')?' win7'
						:is('windows nt 6.0')?' vista'
						:is('windows nt 5.2') || is('windows nt 5.1') ? ' xp'
						:is('windows nt 5.0')?' win2k': ''
					)
					:is('freebsd') ? 'freebsd'
					:(is('x11')||is('linux')) ? 'linux' : ''
				],
				js = ' js',
				// Join all the browser info in one space-separated string.
				c = b.join(' ') + ' ' + os.join(' ') + js;
			return {
				'classes': c,
				'browser': b,
				'os': os
			};
		}
	// Keep external reference.
	window.css_browser_selector = parse(u);
	window.css_browser_selector.test = function(ua){
		var parseua = parse(ua);
		return parseua.classes
	};
	// Add string to (existing) html node class attribute.
	// hat tip, paul irish: http://paulirish.com/2009/avoiding-the-fouc-v3/
	// via https://github.com/verbatim/css_browser_selector
	h.className = ( h.className.replace(/no-?js/g,"") + " " + css_browser_selector.classes ).replace(/^ /, "");
	// Return string.
	return window.css_browser_selector.classes;

}(navigator.userAgent));