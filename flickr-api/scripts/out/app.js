'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Andrey on 27.04.2016.
 */
var API_KEY = '72755c7ee49139053c45348fd0585eb9';
var API_SECRET = 'b3c2e211c6b3d92b';

var FlickrApp = function () {
    function FlickrApp(apiKey, apiSecret) {
        _classCallCheck(this, FlickrApp);

        this.apiKey = apiKey;
        this.apiSecrtet = apiSecret;
        this.REQUEST_URL = 'https://api.flickr.com/services/rest/?format=json&api_key=' + apiKey;
    }

    _createClass(FlickrApp, [{
        key: 'buildUrl',
        value: function buildUrl() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var url = arguments.length <= 1 || arguments[1] === undefined ? this.REQUEST_URL : arguments[1];

            for (var key in params) {
                url += '&' + key + '=' + params[key];
            }
            return url;
        }
    }, {
        key: 'findPhotos',
        value: function findPhotos(keyWord) {}
    }]);

    return FlickrApp;
}();

var request = new XMLHttpRequest();
request.onreadystatechange = function () {
    if (this.status === 200) {
        console.log("YESSSSS!!!");
    } else {
        console.log("NO!!!");
    }
};
request.open('GET', url);
request.send();

//# sourceMappingURL=app.js.map