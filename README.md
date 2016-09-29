# news-api-njs
An interface for Node and the [newsapi.org](https://newsapi.org/) API

You'll need an API key from [News API](https://newsapi.org/)

You can install using `npm install --save news-api-njs`

Then you can set up like so, where username is a default username:
```js
var NewsApi = require('../lib'),
    config = require('./config');
var news = new NewsApi({
    apiKey: config.apiKey
});
```

After this, you can use either of the following methods

### Get Sources
#### getSources(opt);
Returns all possible sources
where
```js
    opt = {
        source: source // required
        sortBy: top|latest|popular //optional, default is top
        callback: callback
    }
```
and callback is a function which receives a single object, containing the News API response and `success: true|false` 

### Get Articles
Returns list of articles from a given source
### getArticles(opt);
```js
    opt = {
        source: source // required
        sortBy: top|latest|popular //optional, default is top
        callback: callback
    }
```
and callback is a function which receives a single object, containing the News API response and `success: true|false` 

You can read a full description of what options do and what the response looks like at [newsapi.org](https://newsapi.org/), or view [examples](../master/examples/examples.js)