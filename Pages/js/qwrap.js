(function() {
    var e = {
        VERSION: "1.1.6",
        RELEASE: "2014-01-06",
        PATH: function() {
            var e = document.getElementsByTagName("script");
            return e[e.length - 1].src.replace(/(^|\/)[^\/]+\/[^\/]+$/, "$1")
        } (),
        namespace: function(t, n) {
            var r = t.split("."),
                i = 0,
                s;
            t.indexOf(".") == 0 && (i = 1, n = n || e),
                n = n || window;
            for (; s = r[i++];) n[s] || (n[s] = {}),
                n = n[s];
            return n
        },
        loadJs: function(e, t, n) {
            n = n || {};
            var r = document.getElementsByTagName("head")[0] || document.documentElement,
                i = document.createElement("script"),
                s = !1;
            i.src = e,
            n.charset && (i.charset = n.charset),
            "async" in n && (i.async = n.async || ""),
                i.onerror = i.onload = i.onreadystatechange = function() { ! s && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") && (s = !0, t && t(), i.onerror = i.onload = i.onreadystatechange = null, r.removeChild(i))
                },
                r.insertBefore(i, r.firstChild)
        },
        loadJsonp: function() {
            var t = new Date * 1;
            return function(n, r, i) {
                i = i || {};
                var s = "QWJsonp" + t++,
                    o = i.callbackReplacer || /%callbackfun%/ig;
                window[s] = function(e) {
                    r && r(e),
                        window[s] = null
                },
                    o.test(n) ? n = n.replace(o, s) : n += (/\?/.test(n) ? "&": "?") + "callback=" + s,
                    e.loadJs(n, i.oncomplete, i)
            }
        } (),
        loadCss: function(e) {
            var t = document.getElementsByTagName("head")[0] || document.documentElement,
                n = document.createElement("link");
            n.rel = "stylesheet",
                n.type = "text/css",
                n.href = e,
                t.insertBefore(n, t.firstChild)
        }
    };
    window.QW = e
})(),
    function() {
        function e(e) {
            return !! e && e.constructor == Object
        }
        var t = {
            provideDomains: [QW],
            provide: function(n, r) {
                if (typeof n == "string") {
                    var i = t.provideDomains;
                    for (var s = 0; s < i.length; s++) i[s][n] || (i[s][n] = r)
                } else if (e(n)) for (s in n) t.provide(s, n[s])
            }
        };
        QW.ModuleH = t,
            QW.provide = t.provide
    } (),
    QW.Browser = function() {
        var e = window.navigator,
            t = e.userAgent.toLowerCase(),
            n = /(msie|webkit|gecko|presto|opera|safari|firefox|chrome|maxthon|android|ipad|iphone|webos|hpwos|trident)[ \/os]*([\d_.]+)/ig,
            r = {
                platform: e.platform
            };
        t.replace(n,
            function(e, t, n) {
                r[t] || (r[t] = n)
            }),
        r.opera && t.replace(/opera.*version\/([\d.]+)/,
            function(e, t) {
                r.opera = t
            }),
        !r.msie && r.trident && t.replace(/trident\/[0-9].*rv[ :]([0-9.]+)/ig,
            function(e, t) {
                r.msie = t
            });
        if (r.msie) {
            r.ie = r.msie;
            var i = parseInt(r.msie, 10);
            r["ie" + i] = !0
        }
        return r
    } ();
if (QW.Browser.ie) try {
    document.execCommand("BackgroundImageCache", !1, !0)
} catch(e) {} (function() {
    var e = {
        trim: function(e) {
            return e.replace(/^[\s\uFEFF\xa0\u3000]+|[\uFEFF\xa0\u3000\s]+$/g, "")
        },
        mulReplace: function(e, t) {
            for (var n = 0; n < t.length; n++) e = e.replace(t[n][0], t[n][1]);
            return e
        },
        format: function(e, t) {
            var n = arguments;
            return e.replace(/\{(\d+)\}/ig,
                function(e, t) {
                    var r = n[(t | 0) + 1];
                    return r == null ? "": r
                })
        },
        tmpl: function(e, t) {
            return e.replace(/\{\$(\w+)\}/g,
                function(e, n) {
                    return t[n]
                })
        },
        dbc2sbc: function(t) {
            return e.mulReplace(t, [[/[\uff01-\uff5e]/g,
                function(e) {
                    return String.fromCharCode(e.charCodeAt(0) - 65248)
                }], [/\u3000/g, " "], [/\u3002/g, "."]])
        },
        byteLen: function(e) {
            return e.replace(/[^\x00-\xff]/g, "--").length
        },
        subByte: function(t, n, r) {
            return e.byteLen(t) <= n ? t: (r = r || "", n -= e.byteLen(r), t.substr(0, n).replace(/([^\x00-\xff])/g, "$1 ").substr(0, n).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "$1") + r)
        },
        camelize: function(e) {
            return e.replace(/\-(\w)/ig,
                function(e, t) {
                    return t.toUpperCase()
                })
        },
        decamelize: function(e) {
            return e.replace(/[A-Z]/g,
                function(e) {
                    return "-" + e.toLowerCase()
                })
        },
        encode4Js: function(t) {
            return e.mulReplace(t, [[/\\/g, "\\u005C"], [/"/g, "\\u0022"], [/'/g, "\\u0027"], [/\//g, "\\u002F"], [/\r/g, "\\u000A"], [/\n/g, "\\u000D"], [/\t/g, "\\u0009"]])
        },
        escapeChars: function(t) {
            return e.mulReplace(t, [[/\\/g, "\\\\"], [/"/g, '\\"'], [/\r/g, "\\r"], [/\n/g, "\\n"], [/\t/g, "\\t"]])
        },
        encode4Html: function(e) {
            var t = document.createElement("pre"),
                n = document.createTextNode(e);
            return t.appendChild(n),
                t.innerHTML
        },
        encode4HtmlValue: function(t) {
            return e.encode4Html(t).replace(/"/g, "&quot;").replace(/'/g, "&#039;")
        },
        decode4Html: function(t) {
            var n = document.createElement("div");
            return n.innerHTML = e.stripTags(t),
                n.childNodes[0] ? n.childNodes[0].nodeValue || "": ""
        },
        stripTags: function(e) {
            return e.replace(/<[^>]*>/gi, "")
        },
        evalJs: function(e, t) {
            return (new Function("opts", e))(t)
        },
        evalExp: function(e, t) {
            return (new Function("opts", "return (" + e + ");"))(t)
        },
        queryUrl: function(e, t) {
            e = e.replace(/^[^?=]*\?/ig, "").split("#")[0];
            var n = {};
            return e.replace(/(^|&)([^&=]+)=([^&]*)/g,
                function(e, t, r, i) {
                    try {
                        r = decodeURIComponent(r)
                    } catch(s) {}
                    try {
                        i = decodeURIComponent(i)
                    } catch(s) {}
                    r in n ? n[r] instanceof Array ? n[r].push(i) : n[r] = [n[r], i] : n[r] = /\[\]$/.test(r) ? [i] : i
                }),
                t ? n[t] : n
        }
    };
    QW.StringH = e
})(),
    function() {
        function t(e) {
            return e != null && e.constructor != null ? Object.prototype.toString.call(e).slice(8, -1) : ""
        }
        var e = QW.StringH.escapeChars,
            n = {
                isString: function(e) {
                    return t(e) == "String"
                },
                isFunction: function(e) {
                    return t(e) == "Function"
                },
                isArray: function(e) {
                    return t(e) == "Array"
                },
                isObject: function(e) {
                    return e !== null && typeof e == "object"
                },
                isPlainObject: function(e) {
                    return t(e) == "Object"
                },
                isWrap: function(e, t) {
                    return !! e && !!e[t || "core"]
                },
                isElement: function(e) {
                    return !! e && e.nodeType == 1
                },
                set: function(e, t, r) {
                    if (n.isArray(t)) for (var i = 0; i < t.length; i++) n.set(e, t[i], r[i]);
                    else if (n.isPlainObject(t)) for (i in t) n.set(e, i, t[i]);
                    else if (n.isFunction(t)) {
                        var s = [].slice.call(arguments, 1);
                        s[0] = e,
                            t.apply(null, s)
                    } else {
                        var o = t.split(".");
                        i = 0;
                        for (var u = e,
                                 a = o.length - 1; i < a; i++) u = u[o[i]];
                        u[o[i]] = r
                    }
                    return e
                },
                get: function(e, t, r) {
                    if (n.isArray(t)) {
                        var i = [],
                            s;
                        for (s = 0; s < t.length; s++) i[s] = n.get(e, t[s], r)
                    } else {
                        if (n.isFunction(t)) {
                            var o = [].slice.call(arguments, 1);
                            return o[0] = e,
                                t.apply(null, o)
                        }
                        var u = t.split(".");
                        i = e;
                        for (s = 0; s < u.length; s++) {
                            if (!r && i == null) return;
                            i = i[u[s]]
                        }
                    }
                    return i
                },
                mix: function(e, t, r) {
                    if (n.isArray(t)) {
                        for (var i = 0,
                                 s = t.length; i < s; i++) n.mix(e, t[i], r);
                        return e
                    }
                    if (typeof r == "function") for (i in t) e[i] = r(e[i], t[i], i);
                    else for (i in t) if (r || !(e[i] || i in e)) e[i] = t[i];
                    return e
                },
                dump: function(e, t) {
                    var n = {};
                    for (var r = 0,
                             i = t.length; r < i; r++) if (r in t) {
                        var s = t[r];
                        s in e && (n[s] = e[s])
                    }
                    return n
                },
                map: function(e, t, n) {
                    var r = {};
                    for (var i in e) r[i] = t.call(n, e[i], i, e);
                    return r
                },
                keys: function(e) {
                    var t = [];
                    for (var n in e) e.hasOwnProperty(n) && t.push(n);
                    return t
                },
                values: function(e) {
                    var t = [];
                    for (var n in e) e.hasOwnProperty(n) && t.push(e[n]);
                    return t
                },
                create: function(e, t) {
                    var r = function(e) {
                        e && n.mix(this, e, !0)
                    };
                    return r.prototype = e,
                        new r(t)
                },
                stringify: function(r) {
                    if (r == null) return "null";
                    if (typeof r != "string" && r.toJSON) return r.toJSON();
                    var i = t(r).toLowerCase();
                    switch (i) {
                        case "string":
                            return '"' + e(r) + '"';
                        case "number":
                            var s = r.toString();
                            return /N/.test(s) ? "null": s;
                        case "boolean":
                            return r.toString();
                        case "date":
                            return "new Date(" + r.getTime() + ")";
                        case "array":
                            var o = [];
                            for (var u = 0; u < r.length; u++) o[u] = n.stringify(r[u]);
                            return "[" + o.join(",") + "]";
                        case "object":
                            if (n.isPlainObject(r)) {
                                o = [];
                                for (u in r) o.push('"' + e(u) + '":' + n.stringify(r[u]));
                                return "{" + o.join(",") + "}"
                            }
                    }
                    return "null"
                },
                encodeURIJson: function(e) {
                    var t = [];
                    for (var n in e) {
                        if (e[n] == null) continue;
                        if (e[n] instanceof Array) for (var r = 0; r < e[n].length; r++) t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n][r]));
                        else t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]))
                    }
                    return t.join("&")
                }
            };
        QW.ObjectH = n
    } (),
    function() {
        var e = {
            map: function(e, t, n) {
                var r = e.length,
                    i = new Array(r);
                for (var s = 0; s < r; s++) s in e && (i[s] = t.call(n, e[s], s, e));
                return i
            },
            forEach: function(e, t, n) {
                for (var r = 0,
                         i = e.length; r < i; r++) r in e && t.call(n, e[r], r, e)
            },
            filter: function(e, t, n) {
                var r = [];
                for (var i = 0,
                         s = e.length; i < s; i++) i in e && t.call(n, e[i], i, e) && r.push(e[i]);
                return r
            },
            some: function(e, t, n) {
                for (var r = 0,
                         i = e.length; r < i; r++) if (r in e && t.call(n, e[r], r, e)) return ! 0;
                return ! 1
            },
            every: function(e, t, n) {
                for (var r = 0,
                         i = e.length; r < i; r++) if (r in e && !t.call(n, e[r], r, e)) return ! 1;
                return ! 0
            },
            indexOf: function(e, t, n) {
                var r = e.length;
                n |= 0,
                n < 0 && (n += r),
                n < 0 && (n = 0);
                for (; n < r; n++) if (n in e && e[n] === t) return n;
                return - 1
            },
            lastIndexOf: function(e, t, n) {
                var r = e.length;
                n |= 0;
                if (!n || n >= r) n = r - 1;
                n < 0 && (n += r);
                for (; n > -1; n--) if (n in e && e[n] === t) return n;
                return - 1
            },
            contains: function(t, n) {
                return e.indexOf(t, n) >= 0
            },
            clear: function(e) {
                e.length = 0
            },
            remove: function(e, t) {
                var n = -1;
                for (var r = 1; r < arguments.length; r++) {
                    var i = arguments[r];
                    for (var s = 0; s < e.length; s++) i === e[s] && (n < 0 && (n = s), e.splice(s--, 1))
                }
                return n
            },
            unique: function(t) {
                var n = [],
                    r = null,
                    i = Array.indexOf || e.indexOf;
                for (var s = 0,
                         o = t.length; s < o; s++) i(n, r = t[s]) < 0 && n.push(r);
                return n
            },
            reduce: function(e, t, n) {
                var r = e.length,
                    i = 0;
                if (arguments.length < 3) {
                    var s = 0;
                    for (; i < r; i++) if (i in e) {
                        n = e[i++],
                            s = 1;
                        break
                    }
                    if (!s) throw new Error("No component to reduce")
                }
                for (; i < r; i++) i in e && (n = t(n, e[i], i, e));
                return n
            },
            toArray: function(e) {
                var t = [];
                for (var n = 0; n < e.length; n++) t[n] = e[n];
                return t
            }
        };
        QW.ArrayH = e
    } (),
    function() {
        var e = {
            format: function(e, t) {
                t = t || "yyyy-MM-dd";
                var n = e.getFullYear().toString(),
                    r = {
                        M: e.getMonth() + 1,
                        d: e.getDate(),
                        h: e.getHours(),
                        m: e.getMinutes(),
                        s: e.getSeconds()
                    };
                t = t.replace(/(y+)/ig,
                    function(e, t) {
                        return n.substr(4 - Math.min(4, t.length))
                    });
                for (var i in r) t = t.replace(new RegExp("(" + i + "+)", "g"),
                    function(e, t) {
                        return r[i] < 10 && t.length > 1 ? "0" + r[i] : r[i]
                    });
                return t
            }
        };
        QW.DateH = e
    } (),
    function() {
        var e = {
            methodize: function(e, t) {
                return t ?
                    function() {
                        return e.apply(null, [this[t]].concat([].slice.call(arguments)))
                    }: function() {
                        return e.apply(null, [this].concat([].slice.call(arguments)))
                    }
            },
            mul: function(e, t) {
                var n = t == 1,
                    r = t == 2,
                    i = t == 3;
                return n ?
                    function() {
                        var t = arguments[0];
                        if (! (t instanceof Array)) return e.apply(this, arguments);
                        if (t.length) {
                            var n = [].slice.call(arguments);
                            return n[0] = t[0],
                                e.apply(this, n)
                        }
                    }: function() {
                        var t = arguments[0];
                        if (t instanceof Array) {
                            var n = [].slice.call(arguments),
                                s = [],
                                o = 0,
                                u = t.length,
                                a;
                            for (; o < u; o++) {
                                n[0] = t[o],
                                    a = e.apply(this, n);
                                if (r) a != null && (s = s.concat(a));
                                else if (i) {
                                    if (a !== undefined) return a
                                } else s.push(a)
                            }
                            return i ? undefined: s
                        }
                        return e.apply(this, arguments)
                    }
            },
            rwrap: function(e, t, n, r) {
                return n == null && (n = 0),
                    function() {
                        var i = e.apply(this, arguments);
                        if (r && i !== undefined) return i;
                        if (n >= 0) i = arguments[n];
                        else if (n == "this" || n == "context") i = this;
                        return t ? new t(i) : i
                    }
            },
            hook: function(e, t, n) {
                if (t == "before") return function() {
                    var r = [].slice.call(arguments);
                    if (!1 !== n.call(this, r, e, t)) return e.apply(this, r)
                };
                if (t == "after") return function() {
                    var r = [].slice.call(arguments),
                        i = e.apply(this, r);
                    return n.call(this, i, e, t)
                };
                throw new Error("unknow hooker:" + t)
            },
            bind: function(e, t) {
                var n = [].slice,
                    r = n.call(arguments, 2),
                    i = function() {},
                    s = function() {
                        return e.apply(this instanceof i ? this: t || {},
                            r.concat(n.call(arguments)))
                    };
                return i.prototype = e.prototype,
                    s.prototype = new i,
                    s
            },
            lazyApply: function(e, t, n, r, i) {
                i = i ||
                    function() {
                        return ! 0
                    };
                var s = function() {
                        var r = i();
                        r == 1 && e.apply(t, n || []),
                        (r == 1 || r == -1) && clearInterval(o)
                    },
                    o = setInterval(s, r);
                return o
            }
        };
        QW.FunctionH = e
    } (),
    function() {
        var e = QW.FunctionH,
            t = QW.ObjectH.create,
            n = QW.ObjectH.isPlainObject,
            r = function() {},
            i = {
                rwrap: function(n, i, s) {
                    var o = t(n);
                    s = s || "operator";
                    for (var u in n) {
                        var a = s,
                            f = n[u];
                        f instanceof Function && (typeof a != "string" && (a = s[u] || ""), "queryer" == a ? o[u] = e.rwrap(f, i, "returnValue") : "operator" == a ? n instanceof r ? o[u] = e.rwrap(f, i, "this") : o[u] = e.rwrap(f, i, 0) : "gsetter" == a && (n instanceof r ? o[u] = e.rwrap(f, i, "this", !0) : o[u] = e.rwrap(f, i, 0, !0)))
                    }
                    return o
                },
                gsetter: function(e, i) {
                    var s = t(e);
                    i = i || {};
                    for (var o in i) s[o] = function(e, t) {
                        return function() {
                            var r = arguments.length;
                            return r -= t,
                            n(arguments[t]) && r++,
                                s[e[Math.min(r, e.length - 1)]].apply(this, arguments)
                        }
                    } (i[o], e instanceof r ? 0 : 1);
                    return s
                },
                mul: function(n, r) {
                    var i = t(n);
                    r = r || {};
                    var s = 0,
                        o = 1,
                        u = 2,
                        a = 3;
                    for (var f in n) {
                        var l = n[f];
                        if (l instanceof Function) {
                            var c = r;
                            typeof c != "string" && (c = r[f] || ""),
                                "getter" == c || "getter_first" == c || "getter_first_all" == c ? i[f] = e.mul(l, o) : "getter_all" == c ? i[f] = e.mul(l, s) : "gsetter" == c ? i[f] = e.mul(l, a) : i[f] = e.mul(l, u);
                            if ("getter" == c || "getter_first_all" == c) i[f + "All"] = e.mul(l, s)
                        }
                    }
                    return i
                },
                methodize: function(t, n, i) {
                    var s = new r;
                    for (var o in t) {
                        var u = t[o];
                        u instanceof Function ? s[o] = e.methodize(u, n) : i && (s[o] = u)
                    }
                    return s
                }
            };
        QW.HelperH = i
    } (),
    function() {
        QW.JSON = {
            parse: function(e) {
                if (/^[[\],:{}\s0]*$/.test(e.replace(/\\\\|\\"|\\'|\w+\s*\:|null|true|false|[+\-eE.]|new Date(\d*)/g, "0").replace(/"[^"]*"|'[^']*'|\d+/g, "0"))) return (new Function("return (" + e + ");"))();
                throw "Invalid JSON format in executing JSON.parse"
            },
            stringify: function(e) {
                return QW.ObjectH.stringify(e)
            }
        }
    } (),
    function() {
        var e = QW.ObjectH.mix,
            t = QW.ArrayH.indexOf,
            n = function(t, n, r) {
                this.target = t,
                    this.type = n,
                    e(this, r || {})
            };
        e(n.prototype, {
            target: null,
            currentTarget: null,
            type: null,
            returnValue: undefined,
            preventDefault: function() {
                this.returnValue = !1
            }
        });
        var r = {
                on: function(e, n, i) {
                    var s = e.__custListeners && e.__custListeners[n];
                    return s || (r.createEvents(e, n), s = e.__custListeners && e.__custListeners[n]),
                        t(s, i) > -1 ? !1 : (s.push(i), !0)
                },
                un: function(e, n, r) {
                    var i = e.__custListeners && e.__custListeners[n];
                    if (!i) return ! 1;
                    if (r) {
                        var s = t(i, r);
                        if (s < 0) return ! 1;
                        i.splice(s, 1)
                    } else i.length = 0;
                    return ! 0
                },
                fire: function(t, i, s) {
                    if (i instanceof n) {
                        var o = e(i, s);
                        i = i.type
                    } else o = new n(t, i, s);
                    var u = t.__custListeners && t.__custListeners[i];
                    u || (r.createEvents(t, i), u = t.__custListeners && t.__custListeners[i]),
                    i != "*" && (u = u.concat(t.__custListeners["*"] || [])),
                        o.returnValue = undefined,
                        o.currentTarget = t;
                    var a = o.currentTarget;
                    if (a && a["on" + o.type]) var f = a["on" + o.type].call(a, o);
                    for (var l = 0; l < u.length; l++) u[l].call(a, o);
                    return o.returnValue !== !1 && (f !== !1 || o.returnValue !== undefined)
                },
                createEvents: function(e, t) {
                    t = t || [],
                    typeof t == "string" && (t = t.split(","));
                    var n = e.__custListeners;
                    n || (n = e.__custListeners = {});
                    for (var r = 0; r < t.length; r++) n[t[r]] = n[t[r]] || [];
                    return n["*"] = n["*"] || [],
                        e
                }
            },
            i = function() {
                this.__custListeners = {}
            },
            s = QW.HelperH.methodize(r);
        e(i.prototype, s),
            n.createEvents = function(t, n) {
                return r.createEvents(t, n),
                    e(t, s)
            },
            QW.CustEvent = n,
            QW.CustEventTargetH = r,
            QW.CustEventTarget = i
    } (),
    function() {
        function r() {
            return ! 0
        }
        function i(e, t) {
            var n = [],
                i = e.length,
                s = 0,
                o;
            if (t == r) {
                if (e instanceof Array) return e.slice(0);
                for (; s < i; s++) n[s] = e[s]
            } else for (; s < i;) o = e[s++],
            t(o) && n.push(o);
            return n
        }
        function u(e) {
            var t = e.children || e.childNodes,
                n = t.length,
                r = [],
                i = 0;
            for (; i < n; i++) t[i].nodeType == 1 && r.push(t[i]);
            return r
        }
        function a(e) {
            var t = document.getElementById(e),
                n;
            if (t && t.id != e) {
                n = document.getElementsByName(e);
                for (var r = 0; r < n.length; r++) if (n[r].id == e) return n[r];
                return null
            }
            return t
        }
        function f(e, t, n) {
            if (t == "n") return ! 0;
            if (typeof e == "number") var r = e;
            else {
                var i = e.parentNode;
                if (i.__queryStamp != h) {
                    var s = {
                            nextSibling: i.firstChild
                        },
                        o = 1;
                    while (s = s.nextSibling) s.nodeType == 1 && (s.__siblingIdx = o++);
                    i.__queryStamp = h,
                        i.__childrenNum = o - 1
                }
                n ? r = i.__childrenNum - e.__siblingIdx + 1 : r = e.__siblingIdx
            }
            switch (t) {
                case "even":
                case "2n":
                    return r % 2 == 0;
                case "odd":
                case "2n+1":
                    return r % 2 == 1;
                default:
                    if (!/n/.test(t)) return r == t;
                    var u = t.replace(/(^|\D+)n/g, "$11n").split("n"),
                        a = u[0] | 0,
                        f = r - u[1] | 0;
                    return a * f >= 0 && f % a == 0
            }
        }
        function c(s, o) {
            if (!o && l[s]) return l[s];
            var u = [],
                a = e(s),
                f = /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/g,
                c = [];
            a = a.replace(/\:([\w\-]+)(\(([^)]+)\))?/g,
                function(e, t, n, r, i) {
                    return u.push([t, r]),
                        ""
                }).replace(/^\*/g,
                function(e) {
                    return c.push("el.nodeType==1"),
                        ""
                }).replace(/^([\w\-]+)/g,
                function(e) {
                    return c.push('(el.tagName||"").toUpperCase()=="' + e.toUpperCase() + '"'),
                        ""
                }).replace(/([\[(].*)|#([\w\-]+)|\.([\w\-]+)/g,
                function(e, t, n, r) {
                    return t || n && '[id="' + n + '"]' || r && '[className~="' + r + '"]'
                }).replace(f,
                function(e, t, r, i, s) {
                    var o = n._attrGetters[t] || 'el.getAttribute("' + t + '")';
                    return c.push(n._operators[r || ""].replace(/aa/g, o).replace(/vv/g, s || "")),
                        ""
                });
            if (!/^\s*$/.test(a)) throw "Unsupported Selector:\n" + s + "\n-" + a;
            for (var h = 0,
                     p; p = u[h]; h++) {
                if (!n._pseudos[p[0]]) throw "Unsupported Selector:\n" + p[0] + "\n" + a;
                c.push('__SltPsds["' + p[0] + '"](el,"' + (p[1] != null ? t(p[1]) : "") + '",i,els)')
            }
            return c.length ? o ? new Function("els", "var els2=[];for(var i=0,el;el=els[i];i++){if(" + c.join("&&") + ") els2.push(el);} return els2;") : l[s] = new Function("el, i, els", "return " + c.join("&&") + ";") : o ?
                function(e) {
                    return i(e, r)
                }: l[s] = r
        }
        function v(e, t) {
            if (o && /^((^|,)\s*[.\w-][.\w\s\->+~]*)+$/.test(t)) {
                var n = e.id,
                    r, i = [],
                    s;
                if (!n && e.parentNode) {
                    r = e.id = "__QW_slt_" + p++;
                    try {
                        s = e.querySelectorAll("#" + r + " " + t)
                    } finally {
                        e.removeAttribute("id")
                    }
                } else s = e.querySelectorAll(t);
                for (var u = 0,
                         a = s.length; u < a; u++) i.push(s[u]);
                return i
            }
            return null
        }
        function m(e, t) {
            d++;
            var n = v(e, t);
            if (n) return n;
            var r = g(t),
                i = [e],
                f,
                l,
                h,
                p,
                b;
            while (p = r[0]) {
                if (!i.length) return [];
                var w = p[0];
                n = [];
                if (w == "+") {
                    b = c(p[1]);
                    for (f = 0; l = i[f++];) while (l = l.nextSibling) if (l.tagName) {
                        b(l) && n.push(l);
                        break
                    }
                    i = n,
                        r.splice(0, 1)
                } else {
                    if (w != "~") break;
                    b = c(p[1]);
                    for (f = 0; l = i[f++];) {
                        if (f > 1 && l.parentNode == i[f - 2].parentNode) continue;
                        while (l = l.nextSibling) l.tagName && b(l) && n.push(l)
                    }
                    i = n,
                        r.splice(0, 1)
                }
            }
            var E = r.length;
            if (!E || !i.length) return i;
            for (var S = 0,
                     x, T; T = r[S]; S++) if (/^[.\w-]*#([\w-]+)/i.test(T[1])) {
                x = RegExp.$1,
                    T[1] = T[1].replace("#" + x, "");
                break
            }
            if (S < E) {
                var N = a(x);
                if (!N) return [];
                for (f = 0, h; h = i[f++];) if (!h.parentNode || s(h, N)) return n = y(h, [N], r.slice(0, S + 1)),
                    !n.length || S == E - 1 ? n: m(N, r.slice(S + 1).join(",").replace(/,/g, " "));
                return []
            }
            var C = function(e) {
                    return e.getElementsByTagName(k)
                },
                k = "*",
                L = "";
            t = r[E - 1][1],
                t = t.replace(/^[\w\-]+/,
                    function(e) {
                        return k = e,
                            ""
                    }),
            o && (t = t.replace(/^[\w\*]*\.([\w\-]+)/,
                function(e, t) {
                    return L = t,
                        ""
                })),
            L && (C = function(e) {
                return e.querySelectorAll(k + "." + L)
            });
            if (E == 1) {
                r[0][0] == ">" ? (C = u, b = c(r[0][1], !0)) : b = c(t, !0),
                    n = [];
                for (f = 0; h = i[f++];) n = n.concat(b(C(h)));
                return n
            }
            r[r.length - 1][1] = t,
                n = [];
            for (f = 0; h = i[f++];) n = n.concat(y(h, C(h), r));
            return n
        }
        function g(t) {
            var n = [],
                r = /(^|\s*[>+~ ]\s*)(([\w\-\:.#*]+|\([^\)]*\)|\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\6|)\s*\])+)(?=($|\s*[>+~ ]\s*))/g,
                i = e(t).replace(r,
                    function(t, r, i, s) {
                        return n.push([e(r), i]),
                            ""
                    });
            if (!/^\s*$/.test(i)) throw "Unsupported Selector:\n" + t + "\n--" + i;
            return n
        }
        function y(e, t, r) {
            var s = r[0],
                o = r.length,
                u = !s[0],
                a = [],
                f = [],
                l = [],
                h = "";
            for (var p = 0; p < o; p++) {
                s = r[p],
                    a[p] = c(s[1], p == o - 1),
                    f[p] = n._relations[s[0]];
                if (s[0] == "" || s[0] == "~") l[p] = !0;
                h += s[0] || " "
            }
            t = a[o - 1](t);
            if (h == " ") return t;
            if (/[+>~] |[+]~/.test(h)) return i(t,
                function(t) {
                    var n = [],
                        r = o - 1,
                        i = n[r] = t;
                    for (; r > -1; r--) {
                        if (r > 0) i = f[r](i, a[r - 1], e);
                        else {
                            if (u || i.parentNode == e) return ! 0;
                            i = null
                        }
                        while (!i) {
                            if (++r == o) return ! 1;
                            l[r] && (i = n[r - 1], r++)
                        }
                        n[r - 1] = i
                    }
                });
            var d = [],
                v = t.length;
            for (var p = 0,
                     m, g; p < v;) {
                m = g = t[p++];
                for (var y = o - 1; y > 0; y--) if (! (m = f[y](m, a[y - 1], e))) break;
                m && (u || m.parentNode == e) && d.push(g)
            }
            return d
        }
        var e = QW.StringH.trim,
            t = QW.StringH.encode4Js,
            n = {
                queryStamp: 0,
                _operators: {
                    "": "aa",
                    "=": 'aa=="vv"',
                    "!=": 'aa!="vv"',
                    "~=": 'aa&&(" "+aa+" ").indexOf(" vv ")>-1',
                    "|=": 'aa&&(aa+"-").indexOf("vv-")==0',
                    "^=": 'aa&&aa.indexOf("vv")==0',
                    "$=": 'aa&&aa.lastIndexOf("vv")==aa.length-"vv".length',
                    "*=": 'aa&&aa.indexOf("vv")>-1'
                },
                _pseudos: {
                    "first-child": function(e) {
                        return ! (e = e.previousSibling) || !e.tagName && !e.previousSibling
                    },
                    "last-child": function(e) {
                        return ! (e = e.nextSibling) || !e.tagName && !e.nextSibling
                    },
                    "only-child": function(e) {
                        var t;
                        return ! ((t = e.previousSibling) && (t.tagName || t.previousSibling) || (t = e.nextSibling) && (t.tagName || t.nextSibling))
                    },
                    "nth-child": function(e, t) {
                        return f(e, t)
                    },
                    "nth-last-child": function(e, t) {
                        return f(e, t, !0)
                    },
                    "first-of-type": function(e) {
                        var t = e.tagName,
                            n = e;
                        while (n = n.previousSlibling) if (n.tagName == t) return ! 1;
                        return ! 0
                    },
                    "last-of-type": function(e) {
                        var t = e.tagName,
                            n = e;
                        while (n = n.nextSibling) if (n.tagName == t) return ! 1;
                        return ! 0
                    },
                    "only-of-type": function(e) {
                        var t = e.parentNode.childNodes;
                        for (var n = t.length - 1; n > -1; n--) if (t[n].tagName == e.tagName && t[n] != e) return ! 1;
                        return ! 0
                    },
                    "nth-of-type": function(e, t) {
                        var n = 1,
                            r = e;
                        while (r = r.previousSibling) r.tagName == e.tagName && n++;
                        return f(n, t)
                    },
                    "nth-last-of-type": function(e, t) {
                        var n = 1,
                            r = e;
                        while (r = r.nextSibling) r.tagName == e.tagName && n++;
                        return f(n, t)
                    },
                    empty: function(e) {
                        return ! e.firstChild
                    },
                    parent: function(e) {
                        return !! e.firstChild
                    },
                    not: function(e, t) {
                        return ! c(t)(e)
                    },
                    enabled: function(e) {
                        return ! e.disabled
                    },
                    disabled: function(e) {
                        return e.disabled
                    },
                    checked: function(e) {
                        return e.checked
                    },
                    focus: function(e) {
                        return e == e.ownerDocument.activeElement
                    },
                    indeterminate: function(e) {
                        return e.indeterminate
                    },
                    input: function(e) {
                        return /input|select|textarea|button/i.test(e.nodeName)
                    },
                    contains: function(e, t) {
                        return (e.textContent || e.innerText || "").indexOf(t) >= 0
                    }
                },
                _attrGetters: function() {
                    var e = {
                            "class": "el.className",
                            "for": "el.htmlFor",
                            href: 'el.getAttribute("href",2)'
                        },
                        t = "name,id,className,value,selected,checked,disabled,type,tagName,readOnly,offsetWidth,offsetHeight,innerHTML".split(",");
                    for (var n = 0,
                             r; r = t[n]; n++) e[r] = "el." + r;
                    return e
                } (),
                _relations: {
                    "": function(e, t, n) {
                        while ((e = e.parentNode) && e != n) if (t(e)) return e;
                        return null
                    },
                    ">": function(e, t, n) {
                        return e = e.parentNode,
                            e != n && t(e) ? e: null
                    },
                    "+": function(e, t, n) {
                        while (e = e.previousSibling) if (e.tagName) return t(e) && e;
                        return null
                    },
                    "~": function(e, t, n) {
                        while (e = e.previousSibling) if (e.tagName && t(e)) return e;
                        return null
                    }
                },
                selector2Filter: function(e) {
                    return c(e)
                },
                test: function(e, t) {
                    return c(t)(e)
                },
                filter: function(t, n, r) {
                    var r = r || document,
                        i = e(n).split(",");
                    if (i.length < 2) return y(r || document, t, g(n));
                    var s = y(r || document, t, g(i[0]));
                    if (s.length == t.length) return s;
                    for (var o = 0,
                             u = t.length; o < u; o++) t[o].__QWSltFlted = 0;
                    for (o = 0, u = s.length; o < u; o++) s[o].__QWSltFlted = 1;
                    var a = t,
                        f;
                    for (var l = 1; l < i.length; l++) {
                        f = [];
                        for (o = 0, u = a.length; o < u; o++) a[o].__QWSltFlted || f.push(a[o]);
                        a = f,
                            s = y(r || document, a, g(i[l]));
                        for (o = 0, u = s.length; o < u; o++) s[o].__QWSltFlted = 1
                    }
                    var c = [];
                    for (o = 0, u = t.length; o < u; o++) t[o].__QWSltFlted && c.push(t[o]);
                    return c
                },
                query: function(t, r) {
                    n.queryStamp = h++,
                        t = t || document;
                    var i = v(t, r);
                    if (i) return i;
                    var s = e(r).split(",");
                    i = m(t, s[0]);
                    for (var o = 1,
                             u; u = s[o]; o++) {
                        var a = m(t, u);
                        i = i.concat(a)
                    }
                    return i
                },
                one: function(e, t) {
                    var r = n.query(e, t);
                    return r[0]
                }
            };
        window.__SltPsds = n._pseudos;
        var s, o; (function() {
            var e = document.createElement("div");
            e.innerHTML = '<div class="aaa"></div>',
                o = e.querySelectorAll && e.querySelectorAll(".aaa").length == 1,
                s = e.contains ?
                    function(e, t) {
                        return e != t && e.contains(t)
                    }: function(e, t) {
                        return e.compareDocumentPosition(t) & 16
                    }
        })();
        var l = {},
            h = 0,
            p = 0,
            d = 0;
        QW.Selector = n
    } (),
    function() {
        var e = QW.Selector,
            t = QW.Browser,
            n = {
                query: function(t, n) {
                    return e.query(n || document.documentElement, t)
                },
                getDocRect: function(e) {
                    e = e || document;
                    var n = e.defaultView || e.parentWindow,
                        r = e.compatMode,
                        i = e.documentElement,
                        s = n.innerHeight || 0,
                        o = n.innerWidth || 0,
                        u = n.pageXOffset || 0,
                        a = n.pageYOffset || 0,
                        f = i.scrollWidth,
                        l = i.scrollHeight;
                    return r != "CSS1Compat" && (i = e.body, f = i.scrollWidth, l = i.scrollHeight),
                    r && !t.opera && (o = i.clientWidth, s = i.clientHeight),
                        f = Math.max(f, o),
                        l = Math.max(l, s),
                        u = Math.max(u, e.documentElement.scrollLeft, e.body.scrollLeft),
                        a = Math.max(a, e.documentElement.scrollTop, e.body.scrollTop),
                        {
                            width: o,
                            height: s,
                            scrollWidth: f,
                            scrollHeight: l,
                            scrollX: u,
                            scrollY: a
                        }
                },
                create: function() {
                    var e = document.createElement("div"),
                        t = {
                            option: [1, '<select multiple="multiple">', "</select>"],
                            optgroup: [1, '<select multiple="multiple">', "</select>"],
                            legend: [1, "<fieldset>", "</fieldset>"],
                            thead: [1, "<table>", "</table>"],
                            tbody: [1, "<table>", "</table>"],
                            tfoot: [1, "<table>", "</table>"],
                            tr: [2, "<table><tbody>", "</tbody></table>"],
                            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                            th: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                            _default: [0, "", ""]
                        },
                        n = /<(\w+)/i;
                    return function(r, i, s) {
                        var o = s && s.createElement("div") || e,
                            u = o,
                            a = (n.exec(r) || ["", ""])[1],
                            f = t[a] || t._default,
                            l = f[0];
                        o.innerHTML = f[1] + r + f[2];
                        while (l--) o = o.firstChild;
                        var c = o.firstChild;
                        if (!c || !i) {
                            while (u.firstChild) u.removeChild(u.firstChild);
                            return c
                        }
                        s = s || document;
                        var h = s.createDocumentFragment();
                        while (c = o.firstChild) h.appendChild(c);
                        return h
                    }
                } (),
                isElement: function(e) {
                    return !! e && e.nodeType == 1
                },
                ready: function(e, t) {
                    function i() {
                        clearTimeout(t.__QWDomReadyTimer);
                        if (r.length) {
                            var e = r.shift();
                            r.length && (t.__QWDomReadyTimer = setTimeout(i, 0)),
                                e()
                        }
                    }
                    t = t || document;
                    var n = t.defaultView || t.parentWindow,
                        r = t.__QWDomReadyCbs = t.__QWDomReadyCbs || [];
                    r.push(e),
                        setTimeout(function() {
                                "complete" == t.readyState ? i() : t.addEventListener ? (t.addEventListener("DOMContentLoaded", i, !1), n.addEventListener("load", i, !1)) : (function() {
                                    try {
                                        t.body.doScroll("left")
                                    } catch(e) {
                                        return setTimeout(arguments.callee, 1)
                                    }
                                    i()
                                } (), t.attachEvent("onreadystatechange",
                                    function() {
                                        "complete" == t.readyState && i()
                                    }))
                            },
                            1)
                },
                createElement: function(e, t, n) {
                    n = n || document;
                    var r = n.createElement(e);
                    return t && QW.NodeH.setAttr(r, t),
                        r
                },
                insertCssText: function(e) {
                    var t = document.createElement("style");
                    return t.type = "text/css",
                        t.styleSheet ? t.styleSheet.cssText = e: t.appendChild(document.createTextNode(e)),
                        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(t)
                }
            };
        QW.DomU = n
    } (),
    function() {
        function o(t, r) {
            if ("string" == typeof t) {
                t = t.replace(/^\s+/, "");
                if (t.indexOf("<") == 0) return n.create(t, !1, r);
                var i = (r || document).getElementById(t),
                    s;
                if (i && i.id != t) {
                    s = (r || document).getElementsByName(t);
                    for (var o = 0; o < s.length; o++) if (s[o].id == t) return s[o];
                    return null
                }
                return i
            }
            return e.isWrap(t) ? arguments.callee(t[0]) : t
        }
        function u(e) {
            return String(e).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
        }
        function a(e, t) {
            if (/px$/.test(t) || !t) return parseInt(t, 10) || 0;
            var n = e.style.right,
                r = e.runtimeStyle.right,
                i;
            return e.runtimeStyle.right = e.currentStyle.right,
                e.style.right = t,
                i = e.style.pixelRight || 0,
                e.style.right = n,
                e.runtimeStyle.right = r,
                i
        }
        function f(e, n, i) {
            var s = t.camelize(n);
            if (r.ie) return e.currentStyle[s];
            var o = e.ownerDocument.defaultView.getComputedStyle(e, i || null);
            return o ? o.getPropertyValue(t.decamelize(n)) : null
        }
        var e = QW.ObjectH,
            t = QW.StringH,
            n = QW.DomU,
            r = QW.Browser,
            i = QW.Selector,
            s = i.selector2Filter,
            l = {
                fillOpacity: 1,
                fontWeight: 1,
                lineHeight: 1,
                opacity: 1,
                orphans: 1,
                widows: 1,
                zIndex: 1,
                zoom: 1
            },
            c = {
                outerHTML: function() {
                    var e = document.createElement("div");
                    return function(t, n) {
                        t = o(t);
                        if ("outerHTML" in t) return t.outerHTML;
                        e.innerHTML = "";
                        var r = n && n.createElement("div") || e;
                        return r.appendChild(t.cloneNode(!0)),
                            r.innerHTML
                    }
                } (),
                hasClass: function(e, t) {
                    return e = o(e),
                    (" " + e.className + " ").indexOf(" " + t + " ") > -1
                },
                addClass: function(e, t) {
                    e = o(e),
                    c.hasClass(e, t) || (e.className = e.className ? e.className + " " + t: t)
                },
                removeClass: function(e, t) {
                    e = o(e),
                    c.hasClass(e, t) && (e.className = e.className.replace(new RegExp("(?:^|\\s)" + u(t) + "(?=\\s|$)", "ig"), ""))
                },
                replaceClass: function(e, t, n) {
                    e = o(e),
                        c.hasClass(e, t) ? e.className = e.className.replace(new RegExp("(^|\\s)" + u(t) + "(?=\\s|$)", "ig"), "$1" + n) : c.addClass(e, n)
                },
                toggleClass: function(e, t, n) {
                    n = n || "",
                        c.hasClass(e, t) ? c.replaceClass(e, t, n) : c.replaceClass(e, n, t)
                },
                show: function() {
                    function t(t) {
                        if (!e[t]) {
                            var n = document.createElement(t),
                                r = document.body;
                            c.insertSiblingBefore(r.firstChild, n),
                                display = c.getCurrentStyle(n, "display"),
                                c.removeChild(r, n),
                                r = n = null;
                            if (display === "none" || display === "") display = "block";
                            e[t] = display
                        }
                        return e[t]
                    }
                    var e = {};
                    return function(e, n) {
                        e = o(e);
                        if (!n) {
                            var r = e.style.display;
                            r === "none" && (r = e.style.display = ""),
                            r === "" && c.getCurrentStyle(e, "display") === "none" && (r = t(e.nodeName))
                        }
                        e.style.display = n || r
                    }
                } (),
                hide: function(e) {
                    e = o(e),
                        e.style.display = "none"
                },
                wrap: function(e, t) {
                    e = o(e),
                        t = o(t, e.ownerDocument),
                    e.parentNode && e.parentNode.insertBefore(t, e),
                        t.appendChild(e)
                },
                unwrap: function(e) {
                    e = o(e);
                    var t = e.parentNode;
                    if (t && t.tagName != "BODY") {
                        var n = t.parentNode;
                        while (t.firstChild) n.insertBefore(t.firstChild, t);
                        n.removeChild(t)
                    }
                },
                empty: function(e) {
                    e = o(e);
                    while (e.firstChild) e.removeChild(e.firstChild)
                },
                toggle: function(e, t) {
                    c.isVisible(e) ? c.hide(e) : c.show(e, t)
                },
                isVisible: function(e) {
                    return e = o(e),
                        !!(e.offsetHeight + e.offsetWidth && c.getStyle(e, "display") != "none")
                },
                getXY: function() {
                    var e = function(e, t) {
                        var n = parseInt(c.getCurrentStyle(e, "borderTopWidth"), 10) || 0,
                            i = parseInt(c.getCurrentStyle(e, "borderLeftWidth"), 10) || 0;
                        return r.gecko && /^t(?:able|d|h)$/i.test(e.tagName) && (n = i = 0),
                            t[0] += i,
                            t[1] += n,
                            t
                    };
                    return ! r.ie6 && !r.ie7 && document.documentElement.getBoundingClientRect ?
                        function(e) {
                            var t = e.ownerDocument,
                                i = n.getDocRect(t),
                                s = i.scrollX,
                                o = i.scrollY,
                                u = e.getBoundingClientRect(),
                                a = [u.left, u.top],
                                f,
                                l,
                                c;
                            r.ie && (l = t.documentElement.clientLeft, c = t.documentElement.clientTop, f = t.compatMode, f == "BackCompat" && (l = t.body.clientLeft, c = t.body.clientTop), a[0] -= l, a[1] -= c);
                            if (o || s) a[0] += s,
                                a[1] += o;
                            return a
                        }: function(t) {
                            var i = [t.offsetLeft, t.offsetTop],
                                s = t,
                                o = t.ownerDocument,
                                u = n.getDocRect(o),
                                a = !!(r.gecko || parseFloat(r.webkit) > 519),
                                f = 0,
                                l = 0;
                            while (s = s.offsetParent) i[0] += s.offsetLeft,
                                i[1] += s.offsetTop,
                            a && (i = e(s, i));
                            if (c.getCurrentStyle(t, "position") != "fixed") {
                                s = t;
                                while (s = s.parentNode) {
                                    f = s.scrollTop,
                                        l = s.scrollLeft,
                                    r.gecko && c.getCurrentStyle(s, "overflow") !== "visible" && (i = e(s, i));
                                    if (f || l) i[0] -= l,
                                        i[1] -= f
                                }
                            }
                            return i[0] += u.scrollX,
                                i[1] += u.scrollY,
                                i
                        }
                } (),
                setXY: function(e, t, n) {
                    e = o(e),
                        t = parseInt(t, 10),
                        n = parseInt(n, 10),
                    isNaN(t) || c.setStyle(e, "left", t),
                    isNaN(n) || c.setStyle(e, "top", n)
                },
                setSize: function(e, t, n) {
                    e = o(e),
                        t = parseFloat(t, 10),
                        n = parseFloat(n, 10);
                    if (isNaN(t) && isNaN(n)) return;
                    var r = c.borderWidth(e),
                        i = c.paddingWidth(e);
                    isNaN(t) || c.setStyle(e, "width", Math.max( + t - r[1] - r[3] - i[1] - i[3], 0)),
                    isNaN(n) || c.setStyle(e, "height", Math.max( + n - r[0] - r[2] - i[0] - i[2], 0))
                },
                setInnerSize: function(e, t, n) {
                    e = o(e),
                        t = parseFloat(t, 10),
                        n = parseFloat(n, 10),
                    isNaN(t) || c.setStyle(e, "width", t),
                    isNaN(n) || c.setStyle(e, "height", n)
                },
                setRect: function(e, t, n, r, i) {
                    c.setXY(e, t, n),
                        c.setSize(e, r, i)
                },
                setInnerRect: function(e, t, n, r, i) {
                    c.setXY(e, t, n),
                        c.setInnerSize(e, r, i)
                },
                getSize: function(e) {
                    return e = o(e),
                        {
                            width: e.offsetWidth,
                            height: e.offsetHeight
                        }
                },
                getRect: function(e) {
                    e = o(e);
                    var t = c.getXY(e),
                        n = t[0],
                        r = t[1],
                        i = e.offsetWidth,
                        s = e.offsetHeight;
                    return {
                        width: i,
                        height: s,
                        left: n,
                        top: r,
                        bottom: r + s,
                        right: n + i
                    }
                },
                nextSibling: function(e, t) {
                    var n = s(t || "");
                    e = o(e);
                    do e = e.nextSibling;
                    while (e && !n(e));
                    return e
                },
                previousSibling: function(e, t) {
                    var n = s(t || "");
                    e = o(e);
                    do e = e.previousSibling;
                    while (e && !n(e));
                    return e
                },
                previousSiblings: function(e, t) {
                    var n = s(t || ""),
                        r = [];
                    e = o(e);
                    while (e = e.previousSibling) n(e) && r.push(e);
                    return r.reverse()
                },
                nextSiblings: function(e, t) {
                    var n = s(t || ""),
                        r = [];
                    e = o(e);
                    while (e = e.nextSibling) n(e) && r.push(e);
                    return r
                },
                siblings: function(e, t) {
                    var n = s(t || ""),
                        r = e.parentNode.firstChild,
                        i = [];
                    while (r) e != r && n(r) && i.push(r),
                        r = r.nextSibling;
                    return i
                },
                ancestorNode: function(e, t) {
                    var n = s(t || "");
                    e = o(e);
                    do e = e.parentNode;
                    while (e && !n(e));
                    return e
                },
                parentNode: function(e, t) {
                    return c.ancestorNode(e, t)
                },
                ancestorNodes: function(e, t) {
                    var n = s(t || ""),
                        r = [];
                    e = o(e);
                    while (e = e.parentNode) n(e) && r.push(e);
                    return r.reverse()
                },
                firstChild: function(e, t) {
                    var n = s(t || "");
                    e = o(e).firstChild;
                    while (e && !n(e)) e = e.nextSibling;
                    return e
                },
                lastChild: function(e, t) {
                    var n = s(t || "");
                    e = o(e).lastChild;
                    while (e && !n(e)) e = e.previousSibling;
                    return e
                },
                contains: function(e, t) {
                    return e = o(e),
                        t = o(t),
                        e.contains ? e != t && e.contains(t) : !!(e.compareDocumentPosition(t) & 16)
                },
                insertAdjacentHTML: function(e, t, n) {
                    e = o(e);
                    if (e.insertAdjacentHTML) e.insertAdjacentHTML(t, n);
                    else {
                        var r = e.ownerDocument.createRange(),
                            i;
                        r.setStartBefore(e),
                            i = r.createContextualFragment(n),
                            c.insertAdjacentElement(e, t, i)
                    }
                },
                insertAdjacentElement: function(e, t, n) {
                    e = o(e),
                        n = o(n);
                    if (e.insertAdjacentElement) e.insertAdjacentElement(t, n);
                    else switch (String(t).toLowerCase()) {
                        case "beforebegin":
                            e.parentNode.insertBefore(n, e);
                            break;
                        case "afterbegin":
                            e.insertBefore(n, e.firstChild);
                            break;
                        case "beforeend":
                            e.appendChild(n);
                            break;
                        case "afterend":
                            e.parentNode.insertBefore(n, e.nextSibling || null)
                    }
                    return n
                },
                insert: function(e, t, n) {
                    c.insertAdjacentElement(e, t, n)
                },
                insertTo: function(e, t, n) {
                    c.insertAdjacentElement(n, t, e)
                },
                appendChild: function(e, t) {
                    return o(e).appendChild(o(t))
                },
                appendTo: function(e, t) {
                    return o(t).appendChild(o(e))
                },
                prepend: function(e, t) {
                    return e = o(e),
                        e.insertBefore(o(t), e.firstChild)
                },
                prependTo: function(e, t) {
                    return c.prepend(t, e)
                },
                insertSiblingBefore: function(e, t) {
                    return e = o(e),
                        e.parentNode.insertBefore(o(t), e)
                },
                insertSiblingAfter: function(e, t) {
                    e = o(e),
                        e.parentNode.insertBefore(o(t), e.nextSibling || null)
                },
                insertBefore: function(e, t, n) {
                    return o(e).insertBefore(o(t), n && o(n) || null)
                },
                insertAfter: function(e, t, n) {
                    return o(e).insertBefore(o(t), n && o(n).nextSibling || null)
                },
                insertParent: function(e, t) {
                    return c.insertSiblingBefore(e, t),
                        c.appendChild(t, e)
                },
                replaceNode: function(e, t) {
                    return e = o(e),
                        e.parentNode.replaceChild(o(t), e)
                },
                replaceChild: function(e, t, n) {
                    return o(e).replaceChild(o(t), o(n))
                },
                removeNode: function(e) {
                    return e = o(e),
                    e.parentNode && e.parentNode.removeChild(e)
                },
                removeChild: function(e, t) {
                    var t = o(t);
                    return t && o(e).removeChild(o(t))
                },
                get: function(t, n) {
                    return t = o(t),
                        e.get.apply(null, arguments)
                },
                set: function(t, n, r) {
                    t = o(t),
                        e.set.apply(null, arguments)
                },
                getAttr: function(e, t, n) {
                    return e = o(e),
                        t = c.attrMap[t] || t,
                        t in e && "href" != t ? e[t] : e.getAttribute(t, n || e.nodeName == "A" && t.toLowerCase() == "href" && 2 || null)
                },
                setAttr: function(e, t, n, r) {
                    e = o(e);
                    if ("object" != typeof t) t = c.attrMap[t] || t,
                        t in e ? e[t] = n: e.setAttribute(t, n, r || null);
                    else for (var i in t) c.setAttr(e, i, t[i])
                },
                removeAttr: function(e, t, n) {
                    return e = o(e),
                        e.removeAttribute(t, n || 0)
                },
                query: function(e, t) {
                    return e = o(e),
                        i.query(e, t || "")
                },
                one: function(e, t) {
                    return e = o(e),
                        i.one(e, t || "")
                },
                getElementsByClass: function(e, t) {
                    return e = o(e),
                        i.query(e, "." + t)
                },
                getValue: function(e) {
                    return e = o(e),
                        e.value
                },
                setValue: function(e, t) {
                    o(e).value = t
                },
                getHtml: function(e) {
                    return e = o(e),
                        e.innerHTML
                },
                setHtml: function() {
                    var e = /<(?:object|embed|option|style)/i,
                        t = function(e, t) {
                            c.empty(e),
                                c.appendChild(e, n.create(t, !0))
                        };
                    return function(n, r) {
                        n = o(n);
                        if (!e.test(r)) try {
                            n.innerHTML = r
                        } catch(i) {
                            t(n, r)
                        } else t(n, r)
                    }
                } (),
                encodeURIForm: function(e, t) {
                    e = o(e),
                        t = t ||
                            function(e) {
                                return ! 1
                            };
                    var n = [],
                        r = e.elements,
                        i = r.length,
                        s = 0,
                        u = function(e, t) {
                            n.push(encodeURIComponent(e) + "=" + encodeURIComponent(t))
                        };
                    for (; s < i; ++s) {
                        e = r[s];
                        var a = e.name;
                        if (e.disabled || !a || t(e)) continue;
                        switch (e.type) {
                            case "text":
                            case "hidden":
                            case "password":
                            case "textarea":
                                u(a, e.value);
                                break;
                            case "radio":
                            case "checkbox":
                                e.checked && u(a, e.value);
                                break;
                            case "select-one":
                                e.selectedIndex > -1 && u(a, e.value);
                                break;
                            case "select-multiple":
                                var f = e.options;
                                for (var l = 0; l < f.length; ++l) f[l].selected && u(a, f[l].value)
                        }
                    }
                    return n.join("&")
                },
                isFormChanged: function(e, t) {
                    e = o(e),
                        t = t ||
                            function(e) {
                                return ! 1
                            };
                    var n = e.elements,
                        r = n.length,
                        i = 0,
                        s = 0,
                        u;
                    for (; i < r; ++i, s = 0) {
                        e = n[i];
                        if (t(e)) continue;
                        switch (e.type) {
                            case "text":
                            case "hidden":
                            case "password":
                            case "textarea":
                                if (e.defaultValue != e.value) return ! 0;
                                break;
                            case "radio":
                            case "checkbox":
                                if (e.defaultChecked != e.checked) return ! 0;
                                break;
                            case "select-one":
                                s = 1;
                            case "select-multiple":
                                u = e.options;
                                for (; s < u.length; ++s) if (u[s].defaultSelected != u[s].selected) return ! 0
                        }
                    }
                    return ! 1
                },
                cloneNode: function(e, t) {
                    return o(e).cloneNode(t || !1)
                },
                removeStyle: function(e, n) {
                    e = o(e);
                    var r = t.camelize(n),
                        i = c.cssHooks[r];
                    i && i.remove ? i.remove(e) : e.style.removeProperty ? e.style.removeProperty(t.decamelize(n)) : e.style.removeAttribute(r)
                },
                getStyle: function(e, n) {
                    e = o(e),
                        n = t.camelize(n);
                    var r = c.cssHooks[n],
                        i;
                    return r && r.get ? i = r.get(e) : i = e.style[n],
                        i
                },
                getCurrentStyle: function(e, n, r) {
                    e = o(e);
                    var i = t.camelize(n),
                        s = c.cssHooks[i];
                    return s && s.get ? s.get(e, !0, r) : f(e, n, r)
                },
                setStyle: function(e, n, r) {
                    e = o(e);
                    if ("object" != typeof n) {
                        var i = t.camelize(n),
                            s = c.cssHooks[i];
                        s && s.set ? s.set(e, r) : (typeof r == "number" && !l[i] && (r += "px"), e.style[i] = r)
                    } else for (var u in n) c.setStyle(e, u, n[u])
                },
                borderWidth: function() {
                    var e = {
                            thin: 2,
                            medium: 4,
                            thick: 6
                        },
                        t = function(t, n) {
                            var r = c.getCurrentStyle(t, n);
                            return r = e[r] || parseFloat(r),
                            r || 0
                        };
                    return function(e) {
                        return e = o(e),
                            [t(e, "borderTopWidth"), t(e, "borderRightWidth"), t(e, "borderBottomWidth"), t(e, "borderLeftWidth")]
                    }
                } (),
                paddingWidth: function(e) {
                    return e = o(e),
                        [a(e, c.getCurrentStyle(e, "paddingTop")), a(e, c.getCurrentStyle(e, "paddingRight")), a(e, c.getCurrentStyle(e, "paddingBottom")), a(e, c.getCurrentStyle(e, "paddingLeft"))]
                },
                marginWidth: function(e) {
                    return e = o(e),
                        [a(e, c.getCurrentStyle(e, "marginTop")), a(e, c.getCurrentStyle(e, "marginRight")), a(e, c.getCurrentStyle(e, "marginBottom")), a(e, c.getCurrentStyle(e, "marginLeft"))]
                },
                tmpl: function(e, n) {
                    return e = o(e),
                        t.tmpl(e.innerHTML, n)
                },
                attrMap: {
                    "class": "className",
                    "for": "htmlFor",
                    tabindex: "tabIndex",
                    readonly: "readOnly",
                    maxlength: "maxLength",
                    cellspacing: "cellSpacing",
                    cellpadding: "cellPadding",
                    rowspan: "rowSpan",
                    colspan: "colSpan",
                    usemap: "useMap",
                    frameborder: "frameBorder",
                    contenteditable: "contentEditable"
                },
                cssHooks: function() {
                    var e = {
                        "float": {
                            get: function(e, t, n) {
                                if (t) {
                                    var r = e.ownerDocument.defaultView.getComputedStyle(e, n || null);
                                    return r ? r.getPropertyValue("float") : null
                                }
                                return e.style.cssFloat
                            },
                            set: function(e, t) {
                                e.style.cssFloat = t
                            },
                            remove: function(e) {
                                e.style.removeProperty("float")
                            }
                        },
                        width: {
                            get: function(e, t, n) {
                                if (!t) return e.style.width;
                                var r = f(e, "width", n);
                                return r && /^\d*(px)*$/.test(r) ? r: c.getSize(e).width + "px"
                            }
                        },
                        height: {
                            get: function(e, t, n) {
                                if (!t) return e.style.height;
                                var r = f(e, "height", n);
                                return r && /^\d*(px)*$/.test(r) ? r: c.getSize(e).height + "px"
                            }
                        }
                    };
                    if (r.ie) {
                        e["float"] = {
                            get: function(e, t) {
                                return e[t ? "currentStyle": "style"].styleFloat
                            },
                            set: function(e, t) {
                                e.style.styleFloat = t
                            },
                            remove: function(e) {
                                e.style.removeAttribute("styleFloat")
                            }
                        };
                        var t = document.createElement("div"),
                            n;
                        t.innerHTML = "<a href='#' style='opacity:.55;'>a</a>",
                            n = t.getElementsByTagName("a")[0];
                        if (n && !/^0.55$/.test(n.style.opacity)) {
                            var i = /alpha\([^)]*\)/i,
                                s = /opacity=([^)]*)/;
                            e.opacity = {
                                get: function(e, t) {
                                    return s.test((t && e.currentStyle ? e.currentStyle.filter: e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "": t ? "1": ""
                                },
                                set: function(e, t) {
                                    var n = e.style,
                                        r = e.currentStyle;
                                    n.zoom = 1;
                                    var s = "alpha(opacity=" + t * 100 + ")",
                                        o = r && r.filter || n.filter || "";
                                    n.filter = i.test(o) ? o.replace(i, s) : o + " " + s
                                },
                                remove: function(e) {
                                    var t = e.style,
                                        n = e.currentStyle,
                                        r = n && n.filter || t.filter || "";
                                    i.test(r) && (t.filter = r.replace(i, "")),
                                        t.removeAttribute("opacity")
                                }
                            }
                        }
                    }
                    return e
                } ()
            };
        c.g = o,
            QW.NodeH = c
    } (),
    function() {
        var e = QW.ObjectH,
            t = e.mix,
            n = e.isString,
            r = e.isArray,
            i = Array.prototype.push,
            s = QW.NodeH,
            o = s.g,
            u = s.query,
            a = s.one,
            f = QW.DomU.create,
            l = function(e) {
                if (!e) return this instanceof l ? new l([]) : null;
                if (e instanceof l) return e;
                var t = arguments[1];
                if (n(e)) {
                    e = e.replace(/^\s+/, "");
                    if (/^</.test(e)) {
                        var s = f(e, !0, t).childNodes,
                            a = [];
                        for (var c = 0,
                                 h; h = s[c]; c++) a[c] = h;
                        return new l(a)
                    }
                    return new l(u(t, e))
                }
                e = o(e, t);
                if (! (this instanceof l)) return new l(e);
                this.core = e,
                    r(e) ? (this.length = 0, i.apply(this, e)) : (this.length = 1, this[0] = e)
            };
        l.one = function(e) {
            if (!e) return null;
            var t = arguments[1];
            return n(e) ? (e = e.replace(/^\s+/, ""), /^</.test(e) ? new l(f(e, !1, t)) : new l(a(t, e))) : (e = o(e, t), r(e) ? new l(e[0]) : new l(e))
        },
            l.pluginHelper = function(e, n, r, i) {
                var s = QW.HelperH;
                e = s.mul(e, n);
                var o = s.rwrap(e, l, n);
                r && (o = s.gsetter(o, r)),
                    t(l, o, i);
                var u = s.methodize(e, "core");
                u = s.rwrap(u, l, n),
                r && (u = s.gsetter(u, r)),
                    t(l.prototype, u, i)
            },
            t(l.prototype, {
                first: function() {
                    return l(this[0])
                },
                last: function() {
                    return l(this[this.length - 1])
                },
                item: function(e) {
                    return l(this[e])
                },
                filter: function(e, t) {
                    return e === !0 ? l(this.core) : e === !1 ? l([]) : (typeof e == "string" && (e = QW.Selector.selector2Filter(e)), l(ArrayH.filter(this, e, t)))
                }
            }),
            QW.NodeW = l
    } (),
    function() {
        function e(e) {
            var n = t.getTarget(e),
                r = document;
            return n && (r = n.ownerDocument || n.document || (n.defaultView || n.window) && n || document),
                r
        }
        var t = {
            getPageX: function(n) {
                n = n || t.getEvent.apply(t, arguments);
                var r = e(n);
                return "pageX" in n ? n.pageX: n.clientX + (r.documentElement.scrollLeft || r.body.scrollLeft) - 2
            },
            getPageY: function(n) {
                n = n || t.getEvent.apply(t, arguments);
                var r = e(n);
                return "pageY" in n ? n.pageY: n.clientY + (r.documentElement.scrollTop || r.body.scrollTop) - 2
            },
            getDetail: function(e) {
                return e = e || t.getEvent.apply(t, arguments),
                e.detail || -(e.wheelDelta || 0)
            },
            getKeyCode: function(e) {
                return e = e || t.getEvent.apply(t, arguments),
                    "keyCode" in e ? e.keyCode: e.charCode || e.which || 0
            },
            stopPropagation: function(e) {
                e = e || t.getEvent.apply(t, arguments),
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
            },
            preventDefault: function(e) {
                e = e || t.getEvent.apply(t, arguments),
                    e.preventDefault ? e.preventDefault() : e.returnValue = !1
            },
            getCtrlKey: function(e) {
                return e = e || t.getEvent.apply(t, arguments),
                    e.ctrlKey
            },
            getShiftKey: function(e) {
                return e = e || t.getEvent.apply(t, arguments),
                    e.shiftKey
            },
            getAltKey: function(e) {
                return e = e || t.getEvent.apply(t, arguments),
                    e.altKey
            },
            getTarget: function(e) {
                e = e || t.getEvent.apply(t, arguments);
                var n = e.srcElement || e.target;
                return n && n.nodeType == 3 && (n = n.parentNode),
                    n
            },
            getRelatedTarget: function(e) {
                e = e || t.getEvent.apply(t, arguments);
                if ("relatedTarget" in e) return e.relatedTarget;
                if (e.type == "mouseover") return e.fromElement;
                if (e.type == "mouseout") return e.toElement
            },
            getEvent: function(e, t) {
                if (e) return e;
                if (t) {
                    if (t.document) return t.document.parentWindow.event;
                    if (t.parentWindow) return t.parentWindow.event
                }
                if (window.event) return window.event;
                var n = arguments.callee;
                do
                    if (/Event/.test(n.arguments[0])) return n.arguments[0];
                while (n = n.caller)
            },
            _EventPro: {
                stopPropagation: function() {
                    this.cancelBubble = !0
                },
                preventDefault: function() {
                    this.returnValue = !1
                }
            },
            standardize: function(e) {
                e = e || t.getEvent.apply(t, arguments),
                "target" in e || (e.target = t.getTarget(e)),
                "relatedTarget" in e || (e.relatedTarget = t.getRelatedTarget(e)),
                "pageX" in e || (e.pageX = t.getPageX(e), e.pageY = t.getPageY(e)),
                "detail" in e || (e.detail = t.getDetail(e)),
                "keyCode" in e || (e.keyCode = t.getKeyCode(e));
                for (var n in t._EventPro) e[n] == null && (e[n] = t._EventPro[n]);
                return e
            }
        };
        QW.EventH = t
    } (),
    function() {
        function i(e, t, n, i) {
            return r.get(e, t + (i ? "." + i: ""), n) ||
                function(r) {
                    if (!i || i && u._EventHooks[i][t](e, r, n)) return o(e, r, n, t)
                }
        }
        function s(e, t, n, i, s) {
            return r.get(e, n + (s ? "." + s: ""), i, t) ||
                function(r) {
                    var a = [],
                        f = r.srcElement || r.target;
                    if (!f) return;
                    f.nodeType == 3 && (f = f.parentNode);
                    while (f && f != e) a.push(f),
                        f = f.parentNode;
                    a = QW.Selector.filter(a, t, e);
                    for (var l = 0,
                             c = a.length; l < c; ++l) { (!s || s && u._DelegateHooks[s][n](a[l], r || window.event, i)) && o(a[l], r, i, n);
                        if (a[l].parentNode && a[l].parentNode.nodeType == 11) {
                            r.stopPropagation ? r.stopPropagation() : r.cancelBubble = !0;
                            break
                        }
                    }
                }
        }
        function o(e, t, n, r) {
            return u.fireHandler.apply(null, arguments)
        }
        var e = QW.NodeH.g,
            t = QW.ObjectH.mix,
            n = QW.EventH.standardize,
            r = function() {
                var e = 1,
                    t = "__QWETH_id";
                return {
                    get: function(e, n, r, i) {
                        var s = e[t] && this[e[t]];
                        if (s && r[t]) return s[n + r[t] + (i || "")]
                    },
                    add: function(n, r, i, s, o) {
                        r[t] || (r[t] = e++),
                        s[t] || (s[t] = e++);
                        var u = this[r[t]] || (this[r[t]] = {});
                        u[i + s[t] + (o || "")] = n
                    },
                    remove: function(e, n, r, i) {
                        var s = e[t] && this[e[t]];
                        s && r[t] && delete s[n + r[t] + (i || "")]
                    },
                    removeEvents: function(e, n) {
                        var r = e[t] && this[e[t]];
                        if (r) {
                            var i = new RegExp("^[a-zA-Z.]*" + (n || "") + "\\d+$");
                            for (var s in r) i.test(s) && (u.removeEventListener(e, s.split(/[^a-zA-Z]/)[0], r[s]), delete r[s])
                        }
                    },
                    removeDelegates: function(e, n, r) {
                        var i = e[t] && this[e[t]];
                        if (i) {
                            var s = new RegExp("^([a-zA-Z]+\\.)?" + (n || "\\w+") + "\\d+.+");
                            for (var o in i) if (s.test(o) && (!r || o.substr(o.length - r.length) == r)) {
                                var a = o.split(/\d+/)[0].split("."),
                                    f = u._DelegateCpatureEvents.indexOf(a[1] || a[0]) > -1;
                                u.removeEventListener(e, o.split(/[^a-zA-Z]/)[0], i[o], f),
                                    delete i[o]
                            }
                        }
                    }
                }
            } (),
            u = {
                _EventHooks: {},
                _DelegateHooks: {},
                _DelegateCpatureEvents: "change,focus,blur",
                fireHandler: function(e, t, r, i) {
                    return t = n(t),
                        t.userType = i,
                        r.call(e, t)
                },
                addEventListener: function() {
                    return document.addEventListener ?
                        function(e, t, n, r) {
                            e.addEventListener(t, n, r || !1)
                        }: function(e, t, n) {
                            e.attachEvent("on" + t, n)
                        }
                } (),
                removeEventListener: function() {
                    return document.removeEventListener ?
                        function(e, t, n, r) {
                            e.removeEventListener(t, n, r || !1)
                        }: function(e, t, n) {
                            e.detachEvent("on" + t, n)
                        }
                } (),
                on: function(t, n, s) {
                    if (n && n.indexOf(",") > -1) {
                        var o = n.split(/\s*,\s*/);
                        for (var a = 0; a < o.length; a++) u.on(t, o[a], s);
                        return
                    }
                    t = e(t);
                    var f = u._EventHooks[n];
                    if (f) for (var a in f) {
                        var l = i(t, a, s, n);
                        r.add(l, t, a + "." + n, s),
                            a == n ? u.addEventListener(t, a, l) : u.on(t, a, l)
                    } else l = i(t, n, s),
                        u.addEventListener(t, n, l),
                        r.add(l, t, n, s)
                },
                un: function(t, n, s) {
                    if (n && n.indexOf(",") > -1) {
                        var o = n.split(/\s*,\s*/);
                        for (var a = 0; a < o.length; a++) u.un(t, o[a], s);
                        return
                    }
                    t = e(t);
                    if (!s) return r.removeEvents(t, n);
                    var f = u._EventHooks[n];
                    if (f) for (var a in f) {
                        var l = i(t, a, s, n);
                        a == n ? u.removeEventListener(t, a, l) : u.un(t, a, l),
                            r.remove(t, a + "." + n, s)
                    } else l = i(t, n, s),
                        u.removeEventListener(t, n, l),
                        r.remove(t, n, s)
                },
                once: function(t, n, r) {
                    t = e(t);
                    var i = function() {
                        r.apply(this, arguments),
                            u.un(t, n, i)
                    };
                    u.on(t, n, i)
                },
                delegate: function(t, n, i, o) {
                    if (i && i.indexOf(",") > -1) {
                        var a = i.split(/\s*,\s*/);
                        for (var f = 0; f < a.length; f++) u.delegate(t, n, a[f], o);
                        return
                    }
                    t = e(t);
                    var l = u._DelegateHooks[i],
                        c = u._DelegateCpatureEvents.indexOf(i) > -1;
                    if (l) for (var f in l) {
                        var h = s(t, n, f, o, i);
                        r.add(h, t, f + "." + i, o, n),
                            f == i ? u.addEventListener(t, f, h, c) : u.delegate(t, n, f, h)
                    } else h = s(t, n, i, o),
                        u.addEventListener(t, i, h, c),
                        r.add(h, t, i, o, n)
                },
                undelegate: function(t, n, i, o) {
                    if (i && i.indexOf(",") > -1) {
                        var a = i.split(/\s*,\s*/);
                        for (var f = 0; f < a.length; f++) u.undelegate(t, n, a[f], o);
                        return
                    }
                    t = e(t);
                    if (!o) return r.removeDelegates(t, i, n);
                    var l = u._DelegateHooks[i],
                        c = u._DelegateCpatureEvents.indexOf(i) > -1;
                    if (l) for (var f in l) {
                        var h = s(t, n, f, o, i);
                        f == i ? u.removeEventListener(t, f, h, c) : u.undelegate(t, n, f, h),
                            r.remove(t, f + "." + i, o, n)
                    } else h = s(t, n, i, o),
                        u.removeEventListener(t, i, h, c),
                        r.remove(t, i, o, n)
                },
                fire: function() {
                    return document.dispatchEvent ?
                        function(e, t) {
                            var n = null,
                                r = e.ownerDocument || e;
                            return /mouse|click/i.test(t) ? (n = r.createEvent("MouseEvents"), n.initMouseEvent(t, !0, !0, r.defaultView, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null)) : (n = r.createEvent("Events"), n.initEvent(t, !0, !0, r.defaultView)),
                                e.dispatchEvent(n)
                        }: function(e, t) {
                            return e.fireEvent("on" + t)
                        }
                } ()
            };
        u._defaultExtend = function() {
            var n = function(e) {
                function t(e) {
                    u[e] = function(t, n) {
                        if (n) u.on(t, e, n);
                        else if (t[e]) try {
                            t[e]()
                        } catch(r) {} else u.fire(t, e)
                    }
                }
                for (var n = 0,
                         r = e.length; n < r; ++n) t(e[n])
            };
            n("submit,reset,click,focus,blur,change,select".split(",")),
                u.hover = function(t, n, r) {
                    t = e(t),
                        u.on(t, "mouseenter", n),
                        u.on(t, "mouseleave", r || n)
                };
            var r = navigator.userAgent;
            /firefox/i.test(r) && (u._EventHooks.mousewheel = u._DelegateHooks.mousewheel = {
                DOMMouseScroll: function(e, t) {
                    return ! 0
                }
            }),
                t(u._EventHooks, {
                    mouseenter: {
                        mouseover: function(e, t) {
                            var n = t.relatedTarget || t.fromElement;
                            if (!n || !(e.contains ? e.contains(n) : e == n || e.compareDocumentPosition(n) & 16)) return ! 0
                        }
                    },
                    mouseleave: {
                        mouseout: function(e, t) {
                            var n = t.relatedTarget || t.toElement;
                            if (!n || !(e.contains ? e.contains(n) : e == n || e.compareDocumentPosition(n) & 16)) return ! 0
                        }
                    }
                }),
                t(u._DelegateHooks, u._EventHooks);
            if (!document.addEventListener) {
                function i(e) {
                    switch (e.type) {
                        case "checkbox":
                        case "radio":
                            return e.checked;
                        case "select-multiple":
                            var t = [],
                                n = e.options;
                            for (var r = 0; r < n.length; ++r) n[r].selected && t.push(n[r].value);
                            return t.join(",");
                        default:
                            return e.value
                    }
                }
                function s(e, t) {
                    var n = t.target || t.srcElement;
                    if (i(n) != n.__QWETH_pre_val) return o(e, t),
                        !0
                }
                function o(e, t) {
                    var n = t.target || t.srcElement;
                    n.__QWETH_pre_val = i(n)
                }
                t(u._DelegateHooks, {
                    change: {
                        beforeactivete: o,
                        deactivate: s,
                        focusout: s,
                        click: s,
                        keyup: function(e, t) {
                            if (t.srcElement && t.srcElement.tagName == "SELECT") return s(e, t)
                        }
                    },
                    focus: {
                        focusin: function(e, t) {
                            return ! 0
                        }
                    },
                    blur: {
                        focusout: function(e, t) {
                            return ! 0
                        }
                    }
                })
            }
        },
            u._defaultExtend(),
            QW.EventTargetH = u
    } (),
    function() {
        var e = "queryer",
            t = "operator",
            n = "getter_all",
            r = "getter_first",
            i = "getter_first_all";
        QW.NodeC = {
            getterType: r,
            arrayMethods: "map,forEach,toArray".split(","),
            wrapMethods: {
                g: e,
                one: e,
                query: e,
                getElementsByClass: e,
                outerHTML: r,
                hasClass: r,
                addClass: t,
                removeClass: t,
                replaceClass: t,
                toggleClass: t,
                show: t,
                hide: t,
                toggle: t,
                isVisible: r,
                getXY: i,
                setXY: t,
                setSize: t,
                setInnerSize: t,
                setRect: t,
                setInnerRect: t,
                getSize: i,
                getRect: i,
                nextSibling: e,
                previousSibling: e,
                nextSiblings: e,
                previousSiblings: e,
                siblings: e,
                ancestorNode: e,
                ancestorNodes: e,
                parentNode: e,
                firstChild: e,
                lastChild: e,
                contains: r,
                insertAdjacentHTML: t,
                insertAdjacentElement: t,
                insert: t,
                insertTo: t,
                appendChild: t,
                appendTo: t,
                insertSiblingBefore: t,
                insertSiblingAfter: t,
                insertBefore: t,
                insertAfter: t,
                replaceNode: t,
                replaceChild: t,
                removeNode: t,
                empty: t,
                removeChild: t,
                get: i,
                set: t,
                getAttr: i,
                setAttr: t,
                removeAttr: t,
                getValue: i,
                setValue: t,
                getHtml: i,
                setHtml: t,
                encodeURIForm: r,
                isFormChanged: r,
                cloneNode: e,
                getStyle: i,
                getCurrentStyle: i,
                setStyle: t,
                removeStyle: t,
                borderWidth: r,
                paddingWidth: r,
                marginWidth: r,
                tmpl: i,
                wrap: t,
                unwrap: t,
                prepend: t,
                prependTo: t,
                forEach: t
            },
            gsetterMethods: {
                val: ["getValue", "setValue"],
                html: ["getHtml", "setHtml"],
                attr: ["", "getAttr", "setAttr"],
                css: ["", "getCurrentStyle", "setStyle"],
                size: ["getSize", "setInnerSize"],
                xy: ["getXY", "setXY"]
            }
        }
    } (),
    function() {
        var e = QW.HelperH.methodize,
            t = QW.ObjectH.mix;
        t(Object, QW.ObjectH),
            t(Array, QW.ArrayH),
            t(Array.prototype, e(QW.ArrayH)),
            t(Function, QW.FunctionH),
            t(Date, QW.DateH),
            t(Date.prototype, e(QW.DateH)),
            t(String, QW.StringH),
            t(String.prototype, e(QW.StringH))
    } (),
    function() {
        var e = QW.ObjectH.mix,
            t = QW.HelperH.methodize,
            n = QW.HelperH.rwrap,
            r = QW.NodeC,
            i = QW.NodeH,
            s = QW.EventTargetH,
            o = QW.JssTargetH,
            u = QW.DomU,
            a = QW.NodeW;
        a.pluginHelper(i, r.wrapMethods, r.gsetterMethods),
            a.pluginHelper(s, "operator"),
            a.pluginHelper(o, r.wrapMethods, {
                jss: ["", "getJss", "setJss"]
            });
        var f = QW.ObjectH.dump(QW.ArrayH, r.arrayMethods);
        f = t(f),
            f = n(f, a, r.wrapMethods),
            e(a.prototype, f);
        var l = QW.Dom = {};
        e(l, [u, i, s, o])
    } (),
    function() {
        var e = function(e, t) {
            var n = (e.getAttribute && e.getAttribute("data--ban")) | 0;
            if (n) {
                if (!e.__BAN_preTime || new Date - e.__BAN_preTime > n) return setTimeout(function() {
                    e.__BAN_preTime = new Date * 1
                }),
                    !0;
                QW.EventH.preventDefault(t);
                return
            }
            return ! 0
        };
        QW.EventTargetH._DelegateHooks.click = QW.EventTargetH._EventHooks.click = {
            click: e
        },
            QW.EventTargetH._EventHooks.submit = {
                submit: e
            }
    } (),
    window.g = QW.g = QW.NodeH.g,
    window.W = QW.W = QW.NodeW,
    QW.ObjectH.mix(window, QW),
    QW.ModuleH.provideDomains.push(window),
    function() {
        function i(e) {
            this.options = e,
                this._initialize()
        }
        var e = QW.ObjectH.mix,
            t = QW.ObjectH.encodeURIJson,
            n = QW.NodeH.encodeURIForm,
            r = QW.CustEvent;
        e(i, {
            STATE_INIT: 0,
            STATE_REQUEST: 1,
            STATE_SUCCESS: 2,
            STATE_ERROR: 3,
            STATE_TIMEOUT: 4,
            STATE_CANCEL: 5,
            defaultHeaders: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest"
            },
            EVENTS: ["succeed", "error", "cancel", "timeout", "complete"],
            getXHR: function() {
                function r() {
                    try {
                        return new window.XMLHttpRequest
                    } catch(e) {}
                }
                function i() {
                    try {
                        return new window.ActiveXObject("Microsoft.XMLHTTP")
                    } catch(e) {}
                }
                var e;
                try {
                    e = location.href
                } catch(t) {
                    e = document.createElement("a"),
                        e.href = "",
                        e = e.href
                }
                var n = /^(about|app|app\-storage|.+\-extension|file|res|widget):/i.test(e);
                return window.ActiveXObject ?
                    function() {
                        return ! n && r() || i()
                    }: r
            } (),
            request: function(e, t, n, r) {
                if (e.constructor == Object) var s = new i(e);
                else typeof t == "function" && (r = n, n = t, e && e.tagName == "FORM" ? (r = r || e.method, t = e, e = e.action) : t = ""),
                    s = new i({
                        url: e,
                        method: r,
                        data: t,
                        onsucceed: function() {
                            n.call(this, this.requester.responseText)
                        }
                    });
                return s.send(),
                    s
            },
            get: function(e, t, n) {
                var r = [].slice.call(arguments, 0);
                return r.push("get"),
                    i.request.apply(null, r)
            },
            post: function(e, t, n) {
                var r = [].slice.call(arguments, 0);
                return r.push("post"),
                    i.request.apply(null, r)
            }
        }),
            e(i.prototype, {
                url: "",
                method: "get",
                async: !0,
                user: "",
                pwd: "",
                requestHeaders: null,
                data: "",
                useLock: 0,
                timeout: 3e4,
                isLocked: 0,
                state: i.STATE_INIT,
                send: function(e, r, s) {
                    var o = this;
                    if (o.isLocked) throw new Error("Locked.");
                    o.isProcessing() && o.cancel();
                    var u = o.requester;
                    if (!u) {
                        u = o.requester = i.getXHR();
                        if (!u) throw new Error("Fail to get HTTPRequester.")
                    }
                    e = e || o.url,
                        e = e.split("#")[0],
                        r = (r || o.method || "").toLowerCase(),
                        s = s || o.data,
                    typeof s == "object" && (s.tagName == "FORM" ? s = n(s) : s = t(s)),
                    s && r != "post" && (e += (e.indexOf("?") != -1 ? "&": "?") + s),
                        o.user ? u.open(r, e, o.async, o.user, o.pwd) : u.open(r, e, o.async);
                    for (var a in o.requestHeaders) u.setRequestHeader(a, o.requestHeaders[a]);
                    o.isLocked = 0,
                        o.state = i.STATE_INIT,
                    o.async && (o._sendTime = new Date, o.useLock && (o.isLocked = 1), this.requester.onreadystatechange = function() {
                        var e = o.requester.readyState;
                        e == 4 && o._execComplete()
                    },
                        o._checkTimeout()),
                        r == "post" ? (s || (s = " "), u.send(s)) : u.send(null);
                    if (!o.async) return o._execComplete(),
                        o.requester.responseText
                },
                isSuccess: function() {
                    var e = this.requester.status;
                    return ! e || e >= 200 && e < 300 || e == 304
                },
                isProcessing: function() {
                    var e = this.requester ? this.requester.readyState: 0;
                    return e > 0 && e < 4
                },
                get: function(e, t) {
                    this.send(e, "get", t)
                },
                post: function(e, t) {
                    this.send(e, "post", t)
                },
                cancel: function() {
                    var e = this;
                    return e.requester && e.isProcessing() ? (e.state = i.STATE_CANCEL, e.requester.abort(), e._execComplete(), e.fire("cancel"), !0) : !1
                },
                _initialize: function() {
                    var t = this;
                    r.createEvents(t, i.EVENTS),
                        e(t, t.options, 1),
                        t.requestHeaders = e(t.requestHeaders || {},
                            i.defaultHeaders)
                },
                _checkTimeout: function() {
                    var e = this;
                    e.async && (clearTimeout(e._timer), this._timer = setTimeout(function() {
                            e.requester && e.isProcessing() && (e.state = i.STATE_TIMEOUT, e.requester.abort(), e._execComplete("timeout"))
                        },
                        e.timeout))
                },
                _execComplete: function(e) {
                    var t = this,
                        n = t.requester;
                    n.onreadystatechange = new Function,
                        t.isLocked = 0,
                        clearTimeout(this._timer);
                    var r = null;
                    try {
                        r = t.requester.responseText
                    } catch(s) {}
                    e == "timeout" && t.fire("timeout"),
                    t.state != i.STATE_CANCEL && t.state != i.STATE_TIMEOUT && (t.isSuccess() ? (t.state = i.STATE_SUCCESS, t.fire("succeed", {
                        responseText: r
                    })) : (t.state = i.STATE_ERROR, t.fire("error", {
                        responseText: r
                    }))),
                        t.fire("complete", {
                            responseText: r
                        })
                }
            }),
            QW.provide("Ajax", i)
    } (),
    function() {
        var e = QW.Ajax,
            t = QW.NodeW;
        e.Delay = 1e3,
            e.prototype.opResults = function(e) {
                var t = this;
                if (!t.isSuccess()) return alert("?????????????????????????????????"),
                    {
                        isop: !0,
                        err: "inter"
                    };
                var n = t.requester.responseText;
                try {
                    var r = (new Function("return (" + n + ");"))()
                } catch(i) {
                    return alert("?????????????????????????????????"),
                        {
                            isop: !0,
                            err: "inter"
                        }
                }
                r.isop = !0;
                switch (r.err) {
                    default:
                        r.isop = !1
                }
                return r
            },
            e.prototype.execJs = function() {
                QW.StringH.execJs(this.requester.responseText)
            };
        var n = {
            ajaxForm: function(t, n) {
                var r = {
                    data: t,
                    url: t.action,
                    method: t.method
                };
                typeof n == "function" ? r.onsucceed = function() {
                    n.call(this, this.requester.responseText)
                }: (r.onsucceed = e.opResults, QW.ObjectH.mix(r, n || {},
                    !0)),
                    (new e(r)).send()
            }
        };
        t.pluginHelper(n, "operator")
    } (),
    function() {
        function r(e) {
            e.step(),
            e.isPlaying() && (e._interval = window.setInterval(function() {
                    e.step()
                },
                e.frameTime))
        }
        function i(e) {
            window.clearInterval(e._interval)
        }
        function s(e, t) {
            e.per = t,
                e._startDate = new Date * 1 - t * e.dur,
            e.byStep && (e._totalStep = e.dur / e.frameTime, e._currentStep = t * e._totalStep)
        }
        var e = QW.CustEvent,
            t = QW.ObjectH.mix,
            n = function(r, i, o) {
                t(this, o),
                    t(this, {
                        animFun: r,
                        dur: i,
                        byStep: !1,
                        per: 0,
                        frameTime: 28,
                        _status: 0
                    }),
                    s(this, this.per),
                    e.createEvents(this, n.EVENTS)
            };
        n.EVENTS = "beforeplay,play,step,pause,resume,end,reset".split(","),
            t(n.prototype, {
                isPlaying: function() {
                    return this._status == 1
                },
                play: function() {
                    var e = this;
                    return e.isPlaying() && e.pause(),
                        s(e, 0),
                        e.fire("beforeplay") ? (e._status = 1, e.fire("play"), r(e), !0) : !1
                },
                step: function(e) {
                    var t = this;
                    e != null ? s(t, e) : (t.byStep ? e = t._currentStep++/t._totalStep:e=(new Date-t._startDate)/t.dur, this.per = e),
                    this.per > 1 && (this.per = 1),
                        t.animFun(this.per),
                        t.fire("step");
                    if (this.per >= 1) {
                        this.end();
                        return
                    }
                },
                end: function() {
                    s(this, 1),
                        this.animFun(1),
                        this._status = 2,
                        i(this),
                        this.fire("end")
                },
                pause: function() {
                    this._status = 4,
                        i(this),
                        this.fire("pause")
                },
                resume: function() {
                    s(this, this.per),
                        this._status = 1,
                        this.fire("resume"),
                        r(this)
                },
                reset: function() {
                    s(this, 0),
                        this.animFun(0),
                        this.fire("reset")
                }
            }),
            QW.provide("Anim", n)
    } (),
    function() {
        function y(e, t) {
            for (var n in e) {
                var r = new RegExp(n, "i");
                if (r.test(t)) return e[n]
            }
            return null
        }
        var e = QW.NodeH,
            t = QW.ObjectH.mix,
            n = QW.ObjectH.isObject,
            r = t,
            i = e.g,
            s = e.getCurrentStyle,
            o = e.setStyle,
            u = QW.DomU.isElement,
            a = QW.ArrayH.forEach,
            f = QW.ArrayH.map,
            l = QW.Anim,
            c = e.show,
            h = e.hide,
            p = e.isVisible,
            d = function(e, r, i) {
                this.el = e,
                    this.attr = i,
                n(r) || (r = {
                    to: r
                }),
                    t(this, r)
            };
        t(d.prototype, {
            getValue: function() {
                return s(this.el, this.attr)
            },
            setValue: function(e) {
                this.unit ? o(this.el, this.attr, e + this.unit) : o(this.el, this.attr, e)
            },
            getUnit: function() {
                if (this.unit) return this.unit;
                var e = this.getValue();
                if (e) {
                    var t = e.toString().replace(/^[+-]?[\d\.]+/g, "");
                    if (t && t != e) return t
                }
                return ""
            },
            init: function() {
                var e, t, n;
                null != this.from ? e = parseFloat(this.from) : e = parseFloat(this.getValue()) || 0,
                    t = parseFloat(this.to),
                    n = this.by != null ? parseFloat(this.by) : t - e,
                    this.from = e,
                    this.by = n,
                    this.unit = this.getUnit()
            },
            action: function(e) {
                var t;
                typeof this.end != "undefined" && e >= 1 ? t = this.end: (t = this.from + this.by * this.easing(e), t = parseFloat(t.toFixed(6))),
                    this.setValue(t)
            }
        });
        var v = function(e, t, n) {
            var i = new d(e, t, n);
            r(this, i)
        };
        v.MENTOR_CLASS = d,
            t(v.prototype, {
                    getValue: function() {
                        return this.el[this.attr] | 0
                    },
                    setValue: function(e) {
                        this.el[this.attr] = Math.round(e)
                    }
                },
                !0);
        var m = function(e, t, n) {
            var i = new d(e, t, n);
            r(this, i)
        };
        m.MENTOR_CLASS = d,
            t(m.prototype, {
                    parseColor: function(e) {
                        var t = {
                            rgb: /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,
                            hex: /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
                            hex3: /^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i
                        };
                        if (e.length == 3) return e;
                        var n = t.hex.exec(e);
                        return n && n.length == 4 ? [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)] : (n = t.rgb.exec(e), n && n.length == 4 ? [parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10)] : (n = t.hex3.exec(e), n && n.length == 4 ? [parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)] : [0, 0, 0]))
                    },
                    init: function() {
                        var e, t, n, r = this.parseColor;
                        null != this.from ? e = this.from: e = this.getValue(),
                            e = r(e),
                            t = this.to || [0, 0, 0],
                            t = r(t),
                            n = this.by ? r(this.by) : f(t,
                                function(t, n) {
                                    return t - e[n]
                                }),
                            this.from = e,
                            this.to = t,
                            this.by = n,
                            this.unit = ""
                    },
                    getValue: function() {
                        var e = s(this.el, this.attr);
                        return this.parseColor(e)
                    },
                    setValue: function(e) {
                        typeof e == "string" ? o(this.el, this.attr, e) : o(this.el, this.attr, "rgb(" + e.join(",") + ")")
                    },
                    action: function(e) {
                        var t = this,
                            n;
                        typeof this.end != "undefined" && e >= 1 ? n = this.end: n = this.from.map(function(n, r) {
                            return Math.max(Math.floor(n + t.by[r] * t.easing(e)), 0)
                        }),
                            this.setValue(n)
                    }
                },
                !0);
        var g = {
                color$: m,
                "^scroll": v,
                ".*": d
            },
            b = function(e, t, n, s) {
                e = i(e);
                if (!u(e)) throw new Error(["Animation", "Initialize Error", "Element Not Found!"]);
                n = n || b.DefaultEasing,
                    s = typeof s == "function" ? s: b.DefaultEasing;
                var o = [],
                    f = [];
                for (var c in t) {
                    if (typeof t[c] == "string" && b.agentHooks[t[c]]) {
                        var h = b.agentHooks[t[c]](c, e);
                        h.callback && (f.push(h.callback), delete h.callback),
                            t[c] = h
                    }
                    var p = y(g, c),
                        d = new p(e, t[c], c);
                    if (!d) continue;
                    d.init(),
                        d.easing = d.easing || s,
                        o.push(d)
                }
                var v = new l(function(e) {
                        a(o,
                            function(t) {
                                t.action(e)
                            })
                    },
                    n);
                a(f,
                    function(e) {
                        v.on("end", e)
                    }),
                    r(this, v)
            };
        b.MENTOR_CLASS = l,
            b.DefaultEasing = function(e) {
                return e
            },
            b.DefaultDur = 500,
            b.Sequence = !1,
            b.agentHooks = function() {
                return {
                    show: function(e, t) {
                        var n = 0,
                            r = t["__anim" + e];
                        return p(t) ? (n = s(t, e), r = typeof r == "undefined" ? s(t, e) : r) : (c(t), r = typeof r == "undefined" ? s(t, e) : r, o(t, e, 0)),
                            {
                                from: n,
                                to: r
                            }
                    },
                    hide: function(e, t) {
                        var n = s(t, e),
                            r = "__anim" + e,
                            i = t[r];
                        typeof i == "undefined" && (p(t) ? i = n: (c(t), i = s(t, e), h(t)), t[r] = i);
                        var u = function() {
                            h(t),
                                o(t, e, t[r])
                        };
                        return {
                            from: n,
                            to: 0,
                            callback: u
                        }
                    },
                    toggle: function(e, t) {
                        return p(t) ? b.agentHooks.hide.apply(this, arguments) : b.agentHooks.show.apply(this, arguments)
                    }
                }
            } (),
            QW.provide({
                ElAnim: b,
                ScrollAnim: b,
                ColorAnim: b
            })
    } (),
    function() {
        var e = {
            easeNone: function(e) {
                return e
            },
            easeIn: function(e) {
                return e * e
            },
            easeOut: function(e) {
                return e * (2 - e)
            },
            easeBoth: function(e) {
                return (e /= .5) < 1 ? .5 * e * e: -0.5 * (--e * (e - 2) - 1)
            },
            easeInStrong: function(e) {
                return e * e * e * e
            },
            easeOutStrong: function(e) {
                return - ((e -= 1) * e * e * e - 1)
            },
            easeBothStrong: function(e) {
                return (e /= .5) < 1 ? .5 * e * e * e * e: -0.5 * ((e -= 2) * e * e * e - 2)
            },
            elasticIn: function(e) {
                if (e == 0) return 0;
                if (e == 1) return 1;
                var t = .3,
                    n = t / 4;
                return - (Math.pow(2, 10 * (e -= 1)) * Math.sin((e - n) * 2 * Math.PI / t))
            },
            elasticOut: function(e) {
                if (e == 0) return 0;
                if (e == 1) return 1;
                var t = .3,
                    n = t / 4;
                return Math.pow(2, -10 * e) * Math.sin((e - n) * 2 * Math.PI / t) + 1
            },
            elasticBoth: function(e) {
                if (e == 0) return 0;
                if ((e /= .5) == 2) return 1;
                var t = .3 * 1.5,
                    n = t / 4;
                return e < 1 ? -0.5 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - n) * 2 * Math.PI / t) : Math.pow(2, -10 * (e -= 1)) * Math.sin((e - n) * 2 * Math.PI / t) * .5 + 1
            },
            backIn: function(e) {
                var t = 1.70158;
                return e * e * ((t + 1) * e - t)
            },
            backOut: function(e) {
                var t = 1.70158;
                return (e -= 1) * e * ((t + 1) * e + t) + 1
            },
            backBoth: function(e) {
                var t = 1.70158;
                return (e /= .5) < 1 ? .5 * e * e * (((t *= 1.525) + 1) * e - t) : .5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2)
            },
            bounceIn: function(t) {
                return 1 - e.bounceOut(1 - t)
            },
            bounceOut: function(e) {
                return e < 1 / 2.75 ? 7.5625 * e * e: e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
            },
            bounceBoth: function(t) {
                return t < .5 ? e.bounceIn(t * 2) * .5 : e.bounceOut(t * 2 - 1) * .5 + .5
            }
        };
        QW.provide("Easing", e)
    } (),
    function() {
        function s(e, n, r, i, s) {
            e = t(e),
                o.stop(e, !1, !1);
            var u = new QW.ElAnim(e, n, i || 400, s);
            return r && u.on("end",
                function() {
                    r.call(e, null)
                }),
                u.play(),
                e.__preAnim = u,
                u
        }
        var e = QW.NodeH,
            t = e.g,
            n = e.isVisible,
            r = QW.ObjectH.mix,
            i = "_animation",
            o = {
                animate: function(e, t, n, r, o, u) {
                    for (var a = arguments.length - 1; a > 0; a--) if (arguments[a] === !!arguments[a]) {
                        var f = arguments[a];
                        arguments[a] = null,
                            u = f;
                        break
                    }
                    if (!QW.Async || !u && !QW.ElAnim.Sequence) return s(e, t, r, n, o);
                    W(e).wait(i,
                        function() {
                            var u = s(e, t, r, n, o);
                            return u.on("end",
                                function() {
                                    W(e).signal(i)
                                }),
                                u
                        })
                },
                fadeIn: function(e, t, n, r, i) {
                    var s = {
                        opacity: "show"
                    };
                    return o.animate(e, s, t, n, r, i)
                },
                fadeOut: function(e, t, n, r, i) {
                    var s = {
                        opacity: "hide"
                    };
                    return o.animate(e, s, t, n, r, i)
                },
                fadeToggle: function(e, t, r, i, s) {
                    return o[n(e) ? "fadeOut": "fadeIn"](e, t, r, i, s)
                },
                slideUp: function(e, t, n, r, i) {
                    var s = {
                        height: "hide"
                    };
                    return o.animate(e, s, t, n, r, i)
                },
                slideDown: function(e, t, n, r, i) {
                    var s = {
                        height: "show"
                    };
                    return o.animate(e, s, t, n, r, i)
                },
                slideToggle: function(e, t, r, i, s) {
                    return o[n(e) ? "slideUp": "slideDown"](e, t, r, i, s)
                },
                shine4Error: function(e, t, n, r, i) {
                    var s = {
                        backgroundColor: {
                            from: "#f33",
                            to: "#fff",
                            end: ""
                        }
                    };
                    return o.animate(e, s, t, n, r, i)
                },
                stop: function(e, t, n) {
                    var r = e.__preAnim;
                    if (!r) return;
                    t && QW.Async && QW.AsyncH.clearSignals(e, i),
                        n ? r.end() : r.pause()
                }
            };
        QW.Async && r(o, {
            sleep: function(e, t, n) {
                return o.animate(e, {},
                    t, n, null, !0)
            }
        }),
            QW.NodeW.pluginHelper(o, "operator"),
        QW.Dom && r(QW.Dom, o)
    } ()