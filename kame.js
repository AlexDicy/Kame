"use strict";

var kame = (function () {
    var pages = [];
    var base = "";
    var timers = {};
    var originalTitle = document.title || (document.head.title && document.head.title.text) || "";

    var loadPage = function (url, container) {
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (page.url === url) {
                loadTemplate(page, container);
                return true;
            }
        }
        container.innerHTML = "Not found";
        return false;
    };

    var loadTemplate = function (page, container) {
        var filename = base + "/pages/" + page.page;
        if (page.title) {
            document.title = page.title;
        } else {
            document.title = originalTitle;
        }
        fetchUrl(filename, function (content) {
            for (var key in timers) {
                kame.cancelTimer(key);
            }
            timers = {};
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            container.innerHTML = content;
            var scripts = container.getElementsByTagName("script");
            for (var i = 0; i < scripts.length; i++) {
                var script = scripts[i];
                container.removeChild(script);
                var newScript = document.createElement("script");
                if (script.src) newScript.src = script.src;
                newScript.innerHTML = script.innerHTML;
                container.appendChild(newScript)
            }
        });
    };

    var fetchUrl = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function() {
            callback(xhr.response);
        };
        xhr.send();
    };

    var route = function (url, page, title, template) {
        pages.push(new Page(url, page, title, template));
    };

    var Page = function (url, page, title, template) {
        this.url = url;
        this.page = page;
        this.title = title;
        this.template = template;
    };

    var kame = {
        route: route,
        timer: function (name, ex, mill) {
            var timer = window.setInterval(ex, mill);
            timers[name] = timer;
            return timer;
        },
        cancelTimer: function (name) {
            var timer = timers[name];
            if (timer) {
                window.clearInterval(timer);
            }
        },
        handleClick: function (event) {
            var target = event.target;
            if (target.hasAttribute("href")) {
                if (target.hasAttribute("no-ajax")) return;
                var main = document.getElementsByClassName("main");
                if (main.length > 0) {
                    event.preventDefault();
                    var route = target.getAttribute("href");
                    if (route.substring(0, 1) === "/") {
                        window.history.pushState(null, "", base + route);
                        loadPage(route, main[0]);
                    }
                }
            }
        },
        loadPageFromPath: function () {
            var main = document.getElementsByClassName("main");
            if (main.length > 0) {
                loadPage(location.pathname, main[0]);
            }
        },
        initPage: function () {
            this.loadPageFromPath();
        }
    };

    var onPopState = function () {
        kame.loadPageFromPath();
    };

    window.addEventListener("popstate", onPopState);

    document.body.addEventListener("click", function (event) {
        kame.handleClick(event);
    });

    var baseTag = document.getElementsByTagName("base");
    if (baseTag.length > 0) {
        var tag = baseTag[0];
        if (tag.hasAttribute("href")) {
            base = "/" + baseTag[0].getAttribute("href");
        }
    }
    return kame;
})();
