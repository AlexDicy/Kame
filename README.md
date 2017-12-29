# Kame
KameJS is a JavaScript framework used for reload-less routing (using HTML5 methods like `history.pushState(...)`)

## Documentation
How to use the framework, it's really simple, just one line to start.
### Init the framework
##### assets/js/routes.js
Create a file where you can define your routes, we will call it `routes.js`

This file will contain your routes and a method to init the framework that we can use in this way:
``` js
kame.initPage();
```

### Define your routes
##### assets/js/routes.js
Now, at the top of the file we can write our routes (before the `kame.initPage();`)
To add a new route, use `kame.route("/page", "file.html", "Page Title");`
``` js
kame.route("/", "index.html");
kame.route("/help", "help.html");

kame.route("/something", "test.php");


kame.initPage();
```

The file you choose in the route will be fetch from `/pages/filename` so, in this case, the folder `/pages/` must contain `index.html`, `help.html` and `test.php`

### Enable the framework on the website
Now you have 2 scripts: `kame.js` and `routes.js`. You'll have to include them on your page, before the closing tag of the `</body>` in this way
``` html
<!DOCTYPE html>
<html>
<head>
    ...
</head>
<body>
    ...
    <script src="/assets/js/kame.js"></script>
    <script src="/assets/js/routes.js"></script>
</body>
</html>
```
Now you need to provide a container with the class `main`, we will use a div:
``` html
<!DOCTYPE html>
<html>
<head>
    ...
</head>
<body>
    <div class="main"></div>
    <script src="/assets/js/kame.js"></script>
    <script src="/assets/js/routes.js"></script>
</body>
</html>
```
Now you need a way to navigate through the website, we can easily add a link, like this:
``` html
<a href="/help">Help</a>
```
If you have a link that shouldn't be handled, add `no-ajax` like this:
``` html
<a href="/something" no-ajax>Some link</a>
```
