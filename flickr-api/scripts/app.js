/**
 * Created by Andrey on 27.04.2016.
 */
const API_KEY = '72755c7ee49139053c45348fd0585eb9';
const API_SECRET = 'b3c2e211c6b3d92b';

class FlickrApp {
    constructor(apiKey, apiSecret){
        this.apiKey = apiKey;
        this.apiSecrtet = apiSecret;
        this.REQUEST_URL = 'https://api.flickr.com/services/rest/?format=json&api_key=' + apiKey;
    }


    buildUrl(params = {}, url = this.REQUEST_URL){
        for (let key in params){
            url += `&${key}=${params[key]}`;
        }
        return url;
    }

    findPhotos(keyWord){

    }
}

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