! function(e) {
    "function" == typeof define && define.amd ? define([], e) : "undefined" != typeof module && null !== module && module.exports ? module.exports = e : e()
}(function() {
    function e(e) {
        return new CustomEvent(e, P)
    }

    function t(e) {
        return e[B] || (e[B] = {})
    }

    function n(e, n, i, o, a) {
        function c(e) {
            i(e, o)
        }
        n = n.split(O);
        for (var u, r = t(e), d = n.length; d--;)(r[u = n[d]] || (r[u] = [])).push([i, c]), e.addEventListener(u, c)
    }

    function i(e, n, i, o) {
        n = n.split(O);
        var a, c, u, r = t(e),
            d = n.length;
        if (r)
            for (; d--;)
                if (a = n[d], c = r[a])
                    for (u = c.length; u--;) c[u][0] === i && (e.removeEventListener(a, c[u][1]), c.splice(u, 1))
    }

    function o(t, n, i) {
        var o = e(n);
        i && L(o, i), t.dispatchEvent(o)
    }

    function a(e) {
        function t(e) {
            i ? (n(), C(t), o = !0, i = !1) : o = !1
        }
        var n = e,
            i = !1,
            o = !1;
        this.kick = function(e) {
            i = !0, o || t()
        }, this.end = function(e) {
            var t = n;
            e && (o ? (n = i ? function() {
                t(), e()
            } : e, i = !0) : e())
        }
    }

    function c() {}

    function u(e) {
        e.preventDefault()
    }

    function r(e) {
        return !!D[e.target.tagName.toLowerCase()]
    }

    function d(e) {
        return 1 === e.which && !e.ctrlKey && !e.altKey
    }

    function m(e, t) {
        var n, i;
        if (e.identifiedTouch) return e.identifiedTouch(t);
        for (n = -1, i = e.length; ++n < i;)
            if (e[n].identifier === t) return e[n]
    }

    function f(e, t) {
        var n = m(e.changedTouches, t.identifier);
        if (n && (n.pageX !== t.pageX || n.pageY !== t.pageY)) return n
    }

    function v(e) {
        d(e) && (r(e) || (n(document, N.move, s, e), n(document, N.cancel, l, e)))
    }

    function s(e, t) {
        y(e, t, e, g)
    }

    function l(e, t) {
        g()
    }

    function g() {
        i(document, N.move, s), i(document, N.cancel, l)
    }

    function p(e) {
        if (!D[e.target.tagName.toLowerCase()]) {
            var t = e.changedTouches[0],
                i = {
                    target: t.target,
                    pageX: t.pageX,
                    pageY: t.pageY,
                    identifier: t.identifier,
                    touchmove: function(e, t) {
                        h(e, t)
                    },
                    touchend: function(e, t) {
                        X(e, t)
                    }
                };
            n(document, z.move, i.touchmove, i), n(document, z.cancel, i.touchend, i)
        }
    }

    function h(e, t) {
        var n = f(e, t);
        n && y(e, t, n, Y)
    }

    function X(e, t) {
        m(e.changedTouches, t.identifier) && Y(t)
    }

    function Y(e) {
        i(document, z.move, e.touchmove), i(document, z.cancel, e.touchend)
    }

    function y(e, t, n, i) {
        var o = n.pageX - t.pageX,
            a = n.pageY - t.pageY;
        o * o + a * a < R * R || w(e, t, n, o, a, i)
    }

    function w(e, t, n, i, a, u) {
        var r = e.targetTouches,
            d = e.timeStamp - t.timeStamp,
            m = {
                altKey: e.altKey,
                ctrlKey: e.ctrlKey,
                shiftKey: e.shiftKey,
                startX: t.pageX,
                startY: t.pageY,
                distX: i,
                distY: a,
                deltaX: i,
                deltaY: a,
                pageX: n.pageX,
                pageY: n.pageY,
                velocityX: i / d,
                velocityY: a / d,
                identifier: t.identifier,
                targetTouches: r,
                finger: r ? r.length : 1,
                enableMove: function() {
                    this.moveEnabled = !0, this.enableMove = c, e.preventDefault()
                }
            };
        o(t.target, "movestart", m), u(t)
    }

    function T(e, t) {
        var n = t.timer;
        t.touch = e, t.timeStamp = e.timeStamp, n.kick()
    }

    function b(e, t) {
        var n = t.target,
            o = t.event,
            a = t.timer;
        S(), Q(n, o, a, function() {
            setTimeout(function() {
                i(n, "click", u)
            }, 0)
        })
    }

    function S() {
        i(document, N.move, T), i(document, N.end, b)
    }

    function k(e, t) {
        var n = t.event,
            i = t.timer,
            o = f(e, n);
        o && (e.preventDefault(), n.targetTouches = e.targetTouches, t.touch = o, t.timeStamp = e.timeStamp, i.kick())
    }

    function K(e, t) {
        var n = t.target,
            i = t.event,
            o = t.timer;
        m(e.changedTouches, i.identifier) && (j(t), Q(n, i, o))
    }

    function j(e) {
        i(document, z.move, e.activeTouchmove), i(document, z.end, e.activeTouchend)
    }

    function E(e, t, n) {
        var i = n - e.timeStamp;
        e.distX = t.pageX - e.startX, e.distY = t.pageY - e.startY, e.deltaX = t.pageX - e.pageX, e.deltaY = t.pageY - e.pageY, e.velocityX = .3 * e.velocityX + .7 * e.deltaX / i, e.velocityY = .3 * e.velocityY + .7 * e.deltaY / i, e.pageX = t.pageX, e.pageY = t.pageY
    }

    function Q(e, t, n, i) {
        n.end(function() {
            return o(e, "moveend", t), i && i()
        })
    }

    function q(e) {
        function t(e) {
            E(i, c.touch, c.timeStamp), o(c.target, "move", i)
        }
        if (!e.defaultPrevented && e.moveEnabled) {
            var i = {
                    startX: e.startX,
                    startY: e.startY,
                    pageX: e.pageX,
                    pageY: e.pageY,
                    distX: e.distX,
                    distY: e.distY,
                    deltaX: e.deltaX,
                    deltaY: e.deltaY,
                    velocityX: e.velocityX,
                    velocityY: e.velocityY,
                    identifier: e.identifier,
                    targetTouches: e.targetTouches,
                    finger: e.finger
                },
                c = {
                    target: e.target,
                    event: i,
                    timer: new a(t),
                    touch: void 0,
                    timeStamp: e.timeStamp
                };
            void 0 === e.identifier ? (n(e.target, "click", u), n(document, N.move, T, c), n(document, N.end, b, c)) : (c.activeTouchmove = function(e, t) {
                k(e, t)
            }, c.activeTouchend = function(e, t) {
                K(e, t)
            }, n(document, z.move, c.activeTouchmove, c), n(document, z.end, c.activeTouchend, c))
        }
    }

    function A(e) {
        e.enableMove()
    }

    function F(e) {
        e.enableMove()
    }

    function M(e) {
        e.enableMove()
    }

    function x(e) {
        var t = e.handler;
        e.handler = function(e) {
            for (var n, i = G.length; i--;) e[n = G[i]] = e.originalEvent[n];
            t.apply(this, arguments)
        }
    }
    var L = Object.assign || window.jQuery && jQuery.extend,
        R = 8,
        C = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e, t) {
                return window.setTimeout(function() {
                    e()
                }, 25)
            }
        }(),
        D = {
            textarea: !0,
            input: !0,
            select: !0,
            button: !0
        },
        N = {
            move: "mousemove",
            cancel: "mouseup dragstart",
            end: "mouseup"
        },
        z = {
            move: "touchmove",
            cancel: "touchend",
            end: "touchend"
        },
        O = /\s+/,
        P = {
            bubbles: !0,
            cancelable: !0
        },
        B = Symbol("events");
    if (n(document, "mousedown", v), n(document, "touchstart", p), n(document, "movestart", q), window.jQuery) {
        var G = "startX startY pageX pageY distX distY deltaX deltaY velocityX velocityY".split(" ");
        jQuery.event.special.movestart = {
            setup: function() {
                return n(this, "movestart", A), !1
            },
            teardown: function() {
                return i(this, "movestart", A), !1
            },
            add: x
        }, jQuery.event.special.move = {
            setup: function() {
                return n(this, "movestart", F), !1
            },
            teardown: function() {
                return i(this, "movestart", F), !1
            },
            add: x
        }, jQuery.event.special.moveend = {
            setup: function() {
                return n(this, "movestart", M), !1
            },
            teardown: function() {
                return i(this, "movestart", M), !1
            },
            add: x
        }
    }
});