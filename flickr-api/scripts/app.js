/**
 * Created by Andrey on 27.04.2016.
 */
let request = require('./request');

const API_KEY = '72755c7ee49139053c45348fd0585eb9';
const API_SECRET = 'b3c2e211c6b3d92b';

class FlickrApp {
    constructor(apiKey, apiSecret){
        this.API_KEY = apiKey;
        this.API_SECRTET = apiSecret;
    }

    /**
     * basic flickr url for all methods
     * @return {string}
     */
    get BASIC_URL() {
        return 'https://api.flickr.com/services/rest/?format=json&api_key=' + this.API_KEY;
    }

    /**
     * build request url based on params
     * @param params - object with flickr methods and parameters
     * @param url
     * @returns {string}
     */
    buildUrl(params = {}, url = this.BASIC_URL){
        for (let key in params){
            url += `&${key}=${params[key]}`;
        }
        return url;
    }

    /**
     * specific function for finding photos by phrase or more complex options
     * @param text
     * @param options
     */
    findPhotos(text, options = {}){
        options = typeof text == 'object' ? text : options;
        let standardOptions = {method: 'flickr.photos.search'};
        let defaults = {
            text: text,
            per_page: 20,
            page: 1
        };
        let parameters = Object.assign({}, defaults, options, standardOptions);
        let url = this.buildUrl(parameters);
        request.scriptRequest(url, (data) => {
            this.renderPhotos(data.photos.photo);
        }, (data) => {
            throw Error(`Wrong url - ${data}`);
        });
    }

    renderPhotos(photos = []){
        let ul = document.createElement("ul");
        for (let {farm, server, id, secret} of photos){
            let li = document.createElement("li");
            let img = document.createElement("img");
            img.src = `https://farm${farm}.static.flickr.com/${server}/${id}_${secret}.jpg`;
            li.appendChild(img);
            ul.appendChild(li);
        }
        document.body.appendChild(ul);
    }

}

let flickr = new FlickrApp(API_KEY, API_SECRET);
let elems = {
    input: document.getElementById("photos"),
    button: document.getElementById("get_photos")
};
elems.button.onclick = () => {
    let text = elems.input.value;
    if (text != ''){
       flickr.findPhotos({text: text, per_page: 5});
    }
};

