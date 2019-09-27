window.onload = function() {
    var picturePath="https://images.gitee.com/uploads/images/2019/0927/141750_60a30dc9_5016576.jpeg";//图片路径
    var multNum = 10;//显示放大图片倍数
    /**
     * 根据底数 计算指数
     * @param base 底数
     * @param pow pow值
     * @returns {number} 指数
     */
    var index = function(base,pow){
        if(pow < base){
            return 0;
        }
        var res = 1;
        pow = pow - pow%base;
        while(pow/base !=1){
            pow /=base;
            res++;
        }
        return res;
    };

    var img = new Image;
    img.src = picturePath;
    img.onload = function() {
        var pictureSize = img.width > img.height?img.height:img.width;
        var showSize = pictureSize*(multNum===0?1:multNum);
        var index2=index(2,pictureSize);
        console.log("load! pictureSize:"+pictureSize+",index:"+index2);
        var e = pictureSize,
            t =  [],
            n = W("#__CONTAINER_FOR_FUN");
        if (!n.length){
            console.error("Not find W(#__CONTAINER_FOR_FUN) !");
            return ! 1;
        }
        var r = function(n, r, i) {
                var s = 0,
                    o = 0,
                    u = 0,
                    a = r * n,
                    f = (r + 1) * n,
                    l = i * n,
                    c = (i + 1) * n;
                for (var h = a; h < f; h++) for (var p = l; p < c; p++) {
                    var d = t[h * e + p];
                    s += d[0],
                        o += d[1],
                        u += d[2]
                }
                var v = n * n;
                return "rgb(" + Math.round(s / v) + ", " + Math.round(o / v) + ", " + Math.round(u / v) + ")"
            },
            i = function(e, t, i, s, o) {
                var u = [],
                    a = Math.pow(2, e),
                    f = showSize / a,
                    l = e === 0 ? 1 : 2;
                for (var c = 0; c < l; c++) for (var h = 0; h < l; h++) {
                    var p = r(f / (showSize/pictureSize), o / f + c, s / f + h);
                    u.push('<div data-level="', e, '" data-size="', f, '" data-row="', c, '" data-col="', h, '" class="l', e, '" style="background:', p, ";top:", o + f * c, "px;left:", s + f * h, 'px;"></div>')
                }
                n.insertAdjacentHTML("beforeend", u.join(""))
            },
            s = document.createElement("canvas");
        //canvas尺寸默认尺寸为300*150，设置canvas尺寸
        s.setAttribute("width",pictureSize+"px");
        s.setAttribute("height",pictureSize+"px");
        // img = W("#__CONTAINER_FOR_IMG");
        // img.insertAdjacentElement("beforeend",s);
        if (s.getContext) {
            var o = s.getContext("2d"),
                u = new Image,
                a = [];
            for (var f = 0; f <= (index2); f++) {
                var l = showSize / Math.pow(2, f),
                    c = l / 2;
                a.push("div.l", f, " {position:absolute;width:", l, "px;height:", l, "px;border-radius:", c, "px;}")
            }
            Dom.insertCssText(a.join(""));
            var h = !1;
            n.delegate("div", "mouseenter",
                function(e) {
                    if (h) return ! 1;
                    h = !0;
                    var t = W(this),
                        n = t.attr("data-level") | 0,
                        r = t.attr("data-row") | 0,
                        s = t.attr("data-col") | 0,
                        o = parseInt(t.css("left")),
                        u = parseInt(t.css("top"));
                    if (n >= (index2)) return ! 1;
                    t.animate({
                            opacity: .5
                        },
                        150,
                        function() {
                            t.removeNode(),
                                i(n + 1, r, s, o, u)
                        })
                }).delegate("div", "mouseleave",
                function(e) {
                    h = !1
                }).css({
                width: showSize+"px",
                height: showSize+"px",
                position: "relative"
            }),
                u.onload = function() {
                    o.drawImage(u, 0, 0, pictureSize, pictureSize);
                    var n = o.getImageData(0, 0, e, e);
                    for (var r = 0; r < e * e * 4; r += 4) {
                        var s = n.data[r],
                            a = n.data[r + 1],
                            f = n.data[r + 2];
                        t.push([s, a, f])
                    }
                    console.log(t.length+",data:"+n.data.length);
                    i(0, 0, 0, 0, 0)
                },
                u.src = picturePath;
        } else n.css("color", "red").html("请使用支持Canvas(Chrome、Firefox、Safari、Opera、IE9+)的浏览器浏览本页!")
    }
}