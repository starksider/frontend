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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by Andrey on 27.04.2016.
	 */
	var request = __webpack_require__(1);
	
	var API_KEY = '72755c7ee49139053c45348fd0585eb9';
	var API_SECRET = 'b3c2e211c6b3d92b';
	
	var FlickrApp = function () {
	    function FlickrApp(apiKey, apiSecret) {
	        _classCallCheck(this, FlickrApp);
	
	        this.API_KEY = apiKey;
	        this.API_SECRTET = apiSecret;
	    }
	
	    /**
	     * basic flickr url for all methods
	     * @return {string}
	     */
	
	
	    _createClass(FlickrApp, [{
	        key: 'buildUrl',
	
	
	        /**
	         * build request url based on params
	         * @param params - object with flickr methods and parameters
	         * @param url
	         * @returns {string}
	         */
	        value: function buildUrl() {
	            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	            var url = arguments.length <= 1 || arguments[1] === undefined ? this.BASIC_URL : arguments[1];
	
	            for (var key in params) {
	                url += '&' + key + '=' + params[key];
	            }
	            return url;
	        }
	
	        /**
	         * specific function for finding photos by phrase or more complex options
	         * @param text
	         * @param options
	         */
	
	    }, {
	        key: 'findPhotos',
	        value: function findPhotos(text) {
	            var _this = this;
	
	            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	            options = (typeof text === 'undefined' ? 'undefined' : _typeof(text)) == 'object' ? text : options;
	            var standardOptions = { method: 'flickr.photos.search' };
	            var defaults = {
	                text: text,
	                per_page: 20,
	                page: 1
	            };
	            var parameters = Object.assign({}, defaults, options, standardOptions);
	            var url = this.buildUrl(parameters);
	            request.scriptRequest(url, function (data) {
	                _this.renderPhotos(data.photos.photo);
	            }, function (data) {
	                throw Error('Wrong url - ' + data);
	            });
	        }
	    }, {
	        key: 'renderPhotos',
	        value: function renderPhotos() {
	            var photos = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	            var ul = document.createElement("ul");
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = photos[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var _step$value = _step.value;
	                    var farm = _step$value.farm;
	                    var server = _step$value.server;
	                    var id = _step$value.id;
	                    var secret = _step$value.secret;
	
	                    var li = document.createElement("li");
	                    var img = document.createElement("img");
	                    img.src = 'https://farm' + farm + '.static.flickr.com/' + server + '/' + id + '_' + secret + '.jpg';
	                    li.appendChild(img);
	                    ul.appendChild(li);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            document.body.appendChild(ul);
	        }
	    }, {
	        key: 'BASIC_URL',
	        get: function get() {
	            return 'https://api.flickr.com/services/rest/?format=json&api_key=' + this.API_KEY;
	        }
	    }]);
	
	    return FlickrApp;
	}();
	
	var flickr = new FlickrApp(API_KEY, API_SECRET);
	var elems = {
	    input: document.getElementById("photos"),
	    button: document.getElementById("get_photos")
	};
	elems.button.onclick = function () {
	    var text = elems.input.value;
	    if (text != '') {
	        flickr.findPhotos({ text: text, per_page: 5 });
	    }
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by Andrey on 11.05.2016.
	 */
	
	var Request = function () {
	        function Request() {
	                _classCallCheck(this, Request);
	
	                window.CallbackRegistry = {}; // реестр
	        }
	
	        // при успехе вызовет onSuccess, при ошибке onError
	
	
	        _createClass(Request, [{
	                key: 'scriptRequest',
	                value: function scriptRequest(url, onSuccess, onError) {
	
	                        var scriptOk = false; // флаг, что вызов прошел успешно
	
	                        // сгенерировать имя JSONP-функции для запроса
	                        var callbackName = 'cb' + String(Math.random()).slice(-6);
	
	                        // укажем это имя в URL запроса
	                        url += ~url.indexOf('?') ? '&' : '?';
	                        url += 'jsoncallback=CallbackRegistry.' + callbackName;
	
	                        // ..и создадим саму функцию в реестре
	                        CallbackRegistry[callbackName] = function (data) {
	                                scriptOk = true; // обработчик вызвался, указать что всё ок
	                                delete CallbackRegistry[callbackName]; // можно очистить реестр
	                                onSuccess(data); // и вызвать onSuccess
	                        };
	
	                        // эта функция сработает при любом результате запроса
	                        // важно: при успешном результате - всегда после JSONP-обработчика
	                        function checkCallback() {
	                                if (scriptOk) return; // сработал обработчик?
	                                delete CallbackRegistry[callbackName];
	                                onError(url); // нет - вызвать onError
	                        }
	
	                        var script = document.createElement('script');
	
	                        // в старых IE поддерживается только событие, а не onload/onerror
	                        // в теории 'readyState=loaded' означает "скрипт загрузился",
	                        // а 'readyState=complete' -- "скрипт выполнился", но иногда
	                        // почему-то случается только одно из них, поэтому проверяем оба
	                        script.onreadystatechange = function () {
	                                if (this.readyState == 'complete' || this.readyState == 'loaded') {
	                                        this.onreadystatechange = null;
	                                        setTimeout(checkCallback, 0); // Вызвать checkCallback - после скрипта
	                                }
	                        };
	
	                        // события script.onload/onerror срабатывают всегда после выполнения скрипта
	                        script.onload = script.onerror = checkCallback;
	                        script.src = url;
	
	                        document.body.appendChild(script);
	                }
	        }]);
	
	        return Request;
	}();
	
	module.exports = new Request();

/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map