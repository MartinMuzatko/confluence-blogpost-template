/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	__webpack_require__(5);
	
	var _riot = __webpack_require__(7);
	
	var _riot2 = _interopRequireDefault(_riot);
	
	__webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.body.innerHTML = document.body.innerHTML + '<app></app>';
	_riot2.default.mount('*');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/less-loader/index.js!./main.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/less-loader/index.js!./main.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "", ""]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js!./node_modules/sass-loader/index.js!./flex.scss", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js!./node_modules/sass-loader/index.js!./flex.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "/* GENERIC LAYOUTS */\n[flex-offset=\"0\"] {\n  margin-left: 0%; }\n\n[flex-offset=\"5\"] {\n  margin-left: 5%; }\n\n[flex-offset=\"10\"] {\n  margin-left: 10%; }\n\n[flex-offset=\"15\"] {\n  margin-left: 15%; }\n\n[flex-offset=\"20\"] {\n  margin-left: 20%; }\n\n[flex-offset=\"25\"] {\n  margin-left: 25%; }\n\n[flex-offset=\"30\"] {\n  margin-left: 30%; }\n\n[flex-offset=\"35\"] {\n  margin-left: 35%; }\n\n[flex-offset=\"40\"] {\n  margin-left: 40%; }\n\n[flex-offset=\"45\"] {\n  margin-left: 45%; }\n\n[flex-offset=\"50\"] {\n  margin-left: 50%; }\n\n[flex-offset=\"55\"] {\n  margin-left: 55%; }\n\n[flex-offset=\"60\"] {\n  margin-left: 60%; }\n\n[flex-offset=\"65\"] {\n  margin-left: 65%; }\n\n[flex-offset=\"70\"] {\n  margin-left: 70%; }\n\n[flex-offset=\"75\"] {\n  margin-left: 75%; }\n\n[flex-offset=\"80\"] {\n  margin-left: 80%; }\n\n[flex-offset=\"85\"] {\n  margin-left: 85%; }\n\n[flex-offset=\"90\"] {\n  margin-left: 90%; }\n\n[flex-offset=\"95\"] {\n  margin-left: 95%; }\n\n[flex-offset=\"33\"] {\n  margin-left: calc(100% / 3); }\n\n[flex-offset=\"66\"] {\n  margin-left: calc(200% / 3); }\n\n[flex-order=\"0\"] {\n  -ms-flex-order: 0;\n      order: 0; }\n\n[flex-order=\"1\"] {\n  -ms-flex-order: 1;\n      order: 1; }\n\n[flex-order=\"2\"] {\n  -ms-flex-order: 2;\n      order: 2; }\n\n[flex-order=\"3\"] {\n  -ms-flex-order: 3;\n      order: 3; }\n\n[flex-order=\"4\"] {\n  -ms-flex-order: 4;\n      order: 4; }\n\n[flex-order=\"5\"] {\n  -ms-flex-order: 5;\n      order: 5; }\n\n[flex-order=\"6\"] {\n  -ms-flex-order: 6;\n      order: 6; }\n\n[flex-order=\"7\"] {\n  -ms-flex-order: 7;\n      order: 7; }\n\n[flex-order=\"8\"] {\n  -ms-flex-order: 8;\n      order: 8; }\n\n[flex-order=\"9\"] {\n  -ms-flex-order: 9;\n      order: 9; }\n\n[flex-order=\"10\"] {\n  -ms-flex-order: 10;\n      order: 10; }\n\n[flex-order=\"11\"] {\n  -ms-flex-order: 11;\n      order: 11; }\n\n[flex-order=\"12\"] {\n  -ms-flex-order: 12;\n      order: 12; }\n\n[flex-order=\"13\"] {\n  -ms-flex-order: 13;\n      order: 13; }\n\n[flex-order=\"14\"] {\n  -ms-flex-order: 14;\n      order: 14; }\n\n[flex-order=\"15\"] {\n  -ms-flex-order: 15;\n      order: 15; }\n\n[flex-order=\"16\"] {\n  -ms-flex-order: 16;\n      order: 16; }\n\n[flex-order=\"17\"] {\n  -ms-flex-order: 17;\n      order: 17; }\n\n[flex-order=\"18\"] {\n  -ms-flex-order: 18;\n      order: 18; }\n\n[flex-order=\"19\"] {\n  -ms-flex-order: 19;\n      order: 19; }\n\n[flex-order=\"20\"] {\n  -ms-flex-order: 20;\n      order: 20; }\n\n[layout] {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap; }\n\n[layout] > * {\n  box-sizing: border-box; }\n\n[layout=\"column\"] {\n  -ms-flex-direction: column;\n      flex-direction: column; }\n\n[layout=\"row\"] {\n  -ms-flex-direction: row;\n      flex-direction: row; }\n\n[layout-align] {\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n  -ms-flex-line-pack: stretch;\n      align-content: stretch;\n  -ms-flex-align: stretch;\n      align-items: stretch; }\n\n[layout-align^=\"start\"] {\n  -ms-flex-pack: start;\n      justify-content: flex-start; }\n\n[layout-align^=\"center\"] {\n  -ms-flex-pack: center;\n      justify-content: center; }\n\n[layout-align^=\"end\"] {\n  -ms-flex-pack: end;\n      justify-content: flex-end; }\n\n[layout-align^=\"space-around\"] {\n  -ms-flex-pack: distribute;\n      justify-content: space-around; }\n\n[layout-align^=\"space-between\"] {\n  -ms-flex-pack: justify;\n      justify-content: space-between; }\n\n[layout-align$=\"start\"] {\n  -ms-flex-align: start;\n      align-items: flex-start;\n  -ms-flex-line-pack: start;\n      align-content: flex-start; }\n\n[layout-align$=\"center\"] {\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-line-pack: center;\n      align-content: center;\n  max-width: 100%; }\n\n[layout-align$=\"center\"] > * {\n  max-width: 100%; }\n\n[layout-align$=\"end\"] {\n  -ms-flex-align: end;\n      align-items: flex-end;\n  -ms-flex-line-pack: end;\n      align-content: flex-end; }\n\n[layout-align=\"start\"],\n[layout-align=\"end\"],\n[layout-align=\"center\"],\n[layout-align=\"space-around\"],\n[layout-align=\"space-between\"] {\n  -ms-flex-align: stretch;\n      align-items: stretch;\n  -ms-flex-line-pack: stretch;\n      align-content: stretch; }\n\n[flex] {\n  -ms-flex: 1;\n      flex: 1; }\n\n[flex-start] {\n  margin-bottom: auto; }\n\n[flex-end] {\n  margin-top: auto; }\n\n[flex-none] {\n  -ms-flex: 0 0 auto;\n      flex: 0 0 auto; }\n\n[flex-initial] {\n  -ms-flex: 0 1 auto;\n      flex: 0 1 auto; }\n\n[flex-noshrink] {\n  -ms-flex: 1 0 auto;\n      flex: 1 0 auto; }\n\n[flex-auto] {\n  -ms-flex: 1 1 auto;\n      flex: 1 1 auto; }\n\n[flex-grow] {\n  -ms-flex: 1 1 100%;\n      flex: 1 1 100%; }\n\n[flex],\n[layout=\"row\"] > [flex],\n[layout=\"row\"] > [flex] {\n  max-height: 100%; }\n\n[layout=\"column\"] > [flex],\n[layout=\"column\"] > [flex] {\n  max-width: 100%; }\n\n[layout=\"row\"] > [flex=\"5\"],\n[layout=\"row\"] > [flex=\"5\"],\n[layout=\"row\"] > [flex=\"5\"] {\n  -ms-flex: 1 1 5%;\n      flex: 1 1 5%;\n  max-width: 5%; }\n\n[layout=\"column\"] > [flex=\"5\"],\n[layout=\"column\"] > [flex=\"5\"],\n[layout=\"column\"] > [flex=\"5\"] {\n  -ms-flex: 1 1 5%;\n      flex: 1 1 5%;\n  max-height: 5%; }\n\n[layout=\"row\"] > [flex=\"10\"],\n[layout=\"row\"] > [flex=\"10\"],\n[layout=\"row\"] > [flex=\"10\"] {\n  -ms-flex: 1 1 10%;\n      flex: 1 1 10%;\n  max-width: 10%; }\n\n[layout=\"column\"] > [flex=\"10\"],\n[layout=\"column\"] > [flex=\"10\"],\n[layout=\"column\"] > [flex=\"10\"] {\n  -ms-flex: 1 1 10%;\n      flex: 1 1 10%;\n  max-height: 10%; }\n\n[layout=\"row\"] > [flex=\"15\"],\n[layout=\"row\"] > [flex=\"15\"],\n[layout=\"row\"] > [flex=\"15\"] {\n  -ms-flex: 1 1 15%;\n      flex: 1 1 15%;\n  max-width: 15%; }\n\n[layout=\"column\"] > [flex=\"15\"],\n[layout=\"column\"] > [flex=\"15\"],\n[layout=\"column\"] > [flex=\"15\"] {\n  -ms-flex: 1 1 15%;\n      flex: 1 1 15%;\n  max-height: 15%; }\n\n[layout=\"row\"] > [flex=\"20\"],\n[layout=\"row\"] > [flex=\"20\"],\n[layout=\"row\"] > [flex=\"20\"] {\n  -ms-flex: 1 1 20%;\n      flex: 1 1 20%;\n  max-width: 20%; }\n\n[layout=\"column\"] > [flex=\"20\"],\n[layout=\"column\"] > [flex=\"20\"],\n[layout=\"column\"] > [flex=\"20\"] {\n  -ms-flex: 1 1 20%;\n      flex: 1 1 20%;\n  max-height: 20%; }\n\n[layout=\"row\"] > [flex=\"25\"],\n[layout=\"row\"] > [flex=\"25\"],\n[layout=\"row\"] > [flex=\"25\"] {\n  -ms-flex: 1 1 25%;\n      flex: 1 1 25%;\n  max-width: 25%; }\n\n[layout=\"column\"] > [flex=\"25\"],\n[layout=\"column\"] > [flex=\"25\"],\n[layout=\"column\"] > [flex=\"25\"] {\n  -ms-flex: 1 1 25%;\n      flex: 1 1 25%;\n  max-height: 25%; }\n\n[layout=\"row\"] > [flex=\"30\"],\n[layout=\"row\"] > [flex=\"30\"],\n[layout=\"row\"] > [flex=\"30\"] {\n  -ms-flex: 1 1 30%;\n      flex: 1 1 30%;\n  max-width: 30%; }\n\n[layout=\"column\"] > [flex=\"30\"],\n[layout=\"column\"] > [flex=\"30\"],\n[layout=\"column\"] > [flex=\"30\"] {\n  -ms-flex: 1 1 30%;\n      flex: 1 1 30%;\n  max-height: 30%; }\n\n[layout=\"row\"] > [flex=\"35\"],\n[layout=\"row\"] > [flex=\"35\"],\n[layout=\"row\"] > [flex=\"35\"] {\n  -ms-flex: 1 1 35%;\n      flex: 1 1 35%;\n  max-width: 35%; }\n\n[layout=\"column\"] > [flex=\"35\"],\n[layout=\"column\"] > [flex=\"35\"],\n[layout=\"column\"] > [flex=\"35\"] {\n  -ms-flex: 1 1 35%;\n      flex: 1 1 35%;\n  max-height: 35%; }\n\n[layout=\"row\"] > [flex=\"40\"],\n[layout=\"row\"] > [flex=\"40\"],\n[layout=\"row\"] > [flex=\"40\"] {\n  -ms-flex: 1 1 40%;\n      flex: 1 1 40%;\n  max-width: 40%; }\n\n[layout=\"column\"] > [flex=\"40\"],\n[layout=\"column\"] > [flex=\"40\"],\n[layout=\"column\"] > [flex=\"40\"] {\n  -ms-flex: 1 1 40%;\n      flex: 1 1 40%;\n  max-height: 40%; }\n\n[layout=\"row\"] > [flex=\"45\"],\n[layout=\"row\"] > [flex=\"45\"],\n[layout=\"row\"] > [flex=\"45\"] {\n  -ms-flex: 1 1 45%;\n      flex: 1 1 45%;\n  max-width: 45%; }\n\n[layout=\"column\"] > [flex=\"45\"],\n[layout=\"column\"] > [flex=\"45\"],\n[layout=\"column\"] > [flex=\"45\"] {\n  -ms-flex: 1 1 45%;\n      flex: 1 1 45%;\n  max-height: 45%; }\n\n[layout=\"row\"] > [flex=\"50\"],\n[layout=\"row\"] > [flex=\"50\"],\n[layout=\"row\"] > [flex=\"50\"] {\n  -ms-flex: 1 1 50%;\n      flex: 1 1 50%;\n  max-width: 50%; }\n\n[layout=\"column\"] > [flex=\"50\"],\n[layout=\"column\"] > [flex=\"50\"],\n[layout=\"column\"] > [flex=\"50\"] {\n  -ms-flex: 1 1 50%;\n      flex: 1 1 50%;\n  max-height: 50%; }\n\n[layout=\"row\"] > [flex=\"55\"],\n[layout=\"row\"] > [flex=\"55\"],\n[layout=\"row\"] > [flex=\"55\"] {\n  -ms-flex: 1 1 55%;\n      flex: 1 1 55%;\n  max-width: 55%; }\n\n[layout=\"column\"] > [flex=\"55\"],\n[layout=\"column\"] > [flex=\"55\"],\n[layout=\"column\"] > [flex=\"55\"] {\n  -ms-flex: 1 1 55%;\n      flex: 1 1 55%;\n  max-height: 55%; }\n\n[layout=\"row\"] > [flex=\"60\"],\n[layout=\"row\"] > [flex=\"60\"],\n[layout=\"row\"] > [flex=\"60\"] {\n  -ms-flex: 1 1 60%;\n      flex: 1 1 60%;\n  max-width: 60%; }\n\n[layout=\"column\"] > [flex=\"60\"],\n[layout=\"column\"] > [flex=\"60\"],\n[layout=\"column\"] > [flex=\"60\"] {\n  -ms-flex: 1 1 60%;\n      flex: 1 1 60%;\n  max-height: 60%; }\n\n[layout=\"row\"] > [flex=\"65\"],\n[layout=\"row\"] > [flex=\"65\"],\n[layout=\"row\"] > [flex=\"65\"] {\n  -ms-flex: 1 1 65%;\n      flex: 1 1 65%;\n  max-width: 65%; }\n\n[layout=\"column\"] > [flex=\"65\"],\n[layout=\"column\"] > [flex=\"65\"],\n[layout=\"column\"] > [flex=\"65\"] {\n  -ms-flex: 1 1 65%;\n      flex: 1 1 65%;\n  max-height: 65%; }\n\n[layout=\"row\"] > [flex=\"70\"],\n[layout=\"row\"] > [flex=\"70\"],\n[layout=\"row\"] > [flex=\"70\"] {\n  -ms-flex: 1 1 70%;\n      flex: 1 1 70%;\n  max-width: 70%; }\n\n[layout=\"column\"] > [flex=\"70\"],\n[layout=\"column\"] > [flex=\"70\"],\n[layout=\"column\"] > [flex=\"70\"] {\n  -ms-flex: 1 1 70%;\n      flex: 1 1 70%;\n  max-height: 70%; }\n\n[layout=\"row\"] > [flex=\"75\"],\n[layout=\"row\"] > [flex=\"75\"],\n[layout=\"row\"] > [flex=\"75\"] {\n  -ms-flex: 1 1 75%;\n      flex: 1 1 75%;\n  max-width: 75%; }\n\n[layout=\"column\"] > [flex=\"75\"],\n[layout=\"column\"] > [flex=\"75\"],\n[layout=\"column\"] > [flex=\"75\"] {\n  -ms-flex: 1 1 75%;\n      flex: 1 1 75%;\n  max-height: 75%; }\n\n[layout=\"row\"] > [flex=\"80\"],\n[layout=\"row\"] > [flex=\"80\"],\n[layout=\"row\"] > [flex=\"80\"] {\n  -ms-flex: 1 1 80%;\n      flex: 1 1 80%;\n  max-width: 80%; }\n\n[layout=\"column\"] > [flex=\"80\"],\n[layout=\"column\"] > [flex=\"80\"],\n[layout=\"column\"] > [flex=\"80\"] {\n  -ms-flex: 1 1 80%;\n      flex: 1 1 80%;\n  max-height: 80%; }\n\n[layout=\"row\"] > [flex=\"85\"],\n[layout=\"row\"] > [flex=\"85\"],\n[layout=\"row\"] > [flex=\"85\"] {\n  -ms-flex: 1 1 85%;\n      flex: 1 1 85%;\n  max-width: 85%; }\n\n[layout=\"column\"] > [flex=\"85\"],\n[layout=\"column\"] > [flex=\"85\"],\n[layout=\"column\"] > [flex=\"85\"] {\n  -ms-flex: 1 1 85%;\n      flex: 1 1 85%;\n  max-height: 85%; }\n\n[layout=\"row\"] > [flex=\"90\"],\n[layout=\"row\"] > [flex=\"90\"],\n[layout=\"row\"] > [flex=\"90\"] {\n  -ms-flex: 1 1 90%;\n      flex: 1 1 90%;\n  max-width: 90%; }\n\n[layout=\"column\"] > [flex=\"90\"],\n[layout=\"column\"] > [flex=\"90\"],\n[layout=\"column\"] > [flex=\"90\"] {\n  -ms-flex: 1 1 90%;\n      flex: 1 1 90%;\n  max-height: 90%; }\n\n[layout=\"row\"] > [flex=\"95\"],\n[layout=\"row\"] > [flex=\"95\"],\n[layout=\"row\"] > [flex=\"95\"] {\n  -ms-flex: 1 1 95%;\n      flex: 1 1 95%;\n  max-width: 95%; }\n\n[layout=\"column\"] > [flex=\"95\"],\n[layout=\"column\"] > [flex=\"95\"],\n[layout=\"column\"] > [flex=\"95\"] {\n  -ms-flex: 1 1 95%;\n      flex: 1 1 95%;\n  max-height: 95%; }\n\n[layout=\"row\"] > [flex=\"100\"],\n[layout=\"row\"] > [flex=\"100\"],\n[layout=\"row\"] > [flex=\"100\"] {\n  -ms-flex: 1 1 100%;\n      flex: 1 1 100%;\n  max-width: 100%; }\n\n[layout=\"column\"] > [flex=\"100\"],\n[layout=\"column\"] > [flex=\"100\"],\n[layout=\"column\"] > [flex=\"100\"] {\n  -ms-flex: 1 1 100%;\n      flex: 1 1 100%;\n  max-height: 100%; }\n\n[layout=\"row\"] > [flex=\"33\"],\n[layout=\"row\"] > [flex=\"33\"],\n[layout=\"row\"] > [flex=\"33\"] {\n  -ms-flex: 1 1 33.33%;\n      flex: 1 1 33.33%;\n  max-width: 33.33%; }\n\n[layout=\"column\"] > [flex=\"33\"],\n[layout=\"column\"] > [flex=\"33\"],\n[layout=\"column\"] > [flex=\"33\"] {\n  -ms-flex: 1 1 33.33%;\n      flex: 1 1 33.33%;\n  max-height: 33.33%; }\n\n[layout=\"row\"] > [flex=\"66\"],\n[layout=\"row\"] > [flex=\"66\"],\n[layout=\"row\"] > [flex=\"66\"] {\n  -ms-flex: 1 1 66.66%;\n      flex: 1 1 66.66%;\n  max-width: 66.66%; }\n\n[layout=\"column\"] > [flex=\"66\"],\n[layout=\"column\"] > [flex=\"66\"],\n[layout=\"column\"] > [flex=\"66\"] {\n  -ms-flex: 1 1 66.66%;\n      flex: 1 1 66.66%;\n  max-height: 66.66%; }\n\n[hide] {\n  display: none; }\n\n/* RESPONSIVE LAYOUTS */\n/* BREAKPOINT sm - 40em */\n@media (max-width: 39em) {\n  [flex-order-sm=\"0\"] {\n    -ms-flex-order: 0;\n        order: 0; }\n  [flex-order-sm=\"1\"] {\n    -ms-flex-order: 1;\n        order: 1; }\n  [flex-order-sm=\"2\"] {\n    -ms-flex-order: 2;\n        order: 2; }\n  [flex-order-sm=\"3\"] {\n    -ms-flex-order: 3;\n        order: 3; }\n  [flex-order-sm=\"4\"] {\n    -ms-flex-order: 4;\n        order: 4; }\n  [flex-order-sm=\"5\"] {\n    -ms-flex-order: 5;\n        order: 5; }\n  [flex-order-sm=\"6\"] {\n    -ms-flex-order: 6;\n        order: 6; }\n  [flex-order-sm=\"7\"] {\n    -ms-flex-order: 7;\n        order: 7; }\n  [flex-order-sm=\"8\"] {\n    -ms-flex-order: 8;\n        order: 8; }\n  [flex-order-sm=\"9\"] {\n    -ms-flex-order: 9;\n        order: 9; }\n  [flex-order-sm=\"10\"] {\n    -ms-flex-order: 10;\n        order: 10; }\n  [flex-order-sm=\"11\"] {\n    -ms-flex-order: 11;\n        order: 11; }\n  [flex-order-sm=\"12\"] {\n    -ms-flex-order: 12;\n        order: 12; }\n  [flex-order-sm=\"13\"] {\n    -ms-flex-order: 13;\n        order: 13; }\n  [flex-order-sm=\"14\"] {\n    -ms-flex-order: 14;\n        order: 14; }\n  [flex-order-sm=\"15\"] {\n    -ms-flex-order: 15;\n        order: 15; }\n  [flex-order-sm=\"16\"] {\n    -ms-flex-order: 16;\n        order: 16; }\n  [flex-order-sm=\"17\"] {\n    -ms-flex-order: 17;\n        order: 17; }\n  [flex-order-sm=\"18\"] {\n    -ms-flex-order: 18;\n        order: 18; }\n  [flex-order-sm=\"19\"] {\n    -ms-flex-order: 19;\n        order: 19; }\n  [flex-order-sm=\"20\"] {\n    -ms-flex-order: 20;\n        order: 20; }\n  [layout-sm] {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap; }\n  [layout-sm] > * {\n    box-sizing: border-box; }\n  [layout-sm=\"column\"] {\n    -ms-flex-direction: column;\n        flex-direction: column; }\n  [layout-sm=\"row\"] {\n    -ms-flex-direction: row;\n        flex-direction: row; }\n  [layout-align-sm] {\n    -ms-flex-pack: start;\n        justify-content: flex-start;\n    -ms-flex-line-pack: stretch;\n        align-content: stretch;\n    -ms-flex-align: stretch;\n        align-items: stretch; }\n  [layout-align-sm^=\"start\"] {\n    -ms-flex-pack: start;\n        justify-content: flex-start; }\n  [layout-align-sm^=\"center\"] {\n    -ms-flex-pack: center;\n        justify-content: center; }\n  [layout-align-sm^=\"end\"] {\n    -ms-flex-pack: end;\n        justify-content: flex-end; }\n  [layout-align-sm^=\"space-around\"] {\n    -ms-flex-pack: distribute;\n        justify-content: space-around; }\n  [layout-align-sm^=\"space-between\"] {\n    -ms-flex-pack: justify;\n        justify-content: space-between; }\n  [layout-align-sm$=\"start\"] {\n    -ms-flex-align: start;\n        align-items: flex-start;\n    -ms-flex-line-pack: start;\n        align-content: flex-start; }\n  [layout-align-sm$=\"center\"] {\n    -ms-flex-align: center;\n        align-items: center;\n    -ms-flex-line-pack: center;\n        align-content: center;\n    max-width: 100%; }\n  [layout-align-sm$=\"center\"] > * {\n    max-width: 100%; }\n  [layout-align-sm$=\"end\"] {\n    -ms-flex-align: end;\n        align-items: flex-end;\n    -ms-flex-line-pack: end;\n        align-content: flex-end; }\n  [layout-align-sm=\"start\"],\n  [layout-align-sm=\"end\"],\n  [layout-align-sm=\"center\"],\n  [layout-align-sm=\"space-around\"],\n  [layout-align-sm=\"space-between\"] {\n    -ms-flex-align: stretch;\n        align-items: stretch;\n    -ms-flex-line-pack: stretch;\n        align-content: stretch; }\n  [flex-sm] {\n    -ms-flex: 1;\n        flex: 1; }\n  [flex-sm-start] {\n    margin-bottom: auto; }\n  [flex-sm-end] {\n    margin-top: auto; }\n  [flex-sm-none] {\n    -ms-flex: 0 0 auto;\n        flex: 0 0 auto; }\n  [flex-sm-initial] {\n    -ms-flex: 0 1 auto;\n        flex: 0 1 auto; }\n  [flex-sm-noshrink] {\n    -ms-flex: 1 0 auto;\n        flex: 1 0 auto; }\n  [flex-sm-auto] {\n    -ms-flex: 1 1 auto;\n        flex: 1 1 auto; }\n  [flex-sm-grow] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%; }\n  [flex-sm],\n  [layout=\"row\"] > [flex-sm],\n  [layout-sm=\"row\"] > [flex-sm] {\n    max-height: 100%; }\n  [layout-sm=\"column\"] > [flex-sm],\n  [layout=\"column\"] > [flex-sm] {\n    max-width: 100%; }\n  [layout=\"row\"] > [flex-sm=\"5\"],\n  [layout-sm=\"row\"] > [flex-sm=\"5\"],\n  [layout-sm=\"row\"] > [flex=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-width: 5%; }\n  [layout=\"column\"] > [flex-sm=\"5\"],\n  [layout-sm=\"column\"] > [flex-sm=\"5\"],\n  [layout-sm=\"column\"] > [flex=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-height: 5%; }\n  [layout=\"row\"] > [flex-sm=\"10\"],\n  [layout-sm=\"row\"] > [flex-sm=\"10\"],\n  [layout-sm=\"row\"] > [flex=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-width: 10%; }\n  [layout=\"column\"] > [flex-sm=\"10\"],\n  [layout-sm=\"column\"] > [flex-sm=\"10\"],\n  [layout-sm=\"column\"] > [flex=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-height: 10%; }\n  [layout=\"row\"] > [flex-sm=\"15\"],\n  [layout-sm=\"row\"] > [flex-sm=\"15\"],\n  [layout-sm=\"row\"] > [flex=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-width: 15%; }\n  [layout=\"column\"] > [flex-sm=\"15\"],\n  [layout-sm=\"column\"] > [flex-sm=\"15\"],\n  [layout-sm=\"column\"] > [flex=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-height: 15%; }\n  [layout=\"row\"] > [flex-sm=\"20\"],\n  [layout-sm=\"row\"] > [flex-sm=\"20\"],\n  [layout-sm=\"row\"] > [flex=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-width: 20%; }\n  [layout=\"column\"] > [flex-sm=\"20\"],\n  [layout-sm=\"column\"] > [flex-sm=\"20\"],\n  [layout-sm=\"column\"] > [flex=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-height: 20%; }\n  [layout=\"row\"] > [flex-sm=\"25\"],\n  [layout-sm=\"row\"] > [flex-sm=\"25\"],\n  [layout-sm=\"row\"] > [flex=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-width: 25%; }\n  [layout=\"column\"] > [flex-sm=\"25\"],\n  [layout-sm=\"column\"] > [flex-sm=\"25\"],\n  [layout-sm=\"column\"] > [flex=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-height: 25%; }\n  [layout=\"row\"] > [flex-sm=\"30\"],\n  [layout-sm=\"row\"] > [flex-sm=\"30\"],\n  [layout-sm=\"row\"] > [flex=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-width: 30%; }\n  [layout=\"column\"] > [flex-sm=\"30\"],\n  [layout-sm=\"column\"] > [flex-sm=\"30\"],\n  [layout-sm=\"column\"] > [flex=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-height: 30%; }\n  [layout=\"row\"] > [flex-sm=\"35\"],\n  [layout-sm=\"row\"] > [flex-sm=\"35\"],\n  [layout-sm=\"row\"] > [flex=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-width: 35%; }\n  [layout=\"column\"] > [flex-sm=\"35\"],\n  [layout-sm=\"column\"] > [flex-sm=\"35\"],\n  [layout-sm=\"column\"] > [flex=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-height: 35%; }\n  [layout=\"row\"] > [flex-sm=\"40\"],\n  [layout-sm=\"row\"] > [flex-sm=\"40\"],\n  [layout-sm=\"row\"] > [flex=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-width: 40%; }\n  [layout=\"column\"] > [flex-sm=\"40\"],\n  [layout-sm=\"column\"] > [flex-sm=\"40\"],\n  [layout-sm=\"column\"] > [flex=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-height: 40%; }\n  [layout=\"row\"] > [flex-sm=\"45\"],\n  [layout-sm=\"row\"] > [flex-sm=\"45\"],\n  [layout-sm=\"row\"] > [flex=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-width: 45%; }\n  [layout=\"column\"] > [flex-sm=\"45\"],\n  [layout-sm=\"column\"] > [flex-sm=\"45\"],\n  [layout-sm=\"column\"] > [flex=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-height: 45%; }\n  [layout=\"row\"] > [flex-sm=\"50\"],\n  [layout-sm=\"row\"] > [flex-sm=\"50\"],\n  [layout-sm=\"row\"] > [flex=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-width: 50%; }\n  [layout=\"column\"] > [flex-sm=\"50\"],\n  [layout-sm=\"column\"] > [flex-sm=\"50\"],\n  [layout-sm=\"column\"] > [flex=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-height: 50%; }\n  [layout=\"row\"] > [flex-sm=\"55\"],\n  [layout-sm=\"row\"] > [flex-sm=\"55\"],\n  [layout-sm=\"row\"] > [flex=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-width: 55%; }\n  [layout=\"column\"] > [flex-sm=\"55\"],\n  [layout-sm=\"column\"] > [flex-sm=\"55\"],\n  [layout-sm=\"column\"] > [flex=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-height: 55%; }\n  [layout=\"row\"] > [flex-sm=\"60\"],\n  [layout-sm=\"row\"] > [flex-sm=\"60\"],\n  [layout-sm=\"row\"] > [flex=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-width: 60%; }\n  [layout=\"column\"] > [flex-sm=\"60\"],\n  [layout-sm=\"column\"] > [flex-sm=\"60\"],\n  [layout-sm=\"column\"] > [flex=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-height: 60%; }\n  [layout=\"row\"] > [flex-sm=\"65\"],\n  [layout-sm=\"row\"] > [flex-sm=\"65\"],\n  [layout-sm=\"row\"] > [flex=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-width: 65%; }\n  [layout=\"column\"] > [flex-sm=\"65\"],\n  [layout-sm=\"column\"] > [flex-sm=\"65\"],\n  [layout-sm=\"column\"] > [flex=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-height: 65%; }\n  [layout=\"row\"] > [flex-sm=\"70\"],\n  [layout-sm=\"row\"] > [flex-sm=\"70\"],\n  [layout-sm=\"row\"] > [flex=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-width: 70%; }\n  [layout=\"column\"] > [flex-sm=\"70\"],\n  [layout-sm=\"column\"] > [flex-sm=\"70\"],\n  [layout-sm=\"column\"] > [flex=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-height: 70%; }\n  [layout=\"row\"] > [flex-sm=\"75\"],\n  [layout-sm=\"row\"] > [flex-sm=\"75\"],\n  [layout-sm=\"row\"] > [flex=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-width: 75%; }\n  [layout=\"column\"] > [flex-sm=\"75\"],\n  [layout-sm=\"column\"] > [flex-sm=\"75\"],\n  [layout-sm=\"column\"] > [flex=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-height: 75%; }\n  [layout=\"row\"] > [flex-sm=\"80\"],\n  [layout-sm=\"row\"] > [flex-sm=\"80\"],\n  [layout-sm=\"row\"] > [flex=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-width: 80%; }\n  [layout=\"column\"] > [flex-sm=\"80\"],\n  [layout-sm=\"column\"] > [flex-sm=\"80\"],\n  [layout-sm=\"column\"] > [flex=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-height: 80%; }\n  [layout=\"row\"] > [flex-sm=\"85\"],\n  [layout-sm=\"row\"] > [flex-sm=\"85\"],\n  [layout-sm=\"row\"] > [flex=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-width: 85%; }\n  [layout=\"column\"] > [flex-sm=\"85\"],\n  [layout-sm=\"column\"] > [flex-sm=\"85\"],\n  [layout-sm=\"column\"] > [flex=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-height: 85%; }\n  [layout=\"row\"] > [flex-sm=\"90\"],\n  [layout-sm=\"row\"] > [flex-sm=\"90\"],\n  [layout-sm=\"row\"] > [flex=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-width: 90%; }\n  [layout=\"column\"] > [flex-sm=\"90\"],\n  [layout-sm=\"column\"] > [flex-sm=\"90\"],\n  [layout-sm=\"column\"] > [flex=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-height: 90%; }\n  [layout=\"row\"] > [flex-sm=\"95\"],\n  [layout-sm=\"row\"] > [flex-sm=\"95\"],\n  [layout-sm=\"row\"] > [flex=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-width: 95%; }\n  [layout=\"column\"] > [flex-sm=\"95\"],\n  [layout-sm=\"column\"] > [flex-sm=\"95\"],\n  [layout-sm=\"column\"] > [flex=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-height: 95%; }\n  [layout=\"row\"] > [flex-sm=\"100\"],\n  [layout-sm=\"row\"] > [flex-sm=\"100\"],\n  [layout-sm=\"row\"] > [flex=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-width: 100%; }\n  [layout=\"column\"] > [flex-sm=\"100\"],\n  [layout-sm=\"column\"] > [flex-sm=\"100\"],\n  [layout-sm=\"column\"] > [flex=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-height: 100%; }\n  [layout=\"row\"] > [flex-sm=\"33\"],\n  [layout-sm=\"row\"] > [flex-sm=\"33\"],\n  [layout-sm=\"row\"] > [flex=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-width: 33.33%; }\n  [layout=\"column\"] > [flex-sm=\"33\"],\n  [layout-sm=\"column\"] > [flex-sm=\"33\"],\n  [layout-sm=\"column\"] > [flex=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-height: 33.33%; }\n  [layout=\"row\"] > [flex-sm=\"66\"],\n  [layout-sm=\"row\"] > [flex-sm=\"66\"],\n  [layout-sm=\"row\"] > [flex=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-width: 66.66%; }\n  [layout=\"column\"] > [flex-sm=\"66\"],\n  [layout-sm=\"column\"] > [flex-sm=\"66\"],\n  [layout-sm=\"column\"] > [flex=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-height: 66.66%; }\n  [hide-sm] {\n    display: none; } }\n\n@media (min-width: 40em) {\n  [flex-order-gt-sm=\"0\"] {\n    -ms-flex-order: 0;\n        order: 0; }\n  [flex-order-gt-sm=\"1\"] {\n    -ms-flex-order: 1;\n        order: 1; }\n  [flex-order-gt-sm=\"2\"] {\n    -ms-flex-order: 2;\n        order: 2; }\n  [flex-order-gt-sm=\"3\"] {\n    -ms-flex-order: 3;\n        order: 3; }\n  [flex-order-gt-sm=\"4\"] {\n    -ms-flex-order: 4;\n        order: 4; }\n  [flex-order-gt-sm=\"5\"] {\n    -ms-flex-order: 5;\n        order: 5; }\n  [flex-order-gt-sm=\"6\"] {\n    -ms-flex-order: 6;\n        order: 6; }\n  [flex-order-gt-sm=\"7\"] {\n    -ms-flex-order: 7;\n        order: 7; }\n  [flex-order-gt-sm=\"8\"] {\n    -ms-flex-order: 8;\n        order: 8; }\n  [flex-order-gt-sm=\"9\"] {\n    -ms-flex-order: 9;\n        order: 9; }\n  [flex-order-gt-sm=\"10\"] {\n    -ms-flex-order: 10;\n        order: 10; }\n  [flex-order-gt-sm=\"11\"] {\n    -ms-flex-order: 11;\n        order: 11; }\n  [flex-order-gt-sm=\"12\"] {\n    -ms-flex-order: 12;\n        order: 12; }\n  [flex-order-gt-sm=\"13\"] {\n    -ms-flex-order: 13;\n        order: 13; }\n  [flex-order-gt-sm=\"14\"] {\n    -ms-flex-order: 14;\n        order: 14; }\n  [flex-order-gt-sm=\"15\"] {\n    -ms-flex-order: 15;\n        order: 15; }\n  [flex-order-gt-sm=\"16\"] {\n    -ms-flex-order: 16;\n        order: 16; }\n  [flex-order-gt-sm=\"17\"] {\n    -ms-flex-order: 17;\n        order: 17; }\n  [flex-order-gt-sm=\"18\"] {\n    -ms-flex-order: 18;\n        order: 18; }\n  [flex-order-gt-sm=\"19\"] {\n    -ms-flex-order: 19;\n        order: 19; }\n  [flex-order-gt-sm=\"20\"] {\n    -ms-flex-order: 20;\n        order: 20; }\n  [layout-gt-sm] {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap; }\n  [layout-gt-sm] > * {\n    box-sizing: border-box; }\n  [layout-gt-sm=\"column\"] {\n    -ms-flex-direction: column;\n        flex-direction: column; }\n  [layout-gt-sm=\"row\"] {\n    -ms-flex-direction: row;\n        flex-direction: row; }\n  [layout-align-gt-sm] {\n    -ms-flex-pack: start;\n        justify-content: flex-start;\n    -ms-flex-line-pack: stretch;\n        align-content: stretch;\n    -ms-flex-align: stretch;\n        align-items: stretch; }\n  [layout-align-gt-sm^=\"start\"] {\n    -ms-flex-pack: start;\n        justify-content: flex-start; }\n  [layout-align-gt-sm^=\"center\"] {\n    -ms-flex-pack: center;\n        justify-content: center; }\n  [layout-align-gt-sm^=\"end\"] {\n    -ms-flex-pack: end;\n        justify-content: flex-end; }\n  [layout-align-gt-sm^=\"space-around\"] {\n    -ms-flex-pack: distribute;\n        justify-content: space-around; }\n  [layout-align-gt-sm^=\"space-between\"] {\n    -ms-flex-pack: justify;\n        justify-content: space-between; }\n  [layout-align-gt-sm$=\"start\"] {\n    -ms-flex-align: start;\n        align-items: flex-start;\n    -ms-flex-line-pack: start;\n        align-content: flex-start; }\n  [layout-align-gt-sm$=\"center\"] {\n    -ms-flex-align: center;\n        align-items: center;\n    -ms-flex-line-pack: center;\n        align-content: center;\n    max-width: 100%; }\n  [layout-align-gt-sm$=\"center\"] > * {\n    max-width: 100%; }\n  [layout-align-gt-sm$=\"end\"] {\n    -ms-flex-align: end;\n        align-items: flex-end;\n    -ms-flex-line-pack: end;\n        align-content: flex-end; }\n  [layout-align-gt-sm=\"start\"],\n  [layout-align-gt-sm=\"end\"],\n  [layout-align-gt-sm=\"center\"],\n  [layout-align-gt-sm=\"space-around\"],\n  [layout-align-gt-sm=\"space-between\"] {\n    -ms-flex-align: stretch;\n        align-items: stretch;\n    -ms-flex-line-pack: stretch;\n        align-content: stretch; }\n  [flex-gt-sm] {\n    -ms-flex: 1;\n        flex: 1; }\n  [flex-gt-sm-start] {\n    margin-bottom: auto; }\n  [flex-gt-sm-end] {\n    margin-top: auto; }\n  [flex-gt-sm-none] {\n    -ms-flex: 0 0 auto;\n        flex: 0 0 auto; }\n  [flex-gt-sm-initial] {\n    -ms-flex: 0 1 auto;\n        flex: 0 1 auto; }\n  [flex-gt-sm-noshrink] {\n    -ms-flex: 1 0 auto;\n        flex: 1 0 auto; }\n  [flex-gt-sm-auto] {\n    -ms-flex: 1 1 auto;\n        flex: 1 1 auto; }\n  [flex-gt-sm-grow] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%; }\n  [flex-gt-sm],\n  [layout=\"row\"] > [flex-gt-sm],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm] {\n    max-height: 100%; }\n  [layout-gt-sm=\"column\"] > [flex-gt-sm],\n  [layout=\"column\"] > [flex-gt-sm] {\n    max-width: 100%; }\n  [layout=\"row\"] > [flex-gt-sm=\"5\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"5\"],\n  [layout-gt-sm=\"row\"] > [flex=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-width: 5%; }\n  [layout=\"column\"] > [flex-gt-sm=\"5\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"5\"],\n  [layout-gt-sm=\"column\"] > [flex=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-height: 5%; }\n  [layout=\"row\"] > [flex-gt-sm=\"10\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"10\"],\n  [layout-gt-sm=\"row\"] > [flex=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-width: 10%; }\n  [layout=\"column\"] > [flex-gt-sm=\"10\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"10\"],\n  [layout-gt-sm=\"column\"] > [flex=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-height: 10%; }\n  [layout=\"row\"] > [flex-gt-sm=\"15\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"15\"],\n  [layout-gt-sm=\"row\"] > [flex=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-width: 15%; }\n  [layout=\"column\"] > [flex-gt-sm=\"15\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"15\"],\n  [layout-gt-sm=\"column\"] > [flex=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-height: 15%; }\n  [layout=\"row\"] > [flex-gt-sm=\"20\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"20\"],\n  [layout-gt-sm=\"row\"] > [flex=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-width: 20%; }\n  [layout=\"column\"] > [flex-gt-sm=\"20\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"20\"],\n  [layout-gt-sm=\"column\"] > [flex=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-height: 20%; }\n  [layout=\"row\"] > [flex-gt-sm=\"25\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"25\"],\n  [layout-gt-sm=\"row\"] > [flex=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-width: 25%; }\n  [layout=\"column\"] > [flex-gt-sm=\"25\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"25\"],\n  [layout-gt-sm=\"column\"] > [flex=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-height: 25%; }\n  [layout=\"row\"] > [flex-gt-sm=\"30\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"30\"],\n  [layout-gt-sm=\"row\"] > [flex=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-width: 30%; }\n  [layout=\"column\"] > [flex-gt-sm=\"30\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"30\"],\n  [layout-gt-sm=\"column\"] > [flex=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-height: 30%; }\n  [layout=\"row\"] > [flex-gt-sm=\"35\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"35\"],\n  [layout-gt-sm=\"row\"] > [flex=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-width: 35%; }\n  [layout=\"column\"] > [flex-gt-sm=\"35\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"35\"],\n  [layout-gt-sm=\"column\"] > [flex=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-height: 35%; }\n  [layout=\"row\"] > [flex-gt-sm=\"40\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"40\"],\n  [layout-gt-sm=\"row\"] > [flex=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-width: 40%; }\n  [layout=\"column\"] > [flex-gt-sm=\"40\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"40\"],\n  [layout-gt-sm=\"column\"] > [flex=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-height: 40%; }\n  [layout=\"row\"] > [flex-gt-sm=\"45\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"45\"],\n  [layout-gt-sm=\"row\"] > [flex=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-width: 45%; }\n  [layout=\"column\"] > [flex-gt-sm=\"45\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"45\"],\n  [layout-gt-sm=\"column\"] > [flex=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-height: 45%; }\n  [layout=\"row\"] > [flex-gt-sm=\"50\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"50\"],\n  [layout-gt-sm=\"row\"] > [flex=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-width: 50%; }\n  [layout=\"column\"] > [flex-gt-sm=\"50\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"50\"],\n  [layout-gt-sm=\"column\"] > [flex=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-height: 50%; }\n  [layout=\"row\"] > [flex-gt-sm=\"55\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"55\"],\n  [layout-gt-sm=\"row\"] > [flex=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-width: 55%; }\n  [layout=\"column\"] > [flex-gt-sm=\"55\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"55\"],\n  [layout-gt-sm=\"column\"] > [flex=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-height: 55%; }\n  [layout=\"row\"] > [flex-gt-sm=\"60\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"60\"],\n  [layout-gt-sm=\"row\"] > [flex=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-width: 60%; }\n  [layout=\"column\"] > [flex-gt-sm=\"60\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"60\"],\n  [layout-gt-sm=\"column\"] > [flex=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-height: 60%; }\n  [layout=\"row\"] > [flex-gt-sm=\"65\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"65\"],\n  [layout-gt-sm=\"row\"] > [flex=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-width: 65%; }\n  [layout=\"column\"] > [flex-gt-sm=\"65\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"65\"],\n  [layout-gt-sm=\"column\"] > [flex=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-height: 65%; }\n  [layout=\"row\"] > [flex-gt-sm=\"70\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"70\"],\n  [layout-gt-sm=\"row\"] > [flex=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-width: 70%; }\n  [layout=\"column\"] > [flex-gt-sm=\"70\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"70\"],\n  [layout-gt-sm=\"column\"] > [flex=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-height: 70%; }\n  [layout=\"row\"] > [flex-gt-sm=\"75\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"75\"],\n  [layout-gt-sm=\"row\"] > [flex=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-width: 75%; }\n  [layout=\"column\"] > [flex-gt-sm=\"75\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"75\"],\n  [layout-gt-sm=\"column\"] > [flex=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-height: 75%; }\n  [layout=\"row\"] > [flex-gt-sm=\"80\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"80\"],\n  [layout-gt-sm=\"row\"] > [flex=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-width: 80%; }\n  [layout=\"column\"] > [flex-gt-sm=\"80\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"80\"],\n  [layout-gt-sm=\"column\"] > [flex=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-height: 80%; }\n  [layout=\"row\"] > [flex-gt-sm=\"85\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"85\"],\n  [layout-gt-sm=\"row\"] > [flex=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-width: 85%; }\n  [layout=\"column\"] > [flex-gt-sm=\"85\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"85\"],\n  [layout-gt-sm=\"column\"] > [flex=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-height: 85%; }\n  [layout=\"row\"] > [flex-gt-sm=\"90\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"90\"],\n  [layout-gt-sm=\"row\"] > [flex=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-width: 90%; }\n  [layout=\"column\"] > [flex-gt-sm=\"90\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"90\"],\n  [layout-gt-sm=\"column\"] > [flex=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-height: 90%; }\n  [layout=\"row\"] > [flex-gt-sm=\"95\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"95\"],\n  [layout-gt-sm=\"row\"] > [flex=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-width: 95%; }\n  [layout=\"column\"] > [flex-gt-sm=\"95\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"95\"],\n  [layout-gt-sm=\"column\"] > [flex=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-height: 95%; }\n  [layout=\"row\"] > [flex-gt-sm=\"100\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"100\"],\n  [layout-gt-sm=\"row\"] > [flex=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-width: 100%; }\n  [layout=\"column\"] > [flex-gt-sm=\"100\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"100\"],\n  [layout-gt-sm=\"column\"] > [flex=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-height: 100%; }\n  [layout=\"row\"] > [flex-gt-sm=\"33\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"33\"],\n  [layout-gt-sm=\"row\"] > [flex=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-width: 33.33%; }\n  [layout=\"column\"] > [flex-gt-sm=\"33\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"33\"],\n  [layout-gt-sm=\"column\"] > [flex=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-height: 33.33%; }\n  [layout=\"row\"] > [flex-gt-sm=\"66\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"66\"],\n  [layout-gt-sm=\"row\"] > [flex=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-width: 66.66%; }\n  [layout=\"column\"] > [flex-gt-sm=\"66\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"66\"],\n  [layout-gt-sm=\"column\"] > [flex=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-height: 66.66%; }\n  [hide-gt-sm] {\n    display: none; } }\n\n/* BREAKPOINT md - 60em */\n@media (min-width: 40em) and (max-width: 59em) {\n  [flex-order-md=\"0\"] {\n    -ms-flex-order: 0;\n        order: 0; }\n  [flex-order-md=\"1\"] {\n    -ms-flex-order: 1;\n        order: 1; }\n  [flex-order-md=\"2\"] {\n    -ms-flex-order: 2;\n        order: 2; }\n  [flex-order-md=\"3\"] {\n    -ms-flex-order: 3;\n        order: 3; }\n  [flex-order-md=\"4\"] {\n    -ms-flex-order: 4;\n        order: 4; }\n  [flex-order-md=\"5\"] {\n    -ms-flex-order: 5;\n        order: 5; }\n  [flex-order-md=\"6\"] {\n    -ms-flex-order: 6;\n        order: 6; }\n  [flex-order-md=\"7\"] {\n    -ms-flex-order: 7;\n        order: 7; }\n  [flex-order-md=\"8\"] {\n    -ms-flex-order: 8;\n        order: 8; }\n  [flex-order-md=\"9\"] {\n    -ms-flex-order: 9;\n        order: 9; }\n  [flex-order-md=\"10\"] {\n    -ms-flex-order: 10;\n        order: 10; }\n  [flex-order-md=\"11\"] {\n    -ms-flex-order: 11;\n        order: 11; }\n  [flex-order-md=\"12\"] {\n    -ms-flex-order: 12;\n        order: 12; }\n  [flex-order-md=\"13\"] {\n    -ms-flex-order: 13;\n        order: 13; }\n  [flex-order-md=\"14\"] {\n    -ms-flex-order: 14;\n        order: 14; }\n  [flex-order-md=\"15\"] {\n    -ms-flex-order: 15;\n        order: 15; }\n  [flex-order-md=\"16\"] {\n    -ms-flex-order: 16;\n        order: 16; }\n  [flex-order-md=\"17\"] {\n    -ms-flex-order: 17;\n        order: 17; }\n  [flex-order-md=\"18\"] {\n    -ms-flex-order: 18;\n        order: 18; }\n  [flex-order-md=\"19\"] {\n    -ms-flex-order: 19;\n        order: 19; }\n  [flex-order-md=\"20\"] {\n    -ms-flex-order: 20;\n        order: 20; }\n  [layout-md] {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap; }\n  [layout-md] > * {\n    box-sizing: border-box; }\n  [layout-md=\"column\"] {\n    -ms-flex-direction: column;\n        flex-direction: column; }\n  [layout-md=\"row\"] {\n    -ms-flex-direction: row;\n        flex-direction: row; }\n  [layout-align-md] {\n    -ms-flex-pack: start;\n        justify-content: flex-start;\n    -ms-flex-line-pack: stretch;\n        align-content: stretch;\n    -ms-flex-align: stretch;\n        align-items: stretch; }\n  [layout-align-md^=\"start\"] {\n    -ms-flex-pack: start;\n        justify-content: flex-start; }\n  [layout-align-md^=\"center\"] {\n    -ms-flex-pack: center;\n        justify-content: center; }\n  [layout-align-md^=\"end\"] {\n    -ms-flex-pack: end;\n        justify-content: flex-end; }\n  [layout-align-md^=\"space-around\"] {\n    -ms-flex-pack: distribute;\n        justify-content: space-around; }\n  [layout-align-md^=\"space-between\"] {\n    -ms-flex-pack: justify;\n        justify-content: space-between; }\n  [layout-align-md$=\"start\"] {\n    -ms-flex-align: start;\n        align-items: flex-start;\n    -ms-flex-line-pack: start;\n        align-content: flex-start; }\n  [layout-align-md$=\"center\"] {\n    -ms-flex-align: center;\n        align-items: center;\n    -ms-flex-line-pack: center;\n        align-content: center;\n    max-width: 100%; }\n  [layout-align-md$=\"center\"] > * {\n    max-width: 100%; }\n  [layout-align-md$=\"end\"] {\n    -ms-flex-align: end;\n        align-items: flex-end;\n    -ms-flex-line-pack: end;\n        align-content: flex-end; }\n  [layout-align-md=\"start\"],\n  [layout-align-md=\"end\"],\n  [layout-align-md=\"center\"],\n  [layout-align-md=\"space-around\"],\n  [layout-align-md=\"space-between\"] {\n    -ms-flex-align: stretch;\n        align-items: stretch;\n    -ms-flex-line-pack: stretch;\n        align-content: stretch; }\n  [flex-md] {\n    -ms-flex: 1;\n        flex: 1; }\n  [flex-md-start] {\n    margin-bottom: auto; }\n  [flex-md-end] {\n    margin-top: auto; }\n  [flex-md-none] {\n    -ms-flex: 0 0 auto;\n        flex: 0 0 auto; }\n  [flex-md-initial] {\n    -ms-flex: 0 1 auto;\n        flex: 0 1 auto; }\n  [flex-md-noshrink] {\n    -ms-flex: 1 0 auto;\n        flex: 1 0 auto; }\n  [flex-md-auto] {\n    -ms-flex: 1 1 auto;\n        flex: 1 1 auto; }\n  [flex-md-grow] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%; }\n  [flex-md],\n  [layout=\"row\"] > [flex-md],\n  [layout-md=\"row\"] > [flex-md] {\n    max-height: 100%; }\n  [layout-md=\"column\"] > [flex-md],\n  [layout=\"column\"] > [flex-md] {\n    max-width: 100%; }\n  [layout=\"row\"] > [flex-md=\"5\"],\n  [layout-md=\"row\"] > [flex-md=\"5\"],\n  [layout-md=\"row\"] > [flex=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-width: 5%; }\n  [layout=\"column\"] > [flex-md=\"5\"],\n  [layout-md=\"column\"] > [flex-md=\"5\"],\n  [layout-md=\"column\"] > [flex=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-height: 5%; }\n  [layout=\"row\"] > [flex-md=\"10\"],\n  [layout-md=\"row\"] > [flex-md=\"10\"],\n  [layout-md=\"row\"] > [flex=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-width: 10%; }\n  [layout=\"column\"] > [flex-md=\"10\"],\n  [layout-md=\"column\"] > [flex-md=\"10\"],\n  [layout-md=\"column\"] > [flex=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-height: 10%; }\n  [layout=\"row\"] > [flex-md=\"15\"],\n  [layout-md=\"row\"] > [flex-md=\"15\"],\n  [layout-md=\"row\"] > [flex=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-width: 15%; }\n  [layout=\"column\"] > [flex-md=\"15\"],\n  [layout-md=\"column\"] > [flex-md=\"15\"],\n  [layout-md=\"column\"] > [flex=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-height: 15%; }\n  [layout=\"row\"] > [flex-md=\"20\"],\n  [layout-md=\"row\"] > [flex-md=\"20\"],\n  [layout-md=\"row\"] > [flex=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-width: 20%; }\n  [layout=\"column\"] > [flex-md=\"20\"],\n  [layout-md=\"column\"] > [flex-md=\"20\"],\n  [layout-md=\"column\"] > [flex=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-height: 20%; }\n  [layout=\"row\"] > [flex-md=\"25\"],\n  [layout-md=\"row\"] > [flex-md=\"25\"],\n  [layout-md=\"row\"] > [flex=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-width: 25%; }\n  [layout=\"column\"] > [flex-md=\"25\"],\n  [layout-md=\"column\"] > [flex-md=\"25\"],\n  [layout-md=\"column\"] > [flex=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-height: 25%; }\n  [layout=\"row\"] > [flex-md=\"30\"],\n  [layout-md=\"row\"] > [flex-md=\"30\"],\n  [layout-md=\"row\"] > [flex=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-width: 30%; }\n  [layout=\"column\"] > [flex-md=\"30\"],\n  [layout-md=\"column\"] > [flex-md=\"30\"],\n  [layout-md=\"column\"] > [flex=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-height: 30%; }\n  [layout=\"row\"] > [flex-md=\"35\"],\n  [layout-md=\"row\"] > [flex-md=\"35\"],\n  [layout-md=\"row\"] > [flex=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-width: 35%; }\n  [layout=\"column\"] > [flex-md=\"35\"],\n  [layout-md=\"column\"] > [flex-md=\"35\"],\n  [layout-md=\"column\"] > [flex=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-height: 35%; }\n  [layout=\"row\"] > [flex-md=\"40\"],\n  [layout-md=\"row\"] > [flex-md=\"40\"],\n  [layout-md=\"row\"] > [flex=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-width: 40%; }\n  [layout=\"column\"] > [flex-md=\"40\"],\n  [layout-md=\"column\"] > [flex-md=\"40\"],\n  [layout-md=\"column\"] > [flex=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-height: 40%; }\n  [layout=\"row\"] > [flex-md=\"45\"],\n  [layout-md=\"row\"] > [flex-md=\"45\"],\n  [layout-md=\"row\"] > [flex=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-width: 45%; }\n  [layout=\"column\"] > [flex-md=\"45\"],\n  [layout-md=\"column\"] > [flex-md=\"45\"],\n  [layout-md=\"column\"] > [flex=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-height: 45%; }\n  [layout=\"row\"] > [flex-md=\"50\"],\n  [layout-md=\"row\"] > [flex-md=\"50\"],\n  [layout-md=\"row\"] > [flex=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-width: 50%; }\n  [layout=\"column\"] > [flex-md=\"50\"],\n  [layout-md=\"column\"] > [flex-md=\"50\"],\n  [layout-md=\"column\"] > [flex=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-height: 50%; }\n  [layout=\"row\"] > [flex-md=\"55\"],\n  [layout-md=\"row\"] > [flex-md=\"55\"],\n  [layout-md=\"row\"] > [flex=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-width: 55%; }\n  [layout=\"column\"] > [flex-md=\"55\"],\n  [layout-md=\"column\"] > [flex-md=\"55\"],\n  [layout-md=\"column\"] > [flex=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-height: 55%; }\n  [layout=\"row\"] > [flex-md=\"60\"],\n  [layout-md=\"row\"] > [flex-md=\"60\"],\n  [layout-md=\"row\"] > [flex=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-width: 60%; }\n  [layout=\"column\"] > [flex-md=\"60\"],\n  [layout-md=\"column\"] > [flex-md=\"60\"],\n  [layout-md=\"column\"] > [flex=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-height: 60%; }\n  [layout=\"row\"] > [flex-md=\"65\"],\n  [layout-md=\"row\"] > [flex-md=\"65\"],\n  [layout-md=\"row\"] > [flex=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-width: 65%; }\n  [layout=\"column\"] > [flex-md=\"65\"],\n  [layout-md=\"column\"] > [flex-md=\"65\"],\n  [layout-md=\"column\"] > [flex=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-height: 65%; }\n  [layout=\"row\"] > [flex-md=\"70\"],\n  [layout-md=\"row\"] > [flex-md=\"70\"],\n  [layout-md=\"row\"] > [flex=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-width: 70%; }\n  [layout=\"column\"] > [flex-md=\"70\"],\n  [layout-md=\"column\"] > [flex-md=\"70\"],\n  [layout-md=\"column\"] > [flex=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-height: 70%; }\n  [layout=\"row\"] > [flex-md=\"75\"],\n  [layout-md=\"row\"] > [flex-md=\"75\"],\n  [layout-md=\"row\"] > [flex=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-width: 75%; }\n  [layout=\"column\"] > [flex-md=\"75\"],\n  [layout-md=\"column\"] > [flex-md=\"75\"],\n  [layout-md=\"column\"] > [flex=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-height: 75%; }\n  [layout=\"row\"] > [flex-md=\"80\"],\n  [layout-md=\"row\"] > [flex-md=\"80\"],\n  [layout-md=\"row\"] > [flex=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-width: 80%; }\n  [layout=\"column\"] > [flex-md=\"80\"],\n  [layout-md=\"column\"] > [flex-md=\"80\"],\n  [layout-md=\"column\"] > [flex=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-height: 80%; }\n  [layout=\"row\"] > [flex-md=\"85\"],\n  [layout-md=\"row\"] > [flex-md=\"85\"],\n  [layout-md=\"row\"] > [flex=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-width: 85%; }\n  [layout=\"column\"] > [flex-md=\"85\"],\n  [layout-md=\"column\"] > [flex-md=\"85\"],\n  [layout-md=\"column\"] > [flex=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-height: 85%; }\n  [layout=\"row\"] > [flex-md=\"90\"],\n  [layout-md=\"row\"] > [flex-md=\"90\"],\n  [layout-md=\"row\"] > [flex=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-width: 90%; }\n  [layout=\"column\"] > [flex-md=\"90\"],\n  [layout-md=\"column\"] > [flex-md=\"90\"],\n  [layout-md=\"column\"] > [flex=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-height: 90%; }\n  [layout=\"row\"] > [flex-md=\"95\"],\n  [layout-md=\"row\"] > [flex-md=\"95\"],\n  [layout-md=\"row\"] > [flex=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-width: 95%; }\n  [layout=\"column\"] > [flex-md=\"95\"],\n  [layout-md=\"column\"] > [flex-md=\"95\"],\n  [layout-md=\"column\"] > [flex=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-height: 95%; }\n  [layout=\"row\"] > [flex-md=\"100\"],\n  [layout-md=\"row\"] > [flex-md=\"100\"],\n  [layout-md=\"row\"] > [flex=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-width: 100%; }\n  [layout=\"column\"] > [flex-md=\"100\"],\n  [layout-md=\"column\"] > [flex-md=\"100\"],\n  [layout-md=\"column\"] > [flex=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-height: 100%; }\n  [layout=\"row\"] > [flex-md=\"33\"],\n  [layout-md=\"row\"] > [flex-md=\"33\"],\n  [layout-md=\"row\"] > [flex=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-width: 33.33%; }\n  [layout=\"column\"] > [flex-md=\"33\"],\n  [layout-md=\"column\"] > [flex-md=\"33\"],\n  [layout-md=\"column\"] > [flex=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-height: 33.33%; }\n  [layout=\"row\"] > [flex-md=\"66\"],\n  [layout-md=\"row\"] > [flex-md=\"66\"],\n  [layout-md=\"row\"] > [flex=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-width: 66.66%; }\n  [layout=\"column\"] > [flex-md=\"66\"],\n  [layout-md=\"column\"] > [flex-md=\"66\"],\n  [layout-md=\"column\"] > [flex=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-height: 66.66%; }\n  [hide-md] {\n    display: none; } }\n\n@media (min-width: 60em) {\n  [flex-order-gt-md=\"0\"] {\n    -ms-flex-order: 0;\n        order: 0; }\n  [flex-order-gt-md=\"1\"] {\n    -ms-flex-order: 1;\n        order: 1; }\n  [flex-order-gt-md=\"2\"] {\n    -ms-flex-order: 2;\n        order: 2; }\n  [flex-order-gt-md=\"3\"] {\n    -ms-flex-order: 3;\n        order: 3; }\n  [flex-order-gt-md=\"4\"] {\n    -ms-flex-order: 4;\n        order: 4; }\n  [flex-order-gt-md=\"5\"] {\n    -ms-flex-order: 5;\n        order: 5; }\n  [flex-order-gt-md=\"6\"] {\n    -ms-flex-order: 6;\n        order: 6; }\n  [flex-order-gt-md=\"7\"] {\n    -ms-flex-order: 7;\n        order: 7; }\n  [flex-order-gt-md=\"8\"] {\n    -ms-flex-order: 8;\n        order: 8; }\n  [flex-order-gt-md=\"9\"] {\n    -ms-flex-order: 9;\n        order: 9; }\n  [flex-order-gt-md=\"10\"] {\n    -ms-flex-order: 10;\n        order: 10; }\n  [flex-order-gt-md=\"11\"] {\n    -ms-flex-order: 11;\n        order: 11; }\n  [flex-order-gt-md=\"12\"] {\n    -ms-flex-order: 12;\n        order: 12; }\n  [flex-order-gt-md=\"13\"] {\n    -ms-flex-order: 13;\n        order: 13; }\n  [flex-order-gt-md=\"14\"] {\n    -ms-flex-order: 14;\n        order: 14; }\n  [flex-order-gt-md=\"15\"] {\n    -ms-flex-order: 15;\n        order: 15; }\n  [flex-order-gt-md=\"16\"] {\n    -ms-flex-order: 16;\n        order: 16; }\n  [flex-order-gt-md=\"17\"] {\n    -ms-flex-order: 17;\n        order: 17; }\n  [flex-order-gt-md=\"18\"] {\n    -ms-flex-order: 18;\n        order: 18; }\n  [flex-order-gt-md=\"19\"] {\n    -ms-flex-order: 19;\n        order: 19; }\n  [flex-order-gt-md=\"20\"] {\n    -ms-flex-order: 20;\n        order: 20; }\n  [layout-gt-md] {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap; }\n  [layout-gt-md] > * {\n    box-sizing: border-box; }\n  [layout-gt-md=\"column\"] {\n    -ms-flex-direction: column;\n        flex-direction: column; }\n  [layout-gt-md=\"row\"] {\n    -ms-flex-direction: row;\n        flex-direction: row; }\n  [layout-align-gt-md] {\n    -ms-flex-pack: start;\n        justify-content: flex-start;\n    -ms-flex-line-pack: stretch;\n        align-content: stretch;\n    -ms-flex-align: stretch;\n        align-items: stretch; }\n  [layout-align-gt-md^=\"start\"] {\n    -ms-flex-pack: start;\n        justify-content: flex-start; }\n  [layout-align-gt-md^=\"center\"] {\n    -ms-flex-pack: center;\n        justify-content: center; }\n  [layout-align-gt-md^=\"end\"] {\n    -ms-flex-pack: end;\n        justify-content: flex-end; }\n  [layout-align-gt-md^=\"space-around\"] {\n    -ms-flex-pack: distribute;\n        justify-content: space-around; }\n  [layout-align-gt-md^=\"space-between\"] {\n    -ms-flex-pack: justify;\n        justify-content: space-between; }\n  [layout-align-gt-md$=\"start\"] {\n    -ms-flex-align: start;\n        align-items: flex-start;\n    -ms-flex-line-pack: start;\n        align-content: flex-start; }\n  [layout-align-gt-md$=\"center\"] {\n    -ms-flex-align: center;\n        align-items: center;\n    -ms-flex-line-pack: center;\n        align-content: center;\n    max-width: 100%; }\n  [layout-align-gt-md$=\"center\"] > * {\n    max-width: 100%; }\n  [layout-align-gt-md$=\"end\"] {\n    -ms-flex-align: end;\n        align-items: flex-end;\n    -ms-flex-line-pack: end;\n        align-content: flex-end; }\n  [layout-align-gt-md=\"start\"],\n  [layout-align-gt-md=\"end\"],\n  [layout-align-gt-md=\"center\"],\n  [layout-align-gt-md=\"space-around\"],\n  [layout-align-gt-md=\"space-between\"] {\n    -ms-flex-align: stretch;\n        align-items: stretch;\n    -ms-flex-line-pack: stretch;\n        align-content: stretch; }\n  [flex-gt-md] {\n    -ms-flex: 1;\n        flex: 1; }\n  [flex-gt-md-start] {\n    margin-bottom: auto; }\n  [flex-gt-md-end] {\n    margin-top: auto; }\n  [flex-gt-md-none] {\n    -ms-flex: 0 0 auto;\n        flex: 0 0 auto; }\n  [flex-gt-md-initial] {\n    -ms-flex: 0 1 auto;\n        flex: 0 1 auto; }\n  [flex-gt-md-noshrink] {\n    -ms-flex: 1 0 auto;\n        flex: 1 0 auto; }\n  [flex-gt-md-auto] {\n    -ms-flex: 1 1 auto;\n        flex: 1 1 auto; }\n  [flex-gt-md-grow] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%; }\n  [flex-gt-md],\n  [layout=\"row\"] > [flex-gt-md],\n  [layout-gt-md=\"row\"] > [flex-gt-md] {\n    max-height: 100%; }\n  [layout-gt-md=\"column\"] > [flex-gt-md],\n  [layout=\"column\"] > [flex-gt-md] {\n    max-width: 100%; }\n  [layout=\"row\"] > [flex-gt-md=\"5\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"5\"],\n  [layout-gt-md=\"row\"] > [flex=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-width: 5%; }\n  [layout=\"column\"] > [flex-gt-md=\"5\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"5\"],\n  [layout-gt-md=\"column\"] > [flex=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-height: 5%; }\n  [layout=\"row\"] > [flex-gt-md=\"10\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"10\"],\n  [layout-gt-md=\"row\"] > [flex=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-width: 10%; }\n  [layout=\"column\"] > [flex-gt-md=\"10\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"10\"],\n  [layout-gt-md=\"column\"] > [flex=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-height: 10%; }\n  [layout=\"row\"] > [flex-gt-md=\"15\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"15\"],\n  [layout-gt-md=\"row\"] > [flex=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-width: 15%; }\n  [layout=\"column\"] > [flex-gt-md=\"15\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"15\"],\n  [layout-gt-md=\"column\"] > [flex=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-height: 15%; }\n  [layout=\"row\"] > [flex-gt-md=\"20\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"20\"],\n  [layout-gt-md=\"row\"] > [flex=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-width: 20%; }\n  [layout=\"column\"] > [flex-gt-md=\"20\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"20\"],\n  [layout-gt-md=\"column\"] > [flex=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-height: 20%; }\n  [layout=\"row\"] > [flex-gt-md=\"25\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"25\"],\n  [layout-gt-md=\"row\"] > [flex=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-width: 25%; }\n  [layout=\"column\"] > [flex-gt-md=\"25\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"25\"],\n  [layout-gt-md=\"column\"] > [flex=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-height: 25%; }\n  [layout=\"row\"] > [flex-gt-md=\"30\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"30\"],\n  [layout-gt-md=\"row\"] > [flex=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-width: 30%; }\n  [layout=\"column\"] > [flex-gt-md=\"30\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"30\"],\n  [layout-gt-md=\"column\"] > [flex=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-height: 30%; }\n  [layout=\"row\"] > [flex-gt-md=\"35\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"35\"],\n  [layout-gt-md=\"row\"] > [flex=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-width: 35%; }\n  [layout=\"column\"] > [flex-gt-md=\"35\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"35\"],\n  [layout-gt-md=\"column\"] > [flex=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-height: 35%; }\n  [layout=\"row\"] > [flex-gt-md=\"40\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"40\"],\n  [layout-gt-md=\"row\"] > [flex=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-width: 40%; }\n  [layout=\"column\"] > [flex-gt-md=\"40\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"40\"],\n  [layout-gt-md=\"column\"] > [flex=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-height: 40%; }\n  [layout=\"row\"] > [flex-gt-md=\"45\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"45\"],\n  [layout-gt-md=\"row\"] > [flex=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-width: 45%; }\n  [layout=\"column\"] > [flex-gt-md=\"45\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"45\"],\n  [layout-gt-md=\"column\"] > [flex=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-height: 45%; }\n  [layout=\"row\"] > [flex-gt-md=\"50\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"50\"],\n  [layout-gt-md=\"row\"] > [flex=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-width: 50%; }\n  [layout=\"column\"] > [flex-gt-md=\"50\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"50\"],\n  [layout-gt-md=\"column\"] > [flex=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-height: 50%; }\n  [layout=\"row\"] > [flex-gt-md=\"55\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"55\"],\n  [layout-gt-md=\"row\"] > [flex=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-width: 55%; }\n  [layout=\"column\"] > [flex-gt-md=\"55\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"55\"],\n  [layout-gt-md=\"column\"] > [flex=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-height: 55%; }\n  [layout=\"row\"] > [flex-gt-md=\"60\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"60\"],\n  [layout-gt-md=\"row\"] > [flex=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-width: 60%; }\n  [layout=\"column\"] > [flex-gt-md=\"60\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"60\"],\n  [layout-gt-md=\"column\"] > [flex=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-height: 60%; }\n  [layout=\"row\"] > [flex-gt-md=\"65\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"65\"],\n  [layout-gt-md=\"row\"] > [flex=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-width: 65%; }\n  [layout=\"column\"] > [flex-gt-md=\"65\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"65\"],\n  [layout-gt-md=\"column\"] > [flex=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-height: 65%; }\n  [layout=\"row\"] > [flex-gt-md=\"70\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"70\"],\n  [layout-gt-md=\"row\"] > [flex=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-width: 70%; }\n  [layout=\"column\"] > [flex-gt-md=\"70\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"70\"],\n  [layout-gt-md=\"column\"] > [flex=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-height: 70%; }\n  [layout=\"row\"] > [flex-gt-md=\"75\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"75\"],\n  [layout-gt-md=\"row\"] > [flex=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-width: 75%; }\n  [layout=\"column\"] > [flex-gt-md=\"75\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"75\"],\n  [layout-gt-md=\"column\"] > [flex=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-height: 75%; }\n  [layout=\"row\"] > [flex-gt-md=\"80\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"80\"],\n  [layout-gt-md=\"row\"] > [flex=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-width: 80%; }\n  [layout=\"column\"] > [flex-gt-md=\"80\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"80\"],\n  [layout-gt-md=\"column\"] > [flex=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-height: 80%; }\n  [layout=\"row\"] > [flex-gt-md=\"85\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"85\"],\n  [layout-gt-md=\"row\"] > [flex=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-width: 85%; }\n  [layout=\"column\"] > [flex-gt-md=\"85\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"85\"],\n  [layout-gt-md=\"column\"] > [flex=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-height: 85%; }\n  [layout=\"row\"] > [flex-gt-md=\"90\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"90\"],\n  [layout-gt-md=\"row\"] > [flex=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-width: 90%; }\n  [layout=\"column\"] > [flex-gt-md=\"90\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"90\"],\n  [layout-gt-md=\"column\"] > [flex=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-height: 90%; }\n  [layout=\"row\"] > [flex-gt-md=\"95\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"95\"],\n  [layout-gt-md=\"row\"] > [flex=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-width: 95%; }\n  [layout=\"column\"] > [flex-gt-md=\"95\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"95\"],\n  [layout-gt-md=\"column\"] > [flex=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-height: 95%; }\n  [layout=\"row\"] > [flex-gt-md=\"100\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"100\"],\n  [layout-gt-md=\"row\"] > [flex=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-width: 100%; }\n  [layout=\"column\"] > [flex-gt-md=\"100\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"100\"],\n  [layout-gt-md=\"column\"] > [flex=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-height: 100%; }\n  [layout=\"row\"] > [flex-gt-md=\"33\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"33\"],\n  [layout-gt-md=\"row\"] > [flex=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-width: 33.33%; }\n  [layout=\"column\"] > [flex-gt-md=\"33\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"33\"],\n  [layout-gt-md=\"column\"] > [flex=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-height: 33.33%; }\n  [layout=\"row\"] > [flex-gt-md=\"66\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"66\"],\n  [layout-gt-md=\"row\"] > [flex=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-width: 66.66%; }\n  [layout=\"column\"] > [flex-gt-md=\"66\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"66\"],\n  [layout-gt-md=\"column\"] > [flex=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-height: 66.66%; }\n  [hide-gt-md] {\n    display: none; } }\n\n/* BREAKPOINT lg - 80em */\n@media (min-width: 60em) and (max-width: 79em) {\n  [flex-order-lg=\"0\"] {\n    -ms-flex-order: 0;\n        order: 0; }\n  [flex-order-lg=\"1\"] {\n    -ms-flex-order: 1;\n        order: 1; }\n  [flex-order-lg=\"2\"] {\n    -ms-flex-order: 2;\n        order: 2; }\n  [flex-order-lg=\"3\"] {\n    -ms-flex-order: 3;\n        order: 3; }\n  [flex-order-lg=\"4\"] {\n    -ms-flex-order: 4;\n        order: 4; }\n  [flex-order-lg=\"5\"] {\n    -ms-flex-order: 5;\n        order: 5; }\n  [flex-order-lg=\"6\"] {\n    -ms-flex-order: 6;\n        order: 6; }\n  [flex-order-lg=\"7\"] {\n    -ms-flex-order: 7;\n        order: 7; }\n  [flex-order-lg=\"8\"] {\n    -ms-flex-order: 8;\n        order: 8; }\n  [flex-order-lg=\"9\"] {\n    -ms-flex-order: 9;\n        order: 9; }\n  [flex-order-lg=\"10\"] {\n    -ms-flex-order: 10;\n        order: 10; }\n  [flex-order-lg=\"11\"] {\n    -ms-flex-order: 11;\n        order: 11; }\n  [flex-order-lg=\"12\"] {\n    -ms-flex-order: 12;\n        order: 12; }\n  [flex-order-lg=\"13\"] {\n    -ms-flex-order: 13;\n        order: 13; }\n  [flex-order-lg=\"14\"] {\n    -ms-flex-order: 14;\n        order: 14; }\n  [flex-order-lg=\"15\"] {\n    -ms-flex-order: 15;\n        order: 15; }\n  [flex-order-lg=\"16\"] {\n    -ms-flex-order: 16;\n        order: 16; }\n  [flex-order-lg=\"17\"] {\n    -ms-flex-order: 17;\n        order: 17; }\n  [flex-order-lg=\"18\"] {\n    -ms-flex-order: 18;\n        order: 18; }\n  [flex-order-lg=\"19\"] {\n    -ms-flex-order: 19;\n        order: 19; }\n  [flex-order-lg=\"20\"] {\n    -ms-flex-order: 20;\n        order: 20; }\n  [layout-lg] {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap; }\n  [layout-lg] > * {\n    box-sizing: border-box; }\n  [layout-lg=\"column\"] {\n    -ms-flex-direction: column;\n        flex-direction: column; }\n  [layout-lg=\"row\"] {\n    -ms-flex-direction: row;\n        flex-direction: row; }\n  [layout-align-lg] {\n    -ms-flex-pack: start;\n        justify-content: flex-start;\n    -ms-flex-line-pack: stretch;\n        align-content: stretch;\n    -ms-flex-align: stretch;\n        align-items: stretch; }\n  [layout-align-lg^=\"start\"] {\n    -ms-flex-pack: start;\n        justify-content: flex-start; }\n  [layout-align-lg^=\"center\"] {\n    -ms-flex-pack: center;\n        justify-content: center; }\n  [layout-align-lg^=\"end\"] {\n    -ms-flex-pack: end;\n        justify-content: flex-end; }\n  [layout-align-lg^=\"space-around\"] {\n    -ms-flex-pack: distribute;\n        justify-content: space-around; }\n  [layout-align-lg^=\"space-between\"] {\n    -ms-flex-pack: justify;\n        justify-content: space-between; }\n  [layout-align-lg$=\"start\"] {\n    -ms-flex-align: start;\n        align-items: flex-start;\n    -ms-flex-line-pack: start;\n        align-content: flex-start; }\n  [layout-align-lg$=\"center\"] {\n    -ms-flex-align: center;\n        align-items: center;\n    -ms-flex-line-pack: center;\n        align-content: center;\n    max-width: 100%; }\n  [layout-align-lg$=\"center\"] > * {\n    max-width: 100%; }\n  [layout-align-lg$=\"end\"] {\n    -ms-flex-align: end;\n        align-items: flex-end;\n    -ms-flex-line-pack: end;\n        align-content: flex-end; }\n  [layout-align-lg=\"start\"],\n  [layout-align-lg=\"end\"],\n  [layout-align-lg=\"center\"],\n  [layout-align-lg=\"space-around\"],\n  [layout-align-lg=\"space-between\"] {\n    -ms-flex-align: stretch;\n        align-items: stretch;\n    -ms-flex-line-pack: stretch;\n        align-content: stretch; }\n  [flex-lg] {\n    -ms-flex: 1;\n        flex: 1; }\n  [flex-lg-start] {\n    margin-bottom: auto; }\n  [flex-lg-end] {\n    margin-top: auto; }\n  [flex-lg-none] {\n    -ms-flex: 0 0 auto;\n        flex: 0 0 auto; }\n  [flex-lg-initial] {\n    -ms-flex: 0 1 auto;\n        flex: 0 1 auto; }\n  [flex-lg-noshrink] {\n    -ms-flex: 1 0 auto;\n        flex: 1 0 auto; }\n  [flex-lg-auto] {\n    -ms-flex: 1 1 auto;\n        flex: 1 1 auto; }\n  [flex-lg-grow] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%; }\n  [flex-lg],\n  [layout=\"row\"] > [flex-lg],\n  [layout-lg=\"row\"] > [flex-lg] {\n    max-height: 100%; }\n  [layout-lg=\"column\"] > [flex-lg],\n  [layout=\"column\"] > [flex-lg] {\n    max-width: 100%; }\n  [layout=\"row\"] > [flex-lg=\"5\"],\n  [layout-lg=\"row\"] > [flex-lg=\"5\"],\n  [layout-lg=\"row\"] > [flex=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-width: 5%; }\n  [layout=\"column\"] > [flex-lg=\"5\"],\n  [layout-lg=\"column\"] > [flex-lg=\"5\"],\n  [layout-lg=\"column\"] > [flex=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-height: 5%; }\n  [layout=\"row\"] > [flex-lg=\"10\"],\n  [layout-lg=\"row\"] > [flex-lg=\"10\"],\n  [layout-lg=\"row\"] > [flex=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-width: 10%; }\n  [layout=\"column\"] > [flex-lg=\"10\"],\n  [layout-lg=\"column\"] > [flex-lg=\"10\"],\n  [layout-lg=\"column\"] > [flex=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-height: 10%; }\n  [layout=\"row\"] > [flex-lg=\"15\"],\n  [layout-lg=\"row\"] > [flex-lg=\"15\"],\n  [layout-lg=\"row\"] > [flex=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-width: 15%; }\n  [layout=\"column\"] > [flex-lg=\"15\"],\n  [layout-lg=\"column\"] > [flex-lg=\"15\"],\n  [layout-lg=\"column\"] > [flex=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-height: 15%; }\n  [layout=\"row\"] > [flex-lg=\"20\"],\n  [layout-lg=\"row\"] > [flex-lg=\"20\"],\n  [layout-lg=\"row\"] > [flex=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-width: 20%; }\n  [layout=\"column\"] > [flex-lg=\"20\"],\n  [layout-lg=\"column\"] > [flex-lg=\"20\"],\n  [layout-lg=\"column\"] > [flex=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-height: 20%; }\n  [layout=\"row\"] > [flex-lg=\"25\"],\n  [layout-lg=\"row\"] > [flex-lg=\"25\"],\n  [layout-lg=\"row\"] > [flex=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-width: 25%; }\n  [layout=\"column\"] > [flex-lg=\"25\"],\n  [layout-lg=\"column\"] > [flex-lg=\"25\"],\n  [layout-lg=\"column\"] > [flex=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-height: 25%; }\n  [layout=\"row\"] > [flex-lg=\"30\"],\n  [layout-lg=\"row\"] > [flex-lg=\"30\"],\n  [layout-lg=\"row\"] > [flex=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-width: 30%; }\n  [layout=\"column\"] > [flex-lg=\"30\"],\n  [layout-lg=\"column\"] > [flex-lg=\"30\"],\n  [layout-lg=\"column\"] > [flex=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-height: 30%; }\n  [layout=\"row\"] > [flex-lg=\"35\"],\n  [layout-lg=\"row\"] > [flex-lg=\"35\"],\n  [layout-lg=\"row\"] > [flex=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-width: 35%; }\n  [layout=\"column\"] > [flex-lg=\"35\"],\n  [layout-lg=\"column\"] > [flex-lg=\"35\"],\n  [layout-lg=\"column\"] > [flex=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-height: 35%; }\n  [layout=\"row\"] > [flex-lg=\"40\"],\n  [layout-lg=\"row\"] > [flex-lg=\"40\"],\n  [layout-lg=\"row\"] > [flex=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-width: 40%; }\n  [layout=\"column\"] > [flex-lg=\"40\"],\n  [layout-lg=\"column\"] > [flex-lg=\"40\"],\n  [layout-lg=\"column\"] > [flex=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-height: 40%; }\n  [layout=\"row\"] > [flex-lg=\"45\"],\n  [layout-lg=\"row\"] > [flex-lg=\"45\"],\n  [layout-lg=\"row\"] > [flex=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-width: 45%; }\n  [layout=\"column\"] > [flex-lg=\"45\"],\n  [layout-lg=\"column\"] > [flex-lg=\"45\"],\n  [layout-lg=\"column\"] > [flex=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-height: 45%; }\n  [layout=\"row\"] > [flex-lg=\"50\"],\n  [layout-lg=\"row\"] > [flex-lg=\"50\"],\n  [layout-lg=\"row\"] > [flex=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-width: 50%; }\n  [layout=\"column\"] > [flex-lg=\"50\"],\n  [layout-lg=\"column\"] > [flex-lg=\"50\"],\n  [layout-lg=\"column\"] > [flex=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-height: 50%; }\n  [layout=\"row\"] > [flex-lg=\"55\"],\n  [layout-lg=\"row\"] > [flex-lg=\"55\"],\n  [layout-lg=\"row\"] > [flex=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-width: 55%; }\n  [layout=\"column\"] > [flex-lg=\"55\"],\n  [layout-lg=\"column\"] > [flex-lg=\"55\"],\n  [layout-lg=\"column\"] > [flex=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-height: 55%; }\n  [layout=\"row\"] > [flex-lg=\"60\"],\n  [layout-lg=\"row\"] > [flex-lg=\"60\"],\n  [layout-lg=\"row\"] > [flex=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-width: 60%; }\n  [layout=\"column\"] > [flex-lg=\"60\"],\n  [layout-lg=\"column\"] > [flex-lg=\"60\"],\n  [layout-lg=\"column\"] > [flex=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-height: 60%; }\n  [layout=\"row\"] > [flex-lg=\"65\"],\n  [layout-lg=\"row\"] > [flex-lg=\"65\"],\n  [layout-lg=\"row\"] > [flex=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-width: 65%; }\n  [layout=\"column\"] > [flex-lg=\"65\"],\n  [layout-lg=\"column\"] > [flex-lg=\"65\"],\n  [layout-lg=\"column\"] > [flex=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-height: 65%; }\n  [layout=\"row\"] > [flex-lg=\"70\"],\n  [layout-lg=\"row\"] > [flex-lg=\"70\"],\n  [layout-lg=\"row\"] > [flex=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-width: 70%; }\n  [layout=\"column\"] > [flex-lg=\"70\"],\n  [layout-lg=\"column\"] > [flex-lg=\"70\"],\n  [layout-lg=\"column\"] > [flex=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-height: 70%; }\n  [layout=\"row\"] > [flex-lg=\"75\"],\n  [layout-lg=\"row\"] > [flex-lg=\"75\"],\n  [layout-lg=\"row\"] > [flex=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-width: 75%; }\n  [layout=\"column\"] > [flex-lg=\"75\"],\n  [layout-lg=\"column\"] > [flex-lg=\"75\"],\n  [layout-lg=\"column\"] > [flex=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-height: 75%; }\n  [layout=\"row\"] > [flex-lg=\"80\"],\n  [layout-lg=\"row\"] > [flex-lg=\"80\"],\n  [layout-lg=\"row\"] > [flex=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-width: 80%; }\n  [layout=\"column\"] > [flex-lg=\"80\"],\n  [layout-lg=\"column\"] > [flex-lg=\"80\"],\n  [layout-lg=\"column\"] > [flex=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-height: 80%; }\n  [layout=\"row\"] > [flex-lg=\"85\"],\n  [layout-lg=\"row\"] > [flex-lg=\"85\"],\n  [layout-lg=\"row\"] > [flex=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-width: 85%; }\n  [layout=\"column\"] > [flex-lg=\"85\"],\n  [layout-lg=\"column\"] > [flex-lg=\"85\"],\n  [layout-lg=\"column\"] > [flex=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-height: 85%; }\n  [layout=\"row\"] > [flex-lg=\"90\"],\n  [layout-lg=\"row\"] > [flex-lg=\"90\"],\n  [layout-lg=\"row\"] > [flex=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-width: 90%; }\n  [layout=\"column\"] > [flex-lg=\"90\"],\n  [layout-lg=\"column\"] > [flex-lg=\"90\"],\n  [layout-lg=\"column\"] > [flex=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-height: 90%; }\n  [layout=\"row\"] > [flex-lg=\"95\"],\n  [layout-lg=\"row\"] > [flex-lg=\"95\"],\n  [layout-lg=\"row\"] > [flex=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-width: 95%; }\n  [layout=\"column\"] > [flex-lg=\"95\"],\n  [layout-lg=\"column\"] > [flex-lg=\"95\"],\n  [layout-lg=\"column\"] > [flex=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-height: 95%; }\n  [layout=\"row\"] > [flex-lg=\"100\"],\n  [layout-lg=\"row\"] > [flex-lg=\"100\"],\n  [layout-lg=\"row\"] > [flex=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-width: 100%; }\n  [layout=\"column\"] > [flex-lg=\"100\"],\n  [layout-lg=\"column\"] > [flex-lg=\"100\"],\n  [layout-lg=\"column\"] > [flex=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-height: 100%; }\n  [layout=\"row\"] > [flex-lg=\"33\"],\n  [layout-lg=\"row\"] > [flex-lg=\"33\"],\n  [layout-lg=\"row\"] > [flex=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-width: 33.33%; }\n  [layout=\"column\"] > [flex-lg=\"33\"],\n  [layout-lg=\"column\"] > [flex-lg=\"33\"],\n  [layout-lg=\"column\"] > [flex=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-height: 33.33%; }\n  [layout=\"row\"] > [flex-lg=\"66\"],\n  [layout-lg=\"row\"] > [flex-lg=\"66\"],\n  [layout-lg=\"row\"] > [flex=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-width: 66.66%; }\n  [layout=\"column\"] > [flex-lg=\"66\"],\n  [layout-lg=\"column\"] > [flex-lg=\"66\"],\n  [layout-lg=\"column\"] > [flex=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-height: 66.66%; }\n  [hide-lg] {\n    display: none; } }\n\n@media (min-width: 80em) {\n  [flex-order-gt-lg=\"0\"] {\n    -ms-flex-order: 0;\n        order: 0; }\n  [flex-order-gt-lg=\"1\"] {\n    -ms-flex-order: 1;\n        order: 1; }\n  [flex-order-gt-lg=\"2\"] {\n    -ms-flex-order: 2;\n        order: 2; }\n  [flex-order-gt-lg=\"3\"] {\n    -ms-flex-order: 3;\n        order: 3; }\n  [flex-order-gt-lg=\"4\"] {\n    -ms-flex-order: 4;\n        order: 4; }\n  [flex-order-gt-lg=\"5\"] {\n    -ms-flex-order: 5;\n        order: 5; }\n  [flex-order-gt-lg=\"6\"] {\n    -ms-flex-order: 6;\n        order: 6; }\n  [flex-order-gt-lg=\"7\"] {\n    -ms-flex-order: 7;\n        order: 7; }\n  [flex-order-gt-lg=\"8\"] {\n    -ms-flex-order: 8;\n        order: 8; }\n  [flex-order-gt-lg=\"9\"] {\n    -ms-flex-order: 9;\n        order: 9; }\n  [flex-order-gt-lg=\"10\"] {\n    -ms-flex-order: 10;\n        order: 10; }\n  [flex-order-gt-lg=\"11\"] {\n    -ms-flex-order: 11;\n        order: 11; }\n  [flex-order-gt-lg=\"12\"] {\n    -ms-flex-order: 12;\n        order: 12; }\n  [flex-order-gt-lg=\"13\"] {\n    -ms-flex-order: 13;\n        order: 13; }\n  [flex-order-gt-lg=\"14\"] {\n    -ms-flex-order: 14;\n        order: 14; }\n  [flex-order-gt-lg=\"15\"] {\n    -ms-flex-order: 15;\n        order: 15; }\n  [flex-order-gt-lg=\"16\"] {\n    -ms-flex-order: 16;\n        order: 16; }\n  [flex-order-gt-lg=\"17\"] {\n    -ms-flex-order: 17;\n        order: 17; }\n  [flex-order-gt-lg=\"18\"] {\n    -ms-flex-order: 18;\n        order: 18; }\n  [flex-order-gt-lg=\"19\"] {\n    -ms-flex-order: 19;\n        order: 19; }\n  [flex-order-gt-lg=\"20\"] {\n    -ms-flex-order: 20;\n        order: 20; }\n  [layout-gt-lg] {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap; }\n  [layout-gt-lg] > * {\n    box-sizing: border-box; }\n  [layout-gt-lg=\"column\"] {\n    -ms-flex-direction: column;\n        flex-direction: column; }\n  [layout-gt-lg=\"row\"] {\n    -ms-flex-direction: row;\n        flex-direction: row; }\n  [layout-align-gt-lg] {\n    -ms-flex-pack: start;\n        justify-content: flex-start;\n    -ms-flex-line-pack: stretch;\n        align-content: stretch;\n    -ms-flex-align: stretch;\n        align-items: stretch; }\n  [layout-align-gt-lg^=\"start\"] {\n    -ms-flex-pack: start;\n        justify-content: flex-start; }\n  [layout-align-gt-lg^=\"center\"] {\n    -ms-flex-pack: center;\n        justify-content: center; }\n  [layout-align-gt-lg^=\"end\"] {\n    -ms-flex-pack: end;\n        justify-content: flex-end; }\n  [layout-align-gt-lg^=\"space-around\"] {\n    -ms-flex-pack: distribute;\n        justify-content: space-around; }\n  [layout-align-gt-lg^=\"space-between\"] {\n    -ms-flex-pack: justify;\n        justify-content: space-between; }\n  [layout-align-gt-lg$=\"start\"] {\n    -ms-flex-align: start;\n        align-items: flex-start;\n    -ms-flex-line-pack: start;\n        align-content: flex-start; }\n  [layout-align-gt-lg$=\"center\"] {\n    -ms-flex-align: center;\n        align-items: center;\n    -ms-flex-line-pack: center;\n        align-content: center;\n    max-width: 100%; }\n  [layout-align-gt-lg$=\"center\"] > * {\n    max-width: 100%; }\n  [layout-align-gt-lg$=\"end\"] {\n    -ms-flex-align: end;\n        align-items: flex-end;\n    -ms-flex-line-pack: end;\n        align-content: flex-end; }\n  [layout-align-gt-lg=\"start\"],\n  [layout-align-gt-lg=\"end\"],\n  [layout-align-gt-lg=\"center\"],\n  [layout-align-gt-lg=\"space-around\"],\n  [layout-align-gt-lg=\"space-between\"] {\n    -ms-flex-align: stretch;\n        align-items: stretch;\n    -ms-flex-line-pack: stretch;\n        align-content: stretch; }\n  [flex-gt-lg] {\n    -ms-flex: 1;\n        flex: 1; }\n  [flex-gt-lg-start] {\n    margin-bottom: auto; }\n  [flex-gt-lg-end] {\n    margin-top: auto; }\n  [flex-gt-lg-none] {\n    -ms-flex: 0 0 auto;\n        flex: 0 0 auto; }\n  [flex-gt-lg-initial] {\n    -ms-flex: 0 1 auto;\n        flex: 0 1 auto; }\n  [flex-gt-lg-noshrink] {\n    -ms-flex: 1 0 auto;\n        flex: 1 0 auto; }\n  [flex-gt-lg-auto] {\n    -ms-flex: 1 1 auto;\n        flex: 1 1 auto; }\n  [flex-gt-lg-grow] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%; }\n  [flex-gt-lg],\n  [layout=\"row\"] > [flex-gt-lg],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg] {\n    max-height: 100%; }\n  [layout-gt-lg=\"column\"] > [flex-gt-lg],\n  [layout=\"column\"] > [flex-gt-lg] {\n    max-width: 100%; }\n  [layout=\"row\"] > [flex-gt-lg=\"5\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"5\"],\n  [layout-gt-lg=\"row\"] > [flex=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-width: 5%; }\n  [layout=\"column\"] > [flex-gt-lg=\"5\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"5\"],\n  [layout-gt-lg=\"column\"] > [flex=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-height: 5%; }\n  [layout=\"row\"] > [flex-gt-lg=\"10\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"10\"],\n  [layout-gt-lg=\"row\"] > [flex=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-width: 10%; }\n  [layout=\"column\"] > [flex-gt-lg=\"10\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"10\"],\n  [layout-gt-lg=\"column\"] > [flex=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-height: 10%; }\n  [layout=\"row\"] > [flex-gt-lg=\"15\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"15\"],\n  [layout-gt-lg=\"row\"] > [flex=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-width: 15%; }\n  [layout=\"column\"] > [flex-gt-lg=\"15\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"15\"],\n  [layout-gt-lg=\"column\"] > [flex=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-height: 15%; }\n  [layout=\"row\"] > [flex-gt-lg=\"20\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"20\"],\n  [layout-gt-lg=\"row\"] > [flex=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-width: 20%; }\n  [layout=\"column\"] > [flex-gt-lg=\"20\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"20\"],\n  [layout-gt-lg=\"column\"] > [flex=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-height: 20%; }\n  [layout=\"row\"] > [flex-gt-lg=\"25\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"25\"],\n  [layout-gt-lg=\"row\"] > [flex=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-width: 25%; }\n  [layout=\"column\"] > [flex-gt-lg=\"25\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"25\"],\n  [layout-gt-lg=\"column\"] > [flex=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-height: 25%; }\n  [layout=\"row\"] > [flex-gt-lg=\"30\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"30\"],\n  [layout-gt-lg=\"row\"] > [flex=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-width: 30%; }\n  [layout=\"column\"] > [flex-gt-lg=\"30\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"30\"],\n  [layout-gt-lg=\"column\"] > [flex=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-height: 30%; }\n  [layout=\"row\"] > [flex-gt-lg=\"35\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"35\"],\n  [layout-gt-lg=\"row\"] > [flex=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-width: 35%; }\n  [layout=\"column\"] > [flex-gt-lg=\"35\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"35\"],\n  [layout-gt-lg=\"column\"] > [flex=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-height: 35%; }\n  [layout=\"row\"] > [flex-gt-lg=\"40\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"40\"],\n  [layout-gt-lg=\"row\"] > [flex=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-width: 40%; }\n  [layout=\"column\"] > [flex-gt-lg=\"40\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"40\"],\n  [layout-gt-lg=\"column\"] > [flex=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-height: 40%; }\n  [layout=\"row\"] > [flex-gt-lg=\"45\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"45\"],\n  [layout-gt-lg=\"row\"] > [flex=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-width: 45%; }\n  [layout=\"column\"] > [flex-gt-lg=\"45\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"45\"],\n  [layout-gt-lg=\"column\"] > [flex=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-height: 45%; }\n  [layout=\"row\"] > [flex-gt-lg=\"50\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"50\"],\n  [layout-gt-lg=\"row\"] > [flex=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-width: 50%; }\n  [layout=\"column\"] > [flex-gt-lg=\"50\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"50\"],\n  [layout-gt-lg=\"column\"] > [flex=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-height: 50%; }\n  [layout=\"row\"] > [flex-gt-lg=\"55\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"55\"],\n  [layout-gt-lg=\"row\"] > [flex=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-width: 55%; }\n  [layout=\"column\"] > [flex-gt-lg=\"55\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"55\"],\n  [layout-gt-lg=\"column\"] > [flex=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-height: 55%; }\n  [layout=\"row\"] > [flex-gt-lg=\"60\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"60\"],\n  [layout-gt-lg=\"row\"] > [flex=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-width: 60%; }\n  [layout=\"column\"] > [flex-gt-lg=\"60\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"60\"],\n  [layout-gt-lg=\"column\"] > [flex=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-height: 60%; }\n  [layout=\"row\"] > [flex-gt-lg=\"65\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"65\"],\n  [layout-gt-lg=\"row\"] > [flex=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-width: 65%; }\n  [layout=\"column\"] > [flex-gt-lg=\"65\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"65\"],\n  [layout-gt-lg=\"column\"] > [flex=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-height: 65%; }\n  [layout=\"row\"] > [flex-gt-lg=\"70\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"70\"],\n  [layout-gt-lg=\"row\"] > [flex=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-width: 70%; }\n  [layout=\"column\"] > [flex-gt-lg=\"70\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"70\"],\n  [layout-gt-lg=\"column\"] > [flex=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-height: 70%; }\n  [layout=\"row\"] > [flex-gt-lg=\"75\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"75\"],\n  [layout-gt-lg=\"row\"] > [flex=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-width: 75%; }\n  [layout=\"column\"] > [flex-gt-lg=\"75\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"75\"],\n  [layout-gt-lg=\"column\"] > [flex=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-height: 75%; }\n  [layout=\"row\"] > [flex-gt-lg=\"80\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"80\"],\n  [layout-gt-lg=\"row\"] > [flex=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-width: 80%; }\n  [layout=\"column\"] > [flex-gt-lg=\"80\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"80\"],\n  [layout-gt-lg=\"column\"] > [flex=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-height: 80%; }\n  [layout=\"row\"] > [flex-gt-lg=\"85\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"85\"],\n  [layout-gt-lg=\"row\"] > [flex=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-width: 85%; }\n  [layout=\"column\"] > [flex-gt-lg=\"85\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"85\"],\n  [layout-gt-lg=\"column\"] > [flex=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-height: 85%; }\n  [layout=\"row\"] > [flex-gt-lg=\"90\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"90\"],\n  [layout-gt-lg=\"row\"] > [flex=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-width: 90%; }\n  [layout=\"column\"] > [flex-gt-lg=\"90\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"90\"],\n  [layout-gt-lg=\"column\"] > [flex=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-height: 90%; }\n  [layout=\"row\"] > [flex-gt-lg=\"95\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"95\"],\n  [layout-gt-lg=\"row\"] > [flex=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-width: 95%; }\n  [layout=\"column\"] > [flex-gt-lg=\"95\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"95\"],\n  [layout-gt-lg=\"column\"] > [flex=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-height: 95%; }\n  [layout=\"row\"] > [flex-gt-lg=\"100\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"100\"],\n  [layout-gt-lg=\"row\"] > [flex=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-width: 100%; }\n  [layout=\"column\"] > [flex-gt-lg=\"100\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"100\"],\n  [layout-gt-lg=\"column\"] > [flex=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-height: 100%; }\n  [layout=\"row\"] > [flex-gt-lg=\"33\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"33\"],\n  [layout-gt-lg=\"row\"] > [flex=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-width: 33.33%; }\n  [layout=\"column\"] > [flex-gt-lg=\"33\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"33\"],\n  [layout-gt-lg=\"column\"] > [flex=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-height: 33.33%; }\n  [layout=\"row\"] > [flex-gt-lg=\"66\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"66\"],\n  [layout-gt-lg=\"row\"] > [flex=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-width: 66.66%; }\n  [layout=\"column\"] > [flex-gt-lg=\"66\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"66\"],\n  [layout-gt-lg=\"column\"] > [flex=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-height: 66.66%; }\n  [hide-gt-lg] {\n    display: none; } }\n\n[layout-padding] > [flex-sm] {\n  padding: 0.25em; }\n\n[layout-padding],\n[layout-padding] > [flex],\n[layout-padding] > [flex-gt-sm],\n[layout-padding] > [flex-md] {\n  padding: 0.5em; }\n\n[layout-padding] > [flex-gt-md],\n[layout-padding] > [flex-lg] {\n  padding: 1em; }\n\n[layout-margin] > [flex-sm] {\n  margin: 0.25em; }\n\n[layout-margin],\n[layout-margin] > [flex],\n[layout-margin] > [flex-gt-sm],\n[layout-margin] > [flex-md] {\n  margin: 0.5em; }\n\n[layout-margin] > [flex-gt-md],\n[layout-margin] > [flex-lg] {\n  margin: 1em; }\n\n[layout-nowrap] {\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap; }\n", ""]);
	
	// exports


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/* Riot v3.1.0, @license MIT */
	(function (global, factory) {
	  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.riot = global.riot || {});
	})(this, function (exports) {
	  'use strict';
	
	  var __TAGS_CACHE = [];
	  var __TAG_IMPL = {};
	  var GLOBAL_MIXIN = '__global_mixin';
	  var ATTRS_PREFIX = 'riot-';
	  var REF_DIRECTIVES = ['ref', 'data-ref'];
	  var IS_DIRECTIVE = 'data-is';
	  var CONDITIONAL_DIRECTIVE = 'if';
	  var LOOP_DIRECTIVE = 'each';
	  var LOOP_NO_REORDER_DIRECTIVE = 'no-reorder';
	  var SHOW_DIRECTIVE = 'show';
	  var HIDE_DIRECTIVE = 'hide';
	  var T_STRING = 'string';
	  var T_OBJECT = 'object';
	  var T_UNDEF = 'undefined';
	  var T_FUNCTION = 'function';
	  var XLINK_NS = 'http://www.w3.org/1999/xlink';
	  var XLINK_REGEX = /^xlink:(\w+)/;
	  var WIN = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === T_UNDEF ? undefined : window;
	  var RE_SPECIAL_TAGS = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/;
	  var RE_SPECIAL_TAGS_NO_OPTION = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;
	  var RE_RESERVED_NAMES = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|refs|parent|opts|trigger|o(?:n|ff|ne))$/;
	  var RE_SVG_TAGS = /^(altGlyph|animate(?:Color)?|circle|clipPath|defs|ellipse|fe(?:Blend|ColorMatrix|ComponentTransfer|Composite|ConvolveMatrix|DiffuseLighting|DisplacementMap|Flood|GaussianBlur|Image|Merge|Morphology|Offset|SpecularLighting|Tile|Turbulence)|filter|font|foreignObject|g(?:lyph)?(?:Ref)?|image|line(?:arGradient)?|ma(?:rker|sk)|missing-glyph|path|pattern|poly(?:gon|line)|radialGradient|rect|stop|svg|switch|symbol|text(?:Path)?|tref|tspan|use)$/;
	  var RE_HTML_ATTRS = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;
	  var CASE_SENSITIVE_ATTRIBUTES = { 'viewbox': 'viewBox' };
	  var RE_BOOL_ATTRS = /^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/;
	  var IE_VERSION = (WIN && WIN.document || {}).documentMode | 0;
	
	  /**
	   * Check whether a DOM node must be considered a part of an svg document
	   * @param   { String } name -
	   * @returns { Boolean } -
	   */
	  function isSVGTag(name) {
	    return RE_SVG_TAGS.test(name);
	  }
	
	  /**
	   * Check Check if the passed argument is undefined
	   * @param   { String } value -
	   * @returns { Boolean } -
	   */
	  function isBoolAttr(value) {
	    return RE_BOOL_ATTRS.test(value);
	  }
	
	  /**
	   * Check if passed argument is a function
	   * @param   { * } value -
	   * @returns { Boolean } -
	   */
	  function isFunction(value) {
	    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === T_FUNCTION;
	  }
	
	  /**
	   * Check if passed argument is an object, exclude null
	   * NOTE: use isObject(x) && !isArray(x) to excludes arrays.
	   * @param   { * } value -
	   * @returns { Boolean } -
	   */
	  function isObject(value) {
	    return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === T_OBJECT; // typeof null is 'object'
	  }
	
	  /**
	   * Check if passed argument is undefined
	   * @param   { * } value -
	   * @returns { Boolean } -
	   */
	  function isUndefined(value) {
	    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === T_UNDEF;
	  }
	
	  /**
	   * Check if passed argument is a string
	   * @param   { * } value -
	   * @returns { Boolean } -
	   */
	  function isString(value) {
	    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === T_STRING;
	  }
	
	  /**
	   * Check if passed argument is empty. Different from falsy, because we dont consider 0 or false to be blank
	   * @param { * } value -
	   * @returns { Boolean } -
	   */
	  function isBlank(value) {
	    return isUndefined(value) || value === null || value === '';
	  }
	
	  /**
	   * Check if passed argument is a kind of array
	   * @param   { * } value -
	   * @returns { Boolean } -
	   */
	  function isArray(value) {
	    return Array.isArray(value) || value instanceof Array;
	  }
	
	  /**
	   * Check whether object's property could be overridden
	   * @param   { Object }  obj - source object
	   * @param   { String }  key - object property
	   * @returns { Boolean } -
	   */
	  function isWritable(obj, key) {
	    var descriptor = Object.getOwnPropertyDescriptor(obj, key);
	    return isUndefined(obj[key]) || descriptor && descriptor.writable;
	  }
	
	  /**
	   * Check if passed argument is a reserved name
	   * @param   { String } value -
	   * @returns { Boolean } -
	   */
	  function isReservedName(value) {
	    return RE_RESERVED_NAMES.test(value);
	  }
	
	  var check = Object.freeze({
	    isSVGTag: isSVGTag,
	    isBoolAttr: isBoolAttr,
	    isFunction: isFunction,
	    isObject: isObject,
	    isUndefined: isUndefined,
	    isString: isString,
	    isBlank: isBlank,
	    isArray: isArray,
	    isWritable: isWritable,
	    isReservedName: isReservedName
	  });
	
	  /**
	   * Shorter and fast way to select multiple nodes in the DOM
	   * @param   { String } selector - DOM selector
	   * @param   { Object } ctx - DOM node where the targets of our search will is located
	   * @returns { Object } dom nodes found
	   */
	  function $$(selector, ctx) {
	    return (ctx || document).querySelectorAll(selector);
	  }
	
	  /**
	   * Shorter and fast way to select a single node in the DOM
	   * @param   { String } selector - unique dom selector
	   * @param   { Object } ctx - DOM node where the target of our search will is located
	   * @returns { Object } dom node found
	   */
	  function $(selector, ctx) {
	    return (ctx || document).querySelector(selector);
	  }
	
	  /**
	   * Create a document fragment
	   * @returns { Object } document fragment
	   */
	  function createFrag() {
	    return document.createDocumentFragment();
	  }
	
	  /**
	   * Create a document text node
	   * @returns { Object } create a text node to use as placeholder
	   */
	  function createDOMPlaceholder() {
	    return document.createTextNode('');
	  }
	
	  /**
	   * Create a generic DOM node
	   * @param   { String } name - name of the DOM node we want to create
	   * @param   { Boolean } isSvg - should we use a SVG as parent node?
	   * @returns { Object } DOM node just created
	   */
	  function mkEl(name, isSvg) {
	    return isSvg ? document.createElementNS('http://www.w3.org/2000/svg', 'svg') : document.createElement(name);
	  }
	
	  /**
	   * Get the outer html of any DOM node SVGs included
	   * @param   { Object } el - DOM node to parse
	   * @returns { String } el.outerHTML
	   */
	  function getOuterHTML(el) {
	    if (el.outerHTML) {
	      return el.outerHTML;
	    }
	    // some browsers do not support outerHTML on the SVGs tags
	    else {
	        var container = mkEl('div');
	        container.appendChild(el.cloneNode(true));
	        return container.innerHTML;
	      }
	  }
	
	  /**
	   * Set the inner html of any DOM node SVGs included
	   * @param { Object } container - DOM node where we'll inject new html
	   * @param { String } html - html to inject
	   */
	  function setInnerHTML(container, html) {
	    if (!isUndefined(container.innerHTML)) {
	      container.innerHTML = html;
	    }
	    // some browsers do not support innerHTML on the SVGs tags
	    else {
	        var doc = new DOMParser().parseFromString(html, 'application/xml');
	        var node = container.ownerDocument.importNode(doc.documentElement, true);
	        container.appendChild(node);
	      }
	  }
	
	  /**
	   * Remove any DOM attribute from a node
	   * @param   { Object } dom - DOM node we want to update
	   * @param   { String } name - name of the property we want to remove
	   */
	  function remAttr(dom, name) {
	    dom.removeAttribute(name);
	  }
	
	  /**
	   * Get the value of any DOM attribute on a node
	   * @param   { Object } dom - DOM node we want to parse
	   * @param   { String } name - name of the attribute we want to get
	   * @returns { String | undefined } name of the node attribute whether it exists
	   */
	  function getAttr(dom, name) {
	    return dom.getAttribute(name);
	  }
	
	  /**
	   * Set any DOM attribute
	   * @param { Object } dom - DOM node we want to update
	   * @param { String } name - name of the property we want to set
	   * @param { String } val - value of the property we want to set
	   */
	  function setAttr(dom, name, val) {
	    var xlink = XLINK_REGEX.exec(name);
	    if (xlink && xlink[1]) {
	      dom.setAttributeNS(XLINK_NS, xlink[1], val);
	    } else {
	      dom.setAttribute(name, val);
	    }
	  }
	
	  /**
	   * Insert safely a tag to fix #1962 #1649
	   * @param   { HTMLElement } root - children container
	   * @param   { HTMLElement } curr - node to insert
	   * @param   { HTMLElement } next - node that should preceed the current node inserted
	   */
	  function safeInsert(root, curr, next) {
	    root.insertBefore(curr, next.parentNode && next);
	  }
	
	  /**
	   * Minimize risk: only zero or one _space_ between attr & value
	   * @param   { String }   html - html string we want to parse
	   * @param   { Function } fn - callback function to apply on any attribute found
	   */
	  function walkAttrs(html, fn) {
	    if (!html) {
	      return;
	    }
	    var m;
	    while (m = RE_HTML_ATTRS.exec(html)) {
	      fn(m[1].toLowerCase(), m[2] || m[3] || m[4]);
	    }
	  }
	
	  /**
	   * Walk down recursively all the children tags starting dom node
	   * @param   { Object }   dom - starting node where we will start the recursion
	   * @param   { Function } fn - callback to transform the child node just found
	   * @param   { Object }   context - fn can optionally return an object, which is passed to children
	   */
	  function walkNodes(dom, fn, context) {
	    if (dom) {
	      var res = fn(dom, context);
	      var next;
	      // stop the recursion
	      if (res === false) {
	        return;
	      }
	
	      dom = dom.firstChild;
	
	      while (dom) {
	        next = dom.nextSibling;
	        walkNodes(dom, fn, res);
	        dom = next;
	      }
	    }
	  }
	
	  var dom = Object.freeze({
	    $$: $$,
	    $: $,
	    createFrag: createFrag,
	    createDOMPlaceholder: createDOMPlaceholder,
	    mkEl: mkEl,
	    getOuterHTML: getOuterHTML,
	    setInnerHTML: setInnerHTML,
	    remAttr: remAttr,
	    getAttr: getAttr,
	    setAttr: setAttr,
	    safeInsert: safeInsert,
	    walkAttrs: walkAttrs,
	    walkNodes: walkNodes
	  });
	
	  var styleNode;
	  var cssTextProp;
	  var byName = {};
	  var remainder = [];
	  var needsInject = false;
	
	  // skip the following code on the server
	  if (WIN) {
	    styleNode = function () {
	      // create a new style element with the correct type
	      var newNode = mkEl('style');
	      setAttr(newNode, 'type', 'text/css');
	
	      // replace any user node or insert the new one into the head
	      var userNode = $('style[type=riot]');
	      if (userNode) {
	        if (userNode.id) {
	          newNode.id = userNode.id;
	        }
	        userNode.parentNode.replaceChild(newNode, userNode);
	      } else {
	        document.getElementsByTagName('head')[0].appendChild(newNode);
	      }
	
	      return newNode;
	    }();
	    cssTextProp = styleNode.styleSheet;
	  }
	
	  /**
	   * Object that will be used to inject and manage the css of every tag instance
	   */
	  var styleManager = {
	    styleNode: styleNode,
	    /**
	     * Save a tag style to be later injected into DOM
	     * @param { String } css - css string
	     * @param { String } name - if it's passed we will map the css to a tagname
	     */
	    add: function add(css, name) {
	      if (name) {
	        byName[name] = css;
	      } else {
	        remainder.push(css);
	      }
	      needsInject = true;
	    },
	    /**
	     * Inject all previously saved tag styles into DOM
	     * innerHTML seems slow: http://jsperf.com/riot-insert-style
	     */
	    inject: function inject() {
	      if (!WIN || !needsInject) {
	        return;
	      }
	      needsInject = false;
	      var style = Object.keys(byName).map(function (k) {
	        return byName[k];
	      }).concat(remainder).join('\n');
	      if (cssTextProp) {
	        cssTextProp.cssText = style;
	      } else {
	        styleNode.innerHTML = style;
	      }
	    }
	  };
	
	  /**
	   * The riot template engine
	   * @version v3.0.2
	   */
	  /**
	   * riot.util.brackets
	   *
	   * - `brackets    ` - Returns a string or regex based on its parameter
	   * - `brackets.set` - Change the current riot brackets
	   *
	   * @module
	   */
	
	  /* global riot */
	
	  var brackets = function (UNDEF) {
	
	    var REGLOB = 'g',
	        R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,
	        R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g,
	        S_QBLOCKS = R_STRINGS.source + '|' + /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' + /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,
	        UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),
	        NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,
	        FINDBRACES = {
	      '(': RegExp('([()])|' + S_QBLOCKS, REGLOB),
	      '[': RegExp('([[\\]])|' + S_QBLOCKS, REGLOB),
	      '{': RegExp('([{}])|' + S_QBLOCKS, REGLOB)
	    },
	        DEFAULT = '{ }';
	
	    var _pairs = ['{', '}', '{', '}', /{[^}]*}/, /\\([{}])/g, /\\({)|{/g, RegExp('\\\\(})|([[({])|(})|' + S_QBLOCKS, REGLOB), DEFAULT, /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/, /(^|[^\\]){=[\S\s]*?}/];
	
	    var cachedBrackets = UNDEF,
	        _regex,
	        _cache = [],
	        _settings;
	
	    function _loopback(re) {
	      return re;
	    }
	
	    function _rewrite(re, bp) {
	      if (!bp) {
	        bp = _cache;
	      }
	      return new RegExp(re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : '');
	    }
	
	    function _create(pair) {
	      if (pair === DEFAULT) {
	        return _pairs;
	      }
	
	      var arr = pair.split(' ');
	
	      if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
	        throw new Error('Unsupported brackets "' + pair + '"');
	      }
	      arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '));
	
	      arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
	      arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
	      arr[6] = _rewrite(_pairs[6], arr);
	      arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCKS, REGLOB);
	      arr[8] = pair;
	      return arr;
	    }
	
	    function _brackets(reOrIdx) {
	      return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx];
	    }
	
	    _brackets.split = function split(str, tmpl, _bp) {
	      // istanbul ignore next: _bp is for the compiler
	      if (!_bp) {
	        _bp = _cache;
	      }
	
	      var parts = [],
	          match,
	          isexpr,
	          start,
	          pos,
	          re = _bp[6];
	
	      isexpr = start = re.lastIndex = 0;
	
	      while (match = re.exec(str)) {
	
	        pos = match.index;
	
	        if (isexpr) {
	
	          if (match[2]) {
	            re.lastIndex = skipBraces(str, match[2], re.lastIndex);
	            continue;
	          }
	          if (!match[3]) {
	            continue;
	          }
	        }
	
	        if (!match[1]) {
	          unescapeStr(str.slice(start, pos));
	          start = re.lastIndex;
	          re = _bp[6 + (isexpr ^= 1)];
	          re.lastIndex = start;
	        }
	      }
	
	      if (str && start < str.length) {
	        unescapeStr(str.slice(start));
	      }
	
	      return parts;
	
	      function unescapeStr(s) {
	        if (tmpl || isexpr) {
	          parts.push(s && s.replace(_bp[5], '$1'));
	        } else {
	          parts.push(s);
	        }
	      }
	
	      function skipBraces(s, ch, ix) {
	        var match,
	            recch = FINDBRACES[ch];
	
	        recch.lastIndex = ix;
	        ix = 1;
	        while (match = recch.exec(s)) {
	          if (match[1] && !(match[1] === ch ? ++ix : --ix)) {
	            break;
	          }
	        }
	        return ix ? s.length : recch.lastIndex;
	      }
	    };
	
	    _brackets.hasExpr = function hasExpr(str) {
	      return _cache[4].test(str);
	    };
	
	    _brackets.loopKeys = function loopKeys(expr) {
	      var m = expr.match(_cache[9]);
	
	      return m ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] } : { val: expr.trim() };
	    };
	
	    _brackets.array = function array(pair) {
	      return pair ? _create(pair) : _cache;
	    };
	
	    function _reset(pair) {
	      if ((pair || (pair = DEFAULT)) !== _cache[8]) {
	        _cache = _create(pair);
	        _regex = pair === DEFAULT ? _loopback : _rewrite;
	        _cache[9] = _regex(_pairs[9]);
	      }
	      cachedBrackets = pair;
	    }
	
	    function _setSettings(o) {
	      var b;
	
	      o = o || {};
	      b = o.brackets;
	      Object.defineProperty(o, 'brackets', {
	        set: _reset,
	        get: function get() {
	          return cachedBrackets;
	        },
	        enumerable: true
	      });
	      _settings = o;
	      _reset(b);
	    }
	
	    Object.defineProperty(_brackets, 'settings', {
	      set: _setSettings,
	      get: function get() {
	        return _settings;
	      }
	    });
	
	    /* istanbul ignore next: in the browser riot is always in the scope */
	    _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
	    _brackets.set = _reset;
	
	    _brackets.R_STRINGS = R_STRINGS;
	    _brackets.R_MLCOMMS = R_MLCOMMS;
	    _brackets.S_QBLOCKS = S_QBLOCKS;
	
	    return _brackets;
	  }();
	
	  /**
	   * @module tmpl
	   *
	   * tmpl          - Root function, returns the template value, render with data
	   * tmpl.hasExpr  - Test the existence of a expression inside a string
	   * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
	   */
	
	  var tmpl = function () {
	
	    var _cache = {};
	
	    function _tmpl(str, data) {
	      if (!str) {
	        return str;
	      }
	
	      return (_cache[str] || (_cache[str] = _create(str))).call(data, _logErr);
	    }
	
	    _tmpl.hasExpr = brackets.hasExpr;
	
	    _tmpl.loopKeys = brackets.loopKeys;
	
	    // istanbul ignore next
	    _tmpl.clearCache = function () {
	      _cache = {};
	    };
	
	    _tmpl.errorHandler = null;
	
	    function _logErr(err, ctx) {
	
	      err.riotData = {
	        tagName: ctx && ctx.__ && ctx.__.tagName,
	        _riot_id: ctx && ctx._riot_id //eslint-disable-line camelcase
	      };
	
	      if (_tmpl.errorHandler) {
	        _tmpl.errorHandler(err);
	      } else if (typeof console !== 'undefined' && typeof console.error === 'function') {
	        if (err.riotData.tagName) {
	          console.error('Riot template error thrown in the <%s> tag', err.riotData.tagName);
	        }
	        console.error(err);
	      }
	    }
	
	    function _create(str) {
	      var expr = _getTmpl(str);
	
	      if (expr.slice(0, 11) !== 'try{return ') {
	        expr = 'return ' + expr;
	      }
	
	      return new Function('E', expr + ';'); // eslint-disable-line no-new-func
	    }
	
	    var CH_IDEXPR = String.fromCharCode(0x2057),
	        RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,
	        RE_QBLOCK = RegExp(brackets.S_QBLOCKS, 'g'),
	        RE_DQUOTE = /\u2057/g,
	        RE_QBMARK = /\u2057(\d+)~/g;
	
	    function _getTmpl(str) {
	      var qstr = [],
	          expr,
	          parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);
	
	      if (parts.length > 2 || parts[0]) {
	        var i,
	            j,
	            list = [];
	
	        for (i = j = 0; i < parts.length; ++i) {
	
	          expr = parts[i];
	
	          if (expr && (expr = i & 1 ? _parseExpr(expr, 1, qstr) : '"' + expr.replace(/\\/g, '\\\\').replace(/\r\n?|\n/g, '\\n').replace(/"/g, '\\"') + '"')) {
	            list[j++] = expr;
	          }
	        }
	
	        expr = j < 2 ? list[0] : '[' + list.join(',') + '].join("")';
	      } else {
	
	        expr = _parseExpr(parts[1], 0, qstr);
	      }
	
	      if (qstr[0]) {
	        expr = expr.replace(RE_QBMARK, function (_, pos) {
	          return qstr[pos].replace(/\r/g, '\\r').replace(/\n/g, '\\n');
	        });
	      }
	      return expr;
	    }
	
	    var RE_BREND = {
	      '(': /[()]/g,
	      '[': /[[\]]/g,
	      '{': /[{}]/g
	    };
	
	    function _parseExpr(expr, asText, qstr) {
	
	      expr = expr.replace(RE_QBLOCK, function (s, div) {
	        return s.length > 2 && !div ? CH_IDEXPR + (qstr.push(s) - 1) + '~' : s;
	      }).replace(/\s+/g, ' ').trim().replace(/\ ?([[\({},?\.:])\ ?/g, '$1');
	
	      if (expr) {
	        var list = [],
	            cnt = 0,
	            match;
	
	        while (expr && (match = expr.match(RE_CSNAME)) && !match.index) {
	          var key,
	              jsb,
	              re = /,|([[{(])|$/g;
	
	          expr = RegExp.rightContext;
	          key = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];
	
	          while (jsb = (match = re.exec(expr))[1]) {
	            skipBraces(jsb, re);
	          }
	
	          jsb = expr.slice(0, match.index);
	          expr = RegExp.rightContext;
	
	          list[cnt++] = _wrapExpr(jsb, 1, key);
	        }
	
	        expr = !cnt ? _wrapExpr(expr, asText) : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
	      }
	      return expr;
	
	      function skipBraces(ch, re) {
	        var mm,
	            lv = 1,
	            ir = RE_BREND[ch];
	
	        ir.lastIndex = re.lastIndex;
	        while (mm = ir.exec(expr)) {
	          if (mm[0] === ch) {
	            ++lv;
	          } else if (! --lv) {
	            break;
	          }
	        }
	        re.lastIndex = lv ? expr.length : ir.lastIndex;
	      }
	    }
	
	    // istanbul ignore next: not both
	    var // eslint-disable-next-line max-len
	    JS_CONTEXT = '"in this?this:' + ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' ? 'global' : 'window') + ').',
	        JS_VARNAME = /[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
	        JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;
	
	    function _wrapExpr(expr, asText, key) {
	      var tb;
	
	      expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
	        if (mvar) {
	          pos = tb ? 0 : pos + match.length;
	
	          if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
	            match = p + '("' + mvar + JS_CONTEXT + mvar;
	            if (pos) {
	              tb = (s = s[pos]) === '.' || s === '(' || s === '[';
	            }
	          } else if (pos) {
	            tb = !JS_NOPROPS.test(s.slice(pos));
	          }
	        }
	        return match;
	      });
	
	      if (tb) {
	        expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
	      }
	
	      if (key) {
	
	        expr = (tb ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')') + '?"' + key + '":""';
	      } else if (asText) {
	
	        expr = 'function(v){' + (tb ? expr.replace('return ', 'v=') : 'v=(' + expr + ')') + ';return v||v===0?v:""}.call(this)';
	      }
	
	      return expr;
	    }
	
	    _tmpl.version = brackets.version = 'v3.0.2';
	
	    return _tmpl;
	  }();
	
	  var observable$1 = function observable$1(el) {
	
	    /**
	     * Extend the original object or create a new empty one
	     * @type { Object }
	     */
	
	    el = el || {};
	
	    /**
	     * Private variables
	     */
	    var callbacks = {},
	        slice = Array.prototype.slice;
	
	    /**
	     * Public Api
	     */
	
	    // extend the el object adding the observable methods
	    Object.defineProperties(el, {
	      /**
	       * Listen to the given `event` ands
	       * execute the `callback` each time an event is triggered.
	       * @param  { String } event - event id
	       * @param  { Function } fn - callback function
	       * @returns { Object } el
	       */
	      on: {
	        value: function value(event, fn) {
	          if (typeof fn == 'function') {
	            (callbacks[event] = callbacks[event] || []).push(fn);
	          }
	          return el;
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      },
	
	      /**
	       * Removes the given `event` listeners
	       * @param   { String } event - event id
	       * @param   { Function } fn - callback function
	       * @returns { Object } el
	       */
	      off: {
	        value: function value(event, fn) {
	          if (event == '*' && !fn) {
	            callbacks = {};
	          } else {
	            if (fn) {
	              var arr = callbacks[event];
	              for (var i = 0, cb; cb = arr && arr[i]; ++i) {
	                if (cb == fn) {
	                  arr.splice(i--, 1);
	                }
	              }
	            } else {
	              delete callbacks[event];
	            }
	          }
	          return el;
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      },
	
	      /**
	       * Listen to the given `event` and
	       * execute the `callback` at most once
	       * @param   { String } event - event id
	       * @param   { Function } fn - callback function
	       * @returns { Object } el
	       */
	      one: {
	        value: function value(event, fn) {
	          function on() {
	            el.off(event, on);
	            fn.apply(el, arguments);
	          }
	          return el.on(event, on);
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      },
	
	      /**
	       * Execute all callback functions that listen to
	       * the given `event`
	       * @param   { String } event - event id
	       * @returns { Object } el
	       */
	      trigger: {
	        value: function value(event) {
	          var arguments$1 = arguments;
	
	          // getting the arguments
	          var arglen = arguments.length - 1,
	              args = new Array(arglen),
	              fns,
	              fn,
	              i;
	
	          for (i = 0; i < arglen; i++) {
	            args[i] = arguments$1[i + 1]; // skip first argument
	          }
	
	          fns = slice.call(callbacks[event] || [], 0);
	
	          for (i = 0; fn = fns[i]; ++i) {
	            fn.apply(el, args);
	          }
	
	          if (callbacks['*'] && event != '*') {
	            el.trigger.apply(el, ['*', event].concat(args));
	          }
	
	          return el;
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      }
	    });
	
	    return el;
	  };
	
	  /**
	   * Specialized function for looping an array-like collection with `each={}`
	   * @param   { Array } list - collection of items
	   * @param   {Function} fn - callback function
	   * @returns { Array } the array looped
	   */
	  function each(list, fn) {
	    var len = list ? list.length : 0;
	
	    for (var i = 0, el; i < len; ++i) {
	      el = list[i];
	      // return false -> current item was removed by fn during the loop
	      if (fn(el, i) === false) {
	        i--;
	      }
	    }
	    return list;
	  }
	
	  /**
	   * Check whether an array contains an item
	   * @param   { Array } array - target array
	   * @param   { * } item - item to test
	   * @returns { Boolean } -
	   */
	  function contains(array, item) {
	    return !!~array.indexOf(item);
	  }
	
	  /**
	   * Convert a string containing dashes to camel case
	   * @param   { String } str - input string
	   * @returns { String } my-string -> myString
	   */
	  function toCamel(str) {
	    return str.replace(/-(\w)/g, function (_, c) {
	      return c.toUpperCase();
	    });
	  }
	
	  /**
	   * Faster String startsWith alternative
	   * @param   { String } str - source string
	   * @param   { String } value - test string
	   * @returns { Boolean } -
	   */
	  function startsWith(str, value) {
	    return str.slice(0, value.length) === value;
	  }
	
	  /**
	   * Helper function to set an immutable property
	   * @param   { Object } el - object where the new property will be set
	   * @param   { String } key - object key where the new property will be stored
	   * @param   { * } value - value of the new property
	   * @param   { Object } options - set the propery overriding the default options
	   * @returns { Object } - the initial object
	   */
	  function defineProperty(el, key, value, options) {
	    Object.defineProperty(el, key, extend({
	      value: value,
	      enumerable: false,
	      writable: false,
	      configurable: true
	    }, options));
	    return el;
	  }
	
	  /**
	   * Extend any object with other properties
	   * @param   { Object } src - source object
	   * @returns { Object } the resulting extended object
	   *
	   * var obj = { foo: 'baz' }
	   * extend(obj, {bar: 'bar', foo: 'bar'})
	   * console.log(obj) => {bar: 'bar', foo: 'bar'}
	   *
	   */
	  function extend(src) {
	    var obj,
	        args = arguments;
	    for (var i = 1; i < args.length; ++i) {
	      if (obj = args[i]) {
	        for (var key in obj) {
	          // check if this property of the source object could be overridden
	          if (isWritable(src, key)) {
	            src[key] = obj[key];
	          }
	        }
	      }
	    }
	    return src;
	  }
	
	  var misc = Object.freeze({
	    each: each,
	    contains: contains,
	    toCamel: toCamel,
	    startsWith: startsWith,
	    defineProperty: defineProperty,
	    extend: extend
	  });
	
	  var EVENTS_PREFIX_REGEX = /^on/;
	
	  /**
	   * Trigger DOM events
	   * @param   { HTMLElement } dom - dom element target of the event
	   * @param   { Function } handler - user function
	   * @param   { Object } e - event object
	   */
	  function handleEvent(dom, handler, e) {
	    var ptag = this.__.parent,
	        item = this.__.item;
	
	    if (!item) {
	      while (ptag && !item) {
	        item = ptag.__.item;
	        ptag = ptag.__.parent;
	      }
	    }
	
	    // override the event properties
	    if (isWritable(e, 'currentTarget')) {
	      e.currentTarget = dom;
	    }
	    if (isWritable(e, 'target')) {
	      e.target = e.srcElement;
	    }
	    if (isWritable(e, 'which')) {
	      e.which = e.charCode || e.keyCode;
	    }
	
	    e.item = item;
	
	    handler.call(this, e);
	
	    if (!e.preventUpdate) {
	      var p = getImmediateCustomParentTag(this);
	      // fixes #2083
	      if (p.isMounted) {
	        p.update();
	      }
	    }
	  }
	
	  /**
	   * Attach an event to a DOM node
	   * @param { String } name - event name
	   * @param { Function } handler - event callback
	   * @param { Object } dom - dom node
	   * @param { Tag } tag - tag instance
	   */
	  function setEventHandler(name, handler, dom, tag) {
	    var eventName,
	        cb = handleEvent.bind(tag, dom, handler);
	
	    if (!dom.addEventListener) {
	      dom[name] = cb;
	      return;
	    }
	
	    // avoid to bind twice the same event
	    dom[name] = null;
	
	    // normalize event name
	    eventName = name.replace(EVENTS_PREFIX_REGEX, '');
	
	    // cache the callback directly on the DOM node
	    if (!dom._riotEvents) {
	      dom._riotEvents = {};
	    }
	
	    if (dom._riotEvents[name]) {
	      dom.removeEventListener(eventName, dom._riotEvents[name]);
	    }
	
	    dom._riotEvents[name] = cb;
	    dom.addEventListener(eventName, cb, false);
	  }
	
	  /**
	   * Update dynamically created data-is tags with changing expressions
	   * @param { Object } expr - expression tag and expression info
	   * @param { Tag } parent - parent for tag creation
	   */
	  function updateDataIs(expr, parent) {
	    var tagName = tmpl(expr.value, parent),
	        conf,
	        isVirtual,
	        head,
	        ref;
	
	    if (expr.tag && expr.tagName === tagName) {
	      expr.tag.update();
	      return;
	    }
	
	    isVirtual = expr.dom.tagName === 'VIRTUAL';
	    // sync _parent to accommodate changing tagnames
	    if (expr.tag) {
	
	      // need placeholder before unmount
	      if (isVirtual) {
	        head = expr.tag.__.head;
	        ref = createDOMPlaceholder();
	        head.parentNode.insertBefore(ref, head);
	      }
	
	      expr.tag.unmount(true);
	    }
	
	    expr.impl = __TAG_IMPL[tagName];
	    conf = { root: expr.dom, parent: parent, hasImpl: true, tagName: tagName };
	    expr.tag = initChildTag(expr.impl, conf, expr.dom.innerHTML, parent);
	    each(expr.attrs, function (a) {
	      return setAttr(expr.tag.root, a.name, a.value);
	    });
	    expr.tagName = tagName;
	    expr.tag.mount();
	    if (isVirtual) {
	      makeReplaceVirtual(expr.tag, ref || expr.tag.root);
	    } // root exist first time, after use placeholder
	
	    // parent is the placeholder tag, not the dynamic tag so clean up
	    parent.on('unmount', function () {
	      var delName = expr.tag.opts.dataIs,
	          tags = expr.tag.parent.tags,
	          _tags = expr.tag.__.parent.tags;
	      arrayishRemove(tags, delName, expr.tag);
	      arrayishRemove(_tags, delName, expr.tag);
	      expr.tag.unmount();
	    });
	  }
	
	  /**
	   * Update on single tag expression
	   * @this Tag
	   * @param { Object } expr - expression logic
	   * @returns { undefined }
	   */
	  function updateExpression(expr) {
	    var dom = expr.dom,
	        attrName = expr.attr,
	        isToggle = contains([SHOW_DIRECTIVE, HIDE_DIRECTIVE], attrName),
	        value = tmpl(expr.expr, this),
	        isValueAttr = attrName === 'riot-value',
	        isVirtual = expr.root && expr.root.tagName === 'VIRTUAL',
	        parent = dom && (expr.parent || dom.parentNode),
	        old;
	
	    if (expr.bool) {
	      value = value ? attrName : false;
	    } else if (isUndefined(value) || value === null) {
	      value = '';
	    }
	
	    if (expr._riot_id) {
	      // if it's a tag
	      if (expr.isMounted) {
	        expr.update();
	
	        // if it hasn't been mounted yet, do that now.
	      } else {
	        expr.mount();
	
	        if (isVirtual) {
	          makeReplaceVirtual(expr, expr.root);
	        }
	      }
	      return;
	    }
	
	    old = expr.value;
	    expr.value = value;
	
	    if (expr.update) {
	      expr.update();
	      return;
	    }
	
	    if (expr.isRtag && value) {
	      return updateDataIs(expr, this);
	    }
	    if (old === value) {
	      return;
	    }
	    // no change, so nothing more to do
	    if (isValueAttr && dom.value === value) {
	      return;
	    }
	
	    // textarea and text nodes have no attribute name
	    if (!attrName) {
	      // about #815 w/o replace: the browser converts the value to a string,
	      // the comparison by "==" does too, but not in the server
	      value += '';
	      // test for parent avoids error with invalid assignment to nodeValue
	      if (parent) {
	        // cache the parent node because somehow it will become null on IE
	        // on the next iteration
	        expr.parent = parent;
	        if (parent.tagName === 'TEXTAREA') {
	          parent.value = value; // #1113
	          if (!IE_VERSION) {
	            dom.nodeValue = value;
	          } // #1625 IE throws here, nodeValue
	        } // will be available on 'updated'
	        else {
	            dom.nodeValue = value;
	          }
	      }
	      return;
	    }
	
	    // remove original attribute
	    if (!expr.isAttrRemoved || !value) {
	      remAttr(dom, attrName);
	      expr.isAttrRemoved = true;
	    }
	
	    // event handler
	    if (isFunction(value)) {
	      setEventHandler(attrName, value, dom, this);
	      // show / hide
	    } else if (isToggle) {
	      if (attrName === HIDE_DIRECTIVE) {
	        value = !value;
	      }
	      dom.style.display = value ? '' : 'none';
	      // field value
	    } else if (isValueAttr) {
	      dom.value = value;
	      // <img src="{ expr }">
	    } else if (startsWith(attrName, ATTRS_PREFIX) && attrName !== IS_DIRECTIVE) {
	      attrName = attrName.slice(ATTRS_PREFIX.length);
	      if (CASE_SENSITIVE_ATTRIBUTES[attrName]) {
	        attrName = CASE_SENSITIVE_ATTRIBUTES[attrName];
	      }
	      if (value != null) {
	        setAttr(dom, attrName, value);
	      }
	    } else {
	      // <select> <option selected={true}> </select>
	      if (attrName === 'selected' && parent && /^(SELECT|OPTGROUP)$/.test(parent.tagName) && value) {
	        parent.value = dom.value;
	      }if (expr.bool) {
	        dom[attrName] = value;
	        if (!value) {
	          return;
	        }
	      }if (value === 0 || value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== T_OBJECT) {
	        setAttr(dom, attrName, value);
	      }
	    }
	  }
	
	  /**
	   * Update all the expressions in a Tag instance
	   * @this Tag
	   * @param { Array } expressions - expression that must be re evaluated
	   */
	  function updateAllExpressions(expressions) {
	    each(expressions, updateExpression.bind(this));
	  }
	
	  var IfExpr = {
	    init: function init(dom, tag, expr) {
	      remAttr(dom, CONDITIONAL_DIRECTIVE);
	      this.tag = tag;
	      this.expr = expr;
	      this.stub = document.createTextNode('');
	      this.pristine = dom;
	
	      var p = dom.parentNode;
	      p.insertBefore(this.stub, dom);
	      p.removeChild(dom);
	
	      return this;
	    },
	    update: function update() {
	      var newValue = tmpl(this.expr, this.tag);
	
	      if (newValue && !this.current) {
	        // insert
	        this.current = this.pristine.cloneNode(true);
	        this.stub.parentNode.insertBefore(this.current, this.stub);
	
	        this.expressions = [];
	        parseExpressions.apply(this.tag, [this.current, this.expressions, true]);
	      } else if (!newValue && this.current) {
	        // remove
	        unmountAll(this.expressions);
	        if (this.current._tag) {
	          this.current._tag.unmount();
	        } else if (this.current.parentNode) {
	          this.current.parentNode.removeChild(this.current);
	        }
	        this.current = null;
	        this.expressions = [];
	      }
	
	      if (newValue) {
	        updateAllExpressions.call(this.tag, this.expressions);
	      }
	    },
	    unmount: function unmount() {
	      unmountAll(this.expressions || []);
	      delete this.pristine;
	      delete this.parentNode;
	      delete this.stub;
	    }
	  };
	
	  var RefExpr = {
	    init: function init(dom, parent, attrName, attrValue) {
	      this.dom = dom;
	      this.attr = attrName;
	      this.rawValue = attrValue;
	      this.parent = parent;
	      this.hasExp = tmpl.hasExpr(attrValue);
	      this.firstRun = true;
	
	      return this;
	    },
	    update: function update() {
	      var value = this.rawValue;
	      if (this.hasExp) {
	        value = tmpl(this.rawValue, this.parent);
	      }
	
	      // if nothing changed, we're done
	      if (!this.firstRun && value === this.value) {
	        return;
	      }
	
	      var customParent = this.parent && getImmediateCustomParentTag(this.parent);
	
	      // if the referenced element is a custom tag, then we set the tag itself, rather than DOM
	      var tagOrDom = this.tag || this.dom;
	
	      // the name changed, so we need to remove it from the old key (if present)
	      if (!isBlank(this.value) && customParent) {
	        arrayishRemove(customParent.refs, this.value, tagOrDom);
	      }
	
	      if (isBlank(value)) {
	        // if the value is blank, we remove it
	        remAttr(this.dom, this.attr);
	      } else {
	        // add it to the refs of parent tag (this behavior was changed >=3.0)
	        if (customParent) {
	          arrayishAdd(customParent.refs, value, tagOrDom);
	        }
	        // set the actual DOM attr
	        setAttr(this.dom, this.attr, value);
	      }
	      this.value = value;
	      this.firstRun = false;
	    },
	    unmount: function unmount() {
	      var tagOrDom = this.tag || this.dom;
	      var customParent = this.parent && getImmediateCustomParentTag(this.parent);
	      if (!isBlank(this.value) && customParent) {
	        arrayishRemove(customParent.refs, this.value, tagOrDom);
	      }
	      delete this.dom;
	      delete this.parent;
	    }
	  };
	
	  /**
	   * Convert the item looped into an object used to extend the child tag properties
	   * @param   { Object } expr - object containing the keys used to extend the children tags
	   * @param   { * } key - value to assign to the new object returned
	   * @param   { * } val - value containing the position of the item in the array
	   * @param   { Object } base - prototype object for the new item
	   * @returns { Object } - new object containing the values of the original item
	   *
	   * The variables 'key' and 'val' are arbitrary.
	   * They depend on the collection type looped (Array, Object)
	   * and on the expression used on the each tag
	   *
	   */
	  function mkitem(expr, key, val, base) {
	    var item = base ? Object.create(base) : {};
	    item[expr.key] = key;
	    if (expr.pos) {
	      item[expr.pos] = val;
	    }
	    return item;
	  }
	
	  /**
	   * Unmount the redundant tags
	   * @param   { Array } items - array containing the current items to loop
	   * @param   { Array } tags - array containing all the children tags
	   */
	  function unmountRedundant(items, tags) {
	    var i = tags.length,
	        j = items.length;
	
	    while (i > j) {
	      i--;
	      remove.apply(tags[i], [tags, i]);
	    }
	  }
	
	  /**
	   * Remove a child tag
	   * @this Tag
	   * @param   { Array } tags - tags collection
	   * @param   { Number } i - index of the tag to remove
	   */
	  function remove(tags, i) {
	    tags.splice(i, 1);
	    this.unmount();
	    arrayishRemove(this.parent, this, this.__.tagName, true);
	  }
	
	  /**
	   * Move the nested custom tags in non custom loop tags
	   * @this Tag
	   * @param   { Number } i - current position of the loop tag
	   */
	  function moveNestedTags(i) {
	    var this$1 = this;
	
	    each(Object.keys(this.tags), function (tagName) {
	      var tag = this$1.tags[tagName];
	      if (isArray(tag)) {
	        each(tag, function (t) {
	          moveChildTag.apply(t, [tagName, i]);
	        });
	      } else {
	        moveChildTag.apply(tag, [tagName, i]);
	      }
	    });
	  }
	
	  /**
	   * Move a child tag
	   * @this Tag
	   * @param   { HTMLElement } root - dom node containing all the loop children
	   * @param   { Tag } nextTag - instance of the next tag preceding the one we want to move
	   * @param   { Boolean } isVirtual - is it a virtual tag?
	   */
	  function move(root, nextTag, isVirtual) {
	    if (isVirtual) {
	      moveVirtual.apply(this, [root, nextTag]);
	    } else {
	      safeInsert(root, this.root, nextTag.root);
	    }
	  }
	
	  /**
	   * Insert and mount a child tag
	   * @this Tag
	   * @param   { HTMLElement } root - dom node containing all the loop children
	   * @param   { Tag } nextTag - instance of the next tag preceding the one we want to insert
	   * @param   { Boolean } isVirtual - is it a virtual tag?
	   */
	  function insert(root, nextTag, isVirtual) {
	    if (isVirtual) {
	      makeVirtual.apply(this, [root, nextTag]);
	    } else {
	      safeInsert(root, this.root, nextTag.root);
	    }
	  }
	
	  /**
	   * Append a new tag into the DOM
	   * @this Tag
	   * @param   { HTMLElement } root - dom node containing all the loop children
	   * @param   { Boolean } isVirtual - is it a virtual tag?
	   */
	  function append(root, isVirtual) {
	    if (isVirtual) {
	      makeVirtual.call(this, root);
	    } else {
	      root.appendChild(this.root);
	    }
	  }
	
	  /**
	   * Manage tags having the 'each'
	   * @param   { HTMLElement } dom - DOM node we need to loop
	   * @param   { Tag } parent - parent tag instance where the dom node is contained
	   * @param   { String } expr - string contained in the 'each' attribute
	   * @returns { Object } expression object for this each loop
	   */
	  function _each(dom, parent, expr) {
	
	    // remove the each property from the original tag
	    remAttr(dom, LOOP_DIRECTIVE);
	
	    var mustReorder = _typeof(getAttr(dom, LOOP_NO_REORDER_DIRECTIVE)) !== T_STRING || remAttr(dom, LOOP_NO_REORDER_DIRECTIVE),
	        tagName = getTagName(dom),
	        impl = __TAG_IMPL[tagName] || { tmpl: getOuterHTML(dom) },
	        parentNode = dom.parentNode,
	        placeholder = createDOMPlaceholder(),
	        child = getTag(dom),
	        refExpr = getRefAttr(dom),
	        ifExpr = getAttr(dom, CONDITIONAL_DIRECTIVE),
	        tags = [],
	        oldItems = [],
	        hasKeys,
	        isLoop = true,
	        hasRefExpr = false,
	        isAnonymous = !__TAG_IMPL[tagName],
	        isVirtual = dom.tagName === 'VIRTUAL';
	
	    // parse the each expression
	    expr = tmpl.loopKeys(expr);
	    expr.isLoop = true;
	
	    if (ifExpr) {
	      remAttr(dom, CONDITIONAL_DIRECTIVE);
	    }
	
	    // check if the loop tag has a ref attribute
	    if (refExpr) {
	      // detect if the ref attribute is an expression
	      hasRefExpr = tmpl.hasExpr(refExpr);
	      remRefAttr(dom);
	    }
	
	    // insert a marked where the loop tags will be injected
	    parentNode.insertBefore(placeholder, dom);
	    parentNode.removeChild(dom);
	
	    expr.update = function updateEach() {
	      // get the new items collection
	      var items = tmpl(expr.val, parent),
	          frag = createFrag(),
	          refAttr = refExpr,
	          isObject$$1 = !isArray(items) && !isString(items),
	          root = placeholder.parentNode;
	
	      // object loop. any changes cause full redraw
	      if (isObject$$1) {
	        hasKeys = items || false;
	        items = hasKeys ? Object.keys(items).map(function (key) {
	          return mkitem(expr, items[key], key);
	        }) : [];
	      } else {
	        hasKeys = false;
	      }
	
	      if (ifExpr) {
	        items = items.filter(function (item, i) {
	          if (expr.key && !isObject$$1) {
	            return !!tmpl(ifExpr, mkitem(expr, item, i, parent));
	          }
	
	          return !!tmpl(ifExpr, extend(Object.create(parent), item));
	        });
	      }
	
	      if (refAttr && hasRefExpr) {
	        refAttr = tmpl(refExpr, parent);
	      }
	
	      // reset the parent ref
	      if (refAttr) {
	        parent.refs[refAttr] = [];
	      }
	
	      // loop all the new items
	      each(items, function (item, i) {
	        // reorder only if the items are objects
	        var doReorder = mustReorder && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === T_OBJECT && !hasKeys,
	            oldPos = oldItems.indexOf(item),
	            isNew = !~oldPos,
	            pos = !isNew && doReorder ? oldPos : i,
	
	        // does a tag exist in this position?
	        tag = tags[pos],
	            mustAppend = i >= oldItems.length,
	            mustCreate = doReorder && isNew || !doReorder && !tag;
	
	        item = !hasKeys && expr.key ? mkitem(expr, item, i) : item;
	
	        // new tag
	        if (mustCreate) {
	          tag = new Tag$1(impl, {
	            parent: parent,
	            isLoop: isLoop,
	            isAnonymous: isAnonymous,
	            root: dom.cloneNode(),
	            item: item
	          }, dom.innerHTML);
	
	          // mount the tag
	          tag.mount();
	
	          if (mustAppend) {
	            append.apply(tag, [frag || root, isVirtual]);
	          } else {
	            insert.apply(tag, [root, tags[i], isVirtual]);
	          }
	
	          if (!mustAppend) {
	            oldItems.splice(i, 0, item);
	          }
	          tags.splice(i, 0, tag);
	          if (child) {
	            arrayishAdd(parent.tags, tagName, tag, true);
	          }
	        } else if (pos !== i && doReorder) {
	          // move
	          if (contains(items, oldItems[i])) {
	            move.apply(tag, [root, tags[i], isVirtual]);
	            // move the old tag instance
	            tags.splice(i, 0, tags.splice(pos, 1)[0]);
	            // move the old item
	            oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
	          } else {
	            // remove
	            remove.apply(tags[i], [tags, i]);
	            oldItems.splice(i, 1);
	          }
	
	          // update the position attribute if it exists
	          if (expr.pos) {
	            tag[expr.pos] = i;
	          }
	
	          // if the loop tags are not custom
	          // we need to move all their custom tags into the right position
	          if (!child && tag.tags) {
	            moveNestedTags.call(tag, i);
	          }
	
	          // update the parent ref
	          if (refAttr) {
	            parent.refs[refAttr].push(isAnonymous ? tag.root : tag);
	          }
	        }
	
	        if (!mustCreate) {
	          tag.update(item);
	        }
	
	        // cache the original item to use it in the events bound to this node
	        // and its children
	        tag.__.item = item;
	        tag.__.parent = parent;
	      });
	
	      // remove the redundant tags
	      unmountRedundant(items, tags);
	
	      // clone the items array
	      oldItems = items.slice();
	
	      root.insertBefore(frag, placeholder);
	    };
	
	    expr.unmount = function () {
	      each(tags, function (t) {
	        t.unmount();
	      });
	    };
	
	    return expr;
	  }
	
	  /**
	   * Walk the tag DOM to detect the expressions to evaluate
	   * @this Tag
	   * @param   { HTMLElement } root - root tag where we will start digging the expressions
	   * @param   { Array } expressions - empty array where the expressions will be added
	   * @param   { Boolean } mustIncludeRoot - flag to decide whether the root must be parsed as well
	   * @returns { Object } an object containing the root noode and the dom tree
	   */
	  function parseExpressions(root, expressions, mustIncludeRoot) {
	    var this$1 = this;
	
	    var tree = { parent: { children: expressions } };
	
	    walkNodes(root, function (dom, ctx) {
	      var type = dom.nodeType,
	          parent = ctx.parent,
	          attr,
	          expr,
	          tagImpl;
	      if (!mustIncludeRoot && dom === root) {
	        return { parent: parent };
	      }
	
	      // text node
	      if (type === 3 && dom.parentNode.tagName !== 'STYLE' && tmpl.hasExpr(dom.nodeValue)) {
	        parent.children.push({ dom: dom, expr: dom.nodeValue });
	      }
	
	      if (type !== 1) {
	        return ctx;
	      } // not an element
	
	      var isVirtual = dom.tagName === 'VIRTUAL';
	
	      // loop. each does it's own thing (for now)
	      if (attr = getAttr(dom, LOOP_DIRECTIVE)) {
	        if (isVirtual) {
	          setAttr(dom, 'loopVirtual', true);
	        } // ignore here, handled in _each
	        parent.children.push(_each(dom, this$1, attr));
	        return false;
	      }
	
	      // if-attrs become the new parent. Any following expressions (either on the current
	      // element, or below it) become children of this expression.
	      if (attr = getAttr(dom, CONDITIONAL_DIRECTIVE)) {
	        parent.children.push(Object.create(IfExpr).init(dom, this$1, attr));
	        return false;
	      }
	
	      if (expr = getAttr(dom, IS_DIRECTIVE)) {
	        if (tmpl.hasExpr(expr)) {
	          parent.children.push({ isRtag: true, expr: expr, dom: dom, attrs: [].slice.call(dom.attributes) });
	          return false;
	        }
	      }
	
	      // if this is a tag, stop traversing here.
	      // we ignore the root, since parseExpressions is called while we're mounting that root
	      tagImpl = getTag(dom);
	      if (isVirtual) {
	        if (getAttr(dom, 'virtualized')) {
	          dom.parentElement.removeChild(dom);
	        } // tag created, remove from dom
	        if (!tagImpl && !getAttr(dom, 'virtualized') && !getAttr(dom, 'loopVirtual')) // ok to create virtual tag
	          {
	            tagImpl = { tmpl: dom.outerHTML };
	          }
	      }
	
	      if (tagImpl && (dom !== root || mustIncludeRoot)) {
	        if (isVirtual && !getAttr(dom, IS_DIRECTIVE)) {
	          // handled in update
	          // can not remove attribute like directives
	          // so flag for removal after creation to prevent maximum stack error
	          setAttr(dom, 'virtualized', true);
	
	          var tag = new Tag$1({ tmpl: dom.outerHTML }, { root: dom, parent: this$1 }, dom.innerHTML);
	          parent.children.push(tag); // no return, anonymous tag, keep parsing
	        } else {
	          var conf = { root: dom, parent: this$1, hasImpl: true };
	          parent.children.push(initChildTag(tagImpl, conf, dom.innerHTML, this$1));
	          return false;
	        }
	      }
	
	      // attribute expressions
	      parseAttributes.apply(this$1, [dom, dom.attributes, function (attr, expr) {
	        if (!expr) {
	          return;
	        }
	        parent.children.push(expr);
	      }]);
	
	      // whatever the parent is, all child elements get the same parent.
	      // If this element had an if-attr, that's the parent for all child elements
	      return { parent: parent };
	    }, tree);
	
	    return { tree: tree, root: root };
	  }
	
	  /**
	   * Calls `fn` for every attribute on an element. If that attr has an expression,
	   * it is also passed to fn.
	   * @this Tag
	   * @param   { HTMLElement } dom - dom node to parse
	   * @param   { Array } attrs - array of attributes
	   * @param   { Function } fn - callback to exec on any iteration
	   */
	  function parseAttributes(dom, attrs, fn) {
	    var this$1 = this;
	
	    each(attrs, function (attr) {
	      var name = attr.name,
	          bool = isBoolAttr(name),
	          expr;
	
	      if (contains(REF_DIRECTIVES, name)) {
	        expr = Object.create(RefExpr).init(dom, this$1, name, attr.value);
	      } else if (tmpl.hasExpr(attr.value)) {
	        expr = { dom: dom, expr: attr.value, attr: attr.name, bool: bool };
	      }
	
	      fn(attr, expr);
	    });
	  }
	
	  /*
	    Includes hacks needed for the Internet Explorer version 9 and below
	    See: http://kangax.github.io/compat-table/es5/#ie8
	         http://codeplanet.io/dropping-ie8/
	  */
	
	  var reHasYield = /<yield\b/i;
	  var reYieldAll = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig;
	  var reYieldSrc = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig;
	  var reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig;
	  var rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' };
	  var tblTags = IE_VERSION && IE_VERSION < 10 ? RE_SPECIAL_TAGS : RE_SPECIAL_TAGS_NO_OPTION;
	  var GENERIC = 'div';
	
	  /*
	    Creates the root element for table or select child elements:
	    tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
	  */
	  function specialTags(el, tmpl, tagName) {
	
	    var select = tagName[0] === 'o',
	        parent = select ? 'select>' : 'table>';
	
	    // trim() is important here, this ensures we don't have artifacts,
	    // so we can check if we have only one element inside the parent
	    el.innerHTML = '<' + parent + tmpl.trim() + '</' + parent;
	    parent = el.firstChild;
	
	    // returns the immediate parent if tr/th/td/col is the only element, if not
	    // returns the whole tree, as this can include additional elements
	    if (select) {
	      parent.selectedIndex = -1; // for IE9, compatible w/current riot behavior
	    } else {
	      // avoids insertion of cointainer inside container (ex: tbody inside tbody)
	      var tname = rootEls[tagName];
	      if (tname && parent.childElementCount === 1) {
	        parent = $(tname, parent);
	      }
	    }
	    return parent;
	  }
	
	  /*
	    Replace the yield tag from any tag template with the innerHTML of the
	    original tag in the page
	  */
	  function replaceYield(tmpl, html) {
	    // do nothing if no yield
	    if (!reHasYield.test(tmpl)) {
	      return tmpl;
	    }
	
	    // be careful with #1343 - string on the source having `$1`
	    var src = {};
	
	    html = html && html.replace(reYieldSrc, function (_, ref, text) {
	      src[ref] = src[ref] || text; // preserve first definition
	      return '';
	    }).trim();
	
	    return tmpl.replace(reYieldDest, function (_, ref, def) {
	      // yield with from - to attrs
	      return src[ref] || def || '';
	    }).replace(reYieldAll, function (_, def) {
	      // yield without any "from"
	      return html || def || '';
	    });
	  }
	
	  /**
	   * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
	   * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
	   *
	   * @param   { String } tmpl  - The template coming from the custom tag definition
	   * @param   { String } html - HTML content that comes from the DOM element where you
	   *           will mount the tag, mostly the original tag in the page
	   * @param   { Boolean } checkSvg - flag needed to know if we need to force the svg rendering in case of loop nodes
	   * @returns { HTMLElement } DOM element with _tmpl_ merged through `YIELD` with the _html_.
	   */
	  function mkdom(tmpl, html, checkSvg) {
	    var match = tmpl && tmpl.match(/^\s*<([-\w]+)/),
	        tagName = match && match[1].toLowerCase(),
	        el = mkEl(GENERIC, checkSvg && isSVGTag(tagName));
	
	    // replace all the yield tags with the tag inner html
	    tmpl = replaceYield(tmpl, html);
	
	    /* istanbul ignore next */
	    if (tblTags.test(tagName)) {
	      el = specialTags(el, tmpl, tagName);
	    } else {
	      setInnerHTML(el, tmpl);
	    }
	
	    el.stub = true;
	
	    return el;
	  }
	
	  /**
	   * Another way to create a riot tag a bit more es6 friendly
	   * @param { HTMLElement } el - tag DOM selector or DOM node/s
	   * @param { Object } opts - tag logic
	   * @returns { Tag } new riot tag instance
	   */
	  function Tag$2(el, opts) {
	    // get the tag properties from the class constructor
	    var ref = this;
	    var name = ref.name;
	    var tmpl = ref.tmpl;
	    var css = ref.css;
	    var attrs = ref.attrs;
	    var onCreate = ref.onCreate;
	    // register a new tag and cache the class prototype
	    if (!__TAG_IMPL[name]) {
	      tag$1(name, tmpl, css, attrs, onCreate);
	      // cache the class constructor
	      __TAG_IMPL[name].class = this.constructor;
	    }
	
	    // mount the tag using the class instance
	    mountTo(el, name, opts, this);
	    // inject the component css
	    if (css) {
	      styleManager.inject();
	    }
	
	    return this;
	  }
	
	  /**
	   * Create a new riot tag implementation
	   * @param   { String }   name - name/id of the new riot tag
	   * @param   { String }   tmpl - tag template
	   * @param   { String }   css - custom tag css
	   * @param   { String }   attrs - root tag attributes
	   * @param   { Function } fn - user function
	   * @returns { String } name/id of the tag just created
	   */
	  function tag$1(name, tmpl, css, attrs, fn) {
	    if (isFunction(attrs)) {
	      fn = attrs;
	
	      if (/^[\w\-]+\s?=/.test(css)) {
	        attrs = css;
	        css = '';
	      } else {
	        attrs = '';
	      }
	    }
	
	    if (css) {
	      if (isFunction(css)) {
	        fn = css;
	      } else {
	        styleManager.add(css);
	      }
	    }
	
	    name = name.toLowerCase();
	    __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };
	
	    return name;
	  }
	
	  /**
	   * Create a new riot tag implementation (for use by the compiler)
	   * @param   { String }   name - name/id of the new riot tag
	   * @param   { String }   tmpl - tag template
	   * @param   { String }   css - custom tag css
	   * @param   { String }   attrs - root tag attributes
	   * @param   { Function } fn - user function
	   * @returns { String } name/id of the tag just created
	   */
	  function tag2$1(name, tmpl, css, attrs, fn) {
	    if (css) {
	      styleManager.add(css, name);
	    }
	
	    var exists = !!__TAG_IMPL[name];
	    __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };
	
	    if (exists && util.hotReloader) {
	      util.hotReloader(name);
	    }
	
	    return name;
	  }
	
	  /**
	   * Mount a tag using a specific tag implementation
	   * @param   { * } selector - tag DOM selector or DOM node/s
	   * @param   { String } tagName - tag implementation name
	   * @param   { Object } opts - tag logic
	   * @returns { Array } new tags instances
	   */
	  function mount$1(selector, tagName, opts) {
	    var tags = [];
	
	    function pushTagsTo(root) {
	      if (root.tagName) {
	        var riotTag = getAttr(root, IS_DIRECTIVE);
	
	        // have tagName? force riot-tag to be the same
	        if (tagName && riotTag !== tagName) {
	          riotTag = tagName;
	          setAttr(root, IS_DIRECTIVE, tagName);
	        }
	
	        var tag$$1 = mountTo(root, riotTag || root.tagName.toLowerCase(), opts);
	
	        if (tag$$1) {
	          tags.push(tag$$1);
	        }
	      } else if (root.length) {
	        each(root, pushTagsTo);
	      } // assume nodeList
	    }
	
	    // inject styles into DOM
	    styleManager.inject();
	
	    if (isObject(tagName)) {
	      opts = tagName;
	      tagName = 0;
	    }
	
	    var elem;
	    var allTags;
	
	    // crawl the DOM to find the tag
	    if (isString(selector)) {
	      selector = selector === '*' ?
	      // select all registered tags
	      // & tags found with the riot-tag attribute set
	      allTags = selectTags() :
	      // or just the ones named like the selector
	      selector + selectTags(selector.split(/, */));
	
	      // make sure to pass always a selector
	      // to the querySelectorAll function
	      elem = selector ? $$(selector) : [];
	    } else
	      // probably you have passed already a tag or a NodeList
	      {
	        elem = selector;
	      }
	
	    // select all the registered and mount them inside their root elements
	    if (tagName === '*') {
	      // get all custom tags
	      tagName = allTags || selectTags();
	      // if the root els it's just a single tag
	      if (elem.tagName) {
	        elem = $$(tagName, elem);
	      } else {
	        // select all the children for all the different root elements
	        var nodeList = [];
	
	        each(elem, function (_el) {
	          return nodeList.push($$(tagName, _el));
	        });
	
	        elem = nodeList;
	      }
	      // get rid of the tagName
	      tagName = 0;
	    }
	
	    pushTagsTo(elem);
	
	    return tags;
	  }
	
	  // Create a mixin that could be globally shared across all the tags
	  var mixins = {};
	  var globals = mixins[GLOBAL_MIXIN] = {};
	  var _id = 0;
	
	  /**
	   * Create/Return a mixin by its name
	   * @param   { String }  name - mixin name (global mixin if object)
	   * @param   { Object }  mix - mixin logic
	   * @param   { Boolean } g - is global?
	   * @returns { Object }  the mixin logic
	   */
	  function mixin$1(name, mix, g) {
	    // Unnamed global
	    if (isObject(name)) {
	      mixin$1("__unnamed_" + _id++, name, true);
	      return;
	    }
	
	    var store = g ? globals : mixins;
	
	    // Getter
	    if (!mix) {
	      if (isUndefined(store[name])) {
	        throw new Error('Unregistered mixin: ' + name);
	      }
	
	      return store[name];
	    }
	
	    // Setter
	    store[name] = isFunction(mix) ? extend(mix.prototype, store[name] || {}) && mix : extend(store[name] || {}, mix);
	  }
	
	  /**
	   * Update all the tags instances created
	   * @returns { Array } all the tags instances
	   */
	  function update$1() {
	    return each(__TAGS_CACHE, function (tag$$1) {
	      return tag$$1.update();
	    });
	  }
	
	  function unregister$1(name) {
	    delete __TAG_IMPL[name];
	  }
	
	  var core = Object.freeze({
	    Tag: Tag$2,
	    tag: tag$1,
	    tag2: tag2$1,
	    mount: mount$1,
	    mixin: mixin$1,
	    update: update$1,
	    unregister: unregister$1
	  });
	
	  // counter to give a unique id to all the Tag instances
	  var __uid = 0;
	
	  /**
	   * We need to update opts for this tag. That requires updating the expressions
	   * in any attributes on the tag, and then copying the result onto opts.
	   * @this Tag
	   * @param   {Boolean} isLoop - is it a loop tag?
	   * @param   { Tag }  parent - parent tag node
	   * @param   { Boolean }  isAnonymous - is it a tag without any impl? (a tag not registered)
	   * @param   { Object }  opts - tag options
	   * @param   { Array }  instAttrs - tag attributes array
	   */
	  function updateOpts(isLoop, parent, isAnonymous, opts, instAttrs) {
	    // isAnonymous `each` tags treat `dom` and `root` differently. In this case
	    // (and only this case) we don't need to do updateOpts, because the regular parse
	    // will update those attrs. Plus, isAnonymous tags don't need opts anyway
	    if (isLoop && isAnonymous) {
	      return;
	    }
	
	    var ctx = !isAnonymous && isLoop ? this : parent || this;
	    each(instAttrs, function (attr) {
	      if (attr.expr) {
	        updateAllExpressions.call(ctx, [attr.expr]);
	      }
	      opts[toCamel(attr.name)] = attr.expr ? attr.expr.value : attr.value;
	    });
	  }
	
	  /**
	   * Tag class
	   * @constructor
	   * @param { Object } impl - it contains the tag template, and logic
	   * @param { Object } conf - tag options
	   * @param { String } innerHTML - html that eventually we need to inject in the tag
	   */
	  function Tag$1(impl, conf, innerHTML) {
	
	    var opts = extend({}, conf.opts),
	        parent = conf.parent,
	        isLoop = conf.isLoop,
	        isAnonymous = conf.isAnonymous,
	        item = cleanUpData(conf.item),
	        instAttrs = [],
	        // All attributes on the Tag when it's first parsed
	    implAttrs = [],
	        // expressions on this type of Tag
	    expressions = [],
	        root = conf.root,
	        tagName = conf.tagName || getTagName(root),
	        isVirtual = tagName === 'virtual',
	        propsInSyncWithParent = [],
	        dom;
	
	    // make this tag observable
	    observable$1(this);
	    // only call unmount if we have a valid __TAG_IMPL (has name property)
	    if (impl.name && root._tag) {
	      root._tag.unmount(true);
	    }
	
	    // not yet mounted
	    this.isMounted = false;
	    root.isLoop = isLoop;
	
	    defineProperty(this, '__', {
	      isAnonymous: isAnonymous,
	      instAttrs: instAttrs,
	      innerHTML: innerHTML,
	      tagName: tagName,
	      // these vars will be needed only for the virtual tags
	      virts: [],
	      tail: null,
	      head: null,
	      parent: null,
	      item: null
	    });
	
	    // create a unique id to this tag
	    // it could be handy to use it also to improve the virtual dom rendering speed
	    defineProperty(this, '_riot_id', ++__uid); // base 1 allows test !t._riot_id
	
	    extend(this, { root: root, opts: opts }, item);
	    // protect the "tags" and "refs" property from being overridden
	    defineProperty(this, 'parent', parent || null);
	    defineProperty(this, 'tags', {});
	    defineProperty(this, 'refs', {});
	
	    dom = mkdom(impl.tmpl, innerHTML, isLoop);
	
	    /**
	     * Update the tag expressions and options
	     * @param   { * }  data - data we want to use to extend the tag properties
	     * @returns { Tag } the current tag instance
	     */
	    defineProperty(this, 'update', function tagUpdate(data) {
	      if (isFunction(this.shouldUpdate) && !this.shouldUpdate(data)) {
	        return this;
	      }
	
	      // make sure the data passed will not override
	      // the component core methods
	      data = cleanUpData(data);
	
	      // inherit properties from the parent, but only for isAnonymous tags
	      if (isLoop && isAnonymous) {
	        inheritFrom.apply(this, [this.parent, propsInSyncWithParent]);
	      }
	      extend(this, data);
	      updateOpts.apply(this, [isLoop, parent, isAnonymous, opts, instAttrs]);
	      if (this.isMounted) {
	        this.trigger('update', data);
	      }
	      updateAllExpressions.call(this, expressions);
	      if (this.isMounted) {
	        this.trigger('updated');
	      }
	
	      return this;
	    }.bind(this));
	
	    /**
	     * Add a mixin to this tag
	     * @returns { Tag } the current tag instance
	     */
	    defineProperty(this, 'mixin', function tagMixin() {
	      var this$1 = this;
	
	      each(arguments, function (mix) {
	        var instance,
	            props = [],
	            obj;
	
	        mix = isString(mix) ? mixin$1(mix) : mix;
	
	        // check if the mixin is a function
	        if (isFunction(mix)) {
	          // create the new mixin instance
	          instance = new mix();
	        } else {
	          instance = mix;
	        }
	
	        var proto = Object.getPrototypeOf(instance);
	
	        // build multilevel prototype inheritance chain property list
	        do {
	          props = props.concat(Object.getOwnPropertyNames(obj || instance));
	        } while (obj = Object.getPrototypeOf(obj || instance));
	
	        // loop the keys in the function prototype or the all object keys
	        each(props, function (key) {
	          // bind methods to this
	          // allow mixins to override other properties/parent mixins
	          if (key !== 'init') {
	            // check for getters/setters
	            var descriptor = Object.getOwnPropertyDescriptor(instance, key) || Object.getOwnPropertyDescriptor(proto, key);
	            var hasGetterSetter = descriptor && (descriptor.get || descriptor.set);
	
	            // apply method only if it does not already exist on the instance
	            if (!this$1.hasOwnProperty(key) && hasGetterSetter) {
	              Object.defineProperty(this$1, key, descriptor);
	            } else {
	              this$1[key] = isFunction(instance[key]) ? instance[key].bind(this$1) : instance[key];
	            }
	          }
	        });
	
	        // init method will be called automatically
	        if (instance.init) {
	          instance.init.bind(this$1)();
	        }
	      });
	      return this;
	    }.bind(this));
	
	    /**
	     * Mount the current tag instance
	     * @returns { Tag } the current tag instance
	     */
	    defineProperty(this, 'mount', function tagMount() {
	      var this$1 = this;
	
	      var _parent = this.__.parent;
	
	      root._tag = this; // keep a reference to the tag just created
	
	      // Read all the attrs on this instance. This give us the info we need for updateOpts
	      parseAttributes.apply(parent, [root, root.attributes, function (attr, expr) {
	        if (!isAnonymous && RefExpr.isPrototypeOf(expr)) {
	          expr.tag = this$1;
	        }
	        attr.expr = expr;
	        instAttrs.push(attr);
	      }]);
	
	      // update the root adding custom attributes coming from the compiler
	      implAttrs = [];
	      walkAttrs(impl.attrs, function (k, v) {
	        implAttrs.push({ name: k, value: v });
	      });
	      parseAttributes.apply(this, [root, implAttrs, function (attr, expr) {
	        if (expr) {
	          expressions.push(expr);
	        } else {
	          setAttr(root, attr.name, attr.value);
	        }
	      }]);
	
	      // children in loop should inherit from true parent
	      if (_parent && isAnonymous) {
	        inheritFrom.apply(this, [_parent, propsInSyncWithParent]);
	      }
	
	      // initialiation
	      updateOpts.apply(this, [isLoop, parent, isAnonymous, opts, instAttrs]);
	
	      // add global mixins
	      var globalMixin = mixin$1(GLOBAL_MIXIN);
	
	      if (globalMixin) {
	        for (var i in globalMixin) {
	          if (globalMixin.hasOwnProperty(i)) {
	            this$1.mixin(globalMixin[i]);
	          }
	        }
	      }
	
	      if (impl.fn) {
	        impl.fn.call(this, opts);
	      }
	
	      this.trigger('before-mount');
	
	      // parse layout after init. fn may calculate args for nested custom tags
	      parseExpressions.apply(this, [dom, expressions, false]);
	
	      this.update(item);
	
	      if (isLoop && isAnonymous) {
	        // update the root attribute for the looped elements
	        this.root = root = dom.firstChild;
	      } else {
	        while (dom.firstChild) {
	          root.appendChild(dom.firstChild);
	        }
	        if (root.stub) {
	          root = parent.root;
	        }
	      }
	
	      defineProperty(this, 'root', root);
	      defineProperty(this, 'isMounted', true);
	
	      // if it's not a child tag we can trigger its mount event
	      if (!this.parent || this.parent.isMounted) {
	        this.trigger('mount');
	      }
	      // otherwise we need to wait that the parent event gets triggered
	      else {
	          this.parent.one('mount', function () {
	            this$1.trigger('mount');
	          });
	        }
	
	      return this;
	    }.bind(this));
	
	    /**
	     * Unmount the tag instance
	     * @param { Boolean } mustKeepRoot - if it's true the root node will not be removed
	     * @returns { Tag } the current tag instance
	     */
	    defineProperty(this, 'unmount', function tagUnmount(mustKeepRoot) {
	      var this$1 = this;
	
	      var el = this.root,
	          p = el.parentNode,
	          ptag,
	          tagIndex = __TAGS_CACHE.indexOf(this);
	
	      this.trigger('before-unmount');
	
	      // clear all attributes coming from the mounted tag
	      walkAttrs(impl.attrs, function (name) {
	        if (startsWith(name, ATTRS_PREFIX)) {
	          name = name.slice(ATTRS_PREFIX.length);
	        }
	        remAttr(root, name);
	      });
	
	      // remove this tag instance from the global virtualDom variable
	      if (~tagIndex) {
	        __TAGS_CACHE.splice(tagIndex, 1);
	      }
	
	      if (p) {
	        if (parent) {
	          ptag = getImmediateCustomParentTag(parent);
	
	          if (isVirtual) {
	            Object.keys(this.tags).forEach(function (tagName) {
	              arrayishRemove(ptag.tags, tagName, this$1.tags[tagName]);
	            });
	          } else {
	            arrayishRemove(ptag.tags, tagName, this);
	            if (parent !== ptag) // remove from _parent too
	              {
	                arrayishRemove(parent.tags, tagName, this);
	              }
	          }
	        } else {
	          while (el.firstChild) {
	            el.removeChild(el.firstChild);
	          }
	        }
	
	        if (!mustKeepRoot) {
	          p.removeChild(el);
	        } else {
	          // the riot-tag and the data-is attributes aren't needed anymore, remove them
	          remAttr(p, IS_DIRECTIVE);
	        }
	      }
	
	      if (this.__.virts) {
	        each(this.__.virts, function (v) {
	          if (v.parentNode) {
	            v.parentNode.removeChild(v);
	          }
	        });
	      }
	
	      // allow expressions to unmount themselves
	      unmountAll(expressions);
	      each(instAttrs, function (a) {
	        return a.expr && a.expr.unmount && a.expr.unmount();
	      });
	
	      this.trigger('unmount');
	      this.off('*');
	      defineProperty(this, 'isMounted', false);
	
	      delete this.root._tag;
	
	      return this;
	    }.bind(this));
	  }
	
	  /**
	   * Detect the tag implementation by a DOM node
	   * @param   { Object } dom - DOM node we need to parse to get its tag implementation
	   * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
	   */
	  function getTag(dom) {
	    return dom.tagName && __TAG_IMPL[getAttr(dom, IS_DIRECTIVE) || getAttr(dom, IS_DIRECTIVE) || dom.tagName.toLowerCase()];
	  }
	
	  /**
	   * Inherit properties from a target tag instance
	   * @this Tag
	   * @param   { Tag } target - tag where we will inherit properties
	   * @param   { Array } propsInSyncWithParent - array of properties to sync with the target
	   */
	  function inheritFrom(target, propsInSyncWithParent) {
	    var this$1 = this;
	
	    each(Object.keys(target), function (k) {
	      // some properties must be always in sync with the parent tag
	      var mustSync = !isReservedName(k) && contains(propsInSyncWithParent, k);
	
	      if (isUndefined(this$1[k]) || mustSync) {
	        // track the property to keep in sync
	        // so we can keep it updated
	        if (!mustSync) {
	          propsInSyncWithParent.push(k);
	        }
	        this$1[k] = target[k];
	      }
	    });
	  }
	
	  /**
	   * Returns the ref or data-ref value of any dom node
	   * @param   { Object } dom - DOM node we want to parse
	   * @returns { String|Null } the attribute value if found
	   */
	  function getRefAttr(dom) {
	    return getAttr(dom, REF_DIRECTIVES[0]) || getAttr(dom, REF_DIRECTIVES[1]);
	  }
	
	  /**
	   * Remove all the ref directives from a dom node
	   * @param   { Object } dom - DOM node we want to update
	   */
	  function remRefAttr(dom) {
	    REF_DIRECTIVES.forEach(function (dir) {
	      return remAttr(dom, dir);
	    });
	  }
	
	  /**
	   * Move the position of a custom tag in its parent tag
	   * @this Tag
	   * @param   { String } tagName - key where the tag was stored
	   * @param   { Number } newPos - index where the new tag will be stored
	   */
	  function moveChildTag(tagName, newPos) {
	    var parent = this.parent,
	        tags;
	    // no parent no move
	    if (!parent) {
	      return;
	    }
	
	    tags = parent.tags[tagName];
	
	    if (isArray(tags)) {
	      tags.splice(newPos, 0, tags.splice(tags.indexOf(this), 1)[0]);
	    } else {
	      arrayishAdd(parent.tags, tagName, this);
	    }
	  }
	
	  /**
	   * Create a new child tag including it correctly into its parent
	   * @param   { Object } child - child tag implementation
	   * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
	   * @param   { String } innerHTML - inner html of the child node
	   * @param   { Object } parent - instance of the parent tag including the child custom tag
	   * @returns { Object } instance of the new child tag just created
	   */
	  function initChildTag(child, opts, innerHTML, parent) {
	    var tag = new Tag$1(child, opts, innerHTML),
	        tagName = opts.tagName || getTagName(opts.root, true),
	        ptag = getImmediateCustomParentTag(parent);
	    // fix for the parent attribute in the looped elements
	    defineProperty(tag, 'parent', ptag);
	    // store the real parent tag
	    // in some cases this could be different from the custom parent tag
	    // for example in nested loops
	    tag.__.parent = parent;
	
	    // add this tag to the custom parent tag
	    arrayishAdd(ptag.tags, tagName, tag);
	
	    // and also to the real parent tag
	    if (ptag !== parent) {
	      arrayishAdd(parent.tags, tagName, tag);
	    }
	
	    // empty the child node once we got its template
	    // to avoid that its children get compiled multiple times
	    opts.root.innerHTML = '';
	
	    return tag;
	  }
	
	  /**
	   * Loop backward all the parents tree to detect the first custom parent tag
	   * @param   { Object } tag - a Tag instance
	   * @returns { Object } the instance of the first custom parent tag found
	   */
	  function getImmediateCustomParentTag(tag) {
	    var ptag = tag;
	    while (ptag.__.isAnonymous) {
	      if (!ptag.parent) {
	        break;
	      }
	      ptag = ptag.parent;
	    }
	    return ptag;
	  }
	
	  /**
	   * Trigger the unmount method on all the expressions
	   * @param   { Array } expressions - DOM expressions
	   */
	  function unmountAll(expressions) {
	    each(expressions, function (expr) {
	      if (expr instanceof Tag$1) {
	        expr.unmount(true);
	      } else if (expr.unmount) {
	        expr.unmount();
	      }
	    });
	  }
	
	  /**
	   * Get the tag name of any DOM node
	   * @param   { Object } dom - DOM node we want to parse
	   * @param   { Boolean } skipDataIs - hack to ignore the data-is attribute when attaching to parent
	   * @returns { String } name to identify this dom node in riot
	   */
	  function getTagName(dom, skipDataIs) {
	    var child = getTag(dom),
	        namedTag = !skipDataIs && getAttr(dom, IS_DIRECTIVE);
	    return namedTag && !tmpl.hasExpr(namedTag) ? namedTag : child ? child.name : dom.tagName.toLowerCase();
	  }
	
	  /**
	   * With this function we avoid that the internal Tag methods get overridden
	   * @param   { Object } data - options we want to use to extend the tag instance
	   * @returns { Object } clean object without containing the riot internal reserved words
	   */
	  function cleanUpData(data) {
	    if (!(data instanceof Tag$1) && !(data && isFunction(data.trigger))) {
	      return data;
	    }
	
	    var o = {};
	    for (var key in data) {
	      if (!RE_RESERVED_NAMES.test(key)) {
	        o[key] = data[key];
	      }
	    }
	    return o;
	  }
	
	  /**
	   * Set the property of an object for a given key. If something already
	   * exists there, then it becomes an array containing both the old and new value.
	   * @param { Object } obj - object on which to set the property
	   * @param { String } key - property name
	   * @param { Object } value - the value of the property to be set
	   * @param { Boolean } ensureArray - ensure that the property remains an array
	   */
	  function arrayishAdd(obj, key, value, ensureArray) {
	    var dest = obj[key];
	    var isArr = isArray(dest);
	
	    if (dest && dest === value) {
	      return;
	    }
	
	    // if the key was never set, set it once
	    if (!dest && ensureArray) {
	      obj[key] = [value];
	    } else if (!dest) {
	      obj[key] = value;
	    }
	    // if it was an array and not yet set
	    else if (!isArr || isArr && !contains(dest, value)) {
	        if (isArr) {
	          dest.push(value);
	        } else {
	          obj[key] = [dest, value];
	        }
	      }
	  }
	
	  /**
	   * Removes an item from an object at a given key. If the key points to an array,
	   * then the item is just removed from the array.
	   * @param { Object } obj - object on which to remove the property
	   * @param { String } key - property name
	   * @param { Object } value - the value of the property to be removed
	   * @param { Boolean } ensureArray - ensure that the property remains an array
	  */
	  function arrayishRemove(obj, key, value, ensureArray) {
	    if (isArray(obj[key])) {
	      each(obj[key], function (item, i) {
	        if (item === value) {
	          obj[key].splice(i, 1);
	        }
	      });
	      if (!obj[key].length) {
	        delete obj[key];
	      } else if (obj[key].length === 1 && !ensureArray) {
	        obj[key] = obj[key][0];
	      }
	    } else {
	      delete obj[key];
	    } // otherwise just delete the key
	  }
	
	  /**
	   * Check whether a DOM node is in stub mode, useful for the riot 'if' directive
	   * @param   { Object }  dom - DOM node we want to parse
	   * @returns { Boolean } -
	   */
	  function isInStub(dom) {
	    while (dom) {
	      if (dom.inStub) {
	        return true;
	      }
	      dom = dom.parentNode;
	    }
	    return false;
	  }
	
	  /**
	   * Mount a tag creating new Tag instance
	   * @param   { Object } root - dom node where the tag will be mounted
	   * @param   { String } tagName - name of the riot tag we want to mount
	   * @param   { Object } opts - options to pass to the Tag instance
	   * @param   { Object } ctx - optional context that will be used to extend an existing class ( used in riot.Tag )
	   * @returns { Tag } a new Tag instance
	   */
	  function mountTo(root, tagName, opts, ctx) {
	    var impl = __TAG_IMPL[tagName],
	        implClass = __TAG_IMPL[tagName].class,
	        tag = ctx || (implClass ? Object.create(implClass.prototype) : {}),
	
	    // cache the inner HTML to fix #855
	    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;
	
	    // clear the inner html
	    root.innerHTML = '';
	
	    var conf = { root: root, opts: opts };
	    if (opts && opts.parent) {
	      conf.parent = opts.parent;
	    }
	
	    if (impl && root) {
	      Tag$1.apply(tag, [impl, conf, innerHTML]);
	    }
	
	    if (tag && tag.mount) {
	      tag.mount(true);
	      // add this tag to the virtualDom variable
	      if (!contains(__TAGS_CACHE, tag)) {
	        __TAGS_CACHE.push(tag);
	      }
	    }
	
	    return tag;
	  }
	
	  /**
	   * makes a tag virtual and replaces a reference in the dom
	   * @this Tag
	   * @param { tag } the tag to make virtual
	   * @param { ref } the dom reference location
	   */
	  function makeReplaceVirtual(tag, ref) {
	    var frag = createFrag();
	    makeVirtual.call(tag, frag);
	    ref.parentNode.replaceChild(frag, ref);
	  }
	
	  /**
	   * Adds the elements for a virtual tag
	   * @this Tag
	   * @param { Node } src - the node that will do the inserting or appending
	   * @param { Tag } target - only if inserting, insert before this tag's first child
	   */
	  function makeVirtual(src, target) {
	    var this$1 = this;
	
	    var head = createDOMPlaceholder(),
	        tail = createDOMPlaceholder(),
	        frag = createFrag(),
	        sib,
	        el;
	
	    this.__.head = this.root.insertBefore(head, this.root.firstChild);
	    this.__.tail = this.root.appendChild(tail);
	
	    el = this.__.head;
	
	    while (el) {
	      sib = el.nextSibling;
	      frag.appendChild(el);
	      this$1.__.virts.push(el); // hold for unmounting
	      el = sib;
	    }
	
	    if (target) {
	      src.insertBefore(frag, target.__.head);
	    } else {
	      src.appendChild(frag);
	    }
	  }
	
	  /**
	   * Move virtual tag and all child nodes
	   * @this Tag
	   * @param { Node } src  - the node that will do the inserting
	   * @param { Tag } target - insert before this tag's first child
	   */
	  function moveVirtual(src, target) {
	    var this$1 = this;
	
	    var el = this.__.head,
	        frag = createFrag(),
	        sib;
	
	    while (el) {
	      sib = el.nextSibling;
	      frag.appendChild(el);
	      el = sib;
	      if (el === this$1.__.tail) {
	        frag.appendChild(el);
	        src.insertBefore(frag, target.__.head);
	        break;
	      }
	    }
	  }
	
	  /**
	   * Get selectors for tags
	   * @param   { Array } tags - tag names to select
	   * @returns { String } selector
	   */
	  function selectTags(tags) {
	    // select all tags
	    if (!tags) {
	      var keys = Object.keys(__TAG_IMPL);
	      return keys + selectTags(keys);
	    }
	
	    return tags.filter(function (t) {
	      return !/[^-\w]/.test(t);
	    }).reduce(function (list, t) {
	      var name = t.trim().toLowerCase();
	      return list + ",[" + IS_DIRECTIVE + "=\"" + name + "\"]";
	    }, '');
	  }
	
	  var tags = Object.freeze({
	    getTag: getTag,
	    inheritFrom: inheritFrom,
	    getRefAttr: getRefAttr,
	    remRefAttr: remRefAttr,
	    moveChildTag: moveChildTag,
	    initChildTag: initChildTag,
	    getImmediateCustomParentTag: getImmediateCustomParentTag,
	    unmountAll: unmountAll,
	    getTagName: getTagName,
	    cleanUpData: cleanUpData,
	    arrayishAdd: arrayishAdd,
	    arrayishRemove: arrayishRemove,
	    isInStub: isInStub,
	    mountTo: mountTo,
	    makeReplaceVirtual: makeReplaceVirtual,
	    makeVirtual: makeVirtual,
	    moveVirtual: moveVirtual,
	    selectTags: selectTags
	  });
	
	  /**
	   * Riot public api
	   */
	  var settings = Object.create(brackets.settings);
	
	  var util = {
	    tmpl: tmpl,
	    brackets: brackets,
	    styleManager: styleManager,
	    vdom: __TAGS_CACHE,
	    styleNode: styleManager.styleNode,
	    // export the riot internal utils as well
	    dom: dom,
	    check: check,
	    misc: misc,
	    tags: tags
	  };
	
	  // export the core props/methods
	  var Tag$$1 = Tag$2;
	  var tag$$1 = tag$1;
	  var tag2$$1 = tag2$1;
	  var mount$$1 = mount$1;
	  var mixin$$1 = mixin$1;
	  var update$$1 = update$1;
	  var unregister$$1 = unregister$1;
	  var observable = observable$1;
	
	  var riot$1 = extend({}, core, {
	    observable: observable$1,
	    settings: settings,
	    util: util
	  });
	
	  exports.settings = settings;
	  exports.util = util;
	  exports.Tag = Tag$$1;
	  exports.tag = tag$$1;
	  exports.tag2 = tag2$$1;
	  exports.mount = mount$$1;
	  exports.mixin = mixin$$1;
	  exports.update = update$$1;
	  exports.unregister = unregister$$1;
	  exports.observable = observable;
	  exports['default'] = riot$1;
	
	  Object.defineProperty(exports, '__esModule', { value: true });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('app', '<b>TEST</b>', '', '', function (opts) {});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map