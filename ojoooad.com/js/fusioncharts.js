/*
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>

 @version 3.6.0

 @attributions (infers respective third-party copyrights)
 Raphael 2.1.0 (modified as 'Red Raphael') <http://raphaeljs.com/license.html>
 JSON v2 <http://www.JSON.org/js.html>
 Firebug Lite 1.3.0 <http://getfirebug.com/firebuglite>
 */
(function () {
    if (!window.FusionCharts || !window.FusionCharts.version) {
        var d = window, m = d.document, D = d.navigator, v = {window: d}, p = v.modules = {}, c = v.interpreters = {}, K = Object.prototype.toString, b = /msie/i.test(D.userAgent) && !d.opera, G = /loaded|complete/, a = !1, l = function () {
            var a = v.ready;
            v.ready = !0;
            v.raiseEvent && (v.readyNotified = !0, v.raiseEvent("ready", {version: v.core.version, now: !a}, v.core));
            v.readyNow = !a
        }, P = function (a, c) {
            var b, e;
            if (c instanceof Array)for (b = 0; b < c.length; b += 1)"object" !== typeof c[b] ? a[b] = c[b] : ("object" !== typeof a[b] && (a[b] = c[b]instanceof Array ? [] : {}), P(a[b], c[b])); else for (b in c)"object" === typeof c[b] ? (e = K.call(c[b]), "[object Object]" === e ? ("object" !== typeof a[b] && (a[b] = {}), P(a[b], c[b])) : "[object Array]" === e ? (a[b]instanceof Array || (a[b] = []), P(a[b], c[b])) : a[b] = c[b]) : a[b] = c[b];
            return a
        };
        v.extend = function (a, c, b, e) {
            var h;
            b && a.prototype && (a = a.prototype);
            if (!0 === e)P(a, c); else for (h in c)a[h] = c[h];
            return a
        };
        v.uniqueId = function () {
            return "chartobject-" + (v.uniqueId.lastId += 1)
        };
        v.uniqueId.lastId = 0;
        v.policies =
        {
            options: {
                chartTypeSourcePath: ["typeSourcePath", ""],
                product: ["product", "v3"],
                insertMode: ["insertMode", "replace"],
                safeMode: ["safeMode", !0],
                overlayButton: ["overlayButton", void 0],
                containerBackgroundColor: ["containerBackgroundColor", "#ffffff"],
                containerBackgroundOpacity: ["containerBackgroundOpacity", 1],
                containerClassName: ["containerClassName", "fusioncharts-container"],
                chartType: ["type", void 0],
                baseChartMessageFont: ["baseChartMessageFont", "Verdana,sans"],
                baseChartMessageFontSize: ["baseChartMessageFontSize",
                    "10"],
                baseChartMessageColor: ["baseChartMessageColor", "#666666"],
                dataLoadStartMessage: ["dataLoadStartMessage", "Retrieving data. Please wait."],
                dataLoadErrorMessage: ["dataLoadErrorMessage", "Error in loading data."],
                dataInvalidMessage: ["dataInvalidMessage", "Invalid data."],
                dataEmptyMessage: ["dataEmptyMessage", "No data to display."],
                typeNotSupportedMessage: ["typeNotSupportedMessage", "Chart type not supported."],
                loadMessage: ["loadMessage", "Loading chart. Please wait."],
                renderErrorMessage: ["renderErrorMessage",
                    "Unable to render chart."]
            },
            attributes: {lang: ["lang", "EN"], id: ["id", void 0]},
            width: ["width", "400"],
            height: ["height", "300"],
            src: ["swfUrl", ""]
        };
        c.stat = "swfUrl id width height debugMode registerWithJS backgroundColor scaleMode lang detectFlashVersion autoInstallRedirect".split(" ");
        v.parsePolicies = function (a, c, b) {
            var e, h, n;
            for (h in c)if (v.policies[h]instanceof Array)n = b[c[h][0]], a[h] = void 0 === n ? c[h][1] : n; else for (e in"object" !== typeof a[h] && (a[h] = {}), c[h])n = b[c[h][e][0]], a[h][e] = void 0 === n ? c[h][e][1] :
                n
        };
        v.parseCommands = function (a, b, g) {
            var e, h;
            "string" === typeof b && (b = c[b] || []);
            e = 0;
            for (h = b.length; e < h; e++)a[b[e]] = g[e];
            return a
        };
        v.registrars = {
            module: function () {
                return v.core.apply(v.core, arguments)
            }
        };
        v.core = function (a) {
            if (!(this instanceof v.core)) {
                if (1 === arguments.length && a instanceof Array && "private" === a[0]) {
                    if (p[a[1]])return;
                    p[a[1]] = {};
                    a[3]instanceof Array && (v.core.version[a[1]] = a[3]);
                    return "function" === typeof a[2] ? a[2].call(v, p[a[1]]) : v
                }
                if (1 === arguments.length && "string" === typeof a)return v.core.items[a];
                v.raiseError && v.raiseError(this, "25081840", "run", "", new SyntaxError('Use the "new" keyword while creating a new FusionCharts object'))
            }
            var b = {};
            this.__state = {};
            1 === arguments.length && "object" === typeof arguments[0] ? b = arguments[0] : v.parseCommands(b, c.stat, arguments);
            1 < arguments.length && "object" === typeof arguments[arguments.length - 1] && (delete b[c.stat[arguments.length - 1]], v.extend(b, arguments[arguments.length - 1]));
            this.id = "undefined" === typeof b.id ? this.id = v.uniqueId() : b.id;
            this.args = b;
            v.core.items[this.id]instanceof
            v.core && v.raiseWarning(this, "06091847", "param", "", Error('A FusionChart oject with the specified id "' + this.id + '" already exists. Renaming it to ' + (this.id = v.uniqueId())));
            v.parsePolicies(this, v.policies, b);
            this.attributes.id = this.id;
            this.resizeTo && this.resizeTo(b.width, b.height, !0);
            this.chartType && this.chartType(b.type || b.swfUrl, !0);
            v.raiseEvent("beforeInitialize", b, this);
            v.core.items[this.id] = this;
            v.core.defaultOptions = v.core.options;
            v.raiseEvent("initialized", b, this);
            return this
        };
        v.core.prototype =
        {};
        v.core.prototype.constructor = v.core;
        v.extend(v.core, {
            id: "FusionCharts",
            version: ["3", "6", "0"],
            items: {},
            options: {},
            getObjectReference: function (a) {
                return v.core.items[a].ref
            },
            register: function (a) {
                return v.registrars[a = a && a.toString && a.toString().toLowerCase()] && v.registrars[a].apply(v.core, Array.prototype.slice.call(arguments, 1))
            }
        });
        d.FusionCharts = v.core;
        d.FusionMaps && d.FusionMaps.legacy && (v.core(["private", "modules.core.geo", d.FusionMaps.legacy, d.FusionMaps.version]), a = !0);
        G.test(m.readyState) ||
        m.loaded ? (v.ready = !0, setTimeout(l, 1)) : function () {
            function c() {
                arguments.callee.done || (arguments.callee.done = !0, g && clearTimeout(g), a || (d.FusionMaps && d.FusionMaps.legacy && v.core(["private", "modules.core.geo", d.FusionMaps.legacy, d.FusionMaps.version]), d.FusionMaps = v.core), setTimeout(l, 1))
            }

            function z() {
                G.test(m.readyState) ? c() : g = setTimeout(z, 10)
            }

            var g, e;
            m.addEventListener ? m.addEventListener("DOMContentLoaded", c, !1) : m.attachEvent && d.attachEvent("onLoad", c);
            if (b)try {
                "https:" === d.location.protocol ? m.write('<script id="__ie_onload_fusioncharts" defer="defer" src="//:">\x3c/script>') :
                    m.write('<script id="__ie_onload_fusioncharts" defer="defer" src="javascript:void(0)">\x3c/script>'), e = m.getElementById("__ie_onload_fusioncharts"), e.onreadystatechange = function () {
                    "complete" == this.readyState && c()
                }
            } catch (h) {
            }
            /WebKit/i.test(D.userAgent) && (g = setTimeout(z, 10));
            d.onload = function (a) {
                return function () {
                    c();
                    a && a.call && a.call(d)
                }
            }(d.onload)
        }();
        d.FusionMaps = v.core
    }
})();
FusionCharts.register("module", ["private", "modules.mantle.errormanager", function () {
    var d = this, m = d.window, D = {
        type: "TypeException",
        range: "ValueRangeException",
        impl: "NotImplementedException",
        param: "ParameterException",
        run: "RuntimeException",
        comp: "DesignTimeError",
        undefined: "UnspecifiedException"
    }, v = function (c, p, b, G, a, l) {
        var P = "#" + p + " " + (c ? c.id : "unknown-source") + G + " " + l + " >> ";
        a instanceof Error ? (a.name = D[b], a.module = "FusionCharts" + G, a.level = l, a.message = P + a.message, P = a.message, m.setTimeout(function () {
            throw a;
        }, 0)) : P += a;
        p = {id: p, nature: D[b], source: "FusionCharts" + G, message: P};
        d.raiseEvent(l, p, c);
        if ("function" === typeof m["FC_" + l])m["FC_" + l](p)
    }, p;
    d.raiseError = function (c, d, b, p, a) {
        v(c, d, b, p, a, "Error")
    };
    d.raiseWarning = function (c, d, b, p, a) {
        v(c, d, b, p, a, "Warning")
    };
    p = {
        outputHelpers: {
            text: function (c, d) {
                p.outputTo("#" + c.eventId + " [" + (c.sender.id || c.sender).toString() + '] fired "' + c.eventType + '" event. ' + ("error" === c.eventType || "warning" === c.eventType ? d.message : ""))
            }, event: function (c, d) {
                this.outputTo(c, d)
            }, verbose: function (c,
                                  d) {
                p.outputTo(c.eventId, c.sender.id, c.eventType, d)
            }
        }, outputHandler: function (c, m) {
            "function" !== typeof p.outputTo ? d.core["debugger"].outputFailed = !0 : (d.core["debugger"].outputFailed = !1, p.currentOutputHelper(c, m))
        }, currentOutputHelper: void 0, outputTo: void 0, enabled: !1
    };
    p.currentOutputHelper = p.outputHelpers.text;
    d.extend(d.core, {
        "debugger": {
            syncStateWithCharts: !0, outputFormat: function (c) {
                return c && "function" === typeof c.toLowerCase && "function" === typeof p.outputHelpers[c = c.toLowerCase()] ? (p.currentOutputHelper =
                    p.outputHelpers[c], !0) : !1
            }, outputTo: function (c) {
                "function" === typeof c ? p.outputTo = c : null === c && (d.core["debugger"].enable(!1), delete p.outputTo)
            }, enable: function (c, m, b) {
                var G;
                "object" === typeof c && 1 === arguments.length && (G = c, c = G.state, m = G.outputTo, b = G.outputFormat);
                "function" === typeof c && ("string" !== typeof m || 2 !== arguments.length && !G || (b = m), m = c, c = !0);
                if ("boolean" === typeof c && c !== p.enabled)d.core[(p.enabled = c) ? "addEventListener" : "removeEventListener"]("*", p.outputHandler);
                "function" === typeof m && (p.outputTo =
                    m);
                d.core["debugger"].outputFormat(b);
                return p.enabled
            }, enableFirebugLite: function () {
                var c;
                m.console && m.console.firebug ? d.core["debugger"].enable(m.console.log, "verbose") : ((c = m.document.getElementsByTagName("html")) && c[0].setAttribute("debug", "true"), d.loadScript("https://getfirebug.com/firebug-lite.js#overrideConsole=false,startOpened=true", function () {
                    d.core["debugger"].enable(m.console.log, "verbose")
                }, "{ startOpened: true }", !0, !0))
            }
        }, debugMode: {
            enabled: function () {
                m.setTimeout(function () {
                    throw Error("Deprecated! Please use FusionCharts.debugger.enable instead.");
                }, 0);
                return d.core["debugger"].enable.apply(d.core["debugger"], arguments)
            }
        }
    }, !1)
}]);
FusionCharts.register("module", ["private", "modules.mantle.eventmanager", function () {
    var d = this, m = d.window, D = d.core, v = m.Object.prototype.toString, p = v.call([]), c = function (a, c, b, g) {
        try {
            a[0].call(c, b, g || {})
        } catch (e) {
            setTimeout(function () {
                throw e;
            }, 0)
        }
    }, K = function (a, b, z) {
        if (a instanceof Array)for (var g = 0, e; g < a.length; g += 1) {
            if (a[g][1] === b.sender || void 0 === a[g][1])e = a[g][1] === b.sender ? b.sender : d.core, c(a[g], e, b, z), !0 === b.detached && (a.splice(g, 1), g -= 1, b.detached = !1);
            if (!0 === b.cancelled)break
        }
    }, b = {
        unpropagator: function () {
            return !1 ===
            (this.cancelled = !0)
        }, detacher: function () {
            return !1 === (this.detached = !0)
        }, undefaulter: function () {
            return !1 === (this.prevented = !0)
        }, listeners: {}, lastEventId: 0, addListener: function (a, c, z) {
            var g, e;
            if (v.call(a) === p) {
                g = [];
                for (e = 0; e < a.length; e += 1)g.push(b.addListener(a[e], c, z));
                return g
            }
            if ("string" !== typeof a)d.raiseError(z || d.core, "03091549", "param", "::EventTarget.addListener", Error("Unspecified Event Type")); else if ("function" !== typeof c)d.raiseError(z || d.core, "03091550", "param", "::EventTarget.addListener",
                Error("Invalid Event Listener")); else return a = a.toLowerCase(), b.listeners[a]instanceof Array || (b.listeners[a] = []), b.listeners[a].push([c, z]), c
        }, removeListener: function (a, c, z) {
            var g;
            if ("function" !== typeof c)d.raiseError(z || d.core, "03091560", "param", "::EventTarget.removeListener", Error("Invalid Event Listener")); else if (a instanceof Array)for (g = 0; g < a.length; g += 1)b.removeListener(a[g], c, z); else if ("string" !== typeof a)d.raiseError(z || d.core, "03091559", "param", "::EventTarget.removeListener", Error("Unspecified Event Type"));
            else if (a = a.toLowerCase(), a = b.listeners[a], a instanceof Array)for (g = 0; g < a.length; g += 1)a[g][0] === c && a[g][1] === z && (a.splice(g, 1), g -= 1)
        }, triggerEvent: function (a, c, z, g, e, h) {
            if ("string" !== typeof a)d.raiseError(c, "03091602", "param", "::EventTarget.dispatchEvent", Error("Invalid Event Type")); else {
                a = a.toLowerCase();
                var n = {
                    eventType: a,
                    eventId: b.lastEventId += 1,
                    sender: c || Error("Orphan Event"),
                    cancelled: !1,
                    stopPropagation: this.unpropagator,
                    prevented: !1,
                    preventDefault: this.undefaulter,
                    detached: !1,
                    detachHandler: this.detacher
                };
                K(b.listeners[a], n, z);
                K(b.listeners["*"], n, z);
                switch (n.prevented) {
                    case !0:
                        if ("function" === typeof h)try {
                            h.call(g || c || m, n, z || {})
                        } catch (M) {
                            setTimeout(function () {
                                throw M;
                            }, 0)
                        }
                        break;
                    default:
                        if ("function" === typeof e)try {
                            e.call(g || c || m, n, z || {})
                        } catch (l) {
                            setTimeout(function () {
                                throw l;
                            }, 0)
                        }
                }
                return !0
            }
        }
    }, G = d.raiseEvent = function (a, c, z, g, e, h) {
        return b.triggerEvent(a, z, c, g, e, h)
    }, a = d.legacyEventList = {}, l = {};
    d.disposeEvents = function (a) {
        var c, z;
        for (c in b.listeners)for (z = 0; z < b.listeners[c].length; z += 1)b.listeners[c][z][1] ===
        a && b.listeners[c].splice(z, 1)
    };
    d.raiseEventWithLegacy = function (c, b, z, g, e, h, n) {
        var d = a[c];
        G(c, b, z, e, h, n);
        d && "function" === typeof m[d] && setTimeout(function () {
            m[d].apply(e || m, g)
        }, 0)
    };
    d.raiseEventGroup = function (a, c, b, g, e, h, n) {
        var d = g.id, H = a + d;
        l[H] ? (clearTimeout(l[H]), delete l[H]) : d && H ? l[H] = setTimeout(function () {
            G(c, b, g, e, h, n);
            delete l[H]
        }, 0) : G(c, b, g, e, h, n)
    };
    d.addEventListener = function (a, c) {
        return b.addListener(a, c)
    };
    d.removeEventListener = function (a, c) {
        return b.removeListener(a, c)
    };
    d.extend(D, {
        addEventListener: function (a,
                                    c) {
            return b.addListener(a, c)
        }, removeEventListener: function (a, c) {
            return b.removeListener(a, c)
        }, ready: function (a, c, b) {
            d.ready ? (D.ready = function (a, e) {
                "function" === typeof a && setTimeout(function () {
                    a.call(e || D, c || D)
                }, 0)
            }, D.ready(a, b)) : "function" === typeof a && D.addEventListener("ready", function () {
                D.ready(a, c, b)
            });
            return this
        }
    });
    D.on = D.addEventListener;
    d.extend(D.prototype, {
        addEventListener: function (a, c) {
            return b.addListener(a, c, this)
        }, removeEventListener: function (a, c) {
            return b.removeListener(a, c, this)
        }
    });
    D.prototype.on = D.prototype.addEventListener;
    d.policies.options.events = ["events", {}];
    d.addEventListener("beforeInitialize", function (a) {
        a = a.sender;
        var c = a.options.events, b;
        if (c)for (b in c)"function" === typeof c[b] && a.addEventListener(b, c[b])
    });
    d.ready && !d.readyNotified && (d.readyNotified = !0, d.raiseEvent("ready", {
        version: d.core.version,
        now: d.readyNow
    }, d.core))
}]);
FusionCharts.register("module", ["private", "modules.mantle.ajax", function () {
    var d = this, m = d.window, D = parseFloat(m.navigator.appVersion.split("MSIE")[1]), v = 5.5 <= D && 7 >= D ? !0 : !1, p = "file:" === m.location.protocol, c = m.ActiveXObject, K = (!c || !p) && m.XMLHttpRequest, b = {
        objects: 0,
        xhr: 0,
        requests: 0,
        success: 0,
        failure: 0,
        idle: 0
    }, G = function () {
        var a;
        if (K)return G = function () {
            b.xhr++;
            return new K
        }, G();
        try {
            a = new c("Msxml2.XMLHTTP"), G = function () {
                b.xhr++;
                return new c("Msxml2.XMLHTTP")
            }
        } catch (d) {
            try {
                a = new c("Microsoft.XMLHTTP"),
                    G = function () {
                        b.xhr++;
                        return new c("Microsoft.XMLHTTP")
                    }
            } catch (p) {
                a = !1
            }
        }
        return a
    };
    d.core.ajax = {
        stats: function (a) {
            return a ? b[a] : d.extend({}, b)
        },
        headers: {
            "If-Modified-Since": "Sat, 29 Oct 1994 19:43:31 GMT",
            "X-Requested-With": "XMLHttpRequest",
            "X-Requested-By": "FusionCharts",
            Accept: "text/plain, */*",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    };
    D = d.ajax = function (a, c) {
        this.onSuccess = a;
        this.onError = c;
        this.open = !1;
        b.objects++;
        b.idle++
    };
    d.extend(D.prototype, {
        headers: d.core.ajax.headers,
        transact: function (a, c, P, N) {
            var z = this, g = z.xmlhttp, e = z.headers, h = z.onError, n = z.onSuccess;
            a = "POST" === a;
            var M, H;
            if (!g || v)g = G(), z.xmlhttp = g;
            g.onreadystatechange = function () {
                try {
                    4 === g.readyState && (!g.status && p || 200 <= g.status && 300 > g.status || 304 === g.status || 1223 === g.status || 0 === g.status ? (n && n(g.responseText, z, N, c), b.success++) : h && (h(Error("XmlHttprequest Error"), z, N, c), b.failure++), b.idle--, z.open = !1)
                } catch (a) {
                    h && h(a, z, N, c), m.FC_DEV_ENVIRONMENT && setTimeout(function () {
                        throw a;
                    }, 0), b.failure++
                }
            };
            try {
                g.open(a ?
                    "POST" : "GET", c, !0);
                g.overrideMimeType && g.overrideMimeType("text/plain");
                if (a)if ("string" === typeof P)M = P; else {
                    M = [];
                    for (H in P)M.push(H + "=" + (P[H] + "").replace(/\=/g, "%3D").replace(/\&/g, "%26"));
                    M = M.join("&")
                } else M = null;
                for (H in e)g.setRequestHeader(H, e[H]);
                g.send(M);
                b.requests++;
                b.idle++;
                z.open = !0
            } catch (q) {
                d.raiseError(d.core, "1110111515A", "run", "XmlHttprequest Error", q.message)
            }
            return g
        }, get: function (a, c) {
            return this.transact("GET", a, void 0, c)
        }, post: function (a, c, b) {
            return this.transact("POST", a, c,
                b)
        }, abort: function () {
            var a = this.xmlhttp;
            this.open = !1;
            return a && "function" === typeof a.abort && a.readyState && 0 !== a.readyState && a.abort()
        }, dispose: function () {
            this.open && this.abort();
            delete this.onError;
            delete this.onSuccess;
            delete this.xmlhttp;
            delete this.open;
            b.objects--;
            return null
        }
    })
}]);
FusionCharts.register("module", ["private", "modules.mantle.runtime;1.1", function () {
    var d = this, m = d.window, D = /(^|[\/\\])(fusioncharts\.js)([\?#].*)?$/ig, v = /[\\\"<>;&]/, p = /^[^\S]*?(sf|f|ht)(tp|tps):\/\//i, c = {}, K = {}, b = {}, G = {}, a = d.purgeDOM = function (c) {
        var b = c.attributes, g, e;
        if (b)for (g = b.length - 1; 0 <= g; g -= 1)e = b[g].name, "function" === typeof c[e] && (c[e] = null);
        if (b = c.childNodes)for (b = b.length, g = 0; g < b; g += 1)a(c.childNodes[g])
    }, l = function (a, c, b) {
        var e, h;
        for (e in a)if (a[e]instanceof Array)c[a[e][0]] = b[e]; else for (h in a[e])c[a[e][h][0]] =
            b[e][h]
    }, P = /^(FusionCharts|FusionWidgets|FusionMaps)/;
    d.getScriptBaseUri = function (a) {
        var c = m.document.getElementsByTagName("script"), b = c.length, e, h;
        for (h = 0; h < b; h += 1)if (e = c[h].getAttribute("src"), void 0 !== e && null !== e && null !== e.match(a))return e.replace(a, "$1")
    };
    d.core.options.scriptBaseUri = function () {
        var a = d.getScriptBaseUri(D);
        return void 0 === a ? (d.raiseError(FusionCharts, "1603111624", "run", ">GenericRuntime~scriptBaseUri", "Unable to locate FusionCharts script source location (URL)."), "") : a
    }();
    d.isXSSSafe =
        function (a, c) {
            return c && null !== p.exec(a) ? !1 : null === v.exec(a)
        };
    d.xssEncode = function (a) {
        return null === a || void 0 === a || "function" !== typeof a.toString ? "" : a = a.toString().replace(/&/g, "&amp;").replace(/\'/g, "&#39;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    };
    d.loadScript = function (a, z, g, e, h) {
        if (!a)return !1;
        var n = z && z.success || z, M = z && z.failure, l, q = {type: "script", success: !1}, J = function () {
            G[l] = clearTimeout(G[l]);
            q.success ? n && n(a, l) : M && M(a, l);
            d.raiseEvent("externalresourceload", q, d.core)
        };
        h = h ? "" : d.core.options.scriptBaseUri;
        l = h + a;
        d.isXSSSafe(l, !1) || (l = "function" === typeof m.encodeURIComponent ? m.encodeURIComponent(l) : m.escape(l));
        q.path = h;
        q.src = l;
        q.file = a;
        if (!0 === b[l] && e)return q.success = !0, q.notReloaded = !0, "function" === typeof z && (z(), d.raiseEvent("externalresourceload", q, d.core)), !0;
        if (c[l] && e)return !1;
        c[l] = !0;
        K[l] && K[l].parentNode && K[l].parentNode.removeChild(K[l]);
        z = K[l] = m.document.createElement("script");
        z.type = "text/javascript";
        z.src = l;
        g && (z["\v" === "v" ? "text" : "innerHTML"] = g);
        "function" === typeof n && (b[l] = !1, G[l] = clearTimeout(G[l]), z.onload = function () {
            b[l] = !0;
            q.success = !0;
            J()
        }, z.onerror = function () {
            b[l] = !1;
            c[l] = !1;
            J()
        }, z.onreadystatechange = function () {
            if ("complete" === this.readyState || "loaded" === this.readyState)b[l] = !0, q.success = !0, J()
        });
        m.document.getElementsByTagName("head")[0].appendChild(z);
        "function" === typeof M && (G[l] = setTimeout(function () {
            b[l] || J()
        }, d.core.options.html5ResourceLoadTimeout || 15E3));
        return !0
    };
    d.capitalizeString = function (a, c) {
        return a ? a.replace(c ? /(^|\s)([a-z])/g : /(^|\s)([a-z])/,
            function (a, c, b) {
                return c + b.toUpperCase()
            }) : a
    };
    d.extend(d.core, {
        clone: function (a, c) {
            var b = typeof a, e, h = d.extend({}, this.args, !1, !1);
            l(d.policies, h, this);
            l(d.renderer.getRendererPolicy(this.options.renderer), h, this);
            delete h.id;
            delete h.animate;
            delete h.stallLoad;
            e = h.link;
            h = d.extend({}, h, !1, !1);
            h.link = e;
            switch (b) {
                case "object":
                    d.extend(h, a);
                    break;
                case "boolean":
                    c = a
            }
            return c ? h : new d.core(h)
        }, isActive: function () {
            if (!this.ref || m.document.getElementById(this.id) !== this.ref)return !1;
            try {
                return P.test(this.ref.signature())
            } catch (a) {
                return !1
            }
        },
        chartType: function (a, c) {
            var b = this.src, e = !0 === c, h = this.options, n;
            "string" === typeof a && (c = "object" === typeof c ? c : {}, b = a.replace(/[\?\#][\s\S]*$/g, ""), n = null !== b.match(/\.swf\s*?$/ig), b = b.replace(/\.swf\s*?$/ig, ""), h.chartType = b.replace(/^[\s\S]*\//ig, "").replace(/^fcmap_/i, ""), h.chartTypeSourcePath = -1 === b.indexOf("/") ? c.chartTypeSourcePath || this.options.chartTypeSourcePath || d.core.options.chartTypeSourcePath || "" : b.replace(/[^\/]*?$/ig, ""), this.src = ((d.core.options.scriptBaseUri || "") + (h.chartTypeSourcePath ||
            d.core.options.chartTypeSourcePath || "")).replace(/\/\s*$/g, "") + "/" + h.chartType.replace(/\.swf\s*?$/ig, "") + ".swf", n && (d.raiseWarning(this, "08101320181", "comp", "FusionCharts#chartType", 'Chart type has ".swf" in alias and as such has been deprecated. Please use chart type alias.'), h.chartTypeSourcePath = d.core.options.chartTypeSourcePath || ""), void 0 !== c.dataSource && null !== c.dataSource ? this.setChartData(c.dataSource, c.dataFormat, c.dataConfiguration) : this.isActive() && !e && this.render());
            return (h.chartType ||
            "").toLowerCase()
        }
    }, !0);
    m.getChartFromId = function (a) {
        d.raiseWarning(this, "11133001041", "comp", "GenericRuntime~getObjectFromId()", 'Use of deprecated getChartFromId() or getMapFromId(). Replace with "FusionCharts()" or FusionCharts.items[].');
        return d.core.items[a]instanceof d.core ? d.core.items[a].ref : m.swfobject && m.swfobject.getObjectById(a)
    };
    m.getMapFromId = m.getChartFromId
}]);
FusionCharts.register("module", ["private", "api.printmanager", function () {
    var d = this;
    d.extend(d.core, {
        printManager: {
            configure: function () {
                d.raiseWarning(d.core, "28141714", "impl", ".printManager.configure", "PrintManager is deprecated")
            }, isReady: function () {
                d.raiseWarning(d.core, "28141714", "impl", ".printManager.isReady", "PrintManager is deprecated");
                return !1
            }, enabled: function () {
                d.raiseWarning(d.core, "28141714", "impl", ".printManager.enabled", "PrintManager is deprecated");
                return !1
            }, managedPrint: function () {
                d.raiseWarning(d.core,
                    "28141714", "impl", ".printManager.managedPrint", "PrintManager is deprecated")
            }
        }
    }, !1)
}]);
FusionCharts.register("module", ["private", "modules.interface.renderer", function () {
    var d = this, m = d.window, D = m.document, v = function () {
        d.raiseError(this, "25081845", "run", "::RendererManager", Error("No active renderer"))
    }, p = d.FusionChartsDOMInsertModes = {
        REPLACE: "replace",
        APPEND: "append",
        PREPEND: "prepend"
    }, c = {
        undefined: {
            render: v,
            remove: v,
            update: v,
            resize: v,
            config: v,
            policies: {}
        }
    }, K = {}, b = function (a) {
        return function () {
            var c = this.ref;
            if (void 0 === c || null === c || "function" !== typeof c[a])d.raiseError(this, "25081617",
                "run", "#" + a + "()", "ExternalInterface call failed. Check whether chart has been rendered."); else return c[a].apply(c, arguments)
        }
    }, G = function (a, c) {
        return "function" === typeof a[c] ? function () {
            return a[c].apply(a, arguments)
        } : a[c]
    }, a = function (a, c) {
        var b = D.getElementById(a), e = c.id || c.getAttribute("id"), h, n;
        if (null === b)return !1;
        if (a === e)return !0;
        e = c.getElementsByTagName("*");
        h = 0;
        for (n = e.length; h < n; h++)if (e[h] === b)return !1;
        return !0
    }, l = /[^\%\d]*$/ig, P;
    d.policies.options.containerElementId = ["renderAt", void 0];
    d.policies.options.renderer = ["renderer", void 0];
    d.normalizeCSSDimension = function (a, c, b) {
        a = void 0 === a ? b.offsetWidth || parseFloat(b.style.width) : a;
        c = void 0 === c ? b.offsetHeight || parseFloat(b.style.height) : c;
        var e = {}, h = b.style, n;
        h.width = a = a.toString ? a.toString() : "0";
        h.height = c = c.toString ? c.toString() : "0";
        if ((e.widthIsRelative = a.match(/^\s*\d*\.?\d*\%\s*$/) && !a.match(/^\s*0\%\s*$/)) && 0 === b.offsetWidth)for (n = b; n = n.offsetParent;)if (0 < n.offsetWidth) {
            a = (n.offsetWidth * parseFloat(a.match(/\d*/)[0]) / 100).toString();
            break
        }
        if ((e.heightIsRelative = c.match(/^\s*\d*\.?\d*\%\s*$/) && !c.match(/^\s*0\%\s*$/)) && 20 >= b.offsetHeight)for (n = b; n = n.offsetParent;)if (0 < n.offsetHeight) {
            c = (n.offsetHeight * parseFloat(c.match(/\d*/)[0]) / 100).toString();
            break
        }
        e.width = a.replace ? a.replace(/^\s*(\d*\.?\d*)\s*$/ig, "$1px") : a;
        e.height = c.replace ? c.replace(/^\s*(\d*\.?\d*)\s*$/ig, "$1px") : c;
        h.width = e.width;
        h.height = e.height;
        e.pixelWidth = e.widthIsRelative ? b.offsetWidth : parseInt(e.width, 10) || 0;
        e.pixelHeight = e.heightIsRelative ? b.offsetHeight : parseInt(e.height,
            10) || 0;
        return e
    };
    P = d.renderer = {
        register: function (a, b) {
            if (!a || "function" !== typeof a.toString)throw Error("#03091436 ~renderer.register() Invalid value for renderer name.");
            a = a.toString().toLowerCase();
            if (void 0 !== c[a])return d.raiseError(d.core, "03091438", "param", "::RendererManager>register", 'Duplicate renderer name specified in "name"'), !1;
            c[a] = b;
            return !0
        },
        userSetDefault: !1,
        setDefault: function (a) {
            if (!a || "function" !== typeof a.toString)return d.raiseError(d.core, "25081731", "param", "::RendererManager>setDefault",
                'Invalid renderer name specified in "name"'), !1;
            if (void 0 === c[a = a.toString().toLowerCase()])return d.raiseError(d.core, "25081733", "range", "::RendererManager>setDefault", "The specified renderer does not exist."), !1;
            this.userSetDefault = !1;
            d.policies.options.renderer = ["renderer", a];
            return !0
        },
        notifyRender: function (a) {
            var c = d.core.items[a && a.id];
            c && (!1 !== a.success || a.silent) || d.raiseError(d.core.items[a.id], "25081850", "run", "::RendererManager", Error("There was an error rendering the chart. Enable FusionCharts JS debugger for more information."));
            if (c.ref = a.ref)a.ref.FusionCharts = d.core.items[a.id];
            d.raiseEvent("internal.DOMElementCreated", {}, c)
        },
        protectedMethods: {
            options: !0,
            attributes: !0,
            src: !0,
            ref: !0,
            constructor: !0,
            signature: !0,
            link: !0,
            addEventListener: !0,
            removeEventListener: !0
        },
        getRenderer: function (a) {
            return c[a]
        },
        getRendererPolicy: function (a) {
            a = c[a].policies;
            return "object" === typeof a ? a : {}
        },
        currentRendererName: function () {
            return d.policies.options.renderer[1]
        },
        update: function (a) {
            K[a.id].update.apply(a, Array.prototype.slice.call(arguments,
                1))
        },
        render: function (a) {
            K[a.id].render.apply(a, Array.prototype.slice.call(arguments, 1))
        },
        remove: function (a) {
            K[a.id].remove.apply(a, Array.prototype.slice.call(arguments, 1))
        },
        resize: function (a) {
            K[a.id].resize.apply(a, Array.prototype.slice.call(arguments, 1))
        },
        config: function (a) {
            K[a.id].config.apply(a, Array.prototype.slice.call(arguments, 1))
        },
        dispose: function (a) {
            K[a.id].dispose.apply(a, Array.prototype.slice.call(arguments, 1))
        }
    };
    d.addEventListener("beforeInitialize", function (a) {
        a = a.sender;
        var b = a.options.renderer.toLowerCase(),
            g;
        "string" === typeof a.options.renderer && void 0 === c[b] && (a.options.renderer = d.policies.options.renderer[1]);
        a.options.renderer = b;
        K[a.id] = c[a.options.renderer];
        !0 !== K[a.id].initialized && "function" === typeof K[a.id].init && (K[a.id].init(), K[a.id].initialized = !0);
        d.parsePolicies(a, K[a.id].policies || {}, a.args);
        for (g in K[a.id].prototype)a[g] = K[a.id].prototype[g];
        for (g in K[a.id].events)a.addEventListener(g, K[a.id].events[g])
    });
    d.addEventListener(["rendered", "dataloaderror", "nodatatodisplay", "rendercancelled"],
        function (a, c) {
            var b = a.sender;
            b instanceof d.core && b.__state.rendering && (d.raiseEvent("internal.rendered", c, b), delete b.__state.rendering)
        });
    d.addEventListener("loaded", function (a) {
        var c = a.sender;
        a = a.sender.ref;
        var g, e;
        if (void 0 !== a && null !== a && "function" === typeof a.getExternalInterfaceMethods) {
            try {
                g = a.getExternalInterfaceMethods(), g = "string" === typeof g ? g.split(",") : []
            } catch (h) {
                g = [], d.raiseError(c, "13111126041", "run", "RendererManager^Loaded", Error("Error while retrieving data from the chart-object." +
                (h.message && 0 <= h.message.indexOf("NPObject") ? " Possible cross-domain security restriction." : "")))
            }
            for (a = 0; a < g.length; a += 1)e = g[a], void 0 === c[e] && (c[e] = b(e));
            if (c.ref)for (e in g = P.protectedMethods, a = P.getRenderer(c.options.renderer).protectedMethods, c)if (a && !g[e] && !a[e] && void 0 === c.ref[e])try {
                c.ref[e] = G(c, e)
            } catch (n) {
            }
        }
    });
    d.legacyEventList.resized = "FC_Resized";
    d.extend(d.core.prototype, {
        render: function (c, b, g) {
            var e = this, h, n, l;
            if ((l = m[this.id]) && l.FusionCharts && l.FusionCharts === this || (l = this.ref) && l.FusionCharts &&
                l.FusionCharts === this)d.renderer.dispose(this), l === m[this.id] && (m[this.id] = void 0);
            void 0 !== m[this.id] && d.raiseError(this, "25081843", "comp", ".render", Error("#25081843:IECompatibility() Chart Id is same as a JavaScript variable name. Variable naming error. Please use unique name forchart JS variable, chart-id and container id."));
            g ? "function" !== typeof g && (g = void 0) : "function" === typeof b ? (g = b, b = void 0) : b || "function" !== typeof c || (g = c, c = void 0);
            b = (b || this.options.insertMode).toLowerCase() || p.REPLACE;
            void 0 === c && (c = this.options.containerElementId);
            "string" === typeof c && (c = D.getElementById(c));
            if (void 0 === c || null === c)return d.raiseError(this, "03091456", "run", ".render()", Error("Unable to find the container DOM element.")), this;
            if (a(this.id, c))return d.raiseError(this, "05102109", "run", ".render()", Error("A duplicate object already exists with the specific Id: " + this.id)), this;
            h = D.createElement(this.options.containerElementType || "span");
            h.setAttribute("id", this.id);
            if ("append" !== b && "prepend" !== b)for (; c.hasChildNodes();)c.removeChild(c.firstChild);
            "prepend" === b && c.firstChild ? c.insertBefore(h, c.firstChild) : c.appendChild(h);
            this.options.containerElement = c;
            this.options.containerElementId = c.id;
            if (b = h.style)b.position = "relative", b.textAlign = "left", b.lineHeight = "normal", b.display = "inline-block", b.zoom = "1", b.fontWeight = "normal", b.fontVariant = "normal", b.fontStyle = "normal", b.textDecoration = "none", b["*DISPLAY"] = "inline", b.padding = "0", b.margin = "0", b.border = "none";
            this.options.containerClassName && (h.className = this.options.containerClassName);
            b = d.normalizeCSSDimension(this.width,
                this.height, h);
            this.__state.renderedWidth = b.pixelWidth;
            this.__state.renderedHeight = b.pixelHeight;
            this.__state.rendering = !0;
            d.raiseEvent("beforeRender", n = {
                container: c,
                width: this.width,
                height: this.height,
                renderer: this.options.renderer
            }, this, void 0, function (a, c) {
                d.renderer.render(e, h, function () {
                    d.renderer.notifyRender.apply(this, arguments);
                    if (g)try {
                        g.call(a.sender, c.container)
                    } catch (b) {
                        setTimeout(function () {
                            throw b;
                        })
                    }
                })
            }, function () {
                d.raiseEvent("renderCancelled", n, e)
            });
            return this
        }, remove: function () {
            d.renderer.remove(this);
            return this
        }, resizeTo: function (a, c, b) {
            var e = this, h = e.width, n = e.height, M = e.__state;
            "object" === typeof a && (b = c, c = a.h, a = a.w);
            a = null === a || void 0 === a ? h : a.toString().replace(l, "");
            c = null === c || void 0 === c ? n : c.toString().replace(l, "");
            !0 !== b ? d.raiseEvent("beforeresize", {
                currentWidth: h,
                currentHeight: n,
                newWidth: a,
                newHeight: c
            }, e, void 0, function () {
                e.width = a;
                e.height = c;
                d.renderer.resize(e, {width: a, height: c});
                d.raiseEventWithLegacy("resized", {
                    width: e.width,
                    height: e.height,
                    prevWidth: h,
                    prevHeight: n,
                    pixelWidth: e.ref &&
                    e.ref.offsetWidth || 0,
                    pixelHeight: e.ref && e.ref.offsetHeight || 0,
                    originalWidth: M.renderedWidth,
                    originalHeight: M.renderedHeight
                }, e, [e.id, e.width, e.height])
            }, function () {
                d.raiseEvent("resizecancelled", {
                    currentWidth: h,
                    currentHeight: n,
                    cancelledTargetWidth: a,
                    cancelledTargetHeight: c
                }, e)
            }) : (e.width = a, e.height = c);
            return this
        }, dispose: function () {
            var a = this, c = {};
            d.raiseEvent("beforeDispose", c, a, void 0, function () {
                d.renderer.dispose(a);
                d.raiseEvent("disposed", c, a);
                d.disposeEvents(a);
                delete d.core.items[a.id];
                for (var b in a)a.hasOwnProperty(b) && delete a[b];
                a.disposed = !0
            }, function () {
                d.raiseEvent("disposeCancelled", c, a)
            })
        }, configure: function (a, c) {
            var b;
            a && ("string" === typeof a ? (b = {}, b[a] = c) : b = a, d.renderer.config(this, b))
        }
    });
    d.extend(d.core, {
        setCurrentRenderer: function () {
            var a = P.setDefault.apply(P, arguments);
            P.userSetDefault = !0;
            return a
        }, getCurrentRenderer: function () {
            return P.currentRendererName.apply(P, arguments)
        }, render: function (a, c) {
            return a instanceof d.core ? (a.render(c), a) : (new d.core(a)).render(c)
        }
    }, !1)
}]);
FusionCharts.register("module", ["private", "modules.interface.transcoder", function () {
    var d = this, m = d.window, D = d.transcoders = {}, v = {}, p = {}, c = /url$/i, K = d._interactiveCharts = {
        selectscatter: [!0, !1],
        dragcolumn2d: [!0, !0],
        dragarea: [!0, !0],
        dragline: [!0, !0],
        dragnode: [!0, !0]
    }, b = function (c, b, n, g) {
        var z = n.obj;
        n = n.args;
        n.dataSource = c;
        n.xmlHttpRequestObject = b;
        n.source = "XmlHttpRequest";
        n.url = g;
        d.raiseEvent("dataLoadRequestCompleted", n, z, void 0, a, l)
    }, G = function (a, c, b) {
        var g = b.obj;
        b = b.args;
        b.error = a;
        b.httpStatus = c.xhr &&
        c.xhr.status ? c.xhr.status : -1;
        b.xmlHttpRequestObject = c;
        d.raiseEvent("dataLoadError", b, g);
        "function" === typeof m.FC_DataLoadError && m.FC_DataLoadError(g.id, b)
    }, a = function (a, c) {
        a.sender.setChartData(c.dataSource, c.dataFormat, c.config, c.successcallback, c.silent)
    }, l = function (a, c) {
        d.raiseEvent("dataLoadCancelled", c, a.sender);
        c.xmlHttpRequestObject.abort()
    }, P = function (a, c) {
        var n = a.sender, g = n.__state, l = c.url;
        n.options.dataSource = c.url;
        g.dhmXhrObj || (g.dhmXhrObj = new d.ajax(b, G));
        g.dhmXhrObj.get("function" === typeof m.decodeURIComponent ? m.decodeURIComponent(l) : m.unescape(l), {
            obj: n,
            args: c
        })
    }, N = function (a, c) {
        var b = a.sender, g = b.__state;
        d.raiseEvent("dataLoadRequestCancelled", c, b);
        g && g.dhmXhrObj && g.dhmXhrObj.abort()
    }, z = function (a, c) {
        var b = a.sender, g = b.__state, l = b.id;
        v[l] = c;
        p[l] && delete p[l];
        p[l] = {};
        g.dataReady = void 0;
        g.dataAvailable = !0;
        !0 !== c.silent && (!0 !== b.options.safeMode || !0 !== g.rendering || b.isActive() ? (delete g.args, d.renderer.update(b, c)) : (g.updatePending = c, d.raiseWarning(b, "23091255", "run", "::DataHandler~update",
            "Renderer update was postponed due to async loading.")));
        d.raiseEvent("dataUpdated", c, b, void 0, c.successcallback)
    }, g = function (a, c) {
        d.raiseEvent("dataUpdateCancelled", c, a.sender, void 0, c.failurecallback)
    };
    d.dataFormats = {};
    d.policies.options.dataSource = ["dataSource", void 0];
    d.policies.options.dataFormat = ["dataFormat", void 0];
    d.policies.options.dataConfiguration = ["dataConfiguration", void 0];
    d.policies.options.showDataLoadingMessage = ["showDataLoadingMessage", !1];
    d.addDataHandler = function (a, c) {
        if ("string" !== typeof a || void 0 !== D[a.toLowerCase()])d.raiseError(d.core, "03091606", "param", "::DataManager.addDataHandler", Error("Invalid Data Handler Name")); else {
            var b = {}, g = a.toLowerCase();
            D[g] = c;
            c.name = a;
            b["set" + a + "Data"] = function (c, b, h) {
                return this.setChartData(c, a, b, h)
            };
            c.transportable && (b["set" + a + "Url"] = function (c, b, h) {
                return this.setChartDataUrl(c, a, b, h)
            }, d.dataFormats[a + "URL"] = g + "Url");
            b["get" + a + "Data"] = function () {
                return this.getChartData(a)
            };
            d.dataFormats[a] = g;
            d.extend(d.core, b, !0)
        }
    };
    d.extend(d.core.prototype,
        {
            setChartDataUrl: function (a, b, n, g, l) {
                if (void 0 === b || null === b || "function" !== typeof b.toString)b = this.options.dataFormat, d.raiseWarning(this, "03091609", "param", "FusionCharts#setChartDataUrl", "Invalid Data Format. Reverting to current data format - " + b);
                b = b.toString().toLowerCase();
                b = c.test(b) ? b.slice(0, -3) : b;
                d.raiseEvent("dataLoadRequested", {
                    source: "XmlHttpRequest",
                    url: a,
                    dataFormat: b,
                    silent: !!l,
                    config: n,
                    successcallback: g
                }, this, void 0, P, N)
            }, setChartData: function (a, b, n, l, p) {
            var q = this.options, J, w;
            if (void 0 ===
                b || null === b || "function" !== typeof b.toString)b = q.dataFormat, d.raiseWarning(this, "03091610", "param", "FusionCharts#setChartData", "Invalid Data Format. Reverting to current data format - " + b);
            b = b.toString().toLowerCase();
            c.test(b) ? this.setChartDataUrl(a, b, n, l, p) : (q.dataSource = a, J = b, q.dataFormat = b, w = D[J], "undefined" === typeof w ? d.raiseError(d.core, "03091611", "param", "FusionCharts#setChartData", Error("Data Format not recognized")) : (b = (b = d.renderer && d.renderer.getRenderer(q.renderer || d.renderer.currentRendererName())) &&
            b.dataFormat, n = b === J ? w.passthrough ? w.passthrough(a, n) : {data: a} : w.encode(a, this, n || q.dataConfiguration) || {}, n["native"] = b === J, n.format = n["native"] ? b : "xml", n.dataFormat = J, n.dataSource = a, n.silent = !!p, "function" === typeof l && (n.successcallback = l), d.raiseEvent("beforeDataUpdate", n, this, void 0, z, g)))
        }, getChartData: function (a, c) {
            var b = this.options, g = this.id, l;
            if (void 0 === a || "function" !== typeof a.toString || void 0 === (l = D[a = a.toString().toLowerCase()]))d.raiseError(this, "25081543", "param", "::transcoder~getChartData()",
                Error('Unrecognized data-format specified in "format"')); else return p[g][a] ? b = p[g][a] : v[g] ? (a === v[g].format ? p[g][a] = v[g] : (p[g].xml || (p[g].xml = "xml" === v[g].format ? v[g] : D[v[g].format].encode(v[g].data, this, b.dataConfiguration)), p[g][a] || (p[g][a] = l.decode(p[g].xml.data, this, b.dataConfiguration))), b = p[g][a]) : b = {error: Error("Data not defined")}, !0 === Boolean(c) ? b : b.data
        }, dataReady: function (a) {
            return a ? this.__state.dataAvailable : this.__state.dataReady
        }
        });
    d.extend(d.core, {
        transcodeData: function (a, c, b, g,
                                 l) {
            if (c && "function" === typeof c.toString && b && "function" === typeof b.toString && void 0 !== D[b = b.toString().toLowerCase()] && void 0 !== D[c = c.toString().toLowerCase()])return a = D[c].encode(a, this, l), b = D[b].decode(a.data, this, l), b.error instanceof Error || (b.error = a.error), g ? b : b.data;
            d.raiseError(this, "14090217", "param", ".transcodeData()", Error("Unrecognized data-format specified during transcoding."))
        }
    }, !1);
    d.getRenderer && !d.getRenderer("flash") || d.addEventListener("DataLoadRequested", function (a) {
        var c = a.sender;
        c.options && "flash" === c.options.renderer && c.options.useLegacyXMLTransport && a.preventDefault()
    });
    d.addEventListener("beforeInitialize", function (a) {
        a = a.sender;
        var b = a.options, g = b.dataSource, l = d.renderer && d.renderer.getRenderer(b.renderer);
        delete v[a.id];
        p[a.id] = {};
        if (void 0 !== g && null !== g) {
            a.__state.dataSetDuringConstruction = !0;
            if ("string" !== typeof b.dataFormat)switch (typeof g) {
                case "function":
                    g = b.dataSource = g.call(a, b.dataConfiguration);
                    b.dataFormat = "JSON";
                    break;
                case "string":
                    b.dataFormat = /^\s*?\{[\s\S]*\}\s*?$/g.test(a.options.dataFormat) ?
                        "JSON" : "XML";
                    break;
                case "object":
                    b.dataFormat = "JSON"
            }
            b.dataFormat && b.dataFormat.toString && (a.__state.dataFetchDuringConstruction = c.test(b.dataFormat.toString()));
            a.setChartData(g, b.dataFormat, void 0, void 0, !0)
        } else l && (a.__state.dataSetDuringConstruction = !1, d.raiseWarning(a, "1810131922A", "param", ":dataHandler~event:beforeInitialize", "Data source was not defined during construction, hence set to blank renderer default - " + l.dataFormat), a.setChartData("", l.dataFormat, void 0, void 0, !0), a.__state.dataAvailable = !1)
    });
    d.addEventListener("beforeDispose", function (a) {
        var c = a.sender;
        delete v[a.sender.id];
        delete p[a.sender.id];
        c && c.__state && c.__state.dhmXhrObj && c.__state.dhmXhrObj.abort()
    });
    d.addEventListener("disposed", function (a) {
        delete p[a.sender.id]
    });
    d.addEventListener("loaded", function (a) {
        a = a.sender;
        var c = a.__state.updatePending;
        a instanceof d.core && void 0 !== c && (delete a.__state.updatePending, d.renderer.update(a, c))
    });
    d.addEventListener("dataUpdated", function (a, c) {
        var b = a.sender, g = b.__state;
        g.rendering &&
        (g.dataFetchDuringConstruction || g.updatePending) && (delete g.dataFetchDuringConstruction, delete g.updatePending, d.renderer.update(b, c))
    });
    d.addEventListener(["dataLoadError", "dataInvalid"], function (a) {
        a.sender.__state.dataAvailable = !1
    });
    d.addEventListener("loaded", function (a) {
        a = a.sender;
        var c = a.__state, b, g, l;
        l = function (a, c) {
            return function (b) {
                return !1 === b ? c.apply(this) : this.ref.getUpdatedXMLData ? d.core.transcodeData(this.ref.getUpdatedXMLData(), "xml", a) : this.getData ? this.getData(a) : c.apply(this)
            }
        };
        if (a.chartType && K[a.chartType()] && K[a.chartType()][0]) {
            for (b in d.transcoders)g = d.transcoders[b].name, g = "get" + g + "Data", a[g] = l(b, a.constructor.prototype[g]), a[g]._dynamicdatarouter = !0;
            c.dynamicDataRoutingEnabled = !0
        } else if (c.dynamicDataRoutingEnabled) {
            for (b in d.transcoders)g = d.transcoders[b].name, g = "get" + g + "Data", a.hasOwnProperty(g) && a[g]._dynamicdatarouter && delete a[g];
            c.dynamicDataRoutingEnabled = !1
        }
    })
}]);
"object" !== typeof JSON && (JSON = {});
(function () {
    function d(a) {
        return 10 > a ? "0" + a : a
    }

    function m(a) {
        p.lastIndex = 0;
        return p.test(a) ? '"' + a.replace(p, function (a) {
            var c = b[a];
            return "string" === typeof c ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }

    function D(a, b) {
        var d, p, z, g, e = c, h, n = b[a];
        n && "object" === typeof n && "function" === typeof n.toJSON && (n = n.toJSON(a));
        "function" === typeof G && (n = G.call(b, a, n));
        switch (typeof n) {
            case "string":
                return m(n);
            case "number":
                return isFinite(n) ? String(n) : "null";
            case "boolean":
            case "null":
                return String(n);
            case "object":
                if (!n)return "null";
                c += K;
                h = [];
                if ("[object Array]" === Object.prototype.toString.apply(n)) {
                    g = n.length;
                    for (d = 0; d < g; d += 1)h[d] = D(d, n) || "null";
                    z = 0 === h.length ? "[]" : c ? "[\n" + c + h.join(",\n" + c) + "\n" + e + "]" : "[" + h.join(",") + "]";
                    c = e;
                    return z
                }
                if (G && "object" === typeof G)for (g = G.length, d = 0; d < g; d += 1)"string" === typeof G[d] && (p = G[d], (z = D(p, n)) && h.push(m(p) + (c ? ": " : ":") + z)); else for (p in n)Object.prototype.hasOwnProperty.call(n, p) && (z = D(p, n)) && h.push(m(p) + (c ? ": " : ":") + z);
                z = 0 === h.length ? "{}" : c ? "{\n" + c + h.join(",\n" +
                c) + "\n" + e + "}" : "{" + h.join(",") + "}";
                c = e;
                return z
        }
    }

    "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + d(this.getUTCMonth() + 1) + "-" + d(this.getUTCDate()) + "T" + d(this.getUTCHours()) + ":" + d(this.getUTCMinutes()) + ":" + d(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
        return this.valueOf()
    });
    var v = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        p = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, c, K, b = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, G;
    "function" !== typeof JSON.stringify && (JSON.stringify = function (a, b, d) {
        var p;
        K = c = "";
        if ("number" === typeof d)for (p = 0; p < d; p += 1)K += " "; else"string" === typeof d && (K = d);
        if ((G = b) && "function" !== typeof b && ("object" !== typeof b || "number" !== typeof b.length))throw Error("JSON.stringify");
        return D("", {"": a})
    });
    "function" !== typeof JSON.parse && (JSON.parse = function (a, c) {
        function b(a, g) {
            var e, d, n = a[g];
            if (n && "object" === typeof n)for (e in n)Object.prototype.hasOwnProperty.call(n, e) && (d = b(n, e), void 0 !== d ? n[e] = d : delete n[e]);
            return c.call(a, g, n)
        }

        var d;
        a = String(a);
        v.lastIndex = 0;
        v.test(a) && (a = a.replace(v, function (a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return d = eval("(" + a + ")"), "function" === typeof c ? b({"": d}, "") : d;
        throw new SyntaxError("JSON.parse");
    })
})();
FusionCharts.register("module", ["private", "modules.data.json", function () {
    var d = this, m = d.window, D = m.document, v = d.xssEncode, p, c;
    void 0 === m.JSON && d.raiseError(this, "1113062012", "run", "JSONDataHandler", Error("Could not find library support for JSON parsing."));
    d.policies.options.allowIESafeXMLParsing = ["_allowIESafeXMLParsing", !0];
    p = function () {
        var c = {
                set: !0,
                trendlines: !0,
                vtrendlines: !0,
                line: {trendlines: !0, vtrendlines: !0},
                data: !0,
                dataset: !0,
                lineset: !0,
                categories: !0,
                category: !0,
                linkeddata: !0,
                application: !0,
                definition: !0,
                axis: !0,
                connectors: !0,
                connector: {connectors: !0},
                trendset: !0,
                row: {rows: !0},
                column: {columns: !0},
                label: {labels: !0},
                color: {colorrange: !0},
                dial: {dials: !0},
                pointer: {pointers: !0},
                point: {trendpoints: !0},
                process: {processes: !0},
                task: {tasks: !0},
                milestone: {milestones: !0},
                datacolumn: {datatable: !0},
                text: {datacolumn: !0},
                item: {legend: !0},
                alert: {alerts: !0},
                groups: {annotations: !0},
                items: {groups: !0, data: !0},
                shapes: !0,
                shape: {shapes: !0},
                entitydef: !0,
                entity: {entitydef: !0}
            }, b = {
                chart: "linkedchart",
                map: "linkedmap",
                set: "data",
                vline: {chart: "data", graph: "data", dataset: "data", categories: "category", linkedchart: "data"},
                apply: {application: "application"},
                style: {definition: "definition"},
                marker: {application: "application", definition: "definition", data: "items"},
                entity: {entitydef: "entitydef", data: "data"},
                shape: {shapes: "shapes"},
                connector: {
                    connectors: {
                        chart: "connector",
                        linkedchart: "connector",
                        map: "connectors",
                        linkedmap: "connectors"
                    }
                },
                annotationgroup: {annotations: "groups"},
                annotation: {groups: "items"}
            }, p = {vline: {vline: "true"}},
            a = {chart: !0, map: !0, graph: !0}, l = {dataset: "data", categories: "category"}, P = {
                target: "target",
                value: "value"
            }, N = {
                styles: {definition: !0, application: !0},
                chart: {value: !0, target: !0},
                graph: {value: !0, target: !0},
                linkedchart: {value: !0, target: !0},
                markers: {definition: !0, application: !0, shapes: !0, connectors: !0, data: !0},
                map: {entitydef: !0, data: !0},
                linkedmap: {entitydef: !0, data: !0}
            }, z, g;
        z = {
            append: function (a, b, g, d) {
                !c[g] || !0 !== c[g] && !0 !== c[g][d] ? b[g] = a : (b[g]instanceof Array || (b[g] = []), b[g].push(a))
            }, child: function (c, g,
                                n, M) {
                var H, q, J, w, m, s;
                for (H = 0; H < g.length; H += 1)switch (J = g[H], q = J.nodeName.toLowerCase(), J.nodeType) {
                    case 1:
                        w = z.attr(J.attributes);
                        s = a[q];
                        !0 === s && (m = w, w = {}, w[q] = m);
                        s = p[q];
                        "object" === typeof s && d.extend(w, s);
                        if (s = b[q])if ("object" === typeof s && "object" === typeof s[n])for (m in m = void 0, s[n]) {
                            if (M[m]) {
                                q = s[n][m];
                                break
                            }
                        } else"object" === typeof s && "string" === typeof s[n] ? q = s[n] : "string" === typeof s && (q = s);
                        J.childNodes.length && ((s = N[n]) && s[q] ? z.child(c, J.childNodes, q, M) : z.child(w, J.childNodes, q, M));
                        (s = N[n]) && s[q] ||
                        z.append(w, c, q, n);
                        break;
                    case 3:
                        if (s = P[n])q = s, w = J.data, z.append(w, c, q, n);
                        s = l[n];
                        "string" === typeof s && M.chart && parseInt(M.chart.compactdatamode, 10) && (q = s, w = J.data, c[q] = c[q] ? c[q] + w : w)
                }
            }, attr: function (a) {
                var c, b = {};
                if (!a || !a.length)return b;
                for (c = 0; c < a.length; c += 1)b[a[c].nodeName.toLowerCase()] = a[c].value || a[c].nodeValue;
                return b
            }
        };
        g = function (a) {
            var c = {}, b, l, p, q, J, w, P, s, G;
            if ("object" !== typeof a && a && "function" !== typeof a.toString)return g.errorObject = new TypeError("xml2json.parse()"), c;
            a = a.toString().replace(/<\!--[\s\S]*?--\x3e/g,
                "").replace(/<\?xml[\s\S]*?\?>/ig, "").replace(/&(?!([^;\n\r]+?;))/g, "&amp;$1");
            a = a.replace(/^\s\s*/, "");
            for (var N = /\s/, v = a.length; N.test(a.charAt(v -= 1)););
            a = a.slice(0, v + 1);
            if (!a)return c;
            try {
                m.DOMParser ? b = (new m.DOMParser).parseFromString(a, "text/xml") : D.body && d.core.options.allowIESafeXMLParsing ? (l = D.createElement("xml"), l.innerHTML = a, D.body.appendChild(l), b = l.XMLDocument, D.body.removeChild(l)) : (b = new m.ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a));
                if (!(b && b.childNodes && 1 === b.childNodes.length &&
                    (p = b.childNodes[0]) && p.nodeName && (q = p.nodeName.toLowerCase())) || "chart" !== q && "map" !== q && "graph" !== q)return g.errorObject = new TypeError("xml2json.parse()"), c;
                if ("graph" === q) {
                    J = b.createElement("chart");
                    for (G = (P = p.attributes) && P.length || 0; G--;)J.setAttribute(P[G].name, P[G].value), P.removeNamedItem(P[G].name);
                    if (G = (s = p.childNodes) && s.length || 0)G -= 1, w = p.removeChild(s[G]), J.appendChild(w);
                    for (; G--;)w = p.removeChild(s[G]), J.insertBefore(w, J.firstChild);
                    b.replaceChild(J, p);
                    p = J
                }
            } catch (K) {
                g.errorObject = K
            }
            p ?
                (p.attributes && (c[q] = z.attr(p.attributes)), p.childNodes && z.child(c, p.childNodes, q, c), delete g.errorObject) : g.errorObject = new TypeError("xml2json.parse()");
            return c
        };
        return function (a) {
            delete g.errorObject;
            return {data: g(a), error: g.errorObject}
        }
    }();
    c = function () {
        var c, b;
        c = {
            items: {
                explode: {data: "set", groups: {annotations: "annotationgroup"}, items: {groups: "annotation"}},
                text: {chart: {target: "target", value: "value"}, graph: {target: "target", value: "value"}},
                dsv: {dataset: {data: "dataset"}, categories: {category: "categories"}},
                attr: {
                    chart: {chart: "chart"},
                    graph: {graph: "graph"},
                    map: {map: "map"},
                    linkedmap: {map: "map"},
                    linkedchart: {chart: "chart"}
                },
                group: {
                    styles: {definition: "style", application: "apply"},
                    map: {data: "entity", entitydef: "entity"},
                    markers: {
                        definition: "marker",
                        application: "marker",
                        shapes: "shape",
                        connectors: "connector",
                        items: "marker"
                    }
                },
                tag: {markers: {items: "data"}}
            }, qualify: function (c, a, b) {
                return "object" === typeof this.items[c][b] ? this.items[c][b][a] : this.items[c][b]
            }
        };
        b = function (d, a, l, p) {
            var m = "", z = "", g = "", e = "", h, n, M;
            a &&
            "function" === typeof a.toLowerCase && (a = a.toLowerCase());
            if (void 0 === l && d[a])for (h in d[a])n = h.toLowerCase(), "compactdatamode" === n && (p.applyDSV = 1 == d[a][h]);
            if (d instanceof Array)for (h = 0; h < d.length; h += 1)g = "string" === typeof d[h] ? g + v(d[h]) : g + b(d[h], a, l, p); else {
                for (h in d)n = h.toLowerCase(), d[h]instanceof Array && (M = c.qualify("group", n, a)) ? (g = c.qualify("tag", n, a) || n, z += "<" + g + ">" + b(d[h], M, a, p) + "</" + g + ">") : "object" === typeof d[h] ? (M = c.qualify("attr", n, a)) ? (e = b(d[h], M, a, p).replace(/\s*\/\>/ig, ""), a = n) : z += b(d[h],
                    n, a, p) : p.applyDSV && (M = c.qualify("dsv", n, a)) ? z += d[h] : (M = c.qualify("text", n, a)) ? (g = c.qualify("tag", n, a) || M, z += "<" + g + ">" + d[h] + "</" + g + ">") : "vline" === n && Boolean(d[h]) ? a = "vline" : m += " " + n + '="' + v(d[h]).toString().replace(/\"/ig, "&quot;") + '"';
                if (M = c.qualify("explode", l, a))a = M;
                g = a;
                g = ("" !== e ? e : "<" + g) + m + ("" !== z ? ">" + z + "</" + g + ">" : " />")
            }
            return g
        };
        return function (c) {
            delete b.errorObject;
            if (c && "string" === typeof c)try {
                c = JSON.parse(c)
            } catch (a) {
                b.errorObject = a
            }
            return {
                data: b(c, c && c.graph ? "graph" : c && c.map ? "map" : "chart",
                    void 0, {}), error: b.errorObject
            }
        }
    }();
    d.addDataHandler("JSON", {
        encode: c, decode: p, passthrough: function (c) {
            var b = {data: {}};
            if (!c)return b;
            if ("string" !== typeof c)try {
                c = JSON.stringify(c)
            } catch (d) {
                return b.error = d, b
            }
            try {
                b.data = JSON.parse(c.replace(/"([^"]+)":/g, function (a, c) {
                    return '"' + c.toLowerCase() + '":'
                }))
            } catch (a) {
                b.error = a
            }
            return b
        }, transportable: !0
    })
}]);
FusionCharts.register("module", ["private", "modules.data.xml", function () {
    var d = function (d) {
        return {data: d, error: void 0}
    };
    this.addDataHandler("XML", {encode: d, decode: d, transportable: !0})
}]);
FusionCharts.register("module", ["private", "modules.data.csv", function () {
    var d = this, m = d.window, D = d.core, v = m.parseInt, p = m.parseFloat, c = function (c) {
        return c
    }, K;
    K = function (c) {
        this.data = [];
        this.columnCount = this.rowCount = 0;
        this.configure(c)
    };
    K.decodeLiterals = function (c, d) {
        return void 0 !== c && null !== c && c.toString ? c.replace("{tab}", "\t").replace("{quot}", '"').replace("{apos}", "'") : d
    };
    K.prototype.set = function (c, d, a) {
        var l;
        if (this.rowCount <= c) {
            for (l = this.rowCount; l <= c; l += 1)this.data[l] = [];
            this.rowCount = c + 1
        }
        this.columnCount <=
        d && (this.columnCount = d + 1);
        this.data[c][d] = a
    };
    K.prototype.setRow = function (c, d) {
        var a;
        if (this.rowCount <= c) {
            for (a = this.rowCount; a <= c; a += 1)this.data[a] = [];
            this.rowCount = c + 1
        }
        this.columnCount < d.length && (this.columnCount = d.length);
        this.data[c] = d
    };
    K.prototype.get = function (c, d) {
        var a = this.data;
        return a[c] && a[c][d]
    };
    K.prototype.configure = function (c) {
        var d = K.decodeLiterals;
        this.delimiter = d(c.delimiter, ",");
        this.qualifier = d(c.qualifier, '"');
        this.eolCharacter = d(c.eolCharacter, "\r\n");
        this.numberFormatted = !!v(c.numberFormatted,
            0)
    };
    K.prototype.clear = function () {
        this.data = [];
        this.columnCount = this.rowCount = 0
    };
    K.prototype.toString = function () {
        var c, d, a = "";
        for (c = 0; c < this.rowCount; c += 1)d = this.qualifier + this.data[c].join(this.qualifier + this.delimiter + this.qualifier) + this.qualifier, a += '""' === d ? this.eolCharacter : d + this.eolCharacter;
        0 < this.rowCount && (a = a.slice(0, a.length - 2));
        return a
    };
    d.addDataHandler("CSV", {
        encode: function (c, p) {
            d.raiseError(p, "0604111215", "run", "::CSVDataHandler.encode()", "FusionCharts CSV data-handler only supports encoding of data.");
            throw Error("FeatureNotSupportedException()");
        }, decode: function (b, d) {
            var a = D.transcodeData(b, "xml", "json") || {}, l = d.jsVars, m, v, z, g, e, h, n, M = a.chart || a.map || a.graph || {};
            n = Boolean(M.exporterrorcolumns || 0);
            var H = a.categories && a.categories[0] && a.categories[0].category || [], q = a.map && !a.chart || l && l.instanceAPI && "geo" === l.instanceAPI.defaultSeriesType, J = !1, w = !1, ja = !1, s = !1;
            v = !1;
            var $ = c, U = {}, ba, Ba, la, ga, ea, pa, Z, ma, L, I, fa;
            e = 0;
            m = new K({
                separator: M.exportdataseparator,
                qualifier: M.exportdataqualifier,
                numberFormatted: M.exportdataformattedval
            });
            D.formatNumber && m.numberFormatted && ($ = function (a) {
                return D.formatNumber(a, M)
            });
            if (q)for (I in U.geo = !0, H = l.hcObj && l.hcObj.entities && l.hcObj.entities.items || [], m.setRow(0, ["Id", " Short Name", "Long Name", "Value", "Formatted Value"]), l = 0, H)w = H[I], fa = w.eJSON, v = w.value, m.setRow(++l, [I, fa.shortLabel, fa.label, void 0 === v ? "" : v, w.formattedValue]); else if (void 0 !== (ba = a.dials && a.dials.dial || a.pointers && a.pointers.pointer || a.value))if (U.gauge = !0, "string" === typeof ba)m.set(0, 0, $(ba)), U.singlevalue = !0, "string" === typeof a.target && (m.set(0, 1, $(a.target)), U.bullet = !0); else for (m.setRow(0, ["Id", "Value"]), U.multivalue = !0, l = 0, h = 1, e = ba.length; l < e; l += 1, h += 1)m.setRow(h, [h, $(ba[l].value)]); else if (ba = a.dataset || !(a.data instanceof Array) && []) {
                U.multiseries = !0;
                z = 1;
                if (Ba = a.lineset)ba = ba.concat(Ba), U.lineset = !0;
                if (la = a.axis)ba = ba.concat(la), U.multiaxis = !0;
                pa = ba.length;
                ea = H.length;
                if (!(pa = ba.length)) {
                    for (l = 0; l < ea; l += 1)Z = H[l], m.set(l + 1, 0, Z.label || Z.name);
                    U.multilevel = !0
                }
                for (l = 0; l < pa; l += 1)for (ma = ba, ma[l].dataset ? (ma = ma[l].dataset,
                    g = 0, ga = ma.length) : (ma = ba, g = l, ga = g + 1); g < ga && !J && !ja; g += 1, z += 1) {
                    q = ma[g];
                    m.set(0, z, q.seriesname);
                    "string" === typeof q.data && (U.compactdata = !0, q.data = q.data.split(M.dataseparator || "|"));
                    h = e = 0;
                    for (L = q.data && q.data.length || 0; e < L || e < ea; e += 1) {
                        Z = H[e];
                        v = h + 1;
                        I = q.data && q.data[h] || {};
                        if (void 0 !== I.x && void 0 !== I.y) {
                            J = U.xy = !0;
                            break
                        }
                        if (void 0 !== I.open || void 0 !== I.high || void 0 !== I.close || void 0 !== I.low) {
                            s = U.ohlc = !0;
                            break
                        }
                        if (void 0 !== I.rowid && void 0 !== I.columnid) {
                            ja = U.heatmap = !0;
                            break
                        }
                        if (e < ea && !Z.vline) {
                            m.set(v, 0, Z.label ||
                            Z.name);
                            Z = p(I ? I.value : "");
                            Z = isNaN(Z) ? "" : $(Z);
                            m.set(v, z, Z);
                            if (w || n || I.errorvalue)w || m.set(0, z + 1, "Error"), fa = 1, m.set(v, z + 1, $(I.errorvalue));
                            h += 1
                        }
                    }
                    fa && (z += fa, fa = 0)
                }
                Ba && (ba = ba.slice(0, -Ba.length));
                la && (ba = ba.slice(0, -la.length))
            } else if (ba = a.data) {
                m.set(0, 1, M.yaxisname || "Value");
                U.singleseries = !0;
                v = "1" == M.showsumatend;
                l = 0;
                for (ea = ba.length; l < ea; l += 1)I = ba[l], I.vline || (Z = p(I.value ? I.value : ""), m.setRow(l + 1, [I.label || I.name, isNaN(Z) ? "" : (e += Z, $(Z))]));
                v && (U.summation = !0, m.setRow(l + 1, [M.sumlabel || "Total", $(e)]))
            }
            if (s)for (m.clear(),
                           m.setRow(0, ["Open", "Close", "High", "Low"]), l = 0, v = 1, ba = a.dataset, ga = ba.length; l < ga; l += 1)for (e = 0, q = ba[l] && ba[l].data || [], pa = q.length; e < pa; e += 1, v += 1)I = q[e] || {}, m.setRow(e + 1, [$(I.open), $(I.close), $(I.high), $(I.low)]); else if (J)for (m.clear(), w = !1, fa = 0, m.setRow(0, ["Series", "x", "y"]), l = 0, v = 1, ba = a.dataset, ga = ba.length; l < ga; l += 1)for (e = 0, q = ba[l] && ba[l].data || [], pa = q.length; e < pa; e += 1, v += 1) {
                I = q[e] || {};
                Z = [ba[l].seriesname, $(I.x), $(I.y)];
                void 0 !== I.z && (Z.push($(I.z)), fa || (m.set(0, 3, "z"), fa = 1));
                if (w || n || void 0 !==
                    I.errorvalue || void 0 !== I.horizontalerrorvalue || void 0 !== I.verticalerrorvalue)a = $(I.errorvalue), Z.push(I.errorvalue, void 0 === I.horizontalerrorvalue ? a : $(I.horizontalerrorvalue), void 0 === I.verticalerrorvalue ? a : $(I.verticalerrorvalue)), w || (m.set(0, fa + 3, "Error"), m.set(0, fa + 4, "Horizontal Error"), m.set(0, fa + 5, "Vertical Error")), w = U.error = !0;
                m.setRow(v, Z)
            } else if (ja) {
                m.clear();
                J = {};
                ja = {};
                l = 0;
                e = 1;
                H = a.rows && a.rows.row || [];
                for (n = H.length; l < n; l += 1, e += 1)Z = H[l], Z.id && (J[Z.id.toLowerCase()] = e, m.set(e, 0, Z.label ||
                Z.id));
                l = 0;
                e = 1;
                H = a.columns && a.columns.column || [];
                for (n = H.length; l < n; l += 1, e += 1)Z = H[l], Z.id && (ja[Z.id.toLowerCase()] = e, m.set(0, e, Z.label || Z.id));
                q = a.dataset && a.dataset[0] && a.dataset[0].data || [];
                l = 0;
                for (n = q.length; l < n; l += 1)I = q[l], v = I.rowid.toLowerCase(), z = I.columnid.toLowerCase(), J[v] || (J[v] = m.rowCount, m.set(m.rowCount, 0, I.rowid)), ja[z] || (ja[z] = m.columnCount, m.set(0, m.columnCount, I.columnid)), m.set(J[v], ja[z], $(I.value))
            }
            ba = H = Ba = la = null;
            0 < m.rowCount && void 0 === m.get(0, 0) && m.set(0, 0, M.xaxisname || "Label");
            return {data: m.toString(), error: void 0, predictedFormat: U}
        }, transportable: !1
    });
    D.addEventListener("Loaded", function (c) {
        c = c.sender;
        "javascript" !== c.options.renderer || c.getDataAsCSV || (c.getDataAsCSV = c.ref.getDataAsCSV = c.getCSVData)
    })
}]);
FusionCharts.register("module", ["private", "modules.renderer.js", function () {
    var d = this, m = d.window, D = m.document, v = d.core.options, p = /msie/i.test(m.navigator.userAgent) && !m.opera, c = Boolean(m.SVGAngle || D.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")), K = function () {
    }, b = d.hcLib = {cmdQueue: []}, G = b.moduleCmdQueue = {
        base: [],
        charts: [],
        powercharts: [],
        widgets: [],
        maps: []
    }, a = b.moduleDependencies = {}, l = b.moduleMeta = {
        base: "fusioncharts.js", charts: "fusioncharts.charts.js", powercharts: "fusioncharts.powercharts.js",
        widgets: "fusioncharts.widgets.js", maps: "fusioncharts.maps.js"
    }, P = {}, N = b.getMetaSentence = function () {
        var a = {};
        return function (c) {
            c = c && c.replace(/(^\s*)|(\s*$)/g, "") || "";
            return a[c] || (a[c] = {key: c, subject: c.replace(/[^\/]*?$/ig, ""), predicate: c.replace(/^.*\//ig, "")})
        }
    }(), z = b.getDependentModuleName = function (c) {
        var b = [], e, d;
        c = N(c).predicate;
        for (e in a)void 0 !== (d = a[e][c]) && (b[d] = e);
        return b
    }, g = b.hasModule = function (a) {
        var c, b;
        if (a instanceof Array) {
            c = 0;
            for (b = a.length; c < b; c += 1)if (!Boolean(d.modules["modules.renderer.js-" +
                N(a[c]).predicate]))return !1;
            return !0
        }
        return Boolean(d.modules["modules.renderer.js-" + N(a).predicate])
    }, e = b.loadModule = function (a, c, b, e) {
        a instanceof Array || (a = [a]);
        var h = a.length, n = 0, p;
        p = function () {
            if (n >= h)c && c(); else {
                var z = a[n], m = z && z.match(/[^\/]*$/i)[0], la = l[z];
                n += 1;
                if (z) {
                    if (g(m)) {
                        p();
                        return
                    }
                    if (P[m]) {
                        d.raiseError(e || d.core, "1112201445A", "run", "JavaScriptRenderer~loadModule() ", "required resources are absent or blocked from loading.");
                        b && b(m);
                        return
                    }
                } else b && b(m);
                z = d.core.options["html5" + d.capitalizeString(m) +
                "Src"];
                d.loadScript(void 0 === z ? la : z, {
                    success: function () {
                        g(m) ? p() : b && b(m)
                    }, failure: b && function () {
                        b(m)
                    }
                }, void 0, !0)
            }
        };
        p()
    }, h = b.executeWaitingCommands = function (a) {
        for (var c; c = a.shift();)"object" === typeof c && K[c.cmd].apply(c.obj, c.args)
    }, n = function (a) {
        delete a.sender.jsVars._reflowData;
        a.sender.jsVars._reflowData = {};
        delete a.sender.jsVars._reflowClean
    }, M = function () {
        var a = function () {
        };
        a.prototype = {
            LoadDataErrorText: "Error in loading data.",
            XMLLoadingText: "Retrieving data. Please wait",
            InvalidXMLText: "Invalid data.",
            ChartNoDataText: "No data to display.",
            ReadingDataText: "Reading data. Please wait",
            ChartNotSupported: "Chart type not supported.",
            PBarLoadingText: "",
            LoadingText: "Loading chart. Please wait",
            RenderChartErrorText: "Unable to render chart."
        };
        return a.prototype.constructor = a
    }(), H = b.getContainerBackgroundColor = function (a) {
        var e = a.options.containerBackgroundColor, d = a.options.containerBackgroundOpacity, g = a.jsVars.transparent;
        void 0 !== g && null !== g ? d = a.jsVars.transparent ? 0 : 1 : (d = parseFloat(d), 0 > d ? d = 0 : 1 < d && (d = 1));
        e || (e = "#ffffff");
        if (p && !c)return d ? e : "transparent";
        e = e.replace(/^#?([a-f0-9]+)/ig, "$1");
        e = b.graphics.HEXtoRGB(e);
        e[3] = d.toString();
        return "rgba(" + e.join(",") + ")"
    };
    b.injectModuleDependency = function (c, e, d) {
        var g = !1, h = N(c).subject;
        c = N(c).predicate;
        e = void 0 === e ? c : N(e).predicate;
        a[c] || (a[c] = {}, G[c] || (G[c] = [], b.moduleMeta[c] = h + v.html5ScriptNamePrefix + (e && e.replace && e.replace(/^[\s\S]*\//ig, "").replace(/\?/g, "%3F").replace(/\#/g, "%23").replace(/\:/g, "%3A") || "") + v.html5ScriptNameSuffix), g = !0);
        a[c][e] = d || 0;
        return g
    };
    b.needsModule = function (a, c) {
        a = N(a).predicate;
        c = N(c).predicate;
        return void 0 !== (b.moduleDependencies[a] && b.moduleDependencies[a][c])
    };
    b.cleanupWaitingCommands = function (a) {
        for (var c = a.chartType(), c = z(c), b, e = [], d; b = c.shift();) {
            for (b = G[b] || []; d = b.shift();)"object" === typeof d && d.obj !== a && e.push(d);
            b.concat(e);
            e = []
        }
    };
    d.extend(d.core.options, {html5ScriptNameSuffix: ".js", html5ScriptNamePrefix: "fusioncharts."});
    d.extend(K, {
        dataFormat: "json", ready: !1, policies: {
            jsVars: {}, options: {
                showChartLoadingMessage: ["showChartLoadingMessage",
                    !0]
            }
        }, init: function () {
            g("base") ? K.ready = !0 : e("base", function () {
                K.ready = !0;
                h(b.cmdQueue)
            }, void 0, d.core)
        }, render: function (a) {
            var c = a, e = this.jsVars.msgStore;
            c && this.options.showChartLoadingMessage && (c.innerHTML = '<small style="display: inline-block; *zoom:1; *display:inline; width: 100%; font-family: Verdana,sans; font-size: 10px; color: #666666; text-align: center; padding-top: ' + (parseInt(c.style.height, 10) / 2 - 5) + 'px">' + (e.PBarLoadingText || e.LoadingText) + "</small>", c.style.backgroundColor = H(this));
            b.cmdQueue.push({cmd: "render", obj: this, args: arguments})
        }, update: function () {
            b.cmdQueue.push({cmd: "update", obj: this, args: arguments})
        }, resize: function () {
            b.cmdQueue.push({cmd: "resize", obj: this, args: arguments})
        }, dispose: function () {
            var a = b.cmdQueue, c, e;
            c = 0;
            for (e = a.length; c < e; c += 1)a[c].obj === this && (a.splice(c, 1), e -= 1, c -= 1)
        }, load: function () {
            b.cmdQueue.push({cmd: "load", obj: this, args: arguments})
        }, config: function (a, c) {
            var b, e = this.jsVars, d = e.msgStore, e = e.cfgStore, g = this.options, h;
            h = {
                LoadingText: "loadMessage",
                ChartNotSupported: "typeNotSupportedMessage",
                RenderChartErrorText: "renderErrorMessage",
                XMLLoadingText: "dataLoadStartMessage",
                ChartNoDataText: "dataEmptyMessage",
                LoadDataErrorText: "dataLoadErrorMessage",
                InvalidXMLText: "dataInvalidMessage"
            };
            "string" === typeof a && 1 < arguments.length && (b = a, a = {}, a[b] = c);
            for (b in a)void 0 !== d[b] ? d[b] = a[b] : e[b.toLowerCase()] = a[b], h[b] && (g[h[b]] = a[b])
        }, protectedMethods: {}, events: {
            beforeInitialize: function (a) {
                var c = a.sender;
                a = c.jsVars;
                var e;
                a.fcObj = c;
                a.msgStore = a.msgStore || new M;
                a.cfgStore = a.cfgStore || {};
                a.previousDrawCount = -1;
                a.drawCount = 0;
                a._reflowData = {};
                c.addEventListener("beforeRender", function (a) {
                    a.sender.jsVars.smartLabel = new b.SmartLabelManager(c.id, D.body || D.getElementsByTagName("body")[0]);
                    a.detachHandler()
                });
                a.userModules instanceof Array || (e = a.userModules, a.userModules = [], "string" === typeof e && (a.userModules = a.userModules.concat(e.split(","))));
                b.chartAPI && b.chartAPI[void 0] || (a.needsLoaderCall = !0)
            }, initialized: function (a) {
                a = a.sender;
                var c = a.jsVars;
                c.needsLoaderCall &&
                (delete c.needsLoaderCall, K.load.call(a))
            }, beforeDataUpdate: n, beforeDispose: function (a) {
                var c = a.sender.jsVars;
                c.smartLabel && !c.smartLabel.disposed && c.smartLabel.dispose();
                n.apply(this, arguments)
            }, beforeRender: function (a) {
                var c = a.sender.jsVars;
                delete c.drLoadAttempted;
                delete c.waitingModule;
                delete c.waitingModuleError;
                n.apply(this, arguments)
            }, dataLoadRequested: function (a) {
                a = a.sender;
                var c = a.jsVars;
                delete c.loadError;
                a.ref && a.options.showDataLoadingMessage ? c.hcObj && !c.hasNativeMessage && c.hcObj.showLoading ?
                    c.hcObj.showMessage(c.msgStore.XMLLoadingText) : a.ref.showChartMessage ? a.ref.showChartMessage("XMLLoadingText") : c.stallLoad = !0 : c.stallLoad = !0
            }, dataLoadRequestCompleted: function (a) {
                delete a.sender.jsVars.stallLoad
            }, dataLoadError: function (a) {
                var c = a.sender, b = c.jsVars;
                delete b.stallLoad;
                b.loadError = !0;
                c.ref && "function" === typeof c.ref.showChartMessage && c.ref.showChartMessage("LoadDataErrorText");
                c.__state.dataFetchDuringConstruction && delete c.__state.dataFetchDuringConstruction;
                n.apply(this, arguments)
            }
        },
        _call: function (a, c, b) {
            a.apply(b || m, c || [])
        }
    });
    d.extend(K.prototype, {
        getSWFHTML: function () {
            d.raiseWarning(this, "11090611381", "run", "JavaScriptRenderer~getSWFHTML()", "getSWFHTML() is not supported for JavaScript charts.")
        }, addVariable: function () {
            d.raiseWarning(this, "11090611381", "run", "JavaScriptRenderer~addVariable()", 'Use of deprecated "addVariable()". Replace with "configure()".');
            d.core.prototype.configure.apply(this, arguments)
        }, getXML: function () {
            d.raiseWarning(this, "11171116291", "run", "JavaScriptRenderer~getXML()",
                'Use of deprecated "getXML()". Replace with "getXMLData()".');
            return this.getXMLData.apply(this, arguments)
        }, setDataXML: function () {
            d.raiseWarning(this, "11171116292", "run", "JavaScriptRenderer~setDataXML()", 'Use of deprecated "setDataXML()". Replace with "setXMLData()".');
            return this.setXMLData.apply(this, arguments)
        }, setDataURL: function () {
            d.raiseWarning(this, "11171116293", "run", "JavaScriptRenderer~setDataURL()", 'Use of deprecated "SetDataURL()". Replace with "setXMLUrl()".');
            return this.setXMLUrl.apply(this,
                arguments)
        }, hasRendered: function () {
            return !(!this.jsVars.hcObj || !this.jsVars.hcObj.hasRendered)
        }, setTransparent: function (a) {
            var c;
            if (c = this.jsVars)"boolean" !== typeof a && null !== a && (a = !0), c.transparent = null === a ? !1 : !0 === a ? !0 : !1
        }
    });
    d.extend(d.core, {
        _fallbackJSChartWhenNoFlash: function () {
            m.swfobject.hasFlashPlayerVersion(d.core.options.requiredFlashPlayerVersion) || d.renderer.setDefault("javascript")
        }, _enableJSChartsForSelectedBrowsers: function (a) {
            void 0 !== a && null !== a && d.renderer.setDefault((new RegExp(a)).test(m.navigator.userAgent) ?
                "javascript" : "flash")
        }, _doNotLoadExternalScript: function (a) {
            var c, b;
            for (c in a)b = c.toLowerCase(), l[b] && (P[b] = Boolean(a[c]))
        }, _preloadJSChartModule: function () {
            throw"NotImplemented()";
        }
    });
    d.renderer.register("javascript", K);
    c || p ? d.renderer.setDefault("javascript") : m.swfobject && m.swfobject.hasFlashPlayerVersion && !m.swfobject.hasFlashPlayerVersion(d.core.options.requiredFlashPlayerVersion) && (d.raiseWarning(d.core, "1204111846", "run", "JSRenderer", "Switched to JavaScript as default rendering due to absence of required Flash Player."),
        d.renderer.setDefault("javascript"))
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-lib", function () {
    var d = this, m = d.window, D = m.document, v = Boolean(m.SVGAngle || D.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")), p = /msie/i.test(m.navigator.userAgent) && !m.opera, c = m.parseFloat, K = /\s+/g, b = /^#?/, G = /^rgba/i, a = /[#\s]/ig, l = /\{br\}/ig, P = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i, N = Math.abs, z = Math.pow, g = Math.round, e = z(2, -24), h = Object.prototype.toString, n = void 0 !== D.documentElement.ontouchstart, M = "http://www.fusioncharts.com?BS=FCHSEvalMark&utm_source=FCS_trial&pver=" +
            m.escape(d.core.version), H = !/fusioncharts\.com$/i.test(m.location.hostname), q = Math, J = q.max, w = q.min, ja = {
            pageX: 0,
            pageY: 0
        }, s = d.hcLib || (d.hcLib = {}), $ = function (a) {
            var c = a.data, b = c.chart, k = b.paper, e = a.state, t = L(ma(a.originalEvent)), d = t.target || t.originalTarget || t.srcElement || t.relatedTarget || t.fromElement, g = b.elements.resizeBox, h = c.layerX = t.pageX - c.chartPosLeft, q = c.layerY = t.pageY - c.chartPosTop, E = h - c.ox, R = q - c.oy, n = c.bBox, l = c.ox, C = c.oy, s = c.zoomX, p = c.zoomY, n = c.canvasY, Y = c.canvasX, z = c.canvasW, m = c.canvasH, I =
                c.canvasX2, la = c.canvasY2, M = c.strokeWidth, E = c.attr;
            switch (e) {
                case "start":
                    a = ba(this);
                    c.chartPosLeft = a.left;
                    c.chartPosTop = a.top;
                    h = t.pageX - c.chartPosLeft;
                    q = t.pageY - c.chartPosTop;
                    c.oy = q;
                    c.ox = h;
                    c.allowMove = !1;
                    g || (g = b.elements.resizeBox = k.rect(b.layers.tracker).attr(E));
                    h > Y && h < I && q > n && q < la && (c.allowMove = !0);
                    d && d.ishot && (c.allowMove = !1);
                    g.attr({x: 0, y: 0, width: 0, height: 0}).show();
                    break;
                case "end":
                    n = g.getBBox();
                    b = {
                        chart: b,
                        selectionLeft: n.x,
                        selectionTop: n.y,
                        selectionHeight: n.height,
                        selectionWidth: n.width,
                        originalEvent: a.originalEvent
                    };
                    c.isDragged && (c.selectionEnd && c.selectionEnd(b), c.isDragged = 0);
                    g.hide();
                    delete c.oy;
                    delete c.ox;
                    break;
                default:
                    if (!c.allowMove)break;
                    E = h - c.ox;
                    R = q - c.oy;
                    l = c.ox;
                    C = c.oy;
                    c.isDragged || (b = {
                        chart: b,
                        selectionLeft: (s ? w(l, l + E) : Y) + .5 * M,
                        selectionTop: (p ? w(C, C + R) : n) + .5 * M,
                        selectionHeight: 0,
                        selectionWidth: 0,
                        originalEvent: a.originalEvent
                    }, c.selectionStart && c.selectionStart(b), c.isDragged = 1);
                    E = -(l - w(l - (l - J(l + E, Y)), I));
                    R = -(C - w(C - (C - J(C + R, n)), la));
                    g.attr({
                        x: (s ? w(l, l + E) : Y) + .5 * M,
                        y: (p ? w(C, C + R) : n) + .5 * M,
                        width: s ? N(E) : z,
                        height: p ?
                            N(R) : m
                    })
            }
        }, U = function (a) {
            var c = a.data;
            a = a.originalEvent;
            var b = a.target || a.originalTarget || a.srcElement || a.relatedTarget || a.fromElement, k = a.type, e = a.layerX, t = a.layerY;
            void 0 === e && (e = a.pageX - c.chartPosLeft, t = a.pageY - c.chartPosTop);
            "mousedown" === k && (b.ishot = e > c.canvasX && e < c.canvasX2 && t > c.canvasY && t < c.canvasY2);
            "mouseup" === k && setTimeout(function () {
                b.ishot = !1
            }, 1)
        }, q = function () {
            var a = "innerWidth", c = "innerHeight", b = D.documentElement || D.body, k = b;
            "innerWidth"in m ? k = m : (a = "clientWidth", c = "clientHeight");
            return function () {
                return {
                    width: k[a],
                    height: k[c], scrollTop: b.scrollTop, scrollLeft: b.scrollLeft
                }
            }
        }(), ba = function (a, c) {
            var b = {left: a.offsetLeft || 0, top: a.offsetTop || 0};
            for (a = a.offsetParent; a;)b.left += a.offsetLeft || 0, b.top += a.offsetTop || 0, a === D.body || a === D.documentElement || c || (b.left -= a.scrollLeft, b.top -= a.scrollTop), a = a.offsetParent;
            return b
        }, Ba = function (a) {
            return a && a.replace(/\$/g, "$$$$")
        }, la = function (a, c) {
            return a || !1 === a || 0 === a ? a : c
        }, ga = function () {
            var a, c, b;
            c = 0;
            for (b = arguments.length; c < b; c += 1)if ((a = arguments[c]) || !1 === a || 0 === a)return a;
            return ""
        }, ea = function () {
            var a, c, b;
            c = 0;
            for (b = arguments.length; c < b; c += 1)if ((a = arguments[c]) || !1 === a || 0 === a)return a
        }, pa = function (a, c, b, k) {
            return s.dem.listen(a, c, b, k)
        }, Z = function (a, c, b) {
            return s.dem.unlisten(a, c, b)
        }, ma = function (a) {
            a = a.sourceEvent || a.originalEvent || a;
            return n && a && a.touches && a.touches[0] || a || ja
        }, L = function () {
            var a;
            return function (c) {
                void 0 === c.pageX && (c.pageX = c.clientX + (a || (a = m.document.body || m.document.documentElement)).scrollLeft, c.pageY = c.clientY + a.scrollTop);
                return c
            }
        }(), I = function (a,
                           c) {
            c = L(ma(c));
            var b = c.pageX, k = c.pageY, e = ba(a);
            return {chartX: b - e.left, chartY: k - e.top, pageX: b, pageY: k}
        }, fa = function (a) {
            return a && a.replace(/^#?([a-f0-9]+)/ig, "#$1") || "none"
        }, t = function () {
            var a, c, b;
            c = 0;
            for (b = arguments.length; c < b; c += 1)if (((a = arguments[c]) || !1 === a || 0 === a) && !isNaN(a = Number(a)))return a
        }, R = function (a, c) {
            a = a || !1 === a || 0 === a ? Number(a) : NaN;
            return isNaN(a) ? null : c ? N(a) : a
        }, Y = function (a) {
            return "string" === typeof a ? a.replace(l, "<br />") : ""
        }, C = function (a, c) {
            for (var b = c.length, k = -1; b--;)if (a === c[b]) {
                k =
                    b;
                break
            }
            return k
        }, xa = function () {
            if (Array.isArray)return Array.isArray;
            var a = Object.prototype.toString, c = a.call([]);
            return function (b) {
                return a.call(b) === c
            }
        }(), Pa = function (a, c, b, k, e) {
            var t, d, g, q;
            e ? (k.push(a), e.push(c)) : (k = [a], e = [c]);
            if (c instanceof Array)for (t = 0; t < c.length; t += 1) {
                try {
                    d = a[t], g = c[t]
                } catch (E) {
                    continue
                }
                if ("object" !== typeof g)b && void 0 === g || (a[t] = g); else {
                    if (null === d || "object" !== typeof d)d = a[t] = g instanceof Array ? [] : {};
                    q = C(g, e);
                    -1 !== q ? d = a[t] = k[q] : Pa(d, g, b, k, e)
                }
            } else for (t in c) {
                try {
                    d = a[t],
                        g = c[t]
                } catch (R) {
                    continue
                }
                if (null !== g && "object" === typeof g)if (q = h.call(g), "[object Object]" === q) {
                    if (null === d || "object" !== typeof d)d = a[t] = {};
                    q = C(g, e);
                    -1 !== q ? d = a[t] = k[q] : Pa(d, g, b, k, e)
                } else"[object Array]" === q ? (null !== d && d instanceof Array || (d = a[t] = []), q = C(g, e), -1 !== q ? d = a[t] = k[q] : Pa(d, g, b, k, e)) : a[t] = g; else a[t] = g
            }
            return a
        }, Ga = function (a, c, b) {
            if ("object" !== typeof a && "object" !== typeof c)return null;
            if ("object" !== typeof c || null === c)return a;
            "object" !== typeof a && (a = c instanceof Array ? [] : {});
            Pa(a, c, b);
            return a
        },
        qa = function (a, c) {
            var b;
            if (c instanceof Array)for (b = c.length - 1; 0 <= b; b -= 1)"object" !== typeof c[b] ? !0 === c[b] && a && a.splice && a.splice(b, 1) : h.call(c[b]) === h.call(a[b]) && qa(a[b], c[b]); else for (b in c)"object" !== typeof c[b] ? !0 === c[b] && a && a.splice && a.splice(b, 1) : h.call(c[b]) === h.call(a[b]) && qa(a[b], c[b]);
            return a
        }, za = function () {
            var a = /^@window_/g;
            return function (c, b) {
                var k = c.replace(/\[[\'\"]/g, ".").replace(/[\'\"]\]/g, "").replace(/\[/g, ".@window_").replace(/\]/g, "").split("."), e = m, t, d;
                d = "";
                var g, q, h;
                q = k.length;
                for (h = 0; h < q; h += 1) {
                    g = k[h];
                    t = e;
                    if (g.match(a))d = m[g.replace(a, "")], e = e[d]; else {
                        if (void 0 === e || null === e)throw(d || g).replace(a, "") + " is not defined";
                        e = e[g]
                    }
                    d = g
                }
                !e || "function" !== typeof e.call && e !== m.alert ? setTimeout(function () {
                    throw g.replace(a, "") + "() is not a function";
                }, 0) : e === m.alert ? e(b) : e.call(t, b)
            }
        }(), ya = function () {
            var a = "FusionChartslinkEval" + parseInt(+new Date, 10);
            return function (c) {
                try {
                    m[a] = new Function(c), eval('window["' + a + '"]();')
                } catch (b) {
                    setTimeout(function () {
                        throw b;
                    }, 0)
                }
                v ? delete m[a] : m[a] =
                    null
            }
        }(), ta = function (a, c) {
            a = Number(a);
            a = isNaN(a) ? 100 : a;
            void 0 !== c && (a = a * c / 100);
            return a % 101
        }, V = function (a, c, b) {
            a = a.split(",");
            var k;
            void 0 !== b && (b = t(b.split(",")[0]));
            a[0] = ta(a[0], b);
            for (k = 1; k < c; k += 1)a[k] = a[0] * ta(a[k], b) / 100;
            return a.join(",")
        }, oa = function (c, b, k) {
            var e = 0, t = 0, d = 0;
            k && k.match(G) && (k = k.split(","), e = k[0].slice(k[0].indexOf("(") + 1), t = k[1], d = k[2], b || 0 === b || (b = parseInt(100 * k[3].slice(0, k[3].indexOf(")")), 10)));
            if (c)if (c.match(G))k = c.split(","), e = k[0].slice(k[0].indexOf("(") + 1), t = k[1], d = k[2];
            else {
                c = c.replace(a, "").split(",")[0];
                switch (c.length) {
                    case 3:
                        c = c.charAt(0) + c.charAt(0) + c.charAt(1) + c.charAt(1) + c.charAt(2) + c.charAt(2);
                        break;
                    case 6:
                        break;
                    default:
                        c = (c + "FFFFFF").slice(0, 6)
                }
                e = parseInt(c.slice(0, 2), 16);
                t = parseInt(c.slice(2, 4), 16);
                d = parseInt(c.slice(4, 6), 16)
            }
            b || 0 === b || (b = 100);
            "string" === typeof b && (b = b.split(",")[0]);
            b = parseInt(b, 10) / 100;
            return "rgba(" + e + "," + t + "," + d + "," + b + ")"
        }, Ra = function () {
            var a = {};
            return function (b) {
                var k = (b = b || this) && b.FCcolor || b, e = k.color, t = k.ratio, d = k.angle, g = k.alpha,
                    q = k.r, h = k.cx, E = k.cy, R = k.fx, n = k.fy, l = k.gradientUnits, w = k.x1, C = k.y1, s = k.x2, p = k.y2, L = 1, Y, z, m, I;
                if ("string" === typeof b)return a[I = "~" + b] || (a[I] = b.replace(/^#?([a-f0-9]{3,6})/ig, "#$1"));
                e = e || "";
                if (!e)return Y;
                I = [e, g, t, d, q, h, E, l, R, n, w, s, C, p].join("_").replace(/[\(\)\s,\xb0#]/g, "_");
                if (a[I])return a[I];
                t = t && (t + "").split(",") || [];
                g = (g || 0 === g) && (g + "").split(",") || [];
                if (e = e.split(","))if (Y = "", 1 === e.length)m = e[0].replace(/^#?([a-f0-9]{3,6})/ig, "$1"), Y = g.length ? "rgba(" + Ka(m).join(",") + "," + .01 * c(g[0]) + ")" : m.replace(/^#?([a-f0-9]{3,6})/ig,
                    "#$1"); else {
                    b = 0;
                    for (z = e.length; b < z; b++)m = e[b].replace(/^#?([a-f0-9]{3,6})/ig, "$1"), isNaN(t[b]) || (t[b] = c(t[b]), m += ":" + t[b], isNaN(t[b + 1]) || (t[b + 1] = c(t[b + 1]) + t[b])), isNaN(g[b]) || "" === g[b] || (L = .01 * g[b]), e[b] = "rgba(" + Ka(m).join(",") + "," + L + ")", isNaN(t[b]) || (e[b] = e[b] + ":" + t[b]);
                    Y += e.join("-");
                    if (void 0 !== q || void 0 !== R || void 0 !== h || k.radialGradient)Y = "xr(" + [R, n, q, h, E, l].join() + ")" + Y; else {
                        Y = "-" + Y;
                        if (void 0 !== w || void 0 !== C || void 0 !== s || void 0 !== p)Y = "(" + [w, C, s, p, l].join() + ")" + Y;
                        void 0 === d && (d = 0);
                        Y = 360 - c(d) %
                        360 + Y
                    }
                }
                return a[I] = Y
            }
        }(), ib = function () {
            return function () {
                return ""
            }
        }(), Da = function (c) {
            return c.replace(a, "").replace(b, "#")
        }, Za = function (c, b) {
            b = (0 > b || 100 < b ? 100 : b) / 100;
            c = c.replace(a, "");
            var k = parseInt(c, 16), e = Math.floor(k / 65536), t = Math.floor((k - 65536 * e) / 256);
            return ("000000" + (e * b << 16 | t * b << 8 | (k - 65536 * e - 256 * t) * b).toString(16)).slice(-6)
        }, Ea = function (c, b) {
            b = (0 > b || 100 < b ? 100 : b) / 100;
            c = c.replace(a, "");
            var k = parseInt(c, 16), e = Math.floor(k / 65536), t = Math.floor((k - 65536 * e) / 256);
            return ("000000" + (256 - (256 - e) * b << 16 |
            256 - (256 - t) * b << 8 | 256 - (256 - (k - 65536 * e - 256 * t)) * b).toString(16)).slice(-6)
        }, Ka = function (a) {
            a = parseInt(a, 16);
            var c = Math.floor(a / 65536), b = Math.floor((a - 65536 * c) / 256);
            return [c, b, Math.floor(a - 65536 * c - 256 * b)]
        }, Xa = function (a, c) {
            if ("object" !== typeof a)return "";
            if (a.fontSize || a["font-size"])!a.fontSize && a["font-size"] && (a.fontSize = a["font-size"], delete a["font-size"]), a.lineHeight = (parseFloat(a.fontSize) || c || 10) * s.lineHeightFactor + "px", delete a["line-height"];
            !a.lineHeight && a["line-height"] && (a.lineHeight = a["line-height"],
                delete a["line-height"]);
            return a.lineHeight
        }, Ca = function (a, c, b, k, e) {
            var d = ga(a.labelbordercolor, c.bordercolor, b.labelbordercolor, ""), g = ea(a.labelbgcolor, c.bgcolor, b.labelbgcolor), q = t(a.labelborderthickness, c.borderthickness, b.labelborderthickness, 1);
            e = t(b.usedataplotcolorforlabels, 0) ? e || k.color : k.color;
            d = d ? oa(d, t(a.labelborderalpha, c.borderalpha, b.labelborderalpha, a.labelalpha, c.alpha, b.labelalpha, 100)) : "";
            a = {
                fontFamily: ea(a.labelfont, c.font, b.labelfont, k.fontFamily),
                fontSize: ea(a.labelfontsize,
                    c.fontsize, b.labelfontsize, parseInt(k.fontSize, 10)) + "px",
                color: oa(ea(a.labelfontcolor, c.fontcolor, b.labelfontcolor, e), t(a.labelfontalpha, c.fontalpha, b.labelfontalpha, a.labelalpha, c.alpha, b.labelalpha, 100)),
                fontWeight: t(a.labelfontbold, c.fontbold, b.labelfontbold) ? "bold" : "normal",
                fontStyle: t(a.labelfontitalic, c.fontitalic, b.labelfontitalic) ? "italic" : "normal",
                border: d || g ? q + "px solid" : "",
                borderColor: d,
                borderThickness: q,
                borderPadding: t(a.labelborderpadding, c.borderpadding, b.labelborderpadding, 2),
                borderRadius: t(a.labelborderradius,
                    c.borderradius, b.labelborderradius, 0),
                backgroundColor: g ? oa(g, t(a.labelbgalpha, c.bgalpha, b.labelbgalpha, a.labelalpha, c.alpha, b.labelalpha, 100)) : "",
                borderDash: t(a.labelborderdashed, c.borderdashed, b.labelborderdashed, 0) ? db(t(a.labelborderdashlen, c.borderdashlen, b.labelborderdashlen, 4), t(a.labelborderdashgap, c.borderdashgap, b.labelborderdashgap, 2), q) : void 0
            };
            a.lineHeight = Xa(a);
            return a
        }, yb = function () {
            var a = {
                top: {align: "center", verticalAlign: "top", textAlign: "center"},
                right: {
                    align: "right", verticalAlign: "middle",
                    textAlign: "left"
                },
                bottom: {align: "center", verticalAlign: "bottom", textAlign: "center"},
                left: {align: "left", verticalAlign: "middle", textAlign: "right"}
            }, c = /([^\,^\s]+)\)$/g, b = function (a, c) {
                var b;
                /^(bar|bar3d)$/.test(a) && (this.isBar = !0, this.yPos = "bottom", this.yOppPos = "top", this.xPos = "left", this.xOppPos = "right");
                b = parseInt(c.labelstep, 10);
                this.labelStep = 1 < b ? b : 1;
                this.showLabel = t(c.showlabels, c.shownames, 1);
                this.is3D = /3d$/.test(a)
            };
            b.prototype = {
                isBar: !1, yPos: "left", yOppPos: "right", xPos: "bottom", xOppPos: "top",
                addAxisGridLine: function (b, k, e, t, d, g, q, S) {
                    var h = "" === e ? !1 : !0, E = 0 < t || 0 < g.match(c)[1] ? !0 : !1, R;
                    if (h || E)E || (g = "rgba(0,0,0,0)", t = .1), R = {
                        isGrid: !0,
                        width: t,
                        dashStyle: d,
                        color: g,
                        value: k,
                        zIndex: void 0 === q ? 2 : q
                    }, h && (k = b.opposite ? S ? this.xOppPos : this.yOppPos : S ? this.xPos : this.yPos, k = a[k], R.label = {
                        text: e,
                        style: b.labels.style,
                        textAlign: k.textAlign,
                        align: k.align,
                        verticalAlign: k.verticalAlign,
                        rotation: 0,
                        x: 0,
                        y: 0
                    }), b.plotLines.push(R);
                    return R
                }, addAxisAltGrid: function (a, c) {
                    if (!this.is3D) {
                        var b = t(a._lastValue, a.min), A =
                            ea(a._altGrid, !1);
                        A && a.plotBands.push({isGrid: !0, color: a.alternateGridColor, to: c, from: b, zIndex: 1});
                        a._lastValue = c;
                        a._altGrid = !A
                    }
                }, addXaxisCat: function (c, b, k, e, t, d, g, T) {
                    var q = a[c.opposite ? this.xOppPos : this.xPos];
                    b = {
                        isGrid: !0,
                        isDataLabel: !0,
                        width: .1,
                        color: "rgba(0,0,0,0)",
                        value: b,
                        label: {
                            text: e,
                            link: ea(t.labellink, d.link, g.labellink),
                            style: Ca(t, d, g, c.labels.style, T),
                            textAlign: q.textAlign,
                            align: q.align,
                            verticalAlign: q.verticalAlign,
                            rotation: 0,
                            x: 0,
                            y: 0
                        }
                    };
                    0 !== k % this.labelStep && (b.stepped = !0, b.label.style =
                        c.steppedLabels.style);
                    c.plotLines.push(b)
                }, addVline: function (a, c, b, A) {
                    A = A._FCconf;
                    var k = A.isBar, e = A.divlineStyle, d = Y(c.label), g = Boolean(t(c.showlabelborder, A.showVLineLabelBorder, 1)), T = Boolean(t(c.showlabelbackground, 1)), q = ea(c.labelhalign, k ? "left" : "center"), S = ea(c.labelvalign, k ? "middle" : "bottom").toLowerCase(), h = t(c.labelposition, 0), R = t(c.lineposition, .5), E = t(c.showvlines, A.showVLines, 1), n = t(c.alpha, A.vLineAlpha, 80), l = ea(c.color, A.vLineColor).replace(/^#?/, "#"), w = T ? ea(c.labelbgcolor, A.vLineLabelBgColor,
                        "333333").replace(/^#?/, "#") : "", C = ea(c.labelcolor, A.vLineLabelColor, c.color, A.vLineColor).replace(/^#?/, "#"), s = t(c.thickness, A.vLineThickness, 1), p = .5 * s, L = Boolean(Number(ea(c.dashed, 0))), z = t(c.dashlen, 5), m = t(c.dashgap, 2), I = A.smartLabel, J = parseInt(e.fontSize, 10) + 2, la = 0, r = t(c.rotatelabel, A.rotateVLineLabels) ? 270 : 0, R = 0 > R || 1 < R ? .5 : R, h = 0 > h || 1 < h ? 0 : h;
                    I.setStyle(e);
                    I = I.getOriSize(d);
                    l = oa(l, E ? n : "0");
                    if (k) {
                        switch (S) {
                            case "top":
                                J -= I.height + p + 2;
                                break;
                            case "middle":
                                J -= .5 * I.height + 1;
                                break;
                            default:
                                J += p
                        }
                        c.labelhalign ||
                        (la -= I.width * h)
                    } else {
                        switch (S) {
                            case "top":
                                J = .5 * -I.height + 1;
                                break;
                            case "middle":
                                J = 0;
                                break;
                            default:
                                J = .5 * I.height
                        }
                        switch (q) {
                            case "left":
                                la += s;
                                break;
                            case "right":
                                la -= s + 1
                        }
                    }
                    a.plotLines.push({
                        isVline: !0,
                        color: l,
                        width: s,
                        value: b - 1 + R,
                        zIndex: t(c.showontop, A.showVLinesOnTop) ? 5 : 3,
                        dashStyle: L ? db(z, m, s) : void 0,
                        label: {
                            text: d,
                            align: k ? "left" : "center",
                            offsetScale: h,
                            rotation: r,
                            y: J,
                            x: la,
                            textAlign: q,
                            backgroundColor: w,
                            borderWidth: E && g ? "1px" : "",
                            borderType: E && g ? "solid" : "",
                            borderColor: E && g ? C : "",
                            backgroundOpacity: E && T ? ea(c.labelbgalpha,
                                A.vLineLabelBgAlpha) / 100 : 0,
                            style: {
                                color: E ? C : l,
                                fontSize: e.fontSize,
                                fontFamily: e.fontFamily,
                                lineHeight: e.lineHeight,
                                backgroundColor: w
                            }
                        }
                    })
                }
            };
            return b.prototype.constructor = b
        }(), Fb = function () {
            var a = function (a, b, A, k, e) {
                a = Math.abs(b - a);
                b = a / (A + 1);
                c(a, A, k) || (e && Number(b) / Number(k) < (1 < k ? 2 : .5) && (k /= 10), b = (Math.floor(b / k) + 1) * k, a = b * (A + 1));
                return a
            }, c = function (a, c, A) {
                return b(a / (c + 1)) > b(A) ? !1 : !0
            }, b = function (a) {
                a = Math.abs(a);
                a = String(a);
                var c = 0, b = a.indexOf(".");
                -1 != b && (c = a.length - b - 1);
                return c
            };
            return function (b,
                             k, t, d, g, q, h, S) {
                var E, R, n, l, w, C, s;
                b = !0 === isNaN(b) || void 0 === b ? .1 : b;
                k = !0 === isNaN(k) || void 0 === k ? 0 : k;
                b === k && 0 === b && (b = .1);
                g = void 0 === typeof g ? !0 : g;
                q = void 0 === typeof q ? !0 : q;
                E = Math.floor(Math.log(Math.abs(b)) / Math.LN10);
                R = Math.floor(Math.log(Math.abs(k)) / Math.LN10);
                R = Math.max(R, E);
                E = Math.pow(10, R);
                2 > Math.abs(b) / E && 2 > Math.abs(k) / E && (R--, E = Math.pow(10, R));
                R = Math.floor(Math.log(b - k) / Math.LN10);
                R = Math.pow(10, R);
                0 < b - k && 10 <= E / R && (E = R);
                R = (Math.floor(b / E) + 1) * E;
                0 > k ? n = -1 * (Math.floor(Math.abs(k / E)) + 1) * E : q ? n = 0 : (n =
                    Math.floor(Math.abs(k / E) - 1) * E, n = 0 > n ? 0 : n);
                g && 0 >= b && (R = 0);
                g = t || 0 === t ? !0 : !1;
                q = d || 0 === d ? !0 : !1;
                b = !1 === g || !0 === g && Number(t) < b && b - Number(t) > e ? R : Number(t);
                k = !1 === q || !0 === q && Number(d) > k && Number(d) - k > e ? n : Number(d);
                d = Math.abs(b - k);
                if (!1 === q && !1 === g && S)if (0 < b && 0 > k)for (t = !1, g = 10 < E ? E / 10 : E, S = a(k, b, h, g, !1), q = S - (h + 1) * g; !1 === t;) {
                    if (q += (h + 1) * g, c(q, h, g))if (S = q - d, R = q / (h + 1), l = Math.min(Math.abs(k), b), n = l == Math.abs(k) ? -1 : 1, 0 === h)t = !0; else for (C = 1; C <= Math.floor((h + 1) / 2); C++)w = R * C, !(w - l > S) && w > l && (s = q - w, s / R == Math.floor(s / R) &&
                    w / R == Math.floor(w / R) && (d = q, b = -1 == n ? s : w, k = -1 == n ? -w : -s, t = !0))
                } else t = a(k, b, h, E, !0), S = t - d, d = t, 0 < b ? b += S : k -= S; else if (S && 0 < h) {
                    S = 0;
                    for (t = 1; ;) {
                        g = h + S * t;
                        g = 0 === g ? 1 : g;
                        if (c(d, g, E))break;
                        S = -1 == t || S > h ? ++S : S;
                        if (25 < S) {
                            g = 0;
                            break
                        }
                        t = S <= h ? -1 * t : 1
                    }
                    h = g
                }
                return {Max: b, Min: k, Range: d, interval: E, divGap: (b - k) / (h + 1)}
            }
        }(), vb = function () {
            var a = function (a, c, b) {
                var A = b.jsVars && b.jsVars.smartLabel, k = a.offsetWidth;
                a = a.offsetHeight;
                this.title.y = a / 2;
                this.title.x = k / 2;
                this.title.style = b._chartMessageStyle;
                delete b._chartMessageStyle;
                void 0 !==
                c && (A ? (Xa(this.title.style), A.setStyle(this.title.style), c = A.getSmartText(Y(c), k, a), this.title.text = c.text) : this.title.text = Y(c), this.title.verticalAlign = "middle")
            };
            a.prototype = {
                chart: {events: {}, margin: [0, 0, 0, 0], backgroundColor: {FCcolor: {alpha: 0}}},
                credits: {href: M, text: "", enabled: H},
                legend: {enabled: !1},
                title: {text: "", style: {fontFamily: "Verdana,sans", fontSize: "10px", color: "#666666"}},
                plotOptions: {series: {}},
                series: [{}],
                exporting: {enabled: !1},
                nativeMessage: !0
            };
            return a.prototype.constructor =
                a
        }(), $a = {
            "true": {
                "true": {"true": "center", "false": "center"},
                "false": {"true": "center", "false": "center"}
            }, "false": {"true": {"true": "right", "false": "left"}, "false": {"true": "left", "false": "right"}}
        }, sb = function () {
            return function (a, c, k, e, d, g, q) {
                var h, R = k.trendStyle, n, l, w, C, s, p, L, z, m, I, J, M, H, v = g ? "xAxis" : "dataLabels";
                if (g ? k.showVLines : k.showTrendlines)for (h = 0, l = a.length; h < l; h += 1)if ((H = a[h]) && H.line)for (n = 0, w = H.line.length; n < w; n += 1)C = H.line[n], I = k.numberFormatter.getCleanValue(ea(C.startvalue, C.value, 0)), J =
                    k.numberFormatter.getCleanValue(ea(C.endvalue, ea(C.startvalue, C.value, 0))), g ? z = c : e && C.parentyaxis && /^s$/i.test(C.parentyaxis) ? (z = c[1], M = 1) : z = c[0], p = z.max, L = z.min, s = !1, p >= I && p >= J && L <= I && L <= J && (e && C.parentyaxis && /^s$/i.test(C.parentyaxis) ? s = "1" !== ea(C.valueonleft, k.trendlineValuesOnOpp) : e || (s = "1" === ea(C.valueonright, k.trendlineValuesOnOpp)), p = Boolean(t(C.istrendzone, g ? 1 : 0)), (L = (g ? k.showVLineLabels : k.showTrendlineLabels) ? Y(ea(C.displayvalue, k.numberFormatter[v](s ? J : I, M))) : "") ? (m = I < J, s = {
                    text: L,
                    textAlign: d ?
                        "center" : s ? "left" : "right",
                    align: d ? $a[p][!q][m] : s ? "right" : "left",
                    verticalAlign: d ? "bottom" : "middle",
                    rotation: 0,
                    x: 0,
                    y: 0,
                    style: R
                }, L = ea(C.color, k.trendlineColor), C.alwaysVisible = p, L && (s.style = Ga({}, R), s.style.color = L.replace(b, "#"))) : s = void 0, L = la(Y(ea(C.tooltext, H.tooltext, k.trendLineToolText))), L = E(L, [7, 15, 16, 17, 18, 19], {
                    startValue: I,
                    startDataValue: k.numberFormatter[v](I, M),
                    endValue: J,
                    endDataValue: k.numberFormatter[v](J, M),
                    axisName: z.title && z.title.text
                }, C), m = t(C.thickness, k.trendlineThickness, 1), p ? z.plotBands.push({
                    isTrend: !0,
                    color: oa(ea(C.color, k.trendlineColor), ea(C.alpha, k.trendlineAlpha, 40)),
                    from: I,
                    to: J,
                    label: s,
                    zIndex: k.is3d || "1" !== ea(C.showontop, k.showTrendlinesOnTop) ? 3 : 5,
                    tooltext: L,
                    alwaysVisible: C.alwaysVisible
                }) : z.plotLines.push({
                    isTrend: !0,
                    color: oa(ea(C.color, k.trendlineColor, k.trendlineColor), ea(C.alpha, k.trendlineAlpha, 99)),
                    value: I,
                    to: J,
                    width: m,
                    dashStyle: "1" == ea(C.dashed, k.trendlinesAreDashed) ? db(t(C.dashlen, k.trendlinesDashLen), t(C.dashgap, k.trendlinesDashGap), m) : void 0,
                    label: s,
                    zIndex: k.is3d || "1" !== ea(C.showontop,
                        k.showTrendlinesOnTop) ? 3 : 5,
                    tooltext: L
                }))
            }
        }(), db = function (a, c, b, k) {
            return k || void 0 === k ? [a, c] : ""
        }, nb = function () {
        }, k = function (a, c, b) {
            var e, t = k[a];
            t || (t = function () {
            }, t.prototype = b instanceof nb ? b : new nb, t.prototype.constructor = t, t = k[a] = new t);
            b && (t.base = b);
            t.name = a;
            for (e in c)switch (typeof c[e]) {
                case "object":
                    if (c[e]instanceof nb) {
                        t[e] = c[e][e];
                        break
                    }
                default:
                    t[e] = c[e];
                    break;
                case "undefined":
                    delete t[e]
            }
            return this instanceof k ? (a = function () {
            }, a.prototype = t, a.prototype.constructor = a, new a) : t
        }, E = function () {
            var a =
                [{
                    regex: /((^|[^\\])((\\)\\)*\$cleanvalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$cleanvalue))/ig,
                    argIndex: 2,
                    argKey: "cleanvalue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$datavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$datavalue))/ig,
                    argIndex: 2,
                    argKey: "formattedValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$value)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$value))/ig,
                    argIndex: 3,
                    argKey: "value"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$label)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$label))/ig,
                    argIndex: 2,
                    argKey: "label"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$seriesname)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$seriesname))/ig, argIndex: 5, argKey: "seriesname"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$yaxisname)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$yaxisname))/ig,
                    argIndex: 2,
                    argKey: "yaxisName"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$xaxisname)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$xaxisname))/ig,
                    argIndex: 2,
                    argKey: "xaxisName"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$displayvalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$displayvalue))/ig,
                    argIndex: 3,
                    argKey: "displayvalue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$xdatavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$xdatavalue))/ig, argIndex: 2, argKey: "xDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$ydatavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$ydatavalue))/ig,
                    argIndex: 2,
                    argKey: "yDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$xvalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$xvalue))/ig,
                    argIndex: 3,
                    argKey: "x"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$yvalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$yvalue))/ig,
                    argIndex: 3,
                    argKey: "y"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$zvalue)/ig, escapeRegex: /((^|[^\\])((\\)\\)*\\(\$zvalue))/ig,
                    argIndex: 3, argKey: "z"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$name)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$name))/ig,
                    argIndex: 3,
                    argKey: "name"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$percentValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$percentValue))/ig,
                    argIndex: 2,
                    argKey: "percentValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$startValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$startValue))/ig,
                    argIndex: 2,
                    argKey: "startValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$startDataValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$startDataValue))/ig,
                    argIndex: 2,
                    argKey: "startDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$endValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$endValue))/ig,
                    argIndex: 2,
                    argKey: "endValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$endDataValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$endDataValue))/ig,
                    argIndex: 2,
                    argKey: "endDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$axisName)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$axisName))/ig,
                    argIndex: 2,
                    argKey: "axisName"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$cumulativevalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$cumulativevalue))/ig,
                    argIndex: 2,
                    argKey: "cumulativeValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$cumulativedatavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$cumulativedatavalue))/ig,
                    argIndex: 2,
                    argKey: "cumulativeDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$cumulativePercentValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$cumulativePercentValue))/ig,
                    argIndex: 2,
                    argKey: "cumulativePercentValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$cumulativepercentdatavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$cumulativepercentdatavalue))/ig,
                    argIndex: 2,
                    argKey: "cumulativePercentDataValue"
                },
                    {
                        regex: /((^|[^\\])((\\)\\)*\$sum)/ig,
                        escapeRegex: /((^|[^\\])((\\)\\)*\\(\$sum))/ig,
                        argIndex: 2,
                        argKey: "sum"
                    }, {
                    regex: /((^|[^\\])((\\)\\)*\$unformattedsum)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$unformattedsum))/ig,
                    argIndex: 2,
                    argKey: "unformattedSum"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$targetvalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$targetvalue))/ig,
                    argIndex: 2,
                    argKey: "targetValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$targetdatavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$targetdatavalue))/ig,
                    argIndex: 2,
                    argKey: "targetDataValue"
                },
                    {
                        regex: /((^|[^\\])((\\)\\)*\$processname)/ig,
                        escapeRegex: /((^|[^\\])((\\)\\)*\\(\$processname))/ig,
                        argIndex: 2,
                        argKey: "processName"
                    }, {
                    regex: /((^|[^\\])((\\)\\)*\$start)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$start))/ig,
                    argIndex: 2,
                    argKey: "start"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$end)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$end))/ig,
                    argIndex: 2,
                    argKey: "end"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$percentcomplete)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$percentcomplete))/ig,
                    argIndex: 2,
                    argKey: "percentComplete"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$taskpercentcomplete)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$taskpercentcomplete))/ig,
                    argIndex: 2,
                    argKey: "taskPercentComplete"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$taskstartdate)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$taskstartdate))/ig,
                    argIndex: 2,
                    argKey: "taskStartDate"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$taskenddate)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$taskenddate))/ig,
                    argIndex: 2,
                    argKey: "taskEndDate"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$tasklabel)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$tasklabel))/ig,
                    argIndex: 2,
                    argKey: "taskLabel"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$date)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$date))/ig, argIndex: 2, argKey: "date"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$percentofprevvalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$percentofprevvalue))/ig,
                    argIndex: 2,
                    argKey: "percentOfPrevValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$sname)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$sname))/ig,
                    argIndex: 2,
                    argKey: "sName"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$lname)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$lname))/ig,
                    argIndex: 2,
                    argKey: "lName"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$fromid)/ig, escapeRegex: /((^|[^\\])((\\)\\)*\\(\$fromid))/ig,
                    argIndex: 2, argKey: "fromId"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$fromlabel)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$fromlabel))/ig,
                    argIndex: 2,
                    argKey: "fromLabel"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$toid)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$toid))/ig,
                    argIndex: 2,
                    argKey: "toId"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$tolabel)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$tolabel))/ig,
                    argIndex: 2,
                    argKey: "toLabel"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$fromxvalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$fromxvalue))/ig,
                    argIndex: 2,
                    argKey: "fromXValue"
                },
                    {
                        regex: /((^|[^\\])((\\)\\)*\$fromyvalue)/ig,
                        escapeRegex: /((^|[^\\])((\\)\\)*\\(\$fromyvalue))/ig,
                        argIndex: 2,
                        argKey: "fromYValue"
                    }, {
                    regex: /((^|[^\\])((\\)\\)*\$fromxdatavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$fromxdatavalue))/ig,
                    argIndex: 2,
                    argKey: "fromXDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$fromydatavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$fromydatavalue))/ig,
                    argIndex: 2,
                    argKey: "fromYDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$fromlabel)/ig, escapeRegex: /((^|[^\\])((\\)\\)*\\(\$fromlabel))/ig,
                    argIndex: 2, argKey: "fromLabel"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$toxvalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$toxvalue))/ig,
                    argIndex: 2,
                    argKey: "toXValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$toyvalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$toyvalue))/ig,
                    argIndex: 2,
                    argKey: "toYValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$toxdatavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$toxdatavalue))/ig,
                    argIndex: 2,
                    argKey: "toXDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$toydatavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$toydatavalue))/ig,
                    argIndex: 2,
                    argKey: "toYDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$tolabel)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$tolabel))/ig,
                    argIndex: 2,
                    argKey: "toLabel"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$openvalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$openvalue))/ig,
                    argIndex: 2,
                    argKey: "openValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$closevalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$closevalue))/ig,
                    argIndex: 2,
                    argKey: "closeValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$highvalue)/ig, escapeRegex: /((^|[^\\])((\\)\\)*\\(\$highvalue))/ig,
                    argIndex: 2, argKey: "highValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$lowvalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$lowvalue))/ig,
                    argIndex: 2,
                    argKey: "lowValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$opendatavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$opendatavalue))/ig,
                    argIndex: 2,
                    argKey: "openDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$closedatavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$closedatavalue))/ig,
                    argIndex: 2,
                    argKey: "closeDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$highdatavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$highdatavalue))/ig,
                    argIndex: 2,
                    argKey: "highDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$lowdatavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$lowdatavalue))/ig,
                    argIndex: 2,
                    argKey: "lowDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$maxvalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$maxvalue))/ig,
                    argIndex: 2,
                    argKey: "maxValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$maxdatavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$maxdatavalue))/ig,
                    argIndex: 2,
                    argKey: "maxDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$minvalue)/ig, escapeRegex: /((^|[^\\])((\\)\\)*\\(\$minvalue))/ig,
                    argIndex: 2, argKey: "minValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$mindatavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$mindatavalue))/ig,
                    argIndex: 2,
                    argKey: "minDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$q1)/ig,
                    argIndex: 2,
                    argKey: "Q1"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$unformattedQ1)/ig,
                    argIndex: 2,
                    argKey: "unformattedQ1"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$q3)/ig,
                    argIndex: 2,
                    argKey: "Q3"
                }, {regex: /((^|[^\\])((\\)\\)*\$unformattedQ3)/ig, argIndex: 2, argKey: "unformattedQ3"}, {
                    regex: /((^|[^\\])((\\)\\)*\$median)/ig, escapeRegex: /((^|[^\\])((\\)\\)*\\(\$median))/ig,
                    argIndex: 2, argKey: "median"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$unformattedMedian)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$unformattedMedian))/ig,
                    argIndex: 2,
                    argKey: "unformattedMedian"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$SD)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$SD))/ig,
                    argIndex: 2,
                    argKey: "SD"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$unformattedsd)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$unformattedsd))/ig,
                    argIndex: 2,
                    argKey: "unformattedsd"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$QD)/ig, escapeRegex: /((^|[^\\])((\\)\\)*\\(\$QD))/ig,
                    argIndex: 2, argKey: "QD"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$unformattedQD)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$unformattedQD))/ig,
                    argIndex: 2,
                    argKey: "unformattedQD"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$MD)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$MD))/ig,
                    argIndex: 2,
                    argKey: "MD"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$unformattedMD)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$unformattedMD))/ig,
                    argIndex: 2,
                    argKey: "unformattedMD"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$mean)/ig, escapeRegex: /((^|[^\\])((\\)\\)*\\(\$mean))/ig, argIndex: 2,
                    argKey: "mean"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$unformattedMean)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$unformattedMean))/ig,
                    argIndex: 2,
                    argKey: "unformattedMean"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$unformattedMean)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$unformattedMean))/ig,
                    argIndex: 2,
                    argKey: "unformattedMean"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$volumeValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$volumeValue))/ig,
                    argIndex: 2,
                    argKey: "volumeValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$volumeDataValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$volumeDataValue))/ig,
                    argIndex: 2,
                    argKey: "volumeDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$fromXValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$fromXValue))/ig,
                    argIndex: 2,
                    argKey: "fromXValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$fromYValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$fromYValue))/ig,
                    argIndex: 2,
                    argKey: "fromYValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$fromXDataValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$fromXDataValue))/ig,
                    argIndex: 2,
                    argKey: "fromXDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$fromYDataValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$fromYDataValue))/ig,
                    argIndex: 2,
                    argKey: "fromYDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$fromLabel)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$fromLabel))/ig,
                    argIndex: 2,
                    argKey: "fromLabel"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$toXValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$toXValue))/ig,
                    argIndex: 2,
                    argKey: "toXValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$toYValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$toYValue))/ig,
                    argIndex: 2,
                    argKey: "toYValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$toXDataValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$toXDataValue))/ig,
                    argIndex: 2,
                    argKey: "toXDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$toYDataValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$toYDataValue))/ig,
                    argIndex: 2,
                    argKey: "toYDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$tolabel)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$tolabel))/ig,
                    argIndex: 2,
                    argKey: "toLabel"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$tlLabel)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$tlLabel))/ig,
                    argIndex: 5,
                    argKey: "tlLabel"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$trlabel)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$trlabel))/ig,
                    argIndex: 5,
                    argKey: "trLabel"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$bllabel)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$bllabel))/ig,
                    argIndex: 5,
                    argKey: "blLabel"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$brlabel)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$brlabel))/ig,
                    argIndex: 5,
                    argKey: "brLabel"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$rowlabel)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$rowlabel))/ig,
                    argIndex: 5,
                    argKey: "rowLabel"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$columnlabel)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$columnlabel))/ig,
                    argIndex: 5,
                    argKey: "columnLabel"
                },
                    {
                        regex: /((^|[^\\])((\\)\\)*\$errorvalue)/ig,
                        escapeRegex: /((^|[^\\])((\\)\\)*\\(\$errorvalue))/ig,
                        argIndex: 2,
                        argKey: "errorValue"
                    }, {
                    regex: /((^|[^\\])((\\)\\)*\$errordatavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$errordatavalue))/ig,
                    argIndex: 2,
                    argKey: "errorDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$errorpercentvalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$errorpercentvalue))/ig,
                    argIndex: 2,
                    argKey: "errorPercentValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$errorpercentdatavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$errorpercentdatavalue))/ig,
                    argIndex: 2,
                    argKey: "errorPercentDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$horizontalErrorValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$horizontalErrorValue))/ig,
                    argIndex: 2,
                    argKey: "horizontalErrorValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$horizontalErrorDataValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$horizontalErrorDataValue))/ig,
                    argIndex: 2,
                    argKey: "horizontalErrorDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$verticalErrorValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$verticalErrorValue))/ig,
                    argIndex: 2,
                    argKey: "verticalErrorValue"
                },
                    {
                        regex: /((^|[^\\])((\\)\\)*\$verticalErrorDataValue)/ig,
                        escapeRegex: /((^|[^\\])((\\)\\)*\\(\$verticalErrorDataValue))/ig,
                        argIndex: 2,
                        argKey: "verticalErrorDataValue"
                    }, {
                    regex: /((^|[^\\])((\\)\\)*\$horizontalErrorPercent)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$horizontalErrorPercentValue))/ig,
                    argIndex: 2,
                    argKey: "horizontalErrorPercentValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$horizontalErrorPercentDataValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$horizontalErrorPercentDataValue))/ig,
                    argIndex: 2,
                    argKey: "horizontalErrorPercentDataValue"
                },
                    {
                        regex: /((^|[^\\])((\\)\\)*\$verticalErrorPercent)/ig,
                        escapeRegex: /((^|[^\\])((\\)\\)*\\(\$verticalErrorPercentValue))/ig,
                        argIndex: 2,
                        argKey: "verticalErrorPercentValue"
                    }, {
                    regex: /((^|[^\\])((\\)\\)*\$verticalErrorPercentDataValue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$verticalErrorPercentDataValue))/ig,
                    argIndex: 2,
                    argKey: "verticalErrorPercentDataValue"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$xaxispercentvalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$xaxispercentvalue))/ig,
                    argIndex: 2,
                    argKey: "xAxisPercentValue"
                },
                    {
                        regex: /((^|[^\\])((\\)\\)*\$percentdatavalue)/ig,
                        escapeRegex: /((^|[^\\])((\\)\\)*\\(\$percentdatavalue))/ig,
                        argIndex: 2,
                        argKey: "percentDataValue"
                    }, {
                    regex: /((^|[^\\])((\\)\\)*\$trType)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$trType))/ig,
                    argIndex: 4,
                    argKey: "trtype"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$tlType)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$tlType))/ig,
                    argIndex: 4,
                    argKey: "tltype"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$brType)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$brType))/ig,
                    argIndex: 4,
                    argKey: "brtype"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$blType)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$blType))/ig, argIndex: 4, argKey: "bltype"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$colorRangeLabel)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$colorRangeLabel))/ig,
                    argIndex: 5,
                    argKey: "colorRangeLabel"
                }, {
                    regex: /((^|[^\\])((\\)\\)*\$zdatavalue)/ig,
                    escapeRegex: /((^|[^\\])((\\)\\)*\\(\$zdatavalue))/ig,
                    argIndex: 2,
                    argKey: "zDataValue"
                }], c = [], b, k = a.length;
            for (b = 0; b < k; b += 1)c.push(b);
            return function () {
                var b = arguments[0], k = arguments[1], e, t, d, g, q;
                xa(k) || (k = c);
                if (b)for (q = k.length, g = 0; g < q; g +=
                    1)if (d = a[k[g]])e = Ba(la((t = arguments[d.argIndex]) && t[d.argKey], "") + ""), b = b.replace(d.regex, "$2$4" + (d.parsingMethod ? d.parsingMethod(e) : e)), b = b.replace(d.escapeRegex, "$2$4$5");
                return b
            }
        }();
    d.core._setLineHeightFactor = function (a) {
        !(a = c(a)) || 0 > a || (s.lineHeightFactor = a)
    };
    d.extend(s, {
        BLANKSTRINGPLACEHOLDER: "#BLANK#",
        BLANKSTRING: "",
        COLOR_BLACK: "000000",
        COLOR_GLASS: "rgba(255, 255, 255, 0.3)",
        COLOR_WHITE: "FFFFFF",
        COLOR_TRANSPARENT: "rgba(0,0,0,0)",
        HASHSTRING: "#",
        BREAKSTRING: "<br />",
        STRINGSTRING: "string",
        OBJECTSTRING: "object",
        COMMASTRING: ",",
        ZEROSTRING: "0",
        SAMPLESTRING: "Ay0",
        TESTSTR: "Ag",
        ONESTRING: "1",
        DECIMALSTRING: ".",
        STRINGUNDEFINED: "undefined",
        POSITION_TOP: "top",
        POSITION_RIGHT: "right",
        POSITION_BOTTOM: "bottom",
        POSITION_LEFT: "left",
        POSITION_CENTER: "center",
        POSITION_MIDDLE: "middle",
        POSITION_START: "start",
        POSITION_END: "end",
        FC_CONFIG_STRING: "_FCconf",
        SHAPE_RECT: "rect",
        HUNDREDSTRING: "100",
        PXSTRING: "px",
        COMMASPACE: ", ",
        TEXTANCHOR: "text-anchor",
        TOUCH_THRESHOLD_PIXELS: 15,
        CLICK_THRESHOLD_PIXELS: 5,
        regex: {
            stripWhitespace: K, dropHash: b,
            startsRGBA: G, cleanColorCode: a, breakPlaceholder: l, hexcode: /^#?[0-9a-f]{6}/i
        },
        fireEvent: function (a, c, b, k) {
            s.dem.fire(a, c, b, k)
        },
        plotEventHandler: function (a, c, b) {
            c = c || {};
            var k = c.type, e = I(a.container, c), e = Ga(e, this.data("eventArgs")), t = a.logic.fireGroupEvent, g = this.data("groupId"), q = function (a, b) {
                c.FusionChartsPreventEvent = !0;
                p && b.toolText && s.toolTip && s.toolTip.preventTooltip()
            };
            "index"in e && !("dataIndex"in e) && (e.dataIndex = e.index);
            "value"in e && !("dataValue"in e) && (e.dataValue = e.value);
            b = ea(b, "dataplotclick").toLowerCase();
            "dataplotrollover" === b ? (c.FusionChartsPreventEvent = !1, t ? d.raiseEventGroup(g, b, e, a.fusionCharts, void 0, void 0, q) : d.raiseEvent(b, e, a.logic.chartInstance, void 0, void 0, q)) : t && "dataplotclick" !== b ? d.raiseEventGroup(g, b, e, a.fusionCharts) : d.raiseEvent(b, e, a.logic.chartInstance);
            "click" !== k && "mouseup" !== k && "touchend" !== k || "dataplotclick" !== b || a.linkClickFN.call({link: e.link}, a)
        },
        getEventCoordinate: L,
        getMouseCoordinate: I,
        addEvent: pa,
        removeEvent: Z,
        getTouchEvent: ma,
        extend2: Ga,
        deltend: function (a, c) {
            if ("object" !== typeof a || "object" !== typeof c)return null;
            qa(a, c);
            return a
        },
        imprint: function (a, c, b) {
            var k;
            if ("object" !== typeof a || null === a)return c;
            if ("object" !== typeof c || null === c)return a;
            for (k in c)if (void 0 === a[k] || !b && null === a[k])a[k] = c[k];
            return a
        },
        pluck: ea,
        pluckNumber: t,
        getFirstDefinedValue: function () {
            var a, c, b;
            c = 0;
            for (b = arguments.length; c < b; c += 1)if ((a = arguments[c]) || !1 === a || 0 === a || "" == a)return a
        },
        createElement: function (a, c, b) {
            a = D.createElement(a);
            for (var k in c)a.setAttribute(k, c[k]);
            b && b.appendChild && b.appendChild(a);
            return a
        },
        hashify: fa,
        pluckFontSize: function () {
            var a, c, b;
            c = 0;
            for (b = arguments.length; c < b; c += 1)if (((a = arguments[c]) || !1 === a || 0 === a) && !isNaN(a = Number(a)))return 1 > a ? 1 : a;
            return 1
        },
        getValidValue: la,
        getPosition: ba,
        getViewPortDimension: q,
        bindSelectionEvent: function (a, c) {
            c = c || {};
            var b = a.options.chart, k = a.container, e = b.zoomType, d = Ga({}, c.attr || {}), g = d["stroke-width"] = t(d.strokeWidth, d["stroke-width"], 1), q = ba(k), h = a.eventListeners || (a.eventListeners = []);
            c = Ga({
                chart: a,
                zoomX: /x/.test(e),
                zoomY: /y/.test(e),
                canvasY: a.canvasTop,
                canvasX: a.canvasLeft,
                canvasW: a.canvasWidth,
                canvasH: a.canvasHeight,
                canvasX2: a.canvasLeft + a.canvasWidth,
                canvasY2: a.canvasTop + a.canvasHeight,
                strokeWidth: g,
                chartPosLeft: q.left,
                chartPosTop: q.top,
                attr: d
            }, c);
            d.stroke = ga(d.stroke, "rgba(51,153,255,0.8)");
            d.fill = ga(d.fill, "rgba(185,213,241,0.3)");
            d.ishot = !0;
            k && (Z(k, "pointerdrag", $), h.push(pa(k, "pointerdrag", $, c)));
            b.link && (Z(a.container, "mouseup mousedown", U), h.push(pa(a.container, "mouseup mousedown", U, c)))
        },
        createContextMenu: function (a) {
            var c = a.chart, b = c.smartLabel,
                k = c.logic.hcJSON && c.logic.hcJSON.chart.useRoundEdges, e = s.Raphael, t = function (a) {
                    var c = a.menufillcolor && fa(a.menufillcolor), b = a.menulabelcolor && fa(a.menulabelcolor), u = a.menufillhovercolor && fa(a.menufillhovercolor);
                    a = a.menulabelhovercolor && fa(a.menulabelhovercolor);
                    return {attrs: {backgroundColor: c, color: b}, hover: {backgroundColor: u, color: a}}
                }(c.definition.chart), d = function (a, c, b) {
                    c = c || {};
                    a = (a = (a = a && e.tintshade(a.color, .7)) && e.getRGB(a)) && "rgb(" + [a.r, a.g, a.b].join() + ")";
                    return {
                        backgroundColor: c.backgroundHoverColor ||
                        b.backgroundColor || a || "rgb(64, 64, 64)", color: c.hoverColor || b.color || "#FFFFFF"
                    }
                }(a.basicStyle, a.hover, t.hover), g = function (a, c, b) {
                    c = Ga({}, c || {});
                    c = Ga(c, a);
                    return {
                        fontFamily: c.fontFamily || "Verdana,sans",
                        fontSize: c.fontSize || "10px",
                        color: c.color || b.color || "#000000",
                        backgroundColor: c.backgroundColor || b.backgroundColor || "rgb(255, 255, 255)"
                    }
                }(a.basicStyle, a.attrs, t.attrs), q = {
                    textAlign: "left",
                    align: "left",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    paddingTop: "5px",
                    cursor: "pointer",
                    borderWidth: "0px"
                }, h = a.items,
                R = a.position, E = a.verticalPadding || 3, n = a.horizontalPadding || 6, C = {}, l, w, L, Y, z, m, I, la, M, H, P, xa, G;
            if (c)l = ba(c.container); else return !1;
            Y = function () {
                var a = C.items, c = a.length, r = 0, u = 0, B = 0, F, f;
                C.menuItems || (C.menuItems = []);
                for (b.setStyle(g); c--;)F = a[c], F = b.getOriSize(F.text), B || (B = F.height + 2 * E), r += B, u = J(u, F.width + 2 * n);
                C.height = r;
                C.width = u;
                C.itemH = B;
                this.style.width = u + "px";
                C.menuRect || (r = C.menuRect = D.createElement("div"), r.style.border = "1px solid rgb(100, 100, 100)", k && (r.style.mozBorderRadius = "4px", r.style.webkitBorderRadius =
                    "4px", r.style.borderRadius = "4px", r.style.overflow = "hidden"), p && !v ? r.style.filter = "progid:DXImageTransform.Microsoft.Shadow(Color=#999999,direction=135,strength=3)" : (r.style.mozBoxShadow = "3px 3px 3px #999", r.style.webkitBoxShadow = "3px 3px 3px #999", r.style.boxShadow = "3px 3px 3px #999"), this.appendChild(r));
                u = a.length;
                for (c = 0; c < u; c += 1)if (F = a[c], C.menuItems[c])C.menuItems[c].label.innerHTML = F.text; else {
                    C.menuItems[c] = {};
                    r = C.menuItems[c].box = D.createElement("div");
                    r.style.height = B + "px";
                    r.style.lineHeight =
                        B + "px";
                    for (f in q)r.style[f] = q[f];
                    for (f in g)r.style[f] = g[f];
                    C.menuRect.appendChild(r);
                    r.innerHTML = F.text;
                    s.dem.listen(r, "click", G);
                    s.dem.listen(r, "pointerhover", H);
                    C.menuItems[c].box._itemIdx = c
                }
                for (; C.menuItems[c];)C.menuItems[c].box.parentNode.removeChild(C.menuItems[c].box), C.menuItems.splice(c, 1)
            };
            z = function () {
                L || (L = D.createElement("div"), L.style.position = "absolute", L.style.zIndex = "50", L.style.display = "none", c.container.appendChild && c.container.appendChild(L));
                return L
            };
            m = function () {
                w = setTimeout(C.hide,
                    800)
            };
            I = function () {
                w && clearTimeout(w)
            };
            la = function (a) {
                var b = a.x;
                a = a.y;
                var r = {x: b, y: a}, u = C.width, B = C.height, k = c.chartHeight, f = c.chartWidth;
                b + u > f && 0 < b - u ? r.x -= u : b + u > f && (r.x = 0);
                a + B > k && 0 < a - B && (r.y -= B);
                return r
            };
            M = function () {
                C.hide()
            };
            H = function (a) {
                a.target && a.target.parentNode && ("start" === a.state ? P : xa).call(a.target)
            };
            P = function () {
                var a = C.menuItems[this._itemIdx], c;
                I();
                for (c in d)a.box.style[c] = d[c]
            };
            xa = function () {
                var a = C.menuItems[this._itemIdx], c;
                for (c in g)a.box.style[c] = g[c];
                m()
            };
            G = function (a) {
                var c =
                    C.items[this._itemIdx];
                c.onclick && c.onclick.call(c, a);
                a.originalEvent.stopPropagation ? a.originalEvent.stopPropagation() : a.originalEvent.cancelBubble = !0;
                C.hide()
            };
            C.showItem = function (a) {
                a = this.menuItems[a];
                var c = this.height, b = this.itemH;
                a && a._isHidden && (a.box.style.display = "", this.height = c + b, a._isHidden = !1, a = la(R), this.left = a.x, this.top = a.y)
            };
            C.hideItem = function (a) {
                a = this.menuItems[a];
                var c = this.height, b = this.itemH;
                a && !a._isHidden && (a.box.style.display = "none", this.height = c - b, a._isHidden = !0, a = la(R),
                    this.left = a.x, this.top = a.y)
            };
            C.redraw = function () {
                var a = this.menuContainer;
                this.items = h;
                a ? Y.call(this.menuContainer) : R && void 0 !== R.x && void 0 !== R.y ? (this.menuContainer = z(), Y.call(this.menuContainer), a = la(R), this.left = a.x, this.top = a.y, this.menuContainer.style.left = this.left + "px", this.menuContainer.style.top = this.top + "px") : (this.menuContainer = z(), Y.call(this.menuContainer))
            };
            C.show = function (a) {
                var c = this;
                a && void 0 !== a.x && void 0 !== a.y ? (a = la(a), c.menuContainer.style.left = a.x + "px", c.menuContainer.style.top =
                    a.y + "px") : (c.menuContainer.style.left = c.left + "px", c.menuContainer.style.top = c.top + "px");
                c.menuContainer.style.display = "";
                setTimeout(function () {
                    c.visible = !0;
                    e.click(M)
                }, 400)
            };
            C.hide = function () {
                this.visible && (this.visible = !1, C.menuContainer.style.display = "none", C.menuContainer.style.left = -C.width + "px", C.menuContainer.style.top = -C.height + "px", e.unclick(M))
            };
            C.update = function (a) {
                a && a.length && (this.items = a, this.redraw())
            };
            C.updatePosition = function (a) {
                var b = l.left, r = l.top;
                l = ba(c.container);
                a ? (R = a, a = la(a),
                    this.left = a.x, this.top = a.y) : (this.left -= b - l.left, this.top -= r - l.top)
            };
            C.add = function (a) {
                var c = this.menuItems, r = c.length, u;
                b.setStyle(g);
                this.width = J(this.width, b.getOriSize(a.text).width);
                c[r] = {};
                c = c[r].box = D.createElement("div");
                c.style.height = this.itemH + "px";
                c.style.lineHeight = this.itemH + "px";
                for (u in q)c.style[u] = q[u];
                for (u in g)c.style[u] = g[u];
                C.menuRect.appendChild(c);
                c.innerHTML = a.text;
                s.dem.listen(c, "click", G);
                s.dem.listen(c, "pointerhover", H);
                C.menuItems[r].box._itemIdx = r;
                this.height += this.itemH
            };
            C.removeItems = function () {
                for (var a = this.menuItems, c = a && a.length, b; c--;)b = a[c], s.dem.unlisten(b.box, "click", G), s.dem.unlisten(b.box, "pointerhover", H), b.box && b.box.parentNode && b.box.parentNode.removeChild(b.box);
                delete this.menuItems;
                delete this.items
            };
            C.setPosition = function (a) {
                void 0 !== a.x && void 0 !== a.y && (this.menuContainer.style.x = a.x, this.menuContainer.style.y = a.y)
            };
            C.destroy = function () {
                this.removeItems();
                this.menuContainer.parentNode.removeChild(this.menuContainer)
            };
            h && h.length && (C.redraw(), C.hide());
            return C
        },
        getDefinedColor: function (a, c) {
            return a || 0 === a || "" === a ? a : c
        },
        getFirstValue: ga,
        getFirstColor: function (a) {
            a = a.split(",")[0];
            a = a.replace(K, "");
            "" == a && (a = "000000");
            return a.replace(b, "#")
        },
        getColorCodeString: function (a, c) {
            var b = "", k, e, t = 0, d = c.split(",");
            for (e = d.length; t < e; t += 1)k = d[t].split("-"), b = 2 === k.length ? "-1" !== k[0].indexOf("dark") ? b + (Ea(a, 100 - parseInt(k[1], 10)) + ",") : b + (Za(a, 100 - parseInt(k[1], 10)) + ",") : b + (d[t] + ",");
            return b.substring(0, b.length - 1)
        },
        pluckColor: function (a) {
            if (la(a))return a =
                a.split(",")[0], a = a.replace(K, ""), "" == a && (a = "000000"), a.replace(b, "#")
        },
        toRaphaelColor: Ra,
        gradientify: ib,
        trimString: function (a) {
            a = a.replace(/^\s\s*/, "");
            for (var c = /\s/, b = a.length; c.test(a.charAt(b -= 1)););
            return a.slice(0, b + 1)
        },
        getFirstAlpha: function (a) {
            a = parseInt(a, 10);
            if (isNaN(a) || 100 < a || 0 > a)a = 100;
            return a
        },
        parsePointValue: R,
        parseUnsafeString: Y,
        parseTooltext: E,
        toPrecision: function (a, c) {
            var b = z(10, c);
            return g(a * b) / b
        },
        hasTouch: n,
        CREDIT_HREF: M,
        CREDIT_STRING: "",
        getSentenceCase: function (a) {
            a =
                a || "";
            return a.charAt(0).toUpperCase() + a.substr(1)
        },
        getCrispValues: function (a, c, b) {
            var k = b % 2 / 2;
            b = g(a + k) - k;
            a = g(a + c + k) - k - b;
            return {position: b, distance: a}
        },
        regescape: function (a) {
            return a && a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        regReplaceEscape: Ba,
        isArray: xa,
        stubFN: function () {
        },
        falseFN: function () {
            return !1
        },
        stableSort: function (a, c) {
            var b = a.length, k;
            for (k = 0; k < b; k++)a[k].ssI = k;
            a.sort(function (a, b) {
                var k = c(a, b);
                return 0 === k ? a.ssI - b.ssI : k
            });
            for (k = 0; k < b; k++)delete a[k].ssI
        },
        hasSVG: v,
        isIE: p,
        lineHeightFactor: 1.2,
        getLinkAction: function (a, c) {
            var b = function (a) {
                return a
            };
            return function () {
                var k = t((a.chart || a.map || {}).unescapelinks, 1), e = ga(this.link, ""), g = ea(e, this.options && this.options.chart && this.options.chart.link || "", this.series && this.series.chart && this.series.chart.options && this.series.chart.options.chart && this.series.chart.options.chart.link || ""), q = g, h, R, E, C, n, l, w, s, L, p;
                void 0 !== g && (k && (g = m.decodeURIComponent ? m.decodeURIComponent(g) : m.unescape(g)), g = g.replace(/^\s+/, "").replace(/\s+$/, ""), -1 !== g.search(/^[a-z]*\s*[\-\:]\s*/i) &&
                (n = g.split(/\s*[\-\:]\s*/)[0].toLowerCase(), p = n.length), setTimeout(function () {
                    switch (n) {
                        case "j":
                            g = g.replace(/^j\s*\-/i, "j-");
                            h = g.indexOf("-", 2);
                            -1 === h ? za(g.slice(2)) : za(g.substr(2, h - 2).replace(/\s/g, ""), g.slice(h + 1));
                            break;
                        case "javascript":
                            ya(g.replace(/^javascript\s*\:/i, ""));
                            break;
                        case "n":
                            g.replace(/^n\s*\-/i, "n-");
                            m.open(b(g.slice(2), k));
                            break;
                        case "f":
                            g = g.replace(/^f\s*\-/i, "f-");
                            h = g.indexOf("-", 2);
                            -1 !== h ? (R = g.substr(2, h - 2)) && m.frames[R] ? m.frames[R].location = b(g.slice(h + 1), k) : m.open(b(g.slice(h +
                            1), k), R) : m.open(b(g.slice(2), k));
                            break;
                        case "p":
                            g = g.replace(/p\s*\-/i, "p-");
                            h = g.indexOf("-", 2);
                            E = g.indexOf(",", 2);
                            -1 === h && (h = 1);
                            C = b(g.slice(h + 1), k);
                            m.open(C, g.substr(2, E - 2), g.substr(E + 1, h - E - 1)).focus();
                            break;
                        case "newchart":
                        case "newmap":
                            ":" === g.charAt(p) && (h = g.indexOf("-", p + 1), L = g.substring(p + 1, h), p = h);
                            h = g.indexOf("-", p + 1);
                            l = g.substring(p + 1, h).toLowerCase();
                            switch (l) {
                                case "xmlurl":
                                case "jsonurl":
                                    s = g.substring(h + 1, g.length);
                                    break;
                                case "xml":
                                case "json":
                                    var e = w = g.substring(h + 1, g.length), t = {chart: {}},
                                        Y, e = e.toLowerCase();
                                    if (a.linkeddata)for (Y = 0; Y < a.linkeddata.length; Y += 1)a.linkeddata[Y].id.toLowerCase() === e && (t = a.linkeddata[Y].linkedchart || a.linkeddata[Y].linkedmap);
                                    s = t;
                                    l = "json"
                            }
                            d.raiseEvent("linkedChartInvoked", {alias: L, linkType: l.toUpperCase(), data: s}, c);
                            break;
                        default:
                            m.location.href = g
                    }
                    d.raiseEvent("linkClicked", {linkProvided: q, linkInvoked: g, linkAction: n && n.toLowerCase()}, c)
                }, 0))
            }
        },
        graphics: {
            parseAlpha: V, convertColor: oa, getDarkColor: Za, getLightColor: Ea, mapSymbolName: function (a, c) {
                var b = "circle";
                a = R(a);
                3 <= a && (b = (c ? "spoke_" : "poly_") + a);
                return b
            }, getColumnColor: function (a, c, b, k, e, t, g, d, h) {
                var q, R;
                q = a.split(",");
                R = c.split(",");
                t = t.split(",");
                g = g.split(",");
                a = a.replace(/\s/g, "").replace(/\,$/, "");
                h ? d = {
                    FCcolor: {
                        color: q[0],
                        alpha: R[0]
                    }
                } : e ? (a = q[0], R = R[0], d = {
                    FCcolor: {
                        color: Za(a, 75) + "," + Ea(a, 10) + "," + Za(a, 90) + "," + Ea(a, 55) + "," + Za(a, 80),
                        alpha: R + "," + R + "," + R + "," + R + "," + R,
                        ratio: "0,11,14,57,18",
                        angle: d ? "90" : "0"
                    }
                }, t = [Za(a, 70)]) : (c = V(c, q.length), d = {
                    FCcolor: {
                        color: a,
                        alpha: c,
                        ratio: b,
                        angle: d ? -k : k
                    }
                });
                return [d, {
                    FCcolor: {
                        color: t[0],
                        alpha: g[0]
                    }
                }]
            }, getAngle: function (a, c, b) {
                a = 180 * Math.atan(c / a) / Math.PI;
                2 == b ? a = 180 - a : 3 == b ? a += 180 : 4 == b && (a = 360 - a);
                return a
            }, parseColor: Da, getValidColor: function (a) {
                return P.test(Da(a)) && a
            }, HSBtoRGB: function (a) {
                var c = a[0], b = 0, k = 0, e = 0, t = [], t = a[1] / 100;
                a = a[2] / 100;
                var d = c / 60 - Math.floor(c / 60), q = a * (1 - t), h = a * (1 - d * t), t = a * (1 - (1 - d) * t);
                switch (Math.floor(c / 60) % 6) {
                    case 0:
                        b = a;
                        k = t;
                        e = q;
                        break;
                    case 1:
                        b = h;
                        k = a;
                        e = q;
                        break;
                    case 2:
                        b = q;
                        k = a;
                        e = t;
                        break;
                    case 3:
                        b = q;
                        k = h;
                        e = a;
                        break;
                    case 4:
                        b = t;
                        k = q;
                        e = a;
                        break;
                    case 5:
                        b = a, k = q, e = h
                }
                return t =
                    [g(255 * b), g(255 * k), g(255 * e)]
            }, RGBtoHSB: function (a) {
                var c = a[0], b = a[1];
                a = a[2];
                var k = Math.max(Math.max(c, b), a), e = Math.min(Math.min(c, b), a), t = 0, d = 0;
                k == e ? t = 0 : k == c ? t = (60 * (b - a) / (k - e) + 360) % 360 : k == b ? t = 60 * (a - c) / (k - e) + 120 : k == a && (t = 60 * (c - b) / (k - e) + 240);
                d = 0 === k ? 0 : (k - e) / k;
                return [g(t), g(100 * d), g(k / 255 * 100)]
            }, RGBtoHex: function (a) {
                return ("000000" + (a[0] << 16 | a[1] << 8 | a[2]).toString(16)).slice(-6)
            }, HEXtoRGB: Ka
        },
        setImageDisplayMode: function (a, c, b, k, e, t, g, d) {
            var q = k / 100 * d.width;
            k = k / 100 * d.height;
            d = {};
            var h, R = t - 2 * e;
            h = g - 2 *
            e;
            var E = function (a, c, b, k, t, d) {
                var g = {};
                switch (a) {
                    case "top":
                        g.y = e;
                        break;
                    case "bottom":
                        g.y = d - k - e;
                        break;
                    case "middle":
                        g.y = (d - k) / 2
                }
                switch (c) {
                    case "left":
                        g.x = e;
                        break;
                    case "right":
                        g.x = t - b - e;
                        break;
                    case "middle":
                        g.x = (t - b) / 2
                }
                return g
            };
            switch (a) {
                case "center":
                    d.width = q;
                    d.height = k;
                    d.y = g / 2 - k / 2;
                    d.x = t / 2 - q / 2;
                    break;
                case "stretch":
                    d.width = t - 2 * e;
                    d.height = g - 2 * e;
                    d.y = e;
                    d.x = e;
                    break;
                case "tile":
                    d.width = q;
                    d.height = k;
                    d.tileInfo = {};
                    d.tileInfo.xCount = a = Math.ceil(R / q);
                    d.tileInfo.yCount = h = Math.ceil(h / k);
                    c = E(c, b, q * a, k * h, t, g);
                    d.y = c.y;
                    d.x = c.x;
                    break;
                case "fit":
                    a = q / k > R / h ? R / q : h / k;
                    d.width = q * a;
                    d.height = k * a;
                    c = E(c, b, d.width, d.height, t, g);
                    d.y = c.y;
                    d.x = c.x;
                    break;
                case "fill":
                    a = q / k > R / h ? h / k : R / q;
                    d.width = q * a;
                    d.height = k * a;
                    c = E(c, b, d.width, d.height, t, g);
                    d.y = c.y;
                    d.x = c.x;
                    break;
                default:
                    c = E(c, b, q, k, t, g), d.width = q, d.height = k, d.y = c.y, d.x = c.x
            }
            return d
        },
        setLineHeight: Xa,
        parsexAxisStyles: Ca,
        supportedStyle: {
            font: "font",
            fontFamily: "font-family",
            "font-family": "font-family",
            fontWeight: "font-weight",
            "font-weight": "font-weight",
            fontSize: "font-size",
            "font-size": "font-size",
            lineHeight: "line-height",
            "line-height": "line-height",
            textDecoration: "text-decoration",
            "text-decoration": "text-decoration",
            color: "color",
            whiteSpace: "white-space",
            "white-space": "white-space",
            padding: "padding",
            margin: "margin",
            background: "background",
            backgroundColor: "background-color",
            "background-color": "background-color",
            backgroundImage: "background-image",
            "background-image": "background-image",
            backgroundPosition: "background-position",
            "background-position": "background-position",
            backgroundPositionLeft: "background-position-left",
            "background-position-left": "background-position-left",
            backgroundPositionTop: "background-position-top",
            "background-position-top": "background-position-top",
            backgroundRepeat: "background-repeat",
            "background-repeat": "background-repeat",
            border: "border",
            borderColor: "border-color",
            "border-color": "border-color",
            borderStyle: "border-style",
            "border-style": "border-style",
            borderThickness: "border-thickness",
            "border-thickness": "border-thickness",
            borderTop: "border-top",
            "border-top": "border-top",
            borderTopColor: "border-top-color",
            "border-top-color": "border-top-color",
            borderTopStyle: "border-top-style",
            "border-top-style": "border-top-style",
            borderTopThickness: "border-top-thickness",
            "border-top-thickness": "border-top-thickness",
            borderRight: "border-right",
            "border-right": "border-right",
            borderRightColor: "border-right-color",
            "border-right-color": "border-right-color",
            borderRightStyle: "border-right-style",
            "border-right-style": "border-right-style",
            borderRightThickness: "border-right-thickness",
            "border-right-thickness": "border-right-thickness",
            borderBottom: "border-bottom",
            "border-bottom": "border-bottom",
            borderBottomColor: "border-bottom-color",
            "border-bottom-color": "border-bottom-color",
            borderBottomStyle: "border-bottom-style",
            "border-bottom-style": "border-bottom-style",
            borderBottomThickness: "border-bottom-thickness",
            "border-bottom-thickness": "border-bottom-thickness",
            borderLeft: "border-left",
            "border-left": "border-left",
            borderLeftColor: "border-left-color",
            "border-left-color": "border-left-color",
            borderLeftStyle: "border-left-style",
            "border-left-Style": "border-left-style",
            borderLeftThickness: "border-left-thickness",
            "border-left-thickness": "border-left-thickness"
        },
        getAxisLimits: Fb,
        createTrendLine: sb,
        getDashStyle: db,
        axisLabelAdder: yb,
        chartAPI: k,
        createDialog: vb,
        isCanvasElemSupported: function () {
            var a = D.createElement("canvas");
            return !(!a.getContext || !a.getContext("2d"))
        }
    })
}]);
window.FusionCharts && window.FusionCharts.register("module", ["private", "vendor.redraphael", function () {
    var d = this.hcLib, m = window.Raphael, D;
    (function () {
        (function (d, p) {
            var c = /[\.\/]/, m = function () {
            }, b = function (a, c) {
                return a - c
            }, G, a, l = {n: {}}, P = function (c, d) {
                c = String(c);
                var g = a, e = Array.prototype.slice.call(arguments, 2), h = P.listeners(c), n = 0, l, p = [], q = {}, m = [], w = G;
                G = c;
                for (var v = a = 0, s = h.length; v < s; v++)"zIndex"in h[v] && (p.push(h[v].zIndex), 0 > h[v].zIndex && (q[h[v].zIndex] = h[v]));
                for (p.sort(b); 0 > p[n];)if (l = q[p[n++]],
                        m.push(l.apply(d, e)), a)return a = g, m;
                for (v = 0; v < s; v++)if (l = h[v], "zIndex"in l)if (l.zIndex == p[n]) {
                    m.push(l.apply(d, e));
                    if (a)break;
                    do if (n++, (l = q[p[n]]) && m.push(l.apply(d, e)), a)break; while (l)
                } else q[l.zIndex] = l; else if (m.push(l.apply(d, e)), a)break;
                a = g;
                G = w;
                return m.length ? m : null
            };
            P._events = l;
            P.listeners = function (a) {
                a = a.split(c);
                var b = l, d, e, h, n, p, m, q, J = [b], w = [];
                h = 0;
                for (n = a.length; h < n; h++) {
                    q = [];
                    p = 0;
                    for (m = J.length; p < m; p++)for (b = J[p].n, d = [b[a[h]], b["*"]], e = 2; e--;)if (b = d[e])q.push(b), w = w.concat(b.f || []);
                    J = q
                }
                return w
            };
            P.on = function (a, b) {
                a = String(a);
                if ("function" != typeof b)return function () {
                };
                for (var d = a.split(c), e = l, h = 0, n = d.length; h < n; h++)e = e.n, e = e.hasOwnProperty(d[h]) && e[d[h]] || (e[d[h]] = {n: {}});
                e.f = e.f || [];
                h = 0;
                for (n = e.f.length; h < n; h++)if (e.f[h] == b)return m;
                e.f.push(b);
                return function (a) {
                    +a == +a && (b.zIndex = +a)
                }
            };
            P.f = function (a) {
                var c = [].slice.call(arguments, 1);
                return function () {
                    P.apply(null, [a, null].concat(c).concat([].slice.call(arguments, 0)))
                }
            };
            P.stop = function () {
                a = 1
            };
            P.nt = function (a) {
                return a ? (new RegExp("(?:\\.|\\/|^)" +
                a + "(?:\\.|\\/|$)")).test(G) : G
            };
            P.nts = function () {
                return G.split(c)
            };
            P.off = P.unbind = function (a, b) {
                if (a) {
                    var d = a.split(c), e, h, n, p, m, q, J = [l];
                    p = 0;
                    for (m = d.length; p < m; p++)for (q = 0; q < J.length; q += n.length - 2) {
                        n = [q, 1];
                        e = J[q].n;
                        if ("*" != d[p])e[d[p]] && n.push(e[d[p]]); else for (h in e)e.hasOwnProperty(h) && n.push(e[h]);
                        J.splice.apply(J, n)
                    }
                    p = 0;
                    for (m = J.length; p < m; p++)for (e = J[p]; e.n;) {
                        if (b) {
                            if (e.f) {
                                q = 0;
                                for (d = e.f.length; q < d; q++)if (e.f[q] == b) {
                                    e.f.splice(q, 1);
                                    break
                                }
                                !e.f.length && delete e.f
                            }
                            for (h in e.n)if (e.n.hasOwnProperty(h) &&
                                e.n[h].f) {
                                n = e.n[h].f;
                                q = 0;
                                for (d = n.length; q < d; q++)if (n[q] == b) {
                                    n.splice(q, 1);
                                    break
                                }
                                !n.length && delete e.n[h].f
                            }
                        } else for (h in delete e.f, e.n)e.n.hasOwnProperty(h) && e.n[h].f && delete e.n[h].f;
                        e = e.n
                    }
                } else P._events = l = {n: {}}
            };
            P.once = function (a, c) {
                var b = function () {
                    P.unbind(a, b);
                    return c.apply(this, arguments)
                };
                return P.on(a, b)
            };
            P.version = "0.4.2";
            P.toString = function () {
                return "You are running Eve 0.4.2"
            };
            "undefined" != typeof module && module.exports ? module.exports = P : p || "undefined" == typeof define ? d.eve = P : define("eve",
                [], function () {
                    return P
                })
        })(this, !0);
        (function (d, p, c) {
            !c && "function" === typeof define && define.amd ? define(["eve"], function (c) {
                return p(d, c)
            }) : p(d, d.eve)
        })(this, function (d, p) {
            function c(a) {
                var b, f;
                c._url = "";
                if (c.is(a, "function"))return n ? a() : p.on("raphael.DOMload", a);
                if (c.is(a, q))return c._engine.create[M](c, a.splice(0, 3 + c.is(a[0], H))).add(a);
                b = Array.prototype.slice.call(arguments, 0);
                return c.is(b[b.length - 1], "function") ? (f = b.pop(), n ? f.call(c._engine.create[M](c, b)) : p.on("raphael.DOMload", function () {
                    f.call(c._engine.create[M](c,
                        b))
                })) : c._engine.create[M](c, arguments)
            }

            function m() {
                return this.hex
            }

            function b(a, c) {
                for (var b = [], f = 0, r = a.length; r - 2 * !c > f; f += 2) {
                    var u = [{x: +a[f - 2], y: +a[f - 1]}, {x: +a[f], y: +a[f + 1]}, {
                        x: +a[f + 2],
                        y: +a[f + 3]
                    }, {x: +a[f + 4], y: +a[f + 5]}];
                    c ? f ? r - 4 == f ? u[3] = {x: +a[0], y: +a[1]} : r - 2 == f && (u[2] = {
                        x: +a[0],
                        y: +a[1]
                    }, u[3] = {x: +a[2], y: +a[3]}) : u[0] = {
                        x: +a[r - 2],
                        y: +a[r - 1]
                    } : r - 4 == f ? u[3] = u[2] : f || (u[0] = {x: +a[f], y: +a[f + 1]});
                    b.push(["C", (-u[0].x + 6 * u[1].x + u[2].x) / 6, (-u[0].y + 6 * u[1].y + u[2].y) / 6, (u[1].x + 6 * u[2].x - u[3].x) / 6, (u[1].y + 6 * u[2].y - u[3].y) /
                    6, u[2].x, u[2].y])
                }
                return b
            }

            function G(a, c, b, f, r, u, k, B, F) {
                null == F && (F = 1);
                F = (1 < F ? 1 : 0 > F ? 0 : F) / 2;
                for (var e = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], d = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], t = 0, g = 0; 12 > g; g++)var A = F * e[g] + F, O = A * (A * (-3 * a + 9 * b - 9 * r + 3 * k) + 6 * a - 12 * b + 6 * r) - 3 * a + 3 * b, A = A * (A * (-3 * c + 9 * f - 9 * u + 3 * B) + 6 * c - 12 * f + 6 * u) - 3 * c + 3 * f, t = t + d[g] * za(O * O + A * A);
                return F * t
            }

            function a(a, c, b, f, r, u, k, B, F) {
                if (!(0 > F || G(a, c, b, f, r, u, k, B) < F)) {
                    var e = .5, d = 1 - e, t;
                    for (t =
                             G(a, c, b, f, r, u, k, B, d); .01 < xa(t - F);)e /= 2, d += (t < F ? 1 : -1) * e, t = G(a, c, b, f, r, u, k, B, d);
                    return d
                }
            }

            function l(a, b, f) {
                a = c._path2curve(a);
                b = c._path2curve(b);
                for (var r, u, k, B, F, e, d, t, g, A, O = f ? 0 : [], q = 0, h = a.length; q < h; q++)if (g = a[q], "M" == g[0])r = F = g[1], u = e = g[2]; else {
                    "C" == g[0] ? (g = [r, u].concat(g.slice(1)), r = g[6], u = g[7]) : (g = [r, u, r, u, F, e, F, e], r = F, u = e);
                    for (var X = 0, R = b.length; X < R; X++)if (A = b[X], "M" == A[0])k = d = A[1], B = t = A[2]; else {
                        "C" == A[0] ? (A = [k, B].concat(A.slice(1)), k = A[6], B = A[7]) : (A = [k, B, k, B, d, t, d, t], k = d, B = t);
                        var E;
                        var Ma = g,
                            n = A;
                        E = f;
                        var l = c.bezierBBox(Ma), p = c.bezierBBox(n);
                        if (c.isBBoxIntersect(l, p)) {
                            for (var l = G.apply(0, Ma), p = G.apply(0, n), l = Y(~~(l / 5), 1), p = Y(~~(p / 5), 1), w = [], s = [], T = {}, va = E ? 0 : [], L = 0; L < l + 1; L++) {
                                var pb = c.findDotsAtSegment.apply(c, Ma.concat(L / l));
                                w.push({x: pb.x, y: pb.y, t: L / l})
                            }
                            for (L = 0; L < p + 1; L++)pb = c.findDotsAtSegment.apply(c, n.concat(L / p)), s.push({
                                x: pb.x,
                                y: pb.y,
                                t: L / p
                            });
                            for (L = 0; L < l; L++)for (Ma = 0; Ma < p; Ma++) {
                                var ub = w[L], ua = w[L + 1], n = s[Ma], pb = s[Ma + 1], Aa = .001 > xa(ua.x - ub.x) ? "y" : "x", m = .001 > xa(pb.x - n.x) ? "y" : "x", qb;
                                qb =
                                    ub.x;
                                var S = ub.y, I = ua.x, tc = ua.y, ac = n.x, z = n.y, J = pb.x, la = pb.y;
                                if (Y(qb, I) < C(ac, J) || C(qb, I) > Y(ac, J) || Y(S, tc) < C(z, la) || C(S, tc) > Y(z, la))qb = void 0; else {
                                    var W = (qb * tc - S * I) * (ac - J) - (qb - I) * (ac * la - z * J), H = (qb * tc - S * I) * (z - la) - (S - tc) * (ac * la - z * J), ka = (qb - I) * (z - la) - (S - tc) * (ac - J);
                                    if (ka) {
                                        var W = W / ka, H = H / ka, ka = +W.toFixed(2), Hc = +H.toFixed(2);
                                        qb = ka < +C(qb, I).toFixed(2) || ka > +Y(qb, I).toFixed(2) || ka < +C(ac, J).toFixed(2) || ka > +Y(ac, J).toFixed(2) || Hc < +C(S, tc).toFixed(2) || Hc > +Y(S, tc).toFixed(2) || Hc < +C(z, la).toFixed(2) || Hc > +Y(z, la).toFixed(2) ?
                                            void 0 : {x: W, y: H}
                                    } else qb = void 0
                                }
                                qb && T[qb.x.toFixed(4)] != qb.y.toFixed(4) && (T[qb.x.toFixed(4)] = qb.y.toFixed(4), ub = ub.t + xa((qb[Aa] - ub[Aa]) / (ua[Aa] - ub[Aa])) * (ua.t - ub.t), n = n.t + xa((qb[m] - n[m]) / (pb[m] - n[m])) * (pb.t - n.t), 0 <= ub && 1.001 >= ub && 0 <= n && 1.001 >= n && (E ? va++ : va.push({
                                    x: qb.x,
                                    y: qb.y,
                                    t1: C(ub, 1),
                                    t2: C(n, 1)
                                })))
                            }
                            E = va
                        } else E = E ? 0 : [];
                        if (f)O += E; else {
                            l = 0;
                            for (p = E.length; l < p; l++)E[l].segment1 = q, E[l].segment2 = X, E[l].bez1 = g, E[l].bez2 = A;
                            O = O.concat(E)
                        }
                    }
                }
                return O
            }

            function P(a, c, b, f, r, u) {
                null != a ? (this.a = +a, this.b = +c, this.c = +b, this.d = +f, this.e = +r, this.f = +u) : (this.a = 1, this.c = this.b = 0, this.d = 1, this.f = this.e = 0)
            }

            function N() {
                return this.x + " " + this.y + " " + this.width + " × " + this.height
            }

            function z(a, c, b, f, r, u) {
                function k(a, c) {
                    var b, Sa, f, r;
                    f = a;
                    for (Sa = 0; 8 > Sa; Sa++) {
                        r = ((e * f + F) * f + B) * f - a;
                        if (xa(r) < c)return f;
                        b = (3 * e * f + 2 * F) * f + B;
                        if (1E-6 > xa(b))break;
                        f -= r / b
                    }
                    b = 0;
                    Sa = 1;
                    f = a;
                    if (f < b)return b;
                    if (f > Sa)return Sa;
                    for (; b < Sa;) {
                        r = ((e * f + F) * f + B) * f;
                        if (xa(r - a) < c)break;
                        a > r ? b = f : Sa = f;
                        f = (Sa - b) / 2 + b
                    }
                    return f
                }

                var B = 3 * c, F = 3 * (f - c) - B, e = 1 - B - F, d = 3 * b, t = 3 * (r - b) - d, g = 1 -
                    d - t;
                return function (a, c) {
                    var b = k(a, c);
                    return ((g * b + t) * b + d) * b
                }(a, 1 / (200 * u))
            }

            function g(a, c) {
                var b = [], f = {};
                this.ms = c;
                this.times = 1;
                if (a) {
                    for (var r in a)a.hasOwnProperty(r) && (f[fa(r)] = a[r], b.push(fa(r)));
                    b.sort(A)
                }
                this.anim = f;
                this.top = b[b.length - 1];
                this.percents = b
            }

            function e(a, b, f, r, u, F) {
                f = fa(f);
                var e, d, t, g, A, O, q = a.ms, h = {}, R = {}, E = {};
                if (r)for (O = 0, C = La.length; O < C; O++) {
                    var n = La[O];
                    if (n.el.id == b.id && n.anim == a) {
                        n.percent != f ? (La.splice(O, 1), t = 1) : d = n;
                        b.attr(n.totalOrigin);
                        break
                    }
                } else r = +R;
                O = 0;
                for (var C = a.percents.length; O <
                C; O++)if (a.percents[O] == f || a.percents[O] > r * a.top) {
                    f = a.percents[O];
                    A = a.percents[O - 1] || 0;
                    q = q / a.top * (f - A);
                    g = a.percents[O + 1];
                    e = a.anim[f];
                    break
                } else r && b.attr(a.anim[a.percents[O]]);
                if (e) {
                    if (d)d.initstatus = r, d.start = new Date - d.ms * r; else {
                        for (var l in e)if (e.hasOwnProperty(l) && (k.hasOwnProperty(l) || b.ca[l]))switch (h[l] = b.attr(l), null == h[l] && (h[l] = nb[l]), R[l] = e[l], k[l]) {
                            case H:
                                E[l] = (R[l] - h[l]) / q;
                                break;
                            case "colour":
                                h[l] = c.getRGB(h[l]);
                                O = c.getRGB(R[l]);
                                E[l] = {
                                    r: (O.r - h[l].r) / q, g: (O.g - h[l].g) / q, b: (O.b - h[l].b) /
                                    q
                                };
                                break;
                            case "path":
                                O = B(h[l], R[l]);
                                n = O[1];
                                h[l] = O[0];
                                E[l] = [];
                                O = 0;
                                for (C = h[l].length; O < C; O++) {
                                    E[l][O] = [0];
                                    for (var w = 1, s = h[l][O].length; w < s; w++)E[l][O][w] = (n[O][w] - h[l][O][w]) / q
                                }
                                break;
                            case "transform":
                                O = b._;
                                if (C = X(O[l], R[l]))for (h[l] = C.from, R[l] = C.to, E[l] = [], E[l].real = !0, O = 0, C = h[l].length; O < C; O++)for (E[l][O] = [h[l][O][0]], w = 1, s = h[l][O].length; w < s; w++)E[l][O][w] = (R[l][O][w] - h[l][O][w]) / q; else C = b.matrix || new P, O = {
                                    _: {transform: O.transform},
                                    getBBox: function () {
                                        return b.getBBox(1)
                                    }
                                }, h[l] = [C.a, C.b, C.c, C.d,
                                    C.e, C.f], Ma(O, R[l]), R[l] = O._.transform, E[l] = [(O.matrix.a - C.a) / q, (O.matrix.b - C.b) / q, (O.matrix.c - C.c) / q, (O.matrix.d - C.d) / q, (O.matrix.e - C.e) / q, (O.matrix.f - C.f) / q];
                                break;
                            case "csv":
                                C = I(e[l]).split(Za);
                                n = I(h[l]).split(Za);
                                if ("clip-rect" == l)for (h[l] = n, E[l] = [], O = n.length; O--;)E[l][O] = (C[O] - h[l][O]) / q;
                                R[l] = C;
                                break;
                            default:
                                for (C = [].concat(e[l]), n = [].concat(h[l]), E[l] = [], O = b.ca[l].length; O--;)E[l][O] = ((C[O] || 0) - (n[O] || 0)) / q
                        }
                        O = e.easing;
                        l = c.easing_formulas[O];
                        if (!l)if ((l = I(O).match(Xa)) && 5 == l.length) {
                            var T = l;
                            l = function (a) {
                                return z(a, +T[1], +T[2], +T[3], +T[4], q)
                            }
                        } else l = S;
                        O = e.start || a.start || +new Date;
                        n = {
                            anim: a,
                            percent: f,
                            timestamp: O,
                            start: O + (a.del || 0),
                            status: 0,
                            initstatus: r || 0,
                            stop: !1,
                            ms: q,
                            easing: l,
                            from: h,
                            diff: E,
                            to: R,
                            el: b,
                            callback: e.callback,
                            prev: A,
                            next: g,
                            repeat: F || a.times,
                            origin: b.attr(),
                            totalOrigin: u
                        };
                        La.push(n);
                        if (r && !d && !t && (n.stop = !0, n.start = new Date - q * r, 1 == La.length))return bd();
                        t && (n.start = new Date - n.ms * r);
                        1 == La.length && jd(bd)
                    }
                    p("raphael.anim.start." + b.id, b, a)
                }
            }

            function h(a) {
                for (var c = 0; c < La.length; c++)La[c].el.paper ==
                a && La.splice(c--, 1)
            }

            c.upgrade = "1.0.0";
            c.version = "2.1.0";
            c.eve = p;
            D = c;
            var n, M = "apply", H = "number", q = "array", J = Array.prototype.slice, w = Array.prototype.splice, ja = function () {
                return function () {
                }.hasOwnProperty("prototype")
            }(), s = {
                doc: document,
                win: d
            }, $ = Object.prototype.hasOwnProperty.call(s.win, "Raphael"), U = s.win.Raphael, ba = s.doc, Ba = s.win, la = c.supportsTouch = "createTouch"in ba, ga = function () {
            };
            c.ca = c.customAttributes = ga.prototype;
            var ea = function () {
                    this.ca = this.customAttributes = new ga;
                    this._CustomAttributes =
                        function () {
                        };
                    this._CustomAttributes.prototype = this.ca;
                    this._elementsById = {};
                    this.id = c._oid++;
                    p("raphael.new", this)
                }, pa = c.fn = ea.prototype = c.prototype, Z = {
                    circle: 1,
                    rect: 1,
                    path: 1,
                    ellipse: 1,
                    text: 1,
                    image: 1,
                    group: 1
                }, ma = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel".split(" "), L = c._touchMap = {
                    mousedown: "touchstart",
                    mousemove: "touchmove",
                    mouseup: "touchend"
                }, I = Ba.String, fa = Ba.parseFloat, t = Ba.parseInt, R = Ba.Math, Y = R.max, C = R.min, xa = R.abs, Pa = R.pow, Ga = R.cos,
                qa = R.sin, za = R.sqrt, ya = R.round, ta = R.PI, V = ta / 180, oa = 180 / ta, Ra = I.prototype.toLowerCase, ib = I.prototype.toUpperCase, Da = Ba.Object.prototype.toString, Za = /[, ]+/, Ea = /\{(\d+)\}/g;
            c._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i;
            var Ka = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
                Xa = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, Ca = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/, yb = /,?([achlmqrstvxz]),?/gi, Fb = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
                vb = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig, $a = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig;
            c._radial_gradient = /^x?r(?:\(([^\)]*?)\))?/;
            var sb = {NaN: 1, Infinity: 1, "-Infinity": 1}, db = {hs: 1, rg: 1}, nb = c._availableAttrs = {
                "arrow-end": "none",
                "arrow-start": "none",
                blur: 0,
                "clip-rect": "0 0 1e9 1e9",
                "clip-path": "",
                cursor: "default",
                cx: 0,
                cy: 0,
                fill: "#fff",
                "fill-opacity": 1,
                font: '10px "Arial"',
                "font-family": '"Arial"',
                "font-size": "10",
                "font-style": "normal",
                "font-weight": 400,
                gradient: 0,
                height: 0,
                href: "about:blank",
                "letter-spacing": 0,
                "line-height": 12,
                "vertical-align": "middle",
                opacity: 1,
                path: "M0,0",
                r: 0,
                rx: 0,
                ry: 0,
                src: "",
                stroke: "#000",
                "stroke-dasharray": "",
                "stroke-linecap": "butt",
                "stroke-linejoin": "butt",
                "stroke-miterlimit": 0,
                "stroke-opacity": 1,
                "stroke-width": 1,
                target: "_blank",
                "text-anchor": "middle",
                visibility: "",
                title: "",
                transform: "",
                rotation: 0,
                width: 0,
                x: 0,
                y: 0
            }, k = c._availableAnimAttrs = {
                blur: H,
                "clip-rect": "csv",
                "clip-path": "path",
                cx: H,
                cy: H,
                fill: "colour",
                "fill-opacity": H,
                "font-size": H,
                height: H,
                opacity: H,
                path: "path",
                r: H,
                rx: H,
                ry: H,
                stroke: "colour",
                "stroke-opacity": H,
                "stroke-width": H,
                transform: "transform",
                width: H,
                x: H,
                y: H
            }, E = {}, A = function (a, c) {
                return fa(a) - fa(c)
            }, T = function () {
            }, S = function (a) {
                return a
            }, W = c._rectPath = function (a, c, b, f, r) {
                return r ? [["M", a + r, c], ["l", b - 2 * r, 0], ["a", r, r, 0, 0, 1, r, r], ["l", 0, f - 2 * r], ["a", r, r, 0, 0, 1, -r, r], ["l", 2 * r - b, 0], ["a", r, r, 0, 0, 1, -r, -r], ["l", 0, 2 * r - f], ["a", r, r, 0, 0, 1, r, -r], ["z"]] : [["M", a, c], ["l", b, 0], ["l", 0, f], ["l", -b, 0], ["z"]]
            }, da = function (a, c, b, f) {
                null == f && (f = b);
                return [["M", a, c], ["m", 0, -f], ["a", b, f, 0, 1, 1, 0, 2 * f], ["a", b, f, 0, 1, 1, 0, -2 * f], ["z"]]
            }, ia = c._getPath = {
                group: function () {
                    return !1
                },
                path: function (a) {
                    return a.attr("path")
                }, circle: function (a) {
                    a = a.attrs;
                    return da(a.cx, a.cy, a.r)
                }, ellipse: function (a) {
                    a = a.attrs;
                    return da(a.cx, a.cy, a.rx, a.ry)
                }, rect: function (a) {
                    a = a.attrs;
                    return W(a.x, a.y, a.width, a.height, a.r)
                }, image: function (a) {
                    a = a.attrs;
                    return W(a.x, a.y, a.width, a.height)
                }, text: function (a) {
                    a = a._getBBox();
                    return W(a.x, a.y, a.width, a.height)
                }
            }, ha = c.mapPath = function (a, c) {
                if (!c)return a;
                var b, f, r, u, k, F, e;
                a = B(a);
                r = 0;
                for (k = a.length; r < k; r++)for (e = a[r], u = 1, F = e.length; u < F; u += 2)b = c.x(e[u], e[u +
                1]), f = c.y(e[u], e[u + 1]), e[u] = b, e[u + 1] = f;
                return a
            };
            c.pick = function () {
                for (var a, c = 0, b = arguments.length; c < b; c += 1)if ((a = arguments[c]) || !1 === a || 0 === a)return a
            };
            var Na = c._lastArgIfGroup = function (a, b) {
                var f = a.length - 1, r = a[f];
                if (r && r.constructor === c.el.constructor && "group" === r.type)return b && (a[f] = void 0, delete a[f], w.call(a, f, 1)), r
            }, sa = c._serializeArgs = function (a) {
                var b = a[0], f, r;
                if (c.is(b, "object") && !c.is(b, "array") && "group" !== b.type)for (f = b, b.path && (b = b.path) && !c.is(b, "string") && c.is(b[0], q), b = 1, r = arguments.length; b <
                r; b += 2)f[arguments[b]] || (f[arguments[b]] = arguments[b + 1]); else for (f = {}, b = 1, r = arguments.length; b < r; b += 2)f[arguments[b]] = a[(b - 1) / 2] || arguments[b + 1];
                return f
            }, na = c.merge = function (a, c, b, f, r) {
                var u, k, B, F;
                r ? (f.push(a), r.push(c)) : (f = [a], r = [c]);
                if (c instanceof Array)for (u = 0; u < c.length; u += 1) {
                    try {
                        k = a[u], B = c[u]
                    } catch (e) {
                        continue
                    }
                    if ("object" !== typeof B)b && void 0 === B || (a[u] = B); else {
                        if (null === k || "object" !== typeof k)k = a[u] = B instanceof Array ? [] : {};
                        F = checkCyclicRef(B, r);
                        -1 !== F ? k = a[u] = f[F] : na(k, B, b, f, r)
                    }
                } else for (u in c) {
                    try {
                        k =
                            a[u], B = c[u]
                    } catch (d) {
                        continue
                    }
                    if (null !== B && "object" === typeof B)if (F = Da.call(B), "[object Object]" === F) {
                        if (null === k || "object" !== typeof k)k = a[u] = {};
                        F = checkCyclicRef(B, r);
                        -1 !== F ? k = a[u] = f[F] : na(k, B, b, f, r)
                    } else"[object Array]" === F ? (null !== k && k instanceof Array || (k = a[u] = []), F = checkCyclicRef(B, r), -1 !== F ? k = a[u] = f[F] : na(k, B, b, f, r)) : a[u] = B; else a[u] = B
                }
                return a
            };
            c.extend = function (a, c, b) {
                if ("object" !== typeof a && "object" !== typeof c)return null;
                if ("object" !== typeof c || null === c)return a;
                "object" !== typeof a && (a = c instanceof
                Array ? [] : {});
                na(a, c, b);
                return a
            };
            var ra = c.is = function (a, c) {
                c = Ra.call(c);
                return "finite" == c ? !sb.hasOwnProperty(+a) : c == q ? a instanceof Array : "object" !== c || void 0 !== a && null !== a ? "null" == c && null === a || c == typeof a && null !== a || "object" == c && a === Object(a) || "array" == c && Array.isArray && Array.isArray(a) || Da.call(a).slice(8, -1).toLowerCase() == c : !1
            };
            c.createUUID = function (a, c) {
                return function () {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(a, c).toUpperCase()
                }
            }(/[xy]/g, function (a) {
                var c = 16 * R.random() | 0;
                return ("x" ==
                a ? c : c & 3 | 8).toString(16)
            });
            var Q = c.clone = ja ? function (a) {
                if (Object(a) !== a)return a;
                var c = new a.constructor, b;
                for (b in a)"prototype" !== b && a.hasOwnProperty(b) && (c[b] = Q(a[b]));
                return c
            } : function (a) {
                if (Object(a) !== a)return a;
                var c = new a.constructor, b;
                for (b in a)a.hasOwnProperty(b) && (c[b] = Q(a[b]));
                return c
            };
            c._g = s;
            c.type = Ba.ENABLE_RED_CANVAS && (Ba.CanvasRenderingContext2D || ba.createElement("canvas").getContext) ? "CANVAS" : Ba.SVGAngle || ba.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure",
                "1.1") ? "SVG" : "VML";
            if ("VML" == c.type) {
                var wb = ba.createElement("div"), Wa;
                wb.innerHTML = '<v:shape adj="1"/>';
                Wa = wb.firstChild;
                Wa.style.behavior = "url(#default#VML)";
                if (!Wa || "object" != typeof Wa.adj)return c.type = "";
                wb = null
            }
            c.svg = !((c.vml = "VML" == c.type) || (c.canvas = "CANVAS" == c.type));
            c._Paper = ea;
            c._id = 0;
            c._oid = 0;
            c.angle = function (a, b, f, r, u, k) {
                return null == u ? (a -= f, b -= r, a || b ? (R.atan2(-b, -a) * oa + 540) % 360 : 0) : c.angle(a, b, u, k) - c.angle(f, r, u, k)
            };
            c.rad = function (a) {
                return a % 360 * V
            };
            c.deg = function (a) {
                return a * oa % 360
            };
            c.snapTo = function (a, c, b) {
                var f;
                ra(b, "finite") || (b = 10);
                if (ra(a, q))for (f = a.length; f--;) {
                    if (xa(a[f] - c) <= b)return a[f]
                } else {
                    a = +a;
                    f = c % a;
                    if (f < b)return c - f;
                    if (f > a - b)return c - f + a
                }
                return c
            };
            c.setWindow = function (a) {
                p("raphael.setWindow", c, s.win, a);
                Ba = s.win = a;
                ba = s.doc = s.win.document;
                c._engine.initWin && c._engine.initWin(s.win)
            };
            var Fa = function (a) {
                if (c.vml) {
                    var b = /^\s+|\s+$/g, f;
                    try {
                        var r = new ActiveXObject("htmlfile");
                        r.write("<body>");
                        r.close();
                        f = r.body
                    } catch (u) {
                        f = createPopup().document.body
                    }
                    var k = f.createTextRange();
                    Fa = Oa(function (a) {
                        try {
                            f.style.color = I(a).replace(b, "");
                            var c = k.queryCommandValue("ForeColor");
                            return "#" + ("000000" + ((c & 255) << 16 | c & 65280 | (c & 16711680) >>> 16).toString(16)).slice(-6)
                        } catch (r) {
                            return "none"
                        }
                    })
                } else {
                    var B = s.doc.createElement("i");
                    B.title = "Raphaël Colour Picker";
                    B.style.display = "none";
                    s.doc.body.appendChild(B);
                    Fa = Oa(function (a) {
                        B.style.color = a;
                        return s.doc.defaultView.getComputedStyle(B, "").getPropertyValue("color")
                    })
                }
                return Fa(a)
            }, gc = function () {
                return "hsb(" + [this.h, this.s, this.b] + ")"
            }, hb =
                function () {
                    return "hsl(" + [this.h, this.s, this.l] + ")"
                }, mb = function () {
                return this.hex
            }, Ja = function (a, b, f) {
                null == b && ra(a, "object") && "r"in a && "g"in a && "b"in a && (f = a.b, b = a.g, a = a.r);
                null == b && ra(a, "string") && (f = c.getRGB(a), a = f.r, b = f.g, f = f.b);
                if (1 < a || 1 < b || 1 < f)a /= 255, b /= 255, f /= 255;
                return [a, b, f]
            }, Zb = function (a, b, f, r) {
                var u = {r: a *= 255, g: b *= 255, b: f *= 255, hex: c.rgb(a, b, f), toString: mb};
                ra(r, "finite") && (u.opacity = r);
                return u
            };
            c.color = function (a) {
                var b;
                c.is(a, "object") && "h"in a && "s"in a && "b"in a ? (b = c.hsb2rgb(a), a.r =
                    b.r, a.g = b.g, a.b = b.b, a.hex = b.hex) : c.is(a, "object") && "h"in a && "s"in a && "l"in a ? (b = c.hsl2rgb(a), a.r = b.r, a.g = b.g, a.b = b.b, a.hex = b.hex) : (c.is(a, "string") && (a = c.getRGB(a)), c.is(a, "object") && "r"in a && "g"in a && "b"in a ? (b = c.rgb2hsl(a), a.h = b.h, a.s = b.s, a.l = b.l, b = c.rgb2hsb(a), a.v = b.b) : (a = {hex: "none"}, a.r = a.g = a.b = a.h = a.s = a.v = a.l = -1));
                a.toString = mb;
                return a
            };
            c.hsb2rgb = function (a, c, b, f) {
                this.is(a, "object") && "h"in a && "s"in a && "b"in a && (b = a.b, c = a.s, a = a.h, f = a.o);
                var r, u, k;
                a = 360 * a % 360 / 60;
                k = b * c;
                c = k * (1 - xa(a % 2 - 1));
                b = r =
                    u = b - k;
                a = ~~a;
                b += [k, c, 0, 0, c, k][a];
                r += [c, k, k, c, 0, 0][a];
                u += [0, 0, c, k, k, c][a];
                return Zb(b, r, u, f)
            };
            c.hsl2rgb = function (a, c, b, f) {
                this.is(a, "object") && "h"in a && "s"in a && "l"in a && (b = a.l, c = a.s, a = a.h);
                if (1 < a || 1 < c || 1 < b)a /= 360, c /= 100, b /= 100;
                var r, u, k;
                a = 360 * a % 360 / 60;
                k = 2 * c * (.5 > b ? b : 1 - b);
                c = k * (1 - xa(a % 2 - 1));
                b = r = u = b - k / 2;
                a = ~~a;
                b += [k, c, 0, 0, c, k][a];
                r += [c, k, k, c, 0, 0][a];
                u += [0, 0, c, k, k, c][a];
                return Zb(b, r, u, f)
            };
            c.rgb2hsb = function (a, c, b) {
                b = Ja(a, c, b);
                a = b[0];
                c = b[1];
                b = b[2];
                var f, r;
                f = Y(a, c, b);
                r = f - C(a, c, b);
                a = ((0 == r ? null : f == a ? (c - b) /
                r : f == c ? (b - a) / r + 2 : (a - c) / r + 4) + 360) % 6 * 60 / 360;
                return {h: a, s: 0 == r ? 0 : r / f, b: f, toString: gc}
            };
            c.rgb2hsl = function (a, c, b) {
                b = Ja(a, c, b);
                a = b[0];
                c = b[1];
                b = b[2];
                var f, r, u;
                f = Y(a, c, b);
                r = C(a, c, b);
                u = f - r;
                a = ((0 == u ? null : f == a ? (c - b) / u : f == c ? (b - a) / u + 2 : (a - c) / u + 4) + 360) % 6 * 60 / 360;
                f = (f + r) / 2;
                return {h: a, s: 0 == u ? 0 : .5 > f ? u / (2 * f) : u / (2 - 2 * f), l: f, toString: hb}
            };
            c._path2string = function () {
                return this.join(",").replace(yb, "$1")
            };
            var Oa = c._cacher = function (a, c, b) {
                function f() {
                    var r = J.call(arguments, 0), u = r.join("␀"), k = f.cache = f.cache || {}, B = f.count =
                        f.count || [];
                    if (k.hasOwnProperty(u)) {
                        a:for (var r = B, B = u, F = 0, e = r.length; F < e; F++)if (r[F] === B) {
                            r.push(r.splice(F, 1)[0]);
                            break a
                        }
                        return b ? b(k[u]) : k[u]
                    }
                    1E3 <= B.length && delete k[B.shift()];
                    B.push(u);
                    k[u] = a[M](c, r);
                    return b ? b(k[u]) : k[u]
                }

                return f
            };
            c._preload = function (a, c) {
                var b = ba.createElement("img");
                b.style.cssText = "position:absolute;left:-9999em;top:-9999em";
                b.onload = function () {
                    c.call(this);
                    this.onload = null;
                    ba.body.removeChild(this)
                };
                b.onerror = function () {
                    ba.body.removeChild(this)
                };
                ba.body.appendChild(b);
                b.src = a
            };
            c.getRGB = Oa(function (a) {
                var b, f, r, u, k;
                a && ra(a, "object") && "opacity"in a && (b = a.opacity);
                if (!a || (a = I(a)).indexOf("-") + 1)return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: m};
                if ("none" == a)return {r: -1, g: -1, b: -1, hex: "none", toString: m};
                !db.hasOwnProperty(a.toLowerCase().substring(0, 2)) && "#" !== a.charAt() && (a = Fa(a));
                if (a = a.match(Ka)) {
                    a[2] && (u = t(a[2].substring(5), 16), r = t(a[2].substring(3, 5), 16), f = t(a[2].substring(1, 3), 16));
                    a[3] && (u = t((k = a[3].charAt(3)) + k, 16), r = t((k = a[3].charAt(2)) + k, 16), f = t((k = a[3].charAt(1)) +
                    k, 16));
                    a[4] && (k = a[4].split(Ca), f = fa(k[0]), "%" == k[0].slice(-1) && (f *= 2.55), r = fa(k[1]), "%" == k[1].slice(-1) && (r *= 2.55), u = fa(k[2]), "%" == k[2].slice(-1) && (u *= 2.55), "rgba" == a[1].toLowerCase().slice(0, 4) && (b = fa(k[3])), k[3] && "%" == k[3].slice(-1) && (b /= 100));
                    if (a[5])return k = a[5].split(Ca), f = fa(k[0]), "%" == k[0].slice(-1) && (f *= 2.55), r = fa(k[1]), "%" == k[1].slice(-1) && (r *= 2.55), u = fa(k[2]), "%" == k[2].slice(-1) && (u *= 2.55), "deg" != k[0].slice(-3) && "°" != k[0].slice(-1) || (f /= 360), "hsba" == a[1].toLowerCase().slice(0, 4) && (b = fa(k[3])),
                    k[3] && "%" == k[3].slice(-1) && (b /= 100), c.hsb2rgb(f, r, u, b);
                    if (a[6])return k = a[6].split(Ca), f = fa(k[0]), "%" == k[0].slice(-1) && (f *= 2.55), r = fa(k[1]), "%" == k[1].slice(-1) && (r *= 2.55), u = fa(k[2]), "%" == k[2].slice(-1) && (u *= 2.55), "deg" != k[0].slice(-3) && "°" != k[0].slice(-1) || (f /= 360), "hsla" == a[1].toLowerCase().slice(0, 4) && (b = fa(k[3])), k[3] && "%" == k[3].slice(-1) && (b /= 100), c.hsl2rgb(f, r, u, b);
                    a = {r: f, g: r, b: u, toString: m};
                    a.hex = "#" + (16777216 | u | r << 8 | f << 16).toString(16).slice(1);
                    c.is(b, "finite") && (a.opacity = b);
                    return a
                }
                return {
                    r: -1,
                    g: -1, b: -1, hex: "none", error: 1, toString: m
                }
            }, c);
            c.tintshade = Oa(function (a, b) {
                var f = c.getRGB(a), r;
                r = 255;
                0 > b && (b *= -1, r = 0);
                1 < b && (b = 1);
                r = 0 === b ? f : {r: r - (r - f.r) * b, g: r - (r - f.g) * b, b: r - (r - f.b) * b, toString: m};
                r.hex = c.rgb(r.r, r.g, r.b);
                f.error && (r.error = f.error);
                "opacity"in f ? (r.rgba = "rgba(" + [r.r, r.g, r.b, f.opacity].join() + ")", r.opacity = f.opacity) : r.rgba = "rgb(" + [r.r, r.g, r.b].join() + ")";
                return r
            }, c);
            c.hsb = Oa(function (a, b, f) {
                return c.hsb2rgb(a, b, f).hex
            });
            c.hsl = Oa(function (a, b, f) {
                return c.hsl2rgb(a, b, f).hex
            });
            c.rgb = Oa(function (a,
                                 c, b) {
                return "#" + (16777216 | b | c << 8 | a << 16).toString(16).slice(1)
            });
            c.getColor = function (a) {
                a = this.getColor.start = this.getColor.start || {h: 0, s: 1, b: a || .75};
                var c = this.hsb2rgb(a.h, a.s, a.b);
                a.h += .075;
                1 < a.h && (a.h = 0, a.s -= .2, 0 >= a.s && (this.getColor.start = {h: 0, s: 1, b: a.b}));
                return c.hex
            };
            c.getColor.reset = function () {
                delete this.start
            };
            c.parsePathString = function (a) {
                if (!a)return null;
                var b = ca(a);
                if (b.arr)return Kb(b.arr);
                var f = {a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0}, r = [];
                c.is(a, q) && c.is(a[0], q) && (r = Kb(a));
                r.length ||
                I(a).replace(Fb, function (a, c, b) {
                    var u = [];
                    a = c.toLowerCase();
                    b.replace($a, function (a, c) {
                        c && u.push(+c)
                    });
                    "m" == a && 2 < u.length && (r.push([c].concat(u.splice(0, 2))), a = "l", c = "m" == c ? "l" : "L");
                    if ("r" == a)r.push([c].concat(u)); else for (; u.length >= f[a] && (r.push([c].concat(u.splice(0, f[a]))), f[a]););
                });
                r.toString = c._path2string;
                b.arr = Kb(r);
                return r
            };
            c.parseTransformString = Oa(function (a) {
                if (!a)return null;
                var b = [];
                c.is(a, q) && c.is(a[0], q) && (b = Kb(a));
                b.length || I(a).replace(vb, function (a, c, f) {
                    var r = [];
                    Ra.call(c);
                    f.replace($a,
                        function (a, c) {
                            c && r.push(+c)
                        });
                    b.push([c].concat(r))
                });
                b.toString = c._path2string;
                return b
            });
            var ca = function (a) {
                var c = ca.ps = ca.ps || {};
                c[a] ? c[a].sleep = 100 : c[a] = {sleep: 100};
                setTimeout(function () {
                    for (var b in c)c.hasOwnProperty(b) && b != a && (c[b].sleep--, !c[b].sleep && delete c[b])
                });
                return c[a]
            };
            c.findDotsAtSegment = function (a, c, b, f, r, u, k, B, F) {
                var e = 1 - F, d = Pa(e, 3), t = Pa(e, 2), g = F * F, O = g * F, A = d * a + 3 * t * F * b + 3 * e * F * F * r + O * k, d = d * c + 3 * t * F * f + 3 * e * F * F * u + O * B, t = a + 2 * F * (b - a) + g * (r - 2 * b + a), O = c + 2 * F * (f - c) + g * (u - 2 * f + c), q = b + 2 * F * (r - b) + g *
                    (k - 2 * r + b), g = f + 2 * F * (u - f) + g * (B - 2 * u + f);
                a = e * a + F * b;
                c = e * c + F * f;
                r = e * r + F * k;
                u = e * u + F * B;
                B = 90 - 180 * R.atan2(t - q, O - g) / ta;
                (t > q || O < g) && (B += 180);
                return {x: A, y: d, m: {x: t, y: O}, n: {x: q, y: g}, start: {x: a, y: c}, end: {x: r, y: u}, alpha: B}
            };
            c.bezierBBox = function (a, b, f, r, k, B, F, e) {
                c.is(a, "array") || (a = [a, b, f, r, k, B, F, e]);
                a = u.apply(null, a);
                return {
                    x: a.min.x,
                    y: a.min.y,
                    x2: a.max.x,
                    y2: a.max.y,
                    width: a.max.x - a.min.x,
                    height: a.max.y - a.min.y
                }
            };
            c.isPointInsideBBox = function (a, c, b) {
                return c >= a.x && c <= a.x2 && b >= a.y && b <= a.y2
            };
            c.isBBoxIntersect = function (a,
                                          b) {
                var f = c.isPointInsideBBox;
                return f(b, a.x, a.y) || f(b, a.x2, a.y) || f(b, a.x, a.y2) || f(b, a.x2, a.y2) || f(a, b.x, b.y) || f(a, b.x2, b.y) || f(a, b.x, b.y2) || f(a, b.x2, b.y2) || (a.x < b.x2 && a.x > b.x || b.x < a.x2 && b.x > a.x) && (a.y < b.y2 && a.y > b.y || b.y < a.y2 && b.y > a.y)
            };
            c.pathIntersection = function (a, c) {
                return l(a, c)
            };
            c.pathIntersectionNumber = function (a, c) {
                return l(a, c, 1)
            };
            c.isPointInsidePath = function (a, b, f) {
                var r = c.pathBBox(a);
                return c.isPointInsideBBox(r, b, f) && (1 == l(a, [["M", b, f], ["H", r.x2 + 10]], 1) % 2 || 1 == l(a, [["M", b, f], ["V", r.y2 + 10]],
                    1) % 2)
            };
            c._removedFactory = function (a) {
                return function () {
                    p("raphael.log", null, "Raphaël: you are calling to method “" + a + "” of removed object", a)
                }
            };
            var hc = c.pathBBox = function (a) {
                    var c = ca(a);
                    if (c.bbox)return c.bbox;
                    if (!a)return {x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0};
                    a = B(a);
                    for (var b = 0, f = 0, r = [], k = [], F, e = 0, d = a.length; e < d; e++)F = a[e], "M" == F[0] ? (b = F[1], f = F[2], r.push(b), k.push(f)) : (b = u(b, f, F[1], F[2], F[3], F[4], F[5], F[6]), r = r.concat(b.min.x, b.max.x), k = k.concat(b.min.y, b.max.y), b = F[5], f = F[6]);
                    a = C[M](0, r);
                    F = C[M](0,
                        k);
                    r = Y[M](0, r);
                    k = Y[M](0, k);
                    k = {x: a, y: F, x2: r, y2: k, width: r - a, height: k - F};
                    c.bbox = Q(k);
                    return k
                }, Kb = function (a) {
                    a = Q(a);
                    a.toString = c._path2string;
                    return a
                }, Sb = c._pathToRelative = function (a) {
                    var b = ca(a);
                    if (b.rel)return Kb(b.rel);
                    c.is(a, q) && c.is(a && a[0], q) || (a = c.parsePathString(a));
                    var f = [], r = 0, u = 0, k = 0, B = 0, F = 0;
                    "M" == a[0][0] && (r = a[0][1], u = a[0][2], k = r, B = u, F++, f.push(["M", r, u]));
                    for (var e = a.length; F < e; F++) {
                        var d = f[F] = [], t = a[F];
                        if (t[0] != Ra.call(t[0]))switch (d[0] = Ra.call(t[0]), d[0]) {
                            case "a":
                                d[1] = t[1];
                                d[2] = t[2];
                                d[3] = t[3];
                                d[4] = t[4];
                                d[5] = t[5];
                                d[6] = +(t[6] - r).toFixed(3);
                                d[7] = +(t[7] - u).toFixed(3);
                                break;
                            case "v":
                                d[1] = +(t[1] - u).toFixed(3);
                                break;
                            case "m":
                                k = t[1], B = t[2];
                            default:
                                for (var g = 1, O = t.length; g < O; g++)d[g] = +(t[g] - (g % 2 ? r : u)).toFixed(3)
                        } else for (f[F] = [], "m" == t[0] && (k = t[1] + r, B = t[2] + u), d = 0, g = t.length; d < g; d++)f[F][d] = t[d];
                        t = f[F].length;
                        switch (f[F][0]) {
                            case "z":
                                r = k;
                                u = B;
                                break;
                            case "h":
                                r += +f[F][t - 1];
                                break;
                            case "v":
                                u += +f[F][t - 1];
                                break;
                            default:
                                r += +f[F][t - 2], u += +f[F][t - 1]
                        }
                    }
                    f.toString = c._path2string;
                    b.rel = Kb(f);
                    return f
                },
                Nb = c._pathToAbsolute = function (a) {
                    var f = ca(a), r;
                    if (f.abs)return Kb(f.abs);
                    c.is(a, q) && c.is(a && a[0], q) || (a = c.parsePathString(a));
                    if (!a || !a.length)return r = ["M", 0, 0], r.toString = c._path2string, r;
                    var u = 0, k = 0, B = 0, F = 0, e = 0;
                    r = [];
                    "M" == a[0][0] && (u = +a[0][1], k = +a[0][2], B = u, F = k, e++, r[0] = ["M", u, k]);
                    for (var d = 3 == a.length && "M" == a[0][0] && "R" == a[1][0].toUpperCase() && "Z" == a[2][0].toUpperCase(), t, g = e, O = a.length; g < O; g++) {
                        r.push(e = []);
                        t = a[g];
                        if (t[0] != ib.call(t[0]))switch (e[0] = ib.call(t[0]), e[0]) {
                            case "A":
                                e[1] = t[1];
                                e[2] =
                                    t[2];
                                e[3] = t[3];
                                e[4] = t[4];
                                e[5] = t[5];
                                e[6] = +(t[6] + u);
                                e[7] = +(t[7] + k);
                                break;
                            case "V":
                                e[1] = +t[1] + k;
                                break;
                            case "H":
                                e[1] = +t[1] + u;
                                break;
                            case "R":
                                for (var A = [u, k].concat(t.slice(1)), h = 2, X = A.length; h < X; h++)A[h] = +A[h] + u, A[++h] = +A[h] + k;
                                r.pop();
                                r = r.concat(b(A, d));
                                break;
                            case "M":
                                B = +t[1] + u, F = +t[2] + k;
                            default:
                                for (h = 1, X = t.length; h < X; h++)e[h] = +t[h] + (h % 2 ? u : k)
                        } else if ("R" == t[0])A = [u, k].concat(t.slice(1)), r.pop(), r = r.concat(b(A, d)), e = ["R"].concat(t.slice(-2)); else for (A = 0, h = t.length; A < h; A++)e[A] = t[A];
                        switch (e[0]) {
                            case "Z":
                                u =
                                    B;
                                k = F;
                                break;
                            case "H":
                                u = e[1];
                                break;
                            case "V":
                                k = e[1];
                                break;
                            case "M":
                                B = e[e.length - 2], F = e[e.length - 1];
                            default:
                                u = e[e.length - 2], k = e[e.length - 1]
                        }
                    }
                    r.toString = c._path2string;
                    f.abs = Kb(r);
                    return r
                }, jb = function (a, c, b, f) {
                    return [a, c, b, f, b, f]
                }, Ob = function (a, c, b, f, r, u) {
                    var k = 1 / 3, B = 2 / 3;
                    return [k * a + B * b, k * c + B * f, k * r + B * b, k * u + B * f, r, u]
                }, aa = function (a, c, b, f, r, u, k, B, F, e) {
                    var t = 120 * ta / 180, d = V * (+r || 0), g = [], O, A = Oa(function (a, c, b) {
                        var f = a * Ga(b) - c * qa(b);
                        a = a * qa(b) + c * Ga(b);
                        return {x: f, y: a}
                    });
                    if (e)X = e[0], O = e[1], u = e[2], h = e[3]; else {
                        O =
                            A(a, c, -d);
                        a = O.x;
                        c = O.y;
                        O = A(B, F, -d);
                        B = O.x;
                        F = O.y;
                        Ga(V * r);
                        qa(V * r);
                        O = (a - B) / 2;
                        X = (c - F) / 2;
                        h = O * O / (b * b) + X * X / (f * f);
                        1 < h && (h = za(h), b *= h, f *= h);
                        var h = b * b, q = f * f, h = (u == k ? -1 : 1) * za(xa((h * q - h * X * X - q * O * O) / (h * X * X + q * O * O)));
                        u = h * b * X / f + (a + B) / 2;
                        var h = h * -f * O / b + (c + F) / 2, X = R.asin(((c - h) / f).toFixed(9));
                        O = R.asin(((F - h) / f).toFixed(9));
                        X = a < u ? ta - X : X;
                        O = B < u ? ta - O : O;
                        0 > X && (X = 2 * ta + X);
                        0 > O && (O = 2 * ta + O);
                        k && X > O && (X -= 2 * ta);
                        !k && O > X && (O -= 2 * ta)
                    }
                    if (xa(O - X) > t) {
                        var g = O, q = B, l = F;
                        O = X + t * (k && O > X ? 1 : -1);
                        B = u + b * Ga(O);
                        F = h + f * qa(O);
                        g = aa(B, F, b, f, r, 0, k, q, l, [O, g, u,
                            h])
                    }
                    u = O - X;
                    r = Ga(X);
                    t = qa(X);
                    k = Ga(O);
                    O = qa(O);
                    u = R.tan(u / 4);
                    b = 4 / 3 * b * u;
                    u *= 4 / 3 * f;
                    f = [a, c];
                    a = [a + b * t, c - u * r];
                    c = [B + b * O, F - u * k];
                    B = [B, F];
                    a[0] = 2 * f[0] - a[0];
                    a[1] = 2 * f[1] - a[1];
                    if (e)return [a, c, B].concat(g);
                    g = [a, c, B].concat(g).join().split(",");
                    e = [];
                    B = 0;
                    for (F = g.length; B < F; B++)e[B] = B % 2 ? A(g[B - 1], g[B], d).y : A(g[B], g[B + 1], d).x;
                    return e
                }, r = function (a, c, b, f, r, u, k, B, F) {
                    var e = 1 - F;
                    return {
                        x: Pa(e, 3) * a + 3 * Pa(e, 2) * F * b + 3 * e * F * F * r + Pa(F, 3) * k,
                        y: Pa(e, 3) * c + 3 * Pa(e, 2) * F * f + 3 * e * F * F * u + Pa(F, 3) * B
                    }
                }, u = Oa(function (a, c, b, f, u, k, B, F) {
                    var e = u - 2 * b + a - (B -
                        2 * u + b), t = 2 * (b - a) - 2 * (u - b), d = a - b, g = (-t + za(t * t - 4 * e * d)) / 2 / e, e = (-t - za(t * t - 4 * e * d)) / 2 / e, O = [c, F], A = [a, B];
                    "1e12" < xa(g) && (g = .5);
                    "1e12" < xa(e) && (e = .5);
                    0 < g && 1 > g && (g = r(a, c, b, f, u, k, B, F, g), A.push(g.x), O.push(g.y));
                    0 < e && 1 > e && (g = r(a, c, b, f, u, k, B, F, e), A.push(g.x), O.push(g.y));
                    e = k - 2 * f + c - (F - 2 * k + f);
                    t = 2 * (f - c) - 2 * (k - f);
                    d = c - f;
                    g = (-t + za(t * t - 4 * e * d)) / 2 / e;
                    e = (-t - za(t * t - 4 * e * d)) / 2 / e;
                    "1e12" < xa(g) && (g = .5);
                    "1e12" < xa(e) && (e = .5);
                    0 < g && 1 > g && (g = r(a, c, b, f, u, k, B, F, g), A.push(g.x), O.push(g.y));
                    0 < e && 1 > e && (g = r(a, c, b, f, u, k, B, F, e), A.push(g.x), O.push(g.y));
                    return {min: {x: C[M](0, A), y: C[M](0, O)}, max: {x: Y[M](0, A), y: Y[M](0, O)}}
                }), B = c._path2curve = Oa(function (a, c) {
                    var b = !c && ca(a);
                    if (!c && b.curve)return Kb(b.curve);
                    var f = Nb(a), r = c && Nb(c), u = {
                        x: 0,
                        y: 0,
                        bx: 0,
                        by: 0,
                        X: 0,
                        Y: 0,
                        qx: null,
                        qy: null
                    }, k = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null}, B = function (a, c) {
                        var b, f;
                        if (!a)return ["C", c.x, c.y, c.x, c.y, c.x, c.y];
                        a[0]in{T: 1, Q: 1} || (c.qx = c.qy = null);
                        switch (a[0]) {
                            case "M":
                                c.X = a[1];
                                c.Y = a[2];
                                break;
                            case "A":
                                a = ["C"].concat(aa[M](0, [c.x, c.y].concat(a.slice(1))));
                                break;
                            case "S":
                                b = c.x + (c.x -
                                (c.bx || c.x));
                                f = c.y + (c.y - (c.by || c.y));
                                a = ["C", b, f].concat(a.slice(1));
                                break;
                            case "T":
                                c.qx = c.x + (c.x - (c.qx || c.x));
                                c.qy = c.y + (c.y - (c.qy || c.y));
                                a = ["C"].concat(Ob(c.x, c.y, c.qx, c.qy, a[1], a[2]));
                                break;
                            case "Q":
                                c.qx = a[1];
                                c.qy = a[2];
                                a = ["C"].concat(Ob(c.x, c.y, a[1], a[2], a[3], a[4]));
                                break;
                            case "L":
                                a = ["C"].concat(jb(c.x, c.y, a[1], a[2]));
                                break;
                            case "H":
                                a = ["C"].concat(jb(c.x, c.y, a[1], c.y));
                                break;
                            case "V":
                                a = ["C"].concat(jb(c.x, c.y, c.x, a[1]));
                                break;
                            case "Z":
                                a = ["C"].concat(jb(c.x, c.y, c.X, c.Y))
                        }
                        return a
                    }, F = function (a, c) {
                        if (7 <
                            a[c].length) {
                            a[c].shift();
                            for (var b = a[c]; b.length;)a.splice(c++, 0, ["C"].concat(b.splice(0, 6)));
                            a.splice(c, 1);
                            d = Y(f.length, r && r.length || 0)
                        }
                    }, e = function (a, c, b, u, k) {
                        a && c && "M" == a[k][0] && "M" != c[k][0] && (c.splice(k, 0, ["M", u.x, u.y]), b.bx = 0, b.by = 0, b.x = a[k][1], b.y = a[k][2], d = Y(f.length, r && r.length || 0))
                    }, t = 0, d = Y(f.length, r && r.length || 0);
                    for (; t < d; t++) {
                        f[t] = B(f[t], u);
                        F(f, t);
                        r && (r[t] = B(r[t], k));
                        r && F(r, t);
                        e(f, r, u, k, t);
                        e(r, f, k, u, t);
                        var g = f[t], O = r && r[t], A = g.length, h = r && O.length;
                        u.x = g[A - 2];
                        u.y = g[A - 1];
                        u.bx = fa(g[A - 4]) ||
                        u.x;
                        u.by = fa(g[A - 3]) || u.y;
                        k.bx = r && (fa(O[h - 4]) || k.x);
                        k.by = r && (fa(O[h - 3]) || k.y);
                        k.x = r && O[h - 2];
                        k.y = r && O[h - 1]
                    }
                    r || (b.curve = Kb(f));
                    return r ? [f, r] : f
                }, null, Kb);
            c._parseDots = Oa(function (a) {
                for (var b = [], f = 0, r = a.length; f < r; f++) {
                    var u = {}, k = a[f].match(/^([^:]*):?([\d\.]*)/);
                    u.color = c.getRGB(k[1]);
                    if (u.color.error)return null;
                    u.opacity = u.color.opacity;
                    u.color = u.color.hex;
                    k[2] && (u.offset = k[2] + "%");
                    b.push(u)
                }
                f = 1;
                for (r = b.length - 1; f < r; f++)if (!b[f].offset) {
                    a = fa(b[f - 1].offset || 0);
                    k = 0;
                    for (u = f + 1; u < r; u++)if (b[u].offset) {
                        k =
                            b[u].offset;
                        break
                    }
                    k || (k = 100, u = r);
                    k = fa(k);
                    for (k = (k - a) / (u - f + 1); f < u; f++)a += k, b[f].offset = a + "%"
                }
                return b
            });
            var F = c._tear = function (a, c) {
                a == c.top && (c.top = a.prev);
                a == c.bottom && (c.bottom = a.next);
                a.next && (a.next.prev = a.prev);
                a.prev && (a.prev.next = a.next)
            };
            c._tofront = function (a, c) {
                if (c.top === a)return !1;
                F(a, c);
                a.next = null;
                a.prev = c.top;
                c.top.next = a;
                c.top = a;
                return !0
            };
            c._toback = function (a, c) {
                if (c.bottom === a)return !1;
                F(a, c);
                a.next = c.bottom;
                a.prev = null;
                c.bottom.prev = a;
                c.bottom = a;
                return !0
            };
            c._insertafter = function (a,
                                       c, b, f) {
                F(a, b);
                a.parent = f;
                c === f.top && (f.top = a);
                c.next && (c.next.prev = a);
                a.next = c.next;
                a.prev = c;
                c.next = a
            };
            c._insertbefore = function (a, c, b, f) {
                F(a, b);
                a.parent = f;
                c === f.bottom && (f.bottom = a);
                c.prev && (c.prev.next = a);
                a.prev = c.prev;
                c.prev = a;
                a.next = c
            };
            var f = c.toMatrix = function (a, c) {
                var b = hc(a), f = {
                    _: {transform: ""}, getBBox: function () {
                        return b
                    }
                };
                Ma(f, c);
                return f.matrix
            };
            c.transformPath = function (a, c) {
                return ha(a, f(a, c))
            };
            var Ma = c._extractTransform = function (a, b) {
                if (null == b)return a._.transform;
                b = I(b).replace(/\.{3}|\u2026/g,
                    a._.transform || "");
                var f = c.parseTransformString(b), r = 0, u = 0, k = 0, B = 1, F = 1, e = a._, k = new P;
                e.transform = f || [];
                if (f)for (var u = 0, t = f.length; u < t; u++) {
                    var d = f[u], g = d.length, O = I(d[0]).toLowerCase(), A = d[0] != O, h = A ? k.invert() : 0, q;
                    "t" == O && 3 == g ? A ? (g = h.x(0, 0), O = h.y(0, 0), A = h.x(d[1], d[2]), h = h.y(d[1], d[2]), k.translate(A - g, h - O)) : k.translate(d[1], d[2]) : "r" == O ? 2 == g ? (q = q || a.getBBox(1), k.rotate(d[1], q.x + q.width / 2, q.y + q.height / 2), r += d[1]) : 4 == g && (A ? (A = h.x(d[2], d[3]), h = h.y(d[2], d[3]), k.rotate(d[1], A, h)) : k.rotate(d[1], d[2], d[3]),
                        r += d[1]) : "s" == O ? 2 == g || 3 == g ? (q = q || a.getBBox(1), k.scale(d[1], d[g - 1], q.x + q.width / 2, q.y + q.height / 2), B *= d[1], F *= d[g - 1]) : 5 == g && (A ? (A = h.x(d[3], d[4]), h = h.y(d[3], d[4]), k.scale(d[1], d[2], A, h)) : k.scale(d[1], d[2], d[3], d[4]), B *= d[1], F *= d[2]) : "m" == O && 7 == g && k.add(d[1], d[2], d[3], d[4], d[5], d[6]);
                    e.dirtyT = 1;
                    a.matrix = k
                }
                a.matrix = k;
                e.sx = B;
                e.sy = F;
                e.deg = r;
                e.dx = u = k.e;
                e.dy = k = k.f;
                1 == B && 1 == F && !r && e.bbox ? (e.bbox.x += +u, e.bbox.y += +k) : e.dirtyT = 1
            }, O = function (a) {
                var c = a[0];
                switch (c.toLowerCase()) {
                    case "t":
                        return [c, 0, 0];
                    case "m":
                        return [c,
                            1, 0, 0, 1, 0, 0];
                    case "r":
                        return 4 == a.length ? [c, 0, a[2], a[3]] : [c, 0];
                    case "s":
                        return 5 == a.length ? [c, 1, 1, a[3], a[4]] : 3 == a.length ? [c, 1, 1] : [c, 1]
                }
            }, X = c._equaliseTransform = function (a, b) {
                b = I(b).replace(/\.{3}|\u2026/g, a);
                a = c.parseTransformString(a) || [];
                b = c.parseTransformString(b) || [];
                for (var f = Y(a.length, b.length), r = [], u = [], k = 0, B, F, e, d; k < f; k++) {
                    e = a[k] || O(b[k]);
                    d = b[k] || O(e);
                    if (e[0] != d[0] || "r" == e[0].toLowerCase() && (e[2] != d[2] || e[3] != d[3]) || "s" == e[0].toLowerCase() && (e[3] != d[3] || e[4] != d[4]))return;
                    r[k] = [];
                    u[k] = [];
                    B = 0;
                    for (F = Y(e.length, d.length); B < F; B++)B in e && (r[k][B] = e[B]), B in d && (u[k][B] = d[B])
                }
                return {from: r, to: u}
            };
            c._getContainer = function (a, b, f, r) {
                var u;
                u = null != r || c.is(a, "object") ? a : s.doc.getElementById(a);
                if (null != u)return u.tagName ? null == b ? {
                    container: u,
                    width: u.style.pixelWidth || u.offsetWidth,
                    height: u.style.pixelHeight || u.offsetHeight
                } : {container: u, width: b, height: f} : {container: 1, x: a, y: b, width: f, height: r}
            };
            c.pathToRelative = Sb;
            c._engine = {};
            c.path2curve = B;
            c.matrix = function (a, c, b, f, r, u) {
                return new P(a, c, b,
                    f, r, u)
            };
            (function (a) {
                function b(a) {
                    return a[0] * a[0] + a[1] * a[1]
                }

                function f(a) {
                    var c = za(b(a));
                    a[0] && (a[0] /= c);
                    a[1] && (a[1] /= c)
                }

                a.add = function (a, c, b, f, r, u) {
                    var k = [[], [], []], B = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]];
                    c = [[a, b, r], [c, f, u], [0, 0, 1]];
                    a && a instanceof P && (c = [[a.a, a.c, a.e], [a.b, a.d, a.f], [0, 0, 1]]);
                    for (a = 0; 3 > a; a++)for (b = 0; 3 > b; b++) {
                        for (f = r = 0; 3 > f; f++)r += B[a][f] * c[f][b];
                        k[a][b] = r
                    }
                    this.a = k[0][0];
                    this.b = k[1][0];
                    this.c = k[0][1];
                    this.d = k[1][1];
                    this.e = k[0][2];
                    this.f = k[1][2]
                };
                a.invert = function () {
                    var a =
                        this.a * this.d - this.b * this.c;
                    return new P(this.d / a, -this.b / a, -this.c / a, this.a / a, (this.c * this.f - this.d * this.e) / a, (this.b * this.e - this.a * this.f) / a)
                };
                a.clone = function () {
                    return new P(this.a, this.b, this.c, this.d, this.e, this.f)
                };
                a.translate = function (a, c) {
                    this.add(1, 0, 0, 1, a, c)
                };
                a.scale = function (a, c, b, f) {
                    null == c && (c = a);
                    (b || f) && this.add(1, 0, 0, 1, b, f);
                    this.add(a, 0, 0, c, 0, 0);
                    (b || f) && this.add(1, 0, 0, 1, -b, -f)
                };
                a.rotate = function (a, b, f) {
                    a = c.rad(a);
                    b = b || 0;
                    f = f || 0;
                    var r = +Ga(a).toFixed(9);
                    a = +qa(a).toFixed(9);
                    this.add(r,
                        a, -a, r, b, f);
                    this.add(1, 0, 0, 1, -b, -f)
                };
                a.x = function (a, c) {
                    return a * this.a + c * this.c + this.e
                };
                a.y = function (a, c) {
                    return a * this.b + c * this.d + this.f
                };
                a.get = function (a) {
                    return +this[I.fromCharCode(97 + a)].toFixed(4)
                };
                a.toString = function () {
                    return c.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
                };
                a.toMatrixString = function () {
                    return "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() +
                    ")"
                };
                a.toFilter = function () {
                    return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
                };
                a.offset = function () {
                    return [this.e.toFixed(4), this.f.toFixed(4)]
                };
                a.split = function () {
                    var a = {};
                    a.dx = this.e;
                    a.dy = this.f;
                    var r = [[this.a, this.c], [this.b, this.d]];
                    a.scalex = za(b(r[0]));
                    f(r[0]);
                    a.shear = r[0][0] * r[1][0] + r[0][1] * r[1][1];
                    r[1] = [r[1][0] - r[0][0] * a.shear, r[1][1] - r[0][1] *
                    a.shear];
                    a.scaley = za(b(r[1]));
                    f(r[1]);
                    a.shear /= a.scaley;
                    var u = -r[0][1], r = r[1][1];
                    0 > r ? (a.rotate = c.deg(R.acos(r)), 0 > u && (a.rotate = 360 - a.rotate)) : a.rotate = c.deg(R.asin(u));
                    a.isSimple = !+a.shear.toFixed(9) && (a.scalex.toFixed(9) == a.scaley.toFixed(9) || !a.rotate);
                    a.isSuperSimple = !+a.shear.toFixed(9) && a.scalex.toFixed(9) == a.scaley.toFixed(9) && !a.rotate;
                    a.noRotation = !+a.shear.toFixed(9) && !a.rotate;
                    return a
                };
                a.toTransformString = function (a) {
                    a = a || this.split();
                    return a.isSimple ? (a.scalex = +a.scalex.toFixed(4), a.scaley = +a.scaley.toFixed(4), a.rotate = +a.rotate.toFixed(4), (a.dx || a.dy ? "t" + [a.dx, a.dy] : "") + (1 != a.scalex || 1 != a.scaley ? "s" + [a.scalex, a.scaley, 0, 0] : "") + (a.rotate ? "r" + [a.rotate, 0, 0] : "")) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
                }
            })(P.prototype);
            var pb = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
            "Apple Computer, Inc." == navigator.vendor && (pb && 4 > pb[1] || "iP" == navigator.platform.slice(0, 2)) || "Google Inc." == navigator.vendor && pb && 8 > pb[1] ?
                pa.safari = function () {
                    var a = this.rect(-99, -99, this.width + 99, this.height + 99).attr({stroke: "none"});
                    setTimeout(function () {
                        a.remove()
                    });
                    return !0
                } : pa.safari = T;
            for (var qb = function () {
                this.returnValue = !1
            }, ua = function () {
                return this.originalEvent.preventDefault()
            }, tc = function () {
                this.cancelBubble = !0
            }, Hc = function () {
                return this.originalEvent.stopPropagation()
            }, va = c.addEvent = function () {
                if (s.doc.addEventListener)return function (a, c, b, f) {
                    var r = la && L[c] ? L[c] : c, u = function (r) {
                        var u = s.doc.documentElement.scrollTop ||
                            s.doc.body.scrollTop, k = s.doc.documentElement.scrollLeft || s.doc.body.scrollLeft;
                        if (la && L.hasOwnProperty(c))for (var B = 0, F = r.targetTouches && r.targetTouches.length; B < F; B++)if (r.targetTouches[B].target == a) {
                            F = r;
                            r = r.targetTouches[B];
                            r.originalEvent = F;
                            r.preventDefault = ua;
                            r.stopPropagation = Hc;
                            break
                        }
                        return b.call(f, r, r.clientX + k, r.clientY + u)
                    };
                    a.addEventListener(r, u, !1);
                    return function () {
                        a.removeEventListener(r, u, !1);
                        return !0
                    }
                };
                if (s.doc.attachEvent)return function (a, c, b, f) {
                    var r = function (a) {
                        a = a || s.win.event;
                        var c = a.clientX + (s.doc.documentElement.scrollLeft || s.doc.body.scrollLeft), r = a.clientY + (s.doc.documentElement.scrollTop || s.doc.body.scrollTop);
                        a.preventDefault = a.preventDefault || qb;
                        a.stopPropagation = a.stopPropagation || tc;
                        return b.call(f, a, c, r)
                    };
                    a.attachEvent("on" + c, r);
                    return function () {
                        a.detachEvent("on" + c, r);
                        return !0
                    }
                }
            }(), ac = [], cd = function (a) {
                for (var b = a.clientX, f = a.clientY, r = s.doc.documentElement.scrollTop || s.doc.body.scrollTop, u = s.doc.documentElement.scrollLeft || s.doc.body.scrollLeft, k, B = ac.length; B--;) {
                    k =
                        ac[B];
                    if (la)for (var F = a.touches.length, e; F--;) {
                        if (e = a.touches[F], e.identifier == k.el._drag.id) {
                            b = e.clientX;
                            f = e.clientY;
                            (a.originalEvent ? a.originalEvent : a).preventDefault();
                            break
                        }
                    } else a.preventDefault();
                    if (!k.el.removed) {
                        var F = c._engine.getNode(k.el), d = F.nextSibling, t = F.parentNode, g = F.style.display;
                        s.win.opera && t.removeChild(F);
                        F.style.display = "none";
                        e = k.el.paper.getElementByPoint(b, f);
                        F.style.display = g;
                        s.win.opera && (d ? t.insertBefore(F, d) : t.appendChild(F));
                        e && p("raphael.drag.over." + k.el.id, k.el, e);
                        b += u;
                        f += r;
                        p("raphael.drag.move." + k.el.id, k.move_scope || k.el, b - k.el._drag.x, f - k.el._drag.y, b, f, a)
                    }
                }
            }, dd = function (a) {
                c.unmousemove(cd).unmouseup(dd);
                for (var b = ac.length, f; b--;)f = ac[b], f.el._drag = {}, p("raphael.drag.end." + f.el.id, f.end_scope || f.start_scope || f.move_scope || f.el, a);
                ac = []
            }, ka = c.el = {}, kd = ma.length; kd--;)(function (a) {
                c[a] = ka[a] = function (b, f) {
                    c.is(b, "function") && (this.events = this.events || [], this.events.push({
                        name: a,
                        f: b,
                        unbind: va(this.shape || this.node || s.doc, a, b, f || this)
                    }));
                    return this
                };
                c["un" +
                a] = ka["un" + a] = function (c) {
                    for (var b = this.events || [], f = b.length; f--;)if (b[f].name == a && b[f].f == c) {
                        b[f].unbind();
                        b.splice(f, 1);
                        !b.length && delete this.events;
                        break
                    }
                    return this
                }
            })(ma[kd]);
            ka.data = function (a, b) {
                var f = E[this.id] = E[this.id] || {};
                if (1 == arguments.length) {
                    if (c.is(a, "object")) {
                        for (var r in a)a.hasOwnProperty(r) && this.data(r, a[r]);
                        return this
                    }
                    p("raphael.data.get." + this.id, this, f[a], a);
                    return f[a]
                }
                f[a] = b;
                p("raphael.data.set." + this.id, this, b, a);
                return this
            };
            ka.removeData = function (a) {
                null == a ? delete E[this.id] :
                E[this.id] && delete E[this.id][a];
                return this
            };
            ka.getData = function () {
                return Q(E[this.id] || {})
            };
            var Pb = [], pd = function () {
                this.untrack = va(s.doc, "mouseup", od, this)
            }, od = function () {
                this.untrack();
                this.untrack = null;
                return this.fn && this.fn.apply(this.scope || this.el, arguments)
            };
            ka.mouseup = function (a, b, f) {
                if (!f)return c.mouseup.apply(this, arguments);
                Pb.push(f = {el: this, fn: a, scope: b});
                f.unbind = va(this.shape || this.node || s.doc, "mousedown", pd, f);
                return this
            };
            ka.unmouseup = function (a) {
                for (var b = Pb.length, f; b--;)Pb[b].el ===
                this && Pb[b].fn === a && (f = Pb[b], f.unbind(), f.untrack && f.untrack(), Pb.splice(b, 1));
                return f ? this : c.unmouseup.apply(this, arguments)
            };
            ka.hover = function (a, c, b, f) {
                return this.mouseover(a, b).mouseout(c, f || b)
            };
            ka.unhover = function (a, c) {
                return this.unmouseover(a).unmouseout(c)
            };
            var Ic = [];
            ka.drag = function (a, b, f, r, u, k) {
                function B(F) {
                    (F.originalEvent || F).preventDefault();
                    var e = s.doc.documentElement.scrollTop || s.doc.body.scrollTop, d = s.doc.documentElement.scrollLeft || s.doc.body.scrollLeft;
                    this._drag.x = F.clientX + d;
                    this._drag.y = F.clientY + e;
                    this._drag.id = F.identifier;
                    !ac.length && c.mousemove(cd).mouseup(dd);
                    ac.push({el: this, move_scope: r, start_scope: u, end_scope: k});
                    b && p.on("raphael.drag.start." + this.id, b);
                    a && p.on("raphael.drag.move." + this.id, a);
                    f && p.on("raphael.drag.end." + this.id, f);
                    p("raphael.drag.start." + this.id, u || r || this, F.clientX + d, F.clientY + e, F)
                }

                this._drag = {};
                Ic.push({el: this, start: B});
                this.mousedown(B);
                return this
            };
            ka.onDragOver = function (a) {
                a ? p.on("raphael.drag.over." + this.id, a) : p.unbind("raphael.drag.over." +
                this.id)
            };
            ka.undrag = function () {
                for (var a = Ic.length; a--;)Ic[a].el == this && (this.unmousedown(Ic[a].start), Ic.splice(a, 1), p.unbind("raphael.drag.*." + this.id));
                !Ic.length && c.unmousemove(cd).unmouseup(dd);
                delete this._drag
            };
            ka.follow = function (a, b, f) {
                if (a.removed || a.constructor !== c.el.constructor)return this;
                a.followers.push({el: this, stalk: f = {before: "insertBefore", after: "insertAfter"}[f], cb: b});
                f && this[f](a);
                return this
            };
            ka.unfollow = function (a) {
                if (a.removed || a.constructor !== c.el.constructor)return this;
                for (var b = 0, f = a.followers.length; b < f; b++)if (a.followers[b].el === this) {
                    a.followers.splice(b, 1);
                    break
                }
                return this
            };
            pa.hide = function () {
                this.canvas.style.visibility = "hidden";
                return this
            };
            pa.show = function () {
                this.canvas.style.visibility = "";
                return this
            };
            pa.group = function () {
                var a = arguments, b = Na(a, !0), a = c._engine.group(this, a[0], b);
                return this.__set__ && this.__set__.push(a), this._elementsById[a.id] = a
            };
            pa.circle = function () {
                var a = arguments, b = Na(a, !0), a = sa(a, "cx", 0, "cy", 0, "r", 0, "fill", "none", "stroke", "#000"),
                    b = c._engine.circle(this, a, b);
                return this.__set__ && this.__set__.push(b), this._elementsById[b.id] = b
            };
            pa.rect = function () {
                var a = arguments, b = Na(a, !0), a = sa(a, "x", 0, "y", 0, "width", 0, "height", 0, "r", 0, "fill", "none", "stroke", "#000"), b = c._engine.rect(this, a, b);
                return this.__set__ && this.__set__.push(b), this._elementsById[b.id] = b
            };
            pa.ellipse = function () {
                var a = arguments, b = Na(a, !0), a = sa(a, "x", 0, "y", 0, "rx", 0, "ry", 0, "fill", "none", "stroke", "#000"), b = c._engine.ellipse(this, a, b);
                return this.__set__ && this.__set__.push(b),
                    this._elementsById[b.id] = b
            };
            pa.path = function () {
                var a = arguments, b = Na(a, !0), a = sa(a, "path", "", "fill", "none", "stroke", "#000"), b = c._engine.path(this, a, b);
                return this.__set__ && this.__set__.push(b), this._elementsById[b.id] = b
            };
            pa.image = function () {
                var a = arguments, b = Na(a, !0), a = sa(a, "src", "about:blank", "x", 0, "y", 0, "width", 0, "height", 0);
                out = c._engine.image(this, a, b);
                return this.__set__ && this.__set__.push(out), this._elementsById[out.id] = out
            };
            pa.text = function () {
                var a = arguments, b = Na(a, !0), a = sa(a, "x", 0, "y", 0, "text",
                    "", "stroke", "none", "fill", "#000", "text-anchor", "middle", "vertical-align", "middle"), b = c._engine.text(this, a, b);
                return this.__set__ && this.__set__.push(b), this._elementsById[b.id] = b
            };
            pa.set = function (a) {
                !c.is(a, "array") && (a = w.call(arguments, 0, arguments.length));
                var b = new ic(a);
                this.__set__ && this.__set__.push(b);
                return b
            };
            pa.setStart = function (a) {
                this.__set__ = a || this.set()
            };
            pa.setFinish = function (a) {
                a = this.__set__;
                delete this.__set__;
                return a
            };
            pa.setSize = function (a, b) {
                return c._engine.setSize.call(this,
                    a, b)
            };
            pa.setViewBox = function (a, b, f, r, u) {
                return c._engine.setViewBox.call(this, a, b, f, r, u)
            };
            pa.top = pa.bottom = null;
            pa.raphael = c;
            pa.getElementByPoint = function (a, c) {
                var b, f, r = this.canvas, u = s.doc.elementFromPoint(a, c);
                if (s.win.opera && "svg" == u.tagName) {
                    f = r.getBoundingClientRect();
                    b = r.ownerDocument;
                    var k = b.body, B = b.documentElement;
                    b = f.top + (s.win.pageYOffset || B.scrollTop || k.scrollTop) - (B.clientTop || k.clientTop || 0);
                    f = f.left + (s.win.pageXOffset || B.scrollLeft || k.scrollLeft) - (B.clientLeft || k.clientLeft || 0);
                    k = r.createSVGRect();
                    k.x = a - f;
                    k.y = c - b;
                    k.width = k.height = 1;
                    b = r.getIntersectionList(k, null);
                    b.length && (u = b[b.length - 1])
                }
                if (!u)return null;
                for (; u.parentNode && u != r.parentNode && !u.raphael;)u = u.parentNode;
                u == this.canvas.parentNode && (u = r);
                return u = u && u.raphael ? this.getById(u.raphaelid) : null
            };
            pa.getElementsByBBox = function (a) {
                var b = this.set();
                this.forEach(function (f) {
                    c.isBBoxIntersect(f.getBBox(), a) && b.push(f)
                });
                return b
            };
            pa.getById = function (a) {
                return this._elementsById[a] || null
            };
            pa.forEach = function (a, c) {
                for (var b = this.bottom; b &&
                !1 !== a.call(c, b);)b = b.next;
                return this
            };
            pa.getElementsByPoint = function (a, c) {
                var b = this.set();
                this.forEach(function (f) {
                    f.isPointInside(a, c) && b.push(f)
                });
                return b
            };
            ka.isPointInside = function (a, b) {
                var f = this.realPath = this.realPath || ia[this.type](this), r;
                return c.isPointInsidePath((r = this.attr("transform")) && r.length && c.transformPath(f, r) || f, a, b)
            };
            ka.getBBox = function (a) {
                if (this.removed)return {};
                var c = this._;
                if (a) {
                    if (c.dirty || !c.bboxwt)this.realPath = ia[this.type](this), c.bboxwt = hc(this.realPath), c.bboxwt.toString =
                        N, c.dirty = 0;
                    return c.bboxwt
                }
                if (c.dirty || c.dirtyT || !c.bbox) {
                    if (c.dirty || !this.realPath)c.bboxwt = 0, this.realPath = ia[this.type](this);
                    c.bbox = hc(ha(this.realPath, this.matrix));
                    c.bbox.toString = N;
                    c.dirty = c.dirtyT = 0
                }
                return c.bbox
            };
            ka.clone = function () {
                if (this.removed)return null;
                var a = this.paper[this.type]().attr(this.attr());
                this.__set__ && this.__set__.push(a);
                return a
            };
            ka.glow = function (a) {
                if ("text" == this.type)return null;
                a = a || {};
                var c = (a.width || 10) + (+this.attr("stroke-width") || 1), b = a.fill || !1, f = a.opacity ||
                    .5, r = a.offsetx || 0, u = a.offsety || 0;
                a = a.color || "#000";
                for (var k = c / 2, B = this.paper, F = B.set(), e = this.realPath || ia[this.type](this), e = this.matrix ? ha(e, this.matrix) : e, d = 1; d < k + 1; d++)F.push(B.path(e).attr({
                    stroke: a,
                    fill: b ? a : "none",
                    "stroke-linejoin": "round",
                    "stroke-linecap": "round",
                    "stroke-width": +(c / k * d).toFixed(3),
                    opacity: +(f / k).toFixed(3)
                }));
                return F.insertBefore(this).translate(r, u)
            };
            var ed = function (b, f, r, u, k, B, F, e, d) {
                return null == d ? G(b, f, r, u, k, B, F, e) : c.findDotsAtSegment(b, f, r, u, k, B, F, e, a(b, f, r, u, k, B, F,
                    e, d))
            }, fd = function (a, b) {
                return function (f, r, u) {
                    f = B(f);
                    for (var k, F, e, d, t = "", g = {}, O = 0, A = 0, h = f.length; A < h; A++) {
                        e = f[A];
                        if ("M" == e[0])k = +e[1], F = +e[2]; else {
                            d = ed(k, F, e[1], e[2], e[3], e[4], e[5], e[6]);
                            if (O + d > r) {
                                if (b && !g.start) {
                                    k = ed(k, F, e[1], e[2], e[3], e[4], e[5], e[6], r - O);
                                    t += ["C" + k.start.x, k.start.y, k.m.x, k.m.y, k.x, k.y];
                                    if (u)return t;
                                    g.start = t;
                                    t = ["M" + k.x, k.y + "C" + k.n.x, k.n.y, k.end.x, k.end.y, e[5], e[6]].join();
                                    O += d;
                                    k = +e[5];
                                    F = +e[6];
                                    continue
                                }
                                if (!a && !b)return k = ed(k, F, e[1], e[2], e[3], e[4], e[5], e[6], r - O), {
                                    x: k.x, y: k.y,
                                    alpha: k.alpha
                                }
                            }
                            O += d;
                            k = +e[5];
                            F = +e[6]
                        }
                        t += e.shift() + e
                    }
                    g.end = t;
                    k = a ? O : b ? g : c.findDotsAtSegment(k, F, e[0], e[1], e[2], e[3], e[4], e[5], 1);
                    k.alpha && (k = {x: k.x, y: k.y, alpha: k.alpha});
                    return k
                }
            }, Pc = fd(1), Db = fd(), bb = fd(0, 1);
            c.getTotalLength = Pc;
            c.getPointAtLength = Db;
            c.getSubpath = function (a, c, b) {
                if (1E-6 > this.getTotalLength(a) - b)return bb(a, c).end;
                a = bb(a, b, 1);
                return c ? bb(a, c).end : a
            };
            ka.getTotalLength = function () {
                if ("path" == this.type)return this.node.getTotalLength ? this.node.getTotalLength() : Pc(this.attrs.path)
            };
            ka.getPointAtLength =
                function (a) {
                    if ("path" == this.type)return Db(this.attrs.path, a)
                };
            ka.getSubpath = function (a, b) {
                if ("path" == this.type)return c.getSubpath(this.attrs.path, a, b)
            };
            var Va = c.easing_formulas = {
                linear: function (a) {
                    return a
                }, "<": function (a) {
                    return Pa(a, 1.7)
                }, ">": function (a) {
                    return Pa(a, .48)
                }, "<>": function (a) {
                    var c = .48 - a / 1.04, b = za(.1734 + c * c);
                    a = b - c;
                    a = Pa(xa(a), 1 / 3) * (0 > a ? -1 : 1);
                    c = -b - c;
                    c = Pa(xa(c), 1 / 3) * (0 > c ? -1 : 1);
                    a = a + c + .5;
                    return 3 * (1 - a) * a * a + a * a * a
                }, backIn: function (a) {
                    return a * a * (2.70158 * a - 1.70158)
                }, backOut: function (a) {
                    a -=
                        1;
                    return a * a * (2.70158 * a + 1.70158) + 1
                }, elastic: function (a) {
                    return a == !!a ? a : Pa(2, -10 * a) * qa(2 * (a - .075) * ta / .3) + 1
                }, bounce: function (a) {
                    a < 1 / 2.75 ? a *= 7.5625 * a : a < 2 / 2.75 ? (a -= 1.5 / 2.75, a = 7.5625 * a * a + .75) : a < 2.5 / 2.75 ? (a -= 2.25 / 2.75, a = 7.5625 * a * a + .9375) : (a -= 2.625 / 2.75, a = 7.5625 * a * a + .984375);
                    return a
                }
            };
            Va.easeIn = Va["ease-in"] = Va["<"];
            Va.easeOut = Va["ease-out"] = Va[">"];
            Va.easeInOut = Va["ease-in-out"] = Va["<>"];
            Va["back-in"] = Va.backIn;
            Va["back-out"] = Va.backOut;
            var La = [], jd = d.requestAnimationFrame || d.webkitRequestAnimationFrame ||
                d.mozRequestAnimationFrame || d.oRequestAnimationFrame || d.msRequestAnimationFrame || function (a) {
                    setTimeout(a, 16)
                }, bd = function () {
                for (var a = +new Date, b = 0; b < La.length; b++) {
                    var f = La[b];
                    if (!f.el.removed && !f.paused) {
                        var r = a - f.start, u = f.ms, B = f.easing, F = f.from, d = f.diff, t = f.to, g = f.el, O = {}, A, h = {}, q;
                        f.initstatus ? (r = (f.initstatus * f.anim.top - f.prev) / (f.percent - f.prev) * u, f.status = f.initstatus, delete f.initstatus, f.stop && La.splice(b--, 1)) : f.status = (f.prev + r / u * (f.percent - f.prev)) / f.anim.top;
                        if (!(0 > r))if (r < u) {
                            var X =
                                B(r / u), l;
                            for (l in F)if (F.hasOwnProperty(l)) {
                                switch (k[l]) {
                                    case H:
                                        A = +F[l] + X * u * d[l];
                                        break;
                                    case "colour":
                                        A = "rgb(" + [fb(ya(F[l].r + X * u * d[l].r)), fb(ya(F[l].g + X * u * d[l].g)), fb(ya(F[l].b + X * u * d[l].b))].join() + ")";
                                        break;
                                    case "path":
                                        A = [];
                                        r = 0;
                                        for (B = F[l].length; r < B; r++) {
                                            A[r] = [F[l][r][0]];
                                            t = 1;
                                            for (h = F[l][r].length; t < h; t++)A[r][t] = (+F[l][r][t] + X * u * d[l][r][t]).toFixed(4);
                                            A[r] = A[r].join(" ")
                                        }
                                        A = A.join(" ");
                                        break;
                                    case "transform":
                                        if (d[l].real)for (A = [], r = 0, B = F[l].length; r < B; r++)for (A[r] = [F[l][r][0]], t = 1, h = F[l][r].length; t <
                                        h; t++)A[r][t] = F[l][r][t] + X * u * d[l][r][t]; else A = function (a) {
                                            return +F[l][a] + X * u * d[l][a]
                                        }, A = [["m", A(0), A(1), A(2), A(3), A(4), A(5)]];
                                        break;
                                    case "csv":
                                        if ("clip-rect" == l)for (A = [], r = 4; r--;)A[r] = +F[l][r] + X * u * d[l][r];
                                        break;
                                    default:
                                        for (B = [].concat(F[l]), A = [], r = g.ca[l].length; r--;)A[r] = +B[r] + X * u * d[l][r]
                                }
                                O[l] = A
                            }
                            g.attr(O);
                            (function (a, c, b) {
                                setTimeout(function () {
                                    p("raphael.anim.frame." + a, c, b)
                                })
                            })(g.id, g, f.anim)
                        } else {
                            (function (a, b, f) {
                                setTimeout(function () {
                                    p("raphael.anim.frame." + b.id, b, f);
                                    p("raphael.anim.finish." +
                                    b.id, b, f);
                                    c.is(a, "function") && a.call(b)
                                })
                            })(f.callback, g, f.anim);
                            g.attr(t);
                            La.splice(b--, 1);
                            if (1 < f.repeat && !f.next) {
                                for (q in t)t.hasOwnProperty(q) && (h[q] = f.totalOrigin[q]);
                                f.el.attr(h);
                                e(f.anim, f.el, f.anim.percents[0], null, f.totalOrigin, f.repeat - 1)
                            }
                            f.next && !f.stop && e(f.anim, f.el, f.next, null, f.totalOrigin, f.repeat)
                        }
                    }
                }
                c.svg && g && g.paper && g.paper.safari();
                La.length && jd(bd)
            }, fb = function (a) {
                return 255 < a ? 255 : 0 > a ? 0 : a
            };
            ka.animateWith = function (a, b, f, r, u, k) {
                if (this.removed)return k && k.call(this), this;
                f = f instanceof
                g ? f : c.animation(f, r, u, k);
                e(f, this, f.percents[0], null, this.attr());
                f = 0;
                for (r = La.length; f < r; f++)if (La[f].anim == b && La[f].el == a) {
                    La[r - 1].start = La[f].start;
                    break
                }
                return this
            };
            ka.onAnimation = function (a) {
                a ? p.on("raphael.anim.frame." + this.id, a) : p.unbind("raphael.anim.frame." + this.id);
                return this
            };
            g.prototype.delay = function (a) {
                var c = new g(this.anim, this.ms);
                c.times = this.times;
                c.del = +a || 0;
                return c
            };
            g.prototype.repeat = function (a) {
                var c = new g(this.anim, this.ms);
                c.del = this.del;
                c.times = R.floor(Y(a, 0)) || 1;
                return c
            };
            c.animation = function (a, b, f, r) {
                if (a instanceof g)return a;
                if (c.is(f, "function") || !f)r = r || f || null, f = null;
                a = Object(a);
                b = +b || 0;
                var u = {}, k, B;
                for (B in a)a.hasOwnProperty(B) && fa(B) != B && fa(B) + "%" != B && (k = !0, u[B] = a[B]);
                return k ? (f && (u.easing = f), r && (u.callback = r), new g({100: u}, b)) : new g(a, b)
            };
            ka.animate = function (a, b, f, r) {
                if (this.removed)return r && r.call(this), this;
                a = a instanceof g ? a : c.animation(a, b, f, r);
                e(a, this, a.percents[0], null, this.attr());
                return this
            };
            ka.setTime = function (a, c) {
                a && null != c && this.status(a,
                    C(c, a.ms) / a.ms);
                return this
            };
            ka.status = function (a, c) {
                var b = [], f = 0, r, u;
                if (null != c)return e(a, this, -1, C(c, 1)), this;
                for (r = La.length; f < r; f++)if (u = La[f], u.el.id == this.id && (!a || u.anim == a)) {
                    if (a)return u.status;
                    b.push({anim: u.anim, status: u.status})
                }
                return a ? 0 : b
            };
            ka.pause = function (a) {
                for (var c = 0; c < La.length; c++)La[c].el.id != this.id || a && La[c].anim != a || !1 === p("raphael.anim.pause." + this.id, this, La[c].anim) || (La[c].paused = !0);
                return this
            };
            ka.resume = function (a) {
                for (var c = 0; c < La.length; c++)if (La[c].el.id == this.id &&
                    (!a || La[c].anim == a)) {
                    var b = La[c];
                    !1 !== p("raphael.anim.resume." + this.id, this, b.anim) && (delete b.paused, this.status(b.anim, b.status))
                }
                return this
            };
            ka.stop = function (a) {
                for (var c = 0; c < La.length; c++)La[c].el.id != this.id || a && La[c].anim != a || !1 !== p("raphael.anim.stop." + this.id, this, La[c].anim) && La.splice(c--, 1);
                return this
            };
            p.on("raphael.remove", h);
            p.on("raphael.clear", h);
            ka.toString = function () {
                return "Raphaël’s object"
            };
            ka.toFront = function () {
                if (this.removed)return this;
                var a = c._engine.getNode(this), b = this.parent,
                    f = this.followers, r;
                c._tofront(this, b) && b.canvas.appendChild(a);
                a = 0;
                for (b = f.length; a < b; a++)(r = f[a]).stalk && r.el[r.stalk](this);
                return this
            };
            ka.toBack = function () {
                if (this.removed)return this;
                var a = c._engine.getNode(this), b = this.parent, f = this.followers, r;
                c._toback(this, b) && b.canvas.insertBefore(a, b.canvas.firstChild);
                a = 0;
                for (b = f.length; a < b; a++)(r = f[a]).stalk && r.el[r.stalk](this);
                return this
            };
            ka.insertAfter = function (a) {
                if (this.removed)return this;
                var b = c._engine.getNode(this), f = c._engine.getLastNode(a),
                    r = a.parent.canvas, u = this.followers, k;
                f.nextSibling ? r.insertBefore(b, f.nextSibling) : r.appendChild(b);
                c._insertafter(this, a, this.parent, a.parent);
                b = 0;
                for (f = u.length; b < f; b++)(k = u[b]).stalk && k.el[k.stalk](a);
                return this
            };
            ka.insertBefore = function (a) {
                if (this.removed)return this;
                var b = c._engine.getNode(this), f = c._engine.getNode(a), r = this.followers, u;
                a.parent.canvas.insertBefore(b, f);
                c._insertbefore(this, a, this.parent, a.parent);
                this.parent = a.parent;
                b = 0;
                for (f = r.length; b < f; b++)(u = r[b]).stalk && u.el[u.stalk](a);
                return this
            };
            ka.appendChild = function (a) {
                if (this.removed || "group" !== this.type)return this;
                var b = this.followers, f, r, u;
                if (a.parent === this)return a.toFront(), this;
                r = c._engine.getNode(a);
                c._tear(a, a.parent);
                this.canvas.appendChild(r);
                a.parent = this;
                !this.bottom && (this.bottom = a);
                a.prev = this.top;
                a.next = null;
                this.top && (this.top.next = a);
                this.top = a;
                r = 0;
                for (u = b.length; r < u; r++)(f = b[r]).stalk && f.el[f.stalk](a);
                return this
            };
            ka.removeChild = function (a) {
                if (this.removed || "group" !== this.type || a.parent !== this)return this;
                var b = c._engine.getNode(a), f = this.paper;
                c._tear(a, this);
                f.canvas.appendChild(b);
                this.parent = f;
                !f.bottom && (f.bottom = this);
                (this.prev = f.top) && (f.top.next = this);
                f.top = this;
                this.next = null;
                return this
            };
            var ic = function (a) {
                this.items = [];
                this.length = 0;
                this.type = "set";
                if (a)for (var c = 0, b = a.length; c < b; c++)!a[c] || a[c].constructor != ka.constructor && a[c].constructor != ic || (this[this.items.length] = this.items[this.items.length] = a[c], this.length++)
            }, gb = ic.prototype;
            gb.push = function () {
                for (var a, c, b = 0, f = arguments.length; b <
                f; b++)!(a = arguments[b]) || a.constructor != ka.constructor && a.constructor != ic || (c = this.items.length, this[c] = this.items[c] = a, this.length++);
                return this
            };
            gb.pop = function () {
                this.length && delete this[this.length--];
                return this.items.pop()
            };
            gb.forEach = function (a, c) {
                for (var b = 0, f = this.items.length; b < f && !1 !== a.call(c, this.items[b], b); b++);
                return this
            };
            for (var gd in ka)ka.hasOwnProperty(gd) && (gb[gd] = function (a) {
                return function () {
                    var c = arguments;
                    return this.forEach(function (b) {
                        b[a][M](b, c)
                    })
                }
            }(gd));
            gb.attr = function (a,
                                b) {
                if (a && c.is(a, q) && c.is(a[0], "object"))for (var f = 0, r = a.length; f < r; f++)this.items[f].attr(a[f]); else for (f = 0, r = this.items.length; f < r; f++)this.items[f].attr(a, b);
                return this
            };
            gb.clear = function () {
                for (; this.length;)this.pop()
            };
            gb.splice = function (a, c, b) {
                a = 0 > a ? Y(this.length + a, 0) : a;
                c = Y(0, C(this.length - a, isNaN(c) && this.length || c));
                var f = [], r = [], u = [], k;
                for (k = 2; k < arguments.length; k++)u.push(arguments[k]);
                for (k = 0; k < c; k++)r.push(this[a + k]);
                for (; k < this.length - a; k++)f.push(this[a + k]);
                var B = u.length;
                for (k = 0; k <
                B + f.length; k++)this.items[a + k] = this[a + k] = k < B ? u[k] : f[k - B];
                for (k = this.items.length = this.length -= c - B; this[k];)delete this[k++];
                return new ic(r)
            };
            gb.exclude = function (a) {
                for (var c = 0, b = this.length; c < b; c++)if (this[c] == a)return this.splice(c, 1), !0
            };
            gb.animate = function (a, b, f, r) {
                !c.is(f, "function") && f || (r = f || null);
                var u = this.items.length, k = u, B = this, F;
                if (!u)return this;
                r && (F = function () {
                    !--u && r.call(B)
                });
                f = c.is(f, "string") ? f : F;
                b = c.animation(a, b, f, F);
                for (a = this.items[--k].animate(b); k--;)this.items[k] && !this.items[k].removed &&
                this.items[k].animateWith(a, b, b);
                return this
            };
            gb.insertAfter = function (a) {
                for (var c = this.items.length; c--;)this.items[c].insertAfter(a);
                return this
            };
            gb.getBBox = function () {
                for (var a = [], c = [], b = [], f = [], r = this.items.length; r--;)if (!this.items[r].removed) {
                    var u = this.items[r].getBBox();
                    a.push(u.x);
                    c.push(u.y);
                    b.push(u.x + u.width);
                    f.push(u.y + u.height)
                }
                a = C[M](0, a);
                c = C[M](0, c);
                b = Y[M](0, b);
                f = Y[M](0, f);
                return {x: a, y: c, x2: b, y2: f, width: b - a, height: f - c}
            };
            gb.clone = function (a) {
                a = new ic;
                for (var c = 0, b = this.items.length; c <
                b; c++)a.push(this.items[c].clone());
                return a
            };
            gb.toString = function () {
                return "Raphaël‘s set"
            };
            gb.glow = function (a) {
                var c = this.paper.set();
                this.forEach(function (b, f) {
                    var r = b.glow(a);
                    null != r && r.forEach(function (a, b) {
                        c.push(a)
                    })
                });
                return c
            };
            c.registerFont = function (a) {
                if (!a.face)return a;
                this.fonts = this.fonts || {};
                var c = {w: a.w, face: {}, glyphs: {}}, b = a.face["font-family"], f;
                for (f in a.face)a.face.hasOwnProperty(f) && (c.face[f] = a.face[f]);
                this.fonts[b] ? this.fonts[b].push(c) : this.fonts[b] = [c];
                if (!a.svg) {
                    c.face["units-per-em"] =
                        t(a.face["units-per-em"], 10);
                    for (var r in a.glyphs)if (a.glyphs.hasOwnProperty(r) && (b = a.glyphs[r], c.glyphs[r] = {
                            w: b.w,
                            k: {},
                            d: b.d && "M" + b.d.replace(/[mlcxtrv]/g, function (a) {
                                return {l: "L", c: "C", x: "z", t: "m", r: "l", v: "c"}[a] || "M"
                            }) + "z"
                        }, b.k))for (var u in b.k)b.hasOwnProperty(u) && (c.glyphs[r].k[u] = b.k[u])
                }
                return a
            };
            pa.getFont = function (a, b, f, r) {
                r = r || "normal";
                f = f || "normal";
                b = +b || {normal: 400, bold: 700, lighter: 300, bolder: 800}[b] || 400;
                if (c.fonts) {
                    var u = c.fonts[a];
                    if (!u) {
                        a = new RegExp("(^|\\s)" + a.replace(/[^\w\d\s+!~.:_-]/g,
                            "") + "(\\s|$)", "i");
                        for (var k in c.fonts)if (c.fonts.hasOwnProperty(k) && a.test(k)) {
                            u = c.fonts[k];
                            break
                        }
                    }
                    var B;
                    if (u)for (k = 0, a = u.length; k < a && (B = u[k], B.face["font-weight"] != b || B.face["font-style"] != f && B.face["font-style"] || B.face["font-stretch"] != r); k++);
                    return B
                }
            };
            pa.print = function (a, b, f, r, u, k, B) {
                k = k || "middle";
                B = Y(C(B || 0, 1), -1);
                var F = I(f).split(""), e = 0, d = 0, t = "";
                c.is(r, f) && (r = this.getFont(r));
                if (r) {
                    f = (u || 16) / r.face["units-per-em"];
                    var g = r.face.bbox.split(Za);
                    u = +g[0];
                    var O = g[3] - g[1], A = 0;
                    k = +g[1] + ("baseline" ==
                    k ? O + +r.face.descent : O / 2);
                    for (var g = 0, h = F.length; g < h; g++) {
                        if ("\n" == F[g])d = X = e = 0, A += O; else var q = d && r.glyphs[F[g - 1]] || {}, X = r.glyphs[F[g]], e = e + (d ? (q.w || r.w) + (q.k && q.k[F[g]] || 0) + r.w * B : 0), d = 1;
                        X && X.d && (t += c.transformPath(X.d, ["t", e * f, A * f, "s", f, f, u, k, "t", (a - u) / f, (b - k) / f]))
                    }
                }
                return this.path(t).attr({fill: "#000", stroke: "none"})
            };
            pa.add = function (a) {
                if (c.is(a, "array"))for (var b = this.set(), f = 0, r = a.length, u; f < r; f++)u = a[f] || {}, Z.hasOwnProperty(u.type) && b.push(this[u.type]().attr(u));
                return b
            };
            c.format = function (a,
                                 b) {
                var f = c.is(b, q) ? [0].concat(b) : arguments;
                a && c.is(a, "string") && f.length - 1 && (a = a.replace(Ea, function (a, c) {
                    return null == f[++c] ? "" : f[c]
                }));
                return a || ""
            };
            c.fullfill = function () {
                var a = /\{([^\}]+)\}/g, c = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, b = function (a, b, f) {
                    var r = f;
                    b.replace(c, function (a, c, b, f, u) {
                        c = c || f;
                        r && (c in r && (r = r[c]), "function" == typeof r && u && (r = r()))
                    });
                    return r = (null == r || r == f ? a : r) + ""
                };
                return function (c, f) {
                    return String(c).replace(a, function (a, c) {
                        return b(a, c, f)
                    })
                }
            }();
            c.ninja =
                function () {
                    $ ? s.win.Raphael = U : delete Raphael;
                    return c
                };
            var xc = c.vml && .5 || 0;
            c.crispBound = Oa(function (a, c, b, f, r) {
                var u = {}, k;
                a = a || 0;
                c = c || 0;
                b = b || 0;
                f = f || 0;
                r = r || 0;
                k = r % 2 / 2 + xc;
                u.x = ya(a + k) - k;
                u.y = ya(c + k) - k;
                u.width = ya(a + b + k) - k - u.x;
                u.height = ya(c + f + k) - k - u.y;
                u["stroke-width"] = r;
                0 === u.width && 0 !== b && (u.width = 1);
                0 === u.height && 0 !== f && (u.height = 1);
                return u
            }, c);
            ka.crisp = function () {
                var a = this.attrs, b, f = this.attr(["x", "y", "width", "height", "stroke-width"]), f = c.crispBound(f.x, f.y, f.width, f.height, f["stroke-width"]);
                for (b in f)a[b] ===
                f[b] && delete f[b];
                return this.attr(f)
            };
            c.st = gb;
            c.define = function (a, b, f, r, u, k) {
                var B;
                if (c.is(a, q))for (k = 0, B = a.length; k < B; k++)c.define(a[k]); else if (c.is(a, "object"))c.define(a.name, a[a.name], a.ca, a.fn, a.e, a.data); else if (a && !c.fn[a])return c.fn[a] = function () {
                    var k = arguments, B = b.apply(this, k), F;
                    if (r && c.is(r, "object"))for (F in r)B[F] = r[F];
                    if (u && c.is(u, "object"))for (F in u)B[F] && B[F](u[F]);
                    if (f) {
                        if (c.is(f, "function"))B.ca[a] = f; else for (F in f)B.ca[F] = f[F];
                        B.ca[a] && (c._lastArgIfGroup(k, !0), B.attr(a, J.call(k)))
                    }
                    return B
                },
                f && (c.fn[a].ca = f), r && (c.fn[a].fn = r), u && (c.fn[a].e = u), k && (c.fn[a].data = k), c.fn[a]
            };
            (function (a, b, f) {
                function r() {
                    /in/.test(a.readyState) ? setTimeout(r, 9) : c.eve("raphael.DOMload")
                }

                null == a.readyState && a.addEventListener && (a.addEventListener(b, f = function () {
                    a.removeEventListener(b, f, !1);
                    a.readyState = "complete"
                }, !1), a.readyState = "loading");
                r()
            })(document, "DOMContentLoaded");
            p.on("raphael.DOMload", function () {
                n = !0
            });
            (function () {
                if (c.svg) {
                    var a = String, b = parseFloat, f = parseInt, r = Math, u = r.max, k = r.abs, B = r.pow,
                        F = r.sqrt, e = /[, ]+/, d = !(!/AppleWebKit/.test(c._g.win.navigator.userAgent) || /Chrome/.test(c._g.win.navigator.userAgent) && !(29 > c._g.win.navigator.appVersion.match(/Chrome\/(\d+)\./)[1])), t = c.eve, g = {
                            block: "M5,0 0,2.5 5,5z",
                            classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
                            diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
                            open: "M6,1 1,3.5 6,6",
                            oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
                        }, O = {};
                    c.toString = function () {
                        return "Your browser supports SVG.\nYou are running Raphaël " + this.version
                    };
                    c._url = "";
                    var A = function (a, c) {
                            var b =
                                a.gradient;
                            if (b) {
                                if (b === c)return;
                                b.refCount--;
                                b.refCount || b.parentNode.removeChild(b);
                                delete a.gradient
                            }
                            c && (a.gradient = c, c.refCount++)
                        }, h = c._createNode = function (b, f) {
                            if (f) {
                                "string" == typeof b && (b = h(b));
                                for (var r in f)f.hasOwnProperty(r) && ("xlink:" == r.substring(0, 6) ? b.setAttributeNS("http://www.w3.org/1999/xlink", r.substring(6), a(f[r])) : b.setAttribute(r, a(f[r])))
                            } else b = c._g.doc.createElementNS("http://www.w3.org/2000/svg", b);
                            return b
                        }, q = {userSpaceOnUse: "userSpaceOnUse", objectBoundingBox: "objectBoundingBox"},
                        X = {pad: "pad", redlect: "reflect", repeat: "repeat"}, l = function (f, e) {
                            if (!f.paper || !f.paper.defs)return 0;
                            var d = "linear", t = f.paper, g = (t.id + "-" + e).replace(/[\(\)\s%:,\xb0#]/g, "_"), O = .5, l = .5, R, E, C, n, Ma, w = f.node, T = w.style, p = c._g.doc.getElementById(g);
                            if (!p) {
                                e = a(e).replace(c._radial_gradient, function (a, c) {
                                    d = "radial";
                                    c = c && c.split(",") || [];
                                    n = c[5];
                                    Ma = c[6];
                                    var f = c[0], r = c[1], u = c[2], k = c[3], e = c[4], t = f && r, g;
                                    u && (R = /\%/.test(u) ? u : b(u));
                                    if (n === q.userSpaceOnUse)return t && (O = f, l = r), k && e && (E = k, C = e, t || (O = E, l = C)), "";
                                    t && (O =
                                        b(f), l = b(r), f = 2 * (.5 < l) - 1, .25 < (g = B(O - .5, 2)) + B(l - .5, 2) && .25 > g && (l = F(.25 - g) * f + .5) && .5 !== l && (l = l.toFixed(5) - 1E-5 * f));
                                    k && e && (E = b(k), C = b(e), f = 2 * (.5 < C) - 1, .25 < (g = B(E - .5, 2)) + B(C - .5, 2) && .25 > g && (C = F(.25 - g) * f + .5) && .5 !== C && (C = C.toFixed(5) - 1E-5 * f), t || (O = E, l = C));
                                    return ""
                                });
                                e = e.split(/\s*\-\s*/);
                                if ("linear" == d) {
                                    var p = e.shift(), s = p.match(/\((.*)\)/), va, s = s && s[1] && s[1].split(/\s*\,\s*/), p = -b(p);
                                    if (isNaN(p))return null;
                                    s && s.length ? (s[0]in q ? (n = s.shift(), s[0]in X && (Ma = s.shift())) : (s[4] && (n = s[4]), s[5] && (Ma = s[5])), va =
                                        [s[0] || "0%", s[1] || "0%", s[2] || "100%", s[3] || "0%"]) : (va = [0, 0, r.cos(c.rad(p)), r.sin(c.rad(p))], p = 1 / (u(k(va[2]), k(va[3])) || 1), va[2] *= p, va[3] *= p, 0 > va[2] && (va[0] = -va[2], va[2] = 0), 0 > va[3] && (va[1] = -va[3], va[3] = 0))
                                }
                                s = c._parseDots(e);
                                if (!s)return null;
                                p = h(d + "Gradient", {id: g});
                                p.refCount = 0;
                                n in q && p.setAttribute("gradientUnits", a(n));
                                Ma in X && p.setAttribute("spreadMethod", a(Ma));
                                "radial" === d ? (void 0 !== R && p.setAttribute("r", a(R)), void 0 !== E && void 0 !== C && (p.setAttribute("cx", a(E)), p.setAttribute("cy", a(C))), p.setAttribute("fx",
                                    a(O)), p.setAttribute("fy", a(l))) : h(p, {
                                    x1: va[0],
                                    y1: va[1],
                                    x2: va[2],
                                    y2: va[3]
                                });
                                va = 0;
                                for (var L = s.length; va < L; va++)p.appendChild(h("stop", {
                                    offset: s[va].offset ? s[va].offset : va ? "100%" : "0%",
                                    "stop-color": s[va].color || "#fff",
                                    "stop-opacity": void 0 === s[va].opacity ? 1 : s[va].opacity
                                }));
                                t.defs.appendChild(p)
                            }
                            A(f, p);
                            h(w, {fill: "url('" + c._url + "#" + g + "')", opacity: 1, "fill-opacity": 1});
                            T.fill = "";
                            T.opacity = 1;
                            return T.fillOpacity = 1
                        }, R = function (a) {
                            var c = a.getBBox(1);
                            h(a.pattern, {
                                patternTransform: a.matrix.invert() + " translate(" +
                                c.x + "," + c.y + ")"
                            })
                        }, E = function (b, f, r) {
                            if ("path" == b.type) {
                                for (var u = a(f).toLowerCase().split("-"), k = b.paper, B = r ? "end" : "start", F = b.node, e = b.attrs, d = e["stroke-width"], t = u.length, A = "classic", q, X, l = 3, E = 3, R = 5; t--;)switch (u[t]) {
                                    case "block":
                                    case "classic":
                                    case "oval":
                                    case "diamond":
                                    case "open":
                                    case "none":
                                        A = u[t];
                                        break;
                                    case "wide":
                                        E = 5;
                                        break;
                                    case "narrow":
                                        E = 2;
                                        break;
                                    case "long":
                                        l = 5;
                                        break;
                                    case "short":
                                        l = 2
                                }
                                "open" == A ? (l += 2, E += 2, R += 2, q = 1, X = r ? 4 : 1, u = {
                                    fill: "none",
                                    stroke: e.stroke
                                }) : (X = q = l / 2, u = {fill: e.stroke, stroke: "none"});
                                b._.arrows ? r ? (b._.arrows.endPath && O[b._.arrows.endPath]--, b._.arrows.endMarker && O[b._.arrows.endMarker]--) : (b._.arrows.startPath && O[b._.arrows.startPath]--, b._.arrows.startMarker && O[b._.arrows.startMarker]--) : b._.arrows = {};
                                if ("none" != A) {
                                    var t = "raphael-marker-" + A, C = "raphael-marker-" + B + A + l + E + "-obj" + b.id;
                                    c._g.doc.getElementById(t) ? O[t]++ : (k.defs.appendChild(h(h("path"), {
                                        "stroke-linecap": "round",
                                        d: g[A],
                                        id: t
                                    })), O[t] = 1);
                                    var n = c._g.doc.getElementById(C);
                                    n ? (O[C]++, l = n.getElementsByTagName("use")[0]) : (n = h(h("marker"),
                                        {
                                            id: C,
                                            markerHeight: E,
                                            markerWidth: l,
                                            orient: "auto",
                                            refX: X,
                                            refY: E / 2
                                        }), l = h(h("use"), {
                                        "xlink:href": "#" + t,
                                        transform: (r ? "rotate(180 " + l / 2 + " " + E / 2 + ") " : "") + "scale(" + l / R + "," + E / R + ")",
                                        "stroke-width": (1 / ((l / R + E / R) / 2)).toFixed(4)
                                    }), n.appendChild(l), k.defs.appendChild(n), O[C] = 1);
                                    h(l, u);
                                    k = q * ("diamond" != A && "oval" != A);
                                    r ? (r = b._.arrows.startdx * d || 0, d = c.getTotalLength(e.path) - k * d) : (r = k * d, d = c.getTotalLength(e.path) - (b._.arrows.enddx * d || 0));
                                    u = {};
                                    u["marker-" + B] = "url('" + c._url + "#" + C + "')";
                                    if (d || r)u.d = c.getSubpath(e.path,
                                        r, d);
                                    h(F, u);
                                    b._.arrows[B + "Path"] = t;
                                    b._.arrows[B + "Marker"] = C;
                                    b._.arrows[B + "dx"] = k;
                                    b._.arrows[B + "Type"] = A;
                                    b._.arrows[B + "String"] = f
                                } else r ? (r = b._.arrows.startdx * d || 0, d = c.getTotalLength(e.path) - r) : (r = 0, d = c.getTotalLength(e.path) - (b._.arrows.enddx * d || 0)), b._.arrows[B + "Path"] && h(F, {d: c.getSubpath(e.path, r, d)}), delete b._.arrows[B + "Path"], delete b._.arrows[B + "Marker"], delete b._.arrows[B + "dx"], delete b._.arrows[B + "Type"], delete b._.arrows[B + "String"];
                                for (u in O)O.hasOwnProperty(u) && !O[u] && (b = c._g.doc.getElementById(u)) &&
                                b.parentNode.removeChild(b)
                            }
                        }, C = {
                            "": [0],
                            none: [0],
                            "-": [3, 1],
                            ".": [1, 1],
                            "-.": [3, 1, 1, 1],
                            "-..": [3, 1, 1, 1, 1, 1],
                            ". ": [1, 3],
                            "- ": [4, 3],
                            "--": [8, 3],
                            "- .": [4, 3, 1, 3],
                            "--.": [8, 3, 1, 3],
                            "--..": [8, 3, 1, 3, 1, 3]
                        }, n = function (b, f, r) {
                            var u = C[a(f).toLowerCase()], k, B;
                            if (f = u || void 0 !== f && [].concat(f)) {
                                k = b.attrs["stroke-width"] || 1;
                                r = {
                                    round: k,
                                    square: k,
                                    butt: 0
                                }[b.attrs["stroke-linecap"] || r["stroke-linecap"]] || 0;
                                B = f.length;
                                k = u ? k : 1;
                                for (u = []; B--;)u[B] = f[B] * k + (B % 2 ? 1 : -1) * r, 0 > u[B] && (u[B] = 0);
                                c.is(f, "array") && h(b.node, {"stroke-dasharray": u.join(",")})
                            }
                        },
                        Ma = function (a, c) {
                            for (var b in c)t("raphael.attr." + b + "." + a.id, a, c[b], b), a.ca[b] && a.attr(b, c[b])
                        }, w = c._setFillAndStroke = function (b, r) {
                            if (b.paper.canvas) {
                                var B = b.node, F = b.attrs, t = b.paper, g = B.style, O = g.visibility;
                                g.visibility = "hidden";
                                for (var q in r)if (r.hasOwnProperty(q) && c._availableAttrs.hasOwnProperty(q)) {
                                    var X = r[q];
                                    F[q] = X;
                                    switch (q) {
                                        case "blur":
                                            b.blur(X);
                                            break;
                                        case "href":
                                        case "title":
                                        case "target":
                                            var C = B.parentNode;
                                            if ("a" != C.tagName.toLowerCase()) {
                                                if ("" == X)break;
                                                var Ma = h("a");
                                                Ma.raphael = !0;
                                                Ma.raphaelid =
                                                    B.raphaelid;
                                                C.insertBefore(Ma, B);
                                                Ma.appendChild(B);
                                                C = Ma
                                            }
                                            "target" == q ? C.setAttributeNS("http://www.w3.org/1999/xlink", "show", "blank" == X ? "new" : X) : C.setAttributeNS("http://www.w3.org/1999/xlink", q, X);
                                            B.titleNode = C;
                                            break;
                                        case "cursor":
                                            g.cursor = X;
                                            break;
                                        case "transform":
                                            b.transform(X);
                                            break;
                                        case "rotation":
                                            c.is(X, "array") ? b.rotate.apply(b, X) : b.rotate(X);
                                            break;
                                        case "arrow-start":
                                            E(b, X);
                                            break;
                                        case "arrow-end":
                                            E(b, X, 1);
                                            break;
                                        case "clip-path":
                                            var s = !0;
                                        case "clip-rect":
                                            C = !s && a(X).split(e);
                                            b._.clipispath = !!s;
                                            if (s || 4 == C.length) {
                                                b.clip && b.clip.parentNode.parentNode.removeChild(b.clip.parentNode);
                                                var Ma = h("clipPath"), w = h(s ? "path" : "rect");
                                                Ma.id = c.createUUID();
                                                h(w, s ? {
                                                    d: X ? F["clip-path"] = c._pathToAbsolute(X) : c._availableAttrs.path,
                                                    fill: "none"
                                                } : {
                                                    x: C[0],
                                                    y: C[1],
                                                    width: C[2],
                                                    height: C[3],
                                                    transform: b.matrix.invert()
                                                });
                                                Ma.appendChild(w);
                                                t.defs.appendChild(Ma);
                                                h(B, {"clip-path": "url('" + c._url + "#" + Ma.id + "')"});
                                                b.clip = w
                                            }
                                            !X && (X = B.getAttribute("clip-path")) && ((X = c._g.doc.getElementById(X.replace(/(^url\(#|\)$)/g, ""))) && X.parentNode.removeChild(X),
                                                h(B, {"clip-path": ""}), delete b.clip);
                                            break;
                                        case "path":
                                            "path" == b.type && (h(B, {d: X ? F.path = c._pathToAbsolute(X) : c._availableAttrs.path}), b._.dirty = 1, b._.arrows && ("startString"in b._.arrows && E(b, b._.arrows.startString), "endString"in b._.arrows && E(b, b._.arrows.endString, 1)));
                                            break;
                                        case "width":
                                            if (B.setAttribute(q, X), b._.dirty = 1, F.fx)q = "x", X = F.x; else break;
                                        case "x":
                                            F.fx && (X = -F.x - (F.width || 0));
                                        case "rx":
                                            if ("rx" == q && "rect" == b.type)break;
                                        case "cx":
                                            B.setAttribute(q, X);
                                            b.pattern && R(b);
                                            b._.dirty = 1;
                                            break;
                                        case "height":
                                            if (B.setAttribute(q,
                                                    X), b._.dirty = 1, F.fy)q = "y", X = F.y; else break;
                                        case "y":
                                            F.fy && (X = -F.y - (F.height || 0));
                                        case "ry":
                                            if ("ry" == q && "rect" == b.type)break;
                                        case "cy":
                                            B.setAttribute(q, X);
                                            b.pattern && R(b);
                                            b._.dirty = 1;
                                            break;
                                        case "r":
                                            "rect" == b.type ? h(B, {rx: X, ry: X}) : B.setAttribute(q, X);
                                            b._.dirty = 1;
                                            break;
                                        case "src":
                                            "image" == b.type && B.setAttributeNS("http://www.w3.org/1999/xlink", "href", X);
                                            break;
                                        case "stroke-width":
                                            if (1 != b._.sx || 1 != b._.sy)X /= u(k(b._.sx), k(b._.sy)) || 1;
                                            t._vbSize && (X *= t._vbSize);
                                            d && 0 === X && (X = 1E-6);
                                            B.setAttribute(q, X);
                                            F["stroke-dasharray"] &&
                                            n(b, F["stroke-dasharray"], r);
                                            b._.arrows && ("startString"in b._.arrows && E(b, b._.arrows.startString), "endString"in b._.arrows && E(b, b._.arrows.endString, 1));
                                            break;
                                        case "stroke-dasharray":
                                            n(b, X, r);
                                            break;
                                        case "fill":
                                            var va = a(X).match(c._ISURL);
                                            if (va) {
                                                var Ma = h("pattern"), T = h("image");
                                                Ma.id = c.createUUID();
                                                h(Ma, {
                                                    x: 0,
                                                    y: 0,
                                                    patternUnits: "userSpaceOnUse",
                                                    height: 1,
                                                    width: 1
                                                });
                                                h(T, {x: 0, y: 0, "xlink:href": va[1]});
                                                Ma.appendChild(T);
                                                (function (a) {
                                                    c._preload(va[1], function () {
                                                        var c = this.offsetWidth, b = this.offsetHeight;
                                                        h(a,
                                                            {width: c, height: b});
                                                        h(T, {width: c, height: b});
                                                        t.safari()
                                                    })
                                                })(Ma);
                                                t.defs.appendChild(Ma);
                                                g.fill = "url('" + c._url + "#" + Ma.id + "')";
                                                h(B, {fill: g.fill});
                                                b.pattern = Ma;
                                                b.pattern && R(b);
                                                break
                                            }
                                            C = c.getRGB(X);
                                            if (!C.error)delete r.gradient, delete F.gradient, !c.is(F.opacity, "undefined") && c.is(r.opacity, "undefined") && h(B, {opacity: F.opacity}), !c.is(F["fill-opacity"], "undefined") && c.is(r["fill-opacity"], "undefined") && h(B, {"fill-opacity": F["fill-opacity"]}), b.gradient && A(b); else if (("circle" == b.type || "ellipse" == b.type ||
                                                "r" != a(X).charAt()) && l(b, X)) {
                                                if ("opacity"in F || "fill-opacity"in F)if (C = c._g.doc.getElementById(B.getAttribute("fill").replace(/^url\(#|\)$/g, "")))C = C.getElementsByTagName("stop"), h(C[C.length - 1], {"stop-opacity": ("opacity"in F ? F.opacity : 1) * ("fill-opacity"in F ? F["fill-opacity"] : 1)});
                                                F.gradient = X;
                                                F.fill = "none";
                                                g.fill = "";
                                                break
                                            }
                                            C.hasOwnProperty("opacity") ? (h(B, {"fill-opacity": g.fillOpacity = 1 < C.opacity ? C.opacity / 100 : C.opacity}), b._.fillOpacityDirty = !0) : b._.fillOpacityDirty && c.is(F["fill-opacity"], "undefined") &&
                                            c.is(r["fill-opacity"], "undefined") && (B.removeAttribute("fill-opacity"), g.fillOpacity = "", delete b._.fillOpacityDirty);
                                        case "stroke":
                                            C = c.getRGB(X);
                                            B.setAttribute(q, C.hex);
                                            g[q] = C.hex;
                                            "stroke" == q && (C.hasOwnProperty("opacity") ? (h(B, {"stroke-opacity": g.strokeOpacity = 1 < C.opacity ? C.opacity / 100 : C.opacity}), b._.strokeOpacityDirty = !0) : b._.strokeOpacityDirty && c.is(F["stroke-opacity"], "undefined") && c.is(r["stroke-opacity"], "undefined") && (B.removeAttribute("stroke-opacity"), g.strokeOpacity = "", delete b._.strokeOpacityDirty),
                                            b._.arrows && ("startString"in b._.arrows && E(b, b._.arrows.startString), "endString"in b._.arrows && E(b, b._.arrows.endString, 1)));
                                            break;
                                        case "gradient":
                                            "circle" != b.type && "ellipse" != b.type && "r" == a(X).charAt() || l(b, X);
                                            break;
                                        case "line-height":
                                        case "vertical-align":
                                            break;
                                        case "visibility":
                                            "hidden" === X ? b.hide() : b.show();
                                            break;
                                        case "opacity":
                                            F.gradient && !F.hasOwnProperty("stroke-opacity") && h(B, {"stroke-opacity": 1 < X ? X / 100 : X});
                                        case "fill-opacity":
                                            if (F.gradient) {
                                                if (C = c._g.doc.getElementById(B.getAttribute("fill").replace(/^url\(#|\)$/g,
                                                        "")))C = C.getElementsByTagName("stop"), h(C[C.length - 1], {"stop-opacity": X});
                                                break
                                            }
                                        default:
                                            "font-size" == q && (X = f(X, 10) + "px"), C = q.replace(/(\-.)/g, function (a) {
                                                return a.substring(1).toUpperCase()
                                            }), g[C] = X, b._.dirty = 1, B.setAttribute(q, X)
                                    }
                                }
                                "text" === b.type && p(b, r);
                                g.visibility = O
                            }
                        }, p = function (f, r) {
                            if ("text" == f.type && (r.hasOwnProperty("text") || r.hasOwnProperty("font") || r.hasOwnProperty("font-size") || r.hasOwnProperty("x") || r.hasOwnProperty("y") || r.hasOwnProperty("line-height") || r.hasOwnProperty("vertical-align"))) {
                                var u =
                                    f.attrs, k = f.node, B = k.firstChild && c._g.doc.defaultView.getComputedStyle(k.firstChild, "") ? b(c._g.doc.defaultView.getComputedStyle(k.firstChild, "").getPropertyValue("font-size")) : 10, F = b(r["line-height"] || u["line-height"]) || 1.2 * B, e = u.hasOwnProperty("vertical-align") ? u["vertical-align"] : "middle";
                                isNaN(F) && (F = 1.2 * B);
                                c.is(r.text, "array") && (r.text = r.text.join("<br>"));
                                e = "top" === e ? -.5 : "bottom" === e ? .5 : 0;
                                if (r.hasOwnProperty("text") && (r.text !== u.text || f._textdirty)) {
                                    for (u.text = r.text; k.firstChild;)k.removeChild(k.firstChild);
                                    for (var d = a(r.text).split(/\n|<br\s*?\/?>/ig), B = [], t, g = 0, O = d.length; g < O; g++)t = h("tspan"), g ? h(t, {
                                        dy: F,
                                        x: u.x
                                    }) : h(t, {
                                        dy: F * d.length * e,
                                        x: u.x
                                    }), d[g] || (t.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), d[g] = " "), t.appendChild(c._g.doc.createTextNode(d[g])), k.appendChild(t), B[g] = t;
                                    f._textdirty = !1
                                } else for (B = k.getElementsByTagName("tspan"), g = 0, O = B.length; g < O; g++)g ? h(B[g], {
                                    dy: F,
                                    x: u.x
                                }) : h(B[0], {dy: F * B.length * e, x: u.x});
                                h(k, {x: u.x, y: u.y});
                                f._.dirty = 1;
                                k = f._getBBox();
                                F = u.y - (k.y + k.height /
                                2);
                                if (k.isCalculated)switch (u["vertical-align"]) {
                                    case "top":
                                        F = .75 * k.height;
                                        break;
                                    case "bottom":
                                        F = -(.25 * k.height);
                                        break;
                                    default:
                                        F = u.y - (k.y + .25 * k.height)
                                }
                                F && c.is(F, "finite") && B[0] && h(B[0], {dy: F})
                            }
                        }, s = function (a, b, f) {
                            f = f || b;
                            f.canvas && f.canvas.appendChild(a);
                            this.node = this[0] = a;
                            a.raphael = !0;
                            a.raphaelid = this.id = c._oid++;
                            this.matrix = c.matrix();
                            this.realPath = null;
                            this.attrs = this.attrs || {};
                            this.followers = this.followers || [];
                            this.paper = b;
                            this.ca = this.customAttributes = this.customAttributes || new b._CustomAttributes;
                            this._ = {transform: [], sx: 1, sy: 1, deg: 0, dx: 0, dy: 0, dirty: 1};
                            this.parent = f;
                            !f.bottom && (f.bottom = this);
                            (this.prev = f.top) && (f.top.next = this);
                            f.top = this;
                            this.next = null
                        }, T = c.el;
                    s.prototype = T;
                    T.constructor = s;
                    c._engine.getNode = function (a) {
                        a = a.node || a[0].node;
                        return a.titleNode || a
                    };
                    c._engine.getLastNode = function (a) {
                        a = a.node || a[a.length - 1].node;
                        return a.titleNode || a
                    };
                    T.rotate = function (c, f, r) {
                        if (this.removed)return this;
                        c = a(c).split(e);
                        c.length - 1 && (f = b(c[1]), r = b(c[2]));
                        c = b(c[0]);
                        null == r && (f = r);
                        if (null == f || null ==
                            r)r = this.getBBox(1), f = r.x + r.width / 2, r = r.y + r.height / 2;
                        this.transform(this._.transform.concat([["r", c, f, r]]));
                        return this
                    };
                    T.scale = function (c, f, r, u) {
                        var k;
                        if (this.removed)return this;
                        c = a(c).split(e);
                        c.length - 1 && (f = b(c[1]), r = b(c[2]), u = b(c[3]));
                        c = b(c[0]);
                        null == f && (f = c);
                        null == u && (r = u);
                        if (null == r || null == u)k = this.getBBox(1);
                        r = null == r ? k.x + k.width / 2 : r;
                        u = null == u ? k.y + k.height / 2 : u;
                        this.transform(this._.transform.concat([["s", c, f, r, u]]));
                        return this
                    };
                    T.translate = function (c, f) {
                        if (this.removed)return this;
                        c = a(c).split(e);
                        c.length - 1 && (f = b(c[1]));
                        c = b(c[0]) || 0;
                        this.transform(this._.transform.concat([["t", c, +f || 0]]));
                        return this
                    };
                    T.transform = function (a) {
                        var b = this._;
                        if (null == a)return b.transform;
                        c._extractTransform(this, a);
                        this.clip && !b.clipispath && h(this.clip, {transform: this.matrix.invert()});
                        this.pattern && R(this);
                        this.node && h(this.node, {transform: this.matrix});
                        if (1 != b.sx || 1 != b.sy)a = this.attrs.hasOwnProperty("stroke-width") ? this.attrs["stroke-width"] : 1, this.attr({"stroke-width": a});
                        return this
                    };
                    T.hide = function () {
                        !this.removed &&
                        this.paper.safari(this.node.style.display = "none");
                        return this
                    };
                    T.show = function () {
                        !this.removed && this.paper.safari(this.node.style.display = "");
                        return this
                    };
                    T.remove = function () {
                        if (!this.removed && this.parent.canvas) {
                            var a = c._engine.getNode(this), b = this.paper, f = b.defs;
                            b.__set__ && b.__set__.exclude(this);
                            t.unbind("raphael.*.*." + this.id);
                            for (this.gradient && f && A(this); f = this.followers.pop();)f.el.remove();
                            for (; f = this.bottom;)f.remove();
                            this._drag && this.undrag();
                            if (this.events)for (; f = this.events.pop();)f.unbind();
                            this.parent.canvas.removeChild(a);
                            this.removeData();
                            delete b._elementsById[this.id];
                            c._tear(this, this.parent);
                            for (f in this)this[f] = "function" === typeof this[f] ? c._removedFactory(f) : null;
                            this.removed = !0
                        }
                    };
                    T._getBBox = function () {
                        var a = this.node, c = {}, b = this.attrs, f, r;
                        "none" === a.style.display && (this.show(), r = !0);
                        try {
                            c = a.getBBox(), "text" == this.type && (void 0 === c.x && (c.isCalculated = !0, f = b["text-anchor"], c.x = (b.x || 0) - c.width * ("start" === f ? 0 : "middle" === f ? .5 : 1)), void 0 === c.y && (c.isCalculated = !0, f = b["vertical-align"],
                                c.y = (b.y || 0) - c.height * ("bottom" === f ? 1 : "middle" === f ? .5 : 0)))
                        } catch (u) {
                        } finally {
                            c = c || {}
                        }
                        r && this.hide();
                        return c
                    };
                    T.attr = function (a, b) {
                        if (this.removed)return this;
                        if (null == a) {
                            var f = {}, r;
                            for (r in this.attrs)this.attrs.hasOwnProperty(r) && (f[r] = this.attrs[r]);
                            f.gradient && "none" == f.fill && (f.fill = f.gradient) && delete f.gradient;
                            f.transform = this._.transform;
                            f.visibility = "none" === this.node.style.display ? "hidden" : "visible";
                            return f
                        }
                        if (null == b && c.is(a, "string")) {
                            if ("fill" == a && "none" == this.attrs.fill && this.attrs.gradient)return this.attrs.gradient;
                            if ("transform" == a)return this._.transform;
                            if ("visibility" == a)return "none" === this.node.style.display ? "hidden" : "visible";
                            var f = a.split(e), u = {}, k = 0;
                            for (r = f.length; k < r; k++)a = f[k], a in this.attrs ? u[a] = this.attrs[a] : c.is(this.ca[a], "function") ? u[a] = this.ca[a].def : u[a] = c._availableAttrs[a];
                            return r - 1 ? u : u[f[0]]
                        }
                        if (null == b && c.is(a, "array")) {
                            u = {};
                            k = 0;
                            for (r = a.length; k < r; k++)u[a[k]] = this.attr(a[k]);
                            return u
                        }
                        null != b ? (f = {}, f[a] = b) : null != a && c.is(a, "object") && (f = a);
                        for (k in f)t("raphael.attr." + k + "." + this.id, this,
                            f[k], k);
                        var B = {};
                        for (k in this.ca)if (this.ca[k] && f.hasOwnProperty(k) && c.is(this.ca[k], "function") && !this.ca["_invoked" + k]) {
                            this.ca["_invoked" + k] = !0;
                            r = this.ca[k].apply(this, [].concat(f[k]));
                            delete this.ca["_invoked" + k];
                            for (u in r)r.hasOwnProperty(u) && (f[u] = r[u]);
                            this.attrs[k] = f[k];
                            !1 === r && (B[k] = f[k], delete f[k])
                        }
                        w(this, f);
                        var F, k = 0;
                        for (r = this.followers.length; k < r; k++)F = this.followers[k], F.cb && !F.cb.call(F.el, f, this) || F.el.attr(f);
                        for (u in B)f[u] = B[u];
                        return this
                    };
                    T.blur = function (a) {
                        if (0 !== +a) {
                            var b =
                                h("filter"), f = h("feGaussianBlur");
                            this.attrs.blur = a;
                            b.id = c.createUUID();
                            h(f, {stdDeviation: +a || 1.5});
                            b.appendChild(f);
                            this.paper.defs.appendChild(b);
                            this._blur = b;
                            h(this.node, {filter: "url('" + c._url + "#" + b.id + "')"})
                        } else this._blur && (this._blur.parentNode.removeChild(this._blur), delete this._blur, delete this.attrs.blur), this.node.removeAttribute("filter")
                    };
                    T.on = function (a, b) {
                        if (this.removed)return this;
                        var f = b;
                        c.supportsTouch && (a = c._touchMap[a] || "click" === a && "touchstart" || a, f = function (a) {
                            a.preventDefault();
                            b()
                        });
                        this.node["on" + a] = f;
                        return this
                    };
                    c._engine.path = function (a, c, b) {
                        var f = h("path");
                        a = new s(f, a, b);
                        a.type = "path";
                        w(a, c);
                        Ma(a, c);
                        return a
                    };
                    c._engine.group = function (a, c, b) {
                        var f = h("g");
                        a = new s(f, a, b);
                        a.type = "group";
                        a.canvas = a.node;
                        a.top = a.bottom = null;
                        a._id = c || "";
                        c && f.setAttribute("class", "raphael-group-" + a.id + "-" + c);
                        return a
                    };
                    c._engine.circle = function (a, c, b) {
                        var f = h("circle");
                        a = new s(f, a, b);
                        a.type = "circle";
                        w(a, c);
                        Ma(a, c);
                        return a
                    };
                    c._engine.rect = function (a, c, b) {
                        var f = h("rect");
                        a = new s(f, a, b);
                        a.type =
                            "rect";
                        c.rx = c.ry = c.r;
                        w(a, c);
                        Ma(a, c);
                        return a
                    };
                    c._engine.ellipse = function (a, c, b) {
                        var f = h("ellipse");
                        a = new s(f, a, b);
                        a.type = "ellipse";
                        w(a, c);
                        Ma(a, c);
                        return a
                    };
                    c._engine.image = function (a, c, b) {
                        var f = h("image");
                        a = new s(f, a, b);
                        a.type = "image";
                        f.setAttribute("preserveAspectRatio", "none");
                        w(a, c);
                        Ma(a, c);
                        return a
                    };
                    c._engine.text = function (a, c, b) {
                        var f = h("text");
                        a = new s(f, a, b);
                        a.type = "text";
                        a._textdirty = !0;
                        w(a, c);
                        Ma(a, c);
                        return a
                    };
                    c._engine.setSize = function (a, c) {
                        this.width = a || this.width;
                        this.height = c || this.height;
                        this.canvas.setAttribute("width", this.width);
                        this.canvas.setAttribute("height", this.height);
                        this._viewBox && this.setViewBox.apply(this, this._viewBox);
                        return this
                    };
                    c._engine.create = function () {
                        var a = c._getContainer.apply(0, arguments), b = a && a.container, f = a.x, r = a.y, u = a.width, a = a.height;
                        if (!b)throw Error("SVG container not found.");
                        var k = h("svg"), B, f = f || 0, r = r || 0, u = u || 512, a = a || 342;
                        h(k, {height: a, version: 1.1, width: u, xmlns: "http://www.w3.org/2000/svg"});
                        1 == b ? (k.style.cssText = "overflow:hidden;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-moz-user-select:-moz-none;-khtml-user-select:none;-ms-user-select:none;user-select:none;-o-user-select:none;cursor:default;position:absolute;left:" +
                        f + "px;top:" + r + "px", c._g.doc.body.appendChild(k), B = 1) : (k.style.cssText = "overflow:hidden;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-moz-user-select:-moz-none;-khtml-user-select:none;-ms-user-select:none;user-select:none;-o-user-select:none;cursor:default;position:relative", b.firstChild ? b.insertBefore(k, b.firstChild) : b.appendChild(k));
                        b = new c._Paper;
                        b.width = u;
                        b.height = a;
                        b.canvas = k;
                        h(k, {id: "raphael-paper-" + b.id});
                        b.clear();
                        b._left = b._top = 0;
                        B && (b.renderfix = function () {
                        });
                        b.renderfix();
                        return b
                    };
                    c._engine.setViewBox = function (a, c, b, f, r) {
                        t("raphael.setViewBox", this, this._viewBox, [a, c, b, f, r]);
                        var k = u(b / this.width, f / this.height), B = this.top, F = r ? "meet" : "xMinYMin", e;
                        null == a ? (this._vbSize && (k = 1), delete this._vbSize, e = "0 0 " + this.width + " " + this.height) : (this._vbSize = k, e = a + " " + c + " " + b + " " + f);
                        for (h(this.canvas, {
                            viewBox: e,
                            preserveAspectRatio: F
                        }); k && B;)F = "stroke-width"in B.attrs ? B.attrs["stroke-width"] : 1, B.attr({"stroke-width": F}), B._.dirty = 1, B._.dirtyT = 1, B = B.prev;
                        this._viewBox = [a, c, b, f, !!r];
                        return this
                    };
                    c.prototype.renderfix = function () {
                        var a = this.canvas, c = a.style, b;
                        try {
                            b = a.getScreenCTM() || a.createSVGMatrix()
                        } catch (f) {
                            b = a.createSVGMatrix()
                        }
                        a = -b.e % 1;
                        b = -b.f % 1;
                        if (a || b)a && (this._left = (this._left + a) % 1, c.left = this._left + "px"), b && (this._top = (this._top + b) % 1, c.top = this._top + "px")
                    };
                    c.prototype._desc = function (a) {
                        var b = this.desc;
                        if (b)for (; b.firstChild;)b.removeChild(b.firstChild); else this.desc = b = h("desc"), this.canvas.appendChild(b);
                        b.appendChild(c._g.doc.createTextNode(c.is(a, "string") ? a : "Created with Red Raphaël " +
                        c.version))
                    };
                    c.prototype.clear = function () {
                        var a;
                        for (t("raphael.clear", this); a = this.bottom;)a.remove();
                        for (a = this.canvas; a.firstChild;)a.removeChild(a.firstChild);
                        this.bottom = this.top = null;
                        a.appendChild(this.desc = h("desc"));
                        a.appendChild(this.defs = h("defs"))
                    };
                    c.prototype.remove = function () {
                        var a;
                        for (t("raphael.remove", this); a = this.bottom;)a.remove();
                        this.defs && this.defs.parentNode.removeChild(this.defs);
                        this.desc && this.desc.parentNode.removeChild(this.desc);
                        this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
                        for (a in this)this[a] = "function" == typeof this[a] ? c._removedFactory(a) : null;
                        this.removed = !0
                    };
                    var L = c.st, va;
                    for (va in T)T.hasOwnProperty(va) && !L.hasOwnProperty(va) && (L[va] = function (a) {
                        return function () {
                            var c = arguments;
                            return this.forEach(function (b) {
                                b[a].apply(b, c)
                            })
                        }
                    }(va))
                }
            })();
            (function () {
                if (c.vml) {
                    var a = String, b = parseFloat, f = Math, r = f.round, u = f.max, k = f.min, B = f.sqrt, F = f.abs, e = /[, ]+/, d = c.eve, t = {
                            M: "m",
                            L: "l",
                            C: "c",
                            Z: "x",
                            m: "t",
                            l: "r",
                            c: "v",
                            z: "x"
                        }, g = /([clmz]),?([^clmz]*)/gi, O = / progid:\S+Blur\([^\)]+\)/g,
                        h = /-?[^,\s-]+/g, A = {path: 1, rect: 1, image: 1}, X = {
                            circle: 1,
                            ellipse: 1
                        }, q = function (b) {
                            var f = /[ahqstv]/ig, u = c._pathToAbsolute;
                            a(b).match(f) && (u = c._path2curve);
                            f = /[clmz]/g;
                            if (u == c._pathToAbsolute && !a(b).match(f))return (b = a(b).replace(g, function (a, c, b) {
                                var f = [], u = "m" == c.toLowerCase(), k = t[c];
                                b.replace(h, function (a) {
                                    u && 2 == f.length && (k += f + t["m" == c ? "l" : "L"], f = []);
                                    f.push(r(21600 * a))
                                });
                                return k + f
                            })) || "m0,0";
                            var f = u(b), k;
                            b = [];
                            for (var B = 0, F = f.length; B < F; B++) {
                                u = f[B];
                                k = f[B][0].toLowerCase();
                                "z" == k && (k = "x");
                                for (var e =
                                    1, d = u.length; e < d; e++)k += r(21600 * u[e]) + (e != d - 1 ? "," : "");
                                b.push(k)
                            }
                            return b.length ? b.join(" ") : "m0,0"
                        }, l = function (a, b, f) {
                            var r = c.matrix();
                            r.rotate(-a, .5, .5);
                            return {dx: r.x(b, f), dy: r.y(b, f)}
                        }, C = function (a, c, b, f, r, u) {
                            var k = a._, B = a.matrix, e = k.fillpos;
                            a = a.node;
                            var d = a.style, t = 1, g = "", O = 21600 / c, h = 21600 / b;
                            d.visibility = "hidden";
                            if (c && b) {
                                a.coordsize = F(O) + " " + F(h);
                                d.rotation = u * (0 > c * b ? -1 : 1);
                                u && (r = l(u, f, r), f = r.dx, r = r.dy);
                                0 > c && (g += "x");
                                0 > b && (g += " y") && (t = -1);
                                d.flip = g;
                                a.coordorigin = f * -O + " " + r * -h;
                                if (e || k.fillsize)if (f =
                                        (f = a.getElementsByTagName("fill")) && f[0])a.removeChild(f), e && (r = l(u, B.x(e[0], e[1]), B.y(e[0], e[1])), f.position = r.dx * t + " " + r.dy * t), k.fillsize && (f.size = k.fillsize[0] * F(c) + " " + k.fillsize[1] * F(b)), a.appendChild(f);
                                d.visibility = "visible"
                            }
                        };
                    c._url = "";
                    c.toString = function () {
                        return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version
                    };
                    var E = function (c, b, f) {
                        b = a(b).toLowerCase().split("-");
                        f = f ? "end" : "start";
                        for (var r = b.length, u = "classic", k = "medium", B = "medium"; r--;)switch (b[r]) {
                            case "block":
                            case "classic":
                            case "oval":
                            case "diamond":
                            case "open":
                            case "none":
                                u =
                                    b[r];
                                break;
                            case "wide":
                            case "narrow":
                                B = b[r];
                                break;
                            case "long":
                            case "short":
                                k = b[r]
                        }
                        c = c.node.getElementsByTagName("stroke")[0];
                        c[f + "arrow"] = u;
                        c[f + "arrowlength"] = k;
                        c[f + "arrowwidth"] = B
                    }, R = function (a, c) {
                        for (var b in c)d("raphael.attr." + b + "." + a.id, a, c[b], b), a.ca[b] && a.attr(b, c[b])
                    }, n = c._setFillAndStroke = function (f, B) {
                        if (f.paper.canvas) {
                            f.attrs = f.attrs || {};
                            var F = f.node, d = f.attrs, t = F.style, g = A[f.type] && (B.x != d.x || B.y != d.y || B.width != d.width || B.height != d.height || B.cx != d.cx || B.cy != d.cy || B.rx != d.rx || B.ry != d.ry ||
                                B.r != d.r), O = X[f.type] && (d.cx != B.cx || d.cy != B.cy || d.r != B.r || d.rx != B.rx || d.ry != B.ry), h = "group" === f.type, l;
                            for (l in B)B.hasOwnProperty(l) && (d[l] = B[l]);
                            g && (d.path = c._getPath[f.type](f), f._.dirty = 1);
                            B.href && (F.href = B.href);
                            B.title && (F.title = B.title);
                            B.target && (F.target = B.target);
                            B.cursor && (t.cursor = B.cursor);
                            "blur"in B && f.blur(B.blur);
                            if (B.path && "path" == f.type || g)F.path = q(~a(d.path).toLowerCase().indexOf("r") ? c._pathToAbsolute(d.path) : d.path), "image" == f.type && (f._.fillpos = [d.x, d.y], f._.fillsize = [d.width,
                                d.height], C(f, 1, 1, 0, 0, 0));
                            "transform"in B && f.transform(B.transform);
                            "rotation"in B && (t = B.rotation, c.is(t, "array") ? f.rotate.apply(f, t) : f.rotate(t));
                            "visibility"in B && ("hidden" === B.visibility ? f.hide() : f.show());
                            O && (t = +d.cx, O = +d.cy, g = +d.rx || +d.r || 0, l = +d.ry || +d.r || 0, F.path = c.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", r(21600 * (t - g)), r(21600 * (O - l)), r(21600 * (t + g)), r(21600 * (O + l)), r(21600 * t)));
                            "clip-rect"in B && (t = a(B["clip-rect"]).split(e), 4 == t.length && (t[0] = +t[0], t[1] = +t[1], t[2] = +t[2] + t[0], t[3] = +t[3] + t[1],
                                g = h ? F : F.clipRect || c._g.doc.createElement("div"), O = g.style, h ? (f.clip = t.slice(), g = f.matrix.offset(), g = [b(g[0]), b(g[1])], t[0] -= g[0], t[1] -= g[1], t[2] -= g[0], t[3] -= g[1], O.width = "10800px", O.height = "10800px") : F.clipRect || (O.top = "0", O.left = "0", O.width = f.paper.width + "px", O.height = f.paper.height + "px", F.parentNode.insertBefore(g, F), g.appendChild(F), g.raphael = !0, g.raphaelid = F.raphaelid, F.clipRect = g), O.position = "absolute", O.clip = c.format("rect({1}px {2}px {3}px {0}px)", t)), B["clip-rect"] || (h && f.clip ? (F.style.clip =
                                "rect(auto auto auto auto)", delete f.clip) : F.clipRect && (F.clipRect.style.clip = "rect(auto auto auto auto)")));
                            f.textpath && (h = f.textpath.style, B.font && (h.font = B.font), B["font-family"] && (h.fontFamily = '"' + B["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, "") + '"'), B["font-size"] && (h.fontSize = B["font-size"]), B["font-weight"] && (h.fontWeight = B["font-weight"]), B["font-style"] && (h.fontStyle = B["font-style"]));
                            "arrow-start"in B && E(f, B["arrow-start"]);
                            "arrow-end"in B && E(f, B["arrow-end"], 1);
                            if (null != B.opacity ||
                                null != B["stroke-width"] || null != B.fill || null != B.src || null != B.stroke || null != B["stroke-width"] || null != B["stroke-opacity"] || null != B["fill-opacity"] || null != B["stroke-dasharray"] || null != B["stroke-miterlimit"] || null != B["stroke-linejoin"] || null != B["stroke-linecap"]) {
                                h = F.getElementsByTagName("fill");
                                t = -1;
                                h = h && h[0];
                                !h && (h = p("fill"));
                                "image" == f.type && B.src && (h.src = B.src);
                                B.fill && (h.on = !0);
                                if (null == h.on || "none" == B.fill || null === B.fill)h.on = !1;
                                h.on && B.fill && ((O = a(B.fill).match(c._ISURL)) ? (h.parentNode == F && F.removeChild(h),
                                    h.rotate = !0, h.src = O[1], h.type = "tile", g = f.getBBox(1), h.position = g.x + " " + g.y, f._.fillpos = [g.x, g.y], c._preload(O[1], function () {
                                    f._.fillsize = [this.offsetWidth, this.offsetHeight]
                                })) : (O = c.getRGB(B.fill), h.color = O.hex, h.src = "", h.type = "solid", O.error && (f.type in{
                                    circle: 1,
                                    ellipse: 1
                                } || "r" != a(B.fill).charAt()) && Ma(f, B.fill, h) ? (d.fill = "none", d.gradient = B.fill, h.rotate = !1) : "opacity"in O && !("fill-opacity"in B) && (t = O.opacity)));
                                if (-1 !== t || "fill-opacity"in B || "opacity"in B)O = ((+d["fill-opacity"] + 1 || 2) - 1) * ((+d.opacity +
                                1 || 2) - 1) * ((+t + 1 || 2) - 1), O = k(u(O, 0), 1), h.opacity = O, h.src && (h.color = "none");
                                F.appendChild(h);
                                h = F.getElementsByTagName("stroke") && F.getElementsByTagName("stroke")[0];
                                t = !1;
                                !h && (t = h = p("stroke"));
                                if (B.stroke && "none" != B.stroke || B["stroke-width"] || null != B["stroke-opacity"] || B["stroke-dasharray"] || B["stroke-miterlimit"] || B["stroke-linejoin"] || B["stroke-linecap"])h.on = !0;
                                "none" != B.stroke && null !== B.stroke && null != h.on && 0 != B.stroke && 0 != B["stroke-width"] || (h.on = !1);
                                O = c.getRGB("stroke"in B ? B.stroke : d.stroke);
                                h.on &&
                                B.stroke && (h.color = O.hex);
                                O = ((+d["stroke-opacity"] + 1 || 2) - 1) * ((+d.opacity + 1 || 2) - 1) * ((+O.opacity + 1 || 2) - 1);
                                g = .75 * (b(B["stroke-width"]) || 1);
                                O = k(u(O, 0), 1);
                                null == B["stroke-width"] && (g = d["stroke-width"]);
                                B["stroke-width"] && (h.weight = g);
                                g && 1 > g && (O *= g) && (h.weight = 1);
                                h.opacity = O;
                                B["stroke-linejoin"] && (h.joinstyle = B["stroke-linejoin"]) || t && (t.joinstyle = "miter");
                                h.miterlimit = B["stroke-miterlimit"] || 8;
                                B["stroke-linecap"] && (h.endcap = "butt" == B["stroke-linecap"] ? "flat" : "square" == B["stroke-linecap"] ? "square" : "round");
                                B["stroke-dasharray"] && (O = {
                                    "-": "shortdash",
                                    ".": "shortdot",
                                    "-.": "shortdashdot",
                                    "-..": "shortdashdotdot",
                                    ". ": "dot",
                                    "- ": "dash",
                                    "--": "longdash",
                                    "- .": "dashdot",
                                    "--.": "longdashdot",
                                    "--..": "longdashdotdot"
                                }, h.dashstyle = O.hasOwnProperty(B["stroke-dasharray"]) ? O[B["stroke-dasharray"]] : B["stroke-dasharray"].join && B["stroke-dasharray"].join(" ") || "");
                                t && F.appendChild(h)
                            }
                            if ("text" == f.type) {
                                f.paper.canvas.style.display = "";
                                F = f.paper.span;
                                h = d.font && d.font.match(/\d+(?:\.\d*)?(?=px)/);
                                O = d["line-height"] && (d["line-height"] +
                                "").match(/\d+(?:\.\d*)?(?=px)/);
                                t = F.style;
                                d.font && (t.font = d.font);
                                d["font-family"] && (t.fontFamily = d["font-family"]);
                                d["font-weight"] && (t.fontWeight = d["font-weight"]);
                                d["font-style"] && (t.fontStyle = d["font-style"]);
                                h = b(d["font-size"] || h && h[0]) || 10;
                                t.fontSize = 100 * h + "px";
                                O = b(d["line-height"] || O && O[0]) || 12;
                                d["line-height"] && (t.lineHeight = 100 * O + "px");
                                c.is(B.text, "array") && (B.text = f.textpath.string = B.text.join("\n").replace(/<br\s*?\/?>/ig, "\n"));
                                f.textpath.string && (F.innerHTML = a(f.textpath.string).replace(/</g,
                                    "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                                F = F.getBoundingClientRect();
                                f.W = d.w = (F.right - F.left) / 100;
                                f.H = d.h = (F.bottom - F.top) / 100;
                                f.X = d.x;
                                f.Y = d.y;
                                switch (d["vertical-align"]) {
                                    case "top":
                                        f.bby = f.H / 2;
                                        break;
                                    case "bottom":
                                        f.bby = -f.H / 2;
                                        break;
                                    default:
                                        f.bby = 0
                                }
                                ("x"in B || "y"in B || void 0 !== f.bby) && (f.path.v = c.format("m{0},{1}l{2},{1}", r(21600 * d.x), r(21600 * (d.y + (f.bby || 0))), r(21600 * d.x) + 1));
                                F = "x y text font font-family font-weight font-style font-size line-height".split(" ");
                                h = 0;
                                for (t = F.length; h < t; h++)if (F[h]in
                                    B) {
                                    f._.dirty = 1;
                                    break
                                }
                                switch (d["text-anchor"]) {
                                    case "start":
                                        f.textpath.style["v-text-align"] = "left";
                                        f.bbx = f.W / 2;
                                        break;
                                    case "end":
                                        f.textpath.style["v-text-align"] = "right";
                                        f.bbx = -f.W / 2;
                                        break;
                                    default:
                                        f.textpath.style["v-text-align"] = "center", f.bbx = 0
                                }
                                f.textpath.style["v-text-kern"] = !0
                            }
                        }
                    }, Ma = function (f, r, u) {
                        f.attrs = f.attrs || {};
                        var k = Math.pow, F = "linear", e = ".5 .5";
                        f.attrs.gradient = r;
                        r = a(r).replace(c._radial_gradient, function (a, c) {
                            F = "radial";
                            c = c && c.split(",") || [];
                            var f = c[3], r = c[4];
                            f && r && (f = b(f), r = b(r), .25 <
                            k(f - .5, 2) + k(r - .5, 2) && (r = B(.25 - k(f - .5, 2)) * (2 * (.5 < r) - 1) + .5), e = f + " " + r);
                            return ""
                        });
                        r = r.split(/\s*\-\s*/);
                        if ("linear" == F) {
                            var d = r.shift(), d = -b(d);
                            if (isNaN(d))return null
                        }
                        r = c._parseDots(r);
                        if (!r)return null;
                        f = f.shape || f.node;
                        if (r.length) {
                            u.parentNode == f && f.removeChild(u);
                            u.on = !0;
                            u.method = "none";
                            u.color = r[0].color;
                            u.color2 = r[r.length - 1].color;
                            for (var t = [], g = 1, O = void 0 === r[0].opacity ? 1 : r[0].opacity, h = 0, A = r.length; h < A; h++)r[h].offset && t.push(r[h].offset + " " + r[h].color), void 0 !== r[h].opacity && (g = r[h].opacity);
                            u.colors = t.length ? t.join() : "0% " + u.color;
                            u.opacity = g;
                            u["o:opacity2"] = O;
                            "radial" == F ? (u.type = "gradientTitle", u.focus = "100%", u.focussize = "0 0", u.focusposition = e, u.angle = 0) : (u.type = "gradient", u.angle = (270 - d) % 360);
                            f.appendChild(u)
                        }
                        return 1
                    }, s = function (a, b, f) {
                        f = f || b;
                        var r;
                        f.canvas && f.canvas.appendChild(a);
                        r = p("skew");
                        r.on = !0;
                        a.appendChild(r);
                        this.skew = r;
                        this.node = this[0] = a;
                        a.raphael = !0;
                        a.raphaelid = this.id = c._oid++;
                        this.Y = this.X = 0;
                        this.attrs = this.attrs || {};
                        this.followers = this.followers || [];
                        this.paper = b;
                        this.ca = this.customAttributes = this.customAttributes || new b._CustomAttributes;
                        this.matrix = c.matrix();
                        this._ = {transform: [], sx: 1, sy: 1, dx: 0, dy: 0, deg: 0, dirty: 1, dirtyT: 1};
                        this.parent = f;
                        !f.bottom && (f.bottom = this);
                        (this.prev = f.top) && (f.top.next = this);
                        f.top = this;
                        this.next = null
                    }, f = c.el;
                    s.prototype = f;
                    f.constructor = s;
                    f.transform = function (b) {
                        if (null == b)return this._.transform;
                        var f = this.paper._viewBoxShift, r = f ? "s" + [f.scale, f.scale] + "-1-1t" + [f.dx, f.dy] : "", u;
                        f && (u = b = a(b).replace(/\.{3}|\u2026/g, this._.transform ||
                        ""));
                        c._extractTransform(this, r + b);
                        var f = this.matrix.clone(), k = this.skew;
                        b = this.node;
                        var r = ~a(this.attrs.fill).indexOf("-"), B = !a(this.attrs.fill).indexOf("url(");
                        f.translate(-.5, -.5);
                        B || r || "image" == this.type ? (k.matrix = "1 0 0 1", k.offset = "0 0", k = f.split(), r && k.noRotation || !k.isSimple ? (b.style.filter = f.toFilter(), f = this.getBBox(), r = this.getBBox(1), B = f.x2 && r.x2 && "x2" || "x", k = f.y2 && r.y2 && "y2" || "y", B = f[B] - r[B], f = f[k] - r[k], b.coordorigin = -21600 * B + " " + -21600 * f, C(this, 1, 1, B, f, 0)) : (b.style.filter = "", C(this,
                            k.scalex, k.scaley, k.dx, k.dy, k.rotate))) : (b.style.filter = "", k.matrix = a(f), k.offset = f.offset());
                        u && (this._.transform = u);
                        return this
                    };
                    f.rotate = function (c, f, r) {
                        if (this.removed)return this;
                        if (null != c) {
                            c = a(c).split(e);
                            c.length - 1 && (f = b(c[1]), r = b(c[2]));
                            c = b(c[0]);
                            null == r && (f = r);
                            if (null == f || null == r)r = this.getBBox(1), f = r.x + r.width / 2, r = r.y + r.height / 2;
                            this._.dirtyT = 1;
                            this.transform(this._.transform.concat([["r", c, f, r]]));
                            return this
                        }
                    };
                    f.translate = function (c, f) {
                        if (this.removed)return this;
                        c = a(c).split(e);
                        c.length -
                        1 && (f = b(c[1]));
                        c = b(c[0]) || 0;
                        f = +f || 0;
                        this._.bbox && (this._.bbox.x += c, this._.bbox.y += f);
                        this.transform(this._.transform.concat([["t", c, f]]));
                        return this
                    };
                    f.scale = function (c, f, r, u) {
                        if (this.removed)return this;
                        c = a(c).split(e);
                        c.length - 1 && (f = b(c[1]), r = b(c[2]), u = b(c[3]), isNaN(r) && (r = null), isNaN(u) && (u = null));
                        c = b(c[0]);
                        null == f && (f = c);
                        null == u && (r = u);
                        if (null == r || null == u)var k = this.getBBox(1);
                        r = null == r ? k.x + k.width / 2 : r;
                        u = null == u ? k.y + k.height / 2 : u;
                        this.transform(this._.transform.concat([["s", c, f, r, u]]));
                        this._.dirtyT =
                            1;
                        return this
                    };
                    f.hide = function (a) {
                        !this.removed && (this.node.style.display = "none");
                        return this
                    };
                    f.show = function (a) {
                        !this.removed && (this.node.style.display = "");
                        return this
                    };
                    f._getBBox = function () {
                        return this.removed ? {} : {
                            x: this.X + (this.bbx || 0) - this.W / 2,
                            y: this.Y + (this.bby || 0) - this.H / 2,
                            width: this.W,
                            height: this.H
                        }
                    };
                    f.remove = function () {
                        if (!this.removed && this.parent.canvas) {
                            var a = c._engine.getNode(this), b = this.paper, f = this.shape;
                            b.__set__ && b.__set__.exclude(this);
                            d.unbind("raphael.*.*." + this.id);
                            f && f.parentNode.removeChild(f);
                            for (a.parentNode && a.parentNode.removeChild(a); a = this.followers.pop();)a.el.remove();
                            for (; a = this.bottom;)a.remove();
                            this._drag && this.undrag();
                            if (this.events)for (; a = this.events.pop();)a.unbind();
                            this.removeData();
                            delete b._elementsById[this.id];
                            c._tear(this, this.parent);
                            for (a in this)this[a] = "function" === typeof this[a] ? c._removedFactory(a) : null;
                            this.removed = !0
                        }
                    };
                    f.attr = function (a, b) {
                        if (this.removed)return this;
                        if (null == a) {
                            var f = {}, r;
                            for (r in this.attrs)this.attrs.hasOwnProperty(r) && (f[r] = this.attrs[r]);
                            f.gradient && "none" == f.fill && (f.fill = f.gradient) && delete f.gradient;
                            f.transform = this._.transform;
                            f.visibility = "none" === this.node.style.display ? "hidden" : "visible";
                            return f
                        }
                        if (null == b && c.is(a, "string")) {
                            if ("fill" == a && "none" == this.attrs.fill && this.attrs.gradient)return this.attrs.gradient;
                            if ("visibility" == a)return "none" === this.node.style.display ? "hidden" : "visible";
                            var f = a.split(e), u = {}, k = 0;
                            for (r = f.length; k < r; k++)a = f[k], a in this.attrs ? u[a] = this.attrs[a] : c.is(this.ca[a], "function") ? u[a] = this.ca[a].def :
                                u[a] = c._availableAttrs[a];
                            return r - 1 ? u : u[f[0]]
                        }
                        if (this.attrs && null == b && c.is(a, "array")) {
                            u = {};
                            k = 0;
                            for (r = a.length; k < r; k++)u[a[k]] = this.attr(a[k]);
                            return u
                        }
                        null != b && (f = {}, f[a] = b);
                        null == b && c.is(a, "object") && (f = a);
                        for (k in f)d("raphael.attr." + k + "." + this.id, this, f[k], k);
                        if (f) {
                            var B = {};
                            for (k in this.ca)if (this.ca[k] && f.hasOwnProperty(k) && c.is(this.ca[k], "function") && !this.ca["_invoked" + k]) {
                                this.ca["_invoked" + k] = !0;
                                r = this.ca[k].apply(this, [].concat(f[k]));
                                delete this.ca["_invoked" + k];
                                for (u in r)r.hasOwnProperty(u) &&
                                (f[u] = r[u]);
                                this.attrs[k] = f[k];
                                !1 === r && (B[k] = f[k], delete f[k])
                            }
                            "text"in f && "text" == this.type && (c.is(f.text, "array") && (f.text = f.text.join("\n")), this.textpath.string = f.text.replace(/<br\s*?\/?>/ig, "\n"));
                            n(this, f);
                            var F, k = 0;
                            for (r = this.followers.length; k < r; k++)F = this.followers[k], F.cb && !F.cb.call(F.el, f, this) || F.el.attr(f);
                            for (u in B)f[u] = B[u]
                        }
                        return this
                    };
                    f.blur = function (a) {
                        var b = this.node.runtimeStyle, f = b.filter, f = f.replace(O, "");
                        0 !== +a ? (this.attrs.blur = a, b.filter = f + "  progid:DXImageTransform.Microsoft.Blur(pixelradius=" +
                        (+a || 1.5) + ")", b.margin = c.format("-{0}px 0 0 -{0}px", r(+a || 1.5))) : (b.filter = f, b.margin = 0, delete this.attrs.blur);
                        return this
                    };
                    f.on = function (a, b) {
                        if (this.removed)return this;
                        this.node["on" + a] = function () {
                            var a = c._g.win.event;
                            a.target = a.srcElement;
                            b(a)
                        };
                        return this
                    };
                    c._engine.getNode = function (a) {
                        a = a.node || a[0].node;
                        return a.clipRect || a
                    };
                    c._engine.getLastNode = function (a) {
                        a = a.node || a[a.length - 1].node;
                        return a.clipRect || a
                    };
                    c._engine.group = function (a, b, f) {
                        var r = c._g.doc.createElement("div"), u = new s(r, a, f);
                        r.style.cssText = "position:absolute;left:0;top:0;width:1px;height:1px";
                        u._id = b || "";
                        b && (r.className = "raphael-group-" + u.id + "-" + b);
                        (f || a).canvas.appendChild(r);
                        u.type = "group";
                        u.canvas = u.node;
                        u.transform = c._engine.group.transform;
                        u.top = null;
                        u.bottom = null;
                        return u
                    };
                    c._engine.group.transform = function (f) {
                        if (null == f)return this._.transform;
                        var r = this.node.style, u = this.clip, k = this.paper._viewBoxShift, B = k ? "s" + [k.scale, k.scale] + "-1-1t" + [k.dx, k.dy] : "";
                        k && (f = a(f).replace(/\.{3}|\u2026/g, this._.transform || ""));
                        c._extractTransform(this, B + f);
                        f = this.matrix;
                        B = f.offset();
                        k = b(B[0]) || 0;
                        B = b(B[1]) || 0;
                        r.left = k + "px";
                        r.top = B + "px";
                        r.zoom = (this._.tzoom = f.get(0)) + "";
                        u && (r.clip = c.format("rect({1}px {2}px {3}px {0}px)", [u[0] - k, u[1] - B, u[2] - k, u[3] - B]));
                        return this
                    };
                    c._engine.path = function (a, c, b) {
                        var f = p("shape");
                        f.style.cssText = "position:absolute;left:0;top:0;width:1px;height:1px";
                        f.coordsize = "21600 21600";
                        f.coordorigin = a.coordorigin;
                        a = new s(f, a, b);
                        a.type = c.type || "path";
                        a.path = [];
                        a.Path = "";
                        c.type && delete c.type;
                        n(a, c);
                        R(a,
                            c);
                        return a
                    };
                    c._engine.rect = function (a, b, f) {
                        var r = c._rectPath(b.x, b.y, b.w, b.h, b.r);
                        b.path = r;
                        b.type = "rect";
                        a = a.path(b, f);
                        b = a.attrs;
                        a.X = b.x;
                        a.Y = b.y;
                        a.W = b.width;
                        a.H = b.height;
                        b.path = r;
                        return a
                    };
                    c._engine.ellipse = function (a, c, b) {
                        c.type = "ellipse";
                        a = a.path(c, b);
                        c = a.attrs;
                        a.X = c.x - c.rx;
                        a.Y = c.y - c.ry;
                        a.W = 2 * c.rx;
                        a.H = 2 * c.ry;
                        return a
                    };
                    c._engine.circle = function (a, c, b) {
                        c.type = "circle";
                        a = a.path(c, b);
                        c = a.attrs;
                        a.X = c.x - c.r;
                        a.Y = c.y - c.r;
                        a.W = a.H = 2 * c.r;
                        return a
                    };
                    c._engine.image = function (a, b, f) {
                        var r = c._rectPath(b.x, b.y,
                            b.w, b.h);
                        b.path = r;
                        b.type = "image";
                        b.stroke = "none";
                        a = a.path(b, f);
                        f = a.attrs;
                        var r = a.node, u = r.getElementsByTagName("fill")[0];
                        f.src = b.src;
                        a.X = f.x = b.x;
                        a.Y = f.y = b.y;
                        a.W = f.width = b.w;
                        a.H = f.height = b.h;
                        u.parentNode == r && r.removeChild(u);
                        u.rotate = !0;
                        u.src = f.src;
                        u.type = "tile";
                        a._.fillpos = [f.x, f.y];
                        a._.fillsize = [f.w, f.h];
                        r.appendChild(u);
                        C(a, 1, 1, 0, 0, 0);
                        return a
                    };
                    c._engine.text = function (b, f, u) {
                        var k = p("shape"), B = p("path"), F = p("textpath");
                        x = f.x || 0;
                        y = f.y || 0;
                        text = f.text;
                        B.v = c.format("m{0},{1}l{2},{1}", r(21600 * f.x),
                            r(21600 * f.y), r(21600 * f.x) + 1);
                        B.textpathok = !0;
                        F.string = a(f.text).replace(/<br\s*?\/?>/ig, "\n");
                        F.on = !0;
                        k.style.cssText = "position:absolute;left:0;top:0;width:1px;height:1px";
                        k.coordsize = "21600 21600";
                        k.coordorigin = "0 0";
                        b = new s(k, b, u);
                        b.shape = k;
                        b.path = B;
                        b.textpath = F;
                        b.type = "text";
                        b.attrs.text = a(f.text || "");
                        b.attrs.x = f.x;
                        b.attrs.y = f.y;
                        b.attrs.w = 1;
                        b.attrs.h = 1;
                        n(b, f);
                        R(b, f);
                        k.appendChild(F);
                        k.appendChild(B);
                        return b
                    };
                    c._engine.setSize = function (a, b) {
                        var f = this.canvas.style;
                        this.width = a;
                        this.height = b;
                        a == +a && (a += "px");
                        b == +b && (b += "px");
                        f.width = a;
                        f.height = b;
                        f.clip = "rect(0 " + a + " " + b + " 0)";
                        this._viewBox && c._engine.setViewBox.apply(this, this._viewBox);
                        return this
                    };
                    c._engine.setViewBox = function (a, b, c, f, r) {
                        d("raphael.setViewBox", this, this._viewBox, [a, b, c, f, r]);
                        var k = this.width, B = this.height, F = 1 / u(c / k, f / B), e, t;
                        r && (e = B / f, t = k / c, c * e < k && (a -= (k - c * e) / 2 / e), f * t < B && (b -= (B - f * t) / 2 / t));
                        this._viewBox = [a, b, c, f, !!r];
                        this._viewBoxShift = {dx: -a, dy: -b, scale: F};
                        this.forEach(function (a) {
                            a.transform("...")
                        });
                        return this
                    };
                    var p;
                    c._engine.initWin = function (b) {
                        var f = b.document;
                        f.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
                        try {
                            !f.namespaces.rvml && f.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), p = c._createNode = function (b, c) {
                                var r = f.createElement("<rvml:" + b + ' class="rvml">'), u;
                                for (u in c)r[u] = a(c[u]);
                                return r
                            }
                        } catch (r) {
                            p = c._createNode = function (b, c) {
                                var r = f.createElement("<" + b + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">'), u;
                                for (u in c)r[u] = a(c[u]);
                                return r
                            }
                        }
                    };
                    c._engine.initWin(c._g.win);
                    c._engine.create = function () {
                        var a = c._getContainer.apply(0, arguments), b = a.container, f = a.height, r = a.width, u = a.x, a = a.y;
                        if (!b)throw Error("VML container not found.");
                        var k = new c._Paper, B = k.canvas = c._g.doc.createElement("div"), F = B.style, u = u || 0, a = a || 0, r = r || 512, f = f || 342;
                        k.width = r;
                        k.height = f;
                        r == +r && (r += "px");
                        f == +f && (f += "px");
                        k.coordsize = "21600000 21600000";
                        k.coordorigin = "0 0";
                        B.id = "raphael-paper-" + k.id;
                        k.span = c._g.doc.createElement("span");
                        k.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
                        B.appendChild(k.span);
                        F.cssText = c.format("top:0;left:0;width:{0};height:{1};display:inline-block;cursor:default;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", r, f);
                        1 == b ? (c._g.doc.body.appendChild(B), F.left = u + "px", F.top = a + "px", F.position = "absolute") : b.firstChild ? b.insertBefore(B, b.firstChild) : b.appendChild(B);
                        k.renderfix = function () {
                        };
                        return k
                    };
                    c.prototype.clear = function () {
                        var a;
                        for (d("raphael.clear", this); a = this.bottom;)a.remove();
                        this.canvas.innerHTML = "";
                        this.span = c._g.doc.createElement("span");
                        this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
                        this.canvas.appendChild(this.span);
                        this.bottom = this.top = null
                    };
                    c.prototype.remove = function () {
                        var a;
                        for (d("raphael.remove", this); a = this.bottom;)a.remove();
                        this.canvas.parentNode.removeChild(this.canvas);
                        for (a in this)this[a] = "function" == typeof this[a] ? c._removedFactory(a) : null;
                        return !0
                    };
                    var w = c.st, va;
                    for (va in f)f.hasOwnProperty(va) && !w.hasOwnProperty(va) && (w[va] = function (a) {
                        return function () {
                            var b =
                                arguments;
                            return this.forEach(function (c) {
                                c[a].apply(c, b)
                            })
                        }
                    }(va))
                }
            })();
            $ ? s.win.Raphael = c : Raphael = c;
            return c
        }, !0)
    })();
    d.Raphael = D;
    d.Raphael.desc = "";
    m && m !== D ? window.Raphael = m : window.Raphael === D && (window.Raphael = void 0)
}]);
FusionCharts.register("module", ["private", "fusioncharts.redraphael.helper", function () {
    var d = {};
    this.hcLib.Raphael.fn._elementFromEvent = function (m) {
        if (!m || this.removed)return null;
        var D = m.srcElement || m.target || (m = m.originalEvent) && (m.srcElement || m.target) || d;
        "tspan" === D.nodeName && (D = D.parentNode);
        return this.getById(D.raphaelid)
    }
}]);
FusionCharts.register("module", ["private", "fusioncharts.redraphael.css", function () {
    var d = this.hcLib.Raphael, m = d.eve, D = d._g, v = d.fn, p = d.el, c = /[, ]+/, K = /\B([A-Z]{1})/g, b, G;
    b = function (a) {
        this.rules = {};
        this.ns = a || ""
    };
    G = b.prototype;
    G.getSheet = function () {
        var a = this.node;
        a || (a = this.node = D.doc.createElement("style"), this.node.setAttribute("id", d.format("raphael-stylesheet-{0}", d._oid++)), this.node.setAttribute("type", "text/css"), (D.doc.head || D.doc.getElementsByTagName("head")[0]).appendChild(this.node));
        return a
    };
    G.setCssText = function (a) {
        var b = this.node;
        if (!b)if (a)b = this.getSheet(); else return;
        b.styleSheet ? b.styleSheet.cssText = a || "" : (b.innerHTML = "", a && b.appendChild(D.doc.createTextNode(a)))
    };
    G.destroy = function () {
        this.node && this.node.parentNode && this.node.parentNode.removeChild(this.node);
        delete this.rules
    };
    G.clear = function () {
        this.setCssText("");
        this.rules = {}
    };
    G.add = function (a, b) {
        var c = this.rules[a] || (this.rules[a] = {}), d;
        for (d in b)c[d] = b[d]
    };
    G.render = function () {
        this.setCssText(this.toString())
    };
    G.toString =
        function (a) {
            var b = a ? "" : "\n", c = a ? "" : "\t";
            a = a ? ":" : ": ";
            var d = b, p, g;
            for (p in this.rules) {
                d += p.replace(/(^|\,)/g, "$1" + this.ns + " ") + " {" + b;
                p = this.rules[p];
                for (g in p)p[g] && (d += c + g.replace(K, "-$1").toLowerCase() + a + p[g] + ";" + b);
                d += "}" + b
            }
            return d
        };
    m.on("raphael.new", function () {
        this._stylesheet = this._stylesheet || new b;
        this.cssNamespace("")
    });
    m.on("raphael.remove", function () {
        this._stylesheet && this._stylesheet.destroy();
        delete this._stylesheet
    });
    v.cssNamespace = function (a) {
        arguments.length && (this._stylesheet.ns =
            d.format("{0}#raphael-paper-{1}", a && a + " " || "", this.id));
        return this._stylesheet.ns
    };
    v.cssAddRule = function (a, b) {
        if (1 === arguments.length && "object" === typeof a) {
            for (var c in a)this.cssAddRule(c, a[c]);
            return this
        }
        return this._stylesheet.add(a, b), this
    };
    v.cssRender = function () {
        return d.svg && this._stylesheet.render(), this
    };
    v.cssClear = function () {
        return this._stylesheet.clear(), this
    };
    d._availableAttrs["class"] = "";
    d.svg && m.on("raphael.attr.class", function (a) {
        var b = this.node;
        a = a || "";
        b.setAttribute("class", "group" ===
        this.type && this._id ? "raphael-group-" + this.id + "-" + this._id + " " + a : a)
    });
    d.vml && m.on("raphael.attr.class", function (a) {
        var b = this.paper, c = "." + a, b = b._stylesheet && b._stylesheet.rules, d = this.parent, p = this.attrs, g = {}, e;
        this.node.className = "group" === this.type ? a && this._id + " " + a || this._id : "rvml " + a;
        if (c && b) {
            a = b[c];
            for (e in a)"color" === e && "text" === this.type && (e = "fill"), !p[e] && (g[e] = a[e]);
            for (; d && d.attr;) {
                if (a = d.attr("class"))for (e in c = "." + a + " " + c, a = b[c], a)"color" === e && "text" === this.type && (e = "fill"), p[e] || g[e] ||
                (g[e] = a[e]);
                d = d.parent
            }
            this.css(g)
        }
    });
    p.css = function (a, b) {
        var p, v, z, g;
        if (this.removed)return this;
        this.styles || (this.styles = {});
        if (null == b && d.is(a, "string")) {
            p = a.split(c);
            v = {};
            g = 0;
            for (z = p.length; g < z; g++)a = p[g], a in this.styles && (v[a] = this.styles[a]);
            return z - 1 ? v : v[p[0]]
        }
        if (null == b && d.is(a, "array")) {
            v = {};
            g = 0;
            for (z = a.length; g < z; g++)v[a[g]] = this.styles(a[g]);
            return v
        }
        null != b ? (p = {}, p[a] = b) : null != a && d.is(a, "object") && (p = a);
        v = {};
        for (g in p)z = g.replace(/\B([A-Z]{1})/g, "-$1").toLowerCase(), d._availableAttrs.hasOwnProperty(z) ||
        "color" === z ? ("color" === z && "text" === this.type && (z = "fill"), v[z] = p[g], v.dirty = !0) : (m("raphael.css." + z + "." + this.id, this, p[g], z), this.node.style[z] = p[g], this.styles[z] = p[g]);
        g = 0;
        for (z = this.followers.length; g < z; g++)this.followers[g].el.attr(p);
        v.hasOwnProperty("dirty") && (delete v.dirty, this.attr(v));
        return this
    }
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-raphaelexport", function () {
    var d = this.hcLib, m = d.Raphael, D = d.pluckNumber, v = d.pluck, p = m._availableAttrs, c = /^matrix\(|\)$/g, K = /\,/g, b = /\n|<br\s*?\/?>/ig, G = /[^\d\.]/ig, a = /[\%\(\)\s,\xb0#]/g, l = /group/ig, P = /&/g, N = /"/g, z = /'/g, g = /</g, e = />/g, h = 0;
    (function (d) {
        var m = Math, H = parseFloat, q = m.max, J = m.abs, w = m.pow, ja = String, s = /[, ]+/, $ = [{
            reg: /xmlns\=\"http\:\/\/www.w3.org\/2000\/svg\"/ig,
            repStr: ""
        }, {
            reg: /^.*<svg /,
            repStr: '<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" '
        },
            {reg: /\/svg>.*$/, repStr: "/svg>"}, {reg: /<desc\>[^<]*<\/desc\>/, repStr: ""}, {
                reg: /zIndex="[^"]+"/g,
                repStr: ""
            }, {reg: /url\((\\?[\'\"])[^#]+#/g, repStr: "url($1#"}, {
                reg: / href=/g,
                repStr: " xlink:href="
            }, {reg: /(id|class|width|height)=([^" >]+)/g, repStr: '$1="$2"'}, {
                reg: /:(path|rect)/g,
                repStr: "$1"
            }, {reg: /<ima?ge? ([^\>]+?[^\/])\>/gi, repStr: "<image $1 />"}, {
                reg: /<\/ima?ge?\>/g,
                repStr: ""
            }, {
                reg: /style="([^"]+)"/g, repStr: function (a) {
                    return a.toLowerCase()
                }
            }], U = {
            blur: function () {
            }, transform: function () {
            }, src: function (a,
                              b) {
                b.attrSTR += ' xlink:href="' + b.attrs.src + '"'
            }, path: function (a, b) {
                var c = b.attrs.path, c = d._pathToAbsolute(c || "");
                b.attrSTR += ' d="' + (c.toString && c.toString() || "").replace(K, " ") + '"'
            }, gradient: function (b, c, e) {
                var g = b.attrs.gradient, h = "linear", l, p, s, I = .5, z = .5, t = p = "", R = "", Y, C, v, G;
                l = g.replace(a, "_");
                if (!e[l]) {
                    g = ja(g).replace(d._radial_gradient, function (a, b) {
                        var c, e, d, t, g, q, l;
                        b = b && b.split(",") || [];
                        h = "radial";
                        c = b[0];
                        e = b[1];
                        d = b[2];
                        t = b[3];
                        g = b[4];
                        G = b[5];
                        l = c && e;
                        d && (v = /\%/.test(d) ? d : H(d));
                        if ("userSpaceOnUse" ===
                            G)return l && (I = c, z = e), t && g && (Y = t, C = g, l || (I = Y, z = C)), "";
                        l && (I = H(c), z = H(e), c = 2 * (.5 < z) - 1, .25 < (q = w(I - .5, 2)) + w(z - .5, 2) && .25 > q && (z = m.sqrt(.25 - q) * c + .5) && .5 !== z && (z = z.toFixed(5) - 1E-5 * c));
                        t && g && (Y = H(t), C = H(g), c = 2 * (.5 < C) - 1, .25 < (q = w(Y - .5, 2)) + w(C - .5, 2) && .25 > q && (C = m.sqrt(.25 - q) * c + .5) && .5 !== C && (C = C.toFixed(5) - 1E-5 * c), l || (I = Y, z = C));
                        return ""
                    });
                    g = g.split(/\s*\-\s*/);
                    if ("linear" === h) {
                        p = g.shift();
                        p = -H(p);
                        if (isNaN(p))return null;
                        s = [0, 0, m.cos(d.rad(p)), m.sin(d.rad(p))];
                        p = 1 / (q(J(s[2]), J(s[3])) || 1);
                        s[2] *= p;
                        s[3] *= p;
                        0 > s[2] &&
                        (s[0] = -s[2], s[2] = 0);
                        0 > s[3] && (s[1] = -s[3], s[3] = 0)
                    }
                    g = d._parseDots(g);
                    if (!g)return null;
                    "radial" === h ? (p = '<radialGradient fx = "' + I + '" fy = "' + z + '" cy = "' + C + '" cx = "' + Y + '" r = "' + v + '" gradientUnits = "' + G + '" id = "' + l + '">', t = "</radialGradient>") : (p = '<linearGradient x1 = "' + s[0] + '" y1 = "' + s[1] + '" x2 = "' + s[2] + '" y2 = "' + s[3] + '" gradientTransform ="matrix(' + b.matrix.invert() + ')" id = "' + l + '">', t = "</linearGradient>");
                    b = 0;
                    for (s = g.length; b < s; b++)R += '<stop offset="' + (g[b].offset ? g[b].offset : b ? "100%" : "0%") +
                    '" stop-color="' + (g[b].color || "#fff") + '" stop-opacity="' + (void 0 === g[b].opacity ? 1 : g[b].opacity) + '" />';
                    e[l] = !0;
                    e.str += p + R + t
                }
                c.attrSTR += " fill=\"url('#" + l + "')\""
            }, fill: function (a, b) {
                var c = b.attrs, e = c.fill, g;
                a.attrs.gradient || (e = d.color(e), g = e.opacity, "text" === a.type ? b.styleSTR += "fill:" + e + "; stroke-opacity:0; " : (b.attrSTR += ' fill="' + e + '"', c["fill-opacity"] || !g && 0 !== g || (b.attrSTR += ' fill-opacity="' + g + '"')))
            }, stroke: function (a, b) {
                var c = b.attrs, e, g;
                e = d.color(c.stroke);
                g = e.opacity;
                "text" !== a.type && (b.attrSTR +=
                    ' stroke="' + e + '"', c["stroke-opacity"] || !g && 0 !== g || (b.attrSTR += ' stroke-opacity="' + g + '"'))
            }, "clip-rect": function (b, e, d) {
                var g = ja(e.attrs["clip-rect"]), q = g.split(s), g = g.replace(a, "_") + "__" + h++;
                4 === q.length && (d[g] || (d[g] = !0, d.str += '<clipPath id="' + g + '"><rect x="' + q[0] + '" y="' + q[1] + '" width="' + q[2] + '" height="' + q[3] + '" transform="matrix(' + b.matrix.invert().toMatrixString().replace(c, "") + ')"/></clipPath>'), e.attrSTR += ' clip-path="url(#' + g + ')"')
            }, cursor: function (a, b) {
                var c = b.attrs.cursor;
                c && (b.styleSTR +=
                    "cursor:" + c + "; ")
            }, font: function (a, b) {
                b.styleSTR += "font:" + b.attrs.font.replace(/\"/ig, " ") + "; "
            }, "font-size": function (a, b) {
                var c = v(b.attrs["font-size"], "10");
                c && c.replace && (c = c.replace(G, ""));
                b.styleSTR += "font-size:" + c + "px; "
            }, "font-weight": function (a, b) {
                b.styleSTR += "font-weight:" + b.attrs["font-weight"] + "; "
            }, "font-family": function (a, b) {
                b.styleSTR += "font-family:" + b.attrs["font-family"] + "; "
            }, "line-height": function () {
            }, "clip-path": function () {
            }, visibility: function () {
            }, "vertical-align": function () {
            },
            "text-anchor": function (a, b) {
                var c = b.attrs["text-anchor"] || "middle";
                "text" === a.type && (b.attrSTR += ' text-anchor="' + c + '"')
            }, title: function () {
            }, text: function (a, c) {
                var d = c.attrs, h = d.text, q = v(d["font-size"], d.font, "10"), l = v(d["line-height"]), n, p, s;
                q && q.replace && (q = q.replace(G, ""));
                q = D(q);
                l && l.replace && (l = l.replace(G, ""));
                l = D(l, q && 1.2 * q);
                n = q ? .85 * q : .75 * l;
                q = d.x;
                p = v(d["vertical-align"], "middle").toLowerCase();
                h = ja(h).split(b);
                s = h.length;
                d = 0;
                for (n = "top" === p ? n : "bottom" === p ? n - l * s : n - l * s * .5; d < s; d++)c.textSTR += "<tspan ",
                    p = (h[d] || "").replace(P, "&amp;").replace(N, "&quot;").replace(z, "&#39;").replace(g, "&lt;").replace(e, "&gt;"), c.textSTR = d ? c.textSTR + ('dy="' + l + '" x="' + q + '" ') : c.textSTR + ('dy="' + n + '"'), c.textSTR += ">" + p + "</tspan>"
            }
        }, ba = function (a, b) {
            var e = "", d = {
                attrSTR: "",
                styleSTR: "",
                textSTR: "",
                attrs: a.attr()
            }, g = a.isShadow, h = "", q = "", n, s, w = d.attrs;
            if ("none" === a.node.style.display || g)a.next && (e += ba(a.next, b)); else {
                for (n in w)if ("gradient" !== n && (void 0 !== p[n] || U[n]) && void 0 !== w[n])if (U[n])U[n](a, d, b); else d.attrSTR += " " + n +
                '="' + w[n] + '"';
                a.attrs.gradient && U.gradient(a, d, b);
                "rect" === a.type && w.r && (d.attrSTR += ' rx="' + w.r + '" ry="' + w.r + '"');
                for (s in a.styles)d.styleSTR += s + ":" + a.styles[s] + "; ";
                "image" === a.type && (d.attrSTR += ' preserveAspectRatio="none"');
                if ("text" === a.type && !w["text-anchor"])U["text-anchor"](a, d);
                a.bottom && (h = ba(a.bottom, b));
                a.next && (q = ba(a.next, b));
                g = a.type;
                g.match(l) && (g = "g");
                e += "<" + g + ' transform="matrix(' + a.matrix.toMatrixString().replace(c, "") + ')" style="' + d.styleSTR + '"' + d.attrSTR + ">" + d.textSTR + h + "</" +
                g + ">" + q
            }
            return e
        };
        d.fn.toSVG = function (a) {
            var b = "", c = {str: ""}, e = 0, g = $.length, h = "";
            if (d.svg) {
                if (this.canvas && this.canvas.parentNode) {
                    for (b = this.canvas.parentNode.innerHTML; e < g; e += 1)c = $[e], b = b.replace(c.reg, c.repStr);
                    this._stylesheet && (b = b.replace(/^(<svg\s[\s\S]*?>)/ig, '$1<style type="text/css">' + this._stylesheet.toString(!0) + "</style>"))
                }
            } else b = '<svg style="overflow: hidden; position: relative;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + this.width + '" version="1.1" height="' +
            this.height + '">', this.bottom && (h = ba(this.bottom, c)), b += "<defs>" + c.str + "</defs>" + h + "</svg>";
            a || (b = b.replace(/<image [^\>]*\>/gi, ""));
            return b
        }
    })(m)
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-raphaelshadow", function () {
    var d = this.window, m = d.Math.sqrt, D = d.parseFloat, v = d.parseInt, d = d.SVGFilterElement || d.SVGFEColorMatrixElement && 2 === d.SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE, p = this.hcLib.Raphael, c = {
        "drop-shadow": "drop-shadow",
        stroke: "stroke",
        fill: "fill",
        "stroke-width": "stroke-width",
        "stroke-opacity": "stroke-opacity",
        "stroke-linecap": "stroke-linecap",
        "stroke-linejoin": "stroke-linejoin",
        "shape-rendering": "shape-rendering",
        transform: "transform"
    }, K = p._createNode, b;
    p.svg ? (d && (p.el.dropshadow = function (b, a, c, d) {
        var v = this.node, z = this._.shadowFilter, g = this.paper.cacheShadows || (this.paper.cacheShadows = {}), e = "drop-shadow" + [b, a, c, d].join(" "), h;
        if ("none" === b) {
            if (z) {
                z.use -= 1;
                this.node.removeAttribute("filter");
                if (!z.use) {
                    e = z.hash;
                    for (h in z)b = z[h], b.parentNode && b.parentNode.removeChild(b), delete z[h];
                    delete g[e]
                }
                delete this._.shadowFilter
            }
        } else z && g[e] === z || (z = this.paper.defs.appendChild(K("filter", {
            id: p.createUUID(), width: "200%",
            height: "200%"
        })), d = p.color(d), d.error && (d = p.color("rgba(0,0,0,1)")), h = p.pick(d.opacity, 1), this._.shadowFilter = g[e] = {
            use: 1,
            filter: z,
            hash: e,
            offset: z.appendChild(K("feOffset", {result: "offOut", "in": "SourceGraphic", dx: D(b), dy: D(a)})),
            matrix: z.appendChild(K("feColorMatrix", {
                result: "matrixOut",
                "in": "offOut",
                type: "matrix",
                values: "0 0 0 0 " + d.r / 255 + " 0 0 0 0 " + d.g / 255 + " 0 0 0 0 " + d.b / 255 + " 0 0 0 " + h + " 0"
            })),
            blur: z.appendChild(K("feGaussianBlur", {result: "blurOut", "in": "matrixOut", stdDeviation: m(D(c))})),
            blend: z.appendChild(K("feComposite",
                {"in": "SourceGraphic", in2: "blurOut", operator: "over"}))
        }, v.setAttribute("filter", 'url("' + p._url + "#" + z.id + '")'));
        return this
    }), b = function (b, a) {
        var d = this.__shadowscale, p = {}, m, z;
        for (z in b)switch (c[z] && (p[z] = b[z], delete b[z]), z) {
            case "transform":
                m = a.matrix.clone();
                m.translate(this.__shadowx, this.__shadowy);
                this.transform(m.toTransformString());
                break;
            case "stroke-width":
                b[z] = ((p[z] || 1) + 6 - 2 * this.__shadowlevel) * d
        }
        this.attr(b);
        for (z in p)b[z] = p[z]
    }, p.ca["drop-shadow"] = function (c, a, d, m, D, z) {
        d = this._.shadows ||
        (this._.shadows = []);
        var g, e, h, n, M;
        if (!this.__shadowblocked)if ("none" === c)for (; e = d.pop();)e.remove(); else for (m = p.color(m), m.error && (m = p.color("rgba(0,0,0,1)")), D instanceof Array ? (g = D[0], D = D[1]) : g = D, g = 1 / p.pick(g, 1), D = 1 / p.pick(D, 1), c = p.pick(c, 1) * g, a = p.pick(a, 1) * g, g = .05 * p.pick(m.opacity, 1), h = v(this.attr("stroke-width") || 1, 10) + 6, n = this.matrix.clone(), n.translate(c, a), M = 1; 3 >= M; M++)e = (d[M - 1] || this.clone().follow(this, b, !z && "before")).attr({
            stroke: m.hex, "stroke-opacity": g * M, "stroke-width": (h - 2 * M) * D, transform: n.toTransformString(),
            "stroke-linecap": "round", "stroke-linejoin": "round", fill: "none"
        }), e.__shadowlevel = M, e.__shadowscale = D, e.__shadowx = c, e.__shadowy = a, z && z.appendChild(e), d.push(e);
        return !1
    }, p.el.shadow = function (b, a, c, d) {
        var m;
        c && c.constructor === p.el.constructor && (d = c, c = void 0);
        "object" === typeof b && (a && a.constructor === p.el.constructor && (d = a), a = b.opacity, c = b.scalefactor, m = !!b.useFilter, b = void 0 === b.apply ? !!a : b.apply);
        void 0 === a && (a = 1);
        if (this.dropshadow) {
            if (m)return b && this.dropshadow(1, 1, 3, "rgb(64,64,64)") || this.dropshadow("none"),
                this;
            this._.shadowFilter && this.dropshadow("none")
        }
        return this.attr("drop-shadow", b ? [1, 1, 3, "rgba(64,64,64," + a + ")", c, d] : "none")
    }) : p.vml ? (p.ca["drop-shadow"] = function (b, a, c, d, m, z) {
        var g = this._.shadow, e, h;
        if (this.isShadow)return !1;
        "none" === b ? g && (this._.shadow = g.remove()) : (g || (g = this._.shadow = this.clone(), z && z.appendChild(g.follow(this)) || g.follow(this, void 0, "before"), g.attr({
            fill: "none",
            "fill-opacity": .5,
            "stroke-opacity": 1
        }).isShadow = !0, 0 >= g.attr("stroke-width") && g.attr("stroke-width", 1)), z = g.node.runtimeStyle,
            e = z.filter.replace(/ progid:\S+Blur\([^\)]+\)/g, ""), d = p.color(d), d.error && (d = p.color("rgba(0,0,0,1)")), h = p.pick(d.opacity, 1) / 5, m = 1 / p.pick(m, 1), b = p.pick(b, 1) * m, a = p.pick(a, 1) * m, g.translate(b, a), z.filter = e + " progid:DXImageTransform.Microsoft.Blur(pixelRadius=" + D(.4 * c) + " makeShadow=True Color=" + d.hex + ' shadowOpacity="' + h + '");');
        return !1
    }, p.el.shadow = function (b, a, c, d) {
        c && c.constructor === p.el.constructor && (d = c, c = void 0);
        "object" === typeof b && (a && "group" === a.type && (d = a), a = b.opacity, c = b.scalefactor, b = void 0 ===
        b.apply ? !!a : b.apply);
        void 0 === a && (a = 1);
        return this.attr("drop-shadow", b || !a ? [1, 1, 5, "rgba(64,64,64," + a + ")", c, d] : "none")
    }) : p.canvas && (p.el.shadow = function () {
        return this
    })
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-raphaelshapes", function () {
    var d = this.window, m = "createTouch"in d.document, D = /msie/i.test(d.navigator.userAgent) && !d.opera, v = d.Math, p = v.cos, c = v.sin, K = v.abs, b = v.pow, G = v.atan2, a = v.tan, l = v.acos, P = v.min, N = v.round, z = v.PI, g = v.sqrt, e = 2 * z, h = d.parseInt, n = d.parseFloat, M = String, H = Array.prototype.slice, q = b(2, -24), J = "rgba(192,192,192," + (D ? .002 : 1E-6) + ")", w = this.hcLib.Raphael, ja = w.eve, s = w._createNode, $ = w._setFillAndStroke, U = w.el.constructor, ba = {
        speed: "optimizeSpeed",
        crisp: "crispEdges", precision: "geometricPrecision"
    }, Ba = {enabled: !1, "false": !1, 0: !1, disabled: !0, "true": !0, 1: !0}, la = {
        Q: "L",
        Z: "X",
        q: "l",
        z: "x",
        ",": " "
    }, ga = /,?([achlmqrstvxz]),?/gi, ea = /\s*\,\s*/g, pa, Z = function () {
        return this.join(",").replace(ga, pa)
    }, ma, L, I = w._cacher(function (a, c, d, e) {
        return g(b(d - a, 2) + b(e - c, 2))
    }), fa = w._cacher(function (a, b, c, d, e) {
        var g = c - a, h = d - b;
        c = I(a, b, c, d);
        return {x: a + g / c * e, y: b + h / c * e}
    });
    if (w.svg)ja.on("raphael.attr.shape-rendering", function (a, b) {
        var c = this.node;
        this.attrs[b] = a = ba[a] || a ||
        "auto";
        c.setAttribute(b, a);
        c.style.shapeRendering = a
    }); else if (w.vml)ja.on("raphael.attr.shape-rendering", function (a) {
        this.node.style.antialias = "crisp" !== a
    });
    w.define && w.define([{
        name: "polypath", polypath: function () {
            return this.path(void 0, w._lastArgIfGroup(arguments))
        }, ca: {
            polypath: function (a, b, d, e, g, q) {
                var l, s, m;
                l = [];
                a = h(a, 10) || 0;
                b = n(b) || 0;
                d = n(d) || 0;
                e = n(e) || 0;
                g = null === g || isNaN(g) ? .5 * z : w.rad(g);
                q = null === q || isNaN(q) ? 0 : n(q);
                s = g;
                if (2 < a)switch (g = 2 * z / a, q) {
                    case 0:
                        for (q = 0; q < a; q++)l.push("L", b + e * p(-s), d + e *
                        c(-s)), s += g;
                        l[0] = "M";
                        l.push("Z");
                        break;
                    case 1:
                        for (q = 0; q < a; q++)l.push("M", b, d, "L", b + e * p(-s), d + e * c(-s)), s += g;
                        break;
                    default:
                        g *= .5;
                        m = e * p(g) * (1 - q);
                        for (q = 0; q < a; q++)l.push("L", b + e * p(-s), d + e * c(-s)), s += g, l.push("L", b + m * p(-s), d + m * c(-s)), s += g;
                        l[0] = "M";
                        l.push("Z")
                } else 0 === e ? l.push("M", b, d, "L", b, d, "Z") : l.push("M", b - e, d, "A", e, e, 0, 0, 0, b + e, d, "A", e, e, 0, 0, 0, b - e, d, "Z");
                return {path: l}
            }, r: function (a) {
                var b = this.attrs.polypath;
                b[3] = a;
                this.attr("polypath", b);
                return !1
            }
        }
    }, {
        name: "ringpath", ringpath: function () {
            return this.path(void 0,
                w._lastArgIfGroup(arguments))
        }, ca: function (a, b, d, g, h, l) {
            var n = l % e - h % e, s = l - h, w, m, L, I, J;
            this._.ringangle = .5 * (h + l);
            K(s) < q ? (s = p(h), h = c(h), d = ["M", a + d * s, b + d * h, "L", a + g * s, b + g * h, "Z"]) : (K(s) > q && K(s) % e < q ? (d = ["M", a - d, b, "A", d, d, 0, 0, 0, a + d, b, "A", d, d, 0, 0, 0, a - d, b], 0 !== g && (d = d.concat(["M", a - g, b, "A", g, g, 0, 0, 1, a + g, b, "A", g, g, 0, 0, 1, a - g, b]))) : (s = p(h), h = c(h), w = p(l), l = c(l), n %= e, 0 > n && (n += e), n = n < z ? 0 : 1, m = a + d * s, I = b + d * h, L = a + d * w, J = b + d * l, w = a + g * w, l = b + g * l, .01 > K(m - L) && .01 > K(I - J) && (I = J + .01), d = ["M", m, I, "A", d, d, 0, n, 1, L, J, "L", w, l], 0 !==
            g && (a += g * s, b += g * h, .01 > K(w - a) && .01 > K(l - b) && (b = l + .01), d.push("A", g, g, 0, n, 0, a, b))), d.push("Z"));
            return {path: d}
        }
    }, {
        name: "cubepath", cubepath: function () {
            var a = {
                "stroke-linejoin": "round",
                "shape-rendering": "precision",
                stroke: "none"
            }, b = arguments, c = b.length - 1, d = b[c], e, g;
            d && d.constructor === w.el.constructor ? b[c] = void 0 : d = void 0;
            c = this.path(a, d);
            e = this.path(a, d);
            a = this.path(a, d);
            a._.cubetop = c.follow(a, void 0, "before");
            a._.cubeside = e.follow(a, void 0, "before");
            for (g in w.fn.cubepath.ca)a.ca[g] = w.fn.cubepath.ca[g];
            return a.attr("cubepath", [b[0], b[1], b[2], b[3], b[4], b[5]])
        }, fn: {
            _getBBox2: function () {
                var a = this._.cubeside.getBBox(), b = this._.cubetop.getBBox(), c = this.getBBox();
                return {x: c.x + b.height, y: c.y - a.width, width: c.width, height: c.height}
            }
        }, ca: {
            cubepath: function (a, b, c, d, e, g) {
                var h = this._.cubetop, q = this._.cubeside;
                a = a || 0;
                b = b || 0;
                c = c || 0;
                d = d || 0;
                e = e || 0;
                g = g || 0;
                this.attr("path", ["M", a + c, b, "l", 0, d, -c, 0, 0, -d, "z"]);
                h.attr("path", ["M", a, b, "l", 1, 1, c - 1, 0, 0, -1, e, -g, -c, 0, "z"]);
                q.attr("path", ["M", a + c - 1, b + 1, "l", 0, d - 1, 1, 0, e, -g,
                    0, -d, -e, g]);
                return !1
            }, "stroke-linejoin": function () {
                return {"stroke-linejoin": "round"}
            }, "drop-shadow": function (a, b, c, d) {
                var e = this._.cubetop, g = this._.cubeside;
                this.dropshadow && (e.dropshadow(a, -b, c, d), g.dropshadow(a, -b, c, d));
                return !1
            }, fill: function (a, b) {
                var c = this._.cubetop, d = this._.cubeside, e = this.attr("cubepath") || [0, 0, 0, 0, 0, 0], g = e[2], h = e[4], e = e[5], q;
                a = w.color(a);
                b ? (this.attr("fill", a), c.attr("fill", w.tintshade(a, -.78).rgba), d.attr("fill", w.tintshade(a, -.65).rgba)) : (q = "opacity"in a ? "rgba(" + [a.r, a.g,
                    a.b, a.opacity] + ")" : "rgb(" + [a.r, a.g, a.b] + ")", this.attr("fill", [270, w.tintshade(q, .55).rgba, w.tintshade(q, -.65).rgba].join("-")), d.attr("fill", [270, w.tintshade(q, -.75).rgba, w.tintshade(q, -.35).rgba].join("-")), c.attr("fill", [45 + w.deg(G(e, h + g)), w.tintshade(q, -.78).rgba, w.tintshade(q, .22).rgba].join("-")));
                return !1
            }
        }
    }, {
        name: "scroller", scroller: function (a, b, c, d, e, g, h) {
            var q = this.group("scroller", h), l = q.attrs, s = q._.scroller = {};
            e = e && "horizontal" || "vertical";
            var p, m = {}, L, I, z;
            s.track = this.rect(q).mousedown(function (a) {
                var b =
                    l["scroll-position"];
                a = "horizontal" === l["scroll-orientation"] ? a.layerX || a.x : a.layerY || a.y;
                a = (a - s.anchorOffset) / s.trackLength;
                p = w.animation({"scroll-position": a}, 2E3 * K(b - a), "easeIn");
                q.animate(p);
                ja("raphael.scroll.start." + q.id, q, b)
            }).mouseup(s._mouseupTrack = function () {
                this.stop(p);
                ja("raphael.scroll.end." + this.id, this, l["scroll-position"])
            }, q, !0);
            s.anchor = this.rect(q).drag(function () {
                m["scroll-position"] = L + arguments[I] / s.trackLength;
                q.animate(m, 0)
            }, function (a, b, c) {
                I = "horizontal" === l["scroll-orientation"] ?
                    0 : 1;
                ja("raphael.scroll.start." + q.id, q, L = l["scroll-position"]);
                c.stopPropagation()
            }, function () {
                ja("raphael.scroll.end." + q.id, q, L = l["scroll-position"])
            });
            for (z in w.fn.scroller.fn)q[z] = w.fn.scroller.fn[z];
            for (z in w.fn.scroller.ca)q.ca[z] = w.fn.scroller.ca[z];
            l["scroll-orientation"] = e;
            l["stroke-width"] = 1;
            q.ca["scroll-repaint"] = q.ca["scroll-repaint-" + e];
            !w.is(g, "object") && (g = {});
            return q.attr({
                ishot: !0,
                "scroll-display-buttons": g.showButtons && "arrow" || "none",
                "scroll-display-style": g.displayStyleFlat &&
                "flat" || "3d",
                "scroll-ratio": n(g.scrollRatio) || 1,
                "scroll-position": n(g.scrollPosition) || 0,
                "scroll-repaint": [a, b, c, d]
            })
        }, fn: {
            scroll: function (a, b) {
                var c = this._.scroller;
                b = b || this;
                c.callback = function () {
                    return a.apply(b, arguments)
                };
                return this
            }, remove: function () {
                var a = this._.scroller, b;
                this.attr("scroll-display-buttons", "none");
                a.track.unmouseup(a._mouseupTrack);
                for (b in a)a[b] && a[b].remove && a[b].remove(), a[b] = null;
                delete this._.scroller;
                w.el.remove.apply(this, arguments)
            }
        }, ca: {
            "stroke-width": function () {
                return !1
            },
            "drop-shadow": function (a, b, c, d, e, g) {
                this._.scroller.track.attr("drop-shadow", [a, b, c, d, e, g]);
                return !1
            }, "scroll-display-style": function (a) {
                var b = this.attrs, c = b["scroll-display-style"], d = b.fill;
                a = {flat: "flat", "3d": "3d", transparent: "transparent"}[a] || c;
                d && a !== c && (b["scroll-display-style"] = a, this.attr("fill", d));
                return {"scroll-display-style": a}
            }, "scroll-display-buttons": function (a) {
                var b = this, c = b.paper, d = b._.scroller, e = b.attrs, g = e["scroll-display-buttons"], h = e["scroll-repaint"], q, l;
                void 0 === g && (g = "none");
                a = {none: "none", arrow: "arrow"}[a] || g;
                a !== g && (e["scroll-display-buttons"] = a, "none" === a && d.start ? (d.arrowstart.remove(), delete d.arrowstart, d.arrowend.remove(), delete d.arrowend, d.start.unmouseup(d._mouseupStart), d.start.remove(), delete d.start, d.end.unmouseup(d._mouseupEnd), d.end.remove(), delete d.end) : (d.arrowstart = c.polypath(b), d.arrowend = c.polypath(b), d.start = c.rect(b).mousedown(function () {
                    var a;
                    0 !== (a = e["scroll-position"]) && (b.animate({"scroll-position": a - .1}, 100).animate(q = w.animation({"scroll-position": 0},
                        4500 * a, "easeIn")), ja("raphael.scroll.start." + b.id, b, a))
                }).mouseup(d._mouseupStart = function () {
                    b.stop(q);
                    ja("raphael.scroll.end." + b.id, b, e["scroll-position"])
                }, b, !0), d.end = c.rect(b).mousedown(function () {
                    var a;
                    1 !== (a = e["scroll-position"]) && (b.animate({"scroll-position": a + .1}, 100).animate(l = w.animation({"scroll-position": 1}, 4500 * (1 - a), "easeIn")), ja("raphael.scroll.start." + b.id, b, a))
                }).mouseup(d._mouseupEnd = function () {
                    b.stop(l);
                    ja("raphael.scroll.end." + b.id, b, e["scroll-position"])
                }, b, !0), e.fill && b.attr("fill",
                    e.fill)), h && b.attr("scroll-repaint", h));
                return {"scroll-display-buttons": a}
            }, "scroll-orientation": function (a) {
                var b = this.attrs, c = b["scroll-repaint"], d = b["scroll-orientation"];
                a = {horizontal: "horizontal", vertical: "vertical"}[a] || d;
                d !== a && (this.ca["scroll-repaint"] = this.ca["scroll-repaint-" + a], c && (c[2] += c[3], c[3] = c[2] - c[3], c[2] -= c[3], this.attr("scroll-repaint", c)), b.fill && this.attr("fill", b.fill));
                return {"scroll-orientation": a}
            }, "scroll-ratio": function (a) {
                var b = this.attrs, c = b["scroll-ratio"], d = b["scroll-repaint"];
                a = 1 < a ? 1 : .01 > a ? .01 : n(a);
                d && a !== c && (b["scroll-ratio"] = a, this.attr("scroll-repaint", d));
                return {"scroll-ratio": a}
            }, "scroll-position": function (a, b) {
                var c = this.attrs, d = "horizontal" === c["scroll-orientation"], e = c["scroll-repaint"], g = c["scroll-position"], h = this._.scroller, q = h.anchor;
                a = 1 < a ? 1 : 0 > a ? 0 : n(a);
                isNaN(a) && (a = g);
                e && (g !== a || b) && (g = h.start && h.start.attr(d && "width" || "height") || 0, d && q.attr("x", e[0] + g + (e[2] - 2 * g - q.attr("width")) * a + .5) || q.attr("y", e[1] + g + (e[3] - 2 * g - q.attr("height")) * a + .5), !b && 1 > c["scroll-ratio"] &&
                (ja("raphael.scroll.change." + this.id, this, a), h.callback && h.callback(a)));
                return {"scroll-position": a}
            }, r: function (a) {
                var b = this._.scroller;
                b.track.attr("r", a);
                b.anchor.attr("r", "none" === this.attrs["scroll-display-buttons"] && a || 0);
                return !1
            }, "scroll-repaint-horizontal": function (a, b, c, d) {
                var e = this.attrs, g = this._.scroller, h = e["scroll-ratio"], q = e["scroll-position"], l = 0, n = c * h, e = "none" === e["scroll-display-buttons"];
                c && (c -= 1);
                a && (a += .5);
                d && (d -= 1);
                b && (b += .5);
                g.track.attr({width: c, height: d, y: b, x: a}).crisp();
                e || (l = P(d, .5 * c), n -= 2 * l * h, g.start.attr({
                    width: l,
                    height: d,
                    x: a,
                    y: b
                }), g.arrowstart.attr("polypath", [3, a + .5 * l, b + .5 * d, .25 * l, 180]), g.end.attr({
                    width: l,
                    height: d,
                    x: a + c - l,
                    y: b
                }), g.arrowend.attr("polypath", [3, a + c - .5 * l, b + .5 * l, .25 * l, 0]));
                g.trackLength = c - 2 * l - n;
                g.trackOffset = a + l + .5;
                g.anchorOffset = g.trackOffset + .5 * (n - 1);
                g.anchor.attr({height: d, width: n - 1, y: b, x: g.trackOffset + g.trackLength * q}).crisp()
            }, "scroll-repaint-vertical": function (a, b, c, d) {
                var e = this.attrs, g = this._.scroller, h = e["scroll-ratio"], q = e["scroll-position"],
                    l = 0, n = d * h, e = "none" === e["scroll-display-buttons"];
                c && (c -= 1);
                a && (a += .5);
                d && (d -= 1);
                b && (b += .5);
                g.track.attr({width: c, height: d, y: b, x: a}).crisp();
                e || (l = P(c, .5 * d), n -= 2 * l * h, g.start.attr({
                    width: c,
                    height: l,
                    x: a,
                    y: b
                }), g.arrowstart.attr("polypath", [3, a + .5 * c, b + .5 * l, .25 * l, 90]), g.end.attr({
                    width: c,
                    height: l,
                    x: a,
                    y: b + d - l
                }), g.arrowend.attr("polypath", [3, a + .5 * c, b + d - .5 * l, .25 * l, -90]));
                g.trackLength = d - 2 * l - n;
                g.trackOffset = b + l + .5;
                g.anchorOffset = g.trackOffset + .5 * (n - 1);
                g.anchor.attr({
                    height: n - 1, width: c, y: g.trackOffset + g.trackLength *
                    q, x: a
                }).crisp()
            }, fill: function (a) {
                var b = this.attrs, c = this._.scroller, d = b["scroll-repaint"], e = "flat" === b["scroll-display-style"], g = "horizontal" === b["scroll-orientation"], h = {stroke: "none"}, q;
                m && d && 3 < (q = 16 - d[g && 3 || 2]) && (h.stroke = J, h["stroke-width"] = q);
                a = w.color(a);
                a.error && (a = "#000000");
                a = "opacity"in a ? "rgba(" + [a.r, a.g, a.b, a.opacity] + ")" : "rgb(" + [a.r, a.g, a.b] + ")";
                h.fill = e && a || [90 * g, w.tintshade(a, .15).rgba, a].join("-");
                h.stroke = w.tintshade(a, -.75).rgba;
                c.track.attr(h);
                h.fill = e && w.tintshade(a, -.6).rgba ||
                [270 * g, w.tintshade(a, .3).rgba + ":40", w.tintshade(a, -.7).rgba].join("-");
                h.stroke = w.tintshade(a, -.6).rgba;
                c.anchor.attr(h);
                h.stroke = "none";
                "none" !== b["scroll-display-buttons"] && (h.fill = J, c.start.attr(h), c.end.attr(h), h.fill = w.tintshade(a, -.4).rgba, c.arrowstart.attr(h), c.arrowend.attr(h));
                return !1
            }
        }
    }, {
        name: "button", button: function (a, b, c, d, e, g) {
            g = this.group("button", g);
            var h;
            g._.button = {
                bound: this.rect(g),
                tracker: this.rect(g).attr({fill: J, stroke: J, cursor: "pointer"}).data("compositeButton", g)
            };
            !w.is(e,
                "object") && (e = {});
            for (h in w.fn.button.fn)g[h] = w.fn.button.fn[h];
            for (h in w.fn.button.ca)g.ca[h] = w.fn.button.ca[h];
            return g.attr({
                ishot: !0,
                "button-padding": [e.horizontalPadding, e.verticalPadding],
                "button-label": c,
                "button-symbol": d,
                "button-disabled": e.disabled || "false",
                "button-symbol-position": e.symbolPosition,
                "button-symbol-padding": e.symbolPadding
            }).attr("button-repaint", [a, b, e.width, e.height, e.r])
        }, data: {
            hoverin: function () {
                var a = this._.button.hoverbackIn;
                a && !1 === a() || (this.attr("fill", "hover").hovered = !0)
            }, hoverout: function () {
                var a = this._.button.hoverbackOut;
                a && !1 === a() || (this.attr("fill", (this.pressed || this.active) && "active" || "normal").hovered = !1)
            }, mousedown: function () {
                this.attr("fill", "active").pressed = !0
            }, mouseup: function () {
                var a = this._.button.callback;
                this.attr("fill", this.hovered && "hover" || this.active && "active" || "normal").pressed = !1;
                a()
            }
        }, fn: {
            tooltip: function () {
                w.el.tooltip && w.el.tooltip.apply(this._.button.tracker, arguments);
                return this
            }, buttonclick: function (a, b) {
                var c = this._.button;
                b = b ||
                this;
                c.callback = function () {
                    return a.apply(b, arguments)
                };
                return this
            }, labelcss: function () {
                var a = this._.button, b = a.label;
                a.cssArg = arguments;
                b && b.css.apply(b, arguments);
                return this.attr("button-repaint", this.attrs["button-repaint"])
            }, buttonhover: function (a, b, c, d) {
                var e = this._.button;
                c = c || this;
                d = d || this;
                e.hoverbackIn = function () {
                    return a.apply(c, arguments)
                };
                e.hoverbackOut = function () {
                    return b.apply(d, arguments)
                };
                return this
            }, remove: function () {
                var a = this._.button, b;
                this.attr("button-disabled", "true");
                for (b in a)a[b] &&
                a[b].remove && a[b].remove(), a[b] = null;
                delete this._.button;
                w.el.remove.apply(this, arguments)
            }
        }, ca: {
            "button-active": function (a) {
                this.attr("fill", (this.active = !!a) ? "active" : this.hovered && "hover" || "normal")
            }, "button-disabled": function (a) {
                var b = this._.button.tracker, c = this.attrs["button-disabled"], d = this.paper.button.data;
                a = Ba[a];
                c = Ba[c];
                if (void 0 !== a && a !== c)switch (a) {
                    case !0:
                        b.attr("fill", "rgba(204,204,205,.5)").unmousedown(d.mousedown).unmouseup(d.mouseup).unhover(d.hoverin, d.hoverout);
                        break;
                    case !1:
                        b.attr("fill",
                            J).mousedown(d.mousedown, this).mouseup(d.mouseup, this, !0).hover(d.hoverin, d.hoverout, this, this)
                }
            }, "button-label": function (a) {
                var b = this._.button, c = this.attrs, d = b.label, e = b.cssArg, g = this.attrs["button-repaint"];
                a = M(a || "");
                "none" === a ? d && (b.label = d.remove()) : a && (!d && (d = b.label = this.paper.text(this).insertBefore(b.tracker)), d.attr({
                    text: a,
                    "text-anchor": "middle",
                    "vertical-align": "middle"
                }), e && e.length && d.css.apply(d, e));
                g && c["button-label"] !== a && this.attr("button-repaint", g)
            }, "button-symbol": function (a) {
                var b =
                    this.attrs, c = this._.button, d = c.symbol, e = this.attrs["button-repaint"];
                a = M(a || "");
                "none" === a ? d && (c.symbol = d.remove()) : a && !d && (c.symbol = this.paper.symbol(this).insertAfter(c.bound));
                e && b["button-symbol"] !== a && this.attr("button-repaint", e)
            }, "button-symbol-position": function (a) {
                return {
                    "button-symbol-position": {
                        top: "top",
                        right: "right",
                        bottom: "bottom",
                        left: "left",
                        none: "none"
                    }[M(a).toLowerCase()] || "none"
                }
            }, "button-symbol-padding": function (a) {
                return {"button-symbol-padding": n(a)}
            }, "button-padding": function (a,
                                           b) {
                return {"button-padding": [null == a && (a = 5) || n(a), null == b && a || n(b)]}
            }, "button-repaint": function (a, b, c, d, e) {
                var g = this._.button, h = g.bound, q = g.label, l = g.symbol, n = this.attrs, s = n["button-padding"], p = s[0], m = s[1], L, I;
                void 0 === a && (a = 0);
                void 0 === b && (b = 0);
                if (void 0 === c || void 0 === d)L = q && q.getBBox() || {
                    width: 0,
                    height: 0
                }, void 0 === c && (c = 2 * p + L.width), void 0 === d && (d = 2 * m + L.height);
                h = w.crispBound(a, b, c, d, h.attr("stroke-width"));
                h.r = w.pick(e, N(.1 * P(d, c)));
                a = h.x;
                b = h.y;
                c = h.width;
                d = h.height;
                q && q.attr({x: a + c / 2, y: b + d / 2});
                if (l) {
                    !w.is(I = n["button-symbol-padding"], "finite") && (I = .2 * d);
                    e = d - m;
                    L = .5 * e;
                    switch (n["button-symbol-position"] + (q && "+" || "-")) {
                        case "right+":
                            a = a + (c + (2 * L + m)) - L - p;
                            b += .5 * d;
                            q.attr("transform", ["t", -(e + I), 0]);
                            break;
                        case "left+":
                            a = a + p + L;
                            b += .5 * d;
                            q.attr("transform", ["t", e + I, 0]);
                            break;
                        case "top+":
                            a += .5 * c;
                            b = b + s[1] + L;
                            q.attr("transform", ["t", 0, e + I]);
                            break;
                        case "bottom+":
                            a += .5 * c;
                            b = b + (d + (2 * L + I)) - m - L;
                            q.attr("transform", ["t", 0, -(e + I)]);
                            break;
                        default:
                            a += .5 * c, b += .5 * d
                    }
                    l.attr("symbol", [n["button-symbol"], a, b, L])
                }
                g.bound.attr(h);
                g.tracker.attr(h)
            }, fill: function (a, b, c, d) {
                var e = this._.button, g = e.bound, h = e.symbol, q = e.label, l = {
                    normal: e.gradient,
                    active: e.gradientActive,
                    hover: e.gradientHover
                }[a];
                l || (a = w.getRGB(a), a.error && (a = w.color("#cccccc")), a = "opacity"in a ? "rgba(" + [a.r, a.g, a.b, a.opacity] + ")" : "rgb(" + [a.r, a.g, a.b] + ")", e.gradient = [90, w.tintshade(a, -.8).rgba + ":0", w.tintshade(a, .8).rgba + ":100"].join("-"), e.gradientActive = [270, w.tintshade(a, -.8).rgba + ":0", w.tintshade(a, .8).rgba + ":100"].join("-"), d = w.getRGB(d), d.error && (d = a) || (d =
                    "opacity"in d ? "rgba(" + [d.r, d.g, d.b, d.opacity] + ")" : "rgb(" + [d.r, d.g, d.b] + ")"), e.gradientHover = [90, w.tintshade(d, -.9).rgba + ":0", w.tintshade(d, .7).rgba + ":100"].join("-"), c = c || w.tintshade(a, .2).rgba, b = b || w.tintshade(a, -.2).rgba, e.symbolFill = c, e.labelFill = b, l = (this.pressed || this.active) && e.gradientActive || this.hovered && e.gradienthover || e.gradient);
                g.attr("fill", l);
                h && h.attr("fill", e.symbolFill);
                q && q.attr("fill", e.labelFill);
                return !1
            }, stroke: function (a, b) {
                var c = this._.button, d = c.symbol;
                a = w.color(a);
                a.error &&
                (a = w.color("#999999"));
                c.bound.attr("stroke", a);
                d && d.attr("stroke", b || a);
                return !1
            }, "stroke-width": function (a, b) {
                var c = this._.button, d = c.symbol;
                c.bound.attr("stroke-width", a);
                c.tracker.attr("stroke-width", a);
                d && d.attr("stroke-width", b);
                return !1
            }
        }
    }, {
        name: "trianglepath", trianglepath: function () {
            var a = arguments, b = w._lastArgIfGroup(a);
            return this.path(b).attr("trianglepath", [a[0], a[1], a[2], a[3], a[4], a[5], a[6] || 0, a[7] || 0, a[8] || 0])
        }, fn: {
            sides: function () {
                var a = this._args;
                return [I(a[0], a[1], a[2], a[3]), I(a[2],
                    a[3], a[4], a[5]), I(a[4], a[5], a[0], a[1])]
            }, enclosedAngles: function () {
                var a = this._sides;
                return [l((b(a[0], 2) + b(a[2], 2) - b(a[1], 2)) / (2 * a[0] * a[2])), l((b(a[0], 2) + b(a[1], 2) - b(a[2], 2)) / (2 * a[0] * a[1])), l((b(a[2], 2) + b(a[1], 2) - b(a[0], 2)) / (2 * a[2] * a[1]))]
            }, semiperimeter: function () {
                var a = this._sides || this.sides();
                return (a[0] + a[1] + a[2]) / 2
            }
        }, ca: {
            trianglepath: function (b, c, d, e, h, q, l, n, s) {
                if (l || n || s) {
                    this._args = arguments;
                    this._sides = this.sides();
                    var p = this.enclosedAngles(), w;
                    w = this.semiperimeter();
                    w = g(w * (w - this._sides[0]) *
                    (w - this._sides[1]) * (w - this._sides[2])) / w;
                    p = [P(l, w) / a(p[0] / 2), P(n, w) / a(p[1] / 2), P(s, w) / a(p[2] / 2)];
                    p = [fa(b, c, h, q, p[0]), fa(b, c, d, e, p[0]), fa(d, e, b, c, p[1]), fa(d, e, h, q, p[1]), fa(h, q, d, e, p[2]), fa(h, q, b, c, p[2])];
                    this.attr({path: ["M", p[0].x, p[0].y, "Q", b, c, p[1].x, p[1].y, "L", p[2].x, p[2].y, "Q", d, e, p[3].x, p[3].y, "L", p[4].x, p[4].y, "Q", h, q, p[5].x, p[5].y, "L", p[0].x, p[0].y]})
                } else this.attr({path: ["M", b, c, "L", d, e, h, q, "Z"]})
            }
        }
    }]);
    w.ca["text-bound"] = function (a, b, c, d, e, g) {
        d = this.paper;
        var h = this._.textbound;
        if ("text" ===
            this.type) {
            if (!(b && "none" !== b || a && "none" !== a))return this._.textbound = h && h.unfollow(this).remove(), !1;
            c && w.is(c, "finite") || (c = 0);
            e && w.is(e, "finite") || (e = 0);
            !h && (h = this._.textbound = d.rect(0, 0, 0, 0, this.group).follow(this, w.ca["text-bound"].reposition, "before"));
            h.attr({stroke: b, "stroke-width": c, fill: a, "shape-rendering": 1 === c && "crisp" || "", r: e});
            g && h.attr("stroke-dasharray", g);
            w.ca["text-bound"].reposition.call(h, this.attr(), this);
            return !1
        }
    };
    w.ca["text-bound"].reposition = function (a, b) {
        var c = {}, d, e, g,
            h, q;
        a.hasOwnProperty("visibility") && this.attr("visibility", a.visibility);
        if (a.hasOwnProperty("text-bound") || a.hasOwnProperty("x") || a.hasOwnProperty("y") || a.hasOwnProperty("text") || a.hasOwnProperty("text-anchor") || a.hasOwnProperty("text-align") || a.hasOwnProperty("font-size") || a.hasOwnProperty("line-height") || a.hasOwnProperty("vertical-align") || a.hasOwnProperty("transform") || a.hasOwnProperty("rotation"))d = b.attrs["text-bound"], e = M(d && d[3] || "0").split(ea), d = n(e[0]) || 0, e = w.pick(n(e[1]), d), g = b.getBBox(),
            h = g.width, q = g.height, isNaN(h) || (c.x = g.x - d, c.y = g.y - e, c.width = h + 2 * d, c.height = q + 2 * e), this.attr(c)
    };
    w.fn.symbol = function () {
        var a = arguments, b = a.length - 1, c = a[b];
        c && c.constructor === w.el.constructor ? a[b] = void 0 : c = void 0;
        b = this.path(void 0, c);
        b.ca.symbol = w.fn.symbol.ca.symbol;
        return a.length === !!c + 0 ? b : b.attr("symbol", a)
    };
    w.fn.symbol.cache = {
        "": w._cacher(function (a, b, c, d) {
            return 3 < arguments.length ? ["M", a, b, "h", c, "v", d, "h", -c, "v", -d, "z"] : ["M", a - c, b - c, "h", c *= 2, "v", c, "h", -c, "v", -c, "z"]
        })
    };
    w.fn.symbol.ca = {
        symbol: function (a) {
            var b =
                w.is(a, "object") && 1 === arguments.length && !w.is(a, "function") ? a : arguments, c;
            b === a && (a = b[0]);
            b = (c = w.is(a, "function") && a || w.fn.symbol.cache[a] || w.fn.symbol.cache[""]) && c.apply(w, H.call(b, 1));
            w.is(b, "array") || w.is(b, "string") ? this.attr("path", b) : b && this.attr(b)
        }
    };
    w.addSymbol = function (a, b) {
        var c = w.is(b, "function") && (c = {}, c[a] = b, c) || a, d = w.fn.symbol.cache, e = [], g;
        for (g in c)b = c[g], d[g] = w.is(b, "function") && w._cacher(b, w) || (e.push(g), b);
        for (; g = e.pop();)d[g] = d[d[g]]
    };
    w.svg ? (pa = "$1", ma = function (a) {
        a ? "string" === typeof a ? a = a.replace(ga, pa) : a.toString = Z : a = "M0,0";
        this.node.setAttribute("d", a.toString());
        return this
    }, w._engine.litepath = function (a, b, c, d) {
        a = s("path");
        (d || b).canvas.appendChild(a);
        b = new U(a, b, d);
        b.type = "litepath";
        b.id = a.raphaelid = w._oid++;
        a.raphael = !0;
        $(b, {fill: "none", stroke: "#000"});
        return b
    }, w._getPath.litepath = function (a) {
        return w.parsePathString(a.node.getAttribute("d"))
    }) : w.vml && (pa = function (a, b) {
        return la[b] || b
    }, L = function () {
        this._transform.apply(this, arguments);
        this._.bcoord && (this.node.coordsize =
            this._.bcoord);
        return this
    }, ma = function (a) {
        a ? "string" === typeof a ? a = a.replace(ga, pa) : a.toString = Z : a = "M0,0";
        this.node.path = a;
        return this
    }, w._engine.litepath = function (a, b, c, d) {
        a = s("shape");
        var e = a.style, g = new U(a, b, d);
        e.cssText = "position:absolute;left:0;top:0;width:21600px;height:21600px;";
        c = n(c);
        isNaN(c) ? a.coordsize = "21600 21600" : (g._.bzoom = c, e.width = "1px", e.height = "1px", a.coordsize = g._.bcoord = c + " " + c);
        a.coordorigin = b.coordorigin;
        g.type = "litepath";
        g.id = a.raphaelid = w._oid++;
        a.raphael = !0;
        g._transform =
            g.transform;
        g.transform = L;
        w._setFillAndStroke(g, {fill: "none", stroke: "#000"});
        (d || b).canvas.appendChild(a);
        b = s("skew");
        b.on = !0;
        a.appendChild(b);
        g.skew = b;
        return g
    }, w._getPath.litepath = function (a) {
        return w.parsePathString(a.node.path || "")
    });
    w.fn.litepath = function (a, b, c) {
        b && b.constructor === U && (c = b, b = void 0);
        a && a.constructor === U && (c = a, a = "");
        b = w._engine.litepath(a, this, b, c);
        b.ca.litepath = ma;
        a && b.attr("litepath", w.is(a, "array") ? [a] : a);
        return this.__set__ && this.__set__.push(b), this._elementsById[b.id] = b
    }
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-htmlrenderer", function () {
    var d = this.hcLib, m = d.Raphael, D = d.dem, v = this.window, p = v.document, c = /msie/i.test(v.navigator.userAgent) && !v.opera, K = "VML" === m.type, b = "createTouch"in p, G = {cursor: "cursor"}, a = {
        x: "left",
        y: "top",
        strokeWidth: "borderThickness",
        "stroke-width": "borderThickness",
        width: "width",
        height: "height"
    }, l = {fill: "backgroundColor", stroke: "borderColor", color: "color"}, P = {
        left: 0, top: 0, padding: 0, border: "none", margin: 0, outline: "none", "-webkit-apperance": "none",
        position: "absolute", zIndex: 20
    }, N, z = function (b, c, d, g) {
        b = p.createElement(b);
        for (var l in c)a[l] ? b.style[l] = c[l] : b.setAttribute(l, c[l]);
        for (l in d)b.style[l] = d[l];
        g && g.appendChild && g.appendChild(b);
        return b
    }, g;
    g = function (a, b, c) {
        b && b instanceof g && (b = b.element);
        (this.element = z(a, c, P, b)).ishot = "true";
        this.nodeName = a.toLowerCase();
        this.added = Boolean(b)
    };
    g.prototype = {
        attr: function (b) {
            var d = this.element, g = {}, m, z, q, J, w, v, s;
            if ("object" !== typeof b) {
                if (!(g = this[b])) {
                    if ("string" === typeof b)d && d.getAttribute &&
                    (J = d.getAttribute(b)); else if (void 0 !== b && null !== b && "object" === typeof b)for (q in b)d.setAttribute(q, b[q]);
                    g = J
                }
                return g
            }
            for (m in b) {
                q = b[m];
                if (G[m]) {
                    switch (m) {
                        case "cursor":
                            "pointer" === q && K && (q = "hand")
                    }
                    d.style[G[m]] = q;
                    z = !0
                } else if (a[m])d.style[a[m]] = q + "px", z = !0; else if (l[m])d.style[l[m]] = q && q.replace(/^#?([a-f0-9]+)/ig, "#$1") || "none", z = !0; else if (/^visibility$/i.test(m))z = "hidden" === q, d.style.display = z ? "none" : "", this.hidden = z, z = !0; else if (/^opacity$/i.test(m))d.style.opacity = q, c && (z = 100 * Number(q), d.style.filter =
                    "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + z + ")"), z = !0; else if (/^innerhtml$/i.test(m)) {
                    if (K && "select" == d.nodeName.toLowerCase()) {
                        for (z = q.match(/<option\s?[\s\S]*?(\/>|><\/option>|>[\s\S]*?<\/option>)/ig); d.firstChild;)d.removeChild(d.firstChild);
                        w = 0;
                        for (v = z.length; w < v; w += 1)J = z[w], s = p.createElement("option"), /<option\s([\s\S]*[\'\"])\s*?(\/>|>[\s\S]*<\/option>)/ig.test(J) && (s.value = J.replace(/<option\s([\s\S]*[\'\"])\s*?(\/>|>[\s\S]*<\/option>)/ig, "$1").replace(/[\s\S]*value\s*\=\s*[\'\"]([\s\S]*)[\'\"]/,
                            "$1")), s.text = J.replace(/<option\s*[\s\S]*[\'\"]?\s*?[\/>|\>]([\s\S]*)<\/option>/ig, "$1 "), d.options.add(s)
                    } else"input" !== d.nodeName.toLowerCase() && void 0 !== q && (d.innerHTML = q || "");
                    z = !0
                } else/^text$/i.test(m) ? ("input" !== d.nodeName.toLowerCase() && (d.innerHTML = "", void 0 !== q && d.appendChild(p.createTextNode(q))), z = !0) : /^type$/i.test(m) && c && this.added && (z = !0);
                z && (g[m] = q, delete b[m], z = !1)
            }
            for (m in b)d.setAttribute(m, b[m]);
            for (m in g)this[m] = b[m] = g[m], delete g[m];
            return this
        }, val: function (a) {
            var b = this.element,
                c = void 0 === a;
            return "input" === this.nodeName && "checkbox" === b.getAttribute("type") ? c ? this.checked() ? 1 : 0 : this.checked(a) : c ? b.value : (b.value = a, this)
        }, checked: function (a) {
            var b = this.element;
            return void 0 === a ? b.checked : (a ? b.setAttribute("checked", "checked") : b.removeAttribute("checked"), this)
        }, css: function (a, b) {
            var c = this.element.style, d;
            if ("object" === typeof a)for (d in a)c[d] = a[d]; else d && void 0 !== b && (c[d] = b);
            return this
        }, translate: function (a, b) {
            var c = this.element;
            void 0 !== a && (c.style.left = a + "px");
            void 0 !==
            b && (c.style.top = b + "px");
            return this
        }, add: function (a, b) {
            var c = this.element, d = a.element;
            b ? d.insertBefore(c, d.firstChild) : d.appendChild(c);
            this.added = !0;
            return this
        }, hide: function () {
            this.element.style.display = "none";
            return this
        }, show: function () {
            this.element.style.display = "";
            return this
        }, focus: function () {
            "function" === typeof this.element.focus ? this.element.focus() : d.dem.fire(this.element, "focus")
        }, destroy: function () {
            var a = this.element || {};
            a.onclick = a.onmouseout = a.onmouseover = a.onmousemove = a.onblur = a.onfocus =
                null;
            N || (N = z("div"));
            a && N.appendChild(a);
            N.innerHTML = "";
            delete this.element;
            return null
        }, on: K ? function (a, b) {
            this.element["on" + a] = function () {
                var a = v.event;
                a.target = a.srcElement;
                b(a)
            };
            return this
        } : function (a, c) {
            var d = c;
            b && "click" === a && (a = "touchstart", d = function (a) {
                a.preventDefault();
                c()
            });
            this.element["on" + a] = d;
            return this
        }, bind: function (a, b, c) {
            D.listen(this.element, a, b, c);
            return this
        }, unbind: function (a, b) {
            D.unlisten(this.element, a, b);
            return this
        }, trigger: function (a, b) {
            D.fire(this.element, a, b);
            return this
        },
        fadeIn: function (a, b) {
            var c = "fast" === a ? 400 : 1E3;
            this.show();
            this.attr({opacity: 0});
            d.danimate.animate(this.element, {opacity: 1}, c, "linear", b)
        }
    };
    g.prototype.constructor = g;
    m.fn.html = function (a, b, c, d) {
        var l = {}, q;
        b && "type"in b && (l.type = b.type, delete b.type);
        a = (new g(a, d, l)).css(c).attr(b);
        for (q in l)b[q] = l[q];
        return a
    }
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-raphaeltooltip", function () {
    var d = this, m = d.window, D = m.document, v = D.body || D.getElementsByTagName("body")[0], p = d.hcLib, c = p.Raphael, K = c.eve, b = p.createElement, G = p.addEvent, a = p.removeEvent, l = p.getPosition, P = p.hasTouch, N = p.getTouchEvent, z = m.Math, g = z.ceil, e = z.floor, h = {}, n = m.screen.availHeight, M = m.screen.availWidth, H = {
            "": 1,
            moz: 1,
            webkit: 1,
            o: 1,
            ms: 1
        }, q = {borderRadius: "borderRadius", boxShadow: "boxShadow"}, J = /\-([a-z])/ig, w = function (a, b) {
            return b.toUpperCase()
        },
        ja = function (a) {
            var b = s.forbiddenStyle, d, e, g;
            for (d in a)e = J.test(d) ? d.replace(J, w) : d, void 0 !== a[d] && !b[e] && (this[e] = a[d]), c.vml && /color/ig.test(e) && (this[e] = c.getRGB(this[e]).toString());
            for (d in q)if (this[d])for (g in H)this[g + d] = this[d]
        }, s = p.toolTip = {
            elementId: "fusioncharts-tooltip-element",
            element: null,
            lastTarget: null,
            currentTarget: null,
            currentPaper: null,
            pointeroffset: 12,
            prevented: !1,
            defaultStyle: p.extend2(ja.prototype, {
                backgroundColor: "#ffffee", borderColor: "#000000", borderWidth: "1px", color: "#000000",
                fontSize: "10px", lineHeight: "12px", padding: "3px", borderStyle: "solid"
            }),
            defaultContainerStyle: {
                position: "absolute",
                textAlign: "left",
                margin: "0",
                zIndex: "99999",
                pointer: "default",
                display: "block"
            },
            forbiddenStyle: {}
        }, $ = function (b) {
            !0 === s._oobready ? s._oobready = !1 : (a(v, "touchstart", $), !s.hidden && s.currentTarget && (b = b.srcElement || b.target || h, b.raphael && s.currentTarget.paper.getById(b.raphaelid) === s.currentTarget || s.hide()))
        };
    c.svg && (s.defaultContainerStyle.pointerEvents = "none", s.defaultStyle.borderRadius = "0",
        s.defaultStyle.boxShadow = "none");
    c.vml && (s.forbiddenStyle.borderRadius = !0, s.forbiddenStyle.boxShadow = !0, s.defaultStyle.filter = "");
    s.setup = function () {
        var a = s.container, e = s.textElement, g = s.style, h = s.defaultContainerStyle, q = s.forbiddenStyle, l;
        a || (a = s.element = b("span"), (D.body || D.getElementsByTagName("body")[0]).appendChild(a), a.setAttribute("id", s.elementId), g = s.containerStyle = a.style, e = s.textElement = b("span"), a.appendChild(e), s.style = c.vml ? e.runtimeStyle : e.style, s.style.overflow = "hidden", s.style.display =
            "block", s.hidden = !1, s.hide());
        for (l in h)!q[l] && (g[l] = h[l]);
        s.scatted = !0;
        K.on("raphael.drag.start.*", function () {
            s.scatted && (s.waitingScat = !0)
        });
        K.on("raphael.drag.move.*", function () {
            s.waitingScat && (s.block(), s.waitingScat = !1)
        });
        K.on("raphael.drag.end.*", function () {
            s.waitingScat = !1;
            s.scatted && s.unblock(!0)
        });
        K.on("raphael.remove", function () {
            if (s.currentPaper === this || s.currentTarget && s.currentTarget.paper === this)s.hide(), s.currentTarget = s.currentPaper = null
        });
        d.addEventListener("LinkedChartInvoked",
            function (a) {
                s.currentPaper === a.sender.jsVars.hcObj.paper && s.hide()
            });
        d.addEventListener("realTimeUpdateComplete", function (a) {
            s.currentPaper === a.sender.jsVars.hcObj.paper && s.hide()
        })
    };
    s.restyle = function (a) {
        var b = s.style, c;
        for (c in a)b[c] = a[c]
    };
    s.onelement = function (a) {
        if (!a.__tipProcessed) {
            var b = this.paper, c = "group" === this.type ? b && b._elementFromEvent(a) : this, d = b.__tipStyle;
            c && d && c.__tipNeeded && ((a.originalEvent || a).FusionChartsPreventEvent && s.preventTooltip(), s.hiding && (s.hiding = clearTimeout(s.hiding)),
            s.currentPaper !== b && (b.__tipCp = b.canvas && l(b.canvas.parentNode, !0) || {}, s.restyle(b.__tipStyle), s.currentPaper = b), s.lastTarget = s.currentTarget, s.currentTarget = c, s.scatted = c.__tipScatted, s.onredraw.call(this, a), a.__tipProcessed = !0, P && (s._oobready = !0, G(v || (v = D.body || D.getElementsByTagName("body")[0]), "touchstart", $)))
        }
    };
    s.onredraw = function (a) {
        a.__tipProcessed || (a.__tipProcessed = !0, (this.paper && this.paper._elementFromEvent(a)) === s.currentTarget && (a = N(a), s.x = e(a.pageX || a.clientX + D.body.scrollLeft + D.documentElement.scrollLeft ||
        0), s.y = e(a.pageY || a.clientY + D.body.scrollTop + D.documentElement.scrollTop || 0), s.redraw()))
    };
    s.onhide = function (a) {
        a.__tipProcessed || (a.__tipProcessed = !0, (this.paper && this.paper._elementFromEvent(a)) === s.currentTarget && (s.hiding = setTimeout(s.hide, 200)))
    };
    s.redraw = function () {
        if (!s.prevented && !s.blocked && s.currentTarget && s.currentTarget.__tipNeeded) {
            var a = s.currentTarget, b = a.paper, c = s.textElement, d = s.containerStyle, e = s.style, h = a.__tipText, a = s.pointeroffset, q = b.__tipCp, l = D.documentElement || D.body, p = l.scrollLeft,
                l = l.scrollTop, w = s.x, m = s.y, z, t = b.width, J = b.height, b = b.__tipConstrain;
            if (100 > t || 100 > J)b = !1;
            s.hidden && (s.containerStyle.top = "-999em", s.show());
            h !== s.text && (s.text = h, d.width = d.height = "", c.innerHTML = h, e.whiteSpace = "nowrap", h = g(e.pixelWidth || c.offsetWidth || 0), z = g(e.pixelHeight || c.offsetHeight || 0), (s.textWidthOverflow = w + h > q.left + t) ? (d.width = (t > h ? h + 2 * a : t - 2 * a || 0) + "px", e.whiteSpace = "normal") : d.width = "", (s.textHeightOverflow = z > J) ? (d.height = (J || 0) - 2 * a + "px", e.whiteSpace = "normal") : d.height = "");
            h = g(e.pixelWidth ||
            c.offsetWidth || 0);
            z = g(e.pixelHeight || c.offsetHeight || 0);
            b ? (s.textWidthOverflow ? w = (w - h < q.left ? q.left : w - h) - p : w + a + h > q.left - p + t - a && (w = w - h - a), s.textHeightOverflow ? m = q.top - l : m + a + z > q.top - l + J - a && (m = m - z - 1.5 * a)) : (p + M < w + a + h && (w = w - h - a), l + n < m + a + z && (m = m - z - 1.5 * a));
            d.left = (w + a || 0) + "px";
            d.top = (m + a || 0) + "px";
            s.hidden && s.show()
        }
    };
    s.hide = function () {
        s.hiding && (s.hiding = clearTimeout(s.hiding));
        s.containerStyle.display = "none";
        s.hidden = !0;
        s.prevented = !1
    };
    s.show = function () {
        s.blocked || (s.hiding && (s.hiding = clearTimeout(s.hiding)),
            s.containerStyle.display = "inline", s.hidden = !1)
    };
    s.preventTooltip = function () {
        s.prevented = !0
    };
    s.block = function () {
        s.blocked = !0;
        s.containerStyle.display = "none"
    };
    s.unblock = function (a) {
        s.blocked = !1;
        a && (s.containerStyle.display = s.hidden && "none" || "inline")
    };
    c.fn.tooltip = function (a, b, d) {
        b && (b = .4 * (void 0 === b.opacity ? 1 : b.opacity), c.svg ? a.boxShadow = "1px 1px 3px rgba(64,64,64," + b + ")" : a.filter = 'progid:DXImageTransform.Microsoft.Shadow(Strength=2, Direction=135, Color="#404040", shadowOpacity="' + b / 2 + '")');
        this.__tipStyle =
            new ja(a);
        this.__tipCp = this.canvas && l(this.canvas.parentNode, !0) || {};
        this.__tipConstrain = Boolean(d);
        return this
    };
    c.el.trackTooltip = function (a) {
        var b = !!this.__tiptracking;
        if (void 0 === a || (a = !!a) === b)return this;
        a ? P ? this.touchstart(s.onelement) : (this.mouseover(s.onelement), this.mousemove(s.onredraw), this.mouseout(s.onhide)) : P ? this.untouchstart(s.onelement) : (this.unmouseover(s.onelement), this.unmousemove(s.onredraw), this.unmouseout(s.onhide));
        this.__tiptracking = a;
        return this
    };
    c.el.tooltip = function (a,
                             b, d, e, g) {
        s.setup();
        c.el.tooltip = function (a, b, c, d, e) {
            b = !1 === a || void 0 === a || "" === a;
            this.__tipScatted = void 0 === d ? this.__tipScatted : !d;
            void 0 === this.__tipScatted && (this.__tipScatted = !0);
            null !== e && (this.__tip_blocked = e);
            b ^ !this.__tipText && (this.__tipNeeded = !b);
            this.__tipText = a;
            if (s.currentTarget === this && a !== s.text && !s.hidden)s[b ? "hide" : "redraw"]();
            return this
        };
        return c.el.tooltip.call(this, a, b, d, e, g)
    };
    d.core._setTooltipZIndex = function (a) {
        a = parseInt(a, 10);
        s && !isNaN(a) && (s.defaultContainerStyle.zIndex = a,
        s.containerStyle && (s.containerStyle.zIndex = a))
    }
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-smartlabel", function () {
    var d = this.hcLib, m = d.isIE, D = d.hasSVG, v = Math.max, p = this.window, c = / HtmlUnit/.test(p.navigator.userAgent), K = p.document, b = / AppleWebKit\//.test(p.navigator.userAgent), G = !!K.createElement("canvas").getContext, a = !(!G || !K.createElement("canvas").getContext("2d").measureText), p = function () {
        function l(a, b, c) {
            if (!a || !a.length)return 0;
            var d = c.getWidthFunction(), e = 0, g = 0, g = d(a), h = g / a.length;
            c = b;
            e = Math.ceil(b / h);
            if (g < b)return a.length -
            1;
            e > a.length && (c = b - g, e = a.length);
            for (; 0 < c;)if (c = b - d(a.substr(0, e)), g = Math.floor(c / h))e += g; else return e;
            for (; 0 > c;)if (c = b - d(a.substr(0, e)), g = Math.floor(c / h))e += g; else break;
            return e
        }

        function p(a, b) {
            b = 5 < b ? b : 5;
            this.maxContainers = 20 > b ? b : 20;
            this.last = this.first = null;
            this.containers = {};
            this.length = 0;
            this.rootNode = a;
            if (ja) {
                var c = K.createElementNS("http://www.w3.org/2000/svg", "svg");
                c.setAttributeNS("http://www.w3.org/2000/svg", "xlink", "http://www.w3.org/1999/xlink");
                c.setAttributeNS("http://www.w3.org/2000/svg",
                    "height", "0");
                c.setAttributeNS("http://www.w3.org/2000/svg", "width", "0");
                this.svgRoot = c;
                this.rootNode.appendChild(c)
            }
        }

        function N(a, b, d) {
            if ("undefined" !== typeof a && "object" !== typeof a) {
                this.id = a;
                var g;
                "string" === typeof b && (b = K.getElementById(b));
                a:{
                    if (b && (b.offsetWidth || b.offsetHeight)) {
                        if (b.appendChild) {
                            b.appendChild(b = K.createElement("div"));
                            b.className = "fusioncharts-smartlabel-container";
                            b.setAttribute("aria-hidden", "true");
                            b.setAttribute("role", "presentation");
                            a = b;
                            break a
                        }
                    } else if ((a = K.getElementsByTagName("body")[0]) &&
                        a.appendChild) {
                        b = K.createElement("div");
                        b.className = "fusioncharts-smartlabel-container";
                        b.setAttribute("aria-hidden", "true");
                        b.setAttribute("role", "presentation");
                        a.appendChild(b);
                        a = b;
                        break a
                    }
                    a = void 0
                }
                a = this.parentContainer = a;
                a.innerHTML = "WgI";
                if (c || !a.offsetHeight && !a.offsetWidth)ja = !0;
                a.innerHTML = "";
                for (g in e)a.style[g] = e[g];
                this.containerManager = new p(a, 10);
                this.showNoEllipses = !d;
                this.init = !0;
                this.style = {};
                this.setStyle()
            }
        }

        var z = d.supportedStyle, g = {
            fontWeight: 1, "font-weight": 1, fontStyle: 1, "font-style": 1,
            fontSize: 1, "font-size": 1, fontFamily: 1, "font-family": 1
        }, e = {
            position: "absolute",
            top: "-9999em",
            left: "-9999em",
            whiteSpace: "nowrap",
            padding: "0px",
            width: "1px",
            height: "1px",
            overflow: "hidden"
        }, h = b ? 0 : 4.5, n = 0, M = /\b_SmartLabel\b/, H = /\b_SmartLabelBR\b/, q = /(<[^<\>]+?\>)|(&(?:[a-z]+|#[0-9]+);|.)/ig, J = RegExp("\\<span[^\\>]+?_SmartLabel[^\\>]{0,}\\>(.*?)\\<\\/span\\>", "ig"), w = /<[^>][^<]*[^>]+>/i, ja = !1, s = 0, $ = 0, U, ba, Ba;
        K.getElementsByClassName ? (U = "getElementsByClassName", ba = "_SmartLabel", Ba = !0) : (U = "getElementsByTagName",
            ba = "span", Ba = !1);
        p.prototype = {
            get: function (a) {
                var b = this.containers, c = this.length, d = this.maxContainers, e, g = "", h = "", h = this.getCanvasFont(a);
                for (e in z)void 0 !== a[e] && (g += z[e] + ":" + a[e] + ";");
                if (!g)return !1;
                if (b[g])g = b[g], this.first !== g && (g.prev && (g.prev.next = g.next), g.next && (g.next.prev = g.prev), g.next = this.first, g.next.prev = g, this.last === g && (this.last = g.prev), g.prev = null, this.first = g); else {
                    if (c >= d)for (a = c - d + 1; a--;)this.removeContainer(this.last);
                    g = this.addContainer(g, h)
                }
                return g
            }, getCanvasFont: function (b) {
                var c,
                    d = [];
                if (!G || !a)return !1;
                for (c in g)void 0 !== b[c] && d.push(b[c]);
                return d.join(" ")
            }, setMax: function (a) {
                var b = this.length;
                a = 5 < a ? a : 5;
                a = 20 > a ? a : 20;
                if (a < b) {
                    for (b -= a; b--;)this.removeContainer(this.last);
                    this.length = a
                }
                this.maxContainers = a
            }, addContainer: function (a, b) {
                var c, d;
                this.containers[a] = d = {
                    next: null,
                    prev: null,
                    node: null,
                    ellipsesWidth: 0,
                    lineHeight: 0,
                    dotWidth: 0,
                    avgCharWidth: 4,
                    keyStr: a,
                    canvasStr: b,
                    charCache: {}
                };
                d.next = this.first;
                d.next && (d.next.prev = d);
                this.first = d;
                this.last || (this.last = d);
                this.length +=
                    1;
                c = d.node = K.createElement("div");
                this.rootNode.appendChild(c);
                m && !D ? c.style.setAttribute("cssText", a) : c.setAttribute("style", a);
                c.setAttribute("aria-hidden", "true");
                c.setAttribute("role", "presentation");
                c.style.display = "inline-block";
                c.innerHTML = "WgI";
                d.lineHeight = c.offsetHeight;
                d.avgCharWidth = c.offsetWidth / 3;
                ja ? (c = d.svgText = K.createElementNS("http://www.w3.org/2000/svg", "text"), c.setAttribute("style", a), this.svgRoot.appendChild(c), c.textContent = "WgI", d.lineHeight = c.getBBox().height, d.avgCharWidth =
                    (c.getBBox().width - h) / 3, c.textContent = "...", d.ellipsesWidth = c.getBBox().width - h, c.textContent = ".", d.dotWidth = c.getBBox().width - h) : b ? (c = d.canvas = K.createElement("canvas"), c.style.height = c.style.width = "0px", this.rootNode.appendChild(c), d.context = c = c.getContext("2d"), c.font = b, d.ellipsesWidth = c.measureText("...").width, d.dotWidth = c.measureText(".").width) : (c.innerHTML = "...", d.ellipsesWidth = c.offsetWidth, c.innerHTML = ".", d.dotWidth = c.offsetWidth, c.innerHTML = "");
                return d
            }, removeContainer: function (a) {
                var b =
                    a.keyStr;
                b && this.length && a && (this.length -= 1, a.prev && (a.prev.next = a.next), a.next && (a.next.prev = a.prev), this.first === a && (this.first = a.next), this.last === a && (this.last = a.prev), a.node.parentNode.removeChild(a.node), a.canvas && a.canvas.parentNode.removeChild(a.canvas), delete this.containers[b])
            }, dispose: function () {
                var a, b = this.containers;
                this.maxContainers = null;
                for (a in b)this.removeContainer(b[a]);
                this.rootNode.parentNode.removeChild(this.rootNode);
                this.last = this.first = this.rootNode = null
            }
        };
        p.prototype.constructor =
            p;
        N.prototype = {
            dispose: function () {
                this.init && (this.containerManager.dispose(), delete this.container, delete this.context, delete this.cache, delete this.containerManager, delete this.containerObj, delete this.id, delete this.style, delete this.parentContainer, delete this.showNoEllipses)
            }, useEllipsesOnOverflow: function (a) {
                this.init && (this.showNoEllipses = !a)
            }, getWidthFunction: function () {
                var a = this.context, b = this.container, c = this.containerObj.svgText;
                return c ? function (a) {
                    var b;
                    c.textContent = a;
                    a = c.getBBox();
                    b = a.width - h;
                    1 > b && (b = a.width);
                    return b
                } : a ? function (b) {
                    return a.measureText(b).width
                } : function (a) {
                    b.innerHTML = a;
                    return b.offsetWidth
                }
            }, getSmartText: function (a, b, c, d) {
                if (!this.init)return !1;
                if (void 0 === a || null === a)a = "";
                var e = {
                    text: a,
                    maxWidth: b,
                    maxHeight: c,
                    width: null,
                    height: null,
                    oriTextWidth: null,
                    oriTextHeight: null,
                    oriText: a,
                    isTruncated: !1
                }, g = !1, h, p, m = 0, t, z, D, C = -1, G = g = -1;
                p = this.container;
                var P = this.context, N = 0;
                D = 0;
                var qa, za, ya;
                ya = [];
                var ta = 0, V = this.showNoEllipses ? "" : "...";
                z = this.lineHeight;
                var oa, N = [],
                    C = h = -1;
                oa = function (a) {
                    a = a.replace(/^\s\s*/, "");
                    for (var b = /\s/, c = a.length; b.test(a.charAt(c -= 1)););
                    return a.slice(0, c + 1)
                };
                g = -1;
                za = this.getWidthFunction();
                if (p) {
                    if (!ja) {
                        p.innerHTML = a;
                        e.oriTextWidth = g = p.offsetWidth;
                        e.oriTextHeight = D = p.offsetHeight;
                        if (D <= c && g <= b)return e.width = e.oriTextWidth = g, e.height = e.oriTextHeight = D, e;
                        if (z > c)return e.text = "", e.width = e.oriTextWidth = 0, e.height = e.oriTextHeight = 0, e
                    }
                    a = oa(a).replace(/(\s+)/g, " ");
                    g = w.test(a);
                    z = this.showNoEllipses ? b : b - n;
                    if (g) {
                        m = a.replace(q, "$2");
                        a = a.replace(q,
                            '$1<span class="_SmartLabel">$2</span>');
                        a = a.replace(/(<br\s*\/*\>)/g, '<span class="_SmartLabel _SmartLabelBR">$1</span>');
                        p.innerHTML = a;
                        ta = p[U](ba);
                        P = 0;
                        for (za = ta.length; P < za; P += 1)if (a = ta[P], Ba || M.test(a.className))oa = a.innerHTML, "" !== oa && (" " === oa ? C = N.length : "-" === oa && (h = N.length), N.push({
                            spaceIdx: C,
                            dashIdx: h,
                            elem: a
                        }), ya.push(oa));
                        ta = 0;
                        h = N.length;
                        s = N[0].elem.offsetWidth;
                        if (s > b)return e.text = "", e.width = e.oriTextWidth = e.height = e.oriTextHeight = 0, e;
                        s > z && !this.showNoEllipses && (z = b - 2 * $, z > s ? V = ".." : (z = b -
                        $, z > s ? V = "." : (z = 0, V = "")));
                        ya = N[0].elem.offsetLeft;
                        P = N[0].elem.offsetTop;
                        if (d)for (; ta < h; ta += 1)a = N[ta].elem, za = a.offsetLeft - ya + a.offsetWidth, za > z && (qa || (qa = ta), p.offsetWidth > b && (t = ta, ta = h)); else for (; ta < h; ta += 1)a = N[ta].elem, oa = a.offsetHeight + (a.offsetTop - P), za = a.offsetLeft - ya + a.offsetWidth, d = null, za > z ? (qa || (qa = ta), za > b && (g = N[ta].spaceIdx, C = N[ta].dashIdx, g > G ? (N[g].elem.innerHTML = "<br/>", G = g) : C > G ? (N[C].elem.innerHTML = C === ta ? "<br/>-" : "-<br/>", G = C) : a.parentNode.insertBefore(d = K.createElement("br"), a), a.offsetHeight +
                        a.offsetTop > c ? (d ? d.parentNode.removeChild(d) : G === C ? N[C].elem.innerHTML = "-" : N[g].elem.innerHTML = " ", t = ta, ta = h) : qa = null)) : oa > c && (t = ta, ta = h);
                        if (t < h) {
                            e.isTruncated = !0;
                            qa = qa ? qa : t;
                            for (ta = h - 1; ta >= qa; ta -= 1)a = N[ta].elem, a.parentNode.removeChild(a);
                            for (; 0 <= ta; ta -= 1)a = N[ta].elem, H.test(a.className) ? a.parentNode.removeChild(a) : ta = 0
                        }
                        e.text = p.innerHTML.replace(J, "$1");
                        e.isTruncated && (e.text += V, e.tooltext = m)
                    } else {
                        ya = a.split("");
                        h = ya.length;
                        p = "";
                        t = [];
                        qa = ya[0];
                        this.cache[qa] ? s = this.cache[qa].width : (s = za(qa), this.cache[qa] =
                        {width: s});
                        if (z > s)t = a.substr(0, l(a, z, this)).split(""), ta = t.length; else {
                            if (s > b)return e.text = "", e.width = e.oriTextWidth = e.height = e.oriTextHeight = 0, e;
                            V && (z = b - 2 * $, z > s ? V = ".." : (z = b - $, z > s ? V = "." : (z = 0, V = "")))
                        }
                        N = za(t.join(""));
                        D = this.lineHeight;
                        if (d) {
                            for (; ta < h; ta += 1)if (qa = t[ta] = ya[ta], this.cache[qa] ? s = this.cache[qa].width : (s = za(qa), this.cache[qa] = {width: s}), N += s, N > z && (p || (p = t.slice(0, -1).join("")), N > b))return e.text = oa(p) + V, e.tooltext = e.oriText, e.width = za(e.text), e.height = this.lineHeight, e;
                            e.text = t.join("");
                            e.width = N;
                            e.height = this.lineHeight
                        } else {
                            for (; ta < h; ta += 1)if (qa = t[ta] = ya[ta], " " !== qa || P || (qa = "&nbsp;"), this.cache[qa] ? s = this.cache[qa].width : (s = za(qa), this.cache[qa] = {width: s}), N += s, N > z && (p || (p = t.slice(0, -1).join("")), N > b)) {
                                g = a.substr(0, t.length).lastIndexOf(" ");
                                C = a.substr(0, t.length).lastIndexOf("-");
                                g > G ? (N = za(t.slice(G + 1, g).join("")), t.splice(g, 1, "<br/>"), G = g, d = g + 1) : C > G ? (C === t.length - 1 ? (N = za(t.slice(G + 1, g).join("")), t.splice(C, 1, "<br/>-")) : (N = za(t.slice(G + 1, g).join("")), t.splice(C, 1, "-<br/>")),
                                    G = C, d = C + 1) : (t.splice(t.length - 1, 1, "<br/>" + ya[ta]), g = t.length - 2, N = za(t.slice(G + 1, g + 1).join("")), G = g, d = ta);
                                D += this.lineHeight;
                                if (D > c)return e.text = oa(p) + V, e.tooltext = e.oriText, e.width = b, e.height = D - this.lineHeight, e;
                                m = v(m, N);
                                p = null;
                                qa = l(a.substr(d), z, this);
                                N = za(a.substr(d, qa || 1));
                                t.length < d + qa && (t = t.concat(a.substr(t.length, d + qa - t.length).split("")), ta = t.length - 1)
                            }
                            m = v(m, N);
                            e.text = t.join("");
                            e.width = m;
                            e.height = D
                        }
                        return e
                    }
                    e.height = p.offsetHeight;
                    e.width = p.offsetWidth
                } else e.error = Error("Body Tag Missing!");
                return e
            }, setStyle: function (a) {
                if (!this.init)return !1;
                if (a !== this.style || this.styleNotSet) {
                    a || (a = this.style);
                    var b = a, c = b.fontSize = b.fontSize || "12px";
                    b.lineHeight = b.lineHeight || b["line-height"] || 1.2 * parseInt(c, 10) + "px";
                    this.style = a;
                    (this.containerObj = a = this.containerManager.get(a)) ? (this.container = a.node, this.context = a.context, this.cache = a.charCache, this.lineHeight = a.lineHeight, n = a.ellipsesWidth, $ = a.dotWidth, this.styleNotSet = !1) : this.styleNotSet = !0
                }
            }, getTextSize: function (a, b, c) {
                if (!this.init)return !1;
                var d = {
                    text: a,
                    width: null,
                    height: null,
                    oriTextWidth: null,
                    oriTextHeight: null,
                    isTruncated: !1
                }, e = this.container;
                e && (e.innerHTML = a, d.oriTextWidth = e.offsetWidth, d.oriTextHeight = e.offsetHeight, d.width = Math.min(d.oriTextWidth, b), d.height = Math.min(d.oriTextHeight, c), d.width < d.oriTextWidth || d.height < d.oriTextHeight) && (d.isTruncated = !0);
                return d
            }, getOriSize: function (a) {
                if (!this.init)return !1;
                var b = {text: a, width: null, height: null}, c = this.container, d = this.getWidthFunction(), e = 0;
                if (ja) {
                    a = a.split(/(<br\s*\/*\>)/g);
                    c = a.length;
                    for (b.height = this.lineHeight * c; c--;)e = v(e, d(a[c]));
                    b.width = e
                } else c && (c.innerHTML = a, b.width = c.offsetWidth, b.height = c.offsetHeight);
                return b
            }
        };
        return N.prototype.constructor = N
    }();
    d.SmartLabelManager = p
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-numberformatter", function () {
    var d = this, m = d.hcLib, D = m.pluckNumber, v = m.extend2, p = m.getValidValue, c = m.pluck, K = m.getFirstValue, b = Math.abs, G = Math.pow, a = Math.round, l = function (a) {
        return a && a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
    }, P = {}, N = function (a) {
        var b = [], c;
        for (c in a)b.push(c + "_" + a[c]);
        b.sort();
        return b.join(",")
    }, z = function (a) {
        var b = {}, c;
        for (c in a)b[c.toLowerCase()] = a[c];
        return b
    };
    m.NumberFormatter = function () {
        function d(b, c, e) {
            var g;
            if (0 >= c)return a(b) + "";
            if (isNaN(c))return b += "", 12 < b.length && -1 != b.indexOf(".") && (c = 12 - b.split(".")[0].length, g = G(10, c), b = a(b * g) / g + ""), b;
            g = G(10, c);
            b = a(b * g) / g + "";
            if (1 == e)for (-1 == b.indexOf(".") && (b += ".0"), e = b.split("."), c -= e[1].length, e = 1; e <= c; e++)b += "0";
            return b
        }

        function e(a, b, c, d, e) {
            var g = Number(a), h = "", l = !1, p = "", n = "", m = p = 0;
            if (isNaN(g))return "";
            if (1E15 < g)return g.toExponential(e ? 1 : 14);
            p = 0;
            m = a.length;
            -1 != a.indexOf(".") && (h = a.substring(a.indexOf(".") + 1, a.length), m = a.indexOf("."));
            0 > g && (l = !0, p = 1);
            p =
                a.substring(p, m);
            a = p.length;
            e = d.length - 1;
            g = d[e];
            if (a < g)n = p; else for (; a >= g;)n = (a - g ? c : "") + p.substr(a - g, g) + n, a -= g, g = 0 >= (e -= 1) ? d[0] : d[e], a < g && (n = p.substring(a, 0) + n);
            "" != h && (n = n + b + h);
            !0 === l && (n = "-" + n);
            return n
        }

        var h, n = {
            formatnumber: "1",
            formatnumberscale: "1",
            defaultnumberscale: "",
            numberscaleunit: ["K", "M"],
            numberscalevalue: [1E3, 1E3],
            numberprefix: "",
            numbersuffix: "",
            decimals: "",
            forcedecimals: "0",
            yaxisvaluedecimals: "2",
            decimalseparator: ".",
            thousandseparator: ",",
            thousandseparatorposition: [3],
            indecimalseparator: "",
            inthousandseparator: "",
            sformatnumber: "1",
            sformatnumberscale: "0",
            sdefaultnumberscale: "",
            snumberscaleunit: ["K", "M"],
            snumberscalevalue: [1E3, 1E3],
            snumberprefix: "",
            snumbersuffix: "",
            sdecimals: "2",
            sforcedecimals: "0",
            syaxisvaluedecimals: "2",
            xFormatNumber: "0",
            xFormatNumberScale: "0",
            xDefaultNumberScale: "",
            xNumberScaleUnit: ["K", "M"],
            xNumberScaleValue: [1E3, 1E3],
            xNumberPrefix: "",
            xNumberSuffix: ""
        }, m = {mscombidy2d: {formatnumberscale: "1"}}, z = function (a, b, d) {
            var e, g, h, z, H, G, P, N, ea, pa = b.name, Z = v({}, n), ma, L, I, fa, t, R,
                Y, C, xa, Pa, Ga;
            (h = m[pa]) && (Z = v(Z, h));
            this.csConf = Z;
            this.chartAPI = b;
            p(a.numberscaleunit) && (e = a.numberscaleunit.split(","));
            if (g = p(a.snumberscaleunit, a.numberscaleunit))g = g.split(",");
            if (h = p(a.xnumberscaleunit, a.numberscaleunit))h = h.split(",");
            if (z = p(a.ticknumberscaleunit, a.numberscaleunit))z = z.split(",");
            if (H = p(a.ynumberscaleunit, a.numberscaleunit))H = H.split(",");
            p(a.numberscalevalue) && (G = a.numberscalevalue.split(","));
            if (L = p(a.snumberscalevalue, a.numberscalevalue))L = L.split(",");
            if (P = p(a.xnumberscalevalue,
                    a.numberscalevalue))P = P.split(",");
            if (N = p(a.ticknumberscalevalue, a.numberscalevalue))N = N.split(",");
            if (ea = p(a.ynumberscalevalue, a.numberscalevalue))ea = ea.split(",");
            if (p(a.thousandseparatorposition))for (ma = a.thousandseparatorposition.split(","), I = ma.length, t = n.thousandseparatorposition[0]; I--;)fa = parseInt(ma[I], 10), 0 >= fa && (fa = t), t = ma[I] = fa;
            b || (b = {});
            I = D(a.scalerecursively, 0);
            fa = D(a.sscalerecursively, I);
            t = D(a.xscalerecursively, I);
            R = D(a.maxscalerecursion, -1);
            Y = D(a.smaxscalerecursion, R);
            C = D(a.xmaxscalerecursion,
                R);
            xa = p(a.scaleseparator, " ");
            Pa = p(a.sscaleseparator, xa);
            Ga = p(a.xscaleseparator, xa);
            R || (R = -1);
            this.baseConf = e = {
                cacheStore: [],
                formatnumber: c(a.formatnumber, b.formatnumber, Z.formatnumber),
                formatnumberscale: c(a.formatnumberscale, b.formatnumberscale, Z.formatnumberscale),
                defaultnumberscale: K(a.defaultnumberscale, b.defaultnumberscale, Z.defaultnumberscale),
                numberscaleunit: c(e, b.numberscaleunit, Z.numberscaleunit).concat(),
                numberscalevalue: c(G, b.numberscalevalue, Z.numberscalevalue).concat(),
                numberprefix: K(a.numberprefix,
                    b.numberprefix, Z.numberprefix),
                numbersuffix: K(a.numbersuffix, b.numbersuffix, Z.numbersuffix),
                decimalprecision: parseInt("auto" === a.decimals ? Z.decimalprecision : c(a.decimals, a.decimalprecision, b.decimals, Z.decimals, b.decimalprecision, Z.decimalprecision), 10),
                forcedecimals: c(a.forcedecimals, b.forcedecimals, Z.forcedecimals),
                decimalseparator: c(a.decimalseparator, b.decimalseparator, Z.decimalseparator),
                thousandseparator: c(a.thousandseparator, b.thousandseparator, Z.thousandseparator),
                thousandseparatorposition: c(ma,
                    b.thousandseparatorposition, Z.thousandseparatorposition),
                indecimalseparator: K(a.indecimalseparator, b.indecimalseparator, Z.indecimalseparator),
                inthousandseparator: K(a.inthousandseparator, b.inthousandseparator, Z.inthousandseparator),
                scalerecursively: I,
                maxscalerecursion: R,
                scaleseparator: xa
            };
            p(e.inthousandseparator) && (this.baseConf._REGinthousandseparator = new RegExp(l(e.inthousandseparator), "g"));
            p(e.indecimalseparator) && (this.baseConf._REGindecimalseparator = new RegExp(l(e.indecimalseparator)));
            this.Y =
                [];
            d || (d = {
                cacheStore: [],
                formatnumber: e.formatnumber,
                formatnumberscale: e.formatnumberscale,
                defaultnumberscale: e.defaultnumberscale,
                numberscaleunit: e.numberscaleunit.concat(),
                numberscalevalue: e.numberscalevalue.concat(),
                numberprefix: e.numberprefix,
                numbersuffix: e.numbersuffix,
                decimalprecision: e.decimalprecision,
                forcedecimals: e.forcedecimals,
                decimalseparator: e.decimalseparator,
                thousandseparator: e.thousandseparator,
                thousandseparatorposition: e.thousandseparatorposition,
                indecimalseparator: e.indecimalseparator,
                inthousandseparator: e.inthousandseparator,
                scalerecursively: I,
                maxscalerecursion: R,
                scaleseparator: xa
            }, b.useScaleRecursively && (d.numberscalevalue && d.numberscalevalue.length) == (d.numberscaleunit && d.numberscaleunit.length) || (d.scalerecursively = I = 0), G = {
                cacheStore: [],
                formatnumber: d.formatnumber,
                formatnumberscale: d.formatnumberscale,
                defaultnumberscale: d.defaultnumberscale,
                numberscaleunit: d.numberscaleunit.concat(),
                numberscalevalue: d.numberscalevalue.concat(),
                numberprefix: d.numberprefix,
                numbersuffix: d.numbersuffix,
                decimalprecision: parseInt(c(a.yaxisvaluedecimals, d.decimalprecision, 2), 10),
                forcedecimals: c(a.forceyaxisvaluedecimals, d.forcedecimals),
                decimalseparator: d.decimalseparator,
                thousandseparator: d.thousandseparator,
                thousandseparatorposition: d.thousandseparatorposition.concat(),
                indecimalseparator: d.indecimalseparator,
                inthousandseparator: d.inthousandseparator,
                scalerecursively: I,
                maxscalerecursion: R,
                scaleseparator: xa
            }, L = {
                cacheStore: [],
                formatnumber: c(a.sformatnumber, b.sformatnumber, n.sformatnumber),
                formatnumberscale: c(a.sformatnumberscale,
                    b.sformatnumberscale, n.sformatnumberscale),
                defaultnumberscale: K(a.sdefaultnumberscale, b.sdefaultnumberscale, d.defaultnumberscale),
                numberscaleunit: c(g, b.snumberscaleunit, n.snumberscaleunit).concat(),
                numberscalevalue: c(L, b.snumberscalevalue, n.snumberscalevalue).concat(),
                numberprefix: K(a.snumberprefix, b.snumberprefix, n.snumberprefix),
                numbersuffix: K(a.snumbersuffix, b.snumbersuffix, n.snumbersuffix),
                decimalprecision: parseInt(c(a.syaxisvaluedecimals, a.sdecimals, a.decimals, b.sdecimals, n.sdecimals), 10),
                forcedecimals: c(a.forcesyaxisvaluedecimals,
                    a.sforcedecimals, a.forcedecimals, b.sforcedecimals, n.sforcedecimals),
                decimalseparator: c(a.decimalseparator, b.decimalseparator, n.decimalseparator),
                thousandseparator: c(a.thousandseparator, b.thousandseparator, n.thousandseparator),
                thousandseparatorposition: d.thousandseparatorposition.concat(),
                indecimalseparator: c(a.indecimalseparator, b.indecimalseparator, n.indecimalseparator),
                inthousandseparator: c(a.inthousandseparator, b.inthousandseparator, n.inthousandseparator),
                scalerecursively: fa,
                maxscalerecursion: Y,
                scaleseparator: Pa
            }, g = v({}, L), g.decimalprecision = parseInt(c(a.sdecimals, a.decimals, a.syaxisvaluedecimals, b.sdecimals, n.sdecimals), 10), g.forcedecimals = c(a.sforcedecimals, a.forcedecimals, a.forcesyaxisvaluedecimals, b.sforcedecimals, n.sforcedecimals), g.cacheStore = [], b.useScaleRecursively && (L.numberscalevalue && L.numberscalevalue.length) == (L.numberscaleunit && L.numberscaleunit.length) || (L.scalerecursively = fa = 0), /^(bubble|scatter|selectscatter)$/.test(pa) && (G.formatnumber = c(a.yformatnumber, G.formatnumber),
                G.formatnumberscale = c(a.yformatnumberscale, G.formatnumberscale), G.defaultnumberscale = K(a.ydefaultnumberscale, G.defaultnumberscale), G.numberscaleunit = c(H, G.numberscaleunit), G.numberscalevalue = c(ea, G.numberscalevalue), G.numberprefix = c(a.ynumberprefix, G.numberprefix), G.numbersuffix = c(a.ynumbersuffix, G.numbersuffix), d.formatnumber = c(a.yformatnumber, d.formatnumber), d.formatnumberscale = c(a.yformatnumberscale, d.formatnumberscale), d.defaultnumberscale = K(a.ydefaultnumberscale, d.defaultnumberscale), d.numberscaleunit =
                c(a.ynumberscaleunit, d.numberscaleunit.concat()), d.numberscalevalue = c(a.ynumberscalevalue, d.numberscalevalue.concat()), d.numberprefix = c(a.ynumberprefix, d.numberprefix), d.numbersuffix = c(a.ynumbersuffix, d.numbersuffix)), /^(mscombidy2d|mscombidy3d)$/.test(pa) && (L.formatnumberscale = D(a.sformatnumberscale)), /^(pie2d|pie3d|doughnut2d|doughnut3d|marimekko|pareto2d|pareto3d)$/.test(pa) && (d.decimalprecision = c(a.decimals, "2")), I && (d.numberscalevalue.push(1), d.numberscaleunit.unshift(d.defaultnumberscale), G.numberscalevalue.push(1),
                G.numberscaleunit.unshift(G.defaultnumberscale)), fa && (L.numberscalevalue.push(1), L.numberscaleunit.unshift(L.defaultnumberscale), g.numberscalevalue.push(1), g.numberscaleunit.unshift(g.defaultnumberscale)), this.Y[0] = {
                yAxisLabelConf: G,
                dataLabelConf: d
            }, this.Y[1] = {
                yAxisLabelConf: L,
                dataLabelConf: g
            }, this.paramLabels = d, this.param1 = G, this.param2 = L, this.paramLabels2 = g);
            this.paramX = {
                cacheStore: [],
                formatnumber: c(a.xformatnumber, e.formatnumber),
                formatnumberscale: c(a.xformatnumberscale, e.formatnumberscale),
                defaultnumberscale: K(a.xdefaultnumberscale,
                    e.defaultnumberscale),
                numberscaleunit: c(h, e.numberscaleunit.concat()),
                numberscalevalue: c(P, e.numberscalevalue.concat()),
                numberprefix: c(a.xnumberprefix, e.numberprefix),
                numbersuffix: c(a.xnumbersuffix, e.numbersuffix),
                decimalprecision: parseInt(c(a.xaxisvaluedecimals, a.xaxisvaluesdecimals, e.decimalprecision, 2), 10),
                forcedecimals: c(a.forcexaxisvaluedecimals, 0),
                decimalseparator: e.decimalseparator,
                thousandseparator: e.thousandseparator,
                thousandseparatorposition: e.thousandseparatorposition.concat(),
                indecimalseparator: e.indecimalseparator,
                inthousandseparator: e.inthousandseparator,
                scalerecursively: t,
                maxscalerecursion: C,
                scaleseparator: Ga
            };
            this.paramLegend = v(v({}, e), {
                cacheStore: [],
                decimalprecision: parseInt(D(a.legendvaluedecimals, e.decimalprecision, 2), 10),
                forcedecimals: D(a.legendvalueforcedecimals, e.forcedecimals, 0),
                formatnumberscale: c(a.legendvalueformatnumberscale, e.formatnumberscale),
                formatnumber: c(a.legendvalueformatnumber, e.formatnumber)
            });
            b.useScaleRecursively && (this.paramX.numberscalevalue && this.paramX.numberscalevalue.length) ==
            (this.paramX.numberscaleunit && this.paramX.numberscaleunit.length) || (this.paramX.scalerecursively = t = 0);
            t && (this.paramX.numberscalevalue.push(1), this.paramX.numberscaleunit.unshift(this.paramX.defaultnumberscale));
            this.paramScale = {
                cacheStore: [],
                formatnumber: c(a.tickformatnumber, e.formatnumber),
                formatnumberscale: c(a.tickformatnumberscale, e.formatnumberscale),
                defaultnumberscale: K(a.tickdefaultnumberscale, e.defaultnumberscale),
                numberscaleunit: c(z, e.numberscaleunit.concat()),
                numberscalevalue: c(N, e.numberscalevalue.concat()),
                numberprefix: c(a.ticknumberprefix, e.numberprefix),
                numbersuffix: c(a.ticknumbersuffix, e.numbersuffix),
                decimalprecision: parseInt(c(a.tickvaluedecimals, e.decimalprecision, "2"), 10),
                forcedecimals: c(a.forcetickvaluedecimals, e.forcedecimals, 0),
                decimalseparator: e.decimalseparator,
                thousandseparator: e.thousandseparator,
                thousandseparatorposition: e.thousandseparatorposition.concat(),
                indecimalseparator: e.indecimalseparator,
                inthousandseparator: e.inthousandseparator,
                scalerecursively: I,
                maxscalerecursion: R,
                scaleseparator: xa
            };
            I && (this.paramScale.numberscalevalue.push(1), this.paramScale.numberscaleunit.unshift(this.paramScale.defaultnumberscale));
            this.timeConf = {
                inputDateFormat: c(a.inputdateformat, a.dateformat, "mm/dd/yyyy"),
                outputDateFormat: c(a.outputdateformat, a.inputdateformat, a.dateformat, "mm/dd/yyyy"),
                days: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                months: "January February March April May June July August September October November December".split(" "),
                daySuffix: " st nd rd th th th th th th th th th th th th th th th th th st nd rd th th th th th th th st".split(" ")
            };
            this.cleaneValueCacheStore = {};
            this.percentStrCacheStore = {}
        };
        z.prototype = {
            cleaneValueCacheStore: {}, percentStrCacheStore: {}, dispose: function () {
                this.Y && delete this.Y;
                this.cleaneValueCacheStore && delete this.cleaneValueCacheStore;
                this.percentStrCacheStore && delete this.percentStrCacheStore;
                this.paramLabels && delete this.paramLabels;
                this.param1 && delete this.param1;
                this.param2 && delete this.param2;
                this.paramLabels2 && delete this.paramLabels2;
                this.csConf && delete this.csConf;
                this.chartAPI && delete this.chartAPI;
                this.baseConf && delete this.baseConf;
                this.timeConf && delete this.timeConf;
                this.paramX && delete this.paramX;
                this.paramScale && delete this.paramScale
            }, parseMLAxisConf: function (a, d) {
                var e = this.baseConf, g = this.csConf, h = this.chartAPI, l = D(a.scalerecursively, e.scalerecursively), m = D(a.maxscalerecursion, e.maxscalerecursion), z = p(a.scaleseparator, e.scaleseparator), v, H, G, M, P, N;
                d = D(d, this.Y.length);
                p(a.numberscaleunit) && (v = a.numberscaleunit.split(","));
                p(a.numberscalevalue) && (H = a.numberscalevalue.split(","));
                m || (m = -1);
                if (p(a.thousandseparatorposition))for (G = a.thousandseparatorposition.split(","), M = G.length, N = n.thousandseparatorposition[0]; M--;)(P = D(b(G[M]))) ? N = P : P = N, G[M] = P;
                e = {
                    cacheStore: [],
                    formatnumber: c(a.formatnumber, e.formatnumber),
                    formatnumberscale: c(a.formatnumberscale, e.formatnumberscale),
                    defaultnumberscale: K(a.defaultnumberscale, e.defaultnumberscale),
                    numberscaleunit: c(v, e.numberscaleunit).concat(),
                    numberscalevalue: c(H, e.numberscalevalue).concat(),
                    numberprefix: K(a.numberprefix, e.numberprefix),
                    numbersuffix: K(a.numbersuffix,
                        e.numbersuffix),
                    forcedecimals: c(a.forcedecimals, e.forcedecimals),
                    decimalprecision: parseInt("auto" === a.decimals ? g.decimalprecision : c(a.decimals, e.decimalprecision), 10),
                    decimalseparator: c(a.decimalseparator, e.decimalseparator),
                    thousandseparator: c(a.thousandseparator, e.thousandseparator),
                    thousandseparatorposition: c(G, e.thousandseparatorposition),
                    indecimalseparator: K(a.indecimalseparator, e.indecimalseparator),
                    inthousandseparator: K(a.inthousandseparator, e.inthousandseparator),
                    scalerecursively: l,
                    maxscalerecursion: m,
                    scaleseparator: z
                };
                h.useScaleRecursively && (e.numberscalevalue && e.numberscalevalue.length) == (e.numberscaleunit && e.numberscaleunit.length) || (e.scalerecursively = l = 0);
                h = {
                    cacheStore: [],
                    formatnumber: e.formatnumber,
                    formatnumberscale: e.formatnumberscale,
                    defaultnumberscale: e.defaultnumberscale,
                    numberscaleunit: e.numberscaleunit.concat(),
                    numberscalevalue: e.numberscalevalue.concat(),
                    numberprefix: e.numberprefix,
                    numbersuffix: e.numbersuffix,
                    decimalprecision: parseInt(c(a.yaxisvaluedecimals, e.decimalprecision, 2), 10),
                    forcedecimals: c(a.forceyaxisvaluedecimals, e.forcedecimals),
                    decimalseparator: e.decimalseparator,
                    thousandseparator: e.thousandseparator,
                    thousandseparatorposition: e.thousandseparatorposition.concat(),
                    indecimalseparator: e.indecimalseparator,
                    inthousandseparator: e.inthousandseparator,
                    scalerecursively: l,
                    maxscalerecursion: m,
                    scaleseparator: z
                };
                l && (e.numberscalevalue.push(1), e.numberscaleunit.unshift(e.defaultnumberscale), h.numberscalevalue.push(1), h.numberscaleunit.unshift(h.defaultnumberscale));
                this.Y[d] = {
                    dataLabelConf: e,
                    yAxisLabelConf: h
                }
            }, percentValue: function (a) {
                var b = this.percentStrCacheStore[a];
                void 0 === b && (b = isNaN(this.paramLabels.decimalprecision) ? "2" : this.paramLabels.decimalprecision, b = this.percentStrCacheStore[a] = e(d(a, b, this.paramLabels.forcedecimals), this.paramLabels.decimalseparator, this.paramLabels.thousandseparator, this.paramLabels.thousandseparatorposition) + "%");
                return b
            }, getCleanValue: function (a, c) {
                var d = this.cleaneValueCacheStore[a];
                if (void 0 === d) {
                    var e = this.baseConf, d = a + "";
                    e._REGinthousandseparator &&
                    (d = d.replace(e._REGinthousandseparator, ""));
                    e._REGindecimalseparator && (d = d.replace(e._REGindecimalseparator, "."));
                    d = parseFloat(d);
                    d = isFinite(d) ? d : NaN;
                    this.cleaneValueCacheStore[a] = d = isNaN(d) ? null : c ? b(d) : d
                }
                return d
            }, dataLabels: function (a, b) {
                var c = this.Y[b] || (b ? this.Y[1] : this.Y[0]), d, c = c && c.dataLabelConf || this.baseConf;
                d = c.cacheStore[a];
                void 0 === d && (d = c.cacheStore[a] = h(a, c));
                return d
            }, yAxis: function (a, b) {
                var c = this.Y[b] || (b ? this.Y[1] : this.Y[0]), d, c = c && c.yAxisLabelConf || this.baseConf;
                d = c.cacheStore[a];
                void 0 === d && (d = c.cacheStore[a] = h(a, c, !0));
                return d
            }, xAxis: function (a) {
                var b = this.paramX.cacheStore[a];
                void 0 === b && (b = this.paramX.cacheStore[a] = h(a, this.paramX, !0));
                return b
            }, sYAxis: function (a) {
                var b = this.Y[1], c, b = b && b.yAxisLabelConf || this.baseConf;
                c = b.cacheStore[a];
                void 0 === c && (c = b.cacheStore[a] = h(a, b));
                return c
            }, scale: function (a) {
                var b = this.paramScale.cacheStore[a];
                void 0 === b && (b = this.paramScale.cacheStore[a] = h(a, this.paramScale));
                return b
            }, getCleanTime: function (a) {
                var b;
                this.timeConf.inputDateFormat &&
                Date.parseExact && (b = Date.parseExact(a, this.timeConf.inputDateFormat));
                return b && b.getTime()
            }, legendValue: function (a) {
                var b = this.paramLegend.cacheStore[a];
                void 0 === b && (b = this.paramLegend.cacheStore[a] = h(a, this.paramLegend));
                return b
            }, legendPercentValue: function (a) {
                var b = this.percentStrCacheStore[a], c = this.paramLegend;
                void 0 === b && (b = isNaN(c.decimalprecision) ? "2" : c.decimalprecision, b = this.percentStrCacheStore[a] = e(d(a, b, c.forcedecimals), c.decimalseparator, c.thousandseparator, c.thousandseparatorposition) +
                "%");
                return b
            }, getDateValue: function (a) {
                var b, c, d;
                a && !/\//.test(this.timeConf.inputDateFormat) && (a = a.replace(new RegExp(this.timeConf.inputDateFormat.replace(/[a-z]/ig, "").slice(0, 1), "g"), "/"));
                a = /^dd/.test(this.timeConf.inputDateFormat) && a && a.replace(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/, "$2/$1/$3") || a;
                b = new Date(a);
                c = b.getTime();
                !c && a && /\:/.test(a) && (a = a.split(":"), c = D(a[0], 0), d = D(a[1], 0), a = D(a[2], 0), c = 23 < c ? 24 === c && 0 === d && 0 === a ? c : 23 : c, d = 59 < d ? 59 : d, a = 59 < a ? 59 : a, b = new Date, b.setHours(c), b.setMinutes(d),
                    b.setSeconds(a), c = b.getTime());
                return {ms: c, date: b}
            }, getFormattedDate: function (a, b) {
                var d = "object" === typeof a && a || new Date(a), e = this.timeConf, g = c(b, e.outputDateFormat), h = d.getFullYear(), l = d.getMonth(), p = d.getDate(), n = d.getDay(), m = d.getMinutes(), z = d.getSeconds(), d = d.getHours(), m = 9 < m ? "" + m : "0" + m, z = 9 < z ? "" + z : "0" + z, d = 9 < d ? "" + d : "0" + d;
                g.match(/dnl/) && (g = g.replace(/dnl/ig, e.days[n]));
                g.match(/dns/) && (g = g.replace(/dns/ig, e.days[n] && e.days[n].substr(0, 3)));
                g.match(/dd/) && (g = g.replace(/dd/ig, p));
                g.match(/mnl/) &&
                (g = g.replace(/mnl/ig, e.months[l]));
                g.match(/mns/) && (g = g.replace(/mns/ig, e.months[l] && e.months[l].substr(0, 3)));
                g.match(/mm/) && (g = g.replace(/mm/ig, l + 1));
                g.match(/yyyy/) && (g = g.replace(/yyyy/ig, h));
                g.match(/yy/) && (g = g.replace(/yy/ig, (h % 1E3 % 100 + "").replace(/^(\d)$/, "0$1")));
                g.match(/hh12/) && (g = g.replace(/hh12/ig, d % 12 || 12));
                g.match(/hh/) && (g = g.replace(/hh/ig, d));
                g.match(/mn/) && (g = g.replace(/mn/ig, m));
                g.match(/ss/) && (g = g.replace(/ss/ig, z));
                g.match(/ampm/) && (g = g.replace(/ampm/ig, 12 > d ? "AM" : "PM"));
                g.match(/ds/) &&
                (g = g.replace(/ds/ig, e.daySuffix[p]));
                return g
            }
        };
        z.prototype.constructor = z;
        h = function (a, b, h) {
            if (null !== a) {
                a = Number(a);
                var l = a + "", p, n, m, z, v;
                p = 1 == b.formatnumberscale ? b.defaultnumberscale : "";
                v = (v = l.split(".")[1]) ? v.length : b.forcedecimals ? "2" : "";
                if (1 == b.formatnumberscale) {
                    l = a;
                    n = b.numberscalevalue;
                    a = b.numberscaleunit;
                    p = {};
                    var H = b.defaultnumberscale;
                    m = 0;
                    var G = [], M = [];
                    if (b.scalerecursively) {
                        for (m = 0; m < n.length; m++)if (z = D(n[m]) || 1E3, Math.abs(Number(l)) >= z && m < n.length - 1)H = l % z, l = (l - H) / z, 0 !== H && (G.push(H), M.push(a[m]));
                        else {
                            G.push(l);
                            M.push(a[m]);
                            break
                        }
                        G.reverse();
                        M.reverse();
                        p.value = G;
                        p.scale = M
                    } else {
                        if (n.length === a.length)for (m = 0; m < n.length; m++)if (z = D(n[m]) || 1E3, Math.abs(Number(l)) >= z)H = a[m] || "", l = Number(l) / z; else break;
                        p.value = l;
                        p.scale = H
                    }
                    n = p;
                    a = l = n.value;
                    p = n.scale
                }
                if (b.scalerecursively && 0 !== b.formatnumberscale && "0" !== b.formatnumberscale) {
                    h = n.value;
                    n = n.scale;
                    a = -1 == b.maxscalerecursion ? h.length : Math.min(h.length, b.maxscalerecursion);
                    if (1 == b.formatnumber)for (l = "", z = 0; z < a; z++)p = 0 === z ? h[z] : Math.abs(h[z]), m = p + "", z ==
                    a - 1 && (m = d(p, c(b.decimalprecision, v), b.forcedecimals)), l = l + e(m, b.decimalseparator, b.thousandseparator, b.thousandseparatorposition) + n[z] + (z < a - 1 ? b.scaleseparator : ""); else for (l = "", z = 0; z < a; z++)l = l + (0 === z ? h[z] : Math.abs(h[z]) + "") + n[z] + (z < a - 1 ? b.scaleseparator : "");
                    l = (b.numberprefix || "") + l + (b.numbersuffix || "")
                } else 1 == b.formatnumber && (l = d(a, c(b.decimalprecision, v), b.forcedecimals), l = e(l, b.decimalseparator, b.thousandseparator, b.thousandseparatorposition, h)), l = (b.numberprefix || "") + l + p + (b.numbersuffix || "");
                return l
            }
        };
        return z
    }();
    d.extend(d.core, {
        formatNumber: function (a, b) {
            b = b && z(b) || {};
            var c = N(b), d;
            P[c] ? d = P[c] : P[c] = d = new m.NumberFormatter(b, {useScaleRecursively: !0});
            return d.dataLabels(a)
        }
    }, !1);
    d.extend(d.core, {
        formatNumber: function (a, b, c, l) {
            c = c && z(c) || {};
            var p = this.jsVars.instanceAPI || {}, H = p.numberFormatter, q;
            "" === N(c) ? H ? q = H : (H = this.getChartData(d.dataFormats.JSON, !0), H = H.data || {}, H = H.chart || {}, c = N(H), P[c] ? q = P[c] : P[c] = q = new m.NumberFormatter(H, p)) : (H = this.getChartData(d.dataFormats.JSON, !0), H = H.data || {}, H = H.chart ||
            {}, H = v(v({}, H), c), c = N(H), P[c] ? q = P[c] : P[c] = q = new m.NumberFormatter(H, p));
            switch ((b && b.toLowerCase ? b : "").toLowerCase()) {
                case "yaxisvalues":
                    a = q.yAxis(a, l);
                    break;
                case "xaxisvalues":
                    a = q.xAxis(a);
                    break;
                case "scale":
                    a = q.scale(a);
                    break;
                default:
                    a = q.dataLabels(a, l)
            }
            return a
        }
    }, !0)
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-dom", function () {
    var d = this.hcLib, m = this.window, D = m.document, v = d.extend2, p = "ontouchstart"in m;
    (function (c) {
        var d = function () {
            var b = {}, a;
            b.pointerdrag = {
                start: ["mousedown"],
                end: ["mouseup"],
                onStart: ["mousemove"],
                postHandlers: {},
                preHandlers: {}
            };
            b.pointerhover = {start: ["mouseover"], end: ["mouseout"]};
            b.click = {start: ["click"]};
            b.escape = {
                start: ["keydown"], preHandlers: {
                    start: function (a) {
                        a = a || m.event;
                        return a.keyCode && 27 === a.keyCode ? !0 : !1
                    }
                }
            };
            p && (a =
                b.pointerdrag, a.start.push("touchstart"), a.end.push("touchend"), a.onStart.push("touchmove"), a.postHandlers.onStart = function (a) {
                a.preventDefault ? a.preventDefault() : a.returnValue = !1
            }, a = b.click, a.start.push("touchstart"));
            return b
        }(), b;
        b = v({}, d);
        c.dem = new function () {
            var c = {}, a = {}, d = D.addEventListener ? function (a, b, c) {
                a.addEventListener(b, c, !1)
            } : function (a, b, c) {
                a.attachEvent("on" + b, c)
            }, p = D.removeEventListener ? function (a, b, c) {
                a.removeEventListener(b, c, !1)
            } : function (a, b, c) {
                a.detachEvent("on" + b, c)
            }, N = function (a,
                             c, d) {
                var g = [], l, p, v;
                v = b[c];
                d.start = function (b) {
                    b = b || m.event;
                    for (var c = v.onStart, g = v.end, h = [], l = [], p = c && c.length || 0; p--;)h.push(z(a, c[p], d, "onStart"));
                    for (p = g && g.length || 0; p--;)l.push(z(a, g[p], d, "end"));
                    d.startUn = d.startUn ? d.startUn.concat(h) : h;
                    d.endUn = d.endUn ? d.endUn.concat(l) : l;
                    d.state = "start";
                    d.closure(b)
                };
                d.onStart = function (a) {
                    a = a || m.event;
                    d.state = "on";
                    if (d.gDef && d.gDef.preHandlers && "function" === typeof d.gDef.preHandlers.onStart)d.gDef.preHandlers.onStart(a);
                    d.closure(a);
                    if (d.gDef && d.gDef.postHandlers &&
                        "function" === typeof d.gDef.postHandlers.onStart)d.gDef.postHandlers.onStart(a)
                };
                d.end = function (a) {
                    a = a || m.event;
                    for (var b = d.startUn, c = d.endUn, e = b && b.length || 0; e--;)b[e]();
                    delete d.startUn;
                    d.startUn = [];
                    for (e = c && c.length || 0; e--;)c[e]();
                    delete d.endUn;
                    d.endUn = [];
                    d.state = "end";
                    d.closure(a)
                };
                if (v)for (c = v.start, p = c.length; p--;)(l = c[p]) && g.push(z(a, l, d, "start"));
                return g
            }, z = function (a, b, c, g) {
                g = g || "closure";
                d(a, b, c[g]);
                return function () {
                    p(a, b, c[g])
                }
            }, g = function (a) {
                return function (b) {
                    b = b || m.event;
                    a.handler.call(a.context ||
                    a.elem, {
                        data: a.data,
                        type: a.type,
                        state: a.state,
                        isGesture: a.isGesture,
                        target: b.target || b.srcElement,
                        originalEvent: b
                    })
                }
            };
            return {
                listen: function (d, h, l, p, m) {
                    var q = this;
                    h = "string" === typeof h ? h.split(" ") : h;
                    var v = h.length, w = [], P = function (a, b, c) {
                        w.push(function () {
                            q.unlisten(a, b, c)
                        })
                    }, s, K, U, ba, Ba;
                    if (d.ownerDocument && d.ownerDocument === D)for (; v--;)K = h[v], ba = Boolean(b[K]), Ba = "function" === typeof l ? l : l[v], U = {
                        handler: Ba,
                        elem: d,
                        type: K,
                        isGesture: ba,
                        gDef: ba ? b[K] : null,
                        data: p,
                        context: m,
                        start: [],
                        end: [],
                        links: {
                            prev: null,
                            next: null
                        }
                    }, U.closure = g(U), ba ? ((s = a[K]) || (s = a[K] = []), s.push(U), N(d, K, U)) : ((s = c[K]) || (s = c[K] = []), s.push(U), z(d, K, U)), P(d, K, Ba); else for (; v--;)K = h[v], Ba = "function" === typeof l ? l : l[v], U = {
                        handler: Ba,
                        elem: d,
                        type: K,
                        isGesture: ba,
                        data: p,
                        context: m,
                        start: [],
                        end: [],
                        links: {prev: null, next: null}
                    }, U.closure = g(U), (s = c[K]) || (s = c[K] = []), s.push(U), z(d, K, U), P(d, K, Ba);
                    return {
                        unlisten: function () {
                            for (var a = w.length; a--;)w[a]();
                            w.length = 0;
                            w = null
                        }
                    }
                }, unlisten: function (d, g, l) {
                    var m, z = !1, q, v;
                    if (Boolean(b[g]))for (q = (m = a[g]) &&
                    m.length || 0; q--;) {
                        if (v = m[q], v.handler === l && v.elem === d) {
                            var z = d, w = void 0, D = void 0, s = void 0, w = void 0;
                            if (w = b[g])for (w = w.start, s = w.length; s--;)(D = w[s]) && p(z, D, v.start);
                            m.splice(q, 1);
                            z = !0
                        }
                    } else for (q = (m = c[g]) && m.length || 0; q--;)v = m[q], v.handler === l && v.elem === d && (p(d, g, v.closure), m.splice(q, 1), z = !0);
                    return z
                }, fire: function (a, b, d, g) {
                    var l;
                    if (a.ownerDocument && a.ownerDocument === D)D.createEvent ? (l = D.createEvent("HTMLEvents"), l.initEvent(b, !0, !0), d && (d.originalEvent ? d.originalEvent = l : v(l, d)), "function" === typeof a[b] &&
                    a[b].call(a), a.dispatchEvent(l)) : (l = D.createEventObject(), l.eventType = b, d && (d.originalEvent ? d.originalEvent = l : v(l, d)), "function" === typeof a[b] && a[b].call(a), a.fireEvent("on" + b, l)), g && !l.returnValue && g(l); else for (g = (b = c[b]) && b.length || 0; g--;)l = b[g], l.elem === a && l.closure(d)
                }
            }
        }
    })(d || m);
    (function (c) {
        function d(a, b) {
            var c = "";
            D.defaultView && D.defaultView.getComputedStyle ? c = D.defaultView.getComputedStyle(a, "").getPropertyValue(b) : a.currentStyle && (b = b.replace(/\-(\w)/g, function (a, b) {
                return b.toUpperCase()
            }),
                c = a.currentStyle[b]);
            c = parseInt(c, 10);
            return isNaN(c) ? 0 : c
        }

        function b(b, c, d, g, e, h, p, m) {
            var v = c / 40, q = a[h || "linear"](g - d, v), D = 0, w = function () {
                var a;
                D < v ? (a = q[D], b.style[e] = d + a + m, l && "opacity" === e && (a = 100 * Number(a), b.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + a + ")"), D += 1, setTimeout(w, 40)) : p && p()
            };
            m = m || "";
            setTimeout(w, 40)
        }

        var p = {
            width: {suffix: "px"},
            height: {suffix: "px"},
            opacity: !0,
            top: {suffix: "px"},
            left: {suffix: "px"}
        }, a = {
            linear: function (a, b) {
                for (var c = [], d = a / b, e = 0; e < b; e += 1)c[e] = d * (e + 1);
                return c
            }
        }, l = /msie/i.test(m.navigator.userAgent) && !m.opera;
        c.danimate = v({
            animate: function (a, c, l, g, e) {
                g = {};
                var h = {}, m = function () {
                    D += 1;
                    D === v && "function" === typeof e && e()
                }, v = 0, D = 0, q, J;
                if (40 > l) {
                    for (J in c)a.style[J] = c[J];
                    e && e()
                } else for (J in c)p[J] && (v += 1, g[J] = c[J], h[J] = d(a, J), q = "object" === typeof p[J] && p[J].suffix, b(a, l, h[J], g[J], J, "linear", m, q))
            }
        }, {})
    })(d || m)
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-colormanager", function () {
    var d = this.hcLib, m = d.pluckNumber, D = d.graphics.getDarkColor, v = d.graphics.getLightColor, p = "AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "), c = "8BBA00 F6BD0F FF654F AFD8F8 FDB398 CDC309 B1D0D2 FAD1B9 B8A79E D7CEA5 C4B3CE E9D3BE EFE9AD CEA7A2 B2D9BA".split(" "), K = d.defaultPaletteOptions = {
        paletteColors: [p,
            p, p, p, p],
        bgColor: ["CBCBCB,E9E9E9", "CFD4BE,F3F5DD", "C5DADD,EDFBFE", "A86402,FDC16D", "FF7CA0,FFD1DD"],
        bgAngle: [270, 270, 270, 270, 270],
        bgRatio: ["0,100", "0,100", "0,100", "0,100", "0,100"],
        bgAlpha: ["50,50", "60,50", "40,20", "20,10", "30,30"],
        canvasBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
        canvasBgAngle: [0, 0, 0, 0, 0],
        canvasBgAlpha: ["100", "100", "100", "100", "100"],
        canvasBgRatio: ["", "", "", "", ""],
        canvasBorderColor: ["545454", "545454", "415D6F", "845001", "68001B"],
        canvasBorderAlpha: [100, 100, 100, 90, 100],
        showShadow: [0,
            1, 1, 1, 1],
        divLineColor: ["717170", "7B7D6D", "92CDD6", "965B01", "68001B"],
        divLineAlpha: [40, 45, 65, 40, 30],
        altHGridColor: ["EEEEEE", "D8DCC5", "99C4CD", "DEC49C", "FEC1D0"],
        altHGridAlpha: [50, 35, 10, 20, 15],
        altVGridColor: ["767575", "D8DCC5", "99C4CD", "DEC49C", "FEC1D0"],
        altVGridAlpha: [10, 20, 10, 15, 10],
        anchorBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
        toolTipBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
        toolTipBorderColor: ["545454", "545454", "415D6F", "845001", "68001B"],
        baseFontColor: ["555555", "60634E",
            "025B6A", "A15E01", "68001B"],
        borderColor: ["767575", "545454", "415D6F", "845001", "68001B"],
        borderAlpha: [50, 50, 50, 50, 50],
        legendBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
        legendBorderColor: ["545454", "545454", "415D6F", "845001", "D55979"],
        plotGradientColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
        plotBorderColor: ["333333", "8A8A8A", "FFFFFF", "FFFFFF", "FFFFFF"],
        plotFillColor: ["767575", "D8DCC5", "99C4CD", "DEC49C", "FEC1D0"],
        bgColor3D: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
        bgAlpha3D: ["100",
            "100", "100", "100", "100"],
        bgAngle3D: [90, 90, 90, 90, 90],
        bgRatio3D: ["", "", "", "", ""],
        canvasBgColor3D: ["DDE3D5", "D8D8D7", "EEDFCA", "CFD2D8", "FEE8E0"],
        canvasBaseColor3D: ["ACBB99", "BCBCBD", "C8A06C", "96A4AF", "FAC7BC"],
        divLineColor3D: ["ACBB99", "A4A4A4", "BE9B6B", "7C8995", "D49B8B"],
        divLineAlpha3D: [100, 100, 100, 100, 100],
        legendBgColor3D: ["F0F3ED", "F3F3F3", "F7F0E8", "EEF0F2", "FEF8F5"],
        legendBorderColor3D: ["C6CFB8", "C8C8C8", "DFC29C", "CFD5DA", "FAD1C7"],
        toolTipbgColor3D: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
        toolTipBorderColor3D: ["49563A",
            "666666", "49351D", "576373", "681C09"],
        baseFontColor3D: ["49563A", "4A4A4A", "49351D", "48505A", "681C09"],
        anchorBgColor3D: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"]
    }, p = d.colorManager = function (b, c) {
        var a = b.chart, l = d.extend2({}, K), p = c.defaultPaletteOptions || {}, N;
        l || (l = {});
        for (N in p)l[N] = p[N];
        l = this.paletteOptions = l;
        p = this.themeEnabled = a.palettethemecolor;
        this.paletteIndex = (0 < a.palette && 6 > a.palette ? a.palette : m(c.paletteIndex, 1)) - 1;
        this.iterator = 0;
        this.paletteColors = l.paletteColors[this.themeEnabled ? 0 :
            this.paletteIndex];
        N = a.palettecolors;
        void 0 !== N && null !== N && "" !== a.palettecolors && (this.paletteColors = a.palettecolors.split(/\s*\,\s*/));
        this.paletteLen = this.paletteColors.length;
        this.useFlatColors = m(a.useflatdataplotcolor, c.useFlatColor, 0);
        p && (this.paletteIndex = 5, l.bgColor.push(v(p, 35) + "," + v(p, 10)), l.bgAngle.push(270), l.bgRatio.push("0,100"), l.bgAlpha.push("50,50"), l.canvasBgColor.push("FFFFFF"), l.canvasBgAngle.push(0), l.canvasBgAlpha.push("100"), l.canvasBgRatio.push(""), l.canvasBorderColor.push(D(p,
            80)), l.canvasBorderAlpha.push(100), l.showShadow.push(1), l.divLineColor.push(D(p, 20)), l.divLineAlpha.push(40), l.altHGridColor.push(v(p, 20)), l.altHGridAlpha.push(15), l.altVGridColor.push(v(p, 80)), l.altVGridAlpha.push(10), l.anchorBgColor.push("FFFFFF"), l.toolTipBgColor.push("FFFFFF"), l.toolTipBorderColor.push(D(p, 80)), l.baseFontColor.push(p.split && p.split(",")[0]), l.borderColor.push(D(p, 60)), l.borderAlpha.push(50), l.legendBgColor.push("FFFFFF"), l.legendBorderColor.push(D(p, 80)), l.plotGradientColor.push("FFFFFF"),
            l.plotBorderColor.push(D(p, 85)), l.plotFillColor.push(D(p, 85)), l.bgColor3D.push("FFFFFF"), l.bgAlpha3D.push("100"), l.bgAngle3D.push(90), l.bgRatio3D.push(""), l.canvasBgColor3D.push(v(p, 20)), l.canvasBaseColor3D.push(v(p, 40)), l.divLineColor3D.push(D(p, 20)), l.divLineAlpha3D.push(40), l.legendBgColor3D.push("FFFFFF"), l.legendBorderColor3D.push(D(p, 80)), l.toolTipbgColor3D.push("FFFFFF"), l.toolTipBorderColor3D.push(D(p, 80)), l.baseFontColor3D.push(p.split && p.split(",")[0]), l.anchorBgColor3D.push("FFFFFF"), l.tickColor &&
        l.tickColor.push(D(p, 90)), l.trendDarkColor && l.trendDarkColor.push(D(p, 90)), l.trendLightColor && l.trendLightColor.push(v(p, l.TrendLightShadeOffset)), l.msgLogColor && l.msgLogColor.push(v(p, 80)), l.dialColor && l.dialColor.push(D(p, 95) + ",FFFFFF," + D(p, 95)), l.dialBorderColor && l.dialBorderColor.push(D(p, 95) + ",FFFFFF," + D(p, 95)), l.pivotColor && l.pivotColor.push(v(p, 95) + ",FFFFFF," + v(p, 95)), l.pivotBorderColor && l.pivotBorderColor.push(D(p, 95) + ",FFFFFF," + D(p, 95)), l.pointerBorderColor && l.pointerBorderColor.push(D(p,
            75)), l.pointerBgColor && l.pointerBgColor.push(D(p, 75)), l.thmBorderColor && l.thmBorderColor.push(D(p, 90)), l.thmFillColor && l.thmFillColor.push(v(p, 55)), l.cylFillColor && l.cylFillColor.push(v(p, 55)), l.periodColor && l.periodColor.push(v(p, 10)), l.winColor && l.winColor.push("666666"), l.lossColor && l.lossColor.push("CC0000"), l.drawColor && l.drawColor.push("666666"), l.scorelessColor && l.scorelessColor.push("FF0000"), l.gridColor && l.gridColor.push(v(p, 30)), l.categoryBgColor && l.categoryBgColor.push(v(p, 10)), l.dataTableBgColor &&
        l.dataTableBgColor.push(v(p, 10)), l.gridResizeBarColor && l.gridResizeBarColor.push(D(p, 90)), l.scrollBarColor && l.scrollBarColor.push(v(p, 50)))
    };
    p.prototype = {
        getColor: function (b) {
            return this.paletteOptions[b][this.paletteIndex]
        }, getPlotColor: function (b) {
            var c = this.paletteColors;
            b = this.useFlatColors ? this.getColor("plotFillColor") : c[b % this.paletteLen];
            b || (this.iterator === this.paletteLen && (this.iterator = 0), b = c[this.iterator], this.iterator += 1);
            return b
        }, parseColorMix: function (b, c) {
            var a = [], d, p, m, z, g, e, h,
                n, M, H;
            c = c.replace(/\s/g, "");
            c = c.toLowerCase();
            if ("" === c || null === c || void 0 === c)a = [b]; else for (p = c.split(","), m = b.split(","), z = Math.max(p.length, m.length, 1), g = p[0], e = m[0], M = /[\{\}]/ig, H = 0; H < z; H++)h = (p[H] || g).replace(M, ""), n = m[H] || e, "color" == h ? a.push(n) : "light" == h.substr(0, 5) ? (d = h.indexOf("-"), d = -1 == d ? 1 : h.substr(d + 1, h.length - d), d = 100 - d, a.push(v(n, d))) : "dark" == h.substr(0, 4) ? (d = h.indexOf("-"), d = -1 == d ? 1 : h.substr(d + 1, h.length - d), d = 100 - d, a.push(D(n, d))) : a.push(h);
            return a
        }, parseAlphaList: function (b, c) {
            var a =
                b.split(","), d = [], p, v = 100, z;
            for (z = 0; z < c; z++)p = m(a[z]), void 0 !== p && null !== p && (v = p), d[z] = v;
            return d.join()
        }, parseRatioList: function (b, c) {
            var a = b.split(","), d = [], p = 0, m, z;
            for (z = 0; z < c; z++)m = a[z], m = isNaN(m) || void 0 === m ? 0 : Math.abs(Number(m)), m = 100 < m ? 100 : m, d[z] = m, p += m;
            p = 100 < p ? 100 : p;
            if (a.length < c)for (z = a.length; z < c; z++)d[z] = (100 - p) / (c - a.length);
            d[-1] = 0;
            return d.join()
        }
    };
    p.prototype.constructor = p;
    d.defaultGaugePaletteOptions = {
        paletteColors: [c, c, c, c, c],
        bgColor: ["CBCBCB,E9E9E9", "CFD4BE,F3F5DD", "C5DADD,EDFBFE",
            "A86402,FDC16D", "FF7CA0,FFD1DD"],
        bgAngle: [270, 270, 270, 270, 270],
        bgRatio: ["0,100", "0,100", "0,100", "0,100", "0,100"],
        bgAlpha: ["50,50", "60,50", "40,20", "20,10", "30,30"],
        toolTipBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
        toolTipBorderColor: ["545454", "545454", "415D6F", "845001", "68001B"],
        baseFontColor: ["555555", "60634E", "025B6A", "A15E01", "68001B"],
        tickColor: ["333333", "60634E", "025B6A", "A15E01", "68001B"],
        trendDarkColor: ["333333", "60634E", "025B6A", "A15E01", "68001B"],
        trendLightColor: ["f1f1f1", "F3F5DD",
            "EDFBFE", "FFF5E8", "FFD1DD"],
        pointerBorderColor: ["545454", "60634E", "415D6F", "845001", "68001B"],
        pointerBgColor: ["545454", "60634E", "415D6F", "845001", "68001B"],
        canvasBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
        canvasBgAngle: [0, 0, 0, 0, 0],
        canvasBgAlpha: ["100", "100", "100", "100", "100"],
        canvasBgRatio: ["", "", "", "", ""],
        canvasBorderColor: ["545454", "545454", "415D6F", "845001", "68001B"],
        canvasBorderAlpha: [100, 100, 100, 90, 100],
        altHGridColor: ["EEEEEE", "D8DCC5", "99C4CD", "DEC49C", "FEC1D0"],
        altHGridAlpha: [50,
            35, 10, 20, 15],
        altVGridColor: ["767575", "D8DCC5", "99C4CD", "DEC49C", "FEC1D0"],
        altVGridAlpha: [10, 20, 10, 15, 10],
        borderColor: ["767575", "545454", "415D6F", "845001", "68001B"],
        borderAlpha: [50, 50, 50, 50, 50],
        legendBgColor: ["ffffff", "ffffff", "ffffff", "ffffff", "ffffff"],
        legendBorderColor: ["545454", "545454", "415D6F", "845001", "D55979"],
        plotFillColor: ["767575", "D8DCC5", "99C4CD", "DEC49C", "FEC1D0"],
        plotBorderColor: ["999999", "8A8A8A", "6BA9B6", "C1934D", "FC819F"],
        msgLogColor: ["717170", "7B7D6D", "92CDD6", "965B01", "68001B"],
        TrendLightShadeOffset: 30
    }
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-annotations", function () {
    var d = this, m = d.core, D = d.hcLib, v = d.window, p = /msie/i.test(v.navigator.userAgent) && !v.opera, c = D.addEvent, K = D.removeEvent, b = D.hasTouch, G = v.Number, a = b ? 6 : 5, l = "rgba(192,192,192," + (p ? .002 : 1E-6) + ")", p = v.Math, P = p.min, N = p.max, z = p.sin, g = p.cos, e = p.PI, h = e / 180, n = d.extend, M = D.pluck, H = D.pluckNumber, q = D.graphics.convertColor, J = D.getValidValue, w = D.parseUnsafeString, ja = D.setImageDisplayMode, s = D.graphics.parseColor, $ = D.setLineHeight,
        U = D.getMouseCoordinate, ba = {style: {}}, Ba = D.toRaphaelColor, la = function (a, b) {
            return {start: -b, end: -a, angle: a - b}
        }, ga = function (a, b, c, d, e) {
            var g, h, l = 0, p = 0;
            h = void 0 === b || null === b ? 1 : b;
            var m;
            if (!a || !a.toString)return {value: c, hasDynamicMacros: !1};
            a = a.toString();
            a = a.toLowerCase().replace(/\s/g, "");
            if (c = a.match(/^[\+\-]?\d+(\.\d+)?|[\+\-]\d+(\.\d+)?/g)) {
                for (b = 0; b < c.length; b += 1)l += Number(c[b]) || 0;
                l *= h
            }
            if (c = a.match(/^[\+\-]?(\$[a-z0-9\.]+)|[\+\-](\$[a-z0-9\.]+)/g))for (b = 0; b < c.length; b += 1) {
                g = c[b];
                var q = d, n = e, s = g.split("."),
                    z = void 0, v = void 0, w = 0;
                for (h = void 0; z = s.shift();)switch (typeof(v = q[z])) {
                    case "object":
                        q = v[z];
                        break;
                    case "function":
                        v = v(s, n), "-" === g.charAt() && (v *= -1), h = !0;
                    default:
                        w += G(v) || 0, s.length = 0
                }
                g = w;
                h && (m = !0);
                p += g
            }
            if (c = a.match(/^[\+\-]?\$\d+(\.\d+)?|[\+\-]\$\d+(\.\d+)?/g))for (b = 0; b < c.length; b += 1)p = p + Number(c[b].replace("$", "")) || 0;
            return {value: l + p, hasDynamicMacros: m}
        }, ea = function (a, b, c) {
            if (!b.removed) {
                b = b.data("annotation");
                var e = b.getRenderer(), g = U(e.container, c), h = g.annotationOptions = b.options, l = g.groupOptions =
                    b.group.options;
                g._shape = b;
                "id"in h && (g.annotationId = h.id);
                "id"in l && (g.groupId = l.id);
                d.raiseEvent(a, g, e.fusionCharts, c)
            }
        }, pa, Z, ma;
    Z = function (a, b, c, d, e) {
        this.options = a;
        this.attrs = {};
        this.css = {};
        this.bounds = {};
        this.shared = b;
        this.snaps = c || {};
        this.annotations = e;
        this.items = b = [];
        this._idstore = d;
        a.id && (this._id = a.id, d[a.id] = this);
        if (a = a.items)for (d = 0, c = a.length; d < c; d += 1)b.push(new ma(a[d], this))
    };
    n(Z.prototype, {
        scaleImageX: 1,
        scaleImageY: 1,
        scaleText: 1,
        scaleValue: 1,
        scaleValueComplement: 1,
        scaleX: 1,
        scaleY: 1
    });
    Z.prototype.setup = function () {
        var a = this.options, b = this.shared, c = this.getRenderer();
        c && (this.isBelow = 0 !== H(a.showbelow, a.showbelowchart, b.showbelow), this.useTracker = !this.isBelow && c.layers.tracker && this.shared.useTracker, this.raiseOwnEvents = b.interactionevents)
    };
    Z.prototype.scale = function () {
        var a = this.options, b = this.shared, c = this.bounds, d = this.snaps, e = this.getRenderer(), g = b.rootxscale, h = b.rootyscale, l = c.xs = H(a.xscale, b.xscale, 100) / 100, p = c.ys = H(a.yscale, b.yscale, 100) / 100, m, q, n;
        e && (this.scaleText *= p,
            this.scaleImageX *= l, this.scaleImageY *= p, 0 !== H(a.autoscale, b.autoscale) && (l = H(a.origw, b.origw), p = H(a.origh, b.origh), l = e.chartWidth / l, p = e.chartHeight / p, e = 0 !== H(a.constrainedscale, b.constrainedscale), m = l < p ? l : p, q = e ? m : l, n = e ? m : p, this.scaleValue = Z.prototype.scaleValue * m, this.scaleValueComplement = Z.prototype.scaleValueComplement * (e ? m : l < p ? p : l), this.scaleX = Z.prototype.scaleX * q, this.scaleY = Z.prototype.scaleX * n, c.xs *= q, c.ys *= n, g *= q, h *= n, "1" == M(a.scaletext, b.scaletext) && (this.scaleText = Z.prototype.scaleText * n),
        "1" == M(a.scaleimages, b.scaleimages) && (this.scaleImageX = Z.prototype.scaleImageX * q, this.scaleImageY = Z.prototype.scaleImageY * n)), c.x = ga(M(a.x, a.xpos), g, 0, d, this.isBelow).value + H(a.grpxshift, b.grpxshift, 0), c.y = ga(M(a.y, a.ypos), h, 0, d, this.isBelow).value + H(a.grpyshift, b.grpyshift, 0), this.xshift = H(a.xshift, b.xshift, 0), this.yshift = H(a.yshift, b.yshift, 0))
    };
    Z.prototype.draw = function () {
        var a = this.getRenderer(), b = this.options, c = this.bounds, d = this.items, e = a && a.layers.dataset, g = this.wrapper;
        if (a) {
            g || (this.wrapper =
                g = a.paper.group("annotations"), e && (this.isBelow ? g.insertBefore(e) : g.insertAfter(a.layers.datalabels || e)));
            this.wrapper.attr({x: 0, y: 0, visibility: H(b.visible, 1) ? "" : "hidden"}).translate(c.x, c.y);
            b = 0;
            for (c = d.length; b < c; b += 1)a = d[b], a.scale(!0), a.queueDraw ? a.queue() : (a.setup(), a.draw());
            return this
        }
    };
    Z.prototype.destroy = function () {
        for (var a = this.wrapper, b = this.items, c; c = b.shift();)c.destroy();
        a && (this.wrapper = a.remove());
        this._idstore[this._id] === this && delete this._idstore[this._id]
    };
    Z.prototype.addItem =
        function (a, b) {
            var c;
            this.items.push(c = new ma(a, this, this._idstore));
            b && null !== this.getRenderer() && (c.scale(), c.setup(), c.draw());
            return c
        };
    Z.prototype.removeItem = function (a) {
        for (var b = this.items, c = b.length; c--;)if (a === b[c]._id)return b.splice(c, 1)
    };
    Z.prototype.getRenderer = function () {
        return this.annotations && this.annotations.getRenderer() || null
    };
    ma = function (a, b) {
        var c = !1, d;
        this.options = a;
        this.group = b;
        this.args = [];
        this.attrs = {};
        this.attrsTracker = {};
        this.style = {};
        this.bounds = {};
        this._idstore = b._idstore;
        a.id && (this._id = a.id, b._idstore[a.id] = this);
        this.type = a.type && a.type.toLowerCase && a.type.toLowerCase();
        for (d in ma.eventNames)"function" === typeof a[d] && (this[d] = a[d], c = !0);
        this.hasEvents = c;
        "function" === typeof a.onload && (this.onload = a.onload)
    };
    d.extend(ma.prototype, {
        getAbsoluteBounds: function () {
            var a = this.bounds, b = a.x1, c = a.y1, d = a.x2, e = a.y2, g = P(b, d), h = P(c, e), b = N(b, d) - g, c = N(c, e) - h;
            return {x: g, width: b, y: h, height: c, r: a.r, unscaled: {width: b / a.xs, height: c / a.ys}}
        }, queue: function () {
            this.group.annotations.shapesToDraw.push(this)
        },
        scale: function (a) {
            var b = this, c = b.group, d = c.bounds, e = b.bounds, g = b.options, h = c.snaps, l = M(g.x, g.xpos), p = M(g.y, g.ypos), m = M(g.tox, g.toxpos), q = M(g.toy, g.toypos), n = e.xs = d.xs, d = e.ys = d.ys, s = H(g.xshift, c.xshift, 0), z = H(g.yshift, c.yshift, 0), v;
            v = function (d, e, g, h) {
                d = ga(d, e, g, h, c.isBelow);
                d.hasDynamicMacros && a && (b.queueDraw = !0);
                return d.value
            };
            b.hasDimension = !0;
            b.hasDimensionX = !0;
            b.hasDimensionY = !0;
            e.x1 = v(l, n, 0, h) + s;
            void 0 === m ? (b.hasDimension = !1, b.hasDimensionX = !1, e.x2 = e.x1) : e.x2 = v(m, n, 0, h) + s;
            e.y1 = v(p, d, 0, h) + z;
            void 0 === q ? (b.hasDimension = !1, b.hasDimensionY = !1, e.y2 = e.y1) : e.y2 = v(q, d, 0, h) + z;
            ma.angularShapeTypes[b.type] && (e.angles = la(v(g.startangle, 1, 0, h), v(g.endangle, 1, 360, h)));
            e.r = v(g.radius, c.scaleValue, 0, h)
        }, setup: function () {
            var a = this.options, b = this.group, c = b.options, d = this.attrs, e = this.style, g = b.scaleValue, h = H(c.fillalpha, c.alpha, 100), p = this.fillAlpha = M(a.fillalpha, a.alpha, h), m = this.fillColor = M(a.fillcolor, a.color, c.color), s = this.fillPattern = M(a.fillpattern && a.fillpattern.toLowerCase && a.fillpattern.toLowerCase(),
                c.fillpattern && c.fillpattern.toLowerCase && c.fillpattern.toLowerCase()), z = this.bordered = H(a.showborder, ma.borderedShapeTypes[this.type], !!J(a.bordercolor)), v = this.borderColor = M(a.bordercolor, c.bordercolor, m), h = this.borderAlpha = H(a.borderalpha, a.alpha, c.borderalpha, h), D = this.dashed = !!H(a.dashed, 0), G = H(a.borderthickness, a.thickness, 2) * g;
            this.link = M(a.link, c.link);
            this.shadow = "1" == M(a.showshadow, c.showshadow);
            void 0 === m && (m = ma.borderedShapeTypes[this.type] && "none" || "#ff0000", void 0 === v && (v = "#ff0000"));
            z && G ? (d.stroke = q(v, h), d["stroke-linecap"] = "round", d["stroke-width"] = G, D && (d["stroke-dasharray"] = [H(a.dashlen, 5) * g, H(a.dashgap, 3) * g])) : d.stroke = "none";
            this.fillOptions = {
                gradientUnits: "objectBoundingBox",
                color: m,
                alpha: p,
                ratio: M(a.fillratio, c.fillratio),
                angle: 360 - H(a.fillangle, 0),
                radialGradient: "radial" === s
            };
            this.link && (e.cursor = "pointer", e._cursor = "hand");
            d.visibility = H(a.visible, 1) ? "" : "hidden";
            this.useTracker = b.useTracker;
            this.toolText = w(M(a.tooltext, c.tooltext));
            if (this.useTracker || this.link || this.toolText)n(this.attrsTracker,
                {stroke: l, fill: l}), this.link && (this.attrsTracker.ishot = +new Date);
            this.raiseOwnEvents = b.raiseOwnEvents
        }, draw: function () {
            var a = this.getRenderer(), b = this.type, d = this.attrs, e = this.style, g = a && a.paper, h = ma.types[b] && ma.types[b].call && ma.types[b].call(this, a), l = ma.imageShapeTypes[h], p = ma.textShapeTypes[h], m = l || p || ma.trackerShapeTypes[h], q = this.link || this.toolText, n = this.wrapper, b = this.tracker, s = a && a.layers.tracker || this.group.wrapper, z = !1, v = b || n, w = ma.eventNames, D = ma.ownEvents, H, G;
            if (a) {
                if (h) {
                    if (n)if (n.elemType !==
                        h) {
                        if (this.ownEventsAttached) {
                            for (G in D)v["un" + G].apply(n, D[G]);
                            this.ownEventsAttached = !1
                        }
                        n = n.remove()
                    } else if (this.hasEvents)for (H in w)(G = this[H]) && G.eventAttached && (K(v.node, w[H], G), G.eventAttached = !1);
                    l || (d.fill = Ba(this.fillOptions));
                    n ? n.attr(d).css(e) : (this.args.push(this.group.wrapper), n = this.wrapper = g[h].apply(g, this.args).attr(d).css(e), n.elemType = h, n.data("annotation", this), z = !0, this.args.pop());
                    !this.shadow || this.shadowAdded || l || p ? n.shadow(this.shadowAdded = !1) : n.shadow(this.shadowAdded = !0, N(this.borderAlpha, this.fillOptions.alpha) / 100);
                    q ? this.useTracker && (b || (this.args.push(s), b = this.tracker = m ? g.rect(0, 0, 0, 0, 0, s) : g[h].apply(g, this.args), this.args.pop()), b.attr(d).attr(this.attrsTracker)) : b && (b = b.remove());
                    v = b || n;
                    if (this.raiseOwnEvents && !this.ownEventsAttached) {
                        for (G in D)v[G].apply(n, D[G]);
                        this.ownEventsAttached = !0
                    }
                    this.link && v.click(a.linkClickFN, this);
                    this.toolText && (v.tooltip(this.toolText || ""), this.group.wrapper.trackTooltip(!0));
                    if (this.hasEvents)for (H in w)(G = this[H]) && !G.eventAttached &&
                    (c(v.node, w[H], G, this), G.eventAttached = !0);
                    l || (b && m && (a = n.getBBox(), b.attr({
                        x: a.x,
                        y: a.y,
                        width: a.width,
                        height: a.height
                    })), z && this.onload && this.onload(d))
                }
                return this
            }
        }, destroy: function () {
            var a = this.wrapper, b = this.tracker, c = b || a, d = ma.eventNames, e = ma.ownEvents, g, h;
            if (a) {
                if (this.ownEventsAttached) {
                    for (h in e)c["un" + h].apply(a, e[h]);
                    this.ownEventsAttached = !1
                }
                if (this.hasEvents)for (g in d)(h = this[g]) && h.eventAttached && (K(c.node, d[g], h), h.eventAttached = !1);
                b && (this.tracker = b.remove());
                this.wrapper = a.remove()
            }
            this._idstore[this._id] ===
            this && delete this._idstore[this._id]
        }, getRenderer: function () {
            return this.group && this.group.getRenderer() || null
        }
    });
    d.extend(ma, {
        imageShapeTypes: {image: !0},
        angularShapeTypes: {circle: !0, arc: !0},
        textShapeTypes: {text: !0},
        trackerShapeTypes: {image: !0, text: !0},
        borderedShapeTypes: {path: !0, line: !0},
        eventNames: {
            onmouseover: b ? "touchstart" : "mouseover",
            onmouseout: "mouseout",
            onmousemove: b ? "touchmove" : "mousemove",
            onclick: "click"
        },
        ownEvents: {
            click: [function (a) {
                ea("annotationClick", this, a)
            }], hover: [function (a) {
                ea("annotationRollOver",
                    this, a)
            }, function (a) {
                ea("annotationRollOut", this, a)
            }]
        },
        textAlignOptions: {left: "start", right: "end", center: "middle"},
        textVerticalAlignOptions: {top: "bottom", middle: "middle", bottom: "top"},
        textRotationOptions: {0: "0", 1: "270", right: "90", cw: "90", left: "270", ccw: "270"},
        types: {
            rectangle: function () {
                var a = this.args, b = this.attrs, c = this.getAbsoluteBounds(), d = .5 * c.width;
                c.r > d && (c.r = d);
                a[0] = b.x = c.x;
                a[1] = b.y = c.y;
                a[2] = b.width = c.width;
                a[3] = b.height = c.height;
                a[4] = b.r = c.r;
                return "rect"
            }, line: function () {
                var b = this.attrs,
                    c = this.bounds;
                this.args[0] = b.path = ["M", c.x1, c.y1, "L", c.x2, c.y2];
                1 === b["stroke-width"] && (b["shape-rendering"] = "crisp");
                b["stroke-width"] < a && (this.attrsTracker["stroke-width"] = a);
                this.bordered && this.dashed && (this.attrsTracker["stroke-dasharray"] = "solid");
                return "path"
            }, path: function () {
                var a = this.attrs, b = this.bounds;
                this.args[0] = a.path = this.options.path;
                a.transform = ["T", b.x1, b.y1, "S", b.xs, b.ys, b.x1, b.y1];
                1 === a["stroke-width"] && (a["shape-rendering"] = "crisp");
                return "path"
            }, polygon: function () {
                var a = this.args,
                    b = this.attrs, c = this.options, d = this.bounds, e = this.group, g = e.snaps;
                a[0] = ga(c.sides, 1, 5, g, e.isBelow).value;
                a[1] = d.x1;
                a[2] = d.y1;
                a[3] = d.r;
                a[4] = ga(c.startangle, 1, 0, g, e.isBelow).value;
                a[5] = 0;
                b.polypath = a.slice(0);
                return "polypath"
            }, circle: function (a) {
                var b = this.args, c = this.attrs, d = this.options, l = this.bounds, p = a.chartWidth, m = a.chartHeight, q = this.group.scaleValueComplement, n = this.group.snaps, s = l.angles, v = this.group;
                a = l.r;
                M(d.radius) || (l.r = p < m ? p * l.xs : m * l.ys, l.r = a = .3 * l.r);
                d = ga(d.yradius, q, a, n, v.isBelow).value;
                this.fillPattern || (this.fillOptions.radialGradient = !0, this.fillPattern = "radial");
                "radial" === this.fillPattern && (this.fillOptions.cx = this.fillOptions.cy = .5);
                p = s.angle % 360;
                if (!p && a === d)return b[0] = c.cx = l.x1, b[1] = c.cy = l.y1, b[2] = c.r = l.r, "circle";
                p || (s.start -= .001);
                m = s.start * h;
                p = s.end * h;
                s = s.angle * h;
                q = l.x1;
                n = l.y1;
                l = q + g(m) * a;
                m = n + z(m) * d;
                q += g(p) * a;
                p = n + z(p) * d;
                b[0] = c.path = ["M", l, m, "A", a, d, 0, 0, s >= e ? 0 : 1, q, p, "Z"];
                return "path"
            }, arc: function (a) {
                var b = this.options, c = this.args, d = this.attrs, e = this.bounds, g = a.chartWidth;
                a = a.chartHeight;
                var l = this.group, p = l.scaleValue, m = e.angles;
                M(b.radius) || (e.r = g < a ? g * e.xs : a * e.ys, e.r *= .3);
                e.innerR = ga(b.innerradius, p, .8 * e.r, this.group.snaps, l.isBelow).value;
                e.innerR > e.r && (e.innerR += e.r, e.r = e.innerR - e.r, e.innerR -= e.r);
                this.fillPattern || (this.fillOptions.radialGradient = !0, this.fillPattern = "radial");
                "radial" === this.fillPattern && (this.fillOptions.cx = this.fillOptions.cy = .5);
                c[0] = e.x1;
                c[1] = e.y1;
                c[2] = e.r;
                c[3] = e.innerR;
                c[4] = m.start * h;
                c[5] = m.end * h;
                d.ringpath = c.slice(0);
                return "ringpath"
            }, text: function (a) {
                var b =
                    this.args, c = this.style, d = this.attrs, e = this.group, g = this.bounds, h = this.options, l = this.getAbsoluteBounds(), p = M(h.align, e.options.textalign, "center").toLowerCase(), m = M(h.valign, e.options.textvalign, "middle").toLowerCase(), q = w(M(h.text, h.label)), z = a.logic.smartLabel, v = H(h.wrap, e.options.wraptext, 1), D, G, K = M(h.rotatetext, e.options.rotatetext, "0").toLowerCase(), K = ma.textRotationOptions[K], J = "0" !== K ? "y" : "x", N = a.options.orphanStyles;
                a = n({}, N.defaultStyle.style || {});
                N = e.id && N[e.id.toLowerCase()] || ba;
                a = n(a,
                    N.style);
                var N = parseFloat(a.fontSize), P = M(h.font, e.options.font, a.fontFamily), e = H(h.fontsize, e.options.fontsize, N) * e.scaleText;
                v && (D = H(h.wrapwidth, this.hasDimensionX ? l.width / g.xs : void 0), G = H(h.wrapheight, this.hasDimensionY ? l.height / g.ys : void 0), D && (D *= g.xs), G && (G *= g.ys));
                c.fontFamily = P;
                c.fontWeight = H(h.bold, h.isbold, 0) ? "bold" : "normal";
                H(h.italic, h.isitalic, 0) && (c.fontStyle = "italic");
                h.bgcolor && (!d["text-bound"] && (d["text-bound"] = []), d["text-bound"][0] = s(h.bgcolor));
                h.bordercolor && (!d["text-bound"] &&
                (d["text-bound"] = []), d["text-bound"][1] = s(h.bordercolor), d["text-bound"][2] = H(h.borderthickness, 1), d["text-bound"][3] = H(h.padding, 1));
                h.fontcolor && (d.fill = s(h.fontcolor), this.fillOptions && (this.fillOptions.color = d.fill));
                c.fontSize = e + "px";
                e === N ? c.lineHeight = a.lineHeight : $(c);
                d["text-anchor"] = ma.textAlignOptions[p] || ma.textAlignOptions.center;
                z.setStyle(c);
                c = z.getSmartText(q, D, G, !1);
                d["vertical-align"] = ma.textVerticalAlignOptions[m] || ma.textVerticalAlignOptions.middle;
                d["text-anchor"] === ma.textAlignOptions.left ?
                    l[J] += H(h.leftmargin, 0) : d["text-anchor"] === ma.textAlignOptions.center && (l[J] += .5 * H(h.leftmargin, 0));
                "0" !== K && (d.rotation = [parseFloat(K), l.x, l.y]);
                b[0] = d.x = l.x;
                b[1] = d.y = l.y;
                b[2] = d.text = c.text;
                c.tooltext && (d.title = c.tooltext);
                delete d.stroke;
                delete d["stroke-weight"];
                return "text"
            }, image: function (a) {
                var b = this, c = b.style, d = a.chartWidth, e = a.chartHeight;
                a = b.options;
                var g = b.attrs, h = b.args, l = J(a.url), p = b.group.scaleImageX * M(Number(a.xscale), 100) / 100, m = b.group.scaleImageY * M(Number(a.yscale), 100) / 100, q = b.getAbsoluteBounds(),
                    s = {width: 1, height: 1}, z;
                if (!l)return h[0] = g.x = q.x, h[1] = g.y = q.y, h[2] = g.width = q.width, h[3] = g.height = q.height, h[4] = g.r = q.r, "rect";
                z = new v.Image;
                z.onload = function () {
                    s = ja("none", "top", "left", 100, 0, d, e, z);
                    delete s.x;
                    delete s.y;
                    s = n(s, {
                        width: (b.hasDimensionX ? q.unscaled.width : s.width) * p,
                        height: (b.hasDimensionY ? q.unscaled.height : s.height) * m
                    });
                    setTimeout(function () {
                        var a, d, e;
                        if (a = b.wrapper) {
                            a.attr(s);
                            if (d = b.tracker)e = a.getBBox(), d.attr({
                                x: e.x,
                                y: e.y,
                                width: e.width,
                                height: e.height
                            });
                            a.css({
                                opacity: c.opacity = N(H(b.fillAlpha,
                                    b.borderAlpha), b.borderAlpha) / 100
                            })
                        }
                        b.onload && b.onload(s)
                    }, 0)
                };
                z.src = l;
                h[0] = g.src = l;
                h[1] = g.x = q.x;
                h[2] = g.y = q.y;
                h[3] = g.width = (b.hasDimensionX ? q.unscaled.width : s.width) * p;
                h[4] = g.height = (b.hasDimensionY ? q.unscaled.height : s.height) * m;
                c.opacity = N(H(b.fillAlpha, b.borderAlpha), b.borderAlpha) / 100;
                delete g.stroke;
                delete g.fill;
                delete g["stroke-linecap"];
                return "image"
            }
        }
    });
    pa = function () {
        this.groups = [];
        this._idstore = {};
        this._options = {}
    };
    D.Annotations = pa;
    d.extend(pa.prototype, {
        reset: function (a, b, c) {
            var d = this.groups,
                e;
            this.clear();
            if (c) {
                e = {};
                for (var g in c)switch (typeof c[g]) {
                    case "object":
                    case "function":
                        e["-$" + g] = e["$" + g] = e["+$" + g] = c[g];
                        break;
                    default:
                        e["$" + g] = e["+$" + g] = c[g], e["-$" + g] = -1 * c[g]
                }
                e = this._literals = e
            }
            b && (this._options = b);
            if (a && a.groups && d)for (c = 0; c < a.groups.length; c += 1)d.push(new Z(a.groups[c], b, e, this._idstore, this))
        }, getRenderer: function () {
            return this._renderer
        }, addGroup: function (a) {
            var b = this.getRenderer();
            this.groups.push(a = new Z(a, this._options, this._literals, this._idstore, this));
            b && (a.setup(),
                a.scale(), a.draw());
            return a
        }, addItem: function (a, b, c) {
            var e, g = this.getRenderer();
            "string" === typeof a ? e = this._idstore[a] : (c = b, b = a);
            if (e && e.addItem) {
                if (!g && c) {
                    d.raiseWarning(this, "04031411430", "run", "Annotations~addItem()", "Cannot draw the shapeif the group has not been drawn. Use Annotations~draw() to draw the group and pass the renderer to it.");
                    return
                }
                a = e.addItem(b, c)
            } else a = this.addGroup({}).addItem(b, c);
            return a
        }, draw: function (a) {
            var b = this.groups, c, d;
            if (b && (this._renderer = a || this._renderer))for (c =
                                                                     0, d = b.length; c < d; c++)a = b[c], a.setup(), a.scale(), a.draw()
        }, clear: function () {
            var a = this.groups, b;
            if (a) {
                for (; b = a.shift();)b.destroy();
                this.shapesToDraw = []
            }
        }, dispose: function () {
            var a;
            this.disposing = !0;
            this.clear();
            for (a in this)delete this[a];
            this.disposed = !0
        }, hide: function (a) {
            if (a = this._idstore[a])return a.attrs.visibility = "hidden", a.wrapper && a.wrapper.hide(), a
        }, show: function (a) {
            if (a = this._idstore[a])return a.attrs.visibility = "", a.wrapper && a.wrapper.show(), a
        }, update: function (a, b, c) {
            a = this._idstore[a];
            var d;
            if (a && b) {
                if ("object" === typeof b)for (d in b.id && delete b.id, b.type && delete b.type, b)a.options[(d + "").toLowerCase()] = b[d] + ""; else a.options[(b + "").toLowerCase()] = c + "";
                a.wrapper && (a.scale(), a.setup(), a.draw());
                return a
            }
        }, destroy: function (a) {
            var b = this._idstore[a], c = b.group;
            b && "function" === typeof b.destroy && (c && c.removeItem(a), b.destroy())
        }, shapesToDraw: []
    });
    d.core.addEventListener("beforeinitialize", function (a) {
        "javascript" === a.sender.options.renderer && (a.sender.annotations = new pa)
    });
    d.core.addEventListener("disposed",
        function (a) {
            a.sender.annotations && a.sender.annotations.dispose()
        });
    d.addEventListener("internal.animationComplete", function (a) {
        var b = (a = a.sender.annotations) && a.shapesToDraw, c = b && b.length, d, e;
        if (c) {
            for (e = 0; e < c; e++)d = b[e], d.queueDraw = !1, d.scale(), d.setup(), d.draw();
            a.shapesToDraw = []
        }
    });
    m.addEventListener("rendered", function (a, b) {
        if ("javascript" === b.renderer) {
            var c = a.sender, d = c.jsVars || {}, e = d.instanceAPI;
            d.hcObj && e && e.drawAnnotations ? (c.showAnnotation || (c.showAnnotation = function () {
                c.annotations.show.apply(c.annotations,
                    arguments)
            }), c.hideAnnotation || (c.hideAnnotation = function () {
                c.annotations.hide.apply(c.annotations, arguments)
            })) : (delete c.showAnnotation, delete c.hideAnnotation)
        }
    })
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-base", function () {
    var d = this, m = d.hcLib, D = d.window, v = D.document, p = m.BLANKSTRING, c = m.createTrendLine, K = "https:" === D.location.protocol ? "https://export.api3.fusioncharts.com/" : "http://export.api3.fusioncharts.com/", b = m.pluck, G = m.getValidValue, a = m.pluckNumber, l = m.getFirstValue, P = m.getDefinedColor, N = m.parseUnsafeString, z = m.FC_CONFIG_STRING, g = m.extend2, e = m.getDashStyle, h = m.parseTooltext, n = m.toPrecision, M = m.regex.dropHash, H = m.HASHSTRING, q = m.getSentenceCase,
        J = m.addEvent, w = D.Math, ja = m.TOUCH_THRESHOLD_PIXELS, s = m.CLICK_THRESHOLD_PIXELS, $ = w.min, U = w.max, ba = w.abs, Ba = w.ceil, la = w.floor, ga = w.log, ea = w.pow, pa = w.sqrt, Z = w.round, ma = m.graphics.getColumnColor, L = m.getFirstColor, I = m.setLineHeight, fa = m.pluckFontSize, t = m.getFirstAlpha, R = m.graphics.getDarkColor, Y = m.graphics.getLightColor, C = m.graphics.convertColor, xa = m.COLOR_TRANSPARENT, Pa = m.POSITION_CENTER, Ga = m.POSITION_TOP, qa = m.POSITION_BOTTOM, za = m.POSITION_RIGHT, ya = m.POSITION_LEFT, ta = m.parsexAxisStyles, V = m.chartAPI, oa =
            m.graphics.mapSymbolName, Ra = V.singleseries, ib = V.multiseries, Da = m.COMMASTRING, Za = m.STRINGUNDEFINED, Ea = m.ZEROSTRING, Ka = m.ONESTRING, Xa = m.HUNDREDSTRING, Ca = m.PXSTRING, yb = m.COMMASPACE, Fb = D.navigator.userAgent.match(/(iPad|iPhone|iPod)/g), vb = !/fusioncharts\.com$/i.test(D.location.hostname), $a = {
            left: "start",
            right: "end",
            center: "middle"
        }, sb = m.BLANKSTRINGPLACEHOLDER, db = m.BGRATIOSTRING, nb = m.COLOR_WHITE, k = m.TESTSTR, E = m.graphics.getAngle, A = m.axisLabelAdder, T = m.falseFN, S = m.NumberFormatter, W = m.getLinkAction, da = m.getAxisLimits,
        ia = m.createDialog, ha = function (a, b) {
            return 0 < a ? ga(a) / ga(b || 10) : null
        }, Na = m.hasTouch = void 0 !== v.documentElement.ontouchstart, sa = m.fireEvent = function (a, b, c, d) {
            m.dem.fire(a, b, c, d)
        }, na = {1: "bold", 0: "normal"}, ra = {1: "italic", 0: "normal"}, Q = {1: "underline", 0: "none"}, Ra = {
            font: function (a, b) {
                b.style.fontFamily = a
            }, size: function (a, b) {
                a && (b.style.fontSize = fa(a) + Ca)
            }, color: function (a, b, c) {
                b.style.color = a && a.replace && a.replace(M, H) || p;
                c && (b.color = b.style.color)
            }, bgcolor: function (a, b) {
                b.style.backgroundColor = a && a.replace &&
                a.replace(M, H) || p
            }, bordercolor: function (a, b) {
                b.style.border = "1px solid";
                b.style.borderColor = a && a.replace && a.replace(M, H) || p
            }, ishtml: p, leftmargin: function (b, c) {
                c.style.marginLeft = a(b, 0) + Ca
            }, letterspacing: function (b, c) {
                c.style.letterSpacing = a(b, 0) + Ca
            }, bold: function (a, b) {
                b.style.fontWeight = na[a] || ""
            }, italic: function (a, b) {
                b.style.fontStyle = ra[a] || ""
            }, underline: function (a, b) {
                b.style.textDecoration = Q[a] || ""
            }
        }, wb = m.chartPaletteStr = {
            chart2D: {
                bgColor: "bgColor",
                bgAlpha: "bgAlpha",
                bgAngle: "bgAngle",
                bgRatio: "bgRatio",
                canvasBgColor: "canvasBgColor",
                canvasBaseColor: "canvasBaseColor",
                divLineColor: "divLineColor",
                legendBgColor: "legendBgColor",
                legendBorderColor: "legendBorderColor",
                toolTipbgColor: "toolTipbgColor",
                toolTipBorderColor: "toolTipBorderColor",
                baseFontColor: "baseFontColor",
                anchorBgColor: "anchorBgColor"
            }, chart3D: {
                bgColor: "bgColor3D",
                bgAlpha: "bgAlpha3D",
                bgAngle: "bgAngle3D",
                bgRatio: "bgRatio3D",
                canvasBgColor: "canvasBgColor3D",
                canvasBaseColor: "canvasBaseColor3D",
                divLineColor: "divLineColor3D",
                divLineAlpha: "divLineAlpha3D",
                legendBgColor: "legendBgColor3D",
                legendBorderColor: "legendBorderColor3D",
                toolTipbgColor: "toolTipbgColor3D",
                toolTipBorderColor: "toolTipBorderColor3D",
                baseFontColor: "baseFontColor3D",
                anchorBgColor: "anchorBgColor3D"
            }
        }, Wa = function () {
            var a = {}, b, c = function () {
                var k, f, e, g, h = 0, l, p, A = parseInt(d.core.options.resizeTrackingInterval, 10) || 300, m;
                for (k in a)h += 1, f = a[k], e = f.jsVars, l = f.ref, !f.disposed && (g = l && l.parentNode) && (p = l.style) && (/\%/g.test(p.width) || /\%/g.test(p.height)) ? (l = g.offsetWidth, m = g.offsetHeight, !e.resizeLocked &&
                (l && e._containerOffsetW !== l || m && e._containerOffsetH !== m) && (f.resizeTo && f.resizeTo(), e._containerOffsetW = l, e._containerOffsetH = m)) : (delete a[k], h -= 1);
                b = h ? setTimeout(c, A) : clearTimeout(b)
            };
            return function (k, f) {
                var e = k.jsVars, g = f || k.ref && k.ref.parentNode || {};
                e._containerOffsetW = g.parentNode.offsetWidth;
                e._containerOffsetH = g.parentNode.offsetHeight;
                a[k.id] = k;
                b || (b = setTimeout(c, parseInt(d.core.options.resizeTrackingInterval, 10) || 300))
            }
        }(), Fa = {
            getExternalInterfaceMethods: function () {
                var a = V[this.jsVars.type],
                    a = a && a.eiMethods, b = "saveAsImage,print,exportChart,getXML,hasRendered,signature,cancelExport,getSVGString,lockResize,showChartMessage,", c;
                if ("string" === typeof a)b += a + Da; else if (void 0 !== a || null !== a)for (c in a)b += c + Da;
                return b.substr(0, b.length - 1)
            }, drawOverlayButton: function (a) {
                var b = this.jsVars, c = b.overlayButton, k, f;
                if (a && a.show) {
                    c || (c = b.overlayButton = v.createElement("span"), m.dem.listen(c, "click", function () {
                        d.raiseEvent("OverlayButtonClick", a, b.fcObj)
                    }));
                    for (k = a.message ? a.message : "Back"; c.firstChild;)c.removeChild(c.firstChild);
                    c.appendChild(v.createTextNode(k));
                    b.overlayButtonMessage = k;
                    k = {
                        border: "1px solid " + (a.borderColor ? a.borderColor.replace(M, H) : "#7f8975"),
                        backgroundColor: a.bgColor ? a.bgColor.replace(M, H) : "#edefec",
                        fontFamily: a.font ? a.font : "Verdana,sans",
                        color: "#" + a.fontColor ? a.fontColor : "49563a",
                        fontSize: (a.fontSize ? a.fontSize : "10") + Ca,
                        padding: (a.padding ? a.padding : "3") + Ca,
                        fontWeight: 0 === parseInt(a.bold, 10) ? "normal" : "bold",
                        position: "absolute",
                        top: "0",
                        right: "0",
                        _cursor: "hand",
                        cursor: "pointer"
                    };
                    for (f in k)c.style[f] = k[f];
                    b.hcObj.container.appendChild(c);
                    b.overlayButtonActive = !0
                } else c && (b.overlayButton = c.parentNode.removeChild(c), b.overlayButtonActive = !1, delete b.overlayButtonMessage)
            }, print: function (a) {
                return this.jsVars.hcObj && this.jsVars.hcObj.hasRendered && this.jsVars.hcObj.print(a)
            }, exportChart: function (a) {
                var b = this.jsVars.hcObj;
                return b && b.options && b.options.exporting && b.options.exporting.enabled ? b.exportChart(a) : !1
            }, getSVGString: function () {
                return this.jsVars && this.jsVars.hcObj && this.jsVars.hcObj.paper && this.jsVars.hcObj.paper.toSVG()
            },
            resize: function () {
                var a = this.jsVars, b = a.container, c = a.hcObj;
                c && (c && c.destroy && c.destroy(), m.createChart(a.fcObj, b, a.type, void 0, void 0, !1, !0), delete a.isResizing)
            }, lockResize: function (a) {
                return "boolean" !== typeof a ? !!this.jsVars.resizeLocked : this.jsVars.resizeLocked = a
            }, showChartMessage: function (a, b, c) {
                var d = this.jsVars, f = d.hcObj, k = d.fcObj, e = k.options;
                d.msgStore[a] && (a = d.msgStore[a]);
                b && f && f.hasRendered ? a ? f.showMessage(a, c) : f.hideLoading() : (f && f.destroy && f.destroy(), k._chartMessageStyle = {
                    color: e.baseChartMessageColor,
                    fontFamily: e.baseChartMessageFont, fontSize: e.baseChartMessageFontSize
                }, m.createChart(d.fcObj, d.container, d.type, void 0, a));
                return a
            }, signature: function () {
                return "FusionCharts/3.4.0 (XT)"
            }
        }, gc = m.HCstub = function (b, c, d, k) {
            b = b.chart;
            var f = a(b.showborder, 1) ? a(b.borderthickness, 1) : 0, e = a(b.charttopmargin, k.charttopmargin, 15) + f, g = a(b.chartrightmargin, k.chartrightmargin, 15) + f, h = a(b.chartbottommargin, k.chartbottommargin, 15) + f, f = a(b.chartleftmargin, k.chartleftmargin, 15) + f, l = e + h, A = f + g;
            d *= .7;
            c *= .7;
            l > d && (e -= (l -
            d) * e / l, h -= (l - d) * h / l);
            A > c && (f -= (A - c) * f / A, g -= (A - c) * g / A);
            c = {
                _FCconf: {
                    0: {stack: {}},
                    1: {stack: {}},
                    x: {stack: {}},
                    oriCatTmp: [],
                    noWrap: !1,
                    marginLeftExtraSpace: 0,
                    marginRightExtraSpace: 0,
                    marginBottomExtraSpace: 0,
                    marginTopExtraSpace: 0,
                    marimekkoTotal: 0
                },
                chart: {
                    alignTicks: !1,
                    ignoreHiddenSeries: !1,
                    events: {},
                    reflow: !1,
                    spacingTop: e,
                    spacingRight: g,
                    spacingBottom: h,
                    spacingLeft: f,
                    marginTop: e,
                    marginRight: g,
                    marginBottom: h,
                    marginLeft: f,
                    borderRadius: 0,
                    plotBackgroundColor: "#FFFFFF",
                    style: {},
                    animation: a(b.defaultanimation, b.animation,
                        1) ? {duration: 500 * a(b.animationduration, 1)} : !1
                },
                colors: "AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "),
                credits: {href: m.CREDIT_HREF, text: m.CREDIT_STRING, enabled: vb},
                global: {},
                labels: {items: []},
                lang: {},
                legend: {
                    enabled: !0,
                    symbolWidth: 12,
                    borderRadius: 1,
                    backgroundColor: "#FFFFFF",
                    initialItemX: 0,
                    title: {text: p, x: 0, y: 0, padding: 2},
                    scroll: {},
                    itemStyle: {}
                },
                loading: {},
                plotOptions: {
                    series: {
                        pointPadding: 0,
                        borderColor: "#333333",
                        events: {},
                        animation: a(b.animation, b.defaultanimation, 1) ? {duration: 1E3 * a(b.animationduration, 1)} : !1,
                        states: {hover: {enabled: !1}, select: {enabled: !1}},
                        dataLabels: {
                            enabled: !0, color: "#555555", style: {}, formatter: function () {
                                return this.point.showPercentValues ? k.numberFormatter.percentValue(this.percentage) : this.point.displayValue
                            }
                        },
                        point: {events: {}}
                    },
                    area: {
                        states: {hover: {enabled: !1}},
                        marker: {lineWidth: 1, radius: 3, states: {hover: {enabled: !1}, select: {enabled: !1}}}
                    },
                    radar: {
                        states: {hover: {enabled: !1}},
                        marker: {lineWidth: 1, radius: 3, states: {hover: {enabled: !1}, select: {enabled: !1}}}
                    },
                    areaspline: {
                        states: {hover: {enabled: !1}},
                        marker: {lineWidth: 1, radius: 3, states: {hover: {enabled: !1}, select: {enabled: !1}}}
                    },
                    line: {
                        shadow: !0,
                        states: {hover: {enabled: !1}},
                        marker: {lineWidth: 1, radius: 3, states: {hover: {enabled: !1}, select: {enabled: !1}}}
                    },
                    scatter: {
                        states: {hover: {enabled: !1}},
                        marker: {lineWidth: 1, radius: 3, states: {hover: {enabled: !1}, select: {enabled: !1}}}
                    },
                    bubble: {
                        states: {hover: {enabled: !1}}, marker: {
                            lineWidth: 1, radius: 3,
                            states: {hover: {enabled: !1}, select: {enabled: !1}}
                        }
                    },
                    spline: {
                        states: {hover: {enabled: !1}},
                        marker: {lineWidth: 1, radius: 3, states: {hover: {enabled: !1}, select: {enabled: !1}}}
                    },
                    pie: {
                        size: "80%",
                        allowPointSelect: !0,
                        cursor: "pointer",
                        point: {
                            events: {
                                legendItemClick: b.interactivelegend === Ea ? T : function () {
                                    this.slice()
                                }
                            }
                        }
                    },
                    pie3d: {
                        size: "80%",
                        allowPointSelect: !0,
                        cursor: "pointer",
                        point: {
                            events: {
                                legendItemClick: b.interactivelegend === Ea ? T : function () {
                                    this.slice()
                                }
                            }
                        }
                    },
                    column: {},
                    floatedcolumn: {},
                    column3d: {},
                    bar: {},
                    bar3d: {}
                },
                point: {},
                series: [],
                subtitle: {text: p, style: {}},
                symbols: [],
                title: {text: p, style: {}},
                toolbar: {},
                tooltip: {style: {}},
                xAxis: {
                    steppedLabels: {style: {}},
                    labels: {x: 0, style: {}, enabled: !1},
                    lineWidth: 0,
                    plotLines: [],
                    plotBands: [],
                    title: {style: {}, text: p},
                    tickWidth: 0,
                    scroll: {enabled: !1}
                },
                yAxis: [{
                    startOnTick: !1,
                    endOnTick: !1,
                    title: {style: {}, text: p},
                    tickLength: 0,
                    labels: {x: 0, style: {}},
                    plotBands: [],
                    plotLines: []
                }, {
                    tickLength: 0,
                    gridLineWidth: 0,
                    startOnTick: !1,
                    endOnTick: !1,
                    title: {style: {}, text: p},
                    labels: {
                        x: 0, style: {}, enabled: !1,
                        formatter: function () {
                            return this.value !== sb ? this.value : p
                        }
                    },
                    opposite: !0,
                    plotBands: [],
                    plotLines: []
                }],
                exporting: {buttons: {exportButton: {}, printButton: {enabled: !1}}}
            };
            b.palettecolors && "string" === typeof b.palettecolors && (c.colors = b.palettecolors.split(/\s*\,\s*/));
            return k.hcJSON = c
        }, hb = m.placeVerticalAxis = function (b, c, d, e, f, g, h, l, A, m) {
            var E = d[z], q = E.smartLabel, n, s, t, T, S = 0, v = E.marginRightExtraSpace, w = E.marginLeftExtraSpace, W = {}, C = {}, da = {}, ha = b.plotLines, D = b.plotBands, E = c.verticalAxisValuesPadding, H = isNaN(c.fixedValuesPadding) ?
                0 : c.fixedValuesPadding, ia = E - H, na = c.verticalAxisValuesPadding, sa = c.verticalAxisNamePadding, Na = c.verticalAxisNameWidth, K = c.rotateVerticalAxisName && String(c.rotateVerticalAxisName).toLowerCase(), M = "none" !== K, Fa = b.offset ? b.offset : 0, J = 0, Wa = 0, N = 0, I = 0, ra = 0, Ja = 0, R = 0, wb, Q, P, L, E = 2, R = h ? v + 5 : w + 4, $ = U(a(d.chart.plotBorderWidth, 1), 0), ca = b.showLine ? b.lineThickness : $, hb = function (a, b) {
                var f, d;
                a && a.label && void 0 !== G(a.label.text) && (P = a.label, P.style && P.style !== Q && (Q = P.style, q.setStyle(Q)), n = q.getOriSize(a.label.text),
                    d = (f = n.width) ? f + 2 : 0, a.isGrid ? (W[b] = {
                    width: f,
                    height: n.height,
                    label: P
                }, I <= d && (I = d, c.lYLblIdx = b)) : a.isTrend && (h && P.textAlign === ya || P.textAlign === za ? (C[b] = {
                    width: f,
                    height: n.height,
                    label: P
                }, ra = U(ra, d)) : (da[b] = {width: f, height: n.height, label: P}, Ja = U(Ja, d))))
            }, aa = function (a, c) {
                var d, k = c ? S : S + a;
                d = b.title.style;
                s = s || {};
                if (0 < k)return M ? (k < s.height && (q.setStyle(d), s = q.getSmartText(b.title.text, f, k)), d = s.height) : (k < s.width && (q.setStyle(d), s = q.getSmartText(b.title.text, k, f)), d = s.width), b.title._actualWidth = d, b.title.text =
                    s.text, s.tooltext && (b.title.originalText = s.tooltext), c ? k - d + a : k - d;
                b.title.text = p;
                return 0
            }, Oa = function (a, b, c) {
                for (var f in a)a[f].label.x = b, a[f].label.y = c
            }, N = 0;
            for (wb = D.length; N < wb; N += 1)hb(D[N], N);
            N = 0;
            for (wb = ha.length; N < wb; N += 1)hb(ha[N], N);
            b.title && b.title.text != p && (Q = b.title.style, q.setStyle(Q), t = q.getOriSize(k).height, b.title._originalText = b.title.text, M ? (b.title.rotation = "cw" === K ? 90 : 270, s = q.getSmartText(b.title.text, f, g), S = s.height, T = t) : (b.title.rotation = 0, s = q.getSmartText(b.title.text, void 0 !==
            Na ? Na : g, f), S = s.width, T = 20));
            0 < Ja && (Wa = Ja + na);
            A && (e = a(e.chart.maxlabelwidthpercent, 0), 1 <= e && 100 >= e && (A = e * A / 100, I > A && (I = A)));
            J = U(ra, I);
            J += J ? ia + H : 0;
            0 < S && (J += S + sa + R);
            (function () {
                if (Wa + J > g) {
                    L = Wa + J - g;
                    if (Wa) {
                        if (na >= L) {
                            na -= L;
                            return
                        }
                        L -= na;
                        na = 0
                    }
                    if (ia + sa >= L)sa >= L ? sa -= L : (ia -= L - sa, sa = 0); else {
                        L -= ia + sa;
                        sa = ia = 0;
                        if (20 < Ja)if (ra > I) {
                            if (Ja - ra >= L) {
                                Ja -= L;
                                return
                            }
                            if (ra - Ja >= L) {
                                ra -= L;
                                return
                            }
                            ra > Ja ? (L -= ra - Ja, ra = Ja) : (L -= Ja - ra, Ja = ra);
                            if (2 * (ra - I) >= L) {
                                Ja -= L / 2;
                                ra -= L / 2;
                                return
                            }
                            L -= 2 * (ra - I);
                            Ja = ra = I
                        } else {
                            if (Ja - 20 >= L) {
                                Ja -= L;
                                return
                            }
                            L -= Ja -
                            20;
                            Ja = 20
                        }
                        if (ra > I) {
                            if (ra - I >= L) {
                                ra -= L;
                                return
                            }
                            L -= ra - I;
                            ra = I
                        }
                        S - T >= L ? S -= L : (L -= S - T, S = T, Ja >= L ? Ja = 0 : (L -= Ja, Ja = 0, S >= L ? S = 0 : (L -= S, S = 0, I >= L && (ra = I -= L))))
                    }
                }
            })();
            N = function (a, b) {
                var c, d = 0, r = b ? Ja - 2 : Ja + a - 2, k;
                if (0 < Ja) {
                    for (k in da)P = da[k].label, da[k].width > r ? (P.style && P.style !== Q && (Q = P.style, q.setStyle(Q)), c = q.getSmartText(P.text, r, f, !0), P.text = c.text, c.tooltext && (P.originalText = c.tooltext), da[k].height = c.height, d = U(d, c.width)) : d = U(d, da[k].width);
                    return b ? r - d + a : r - d
                }
                for (k in da)da[k].label.text = p;
                return 0
            }(0, !0);
            N = aa(N,
                !0);
            N = function (a) {
                var b = 0, c = U(I, ra) + a - 2, d;
                if (0 < c) {
                    for (d in W)P = W[d].label, W[d].width > c ? (P.style && P.style !== Q && (Q = P.style, q.setStyle(Q)), a = q.getSmartText(P.text, c, f, !0), P.text = a.text, a.tooltext && (P.originalText = a.tooltext), W[d].height = a.height, b = U(b, a.width)) : b = U(b, W[d].width);
                    for (d in C)P = C[d].label, C[d].width > c ? (P.style && P.style !== Q && (Q = P.style, q.setStyle(Q)), a = q.getSmartText(P.text, c, f, !0), P.text = a.text, a.tooltext && (P.originalText = a.tooltext), C[d].height = a.height, b = U(b, a.width)) : b = U(b, C[d].width);
                    return c - b
                }
                for (d in W)W[d].label.text = p;
                for (d in C)C[d].label.text = p;
                return 0
            }(N);
            N = aa(N);
            A = c.verticalAxisNamePadding - sa;
            N && A && (N > A ? (sa += A, N -= A) : (sa += N, N = 0));
            A = c.verticalAxisValuesPadding - (ia + H);
            N && A && (N > A ? (ia += A, N -= A) : (ia += N, N = 0));
            A = c.verticalAxisValuesPadding - na;
            N && A && (N > A ? (na += A, N -= A) : (na += N, N = 0));
            0 < Ja && (Wa = Ja + na);
            J = U(ra, I);
            J += J ? ia + H : 0;
            0 < S && (J += S + sa + R);
            A = U(ra, I);
            A += 0 < A ? ia + H : 0;
            0 < S ? (M ? S < s.height && (s = q.getSmartText(b.title.text, f, S)) : (S < s.width && (s = q.getSmartText(b.title.text, S, f)), b.title.y = -((s.height -
            t) / 2)), b.title.text = s.text, s.tooltext && (b.title.originalText = s.tooltext), b.title.margin = A + sa + R + (M ? S - t : S / 2)) : b.title.text = p;
            t = -(ia + H + Fa + w + 2);
            v = v + na + Fa + 2;
            R = U(ra, I);
            b.labels.style && (E = .35 * parseInt(b.labels.style.fontSize, 10));
            h ? (0 < Ja && Oa(da, t, E), 0 < R && (Oa(W, v, E), Oa(C, v, E))) : (0 < Ja && Oa(da, v, E), 0 < R && (Oa(W, t, E), Oa(C, t, E)));
            b.labels._textY = E;
            b.labels._righttX = v;
            b.labels._leftX = t;
            J = J || ca;
            Wa = Wa || (l ? 0 : $);
            m ? (d.chart.marginLeft += h ? Wa : J - m, d.chart.marginRight += h ? J - m : Wa) : (d.chart.marginLeft += h ? Wa : J, d.chart.marginRight +=
                h ? J : Wa);
            return Wa + J
        }, ib = m.titleSpaceManager = function (b, c, d, k) {
            var f = this.snapLiterals || (this.snapLiterals = {}), e = c.chart, g = N(e.caption);
            c = N(e.subcaption);
            var h = e = a(e.captionpadding, 10), l = b[z], A = this.smartLabel || l.smartLabel, m = !1, E = 0, q, n, s = 0, t = 0, T = 0, S = 0, v = b.title, w = b.subtitle, W = U(a(b.chart.plotBorderWidth, 1), 0), C = 0, da = 0;
            if (3 < k) {
                e < W && (e = W + 2);
                g !== p && (q = v.style, T = Ba(a(parseFloat(q.fontHeight, 10), parseFloat(q.lineHeight, 10), 12)));
                c !== p && (n = w.style, S = a(parseInt(n.fontHeight, 10), parseInt(n.lineHeight, 10),
                    12));
                if (0 < T || 0 < S)k = U(k, 0), E = T + S + e, E > k ? (s = k - E, m = !0, s < e ? e = U(s, 5) : (s -= e, e = 0, S > s ? (t = S - s + 10, S = 0, w._originalText = w.text, w.text = "") : (s -= S, S = 0, T > s && (t = T - s)))) : t = k - E, 0 < T && (A.setStyle(q), T += t, k = A.getSmartText(g, d, T), t = T - k.height, v.height = T = k.height, v.text = k.text, k.tooltext && (v.originalText = k.tooltext), C = k.width), 0 < S && (A.setStyle(n), S += t, d = A.getSmartText(c, d, S), t = S - d.height, S = d.height, w.text = d.text, w.height = d.height, d.tooltext && (w.originalText = d.tooltext), da = d.width), m && 0 < t && (e += $(h - e, t)), E = T + S + e;
                E = E || W;
                v.isOnTop ?
                    (f.captionstarty = b.chart.marginTop, b.chart.marginTop += E) : (b.chart.marginBottom += E, f.captionstarty = v.y = l.height - b.chart.marginBottom + e, b.chart.marginTop += 5, E += 5);
                v._captionWidth = C;
                w._subCaptionWidth = da;
                v._lineHeight = T;
                w._lineHeight = S
            } else w && (w.text = ""), v && (v.text = "");
            return E
        }, mb = m.stepYAxisNames = function (a, b, c, d, f, k) {
            var e = 0, g = d.plotLines, h = [], l, A = d.plotLines.length;
            b = b[z].smartLabel;
            for (var m = parseFloat(fa(c.basefontsize, 10)), E; e < A; e += 1)c = g[e], c.isGrid && c.label && c.label.text && (h.push(c), 0 === c.value &&
            (l = h.length - 1));
            if (A = h.length)if (d.labels.style ? b.setStyle(d.labels.style) : h[0].label && h[0].label.style && b.setStyle(d.labels.style), e = b.getOriSize("W").height, k || (e += .4 * m), a /= A - 1, a < e) {
                k = U(1, Ba(e / a));
                for (e = a = l; e < A; e += 1)c = h[e], e === f && ((e - a) % k && E && (E.label.text = ""), a = f), c && c.label && ((e - a) % k ? c.label.text = p : E = c);
                for (e = a = l; 0 <= e; e -= 1)c = h[e], e === f && ((a - e) % k && E && (E.label.text = ""), a = f), c && c.label && ((a - e) % k ? c.label.text = p : E = c)
            }
        }, Ja = m.placeHorizontalAxis = function (b, c, d, k, f, e, g) {
            var h = d[z], l = k && k.chart || {}, A,
                m, E, q, n, s, t, T, S, v, w, W, C = 0, da = 0, ha = 10, D = 1, ia = 0, H = 0, na = 0, sa = 0, J = !1, Na = !1, M = !1, K = a(l.labelstep, 0), N = a(l.xaxisminlabelwidth, 0), Fa = a(l.maxlabelheight, e), ra = c.labelDisplay, Wa = c.rotateLabels, I = c.horizontalLabelPadding, Ja = h.marginBottomExtraSpace, L = d.chart.marginLeft, P = d.chart.marginRight, Q = h.smartLabel, R = h.plotBorderThickness, wb = c.catCount, hb = c.slantLabels, ca = f / (b.max - b.min), Oa = 0, aa = 0, gc = 0, mb = 0, Zb = k && k.chart || {}, Sb = 1E3 * a(Zb.updateinterval, Zb.refreshinterval), Kb = Zb.datastreamurl, hc = Boolean(this.realtimeEnabled &&
                Sb && void 0 !== Kb), V, Nb, Y, ja, Z, jb, ba, fa, ma, Ob, ea, ta, ga, xa, Aa, oa, Ya, Ra, ab, Da, Ca, Ga, Ea, Xa, kb, Ka = null, Jb = null, Ia, Yb, ib, Qb, Rb, dc, rc, nc, Tb, wa, Lb, db, Ha = [], Mb = [], lb, Ab = 0, Bb = 0, Ub, fc, rb, ec, jc, $a, cb, kc = c.horizontalAxisNamePadding, xb = 0, Ua = c.staggerLines, Gb = Oa, sb = !1, nb = !1, vb = 0, lc, uc, yb, Fb, md, Rc, nd, Wc, Xc, Cc, Sc, Yc, oc, Kc, Tc, Ec, Zc, Lc, Uc, yc;
            Lb = b.plotLines;
            ha = wa = 0;
            for (cb = Lb.length; wa < cb; wa += 1)(m = Lb[wa]) && m.label && !m.isTrend && ha < parseInt(m.label.style.lineHeight, 10) && (ha = parseInt(m.label.style.lineHeight, 10), s = m.label.style);
            if (s || b.labels.style)s = s || b.labels.style, Q.setStyle(s), T = Q.getOriSize("W"), ha = Q.lineHeight, t = T.width + 4, W = Q.getOriSize("WWW").width + 4;
            b.title && b.title.text != p && (s = b.title.style, Q.setStyle(s), H = Q.getOriSize("W").height, b.title.rotation = 0, q = Q.getSmartText(b.title.text, f, e), da = q.height);
            L != parseInt(l.chartleftmargin, 10) && (rc = !0);
            P != parseInt(l.chartrightmargin, 10) && (nc = !0);
            void 0 !== l.canvaspadding && "" !== l.canvaspadding && (nb = !0);
            Tb = f - g;
            switch (ra) {
                case "none":
                    J = M = !0;
                    Wa && (C = hb ? 300 : 270, T = ha, ha = t, t = T);
                    break;
                case "rotate":
                    C = hb ? 300 : 270;
                    T = ha;
                    ha = t;
                    t = T;
                    J = !0;
                    break;
                case "stagger":
                    Na = J = !0;
                    S = la((e - H) / ha);
                    S < Ua && (Ua = S);
                    break;
                default:
                    Wa && (C = hb ? 300 : 270, T = ha, ha = t, t = T)
            }
            h.isBar && (J = !0);
            wa = 0;
            Lb = b.plotLines;
            if (typeof d._FCconf.isXYPlot !== Za || h.isBar) {
                V = {};
                jb = Z = 0;
                Ob = ma = null;
                Ra = {};
                sb = !0;
                ca = f / (b.max - b.min);
                Fb = function (a, c, f) {
                    var k, e, u, g, F, h;
                    h = a.plotObj;
                    F = a.labelTextWidth;
                    F || (n = h.label, n.style && n.style !== s && (s = n.style, Q.setStyle(s)), F = Q.getOriSize(n.text).width + 4, a.oriWidth = F, F > Nb && (F = Nb), a.labelTextWidth = F, a.leftEdge = h.value *
                    ca - F / 2, a.rightEdge = h.value * ca + F / 2, f && (F = $(F, 2 * (m.value - b.min) * ca + d.chart.marginLeft), a.labelTextWidth = F));
                    if (typeof c !== Za) {
                        if (f = c.plotObj, n = f.label, n.style && n.style !== s && (s = n.style, Q.setStyle(s)), c.oriWidth ? u = c.oriWidth : (u = Q.getOriSize(n.text).width + 4, c.oriWidth = u), u > Nb && (u = Nb), c.labelTextWidth = u, c.leftEdge = f.value * ca - u / 2, c.rightEdge = f.value * ca + u / 2, k = h.value * ca, e = k + F / 2, g = f.value * ca, u = g - u / 2, u < e)if (k + t < g - t)e -= u, k = g - k, a.labelTextWidth = e > k ? $(F, k) : U(t, F - e / 2), c.labelTextWidth = 2 * (k - a.labelTextWidth / 2),
                            a.leftEdge = h.value * ca - a.labelTextWidth / 2, a.rightEdge = h.value * ca + a.labelTextWidth / 2, c.leftEdge = f.value * ca - c.labelTextWidth / 2, c.rightEdge = f.value * ca + c.labelTextWidth / 2; else return c.labelTextWidth = 0, f.label.text = p, !1
                    } else f && (F = $(F, 2 * (b.max - m.value) * ca + d.chart.marginRight), a.labelTextWidth = F, a.leftEdge = h.value * ca - F / 2, a.rightEdge = h.value * ca + F / 2);
                    a.nextCat = c;
                    return !0
                };
                Na ? Ua > fc ? Ua = fc : 2 > Ua && (Ua = 2) : Ua = 1;
                for (cb = Lb.length; wa < cb; wa += 1)(m = Lb[wa]) && m.label && typeof m.label.text !== Za && (m.isGrid ? (ja = {plotObj: m},
                m.isCat && (fa = wa % Ua, V[fa] || (V[fa] = []), ma ? (Ob = ja, V[fa].push(Ob)) : (Ob = ma = ja, V[fa].push(ma))), Ha.push(ja)) : m.isTrend && Mb.push({plotObj: m}));
                db = b.plotBands;
                wa = 0;
                for (cb = db.length; wa < cb; wa += 1)(m = db[wa]) && m.isTrend && m.label && typeof m.label.text !== Za && Mb.push({plotObj: m});
                if (Ha.length)if (!M && !C)if (h.distributedColumns)for (wa = 0, cb = Ha.length; wa < cb; wa += 1)oa = Ha[wa], Ya = wa % Ua, m = oa.plotObj, m.label && m.isCat && (0 <= wa - Ua ? (ta = Ha[wa - Ua], Ea = ta.plotObj.value * ca + ta.plotObj._weight * ca / 2) : (ta = null, Ea = b.min * ca - L), wa + Ua < cb ? (ea =
                    Ha[wa + Ua], Xa = ea.plotObj.value * ca - ea.plotObj._weight * ca / 2) : (ea = null, Xa = b.max * ca + P), n = m.label, n.style && n.style !== s && (s = n.style, Q.setStyle(s)), ga = m.value * ca, Xc = ga - m._weight * ca / 2, Wc = ga + m._weight * ca / 2, 1 < Ua ? (Da = Xc - Ea, Ca = Wc + Xa, kb = Wc - Xc + $(Da, Ca)) : kb = Wc - Xc, n = m.label, n.style && n.style !== s && Q.setStyle(n.style), kb < t && t < Q.getOriSize(n.text).width ? (m.label.text = p, oa.labelTextWidth = 0) : (oa.labelTextWidth = kb, A = Q.getSmartText(n.text, kb - 4, e, J), kb = A.width + 4, oa.labelTextWidth = kb, mb = U(mb, A.height))); else {
                    fc = Ha.length;
                    Ub =
                        Ha.length - 1;
                    (lb = (Ha[Ub].plotObj.value - Ha[0].plotObj.value) * ca) ? (Nb = .1 * lb, Y = U(.2 * lb, lb / fc)) : Y = Nb = f;
                    for (E in V)for (wa = 0, xa = V[E].length; wa < xa;) {
                        for (ba = wa + 1; !Fb(V[E][wa], V[E][ba]);)ba += 1;
                        wa = ba
                    }
                    ma && (jb = (ma.plotObj.value - b.min) * ca + L - ma.labelTextWidth / 2);
                    m = Ha[0].plotObj;
                    ma && m === ma.plotObj || (n = m.label, n.style && n.style !== s && (s = n.style, Q.setStyle(s)), w = Q.getOriSize(n.text).width + 4, ga = (m.value - b.min) * ca + L, ma && (Ia = jb - ga, w = Ia < w && Ia > t / 2 ? 2 * Ia : 0), Ha[0].labelTextWidth = w, 0 < w && (T = ga - w / 2), T < jb && (jb = T));
                    Ob && (w = Ob.labelTextWidth,
                        Z = (b.max - Ob.plotObj.value) * ca + P - w / 2);
                    m = Ha[Ub].plotObj;
                    Ob && m === Ob.plotObj || (n = m.label, n.style && n.style !== s && (s = n.style, Q.setStyle(s)), w = Q.getOriSize(n.text).width + 4, ga = (b.max - m.value) * ca + P, Ob && (Ia = ga - Z, w = Ia < w && Ia > t / 2 ? 2 * Ia : 0), Ha[Ub].labelTextWidth = w, 0 < w && (T = ga - w / 2), T < Z && (Z = T));
                    Ab = 0 > jb ? -jb : 0;
                    Bb = 0 > Z ? -Z : 0;
                    $a = Ab + Bb;
                    if (0 < $a)for (E in Tb > $a ? (Aa = (Aa = Bb * f / (Bb + f)) ? Aa + 4 : 0, d.chart.marginRight += Aa, f -= Aa, Aa = (Aa = Ab * f / (Ab + f)) ? Aa + 4 : 0, d.chart.marginLeft += Aa, f -= Aa, ca = f / (b.max - b.min)) : Ab < Bb ? Tb >= Bb && nc ? (Aa = (Aa = Bb * f / (Bb +
                    f)) ? Aa + 4 : 0, d.chart.marginRight += Aa, f -= Aa, ca = f / (b.max - b.min)) : rc && (Aa = (Aa = Ab * f / (Ab + f)) ? Aa + 4 : 0, d.chart.marginLeft += Aa, f -= Aa, ca = f / (b.max - b.min)) : Tb >= Ab && rc ? (Aa = (Aa = Ab * f / (Ab + f)) ? Aa + 4 : 0, d.chart.marginLeft += Aa, f -= Aa, ca = f / (b.max - b.min)) : nc && (Aa = (Aa = Bb * f / (Bb + f)) ? Aa + 4 : 0, d.chart.marginRight += Aa, f -= Aa, ca = f / (b.max - b.min)), P = d.chart.marginRight, L = d.chart.marginLeft, lb = (Ha[Ub].plotObj.value - Ha[0].plotObj.value) * ca, Nb = .1 * lb, Y = U(.2 * lb, lb / fc), V) {
                        wa = 0;
                        for (xa = V[E].length; wa < xa;) {
                            for (ba = wa + 1; !Fb(V[E][wa], V[E][ba], !0);)ba +=
                                1;
                            wa = ba
                        }
                        E += 1
                    }
                    wa = 0;
                    for (cb = Ha.length; wa < cb; wa += 1)if (oa = Ha[wa], Ya = wa % Ua, m = oa.plotObj, m.label)if (m.isCat)oa.labelTextWidth && (Ra[Ya] = oa); else {
                        ea = (ta = Ra[Ya]) ? ta.nextCat : V[Ya] ? V[Ya][0] : null;
                        ab = null;
                        if (wa >= Ua)for (Jb = wa - Ua, ab = Ha[Jb]; !ab.labelTextWidth;)if (Jb >= Ua)Jb -= Ua, ab = Ha[Jb]; else {
                            ab = null;
                            break
                        }
                        Ea = ab ? ab.rightEdge : b.min * ca - L;
                        Xa = ea ? ea.leftEdge : b.max * ca + P;
                        n = m.label;
                        n.style && n.style !== s && (s = n.style, Q.setStyle(s));
                        w = Q.getOriSize(n.text).width + 4;
                        dc = m.value * ca - w / 2;
                        if (h.isBar && wa == cb - 1 && ab)Ea > dc && (ab.plotObj.label.text =
                            p, ab.labelTextWidth = 0, Ea = ab.leftEdge); else if (Ea > dc || Xa < dc + w) {
                            m.label.text = p;
                            oa.labelTextWidth = 0;
                            continue
                        }
                        Ea = U(Ea, dc);
                        ga = m.value * ca;
                        kb = 2 * $(ga - Ea, Xa - ga);
                        kb.toFixed && (kb = kb.toFixed(2));
                        n = m.label;
                        n.style && n.style !== s && Q.setStyle(n.style);
                        kb < t && t < Q.getOriSize(n.text).width ? (m.label.text = p, oa.labelTextWidth = 0) : (oa.labelTextWidth = kb, A = Q.getSmartText(n.text, kb - 4, e, J), kb = A.width + 4, oa.labelTextWidth = kb, oa.leftEdge = ga - kb / 2, oa.rightEdge = ga + kb / 2, mb = U(mb, A.height))
                    }
                    ab = Ga = null;
                    wa = 0;
                    for (cb = Ha.length; wa < cb; wa += 1)if (oa =
                            Ha[wa], m = oa.plotObj, Ya = wa % Ua, m.isCat && oa.labelTextWidth) {
                        ab = Ga = null;
                        ga = m.value * ca;
                        if (wa >= Ua)for (Jb = wa - Ua, ab = Ha[Jb]; !ab.labelTextWidth;)if (Jb > Ua)Jb -= Ua, ab = Ha[Jb]; else {
                            ab = null;
                            break
                        }
                        Da = ab ? ga - ab.rightEdge : ga - b.min * ca + d.chart.marginLeft;
                        if (wa + Ua < cb)for (Ka = wa + Ua, Ga = Ha[Ka]; !Ga.labelTextWidth;)if (Ka + Ua < cb - 1)Ka += Ua, Ga = Ha[Ka]; else {
                            Ga = null;
                            break
                        }
                        Ca = Ga ? Ga.leftEdge - ga : b.max * ca + d.chart.marginRight - ga;
                        kb = 2 * $(Da, Ca);
                        kb > Y && (kb = Y);
                        kb > oa.oriWidth && (kb = oa.oriWidth);
                        oa.labelTextWidth = kb;
                        n = m.label;
                        n.style && n.style !==
                        s && Q.setStyle(n.style);
                        A = Q.getSmartText(n.text, kb - 4, e, J);
                        oa.labelTextWidth = A.width + 4;
                        mb = U(mb, A.height);
                        oa.rightEdge = ga + oa.labelTextWidth / 2
                    }
                } else if (C)for (wa = 0, cb = Ha.length; wa < cb; wa += 1)if ((m = Ha[wa].plotObj) && m.label && m.label.text) {
                    n = m.label;
                    n.style && n.style !== s && (s = n.style, Q.setStyle(s));
                    E = 1;
                    if (wa + E < cb)for (Cc = Ha[E + wa].plotObj; Cc && (Cc.value - m.value) * ca < t;)if (m.isCat) {
                        if (Cc.label) {
                            Cc.label.text = p;
                            E += 1;
                            if (E + wa >= cb - 1)break;
                            Cc = Lb[E + wa].plotObj
                        }
                    } else if (Cc.isCat) {
                        m.label.text = p;
                        m = Cc;
                        wa += E - 1;
                        n = m.label;
                        n.style &&
                        n.style !== s && (s = n.style, Q.setStyle(s));
                        break
                    }
                    gc = U(gc, Q.getOriSize(n.text).width + 4)
                }
                E = 0;
                for (cb = Mb.length; E < cb; E += 1)(m = Mb[E].plotObj) && m.label && void 0 !== G(m.label.text) && (n = m.label, n.style && n.style !== s && (s = n.style, Q.setStyle(s)), A = Q.getOriSize(n.text), n.verticalAlign === qa ? Oa = U(Oa, A.height) : aa = U(aa, A.height))
            } else {
                for (cb = Lb.length; wa < cb; wa += 1)(m = Lb[wa]) && (m.isGrid ? Ha.push(m) : m.isTrend && Mb.push(m));
                db = b.plotBands;
                wa = 0;
                for (cb = db.length; wa < cb; wa += 1)(m = db[wa]) && Mb.push(m);
                Ub = Ha.length - 1;
                fc = Ha.length;
                Na &&
                (Ua > fc ? Ua = fc : 2 > Ua && (Ua = 2));
                if (fc)for (b.scroll && b.scroll.viewPortMin && b.scroll.viewPortMax ? (Qb = b.scroll.viewPortMin, Rb = b.scroll.viewPortMax, nc = rc = !1) : (Qb = b.min, Rb = b.max), lb = (Ha[Ub].value - Ha[0].value) * ca, rb = md = lb / (wb - 1), ec = (Ha[0].value - Qb) * ca, jc = (Rb - Ha[Ub].value) * ca, "auto" === ra ? rb < W && (C = hb ? 300 : 270, T = ha, ha = t, t = T, J = !0) : "stagger" === ra && (rb *= Ua), "line" !== this.defaultSeriesType && ("area" === this.defaultSeriesType ? h.drawFullAreaBorder && (R > ec && (Qb = b.min -= R / (2 * ca), ec += (Ha[0].value - Qb) * ca), R > jc && (Rb = b.max += R /
                (2 * ca), jc += (Rb - Ha[Ub].value) * ca)) : (R > ec && (Qb = b.min -= R / (2 * ca), ec += (Ha[0].value - Qb) * ca), R > jc && (Rb = b.max += R / (2 * ca), jc += (Rb - Ha[Ub].value) * ca))), t < N && (t = N), D = Na || M ? U(1, K) : U(1, K, Ba(t / rb)), h.x && (h.x.stepValue = D), rb *= D, v = 2 * (ec + L), (n = Lb[0].label) && n.text && (n.style && Q.setStyle(n.style), w = 270 === C ? $(rb, Q.getOriSize(n.text).height + 4) : $(rb, Q.getOriSize(n.text).width + 4), w > v && (M || (Ab = (w - v) / 2), rc || (nb && (Ab = 0), rb -= Ab / (wb - 1), yb = rb * (wb - 1), ca = rb, lc = (lb - yb) / ca, Rb = b.max += lc, Qb = b.min -= lc, Ab = 0, lb = yb, ec = (Ha[0].value - Qb) * ca,
                    jc = (Rb - Ha[Ub].value) * ca))), v = 2 * (jc + P), (n = Lb[Ub].label) && n.text && (n.style && Q.setStyle(n.style), w = 270 === C ? $(rb, Q.getOriSize(n.text).height + 4) : $(rb, Q.getOriSize(n.text).width + 4), w > v && (M || (Bb = (w - v) / 2), nc || (nb && (Bb = 0), rb -= Bb / (wb - 1), yb = rb * (wb - 1), ca = rb, lc = (lb - yb) / ca, Bb = 0, lb = yb, ec = (Ha[0].value - Qb) * ca, jc = (Rb - Ha[Ub].value) * ca))), $a = Ab + Bb, 0 < $a && (Tb > $a ? (Aa = (Aa = Bb * f / (Bb + f)) ? Aa + 4 : 0, d.chart.marginRight += Aa, f -= Aa, Aa = (Aa = Ab * f / (Ab + f)) ? Aa + 4 : 0, d.chart.marginLeft += Aa, f -= Aa, ca = f / (b.max - b.min)) : Ab < Bb ? Tb >= Bb && nc ? (Aa = (Aa =
                    Bb * f / (Bb + f)) ? Aa + 4 : 0, d.chart.marginRight += Aa, f -= Aa, ca = f / (b.max - b.min)) : rc && (Aa = (Aa = Ab * f / (Ab + f)) ? Aa + 4 : 0, d.chart.marginLeft += Aa, f -= Aa, ca = f / (b.max - b.min)) : Tb >= Ab && rc ? (Aa = (Aa = Ab * f / (Ab + f)) ? Aa + 4 : 0, d.chart.marginLeft += Aa, f -= Aa, ca = f / (b.max - b.min)) : nc && (Aa = (Aa = Bb * f / (Bb + f)) ? Aa + 4 : 0, d.chart.marginRight += Aa, f -= Aa, ca = f / (b.max - b.min)), lb = (Ha[Ub].value - Ha[0].value) * ca, rb = lb / (wb - 1), Na && (rb *= Ua), D = Na || M ? U(1, K) : C ? U(1, K, Ba(ha / rb)) : U(1, K, Ba(t / rb)), h.x && (h.x.stepValue = D), rb *= D), E = 0; E < fc; E += 1) {
                    m = Ha[E];
                    if (E % D && m.label) {
                        if (m.stepped = !0, m.label.style = b.steppedLabels.style, !hc)continue
                    } else m.stepped = !1;
                    m && m.label && void 0 !== G(m.label.text) && (n = m.label, n.style && n.style !== s && (s = n.style, Q.setStyle(s)), C && M ? (A = Q.getOriSize(n.text), gc = U(gc, A.width + 4), mb = U(mb, A.height)) : M || (A = C || Na ? Q.getOriSize(n.text) : Q.getSmartText(n.text, rb - 4, e, J), gc = U(gc, A.width + 4), mb = U(mb, A.height)))
                }
                E = 0;
                for (cb = Mb.length; E < cb; E += 1)(m = Mb[E]) && m.label && void 0 !== G(m.label.text) && (n = m.label, n.style && n.style !== s && (s = n.style, Q.setStyle(s)), A = Q.getOriSize(n.text), n.verticalAlign ===
                qa ? Oa = U(Oa, A.height) : aa = U(aa, A.height));
                b.scroll && b.scroll.enabled && !C && !M && (lc = gc / 2, d.chart.marginLeft < lc && (uc = lc - d.chart.marginLeft, Tb > uc && (f -= uc, Tb -= uc, d.chart.marginLeft += uc)), d.chart.marginRight < lc && (uc = lc - d.chart.marginRight, Tb > uc && (f -= uc, Tb -= uc, d.chart.marginRight += uc)))
            }
            M ? (xb = ha, C && (xb = gc)) : xb = C ? gc : Na ? Ua * mb : mb;
            0 < xb && (xb + I > Fa && (xb = Fa - I, Ua = Math.floor(xb / mb)), Gb += I + xb);
            0 < da && (Gb += da + kc);
            Yb = I - 4;
            ib = aa + Gb + 2;
            T = 0;
            ib > e && (Ia = ib - e, kc > Ia ? (kc -= Ia, Ia = 0) : (Ia -= kc, kc = 0, Yb > Ia ? (Yb -= Ia, Ia = 0) : (Ia -= Yb, Yb = 0), I =
                Yb + 4), aa > Ia ? (aa -= Ia, Ia = 0) : (0 < aa && (Ia -= aa, aa = 0), 0 < Ia && (Oa > Ia ? (Oa -= Ia, Ia = 0) : (0 < Oa && (Ia -= Oa, Oa = 0), 0 < Ia && ((T = da - H) > Ia ? (da -= Ia, Ia = 0) : (Ia -= T, da = H, 0 < Ia && ((T = xb - ha) > Ia ? (xb -= Ia, Ia = 0) : (Ia -= T, xb = ha, 0 < Ia && (Ia -= da + kc, da = 0, 0 < Ia && (Ia -= xb, xb = 0, 0 < Ia && (I -= Ia)))))))))));
            I += Ja;
            Sc = h.is3d ? -d.chart.xDepth : 0;
            Yc = xb + I;
            Ec = Sc;
            Zc = .5 * ha;
            ia = ha + I;
            cb = Ha.length;
            na = 0;
            if (sb)if (C)for (yc = za, oc = hb ? I + 8 : I + 4, cb = Ha.length, E = 0; E < cb; E += 1)(m = Ha[E].plotObj) && m.label && void 0 !== G(m.label.text) && (n = m.label, n.style && n.style !== s && (s = n.style, Q.setStyle(s)),
                wa = 1, A = Q.getSmartText(n.text, xb - 4, t, J), n.text = A.text, A.tooltext && (n.originalText = A.tooltext), Ec = Sc + Zc / 2, n.y = oc, n.x = Ec, n.rotation = C, n.textAlign = yc, na += 1); else for (Kc = xb, yc = Pa, oc = ia, E = 0; E < cb; E += D)m = Ha[E].plotObj, ha = parseInt(m.label.style.lineHeight, 10), m && m.label && void 0 !== G(m.label.text) && (n = m.label, n.style && n.style !== s && (s = n.style, Q.setStyle(s)), M || (A = Q.getSmartText(n.text, Ha[E].labelTextWidth - 4, Kc, J), n.text = A.text, A.tooltext && (n.originalText = A.tooltext), Na && (oc = ia + na % Ua * ha)), n.y = oc, n.x = Ec, n.rotation =
                C, n.textAlign = yc, na += 1); else {
                C ? (Kc = rb, Tc = xb - 4, yc = za, oc = hb ? I + 8 : I + 4) : Na ? (Tc = rb - 4, yc = Pa) : (Kc = xb, Tc = rb - 4, yc = Pa, oc = ia);
                for (E = 0; E < cb; E += D)m = Ha[E], ha = Ba(parseFloat(m.label.style.lineHeight)), Zc = .5 * ha, ia = ha + I, m && m.label && void 0 !== G(m.label.text) && (n = m.label, n.style && n.style !== s && (s = n.style, Q.setStyle(s)), M || (Na && (Kc = ha), Rc = L + (E - Qb) * md - d.chart.spacingLeft, nd = 300 === C ? $(pa(2.999 * Rc * Rc + Rc * Rc) - I, Tc) : Tc, A = Q.getSmartText(n.text, nd, Kc, J), vb = U(vb, C ? A.width : A.height), n.text = A.text, A.tooltext && (n.originalText = A.tooltext),
                Na && (oc = ia + na % Ua * ha)), C ? Ec = Sc + .5 * ha : Na || (oc = ha + I), n.y = oc, n.x = Ec, n.rotation = C, n.textAlign = yc, na += 1);
                300 === C && (xb = vb, Yc = xb + I);
                c._labelY = ia;
                c._labelX = Sc;
                c._yShipment = oc;
                c._isStagger = Na;
                c._rotation = C;
                c._textAlign = yc;
                c._adjustedPx = Zc;
                c._staggerLines = Ua;
                c._labelHeight = ha
            }
            cb = Mb.length;
            for (E = Uc = Lc = 0; E < cb; E += 1)(m = Mb[E].plotObj ? Mb[E].plotObj : Mb[E]) && m.label && void 0 !== G(m.label.text) && (n = m.label, n.style && n.style !== s && (s = n.style, Q.setStyle(s)), n.verticalAlign === qa ? (A = Q.getSmartText(n.text, f, Oa, !0), Uc = U(Uc, A.height),
                n.text = A.text, A.tooltext && (n.originalText = A.tooltext), n.y = Yc + Q.getOriSize(n.text).height, n.x = Ec) : (A = Q.getSmartText(n.text, f, aa, !0), Lc = U(Lc, A.height), n.text = A.text, A.tooltext && (n.originalText = A.tooltext), n.y = -(aa - Q.getOriSize("W").height + I + 2)));
            0 < da && (Q.setStyle(b.title.style), q = Q.getSmartText(b.title.text, f, da), b.title.text = q.text, q.tooltext && (b.title.originalText = q.tooltext), b.title.margin = Yc + Uc + kc);
            Gb = Uc;
            0 < xb && (h.horizontalAxisHeight = I + xb - Ja, Gb += h.horizontalAxisHeight);
            0 < da && (Gb += sa = da + kc);
            Gb = Gb ||
            I - Ja;
            d.chart.marginBottom += Gb;
            0 < Lc && (d.chart.marginTop += Lc, Gb += Lc);
            if (b.opposite)for (b.title.margin -= xb - (q && q.height || 0) + I, Gb -= sa, d.chart.marginTop += Gb, d.chart.marginBottom -= Gb, d.xAxis.opposite = 1, cb = Lb.length, wa = 0; wa < cb; wa += 1)(m = Lb[wa]) && m.isGrid && (n = m.label) && void 0 !== n.text && (n.textAlign = ya, n.y -= oc + I + 4);
            return Gb
        }, Zb = m.configureLegendOptions = function (c, d, k, e, f) {
            e = c.legend;
            var g = c.chart, h = g.is3D ? wb.chart3D : wb.chart2D, A = g.useRoundEdges, m = a(d.legendiconscale, 1), n = (parseInt(e.itemStyle.fontSize, 10) ||
                10) + 1, E = this.colorManager, q;
            if (0 >= m || 5 < m)m = 1;
            e.padding = 4;
            0 >= n && (n = 1);
            q = 3 * m;
            n = $(n * m, f - 8);
            0 >= n && (q = n = 0);
            e.symbolWidth = n;
            e.symbolPadding = q;
            e.textPadding = 4;
            e.legendHeight = f = n + 2 * q;
            e.rowHeight = U(parseInt(e.itemStyle.lineHeight, 10) || 12, f);
            k ? (e.align = za, e.verticalAlign = "middle", e.layout = "vertical") : e.x = (g.marginLeft - g.spacingLeft - g.marginRight + g.spacingRight) / 2;
            k = b(d.legendbordercolor, E.getColor(h.legendBorderColor));
            f = a(d.legendborderalpha, 100);
            g = a(d.legendbgalpha, 100);
            e.backgroundColor = C(b(d.legendbgcolor,
                E.getColor(h.legendBgColor)), g);
            e.borderColor = C(k, f);
            e.borderWidth = a(d.legendborderthickness, !A || d.legendbordercolor ? 1 : 0);
            e.shadow = Boolean(a(d.legendshadow, 1));
            e.symbol3DLighting = Boolean(a(d.use3dlighting, d.useplotgradientcolor, 1));
            e.shadow && (e.shadow = {enabled: e.shadow, opacity: U(f, g) / 100});
            e.reversed = Boolean(a(d.reverselegend, 0) - a(this.reverseLegend, 0));
            e.style = {padding: 4};
            Boolean(a(d.interactivelegend, 1)) ? e.symbolStyle = {
                _cursor: "hand",
                cursor: "pointer"
            } : (c.legend.interactiveLegend = !1, e.itemStyle.cursor =
                "default", e.itemHoverStyle = {cursor: "inherit"});
            e.borderRadius = a(d.legendborderradius, A ? 3 : 0);
            e.legendAllowDrag = Boolean(a(d.legendallowdrag, 0));
            e.title.text = N(l(d.legendcaption, p));
            e.legendScrollBgColor = L(b(d.legendscrollbgcolor, d.scrollcolor, E.getColor("altHGridColor")));
            e.legendScrollBarColor = b(d.legendscrollbarcolor, k);
            e.legendScrollBtnColor = b(d.legendscrollbtncolor, k)
        }, Oa = m.placeLegendBlockRight = function (b, c, d, e, f) {
            this.configureLegendOptions(b, c.chart, !0, f, d);
            var k = this.snapLiterals || (this.snapLiterals =
                {}), g = 0, h = b.series, l, A = b[z], m = this.smartLabel || A.smartLabel, n = b.chart.spacingRight, E = b.legend, q, s = E.textPadding, t = E.title.padding, T = E.symbolWidth, S = E.symbolPadding, v = T + 2 * S, w = 2 * e, C = 0, W = a(c.chart.legendpadding, 7);
            c = W + E.borderWidth / 2 + a(c.chart.canvasborderthickness, 1);
            var da = 2 * E.padding, ha = da, D = !1, ia = [];
            d -= da + W;
            f && (h = h && h[0] && h[0].data);
            if (typeof h === Za || typeof h.length === Za)return 0;
            f = h.length;
            for (g = 0; g < f; g += 1)(l = h[g]) && !1 !== l.showInLegend && (l.__i = g, ia.push(l));
            ia.sort(function (a, b) {
                return a.legendIndex -
                b.legendIndex || a.__i - b.__i
            });
            f = ia.length;
            q = d - v - W - s;
            0 > q && (q = 0);
            m.setStyle(E.itemStyle);
            E.reversed && ia.reverse();
            for (g = 0; g < f; g += 1)l = ia[g], D = !0, l._legendX = 0, l._legendY = ha, 0 === q ? (ha += l._legendH = v, l.name = p, l._totalWidth = T + S) : (h = m.getSmartText(l.name, q, w), l.name = h.text, h.tooltext && (l.originalText = h.tooltext), h.height < v && (l._legendTestY = (v - h.height) / 2), l._totalWidth = T + S + s + h.width + W, ha += l._legendH = U(h.height, v), C = U(h.width, C));
            if (D)return E.itemWidth = C + v + W + s, E.width = E.itemWidth + da, E.title.text !== p && (m.setStyle(E.title.style),
                h = m.getSmartText(E.title.text, d, w), E.title.text = h.text, h.tooltext && (E.title.originalText = h.tooltext), g = h.width + da, E.width < g && (E.initialItemX = (g - E.width) / 2, E.width = g), E.initialItemY = h.height + t, ha += E.initialItemY), E.height = E.totalHeight = ha, E.height > e && (E.height = e, E.scroll.enabled = !0, E.scroll.flatScrollBars = A.flatScrollBars, E.scroll.scrollBar3DLighting = A.scrollBar3DLighting, E.width += (E.scroll.scrollBarWidth = 10) + (E.scroll.scrollBarPadding = 2)), k.legendstartx = A.width - n - E.width, k.legendwidth = E.width, k.legendendx =
                k.legendstartx + k.legendwidth, k.legendheight = E.height, c = $(E.width + c, d), b.chart.marginRight += c + W, c;
            E.enabled = !1;
            return 0
        }, ca = m.placeLegendBlockBottom = function (b, c, d, e, f) {
            this.configureLegendOptions(b, c.chart, !1, f, d);
            var g = this.snapLiterals || (this.snapLiterals = {}), h = 0, l = b.series, A = b[z], m = A.smartLabel || this.smartLabel, E = b.chart, n = E.spacingBottom, q = E.spacingLeft, E = E.spacingRight, s = b.legend, t, T = s.textPadding, S = s.title.padding, v, w = s.symbolWidth, W = s.symbolPadding, C = s.legendHeight, da = c.chart;
            v = 0;
            var ha = 2 *
                e, D = s.rowHeight, ia = .05 * D, H = [];
            t = a(da.minimisewrappinginlegend, 0);
            var da = a(parseInt(da.legendnumcolumns, 10), 0), na = 0, G = 0, J = 0, sa = h = 0, Na = s.padding, M = 2 * Na, Na = T + W + Na;
            c = a(c.chart.legendpadding, 7) + s.borderWidth / 2 + 1;
            var K = M, I = !1, Q, N = [], Fa = !1, ra = 0, Wa = 0;
            0 > da && (da = 0);
            d -= M;
            m.setStyle(s.itemStyle);
            h = m.getOriSize(k).height;
            c = $(c, e - h - 8);
            e -= c;
            f && (l = l && l[0] && l[0].data);
            if (typeof l === Za || typeof l.length === Za)return 0;
            f = l.length;
            for (h = 0; h < f; h += 1)(Q = l[h]) && !1 !== Q.showInLegend && (Q.__i = h, N.push(Q));
            N.sort(function (a, b) {
                return a.legendIndex -
                b.legendIndex || a.__i - b.__i
            });
            f = N.length;
            m.setStyle(s.itemStyle);
            for (h = 0; h < f; h += 1)I = !0, l = m.getOriSize(N[h].name), na = U(na, l.width), G += l.width, J += 1;
            h = G / J;
            C = C + ia + T + W + M;
            G += C * J;
            if (I) {
                h += C;
                na += C;
                0 < da && J < da && (da = J);
                G <= d && (0 >= da || da === J) ? (da = J, sa = h = G / J, Fa = !0) : 0 < da && (sa = d / da) > h ? sa > na && (sa = na) : d > na && (t || 1.5 * h > na) ? (da = la(d / na), J < da && (da = J), sa = na) : d >= 2 * h ? (da = la(d / h), J < da && (da = J), sa = la(d / da), sa > na && (sa = na)) : (da = 1, sa = d);
                s.itemWidth = sa;
                t = sa - C;
                0 > t && (W = t = T = 0);
                s.symbolPadding = W;
                s.textPadding = T;
                s.width = sa * da - ia;
                s.title.text !==
                p && (m.setStyle(s.title.style), l = m.getSmartText(s.title.text, d, ha), s.title.text = l.text, l.tooltext && (s.title.originalText = l.tooltext), v = l.width + M, s.width < v && (s.initialItemX = (v - s.width) / 2, s.width = v), s.initialItemY = v = l.height + S);
                m.setStyle(s.itemStyle);
                s.reversed && N.reverse();
                for (h = 0; h < f; h += 1) {
                    d = N[h];
                    0 === t && (H[ra] = !0, d.name = p, S = 1, T = parseInt(ra / da, 10), ia = ra % da, d._legendX = ia * sa, d._legendY = T * D + M, d._legendH = S * D, d._totalWidth = w + W);
                    if (Fa)l = m.getOriSize(d.name), l.height < D && (d._legendTestY = (D - l.height) / 2), d._legendX =
                        Wa, d._legendY = M, d._legendH = D, d._totalWidth = w + Na + l.width, Wa += l.width + C; else {
                        l = m.getSmartText(d.name, t, ha);
                        d.name = l.text;
                        for (l.tooltext && (d.originalText = l.tooltext); !0 === H[ra];)ra += 1;
                        T = l.height / D;
                        ia = ra;
                        for (S = 0; S < T; S += 1, ia += da)H[ia] = !0;
                        l.height < D && (d._legendTestY = (D - l.height) / 2);
                        T = parseInt(ra / da, 10);
                        ia = ra % da;
                        d._legendX = ia * sa;
                        d._legendY = T * D + M;
                        d._legendH = S * D;
                        d._totalWidth = w + Na + l.width
                    }
                    ra += 1
                }
                m = Fa ? 1 : Ba(H.length / da);
                s.height = s.totalHeight = K + (m * D + v);
                s.rowHeight = D;
                s.legendNumColumns = da;
                s.height > e && (s.height =
                    e, s.scroll.enabled = !0, s.scroll.flatScrollBars = A.flatScrollBars, s.scroll.scrollBar3DLighting = A.scrollBar3DLighting, s.width += (s.scroll.scrollBarWidth = 10) + (s.scroll.scrollBarPadding = 2));
                g.legendstartx = q + .5 * (A.width - q - E - s.width) + (s.x || 0);
                g.legendwidth = s.width;
                g.legendendx = g.legendstartx + g.legendwidth;
                g.legendstarty = A.height - n - s.height;
                g.legendheight = s.height;
                g.legendendy = g.legendstarty + g.legendheight;
                c += s.height;
                b.chart.marginBottom += c;
                return c
            }
            s.enabled = !1;
            return 0
        }, hc = function (a, b) {
            return a.value - b.value
        },
        Kb = function (a, b, c) {
            var d = b._originalText;
            a = a[z].smartLabel;
            b.text = b.rotation ? a.getSmartText(d, c, b._actualWidth).text : a.getSmartText(d, b._actualWidth, c).text;
            b.centerYAxisName = !0
        }, Sb = m.adjustVerticalAxisTitle = function (a, b, c) {
            if (b && b.text) {
                var d = b.text, f = a[z].smartLabel, e = 2 * $(a.chart.marginTop, a.chart.marginBottom) + c, k = c + a.chart.marginTop + a.chart.marginBottom;
                b.style && f.setStyle(b.style);
                d = f.getOriSize(d);
                void 0 === b.centerYAxisName && (b.centerYAxisName = !0);
                b.rotation ? d.width > e && (b.y = k / 2 - (c / 2 + a.chart.marginTop),
                    b.centerYAxisName = !1) : d.height > e && (b.y = (k / 2 - (c / 2 + a.chart.marginTop)) / 2, b.centerYAxisName = !1)
            }
        }, Nb = m.adjustVerticalCanvasMargin = function (b, c, d, e) {
            var f = c.chart, k = c = 0, g = 0, h = a(f.canvastopmargin, 0), f = a(f.canvasbottommargin, 0), l = h / (h + f), A = b.chart.marginTop, p = b.chart.marginBottom;
            f > p && (c += f - p);
            h > A && (c += h - A);
            c > d ? h > A && f > p ? (k = d * l, g = d * (1 - l)) : h > A ? k = d : g = d : 0 < c && (f > p && (g = f - p), h > A && (k = h - A));
            k && (b.chart.marginTop += k);
            g && (b.chart.marginBottom += g, e && e.title && (e.title.margin += g));
            return k + g
        }, jb = m.adjustHorizontalCanvasMargin =
            function (b, c, d, e, f) {
                var k = c.chart;
                c = a(k.canvasleftmargin, 0);
                var k = a(k.canvasrightmargin, 0), g = c / (c + k), h = 0, l = b.chart.marginLeft, A = b.chart.marginRight, p = 0, m = 0;
                c > l && (h += c - l);
                k > A && (h += k - A);
                h > d ? c > l && k > A ? (p = d * g, m = d * (1 - g)) : k > A ? m = d : p = d : 0 < h && (c > l && (p = c - l), k > A && (m = k - A));
                p && (b.chart.marginLeft += p, e && e.title && (e.title.margin += p));
                m && (b.chart.marginRight += m, f && f.title && (f.title.margin += m));
                return m + p
            }, Ob = function (a, b) {
            return a - b
        }, aa = m.getDataParser = {
            column: function (c, d, k) {
                var g = c[z], f = d.borderWidth;
                return function (h,
                                 l, A) {
                    var p = d.plotgradientcolor, m = d.is3d, E = d.isRoundEdges, n = d.plotBorderColor, s = b(h.color, d.color), q = b(h.ratio, d.ratio), T = t(d.plotBorderAlpha), z = a(h.dashed, d.dashed), S = b(h.dashlen, d.dashLen), v = b(h.dashgap, d.dashGap), w = d.use3DLighting, da = t(b(h.alpha, d.alpha)).toString(), C = {opacity: da / 100}, W = d.isBar, ha = d.fillAangle, D = 0 > A ? W ? 180 - ha : 360 - ha : ha, ha = ma(s + Da + p, da, q, D, E, n, $(da, T).toString(), W, m), ia = z ? e(S, v, f) : "none";
                    l = k.getPointStub(h, A, g.oriCatTmp[l], c, d, d.showValues, d.yAxis);
                    h = k.pointHoverOptions(h, d, {
                        plotType: "column",
                        is3d: m,
                        isBar: W,
                        use3DLighting: w,
                        isRoundEdged: E,
                        color: s,
                        gradientColor: p,
                        alpha: da,
                        ratio: q,
                        angle: D,
                        borderWidth: f,
                        borderColor: n,
                        borderAlpha: T,
                        borderDashed: z,
                        borderDashGap: v,
                        borderDashLen: S,
                        shadow: C
                    });
                    l.y = A;
                    l.shadow = C;
                    l.color = ha[0];
                    l.borderColor = ha[1];
                    l.borderWidth = f;
                    l.use3DLighting = w;
                    l.dashStyle = ia;
                    l.tooltipConstraint = k.tooltipConstraint;
                    l.hoverEffects = h.enabled && h.options;
                    l.rolloverProperties = h.enabled && h.rolloverOptions;
                    return l
                }
            }, line: function (c, d, k) {
                var g = c[z];
                return function (f, h, l) {
                    var A = a(f.alpha,
                        d.lineAlpha), p = {opacity: A / 100}, m = a(f.anchorsides, d.anchorSides, 0), E = a(f.anchorborderthickness, d.anchorBorderThickness, 1), n = L(b(f.anchorbordercolor, d.anchorBorderColor)), s = L(b(f.anchorbgcolor, d.anchorBgColor)), q = a(f.anchorstartangle, d.anchorStartAngle, 90), t = b(f.anchoralpha, d.anchorAlpha), T = b(f.anchorbgalpha, t), z = a(f.anchorradius, d.anchorRadius), S = Boolean(a(f.anchorshadow, d.anchorShadow, 0));
                    h = k.getPointStub(f, l, g.oriCatTmp[h], c, d, d.showValues, d.yAxis);
                    var v = b(f.anchorimageurl, d.imageUrl), w = b(f.anchorimagescale,
                        d.imageScale), da = b(f.anchorimagealpha, d.imageAlpha);
                    h.y = l;
                    h.shadow = p;
                    h.anchorShadow = d.anchorShadow;
                    h.dashStyle = a(f.dashed, d.lineDashed) ? e(d.lineDashLen, d.lineDashGap, d.lineThickness) : null;
                    h.color = {FCcolor: {color: L(b(f.color, d.lineColor)), alpha: A}};
                    h.valuePosition = b(f.valueposition, d.valuePosition);
                    l = k.pointHoverOptions(f, d, {
                        plotType: "anchor",
                        anchorBgColor: s,
                        anchorAlpha: t,
                        anchorBgAlpha: T,
                        anchorAngle: q,
                        anchorBorderThickness: E,
                        anchorBorderColor: n,
                        anchorBorderAlpha: t,
                        anchorSides: m,
                        anchorRadius: z,
                        imageUrl: v,
                        imageScale: w,
                        imageAlpha: da,
                        shadow: p
                    });
                    h.marker = {
                        enabled: void 0 === d.drawAnchors ? 0 !== A : !!d.drawAnchors,
                        shadow: S && {opacity: t / 100},
                        fillColor: {
                            FCcolor: {
                                color: L(b(f.anchorbgcolor, d.anchorBgColor)),
                                alpha: (b(f.anchorbgalpha, d.anchorBgAlpha) * t / 100).toString()
                            }
                        },
                        lineColor: {FCcolor: {color: L(b(f.anchorbordercolor, d.anchorBorderColor)), alpha: t}},
                        imageUrl: v,
                        imageScale: w,
                        imageAlpha: da,
                        lineWidth: a(f.anchorborderthickness, d.anchorBorderThickness),
                        radius: a(f.anchorradius, d.anchorRadius),
                        symbol: oa(a(f.anchorsides, d.anchorSides)),
                        startAngle: b(f.anchorstartangle, d.anchorAngle)
                    };
                    h.hoverEffects = l.enabled && l.options;
                    h.rolloverProperties = l.enabled && l.rolloverOptions;
                    return h
                }
            }, area: function (c, d, k) {
                var e = c[z];
                return function (f, g, h) {
                    var l = b(f.alpha, d.fillAlpha), A = {
                        opacity: U(l, d.lineAlpha) / 100,
                        inverted: !0
                    }, p = a(f.anchorsides, d.anchorSides, 0), m = a(f.anchorborderthickness, d.anchorBorderThickness, 1), E = L(b(f.anchorbordercolor, d.anchorBorderColor)), n = L(b(f.anchorbgcolor, d.anchorBgColor)), s = a(f.anchorstartangle, d.anchorStartAngle, 90), q = b(f.anchoralpha,
                        d.anchorAlpha), t = b(f.anchorbgalpha, q), T = a(f.anchorradius, d.anchorRadius), z = Boolean(a(f.anchorshadow, d.anchorShadow, 0));
                    g = k.getPointStub(f, h, e.oriCatTmp[g], c, d, d.showValues, d.yAxis);
                    var S = b(f.anchorimageurl, d.imageUrl), v = b(f.anchorimagescale, d.imageScale), w = b(f.anchorimagealpha, d.imageAlpha);
                    g.y = h;
                    g.shadow = A;
                    g.anchorShadow = d.anchorShadow;
                    g.color = {FCcolor: {color: L(b(f.color, d.fillColor)), alpha: l}};
                    g.valuePosition = b(f.valueposition, d.valuePosition);
                    h = k.pointHoverOptions(f, d, {
                        plotType: "anchor",
                        anchorBgColor: n,
                        anchorAlpha: q,
                        anchorBgAlpha: t,
                        anchorAngle: s,
                        anchorBorderThickness: m,
                        anchorBorderColor: E,
                        anchorBorderAlpha: q,
                        anchorSides: p,
                        anchorRadius: T,
                        imageUrl: S,
                        imageScale: v,
                        imageAlpha: w,
                        shadow: A
                    });
                    g.marker = {
                        enabled: d.drawAnchors,
                        shadow: z && {opacity: q / 100},
                        fillColor: {
                            FCcolor: {
                                color: L(b(f.anchorbgcolor, d.anchorBgColor)),
                                alpha: (b(f.anchorbgalpha, d.anchorBgAlpha) * q / 100).toString()
                            }
                        },
                        lineColor: {FCcolor: {color: L(b(f.anchorbordercolor, d.anchorBorderColor)), alpha: q}},
                        imageUrl: S,
                        imageScale: v,
                        imageAlpha: w,
                        lineWidth: a(f.anchorborderthickness,
                            d.anchorBorderThickness),
                        radius: T,
                        symbol: oa(a(f.anchorsides, d.anchorSides)),
                        startAngle: b(f.anchorstartangle, d.anchorAngle)
                    };
                    g.hoverEffects = h.enabled && h.options;
                    g.rolloverProperties = h.enabled && h.rolloverOptions;
                    g.events = {click: d.getLink};
                    return g
                }
            }
        };
    d.core.options.resizeTrackingInterval = 300;
    d.core.options.preventTrackResize = !1;
    m.createChart = function (a, b, c, k, f, e, g) {
        var h = a.jsVars, l, A, p = V[c || (c = a.chartType())], E, n = h.hasNativeMessage, s = a.options, q = a.args, t;
        t = function (f) {
            var e = {renderer: "javascript"},
                l = h.fcObj, A = l.width, s = l.height, q = p && p.eiMethods, t = h.overlayButton, T;
            b.jsVars = a.jsVars;
            h.container = b;
            h.hcObj = f;
            h.type = c;
            h.width = b.offsetWidth;
            h.height = b.offsetHeight;
            h.instanceAPI = E;
            if (f.hasRendered) {
                d.extend(b, Fa);
                if (q && "string" !== typeof q)for (T in q)b[T] = q[T];
                h.overlayButtonActive && t && (t.innerHTML = "", t.appendChild(v.createTextNode(h.overlayButtonMessage)), f.container.appendChild(t))
            }
            (/\%/g.test(A) || /\%/g.test(s)) && b && b.parentNode && !d.core.options.preventTrackResize && Wa(l, b);
            k && (k({
                success: f.hasRendered,
                ref: b, id: a.id
            }), f.hasRendered && (m.raiseEvent("loaded", {
                type: c,
                renderer: "javascript"
            }, a, [a.id]), n || (l.__state.firstRenderNotified = !0, setTimeout(function () {
                m.raiseEvent("rendered", {renderer: "javascript"}, l, [l.id])
            }, 0))));
            f.hasRendered && h.previousDrawCount < h.drawCount && (e.width = h.width, e.height = h.height, e.drawCount = h.drawCount, e.displayingMessage = n, e.renderer = l.options.renderer, m.raiseEvent("drawcomplete", e, l, [l.id]), n || g || setTimeout(function () {
                l.__state && !l.__state.firstRenderNotified && m.raiseEvent("rendered",
                    {renderer: "javascript"}, l, [l.id]);
                d.raiseEvent("renderComplete", e, l)
            }, 0))
        };
        h.instanceAPI && h.instanceAPI.dispose && h.instanceAPI.dispose();
        E = p ? new V(c) : new V("stub");
        E.chartInstance = a;
        E.origRenderWidth = a.__state.renderedWidth;
        E.origRenderHeight = a.__state.renderedHeight;
        void 0 !== f ? "string" === typeof f && (f = new ia(b, f, a), n = h.hasNativeMessage = !0) : !p || !p.init || p && "stub" === p.name ? (a._chartMessageStyle = {
            color: q.typeNotSupportedMessageColor || s.baseChartMessageColor,
            fontFamily: q.typeNotSupportedMessageFont ||
            s.baseChartMessageFont,
            fontSize: q.typeNotSupportedMessageFontSize || s.baseChartMessageFontSize
        }, f = new ia(b, s.typeNotSupportedMessage, a), n = h.hasNativeMessage = !0) : h.message ? (f = new ia(b, h.message, a), n = h.hasNativeMessage = !0) : h.loadError ? (a._chartMessageStyle = {
            color: q.dataLoadErrorMessageColor || s.baseChartMessageColor,
            fontFamily: q.dataLoadErrorMessageFont || s.baseChartMessageFont,
            fontSize: q.dataLoadErrorMessageFontSize || s.baseChartMessageFontSize
        }, f = new ia(b, s.dataLoadErrorMessage, a), n = h.hasNativeMessage = !0) : h.stallLoad ? (a._chartMessageStyle = {
            fontFamily: q.dataLoadStartMessageFont || s.baseChartMessageFont,
            fontSize: q.dataLoadStartMessageFontSize || s.baseChartMessageFontSize,
            color: q.dataLoadStartMessageColor || s.baseChartMessageColor
        }, f = new ia(b, s.dataLoadStartMessage, a), n = h.hasNativeMessage = !0) : (d.raiseEvent("internal.drawStart", {
            chartType: c,
            logicName: E.name,
            logicBase: E.base && E.base.name,
            defaultSeriesType: E.defaultSeriesType
        }, a), l = a.jsVars && a.jsVars.themeObject && a.jsVars.themeObject.getThemedJSONData() ||
        a.getChartData(d.dataFormats.JSON, !0), A = l.data, l.error instanceof Error ? (a._chartMessageStyle = {
            fontFamily: q.dataInvalidMessageFont || s.baseChartMessageFont,
            fontSize: q.dataInvalidMessageFontSize || s.baseChartMessageFontSize,
            color: q.dataInvalidMessageColor || s.baseChartMessageColor
        }, f = new ia(b, s.dataInvalidMessage, a), n = h.hasNativeMessage = !0, a.__state.dataReady = !1, g || d.raiseEvent("dataInvalid", {error: l.error}, h.fcObj, void 0, function () {
            m.raiseEvent("dataxmlinvalid", {}, a, [a.id])
        })) : (g || m.raiseEvent("dataloaded",
            {}, a, [a.id]), f = E.init(b, A, a, t), E.inited = !0, h.previousDrawCount = h.drawCount, h.drawCount += 1, 0 === f.series.length ? (a._chartMessageStyle = {
            fontFamily: q.dataEmptyMessageFont || s.baseChartMessageFont,
            fontSize: q.dataEmptyMessageFontSize || s.baseChartMessageFontSize,
            color: q.dataEmptyMessageColor || s.baseChartMessageColor
        }, f = new ia(b, s.dataEmptyMessage, a), n = h.hasNativeMessage = !0, a.__state.dataReady = !1, g || m.raiseEvent("nodatatodisplay", {}, a, [a.id])) : (a.__state.dataReady = !0, n = h.hasNativeMessage = !1, delete h.message)));
        f || (a._chartMessageStyle = {
            fontFamily: s.baseChartMessageFont,
            fontSize: s.baseChartMessageFontSize,
            color: s.baseChartMessageColor
        }, f = new ia(b, "Error rendering chart {0x01}", a), n = h.hasNativeMessage = !0);
        n && !E.inited && E.init(b, A, a, t);
        f.chart = f.chart || {};
        f.credits = f.credits || {};
        f.credits.enabled = p && !0 === p.creditLabel ? !0 : !1;
        !1 === e && (f.chart.animation = !1, f.plotOptions || (f.plotOptions = {}), f.plotOptions.series || (f.plotOptions.series = {}), f.plotOptions.series.animation = !1);
        b.style && (f.chart.containerBackgroundColor =
            m.getContainerBackgroundColor(a));
        return E.draw(f, t)
    };
    V("base", {
        useScaleRecursively: !0,
        tooltipConstraint: "chart",
        rendererId: "root",
        canvasPaddingModifiers: ["anchor", "anchorlabel"],
        drawAnnotations: !0,
        draw: function (a, b) {
            var c = this.renderer;
            c || (c = this.renderer = new V("renderer." + this.rendererId));
            this.updateDefaultAnnotations();
            return c.init(this, a, b)
        },
        init: function (b, c, d) {
            var e = this.chartInstance || d, f = e.jsVars;
            d = f._reflowData || (f._reflowData = {});
            var k = f._reflowClean, h = e.options, l = h.args, A, p;
            this.dataObj =
                c = g({}, c);
            p = c.chart = c.chart || c.graph || c.map || {};
            delete c.graph;
            delete c.map;
            d && !this.stateless && (A = d.hcJSON, delete d.hcJSON, g(this, d, !0), this.preReflowAdjustments && this.preReflowAdjustments.call(this), d.hcJSON = A);
            this.containerElement = b;
            this.config = {};
            this.smartLabel = f.smartLabel;
            this.smartLabel.useEllipsesOnOverflow(a(p.useellipseswhenoverflow, p.useellipsewhenoverflow, 1));
            this.colorManager = new m.colorManager(c, this);
            this.linkClickFN = W(c, e);
            this.numberFormatter = new S(c.chart, this);
            if (!this.standaloneInit)return e._chartMessageStyle =
            {
                fontFamily: l.typeNotSupportedMessageFont || h.baseChartMessageFont,
                fontSize: l.typeNotSupportedMessageFontSize || h.baseChartMessageFontSize,
                color: l.typeNotSupportedMessageColor || h.baseChartMessageColor
            }, new m.createDialog(b, h.typeNotSupportedMessage, e);
            b = this.chart(b.offsetWidth || parseFloat(b.style.width), b.offsetHeight || parseFloat(b.style.height), e);
            d && !this.stateless && (d.hcJSON && g(b, d.hcJSON, !0), this.postReflowAdjustments && this.postReflowAdjustments.call(this), k && this.cleanedData && (this.cleanedData(this,
                k), this.cleanedData(d, k)));
            return b
        },
        postSpaceManager: function () {
            var b = this.hcJSON, c = b._FCconf, d = b.chart, e = d.marginLeft, f = d.spacingLeft, k = d.spacingRight, g = c.width - e - d.marginRight, h = b.title, b = b.subtitle, l = c.width, A = h.align, c = h.x, p = h.horizontalPadding, m = h.alignWithCanvas, E = (Z(e) || 0) + a(g, l) / 2, e = this.snapLiterals || (this.snapLiterals = {}), g = h._captionWidth, n = b._subCaptionWidth, s = h._lineHeight, q = b._lineHeight, t = h.text;
            if (void 0 === c) {
                switch (A) {
                    case za:
                        c = m ? l - d.marginRight - p : l - p;
                        break;
                    case ya:
                        c = m ? d.marginLeft +
                        p : p;
                        break;
                    default:
                        c = m ? E : f + .5 * (l - f - k) || l / 2
                }
                h.align === ya ? (k = f = 0, h.align = "start") : h.align === za ? (f = g, k = n, h.align = "end") : (f = g / 2, k = n / 2, h.align = "middle");
                h.x = c;
                h.y = h.y || d.spacingTop || 0;
                b.y = t ? h.y + s + 2 : h.y || d.spacingTop || 0;
                e.captionstartx = c - f - 2;
                e.captionwidth = g + 4;
                e.captionendx = e.captionstartx + e.captionwidth;
                e.captionstarty = h.y || 0;
                e.captionheight = s + 2;
                e.captionendy = e.captionstarty + e.captionheight;
                e.subcaptionstartx = c - k - 2;
                e.subcaptionwidth = n + 4;
                e.subcaptionendx = e.subcaptionstartx + e.subcaptionwidth;
                e.subcaptionstarty =
                    b.y || 0;
                e.subcaptionheight = q + 2;
                e.subcaptionendy = e.subcaptionstarty + e.subcaptionheight
            }
        },
        chart: function (c, k) {
            var h = this.name, F = this.dataObj, f = F.chart, m = this.colorManager, n, q, t, T, S, v, w, da = this.defaultSeriesType, W, ha, ia, H, J, sa, M, K, Q, Fa, ra, Wa, ca, Ja, P, $, Oa, aa, hb, mb, Zb, Sb, V, Kb, hc, Nb, Z, jb, ma, Ob, ga, ea, ta, oa, Ba, la, pa, xa, Ra, ob, eb, Za, tb, ib, Cb, Vb, zb, Ta, sb, Wb, Qa, Eb, ub, Xb, Aa, nb, Ya, Hb, ab, mc, sc, wc, qc, vb, kb, Fb, Jb, Ia, Yb, Bc, Qb, Rb, dc, rc, nc, Tb, wa, Lb, Jc, Ha, Mb, lb, Ab, Bb, Ub, fc, rb, ec, jc, ld, cb, kc, xb, Ua, Gb, Qc, Vc, hd, lc;
            n = gc(F,
                c, k, this);
            Q = n.chart;
            K = n.xAxis;
            W = n[z];
            this.snapLiterals || (this.snapLiterals = {});
            ra = this.snapLiterals;
            ra.chartstartx = 0;
            ra.chartstarty = 0;
            ra.chartwidth = c;
            ra.chartheight = k;
            ra.chartendx = c;
            ra.chartendy = k;
            ra.chartcenterx = c / 2;
            ra.chartcentery = k / 2;
            ra.chartbottommargin = Q.spacingBottom;
            ra.chartleftmargin = Q.spacingLeft;
            ra.chartrightmargin = Q.spacingRight;
            ra.charttopmargin = Q.spacingTop;
            this.updateSnapPoints && this.updateSnapPoints();
            this.postHCJSONCreation && this.postHCJSONCreation.call(this, n);
            d.raiseEvent("internal.postlogic",
                this, this.chartInstance);
            n.labels.smartLabel = v = W.smartLabel = this.smartLabel;
            W.width = c;
            W.height = k;
            ia = n.plotOptions;
            W.isDual = this.isDual;
            W.numberFormatter = this.numberFormatter;
            W.axisGridManager = new A(da, f);
            W.tooltext = f.plottooltext;
            W.trendLineToolText = f.trendlinetooltext;
            Q.is3D = q = W.is3d = /3d$/.test(da);
            Q.isBar = ha = W.isBar = this.isBar;
            w = /^pie/.test(da);
            M = 1 == f.useroundedges;
            sa = q ? wb.chart3D : wb.chart2D;
            Q.events.click = n.plotOptions.series.point.events.click = this.linkClickFN;
            Q.defaultSeriesType = da;
            $ = 0 < f.palette &&
            6 > f.palette ? f.palette : a(this.paletteIndex, 1);
            $ -= 1;
            Q.paletteIndex = $;
            Q.usePerPointLabelColor = f.colorlabelsfromplot == Ka;
            Q.syncLabelWithAnchor = a(f.synclabelwithanchoronhover, 1);
            Q.useRoundEdges = M && !q && !this.distributedColumns && "pie" !== this.defaultSeriesType;
            void 0 !== b(f.clickurl) && (Q.link = f.clickurl, Q.style.cursor = "pointer", n.plotOptions.series.point.events.click = function () {
                Q.events.click.call({link: f.clickurl})
            });
            Oa = b(f.basefont, "Verdana,sans");
            aa = fa(f.basefontsize, 10);
            hb = b(f.basefontcolor, m.getColor(sa.baseFontColor));
            mb = b(f.outcnvbasefont, Oa);
            Zb = fa(f.outcnvbasefontsize, aa);
            Sb = Zb + Ca;
            V = b(f.outcnvbasefontcolor, hb).replace(/^#?([a-f0-9]+)/ig, "#$1");
            Nb = aa;
            aa += Ca;
            hb = hb.replace(/^#?([a-f0-9]+)/ig, "#$1");
            W.trendStyle = W.outCanvasStyle = {fontFamily: mb, color: V, fontSize: Sb};
            Kb = I(W.trendStyle);
            W.inCanvasStyle = {fontFamily: Oa, fontSize: aa, color: hb};
            hc = I(W.inCanvasStyle);
            W.divlineStyle = {fontFamily: Oa, fontSize: aa, color: hb, lineHeight: hc};
            K.labels.style = {
                fontFamily: b(f.labelfont, mb), fontSize: a(f.labelfontsize, Zb) + Ca, color: b(f.labelfontcolor,
                    V)
            };
            K.labels.style.lineHeight = I(K.labels.style);
            K.steppedLabels.style = {fontFamily: mb, fontSize: Sb, lineHeight: Kb, color: V, visibility: "hidden"};
            n.yAxis[0].labels.style = {fontFamily: mb, fontSize: Sb, lineHeight: Kb, color: V};
            n.yAxis[1].labels.style = {fontFamily: mb, fontSize: Sb, lineHeight: Kb, color: V};
            jb = b(f.legenditemfont, mb);
            ma = fa(f.legenditemfontsize, Zb);
            Ob = b(f.legenditemfontcolor, V).replace(/^#?([a-f0-9]+)/ig, "#$1");
            ga = na[a(f.legenditemfontbold, 0)] || "";
            Z = fa(f.legendcaptionfontsize, Zb) + Ca;
            ma += Ca;
            n.legend.itemStyle =
            {fontFamily: jb, fontSize: ma, color: Ob, fontWeight: ga};
            I(n.legend.itemStyle);
            n.legend.itemHiddenStyle = {
                fontFamily: jb,
                fontSize: ma,
                color: b(f.legenditemhiddencolor, "cccccc").replace(/^#?([a-f0-9]+)/ig, "#$1"),
                fontWeight: ga
            };
            I(n.legend.itemHiddenStyle);
            n.legend.itemHoverStyle = {color: b(f.legenditemhoverfontcolor, Ob).replace(/^#?([a-f0-9]+)/ig, "#$1")};
            n.legend.title.style = {
                fontFamily: b(f.legendcaptionfont, jb),
                fontSize: Z,
                color: b(f.legendcaptionfontcolor, V).replace(/^#?([a-f0-9]+)/ig, "#$1"),
                fontWeight: na[a(f.legendcaptionfontbold,
                    1)] || ""
            };
            I(n.legend.title.style);
            n.legend.title.align = $a[f.legendcaptionalignment && f.legendcaptionalignment.toLowerCase() || Pa] || $a.center;
            Fa = (Fa = l(f.valuebordercolor, p)) ? C(Fa, a(f.valueborderalpha, f.valuealpha, 100)) : p;
            n.plotOptions.series.dataLabels.style = {
                fontFamily: b(f.valuefont, Oa),
                fontSize: b(f.valuefontsize, parseInt(aa, 10)) + Ca,
                lineHeight: hc,
                color: C(b(f.valuefontcolor, hb), a(f.valuefontalpha, f.valuealpha, 100)),
                fontWeight: a(f.valuefontbold) ? "bold" : "normal",
                fontStyle: a(f.valuefontitalic) ? "italic" :
                    "normal",
                border: Fa || f.valuebgcolor ? a(f.valueborderthickness, 1) + "px solid" : "",
                borderColor: Fa,
                borderThickness: a(f.valueborderthickness, 1),
                borderPadding: a(f.valueborderpadding, 2),
                borderRadius: a(f.valueborderradius, 0),
                backgroundColor: f.valuebgcolor ? C(f.valuebgcolor, a(f.valuebgalpha, f.valuealpha, 100)) : p,
                borderDash: a(f.valueborderdashed, 0) ? e(a(f.valueborderdashlen, 4), a(f.valueborderdashgap, 2), a(f.valueborderthickness, 1)) : void 0
            };
            I(n.plotOptions.series.dataLabels.style);
            n.plotOptions.series.dataLabels.color =
                n.plotOptions.series.dataLabels.style.color;
            n.tooltip.style = {fontFamily: Oa, fontSize: aa, lineHeight: hc, color: hb};
            n.title.style = {
                fontFamily: b(f.captionfont, mb),
                color: b(f.captionfontcolor, V).replace(/^#?([a-f0-9]+)/ig, "#$1"),
                fontSize: a(f.captionfontsize, Zb + 3) + Ca,
                fontWeight: 0 === a(f.captionfontbold) ? "normal" : "bold"
            };
            n.title.align = b(f.captionalignment, Pa);
            n.title.isOnTop = a(f.captionontop, 1);
            n.title.alignWithCanvas = a(f.aligncaptionwithcanvas, this.alignCaptionWithCanvas, 1);
            n.title.horizontalPadding = a(f.captionhorizontalpadding,
                n.title.alignWithCanvas ? 0 : 15);
            I(n.title.style);
            n.subtitle.style = {
                fontFamily: b(f.subcaptionfont, f.captionfont, mb),
                color: b(f.subcaptionfontcolor, f.captionfontcolor, V).replace(/^#?([a-f0-9]+)/ig, "#$1"),
                fontSize: a(f.subcaptionfontsize, a(U(a(f.captionfontsize) - 3, -1), Zb) + a(this.subTitleFontSizeExtender, 1)) + Ca,
                fontWeight: 0 === a(f.subcaptionfontbold, this.subTitleFontWeight, f.captionfontbold) ? "normal" : "bold"
            };
            n.subtitle.align = n.title.align;
            n.subtitle.isOnTop = n.title.isOnTop;
            n.subtitle.alignWithCanvas = n.title.alignWithCanvas;
            n.subtitle.horizontalPadding = n.title.horizontalPadding;
            I(n.subtitle.style);
            Fa = (Fa = l(f.xaxisnamebordercolor, p)) ? C(Fa, a(f.xaxisnameborderalpha, f.xaxisnamealpha, 100)) : p;
            K.title.style = {
                fontFamily: b(f.xaxisnamefont, mb),
                fontSize: b(f.xaxisnamefontsize, parseInt(Sb, 10)) + Ca,
                color: C(b(f.xaxisnamefontcolor, V), a(f.xaxisnamefontalpha, f.xaxisnamealpha, 100)),
                fontWeight: a(f.xaxisnamefontbold, 1) ? "bold" : "normal",
                fontStyle: a(f.xaxisnamefontitalic) ? "italic" : "normal",
                border: Fa || f.xaxisnamebgcolor ? a(f.xaxisnameborderthickness,
                    1) + "px solid" : void 0,
                borderColor: Fa,
                borderThickness: a(f.xaxisnameborderthickness, 1),
                borderPadding: a(f.xaxisnameborderpadding, 2),
                borderRadius: a(f.xaxisnameborderradius, 0),
                backgroundColor: f.xaxisnamebgcolor ? C(f.xaxisnamebgcolor, a(f.xaxisnamebgalpha, f.xaxisnamealpha, 100)) : p,
                borderDash: a(f.xaxisnameborderdashed, 0) ? e(a(f.xaxisnameborderdashlen, 4), a(f.xaxisnameborderdashgap, 2), a(f.xaxisnameborderthickness, 1)) : void 0
            };
            I(K.title.style);
            Fa = (Fa = b(f.pyaxisnamebordercolor, f.yaxisnamebordercolor, p)) ? C(Fa, a(f.pyaxisnameborderalpha,
                f.yaxisnameborderalpha, f.pyaxisnamealpha, f.yaxisnamealpha, 100)) : p;
            n.yAxis[0].title.style = {
                fontFamily: b(f.pyaxisnamefont, f.yaxisnamefont, mb),
                fontSize: b(f.pyaxisnamefontsize, f.yaxisnamefontsize, parseInt(Sb, 10)) + Ca,
                color: C(b(f.pyaxisnamefontcolor, f.yaxisnamefontcolor, V), a(f.pyaxisnamefontalpha, f.yaxisnamefontalpha, f.pyaxisnamealpha, f.yaxisnamealpha, 100)),
                fontWeight: a(f.pyaxisnamefontbold, f.yaxisnamefontbold, 1) ? "bold" : "normal",
                fontStyle: a(f.pyaxisnamefontitalic, f.yaxisnamefontitalic) ? "italic" : "normal",
                border: Fa || f.pyaxisnamebgcolor || f.yaxisnamebgcolor ? a(f.pyaxisnameborderthickness, f.yaxisnameborderthickness, 1) + "px solid" : void 0,
                borderColor: Fa,
                borderThickness: a(f.pyaxisnameborderthickness, f.yaxisnameborderthickness, 1),
                borderPadding: a(f.pyaxisnameborderpadding, f.yaxisnameborderpadding, 2),
                borderRadius: a(f.pyaxisnameborderradius, f.yaxisnameborderradius, 0),
                backgroundColor: f.pyaxisnamebgcolor || f.yaxisnamebgcolor ? C(b(f.pyaxisnamebgcolor, f.yaxisnamebgcolor), a(f.pyaxisnamebgalpha, f.yaxisnamebgalpha, f.pyaxisnamealpha,
                    f.yaxisnamealpha, 100)) : p,
                borderDash: a(f.pyaxisnameborderdashed, f.yaxisnameborderdashed, 0) ? e(a(f.pyaxisnameborderdashlen, f.yaxisnameborderdashlen, 4), a(f.pyaxisnameborderdashgap, f.yaxisnameborderdashgap, 2), a(f.pyaxisnameborderthickness, f.yaxisnameborderthickness, 1)) : void 0
            };
            I(n.yAxis[0].title.style);
            n.yAxis[1].title.style = {fontFamily: mb, color: V, fontSize: Sb, lineHeight: void 0, fontWeight: "bold"};
            Fa = (Fa = b(f.syaxisnamebordercolor, f.yaxisnamebordercolor, p)) ? C(Fa, a(f.syaxisnameborderalpha, f.yaxisnameborderalpha,
                f.syaxisnamealpha, f.yaxisnamealpha, 100)) : p;
            n.yAxis[1].title.style = {
                fontFamily: b(f.syaxisnamefont, f.yaxisnamefont, mb),
                fontSize: b(f.syaxisnamefontsize, f.yaxisnamefontsize, parseInt(Sb, 10)) + Ca,
                color: C(b(f.syaxisnamefontcolor, f.yaxisnamefontcolor, V), a(f.syaxisnamefontalpha, f.yaxisnamefontalpha, f.syaxisnamealpha, f.yaxisnamealpha, 100)),
                fontWeight: a(f.syaxisnamefontbold, f.yaxisnamefontbold, 1) ? "bold" : "normal",
                fontStyle: a(f.syaxisnamefontitalic, f.yaxisnamefontitalic) ? "italic" : "normal",
                border: Fa || f.syaxisnamebgcolor ||
                f.yaxisnamebgcolor ? a(f.syaxisnameborderthickness, f.yaxisnameborderthickness, 1) + "px solid" : void 0,
                borderColor: Fa,
                borderThickness: a(f.syaxisnameborderthickness, f.yaxisnameborderthickness, 1),
                borderPadding: a(f.syaxisnameborderpadding, f.yaxisnameborderpadding, 2),
                borderRadius: a(f.syaxisnameborderradius, f.yaxisnameborderradius, 0),
                backgroundColor: f.syaxisnamebgcolor || f.yaxisnamebgcolor ? C(b(f.syaxisnamebgcolor, f.yaxisnamebgcolor), a(f.syaxisnamebgalpha, f.yaxisnamebgalpha, f.syaxisnamealpha, f.yaxisnamealpha,
                    100)) : p,
                borderDash: a(f.syaxisnameborderdashed, f.yaxisnameborderdashed, 0) ? e(a(f.syaxisnameborderdashlen, f.yaxisnameborderdashlen, 4), a(f.syaxisnameborderdashgap, f.yaxisnameborderdashgap, 2), a(f.syaxisnameborderthickness, f.yaxisnameborderthickness, 1)) : void 0
            };
            I(n.yAxis[1].title.style);
            Q.overlapColumns = a(f[ha && "overlapbars" || "overlapcolumns"], q ? 0 : 1);
            n.orphanStyles = {
                defaultStyle: {style: g({}, W.inCanvasStyle)},
                connectorlabels: {style: g({}, n.plotOptions.series.dataLabels)},
                vyaxisname: {style: g({}, n.yAxis[0].title.style)}
            };
            n.plotOptions.series.dataLabels.tlLabelStyle = {
                fontFamily: G(f.tlfont, Oa),
                color: L(G(f.tlfontcolor, hb)),
                fontSize: fa(f.tlfontsize, Nb) + "px"
            };
            I(n.plotOptions.series.dataLabels.tlLabelStyle);
            n.plotOptions.series.dataLabels.trLabelStyle = {
                fontFamily: G(f.trfont, Oa),
                color: L(G(f.trfontcolor, hb)),
                fontSize: fa(f.trfontsize, Nb) + "px"
            };
            I(n.plotOptions.series.dataLabels.trLabelStyle);
            n.plotOptions.series.dataLabels.blLabelStyle = {
                fontFamily: G(f.blfont, Oa),
                color: L(G(f.blfontcolor, hb)),
                fontSize: fa(f.blfontsize, Nb) + "px"
            };
            I(n.plotOptions.series.dataLabels.blLabelStyle);
            n.plotOptions.series.dataLabels.brLabelStyle = {
                fontFamily: G(f.brfont, Oa),
                color: L(G(f.brfontcolor, hb)),
                fontSize: fa(f.brfontsize, Nb) + "px"
            };
            I(n.plotOptions.series.dataLabels.brLabelStyle);
            this.parseStyles(n);
            delete n.xAxis.labels.style.backgroundColor;
            delete n.xAxis.labels.style.borderColor;
            delete n.yAxis[0].labels.style.backgroundColor;
            delete n.yAxis[0].labels.style.borderColor;
            delete n.yAxis[1].labels.style.backgroundColor;
            delete n.yAxis[1].labels.style.borderColor;
            W.showTooltip = a(f.showtooltip, this.showtooltip, 1);
            W.tooltipSepChar = b(f.tooltipsepchar, this.tooltipsepchar, yb);
            W.showValues = a(f.showvalues, this.showValues, 1);
            W.seriesNameInToolTip = a(f.seriesnameintooltip, 1);
            W.showVLines = a(f.showvlines, 1);
            W.showVLinesOnTop = a(f.showvlinesontop, 0);
            W.showVLineLabels = a(f.showvlinelabels, this.showVLineLabels, 1);
            W.showVLineLabelBorder = a(f.showvlinelabelborder, 1);
            W.rotateVLineLabels = a(f.rotatevlinelabels, 0);
            W.vLineColor = b(f.vlinecolor, "333333");
            W.vLineLabelColor = b(f.vlinelabelcolor);
            W.vLineThickness = b(f.vlinethickness, 1);
            W.vLineAlpha = a(f.vlinealpha, 80);
            W.vLineLabelBgColor = b(f.vlinelabelbgcolor, "ffffff");
            W.vLineLabelBgAlpha = a(f.vlinelabelbgalpha, q ? 50 : 100);
            W.trendlineColor = b(f.trendlinecolor, "333333");
            W.trendlineThickness = b(f.trendlinethickness, 1);
            W.trendlineAlpha = a(f.trendlinealpha);
            W.showTrendlinesOnTop = b(f.showtrendlinesontop, 0);
            W.trendlineValuesOnOpp = b(f.trendlinevaluesonopp, f.trendlinevaluesonright, 0);
            W.trendlinesAreDashed = a(f.trendlinesaredashed, 0);
            W.trendlinesDashLen = a(f.trendlinedashlen,
                5);
            W.trendlinesDashGap = a(f.trendlinedashgap, 2);
            W.showTrendlines = a(f.showtrendlines, 1);
            W.showTrendlineLabels = a(f.showtrendlinelabels, this.showTrendlineLabels, 1);
            W.flatScrollBars = a(f.flatscrollbars, 0);
            W.scrollBar3DLighting = a(f.scrollbar3dlighting, 1);
            Q.anchorTrackingRadius = a(f.anchortrackingradius, Na ? ja : s);
            n.plotOptions.series.connectNullData = a(f.connectnulldata, 0);
            Q.backgroundColor = {
                FCcolor: {
                    color: b(f.bgcolor, m.getColor(sa.bgColor)),
                    alpha: b(f.bgalpha, m.getColor(sa.bgAlpha)),
                    angle: b(f.bgangle, m.getColor(sa.bgAngle)),
                    ratio: b(f.bgratio, m.getColor(sa.bgRatio))
                }
            };
            Q.rotateValues = a(f.rotatevalues, 0);
            Q.placeValuesInside = a(f.placevaluesinside, 0);
            Q.valuePosition = b(f.valueposition, "auto");
            Q.valuePadding = a(f.valuepadding, 2);
            Q.managePlotOverflow = a(f.manageplotoverflow, 1);
            Q.borderColor = C(b(f.bordercolor, q ? "#666666" : m.getColor("borderColor")), b(f.borderalpha, q ? "100" : m.getColor("borderAlpha")));
            H = a(f.showborder, q ? 0 : 1);
            Q.borderWidth = H ? a(f.borderthickness, 1) : 0;
            Q.borderRadius = a(f.borderradius, 0);
            Q.borderDashStyle = a(f.borderdashed,
                0) ? e(a(f.borderdashlen, 4), a(f.borderdashgap, 2), Q.borderWidth) : void 0;
            Q.plotBorderColor = C(b(f.canvasbordercolor, m.getColor("canvasBorderColor")), b(f.canvasborderalpha, m.getColor("canvasBorderAlpha")));
            "0" !== f.showcanvasborder && (J = Boolean(b(f.canvasborderthickness, M ? 0 : 1)), "1" !== f.showaxislines && "1" !== f.showxaxisline && "1" !== f.showyaxisline && "1" !== f.showsyaxisline || "1" === f.showcanvasborder || (J = 0));
            Q.plotBorderWidth = q || !J ? 0 : a(f.canvasborderthickness, this.canvasborderthickness, Q.useRoundEdges ? 1 : 2);
            Q.bgSWF =
                b(f.bgimage, f.bgswf);
            Q.bgSWFAlpha = a(f.bgimagealpha, f.bgswfalpha, 100);
            ea = b(f.bgimagedisplaymode, "none").toLowerCase();
            ta = G(f.bgimagevalign, p).toLowerCase();
            oa = G(f.bgimagehalign, p).toLowerCase();
            "tile" == ea || "fill" == ea || "fit" == ea ? (ta != Ga && "middle" != ta && ta != qa && (ta = "middle"), oa != ya && "middle" != oa && oa != za && (oa = "middle")) : (ta != Ga && "middle" != ta && ta != qa && (ta = Ga), oa != ya && "middle" != oa && oa != za && (oa = ya));
            Q.bgImageDisplayMode = ea;
            Q.bgImageVAlign = ta;
            Q.bgImageHAlign = oa;
            Q.bgImageScale = a(f.bgimagescale, 100);
            Q.logoURL =
                G(f.logourl);
            Q.logoPosition = b(f.logoposition, "tl").toLowerCase();
            Q.logoAlpha = a(f.logoalpha, 100);
            Q.logoLink = G(f.logolink);
            Q.logoScale = a(f.logoscale, 100);
            Q.logoLeftMargin = a(f.logoleftmargin, 0);
            Q.logoTopMargin = a(f.logotopmargin, 0);
            Ba = Q.toolbar = {button: {}};
            la = Ba.button;
            la.scale = a(f.toolbarbuttonscale, 1.15);
            la.width = a(f.toolbarbuttonwidth, 15);
            la.height = a(f.toolbarbuttonheight, 15);
            la.radius = a(f.toolbarbuttonradius, 2);
            la.spacing = a(f.toolbarbuttonspacing, 5);
            la.fill = C(b(f.toolbarbuttoncolor, "ffffff"));
            la.labelFill =
                C(b(f.toolbarlabelcolor, "cccccc"));
            la.symbolFill = C(b(f.toolbarsymbolcolor, "ffffff"));
            la.hoverFill = C(b(f.toolbarbuttonhovercolor, "ffffff"));
            la.stroke = C(b(f.toolbarbuttonbordercolor, "bbbbbb"));
            la.symbolStroke = C(b(f.toolbarsymbolbordercolor, "9a9a9a"));
            la.strokeWidth = a(f.toolbarbuttonborderthickness, 1);
            la.symbolStrokeWidth = a(f.toolbarsymbolborderthickness, 1);
            pa = la.symbolPadding = a(f.toolbarsymbolpadding, 5);
            la.symbolHPadding = a(f.toolbarsymbolhpadding, pa);
            la.symbolVPadding = a(f.toolbarsymbolvpadding, pa);
            xa = Ba.position = b(f.toolbarposition, "tr").toLowerCase();
            switch (xa) {
                case "tr":
                case "rt":
                case "top right":
                case "right top":
                    xa = "tr";
                    break;
                case "br":
                case "rb":
                case "bottom right":
                case "right bottom":
                    xa = "br";
                    break;
                case "tl":
                case "lt":
                case "top left":
                case "left top":
                    xa = "tl";
                    break;
                case "bl":
                case "lb":
                case "bottom left":
                case "left bottom":
                    xa = "bl";
                    break;
                default:
                    xa = "tr"
            }
            Ra = Ba.hAlign = "left" === (p + f.toolbarhalign).toLowerCase() ? "l" : xa.charAt(1);
            ob = Ba.vAlign = "bottom" === (p + f.toolbarvalign).toLowerCase() ? "b" : xa.charAt(0);
            Ba.hDirection = a(f.toolbarhdirection, "r" === Ra ? -1 : 1);
            Ba.vDirection = a(f.toolbarvdirection, "b" === ob ? -1 : 1);
            Ba.vMargin = a(f.toolbarvmargin, 6);
            Ba.hMargin = a(f.toolbarhmargin, 10);
            Ba.x = a(f.toolbarx, "l" === Ra ? 0 : c);
            Ba.y = a(f.toolbary, "t" === ob ? 0 : k);
            eb = b(f.divlinecolor, m.getColor(sa.divLineColor));
            Za = b(f.divlinealpha, q ? m.getColor("divLineAlpha3D") : m.getColor("divLineAlpha"));
            tb = a(f.divlinethickness, 1);
            ib = Boolean(a(f.divlinedashed, f.divlineisdashed, this.divLineIsDashed, 0));
            Cb = a(f.divlinedashlen, 4);
            Vb = a(f.divlinedashgap,
                2);
            n.yAxis[0].gridLineColor = C(eb, Za);
            n.yAxis[0].gridLineWidth = tb;
            n.yAxis[0].gridLineDashStyle = ib ? e(Cb, Vb, tb) : "none";
            n.yAxis[0].alternateGridColor = ha ? C(b(f.alternatevgridcolor, m.getColor("altVGridColor")), 1 === a(f.showalternatevgridcolor, 1) ? b(f.alternatevgridalpha, m.getColor("altVGridAlpha")) : Ea) : C(b(f.alternatehgridcolor, m.getColor("altHGridColor")), "0" === f.showalternatehgridcolor ? 0 : b(f.alternatehgridalpha, m.getColor("altHGridAlpha")));
            mc = a(f.vdivlinethickness, 1);
            sc = Boolean(a(f.vdivlinedashed, f.vdivlineisdashed,
                0));
            wc = a(f.vdivlinedashlen, 4);
            qc = a(f.vdivlinedashgap, 2);
            K.gridLineColor = C(b(f.vdivlinecolor, m.getColor(sa.divLineColor)), b(f.vdivlinealpha, m.getColor("divLineAlpha")));
            K.gridLineWidth = mc;
            K.gridLineDashStyle = sc ? e(wc, qc, mc) : "none";
            K.alternateGridColor = C(b(f.alternatevgridcolor, m.getColor("altVGridColor")), "1" === f.showalternatehgridcolor ? b(f.alternatevgridalpha, m.getColor("altVGridAlpha")) : 0);
            Ta = b(f.canvasbgcolor, m.getColor(sa.canvasBgColor));
            Wb = b(f.canvasbgalpha, m.getColor("canvasBgAlpha"));
            b(f.showcanvasbg,
                Ka) == Ea && (Wb = "0");
            n.plotOptions.series.shadow = a(f.showshadow, f.showcolumnshadow, this.defaultPlotShadow, m.getColor("showShadow"));
            this.inversed && (n.yAxis[0].reversed = !0, n.yAxis[1].reversed = !0);
            this.isStacked && (this.distributedColumns ? (W.showStackTotal = Boolean(a(f.showsum, 1)), S = a(f.usepercentdistribution, 1), zb = a(f.showpercentvalues, 0), sb = a(f.showpercentintooltip, S, 0), W.showXAxisPercentValues = a(f.showxaxispercentvalues, 1)) : (W.showStackTotal = Boolean(a(this.showSum, f.showsum, 0)), S = a(this.stack100percent,
                f.stack100percent, 0), zb = a(f.showpercentvalues, S, 0), sb = a(f.showpercentintooltip, zb)), W.showPercentValues = zb, W.showPercentInToolTip = sb, S ? (W.isValueAbs = !0, ia[da].stacking = "percent", W[0].stacking100Percent = !0) : ia[da].stacking = "normal");
            this.isDual && ("0" === f.primaryaxisonleft && (n.yAxis[0].opposite = !0, n.yAxis[1].opposite = !1), n.yAxis[0].showAlways = !0, n.yAxis[1].showAlways = !0);
            Q.useRoundEdges && (n.plotOptions.series.shadow = a(f.showshadow, f.showcolumnshadow, 1), n.plotOptions.series.borderRadius = 1, n.tooltip.style.borderRadius =
                "2px", Q.plotBorderRadius = 3, J || (Q.plotBorderWidth = 0), Q.plotShadow = n.plotOptions.series.shadow ? {
                enabled: !0,
                opacity: Wb / 100
            } : 0);
            1 === a(f.use3dlighting, 1) && (n.legend.lighting3d = !0);
            n.plotOptions.series.userMaxColWidth = ha ? f.maxbarheight : a(f.maxcolwidth, this.maxColWidth);
            n.plotOptions.series.maxColWidth = ba(a(n.plotOptions.series.userMaxColWidth, 50)) || 1;
            n.title.text = N(f.caption);
            n.subtitle.text = N(f.subcaption);
            0 === a(f.showtooltip, this.showtooltip) && (n.tooltip.enabled = !1);
            Qa = n.tooltip.style;
            Qa.backgroundColor =
                C(b(Qa.backgroundColor, f.tooltipbgcolor, m.getColor("toolTipBgColor")), b(f.tooltipbgalpha, 100));
            Qa.borderColor = C(b(Qa.borderColor, f.tooltipbordercolor, m.getColor("toolTipBorderColor")), b(f.tooltipborderalpha, 100));
            n.tooltip.shadow = a(f.showtooltipshadow, f.showshadow, 1) ? {
                enabled: !0,
                opacity: U(a(f.tooltipbgalpha, 100), a(f.tooltipborderalpha, 100)) / 100
            } : !1;
            n.tooltip.constrain = a(f.constraintooltip, 1);
            Qa.borderWidth = a(f.tooltipborderthickness, 1) + "px";
            f.tooltipborderradius && (Qa.borderRadius = a(f.tooltipborderradius,
                1) + "px");
            Qa.padding = a(f.tooltippadding, this.tooltippadding, 3) + "px";
            f.tooltipcolor && (Qa.color = L(f.tooltipcolor));
            W.userPlotSpacePercent = n.plotOptions.series.userPlotSpacePercent = f.plotspacepercent;
            Eb = a(f.plotspacepercent, 20) % 100;
            W.plotSpacePercent = n.plotOptions.series.groupPadding = Eb / 200;
            q && !w ? (Q.series2D3Dshift = "mscombi3d" === h ? !0 : Boolean(a(f.use3dlineshift, 0)), Q.canvasBaseColor3D = b(f.canvasbasecolor, m.getColor("canvasBaseColor3D")), Q.canvasBaseDepth = a(f.canvasbasedepth, 10), Q.canvasBgDepth = a(f.canvasbgdepth,
                3), Q.showCanvasBg = Boolean(a(f.showcanvasbg, 1)), Q.showCanvasBase = Boolean(a(f.showcanvasbase, 1)), ha ? (Q.xDepth = 5, Q.yDepth = 5, Q.showCanvasBg && (W.marginTopExtraSpace += Q.canvasBgDepth), W.marginLeftExtraSpace += Q.yDepth + (Q.showCanvasBase ? Q.canvasBaseDepth : 0), W.marginBottomExtraSpace += 5) : (Q.xDepth = 10, Q.yDepth = 10, Q.showCanvasBg && (W.marginRightExtraSpace += Q.canvasBgDepth), W.marginBottomExtraSpace += Q.yDepth + (Q.showCanvasBase ? Q.canvasBaseDepth : 0)), Ta = Ta.split(Da)[0], Wb = Wb.split(Da)[0], Q.use3DLighting = Boolean(a(f.use3dlighting,
                1)), Q.plotBackgroundColor = Q.use3DLighting ? {
                FCcolor: {
                    color: R(Ta, 85) + Da + Y(Ta, 55),
                    alpha: Wb + Da + Wb,
                    ratio: db,
                    angle: E(c - (Q.marginLeft + Q.marginRight), k - (Q.marginTop + Q.marginBottom), 1)
                }
            } : C(Ta, Wb), Q.canvasBgColor = C(R(Ta, 80), Wb), t = b(f.zeroplanecolor, f.divlinecolor, m.getColor(sa.divLineColor)), T = b(f.zeroplanealpha, f.divlinealpha, m.getColor("divLineAlpha")), Q.zeroPlaneColor = C(t, T), Q.zeroPlaneBorderColor = C(b(f.zeroplanebordercolor, t), a(f.zeroplaneshowborder, 1) ? T : 0), Q.zeroPlaneShowBorder = a(f.zeroplaneshowborder,
                1)) : (Q.is3D = !1, Q.plotBackgroundColor = {
                FCcolor: {
                    color: Ta,
                    alpha: Wb,
                    angle: b(f.canvasbgangle, m.getColor("canvasBgAngle")),
                    ratio: b(f.canvasbgratio, m.getColor("canvasBgRatio"))
                }
            });
            this.parseExportOptions(n);
            this.parseHoverEffectOptions(Q);
            this.preSeriesAddition && this.preSeriesAddition(n, F, c, k);
            this.series && this.series(F, n, h, c, k);
            this.postSeriesAddition(n, F, c, k);
            this.spaceManager(n, F, c, k);
            this.postSpaceManager && this.postSpaceManager(n, F, c, k);
            ub = a(f.drawquadrant, 0);
            W.isXYPlot && ub && (Xb = K.min, Aa = K.max, nb = n.yAxis[0].min,
                Ya = n.yAxis[0].max, Hb = a(f.quadrantxval, (Xb + Aa) / 2), ab = a(f.quadrantyval, (nb + Ya) / 2), ab >= nb && ab <= Ya && Hb >= Xb && Hb <= Aa && (vb = C(b(f.quadrantlinecolor, Q.plotBorderColor), b(f.quadrantlinealpha, Xa)), kb = a(f.quadrantlinethickness, Q.plotBorderWidth), Fb = a(f.quadrantlinedashed, f.quadrantlineisdashed, 0), Jb = a(f.quadrantlinedashLen, 4), Ia = a(f.quadrantlinedashgap, 2), Yb = G(f.quadrantlabeltl, p), Bc = G(f.quadrantlabeltr, p), Qb = G(f.quadrantlabelbl, p), Rb = G(f.quadrantlabelbr, p), dc = a(f.quadrantlabelpadding, 3), rc = Fb ? e(Jb, Ia, kb) : "none",
                K.plotLines.push({
                    color: vb,
                    value: Hb,
                    width: kb,
                    dashStyle: rc,
                    zIndex: 3
                }), n.yAxis[0].plotLines.push({
                color: vb,
                value: ab,
                width: kb,
                dashStyle: rc,
                zIndex: 3
            }), nc = c - Q.marginRight - Q.marginLeft, Tb = k - Q.marginTop - Q.marginBottom, lb = W.inCanvasStyle, wa = nc / (Aa - Xb) * (Hb - Xb), Lb = nc - wa, Ha = Tb / (Ya - nb) * (ab - nb), Jc = Tb - Ha, wa -= dc, Lb -= dc, Jc -= dc, Ha -= dc, Ab = dc + Ca, Bb = Tb - dc + Ca, Ub = dc + Ca, fc = nc - dc + Ca, v.setStyle(lb), 0 < Jc && (Yb !== p && 0 < wa && (Mb = v.getSmartText(Yb, wa, Jc), n.labels.items.push({
                html: Mb.text, zIndex: 3, vAlign: Ga, style: {
                    left: Ub, top: Ab,
                    fontSize: lb.fontSize, lineHeight: lb.lineHeight, fontFamily: lb.fontFamily, color: lb.color
                }
            })), Bc !== p && 0 < Lb && (Mb = v.getSmartText(Bc, Lb, Jc), n.labels.items.push({
                html: Mb.text,
                textAlign: za,
                vAlign: Ga,
                zIndex: 3,
                style: {
                    left: fc,
                    top: Ab,
                    fontSize: lb.fontSize,
                    lineHeight: lb.lineHeight,
                    fontFamily: lb.fontFamily,
                    color: lb.color
                }
            }))), 0 < Ha && (Qb !== p && 0 < wa && (Mb = v.getSmartText(Qb, wa, Ha), n.labels.items.push({
                html: Mb.text, vAlign: qa, zIndex: 3, style: {
                    left: Ub, top: Bb, fontSize: lb.fontSize, lineHeight: lb.lineHeight, fontFamily: lb.fontFamily,
                    color: lb.color
                }
            })), Rb !== p && 0 < Lb && (Mb = v.getSmartText(Rb, Lb, Ha), n.labels.items.push({
                html: Mb.text,
                textAlign: za,
                vAlign: qa,
                zIndex: 3,
                style: {
                    left: fc,
                    top: Bb,
                    fontSize: lb.fontSize,
                    lineHeight: lb.lineHeight,
                    fontFamily: lb.fontFamily,
                    color: lb.color
                }
            })))));
            if (this.hasVDivLine && (rb = a(f.showvdivlines, 0), ec = a(f.numvdivlines, 0) + 1, rb && (ec = W.x.catCount - 1), 1 < ec)) {
                cb = K.min;
                kc = W.x.catCount - 1;
                xb = K.max;
                Gb = kc / ec;
                Qc = !0;
                Vc = cb;
                K.scroll && !isNaN(K.scroll.viewPortMax) && (xb = K.scroll.viewPortMax);
                jc = b(f.vdivlinecolor, eb);
                ld = a(f.vdivlinealpha,
                    Za);
                mc = a(f.vdivlinethickness, tb);
                sc = a(f.vdivlinedashed, f.vdivlineisdashed, ib);
                wc = a(f.vdivlinedashlen, Cb);
                qc = a(f.vdivlinedashgap, Vb);
                (lc = a(f.showalternatevgridcolor, 0)) && (hd = C(b(f.alternatevgridcolor, m.getColor("altVGridColor")), b(f.alternatevgridalpha, m.getColor("altVGridAlpha"))));
                for (Ua = Gb; Ua < kc; Ua += Gb, Qc = !Qc)Qc && lc && K.plotBands.push({
                    isNumVDIV: !0,
                    color: hd,
                    from: Vc,
                    to: Ua,
                    zIndex: 1
                }), K.plotLines.push({
                    isNumVDIV: !0,
                    width: mc,
                    color: C(jc, ld),
                    dashStyle: sc ? e(wc, qc, mc) : "none",
                    value: Ua,
                    zIndex: 1
                }), Vc = Ua;
                Qc &&
                lc && K.plotBands.push({isNumVDIV: !0, color: hd, from: Vc, to: xb, zIndex: 1})
            }
            Wa = Q.marginTop;
            ca = Q.marginBottom;
            Ja = Q.marginLeft;
            P = Q.marginRight;
            ra.canvasstartx = Ja;
            ra.canvasstarty = Wa;
            ra.canvasendx = c - P;
            ra.canvasendy = k - ca;
            ra.canvaswidth = ra.canvasendx - ra.canvasstartx;
            ra.canvasheight = ra.canvasendy - ra.canvasstarty;
            n.legend && n.legend.enabled && "vertical" === n.legend.layout && (ra.legendstarty = Wa + .5 * (W.height - ca - Wa - ra.legendheight) + (n.legend.y || 0), ra.legendendy = ra.legendstarty + ra.legendheight);
            q && Q.xDepth > Q.marginLeft &&
            (Q.marginLeft = Q.xDepth);
            D.console && D.console.log && D.FC_DEV_ENVIRONMENT && console.log(n);
            return n
        },
        parseHoverEffectOptions: function (c) {
            var d = this.dataObj.chart, e;
            c.showHoverEffect = d.showhovereffect;
            c.plotHoverEffect = a(d.plothovereffect, d.anchorhovereffect, c.showHoverEffect);
            e = c.plotHoverEffects = {enabled: c.plotHoverEffect};
            e.highlight = a(d.highlightonhover, d.highlightplotonhover, c.plotHoverEffect);
            e.columnHighlight = a(e.highlight, d.highlightcolumnonhover, d.highlightbaronhover);
            e.anchorHighlight = a(e.highlight,
                d.highlightanchoronhover);
            e.imageHighlight = a(e.highlight, d.highlightanchorimageonhover);
            e.anchorImageHoverAlpha = b(d.anchorimagehoveralpha);
            e.anchorImageHoverScale = b(d.anchorimagehoverscale);
            e.bubbleHighlight = a(e.highlight, d.highlightbubbleonhover);
            e.color = b(d.plotfillhovercolor, d.columnhovercolor, d.barhovercolor, d.bubblehovercolor);
            e.alpha = b(d.plotfillhoveralpha, d.columnhoveralpha, d.barhoveralpha, d.bubblehoveralpha);
            e.scale = b(d.plothoverscale, d.columnhoverscale, d.barhoverscale, d.bubblehoverscale);
            e.gradientColor = d.plothovergradientcolor;
            e.ratio = d.plothoverratio;
            e.angle = d.plothoverangle;
            e.borderColor = d.plotborderhovercolor;
            e.borderAlpha = d.plotborderhoveralpha;
            e.borderThickness = d.plotborderhoverthickness;
            e.borderDashed = d.plotborderhoverdashed;
            e.borderDashGap = d.plotborderhoverdashgap;
            e.borderDashLen = d.plotborderhoverdashlen;
            e.shadow = d.plothovershadow;
            e.anchorScale = d.anchorhoverscale;
            e.anchorSides = d.anchorhoversides;
            e.anchorRadius = d.anchorhoverradius;
            e.anchorAlpha = d.anchorhoveralpha;
            e.anchorBgColor =
                b(d.anchorbghovercolor, d.anchorhovercolor);
            e.anchorBgAlpha = d.anchorbghoveralpha;
            e.anchorBorderColor = d.anchorborderhovercolor;
            e.anchorBorderAlpha = d.anchorborderhoveralpha;
            e.anchorBorderThickness = d.anchorborderhoverthickness;
            e.anchorStartAngle = d.anchorhoverstartangle;
            e.anchorDip = a(d.anchorhoverdip);
            e.anchorAnimation = a(d.anchorhoveranimation, 1);
            e.negativeColor = b(d.negativehovercolor, d.negativecolor);
            e.is3DBubble = a(d.is3donhover)
        },
        parseExportOptions: function (c) {
            var d = this.chartInstance, e = this.dataObj.chart;
            g(c.exporting, {
                enabled: a(e.exportenabled, 0),
                bgcolor: d.jsVars.transparent || 0 === a(d.options.containerBackgroundOpacity, 1) ? p : d.options.containerBackgroundColor || "#ffffff",
                bgalpha: (d.jsVars.transparent ? 0 : a(d.options.containerBackgroundOpacity, 1)) + p,
                exporttargetwindow: b(e.exporttargetwindow, Fb ? "_blank" : "_self"),
                exportaction: e.exportaction && "save" === e.exportaction.toString().toLowerCase() && "save" || "download",
                exportfilename: b(e.exportfilename, "FusionCharts"),
                exporthandler: b(e.html5exporthandler, e.exporthandler,
                    K),
                exportparameters: b(e.exportparameters, p),
                exportformat: b(e.exportformat, "PNG"),
                exportcallback: b(e.exportcallback, p),
                exportwithimages: a(e.exportwithimages, 0),
                buttons: {
                    printButton: {enabled: !!a(e.printshowbutton, e.showprintmenuitem, 0)},
                    exportButton: {enabled: !(!a(e.exportenabled, 0) || !a(e.exportshowbutton, e.exportshowmenuitem, 1))}
                }
            });
            var d = c.exporting, k;
            e = e.exportformats;
            c = q(c.exporting.exportaction);
            c = {
                JPG: c + " as JPEG image",
                PNG: c + " as PNG image",
                PDF: c + " as PDF document",
                SVG: c + " as SVG vector image"
            };
            var f, h, l;
            if (e) {
                e = e.split(/\s*?\|\s*?/);
                for (l = 0; l < e.length; l++)h = (f = e[l].split(/\s*?=\s*?/)) && f[0].toUpperCase() || p, f = f && f[1] || p, c[h] && (k || (k = {})) && (k[h] = f || c[h]);
                k = k || c
            } else k = c;
            d.exportformats = k
        },
        defaultSeriesType: p,
        paletteIndex: 1,
        creditLabel: vb,
        titleSpaceManager: ib,
        placeLegendBlockBottom: ca,
        configureLegendOptions: Zb,
        placeLegendBlockRight: Oa,
        placeHorizontalAxis: Ja,
        placeVerticalAxis: hb,
        placeHorizontalCanvasMarginAdjustment: jb,
        placeVerticalCanvasMarginAdjustment: Nb,
        placeHorizontalXYSpaceManager: function (c,
                                                 d, e, k) {
            var f = c[z], g, h, l, A, n = d.chart, p, m, E, s, q, t, T, S = c.chart, v = f.marginLeftExtraSpace, W = f.marginTopExtraSpace, w = f.marginBottomExtraSpace, da = f.marginRightExtraSpace;
            A = e - (v + da + S.marginRight + S.marginLeft);
            var C = k - (w + S.marginBottom + S.marginTop), ha = .3 * A;
            e = .3 * C;
            var Q = c.xAxis.showLine ? c.xAxis.lineThickness : 0;
            l = c.yAxis[0].showLine ? c.yAxis[0].lineThickness : 0;
            g = A - ha;
            k = C - e;
            p = b(n.legendposition, qa).toLowerCase();
            c.legend.enabled && p === za && (g -= this.placeLegendBlockRight(c, d, g / 2, C));
            q = a(n.xaxisnamepadding, 5);
            t = a(n.labelpadding,
                4);
            T = b(n.rotatexaxisname, "ccw");
            T = T === Ea ? "none" : T;
            m = b(n.showplotborder, f.is3d ? Ea : Ka) === Ka;
            m = f.plotBorderThickness = m ? f.is3d ? 1 : a(n.plotborderthickness, 1) : 0;
            E = U(a(S.plotBorderWidth, 1), 0);
            !f.isDual && S.marginRight < E && void 0 === n.chartrightmargin && (h = E - S.marginRight, A > ha + h && (S.marginRight = E, A -= h, ha = .3 * A, g = A - ha));
            h = f.x;
            s = U(E, m / 2);
            t < s && (t = s);
            h.verticalAxisNamePadding = q;
            h.verticalAxisValuesPadding = t + Q;
            h.rotateVerticalAxisName = T;
            h.verticalAxisNameWidth = a(n.xaxisnamewidth);
            g -= hb(c.xAxis, h, c, d, C, g, !1, !1, A);
            c.xAxis.lineEndExtension =
                l;
            g -= jb(c, d, g, c.xAxis);
            A = g + ha;
            c.legend.enabled && p !== za && (k -= this.placeLegendBlockBottom(c, d, A, k / 2));
            k -= this.titleSpaceManager(c, d, A, k / 2);
            h = f[0];
            h.horizontalAxisNamePadding = a(n.yaxisnamepadding, 5);
            h.horizontalLabelPadding = U(a(n.yaxisvaluespadding, 4)) + l;
            h.labelDisplay = "auto";
            h.staggerLines = a(n.staggerlines, 2);
            h.slantLabels = a(n.slantlabels, 0);
            h.horizontalLabelPadding = h.horizontalLabelPadding < E ? E : h.horizontalLabelPadding;
            this.xAxisMinMaxSetter(c, d, A);
            l = c.xAxis;
            q = l.plotLines;
            g = k / (l.max - l.min);
            q && q.length &&
            (E = (q[0].value - l.min) * g, q = (l.max - q[q.length - 1].value) * g, f.isBar && (m > E && (l.min -= (m - E) / (2 * g)), m > q && (l.max += (m - q) / (2 * g))));
            k -= this.placeHorizontalAxis(c.yAxis[0], h, c, d, A, k, ha);
            k -= Nb(c, d, k, c.yAxis[0]);
            mb(e + k, c, n, c.xAxis, f.x.lYLblIdx, !0);
            Sb(c, c.xAxis.title, k);
            c.legend.enabled && p === za && (c = c.legend, d = e + k, c.height > d && (c.height = d, c.scroll.enabled = !0, d = (c.scroll.scrollBarWidth = 10) + (c.scroll.scrollBarPadding = 2), c.width += d, S.marginRight += d), c.y = 20);
            S.marginLeft += v;
            S.marginTop += W;
            S.marginBottom += w;
            S.marginRight +=
                da
        },
        placeVerticalXYSpaceManager: function (c, d, e, k) {
            var f = c[z], g, h, l = !0;
            g = 0;
            var A = d.chart, n = !1, p, m, E, s, q = c.chart, t, T, S, v = f.marginLeftExtraSpace, W = f.marginTopExtraSpace, w = f.marginBottomExtraSpace, da = f.marginRightExtraSpace;
            s = e - (v + da + q.marginRight + q.marginLeft);
            var C = k - (w + q.marginBottom + q.marginTop), ha = .3 * s;
            k = .3 * C;
            var Q = s - ha;
            e = C - k;
            g = f.drawFullAreaBorder = a(A.drawfullareaborder, 1);
            var D = b(A.legendposition, qa).toLowerCase();
            t = c.xAxis.showLine ? c.xAxis.lineThickness : 0;
            T = c.yAxis[0].showLine ? c.yAxis[0].lineThickness :
                0;
            S = f.isDual && c.yAxis[1].showLine ? c.yAxis[1].lineThickness : 0;
            p = a(A.yaxisnamepadding, 5);
            m = a(A.yaxisvaluespadding, A.labelypadding, 4);
            h = b(A.showplotborder, f.is3d ? Ea : Ka) === Ka;
            h = f.plotBorderThickness = h ? f.is3d ? 1 : a(A.plotborderthickness, 1) : 0;
            E = U(a(q.plotBorderWidth, 1), 0);
            h = U(E, h / 2);
            "area" !== this.defaultSeriesType || g || (h = E);
            m < E && (m = E);
            !f.isDual && q.marginRight < E && void 0 === A.chartrightmargin && (g = E - c.chart.marginRight, s > ha + g && (s -= g, ha = .3 * s, Q = s - ha));
            c.legend.enabled && D === za && (Q -= this.placeLegendBlockRight(c,
                d, Q / 2, C));
            f.isDual && (n = !0, g = f[1], l = c.yAxis[1].opposite, E = b(A.rotateyaxisname, l ? "cw" : "ccw"), E = E === Ea ? "none" : E, g.verticalAxisNamePadding = p, g.verticalAxisValuesPadding = m + S, g.rotateVerticalAxisName = E, g.verticalAxisNameWidth = a(A.syaxisnamewidth), Q -= hb(c.yAxis[1], g, c, d, C, Q / 2, l, n));
            g = f[0];
            l = !l;
            E = b(A.rotateyaxisname, l ? "cw" : "ccw");
            E = E === Ea ? "none" : E;
            g.verticalAxisNamePadding = p;
            g.verticalAxisValuesPadding = m + T;
            g.rotateVerticalAxisName = E;
            g.verticalAxisNameWidth = a(n ? A.pyaxisnamewidth : A.yaxisnamewidth);
            Q -= hb(c.yAxis[0],
                g, c, d, C, Q, l, n, s);
            Q -= jb(c, d, Q, c.yAxis[0], c.yAxis[1]);
            l = Q + ha;
            c.legend.enabled && D !== za && (e -= this.placeLegendBlockBottom(c, d, l, e / 2));
            e -= this.titleSpaceManager(c, d, l, e / 2);
            g = f.x;
            g.horizontalAxisNamePadding = a(A.xaxisnamepadding, 5);
            g.horizontalLabelPadding = a(A.labelpadding, A.labelxpadding, 4) + t;
            g.labelDisplay = b(A.labeldisplay, "auto").toLowerCase();
            g.rotateLabels = a(A.rotatelabels, A.rotatexaxislabels, 0);
            g.staggerLines = a(A.staggerlines, 2);
            g.slantLabels = a(A.slantlabels, A.slantlabel, 0);
            c.yAxis[0].opposite ? (c.xAxis.lineEndExtension =
                T, c.xAxis.lineStartExtension = S) : (c.xAxis.lineEndExtension = S, c.xAxis.lineStartExtension = T);
            g.horizontalLabelPadding < h && (g.horizontalLabelPadding = h);
            s = {left: 0, right: 0};
            s = q.managePlotOverflow && this.canvasPaddingModifiers && this.calculateCanvasOverflow(c, !0) || s;
            t = s.left + s.right;
            T = .6 * l;
            t > T && (S = s.left / t, s.left -= S * (t - T), s.right -= (1 - S) * (t - T));
            this.xAxisMinMaxSetter(c, d, l, s.left, s.right);
            e -= this.placeHorizontalAxis(c.xAxis, g, c, d, l, e, ha);
            e -= Nb(c, d, e, c.xAxis);
            c.title.alignWithCanvas || ("left" === c.title.align &&
            c.yAxis[0].title.text && Kb(c, c.yAxis[0].title, k + e), "right" === c.title.align && n && c.yAxis[1].title.text && Kb(c, c.yAxis[1].title, k + e));
            n && (mb(k + e, c, A, c.yAxis[1], f[1].lYLblIdx), Sb(c, c.yAxis[1].title, k + e));
            mb(k + e, c, A, c.yAxis[0], f[0].lYLblIdx);
            Sb(c, c.yAxis[0].title, k + e);
            c.legend.enabled && D === za && (c = c.legend, d = k + e, c.height > d && "gradient" !== c.type && (c.height = d, c.scroll.enabled = !0, d = (c.scroll.scrollBarWidth = 10) + (c.scroll.scrollBarPadding = 2), c.width += d, q.marginRight += d));
            q.marginLeft += v;
            q.marginTop += W;
            q.marginBottom +=
                w;
            q.marginRight += da
        },
        placeVerticalAxisTitle: Sb,
        calculateCanvasOverflow: function (a, b) {
            for (var c = this.canvasPaddingModifiers, d = a.chart, f = this.smartLabel, e = 0, k = 0, g = 0, h = 0, l = e = !1, A = !1, n = c && c.length || 0, m, E, s, q, t; n--;)switch (k = c[n], k) {
                case "anchor":
                    l = E = e = !0;
                    break;
                case "anchorlabel":
                    s = E = e = !0;
                    break;
                case "errorbar":
                    A = e = !0
            }
            if (e && (n = (c = a.series) && c.length || 0, b))for (; n--;)m = c[n], E && (e = m && m.data || [], 1 < e.length && (q = e[0], t = e[e.length - 1], l && (e = q && q.marker && q.marker.enabled && (q.marker.radius || 0) + (q.marker.lineWidth ||
            0) || 0, k = t && t.marker && t.marker.enabled && (t.marker.radius || 0) + (t.marker.lineWidth || 0) || 0, g = U(e + 2, g), h = U(k + 2, h)), s && (f.setStyle(a.plotOptions.series.dataLabels.style), d.rotateValues ? (k = f.getOriSize(q && q.displayValue || p), e = k.height / 2, k = f.getOriSize(t && t.displayValue || p), k = k.height / 2) : (k = f.getOriSize(q && q.displayValue || p), e = k.width / 2, k = f.getOriSize(t && t.displayValue || p), k = k.width / 2), g = U(e + 2, g), h = U(k + 2, h)))), A && (k = e = m.errorBarWidth / 2 + m.errorBarThickness || 0, g = U(e + 2, g), h = U(k + 2, h));
            return {left: g, right: h}
        },
        spaceManager: function () {
            return this.placeVerticalXYSpaceManager.apply(this, arguments)
        },
        axisMinMaxSetter: function (b, c, d, e, f, k, g, h) {
            d = c.stacking100Percent ? da(99, 1, 100, 0, f, k, g, h) : da(a(c.max, d), a(c.min, e), d, e, f, k, g, h);
            b.min = Number(n(d.Min, 10));
            b.max = Number(n(d.Max, 10));
            b.tickInterval = Number(n(d.divGap, 10));
            c.numdivlines = w.round((b.max - b.min) / b.tickInterval) - 1;
            2 >= d.Range / d.divGap && (b.alternateGridColor = xa);
            this.highValue = c.max;
            this.lowValue = c.min;
            delete c.max;
            delete c.min
        },
        configurePlotLines: function (c,
                                      d, e, k, f, g, h, l, A, m, E) {
            var s = e.min, q = e.max, t = e.tickInterval, T = m ? "xAxis" : k.stacking100Percent ? "percentValue" : "yAxis", S = s, v = 1, W = e.gridLineColor, w = e.gridLineWidth, da = e.gridLineDashStyle, ha = 0 > s && 0 < q ? !0 : !1, Q = 0 === s, D = 0 === q, ia = 0 === a(k.showzeroplanevalue, c.showzeroplanevalue), H = !0, na, sa = 1, J = 0 < a(c.numdivlines, 0), G = d[z].axisGridManager, K = this.colorManager, ra = this.is3D, M = a(c.showaxislimitgridlines, this.showAxisLimitGridLines), ra = a(M, ra || d.chart.plotBorderWidth ? 0 : 1), Na = this.inversed;
            d = d.xAxis;
            E = a(E, A ? 1 : 0);
            delete e._altGrid;
            delete e._lastValue;
            m && !k.catOccupied && (k.catOccupied = {});
            !ha || m && k.catOccupied[0] || (m ? (H = a(c.showvzeroplane, 1), na = a(c.showvzeroplanevalue, g), J = a(c.vzeroplanethickness, 1), K = b(c.vzeroplanealpha, c.vdivlinealpha, K.getColor("divLineAlpha")), c = 0 < J ? C(b(c.vzeroplanecolor, W), K) : xa) : (K = a(c.divlinealpha, K.getColor("divLineAlpha")), na = a(k.showzeroplanevalue, c.showzeroplanevalue, g), !1 === this.defaultZeroPlaneHighlighted ? (H = a(k.showzeroplane, c.showzeroplane, !(this.defaultZeroPlaneHidden && !J)), J = w) : (J = 1 === w ? 2 : w,
                sa = 5, K = $(2 * K, 100)), J = a(k.zeroplanethickness, c.zeroplanethickness, J), K = b(k.zeroplanealpha, c.zeroplanealpha, K), c = 0 < J ? C(b(k.zeroplanecolor, c.zeroplanecolor, W), K) : xa), H && (na = na ? l[T](0, E) : p, (sa = G.addAxisGridLine(e, 0, na, J, da, c, sa, m)) && (sa.isZeroPlane = !0)), e.effectiveZeroPlaneThickness = H && parseInt(K, 10) && J);
            m && k.catOccupied[s] || (na = !f || Q && ia ? p : l[T](s, E), (sa = M || ra && (Na || !d.showLine) ? G.addAxisGridLine(e, s, na, w, da, W || xa, 2, m) : G.addAxisGridLine(e, s, na, .1, void 0, xa, 2, m)) && (sa.isMinLabel = !0));
            0 >= w && (w = .1, W = xa);
            for (s = Number(n(S + t, 10)); s < q; s = Number(n(s + t, 10)), v += 1)ha && 0 > S && 0 < s && !A && (G.addAxisAltGrid(e, 0), v += 1), 0 === s || m && k.catOccupied[s] || (na = 1 === g && 0 === v % h ? l[T](s, E) : p, G.addAxisGridLine(e, s, na, w, da, W, 2, m)), S = s, A || G.addAxisAltGrid(e, s);
            A || G.addAxisAltGrid(e, q);
            0 !== v % h || m && k.catOccupied[q] || (na = !f || D && ia ? p : l[T](q, E), (sa = M || ra && (!Na || !d.showLine) ? G.addAxisGridLine(e, q, na, w, da, W || xa, 2, m) : G.addAxisGridLine(e, q, na, .1, da, xa, 2, m)) && (sa.isMaxLabel = !0));
            this.realtimeEnabled && (e.labels._enabled = e.labels.enabled, e._gridLineWidth =
                e.gridLineWidth, e._alternateGridColor = e.alternateGridColor);
            e.labels.enabled = !1;
            e.gridLineWidth = 0;
            e.alternateGridColor = xa;
            e.plotLines.sort(hc)
        },
        xAxisMinMaxSetter: function (b, d, e, k, f) {
            var g = b[z], h = g.x, l = d.chart, A = h.min = a(h.min, 0), n = h.max = a(h.max, h.catCount - 1), m = 0, p = 0, E = b.chart.defaultSeriesType, s = /^(column|column3d|bar|bar3d|floatedcolumn|sparkwinloss|boxandwhisker2d|dragcolumn)$/.test(E), q = /^(line|area|spline|areaspline)$/.test(E), E = /^(scatter|bubble|candlestick|dragnode)$/.test(E), t = b.xAxis, T = t.scroll,
                S = T && T.enabled, v = a(l.canvaspadding), W = void 0 !== v && null !== v, w = Ba($(a(v, k, 0), e / 2 - 10)), v = Ba($(a(v, f, 0), e / 2 - 10)), da, C, ha, Q;
            h.adjustMinMax && (da = a(l.setadaptivexmin, 1), n = A = !da, C = a(this.numVDivLines, l.numvdivlines, 4), ha = l.adjustvdiv !== Ea, Q = a(l.showxaxisvalues, l.showxaxisvalue, 1), da = a(l.showvlimits, Q), Q = a(l.showvdivlinevalue, l.showvdivlinevalues, Q), this.axisMinMaxSetter(t, h, l.xaxismaxvalue, l.xaxisminvalue, A, n, C, ha), A = t.min, n = t.max, h.requiredAutoNumericLabels && (C = a(parseInt(l.xaxisvaluesstep, 10), 1), this.configurePlotLines(l,
                b, t, h, da, Q, 1 > C ? 1 : C, g.numberFormatter, !1, !0)), t.plotLines.sort(hc));
            t.labels.enabled = !1;
            t.gridLineWidth = 0;
            t.alternateGridColor = xa;
            !s && !g.isScroll || g.hasNoColumn || W || void 0 === k || null === k || void 0 === f || null === f || (p = e / (n - A + 1) * .5, w = 0 < p - k ? 0 : w, v = 0 < p - f ? 0 : v, m = 0 < p - k ? .5 : 0, p = 0 < p - f ? .5 : 0);
            s && !g.hasNoColumn && (p = m = .5);
            g.is3d && (w += a(b.chart.xDepth, 0));
            b = (e - (w + v)) / ((S ? T.vxLength : n) - A + (m + p));
            t.min = A - (m + w / b);
            t.max = n + (p + v / b);
            S && (m = T.vxLength, b = t.max - t.min, T.viewPortMin = t.min, T.viewPortMax = t.max, T.scrollRatio = m / b, T.flatScrollBars =
                g.flatScrollBars, T.scrollBar3DLighting = g.scrollBar3DLighting, t.max = t.min + m);
            q && t.min === t.max && (t.min -= .65, t.max += .65);
            E && d.vtrendlines && c(d.vtrendlines, t, g, !1, !0, !0)
        },
        postSeriesAddition: function (c) {
            var d = c[z], e = d.isBar, k = d.is3d, f = c.chart.rotateValues && !e ? 270 : 0, l = d[0], A = l && l.stacking100Percent, n, m, p, E, s, q, t, T, S, v, W, w, da, C, ha, Q, D, ia, H, na, sa, J, G;
            if (this.isStacked)for (p in n = d.plotSpacePercent, m = c.chart.defaultSeriesType, n = 1 - 2 * n, Q = c.series, D = this.numberFormatter, sa = g({}, c.plotOptions.series.dataLabels.style),
                J = parseFloat(sa.fontSize), G = !l.stacking100Percent, sa.color = c.plotOptions.series.dataLabels.color, E = l.stack, E) {
                l = E[p].length;
                s = n / l;
                t = -(n - s) / 2;
                C = [];
                w = 0;
                for (T = Q.length; w < T; w += 1)S = Q[w], S.yAxis || b(S.type, m) !== p || C.push(S);
                for (q = 0; q < l; q += 1, t += s) {
                    W = E[p][q];
                    ha = [];
                    w = 0;
                    for (T = C.length; w < T; w += 1)S = C[w], a(S.columnPosition, 0) === q && ha.push(S.data);
                    if (W && W.length)for (v = 0, S = W.length; v < S; v += 1)if (w = W[v])for (da = (w.n || 0) + (w.p || 0), d.showStackTotal && (T = v, T += t, w = 0 > da ? w.n : w.p, c.xAxis.plotLines.push({
                        value: T,
                        width: 0,
                        isVline: G,
                        isTrend: !G,
                        zIndex: 4,
                        _isStackSum: 1,
                        _catPosition: v,
                        _stackIndex: q,
                        label: {
                            align: Pa,
                            textAlign: k || 270 !== f ? e ? 0 > da ? za : ya : Pa : 0 > da ? za : ya,
                            offsetScale: G ? w : void 0,
                            offsetScaleIndex: 0,
                            rotation: f,
                            style: sa,
                            verticalAlign: Ga,
                            y: e ? 0 : 0 > da ? 270 === f ? 4 : J : -4,
                            x: 0,
                            text: d.numberFormatter.yAxis(da)
                        }
                    })), w = 0, T = ha.length; w < T; w += 1)if (H = ha[w][v])if (na = da && (H.y || 0) / da * 100, ia = D.percentValue(na), H.toolText = h(H.toolText, [14, 24, 25, 112], {
                            percentValue: ia,
                            sum: D.dataLabels(da),
                            unformattedSum: da
                        }), H.y || 0 === H.y)A && (H.y = na, H.previousY || 0 === H.previousY) &&
                    (H.previousY = H.previousY / da * 100), H.showPercentValues && (H.displayValue = ia)
                }
            }
        },
        styleMapForFont: Ra,
        styleApplicationDefinition_font: function (a, b, c) {
            var d, f, e = !1, k, g, h = this.styleMapForFont;
            switch (b) {
                case "caption":
                    d = a.title;
                    break;
                case "datalabels":
                    d = a.xAxis.labels;
                    break;
                case "datavalues":
                    d = a.plotOptions.series.dataLabels;
                    e = !0;
                    break;
                case "tldatavalues":
                    d = {style: a.plotOptions.series.dataLabels.tlLabelStyle};
                    break;
                case "trdatavalues":
                    d = {style: a.plotOptions.series.dataLabels.trLabelStyle};
                    break;
                case "bldatavalues":
                    d =
                    {style: a.plotOptions.series.dataLabels.blLabelStyle};
                    break;
                case "brdatavalues":
                    d = {style: a.plotOptions.series.dataLabels.brLabelStyle};
                    break;
                case "subcaption":
                    d = a.subtitle;
                    break;
                case "tooltip":
                    d = a.tooltip;
                    break;
                case "trendvalues":
                    d = {style: a[z].trendStyle};
                    break;
                case "xaxisname":
                    d = a.xAxis.title;
                    break;
                case "yaxisname":
                case "pyaxisname":
                case "axistitle":
                    d = [];
                    b = 0;
                    for (k = a.yAxis.length; b < k; b += 1)d.push(a.yAxis[b].title);
                    break;
                case "yaxisvalues":
                    d = [];
                    b = 0;
                    for (k = a.yAxis.length; b < k; b += 1)d.push(a.yAxis[b].labels);
                    break;
                case "vlinelabels":
                    d = {style: a[z].divlineStyle};
                    break;
                case "legend":
                    d = {style: a.legend.itemStyle};
                    break;
                default:
                    (d = a.orphanStyles[b]) || (a.orphanStyles[b] = d = {text: "", style: {}})
            }
            if ("object" === typeof d)if (d instanceof Array)for (b = 0, k = d.length; b < k; b += 1) {
                g = d[b];
                for (f in c)if (a = f.toLowerCase(), "function" === typeof h[a])h[a](c[f], g, e);
                I(g.style)
            } else {
                for (f in c)if (a = f.toLowerCase(), "function" === typeof h[a])h[a](c[f], d, e);
                I(d.style)
            }
        },
        parseStyles: function (a) {
            var b, c, d, f = {}, e, k = this.dataObj;
            if (k.styles &&
                k.styles.definition instanceof Array && k.styles.application instanceof Array) {
                for (b = 0; b < k.styles.definition.length; b += 1)c = k.styles.definition[b], c.type && c.name && this["styleApplicationDefinition_" + c.type.toLowerCase()] && (f[c.name.toLowerCase()] = c);
                for (b = 0; b < k.styles.application.length; b += 1)for (c = k.styles.application[b].styles && k.styles.application[b].styles.split(Da) || [], e = 0; e < c.length; e += 1)if (d = c[e].toLowerCase(), f[d] && k.styles.application[b].toobject)this["styleApplicationDefinition_" + f[d].type.toLowerCase()](a,
                    k.styles.application[b].toobject.toLowerCase(), f[d])
            }
        },
        updateDefaultAnnotations: function () {
            var c = this.renderer, d = this.dataObj, e = this.chartInstance, k = d && d.annotations || {}, f = {}, g;
            if (this.drawAnnotations && e.dataReady() && d && d.chart && a(d.chart.showannotations, 1)) {
                g = a(k.scaleonresize, d.chart.scaleonresize, 1);
                var c = {
                    interactionevents: b(this.annotationInteractionEvents, !0),
                    showbelow: b(k.showbelow, k.showbelowchart),
                    autoscale: k.autoscale,
                    scaletext: k.scaletext,
                    scaleimages: k.scaleimages,
                    constrainedscale: k.constrainedscale,
                    scaleonresize: g,
                    origw: b(k.origw, d.chart.origw, g ? this.origRenderWidth : c.chartWidth),
                    origh: b(k.origh, d.chart.origh, g ? this.origRenderHeight : c.chartHeight),
                    xshift: k.xshift,
                    yshift: k.yshift,
                    grpxshift: k.grpxshift,
                    grpyshift: k.grpyshift,
                    xscale: k.xscale,
                    yscale: k.yscale,
                    rootxscale: a(k.xscale, 100) / 100,
                    rootyscale: a(k.yscale, 100) / 100
                }, h;
                c || (c = {});
                for (h in f)c[h] = f[h];
                e.annotations.reset(k, c, this.snapLiterals)
            } else e.annotations.clear()
        },
        dispose: function () {
            var a;
            this.disposing = !0;
            this.renderer && this.renderer.dispose();
            this.numberFormatter && this.numberFormatter.dispose();
            this.hcJSON && this.hcJSON.chart && this.hcJSON.chart.renderTo && delete this.hcJSON.chart.renderTo;
            for (a in this)delete this[a];
            delete this.disposing;
            this.disposed = !0
        }
    });
    V("stub", {
        init: function (a, b, c) {
            this.containerElement = a;
            this.smartLabel = c.jsVars.smartLabel
        }, standaloneInit: !0
    }, V.base);
    V("barbase", {
        spaceManager: function () {
            return this.placeHorizontalXYSpaceManager.apply(this, arguments)
        }
    }, V.base);
    V("singleseries", {
        series: function (a, b, d) {
            var e = a.data ||
                a.dataset && a.dataset[0] && a.dataset[0].data, f;
            e && 0 < e.length && e instanceof Array && (f = {
                data: [],
                hoverEffects: this.parseSeriesHoverOptions(a, b, {}, d),
                colorByPoint: !0
            }, b.legend.enabled = !1, d = this.point(d, f, e, a.chart, b), d instanceof Array ? b.series = b.series.concat(d) : b.series.push(d), this.configureAxis(b, a), a.trendlines && c(a.trendlines, b.yAxis, b[z], !1, this.isBar))
        }, defaultSeriesType: p, configureAxis: function (c, d) {
            var e = c[z], k = c.xAxis, f = d.chart, g = c.chart.is3D, h, l, A, n, m, p, E, s, q, t, T, S, v = 0, w, W, da, ha, Q, D, ia, H = this.numberFormatter,
                na = a(f.syncaxislimits, 0), sa;
            k.title.text = N(f.xaxisname);
            sa = a(parseInt(f.yaxisvaluesstep, 10), parseInt(f.yaxisvaluestep, 10), 1);
            sa = 1 > sa ? 1 : sa;
            h = c.yAxis[0];
            l = e[0];
            e.isDual ? (A = H.getCleanValue(f.pyaxismaxvalue), n = H.getCleanValue(f.pyaxisminvalue), h.title.text = N(f.pyaxisname), na && !l.stacking100Percent ? (S = e[1], T = a(S.max), S = a(S.min), void 0 !== T && void 0 !== S && (l.min = $(l.min, S), l.max = U(l.max, T)), T = H.getCleanValue(f.syaxismaxvalue), S = H.getCleanValue(f.syaxisminvalue), null !== S && (n = null !== n ? $(n, S) : S), null !== T && (A =
                null !== A ? U(A, T) : T)) : na = 0) : (A = H.getCleanValue(f.yaxismaxvalue), n = H.getCleanValue(f.yaxisminvalue), h.title.text = N(f.yaxisname));
            E = a(this.isStacked ? 0 : this.setAdaptiveYMin, f.setadaptiveymin, this.defSetAdaptiveYMin, 0);
            p = m = !E;
            s = a(e.numdivlines, f.numdivlines, this.numdivlines, 4);
            q = f.adjustdiv !== Ea;
            t = a(this.showYAxisValues, f.showyaxisvalues, f.showyaxisvalue, 1);
            T = a(f.showyaxislimits, f.showlimits, t);
            S = a(f.showdivlinevalue, f.showdivlinevalues, t);
            g || (v = a(f.showaxislines, f.drawAxisLines, 0), da = a(f.axislinethickness,
                1), Q = a(f.axislinealpha, 100), 100 < Q && (Q = 100), W = C(b(f.axislinecolor, "#000000"), Q), h.showLine = a(f.showyaxisline, v), w = k.showLine = a(f.showxaxisline, v), ha = k.lineThickness = a(f.xaxislinethickness, da), h.lineThickness = a(f.yaxislinethickness, da), D = k.lineAlpha = a(f.xaxislinealpha, Q), 100 < D && (D = k.lineAlpha = 100), ia = h.lineAlpha = a(f.yaxislinealpha, Q), 100 < ia && (ia = h.lineAlpha = 100), k.lineColor = C(b(f.xaxislinecolor, W), D), h.lineColor = C(b(f.yaxislinecolor, W), ia), c.chart.xAxisLineVisible = w && !!ha && 0 < D);
            this.axisMinMaxSetter(h,
                l, A, n, m, p, s, q);
            this.configurePlotLines(f, c, h, l, T, S, sa, e.numberFormatter, !1);
            h.reversed && 0 <= h.min && (c.plotOptions.series.threshold = h.max);
            e.isDual && (h = c.yAxis[1], l = e[1], T = a(f.showsecondarylimits, T), S = a(f.showdivlinesecondaryvalue, t), na ? (k = c.yAxis[0], h.min = k.min, h.max = k.max, h.tickInterval = k.tickInterval, delete l.max, delete l.min) : (A = H.getCleanValue(f.syaxismaxvalue), n = H.getCleanValue(f.syaxisminvalue), E = a(f.setadaptivesymin, E), p = m = !E, this.axisMinMaxSetter(h, l, A, n, m, p, s, q)), g || (h.showLine = a(f.showsyaxisline,
                v), h.lineThickness = a(f.syaxislinethickness, da), g = h.lineAlpha = a(f.syaxislinealpha, Q), 100 < g && (g = 100), h.lineColor = C(b(f.syaxislinecolor, W), g)), this.configurePlotLines(f, c, h, l, T, S, sa, e.numberFormatter, !0), h.title.text = N(f.syaxisname))
        }, pointValueWatcher: function (c, d, e, k, f, g, h) {
            c = c[z];
            var l;
            if (null !== d)return e = a(e, 0), c[e] || (c[e] = {}), e = c[e], k && (this.distributedColumns && (c.marimekkoTotal += d), k = e.stack, f = a(f, 0), g = a(g, 0), h = b(h, Za), k[h] || (k[h] = []), h = k[h], h[g] || (h[g] = []), g = h[g], g[f] || (g[f] = {}), f = g[f], 0 <= d ?
                f.p ? (l = f.p, d = f.p += d) : f.p = d : f.n ? (l = f.n, d = f.n += d) : f.n = d), e.max = e.max > d ? e.max : d, e.min = e.min < d ? e.min : d, l
        }, parseSeriesHoverOptions: function (c, d, e) {
            c = d.chart.plotHoverEffects;
            d = {enabled: b(e.showhovereffect, e.hovereffect, c.enabled)};
            d.highlight = a(e.highlightonhover, e.highlightplotonhover, c.highlight);
            d.columnHighlight = a(d.highlight, e.highlightcolumnonhover, e.highlightbaronhover, c.columnHighlight);
            d.anchorHighlight = a(d.highlight, e.highlightanchoronhover, c.anchorHighlight);
            d.anchorHighlight = a(d.highlight,
                e.highlightimageonhover, c.imageHighlight);
            d.bubbleHighlight = a(d.highlight, e.highlightbubbleonhover, e.highlightbaronhover, c.bubbleHighlight);
            d.imageHoverAlpha = b(e.anchorimagehoveralpha, c.anchorImageHoverAlpha);
            d.imageHoverScale = b(e.anchorimagehoverscale, c.anchorImageHoverScale);
            d.color = b(e.hovercolor, e.bubblehovercolor, c.color);
            d.alpha = b(e.hoveralpha, c.alpha);
            d.scale = b(e.hoverscale, e.bubblehoverscale, c.scale);
            d.gradientColor = void 0 !== e.hovergradientcolor ? e.hovergradientcolor : c.gradientColor;
            d.ratio =
                b(e.hoverratio, c.ratio);
            d.angle = b(e.hoverangle, c.angle);
            d.borderColor = b(e.borderhovercolor, c.borderColor);
            d.borderAlpha = b(e.borderhoveralpha, c.borderAlpha);
            d.borderThickness = a(e.borderhoverthickness, c.borderThickness);
            d.borderDashed = a(e.borderhoverdashed, c.borderDashed);
            d.borderDashGap = a(e.borderhoverdashgap, c.borderDashGap);
            d.borderDashLen = a(e.borderhoverdashlen, c.borderDashLen);
            d.shadow = b(e.hovershadow, c.shadow);
            d.anchorSides = b(e.anchorhoversides, c.anchorSides);
            d.anchorRadius = b(e.anchorhoverradius,
                c.anchorRadius);
            d.anchorScale = b(e.anchorhoverscale, c.anchorScale);
            d.anchorAlpha = b(e.anchorhoveralpha, e.hoveralpha, c.anchorAlpha);
            d.anchorBgColor = b(e.anchorbghovercolor, e.anchorhovercolor, c.anchorBgColor);
            d.anchorBgAlpha = b(e.anchorbghoveralpha, c.anchorBgAlpha);
            d.anchorBorderColor = b(e.anchorborderhovercolor, c.anchorBorderColor);
            d.anchorBorderAlpha = b(e.anchorborderhoveralpha, c.anchorBorderAlpha);
            d.anchorBorderThickness = a(e.anchorborderhoverthickness, c.anchorBorderThickness);
            d.anchorStartAngle = b(e.anchorhoverstartangle,
                c.anchorStartAngle);
            d.anchorDip = b(e.anchorhoverdip, c.anchorDip);
            d.anchorAnimation = a(e.anchorhoveranimation, c.anchorAnimation, 1);
            d.negativeColor = b(e.negativehovercolor, c.negativeColor);
            d.is3DBubble = a(e.is3donhover, c.is3DBubble);
            return d
        }, pointHoverOptions: function (c, d, k) {
            var g, f, h, l = {};
            g = d.hoverEffects;
            d = a(c.hovereffect, g && g.enabled);
            f = !1;
            var A = {enabled: d}, n = k && p + k.plotType.toLowerCase();
            if (void 0 === d)if (this.forceHoverEnable)f = d = A.enabled = !0; else {
                "anchor" == n && (f = k.imageUrl ? d = A.enabled = void 0 !== b(c.anchorimagehoveralpha,
                    g.imageHoverAlpha, c.anchorimagehoverscale, g.imageHoverScale, void 0) : d = A.enabled = void 0 !== b(c.hovercolor, c.anchorhovercolor, c.anchorbghovercolor, g.anchorBgColor, g.color, c.hoveralpha, c.anchorhoveralpha, g.anchorAlpha, c.bghoveralpha, c.anchorbghoveralpha, g.anchorBgAlpha, c.anchorborderhovercolor, c.borderhovercolor, g.anchorBorderColor, c.anchorborderhoverthickness, c.borderhoverthickness, g.anchorBorderThickness, c.anchorborderhoveralpha, c.borderhoveralpha, g.anchorBorderAlpha, c.hoverdip, c.anchorhoverdip, g.anchorDip,
                    c.anchorhoverstartangle, g.anchorStartAngle, c.hoversides, c.anchorhoversides, g.anchorSides, c.hoverradius, c.anchorhoverradius, g.anchorRadius, void 0));
                if ("column" == n || "bubble" == n)f = d = A.enabled = void 0 !== b(c.hoveralpha, g.alpha, c.hovergradientcolor, g.gradientColor, c.borderhovercolor, g.borderColor, c.borderhoverthickness, g.borderThickness, c.hoverratio, g.ratio, c.hoverangle, g.angle, c.borderhoveralpha, g.borderAlpha, c.borderhoverdashed, g.borderDashed, c.borderhoverdashgap, g.borderDashGap, c.borderhoverdashlen, g.borderDashLen,
                    c.hovercolor, g.color, void 0);
                f || "bubble" != n || (f = d = A.enabled = void 0 !== b(c.negativehovercolor, g.negativeColor, c.is3donhover, g.is3DBubble, c.hoverscale, g.scale, void 0));
                "pie" == n && (f = d = A.enabled = void 0 !== b(c.hovercolor, g.color, c.hoveralpha, g.alpha, c.borderhovercolor, g.borderColor, c.borderhoverthickness, g.borderThickness, c.borderhoveralpha, g.borderAlpha, void 0))
            }
            if (d) {
                A.highlight = a(c.highlightonhover, g.highlight);
                A.columnHighlight = a(A.highlight, c.highlightcolumnonhover, c.highlightbaronhover);
                A.anchorHighlight =
                    a(A.highlight, c.highlightanchoronhover);
                A.bubbleHighlight = a(A.highlight, c.highlightbubbleonhover);
                A.alpha = b(c.hoveralpha, g.alpha, k.alpha);
                A.scale = b(c.hoverscale, g.scale, 1);
                A.gradientColor = void 0 === c.hovergradientcolor ? g.gradientColor : c.hovergradientcolor;
                A.borderColor = b(c.borderhovercolor, g.borderColor, k.borderColor);
                A.borderThickness = a(c.borderhoverthickness, g.borderThickness, k.borderWidth);
                A.ratio = b(c.hoverratio, g.ratio, k.ratio);
                A.angle = b(c.hoverangle, g.angle, k.angle);
                A.borderAlpha = b(c.borderhoveralpha,
                    g.borderAlpha, k.borderAlpha);
                A.borderDashed = a(c.borderhoverdashed, g.borderDashed, k.borderDashed, 0);
                A.borderDashGap = a(c.borderhoverdashgap, g.borderDashGap, k.borderDashGap);
                A.borderDashLen = a(c.borderhoverdashlen, g.borderDashLen, k.borderDashLen);
                A.shadow = b(c.hovershadow, g.shadow, 0);
                A.color = b(c.hovercolor, g.color);
                "anchor" == n && (k.imageUrl ? (A.imageHoverAlpha = a(c.anchorimagehoveralpha, g.imageHoverAlpha, 100), A.imageHoverScale = k.imageScale * ba(a(c.anchorimagehoverscale, g.imageHoverScale, 110)) * .01, A.anchorAnimation =
                    a(c.anchorhoveranimation, g.anchorAnimation, 1)) : (A.anchorColor = L(b(c.hovercolor, c.anchorhovercolor, c.anchorbghovercolor, g.anchorBgColor, g.color, k.anchorBgColor)), A.anchorAlpha = b(c.hoveralpha, c.anchorhoveralpha, g.anchorAlpha, k.anchorAlpha), A.anchorBgAlpha = b(c.bghoveralpha, c.anchorbghoveralpha, g.anchorBgAlpha, A.anchorAlpha, k.anchorBgAlpha), A.anchorBorderColor = b(c.anchorborderhovercolor, c.borderhovercolor, g.anchorBorderColor, k.anchorBorderColor), A.anchorBorderThickness = b(c.anchorborderhoverthickness,
                    c.borderhoverthickness, g.anchorBorderThickness, k.anchorBorderThickness), A.anchorBorderAlpha = a(c.anchorborderhoveralpha, c.borderhoveralpha, g.anchorBorderAlpha, A.anchorAlpha, k.anchorBorderAlpha), A.anchorDip = a(c.hoverdip, c.anchorhoverdip, g.anchorDip), A.startAngle = b(c.anchorhoverstartangle, g.anchorStartAngle, k.anchorAngle), A.anchorSides = a(c.hoversides, c.anchorhoversides, g.anchorSides, k.anchorSides), A.anchorRadius = a(c.hoverradius, c.anchorhoverradius, g.anchorRadius), A.anchorScale = a(c.hoverscale, c.anchorhoverscale,
                    g.anchorScale), A.anchorAnimation = a(c.anchorhoveranimation, g.anchorAnimation, 1), void 0 === A.anchorRadius && (A.anchorRadius = !f || A.anchorHighlight ? k.anchorRadius && k.anchorRadius + 1 : k.anchorRadius)));
                if (f || (A.columnHighlight || A.bubbleHighlight) && A.color && 1 == A.highlight)A.highlight = 0;
                "column" == n && (A.color = (b(A.color, k.color) + Da + (void 0 === A.gradientColor ? k.gradientColor : A.gradientColor)).replace(/,+?$/, ""));
                "pie" === n && (A.color = b(A.color, k.color).replace(/,+?$/, ""));
                "bubble" == n && (A.negativeColor = b(c.negativehovercolor,
                    g.negativeColor, k.negativeColor), A.is3d = a(c.is3donhover, g.is3DBubble, k.is3d), A.color = A.negativeColor && 0 > c.z ? A.negativeColor : A.color || k.color, h = "string" == typeof A.color, A.color = L(h ? A.color : A.color.FCcolor.color), A.color = A.is3d ? V.bubble.getPointColor(A.color, A.alpha) : {
                    FCcolor: {
                        color: A.color,
                        alpha: A.alpha
                    }
                });
                if (1 == A.highlight && "anchor" !== n) {
                    c = (h = "string" == typeof A.color) ? A.color.split(/\s{0,},\s{0,}/) : A.color.FCcolor.color.split(/\s{0,},\s{0,}/);
                    g = c.length;
                    for (f = 0; f < g; f++)c[f] = Y(c[f], 70);
                    h ? A.color = c.join(",") :
                        A.color.FCcolor.color = c.join(",")
                }
                "pie" === n && (l = {
                    color: this.getPointColor(A.color, A.alpha, k.radius3D),
                    alpha: A.alpha,
                    borderColor: C(A.borderColor, A.borderAlpha),
                    borderWidth: A.borderThickness
                });
                "column" == n && (A.colorArr = ma(A.color, A.alpha, A.ratio, A.angle, k.isRoundEdged, A.borderColor, $(A.alpha, A.borderAlpha).toString(), k.isBar, k.is3d), A.dashStyle = A.borderDashed ? e(A.borderDashLen, A.borderDashGap, A.borderThickness) : "none", l = {
                    shadow: A.shadow, color: A.colorArr[0], borderColor: A.colorArr[1], borderWidth: A.borderThickness,
                    use3DLighting: k.use3DLighting, dashStyle: A.dashStyle
                });
                "anchor" == n && (l = k.imageUrl ? {
                    animation: A.anchorAnimation,
                    imageHoverAlpha: A.imageHoverAlpha,
                    imageHoverScale: A.imageHoverScale
                } : {
                    animation: A.anchorAnimation,
                    shadow: A.shadow,
                    fillColor: {FCcolor: {color: A.anchorColor, alpha: A.anchorBgAlpha * A.anchorAlpha / 100 + p}},
                    lineColor: {FCcolor: {color: A.anchorBorderColor, alpha: A.anchorBorderAlpha}},
                    lineWidth: A.anchorBorderThickness,
                    radius: A.anchorRadius,
                    symbol: oa(A.anchorSides),
                    startAngle: A.startAngle,
                    sides: A.anchorSides,
                    scale: A.anchorScale,
                    dip: A.anchorDip
                });
                "bubble" == n && (l = {
                    symbol: A.seriesAnchorSymbol,
                    shadow: A.shadow,
                    scale: A.scale,
                    fillColor: A.color,
                    lineColor: {FCcolor: {color: A.borderColor, alpha: A.alpha}},
                    lineWidth: A.borderThickness
                })
            }
            return {enabled: d, options: A, rolloverOptions: l}
        }, getPointStub: function (c, d, e, k) {
            var f = this.dataObj.chart;
            k = k[z];
            d = null === d ? d : k.numberFormatter.dataLabels(d);
            var g = G(N(b(c.tooltext, k.tooltext))), A = G(N(c.displayvalue)), f = k.showTooltip ? void 0 !== g ? h(g, [1, 2, 3, 5, 6, 7], {
                formattedValue: d, label: e,
                yaxisName: N(f.yaxisname), xaxisName: N(f.xaxisname)
            }, c, f) : null === d ? !1 : e !== p ? e + k.tooltipSepChar + d : d : p;
            k = a(c.showvalue, k.showValues) ? void 0 !== A ? A : d : p;
            c = b(c.link);
            return {displayValue: k, categoryLabel: e, toolText: f, link: c}
        }, updateSnapPoints: function () {
            var a = this, b = a.snapLiterals, c = function (a, b) {
                var c = 0;
                switch (a) {
                    case "startx":
                        c = b.x;
                        break;
                    case "starty":
                        c = b.y;
                        break;
                    case "x":
                    case "middlex":
                    case "centerx":
                        c = b.x + b.width / 2;
                        break;
                    case "y":
                    case "middley":
                    case "centery":
                        c = b.y + b.height / 2;
                        break;
                    case "endx":
                        c = b.x + b.width;
                        break;
                    case "endy":
                        c = b.y + b.height;
                        break;
                    default:
                        c = 0
                }
                return c
            };
            b.dataset = function (b, d) {
                var e = a.renderer && a.renderer.plots, k, g, h, A;
                h = a.is3D;
                if (!e || !e.length)return 0;
                isNaN(b[0]) ? k = 0 : (k = Number(b[0]), b = b.slice(1));
                g = b[0];
                if ("set" === g) {
                    isNaN(b[1]) ? (A = 0, b = b.slice(1)) : (A = Number(b[1]), b = b.slice(2));
                    g = b[0];
                    e = (e = e[k] && e[k].items[A]) && e.graphic;
                    if (!e)return 0;
                    h = d && h ? e._getBBox2() : e.getBBox();
                    A = c(g, h)
                }
                return A
            };
            b.xaxis = function (b) {
                var d = a.renderer && a.renderer.xAxis && a.renderer.xAxis[0] && a.renderer.xAxis[0].labels,
                    e, k;
                if (!d || !d.length)return 0;
                k = b[0];
                if ("label" === k) {
                    isNaN(b[1]) ? (e = 0, b = b.slice(1)) : (e = Number(b[1]), b = b.slice(2));
                    k = b[0];
                    b = d[e];
                    if (!b)return 0;
                    b = b.getBBox();
                    e = c(k, b)
                }
                return e
            };
            b.yaxis = function (b) {
                var d = a.renderer && a.renderer.yAxis, e, k;
                if (!d || !d.length)return 0;
                isNaN(b[0]) ? e = 0 : (e = Number(b[0]), b = b.slice(1));
                e = d[e];
                if (!e)return 0;
                d = b[0];
                if ("label" === d) {
                    k = e.labels;
                    isNaN(b[1]) ? (e = 0, b = b.slice(1)) : (e = Number(b[1]), b = b.slice(2));
                    d = b[0];
                    b = k[e];
                    if (!b)return 0;
                    b = b.getBBox();
                    k = c(d, b)
                }
                return k
            }
        }
    }, V.base);
    V("multiseries",
        {
            series: function (b, d, e) {
                var k, f, g = d[z], h, A;
                d.legend.enabled = Boolean(a(b.chart.showlegend, 1));
                if (b.dataset && 0 < b.dataset.length) {
                    this.categoryAdder(b, d);
                    k = 0;
                    for (f = b.dataset.length; k < f; k += 1)h = b.dataset[k], A = {
                        hoverEffects: this.parseSeriesHoverOptions(b, d, h, e),
                        visible: !a(h.initiallyhidden, 0),
                        data: []
                    }, this.isStacked || (A.numColumns = f), h = this.point(e, A, h, b.chart, d, g.oriCatTmp.length, k), h instanceof Array ? d.series = d.series.concat(h) : d.series.push(h);
                    this.configureAxis(d, b);
                    b.trendlines && !this.isLog && c(b.trendlines,
                        d.yAxis, g, !1, this.isBar, void 0, this.inversed)
                }
            }, categoryAdder: function (b, c) {
            var d, e = 0, f = c[z], k = f.axisGridManager, g = b.chart, h = c.xAxis, A, f = f.x, n, m, E, s;
            if (b.categories && b.categories[0] && b.categories[0].category)for (b.categories[0].font && (c.xAxis.labels.style.fontFamily = b.categories[0].font), void 0 !== (d = a(b.categories[0].fontsize)) && (1 > d && (d = 1), c.xAxis.labels.style.fontSize = d + Ca, I(c.xAxis.labels.style)), b.categories[0].fontcolor && (c.xAxis.labels.style.color = b.categories[0].fontcolor.split(Da)[0].replace(/^\#?/,
                "#")), m = c[z].oriCatTmp, E = b.categories[0].category, d = 0; d < E.length; d += 1)E[d].vline ? k.addVline(h, E[d], e, c) : (n = a(E[d].showlabel, g.showlabels, 1), s = b.categories[0].category[d], A = N(l(s.label, s.name)), k.addXaxisCat(h, e, e, n ? A : p, {}, s, g), m[e] = l(N(s.tooltext), A), e += 1);
            f.catCount = e
        }, getPointStub: function (c, d, e, k, f, g, A, n, m, E) {
            var s = this.dataObj.chart, q = this.isDual, t = this.isXY, T = this.isMLAxis, S = this.isStacked, v = this.isErrorChart, w;
            k = k[z];
            var W, da, C = null === d ? d : this.numberFormatter.dataLabels(d, A), ha, Q = G(N(b(c.tooltext,
                f.plottooltext, k.tooltext))), D = k.tooltipSepChar, ia, H = {}, na, sa, J, K, ra, M, Na, Fa, I;
            v && (sa = null === n ? n : this.numberFormatter.dataLabels(n, A), M = null === d ? p : this.numberFormatter.percentValue(n / d * 100), ia = [1, 2, 3, 4, 5, 6, 7, 99, 100, 101, 102], d = {
                yaxisName: K = N(q ? A ? s.syaxisname : s.pyaxisname : s.yaxisname),
                xaxisName: ra = N(s.xaxisname),
                formattedValue: C,
                label: e,
                errorDataValue: sa,
                errorPercentValue: M
            }, t ? (J = null === m ? m : this.numberFormatter.xAxis(m), Na = null === E ? p : this.numberFormatter.percentValue(m / E * 100), ia.push(103, 104, 105, 106,
                107, 108, 109, 110), I = b(c.horizontalerrorvalue, c.errorvalue), d.errorValue = Fa = b(c.verticalerrorvalue, c.errorvalue), E = G(N(b(c.verticalerrorplottooltext, c.errorplottooltext, f.verticalerrorplottooltext, f.errorplottooltext, s.verticalerrorplottooltext, s.errorplottooltext))), null !== n && (d.verticalErrorDataValue = sa, d.verticalErrorPercentValue = M, d.verticalErrorValue = Fa), null !== m && (d.horizontalErrorDataValue = J, d.horizontalErrorPercentValue = Na, d.horizontalErrorValue = I), na = G(N(b(c.horizontalerrorplottooltext, c.errorplottooltext,
                f.horizontalerrorplottooltext, f.errorplottooltext, s.horizontalerrorplottooltext, s.errorplottooltext))), H._hErrortoolText = k.showTooltip ? void 0 !== na ? h(na, ia, {
                yaxisName: K = N(q ? A ? s.syaxisname : s.pyaxisname : s.yaxisname),
                xaxisName: ra = N(s.xaxisname),
                formattedValue: C,
                label: e,
                errorDataValue: J,
                errorPercentValue: Na,
                errorValue: I,
                verticalErrorDataValue: sa,
                verticalErrorPercentValue: M,
                verticalErrorValue: Fa,
                horizontalErrorDataValue: J,
                horizontalErrorPercentValue: Na,
                horizontalErrorValue: I
            }, c, s, f) : null === n ? !1 : J : !1) : (E =
                G(N(b(c.errorplottooltext, f.errorplottooltext, s.errorplottooltext))), d.errorValue = Fa = b(c.errorvalue)), H._errortoolText = k.showTooltip ? void 0 !== E ? h(E, ia, d, c, s, f) : null === n ? !1 : sa : !1);
            k.showTooltip ? void 0 !== Q ? (S = [4, 5, 6, 7], A = {
                yaxisName: K || N(q ? A ? s.syaxisname : s.pyaxisname : T ? f._yAxisName : s.yaxisname),
                xaxisName: ra || N(s.xaxisname)
            }, t ? (S.push(8, 9, 10, 11), A.yDataValue = C, A.xDataValue = e, v && (S.push(103, 104, 105, 106, 107, 108, 109, 110), null !== n && (A.verticalErrorDataValue = sa, A.verticalErrorPercentValue = M, A.verticalErrorValue =
                Fa), null !== m && (A.horizontalErrorDataValue = J, A.horizontalErrorPercentValue = Na, A.horizontalErrorValue = I))) : (S.push(1, 2, 3), A.formattedValue = C, A.label = e, v && (S.push(99, 100, 101, 102), A.errorValue = Fa, null !== n && (A.errorDataValue = sa, A.errorPercentValue = M))), f = h(Q, S, A, c, s, f)) : null === C ? f = !1 : (k.seriesNameInToolTip && (ha = l(f && f.seriesname)), f = ha ? ha + D : p, f += e ? e + D : p, k.showPercentInToolTip && S ? (da = !0, f += "$percentValue") : f += C) : f = !1;
            a(c.showvalue, g) ? void 0 !== G(c.displayvalue) ? w = N(c.displayvalue) : k.showPercentValues ? W = !0 : w = C : w = p;
            H.link = b(c.link);
            H.displayValue = w;
            H.categoryLabel = e;
            H.toolText = f;
            H.showPercentValues = W;
            H.showPercentInToolTip = da;
            return H
        }
        }, V.singleseries);
    V("xybase", {
        hideRLine: function () {
            var a = this.chart.series[this.index + 1];
            a && a.hide && a.hide()
        }, showRLine: function () {
            var a = this.chart.series[this.index + 1];
            a && a.show && a.show()
        }, getRegressionLineSeries: function (a, b, c) {
            var d, f, e, k;
            k = a.sumXY;
            var g = a.sumX, h = a.sumY;
            f = a.xValues;
            e = a.sumXsqure;
            d = a.yValues;
            a = a.sumYsqure;
            b ? (f.sort(Ob), d = f[0], f = f[f.length - 1], k = (c *
            k - g * h) / (c * e - ea(g, 2)), e = isNaN(k) ? h / c : k * (d - g / c) + h / c, c = isNaN(k) ? h / c : k * (f - g / c) + h / c, c = [{
                x: d,
                y: e
            }, {
                x: f,
                y: c
            }]) : (d.sort(Ob), e = d[0], d = d[d.length - 1], k = (c * k - g * h) / (c * a - ea(h, 2)), f = isNaN(k) ? g / c : k * (e - h / c) + g / c, c = isNaN(k) ? g / c : k * (d - h / c) + g / c, c = [{
                x: f,
                y: e
            }, {x: c, y: d}]);
            return c
        }, pointValueWatcher: function (a, b, c, d) {
            var f = a[z];
            null !== b && (a = f[0], a.max = a.max > b ? a.max : b, a.min = a.min < b ? a.min : b);
            null !== c && (a = f.x, a.max = a.max > c ? a.max : c, a.min = a.min < c ? a.min : c);
            d && (c = c || 0, b = b || 0, d.sumX += c, d.sumY += b, d.sumXY += c * b, d.sumXsqure += ea(c, 2),
                d.xValues.push(c), d.sumYsqure += ea(b, 2), d.yValues.push(b))
        }
    }, V.multiseries);
    V("scrollbase", {
        postSeriesAddition: function () {
            var c = this.hcJSON, d = c.xAxis.scroll, e = c[z], k = e.width, f = e.x.catCount, g = this.dataObj.chart, h = this.colorManager, A, l, n, m, p, E;
            e.isScroll = !0;
            c.chart.hasScroll = !0;
            if (this.isStacked)A = 1; else {
                l = A = 0;
                m = c.series;
                E = c.chart.defaultSeriesType;
                for (n = m.length; l < n; l++)p = b(m[l].type, E), "column" === p && (A += 1);
                1 > A && (A = 1)
            }
            f *= A;
            k = a(g.numvisibleplot, la(k / this.avgScrollPointWidth));
            d && 2 <= k && k < f && (d.enabled = !0, d.vxLength = k / A, d.startPercent = $(1, U(0, parseFloat(g.scrolltoend) || 0)), d.padding = a(g.scrollpadding, 0), d.height = a(g.scrollheight, 16), d.showButtons = !!a(g.scrollshowbuttons, 1), d.buttonPadding = a(g.scrollbtnpadding, 0), d.color = L(b(g.scrollcolor, h.getColor("altHGridColor"))), e.marginBottomExtraSpace += d.padding + d.height);
            if (Na || a(g.enabletouchscroll, 0))c.chart.zoomType = "x", c.chart.nativeZoom = !1, c.chart.selectionMarkerFill = "rgba(255,255,255,0)", (c.callbacks || (c.callbacks = [])).push(function (a) {
                J(a, "selectionstart selectiondrag",
                    V.scrollbase.performTouchScroll, {})
            })
        }, performTouchScroll: function (a) {
            var b = this.xAxis[0].scroller, c = b.config, c = c.trackLength / (c.width / c.scrollRatio) * (a.chartX || 1);
            !0 !== a.isOutsidePlot && sa(b.elements.anchor.element, "selectionstart" === a.type ? "dragstart" : "drag", {
                pageX: -c,
                pageY: -a.chartY
            })
        }
    }, V.multiseries);
    V("logbase", {
        isLog: !0, isValueAbs: !0, configureAxis: function (d, e) {
            var k = d[z], h = k.axisGridManager, f = this.numberFormatter, A = d.series, l = d.xAxis, n = d.yAxis[0], m = k[0], E = e.chart, s = !a(E.showyaxislimits, E.showlimits,
                E.showyaxisvalues, 1), q = !a(E.showdivlinevalues, E.showyaxisvalues, 1), t = a(E.base, E.logbase, 10), T = a(E.yaxismaxvalue), S = a(E.yaxisminvalue), v = this.colorManager, w = 1 === a(E.showminordivlinevalues), W = b(E.minordivlinecolor, n.gridLineColor, v.getColor("divLineColor")), da = a(E.minordivlinealpha, E.divlinealpha, v.getColor("divLineAlpha")), v = [n, void 0, void 0, a(E.divlinethickness, 2), n.gridLineDashStyle, n.gridLineColor, 2], W = [n, void 0, void 0, a(E.minordivlinethickness, 1), n.gridLineDashStyle, C(b(E.minordivlinecolor, W),
                a(E.minordivlinealpha, da / 2)), 2], da = w || da && W[3], Q = a(E.showaxislimitgridlines, this.showAxisLimitGridLines), D = a(Q, this.is3D || d.chart.plotBorderWidth ? 0 : 1), ia, H;
            0 >= t && (t = 10);
            0 >= T && (T = void 0);
            0 >= S && (S = void 0);
            T = this.getLogAxisLimits(m.max || t, m.min || 1, T, S, t, da ? E.numminordivlines : 0);
            l.title.text = N(E.xaxisname);
            l.showLine = a(E.showxaxisline, E.showaxislines, 0);
            l.lineThickness = a(E.xaxislinethickness, E.axislinethickness, 1);
            l.lineAlpha = a(E.xaxislinealpha, E.axislinealpha, 100);
            l.lineColor = C(b(E.xaxislinecolor, E.axislinecolor,
                "000"));
            g(n, {
                title: {text: N(E.yaxisname)},
                labels: {enabled: !1},
                gridLineWidth: 0,
                alternateGridColor: xa,
                reversed: "1" === E.invertyaxis,
                max: ha(T.Max, t),
                min: ha(T.Min, t),
                showLine: a(E.showyaxisline, E.showaxislines, 0),
                lineThickness: a(E.yaxislinethickness, E.axislinethickness, 1),
                lineAlpha: a(E.yaxislinealpha, E.axislinealpha, 100),
                lineColor: C(b(E.yaxislinecolor, E.axislinecolor, "000"))
            });
            for (E = A.length; E--;)if (S = A[E])for (S.threshold = n.min, H = (S = S.data) && S.length || 0; H--;)ia = S[H], ia.y = ha(ia.y, t);
            delete m.max;
            delete m.min;
            m.isLog = !0;
            n.reversed && 0 <= n.min && (d.plotOptions.series.threshold = n.max);
            e.trendlines && c(e.trendlines, [{
                max: T.Max,
                min: T.Min,
                plotLines: n.plotLines,
                plotBands: n.plotBands,
                title: n.title
            }], k);
            for (E = n.plotLines.length; E--;)ia = n.plotLines[E], ia.value && (ia.value = ha(ia.value, t)), ia.from && (ia.from = ha(ia.from, t)), ia.to && (ia.to = ha(ia.to, t));
            for (E = n.plotBands.length; E--;)ia = n.plotBands[E], ia.from && (ia.from = ha(ia.from, t)), ia.to && (ia.to = ha(ia.to, t));
            for (E = T.divArr.length; E--;) {
                ia = T.divArr[E];
                if (ia.ismajor)v[1] = ha(ia.value,
                    t), v[2] = f.yAxis(ia.value), h.addAxisGridLine.apply(h, v); else if (da || ia.isextreme)W[1] = ha(ia.value, t), W[2] = w || ia.isextreme ? f.yAxis(ia.value) : p, h.addAxisGridLine.apply(h, W);
                S = n.plotLines[n.plotLines.length - 1];
                ia.isextreme ? (S.width = Q || D && (!ia.isMin || !l.showLine) ? S.width : .1, s && (S.label.text = p)) : q && S.label && (S.label.text = p)
            }
        }, getLogAxisLimits: function (a, b, c, d, f, e) {
            var k = function (a) {
                return null === a || void 0 === a || "" === a || isNaN(a) ? !1 : !0
            }, g = 0, h = [], A, l, n, E, m, p, s, q;
            k(c) && Number(c) >= a ? a = Number(c) : (c = 1 < f ? Ba(ga(a) /
            ga(f)) : la(ga(a) / ga(f)), a = ea(f, c), l = c);
            l || (l = 1 < f ? Ba(ga(a) / ga(f)) : la(ga(a) / ga(f)));
            k(d) && Number(d) <= b ? b = Number(d) : (c = 1 < f ? la(ga(b) / ga(f)) : Ba(ga(b) / ga(f)), b = ea(f, c), A = c);
            A || (A = 1 < f ? la(ga(b) / ga(f)) : Ba(ga(b) / ga(f)));
            d = Number(String(ga(f) / ga(10)));
            e = Number(e) || (la(d) == d ? 8 : 4);
            1 < f ? (n = l, E = A) : 0 < f && 1 > f && (n = A, E = l);
            d = l;
            for (A = n; A >= E; --A)if (n = ea(f, d), b <= n && a >= n && (h[g++] = {value: n, ismajor: !0}), A != E) {
                l = 1 < f ? -1 : 1;
                n = ea(f, d) - ea(f, d + l);
                c = n / (e + 1);
                for (k = 1; k <= e; ++k)n = ea(f, d + l) + c * k, b <= n && a >= n && (h[g++] = {
                    value: n,
                    ismajor: !1
                });
                1 <
                f ? d-- : d++
            }
            for (s in h)for (q in h[s])"value" == q && (m || (m = h[s][q] == b && (h[s].isextreme = h[s].isMin = !0)), p || (p = h[s][q] == a && (h[s].isextreme = h[s].isMax = !0)));
            m || (h[g++] = {value: b, ismajor: !0, isMin: !0, isextreme: !0});
            p || (h[g] = {value: a, ismajor: !0, isMax: !0, isextreme: !0});
            return {Max: a, Min: b, divArr: h}
        }, pointValueWatcher: function (b, c, d) {
            b = b[z];
            d = a(d, 0);
            0 < c && (b[d] || (b[d] = {}), d = b[d], d.max = d.max > c ? d.max : c, d.min = d.min < c ? d.min : c)
        }
    }, V.mslinebase);
    Ra = V.singleseries;
    ib = V.multiseries;
    V("column2dbase", {
        point: function (c, d, k,
                         h, f) {
            var A = k.length, n = f[z], E = n.axisGridManager, m = f.xAxis, n = n.x, s = this.colorManager, q = /3d$/.test(f.chart.defaultSeriesType), t = this.isBar, T = /^spark/i.test(c);
            c = b(h.showplotborder, T || q ? Ea : Ka) === Ka ? q ? 1 : a(h.plotborderthickness, 1) : 0;
            var S = f.chart.useRoundEdges, v = a(h.plotborderalpha, h.plotfillalpha, 100), W = b(h.plotbordercolor, s.getColor("plotBorderColor")).split(Da)[0], T = T ? "" : a(h.useplotgradientcolor, 1) ? P(h.plotgradientcolor, s.getColor("plotGradientColor")) : p, w = 0, da = Boolean(a(h.use3dlighting, 1)), C = f[z].numberFormatter,
                ha, Q = a(h.plotborderdashed, 0), ia = a(h.plotborderdashlen, 5), D = a(h.plotborderdashgap, 4), H, sa, na, J, G, K, M, ra, Na, Fa, I, Wa, ca, L;
            for (na = 0; na < A; na += 1)ca = k[na], ca.vline ? E.addVline(m, ca, w, f) : (sa = C.getCleanValue(ca.value), ha = a(ca.showlabel, h.showlabels, 1), J = N(l(ca.label, ca.name)), H = b(ca.color, s.getPlotColor()), G = b(ca.alpha, h.plotfillalpha, Xa), K = b(ca.ratio, h.plotfillratio), M = b(360 - h.plotfillangle, t ? 180 : 90), ra = b(ca.alpha, v), Na = a(ca.dashed, Q), Fa = b(ca.dashgap, D), I = b(ca.dashlen, ia), E.addXaxisCat(m, w, w, ha ? J : p, ca, {},
                h, H), w += 1, 0 > sa && (M = t ? 180 - M : 360 - M), L = {opacity: G / 100}, Wa = ma(H + Da + T.replace(/,+?$/, ""), G, K, M, S, W, ra + p, t, q), ha = Na ? e(I, Fa, c) : "none", H = this.pointHoverOptions(ca, d, {
                plotType: "column",
                is3d: q,
                isBar: t,
                use3DLighting: da,
                isRoundEdged: S,
                color: H,
                gradientColor: T,
                alpha: G,
                ratio: K,
                angle: M,
                borderWidth: c,
                borderColor: W,
                borderAlpha: ra,
                borderDashed: Na,
                borderDashGap: Fa,
                borderDashLen: I,
                shadow: L
            }), d.data.push(g(this.getPointStub(ca, sa, J, f), {
                y: sa,
                shadow: L,
                color: Wa[0],
                borderColor: Wa[1],
                borderWidth: c,
                use3DLighting: da,
                dashStyle: ha,
                tooltipConstraint: this.tooltipConstraint,
                hoverEffects: H.enabled && H.options,
                rolloverProperties: H.enabled && H.rolloverOptions
            })), this.pointValueWatcher(f, sa));
            n.catCount = w;
            return d
        }, defaultSeriesType: "column"
    }, Ra);
    V("linebase", {
        defaultSeriesType: "line", hasVDivLine: !0, defaultPlotShadow: 1, point: function (c, d, k, h, f) {
            var A, n, E, m, s, q, t, T, S, v, w, W, da, C, ha, Q, ia, D, H, sa, na, J, G, K, M, ra;
            c = f.chart;
            var Na = k.length, Fa = f.xAxis;
            A = f[z];
            var I = this.colorManager, ca, Wa = A.axisGridManager, Ja = 0, P = A.x, R = f[z].numberFormatter, wb,
                Oa, aa;
            C = L(b(h.linecolor, h.palettecolors, I.getColor("plotFillColor")));
            ha = b(h.linealpha, Xa);
            w = a(h.linethickness, this.lineThickness, 4);
            W = Boolean(a(h.linedashed, 0));
            t = a(h.linedashlen, 5);
            T = a(h.linedashgap, 4);
            M = a(h.anchorshadow, 0);
            d.color = {FCcolor: {color: C, alpha: ha}};
            d.lineWidth = w;
            d.anchorShadow = M;
            d.step = b(this.stepLine, d.step);
            d.drawVerticalJoins = Boolean(a(d.drawVerticalJoins, h.drawverticaljoins, 1));
            d.useForwardSteps = Boolean(a(d.useForwardSteps, h.useforwardsteps, 1));
            da = a(h.drawanchors, h.showanchors);
            for (n = 0; n < Na; n += 1)m = k[n], m.vline ? Wa.addVline(Fa, m, Ja, f) : (A = R.getCleanValue(m.value), s = a(m.showlabel, h.showlabels, 1), E = N(l(m.label, m.name)), Wa.addXaxisCat(Fa, Ja, Ja, s ? E : p, m, {}, h), Ja += 1, S = L(b(m.color, C)), v = a(m.alpha, ha), s = a(m.dashed, W) ? e(t, T, w) : "none", q = {opacity: v / 100}, ia = a(m.anchorsides, h.anchorsides, 0), K = a(m.anchorstartangle, h.anchorstartangle, 90), sa = a(m.anchorradius, h.anchorradius, this.anchorRadius, 3), H = L(b(m.anchorbordercolor, h.anchorbordercolor, C)), D = a(m.anchorborderthickness, h.anchorborderthickness,
                this.anchorBorderThickness, 1), na = L(b(m.anchorbgcolor, h.anchorbgcolor, I.getColor("anchorBgColor"))), J = b(m.anchoralpha, h.anchoralpha, Xa), G = b(m.anchorbgalpha, h.anchorbgalpha, J), wb = b(m.anchorimageurl, h.anchorimageurl), Oa = b(m.anchorimagescale, h.anchorimagescale, 100), aa = b(m.anchorimagealpha, h.anchorimagealpha, 100), Q = void 0 === da ? 0 !== v : !!da, ra = Boolean(a(m.anchorshadow, M, 0)), ca = this.pointHoverOptions(m, d, {
                plotType: "anchor",
                anchorBgColor: na,
                anchorAlpha: J,
                anchorBgAlpha: G,
                anchorAngle: K,
                anchorBorderThickness: D,
                anchorBorderColor: H,
                anchorBorderAlpha: J,
                anchorSides: ia,
                anchorRadius: sa,
                imageUrl: wb,
                imageScale: Oa,
                imageAlpha: aa,
                shadow: q
            }), d.data.push(g(this.getPointStub(m, A, E, f), {
                y: A,
                color: {FCcolor: {color: S, alpha: v}},
                shadow: q,
                dashStyle: s,
                valuePosition: b(m.valueposition, c.valuePosition),
                marker: {
                    enabled: !!Q,
                    shadow: ra && {opacity: J / 100},
                    fillColor: {FCcolor: {color: na, alpha: G * J / 100 + p}},
                    lineColor: {FCcolor: {color: H, alpha: J}},
                    lineWidth: D,
                    radius: sa,
                    startAngle: K,
                    symbol: oa(ia),
                    imageUrl: wb,
                    imageScale: Oa,
                    imageAlpha: aa
                },
                tooltipConstraint: this.tooltipConstraint,
                hoverEffects: ca.enabled && ca.options,
                rolloverProperties: ca.enabled && ca.rolloverOptions
            })), this.pointValueWatcher(f, A));
            P.catCount = Ja;
            return d
        }, defaultZeroPlaneHighlighted: !1
    }, Ra);
    V("area2dbase", {
        defaultSeriesType: "area", hasVDivLine: !0, point: function (c, d, k, h, f) {
            c = f.chart;
            var A = k.length, n = f.xAxis, m = f[z], E = m.axisGridManager, m = m.x, s = f[z].numberFormatter, q = this.colorManager, T = 0, S, v, w, W, da, C, ha, Q, ia, D, H, sa, na, J, K, M, ra, Na, Fa, I, ca, Wa, Ja, R, wb, Oa, aa, hb;
            da = b(h.plotfillcolor, h.areabgcolor, G(h.palettecolors) ? q.getPlotColor(0) :
                q.getColor("plotFillColor")).split(/\s*\,\s*/)[0];
            ca = Da + (a(h.useplotgradientcolor, 1) ? P(h.plotgradientcolor, q.getColor("plotGradientColor")) : p);
            C = b(h.plotfillalpha, h.areaalpha, this.isStacked ? Xa : "90");
            ha = a(h.plotfillangle, 270);
            Q = b(h.plotbordercolor, h.areabordercolor, G(h.palettecolors) ? q.getPlotColor(0) : q.getColor("plotBorderColor")).split(/\s*\,\s*/)[0];
            ia = h.showplotborder == Ea ? Ea : b(h.plotborderalpha, h.plotfillalpha, h.areaalpha, Xa);
            S = a(h.plotborderangle, 270);
            v = Boolean(a(h.plotborderdashed, 0));
            w = a(h.plotborderdashlen,
                5);
            na = a(h.plotborderdashgap, 4);
            ra = a(h.plotborderthickness, h.areaborderthickness, 1);
            Wa = d.fillColor = {FCcolor: {color: da + ca.replace(/,+?$/, ""), alpha: C, ratio: db, angle: ha}};
            d.lineWidth = ra;
            d.dashStyle = v ? e(w, na, ra) : "none";
            d.lineColor = {FCcolor: {color: Q, alpha: ia, ratio: Xa, angle: S}};
            d.step = b(this.stepLine, d.step);
            d.drawVerticalJoins = Boolean(a(d.drawVerticalJoins, h.drawverticaljoins, 1));
            d.useForwardSteps = Boolean(a(d.useForwardSteps, h.useforwardsteps, 1));
            ra = Boolean(a(h.drawanchors, h.showanchors, 1));
            d.anchorShadow =
                Ja = a(h.anchorshadow, 0);
            for (v = 0; v < A; v += 1)na = k[v], na.vline ? E.addVline(n, na, T, f) : (S = s.getCleanValue(na.value), W = a(na.showlabel, h.showlabels, 1), w = N(l(na.label, na.name)), E.addXaxisCat(n, T, T, W ? w : p, na, {}, h), T += 1, W = a(na.anchorsides, h.anchorsides, 0), sa = a(na.anchorstartangle, h.anchorstartangle, 90), D = a(na.anchorradius, h.anchorradius, 3), H = L(b(na.anchorbordercolor, h.anchorbordercolor, Q)), Na = a(na.anchorborderthickness, h.anchorborderthickness, 1), J = L(b(na.anchorbgcolor, h.anchorbgcolor, q.getColor("anchorBgColor"))),
                K = b(na.anchoralpha, h.anchoralpha, this.anchorAlpha, Ea), M = b(na.anchorbgalpha, h.anchorbgalpha, K), R = Boolean(a(na.anchorshadow, Ja, 0)), Fa = G(na.color), I = a(na.alpha), Fa = void 0 !== Fa || void 0 !== I ? {
                FCcolor: {
                    color: Fa ? L(Fa) + ca : da,
                    alpha: void 0 === I ? t(I) + p : C,
                    ratio: db,
                    angle: ha
                }
            } : Wa, wb = b(na.anchorimageurl, h.anchorimageurl), Oa = b(na.anchorimagescale, h.anchorimagescale, 100), aa = b(na.anchorimagealpha, h.anchorimagealpha, 100), I = {
                opacity: U(I, ia) / 100,
                inverted: !0
            }, hb = this.pointHoverOptions(na, d, {
                plotType: "anchor",
                anchorBgColor: J,
                anchorAlpha: K,
                anchorBgAlpha: M,
                anchorAngle: sa,
                anchorBorderThickness: Na,
                anchorBorderColor: H,
                anchorBorderAlpha: K,
                anchorSides: W,
                anchorRadius: D,
                imageUrl: wb,
                imageScale: Oa,
                imageAlpha: aa,
                shadow: I
            }), d.data.push(g(this.getPointStub(na, S, w, f), {
                y: S,
                shadow: I,
                color: Fa,
                valuePosition: b(na.valueposition, c.valuePosition),
                marker: {
                    enabled: ra,
                    shadow: R && {opacity: K / 100},
                    fillColor: {FCcolor: {color: J, alpha: M * K / 100 + p}},
                    lineColor: {FCcolor: {color: H, alpha: K}},
                    lineWidth: Na,
                    radius: D,
                    symbol: oa(W),
                    startAngle: sa,
                    imageUrl: wb,
                    imageScale: Oa,
                    imageAlpha: aa
                },
                tooltipConstraint: this.tooltipConstraint,
                previousY: this.pointValueWatcher(f, S),
                hoverEffects: hb.enabled && hb.options,
                rolloverProperties: hb.enabled && hb.rolloverOptions
            })));
            m.catCount = T;
            return d
        }
    }, Ra);
    V("mscolumn2dbase", {
        point: function (c, d, e, k, f, g, h, A, l) {
            c = a(k.ignoreemptydatasets, 0);
            var n = !1, m = e.data || [], E = f[z], s = b(d.type, this.defaultSeriesType), q = b(d.isStacked, f.plotOptions[s] && f.plotOptions[s].stacking), t = b(this.isValueAbs, E.isValueAbs, !1), T = a(d.yAxis, 0), S = f[z].numberFormatter, v = this.colorManager,
                w = v.getPlotColor(), W, da = f._FCconf.isBar, C = d.hoverEffects;
            q || (d.columnPosition = a(l, A, h));
            d.name = G(e.seriesname);
            if (0 === a(e.includeinlegend) || void 0 === d.name)d.showInLegend = !1;
            d.color = b(e.color, w).split(Da)[0].replace(/^#?/g, "#");
            h = /3d$/.test(f.chart.defaultSeriesType);
            l = b(360 - k.plotfillangle, da ? 180 : 90);
            0 > W && (l = 360 - l);
            e = d._dataParser = aa.column(f, {
                seriesname: d.name,
                plottooltext: e.plottooltext,
                color: b(e.color, w),
                alpha: b(e.alpha, k.plotfillalpha, Xa),
                plotgradientcolor: a(k.useplotgradientcolor, 1) ? P(k.plotgradientcolor,
                    v.getColor("plotGradientColor")) : p,
                ratio: b(e.ratio, k.plotfillratio),
                fillAangle: l,
                isRoundEdges: f.chart.useRoundEdges,
                plotBorderColor: b(k.plotbordercolor, h ? nb : v.getColor("plotBorderColor")).split(Da)[0],
                plotBorderAlpha: k.showplotborder == Ea || h && k.showplotborder != Ka ? Ea : b(k.plotborderalpha, Xa),
                isBar: this.isBar,
                is3d: h,
                dashed: a(e.dashed, k.plotborderdashed, 0),
                dashLen: a(e.dashlen, k.plotborderdashlen, 5),
                dashGap: a(e.dashgap, k.plotborderdashgap, 4),
                borderWidth: a(k.plotborderthickness, Ka),
                showValues: a(e.showvalues,
                    E.showValues),
                yAxis: T,
                use3DLighting: a(k.use3dlighting, 1),
                _sourceDataset: e,
                hoverEffects: C
            }, this);
            for (k = 0; k < g; k += 1)(E = m[k]) ? (W = S.getCleanValue(E.value, t), null === W ? d.data.push({y: null}) : (n = !0, E = e(E, k, W), d.data.push(E), E.previousY = this.pointValueWatcher(f, W, T, q, k, A, s))) : d.data.push({y: null});
            !c || n || this.realtimeEnabled || (d.showInLegend = !1);
            return d
        }, defaultSeriesType: "column"
    }, ib);
    V("mslinebase", {
        hasVDivLine: !0, point: function (c, d, e, k, f, g) {
            c = a(k.ignoreemptydatasets, 0);
            var h = !1, A = this.colorManager, l, n;
            l = f.chart;
            var m = e.data || [];
            n = f[z];
            var E = b(d.type, this.defaultSeriesType), s = b(d.isStacked, f.plotOptions[E] && f.plotOptions[E].stacking), q = b(this.isValueAbs, n.isValueAbs, !1), t = a(d.yAxis, 0), T = this.numberFormatter, S = L(b(e.color, k.linecolor, A.getPlotColor())), v = a(e.alpha, k.linealpha, Xa), w = a(k.showshadow, this.defaultPlotShadow, 1), W = a(e.drawanchors, e.showanchors, k.drawanchors, k.showanchors), da = a(e.anchorsides, k.anchorsides, 0), C = a(e.anchorstartangle, k.anchorstartangle, 90), ha = a(e.anchorradius, k.anchorradius,
                3), Q = L(b(e.anchorbordercolor, k.anchorbordercolor, S)), ia = a(e.anchorborderthickness, k.anchorborderthickness, 1), A = L(b(e.anchorbgcolor, k.anchorbgcolor, A.getColor("anchorBgColor"))), D = b(e.anchoralpha, k.anchoralpha, Xa), H = b(e.anchorbgalpha, k.anchorbgalpha, D), na = D && b(e.anchorshadow, k.anchorshadow, 0), sa = d.hoverEffects;
            d.name = G(e.seriesname);
            if (0 === a(e.includeinlegend) || void 0 === d.name || 0 === v && 1 !== W)d.showInLegend = !1;
            d.marker = {
                enabled: Boolean(a(W, 1)), fillColor: {FCcolor: {color: A, alpha: H * D / 100 + p}}, lineColor: {
                    FCcolor: {
                        color: Q,
                        alpha: D + p
                    }
                }, lineWidth: ia, radius: ha, symbol: oa(da), startAngle: C
            };
            d.color = {FCcolor: {color: S, alpha: v}};
            d.shadow = w ? {opacity: w ? v / 100 : 0} : !1;
            d.anchorShadow = na;
            d.step = b(this.stepLine, d.step);
            d.drawVerticalJoins = Boolean(a(d.drawVerticalJoins, k.drawverticaljoins, 1));
            d.useForwardSteps = Boolean(a(d.useForwardSteps, k.useforwardsteps, 1));
            d.lineWidth = a(e.linethickness, k.linethickness, 2);
            l = d._dataParser = aa.line(f, {
                seriesname: d.name,
                plottooltext: e.plottooltext,
                lineAlpha: v,
                anchorAlpha: D,
                showValues: a(e.showvalues, n.showValues),
                yAxis: t,
                lineDashed: Boolean(a(e.dashed, k.linedashed, 0)),
                lineDashLen: a(e.linedashlen, k.linedashlen, 5),
                lineDashGap: a(e.linedashgap, k.linedashgap, 4),
                lineThickness: d.lineWidth,
                lineColor: S,
                valuePosition: b(e.valueposition, l.valuePosition),
                drawAnchors: W,
                anchorBgColor: A,
                anchorBgAlpha: H,
                anchorBorderColor: Q,
                anchorBorderThickness: ia,
                anchorRadius: ha,
                anchorSides: da,
                anchorAngle: C,
                anchorShadow: d.anchorShadow,
                anchorStartAngle: a(e.anchorstartangle, k.anchorstartangle),
                _sourceDataset: e,
                hoverEffects: sa,
                imageUrl: b(e.anchorimageurl,
                    k.anchorimageurl),
                imageScale: b(e.anchorimagescale, k.anchorimagescale, 100),
                imageAlpha: b(e.anchorimagealpha, k.anchorimagealpha, 100)
            }, this);
            for (k = 0; k < g; k += 1)(n = m[k]) ? (e = T.getCleanValue(n.value, q), null === e ? d.data.push({y: null}) : (h = !0, n = l(n, k, e), d.data.push(n), n.previousY = this.pointValueWatcher(f, e, t, s, k, 0, E))) : d.data.push({y: null});
            !c || h || this.realtimeEnabled || (d.showInLegend = !1);
            return d
        }, defaultSeriesType: "line", defaultPlotShadow: 1, defaultZeroPlaneHighlighted: !1
    }, ib);
    V("msareabase", {
        hasVDivLine: !0,
        point: function (c, d, k, g, f, h) {
            c = a(g.ignoreemptydatasets, 0);
            var A = !1, l = f.chart, n = k.data || [], m = f[z], E = b(d.type, this.defaultSeriesType), s = b(d.isStacked, f.plotOptions[E] && f.plotOptions[E].stacking), q = b(this.isValueAbs, m.isValueAbs, !1), t = a(d.yAxis, 0), T = f[z].numberFormatter, S = this.colorManager, v = S.getPlotColor(), W = b(k.color, g.plotfillcolor, v).split(Da)[0].replace(/^#?/g, "#").split(Da)[0], w = b(k.alpha, g.plotfillalpha, g.areaalpha, this.areaAlpha, 70), da = a(g.plotfillangle, 270), v = b(k.plotbordercolor, g.plotbordercolor,
                    g.areabordercolor, this.isRadar ? v : "666666").split(Da)[0], C = b(k.showplotborder, g.showplotborder) == Ea ? Ea : b(k.plotborderalpha, g.plotborderalpha, k.alpha, g.plotfillalpha, g.areaalpha, "95"), ha = a(g.plotborderangle, 270), Q = a(k.anchorsides, g.anchorsides, 0), ia = a(k.anchorstartangle, g.anchorstartangle, 90), D = a(k.anchorradius, g.anchorradius, 3), H = L(b(k.anchorbordercolor, g.anchorbordercolor, W)), na = a(k.anchorborderthickness, g.anchorborderthickness, 1), sa = L(b(k.anchorbgcolor, g.anchorbgcolor, S.getColor("anchorBgColor"))),
                J = a(k.anchoralpha, g.anchoralpha, this.anchorAlpha, 0), K = a(k.anchorbgalpha, g.anchorbgalpha, J), G = J && b(k.anchorshadow, g.anchorshadow, 0), M = d.hoverEffects;
            this.isRadar || (W += Da + (a(g.useplotgradientcolor, 1) ? P(g.plotgradientcolor, S.getColor("plotGradientColor")) : p), W = W.replace(/,+?$/, ""));
            d.step = b(this.stepLine, d.step);
            d.drawVerticalJoins = Boolean(a(d.drawVerticalJoins, g.drawverticaljoins, 1));
            d.useForwardSteps = Boolean(a(d.useForwardSteps, g.useforwardsteps, 1));
            d.name = b(k.seriesname);
            if (0 === a(k.includeinlegend) ||
                void 0 === d.name)d.showInLegend = !1;
            d.fillColor = {FCcolor: {color: W, alpha: w, ratio: db, angle: da}};
            d.color = W;
            d.shadow = {opacity: a(g.showshadow, 1) ? C / 100 : 0};
            d.anchorShadow = G;
            d.lineColor = {FCcolor: {color: v, alpha: C, ratio: Xa, angle: ha}};
            d.lineWidth = b(k.plotborderthickness, g.plotborderthickness, 1);
            d.dashStyle = Boolean(a(k.dashed, g.plotborderdashed, 0)) ? e(a(k.dashlen, g.plotborderdashlen, 5), a(k.dashgap, g.plotborderdashgap, 4), d.lineWidth) : void 0;
            d.marker = {
                fillColor: {FCcolor: {color: sa, alpha: K * J / 100 + p}}, lineColor: {
                    FCcolor: {
                        color: H,
                        alpha: J + p
                    }
                }, lineWidth: na, radius: D, symbol: oa(Q), startAngle: ia
            };
            k = d._dataParser = aa.area(f, {
                seriesname: d.name,
                plottooltext: k.plottooltext,
                lineAlpha: C,
                anchorAlpha: J,
                showValues: a(k.showvalues, m.showValues),
                yAxis: t,
                fillColor: W,
                fillAlpha: w,
                valuePosition: b(k.valueposition, l.valuePosition),
                drawAnchors: Boolean(a(k.drawanchors, g.drawanchors, g.showanchors, 1)),
                anchorBgColor: sa,
                anchorBgAlpha: K,
                anchorBorderColor: H,
                anchorBorderThickness: na,
                anchorRadius: D,
                anchorSides: Q,
                anchorAngle: ia,
                anchorShadow: d.anchorShadow,
                getLink: this.linkClickFN,
                anchorStartAngle: a(k.anchorstartangle, g.anchorstartangle),
                _sourceDataset: k,
                hoverEffects: M,
                imageUrl: b(k.anchorimageurl, g.anchorimageurl),
                imageScale: b(k.anchorimagescale, g.anchorimagescale, 100),
                imageAlpha: b(k.anchorimagealpha, g.anchorimagealpha, 100)
            }, this);
            for (l = 0; l < h; l += 1)(m = n[l]) ? (g = m ? T.getCleanValue(m.value, q) : null, null === g ? d.data.push({y: null}) : (A = !0, m = k(m, l, g), d.data.push(m), m.previousY = this.pointValueWatcher(f, g, t, s, l, 0, E))) : d.data.push({y: null});
            !c || A || this.realtimeEnabled || (d.showInLegend = !1);
            return d
        }, defaultSeriesType: "area", defaultPlotShadow: 0
    }, ib);
    V("scatterbase", {
        showValues: 0,
        defaultPlotShadow: 0,
        rendererId: "cartesian",
        defaultSeriesType: "scatter",
        canvasPaddingModifiers: ["anchorlabel"],
        point: function (c, d, k, g, f, h, A) {
            c = a(g.ignoreemptydatasets, 0);
            var l = this.colorManager, n = l.getPlotColor(), m, E, s, q, T, S, v, W, w, da, ha, Q, ia, D, H, na, sa, J, K;
            h = !1;
            var M, ra;
            T = a(k.drawline, g.drawlines, 0);
            S = a(k.drawprogressioncurve, 0);
            q = k.data || [];
            var Na, Fa, I, ca, N, Wa = a(k.showvalues, f[z].showValues), Ja = this.numberFormatter,
                P, R = d._showRegression = a(k.showregressionline, g.showregressionline, 0);
            d.zIndex = 1;
            d.name = G(k.seriesname);
            if (0 === a(k.includeinlegend) || void 0 === d.name)d.showInLegend = !1;
            if (T || S)s = L(b(k.color, n)), q = b(k.alpha, Xa), T = a(k.linethickness, g.linethickness, 2), S = Boolean(a(k.linedashed, k.dashed, g.linedashed, 0)), v = a(k.linedashlen, g.linedashlen, 5), W = a(k.linedashgap, g.linedashgap, 4), d.color = C(b(k.linecolor, g.linecolor, s), a(k.linealpha, g.linealpha, q)), d.lineWidth = T, d.dashStyle = S ? e(v, W, T) : "none";
            T = Boolean(a(k.drawanchors,
                k.showanchors, g.drawanchors, g.showanchors, 1));
            A = a(k.anchorsides, g.anchorsides, A + 3);
            S = a(k.anchorradius, g.anchorradius, 3);
            s = L(b(k.anchorbordercolor, k.color, g.anchorbordercolor, s, n));
            n = a(k.anchorborderthickness, g.anchorborderthickness, 1);
            v = L(b(k.anchorbgcolor, g.anchorbgcolor, l.getColor("anchorBgColor")));
            W = b(k.anchoralpha, k.alpha, g.anchoralpha, Xa);
            ha = b(k.anchorbgalpha, k.alpha, g.anchorbgalpha, W);
            M = b(k.anchorstartangle, g.anchorstartangle, 90);
            d.anchorShadow = l = a(g.anchorshadow, 0);
            d.marker = {
                fillColor: this.getPointColor(v,
                    Xa), lineColor: {FCcolor: {color: s, alpha: W + p}}, lineWidth: n, radius: S, symbol: oa(A)
            };
            q = k.data || [];
            N = q.length;
            R && (d.events = {hide: this.hideRLine, show: this.showRLine}, Na = {
                sumX: 0,
                sumY: 0,
                sumXY: 0,
                sumXsqure: 0,
                sumYsqure: 0,
                xValues: [],
                yValues: []
            }, ca = a(k.showyonx, g.showyonx, 1), Fa = L(b(k.regressionlinecolor, g.regressionlinecolor, s)), I = a(k.regressionlinethickness, g.regressionlinethickness, n), m = t(a(k.regressionlinealpha, g.regressionlinealpha, W)), Fa = C(Fa, m));
            for (E = 0; E < N; E += 1)(w = q[E]) ? (m = Ja.getCleanValue(w.y), K = Ja.getCleanValue(w.x),
                null === m ? d.data.push({
                    y: null,
                    x: K
                }) : (h = !0, ra = this.getPointStub(w, m, Ja.xAxis(K), f, k, Wa), Q = a(w.anchorsides, A), ia = a(w.anchorradius, S), D = L(b(w.anchorbordercolor, s)), H = a(w.anchorborderthickness, n), na = L(b(w.anchorbgcolor, v)), sa = b(w.anchoralpha, w.alpha, W), J = b(w.anchorbgalpha, ha), da = Boolean(a(w.anchorshadow, l, 0)), P = this.pointHoverOptions(w, d, {
                    plotType: "anchor",
                    anchorBgColor: na,
                    anchorAlpha: sa,
                    anchorBgAlpha: J,
                    anchorAngle: M,
                    anchorBorderThickness: H,
                    anchorBorderColor: D,
                    anchorBorderAlpha: sa,
                    anchorSides: Q,
                    anchorRadius: ia,
                    shadow: void 0
                }), d.data.push({
                    y: m,
                    x: K,
                    displayValue: ra.displayValue,
                    toolText: ra.toolText,
                    link: ra.link,
                    marker: {
                        enabled: T,
                        shadow: da && {opacity: sa / 100},
                        fillColor: {FCcolor: {color: na, alpha: J * sa / 100 + p}},
                        lineColor: {FCcolor: {color: D, alpha: sa}},
                        lineWidth: H,
                        radius: ia,
                        symbol: oa(Q),
                        startAngle: b(w.anchorstartangle, k.anchorstartangle, g.anchorstartangle, 90)
                    },
                    hoverEffects: P.enabled && P.options,
                    rolloverProperties: P.enabled && P.rolloverOptions
                }), this.pointValueWatcher(f, m, K, R && Na))) : d.data.push({y: null});
            R && (k = this.getRegressionLineSeries(Na,
                ca, N), this.pointValueWatcher(f, k[0].y, k[0].x), this.pointValueWatcher(f, k[1].y, k[1].x), f = {
                type: "line",
                color: Fa,
                showInLegend: !1,
                lineWidth: I,
                enableMouseTracking: !1,
                marker: {enabled: !1},
                data: k,
                zIndex: 0
            }, d = [d, f]);
            c && !h && (d.showInLegend = !1);
            return d
        },
        postSeriesAddition: function (b, c) {
            for (var d = b.chart, k = c.chart, f = b.series, e = 0, g = f.length; e < g; e += 1)f[e]._showRegression && (f[e].relatedSeries = [e + 1]);
            d.clipBubbles = a(k.clipbubbles, 1)
        },
        categoryAdder: function (c, d) {
            var k, g = 0, f, h = d[z].x, A, n = d.xAxis, m, E, s = c.chart, q = parseInt(s.labelstep,
                10), t = a(s.showlabels, 1), T = b(s.xaxislabelmode, "categories").toLowerCase(), S = this.colorManager, v = d[z].numberFormatter, w, W, da, ha, Q, ia;
            d._FCconf.isXYPlot = !0;
            q = 1 < q ? q : 1;
            h.catOccupied = {};
            if ("auto" !== T && c.categories && c.categories[0] && c.categories[0].category) {
                E = c.categories[0];
                E.font && (d.xAxis.labels.style.fontFamily = E.font);
                void 0 !== (f = a(E.fontsize)) && (1 > f && (f = 1), d.xAxis.labels.style.fontSize = f + Ca, I(d.xAxis.labels.style));
                E.fontcolor && (d.xAxis.labels.style.color = E.fontcolor.split(Da)[0].replace(/^\#?/, "#"));
                k = b(E.verticallinecolor, S.getColor("divLineColor"));
                f = a(E.verticallinethickness, 1);
                A = a(E.verticallinealpha, S.getColor("divLineAlpha"));
                S = a(E.verticallinedashed, 0);
                w = a(E.verticallinedashlen, 4);
                W = a(E.verticallinedashgap, 2);
                da = C(k, A);
                for (k = 0; k < E.category.length; k += 1)ha = E.category[k], A = v.getCleanValue(ha.x), null === A || ha.vline || (h.catOccupied[A] = !0, m = a(ha.showlabel, ha.showname, t), Q = a(ha.showverticalline, ha.showline, ha.sl, 0), ia = a(ha.linedashed, S), m = 0 === m || 0 !== g % q ? p : N(l(ha.label, ha.name)), n.plotLines.push({
                    isGrid: !0,
                    isCat: !0,
                    isDataLabel: !0,
                    width: Q ? f : 0,
                    color: da,
                    dashStyle: e(w, W, f, ia),
                    value: A,
                    label: {
                        text: m,
                        link: b(ha.link, s.labellink),
                        style: ta({}, ha, s, n.labels.style),
                        align: Pa,
                        verticalAlign: qa,
                        textAlign: Pa,
                        rotation: 0,
                        x: 0,
                        y: 0
                    }
                }), this.pointValueWatcher(d, null, A), g += 1);
                "mixed" === T && (h.requiredAutoNumericLabels = a(this.requiredAutoNumericLabels, 1))
            } else h.requiredAutoNumericLabels = a(this.requiredAutoNumericLabels, 1);
            h.adjustMinMax = !0
        },
        getPointColor: function (a, b) {
            var c, d;
            a = L(a);
            b = t(b);
            c = Y(a, 70);
            d = R(a, 50);
            return {
                FCcolor: {
                    gradientUnits: "objectBoundingBox",
                    cx: .4, cy: .4, r: "100%", color: c + Da + d, alpha: b + Da + b, ratio: db, radialGradient: !0
                }
            }
        }
    }, V.xybase);
    V("mscombibase", {
        canvasPaddingModifiers: ["anchor", "anchorlabel"], series: function (d, k, e) {
            var g, f, h, A, n = d.chart, m, E = [], p = [], s = [], q, t, T = k[z], S = this.isDual, v = 0, w;
            k.legend.enabled = Boolean(a(d.chart.showlegend, 1));
            if (d.dataset && 0 < d.dataset.length) {
                this.categoryAdder(d, k);
                A = T.oriCatTmp.length;
                g = 0;
                for (f = d.dataset.length; g < f; g += 1)switch (h = d.dataset[g], q = S && "s" === b(h.parentyaxis, "p").toLowerCase() ? !0 : !1, m = {
                    hoverEffects: this.parseSeriesHoverOptions(d,
                        k, h, e), visible: !a(h.initiallyhidden, 0), legendIndex: g, data: []
                }, q ? (m.yAxis = 1, t = l(h.renderas, this.secondarySeriesType), this.secondarySeriesFilter && (w = this.secondarySeriesFilter[t])) : (t = l(h.renderas, this.defaultSeriesType), this.defaultSeriesFilter && (w = this.defaultSeriesFilter[t])), t = t.toLowerCase(), t) {
                    case "line":
                    case "spline":
                        m.type = !0 === w ? t : "line";
                        E.push(V.mslinebase.point.call(this, e, m, h, n, k, A, g));
                        break;
                    case "area":
                    case "splinearea":
                        m.type = !0 === w ? t : "area";
                        k.chart.series2D3Dshift = !0;
                        s.push(V.msareabase.point.call(this,
                            e, m, h, n, k, A, g));
                        break;
                    case "column":
                    case "column3d":
                        p.push(V.mscolumn2dbase.point.call(this, e, m, d.dataset[g], n, k, A, g, void 0, v));
                        v += 1;
                        break;
                    default:
                        q ? (m.type = "line", E.push(V.mslinebase.point.call(this, e, m, h, n, k, A, g))) : (p.push(V.mscolumn2dbase.point.call(this, e, m, d.dataset[g], n, k, A, g, void 0, v)), v += 1)
                }
                "0" !== n.areaovercolumns ? (k.chart.areaOverColumns = !0, k.series = k.series.concat(p, s, E)) : (k.chart.areaOverColumns = !1, k.series = k.series.concat(s, p, E));
                if (0 === p.length && 1 !== A)T.hasNoColumn = !0; else if (!this.isStacked)for (e =
                                                                                                    0, g = p.length; e < g; e += 1)p[e].numColumns = g;
                this.configureAxis(k, d);
                d.trendlines && c(d.trendlines, k.yAxis, k[z], S, this.isBar)
            }
        }
    }, V.mscolumn2dbase)
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-renderer", function () {
    function d(a, b, c, d) {
        var e = b.paper, g = b.layers, h = c ? "y-axis" : "x-axis", l = this.layerAboveDataset = g.layerAboveDataset, n = this.layerBelowDataset = g.layerBelowDataset, g = l.bands || (l.bands = []), m = g.length, p = n.bands || (n.bands = []), s = p.length, q = l.lines || (l.lines = []), t = q.length, v = n.lines || (n.lines = []), w = v.length, l = l.labels || (l.labels = []), z = l.length, n = n.labels || (n.labels = []), C = n.length;
        this.renderer = b;
        this.axisData = a || {};
        this.globalOptions =
            b.options;
        this.isVertical = c;
        this.topBandGroup = this.topBandGroup || e.group(h + "-bands", this.layerAboveDataset);
        this.belowBandGroup = this.belowBandGroup || e.group(h + "-bands", this.layerBelowDataset);
        g.push(this.topBandGroup);
        m && g[m].insertAfter(g[m - 1]);
        p.push(this.belowBandGroup);
        s && p[s].insertAfter(p[s - 1]);
        this.topLineGroup = this.topLineGroup || e.group(h + "-lines", this.layerAboveDataset);
        this.belowLineGroup = this.belowLineGroup || e.group(h + "-lines", this.layerBelowDataset);
        this.topLabelGroup = this.topLabelGroup ||
        e.group(h + "-labels", this.layerAboveDataset);
        this.belowLabelGroup = this.belowLabelGroup || e.group(h + "-labels", this.layerBelowDataset);
        q.push(this.topLineGroup);
        t && q[t].insertAfter(q[t - 1]);
        v.push(this.belowLineGroup);
        w && v[w].insertAfter(v[w - 1]);
        l.push(this.topLabelGroup);
        z && l[z].insertAfter(l[z - 1]);
        n.push(this.belowLabelGroup);
        C && n[C].insertAfter(n[C - 1]);
        this.isReverse = d;
        this.configure()
    }

    function m(a, b, c, d) {
        return ta(b - c[1] - d.top, a - c[0] - d.left)
    }

    function D(a, b) {
        var c = b ? 360 : Ca;
        a = (a || 0) % c;
        return 0 > a ? c + a :
            a
    }

    var v = this, p = v.window, c = v.hcLib, K = c.Raphael, b = c.chartAPI, G = /msie/i.test(p.navigator.userAgent) && !p.opera, a = p.document, l = p.Image, P = "VML" === K.type, N = c.BLANKSTRING, z = "rgba(192,192,192," + (G ? .002 : 1E-6) + ")", G = c.TOUCH_THRESHOLD_PIXELS, g = c.CLICK_THRESHOLD_PIXELS, e = c.stubFN, h = {
            pageX: 0,
            pageY: 0
        }, n = parseFloat, M = parseInt, H = c.extend2, q = c.addEvent, J = c.getMouseCoordinate, w = c.removeEvent, ja = c.pluck, s = c.pluckNumber, $ = c.toRaphaelColor, U = c.setImageDisplayMode, ba = c.FC_CONFIG_STRING, Ba = c.plotEventHandler, la = c.isArray,
        ga = c.each = function (a, b, c, d) {
            var e;
            c || (c = a);
            d || (d = {});
            if (la(a))for (e = 0; e < a.length; e += 1) {
                if (!1 === b.call(c, a[e], e, a, d))return e
            } else if (null !== a && void 0 !== a)for (e in a)if (!1 === b.call(c, a[e], e, a, d))return e
        }, ea = c.createElement, pa = c.createContextMenu, Z = c.hasTouch, ma = Z ? G : g, L = c.getSentenceCase, I = c.getCrispValues, fa = c.getValidValue, t = c.getFirstValue, R = c.regex.dropHash, Y = c.HASHSTRING, C = function (a) {
            return a !== Pa && null !== a
        }, xa = function (a, b) {
            a[1] === a[4] && (a[1] = a[4] = V(a[1]) + b % 2 / 2);
            a[2] === a[5] && (a[2] = a[5] = V(a[2]) +
            b % 2 / 2);
            return a
        }, Pa, Ga = 8 === a.documentMode ? "visible" : "", qa = p.Math, za = qa.sin, ya = qa.cos, ta = qa.atan2, V = qa.round, oa = qa.min, Ra = qa.max, ib = qa.abs, Da = qa.ceil, Za = qa.floor, Ea = 180 / qa.PI, Ka = qa.PI, Xa = Ka / 2, Ca = 2 * Ka, yb = Ka + Xa, Fb = c.getFirstColor, vb = c.graphics.getLightColor, $a = c.POSITION_TOP, sb = c.POSITION_BOTTOM, db = c.POSITION_RIGHT, nb = c.POSITION_LEFT;
    K.ca.ishot = function (a) {
        if (this.removed)return !1;
        var b = this.node;
        a = a || "";
        b.ishot = a;
        switch (this.type) {
            case "group":
                for (b = this.bottom; b;)b.attr("ishot", a), b = b.next;
                break;
            case "text":
                if (K.svg)for (b =
                                   b.getElementsByTagName("tspan")[0]; b;)b.ishot = a, b = b.nextSibling
        }
        return !1
    };
    K.addSymbol({
        printIcon: function (a, b, c) {
            var d = .75 * c, e = .5 * c, g = .33 * c, h = V(a - c) + .5, l = V(b - c) + .5, n = V(a + c) + .5;
            c = V(b + c) + .5;
            var m = V(a - d) + .5, p = V(b - d) + .5, d = V(a + d) + .5, s = V(b + e) + .5, q = V(a + e) + .5, t = V(b + g) + .5;
            a = V(a - e) + .5;
            g = V(b + g + g) + .5;
            return ["M", m, l, "L", d, l, d, p, m, p, "Z", "M", h, p, "L", h, s, m, s, m, b, d, b, d, s, n, s, n, p, "Z", "M", m, b, "L", m, c, d, c, d, b, "Z", "M", q, t, "L", a, t, "M", q, g, "L", a, g]
        }, exportIcon: function (a, b, c) {
            var d = .66 * c, e = .5 * d, g = V(a - c) + .5, h = V(b - c) + .5,
                l = V(a + c) + .5;
            c = V(b + c) - .5;
            var n = V(a - e) + .5, m = b < c - 3 ? c - 3 : V(b) + .5, e = V(a + e) - .5, p = V(a + d) - .5, d = V(a - d) + .5;
            return ["M", g, m, "L", g, c, l, c, l, m, l, c, g, c, "Z", "M", a, c - 1, "L", d, b, n, b, n, h, e, h, e, b, p, b, "Z"]
        }
    });
    c.rendererRoot = b("renderer.root", {
        standaloneInit: !1, isRenderer: !0, inited: !1, callbacks: [], init: function (a, b, c) {
            var d = this, e = d.container = a && a.containerElement || b.chart.renderTo, g = b.tooltip, h = d.layer, l, n;
            d.options = b;
            d.logic = a;
            d.definition = a.dataObj;
            d.smartLabel = a.smartLabel;
            d.numberFormatter = a.numberFormatter;
            d.fusionCharts =
                a.chartInstance;
            d.linkClickFN = a.linkClickFN;
            n = (l = b.chart) && l.animation && l.animation.duration;
            d.animationCompleteQueue = [];
            e.innerHTML = N;
            e = d.paper = d.fusionCharts.jsVars.paper = new K(e, e.offsetWidth || a.width, e.offsetHeight || a.height);
            !1 !== v.core.options._useSVGDescTag && e._desc && (l = a.friendlyName || "Vector image", d.definition && d.definition.chart && d.definition.chart.caption && (l += ' with caption "' + d.definition.chart.caption + '"'), e._desc(l));
            d.chartWidth = e.width;
            d.chartHeight = e.height;
            d.elements || (d.elements =
            {});
            h || (h = d.layers = {}, h.background = h.background || e.group("background"), h.dataset = h.dataset || e.group("dataset").insertAfter(h.background), h.tracker = h.tracker || e.group("hot").insertAfter(h.dataset));
            g && !1 !== g.enabled && (e.tooltip(g.style, g.shadow, g.constrain), h.tracker.trackTooltip(!0), h.dataset.trackTooltip(!0));
            d.disposeChartStyleSheet();
            d.setMargins();
            d.drawBackground();
            d.drawButtons();
            d.drawGraph();
            b.legend && b.legend.enabled && d.drawLegend();
            d.drawCaption();
            d.drawLogo();
            d.setChartEvents();
            d.drawLabels &&
            d.drawLabels();
            ga(b.callbacks, function (a) {
                a.apply(d, this)
            }, [a]);
            ga(d.callbacks, function (a) {
                a.apply(d, this)
            }, [a]);
            d.fusionCharts.annotations && d.fusionCharts.annotations.draw(d);
            d.createChartStyleSheet();
            d.options.nativeMessage || n || v.raiseEvent("internal.animationComplete", {}, d.fusionCharts);
            d.hasRendered = !0;
            c && c(d)
        }, disposeChartStyleSheet: function () {
            this.paper.cssClear()
        }, createChartStyleSheet: function () {
            this.paper.cssRender()
        }, addCSSDefinition: function (a, b) {
            var c = this.paper;
            b.color && (b.fill = b.color);
            c.cssAddRule(a, b)
        }, animationCompleteQueue: [], animationComplete: function () {
            var a, b, c, d;
            this.animatedElements = this.animatedElements ? ++this.animatedElements : 1;
            if (this.animatedElements === this.animatingElementsCount) {
                c = this.animationCompleteQueue;
                a = 0;
                for (b = c.length; a < b; a++)d = c[a], d.fn && d.fn.call(d.scope);
                this.animationCompleteQueue = [];
                v.raiseEvent("internal.animationComplete", {}, this.fusionCharts)
            }
        }, getAnimationCompleteFn: function () {
            var a = this;
            a.animatingElementsCount = a.animatingElementsCount ? ++a.animatingElementsCount :
                1;
            return function () {
                a.animationComplete()
            }
        }, reinit: function (a, b, c) {
            this.hasRendered || this.init(b, c)
        }, dispose: function () {
            var a = this.eventListeners, b = a && a.length;
            this.disposing = !0;
            if (b)for (; b--;)a[b].unlisten();
            if (this.toolbar && this.toolbar.length) {
                for (; this.toolbar.length;)a = this.toolbar.pop(), a.remove();
                this.toolbar.add = null
            }
            if (this.menus && this.menus.length)for (; this.menus.length;)a = this.menus.pop(), a.destroy();
            this.paper && (this.paper.clear(), this.paper.remove(), delete this.paper);
            this.exportIframe &&
            (this.exportIframe.parentNode.removeChild(this.exportIframe), delete this.exportIframe);
            delete this.disposing;
            this.container = null;
            this.disposed = !0
        }, onContainerClick: function (a) {
            var b = a.target || a.originalTarget || a.srcElement || a.relatedTarget || a.fromElement, d = a.data, e = d.fusionCharts;
            a = c.getMouseCoordinate(d.container, a.originalEvent);
            e.ref && (e = H({
                    height: e.args.height,
                    width: e.args.width,
                    pixelHeight: e.ref.offsetHeight,
                    pixelWidth: e.ref.offsetWidth,
                    id: e.args.id,
                    renderer: e.args.renderer,
                    container: e.options.containerElement
                },
                a), v.raiseEvent("chartclick", e, d.logic.chartInstance), b && b.ishot && d || d.options.chart.link && d.linkClickFN.call(d, d))
        }, onContainerMouseMove: function (a) {
            var b = a.data, d = b.fusionCharts;
            a = c.getMouseCoordinate(b.container, a.originalEvent);
            d.ref && (d = H({
                height: d.args.height,
                width: d.args.width,
                pixelHeight: d.ref.offsetHeight,
                pixelWidth: d.ref.offsetWidth,
                id: d.args.id,
                renderer: d.args.renderer,
                container: d.options.containerElement
            }, a), v.raiseEvent("chartMouseMove", d, b.logic.chartInstance))
        }, onContainerRollOver: function (a) {
            var b =
                a.data, d = b.fusionCharts;
            a = c.getMouseCoordinate(b.container, a.originalEvent);
            d.ref && (d = H({
                height: d.args.height,
                width: d.args.width,
                pixelHeight: d.ref.offsetHeight,
                pixelWidth: d.ref.offsetWidth,
                id: d.args.id,
                renderer: d.args.renderer,
                container: d.options.containerElement
            }, a), v.raiseEvent("chartRollOver", d, b.logic.chartInstance))
        }, onContainerRollOut: function (a) {
            var b = a.chart, d = b.fusionCharts;
            a = c.getMouseCoordinate(b.container, a.event);
            d.ref && (d = H({
                height: d.args.height,
                width: d.args.width,
                pixelHeight: d.ref.offsetHeight,
                pixelWidth: d.ref.offsetWidth,
                id: d.args.id,
                renderer: d.args.renderer,
                container: d.options.containerElement
            }, a), v.raiseEvent("chartRollOut", d, b.logic.chartInstance))
        }, mouseStateIn: !1, winMouseHover: function (b) {
            var c = b.originalEvent, c = c.target || c.originalTarget || c.srcElement || c.relatedTarget || c.fromElement, d = b.data, e = d.paper;
            b = {chart: d, event: b.originalEvent};
            P ? e.getById(c.parentNode.raphaelid) || (d.onContainerRollOut(b), d.mouseStateIn = !1, w(a, "mouseover", d.winMouseHover)) : c.viewportElement || (d.mouseStateIn = !1, d.onContainerRollOut(b), w(p, "mouseover", d.winMouseHover))
        }, chartHoverManager: function () {
            return function (b) {
                var c = b.type, d = b.data, e = d.eventListeners || (d.eventListeners = []);
                "mouseover" !== c && "touchstart" !== c || !1 !== d.mouseStateIn || (d.mouseStateIn = !0, d.onContainerRollOver(b), e.push(q(P ? a : p, "mouseover", d.winMouseHover, d)))
            }
        }(), setChartEvents: function () {
            var a = this.options, b = this.eventListeners || (this.eventListeners = []), a = this.link = a.chart.link, c = this.container, d = s(this.definition && this.definition.chart.enablechartmousemoveevent,
                0);
            w(c, "click", this.onContainerClick);
            b.push(q(c, "click", this.onContainerClick, this));
            w(this.paper.canvas, "mouseover", this.chartHoverManager, this);
            w(this.paper.canvas, "touchstart", this.chartHoverManager, this);
            w(this.paper.canvas, "mouseout", this.chartHoverManager, this);
            w(this.paper.canvas, "touchend", this.chartHoverManager, this);
            b.push(q(this.paper.canvas, "mouseover touchstart mouseout touchend", this.chartHoverManager, this));
            w(c, "mousemove", this.onContainerMouseMove, this);
            w(c, "touchmove", this.onContainerMouseMove,
                this);
            d && b.push(q(c, "mousemove touchmove", this.onContainerMouseMove, this));
            this.paper.canvas.style.cursor = K.svg ? a && "pointer" || "default" : a && "hand" || "default"
        }, onOverlayMessageClick: function () {
            var a = this.elements;
            K.animation({opacity: 0}, 1E3);
            a.messageText && a.messageText.hide();
            a.messageVeil && a.messageVeil.hide()
        }, showMessage: function (a, b) {
            var c = this.paper, d = this.options.chart, e = this.elements, g = e.messageText, h = e.messageVeil, l = c.width, n = c.height;
            h || (h = e.messageVeil = c.rect(0, 0, l, n).attr({
                fill: "rgba(0,0,0,0.2)",
                stroke: "none"
            }));
            h.show().toFront().attr("cursor", b ? "pointer" : "default")[b ? "click" : "unclick"](this.onOverlayMessageClick, this);
            g || (g = e.messageText = c.text(l / 2, n / 2, N).attr({
                fill: "rgba(255,255,255,1)",
                "font-family": "Verdana,sans",
                "font-size": 10,
                "line-height": 14,
                ishot: !0
            }));
            a = a || N;
            this.smartLabel.setStyle({"line-height": "14px", "font-family": "Verdana,sans", "font-size": "10px"});
            c = this.smartLabel.getSmartText(a, l - (d.spacingRight || 0) - (d.spacingLeft || 0), n - (d.spacingTop || 0) - (d.spacingBotton || 0));
            g.attr({
                text: c.text,
                ishot: !0, cursor: b ? "pointer" : "default"
            })[b ? "click" : "unclick"](this.onOverlayMessageClick, this).show().toFront()
        }, drawButtons: function () {
            var a = this, b = a.logic, c = "zoomline" === b.rendererId, d = a.paper, e = a.elements, g = a.toolbar || (a.toolbar = []), h = a.menus || (a.menus = []), l = a.layers, n = a.options, m = n[ba], b = m && m.outCanvasStyle || b.outCanvasStyle || {}, m = n.chart.toolbar || {}, p = m.hDirection, s = c ? 1 : m.vDirection, q = m.button || {}, t = q.scale, v = q.width * q.scale, w = q.height * q.scale, z = p * (q.spacing * q.scale + v), C = q.radius, D = (n = n.exporting) &&
                n.buttons || {}, H = D.exportButton && !1 !== D.exportButton.enabled, D = D.printButton && !1 !== D.printButton.enabled, J, K = l.buttons || (l.buttons = d.group("buttons").trackTooltip(!0));
            g.y || (g.y = (c ? 0 : m.y) + m.vMargin * s + oa(0, w * s));
            g.x || (g.x = m.x + m.hMargin * p - Ra(0, v * p));
            g.count = 0;
            g.add = function (a, b, c) {
                c = "string" === typeof c ? {tooltip: c} : c || {};
                var e = 0 === g.count ? z - p * q.spacing * q.scale : z, e = c.x || (g.x += e), k = c.tooltip || "";
                g.push(a = d.button(e, c.y || g.y, Pa, a, {
                        width: v,
                        height: w,
                        r: C,
                        id: g.count++,
                        verticalPadding: q.symbolHPadding * t,
                        horizontalPadding: q.symbolHPadding
                    },
                    K).attr({
                        ishot: !0,
                        fill: [q.fill, q.labelFill, q.symbolFill, q.hoverFill],
                        stroke: [q.stroke, q.symbolStroke],
                        "stroke-width": [q.strokeWidth, q.symbolStrokeWidth]
                    }).tooltip(k).buttonclick(b));
                return a
            };
            H && (h.push(J = e.exportMenu = pa({
                chart: a, basicStyle: b, items: function (b) {
                    var c = [], d = function (b) {
                        return function () {
                            a.logic.chartInstance.exportChart({exportFormat: b})
                        }
                    }, e;
                    for (e in b)c.push({text: b[e], onclick: d(e)});
                    return c
                }(n.exportformats)
            })), e.exportButton = g.add("exportIcon", function (a, b) {
                return function () {
                    J.visible ?
                        J.hide() : J.show({x: a, y: b + 1})
                }
            }(g.x + v, g.y + w), {tooltip: "Export chart"}));
            D && (e.printButton = g.add("printIcon", function () {
                a.print()
            }, {tooltip: "Print chart"}))
        }, setMargins: function () {
            var a = this.paper, b = this.options.chart || {}, c = V;
            this.canvasBorderWidth = b.plotBorderWidth || 0;
            this.canvasTop = c(b.marginTop) || 0;
            this.canvasLeft = c(b.marginLeft) || 0;
            this.canvasWidth = c(a.width - (b.marginLeft || 0) - (b.marginRight || 0));
            this.canvasHeight = c(a.height - (b.marginTop || 0) - (b.marginBottom || 0));
            this.canvasRight = this.canvasLeft +
            this.canvasWidth;
            this.canvasBottom = this.canvasTop + this.canvasHeight
        }, drawBackground: function () {
            var a = this, b = a.paper, c = a.layers, d = a.elements, e = c.background, g = d.background, h = d.chartborder, m = a.options.chart || {}, p = n(m.borderWidth) || 0, s = .5 * p, q = 2 * p, t = m.borderWidth || 0, w = a.chartHeight, z = a.chartWidth, C = d.backgroundImage, D = m.bgSWF, H = m.bgSWFAlpha / 100, J = m.bgImageDisplayMode, K = m.bgImageVAlign, G = m.bgImageHAlign, M = m.bgImageScale, I = t + "," + t + "," + (z - 2 * t) + "," + (w - 2 * t), N, ca, L, P, R, V, jb;
            b.canvas.style.backgroundColor = m.containerBackgroundColor;
            !e && (e = c.background = b.group("background"));
            c = {x: p, y: p, width: b.width - q, height: b.height - q, stroke: "none", fill: $(m.backgroundColor)};
            g ? g.attr(c) : g = d.background = b.rect(c, e);
            c = {
                x: s,
                y: s,
                width: b.width - p,
                height: b.height - p,
                stroke: m.borderColor,
                "stroke-width": p,
                "stroke-dasharray": m.borderDashStyle,
                fill: "none",
                r: m.borderRadius || 0
            };
            h ? h.attr(c) : h = d.chartborder = b.rect(c, e);
            D && (N = new l, R = L = 1, C = [], N.onload = function () {
                ca = U(J, K, G, M, t, z, w, N);
                ca["clip-rect"] = I;
                if (ca.tileInfo)for (L = ca.tileInfo.xCount, R = V = ca.tileInfo.yCount,
                                         jb = ca.y, delete ca.tileInfo; L && ca.width && ca.height;)V -= 1, P ? (C[void 0] = P.clone().attr({
                    x: ca.x,
                    y: ca.y
                }), e.appendChild(C[void 0])) : C[void 0] = P = b.image(D, e).attr(ca).css({opacity: H}), ca.y += ca.height, 0 === V && (V = R, L -= 1, ca.x += ca.width, ca.y = jb); else C[0] = b.image(D, e), C[0].attr(ca).css({opacity: H}).attr({
                    visibility: Ga,
                    "clip-rect": I
                });
                v.raiseEvent("BackgroundLoaded", {
                    url: D,
                    bgImageAlpha: 100 * H,
                    bgImageDisplayMode: J,
                    bgImageVAlign: K,
                    bgImageHAlign: G,
                    bgImageScale: M,
                    imageWidth: N.width,
                    imageHeight: N.height
                }, a.logic.chartInstance)
            },
                N.onerror = function (b) {
                    v.raiseEvent("BackgroundLoadError", {
                        url: D,
                        bgImageAlpha: 100 * H,
                        error: b,
                        bgImageDisplayMode: J,
                        bgImageVAlign: K,
                        bgImageHAlign: G,
                        bgImageScale: M
                    }, a.logic.chartInstance)
                }, N.src = D, d.backgroundImage = C)
        }, drawGraph: function () {
            var a = this, b = a.paper, c = a.plots = a.elements.plots, d = a.logic, e = a.layers, g = a.options, h = a.elements, l = g.chart, g = a.datasets = g.series, n = t(l.rendererId, l.defaultSeriesType), m = e.background, p = e.dataset = e.dataset || b.group("dataset").insertAfter(m), s, q, m = function (a, b) {
                return function (e) {
                    var k =
                        c[a], g, h = {hcJSON: {series: []}}, l = h.hcJSON.series[a] || (h.hcJSON.series[a] = {}), n = d.chartInstance.jsVars._reflowData;
                    g = (e = t(e, !k.visible)) ? "visible" : "hidden";
                    ga(k.graphics, function (a) {
                        !0 !== a.data("alwaysInvisible") && a.attr("visibility", g)
                    });
                    k.visible = e;
                    b.visible = e;
                    l.visible = e;
                    H(n, h, !0)
                }
            }, v = function (b) {
                return function (d, e) {
                    a["legendClick" + n] && a["legendClick" + n](c[b], d, e) || a.legendClick && a.legendClick(c[b], d, e)
                }
            }, w = function (b) {
                return function () {
                    return a.getEventArgs && a.getEventArgs(c[b])
                }
            }, z = function (b,
                             d, e) {
                return function (g, h) {
                    d.call(a, c[b], e, {numUpdate: g, hasAxisChanged: h})
                }
            };
            e.tracker = e.tracker || b.group("hot").insertAfter(p);
            a.drawCanvas();
            a.drawAxes();
            c || (c = a.plots = a.plots || [], h.plots = c);
            e = 0;
            for (h = g.length; e < h; e++)b = g[e] || {}, p = b.updatePlot = "updatePlot" + L(ja(b.type, b.plotType, n)), p = a[p], s = b.drawPlot = "drawPlot" + L(ja(b.type, b.plotType, n)), s = a[s] || a.drawPlot, (q = c[e]) || (c.push(q = {
                index: e,
                items: [],
                data: b.data || [],
                name: b.name,
                userID: b.userID,
                setVisible: m(e, b),
                legendClick: v(e),
                getEventArgs: w(e),
                realtimeUpdate: z(e,
                    p || s, b)
            }), b.plot = q, b.legendClick = q.legendClick, b.getEventArgs = q.getEventArgs, b.setVisible = q.setVisible), s.call(a, q, b);
            l.hasScroll && (a.drawScroller(), a.finalizeScrollPlots())
        }, drawPlot: e, drawCanvas: e, drawAxes: e, drawScroller: function () {
        }, drawLegend: function () {
            var a = this, b = a.options, c = a.paper, d = b.chart || {}, e = b.legend, g = e.scroll, b = {elements: {}}, h = b.elements, l = a.layers.legend, n = h.box, m = h.caption, p = h.elementGroup, q = "vertical" === e.layout, t = d.marginBottom, v = d.spacingBottom, w = d.spacingLeft, z = d.spacingRight,
                C = c.width, D = c.height, J = a.canvasTop, G = e.width, M = e.height, I = e.borderRadius, P = e.backgroundColor, ca = e.borderColor, R = e.borderWidth || 0, $ = .5 * R, V = .5 * R + 2, d = s(e.padding, 4), U = .5 * d, jb, Z, aa, r, u, B, F, f = g && g.enabled;
            q ? (q = C - z - G, t = J + .5 * (D - t - J - M) + (e.y || 0)) : (q = w + .5 * (C - w - z - G) + (e.x || 0), t = D - v - M);
            v = K.crispBound(q, t, G, M, R);
            q = v.x;
            t = v.y;
            G = v.width;
            M = v.height;
            l || (l = a.layers.legend = c.group("legend").insertBefore(a.layers.tracker).translate(q, t).attr("class", "fusioncharts-legend"));
            a.addCSSDefinition(".fusioncharts-legend .fusioncharts-caption",
                H({"text-anchor": e.title.align}, e.title.style));
            e.legendAllowDrag && (a.addCSSDefinition(".fusioncharts-legend", {cursor: "move"}), Z = q, aa = t, l.drag(function (a, b) {
                r = B + a;
                u = F + b;
                r + G + V > C && (r = C - G - V);
                u + M + V > D && (u = D - M - V);
                r < V && (r = V);
                u < V && (u = V);
                l.translate(r - Z, u - aa);
                Z = r;
                aa = u
            }, function () {
                B = Z;
                F = aa
            }));
            I = {
                x: 0,
                y: 0,
                width: G,
                height: M,
                r: I,
                stroke: ca,
                "stroke-width": R,
                fill: P || "none",
                ishot: e.legendAllowDrag
            };
            n ? n.attr(I) : n = h.box = c.rect(I, l);
            n.shadow(e && e.shadow);
            f ? (jb = M - d, n = "," + G + "," + jb, p = h.elementGroup = c.group("legenditems",
                l).attr({"clip-rect": "0," + U + n}), g = h.scroller || (h.scroller = c.scroller(G - 10 + U - R, $, 10, M - R, !1, {
                scrollPosition: g.scrollPosition || 0,
                scrollRatio: (jb + d) / e.totalHeight,
                showButtons: !1,
                displayStyleFlat: g.flatScrollBars
            }, l)), g.attr("fill", e.legendScrollBgColor).scroll(function (b) {
                p.transform(["T", 0, (jb - e.totalHeight) * b]);
                H(a.fusionCharts.jsVars._reflowData, {hcJSON: {legend: {scroll: {position: b}}}}, !0)
            })) : p = h.elementGroup = l;
            if (e.title && e.title.text !== N) {
                switch (e.title.align) {
                    case "start":
                        g = d;
                        break;
                    case "end":
                        g =
                            G - d - (f ? 10 : 0);
                        break;
                    default:
                        g = .5 * G
                }
                I = {
                    "class": "fusioncharts-caption",
                    "text-anchor": e.title.align,
                    text: e.title.text,
                    title: e.title.originalText || "",
                    x: g,
                    y: d,
                    fill: e.title.style.color,
                    "vertical-align": "top",
                    "line-height": e.title.style.lineHeight
                };
                m ? m.attr(I) : m = h.caption = c.text(I, p).attr("class", "fusioncharts-caption")
            }
            this["draw" + L(e.type || "point") + "LegendItem"](b)
        }, drawPointLegendItem: function (a) {
            var b = this, c = b.paper, d = b.options, e = d.series, g = d.chart.defaultSeriesType, d = d.legend, h = d.legendHeight, l = d.symbolPadding,
                n = d.textPadding || 2, m = s(d.padding, 4), p = d.itemHoverStyle, q = d.itemHiddenStyle, t = d.itemStyle, w = t.color, q = q && q.color || "#CCCCCC", C = p && p.color || w, p = d.symbol3DLighting, D = d.symbolWidth, G = !1 !== d.interactiveLegend, K = a.elements, M = K.elementGroup;
            a = a.item = [];
            var K = K.item = [], I = [], N = {
                line: !0,
                spline: !0,
                scatter: !0,
                bubble: !0,
                dragnode: !0,
                zoomline: !0
            }, L, P, ca, R, V, U, Z, jb, Y, aa, r, u, B, F, f, Ma, O, X, pb, qb, ua;
            u = 0;
            for (B = e.length; u < B; u += 1)if ((L = e[u]) && !1 !== L.showInLegend)if (jb = L.type || g, "point" === L.legendType)for (L = L.data || [], V =
                0, U = L.length; V < U; V += 1)ca = L[V] || {}, !1 !== ca.showInLegend && (ca._legendType = jb, I.push(ca)); else switch (L._legendType = jb, jb) {
                case "pie":
                case "pie3d":
                case "funnel":
                case "pyramid":
                    I = L.data;
                    break;
                default:
                    I.push(L)
            }
            I.sort(function (a, b) {
                return (a.legendIndex || 0) - (b.legendIndex || 0) || a.__i - b.__i
            });
            d.reversed && I.reverse();
            e = d.initialItemX || 0;
            g = d.initialItemY || 0;
            V = function (a) {
                var c = this.data("legendItem"), d = c.getEventArgs ? c.getEventArgs() : {}, e;
                a = J(b.logic.chartInstance.ref, a);
                d.chartX = a.chartX;
                d.chartY = a.chartY;
                d.pageX = a.pageX;
                d.pageY = a.pageY;
                d.preventDefaults = function () {
                    e = !0
                };
                v.raiseEvent("LegendItemClicked", d, b.logic.chartInstance);
                G && !e && c.legendClick()
            };
            U = function (a) {
                var c = this.data("legendItem"), d = c.getEventArgs ? c.getEventArgs() : {};
                a = J(b.logic.chartInstance.ref, a);
                var e = !1 !== c.visible, c = c.plot.legend.elements.legendItemText;
                d.chartX = a.chartX;
                d.chartY = a.chartY;
                d.pageX = a.pageX;
                d.pageY = a.pageY;
                e && c && c.attr({fill: C});
                v.raiseEvent("LegendItemRollover", d, b.logic.chartInstance)
            };
            Z = function (a) {
                var c = this.data("legendItem"),
                    d = c.getEventArgs ? c.getEventArgs() : {};
                a = J(b.logic.chartInstance.ref, a);
                var e = !1 !== c.visible, c = c.plot.legend.elements.legendItemText;
                d.chartX = a.chartX;
                d.chartY = a.chartY;
                d.pageX = a.pageX;
                d.pageY = a.pageY;
                e && c && c.attr({fill: w});
                v.raiseEvent("LegendItemRollout", d, b.logic.chartInstance)
            };
            b.addCSSDefinition(".fusioncharts-legend .fusioncharts-legenditem", d.itemStyle);
            u = 0;
            for (B = I.length; u < B; u += 1)!1 !== I[u].showInLegend && (ua = {
                elements: {},
                hiddenColor: q,
                itemTextColor: w,
                hoverColor: C
            }, a.push(ua), K.push(ua.elements),
                L = I[u], Y = e + L._legendX + m, aa = g + L._legendY - m, r = L._legendH, P = L._legendType || jb, ca = !1 !== L.visible, R = ua.itemLineColor = $(L.color || {}), L.plot.legend = ua, ua.elements.legendItemText = c.text({
                "class": "fusioncharts-legenditem",
                x: Y + h + n - 2,
                y: aa + (L._legendTestY || 0),
                text: L.name,
                fill: ca ? w : q,
                "vertical-align": "top",
                "text-anchor": "start",
                cursor: t.cursor || "pointer",
                ishot: G,
                "line-height": t.lineHeight,
                "font-size": t.fontSize
            }, M).data("legendItem", L), N[P] ? (P = aa + l + .5 * D, L.lineWidth && (qb = ua.elements.legendItemLine = c.path({
                "stroke-width": L.lineWidth,
                stroke: ca ? R : q, cursor: t.cursor || "pointer", ishot: G, path: ["M", Y + l, P, "L", Y + l + D, P]
            }, M).data("legendItem", L)), L && (O = L.marker) && !1 !== O.enabled && (ua.symbolStroke = $(ja((X = O.lineColor) && (X.FCcolor && X.FCcolor.color.split(",")[0] || X), R)), p ? O.fillColor && O.fillColor.FCcolor ? (P = H({}, O.fillColor), P.FCcolor.alpha = "100") : P = ja(O.fillColor, R) : P = {
                FCcolor: {
                    color: ja((pb = O.fillColor) && (pb.FCcolor && pb.FCcolor.color.split(",")[0] || pb), R),
                    angle: 0,
                    ratio: "0",
                    alpha: "100"
                }
            }, ua.symbolColor = $(P), F = .5 * D, R = Y + l + F, P = aa + l + F, qb && (F *= .6),
                f = O.symbol.split("_"), Ma = "spoke" === f[0] ? 1 : 0, P = f[1] ? ua.elements.legendItemSymbol = c.polypath(f[1], R, P, F, O.startAngle, Ma, M) : ua.elements.legendItemSymbol = c.circle(R, P, F, M), P.data("legendItem", L).attr({
                cursor: t.cursor || "pointer",
                stroke: ca ? ua.symbolStroke : q,
                fill: ca ? ua.symbolColor : q,
                "stroke-width": 1,
                ishot: G
            }))) : (P = b.getSymbolPath(Y + l, aa + l, D, D, P, L, !p), ua.symbolColor = $(P.color), ua.symbolStroke = $(P.strokeColor), P = ua.elements.legendItemSymbol = c.path({
                path: P.path, "stroke-width": P.strokeWidth, stroke: ca ? ua.symbolStroke :
                    q, fill: ca ? ua.symbolColor : q, cursor: t.cursor || "pointer", ishot: G
            }, M).data("legendItem", L)), ua.elements.legendItemBackground = c.rect({
                x: Y,
                y: aa,
                width: L._totalWidth,
                height: r,
                r: 0,
                fill: $(L.legendFillColor || z),
                "stroke-width": 1,
                stroke: $(L.legendBorderColor || "none"),
                cursor: t.cursor || "pointer",
                ishot: G
            }, M).click(V).mouseover(U).mouseout(Z).data("legendItem", L));
            d.reversed && I.reverse()
        }, drawCaption: function () {
            var a = this.options.chart, b = this.options.title, c = this.options.subtitle, d = this.paper, e = this.smartLabel, g =
                this.elements, h = this.layers, l = h.caption, n = g.caption, m = g.subcaption, p = b.text, s = c && c.text, q = b.x, t;
            !p && !s || l || (l = h.caption = d.group("caption"), h.tracker ? l.insertBefore(h.tracker) : l.insertAfter(h.dataset));
            p ? (this.addCSSDefinition(".fusioncharts-caption", b.style), t = {
                "class": "fusioncharts-caption",
                text: b.text,
                fill: b.style.color,
                x: q,
                y: b.y || a.spacingTop || 0,
                "text-anchor": b.align || "middle",
                "vertical-align": b.verticalAlign || "top",
                visibility: "visible",
                title: b.originalText || ""
            }, n ? n.attr(t) : n = g.caption = d.text(t,
                l).attr("class", "fusioncharts-caption"), n.css(b.style), e ? (e.setStyle(b.style), t = e.getOriSize(b.text).height) : t = 10) : n && (n = g.caption = n.remove());
            s ? (this.addCSSDefinition(".fusioncharts-subcaption", c.style), t = {
                "class": "fusioncharts-subcaption",
                text: c.text,
                title: c.originalText || "",
                fill: c.style.color,
                x: q,
                y: p ? n.attrs.y + t + 2 : b.y || a.spacingTop || 0,
                "text-anchor": b.align || "middle",
                "vertical-align": "top",
                visibility: "visible"
            }, m ? m.attr(t) : m = g.subcaption = d.text(t, l).attr("class", "fusioncharts-subcaption"), m.css(c.style)) :
            m && (g.subcaption = m.remove());
            p || s || !l || (h.caption = l.remove())
        }, drawLogo: function () {
            var a = this, b = a.paper, c = a.elements, d = a.options, e = d.credits, g = d.chart || {}, h = g.borderWidth || 0, n = a.chartHeight, m = a.chartWidth, s = c.logoImage, q = g.logoURL, t = g.logoAlpha / 100, w = g.logoPosition, z = g.logoLink, C = g.logoScale, D = g.logoLeftMargin, H = g.logoTopMargin, d = {
                tr: {
                    vAlign: $a,
                    hAlign: db
                }, bl: {vAlign: sb, hAlign: nb}, br: {vAlign: sb, hAlign: db}, cc: {vAlign: "middle", hAlign: "middle"}
            }, G, K, M;
            a.logic && e.enabled && b.text().attr({
                text: e.text, x: 6,
                y: n - 4, "vertical-align": sb, "text-anchor": "start", fill: "rgba(0,0,0,0.5)", title: e.title || ""
            }).css({fontSize: 9, fontFamily: "Verdana,sans", cursor: "pointer", _cursor: "hand"}).click(function () {
                try {
                    p.open(e.href)
                } catch (a) {
                    (p.top || p).location.href = e.href
                }
            });
            q && (G = new l, (M = d[w]) || (M = {vAlign: $a, hAlign: nb}), G.onload = function () {
                a.disposed || b.disposed || (K = U("none", M.vAlign, M.hAlign, C, h, m, n, G), P && (K.w = K.width || 0, K.h = K.height || 0), K.src = q, s = a.paper.image(K).translate(D, H).css("opacity", t), z && s.css({
                    cursor: "pointer",
                    _cursor: "hand"
                }), s.mouseover(function (b) {
                    b = J(a.logic.chartInstance.ref, b);
                    v.raiseEvent("LogoRollover", {
                        logoURL: q,
                        logoAlpha: 100 * t,
                        logoPosition: w || "tl",
                        logoScale: C,
                        logoLink: z,
                        chartX: b.chartX,
                        chartY: b.chartY,
                        pageX: b.pageX,
                        pageY: b.pageY
                    }, a.logic.chartInstance)
                }), s.mouseout(function (b) {
                    b = J(a.logic.chartInstance.ref, b);
                    v.raiseEvent("LogoRollout", {
                        logoURL: q,
                        logoAlpha: 100 * t,
                        logoPosition: w || "tl",
                        logoScale: C,
                        logoLink: z,
                        chartX: b.chartX,
                        chartY: b.chartY,
                        pageX: b.pageX,
                        pageY: b.pageY
                    }, a.logic.chartInstance)
                }), s.click(function (b) {
                    b =
                        J(a.logic.chartInstance.ref, b);
                    v.raiseEvent("LogoClick", {
                        logoURL: q,
                        logoAlpha: 100 * t,
                        logoPosition: w || "tl",
                        logoScale: C,
                        logoLink: z,
                        chartX: b.chartX,
                        chartY: b.chartY,
                        pageX: b.pageX,
                        pageY: b.pageY
                    }, a.logic.chartInstance, void 0, function () {
                        z && g.events.click.call({link: z})
                    })
                }), v.raiseEvent("LogoLoaded", {
                    logoURL: q,
                    logoAlpha: 100 * t,
                    logoPosition: w || "tl",
                    logoScale: C,
                    logoLink: z
                }, a.logic.chartInstance))
            }, G.onerror = function (b) {
                v.raiseEvent("LogoLoadError", {
                    logoURL: q, logoAlpha: 100 * t, logoPosition: w || "tl", logoScale: C, logoLink: z,
                    error: b
                }, a.logic.chartInstance)
            }, G.src = q, c.logoImage = s)
        }, getEventArgs: function (a) {
            a = a || {};
            return {datasetName: a.name, datasetIndex: a.index, id: a.userID, visible: a.visible}
        }, legendClick: function (a, b) {
            var c = a.legend, d = c && c.elements, e = d && d.legendItemText, g = d && d.legendItemSymbol, d = d && d.legendItemLine, h = c && c.hiddenColor, l = c && c.itemLineColor, n = c && c.itemTextColor, m = c && c.symbolColor, p = c && c.symbolStroke, c = ja(b, !a.visible);
            a.setVisible(b);
            c ? (g && g.attr({fill: m || l, stroke: p}), e && e.attr({fill: n}), d && d.attr({stroke: l})) :
                (g && g.attr({fill: h, stroke: h}), e && e.attr({fill: h}), d && d.attr({stroke: h}));
            if ((e = this.datasets && this.datasets[a.index] && this.datasets[a.index].relatedSeries) && e instanceof Array && 0 < e.length)for (g = e.length; g--;)d = parseFloat(e[g]), d = this.plots[d], d.legendClick.call(d, c, !1)
        }, exportChart: function (b) {
            var d = this, e = d.fusionCharts, g = d.options;
            b = "object" === typeof b && function (a) {
                var b = {}, c;
                for (c in a)b[c.toLowerCase()] = a[c];
                return b
            }(b) || {};
            var h = H(H({}, g.exporting), b), n = (h.exportformat || "png").toLowerCase(),
                m = h.exporthandler, s = (h.exportaction || N).toLowerCase(), q = h.exporttargetwindow || N, t = h.exportfilename, w = h.exportparameters, z = h.exportcallback, C = h.exportwithimages;
            if (!g.exporting || !g.exporting.enabled || !m)return !1;
            v.raiseEvent("beforeExport", h, e, void 0, function () {
                function b() {
                    var g;
                    if ("download" === s) {
                        /webkit/ig.test(p.navigator.userAgent) && "_self" === q && (q = J = k + "export_iframe", d.exportIframe || (d.exportIframe = G = ea("IFRAME", {
                            name: J,
                            width: "1px",
                            height: "1px"
                        }, a.body), G.style.cssText = "position:absolute;left:-10px;top:-10px;"));
                        K = ea("form", {method: "POST", action: m, target: q, style: "display:none;"}, a.body);
                        for (g in H)ea("input", {type: "hidden", name: g, value: H[g]}, K);
                        K.submit();
                        a.body.removeChild(K);
                        K = void 0;
                        return !0
                    }
                    M = new v.ajax(function (a) {
                        var b = {};
                        a.replace(RegExp("([^?=&]+)(=([^&]*))?", "g"), function (a, c, d, e) {
                            b[c] = e
                        });
                        z && p[z] && "function" === typeof p[z] && p[z].call(p, b);
                        c.raiseEvent("exported", b, e)
                    }, function (a) {
                        a = {
                            statusCode: 0,
                            statusMessage: "failure",
                            error: a,
                            DOMId: k,
                            width: T.width,
                            height: T.height
                        };
                        z && p[z] && "function" === typeof p[z] &&
                        p[z].call(p, a);
                        c.raiseEvent("exported", a, e, [a])
                    });
                    for (g in H)H.hasOwnProperty(g) && (H[g] = encodeURIComponent(H[g]));
                    M.post(m, H)
                }

                var g = d.layers.buttons, k = e.id, T = d.paper, D = v && v.hcLib, H, J, G, K, M, I, D = D && D.isCanvasElemSupported(), L, N, P = 0, R = {}, V, $, aa, r, u = {};
                g && g.attr("visibility", "hidden");
                I = T.toSVG(C && D && "svg" !== n);
                g && g.attr("visibility", "visible");
                I = I.replace(/(\sd\s*=\s*["'])[M\s\d\.]*(["'])/ig, "$1M 0 0 L 0 0$2");
                H = {
                    charttype: e.chartType(),
                    stream: I,
                    stream_type: "svg",
                    meta_bgColor: h.bgcolor || "",
                    meta_bgAlpha: h.bgalpha ||
                    "1",
                    meta_DOMId: e.id,
                    meta_width: T.width,
                    meta_height: T.height,
                    parameters: ["exportfilename=" + t, "exportformat=" + n, "exportaction=" + s, "exportparameters=" + w].join("|")
                };
                -1 !== I.indexOf("<image ") ? D ? (N = (L = I.match(/<image [^\>]*\>/gi)) && L.length, V = function (a) {
                    a = a && a.split("/");
                    a = a[a.length - 1].split(".");
                    return {name: a[0], type: a[1] || "png"}
                }, $ = function (b, c, d, e, g) {
                    var k = new l;
                    k.onload = function () {
                        var h = "image/" + d, l = a.createElement("canvas"), n = l.getContext("2d"), m = "";
                        l.width = k.width;
                        l.height = k.height;
                        n.drawImage(k,
                            0, 0);
                        m = l.toDataURL(h);
                        u[b] = m;
                        r(m, c, d, e, g)
                    };
                    k.onerror = function () {
                        aa()
                    };
                    k.src = b
                }, r = function (a, b, c, d, e) {
                    R["image_" + P] = {name: b, type: c, encodedData: a, width: d, height: e};
                    aa()
                }, aa = function () {
                    var a = {}, c, d, e, g, k, h = !1;
                    P < N ? (c = L[P].replace(/\"/g, ""), c.split(" ").forEach(function (b) {
                        b = b.split("=");
                        a[b[0]] = b[1]
                    }), a["xlink:href"] && (c = (d = V(a["xlink:href"])) && d.name || "temp_image_" + P, e = d && d.type || "png", g = parseInt(a.width, 10), k = parseInt(a.height, 10), d = c + "." + e, u[a["xlink:href"]] ? h = !0 : $(a["xlink:href"], c, e, g, k)), c = 'xlink:href="' +
                    a["xlink:href"], I = I.replace(c, 'xlink:href="temp/' + d), P += 1, h && aa()) : (H.encodedImgData = JSON.stringify(R), H.stream = I, b())
                }, aa()) : b() : b();
                v.raiseEvent("exportDataReady", H, e)
            }, function () {
                v.raiseEvent("exportCancelled", h, e)
            })
        }, print: function (b) {
            var c = this, d = H({}, b);
            if (c.isPrinting)return !1;
            v.raiseEvent("BeforePrint", d, c.logic.chartInstance, void 0, function () {
                    var b = c.container, e = c.elements, g = e.printButton, k = e.exportButton, h = [], l = b.parentNode, e = a.body || a.getElementsByTagName("body")[0], n = e.childNodes;
                    c.isPrinting = !0;
                    ga(n, function (a, b) {
                        1 == a.nodeType && (h[b] = a.style.display, a.style.display = "none")
                    });
                    !1 !== d.hideButtons && (g && "hidden" != g.attrs.visibility && g.attr({visibility: "hidden"}), k && "hidden" != k.attrs.visibility && k.attr({visibility: "hidden"}));
                    e.appendChild(b);
                    p.print();
                    setTimeout(function () {
                        g && g.attr({visibility: "visible"});
                        k && k.attr({visibility: "visible"});
                        l.appendChild(b);
                        ga(n, function (a, b) {
                            1 == a.nodeType && (a.style.display = h[b])
                        });
                        c.isPrinting = !1;
                        v.raiseEvent("PrintComplete", d, c.logic.chartInstance)
                    }, 1E3)
                },
                function () {
                    v.raiseEvent("PrintCancelled", d, c.logic.chartInstance)
                })
        }, getSymbolPath: function (a, b, c, d, e, g, h) {
            var l = ["M"], n, m, p;
            n = (g.color && Fb("string" === typeof g.color ? g.color : g.color.FCcolor.color) || N).replace(R, "");
            p = vb(n, 60).replace(R, Y);
            h ? n = {
                FCcolor: {
                    color: n,
                    angle: 0,
                    ratio: "0",
                    alpha: "100"
                }
            } : (h = vb(n, 40), n = {
                FCcolor: {
                    color: n + "," + n + "," + h + "," + n + "," + n,
                    ratio: "0,30,30,30,10",
                    angle: 0,
                    alpha: "100,100,100,100,100"
                }
            });
            switch (e) {
                case "column":
                case "dragcolumn":
                case "column3d":
                    g = .25 * c;
                    e = .5 * g;
                    h = .7 * d;
                    m = .4 * d;
                    l = l.concat([a,
                        b + d, "l", 0, -h, g, 0, 0, h, "z", "m", g + e, 0, "l", 0, -d, g, 0, 0, d, "z", "m", g + e, 0, "l", 0, -m, g, 0, 0, m, "z"]);
                    n.FCcolor.angle = 270;
                    break;
                case "bar":
                case "bar3d":
                    g = .3 * c;
                    e = .6 * c;
                    h = d / 4;
                    m = h / 2;
                    l = l.concat([a, b, "L", a + e, b, a + e, b + h, a, b + h, "Z", "M", a, b + h + m, "L", a + c, b + h + m, a + c, b + h + m + h, a, b + 2 * h + m, "Z", "M", a, b + 2 * (h + m), "L", a + g, b + 2 * (h + m), a + g, b + d, a, b + d, "Z"]);
                    break;
                case "area":
                case "area3d":
                case "areaspline":
                case "dragarea":
                    h = .6 * d;
                    m = .2 * d;
                    d *= .8;
                    l = l.concat([a, b + d, "L", a, b + h, a + .3 * c, b + m, a + .6 * c, b + h, a + c, b + m, a + c, b + d, "Z"]);
                    n.FCcolor.angle = 270;
                    break;
                case "pie":
                case "pie3d":
                    g =
                        .5 * c;
                    e = .9 * g;
                    c = a + g + 1;
                    d = b + g - 1;
                    a = a + g - 1;
                    b = b + g + 1;
                    l = l.concat(["M", c, d, "L", c, d - e + 1, "A", e - 1, e - 1, 0, 0, 1, c + e - 1, d, "Z", "M", a, b, "L", a, b - e, "A", e, e, 0, 1, 0, a + e, b, "Z"]);
                    n.FCcolor.radialGradient = "1";
                    n.FCcolor.ratio = "0,0,0,100,0";
                    break;
                case "boxandwhisker2d":
                    l = l.concat([a, b, "L", a + c, b, a + c, b + d, a, b + d, "Z"]);
                    n = g.color;
                    p = "#000000";
                    break;
                default:
                    l = l.concat([a, b, "L", a + c, b, a + c, b + d, a, b + d, "Z"]), n.FCcolor.angle = 270, n.FCcolor.ratio = "0,70,30"
            }
            return {path: l, color: n, strokeWidth: .5, strokeColor: p}
        }
    });
    d.prototype = {
        configure: function () {
            var a =
                this.axisData, b = this.renderer, c = this.isVertical, d = this.isReverse, e = b.options, g = e.chart, h = g.marginBottom, g = g.marginRight, l = b.canvasTop, n = b.canvasLeft, m = this.min = a.min, m = this.span = (this.max = a.max) - m, n = this.startX = s(a.startX, n), l = this.startY = s(a.startY, l), p = this.endX = s(a.endX, b.canvasRight), a = this.endY = s(a.endY, b.canvasBottom), m = this.pixelRatio = c ? (a - l) / m : (p - n) / m, q = this.relatedObj = {};
            q.marginObj = {top: l, right: g, bottom: h, left: n};
            q.canvasObj = {x: n, y: l, w: p - n, h: a - l, toX: p, toY: a};
            this.startPixel = d ? c ? a : p : c ? l :
                n;
            this.pixelValueRatio = d ? -m : m;
            this.primaryOffset = this.secondaryOffset = 0;
            this.cache = {lowestVal: 0, highestVal: 0, indexArr: [], hashTable: {}};
            this.elements = this.elements || {};
            this.belowBandGroup && (b.elements.axes = b.elements.axes || {}, b.elements.axes.belowBandGroup = this.belowBandGroup, e && e.chart && e.chart.hasScroll && this.belowBandGroup.attr({"clip-rect": b.elements["clip-canvas"]}));
            this.poi = {}
        }, draw: function () {
            var a = this.axisData, b = a && a.plotLines || [], c = a && a.plotBands || [], d = a && a.showLine, e = a && a.tickLength, g =
                a && a.tickWidth;
            a && a.title && this.drawAxisName();
            a && a.labels && (this.renderer.addCSSDefinition("." + a.labels.className + " .fusioncharts-label", a.labels.style), this.belowLabelGroup && this.belowLabelGroup.attr("class", a.labels.className), this.topLabelGroup && this.topLabelGroup.attr("class", a.labels.className));
            b && 0 < b.length && this.drawPlotLine();
            c && 0 < c.length && this.drawPlotBands();
            isNaN(e) || 0 === e || isNaN(g) || 0 === g || this.drawTicks();
            d && this.drawLine()
        }, scroll: function () {
        }, setOffset: function (a, b) {
            var c = this.primaryOffset =
                a, d = this.secondaryOffset = b || this.secondaryOffset, e = this.isVertical, g, h, l, n = [this.topLabelGroup, this.belowLabelGroup, this.topLineGroup, this.belowLineGroup, this.topBandGroup, this.belowBandGroup], m, p;
            m = 0;
            for (p = n.length; m < p; m += 1)if (l = n[m])g = e ? d : c, h = e ? c : d, l.attr({transform: "t" + g + "," + h});
            e || this.drawPlotLine && this.drawPlotLine()
        }, update: function () {
        }, drawTicks: function () {
            var a = this.axisData, b = this.renderer.paper, c = this.min, d = this.max, e = this.isVertical, g = this.layerBelowDataset, g = this.tickGroup = this.tickGroup ||
            b.group("axis-ticks", g), h = this.relatedObj.canvasObj, l = a.offset, n = a.opposite, m = a.showAxis, p = a.tickInterval, q = a.tickLength, s = a.tickWidth, a = a.tickColor, t = c;
            if (e && m)for (c = this.getAxisPosition(c), e = this.getAxisPosition(d), h = n ? h.toX + l : h.x - l, b.path(["M", h, c, "L", h, e], g).attr({
                stroke: a,
                "stroke-width": s
            }); Za(t) <= d;)l = this.getAxisPosition(t), c = n ? h + q : h - q, b.path(["M", h, l, "L", c, l], g).attr({
                stroke: a,
                "stroke-width": s
            }), t += p
        }, getAxisPosition: function (a, b) {
            var c;
            b ? c = (a - this.startPixel) / this.pixelValueRatio + this.min :
                (a = this.axisData.reversed ? this.min + (this.max - a) : a, c = this.startPixel + (a - this.min) * this.pixelValueRatio);
            return c
        }, drawPlotLine: function () {
            var a = this.renderer, b = a.paper, c = this.isVertical, d = +!c, e = this.lines = this.lines || [], g = this.labels = this.labels || [], h = this.relatedObj.canvasObj, l = this.globalOptions || {}, n = this.elements || {}, m = this.axisData.plotLines || [], p = this.primaryOffset, q = c ? this.startY : this.startX, t = c ? this.endY : this.endX, v = parseFloat(a.canvasBorderWidth) || 0, w = Ra(m.length, Ra(e.length, g.length)), C =
                a.layers.datalabels, D = this.belowLineGroup, H = this.topLineGroup, J = this.belowLabelGroup, K = this.topLabelGroup, G = !1 !== (a.tooltip || {}).enabled, M = function (b) {
                return function (c) {
                    Ba.call(this, a, c, b)
                }
            }, l = l.chart.xDepth || 0, I = [], L = 0, P, R, V, U, Z, Y, aa, r, u, B, F, f, Ma, O, X, pb, qb, ua, ba, ja, va, ta, ga, ea, ka, fa, oa, la, qa, pa, za, Ga, Ea, Db, bb, Va, La, Da, Ca, fb, Pa, gb, ya;
            for (ya = 0; ya < w; ya += 1) {
                V = U = Z = null;
                V = e[ya];
                U = g[ya];
                if (aa = m[ya])if (r = aa.width, u = aa.isVline, B = aa.isTrend, F = aa.isGrid, f = aa.tooltext, Ma = aa.value, O = aa.color, X = aa.dashStyle,
                        pb = B ? aa.to : null, qb = aa._isStackSum, P = 3 < aa.zIndex ? H : D, ua = aa.label) {
                    ba = ua.style;
                    ja = ua.text;
                    va = ba && ba.color;
                    ta = ua.offsetScaleIndex || 0;
                    ga = ua.offsetScale;
                    if (ea = ba && ba.fontSize)ka = ea, -1 !== ka.indexOf("px") && (ka = ka.replace("px", ""), ka = parseFloat(ka));
                    R = ba && ba.lineHeight;
                    ea = ba ? {
                        fontFamily: ba.fontFamily,
                        fontSize: ba.fontSize,
                        lineHeight: ba.lineHeight,
                        fontWeight: ba.fontWeight,
                        fontStyle: ba.fontStyle
                    } : null;
                    R && (fa = R, -1 !== fa.indexOf("px") && (fa = fa.replace("px", ""), fa = parseFloat(fa)));
                    oa = ua.rotation;
                    la = ua.x || 0;
                    qa = ua.y ||
                    0;
                    pa = ua.align;
                    za = ua.verticalAlign;
                    Ga = ua.textAlign;
                    Ea = (Ea = ua.borderWidth) ? -1 !== Ea.indexOf("px") ? Ea.replace("px", "") : 1 : 1;
                    R = qb ? C : 3 <= aa.zIndex ? K : J;
                    ua.backgroundColor && (ua.labelBgClr = $({
                        color: ua.backgroundColor,
                        alpha: 100 * ua.backgroundOpacity
                    }));
                    ua.borderColor && (ua.labelBorderClr = $({color: ua.borderColor, alpha: "100"}));
                    Db = ka ? .2 * ka : 2;
                    Ga = "left" === Ga ? "start" : "right" === Ga ? "end" : "middle"
                }
                Y = Pa = "visible";
                gb = 0 > s(ga, Ma, 0);
                c ? (Va = this.getAxisPosition(Ma), Da = B ? this.getAxisPosition(pb) || Va : Va, Ca = Va !== Da ? !0 : !1, fb = ["M",
                    h.x, Va, "L", h.toX, Da], u ? a.logic.isBar && (bb = a.yAxis[ta], !qb && !isNaN(ga) && 0 <= ga && 1 >= ga && (ga = bb.min + (bb.max - bb.min) * ga), La = bb.getAxisPosition(s(ga, Ma)) + la + Db * (gb ? -1 : 1)) : La = ua ? bb = this.axisData.isOpposite || "right" === pa ? h.toX + la : h.x + la : bb = this.axisData.isOpposite ? h.toX : h.x) : (bb = this.getAxisPosition(Ma) || 0, La = B ? this.getAxisPosition(pb) || bb : bb, !B && !u && 0 < l && (bb += l, La += l, t += l), Ca = bb !== La ? !0 : !1, fb = ["M" + bb, h.y, "L", La, h.toY], Pa = bb + p < q || bb + p > t ? "hidden" : Pa, u ? (bb = a.yAxis[ta], !qb && !isNaN(ga) && 0 <= ga && 1 >= ga && (ga = bb.min +
                (bb.max - bb.min) * (1 - ga)), Va = bb.getAxisPosition(s(ga, Ma)) + qa, Va -= (v + parseFloat(Ea)) * (qa && (0 < qa ? -1 : 1))) : this.axisData.opposite || "top" === za && !F ? (Va = h.y + qa, Da = "bottom") : Va = h.toY + qa, Da = Va);
                Y = c ? Y : La + p < q || La + p > t ? "hidden" : Y;
                if (aa && "visible" === Pa && .1 < r)Ca = {
                    path: xa(fb, r),
                    stroke: O,
                    "stroke-width": r,
                    "shape-rendering": !Ca && 1 <= r ? "crisp" : void 0,
                    "stroke-dasharray": X ? X : void 0,
                    visibility: Pa
                }, V ? V.attr(Ca) : (V = e[ya] = b.path(Ca, P).css(aa.style), n.lines = n.lines || [], n.lines.push(V)), G && f && r < ma && Pa && (Z = b.path({
                    stroke: z, "stroke-width": ma,
                    ishot: !0, path: fb, fill: z
                }, a.layers.tracker)), Z = Z || V, G && f && Z.tooltip(f); else if (V || U)V && V.remove(), V = null, e && (e[ya] = null), n && n.lines && (n.lines[ya] = null);
                ua && aa && !aa.stepped && "visible" === Y && ua.text != N && " " != ua.text ? (Va = B ? "left" === pa ? Va : Da : Da, Z = La - +!u * d * l + d * (la || 0), qb ? (Da = c || oa ? "middle" : "bottom", Va += c ? 0 : ka * (gb ? -.4 : .4), oa && (Va += gb ? 4 : -2, Ga = gb ? "end" : "start")) : d && this.axisData.opposite ? (Da = sb, Ga = oa ? "start" : "middle") : Da = za, /\n|<br\s*?\/?>/ig.test(ja) && F && (oa ? (Da = "middle", Z -= d * (la || 0)) : (Da = d && this.axisData.opposite && !oa ? "middle" : $a, Va -= fa)), Ca = {
                    "class": "fusioncharts-label",
                    text: ja,
                    fill: ea ? va || O : null,
                    title: ua && (ua.originalText || N),
                    cursor: ua.link ? "pointer" : N,
                    x: Z,
                    y: Va,
                    "text-anchor": Ga,
                    "vertical-align": Da,
                    transform: " ",
                    "text-bound": [ba.backgroundColor || ua.labelBgClr, ba.borderColor || ua.labelBorderClr, ba.borderThickness || Ea, ba.borderPadding || Db, ba.borderRadius, ba.borderDash],
                    visibility: Y,
                    "line-height": ba.lineHeight
                }, U ? U.attr(Ca) : (U = g[ya] = b.text(Ca, R).attr("class", "fusioncharts-label"), V && (V.label = U), n.labels = n.labels ||
                [], n.labels.push(U)), ea && U.css(ea), aa.isDataLabel && (Y = {
                    text: ja,
                    index: L,
                    link: ua.link
                }, L += 1, U.click(M("dataLabelClick")).hover(M("dataLabelRollOver"), M("dataLabelRollOut")).data("eventArgs", Y)), oa && U.attr("transform", ["r", oa, Z, Va]), qb && U && I.push(U)) : U && (U.isRotationSet = !1, U.remove(), g && (g[ya] = null), n && n.labels && (n.labels[ya] = null));
                !V && !U || aa && null === aa.value || (aa && aa.isMinLabel ? this.poi.min = {
                    label: U,
                    index: ya,
                    line: V
                } : aa && aa.isMaxLabel ? this.poi.max = {
                    label: U,
                    index: ya,
                    line: V
                } : aa && aa.isZeroPlane && (this.poi.zero =
                {label: U, index: ya, line: V}));
                V = U = null
            }
            s(a.options.plotOptions.series.animation.duration, 0)
        }, drawPlotBands: function () {
            var a = this.renderer, b = a.paper, c = this.isVertical, d = this.axisData.plotBands || [], e = this.bands = this.bands || [], g = this.bandLabels = this.bandLabels || [], h = this.relatedObj.canvasObj, l = this.primaryOffset, n = c ? this.startY : this.startX, m = c ? this.endY : this.endX, p = a.options.chart.hasScroll, q = this.belowBandGroup, t = this.topBandGroup, v = this.belowLabelGroup, w = this.topLabelGroup, z = this.elements || {}, a = !1 !==
                (a.tooltip || {}).enabled, C, D, H, J, K, G, M, I, L, N, P, R, V, U, aa, r, u, B, F, f, Z, O, X, ba, Y, ua, ga, ja, va, oa, ea, fa, ka, ta, ma, la = Ra(d.length, e.length);
            for (ma = 0; ma < la; ma += 1) {
                ta = "visible";
                fa = e[ma];
                ka = g[ma];
                if (C = d[ma])if (D = C.tooltext, H = C.to, J = C.from, K = C.value, G = C.width, M = C.color, oa = 3 < C.zIndex ? t : q, I = C.label) {
                    if (L = I.style) {
                        if (U = L.fontSize)N = U, -1 !== N.indexOf("px") && (N = N.replace("px", ""), parseFloat(N));
                        (N = L.lineHeight) && -1 !== N.indexOf("px") && (N = N.replace("px", ""), parseFloat(N));
                        F = L.color
                    }
                    (N = I.borderWidth) && -1 !== N.indexOf("px") &&
                    N.replace("px", "");
                    P = I.align;
                    R = I.x;
                    V = I.y;
                    u = I.text;
                    B = I.originalText;
                    aa = I.backgroundColor;
                    r = I.backgroundOpacity;
                    aa && (Z = I.labelBgClr = $({color: aa, alpha: 100 * r}));
                    if (aa = I.borderColor)O = I.labelBorderClr = $({color: aa, alpha: "100"});
                    aa = I.textAlign;
                    aa = "left" === aa ? "start" : "right" === aa ? "end" : "middle";
                    r = I.verticalAlign;
                    f = I.borderType;
                    ea = 3 < C.zIndex ? w : v
                }
                X = this.getAxisPosition(s(H, K));
                ba = this.getAxisPosition(s(J, K));
                Y = c ? h.x : ba;
                ua = c ? X : h.y;
                ga = c ? h.w : (this.axisData.reversed ? ba - X : X - ba) || G || 1;
                ba = c ? ba - X || 1 : h.h;
                X = Y + ga;
                ga =
                    ib(ga);
                0 > ba && (ba = ib(ba), ua -= ba);
                c || (ta = p ? "hidden" : Y + l > m || X + l < n ? "hidden" : ta);
                I && (ja = c ? "right" === P ? h.toX + R : h.x + R : Y + ga / 2, va = c ? ua + ba / 2 : h.toY + V);
                if (!fa && C && "visible" === ta)C = {
                    x: Y,
                    y: ua,
                    width: ga,
                    height: ba,
                    fill: $(M),
                    "stroke-width": 0
                }, fa ? fa.attr(C) : (fa = e[ma] = b.rect(C, oa), z.bands = z.bands || [], z.bands[ma] = fa), a && D && fa.tooltip(D); else if (fa && (!C || "hidden" === ta)) {
                    z.labels && (g[ma] = z.labels[ma] = null);
                    fa.label && fa.label.remove();
                    e[ma] = z.bands[ma] = null;
                    fa.remove();
                    continue
                }
                fa && I && I.text && (C = {
                    "class": "fusioncharts-label",
                    text: u,
                    title: B || "",
                    fill: F,
                    "text-bound": [Z, O, N, .2 * U, "solid" === f ? !1 : !0],
                    x: ja,
                    y: va,
                    "text-anchor": aa,
                    "vertical-align": r,
                    "line-height": L.lineHeight
                }, ka ? ka.attr(C) : (ka = g[ma] = fa.label = b.text(C, ea).attr("class", "fusioncharts-label"), L && ka.css(L), z.labels = z.labels || [], z.labels[ma] = ka))
            }
        }, drawAxisName: function () {
            var a = this.axisData, b = a.title || {}, c = b && b.style, d = b && b.className, e = b.align, g = b.centerYAxisName || !1, h = this.renderer.paper, l = this.isVertical, n = this.relatedObj.canvasObj, m = s(a.offset, 0) + s(b.margin, 0), p =
                b.text || "", q = this.name || void 0, a = a.opposite, t = this.layerBelowDataset, t = t.nameGroup = t.nameGroup || h.group("axis-name", t), v = s(b.rotation, a ? 90 : 270), w = l ? a ? n.toX + m : n.x - m : (n.x + n.toX) / 2, z = {
                fontFamily: c.fontFamily,
                fontSize: c.fontSize,
                lineHeight: c.lineHeight,
                fontWeight: c.fontWeight,
                fontStyle: c.fontStyle
            }, C, g = l ? "low" === e ? n.toY : g ? (n.y + n.toY) / 2 : this.renderer.chartHeight / 2 : n.toY + m;
            p ? (!isNaN(v) && v && l && (C = c.fontSize, C = -1 != C.indexOf("px") ? C.replace("px", "") : C, a ? (w += parseFloat(C), C = 270 === v ? "bottom" : "top") : (w -= parseFloat(C),
                C = 270 === v ? "top" : "bottom")), this.renderer.addCSSDefinition("." + d, z), d = {
                "class": d,
                x: 0,
                y: 0,
                text: p,
                fill: c.color,
                "text-anchor": "low" === e ? 90 == v ? "end" : "start" : "middle",
                "vertical-align": l ? v ? C : "middle" : a ? sb : "top",
                transform: l ? "t" + w + "," + g + "r" + v : "t" + w + "," + g,
                "font-size": c.fontSize
            }, b.originalText && (d.title = b.originalText), q ? q.attr(d) : q = this.name = h.text(d, t), setTimeout(function () {
                    q.attr({
                        "line-height": c.lineHeight,
                        "text-bound": [c.backgroundColor, c.borderColor, c.borderThickness, c.borderPadding, c.borderRadius, c.borderDash]
                    })
                },
                0)) : q && q.remove();
            this.elements.name = q
        }, drawLine: function () {
            var a = this.axisData, b = this.renderer.paper, c = this.min, d = this.max, e = this.isVertical, g = a.opposite, h = this.layerBelowDataset, h = this.lineGroup = this.lineGroup || b.group("axis-lines", h), l = a.lineColor, n = a.lineThickness, m = a.lineEndExtension || 0, p = a.lineStartExtension || 0, a = this.relatedObj.canvasObj;
            e ? (c = this.getAxisPosition(c) - p, m = this.getAxisPosition(d) + m, d = e = g ? a.toX + n / 2 : a.x - n / 2) : (d = a.x - p, e = a.toX + m, c = m = g ? a.y - n / 2 : a.toY + n / 2);
            b = b.path({
                path: ["M", d, c, "L",
                    e, m], stroke: l, "stroke-width": n
            }, h);
            this.elements.axisLine = b
        }, realtimeUpdateX: function (a) {
            if (0 < a) {
                for (var b = this.axisData.plotBands, c = this.min + a, d, e = b.length; e--;)(d = b[e]) && !d.isNumVDIV && (d.value < c || d.from < c || d.to < c ? b.splice(e, 1) : (void 0 !== d.value && (d.value -= a), void 0 !== d.from && (d.from -= a), void 0 !== d.to && (d.to -= a)));
                this.drawPlotLine();
                this.drawPlotBands()
            }
        }, realtimeUpdateY: function (a, b) {
            var c = this.axisData, d = this.min = c.min = a, c = this.span = (this.max = c.max = b) - d, c = this.pixelRatio = this.isVertical ? this.relatedObj.canvasObj.h /
            c : this.relatedObj.canvasObj.w / c;
            this.pixelValueRatio = this.isReverse ? -c : c;
            this.drawPlotLine();
            this.drawPlotBands()
        }
    };
    d.prototype.constructor = d;
    b("renderer.cartesian", {
        drawCanvas: function () {
            var a = this.options.chart || {}, b = a.plotBackgroundColor, c = this.paper, d = this.elements, e = d.canvas, g = d.canvas3DBase, h = d.canvas3dbaseline, g = d.canvasBorder, l = d.canvasBg, n = this.canvasTop, m = this.canvasLeft, p = this.canvasWidth, q = this.canvasHeight, t = s(a.plotBorderRadius, 0), l = a.plotBorderWidth, v = .5 * l, w = a.plotBorderColor, z = a.isBar,
                C = a.is3D, D = a.use3DLighting, H = a.showCanvasBg, J = a.canvasBgDepth, G = a.showCanvasBase, M = a.canvasBaseColor3D, I = a.canvasBaseDepth, L = a.plotShadow, N = P && 0 === l && L && L.enabled, V = a.xDepth || 0, a = a.yDepth || 0, U = this.layers, ba = U.background, Z = U.dataset;
            U.tracker = U.tracker || c.group("hot").insertAfter(Z);
            U.datalabels = U.datalabels || c.group("datalabels").insertAfter(Z);
            U = U.canvas = U.canvas || c.group("canvas").insertAfter(ba);
            g || (d.canvasBorder = c.rect({
                x: m - v,
                y: n - v,
                width: p + l,
                height: q + l,
                r: t,
                "stroke-width": l,
                stroke: w,
                "stroke-linejoin": 2 <
                l ? "round" : "miter"
            }, U).shadow(L));
            d["clip-canvas"] = [Ra(0, m - V), Ra(0, n - a), Ra(1, p + 2 * V), Ra(1, q + 2 * a)];
            d["clip-canvas-init"] = [Ra(0, m - V), Ra(0, n - a), 1, Ra(1, q + 2 * a)];
            C && (H && (l = z ? d.canvasBg = c.path(["M", m, ",", n, "L", m + 1.2 * J, ",", n - J, ",", m + p - J, ",", n - J, ",", m + p, ",", n, "Z"], U) : d.canvasBg = c.path(["M", m + p, ",", n, "L", m + p + J, ",", n + 1.2 * J, ",", m + p + J, ",", n + q - J, ",", m + p, ",", n + q, "Z"], U), l.attr({
                "stroke-width": 0,
                stroke: "none",
                fill: $(b)
            })), G && (g = z ? d.canvas3DBase = c.cubepath(m - V - I - 1, n + a + 1, I, q, V + 1, a + 1, U) : d.canvas3DBase = c.cubepath(m - V -
            1, n + q + a + 1, p, I, V + 1, a + 1, U), g.attr({
                stroke: "none",
                "stroke-width": 0,
                fill: [M.replace(R, Y), !D]
            }), h || (h = d.canvas3dbaseline = c.path(void 0, U)), h.attr({
                path: z ? ["M", m, n, "V", q + n] : ["M", m, n + q, "H", p + m],
                stroke: K.tintshade(M.replace(R, Y), .05).rgba
            })));
            !e && b && (d.canvas = c.rect({
                x: m,
                y: n,
                width: p,
                height: q,
                r: t,
                "stroke-width": 0,
                stroke: "none",
                fill: $(b)
            }, U).shadow(N))
        }, drawAxes: function () {
            var a = this.logic, b = this.options, c = this.paper, e = this.layers, g = e.dataset, h = e.layerBelowDataset = e.layerBelowDataset || c.group("axisbottom").trackTooltip(!0),
                l = e.layerAboveDataset = e.layerAboveDataset || c.group("axistop").trackTooltip(!0), c = this.xAxis = [], e = this.yAxis = [];
            h.insertBefore(g);
            l.insertAfter(g);
            if (b.xAxis && b.xAxis.length)for (g = 0, h = b.xAxis.length; g < h; g += 1)c[g] = this.xAxis[g] = new d(b.xAxis[g], this, a.isBar); else c[0] = this.xAxis[0] = new d(b.xAxis, this, a.isBar);
            if (b.yAxis)for (g = 0, h = b.yAxis.length; g < h; g += 1)e[g] = this.yAxis[g] = new d(b.yAxis[g], this, !a.isBar, !a.isBar);
            g = 0;
            for (h = e.length; g < h; g += 1)e[g].axisData && (e[g].axisData.title && (e[g].axisData.title.className =
                "fusioncharts-yaxis-" + g + "-title"), e[g].axisData.labels && (e[g].axisData.labels.className = "fusioncharts-yaxis-" + g + "-gridlabels")), e[g].draw();
            g = 0;
            for (h = c.length; g < h; g += 1)c[g].axisData && (c[g].axisData.title && (c[g].axisData.title.className = "fusioncharts-xaxis-" + g + "-title"), c[g].axisData.labels && (c[g].axisData.labels.className = "fusioncharts-xaxis-" + g + "-gridlabels")), c[g].draw()
        }, drawScroller: function () {
            var a = this, b = a.options, c = a.paper, d = a.layers, e = a.xAxis["0"] || {}, g = e.axisData || {}, h = g.scroll || {}, l = a.canvasTop,
                n = a.canvasLeft, m = a.canvasWidth, p = a.canvasHeight, q = a.canvasBorderWidth, t = q || (g.showLine ? g.lineThickness : 0), w = q || g.lineStartExtension, g = q || g.lineEndExtension, q = b.chart.useRoundEdges, z, C, D, J, G, M, I, L, N, P, R, U, $, Z, Y, ga = d.dataset, aa = d.datalabels, r = d.tracker;
            J = d.layerAboveDataset;
            var u, B;
            h.enabled && (u = d.scroll = d.scroll || c.group("scroll").insertAfter(J), J = h.scrollRatio, b = s(b[ba].xAxisScrollPos, h.startPercent), G = h.viewPortMax, M = h.viewPortMin, C = h.vxLength, I = Da(C), L = h.showButtons, N = h.height, P = h.padding, R = h.color,
                U = h.flatScrollBars, C = h.windowedCanvasWidth = e.getAxisPosition(C), z = h.fullCanvasWidth = e.getAxisPosition(G - M) - C, D = V(b * z), $ = a.fusionCharts.jsVars._reflowData, Z = {hcJSON: {_FCconf: {xAxisScrollPos: 0}}}, Y = Z.hcJSON._FCconf, d.scroller = c.scroller(n - w, l + p + t + P - !!t, m + w + g, N, !0, {
                showButtons: L,
                displayStyleFlat: U,
                scrollRatio: J,
                scrollPosition: b
            }, u).data("fullCanvasWidth", z).data("windowedCanvasWidth", C).attr({
                "scroll-display-style": U,
                fill: R,
                r: q && 2 || 0
            }).scroll(function (b) {
                var c;
                D = -V(b * z);
                ga && ga.transform(["T", D, 0]);
                aa &&
                aa.transform(["T", D, 0]);
                r && r.transform(["T", D, 0]);
                e.setOffset && e.setOffset(D);
                c = {position: b, direction: b - h.lastPos || 0, vxLength: I};
                Y.xAxisScrollPos = h.lastPos = b;
                H($, Z, !0);
                if (0 !== c.direction)for (B = 0; B < a.datasets.length; B++)a[a.datasets[B].drawPlot + "Scroll"] && a[a.datasets[B].drawPlot + "Scroll"].call(a, a.plots[B], a.datasets[B], c)
            }), function () {
                var b;
                K.eve.on("raphael.scroll.start." + d.scroller.id, function (c) {
                    b = c;
                    v.raiseEvent("scrollstart", {scrollPosition: c}, a.logic.chartInstance)
                });
                K.eve.on("raphael.scroll.end." +
                d.scroller.id, function (c) {
                    v.raiseEvent("scrollend", {prevScrollPosition: b, scrollPosition: c}, a.logic.chartInstance)
                })
            }());
            return h.enabled
        }, finalizeScrollPlots: function () {
            var a = this, b = a.container, d = a.elements, e = a.layers, g = e.scroller, l = e.dataset, n = e.datalabels, e = e.tracker, m, p = {}, t, z = a.xAxis["0"] || {}, C = (z.axisData || {}).scroll || {}, D = s(a.options[ba].xAxisScrollPos, C.startPercent), H = C.fullCanvasWidth;
            C.enabled && (l.attr({"clip-rect": d["clip-canvas"]}), n.attr({"clip-rect": d["clip-canvas"]}), e.attr({"clip-rect": d["clip-canvas"]}),
                d = function (b) {
                    var d = a.elements.canvas, e = m.left, l = m.top, n = b.state, q = Z && c.getTouchEvent(b) || h;
                    b = b.originalEvent;
                    e = (b.clientX || b.pageX || q.pageX) - e;
                    l = (b.clientY || b.pageY || q.pageY) - l;
                    switch (n) {
                        case "start":
                            t = d.isPointInside(e, l);
                            p.ox = t && e || null;
                            if (!t)return !1;
                            p.prevScrollPosition = g.attrs["scroll-position"];
                            v.raiseEvent("scrollstart", {scrollPosition: p.prevScrollPosition}, a.logic.chartInstance);
                            break;
                        case "end":
                            v.raiseEvent("scrollend", {
                                    prevScrollPosition: p.prevScrollPosition,
                                    scrollPosition: p.scrollPosition
                                },
                                a.logic.chartInstance);
                            t = !1;
                            p = {};
                            break;
                        default:
                            if (!t)break;
                            d = e - p.ox;
                            p.ox = e;
                            p.scrollPosition = g.attrs["scroll-position"] - d / H;
                            g.attr({"scroll-position": p.scrollPosition})
                    }
                }, Z && (m = c.getPosition(b), b && (w(b, "pointerdrag", d), q(b, "pointerdrag", d))), 0 < D && (b = -V(D * H), l && l.transform(["T", b, 0]), n && n.transform(["T", b, 0]), e && e.transform(["T", b, 0]), z.setOffset && z.setOffset(b)))
        }, drawPlotColumn: function (a, b, c) {
            var d = this, e = a.data, g = e.length, h = a.items, l = a.graphics || (a.graphics = []), m = d.paper, p = d.smartLabel, q = d.logic,
                t = d.layers, v = d.options, w = d.elements, D = v.chart, H = !1 !== (v.tooltip || {}).enabled, J, G = d.definition.chart, I = v.plotOptions.series, L = I.dataLabels.style, N = d.xAxis[b.xAxis || 0], P = d.yAxis[b.yAxis || 0], R = d.chartWidth, ca = d.chartHeight, U = P.axisData.reversed, Z = q.isLog, Y = q.is3D, ga = q.isStacked, fa = q.isWaterfall, ta = q.isCandleStick, aa = ja(N.axisData.scroll, {}), r = c || {}, u = aa.enabled, B = s(r.position, v[ba].xAxisScrollPos, aa.startPercent), F = r.vxLength || Da(aa.vxLength), f = r.scrollStart || Ra(0, V((g - F) * B) - 1) || 0, Ma = r.scrollEnd || oa(g,
                        f + F + 2) || g, O = D.canvasBorderOpacity = K.color(D.plotBorderColor).opacity, X = d.canvasBorderWidth, pb = D.isCanvasBorder = 0 !== O && 0 < X, ea, ua = c !== Pa ? 0 : isNaN(+I.animation) && I.animation.duration || 1E3 * I.animation, la = b.numColumns || 1, qa = b.columnPosition || 0, va = D.use3DLighting, pa = !1 === b.visible ? "hidden" : "visible", xa = D.overlapColumns, za = N.getAxisPosition(0), ka = N.getAxisPosition(1) - za, ya = G && G.plotspacepercent, Pb = s(G && G.plotpaddingpercent), Ga = I.groupPadding, Ca = I.maxColWidth, Ea = (1 - .01 * ya) * ka || oa(ka * (1 - 2 * Ga), Ca * la), Xa = Ea /
                    2, Ka = Ea / la, Pc = oa(Ka - 1, 1 < la ? xa || Pb !== Pa ? 0 < Pb ? Ka * Pb / 100 : 0 : 4 : 0), Db = qa * Ka - Xa + Pc / 2, bb = P.max, Va = P.min, La = 0 < bb && 0 <= Va, Za = 0 >= bb && 0 > Va, db = 0 < bb && 0 > Va, fb = Za || U && La ? bb : Z || La ? Va : 0, ic = P.yBasePos = P.getAxisPosition(fb), gb, nb = s(D.useRoundEdges, 0), xc = t.dataset = t.dataset || m.group("dataset-orphan"), Sa = t.datalabels = t.datalabels || m.group("datalabels").insertAfter(xc), id = t.tracker, $a = d.canvasTop, sb = d.canvasLeft, vb = d.canvasWidth, yb = d.canvasBottom, Fc = d.canvasRight, vc, Fb, Dc, Gc, bc, cc, Mc, Ib, $b, ob, eb, pc, tb, zc, Cb, Vb, zb, Ta, Ac,
                Wb, Qa, Eb, ub, Xb, Aa, Nc, Ya, Hb, ab, mc, sc, wc, qc, Oc, kb, ad, Jb, Ia, Yb, Bc = function (a) {
                    Ba.call(this, d, a)
                }, Qb = function (a, b) {
                    return function (c) {
                        a.attr(b);
                        Ba.call(this, d, c, "DataPlotRollOver")
                    }
                }, Rb = function (a, b) {
                    return function (c) {
                        a.attr(b);
                        Ba.call(this, d, c, "DataPlotRollOut")
                    }
                };
            d.addCSSDefinition(".fusioncharts-datalabels .fusioncharts-label", {
                fontFamily: L.fontFamily,
                fontSize: L.fontSize,
                lineHeight: L.lineHeight,
                fontWeight: L.fontWeight,
                fontStyle: L.fontStyle,
                color: L.color
            });
            Sa.attr("class", "fusioncharts-datalabels");
            ua && (!c && Sa.attr({transform: "...t" + R + "," + ca}), d.animationCompleteQueue.push({
                fn: function () {
                    Sa.attr({transform: "...t" + -R + "," + -ca})
                }, scope: d
            }));
            Ka -= Pc;
            u && f > Ma - F - 2 && (f = Ra(0, Ma - F - 2));
            ga && (ad = xc.shadows || (xc.shadows = m.group("shadows", xc).toBack()));
            ab = xc.column || (xc.column = m.group("columns", xc));
            ta || Y || u || ab.attrs["clip-rect"] || ab.attr({"clip-rect": w["clip-canvas"]});
            fa && ab.toBack();
            if (Y)for (bc = D.xDepth || 0, cc = D.yDepth || 0, mc = ab.negative = ab.negative || m.group("negative-values", ab), qc = ab.column = ab.column ||
            m.group("positive-values", ab), wc = ab.zeroPlane, !wc && 0 > Va && 0 <= bb && (wc = ab.zeroPlane = m.group("zero-plane", ab).insertBefore(qc), Fb = D.zeroPlaneColor, Dc = D.zeroPlaneBorderColor, Gc = D.zeroPlaneShowBorder, w.zeroplane = m.cubepath(sb - bc, ic + cc, vb, 1, bc, cc, wc).attr({
                fill: [Fb, !va],
                stroke: Dc || "none",
                "stroke-width": Gc ? 1 : 0
            })), (sc = mc.data("categoryplots")) || (mc.data("categoryplots", Array(g)), sc = mc.data("categoryplots")), (Oc = qc.data("categoryplots")) || (qc.data("categoryplots", Array(g)), Oc = qc.data("categoryplots")), ob = 0; ob <
                       g; ob += 1)sc[ob] = sc[ob] || m.group(mc), Oc[ob] = Oc[ob] || m.group(qc); else kb = ab;
            p.setStyle({
                fontFamily: L.fontFamily,
                fontSize: L.fontSize,
                lineHeight: L.lineHeight,
                fontWeight: L.fontWeight,
                fontStyle: L.fontStyle
            });
            for (ob = f; ob < Ma; ob += 1) {
                eb = e[ob];
                Cb = eb.y;
                J = eb.toolText;
                vc = a.index + "_" + ob;
                Ya = Hb = null;
                if (null === Cb) {
                    if ($b = h[ob])Ya = $b.graphic, Y || Ya.attr({height: 0})
                } else {
                    Mc = !1;
                    zc = s(eb.x, ob);
                    pc = eb.link;
                    tb = n(eb.borderWidth) || 0;
                    Nc = eb._FCW * ka;
                    zb = N.getAxisPosition(eb._FCX) || N.getAxisPosition(zc) + Db;
                    Vb = eb.previousY;
                    Ac = P.getAxisPosition(Vb ||
                    fb);
                    Ta = P.getAxisPosition(Cb + (Vb || 0));
                    Qa = ib(Ta - Ac);
                    Eb = Nc || Ka;
                    Yb = {
                        index: ob,
                        link: pc,
                        value: eb.y,
                        displayValue: eb.displayValue,
                        categoryLabel: eb.categoryLabel,
                        toolText: eb.toolText,
                        id: a.userID,
                        datasetIndex: a.index,
                        datasetName: a.name,
                        visible: a.visible
                    };
                    if (Y) {
                        0 > Cb && (Ta = Ac, Mc = !0);
                        kb = 0 > Cb ? sc : Oc;
                        ($b = h[ob]) || ($b = h[ob] = {
                            index: ob,
                            value: Cb,
                            graphic: m.cubepath(kb[ob]),
                            dataLabel: null,
                            tracker: null,
                            hot: null
                        });
                        Ya = $b.graphic;
                        Xb = Aa = {};
                        eb.hoverEffects && (Xb = {
                            fill: [$(eb.color), !va],
                            stroke: tb && $(eb.borderColor) || "NONE",
                            "stroke-width": tb
                        },
                            ub = eb.rolloverProperties, Aa = {
                            fill: [$(ub.color), !va],
                            stroke: ub.borderWidth && $(ub.borderColor) || "NONE",
                            "stroke-width": ub.borderWidth
                        });
                        Ya.attr({
                            cubepath: [zb - bc, ua ? ic + cc : Ta + cc, Eb, ua ? 0 : Qa, bc, cc],
                            fill: [$(eb.color), !va],
                            stroke: tb && $(eb.borderColor) || "NONE",
                            "stroke-width": tb,
                            visibility: pa
                        }).shadow(I.shadow && eb.shadow, ad).data("BBox", {height: Qa, width: Eb, x: zb, y: Ta});
                        ua && Ya.animate({cubepath: [zb - bc, Ta + cc, Eb, Qa, bc, cc]}, ua, "normal", d.getAnimationCompleteFn());
                        if (pc || H)!ga && Qa < ma && (Ta -= (ma - Qa) / 2, Qa = ma), $b.tracker ||
                        ($b.tracker = m.cubepath(id)), Hb = $b.tracker, Hb.attr({
                            cubepath: [zb - bc, Ta + cc, Eb, Qa, bc, cc],
                            cursor: pc ? "pointer" : "",
                            stroke: tb && z || "NONE",
                            "stroke-width": tb,
                            fill: z,
                            ishot: !0,
                            visibility: pa
                        });
                        (Hb || Ya).data("eventArgs", Yb).data("groupId", vc).click(Bc).hover(Qb(Ya, Aa), Rb(Ya, Xb)).tooltip(J);
                        (Hb || Ya)._.cubetop.data("eventArgs", Yb).data("groupId", vc).click(Bc).hover(Qb(Ya, Aa), Rb(Ya, Xb)).tooltip(J);
                        (Hb || Ya)._.cubeside.data("eventArgs", Yb).data("groupId", vc).click(Bc).hover(Qb(Ya, Aa), Rb(Ya, Xb)).tooltip(J);
                        ga && Mc && (Ya.toBack(),
                        Hb && Hb.toBack())
                    } else {
                        Ib = !1;
                        if (!Z && !U && 0 > Cb || !Z && U && 0 < Cb)Ta = Ac, Ib = !0;
                        U && !db && 0 < Cb && (Ta = Ac - Qa, Ib = !1);
                        fa && 0 > Cb && C(Vb) && (Ta -= Qa, Ib = !0);
                        ta || u || (M(Ta) <= $a && (Qa -= $a - Ta - +pb, Ta = $a - +pb), V(Ta + Qa) >= yb && (Qa -= V(Ta + Qa) - yb + +!!tb + +pb, D.xAxisLineVisible && !pb && (Qa += 1)), 1 >= tb && (V(zb) <= sb && (Eb += zb, zb = sb - tb / 2 + +!!tb - +pb, Eb -= zb), V(zb + Eb) >= Fc && (Eb = Fc - zb + tb / 2 - +!!tb + +pb)));
                        Jb = K.crispBound(zb, Ta, Eb, Qa, tb);
                        zb = Jb.x;
                        Ta = Jb.y;
                        Eb = Jb.width;
                        Qa = Jb.height;
                        if (!ta && pb && (!C(Vb) || fa && Vb === Cb && Cb === eb._FCY))if (Za && !U)ea = Ta - ($a - tb / 2),
                            Qa += ea, ic = Ta -= ea; else if (Z || La || U && Za)Qa = yb - Ta + tb / 2, ic = Ta + Qa;
                        fa && Vb && 0 < tb && 0 !== I.connectorOpacity && 1 === I.connectorWidth && I.connectorDashStyle && (Qa -= 1, 0 > Cb && (Ta += 1));
                        1 > Qa && (Ta += 0 > Cb ? 1 : 0 === Cb ? 0 : -(1 - Qa), Qa = 1);
                        b._columnWidth = Eb;
                        if (!($b = h[ob])) {
                            $b = h[ob] = {
                                index: ob,
                                value: Cb,
                                width: Eb,
                                graphic: null,
                                valueBelowPlot: Ib,
                                dataLabel: null,
                                tracker: null
                            };
                            gb = 0;
                            ua || (ic = Ta, gb = Qa || 1);
                            Xb = Aa = {};
                            eb.hoverEffects && (Xb = {
                                fill: $(eb.color),
                                stroke: $(eb.borderColor),
                                "stroke-width": tb,
                                "stroke-dasharray": eb.dashStyle
                            }, ub = eb.rolloverProperties,
                                Aa = {
                                    fill: $(ub.color),
                                    stroke: $(ub.borderColor),
                                    "stroke-width": ub.borderWidth,
                                    "stroke-dasharray": ub.dashStyle
                                });
                            Ia = {
                                x: zb,
                                y: ic,
                                width: Eb,
                                height: gb,
                                r: nb,
                                fill: $(eb.color),
                                stroke: $(eb.borderColor),
                                "stroke-width": tb,
                                "stroke-dasharray": eb.dashStyle,
                                "stroke-linejoin": "miter",
                                visibility: pa
                            };
                            Ya ? Ya.attr(Ia) : Ya = $b.graphic = m.rect(Ia, kb);
                            Ya.shadow(I.shadow && eb.shadow, ad).data("BBox", Jb);
                            ua && Ya.animate({y: Ta, height: Qa || 1}, ua, "normal", d.getAnimationCompleteFn());
                            if (pc || H)!ga && Qa < ma && (Ta -= (ma - Qa) / 2, Qa = ma), Ia = {
                                x: zb,
                                y: Ta,
                                width: Eb,
                                height: Qa,
                                r: nb,
                                cursor: pc ? "pointer" : "",
                                stroke: z,
                                "stroke-width": tb,
                                fill: z,
                                ishot: !0,
                                visibility: pa
                            }, (Hb = $b.tracker) ? Hb.attr(Ia) : Hb = $b.tracker = m.rect(Ia, id);
                            Hb = $b.tracker;
                            (Hb || Ya).data("eventArgs", Yb).data("groupId", vc).click(Bc).hover(Qb(Ya, Aa), Rb(Ya, Xb)).tooltip(J)
                        }
                    }
                    Wb = d.drawPlotColumnLabel(a, b, ob, zb, Ta)
                }
                Wb && l.push(Wb);
                Ya && l.push(Ya);
                Hb && l.push(Hb);
                d.drawTracker && d.drawTracker.call(d, a, b, ob)
            }
            a.visible = !1 !== b.visible;
            return a
        }, drawPlotColumnScroll: function (a, b, c) {
            var d = a.data.length, e = a.items,
                g;
            g = c.vxLength;
            var h = Ra(0, V((d - g) * c.position) - 1) || 0, d = oa(d, h + g + 2) || d;
            h > d - g - 2 && (h = Ra(0, d - g - 2));
            c.scrollEnd = d;
            for (g = h; g < d; g++)if (!e[g]) {
                c.scrollStart = g;
                this.drawPlotColumn(a, b, c);
                break
            }
        }, drawPlotColumnLabel: function (a, b, c, d, e, g) {
            var h = this.options, l = this.logic, n = h.chart;
            d = this.paper;
            var m = this.smartLabel, p = this.layers, h = h.plotOptions.series.dataLabels.style, q = 1 === n.rotateValues ? 270 : 0, s = this.canvasHeight, t = this.canvasTop, v = a.data[c];
            a = a.items[c];
            var w = n.valuePadding + 2, z = a.graphic;
            c = a.dataLabel;
            var D =
                ja(a.valueBelowPlot, 0 > v.y), H = l.isStacked, l = l.is3D, J = n.xDepth || 0, G = n.yDepth || 0, K = v.displayValue;
            b = !1 === b.visible ? "hidden" : "visible";
            var n = n.placeValuesInside, I;
            g = g || p.datalabels;
            C(K) && K !== N && null !== v.y ? (a._state && a._state.labelWidth || (m = m.getOriSize(K), a._state = q ? {
                labelWidth: m.height,
                labelHeight: m.width
            } : {
                labelWidth: m.width,
                labelHeight: m.height
            }), z = z.data("BBox"), p = z.height, m = I = a._state.labelHeight + w, w = .5 * I + w, z = z.x + .5 * z.width, I = D ? t + s - (e + p) : e - t, H ? (e = oa(t + s - .5 * m, e + .5 * p + (G || 0)), e = Ra(t + .5 * m, e), z -= J) : n ?
                p >= m ? (e += D ? p - w : w, v._valueBelowPoint = 1, l && (z -= J, e += G)) : I >= m ? (e += D ? p + w : -w, l && D && (z -= J, e += G)) : (e += D ? p - w : w, v._valueBelowPoint = 1, l && (z -= J, e += G)) : I >= m ? (e += D ? p + w : -w, l && (D ? (z -= J, e += G) : z -= J / 2)) : (e += D ? p - w : w, v._valueBelowPoint = 1, l && (z -= J, e += G)), c ? c.attr({
                x: z,
                y: e,
                visibility: b
            }) : c = a.dataLabel = d.text({
                text: K,
                "class": "fusioncharts-label",
                x: z,
                y: e,
                fill: h.color,
                "font-size": h.fontSize,
                visibility: b
            }, g).attr({
                "line-height": h.lineHeight,
                "text-bound": [h.backgroundColor, h.borderColor, h.borderThickness, h.borderPadding, h.borderRadius,
                    h.borderDash]
            }), q && c.attr("transform", "T0,0,R" + q)) : c && c.attr({text: N});
            return c
        }, drawPlotFloatedcolumn: function (a, b) {
            this.drawPlotColumn.call(this, a, b)
        }, drawPlotColumn3d: function (a, b) {
            this.drawPlotColumn.call(this, a, b)
        }, drawPlotBar: function (a, b) {
            var c = this, d = a.data, e = d.length, g = a.items, h = a.graphics = [], l = c.paper, m = c.logic, p = c.layers, q = c.options, t = c.elements, w = q.chart, v = !1 !== (q.tooltip || {}).enabled, C, D = c.definition.chart, q = q.plotOptions.series, H = q.dataLabels.style, J = {
                fontFamily: H.fontFamily, fontSize: H.fontSize,
                lineHeight: H.lineHeight, fontWeight: H.fontWeight, fontStyle: H.fontStyle
            }, H = c.xAxis[b.xAxis || 0], G = c.yAxis[b.yAxis || 0], I = m.is3D, m = m.isStacked, L = w.canvasBorderOpacity = K.color(w.plotBorderColor).opacity, N = c.canvasBorderWidth, L = w.isCanvasBorder = 0 !== L && 0 < N, N = isNaN(+q.animation) && q.animation.duration || 1E3 * q.animation, P = b.numColumns || 1, R = b.columnPosition || 0, U = w.use3DLighting, Z = !1 === b.visible ? "hidden" : "visible", ba = w.overlapColumns, Y = H.getAxisPosition(0), Y = H.getAxisPosition(1) - Y, ga = D && D.plotspacepercent, D = s(D &&
            D.plotpaddingpercent), fa = q.groupPadding, aa = q.maxColWidth, ga = (1 - .01 * ga) * Y || oa(Y * (1 - 2 * fa), aa * P), Y = ga / 2, ga = ga / P, ba = oa(ga - 1, 1 < P ? ba || D !== Pa ? 0 < D ? ga * D / 100 : 0 : 4 : 0), P = ga - ba, R = R * ga - Y + ba / 2, r = G.max, u = G.min, ba = G.getAxisPosition(0 > r && 0 > u ? r : 0 < r && 0 < u ? u : 0), D = s(w.useRoundEdges, 0), B = c.canvasTop, Y = c.canvasLeft, F = c.canvasHeight, ga = c.canvasRight, f = c.chartWidth, ta = c.chartHeight, O, X, ja, ea, ua, la, qa, va, pa, xa, fa = G.axisData.effectiveZeroPlaneThickness;
            qa = p.dataset = p.dataset || l.group("dataset-orphan");
            var za = p.datalabels = p.datalabels ||
            l.group("datalabels").insertAfter(qa), p = p.tracker, ka, ya, Pb, Da, Ga, Ea, aa = function (a) {
                Ba.call(this, c, a)
            }, Ca = function (a, b) {
                return function (d) {
                    a.attr(b);
                    Ba.call(this, c, d, "DataPlotRollOver")
                }
            }, Ra = function (a, b) {
                return function (d) {
                    a.attr(b);
                    Ba.call(this, c, d, "DataPlotRollOut")
                }
            }, Ka;
            c.addCSSDefinition(".fusioncharts-datalabels .fusioncharts-label", J);
            za.attr("class", "fusioncharts-datalabels");
            N && (c.animationCompleteQueue.push({
                fn: function () {
                    za.attr({transform: "...t" + -f + "," + -ta})
                }, scope: c
            }), za.attr({
                transform: "...t" +
                f + "," + ta
            }));
            m && (Ga = qa.shadows || (qa.shadows = l.group("shadows", qa).toBack()));
            va = qa.column = qa.column || l.group("bars", qa);
            if (I)for (O = w.xDepth || 0, X = w.yDepth || 0, J = va.negative = va.negative || l.group("negative-values", va), qa = va.column = va.column || l.group("positive-values", va), Pb = va.zeroPlane, !Pb && 0 > u && 0 <= r && (Pb = va.zeroPlane = l.group("zero-plane", va).insertBefore(qa), xa = w.zeroPlaneColor, r = w.zeroPlaneBorderColor, u = w.zeroPlaneShowBorder, t.zeroplane = l.cubepath(ba - O, B + X, 1, F, O, X, Pb).attr({
                fill: [xa, !U], stroke: r || "none",
                "stroke-width": u ? 1 : 0
            })), (Pb = J.data("categoryplots")) || (J.data("categoryplots", Array(e)), Pb = J.data("categoryplots")), (xa = qa.data("categoryplots")) || (qa.data("categoryplots", Array(e)), xa = qa.data("categoryplots")), t = 0; t < e; t += 1)Pb[t] = Pb[t] || l.group(J), xa[t] = xa[t] || l.group(qa); else va.attrs["clip-rect"] || va.attr({"clip-rect": t["clip-canvas"]}), Da = va;
            t = 0;
            for (J = e - 1; t < e; t += 1, J -= 1) {
                B = d[t];
                u = B.y;
                ka = F = null;
                if (null === u) {
                    if (la = g[t])ka = la.graphic, I || ka.attr({width: 0})
                } else {
                    va = s(B.x, t);
                    qa = B.link;
                    C = B.toolText;
                    r =
                        n(B.borderWidth) || 0;
                    va = H.getAxisPosition(va) + R;
                    la = (ja = B.previousY) ? G.getAxisPosition(ja) : ba;
                    pa = G.getAxisPosition(u + (ja || 0));
                    ja = ib(pa - la);
                    0 < u && (pa = la);
                    ya = {
                        index: t,
                        link: qa,
                        value: B.y,
                        displayValue: B.displayValue,
                        categoryLabel: B.categoryLabel,
                        toolText: B.toolText,
                        id: a.userID,
                        datasetIndex: a.index,
                        datasetName: a.name,
                        visible: a.visible
                    };
                    if (I) {
                        Da = 0 > u ? Pb : xa;
                        (la = g[t]) || (la = g[t] = {
                            index: t,
                            value: u,
                            graphic: l.cubepath(Da[J]),
                            dataLabel: null,
                            tracker: null
                        });
                        ka = la.graphic;
                        ua = ea = {};
                        B.hoverEffects && (ua = {
                            fill: [$(B.color),
                                !U], stroke: r && $(B.borderColor) || "NONE", "stroke-width": r
                        }, ea = B.rolloverProperties, ea = {
                            fill: [$(ea.color), !U],
                            stroke: ea.borderWidth && $(ea.borderColor) || "NONE",
                            "stroke-width": ea.borderWidth
                        });
                        ka.attr({
                            cubepath: [N ? ba - O : pa - O, va + X, N ? 0 : ja, P, O, X],
                            fill: [$(B.color), !U],
                            stroke: r && $(B.borderColor) || "NONE",
                            "stroke-width": r,
                            "stroke-dasharray": B.dashStyle,
                            cursor: qa ? "pointer" : "",
                            visibility: Z
                        }).shadow(q.shadow && B.shadow, Ga).data("BBox", {height: P, width: ja, x: pa, y: va});
                        N && ka.animate({cubepath: [pa - O, va + X, ja, P, O, X]}, N,
                            "normal", c.getAnimationCompleteFn());
                        if (qa || v)!m && ja < ma && (pa -= (ma - ja) / 2, ja = ma), la.tracker || (la.tracker = l.cubepath(p)), F = la.tracker, F.attr({
                            cubepath: [pa - O, va + X, ja, P, O, X],
                            cursor: qa ? "pointer" : "",
                            stroke: r && z || "NONE",
                            "stroke-width": r,
                            fill: z,
                            ishot: !0
                        });
                        (F || ka).data("eventArgs", ya).click(aa).hover(Ca(ka, ea), Ra(ka, ua)).tooltip(C);
                        (F || ka)._.cubetop.data("eventArgs", ya).click(aa).hover(Ca(ka, ea), Ra(ka, ua));
                        (F || ka)._.cubeside.data("eventArgs", ya).click(aa).hover(Ca(ka, ea), Ra(ka, ua));
                        if (!m || m && 0 > u)ka.toBack(),
                        F && F.toBack()
                    } else {
                        M(pa) <= Y && (ja += pa, pa = Y + r / 2 + .2, w.xAxisLineVisible && !L && (pa -= 1), ja -= pa);
                        V(pa + ja) >= ga && (ja = ga - pa - r / 2 - .2);
                        Ea = K.crispBound(pa, va, ja, P, r);
                        pa = Ea.x;
                        va = Ea.y;
                        ja = Ea.width;
                        Ka = Ea.height;
                        1 >= ja && (ja = 1, pa += 0 > u ? -ja : 0 === u ? 0 : 1 < fa ? ja : 0);
                        (la = g[t]) || (la = g[t] = {
                            index: t,
                            value: u,
                            height: Ka,
                            graphic: null,
                            dataLabel: null,
                            tracker: null
                        });
                        ka = la.graphic;
                        ua = ea = {};
                        B.hoverEffects && (ua = {
                            fill: $(B.color),
                            stroke: $(B.borderColor),
                            "stroke-width": r,
                            "stroke-dasharray": B.dashStyle
                        }, ea = B.rolloverProperties, ea = {
                            fill: $(ea.color),
                            stroke: $(ea.borderColor), "stroke-width": ea.borderWidth, "stroke-dasharray": ea.dashStyle
                        });
                        u = {
                            x: N ? ba : pa,
                            y: va,
                            width: N ? 0 : ja || 1,
                            height: Ka,
                            r: D,
                            fill: $(B.color),
                            stroke: $(B.borderColor),
                            "stroke-width": r,
                            "stroke-dasharray": B.dashStyle,
                            "stroke-linejoin": "miter",
                            cursor: qa ? "pointer" : "",
                            visibility: Z
                        };
                        ka ? ka.attr(u) : ka = la.graphic = l.rect(u, Da);
                        ka.shadow(q.shadow && B.shadow, Ga).data("BBox", Ea);
                        N && ka.animate({x: pa, width: ja || 1}, N, "normal", c.getAnimationCompleteFn());
                        if (qa || v)!m && ja < ma && (pa -= (ma - ja) / 2, ja = ma), F = la.tracker,
                            u = {
                                x: pa,
                                y: va,
                                width: ja,
                                height: P,
                                r: D,
                                cursor: qa ? "pointer" : "",
                                stroke: z,
                                "stroke-width": r,
                                fill: z,
                                ishot: !0
                            }, F ? F.attr(u) : F = la.tracker = l.rect(u, p), F.data("eventArgs", ya);
                        (F || ka).data("eventArgs", ya).click(aa).hover(Ca(ka, ea), Ra(ka, ua)).tooltip(C)
                    }
                    C = c.drawPlotBarLabel(a, b, t, pa, va)
                }
                C && h.push(C);
                ka && h.push(ka);
                F && h.push(F);
                c.drawTracker && c.drawTracker.call(c, a, b, t)
            }
            a.visible = !1 !== b.visible;
            return a
        }, drawPlotBarLabel: function (a, b, c, d, e, g) {
            var h = this.options, l = this.logic, n = h.chart, m = this.paper, p = this.layers, q =
                h.plotOptions.series.dataLabels.style, h = this.canvasLeft, s = this.canvasWidth, t = a.data[c], w = a.items[c];
            a = n.valuePadding + 2;
            var z = w.graphic;
            c = w.dataLabel;
            var v = 0 > t.y, D = l.isStacked, l = l.is3D, H = n.xDepth || 0, J = n.yDepth || 0, G = t.displayValue;
            b = !1 === b.visible ? "hidden" : "visible";
            n = n.placeValuesInside;
            g = g || p.datalabels;
            if (C(G) && G !== N && null !== t.y) {
                c || (c = w.dataLabel = m.text({
                    "class": "fusioncharts-label",
                    text: G,
                    "font-size": q.fontSize,
                    title: t.originalText || "",
                    fill: q.color,
                    x: 0,
                    y: 0,
                    "line-height": q.lineHeight
                }, g).attr("text-bound",
                    [q.backgroundColor, q.borderColor, q.borderThickness, q.borderPadding, q.borderRadius, q.borderDash]));
                q = c.getBBox();
                g = z.data("BBox");
                t = g.height;
                p = g.width;
                g = D ? "middle" : v ? n ? "start" : "end" : n ? "end" : "start";
                m = v ? d - h : h + s - (d + p);
                q = q.width;
                q += a;
                t = e + .5 * t;
                z = d + (v ? 0 : p);
                e = v ? d - h : h + s - (d + p);
                if (D)z = Ra(h + .5 * q, z + .5 * (v ? p : -p)), z = oa(h + s - .5 * q, z), z -= l ? H : 0, t += l ? J : 0; else if (n ? p >= q ? (z += v ? a : -a, l && (t += J, z -= H)) : q < m ? (z += v ? -a : a, g = v ? "end" : "start", l && v && (z -= H)) : (v ? (z = d + p + Ra(q - d - p + h, 0) - a, g = "end", z -= l ? H : 0) : (z = d - Ra(q - (h + s - d), 0) + a, g = "start"),
                    l && (z -= H, t += J)) : e >= q ? (z += v ? -a : a, l && v && (z -= H, t += H)) : (z += v ? a + q : -(a + q), l && (z -= H, t += J)), z > h + s || z < h)z = h + 4, g = "start";
                c.attr({x: z, y: t, "text-anchor": g, visibility: b})
            } else c && c.attr({text: N});
            return c
        }, drawPlotBar3d: function (a, b) {
            this.drawPlotBar.call(this, a, b)
        }, drawPlotLine: function (a, b) {
            var c = this, d = c.paper, e = c.elements, g = c.options, h = g.chart, m = c.logic, p = g.plotOptions.series, q = a.items, t = a.graphics = a.graphics || [], w, v = c.xAxis[b.xAxis || 0], C = c.yAxis[b.yAxis || 0], D = m.multisetRealtime || m.dragExtended, H = m.isWaterfall,
                J, G, M, L, N, P = 0, R = !1 !== (g.tooltip || {}).enabled, U, V = isNaN(+p.animation) && p.animation.duration || 1E3 * p.animation, ba, Z = p.dataLabels.style, Y = {
                    fontFamily: Z.fontFamily,
                    fontSize: Z.fontSize,
                    lineHeight: Z.lineHeight,
                    fontWeight: Z.fontWeight,
                    fontStyle: Z.fontStyle
                }, ja = h.xDepth || 0, ga = h.yDepth || 0, aa = h.series2D3Dshift, r = b.step, u = b.drawVerticalJoins, B = b.useForwardSteps, F = a.data, f = !1 === b.visible ? "hidden" : "visible", ea, O = F.length, X = v.getAxisPosition(0), fa = v.getAxisPosition(1) - X, la = fa * O, ua = v.axisData.scroll || {}, ma = h.hasScroll || !1, ta, va = p.connectNullData, pa = c.chartWidth, qa = c.chartHeight, xa = function () {
                    Vb.attr({"clip-rect": null});
                    Cb.show();
                    zc.show();
                    zb.show();
                    Fc.attr({transform: "...t" + -pa + "," + -qa})
                }, ka, za, ya, Da, Ea, Ca, Ga, Pa = null, Ka, Db, bb = p.connectorWidth = n(b.lineWidth), Va = b.color, La, Xa, Za = p.connectorDashStyle = b.dashStyle, fb, ib, gb, db, $a, Sa, nb, sb, vb, yb = c.layers, Fb = yb.dataset = yb.dataset || d.group("dataset-orphan"), Fc = yb.datalabels = yb.datalabels || d.group("datalabels").insertAfter(Fb), vc = yb.tracker, $c = e["clip-canvas-init"].slice(0),
                Dc = e["clip-canvas"].slice(0), Gc = C.axisData.reversed, bc = C.max, cc = C.min, Mc = C.getAxisPosition(0 < bc && 0 < cc ? Gc ? bc : cc : 0 > bc && 0 > cc ? Gc ? cc : bc : Gc ? bc : 0) + (aa ? ga : 0), Ib = [], $b = h.anchorTrackingRadius, ob = /drag/ig.test(c.logic.rendererId), eb, pc, tb, zc, Cb, Vb, zb, Ta, Ac, Wb, Qa, Eb, ub = [], Xb = function (a) {
                    Ba.call(this, c, a)
                }, Aa = function (a) {
                    return function (b) {
                        c.hoverPlotAnchor(this, b, "DataPlotRollOver", a, c)
                    }
                }, Nc = function (a) {
                    return function (b) {
                        c.hoverPlotAnchor(this, b, "DataPlotRollOut", a, c)
                    }
                }, Ya = function (e, g, h, l, n, m, p, q) {
                    return function () {
                        var r =
                            h.imageUrl, s = h.imageScale, u = h.imageAlpha, w = p.imageHoverAlpha, v = p.imageHoverScale, B = this.height * s * .01, C = this.width * s * .01, F = this.width * v * .01;
                        nb = {
                            x: e - this.width * s * .005,
                            y: g - this.height * s * .005,
                            width: C,
                            height: B,
                            alpha: u
                        };
                        sb = {
                            x: e - this.width * v * .005,
                            y: g - this.height * v * .005,
                            width: F,
                            height: this.height * v * .01,
                            alpha: w
                        };
                        w = F > C ? sb : nb;
                        ob && (w = {cx: e, cy: g, r: .5 * Ra(B, C)});
                        (l.graphic = db = d.image(r, zb).attr(nb).css({opacity: .01 * u}).data("alwaysInvisible", !s).data("setRolloverProperties", p).data("setRolloverAttr", sb).data("setRolloutAttr",
                            nb).data("anchorRadius", s).data("anchorHoverRadius", v)) && t.push(db);
                        if (za || R || p)$a = l.tracker = (ob ? d.circle(vc) : d.rect(vc)).attr(w).attr({
                            cursor: za ? "pointer" : "",
                            stroke: z,
                            "stroke-width": h.lineWidth,
                            fill: z,
                            ishot: !0,
                            visibility: f
                        }).data("eventArgs", n).data("groupId", eb).click(Xb).hover(Aa(l), Nc(l)).tooltip(m);
                        c.drawTracker && c.drawTracker.call(c, a, b, q);
                        (Qa = l.dataLabel = c.drawPlotLineLabel(a, b, q, e, g)) && t.push(Qa)
                    }
                }, Hb = function (d, e, f, g, h, l, n, m) {
                    return function () {
                        (Qa = g.dataLabel = c.drawPlotLineLabel(a, b, m, d,
                            e)) && t.push(Qa)
                    }
                };
            c.addCSSDefinition(".fusioncharts-datalabels .fusioncharts-label", Y);
            Fc.attr("class", "fusioncharts-datalabels");
            p.connectorOpacity = K.color(Va).opacity;
            C.yBasePos = Mc;
            H && (J = (G = c.definition.chart) && G.plotspacepercent, M = p.groupPadding, L = p.maxColWidth, N = (1 - .01 * J) * fa || oa(fa * (1 - 2 * M), 1 * L), P = N / 2);
            Fc.attr({transform: "...t" + pa + "," + qa});
            V && c.animationCompleteQueue.push({fn: xa, scope: c});
            tb = Fb.line || (Fb.line = d.group("line-connector", Fb));
            zc = a.lineShadowLayer || (a.lineShadowLayer = d.group("connector-shadow",
                tb));
            Cb = a.anchorShadowLayer || (a.anchorShadowLayer = d.group("anchor-shadow", tb));
            Vb = a.lineLayer || (a.lineLayer = d.group("connector", tb));
            zb = a.anchorLayer || (a.anchorLayer = d.group("anchors", tb));
            zb.hide();
            zc.hide();
            Cb.hide();
            for (ea = 0; ea < O; ea += 1) {
                ka = F[ea];
                Ea = ka.y;
                Ca = ka.previousY || 0;
                U = ka.toolText;
                eb = a.index + "_" + ea;
                vb = Qa = db = $a = null;
                w = q[ea] = {
                    index: ea,
                    value: null,
                    graphic: null,
                    connector: null,
                    dataLabel: null,
                    shadowGroup: Cb,
                    tracker: null
                };
                if (null === Ea)ub.length = 0, 0 === va && (Pa = null); else {
                    Da = s(ka.x, ea);
                    za = ka.link;
                    "boxandwhisker" ===
                    b.relatedSeries && b.pointStart && (Da += b.pointStart);
                    Db = C.getAxisPosition(Ea + Ca) + (aa ? ga : 0);
                    Ka = v.getAxisPosition(Da) - ja;
                    Ka = I(Ka, bb, bb).position;
                    Db = I(Db, bb, bb).position;
                    if ((fb = ka.marker) && fb.enabled)if (ib = fb.symbol.split("_"), gb = "spoke" === ib[0] ? 1 : 0, ya = fb.radius, Ta = fb.shadow, pc = {
                            index: ea,
                            link: za,
                            value: ka.y,
                            displayValue: ka.displayValue,
                            categoryLabel: ka.categoryLabel,
                            toolText: ka.toolText,
                            id: a.userID,
                            datasetIndex: a.index,
                            datasetName: a.name,
                            visible: a.visible
                        }, nb = sb = {}, Sa = ka.rolloverProperties, fb.imageUrl)Eb =
                        new l, Eb.onload = Ya(Ka, Db, fb, w, pc, U, Sa, ea), Eb.onerror = Hb(Ka, Db, fb, w, pc, U, Sa, ea), Eb.src = fb.imageUrl; else {
                        Sa && (nb = {
                            polypath: [ib[1] || 2, Ka, Db, ya, fb.startAngle, gb],
                            fill: $(fb.fillColor),
                            "stroke-width": fb.lineWidth,
                            stroke: $(fb.lineColor)
                        }, sb = {
                            polypath: [Sa.sides || 2, Ka, Db, Sa.radius, Sa.startAngle, Sa.dip],
                            fill: $(Sa.fillColor),
                            "stroke-width": Sa.lineWidth,
                            stroke: $(Sa.lineColor)
                        });
                        db = w.graphic = d.polypath(ib[1] || 2, Ka, Db, ya, fb.startAngle, gb, zb).attr({
                            fill: $(fb.fillColor), "stroke-width": fb.lineWidth, stroke: $(fb.lineColor),
                            cursor: za ? "pointer" : "", visibility: ya ? f : "hidden"
                        }).data("alwaysInvisible", !ya).data("setRolloverProperties", Sa).data("setRolloverAttr", sb).data("setRolloutAttr", nb).data("anchorRadius", ya).data("anchorHoverRadius", Sa && Sa.radius).shadow(Ta || !1, Cb);
                        if (za || R || Sa)ya = Ra(ya, Sa && Sa.radius || 0, $b), $a = w.tracker = d.circle({
                            cx: Ka,
                            cy: Db,
                            r: ya,
                            cursor: za ? "pointer" : "",
                            stroke: z,
                            "stroke-width": fb.lineWidth,
                            fill: z,
                            ishot: !0,
                            visibility: f
                        }, vc);
                        ($a || db).data("eventArgs", pc).data("groupId", eb).click(Xb).hover(Aa(w), Nc(w)).tooltip(U);
                        c.drawTracker && c.drawTracker.call(c, a, b, ea)
                    }
                    Ac = Wb !== [$(ka.color || Va), ka.dashStyle || Za].join(":");
                    if (null !== Pa) {
                        if (ub.length && (Ib = Ib.concat(ub), ub.length = 0), (D || H || !Ib.join("")) && Ib.push("M", Ga, Pa), H && Ib.push("m", -P, 0), r ? B ? (Ib.push("H", Ka), H && Ib.push("h", P), u ? Ib.push("V", Db) : Ib.push("m", 0, Db - Pa)) : (u && Ib.push("V", Db), Ib.push("M", Ga, Db, "H", Ka)) : Ib.push("L", Ka, Db), D || Ac)vb = w.connector = d.path(Ib, Vb).attr({
                            "stroke-dasharray": Xa,
                            "stroke-width": bb,
                            stroke: La,
                            "stroke-linecap": "round",
                            "stroke-linejoin": 2 < bb ?
                                "round" : "miter",
                            visibility: f
                        }).shadow(p.shadow && ka.shadow, zc), Ib = []
                    } else!D && ub.push("M", Ka, Db);
                    fb && fb.imageUrl || (Qa = w.dataLabel = c.drawPlotLineLabel(a, b, ea, Ka, Db));
                    Ga = Ka;
                    Pa = Db;
                    La = $(ka.color || Va);
                    Xa = ka.dashStyle || Za;
                    Wb = [La, Xa].join(":")
                }
                Qa && t.push(Qa);
                db && t.push(db);
                vb && t.push(vb);
                $a && t.push($a)
            }
            !D && Ib.join("") && (vb = d.path(Ib, Vb).attr({
                "stroke-dasharray": Xa,
                "stroke-width": bb,
                stroke: La,
                "stroke-linecap": "round",
                "stroke-linejoin": 2 < bb ? "round" : "miter",
                visibility: f
            }).shadow(p.shadow && ka.shadow, zc)) && t.push(vb);
            ma && (ta = ua.startPercent, Dc[2] = la + $c[0], 1 === ta && ($c[0] = Dc[2], Dc[0] = 0));
            V ? (ba = K.animation({"clip-rect": Dc}, V, ma ? "easeIn" : "normal", c.getAnimationCompleteFn()), Vb.attr({"clip-rect": $c}).animate(H ? ba.delay(V) : ba)) : (xa && xa(), xa = void 0);
            a.visible = !1 !== b.visible;
            return a
        }, hoverPlotAnchor: function (a, b, c, d, e) {
            var g = d.graphic;
            d = d.dataLabel;
            var h = e.options.chart, l = 1 === h.rotateValues ? 270 : 0, n = g.data("setRolloverProperties"), m = g.data("isRealtime"), p = m && g.attr("polypath"), q = g.data("setRolloverAttr"), s = "image" ===
                g.type, t = g.data("setRolloutAttr"), z = d && (d.data("isBelow") ? 1 : -1) * (s ? .5 * (q.height - t.height) : g.data("anchorHoverRadius") - g.data("anchorRadius")), w = "DataPlotRollOver" == c ? q : t, v = {transform: "T0," + ("DataPlotRollOver" === c ? z : 0) + "R" + l}, C = {
                fill: w.fill,
                "stroke-width": w["stroke-width"],
                stroke: w.stroke
            }, w = s ? w : {polypath: w.polypath}, h = h.syncLabelWithAnchor, D = g.data("anchorRadius"), H = g.data("anchorHoverRadius"), q = !(/,0\)$/.test(q.fill) && /,0\)$/.test(t.fill)) && g.data("anchorHoverRadius") - g.data("anchorRadius") && n.animation &&
                50;
            d && d.data("isMiddle") && (v = {transform: "T," + ("DataPlotRollOver" === c ? z : 0) + ",0R" + l});
            n && (("DataPlotRollOver" == c && 0 !== H || "DataPlotRollOut" == c && 0 !== D) && g.attr({visibility: "visible"}), s ? g.css({opacity: .01 * w.alpha}) : g.attr(C), m && !s && (w.polypath[1] = p[1], w.polypath[2] = p[2]), g.stop(), g.animate(w, q, "easeOut", function () {
                ("DataPlotRollOver" == c && !H || "DataPlotRollOut" == c && !D) && g.attr({visibility: "hidden"})
            }), d && d.stop(), q && h && d && d.animate(v, q, "easeOut"));
            Ba.call(a, e, b, c)
        }, drawPlotArea: function (a, b) {
            var c = this,
                d = c.paper, e = c.options, g = e.chart, h = c.logic, n = e.plotOptions.series, m = c.elements, p = a.items, q = a.graphics = a.graphics || [], t, w = c.xAxis[b.xAxis || 0], v = c.yAxis[b.yAxis || 0], C = v.axisData.reversed, D = g.xDepth || 0, J = g.yDepth || 0, h = h.isStacked, G = !1 !== (e.tooltip || {}).enabled, I, K, e = n.dataLabels.style, M = {
                    fontFamily: e.fontFamily,
                    fontSize: e.fontSize,
                    lineHeight: e.lineHeight,
                    fontWeight: e.fontWeight,
                    fontStyle: e.fontStyle,
                    color: e.color
                }, e = isNaN(+n.animation) && n.animation.duration || 1E3 * n.animation, L = g.series2D3Dshift, N = "0" ===
                    c.definition.chart.drawfullareaborder, P = a.data, R = !1 === b.visible ? "hidden" : "visible", U = P.length, V = w.getAxisPosition(0), ba = (w.getAxisPosition(1) - V) * U, Z = w.axisData.scroll || {}, V = g.hasScroll || !1, Y = n.connectNullData, aa, r, u, B, F, f = v.max, ja = v.min, O = v.getAxisPosition(0 < f && 0 > ja ? 0 : !C && 0 < f && 0 <= ja ? ja : f) + (L ? J : 0), X = c.chartWidth, ea = c.chartHeight, C = function () {
                    db.attr({"clip-rect": null});
                    fb.show();
                    Xa.show();
                    Ka.attr({transform: "...t" + -X + "," + -ea})
                }, ga = null, ua, fa, f = b.lineWidth, ja = b.dashStyle, la = $(b.fillColor), va = $(b.lineColor),
                ma = 0, ta = /drag/ig.test(c.logic.rendererId), pa, ka, qa, oa, xa, za, ya = [], Da = [], Ea = null, Ga = [], Ca = c.layers;
            B = Ca.dataset = Ca.dataset || d.group("dataset-orphan");
            var Ka = Ca.datalabels = Ca.datalabels || d.group("datalabels").insertAfter(B), Pa = Ca.tracker, Ca = m["clip-canvas-init"].slice(0), m = m["clip-canvas"].slice(0), g = g.anchorTrackingRadius, La, Xa, Za, fb, db, gb, ib, nb, Sa, $a, sb = function (a) {
                Ba.call(this, c, a)
            }, vb = function (a) {
                return function (b) {
                    c.hoverPlotAnchor(this, b, "DataPlotRollOver", a, c)
                }
            }, yb = function (a) {
                return function (b) {
                    c.hoverPlotAnchor(this,
                        b, "DataPlotRollOut", a, c)
                }
            }, Ea = function (e, f, g, h, l, n, m, p) {
                return function () {
                    var s = g.imageUrl, t = g.imageScale, u = g.imageAlpha, w = m.imageHoverAlpha, v = m.imageHoverScale, B = this.width * t * .01, C = this.width * v * .01;
                    xa = {
                        x: e - this.width * t * .005,
                        y: f - this.height * t * .005,
                        width: B,
                        height: this.height * t * .01,
                        alpha: u
                    };
                    za = {
                        x: e - this.width * v * .005,
                        y: f - this.height * v * .005,
                        width: C,
                        height: this.height * v * .01,
                        alpha: w
                    };
                    w = C > B ? za : xa;
                    ta && (w = {cx: e, cy: f, r: .5 * Ra(C, B)});
                    (h.graphic = ka = d.image(s, fb).attr(xa).css({opacity: .01 * u}).data("alwaysInvisible",
                        !t).data("setRolloverProperties", m).data("setRolloverAttr", za).data("setRolloutAttr", xa).data("anchorRadius", t).data("anchorHoverRadius", v)) && q.push(ka);
                    if (r || G || m)La = H({
                        cursor: r ? "pointer" : "",
                        stroke: z,
                        "stroke-width": g.lineWidth,
                        fill: z,
                        ishot: !0,
                        visibility: R
                    }, w), qa = h.tracker = (ta ? d.circle(La, Pa) : d.rect(La, Pa)).data("eventArgs", l).click(sb).hover(vb(h), yb(h)).tooltip(n), c.drawTracker && c.drawTracker.call(c, a, b, p);
                    ($a = h.dataLabel = c.drawPlotLineLabel(a, b, p, e, f)) && q.push($a)
                }
            }, Fb = function (d, e, f, g, h, l, n, m) {
                return function () {
                    ($a =
                        g.dataLabel = c.drawPlotLineLabel(a, b, m, d, e)) && q.push($a)
                }
            };
            c.addCSSDefinition(".fusioncharts-datalabels .fusioncharts-label", M);
            Ka.attr("class", "fusioncharts-datalabels");
            v.yBasePos = O;
            Ka.attr({transform: "...t" + X + "," + ea});
            e && c.animationCompleteQueue.push({fn: C, scope: c});
            M = B;
            h && (gb = M.shadows || (M.shadows = d.group("shadows", M).toBack()));
            db = M.area = M.area || d.group("area", M);
            M = M.areaConnector || (M.areaConnector = d.group("area-connector", M));
            a.lineShadowLayer || (a.lineShadowLayer = d.group("connector-shadow", M));
            Xa = a.anchorShadowLayer || (a.anchorShadowLayer = d.group("anchor-shadow", M));
            Za = a.lineLayer || (a.lineLayer = d.group("connector", M));
            fb = a.anchorLayer || (a.anchorLayer = d.group("anchors", M));
            fb.hide();
            Xa.hide();
            M = B;
            for (M = 0; M < U; M += 1) {
                aa = P[M];
                B = aa.y;
                t = s(aa.x, M);
                ua = w.getAxisPosition(t) - D;
                ka = $a = qa = null;
                t = p[M] = {};
                if (null === B)0 === Y && (ga = null, 0 < ma && (1 === ma ? ya.splice(-8, 8) : (ya = ya.concat(Da), ya.push("Z")), Da = [])), t.chart = c, t.index = M, t.value = B; else {
                    r = aa.link;
                    I = aa.toolText;
                    K = aa.previousY;
                    F = (F = v.getAxisPosition(K) || null) ||
                    O;
                    fa = v.getAxisPosition(B + (K || 0)) + (L ? J : 0);
                    if ((Sa = aa.marker) && Sa.enabled)if (K = {
                            index: M,
                            link: r,
                            value: aa.y,
                            displayValue: aa.displayValue,
                            categoryLabel: aa.categoryLabel,
                            toolText: aa.toolText,
                            id: a.userID,
                            datasetIndex: a.index,
                            datasetName: a.name,
                            visible: a.visible
                        }, xa = za = {}, oa = aa.rolloverProperties, Sa.imageUrl)u = new l, u.onload = Ea(ua, fa, Sa, t, K, I, oa, M), u.onerror = Fb(ua, fa, Sa, t, K, I, oa, M), u.src = Sa.imageUrl; else {
                        pa = Sa.symbol.split("_");
                        u = Sa.radius;
                        nb = Sa.shadow;
                        oa && (xa = {
                            polypath: [pa[1] || 2, ua, fa, u, Sa.startAngle, 0],
                            fill: $(Sa.fillColor), "stroke-width": Sa.lineWidth, stroke: $(Sa.lineColor)
                        }, oa = aa.rolloverProperties, za = {
                            polypath: [oa.sides || 2, ua, fa, oa.radius, oa.startAngle, oa.dip],
                            fill: $(oa.fillColor),
                            "stroke-width": oa.lineWidth,
                            stroke: $(oa.lineColor)
                        });
                        ka = t.graphic = d.polypath(pa[1] || 2, ua, fa, u, Sa.startAngle, 0, fb).attr({
                            fill: $(Sa.fillColor),
                            "stroke-width": Sa.lineWidth,
                            stroke: $(Sa.lineColor),
                            cursor: r ? "pointer" : "",
                            visibility: u ? R : "hidden"
                        }).data("alwaysInvisible", !u).data("setRolloverProperties", oa).data("setRolloverAttr",
                            za).data("setRolloutAttr", xa).data("anchorRadius", u).data("anchorHoverRadius", oa && oa.radius).shadow(nb || !1, Xa);
                        if (r || G || oa)h || (u = Ra(u, oa && oa.radius || 0, g)), qa = t.tracker = d.circle({
                            cx: ua,
                            cy: fa,
                            r: u,
                            cursor: r ? "pointer" : "",
                            stroke: z,
                            "stroke-width": Sa.lineWidth,
                            fill: z,
                            ishot: !0,
                            visibility: R
                        }, Pa);
                        (qa || ka).data("eventArgs", K).click(sb).hover(vb(t), yb(t)).tooltip(I);
                        c.drawTracker && c.drawTracker.call(c, a, b, M)
                    }
                    null === ga ? (Ga.push("M", ua, ",", fa), ya.push("M", ua, ",", F), ma = 0) : Ga.push("L", ua, ",", fa);
                    ya.push("L", ua, ",",
                        fa);
                    Da.unshift("L", ua, ",", F);
                    ma++;
                    ga = fa;
                    Sa && Sa.imageUrl || ($a = t.dataLabel = c.drawPlotLineLabel(a, b, M, ua, fa));
                    t.chart = c;
                    t.index = M;
                    t.value = B;
                    t.dataLabel = $a
                }
                $a && q.push($a);
                ka && q.push(ka);
                qa && q.push(qa)
            }
            0 < ma && (1 === ma ? ya.splice(-8, 8) : (ya = ya.concat(Da), ya.push("Z")));
            (Ea = a.graphic = d.path(ya, db).attr({
                fill: la,
                "stroke-dasharray": ja,
                "stroke-width": N ? 0 : f,
                stroke: va,
                "stroke-linecap": "round",
                "stroke-linejoin": 2 < f ? "round" : "miter",
                visibility: R
            }).shadow(n.shadow && aa.shadow, gb)) && q.push(Ea);
            V && (n = Z.startPercent, m[2] =
                ba + Ca[0], 1 === n && (Ca[0] = m[2], m[0] = 0));
            e ? ib = db.attr({"clip-rect": Ca}).animate({"clip-rect": m}, e, V ? "easeIn" : "normal", c.getAnimationCompleteFn()) : (C && C(), C = void 0);
            gb && (e ? gb.attr({"clip-rect": Ca}).animateWith(db, ib, {"clip-rect": m}, e, V ? "easeIn" : "normal", function () {
                gb.attr({"clip-rect": null})
            }) : gb.attr({"clip-rect": null}));
            N && (n = a.connector = d.path(Ga, Za).attr({
                "stroke-dasharray": ja,
                "stroke-width": f,
                stroke: va,
                "stroke-linecap": "round",
                "stroke-linejoin": 2 < f ? "round" : "miter",
                visibility: R
            }), e ? Za.attr({"clip-rect": Ca}).animateWith(db,
                ib, {"clip-rect": m}, e, V ? "easeIn" : "normal", function () {
                    Za.attr({"clip-rect": null})
                }) : Za.attr({"clip-rect": null}), n && q.push(n));
            a.visible = !1 !== b.visible;
            return a
        }, drawPlotScatter: function (a, b) {
            var c = this, d = c.options, e = d.chart, g = d.plotOptions.series, h = c.paper, l = c.elements, n = a.items, m, p = a.graphics = a.graphics || [], q = c.xAxis[b.xAxis || 0], s = c.yAxis[b.yAxis || 0], t = a.data, w = !1 === b.visible ? "hidden" : "visible", d = !1 !== (d.tooltip || {}).enabled, v, C = g.dataLabels.style, D = {
                fontFamily: C.fontFamily, fontSize: C.fontSize, lineHeight: C.lineHeight,
                fontWeight: C.fontWeight, fontStyle: C.fontStyle, color: C.color
            }, C = isNaN(+g.animation) && g.animation.duration || 1E3 * g.animation, H = c.chartWidth, J = c.chartHeight, G, M, K, I, L, N, P, R, U, V = b.lineWidth, aa = 0 < V, r = b.color, u = b.dashStyle, B = g.connectNullData, F = [], f, ba, O, X, Z, ja, Y = c.layers, ga = Y.dataset || (Y.dataset = h.group("dataset-orphan")), ea = Y.datalabels || (Y.datalabels = h.group("datalabels").insertAfter(ga)), Y = Y.tracker, e = e.anchorTrackingRadius, fa, la, ma, oa = function (a) {
                Ba.call(this, c, a)
            }, ka = function (a) {
                return function (b) {
                    c.hoverPlotAnchor(this,
                        b, "DataPlotRollOver", a, c)
                }
            }, qa = function (a) {
                return function (b) {
                    c.hoverPlotAnchor(this, b, "DataPlotRollOut", a, c)
                }
            };
            c.addCSSDefinition(".fusioncharts-datalabels .fusioncharts-label", D);
            ea.attr("class", "fusioncharts-datalabels");
            C && (c.animationCompleteQueue.push({
                fn: function () {
                    ea.attr({transform: "...t" + -H + "," + -J})
                }, scope: c
            }), ea.attr({transform: "...t" + H + "," + J}));
            fa = ga.line || (ga.line = h.group("line-connector", ga));
            a.lineShadowLayer = h.group("connector-shadow", fa);
            ga = a.anchorShadowLayer = h.group("anchor-shadow",
                fa);
            D = a.lineLayer = h.group("connector", fa);
            fa = a.anchorLayer = h.group("anchors", fa);
            G = 0;
            for (M = t.length; G < M; G += 1) {
                K = t[G];
                f = K.marker;
                R = U = X = v = Z = null;
                ma = a.index + "_" + G;
                N = K.y;
                L = K.x;
                if (null !== N && null !== L) {
                    if (f && f.enabled) {
                        I = K.link;
                        v = K.toolText;
                        O = f.radius;
                        la = f.shadow;
                        U = s.getAxisPosition(N);
                        R = q.getAxisPosition(L);
                        ba = {
                            index: G,
                            link: I,
                            y: K.y,
                            x: K.x,
                            displayValue: K.displayValue,
                            categoryLabel: K.categoryLabel,
                            toolText: K.toolText,
                            id: a.userID,
                            datasetIndex: a.index,
                            datasetName: a.name,
                            visible: a.visible
                        };
                        X = f.symbol.split("_");
                        m = n[G] = {index: G, x: L, y: N, value: N};
                        L = N = {};
                        K.hoverEffects && (L = {
                            polypath: [X[1] || 2, R, U, O, f.startAngle, 0],
                            fill: $(f.fillColor),
                            "stroke-width": f.lineWidth,
                            stroke: $(f.lineColor)
                        }, ja = K.rolloverProperties, N = {
                            polypath: [ja.sides || 2, R, U, ja.radius, ja.startAngle, ja.dip],
                            fill: $(ja.fillColor),
                            "stroke-width": ja.lineWidth,
                            stroke: $(ja.lineColor)
                        });
                        X = m.graphic = h.polypath(X[1] || 2, R, U, O, f.startAngle, 0, fa).attr({
                            fill: $(f.fillColor),
                            "stroke-width": f.lineWidth,
                            stroke: $(f.lineColor),
                            cursor: I ? "pointer" : "",
                            visibility: O ? w : "hidden"
                        }).data("alwaysInvisible",
                            !O).data("setRolloverProperties", ja).data("setRolloverAttr", N).data("setRolloutAttr", L).data("anchorRadius", O).data("anchorHoverRadius", ja && ja.radius).shadow(la || !1, ga);
                        if (I || d || ja)O = Ra(O, ja && ja.radius || 0, e), Z = m.tracker = h.circle({
                            cx: R,
                            cy: U,
                            r: O,
                            cursor: I ? "pointer" : "",
                            stroke: z,
                            "stroke-width": f.lineWidth,
                            fill: z,
                            ishot: !0,
                            visibility: w
                        }, Y);
                        (Z || X).data("eventArgs", ba).data("groupId", ma).click(oa).hover(ka(m), qa(m)).tooltip(v)
                    }
                    aa && ((void 0 === P || null === P && 0 === B) && R && U && F.push("M", R, ",", U), R && U && F.push("L",
                        R, ",", U), P = U);
                    v = m.dataLabel = c.drawPlotLineLabel(a, b, G, R, U)
                } else aa && 0 === B && (P = null), n[G] = {chart: c, index: G, x: L, y: N};
                v && p.push(v);
                X && p.push(X);
                Z && p.push(Z);
                c.drawTracker && c.drawTracker.call(c, a, b, G)
            }
            F.length && (g = a.graphic = h.path(F, D).attr({
                "stroke-dasharray": u,
                "stroke-width": V,
                stroke: r,
                "stroke-linecap": "round",
                "stroke-linejoin": 2 < V ? "round" : "miter",
                visibility: w
            }).shadow(g.shadow && K.shadow), D.attr({"clip-rect": l[C ? "clip-canvas-init" : "clip-canvas"]}), C && D.animate({"clip-rect": l["clip-canvas"]}, C, "normal"),
                p.push(g));
            C && fa.attr({opacity: 0}).animate({opacity: 1}, C, "normal", c.getAnimationCompleteFn());
            a.visible = !1 !== b.visible;
            return a
        }, drawPlotLineLabel: function (a, b, c, d, e, g) {
            var h = this.options, l = h.chart, n = this.paper, m = this.layers, p = h.plotOptions.series.dataLabels.style, h = 1 === l.rotateValues ? 270 : 0, q = this.canvasHeight, s = this.canvasTop, t = a.data, w = t[c], v = a.items[c], z = fa(w.valuePosition, "auto").toLowerCase();
            a = this.logic.defaultSeriesType;
            var D = v.graphic, H = w.marker, D = H && H.enabled ? D && "image" == D.type && .5 * D.attr("height") ||
            H && H.radius - 3 : 0, l = l.valuePadding + 2 + D;
            b = !1 === b.visible ? "hidden" : "visible";
            D = v.dataLabel;
            g = g || m.datalabels;
            switch (z) {
                case "above":
                    c = 0;
                    break;
                case "below":
                    c = 1;
                    break;
                default:
                    m = t[c - 1] || {}, t = t[c + 1] || {}, c = c ? m.y > w.y ? 1 : (null == m.y && t.y) > w.y ? 1 : 0 : 0
            }
            m = w.displayValue;
            C(m) && m !== N ? (D ? h && D.attr("transform", ["r", 360 - h]) : D = v.dataLabel = n.text(g).attr({
                "class": "fusioncharts-label",
                text: m,
                fill: p.color,
                "text-bound": [p.backgroundColor, p.borderColor, p.borderThickness, p.borderPadding, p.borderRadius, p.borderDash],
                "font-weight": p.fontWeight,
                "font-style": p.fontStyle,
                "font-family": p.fontFamily,
                "font-size": p.fontSize,
                "line-height": p.lineHeight
            }), D.attr({
                title: w.originalText || "",
                fill: p.color
            }), v._state && v._state.labelWidth || (g = D.getBBox(), v._state = {
                labelWidth: g.width,
                labelHeight: g.height
            }), n = p = h ? v._state.labelWidth : v._state.labelHeight, g = e - s, q = s + q - e, n = n + l + 4, s = .5 * p + l, /bubble/i.test(a) || (c ? q > n ? (e += s, w._valueBelowPoint = 1) : g > n && (e -= s, w._valueBelowPoint = 0) : g > n ? (e -= s, w._valueBelowPoint = 0) : q > n && (e += s, w._valueBelowPoint = 1)), D.attr({
                x: d,
                y: e,
                visibility: b
            }).data("isBelow",
                w._valueBelowPoint), h && D.attr("transform", "T0,0,R" + h)) : D && D.attr({text: N});
            return D
        }, drawLabels: function () {
            for (var a = this.paper, b = this.options, c = (b = b.labels && b.labels.items && b.labels.items) && b.length, d = this.layers.layerAboveDataset, e = this.elements.quadran || (this.elements.quadran = []), g = this.canvasTop, h = this.canvasLeft, l = {
                right: "end",
                left: "start",
                undefined: "start"
            }, n, m, p; c--;)p = b[c], n = p.style, m = {
                fontFamily: n.fontFamily,
                fontSize: n.fontSize,
                lineHeight: n.lineHeight,
                fontWeight: n.fontWeight,
                fontStyle: n.fontStyle,
                fill: n.color
            }, C(p.html) && p.html !== N && (e[c] = a.text(d).attr({
                text: p.html,
                x: parseInt(n.left, 10) + h,
                y: parseInt(n.top, 10) + g,
                "text-anchor": l[p.textAlign],
                "vertical-align": p.vAlign
            }).css(m))
        }
    }, b["renderer.root"]);
    b("renderer.piebase", {
        isHovered: !1, getPlotData: function (a, b) {
            var c = this.datasets[0], d = c.data[a], c = c.userData || (c.userData = []), e, g;
            if (c[a])c = c[a]; else {
                c = c[a] = {};
                for (g in d)"object" !== typeof(e = d[g]) && "function" !== typeof e && 0 !== g.indexOf("_") && (c[g] = e);
                c.value = c.y;
                c.label = c.name;
                delete c.y;
                delete c.total;
                delete c.doNotSlice;
                delete c.name;
                delete c.centerAngle;
                delete c.showInLegend
            }
            c.sliced = b;
            return c
        }, redrawDataLabels: function (a) {
            var b = a.elements.plots[0];
            a.placeDataLabels(!0, b.items, b);
            return {}
        }, sliceInOtherPies: function (a) {
            var b = this.options.series[0], c = b.plot.items, d = c.length, e = 0, g;
            for (b.enableMultiSlicing = !0; d--;)d !== a && (g = c[d]).sliced && ++e && this.plotGraphicClick.call(g);
            b.enableMultiSlicing = !1;
            return !!e
        }, plotGraphicClick: function (a) {
            var b = this.graphic || this, c = b.plotItem || b.data("plotItem"), d =
                c.seriesData, e = c.chart, g = e.logic.chartInstance, h = c.index, l = b.data("eventArgs") || {}, n = e.options.series[0].enableMultiSlicing, m = d.data[c.index].doNotSlice, p = c.slicedTranslation, q, s;
            !d.isRotating && Ba.call(b, e, a);
            if (!(d.isRotating || d.singletonCase || m || (b = !n && e.sliceInOtherPies(h), (a = c.sliced) && b)))return b = c.graphic, d = c.connector, n = c.dataLabel, p = "object" === typeof p ? "t" + p : p, m = c.connectorPath, q = (a ? -1 : 1) * c.transX, s = (a ? -1 : 1) * c.transY, v.raiseEvent("slicingStart", {
                slicedState: a, dataIndex: "index"in l && l.index,
                data: e.getPlotData(h, a)
            }, g), b.animate({transform: a ? "t0,0" : p}, 200, "easeIn", function () {
                v.raiseEvent("slicingEnd", {
                    slicedState: c.sliced,
                    dataIndex: "index"in l && l.index,
                    data: e.getPlotData(h, c.sliced)
                }, g)
            }), n && n.x && n.animate({x: n.x + (a ? 0 : q)}, 200, "easeIn"), m && (m[1] += q, m[2] += s, m[4] += q, m[6] += q, d.animate({path: m}, 200, "easeIn")), a = c.sliced = !a, b = {hcJSON: {series: []}}, b.hcJSON.series[0] = {data: p = []}, p[h] = {sliced: a}, H(g.jsVars._reflowData, b, !0), a
        }, plotDragStart: function (a, b, c) {
            var d = this.data("plotItem"), e = d.chart,
                d = d.seriesData, g = -e.datasets[0].startAngle * Ea;
            e.options.series[0].enableRotation && (a = m.call(c, a, b, d.pieCenter, d.chartPosition), d.dragStartAngle = a, d.startingAngleOnDragStart = g)
        }, plotDragEnd: function () {
            var a = this.data("plotItem"), b = a.chart, c = a.seriesData, a = -b.datasets[0].startAngle * Ea, d = {hcJSON: {series: [{startAngle: a}]}};
            b.disposed || (H(b.logic.chartInstance.jsVars._reflowData, d, !0), b.rotate(c, b.options.series[0]));
            c.isRotating && (setTimeout(function () {
                c.isRotating = !1
            }, 0), v.raiseEvent("RotationEnd", {
                startingAngle: D(a,
                    !0), changeInAngle: a - c.startingAngleOnDragStart
            }, b.logic.chartInstance));
            !b.isHovered && b.onPlotHover(this, !1)
        }, plotDragMove: function (a, b, c, d, e) {
            a = this.data("plotItem");
            var g = a.chart, h = a.seriesData, l = g.options.series;
            l[0].enableRotation && !h.singletonCase && (h.isRotating || (h.isRotating = !0, v.raiseEvent("RotationStart", {startingAngle: D(h.startingAngleOnDragStart, !0)}, g.logic.chartInstance)), c = m.call(e, c, d, h.pieCenter, h.chartPosition), l[0].startAngle += c - h.dragStartAngle, h.dragStartAngle = c, h.moveDuration =
                0, c = (new Date).getTime(), !h._lastTime || h._lastTime + h.timerThreshold < c) && (setTimeout(function () {
                g.rotate(h, l[0])
            }, 0), h._lastTime = c)
        }, plotMouseDown: function () {
            (this.plotItem || this.data("plotItem")).seriesData.isRotating = !1
        }, plotMouseUp: function (a) {
            var b = this.plotItem || this.data("plotItem"), c = b.chart, d = b.seriesData;
            K.supportsTouch && !d.isRotating && c.plotGraphicClick.call(b, a)
        }, plotRollOver: function (a) {
            var b = this.plotItem || this.data("plotItem"), c = b.chart, d, e;
            b.seriesData.isRotating || (Ba.call(this, c, a,
                "DataPlotRollOver"), c.onPlotHover(this, !0));
            c.isHovered = !0;
            (a = b.innerDiameter) && (d = b.centerLabelConfig) && (e = d.label) && c.drawDoughnutCenterLabel(e, b.center[0], b.center[1], a, a, d, !1)
        }, plotRollOut: function (a) {
            var b = this.plotItem || this.data("plotItem"), c = b.chart, d = c.options.series[0], e, g;
            b.seriesData.isRotating || (Ba.call(this, c, a, "DataPlotRollOut"), c.onPlotHover(this, !1));
            c.isHovered = !1;
            (a = b.innerDiameter) && (e = d.centerLabelConfig) && ((g = e.label) || !g) && c.drawDoughnutCenterLabel(g, b.center[0], b.center[1],
                a, a, e, !1)
        }, onPlotHover: function (a, b) {
            var c = a.data("plotItem"), d = c.rolloverProperties, e = b ? d.color : c.color, g = b ? d.borderWidth : c.borderWidth, h = b ? d.borderColor : c.borderColor;
            d && c.graphic.attr({fill: $(e), "stroke-width": g, stroke: h})
        }, getEventArgs: function (a) {
            a = a || {};
            return {
                datasetName: a.label,
                datasetIndex: a.originalIndex,
                id: a.userID,
                visible: !0,
                label: a.label,
                value: a.value,
                percentValue: a.percentage,
                tooltext: a.toolText,
                link: a.link,
                sliced: a.sliced
            }
        }, legendClick: function (a) {
            var b = a.chart;
            b.elements.plots[0].isRotating = !1;
            b.plotGraphicClick.call(a)
        }, placeDataLabels: function () {
            var a = function (a, b) {
                return a.point.value - b.point.value
            }, b = function (a, b) {
                return a.angle - b.angle
            }, c = ["start", "start", "end", "end"], d = [-1, 1, 1, -1], e = [1, 1, -1, -1];
            return function (g, h, l, n) {
                var m = this.options.plotOptions, p = m.pie, q = this.canvasLeft + .5 * this.canvasWidth, w = this.canvasTop + .5 * this.canvasHeight, v = this.smartLabel, z = m.series.dataLabels, C = z.style, D = s(Da(parseFloat(C.lineHeight)), 12), D = t(z.placeLabelsInside, 1 === h.length ? !0 : !1), m = z.skipOverlapLabels,
                    H = z.manageLabelOverflow, J = z.connectorPadding, G = z.distance, M = n && n.metrics || [q, w, p.size, p.innerSize || 0], K = M[1], I = M[0];
                n = .5 * M[2];
                var L = [[], [], [], []], N = this.canvasLeft, P = this.canvasTop, p = this.canvasWidth, G = l.labelsRadius || (l.labelsRadius = n + G), w = q = parseInt(C.fontSize, 10), R = w / 2, J = [J, J, -J, -J];
                l = l.labelsMaxInQuadrant || (l.labelsMaxInQuadrant = Za(G / w));
                var z = z.isSmartLineSlanted, M = M[3] / 2, U, V, $, aa, r, u, B, F, f, ja, O, X, Z, ba, Y, fa, ea, la, ma, pa;
                g || v.setStyle(C);
                if (1 == h.length && !M && D)aa = h[0], (Y = aa.dataLabel) && Y.show(),
                    aa.slicedTranslation = [N, P], Y && (Y.attr({
                    visibility: Ga,
                    align: "middle",
                    transform: ["t", I, K]
                }), Y.x = I); else if (D)pa = M + (n - M) / 2, ga(h, function (a) {
                    (Y = a.dataLabel) && Y.show();
                    Y && (Z = a.angle, X = K + pa * za(Z), F = I + pa * ya(Z), Y.x = F, Y._x = F, Y.y = X, a.sliced && (ma = a.slicedTranslation, ea = ma[0] - N, la = ma[1] - P, F += ea, X += la), Y.attr({
                        visibility: Ga,
                        align: "middle",
                        transform: ["t", F, X]
                    }))
                }); else {
                    ga(h, function (a) {
                        (Y = a.dataLabel) && Y.show();
                        Y && (Z = a.angle % Ca, 0 > Z && (Z = Ca + Z), fa = 0 <= Z && Z < Xa ? 1 : Z < Ka ? 2 : Z < yb ? 3 : 0, L[fa].push({
                            point: a,
                            angle: Z
                        }))
                    });
                    for (h =
                             g = 4; h--;) {
                        if (m && (D = L[h].length - l, 0 < D))for (L[h].sort(a), C = L[h].splice(0, D), D = 0, $ = C.length; D < $; D += 1)aa = C[D].point, aa.dataLabel.attr({visibility: "hidden"}), aa.connector && aa.connector.attr({visibility: "hidden"});
                        L[h].sort(b)
                    }
                    D = Ra(L[0].length, L[1].length, L[2].length, L[3].length);
                    ba = Ra(oa(D, l) * w, G + w);
                    L[1].reverse();
                    for (L[3].reverse(); g--;) {
                        M = L[g];
                        $ = M.length;
                        m || (w = $ > l ? ba / $ : q, R = w / 2);
                        aa = $ * w;
                        C = ba;
                        for (h = 0; h < $; h += 1, aa -= w)D = ib(ba * za(M[h].angle)), C < D ? D = C : D < aa && (D = aa), C = (M[h].oriY = D) - w;
                        U = c[g];
                        $ = ba - ($ - 1) * w;
                        C = 0;
                        for (h =
                                 M.length - 1; 0 <= h; h -= 1, $ += w)if (aa = M[h].point, Z = M[h].angle, r = aa.sliced, Y = aa.dataLabel, D = ib(ba * za(Z)), D < C ? D = C : D > $ && (D = $), C = D + w, ja = (D + M[h].oriY) / 2, u = I + e[g] * G * ya(qa.asin(ja / ba)), ja *= d[g], ja += K, O = K + n * za(Z), B = I + n * ya(Z), (2 > g && u < B || 1 < g && u > B) && (u = B), F = u + J[g], X = ja - R - 2, f = F + J[g], Y.x = f, Y._x = f, H && (V = 1 < g ? f - this.canvasLeft : this.canvasLeft + p - f, v.setStyle(aa.style), D = s(Da(parseFloat(aa.style.lineHeight)), 12) + 2 * Da(parseFloat(aa.style.border), 12), D = v.getSmartText(aa.labelText, V, D), Y.attr({
                                text: D.text, title: D.tooltext ||
                                ""
                            })), Y.y = X, r && (ea = aa.transX, la = aa.transY, F += ea, u += ea, B += ea, O += la, f += ea), Y.attr({
                                visibility: Ga,
                                "text-anchor": U,
                                vAlign: "middle",
                                x: f,
                                y: ja
                            }), D = aa.connector)aa.connectorPath = aa = ["M", B, O, "L", z ? u : B, ja, F, ja], D.attr({
                            path: aa,
                            visibility: Ga
                        })
                    }
                }
            }
        }()
    }, b["renderer.root"])
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-interface", function () {
    var d = this, m = d.hcLib, D = d.renderer.getRenderer("javascript"), v = m.hasModule, p = m.loadModule, c = m.getMetaSentence, K = m.moduleCmdQueue, b = m.executeWaitingCommands, G = m.injectModuleDependency, a = m.moduleDependencies, l = m.getDependentModuleName, P, N;
    P = function (a) {
        var g, e, h, n = {}, p;
        a = c(a);
        for (g in d.core.items)g = d.core.items[g], e = g.chartType(), h = g.options.chartTypeSourcePath + e, (e = g.jsVars) && e.waitingModule && g.__state.rendering &&
        m.needsModule(a.predicate, h) && (e.waitingModuleError = !0, e = l(h).concat(e.userModules), e.length && (e = e[e.length - 1], n[e] = m.moduleCmdQueue[e]));
        for (p in n)b(n[p]);
        d.raiseError(d.core, "11171116151", "run", "HC-interface~renderer.load", "Unable to load required modules and resources: " + a.key)
    };
    N = function (a, b, c) {
        var h = a.args, l = a.options;
        a._chartMessageStyle = {
            color: h.typeNotSupportedMessageColor || l.baseChartMessageColor,
            fontFamily: h.typeNotSupportedMessageFont || l.baseChartMessageFont,
            fontSize: h.typeNotSupportedMessageFontSize ||
            l.baseChartMessageFontSize
        };
        d.hcLib.createChart(a, b, "stub", c, l.typeNotSupportedMessage)
    };
    m.eventList = d.extend(d.legacyEventList, {
        loaded: "FC_Loaded",
        dataloaded: "FC_DataLoaded",
        rendered: "FC_Rendered",
        drawcomplete: "FC_DrawComplete",
        dataxmlinvalid: "FC_DataXMLInvalid",
        nodatatodisplay: "FC_NoDataToDisplay",
        exported: "FC_Exported"
    });
    m.raiseEvent = d.raiseEventWithLegacy;
    a.charts = d.extend(a.charts || {}, {
        column2d: 0,
        column3d: 0,
        bar2d: 0,
        bar3d: 0,
        pie2d: 0,
        pie3d: 0,
        line: 0,
        area2d: 0,
        doughnut2d: 0,
        doughnut3d: 0,
        pareto2d: 0,
        pareto3d: 0,
        mscolumn2d: 0,
        mscolumn3d: 0,
        msline: 0,
        msarea: 0,
        msbar2d: 0,
        msbar3d: 0,
        stackedcolumn2d: 0,
        marimekko: 0,
        stackedcolumn3d: 0,
        stackedarea2d: 0,
        stackedcolumn2dline: 0,
        stackedcolumn3dline: 0,
        stackedbar2d: 0,
        stackedbar3d: 0,
        msstackedcolumn2d: 0,
        mscombi2d: 0,
        mscombi3d: 0,
        mscolumnline3d: 0,
        mscombidy2d: 0,
        mscolumn3dlinedy: 0,
        stackedcolumn3dlinedy: 0,
        msstackedcolumn2dlinedy: 0,
        scatter: 0,
        bubble: 0,
        ssgrid: 0,
        scrollcolumn2d: 0,
        scrollcolumn3d: 0,
        scrollline2d: 0,
        scrollarea2d: 0,
        scrollstackedcolumn2d: 0,
        scrollcombi2d: 0,
        scrollcombidy2d: 0,
        zoomline: 0
    });
    a.powercharts = d.extend(a.powercharts || {}, {
        spline: 0,
        splinearea: 0,
        msspline: 0,
        mssplinearea: 0,
        mssplinedy: 0,
        multiaxisline: 0,
        multilevelpie: 0,
        waterfall2d: 0,
        msstepline: 0,
        inversemsline: 0,
        inversemscolumn2d: 0,
        inversemsarea: 0,
        errorbar2d: 0,
        errorscatter: 0,
        errorline: 0,
        logmsline: 0,
        logmscolumn2d: 0,
        logstackedcolumn2d: 0,
        radar: 0,
        dragnode: 0,
        candlestick: 0,
        selectscatter: 0,
        dragcolumn2d: 0,
        dragline: 0,
        dragarea: 0,
        boxandwhisker2d: 0,
        kagi: 0,
        heatmap: 0
    });
    a.widgets = d.extend(a.widgets || {}, {
        angulargauge: 0,
        bulb: 0,
        cylinder: 0,
        drawingpad: 0,
        funnel: 0,
        hbullet: 0,
        hled: 0,
        hlineargauge: 0,
        vlineargauge: 0,
        pyramid: 0,
        realtimearea: 0,
        realtimecolumn: 0,
        realtimeline: 0,
        realtimelinedy: 0,
        realtimestackedarea: 0,
        realtimestackedcolumn: 0,
        sparkcolumn: 0,
        sparkline: 0,
        sparkwinloss: 0,
        thermometer: 0,
        vbullet: 0,
        gantt: 0,
        vled: 0
    });
    a.maps = d.extend(a.maps || {}, {});
    d.extend(D, {
        render: function (a, b) {
            var c = this.chartType(), h = this.options.chartTypeSourcePath + c, n = this.jsVars, p = this.__state, H = m.chartAPI, q = this.options, J = this.args, w = this.options.showChartLoadingMessage,
                P, s;
            P = l(h).concat(n.userModules);
            n.isResizing && (n.isResizing = clearTimeout(n.isResizing));
            n.hcObj && n.hcObj.destroy && n.hcObj.destroy();
            if (H[c]) {
                if (H[p.lastRenderedType] && p.lastRenderedType !== c)for (s in d.raiseEvent("chartTypeChanged", {
                    previousType: p.lastRenderedType,
                    newType: c
                }, this), H[p.lastRenderedType].eiMethods)delete this[s];
                p.lastRenderedType = c;
                p.lastRenderedSrc = this.src;
                !n.waitingModuleError && m.raiseEvent("internal.loaded", {
                    type: c,
                    triggeredModuleLoad: n.drLoadAttempted || n.waitingModule
                }, this, [this.id]);
                delete n.waitingModule;
                delete n.waitingModuleError;
                delete n.drLoadAttempted;
                d.hcLib.createChart(this, a, c, b)
            } else {
                if (c && v(P)) {
                    if (n.drLoadAttempted) {
                        d.raiseError(this, 11112822001, "run", "HC-interface~renderer.render", "Chart runtimes not loaded even when resource is present");
                        N(this, a, b);
                        return
                    }
                    G(h) && (P = l(h).concat(n.userModules));
                    n.drLoadAttempted = !0
                } else {
                    if (!P.length) {
                        N(this, a, b);
                        return
                    }
                    if (n.waitingModuleError) {
                        N(this, a, b);
                        delete n.waitingModule;
                        delete n.waitingModuleError;
                        return
                    }
                }
                (c = K[P[P.length - 1]]) ?
                    (c.push({
                        cmd: "render",
                        obj: this,
                        args: arguments
                    }), n.waitingModule || (n = w ? q.PBarLoadingText || q.loadMessage : "", this._chartMessageStyle = {
                        color: J.loadMessageColor || q.baseChartMessageColor,
                        fontFamily: J.loadMessageFont || q.baseChartMessageFont,
                        fontSize: J.loadMessageFontSize || q.baseChartMessageFontSize
                    }, d.hcLib.createChart(this, a, "stub", void 0, n), D.load.call(this, a, b))) : (d.raiseError(this, 12080515551, "run", "HC-interface~renderer.render", "Unregistered module in dependentModule definition."), this._chartMessageStyle =
                {
                    color: J.renderErrorMessageColor || q.baseChartMessageColor,
                    fontFamily: J.renderErrorMessageFont || q.baseChartMessageFont,
                    fontSize: J.renderErrorMessageFontSize || q.baseChartMessageFontSize
                }, d.hcLib.createChart(this, a, "stub", void 0, q.renderErrorMessage))
            }
        }, update: function (a) {
            var b = this.ref, c = this.jsVars;
            c.hcObj && c.hcObj.destroy && c.hcObj.destroy();
            c.isResizing && (c.isResizing = clearTimeout(c.isResizing));
            void 0 === a.error ? (delete c.stallLoad, delete c.loadError, this.isActive() ? this.src !== this.__state.lastRenderedSrc ?
                this.render() : d.hcLib.createChart(this, c.container) : this.__state.rendering && !c.waitingModule && d.hcLib.createChart(this, c.container)) : (this.isActive() && "function" === typeof b.showChartMessage && b.showChartMessage("InvalidXMLText"), delete c.loadError)
        }, resize: function (a) {
            var b = this.ref, c, h = this.jsVars;
            b && b.resize && (h.isResizing && (h.isResizing = clearTimeout(h.isResizing)), h.isResizing = setTimeout(function () {
                c = d.normalizeCSSDimension(a.width, a.height, b);
                void 0 !== a.width && (b.style.width = c.width);
                void 0 !==
                a.height && (b.style.height = c.height);
                b.resize();
                delete h.isResizing
            }, 0))
        }, dispose: function () {
            var a, b = this.jsVars;
            b.isResizing && (b.isResizing = clearTimeout(b.isResizing));
            b.instanceAPI && b.instanceAPI.dispose && (b.instanceAPI.dispose(), delete b.instanceAPI);
            if (a = this.ref)d.purgeDOM(a), a.parentNode && a.parentNode.removeChild(a);
            b.container = null;
            m.cleanupWaitingCommands(this)
        }, load: function (a, c) {
            var e = this.jsVars, h = this.chartType(), n = d.hcLib.chartAPI[h], h = l(h).concat(e.userModules), v = h[h.length - 1];
            n || !h ||
            h && 0 === h.length ? (delete e.waitingModule, a && N(this, a || this.ref, c)) : e.waitingModule || (e.waitingModule = !0, delete e.waitingModuleError, p(h, function () {
                delete e.waitingModule;
                b(m.moduleCmdQueue[v])
            }, P, this))
        }
    })
}]);
FusionCharts.register("module", ["private", "modules.api.dynamicchartattributes", function () {
    var d = this;
    d.extend(d.core, {
        setChartAttribute: function (m, D) {
            var v, p, c, K;
            if ("string" === typeof m)v = m, m = {}, m[v] = D; else if (null === m || "object" !== typeof m)return;
            K = 0;
            if (c = (v = this.getChartData(d.dataFormats.JSON)) && (v.chart || v.graph || v.map)) {
                for (p in m)K += 1, null === m[p] ? delete c[p.toLowerCase()] : c[p.toLowerCase()] = m[p];
                0 < K && ("undefined" === typeof c.animation && (c.animation = "0"), this.setChartData(v, d.dataFormats.JSON))
            } else d.raiseError(this,
                "2105141421", "run", "#setChartAttribute()", "Could not retrieve attribute list. Is data ready?")
        }, getChartAttribute: function (m) {
            var D = this.getChartData(d.dataFormats.JSON), D = D && (D.chart || D.graph || D.map), v, p;
            if (0 === arguments.length || void 0 === m || void 0 === D)return D;
            if ("string" === typeof m)v = D[m.toString().toLowerCase()]; else if (m instanceof Array)for (v = {}, p = 0; p < m.length; p += 1)v[m[p]] = D[m[p].toString().toLowerCase()]; else d.raiseError(this, "25081429", "param", "~getChartAttribute()", 'Unexpected value of "attribute"');
            return v
        }
    }, !0)
}]);
FusionCharts.register("module", ["private", "api.linkmanager", function () {
    var d = this, m = d.FusionChartsDOMInsertModes, D = {}, v = function (c, m) {
        this.items = {};
        this.root = c;
        this.parent = m;
        m instanceof d.core ? this.level = this.parent.link.level + 1 : (D[c.id] = [{}], this.level = 0)
    }, p = function (c, d) {
        return (c.options.containerElement === d.options.containerElement || c.options.containerElementId === d.options.containerElementId) && c.options.insertMode === m.REPLACE
    };
    d.policies.link = ["link", void 0];
    v.prototype.configuration = function () {
        return D[this.root.id][this.level] ||
        (D[this.root.id][this.level] = {})
    };
    d.extend(d.core, {
        configureLink: function (c, m) {
            var b;
            if (c instanceof Array) {
                for (b = 0; b < c.length; b += 1)"object" !== typeof D[this.link.root.id][b] && (D[this.link.root.id][b] = {}), d.extend(D[this.link.root.id][b], c[b]);
                D[this.link.root.id].splice(c.length)
            } else"object" === typeof c ? ("number" !== typeof m && (m = this.link.level), void 0 === D[this.link.root.id][m] && (D[this.link.root.id][m] = {}), d.extend(D[this.link.root.id][m], c)) : d.raiseError(this, "25081731", "param", "~configureLink()",
                "Unable to update link configuration from set parameters")
        }
    }, !0);
    d.addEventListener("beforeInitialize", function (c) {
        c.sender.link instanceof v ? c.sender.link.parent instanceof d.core && (c.sender.link.parent.link.items[c.sender.id] = c.sender) : c.sender.link = new v(c.sender)
    });
    d.addEventListener("linkedChartInvoked", function (c, m) {
        var b = c.sender, D = b.clone({
            dataSource: m.data,
            dataFormat: m.linkType,
            link: new v(b.link.root, b)
        }, !0), a = m.alias, l;
        a && (!D.typeSource && D.swfUrl && (D.typeSource = D.swfUrl.replace(/(.*?)?[^\/]*\.swf.*?/ig,
            "$1")), D.type = a);
        b.args && 0 !== parseInt(b.args.animate, 10) && delete D.animate;
        d.extend(D, b.link.configuration());
        d.raiseEvent("beforeLinkedItemOpen", {level: b.link.level}, b.link.root, void 0, function () {
            d.core.items[D.id]instanceof d.core && d.core.items[D.id].dispose();
            l = new d.core(D);
            p(l, b) || b.options.overlayButton && b.options.overlayButton.message || ("object" !== typeof b.options.overlayButton && (b.options.overlayButton = {}), b.options.overlayButton.message = "Close");
            l.render();
            d.raiseEvent("linkedItemOpened",
                {level: b.link.level, item: l}, b.link.root)
        })
    });
    d.addEventListener("overlayButtonClick", function (c, m) {
        if ("LinkManager" === m.id) {
            var b = c.sender, v = b.link.level - 1, a = b.link.parent, l = b.link.root;
            d.raiseEvent("beforeLinkedItemClose", {level: v, item: b}, l, b, function () {
                setTimeout(function () {
                    d.core.items[b.id] && b.dispose();
                    d.raiseEvent("linkedItemClosed", {level: v}, l)
                }, 0);
                a.disposed || a.isActive() || !p(b, a) || a.render()
            })
        }
    });
    d.addEventListener("Loaded", function (c) {
        c = c.sender;
        var m;
        c && void 0 !== c.link && c.link.root !== c &&
        c.link.parent instanceof d.core && (c.ref && "function" === typeof c.ref.drawOverlayButton ? (m = d.extend({
            show: !0,
            id: "LinkManager"
        }, c.link.parent.options.overlayButton), d.extend(m, c.link.parent.link.configuration().overlayButton || {}), c.ref.drawOverlayButton(m)) : d.raiseWarning(c, "04091602", "run", "::LinkManager^Loaded", "Unable to draw overlay button on object. -" + c.id))
    });
    d.addEventListener("beforeDispose", function (c) {
        var m = c.sender;
        m && m.link instanceof v && (m && m.link && m.link.parent instanceof d.core && m.link.parent.link &&
        m.link.parent.link.items && delete m.link.parent.link.items[c.sender.id], delete D[m.id])
    })
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-thememanager", function () {
    var d = this, m, D, v, p = /\s+!important$/, c = /\\!important$/, K = function (a, b) {
        for (var c = b.length, d = -1; c--;)if (a === b[c]) {
            d = c;
            break
        }
        return d
    }, b = function (a, c, d, l, m) {
        var p, q, v, w;
        m ? (l.push(a), m.push(c)) : (l = [a], m = [c]);
        if (c instanceof Array)for (p = 0; p < c.length; p += 1) {
            try {
                q = a[p], v = c[p]
            } catch (z) {
                continue
            }
            if ("object" !== typeof v)d && void 0 === v || (a[p] = v); else {
                if (null === q || "object" !== typeof q)q = a[p] = v instanceof Array ? [] : {};
                w = K(v, m);
                -1 !== w ? q = a[p] = l[w] : b(q, v, d, l, m)
            }
        } else for (p in c) {
            try {
                q = a[p], v = c[p]
            } catch (s) {
                continue
            }
            if (null !== v && "object" === typeof v)if (w = Object.prototype.toString.call(v), "[object Object]" === w) {
                if (null === q || "object" !== typeof q)q = a[p] = {};
                w = K(v, m);
                -1 !== w ? q = a[p] = l[w] : b(q, v, d, l, m)
            } else"[object Array]" === w ? (null !== q && q instanceof Array || (q = a[p] = []), w = K(v, m), -1 !== w ? q = a[p] = l[w] : b(q, v, d, l, m)) : a[p] = v; else a[p] = v
        }
        return a
    }, G = function (a, c, d) {
        if ("object" !== typeof a && "object" !== typeof c)return null;
        if ("object" !== typeof c ||
            null === c)return a;
        "object" !== typeof a && (a = c instanceof Array ? [] : {});
        b(a, c, d);
        return a
    }, a = function (a) {
        var b = {important: !1, str: ""};
        if (!a)return b;
        a = a.toString();
        p.test(a) ? (a = a.replace(p, ""), b.important = !0) : (a = a.replace(c, "!imporant"), b.important = !1);
        b.str = a;
        return b
    }, l = function (a, b) {
        var c, d, m, p, q, v, w = 0, z = 0;
        for (c in a)if (d = a[c], d instanceof Array)for (v = d.length, q = 0; q < v; q += 1) {
            if (p = d[q], "object" === typeof p)if ("category" === c)if ("true" === p.vline) {
                if (m = b.component("vline", w, p))P(p, m), w += 1
            } else {
                if (m = b.component("category",
                        z, p, v))P(p, m), z += 1
            } else if (m = b.component(c, q, p, v))P(p, m), l(p, m)
        } else"object" === typeof d && (m = b.component(c, null, d)) && (P(d, m), l(d, m))
    }, P = function (b, c) {
        var d = c.getAll(), l, m;
        for (l in d)m = d[l].toString(), m = a(m), m.important ? b[l.toLowerCase()] = m.str : void 0 === b[l.toLowerCase()] && (b[l.toLowerCase()] = m.str)
    }, N = function (a, b) {
        "geo" === b.defaultSeriesType && z.call(this, a, b)
    }, z = function (a, b) {
        var c = a.sender, l = c.getChartData(d.dataFormats.JSON, !0), m;
        l.error || ((m = l.data.chart.theme) ? v.themify(m, c, c.chartType(), l.data,
            "geo" === b.defaultSeriesType && "geo") : c.jsVars.themeObject && c.jsVars.themeObject.dispose())
    };
    m = function () {
        this.themeStore = {}
    };
    m.prototype = {
        constructor: m, add: function (a) {
            for (var b = 0, c = a.length, d; b < c; b += 1)(d = a[b].name) && (this.themeStore[d] = a[b])
        }, themify: function (a, b, c, l, m) {
            var p = b.jsVars, q = a.split(","), v = [], w = q.length, G, s;
            if (w) {
                for (s = 0; s < w; s += 1) {
                    G = this.themeStore;
                    var K;
                    K = q[s];
                    K = K.replace(/^\s\s*/, "");
                    for (var P = /\s/, ba = K.length; P.test(K.charAt(ba -= 1)););
                    K = K.slice(0, ba + 1);
                    (G = G[K]) && v.push(this.evaluateThemeJSON(G.theme,
                        b, c, m))
                }
                v.length ? (p.themeObject = new D(v, b, !1, l), this.applyTheme(b), b.addEventListener("chartTypeChanged", z), b.addEventListener("internal.drawstart", N)) : d.raiseWarning(b, "14051100501", "run", "api.themes~themify()", 'The theme "' + a + '" requested has not been registered.')
            }
        }, evaluateThemeJSON: function (a, b, c, d) {
            var l = {}, m = b.jsVars, p = function (a) {
                var b, c;
                for (b in a)c = a[b], l[b] = c instanceof Array ? G(l[b] || [], c) : "object" === typeof c ? G(l[b] || {}, c) : c
            };
            c = c || b.chartType();
            m.themeObject && a !== m.themeObject && (m.themeObject.dispose(),
                delete m.themeObject);
            p(a.base);
            d && a[d] && p(a[d]);
            c && a[c] && p(a[c]);
            return l
        }, applyTheme: function (a) {
            a = a.jsVars.themeObject;
            var b = a.getThemedJSONData().data;
            b && l(b, a)
        }
    };
    D = function (a, b, c, d) {
        this.themeArray = a;
        this.themeComponents = {};
        this.base = {};
        this.chartInstance = b;
        this.isChildInstance = Boolean(c);
        this.themedData = c ? null : G({}, d);
        this.length = a.length;
        b = 0;
        for (c = a.length; b < c; b += 1)this.parse(a[b])
    };
    D.prototype = {
        constructor: D, pushTheme: function (a) {
            a && (this.themeArray.push(a), this.parse(a), this.length += 1)
        },
        popTheme: function () {
        }, parse: function (b) {
            var c = this.themeComponents, d = this.chartInstance, l = this.base, m, p, q;
            for (p in b)if ("string" === typeof b[p] || "number" === typeof b[p])if (l[p]) {
                if (m = a(b[p]), q = a(l[p]), m.important || !q.important)l[p] = b[p]
            } else l[p] = b[p]; else c[p] || (c[p] = []), m = c[p], b[p]instanceof Array ? m.push(G([], b[p])) : "object" === typeof b[p] ? m.push(new D([b[p]], d, !0)) : "function" === typeof b[p] && m.push(b[p])
        }, merge: function (b) {
            var c = this.base, d = b.base, l = this.themeComponents, m = b.themeComponents, p, q, v;
            for (v in d)if (p =
                    a(c[v]), q = a(d[v]), !p.important || q.important)c[v] = d[v];
            for (v in m)l[v] = l[v] ? l[v].concat(m[v]) : [].concat(m[v]);
            this.length += b.length
        }, get: function (a) {
            return this.base[a]
        }, getAll: function () {
            return G({}, this.base)
        }, component: function (a, b, c, d) {
            var l = this.themeComponents, m = this.chartInstance, p = new D([], m, !0), v, w, z;
            w = l[a];
            if (!w)return null;
            a = 0;
            for (l = w.length; a < l; a += 1)z = w[a], "function" === typeof z ? (b = b || 0, p.pushTheme(z.call(m, b, c, d))) : z instanceof Array ? (b = b || 0, v = z.length, b %= v, v = z[b], v instanceof D ? p.merge(v) :
                "function" === typeof v ? p.pushTheme(v.call(m, b, c, d)) : p.pushTheme(v)) : z instanceof D ? p.merge(z) : p.pushTheme(z);
            return p
        }, getThemedJSONData: function () {
            return {data: this.themedData}
        }, dispose: function () {
            var a = this.themeComponents, b = this.chartInstance, c, d;
            for (c in a)if (d = a[c].length) {
                for (; d--;)a[c][d].dispose && a[c][d].dispose();
                delete a[c]
            }
            this.isChildInstance || (b.removeEventListener("chartTypeChanged", z), b.removeEventListener("internal.drawstart", N));
            this.dataWithoutTheme = this.isChildInstance = this.themeArray =
                this.base = this.chartInstance = this.themeComponents = null
        }
    };
    v = new m;
    d.registrars.theme = d.registerTheme = function (a) {
        a && ("[object Array]" !== Object.prototype.toString.call(a) && (a = [a]), v.add(a))
    };
    d.addEventListener("beforeDataUpdate", function (a, b) {
        var c = a.sender, l = d.core.transcodeData(b.data, b.format, d.dataFormats.JSON), m = l.chart && l.chart.theme;
        m ? v.themify(m, c, c.args.type, l) : c.jsVars.themeObject && (c.jsVars.themeObject.dispose(), delete c.jsVars.themeObject)
    })
}]);
FusionCharts.register("theme", {
    name: "default", theme: {
        base: {
            chart: {
                labelDisplay: "stagger !important",
                caption: "Theme Caption \\!important",
                canvasBgColor: "#56EF22",
                borderThickness: "5 !important",
                borderColor: "#E60539",
                baseFontColor: "#781129"
            }, categories: [{
                fontColor: "#0F4F40", fontSize: 15, category: function (d) {
                    return {showLabel: d % 2 ? 0 : 1}
                }, vline: {color: "#000000", thickness: 2}
            }], dataset: [{
                color: "#8C3146", data: function (d, m) {
                    8 == d && (m.value = "");
                    return {color: 32E3 > Number(m.value) ? "#8C3146" : "#FF0000", alpha: "100"}
                }
            }],
            trendlines: [{
                line: function (d) {
                    return d ? {color: "#ff0000", thickness: 3} : {color: "#ffff00", thickness: 3}
                }
            }]
        },
        pie2d: {chart: {bgColor: "#FF0000"}},
        msline: {chart: {canvasBgColor: "#ff0000"}},
        geo: {chart: {canvasBgColor: "#0000ff"}},
        world: {chart: {canvasBgColor: "#00ff00"}}
    }
});
