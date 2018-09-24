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
__webpack_require__(8);
__webpack_require__(23);
__webpack_require__(25);
module.exports = __webpack_require__(28);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

(function(){
'use strict';var h=new function(){};var aa=new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function m(b){var a=aa.has(b);b=/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(b);return!a&&b}function n(b){var a=b.isConnected;if(void 0!==a)return a;for(;b&&!(b.__CE_isImportDocument||b instanceof Document);)b=b.parentNode||(window.ShadowRoot&&b instanceof ShadowRoot?b.host:void 0);return!(!b||!(b.__CE_isImportDocument||b instanceof Document))}
function p(b,a){for(;a&&a!==b&&!a.nextSibling;)a=a.parentNode;return a&&a!==b?a.nextSibling:null}
function t(b,a,c){c=c?c:new Set;for(var d=b;d;){if(d.nodeType===Node.ELEMENT_NODE){var e=d;a(e);var f=e.localName;if("link"===f&&"import"===e.getAttribute("rel")){d=e.import;if(d instanceof Node&&!c.has(d))for(c.add(d),d=d.firstChild;d;d=d.nextSibling)t(d,a,c);d=p(b,e);continue}else if("template"===f){d=p(b,e);continue}if(e=e.__CE_shadowRoot)for(e=e.firstChild;e;e=e.nextSibling)t(e,a,c)}d=d.firstChild?d.firstChild:p(b,d)}}function u(b,a,c){b[a]=c};function v(){this.a=new Map;this.s=new Map;this.f=[];this.b=!1}function ba(b,a,c){b.a.set(a,c);b.s.set(c.constructor,c)}function w(b,a){b.b=!0;b.f.push(a)}function x(b,a){b.b&&t(a,function(a){return y(b,a)})}function y(b,a){if(b.b&&!a.__CE_patched){a.__CE_patched=!0;for(var c=0;c<b.f.length;c++)b.f[c](a)}}function z(b,a){var c=[];t(a,function(b){return c.push(b)});for(a=0;a<c.length;a++){var d=c[a];1===d.__CE_state?b.connectedCallback(d):A(b,d)}}
function B(b,a){var c=[];t(a,function(b){return c.push(b)});for(a=0;a<c.length;a++){var d=c[a];1===d.__CE_state&&b.disconnectedCallback(d)}}
function C(b,a,c){c=c?c:{};var d=c.w||new Set,e=c.i||function(a){return A(b,a)},f=[];t(a,function(a){if("link"===a.localName&&"import"===a.getAttribute("rel")){var c=a.import;c instanceof Node&&(c.__CE_isImportDocument=!0,c.__CE_hasRegistry=!0);c&&"complete"===c.readyState?c.__CE_documentLoadHandled=!0:a.addEventListener("load",function(){var c=a.import;if(!c.__CE_documentLoadHandled){c.__CE_documentLoadHandled=!0;var f=new Set(d);f.delete(c);C(b,c,{w:f,i:e})}})}else f.push(a)},d);if(b.b)for(a=0;a<
f.length;a++)y(b,f[a]);for(a=0;a<f.length;a++)e(f[a])}
function A(b,a){if(void 0===a.__CE_state){var c=a.ownerDocument;if(c.defaultView||c.__CE_isImportDocument&&c.__CE_hasRegistry)if(c=b.a.get(a.localName)){c.constructionStack.push(a);var d=c.constructor;try{try{if(new d!==a)throw Error("The custom element constructor did not produce the element being upgraded.");}finally{c.constructionStack.pop()}}catch(r){throw a.__CE_state=2,r;}a.__CE_state=1;a.__CE_definition=c;if(c.attributeChangedCallback)for(c=c.observedAttributes,d=0;d<c.length;d++){var e=c[d],
f=a.getAttribute(e);null!==f&&b.attributeChangedCallback(a,e,null,f,null)}n(a)&&b.connectedCallback(a)}}}v.prototype.connectedCallback=function(b){var a=b.__CE_definition;a.connectedCallback&&a.connectedCallback.call(b)};v.prototype.disconnectedCallback=function(b){var a=b.__CE_definition;a.disconnectedCallback&&a.disconnectedCallback.call(b)};
v.prototype.attributeChangedCallback=function(b,a,c,d,e){var f=b.__CE_definition;f.attributeChangedCallback&&-1<f.observedAttributes.indexOf(a)&&f.attributeChangedCallback.call(b,a,c,d,e)};function D(b,a){this.c=b;this.a=a;this.b=void 0;C(this.c,this.a);"loading"===this.a.readyState&&(this.b=new MutationObserver(this.f.bind(this)),this.b.observe(this.a,{childList:!0,subtree:!0}))}function E(b){b.b&&b.b.disconnect()}D.prototype.f=function(b){var a=this.a.readyState;"interactive"!==a&&"complete"!==a||E(this);for(a=0;a<b.length;a++)for(var c=b[a].addedNodes,d=0;d<c.length;d++)C(this.c,c[d])};function ca(){var b=this;this.b=this.a=void 0;this.f=new Promise(function(a){b.b=a;b.a&&a(b.a)})}function F(b){if(b.a)throw Error("Already resolved.");b.a=void 0;b.b&&b.b(void 0)};function G(b){this.j=!1;this.c=b;this.o=new Map;this.l=function(b){return b()};this.g=!1;this.m=[];this.u=new D(b,document)}
G.prototype.define=function(b,a){var c=this;if(!(a instanceof Function))throw new TypeError("Custom element constructors must be functions.");if(!m(b))throw new SyntaxError("The element name '"+b+"' is not valid.");if(this.c.a.get(b))throw Error("A custom element with name '"+b+"' has already been defined.");if(this.j)throw Error("A custom element is already being defined.");this.j=!0;var d,e,f,r,k;try{var g=function(b){var a=l[b];if(void 0!==a&&!(a instanceof Function))throw Error("The '"+b+"' callback must be a function.");
return a},l=a.prototype;if(!(l instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");d=g("connectedCallback");e=g("disconnectedCallback");f=g("adoptedCallback");r=g("attributeChangedCallback");k=a.observedAttributes||[]}catch(q){return}finally{this.j=!1}a={localName:b,constructor:a,connectedCallback:d,disconnectedCallback:e,adoptedCallback:f,attributeChangedCallback:r,observedAttributes:k,constructionStack:[]};ba(this.c,b,a);this.m.push(a);this.g||
(this.g=!0,this.l(function(){return da(c)}))};G.prototype.i=function(b){C(this.c,b)};function da(b){if(!1!==b.g){b.g=!1;for(var a=b.m,c=[],d=new Map,e=0;e<a.length;e++)d.set(a[e].localName,[]);C(b.c,document,{i:function(a){if(void 0===a.__CE_state){var e=a.localName,f=d.get(e);f?f.push(a):b.c.a.get(e)&&c.push(a)}}});for(e=0;e<c.length;e++)A(b.c,c[e]);for(;0<a.length;){for(var f=a.shift(),e=f.localName,f=d.get(f.localName),r=0;r<f.length;r++)A(b.c,f[r]);(e=b.o.get(e))&&F(e)}}}
G.prototype.get=function(b){if(b=this.c.a.get(b))return b.constructor};G.prototype.whenDefined=function(b){if(!m(b))return Promise.reject(new SyntaxError("'"+b+"' is not a valid custom element name."));var a=this.o.get(b);if(a)return a.f;a=new ca;this.o.set(b,a);this.c.a.get(b)&&!this.m.some(function(a){return a.localName===b})&&F(a);return a.f};G.prototype.v=function(b){E(this.u);var a=this.l;this.l=function(c){return b(function(){return a(c)})}};window.CustomElementRegistry=G;
G.prototype.define=G.prototype.define;G.prototype.upgrade=G.prototype.i;G.prototype.get=G.prototype.get;G.prototype.whenDefined=G.prototype.whenDefined;G.prototype.polyfillWrapFlushCallback=G.prototype.v;var H=window.Document.prototype.createElement,I=window.Document.prototype.createElementNS,ea=window.Document.prototype.importNode,fa=window.Document.prototype.prepend,ga=window.Document.prototype.append,ha=window.DocumentFragment.prototype.prepend,ia=window.DocumentFragment.prototype.append,J=window.Node.prototype.cloneNode,K=window.Node.prototype.appendChild,L=window.Node.prototype.insertBefore,M=window.Node.prototype.removeChild,N=window.Node.prototype.replaceChild,O=Object.getOwnPropertyDescriptor(window.Node.prototype,
"textContent"),P=window.Element.prototype.attachShadow,Q=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),R=window.Element.prototype.getAttribute,S=window.Element.prototype.setAttribute,T=window.Element.prototype.removeAttribute,U=window.Element.prototype.getAttributeNS,ja=window.Element.prototype.setAttributeNS,ka=window.Element.prototype.removeAttributeNS,la=window.Element.prototype.insertAdjacentElement,ma=window.Element.prototype.insertAdjacentHTML,na=window.Element.prototype.prepend,
oa=window.Element.prototype.append,V=window.Element.prototype.before,pa=window.Element.prototype.after,qa=window.Element.prototype.replaceWith,ra=window.Element.prototype.remove,sa=window.HTMLElement,W=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),ta=window.HTMLElement.prototype.insertAdjacentElement,ua=window.HTMLElement.prototype.insertAdjacentHTML;function va(){var b=X;window.HTMLElement=function(){function a(){var a=this.constructor,d=b.s.get(a);if(!d)throw Error("The custom element being constructed was not registered with `customElements`.");var e=d.constructionStack;if(!e.length)return e=H.call(document,d.localName),Object.setPrototypeOf(e,a.prototype),e.__CE_state=1,e.__CE_definition=d,y(b,e),e;var d=e.length-1,f=e[d];if(f===h)throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
e[d]=h;Object.setPrototypeOf(f,a.prototype);y(b,f);return f}a.prototype=sa.prototype;Object.defineProperty(a.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:a});return a}()};function Y(b,a,c){function d(a){return function(c){for(var e=[],d=0;d<arguments.length;++d)e[d-0]=arguments[d];for(var d=[],f=[],l=0;l<e.length;l++){var q=e[l];q instanceof Element&&n(q)&&f.push(q);if(q instanceof DocumentFragment)for(q=q.firstChild;q;q=q.nextSibling)d.push(q);else d.push(q)}a.apply(this,e);for(e=0;e<f.length;e++)B(b,f[e]);if(n(this))for(e=0;e<d.length;e++)f=d[e],f instanceof Element&&z(b,f)}}c.h&&(a.prepend=d(c.h));c.append&&(a.append=d(c.append))};function wa(){var b=X;u(Document.prototype,"createElement",function(a){if(this.__CE_hasRegistry){var c=b.a.get(a);if(c)return new c.constructor}a=H.call(this,a);y(b,a);return a});u(Document.prototype,"importNode",function(a,c){a=ea.call(this,a,c);this.__CE_hasRegistry?C(b,a):x(b,a);return a});u(Document.prototype,"createElementNS",function(a,c){if(this.__CE_hasRegistry&&(null===a||"http://www.w3.org/1999/xhtml"===a)){var d=b.a.get(c);if(d)return new d.constructor}a=I.call(this,a,c);y(b,a);return a});
Y(b,Document.prototype,{h:fa,append:ga})};function xa(){var b=X;function a(a,d){Object.defineProperty(a,"textContent",{enumerable:d.enumerable,configurable:!0,get:d.get,set:function(a){if(this.nodeType===Node.TEXT_NODE)d.set.call(this,a);else{var e=void 0;if(this.firstChild){var c=this.childNodes,k=c.length;if(0<k&&n(this))for(var e=Array(k),g=0;g<k;g++)e[g]=c[g]}d.set.call(this,a);if(e)for(a=0;a<e.length;a++)B(b,e[a])}}})}u(Node.prototype,"insertBefore",function(a,d){if(a instanceof DocumentFragment){var e=Array.prototype.slice.apply(a.childNodes);
a=L.call(this,a,d);if(n(this))for(d=0;d<e.length;d++)z(b,e[d]);return a}e=n(a);d=L.call(this,a,d);e&&B(b,a);n(this)&&z(b,a);return d});u(Node.prototype,"appendChild",function(a){if(a instanceof DocumentFragment){var c=Array.prototype.slice.apply(a.childNodes);a=K.call(this,a);if(n(this))for(var e=0;e<c.length;e++)z(b,c[e]);return a}c=n(a);e=K.call(this,a);c&&B(b,a);n(this)&&z(b,a);return e});u(Node.prototype,"cloneNode",function(a){a=J.call(this,a);this.ownerDocument.__CE_hasRegistry?C(b,a):x(b,a);
return a});u(Node.prototype,"removeChild",function(a){var c=n(a),e=M.call(this,a);c&&B(b,a);return e});u(Node.prototype,"replaceChild",function(a,d){if(a instanceof DocumentFragment){var e=Array.prototype.slice.apply(a.childNodes);a=N.call(this,a,d);if(n(this))for(B(b,d),d=0;d<e.length;d++)z(b,e[d]);return a}var e=n(a),f=N.call(this,a,d),c=n(this);c&&B(b,d);e&&B(b,a);c&&z(b,a);return f});O&&O.get?a(Node.prototype,O):w(b,function(b){a(b,{enumerable:!0,configurable:!0,get:function(){for(var a=[],b=
0;b<this.childNodes.length;b++)a.push(this.childNodes[b].textContent);return a.join("")},set:function(a){for(;this.firstChild;)M.call(this,this.firstChild);K.call(this,document.createTextNode(a))}})})};function ya(b){var a=Element.prototype;function c(a){return function(e){for(var c=[],d=0;d<arguments.length;++d)c[d-0]=arguments[d];for(var d=[],k=[],g=0;g<c.length;g++){var l=c[g];l instanceof Element&&n(l)&&k.push(l);if(l instanceof DocumentFragment)for(l=l.firstChild;l;l=l.nextSibling)d.push(l);else d.push(l)}a.apply(this,c);for(c=0;c<k.length;c++)B(b,k[c]);if(n(this))for(c=0;c<d.length;c++)k=d[c],k instanceof Element&&z(b,k)}}V&&(a.before=c(V));V&&(a.after=c(pa));qa&&u(a,"replaceWith",function(a){for(var e=
[],c=0;c<arguments.length;++c)e[c-0]=arguments[c];for(var c=[],d=[],k=0;k<e.length;k++){var g=e[k];g instanceof Element&&n(g)&&d.push(g);if(g instanceof DocumentFragment)for(g=g.firstChild;g;g=g.nextSibling)c.push(g);else c.push(g)}k=n(this);qa.apply(this,e);for(e=0;e<d.length;e++)B(b,d[e]);if(k)for(B(b,this),e=0;e<c.length;e++)d=c[e],d instanceof Element&&z(b,d)});ra&&u(a,"remove",function(){var a=n(this);ra.call(this);a&&B(b,this)})};function za(){var b=X;function a(a,c){Object.defineProperty(a,"innerHTML",{enumerable:c.enumerable,configurable:!0,get:c.get,set:function(a){var e=this,d=void 0;n(this)&&(d=[],t(this,function(a){a!==e&&d.push(a)}));c.set.call(this,a);if(d)for(var f=0;f<d.length;f++){var r=d[f];1===r.__CE_state&&b.disconnectedCallback(r)}this.ownerDocument.__CE_hasRegistry?C(b,this):x(b,this);return a}})}function c(a,c){u(a,"insertAdjacentElement",function(a,e){var d=n(e);a=c.call(this,a,e);d&&B(b,e);n(a)&&z(b,e);
return a})}function d(a,c){function e(a,e){for(var c=[];a!==e;a=a.nextSibling)c.push(a);for(e=0;e<c.length;e++)C(b,c[e])}u(a,"insertAdjacentHTML",function(a,b){a=a.toLowerCase();if("beforebegin"===a){var d=this.previousSibling;c.call(this,a,b);e(d||this.parentNode.firstChild,this)}else if("afterbegin"===a)d=this.firstChild,c.call(this,a,b),e(this.firstChild,d);else if("beforeend"===a)d=this.lastChild,c.call(this,a,b),e(d||this.firstChild,null);else if("afterend"===a)d=this.nextSibling,c.call(this,
a,b),e(this.nextSibling,d);else throw new SyntaxError("The value provided ("+String(a)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");})}P&&u(Element.prototype,"attachShadow",function(a){return this.__CE_shadowRoot=a=P.call(this,a)});Q&&Q.get?a(Element.prototype,Q):W&&W.get?a(HTMLElement.prototype,W):w(b,function(b){a(b,{enumerable:!0,configurable:!0,get:function(){return J.call(this,!0).innerHTML},set:function(a){var b="template"===this.localName,e=b?this.content:this,
c=I.call(document,this.namespaceURI,this.localName);for(c.innerHTML=a;0<e.childNodes.length;)M.call(e,e.childNodes[0]);for(a=b?c.content:c;0<a.childNodes.length;)K.call(e,a.childNodes[0])}})});u(Element.prototype,"setAttribute",function(a,c){if(1!==this.__CE_state)return S.call(this,a,c);var e=R.call(this,a);S.call(this,a,c);c=R.call(this,a);b.attributeChangedCallback(this,a,e,c,null)});u(Element.prototype,"setAttributeNS",function(a,c,d){if(1!==this.__CE_state)return ja.call(this,a,c,d);var e=U.call(this,
a,c);ja.call(this,a,c,d);d=U.call(this,a,c);b.attributeChangedCallback(this,c,e,d,a)});u(Element.prototype,"removeAttribute",function(a){if(1!==this.__CE_state)return T.call(this,a);var c=R.call(this,a);T.call(this,a);null!==c&&b.attributeChangedCallback(this,a,c,null,null)});u(Element.prototype,"removeAttributeNS",function(a,c){if(1!==this.__CE_state)return ka.call(this,a,c);var d=U.call(this,a,c);ka.call(this,a,c);var e=U.call(this,a,c);d!==e&&b.attributeChangedCallback(this,c,d,e,a)});ta?c(HTMLElement.prototype,
ta):la?c(Element.prototype,la):console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");ua?d(HTMLElement.prototype,ua):ma?d(Element.prototype,ma):console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");Y(b,Element.prototype,{h:na,append:oa});ya(b)};/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var Z=window.customElements;if(!Z||Z.forcePolyfill||"function"!=typeof Z.define||"function"!=typeof Z.get){var X=new v;va();wa();Y(X,DocumentFragment.prototype,{h:ha,append:ia});xa();za();document.__CE_hasRegistry=!0;var customElements=new G(X);Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:customElements})};
}).call(self);

//# sourceMappingURL=custom-elements.min.js.map


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function(){/*

Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';var aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},m="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function ba(){ba=function(){};m.Symbol||(m.Symbol=ca)}var ca=function(){var a=0;return function(b){return"jscomp_symbol_"+(b||"")+a++}}();
function n(){ba();var a=m.Symbol.iterator;a||(a=m.Symbol.iterator=m.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&aa(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return da(this)}});n=function(){}}function da(a){var b=0;return ea(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})}function ea(a){n();a={next:a};a[m.Symbol.iterator]=function(){return this};return a}function r(a){n();ba();n();var b=a[Symbol.iterator];return b?b.call(a):da(a)}
function fa(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}function t(a,b){return{index:a,l:[],v:b}}
function ha(a,b,c,d){var e=0,f=0,g=0,h=0,k=Math.min(b-e,d-f);if(0==e&&0==f)a:{for(g=0;g<k;g++)if(a[g]!==c[g])break a;g=k}if(b==a.length&&d==c.length){h=a.length;for(var l=c.length,p=0;p<k-g&&ia(a[--h],c[--l]);)p++;h=p}e+=g;f+=g;b-=h;d-=h;if(0==b-e&&0==d-f)return[];if(e==b){for(b=t(e,0);f<d;)b.l.push(c[f++]);return[b]}if(f==d)return[t(e,b-e)];k=e;g=f;d=d-g+1;h=b-k+1;b=Array(d);for(l=0;l<d;l++)b[l]=Array(h),b[l][0]=l;for(l=0;l<h;l++)b[0][l]=l;for(l=1;l<d;l++)for(p=1;p<h;p++)if(a[k+p-1]===c[g+l-1])b[l][p]=
b[l-1][p-1];else{var q=b[l-1][p]+1,S=b[l][p-1]+1;b[l][p]=q<S?q:S}k=b.length-1;g=b[0].length-1;d=b[k][g];for(a=[];0<k||0<g;)0==k?(a.push(2),g--):0==g?(a.push(3),k--):(h=b[k-1][g-1],l=b[k-1][g],p=b[k][g-1],q=l<p?l<h?l:h:p<h?p:h,q==h?(h==d?a.push(0):(a.push(1),d=h),k--,g--):q==l?(a.push(3),k--,d=l):(a.push(2),g--,d=p));a.reverse();b=void 0;k=[];for(g=0;g<a.length;g++)switch(a[g]){case 0:b&&(k.push(b),b=void 0);e++;f++;break;case 1:b||(b=t(e,0));b.v++;e++;b.l.push(c[f]);f++;break;case 2:b||(b=t(e,0));
b.v++;e++;break;case 3:b||(b=t(e,0)),b.l.push(c[f]),f++}b&&k.push(b);return k}function ia(a,b){return a===b};function ja(){this.N=this.root=null;this.A=!1;this.h=this.s=this.G=this.assignedSlot=this.assignedNodes=this.i=null;this.childNodes=this.nextSibling=this.previousSibling=this.lastChild=this.firstChild=this.parentNode=this.j=void 0;this.R=this.J=!1;this.o={}}ja.prototype.toJSON=function(){return{}};function u(a){a.D||(a.D=new ja);return a.D}function v(a){return a&&a.D};var w=window.ShadyDOM||{};w.$=!(!Element.prototype.attachShadow||!Node.prototype.getRootNode);var ka=Object.getOwnPropertyDescriptor(Node.prototype,"firstChild");w.g=!!(ka&&ka.configurable&&ka.get);w.H=w.force||!w.$;var la=navigator.userAgent.match("Trident"),ma=navigator.userAgent.match("Edge");void 0===w.O&&(w.O=w.g&&(la||ma));function x(a){return(a=v(a))&&void 0!==a.firstChild}function y(a){return"ShadyRoot"===a.W}function z(a){a=a.getRootNode();if(y(a))return a}
var A=Element.prototype,na=A.matches||A.matchesSelector||A.mozMatchesSelector||A.msMatchesSelector||A.oMatchesSelector||A.webkitMatchesSelector;function oa(a,b){if(a&&b)for(var c=Object.getOwnPropertyNames(b),d=0,e;d<c.length&&(e=c[d]);d++){var f=e,g=a,h=Object.getOwnPropertyDescriptor(b,f);h&&Object.defineProperty(g,f,h)}}function pa(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];for(d=0;d<c.length;d++)oa(a,c[d]);return a}function qa(a,b){for(var c in b)a[c]=b[c]}
var ra=document.createTextNode(""),sa=0,ta=[];(new MutationObserver(function(){for(;ta.length;)try{ta.shift()()}catch(a){throw ra.textContent=sa++,a;}})).observe(ra,{characterData:!0});function ua(a){ta.push(a);ra.textContent=sa++}var va=!!document.contains;function wa(a,b){for(;b;){if(b==a)return!0;b=b.parentNode}return!1}
function xa(a){for(var b=a.length-1;0<=b;b--){var c=a[b],d=c.getAttribute("id")||c.getAttribute("name");d&&"length"!==d&&isNaN(d)&&(a[d]=c)}a.item=function(b){return a[b]};a.namedItem=function(b){if("length"!==b&&isNaN(b)&&a[b])return a[b];for(var c=r(a),d=c.next();!d.done;d=c.next())if(d=d.value,(d.getAttribute("id")||d.getAttribute("name"))==b)return d;return null};return a};var B=[],ya;function za(a){ya||(ya=!0,ua(C));B.push(a)}function C(){ya=!1;for(var a=!!B.length;B.length;)B.shift()();return a}C.list=B;var Aa=/[&\u00A0"]/g,Ba=/[&\u00A0<>]/g;function Ca(a){switch(a){case "&":return"&amp;";case "<":return"&lt;";case ">":return"&gt;";case '"':return"&quot;";case "\u00a0":return"&nbsp;"}}function Da(a){for(var b={},c=0;c<a.length;c++)b[a[c]]=!0;return b}var Ea=Da("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),Fa=Da("style script xmp iframe noembed noframes plaintext noscript".split(" "));
function Ga(a,b){"template"===a.localName&&(a=a.content);for(var c="",d=b?b(a):a.childNodes,e=0,f=d.length,g;e<f&&(g=d[e]);e++){a:{var h=g;var k=a;var l=b;switch(h.nodeType){case Node.ELEMENT_NODE:for(var p=h.localName,q="<"+p,S=h.attributes,Sa=0;k=S[Sa];Sa++)q+=" "+k.name+'="'+k.value.replace(Aa,Ca)+'"';q+=">";h=Ea[p]?q:q+Ga(h,l)+"</"+p+">";break a;case Node.TEXT_NODE:h=h.data;h=k&&Fa[k.localName]?h:h.replace(Ba,Ca);break a;case Node.COMMENT_NODE:h="\x3c!--"+h.data+"--\x3e";break a;default:throw window.console.error(h),
Error("not implemented");}}c+=h}return c};var D=document.createTreeWalker(document,NodeFilter.SHOW_ALL,null,!1),E=document.createTreeWalker(document,NodeFilter.SHOW_ELEMENT,null,!1);function Ha(a){var b=[];D.currentNode=a;for(a=D.firstChild();a;)b.push(a),a=D.nextSibling();return b}
var F={parentNode:function(a){D.currentNode=a;return D.parentNode()},firstChild:function(a){D.currentNode=a;return D.firstChild()},lastChild:function(a){D.currentNode=a;return D.lastChild()},previousSibling:function(a){D.currentNode=a;return D.previousSibling()},nextSibling:function(a){D.currentNode=a;return D.nextSibling()}};F.childNodes=Ha;F.parentElement=function(a){E.currentNode=a;return E.parentNode()};F.firstElementChild=function(a){E.currentNode=a;return E.firstChild()};
F.lastElementChild=function(a){E.currentNode=a;return E.lastChild()};F.previousElementSibling=function(a){E.currentNode=a;return E.previousSibling()};F.nextElementSibling=function(a){E.currentNode=a;return E.nextSibling()};F.children=function(a){var b=[];E.currentNode=a;for(a=E.firstChild();a;)b.push(a),a=E.nextSibling();return xa(b)};F.innerHTML=function(a){return Ga(a,function(a){return Ha(a)})};
F.textContent=function(a){switch(a.nodeType){case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:a=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,null,!1);for(var b="",c;c=a.nextNode();)b+=c.nodeValue;return b;default:return a.nodeValue}};var Ia=w.g,Ja=[Node.prototype,Element.prototype,HTMLElement.prototype];function G(a){var b;a:{for(b=0;b<Ja.length;b++){var c=Ja[b];if(c.hasOwnProperty(a)){b=c;break a}}b=void 0}if(!b)throw Error("Could not find descriptor for "+a);return Object.getOwnPropertyDescriptor(b,a)}
var H=Ia?{parentNode:G("parentNode"),firstChild:G("firstChild"),lastChild:G("lastChild"),previousSibling:G("previousSibling"),nextSibling:G("nextSibling"),childNodes:G("childNodes"),parentElement:G("parentElement"),previousElementSibling:G("previousElementSibling"),nextElementSibling:G("nextElementSibling"),innerHTML:G("innerHTML"),textContent:G("textContent"),firstElementChild:G("firstElementChild"),lastElementChild:G("lastElementChild"),children:G("children")}:{},I=Ia?{firstElementChild:Object.getOwnPropertyDescriptor(DocumentFragment.prototype,
"firstElementChild"),lastElementChild:Object.getOwnPropertyDescriptor(DocumentFragment.prototype,"lastElementChild"),children:Object.getOwnPropertyDescriptor(DocumentFragment.prototype,"children")}:{},J=Ia?{firstElementChild:Object.getOwnPropertyDescriptor(Document.prototype,"firstElementChild"),lastElementChild:Object.getOwnPropertyDescriptor(Document.prototype,"lastElementChild"),children:Object.getOwnPropertyDescriptor(Document.prototype,"children")}:{},Ka={M:H,ja:I,ea:J,parentNode:function(a){return H.parentNode.get.call(a)},
firstChild:function(a){return H.firstChild.get.call(a)},lastChild:function(a){return H.lastChild.get.call(a)},previousSibling:function(a){return H.previousSibling.get.call(a)},nextSibling:function(a){return H.nextSibling.get.call(a)},childNodes:function(a){return Array.prototype.slice.call(H.childNodes.get.call(a))},parentElement:function(a){return H.parentElement.get.call(a)},previousElementSibling:function(a){return H.previousElementSibling.get.call(a)},nextElementSibling:function(a){return H.nextElementSibling.get.call(a)},
innerHTML:function(a){return H.innerHTML.get.call(a)},textContent:function(a){return H.textContent.get.call(a)},children:function(a){switch(a.nodeType){case Node.DOCUMENT_FRAGMENT_NODE:return I.children.get.call(a);case Node.DOCUMENT_NODE:return J.children.get.call(a);default:return H.children.get.call(a)}},firstElementChild:function(a){switch(a.nodeType){case Node.DOCUMENT_FRAGMENT_NODE:return I.firstElementChild.get.call(a);case Node.DOCUMENT_NODE:return J.firstElementChild.get.call(a);default:return H.firstElementChild.get.call(a)}},
lastElementChild:function(a){switch(a.nodeType){case Node.DOCUMENT_FRAGMENT_NODE:return I.lastElementChild.get.call(a);case Node.DOCUMENT_NODE:return J.lastElementChild.get.call(a);default:return H.lastElementChild.get.call(a)}}};var K=w.O?Ka:F;var La=Element.prototype.insertBefore,Ma=Element.prototype.replaceChild,Na=Element.prototype.removeChild,Oa=Element.prototype.setAttribute,Pa=Element.prototype.removeAttribute,Qa=Element.prototype.cloneNode,Ra=Document.prototype.importNode,Ta=Element.prototype.addEventListener,Ua=Element.prototype.removeEventListener,Va=Window.prototype.addEventListener,Wa=Window.prototype.removeEventListener,Xa=Element.prototype.dispatchEvent,Ya=Node.prototype.contains||HTMLElement.prototype.contains,Za=Document.prototype.getElementById,
$a=Element.prototype.querySelector,ab=DocumentFragment.prototype.querySelector,bb=Document.prototype.querySelector,cb=Element.prototype.querySelectorAll,db=DocumentFragment.prototype.querySelectorAll,eb=Document.prototype.querySelectorAll,L={};L.appendChild=Element.prototype.appendChild;L.insertBefore=La;L.replaceChild=Ma;L.removeChild=Na;L.setAttribute=Oa;L.removeAttribute=Pa;L.cloneNode=Qa;L.importNode=Ra;L.addEventListener=Ta;L.removeEventListener=Ua;L.aa=Va;L.ba=Wa;L.dispatchEvent=Xa;
L.contains=Ya;L.getElementById=Za;L.ha=$a;L.ka=ab;L.fa=bb;L.querySelector=function(a){switch(this.nodeType){case Node.ELEMENT_NODE:return $a.call(this,a);case Node.DOCUMENT_NODE:return bb.call(this,a);default:return ab.call(this,a)}};L.ia=cb;L.la=db;L.ga=eb;L.querySelectorAll=function(a){switch(this.nodeType){case Node.ELEMENT_NODE:return cb.call(this,a);case Node.DOCUMENT_NODE:return eb.call(this,a);default:return db.call(this,a)}};function fb(a){for(;a.firstChild;)a.removeChild(a.firstChild)}
var gb=w.g,hb=document.implementation.createHTMLDocument("inert"),ib=Object.getOwnPropertyDescriptor(Node.prototype,"isConnected"),jb=ib&&ib.get,kb=Object.getOwnPropertyDescriptor(Document.prototype,"activeElement"),lb={parentElement:{get:function(){var a=v(this);(a=a&&a.parentNode)&&a.nodeType!==Node.ELEMENT_NODE&&(a=null);return void 0!==a?a:K.parentElement(this)},configurable:!0},parentNode:{get:function(){var a=v(this);a=a&&a.parentNode;return void 0!==a?a:K.parentNode(this)},configurable:!0},
nextSibling:{get:function(){var a=v(this);a=a&&a.nextSibling;return void 0!==a?a:K.nextSibling(this)},configurable:!0},previousSibling:{get:function(){var a=v(this);a=a&&a.previousSibling;return void 0!==a?a:K.previousSibling(this)},configurable:!0},nextElementSibling:{get:function(){var a=v(this);if(a&&void 0!==a.nextSibling){for(a=this.nextSibling;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.nextSibling;return a}return K.nextElementSibling(this)},configurable:!0},previousElementSibling:{get:function(){var a=
v(this);if(a&&void 0!==a.previousSibling){for(a=this.previousSibling;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;return a}return K.previousElementSibling(this)},configurable:!0}},mb={className:{get:function(){return this.getAttribute("class")||""},set:function(a){this.setAttribute("class",a)},configurable:!0}},nb={childNodes:{get:function(){if(x(this)){var a=v(this);if(!a.childNodes){a.childNodes=[];for(var b=this.firstChild;b;b=b.nextSibling)a.childNodes.push(b)}var c=a.childNodes}else c=
K.childNodes(this);c.item=function(a){return c[a]};return c},configurable:!0},childElementCount:{get:function(){return this.children.length},configurable:!0},firstChild:{get:function(){var a=v(this);a=a&&a.firstChild;return void 0!==a?a:K.firstChild(this)},configurable:!0},lastChild:{get:function(){var a=v(this);a=a&&a.lastChild;return void 0!==a?a:K.lastChild(this)},configurable:!0},textContent:{get:function(){if(x(this)){for(var a=[],b=0,c=this.childNodes,d;d=c[b];b++)d.nodeType!==Node.COMMENT_NODE&&
a.push(d.textContent);return a.join("")}return K.textContent(this)},set:function(a){if("undefined"===typeof a||null===a)a="";switch(this.nodeType){case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:if(!x(this)&&gb){var b=this.firstChild;(b!=this.lastChild||b&&b.nodeType!=Node.TEXT_NODE)&&fb(this);Ka.M.textContent.set.call(this,a)}else fb(this),(0<a.length||this.nodeType===Node.ELEMENT_NODE)&&this.appendChild(document.createTextNode(a));break;default:this.nodeValue=a}},configurable:!0},firstElementChild:{get:function(){var a=
v(this);if(a&&void 0!==a.firstChild){for(a=this.firstChild;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.nextSibling;return a}return K.firstElementChild(this)},configurable:!0},lastElementChild:{get:function(){var a=v(this);if(a&&void 0!==a.lastChild){for(a=this.lastChild;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;return a}return K.lastElementChild(this)},configurable:!0},children:{get:function(){return x(this)?xa(Array.prototype.filter.call(this.childNodes,function(a){return a.nodeType===Node.ELEMENT_NODE})):
K.children(this)},configurable:!0},innerHTML:{get:function(){return x(this)?Ga("template"===this.localName?this.content:this):K.innerHTML(this)},set:function(a){var b="template"===this.localName?this.content:this;fb(b);var c=this.localName||"div";c=this.namespaceURI&&this.namespaceURI!==hb.namespaceURI?hb.createElementNS(this.namespaceURI,c):hb.createElement(c);gb?Ka.M.innerHTML.set.call(c,a):c.innerHTML=a;for(a="template"===this.localName?c.content:c;a.firstChild;)b.appendChild(a.firstChild)},configurable:!0}},
ob={shadowRoot:{get:function(){var a=v(this);return a&&a.N||null},configurable:!0}},pb={activeElement:{get:function(){var a=kb&&kb.get?kb.get.call(document):w.g?void 0:document.activeElement;if(a&&a.nodeType){var b=!!y(this);if(this===document||b&&this.host!==a&&L.contains.call(this.host,a)){for(b=z(a);b&&b!==this;)a=b.host,b=z(a);a=this===document?b?null:a:b===this?a:null}else a=null}else a=null;return a},set:function(){},configurable:!0}};
function M(a,b,c){for(var d in b){var e=Object.getOwnPropertyDescriptor(a,d);e&&e.configurable||!e&&c?Object.defineProperty(a,d,b[d]):c&&console.warn("Could not define",d,"on",a)}}function N(a){M(a,lb);M(a,mb);M(a,nb);M(a,pb)}
function qb(){var a=O.prototype;a.__proto__=DocumentFragment.prototype;M(a,lb,!0);M(a,nb,!0);M(a,pb,!0);Object.defineProperties(a,{nodeType:{value:Node.DOCUMENT_FRAGMENT_NODE,configurable:!0},nodeName:{value:"#document-fragment",configurable:!0},nodeValue:{value:null,configurable:!0}});["localName","namespaceURI","prefix"].forEach(function(b){Object.defineProperty(a,b,{value:void 0,configurable:!0})});["ownerDocument","baseURI","isConnected"].forEach(function(b){Object.defineProperty(a,b,{get:function(){return this.host[b]},
configurable:!0})})}var rb=w.g?function(){}:function(a){var b=u(a);b.J||(b.J=!0,M(a,lb,!0),M(a,mb,!0))},sb=w.g?function(){}:function(a){u(a).R||(M(a,nb,!0),M(a,ob,!0))};var tb=K.childNodes;function ub(a,b,c){sb(b);var d=u(b);void 0!==d.firstChild&&(d.childNodes=null);if(a.nodeType===Node.DOCUMENT_FRAGMENT_NODE){d=a.childNodes;for(var e=0;e<d.length;e++)vb(d[e],b,c);a=u(a);b=void 0!==a.firstChild?null:void 0;a.firstChild=a.lastChild=b;a.childNodes=b}else vb(a,b,c)}
function vb(a,b,c){rb(a);c=c||null;var d=u(a),e=u(b),f=c?u(c):null;d.previousSibling=c?f.previousSibling:b.lastChild;if(f=v(d.previousSibling))f.nextSibling=a;if(f=v(d.nextSibling=c))f.previousSibling=a;d.parentNode=b;c?c===e.firstChild&&(e.firstChild=a):(e.lastChild=a,e.firstChild||(e.firstChild=a));e.childNodes=null}
function wb(a,b){var c=u(a);b=u(b);a===b.firstChild&&(b.firstChild=c.nextSibling);a===b.lastChild&&(b.lastChild=c.previousSibling);a=c.previousSibling;var d=c.nextSibling;a&&(u(a).nextSibling=d);d&&(u(d).previousSibling=a);c.parentNode=c.previousSibling=c.nextSibling=void 0;void 0!==b.childNodes&&(b.childNodes=null)}
function xb(a){var b=u(a);if(void 0===b.firstChild){b.childNodes=null;var c=tb(a);b.firstChild=c[0]||null;b.lastChild=c[c.length-1]||null;sb(a);for(b=0;b<c.length;b++){var d=c[b],e=u(d);e.parentNode=a;e.nextSibling=c[b+1]||null;e.previousSibling=c[b-1]||null;rb(d)}}};var yb=K.parentNode,zb=K.childNodes,Ab={},P=w.deferConnectionCallbacks&&"loading"===document.readyState,Q;function Bb(a){var b=[];do b.unshift(a);while(a=a.parentNode);return b}
function O(a,b,c){if(a!==Ab)throw new TypeError("Illegal constructor");this.W="ShadyRoot";this.host=b;this.Z=c&&c.mode;xb(b);a=u(b);a.root=this;a.N="closed"!==this.Z?this:null;a=u(this);a.firstChild=a.lastChild=a.parentNode=a.nextSibling=a.previousSibling=null;a.childNodes=[];this.L=this.u=!1;this.c=this.b=this.a=null;R(this)}function R(a){a.u||(a.u=!0,za(function(){return Cb(a)}))}
function Cb(a){for(var b;a;){a.u&&(b=a);a:{var c=a;a=c.host.getRootNode();if(y(a))for(var d=c.host.childNodes,e=0;e<d.length;e++)if(c=d[e],"slot"==c.localName)break a;a=void 0}}b&&b._renderRoot()}
O.prototype._renderRoot=function(){var a=P;P=!0;this.u=!1;if(this.a){T(this);for(var b=0,c;b<this.a.length;b++){c=this.a[b];var d=v(c),e=d.assignedNodes;d.assignedNodes=[];d.h=[];if(d.G=e)for(d=0;d<e.length;d++){var f=v(e[d]);f.s=f.assignedSlot;f.assignedSlot===c&&(f.assignedSlot=null)}}for(c=this.host.firstChild;c;c=c.nextSibling)Db(this,c);for(b=0;b<this.a.length;b++){c=this.a[b];e=v(c);if(!e.assignedNodes.length)for(d=c.firstChild;d;d=d.nextSibling)Db(this,d,c);(d=(d=v(c.parentNode))&&d.root)&&
Eb(d)&&d._renderRoot();Fb(this,e.h,e.assignedNodes);if(d=e.G){for(f=0;f<d.length;f++)v(d[f]).s=null;e.G=null;d.length>e.assignedNodes.length&&(e.A=!0)}e.A&&(e.A=!1,Gb(this,c))}b=this.a;c=[];for(e=0;e<b.length;e++)d=b[e].parentNode,(f=v(d))&&f.root||!(0>c.indexOf(d))||c.push(d);for(b=0;b<c.length;b++){e=c[b];d=e===this?this.host:e;f=[];e=e.childNodes;for(var g=0;g<e.length;g++){var h=e[g];if("slot"==h.localName){h=v(h).h;for(var k=0;k<h.length;k++)f.push(h[k])}else f.push(h)}e=void 0;g=zb(d);h=ha(f,
f.length,g,g.length);for(var l=k=0;k<h.length&&(e=h[k]);k++){for(var p=0,q;p<e.l.length&&(q=e.l[p]);p++)yb(q)===d&&L.removeChild.call(d,q),g.splice(e.index+l,1);l-=e.v}for(l=0;l<h.length&&(e=h[l]);l++)for(k=g[e.index],p=e.index;p<e.index+e.v;p++)q=f[p],L.insertBefore.call(d,q,k),g.splice(p,0,q)}}if(!this.L)for(q=this.host.childNodes,c=0,b=q.length;c<b;c++)e=q[c],d=v(e),yb(e)!==this.host||"slot"!==e.localName&&d.assignedSlot||L.removeChild.call(this.host,e);this.L=!0;P=a;Q&&Q()};
function Db(a,b,c){var d=u(b),e=d.s;d.s=null;c||(c=(a=a.b[b.slot||"__catchall"])&&a[0]);c?(u(c).assignedNodes.push(b),d.assignedSlot=c):d.assignedSlot=void 0;e!==d.assignedSlot&&d.assignedSlot&&(u(d.assignedSlot).A=!0)}function Fb(a,b,c){for(var d=0,e;d<c.length&&(e=c[d]);d++)if("slot"==e.localName){var f=v(e).assignedNodes;f&&f.length&&Fb(a,b,f)}else b.push(c[d])}function Gb(a,b){L.dispatchEvent.call(b,new Event("slotchange"));b=v(b);b.assignedSlot&&Gb(a,b.assignedSlot)}
function Hb(a,b){a.c=a.c||[];a.a=a.a||[];a.b=a.b||{};a.c.push.apply(a.c,b instanceof Array?b:fa(r(b)))}function T(a){if(a.c&&a.c.length){for(var b=a.c,c,d=0;d<b.length;d++){var e=b[d];xb(e);xb(e.parentNode);var f=Ib(e);a.b[f]?(c=c||{},c[f]=!0,a.b[f].push(e)):a.b[f]=[e];a.a.push(e)}if(c)for(var g in c)a.b[g]=Jb(a.b[g]);a.c=[]}}function Ib(a){var b=a.name||a.getAttribute("name")||"__catchall";return a.U=b}
function Jb(a){return a.sort(function(a,c){a=Bb(a);for(var b=Bb(c),e=0;e<a.length;e++){c=a[e];var f=b[e];if(c!==f)return a=Array.from(c.parentNode.childNodes),a.indexOf(c)-a.indexOf(f)}})}function Kb(a,b){if(a.a){T(a);var c=a.b,d;for(d in c)for(var e=c[d],f=0;f<e.length;f++){var g=e[f];if(wa(b,g)){e.splice(f,1);var h=a.a.indexOf(g);0<=h&&a.a.splice(h,1);f--;g=v(g);if(h=g.h)for(var k=0;k<h.length;k++){var l=h[k],p=yb(l);p&&L.removeChild.call(p,l)}g.h=[];g.assignedNodes=[];h=!0}}return h}}
function Eb(a){T(a);return!(!a.a||!a.a.length)}
if(window.customElements&&w.H){var U=new Map;Q=function(){var a=Array.from(U);U.clear();a=r(a);for(var b=a.next();!b.done;b=a.next()){b=r(b.value);var c=b.next().value;b.next().value?c.S():c.T()}};P&&document.addEventListener("readystatechange",function(){P=!1;Q()},{once:!0});var Lb=function(a,b,c){var d=0,e="__isConnected"+d++;if(b||c)a.prototype.connectedCallback=a.prototype.S=function(){P?U.set(this,!0):this[e]||(this[e]=!0,b&&b.call(this))},a.prototype.disconnectedCallback=a.prototype.T=function(){P?
this.isConnected||U.set(this,!1):this[e]&&(this[e]=!1,c&&c.call(this))};return a},Mb=window.customElements.define;Object.defineProperty(window.CustomElementRegistry.prototype,"define",{value:function(a,b){var c=b.prototype.connectedCallback,d=b.prototype.disconnectedCallback;Mb.call(window.customElements,a,Lb(b,c,d));b.prototype.connectedCallback=c;b.prototype.disconnectedCallback=d}})};var Nb=K.parentNode;
function Ob(a,b,c){if(b===a)throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");if(c){var d=v(c);d=d&&d.parentNode;if(void 0!==d&&d!==a||void 0===d&&Nb(c)!==a)throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");}if(c===b)return b;var e=[],f=Pb,g=z(a),h=g?g.host.localName:"";if(b.parentNode){var k=Qb(b);Rb(b.parentNode,b,!!g||!(b.getRootNode()instanceof ShadowRoot));
f=function(a,b){V()&&(Sb(a,k),Pb(a,b))}}d=!0;var l=!Tb(b,h);!g||b.__noInsertionPoint&&!l||Ub(b,function(a){"slot"===a.localName&&e.push(a);l&&f(a,h)});e.length&&Hb(g,e);("slot"===a.localName||e.length)&&g&&R(g);x(a)&&(ub(b,a,c),g=v(a),Vb(a)?(R(g.root),d=!1):g.root&&(d=!1));d?(d=y(a)?a.host:a,c?(c=Wb(c),L.insertBefore.call(d,b,c)):L.appendChild.call(d,b)):b.ownerDocument!==a.ownerDocument&&a.ownerDocument.adoptNode(b);Xb(a,b);return b}
function Rb(a,b,c){c=void 0===c?!1:c;if(b.parentNode!==a)throw Error("The node to be removed is not a child of this node: "+b);var d=z(b),e=v(a);if(x(a)&&(wb(b,a),Vb(a))){R(e.root);var f=!0}if(V()&&!c&&d){var g=Qb(b);Ub(b,function(a){Sb(a,g)})}Yb(b);if(d){var h=a&&"slot"===a.localName;h&&(f=!0);((c=Kb(d,b))||h)&&R(d)}f||(f=y(a)?a.host:a,(!e.root&&"slot"!==b.localName||f===Nb(b))&&L.removeChild.call(f,b));Xb(a,null,b);return b}
function Yb(a){var b=v(a);if(b&&void 0!==b.j){b=a.childNodes;for(var c=0,d=b.length,e;c<d&&(e=b[c]);c++)Yb(e)}if(a=v(a))a.j=void 0}function Wb(a){var b=a;a&&"slot"===a.localName&&(b=(b=(b=v(a))&&b.h)&&b.length?b[0]:Wb(a.nextSibling));return b}function Vb(a){return(a=(a=v(a))&&a.root)&&Eb(a)}
function Zb(a,b){if("slot"===b)a=a.parentNode,Vb(a)&&R(v(a).root);else if("slot"===a.localName&&"name"===b&&(b=z(a))){if(b.a){T(b);var c=a.U,d=Ib(a);if(d!==c){c=b.b[c];var e=c.indexOf(a);0<=e&&c.splice(e,1);c=b.b[d]||(b.b[d]=[]);c.push(a);1<c.length&&(b.b[d]=Jb(c))}}R(b)}}function Xb(a,b,c){if(a=(a=v(a))&&a.i)b&&a.addedNodes.push(b),c&&a.removedNodes.push(c),$b(a)}
function ac(a){if(a&&a.nodeType){var b=u(a),c=b.j;void 0===c&&(y(a)?(c=a,b.j=c):(c=(c=a.parentNode)?ac(c):a,L.contains.call(document.documentElement,a)&&(b.j=c)));return c}}function W(a,b,c){var d=[];bc(a.childNodes,b,c,d);return d}function bc(a,b,c,d){for(var e=0,f=a.length,g;e<f&&(g=a[e]);e++){var h;if(h=g.nodeType===Node.ELEMENT_NODE){h=g;var k=b,l=c,p=d,q=k(h);q&&p.push(h);l&&l(q)?h=q:(bc(h.childNodes,k,l,p),h=void 0)}if(h)break}}var cc=null;
function V(){cc||(cc=window.ShadyCSS&&window.ShadyCSS.ScopingShim);return cc||null}function dc(a,b,c){var d=V();d&&"class"===b?d.setElementClass(a,c):(L.setAttribute.call(a,b,c),Zb(a,b))}function ec(a,b){if(a.ownerDocument!==document||"template"===a.localName)return L.importNode.call(document,a,b);var c=L.importNode.call(document,a,!1);if(b){a=a.childNodes;b=0;for(var d;b<a.length;b++)d=ec(a[b],!0),c.appendChild(d)}return c}function Pb(a,b){var c=V();c&&c.scopeNode(a,b)}
function Sb(a,b){var c=V();c&&c.unscopeNode(a,b)}function Tb(a,b){var c=V();if(!c)return!0;if(a.nodeType===Node.DOCUMENT_FRAGMENT_NODE){c=!0;for(var d=0;c&&d<a.childNodes.length;d++)c=c&&Tb(a.childNodes[d],b);return c}return a.nodeType!==Node.ELEMENT_NODE?!0:c.currentScopeForNode(a)===b}function Qb(a){if(a.nodeType!==Node.ELEMENT_NODE)return"";var b=V();return b?b.currentScopeForNode(a):""}
function Ub(a,b){if(a){a.nodeType===Node.ELEMENT_NODE&&b(a);for(var c=0,d;c<a.childNodes.length;c++)d=a.childNodes[c],d.nodeType===Node.ELEMENT_NODE&&Ub(d,b)}};function fc(){this.c=!1;this.addedNodes=[];this.removedNodes=[];this.w=new Set}function $b(a){a.c||(a.c=!0,ua(function(){a.flush()}))}fc.prototype.flush=function(){if(this.c){this.c=!1;var a=this.takeRecords();a.length&&this.w.forEach(function(b){b(a)})}};fc.prototype.takeRecords=function(){if(this.addedNodes.length||this.removedNodes.length){var a=[{addedNodes:this.addedNodes,removedNodes:this.removedNodes}];this.addedNodes=[];this.removedNodes=[];return a}return[]};
function gc(a,b){var c=u(a);c.i||(c.i=new fc);c.i.w.add(b);var d=c.i;return{V:b,Y:d,X:a,takeRecords:function(){return d.takeRecords()}}}function hc(a){var b=a&&a.Y;b&&(b.w.delete(a.V),b.w.size||(u(a.X).i=null))}
function ic(a,b){var c=b.getRootNode();return a.map(function(a){var b=c===a.target.getRootNode();if(b&&a.addedNodes){if(b=Array.from(a.addedNodes).filter(function(a){return c===a.getRootNode()}),b.length)return a=Object.create(a),Object.defineProperty(a,"addedNodes",{value:b,configurable:!0}),a}else if(b)return a}).filter(function(a){return a})};var X="__eventWrappers"+Date.now(),jc=function(){var a=Object.getOwnPropertyDescriptor(Event.prototype,"composed");return a?function(b){return a.get.call(b)}:null}(),kc={blur:!0,focus:!0,focusin:!0,focusout:!0,click:!0,dblclick:!0,mousedown:!0,mouseenter:!0,mouseleave:!0,mousemove:!0,mouseout:!0,mouseover:!0,mouseup:!0,wheel:!0,beforeinput:!0,input:!0,keydown:!0,keyup:!0,compositionstart:!0,compositionupdate:!0,compositionend:!0,touchstart:!0,touchend:!0,touchmove:!0,touchcancel:!0,pointerover:!0,
pointerenter:!0,pointerdown:!0,pointermove:!0,pointerup:!0,pointercancel:!0,pointerout:!0,pointerleave:!0,gotpointercapture:!0,lostpointercapture:!0,dragstart:!0,drag:!0,dragenter:!0,dragleave:!0,dragover:!0,drop:!0,dragend:!0,DOMActivate:!0,DOMFocusIn:!0,DOMFocusOut:!0,keypress:!0},lc={DOMAttrModified:!0,DOMAttributeNameChanged:!0,DOMCharacterDataModified:!0,DOMElementNameChanged:!0,DOMNodeInserted:!0,DOMNodeInsertedIntoDocument:!0,DOMNodeRemoved:!0,DOMNodeRemovedFromDocument:!0,DOMSubtreeModified:!0};
function mc(a,b){var c=[],d=a;for(a=a===window?window:a.getRootNode();d;)c.push(d),d=d.assignedSlot?d.assignedSlot:d.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&d.host&&(b||d!==a)?d.host:d.parentNode;c[c.length-1]===document&&c.push(window);return c}function nc(a,b){if(!y)return a;a=mc(a,!0);for(var c=0,d,e,f,g;c<b.length;c++)if(d=b[c],f=d===window?window:d.getRootNode(),f!==e&&(g=a.indexOf(f),e=f),!y(f)||-1<g)return d}
var oc={get composed(){void 0===this.m&&(jc?this.m="focusin"===this.type||"focusout"===this.type||jc(this):!1!==this.isTrusted&&(this.m=kc[this.type]));return this.m||!1},composedPath:function(){this.I||(this.I=mc(this.__target,this.composed));return this.I},get target(){return nc(this.currentTarget||this.__previousCurrentTarget,this.composedPath())},get relatedTarget(){if(!this.C)return null;this.K||(this.K=mc(this.C,!0));return nc(this.currentTarget||this.__previousCurrentTarget,this.K)},stopPropagation:function(){Event.prototype.stopPropagation.call(this);
this.B=!0},stopImmediatePropagation:function(){Event.prototype.stopImmediatePropagation.call(this);this.B=this.P=!0}};function pc(a){function b(b,d){b=new a(b,d);b.m=d&&!!d.composed;return b}qa(b,a);b.prototype=a.prototype;return b}var qc={focus:!0,blur:!0};function rc(a){return a.__target!==a.target||a.C!==a.relatedTarget}function sc(a,b,c){if(c=b.__handlers&&b.__handlers[a.type]&&b.__handlers[a.type][c])for(var d=0,e;(e=c[d])&&(!rc(a)||a.target!==a.relatedTarget)&&(e.call(b,a),!a.P);d++);}
function tc(a){var b=a.composedPath();Object.defineProperty(a,"currentTarget",{get:function(){return d},configurable:!0});for(var c=b.length-1;0<=c;c--){var d=b[c];sc(a,d,"capture");if(a.B)return}Object.defineProperty(a,"eventPhase",{get:function(){return Event.AT_TARGET}});var e;for(c=0;c<b.length;c++){d=b[c];var f=v(d);f=f&&f.root;if(0===c||f&&f===e)if(sc(a,d,"bubble"),d!==window&&(e=d.getRootNode()),a.B)break}}
function uc(a,b,c,d,e,f){for(var g=0;g<a.length;g++){var h=a[g],k=h.type,l=h.capture,p=h.once,q=h.passive;if(b===h.node&&c===k&&d===l&&e===p&&f===q)return g}return-1}
function vc(a,b,c){if(b){var d=typeof b;if("function"===d||"object"===d)if("object"!==d||b.handleEvent&&"function"===typeof b.handleEvent){var e=this instanceof Window?L.aa:L.addEventListener;if(lc[a])return e.call(this,a,b,c);if(c&&"object"===typeof c){var f=!!c.capture;var g=!!c.once;var h=!!c.passive}else f=!!c,h=g=!1;var k=c&&c.F||this,l=b[X];if(l){if(-1<uc(l,k,a,f,g,h))return}else b[X]=[];l=function(e){g&&this.removeEventListener(a,b,c);e.__target||wc(e);if(k!==this){var f=Object.getOwnPropertyDescriptor(e,
"currentTarget");Object.defineProperty(e,"currentTarget",{get:function(){return k},configurable:!0})}e.__previousCurrentTarget=e.currentTarget;if(!y(k)||-1!=e.composedPath().indexOf(k))if(e.composed||-1<e.composedPath().indexOf(k))if(rc(e)&&e.target===e.relatedTarget)e.eventPhase===Event.BUBBLING_PHASE&&e.stopImmediatePropagation();else if(e.eventPhase===Event.CAPTURING_PHASE||e.bubbles||e.target===k||k instanceof Window){var h="function"===d?b.call(k,e):b.handleEvent&&b.handleEvent(e);k!==this&&
(f?(Object.defineProperty(e,"currentTarget",f),f=null):delete e.currentTarget);return h}};b[X].push({node:k,type:a,capture:f,once:g,passive:h,ca:l});qc[a]?(this.__handlers=this.__handlers||{},this.__handlers[a]=this.__handlers[a]||{capture:[],bubble:[]},this.__handlers[a][f?"capture":"bubble"].push(l)):e.call(this,a,l,c)}}}
function xc(a,b,c){if(b){var d=this instanceof Window?L.ba:L.removeEventListener;if(lc[a])return d.call(this,a,b,c);if(c&&"object"===typeof c){var e=!!c.capture;var f=!!c.once;var g=!!c.passive}else e=!!c,g=f=!1;var h=c&&c.F||this,k=void 0;var l=null;try{l=b[X]}catch(p){}l&&(f=uc(l,h,a,e,f,g),-1<f&&(k=l.splice(f,1)[0].ca,l.length||(b[X]=void 0)));d.call(this,a,k||b,c);k&&qc[a]&&this.__handlers&&this.__handlers[a]&&(a=this.__handlers[a][e?"capture":"bubble"],k=a.indexOf(k),-1<k&&a.splice(k,1))}}
function yc(){for(var a in qc)window.addEventListener(a,function(a){a.__target||(wc(a),tc(a))},!0)}function wc(a){a.__target=a.target;a.C=a.relatedTarget;if(w.g){var b=Object.getPrototypeOf(a);if(!b.hasOwnProperty("__patchProto")){var c=Object.create(b);c.da=b;oa(c,oc);b.__patchProto=c}a.__proto__=b.__patchProto}else oa(a,oc)}var zc=pc(window.Event),Ac=pc(window.CustomEvent),Bc=pc(window.MouseEvent);
function Cc(){window.Event=zc;window.CustomEvent=Ac;window.MouseEvent=Bc;yc();if(!jc&&Object.getOwnPropertyDescriptor(Event.prototype,"isTrusted")){var a=function(){var a=new MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0});this.dispatchEvent(a)};Element.prototype.click?Element.prototype.click=a:HTMLElement.prototype.click&&(HTMLElement.prototype.click=a)}};function Dc(a){var b=a.getRootNode();y(b)&&Cb(b);return(a=v(a))&&a.assignedSlot||null}
var Ec={addEventListener:vc.bind(window),removeEventListener:xc.bind(window)},Fc={addEventListener:vc,removeEventListener:xc,appendChild:function(a){return Ob(this,a)},insertBefore:function(a,b){return Ob(this,a,b)},removeChild:function(a){return Rb(this,a)},replaceChild:function(a,b){Ob(this,a,b);Rb(this,b);return a},cloneNode:function(a){if("template"==this.localName)var b=L.cloneNode.call(this,a);else if(b=L.cloneNode.call(this,!1),a&&b.nodeType!==Node.ATTRIBUTE_NODE){a=this.childNodes;for(var c=
0,d;c<a.length;c++)d=a[c].cloneNode(!0),b.appendChild(d)}return b},getRootNode:function(){return ac(this)},contains:function(a){return wa(this,a)},dispatchEvent:function(a){C();return L.dispatchEvent.call(this,a)}};
Object.defineProperties(Fc,{isConnected:{get:function(){if(jb&&jb.call(this))return!0;if(this.nodeType==Node.DOCUMENT_FRAGMENT_NODE)return!1;var a=this.ownerDocument;if(va){if(L.contains.call(a,this))return!0}else if(a.documentElement&&L.contains.call(a.documentElement,this))return!0;for(a=this;a&&!(a instanceof Document);)a=a.parentNode||(y(a)?a.host:void 0);return!!(a&&a instanceof Document)},configurable:!0}});
var Gc={get assignedSlot(){return Dc(this)}},Hc={querySelector:function(a){return W(this,function(b){return na.call(b,a)},function(a){return!!a})[0]||null},querySelectorAll:function(a,b){if(b){b=Array.prototype.slice.call(L.querySelectorAll.call(this,a));var c=this.getRootNode();return b.filter(function(a){return a.getRootNode()==c})}return W(this,function(b){return na.call(b,a)})}},Ic={assignedNodes:function(a){if("slot"===this.localName){var b=this.getRootNode();y(b)&&Cb(b);return(b=v(this))?(a&&
a.flatten?b.h:b.assignedNodes)||[]:[]}}},Jc=pa({setAttribute:function(a,b){dc(this,a,b)},removeAttribute:function(a){L.removeAttribute.call(this,a);Zb(this,a)},attachShadow:function(a){if(!this)throw"Must provide a host.";if(!a)throw"Not enough arguments.";return new O(Ab,this,a)},get slot(){return this.getAttribute("slot")},set slot(a){dc(this,"slot",a)},get assignedSlot(){return Dc(this)}},Hc,Ic);Object.defineProperties(Jc,ob);
var Kc=pa({importNode:function(a,b){return ec(a,b)},getElementById:function(a){return W(this,function(b){return b.id==a},function(a){return!!a})[0]||null}},Hc);Object.defineProperties(Kc,{_activeElement:pb.activeElement});
for(var Lc=HTMLElement.prototype.blur,Mc={blur:function(){var a=v(this);(a=(a=a&&a.root)&&a.activeElement)?a.blur():Lc.call(this)}},Y={},Nc=r(Object.getOwnPropertyNames(Document.prototype)),Oc=Nc.next();!Oc.done;Y={f:Y.f},Oc=Nc.next())Y.f=Oc.value,"on"===Y.f.substring(0,2)&&Object.defineProperty(Mc,Y.f,{set:function(a){return function(b){var c=u(this),d=a.f.substring(2);c.o[a.f]&&this.removeEventListener(d,c.o[a.f]);this.addEventListener(d,b,{});c.o[a.f]=b}}(Y),get:function(a){return function(){var b=
v(this);return b&&b.o[a.f]}}(Y),configurable:!0});var Pc={addEventListener:function(a,b,c){"object"!==typeof c&&(c={capture:!!c});c.F=this;this.host.addEventListener(a,b,c)},removeEventListener:function(a,b,c){"object"!==typeof c&&(c={capture:!!c});c.F=this;this.host.removeEventListener(a,b,c)},getElementById:function(a){return W(this,function(b){return b.id==a},function(a){return!!a})[0]||null}};
function Z(a,b){for(var c=Object.getOwnPropertyNames(b),d=0;d<c.length;d++){var e=c[d],f=Object.getOwnPropertyDescriptor(b,e);f.value?a[e]=f.value:Object.defineProperty(a,e,f)}};if(w.H){window.ShadyDOM={inUse:w.H,patch:function(a){sb(a);rb(a);return a},isShadyRoot:y,enqueue:za,flush:C,settings:w,filterMutations:ic,observeChildren:gc,unobserveChildren:hc,nativeMethods:L,nativeTree:K,deferConnectionCallbacks:w.deferConnectionCallbacks,handlesDynamicScoping:!0};Cc();var Qc=window.customElements&&window.customElements.nativeHTMLElement||HTMLElement;Z(O.prototype,Pc);Z(window.Node.prototype,Fc);Z(window.Window.prototype,Ec);Z(window.Text.prototype,Gc);Z(window.DocumentFragment.prototype,
Hc);Z(window.Element.prototype,Jc);Z(window.Document.prototype,Kc);window.HTMLSlotElement&&Z(window.HTMLSlotElement.prototype,Ic);Z(Qc.prototype,Mc);w.g&&(N(window.Node.prototype),N(window.Text.prototype),N(window.DocumentFragment.prototype),N(window.Element.prototype),N(Qc.prototype),N(window.Document.prototype),window.HTMLSlotElement&&N(window.HTMLSlotElement.prototype));qb();window.ShadowRoot=O};}).call(this);

//# sourceMappingURL=shadydom.min.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subtractor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _presets = __webpack_require__(9);

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
    _this.osc1 = new _Osc.Osc();
    _this.osc2 = new _Osc.Osc();
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
      _this.initMIDIController();
      _this.startOscilloscope();
      _this.loadPreset({});
      _this.osc1.notifyObservers();
      _this.osc2.notifyObservers();
    });

    window.debug = function () {
      return console.log(_this);
    };
    return _this;
  }

  _createClass(Subtractor, [{
    key: 'initMIDIController',
    value: function initMIDIController() {
      var _this2 = this;

      navigator.requestMIDIAccess({ sysex: true }).then(function (midi) {
        midi.onstatechange = _this2.handleMIDIStateChange;

        var input = midi.inputs.values();
        var result = input.next();
        while (!result.done) {
          result = input.next();
          if (result.value) {
            result.value.onmidimessage = _this2.handleMIDIMessage.bind(_this2);
          }
        }
      }).catch(console.error);
    }
  }, {
    key: 'handleMIDIStateChange',
    value: function handleMIDIStateChange(e) {
      // print information about the (dis)connected MIDI controller
      console.log(e.port.name, e.port.manufacturer, e.port.state);
    }
  }, {
    key: 'handleMIDIMessage',
    value: function handleMIDIMessage(message) {
      switch (message.data[0]) {
        case 144:
          this.noteOn(message.data[1]);
          break;
        case 128:
          this.noteOff(message.data[1]);
          break;
        default:
          break;
      }
    }
  }, {
    key: 'moveNote',
    value: function moveNote(n1, n2) {
      var _this3 = this;

      var voices = this._activeNotes[n1];

      Object.keys(voices).filter(function (i) {
        return voices[i];
      }).forEach(function (voice) {
        Object.keys(voice).forEach(function (v) {
          voices[voice[v]].move(n2, _this3._polyphony, _this3._detune, _this3.context.currentTime + (0, _maths.knobToSeconds)(_this3._glide));
        });
      });

      (0, _helpers.renameObjectKey)(this._activeNotes, n1, n2);
    }
  }, {
    key: 'noteOn',
    value: function noteOn(note) {
      var _this4 = this;

      var activeNoteKeys = Object.keys(this._activeNotes);

      if (activeNoteKeys.length >= this._voices) {
        this.moveNote(activeNoteKeys[0], note);
      } else {
        this._activeNotes[note] = [new _Osc.Osc(this.context, this.osc1), new _Osc.Osc(this.context, this.osc2)].map(function (osc) {
          if (!osc.enabled) {
            return null;
          }
          osc.start(note, _this4._polyphony, _this4._detune).map(_this4.pipeline);
          return osc;
        }).reduce(function (acc, cur, i) {
          return Object.assign(acc, _defineProperty({}, i + 1, cur));
        }, {});
      }
    }
  }, {
    key: 'noteOff',
    value: function noteOff(note) {
      var _this5 = this;

      if (this._activeNotes[note]) {
        var oscs = this._activeNotes[note];

        Object.keys(oscs).filter(function (i) {
          return oscs[i];
        }).forEach(function (oscKey) {
          oscs[oscKey].oscs.forEach(function (o) {
            o.oscEnvelope.reset();
            o.filterEnvelope.reset();
            o.stop(_this5.context.currentTime + (0, _maths.knobToSeconds)(_this5.release));
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
      var _this6 = this;

      var fileReader = new FileReader();
      fileReader.addEventListener('load', function () {
        var fileContents = fileReader.result;
        var preset = JSON.parse(fileContents);
        _this6.loadPreset(preset);
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BellsOfGuidia = exports.ElectroFifth = exports.ElectroBass = exports.Reese = exports.Plucky = exports.SuperFunk = exports.Acid = exports.Init = undefined;

var _Init = __webpack_require__(10);

var _Init2 = _interopRequireDefault(_Init);

var _Acid = __webpack_require__(11);

var _Acid2 = _interopRequireDefault(_Acid);

var _SuperFunk = __webpack_require__(12);

var _SuperFunk2 = _interopRequireDefault(_SuperFunk);

var _Plucky = __webpack_require__(13);

var _Plucky2 = _interopRequireDefault(_Plucky);

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
exports.Reese = _Reese2.default;
exports.ElectroBass = _ElectroBass2.default;
exports.ElectroFifth = _ElectroFifth2.default;
exports.BellsOfGuidia = _BellsOfGuidia2.default;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {"name":"Init","author":"Subtractor Team","description":""}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {"name":"Acid","author":"Jon Sakas","description":"Replicating a 303 acid saw","master":{"gain":50,"polyphony":1,"detune":0,"voices":1,"glide":15},"ampEnv":{"attack":0,"decay":100,"sustain":64,"release":10},"filterEnv":{"attack":0,"decay":45,"sustain":0,"release":40,"amount":42},"osc1":{"enabled":1,"waveform":3,"octave":-2,"semi":0,"detune":0},"osc2":{"enabled":0,"waveform":4,"octave":0,"semi":0,"detune":0},"filter1":{"type":1,"freq":15,"q":15,"gain":0},"filter2":{"type":2,"freq":10,"q":0.1,"gain":0}}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {"name":"Super Funk","author":"Jon Sakas","description":"Play chords!","master":{"gain":20,"polyphony":4,"detune":17,"voices":4,"glide":0},"ampEnv":{"attack":0,"decay":100,"sustain":64,"release":35},"filterEnv":{"attack":61,"decay":53,"sustain":0,"release":35,"amount":40},"osc1":{"enabled":1,"waveform":3,"octave":0,"semi":0,"detune":0},"osc2":{"enabled":1,"waveform":3,"octave":2,"semi":0,"detune":32},"filter1":{"type":1,"freq":10,"q":0,"gain":0}}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {"name":"Plucky","author":"Jon Sakas","description":"A little pluck","master":{"gain":50,"polyphony":1,"detune":0,"voices":4,"glide":0},"ampEnv":{"attack":0,"decay":36,"sustain":24,"release":52},"filterEnv":{"attack":0,"decay":45,"sustain":0,"release":40,"amount":127},"osc1":{"enabled":1,"waveform":3,"octave":0,"semi":0,"detune":0},"osc2":{"enabled":0,"waveform":3,"octave":0,"semi":0,"detune":0},"filter1":{"type":1,"freq":10,"q":0.1,"gain":0}}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {"name":"Electro Bass","author":"Jon Sakas","description":"A bit of whomp","master":{"gain":50,"polyphony":1,"detune":0,"voices":4,"glide":0},"ampEnv":{"attack":0,"decay":100,"sustain":64,"release":10},"filterEnv":{"attack":52,"decay":43,"sustain":0,"release":40,"amount":40},"osc1":{"enabled":1,"waveform":3,"octave":-2,"semi":0,"detune":0},"osc2":{"enabled":1,"waveform":2,"octave":-2,"semi":0,"detune":0},"filter1":{"type":1,"freq":0,"q":0.10000000149011612,"gain":0}}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {"name":"Electro Fifth","author":"Jon Sakas","description":"A fatty fifth","master":{"gain":50,"polyphony":1,"detune":0,"voices":1,"glide":41},"ampEnv":{"attack":0,"decay":100,"sustain":64,"release":23},"filterEnv":{"attack":0,"decay":40,"sustain":0,"release":40,"amount":0},"osc1":{"enabled":1,"waveform":3,"octave":-2,"semi":0,"detune":0},"osc2":{"enabled":1,"waveform":3,"octave":0,"semi":7,"detune":0},"filter1":{"type":1,"freq":127,"q":0.10000000149011612,"gain":0}}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {"name":"init","author":"","description":"","master":{"gain":50,"polyphony":2,"detune":10,"voices":1,"glide":36},"ampEnv":{"attack":0,"decay":100,"sustain":64,"release":48},"filterEnv":{"attack":0,"decay":40,"sustain":0,"release":40,"amount":0},"osc1":{"enabled":1,"waveform":3,"octave":-2,"semi":0,"detune":0},"osc2":{"enabled":0,"waveform":3,"octave":0,"semi":0,"detune":0},"filter1":{"type":1,"freq":23,"q":4,"gain":0},"filter2":{"type":1,"freq":127,"q":0.10000000149011612,"gain":0}}

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

  function Osc(audioContext) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

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
      var freqs = (0, _maths.getFrequencySpread)(baseFreq, polyphony, detune * (10 / polyphony));

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
      var freqs = (0, _maths.getFrequencySpread)(baseFreq, polyphony, detune * (10 / polyphony));

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

exports = module.exports = __webpack_require__(2)(false);
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
      const key = eKeyDown.key.toLowerCase();
      const note = __WEBPACK_IMPORTED_MODULE_0__utils_keyboard__["keyboardKeys"].get(key);
      if (note >= 0 && !noteWasPressed[note]) {
        this.keys[note].classList.add('keyboard__pressed');
        const n = note + this.observable.octave * 12;

        this.observable.noteOn(n);

        const unPressThisKey = eNoteKeyUp => {
          if (note === __WEBPACK_IMPORTED_MODULE_0__utils_keyboard__["keyboardKeys"].get(eNoteKeyUp.key.toLowerCase())) {
            this.keys[note].classList.remove('keyboard__pressed');
            this.observable.noteOff(n);
            window.removeEventListener('keyup', unPressThisKey);
          }
        };
        window.addEventListener('keyup', unPressThisKey);
      }

      if (key == 'z' && this.observable.octave > 0) {
        this.observable.octave--;
      }
      if (key == 'x' && this.observable.octave < 12) {
        this.observable.octave++;
      }

      noteWasPressed[note] = true;
      keyWasPressed[key] = true;
    });

    window.addEventListener('keyup', eKeyUp => {
      const key = eKeyUp.key.toLowerCase();
      const note = __WEBPACK_IMPORTED_MODULE_0__utils_keyboard__["keyboardKeys"].get(key);
      noteWasPressed[note] = false;
      keyWasPressed[key] = false;
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

exports = module.exports = __webpack_require__(2)(false);
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

  notify() {
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

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".knob {\n  display: inline-flex;\n  align-items: center;\n  flex-direction: column;\n  position: relative;\n  border: 1px solid black;\n  border-radius: 3px;\n  padding: 3px; }\n  .knob__input:focus + .knob__control .knob__knob {\n    background: #94d500; }\n  .knob__control {\n    position: relative;\n    width: 30px;\n    height: 30px; }\n  .knob__knob {\n    position: absolute;\n    top: 0;\n    transition: transform .3s;\n    width: 30px;\n    height: 30px;\n    border-radius: 50%;\n    border: 1px solid black;\n    background: white;\n    box-sizing: border-box; }\n    .knob__knob:before {\n      display: block;\n      content: '';\n      width: 3px;\n      height: 10px;\n      background: black;\n      position: absolute;\n      left: 50%;\n      transform: translateX(-50%); }\n  .knob__name, .knob__value {\n    font-family: sans-serif;\n    font-size: 10px; }\n    .knob__name::selection, .knob__value::selection {\n      background: none; }\n  .knob__input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n    overflow: hidden; }\n", ""]);

// exports


/***/ })
/******/ ]);