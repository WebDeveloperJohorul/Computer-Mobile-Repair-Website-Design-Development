! function(t) {
    t.fn.twentytwenty = function(e) {
        var e = t.extend({
            default_offset_pct: .5,
            orientation: "horizontal",
            before_label: "Before",
            after_label: "After",
            no_overlay: !1
        }, e);
        return this.each(function() {
            var n = e.default_offset_pct,
                a = t(this),
                i = e.orientation,
                s = "vertical" === i ? "down" : "left",
                r = "vertical" === i ? "up" : "right";
            a.wrap("<div class='twentytwenty-wrapper twentytwenty-" + i + "'></div>"), e.no_overlay || a.append("<div class='twentytwenty-overlay'></div>");
            var d = a.find("img:first"),
                c = a.find("img:last");
            a.append("<div class='twentytwenty-handle'></div>");
            var l = a.find(".twentytwenty-handle");
            l.append("<span class='twentytwenty-" + s + "-arrow'></span>"), l.append("<span class='twentytwenty-" + r + "-arrow'></span>"), a.addClass("twentytwenty-container"), d.addClass("twentytwenty-before"), c.addClass("twentytwenty-after");
            var o = a.find(".twentytwenty-overlay");
            o.append("<div class='twentytwenty-before-label' data-content='" + e.before_label + "'></div>"), o.append("<div class='twentytwenty-after-label' data-content='" + e.after_label + "'></div>");
            var w = function(t) {
                    var e = d.width(),
                        n = d.height();
                    return {
                        w: e + "px",
                        h: n + "px",
                        cw: t * e + "px",
                        ch: t * n + "px"
                    }
                },
                f = function(t) {
                    "vertical" === i ? (d.css("clip", "rect(0," + t.w + "," + t.ch + ",0)"), c.css("clip", "rect(" + t.ch + "," + t.w + "," + t.h + ",0)")) : (d.css("clip", "rect(0," + t.cw + "," + t.h + ",0)"), c.css("clip", "rect(0," + t.w + "," + t.h + "," + t.cw + ")")), a.css("height", t.h)
                },
                v = function(t) {
                    var e = w(t);
                    l.css("vertical" === i ? "top" : "left", "vertical" === i ? e.ch : e.cw), f(e)
                };
            t(window).on("resize.twentytwenty", function(t) {
                v(n)
            });
            var p = 0,
                y = 0,
                h = 0,
                u = 0;
            l.on("movestart", function(t) {
                (t.distX > t.distY && t.distX < -t.distY || t.distX < t.distY && t.distX > -t.distY) && "vertical" !== i ? t.preventDefault() : (t.distX < t.distY && t.distX < -t.distY || t.distX > t.distY && t.distX > -t.distY) && "vertical" === i && t.preventDefault(), a.addClass("active"), p = a.offset().left, y = a.offset().top, h = d.width(), u = d.height()
            }), l.on("moveend", function(t) {
                a.removeClass("active")
            }), l.on("move", function(t) {
                a.hasClass("active") && ((n = "vertical" === i ? (t.pageY - y) / u : (t.pageX - p) / h) < 0 && (n = 0), n > 1 && (n = 1), v(n))
            }), a.find("img").on("mousedown", function(t) {
                t.preventDefault()
            }), t(window).trigger("resize.twentytwenty")
        })
    }
}(jQuery);