/*
 * ScrollToFixed
 * https://github.com/bigspotteddog/ScrollToFixed
 *
 * Copyright (c) 2011 Joseph Cava-Lynch
 * MIT license
 */
(function(a) {
    a.isScrollToFixed = function(b) {
        return !!a(b).data("ScrollToFixed")
    };
    a.ScrollToFixed = function(d, i) {
        var m = this;
        m.$el = a(d);
        m.el = d;
        m.$el.data("ScrollToFixed", m);
        var c = false;
        var H = m.$el;
        var I;
        var F;
        var k;
        var e;
        var z;
        var E = 0;
        var r = 0;
        var j = -1;
        var f = -1;
        var u = null;
        var A;
        var g;

        function v() {
            H.trigger("preUnfixed.ScrollToFixed");
            l();
            H.trigger("unfixed.ScrollToFixed");
            f = -1;
            E = H.offset().top;
            r = H.offset().left;
            if (m.options.offsets) {
                r += (H.offset().left - H.position().left)
            }
            if (j == -1) {
                j = r
            }
            I = H.css("position");
            c = true;
            if (m.options.bottom != -1) {
                H.trigger("preFixed.ScrollToFixed");
                x();
                H.trigger("fixed.ScrollToFixed")
            }
        }

        function o() {
            var J = m.options.limit;
            if (!J) {
                return 0
            }
            if (typeof(J) === "function") {
                return J.apply(H)
            }
            return J
        }

        function q() {
            return I === "fixed"
        }

        function y() {
            return I === "absolute"
        }

        function h() {
            return !(q() || y())
        }

        function x() {
            if (!q()) {
                var J = H[0].getBoundingClientRect();
                u.css({
                    display: H.css("display"),
                    width: J.width,
                    height: J.height,
                    "float": H.css("float")
                });
                cssOptions = {
                    "z-index": m.options.zIndex,
                    position: "fixed",
                    top: m.options.bottom == -1 ? t() : "",
                    bottom: m.options.bottom == -1 ? "" : m.options.bottom,
                    "margin-left": "0px"
                };
                if (!m.options.dontSetWidth) {
                    cssOptions.width = H.css("width")
                }
                H.css(cssOptions);
                H.addClass(m.options.baseClassName);
                if (m.options.className) {
                    H.addClass(m.options.className)
                }
                I = "fixed"
            }
        }

        function b() {
            var K = o();
            var J = r;
            if (m.options.removeOffsets) {
                J = "";
                K = K - E
            }
            cssOptions = {
                position: "absolute",
                top: K,
                left: J,
                "margin-left": "0px",
                bottom: ""
            };
            if (!m.options.dontSetWidth) {
                cssOptions.width = H.css("width")
            }
            H.css(cssOptions);
            I = "absolute"
        }

        function l() {
            if (!h()) {
                f = -1;
                u.css("display", "none");
                H.css({
                    "z-index": z,
                    width: "",
                    position: F,
                    left: "",
                    top: e,
                    "margin-left": ""
                });
                H.removeClass("scroll-to-fixed-fixed");
                if (m.options.className) {
                    H.removeClass(m.options.className)
                }
                I = null
            }
        }

        function w(J) {
            if (J != f) {
                H.css("left", r - J);
                f = J
            }
        }

        function t() {
            var J = m.options.marginTop;
            if (!J) {
                return 0
            }
            if (typeof(J) === "function") {
                return J.apply(H)
            }
            return J
        }

        function B() {
            if (!a.isScrollToFixed(H) || H.is(":hidden")) {
                return
            }
            var M = c;
            var L = h();
            if (!c) {
                v()
            } else {
                if (h()) {
                    E = H.offset().top;
                    r = H.offset().left
                }
            }
            var J = a(window).scrollLeft();
            var N = a(window).scrollTop();
            var K = o();
            if (m.options.minWidth && a(window).width() < m.options.minWidth) {
                if (!h() || !M) {
                    p();
                    H.trigger("preUnfixed.ScrollToFixed");
                    l();
                    H.trigger("unfixed.ScrollToFixed")
                }
            } else {
                if (m.options.maxWidth && a(window).width() > m.options.maxWidth) {
                    if (!h() || !M) {
                        p();
                        H.trigger("preUnfixed.ScrollToFixed");
                        l();
                        H.trigger("unfixed.ScrollToFixed")
                    }
                } else {
                    if (m.options.bottom == -1) {
                        if (K > 0 && N >= K - t()) {
                            if (!L && (!y() || !M)) {
                                p();
                                H.trigger("preAbsolute.ScrollToFixed");
                                b();
                                H.trigger("unfixed.ScrollToFixed")
                            }
                        } else {
                            if (N >= E - t()) {
                                if (!q() || !M) {
                                    p();
                                    H.trigger("preFixed.ScrollToFixed");
                                    x();
                                    f = -1;
                                    H.trigger("fixed.ScrollToFixed")
                                }
                                w(J)
                            } else {
                                if (!h() || !M) {
                                    p();
                                    H.trigger("preUnfixed.ScrollToFixed");
                                    l();
                                    H.trigger("unfixed.ScrollToFixed")
                                }
                            }
                        }
                    } else {
                        if (K > 0) {
                            if (N + a(window).height() - H.outerHeight(true) >= K - (t() || -n())) {
                                if (q()) {
                                    p();
                                    H.trigger("preUnfixed.ScrollToFixed");
                                    if (F === "absolute") {
                                        b()
                                    } else {
                                        l()
                                    }
                                    H.trigger("unfixed.ScrollToFixed")
                                }
                            } else {
                                if (!q()) {
                                    p();
                                    H.trigger("preFixed.ScrollToFixed");
                                    x()
                                }
                                w(J);
                                H.trigger("fixed.ScrollToFixed")
                            }
                        } else {
                            w(J)
                        }
                    }
                }
            }
        }

        function n() {
            if (!m.options.bottom) {
                return 0
            }
            return m.options.bottom
        }

        function p() {
            var J = H.css("position");
            if (J == "absolute") {
                H.trigger("postAbsolute.ScrollToFixed")
            } else {
                if (J == "fixed") {
                    H.trigger("postFixed.ScrollToFixed")
                } else {
                    H.trigger("postUnfixed.ScrollToFixed")
                }
            }
        }
        var D = function(J) {
            if (H.is(":visible")) {
                c = false;
                B()
            } else {
                l()
            }
        };
        var G = function(J) {
            (!!window.requestAnimationFrame) ? requestAnimationFrame(B): B()
        };
        var C = function() {
            var K = document.body;
            if (document.createElement && K && K.appendChild && K.removeChild) {
                var M = document.createElement("div");
                if (!M.getBoundingClientRect) {
                    return null
                }
                M.innerHTML = "x";
                M.style.cssText = "position:fixed;top:100px;";
                K.appendChild(M);
                var N = K.style.height,
                    O = K.scrollTop;
                K.style.height = "3000px";
                K.scrollTop = 500;
                var J = M.getBoundingClientRect().top;
                K.style.height = N;
                var L = (J === 100);
                K.removeChild(M);
                K.scrollTop = O;
                return L
            }
            return null
        };
        var s = function(J) {
            J = J || window.event;
            if (J.preventDefault) {
                J.preventDefault()
            }
            J.returnValue = false
        };
        m.init = function() {
            m.options = a.extend({}, a.ScrollToFixed.defaultOptions, i);
            z = H.css("z-index");
            m.$el.css("z-index", m.options.zIndex);
            u = a("<div />");
            I = H.css("position");
            F = H.css("position");
            k = H.css("float");
            e = H.css("top");
            if (h()) {
                m.$el.after(u)
            }
            a(window).bind("resize.ScrollToFixed", D);
            a(window).bind("scroll.ScrollToFixed", G);
            if ("ontouchmove" in window) {
                a(window).bind("touchmove.ScrollToFixed", B)
            }
            if (m.options.preFixed) {
                H.bind("preFixed.ScrollToFixed", m.options.preFixed)
            }
            if (m.options.postFixed) {
                H.bind("postFixed.ScrollToFixed", m.options.postFixed)
            }
            if (m.options.preUnfixed) {
                H.bind("preUnfixed.ScrollToFixed", m.options.preUnfixed)
            }
            if (m.options.postUnfixed) {
                H.bind("postUnfixed.ScrollToFixed", m.options.postUnfixed)
            }
            if (m.options.preAbsolute) {
                H.bind("preAbsolute.ScrollToFixed", m.options.preAbsolute)
            }
            if (m.options.postAbsolute) {
                H.bind("postAbsolute.ScrollToFixed", m.options.postAbsolute)
            }
            if (m.options.fixed) {
                H.bind("fixed.ScrollToFixed", m.options.fixed)
            }
            if (m.options.unfixed) {
                H.bind("unfixed.ScrollToFixed", m.options.unfixed)
            }
            if (m.options.spacerClass) {
                u.addClass(m.options.spacerClass)
            }
            H.bind("resize.ScrollToFixed", function() {
                u.height(H.height())
            });
            H.bind("scroll.ScrollToFixed", function() {
                H.trigger("preUnfixed.ScrollToFixed");
                l();
                H.trigger("unfixed.ScrollToFixed");
                B()
            });
            H.bind("detach.ScrollToFixed", function(J) {
                s(J);
                H.trigger("preUnfixed.ScrollToFixed");
                l();
                H.trigger("unfixed.ScrollToFixed");
                a(window).unbind("resize.ScrollToFixed", D);
                a(window).unbind("scroll.ScrollToFixed", G);
                H.unbind(".ScrollToFixed");
                u.remove();
                m.$el.removeData("ScrollToFixed")
            });
            D()
        };
        m.init()
    };
    a.ScrollToFixed.defaultOptions = {
        marginTop: 0,
        limit: 0,
        bottom: -1,
        zIndex: 1000,
        baseClassName: "scroll-to-fixed-fixed"
    };
    a.fn.scrollToFixed = function(b) {
        return this.each(function() {
            (new a.ScrollToFixed(this, b))
        })
    }
})(jQuery);