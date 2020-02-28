module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/views/TransformWeChatImageToBackground.less":
/*!***********************************************************!*\
  !*** ./pages/views/TransformWeChatImageToBackground.less ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./pages/views/TransformWeChatImageToBackground.tsx":
/*!**********************************************************!*\
  !*** ./pages/views/TransformWeChatImageToBackground.tsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common.less */ "./pages/views/common.less");
/* harmony import */ var _common_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_common_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TransformWeChatImageToBackground_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TransformWeChatImageToBackground.less */ "./pages/views/TransformWeChatImageToBackground.less");
/* harmony import */ var _TransformWeChatImageToBackground_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_TransformWeChatImageToBackground_less__WEBPACK_IMPORTED_MODULE_2__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



function App() {
  const onChange = react__WEBPACK_IMPORTED_MODULE_0___default.a.useCallback(async e => {
    const node = document.getElementById('target');
    node.value = await transform(e.target.value);
  }, []);
  const copy = react__WEBPACK_IMPORTED_MODULE_0___default.a.useCallback(e => {
    const node = document.getElementById('target');
    node.select();
    document.execCommand('copy');
    node.setSelectionRange(0, 0);
    node.blur();
  }, []);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("h2", null, "\u5FAE\u4FE1\u516C\u4F17\u53F7\u6587\u7AE0\u5B9E\u73B0\u9632\u89E6\u78B0\u6548\u679C"), __jsx("div", null, "\u53C2\u8003\u6587\u7AE0\uFF1A", __jsx("a", {
    href: "https://mp.weixin.qq.com/s?__biz=MzIyNTgyNzEyNQ==&mid=2247484782&idx=1&sn=66c031895c3b24f695a5048c77c74916&chksm=e8788534df0f0c228144454e649e8609e5ac7e2dd4bd78a3b820dddc2b48e809993b5d1abc33&mpshare=1&scene=1&srcid=0107sG49sXnYZaNla2cs1eKt&sharer_sharetime=1578405801189&sharer_shareid=165df3fe89b08ef85873e284bb6e529c&rd2werd=1#wechat_redirect",
    target: "_blank"
  }, "\u8DDF\u82F9\u679C\u5B66\u4E60\u5FAE\u4FE1\u516C\u4F17\u53F7\u6392\u7248")), __jsx("div", {
    className: "convertor"
  }, __jsx("section", {
    className: "source"
  }, __jsx("h3", null, "\u4FEE\u6539\u524D"), __jsx("textarea", {
    onChange: onChange,
    placeholder: "\u628A\u6E90\u4EE3\u7801\u7C98\u8D34\u5230\u8FD9\u91CC"
  })), __jsx("section", {
    className: "target"
  }, __jsx("div", null, __jsx("h3", null, "\u4FEE\u6539\u540E"), __jsx("div", {
    className: "action"
  }, __jsx("button", {
    type: "button",
    onClick: copy
  }, "\u590D\u5236"))), __jsx("textarea", {
    id: "target"
  }))));
}

async function transform(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  const nodes = Array.from(container.querySelectorAll('img'));
  await Promise.all(nodes.map(node => {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        const div = document.createElement('div');
        const paddingTop = img.naturalHeight / img.naturalWidth * 100;
        div.style.cssText = `padding-top: ${paddingTop}%; background-image: url("${img.src}"); background-size: 100%; background-repeat: no-repeat;`;
        node.parentElement.replaceChild(div, node);
        return resolve();
      };

      img.onerror = reject;
      img.src = node.src || node.getAttribute('src') || node.getAttribute('data-src');
    });
  }));
  return container.innerHTML;
}

/***/ }),

/***/ "./pages/views/common.less":
/*!*********************************!*\
  !*** ./pages/views/common.less ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 5:
/*!****************************************************************!*\
  !*** multi ./pages/views/TransformWeChatImageToBackground.tsx ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/gaiaworks/workspace/api/nextjs/pages/views/TransformWeChatImageToBackground.tsx */"./pages/views/TransformWeChatImageToBackground.tsx");


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=TransformWeChatImageToBackground.js.map