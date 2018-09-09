/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// take a note (keyboard key) and return the frequency
//
var getNoteFreq = function getNoteFreq(note) {
  // http://subsynth.sourceforge.net/midinote2freq.html
  var tune = 440;
  return tune / 32 * Math.pow(2, (note - 9) / 12);
};

// take a frequency, poly, and detune value and return an array of frequencies
//
var getFrequencySpread = function getFrequencySpread(freq) {
  var poly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var detune = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var numIntervals = Math.floor(poly / 2);

  return Array(poly).fill().map(function (_, i) {
    return freq + (numIntervals - i) * detune;
  }).reverse();
};

// take a range and a percent value, return a point on the range
//
var percentToPoint = function percentToPoint(min, max, percent) {
  var range = max - min;
  var shift = range * percent;
  var point = shift + min;

  return isNaN(point) ? 0 : point;
};

// take a range and a point, return the percentage on the range
//
var pointToPercent = function pointToPercent(min, max, point) {
  var range = max - min;
  var shift = point - min;
  var percent = shift / range;

  return isNaN(percent) ? 0 : percent;
};

// a non linear equation for converting a value from 0 to 127 to seconds, good for envelopes
// slightly modelled after Reason's Subtractor but needs more tests & research
//
var knobToSeconds = function knobToSeconds(value) {
  return Math.pow(value, 5) / 500000000;
};

var knobToFreq = function knobToFreq(value) {
  return Math.pow(value, 2);
};

var freqToKnob = function freqToKnob(value) {
  return Math.sqrt(value);
};

exports.getNoteFreq = getNoteFreq;
exports.getFrequencySpread = getFrequencySpread;
exports.percentToPoint = percentToPoint;
exports.pointToPercent = pointToPercent;
exports.knobToSeconds = knobToSeconds;
exports.knobToFreq = knobToFreq;
exports.freqToKnob = freqToKnob;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observable = function () {
  function Observable() {
    _classCallCheck(this, Observable);

    this.observers = [];
  }

  _createClass(Observable, [{
    key: 'registerObserver',
    value: function registerObserver(observer) {
      this.observers.push(observer);
    }
  }, {
    key: 'notifyObservers',
    value: function notifyObservers() {
      var _this = this;

      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.observers.forEach(function (observer) {
        observer.notify(message || _this);
      });
    }
  }]);

  return Observable;
}();

var Observer = function () {
  function Observer(observable) {
    _classCallCheck(this, Observer);

    observable.registerObserver(this);
  }

  _createClass(Observer, [{
    key: 'notify',
    value: function notify(observable) {
      console.log('Got update from', observable);
    }
  }]);

  return Observer;
}();

exports.Observable = Observable;
exports.Observer = Observer;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var intToWaveform = function intToWaveform(i) {
  return ['sine', 'square', 'sawtooth', 'triangle'][i - 1] || 'sine';
};

var waveformToInt = function waveformToInt(w) {
  return ['sine', 'square', 'sawtooth', 'triangle'].indexOf(w) + 1;
};

var intToFilter = function intToFilter(i) {
  return ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass'][i - 1] || 'lowpass';
};

var filterToInt = function filterToInt(f) {
  return ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass'].indexOf(f) + 1;
};

var renameObjectKey = function renameObjectKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
  return obj;
};

exports.intToWaveform = intToWaveform;
exports.waveformToInt = waveformToInt;
exports.intToFilter = intToFilter;
exports.filterToInt = filterToInt;
exports.renameObjectKey = renameObjectKey;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(23);
__webpack_require__(25);
module.exports = __webpack_require__(28);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

(function(){
'use strict';var h=new function(){};var aa=new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function m(b){var a=aa.has(b);b=/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(b);return!a&&b}function n(b){var a=b.isConnected;if(void 0!==a)return a;for(;b&&!(b.__CE_isImportDocument||b instanceof Document);)b=b.parentNode||(window.ShadowRoot&&b instanceof ShadowRoot?b.host:void 0);return!(!b||!(b.__CE_isImportDocument||b instanceof Document))}
function p(b,a){for(;a&&a!==b&&!a.nextSibling;)a=a.parentNode;return a&&a!==b?a.nextSibling:null}
function t(b,a,d){d=d?d:new Set;for(var c=b;c;){if(c.nodeType===Node.ELEMENT_NODE){var e=c;a(e);var f=e.localName;if("link"===f&&"import"===e.getAttribute("rel")){c=e.import;if(c instanceof Node&&!d.has(c))for(d.add(c),c=c.firstChild;c;c=c.nextSibling)t(c,a,d);c=p(b,e);continue}else if("template"===f){c=p(b,e);continue}if(e=e.__CE_shadowRoot)for(e=e.firstChild;e;e=e.nextSibling)t(e,a,d)}c=c.firstChild?c.firstChild:p(b,c)}}function u(b,a,d){b[a]=d};function v(){this.a=new Map;this.o=new Map;this.f=[];this.b=!1}function ba(b,a,d){b.a.set(a,d);b.o.set(d.constructor,d)}function w(b,a){b.b=!0;b.f.push(a)}function x(b,a){b.b&&t(a,function(a){return y(b,a)})}function y(b,a){if(b.b&&!a.__CE_patched){a.__CE_patched=!0;for(var d=0;d<b.f.length;d++)b.f[d](a)}}function z(b,a){var d=[];t(a,function(b){return d.push(b)});for(a=0;a<d.length;a++){var c=d[a];1===c.__CE_state?b.connectedCallback(c):A(b,c)}}
function B(b,a){var d=[];t(a,function(b){return d.push(b)});for(a=0;a<d.length;a++){var c=d[a];1===c.__CE_state&&b.disconnectedCallback(c)}}
function C(b,a,d){d=d?d:{};var c=d.w||new Set,e=d.s||function(a){return A(b,a)},f=[];t(a,function(a){if("link"===a.localName&&"import"===a.getAttribute("rel")){var d=a.import;d instanceof Node&&"complete"===d.readyState?(d.__CE_isImportDocument=!0,d.__CE_hasRegistry=!0):a.addEventListener("load",function(){var d=a.import;if(!d.__CE_documentLoadHandled){d.__CE_documentLoadHandled=!0;d.__CE_isImportDocument=!0;d.__CE_hasRegistry=!0;var f=new Set(c);f.delete(d);C(b,d,{w:f,s:e})}})}else f.push(a)},c);
if(b.b)for(a=0;a<f.length;a++)y(b,f[a]);for(a=0;a<f.length;a++)e(f[a])}
function A(b,a){if(void 0===a.__CE_state){var d=b.a.get(a.localName);if(d){d.constructionStack.push(a);var c=d.constructor;try{try{if(new c!==a)throw Error("The custom element constructor did not produce the element being upgraded.");}finally{d.constructionStack.pop()}}catch(r){throw a.__CE_state=2,r;}a.__CE_state=1;a.__CE_definition=d;if(d.attributeChangedCallback)for(d=d.observedAttributes,c=0;c<d.length;c++){var e=d[c],f=a.getAttribute(e);null!==f&&b.attributeChangedCallback(a,e,null,f,null)}n(a)&&
b.connectedCallback(a)}}}v.prototype.connectedCallback=function(b){var a=b.__CE_definition;a.connectedCallback&&a.connectedCallback.call(b)};v.prototype.disconnectedCallback=function(b){var a=b.__CE_definition;a.disconnectedCallback&&a.disconnectedCallback.call(b)};v.prototype.attributeChangedCallback=function(b,a,d,c,e){var f=b.__CE_definition;f.attributeChangedCallback&&-1<f.observedAttributes.indexOf(a)&&f.attributeChangedCallback.call(b,a,d,c,e)};function D(b,a){this.c=b;this.a=a;this.b=void 0;C(this.c,this.a);"loading"===this.a.readyState&&(this.b=new MutationObserver(this.f.bind(this)),this.b.observe(this.a,{childList:!0,subtree:!0}))}function E(b){b.b&&b.b.disconnect()}D.prototype.f=function(b){var a=this.a.readyState;"interactive"!==a&&"complete"!==a||E(this);for(a=0;a<b.length;a++)for(var d=b[a].addedNodes,c=0;c<d.length;c++)C(this.c,d[c])};function ca(){var b=this;this.b=this.a=void 0;this.f=new Promise(function(a){b.b=a;b.a&&a(b.a)})}function F(b){if(b.a)throw Error("Already resolved.");b.a=void 0;b.b&&b.b(void 0)};function G(b){this.i=!1;this.c=b;this.m=new Map;this.j=function(b){return b()};this.g=!1;this.l=[];this.u=new D(b,document)}
G.prototype.define=function(b,a){var d=this;if(!(a instanceof Function))throw new TypeError("Custom element constructors must be functions.");if(!m(b))throw new SyntaxError("The element name '"+b+"' is not valid.");if(this.c.a.get(b))throw Error("A custom element with name '"+b+"' has already been defined.");if(this.i)throw Error("A custom element is already being defined.");this.i=!0;var c,e,f,r,k;try{var g=function(b){var a=l[b];if(void 0!==a&&!(a instanceof Function))throw Error("The '"+b+"' callback must be a function.");
return a},l=a.prototype;if(!(l instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");c=g("connectedCallback");e=g("disconnectedCallback");f=g("adoptedCallback");r=g("attributeChangedCallback");k=a.observedAttributes||[]}catch(q){return}finally{this.i=!1}a={localName:b,constructor:a,connectedCallback:c,disconnectedCallback:e,adoptedCallback:f,attributeChangedCallback:r,observedAttributes:k,constructionStack:[]};ba(this.c,b,a);this.l.push(a);this.g||
(this.g=!0,this.j(function(){return da(d)}))};function da(b){if(!1!==b.g){b.g=!1;for(var a=b.l,d=[],c=new Map,e=0;e<a.length;e++)c.set(a[e].localName,[]);C(b.c,document,{s:function(a){if(void 0===a.__CE_state){var e=a.localName,f=c.get(e);f?f.push(a):b.c.a.get(e)&&d.push(a)}}});for(e=0;e<d.length;e++)A(b.c,d[e]);for(;0<a.length;){for(var f=a.shift(),e=f.localName,f=c.get(f.localName),r=0;r<f.length;r++)A(b.c,f[r]);(e=b.m.get(e))&&F(e)}}}G.prototype.get=function(b){if(b=this.c.a.get(b))return b.constructor};
G.prototype.whenDefined=function(b){if(!m(b))return Promise.reject(new SyntaxError("'"+b+"' is not a valid custom element name."));var a=this.m.get(b);if(a)return a.f;a=new ca;this.m.set(b,a);this.c.a.get(b)&&!this.l.some(function(a){return a.localName===b})&&F(a);return a.f};G.prototype.v=function(b){E(this.u);var a=this.j;this.j=function(d){return b(function(){return a(d)})}};window.CustomElementRegistry=G;G.prototype.define=G.prototype.define;G.prototype.get=G.prototype.get;
G.prototype.whenDefined=G.prototype.whenDefined;G.prototype.polyfillWrapFlushCallback=G.prototype.v;var H=window.Document.prototype.createElement,ea=window.Document.prototype.createElementNS,fa=window.Document.prototype.importNode,ga=window.Document.prototype.prepend,ha=window.Document.prototype.append,ia=window.DocumentFragment.prototype.prepend,ja=window.DocumentFragment.prototype.append,I=window.Node.prototype.cloneNode,J=window.Node.prototype.appendChild,K=window.Node.prototype.insertBefore,L=window.Node.prototype.removeChild,M=window.Node.prototype.replaceChild,N=Object.getOwnPropertyDescriptor(window.Node.prototype,
"textContent"),O=window.Element.prototype.attachShadow,P=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),Q=window.Element.prototype.getAttribute,R=window.Element.prototype.setAttribute,S=window.Element.prototype.removeAttribute,T=window.Element.prototype.getAttributeNS,U=window.Element.prototype.setAttributeNS,ka=window.Element.prototype.removeAttributeNS,la=window.Element.prototype.insertAdjacentElement,ma=window.Element.prototype.prepend,na=window.Element.prototype.append,
V=window.Element.prototype.before,oa=window.Element.prototype.after,pa=window.Element.prototype.replaceWith,qa=window.Element.prototype.remove,ra=window.HTMLElement,W=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),sa=window.HTMLElement.prototype.insertAdjacentElement;function ta(){var b=X;window.HTMLElement=function(){function a(){var a=this.constructor,c=b.o.get(a);if(!c)throw Error("The custom element being constructed was not registered with `customElements`.");var e=c.constructionStack;if(!e.length)return e=H.call(document,c.localName),Object.setPrototypeOf(e,a.prototype),e.__CE_state=1,e.__CE_definition=c,y(b,e),e;var c=e.length-1,f=e[c];if(f===h)throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
e[c]=h;Object.setPrototypeOf(f,a.prototype);y(b,f);return f}a.prototype=ra.prototype;return a}()};function Y(b,a,d){function c(a){return function(d){for(var e=[],c=0;c<arguments.length;++c)e[c-0]=arguments[c];for(var c=[],f=[],l=0;l<e.length;l++){var q=e[l];q instanceof Element&&n(q)&&f.push(q);if(q instanceof DocumentFragment)for(q=q.firstChild;q;q=q.nextSibling)c.push(q);else c.push(q)}a.apply(this,e);for(e=0;e<f.length;e++)B(b,f[e]);if(n(this))for(e=0;e<c.length;e++)f=c[e],f instanceof Element&&z(b,f)}}d.h&&(a.prepend=c(d.h));d.append&&(a.append=c(d.append))};function ua(){var b=X;u(Document.prototype,"createElement",function(a){if(this.__CE_hasRegistry){var d=b.a.get(a);if(d)return new d.constructor}a=H.call(this,a);y(b,a);return a});u(Document.prototype,"importNode",function(a,d){a=fa.call(this,a,d);this.__CE_hasRegistry?C(b,a):x(b,a);return a});u(Document.prototype,"createElementNS",function(a,d){if(this.__CE_hasRegistry&&(null===a||"http://www.w3.org/1999/xhtml"===a)){var c=b.a.get(d);if(c)return new c.constructor}a=ea.call(this,a,d);y(b,a);return a});
Y(b,Document.prototype,{h:ga,append:ha})};function va(){var b=X;function a(a,c){Object.defineProperty(a,"textContent",{enumerable:c.enumerable,configurable:!0,get:c.get,set:function(a){if(this.nodeType===Node.TEXT_NODE)c.set.call(this,a);else{var e=void 0;if(this.firstChild){var d=this.childNodes,k=d.length;if(0<k&&n(this))for(var e=Array(k),g=0;g<k;g++)e[g]=d[g]}c.set.call(this,a);if(e)for(a=0;a<e.length;a++)B(b,e[a])}}})}u(Node.prototype,"insertBefore",function(a,c){if(a instanceof DocumentFragment){var e=Array.prototype.slice.apply(a.childNodes);
a=K.call(this,a,c);if(n(this))for(c=0;c<e.length;c++)z(b,e[c]);return a}e=n(a);c=K.call(this,a,c);e&&B(b,a);n(this)&&z(b,a);return c});u(Node.prototype,"appendChild",function(a){if(a instanceof DocumentFragment){var c=Array.prototype.slice.apply(a.childNodes);a=J.call(this,a);if(n(this))for(var e=0;e<c.length;e++)z(b,c[e]);return a}c=n(a);e=J.call(this,a);c&&B(b,a);n(this)&&z(b,a);return e});u(Node.prototype,"cloneNode",function(a){a=I.call(this,a);this.ownerDocument.__CE_hasRegistry?C(b,a):x(b,a);
return a});u(Node.prototype,"removeChild",function(a){var c=n(a),e=L.call(this,a);c&&B(b,a);return e});u(Node.prototype,"replaceChild",function(a,c){if(a instanceof DocumentFragment){var e=Array.prototype.slice.apply(a.childNodes);a=M.call(this,a,c);if(n(this))for(B(b,c),c=0;c<e.length;c++)z(b,e[c]);return a}var e=n(a),f=M.call(this,a,c),d=n(this);d&&B(b,c);e&&B(b,a);d&&z(b,a);return f});N&&N.get?a(Node.prototype,N):w(b,function(b){a(b,{enumerable:!0,configurable:!0,get:function(){for(var a=[],b=
0;b<this.childNodes.length;b++)a.push(this.childNodes[b].textContent);return a.join("")},set:function(a){for(;this.firstChild;)L.call(this,this.firstChild);J.call(this,document.createTextNode(a))}})})};function wa(b){var a=Element.prototype;function d(a){return function(e){for(var c=[],d=0;d<arguments.length;++d)c[d-0]=arguments[d];for(var d=[],k=[],g=0;g<c.length;g++){var l=c[g];l instanceof Element&&n(l)&&k.push(l);if(l instanceof DocumentFragment)for(l=l.firstChild;l;l=l.nextSibling)d.push(l);else d.push(l)}a.apply(this,c);for(c=0;c<k.length;c++)B(b,k[c]);if(n(this))for(c=0;c<d.length;c++)k=d[c],k instanceof Element&&z(b,k)}}V&&(a.before=d(V));V&&(a.after=d(oa));pa&&u(a,"replaceWith",function(a){for(var e=
[],c=0;c<arguments.length;++c)e[c-0]=arguments[c];for(var c=[],d=[],k=0;k<e.length;k++){var g=e[k];g instanceof Element&&n(g)&&d.push(g);if(g instanceof DocumentFragment)for(g=g.firstChild;g;g=g.nextSibling)c.push(g);else c.push(g)}k=n(this);pa.apply(this,e);for(e=0;e<d.length;e++)B(b,d[e]);if(k)for(B(b,this),e=0;e<c.length;e++)d=c[e],d instanceof Element&&z(b,d)});qa&&u(a,"remove",function(){var a=n(this);qa.call(this);a&&B(b,this)})};function xa(){var b=X;function a(a,c){Object.defineProperty(a,"innerHTML",{enumerable:c.enumerable,configurable:!0,get:c.get,set:function(a){var e=this,d=void 0;n(this)&&(d=[],t(this,function(a){a!==e&&d.push(a)}));c.set.call(this,a);if(d)for(var f=0;f<d.length;f++){var r=d[f];1===r.__CE_state&&b.disconnectedCallback(r)}this.ownerDocument.__CE_hasRegistry?C(b,this):x(b,this);return a}})}function d(a,c){u(a,"insertAdjacentElement",function(a,e){var d=n(e);a=c.call(this,a,e);d&&B(b,e);n(a)&&z(b,e);
return a})}O&&u(Element.prototype,"attachShadow",function(a){return this.__CE_shadowRoot=a=O.call(this,a)});if(P&&P.get)a(Element.prototype,P);else if(W&&W.get)a(HTMLElement.prototype,W);else{var c=H.call(document,"div");w(b,function(b){a(b,{enumerable:!0,configurable:!0,get:function(){return I.call(this,!0).innerHTML},set:function(a){var b="template"===this.localName?this.content:this;for(c.innerHTML=a;0<b.childNodes.length;)L.call(b,b.childNodes[0]);for(;0<c.childNodes.length;)J.call(b,c.childNodes[0])}})})}u(Element.prototype,
"setAttribute",function(a,c){if(1!==this.__CE_state)return R.call(this,a,c);var e=Q.call(this,a);R.call(this,a,c);c=Q.call(this,a);b.attributeChangedCallback(this,a,e,c,null)});u(Element.prototype,"setAttributeNS",function(a,c,d){if(1!==this.__CE_state)return U.call(this,a,c,d);var e=T.call(this,a,c);U.call(this,a,c,d);d=T.call(this,a,c);b.attributeChangedCallback(this,c,e,d,a)});u(Element.prototype,"removeAttribute",function(a){if(1!==this.__CE_state)return S.call(this,a);var c=Q.call(this,a);S.call(this,
a);null!==c&&b.attributeChangedCallback(this,a,c,null,null)});u(Element.prototype,"removeAttributeNS",function(a,c){if(1!==this.__CE_state)return ka.call(this,a,c);var d=T.call(this,a,c);ka.call(this,a,c);var e=T.call(this,a,c);d!==e&&b.attributeChangedCallback(this,c,d,e,a)});sa?d(HTMLElement.prototype,sa):la?d(Element.prototype,la):console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");Y(b,Element.prototype,{h:ma,append:na});wa(b)};/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var Z=window.customElements;if(!Z||Z.forcePolyfill||"function"!=typeof Z.define||"function"!=typeof Z.get){var X=new v;ta();ua();Y(X,DocumentFragment.prototype,{h:ia,append:ja});va();xa();document.__CE_hasRegistry=!0;var customElements=new G(X);Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:customElements})};
}).call(self);

//# sourceMappingURL=custom-elements.min.js.map


/***/ }),
/* 6 */
/***/ (function(module, exports) {

(function(){/*

Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';function n(a,b){return{index:a,j:[],l:b}}
function aa(a,b,c,d){var e=0,g=0,h=0,f=0,k=Math.min(b-e,d-g);if(0==e&&0==g)a:{for(h=0;h<k;h++)if(a[h]!==c[h])break a;h=k}if(b==a.length&&d==c.length){f=a.length;for(var l=c.length,m=0;m<k-h&&ba(a[--f],c[--l]);)m++;f=m}e+=h;g+=h;b-=f;d-=f;if(0==b-e&&0==d-g)return[];if(e==b){for(b=n(e,0);g<d;)b.j.push(c[g++]);return[b]}if(g==d)return[n(e,b-e)];k=e;h=g;d=d-h+1;f=b-k+1;b=Array(d);for(l=0;l<d;l++)b[l]=Array(f),b[l][0]=l;for(l=0;l<f;l++)b[0][l]=l;for(l=1;l<d;l++)for(m=1;m<f;m++)if(a[k+m-1]===c[h+l-1])b[l][m]=
b[l-1][m-1];else{var q=b[l-1][m]+1,z=b[l][m-1]+1;b[l][m]=q<z?q:z}k=b.length-1;h=b[0].length-1;d=b[k][h];for(a=[];0<k||0<h;)0==k?(a.push(2),h--):0==h?(a.push(3),k--):(f=b[k-1][h-1],l=b[k-1][h],m=b[k][h-1],q=l<m?l<f?l:f:m<f?m:f,q==f?(f==d?a.push(0):(a.push(1),d=f),k--,h--):q==l?(a.push(3),k--,d=l):(a.push(2),h--,d=m));a.reverse();b=void 0;k=[];for(h=0;h<a.length;h++)switch(a[h]){case 0:b&&(k.push(b),b=void 0);e++;g++;break;case 1:b||(b=n(e,0));b.l++;e++;b.j.push(c[g]);g++;break;case 2:b||(b=n(e,0));
b.l++;e++;break;case 3:b||(b=n(e,0)),b.j.push(c[g]),g++}b&&k.push(b);return k}function ba(a,b){return a===b};var p=window.ShadyDOM||{};p.P=!(!Element.prototype.attachShadow||!Node.prototype.getRootNode);var r=Object.getOwnPropertyDescriptor(Node.prototype,"firstChild");p.h=!!(r&&r.configurable&&r.get);p.G=p.force||!p.P;function t(a){return a.__shady&&void 0!==a.__shady.firstChild}function u(a){return"ShadyRoot"===a.J}function v(a){a=a.getRootNode();if(u(a))return a}var w=Element.prototype,ca=w.matches||w.matchesSelector||w.mozMatchesSelector||w.msMatchesSelector||w.oMatchesSelector||w.webkitMatchesSelector;
function x(a,b){if(a&&b)for(var c=Object.getOwnPropertyNames(b),d=0,e;d<c.length&&(e=c[d]);d++){var g=Object.getOwnPropertyDescriptor(b,e);g&&Object.defineProperty(a,e,g)}}function y(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];for(d=0;d<c.length;d++)x(a,c[d]);return a}function da(a,b){for(var c in b)a[c]=b[c]}var A=document.createTextNode(""),ea=0,B=[];(new MutationObserver(function(){for(;B.length;)try{B.shift()()}catch(a){throw A.textContent=ea++,a;}})).observe(A,{characterData:!0});
function fa(a){B.push(a);A.textContent=ea++};var ha=/[&\u00A0"]/g,ia=/[&\u00A0<>]/g;function ja(a){switch(a){case "&":return"&amp;";case "<":return"&lt;";case ">":return"&gt;";case '"':return"&quot;";case "\u00a0":return"&nbsp;"}}function ka(a){for(var b={},c=0;c<a.length;c++)b[a[c]]=!0;return b}var la=ka("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),na=ka("style script xmp iframe noembed noframes plaintext noscript".split(" "));
function C(a,b){"template"===a.localName&&(a=a.content);for(var c="",d=b?b(a):a.childNodes,e=0,g=d.length,h;e<g&&(h=d[e]);e++){a:{var f=h;var k=a;var l=b;switch(f.nodeType){case Node.ELEMENT_NODE:for(var m=f.localName,q="<"+m,z=f.attributes,ma=0;k=z[ma];ma++)q+=" "+k.name+'="'+k.value.replace(ha,ja)+'"';q+=">";f=la[m]?q:q+C(f,l)+"</"+m+">";break a;case Node.TEXT_NODE:f=f.data;f=k&&na[k.localName]?f:f.replace(ia,ja);break a;case Node.COMMENT_NODE:f="\x3c!--"+f.data+"--\x3e";break a;default:throw window.console.error(f),
Error("not implemented");}}c+=f}return c};var D={},E=document.createTreeWalker(document,NodeFilter.SHOW_ALL,null,!1),F=document.createTreeWalker(document,NodeFilter.SHOW_ELEMENT,null,!1);function oa(a){var b=[];E.currentNode=a;for(a=E.firstChild();a;)b.push(a),a=E.nextSibling();return b}D.parentNode=function(a){E.currentNode=a;return E.parentNode()};D.firstChild=function(a){E.currentNode=a;return E.firstChild()};D.lastChild=function(a){E.currentNode=a;return E.lastChild()};D.previousSibling=function(a){E.currentNode=a;return E.previousSibling()};
D.nextSibling=function(a){E.currentNode=a;return E.nextSibling()};D.childNodes=oa;D.parentElement=function(a){F.currentNode=a;return F.parentNode()};D.firstElementChild=function(a){F.currentNode=a;return F.firstChild()};D.lastElementChild=function(a){F.currentNode=a;return F.lastChild()};D.previousElementSibling=function(a){F.currentNode=a;return F.previousSibling()};D.nextElementSibling=function(a){F.currentNode=a;return F.nextSibling()};
D.children=function(a){var b=[];F.currentNode=a;for(a=F.firstChild();a;)b.push(a),a=F.nextSibling();return b};D.innerHTML=function(a){return C(a,function(a){return oa(a)})};D.textContent=function(a){switch(a.nodeType){case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:a=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,null,!1);for(var b="",c;c=a.nextNode();)b+=c.nodeValue;return b;default:return a.nodeValue}};var G=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML")||Object.getOwnPropertyDescriptor(HTMLElement.prototype,"innerHTML"),H=document.implementation.createHTMLDocument("inert").createElement("div"),I=Object.getOwnPropertyDescriptor(Document.prototype,"activeElement"),pa={parentElement:{get:function(){var a=this.__shady&&this.__shady.parentNode;a&&a.nodeType!==Node.ELEMENT_NODE&&(a=null);return void 0!==a?a:D.parentElement(this)},configurable:!0},parentNode:{get:function(){var a=this.__shady&&
this.__shady.parentNode;return void 0!==a?a:D.parentNode(this)},configurable:!0},nextSibling:{get:function(){var a=this.__shady&&this.__shady.nextSibling;return void 0!==a?a:D.nextSibling(this)},configurable:!0},previousSibling:{get:function(){var a=this.__shady&&this.__shady.previousSibling;return void 0!==a?a:D.previousSibling(this)},configurable:!0},className:{get:function(){return this.getAttribute("class")||""},set:function(a){this.setAttribute("class",a)},configurable:!0},nextElementSibling:{get:function(){if(this.__shady&&
void 0!==this.__shady.nextSibling){for(var a=this.nextSibling;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.nextSibling;return a}return D.nextElementSibling(this)},configurable:!0},previousElementSibling:{get:function(){if(this.__shady&&void 0!==this.__shady.previousSibling){for(var a=this.previousSibling;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;return a}return D.previousElementSibling(this)},configurable:!0}},J={childNodes:{get:function(){if(t(this)){if(!this.__shady.childNodes){this.__shady.childNodes=
[];for(var a=this.firstChild;a;a=a.nextSibling)this.__shady.childNodes.push(a)}var b=this.__shady.childNodes}else b=D.childNodes(this);b.item=function(a){return b[a]};return b},configurable:!0},childElementCount:{get:function(){return this.children.length},configurable:!0},firstChild:{get:function(){var a=this.__shady&&this.__shady.firstChild;return void 0!==a?a:D.firstChild(this)},configurable:!0},lastChild:{get:function(){var a=this.__shady&&this.__shady.lastChild;return void 0!==a?a:D.lastChild(this)},
configurable:!0},textContent:{get:function(){if(t(this)){for(var a=[],b=0,c=this.childNodes,d;d=c[b];b++)d.nodeType!==Node.COMMENT_NODE&&a.push(d.textContent);return a.join("")}return D.textContent(this)},set:function(a){switch(this.nodeType){case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:for(;this.firstChild;)this.removeChild(this.firstChild);(0<a.length||this.nodeType===Node.ELEMENT_NODE)&&this.appendChild(document.createTextNode(a));break;default:this.nodeValue=a}},configurable:!0},firstElementChild:{get:function(){if(this.__shady&&
void 0!==this.__shady.firstChild){for(var a=this.firstChild;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.nextSibling;return a}return D.firstElementChild(this)},configurable:!0},lastElementChild:{get:function(){if(this.__shady&&void 0!==this.__shady.lastChild){for(var a=this.lastChild;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;return a}return D.lastElementChild(this)},configurable:!0},children:{get:function(){var a;t(this)?a=Array.prototype.filter.call(this.childNodes,function(a){return a.nodeType===
Node.ELEMENT_NODE}):a=D.children(this);a.item=function(b){return a[b]};return a},configurable:!0},innerHTML:{get:function(){var a="template"===this.localName?this.content:this;return t(this)?C(a):D.innerHTML(a)},set:function(a){for(var b="template"===this.localName?this.content:this;b.firstChild;)b.removeChild(b.firstChild);for(G&&G.set?G.set.call(H,a):H.innerHTML=a;H.firstChild;)b.appendChild(H.firstChild)},configurable:!0}},qa={shadowRoot:{get:function(){return this.__shady&&this.__shady.R||null},
configurable:!0}},K={activeElement:{get:function(){var a=I&&I.get?I.get.call(document):p.h?void 0:document.activeElement;if(a&&a.nodeType){var b=!!u(this);if(this===document||b&&this.host!==a&&this.host.contains(a)){for(b=v(a);b&&b!==this;)a=b.host,b=v(a);a=this===document?b?null:a:b===this?a:null}else a=null}else a=null;return a},set:function(){},configurable:!0}};
function L(a,b,c){for(var d in b){var e=Object.getOwnPropertyDescriptor(a,d);e&&e.configurable||!e&&c?Object.defineProperty(a,d,b[d]):c&&console.warn("Could not define",d,"on",a)}}function M(a){L(a,pa);L(a,J);L(a,K)}var ra=p.h?function(){}:function(a){a.__shady&&a.__shady.K||(a.__shady=a.__shady||{},a.__shady.K=!0,L(a,pa,!0))},sa=p.h?function(){}:function(a){a.__shady&&a.__shady.I||(a.__shady=a.__shady||{},a.__shady.I=!0,L(a,J,!0),L(a,qa,!0))};function ta(a,b,c){ra(a);c=c||null;a.__shady=a.__shady||{};b.__shady=b.__shady||{};c&&(c.__shady=c.__shady||{});a.__shady.previousSibling=c?c.__shady.previousSibling:b.lastChild;var d=a.__shady.previousSibling;d&&d.__shady&&(d.__shady.nextSibling=a);(d=a.__shady.nextSibling=c)&&d.__shady&&(d.__shady.previousSibling=a);a.__shady.parentNode=b;c?c===b.__shady.firstChild&&(b.__shady.firstChild=a):(b.__shady.lastChild=a,b.__shady.firstChild||(b.__shady.firstChild=a));b.__shady.childNodes=null}
function N(a){if(!a.__shady||void 0===a.__shady.firstChild){a.__shady=a.__shady||{};a.__shady.firstChild=D.firstChild(a);a.__shady.lastChild=D.lastChild(a);sa(a);for(var b=a.__shady.childNodes=D.childNodes(a),c=0,d;c<b.length&&(d=b[c]);c++)d.__shady=d.__shady||{},d.__shady.parentNode=a,d.__shady.nextSibling=b[c+1]||null,d.__shady.previousSibling=b[c-1]||null,ra(d)}};var O={},ua=Element.prototype.insertBefore,va=Element.prototype.removeChild,wa=Element.prototype.setAttribute,xa=Element.prototype.removeAttribute,ya=Element.prototype.cloneNode,za=Document.prototype.importNode,Aa=Element.prototype.addEventListener,Ba=Element.prototype.removeEventListener,Ca=Window.prototype.addEventListener,Da=Window.prototype.removeEventListener,Ea=Element.prototype.dispatchEvent,Fa=Element.prototype.querySelector,Ga=Element.prototype.querySelectorAll;O.appendChild=Element.prototype.appendChild;
O.insertBefore=ua;O.removeChild=va;O.setAttribute=wa;O.removeAttribute=xa;O.cloneNode=ya;O.importNode=za;O.addEventListener=Aa;O.removeEventListener=Ba;O.S=Ca;O.T=Da;O.dispatchEvent=Ea;O.querySelector=Fa;O.querySelectorAll=Ga;function P(a,b,c){if(b===a)throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");if(c){var d=c.__shady&&c.__shady.parentNode;if(void 0!==d&&d!==a||void 0===d&&D.parentNode(c)!==a)throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");}if(c===b)return b;b.parentNode&&Q(b.parentNode,b);d=v(a);var e;if(e=d)a:{if(!b.__noInsertionPoint){var g;"slot"===b.localName?g=[b]:b.querySelectorAll&&
(g=b.querySelectorAll("slot"));if(g&&g.length){e=g;break a}}e=void 0}g=e;d&&("slot"===a.localName||g)&&R(d);if(t(a)){e=c;sa(a);a.__shady=a.__shady||{};void 0!==a.__shady.firstChild&&(a.__shady.childNodes=null);if(b.nodeType===Node.DOCUMENT_FRAGMENT_NODE){for(var h=b.childNodes,f=0;f<h.length;f++)ta(h[f],a,e);b.__shady=b.__shady||{};e=void 0!==b.__shady.firstChild?null:void 0;b.__shady.firstChild=b.__shady.lastChild=e;b.__shady.childNodes=e}else ta(b,a,e);if(S(a)){R(a.__shady.root);var k=!0}else a.__shady.root&&
(k=!0)}k||(k=u(a)?a.host:a,c?(c=Ha(c),O.insertBefore.call(k,b,c)):O.appendChild.call(k,b));Ia(a,b);if(g){d.a=d.a||{};d.b=d.b||[];for(a=0;a<g.length;a++){c=g[a];c.__shady=c.__shady||{};N(c);N(c.parentNode);k=Ja(c);if(d.a[k]){var l=l||{};l[k]=!0;d.a[k].push(c)}else d.a[k]=[c];d.b.push(c)}if(l)for(var m in l)d.a[m]=Ka(d.a[m])}return b}
function Q(a,b){if(b.parentNode!==a)throw Error("The node to be removed is not a child of this node: "+b);var c=v(b);if(t(a)){b.__shady=b.__shady||{};a.__shady=a.__shady||{};b===a.__shady.firstChild&&(a.__shady.firstChild=b.__shady.nextSibling);b===a.__shady.lastChild&&(a.__shady.lastChild=b.__shady.previousSibling);var d=b.__shady.previousSibling,e=b.__shady.nextSibling;d&&(d.__shady=d.__shady||{},d.__shady.nextSibling=e);e&&(e.__shady=e.__shady||{},e.__shady.previousSibling=d);b.__shady.parentNode=
b.__shady.previousSibling=b.__shady.nextSibling=void 0;void 0!==a.__shady.childNodes&&(a.__shady.childNodes=null);if(S(a)){R(a.__shady.root);var g=!0}}La(b);if(c){(d=a&&"slot"===a.localName)&&(g=!0);c.a=c.a||{};c.b=c.b||[];e=c.a;for(var h in e)for(var f=e[h],k=0;k<f.length;k++){var l=f[k],m;a:{for(m=l;m;){if(m==b){m=!0;break a}m=m.parentNode}m=void 0}if(m){f.splice(k,1);var q=c.b.indexOf(l);0<=q&&c.b.splice(q,1);k--;if(q=l.__shady.g)for(l=0;l<q.length;l++){m=q[l];var z=D.parentNode(m);z&&O.removeChild.call(z,
m)}q=!0}}(q||d)&&R(c)}g||(g=u(a)?a.host:a,(!a.__shady.root&&"slot"!==b.localName||g===D.parentNode(b))&&O.removeChild.call(g,b));Ia(a,null,b);return b}function La(a){if(a.__shady&&void 0!==a.__shady.A)for(var b=a.childNodes,c=0,d=b.length,e;c<d&&(e=b[c]);c++)La(e);a.__shady&&(a.__shady.A=void 0)}function Ha(a){var b=a;a&&"slot"===a.localName&&(b=(b=a.__shady&&a.__shady.g)&&b.length?b[0]:Ha(a.nextSibling));return b}function S(a){return(a=a&&a.__shady&&a.__shady.root)&&!!a.b.length}
function Ma(a,b){if("slot"===b)a=a.parentNode,S(a)&&R(a.__shady.root);else if("slot"===a.localName&&"name"===b&&(b=v(a))){var c=a.L,d=Ja(a);if(d!==c){c=b.a[c];var e=c.indexOf(a);0<=e&&c.splice(e,1);c=b.a[d]||(b.a[d]=[]);c.push(a);1<c.length&&(b.a[d]=Ka(c))}R(b)}}function Ia(a,b,c){if(a=a.__shady&&a.__shady.i)b&&a.addedNodes.push(b),c&&a.removedNodes.push(c),Na(a)}
function Oa(a){if(a&&a.nodeType){a.__shady=a.__shady||{};var b=a.__shady.A;void 0===b&&(u(a)?b=a:b=(b=a.parentNode)?Oa(b):a,document.documentElement.contains(a)&&(a.__shady.A=b));return b}}function T(a,b,c){var d=[];Pa(a.childNodes,b,c,d);return d}function Pa(a,b,c,d){for(var e=0,g=a.length,h;e<g&&(h=a[e]);e++){var f;if(f=h.nodeType===Node.ELEMENT_NODE){f=h;var k=b,l=c,m=d,q=k(f);q&&m.push(f);l&&l(q)?f=q:(Pa(f.childNodes,k,l,m),f=void 0)}if(f)break}}var U=null;
function Qa(a,b,c){U||(U=window.ShadyCSS&&window.ShadyCSS.ScopingShim);U&&"class"===b?U.setElementClass(a,c):(O.setAttribute.call(a,b,c),Ma(a,b))}function Ra(a,b){if(a.ownerDocument!==document)return O.importNode.call(document,a,b);var c=O.importNode.call(document,a,!1);if(b){a=a.childNodes;b=0;for(var d;b<a.length;b++)d=Ra(a[b],!0),c.appendChild(d)}return c};var V=[],Sa;function Ta(a){Sa||(Sa=!0,fa(W));V.push(a)}function W(){Sa=!1;for(var a=!!V.length;V.length;)V.shift()();return a}W.list=V;var Ua={};function X(a,b,c){if(a!==Ua)throw new TypeError("Illegal constructor");a=document.createDocumentFragment();a.__proto__=X.prototype;a.J="ShadyRoot";N(b);N(a);a.host=b;a.c=c&&c.mode;b.__shady=b.__shady||{};b.__shady.root=a;b.__shady.R="closed"!==a.c?a:null;a.f=!1;a.b=[];a.a=null;c=D.childNodes(b);for(var d=0,e=c.length;d<e;d++)O.removeChild.call(b,c[d]);return a}X.prototype=Object.create(DocumentFragment.prototype);function R(a){a.f||(a.f=!0,Ta(function(){return Va(a)}))}
function Va(a){if(a.f){for(var b=a;a;){a.f&&(b=a);a:{var c=a;a=c.host.getRootNode();if(u(a))for(var d=c.host.childNodes,e=0;e<d.length;e++)if(c=d[e],"slot"==c.localName)break a;a=void 0}}b._renderRoot()}}
X.prototype._renderRoot=function(){this.f=!1;for(var a=0,b;a<this.b.length;a++){b=this.b[a];var c=b.__shady.assignedNodes;b.__shady.assignedNodes=[];b.__shady.g=[];if(b.__shady.F=c)for(var d=0;d<c.length;d++){var e=c[d];e.__shady.v=e.__shady.assignedSlot;e.__shady.assignedSlot===b&&(e.__shady.assignedSlot=null)}}for(b=this.host.firstChild;b;b=b.nextSibling)Wa(this,b);for(a=0;a<this.b.length;a++){b=this.b[a];if(!b.__shady.assignedNodes.length)for(c=b.firstChild;c;c=c.nextSibling)Wa(this,c,b);c=b.parentNode;
(c=c.__shady&&c.__shady.root)&&c.b.length&&c._renderRoot();Xa(this,b.__shady.g,b.__shady.assignedNodes);if(c=b.__shady.F){for(d=0;d<c.length;d++)c[d].__shady.v=null;b.__shady.F=null;c.length>b.__shady.assignedNodes.length&&(b.__shady.w=!0)}b.__shady.w&&(b.__shady.w=!1,Ya(this,b))}a=this.b;b=[];for(c=0;c<a.length;c++)d=a[c].parentNode,d.__shady&&d.__shady.root||!(0>b.indexOf(d))||b.push(d);for(a=0;a<b.length;a++){c=b[a];d=c===this?this.host:c;e=[];c=c.childNodes;for(var g=0;g<c.length;g++){var h=c[g];
if("slot"==h.localName){h=h.__shady.g;for(var f=0;f<h.length;f++)e.push(h[f])}else e.push(h)}c=void 0;g=D.childNodes(d);h=aa(e,e.length,g,g.length);for(var k=f=0;f<h.length&&(c=h[f]);f++){for(var l=0,m;l<c.j.length&&(m=c.j[l]);l++)D.parentNode(m)===d&&O.removeChild.call(d,m),g.splice(c.index+k,1);k-=c.l}for(k=0;k<h.length&&(c=h[k]);k++)for(f=g[c.index],l=c.index;l<c.index+c.l;l++)m=e[l],O.insertBefore.call(d,m,f),g.splice(l,0,m)}};
function Wa(a,b,c){b.__shady=b.__shady||{};var d=b.__shady.v;b.__shady.v=null;c||(c=(a=a.a[b.slot||"__catchall"])&&a[0]);c?(c.__shady.assignedNodes.push(b),b.__shady.assignedSlot=c):b.__shady.assignedSlot=void 0;d!==b.__shady.assignedSlot&&b.__shady.assignedSlot&&(b.__shady.assignedSlot.__shady.w=!0)}function Xa(a,b,c){for(var d=0,e;d<c.length&&(e=c[d]);d++)"slot"==e.localName?Xa(a,b,e.__shady.assignedNodes):b.push(c[d])}
function Ya(a,b){O.dispatchEvent.call(b,new Event("slotchange"));b.__shady.assignedSlot&&Ya(a,b.__shady.assignedSlot)}function Ja(a){var b=a.name||a.getAttribute("name")||"__catchall";return a.L=b}function Ka(a){return a.sort(function(a,c){a=Za(a);for(var b=Za(c),e=0;e<a.length;e++){c=a[e];var g=b[e];if(c!==g)return a=Array.from(c.parentNode.childNodes),a.indexOf(c)-a.indexOf(g)}})}function Za(a){var b=[];do b.unshift(a);while(a=a.parentNode);return b}
X.prototype.addEventListener=function(a,b,c){"object"!==typeof c&&(c={capture:!!c});c.u=this;this.host.addEventListener(a,b,c)};X.prototype.removeEventListener=function(a,b,c){"object"!==typeof c&&(c={capture:!!c});c.u=this;this.host.removeEventListener(a,b,c)};X.prototype.getElementById=function(a){return T(this,function(b){return b.id==a},function(a){return!!a})[0]||null};var $a=X.prototype;L($a,J,!0);L($a,K,!0);function ab(){this.c=!1;this.addedNodes=[];this.removedNodes=[];this.m=new Set}function Na(a){a.c||(a.c=!0,fa(function(){bb(a)}))}function bb(a){if(a.c){a.c=!1;var b=a.takeRecords();b.length&&a.m.forEach(function(a){a(b)})}}ab.prototype.takeRecords=function(){if(this.addedNodes.length||this.removedNodes.length){var a=[{addedNodes:this.addedNodes,removedNodes:this.removedNodes}];this.addedNodes=[];this.removedNodes=[];return a}return[]};
function cb(a,b){a.__shady=a.__shady||{};a.__shady.i||(a.__shady.i=new ab);a.__shady.i.m.add(b);var c=a.__shady.i;return{M:b,O:c,N:a,takeRecords:function(){return c.takeRecords()}}}function db(a){var b=a&&a.O;b&&(b.m.delete(a.M),b.m.size||(a.N.__shady.i=null))}
function eb(a,b){var c=b.getRootNode();return a.map(function(a){var b=c===a.target.getRootNode();if(b&&a.addedNodes){if(b=Array.from(a.addedNodes).filter(function(a){return c===a.getRootNode()}),b.length)return a=Object.create(a),Object.defineProperty(a,"addedNodes",{value:b,configurable:!0}),a}else if(b)return a}).filter(function(a){return a})};var Y="__eventWrappers"+Date.now(),fb={blur:!0,focus:!0,focusin:!0,focusout:!0,click:!0,dblclick:!0,mousedown:!0,mouseenter:!0,mouseleave:!0,mousemove:!0,mouseout:!0,mouseover:!0,mouseup:!0,wheel:!0,beforeinput:!0,input:!0,keydown:!0,keyup:!0,compositionstart:!0,compositionupdate:!0,compositionend:!0,touchstart:!0,touchend:!0,touchmove:!0,touchcancel:!0,pointerover:!0,pointerenter:!0,pointerdown:!0,pointermove:!0,pointerup:!0,pointercancel:!0,pointerout:!0,pointerleave:!0,gotpointercapture:!0,lostpointercapture:!0,
dragstart:!0,drag:!0,dragenter:!0,dragleave:!0,dragover:!0,drop:!0,dragend:!0,DOMActivate:!0,DOMFocusIn:!0,DOMFocusOut:!0,keypress:!0};function gb(a,b){var c=[],d=a;for(a=a===window?window:a.getRootNode();d;)c.push(d),d=d.assignedSlot?d.assignedSlot:d.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&d.host&&(b||d!==a)?d.host:d.parentNode;c[c.length-1]===document&&c.push(window);return c}
function hb(a,b){if(!u)return a;a=gb(a,!0);for(var c=0,d,e,g,h;c<b.length;c++)if(d=b[c],g=d===window?window:d.getRootNode(),g!==e&&(h=a.indexOf(g),e=g),!u(g)||-1<h)return d}
var ib={get composed(){!1!==this.isTrusted&&void 0===this.o&&(this.o=fb[this.type]);return this.o||!1},composedPath:function(){this.B||(this.B=gb(this.__target,this.composed));return this.B},get target(){return hb(this.currentTarget,this.composedPath())},get relatedTarget(){if(!this.C)return null;this.D||(this.D=gb(this.C,!0));return hb(this.currentTarget,this.D)},stopPropagation:function(){Event.prototype.stopPropagation.call(this);this.s=!0},stopImmediatePropagation:function(){Event.prototype.stopImmediatePropagation.call(this);
this.s=this.H=!0}};function jb(a){function b(b,d){b=new a(b,d);b.o=d&&!!d.composed;return b}da(b,a);b.prototype=a.prototype;return b}var kb={focus:!0,blur:!0};function lb(a,b,c){if(c=b.__handlers&&b.__handlers[a.type]&&b.__handlers[a.type][c])for(var d=0,e;(e=c[d])&&a.target!==a.relatedTarget&&(e.call(b,a),!a.H);d++);}
function mb(a){var b=a.composedPath();Object.defineProperty(a,"currentTarget",{get:function(){return d},configurable:!0});for(var c=b.length-1;0<=c;c--){var d=b[c];lb(a,d,"capture");if(a.s)return}Object.defineProperty(a,"eventPhase",{get:function(){return Event.AT_TARGET}});var e;for(c=0;c<b.length;c++){d=b[c];var g=d.__shady&&d.__shady.root;if(0===c||g&&g===e)if(lb(a,d,"bubble"),d!==window&&(e=d.getRootNode()),a.s)break}}
function nb(a,b,c,d,e,g){for(var h=0;h<a.length;h++){var f=a[h],k=f.type,l=f.capture,m=f.once,q=f.passive;if(b===f.node&&c===k&&d===l&&e===m&&g===q)return h}return-1}
function ob(a,b,c){if(b){if("object"===typeof c){var d=!!c.capture;var e=!!c.once;var g=!!c.passive}else d=!!c,g=e=!1;var h=c&&c.u||this,f=b[Y];if(f){if(-1<nb(f,h,a,d,e,g))return}else b[Y]=[];f=function(d){e&&this.removeEventListener(a,b,c);d.__target||pb(d);if(h!==this){var f=Object.getOwnPropertyDescriptor(d,"currentTarget");Object.defineProperty(d,"currentTarget",{get:function(){return h},configurable:!0})}if(d.composed||-1<d.composedPath().indexOf(h))if(d.target===d.relatedTarget)d.eventPhase===
Event.BUBBLING_PHASE&&d.stopImmediatePropagation();else if(d.eventPhase===Event.CAPTURING_PHASE||d.bubbles||d.target===h){var g="object"===typeof b&&b.handleEvent?b.handleEvent(d):b.call(h,d);h!==this&&(f?(Object.defineProperty(d,"currentTarget",f),f=null):delete d.currentTarget);return g}};b[Y].push({node:this,type:a,capture:d,once:e,passive:g,U:f});kb[a]?(this.__handlers=this.__handlers||{},this.__handlers[a]=this.__handlers[a]||{capture:[],bubble:[]},this.__handlers[a][d?"capture":"bubble"].push(f)):
(this instanceof Window?O.S:O.addEventListener).call(this,a,f,c)}}
function qb(a,b,c){if(b){if("object"===typeof c){var d=!!c.capture;var e=!!c.once;var g=!!c.passive}else d=!!c,g=e=!1;var h=c&&c.u||this,f=void 0;var k=null;try{k=b[Y]}catch(l){}k&&(e=nb(k,h,a,d,e,g),-1<e&&(f=k.splice(e,1)[0].U,k.length||(b[Y]=void 0)));(this instanceof Window?O.T:O.removeEventListener).call(this,a,f||b,c);f&&kb[a]&&this.__handlers&&this.__handlers[a]&&(a=this.__handlers[a][d?"capture":"bubble"],f=a.indexOf(f),-1<f&&a.splice(f,1))}}
function rb(){for(var a in kb)window.addEventListener(a,function(a){a.__target||(pb(a),mb(a))},!0)}function pb(a){a.__target=a.target;a.C=a.relatedTarget;if(p.h){var b=Object.getPrototypeOf(a);if(!b.hasOwnProperty("__patchProto")){var c=Object.create(b);c.V=b;x(c,ib);b.__patchProto=c}a.__proto__=b.__patchProto}else x(a,ib)}var sb=jb(window.Event),tb=jb(window.CustomEvent),ub=jb(window.MouseEvent);function vb(a){var b=a.getRootNode();u(b)&&Va(b);return a.__shady&&a.__shady.assignedSlot||null}
var wb={addEventListener:ob.bind(window),removeEventListener:qb.bind(window)},xb={addEventListener:ob,removeEventListener:qb,appendChild:function(a){return P(this,a)},insertBefore:function(a,b){return P(this,a,b)},removeChild:function(a){return Q(this,a)},replaceChild:function(a,b){P(this,a,b);Q(this,b);return a},cloneNode:function(a){if("template"==this.localName)var b=O.cloneNode.call(this,a);else if(b=O.cloneNode.call(this,!1),a){a=this.childNodes;for(var c=0,d;c<a.length;c++)d=a[c].cloneNode(!0),
b.appendChild(d)}return b},getRootNode:function(){return Oa(this)},get isConnected(){var a=this.ownerDocument;if(a&&a.contains&&a.contains(this)||(a=a.documentElement)&&a.contains&&a.contains(this))return!0;for(a=this;a&&!(a instanceof Document);)a=a.parentNode||(a instanceof X?a.host:void 0);return!!(a&&a instanceof Document)},dispatchEvent:function(a){W();return O.dispatchEvent.call(this,a)}},yb={get assignedSlot(){return vb(this)}},zb={querySelector:function(a){return T(this,function(b){return ca.call(b,
a)},function(a){return!!a})[0]||null},querySelectorAll:function(a){return T(this,function(b){return ca.call(b,a)})}},Ab={assignedNodes:function(a){if("slot"===this.localName){var b=this.getRootNode();u(b)&&Va(b);return this.__shady?(a&&a.flatten?this.__shady.g:this.__shady.assignedNodes)||[]:[]}}},Bb=y({setAttribute:function(a,b){Qa(this,a,b)},removeAttribute:function(a){O.removeAttribute.call(this,a);Ma(this,a)},attachShadow:function(a){if(!this)throw"Must provide a host.";if(!a)throw"Not enough arguments.";
return new X(Ua,this,a)},get slot(){return this.getAttribute("slot")},set slot(a){Qa(this,"slot",a)},get assignedSlot(){return vb(this)}},zb,Ab);Object.defineProperties(Bb,qa);var Cb=y({importNode:function(a,b){return Ra(a,b)},getElementById:function(a){return T(this,function(b){return b.id==a},function(a){return!!a})[0]||null}},zb);Object.defineProperties(Cb,{_activeElement:K.activeElement});
var Db=HTMLElement.prototype.blur,Eb=y({blur:function(){var a=this.__shady&&this.__shady.root;(a=a&&a.activeElement)?a.blur():Db.call(this)}});function Z(a,b){for(var c=Object.getOwnPropertyNames(b),d=0;d<c.length;d++){var e=c[d],g=Object.getOwnPropertyDescriptor(b,e);g.value?a[e]=g.value:Object.defineProperty(a,e,g)}};if(p.G){window.ShadyDOM={inUse:p.G,patch:function(a){return a},isShadyRoot:u,enqueue:Ta,flush:W,settings:p,filterMutations:eb,observeChildren:cb,unobserveChildren:db,nativeMethods:O,nativeTree:D};window.Event=sb;window.CustomEvent=tb;window.MouseEvent=ub;rb();var Fb=window.customElements&&window.customElements.nativeHTMLElement||HTMLElement;Z(window.Node.prototype,xb);Z(window.Window.prototype,wb);Z(window.Text.prototype,yb);Z(window.DocumentFragment.prototype,zb);Z(window.Element.prototype,Bb);Z(window.Document.prototype,
Cb);window.HTMLSlotElement&&Z(window.HTMLSlotElement.prototype,Ab);Z(Fb.prototype,Eb);p.h&&(M(window.Node.prototype),M(window.Text.prototype),M(window.DocumentFragment.prototype),M(window.Element.prototype),M(Fb.prototype),M(window.Document.prototype),window.HTMLSlotElement&&M(window.HTMLSlotElement.prototype));window.ShadowRoot=X};}).call(this);

//# sourceMappingURL=shadydom.min.js.map


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subtractor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _presets = __webpack_require__(8);

var Presets = _interopRequireWildcard(_presets);

__webpack_require__(18);

var _Osc = __webpack_require__(19);

var _Filter = __webpack_require__(20);

var _Envelope = __webpack_require__(21);

var _Oscilloscope = __webpack_require__(22);

var _Observe = __webpack_require__(1);

var _maths = __webpack_require__(0);

var _helpers = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Subtractor = function (_Observable) {
  _inherits(Subtractor, _Observable);

  function Subtractor() {
    _classCallCheck(this, Subtractor);

    var _this = _possibleConstructorReturn(this, (Subtractor.__proto__ || Object.getPrototypeOf(Subtractor)).call(this));

    _this.context = new AudioContext();
    _this.osc1 = new _Observe.Observable();
    _this.osc2 = new _Observe.Observable();
    _this.filter1 = new _Filter.Filter(_this.context);
    _this.filter2 = new _Filter.Filter(_this.context);
    _this.dynamicFilters = [];

    _this.name = '';
    _this.description = '';
    _this.author = '';

    // octave value is used only for the qwerty controls, this value should not be used
    // when MIDI is integrated. 
    _this._octave = 4;

    // here polyphony refers to the number of oscs started for each key press,
    // detune refers to the spread of frequencies across the poly notes
    _this._polyphony = 1;
    _this._detune = 0;

    _this._voices = 4;
    _this._glide = 1;

    _this._activeNotes = {};

    _this.masterGain = _this.context.createGain();

    // static connections
    _this.filter2.filter.connect(_this.masterGain);
    _this.masterGain.connect(_this.context.destination);

    _this.pipeline = _this.pipeline.bind(_this);

    // only perform certain tasks once the DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
      _this.startOscilloscope();
      _this.loadPreset(Presets.Reese);
    });
    return _this;
  }

  _createClass(Subtractor, [{
    key: 'moveNote',
    value: function moveNote(n1, n2) {
      var _this2 = this;

      var voices = this._activeNotes[n1];

      Object.keys(voices).filter(function (i) {
        return voices[i];
      }).forEach(function (voice) {
        Object.keys(voice).forEach(function (v) {
          voices[voice[v]].move(n2, _this2._polyphony, _this2._detune, _this2.context.currentTime + (0, _maths.knobToSeconds)(_this2._glide));
        });
      });

      (0, _helpers.renameObjectKey)(this._activeNotes, n1, n2);
    }
  }, {
    key: 'noteOn',
    value: function noteOn(note) {
      var _this3 = this;

      var activeNoteKeys = Object.keys(this._activeNotes);

      if (activeNoteKeys.length >= this._voices) {
        this.moveNote(activeNoteKeys[0], note);
      } else {
        this._activeNotes[note] = [new _Osc.Osc(this.context, this.osc1), new _Osc.Osc(this.context, this.osc2)].map(function (osc) {
          if (!osc.enabled) {
            return null;
          }
          osc.start(note, _this3._polyphony, _this3._detune).map(_this3.pipeline);
          return osc;
        }).reduce(function (acc, cur, i) {
          return Object.assign(acc, _defineProperty({}, i + 1, cur));
        }, {});
      }
    }
  }, {
    key: 'noteOff',
    value: function noteOff(note) {
      var _this4 = this;

      if (this._activeNotes[note]) {
        var oscs = this._activeNotes[note];

        Object.keys(oscs).filter(function (i) {
          return oscs[i];
        }).forEach(function (oscKey) {
          oscs[oscKey].oscs.forEach(function (o) {
            o.oscEnvelope.reset();
            o.filterEnvelope.reset();
            o.stop(_this4.context.currentTime + (0, _maths.knobToSeconds)(_this4.release));
          });
        });

        delete this._activeNotes[note];
      }
    }

    // route an oscillator thru the pipeline of modifiers.
    // e.g. gains, filter, distortions etc.
    //

  }, {
    key: 'pipeline',
    value: function pipeline(osc) {
      // create a gain node for the envelope
      var gainNode = this.context.createGain();
      gainNode.gain.value = 0;

      // attach an envelope to the gain node
      var oscEnvelope = new _Envelope.Envelope(this.context, gainNode.gain);
      oscEnvelope.maxValue = 1;
      oscEnvelope.minValue = 0;
      oscEnvelope.attack = this.attack;
      oscEnvelope.sustain = this.sustain;
      oscEnvelope.decay = this.decay;
      oscEnvelope.release = this.release;
      oscEnvelope.schedule();

      // create a filter, base it on the global filter
      var filter = new _Filter.Filter(this.context);
      filter.type = this.filter1.frType;
      filter.freq = this.filter1.freq;
      filter.q = this.filter1.q;
      filter.gain = this.filter1.gain;
      this.dynamicFilters.push(filter);

      // attach an envelope to the filter frequency
      var filterEnvelope = new _Envelope.Envelope(this.context, filter.filter.frequency);
      filterEnvelope.maxValue = (0, _maths.knobToFreq)(127);
      filterEnvelope.minValue = (0, _maths.knobToFreq)(0);
      filterEnvelope.attack = this.filterAttack;
      filterEnvelope.sustain = this.filterSustain;
      filterEnvelope.decay = this.filterDecay;
      filterEnvelope.release = this.filterRelease;
      filterEnvelope.amount = this.filterAmount;
      filterEnvelope.schedule();

      // route the osc thru everything we just created 
      osc.connect(gainNode);
      gainNode.connect(filter.filter);
      filter.filter.connect(this.filter2.filter);

      // attach the envelopes to the osc the gain node so it can be reset on noteOff
      osc.oscEnvelope = oscEnvelope;
      osc.filterEnvelope = filterEnvelope;

      // start and return the osc
      osc.start();
      return osc;
    }
  }, {
    key: 'startOscilloscope',
    value: function startOscilloscope() {
      try {
        var canvas = document.getElementById('oscilloscope');
        var oscilloscope = new _Oscilloscope.Oscilloscope(this.context, canvas);
        this.masterGain.connect(oscilloscope.analyzer);
        oscilloscope.start();
      } catch (e) {
        console.log('Failed to start Oscilloscope');
      }
    }
  }, {
    key: 'setPresetFromSelect',
    value: function setPresetFromSelect(preset) {
      this.loadPreset(Presets[preset]);
    }

    // take a preset object and load it into the synth
    //

  }, {
    key: 'loadPreset',
    value: function loadPreset(_ref) {
      var _ref$name = _ref.name,
          name = _ref$name === undefined ? 'init' : _ref$name,
          _ref$author = _ref.author,
          author = _ref$author === undefined ? '' : _ref$author,
          _ref$description = _ref.description,
          description = _ref$description === undefined ? '' : _ref$description,
          _ref$master = _ref.master,
          master = _ref$master === undefined ? {
        gain: 50,
        polyphony: 1,
        detune: 0,
        voices: 4,
        glide: 0
      } : _ref$master,
          _ref$ampEnv = _ref.ampEnv,
          ampEnv = _ref$ampEnv === undefined ? {
        attack: 0,
        decay: 100,
        sustain: 64,
        release: 10
      } : _ref$ampEnv,
          _ref$filterEnv = _ref.filterEnv,
          filterEnv = _ref$filterEnv === undefined ? {
        attack: 0,
        decay: 40,
        sustain: 0,
        release: 40,
        amount: 0
      } : _ref$filterEnv,
          _ref$osc = _ref.osc1,
          osc1 = _ref$osc === undefined ? {
        enabled: 1,
        waveform: 3,
        octave: 0,
        semi: 0,
        detune: 0
      } : _ref$osc,
          _ref$osc2 = _ref.osc2,
          osc2 = _ref$osc2 === undefined ? {
        enabled: 0,
        waveform: 3,
        octave: 0,
        semi: 0,
        detune: 0
      } : _ref$osc2,
          _ref$filter = _ref.filter1,
          filter1 = _ref$filter === undefined ? {
        type: 1,
        freq: 64,
        q: 0.10,
        gain: 0
      } : _ref$filter,
          _ref$filter2 = _ref.filter2,
          filter2 = _ref$filter2 === undefined ? {
        type: 1,
        freq: 127,
        q: 0.10,
        gain: 0
      } : _ref$filter2;

      this.name = name;
      this.author = author;
      this.description = description;
      this.gain = master.gain;
      this.polyphony = master.polyphony;
      this.voices = master.voices;
      this.glide = master.glide;
      this.detune = master.detune;
      this.attack = ampEnv.attack;
      this.decay = ampEnv.decay;
      this.sustain = ampEnv.sustain;
      this.release = ampEnv.release;
      this.filterAttack = filterEnv.attack;
      this.filterDecay = filterEnv.decay;
      this.filterSustain = filterEnv.sustain;
      this.filterRelease = filterEnv.release;
      this.filterAmount = filterEnv.amount;
      this.osc1.enabled = osc1.enabled;
      this.osc1.waveform = osc1.waveform;
      this.osc1.octave = osc1.octave;
      this.osc1.semi = osc1.semi;
      this.osc1.detune = osc1.detune;
      this.osc2.enabled = osc2.enabled;
      this.osc2.waveform = osc2.waveform;
      this.osc2.octave = osc2.octave;
      this.osc2.semi = osc2.semi;
      this.osc2.detune = osc2.detune;
      this.filter1Type = filter1.type;
      this.filter1Freq = filter1.freq;
      this.filter1Q = filter1.q;
      this.filter1Gain = filter1.gain;
      this.filter2.type = filter2.type;
      this.filter2.freq = filter2.freq;
      this.filter2.q = filter2.q;
      this.filter2.gain = filter2.gain;
    }

    // take the current synth settings and return an object
    //

  }, {
    key: 'getPreset',
    value: function getPreset() {
      return {
        'name': this.name,
        'author': this.author,
        'description': this.description,
        'master': {
          'gain': this.gain,
          'polyphony': this.polyphony,
          'detune': this.detune,
          'voices': this.voices,
          'glide': this.glide
        },
        'ampEnv': {
          'attack': this.attack,
          'decay': this.decay,
          'sustain': this.sustain,
          'release': this.release
        },
        'filterEnv': {
          'attack': this.filterAttack,
          'decay': this.filterDecay,
          'sustain': this.filterSustain,
          'release': this.filterRelease,
          'amount': this.filterAmount
        },
        'osc1': {
          'enabled': this.osc1.enabled,
          'waveform': this.osc1.waveform,
          'octave': this.osc1.octave,
          'semi': this.osc1.semi,
          'detune': this.osc1.detune
        },
        'osc2': {
          'enabled': this.osc2.enabled,
          'waveform': this.osc2.waveform,
          'octave': this.osc2.octave,
          'semi': this.osc2.semi,
          'detune': this.osc2.detune
        },
        'filter1': {
          'type': this.filter1Type,
          'freq': this.filter1Freq,
          'q': this.filter1Q,
          'gain': this.filter1Gain
        },
        'filter2': {
          'type': this.filter2.type,
          'freq': this.filter2.freq,
          'q': this.filter2.q,
          'gain': this.filter2.gain
        }
      };
    }

    // trigger an upload dialog load the file contents as a preset
    //

  }, {
    key: 'loadPresetFile',
    value: function loadPresetFile() {
      var _this5 = this;

      var fileReader = new FileReader();
      fileReader.addEventListener('load', function () {
        var fileContents = fileReader.result;
        var preset = JSON.parse(fileContents);
        _this5.loadPreset(preset);
      });

      var input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json';
      input.addEventListener('change', function () {
        fileReader.readAsText(input.files[0]);
      });

      input.click();
    }

    // download the current preset as JSON file
    //

  }, {
    key: 'savePresetFile',
    value: function savePresetFile() {
      var preset = this.getPreset();
      var json = JSON.stringify(preset, null, ' ');
      var blob = new Blob([json], { 'type': 'application/json' });
      var objectURL = URL.createObjectURL(blob);

      var a = document.createElement('a');
      a.download = (preset.name || 'Untitled') + '.json';
      a.href = objectURL;

      a.click();
    }
  }, {
    key: 'octave',
    set: function set(value) {
      this._octave = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._octave;
    }
  }, {
    key: 'polyphony',
    set: function set(value) {
      this._polyphony = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._polyphony;
    }
  }, {
    key: 'detune',
    set: function set(value) {
      this._detune = value * .01;
      this.notifyObservers();
    },
    get: function get() {
      return this._detune * 100;
    }
  }, {
    key: 'gain',
    set: function set(value) {
      this.masterGain.gain.value = value * .01;
      this.notifyObservers();
    },
    get: function get() {
      return this.masterGain.gain.value * 100;
    }

    // amp envelope getter and setters

  }, {
    key: 'attack',
    set: function set(value) {
      this._attack = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._attack;
    }
  }, {
    key: 'decay',
    set: function set(value) {
      this._decay = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._decay;
    }
  }, {
    key: 'sustain',
    set: function set(value) {
      this._sustain = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._sustain;
    }
  }, {
    key: 'release',
    set: function set(value) {
      this._release = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._release;
    }

    // filter 1

  }, {
    key: 'filter1Type',
    set: function set(value) {
      this.filter1.type = (0, _helpers.intToFilter)(value);
      this.dynamicFilters.forEach(function (filter) {
        filter.type = (0, _helpers.intToFilter)(value);
      });
      this.notifyObservers();
    },
    get: function get() {
      return this.filter1.type;
    }
  }, {
    key: 'filter1FrType',
    get: function get() {
      return this.filter1.frType;
    }
  }, {
    key: 'filter1Freq',
    set: function set(value) {
      this.filter1.freq = value;
      this.dynamicFilters.forEach(function (filter) {
        filter.freq = value;
      });
      this.notifyObservers();
    },
    get: function get() {
      return this.filter1.freq;
    }
  }, {
    key: 'filter1FrFreq',
    get: function get() {
      return this.filter1.frFreq;
    }
  }, {
    key: 'filter1Q',
    set: function set(value) {
      this.filter1.q = value;
      this.dynamicFilters.forEach(function (filter) {
        filter.q = value;
      });
      this.notifyObservers();
    },
    get: function get() {
      return this.filter1.q;
    }
  }, {
    key: 'filter1Gain',
    set: function set(value) {
      this.filter1.gain = value;
      this.dynamicFilters.forEach(function (filter) {
        filter.gain = value;
      });
      this.notifyObservers();
    },
    get: function get() {
      return this.filter1.gain;
    }

    // filter envelope getters and setters

  }, {
    key: 'filterAttack',
    set: function set(value) {
      this._filterAttack = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._filterAttack;
    }
  }, {
    key: 'filterDecay',
    set: function set(value) {
      this._filterDecay = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._filterDecay;
    }
  }, {
    key: 'filterSustain',
    set: function set(value) {
      this._filterSustain = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._filterSustain;
    }
  }, {
    key: 'filterRelease',
    set: function set(value) {
      this._filterRelease = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._filterRelease;
    }
  }, {
    key: 'filterAmount',
    set: function set(value) {
      this._filterAmount = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._filterAmount;
    }
  }, {
    key: 'voices',
    get: function get() {
      return this._voices;
    },
    set: function set(value) {
      this._voices = value;
    }
  }, {
    key: 'glide',
    get: function get() {
      return this._glide;
    },
    set: function set(value) {
      this._glide = value;
    }
  }]);

  return Subtractor;
}(_Observe.Observable);

exports.Subtractor = Subtractor;

window.Subtractor = Subtractor;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BellsOfGuidia = exports.ElectroFifth = exports.ElectroBass = exports.Reese = exports.DarkBass = exports.Plucky = exports.SuperFunk = exports.Acid = exports.Init = undefined;

var _Init = __webpack_require__(9);

var _Init2 = _interopRequireDefault(_Init);

var _Acid = __webpack_require__(10);

var _Acid2 = _interopRequireDefault(_Acid);

var _SuperFunk = __webpack_require__(11);

var _SuperFunk2 = _interopRequireDefault(_SuperFunk);

var _Plucky = __webpack_require__(12);

var _Plucky2 = _interopRequireDefault(_Plucky);

var _DarkBass = __webpack_require__(13);

var _DarkBass2 = _interopRequireDefault(_DarkBass);

var _ElectroBass = __webpack_require__(14);

var _ElectroBass2 = _interopRequireDefault(_ElectroBass);

var _ElectroFifth = __webpack_require__(15);

var _ElectroFifth2 = _interopRequireDefault(_ElectroFifth);

var _Reese = __webpack_require__(16);

var _Reese2 = _interopRequireDefault(_Reese);

var _BellsOfGuidia = __webpack_require__(17);

var _BellsOfGuidia2 = _interopRequireDefault(_BellsOfGuidia);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Init = _Init2.default;
exports.Acid = _Acid2.default;
exports.SuperFunk = _SuperFunk2.default;
exports.Plucky = _Plucky2.default;
exports.DarkBass = _DarkBass2.default;
exports.Reese = _Reese2.default;
exports.ElectroBass = _ElectroBass2.default;
exports.ElectroFifth = _ElectroFifth2.default;
exports.BellsOfGuidia = _BellsOfGuidia2.default;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {"name":"Init","author":"Subtractor Team","description":""}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {"name":"init","author":"","description":"","master":{"gain":50,"polyphony":1,"detune":0,"voices":4,"glide":0},"ampEnv":{"attack":0,"decay":100,"sustain":64,"release":10},"filterEnv":{"attack":0,"decay":45,"sustain":0,"release":40,"amount":42},"osc1":{"enabled":1,"waveform":3,"octave":-2,"semi":0,"detune":0},"osc2":{"enabled":0,"waveform":4,"octave":0,"semi":0,"detune":0},"filter1":{"type":1,"freq":15,"q":15,"gain":0},"filter2":{"type":2,"freq":10,"q":0.1,"gain":0}}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {"name":"Super Funk","author":"Jon Sakas","description":"Play chords!","master":{"gain":20,"polyphony":4,"detune":17,"voices":4,"glide":0},"ampEnv":{"attack":0,"decay":100,"sustain":64,"release":35},"filterEnv":{"attack":61,"decay":53,"sustain":0,"release":35,"amount":40},"osc1":{"enabled":1,"waveform":3,"octave":0,"semi":0,"detune":0},"osc2":{"enabled":1,"waveform":3,"octave":2,"semi":0,"detune":32},"filter1":{"type":1,"freq":10,"q":0,"gain":0}}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {"name":"Plucky","author":"Jon Sakas","description":"A little pluck","master":{"gain":50,"polyphony":1,"detune":0,"voices":4,"glide":0},"ampEnv":{"attack":0,"decay":36,"sustain":24,"release":52},"filterEnv":{"attack":0,"decay":45,"sustain":0,"release":40,"amount":127},"osc1":{"enabled":1,"waveform":3,"octave":0,"semi":0,"detune":0},"osc2":{"enabled":0,"waveform":3,"octave":0,"semi":0,"detune":0},"filter1":{"type":1,"freq":10,"q":0.1,"gain":0}}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {"name":"Dark Bass","author":"Jon Sakas","description":"Not quite a reese but getting there","master":{"gain":30,"polyphony":2,"detune":11,"voices":4,"glide":0},"ampEnv":{"attack":0,"decay":100,"sustain":64,"release":10},"filterEnv":{"attack":46,"decay":74,"sustain":0,"release":40,"amount":0},"osc1":{"enabled":1,"waveform":2,"octave":-2,"semi":0,"detune":0},"osc2":{"enabled":1,"waveform":2,"octave":-1,"semi":0,"detune":5},"filter1":{"type":1,"freq":45,"q":0.1,"gain":0}}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {"name":"Electro Bass","author":"Jon Sakas","description":"A bit of whomp","master":{"gain":50,"polyphony":1,"detune":0,"voices":4,"glide":0},"ampEnv":{"attack":0,"decay":100,"sustain":64,"release":10},"filterEnv":{"attack":52,"decay":43,"sustain":0,"release":40,"amount":40},"osc1":{"enabled":1,"waveform":3,"octave":-2,"semi":0,"detune":0},"osc2":{"enabled":1,"waveform":2,"octave":-2,"semi":0,"detune":0},"filter1":{"type":1,"freq":0,"q":0.10000000149011612,"gain":0}}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {"name":"Electro Fifth","author":"Jon Sakas","description":"A fatty fifth","master":{"gain":50,"polyphony":1,"detune":0,"voices":4,"glide":0},"ampEnv":{"attack":0,"decay":100,"sustain":64,"release":23},"filterEnv":{"attack":0,"decay":40,"sustain":0,"release":40,"amount":0},"osc1":{"enabled":1,"waveform":3,"octave":-2,"semi":0,"detune":0},"osc2":{"enabled":1,"waveform":3,"octave":0,"semi":7,"detune":0},"filter1":{"type":1,"freq":127,"q":0.10000000149011612,"gain":0}}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {"name":"init","author":"","description":"","master":{"gain":50,"polyphony":2,"detune":10,"voices":1,"glide":38},"ampEnv":{"attack":0,"decay":100,"sustain":64,"release":48},"filterEnv":{"attack":0,"decay":40,"sustain":0,"release":40,"amount":0},"osc1":{"enabled":1,"waveform":3,"octave":-2,"semi":0,"detune":0},"osc2":{"enabled":0,"waveform":3,"octave":0,"semi":0,"detune":0},"filter1":{"type":1,"freq":64,"q":0.10000000149011612,"gain":0},"filter2":{"type":1,"freq":127,"q":0.10000000149011612,"gain":0}}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {"name":"Bells of Guidia","author":"Jon Sakas","description":"","master":{"gain":25,"polyphony":1,"detune":0,"voices":4,"glide":0},"ampEnv":{"attack":0,"decay":34,"sustain":64,"release":61},"filterEnv":{"attack":0,"decay":40,"sustain":0,"release":40,"amount":0},"osc1":{"enabled":1,"waveform":1,"octave":2,"semi":0,"detune":0},"osc2":{"enabled":0,"waveform":3,"octave":0,"semi":0,"detune":0},"filter1":{"type":1,"freq":127,"q":0.1,"gain":0}}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Osc = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _maths = __webpack_require__(0);

var _helpers = __webpack_require__(3);

var _Observe = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Osc = function (_Observable) {
  _inherits(Osc, _Observable);

  function Osc(audioContext, options) {
    _classCallCheck(this, Osc);

    var _this = _possibleConstructorReturn(this, (Osc.__proto__ || Object.getPrototypeOf(Osc)).call(this));

    _this.audioContext = audioContext;
    _this._enabled = options.enabled || false;
    _this._waveform = (0, _helpers.intToWaveform)(options.waveform) || 'sine';
    _this._octave = options.octave || 0;
    _this._semi = options.semi || 0;
    _this._detune = options.detune || 0;
    _this._oscs = [];
    return _this;
  }

  _createClass(Osc, [{
    key: 'start',
    value: function start(note) {
      var polyphony = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var detune = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var shiftedNote = note + this._octave * 12 + this._semi;
      var baseFreq = (0, _maths.getNoteFreq)(shiftedNote);
      var freqs = (0, _maths.getFrequencySpread)(baseFreq, polyphony, detune * 10);

      this._oscs = freqs.map(this.startFreqOscillator.bind(this));
      return this._oscs;
    }
  }, {
    key: 'move',
    value: function move(note) {
      var polyphony = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var detune = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var time = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      var shiftedNote = note + this._octave * 12 + this._semi;
      var baseFreq = (0, _maths.getNoteFreq)(shiftedNote);
      var freqs = (0, _maths.getFrequencySpread)(baseFreq, polyphony, detune * 10);

      this._oscs.forEach(function (osc, i) {
        osc.frequency.linearRampToValueAtTime(freqs[i], time);
      });
    }
  }, {
    key: 'startFreqOscillator',
    value: function startFreqOscillator(f) {
      var osc = this.audioContext.createOscillator();
      osc.type = this._waveform;
      osc.frequency.value = f;
      osc.detune.value = this._detune;
      return osc;
    }
  }, {
    key: 'enabled',
    set: function set(value) {
      this._enabled = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._enabled;
    }
  }, {
    key: 'waveform',
    set: function set(value) {
      if (typeof value == 'number') {
        this._waveform = (0, _helpers.intToWaveform)(value);
      } else {
        this._waveform = value;
      }

      this.notifyObservers();
    },
    get: function get() {
      return (0, _helpers.waveformToInt)(this._waveform);
    }
  }, {
    key: 'frWaveform',
    get: function get() {
      return this._waveform;
    }
  }, {
    key: 'octave',
    set: function set(value) {
      this._octave = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._octave;
    }
  }, {
    key: 'semi',
    set: function set(value) {
      this._semi = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._semi;
    }
  }, {
    key: 'detune',
    set: function set(value) {
      this._detune = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._detune;
    }
  }, {
    key: 'oscs',
    get: function get() {
      return this._oscs;
    }
  }]);

  return Osc;
}(_Observe.Observable);

exports.Osc = Osc;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Filter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(3);

var _maths = __webpack_require__(0);

var _Observe = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filter = function (_Observable) {
  _inherits(Filter, _Observable);

  function Filter(context) {
    _classCallCheck(this, Filter);

    var _this = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this));

    _this.context = context;
    _this._filter = context.createBiquadFilter();
    _this.freq = 127;
    _this.type = 'lowpass';
    return _this;
  }

  _createClass(Filter, [{
    key: 'filter',
    get: function get() {
      return this._filter;
    }
  }, {
    key: 'type',
    set: function set(value) {
      if (typeof value == 'string') {
        this._filter.type = value;
      } else if (typeof value == 'number') {
        this._filter.type = (0, _helpers.intToFilter)(value);
      }
      this.notifyObservers();
    },
    get: function get() {
      return (0, _helpers.filterToInt)(this._filter.type);
    }
  }, {
    key: 'frType',
    get: function get() {
      return this._filter.type;
    }
  }, {
    key: 'freq',
    set: function set(value) {
      this._filter.frequency.value = (0, _maths.knobToFreq)(value);
      this.notifyObservers();
    },
    get: function get() {
      return (0, _maths.freqToKnob)(this._filter.frequency.value);
    }
  }, {
    key: 'frFreq',
    get: function get() {
      return this._filter.frequency.value;
    }
  }, {
    key: 'q',
    set: function set(value) {
      this._filter.Q.value = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._filter.Q.value;
    }
  }, {
    key: 'gain',
    set: function set(value) {
      this._filter.gain.value = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._filter.gain.value;
    }
  }]);

  return Filter;
}(_Observe.Observable);

exports.Filter = Filter;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Envelope = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observe = __webpack_require__(1);

var _maths = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Envelope = function (_Observable) {
  _inherits(Envelope, _Observable);

  function Envelope(context, audioParam) {
    _classCallCheck(this, Envelope);

    var _this = _possibleConstructorReturn(this, (Envelope.__proto__ || Object.getPrototypeOf(Envelope)).call(this));

    _this.context = context;
    _this.audioParam = audioParam;
    _this.startValue = audioParam.value;
    _this._maxValue = 1;
    _this._minValue = 0;
    _this._attack = 0;
    _this._decay = 40;
    _this._sustain = 0;
    _this._release = 40;
    _this._amount = 127;
    return _this;
  }

  // schedule handles the ADS of the ADSR envelope
  //


  _createClass(Envelope, [{
    key: 'schedule',
    value: function schedule() {
      var baseValue = this.startValue;

      var amount = this.amount / 127;
      var sustainAmount = this.sustain * (100 / 127) * .01;

      var rampTo = baseValue + (this.maxValue - baseValue) * amount;
      var sustainTo = baseValue + (this.maxValue - baseValue) * sustainAmount;

      // start at the current value
      this.audioParam.setValueAtTime(this.startValue, this.context.currentTime);

      // ramp up
      this.audioParam.linearRampToValueAtTime(rampTo, this.context.currentTime + (0, _maths.knobToSeconds)(this.attack));

      // ramp down to sustain value
      this.audioParam.linearRampToValueAtTime(sustainTo,
      // we have to add an imperceptible amount of time (.01) for this to work properly when decay is 0
      this.context.currentTime + (0, _maths.knobToSeconds)(this.attack) + .01 + (0, _maths.knobToSeconds)(this.decay));
    }

    // reset handles the R of the ADSR envelope
    //
    // in Firefox, this does not current work properly because cancelAndHoldAtTime is not available yet
    // 

  }, {
    key: 'reset',
    value: function reset() {
      // cancelAndHoldAtTime is not available in Firefox yet
      if (this.audioParam.cancelAndHoldAtTime) {
        this.audioParam.cancelAndHoldAtTime(this.context.currentTime);
      }

      // start decay from current value to min
      this.audioParam.linearRampToValueAtTime(this.startValue, this.context.currentTime + (0, _maths.knobToSeconds)(this._release));
    }
  }, {
    key: 'attack',
    set: function set(value) {
      this._attack = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._attack;
    }
  }, {
    key: 'decay',
    set: function set(value) {
      this._decay = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._decay;
    }
  }, {
    key: 'sustain',
    set: function set(value) {
      this._sustain = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._sustain;
    }
  }, {
    key: 'release',
    set: function set(value) {
      this._release = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._release;
    }
  }, {
    key: 'amount',
    set: function set(value) {
      this._amount = value;
      this.notifyObservers();
    },
    get: function get() {
      return this._amount;
    }
  }, {
    key: 'minValue',
    set: function set(value) {
      this._minValue = value;
    },
    get: function get() {
      return this._minValue;
    }
  }, {
    key: 'maxValue',
    set: function set(value) {
      this._maxValue = value;
    },
    get: function get() {
      return this._maxValue;
    }
  }]);

  return Envelope;
}(_Observe.Observable);

exports.Envelope = Envelope;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Oscilloscope = function () {
  function Oscilloscope(audioContext, canvas) {
    var _this = this;

    _classCallCheck(this, Oscilloscope);

    this.audioContext = audioContext;
    this.analyzer = audioContext.createAnalyser();
    this.canvas = canvas;
    this.getRect();
    this.draw = this.draw.bind(this);

    window.addEventListener('resize', function () {
      return _this.getRect();
    });
  }

  _createClass(Oscilloscope, [{
    key: 'draw',
    value: function draw() {
      requestAnimationFrame(this.draw);
      var canvasContext = this.canvas.getContext('2d');

      this.analyzer.getByteTimeDomainData(this.analyzerDataArray);

      canvasContext.fillStyle = 'rgb(255, 255, 255)';
      canvasContext.fillRect(0, 0, this.width, this.height);
      canvasContext.lineWidth = 2;
      canvasContext.strokeStyle = 'rgb(0, 0, 0)';
      canvasContext.beginPath();

      var sliceWidth = Number(this.width) * 1.0 / this.analyzerBufferLength;
      var x = 0;
      for (var i = 0; i < this.analyzerBufferLength; i++) {
        var v = this.analyzerDataArray[i] / 128.0;
        var y = v * this.height / 2;
        if (i === 0) {
          canvasContext.moveTo(x, y);
        } else {
          canvasContext.lineTo(x, y);
        }
        x += sliceWidth;
      }

      canvasContext.lineTo(this.width, this.height / 2);
      canvasContext.stroke();
    }
  }, {
    key: 'getRect',
    value: function getRect() {
      this.canvasRect = this.canvas.getBoundingClientRect();
      this.width = this.canvasRect.width;
      this.height = this.canvasRect.height;
      this.canvas.setAttribute('width', this.width);
      this.canvas.setAttribute('height', this.height);
    }
  }, {
    key: 'start',
    value: function start() {
      this.analyzer.fftSize = 2048;
      this.analyzerBufferLength = this.analyzer.frequencyBinCount;
      this.analyzerDataArray = new Uint8Array(this.analyzerBufferLength);
      this.draw();
    }
  }]);

  return Oscilloscope;
}();

exports.Oscilloscope = Oscilloscope;

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_maths__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_maths___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_maths__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sass_fader_scss__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sass_fader_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__sass_fader_scss__);



class Fader extends HTMLElement {
  connectedCallback() {
    // if observable and bind attributes are preset, register this element as an observer
    this.observable = eval(this.getAttribute('observe'));
    this.bind = this.getAttribute('bind');
    this.label = this.getAttribute('label');

    if (this.observable && this.bind) {
      this.observable.registerObserver(this);
    }

    this.id = this.getAttribute('id');
    this.name = this.getAttribute('name');
    this.min = this.getAttribute('min');
    this.max = this.getAttribute('max');
    this.value = this.getAttribute('value');
    this.template = `
      <label for="fader__input" class="fader" id="fader">
        <input class="fader__input" id="fader__input" type="range" 
          min="${this.min}" max="${this.max}" value="${this.value}" 
        />
        <div class="fader__control" id="fader__control">
          <div class="fader__range" id="fader__range"></div>
          <div class="fader__knob" id="fader__knob"></div>
        </div>
        <div class="fader__name" id="fader__name">${this.name}</div>
        <div class="fader__value" id="fader__value"></div>
      </label>
    `;

    // create shadow dom
    this.shadow = this.attachShadow({ 'mode': 'open' });

    // create style sheet node
    this.stylesheet = document.createElement('style');
    this.stylesheet.type = 'text/css';
    this.stylesheet.textContent = __WEBPACK_IMPORTED_MODULE_1__sass_fader_scss___default.a.toString();

    // create dom nodes from template
    this.templateDOM = document.createRange().createContextualFragment(this.template);

    // inject nodes into shadow dom
    this.shadow.appendChild(this.stylesheet);
    this.shadow.appendChild(this.templateDOM);
    // ^^ DOM is now constructed

    this.fader = this.shadow.getElementById('fader');
    this.faderControl = this.shadow.getElementById('fader__control');
    this.faderKnob = this.shadow.getElementById('fader__knob');
    this.faderRange = this.shadow.getElementById('fader__range');
    this.faderInput = this.shadow.getElementById('fader__input');
    this.faderValue = this.shadow.getElementById('fader__value');

    this.rangeRect = this.faderRange.getBoundingClientRect();
    this.knobRect = this.faderKnob.getBoundingClientRect();
    this.maxTop = this.rangeRect.height - this.knobRect.height;

    this.setupEvents();
  }

  setupEvents() {
    this.faderKnob.addEventListener('mousedown', e => {
      this.faderInput.dispatchEvent(new Event('focus'));
      this.faderKnob.style.transition = 'none';
      const currentValue = parseInt(this.faderInput.value);
      const boundMousemove = this.mousemove.bind(e, this, e.clientX, e.clientY, currentValue);
      document.addEventListener('mousemove', boundMousemove);
      document.addEventListener('mouseup', () => {
        this.faderKnob.style.transition = '';
        document.removeEventListener('mousemove', boundMousemove);
      });
    });

    this.faderInput.addEventListener('input', e => {
      const inputValue = parseInt(e.target.value);
      this.setTop(inputValue);
      this.faderValue.innerText = this.observable[this.label] || parseInt(inputValue);
      this.observable[this.bind] = parseInt(inputValue);
    });
  }

  notify(observable) {
    this.faderInput.value = this.observable[this.bind];
    this.faderValue.innerText = this.observable[this.label] || parseInt(this.observable[this.bind]);
    this.setTop(this.observable[this.bind]);
  }

  setTop(inputValue) {
    const inputMax = parseInt(this.faderInput.max);
    const inputMin = parseInt(this.faderInput.min);

    const percent = Object(__WEBPACK_IMPORTED_MODULE_0__utils_maths__["pointToPercent"])(inputMin, inputMax, inputValue);
    const top = this.maxTop * (1 - percent);

    this.faderKnob.style.top = `${parseInt(top)}px`;
  }

  mousemove(_this, x, y, oldValue, e) {
    const yDiff = e.clientY - parseInt(y);
    const range = _this.max - _this.min;
    const changeInterval = range / _this.rangeRect.height;

    let newValue = oldValue - changeInterval * yDiff;
    if (newValue > _this.max) {
      newValue = _this.max;
    }
    if (newValue < _this.min) {
      newValue = _this.min;
    }

    _this.faderInput.value = newValue;
    _this.faderInput.dispatchEvent(new Event('input'));
  }
}

window.customElements.define('x-fader', Fader);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".fader {\n  display: inline-flex;\n  align-items: center;\n  flex-direction: column;\n  position: relative;\n  border: 1px solid black;\n  border-radius: 3px;\n  padding: 3px; }\n  .fader__input:focus + .fader__control .fader__knob {\n    background: #94d500; }\n  .fader__control {\n    position: relative;\n    width: 20px;\n    height: 100px; }\n  .fader__range {\n    width: 2px;\n    border-radius: 1px;\n    box-sizing: border-box;\n    position: relative;\n    left: 50%;\n    transform: translateX(-50%);\n    height: 100px;\n    background: black; }\n  .fader__knob {\n    position: absolute;\n    top: 0;\n    transition: top .3s;\n    width: 20px;\n    height: 10px;\n    border-radius: 3px;\n    border: 1px solid black;\n    background: white;\n    box-sizing: border-box; }\n  .fader__name, .fader__value {\n    font-family: sans-serif;\n    font-size: 10px; }\n    .fader__name::selection, .fader__value::selection {\n      background: none; }\n  .fader__input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n    overflow: hidden; }\n", ""]);

// exports


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_keyboard__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_keyboard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_keyboard__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sass_keyboard_scss__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sass_keyboard_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__sass_keyboard_scss__);



class Keyboard extends HTMLElement {
  connectedCallback() {
    // if observable and bind attributes are preset, register this element as an observer
    this.observable = eval(this.getAttribute('observe'));
    this.bind = this.getAttribute('bind');

    if (this.observable && this.bind) {
      this.observable.registerObserver(this);
    }

    this.id = this.getAttribute('id');
    this.name = this.getAttribute('name');

    this.template = `
      <svg id="keyboard" class="keyboard" viewBox="0, 0, 44, 12" >
        <rect id="key-0" x="0" width="4" height="10" class="keyboard__white_key" />
        <rect id="key-2" x="4" width="4" height="10" class="keyboard__white_key" />
        <rect id="key-4" x="8" width="4" height="10" class="keyboard__white_key" />

        <rect id="key-1" x="3" width="2" height="6" class="keyboard__black_key" />
        <rect id="key-3" x="7" width="2" height="6" class="keyboard__black_key" />

        <rect id="key-5" x="12" width="4" height="10" class="keyboard__white_key" />
        <rect id="key-7" x="16" width="4" height="10" class="keyboard__white_key" />
        <rect id="key-9" x="20" width="4" height="10" class="keyboard__white_key" />
        <rect id="key-11" x="24" width="4" height="10" class="keyboard__white_key" />

        <rect id="key-6" x="15" width="2" height="6" class="keyboard__black_key" />
        <rect id="key-8" x="19" width="2" height="6" class="keyboard__black_key" />
        <rect id="key-10" x="23" width="2" height="6" class="keyboard__black_key" />

        <rect id="key-12" x="28" width="4" height="10" class="keyboard__white_key" />
        <rect id="key-14" x="32" width="4" height="10" class="keyboard__white_key" />
        <rect id="key-16" x="36" width="4" height="10" class="keyboard__white_key" />

        <rect id="key-13" x="31" width="2" height="6" class="keyboard__black_key" />
        <rect id="key-15" x="35" width="2" height="6" class="keyboard__black_key" />

        <rect id="key-17" x="40" width="4" height="10" class="keyboard__white_key" />

        <rect id="octave" y="11" width="8" height="1" class="keyboard__octave_indicator" />        
      </svg>
    `;

    // create shadow dom
    this.shadow = this.attachShadow({ 'mode': 'open' });

    // create style sheet node
    this.stylesheet = document.createElement('style');
    this.stylesheet.type = 'text/css';
    this.stylesheet.textContent = __WEBPACK_IMPORTED_MODULE_1__sass_keyboard_scss___default.a.toString();

    // create dom nodes from template
    this.templateDOM = document.createRange().createContextualFragment(this.template);

    // inject nodes into shadow dom
    this.shadow.appendChild(this.stylesheet);
    this.shadow.appendChild(this.templateDOM);
    // ^^ DOM is now constructed

    this.keys = [...new Array(__WEBPACK_IMPORTED_MODULE_0__utils_keyboard__["keyboardKeys"].size)].map((_, i) => this.shadow.getElementById(`key-${i}`));
    this.octaveIndicator = this.shadow.getElementById('octave');

    this.handleInput();
  }

  handleInput() {
    let keyWasPressed = [];
    let noteWasPressed = [];

    this.keys.forEach(key => {
      key.addEventListener('mousedown', eMouseDown => {
        const note = parseInt(eMouseDown.target.id.replace('key-', ''));
        if (note >= 0 && !noteWasPressed[note]) {
          this.keys[note].classList.add('keyboard__pressed');

          const n = note + this.observable.octave * 12;

          const releaseThisKey = () => {
            this.keys[note].classList.remove('keyboard__pressed');
            this.observable.noteOff(n);
            window.removeEventListener('mouseup', releaseThisKey);
            noteWasPressed[note] = false;
          };
          window.addEventListener('mouseup', releaseThisKey);
          noteWasPressed[note] = true;
        }
      });
    });

    window.addEventListener('keydown', eKeyDown => {
      const note = __WEBPACK_IMPORTED_MODULE_0__utils_keyboard__["keyboardKeys"].get(eKeyDown.key);
      if (note >= 0 && !noteWasPressed[note]) {
        this.keys[note].classList.add('keyboard__pressed');
        const n = note + this.observable.octave * 12;

        this.observable.noteOn(n);

        const unPressThisKey = eNoteKeyUp => {
          if (note === __WEBPACK_IMPORTED_MODULE_0__utils_keyboard__["keyboardKeys"].get(eNoteKeyUp.key)) {
            this.keys[note].classList.remove('keyboard__pressed');
            this.observable.noteOff(n);
            window.removeEventListener('keyup', unPressThisKey);
          }
        };
        window.addEventListener('keyup', unPressThisKey);
      }

      if (eKeyDown.key == 'z' && this.observable.octave > 0) {
        this.observable.octave--;
      }
      if (eKeyDown.key == 'x' && this.observable.octave < 12) {
        this.observable.octave++;
      }

      noteWasPressed[note] = true;
      keyWasPressed[eKeyDown.key] = true;
    });
    window.addEventListener('keyup', eKeyUp => {
      const note = __WEBPACK_IMPORTED_MODULE_0__utils_keyboard__["keyboardKeys"].get(eKeyUp.key);
      noteWasPressed[note] = false;
      keyWasPressed[eKeyUp.key] = false;
    });
  }

  notify(observable) {
    this.setOctaveIndicator(observable.octave);
  }

  setOctaveIndicator() {
    // this should be calculated better
    this.octaveIndicator.setAttribute('x', this.observable.octave * 3);
  }

}

window.customElements.define('x-keyboard', Keyboard);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var keyboardKeys = new Map([['a', 0], ['w', 1], ['s', 2], ['e', 3], ['d', 4], ['f', 5], ['t', 6], ['g', 7], ['y', 8], ['h', 9], ['u', 10], ['j', 11], ['k', 12], ['o', 13], ['l', 14], ['p', 15], [';', 16], ['\'', 17]]);

exports.keyboardKeys = keyboardKeys;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".keyboard {\n  display: block;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100px;\n  margin-top: 5px; }\n  .keyboard__white_key {\n    fill: white;\n    stroke: black;\n    stroke-width: .2; }\n  .keyboard__black_key {\n    fill: #464664;\n    stroke: black;\n    stroke-width: .2; }\n  .keyboard__pressed {\n    fill: #c2d3b0; }\n  .keyboard__octave_indicator {\n    fill: #e8f1e0;\n    stroke: green;\n    stroke-width: .2; }\n", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_maths__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_maths___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_maths__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sass_knob_scss__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sass_knob_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__sass_knob_scss__);



class Knob extends HTMLElement {
  connectedCallback() {
    // if observable and bind attributes are preset, register this element as an observer
    this.observable = eval(this.getAttribute('observe'));
    this.bind = this.getAttribute('bind');
    this.label = this.getAttribute('label');

    if (this.observable && this.bind) {
      this.observable.registerObserver(this);
    }

    this.id = this.getAttribute('id');
    this.name = this.getAttribute('name');
    this.min = this.getAttribute('min');
    this.max = this.getAttribute('max');
    this.value = this.getAttribute('value');
    this.template = `
      <label for="knob__input" class="knob" id="knob">
        <input class="knob__input" id="knob__input" type="range" 
          min="${this.min}" max="${this.max}" value="${this.value}" 
        />
        <div class="knob__control" id="knob__control">
          <div class="knob__knob" id="knob__knob"></div>
        </div>
        <div class="knob__name" id="knob__name">${this.name}</div>
        <div class="knob__value" id="knob__value"></div>
      </label>
    `;

    // create shadow dom
    this.shadow = this.attachShadow({ 'mode': 'open' });

    // create style sheet node
    this.stylesheet = document.createElement('style');
    this.stylesheet.type = 'text/css';
    this.stylesheet.textContent = __WEBPACK_IMPORTED_MODULE_1__sass_knob_scss___default.a.toString();

    // create dom nodes from template
    this.templateDOM = document.createRange().createContextualFragment(this.template);

    // inject nodes into shadow dom
    this.shadow.appendChild(this.stylesheet);
    this.shadow.appendChild(this.templateDOM);
    // ^^ DOM is now constructed

    this.knob = this.shadow.getElementById('knob');
    this.knobControl = this.shadow.getElementById('knob__control');
    this.knobKnob = this.shadow.getElementById('knob__knob');
    this.knobInput = this.shadow.getElementById('knob__input');
    this.knobValue = this.shadow.getElementById('knob__value');

    this.knobRect = this.knobKnob.getBoundingClientRect();

    this.setupEvents();
  }

  setupEvents() {
    this.knobKnob.addEventListener('mousedown', e => {
      this.knobInput.dispatchEvent(new Event('focus'));
      this.knobKnob.style.transition = 'none';
      const currentValue = parseInt(this.knobInput.value);
      const boundMousemove = this.mousemove.bind(e, this, e.clientX, e.clientY, currentValue);
      document.addEventListener('mousemove', boundMousemove);
      document.addEventListener('mouseup', () => {
        this.knobKnob.style.transition = '';
        document.removeEventListener('mousemove', boundMousemove);
      });
    });

    this.knobInput.addEventListener('input', e => {
      const inputValue = parseInt(e.target.value);
      this.setRotation(inputValue);
      this.knobValue.innerText = this.observable[this.label] || parseInt(inputValue);
      this.observable[this.bind] = parseInt(inputValue);
    });
  }

  notify(observable) {
    this.knobInput.value = this.observable[this.bind];
    this.knobValue.innerText = this.observable[this.label] || parseInt(this.observable[this.bind]);
    this.setRotation(this.observable[this.bind]);
  }

  setRotation(inputValue) {
    const inputMax = parseInt(this.knobInput.max);
    const inputMin = parseInt(this.knobInput.min);

    const percent = Object(__WEBPACK_IMPORTED_MODULE_0__utils_maths__["pointToPercent"])(inputMin, inputMax, inputValue);
    const degree = Object(__WEBPACK_IMPORTED_MODULE_0__utils_maths__["percentToPoint"])(-150, 150, percent);

    this.knobKnob.style.transform = `rotateZ(${parseInt(degree)}deg)`;
  }

  mousemove(_this, x, y, oldValue, e) {
    const yDiff = e.clientY - parseInt(y);
    const range = _this.max - _this.min;
    const changeInterval = range / 100;

    let newValue = oldValue - changeInterval * yDiff;
    if (newValue > _this.max) {
      newValue = _this.max;
    }
    if (newValue < _this.min) {
      newValue = _this.min;
    }

    _this.knobInput.value = newValue;
    _this.knobInput.dispatchEvent(new Event('input'));
  }
}

window.customElements.define('x-knob', Knob);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".knob {\n  display: inline-flex;\n  align-items: center;\n  flex-direction: column;\n  position: relative;\n  border: 1px solid black;\n  border-radius: 3px;\n  padding: 3px; }\n  .knob__input:focus + .knob__control .knob__knob {\n    background: #94d500; }\n  .knob__control {\n    position: relative;\n    width: 30px;\n    height: 30px; }\n  .knob__knob {\n    position: absolute;\n    top: 0;\n    transition: transform .3s;\n    width: 30px;\n    height: 30px;\n    border-radius: 50%;\n    border: 1px solid black;\n    background: white;\n    box-sizing: border-box; }\n    .knob__knob:before {\n      display: block;\n      content: '';\n      width: 3px;\n      height: 10px;\n      background: black;\n      position: absolute;\n      left: 50%;\n      transform: translateX(-50%); }\n  .knob__name, .knob__value {\n    font-family: sans-serif;\n    font-size: 10px; }\n    .knob__name::selection, .knob__value::selection {\n      background: none; }\n  .knob__input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n    overflow: hidden; }\n", ""]);

// exports


/***/ })
/******/ ]);