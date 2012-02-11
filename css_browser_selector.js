/*
CSS Browser Selector v0.4.0 (Nov 02, 2010)
Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/
Contributors: http://rafael.adm.br/css_browser_selector#contributors

v0.5.0 (Oct 11, 2011)
andrew relkin

v0.6.0 (Oct 28, 2011) to v0.9.0 (Feb 10, 2012)
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
		// `b` for Browser names, split using 0.
		b = 'gecko0firefox0webkit0safari0chrome0opera0konqueror0mobile0blackberry0android0windows '.split(0),
		// `s` for Space separator.
		s = ' ',
		d = document.documentElement,
		// `v` for Version numbers, returned in an array.
		v = function(n){
			n = n.split('.');
			return [n[0], n[0]+'_'+n[1][0]]
		},
		// `oc` for Object Convert, function to test for a value in javascript array (http://snook.ca/archives/javascript/testing_for_a_v).
		oc = function(a) {
			// `a` = array
			// `o` = object
			var o = {};
			// For each item in the array, make it the key of an object with empty value.
			for(var i=0;i<a.length;i++) {
				o[a[i]]='';
			}
			return o;
		},
		// `p` for Parse the ua.
		p = function(u) {
			var
				// Navigator's User Agent, in lower caps.
				ua = u.toLowerCase(),
				// Function `is` returns `true` if value `t` is found on `ua`, returns `false` if not found.
				is = function(t){ return ~ua.search(t) },
				br =
					// hat tip: https://github.com/kevingessner/css_browser_selector/
					// via https://github.com/verbatim/css_browser_selector
					(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua)) ? ('ie' + s + 'ie' + (/trident\/4\.0/.test(ua) ? '8' : RegExp.$1))
					// Mozilla Firefox (Gecko)
					//:(is(b[1]+'/') && /firefox\/(\S+)/.exec(ua)) ? b[0] + s + 'ff' + v(RegExp.$1)[0] + s + 'ff' + v(RegExp.$1)[1] + s + b[1] + v(RegExp.$1)[0] + s + b[1] + v(RegExp.$1)[1]
					:(is(b[1]+'/') && /firefox\/(\S+)/.exec(ua) && (vv=v(RegExp.$1))) ? b[0] + s + 'ff' + vv[0] + s + 'ff' + vv[1] + s + b[1] + vv[0] + s + b[1] + vv[1]
					// Gecko
					:is(b[0]+'/') ? b[0]
					// Opera Browser
					:(is(b[5]+'/') && /version\/(\S+)/.exec(ua) && (vv=v(RegExp.$1))) ? b[5] + s + b[5] + vv[0] + s + b[5] + vv[1]
					:(/opera[\/|\s](\S+)/.exec(ua)) ? b[5] + s + b[5] + v(RegExp.$1)[0]
					// Konqueror
					:is(b[6]) ? b[6]
					// Mobile Blackberry
					:is(b[8]) ? b[7] + s + b[8]
					// Mobile Android
					:is(b[9]) ? b[7] + s + b[9]
					// Google Chrome (Webkit)
					:is(b[4]) ? b[2] + s + b[4]
					// Iron (Webkit)
					:is('iron') ? b[2] + s + 'iron'
					// Safari (Webkit)
					:(is('applewebkit/') && /version\/(\S+)/.exec(ua)) ? b[2] + s + b[3] + s + b[3] + v(RegExp.$1)[0]
					:is('applewebkit/') ? b[2] + s + b[3]
					// Mozilla
					:is('mozilla/') ? b[0] : ''
				,
				os =
					 is('j2me') ? b[7] + ' j2me'
					:is('iphone') ? b[7] + ' iphone'
					:is('ipod') ? b[7] + ' ipod'
					:is('ipad') ? b[7] + ' ipad'
					// Mac
					:is('mac') ? 'mac'
					:is('darwin') ? 'mac'
					:is('webtv') ? 'webtv'
					// hat tip: https://github.com/saar/css_browser_selector
					// via https://github.com/verbatim/css_browser_selector
					// Windows, now with versions
					:is('win') ? (wv = 'win' + s + 'win_' + (
						 is(b[10] + 'nt 6.2') ? '8'
						:is(b[10] + 'nt 6.1') ? '7'
						:is(b[10] + 'nt 6.0') ? 'vista'
						:is(b[10] + 'nt 5.2') || is(b[10] + 'nt 5.1') ? 'xp'
						:is(b[10] + 'nt 5.0') ? '2000'
						:is('winnt') ? 'nt'
						:(is(b[10]) && /windows[\s](\S+)/.exec(ua)) ? RegExp.$1.replace(/[\)\;]/g,'') : ''
					)) ? (wv != 'win win_') ? wv : 'win' : ''
					:is('freebsd') ? 'freebsd'
					:(is('x11')||is('linux')) ? 'linux' : ''
				,
				// Join all the browser info in one space-separated string.
				cl = [br, os, 'js'].join(' ');
			return {
				classes: cl,
				browser: oc(br.split(' ')),
				os: oc(os.split(' '))
			};
		};
	// Keep external reference.
	window.cssbs = p(u);
	cssbs.test = function(ua){
		var pua = p(ua);
		return pua.classes
	};
	// Add string to (existing) html node class attribute.
	// hat tip, paul irish: http://paulirish.com/2009/avoiding-the-fouc-v3/
	// via https://github.com/verbatim/css_browser_selector
	d.className = ( d.className.replace(/no-?js/g,"") + s + cssbs.classes ).replace(/^ /, "");
	// Return string with classes.
	return cssbs.classes;

}(navigator.userAgent));