var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var _a;
var DEBUG_LOGGING = false;
var debugLog = function (s) { return DEBUG_LOGGING && console.log('FaviconLinks DEBUG:', s); };
var errorLog = function (s) { return console.error('FaviconLinks ERROR:', s); };
var SCRIPT_ID = 'favicon-links';
var PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
var THROTTLE_MS = 50;
var FaviconProvider;
(function (FaviconProvider) {
    FaviconProvider["DUCKDUCKGO"] = "duckduckgo";
    FaviconProvider["GOOGLE"] = "google";
    FaviconProvider["YANDEX"] = "yandex";
})(FaviconProvider || (FaviconProvider = {}));
var FaviconProviderDefault = (_a = {},
    _a[FaviconProvider.DUCKDUCKGO] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACSElEQVRoQ+2avU7DMBCAfc7IC/QxYKc73XmBzrHMXma64zpzd8ReZspeHqAP0AeAMT50VVylIX9N7QRXRIoqNbF9n+/Hd3aAObiUUjcAcA0A9DtijNFddu0Qke4NIn5KKTfnDg9dOyChOecTxtgYAK669IOI34yxtTFm1RXmZIBM8CnNeBehq9qQRowxy1NBWgMkSTJCRAkAty4FL/aFiB8AoOI43rUZpxWAUmrMOZ91NZU2guTfIdMyxsyllOumto0AWmua9fumjnw8R8RXIYSq67sWQGtNs37nQ7i2fSLimxBiXvV+JcBfEN4KXQdRCjCk2dREqVJz+gVADhtF0VNbFff5Xpqmj0XHPgLIQuWyr2hzKjxFJwCY5kPsEYDWeu47zp8qdNk6IYSY2f8PALTCRlH0fO4A1B4Rt4yxra8Ilqbpg12xDwBaa+UiPSDhAUDGcfzlK5JR2iGEkDRZewBXs58X3mrSF4TVwh7AxSBlwvuEsGuDBVidG3maVkwXk1TMl4QQE3BlPpnz1i77riHIjGCxWEw551MX0advCKofwFX0Kai3F01QNIIkSV5qatjOiunJJ3YE8N5ZyoaGfUB4BejDJ7wD+Ib4B2jyH99+4FUDvoXfJ3PBh9HgF7LgU4ngk7msHgg3nb6IgsaVGQ1WUmZaCLeod1nYD7atkmkh3I0tAgh+azEzpXA3d3P7OIOdylRlt1WnNZd5wOFzR62pfig+b0rJL/uQz85G0MesFiLog+68XQb7qUHRuYL92KMsigz5uc0PwApGxRM8pM8AAAAASUVORK5CYII=",
    _a[FaviconProvider.GOOGLE] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACqklEQVQ4T2NkoBAwwvSHhq7ifPnrtYi1iZLp719/st9/+G7y8dMPHpA8Hy/HF0EBzjNs7CxTj565d1qcTfTN6tVh30FyYANAmr/8fi+loiae+uXrTz8VRWExOSUh4V+//zKwsTIzKMoJM+zefePtg0fvX/Hxsm26c+v1bB5WwWcgQ8AG2PlPldVXl87+9v1PlJaOmKyivDADNxcbg5GuDMPXb78Y5KX4GJ6//sZw+cYzhmXLzz7m42ZbdvH286mHNmY/BhtQ2bw96Nnzjy2pSZaar958AfuKlZUZTOtqSIIN+PuPgeHQqftgJ89fdPK6tJRATXut5zqwAcU1m/fycLPp15a5CW/afQ0lWJ1t1Bj4uFkYPn39w7D3yC0GJTkhhjXrLr79+v3Xxf5WP2ewAUk5qz4mJZjz6WpIgRXBAEwziA9ywc17bxhu3n3FICbCwzBn3olPC6aF84MNCI5b+LejyY9JRV6AYdfhOwwykgJgDLIZGew/cZ/hw8fvDCCLyms2/lu3JIEZbsDknhAmSVEusFNPnHsADkARAQ4MA0CBqqEszlBWs/HfepgBidkrPyYnWvBZG8vBNRw9+wjOVpITYQAZDgJvPvwAe2P23OOfFk6PgHgBFogNFW7CMF2wQIPxpSUFGMz0pMDciobtb3/9+nOxvx0aiBWN2wOfv/jYmppsqQlzBboBII1+rloMJ84/Ypg559h1aUmB6o56z/VICUky+9OXX1GpSZayMEPuPPwATjyQ9CDF8PLNJ4aZs489FuBlR01IiKQsmvrx808/GUl+MS8vbeHfv/8y3Hv0luHXr78Mj++/f/v42YdXAjzsm+7cQUvKsPwAykxWRkomP3/9znn//rvJp88/eP7//w/OTMJCXKe5OFimnDpz/yw/emZCiSsSOQBeSzog3zDfJwAAAABJRU5ErkJggg==",
    _a[FaviconProvider.YANDEX] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=",
    _a);
function initialize() {
    document.addEventListener('DOMContentLoaded', function () {
        var scriptElement = document.getElementById(SCRIPT_ID);
        if (!scriptElement) {
            errorLog("FaviconLinks ERROR: Could not find script tag. Please add `id=\"" + SCRIPT_ID + "\"` to the script element.");
            return;
        }
        var selector = scriptElement.getAttribute('data-selector');
        if (!selector) {
            errorLog("FaviconLinks ERROR: Could not find selector. Please add `data-selector=\"<your selector>\"` to the script element.");
            return;
        }
        var fallbackDataUrl = scriptElement.getAttribute('data-fallback-dataurl');
        var shouldIncludeInternalLinks = scriptElement.hasAttribute('data-include-internal-links');
        setFavicons(selector, !shouldIncludeInternalLinks);
        var stylesheet = (function () {
            var style = document.createElement("style");
            style.appendChild(document.createTextNode(""));
            document.head.appendChild(style);
            return style.sheet;
        })();
        var setFaviconsVisible = function () {
            stylesheet.insertRule('a[data-favicon]::after {'
                + 'background-position: 0 center;'
                + 'background-repeat: no-repeat;'
                + 'background-size: 16px 16px !important;'
                + 'content: "";'
                + 'height: 16px;'
                + 'margin-left: 2px;'
                + 'padding-left: 16px;'
                + 'vertical-align: middle;'
                + 'width: 16px;'
                + '}', 0);
            debugLog('Favicons are visible');
        };
        setFaviconsVisible();
        var allHostnames = Array.prototype.slice.call(document.querySelectorAll(selector + "[data-favicon]"))
            .map(function (linkElement) {
            return linkElement.hostname;
        });
        var uniqueHostnames = __spread(new Set(allHostnames));
        var numComplete = 0;
        uniqueHostnames.forEach(function (hostname) {
            setDataUrlForFavicon(hostname, stylesheet, [
                FaviconProvider.DUCKDUCKGO,
                FaviconProvider.GOOGLE,
                FaviconProvider.YANDEX,
            ], function () { }, THROTTLE_MS, fallbackDataUrl);
        });
    });
}
function setFavicons(selector, externalOnly) {
    if (externalOnly === void 0) { externalOnly = true; }
    Array.prototype.slice.call(document.querySelectorAll(selector))
        .filter(function (linkElement) {
        var hostname = linkElement.hostname;
        return !(externalOnly && hostname === location.hostname);
    })
        .forEach(function (linkElement) {
        setFavicon(linkElement);
    });
}
function setFavicon(linkElement) {
    linkElement.setAttribute('data-favicon', linkElement.hostname);
}
function addBackgroundImageRule(stylesheet, hostname, dataUrl) {
    stylesheet.insertRule("a[data-favicon=\"" + hostname + "\"]::after {"
        + ("background-image: url(\"" + dataUrl + "\");")
        + "}", 0);
}
function setDataUrlForFavicon(hostname, stylesheet, providerPrecedence, onComplete, throttleMs, fallbackDataUrl) {
    if (providerPrecedence === void 0) { providerPrecedence = []; }
    if (onComplete === void 0) { onComplete = function () { }; }
    if (throttleMs === void 0) { throttleMs = 0; }
    if (fallbackDataUrl === void 0) { fallbackDataUrl = null; }
    if (!providerPrecedence.length) {
        return;
    }
    var testDataUrl = function (imageUrl, test, onPass, onFail) {
        window.setTimeout(function () {
            toDataUrl(imageUrl, function (dataUrl) {
                test(dataUrl) ? onPass(dataUrl) : onFail(dataUrl);
            });
        }, throttleMs);
    };
    var inner = function (providerIndex) {
        if (providerIndex >= providerPrecedence.length) {
            debugLog("Failed to find a non-default dataUrl for hostname \"" + hostname + "\"");
            if (fallbackDataUrl) {
                addBackgroundImageRule(stylesheet, hostname, fallbackDataUrl);
            }
            onComplete();
            return;
        }
        var provider = providerPrecedence[providerIndex];
        var faviconUrl = getFaviconUrl(hostname, provider);
        if (!faviconUrl) {
            errorLog("FaviconLinks ERROR: No favicon URL found for hostname \"" + hostname + "\" and provider \"" + provider + "\".");
            return;
        }
        debugLog("Getting dataUrl for hostname \"" + hostname + "\" using provider \"" + provider + "\".");
        testDataUrl(PROXY_URL + faviconUrl, function (dataUrl) { return dataUrl !== FaviconProviderDefault[provider]; }, function (dataUrl) {
            debugLog("Found dataUrl for hostname \"" + hostname + "\" using provider \"" + provider + "\"!");
            addBackgroundImageRule(stylesheet, hostname, dataUrl);
            onComplete();
        }, function (dataUrl) {
            debugLog("Didn't find dataUrl for hostname \"" + hostname + "\" using provider \"" + provider + "\".");
            inner(providerIndex + 1);
        });
    };
    inner(0);
}
function getFaviconUrl(hostname, provider) {
    if (provider === FaviconProvider.GOOGLE) {
        return "https://www.google.com/s2/favicons?domain=" + hostname;
    }
    else if (provider === FaviconProvider.YANDEX) {
        return "https://favicon.yandex.net/favicon/" + hostname;
    }
    else if (provider === FaviconProvider.DUCKDUCKGO) {
        return "https://icons.duckduckgo.com/ip3/" + hostname + ".ico";
    }
    return null;
}
function toDataUrl(imageUrl, callback, outputFormat) {
    if (callback === void 0) { callback = function (dataUrl) { }; }
    if (outputFormat === void 0) { outputFormat = 'image/png'; }
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.height = img.naturalHeight;
        canvas.width = img.naturalWidth;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
    };
    img.src = imageUrl;
    if (img.complete || img.complete === undefined) {
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
        img.src = imageUrl;
    }
}
initialize();
//# sourceMappingURL=faviconLinks.js.map