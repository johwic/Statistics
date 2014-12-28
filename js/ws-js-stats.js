if (!document.createElement("canvas").getContext) {
    (function() {
        var m = Math;
        var mr = m.round;
        var ms = m.sin;
        var mc = m.cos;
        var abs = m.abs;
        var sqrt = m.sqrt;
        var Z = 10;
        var Z2 = Z / 2;
        var IE_VERSION = +navigator.userAgent.match(/MSIE ([\d.]+)?/)[1];

        function getContext() {
            return this.context_ || (this.context_ = new CanvasRenderingContext2D_(this));
        }
        var slice = Array.prototype.slice;

        function bind(f, obj, var_args) {
            var a = slice.call(arguments, 2);
            return function() {
                return f.apply(obj, a.concat(slice.call(arguments)));
            };
        }

        function encodeHtmlAttribute(s) {
            return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
        }

        function addNamespace(doc, prefix, urn) {
            if (!doc.namespaces[prefix]) {
                doc.namespaces.add(prefix, urn, "#default#VML");
            }
        }

        function addNamespacesAndStylesheet(doc) {
            addNamespace(doc, "g_vml_", "urn:schemas-microsoft-com:vml");
            addNamespace(doc, "g_o_", "urn:schemas-microsoft-com:office:office");
            if (!doc.styleSheets["ex_canvas_"]) {
                var ss = doc.createStyleSheet();
                ss.owningElement.id = "ex_canvas_";
                ss.cssText = "canvas{display:inline-block;overflow:hidden;" + "text-align:left;width:300px;height:150px}";
            }
        }
        addNamespacesAndStylesheet(document);
        var G_vmlCanvasManager_ = {
            init: function(opt_doc) {
                var doc = opt_doc || document;
                doc.createElement("canvas");
                doc.attachEvent("onreadystatechange", bind(this.init_, this, doc));
            },
            init_: function(doc) {
                var els = doc.getElementsByTagName("canvas");
                for (var i = 0; i < els.length; i++) {
                    this.initElement(els[i]);
                }
            },
            initElement: function(el) {
                if (!el.getContext) {
                    el.getContext = getContext;
                    addNamespacesAndStylesheet(el.ownerDocument);
                    el.innerHTML = "";
                    el.attachEvent("onpropertychange", onPropertyChange);
                    el.attachEvent("onresize", onResize);
                    var attrs = el.attributes;
                    if (attrs.width && attrs.width.specified) {
                        el.style.width = attrs.width.nodeValue + "px";
                    } else {
                        el.width = el.clientWidth;
                    }
                    if (attrs.height && attrs.height.specified) {
                        el.style.height = attrs.height.nodeValue + "px";
                    } else {
                        el.height = el.clientHeight;
                    }
                }
                return el;
            }
        };

        function onPropertyChange(e) {
            var el = e.srcElement;
            switch (e.propertyName) {
                case "width":
                    el.getContext().clearRect();
                    el.style.width = el.attributes.width.nodeValue + "px";
                    el.firstChild.style.width = el.clientWidth + "px";
                    break;
                case "height":
                    el.getContext().clearRect();
                    el.style.height = el.attributes.height.nodeValue + "px";
                    el.firstChild.style.height = el.clientHeight + "px";
                    break;
            }
        }

        function onResize(e) {
            var el = e.srcElement;
            if (el.firstChild) {
                el.firstChild.style.width = el.clientWidth + "px";
                el.firstChild.style.height = el.clientHeight + "px";
            }
        }
        G_vmlCanvasManager_.init();
        var decToHex = [];
        for (var i = 0; i < 16; i++) {
            for (var j = 0; j < 16; j++) {
                decToHex[i * 16 + j] = i.toString(16) + j.toString(16);
            }
        }

        function createMatrixIdentity() {
            return [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ];
        }

        function matrixMultiply(m1, m2) {
            var result = createMatrixIdentity();
            for (var x = 0; x < 3; x++) {
                for (var y = 0; y < 3; y++) {
                    var sum = 0;
                    for (var z = 0; z < 3; z++) {
                        sum += m1[x][z] * m2[z][y];
                    }
                    result[x][y] = sum;
                }
            }
            return result;
        }

        function copyState(o1, o2) {
            o2.fillStyle = o1.fillStyle;
            o2.lineCap = o1.lineCap;
            o2.lineJoin = o1.lineJoin;
            o2.lineWidth = o1.lineWidth;
            o2.miterLimit = o1.miterLimit;
            o2.shadowBlur = o1.shadowBlur;
            o2.shadowColor = o1.shadowColor;
            o2.shadowOffsetX = o1.shadowOffsetX;
            o2.shadowOffsetY = o1.shadowOffsetY;
            o2.strokeStyle = o1.strokeStyle;
            o2.globalAlpha = o1.globalAlpha;
            o2.font = o1.font;
            o2.textAlign = o1.textAlign;
            o2.textBaseline = o1.textBaseline;
            o2.arcScaleX_ = o1.arcScaleX_;
            o2.arcScaleY_ = o1.arcScaleY_;
            o2.lineScale_ = o1.lineScale_;
        }
        var colorData = {
            aliceblue: "#F0F8FF",
            antiquewhite: "#FAEBD7",
            aquamarine: "#7FFFD4",
            azure: "#F0FFFF",
            beige: "#F5F5DC",
            bisque: "#FFE4C4",
            black: "#000000",
            blanchedalmond: "#FFEBCD",
            blueviolet: "#8A2BE2",
            brown: "#A52A2A",
            burlywood: "#DEB887",
            cadetblue: "#5F9EA0",
            chartreuse: "#7FFF00",
            chocolate: "#D2691E",
            coral: "#FF7F50",
            cornflowerblue: "#6495ED",
            cornsilk: "#FFF8DC",
            crimson: "#DC143C",
            cyan: "#00FFFF",
            darkblue: "#00008B",
            darkcyan: "#008B8B",
            darkgoldenrod: "#B8860B",
            darkgray: "#A9A9A9",
            darkgreen: "#006400",
            darkgrey: "#A9A9A9",
            darkkhaki: "#BDB76B",
            darkmagenta: "#8B008B",
            darkolivegreen: "#556B2F",
            darkorange: "#FF8C00",
            darkorchid: "#9932CC",
            darkred: "#8B0000",
            darksalmon: "#E9967A",
            darkseagreen: "#8FBC8F",
            darkslateblue: "#483D8B",
            darkslategray: "#2F4F4F",
            darkslategrey: "#2F4F4F",
            darkturquoise: "#00CED1",
            darkviolet: "#9400D3",
            deeppink: "#FF1493",
            deepskyblue: "#00BFFF",
            dimgray: "#696969",
            dimgrey: "#696969",
            dodgerblue: "#1E90FF",
            firebrick: "#B22222",
            floralwhite: "#FFFAF0",
            forestgreen: "#228B22",
            gainsboro: "#DCDCDC",
            ghostwhite: "#F8F8FF",
            gold: "#FFD700",
            goldenrod: "#DAA520",
            grey: "#808080",
            greenyellow: "#ADFF2F",
            honeydew: "#F0FFF0",
            hotpink: "#FF69B4",
            indianred: "#CD5C5C",
            indigo: "#4B0082",
            ivory: "#FFFFF0",
            khaki: "#F0E68C",
            lavender: "#E6E6FA",
            lavenderblush: "#FFF0F5",
            lawngreen: "#7CFC00",
            lemonchiffon: "#FFFACD",
            lightblue: "#ADD8E6",
            lightcoral: "#F08080",
            lightcyan: "#E0FFFF",
            lightgoldenrodyellow: "#FAFAD2",
            lightgreen: "#90EE90",
            lightgrey: "#D3D3D3",
            lightpink: "#FFB6C1",
            lightsalmon: "#FFA07A",
            lightseagreen: "#20B2AA",
            lightskyblue: "#87CEFA",
            lightslategray: "#778899",
            lightslategrey: "#778899",
            lightsteelblue: "#B0C4DE",
            lightyellow: "#FFFFE0",
            limegreen: "#32CD32",
            linen: "#FAF0E6",
            magenta: "#FF00FF",
            mediumaquamarine: "#66CDAA",
            mediumblue: "#0000CD",
            mediumorchid: "#BA55D3",
            mediumpurple: "#9370DB",
            mediumseagreen: "#3CB371",
            mediumslateblue: "#7B68EE",
            mediumspringgreen: "#00FA9A",
            mediumturquoise: "#48D1CC",
            mediumvioletred: "#C71585",
            midnightblue: "#191970",
            mintcream: "#F5FFFA",
            mistyrose: "#FFE4E1",
            moccasin: "#FFE4B5",
            navajowhite: "#FFDEAD",
            oldlace: "#FDF5E6",
            olivedrab: "#6B8E23",
            orange: "#FFA500",
            orangered: "#FF4500",
            orchid: "#DA70D6",
            palegoldenrod: "#EEE8AA",
            palegreen: "#98FB98",
            paleturquoise: "#AFEEEE",
            palevioletred: "#DB7093",
            papayawhip: "#FFEFD5",
            peachpuff: "#FFDAB9",
            peru: "#CD853F",
            pink: "#FFC0CB",
            plum: "#DDA0DD",
            powderblue: "#B0E0E6",
            rosybrown: "#BC8F8F",
            royalblue: "#4169E1",
            saddlebrown: "#8B4513",
            salmon: "#FA8072",
            sandybrown: "#F4A460",
            seagreen: "#2E8B57",
            seashell: "#FFF5EE",
            sienna: "#A0522D",
            skyblue: "#87CEEB",
            slateblue: "#6A5ACD",
            slategray: "#708090",
            slategrey: "#708090",
            snow: "#FFFAFA",
            springgreen: "#00FF7F",
            steelblue: "#4682B4",
            tan: "#D2B48C",
            thistle: "#D8BFD8",
            tomato: "#FF6347",
            turquoise: "#40E0D0",
            violet: "#EE82EE",
            wheat: "#F5DEB3",
            whitesmoke: "#F5F5F5",
            yellowgreen: "#9ACD32"
        };

        function getRgbHslContent(styleString) {
            var start = styleString.indexOf("(", 3);
            var end = styleString.indexOf(")", start + 1);
            var parts = styleString.substring(start + 1, end).split(",");
            if (parts.length != 4 || styleString.charAt(3) != "a") {
                parts[3] = 1;
            }
            return parts;
        }

        function percent(s) {
            return parseFloat(s) / 100;
        }

        function clamp(v, min, max) {
            return Math.min(max, Math.max(min, v));
        }

        function hslToRgb(parts) {
            var r, g, b, h, s, l;
            h = parseFloat(parts[0]) / 360 % 360;
            if (h < 0) {
                h++;
            }
            s = clamp(percent(parts[1]), 0, 1);
            l = clamp(percent(parts[2]), 0, 1);
            if (s == 0) {
                r = g = b = l;
            } else {
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hueToRgb(p, q, h + 1 / 3);
                g = hueToRgb(p, q, h);
                b = hueToRgb(p, q, h - 1 / 3);
            }
            return "#" + decToHex[Math.floor(r * 255)] + decToHex[Math.floor(g * 255)] + decToHex[Math.floor(b * 255)];
        }

        function hueToRgb(m1, m2, h) {
            if (h < 0) {
                h++;
            }
            if (h > 1) {
                h--;
            }
            if (6 * h < 1) {
                return m1 + (m2 - m1) * 6 * h;
            } else {
                if (2 * h < 1) {
                    return m2;
                } else {
                    if (3 * h < 2) {
                        return m1 + (m2 - m1) * (2 / 3 - h) * 6;
                    } else {
                        return m1;
                    }
                }
            }
        }
        var processStyleCache = {};

        function processStyle(styleString) {
            if (styleString in processStyleCache) {
                return processStyleCache[styleString];
            }
            var str, alpha = 1;
            styleString = String(styleString);
            if (styleString.charAt(0) == "#") {
                str = styleString;
            } else {
                if (/^rgb/.test(styleString)) {
                    var parts = getRgbHslContent(styleString);
                    var str = "#",
                        n;
                    for (var i = 0; i < 3; i++) {
                        if (parts[i].indexOf("%") != -1) {
                            n = Math.floor(percent(parts[i]) * 255);
                        } else {
                            n = +parts[i];
                        }
                        str += decToHex[clamp(n, 0, 255)];
                    }
                    alpha = +parts[3];
                } else {
                    if (/^hsl/.test(styleString)) {
                        var parts = getRgbHslContent(styleString);
                        str = hslToRgb(parts);
                        alpha = parts[3];
                    } else {
                        str = colorData[styleString] || styleString;
                    }
                }
            }
            return processStyleCache[styleString] = {
                color: str,
                alpha: alpha
            };
        }
        var DEFAULT_STYLE = {
            style: "normal",
            variant: "normal",
            weight: "normal",
            size: 10,
            family: "sans-serif"
        };
        var fontStyleCache = {};

        function processFontStyle(styleString) {
            if (fontStyleCache[styleString]) {
                return fontStyleCache[styleString];
            }
            var el = document.createElement("div");
            var style = el.style;
            try {
                style.font = styleString;
            } catch (ex) {}
            return fontStyleCache[styleString] = {
                style: style.fontStyle || DEFAULT_STYLE.style,
                variant: style.fontVariant || DEFAULT_STYLE.variant,
                weight: style.fontWeight || DEFAULT_STYLE.weight,
                size: style.fontSize || DEFAULT_STYLE.size,
                family: style.fontFamily || DEFAULT_STYLE.family
            };
        }

        function getComputedStyle(style, element) {
            var computedStyle = {};
            for (var p in style) {
                computedStyle[p] = style[p];
            }
            var canvasFontSize = parseFloat(element.currentStyle.fontSize),
                fontSize = parseFloat(style.size);
            if (typeof style.size == "number") {
                computedStyle.size = style.size;
            } else {
                if (style.size.indexOf("px") != -1) {
                    computedStyle.size = fontSize;
                } else {
                    if (style.size.indexOf("em") != -1) {
                        computedStyle.size = canvasFontSize * fontSize;
                    } else {
                        if (style.size.indexOf("%") != -1) {
                            computedStyle.size = (canvasFontSize / 100) * fontSize;
                        } else {
                            if (style.size.indexOf("pt") != -1) {
                                computedStyle.size = fontSize / 0.75;
                            } else {
                                computedStyle.size = canvasFontSize;
                            }
                        }
                    }
                }
            }
            computedStyle.size *= 0.981;
            return computedStyle;
        }

        function buildStyle(style) {
            return style.style + " " + style.variant + " " + style.weight + " " + style.size + "px " + style.family;
        }
        var lineCapMap = {
            "butt": "flat",
            "round": "round"
        };

        function processLineCap(lineCap) {
            return lineCapMap[lineCap] || "square";
        }

        function CanvasRenderingContext2D_(canvasElement) {
            this.m_ = createMatrixIdentity();
            this.mStack_ = [];
            this.aStack_ = [];
            this.currentPath_ = [];
            this.strokeStyle = "#000";
            this.fillStyle = "#000";
            this.lineWidth = 1;
            this.lineJoin = "miter";
            this.lineCap = "butt";
            this.miterLimit = Z * 1;
            this.globalAlpha = 1;
            this.font = "10px sans-serif";
            this.textAlign = "left";
            this.textBaseline = "alphabetic";
            this.canvas = canvasElement;
            var cssText = "width:" + $(canvasElement).attr("width") + "px;height:" + $(canvasElement).attr("height") + "px;overflow:hidden;position:absolute";
            var el = canvasElement.ownerDocument.createElement("div");
            el.style.cssText = cssText;
            canvasElement.appendChild(el);
            var overlayEl = el.cloneNode(false);
            overlayEl.style.backgroundColor = "red";
            overlayEl.style.filter = "alpha(opacity=0)";
            this.element_ = el;
            this.arcScaleX_ = 1;
            this.arcScaleY_ = 1;
            this.lineScale_ = 1;
        }
        var contextPrototype = CanvasRenderingContext2D_.prototype;
        contextPrototype.clearRect = function() {
            if (this.textMeasureEl_) {
                this.textMeasureEl_.removeNode(true);
                this.textMeasureEl_ = null;
            }
            this.element_.innerHTML = "";
        };
        contextPrototype.beginPath = function() {
            this.currentPath_ = [];
        };
        contextPrototype.moveTo = function(aX, aY) {
            var p = getCoords(this, aX, aY);
            this.currentPath_.push({
                type: "moveTo",
                x: p.x,
                y: p.y
            });
            this.currentX_ = p.x;
            this.currentY_ = p.y;
        };
        contextPrototype.lineTo = function(aX, aY) {
            var p = getCoords(this, aX, aY);
            this.currentPath_.push({
                type: "lineTo",
                x: p.x,
                y: p.y
            });
            this.currentX_ = p.x;
            this.currentY_ = p.y;
        };
        contextPrototype.bezierCurveTo = function(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY) {
            var p = getCoords(this, aX, aY);
            var cp1 = getCoords(this, aCP1x, aCP1y);
            var cp2 = getCoords(this, aCP2x, aCP2y);
            bezierCurveTo(this, cp1, cp2, p);
        };

        function bezierCurveTo(self, cp1, cp2, p) {
            self.currentPath_.push({
                type: "bezierCurveTo",
                cp1x: cp1.x,
                cp1y: cp1.y,
                cp2x: cp2.x,
                cp2y: cp2.y,
                x: p.x,
                y: p.y
            });
            self.currentX_ = p.x;
            self.currentY_ = p.y;
        }
        contextPrototype.quadraticCurveTo = function(aCPx, aCPy, aX, aY) {
            var cp = getCoords(this, aCPx, aCPy);
            var p = getCoords(this, aX, aY);
            var cp1 = {
                x: this.currentX_ + 2 / 3 * (cp.x - this.currentX_),
                y: this.currentY_ + 2 / 3 * (cp.y - this.currentY_)
            };
            var cp2 = {
                x: cp1.x + (p.x - this.currentX_) / 3,
                y: cp1.y + (p.y - this.currentY_) / 3
            };
            bezierCurveTo(this, cp1, cp2, p);
        };
        contextPrototype.arc = function(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
            aRadius *= Z;
            var arcType = aClockwise ? "at" : "wa";
            var xStart = aX + mc(aStartAngle) * aRadius - Z2;
            var yStart = aY + ms(aStartAngle) * aRadius - Z2;
            var xEnd = aX + mc(aEndAngle) * aRadius - Z2;
            var yEnd = aY + ms(aEndAngle) * aRadius - Z2;
            if (xStart == xEnd && !aClockwise) {
                xStart += 0.125;
            }
            var p = getCoords(this, aX, aY);
            var pStart = getCoords(this, xStart, yStart);
            var pEnd = getCoords(this, xEnd, yEnd);
            this.currentPath_.push({
                type: arcType,
                x: p.x,
                y: p.y,
                radius: aRadius,
                xStart: pStart.x,
                yStart: pStart.y,
                xEnd: pEnd.x,
                yEnd: pEnd.y
            });
        };
        contextPrototype.rect = function(aX, aY, aWidth, aHeight) {
            this.moveTo(aX, aY);
            this.lineTo(aX + aWidth, aY);
            this.lineTo(aX + aWidth, aY + aHeight);
            this.lineTo(aX, aY + aHeight);
            this.closePath();
        };
        contextPrototype.strokeRect = function(aX, aY, aWidth, aHeight) {
            var oldPath = this.currentPath_;
            this.beginPath();
            this.moveTo(aX, aY);
            this.lineTo(aX + aWidth, aY);
            this.lineTo(aX + aWidth, aY + aHeight);
            this.lineTo(aX, aY + aHeight);
            this.closePath();
            this.stroke();
            this.currentPath_ = oldPath;
        };
        contextPrototype.fillRect = function(aX, aY, aWidth, aHeight) {
            var oldPath = this.currentPath_;
            this.beginPath();
            this.moveTo(aX, aY);
            this.lineTo(aX + aWidth, aY);
            this.lineTo(aX + aWidth, aY + aHeight);
            this.lineTo(aX, aY + aHeight);
            this.closePath();
            this.fill();
            this.currentPath_ = oldPath;
        };
        contextPrototype.createLinearGradient = function(aX0, aY0, aX1, aY1) {
            var gradient = new CanvasGradient_("gradient");
            gradient.x0_ = aX0;
            gradient.y0_ = aY0;
            gradient.x1_ = aX1;
            gradient.y1_ = aY1;
            return gradient;
        };
        contextPrototype.createRadialGradient = function(aX0, aY0, aR0, aX1, aY1, aR1) {
            var gradient = new CanvasGradient_("gradientradial");
            gradient.x0_ = aX0;
            gradient.y0_ = aY0;
            gradient.r0_ = aR0;
            gradient.x1_ = aX1;
            gradient.y1_ = aY1;
            gradient.r1_ = aR1;
            return gradient;
        };
        contextPrototype.drawImage = function(image, var_args) {
            var dx, dy, dw, dh, sx, sy, sw, sh;
            var oldRuntimeWidth = image.runtimeStyle.width;
            var oldRuntimeHeight = image.runtimeStyle.height;
            image.runtimeStyle.width = "auto";
            image.runtimeStyle.height = "auto";
            var w = image.width;
            var h = image.height;
            image.runtimeStyle.width = oldRuntimeWidth;
            image.runtimeStyle.height = oldRuntimeHeight;
            if (arguments.length == 3) {
                dx = arguments[1];
                dy = arguments[2];
                sx = sy = 0;
                sw = dw = w;
                sh = dh = h;
            } else {
                if (arguments.length == 5) {
                    dx = arguments[1];
                    dy = arguments[2];
                    dw = arguments[3];
                    dh = arguments[4];
                    sx = sy = 0;
                    sw = w;
                    sh = h;
                } else {
                    if (arguments.length == 9) {
                        sx = arguments[1];
                        sy = arguments[2];
                        sw = arguments[3];
                        sh = arguments[4];
                        dx = arguments[5];
                        dy = arguments[6];
                        dw = arguments[7];
                        dh = arguments[8];
                    } else {
                        throw Error("Invalid number of arguments");
                    }
                }
            }
            var d = getCoords(this, dx, dy);
            var w2 = sw / 2;
            var h2 = sh / 2;
            var vmlStr = [];
            var W = 10;
            var H = 10;
            vmlStr.push(" <g_vml_:group", ' coordsize="', Z * W, ",", Z * H, '"', ' coordorigin="0,0"', ' style="width:', W, "px;height:", H, "px;position:absolute;");
            if (this.m_[0][0] != 1 || this.m_[0][1] || this.m_[1][1] != 1 || this.m_[1][0]) {
                var filter = [];
                filter.push("M11=", this.m_[0][0], ",", "M12=", this.m_[1][0], ",", "M21=", this.m_[0][1], ",", "M22=", this.m_[1][1], ",", "Dx=", mr(d.x / Z), ",", "Dy=", mr(d.y / Z), "");
                var max = d;
                var c2 = getCoords(this, dx + dw, dy);
                var c3 = getCoords(this, dx, dy + dh);
                var c4 = getCoords(this, dx + dw, dy + dh);
                max.x = m.max(max.x, c2.x, c3.x, c4.x);
                max.y = m.max(max.y, c2.y, c3.y, c4.y);
                vmlStr.push("padding:0 ", mr(max.x / Z), "px ", mr(max.y / Z), "px 0;filter:progid:DXImageTransform.Microsoft.Matrix(", filter.join(""), ", sizingmethod='clip');");
            } else {
                vmlStr.push("top:", mr(d.y / Z), "px;left:", mr(d.x / Z), "px;");
            }
            vmlStr.push(' ">', '<g_vml_:image src="', image.src, '"', ' style="width:', Z * dw, "px;", " height:", Z * dh, 'px"', ' cropleft="', sx / w, '"', ' croptop="', sy / h, '"', ' cropright="', (w - sx - sw) / w, '"', ' cropbottom="', (h - sy - sh) / h, '"', " />", "</g_vml_:group>");
            this.element_.insertAdjacentHTML("BeforeEnd", vmlStr.join(""));
        };
        contextPrototype.stroke = function(aFill) {
            var lineStr = [];
            var lineOpen = false;
            var W = 10;
            var H = 10;
            lineStr.push("<g_vml_:shape", ' filled="', !!aFill, '"', ' style="position:absolute;width:', W, "px;height:", H, 'px;"', ' coordorigin="0,0"', ' coordsize="', Z * W, ",", Z * H, '"', ' stroked="', !aFill, '"', ' path="');
            var newSeq = false;
            var min = {
                x: null,
                y: null
            };
            var max = {
                x: null,
                y: null
            };
            for (var i = 0; i < this.currentPath_.length; i++) {
                var p = this.currentPath_[i];
                var c;
                switch (p.type) {
                    case "moveTo":
                        c = p;
                        lineStr.push(" m ", mr(p.x), ",", mr(p.y));
                        break;
                    case "lineTo":
                        lineStr.push(" l ", mr(p.x), ",", mr(p.y));
                        break;
                    case "close":
                        lineStr.push(" x ");
                        p = null;
                        break;
                    case "bezierCurveTo":
                        lineStr.push(" c ", mr(p.cp1x), ",", mr(p.cp1y), ",", mr(p.cp2x), ",", mr(p.cp2y), ",", mr(p.x), ",", mr(p.y));
                        break;
                    case "at":
                    case "wa":
                        lineStr.push(" ", p.type, " ", mr(p.x - this.arcScaleX_ * p.radius), ",", mr(p.y - this.arcScaleY_ * p.radius), " ", mr(p.x + this.arcScaleX_ * p.radius), ",", mr(p.y + this.arcScaleY_ * p.radius), " ", mr(p.xStart), ",", mr(p.yStart), " ", mr(p.xEnd), ",", mr(p.yEnd));
                        break;
                }
                if (p) {
                    if (min.x == null || p.x < min.x) {
                        min.x = p.x;
                    }
                    if (max.x == null || p.x > max.x) {
                        max.x = p.x;
                    }
                    if (min.y == null || p.y < min.y) {
                        min.y = p.y;
                    }
                    if (max.y == null || p.y > max.y) {
                        max.y = p.y;
                    }
                }
            }
            lineStr.push(' ">');
            if (!aFill) {
                appendStroke(this, lineStr);
            } else {
                appendFill(this, lineStr, min, max);
            }
            lineStr.push("</g_vml_:shape>");
            this.element_.insertAdjacentHTML("beforeEnd", lineStr.join(""));
        };

        function appendStroke(ctx, lineStr) {
            var a = processStyle(ctx.strokeStyle);
            var color = a.color;
            var opacity = a.alpha * ctx.globalAlpha;
            var lineWidth = ctx.lineScale_ * ctx.lineWidth;
            if (lineWidth < 1) {
                opacity *= lineWidth;
            }
            lineStr.push("<g_vml_:stroke", ' opacity="', opacity, '"', ' joinstyle="', ctx.lineJoin, '"', ' miterlimit="', ctx.miterLimit, '"', ' endcap="', processLineCap(ctx.lineCap), '"', ' weight="', lineWidth, 'px"', ' color="', color, '" />');
        }

        function appendFill(ctx, lineStr, min, max) {
            var fillStyle = ctx.fillStyle;
            var arcScaleX = ctx.arcScaleX_;
            var arcScaleY = ctx.arcScaleY_;
            var width = max.x - min.x;
            var height = max.y - min.y;
            if (fillStyle instanceof CanvasGradient_) {
                var angle = 0;
                var focus = {
                    x: 0,
                    y: 0
                };
                var shift = 0;
                var expansion = 1;
                if (fillStyle.type_ == "gradient") {
                    var x0 = fillStyle.x0_ / arcScaleX;
                    var y0 = fillStyle.y0_ / arcScaleY;
                    var x1 = fillStyle.x1_ / arcScaleX;
                    var y1 = fillStyle.y1_ / arcScaleY;
                    var p0 = getCoords(ctx, x0, y0);
                    var p1 = getCoords(ctx, x1, y1);
                    var dx = p1.x - p0.x;
                    var dy = p1.y - p0.y;
                    angle = Math.atan2(dx, dy) * 180 / Math.PI;
                    if (angle < 0) {
                        angle += 360;
                    }
                    if (angle < 0.000001) {
                        angle = 0;
                    }
                } else {
                    var p0 = getCoords(ctx, fillStyle.x0_, fillStyle.y0_);
                    focus = {
                        x: (p0.x - min.x) / width,
                        y: (p0.y - min.y) / height
                    };
                    width /= arcScaleX * Z;
                    height /= arcScaleY * Z;
                    var dimension = m.max(width, height);
                    shift = 2 * fillStyle.r0_ / dimension;
                    expansion = 2 * fillStyle.r1_ / dimension - shift;
                }
                var stops = fillStyle.colors_;
                stops.sort(function(cs1, cs2) {
                    return cs1.offset - cs2.offset;
                });
                var length = stops.length;
                var color1 = stops[0].color;
                var color2 = stops[length - 1].color;
                var opacity1 = stops[0].alpha * ctx.globalAlpha;
                var opacity2 = stops[length - 1].alpha * ctx.globalAlpha;
                var colors = [];
                for (var i = 0; i < length; i++) {
                    var stop = stops[i];
                    colors.push(stop.offset * expansion + shift + " " + stop.color);
                }
                lineStr.push('<g_vml_:fill type="', fillStyle.type_, '"', ' method="none" focus="100%"', ' color="', color1, '"', ' color2="', color2, '"', ' colors="', colors.join(","), '"', ' opacity="', opacity2, '"', ' g_o_:opacity2="', opacity1, '"', ' angle="', angle, '"', ' focusposition="', focus.x, ",", focus.y, '" />');
            } else {
                if (fillStyle instanceof CanvasPattern_) {
                    if (width && height) {
                        var deltaLeft = -min.x;
                        var deltaTop = -min.y;
                        lineStr.push("<g_vml_:fill", ' position="', deltaLeft / width * arcScaleX * arcScaleX, ",", deltaTop / height * arcScaleY * arcScaleY, '"', ' type="tile"', ' src="', fillStyle.src_, '" />');
                    }
                } else {
                    var a = processStyle(ctx.fillStyle);
                    var color = a.color;
                    var opacity = a.alpha * ctx.globalAlpha;
                    lineStr.push('<g_vml_:fill color="', color, '" opacity="', opacity, '" />');
                }
            }
        }
        contextPrototype.fill = function() {
            this.stroke(true);
        };
        contextPrototype.closePath = function() {
            this.currentPath_.push({
                type: "close"
            });
        };

        function getCoords(ctx, aX, aY) {
            var m = ctx.m_;
            return {
                x: Z * (aX * m[0][0] + aY * m[1][0] + m[2][0]) - Z2,
                y: Z * (aX * m[0][1] + aY * m[1][1] + m[2][1]) - Z2
            };
        }
        contextPrototype.save = function() {
            var o = {};
            copyState(this, o);
            this.aStack_.push(o);
            this.mStack_.push(this.m_);
            this.m_ = matrixMultiply(createMatrixIdentity(), this.m_);
        };
        contextPrototype.restore = function() {
            if (this.aStack_.length) {
                copyState(this.aStack_.pop(), this);
                this.m_ = this.mStack_.pop();
            }
        };

        function matrixIsFinite(m) {
            return isFinite(m[0][0]) && isFinite(m[0][1]) && isFinite(m[1][0]) && isFinite(m[1][1]) && isFinite(m[2][0]) && isFinite(m[2][1]);
        }

        function setM(ctx, m, updateLineScale) {
            if (!matrixIsFinite(m)) {
                return;
            }
            ctx.m_ = m;
            if (updateLineScale) {
                var det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
                ctx.lineScale_ = sqrt(abs(det));
            }
        }
        contextPrototype.translate = function(aX, aY) {
            var m1 = [
                [1, 0, 0],
                [0, 1, 0],
                [aX, aY, 1]
            ];
            setM(this, matrixMultiply(m1, this.m_), false);
        };
        contextPrototype.rotate = function(aRot) {
            var c = mc(aRot);
            var s = ms(aRot);
            var m1 = [
                [c, s, 0],
                [-s, c, 0],
                [0, 0, 1]
            ];
            setM(this, matrixMultiply(m1, this.m_), false);
        };
        contextPrototype.scale = function(aX, aY) {
            this.arcScaleX_ *= aX;
            this.arcScaleY_ *= aY;
            var m1 = [
                [aX, 0, 0],
                [0, aY, 0],
                [0, 0, 1]
            ];
            setM(this, matrixMultiply(m1, this.m_), true);
        };
        contextPrototype.transform = function(m11, m12, m21, m22, dx, dy) {
            var m1 = [
                [m11, m12, 0],
                [m21, m22, 0],
                [dx, dy, 1]
            ];
            setM(this, matrixMultiply(m1, this.m_), true);
        };
        contextPrototype.setTransform = function(m11, m12, m21, m22, dx, dy) {
            var m = [
                [m11, m12, 0],
                [m21, m22, 0],
                [dx, dy, 1]
            ];
            setM(this, m, true);
        };
        contextPrototype.drawText_ = function(text, x, y, maxWidth, stroke) {
            var m = this.m_,
                delta = 1000,
                left = 0,
                right = delta,
                offset = {
                    x: 0,
                    y: 0
                },
                lineStr = [];
            var fontStyle = getComputedStyle(processFontStyle(this.font), this.element_);
            var fontStyleString = buildStyle(fontStyle);
            var elementStyle = this.element_.currentStyle;
            var textAlign = this.textAlign.toLowerCase();
            switch (textAlign) {
                case "left":
                case "center":
                case "right":
                    break;
                case "end":
                    textAlign = elementStyle.direction == "ltr" ? "right" : "left";
                    break;
                case "start":
                    textAlign = elementStyle.direction == "rtl" ? "right" : "left";
                    break;
                default:
                    textAlign = "left";
            }
            switch (this.textBaseline) {
                case "hanging":
                case "top":
                    offset.y = fontStyle.size / 1.75;
                    break;
                case "middle":
                    break;
                default:
                case null:
                case "alphabetic":
                case "ideographic":
                case "bottom":
                    offset.y = -fontStyle.size / 2.25;
                    break;
            }
            switch (textAlign) {
                case "right":
                    left = delta;
                    right = 0.05;
                    break;
                case "center":
                    left = right = delta / 2;
                    break;
            }
            var d = getCoords(this, x + offset.x, y + offset.y);
            lineStr.push('<g_vml_:line from="', -left, ' 0" to="', right, ' 0.05" ', ' coordsize="100 100" coordorigin="0 0"', ' filled="', !stroke, '" stroked="', !!stroke, '" style="position:absolute;width:1px;height:1px;">');
            if (stroke) {
                appendStroke(this, lineStr);
            } else {
                appendFill(this, lineStr, {
                    x: -left,
                    y: 0
                }, {
                    x: right,
                    y: fontStyle.size
                });
            }
            var skewM = m[0][0].toFixed(3) + "," + m[1][0].toFixed(3) + "," + m[0][1].toFixed(3) + "," + m[1][1].toFixed(3) + ",0,0";
            var skewOffset = mr(d.x / Z) + "," + mr(d.y / Z);
            lineStr.push('<g_vml_:skew on="t" matrix="', skewM, '" ', ' offset="', skewOffset, '" origin="', left, ' 0" />', '<g_vml_:path textpathok="true" />', '<g_vml_:textpath on="true" string="', encodeHtmlAttribute(text), '" style="v-text-align:', textAlign, ";font:", encodeHtmlAttribute(fontStyleString), '" /></g_vml_:line>');
            this.element_.insertAdjacentHTML("beforeEnd", lineStr.join(""));
        };
        contextPrototype.fillText = function(text, x, y, maxWidth) {
            this.drawText_(text, x, y, maxWidth, false);
        };
        contextPrototype.strokeText = function(text, x, y, maxWidth) {
            this.drawText_(text, x, y, maxWidth, true);
        };
        contextPrototype.measureText = function(text) {
            if (!this.textMeasureEl_) {
                var s = '<span style="position:absolute;' + "top:-20000px;left:0;padding:0;margin:0;border:none;" + 'white-space:pre;"></span>';
                this.element_.insertAdjacentHTML("beforeEnd", s);
                this.textMeasureEl_ = this.element_.lastChild;
            }
            var doc = this.element_.ownerDocument;
            this.textMeasureEl_.innerHTML = "";
            this.textMeasureEl_.style.font = this.font;
            this.textMeasureEl_.appendChild(doc.createTextNode(text));
            return {
                width: this.textMeasureEl_.offsetWidth
            };
        };
        contextPrototype.clip = function() {};
        contextPrototype.arcTo = function() {};
        contextPrototype.createPattern = function(image, repetition) {
            return new CanvasPattern_(image, repetition);
        };

        function CanvasGradient_(aType) {
            this.type_ = aType;
            this.x0_ = 0;
            this.y0_ = 0;
            this.r0_ = 0;
            this.x1_ = 0;
            this.y1_ = 0;
            this.r1_ = 0;
            this.colors_ = [];
        }
        CanvasGradient_.prototype.addColorStop = function(aOffset, aColor) {
            aColor = processStyle(aColor);
            this.colors_.push({
                offset: aOffset,
                color: aColor.color,
                alpha: aColor.alpha
            });
        };

        function CanvasPattern_(image, repetition) {
            assertImageIsValid(image);
            switch (repetition) {
                case "repeat":
                case null:
                case "":
                    this.repetition_ = "repeat";
                    break;
                case "repeat-x":
                case "repeat-y":
                case "no-repeat":
                    this.repetition_ = repetition;
                    break;
                default:
                    throwException("SYNTAX_ERR");
            }
            this.src_ = image.src;
            this.width_ = image.width;
            this.height_ = image.height;
        }

        function throwException(s) {
            throw new DOMException_(s);
        }

        function assertImageIsValid(img) {
            if (!img || img.nodeType != 1 || img.tagName != "IMG") {
                throwException("TYPE_MISMATCH_ERR");
            }
            if (img.readyState != "complete") {
                throwException("INVALID_STATE_ERR");
            }
        }

        function DOMException_(s) {
            this.code = this[s];
            this.message = s + ": DOM Exception " + this.code;
        }
        var p = DOMException_.prototype = new Error;
        p.INDEX_SIZE_ERR = 1;
        p.DOMSTRING_SIZE_ERR = 2;
        p.HIERARCHY_REQUEST_ERR = 3;
        p.WRONG_DOCUMENT_ERR = 4;
        p.INVALID_CHARACTER_ERR = 5;
        p.NO_DATA_ALLOWED_ERR = 6;
        p.NO_MODIFICATION_ALLOWED_ERR = 7;
        p.NOT_FOUND_ERR = 8;
        p.NOT_SUPPORTED_ERR = 9;
        p.INUSE_ATTRIBUTE_ERR = 10;
        p.INVALID_STATE_ERR = 11;
        p.SYNTAX_ERR = 12;
        p.INVALID_MODIFICATION_ERR = 13;
        p.NAMESPACE_ERR = 14;
        p.INVALID_ACCESS_ERR = 15;
        p.VALIDATION_ERR = 16;
        p.TYPE_MISMATCH_ERR = 17;
        G_vmlCanvasManager = G_vmlCanvasManager_;
        CanvasRenderingContext2D = CanvasRenderingContext2D_;
        CanvasGradient = CanvasGradient_;
        CanvasPattern = CanvasPattern_;
        DOMException = DOMException_;
    })();
}(function() {
    var undefined, doc = document,
        win = window,
        math = Math,
        mathRound = math.round,
        mathFloor = math.floor,
        mathMax = math.max,
        mathAbs = math.abs,
        mathCos = math.cos,
        mathSin = math.sin,
        userAgent = navigator.userAgent,
        isIE = /msie/i.test(userAgent) && !win.opera,
        isWebKit = /AppleWebKit/.test(userAgent),
        styleTag, canvasCounter = 0,
        colorCounter, symbolCounter, symbolSizes = {},
        idCounter = 0,
        timeFactor = 1,
        garbageBin, DIV = "div",
        ABSOLUTE = "absolute",
        RELATIVE = "relative",
        HIDDEN = "hidden",
        HIGHCHARTS_HIDDEN = "highcharts-" + HIDDEN,
        VISIBLE = "visible",
        PX = "px",
        makeTime, getMinutes, getHours, getDay, getDate, getMonth, getFullYear, setMinutes, setHours, setDate, setMonth, setFullYear, globalAdapter = win.HighchartsAdapter,
        adapter = globalAdapter || {},
        each = adapter.each,
        grep = adapter.grep,
        map = adapter.map,
        merge = adapter.merge,
        hyphenate = adapter.hyphenate,
        addEvent = adapter.addEvent,
        fireEvent = adapter.fireEvent,
        animate = adapter.animate,
        getAjax = adapter.getAjax,
        seriesTypes = {};
    if (!globalAdapter && win.jQuery) {
        var jQ = jQuery;
        each = function(arr, fn) {
            for (var i = 0, len = arr.length; i < len; i++) {
                if (fn.call(arr[i], arr[i], i, arr) === false) {
                    return i;
                }
            }
        };
        grep = jQ.grep;
        map = function(arr, fn) {
            var results = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                results[i] = fn.call(arr[i], arr[i], i, arr);
            }
            return results;
        };
        merge = function() {
            var args = arguments;
            return jQ.extend(true, null, args[0], args[1], args[2], args[3]);
        };
        hyphenate = function(str) {
            return str.replace(/([A-Z])/g, function(a, b) {
                return "-" + b.toLowerCase();
            });
        };
        addEvent = function(el, event, fn) {
            jQ(el).bind(event, fn);
        };
        fireEvent = function(el, type, eventArguments, defaultFunction) {
            var event = jQ.Event(type),
                detachedType = "detached" + type;
            extend(event, eventArguments);
            if (el[type]) {
                el[detachedType] = el[type];
                el[type] = null;
            }
            jQ(el).trigger(event);
            if (el[detachedType]) {
                el[type] = el[detachedType];
                el[detachedType] = null;
            }
            if (defaultFunction && !event.isDefaultPrevented()) {
                defaultFunction(event);
            }
        };
        animate = function(el, params, options) {
            jQ(el).animate(params, options);
        };
        getAjax = function(url, callback) {
            jQ.get(url, null, callback);
        };
        jQ.extend(jQ.easing, {
            easeOutQuad: function(x, t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            }
        });
    } else {
        if (!globalAdapter && win.MooTools) {
            each = $each;
            map = function(arr, fn) {
                return arr.map(fn);
            };
            grep = function(arr, fn) {
                return arr.filter(fn);
            };
            merge = $merge;
            hyphenate = function(str) {
                return str.hyphenate();
            };
            addEvent = function(el, type, fn) {
                if (!el.addEvent) {
                    if (el.nodeName) {
                        el = $(el);
                    } else {
                        extend(el, new Events());
                    }
                }
                el.addEvent(type, fn);
            };
            fireEvent = function(el, event, eventArguments, defaultFunction) {
                event = new Event({
                    type: event,
                    target: el
                });
                event = extend(event, eventArguments);
                event.preventDefault = function() {
                    defaultFunction = null;
                };
                if (el.fireEvent) {
                    el.fireEvent(event.type, event);
                }
                if (defaultFunction) {
                    defaultFunction(event);
                }
            };
            animate = function(el, params, options) {
                var myEffect = new Fx.Morph($(el), extend(options, {
                    transition: Fx.Transitions.Quad.easeInOut
                }));
                myEffect.start(params);
            };
            getAjax = function(url, callback) {
                (new Request({
                    url: url,
                    method: "get",
                    onSuccess: callback
                })).send();
            };
        }
    }

    function splat(obj) {
        if (!obj || obj.constructor != Array) {
            obj = [obj];
        }
        return obj;
    }

    function defined(obj) {
        return obj !== undefined && obj !== null;
    }

    function pick() {
        var args = arguments,
            i, arg;
        for (i = 0; i < args.length; i++) {
            arg = args[i];
            if (defined(arg)) {
                return arg;
            }
        }
    }

    function addCSSRule(selector, declaration, print) {
        var key, serialized = "",
            styleSheets, last, media = print ? "print" : "",
            createStyleTag = function(print) {
                return createElement("style", {
                    type: "text/css",
                    media: print ? "print" : ""
                }, null, doc.getElementsByTagName("HEAD")[0]);
            };
        if (!styleTag) {
            styleTag = createStyleTag();
        }
        for (key in declaration) {
            serialized += hyphenate(key) + ":" + declaration[key] + ";";
        }
        if (!isIE) {
            styleTag.appendChild(doc.createTextNode(selector + " {" + serialized + "}\n"));
        } else {
            var styleSheets = doc.styleSheets,
                index, styleSheet;
            if (print) {
                createStyleTag(true);
            }
            index = styleSheets.length - 1;
            while (index >= 1 && styleSheets[index].media != media) {
                index--;
            }
            styleSheet = styleSheets[index];
            styleSheet.addRule(selector, serialized);
        }
    }

    function extend(a, b) {
        if (!a) {
            a = {};
        }
        for (var n in b) {
            a[n] = b[n];
        }
        return a;
    }

    function setOptions(options) {
        defaultOptions = merge(defaultOptions, options);
        setTimeMethods();
        return defaultOptions;
    }

    function discardElement(element) {
        if (!garbageBin) {
            garbageBin = createElement(DIV);
        }
        if (element) {
            garbageBin.appendChild(element);
        }
        garbageBin.innerHTML = "";
    }
    var defaultFont = 'normal 12px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
        defaultLabelOptions = {
            enabled: true,
            align: "center",
            x: 0,
            y: 15,
            style: {
                color: "#666",
                font: defaultFont.replace("12px", "11px")
            }
        },
        defaultOptions = {
            colors: ["#4572A7", "#AA4643", "#89A54E", "#80699B", "#3D96AE", "#DB843D", "#92A8CD", "#A47D7C", "#B5CA92"],
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                decimalPoint: ".",
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: ","
            },
            global: {
                useUTC: true
            },
            chart: {
                margin: [50, 50, 60, 80],
                borderColor: "#4572A7",
                borderRadius: 5,
                defaultSeriesType: "line",
                ignoreHiddenSeries: true,
                plotBorderColor: "#C0C0C0"
            },
            title: {
                text: "Chart title",
                style: {
                    textAlign: "center",
                    color: "#3E576F",
                    font: defaultFont.replace("12px", "16px"),
                    margin: "10px 0 0 0"
                }
            },
            subtitle: {
                text: "",
                style: {
                    textAlign: "center",
                    color: "#6D869F",
                    font: defaultFont,
                    margin: 0
                }
            },
            plotOptions: {
                line: {
                    allowPointSelect: false,
                    showCheckbox: false,
                    animation: true,
                    events: {},
                    lineWidth: 2,
                    shadow: true,
                    marker: {
                        enabled: true,
                        symbol: "auto",
                        lineWidth: 0,
                        radius: 4,
                        lineColor: "#FFFFFF",
                        fillColor: "auto",
                        states: {
                            hover: {},
                            select: {
                                fillColor: "#FFFFFF",
                                lineColor: "auto",
                                lineWidth: 2
                            }
                        }
                    },
                    point: {
                        events: {}
                    },
                    dataLabels: merge(defaultLabelOptions, {
                        enabled: false,
                        y: -6,
                        formatter: function() {
                            return this.y;
                        }
                    }),
                    showInLegend: true,
                    states: {
                        hover: {
                            lineWidth: 3,
                            marker: {}
                        },
                        select: {
                            marker: {}
                        }
                    }
                }
            },
            labels: {
                style: {
                    position: ABSOLUTE,
                    color: "#3E576F",
                    font: defaultFont
                }
            },
            legend: {
                enabled: true,
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name;
                },
                borderColor: "#909090",
                borderRadius: 5,
                shadow: true,
                style: {
                    bottom: "10px",
                    left: "80px",
                    padding: "5px"
                },
                itemStyle: {
                    listStyle: "none",
                    margin: 0,
                    padding: "0 2em 0 0",
                    font: defaultFont,
                    cursor: "pointer",
                    color: "#3E576F",
                    position: RELATIVE
                },
                itemHoverStyle: {
                    color: "#000"
                },
                itemHiddenStyle: {
                    color: "#CCC"
                },
                itemCheckboxStyle: {
                    position: ABSOLUTE,
                    right: 0
                },
                symbolWidth: 16,
                symbolPadding: 5
            },
            loading: {
                hideDuration: 100,
                labelStyle: {
                    font: defaultFont.replace("normal", "bold"),
                    position: RELATIVE,
                    top: "1em"
                },
                showDuration: 100,
                style: {
                    position: ABSOLUTE,
                    backgroundColor: "white",
                    opacity: 0.5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: true,
                formatter: function() {
                    var pThis = this,
                        series = pThis.series,
                        xAxis = series.xAxis,
                        x = pThis.x;
                    return "<b>" + (pThis.point.name || series.name) + "</b><br/>" + (defined(x) ? "X value: " + (xAxis && xAxis.options.type == "datetime" ? dateFormat(null, x) : x) + "<br/>" : "") + "Y value: " + pThis.y;
                },
                backgroundColor: "rgba(255, 255, 255, .85)",
                borderWidth: 2,
                borderRadius: 5,
                shadow: true,
                snap: 10,
                style: {
                    color: "#333333",
                    font: defaultFont,
                    fontSize: "9pt",
                    padding: "5px",
                    whiteSpace: "nowrap"
                }
            },
            toolbar: {
                itemStyle: {
                    color: "#4572A7",
                    cursor: "pointer",
                    margin: "20px",
                    font: defaultFont
                }
            },
            credits: {
                enabled: true,
                text: "Highcharts.com",
                href: "http://www.highcharts.com",
                style: {
                    position: ABSOLUTE,
                    right: "10px",
                    bottom: "5px",
                    color: "#999",
                    textDecoration: "none",
                    font: defaultFont.replace("12px", "10px")
                },
                target: "_self"
            }
        };
    var defaultXAxisOptions = {
            dateTimeLabelFormats: {
                second: "%H:%M:%S",
                minute: "%H:%M",
                hour: "%H:%M",
                day: "%e. %b",
                week: "%e. %b",
                month: "%b '%y",
                year: "%Y"
            },
            endOnTick: false,
            gridLineColor: "#C0C0C0",
            labels: defaultLabelOptions,
            lineColor: "#C0D0E0",
            lineWidth: 1,
            max: null,
            min: null,
            maxZoom: null,
            minorGridLineColor: "#E0E0E0",
            minorGridLineWidth: 1,
            minorTickColor: "#A0A0A0",
            minorTickLength: 2,
            minorTickPosition: "outside",
            minorTickWidth: 1,
            showFirstLabel: true,
            showLastLabel: false,
            startOfWeek: 1,
            startOnTick: false,
            tickColor: "#C0D0E0",
            tickInterval: "auto",
            tickLength: 5,
            tickmarkPlacement: "between",
            tickPixelInterval: 100,
            tickPosition: "outside",
            tickWidth: 1,
            title: {
                enabled: false,
                text: "X-values",
                align: "middle",
                margin: 35,
                style: {
                    color: "#6D869F",
                    font: defaultFont.replace("normal", "bold")
                }
            },
            type: "linear"
        },
        defaultYAxisOptions = merge(defaultXAxisOptions, {
            endOnTick: true,
            gridLineWidth: 1,
            tickPixelInterval: 72,
            showLastLabel: true,
            labels: {
                align: "right",
                x: -8,
                y: 3
            },
            lineWidth: 0,
            maxPadding: 0.05,
            minPadding: 0.05,
            startOnTick: true,
            tickWidth: 0,
            title: {
                enabled: true,
                margin: 40,
                rotation: 270,
                text: "Y-values"
            }
        }),
        defaultLeftAxisOptions = {
            labels: {
                align: "right",
                x: -8,
                y: 3
            },
            title: {
                rotation: 270
            }
        },
        defaultRightAxisOptions = {
            labels: {
                align: "left",
                x: 8,
                y: 3
            },
            title: {
                rotation: 90
            }
        },
        defaultBottomAxisOptions = {
            labels: {
                align: "center",
                x: 0,
                y: 14
            },
            title: {
                rotation: 0
            }
        },
        defaultTopAxisOptions = merge(defaultBottomAxisOptions, {
            labels: {
                y: -5
            }
        });
    var defaultPlotOptions = defaultOptions.plotOptions,
        defaultSeriesOptions = defaultPlotOptions.line;
    defaultPlotOptions.spline = merge(defaultSeriesOptions);
    defaultPlotOptions.scatter = merge(defaultSeriesOptions, {
        lineWidth: 0,
        states: {
            hover: {
                lineWidth: 0
            }
        }
    });
    defaultPlotOptions.area = merge(defaultSeriesOptions, {
        fillColor: "auto"
    });
    defaultPlotOptions.areaspline = merge(defaultPlotOptions.area);
    defaultPlotOptions.column = merge(defaultSeriesOptions, {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 0,
        groupPadding: 0.2,
        pointPadding: 0.1,
        minPointLength: 0,
        states: {
            hover: {
                brightness: 0.1,
                shadow: false
            },
            select: {
                color: "#C0C0C0",
                borderColor: "#000000",
                shadow: false
            }
        }
    });
    defaultPlotOptions.bar = merge(defaultPlotOptions.column, {
        dataLabels: {
            align: "left",
            x: 5,
            y: 0
        }
    });
    defaultPlotOptions.pie = merge(defaultSeriesOptions, {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        center: ["50%", "50%"],
        legendType: "point",
        size: "90%",
        slicedOffset: 10,
        states: {
            hover: {
                brightness: 0.1,
                shadow: false
            }
        }
    });
    setTimeMethods();

    function extendClass(parent, members) {
        var object = function() {};
        object.prototype = new parent();
        extend(object.prototype, members);
        return object;
    }

    function setColor(val, ctx) {
        if (typeof val == "string") {
            return val;
        } else {
            if (val.linearGradient) {
                var gradient = ctx.createLinearGradient.apply(ctx, val.linearGradient);
                each(val.stops, function(stop) {
                    gradient.addColorStop(stop[0], stop[1]);
                });
                return gradient;
            }
        }
    }
    var Color = function(input) {
        var rgba = [],
            result;

        function parse(input) {
            if ((result = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(input))) {
                rgba = [parseInt(result[1]), parseInt(result[2]), parseInt(result[3]), parseFloat(result[4])];
            } else {
                if ((result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(input))) {
                    rgba = [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 1];
                }
            }
        }

        function get() {
            if (rgba && !isNaN(rgba[0])) {
                return "rgba(" + rgba.join(",") + ")";
            } else {
                return input;
            }
        }

        function brighten(alpha) {
            if (typeof alpha == "number" && alpha != 0) {
                for (var i = 0; i < 3; i++) {
                    rgba[i] += parseInt(alpha * 255);
                    if (rgba[i] < 0) {
                        rgba[i] = 0;
                    }
                    if (rgba[i] > 255) {
                        rgba[i] = 255;
                    }
                }
            }
            return this;
        }

        function setOpacity(alpha) {
            rgba[3] = alpha;
            return this;
        }
        parse(input);
        return {
            get: get,
            brighten: brighten,
            setOpacity: setOpacity
        };
    };

    function createElement(tag, attribs, styles, parent, nopad) {
        var el = doc.createElement(tag);
        if (attribs) {
            extend(el, attribs);
        }
        if (nopad) {
            setStyles(el, {
                padding: 0,
                border: "none",
                margin: 0
            });
        }
        if (styles) {
            setStyles(el, styles);
        }
        if (parent) {
            parent.appendChild(el);
        }
        return el;
    }

    function setStyles(el, styles) {
        if (isIE) {
            if (styles.opacity !== undefined) {
                styles.filter = "alpha(opacity=" + (styles.opacity * 100) + ")";
            }
        }
        extend(el.style, styles);
    }

    function numberFormat(number, decimals, decPoint, thousandsSep) {
        var lang = defaultOptions.lang,
            n = number,
            c = isNaN(decimals = mathAbs(decimals)) ? 2 : decimals,
            d = decPoint === undefined ? lang.decimalPoint : decPoint,
            t = thousandsSep === undefined ? lang.thousandsSep : thousandsSep,
            s = n < 0 ? "-" : "",
            i = parseInt(n = mathAbs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + mathAbs(n - i).toFixed(c).slice(2) : "");
    }

    function dateFormat(format, timestamp, capitalize) {
        function pad(number) {
            return number.toString().replace(/^([0-9])$/, "0$1");
        }
        if (!defined(timestamp) || isNaN(timestamp)) {
            return "Invalid date";
        }
        format = pick(format, "%Y-%m-%d %H:%M:%S");
        var date = new Date(timestamp * timeFactor),
            hours = date[getHours](),
            day = date[getDay](),
            dayOfMonth = date[getDate](),
            month = date[getMonth](),
            fullYear = date[getFullYear](),
            lang = defaultOptions.lang,
            langWeekdays = lang.weekdays,
            langMonths = lang.months,
            replacements = {
                "a": langWeekdays[day].substr(0, 3),
                "A": langWeekdays[day],
                "d": pad(dayOfMonth),
                "e": dayOfMonth,
                "b": langMonths[month].substr(0, 3),
                "B": langMonths[month],
                "m": pad(month + 1),
                "y": fullYear.toString().substr(2, 2),
                "Y": fullYear,
                "H": pad(hours),
                "I": pad((hours % 12) || 12),
                "l": (hours % 12) || 12,
                "M": pad(date[getMinutes]()),
                "p": hours < 12 ? "AM" : "PM",
                "P": hours < 12 ? "am" : "pm",
                "S": pad(date.getSeconds())
            };
        for (var key in replacements) {
            format = format.replace("%" + key, replacements[key]);
        }
        return capitalize ? format.substr(0, 1).toUpperCase() + format.substr(1) : format;
    }

    function setTimeMethods() {
        var useUTC = defaultOptions.global.useUTC;
        makeTime = useUTC ? Date.UTC : function(year, month, date, hours, minutes, seconds) {
            return new Date(year, month, pick(date, 1), pick(hours, 0), pick(minutes, 0), pick(seconds, 0)).getTime();
        };
        getMinutes = useUTC ? "getUTCMinutes" : "getMinutes";
        getHours = useUTC ? "getUTCHours" : "getHours";
        getDay = useUTC ? "getUTCDay" : "getDay";
        getDate = useUTC ? "getUTCDate" : "getDate";
        getMonth = useUTC ? "getUTCMonth" : "getMonth";
        getFullYear = useUTC ? "getUTCFullYear" : "getFullYear";
        setMinutes = useUTC ? "setUTCMinutes" : "setMinutes";
        setHours = useUTC ? "setUTCHours" : "setHours";
        setDate = useUTC ? "setUTCDate" : "setDate";
        setMonth = useUTC ? "setUTCMonth" : "setMonth";
        setFullYear = useUTC ? "setUTCFullYear" : "setFullYear";
    }

    function getPosition(el) {
        var p = {
            x: el.offsetLeft,
            y: el.offsetTop
        };
        while (el.offsetParent) {
            el = el.offsetParent;
            p.x += el.offsetLeft;
            p.y += el.offsetTop;
            if (el != doc.body && el != doc.documentElement) {
                p.x -= el.scrollLeft;
                p.y -= el.scrollTop;
            }
        }
        return p;
    }
    var Layer = function(name, appendTo, props, styles) {
        var layer = this,
            div, appendToStyle = appendTo.style;
        props = extend({
            className: "highcharts-" + name
        }, props);
        styles = extend({
            width: appendToStyle.width,
            height: appendToStyle.height,
            position: ABSOLUTE,
            top: 0,
            left: 0,
            margin: 0,
            padding: 0,
            border: "none"
        }, styles);
        div = createElement(DIV, props, styles, appendTo);
        extend(layer, {
            div: div,
            width: parseInt(styles.width),
            height: parseInt(styles.height)
        });
        layer.svg = isIE ? "" : '<?xml version="1.0" encoding="utf-8"?>' + '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" width="' + layer.width + 'px" height="' + layer.height + '">';
        layer.basicSvg = layer.svg;
    };
    Layer.prototype = {
        getCtx: function() {
            if (!this.ctx) {
                var cvs = createElement("canvas", {
                    id: "highcharts-canvas-" + idCounter++,
                    width: this.width,
                    height: this.height
                }, {
                    position: ABSOLUTE
                }, this.div);
                if (isIE) {
                    G_vmlCanvasManager.initElement(cvs);
                    cvs = doc.getElementById(cvs.id);
                }
                this.ctx = cvs.getContext("2d");
            }
            return this.ctx;
        },
        getSvg: function() {
            if (!this.svgObject) {
                var layer = this,
                    div = layer.div,
                    width = layer.width,
                    height = layer.height;
                if (isIE) {
                    if (!doc.namespaces["g_vml_"]) {
                        doc.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml");
                        doc.createStyleSheet().cssText = "g_vml_\\:*{behavior:url(#default#VML)}";
                    }
                    this.svgObject = createElement(DIV, null, {
                        width: width + PX,
                        height: height + PX,
                        position: ABSOLUTE
                    }, div);
                } else {
                    this.svgObject = createElement("object", {
                        width: width,
                        height: height,
                        type: "image/svg+xml"
                    }, {
                        position: ABSOLUTE,
                        left: 0,
                        top: 0
                    }, div);
                }
            }
            return this.svgObject;
        },
        drawLine: function(x1, y1, x2, y2, color, width) {
            var ctx = this.getCtx(),
                xBefore = x1;
            if (x1 == x2) {
                x1 = x2 = mathRound(x1) + (width % 2 / 2);
            }
            if (y1 == y2) {
                y1 = y2 = mathRound(y1) + (width % 2 / 2);
            }
            ctx.lineWidth = width;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.strokeStyle = color;
            ctx.lineTo(x2, y2);
            ctx.closePath();
            ctx.stroke();
        },
        drawPolyLine: function(points, color, width, shadow, fillColor) {
            var ctx = this.getCtx(),
                shadowLine = [];
            if (shadow && width) {
                each(points, function(point) {
                    shadowLine.push(point === undefined ? point : point + 1);
                });
                for (var i = 1; i <= 3; i++) {
                    this.drawPolyLine(shadowLine, "rgba(0, 0, 0, " + (0.05 * i) + ")", 6 - 2 * i);
                }
            }
            ctx.beginPath();
            for (i = 0; i < points.length; i += 2) {
                ctx[i == 0 ? "moveTo" : "lineTo"](points[i], points[i + 1]);
            }
            extend(ctx, {
                lineWidth: width,
                lineJoin: "round"
            });
            if (color && width) {
                ctx.strokeStyle = setColor(color, ctx);
                ctx.stroke();
            }
            if (fillColor) {
                ctx.fillStyle = setColor(fillColor, ctx);
                ctx.fill();
            }
        },
        drawRect: function(x, y, w, h, color, width, radius, fill, shadow, image) {
            var drawPath = function() {
                var ret;
                if (w > 0 && h > 0) {
                    ctx.beginPath();
                    if (!radius) {
                        ctx.rect(x, y, w, h);
                    } else {
                        ctx.moveTo(x, y + radius);
                        ctx.lineTo(x, y + h - radius);
                        ctx.quadraticCurveTo(x, y + h, x + radius, y + h);
                        ctx.lineTo(x + w - radius, y + h);
                        ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - radius);
                        ctx.lineTo(x + w, y + radius);
                        ctx.quadraticCurveTo(x + w, y, x + w - radius, y);
                        ctx.lineTo(x + radius, y);
                        ctx.quadraticCurveTo(x, y, x, y + radius);
                    }
                    ctx.closePath();
                    ret = true;
                }
                return ret;
            };
            var ctx = this.getCtx(),
                normalizer = (width || 0) % 2 / 2;
            x = mathRound(x) + normalizer;
            y = mathRound(y) + normalizer;
            w = mathRound(w - 2 * normalizer);
            h = mathRound(h - 2 * normalizer);
            if (shadow) {
                for (var i = 1; i <= 3; i++) {
                    this.drawRect(x + 1, y + 1, w, h, "rgba(0, 0, 0, " + (0.05 * i) + ")", 6 - 2 * i, radius);
                }
            }
            if (image) {
                ctx.drawImage(image, x, y, w, h);
            }
            if (drawPath()) {
                if (fill) {
                    ctx.fillStyle = setColor(fill, ctx);
                    ctx.fill();
                    if (win.G_vmlCanvasManager) {
                        drawPath();
                    }
                }
                if (width) {
                    ctx.strokeStyle = setColor(color, ctx);
                    ctx.lineWidth = width;
                    ctx.stroke();
                }
            }
        },
        drawSymbol: function(symbol, x, y, radius, lineWidth, lineColor, fillColor) {
            var ctx = this.getCtx(),
                imageRegex = /^url\((.*?)\)$/;
            ctx.beginPath();
            if (symbol == "square") {
                var len = 0.707 * radius;
                ctx.moveTo(x - len, y - len);
                ctx.lineTo(x + len, y - len);
                ctx.lineTo(x + len, y + len);
                ctx.lineTo(x - len, y + len);
                ctx.lineTo(x - len, y - len);
            } else {
                if (symbol == "triangle") {
                    y++;
                    ctx.moveTo(x, y - 1.33 * radius);
                    ctx.lineTo(x + radius, y + 0.67 * radius);
                    ctx.lineTo(x - radius, y + 0.67 * radius);
                    ctx.lineTo(x, y - 1.33 * radius);
                } else {
                    if (symbol == "triangle-down") {
                        y--;
                        ctx.moveTo(x, y + 1.33 * radius);
                        ctx.lineTo(x - radius, y - 0.67 * radius);
                        ctx.lineTo(x + radius, y - 0.67 * radius);
                        ctx.lineTo(x, y + 1.33 * radius);
                    } else {
                        if (symbol == "diamond") {
                            ctx.moveTo(x, y - radius);
                            ctx.lineTo(x + radius, y);
                            ctx.lineTo(x, y + radius);
                            ctx.lineTo(x - radius, y);
                            ctx.lineTo(x, y - radius);
                        } else {
                            if (imageRegex.test(symbol)) {
                                createElement("img", {
                                    onload: function() {
                                        var img = this,
                                            size = symbolSizes[img.src] || [img.width, img.height];
                                        setStyles(img, {
                                            left: mathRound(x - size[0] / 2) + PX,
                                            top: mathRound(y - size[1] / 2) + PX,
                                            visibility: VISIBLE
                                        });
                                        symbolSizes[img.src] = size;
                                    },
                                    src: symbol.match(imageRegex)[1]
                                }, {
                                    position: ABSOLUTE,
                                    visibility: isIE ? VISIBLE : HIDDEN
                                }, this.div);
                            } else {
                                ctx.arc(x, y, radius, 0, 2 * math.PI, true);
                            }
                        }
                    }
                }
            }
            if (fillColor) {
                ctx.fillStyle = fillColor;
                ctx.fill();
            }
            if (lineColor && lineWidth) {
                ctx.strokeStyle = lineColor || "rgb(100, 100, 255)";
                ctx.lineWidth = lineWidth || 2;
                ctx.stroke();
            }
        },
        drawHtml: function(html, attributes, styles) {
            createElement(DIV, extend(attributes, {
                innerHTML: html
            }), extend(styles, {
                position: ABSOLUTE
            }), this.div);
        },
        drawText: function() {
            this.addText.apply(this, arguments);
            this.strokeText();
        },
        addText: function(str, x, y, style, rotation, align) {
            if (str || str === 0) {
                var layer = this,
                    hasObject, div = layer.div,
                    CSStransform, css = "",
                    style = style || {},
                    fill = style.color || "#000000",
                    align = align || "left",
                    fontSize = parseInt(style.fontSize || style.font.replace(/^[a-z ]+/, "")),
                    span, spanWidth, transformOriginX;
                for (var key in style) {
                    css += hyphenate(key) + ":" + style[key] + ";";
                }
                each(["MozTransform", "WebkitTransform", "transform"], function(str) {
                    if (str in div.style) {
                        CSStransform = str;
                    }
                });
                if (!rotation || CSStransform) {
                    span = createElement("span", {
                        innerHTML: str
                    }, extend(style, {
                        position: ABSOLUTE,
                        left: x + PX,
                        whiteSpace: "nowrap",
                        bottom: mathRound(layer.height - y - fontSize * 0.25) + PX,
                        color: fill
                    }), div);
                    spanWidth = span.offsetWidth;
                    if (align == "right") {
                        setStyles(span, {
                            left: (x - spanWidth) + PX
                        });
                    } else {
                        if (align == "center") {
                            setStyles(span, {
                                left: mathRound(x - spanWidth / 2) + PX
                            });
                        }
                    }
                    if (rotation) {
                        transformOriginX = {
                            left: 0,
                            center: 50,
                            right: 100
                        }[align];
                        span.style[CSStransform] = "rotate(" + rotation + "deg)";
                        span.style[CSStransform + "Origin"] = transformOriginX + "% 100%";
                    }
                } else {
                    if (isIE) {
                        hasObject = true;
                        var radians = (rotation || 0) * math.PI * 2 / 360,
                            costheta = mathCos(radians),
                            sintheta = mathSin(radians),
                            length = layer.width,
                            baselineCorrection = fontSize / 3 || 3,
                            left = align == "left",
                            right = align == "right",
                            x1 = left ? x : x - length * costheta,
                            x2 = right ? x : x + length * costheta,
                            y1 = left ? y : y - length * sintheta,
                            y2 = right ? y : y + length * sintheta;
                        x1 += baselineCorrection * sintheta;
                        x2 += baselineCorrection * sintheta;
                        y1 -= baselineCorrection * costheta;
                        y2 -= baselineCorrection * costheta;
                        if (mathAbs(x1 - x2) < 0.1) {
                            x1 += 0.1;
                        }
                        if (mathAbs(y1 - y2) < 0.1) {
                            y1 += 0.1;
                        }
                        layer.svg += '<g_vml_:line from="' + x1 + ", " + y1 + '" to="' + x2 + ", " + y2 + '" stroked="false">' + '<g_vml_:fill on="true" color="' + fill + '"/>' + '<g_vml_:path textpathok="true"/>' + '<g_vml_:textpath on="true" string="' + str + '" ' + 'style="v-text-align:' + align + ";" + css + '"/>' + "</g_vml_:line>";
                    } else {
                        hasObject = true;
                        layer.svg += "<g>" + '<text transform="translate(' + x + "," + y + ") rotate(" + (rotation || 0) + ')" ' + 'style="fill:' + fill + ";text-anchor:" + {
                            left: "start",
                            center: "middle",
                            right: "end"
                        }[align] + ";" + css.replace(/"/g, "'") + '">' + str + "</text>" + "</g>";
                    }
                }
                if (hasObject) {
                    layer.hasObject = hasObject;
                }
            }
        },
        strokeText: function() {
            if (this.hasObject) {
                var svgObject = this.getSvg(),
                    svg = this.svg;
                if (isIE) {
                    svgObject.innerHTML = svg;
                } else {
                    svgObject.data = "data:image/svg+xml," + svg + "</svg>";
                    if (isWebKit) {
                        this.div.appendChild(svgObject);
                    }
                }
            }
        },
        clear: function() {
            var layer = this,
                div = this.div,
                childNodes = div.childNodes,
                node;
            if (layer.ctx) {
                layer.ctx.clearRect(0, 0, layer.width, layer.height);
            }
            if (layer.svgObject) {
                discardElement(layer.svgObject);
                layer.svgObject = null;
                layer.svg = layer.basicSvg;
            }
            for (var i = childNodes.length - 1; i >= 0; i--) {
                node = childNodes[i];
                if (/(SPAN|IMG)/.test(node.tagName)) {
                    discardElement(node);
                }
            }
        },
        hide: function() {
            setStyles(this.div, {
                display: "none"
            });
        },
        show: function() {
            setStyles(this.div, {
                display: ""
            });
        },
        destroy: function() {
            discardElement(this.div);
            return null;
        }
    };

    function Chart(options) {
        function addSeries(options, redraw) {
            var series;
            redraw = pick(redraw, true);
            fireEvent(chart, "addSeries", {
                options: options
            }, function() {
                series = initSeries(options);
                series.isDirty = true;
                chart.isDirty = true;
                if (redraw) {
                    chart.redraw();
                }
            });
            return series;
        }

        function redraw() {
            var redrawLegend = chart.isDirty,
                hasStackedSeries, seriesLength = series.length,
                i = seriesLength,
                serie;
            while (i--) {
                serie = series[i];
                if (serie.isDirty && serie.options.stacking) {
                    hasStackedSeries = true;
                    break;
                }
            }
            if (hasStackedSeries) {
                i = seriesLength;
                while (i--) {
                    serie = series[i];
                    if (serie.options.stacking) {
                        serie.isDirty = true;
                    }
                }
            }
            each(series, function(serie) {
                if (serie.isDirty) {
                    serie.cleanData();
                    serie.getSegments();
                    if (serie.options.legendType == "point") {
                        redrawLegend = true;
                    }
                }
            });
            maxTicks = null;
            if (hasCartesianSeries) {
                each(axes, function(axis) {
                    axis.setScale();
                });
                adjustTickAmounts();
                each(axes, function(axis) {
                    if (axis.isDirty) {
                        axis.redraw();
                    }
                });
            }
            each(series, function(serie) {
                if (serie.isDirty && serie.visible) {
                    serie.redraw();
                }
            });
            if (redrawLegend) {
                if (legend && legend.renderHTML) {
                    legend.renderHTML(true);
                    legend.drawGraphics(true);
                }
                chart.isDirty = false;
            }
            if (tracker && tracker.resetTracker) {
                tracker.resetTracker();
            }
            fireEvent(chart, "redraw");
        }

        function initSeries(options) {
            var type = options.type || optionsChart.defaultSeriesType,
                typeClass = seriesTypes[type],
                serie, hasRendered = chart.hasRendered;
            if (hasRendered) {
                if (inverted && type == "column") {
                    typeClass = BarSeries;
                } else {
                    if (!inverted && type == "bar") {
                        typeClass = ColumnSeries;
                    }
                }
            }
            serie = new typeClass();
            serie.init(chart, options);
            if (!hasRendered && serie.inverted) {
                inverted = true;
            }
            if (serie.isCartesian) {
                hasCartesianSeries = serie.isCartesian;
            }
            series.push(serie);
            return serie;
        }

        function showLoading() {
            var loadingOptions = options.loading;
            if (!loadingLayer) {
                loadingLayer = createElement(DIV, {
                    className: "highcharts-loading"
                }, extend(loadingOptions.style, {
                    left: marginLeft + PX,
                    top: marginTop + PX,
                    width: plotWidth + PX,
                    height: plotHeight + PX,
                    zIndex: 10,
                    display: "none"
                }), container);
                createElement("span", {
                    innerHTML: options.lang.loading
                }, loadingOptions.labelStyle, loadingLayer);
            }
            setStyles(loadingLayer, {
                display: ""
            });
            animate(loadingLayer, {
                opacity: loadingOptions.style.opacity
            }, {
                duration: loadingOptions.showDuration
            });
        }

        function hideLoading() {
            animate(loadingLayer, {
                opacity: 0
            }, {
                duration: options.loading.hideDuration,
                complete: function() {
                    setStyles(loadingLayer, {
                        display: "none"
                    });
                }
            });
        }

        function get(id) {
            var i, j, match, data;
            for (i = 0; i < axes.length; i++) {
                if (axes[i].options.id == id) {
                    return axes[i];
                }
            }
            for (i = 0; i < series.length; i++) {
                if (series[i].options.id == id) {
                    return series[i];
                }
            }
            for (i = 0; i < series.length; i++) {
                data = series[i].data;
                for (j = 0; j < data.length; j++) {
                    if (data[j].id == id) {
                        return data[j];
                    }
                }
            }
            return null;
        }

        function updatePosition() {
            var container = doc.getElementById(containerId);
            if (container) {
                position = getPosition(container);
            }
        }

        function getAxes() {
            var xAxisOptions = options.xAxis || {},
                yAxisOptions = options.yAxis || {},
                axis;
            xAxisOptions = splat(xAxisOptions);
            each(xAxisOptions, function(axis, i) {
                axis.index = i;
                axis.isX = true;
            });
            yAxisOptions = splat(yAxisOptions);
            each(yAxisOptions, function(axis, i) {
                axis.index = i;
            });
            axes = xAxisOptions.concat(yAxisOptions);
            chart.xAxis = [];
            chart.yAxis = [];
            axes = map(axes, function(axisOptions) {
                axis = new Axis(chart, axisOptions);
                chart[axis.isXAxis ? "xAxis" : "yAxis"].push(axis);
                return axis;
            });
            adjustTickAmounts();
        }

        function adjustTickAmounts() {
            if (optionsChart.alignTicks !== false) {
                each(axes, function(axis) {
                    axis.adjustTickAmount();
                });
            }
        }

        function getSelectedPoints() {
            var points = [];
            each(series, function(serie) {
                points = points.concat(grep(serie.data, function(point) {
                    return point.selected;
                }));
            });
            return points;
        }

        function getSelectedSeries() {
            return grep(series, function(serie) {
                return serie.selected;
            });
        }

        function zoom(event) {
            var lang = defaultOptions.lang;
            chart.toolbar.add("zoom", lang.resetZoom, lang.resetZoomTitle, function() {
                fireEvent(chart, "selection", {
                    resetSelection: true
                }, zoom);
                chart.toolbar.remove("zoom");
            });
            if (!event || event.resetSelection) {
                each(axes, function(axis) {
                    axis.setExtremes(null, null, false);
                });
            } else {
                each(event.xAxis.concat(event.yAxis), function(axisData) {
                    var axis = axisData.axis;
                    if (chart.tracker[axis.isXAxis ? "zoomX" : "zoomY"]) {
                        axis.setExtremes(axisData.min, axisData.max, false);
                    }
                });
            }
            redraw();
        }

        function showTitle() {
            var title = options.title,
                subtitle = options.subtitle;
            if (!chart.titleLayer) {
                var titleLayer = new Layer("title-layer", container, null, {
                    zIndex: 2
                });
                if (title && title.text) {
                    createElement("h2", {
                        className: "highcharts-title",
                        innerHTML: title.text
                    }, title.style, titleLayer.div);
                }
                if (subtitle && subtitle.text) {
                    createElement("h3", {
                        className: "highcharts-subtitle",
                        innerHTML: subtitle.text
                    }, subtitle.style, titleLayer.div);
                }
                chart.titleLayer = titleLayer;
            }
        }

        function checkResources() {
            var allLoaded = true;
            for (var n in chart.resources) {
                if (!chart.resources[n]) {
                    allLoaded = false;
                }
            }
            if (allLoaded) {
                resourcesLoaded();
            }
        }

        function resourcesLoaded() {
            getAxes();
            each(series, function(serie) {
                serie.translate();
                serie.setTooltipPoints();
                serie.createArea();
            });
            chart.render = render;
            setTimeout(function() {
                render();
                fireEvent(chart, "load");
            }, 0);
        }

        function getContainer() {
            renderTo = optionsChart.renderTo;
            containerId = "highcharts-" + idCounter++;
            if (typeof renderTo == "string") {
                renderTo = doc.getElementById(renderTo);
            }
            renderTo.innerHTML = "";
            if (!renderTo.offsetWidth) {
                renderToClone = renderTo.cloneNode(0);
                setStyles(renderToClone, {
                    position: ABSOLUTE,
                    top: "-9999px",
                    display: ""
                });
                doc.body.appendChild(renderToClone);
            }
            var renderToOffsetHeight = (renderToClone || renderTo).offsetHeight;
            chartWidth = optionsChart.width || (renderToClone || renderTo).offsetWidth || 600;
            chartHeight = optionsChart.height || (renderToOffsetHeight > marginTop + marginBottom ? renderToOffsetHeight : 0) || 400;
            container = createElement(DIV, {
                className: "highcharts-container" + (optionsChart.className ? " " + optionsChart.className : ""),
                id: containerId
            }, extend({
                position: RELATIVE,
                overflow: HIDDEN,
                width: chartWidth + PX,
                height: chartHeight + PX,
                textAlign: "left"
            }, optionsChart.style), renderToClone || renderTo);
        }

        function render() {
            var mgn, div, i, labels = options.labels,
                credits = options.credits;
            mgn = 2 * (optionsChart.borderWidth || 0) + (optionsChart.shadow ? 8 : 0);
            backgroundLayer.drawRect(mgn / 2, mgn / 2, chartWidth - mgn, chartHeight - mgn, optionsChart.borderColor, optionsChart.borderWidth, optionsChart.borderRadius, optionsChart.backgroundColor, optionsChart.shadow);
            backgroundLayer.drawRect(marginLeft, marginTop, plotWidth, plotHeight, null, null, null, optionsChart.plotBackgroundColor, null, plotBackground);
            (new Layer("plot-border", container, null, {
                zIndex: 4
            })).drawRect(marginLeft, marginTop, plotWidth, plotHeight, optionsChart.plotBorderColor, optionsChart.plotBorderWidth, null, null, optionsChart.plotShadow);
            if (isIE) {
                addCSSRule(".highcharts-image-map", {
                    display: "none"
                }, "print");
            }
            if (hasCartesianSeries) {
                each(axes, function(axis) {
                    axis.render();
                });
            }
            showTitle();
            if (labels.items) {
                each(labels.items, function() {
                    var attributes = extend({
                        className: "highcharts-label"
                    }, this.attributes);
                    plotLayer.drawHtml(this.html, attributes, extend(labels.style, this.style));
                });
            }
            each(series, function(serie) {
                serie.render();
            });
            legend = chart.legend = new Legend(chart);
            if (!chart.toolbar) {
                chart.toolbar = Toolbar(chart);
            }
            if (credits.enabled && !chart.credits) {
                chart.credits = createElement("a", {
                    className: "highcharts-credits",
                    href: credits.href,
                    innerHTML: credits.text,
                    target: credits.target
                }, extend(credits.style, {
                    zIndex: 8
                }), container);
            }
            chart.hasRendered = true;
            if (renderToClone) {
                renderTo.appendChild(container);
                discardElement(renderToClone);
                updatePosition();
            }
        }

        function destroy() {
            function purge(d) {
                var a = d.attributes,
                    i, l, n;
                if (a) {
                    l = a.length;
                    for (i = l - 1; i >= 0; i -= 1) {
                        n = a[i].name;
                        try {
                            if (typeof d[n] == "function") {
                                d[n] = null;
                            }
                        } catch (e) {}
                    }
                }
                a = d.childNodes;
                if (a) {
                    l = a.length;
                    for (i = l - 1; i >= 0; i--) {
                        var node = d.childNodes[i];
                        purge(node);
                        if (!node.childNodes.length) {
                            discardElement(node);
                        }
                    }
                }
            }
            each(series, function(serie) {
                serie.destroy();
            });
            series = [];
            purge(container);
        }

        function Axis(chart, options) {
            function setOptions() {
                options = merge(isXAxis ? defaultXAxisOptions : defaultYAxisOptions, horiz ? (opposite ? defaultTopAxisOptions : defaultBottomAxisOptions) : (opposite ? defaultRightAxisOptions : defaultLeftAxisOptions), options);
            }

            function getSeriesExtremes() {
                var stack = [],
                    run;
                dataMin = dataMax = null;
                associatedSeries = [];
                each(series, function(serie) {
                    run = false;
                    each(["xAxis", "yAxis"], function(strAxis) {
                        if ((strAxis == "xAxis" && isXAxis || strAxis == "yAxis" && !isXAxis) && ((serie.options[strAxis] == options.index) || (serie.options[strAxis] === undefined && options.index == 0))) {
                            serie[strAxis] = axis;
                            associatedSeries.push(serie);
                            run = true;
                        }
                    });
                    if (!serie.visible && optionsChart.ignoreHiddenSeries) {
                        run = false;
                    }
                    if (run) {
                        var stacking;
                        if (!isXAxis) {
                            stacking = serie.options.stacking;
                            usePercentage = stacking == "percent";
                            if (stacking) {
                                var typeStack = stack[serie.type] || [];
                                stack[serie.type] = typeStack;
                            }
                            if (usePercentage) {
                                dataMin = 0;
                                dataMax = 99;
                            }
                        }
                        if (serie.isCartesian) {
                            each(serie.data, function(point, i) {
                                var pointX = point.x,
                                    pointY = point.y;
                                if (dataMin === null) {
                                    dataMin = dataMax = point[xOrY];
                                }
                                if (isXAxis) {
                                    if (pointX > dataMax) {
                                        dataMax = pointX;
                                    } else {
                                        if (pointX < dataMin) {
                                            dataMin = pointX;
                                        }
                                    }
                                } else {
                                    if (defined(pointY)) {
                                        if (stacking) {
                                            typeStack[pointX] = typeStack[pointX] ? typeStack[pointX] + pointY : pointY;
                                        }
                                        var stackedPoint = typeStack ? typeStack[pointX] : pointY;
                                        if (!usePercentage) {
                                            if (stackedPoint > dataMax) {
                                                dataMax = stackedPoint;
                                            } else {
                                                if (stackedPoint < dataMin) {
                                                    dataMin = stackedPoint;
                                                }
                                            }
                                        }
                                        if (stacking) {
                                            stacks[serie.type][pointX] = {
                                                total: stackedPoint,
                                                cum: stackedPoint
                                            };
                                        }
                                    }
                                }
                            });
                            if (!isXAxis && /(area|column|bar)/.test(serie.type)) {
                                if (dataMin >= 0) {
                                    dataMin = 0;
                                    ignoreMinPadding = true;
                                } else {
                                    if (dataMax < 0) {
                                        dataMax = 0;
                                        ignoreMaxPadding = true;
                                    }
                                }
                            }
                        }
                    }
                });
            }

            function translate(val, backwards, cvsCoord) {
                var sign = 1,
                    cvsOffset = 0,
                    returnValue;
                if (cvsCoord) {
                    sign *= -1;
                    cvsOffset = axisLength;
                }
                if (reversed) {
                    sign *= -1;
                    cvsOffset -= sign * axisLength;
                }
                if (backwards) {
                    if (reversed) {
                        val = axisLength - val;
                    }
                    returnValue = val / transA + min;
                } else {
                    returnValue = sign * (val - min) * transA + cvsOffset;
                }
                return returnValue;
            }

            function drawPlotLine(value, color, width) {
                if (width) {
                    var x1, y1, x2, y2, translatedValue = translate(value),
                        skip;
                    x1 = x2 = translatedValue + transB;
                    y1 = y2 = chartHeight - translatedValue - transB;
                    if (horiz) {
                        y1 = marginTop;
                        y2 = chartHeight - marginBottom;
                        if (x1 < marginLeft || x1 > marginLeft + plotWidth) {
                            skip = true;
                        }
                    } else {
                        x1 = marginLeft;
                        x2 = chartWidth - marginRight;
                        if (y1 < marginTop || y1 > marginTop + plotHeight) {
                            skip = true;
                        }
                    }
                    if (!skip) {
                        gridLayer.drawLine(x1, y1, x2, y2, color, width);
                    }
                }
            }

            function drawPlotBand(from, to, color) {
                from = mathMax(from, min);
                to = Math.min(to, max);
                var width = (to - from) * transA;
                drawPlotLine(from + (to - from) / 2, color, width);
            }

            function addTick(pos, tickPos, color, width, len, withLabel, index) {
                var x1, y1, x2, y2, str, labelOptions = options.labels;
                if (tickPos == "inside") {
                    len = -len;
                }
                if (opposite) {
                    len = -len;
                }
                x1 = x2 = translate(pos + tickmarkOffset) + transB;
                y1 = y2 = chartHeight - translate(pos + tickmarkOffset) - transB;
                if (horiz) {
                    y1 = chartHeight - marginBottom - (opposite ? plotHeight : 0) + offset;
                    y2 = y1 + len;
                } else {
                    x1 = marginLeft + (opposite ? plotWidth : 0) + offset;
                    x2 = x1 - len;
                }
                if (width) {
                    axisLayer.drawLine(x1, y1, x2, y2, color, width);
                }
                if (withLabel && labelOptions.enabled) {
                    str = labelFormatter.call({
                        index: index,
                        isFirst: pos == tickPositions[0],
                        isLast: pos == tickPositions[tickPositions.length - 1],
                        value: (categories && categories[pos] ? categories[pos] : pos)
                    });
                    if (str || str === 0) {
                        axisLayer.addText(str, x1 + labelOptions.x - (tickmarkOffset && horiz ? tickmarkOffset * transA * (reversed ? -1 : 1) : 0), y1 + labelOptions.y - (tickmarkOffset && !horiz ? tickmarkOffset * transA * (reversed ? 1 : -1) : 0), labelOptions.style, labelOptions.rotation, labelOptions.align);
                    }
                }
            }

            function normalizeTickInterval(interval, multiples) {
                var normalized, allowDecimals = pick(options.allowDecimals, true);
                magnitude = multiples ? 1 : math.pow(10, mathFloor(math.log(interval) / math.LN10));
                normalized = interval / magnitude;
                if (!multiples) {
                    multiples = [1, 2, 2.5, 5, 10];
                }
                for (var i = 0; i < multiples.length; i++) {
                    interval = multiples[i];
                    if (normalized <= (multiples[i] + (multiples[i + 1] || multiples[i])) / 2) {
                        break;
                    }
                }
                interval *= magnitude;
                return interval;
            }

            function setDateTimeTickPositions() {
                tickPositions = [];
                var useUTC = defaultOptions.global.useUTC,
                    oneSecond = 1000 / timeFactor,
                    oneMinute = 60000 / timeFactor,
                    oneHour = 3600000 / timeFactor,
                    oneDay = 24 * 3600000 / timeFactor,
                    oneWeek = 7 * 24 * 3600000 / timeFactor,
                    oneMonth = 30 * 24 * 3600000 / timeFactor,
                    oneYear = 31556952000 / timeFactor,
                    units = [
                        ["second", oneSecond, [1, 2, 5, 10, 15, 30]],
                        ["minute", oneMinute, [1, 2, 5, 10, 15, 30]],
                        ["hour", oneHour, [1, 2, 3, 4, 6, 8, 12]],
                        ["day", oneDay, [1, 2]],
                        ["week", oneWeek, [1, 2]],
                        ["month", oneMonth, [1, 2, 3, 4, 6]],
                        ["year", oneYear, null]
                    ],
                    unit = units[6],
                    interval = unit[1],
                    multiples = unit[2];
                for (var i = 0; i < units.length; i++) {
                    unit = units[i];
                    interval = unit[1];
                    multiples = unit[2];
                    if (units[i + 1]) {
                        var lessThan = (interval * multiples[multiples.length - 1] + units[i + 1][1]) / 2;
                        if (tickInterval <= lessThan) {
                            break;
                        }
                    }
                }
                if (interval == oneYear && tickInterval < 5 * interval) {
                    multiples = [1, 2, 5];
                }
                var multitude = normalizeTickInterval(tickInterval / interval, multiples),
                    minYear, minDate = new Date(min * timeFactor);
                minDate.setMilliseconds(0);
                if (interval >= oneSecond) {
                    minDate.setSeconds(interval >= oneMinute ? 0 : multitude * mathFloor(minDate.getSeconds() / multitude));
                }
                if (interval >= oneMinute) {
                    minDate[setMinutes](interval >= oneHour ? 0 : multitude * mathFloor(minDate[getMinutes]() / multitude));
                }
                if (interval >= oneHour) {
                    minDate[setHours](interval >= oneDay ? 0 : multitude * mathFloor(minDate[getHours]() / multitude));
                }
                if (interval >= oneDay) {
                    minDate[setDate](interval >= oneMonth ? 1 : multitude * mathFloor(minDate[getDate]() / multitude));
                }
                if (interval >= oneMonth) {
                    minDate[setMonth](interval >= oneYear ? 0 : multitude * mathFloor(minDate[getMonth]() / multitude));
                    minYear = minDate[getFullYear]();
                }
                if (interval >= oneYear) {
                    minYear -= minYear % multitude;
                    minDate[setFullYear](minYear);
                }
                if (interval == oneWeek) {
                    minDate[setDate](minDate[getDate]() - minDate[getDay]() + options.startOfWeek);
                }
                var i = 1,
                    time = minDate.getTime() / timeFactor,
                    minYear = minDate[getFullYear](),
                    minMonth = minDate[getMonth](),
                    minDateDate = minDate[getDate]();
                while (time < max && i < plotWidth) {
                    tickPositions.push(time);
                    if (interval == oneYear) {
                        time = makeTime(minYear + i * multitude, 0) / timeFactor;
                    } else {
                        if (interval == oneMonth) {
                            time = makeTime(minYear, minMonth + i * multitude) / timeFactor;
                        } else {
                            if (!useUTC && (interval == oneDay || interval == oneWeek)) {
                                time = makeTime(minYear, minMonth, minDateDate + i * multitude * (interval == oneDay ? 1 : 7));
                            } else {
                                time += interval * multitude;
                            }
                        }
                    }
                    i++;
                }
                tickPositions.push(time);
                if (!options.labels.formatter) {
                    labelFormatter = function() {
                        return dateFormat(options.dateTimeLabelFormats[unit[0]], this.value, 1);
                    };
                }
            }

            function correctFloat(num) {
                var invMag = (magnitude < 1 ? mathRound(1 / magnitude) : 1) * 10;
                return mathRound(num * invMag) / invMag;
            }

            function setLinearTickPositions() {
                var i, roundedMin = mathFloor(min / tickInterval) * tickInterval,
                    roundedMax = math.ceil(max / tickInterval) * tickInterval;
                tickPositions = [];
                i = correctFloat(roundedMin);
                while (i <= roundedMax) {
                    tickPositions.push(i);
                    i = correctFloat(i + tickInterval);
                }
                if (categories) {
                    min -= 0.5;
                    max += 0.5;
                }
                if (!labelFormatter) {
                    labelFormatter = function() {
                        return this.value;
                    };
                }
            }

            function setTickPositions() {
                if (isDatetimeAxis) {
                    setDateTimeTickPositions();
                } else {
                    setLinearTickPositions();
                }
                var roundedMin = tickPositions[0],
                    roundedMax = tickPositions[tickPositions.length - 1];
                if (options.startOnTick) {
                    min = roundedMin;
                } else {
                    if (min > roundedMin) {
                        tickPositions.shift();
                    }
                }
                if (options.endOnTick) {
                    max = roundedMax;
                } else {
                    if (max < roundedMax) {
                        tickPositions.pop();
                    }
                }
            }

            function adjustTickAmount() {
                if (!isDatetimeAxis && !categories) {
                    var oldTickAmount = tickAmount,
                        calculatedTickAmount = tickPositions.length;
                    tickAmount = maxTicks[xOrY];
                    if (calculatedTickAmount < tickAmount) {
                        while (tickPositions.length < tickAmount) {
                            tickPositions.push(correctFloat(tickPositions[tickPositions.length - 1] + tickInterval));
                        }
                        transA *= (calculatedTickAmount - 1) / (tickAmount - 1);
                    }
                    if (defined(oldTickAmount) && tickAmount != oldTickAmount) {
                        axis.isDirty = true;
                    }
                }
            }

            function setScale() {
                var length, type, i, total, oldMin = min,
                    oldMax = max,
                    maxZoom = options.maxZoom,
                    zoomOffset;
                getSeriesExtremes();
                min = pick(userSetMin, options.min, dataMin);
                max = pick(userSetMax, options.max, dataMax);
                if (max - min < maxZoom) {
                    zoomOffset = (maxZoom - max + min) / 2;
                    min = mathMax(min - zoomOffset, pick(options.min, min - zoomOffset));
                    max = math.min(min + maxZoom, pick(options.max, min + maxZoom));
                }
                if (!categories && !usePercentage && defined(min) && defined(max)) {
                    length = (max - min) || 1;
                    if (!defined(options.min) && !defined(userSetMin) && minPadding && (dataMin < 0 || !ignoreMinPadding)) {
                        min -= length * minPadding;
                    }
                    if (!defined(options.max) && !defined(userSetMax) && maxPadding && (dataMax > 0 || !ignoreMaxPadding)) {
                        max += length * maxPadding;
                    }
                }
                if (categories || min == max) {
                    tickInterval = 1;
                } else {
                    tickInterval = options.tickInterval == "auto" ? (max - min) * options.tickPixelInterval / axisLength : options.tickInterval;
                }
                if (!isDatetimeAxis && options.tickInterval == "auto") {
                    tickInterval = normalizeTickInterval(tickInterval);
                }
                minorTickInterval = (options.minorTickInterval == "auto" && tickInterval) ? tickInterval / 5 : options.minorTickInterval;
                setTickPositions();
                transA = axisLength / ((max - min) || 1);
                if (!maxTicks) {
                    maxTicks = {
                        x: 0,
                        y: 0
                    };
                }
                if (!isDatetimeAxis && tickPositions.length > maxTicks[xOrY]) {
                    maxTicks[xOrY] = tickPositions.length;
                }
                if (!isXAxis) {
                    for (type in stacks) {
                        for (i in stacks[type]) {
                            stacks[type][i].cum = stacks[type][i].total;
                        }
                    }
                }
                if (!axis.isDirty) {
                    axis.isDirty = (min != oldMin || max != oldMax);
                }
            }

            function setExtremes(newMin, newMax, redraw) {
                redraw = pick(redraw, true);
                fireEvent(axis, "setExtremes", {
                    min: newMin,
                    max: newMax
                }, function() {
                    if (categories) {
                        if (newMin < 0) {
                            newMin = 0;
                        }
                        if (newMax > categories.length - 1) {
                            newMax = categories.length - 1;
                        }
                    }
                    userSetMin = newMin;
                    userSetMax = newMax;
                    if (redraw) {
                        chart.redraw();
                    }
                });
            }

            function setCategories(newCategories, doRedraw) {
                axis.categories = categories = newCategories;
                each(associatedSeries, function(series) {
                    series.translate();
                    series.setTooltipPoints(true);
                });
                axis.isDirty = true;
                if (pick(doRedraw, true)) {
                    redraw();
                }
            }

            function getExtremes() {
                return {
                    min: min,
                    max: max,
                    dataMin: dataMin,
                    dataMax: dataMax
                };
            }

            function addPlotBandOrLine(item) {
                var isLine = item.width,
                    collection = isLine ? plotLines : plotBands;
                collection.push(item);
                if (isLine) {
                    drawPlotLine(item.value, item.color, item.width);
                } else {
                    drawPlotBand(item.from, item.to, item.color);
                }
            }

            function removePlotBandOrLine(id) {
                each([plotBands, plotLines], function(collection) {
                    for (var i = 0; i < collection.length; i++) {
                        if (collection[i].id == id) {
                            collection.splice(i, 1);
                            break;
                        }
                    }
                });
                render();
            }

            function redraw() {
                if (tracker.resetTracker) {
                    tracker.resetTracker();
                }
                render();
                each(associatedSeries, function(series) {
                    series.isDirty = true;
                });
            }

            function render() {
                var axisTitle = options.title,
                    alternateGridColor = options.alternateGridColor,
                    minorTickWidth = options.minorTickWidth,
                    lineWidth = options.lineWidth,
                    lineLeft, lineTop, tickmarkPos, hasData = associatedSeries.length && defined(min) && defined(max);
                axisLayer.clear();
                gridLayer.clear();
                if (hasData) {
                    if (alternateGridColor) {
                        each(tickPositions, function(pos, i) {
                            if (i % 2 == 0 && pos < max) {
                                drawPlotBand(pos, tickPositions[i + 1] !== undefined ? tickPositions[i + 1] : max, alternateGridColor);
                            }
                        });
                    }
                    each(plotBands, function(plotBand) {
                        drawPlotBand(plotBand.from, plotBand.to, plotBand.color);
                    });
                    if (minorTickInterval && !categories) {
                        for (var i = min; i <= max; i += minorTickInterval) {
                            drawPlotLine(i, options.minorGridLineColor, options.minorGridLineWidth);
                            if (minorTickWidth) {
                                addTick(i, options.minorTickPosition, options.minorTickColor, minorTickWidth, options.minorTickLength);
                            }
                        }
                    }
                    each(tickPositions, function(pos, index) {
                        tickmarkPos = pos + tickmarkOffset;
                        drawPlotLine(tickmarkPos, options.gridLineColor, options.gridLineWidth);
                        addTick(pos, options.tickPosition, options.tickColor, options.tickWidth, options.tickLength, !((pos == min && !options.showFirstLabel) || (pos == max && !options.showLastLabel)), index);
                    });
                    each(plotLines, function(plotLine) {
                        drawPlotLine(plotLine.value, plotLine.color, plotLine.width);
                    });
                }
                if (lineWidth) {
                    lineLeft = marginLeft + (opposite ? plotWidth : 0) + offset;
                    lineTop = chartHeight - marginBottom - (opposite ? plotHeight : 0) + offset;
                    axisLayer.drawLine(horiz ? marginLeft : lineLeft, horiz ? lineTop : marginTop, horiz ? chartWidth - marginRight : lineLeft, horiz ? lineTop : chartHeight - marginBottom, options.lineColor, lineWidth);
                }
                if (axisTitle && axisTitle.enabled && axisTitle.text) {
                    var margin = horiz ? marginLeft : marginTop,
                        length = horiz ? plotWidth : plotHeight;
                    var alongAxis = {
                        low: margin + (horiz ? 0 : length),
                        middle: margin + length / 2,
                        high: margin + (horiz ? length : 0)
                    }[axisTitle.align];
                    var offAxis = (horiz ? marginTop + plotHeight : marginLeft) + (horiz ? 1 : -1) * (opposite ? -1 : 1) * axisTitle.margin - (isIE ? parseInt(axisTitle.style.fontSize || axisTitle.style.font.replace(/^[a-z ]+/, "")) / 3 : 0);
                    axisLayer.addText(axisTitle.text, horiz ? alongAxis : offAxis + (opposite ? plotWidth : 0) + offset, horiz ? offAxis - (opposite ? plotHeight : 0) + offset : alongAxis, axisTitle.style, axisTitle.rotation || 0, {
                        low: "left",
                        middle: "center",
                        high: "right"
                    }[axisTitle.align]);
                }
                axisLayer.strokeText();
                axis.isDirty = false;
            }
            var isXAxis = options.isX,
                opposite = options.opposite,
                horiz = inverted ? !isXAxis : isXAxis,
                stacks = {
                    bar: {},
                    column: {},
                    area: {},
                    areaspline: {}
                };
            setOptions();
            var axis = this,
                isDatetimeAxis = options.type == "datetime",
                offset = options.offset || 0,
                xOrY = isXAxis ? "x" : "y",
                axisLength = horiz ? plotWidth : plotHeight,
                transA, transB = horiz ? marginLeft : marginBottom,
                axisLayer = new Layer("axis-layer", container, null, {
                    zIndex: 7
                }),
                gridLayer = new Layer("grid-layer", container, null, {
                    zIndex: 1
                }),
                dataMin, dataMax, associatedSeries, userSetMin, userSetMax, max = null,
                min = null,
                minPadding = options.minPadding,
                maxPadding = options.maxPadding,
                ignoreMinPadding, ignoreMaxPadding, usePercentage, events = options.events,
                eventType, plotBands = options.plotBands || [],
                plotLines = options.plotLines || [],
                tickInterval, minorTickInterval, magnitude, tickPositions, tickAmount, zoom = 1,
                labelFormatter = options.labels.formatter,
                categories = options.categories || (isXAxis && chart.columnCount),
                reversed = options.reversed,
                tickmarkOffset = (categories && options.tickmarkPlacement == "between") ? 0.5 : 0;
            if (inverted && isXAxis && reversed === undefined) {
                reversed = true;
            }
            if (!opposite) {
                offset *= -1;
            }
            if (horiz) {
                offset *= -1;
            }
            extend(axis, {
                addPlotBand: addPlotBandOrLine,
                addPlotLine: addPlotBandOrLine,
                adjustTickAmount: adjustTickAmount,
                categories: categories,
                getExtremes: getExtremes,
                isXAxis: isXAxis,
                options: options,
                render: render,
                setExtremes: setExtremes,
                setScale: setScale,
                setCategories: setCategories,
                translate: translate,
                redraw: redraw,
                removePlotBand: removePlotBandOrLine,
                removePlotLine: removePlotBandOrLine,
                reversed: reversed,
                stacks: stacks
            });
            for (eventType in events) {
                addEvent(axis, eventType, events[eventType]);
            }
            setScale();
        }

        function Toolbar(chart) {
            var toolbarLayer, buttons = {};
            toolbarLayer = new Layer("toolbar", container, null, {
                zIndex: 1004,
                width: "auto",
                height: "auto"
            });

            function add(id, text, title, fn) {
                if (!buttons[id]) {
                    var button = createElement(DIV, {
                        innerHTML: text,
                        title: title,
                        onclick: fn
                    }, extend(options.toolbar.itemStyle, {
                        zIndex: 1003
                    }), toolbarLayer.div);
                    buttons[id] = button;
                }
            }

            function remove(id) {
                discardElement(buttons[id]);
                buttons[id] = null;
            }
            return {
                add: add,
                remove: remove
            };
        }

        function MouseTracker(chart, options) {
            function getActivePoint() {
                return activePoint;
            }

            function normalizeMouseEvent(e) {
                e = e || win.event;
                if (!e.target) {
                    e.target = e.srcElement;
                }
                if (!e.pageX) {
                    e.pageX = e.clientX + (doc.documentElement.scrollLeft || doc.body.scrollLeft);
                }
                if (!e.pageY) {
                    e.pageY = e.clientY + (doc.documentElement.scrollTop || doc.body.scrollTop);
                }
                return e;
            }

            function getMouseCoordinates(e) {
                var coordinates = {
                    xAxis: [],
                    yAxis: []
                };
                each(axes, function(axis, i) {
                    var translate = axis.translate,
                        isXAxis = axis.isXAxis,
                        isHorizontal = inverted ? !isXAxis : isXAxis;
                    coordinates[isXAxis ? "xAxis" : "yAxis"].push({
                        axis: axis,
                        value: translate(isHorizontal ? e.pageX - position.x - marginLeft : plotHeight - e.pageY + position.y + marginTop, true)
                    });
                });
                return coordinates;
            }

            function setDOMEvents() {
                imagemap.onmousedown = function(e) {
                    e = normalizeMouseEvent(e);
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                    chart.mouseIsDown = mouseIsDown = true;
                    mouseDownX = e.pageX;
                    mouseDownY = e.pageY;
                    if (hasCartesianSeries && (zoomX || zoomY)) {
                        if (!selectionMarker) {
                            selectionMarker = createElement(DIV, null, {
                                position: ABSOLUTE,
                                border: "none",
                                background: "#4572A7",
                                opacity: 0.25,
                                width: zoomHor ? 0 : plotWidth + PX,
                                height: zoomVert ? 0 : plotHeight + PX
                            });
                        }
                        plotLayer.div.appendChild(selectionMarker);
                    }
                };
                imagemap.onmousemove = function(e) {
                    e = normalizeMouseEvent(e);
                    e.returnValue = false;
                    if (mouseIsDown) {
                        hasDragged = Math.sqrt(Math.pow(mouseDownX - e.pageX, 2) + Math.pow(mouseDownY - e.pageY, 2)) > 10;
                        if (zoomHor) {
                            var xSize = e.pageX - mouseDownX;
                            setStyles(selectionMarker, {
                                width: mathAbs(xSize) + PX,
                                left: ((xSize > 0 ? 0 : xSize) + mouseDownX - position.x - marginLeft) + PX
                            });
                        }
                        if (zoomVert) {
                            var ySize = e.pageY - mouseDownY;
                            setStyles(selectionMarker, {
                                height: mathAbs(ySize) + PX,
                                top: ((ySize > 0 ? 0 : ySize) + +mouseDownY - position.y - marginTop) + PX
                            });
                        }
                    } else {
                        onmousemove(e);
                    }
                    return false;
                };
                imagemap.onmouseup = function() {
                    var selectionIsMade;
                    if (selectionMarker) {
                        var selectionData = {
                                xAxis: [],
                                yAxis: []
                            },
                            selectionLeft = selectionMarker.offsetLeft,
                            selectionTop = selectionMarker.offsetTop,
                            selectionWidth = selectionMarker.offsetWidth,
                            selectionHeight = selectionMarker.offsetHeight;
                        if (hasDragged) {
                            each(axes, function(axis, i) {
                                var translate = axis.translate,
                                    isXAxis = axis.isXAxis,
                                    isHorizontal = inverted ? !isXAxis : isXAxis,
                                    selectionMin = translate(isHorizontal ? selectionLeft : plotHeight - selectionTop - selectionHeight, true),
                                    selectionMax = translate(isHorizontal ? selectionLeft + selectionWidth : plotHeight - selectionTop, true);
                                selectionData[isXAxis ? "xAxis" : "yAxis"].push({
                                    axis: axis,
                                    min: math.min(selectionMin, selectionMax),
                                    max: mathMax(selectionMin, selectionMax)
                                });
                            });
                            fireEvent(chart, "selection", selectionData, zoom);
                            selectionIsMade = true;
                        }
                        discardElement(selectionMarker);
                        selectionMarker = null;
                    }
                    chart.mouseIsDown = mouseIsDown = hasDragged = false;
                };
                imagemap.onmouseout = function(e) {
                    e = e || win.event;
                    var related = e.relatedTarget || e.toElement;
                    if (related && related != trackerImage && related.tagName != "AREA") {
                        resetTracker();
                        chart.mouseIsDown = mouseIsDown = hasDragged = false;
                    }
                };
                imagemap.onclick = function(e) {
                    e = normalizeMouseEvent(e);
                    e.cancelBubble = true;
                    if (!hasDragged) {
                        if (activePoint && e.target.tagName == "AREA") {
                            var plotX = activePoint.plotX,
                                plotY = activePoint.plotY;
                            extend(activePoint, {
                                pageX: position.x + marginLeft + (inverted ? plotWidth - plotY : plotX),
                                pageY: position.y + marginTop + (inverted ? plotHeight - plotX : plotY)
                            });
                            fireEvent(chart.hoverSeries, "click", extend(e, {
                                point: activePoint
                            }));
                            if (activePoint) {
                                activePoint.firePointEvent("click", e);
                            }
                        } else {
                            extend(e, getMouseCoordinates(e));
                            fireEvent(chart, "click", e);
                        }
                    }
                    hasDragged = false;
                };
            }

            function onmousemove(e) {
                var point = chart.hoverPoint,
                    series = chart.hoverSeries;
                if (series) {
                    if (!point) {
                        point = series.tooltipPoints[inverted ? e.pageY - position.y - marginTop : e.pageX - position.x - marginLeft];
                    }
                    if (point && point != activePoint) {
                        if (activePoint) {
                            activePoint.firePointEvent("mouseOut");
                        }
                        point.firePointEvent("mouseOver");
                        if (tooltip) {
                            tooltip.refresh(point);
                        }
                        activePoint = point;
                    }
                }
            }

            function createImageMap() {
                var id = "highchartsMap" + canvasCounter++;
                chart.imagemap = imagemap = createElement("map", {
                    name: id,
                    id: id,
                    className: "highcharts-image-map"
                }, null, container);
                trackerImage = createElement("img", {
                    useMap: "#" + id
                }, {
                    width: plotWidth + PX,
                    height: plotHeight + PX,
                    left: marginLeft + PX,
                    top: marginTop + PX,
                    opacity: 0,
                    border: "none",
                    position: ABSOLUTE,
                    clip: "rect(1px," + plotWidth + "px," + plotHeight + "px,1px)",
                    zIndex: 9
                }, imagemap);
                if (!isIE) {
                    trackerImage.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
                }
            }

            function resetTracker() {
                if (tooltip) {
                    tooltip.hide();
                }
                if (chart.hoverSeries) {
                    chart.hoverSeries.setState();
                    chart.hoverSeries = null;
                    activePoint = null;
                }
            }

            function insertAtFront(area) {
                var before = 0,
                    i, childNodes = imagemap.childNodes;
                for (i = 0; i < childNodes.length; i++) {
                    if (childNodes[i].isLegendArea) {
                        before = i + 1;
                        break;
                    }
                }
                imagemap.insertBefore(area, childNodes[before]);
            }
            var activePoint, mouseDownX, mouseDownY, hasDragged, selectionMarker, zoomType = optionsChart.zoomType,
                zoomX = /x/.test(zoomType),
                zoomY = /y/.test(zoomType),
                zoomHor = zoomX && !inverted || zoomY && inverted,
                zoomVert = zoomY && !inverted || zoomX && inverted;
            createImageMap();
            if (options.enabled) {
                chart.tooltip = tooltip = Tooltip(options);
            }
            setDOMEvents();
            setInterval(function() {
                if (tooltipTick) {
                    tooltipTick();
                }
            }, 32);
            extend(this, {
                insertAtFront: insertAtFront,
                zoomX: zoomX,
                zoomY: zoomY,
                resetTracker: resetTracker
            });
        }
        var Legend = function(chart) {
            var options = chart.options.legend;
            if (!options.enabled) {
                return;
            }
            var li, layout = options.layout,
                symbolWidth = options.symbolWidth,
                dom, topRule = "#" + container.id + " .highcharts-legend li",
                allItems = [],
                legendLayer = new Layer("legend", container, null, {
                    zIndex: 7
                }),
                legendArea, series = chart.series,
                reversedLegend = options.reversed;
            this.dom = dom = createElement(DIV, {
                className: "highcharts-legend highcharts-legend-" + layout,
                innerHTML: '<ul style="margin:0;padding:0"></ul>'
            }, extend({
                position: ABSOLUTE,
                zIndex: 7
            }, options.style), container);
            addCSSRule(topRule, extend(options.itemStyle, {
                paddingLeft: (symbolWidth + options.symbolPadding) + PX,
                "float": layout == "horizontal" ? "left" : "none"
            }));
            addCSSRule(topRule + ":hover", options.itemHoverStyle);
            addCSSRule(topRule + "." + HIGHCHARTS_HIDDEN, options.itemHiddenStyle);
            addCSSRule(".highcharts-legend-horizontal li", {
                "float": "left"
            });
            renderHTML();
            drawGraphics();

            function renderHTML(clear) {
                if (clear) {
                    each(allItems, function(item) {
                        discardElement(item.legendItem);
                    });
                    allItems = [];
                }
                if (reversedLegend) {
                    series.reverse();
                }
                each(series, function(serie) {
                    if (!serie.options.showInLegend) {
                        return;
                    }
                    var items = (serie.options.legendType == "point") ? serie.data : [serie];
                    each(items, function(item) {
                        item.simpleSymbol = /(bar|pie|area|column)/.test(serie.type);
                        item.legendItem = li = createElement("li", {
                            innerHTML: options.labelFormatter.call(item),
                            className: item.visible ? "" : HIGHCHARTS_HIDDEN
                        }, null, dom.firstChild);
                        if (item.options && item.options.showCheckbox) {
                            item.checkbox = createElement("input", {
                                type: "checkbox",
                                checked: item.selected,
                                defaultChecked: item.selected
                            }, options.itemCheckboxStyle, li);
                        }
                        addEvent(li, "mouseover", function() {
                            item.setState("hover");
                        });
                        addEvent(li, "mouseout", function() {
                            item.setState();
                        });
                        addEvent(li, "click", function(event) {
                            var target = event.target,
                                strLegendItemClick = "legendItemClick",
                                fnLegendItemClick = function() {
                                    item.setVisible();
                                };
                            if (target.tagName == "INPUT") {
                                fireEvent(item, "checkboxClick", {
                                    checked: target.checked
                                }, function() {
                                    item.select();
                                });
                            } else {
                                if (item.firePointEvent) {
                                    item.firePointEvent(strLegendItemClick, event, fnLegendItemClick);
                                } else {
                                    fireEvent(item, strLegendItemClick, event, fnLegendItemClick);
                                }
                            }
                        });
                        allItems.push(item);
                    });
                });
                if (reversedLegend) {
                    series.reverse();
                }
            }

            function drawGraphics(clear) {
                if (clear) {
                    legendLayer.clear();
                    discardElement(legendArea);
                    legendArea = null;
                }
                if (series.length) {
                    if (options.borderWidth || options.backgroundColor) {
                        legendLayer.drawRect(dom.offsetLeft, dom.offsetTop, dom.offsetWidth, dom.offsetHeight, options.borderColor, options.borderWidth, options.borderRadius, options.backgroundColor, options.shadow);
                    }
                    each(allItems, function(item) {
                        if (!item.legendItem) {
                            return;
                        }
                        var li = item.legendItem,
                            symbolX = dom.offsetLeft + li.offsetLeft,
                            symbolY = dom.offsetTop + li.offsetTop + li.offsetHeight / 2,
                            markerOptions, isHidden = item.legendItem.className == HIGHCHARTS_HIDDEN,
                            color = isHidden ? options.itemHiddenStyle.color : item.color;
                        if (!item.simpleSymbol && item.options && item.options.lineWidth) {
                            legendLayer.drawLine(symbolX, symbolY, symbolX + symbolWidth, symbolY, color, item.options.lineWidth);
                        }
                        if (item.simpleSymbol) {
                            legendLayer.drawRect(symbolX, symbolY - 6, 16, 12, null, 0, 2, color);
                        } else {
                            if (item.options && item.options.marker && item.options.marker.enabled) {
                                item.drawMarker(legendLayer, symbolX + symbolWidth / 2, symbolY, merge(item.options.marker, isHidden ? {
                                    fillColor: color,
                                    lineColor: color
                                } : null));
                            }
                        }
                    });
                    if (imagemap) {
                        legendArea = createElement("area", {
                            shape: "rect",
                            isLegendArea: true,
                            coords: [dom.offsetLeft - marginLeft, dom.offsetTop - marginTop, dom.offsetLeft + dom.offsetWidth - marginLeft, dom.offsetTop + dom.offsetHeight - marginTop].join(",")
                        });
                        tracker.insertAtFront(legendArea);
                        legendArea.onmouseover = function(e) {
                            e = e || win.event;
                            var relatedTarget = e.relatedTarget || e.fromElement;
                            if (relatedTarget != dom && !mouseIsDown) {
                                if (tooltip) {
                                    tooltip.hide();
                                }
                                setStyles(dom, {
                                    zIndex: 10
                                });
                            }
                        };
                        dom.onmouseout = legendArea.onmouseout = function(e) {
                            e = e || win.event;
                            var relatedTarget = e.relatedTarget || e.toElement;
                            if (relatedTarget && (relatedTarget == trackerImage || (relatedTarget.tagName == "AREA" && relatedTarget != legendArea))) {
                                setStyles(dom, {
                                    zIndex: 7
                                });
                            }
                        };
                    }
                }
            }
            return {
                renderHTML: renderHTML,
                drawGraphics: drawGraphics
            };
        };

        function Tooltip(options) {
            var currentSeries, innerDiv, borderWidth = options.borderWidth,
                boxLayer;
            tooltipDiv = createElement(DIV, null, {
                position: ABSOLUTE,
                visibility: HIDDEN,
                overflow: HIDDEN,
                padding: "0 50px 5px 0",
                zIndex: 8
            }, container);
            boxLayer = new Layer("tooltip-box", tooltipDiv, null, {
                width: chartWidth + PX,
                height: chartHeight + PX
            });
            innerDiv = createElement(DIV, {
                className: "highcharts-tooltip"
            }, extend(options.style, {
                maxWidth: (chartWidth - 40) + PX,
                textOverflow: "ellipsis",
                position: RELATIVE,
                zIndex: 2
            }), tooltipDiv);

            function refresh(point, series) {
                var tooltipPos = point.tooltipPos,
                    series = point.series,
                    borderColor = options.borderColor || point.color || series.color || "#606060",
                    inverted = chart.inverted,
                    x, y, boxX, boxY, boxWidth, boxHeight, oldInnerDivHeight = innerDiv.offsetHeight,
                    show, text = point.tooltipText;
                currentSeries = series;
                x = tooltipPos ? tooltipPos[0] : (inverted ? plotWidth - point.plotY : point.plotX);
                y = tooltipPos ? tooltipPos[1] : (inverted ? plotHeight - point.plotX : point.plotY);
                if (x >= 0 && x <= plotWidth && y >= 0 && y <= plotHeight) {
                    show = true;
                }
                if (text === false || !show) {
                    hide();
                } else {
                    innerDiv.innerHTML = text;
                    setStyles(innerDiv, {
                        overflow: VISIBLE
                    });
                    boxWidth = innerDiv.offsetWidth - borderWidth;
                    boxHeight = innerDiv.offsetHeight - borderWidth;
                    setStyles(innerDiv, {
                        overflow: HIDDEN
                    });
                    if (boxWidth > (boxLayer.w || 0) + 20 || boxWidth < (boxLayer.w || 0) - 20 || boxHeight > boxLayer.h || boxLayer.c != borderColor || oldInnerDivHeight != innerDiv.offsetHeight) {
                        boxLayer.clear();
                        boxLayer.drawRect(borderWidth / 2, borderWidth / 2, boxWidth + 20, boxHeight, borderColor, borderWidth, options.borderRadius, options.backgroundColor, options.shadow);
                        extend(boxLayer, {
                            w: boxWidth,
                            h: boxHeight,
                            c: borderColor
                        });
                    }
                    boxX = x - boxLayer.w + marginLeft - 35;
                    boxY = y - boxLayer.h + 10 + marginTop;
                    if (boxX < 5) {
                        boxX = 5;
                        boxY -= 20;
                    }
                    if (boxY < 5) {
                        boxY = 5;
                    } else {
                        if (boxY + boxLayer.h > chartHeight) {
                            boxY = chartHeight - boxLayer.h - 5;
                        }
                    }
                    move(mathRound(boxX), mathRound(boxY));
                    series.drawPointState(point, "hover");
                    tooltipDiv.style.visibility = VISIBLE;
                }
            }

            function move(finalX, finalY) {
                var hidden = (tooltipDiv.style.visibility == HIDDEN),
                    x = hidden ? finalX : (tooltipDiv.offsetLeft + finalX) / 2,
                    y = hidden ? finalY : (tooltipDiv.offsetTop + finalY) / 2;
                setStyles(tooltipDiv, {
                    left: x + PX,
                    top: y + PX
                });
                if (mathAbs(finalX - x) > 1 || mathAbs(finalY - y) > 1) {
                    tooltipTick = function() {
                        move(finalX, finalY);
                    };
                } else {
                    tooltipTick = null;
                }
            }

            function hide() {
                if (tooltipDiv) {
                    tooltipDiv.style.visibility = HIDDEN;
                }
                if (currentSeries) {
                    currentSeries.drawPointState();
                }
            }
            return {
                refresh: refresh,
                hide: hide
            };
        }
        if (win.G_vmlCanvasManager) {
            win.G_vmlCanvasManager.init_(document);
        }
        defaultXAxisOptions = merge(defaultXAxisOptions, defaultOptions.xAxis);
        defaultYAxisOptions = merge(defaultYAxisOptions, defaultOptions.yAxis);
        defaultOptions.xAxis = defaultOptions.yAxis = null;
        options = merge(defaultOptions, options);
        var optionsChart = options.chart;
        var optionsMargin = optionsChart.margin,
            margin = typeof optionsMargin == "number" ? [optionsMargin, optionsMargin, optionsMargin, optionsMargin] : optionsMargin,
            marginTop = margin[0],
            marginRight = margin[1],
            marginBottom = margin[2],
            marginLeft = margin[3],
            renderTo, renderToClone, container, containerId, chartWidth, chartHeight;
        getContainer();
        var chart = this,
            chartEvents = optionsChart.events,
            eventType, imagemap, tooltip, mouseIsDown, backgroundLayer = new Layer("chart-background", container),
            loadingLayer, plotLayer, plotHeight, plotWidth, tracker, trackerImage, legend, position = getPosition(container),
            hasCartesianSeries = optionsChart.showAxes,
            axes = [],
            maxTicks, series = [],
            resourcesLoaded, plotBackground, inverted, tooltipTick, tooltipDiv;
        colorCounter = 0;
        symbolCounter = 0;
        addEvent(win, "resize", updatePosition);
        addEvent(win, "unload", destroy);
        if (chartEvents) {
            for (eventType in chartEvents) {
                addEvent(chart, eventType, chartEvents[eventType]);
            }
        }
        chart.addLoading = function(loadingId) {
            chart.resources[loadingId] = false;
        };
        chart.clearLoading = function(loadingId) {
            chart.resources[loadingId] = true;
            checkResources();
        };
        chart.options = options;
        chart.series = series;
        chart.container = container;
        chart.resources = {};
        chart.inverted = inverted = options.chart.inverted;
        chart.chartWidth = chartWidth;
        chart.chartHeight = chartHeight;
        chart.plotWidth = plotWidth = chartWidth - marginLeft - marginRight;
        chart.plotHeight = plotHeight = chartHeight - marginTop - marginBottom;
        chart.plotLeft = marginLeft;
        chart.plotTop = marginTop;
        chart.redraw = redraw;
        chart.addSeries = addSeries;
        chart.getSelectedPoints = getSelectedPoints;
        chart.getSelectedSeries = getSelectedSeries;
        chart.showLoading = showLoading;
        chart.hideLoading = hideLoading;
        chart.get = get;
        chart.destroy = destroy;
        chart.updatePosition = updatePosition;
        chart.plotLayer = plotLayer = new Layer("plot", container, null, {
            position: ABSOLUTE,
            width: plotWidth + PX,
            height: plotHeight + PX,
            left: marginLeft + PX,
            top: marginTop + PX,
            overflow: HIDDEN,
            zIndex: 3
        });
        if (optionsChart.plotBackgroundImage) {
            chart.addLoading("plotBack");
            plotBackground = createElement("img");
            plotBackground.onload = function() {
                chart.clearLoading("plotBack");
            };
            plotBackground.src = optionsChart.plotBackgroundImage;
        }
        each(options.series || [], function(serieOptions) {
            initSeries(serieOptions);
        });
        chart.tracker = tracker = new MouseTracker(chart, options.tooltip);
        checkResources();
    }
    var Point = function() {};
    Point.prototype = {
        init: function(series, options) {
            var point = this;
            point.series = series;
            point.applyOptions(options);
            return point;
        },
        applyOptions: function(options) {
            var point = this,
                series = point.series,
                n;
            if (typeof options == "number" || options === null) {
                point.y = options;
            } else {
                if (typeof options == "object" && typeof options.length != "number") {
                    extend(point, options);
                    point.options = options;
                } else {
                    if (typeof options[0] == "string") {
                        point.name = options[0];
                        point.y = options[1];
                    } else {
                        if (typeof options[0] == "number") {
                            point.x = options[0];
                            point.y = options[1];
                        }
                    }
                }
            }
            if (point.x === undefined) {
                point.x = series.autoIncrement();
            }
        },
        destroy: function() {
            var point = this;
            if (point.stateLayer) {
                point.stateLayer.destroy();
            }
            for (prop in point) {
                point[prop] = null;
            }
        },
        select: function(selected, accumulate) {
            var point = this,
                series = point.series,
                chart = series.chart,
                stateLayers, state, singlePointLayer = pick(point.stateLayer, series.singlePointLayer, chart.singlePointLayer);
            point.selected = selected = pick(selected, !point.selected);
            series.isDirty = true;
            point.firePointEvent(selected ? "select" : "unselect");
            if (singlePointLayer) {
                singlePointLayer.clear();
            }
            each(chart.series, function(series) {
                stateLayers = series.stateLayers;
                if (!accumulate) {
                    each(series.data, function(loopPoint) {
                        if (loopPoint.selected && loopPoint != point) {
                            loopPoint.selected = false;
                            fireEvent(loopPoint, "unselect");
                            series.isDirty = true;
                        }
                    });
                }
                if (series.isDirty) {
                    for (state in stateLayers) {
                        stateLayers[state].clear();
                    }
                    series.render();
                }
            });
        },
        update: function(options, redraw) {
            var point = this,
                series = point.series;
            redraw = pick(redraw, true);
            point.firePointEvent("update", {
                options: options
            }, function() {
                point.applyOptions(options);
                series.isDirty = true;
                if (redraw) {
                    series.chart.redraw();
                }
            });
        },
        remove: function(redraw) {
            var point = this,
                series = point.series,
                chart = series.chart,
                data = series.data;
            redraw = pick(redraw, true);
            point.firePointEvent("remove", null, function() {
                each(data, function(existingPoint, i) {
                    if (existingPoint == point) {
                        data.splice(i, 1);
                    }
                });
                if (point.layer) {
                    point.layer = point.layer.destroy();
                }
                if (point.legendItem) {
                    discardElement(point.legendItem);
                    point.legendItem = null;
                    chart.isDirty = true;
                }
                series.isDirty = true;
                if (redraw) {
                    chart.redraw();
                }
            });
        },
        firePointEvent: function(eventType, eventArgs, defaultFunction) {
            var point = this,
                series = this.series,
                seriesOptions = series.options;
            if (seriesOptions.point.events[eventType] || (point.options && point.options.events && point.options.events[eventType])) {
                this.importEvents();
            }
            if (eventType == "click" && seriesOptions.allowPointSelect) {
                defaultFunction = function(event) {
                    point.select(null, event.ctrlKey || event.metaKey || event.shiftKey);
                };
            }
            fireEvent(this, eventType, eventArgs, defaultFunction);
        },
        importEvents: function() {
            if (!this.hasImportedEvents) {
                var point = this,
                    options = merge(point.series.options.point, point.options),
                    events = options.events,
                    eventType;
                point.events = events;
                for (eventType in events) {
                    addEvent(point, eventType, events[eventType]);
                }
                this.hasImportedEvents = true;
            }
        },
        setTooltipText: function() {
            var point = this;
            point.tooltipText = point.series.chart.options.tooltip.formatter.call({
                series: point.series,
                point: point,
                x: point.category,
                y: point.y,
                percentage: point.percentage,
                total: point.total || point.stackTotal
            });
        }
    };
    var Series = function() {
        this.isCartesian = true;
        this.type = "line";
        this.pointClass = Point;
    };
    Series.prototype = {
        init: function(chart, options) {
            var series = this,
                eventType, events, pointEvent, index = chart.series.length;
            series.chart = chart;
            options = series.setOptions(options);
            extend(series, {
                index: index,
                options: options,
                name: options.name || "Series " + (index + 1),
                state: "",
                visible: options.visible !== false,
                selected: options.selected == true
            });
            events = options.events;
            for (eventType in events) {
                addEvent(series, eventType, events[eventType]);
            }
            series.getColor();
            series.getSymbol();
            series.getData(options);
        },
        getData: function(options) {
            var series = this,
                chart = series.chart,
                loadingId = "series" + idCounter++;
            if (!options.data && options.dataURL) {
                chart.addLoading(loadingId);
                getAjax(options.dataURL, function(data) {
                    series.dataLoaded(data);
                    chart.clearLoading(loadingId);
                });
            } else {
                series.dataLoaded(options.data);
            }
        },
        dataLoaded: function(data) {
            var series = this,
                chart = series.chart,
                options = series.options,
                enabledStates = [""],
                dataParser = options.dataParser,
                stateLayers = {},
                layerGroup, point, x;
            if (options.dataURL && !dataParser) {
                dataParser = function(data) {
                    return eval(data);
                };
            }
            if (dataParser) {
                data = dataParser.call(series, data);
            }
            series.layerGroup = layerGroup = new Layer("series-group", chart.plotLayer.div, null, {
                zIndex: 2
            });
            if (options.states.hover.enabled) {
                enabledStates.push("hover");
            }
            each(enabledStates, function(state) {
                stateLayers[state] = new Layer("state-" + state, layerGroup.div);
            });
            series.stateLayers = stateLayers;
            series.setData(data, false);
        },
        autoIncrement: function() {
            var series = this,
                options = series.options,
                xIncrement = series.xIncrement;
            xIncrement = pick(xIncrement, options.pointStart, 0);
            series.pointInterval = pick(series.pointInterval, options.pointInterval, 1);
            series.xIncrement = xIncrement + series.pointInterval;
            return xIncrement;
        },
        cleanData: function() {
            var series = this,
                data = series.data,
                i;
            data.sort(function(a, b) {
                return (a.x - b.x);
            });
            for (i = data.length - 1; i >= 0; i--) {
                if (data[i - 1]) {
                    if (data[i - 1].x == data[i].x) {
                        data.splice(i - 1, 1);
                    }
                }
            }
        },
        getSegments: function() {
            var lastNull = -1,
                segments = [],
                data = this.data;
            each(data, function(point, i) {
                if (point.y === null) {
                    if (i > lastNull + 1) {
                        segments.push(data.slice(lastNull + 1, i));
                    }
                    lastNull = i;
                } else {
                    if (i == data.length - 1) {
                        segments.push(data.slice(lastNull + 1, i + 1));
                    }
                }
            });
            this.segments = segments;
        },
        setOptions: function(options) {
            var plotOptions = this.chart.options.plotOptions,
                options = merge(plotOptions[this.type], plotOptions.series, options),
                normalSeriesMarkerOptions = options.marker,
                hoverSeriesMarkerOptions = options.states.hover.marker;
            if (hoverSeriesMarkerOptions.lineWidth === undefined) {
                hoverSeriesMarkerOptions.lineWidth = normalSeriesMarkerOptions.lineWidth + 1;
            }
            if (hoverSeriesMarkerOptions.radius === undefined) {
                hoverSeriesMarkerOptions.radius = normalSeriesMarkerOptions.radius + 1;
            }
            return options;
        },
        getColor: function() {
            var defaultColors = this.chart.options.colors;
            this.color = this.options.color || defaultColors[colorCounter++] || "#0000ff";
            if (colorCounter >= defaultColors.length) {
                colorCounter = 0;
            }
        },
        getSymbol: function() {
            var defaultSymbols = this.chart.options.symbols,
                symbol = this.options.marker.symbol || "auto";
            if (symbol == "auto") {
                symbol = defaultSymbols[symbolCounter++];
            }
            this.symbol = symbol;
            if (symbolCounter >= defaultSymbols.length) {
                symbolCounter = 0;
            }
        },
        addPoint: function(options, redraw, shift) {
            var series = this,
                data = series.data,
                point = (new series.pointClass).init(series, options);
            redraw = pick(redraw, true);
            data.push(point);
            if (shift) {
                data.shift();
            }
            series.isDirty = true;
            if (redraw) {
                series.chart.redraw();
            }
        },
        setData: function(data, redraw) {
            var series = this;
            series.xIncrement = null;
            data = map(splat(data), function(pointOptions) {
                return (new series.pointClass).init(series, pointOptions);
            });
            series.data = data;
            series.cleanData();
            series.getSegments();
            series.isDirty = true;
            if (pick(redraw, true)) {
                series.chart.redraw();
            }
        },
        remove: function(redraw) {
            var series = this,
                chart = series.chart;
            redraw = pick(redraw, true);
            if (!series.isRemoving) {
                series.isRemoving = true;
                fireEvent(series, "remove", null, function() {
                    discardElement(series.layerGroup.div);
                    each(series.areas, function(area) {
                        discardElement(area);
                    });
                    discardElement(series.legendItem);
                    series.legendItem = null;
                    each(chart.series, function(existingSeries, i) {
                        if (existingSeries == series) {
                            chart.series.splice(i, 1);
                        }
                    });
                    chart.isDirty = true;
                    if (redraw) {
                        chart.redraw();
                    }
                });
            }
            series.isRemoving = false;
        },
        translate: function() {
            var chart = this.chart,
                series = this,
                stacking = series.options.stacking,
                categories = series.xAxis.categories,
                yAxis = series.yAxis,
                stack = yAxis.stacks[series.type];
            each(this.data, function(point) {
                var xValue = point.x,
                    yValue = point.y,
                    yBottom, pointStack, pointStackTotal;
                point.plotX = series.xAxis.translate(point.x);
                if (stacking && series.visible && stack[xValue]) {
                    pointStack = stack[xValue];
                    pointStackTotal = pointStack.total;
                    pointStack.cum = yBottom = pointStack.cum - yValue;
                    yValue = yBottom + yValue;
                    if (stacking == "percent") {
                        yBottom = pointStackTotal ? yBottom * 100 / pointStackTotal : 0;
                        yValue = pointStackTotal ? yValue * 100 / pointStackTotal : 0;
                    }
                    point.percentage = pointStackTotal ? point.y * 100 / pointStackTotal : 0;
                    point.stackTotal = pointStackTotal;
                    point.yBottom = yAxis.translate(yBottom, 0, 1);
                }
                if (yValue !== null) {
                    point.plotY = yAxis.translate(yValue, 0, 1);
                }
                point.clientX = chart.inverted ? chart.plotHeight - point.plotX + chart.plotTop : point.plotX + chart.plotLeft;
                point.category = categories && categories[point.x] !== undefined ? categories[point.x] : point.x;
            });
        },
        setTooltipPoints: function(renew) {
            var series = this,
                chart = series.chart,
                inverted = chart.inverted,
                data = [],
                plotSize = inverted ? chart.plotHeight : chart.plotWidth,
                low, high, tooltipPoints = [];
            if (renew) {
                series.tooltipPoints = null;
            }
            each(series.segments, function(segment) {
                data = data.concat(segment);
            });
            if (series.xAxis && series.xAxis.reversed) {
                data = data.reverse();
            }
            each(data, function(point, i) {
                if (!series.tooltipPoints) {
                    point.setTooltipText();
                }
                low = data[i - 1] ? data[i - 1].high + 1 : 0;
                high = point.high = data[i + 1] ? (mathFloor((point.plotX + (data[i + 1] ? data[i + 1].plotX : plotSize)) / 2)) : plotSize;
                while (low <= high) {
                    tooltipPoints[inverted ? plotSize - low++ : low++] = point;
                }
            });
            series.tooltipPoints = tooltipPoints;
        },
        drawLine: function(state) {
            var i, j, series = this,
                options = series.options,
                chart = series.chart,
                doAnimation = options.animation && series.animate,
                layer = series.stateLayers[state],
                data = series.data,
                color, fillColor, inverted = chart.inverted,
                y0 = (inverted ? 0 : chart.plotHeight) - series.yAxis.translate(0);
            if (state) {
                options = merge(options, options.states[state]);
            }
            color = options.lineColor || series.color;
            fillColor = options.fillColor == "auto" ? Color(series.color).setOpacity(options.fillOpacity || 0.75).get() : options.fillColor;
            if (doAnimation) {
                series.animate(true);
            }
            each(series.segments, function(segment) {
                var line = [],
                    area = [];
                each(segment, function(point, i) {
                    if (i && options.step) {
                        var lastPoint = segment[i - 1];
                        line.push(inverted ? chart.plotWidth - lastPoint.plotY : point.plotX, inverted ? chart.plotHeight - point.plotX : lastPoint.plotY);
                    }
                    line.push(inverted ? chart.plotWidth - point.plotY : point.plotX, inverted ? chart.plotHeight - point.plotX : point.plotY);
                });
                if (/area/.test(series.type)) {
                    for (i = 0; i < line.length; i++) {
                        area.push(line[i]);
                    }
                    if (options.stacking && series.type != "areaspline") {
                        for (i = segment.length - 1; i >= 0; i--) {
                            area.push(segment[i].plotX, segment[i].yBottom);
                        }
                    } else {
                        if (segment.length) {
                            area.push(inverted ? y0 : segment[segment.length - 1].plotX, inverted ? chart.plotHeight - segment[segment.length - 1].plotX : y0, inverted ? y0 : segment[0].plotX, inverted ? chart.plotHeight - segment[0].plotX : y0);
                        }
                    }
                    layer.drawPolyLine(area, null, null, options.shadow, fillColor);
                }
                if (options.lineWidth) {
                    layer.drawPolyLine(line, color, options.lineWidth, options.shadow);
                }
            });
            if (doAnimation) {
                series.animate();
            }
        },
        animate: function(init) {
            var series = this,
                chart = series.chart,
                inverted = chart.inverted,
                div = series.layerGroup.div;
            if (series.visible) {
                if (init) {
                    setStyles(div, extend({
                        overflow: HIDDEN
                    }, inverted ? {
                        height: 0
                    } : {
                        width: 0
                    }));
                } else {
                    animate(div, inverted ? {
                        height: chart.plotHeight + PX
                    } : {
                        width: chart.plotWidth + PX
                    }, {
                        duration: 1000
                    });
                    this.animate = null;
                }
            }
        },
        drawPoints: function(state) {
            var series = this,
                i, layer = series.stateLayers[state],
                seriesOptions = series.options,
                markerOptions = seriesOptions.marker,
                data = series.data,
                chart = series.chart,
                inverted = chart.inverted;
            if (markerOptions.enabled) {
                each(data, function(point) {
                    if (point.plotY !== undefined) {
                        series.drawMarker(layer, inverted ? chart.plotWidth - point.plotY : point.plotX, inverted ? chart.plotHeight - point.plotX : point.plotY, merge(markerOptions, point.marker));
                    }
                    if (point.selected) {
                        series.drawPointState(point, "select", layer);
                    }
                });
            }
        },
        drawMarker: function(layer, x, y, options) {
            if (options.lineColor == "auto") {
                options.lineColor = this.color;
            }
            if (options.fillColor == "auto") {
                options.fillColor = this.color;
            }
            if (options.symbol == "auto") {
                options.symbol = this.symbol;
            }
            layer.drawSymbol(options.symbol, x, y, options.radius, options.lineWidth, options.lineColor, options.fillColor);
        },
        drawDataLabels: function() {
            if (this.options.dataLabels.enabled) {
                var series = this,
                    i, x, y, data = series.data,
                    options = series.options.dataLabels,
                    color, str, dataLabelsLayer = series.dataLabelsLayer,
                    chart = series.chart,
                    inverted = chart.inverted,
                    seriesType = series.type,
                    isPie = (seriesType == "pie"),
                    align;
                if (dataLabelsLayer) {
                    dataLabelsLayer.clear();
                } else {
                    series.dataLabelsLayer = dataLabelsLayer = new Layer("data-labels", series.layerGroup.div, null, {
                        zIndex: 1
                    });
                }
                options.style.color = pick(options.style.color, series.color);
                each(data, function(point) {
                    var plotX = point.plotX,
                        plotY = point.plotY,
                        tooltipPos = point.tooltipPos;
                    str = options.formatter.call({
                        x: point.x,
                        y: point.y,
                        series: series,
                        point: point,
                        percentage: point.percentage,
                        total: point.total || point.stackTotal
                    });
                    x = (inverted ? chart.plotWidth - plotY : plotX) + options.x;
                    y = (inverted ? chart.plotHeight - plotX : plotY) + options.y;
                    if (tooltipPos) {
                        x = tooltipPos[0] + options.x;
                        y = tooltipPos[1] + options.y;
                    }
                    if (isPie) {
                        if (!point.dataLabelsLayer) {
                            point.dataLabelsLayer = new Layer("data-labels", point.layer.div, null, {
                                zIndex: 3
                            });
                        }
                        dataLabelsLayer = point.dataLabelsLayer;
                    }
                    align = options.align;
                    if (seriesType == "column") {
                        x += {
                            center: point.w / 2,
                            right: point.w
                        }[align] || 0;
                    }
                    if (str) {
                        dataLabelsLayer[isPie ? "drawText" : "addText"](str, x, y, options.style, options.rotation, align);
                    }
                });
                if (!isPie) {
                    dataLabelsLayer.strokeText();
                }
            }
        },
        drawPointState: function(point, state, layer) {
            var chart = this.chart,
                inverted = chart.inverted,
                isHoverState = state == "hover",
                layer = layer || chart.singlePointLayer,
                options = this.options,
                stateOptions;
            if (isHoverState) {
                if (!layer) {
                    layer = chart.singlePointLayer = new Layer("single-point", chart.plotLayer.div, null, {
                        zIndex: 3
                    });
                }
                layer.clear();
            }
            if (state) {
                var seriesStateOptions = options.states[state].marker,
                    pointStateOptions = options.marker.states[state];
                if (isHoverState && pointStateOptions.radius === undefined) {
                    pointStateOptions.radius = seriesStateOptions.radius + 2;
                }
                stateOptions = merge(options.marker, point.marker, seriesStateOptions, pointStateOptions);
                if (stateOptions && stateOptions.enabled) {
                    this.drawMarker(layer, inverted ? chart.plotWidth - point.plotY : point.plotX, inverted ? chart.plotHeight - point.plotX : point.plotY, stateOptions);
                }
            }
        },
        destroy: function() {
            var series = this,
                prop;
            each(series.data, function(point) {
                point.destroy();
            });
            for (prop in series) {
                series[prop] = null;
            }
        },
        render: function() {
            var series = this,
                state, stateLayers = series.stateLayers;
            series.drawDataLabels();
            if (series.visible) {
                for (state in stateLayers) {
                    series.drawLine(state);
                    series.drawPoints(state);
                }
            } else {
                series.setVisible(false, false);
            }
            if (!series.hasRendered && stateLayers.hover) {
                stateLayers.hover.hide();
                hasRendered = true;
            }
            series.isDirty = false;
        },
        redraw: function() {
            var series = this;
            series.translate();
            series.setTooltipPoints(true);
            series.createArea();
            series.clear();
            series.render();
        },
        clear: function() {
            var stateLayers = this.stateLayers;
            for (var state in stateLayers) {
                stateLayers[state].clear();
                stateLayers[state].cleared = true;
            }
            if (this.dataLabelsLayer) {
                this.dataLabelsLayer.clear();
                this.hasDrawnDataLabels = false;
            }
        },
        setState: function(state) {
            state = state || "";
            if (this.state != state) {
                var series = this,
                    stateLayers = series.stateLayers,
                    newStateLayer = stateLayers[state],
                    oldStateLayer = stateLayers[series.state],
                    singlePointLayer = series.singlePointLayer || series.chart.singlePointLayer;
                series.state = state;
                if (newStateLayer) {
                    if (state) {
                        newStateLayer.show();
                    } else {
                        if (oldStateLayer) {
                            oldStateLayer.hide();
                        }
                        if (singlePointLayer) {
                            singlePointLayer.clear();
                        }
                    }
                }
            }
        },
        setVisible: function(vis, redraw) {
            var series = this,
                chart = series.chart,
                layerGroup = series.layerGroup,
                legendItem = series.legendItem,
                areas = series.areas,
                oldVisibility = series.visible;
            series.visible = vis = vis === undefined ? !oldVisibility : vis;
            if (vis) {
                series.isDirty = true;
                layerGroup.show();
            } else {
                layerGroup.hide();
            }
            if (legendItem) {
                legendItem.className = vis ? "" : HIGHCHARTS_HIDDEN;
                chart.legend.drawGraphics(true);
            }
            if (areas) {
                each(areas, function(area) {
                    if (vis) {
                        chart.tracker.insertAtFront(area);
                    } else {
                        discardElement(area);
                    }
                });
            }
            if (chart.options.chart.ignoreHiddenSeries) {
                if (series.options.stacking) {
                    each(chart.series, function(otherSeries) {
                        if (otherSeries.options.stacking && otherSeries.visible) {
                            otherSeries.isDirty = true;
                        }
                    });
                }
            }
            if (redraw !== false) {
                chart.redraw();
            }
            fireEvent(series, vis ? "show" : "hide");
        },
        show: function() {
            this.setVisible(true);
        },
        hide: function() {
            this.setVisible(false);
        },
        select: function(selected) {
            var series = this;
            series.selected = selected = (selected === undefined) ? !series.selected : selected;
            if (series.checkbox) {
                series.checkbox.checked = selected;
            }
            fireEvent(series, selected ? "select" : "unselect");
        },
        getAreaCoords: function() {
            var data = this.data,
                series = this,
                datas = [],
                chart = this.chart,
                inverted = chart.inverted,
                plotWidth = chart.plotWidth,
                plotHeight = chart.plotHeight,
                reversedXAxis = series.xAxis.reversed,
                reversedData, snap = chart.options.tooltip.snap,
                dataIsReverse, i = 0,
                ret = [];
            each(series.splinedata || series.segments, function(data, i) {
                reversedData = data.length > 1 && data[0].x > data[1].x;
                if (reversedData && !reversedXAxis || reversedXAxis && !reversedData) {
                    data = data.reverse();
                }
                var coords = [],
                    outlineTop = [],
                    outlineBottom = [];
                each([outlineTop, outlineBottom], function(outline) {
                    var last = 0,
                        i = 0,
                        extreme, slice, peaks = [data[0]],
                        sign = outline == outlineTop ? 1 : -1,
                        intersects, num, x, y, lastX, lastY, x1, y1, x2, y2, dX, dY, pX, pY, l, factor, p1, p2, mA, mB, iX, iY, area;
                    while (data[i]) {
                        if (data[i].plotX > data[last].plotX + snap || i == data.length - 1) {
                            extreme = data[i];
                            slice = data.slice(last, i - 1);
                            each(slice, function(point) {
                                if (sign * point.plotY < sign * extreme.plotY) {
                                    extreme = point;
                                }
                            });
                            if (mathRound(data[last].plotX) < mathRound(extreme.plotX) || data[i].plotX > data[last].plotX + snap) {
                                peaks.push(extreme);
                            }
                            last = i;
                        }
                        i++;
                    }
                    if (peaks[peaks.length - 1] != data[data.length - 1]) {
                        peaks.push(data[data.length - 1]);
                    }
                    for (i = 0; i < peaks.length; i++) {
                        if (i > 0) {
                            x = peaks[i].plotX;
                            y = peaks[i].plotY;
                            lastX = peaks[i - 1].plotX;
                            lastY = peaks[i - 1].plotY;
                            dX = x - peaks[i - 1].plotX;
                            dY = y - peaks[i - 1].plotY;
                            pX = dY;
                            pY = -dX;
                            l = math.sqrt(math.pow(pX, 2) + math.pow(pY, 2));
                            if (i == 1) {
                                lastX -= (snap / l) * dX;
                                lastY -= (snap / l) * dY;
                            } else {
                                if (i == peaks.length - 1) {
                                    x += (snap / l) * dX;
                                    y += (snap / l) * dY;
                                }
                            }
                            factor = sign * snap / l;
                            x1 = mathRound(lastX + factor * pX);
                            y1 = mathRound(lastY + factor * pY);
                            x2 = mathRound(x + factor * pX);
                            y2 = mathRound(y + factor * pY);
                            if (outline[outline.length - 1] && outline[outline.length - 1][0] > x1) {
                                intersects = false;
                                while (!intersects) {
                                    p2 = outline.pop();
                                    p1 = outline[outline.length - 1];
                                    if (!p1) {
                                        break;
                                    }
                                    mA = (y1 - y2) / (x1 - x2);
                                    mB = (p1[1] - p2[1]) / (p1[0] - p2[0]);
                                    iX = ((-mB * p1[0]) + p1[1] + (mA * x1) - y1) / (mA - mB);
                                    iY = (mA * (iX - x1)) + y1;
                                    if (iX > p1[0]) {
                                        outline.push([mathRound(iX), mathRound(iY), 1]);
                                        intersects = true;
                                    }
                                }
                            } else {
                                if (!isNaN(x1)) {
                                    outline.push([x1, y1]);
                                }
                            }
                            if (outline[outline.length - 1] && outline[outline.length - 1][0] < x2) {
                                outline.push([x2, y2]);
                            }
                        }
                    }
                });
                for (i = 0; i < outlineTop.length; i++) {
                    coords.push(inverted ? plotWidth - outlineTop[i][1] : outlineTop[i][0], inverted ? plotHeight - outlineTop[i][0] : outlineTop[i][1]);
                }
                for (i = outlineBottom.length - 1; i >= 0; i--) {
                    coords.push(inverted ? plotWidth - outlineBottom[i][1] : outlineBottom[i][0], inverted ? plotHeight - outlineBottom[i][0] : outlineBottom[i][1]);
                }
                if (!coords.length && data.length) {
                    coords.push(mathRound(data[0].plotX), mathRound(data[0].plotY));
                }
                if (coords.length) {
                    ret.push([coords.join(",")]);
                }
            });
            return ret;
        },
        createArea: function() {
            if (this.options.enableMouseTracking === false) {
                return;
            }
            var area, series = this,
                options = series.options,
                chart = series.chart,
                inverted = chart.inverted,
                tracker = chart.tracker,
                coordsArray = series.getAreaCoords(),
                firstArea, seriesAreas = [],
                existingAreas = series.areas,
                isCircle;
            if (existingAreas) {
                each(existingAreas, function(area) {
                    discardElement(area);
                });
            }
            each(coordsArray, function(coords) {
                isCircle = /^[0-9]+,[0-9]+$/.test(coords[0]);
                area = createElement("area", {
                    shape: isCircle ? "circle" : "poly",
                    chart: chart,
                    coords: coords[0] + (isCircle ? "," + chart.options.tooltip.snap : ""),
                    onmouseover: function(e) {
                        if (!series.visible || chart.mouseIsDown) {
                            return;
                        }
                        var hoverSeries = chart.hoverSeries;
                        chart.hoverPoint = coords[1];
                        if (options.events.mouseOver) {
                            fireEvent(series, "mouseOver", {
                                point: chart.hoverPoint
                            });
                        }
                        if (hoverSeries && hoverSeries != series) {
                            hoverSeries.setState();
                        }
                        if (!/(column|bar|pie)/.test(series.type)) {
                            tracker.insertAtFront(area);
                        }
                        series.setState("hover");
                        chart.hoverSeries = series;
                    },
                    onmouseout: function() {
                        var hoverSeries = chart.hoverSeries;
                        if (hoverSeries && options.events.mouseOut) {
                            fireEvent(hoverSeries, "mouseOut");
                        }
                    }
                });
                if (options.cursor == "pointer") {
                    area.href = "javascript:;";
                }
                tracker.insertAtFront(area);
                seriesAreas.push(area);
            });
            series.areas = seriesAreas;
        }
    };
    var LineSeries = extendClass(Series);
    seriesTypes.line = LineSeries;
    var AreaSeries = extendClass(Series, {
        type: "area"
    });
    seriesTypes.area = AreaSeries;
    var SplineSeries = extendClass(Series, {
        type: "spline",
        translate: function() {
            var series = this;
            Series.prototype.translate.apply(series, arguments);
            series.splinedata = series.getSplineData();
        },
        drawLine: function(state) {
            var series = this,
                realSegments = series.segments;
            series.segments = series.splinedata;
            Series.prototype.drawLine.apply(series, arguments);
            series.segments = realSegments;
        },
        getSplineData: function() {
            var series = this,
                chart = series.chart,
                splinedata = [],
                num;
            each(series.segments, function(data) {
                if (series.xAxis.reversed) {
                    data = data.reverse();
                }
                var croppedData = [],
                    nextUp, nextDown;
                each(data, function(point, i) {
                    nextUp = data[i + 2] || data[i + 1] || point;
                    nextDown = data[i - 2] || data[i - 1] || point;
                    if (nextUp.plotX > 0 && nextDown.plotX < chart.plotWidth) {
                        croppedData.push(point);
                    }
                });
                if (croppedData.length > 1) {
                    num = mathRound(mathMax(chart.plotWidth, croppedData[croppedData.length - 1].clientX - croppedData[0].clientX) / 3);
                }
                splinedata.push(data.length > 1 ? num ? (new SplineHelper(croppedData)).get(num) : [] : data);
            });
            series.splinedata = splinedata;
            return splinedata;
        }
    });
    seriesTypes.spline = SplineSeries;

    function SplineHelper(data) {
        var xdata = [];
        var ydata = [];
        for (var i = 0; i < data.length; i++) {
            xdata[i] = data[i].plotX;
            ydata[i] = data[i].plotY;
        }
        this.xdata = xdata;
        this.ydata = ydata;
        var delta = [];
        this.y2 = [];
        var n = ydata.length;
        this.n = n;
        this.y2[0] = 0;
        this.y2[n - 1] = 0;
        delta[0] = 0;
        for (var i = 1; i < n - 1; i++) {
            var d = (xdata[i + 1] - xdata[i - 1]);
            var s = (xdata[i] - xdata[i - 1]) / d;
            var p = s * this.y2[i - 1] + 2;
            this.y2[i] = (s - 1) / p;
            delta[i] = (ydata[i + 1] - ydata[i]) / (xdata[i + 1] - xdata[i]) - (ydata[i] - ydata[i - 1]) / (xdata[i] - xdata[i - 1]);
            delta[i] = (6 * delta[i] / (xdata[i + 1] - xdata[i - 1]) - s * delta[i - 1]) / p;
        }
        for (var j = n - 2; j >= 0; j--) {
            this.y2[j] = this.y2[j] * this.y2[j + 1] + delta[j];
        }
    }
    SplineHelper.prototype = {
        get: function(num) {
            if (!num) {
                num = 50;
            }
            var n = this.n;
            var step = (this.xdata[n - 1] - this.xdata[0]) / (num - 1);
            var xnew = [];
            var ynew = [];
            xnew[0] = this.xdata[0];
            ynew[0] = this.ydata[0];
            var data = [{
                plotX: xnew[0],
                plotY: ynew[0]
            }];
            for (var j = 1; j < num; j++) {
                xnew[j] = xnew[0] + j * step;
                ynew[j] = this.interpolate(xnew[j]);
                data[j] = {
                    plotX: xnew[j],
                    plotY: ynew[j]
                };
            }
            return data;
        },
        interpolate: function(xpoint) {
            var max = this.n - 1;
            var min = 0;
            while (max - min > 1) {
                var k = (max + min) / 2;
                if (this.xdata[mathFloor(k)] > xpoint) {
                    max = k;
                } else {
                    min = k;
                }
            }
            var intMax = mathFloor(max),
                intMin = mathFloor(min);
            var h = this.xdata[intMax] - this.xdata[intMin];
            var a = (this.xdata[intMax] - xpoint) / h;
            var b = (xpoint - this.xdata[intMin]) / h;
            return a * this.ydata[intMin] + b * this.ydata[intMax] + ((a * a * a - a) * this.y2[intMin] + (b * b * b - b) * this.y2[intMax]) * (h * h) / 6;
        }
    };
    var AreaSplineSeries = extendClass(SplineSeries, {
        type: "areaspline"
    });
    seriesTypes.areaspline = AreaSplineSeries;
    var ColumnSeries = extendClass(Series, {
        type: "column",
        init: function() {
            Series.prototype.init.apply(this, arguments);
            var series = this,
                chart = series.chart;
            if (chart.hasRendered) {
                each(chart.series, function(otherSeries) {
                    if (otherSeries.type == series.type) {
                        otherSeries.isDirty = true;
                    }
                });
            }
        },
        translate: function() {
            var series = this,
                chart = series.chart,
                columnCount = 0,
                categories = series.xAxis.categories,
                stackedIndex;
            Series.prototype.translate.apply(series);
            each(chart.series, function(otherSeries) {
                if (otherSeries.type == series.type) {
                    if (!otherSeries.options.stacking) {
                        otherSeries.columnIndex = columnCount++;
                    } else {
                        if (!defined(stackedIndex)) {
                            stackedIndex = columnCount++;
                        }
                        otherSeries.columnIndex = stackedIndex;
                    }
                }
            });
            var options = series.options,
                data = series.data,
                inverted = chart.inverted,
                plotWidth = chart.plotWidth,
                plotHeight = chart.plotHeight,
                closestPoints = series.closestPoints,
                categoryWidth = mathAbs(data[1] ? data[closestPoints].plotX - data[closestPoints - 1].plotX : (inverted ? plotHeight : plotWidth) / (categories ? categories.length : 1)),
                groupPadding = categoryWidth * options.groupPadding,
                groupWidth = categoryWidth - 2 * groupPadding,
                pointOffsetWidth = groupWidth / columnCount,
                optionPointWidth = options.pointWidth,
                pointPadding = defined(optionPointWidth) ? (pointOffsetWidth - optionPointWidth) / 2 : pointOffsetWidth * options.pointPadding,
                pointWidth = pick(optionPointWidth, pointOffsetWidth - 2 * pointPadding),
                columnIndex = (chart.options.xAxis && chart.options.xAxis.reversed ? columnCount - series.columnIndex : series.columnIndex) || 0,
                pointX = -(categoryWidth / 2) + groupPadding + columnIndex * pointOffsetWidth + pointPadding,
                translatedY0 = series.yAxis.translate(0),
                minPointLength = options.minPointLength,
                height;
            each(data, function(point) {
                point.plotX += pointX;
                point.w = pointWidth;
                point.y0 = (inverted ? plotWidth : plotHeight) - translatedY0;
                height = (point.yBottom || point.y0) - point.plotY;
                if (minPointLength && mathAbs(height) < minPointLength) {
                    height = (height < 0 ? 1 : -1) * minPointLength;
                }
                point.h = height;
            });
        },
        drawLine: function() {},
        getSymbol: function() {},
        drawPoints: function(state) {
            var series = this,
                options = series.options,
                chart = series.chart,
                doAnimation = options.animation && series.animate,
                plot = chart.plot,
                inverted = chart.inverted,
                data = series.data,
                layer = series.stateLayers[state];
            if (doAnimation) {
                this.animate(true);
            }
            each(data, function(point) {
                if (point.plotY !== undefined) {
                    layer.drawRect(inverted ? (point.h >= 0 ? chart.plotWidth - point.plotY - point.h : chart.plotWidth - point.plotY) : point.plotX, inverted ? chart.plotHeight - point.plotX - point.w : (point.h >= 0 ? point.plotY : point.plotY + point.h), inverted ? mathAbs(point.h) : point.w, inverted ? point.w : mathAbs(point.h), options.borderColor, options.borderWidth, options.borderRadius, point.color || series.color, options.shadow);
                }
                if (point.selected) {
                    series.drawPointState(point, "select", layer);
                }
            });
            if (doAnimation) {
                series.animate();
            }
        },
        drawPointState: function(point, state, layer) {
            var series = this,
                chart = series.chart,
                seriesOptions = series.options,
                pointOptions = point ? point.options : null,
                plot = chart.plot,
                inverted = chart.inverted,
                layer = layer || series.singlePointLayer;
            if (state == "hover") {
                if (!layer) {
                    layer = series.singlePointLayer = new Layer("single-point", series.layerGroup.div);
                }
                layer.clear();
            }
            if (state && this.options.states[state]) {
                var options = merge(seriesOptions, seriesOptions.states[state], pointOptions);
                layer.drawRect(inverted ? (point.h >= 0 ? chart.plotWidth - point.plotY - point.h : chart.plotWidth - point.plotY) : point.plotX, inverted ? chart.plotHeight - point.plotX - point.w : (point.h >= 0 ? point.plotY : point.plotY + point.h), inverted ? mathAbs(point.h) : point.w, inverted ? point.w : mathAbs(point.h), options.borderColor, options.borderWidth, options.borderRadius, Color(options.color || this.color).brighten(options.brightness).get(), options.shadow);
            }
        },
        getAreaCoords: function() {
            var areas = [],
                chart = this.chart,
                inverted = chart.inverted;
            each(this.data, function(point) {
                var pointH = mathMax(mathAbs(point.h), 3) * (point.h < 3 ? -1 : 1),
                    x1 = inverted ? chart.plotWidth - point.plotY - pointH : point.plotX,
                    y2 = inverted ? chart.plotHeight - point.plotX - point.w : point.plotY,
                    y1 = y2 + (inverted ? point.w : pointH),
                    x2 = x1 + (inverted ? pointH : point.w);
                if (!inverted && mathAbs(x2 - x1) < 1) {
                    x2 = x1 + 1;
                } else {
                    if (inverted && mathAbs(y2 - y1) < 1) {
                        y2 = y1 + 1;
                    }
                }
                areas.push([map([x1, y1, x1, y2, x2, y2, x2, y1], mathRound).join(","), point]);
            });
            return areas;
        },
        cleanData: function() {
            var series = this,
                data = series.data,
                interval, smallestInterval, closestPoints, i;
            Series.prototype.cleanData.apply(series);
            for (i = data.length - 1; i >= 0; i--) {
                if (data[i - 1]) {
                    interval = data[i].x - data[i - 1].x;
                    if (smallestInterval === undefined || interval < smallestInterval) {
                        smallestInterval = interval;
                        closestPoints = i;
                    }
                }
            }
            series.closestPoints = closestPoints;
        },
        animate: function(init) {
            var series = this,
                chart = series.chart,
                inverted = chart.inverted,
                div = series.layerGroup.div,
                dataLabelsLayer = series.dataLabelsLayer;
            if (init) {
                div.style[inverted ? "left" : "top"] = (inverted ? -chart.plotWidth : chart.plotHeight) + PX;
            } else {
                animate(div, chart.inverted ? {
                    left: 0
                } : {
                    top: 0
                });
                series.animate = null;
            }
        },
        remove: function() {
            var series = this,
                chart = series.chart;
            if (chart.hasRendered) {
                each(chart.series, function(otherSeries) {
                    if (otherSeries.type == series.type) {
                        otherSeries.isDirty = true;
                    }
                });
            }
            Series.prototype.remove.apply(series, arguments);
        }
    });
    seriesTypes.column = ColumnSeries;
    var BarSeries = extendClass(ColumnSeries, {
        type: "bar",
        init: function(chart) {
            chart.inverted = this.inverted = true;
            ColumnSeries.prototype.init.apply(this, arguments);
        }
    });
    seriesTypes.bar = BarSeries;
    var ScatterSeries = extendClass(Series, {
        type: "scatter",
        getAreaCoords: function() {
            var data = this.data,
                coords, ret = [];
            each(data, function(point) {
                ret.push([
                    [mathRound(point.plotX), mathRound(point.plotY)].join(","), point
                ]);
            });
            return ret;
        },
        cleanData: function() {}
    });
    seriesTypes.scatter = ScatterSeries;
    var PiePoint = extendClass(Point, {
        setState: function(state) {
            this.series.drawPointState(this, state);
        },
        init: function() {
            Point.prototype.init.apply(this, arguments);
            var point = this,
                series = point.series,
                defaultColors = series.chart.options.colors,
                toggleSlice;
            extend(point, {
                visible: point.visible !== false,
                name: pick(point.name, "Slice"),
                color: point.color || defaultColors[colorCounter++]
            });
            if (colorCounter >= defaultColors.length) {
                colorCounter = 0;
            }
            if (!point.layer) {
                point.layer = new Layer("pie", series.layerGroup.div);
            }
            toggleSlice = function() {
                point.slice();
            };
            addEvent(point, "select", toggleSlice);
            addEvent(point, "unselect", toggleSlice);
            return point;
        },
        setVisible: function(vis) {
            var point = this,
                layer = point.layer,
                legendItem = point.legendItem;
            point.visible = vis = vis === undefined ? !point.visible : vis;
            if (vis) {
                layer.show();
            } else {
                layer.hide();
            }
            if (legendItem) {
                legendItem.className = vis ? "" : HIGHCHARTS_HIDDEN;
                point.series.chart.legend.drawGraphics(true);
            }
        },
        slice: function(sliced, redraw) {
            var point = this,
                series = point.series;
            redraw = pick(redraw, true);
            point.sliced = defined(sliced) ? sliced : !point.sliced;
            series.isDirty = true;
            if (redraw) {
                series.chart.redraw();
            }
        }
    });
    var PieSeries = extendClass(Series, {
        type: "pie",
        isCartesian: false,
        pointClass: PiePoint,
        getColor: function() {},
        translate: function() {
            var total = 0,
                series = this,
                cumulative = -0.25,
                options = series.options,
                slicedOffset = options.slicedOffset,
                positions = options.center,
                size = options.size,
                chart = series.chart,
                plotWidth = chart.plotWidth,
                plotHeight = chart.plotHeight,
                data = series.data,
                circ = 2 * math.PI,
                fraction;
            positions.push(options.size);
            positions = map(positions, function(length, i) {
                return /%$/.test(length) ? [plotWidth, plotHeight, math.min(plotWidth, plotHeight)][i] * parseInt(length) / 100 : length;
            });
            each(data, function(point) {
                total += point.y;
            });
            each(data, function(point) {
                fraction = total ? point.y / total : 0;
                point.start = cumulative * circ;
                cumulative += fraction;
                point.end = cumulative * circ;
                point.percentage = fraction * 100;
                point.total = total;
                point.center = [positions[0], positions[1]];
                point.size = positions[2];
                var angle = (point.end + point.start) / 2;
                point.centerSliced = map([mathCos(angle) * slicedOffset + positions[0], mathSin(angle) * slicedOffset + positions[1]], mathRound);
            });
            this.setTooltipPoints();
        },
        render: function() {
            this.drawPoints();
            this.drawDataLabels();
        },
        drawPoints: function(state) {
            var series = this;
            each(this.data, function(point) {
                series.drawPoint(point, point.layer.getCtx(), point.color);
                if (point.visible === false) {
                    point.setVisible(false);
                }
                if (point.selected) {
                    series.drawPointState(point, "select", point.layer);
                }
            });
        },
        getSymbol: function() {},
        drawPointState: function(point, state, layer) {
            var series = this,
                seriesOptions = series.options;
            if (point) {
                layer = layer || point.stateLayer;
                if (state == "hover") {
                    if (!layer) {
                        layer = point.stateLayer = new Layer("single-point", point.layer.div);
                    }
                    layer.clear();
                }
                if (state && series.options.states[state]) {
                    var options = merge(seriesOptions, seriesOptions.states[state]);
                    this.drawPoint(point, layer.getCtx(), options.color || point.color, options.brightness);
                }
            }
            if (series.hoverPoint && series.hoverPoint.stateLayer) {
                series.hoverPoint.stateLayer.clear();
            }
            series.hoverPoint = point;
        },
        drawPoint: function(point, ctx, color, brightness) {
            var options = this.options,
                center = point.sliced ? point.centerSliced : point.center,
                centerX = center[0],
                centerY = center[1],
                size = point.size,
                borderWidth = options.borderWidth,
                end = isIE && point.percentage > 99.999 ? point.start : point.end;
            if (point.y > 0) {
                ctx.fillStyle = setColor(Color(color).brighten(brightness).get(ctx), ctx);
                ctx.strokeStyle = options.borderColor;
                ctx.lineWidth = borderWidth;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, size / 2, point.start, end, false);
                ctx.lineTo(centerX, centerY);
                ctx.closePath();
                ctx.fill();
                if (borderWidth) {
                    ctx.stroke();
                }
            }
        },
        getAreaCoords: function() {
            var areas = [];
            var series = this;
            each(this.data, function(point) {
                var centerX = point.center[0],
                    centerY = point.center[1],
                    radius = point.size / 2,
                    start = point.start,
                    end = point.end,
                    coords = [];
                for (var angle = start; 1; angle += 0.25) {
                    if (angle >= end) {
                        angle = end;
                    }
                    coords = coords.concat([centerX + mathCos(angle) * radius, centerY + mathSin(angle) * radius]);
                    if (angle >= end) {
                        break;
                    }
                }
                coords = coords.concat([centerX, centerY]);
                point.tooltipPos = [centerX + 2 * mathCos((start + end) / 2) * radius / 3, centerY + 2 * mathSin((start + end) / 2) * radius / 3];
                areas.push([map(coords, mathRound).join(","), point]);
            });
            return areas;
        },
        setData: function() {
            var series = this,
                data = series.data,
                i;
            if (data) {
                for (i = data.length - 1; i >= 0; i--) {
                    data[i].remove();
                }
            }
            Series.prototype.setData.apply(series, arguments);
        },
        clear: function() {
            each(this.data, function(point) {
                point.layer.clear();
                if (point.dataLabelsLayer) {
                    point.dataLabelsLayer.clear();
                }
                if (point.stateLayer) {
                    point.stateLayer.clear();
                }
            });
        }
    });
    seriesTypes.pie = PieSeries;
    Highcharts = {
        numberFormat: numberFormat,
        dateFormat: dateFormat,
        defaultOptions: defaultOptions,
        setOptions: setOptions,
        Chart: Chart,
        extendClass: extendClass,
        seriesTypes: seriesTypes,
        Layer: Layer
    };
})();
var base2 = {
    name: "base2",
    version: "1.0",
    exports: "Base,Package,Abstract,Module,Enumerable,Map,Collection,RegGrp," + "Undefined,Null,This,True,False,assignID,detect,global",
    namespace: ""
};
new function(_no_shrink_) {
    var Undefined = K(),
        Null = K(null),
        True = K(true),
        False = K(false),
        This = function() {
            return this;
        };
    var global = This();
    var base2 = global.base2;
    var _FORMAT = /%([1-9])/g;
    var _LTRIM = /^\s\s*/;
    var _RTRIM = /\s\s*$/;
    var _RESCAPE = /([\/()[\]{}|*+-.,^$?\\])/g;
    var _BASE = /try/.test(detect) ? /\bbase\b/ : /.*/;
    var _HIDDEN = ["constructor", "toString", "valueOf"];
    var _MSIE_NATIVE_FUNCTION = detect("(jscript)") ? new RegExp("^" + rescape(isNaN).replace(/isNaN/, "\\w+") + "$") : {
        test: False
    };
    var _counter = 1;
    var _slice = Array.prototype.slice;
    _Function_forEach();

    function assignID(object) {
        if (!object.base2ID) {
            object.base2ID = "b2_" + _counter++;
        }
        return object.base2ID;
    }
    var _subclass = function(_instance, _static) {
        base2.__prototyping = this.prototype;
        var _prototype = new this;
        if (_instance) {
            extend(_prototype, _instance);
        }
        delete base2.__prototyping;
        var _constructor = _prototype.constructor;

        function _class() {
            if (!base2.__prototyping) {
                if (this.constructor == arguments.callee || this.__constructing) {
                    this.__constructing = true;
                    _constructor.apply(this, arguments);
                    delete this.__constructing;
                } else {
                    return extend(arguments[0], _prototype);
                }
            }
            return this;
        }
        _prototype.constructor = _class;
        for (var i in Base) {
            _class[i] = this[i];
        }
        _class.ancestor = this;
        _class.base = Undefined;
        if (_static) {
            extend(_class, _static);
        }
        _class.prototype = _prototype;
        if (_class.init) {
            _class.init();
        }
        _class["#implements"] = [];
        _class["#implemented_by"] = [];
        return _class;
    };
    var Base = _subclass.call(Object, {
        constructor: function() {
            if (arguments.length > 0) {
                this.extend(arguments[0]);
            }
        },
        base: function() {},
        extend: delegate(extend)
    }, Base = {
        ancestorOf: function(klass) {
            return _ancestorOf(this, klass);
        },
        extend: _subclass,
        forEach: function(object, block, context) {
            _Function_forEach(this, object, block, context);
        },
        implement: function(source) {
            if (typeof source == "function") {
                if (_ancestorOf(Base, source)) {
                    this["#implements"].push(source);
                    source["#implemented_by"].push(this);
                }
                source = source.prototype;
            }
            extend(this.prototype, source);
            return this;
        }
    });
    var Package = Base.extend({
        constructor: function(_private, _public) {
            this.extend(_public);
            if (this.init) {
                this.init();
            }
            if (this.name && this.name != "base2") {
                if (!this.parent) {
                    this.parent = base2;
                }
                this.parent.addName(this.name, this);
                this.namespace = format("var %1=%2;", this.name, String2.slice(this, 1, -1));
            }
            if (_private) {
                var JSNamespace = base2.JavaScript ? base2.JavaScript.namespace : "";
                _private.imports = Array2.reduce(csv(this.imports), function(namespace, name) {
                    var ns = lookup(name) || lookup("JavaScript." + name);
                    assert(ns, format("Object not found: '%1'.", name), ReferenceError);
                    return namespace += ns.namespace;
                }, "var base2=(function(){return this.base2})();" + base2.namespace + JSNamespace) + lang.namespace;
                _private.exports = Array2.reduce(csv(this.exports), function(namespace, name) {
                    var fullName = this.name + "." + name;
                    this.namespace += "var " + name + "=" + fullName + ";";
                    return namespace += "if(!" + fullName + ")" + fullName + "=" + name + ";";
                }, "", this) + "this._label_" + this.name + "();";
                var pkg = this;
                var packageName = String2.slice(this, 1, -1);
                _private["_label_" + this.name] = function() {
                    Package.forEach(pkg, function(object, name) {
                        if (object && object.ancestorOf == Base.ancestorOf) {
                            object.toString = K(format("[%1.%2]", packageName, name));
                            if (object.prototype.toString == Base.prototype.toString) {
                                object.prototype.toString = K(format("[object %1.%2]", packageName, name));
                            }
                        }
                    });
                };
            }

            function lookup(names) {
                names = names.split(".");
                var value = base2,
                    i = 0;
                while (value && names[i] != null) {
                    value = value[names[i++]];
                }
                return value;
            }
        },
        exports: "",
        imports: "",
        name: "",
        namespace: "",
        parent: null,
        addName: function(name, value) {
            if (!this[name]) {
                this[name] = value;
                this.exports += "," + name;
                this.namespace += format("var %1=%2.%1;", name, this.name);
            }
        },
        addPackage: function(name) {
            this.addName(name, new Package(null, {
                name: name,
                parent: this
            }));
        },
        toString: function() {
            return format("[%1]", this.parent ? String2.slice(this.parent, 1, -1) + "." + this.name : this.name);
        }
    });
    var Abstract = Base.extend({
        constructor: function() {
            throw new TypeError("Abstract class cannot be instantiated.");
        }
    });
    var _moduleCount = 0;
    var Module = Abstract.extend(null, {
        namespace: "",
        extend: function(_interface, _static) {
            var module = this.base();
            var index = _moduleCount++;
            module.namespace = "";
            module.partial = this.partial;
            module.toString = K("[base2.Module[" + index + "]]");
            Module[index] = module;
            module.implement(this);
            if (_interface) {
                module.implement(_interface);
            }
            if (_static) {
                extend(module, _static);
                if (module.init) {
                    module.init();
                }
            }
            return module;
        },
        forEach: function(block, context) {
            _Function_forEach(Module, this.prototype, function(method, name) {
                if (typeOf(method) == "function") {
                    block.call(context, this[name], name, this);
                }
            }, this);
        },
        implement: function(_interface) {
            var module = this;
            var id = module.toString().slice(1, -1);
            if (typeof _interface == "function") {
                if (!_ancestorOf(_interface, module)) {
                    this.base(_interface);
                }
                if (_ancestorOf(Module, _interface)) {
                    for (var name in _interface) {
                        if (module[name] === undefined) {
                            var property = _interface[name];
                            if (typeof property == "function" && property.call && _interface.prototype[name]) {
                                property = _staticModuleMethod(_interface, name);
                            }
                            module[name] = property;
                        }
                    }
                    module.namespace += _interface.namespace.replace(/base2\.Module\[\d+\]/g, id);
                }
            } else {
                extend(module, _interface);
                _extendModule(module, _interface);
            }
            return module;
        },
        partial: function() {
            var module = Module.extend();
            var id = module.toString().slice(1, -1);
            module.namespace = this.namespace.replace(/(\w+)=b[^\)]+\)/g, "$1=" + id + ".$1");
            this.forEach(function(method, name) {
                module[name] = partial(bind(method, module));
            });
            return module;
        }
    });

    function _extendModule(module, _interface) {
        var proto = module.prototype;
        var id = module.toString().slice(1, -1);
        for (var name in _interface) {
            var property = _interface[name],
                namespace = "";
            if (name.charAt(0) == "@") {
                if (detect(name.slice(1))) {
                    _extendModule(module, property);
                }
            } else {
                if (!proto[name]) {
                    if (name == name.toUpperCase()) {
                        namespace = "var " + name + "=" + id + "." + name + ";";
                    } else {
                        if (typeof property == "function" && property.call) {
                            namespace = "var " + name + "=base2.lang.bind('" + name + "'," + id + ");";
                            proto[name] = _moduleMethod(module, name);
                            proto[name]._module = module;
                        }
                    }
                    if (module.namespace.indexOf(namespace) == -1) {
                        module.namespace += namespace;
                    }
                }
            }
        }
    }

    function _staticModuleMethod(module, name) {
        return function() {
            return module[name].apply(module, arguments);
        };
    }

    function _moduleMethod(module, name) {
        return function() {
            var args = _slice.call(arguments);
            args.unshift(this);
            return module[name].apply(module, args);
        };
    }
    var Enumerable = Module.extend({
        every: function(object, test, context) {
            var result = true;
            try {
                forEach(object, function(value, key) {
                    result = test.call(context, value, key, object);
                    if (!result) {
                        throw StopIteration;
                    }
                });
            } catch (error) {
                if (error != StopIteration) {
                    throw error;
                }
            }
            return !!result;
        },
        filter: function(object, test, context) {
            var i = 0;
            return this.reduce(object, function(result, value, key) {
                if (test.call(context, value, key, object)) {
                    result[i++] = value;
                }
                return result;
            }, []);
        },
        invoke: function(object, method) {
            var args = _slice.call(arguments, 2);
            return this.map(object, (typeof method == "function") ? function(item) {
                return item == null ? undefined : method.apply(item, args);
            } : function(item) {
                return item == null ? undefined : item[method].apply(item, args);
            });
        },
        map: function(object, block, context) {
            var result = [],
                i = 0;
            forEach(object, function(value, key) {
                result[i++] = block.call(context, value, key, object);
            });
            return result;
        },
        pluck: function(object, key) {
            return this.map(object, function(item) {
                return item == null ? undefined : item[key];
            });
        },
        reduce: function(object, block, result, context) {
            var initialised = arguments.length > 2;
            forEach(object, function(value, key) {
                if (initialised) {
                    result = block.call(context, result, value, key, object);
                } else {
                    result = value;
                    initialised = true;
                }
            });
            return result;
        },
        some: function(object, test, context) {
            return !this.every(object, not(test), context);
        }
    });
    var _HASH = "#";
    var Map = Base.extend({
        constructor: function(values) {
            if (values) {
                this.merge(values);
            }
        },
        clear: function() {
            for (var key in this) {
                if (key.indexOf(_HASH) == 0) {
                    delete this[key];
                }
            }
        },
        copy: function() {
            base2.__prototyping = true;
            var copy = new this.constructor;
            delete base2.__prototyping;
            for (var i in this) {
                if (this[i] !== copy[i]) {
                    copy[i] = this[i];
                }
            }
            return copy;
        },
        forEach: function(block, context) {
            for (var key in this) {
                if (key.indexOf(_HASH) == 0) {
                    block.call(context, this[key], key.slice(1), this);
                }
            }
        },
        get: function(key) {
            return this[_HASH + key];
        },
        getKeys: function() {
            return this.map(II);
        },
        getValues: function() {
            return this.map(I);
        },
        has: function(key) {
            /*@cc_on@*/
            /*@if (@_jscript_version < 5.5)
             return $Legacy.has(this, _HASH + key);
             @else
             @*/
            return _HASH + key in this;
            /*@end@*/
        },
        merge: function(values) {
            var put = flip(this.put);
            forEach(arguments, function(values) {
                forEach(values, put, this);
            }, this);
            return this;
        },
        put: function(key, value) {
            this[_HASH + key] = value;
        },
        remove: function(key) {
            delete this[_HASH + key];
        },
        size: function() {
            var size = 0;
            for (var key in this) {
                if (key.indexOf(_HASH) == 0) {
                    size++;
                }
            }
            return size;
        },
        union: function(values) {
            return this.merge.apply(this.copy(), arguments);
        }
    });
    Map.implement(Enumerable);
    Map.prototype.filter = function(test, context) {
        return this.reduce(function(result, value, key) {
            if (!test.call(context, value, key, this)) {
                result.remove(key);
            }
            return result;
        }, this.copy(), this);
    };
    var _KEYS = "~";
    var Collection = Map.extend({
        constructor: function(values) {
            this[_KEYS] = new Array2;
            this.base(values);
        },
        add: function(key, item) {
            assert(!this.has(key), "Duplicate key '" + key + "'.");
            this.put.apply(this, arguments);
        },
        clear: function() {
            this.base();
            this[_KEYS].length = 0;
        },
        copy: function() {
            var copy = this.base();
            copy[_KEYS] = this[_KEYS].copy();
            return copy;
        },
        forEach: function(block, context) {
            var keys = this[_KEYS];
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                block.call(context, this[_HASH + keys[i]], keys[i], this);
            }
        },
        getAt: function(index) {
            var key = this[_KEYS].item(index);
            return (key === undefined) ? undefined : this[_HASH + key];
        },
        getKeys: function() {
            return this[_KEYS].copy();
        },
        indexOf: function(key) {
            return this[_KEYS].indexOf(String(key));
        },
        insertAt: function(index, key, item) {
            assert(this[_KEYS].item(index) !== undefined, "Index out of bounds.");
            assert(!this.has(key), "Duplicate key '" + key + "'.");
            this[_KEYS].insertAt(index, String(key));
            this[_HASH + key] = null;
            this.put.apply(this, _slice.call(arguments, 1));
        },
        item: function(keyOrIndex) {
            return this[typeof keyOrIndex == "number" ? "getAt" : "get"](keyOrIndex);
        },
        put: function(key, item) {
            if (!this.has(key)) {
                this[_KEYS].push(String(key));
            }
            var klass = this.constructor;
            if (klass.Item && !instanceOf(item, klass.Item)) {
                item = klass.create.apply(klass, arguments);
            }
            this[_HASH + key] = item;
        },
        putAt: function(index, item) {
            arguments[0] = this[_KEYS].item(index);
            assert(arguments[0] !== undefined, "Index out of bounds.");
            this.put.apply(this, arguments);
        },
        remove: function(key) {
            if (this.has(key)) {
                this[_KEYS].remove(String(key));
                delete this[_HASH + key];
            }
        },
        removeAt: function(index) {
            var key = this[_KEYS].item(index);
            if (key !== undefined) {
                this[_KEYS].removeAt(index);
                delete this[_HASH + key];
            }
        },
        reverse: function() {
            this[_KEYS].reverse();
            return this;
        },
        size: function() {
            return this[_KEYS].length;
        },
        slice: function(start, end) {
            var sliced = this.copy();
            if (arguments.length > 0) {
                var keys = this[_KEYS],
                    removed = keys;
                sliced[_KEYS] = Array2(_slice.apply(keys, arguments));
                if (sliced[_KEYS].length) {
                    removed = removed.slice(0, start);
                    if (arguments.length > 1) {
                        removed = removed.concat(keys.slice(end));
                    }
                }
                for (var i = 0; i < removed.length; i++) {
                    delete sliced[_HASH + removed[i]];
                }
            }
            return sliced;
        },
        sort: function(compare) {
            if (compare) {
                this[_KEYS].sort(bind(function(key1, key2) {
                    return compare(this[_HASH + key1], this[_HASH + key2], key1, key2);
                }, this));
            } else {
                this[_KEYS].sort();
            }
            return this;
        },
        toString: function() {
            return "(" + (this[_KEYS] || "") + ")";
        }
    }, {
        Item: null,
        create: function(key, item) {
            return this.Item ? new this.Item(key, item) : item;
        },
        extend: function(_instance, _static) {
            var klass = this.base(_instance);
            klass.create = this.create;
            if (_static) {
                extend(klass, _static);
            }
            if (!klass.Item) {
                klass.Item = this.Item;
            } else {
                if (typeof klass.Item != "function") {
                    klass.Item = (this.Item || Base).extend(klass.Item);
                }
            }
            if (klass.init) {
                klass.init();
            }
            return klass;
        }
    });
    var _RG_BACK_REF = /\\(\d+)/g,
        _RG_ESCAPE_CHARS = /\\./g,
        _RG_ESCAPE_BRACKETS = /\(\?[:=!]|\[[^\]]+\]/g,
        _RG_BRACKETS = /\(/g,
        _RG_LOOKUP = /\$(\d+)/,
        _RG_LOOKUP_SIMPLE = /^\$\d+$/;
    var RegGrp = Collection.extend({
        constructor: function(values, ignoreCase) {
            this.base(values);
            this.ignoreCase = !!ignoreCase;
        },
        ignoreCase: false,
        exec: function(string, override) {
            string += "";
            var items = this,
                keys = this[_KEYS];
            if (!keys.length) {
                return string;
            }
            if (override == RegGrp.IGNORE) {
                override = 0;
            }
            return string.replace(new RegExp(this, this.ignoreCase ? "gi" : "g"), function(match) {
                var item, offset = 1,
                    i = 0;
                while ((item = items[_HASH + keys[i++]])) {
                    var next = offset + item.length + 1;
                    if (arguments[offset]) {
                        var replacement = override == null ? item.replacement : override;
                        switch (typeof replacement) {
                            case "function":
                                return replacement.apply(items, _slice.call(arguments, offset, next));
                            case "number":
                                return arguments[offset + replacement];
                            default:
                                return replacement;
                        }
                    }
                    offset = next;
                }
                return match;
            });
        },
        insertAt: function(index, expression, replacement) {
            if (instanceOf(expression, RegExp)) {
                arguments[1] = expression.source;
            }
            return base(this, arguments);
        },
        test: function(string) {
            return this.exec(string) != string;
        },
        toString: function() {
            var offset = 1;
            return "(" + this.map(function(item) {
                    var expression = (item + "").replace(_RG_BACK_REF, function(match, index) {
                        return "\\" + (offset + Number(index));
                    });
                    offset += item.length + 1;
                    return expression;
                }).join(")|(") + ")";
        }
    }, {
        IGNORE: "$0",
        init: function() {
            forEach("add,get,has,put,remove".split(","), function(name) {
                _override(this, name, function(expression) {
                    if (instanceOf(expression, RegExp)) {
                        arguments[0] = expression.source;
                    }
                    return base(this, arguments);
                });
            }, this.prototype);
        },
        Item: {
            constructor: function(expression, replacement) {
                if (replacement == null) {
                    replacement = RegGrp.IGNORE;
                } else {
                    if (replacement.replacement != null) {
                        replacement = replacement.replacement;
                    } else {
                        if (typeof replacement != "function") {
                            replacement = String(replacement);
                        }
                    }
                }
                if (typeof replacement == "string" && _RG_LOOKUP.test(replacement)) {
                    if (_RG_LOOKUP_SIMPLE.test(replacement)) {
                        replacement = parseInt(replacement.slice(1));
                    } else {
                        var Q = '"';
                        replacement = replacement.replace(/\\/g, "\\\\").replace(/"/g, "\\x22").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\$(\d+)/g, Q + "+(arguments[$1]||" + Q + Q + ")+" + Q).replace(/(['"])\1\+(.*)\+\1\1$/, "$1");
                        replacement = new Function("return " + Q + replacement + Q);
                    }
                }
                this.length = RegGrp.count(expression);
                this.replacement = replacement;
                this.toString = K(expression + "");
            },
            length: 0,
            replacement: ""
        },
        count: function(expression) {
            expression = (expression + "").replace(_RG_ESCAPE_CHARS, "").replace(_RG_ESCAPE_BRACKETS, "");
            return match(expression, _RG_BRACKETS).length;
        }
    });
    var lang = {
        name: "lang",
        version: base2.version,
        exports: "assert,assertArity,assertType,base,bind,copy,extend,forEach,format,instanceOf,match,pcopy,rescape,trim,typeOf",
        namespace: ""
    };

    function assert(condition, message, ErrorClass) {
        if (!condition) {
            throw new(ErrorClass || Error)(message || "Assertion failed.");
        }
    }

    function assertArity(args, arity, message) {
        if (arity == null) {
            arity = args.callee.length;
        }
        if (args.length < arity) {
            throw new SyntaxError(message || "Not enough arguments.");
        }
    }

    function assertType(object, type, message) {
        if (type && (typeof type == "function" ? !instanceOf(object, type) : typeOf(object) != type)) {
            throw new TypeError(message || "Invalid type.");
        }
    }

    function copy(object) {
        var copy = {};
        for (var i in object) {
            copy[i] = object[i];
        }
        return copy;
    }

    function pcopy(object) {
        _dummy.prototype = object;
        return new _dummy;
    }

    function _dummy() {}

    function base(object, args) {
        return object.base.apply(object, args);
    }

    function extend(object, source) {
        if (object && source) {
            if (arguments.length > 2) {
                var key = source;
                source = {};
                source[key] = arguments[2];
            }
            var proto = global[(typeof source == "function" ? "Function" : "Object")].prototype;
            if (base2.__prototyping) {
                var i = _HIDDEN.length,
                    key;
                while ((key = _HIDDEN[--i])) {
                    var value = source[key];
                    if (value != proto[key]) {
                        if (_BASE.test(value)) {
                            _override(object, key, value);
                        } else {
                            object[key] = value;
                        }
                    }
                }
            }
            for (key in source) {
                if (proto[key] === undefined) {
                    var value = source[key];
                    if (key.charAt(0) == "@") {
                        if (detect(key.slice(1))) {
                            extend(object, value);
                        }
                    } else {
                        var ancestor = object[key];
                        if (ancestor && typeof value == "function") {
                            if (value != ancestor) {
                                if (_BASE.test(value)) {
                                    _override(object, key, value);
                                } else {
                                    value.ancestor = ancestor;
                                    object[key] = value;
                                }
                            }
                        } else {
                            object[key] = value;
                        }
                    }
                }
            }
        }
        return object;
    }

    function _ancestorOf(ancestor, fn) {
        while (fn) {
            if (!fn.ancestor) {
                return false;
            }
            fn = fn.ancestor;
            if (fn == ancestor) {
                return true;
            }
        }
        return false;
    }

    function _override(object, name, method) {
        var ancestor = object[name];
        var superObject = base2.__prototyping;
        if (superObject && ancestor != superObject[name]) {
            superObject = null;
        }

        function _base() {
            var previous = this.base;
            this.base = superObject ? superObject[name] : ancestor;
            var returnValue = method.apply(this, arguments);
            this.base = previous;
            return returnValue;
        }
        _base.method = method;
        _base.ancestor = ancestor;
        object[name] = _base;
        _base.toString = K(method + "");
    }
    if (typeof StopIteration == "undefined") {
        StopIteration = new Error("StopIteration");
    }

    function forEach(object, block, context, fn) {
        if (object == null) {
            return;
        }
        if (!fn) {
            if (typeof object == "function" && object.call) {
                fn = Function;
            } else {
                if (typeof object.forEach == "function" && object.forEach != arguments.callee) {
                    object.forEach(block, context);
                    return;
                } else {
                    if (typeof object.length == "number") {
                        _Array_forEach(object, block, context);
                        return;
                    }
                }
            }
        }
        _Function_forEach(fn || Object, object, block, context);
    }
    forEach.csv = function(string, block, context) {
        forEach(csv(string), block, context);
    };
    forEach.detect = function(object, block, context) {
        forEach(object, function(value, key) {
            if (key.charAt(0) == "@") {
                if (detect(key.slice(1))) {
                    forEach(value, arguments.callee);
                }
            } else {
                block.call(context, value, key, object);
            }
        });
    };

    function _Array_forEach(array, block, context) {
        if (array == null) {
            array = global;
        }
        var length = array.length || 0,
            i;
        if (typeof array == "string") {
            for (i = 0; i < length; i++) {
                block.call(context, array.charAt(i), i, array);
            }
        } else {
            for (i = 0; i < length; i++) {
                /*@cc_on@*/
                /*@if (@_jscript_version < 5.2)
                 if ($Legacy.has(array, i))
                 @else
                 @*/
                if (i in array) {
                    /*@end@*/
                    block.call(context, array[i], i, array);
                }
            }
        }
    }

    function _Function_forEach(fn, object, block, context) {
        var Temp = function() {
            this.i = 1;
        };
        Temp.prototype = {
            i: 1
        };
        var count = 0;
        for (var i in new Temp) {
            count++;
        }
        _Function_forEach = (count > 1) ? function(fn, object, block, context) {
            var processed = {};
            for (var key in object) {
                if (!processed[key] && fn.prototype[key] === undefined) {
                    processed[key] = true;
                    block.call(context, object[key], key, object);
                }
            }
        } : function(fn, object, block, context) {
            for (var key in object) {
                if (fn.prototype[key] === undefined) {
                    block.call(context, object[key], key, object);
                }
            }
        };
        _Function_forEach(fn, object, block, context);
    }

    function instanceOf(object, klass) {
        if (typeof klass != "function") {
            throw new TypeError("Invalid 'instanceOf' operand.");
        }
        if (object == null) {
            return false;
            /*@cc_on
             // COM objects don't have a constructor
             if (typeof object.constructor != "function") {
             return typeOf(object) == typeof klass.prototype.valueOf();
             }
             @*/
        }
        if (object.constructor == klass) {
            return true;
        }
        if (klass.ancestorOf) {
            return klass.ancestorOf(object.constructor);
            /*@if (@_jscript_version < 5.1)
             // do nothing
             @else
             @*/
        }
        if (object instanceof klass) {
            return true;
            /*@end@*/
        }
        if (Base.ancestorOf == klass.ancestorOf) {
            return false;
        }
        if (Base.ancestorOf == object.constructor.ancestorOf) {
            return klass == Object;
        }
        switch (klass) {
            case Array:
                return !!(typeof object == "object" && object.join && object.splice);
            case Function:
                return typeOf(object) == "function";
            case RegExp:
                return typeof object.constructor.$1 == "string";
            case Date:
                return !!object.getTimezoneOffset;
            case String:
            case Number:
            case Boolean:
                return typeOf(object) == typeof klass.prototype.valueOf();
            case Object:
                return true;
        }
        return false;
    }

    function typeOf(object) {
        var type = typeof object;
        switch (type) {
            case "object":
                return object == null ? "null" : typeof object.constructor == "undefined" ? _MSIE_NATIVE_FUNCTION.test(object) ? "function" : type : typeof object.constructor.prototype.valueOf();
            case "function":
                return typeof object.call == "function" ? type : "object";
            default:
                return type;
        }
    }
    var JavaScript = {
        name: "JavaScript",
        version: base2.version,
        exports: "Array2,Date2,Function2,String2",
        namespace: "",
        bind: function(host) {
            var top = global;
            global = host;
            forEach.csv(this.exports, function(name2) {
                var name = name2.slice(0, -1);
                extend(host[name], this[name2]);
                this[name2](host[name].prototype);
            }, this);
            global = top;
            return host;
        }
    };

    function _createObject2(Native, constructor, generics, extensions) {
        var INative = Module.extend();
        var id = INative.toString().slice(1, -1);
        forEach.csv(generics, function(name) {
            INative[name] = unbind(Native.prototype[name]);
            INative.namespace += format("var %1=%2.%1;", name, id);
        });
        forEach(_slice.call(arguments, 3), INative.implement, INative);
        var Native2 = function() {
            return INative(this.constructor == INative ? constructor.apply(null, arguments) : arguments[0]);
        };
        Native2.prototype = INative.prototype;
        for (var name in INative) {
            if (name != "prototype" && Native[name]) {
                INative[name] = Native[name];
                delete INative.prototype[name];
            }
            Native2[name] = INative[name];
        }
        Native2.ancestor = Object;
        delete Native2.extend;
        Native2.namespace = Native2.namespace.replace(/(var (\w+)=)[^,;]+,([^\)]+)\)/g, "$1$3.$2");
        return Native2;
    }
    if ((new Date).getYear() > 1900) {
        Date.prototype.getYear = function() {
            return this.getFullYear() - 1900;
        };
        Date.prototype.setYear = function(year) {
            return this.setFullYear(year + 1900);
        };
    }
    var _testDate = new Date(Date.UTC(2006, 1, 20));
    _testDate.setUTCDate(15);
    if (_testDate.getUTCHours() != 0) {
        forEach.csv("FullYear,Month,Date,Hours,Minutes,Seconds,Milliseconds", function(type) {
            extend(Date.prototype, "setUTC" + type, function() {
                var value = base(this, arguments);
                if (value >= 57722401000) {
                    value -= 3600000;
                    this.setTime(value);
                }
                return value;
            });
        });
    }
    Function.prototype.prototype = {};
    if ("".replace(/^/, K("$$")) == "$") {
        extend(String.prototype, "replace", function(expression, replacement) {
            if (typeof replacement == "function") {
                var fn = replacement;
                replacement = function() {
                    return String(fn.apply(null, arguments)).split("$").join("$$");
                };
            }
            return this.base(expression, replacement);
        });
    }
    var Array2 = _createObject2(Array, Array, "concat,join,pop,push,reverse,shift,slice,sort,splice,unshift", Enumerable, {
        combine: function(keys, values) {
            if (!values) {
                values = keys;
            }
            return Array2.reduce(keys, function(hash, key, index) {
                hash[key] = values[index];
                return hash;
            }, {});
        },
        contains: function(array, item) {
            return Array2.indexOf(array, item) != -1;
        },
        copy: function(array) {
            var copy = _slice.call(array);
            if (!copy.swap) {
                Array2(copy);
            }
            return copy;
        },
        flatten: function(array) {
            var i = 0;
            return Array2.reduce(array, function(result, item) {
                if (Array2.like(item)) {
                    Array2.reduce(item, arguments.callee, result);
                } else {
                    result[i++] = item;
                }
                return result;
            }, []);
        },
        forEach: _Array_forEach,
        indexOf: function(array, item, fromIndex) {
            var length = array.length;
            if (fromIndex == null) {
                fromIndex = 0;
            } else {
                if (fromIndex < 0) {
                    fromIndex = Math.max(0, length + fromIndex);
                }
            }
            for (var i = fromIndex; i < length; i++) {
                if (array[i] === item) {
                    return i;
                }
            }
            return -1;
        },
        insertAt: function(array, index, item) {
            Array2.splice(array, index, 0, item);
            return item;
        },
        item: function(array, index) {
            if (index < 0) {
                index += array.length;
            }
            return array[index];
        },
        lastIndexOf: function(array, item, fromIndex) {
            var length = array.length;
            if (fromIndex == null) {
                fromIndex = length - 1;
            } else {
                if (fromIndex < 0) {
                    fromIndex = Math.max(0, length + fromIndex);
                }
            }
            for (var i = fromIndex; i >= 0; i--) {
                if (array[i] === item) {
                    return i;
                }
            }
            return -1;
        },
        map: function(array, block, context) {
            var result = [];
            Array2.forEach(array, function(item, index) {
                result[index] = block.call(context, item, index, array);
            });
            return result;
        },
        remove: function(array, item) {
            var index = Array2.indexOf(array, item);
            if (index != -1) {
                Array2.removeAt(array, index);
            }
        },
        removeAt: function(array, index) {
            Array2.splice(array, index, 1);
        },
        swap: function(array, index1, index2) {
            if (index1 < 0) {
                index1 += array.length;
            }
            if (index2 < 0) {
                index2 += array.length;
            }
            var temp = array[index1];
            array[index1] = array[index2];
            array[index2] = temp;
            return array;
        }
    });
    Array2.reduce = Enumerable.reduce;
    Array2.like = function(object) {
        return typeOf(object) == "object" && typeof object.length == "number";
    };
    Enumerable["#implemented_by"].pop();
    Enumerable["#implemented_by"].push(Array2);
    var _DATE_PATTERN = /^((-\d+|\d{4,})(-(\d{2})(-(\d{2}))?)?)?T((\d{2})(:(\d{2})(:(\d{2})(\.(\d{1,3})(\d)?\d*)?)?)?)?(([+-])(\d{2})(:(\d{2}))?|Z)?$/;
    var _DATE_PARTS = {
        FullYear: 2,
        Month: 4,
        Date: 6,
        Hours: 8,
        Minutes: 10,
        Seconds: 12,
        Milliseconds: 14
    };
    var _TIMEZONE_PARTS = {
        Hectomicroseconds: 15,
        UTC: 16,
        Sign: 17,
        Hours: 18,
        Minutes: 20
    };
    var _TRIM_ZEROES = /(((00)?:0+)?:0+)?\.0+$/;
    var _TRIM_TIMEZONE = /(T[0-9:.]+)$/;
    var Date2 = _createObject2(Date, function(yy, mm, dd, h, m, s, ms) {
        switch (arguments.length) {
            case 0:
                return new Date;
            case 1:
                return typeof yy == "number" ? new Date(yy) : Date2.parse(yy);
            default:
                return new Date(yy, mm, arguments.length == 2 ? 1 : dd, h || 0, m || 0, s || 0, ms || 0);
        }
    }, "", {
        toISOString: function(date) {
            var string = "####-##-##T##:##:##.###";
            for (var part in _DATE_PARTS) {
                string = string.replace(/#+/, function(digits) {
                    var value = date["getUTC" + part]();
                    if (part == "Month") {
                        value++;
                    }
                    return ("000" + value).slice(-digits.length);
                });
            }
            return string.replace(_TRIM_ZEROES, "").replace(_TRIM_TIMEZONE, "$1Z");
        }
    });
    delete Date2.forEach;
    Date2.now = function() {
        return (new Date).valueOf();
    };
    Date2.parse = function(string, defaultDate) {
        if (arguments.length > 1) {
            assertType(defaultDate, "number", "default date should be of type 'number'.");
        }
        var parts = match(string, _DATE_PATTERN);
        if (parts.length) {
            if (parts[_DATE_PARTS.Month]) {
                parts[_DATE_PARTS.Month] --;
            }
            if (parts[_TIMEZONE_PARTS.Hectomicroseconds] >= 5) {
                parts[_DATE_PARTS.Milliseconds] ++;
            }
            var date = new Date(defaultDate || 0);
            var prefix = parts[_TIMEZONE_PARTS.UTC] || parts[_TIMEZONE_PARTS.Hours] ? "UTC" : "";
            for (var part in _DATE_PARTS) {
                var value = parts[_DATE_PARTS[part]];
                if (!value) {
                    continue;
                }
                date["set" + prefix + part](value);
                if (date["get" + prefix + part]() != parts[_DATE_PARTS[part]]) {
                    return NaN;
                }
            }
            if (parts[_TIMEZONE_PARTS.Hours]) {
                var hours = Number(parts[_TIMEZONE_PARTS.Sign] + parts[_TIMEZONE_PARTS.Hours]);
                var minutes = Number(parts[_TIMEZONE_PARTS.Sign] + (parts[_TIMEZONE_PARTS.Minutes] || 0));
                date.setUTCMinutes(date.getUTCMinutes() + (hours * 60) + minutes);
            }
            return date.valueOf();
        } else {
            return Date.parse(string);
        }
    };
    var String2 = _createObject2(String, function(string) {
        return new String(arguments.length == 0 ? "" : string);
    }, "charAt,charCodeAt,concat,indexOf,lastIndexOf,match,replace,search,slice,split,substr,substring,toLowerCase,toUpperCase", {
        csv: csv,
        format: format,
        rescape: rescape,
        trim: trim
    });
    delete String2.forEach;

    function trim(string) {
        return String(string).replace(_LTRIM, "").replace(_RTRIM, "");
    }

    function csv(string) {
        return string ? (string + "").split(/\s*,\s*/) : [];
    }

    function format(string) {
        var args = arguments;
        var pattern = new RegExp("%([1-" + (arguments.length - 1) + "])", "g");
        return (string + "").replace(pattern, function(match, index) {
            return args[index];
        });
    }

    function match(string, expression) {
        return (string + "").match(expression) || [];
    }

    function rescape(string) {
        return (string + "").replace(_RESCAPE, "\\$1");
    }
    var Function2 = _createObject2(Function, Function, "", {
        I: I,
        II: II,
        K: K,
        bind: bind,
        compose: compose,
        delegate: delegate,
        flip: flip,
        not: not,
        partial: partial,
        unbind: unbind
    });

    function I(i) {
        return i;
    }

    function II(i, ii) {
        return ii;
    }

    function K(k) {
        return function() {
            return k;
        };
    }

    function bind(fn, context) {
        var lateBound = typeof fn != "function";
        if (arguments.length > 2) {
            var args = _slice.call(arguments, 2);
            return function() {
                return (lateBound ? context[fn] : fn).apply(context, args.concat.apply(args, arguments));
            };
        } else {
            return function() {
                return (lateBound ? context[fn] : fn).apply(context, arguments);
            };
        }
    }

    function compose() {
        var fns = _slice.call(arguments);
        return function() {
            var i = fns.length,
                result = fns[--i].apply(this, arguments);
            while (i--) {
                result = fns[i].call(this, result);
            }
            return result;
        };
    }

    function delegate(fn, context) {
        return function() {
            var args = _slice.call(arguments);
            args.unshift(this);
            return fn.apply(context, args);
        };
    }

    function flip(fn) {
        return function() {
            return fn.apply(this, Array2.swap(arguments, 0, 1));
        };
    }

    function not(fn) {
        return function() {
            return !fn.apply(this, arguments);
        };
    }

    function partial(fn) {
        var args = _slice.call(arguments, 1);
        return function() {
            var specialised = args.concat(),
                i = 0,
                j = 0;
            while (i < args.length && j < arguments.length) {
                if (specialised[i] === undefined) {
                    specialised[i] = arguments[j++];
                }
                i++;
            }
            while (j < arguments.length) {
                specialised[i++] = arguments[j++];
            }
            if (Array2.contains(specialised, undefined)) {
                specialised.unshift(fn);
                return partial.apply(null, specialised);
            }
            return fn.apply(this, specialised);
        };
    }

    function unbind(fn) {
        return function(context) {
            return fn.apply(context, _slice.call(arguments, 1));
        };
    }

    function detect() {
        var jscript = NaN
        /*@cc_on || @_jscript_version@*/
            ;
        var javaEnabled = global.java ? true : false;
        if (global.navigator) {
            var MSIE = /MSIE[\d.]+/g;
            var element = document.createElement("span");
            var userAgent = navigator.userAgent.replace(/([a-z])[\s\/](\d)/gi, "$1$2");
            if (!jscript) {
                userAgent = userAgent.replace(MSIE, "");
            }
            if (MSIE.test(userAgent)) {
                userAgent = userAgent.match(MSIE)[0] + " " + userAgent.replace(MSIE, "");
            }
            base2.userAgent = navigator.platform + " " + userAgent.replace(/like \w+/gi, "");
            javaEnabled &= navigator.javaEnabled();
        }
        var _cache = {};
        detect = function(expression) {
            if (_cache[expression] == null) {
                var returnValue = false,
                    test = expression;
                var not = test.charAt(0) == "!";
                if (not) {
                    test = test.slice(1);
                }
                if (test.charAt(0) == "(") {
                    try {
                        returnValue = new Function("element,jscript,java,global", "return !!" + test)(element, jscript, javaEnabled, global);
                    } catch (ex) {}
                } else {
                    returnValue = new RegExp("(" + test + ")", "i").test(base2.userAgent);
                }
                _cache[expression] = !!(not ^ returnValue);
            }
            return _cache[expression];
        };
        return detect(arguments[0]);
    }
    base2 = global.base2 = new Package(this, base2);
    var exports = this.exports;
    lang = new Package(this, lang);
    exports += this.exports;
    JavaScript = new Package(this, JavaScript);
    eval(exports + this.exports);
    lang.base = base;
    lang.extend = extend;
};
var _resized = new Array();
var _busy = new Array();

function CvsGraphCtx(canvasId) {
    if (typeof(canvasId) === "string") {
        this.cId = canvasId;
        this.cnvs = document.getElementById(this.cId);
    } else {
        if (canvasId.tagName.toLowerCase() === "canvas") {
            this.cId = canvasId.getAttribute("id");
            this.cnvs = canvasId;
        }
    }
    this.rawWidth = parseFloat(this.cnvs.width);
    this.rawHeight = parseFloat(this.cnvs.height);
    this.aRatio = this.rawWidth / this.rawHeight;
    if (!(this.cId in _resized)) {
        _resized[this.cId] = true;
    }
    if (!(this.cId in _busy)) {
        _busy[this.cId] = false;
    }
    this.ctx = this.cnvs.getContext("2d");
    this.ctx.save();
    this.vpW = this.rawWidth;
    this.vpH = this.rawHeight;
    this.vpLLx = 0;
    this.vpLLy = this.rawHeight;
    this.xscl = this.rawWidth / 100;
    this.yscl = -this.rawHeight / 100;
    this.xoffset = 0;
    this.yoffset = 0;
    this.rotA = 0;
    this.rotX = 0;
    this.rotY = 0;
    this.penCol = "rgba(0, 0, 0, 1.0)";
    this.penWid = 1;
    this.bkgCol = "rgba(255, 255, 255, 1.0)";
    this.fontSize = 10;
    this.penX = 0;
    this.penY = 0;
    this.dashX = 0;
    this.dashY = 0;
}
CvsGraphCtx.prototype._setCtx = function() {
    this.ctx.fillStyle = this.penCol;
    this.ctx.lineWidth = this.penWid;
    this.ctx.strokeStyle = this.penCol;
};
CvsGraphCtx.prototype.clearCanvas = function() {
    this.ctx.clearRect(0, 0, this.rawWidth, this.rawWidth);
    this.clearRotation();
};
CvsGraphCtx.prototype.setViewport = function(lowerLeftX, lowerLeftY, w, h) {
    if (h != undefined) {
        this.vpW = 0.01 * w * this.rawWidth;
        this.vpH = 0.01 * h * this.rawWidth;
        this.vpLLx = 0.01 * lowerLeftX * this.rawWidth;
        this.vpLLy = this.rawHeight - 0.01 * lowerLeftY * this.rawWidth;
    } else {
        this.vpW = this.rawWidth;
        this.vpH = this.rawHeight;
        this.vpLLx = 0;
        this.vpLLy = this.rawHeight;
    }
    this.setWorldCoords();
};
CvsGraphCtx.prototype.clearViewport = function() {
    this.ctx.clearRect(this.vpLLx, this.vpLLy - this.vpH, this.vpW, this.vpH);
};
CvsGraphCtx.prototype.fillViewport = function(fillColor) {
    var color;
    if (fillColor != undefined) {
        color = new RGBAColor(fillColor);
        if (color.ok) {
            this.bkgCol = color.toRGBA();
        }
    }
    if (this.rotA) {
        this.ctx.save();
        this.ctx.translate(this.rotX, this.rotY);
        this.ctx.rotate(this.rotA);
        this.ctx.translate(-this.rotX, -this.rotY);
    }
    this.ctx.fillStyle = this.bkgCol;
    this.ctx.fillRect(this.vpLLx, (this.vpLLy - this.vpH), this.vpW, this.vpH);
    if (this.rotA) {
        this.ctx.restore();
    }
};
CvsGraphCtx.prototype.setWorldCoords = function(leftX, rightX, lowerY, upperY) {
    if (upperY != undefined) {
        this.xscl = this.vpW / (rightX - leftX);
        this.yscl = -(this.vpH / (upperY - lowerY));
        this.xoffset = -leftX * this.xscl;
        this.yoffset = -lowerY * this.yscl;
    } else {
        this.xscl = this.rawWidth / 100;
        this.yscl = -this.rawWidth / 100;
        this.xoffset = 0;
        this.yoffset = 0;
    }
    this.clearRotation();
    this.penX = 0;
    this.penY = 0;
};
CvsGraphCtx.prototype.setRotation = function(orgX, orgY, degs) {
    this.rotA = -degs * Math.PI / 180;
    this.rotX = this.vpLLx + this.xoffset + orgX * this.xscl;
    this.rotY = this.vpLLy + this.yoffset + orgY * this.yscl;
};
CvsGraphCtx.prototype.clearRotation = function() {
    this.rotA = 0;
    this.rotX = 0;
    this.rotY = 0;
};
CvsGraphCtx.prototype.setPenColor = function(color) {
    var newCol = new RGBAColor(color);
    if (newCol.ok) {
        this.penCol = newCol.toRGBA();
    }
    this.ctx.strokeStyle = this.penCol;
    this.ctx.fillStyle = this.penCol;
};
CvsGraphCtx.prototype.setPenWidth = function(w) {
    if (typeof w != "undefined") {
        this.penWid = w;
    }
    this.ctx.lineWidth = this.penWid;
};
CvsGraphCtx.prototype.setFontSize = function(s) {
    if (typeof s != "undefined") {
        this.fontSize = s;
    }
};
CvsGraphCtx.prototype.move = function(x, y) {
    if (this.rotA) {
        this.ctx.save();
        this.ctx.translate(this.rotX, this.rotY);
        this.ctx.rotate(this.rotA);
        this.ctx.translate(-this.rotX, -this.rotY);
    }
    this.ctx.beginPath();
    this.ctx.moveTo(this.vpLLx + this.xoffset + x * this.xscl, this.vpLLy + this.yoffset + y * this.yscl);
    if (this.rotA) {
        this.ctx.restore();
    }
    this.penX = x;
    this.penY = y;
};
CvsGraphCtx.prototype.line = function(x, y, style) {
    if (this.rotA) {
        this.ctx.save();
        this.ctx.translate(this.rotX, this.rotY);
        this.ctx.rotate(this.rotA);
        this.ctx.translate(-this.rotX, -this.rotY);
    }
    this._setCtx();
    if (style == "dashed") {
        this.dashX = this.vpLLx + this.xoffset + this.penX * this.xscl;
        this.dashY = this.vpLLy + this.yoffset + this.penY * this.yscl;
        this.dashTo(this.vpLLx + this.xoffset + x * this.xscl, this.vpLLy + this.yoffset + y * this.yscl, 6, 8);
        this.ctx.stroke();
    } else {
        if (style == "dotted") {
            this.dashX = this.vpLLx + this.xoffset + this.penX * this.xscl;
            this.dashY = this.vpLLy + this.yoffset + this.penY * this.yscl;
            this.dashTo(this.vpLLx + this.xoffset + x * this.xscl, this.vpLLy + this.yoffset + y * this.yscl, 2, 6);
            this.ctx.stroke();
        } else {
            this.ctx.lineTo(this.vpLLx + this.xoffset + x * this.xscl, this.vpLLy + this.yoffset + y * this.yscl);
            this.ctx.stroke();
        }
    }
    if (this.rotA) {
        this.ctx.restore();
    }
    this.penX = x;
    this.penY = y;
};

function lineLength(sx, sy, ex, ey) {
    if (typeof ex == "undefined") {
        return Math.sqrt(sx * sx + sy * sy);
    }
    var dx = ex - sx;
    var dy = ey - sy;
    return Math.sqrt(dx * dx + dy * dy);
}
CvsGraphCtx.prototype.targetMoveTo = function(x, y) {
    this.dashX = x;
    this.dashY = y;
    this.ctx.moveTo(x, y);
};
CvsGraphCtx.prototype.targetLineTo = function(x, y) {
    if (x == this.dashX && y == this.dashY) {
        return;
    }
    this.dashX = x;
    this.dashY = y;
    this.ctx.lineTo(x, y);
};
CvsGraphCtx.prototype.dashTo = function(x, y, onLength, offLength) {
    var overflow = 0;
    var isLine = true;
    var dashLength = onLength + offLength;
    var dx = x - this.dashX;
    var dy = y - this.dashY;
    var a = Math.atan2(dy, dx);
    var ca = Math.cos(a),
        sa = Math.sin(a);
    var segLength = lineLength(dx, dy);
    if (overflow) {
        if (overflow > segLength) {
            if (isLine) {
                this.targetLineTo(x, y);
            } else {
                this.targetMoveTo(x, y);
            }
            overflow -= segLength;
            return;
        }
        if (isLine) {
            this.targetLineTo(this.dashX + ca * overflow, this.dashY + sa * overflow);
        } else {
            this.targetMoveTo(this.dashX + ca * overflow, this.dashY + sa * overflow);
        }
        segLength -= overflow;
        overflow = 0;
        isLine = !isLine;
        if (!segLength) {
            return;
        }
    }
    var fullDashCount = Math.floor(segLength / dashLength);
    if (fullDashCount) {
        var onx = ca * onLength,
            ony = sa * onLength;
        var offx = ca * offLength,
            offy = sa * offLength;
        for (var i = 0; i < fullDashCount; i++) {
            if (isLine) {
                this.targetLineTo(this.dashX + onx, this.dashY + ony);
                this.targetMoveTo(this.dashX + offx, this.dashY + offy);
            } else {
                this.targetMoveTo(this.dashX + offx, this.dashY + offy);
                this.targetLineTo(this.dashX + onx, this.dashY + ony);
            }
        }
        segLength -= dashLength * fullDashCount;
    }
    if (isLine) {
        if (segLength > onLength) {
            this.targetLineTo(this.dashX + ca * onLength, this.dashY + sa * onLength);
            this.targetMoveTo(x, y);
            overflow = offLength - (segLength - onLength);
            isLine = false;
        } else {
            this.targetLineTo(x, y);
            if (segLength == onLength) {
                overflow = 0;
                isLine = !isLine;
            } else {
                overflow = onLength - segLength;
                this.targetMoveTo(x, y);
            }
        }
    } else {
        if (segLength > offLength) {
            this.targetMoveTo(this.dashX + ca * offLength, this.dashY + sa * offLength);
            this.targetLineTo(x, y);
            overflow = onLength - (segLength - offLength);
            isLine = true;
        } else {
            this.targetMoveTo(x, y);
            if (segLength == offLength) {
                overflow = 0;
                isLine = !isLine;
            } else {
                overflow = offLength - segLength;
            }
        }
    }
};
CvsGraphCtx.prototype.polyLine = function(data) {
    if (this.rotA) {
        this.ctx.save();
        this.ctx.translate(this.rotX, this.rotY);
        this.ctx.rotate(this.rotA);
        this.ctx.translate(-this.rotX, -this.rotY);
    }
    this._setCtx();
    this.ctx.beginPath();
    if (data[0][0] != undefined) {
        this.ctx.moveTo(this.vpLLx + this.xoffset + data[0][0] * this.xscl, this.vpLLy + this.yoffset + data[0][1] * this.yscl);
        for (var i = 1; i < data.length; i++) {
            this.ctx.lineTo(this.vpLLx + this.xoffset + data[i][0] * this.xscl, this.vpLLy + this.yoffset + data[i][1] * this.yscl);
        }
        this.ctx.stroke();
        this.penX = data[data.length - 1][0];
        this.penY = data[data.length - 1][1];
    } else {
        this.ctx.moveTo(this.vpLLx + this.xoffset + data[0] * this.xscl, this.vpLLy + this.yoffset + data[1] * this.yscl);
        for (var i = 1; i < data.length / 2; i++) {
            this.ctx.lineTo(this.vpLLx + this.xoffset + data[2 * i] * this.xscl, this.vpLLy + this.yoffset + data[2 * i + 1] * this.yscl);
        }
        this.ctx.stroke();
        this.penX = data[data.length - 2];
        this.penY = data[data.length - 1];
    }
    if (this.rotA) {
        this.ctx.restore();
    }
};
CvsGraphCtx.prototype.quadBezier = function(c1x, c1y, x, y) {
    if (this.rotA) {
        this.ctx.save();
        this.ctx.translate(this.rotX, this.rotY);
        this.ctx.rotate(this.rotA);
        this.ctx.translate(-this.rotX, -this.rotY);
    }
    this._setCtx();
    this.ctx.quadraticCurveTo(this.vpLLx + this.xoffset + c1x * this.xscl, this.vpLLy + this.yoffset + c1y * this.yscl, this.vpLLx + this.xoffset + x * this.xscl, this.vpLLy + this.yoffset + y * this.yscl);
    this.ctx.stroke();
    if (this.rotA) {
        this.ctx.restore();
    }
    this.penX = x;
    this.penY = y;
};
CvsGraphCtx.prototype.cubicBezier = function(c1x, c1y, c2x, c2y, x, y) {
    if (this.rotA) {
        this.ctx.save();
        this.ctx.translate(this.rotX, this.rotY);
        this.ctx.rotate(this.rotA);
        this.ctx.translate(-this.rotX, -this.rotY);
    }
    this._setCtx();
    this.ctx.bezierCurveTo(this.vpLLx + this.xoffset + c1x * this.xscl, this.vpLLy + this.yoffset + c1y * this.yscl, this.vpLLx + this.xoffset + c2x * this.xscl, this.vpLLy + this.yoffset + c2y * this.yscl, this.vpLLx + this.xoffset + x * this.xscl, this.vpLLy + this.yoffset + y * this.yscl);
    this.ctx.stroke();
    if (this.rotA) {
        this.ctx.restore();
    }
    this.penX = x;
    this.penY = y;
};
CvsGraphCtx.prototype.polygon = function(data, fillColor) {
    var newCol = new RGBAColor(fillColor);
    if (this.rotA) {
        this.ctx.save();
        this.ctx.translate(this.rotX, this.rotY);
        this.ctx.rotate(this.rotA);
        this.ctx.translate(-this.rotX, -this.rotY);
    }
    this._setCtx();
    this.ctx.beginPath();
    if (data[0][0] != undefined) {
        this.ctx.moveTo(this.vpLLx + this.xoffset + data[0][0] * this.xscl, this.vpLLy + this.yoffset + data[0][1] * this.yscl);
        for (var i = 1; i < data.length; i++) {
            this.ctx.lineTo(this.vpLLx + this.xoffset + data[i][0] * this.xscl, this.vpLLy + this.yoffset + data[i][1] * this.yscl);
        }
        this.ctx.lineTo(this.vpLLx + this.xoffset + data[0][0] * this.xscl, this.vpLLy + this.yoffset + data[0][1] * this.yscl);
        this.penX = data[0][0];
        this.penY = data[0][1];
    } else {
        this.ctx.moveTo(this.vpLLx + this.xoffset + data[0] * this.xscl, this.vpLLy + this.yoffset + data[1] * this.yscl);
        for (var i = 1; i < data.length / 2; i++) {
            this.ctx.lineTo(this.vpLLx + this.xoffset + data[2 * i] * this.xscl, this.vpLLy + this.yoffset + data[2 * i + 1] * this.yscl);
        }
        this.ctx.lineTo(this.vpLLx + this.xoffset + data[0] * this.xscl, this.vpLLy + this.yoffset + data[1] * this.yscl);
        this.penX = data[0];
        this.penY = data[1];
    }
    if (newCol.ok) {
        var hexCol = newCol.toRGBA();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = hexCol;
        this.ctx.fillStyle = hexCol;
        this.ctx.fill();
        this.ctx.stroke();
    } else {
        this.ctx.stroke();
    }
    this._setCtx();
    if (this.rotA) {
        this.ctx.restore();
    }
};
CvsGraphCtx.prototype.arrow = function(x1, y1, x2, y2, size) {
    var a = 20;
    var scale = 2;
    var dx = (x2 - x1) * this.xscl;
    var dy = (y2 - y1) * this.yscl;
    var theta = -Math.atan2(dy, dx);
    var phiL = theta + Math.PI - (a * Math.PI / 180);
    var phiR = theta + Math.PI + (a * Math.PI / 180);
    var phiC = theta + Math.PI;
    if (size != undefined) {
        scale = size;
    }
    if (size < 1) {
        scale = 1;
    }
    if (size > 9) {
        scale = 9;
    }
    var r = scale * (3 + 4 * Math.sqrt(this.penWid));
    var x3 = x2 + r * Math.cos(phiL) / this.xscl;
    var y3 = y2 - r * Math.sin(phiL) / this.yscl;
    var x4 = x2 + r * Math.cos(phiR) / this.xscl;
    var y4 = y2 - r * Math.sin(phiR) / this.yscl;
    var xs = x2 + 0.9 * r * Math.cos(phiC) / this.xscl;
    var ys = y2 - 0.9 * r * Math.sin(phiC) / this.yscl;
    if (this.rotA) {
        this.ctx.save();
        this.ctx.translate(this.rotX, this.rotY);
        this.ctx.rotate(this.rotA);
        this.ctx.translate(-this.rotX, -this.rotY);
    }
    this._setCtx();
    this.ctx.beginPath();
    this.ctx.moveTo(this.vpLLx + this.xoffset + x1 * this.xscl, this.vpLLy + this.yoffset + y1 * this.yscl);
    this.ctx.lineTo(this.vpLLx + this.xoffset + xs * this.xscl, this.vpLLy + this.yoffset + ys * this.yscl);
    this.ctx.stroke();
    this.ctx.moveTo(this.vpLLx + this.xoffset + x2 * this.xscl, this.vpLLy + this.yoffset + y2 * this.yscl);
    this.ctx.lineTo(this.vpLLx + this.xoffset + x3 * this.xscl, this.vpLLy + this.yoffset + y3 * this.yscl);
    this.ctx.lineTo(this.vpLLx + this.xoffset + x4 * this.xscl, this.vpLLy + this.yoffset + y4 * this.yscl);
    this.ctx.lineTo(this.vpLLx + this.xoffset + x2 * this.xscl, this.vpLLy + this.yoffset + y2 * this.yscl);
    this.ctx.fill();
    if (this.rotA) {
        this.ctx.restore();
    }
    this.penX = x2;
    this.penY = y2;
};
CvsGraphCtx.prototype.rect = function(x, y, w, h, fillColor) {
    if (this.rotA) {
        this.ctx.save();
        this.ctx.translate(this.rotX, this.rotY);
        this.ctx.rotate(this.rotA);
        this.ctx.translate(-this.rotX, -this.rotY);
    }
    this._setCtx();
    var newCol = new RGBAColor(fillColor);
    if (newCol.ok) {
        this.ctx.fillStyle = newCol.toRGBA();
        this.ctx.fillRect(this.vpLLx + this.xoffset + x * this.xscl, this.vpLLy + this.yoffset + y * this.yscl, w * this.xscl, h * this.yscl);
    } else {
        this.ctx.strokeRect(this.vpLLx + this.xoffset + x * this.xscl, this.vpLLy + this.yoffset + y * this.yscl, w * this.xscl, h * this.yscl);
    }
    this._setCtx();
    if (this.rotA) {
        this.ctx.restore();
    }
};
CvsGraphCtx.prototype.shape = function(shape, x, y, size, fillColor) {
    var xLofs, yLofs;
    var fill = false;
    var d = size * this.xscl;
    if (this.rotA) {
        this.ctx.save();
        this.ctx.translate(this.rotX, this.rotY);
        this.ctx.rotate(this.rotA);
        this.ctx.translate(-this.rotX, -this.rotY);
    }
    this._setCtx();
    var newCol = new RGBAColor(fillColor);
    if (newCol.ok) {
        this.ctx.fillStyle = newCol.toRGBA();
        fill = true;
    }
    switch (shape) {
        case "square":
            xLofs = -0.5 * d;
            yLofs = -0.5 * d;
            if (fill) {
                this.ctx.fillRect(this.vpLLx + this.xoffset + x * this.xscl + xLofs, this.vpLLy + this.yoffset + y * this.yscl + yLofs, d, d);
            } else {
                this.ctx.strokeRect(this.vpLLx + this.xoffset + x * this.xscl + xLofs, this.vpLLy + this.yoffset + y * this.yscl + yLofs, d, d);
            }
            break;
        case "triangle":
            this.ctx.beginPath();
            xLofs = 0;
            yLofs = -0.5747 * d;
            this.ctx.moveTo(this.vpLLx + this.xoffset + x * this.xscl + xLofs, this.vpLLy + this.yoffset + y * this.yscl + yLofs);
            xLofs = 0.5 * d;
            yLofs = 0.2887 * d;
            this.ctx.lineTo(this.vpLLx + this.xoffset + x * this.xscl + xLofs, this.vpLLy + this.yoffset + y * this.yscl + yLofs);
            xLofs = -0.5 * d;
            yLofs = 0.2887 * d;
            this.ctx.lineTo(this.vpLLx + this.xoffset + x * this.xscl + xLofs, this.vpLLy + this.yoffset + y * this.yscl + yLofs);
            this.ctx.closePath();
            if (fill) {
                this.ctx.fill();
            } else {
                this.ctx.stroke();
            }
            break;
        case "circle":
        default:
            var ccw = false;
            this.ctx.beginPath();
            this.ctx.arc(this.vpLLx + this.xoffset + x * this.xscl, this.vpLLy + this.yoffset + y * this.yscl, 0.5 * d, 0, 1.95 * Math.PI, ccw);
            this.ctx.closePath();
            if (fill) {
                this.ctx.fill();
            } else {
                this.ctx.stroke();
            }
    }
    this._setCtx();
    if (this.rotA) {
        this.ctx.restore();
    }
};
CvsGraphCtx.prototype.drawImg = function(imgURL, x, y, w, lorg, degs) {
    var img = new Image();
    img.src = imgURL;
    this.updateImg(img, x, y, w, lorg, degs);
    return img;
};
CvsGraphCtx.prototype.updateImg = function(img, x, y, w, lorg, degs) {
    var savThis = this;
    var savRotX = this.rotX;
    var savRotY = this.rotY;
    var savRotA = this.rotA;

    function updateImgCallback() {
        if ((img.complete) && (!_busy[this.cId])) {
            _busy[this.cId] = true;
            modifyImg.call(savThis, img, x, y, w, lorg, degs, savRotX, savRotY, savRotA);
            _busy[this.cId] = false;
        } else {
            setTimeout(function() {
                updateImgCallback.call(savThis);
            }, 50);
        }
    }
    updateImgCallback();
};

function modifyImg(img, x, y, w, lorg, degs, rotX, rotY, rotA) {
    var reScale = w * this.xscl / img.width;
    var xLofs, yLofs;
    var rot = 0;
    if (degs != undefined) {
        rot = -degs * Math.PI / 180;
    }
    switch (lorg) {
        case 1:
            xLofs = 0;
            yLofs = 0;
            break;
        case 2:
            xLofs = 0.5 * img.width;
            yLofs = 0;
            break;
        case 3:
            xLofs = img.width;
            yLofs = 0;
            break;
        case 4:
            xLofs = 0;
            yLofs = 0.5 * img.height;
            break;
        case 5:
            xLofs = 0.5 * img.width;
            yLofs = 0.5 * img.height;
            break;
        case 6:
            xLofs = img.width;
            yLofs = 0.5 * img.height;
            break;
        case 7:
            xLofs = 0;
            yLofs = img.height;
            break;
        case 8:
            xLofs = 0.5 * img.width;
            yLofs = img.height;
            break;
        case 9:
            xLofs = img.width;
            yLofs = img.height;
            break;
        default:
            xLofs = 0;
            yLofs = 0;
    }
    this.ctx.save();
    if (rotA) {
        this.ctx.translate(rotX, rotY);
        this.ctx.rotate(rotA);
        this.ctx.translate(-rotX, -rotY);
    }
    this.ctx.translate(this.vpLLx + x * this.xscl + this.xoffset, this.vpLLy + y * this.yscl + this.yoffset);
    this.ctx.rotate(rot);
    this.ctx.drawImage(img, -reScale * xLofs, -reScale * yLofs, reScale * img.width, reScale * img.height);
    this.ctx.restore();
}
CvsGraphCtx.prototype.label = function(str, x, y, lorg, degs, ptSize) {
    var fSize = this.fontSize;
    var xLofs, yLofs;
    var rot = 0;
    if (degs != undefined) {
        rot = -degs * Math.PI / 180;
    }
    if ((ptSize != undefined) && (ptSize > 4)) {
        fSize = ptSize;
    }
    var strLen = CanvasTextFunctions.measure(0, fSize, str);
    switch (lorg) {
        case 1:
        default:
            xLofs = 0;
            yLofs = 0.84 * fSize;
            break;
        case 2:
            xLofs = 0.5 * strLen;
            yLofs = 0.84 * fSize;
            break;
        case 3:
            xLofs = strLen;
            yLofs = 0.84 * fSize;
            break;
        case 4:
            xLofs = 0;
            yLofs = 0.42 * fSize;
            break;
        case 5:
            xLofs = 0.5 * strLen;
            yLofs = 0.42 * fSize;
            break;
        case 6:
            xLofs = strLen;
            yLofs = 0.42 * fSize;
            break;
        case 7:
            xLofs = 0;
            yLofs = 0;
            break;
        case 8:
            xLofs = 0.5 * strLen;
            yLofs = 0;
            break;
        case 9:
            xLofs = strLen;
            yLofs = 0;
            break;
    }
    this.ctx.save();
    if (this.rotA) {
        this.ctx.translate(this.rotX, this.rotY);
        this.ctx.rotate(this.rotA);
        this.ctx.translate(-this.rotX, -this.rotY);
    }
    this._setCtx();
    this.ctx.translate(this.vpLLx + x * this.xscl + this.xoffset, this.vpLLy + y * this.yscl + this.yoffset);
    this.ctx.rotate(rot);
    CanvasTextFunctions.draw(this.ctx, 0, fSize, -xLofs, yLofs, str);
    this.ctx.restore();
};
CvsGraphCtx.prototype.dupCtx = function(src_graphCtx) {
    this.vpLLx = src_graphCtx.vpLLx;
    this.vpLLy = src_graphCtx.vpLLy;
    this.xscl = src_graphCtx.xscl;
    this.yscl = src_graphCtx.yscl;
    this.xoffset = src_graphCtx.xoffset;
    this.yoffset = src_graphCtx.yoffset;
    this.penCol = src_graphCtx.penCol;
    this.penWid = src_graphCtx.penWid;
    this.bkgCol = src_graphCtx.bkgCol;
    this.fontSize = src_graphCtx.fontSize;
    this.penX = src_graphCtx.penX;
    this.penY = src_graphCtx.penY;
};

function CanvasStack(holderID, bkgColor) {
    var ua = navigator.userAgent.toLowerCase();
    this.isIE = (/msie/.test(ua)) && !(/opera/.test(ua)) && (/win/.test(ua));
    this.overlays = new Array();
    this.ovlyNumber = 0;
    this.holderID = holderID;
    this.holderNode = document.getElementById(this.holderID);
    if (this.holderNode.style.position == "static") {
        this.holderNode.style.position = "relative";
    }
    this.bkgCvs = document.createElement("canvas");
    this.bkgCvsId = this.holderID + "_bkg";
    this.bkgCvs.setAttribute("id", this.bkgCvsId);
    this.bkgCvs.setAttribute("width", this.holderNode.offsetWidth);
    this.bkgCvs.setAttribute("height", this.holderNode.offsetHeight);
    this.bkgCvs.style.backgroundColor = "transparent";
    if (bkgColor != undefined) {
        this.bkgCvs.style.backgroundColor = bkgColor;
    }
    this.bkgCvs.style.position = "absolute";
    this.bkgCvs.style.left = "0px";
    this.bkgCvs.style.top = "0px";
    this.holderNode.appendChild(this.bkgCvs);
    if (this.isIE) {
        G_vmlCanvasManager.initElement(this.bkgCvs);
    }
}
CanvasStack.prototype.getBackgroundCanvasId = function() {
    return this.bkgCvsId;
};
CanvasStack.prototype.createLayer = function() {
    var newCvs = document.createElement("canvas");
    var ovlId = this.holderID + "_ovl_" + this.ovlyNumber;
    this.ovlyNumber++;
    newCvs.setAttribute("id", ovlId);
    newCvs.setAttribute("width", this.holderNode.offsetWidth);
    newCvs.setAttribute("height", this.holderNode.offsetHeight);
    newCvs.style.backgroundColor = "transparent";
    newCvs.style.position = "absolute";
    newCvs.style.left = "0px";
    newCvs.style.top = "0px";
    this.holderNode.appendChild(newCvs);
    if (this.isIE) {
        G_vmlCanvasManager.initElement(newCvs);
    }
    this.overlays.push(ovlId);
    return ovlId;
};
CanvasStack.prototype.deleteLayer = function(ovlyId) {
    var idx = -1;
    for (var i = 0; i < this.overlays.length; i++) {
        if (this.overlays[i] == ovlyId) {
            idx = i;
        }
    }
    if (idx == -1) {
        alert("overlay not found");
        return;
    }
    var ovlNode = document.getElementById(ovlyId);
    if (!ovlNode) {
        alert("overlay node not found");
        this.overlays.splice(idx, 1);
        return;
    }
    var papa = ovlNode.parentNode;
    this.holderNode.removeChild(ovlNode);
    this.overlays.splice(idx, 1);
};
CanvasStack.prototype.deleteAllLayers = function() {
    var ovlNode;
    for (var i = this.overlays.length - 1; i >= 0; i--) {
        ovlNode = document.getElementById(this.overlays[i]);
        if (ovlNode) {
            this.holderNode.removeChild(ovlNode);
        }
        this.overlays.splice(i, 1);
    }
};
var CanvasTextFunctions = {};
CanvasTextFunctions.letters = {
    " ": {
        width: 16,
        points: []
    },
    "!": {
        width: 10,
        points: [
            [5, 21],
            [5, 7],
            [-1, -1],
            [5, 2],
            [4, 1],
            [5, 0],
            [6, 1],
            [5, 2]
        ]
    },
    '"': {
        width: 16,
        points: [
            [4, 21],
            [4, 14],
            [-1, -1],
            [12, 21],
            [12, 14]
        ]
    },
    "#": {
        width: 21,
        points: [
            [11, 25],
            [4, -7],
            [-1, -1],
            [17, 25],
            [10, -7],
            [-1, -1],
            [4, 12],
            [18, 12],
            [-1, -1],
            [3, 6],
            [17, 6]
        ]
    },
    "$": {
        width: 20,
        points: [
            [8, 25],
            [8, -4],
            [-1, -1],
            [12, 25],
            [12, -4],
            [-1, -1],
            [17, 18],
            [15, 20],
            [12, 21],
            [8, 21],
            [5, 20],
            [3, 18],
            [3, 16],
            [4, 14],
            [5, 13],
            [7, 12],
            [13, 10],
            [15, 9],
            [16, 8],
            [17, 6],
            [17, 3],
            [15, 1],
            [12, 0],
            [8, 0],
            [5, 1],
            [3, 3]
        ]
    },
    "%": {
        width: 24,
        points: [
            [21, 21],
            [3, 0],
            [-1, -1],
            [8, 21],
            [10, 19],
            [10, 17],
            [9, 15],
            [7, 14],
            [5, 14],
            [3, 16],
            [3, 18],
            [4, 20],
            [6, 21],
            [8, 21],
            [10, 20],
            [13, 19],
            [16, 19],
            [19, 20],
            [21, 21],
            [-1, -1],
            [17, 7],
            [15, 6],
            [14, 4],
            [14, 2],
            [16, 0],
            [18, 0],
            [20, 1],
            [21, 3],
            [21, 5],
            [19, 7],
            [17, 7]
        ]
    },
    "&": {
        width: 26,
        points: [
            [23, 12],
            [23, 13],
            [22, 14],
            [21, 14],
            [20, 13],
            [19, 11],
            [17, 6],
            [15, 3],
            [13, 1],
            [11, 0],
            [7, 0],
            [5, 1],
            [4, 2],
            [3, 4],
            [3, 6],
            [4, 8],
            [5, 9],
            [12, 13],
            [13, 14],
            [14, 16],
            [14, 18],
            [13, 20],
            [11, 21],
            [9, 20],
            [8, 18],
            [8, 16],
            [9, 13],
            [11, 10],
            [16, 3],
            [18, 1],
            [20, 0],
            [22, 0],
            [23, 1],
            [23, 2]
        ]
    },
    "'": {
        width: 10,
        points: [
            [5, 19],
            [4, 20],
            [5, 21],
            [6, 20],
            [6, 18],
            [5, 16],
            [4, 15]
        ]
    },
    "(": {
        width: 14,
        points: [
            [11, 25],
            [9, 23],
            [7, 20],
            [5, 16],
            [4, 11],
            [4, 7],
            [5, 2],
            [7, -2],
            [9, -5],
            [11, -7]
        ]
    },
    ")": {
        width: 14,
        points: [
            [3, 25],
            [5, 23],
            [7, 20],
            [9, 16],
            [10, 11],
            [10, 7],
            [9, 2],
            [7, -2],
            [5, -5],
            [3, -7]
        ]
    },
    "*": {
        width: 16,
        points: [
            [8, 21],
            [8, 9],
            [-1, -1],
            [3, 18],
            [13, 12],
            [-1, -1],
            [13, 18],
            [3, 12]
        ]
    },
    "+": {
        width: 26,
        points: [
            [13, 18],
            [13, 0],
            [-1, -1],
            [4, 9],
            [22, 9]
        ]
    },
    ",": {
        width: 10,
        points: [
            [6, 1],
            [5, 0],
            [4, 1],
            [5, 2],
            [6, 1],
            [6, -1],
            [5, -3],
            [4, -4]
        ]
    },
    "-": {
        width: 26,
        points: [
            [4, 9],
            [22, 9]
        ]
    },
    ".": {
        width: 10,
        points: [
            [5, 2],
            [4, 1],
            [5, 0],
            [6, 1],
            [5, 2]
        ]
    },
    "/": {
        width: 22,
        points: [
            [20, 25],
            [2, -7]
        ]
    },
    "0": {
        width: 20,
        points: [
            [9, 21],
            [6, 20],
            [4, 17],
            [3, 12],
            [3, 9],
            [4, 4],
            [6, 1],
            [9, 0],
            [11, 0],
            [14, 1],
            [16, 4],
            [17, 9],
            [17, 12],
            [16, 17],
            [14, 20],
            [11, 21],
            [9, 21]
        ]
    },
    "1": {
        width: 20,
        points: [
            [6, 17],
            [8, 18],
            [11, 21],
            [11, 0]
        ]
    },
    "2": {
        width: 20,
        points: [
            [4, 16],
            [4, 17],
            [5, 19],
            [6, 20],
            [8, 21],
            [12, 21],
            [14, 20],
            [15, 19],
            [16, 17],
            [16, 15],
            [15, 13],
            [13, 10],
            [3, 0],
            [17, 0]
        ]
    },
    "3": {
        width: 20,
        points: [
            [5, 21],
            [16, 21],
            [10, 13],
            [13, 13],
            [15, 12],
            [16, 11],
            [17, 8],
            [17, 6],
            [16, 3],
            [14, 1],
            [11, 0],
            [8, 0],
            [5, 1],
            [4, 2],
            [3, 4]
        ]
    },
    "4": {
        width: 20,
        points: [
            [13, 21],
            [3, 7],
            [18, 7],
            [-1, -1],
            [13, 21],
            [13, 0]
        ]
    },
    "5": {
        width: 20,
        points: [
            [15, 21],
            [5, 21],
            [4, 12],
            [5, 13],
            [8, 14],
            [11, 14],
            [14, 13],
            [16, 11],
            [17, 8],
            [17, 6],
            [16, 3],
            [14, 1],
            [11, 0],
            [8, 0],
            [5, 1],
            [4, 2],
            [3, 4]
        ]
    },
    "6": {
        width: 20,
        points: [
            [16, 18],
            [15, 20],
            [12, 21],
            [10, 21],
            [7, 20],
            [5, 17],
            [4, 12],
            [4, 7],
            [5, 3],
            [7, 1],
            [10, 0],
            [11, 0],
            [14, 1],
            [16, 3],
            [17, 6],
            [17, 7],
            [16, 10],
            [14, 12],
            [11, 13],
            [10, 13],
            [7, 12],
            [5, 10],
            [4, 7]
        ]
    },
    "7": {
        width: 20,
        points: [
            [17, 21],
            [7, 0],
            [-1, -1],
            [3, 21],
            [17, 21]
        ]
    },
    "8": {
        width: 20,
        points: [
            [8, 21],
            [5, 20],
            [4, 18],
            [4, 16],
            [5, 14],
            [7, 13],
            [11, 12],
            [14, 11],
            [16, 9],
            [17, 7],
            [17, 4],
            [16, 2],
            [15, 1],
            [12, 0],
            [8, 0],
            [5, 1],
            [4, 2],
            [3, 4],
            [3, 7],
            [4, 9],
            [6, 11],
            [9, 12],
            [13, 13],
            [15, 14],
            [16, 16],
            [16, 18],
            [15, 20],
            [12, 21],
            [8, 21]
        ]
    },
    "9": {
        width: 20,
        points: [
            [16, 14],
            [15, 11],
            [13, 9],
            [10, 8],
            [9, 8],
            [6, 9],
            [4, 11],
            [3, 14],
            [3, 15],
            [4, 18],
            [6, 20],
            [9, 21],
            [10, 21],
            [13, 20],
            [15, 18],
            [16, 14],
            [16, 9],
            [15, 4],
            [13, 1],
            [10, 0],
            [8, 0],
            [5, 1],
            [4, 3]
        ]
    },
    ":": {
        width: 10,
        points: [
            [5, 14],
            [4, 13],
            [5, 12],
            [6, 13],
            [5, 14],
            [-1, -1],
            [5, 2],
            [4, 1],
            [5, 0],
            [6, 1],
            [5, 2]
        ]
    },
    ";": {
        width: 10,
        points: [
            [5, 14],
            [4, 13],
            [5, 12],
            [6, 13],
            [5, 14],
            [-1, -1],
            [6, 1],
            [5, 0],
            [4, 1],
            [5, 2],
            [6, 1],
            [6, -1],
            [5, -3],
            [4, -4]
        ]
    },
    "<": {
        width: 24,
        points: [
            [20, 18],
            [4, 9],
            [20, 0]
        ]
    },
    "=": {
        width: 26,
        points: [
            [4, 12],
            [22, 12],
            [-1, -1],
            [4, 6],
            [22, 6]
        ]
    },
    ">": {
        width: 24,
        points: [
            [4, 18],
            [20, 9],
            [4, 0]
        ]
    },
    "?": {
        width: 18,
        points: [
            [3, 16],
            [3, 17],
            [4, 19],
            [5, 20],
            [7, 21],
            [11, 21],
            [13, 20],
            [14, 19],
            [15, 17],
            [15, 15],
            [14, 13],
            [13, 12],
            [9, 10],
            [9, 7],
            [-1, -1],
            [9, 2],
            [8, 1],
            [9, 0],
            [10, 1],
            [9, 2]
        ]
    },
    "@": {
        width: 27,
        points: [
            [18, 13],
            [17, 15],
            [15, 16],
            [12, 16],
            [10, 15],
            [9, 14],
            [8, 11],
            [8, 8],
            [9, 6],
            [11, 5],
            [14, 5],
            [16, 6],
            [17, 8],
            [-1, -1],
            [12, 16],
            [10, 14],
            [9, 11],
            [9, 8],
            [10, 6],
            [11, 5],
            [-1, -1],
            [18, 16],
            [17, 8],
            [17, 6],
            [19, 5],
            [21, 5],
            [23, 7],
            [24, 10],
            [24, 12],
            [23, 15],
            [22, 17],
            [20, 19],
            [18, 20],
            [15, 21],
            [12, 21],
            [9, 20],
            [7, 19],
            [5, 17],
            [4, 15],
            [3, 12],
            [3, 9],
            [4, 6],
            [5, 4],
            [7, 2],
            [9, 1],
            [12, 0],
            [15, 0],
            [18, 1],
            [20, 2],
            [21, 3],
            [-1, -1],
            [19, 16],
            [18, 8],
            [18, 6],
            [19, 5]
        ]
    },
    "A": {
        width: 18,
        points: [
            [9, 21],
            [1, 0],
            [-1, -1],
            [9, 21],
            [17, 0],
            [-1, -1],
            [4, 7],
            [14, 7]
        ]
    },
    "B": {
        width: 21,
        points: [
            [4, 21],
            [4, 0],
            [-1, -1],
            [4, 21],
            [13, 21],
            [16, 20],
            [17, 19],
            [18, 17],
            [18, 15],
            [17, 13],
            [16, 12],
            [13, 11],
            [-1, -1],
            [4, 11],
            [13, 11],
            [16, 10],
            [17, 9],
            [18, 7],
            [18, 4],
            [17, 2],
            [16, 1],
            [13, 0],
            [4, 0]
        ]
    },
    "C": {
        width: 21,
        points: [
            [18, 16],
            [17, 18],
            [15, 20],
            [13, 21],
            [9, 21],
            [7, 20],
            [5, 18],
            [4, 16],
            [3, 13],
            [3, 8],
            [4, 5],
            [5, 3],
            [7, 1],
            [9, 0],
            [13, 0],
            [15, 1],
            [17, 3],
            [18, 5]
        ]
    },
    "D": {
        width: 21,
        points: [
            [4, 21],
            [4, 0],
            [-1, -1],
            [4, 21],
            [11, 21],
            [14, 20],
            [16, 18],
            [17, 16],
            [18, 13],
            [18, 8],
            [17, 5],
            [16, 3],
            [14, 1],
            [11, 0],
            [4, 0]
        ]
    },
    "E": {
        width: 19,
        points: [
            [4, 21],
            [4, 0],
            [-1, -1],
            [4, 21],
            [17, 21],
            [-1, -1],
            [4, 11],
            [12, 11],
            [-1, -1],
            [4, 0],
            [17, 0]
        ]
    },
    "F": {
        width: 18,
        points: [
            [4, 21],
            [4, 0],
            [-1, -1],
            [4, 21],
            [17, 21],
            [-1, -1],
            [4, 11],
            [12, 11]
        ]
    },
    "G": {
        width: 21,
        points: [
            [18, 16],
            [17, 18],
            [15, 20],
            [13, 21],
            [9, 21],
            [7, 20],
            [5, 18],
            [4, 16],
            [3, 13],
            [3, 8],
            [4, 5],
            [5, 3],
            [7, 1],
            [9, 0],
            [13, 0],
            [15, 1],
            [17, 3],
            [18, 5],
            [18, 8],
            [-1, -1],
            [13, 8],
            [18, 8]
        ]
    },
    "H": {
        width: 22,
        points: [
            [4, 21],
            [4, 0],
            [-1, -1],
            [18, 21],
            [18, 0],
            [-1, -1],
            [4, 11],
            [18, 11]
        ]
    },
    "I": {
        width: 8,
        points: [
            [4, 21],
            [4, 0]
        ]
    },
    "J": {
        width: 16,
        points: [
            [12, 21],
            [12, 5],
            [11, 2],
            [10, 1],
            [8, 0],
            [6, 0],
            [4, 1],
            [3, 2],
            [2, 5],
            [2, 7]
        ]
    },
    "K": {
        width: 21,
        points: [
            [4, 21],
            [4, 0],
            [-1, -1],
            [18, 21],
            [4, 7],
            [-1, -1],
            [9, 12],
            [18, 0]
        ]
    },
    "L": {
        width: 17,
        points: [
            [4, 21],
            [4, 0],
            [-1, -1],
            [4, 0],
            [16, 0]
        ]
    },
    "M": {
        width: 24,
        points: [
            [4, 21],
            [4, 0],
            [-1, -1],
            [4, 21],
            [12, 0],
            [-1, -1],
            [20, 21],
            [12, 0],
            [-1, -1],
            [20, 21],
            [20, 0]
        ]
    },
    "N": {
        width: 22,
        points: [
            [4, 21],
            [4, 0],
            [-1, -1],
            [4, 21],
            [18, 0],
            [-1, -1],
            [18, 21],
            [18, 0]
        ]
    },
    "O": {
        width: 22,
        points: [
            [9, 21],
            [7, 20],
            [5, 18],
            [4, 16],
            [3, 13],
            [3, 8],
            [4, 5],
            [5, 3],
            [7, 1],
            [9, 0],
            [13, 0],
            [15, 1],
            [17, 3],
            [18, 5],
            [19, 8],
            [19, 13],
            [18, 16],
            [17, 18],
            [15, 20],
            [13, 21],
            [9, 21]
        ]
    },
    "P": {
        width: 21,
        points: [
            [4, 21],
            [4, 0],
            [-1, -1],
            [4, 21],
            [13, 21],
            [16, 20],
            [17, 19],
            [18, 17],
            [18, 14],
            [17, 12],
            [16, 11],
            [13, 10],
            [4, 10]
        ]
    },
    "Q": {
        width: 22,
        points: [
            [9, 21],
            [7, 20],
            [5, 18],
            [4, 16],
            [3, 13],
            [3, 8],
            [4, 5],
            [5, 3],
            [7, 1],
            [9, 0],
            [13, 0],
            [15, 1],
            [17, 3],
            [18, 5],
            [19, 8],
            [19, 13],
            [18, 16],
            [17, 18],
            [15, 20],
            [13, 21],
            [9, 21],
            [-1, -1],
            [12, 4],
            [18, -2]
        ]
    },
    "R": {
        width: 21,
        points: [
            [4, 21],
            [4, 0],
            [-1, -1],
            [4, 21],
            [13, 21],
            [16, 20],
            [17, 19],
            [18, 17],
            [18, 15],
            [17, 13],
            [16, 12],
            [13, 11],
            [4, 11],
            [-1, -1],
            [11, 11],
            [18, 0]
        ]
    },
    "S": {
        width: 20,
        points: [
            [17, 18],
            [15, 20],
            [12, 21],
            [8, 21],
            [5, 20],
            [3, 18],
            [3, 16],
            [4, 14],
            [5, 13],
            [7, 12],
            [13, 10],
            [15, 9],
            [16, 8],
            [17, 6],
            [17, 3],
            [15, 1],
            [12, 0],
            [8, 0],
            [5, 1],
            [3, 3]
        ]
    },
    "T": {
        width: 16,
        points: [
            [8, 21],
            [8, 0],
            [-1, -1],
            [1, 21],
            [15, 21]
        ]
    },
    "U": {
        width: 22,
        points: [
            [4, 21],
            [4, 6],
            [5, 3],
            [7, 1],
            [10, 0],
            [12, 0],
            [15, 1],
            [17, 3],
            [18, 6],
            [18, 21]
        ]
    },
    "V": {
        width: 18,
        points: [
            [1, 21],
            [9, 0],
            [-1, -1],
            [17, 21],
            [9, 0]
        ]
    },
    "W": {
        width: 24,
        points: [
            [2, 21],
            [7, 0],
            [-1, -1],
            [12, 21],
            [7, 0],
            [-1, -1],
            [12, 21],
            [17, 0],
            [-1, -1],
            [22, 21],
            [17, 0]
        ]
    },
    "X": {
        width: 20,
        points: [
            [3, 21],
            [17, 0],
            [-1, -1],
            [17, 21],
            [3, 0]
        ]
    },
    "Y": {
        width: 18,
        points: [
            [1, 21],
            [9, 11],
            [9, 0],
            [-1, -1],
            [17, 21],
            [9, 11]
        ]
    },
    "Z": {
        width: 20,
        points: [
            [17, 21],
            [3, 0],
            [-1, -1],
            [3, 21],
            [17, 21],
            [-1, -1],
            [3, 0],
            [17, 0]
        ]
    },
    "[": {
        width: 14,
        points: [
            [4, 25],
            [4, -7],
            [-1, -1],
            [5, 25],
            [5, -7],
            [-1, -1],
            [4, 25],
            [11, 25],
            [-1, -1],
            [4, -7],
            [11, -7]
        ]
    },
    "\\": {
        width: 14,
        points: [
            [0, 21],
            [14, -3]
        ]
    },
    "]": {
        width: 14,
        points: [
            [9, 25],
            [9, -7],
            [-1, -1],
            [10, 25],
            [10, -7],
            [-1, -1],
            [3, 25],
            [10, 25],
            [-1, -1],
            [3, -7],
            [10, -7]
        ]
    },
    "^": {
        width: 16,
        points: [
            [6, 15],
            [8, 18],
            [10, 15],
            [-1, -1],
            [3, 12],
            [8, 17],
            [13, 12],
            [-1, -1],
            [8, 17],
            [8, 0]
        ]
    },
    "_": {
        width: 16,
        points: [
            [0, -2],
            [16, -2]
        ]
    },
    "`": {
        width: 10,
        points: [
            [6, 21],
            [5, 20],
            [4, 18],
            [4, 16],
            [5, 15],
            [6, 16],
            [5, 17]
        ]
    },
    "a": {
        width: 19,
        points: [
            [15, 14],
            [15, 0],
            [-1, -1],
            [15, 11],
            [13, 13],
            [11, 14],
            [8, 14],
            [6, 13],
            [4, 11],
            [3, 8],
            [3, 6],
            [4, 3],
            [6, 1],
            [8, 0],
            [11, 0],
            [13, 1],
            [15, 3]
        ]
    },
    "b": {
        width: 19,
        points: [
            [4, 21],
            [4, 0],
            [-1, -1],
            [4, 11],
            [6, 13],
            [8, 14],
            [11, 14],
            [13, 13],
            [15, 11],
            [16, 8],
            [16, 6],
            [15, 3],
            [13, 1],
            [11, 0],
            [8, 0],
            [6, 1],
            [4, 3]
        ]
    },
    "c": {
        width: 18,
        points: [
            [15, 11],
            [13, 13],
            [11, 14],
            [8, 14],
            [6, 13],
            [4, 11],
            [3, 8],
            [3, 6],
            [4, 3],
            [6, 1],
            [8, 0],
            [11, 0],
            [13, 1],
            [15, 3]
        ]
    },
    "d": {
        width: 19,
        points: [
            [15, 21],
            [15, 0],
            [-1, -1],
            [15, 11],
            [13, 13],
            [11, 14],
            [8, 14],
            [6, 13],
            [4, 11],
            [3, 8],
            [3, 6],
            [4, 3],
            [6, 1],
            [8, 0],
            [11, 0],
            [13, 1],
            [15, 3]
        ]
    },
    "e": {
        width: 18,
        points: [
            [3, 8],
            [15, 8],
            [15, 10],
            [14, 12],
            [13, 13],
            [11, 14],
            [8, 14],
            [6, 13],
            [4, 11],
            [3, 8],
            [3, 6],
            [4, 3],
            [6, 1],
            [8, 0],
            [11, 0],
            [13, 1],
            [15, 3]
        ]
    },
    "f": {
        width: 12,
        points: [
            [10, 21],
            [8, 21],
            [6, 20],
            [5, 17],
            [5, 0],
            [-1, -1],
            [2, 14],
            [9, 14]
        ]
    },
    "g": {
        width: 19,
        points: [
            [15, 14],
            [15, -2],
            [14, -5],
            [13, -6],
            [11, -7],
            [8, -7],
            [6, -6],
            [-1, -1],
            [15, 11],
            [13, 13],
            [11, 14],
            [8, 14],
            [6, 13],
            [4, 11],
            [3, 8],
            [3, 6],
            [4, 3],
            [6, 1],
            [8, 0],
            [11, 0],
            [13, 1],
            [15, 3]
        ]
    },
    "h": {
        width: 19,
        points: [
            [4, 21],
            [4, 0],
            [-1, -1],
            [4, 10],
            [7, 13],
            [9, 14],
            [12, 14],
            [14, 13],
            [15, 10],
            [15, 0]
        ]
    },
    "i": {
        width: 8,
        points: [
            [3, 21],
            [4, 20],
            [5, 21],
            [4, 22],
            [3, 21],
            [-1, -1],
            [4, 14],
            [4, 0]
        ]
    },
    "j": {
        width: 10,
        points: [
            [5, 21],
            [6, 20],
            [7, 21],
            [6, 22],
            [5, 21],
            [-1, -1],
            [6, 14],
            [6, -3],
            [5, -6],
            [3, -7],
            [1, -7]
        ]
    },
    "k": {
        width: 17,
        points: [
            [4, 21],
            [4, 0],
            [-1, -1],
            [14, 14],
            [4, 4],
            [-1, -1],
            [8, 8],
            [15, 0]
        ]
    },
    "l": {
        width: 8,
        points: [
            [4, 21],
            [4, 0]
        ]
    },
    "m": {
        width: 30,
        points: [
            [4, 14],
            [4, 0],
            [-1, -1],
            [4, 10],
            [7, 13],
            [9, 14],
            [12, 14],
            [14, 13],
            [15, 10],
            [15, 0],
            [-1, -1],
            [15, 10],
            [18, 13],
            [20, 14],
            [23, 14],
            [25, 13],
            [26, 10],
            [26, 0]
        ]
    },
    "n": {
        width: 19,
        points: [
            [4, 14],
            [4, 0],
            [-1, -1],
            [4, 10],
            [7, 13],
            [9, 14],
            [12, 14],
            [14, 13],
            [15, 10],
            [15, 0]
        ]
    },
    "o": {
        width: 19,
        points: [
            [8, 14],
            [6, 13],
            [4, 11],
            [3, 8],
            [3, 6],
            [4, 3],
            [6, 1],
            [8, 0],
            [11, 0],
            [13, 1],
            [15, 3],
            [16, 6],
            [16, 8],
            [15, 11],
            [13, 13],
            [11, 14],
            [8, 14]
        ]
    },
    "p": {
        width: 19,
        points: [
            [4, 14],
            [4, -7],
            [-1, -1],
            [4, 11],
            [6, 13],
            [8, 14],
            [11, 14],
            [13, 13],
            [15, 11],
            [16, 8],
            [16, 6],
            [15, 3],
            [13, 1],
            [11, 0],
            [8, 0],
            [6, 1],
            [4, 3]
        ]
    },
    "q": {
        width: 19,
        points: [
            [15, 14],
            [15, -7],
            [-1, -1],
            [15, 11],
            [13, 13],
            [11, 14],
            [8, 14],
            [6, 13],
            [4, 11],
            [3, 8],
            [3, 6],
            [4, 3],
            [6, 1],
            [8, 0],
            [11, 0],
            [13, 1],
            [15, 3]
        ]
    },
    "r": {
        width: 13,
        points: [
            [4, 14],
            [4, 0],
            [-1, -1],
            [4, 8],
            [5, 11],
            [7, 13],
            [9, 14],
            [12, 14]
        ]
    },
    "s": {
        width: 17,
        points: [
            [14, 11],
            [13, 13],
            [10, 14],
            [7, 14],
            [4, 13],
            [3, 11],
            [4, 9],
            [6, 8],
            [11, 7],
            [13, 6],
            [14, 4],
            [14, 3],
            [13, 1],
            [10, 0],
            [7, 0],
            [4, 1],
            [3, 3]
        ]
    },
    "t": {
        width: 12,
        points: [
            [5, 21],
            [5, 4],
            [6, 1],
            [8, 0],
            [10, 0],
            [-1, -1],
            [2, 14],
            [9, 14]
        ]
    },
    "u": {
        width: 19,
        points: [
            [4, 14],
            [4, 4],
            [5, 1],
            [7, 0],
            [10, 0],
            [12, 1],
            [15, 4],
            [-1, -1],
            [15, 14],
            [15, 0]
        ]
    },
    "v": {
        width: 16,
        points: [
            [2, 14],
            [8, 0],
            [-1, -1],
            [14, 14],
            [8, 0]
        ]
    },
    "w": {
        width: 22,
        points: [
            [3, 14],
            [7, 0],
            [-1, -1],
            [11, 14],
            [7, 0],
            [-1, -1],
            [11, 14],
            [15, 0],
            [-1, -1],
            [19, 14],
            [15, 0]
        ]
    },
    "x": {
        width: 17,
        points: [
            [3, 14],
            [14, 0],
            [-1, -1],
            [14, 14],
            [3, 0]
        ]
    },
    "y": {
        width: 16,
        points: [
            [2, 14],
            [8, 0],
            [-1, -1],
            [14, 14],
            [8, 0],
            [6, -4],
            [4, -6],
            [2, -7],
            [1, -7]
        ]
    },
    "z": {
        width: 17,
        points: [
            [14, 14],
            [3, 0],
            [-1, -1],
            [3, 14],
            [14, 14],
            [-1, -1],
            [3, 0],
            [14, 0]
        ]
    },
    "{": {
        width: 14,
        points: [
            [9, 25],
            [7, 24],
            [6, 23],
            [5, 21],
            [5, 19],
            [6, 17],
            [7, 16],
            [8, 14],
            [8, 12],
            [6, 10],
            [-1, -1],
            [7, 24],
            [6, 22],
            [6, 20],
            [7, 18],
            [8, 17],
            [9, 15],
            [9, 13],
            [8, 11],
            [4, 9],
            [8, 7],
            [9, 5],
            [9, 3],
            [8, 1],
            [7, 0],
            [6, -2],
            [6, -4],
            [7, -6],
            [-1, -1],
            [6, 8],
            [8, 6],
            [8, 4],
            [7, 2],
            [6, 1],
            [5, -1],
            [5, -3],
            [6, -5],
            [7, -6],
            [9, -7]
        ]
    },
    "|": {
        width: 8,
        points: [
            [4, 25],
            [4, -7]
        ]
    },
    "}": {
        width: 14,
        points: [
            [5, 25],
            [7, 24],
            [8, 23],
            [9, 21],
            [9, 19],
            [8, 17],
            [7, 16],
            [6, 14],
            [6, 12],
            [8, 10],
            [-1, -1],
            [7, 24],
            [8, 22],
            [8, 20],
            [7, 18],
            [6, 17],
            [5, 15],
            [5, 13],
            [6, 11],
            [10, 9],
            [6, 7],
            [5, 5],
            [5, 3],
            [6, 1],
            [7, 0],
            [8, -2],
            [8, -4],
            [7, -6],
            [-1, -1],
            [8, 8],
            [6, 6],
            [6, 4],
            [7, 2],
            [8, 1],
            [9, -1],
            [9, -3],
            [8, -5],
            [7, -6],
            [5, -7]
        ]
    },
    "~": {
        width: 24,
        points: [
            [3, 6],
            [3, 8],
            [4, 11],
            [6, 12],
            [8, 12],
            [10, 11],
            [14, 8],
            [16, 7],
            [18, 7],
            [20, 8],
            [21, 10],
            [-1, -1],
            [3, 8],
            [4, 10],
            [6, 11],
            [8, 11],
            [10, 10],
            [14, 7],
            [16, 6],
            [18, 6],
            [20, 7],
            [21, 10],
            [21, 12]
        ]
    }
};
CanvasTextFunctions.letter = function(ch) {
    return CanvasTextFunctions.letters[ch];
};
CanvasTextFunctions.ascent = function(font, size) {
    return size;
};
CanvasTextFunctions.descent = function(font, size) {
    return 7 * size / 25;
};
CanvasTextFunctions.measure = function(font, size, str) {
    var total = 0;
    var len = str.length;
    for (i = 0; i < len; i++) {
        var c = CanvasTextFunctions.letter(str.charAt(i));
        if (c) {
            total += c.width * size / 25;
        }
    }
    return total;
};
CanvasTextFunctions.draw = function(ctx, font, size, x, y, str) {
    var total = 0;
    var len = str.length;
    var mag = size / 25;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = 2 * mag;
    for (i = 0; i < len; i++) {
        var c = CanvasTextFunctions.letter(str.charAt(i));
        if (!c) {
            continue;
        }
        ctx.beginPath();
        var penUp = 1;
        var needStroke = 0;
        for (j = 0; j < c.points.length; j++) {
            var a = c.points[j];
            if (a[0] == -1 && a[1] == -1) {
                penUp = 1;
                continue;
            }
            if (penUp) {
                ctx.moveTo(x + a[0] * mag, y - a[1] * mag);
                penUp = false;
            } else {
                ctx.lineTo(x + a[0] * mag, y - a[1] * mag);
            }
        }
        ctx.stroke();
        x += c.width * mag;
    }
    ctx.restore();
    return total;
};
CanvasTextFunctions.enable = function(ctx) {
    ctx.drawText = function(font, size, x, y, text) {
        return CanvasTextFunctions.draw(ctx, font, size, x, y, text);
    };
    ctx.measureText = function(font, size, text) {
        return CanvasTextFunctions.measure(font, size, text);
    };
    ctx.fontAscent = function(font, size) {
        return CanvasTextFunctions.ascent(font, size);
    };
    ctx.fontDescent = function(font, size) {
        return CanvasTextFunctions.descent(font, size);
    };
    ctx.drawTextRight = function(font, size, x, y, text) {
        var w = CanvasTextFunctions.measure(font, size, text);
        return CanvasTextFunctions.draw(ctx, font, size, x - w, y, text);
    };
    ctx.drawTextCenter = function(font, size, x, y, text) {
        var w = CanvasTextFunctions.measure(font, size, text);
        return CanvasTextFunctions.draw(ctx, font, size, x - w / 2, y, text);
    };
};

function RGBAColor(color_string) {
    this.ok = false;
    if (typeof color_string != "string") {
        return;
    }
    if (color_string.charAt(0) == "#") {
        color_string = color_string.substr(1, 6);
    }
    color_string = color_string.replace(/ /g, "");
    color_string = color_string.toLowerCase();
    var simple_colors = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "00ffff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000000",
        blanchedalmond: "ffebcd",
        blue: "0000ff",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "00ffff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dodgerblue: "1e90ff",
        feldspar: "d19275",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "ff00ff",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgrey: "d3d3d3",
        lightgreen: "90ee90",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslateblue: "8470ff",
        lightslategray: "778899",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "00ff00",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "ff00ff",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370d8",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "d87093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        red: "ff0000",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        violetred: "d02090",
        wheat: "f5deb3",
        white: "ffffff",
        whitesmoke: "f5f5f5",
        yellow: "ffff00",
        yellowgreen: "9acd32"
    };
    for (var key in simple_colors) {
        if (color_string == key) {
            color_string = simple_colors[key];
        }
    }
    var color_defs = [{
        re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((1(\.0)?)|0(\.\d*)?)\)$/,
        example: ["rgba(123, 234, 45, 0.5)", "rgba(255,234,245,1)"],
        process: function(bits) {
            return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3]), parseFloat(bits[4])];
        }
    }, {
        re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
        example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
        process: function(bits) {
            return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3])];
        }
    }, {
        re: /^(\w{2})(\w{2})(\w{2})$/,
        example: ["#00ff00", "336699"],
        process: function(bits) {
            return [parseInt(bits[1], 16), parseInt(bits[2], 16), parseInt(bits[3], 16)];
        }
    }, {
        re: /^(\w{1})(\w{1})(\w{1})$/,
        example: ["#fb0", "f0f"],
        process: function(bits) {
            return [parseInt(bits[1] + bits[1], 16), parseInt(bits[2] + bits[2], 16), parseInt(bits[3] + bits[3], 16)];
        }
    }];
    for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(color_string);
        if (bits) {
            var channels = processor(bits);
            this.r = channels[0];
            this.g = channels[1];
            this.b = channels[2];
            if (bits.length > 3) {
                this.a = channels[3];
            } else {
                this.a = 1;
            }
            this.ok = true;
        }
    }
    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);
    this.a = (this.a < 0 || isNaN(this.a)) ? 1 : ((this.a > 1) ? 1 : this.a);
    this.toRGBA = function() {
        return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
    };
    this.toRGB = function() {
        return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
    };
    this.toHex = function() {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        if (r.length == 1) {
            r = "0" + r;
        }
        if (g.length == 1) {
            g = "0" + g;
        }
        if (b.length == 1) {
            b = "0" + b;
        }
        return "#" + r + g + b;
    };
    this.getHelpXML = function() {
        var examples = new Array();
        for (var i = 0; i < color_defs.length; i++) {
            var example = color_defs[i].example;
            for (var j = 0; j < example.length; j++) {
                examples[examples.length] = example[j];
            }
        }
        for (var sc in simple_colors) {
            examples[examples.length] = sc;
        }
        var xml = document.createElement("ul");
        xml.setAttribute("id", "rgbcolor-examples");
        for (var i = 0; i < examples.length; i++) {
            try {
                var list_item = document.createElement("li");
                var list_color = new RGBColor(examples[i]);
                var example_div = document.createElement("div");
                example_div.style.cssText = "margin: 3px; " + "border: 1px solid black; " + "background:" + list_color.toHex() + "; " + "color:" + list_color.toHex();
                example_div.appendChild(document.createTextNode("test"));
                var list_item_value = document.createTextNode(" " + examples[i] + " -> " + list_color.toRGB() + " -> " + list_color.toHex());
                list_item.appendChild(example_div);
                list_item.appendChild(list_item_value);
                xml.appendChild(list_item);
            } catch (e) {}
        }
        return xml;
    };
}
var nextgame = {};
nextgame.degreesToRadians = function(degrees) {
    return (Math.PI / 180) * degrees;
};
nextgame.radiansToDegrees = function(radians) {
    return radians * (180 / Math.PI);
};
nextgame.getContextById = function(id) {
    return nextgame.getCanvasContext($("#" + id)[0]);
};
nextgame.getCanvasContext = function(canvas) {
    if (canvas.getContext == undefined) {
        return G_vmlCanvasManager.initElement(canvas).getContext("2d");
    }
    return canvas.getContext("2d");
};
nextgame.lineWidthPixelsUsed = function(lineWidth) {
    return Math.round(lineWidth / 2) * 2;
};
nextgame.canvasSupported = function() {
    return document.createElement("canvas").getContext !== undefined;
};
nextgame.hsl = function(h, s, l, opacity) {
    this.h = h;
    this.s = s;
    this.l = l;
    this.opacity = opacity;
};
nextgame.hsl.hueForHeatmap = function(strength) {
    return this.h = Math.round((1 - strength) * 240);
};
nextgame.hsl.prototype.toStringForHeatmap = function(strength) {
    this.h = nextgame.hsl.hueForHeatmap(strength);
    return this.toString();
};
nextgame.hsl.prototype.toString = function() {
    that = this;
    if (isNaN(that.opacity)) {
        return "hsl(" + hslString() + ")";
    }
    return "hsla(" + hslString() + ", " + that.opacity + ")";

    function hslString() {
        return that.h + ", " + that.s + "%, " + that.l + "%";
    }
};
nextgame.hsl.prototype.changeHue = function(changeVal) {
    return new nextgame.hsl(this.h + changeVal, this.s, this.l, this.opacity);
};
nextgame.hsl.prototype.changeSaturation = function(changeVal) {
    return new nextgame.hsl(this.h, this.s + changeVal, this.l, this.opacity);
};
nextgame.hsl.prototype.changeLightness = function(changeVal) {
    return new nextgame.hsl(this.h, this.s, this.l + changeVal, this.opacity);
};
nextgame.hsl.prototype.changeOpacity = function(changeVal) {
    return new nextgame.hsl(this.h, this.s, this.l, this.opacity + changeVal);
};
nextgame.rgba = function(red, green, blue, alpha) {
    var localVar;
    var createdRgba;
    var r, g, b, a;
    var rgba = function() {
        this.init(red, green, blue, alpha);
    };
    rgba.prototype = {
        init: function(red, green, blue, alpha) {
            r = red || 0, g = green || 0, b = blue || 0, a = alpha || 1;
            return this;
        },
        setAlpha: function(alpha) {
            a = alpha;
            return this;
        },
        toRgbaString: function() {
            return "rgba(" + rgbColors() + ", " + a + ")";
        },
        toRgbString: function() {
            return "rgb(" + rgbColors() + ")";
        }
    };

    function rgbColors() {
        return r + ", " + g + ", " + b;
    }
    var createdRgba = new rgba();
    return createdRgba;
};
(function() {
    var WSCanvas;
    window.whoCan = function(context) {
        var ctx = context;
        WSCanvas = function() {
            this.dashLength = 1;
            this.dashSpaceLength = 1;
        };
        WSCanvas.prototype = {
            width: function() {
                return ctx.canvas.width;
            },
            dashedLine: function(fnPositionStart, length) {
                var dashLength = this.dashLength;
                var spaceLength = this.dashSpaceLength;
                ctx.save();
                if (typeof(fnPositionStart) == "function") {
                    fnPositionStart(ctx);
                }
                ctx.beginPath();
                for (i = 0; i < length; i += (dashLength + spaceLength)) {
                    if (i + dashLength < length) {
                        ctx.moveTo(i, 0);
                        ctx.lineTo(i + dashLength, 0);
                    }
                }
                ctx.moveTo(i, 0);
                ctx.closePath();
                ctx.stroke();
                ctx.restore();
            }
        };
        return new WSCanvas();
    };
})();
nextgame.canvas = {};
nextgame.canvas.drawPitchAndCreateOverlayingStatsCanvas = function($target, width, height, pitchDimensions) {
    pitchDimensions.drawPitch = pitchDimensions.drawPitch || function(p) {
        p.drawWithDefaults();
    };
    var $pitchCanvas = nextgame.canvas.createCanvas(width, height).css("position", "absolute");
    var $statsCanvas = nextgame.canvas.createCanvas(width, height).css("position", "absolute");
    $container = $("<div></div>").css({
        width: width,
        height: height
    }).addClass("pitch-stats-container").append($pitchCanvas).append($statsCanvas);
    $target.append($container);
    var pitchCtx = nextgame.getCanvasContext($pitchCanvas[0]);
    var pitch = new nextgame.pitch({
        context: pitchCtx,
        length: pitchDimensions.length,
        width: pitchDimensions.width
    });
    pitchCtx.save();
    pitchCtx.translate(pitchDimensions.translateX, pitchDimensions.translateY);
    pitchDimensions.drawPitch(pitch);
    pitchCtx.restore();
    var statsCtx = nextgame.getCanvasContext($statsCanvas[0]);
    return {
        pitch: pitch,
        statsContext: statsCtx
    };
};
nextgame.canvas.drawFullPitchAndCreateOverlayingStatsCanvas = function(target, pitchWidth, pitchHeight) {
    var pitchLineWidth = nextgame.pitch.getDefaults().lineWidth;
    var goalHeight = 0;
    var containerId = $(target).attr("id");
    var roundedLineWidth = nextgame.lineWidthPixelsUsed(pitchLineWidth);
    var margin = Math.round((pitchLineWidth - 1) / 2);
    var pitchCanvasWidth = pitchWidth + (goalHeight * 2) + roundedLineWidth;
    var pitchCanvasHeight = pitchHeight + roundedLineWidth;
    var pitchCanvas = nextgame.canvas.createCanvas(pitchCanvasWidth, pitchCanvasHeight).css("position", "absolute").attr("id", containerId + "PitchCanvas");
    var container = $("<div></div>").css("width", pitchCanvasWidth + pitchLineWidth / 2 - 1).css("height", pitchCanvasHeight + pitchLineWidth / 2 - 1).addClass("pitch-stats-container");
    var statsCanvas = nextgame.canvas.createCanvas(pitchWidth - roundedLineWidth, pitchHeight - roundedLineWidth);
    statsCanvas.css("margin-top", roundedLineWidth).css("margin-left", goalHeight + roundedLineWidth).attr("id", containerId + "StatsCanvas").css("position", "absolute");
    container.append(pitchCanvas);
    container.append(statsCanvas);
    target.append(container);
    var pitchCtx = nextgame.getCanvasContext(pitchCanvas[0]);
    var pitch = new nextgame.pitch({
        context: pitchCtx,
        length: pitchWidth,
        width: pitchHeight,
        goalHeight: goalHeight,
        name: "NormalPitch"
    });
    var translateMargin = roundedLineWidth / 2 - 1;
    pitchCtx.save();
    pitchCtx.translate(translateMargin, translateMargin);
    pitch.drawWithDefaults();
    pitchCtx.restore();
    var statsCtx = nextgame.getCanvasContext(statsCanvas[0]);
    return {
        pitch: pitch,
        statsContext: statsCtx
    };
};
nextgame.canvas.createCanvas = function(width, height) {
    return $("<canvas></canvas>").attr("width", width).attr("height", height);
};
nextgame.canvas.transformationMatrix = function(xScale, xShear, yShear, yScale, xTranslation, yTranslation) {
    this.xScale = xScale;
    this.xShear = xShear;
    this.yShear = yShear;
    this.yScale = yScale;
    this.xTranslation = xTranslation;
    this.yTranslation = yTranslation;
    this.reset = function() {
        this.xScale = xScale;
        this.xShear = xShear;
        this.yShear = yShear;
        this.yScale = yScale;
        this.xTranslation = xTranslation;
        this.yTranslation = yTranslation;
    };
};
nextgame.canvas.transformationMatrix.prototype.setTransform = function(ctx) {
    ctx.setTransform(this.xScale, this.xShear, this.yShear, this.yScale, this.xTranslation, this.yTranslation);
};
nextgame.canvas.transformationMatrix.prototype.transform = function(ctx) {
    ctx.transform(this.xScale, this.xShear, this.yShear, this.yScale, this.xTranslation, this.yTranslation);
};
nextgame.canvas.transformationMatrix.prototype.rotate = function(radians) {
    return new nextgame.canvas.transformationMatrix(this.xScale * Math.cos(radians), this.xShear + this.xScale * -Math.sin(radians), this.yShear + this.yScale * Math.sin(radians), this.yScale * Math.cos(radians), this.xTranslation, this.yTranslation);
};
nextgame.canvas.transformationMatrix.prototype.pointToTransformedPoint = function(xOriginal, yOriginal, width, height) {
    return {
        x: (yOriginal * this.yShear) + this.xTranslation + ((xOriginal) / width) * (this.xScale * width),
        y: (xOriginal * this.xShear) + this.yTranslation + ((yOriginal) / height) * (this.yScale * height)
    };
};
if (nextgame == undefined) {
    nextgame = {};
}
nextgame.pitch = base2.Base.extend({
    constructor: function(config) {
        var ctx = config.context;
        this.getContext = function() {
            return ctx;
        };
        this.length = config.length;
        this.width = config.width;
        this.drawCenterCircle = config.drawCenterCircle != undefined ? config.drawCenterCircle : true;
        this.drawPenaltyArcs = config.drawPenaltyArcs != undefined ? config.drawPenaltyArcs : true;
        this.drawCornerCircles = config.drawCornerCircles != undefined ? config.drawCornerCircles : true;
        this.initialGoalHeight = config.goalHeight;
        var lengthRatio = this.length / 115;
        var widthRatio = this.width / 74;
        var sixYards = 6 * lengthRatio;
        var lineWidth = ctx.lineWidth;
        if (this.initialGoalHeight == undefined) {
            this.goalHeight = 0;
        } else {
            this.goalHeight = this.initialGoalHeight;
        }
        this.getLengthRatio = function() {
            return lengthRatio;
        };
        this.getWidthRatio = function() {
            return widthRatio;
        };
        this.getSixYards = function() {
            return sixYards;
        };
        this.getLineWidth = function() {
            return lineWidth;
        };
        this.totalLength = function() {
            return this.length + this.goalHeight * 2;
        };
        this.totalWidth = function() {
            return this.width + lineWidth;
        };
        this.yards = function(numberOfYards) {
            return lengthRatio * numberOfYards;
        };
        this.yardsW = function(numberOfYards) {
            return widthRatio * numberOfYards;
        };
        this.eighteenYardBoxWidth = function() {
            return 44 * lengthRatio;
        };
    },
    drawWithDefaults: function() {
        var ctx = this.getContext();
        var defaults = nextgame.pitch.getDefaults();
        ctx.translate(this.goalHeight + 1, 1);
        ctx.lineWidth = defaults.lineWidth;
        ctx.strokeStyle = defaults.strokeStyle;
        ctx.fillStyle = defaults.fillStyle;
        this.drawStripes();
        this.draw();
    },
    draw: function() {
        that = this;
        var ctx = this.getContext();
        var lineWidth = ctx.lineWidth;
        that.getLineWidth = function() {
            return lineWidth;
        };
        var lengthRatio = this.getLengthRatio();
        var widthRatio = this.getWidthRatio();
        var goalWidth = 8 * lengthRatio;
        var middle = this.width / 2;
        var halfWay = this.length / 2;
        var topPost = middle - goalWidth / 2;
        var bottomPost = middle + goalWidth / 2;
        var sixYards = this.getSixYards();
        var eighteenYardEllipseEdge = 22 * lengthRatio;
        var penaltySpot = sixYards * 2;
        var circleRadius = 10 * lengthRatio;
        var goalHeight = that.goalHeight;
        var eighteenYards = sixYards * 3;
        var spotWidth = 0.5 * lengthRatio;
        drawOutline();
        drawHalfWayLineAndCircle();
        drawArea();
        ctx.save();
        ctx.translate(that.length, that.width);
        ctx.rotate(nextgame.degreesToRadians(180));
        drawArea();
        ctx.restore();
        ctx.stroke();
        drawCenterSpotAndPenaltySpots();
        drawWSLogo();
        ctx.beginPath();
        ctx.closePath();

        function drawWSLogo() {
            var wsLogo = new Image();
            wsLogo.src = "/img/wsblack.png";
            wsLogo.onload = function() {
                var logoRealWidth = this.width;
                var logoRealHeight = this.height;
                var logoAdjustedWidth = Math.min(120, that.length / 4);
                var logoAdjustedHeight = logoRealHeight * (logoAdjustedWidth / logoRealWidth);
                var logoY = that.width - (logoAdjustedHeight) - 4;
                var logoX = that.length - (logoAdjustedWidth) - 4;
                ctx.drawImage(wsLogo, logoX, logoY, logoAdjustedWidth, logoAdjustedHeight);
            };
        }

        function drawOutline() {
            ctx.strokeRect(0, 0, that.length, that.width);
        }

        function drawHalfWayLineAndCircle() {
            ctx.moveTo(halfWay, 0);
            ctx.lineTo(halfWay, that.width);
            ctx.moveTo(halfWay + circleRadius, middle);
            if (that.drawCenterCircle) {
                ctx.arc(halfWay, middle, circleRadius, 0, nextgame.degreesToRadians(360), false);
            }
        }

        function drawArea() {
            drawEighteenYardBoxEllipse();
            drawGoal();
            drawSixYardBox();
            drawEighteenYardBox();
        }

        function drawGoal() {
            if (goalHeight > 0) {
                ctx.moveTo(0, topPost);
                ctx.lineTo(-goalHeight, topPost);
                ctx.lineTo(-goalHeight, bottomPost);
                ctx.lineTo(0, bottomPost);
            }
        }

        function drawSixYardBox() {
            drawAreaBox(sixYards);
        }

        function drawEighteenYardBox() {
            drawAreaBox(eighteenYards);
        }

        function drawAreaBox(size) {
            var top = topPost - size;
            ctx.moveTo(0, top);
            ctx.lineTo(size, top);
            ctx.lineTo(size, that.width - top);
            ctx.lineTo(0, that.width - top);
        }

        function drawEighteenYardBoxEllipse() {
            if (!that.drawPenaltyArcs) {
                return;
            }
            ctx.moveTo(eighteenYardEllipseEdge, middle);
            ctx.arc(penaltySpot, middle, circleRadius, nextgame.degreesToRadians(0), nextgame.degreesToRadians(52.5), false);
            ctx.moveTo(eighteenYardEllipseEdge, middle);
            ctx.arc(penaltySpot, middle, circleRadius, nextgame.degreesToRadians(0), nextgame.degreesToRadians(306.5), true);
        }

        function drawCenterSpotAndPenaltySpots() {
            var cornerSize = sixYards / 4;
            ctx.beginPath();
            ctx.moveTo(penaltySpot, middle);
            ctx.arc(penaltySpot, middle, spotWidth, 0, nextgame.degreesToRadians(360), false);
            ctx.moveTo(penaltySpot, middle);
            ctx.arc(that.length - penaltySpot, middle, spotWidth, 0, nextgame.degreesToRadians(360), false);
            ctx.moveTo(penaltySpot, middle);
            ctx.arc(halfWay, middle, spotWidth, 0, nextgame.degreesToRadians(360), false);
            ctx.fill();
            ctx.closePath();
            if (that.drawCornerCircles) {
                ctx.beginPath();
                ctx.moveTo(cornerSize, 0);
                ctx.arc(0, 0, cornerSize, 0, nextgame.degreesToRadians(90), false);
                ctx.moveTo(that.length, cornerSize);
                ctx.arc(that.length, 0, cornerSize, nextgame.degreesToRadians(90), nextgame.degreesToRadians(180), false);
                ctx.moveTo(0, that.width - cornerSize);
                ctx.arc(0, that.width, cornerSize, nextgame.degreesToRadians(270), nextgame.degreesToRadians(360), false);
                ctx.moveTo(that.length - cornerSize, that.width);
                ctx.arc(that.length, that.width, cornerSize, nextgame.degreesToRadians(180), nextgame.degreesToRadians(270), false);
                ctx.closePath();
                ctx.stroke();
            }
        }
    },
    drawStripes: function() {
        var ctx = this.getContext();
        var numberOfStrips = 20;
        var stripWidth = this.length / numberOfStrips;
        ctx.save();
        for (var i = 0; i < numberOfStrips; i++) {
            if (i % 2 > 0) {
                ctx.fillStyle = "rgb(51, 51, 51)";
            } else {
                ctx.fillStyle = "rgb(51, 51, 51)";
            }
            ctx.fillRect(i * stripWidth, 0, stripWidth + 1, this.width);
        }
        ctx.restore();
    }
});
nextgame.pitch.getDefaults = function() {
    var strokeAndFillStyle = "rgb(91, 91, 91)";
    return {
        lineWidth: 1,
        strokeStyle: strokeAndFillStyle,
        fillStyle: strokeAndFillStyle
    };
};
nextgame.pitch.dimension = {
    length: "length",
    width: "width"
};
nextgame.statistics = {};
nextgame.statistics.base = base2.Base.extend({
    constructor: function(config) {
        this.init(config);
    },
    init: function(config) {
        var ctx = config.context;
        var ctxWidth = parseFloat(ctx.canvas.width);
        var ctxHeight = parseFloat(ctx.canvas.height);
        var extraOptions = config.extraOptions;
        this.getContext = function() {
            return ctx;
        };
        this.getExtraOptions = function() {
            return extraOptions;
        };
        this.getCanvasHeight = function(percentage) {
            if (isNaN(percentage)) {
                return ctxHeight;
            }
            return ctxHeight * percentage / 100;
        };
        this.getCanvasWidth = function(percentage) {
            if (isNaN(percentage)) {
                return ctxWidth;
            }
            return ctxWidth * percentage / 100;
        };
        this.pitch = config.pitch;
        this.type = config.type || "percentage";
        this.showValues = "value" == this.type;
        this.shapes = new nextgame.shapes({
            context: ctx
        });
        this.homeFillStyle = nextgame.rgba(0, 139, 224, 1);
        this.homeStrokeStyle = nextgame.rgba(0, 139, 224, 1);
        this.fillStyleConceded = nextgame.rgba(170, 170, 170, 1);
        this.awayFillStyle = nextgame.rgba(235, 91, 21);
        this.awayStrokeStyle = nextgame.rgba(235, 91, 21);
    },
    drawText: function(percentage, point, fontSize) {
        if (point == undefined) {
            point = {
                x: 0,
                y: 0
            };
        }
        if (fontSize == undefined) {
            fontSize = "25px";
        }
        if (!isNaN(fontSize)) {
            fontSize += "px";
        }
        var ctx = this.getContext();
        ctx.font = "bold " + fontSize + " 'arial'";
        ctx.lineWidth = 1;
        ctx.save();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillText(percentage.toString() + (this.showValues ? "" : "%"), point.x, point.y);
        ctx.restore();
    },
    relativePointToAbsolute: function(x, y) {
        var width = this.getCanvasWidth(x);
        var height = this.getCanvasHeight(100 - y);
        return {
            x: width,
            y: height
        };
    },
    fontSizeRelativeToCanvasHeight: function(scale) {
        if (!scale) {
            scale = 8;
        }
        return (Math.round(this.getCanvasHeight() / scale));
    },
    setForOrAgainstFillAndStrokeStyle: function(against, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }
        if (against) {
            this.getContext().fillStyle = this.awayFillStyle.setAlpha(alpha).toRgbaString();
            this.getContext().strokeStyle = this.awayStrokeStyle.setAlpha(alpha).toRgbaString();
            return;
        }
        var forAlpha = (alpha + 0.1);
        this.getContext().fillStyle = this.homeFillStyle.setAlpha(forAlpha).toRgbaString();
        this.getContext().strokeStyle = this.homeStrokeStyle.setAlpha(forAlpha).toRgbaString();
    },
    clearCanvas: function() {
        this.getContext().clearRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
    }
});
nextgame.statistics.playerPositionAverage = nextgame.statistics.base.extend({
    draw: function(data) {
        this.clearCanvas();
        var players = prepareData(data.value),
            awayTeam = data.field === "away",
            ctx = this.getContext(),
            radius = this.pitch.getLengthRatio() * 3.5,
            actualRadius, totalPlayers = players.length,
            i, player, position, playerElements = [];
        this.setForOrAgainstFillAndStrokeStyle(awayTeam);
        ctx.clearRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
        ctx.save();
        ctx.lineWidth = 1;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = "12px 'arial'";
        actualRadius = ctx.lineWidth + radius;
        for (i = 0; i < totalPlayers; i++) {
            player = players[i];
            position = this.relativePointToAbsolute((awayTeam ? 100 - player.X : player.X), (awayTeam ? 100 - player.Y : player.Y));
            ctx.beginPath();
            ctx.moveTo(position.x + radius, position.y);
            ctx.arc(position.x, position.y, radius, 0, Math.PI * 2, false);
            ctx.closePath();
            playerElements.push({
                details: player,
                start: {
                    x: position.x - actualRadius,
                    y: position.y - actualRadius
                },
                end: {
                    x: position.x + actualRadius,
                    y: position.y + actualRadius
                }
            });
            ctx.fill();
            ctx.stroke();
            ctx.save();
            ctx.fillStyle = "#333";
            ctx.fillText(player.ShirtNo, position.x, position.y);
            ctx.restore();
        }
        ctx.restore();

        function prepareData(data) {
            var records = [];
            for (var i = 0; i < data.length; i++) {
                var player = {};
                player.Id = data[i][0];
                player.X = data[i][1];
                player.Y = data[i][2];
                player.Name = data[i][3][0];
                player.ShirtNo = data[i][3][1];
                player.Position = data[i][3][2];
                player.Rating = data[i][3][3];
                records.unshift(player);
            }
            return records;
        }
        var $canvas = $(ctx.canvas);
        var $template = $("#averagePlayerPositionDetails");
        var $details = null;
        $canvas.mousemove(function(event) {
            var x = event.pageX - $(this).offset().left;
            var y = event.pageY - $(this).offset().top;
            var $this = $(this);
            for (i = 0; i < totalPlayers; i++) {
                var el = playerElements[i];
                if ((el.start.x <= x && x <= el.end.x) && (el.start.y <= y && y <= el.end.y)) {
                    if ($details === null) {
                        $details = $template.clone();
                        $details.attr("id", "");
                        $details.css({
                            position: "absolute",
                            top: el.end.y,
                            left: el.end.x
                        });
                        PopulatePlayerDetails($details, el.details);
                        $details.show();
                        $this.after($details);
                        return;
                    } else {
                        if ($details.data("ShirtNo") !== el.details.ShirtNo) {
                            PopulatePlayerDetails($details, el.details);
                            return;
                        }
                        return;
                    }
                }
            }
            if ($details !== null) {
                $details.remove();
                $details = null;
            }
        });

        function PopulatePlayerDetails($el, details) {
            $el.data("ShirtNo", details.ShirtNo);
            $el.find("#playerName").text(details.Name);
            $el.find("#shirtNumber").text(details.ShirtNo);
            $el.find("#position").text(details.Position);
            $el.find("#rating").text(details.Rating);
        }
    }
});
nextgame.statistics.eventColors = {
    "1": "#67962E",
    "13": "#2980b9",
    "14": "#2980b9",
    "15": "#2980b9",
    "16": "#2980b9",
    "3": "#d35400",
    "8": "#f1c40f"
};
nextgame.statistics.heatmaps = nextgame.statistics.base.extend({
    draw: function(data) {
        this.clearCanvas();
        if (data && data.heatmap && data.heatmapData) {
            console.log(data);
            data.heatmap.store.setDataSet(data.heatmapData);
        }
    }
});
nextgame.statistics.events = nextgame.statistics.base.extend({
    eventColors: {
        "1": "#67962E",
        "13": "#2980b9",
        "14": "#2980b9",
        "15": "#2980b9",
        "16": "#2980b9",
        "3": "#d35400",
        "8": "#f1c40f"
    },
    defaultEventColor: "#000",
    setEventStrokeStyle: function(ctx, event, isHomeEvent) {
        var eventColor = this.getEventColor(event);
        ctx.strokeStyle = isHomeEvent ? "#226889" : "#932E24";
        ctx.fillStyle = event.isSelected ? (isHomeEvent ? "#3399CC" : "#C0392B") : "#333";
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = event.isSelected ? "source-over" : "destination-over";
    },
    getEventColor: function(event) {
        if (!event.type) {
            return this.defaultEventColor;
        }
        var eventColor = nextgame.statistics.eventColors[event.type.value];
        return eventColor ? eventColor : this.defaultEventColor;
    },
    getDestinationCoordinatesForEvent: function(event, forceDraw) {
        if (-1 != [13, 14, 15, 16].indexOf(event.type.value) || forceDraw) {
            var destinationX, destinationY;
            if (event.blockedX && event.blockedY) {
                destinationX = 100 - event.blockedX;
                destinationY = 100 - event.blockedY;
            }
            if (event.endX && event.endY) {
                destinationX = event.endX;
                destinationY = event.endY;
            }
            if (event.goalMouthY) {
                destinationX = 0;
                destinationY = event.goalMouthY;
            }
            if (undefined != destinationY && undefined != destinationX) {
                if (event.isOwnGoal) {
                    destinationX = 100 - destinationX;
                }
                var position = this.relativePointToAbsolute((1 == event.field ? 100 - destinationX : destinationX), (1 == event.field ? 100 - destinationY : destinationY));
                return position;
            }
        }
    },
    drawEventDestinationLine: function(ctx, el) {
        var event = el.details ? el.details : el;
        var forceDraw = el.details;
        if (!event.isSelected) {
            return;
        }
        if (forceDraw) {
            ctx.beginPath();
            ctx.moveTo(el.start.x + this.selectedRadius, el.start.y + this.selectedRadius);
            ctx.lineWidth = 2;
            this.setEventStrokeStyle(ctx, event, 1 == event.field);
        }
        var destinationCoordinates = this.getDestinationCoordinatesForEvent(event, forceDraw);
        if (destinationCoordinates) {
            ctx.lineTo(destinationCoordinates.x, destinationCoordinates.y);
            ctx.arc(destinationCoordinates.x, destinationCoordinates.y, this.selectedRadius / 2, 0, Math.PI * 2, false);
        }
        if (forceDraw) {
            ctx.fill();
            ctx.stroke();
            ctx.save();
            ctx.restore();
            ctx.closePath();
        }
    },
    draw: function(data) {
        this.clearCanvas();
        var events = data.value;
        if (!events) {
            return;
        }
        var ctx = this.getContext(),
            shapes = new nextgame.shapes({
                context: ctx
            }),
            defaultRadius = this.pitch.getLengthRatio() * 1,
            selectedRadius = this.pitch.getLengthRatio() * 1,
            actualRadius, totalEvents = events.length,
            extraOptions = this.getExtraOptions(),
            i, position, eventElements = [],
            that = this,
            canvasWidth = this.getCanvasWidth(),
            canvasHeight = this.getCanvasHeight();
        this.selectedRadius = selectedRadius;
        if (!this.detailsAreaIsSet) {
            if (extraOptions) {
                this.$homeDetails = extraOptions.$homeDetails;
                this.$awayDetails = extraOptions.$awayDetails;
                this.onEventSelect = extraOptions.onEventSelect;
            }
            this.detailsAreaIsSet = true;
        }
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.save();
        ctx.lineWidth = 2;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = "12px 'arial'";
        ctx.strokeStyle = "#222";
        var showedDefaultDetails = {
            home: false,
            away: false
        };
        for (i = 0; i < totalEvents; i++) {
            var event = events[i];
            if (!event.isSelected) {
                continue;
            }
            var radius = event.isSelected ? selectedRadius : defaultRadius;
            actualRadius = ctx.lineWidth + radius;
            var awayTeam = (event.field == nextgame.statistics.fieldType.away);
            this.setEventStrokeStyle(ctx, event, !awayTeam);
            position = this.relativePointToAbsolute((awayTeam ? 100 - event.x : event.x), (awayTeam ? 100 - event.y : event.y));
            ctx.beginPath();
            ctx.moveTo(position.x + radius, position.y);
            ctx.arc(position.x, position.y, radius, 0, Math.PI * 2, false);
            this.drawEventDestinationLine(ctx, event);
            ctx.closePath();
            eventElements.push({
                details: event,
                start: {
                    x: position.x - actualRadius,
                    y: position.y - actualRadius
                },
                end: {
                    x: position.x + actualRadius,
                    y: position.y + actualRadius
                }
            });
            ctx.fill();
            ctx.stroke();
            ctx.save();
            ctx.restore();
            if (event.isSelected && !showedDefaultDetails) {
                populateEventDetails(!awayTeam ? that.$homeDetails : that.$awayDetails, event);
                showedDefaultDetails = true;
            }
        }
        ctx.restore();
        var $canvas = $(ctx.canvas);
        this.$canvas = $canvas;
        $canvas.unbind("click").bind("click", function(event) {
            var x = event.pageX - $(this).offset().left;
            var y = event.pageY - $(this).offset().top;
            var $this = $(this);
            for (i = 0; i < totalEvents; i++) {
                var el = eventElements[i];
                if (!el) {
                    continue;
                }
                if ((el.start.x <= x && x <= el.end.x) && (el.start.y <= y && y <= el.end.y)) {
                    if (that.onEventSelect) {
                        that.onEventSelect(el.details);
                        if (1 == el.details.type.value) {
                            that.drawEventDestinationLine(ctx, el);
                        }
                    }
                    return;
                } else {
                    if (that.onEventSelect) {
                        that.onEventSelect();
                    }
                }
            }
        });

        function populateEventDetails($el, details) {
            for (var attr in details) {
                if ("qualifiers" == attr) {
                    var r = [];
                    for (var i = 0; i < details.qualifiers.length; i++) {
                        if (details.qualifiers[i].qualifier.type) {
                            r.push('<li class="qualifier">' + details.qualifiers[i].qualifier.type.value + " = " + details.qualifiers[i].value + "</li>");
                        }
                    }
                    $el.find(".qualifiers ul").html(r.join(""));
                } else {
                    $el.find("." + attr + " span").text(details[attr]);
                }
            }
            $el.find(".player-picture img").attr("src", "http://164.177.157.12/img/players/" + details.playerId + ".jpg");
        }
    }
});
nextgame.statistics.fieldType = {
    home: 1,
    away: 2
};
nextgame.statistics.matchEventType = {
    Pass: 1,
    TakeOn: 3,
    Freekick: 4,
    CornerAwarded: 6,
    Tackle: 7,
    Interception: 8,
    Save: 10,
    Clearance: 12,
    AttemptSaved: 15,
    Goal: 16,
    Aerial: 44,
    Challenge: 45,
    BallRecovery: 49,
    Dispossesed: 50,
    Error: 51,
    BadBallTouch: 61
};
nextgame.statistics.matchGoalsTimeLineBar = function(goalPathItems) {
    var records = goalPathItems,
        _pausedIcon = "ui-icon-pause",
        _inplayIcon = "ui-icon-play",
        _pausedState = 0,
        _inplayState = 1,
        _currentState = _inplayState;
    renderBar();
    renderControl();
    bindActions();

    function renderBar() {
        var pathItemIndexHtmlTemplate = '<span class="match-events-goals-path-index" data-index="{0}" style="width: {2}%;">{1}</span>';
        var pathItemsHtml = "";
        var pathItemWidth = 100 / records.length;
        for (var j = 0; j < records.length; j++) {
            pathItemsHtml += pathItemIndexHtmlTemplate.format(j + 1, j + 1, pathItemWidth);
        }
        $("#match-events-goals-path").html(pathItemsHtml);
    }

    function renderControl() {
        var currentIcon = _currentState == _inplayState ? _pausedIcon : _inplayIcon;
        var pathControlHtml = '<span class="ui-icon {0}"></span>'.format(currentIcon);
        $("#match-events-goals-path-control").html(pathControlHtml);
    }

    function bindActions() {
        $(".match-events-goals-path-index").bind("click", function() {
            var pathItemIndex = $(this).attr("data-index");
            $(document).triggerHandler("match-events-goals-path-item-selected", [pathItemIndex]);
        });
        $("#match-events-goals-path-control").bind("click", function() {
            if (_currentState == _pausedState) {
                _currentState = _inplayState;
            } else {
                _currentState = _pausedState;
            }
            renderControl();
            $(document).triggerHandler("match-events-goals-path-control-updated", [_currentState]);
        });
    }
};
nextgame.statistics.matchGoalsTimeLineView = function(goals) {
    var t = [];
    if (goals) {
        for (var i = 0; i < goals.length; i++) {
            var goal = goals[i];
            t.push('<div class="match-events-goals-timeline-goal" data-goal-index="{0}">'.format(i));
            t.push("{0} {1}' {2}".format(WS.TeamEmblemUrl(goal.TeamId), goal.Minute, goal.PlayerName));
            t.push("</div>");
        }
    }
    return t.join("");
};
nextgame.statistics.matchGoals = nextgame.statistics.base.extend({
    draw: function(data) {
        var goals = prepareData(data.value),
            self = this,
            _pausedState = 0,
            _inplayState = 1,
            _currentIntervalIds = [],
            _currentGoalIndex = 0,
            _currentGoalPathIndex = 0;
        if (0 == goals.length) {
            return;
        }
        var goalsTimeLineHtml = nextgame.statistics.matchGoalsTimeLineView(goals);
        $("#match-events-goals-timeline").html(goalsTimeLineHtml);
        $("#match-events-goals-timeline .match-events-goals-timeline-goal:first-child").addClass("selected");
        $(".match-events-goals-timeline-goal").bind("click", function() {
            var goalIndex = $(this).attr("data-goal-index");
            $(".match-events-goals-timeline-goal").removeClass("selected");
            $(this).addClass("selected");
            drawGoal(goals[goalIndex]);
            _currentGoalIndex = goalIndex;
        });
        $(document).bind("match-events-goals-path-control-updated", function(e, currentState) {
            if (_pausedState == currentState) {
                stopCurrentDrawing();
            } else {
                drawGoal(goals[_currentGoalIndex]);
            }
        });
        $(document).bind("match-events-goals-path-item-selected", function(e, pathIndex) {
            drawGoal(goals[_currentGoalIndex], pathIndex);
        });
        drawGoal(goals[_currentGoalIndex]);

        function qualifierExists(qualifiers, qualifierId) {
            if (!qualifiers) {
                return false;
            }
            for (var q = 0; q < qualifiers.length; q++) {
                if (qualifiers[q].Id == qualifierId) {
                    return true;
                }
            }
            return false;
        }

        function stopCurrentDrawing() {
            for (var t = 0; t < _currentIntervalIds.length; t++) {
                clearInterval(_currentIntervalIds[t]);
            }
            _currentIntervalIds = [];
        }

        function drawGoal(goal, startGoalPathIndex) {
            var ctx = self.getContext(),
                isOwnGoal = false,
                radius = self.pitch.getLengthRatio(),
                actualRadius, i, position, goalPathElements = [];
            stopCurrentDrawing();
            var $canvas = $(ctx.canvas);
            var $template = $("#goal-path-item-details");
            var $details = null;
            var lastPathItem = goal.GoalPathItems[goal.GoalPathItems.length - 1];
            isOwnGoal = qualifierExists(lastPathItem.Qualifiers, 28);
            var shapes = new nextgame.shapes({
                context: ctx
            });
            ctx.clearRect(0, 0, self.getCanvasWidth(), self.getCanvasHeight());
            ctx.save();
            ctx.lineWidth = 2;
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.font = "12px 'arial'";
            nextgame.statistics.matchGoalsTimeLineBar(goal.GoalPathItems);
            startGoalPathIndex = startGoalPathIndex ? startGoalPathIndex : 0;
            for (var p = 0; p < goal.GoalPathItems.length; p++) {
                actualRadius = (p == startGoalPathIndex) ? 2 * ctx.lineWidth + radius : ctx.lineWidth + radius;
                drawGoalPathItem(goal.GoalPathItems, p);
            }
            ctx.restore();

            function drawGoalPathItem(goalPathItems, index) {
                if (goalPathItems.length <= index) {
                    return;
                }
                var goalPathItem = goalPathItems[index];
                var strokeAgainstTeamStyle = !isOwnGoal && goal.TeamId != goalPathItem.TeamId || isOwnGoal && goal.TeamId == goalPathItem.TeamId;
                self.setForOrAgainstFillAndStrokeStyle(goalPathItem.Field);
                position = self.relativePointToAbsolute((1 == goalPathItem.Field ? 100 - goalPathItem.X : goalPathItem.X), (1 == goalPathItem.Field ? 100 - goalPathItem.Y : goalPathItem.Y));
                ctx.beginPath();
                ctx.moveTo(position.x + radius, position.y);
                ctx.arc(position.x, position.y, radius, 0, Math.PI * 2, false);
                ctx.closePath();
                goalPathElements.push({
                    details: goalPathItem,
                    start: {
                        x: position.x - actualRadius,
                        y: position.y - actualRadius
                    },
                    end: {
                        x: position.x + actualRadius,
                        y: position.y + actualRadius
                    }
                });
                ctx.fill();
                ctx.stroke();
                ctx.save();
                ctx.fillStyle = "#333";
                ctx.fillText(i + 1, position.x, position.y);
                if (nextgame.statistics.matchEventType.Goal != goalPathItem.Type) {
                    var nextPathItem = goal.GoalPathItems[index + 1];
                    var nextPathItemPosition = self.relativePointToAbsolute((1 == nextPathItem.Field ? 100 - nextPathItem.X : nextPathItem.X), (1 == nextPathItem.Field ? 100 - nextPathItem.Y : nextPathItem.Y));
                    shapes.drawArrowLine(position.x, position.y, nextPathItemPosition.x, nextPathItemPosition.y);
                } else {
                    var goalX = (1 == goal.Field && !isOwnGoal) || (0 == goal.Field && isOwnGoal) ? 0 : self.getCanvasWidth();
                    shapes.drawArrowLine(position.x, position.y, goalX, self.getCanvasHeight() / 2);
                }
                ctx.restore();
                PopulateGoalPathDetails($template, goalPathItem);
            }
            $canvas.mousemove(function(event) {
                var x = event.pageX - $(this).offset().left;
                var y = event.pageY - $(this).offset().top;
                var $this = $(this);
                for (i = 0; i < goalPathElements.length; i++) {
                    var el = goalPathElements[i];
                    if ((el.start.x <= x && x <= el.end.x) && (el.start.y <= y && y <= el.end.y)) {
                        if ($template === null) {
                            PopulateGoalPathDetails($template, el.details);
                            return;
                        } else {
                            if ($template.data("PlayerId") !== el.details.PlayerId) {
                                PopulateGoalPathDetails($template, el.details);
                                return;
                            }
                            return;
                        }
                    }
                }
            });
        }

        function PopulateGoalPathDetails($el, details) {
            $el.find("#playerId").text(details.PlayerId);
            $el.find("#playerName").text(details.PlayerName);
            $el.find("#teamId").text(details.TeamId);
            $el.find("#type").text("{0}({1})".format(NG.getDisplayNameByValue(nextgame.statistics.matchEventType, details.Type), details.Type));
            $el.find("#minute").text(details.Minute);
            $el.find("#eventOrder").text(details.EventOrder);
            $el.find("#player-avatar").html(WS.PlayerPictureUrl(details.PlayerId, details.PlayerName, "height: 80px; width: 60px; margin: 0 auto;"));
        }

        function prepareData(data) {
            var result = [];
            if (data) {
                for (var j = 0; j < data.length; j++) {
                    var goalData = data[j];
                    var goal = {
                        TeamId: goalData[0],
                        PlayerId: goalData[1],
                        PlayerName: goalData[2],
                        Field: goalData[3],
                        Minute: goalData[4],
                        GoalPathItems: []
                    };
                    var goalPathData = goalData[5];
                    for (var k = 0; k < goalPathData.length; k++) {
                        var goalPathItemData = goalPathData[k];
                        var goalPathItem = {
                            TeamId: goalPathItemData[0],
                            Field: goalPathItemData[1],
                            PlayerId: goalPathItemData[2],
                            PlayerName: goalPathItemData[3],
                            Type: goalPathItemData[4],
                            X: goalPathItemData[5],
                            Y: goalPathItemData[6],
                            Minute: goalPathItemData[7],
                            EventOrder: k,
                            Qualifiers: []
                        };
                        var goalPathItemQualifiersData = goalPathItemData[8];
                        if (goalPathItemQualifiersData) {
                            for (var q = 0; q < goalPathItemQualifiersData.length; q++) {
                                var goalPathItemQualifierData = goalPathItemQualifiersData[q];
                                goalPathItem.Qualifiers.push({
                                    Id: goalPathItemQualifierData[0],
                                    Value: 1 < goalPathItemQualifierData.length ? goalPathItemQualifierData[1] : null
                                });
                            }
                        }
                        goal.GoalPathItems.push(goalPathItem);
                    }
                    result.push(goal);
                }
            }
            return result;
        }
    }
});
nextgame.statistics.heatmap = nextgame.statistics.base.extend({
    draw: function(data) {
        var ctx = this.getContext();
        ctx.save();
        ctx.clearRect(ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "hsla(220, 100%, 50%, 0)";
        var heatmap = new HeatMap($(ctx.canvas).attr("id"), 6);
        for (var i = 0; i < data.touches.length; i++) {
            var touch = data.touches[i];
            var x = (touch[0] * data.scale);
            var y = (touch[1] * data.scale);
            var point = this.relativePointToAbsolute(x, y);
            heatmap.push(point.x, point.y, touch[2] * data.scale / 2 + 1);
        }
        heatmap.spread(1);
        heatmap.render(function(value) {
            var hue = (1 - value) * 220;
            return "hsla(" + hue + ", 100%, 60%, 0.7)";
        });
        ctx.restore();
    }
});
nextgame.statistics.touchZones = nextgame.statistics.base.extend({
    model: function(stats) {
        return TouchZonesGridModel(stats);
    },
    draw: function(data) {
        data = this.prepareData(data);
        var that = this;
        var ctx = this.getContext();
        var canvasHeight = this.getCanvasHeight();
        var canvasWidth = this.getCanvasWidth();
        var margin = this.pitch.yards(5);
        var stripWidth = canvasWidth / 3 - margin * 2;
        var fontSize = this.fontSizeRelativeToCanvasHeight(9);
        ctx.save();
        that.clearCanvas();
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        var firstLine = this.relativePointToAbsolute(33, 0);
        var secondLine = this.relativePointToAbsolute(67, 0);
        drawPercentageRect(margin, data.forStats.defense, data.againstStats.attack);
        drawPercentageRect(firstLine.x + margin, data.forStats.midfield, data.againstStats.midfield);
        drawPercentageRect(secondLine.x + margin, data.forStats.attack, data.againstStats.defense);

        function drawPercentageRect(x, forPercentage, againstPercentage) {
            var forMultiplier = forPercentage / 100;
            var againstMultiplier = againstPercentage / 100;
            var forY = canvasHeight - (canvasHeight * (forPercentage + againstPercentage) / 100);
            var againstY = canvasHeight - (canvasHeight * (againstPercentage) / 100);
            that.setForOrAgainstFillAndStrokeStyle();
            ctx.fillRect(x, forY, stripWidth + (canvasWidth / 100), canvasHeight * forMultiplier);
            ctx.strokeRect(x, forY, stripWidth + (canvasWidth / 100), canvasHeight * forMultiplier);
            that.setForOrAgainstFillAndStrokeStyle(true);
            ctx.fillRect(x, againstY, stripWidth + (canvasWidth / 100), canvasHeight * againstMultiplier);
            ctx.strokeRect(x, againstY, stripWidth + (canvasWidth / 100), canvasHeight * againstMultiplier);
            var textMargin = 1 * that.pitch.getLengthRatio();
            var textY = forY - fontSize / 2 - textMargin;
            if (textY < fontSize) {
                textY = fontSize / 2 + textMargin;
            }
            ctx.textAlign = "center";
            that.drawText(forPercentage + againstPercentage, {
                x: x + stripWidth / 2,
                y: textY
            }, fontSize);
        }
        var g = new CvsGraphCtx(ctx.canvas);
        g.setPenColor("#333");
        g.move(33, 0);
        g.line(33, 100, "dotted");
        g.move(67, 0);
        g.line(67, 100, "dotted");
        var y = this.getCanvasHeight() / 2;
        var x = this.getCanvasWidth() / 6;
        ctx.beginPath();
        ctx.closePath();
        ctx.restore();
    }
});
nextgame.statistics.touchZones2 = nextgame.statistics.touchZones.extend({
    draw: function(data, options) {
        var that = this;
        var ctx = that.getContext();
        var pitchCtx = that.pitch.getContext();
        var otherTeam = "away" == data.field;
        data = that.model(data.value);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.save();
        that.setForOrAgainstFillAndStrokeStyle(otherTeam);
        var defense = data.forStats.defense + data.againstStats.attack;
        var midfield = data.forStats.midfield + data.againstStats.midfield;
        var attack = data.forStats.attack + data.againstStats.defense;
        var sum = defense + midfield + attack;
        drawVerticalZone(NG.percentage(defense, sum, 1, 1), 0, 33);
        drawVerticalZone(NG.percentage(midfield, sum, 1, 1), 33, 67);
        drawVerticalZone(NG.percentage(attack, sum, 1, 1), 67, 100);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var labels = options.labels ? options.labels : ["Defensive Third", "Middle Third", "Attacking Third"];
        this.showValues = false;
        this.drawText(defense, that.relativePointToAbsolute(17, 50), 40);
        this.showValues = true;
        this.drawText(labels[0], that.relativePointToAbsolute(17, 35), 11);
        this.showValues = false;
        this.drawText(midfield, that.relativePointToAbsolute(50, 50), 40);
        this.showValues = true;
        this.drawText(labels[1], that.relativePointToAbsolute(50, 35), 11);
        this.showValues = false;
        this.drawText(attack, that.relativePointToAbsolute(84, 50), 40);
        this.showValues = true;
        this.drawText(labels[2], that.relativePointToAbsolute(84, 35), 11);
        ctx.restore();
        drawPitchDividingDottedLines();

        function drawVerticalZone(percentage, xStart, xEnd) {
            var startPoint = that.relativePointToAbsolute(xStart, 100);
            var endPoint = that.relativePointToAbsolute(xEnd, 0);
            var alpha = percentage / 100;
            ctx.fillStyle = otherTeam === false ? that.homeFillStyle.setAlpha(alpha).toRgbaString() : that.awayFillStyle.setAlpha(alpha).toRgbaString();
            ctx.fillRect(startPoint.x, startPoint.y, endPoint.x - startPoint.x, endPoint.y - startPoint.y);
        }

        function drawPitchDividingDottedLines() {
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
            var wc = whoCan(ctx);
            wc.dashLength = 3;
            wc.dashSpaceLength = 2;
            wc.dashedLine(function(c) {
                c.translate(wc.width() / 3, 0);
                c.rotate(nextgame.degreesToRadians(90));
            }, wc.width());
            wc.dashedLine(function(c) {
                c.translate(wc.width() / 3 * 2, 0);
                c.rotate(nextgame.degreesToRadians(90));
            }, wc.width());
        }
    }
});
nextgame.statistics.attemptZones = nextgame.statistics.base.extend({
    init: function(config) {
        this.matrix = config.matrix === undefined ? new nextgame.canvas.transformationMatrix(1, 0, 0, 1, 0, 0) : config.matrix;
        this.maxBarHeight = config.maxBarHeight || 39;
        this.base(config);
    },
    draw: function(data) {
        data = prepareData(data);
        var otherTeam = "away" == data.field;
        var that = this;
        var ctx = this.getContext();
        var pitch = this.pitch;
        var largePitchCtx = pitch.getContext();
        var sixYards = pitch.getSixYards();
        var oneYard = sixYards / 6;
        var pitchLineWidth = nextgame.lineWidthPixelsUsed(pitch.getLineWidth());
        var halfPitchLineWidth = pitchLineWidth / 2;
        var pitchLength = that.pitch.length - pitchLineWidth;
        var pitchWidth = that.pitch.width - pitchLineWidth;
        var eighteenYardX = pitchLength / 2 - pitch.yards(18);
        var eighteenYardY = pitchWidth / 2 - pitch.yards(22);
        var sixYardX = pitchLength / 2 - pitch.yards(6);
        var sixYardY = pitchWidth / 2 - pitch.yards(10);
        var matrix = that.matrix;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        var bar = function(percentage, yardsFromHalf, textLines, yardsFromGoal) {
            this.percentage = percentage;
            this.yardsFromHalf = yardsFromHalf;
            this.textLines = textLines;
            this.yardsFromGoal = yardsFromGoal;
            this.xYards = 0;
        };
        var bars = [new bar(data.sixYard, this.maxBarHeight, ["6 Yard", "Box"], 3), new bar(data.eighteenYard, this.maxBarHeight, ["18 Yard", "Box"], 12), new bar(data.other, this.maxBarHeight, ["Outside 18", "Yard Box"], 21)];
        for (var i = 0, len = bars.length; i < len; i++) {
            var bar = bars[i];
            drawBar(bar);
        }

        function prepareData(data) {
            var values = data.value;
            data.sixYard = NG.roundNumber(100 * values[0] / NG.roundNumber(values.sum()));
            data.eighteenYard = NG.roundNumber(100 * values[1] / NG.roundNumber(values.sum()));
            data.other = NG.roundNumber(100 * values[2] / NG.roundNumber(values.sum()));
            return data;
        }

        function drawBar(bar) {
            var percentage = bar.percentage;
            var yYards = bar.yardsFromHalf;
            var startPoint = matrix.pointToTransformedPoint(pitch.yards(bar.yardsFromGoal), pitch.yardsW(bar.yardsFromHalf), pitch.length, pitch.width);
            var fontSize = pitch.width / 8;
            var barHeight = ((startPoint.y) * (percentage / 100)) - (ctx.lineWidth * 2);
            var barWidth = Math.floor(pitch.yards(4));
            ctx.save();
            ctx.translate(startPoint.x, startPoint.y);
            ctx.transform(matrix.xScale, matrix.xShear, matrix.yShear, matrix.yScale, 0, 0);
            var shadownHeight = barHeight / 2;
            var grad = ctx.createLinearGradient(0, -shadownHeight, 1, shadownHeight);
            grad.addColorStop(1, "rgba(0,0,0,1)");
            grad.addColorStop(0, "rgba(0,0,0,0)");
            ctx.fillStyle = grad;
            ctx.fillRect(-barWidth / 2, -shadownHeight, barWidth, shadownHeight);
            ctx.restore();
            that.setForOrAgainstFillAndStrokeStyle(otherTeam, 0.8);
            var scaledBarWidth = barWidth * matrix.xScale;
            ctx.fillRect(startPoint.x - scaledBarWidth / 2, startPoint.y - barHeight, scaledBarWidth, barHeight);
            ctx.strokeRect(startPoint.x - scaledBarWidth / 2, startPoint.y - barHeight, scaledBarWidth, barHeight);
            drawPercentages(percentage, {
                x: startPoint.x,
                y: startPoint.y - barHeight
            }, fontSize);
            ctx.restore();
        }

        function drawPercentages(dataToDisplay, point, fontSize) {
            ctx.font = fontSize + "px 'verdana'";
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            if (point.y < fontSize) {
                point.y = fontSize;
            }
            that.drawText(dataToDisplay, point, fontSize);
        }
    }
});
nextgame.statistics.attemptZones2 = nextgame.statistics.base.extend({
    draw: function(data) {
        function getAgainst(data) {
            if (data.against) {
                return data.against;
            }
            return data.filter ? data.filter.data.against : "0";
        }
        var that = this;
        var ctx = that.getContext();
        var pitch = that.pitch;
        var yards = that.pitch.yards;
        var shapes = new nextgame.shapes({
            context: ctx
        });
        var otherTeam = "away" == data.field;
        var conceded = getAgainst(data) === "1";
        var lineWidth = nextgame.lineWidthPixelsUsed(that.pitch.getLineWidth());
        var fillStyle = otherTeam ? that.awayFillStyle : that.homeFillStyle;
        if (conceded) {
            fillStyle = that.fillStyleConceded;
        }
        var midYPoint = that.relativePointToAbsolute(0, 50).y;
        that.showValues = false;
        data = prepareData(data);
        that.clearCanvas();
        ctx.save();
        ctx.translate(0.5, 0);
        ctx.scale(-1, 1);
        ctx.fillStyle = fillStyle.setAlpha(data.sixYard / data.sum).toRgbaString();
        ctx.fillRect(-yards(6) - pitch.goalHeight, midYPoint - yards(10), yards(6) - lineWidth, yards(20) - lineWidth);
        var topOf18YardBox = midYPoint - yards(22) + lineWidth / 2;
        var bottomOf18YardBox = yards(44) - lineWidth;
        ctx.fillStyle = fillStyle.setAlpha(data.eighteenYard / data.sum).toRgbaString();
        shapes.drawCShape(-yards(18) - pitch.goalHeight, topOf18YardBox, yards(18) - lineWidth, bottomOf18YardBox, yards(12), yards(12));
        ctx.fillStyle = fillStyle.setAlpha(data.other / data.sum).toRgbaString();
        shapes.drawCShape(-yards(57.5) - pitch.goalHeight, midYPoint - yards(37) + lineWidth / 2, yards(57.5) - lineWidth, yards(74) - lineWidth, yards(39.5), yards(15));
        ctx.restore();
        ctx.beginPath();
        ctx.closePath();
        ctx.strokeStyle = "#FFF";
        var startX = lineWidth;
        var endX = yards(18) + lineWidth / 2;
        var startY = topOf18YardBox - 1;
        var y = topOf18YardBox - lineWidth / 2 - 0.5;

        function drawDashedLined(fnPositionStart, length, dashLength, spaceLength) {
            ctx.save();
            if (typeof(fnPositionStart) == "function") {
                fnPositionStart();
            }
            ctx.beginPath();
            for (i = 0; i < length; i += (dashLength + spaceLength)) {
                if (startX + i + dashLength < length) {
                    ctx.moveTo(i, 0);
                    ctx.lineTo(i + dashLength, 0);
                }
            }
            ctx.moveTo(i, 0);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        }
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        var wc = whoCan(ctx);
        wc.dashLength = 3;
        wc.dashSpaceLength = 2;
        wc.dashedLine(function() {
            ctx.translate(lineWidth * 2, midYPoint - yards(10));
        }, yards(6));
        wc.dashedLine(function() {
            ctx.translate(yards(6) + lineWidth, midYPoint - yards(10) - lineWidth / 2);
            ctx.rotate(nextgame.degreesToRadians(90));
        }, yards(21) - lineWidth);
        wc.dashedLine(function() {
            ctx.translate(lineWidth * 2, midYPoint + yards(10));
        }, yards(6));
        wc.dashedLine(function() {
            ctx.translate(lineWidth * 2, startY + 0.5);
        }, yards(18));
        wc.dashedLine(function() {
            ctx.translate(yards(18) + lineWidth, topOf18YardBox);
            ctx.rotate(nextgame.degreesToRadians(90));
        }, yards(44));
        wc.dashedLine(function() {
            ctx.translate(lineWidth * 2, topOf18YardBox + bottomOf18YardBox + 0.5);
        }, yards(18));
        wc.dashedLine(function() {
            ctx.translate(yards(58) - lineWidth / 2, 0);
            ctx.rotate(nextgame.degreesToRadians(90));
        }, yards(49));
        ctx.save();
        ctx.textBaseline = "middle";
        that.showValues = false;
        that.drawText(data.sixYard, {
            x: pitch.goalHeight + yards(1),
            y: midYPoint - yards(6)
        });
        that.showValues = true;
        that.drawText("6 yard box", {
            x: pitch.goalHeight + yards(11 + (digitCount(data.sixYard) * 2)),
            y: midYPoint - yards(6)
        }, 11);
        that.showValues = false;
        that.drawText(data.eighteenYard, {
            x: pitch.goalHeight + yards(8),
            y: midYPoint + yards(2)
        });
        that.showValues = true;
        that.drawText("18 yard box", {
            x: pitch.goalHeight + yards(18 + (digitCount(data.eighteenYard) * 2)),
            y: midYPoint + yards(2)
        }, 11);
        that.showValues = false;
        that.drawText(data.other, {
            x: pitch.goalHeight + yards(23),
            y: midYPoint + yards(10)
        });
        that.showValues = true;
        that.drawText("Out of box", {
            x: pitch.goalHeight + yards(33 + (digitCount(data.other) * 2)),
            y: midYPoint + yards(10)
        }, 11);
        ctx.restore();

        function digitCount(number) {
            return number.toString().length;
        }

        function prepareData(data) {
            var values = data.value;
            if (0 == NG.roundNumber(values.sum())) {
                return {
                    sixYard: 0,
                    eighteenYard: 0,
                    other: 0,
                    sum: 1
                };
            }
            data.sixYard = that.showValues ? values[0] : NG.roundNumber(100 * values[0] / NG.roundNumber(values.sum()));
            data.eighteenYard = that.showValues ? values[1] : NG.roundNumber(100 * values[1] / NG.roundNumber(values.sum()));
            data.other = that.showValues ? values[2] : NG.roundNumber(100 * values[2] / NG.roundNumber(values.sum()));
            data.sum = data.sixYard + data.eighteenYard + data.other;
            return data;
        }

        function yardsPoint(x, y) {
            return {
                x: yards(x),
                y: yards(y)
            };
        }
    }
});
nextgame.statistics.draw3DPitch = function(pitchCtx, length, width) {
    var threeDeePitch = new nextgame.pitch({
        length: length,
        width: width,
        goalHeight: 0,
        context: pitchCtx,
        drawCenterCircle: nextgame.canvasSupported(),
        drawPenaltyArcs: nextgame.canvasSupported(),
        drawCornerCircles: false
    });
    var tempLength = length;
    length = width;
    width = tempLength;
    var yShearRadians = nextgame.degreesToRadians(30);
    var yShear = Math.tan(yShearRadians);
    var xScale = 4;
    var yScale = 1.3;
    var yTranslation = threeDeePitch.width * 0.15;
    var maxBarHeight = 40;
    var matrix = new nextgame.canvas.transformationMatrix(xScale, 0, -yShear, yScale, yShear * threeDeePitch.yardsW(47), yTranslation);
    pitchCtx.clearRect(0, 0, 2000, 2000);
    var rightMargin = (threeDeePitch.yardsW(7) * Math.tan(yShearRadians) * xScale);
    var canvasDimensions = {
        width: threeDeePitch.length,
        height: threeDeePitch.width
    };
    $(pitchCtx.canvas).parent().css(canvasDimensions);
    $(pitchCtx.canvas).attr(canvasDimensions);
    pitchCtx.lineWidth = 1;
    pitchCtx.strokeStyle = pitchCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
    pitchCtx.save();
    matrix.setTransform(pitchCtx);
    threeDeePitch.drawStripes();
    threeDeePitch.draw();
    pitchCtx.restore();
    displayGoal(pitchCtx);

    function displayGoal(ctx) {
        var goalWidth = threeDeePitch.yards(8);
        var startY = threeDeePitch.width / 2 - goalWidth / 2;
        var startPoint = matrix.pointToTransformedPoint(0, startY, threeDeePitch.length, threeDeePitch.width);
        var endPoint = matrix.pointToTransformedPoint(0, startY + goalWidth, threeDeePitch.length, threeDeePitch.width);
        ctx.lineWidth = 2;
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(startPoint.x, startPoint.y - threeDeePitch.yards(6));
        ctx.lineTo(endPoint.x, endPoint.y - threeDeePitch.yards(6));
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.closePath();
    }
    return {
        pitch: threeDeePitch,
        matrix: matrix,
        canvasDimensions: canvasDimensions,
        maxBarHeight: maxBarHeight
    };
};
nextgame.statistics.attemptDirections = nextgame.statistics.base.extend({
    draw: function(data) {
        var against = data.against ? data.against : (data.filter ? (data.filter.data.against ? data.filter.data.against : "0") : "0");
        var conceded = against === "1",
            pitch = this.pitch,
            otherTeam = "away" === data.field,
            that = this,
            ctx = this.getContext(),
            arrowDirection, wc = whoCan(ctx),
            isDirectionOfPlayLeftToRight = false;
        var arrowOrientation = {
                horizontal: 0,
                upDiagaonal: -1,
                downDiagaonal: 1
            },
            arrowDirections = {
                Left: 0,
                Right: 1
            };
        if (otherTeam) {
            arrowDirection = conceded ? arrowDirections.Right : arrowDirections.Left;
        } else {
            arrowDirection = conceded ? arrowDirections.Left : arrowDirections.Right;
        }
        if (arrowDirection === arrowDirections.Right) {
            isDirectionOfPlayLeftToRight = true;
        }
        that.showValues = false;
        data = prepareData(data);
        ctx.clearRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
        ctx.lineWidth = 1;
        ctx.lineJoin = "miter";
        ctx.textAlign = "right";
        if (conceded) {
            ctx.fillStyle = "#AAA";
            ctx.strokeStyle = "#AAA";
        } else {
            that.setForOrAgainstFillAndStrokeStyle(otherTeam);
        }
        drawAttemptsArrow(data.right, 70, isDirectionOfPlayLeftToRight ? 7 : 93, isDirectionOfPlayLeftToRight ? arrowOrientation.upDiagaonal : arrowOrientation.downDiagaonal, data.sum, "Right side");
        drawAttemptsArrow(data.center, 62, 50, arrowOrientation.horizontal, data.sum, "Middle");
        drawAttemptsArrow(data.left, 70, isDirectionOfPlayLeftToRight ? 93 : 7, isDirectionOfPlayLeftToRight ? arrowOrientation.downDiagaonal : arrowOrientation.upDiagaonal, data.sum, "Left side");
        drawHorizontalZoneSeperators();

        function drawHorizontalZoneSeperators() {
            var lineLength = pitch.length / 2,
                lineWidth, middleOfPitch, startLineX;
            ctx.save();
            lineWidth = ctx.lineWidth = 2;
            ctx.strokeStyle = "#FFF";
            wc.dashLength = 3;
            wc.dashSpaceLength = 2;
            startLineX = isDirectionOfPlayLeftToRight ? pitch.length / 2 : 0, middleOfPitch = (pitch.width / 2) - lineWidth / 2;
            wc.dashedLine(function(c) {
                c.translate(startLineX, middleOfPitch - pitch.yardsW(10));
            }, lineLength);
            wc.dashedLine(function(c) {
                c.translate(startLineX, middleOfPitch + pitch.yardsW(10));
            }, lineLength);
            ctx.restore();
        }

        function prepareData(data) {
            var record = {};
            var values = data.value;
            record.left = that.showValues ? values[0] : NG.roundNumber(100 * values[0] / NG.roundNumber(values.sum()));
            record.center = that.showValues ? values[1] : NG.roundNumber(100 * values[1] / NG.roundNumber(values.sum()));
            record.right = that.showValues ? values[2] : NG.roundNumber(100 * values[2] / NG.roundNumber(values.sum()));
            record.sum = sum(record);
            return record;
        }

        function drawAttemptsArrow(percentage, x, y, orientation, sum, description) {
            sum = that.showValues ? sum : 100;
            var degrees = 0;
            var arrowBodyWidth = that.getCanvasWidth(6);
            var arrowHeadLength = that.getCanvasWidth(4);
            var arrowPoint = that.relativePointToAbsolute(x, y);
            var arrowBodyLength = 26;
            var textY = y;
            if (orientation !== arrowOrientation.horizontal) {
                var triangleArrowPointsAlong = new nextgame.shapes.rightAngleTriangle(that.getCanvasHeight() / 2 - that.getCanvasHeight(25), that.getCanvasWidth() - arrowPoint.x - that.getCanvasHeight(19));
                triangleArrowPointsAlong.solve();
                arrowBodyLength = triangleArrowPointsAlong.c / that.getCanvasWidth() * 100;
                if (orientation === arrowOrientation.upDiagaonal) {
                    textY = y + 1;
                    degrees = triangleArrowPointsAlong.B * -1;
                } else {
                    degrees = triangleArrowPointsAlong.B;
                    textY = y - 4;
                }
            }
            ctx.save();
            ctx.lineJoin = "round";
            if (isDirectionOfPlayLeftToRight) {
                ctx.scale(1, 1);
                ctx.translate(0, 0);
            } else {
                ctx.translate(ctx.canvas.width, 0);
                ctx.scale(-1, 1);
            }
            var actualArrowBodyLength = (that.getCanvasWidth(arrowBodyLength) - arrowHeadLength) * percentage / sum;
            var arrowX = that.getCanvasWidth(arrowBodyLength) - actualArrowBodyLength - arrowHeadLength;
            ctx.translate(arrowPoint.x, arrowPoint.y);
            ctx.rotate(nextgame.degreesToRadians(degrees));
            ctx.translate(arrowX, -arrowBodyWidth / 2);
            that.shapes.drawArrow(actualArrowBodyLength, arrowBodyWidth, arrowHeadLength, that.getCanvasWidth(8));
            ctx.restore();
            ctx.save();
            var textStartPoint;
            if (orientation === arrowOrientation.horizontal) {
                if (isDirectionOfPlayLeftToRight) {
                    ctx.translate(arrowPoint.x + arrowX, 0);
                } else {
                    ctx.translate(that.getCanvasWidth() - (arrowPoint.x + arrowX), 0);
                }
                textStartPoint = that.relativePointToAbsolute(isDirectionOfPlayLeftToRight ? -2 : 2, textY);
            } else {
                var arrowLengthTriangle = new nextgame.shapes.rightAngleTriangle(null, null, actualArrowBodyLength + arrowHeadLength, null, 90 - Math.abs(degrees));
                arrowLengthTriangle.solve();
                var arrowWidthTriangle = new nextgame.shapes.rightAngleTriangle(null, null, arrowBodyWidth / 2, null, Math.abs(degrees));
                arrowWidthTriangle.solve();
                var y = orientation === arrowOrientation.downDiagaonal ? 90 : 10;
                var x = !isDirectionOfPlayLeftToRight ? 31 : 69;
                textStartPoint = that.relativePointToAbsolute(x, y);
                var distanceFromArrowPointToArrowCorner = triangleArrowPointsAlong.a - arrowLengthTriangle.a - Math.abs(arrowWidthTriangle.a);
                if (isDirectionOfPlayLeftToRight) {
                    textStartPoint.x += distanceFromArrowPointToArrowCorner;
                } else {
                    textStartPoint.x -= distanceFromArrowPointToArrowCorner;
                }
                var yChange = (triangleArrowPointsAlong.b - arrowLengthTriangle.b) / 2;
                textStartPoint.y += orientation === arrowOrientation.upDiagaonal ? -yChange : yChange;
            }
            ctx.translate(textStartPoint.x, textStartPoint.y);
            ctx.textBaseline = "middle";
            ctx.textAlign = isDirectionOfPlayLeftToRight ? "right" : "left";
            that.showValues = false;
            that.drawText(percentage, null, that.fontSizeRelativeToCanvasHeight());
            that.showValues = true;
            var descriptionPoint = isDirectionOfPlayLeftToRight ? {
                x: -50,
                y: 0
            } : {
                x: 50,
                y: 0
            };
            that.drawText(description, descriptionPoint, 11);
            ctx.restore();
        }
    }
});

function sum(record) {
    var total = 0;
    for (var field in record) {
        if (record[field]) {
            total += record[field];
        }
    }
    return total;
}
nextgame.statistics.touchChannels = nextgame.statistics.base.extend({
    draw: function(channelsData) {
        var otherTeam = "away" == channelsData.field;
        channelsData = prepareData(channelsData);
        var that = this;
        var ctx = this.getContext();
        var width = this.getCanvasWidth();
        var arrowStartPointX = 50;
        var arrowBodyWidth = 14.5;
        var pitch = this.pitch;
        ctx.clearRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
        ctx.textAlign = "right";
        ctx.strokeStyle = "#CCC";
        that.setForOrAgainstFillAndStrokeStyle(otherTeam);
        drawChannel(channelsData.left, "left", "Left side");
        drawChannel(channelsData.center, "center", "Middle");
        drawChannel(channelsData.right, "right", "Right side");
        drawChannelSeperators();

        function drawChannelSeperators() {
            ctx.save();
            ctx.strokeStyle = "#FFF";
            ctx.lineWidth = 2;
            var lineLength = pitch.length / 2;
            var lineStartX = otherTeam ? 0 : lineLength;
            var wc = whoCan(ctx);
            wc.dashLength = 3;
            wc.dashSpaceLength = 2;
            wc.dashedLine(function() {
                ctx.translate(lineStartX, pitch.width / 3);
            }, lineLength);
            wc.dashedLine(function() {
                ctx.translate(lineStartX, pitch.width / 3 * 2);
            }, lineLength);
            ctx.restore();
        }

        function prepareData(data) {
            var record = {};
            var values = data.value;
            record.left = NG.roundNumber(100 * values[0] / NG.roundNumber(values.sum()));
            record.center = NG.roundNumber(100 * values[1] / NG.roundNumber(values.sum()));
            record.right = NG.roundNumber(100 * values[2] / NG.roundNumber(values.sum()));
            return record;
        }

        function drawChannel(percentage, channelType, description) {
            var y;
            var arrowStartPointY = (33 - arrowBodyWidth) / 2;
            switch (channelType) {
                case "left":
                    y = (otherTeam ? 33 : 100) - arrowStartPointY;
                    break;
                case "center":
                    y = 66 - arrowStartPointY;
                    break;
                case "right":
                    y = (otherTeam ? 100 : 33) - arrowStartPointY;
                    break;
            }
            drawArrow(percentage, y, 1);
            drawText(percentage, y, description);
        }

        function drawArrow(percentage, y, opacity) {
            var arrowLength = that.getCanvasWidth(45 * percentage / 100) - ctx.lineWidth;
            if (percentage > 0) {
                ctx.save();
                if (otherTeam) {
                    ctx.translate(ctx.canvas.width, 0);
                    ctx.scale(-1, 1);
                }
                var point = that.relativePointToAbsolute(50, y);
                ctx.translate(point.x, point.y);
                ctx.lineWidth = 2;
                ctx.lineJoin = "round";
                that.shapes.drawArrow(arrowLength, that.getCanvasHeight(arrowBodyWidth), that.getCanvasWidth(5), that.getCanvasHeight(21.5));
                ctx.restore();
            }
        }

        function drawText(percentage, y, description) {
            var fontSize = that.fontSizeRelativeToCanvasHeight();
            ctx.save();
            ctx.textBaseline = "middle";
            ctx.textAlign = otherTeam ? "left" : "right";
            var point = otherTeam ? that.relativePointToAbsolute(100 - arrowStartPointX + 3, y - arrowBodyWidth / 2) : that.relativePointToAbsolute(arrowStartPointX - 3, y - arrowBodyWidth / 2);
            ctx.translate(point.x, point.y);
            that.showValues = false;
            that.drawText(percentage, undefined, fontSize);
            that.showValues = true;
            var descriptionPoint = otherTeam ? {
                x: 50,
                y: 0
            } : {
                x: -50,
                y: 0
            };
            that.drawText(description, descriptionPoint, 11);
            ctx.restore();
        }
    }
});
nextgame.heatmapGradient = function(config) {
    this.width = config.width;
    this.height = config.height;
    this.context = config.context;
    this.draw = function() {
        var ctx = this.context;
        var grad = ctx.createLinearGradient(0, 0, this.width, 0);
        for (var i = 0; i <= 1; i += 0.1) {
            var hsl = new nextgame.hsl(0, 100, 60);
            grad.addColorStop(i, hsl.toStringForHeatmap(i));
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, this.width, this.height);
    };
};
nextgame.shapes = function(config) {
    var ctx;
    this.init = function() {
        ctx = config.context;
    };
    this.drawArrow = function(bodyLength, bodyWidth, headLength, headWidth) {
        var arrowHeadWidth = (headWidth - bodyWidth) / 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(bodyLength, 0);
        ctx.lineTo(bodyLength, -arrowHeadWidth);
        ctx.lineTo(bodyLength + headLength, bodyWidth / 2);
        ctx.lineTo(bodyLength, bodyWidth + arrowHeadWidth);
        ctx.lineTo(bodyLength, bodyWidth);
        ctx.lineTo(0, bodyWidth);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.closePath();
    };
    this.drawCShape = function(x, y, width, height, innerX, innerY) {
        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(width, 0);
        ctx.lineTo(width, innerY);
        ctx.lineTo(innerX, innerY);
        ctx.lineTo(innerX, height - innerY);
        ctx.lineTo(width, height - innerY);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    };
    this.drawArrowLine = function(xStart, yStart, xEnd, yEnd) {
        var headlen = 10;
        var angle = Math.atan2(yEnd - yStart, xEnd - xStart);
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
        ctx.lineTo(xEnd - headlen * Math.cos(angle - Math.PI / 6), yEnd - headlen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(xEnd, yEnd);
        ctx.lineTo(xEnd - headlen * Math.cos(angle + Math.PI / 6), yEnd - headlen * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.stroke();
    };
    this.init();
};
nextgame.shapes.rightAngleTriangle = function(a, b, c, A, B) {
    var that = this;
    this.a = a;
    this.b = b;
    this.c = c;
    this.A = nextgame.degreesToRadians(A);
    this.B = nextgame.degreesToRadians(B);
    this.C = 90;
    this.solve = function() {
        if (isNumber(this.a) && isNumber(this.b)) {
            this.c = Math.sqrt((a * a) + (b * b));
            this.B = Math.atan(a / b) * 180 / Math.PI;
        } else {
            if (isNumber(this.c) && isNumber(this.B)) {
                this.a = this.c * Math.cos(this.B);
                this.b = Math.sqrt(Math.pow(this.c, 2) - Math.pow(this.a, 2));
            }
        }
    };
    this.draw = function(ctx) {
        if (isNumber(this.a) && isNumber(this.b)) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.abs(this.b), 0);
            ctx.lineTo(Math.abs(this.b), Math.abs(this.a));
            ctx.closePath();
            ctx.stroke();
        }
    };

    function isNumber(number) {
        return typeof number === "number";
    }
};
WS = WS || {};
WS.Stats = {};
var statsFieldWidth = 630;
WS.Stats.Info = function(config) {
    var id, $view, view, model, teamIds, lastViewOptions, currentModel, monitorChanges;
    init(config);
    this.load = function(data) {
        loadTeamIds(data);
        var newModel = {
            home: model.instanceType(data.home),
            away: model.instanceType(data.away)
        };
        if (lastViewOptions.flagsOnLeft) {
            renderFlagsOnLeft(newModel);
        } else {
            render(newModel);
        }
        if (monitorChanges) {
            currentModel = newModel;
        }
    };

    function loadTeamIds(data) {
        teamIds.home = data.home.teamId;
        teamIds.away = data.away.teamId;
    }
    this.id = function() {
        return id;
    };
    this.updateTitle = function(title) {
        $("#" + id + " .title").html(title);
    };

    function init(config) {
        view = config.view;
        $view = $("#" + view.renderTo);
        model = config.model;
        id = view.renderTo;
        teamIds = {};
        view.labelWidth = view.labelWidth || 120;
        view.statValueWidth = 60;
        view.containerWidth = view.containerWidth || 644;
        view.statsWidth = view.width - view.labelWidth - (2 * view.statValueWidth);
        view.hideBars = view.hideBars;
        monitorChanges = model.monitorChanges;
        lastViewOptions = getDefaultViewOptions();
    }

    function getDefaultViewOptions() {
        return jQuery.extend(true, {}, view);
    }

    function displayPlayed(homeData, awayData) {
        return homeData.played && awayData.played;
    }

    function resetLastViewOptions() {
        lastViewOptions = getDefaultViewOptions();
    }

    function updateLastViewOptionsByLabelGroup(labelGroup, label) {
        if (labelGroup) {
            if (null != labelGroup.labelWidth) {
                lastViewOptions.labelWidth = labelGroup.labelWidth;
            }
            if (null != labelGroup.statValueWidth) {
                lastViewOptions.statValueWidth = labelGroup.statValueWidth;
            }
            if (!label.displayValue) {
                lastViewOptions.labelWidth = 0;
            }
            lastViewOptions.statsWidth = lastViewOptions.width - lastViewOptions.labelWidth - (2 * lastViewOptions.statValueWidth);
        }
    }

    function showBars(labelGroup) {
        return !view.hideBars && !(labelGroup && labelGroup.hideBars);
    }

    function renderFlagsOnLeft(data) {
        var t = [];
        if (!data) {
            return;
        }
        if (!data.home || !data.away) {
            renderEmpty();
            return;
        }
        t.push('<div class="three-cols">');
        t.push('<div class="left" style="width: ' + ((view.containerWidth - lastViewOptions.width) / 2) + 'px;">');
        t.push("<ul>");
        t.push("<li>");
        t.push(WS.TeamEmblemUrl(teamIds.home));
        t.push("</li>");
        t.push('<li class="played">Played: ' + data.home.played + "</li>");
        t.push("</ul>");
        t.push("</div>");
        t.push('<div class="centre" style="width: ' + lastViewOptions.width + 'px">');
        t.push(renderStats(data.home, data.away));
        t.push("</div>");
        t.push('<div class="right" style="width: ' + ((view.containerWidth - lastViewOptions.width) / 2) + 'px;">');
        t.push("<ul>");
        t.push("<li>");
        t.push(WS.TeamEmblemUrl(teamIds.away));
        t.push("</li>");
        t.push('<li class="played">Played: ' + data.away.played + "</li>");
        t.push("</ul>");
        t.push("</div>");
        t.push("</div>");
        $view.html(t.join(""));
    }

    function render(data) {
        var t = [];
        if (!data) {
            return;
        }
        if (!data.home || !data.away) {
            renderEmpty();
            return;
        }
        if (displayPlayed(data.home, data.away)) {
            t.push('<div class="matches-played">');
            t.push('<span class="home-played ta-left">');
            t.push(WS.TeamEmblemUrl(teamIds.home));
            t.push('<span class="played-text">Played: ' + data.home.played + "</span>");
            t.push("</span>");
            t.push('<span class="away-played ta-right">');
            t.push('<span class="played-text">Played: ' + data.away.played + "</span>");
            t.push(WS.TeamEmblemUrl(teamIds.away));
            t.push("</span>");
            t.push("</div>");
        }
        t.push(renderStats(data.home, data.away));
        $("#" + view.renderTo).html(t.join(""));
    }

    function renderStats(homeData, awayData) {
        var t = [];
        var alt = false;
        for (var i = 0; i < model.labels.length; i++) {
            var label = [];
            var labelGroup = getLabelGroup(i);
            resetLastViewOptions();
            updateLastViewOptionsByLabelGroup(labelGroup, model.labels[i]);
            if (labelGroup && labelGroup.alternateRowType) {
                alt = 1 == labelGroup.alternateRowType ? 0 == i % 2 : 1 == i % 2;
            }
            var homeDisplayValue = getStatDisplayValue(homeData.data[i], model.labels[i].type, awayData.data[i]);
            var awayDisplayValue = getStatDisplayValue(awayData.data[i], model.labels[i].type, homeData.data[i]);
            if (model.labels[i].displayTemplate) {
                label.push(model.labels[i].displayTemplate(homeData.data[i], awayData.data[i]));
            } else {
                label.push('<div class="stat {0}">'.format(alt ? "alt" : ""));
                if (showBars(labelGroup)) {
                    label.push('<span  style="width:' + view.width + 'px;">');
                    label.push('<span class="stat-bar-wrapper home ' + (model.labels[i].clazz ? model.labels[i].clazz : "") + '" style="width:' + (lastViewOptions.statsWidth / 2) + 'px;">');
                    label.push('<span class="stat-bar rc-l" style="width: ' + getWidth(homeData.data, awayData.data, i, labelGroup) + 'px;"></span>');
                    label.push("</span>");
                }
                label.push('<span style="width: ' + lastViewOptions.statValueWidth + 'px" class="stat-value">' + homeDisplayValue + "</span>");
                if (model.labels[i].displayValue) {
                    label.push('<span class="stat-label" style="width: ' + lastViewOptions.labelWidth + 'px;">' + model.labels[i].displayValue + "</span>");
                }
                label.push('<span style="width: ' + lastViewOptions.statValueWidth + 'px" class="stat-value">' + awayDisplayValue + "</span>");
                if (showBars(labelGroup)) {
                    label.push('<span class="stat-bar-wrapper away ' + (model.labels[i].clazz ? model.labels[i].clazz : "") + '" style="width:' + (lastViewOptions.statsWidth / 2) + 'px;">');
                    label.push('<span class="stat-bar rc-r" style="width: ' + getWidth(awayData.data, homeData.data, i, labelGroup) + 'px;"></span>');
                    label.push("</span>");
                    label.push("</span>");
                }
                label.push("</div>");
            }
            if (labelGroup) {
                if (i == labelGroup.start) {
                    t.push('<div class="stat-group ' + (labelGroup.clazz || "") + '" style="' + (labelGroup.style || "") + '">');
                    if (labelGroup.title) {
                        t.push('<div class="title">' + labelGroup.title + "</div>");
                    }
                }
                t.push(label.join(""));
                if (i == labelGroup.end) {
                    t.push("</div>");
                }
            } else {
                t.push(label.join(""));
            }
        }
        return t.join("");
    }

    function getLabelGroup(index) {
        if (!model.labelGroups) {
            return;
        }
        for (var i = 0; i < model.labelGroups.length; i++) {
            var labelGroup = model.labelGroups[i];
            if (labelGroup.start <= index && index <= labelGroup.end) {
                return labelGroup;
            }
        }
    }

    function renderEmpty() {
        $("#" + view.renderTo).html('<div class="note empty">N/A..</div>');
    }

    function getStatDisplayValue(value, type, otherValue, oldValue) {
        var isGreater = NG.numberIsGreaterThan(value, otherValue);
        var value = parseFloat(NG.roundNumber(value, 1));
        if ("percentage" == type) {
            var thisPercentage = NG.roundNumber(value);
            var otherPercentage = NG.roundNumber(otherValue);
            if (100 < thisPercentage + otherPercentage) {
                if (thisPercentage < otherPercentage) {
                    thisPercentage -= 1;
                }
            }
            value = thisPercentage + (("percentage") == type ? "%" : "");
        }
        return '<span class="{1} {2}">{0}</span>'.format(value, monitorChanges && currentModel ? statChanged(value, oldValue) ? "pulsable" : "" : "pulsable", isGreater ? "greater" : "");
    }

    function getWidth(data, opponentData, index, labelGroup) {
        var value = data[index],
            opponentValue = opponentData[index];
        var values = getValuesToCalculateWidth(data, opponentData, index, labelGroup);
        var width = getExpandedWidth(value, values, index, labelGroup);
        return width;
    }

    function getExpandedWidth(ownValue, values, index) {
        var canExpand = true,
            sum = model.labels[index].maxValue ? model.labels[index].maxValue : values.sum(),
            expansion = 1;
        if (0 == sum) {
            return 0;
        }
        while (canExpand) {
            for (var i = 0; i < values.length; i++) {
                var width = parseInt((values[i] * lastViewOptions.statsWidth / 2) / (sum));
                if (lastViewOptions.statsWidth / 2 <= (width * 1.25)) {
                    canExpand = false;
                } else {
                    values[i] *= 1.25;
                }
            }
            if (canExpand) {
                expansion *= 1.25;
            }
        }
        return parseInt((ownValue * expansion * lastViewOptions.statsWidth / 2) / (sum));
    }

    function getValuesToCalculateWidth(data, opponentData, index, labelGroup) {
        var values = [];
        if (labelGroup && !labelGroup.noRelativity) {
            for (var i = labelGroup.start; i <= labelGroup.end; i++) {
                values.push(data[i]);
                values.push(opponentData[i]);
            }
        } else {
            values.push(data[index]);
            values.push(opponentData[index]);
        }
        return values;
    }

    function getSumOfValues(data, opponentData, start, end) {
        var sum = 0;
        for (var i = start; i <= end; i++) {
            sum += data[i];
            sum += opponentData[i];
        }
        return sum;
    }
};
WS.Legends = function(config) {
    var id, view, model;
    init(config);

    function init(config) {
        id = config.id;
        view = config.view;
        model = config.model;
        render();
    }

    function render() {
        var t = [];
        t.push('<ul class="legends">');
        for (var i = 0; i < model.length; i++) {
            t.push('<li> <span class="box legend" style="background-color: ' + model[i].color + '">&nbsp;</span>' + model[i].displayName + "</li>");
        }
        t.push("</ul>");
        $("#" + view.renderTo).html(t.join(""));
    }
};
WS.Stats.PieChart = function(config) {
    var id, chart, legends, view, model, currentTotal, currentData;
    init(config);
    this.load = function(data, selected) {
        clearData();
        currentData = data;
        addData(prepareData(currentData, selected));
    };
    this.id = function() {
        return id;
    };
    this.showLoading = function() {
        chart.showLoading();
    };
    this.hideLoading = function() {
        chart.hideLoading();
    };
    this.updateFilter = function(index) {
        this.load(currentData, index);
    };

    function init(config) {
        model = config.model || {};
        view = config.view || {};
        id = view.renderTo;
        chart = getChart();
    }

    function prepareData(data, selected) {
        var records = data;
        if (!records) {
            $("#" + id).triggerHandler("empty-data");
            return null;
        }
        var series = {
            type: "pie",
            data: []
        };
        currentTotal = records.sum();

        function isMax(records, index) {
            return records.max() == records[index];
        }
        for (var i = 0; i < model.categories.length; i++) {
            var sliced = selected ? i == selected : isMax(records, model.categories[i].id);
            series.data.push({
                name: model.categories[i].displayName,
                color: model.categories[i].color,
                sliced: sliced,
                selected: sliced,
                y: records[model.categories[i].id]
            });
        }
        return series;
    }

    function addData(data) {
        if (!data) {
            return;
        }
        chart.addSeries(data);
    }

    function clearData() {
        if (0 != chart.series.length) {
            for (var i = 0; i < chart.series.length; i++) {
                chart.series[i].remove();
            }
        }
    }

    function getCategoryIdentifiers(category) {
        var identifiers = {};
        var index;
        for (var i = 0; i < model.categories.length; i++) {
            if (model.categories[i].displayName == category) {
                identifiers = {
                    clicked: {
                        id: model.categories[i].id
                    }
                };
                index = i;
            }
        }
        if (model.identifiers) {
            identifiers.index = model.identifiers.index;
            identifiers.value = model.identifiers.value[index];
        }
        return identifiers;
    }

    function getChart() {
        return new Highcharts.Chart({
            chart: {
                renderTo: view.renderTo,
                backgroundColor: $.extend({}, {
                    linearGradient: [0, 0, 500, 500],
                    stops: [
                        [0, "#fff"],
                        [1, "#fff"]
                    ]
                }, view.backgroundColor),
                margin: [50, 10, 30, 20],
                width: view.width ? view.width : 330,
                height: view.height ? view.height : 260
            },
            title: {
                text: view.title || "",
                style: $.extend({}, {
                    font: "18px Arial,Helvetica,sans-serif",
                    color: "#222"
                }, view.titleStyle)
            },
            plotArea: {
                shadow: null,
                borderWidth: null,
                backgroundColor: null
            },
            tooltip: {
                formatter: function() {
                    return "<b>" + this.point.name + "</b>: " + (currentTotal && 0 != currentTotal ? parseInt(100 * this.y / currentTotal) : 0) + ("value" == model.type ? "" : "%");
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: "pointer",
                    size: view.size ? view.size : 150,
                    center: view.center ? view.center : [140, 90],
                    dataLabels: {
                        enabled: false,
                        formatter: function() {
                            if ((currentTotal && 0 != currentTotal ? parseInt(100 * this.y / currentTotal) : 0) > 30) {
                                return this.point.name;
                            }
                        },
                        style: {
                            font: "12px Arial,Helvetica,sans-serif",
                            color: "#222"
                        }
                    }
                },
                series: {
                    cursor: "pointer",
                    events: {
                        click: function(event) {
                            $("#" + id).triggerHandler("clicked", [getCategoryIdentifiers(event.point.name)]);
                        }
                    }
                }
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: view.showLegends ? true : false,
                style: {
                    left: "auto",
                    bottom: "0px"
                }
            },
            loading: {
                labelStyle: {
                    top: "45%",
                    font: "2em Verdana,Arial,Helvetica,sans-serif",
                    position: "relative"
                },
                hideDuration: 500,
                showDuration: 500
            },
            series: []
        });
    }
};
WS.Stats.BarChart = function(config) {
    var id, chart, view, model;
    init(config);
    this.load = function(data) {
        clearData();
        model.home.data = prepareData(data.home);
        model.away.data = prepareData(data.away);
        addData(model.home);
        addData(model.away);
        $("#" + id).triggerHandler("model-updated");
    };

    function addData(data) {
        chart.addSeries(data);
    }
    this.id = function() {
        return id;
    };
    this.showLoading = function() {
        chart.showLoading();
    };
    this.hideLoading = function() {
        chart.hideLoading();
    };

    function prepareData(records) {
        records = model.instanceType(records);
        var data = [];
        for (var i = 0; i < records.length; i++) {
            data.push(getValue(records, i));
        }
        return data;
    }

    function getValue(records, index) {
        if ("percentage" == model.type) {
            return parseInt(100 * records[index] / records.sum());
        }
        return records[index];
    }

    function clearData() {
        chart.series[0].remove();
        chart.series[0].remove();
    }

    function init(config) {
        model = config.model || {};
        view = config.view || {};
        id = view.renderTo;
        chart = getChart(view, model);
    }

    function getCategoryIdentifiers(category) {
        for (var i = 0; i < model.categories.displayNames.length; i++) {
            if (model.categories.displayNames[i] == category) {
                return {
                    clicked: {
                        index: model.categories.identifiers.index,
                        value: model.categories.identifiers.value[i]
                    }
                };
            }
        }
    }

    function getChart(view, model) {
        return new Highcharts.Chart({
            chart: {
                renderTo: view.renderTo,
                backgroundColor: {
                    linearGradient: [0, 0, 500, 500],
                    stops: [
                        [0, "#333333"],
                        [1, "#575757"]
                    ]
                },
                width: view.width ? view.width : 660,
                height: view.height ? view.height : 300,
                defaultSeriesType: "column",
                events: {
                    click: function() {
                        $("#" + id).triggerHandler("clicked");
                    }
                }
            },
            title: {
                text: view.title,
                style: {
                    fontFamily: "Arial,Helvetica,sans-serif",
                    color: "#CCC",
                    fontWeight: "bold"
                }
            },
            credits: {
                enabled: false
            },
            legend: {
                itemStyle: {
                    color: "#ccc",
                    fontFamily: "Arial,Helvetica,sans-serif"
                }
            },
            xAxis: {
                categories: model.categories.displayNames,
                labels: {
                    style: {
                        color: "#CCC",
                        fontFamily: "Arial,Helvetica,sans-serif"
                    }
                }
            },
            yAxis: {
                min: model.min,
                title: {
                    text: view.yAxisTitle,
                    style: {
                        color: "#CCC",
                        fontFamily: "Arial,Helvetica,sans-serif",
                        fontSize: "1.2em"
                    }
                },
                labels: {
                    style: {
                        color: "#CCC",
                        fontFamily: "Arial,Helvetica,sans-serif"
                    }
                }
            },
            subtitle: view.subtitle,
            tooltip: {
                formatter: model.tooltip ? model.tooltip : function() {
                    return "" + this.x + ": " + this.y + ("percentage" == model.type ? "%" : "");
                }
            },
            plotOptions: {
                series: {
                    pointWidth: view.columnWidth ? view.columnWidth : 20,
                    pointPadding: 0,
                    cursor: view.cursor ? view.cursor : "pointer"
                },
                column: {
                    borderWidth: 0,
                    point: {
                        events: {
                            click: function() {
                                $("#" + id).triggerHandler("clicked", [getCategoryIdentifiers(this.category)]);
                            }
                        }
                    }
                }
            },
            loading: {
                labelStyle: {
                    top: "45%",
                    font: "2em Arial,Helvetica,sans-serif",
                    position: "relative"
                },
                hideDuration: 500,
                showDuration: 500
            },
            series: [model.home, model.away]
        });
    }
};

function H2HAggressionModel(data) {
    var records = [0, 0, 0, 0];
    if (!data.value || 0 == data.value.length) {
        return records;
    }
    var values = data.value[0];
    AggresionModel(records, values);
    return records;
}

function AggresionModel(records, values) {
    var groupedReasons = [
        [1],
        [3, 4, 5, 7, 8],
        [9],
        [2, 6, 0]
    ];
    for (var i = 0; i < groupedReasons.length; i++) {
        for (var j = 0; j < values.length; j++) {
            if (-1 != $.inArray(values[j][0], groupedReasons[i])) {
                records[i] += values[j][1];
            }
        }
    }
}

function LiveAggressionModel(data) {
    var records = [0, 0, 0, 0];
    if (!data.value || 0 == data.value.length) {
        return records;
    }
    var values = data.value[0][0][0];
    if (!values) {
        return records;
    }
    AggresionModel(records, values);
    return records;
}

function H2HAggressionInfoModel(data) {
    var record = {
        data: [0, 0, 0, 0]
    };
    var fouls = 0,
        red = 0,
        yellow = 0;
    var value = data.value[0];
    if (0 != value.length) {
        var infos = value[value.length - 1][0];
        for (var i = 0; i < infos.length; i++) {
            if ("fk_foul_lost" == infos[i][0]) {
                fouls += infos[i][1][0];
            }
            if ("total_red_card" == infos[i][0]) {
                red += infos[i][1][0];
            }
            if ("total_yel_card" == infos[i][0]) {
                yellow += infos[i][1][0];
            }
        }
    }
    record.data[0] = parseFloat((red / data.played).toFixed(2));
    record.data[1] = parseFloat((yellow / data.played).toFixed(2));
    record.data[2] = parseFloat((100 * (yellow + red) / fouls).toFixed(2));
    record.data[3] = parseFloat((fouls / data.played).toFixed(2));
    return record;
}

function LiveAggressionInfoModel(data) {
    var record = {
        data: [0, 0, 0, 0]
    };
    var fouls = 0,
        red = 0,
        yellow = 0;
    var value = data.value[0];
    if (0 != value.length) {
        var infos = value[value.length - 1][0];
        for (var i = 0; i < infos.length; i++) {
            if ("fk_foul_lost" == infos[i][0]) {
                fouls += infos[i][1][0];
            }
            if ("fk_foul_lost" == infos[i][2]) {
                fouls += infos[i][3][0];
            }
            if ("total_red_card" == infos[i][2]) {
                red += infos[i][3][0];
            }
            if ("total_red_card" == infos[i][0]) {
                red += infos[i][1][0];
            }
            if ("total_yel_card" == infos[i][0]) {
                yellow += infos[i][1][0];
            }
            if ("total_yel_card" == infos[i][2]) {
                yellow += infos[i][3][0];
            }
        }
    }
    record.data[0] = red;
    record.data[1] = yellow;
    record.data[2] = parseFloat((100 * (yellow + red) / fouls).toFixed(2));
    record.data[3] = fouls;
    return record;
}

function H2HGoalTypesInfoModel(data) {
    function getValue(value, resultFilter, typeFilter) {
        if (resultFilter == value[0]) {
            if (typeFilter) {
                if (0 != typeFilter.value.length) {
                    for (var k = 0; k < typeFilter.value.length; k++) {
                        if (typeFilter.value[k] == value[typeFilter.index]) {
                            return value[3][0];
                        }
                    }
                }
            } else {
                return value[3][0];
            }
        }
        return 0;
    }
    var records = {
        data: [0, 0, 0]
    };
    if (!data.value || 0 == data.value.length) {
        return records;
    }
    var values = data.value[0];
    var goals = 0,
        misses = 0,
        shots = 0;
    for (var i = 0; i < values.length; i++) {
        misses += getValue(values[i], "miss", data.contentFilter.clicked);
        goals += getValue(values[i], "goal", data.contentFilter.clicked);
    }
    shots = goals + misses;
    records.data[0] = parseFloat((shots / data.played).toFixed(2));
    records.data[1] = parseFloat((goals / data.played).toFixed(2));
    records.data[2] = 0 == shots ? 0 : parseInt(100 * goals / shots);
    return records;
}

function LiveGoalTypesInfoModel(data) {
    function getValue(value, resultFilter, typeFilter) {
        if (resultFilter == value[0]) {
            if (typeFilter) {
                if (0 != typeFilter.value.length) {
                    for (var k = 0; k < typeFilter.value.length; k++) {
                        if (typeFilter.value[k] == value[typeFilter.index]) {
                            return value[3][0];
                        }
                    }
                }
            } else {
                return value[3][0];
            }
        }
        return 0;
    }
    var records = {
        played: data.played,
        data: [0, 0, 0]
    };
    if (!data.value || 0 == data.value.length) {
        return records;
    }
    var values = data.value[2];
    var goals = 0,
        misses = 0,
        shots = 0;
    for (var i = 0; i < values.length; i++) {
        misses += getValue(values[i], "miss", data.contentFilter.clicked);
        goals += getValue(values[i], "goal", data.contentFilter.clicked);
    }
    shots = goals + misses;
    records.data[0] = shots;
    records.data[1] = goals;
    records.data[2] = 0 == shots ? 0 : parseInt(100 * goals / shots);
    return records;
}

function H2HPassTypesInfoModel(data) {
    function getValue(value, passTypeFilter) {
        if (passTypeFilter) {
            for (var i = 0; i < passTypeFilter.value.length; i++) {
                if (passTypeFilter.value[i] == value[passTypeFilter.index]) {
                    return value[2][0];
                }
            }
            return 0;
        }
        return value[2][0];
    }
    if (!data.value || 0 == data.value.length) {
        return {
            played: 0,
            data: [0, 0]
        };
    }
    var averagePassStreak = parseFloat(data.value[0].toFixed(2));
    var records = {
        data: [0, averagePassStreak]
    };
    data.value = data.value[1];
    var passes = 0;
    for (var i = 0; i < data.value.length; i++) {
        passes += getValue(data.value[i], data.contentFilter.clicked);
    }
    records.data[0] = parseInt(passes / data.played);
    return records;
}

function LivePassTypesInfoModel(data) {
    function getValue(value, passTypeFilter) {
        if (passTypeFilter) {
            for (var i = 0; i < passTypeFilter.value.length; i++) {
                if (passTypeFilter.value[i] == value[passTypeFilter.index]) {
                    return value[2][0];
                }
            }
            return 0;
        }
        return value[2][0];
    }
    if (!data.value || 0 == data.value.length) {
        return {
            played: 0,
            data: [0, 0]
        };
    }
    var averagePassStreak = parseFloat(data.value[2].toFixed(2));
    var records = {
        played: data.played,
        data: [0, averagePassStreak]
    };
    data.value = data.value[3];
    var passes = 0;
    for (var i = 0; i < data.value.length; i++) {
        passes += getValue(data.value[i], data.contentFilter.clicked);
    }
    records.data[0] = passes;
    return records;
}

function H2HPassTypesModel(data) {
    var records = [0, 0, 0, 0];
    if (!data.value || 0 == data.value.length) {
        return records;
    }
    data = data.value[1];
    for (var i = 0; i < data.length; i++) {
        PassTypesModel(records, data[i]);
    }
    return records;
}

function PassTypesModel(records, data) {
    if ("cross" == data[1]) {
        records[0] += data[2][0];
    }
    if ("throughball" == data[1]) {
        records[1] += data[2][0];
    }
    if ("longball" == data[1]) {
        records[2] += data[2][0];
    }
    if ("short" == data[1]) {
        records[3] += data[2][0];
    }
}

function LivePassTypesModel(data) {
    var records = [0, 0, 0, 0];
    if (!data.value || 0 == data.value.length) {
        return records;
    }
    data = data.value[3];
    for (var i = 0; i < data.length; i++) {
        PassTypesModel(records, data[i]);
    }
    return records;
}

function H2HGoalTypesModel(data) {
    var records = [0, 0, 0, 0, 0];
    if (!data.value || 0 == data.value.length) {
        return records;
    }
    var values = data.value[0];
    data.contentFilter = {
        goal: {
            index: 0,
            value: "goal"
        }
    };
    for (var i = 0; i < values.length; i++) {
        GoalTypesModel(records, values[i], data.contentFilter);
    }
    return records;
}

function GoalTypesModel(records, data, contentFilter) {
    function getValue(value, filters) {
        if (filters && 0 != filters.length) {
            for (var filter in filters) {
                if (filters[filter].value == value[filters[filter].index]) {
                    return value[3][0];
                }
            }
            return 0;
        }
        return value[3][0];
    }
    if ("openplay" == data[1]) {
        records[0] += getValue(data, contentFilter);
    }
    if ("corner" == data[1] || "crossedfreekick" == data[1] || "throwin" == data[1] || "directfreekick" == data[1]) {
        records[1] += getValue(data, contentFilter);
    }
    if ("fastbreak" == data[1]) {
        records[2] += getValue(data, contentFilter);
    }
    if ("penalty" == data[1]) {
        records[3] += getValue(data, contentFilter);
    }
    if ("owngoal" == data[1]) {
        records[4] += getValue(data, contentFilter);
    }
}

function LiveGoalTypesModel(data) {
    var records = [0, 0, 0, 0, 0];
    if (!data.value || 0 == data.value.length) {
        return records;
    }
    var values = data.value[2];
    for (var i = 0; i < values.length; i++) {
        GoalTypesModel(records, values[i], data.contentFilter);
    }
    return records;
}

function H2HPhysicalModel(data) {
    function getValue(value, index, filters) {
        if (filters && 0 != filters.length) {
            for (var filter in filters) {
                if (filters[filter].value == value[filters[filter].index] || "all" == filters[filter].value) {
                    return value[index];
                }
            }
            return 0;
        }
        return value[index];
    }
    var records = [0, 0];
    var values = data.value[0];
    var height = 0,
        weight = 0,
        count = 0;
    for (var i = 0; i < values.length; i++) {
        var h = getValue(values[i], 2, data.contentFilter);
        var w = getValue(values[i], 3, data.contentFilter);
        if (0 != h && 0 != w) {
            height += h;
            weight += w;
            count++;
        }
    }
    if (0 != count) {
        records[0] = parseInt(height / count);
        records[1] = parseInt(weight / count);
    }
    return records;
}

function LivePhysicalModel(data) {
    function getValue(value, index, filters) {
        if (filters) {
            for (var filter in filters) {
                if (filter && filters[filter].value == value[filters[filter].index] || "all" == filters[filter].value) {
                    return value[index];
                }
            }
            return 0;
        }
        return value[index];
    }
    var records = [0, 0];
    var values = data.value[0][0][0];
    var height = 0,
        weight = 0,
        count = 0;
    for (var i = 0; i < values.length; i++) {
        var h = getValue(values[i], 1, data.contentFilter);
        var w = getValue(values[i], 2, data.contentFilter);
        if (0 != h && 0 != w) {
            height += h;
            weight += w;
            count++;
        }
    }
    records[0] = parseInt(height / count);
    records[1] = parseInt(weight / count);
    return records;
}

function H2HPhysicalInfoModel(data) {
    function getValue(value, filters) {
        if (filters && 0 != filters.length) {
            for (var filter in filters) {
                if (filters[filter].value == value[filters[filter].index] || "all" == filters[filter].value) {
                    return value[4];
                }
            }
            return 0;
        }
        return value[4];
    }
    var records = {
        played: data.played,
        data: [0, 0]
    };
    var values = data.value[0];
    var aerialLost = 0,
        aerialWon = 0,
        duelWon = 0,
        duelLost = 0;
    for (var i = 0; i < values.length; i++) {
        if ("aerial_lost" == values[i][1]) {
            aerialLost += getValue(values[i], data.contentFilter);
        }
        if ("aerial_won" == values[i][1]) {
            aerialWon += getValue(values[i], data.contentFilter);
        }
        if ("duel_won" == values[i][1]) {
            duelWon += getValue(values[i], data.contentFilter);
        }
        if ("duel_lost" == values[i][1]) {
            duelLost += getValue(values[i], data.contentFilter);
        }
    }
    var groundWon = (duelWon - aerialWon);
    var groundLost = (duelLost - aerialLost);
    if (0 != (aerialWon + aerialLost)) {
        records.data[0] = parseInt(100 * aerialWon / (aerialWon + aerialLost));
    }
    if (0 != (groundWon + groundLost)) {
        records.data[1] = parseInt(100 * (groundWon) / (groundWon + groundLost));
    }
    return records;
}

function LivePhysicalInfoModel(data) {
    function getValue(value, filters) {
        if (filters && 0 != filters.length) {
            for (var filter in filters) {
                if (filters[filter].value == value[filters[filter].index] || "all" == filters[filter].value) {
                    return value[2];
                }
            }
            return 0;
        }
        return value[2];
    }
    var records = {
        played: data.played,
        data: [0, 0]
    };
    var values = data.value[0][1][0];
    var aerialLost = 0,
        aerialWon = 0,
        duelWon = 0,
        duelLost = 0;
    for (var i = 0; i < values.length; i++) {
        if ("aerial_lost" == values[i][1]) {
            aerialLost += getValue(values[i], data.contentFilter);
        }
        if ("aerial_won" == values[i][1]) {
            aerialWon += getValue(values[i], data.contentFilter);
        }
        if ("duel_won" == values[i][1]) {
            duelWon += getValue(values[i], data.contentFilter);
        }
        if ("duel_lost" == values[i][1]) {
            duelLost += getValue(values[i], data.contentFilter);
        }
    }
    var groundWon = (duelWon - aerialWon);
    var groundLost = (duelLost - aerialLost);
    records.data[0] = 0 != aerialWon + aerialLost ? parseInt(100 * aerialWon / (aerialWon + aerialLost)) : 0;
    records.data[1] = 0 != (groundWon + groundLost) ? parseInt(100 * (groundWon) / (groundWon + groundLost)) : 0;
    return records;
}
var LivePlayerStatsSummaryGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: LivePlayerStatsSummaryGridModel,
        cache: true
    },
    view: LivePlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "P",
            direction: "asc"
        }
    }
});
var LivePlayerStatsDefensiveGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: LivePlayerStatsDefensiveGridModel,
        cache: true
    },
    view: LivePlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "P",
            direction: "asc"
        }
    }
});
var LivePlayerStatsOffensiveGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: LivePlayerStatsOffensiveGridModel,
        cache: true
    },
    view: LivePlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "P",
            direction: "asc"
        }
    }
});
var LivePlayerStatsPassingGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: LivePlayerStatsPassingGridModel,
        cache: true
    },
    view: LivePlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "P",
            direction: "asc"
        }
    }
});
var H2HPlayerStatsSummaryGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsSummaryGridModel,
        cache: true
    },
    view: H2HPlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "Rating",
            direction: "desc"
        }
    }
});
var TeamPlayerStatsSummaryGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsSummaryGridModel,
        cache: true
    },
    view: TeamPlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "Rating",
            direction: "desc"
        }
    }
});
var StagePlayerStatsSummaryGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsSummaryGridModel,
        cache: true
    },
    view: StagePlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "Rating",
            direction: "desc"
        }
    }
});
var StagePlayerStatsDefensiveGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsDefensiveGridModel,
        cache: true
    },
    view: StagePlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "Rating",
            direction: "desc"
        }
    }
});
var StagePlayerStatsOffensiveGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsOffensiveGridModel,
        cache: true
    },
    view: StagePlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "Rating",
            direction: "desc"
        }
    }
});
var StagePlayerStatsPassingGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsPassingGridModel,
        cache: true
    },
    view: StagePlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "Rating",
            direction: "desc"
        }
    }
});
var H2HPlayerStatsDefensiveGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsDefensiveGridModel,
        cache: true
    },
    view: H2HPlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "TotalTackles",
            direction: "desc"
        }
    }
});
var TeamPlayerStatsDefensiveGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsDefensiveGridModel,
        cache: true
    },
    view: TeamPlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "TotalTackles",
            direction: "desc"
        }
    }
});
var H2HPlayerStatsOffensiveGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsOffensiveGridModel,
        cache: true
    },
    view: H2HPlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "Goals",
            direction: "desc"
        }
    }
});
var TeamPlayerStatsOffensiveGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsOffensiveGridModel,
        cache: true
    },
    view: TeamPlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "Goals",
            direction: "desc"
        }
    }
});
var H2HPlayerStatsPassingGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsPassingGridModel,
        cache: true
    },
    view: H2HPlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "Assists",
            direction: "desc"
        }
    }
});
var TeamPlayerStatsPassingGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsPassingGridModel,
        cache: true
    },
    view: TeamPlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "Assists",
            direction: "desc"
        }
    }
});

function getStatValue(stats, type) {
    if (!stats) {
        return 0;
    }
    for (var k = 0; k < stats.length; k++) {
        if (type == stats[k][0]) {
            return stats[k][1][0];
        }
    }
    return 0;
}

function getAsFloat(value, total, precision) {
    precision = precision || 1;
    if (0 == total) {
        return 0;
    }
    return NG.roundNumber((value / total), precision);
}

function getRealPosition(position) {
    if (!position) {
        return "-";
    }
    var startsWith = position.toString().charAt();
    var orderKeys = {
        "g": "A",
        "d": "B",
        "m": "C",
        "a": "D",
        "f": "E",
        "s": "E",
        "k": "A"
    };
    return orderKeys[startsWith.toLowerCase()] + position;
}

function loadLivePlayerStatisticsEvents(stats, o) {
    if (!o.events) {
        o.events = {};
    }
    o.events.G = {
        v: getStatValue(stats, "goals") - getStatValue(stats, "att_pen_goal"),
        d: "goal"
    };
    o.events.A = {
        v: getStatValue(stats, "goal_assist"),
        d: "assist"
    };
    o.events.SY = {
        v: getStatValue(stats, "second_yellow"),
        d: "secondyellow"
    };
    if (0 == o.events.SY.v) {
        o.events.Y = {
            v: getStatValue(stats, "yellow_card"),
            d: "yellow"
        };
        o.events.R = {
            v: getStatValue(stats, "red_card"),
            d: "red"
        };
    }
    o.events.PO = {
        v: getStatValue(stats, "post_scoring_att"),
        d: "shotonpost"
    };
    o.events.COL = {
        v: getStatValue(stats, "clearance_off_line"),
        d: "clearance-off-line"
    };
    var penaltyMiss = getStatValue(stats, "att_pen_miss") + getStatValue(stats, "att_pen_post") + getStatValue(stats, "att_pen_target");
    o.events.PM = {
        v: penaltyMiss,
        d: "penalty-missed"
    };
    o.events.LMT = {
        v: getStatValue(stats, "last_man_tackle"),
        d: "last-man-tackle"
    };
    o.events.PG = {
        v: getStatValue(stats, "att_pen_goal"),
        d: "penalty-goal"
    };
    o.events.PS = {
        v: getStatValue(stats, "penalty_save"),
        d: "penalty-save"
    };
    o.events.ELG = {
        v: getStatValue(stats, "error_lead_to_goal"),
        d: "error-lead-to-goal"
    };
    o.events.LMD = {
        v: getStatValue(stats, "last_man_contest"),
        d: "last-man-dribble"
    };
    o.events.PC = {
        v: getStatValue(stats, "penalty_conceded"),
        d: "penalty-conceded"
    };
    o.events.OG = {
        v: getStatValue(stats, "own_goals"),
        d: "owngoal"
    };
}

function loadLivePlayerStatisticsEventsSummary(stats, o) {
    if (!o.events) {
        o.events = {};
    }
    o.events.G = {
        v: getStatValue(stats, "goals"),
        d: "goal"
    };
    o.events.SY = {
        v: getStatValue(stats, "second_yellow"),
        d: "secondyellow"
    };
    if (0 == o.events.SY.v) {
        o.events.Y = {
            v: getStatValue(stats, "yellow_card"),
            d: "yellow"
        };
        o.events.R = {
            v: getStatValue(stats, "red_card"),
            d: "red"
        };
    }
}
var positionOrders = {
    "GK": 1,
    "DR": 2,
    "DC": 3,
    "DL": 4,
    "DMR": 5,
    "DMC": 6,
    "DML": 7,
    "MR": 8,
    "MC": 9,
    "ML": 10,
    "AMR": 11,
    "AMC": 12,
    "AML": 13,
    "FWR": 14,
    "FW": 15,
    "FWL": 16,
    "Sub": 17
};

function getPosition(formationPlace, position, rating) {
    var order = positionOrders[position];
    order = order < 10 ? "0" + order : order;
    return order + "-" + position;
    formationPlace = (0 == formationPlace) ? ((rating == 0) ? 13 : 12) : formationPlace;
    return ((formationPlace < 10) ? "0" + formationPlace : formationPlace) + "-" + position;
}

function getSubOnOff(stats, matchDuration) {
    var subOn = getStatValue(stats, "total_sub_on");
    var subOff = getStatValue(stats, "total_sub_off");
    var minsPlayed = getStatValue(stats, "mins_played");
    if (0 == minsPlayed) {
        return;
    }
    if (0 != subOn && 0 != subOff) {
        return [{
            d: "subst-in",
            v: ""
        }, {
            d: "subst-out",
            v: ""
        }];
    }
    if (0 != subOn) {
        return [{
            d: "subst-in",
            v: (matchDuration - minsPlayed)
        }];
    }
    if (0 != subOff) {
        return [{
            d: "subst-out",
            v: minsPlayed
        }];
    }
}

function getMatchDuration(players) {
    var duration = 0;
    for (var i = 0; i < players.length; i++) {
        var stats = players[i][3][0];
        var minsPlayed = getStatValue(stats, "mins_played");
        if (duration < minsPlayed) {
            duration = minsPlayed;
        }
    }
    return duration;
}

function LivePlayerStatsSummaryGridModel() {
    this.load = function(data) {
        var records = [];
        var values = data[4];
        for (var i = 0; i < values.length; i++) {
            var o = {
                events: {}
            };
            var stats = values[i][3][0];
            var matchDuration = getMatchDuration(values);
            o.Id = values[i][0];
            o.PN = values[i][1];
            o.SubOnOff = getSubOnOff(stats, matchDuration);
            setIsManOfTheMatch(stats, o);
            o.P = getPosition(getStatValue(stats, "formation_place"), values[i][5], values[i][2]);
            o.S = getStatValue(stats, "total_scoring_att");
            o.SOT = getStatValue(stats, "ontarget_scoring_att");
            o.KP = getStatValue(stats, "total_att_assist");
            var totalPass = getStatValue(stats, "total_pass");
            var accuratePass = getStatValue(stats, "accurate_pass");
            o.PA = getPercentage(accuratePass, totalPass);
            var duelWon = getStatValue(stats, "duel_won");
            var duelLost = getStatValue(stats, "duel_lost");
            var aerialWon = getStatValue(stats, "aerial_won");
            o.AD = aerialWon;
            o.TCH = getStatValue(stats, "touches");
            o.AR = values[i][2] ? values[i][2] : 0;
            loadLivePlayerStatisticsEvents(stats, o);
            records.push(o);
        }
        return records;
    };
}

function LivePlayerStatsDefensiveGridModel() {
    this.load = function(data) {
        var records = [];
        var values = data[4];
        for (var i = 0; i < values.length; i++) {
            var o = {
                events: {}
            };
            var stats = values[i][3][0];
            var matchDuration = getMatchDuration(values);
            o.Id = values[i][0];
            o.PN = values[i][1];
            o.SubOnOff = getSubOnOff(stats, matchDuration);
            setIsManOfTheMatch(stats, o);
            o.P = getPosition(getStatValue(stats, "formation_place"), values[i][5], values[i][2]);
            o.TAC = getStatValue(stats, "total_tackle");
            o.INTC = getStatValue(stats, "interception");
            o.TC = getStatValue(stats, "total_clearance");
            o.EC = getStatValue(stats, "effective_clearance");
            o.SB = getStatValue(stats, "outfielder_block");
            o.OW = getStatValue(stats, "offside_provoked");
            o.F = getStatValue(stats, "fouls");
            o.AR = values[i][2];
            loadLivePlayerStatisticsEvents(stats, o);
            records.push(o);
        }
        return records;
    };
}

function LivePlayerStatsOffensiveGridModel() {
    this.load = function(data) {
        var records = [];
        var values = data[4];
        for (var i = 0; i < values.length; i++) {
            var o = {
                events: {}
            };
            var stats = values[i][3][0];
            var matchDuration = getMatchDuration(values);
            o.Id = values[i][0];
            o.PN = values[i][1];
            o.SubOnOff = getSubOnOff(stats, matchDuration);
            setIsManOfTheMatch(stats, o);
            o.P = getPosition(getStatValue(stats, "formation_place"), values[i][5], values[i][2]);
            o.S = getStatValue(stats, "total_scoring_att");
            o.SOT = getStatValue(stats, "ontarget_scoring_att");
            o.KP = getStatValue(stats, "total_att_assist");
            o.SD = getStatValue(stats, "won_contest");
            o.WF = getStatValue(stats, "was_fouled");
            o.DS = getStatValue(stats, "dispossessed");
            o.T = getStatValue(stats, "turnover");
            o.OFF = getStatValue(stats, "total_offside");
            o.AR = values[i][2];
            loadLivePlayerStatisticsEvents(stats, o);
            records.push(o);
        }
        return records;
    };
}

function LivePlayerStatsPassingGridModel() {
    this.load = function(data) {
        var records = [];
        var values = data[4];
        for (var i = 0; i < values.length; i++) {
            var o = {
                events: {}
            };
            var stats = values[i][3][0];
            var matchDuration = getMatchDuration(values);
            o.Id = values[i][0];
            o.PN = values[i][1];
            o.SubOnOff = getSubOnOff(stats, matchDuration);
            setIsManOfTheMatch(stats, o);
            o.P = getPosition(getStatValue(stats, "formation_place"), values[i][5], values[i][2]);
            o.KP = getStatValue(stats, "total_att_assist");
            var totalPass = getStatValue(stats, "total_pass");
            var accuratePass = getStatValue(stats, "accurate_pass");
            o.TP = totalPass;
            o.PA = getPercentage(accuratePass, totalPass);
            o.TC = getStatValue(stats, "total_cross");
            o.CA = getStatValue(stats, "accurate_cross");
            o.TLB = getStatValue(stats, "total_long_balls");
            o.LBA = getStatValue(stats, "accurate_long_balls");
            o.TTB = getStatValue(stats, "total_through_ball");
            o.TBA = getStatValue(stats, "accurate_through_ball");
            o.AR = values[i][2];
            loadLivePlayerStatisticsEvents(stats, o);
            records.push(o);
        }
        return records;
    };
}

function LivePlayerStatsGridView(data) {
    var records = data.model.records;
    if (records) {
        var o, t = [];
        for (var i = 0, l = records.length; i < l; i++) {
            o = records[i];
            t.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + " " + ((0 == parseInt(o.AR)) ? "inactive" : "") + " " + (o.IsManOfTheMatch ? "man-of-the-match" : "") + '">');
            t.push('<td class="rank">' + (i + 1) + "</td>");
            for (var stat in o) {
                if ("events" != stat) {
                    if ("P" == stat) {
                        t.push('<td class="' + stat.toString().toLowerCase() + '">' + o[stat].substring(3, o[stat].length) + "</td>");
                    } else {
                        if ("RT" == stat) {
                            t.push('<td class="' + stat.toString().toLowerCase() + '">' + getRatingDisplayValue(o[stat]) + "</td>");
                        } else {
                            if ("PN" == stat) {
                                var subOnOff = o.SubOnOff;
                                t.push('<td class="' + stat.toString().toLowerCase() + '">');
                                t.push(WS.PlayerLink(o.Id, o[stat]));
                                if (subOnOff) {
                                    for (var k = 0; k < subOnOff.length; k++) {
                                        t.push('<span style="color: #999; font-weight: normal;" class="iconize iconize-icon-left"><span class="incidents-icon ui-icon ' + subOnOff[k].d + '"></span>' + subOnOff[k].v + "'</span>");
                                    }
                                }
                                if (o.IsManOfTheMatch) {
                                    t.push('<span class="iconize iconize-icon-right"><span class="incidents-icon ui-icon mom"></span></span>');
                                }
                                t.push("</td>");
                            } else {
                                if ("IsManOfTheMatch" == stat || "SubOnOff" == stat || "ShowRating" == stat || ("RT" == stat && !o.ShowRating)) {} else {
                                    if ("Id" != stat) {
                                        t.push('<td class="' + stat.toString().toLowerCase() + '">' + o[stat] + "</td>");
                                    }
                                }
                            }
                        }
                    }
                }
            }
            t.push('<td class="live-events">');
            for (var event in o.events) {
                for (var k = 0; k < o.events[event].v; k++) {
                    t.push('<span class="incident-wrapper"><span title="' + getIncidentToolTip(o.events[event].d) + '" class="incidents-icon ui-icon ' + o.events[event].d + '"></span></span>');
                }
            }
            t.push("</td>");
            t.push("</tr>");
        }
        return t.join("");
    }
    return "";
}

function TeamPlayerStatsSummaryGridModel() {
    this.load = function(data) {
        var records = [];
        var isOptaTeam = false;
        var values = data.value;
        if (!NG.isArray(values[0])) {
            $("#team-squad-stats").hide();
        }
        for (var i = 0; i < values.length; i++) {
            var o = {};
            o.PlayerName = values[i][0];
            o.RealPosition = getRealPosition(values[i][1]);
            o.RegionCode = values[i][2];
            o.Age = values[i][3];
            o.Height = values[i][4];
            o.Weight = values[i][5];
            o.FirstEleven = values[i][6];
            o.Id = values[i][7];
            o.Sub = values[i][8];
            o.AP = o.FirstEleven + o.Sub;
            o.IsCurrent = values[i][9];
            var stats = values[i][10];
            o.G = getStatValue(stats, "goals");
            o.Y = getStatValue(stats, "yellow_card");
            o.R = getStatValue(stats, "red_card");
            if (0 != o.AP) {
                var optaRating = getStatValue(stats, "rating");
                if (0 != optaRating) {
                    isOptaTeam = true;
                    o.A = getStatValue(stats, "goal_assist");
                    o.SPG = getAsFloat(getStatValue(stats, "total_scoring_att"), o.AP);
                    o.AR = getAsFloat(optaRating, o.AP, 2);
                    o.MOM = getStatValue(stats, "man_of_the_match");
                    var aerialWon = getStatValue(stats, "aerial_won");
                    var aerialLost = getStatValue(stats, "aerial_lost");
                    o.ADS = getPercentage(aerialWon, (aerialWon + aerialLost));
                    var totalPass = getStatValue(stats, "total_pass");
                    var accuratePass = getStatValue(stats, "accurate_pass");
                    o.PS = getPercentage(accuratePass, totalPass);
                }
            }
            o.IsOptaTeam = isOptaTeam;
            records.push(o);
        }
        if ("TeamPlayersTopListsPresenter" != data.caller) {
            $(document).triggerHandler("team-squad-stats-updated", [isOptaTeam]);
        }
        return records;
    };
}

function H2HPlayerStatsSummaryGridView(data) {
    var records = data.model.records;
    if (records) {
        var o, t = [];
        for (var i = 0, l = records.length; i < l; i++) {
            o = records[i];
            t.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + '">');
            t.push('<td class="rank">' + (i + 1) + "</td>");
            t.push('<td class="pn">' + o.PlayerName + "</td>");
            t.push('<td class="pos">' + getRealPositionShortName(o.RealPosition.substring(1, o.RealPosition.length)) + "</td>");
            t.push('<td class="ap">' + o.AP + "</td>");
            t.push('<td class="g">' + o.G + "</td>");
            t.push('<td class="a">' + o.A + "</td>");
            t.push('<td class="y">' + o.Y + "</td>");
            t.push('<td class="r">' + o.R + "</td>");
            t.push('<td class="spg">' + o.SPG + "</td>");
            t.push('<td class="ps">' + o.PS + "</td>");
            t.push('<td class="ads">' + o.ADS + "</td>");
            t.push('<td class="mom">' + o.MOM + "</td>");
            t.push('<td class="ar">' + getRatingDisplayValue(o.AR) + "</td>");
            t.push("</tr>");
        }
        return t.join("");
    }
    return "";
}
var realPositionShortNames = {
    "goalkeeper": "Gk",
    "defender": "Def",
    "midfielder": "Mid",
    "forward": "Fw",
    "keeper": "Gk"
};

function getRealPositionShortName(realPosition) {
    return realPositionShortNames[realPosition.toLowerCase()] ? realPositionShortNames[realPosition.toLowerCase()] : "-";
}

function TeamPlayerStatsSummaryGridView(data) {
    var records = data.model.records;
    if (records) {
        var o, t = [];
        for (var i = 0, l = records.length; i < l; i++) {
            o = records[i];
            t.push('<tr class="' + (o.IsCurrent == 0 ? " not-current-player " : "") + ((1 == i % 2) ? "alt" : "") + '">');
            t.push('<td class="rank">' + (i + 1) + "</td>");
            t.push('<td class="rgn"><span class="ui-icon country flg-' + o.RegionCode + '"></td>');
            t.push('<td class="pn">' + WS.PlayerLink(o.Id, o.PlayerName) + "</td>");
            t.push('<td class="pos">' + getRealPositionShortName(o.RealPosition.substring(1, o.RealPosition.length)) + "</td>");
            t.push('<td class="age">' + o.Age + "</td>");
            t.push('<td class="hg">' + o.Height + "</td>");
            t.push('<td class="wg">' + o.Weight + "</td>");
            if (o.IsOptaTeam) {
                t.push('<td class="ap">' + o.FirstEleven + (0 != o.Sub ? "(" + o.Sub + ")" : "") + "</td>");
                t.push('<td class="g">' + o.G + "</td>");
                t.push('<td class="a">' + o.A + "</td>");
                t.push('<td class="y">' + o.Y + "</td>");
                t.push('<td class="r">' + o.R + "</td>");
                t.push('<td class="spg">' + o.SPG + "</td>");
                t.push('<td class="ps">' + o.PS + "</td>");
                t.push('<td class="ads">' + o.ADS + "</td>");
                t.push('<td class="mom">' + o.MOM + "</td>");
                t.push('<td class="ar">' + getRatingDisplayValue(o.AR) + "</td>");
            } else {
                t.push('<td style="display: none;" class="ap"></td>');
                t.push('<td class="g">' + o.G + "</td>");
                t.push('<td class="y">' + o.Y + "</td>");
                t.push('<td class="r">' + o.R + "</td>");
            }
            t.push("</tr>");
        }
        return t.join("");
    }
    return "";
}

function TeamPlayerStatsDefensiveGridModel() {
    this.load = function(data) {
        var records = [];
        var isOptaTeam = false;
        var values = data.value;
        for (var i = 0; i < values.length; i++) {
            var o = {};
            o.PlayerName = values[i][0];
            o.RealPosition = getRealPosition(values[i][1]);
            o.RegionCode = values[i][2];
            o.Age = values[i][3];
            o.Height = values[i][4];
            o.Weight = values[i][5];
            o.FirstEleven = values[i][6];
            o.Id = values[i][7];
            o.Sub = values[i][8];
            o.AP = o.FirstEleven + o.Sub;
            o.IsCurrent = values[i][9];
            if (0 != o.AP) {
                var stats = values[i][10];
                var optaRating = getStatValue(stats, "rating");
                if (0 != optaRating) {
                    isOptaTeam = true;
                    o.AR = NG.getAverage(optaRating, o.AP, 2);
                    o.TPG = NG.getAverage(getStatValue(stats, "total_tackle"), o.AP, 1);
                    o.IPG = NG.getAverage(getStatValue(stats, "interception"), o.AP, 1);
                    o.CPG = NG.getAverage(getStatValue(stats, "total_clearance"), o.AP, 1);
                    o.BRPG = NG.getAverage(getStatValue(stats, "ball_recovery"), o.AP, 1);
                    o.BSPG = NG.getAverage(getStatValue(stats, "outfielder_block"), o.AP, 1);
                    o.OWPG = NG.getAverage(getStatValue(stats, "offside_provoked"), o.AP, 1);
                    o.DRB = NG.getAverage(getStatValue(stats, "challenge_lost"), o.AP, 1);
                    o.FPG = NG.getAverage(getStatValue(stats, "fouls"), o.AP, 1);
                    o.OG = getStatValue(stats, "own_goals");
                }
            }
            o.IsOptaTeam = isOptaTeam;
            records.push(o);
        }
        $(document).triggerHandler("team-squad-stats-updated", [isOptaTeam]);
        return records;
    };
}

function TeamPlayerStatsDefensiveGridView(data) {
    var records = data.model.records;
    if (records) {
        var o, t = [];
        for (var i = 0, l = records.length; i < l; i++) {
            o = records[i];
            t.push('<tr class="' + (o.IsCurrent == 0 ? " not-current-player " : "") + ((1 == i % 2) ? "alt" : "") + '">');
            t.push('<td class="rank">' + (i + 1) + "</td>");
            t.push('<td class="rgn"><span class="country flg-' + o.RegionCode + ' iconize iconize-icon-left"></td>');
            t.push('<td class="pn">' + WS.PlayerLink(o.Id, o.PlayerName) + "</td>");
            t.push('<td class="pos">' + getRealPositionShortName(o.RealPosition.substring(1, o.RealPosition.length)) + "</td>");
            t.push('<td class="ap">' + o.FirstEleven + (0 != o.Sub ? "(" + o.Sub + ")" : "") + "</td>");
            t.push('<td class="tpg">' + o.TPG + "</td>");
            t.push('<td class="ipg">' + o.IPG + "</td>");
            t.push('<td class="fpg">' + o.FPG + "</td>");
            t.push('<td class="owpg">' + o.OWPG + "</td>");
            t.push('<td class="cpg">' + o.CPG + "</td>");
            t.push('<td class="drb">' + o.DRB + "</td>");
            t.push('<td class="bspg">' + o.BSPG + "</td>");
            t.push('<td class="og">' + o.OG + "</td>");
            t.push('<td class="ar">' + getRatingDisplayValue(o.AR) + "</td>");
            t.push("</tr>");
        }
        return t.join("");
    }
    return "";
}

function TeamPlayerStatsOffensiveGridModel() {
    this.load = function(data) {
        var records = [];
        var isOptaTeam = false;
        var values = data.value;
        for (var i = 0; i < values.length; i++) {
            var o = {};
            o.PlayerName = values[i][0];
            o.RealPosition = getRealPosition(values[i][1]);
            o.RegionCode = values[i][2];
            o.Age = values[i][3];
            o.Height = values[i][4];
            o.Weight = values[i][5];
            o.FirstEleven = values[i][6];
            o.Id = values[i][7];
            o.Sub = values[i][8];
            o.AP = o.FirstEleven + o.Sub;
            o.IsCurrent = values[i][9];
            if (0 != o.AP) {
                var stats = values[i][10];
                var optaRating = getStatValue(stats, "rating");
                if (optaRating) {
                    isOptaTeam = true;
                    o.AR = NG.getAverage(optaRating, o.AP, 2);
                    o.G = getStatValue(stats, "goals");
                    o.A = getStatValue(stats, "goal_assist");
                    o.SPG = NG.getAverage(getStatValue(stats, "total_scoring_att"), o.AP, 1);
                    o.KPPG = NG.getAverage(getStatValue(stats, "total_att_assist"), o.AP, 1);
                    o.SDPG = NG.getAverage(getStatValue(stats, "won_contest"), o.AP, 1);
                    o.WFPG = NG.getAverage(getStatValue(stats, "was_fouled"), o.AP, 1);
                    o.OGPG = NG.getAverage(getStatValue(stats, "total_offside"), o.AP, 1);
                    o.DPG = NG.getAverage(getStatValue(stats, "dispossessed"), o.AP, 1);
                    o.TPG = NG.getAverage(getStatValue(stats, "turnover"), o.AP);
                }
            }
            o.IsOptaTeam = isOptaTeam;
            records.push(o);
        }
        $(document).triggerHandler("team-squad-stats-updated", [isOptaTeam]);
        return records;
    };
}

function TeamPlayerStatsOffensiveGridView(data) {
    var records = data.model.records;
    if (records) {
        var o, t = [];
        for (var i = 0, l = records.length; i < l; i++) {
            o = records[i];
            t.push('<tr class="' + (o.IsCurrent == 0 ? " not-current-player " : "") + ((1 == i % 2) ? "alt" : "") + '">');
            t.push('<td class="rank">' + (i + 1) + "</td>");
            t.push('<td class="rgn"><span class="country flg-' + o.RegionCode + ' iconize iconize-icon-left"></td>');
            t.push('<td class="pn">' + WS.PlayerLink(o.Id, o.PlayerName) + "</td>");
            t.push('<td class="pos">' + getRealPositionShortName(o.RealPosition.substring(1, o.RealPosition.length)) + "</td>");
            t.push('<td class="ap">' + o.FirstEleven + (0 != o.Sub ? "(" + o.Sub + ")" : "") + "</td>");
            t.push('<td class="g">' + o.G + "</td>");
            t.push('<td class="a">' + o.A + "</td>");
            t.push('<td class="spg">' + o.SPG + "</td>");
            t.push('<td class="kppg">' + o.KPPG + "</td>");
            t.push('<td class="sdpg">' + o.SDPG + "</td>");
            t.push('<td class="wfpg">' + o.WFPG + "</td>");
            t.push('<td class="ogpg">' + o.OGPG + "</td>");
            t.push('<td class="dpg">' + o.DPG + "</td>");
            t.push('<td class="tpg">' + o.TPG + "</td>");
            t.push('<td class="ar">' + getRatingDisplayValue(o.AR) + "</td>");
            t.push("</tr>");
        }
        return t.join("");
    }
    return "";
}

function TournamentFormationPresenter(config) {
    var id, $view;
    init(config);

    function init(config) {
        id = config.view.renderTo;
        $view = $("#" + id);
    }
    this.id = function() {
        return id;
    };
    this.load = function(data) {
        var tournamentFormation = TournamentFormationModel(data);
        if (tournamentFormation) {
            var formation = data.params.formation;
            clearView();
            renderDates(tournamentFormation.dates);
            render(tournamentFormation.players, formation);
        } else {
            $("#tournament-formation-filter-type dd:has(a[data-source=" + data.filter.data.type + "])").remove();
            $("#tournament-formation-filter-type a:first").click();
        }
    };

    function clearView() {
        $("#tournament-formation-dates-header").remove();
    }

    function renderDates(dates) {
        var html = [];
        html.push('<div id="tournament-formation-dates-header">');
        if (1 == dates.length) {
            html.push(dates[0]);
        } else {
            if (dates[0] == dates[1]) {
                html.push(dates[0]);
            } else {
                html.push(dates[0] + " / " + dates[1]);
            }
        }
        html.push("</div>");
        $view.before(html.join(""));
    }

    function render(players, formation) {
        var html = [],
            pitchDimensions = getPitchDimensions();
        var formationPitchView = new FormationPitchView({
            pitchDimensions: pitchDimensions,
            formationCoordinates: formation[1],
            showTeam: true
        });
        $view.html(formationPitchView.getHtml(players));
    }

    function getPitchDimensions() {
        if (!$view) {
            return;
        }
        return {
            width: $view.width(),
            height: 400
        };
    }
}

function TournamentFormationModel(data) {
    var players = data.value[0];
    var dates = data.value[1];
    if (!players || !dates) {
        return;
    }
    if (0 == players.length || 0 == dates.length) {
        return;
    }
    var records = {
        players: {},
        dates: []
    };
    for (var i = 0; i < players.length; i++) {
        records.players[i + 1] = {
            TeamId: players[i][0],
            TeamName: players[i][1],
            Id: players[i][2],
            Name: players[i][3],
            PositionText: players[i][4],
            Position: i + 1,
            Apps: players[i][5],
            Rating: players[i][6]
        };
    }
    records.dates = dates;
    return records;
}

function TeamFormationPresenter(config) {
    var id, $view, $filters, lastStatType;
    init(config);

    function init(config) {
        id = config.view.renderTo;
        $view = $("#" + id);
        $filters = $("#" + "team-formations-filter");
    }
    this.id = function() {
        return id;
    };
    this.load = function(data) {
        var formationsCoordinates = data.params.formations;
        var formationFilter = data.filter.content.formation;
        var statType = data.filter.data.type;
        var showAllPlayers = data.filter.both.type == "all";
        var selectedFormation;
        clearPitch(statType);
        if (!showAllPlayers) {
            prepareViewForFormations();
            if ("32" == statType) {
                selectedFormation = prepareBestEleven(data);
            } else {
                var records = prepareData(data);
                var selectedFormation = getFormationByFilter(records, formationFilter);
                if ("16" == statType) {
                    renderFormations(records, statType, formationFilter);
                }
                renderSelectedFormationInfo(selectedFormation);
                $(document).triggerHandler("fix-zeros", [$("#team-formation-stats td")]);
            }
            selectedFormation.Players = pickBestElevenPlayers(selectedFormation.Players);
            var selectedFormationCoordinates = getSelectedFormationCoordinates(formationsCoordinates, selectedFormation.Name);
            renderPlayers(selectedFormation.Players, selectedFormationCoordinates);
        } else {
            prepareViewForAllPlayers();
            var records = prepareData(data);
            var players = {};
            for (var i = 0; i < records.length; i++) {
                var formation = records[i];
                var selectedFormationCoordinates = getSelectedFormationCoordinates(formationsCoordinates, formation.Name);
                for (var k = 0; k < formation.Players.length; k++) {
                    var player = formation.Players[k];
                    var playerCoordinates = selectedFormationCoordinates[player.Position - 1];
                    if (!players[player.PositionText]) {
                        players[player.PositionText] = {
                            Coordinates: {
                                minVertical: playerCoordinates[0],
                                maxVertical: playerCoordinates[0],
                                minHorizontal: playerCoordinates[1],
                                maxHorizontal: playerCoordinates[1]
                            },
                            Players: [],
                            DisplayPosition: player.PositionText
                        };
                    }
                    if (!playerPushedForPosition(players[player.PositionText].Players, player)) {
                        players[player.PositionText].Players.push(player);
                    } else {
                        var index = playerIndexInPosition(players[player.PositionText].Players, player);
                        var positionPlayer = players[player.PositionText].Players[index];
                        positionPlayer.Rating = (((positionPlayer.Rating * positionPlayer.Apps) + (player.Rating * player.Apps)) / (positionPlayer.Apps + player.Apps));
                        positionPlayer.Apps += player.Apps;
                        players[player.PositionText].Players[index] = positionPlayer;
                    }
                }
            }
            renderAllPlayers(players);
        }
        lastStatType = statType;
    };

    function prepareViewForAllPlayers() {
        $view.removeClass("pitch").addClass("all-players");
    }

    function prepareViewForFormations() {
        $view.removeClass("all-players").addClass("pitch");
    }

    function playerPushedForPosition(players, player) {
        for (var i = 0; i < players.length; i++) {
            if (players[i].Id == player.Id) {
                return true;
            }
        }
        return false;
    }

    function playerIndexInPosition(players, player) {
        for (var i = 0; i < players.length; i++) {
            if (players[i].Id == player.Id) {
                return i;
            }
        }
    }

    function clearPitch(statType) {
        $(".team-pitch-formation", $view).remove();
        $("#team-formations-filter-formation").remove();
        $("#team-formation-stats").remove();
        $("#team-formations .match-name").remove();
        $view.height(400);
    }

    function renderSelectedFormationInfo(selectedFormation) {
        var formationInfoHtml = [];
        if (selectedFormation.MatchName) {
            formationInfoHtml.push('<div class="match-name">' + selectedFormation.MatchName + "</div>");
        }
        formationInfoHtml.push('<table id="team-formation-stats" class="grid with-centered-columns"');
        formationInfoHtml.push("<thead>");
        formationInfoHtml.push("<tr>");
        formationInfoHtml.push("<th>Formation</th>");
        formationInfoHtml.push("<th>Rating</th>");
        formationInfoHtml.push("<th>Apps</th>");
        formationInfoHtml.push("<th>Scored</th>");
        formationInfoHtml.push("<th>Conceded</th>");
        formationInfoHtml.push('<th class="form"><span class=" box w">w</span></th>');
        formationInfoHtml.push('<th class="form"><span class=" box d">d</span></th>');
        formationInfoHtml.push('<th class="form"><span class=" box l">l</span></th>');
        formationInfoHtml.push("</tr>");
        formationInfoHtml.push("</thead>");
        formationInfoHtml.push("<tbody>");
        formationInfoHtml.push("<td>" + selectedFormation.Name + "</td>");
        formationInfoHtml.push("<td>" + selectedFormation.Rating + "</td>");
        formationInfoHtml.push("<td>" + selectedFormation.Occurence + "</td>");
        formationInfoHtml.push("<td>" + selectedFormation.Scored + "</td>");
        formationInfoHtml.push("<td>" + selectedFormation.Conceded + "</td>");
        formationInfoHtml.push("<td>" + selectedFormation.Win + "</td>");
        formationInfoHtml.push("<td>" + selectedFormation.Draw + "</td>");
        formationInfoHtml.push("<td>" + selectedFormation.Lose + "</td>");
        formationInfoHtml.push("</tbody>");
        formationInfoHtml.push("</table>");
        return $view.before(formationInfoHtml.join(""));
    }

    function getSelectedFormationCoordinates(formations, selectedFormationName) {
        for (var i = 0; i < formations.length; i++) {
            if (formations[i][0] == selectedFormationName) {
                return formations[i][1];
            }
        }
    }

    function getPitchDimensions() {
        if (!$view) {
            return;
        }
        return {
            width: $view.width(),
            height: 400
        };
    }
    var positionCoordinates = {
        GoalKeeper: {
            "GK": {
                width: 5,
                colspan: 3
            }
        },
        Defensive: {
            "DR": {
                width: 3
            },
            "DC": {
                width: 5
            },
            "DL": {
                width: 3
            }
        },
        DefensiveMidfield: {
            "DMR": {
                width: 3
            },
            "DMC": {
                width: 5
            },
            "DML": {
                width: 3
            }
        },
        Midfield: {
            "MR": {
                width: 3
            },
            "MC": {
                width: 5
            },
            "ML": {
                width: 3
            }
        },
        AttackingMidfield: {
            "AMR": {
                width: 3
            },
            "AMC": {
                width: 5
            },
            "AML": {
                width: 3
            }
        },
        Forward: {
            "FWR": {
                width: 3
            },
            "FW": {
                width: 5
            },
            "FWL": {
                width: 3
            }
        }
    };

    function getPositionCoordinates(position) {
        return positonCoordinates[position];
    }

    function renderAllPlayers(positions) {
        var pitchDimensions = getPitchDimensions();
        var formationGridView = new FormationGridView({
            pitchDimensions: pitchDimensions,
            positionCoordinates: positionCoordinates
        });
        $view.height("100%");
        $view.append(formationGridView.getHtml(positions));
        formationGridView.loadGrids();
    }

    function renderPlayers(players, formationCoordinates) {
        var html = [],
            pitchDimensions = getPitchDimensions();
        var formationPitchView = new FormationPitchView({
            pitchDimensions: pitchDimensions,
            formationCoordinates: formationCoordinates
        });
        $view.append(formationPitchView.getHtml(players));
    }

    function getFormationByFilter(records, formationName) {
        for (var i = 0; i < records.length; i++) {
            if (formationName == records[i].Name) {
                return records[i];
            }
        }
        return records[0];
    }

    function pickBestElevenPlayers(players) {
        var playersGroupedByPosition = groupPlayersByPosition(players);
        var pickedPlayers = {};
        for (var i = 0; i < 11; i++) {
            pickPlayerForPosition(pickedPlayers, playersGroupedByPosition, i + 1);
        }
        return pickedPlayers;
    }

    function pickPlayerForPosition(pickedPlayers, playersGroupedByPosition, position) {
        var player = pickTopPlayerForPosition(playersGroupedByPosition, position);
        if (!player) {
            return;
        }
        var playerAsPickedBeforePosition = getPlayerPositionIfAlreadyPicked(pickedPlayers, player);
        if (playerAsPickedBeforePosition) {
            var playerAsPickedBefore = pickedPlayers[playerAsPickedBeforePosition];
            var playerToPick = selectPlayerToPick(playersGroupedByPosition, player, playerAsPickedBefore);
            if (playerToPick.Position == player.Position) {
                removePlayerFromPosition(playersGroupedByPosition, playerAsPickedBefore.Position);
                pickPlayerForPosition(pickedPlayers, playersGroupedByPosition, playerAsPickedBefore.Position);
                pickedPlayers[playerToPick.Position] = playerToPick;
            } else {
                removePlayerFromPosition(playersGroupedByPosition, player.Position);
                pickPlayerForPosition(pickedPlayers, playersGroupedByPosition, player.Position);
            }
        } else {
            pickedPlayers[position] = player;
        }
    }

    function selectPlayerToPick(playersGroupedByPosition, player, playerAsPickedBefore) {
        var playersInPlayerPosition = playersGroupedByPosition[player.Position].length;
        var playersInPlayerAsPickedBeforePosition = playersGroupedByPosition[playerAsPickedBefore.Position].length;
        if (playersInPlayerPosition < 2) {
            return playerAsPickedBefore;
        }
        if (playersInPlayerAsPickedBeforePosition < 2) {
            return player;
        }
        return playerAsPickedBefore.Apps < player.Apps ? player : (player.Apps < playerAsPickedBefore.Apps ? playerAsPickedBefore : (player.Rating <= playerAsPickedBefore.Rating ? playerAsPickedBefore : player));
    }

    function pickTopPlayerForPosition(playersGroupedByPosition, positionToPick) {
        return playersGroupedByPosition[positionToPick][0];
    }

    function removePlayerFromPosition(playersGroupedByPosition, position, player) {
        playersGroupedByPosition[position].shift();
    }

    function getPlayerPositionIfAlreadyPicked(pickedPlayers, player) {
        for (var pickedPlayer in pickedPlayers) {
            if (pickedPlayers[pickedPlayer]) {
                if (pickedPlayers[pickedPlayer].Id == player.Id) {
                    return pickedPlayers[pickedPlayer].Position;
                }
            }
        }
    }

    function groupPlayersByPosition(players) {
        var positions = {};
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            if (!positions[player.Position]) {
                positions[player.Position] = [];
            }
            positions[player.Position].push(player);
        }
        return positions;
    }

    function renderFormations(formations, statType, selectedFormationName) {
        var formationsHtml = [];
        formationsHtml.push('<div class="grid-toolbar" id="team-formations-filter-formation">');
        formationsHtml.push('<dl class="listbox left">');
        formationsHtml.push("<dt>Formations:</dt>");
        var selectFirst = (lastStatType != statType);
        for (var i = 0; i < formations.length; i++) {
            formationsHtml.push("<dd>");
            if (selectFirst && i == 0) {
                formationsHtml.push('<a data-value="' + i + '" data-source="' + formations[i].Name + '" href="#" class="option selected' + '">' + formations[i].Name + " (" + formations[i].Occurence + ")</a>");
            } else {
                formationsHtml.push('<a data-value="' + i + '" data-source="' + formations[i].Name + '" href="#" class="option ' + (selectedFormationName == formations[i].Name ? "selected" : "") + '">' + formations[i].Name + " (" + formations[i].Occurence + ")</a>");
            }
            formationsHtml.push("</dd>");
        }
        formationsHtml.push("</dl>");
        formationsHtml.push("</div>");
        $filters.append(formationsHtml.join(""));
        $("#team-formations-filter").triggerHandler("refresh-filters", ["team-formations-filter-formation"]);
    }

    function getWDLOccurence(results, resultType) {
        for (var i = 0; i < results.length; i++) {
            if (resultType == results[i][0]) {
                return results[i][1];
            }
        }
        return 0;
    }

    function getPlayerFromData(playerData) {
        return {
            Id: playerData[0],
            Name: playerData[1],
            Position: playerData[2],
            Rating: playerData[3],
            ShirtNo: playerData[4] ? playerData[4] : "",
            PositionText: playerData[5],
            Apps: playerData[6]
        };
    }

    function prepareBestEleven(data) {
        var records = {
            Players: []
        };
        var formation = data.value[0];
        var players = data.value[1];
        records.Name = formation[0];
        for (var i = 0; i < players.length; i++) {
            records.Players.push(getPlayerFromData(players[i]));
        }
        return records;
    }

    function prepareData(data, contentFilters) {
        var records = [];
        var formations = data.value;
        for (var i = 0; i < formations.length; i++) {
            var formationData = formations[i];
            var formation = {
                Name: formationData[0],
                Rating: formationData[1],
                Occurence: formationData[2],
                Scored: formationData[3],
                Conceded: formationData[4],
                Draw: getWDLOccurence(formationData[5], 0),
                Win: getWDLOccurence(formationData[5], 1),
                Lose: getWDLOccurence(formationData[5], 2),
                MatchName: formationData[7] ? formationData[7][0] : null,
                Players: []
            };
            for (var j = 0; j < formationData[6].length; j++) {
                var playerData = formationData[6][j];
                formation.Players.push(getPlayerFromData(playerData));
            }
            records.push(formation);
        }
        return records;
    }
}

function FormationPitchView(config) {
    var formationCoordinates, pitchDimensions, showTeam;
    init(config);

    function init(config) {
        formationCoordinates = config.formationCoordinates;
        pitchDimensions = config.pitchDimensions;
        showTeam = config.showTeam;
    }
    this.getHtml = function(players) {
        var cellWidth = pitchDimensions.width / 11,
            cellHeight = pitchDimensions.height / 11;
        var viewDimensions = {
            cellWidth: cellWidth,
            cellHeight: cellHeight,
            pitchDimensions: pitchDimensions
        };
        var html = [];
        var html = [];
        html.push('<div class="team-pitch-formation">');
        for (var playerPosition in players) {
            var player = players[playerPosition];
            player.Coordinates = formationCoordinates[player.Position - 1];
            html.push(getPlayerHtml(player, viewDimensions));
        }
        html.push("</div>");
        return html.join("");
    };

    function getPlayerHtml(player, viewDimensions) {
        var playerHtml = [];
        var formationPosition = player.Coordinates;
        var vertical = formationPosition[0] * viewDimensions.cellHeight - 25;
        var horizontal = formationPosition[1] * viewDimensions.cellWidth - 5;
        playerHtml.push('<ul class="player-wrapper" title="' + player.Name + ": Rating: " + player.Rating + (player.Apps ? (" | Appearances: " + player.Apps) : "") + '"');
        playerHtml.push('style="top: ' + vertical + "px; left: " + horizontal + 'px;">');
        playerHtml.push("<li>");
        playerHtml.push('<span class="player' + (showTeam ? " as-team-member" : "") + '">');
        if (!showTeam) {
            playerHtml.push('<span class="shirt-no">' + player.ShirtNo + "</span>");
        } else {
            playerHtml.push(WS.TeamEmblemUrl(player.TeamId, player.TeamName));
        }
        playerHtml.push("</span>");
        playerHtml.push("</li>");
        if (player.TeamId) {
            playerHtml.push('<li><a href="/Teams/{0}" class="team-link">{1}</a></li>'.format(player.TeamId, player.TeamName));
        }
        playerHtml.push("<li>");
        playerHtml.push(WS.PlayerLink(player.Id, getShortDisplayName(player.Name, true), "player-name"));
        playerHtml.push("</li>");
        playerHtml.push('<li class="player-stats"><span class="player-rating rc">' + getRatingDisplayValue(player.Rating, 1) + "</span>");
        playerHtml.push("</li>");
        playerHtml.push("</ul>");
        return playerHtml.join("");
    }
}

function FormationGridView(config) {
    var pitchDimensions, positionCoordinates, gridFunctions;
    init(config);

    function init(config) {
        pitchDimensions = config.pitchDimensions;
        positionCoordinates = config.positionCoordinates;
        gridFunctions = [];
    }
    this.getHtml = function(positions) {
        var cellWidth = pitchDimensions.width / 11,
            cellHeight = pitchDimensions.height / 11;
        var html = [];
        html.push('<table class="team-pitch-formation with-three-cols">');
        html.push("<tbody>");
        for (var f in positionCoordinates) {
            var formationLine = positionCoordinates[f];
            html.push("<tr>");
            for (var p in formationLine) {
                var position = formationLine[p];
                var positionWithPlayers = positions[p];
                var id = "team-formation-position-" + p;
                html.push('<td class="col" ' + (position.colspan ? (' colspan= "' + position.colspan) + '"' : "") + ">");
                html.push('<table id="' + id + '" class="team-formations-position grid" ' + (position.colspan ? (' style="width: ' + (position.width * cellWidth) + 'px; "') : "") + ">");
                html.push('<thead class="team-formations-position-header">');
                html.push("<tr>");
                html.push('<th class="formation-name">' + p + "</th>");
                html.push('<th class="sortable" data-property="Apps">Apps</th>');
                html.push('<th class="sortable" data-property="Rating">Rating</th>');
                html.push("</tr>");
                html.push("</thead>");
                html.push('<tbody class="team-formations-position-players">');
                if (!positionWithPlayers) {
                    html.push("<tr>");
                    html.push('<td colspan=3 style="font-size: 0.8em; color: #666;">N/A</td>');
                    html.push("</tr>");
                }
                html.push("</tbody>");
                html.push("</table>");
                html.push("</td>");
                if (positionWithPlayers) {
                    gridFunctions.push({
                        id: id,
                        players: positionWithPlayers.Players,
                        func: function(id, players) {
                            $("#" + id + "").grid($.extend(true, {
                                model: {
                                    type: AllPlayersModel,
                                    cache: true
                                },
                                view: TeamFormationsAllPlayersView,
                                sorter: {
                                    sortInfo: {
                                        property: "Apps",
                                        direction: "desc"
                                    }
                                }
                            }));
                            var positionGrid = $("#" + id).data("grid");
                            positionGrid.load(players);
                        }
                    });
                }
            }
            html.push("</tr>");
        }
        html.push("</tbody>");
        html.push("</table>");
        return html.join("");
    };
    this.loadGrids = function() {
        for (var i = 0; i < gridFunctions.length; i++) {
            gridFunctions[i].func(gridFunctions[i].id, gridFunctions[i].players);
        }
    };
}

function AllPlayersModel(players) {
    this.load = function(players) {
        return players;
    };
}

function TeamFormationsAllPlayersView(records) {
    var html = [];
    var players = records.model.records;
    var bestRatedPlayerId;
    var maxRating = 0;
    for (var i = 0; i < players.length; i++) {
        if (maxRating < players[i].Rating) {
            bestRatedPlayerId = players[i].Id;
            maxRating = players[i].Rating;
        }
    }
    for (var i = 0; i < players.length; i++) {
        var player = players[i];
        html.push('<tr class="team-formations-position-player ' + ((1 == i % 2) ? "alt" : "") + '">');
        html.push('<td style="text-align: left;">' + WS.PlayerLink(player.Id, getShortDisplayName(player.Name), null, player.Name) + "</td>");
        html.push('<td style="text-align: center;">' + player.Apps + "</td>");
        html.push('<td style="text-align: center; ' + (bestRatedPlayerId == player.Id ? " font-weight: bold; color: #8DC63F;" : "") + '">' + NG.roundNumber(player.Rating, 2) + "</td>");
        html.push("</tr>");
    }
    return html.join("");
}

function TournamentPlayersTopListPresenter(config) {
    var id, $view;
    init(config);

    function init(config) {
        id = config.view.renderTo;
        $view = $("#" + id);
    }
    this.id = function() {
        return id;
    };
    this.load = function(data) {
        var records = prepareData(data);
        render(records);
        $("#tournament-top-scorers").grid($.extend(true, {
            model: {
                type: AllPlayersModel,
                cache: true
            },
            view: TopScorersTableView,
            sorter: {
                sortInfo: {
                    property: "Index",
                    direction: "asc"
                }
            }
        }));
        var scorersGrid = $("#tournament-top-scorers").data("grid");
        scorersGrid.load(records.Goals);
    };

    function prepareData(data) {
        var records = {
            Goals: [],
            Cards: [],
            Shots: [],
            Assists: [],
            Ratings: []
        };
        var values = data.value;
        var goalsData = values[0];
        for (var i = 0; i < goalsData.length; i++) {
            var player = getPlayer(goalsData[i]);
            player.Goal = goalsData[i][4];
            player.TeamGoal = goalsData[i][5];
            player.Contribution = getPercentage(player.Goal, player.TeamGoal);
            player.Index = (i + 1);
            records.Goals.push(player);
        }
        var cardsData = values[1];
        for (var i = 0; i < cardsData.length; i++) {
            var player = getPlayer(cardsData[i]);
            player.Red = cardsData[i][4];
            player.Yellow = cardsData[i][5];
            records.Cards.push(player);
        }
        var shotsData = values[2];
        if (!shotsData) {
            return records;
        }
        for (var i = 0; i < shotsData.length; i++) {
            var player = getPlayer(shotsData[i]);
            player.Shots = shotsData[i][4];
            records.Shots.push(player);
        }
        var assistsData = values[3];
        if (!assistsData) {
            return records;
        }
        for (var i = 0; i < assistsData.length; i++) {
            var player = getPlayer(assistsData[i]);
            player.Assist = assistsData[i][4];
            records.Assists.push(player);
        }
        var ratingData = values[4];
        if (!ratingData) {
            return records;
        }
        for (var i = 0; i < ratingData.length; i++) {
            var player = getPlayer(ratingData[i]);
            player.FirstEleven = ratingData[i][4];
            player.Sub = ratingData[i][5];
            player.Apps = player.FirstEleven + player.Sub;
            player.Rating = ratingData[i][6];
            records.Ratings.push(player);
        }
        return records;
    }

    function getPlayer(playerData) {
        return {
            TeamId: playerData[0],
            TeamName: playerData[1],
            TeamShortName: getShortDisplayName(playerData[1]),
            PlayerId: playerData[2],
            PlayerName: playerData[3],
            PlayerShortName: getShortDisplayName(playerData[3])
        };
    }

    function render(records) {
        var html = [];
        html.push('<table id="tournament-top-scorers" class="grid with-centered-columns">');
        html.push("<thead>");
        html.push("<tr>");
        html.push('<th class="sortable o" data-property="Index">R</th>');
        html.push('<th class="pn">Player</th>');
        html.push('<th class="tn">Team</th>');
        html.push('<th class="sortable goal" data-property="Goal">Player Goals/Team Goals</th>');
        html.push('<th class="sortable con" data-property="Contribution">Contribution</th>');
        html.push("</tr>");
        html.push("</thead>");
        html.push("<tbody>");
        html.push("</tbody>");
        html.push("</table>");
        html.push('<table class="ws-list-grid with-two-cols">');
        html.push("<tr>");
        var listConfig = {
            view: {
                options: {
                    displayFunction: function(player) {
                        return '<span title="' + player.PlayerName + '" class="player-name">' + WS.PlayerLink(player.PlayerId, player.PlayerShortName) + "</span></td>" + '<td class="tn" title="' + player.TeamName + '"><a href="/Teams/' + player.TeamId + '" class="team-link">' + player.TeamShortName + "</a>";
                    }
                }
            }
        };
        var listWithBarsConfig = {
            type: WS.ListType.BarWithPercentage,
            view: {
                options: {
                    displayFunction: function(player) {
                        return '<span title="' + player.PlayerName + '" class="player-name">' + WS.PlayerLink(player.PlayerId, player.PlayerShortName) + "</span></td>" + '<td class="tn" title="' + player.TeamName + '"><a href="/Teams/' + player.TeamId + '" class="team-link">' + player.TeamShortName + "</a>";
                    },
                    columns: 2,
                    width: $view.width() * (2 / 3),
                    barClass: "value"
                }
            }
        };
        if (0 != records.Shots.length) {
            html.push('<td class="col">');
            html.push(new WS.List(jQuery.extend({}, listConfig, {
                titles: ["Aggression", "", "", ""],
                statTypes: ["Yellow", "Red"],
                statTypeClasses: ["yellow-card-box", "red-card-box"]
            })).getHtml(records.Cards));
            html.push("</td>");
            html.push('<td class="col">');
            html.push(new WS.List(jQuery.extend({}, listWithBarsConfig, {
                titles: ["Shots per game", "", ""],
                useValues: true,
                statTypes: ["Shots"]
            })).getHtml(records.Shots));
            html.push("</td>");
        }
        html.push("</tr>");
        html.push("<tr>");
        if (0 != records.Assists.length && 0 != records.Ratings.length) {
            html.push('<td class="col">');
            html.push(new WS.List(jQuery.extend({}, listWithBarsConfig, {
                titles: ["Assists", "", ""],
                useValues: true,
                statTypes: ["Assist"]
            })).getHtml(records.Assists));
            html.push("</td>");
            html.push('<td id="tournament-player-ratings" class="col">');
            html.push(new WS.List(jQuery.extend({}, listConfig, {
                titles: ["Performance", "", '<span title="Appearances">Apps</span>', '<span title="Average Rating">Rt</span>'],
                statTypes: ["Apps", "Rating"],
                statDisplayFunction: function(player) {
                    return '<span class="stat-value number apps-in-ratings">' + player.FirstEleven + (player.Sub ? ("(" + player.Sub + ")") : "") + '</span></td><td><span class="stat-value number rating">' + player.Rating.toFixed(2) + "</span>";
                },
                footer: {
                    text: "*Ordered by appearance weighted ratings",
                    clazz: "info"
                }
            })).getHtml(records.Ratings));
            html.push("</td>");
        }
        html.push("</tr>");
        html.push("</table>");
        $view.html(html.join(""));
    }
}

function TopScorersTableView(data) {
    var t = [];
    var scorers = data.model.records;
    var maxTeamGoal = 0;
    for (var i = 0; i < scorers.length; i++) {
        if (maxTeamGoal < scorers[i].TeamGoal) {
            maxTeamGoal = scorers[i].TeamGoal;
        }
    }
    for (var i = 0; i < scorers.length; i++) {
        var s = scorers[i];
        t.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + '">');
        t.push('<td class="o">' + s.Index + "</td>");
        t.push('<td title="' + s.PlayerName + '"class="pn">' + WS.PlayerLink(s.PlayerId, s.PlayerShortName) + "</td>");
        t.push('<td class="tn"><span class="tn" title="' + s.TeamName + '"><a href="/Teams/' + s.TeamId + '" class="team-link">' + s.TeamShortName + "</a></span></td>");
        t.push('<td class="value">');
        var teamWidth = (300 / 100) * getPercentage(s.TeamGoal, maxTeamGoal);
        var playerWidth = (300 / 100) * getPercentage(s.Goal, maxTeamGoal);
        t.push('<span class="stat-bar-wrapper" style="width: ' + teamWidth + 'px;">');
        t.push('<span class="stat-bar rc-r" style="width: ' + playerWidth + 'px;">');
        t.push('<span class="stat-value">' + s.Goal + "</span>");
        t.push("</span>");
        t.push('<span class="outer-value">' + s.TeamGoal + "</span>");
        t.push("</span>");
        t.push('<td class="con">' + s.Contribution + "%</td>");
        t.push("</tr>");
    }
    return t.join("");
}

function TournamentTeamsTopListPresenter(config) {
    var id, $view;
    init(config);

    function init(config) {
        id = config.view.renderTo;
        $view = $("#" + id);
    }
    this.id = function() {
        return id;
    };
    this.load = function(data) {
        var records = prepareData(data);
        render(records);
    };

    function prepareData(data) {
        var records = {
            Possession: [],
            Cards: [],
            DuelsWonPercentage: [],
            Shots: [],
            PassAccuracyPercentage: [],
            Ratings: []
        };
        var values = data.value;
        var possessionData = values[0];
        for (var i = 0; i < possessionData.length; i++) {
            var team = getTeam(possessionData[i]);
            team.Possession = possessionData[i][2];
            records.Possession.push(team);
        }
        var cardsData = values[1];
        for (var i = 0; i < cardsData.length; i++) {
            var team = getTeam(cardsData[i]);
            team.Red = cardsData[i][2];
            team.Yellow = cardsData[i][3];
            records.Cards.push(team);
        }
        var duelsData = values[2];
        if (!duelsData) {
            return records;
        }
        for (var i = 0; i < duelsData.length; i++) {
            var team = getTeam(duelsData[i]);
            team.DuelsWonPercentage = duelsData[i][2];
            records.DuelsWonPercentage.push(team);
        }
        var shotsData = values[3];
        if (!shotsData) {
            return records;
        }
        for (var i = 0; i < shotsData.length; i++) {
            var team = getTeam(shotsData[i]);
            team.Shots = shotsData[i][2];
            records.Shots.push(team);
        }
        var passData = values[4];
        if (!passData) {
            return records;
        }
        for (var i = 0; i < passData.length; i++) {
            var team = getTeam(passData[i]);
            team.PassAccuracyPercentage = passData[i][2];
            records.PassAccuracyPercentage.push(team);
        }
        var ratingData = values[5];
        if (!ratingData) {
            return records;
        }
        for (var i = 0; i < ratingData.length; i++) {
            var team = getTeam(ratingData[i]);
            team.Rating = ratingData[i][2].toFixed(2);
            records.Ratings.push(team);
        }
        return records;
    }

    function getTeam(teamData) {
        return {
            TeamId: teamData[0],
            TeamName: teamData[1],
            TeamShortName: getShortDisplayName(teamData[1])
        };
    }

    function render(records) {
        var html = [];
        html.push('<table class="ws-list-grid with-three-cols">');
        html.push("<tr>");
        html.push('<td class="col">');
        var possessionList = new WS.List({
            type: WS.ListType.BarWithPercentage,
            titles: ["Possession"],
            view: {
                options: {
                    displayFunction: function(team) {
                        return '<a title="' + team.TeamName + '" href="/Teams/' + team.TeamId + '" class="team-link">' + team.TeamName + "</a>";
                    },
                    width: $view.width()
                }
            },
            statTypes: ["Possession"]
        });
        html.push(possessionList.getHtml(records.Possession));
        html.push("</td>");
        html.push('<td class="col">');
        var cardsList = new WS.List({
            titles: ["Aggression", "", ""],
            view: {
                options: {
                    displayFunction: function(team) {
                        return '<a title="' + team.TeamName + '" href="/Teams/' + team.TeamId + '" class="team-link">' + team.TeamName + "</a>";
                    }
                }
            },
            statTypes: ["Yellow", "Red"],
            statTypeClasses: ["yellow-card-box", "red-card-box"]
        });
        html.push(cardsList.getHtml(records.Cards));
        html.push("</td>");
        html.push('<td class="col">');
        var duelsList = new WS.List({
            type: WS.ListType.BarWithPercentage,
            titles: ["Aerial Duels Won"],
            view: {
                options: {
                    displayFunction: function(team) {
                        return '<a title="' + team.TeamName + '" href="/Teams/' + team.TeamId + '" class="team-link">' + team.TeamName + "</a>";
                    },
                    width: $view.width()
                }
            },
            statTypes: ["DuelsWonPercentage"]
        });
        html.push(duelsList.getHtml(records.DuelsWonPercentage));
        html.push("</td>");
        html.push("</tr>");
        html.push("<tr>");
        html.push('<td class="col">');
        var shotsList = new WS.List({
            type: WS.ListType.BarWithPercentage,
            titles: ["Shots per Game"],
            view: {
                options: {
                    displayFunction: function(team) {
                        return '<a title="' + team.TeamName + '" href="/Teams/' + team.TeamId + '" class="team-link">' + team.TeamName + "</a>";
                    },
                    width: $view.width(),
                    barClass: "value"
                }
            },
            useValues: true,
            statTypes: ["Shots"]
        });
        html.push(shotsList.getHtml(records.Shots));
        html.push("</td>");
        html.push('<td class="col">');
        var passList = new WS.List({
            type: WS.ListType.BarWithPercentage,
            titles: ["Pass Accuracy"],
            view: {
                options: {
                    displayFunction: function(team) {
                        return '<a title="' + team.TeamName + '" href="/Teams/' + team.TeamId + '" class="team-link">' + team.TeamName + "</a>";
                    },
                    width: $view.width()
                }
            },
            statTypes: ["PassAccuracyPercentage"]
        });
        html.push(passList.getHtml(records.PassAccuracyPercentage));
        html.push("</td>");
        html.push('<td class="col">');
        var ratingsList = new WS.List({
            titles: ["Ratings"],
            view: {
                options: {
                    displayFunction: function(team) {
                        return '<a title="' + team.TeamName + '" href="/Teams/' + team.TeamId + '" class="team-link">' + team.TeamName + "</a>";
                    }
                }
            },
            statTypes: ["Rating"],
            statDisplayFunction: function(team) {
                return '<span class="stat-value number rating">' + getRatingDisplayValue(team.Rating) + "</span>";
            }
        });
        html.push(ratingsList.getHtml(records.Ratings));
        html.push("</td>");
        html.push("</tr>");
        html.push("</table>");
        $view.html(html.join(""));
    }
}
WS.List = function(config) {
    var id, $view, type, viewOptions, titles, statTypes, statTypeClasses, statDisplayFunction, footer, maxValues, useValues;
    init(config);

    function init(config) {
        id = config.view.renderTo;
        $view = $("#" + id);
        type = config.type;
        viewOptions = config.view.options;
        titles = config.titles;
        statTypes = config.statTypes;
        statTypeClasses = config.statTypeClasses;
        statDisplayFunction = config.statDisplayFunction;
        footer = config.footer;
        useValues = config.useValues;
        maxValues = {};
    }
    this.load = function(records) {
        render(records);
    };
    this.getHtml = function(records) {
        return view(records);
    };

    function emptyView() {
        if (viewOptions.errorFunction) {
            viewOptions.errorFunction();
            return;
        }
        return '<tr><td colspan="99" style="color: #666; font-size: 0.9em;">N/A</td></tr>';
    }

    function view(records) {
        if (!records) {
            return "";
        }
        var html = [];
        html.push('<table class="ws-list' + (type ? " list-type-" + type : "") + '">');
        html.push("<thead>");
        for (var i = 0; i < titles.length; i++) {
            html.push("<th " + (1 == titles.length ? 'colspan="99" ' : "") + 'class="' + (0 == i ? "stat-title" : "") + '">');
            html.push(titles[i]);
            html.push("</th>");
        }
        html.push("</thead>");
        html.push("<tbody>");
        if (0 == records.length) {
            html.push(emptyView());
        } else {
            for (var i = 0; i < records.length; i++) {
                html.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + '">');
                var listKey = viewOptions.displayFunction(records[i]);
                html.push('<td class="list-key">');
                html.push(listKey);
                html.push("</td>");
                if (statDisplayFunction) {
                    html.push("<td>");
                    html.push(statDisplayFunction(records[i]));
                    html.push("</td>");
                } else {
                    for (var k = 0; k < statTypes.length; k++) {
                        if (useValues && !maxValues[statTypes[k]]) {
                            maxValues[statTypes[k]] = getMaxOfField(records, statTypes[k]);
                        }
                        html.push("<td>");
                        html.push(getDisplayValue(records[i][statTypes[k]], k));
                        html.push("</td>");
                    }
                }
                html.push("</tr>");
            }
        }
        html.push("</tbody>");
        if (footer) {
            html.push("<tfoot>");
            html.push("<tr>");
            html.push('<td colspan="99" class="' + (footer.clazz ? footer.clazz : "") + '">');
            html.push(footer.text);
            html.push("</td>");
            html.push("</tr>");
            html.push("</tfoot>");
        }
        html.push("</table>");
        return html.join("");
    }

    function getDisplayValue(value, index) {
        if (WS.ListType.BarWithPercentage == type) {
            return getBarWithPercentageValue(value, index);
        }
        return '<span class="stat-value number ' + getStatTypeClass(index) + '">' + value + "</span>";
    }

    function getStatTypeClass(index) {
        if (!statTypeClasses) {
            return "";
        }
        return statTypeClasses[index];
    }

    function getBarWithPercentageValue(value, index) {
        var bar = [];
        var barWidth = (50 * (viewOptions.width / (viewOptions.columns ? viewOptions.columns : 3)) / 100) - 60;
        var valueWidth = value;
        if (useValues) {
            valueWidth = getPercentage(value, maxValues[statTypes[index]]);
        }
        bar.push('<span style="width: ' + barWidth + 'px;" class="stat-bar-wrapper' + (viewOptions.barClass ? " " + viewOptions.barClass + "" : "") + '">');
        bar.push('<span style="width: ' + valueWidth + '%;" class="stat-bar rc-r">');
        bar.push('<span class="stat-value">' + value + (!useValues ? "%" : "") + "</span>");
        bar.push("</span>");
        return bar.join("");
    }

    function render(records) {
        $view.html(view(records));
    }
};
WS.ListType = {
    Bar: 1,
    BarWithPercentage: 2,
    Value: 3,
    ValueWithPercentage: 4
};

function TeamPlayersTopListsPresenter(config) {
    var id, $view;
    init(config);
    this.load = function(data) {
        var records = prepareData(data);
        render(records, !data.params.isNotOpta);
    };
    this.id = function() {
        return id;
    };

    function selectTopListFromPlayers(players, criteria, topn, isValid) {
        isValid = isValid || function() {
            return true;
        };
        var sorted = [];
        players.sort(function(a, b) {
            return NG.sortNumeric(a[criteria], b[criteria]) * (-1);
        });
        var selectN = Math.min(topn, players.length);
        var added = 0,
            index = 0;
        while (added < selectN && index < players.length) {
            if (isValid(players[index].GameStarted + players[index].SubOn) && (0 != players[index][criteria])) {
                sorted.push(players[index]);
                added++;
            }
            index++;
        }
        return sorted;
    }

    function render(records, isOpta) {
        var html = [];
        html.push('<table class="ws-list-grid with-three-cols">');
        html.push("<tbody>");
        html.push("<tr>");
        var listConfig = {
            view: {
                options: {
                    displayFunction: function(player) {
                        return WS.PlayerLink(player.Id, getShortDisplayName(player.PlayerName));
                    },
                    errorFunction: function() {}
                }
            }
        };
        var listWithBarConfig = jQuery.extend(true, {}, listConfig, {
            type: WS.ListType.BarWithPercentage,
            view: {
                options: {
                    width: $view.width()
                }
            }
        });
        var listWithValueBarConfig = jQuery.extend(true, {}, listWithBarConfig, {
            view: {
                options: {
                    barClass: "value"
                }
            },
            useValues: true
        });
        html.push('<td class="col">');
        html.push(new WS.List(jQuery.extend({}, listWithValueBarConfig, {
            titles: ["Goals"],
            statTypes: ["Goals"]
        })).getHtml(records.Goals));
        html.push("</td>");
        if (0 != records.Cards.length) {
            html.push('<td class="col">');
            html.push(new WS.List(jQuery.extend({}, listConfig, {
                titles: ["Aggression", "", ""],
                statTypes: ["Yellow", "Red"],
                statTypeClasses: ["yellow-card-box", "red-card-box"]
            })).getHtml(records.Cards));
            html.push("</td>");
        }
        if (0 != records.Apps.length) {
            html.push('<td class="col">');
            html.push(new WS.List(jQuery.extend({}, listConfig, {
                titles: ["Appearance"],
                statTypes: ["Apps"],
                statDisplayFunction: function(player) {
                    return '<span class="stat-value number apps">' + player.GameStarted + (0 != player.SubOn ? "(" + player.SubOn + ")" : "") + "</span>";
                }
            })).getHtml(records.Apps));
            html.push("</td>");
        }
        html.push("</tr>");
        if (isOpta) {
            html.push("<tr>");
            html.push('<td class="col">');
            html.push(new WS.List(jQuery.extend({}, listWithValueBarConfig, {
                titles: ["Aerials won"],
                statTypes: ["AerialWon"]
            })).getHtml(records.Duels));
            html.push("</td>");
            html.push('<td class="col">');
            html.push(new WS.List(jQuery.extend({}, listWithValueBarConfig, {
                titles: ["Assists"],
                statTypes: ["Assists"]
            })).getHtml(records.Assists));
            html.push("</td>");
            html.push('<td class="col">');
            html.push(new WS.List(jQuery.extend({}, listWithBarConfig, {
                titles: ["Ratings"],
                statTypes: ["Rating"],
                statDisplayFunction: function(player) {
                    return '<span class="stat-value number rating">' + player.Rating + "</span>";
                }
            })).getHtml(records.Ratings));
            html.push("</td>");
            html.push("</tr>");
        }
        html.push("</tbody>");
        html.push("</table>");
        return $view.html(html.join(""));
    }

    function findMaxApps(players) {
        var max = 0;
        for (var k = 0; k < players.length; k++) {
            if (max < players[k].Apps) {
                max = players[k].Apps;
            }
        }
        return max;
    }

    function prepareData(data) {
        var topLists = {
            Apps: [],
            Cards: [],
            Goals: [],
            Duels: [],
            Assists: [],
            Ratings: []
        };
        var players = new PlayerStatsSummaryGridModel().load(data);
        var maxPlayerApp = findMaxApps(players);
        var thresholdFunc = function(app) {
            return maxPlayerApp / 5 <= app;
        };
        topLists.Goals = selectTopListFromPlayers(players, "Goals", 5, thresholdFunc);
        topLists.Apps = selectTopListFromPlayers(players, "GameStarted", 5, thresholdFunc);
        topLists.Assists = selectTopListFromPlayers(players, "Assists", 5, thresholdFunc);
        topLists.Ratings = selectTopListFromPlayers(players, "Rating", 5, thresholdFunc);
        for (var i = 0; i < players.length; i++) {
            players[i].CardPoints = players[i].Yellow * 1 + players[i].Red * 2.5;
            if ("AGoalkeeper" == players[i].RealPosition) {
                players[i].AerialWon = 0;
            }
        }
        topLists.Cards = selectTopListFromPlayers(players, "CardPoints", 5, thresholdFunc);
        topLists.Duels = selectTopListFromPlayers(players, "AerialWon", 5, thresholdFunc);
        return topLists;
    }

    function init(config) {
        id = config.view.renderTo;
        $view = $("#" + id);
        stageName = config.model.stageName;
    }
}
WS.Canvas = function(config) {
    var view, model, pitch, stats;
    init(config);

    function init(config) {
        view = config.view;
        type = config.model.type;
        if (view.is3D) {
            var pitchAndMatrix = nextgame.statistics.draw3DPitch(nextgame.getContextById(view.renderTo + " .pitch-canvas"), view.width, view.height);
            var statsCtx = nextgame.getContextById(view.renderTo + " .stat-canvas");
            pitch = pitchAndMatrix.pitch;
            stats = new config.model.instanceType({
                context: statsCtx,
                pitch: pitch,
                matrix: pitchAndMatrix.matrix,
                maxBarHeight: pitchAndMatrix.maxBarHeight,
                type: type,
                extraOptions: config.extraOptions
            });
            $(statsCtx.canvas).attr(pitchAndMatrix.canvasDimensions);
        } else {
            var pitchAndStatsCtx = null;
            if (typeof(view.drawPitch) === "function") {
                pitchAndStatsCtx = view.drawPitch(view.renderTo);
            } else {
                pitchAndStatsCtx = nextgame.canvas.drawFullPitchAndCreateOverlayingStatsCanvas($("#" + view.renderTo), view.width, view.height);
            }
            pitch = pitchAndStatsCtx.pitch;
            stats = new config.model.instanceType({
                pitch: pitch,
                context: pitchAndStatsCtx.statsContext,
                width: view.width,
                height: view.height,
                type: type,
                extraOptions: config.extraOptions
            });
        }
    }
    this.load = function(data) {
        stats.draw(data, config.view);
    };
    this.id = function() {
        return view.renderTo;
    };
};

function H2HTeamStatsSummaryInfoModel(data) {
    var teamData = data.value[0];
    if (!teamData) {
        return;
    }
    var record = {
        played: teamData.GamesPlayed,
        data: []
    };
    record.data[0] = NG.getAverage(teamData.Goals, teamData.GamesPlayed);
    record.data[1] = NG.getAverage(teamData.TotalShots, teamData.GamesPlayed);
    record.data[2] = NG.getAverage(teamData.Yellow, teamData.GamesPlayed);
    record.data[3] = NG.getAverage(teamData.Red, teamData.GamesPlayed);
    record.data[4] = NG.getAverage(teamData.Corners, teamData.GamesPlayed);
    record.data[5] = NG.getAverage(teamData.Fouls, teamData.GamesPlayed);
    record.data[6] = NG.getAverage(teamData.Offsides, teamData.GamesPlayed);
    record.data[7] = NG.getAverage(teamData.Throws, teamData.GamesPlayed);
    record.data[8] = NG.getPercentage(teamData.AerialWon, (teamData.AerialWon + teamData.AerialLost));
    record.data[9] = NG.getAverage(teamData.Possession, teamData.GamesPlayed);
    record.data[10] = NG.getPercentage(teamData.AccuratePasses, teamData.TotalPasses);
    record.data[11] = teamData.Rating;
    return record;
}

function H2HTeamStatsOffensiveInfoModel(data) {
    var teamData = data.value[0];
    if (!teamData) {
        return;
    }
    var record = {
        played: teamData.GamesPlayed,
        data: []
    };
    record.data[0] = NG.getAverage(teamData.Goals, teamData.GamesPlayed);
    record.data[1] = NG.getAverage(teamData.TotalShots, teamData.GamesPlayed);
    record.data[2] = NG.getAverage(teamData.ShotsOnTarget, teamData.GamesPlayed);
    record.data[3] = NG.getAverage(teamData.Dribbles, teamData.GamesPlayed);
    record.data[4] = NG.getAverage(teamData.WasFouled, teamData.GamesPlayed);
    record.data[5] = NG.getAverage(teamData.Dispossesed, teamData.GamesPlayed);
    record.data[6] = NG.getAverage(teamData.Offsides, teamData.GamesPlayed);
    record.data[7] = NG.getAverage(teamData.Throws, teamData.GamesPlayed);
    return record;
}

function H2HTeamStatsDefensiveInfoModel(data) {
    var teamData = data.value[0];
    if (!teamData) {
        return;
    }
    var record = {
        played: teamData.GamesPlayed,
        data: []
    };
    record.data[0] = NG.getAverage(teamData.TotalTackle, teamData.GamesPlayed);
    record.data[1] = NG.getAverage(teamData.Fouls, teamData.GamesPlayed);
    record.data[2] = getAsFloat(teamData.Interceptions, teamData.GamesPlayed);
    record.data[3] = getAsFloat(teamData.TotalClearance, teamData.GamesPlayed);
    record.data[4] = getAsFloat(teamData.ShotsBlocked, teamData.GamesPlayed);
    record.data[5] = getAsFloat((teamData.ShotsConcededIBox + teamData.ShotsConcededOBox), teamData.GamesPlayed);
    return record;
}

function LiveTeamStatsInfoModel(data) {
    var record = {
        data: []
    };
    var stats = data[3][0];
    var totalPass = getStatValue(stats, "total_pass");
    var accuratePass = getStatValue(stats, "accurate_pass");
    var duelWon = getStatValue(stats, "aerial_won");
    var duelLost = getStatValue(stats, "aerial_lost");
    record.data[0] = getStatValue(stats, "total_offside");
    record.data[1] = getStatValue(stats, "fk_foul_lost");
    record.data[2] = getStatValue(stats, "won_corners");
    record.data[3] = getStatValue(stats, "total_throws");
    record.data[4] = getStatValue(stats, "won_contest");
    record.data[5] = getStatValue(stats, "total_tackle");
    record.data[6] = NG.getPercentage(accuratePass, totalPass);
    record.data[7] = NG.getPercentage(duelWon, (duelWon + duelLost));
    record.data[8] = getStatValue(stats, "possession_percentage");
    return record;
}

function LiveTeamStatsSummaryInfoModel(data) {
    var record = {
        data: []
    };
    var stats = data[3][0];
    record.data[0] = getStatValue(stats, "total_scoring_att");
    record.data[1] = getStatValue(stats, "ontarget_scoring_att");
    var totalPass = getStatValue(stats, "total_pass");
    var accuratePass = getStatValue(stats, "accurate_pass");
    var duelWon = getStatValue(stats, "aerial_won");
    var duelLost = getStatValue(stats, "aerial_lost");
    record.data[2] = getAsFloat(100 * accuratePass, totalPass);
    record.data[3] = getAsFloat(100 * duelWon, (duelWon + duelLost));
    record.data[4] = getStatValue(stats, "won_contest");
    record.data[5] = getStatValue(stats, "total_tackle");
    record.data[6] = getStatValue(stats, "possession_percentage");
    return record;
}

function LiveTeamFormationPresenter(config) {
    var $pitch, $lineup, $subs, $bench, $header, model, currentData = {},
        selectedPlayers = {};
    init(config);

    function init(config) {
        $pitch = $(config.view.renderTo + "-content");
        $lineup = $(config.view.renderTo + "-content-lineup");
        $subs = $(config.view.renderTo + "-content-subs");
        $bench = $(config.view.renderTo + "-content-bench");
        $header = $(config.view.renderTo + "-header");
        model = config.model;
    }
    this.load = function(data) {
        var teamFormation = prepareData(data);
        if (!teamFormation) {
            return;
        }
        clear(teamFormation.field);
        render(teamFormation);
        setFormationLabel(teamFormation.formation, teamFormation.field);
        $(".player", $lineup).bind("click", selectPlayer);
        $(".player", $subs).bind("click", selectPlayer);
        $(".player", $bench).bind("click", selectPlayer);
        currentData[teamFormation.field] = teamFormation;
        var player;
        if (selectedPlayers[field]) {
            player = selectedPlayers[field];
        } else {
            player = teamFormation.players[teamFormation.players.length - 1];
        }
        if (!player) {
            return;
        }
        selectPlayerByIdAndField(player.Id, teamFormation.field);
    };

    function ratingUpdateStatus(oldRating, newRating) {
        var r1 = NG.roundNumber(getRatingDisplayValue(oldRating), 1),
            r2 = NG.roundNumber(getRatingDisplayValue(newRating), 1);
        return (r1 < r2) ? 1 : (r1 == r2) ? 2 : 3;
    }

    function selectPlayer() {
        var playerId = $(this).attr("data-player-id");
        var field = $(this).attr("data-field");
        $(document).triggerHandler("live-player-clicked");
        selectPlayerByIdAndField(playerId, field);
    }

    function selectPlayerByIdAndField(playerId, field) {
        var player = findPlayerByIdAndField(playerId, field);
        if (player) {
            $(".player", $("." + field)).removeClass("selected");
            $('.player[data-player-id="' + playerId + '"]').addClass("selected");
            $(document).triggerHandler("live-player-selected-for-comparision", [player, field]);
        }
        selectedPlayers[field] = player;
    }

    function findPlayerByIdAndField(playerId, field) {
        if (currentData[field]) {
            var player;
            player = findPlayerById(currentData[field].players, playerId);
            if (!player) {
                player = findPlayerById(currentData[field].subs, playerId);
            }
            if (!player) {
                player = findPlayerById(currentData[field].bench, playerId);
            }
            return player;
        }
        return null;
    }

    function findPlayerById(players, playerId) {
        if (players) {
            for (var i = 0; i < players.length; i++) {
                if (playerId == players[i].Id) {
                    return players[i];
                }
            }
        }
        return null;
    }

    function setFormationLabel(formation, field) {
        $("." + field + " .formation-label", $header).html(formation.split("").join("-"));
    }

    function clear(field) {
        $(".team-pitch-formation." + field, $lineup).remove();
        $(".team-pitch-formation." + field, $subs).remove();
        $(".team-bench." + field, $bench).remove();
    }

    function prepareData(data) {
        var teamFormation = {};
        teamFormation.field = model.field;
        if (!data[4] || !data[5]) {
            return;
        }
        players = data[4];
        var formation = data[5];
        teamFormation.rating = data[2];
        teamFormation.formation = formation[0];
        var formationPositions = formation[1];
        teamFormation.players = [];
        teamFormation.subs = [];
        teamFormation.bench = [];
        for (var i = 1; i < 12; i++) {
            var playerData = getPlayerByFormationPlace(players, i);
            if (playerData) {
                var formationPosition = {
                    vertical: formationPositions[i - 1][0],
                    horizontal: formationPositions[i - 1][1]
                };
                var player = getPlayerRecord(playerData, formationPosition);
                teamFormation.players.push(player);
            }
        }
        var subs = getSubs(players);
        var nthSub = 0;
        for (var i = 0; i < subs.length; i++) {
            var sub = getPlayerRecord(subs[i]);
            if (2 == sub.SubstitutionType || (!sub.Position && 1 == sub.SubstitutionType)) {
                sub.Position = {
                    vertical: 0,
                    horizontal: nthSub
                };
                teamFormation.subs.push(sub);
                nthSub++;
            } else {
                teamFormation.bench.push(sub);
            }
        }
        teamFormation.subs.sort(function(a, b) {
            return b.Name < a.Name;
        });
        teamFormation.bench.sort(function(a, b) {
            return b.Name < a.Name;
        });
        return teamFormation;
    }

    function getPlayerRecord(playerData, formationPosition) {
        var player = {
            Id: playerData[0],
            Name: playerData[1],
            PositionText: playerData[5],
            Position: formationPosition,
            Rating: NG.roundNumber(playerData[2], 1),
            ShirtNo: playerData[6] ? playerData[6] : "",
            SubstitutionType: playerData[7],
            SubstitutionMinute: playerData[8],
            PlayedPositions: playerData[9],
            Age: playerData[10],
            Height: playerData[11],
            Weight: playerData[12],
            Stats: new LivePlayerStatModel(playerData)
        };
        loadLivePlayerStatisticsEvents(playerData[3][0], player);
        setIsManOfTheMatch(playerData[3][0], player);
        return player;
    }

    function getPlayerByFormationPlace(players, formationPlace) {
        for (var i = 0; i < players.length; i++) {
            if (formationPlace == getStatValue(players[i][3][0], "formation_place")) {
                return players[i];
            }
        }
        return null;
    }

    function getSubs(players) {
        var subs = [];
        for (var i = 0; i < players.length; i++) {
            if (0 == getStatValue(players[i][3][0], "formation_place")) {
                subs.push(players[i]);
            }
        }
        return subs;
    }

    function render(teamFormation) {
        var html = [];
        var subsHtml = [];
        var benchHtml = [];
        var players = teamFormation.players,
            subs = teamFormation.subs,
            bench = teamFormation.bench;
        var pitchDimensions = getPitchDimensions();
        var cellWidth = (pitchDimensions.width / 2) / 11,
            cellHeight = pitchDimensions.height / 11,
            marginFrom = "home" == teamFormation.field ? "left" : "right";
        var viewDimensions = {
            cellWidth: cellWidth,
            cellHeight: cellHeight,
            marginFrom: marginFrom,
            pitchDimensions: pitchDimensions,
            playerHeight: 60,
            playerWidth: 16
        };
        html.push('<div class="team-pitch-formation ' + teamFormation.field + '">');
        var oldTeamRating;
        if (currentData[teamFormation.field]) {
            oldTeamRating = currentData[teamFormation.field].rating;
        }
        html.push('<div class="team-rating rating-status-{1}"><span class="rating rc">{0}</span></div>'.format(teamFormation.rating.toFixed(2), oldTeamRating ? ratingUpdateStatus(oldTeamRating, teamFormation.rating) : 0));
        for (var i = 0; i < players.length; i++) {
            html.push(getPlayerHtml(players[i], viewDimensions, teamFormation.field));
        }
        html.push("</div>");
        subsHtml.push('<div class="team-pitch-formation ' + teamFormation.field + '">');
        for (var i = 0; i < subs.length; i++) {
            subsHtml.push(getPlayerHtml(subs[i], viewDimensions, teamFormation.field, true));
        }
        subsHtml.push("</div>");
        benchHtml.push('<div class="team-bench ' + teamFormation.field + '">');
        for (var i = 0; i < bench.length; i++) {
            benchHtml.push(getBenchPlayerHtml(bench[i], teamFormation.field));
        }
        benchHtml.push("</div>");
        $lineup.append(html.join(""));
        $subs.append(subsHtml.join(""));
        $bench.append(benchHtml.join(""));
    }

    function getBenchPlayerHtml(player, field) {
        var b = [];
        b.push('<span class="player" data-field="{0}" data-player-id="{1}">'.format(field, player.Id));
        b.push('<span class="name rc">{0}.{1}</span>'.format(player.ShirtNo, getLastName(player.Name)));
        b.push("</span>");
        return b.join("");
    }

    function getPlayerHtml(player, viewDimensions, field, isSub) {
        var oldPlayer = findPlayerByIdAndField(player.Id, field);
        var vertical = isSub ? -15 : (player.Position.vertical * viewDimensions.cellHeight) + (viewDimensions.cellHeight - viewDimensions.playerHeight) / 2;
        var horizontal = isSub ? 0 == player.Position.horizontal ? 30 : player.Position.horizontal * 100 : (player.Position.horizontal * viewDimensions.cellWidth) - 15;
        var html = [];
        html.push('<table data-player-id="' + player.Id + '" data-field="' + field + '"');
        html.push(' title="' + player.ShirtNo + " " + player.Name + " (" + player.PositionText + ") - " + player.Rating + '" ');
        html.push('style="top: ' + vertical + "px; " + viewDimensions.marginFrom + ": " + horizontal + 'px;" class="player has-stats' + (isSub ? " sub" : ""));
        html.push(" rating-status-" + (oldPlayer ? ratingUpdateStatus(oldPlayer.Rating, player.Rating) : 0));
        html.push('">');
        html.push("<tr>");
        html.push('<td class="live-player-events">');
        if (player.SubstitutionType) {
            html.push('<span class="incident-wrapper pulsable">');
            html.push(getSubstitutionHtml(player.SubstitutionType, player.SubstitutionMinute));
            html.push("</span>");
        }
        if ("Sub" == player.PositionText && 1 == player.SubstitutionType) {
            html.push('<span class="incident-wrapper pulsable">');
            html.push(getSubstitutionHtml(2));
            html.push("</span>");
        }
        html.push(getPlayerEventsHtml(player.events, oldPlayer ? oldPlayer.Events : null));
        if (player.IsManOfTheMatch) {
            html.push('<span class="incident-wrapper pulsable"><span title="Man of the Match" class="incidents-icon ui-icon mom"></span></span>');
        }
        html.push("</td>");
        html.push("</tr>");
        html.push("<tr>");
        html.push("<td>");
        html.push('<span class="name rc">{0}.{1}</span>'.format(player.ShirtNo, getLastName(player.Name)));
        html.push("</td>");
        html.push("</tr>");
        html.push('<tr><td class="stat-value pulsable rating">{0}</td></tr>'.format(player.Rating.toFixed(1)));
        html.push("</table>");
        return html.join("");
    }

    function getPitchDimensions() {
        if (!$lineup) {
            return;
        }
        return {
            width: $lineup.width(),
            height: 356
        };
    }
}

function getPlayerEventsHtml(events, oldEvents) {
    var html = [];
    for (var event in events) {
        var eventChanged = oldEvents ? oldEvents[event] ? (oldEvents[event].v < events[event].v) : true : true;
        for (var k = 0; k < events[event].v; k++) {
            html.push('<span class="incident-wrapper {0}"><span title="'.format(eventChanged ? "pulsable" : "") + getIncidentToolTip(events[event].d) + '" class="incidents-icon ui-icon ' + events[event].d + '"></span></span>');
        }
    }
    return html.join("");
}

function LiveTeamShotsModel(data) {
    if (!data) {
        return null;
    }
    var stats = data[3][0];
    return {
        TeamId: data[0],
        TeamName: data[1],
        Goals: getStatValue(stats, "goals"),
        TotalShots: getStatValue(stats, "total_scoring_att"),
        ShotsOnTarget: getStatValue(stats, "ontarget_scoring_att"),
        ShotsOffTarget: getStatValue(stats, "shot_off_target"),
        ShotsOnPost: getStatValue(stats, "post_scoring_att"),
        ShotsBlocked: getStatValue(stats, "blocked_scoring_att"),
        Miss: {
            HighLeft: getStatValue(stats, "att_miss_high_left"),
            HighCentre: getStatValue(stats, "att_miss_high"),
            HighRight: getStatValue(stats, "att_miss_high_right"),
            Left: getStatValue(stats, "att_miss_left"),
            Right: getStatValue(stats, "att_miss_right")
        },
        Goal: {
            HighLeft: getStatValue(stats, "att_goal_high_left"),
            HighCentre: getStatValue(stats, "att_goal_high_centre"),
            HighRight: getStatValue(stats, "att_goal_high_right"),
            LowLeft: getStatValue(stats, "att_goal_low_left"),
            LowCentre: getStatValue(stats, "att_goal_low_centre"),
            LowRight: getStatValue(stats, "att_goal_low_right")
        },
        Post: {
            Centre: getStatValue(stats, "att_post_high"),
            Left: getStatValue(stats, "att_post_left"),
            Right: getStatValue(stats, "att_post_right")
        },
        Save: {
            HighLeft: getStatValue(stats, "att_sv_high_left"),
            HighCentre: getStatValue(stats, "att_sv_high_centre"),
            HighRight: getStatValue(stats, "att_sv_high_right"),
            LowLeft: getStatValue(stats, "att_sv_low_left"),
            LowCentre: getStatValue(stats, "att_sv_low_centre"),
            LowRight: getStatValue(stats, "att_sv_low_right")
        }
    };
}

function LiveTeamShots(config) {
    var $stats, $zoneChart, currentModel;
    init();

    function init() {
        $stats = $(config.view.renderTo + " .content");
        $zoneChart = $(config.view.renderTo + " .shot-zone-chart");
    }
    this.load = function(data) {
        var shotsModel = new LiveTeamShotsModel(data);
        $stats.html(LiveTeamShotsView(shotsModel, currentModel)).fadeIn();
        $zoneChart.html(LiveTeamShotsZoneChartView(shotsModel, currentModel));
        $("li", $stats).hover(function() {
            var $this = $(this);
            var type = $this.attr("data-type");
            if (type) {
                if ("all" == type) {
                    $(".shot-zone", $zoneChart).addClass("highlight");
                } else {
                    $('.shot-zone[data-type="{0}"]'.format(type), $zoneChart).addClass("highlight");
                }
            }
        }, function() {
            $(".shot-zone", $zoneChart).removeClass("highlight");
        });
        currentModel = shotsModel;
    };
}

function LiveTeamShotsZoneChartView(model, oldModel) {
    var t = [];

    function addStatView(clazz, shots, goals, sumOfOldValues) {
        var type = clazz.split("-")[0];
        goals = goals || 0;
        sumOfOldValues = sumOfOldValues || 0;
        if (0 != (shots + goals)) {
            var goalsHtml = "";
            if (0 != goals) {
                goalsHtml = '<span class="incidents-icon ui-icon goal"><span class="number box-shadow">{0}</span></span>'.format(goals);
            }
            var shotsHtml = 0 != shots ? '<span class="miss">{0}</span>'.format(shots) : "";
            var title = 0 != shots ? "Misses: {0}".format(shots) : "";
            title += 0 != shots && 0 != goals ? "," : "";
            title += 0 != goals ? "Goals: {0}".format(goals) : "";
            t.push('<span title="{5}" class="shot-zone rc {3} {0} {4}" data-type="{6}">{1}{2}</span>'.format(clazz, shotsHtml, goalsHtml, (sumOfOldValues < shots + goals) ? "incident-wrapper pulsable" : "", 0 != goals ? "has-goals" : "", title, type));
        }
    }
    if (model) {
        addStatView("miss-high-left", model.Miss.HighLeft, null, oldModel ? oldModel.Miss.HighLeft : null);
        addStatView("miss-high-centre", model.Miss.HighCentre, null, oldModel ? oldModel.Miss.HighCentre : null);
        addStatView("miss-high-right", model.Miss.HighRight, null, oldModel ? oldModel.Miss.HighRight : null);
        addStatView("miss-left", model.Miss.Left, null, oldModel ? oldModel.Miss.Left : null);
        addStatView("miss-right", model.Miss.Right, null, oldModel ? oldModel.Miss.Right : null);
        addStatView("post-left", model.Post.Left, null, oldModel ? oldModel.Post.Left : null);
        addStatView("post-centre", model.Post.Centre, null, oldModel ? oldModel.Post.Centre : null);
        addStatView("post-right", model.Post.Right, null, oldModel ? oldModel.Post.Right : null);
        addStatView("ontarget-high-left", model.Save.HighLeft, model.Goal.HighLeft, oldModel ? (oldModel.Save.HighLeft + oldModel.Goal.HighLeft) : null);
        addStatView("ontarget-high-centre", model.Save.HighCentre, model.Goal.HighCentre, oldModel ? (oldModel.Save.HighCentre + oldModel.Goal.HighCentre) : null);
        addStatView("ontarget-high-right", model.Save.HighRight, model.Goal.HighRight, oldModel ? (oldModel.Save.HighRight + oldModel.Goal.HighRight) : null);
        addStatView("ontarget-low-left", model.Save.LowLeft, model.Goal.LowLeft, oldModel ? (oldModel.Save.LowLeft + oldModel.Goal.LowLeft) : null);
        addStatView("ontarget-low-centre", model.Save.LowCentre, model.Goal.LowCentre, oldModel ? (oldModel.Save.LowCentre + oldModel.Goal.LowCentre) : null);
        addStatView("ontarget-low-right", model.Save.LowRight, model.Goal.LowRight, oldModel ? (oldModel.Save.LowRight + oldModel.Goal.LowRight) : null);
    }
    return t.join("");
}

function statChanged(value, oldValue) {
    return oldValue ? oldValue < value : true;
}

function LiveTeamShotsView(model, oldModel) {
    oldModel = oldModel || {};
    var t = [];
    if (model) {
        t.push("<ul>");
        t.push('<li class="alt"><label>Total Shots: </label><span class="{1}">{0}</span></li>'.format(model.TotalShots, statChanged(model.TotalShots, oldModel.TotalShots) ? "pulsable" : ""));
        t.push('<li data-type="ontarget" class="hoverable"><label>On Target: </label><span class="{1}">{0}</span></li>'.format(model.ShotsOnTarget, statChanged(model.TotalShots, oldModel.TotalShots) ? "pulsable" : ""));
        t.push('<li  data-type="miss" class="hoverable alt"><label>Off Target: </label><span class="{1}">{0}</span></li>'.format(model.ShotsOffTarget, statChanged(model.TotalShots, oldModel.TotalShots) ? "pulsable" : ""));
        t.push('<li  data-type="post" class="hoverable"><label>Hit Woodwork: </label><span class="{1}">{0}</span></li>'.format(model.ShotsOnPost, statChanged(model.TotalShots, oldModel.TotalShots) ? "pulsable" : ""));
        t.push('<li class="alt"><label>Blocked: </label><span class="{1}">{0}</span></li>'.format(model.ShotsBlocked, statChanged(model.TotalShots, oldModel.TotalShots) ? "pulsable" : ""));
        t.push("</ul>");
    }
    return t.join("");
}

function LivePlayerStatsComparisionBox(config) {
    var $view, $homeProfile, $awayProfile, players, currentStats;
    init();

    function init() {
        $view = $(config.view.renderTo);
        $homeProfile = $(".live-player-profile.home");
        $awayProfile = $(".live-player-profile.away");
        field = config.field;
        players = {
            home: null,
            away: null
        };
        bindEvents();
    }

    function bindEvents() {
        $(document).bind("live-player-selected-for-comparision", function(e, player, field) {
            players[field] = player;
            renderPlayerComparision();
        });
    }

    function renderPlayerComparision() {
        if (players.home && players.away) {
            var groupedByStatType = groupStatsByType();
            renderStats(groupedByStatType);
            currentStats = groupedByStatType;
            updatePlayerNames();
            updatePlayerProfile();
            updatePlayerAvatars();
        }
    }

    function updatePlayerNames() {
        $(".player-name", $homeProfile).html(WS.PlayerLink(players.home.Id, "{0}. {1}".format(players.home.ShirtNo, players.home.Name)));
        $(".player-name", $awayProfile).html(WS.PlayerLink(players.away.Id, "{0}. {1}".format(players.away.ShirtNo, players.away.Name)));
    }

    function updatePlayerProfile() {
        $(".content", $homeProfile).html(getPlayerProfileHtml(players.home));
        $(".content", $awayProfile).html(getPlayerProfileHtml(players.away));
    }

    function getPlayerProfileHtml(player) {
        var t = [];
        if (player) {
            t.push("<ul>");
            t.push('<li class="played-positions alt"><label>Current Position:</label> {0}</li>'.format(player.PositionText));
            t.push('<li class="played-positions"><label>Playable Positions:</label> {0}</li>'.format(player.PlayedPositions));
            if (player.Age) {
                t.push('<li class="player-age alt"><label>Age: </label>{0}</li>'.format(player.Age));
            }
            if (player.Height) {
                t.push('<li class="player-height"><label>Height: </label>{0}cm</li>'.format(player.Height));
            }
            if (player.Weight) {
                t.push('<li class="player-weight alt"><label>Weight: </label>{0}kg</li>'.format(player.Weight));
            }
            t.push("</ul>");
        }
        return t.join("");
    }

    function updatePlayerAvatars() {
        $(".player-picture", $homeProfile).attr("src", gImageUrl + "players/" + players.home.Id + ".jpg");
        $(".player-picture", $awayProfile).attr("src", gImageUrl + "players/" + players.away.Id + ".jpg");
    }

    function renderStatValue(groupedByStatType, stat, field) {
        var value = !isNaN(groupedByStatType[stat][field]) ? parseFloat(groupedByStatType[stat][field]) : groupedByStatType[stat][field];
        var otherField = "home" == field ? "away" : "home";
        var otherValue = !isNaN(groupedByStatType[stat][otherField]) ? parseFloat(groupedByStatType[stat][otherField]) : groupedByStatType[stat][otherField];
        var oldValue = currentStats ? (currentStats[stat] ? currentStats[stat][field] : 0) : 0;
        oldValue = !isNaN(oldValue) ? parseFloat(oldValue) : oldValue;
        return '<span class="{1} {2}">{0}</span>'.format(displayValue(value, groupedByStatType[stat].IsPercentage), isGreaterThan(value, otherValue) ? "greater" : "", statChanged(value, oldValue) ? "pulsable" : "");
    }

    function renderStats(groupedByStatType) {
        var html = [];
        html.push('<div id="live-summary-player-comparision-events" class="two-cols">');
        html.push('<span class="home">');
        html.push(getPlayerEventsHtml(players.home.events));
        if (players.home.IsManOfTheMatch) {
            html.push('<span class="incident-wrapper pulsable"><span class="incidents-icon ui-icon mom" title="Man of the Match"></span></span>');
        }
        html.push("</span>");
        html.push('<span class="away">');
        html.push(getPlayerEventsHtml(players.away.events));
        if (players.away.IsManOfTheMatch) {
            html.push('<span class="incident-wrapper pulsable"><span class="incidents-icon ui-icon mom" title="Man of the Match"></span></span>');
        }
        html.push("</span>");
        html.push("</div>");
        var i = 0;
        for (var stat in groupedByStatType) {
            html.push('<div class="stat {0}">'.format(0 == i % 2 ? "alt" : ""));
            html.push('<span class="stat-value" style="width: 60px;">');
            html.push(renderStatValue(groupedByStatType, stat, "home"));
            html.push("</span>");
            html.push('<span style="width: 80px;" class="stat-label">' + stat + "</span>");
            html.push('<span class="stat-value" style="width: 60px;">');
            html.push(renderStatValue(groupedByStatType, stat, "away"));
            html.push("</span>");
            html.push("</div>");
            i++;
        }
        $view.html(html.join(""));
    }

    function IsNumeric(input) {
        var RE = /^-{0,1}\d*\.{0,1}\d+$/;
        return (RE.test(input));
    }

    function isGreaterThan(value, opponentValue) {
        if (!(IsNumeric(value) && IsNumeric(opponentValue))) {
            return false;
        }
        return opponentValue < value;
    }

    function displayValue(value, isPercentage) {
        if (!value) {
            return "-";
        }
        return value + (isPercentage ? "%" : "");
    }

    function groupStatsByType() {
        var grouped = {};
        groupStatByTypeForField(grouped, "home");
        groupStatByTypeForField(grouped, "away");
        return grouped;
    }

    function groupStatByTypeForField(group, field) {
        var player = players[field];
        if (!player) {
            return;
        }
        for (var i = 0; i < player.Stats.length; i++) {
            ensureStatTypeExistsInGroup(group, player.Stats[i].DisplayName);
            group[player.Stats[i].DisplayName][field] = player.Stats[i].Value;
            group[player.Stats[i].DisplayName].IsPercentage = player.Stats[i].IsPercentage;
        }
    }

    function ensureStatTypeExistsInGroup(group, type) {
        if (!group[type]) {
            group[type] = {};
        }
    }
}

function LivePlayerModel(playerData) {
    return {
        Id: playerData[0],
        Name: playerData[1],
        Rating: NG.roundNumber(playerData[2], 1),
        Stats: new LivePlayerStatModel(playerData),
        Position: playerData[4],
        PositionText: playerData[5],
        ShirtNo: playerData[6],
        SubstitutionType: playerData[7],
        SubstitutionMinute: playerData[8],
        FormationPlace: getStatValue(playerData[3][0], "formation_place"),
        IsManOfTheMatch: _gIsMotmVisible ? getStatValue(playerData[3][0], "man_of_the_match") : 0,
        IsSub: 5 == playerData[4]
    };
}

function LivePlayerStatModel(data) {
    var records = [];
    var position = data[4];
    var detailedPosition = data[5];
    var stats = data[3][0];
    var totalPass = getStatValue(stats, "total_pass");
    var accuratePass = getStatValue(stats, "accurate_pass");
    var duelWon = getStatValue(stats, "aerial_won");
    var duelLost = getStatValue(stats, "aerial_lost");
    records[0] = {
        DisplayName: "Pass Accuracy",
        Value: getPercentage(accuratePass, totalPass),
        IsPercentage: true
    };
    records[1] = {
        DisplayName: "Aerials Won",
        Value: getPercentage(duelWon, (duelWon + duelLost)),
        IsPercentage: true
    };
    records[2] = {
        DisplayName: "Touches",
        Value: getStatValue(stats, "touches")
    };
    records[3] = {
        DisplayName: "Fouls",
        Value: getStatValue(stats, "fouls")
    };
    if (1 == position) {
        records[4] = {
            DisplayName: "Saves",
            Value: getStatValue(stats, "saves")
        };
        records[5] = {
            DisplayName: "One on One",
            Value: getStatValue(stats, "total_one_on_one")
        };
        var goodHighClaim = getStatValue(stats, "good_high_claim");
        var goodClaim = getStatValue(stats, "good_claim");
        records[6] = {
            DisplayName: "Cross Claims",
            Value: goodHighClaim + goodClaim
        };
    } else {
        records[4] = {
            DisplayName: "Total Shots",
            Value: getStatValue(stats, "total_scoring_att")
        };
        records[5] = {
            DisplayName: "Dribbles Won",
            Value: getStatValue(stats, "won_contest")
        };
        records[6] = {
            DisplayName: "Tackles",
            Value: getStatValue(stats, "total_tackle")
        };
    }
    records[7] = {
        DisplayName: "Rating",
        Value: NG.roundNumber(data[2], 1)
    };
    return records;
}

function getRatingDisplayValue(rating, precision) {
    precision = precision || 2;
    if (!rating) {
        return 0;
    }
    return NG.roundNumber(rating, precision);
}

function setIsManOfTheMatch(stats, player) {
    if (0 != getStatValue(stats, "man_of_the_match") && _gIsMotmVisible) {
        player.IsManOfTheMatch = true;
    }
}

function getShortDisplayName(name, hideTitle) {
    name = jQuery.trim(name);
    var names = name.split(" ");
    if (names.length == 1) {
        return name;
    }
    var result = [];
    for (var i = 0; i < names.length - 1; i++) {
        result.push(names[i].charAt(0) + ". ");
    }
    result.push(names[names.length - 1]);
    return "<span " + (!hideTitle ? ('title="' + name + '"') : "") + ">" + result.join("") + "</span>";
}

function getLastName(name) {
    var names = name.trim().split(" ");
    return '<span title="' + name + '">' + names[names.length - 1] + "</span>";
}

function getSubstitutionHtml(substitutionType, minute) {
    if (0 == substitutionType) {
        return "";
    }
    var substitutionIcon = 1 == substitutionType ? "subst-out" : "subst-in";
    var min = (minute ? minute + "'" : "");
    if (minute && 0 == minute) {
        min = "";
    }
    return '<span title="' + min + '" class="substitution-minute"><span class="incidents-icon ui-icon ' + substitutionIcon + '"></span></span>';
}
WS.Stats.ZeroFixer = function() {
    $(document).bind("fix-zeros", function(event, $element) {
        $element.each(function() {
            if (0 == $(this).html()) {
                $(this).html("-");
            }
        });
    });
}();
WS.Stats.PieChartComparision = function(config) {
    var id, $view, $homePie, $awayPie, $comparision, model, view, fields, pies, selectedCategoryIndex, fixedInfo;
    init(config);
    this.load = function(data) {
        var homeRecords = model.instanceType(data.home);
        var awayRecords = model.instanceType(data.away);
        loadCurrentFields(data, "home");
        loadCurrentFields(data, "away");
        if (model.perGame) {
            makePerGame(homeRecords, "home");
            makePerGame(awayRecords, "away");
        }
        clearView();
        renderPart("home");
        renderComparision();
        renderPart("away");
        $homePie = $("#" + id + "-home");
        $awayPie = $("#" + id + "-away");
        $comparision = $("#" + id + "-comparision");
        loadPie(homeRecords, "home");
        loadComparision(homeRecords, awayRecords);
        loadPie(awayRecords, "away");
        $view.triggerHandler("model-updated");
        selectCategory(selectedCategoryIndex);
    };
    this.id = function() {
        return id;
    };

    function loadCurrentFields(data, field) {
        if (!data[field].contentFilter) {
            return;
        }
        fields[field] = data[field].contentFilter.field;
    }

    function init(config) {
        id = config.view.renderTo;
        $view = $("#" + id);
        model = config.model;
        view = config.view;
        fields = {};
        pies = {};
        selectedCategoryIndex = 1;
        fixedInfo = model.fixedInfo;
        bindEvents();
    }

    function getCategoryIdentifier(index) {
        return {
            clicked: {
                index: model.identifiers.index,
                value: model.identifiers.value[index]
            }
        };
    }

    function makePerGame(records, field) {
        for (var i = 0; i < records.length; i++) {
            records[i] = parseInt(records[i] / model[field].played[fields[field]]);
        }
    }

    function bindEvents() {
        $view.on("click", ".stat", function() {
            var index = $(this).index();
            updatePieChartFilters(index - 2);
            selectCategory(index);
        });
    }

    function selectCategory(index) {
        selectCategoryInView(index - 1);
        selectedCategoryIndex = index;
        updateInfo(index);
    }

    function updateInfo(index) {
        if (!fixedInfo) {
            if (1 == index) {
                $view.triggerHandler("clicked");
            } else {
                $view.triggerHandler("clicked", [getCategoryIdentifier(index - 2)]);
            }
        }
        if (model.titles) {
            $view.triggerHandler("info-title-updated", [model.titles[index - 1]]);
        }
    }

    function selectCategoryInView(index) {
        $(".stat", $view).removeClass("selected").css("background", "none");
        $(".stat:eq(" + index + ")", $comparision).addClass("selected");
        if (0 == index) {
            $(".stat:eq(" + index + ")", $comparision).css("background-color", "#A2BE67");
        } else {
            $(".stat:eq(" + index + ")", $comparision).css("background-color", model.categories[index - 1].color);
        }
    }

    function clearView() {
        $view.html("");
    }

    function getIdentifierIndex(identifier) {
        if (!model.identifiers) {
            return;
        }
        for (var i = 0; i < model.identifiers.value.length; i++) {
            if (model.identifiers.value[i] == identifier.clicked.value) {
                return i;
            }
        }
    }

    function updatePieChartFilters(index) {
        pies.home.updateFilter(index);
        pies.away.updateFilter(index);
    }

    function renderPart(field) {
        $view.append('<div id="' + id + "-" + field + '" class="' + field + '"></div>');
        $("#" + id + "-" + field, $view).width(view.pie.width);
        $("#" + id + "-" + field, $view).bind("clicked", function(options, categoryIdentifier) {
            selectCategory(categoryIdentifier.clicked.id + 2);
            updatePieChartFilters(categoryIdentifier.clicked.id);
        });
    }

    function getTitle(field, isEmptyData) {
        var title = [];
        title.push("<ul>");
        title.push("<li>");
        if ("home" == field) {
            title.push(WS.TeamEmblemUrl(model[field].teamId, model[field].name, "height: 2em; width: 2em; vertical-align: middle;"));
        }
        title.push('<span style="margin-left: 0.4em;">' + model[field].name + "</span>");
        if ("away" == field) {
            title.push(WS.TeamEmblemUrl(model[field].teamId, model[field].name, "height: 2em; width: 2em; vertical-align: middle;"));
        }
        title.push("</li>");
        if (fields[field]) {
            title.push('<li style="font-size: 0.7em;">');
            title.push("Played: " + model[field].played[fields[field]]);
            title.push("</li>");
        }
        if (isEmptyData) {
            title.push('<li style="font-size: 0.7em; margin-top: 4em;">');
            title.push(view.emptyDataMessage ? view.emptyDataMessage : "N/A");
            title.push("</li>");
        }
        title.push("</ul>");
        return title.join("");
    }

    function dataIsEmpty(data) {
        if (!data) {
            return true;
        }
        if (0 == data.sum()) {
            return true;
        }
    }

    function loadPie(data, field) {
        var pieView = $.extend(true, {
            renderTo: id + "-" + field,
            title: getTitle(field, dataIsEmpty(data))
        }, view.pie);
        var pie = new WS.Stats.PieChart({
            model: model,
            view: pieView
        });
        pie.load(data);
        pies[field] = pie;
    }

    function renderComparision() {
        $view.append('<div id="' + id + '-comparision" class="stat-info"></div>');
    }

    function loadComparision(home, away) {
        var comparision = new WS.Stats.Info({
            view: {
                renderTo: id + "-comparision",
                width: 200,
                labelWidth: 80
            },
            model: {
                instanceType: PieChartComparisionModel,
                labelGroups: [{
                    start: 0,
                    end: 5,
                    hideBars: true,
                    title: model.comparision.title
                }],
                labels: getLabels()
            }
        });
        comparision.load({
            home: home,
            away: away
        });
        $(document).triggerHandler("fix-zeros", [$(".stat-value", $comparision)]);
    }

    function getLabels() {
        var labels = [];
        labels.push({
            type: "value",
            displayValue: "Total"
        });
        for (var i = 0; i < model.categories.length; i++) {
            labels.push({
                type: "value",
                displayValue: model.categories[i].displayName
            });
        }
        return labels;
    }
};

function PieChartComparisionModel(data) {
    if (!data || 0 == data.length) {
        return;
    }
    var records = [];
    records[0] = data.sum();
    for (var i = 0; i < data.length; i++) {
        records[i + 1] = data[i];
    }
    return {
        data: records
    };
}
var StageTouchChannelsGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: StageTouchChannelsGridModel,
        cache: true
    },
    view: StageTeamStatsGridView,
    sorter: {
        sortInfo: {
            property: "Left",
            direction: "desc"
        }
    }
});
var StageAttemptDirectionsGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: StageAttemptDirectionsGridModel,
        cache: true
    },
    view: StageTeamStatsGridView,
    sorter: {
        sortInfo: {
            property: "Left",
            direction: "desc"
        }
    }
});
var StageAttemptZonesGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: StageAttemptZonesGridModel,
        cache: true
    },
    view: StageTeamStatsGridView,
    sorter: {
        sortInfo: {
            property: "Isb",
            direction: "desc"
        }
    }
});
var StageTouchZonesGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: StageTouchZonesGridModel,
        cache: true
    },
    view: StageTeamStatsGridView,
    sorter: {
        sortInfo: {
            property: "Def",
            direction: "desc"
        }
    }
});
var StageGoalsGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: StageGoalsGridModel,
        cache: true
    },
    view: StageTeamStatsGridView,
    sorter: {
        sortInfo: {
            property: "Op",
            direction: "desc"
        }
    }
});
var StagePassesGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: StagePassesGridModel,
        cache: true
    },
    view: StageTeamStatsGridView,
    sorter: {
        sortInfo: {
            property: "Sp",
            direction: "desc"
        }
    }
});
var StageCardsGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: StageCardsGridModel,
        cache: true
    },
    view: StageTeamStatsGridView,
    sorter: {
        sortInfo: {
            property: "F",
            direction: "desc"
        }
    }
});
var StageTeamStatsSummaryGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: TeamStatsSummaryGridModel,
        cache: true
    },
    view: StageTeamStatsGridView,
    sorter: {
        sortInfo: {
            property: "Rating",
            direction: "desc"
        }
    }
});
var StageTeamStatsOffensiveGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: TeamStatsOffensiveGridModel,
        cache: true
    },
    view: StageTeamStatsGridView,
    sorter: {
        sortInfo: {
            property: "TotalShots",
            direction: "desc"
        }
    }
});
var StageTeamStatsDefensiveGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: TeamStatsDefensiveGridModel,
        cache: true
    },
    view: StageTeamStatsGridView,
    sorter: {
        sortInfo: {
            property: "TotalTackle",
            direction: "desc"
        }
    }
});

function StageTeamStatsGridView(records) {
    function getMaxStat(teams, maxes, f) {
        if (maxes[f]) {
            return maxes[f];
        }
        var max = 0;
        for (var j = 0; j < teams.length; j++) {
            if (teams[i][f]) {
                if (max < teams[j][f]) {
                    max = teams[j][f];
                }
            }
        }
        maxes[f] = max;
        return max;
    }
    var teams = records.model.records;
    var exclude = {
        StatsAndHoverValues: 1,
        TeamId: 1,
        TeamName: 1,
        RegionId: 1,
        RegionCode: 1,
        TournamentId: 1,
        TournamentName: 1,
        WRating: 1,
        Yellow: 1,
        Red: 1,
        Ranking: 1
    };
    var useBar = {
        Ads: 1,
        Bp: 1,
        Ps: 1,
        Ds: 1,
        Left: 1,
        Centre: 1,
        Right: 1,
        Ib: 1,
        Ob: 1,
        Isb: 1,
        Def: 1,
        Mid: 1,
        Att: 1
    };
    var maxes = {};
    var t = [];
    for (var i = 0; i < teams.length; i++) {
        var o = teams[i];
        t.push("<tr " + ((1 == i % 2) ? 'class="alt"' : "") + ">");
        t.push('<td class="o">' + (i + 1) + "</td>");
        t.push('<td class="tn"><a href="/Teams/' + o.TeamId + '" class="team-link">' + o.TeamName + "</a></td>");
        for (var f in o) {
            if (!exclude[f]) {
                if ("CardPoints" == f) {
                    t.push('<td class="agg">');
                    t.push('<span class="yellow-card-box">' + o.Yellow + "</span>");
                    t.push('<span class="red-card-box">' + o.Red + "</span>");
                    t.push("</td>");
                } else {
                    if (useBar[f]) {
                        var maxStat = getMaxStat(teams, maxes, f);
                        t.push("<td>" + statBar(50, o[f], getPercentage(o[f], maxStat)) + "</td>");
                    } else {
                        if ("Ar" == f) {
                            t.push('<td><span class="stat-value number rating">' + NG.roundNumber(o.Ar, 2) + "</span></td>");
                        } else {
                            t.push('<td title="{0}" class="{1}">{2}</td>'.format(o.StatsAndHoverValues ? o.StatsAndHoverValues[f] : "", f.toLowerCase(), o[f]));
                        }
                    }
                }
            }
        }
        t.push("</tr>");
    }
    return t.join("");
}

function statBar(width, value, percentage, clazz) {
    return '<span class="stat-bar-wrapper ' + (clazz ? clazz : "") + '" style="width: ' + width + 'px;"><span class="stat-bar rc-r" style="width: ' + percentage + '%;"><span class="stat-value">' + value + "%</span></span></span>";
}

function StageCardsGridModel() {
    this.load = function(data) {
        if (!data) {
            return [];
        }
        var records = [];
        var teams = data.value[0];
        for (var i = 0; i < teams.length; i++) {
            var stats = [0, 0, 0, 0];
            AggresionModel(stats, teams[i][2][0][0]);
            records.push({
                TeamId: teams[i][0],
                TeamName: teams[i][1],
                F: stats[0],
                U: stats[1],
                D: stats[2],
                Ot: stats[3]
            });
        }
        return records;
    };
}

function getPlayedForTeam(teamsPlayed, teamId, field) {
    for (var i = 0; i < teamsPlayed.length; i++) {
        if (teamId == teamsPlayed[i][0]) {
            return eval(teamsPlayed[i][2][0])[field];
        }
    }
    return 1;
}

function StagePassesGridModel() {
    this.load = function(data) {
        if (!data) {
            return [];
        }
        var records = [];
        var teams = data.value[0];
        var teamsPlayed = DataStore.load("ws-teams-stage-stat", {
            parameters: {
                stageId: data.params.defaultParams.stageId,
                type: 25,
                teamId: -1,
                field: -1,
                against: -1
            },
            cache: true,
            dataType: "array"
        });
        var field = parseInt(data.filter.data.field);
        for (var i = 0; i < teams.length; i++) {
            var team = {
                TeamId: teams[i][0],
                TeamName: teams[i][1]
            };
            var stats = [0, 0, 0, 0, 0];
            var passes = teams[i][2][0][1];
            for (var j = 0; j < passes.length; j++) {
                PassTypesModel(stats, passes[j]);
            }
            var played = getPlayedForTeam(teamsPlayed[0], team.TeamId, field);
            team.Cr = Math.round(stats[0] / played);
            team.Tb = Math.round(stats[1] / played);
            team.Lb = Math.round(stats[2] / played);
            team.Sp = Math.round(stats[3] / played);
            records.push(team);
        }
        return records;
    };
}

function StageGoalsGridModel() {
    this.load = function(data) {
        if (!data) {
            return [];
        }
        var records = [];
        var teams = data.value[0];
        for (var i = 0; i < teams.length; i++) {
            var team = {
                TeamId: teams[i][0],
                TeamName: teams[i][1]
            };
            var stats = [0, 0, 0, 0, 0];
            var contentFilter = {
                goal: {
                    index: 0,
                    value: "goal"
                }
            };
            var attempts = teams[i][2][0][0];
            for (var j = 0; j < attempts.length; j++) {
                GoalTypesModel(stats, attempts[j], contentFilter);
            }
            team.Op = stats[0];
            team.Fb = stats[2];
            team.Sp = stats[1];
            team.Pen = stats[3];
            team.Og = stats[4];
            records.push(team);
        }
        return records;
    };
}

function TouchZonesGridModel(stats) {
    if (!stats) {
        return null;
    }
    var record = {
        forStats: {},
        againstStats: {}
    };
    record.forStats.defense = NG.roundNumber(100 * stats[0] / NG.roundNumber(stats.sum()));
    record.forStats.midfield = NG.roundNumber(100 * stats[1] / NG.roundNumber(stats.sum()));
    record.forStats.attack = NG.roundNumber(100 * stats[2] / NG.roundNumber(stats.sum()));
    record.againstStats.defense = NG.roundNumber(100 * stats[3] / NG.roundNumber(stats.sum()));
    record.againstStats.midfield = NG.roundNumber(100 * stats[4] / NG.roundNumber(stats.sum()));
    record.againstStats.attack = NG.roundNumber(100 * stats[5] / NG.roundNumber(stats.sum()));
    return record;
}

function StageTouchZonesGridModel() {
    this.load = function(data) {
        if (!data) {
            return [];
        }
        var records = [];
        var values = data.value[0];
        for (var i = 0; i < values.length; i++) {
            var stats = values[i][2][0];
            if (stats) {
                var record = TouchZonesGridModel(stats);
                records.push({
                    TeamId: values[i][0],
                    TeamName: values[i][1],
                    Def: record.forStats.defense + record.againstStats.attack,
                    Mid: record.forStats.midfield + record.againstStats.midfield,
                    Att: record.forStats.attack + record.againstStats.defense
                });
            }
        }
        return records;
    };
}

function StageTouchChannelsGridModel() {
    this.load = function(data) {
        if (!data) {
            return [];
        }
        var records = [];
        var values = data.value[0];
        for (var i = 0; i < values.length; i++) {
            var stats = values[i][2][0];
            var sum = stats.sum();
            records.push({
                TeamId: values[i][0],
                TeamName: values[i][1],
                Left: stats ? getPercentage(stats[0], sum) : 0,
                Centre: stats ? getPercentage(stats[1], sum) : 0,
                Right: stats ? getPercentage(stats[2], sum) : 0
            });
        }
        return records;
    };
}

function getPercentage(value, total) {
    if (!value || !total) {
        return 0;
    }
    if (0 == total) {
        return 0;
    }
    return Math.round(100 * value / total);
}

function StageAttemptDirectionsGridModel() {
    this.load = function(data) {
        if (!data) {
            return [];
        }
        var records = [];
        var values = data.value[0];
        for (var i = 0; i < values.length; i++) {
            var stats = values[i][2][0];
            var sum = stats.sum();
            records.push({
                TeamId: values[i][0],
                TeamName: values[i][1],
                Left: stats ? getPercentage(stats[0], sum) : 0,
                Centre: stats ? getPercentage(stats[1], sum) : 0,
                Right: stats ? getPercentage(stats[2], sum) : 0
            });
        }
        return records;
    };
}

function StageAttemptZonesGridModel() {
    this.load = function(data) {
        if (!data) {
            return [];
        }
        var records = [];
        var values = data.value[0];
        for (var i = 0; i < values.length; i++) {
            var stats = values[i][2][0];
            var sum = stats.sum();
            records.push({
                TeamId: values[i][0],
                TeamName: values[i][1],
                Isb: stats ? getPercentage(stats[0], sum) : 0,
                Ib: stats ? getPercentage(stats[1], sum) : 0,
                Ob: stats ? getPercentage(stats[2], sum) : 0
            });
        }
        return records;
    };
}

function TeamStageStats(config) {
    var id, $view;
    init(config);

    function init(config) {
        id = config.view.renderTo;
        $view = $("#" + id);
    }
    this.id = function() {
        return id;
    };
    this.load = function(data) {
        var records = TeamStageStatsModel(data);
        $view.html(TeamStageStatsView(records));
    };
}

function TeamStageStatsView(records) {
    var html = [];
    html.push('<table class="ws-list-grid with-three-cols">');
    html.push("<tr>");
    var listConfig = {
        titles: ["Summary"],
        view: {
            options: {
                displayFunction: function(stat) {
                    return stat.DisplayName + (stat.PerMatch ? '<span class="sub-text">per game</span>' : "");
                }
            }
        },
        statDisplayFunction: function(stat) {
            if (undefined != stat.Value2) {
                return '<span style="white-space: nowrap;"><span class="yellow-card-box">' + stat.Value + "</span>" + '<span class="red-card-box">' + stat.Value2 + "</span></span>";
            }
            return '<span class="stat-value number" style="font-weight: bold; float: right;">' + stat.Value + (stat.Percentage ? "%" : "") + "</span>";
        }
    };
    html.push('<td class="col">');
    html.push(new WS.List(listConfig).getHtml(records.Summary));
    html.push("</td>");
    html.push('<td class="col">');
    listConfig.titles = ["Defensive"];
    html.push(new WS.List(listConfig).getHtml(records.Defensive));
    html.push("</td>");
    html.push('<td class="col">');
    listConfig.titles = ["Offensive"];
    html.push(new WS.List(listConfig).getHtml(records.Offensive));
    html.push("</td>");
    html.push("</tr>");
    return html.join("");
}

function TeamStageStatsModel(data) {
    var records = {
        Summary: [],
        Offensive: [],
        Defensive: []
    };
    var teamData = data.value[0];
    if (!teamData) {
        return;
    }
    records.Summary.push({
        DisplayName: "Cards",
        Value: teamData.Yellow,
        Value2: teamData.Red
    });
    records.Summary.push({
        DisplayName: "Average Possession",
        Percentage: true,
        Value: NG.getAverage(teamData.Possession, teamData.GamesPlayed)
    });
    records.Summary.push({
        DisplayName: "Pass Success %",
        Percentage: true,
        Value: NG.getPercentage(teamData.AccuratePasses, teamData.TotalPasses)
    });
    records.Summary.push({
        DisplayName: "Aerial Duel won %",
        Percentage: true,
        Value: NG.getPercentage(teamData.AerialWon, (teamData.AerialWon + teamData.AerialLost))
    });
    records.Summary.push({
        DisplayName: "Average Rating",
        Value: teamData.Rating
    });
    records.Offensive.push({
        DisplayName: "Shots",
        PerMatch: true,
        Value: NG.getAverage(teamData.TotalShots, teamData.GamesPlayed)
    });
    records.Offensive.push({
        DisplayName: "Shots on target",
        PerMatch: true,
        Value: NG.getAverage(teamData.ShotsOnTarget, teamData.GamesPlayed)
    });
    records.Offensive.push({
        DisplayName: "Dribbles won",
        PerMatch: true,
        Value: NG.getAverage(teamData.Dribbles, teamData.GamesPlayed)
    });
    records.Offensive.push({
        DisplayName: "Fouls won",
        PerMatch: true,
        Value: NG.getAverage(teamData.WasFouled, teamData.GamesPlayed)
    });
    records.Offensive.push({
        DisplayName: "Offsides",
        PerMatch: true,
        Value: NG.getAverage(teamData.Offsides, teamData.GamesPlayed)
    });
    records.Defensive.push({
        DisplayName: "Shots conceded",
        PerMatch: true,
        Value: NG.getAverage(teamData.ShotsConcededIBox + teamData.ShotsConcededOBox, teamData.GamesPlayed)
    });
    records.Defensive.push({
        DisplayName: "Shots blocked",
        PerMatch: true,
        Value: NG.getAverage(teamData.ShotsBlocked, teamData.GamesPlayed)
    });
    records.Defensive.push({
        DisplayName: "Tackles",
        PerMatch: true,
        Value: NG.getAverage(teamData.TotalTackle, teamData.GamesPlayed)
    });
    records.Defensive.push({
        DisplayName: "Fouls",
        PerMatch: true,
        Value: NG.getAverage(teamData.WasFouled, teamData.GamesPlayed)
    });
    records.Defensive.push({
        DisplayName: "Interceptions",
        PerMatch: true,
        Value: NG.getAverage(teamData.Interceptions, teamData.GamesPlayed)
    });
    return records;
}
var TeamStageStatsGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: TeamStageGoalsGridModel,
        cache: true
    },
    view: TeamStageTeamStatsGridView,
    sorter: {
        sortInfo: {
            property: "Value",
            direction: "desc"
        }
    }
});

function TeamStageCardsGridModel() {
    this.load = function(data) {
        if (!data) {
            return [];
        }
        var records = [];
        var cards = data.value[0];
        var stats = [0, 0, 0, 0];
        AggresionModel(stats, cards);
        var sum = stats.sum();
        records.push({
            Type: "Fouls",
            Value: stats[0],
            Eff: getPercentage(stats[0], sum)
        });
        records.push({
            Type: "Unprofessional",
            Value: stats[1],
            Eff: getPercentage(stats[1], sum)
        });
        records.push({
            Type: "Dive",
            Value: stats[2],
            Eff: getPercentage(stats[2], sum)
        });
        records.push({
            Type: "Other",
            Value: stats[3],
            Eff: getPercentage(stats[3], sum)
        });
        return records;
    };
}

function TeamStagePassesGridModel() {
    this.load = function(data) {
        if (!data) {
            return [];
        }
        var records = [];
        var passes = data.value[1];
        var teamId = data.params.defaultParams.teamId;
        var teamsPlayed = DataStore.load("ws-stage-stat", {
            parameters: {
                stageId: data.params.defaultParams.stageId,
                type: 25,
                teamId: teamId,
                field: 2,
                against: 0
            },
            cache: true,
            dataType: "array"
        });
        var field = parseInt(data.filter.data.field);
        var stats = [0, 0, 0, 0];
        for (var j = 0; j < passes.length; j++) {
            PassTypesModel(stats, passes[j]);
        }
        var played = teamsPlayed[field];
        var sum = stats.sum();
        records.push({
            Type: "Cross",
            Value: Math.round(stats[0] / played),
            Eff: getPercentage(stats[0], sum)
        });
        records.push({
            Type: "Through ball",
            Value: Math.round(stats[1] / played),
            Eff: getPercentage(stats[1], sum)
        });
        records.push({
            Type: "Long ball",
            Value: Math.round(stats[2] / played),
            Eff: getPercentage(stats[2], sum)
        });
        records.push({
            Type: "Short pass",
            Value: Math.round(stats[3] / played),
            Eff: getPercentage(stats[3], sum)
        });
        return records;
    };
}

function TeamStageGoalsGridModel() {
    this.load = function(data) {
        if (!data) {
            return [];
        }
        var records = [];
        var attempts = data.value[0];
        var stats = [0, 0, 0, 0, 0];
        var contentFilter = {
            goal: {
                index: 0,
                value: "goal"
            }
        };
        for (var j = 0; j < attempts.length; j++) {
            GoalTypesModel(stats, attempts[j], contentFilter);
        }
        var sum = stats.sum();
        records.push({
            Type: "Open Play",
            Value: stats[0],
            Eff: getPercentage(stats[0], sum)
        });
        records.push({
            Type: "Set Piece",
            Value: stats[1],
            Eff: getPercentage(stats[1], sum)
        });
        records.push({
            Type: "Counter Attack",
            Value: stats[2],
            Eff: getPercentage(stats[2], sum)
        });
        records.push({
            Type: "Penalty",
            Value: stats[3],
            Eff: getPercentage(stats[3], sum)
        });
        records.push({
            Type: "Own Goal",
            Value: stats[4],
            Eff: getPercentage(stats[4], sum)
        });
        return records;
    };
}

function getMaxOfField(records, f) {
    var max = 0;
    for (var i = 0; i < records.length; i++) {
        if (max < records[i][f]) {
            max = records[i][f];
        }
    }
    return max;
}

function TeamStageTeamStatsGridView(records) {
    var t = [];
    var values = records.model.records;
    var statsMax = getMaxOfField(values, "Value");
    for (var i = 0; i < values.length; i++) {
        var o = values[i];
        t.push("<tr " + (1 == i % 2 ? 'class="alt"' : "") + ">");
        t.push('<td class="type">' + o.Type + "</td>");
        t.push('<td class="value">');
        var width = (400 / 100) * getPercentage(o.Value, statsMax);
        t.push('<span class="stat-bar-wrapper" style="width: ' + width + 'px;">');
        t.push('<span class="stat-bar rc-r" style="width: 100%;">');
        t.push('<span class="stat-value ' + (0 == width ? "zero" : "") + '">' + o.Value + "</span>");
        t.push("</span>");
        t.push("</td>");
        t.push("<td>" + o.Eff + "%</td>");
        t.push("<tr>");
    }
    return t.join("");
}
var OverallTopTeamStatsSummaryGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: TeamStatsSummaryGridModel,
        cache: true
    },
    view: TeamStatsGridView,
    sorter: {
        sortInfo: {
            property: "Rating",
            direction: "desc",
            isGlobal: true
        }
    }
});
var OverallTopTeamStatsOffensiveGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: TeamStatsOffensiveGridModel,
        cache: true
    },
    view: TeamStatsGridView,
    sorter: {
        sortInfo: {
            property: "Dribbles",
            direction: "desc"
        }
    }
});
var OverallTopTeamStatsDefensiveGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: TeamStatsDefensiveGridModel,
        cache: true
    },
    view: TeamStatsGridView,
    sorter: {
        sortInfo: {
            property: "TotalTackle",
            direction: "desc"
        }
    }
});

function TeamStatsGridBaseModel(teamData) {
    return {
        TeamId: teamData.TeamId,
        TeamName: teamData.TeamName,
        RegionCode: teamData.RegionCode,
        RegionId: teamData.RegionId,
        TournamentId: teamData.TournamentId,
        TournamentName: teamData.TournamentName,
        Ranking: teamData.Ranking,
        StatsAndHoverValues: {}
    };
}

function TeamStatsSummaryGridModel() {
    this.load = function(data) {
        var teams = [];
        var values = data.value;
        if (!values || 0 == values.length) {
            return teams;
        }
        for (var i = 0; i < values.length; i++) {
            var teamData = values[i];
            var team = TeamStatsGridBaseModel(teamData);
            team.StatsAndHoverValues = {
                TotalShots: "Total Shots: {0}".format(teamData.TotalShots),
                Yellow: "",
                Red: "",
                CardPoints: "",
                Possession: "",
                PassSuccess: "Accurate/Total Passes: {0}/{1}".format(teamData.AccuratePasses, teamData.TotalPasses),
                AerialWon: "Won/Total Aerials: {0}/{1}".format(teamData.AerialWon, teamData.AerialWon + teamData.AerialLost),
                Rating: ""
            };
            teams.push(jQuery.extend(true, team, {
                TotalShots: NG.getAverage(teamData.TotalShots, teamData.GamesPlayed, 1),
                Yellow: teamData.Yellow,
                Red: teamData.Red,
                CardPoints: teamData.Yellow + (teamData.Red * 3),
                Possession: NG.getAverage(teamData.Possession, teamData.GamesPlayed, 1),
                PassSuccess: NG.percentage(teamData.AccuratePasses, teamData.TotalPasses, false, 1),
                AerialWon: NG.getAverage(teamData.AerialWon, teamData.GamesPlayed, 1),
                Rating: NG.roundNumber(teamData.Rating, 2)
            }));
        }
        return teams;
    };
}

function TeamStatsOffensiveGridModel() {
    this.load = function(data) {
        var teams = [];
        var values = data.value;
        if (!values || 0 == values.length) {
            return teams;
        }
        for (var i = 0; i < values.length; i++) {
            var teamData = values[i];
            var team = TeamStatsGridBaseModel(teamData);
            team.StatsAndHoverValues = {
                TotalShots: "Total Shots: {0}".format(teamData.TotalShots),
                ShotsOnTarget: "Total Shots on Target: {0}".format(teamData.ShotsOnTarget),
                Dribbles: "Total Successful Dribbles: {0}".format(teamData.Dribbles),
                WasFouled: "Total Fouled: {0}".format(teamData.WasFouled),
                Offsides: "Total Offsides: {0}".format(teamData.Offsides)
            };
            teams.push(jQuery.extend(true, team, {
                TotalShots: NG.getAverage(teamData.TotalShots, teamData.GamesPlayed, 1),
                ShotsOnTarget: NG.getAverage(teamData.ShotsOnTarget, teamData.GamesPlayed, 1),
                Dribbles: NG.getAverage(teamData.Dribbles, teamData.GamesPlayed, 1),
                WasFouled: NG.getAverage(teamData.WasFouled, teamData.GamesPlayed, 1),
                Offsides: NG.getAverage(teamData.Offsides, teamData.GamesPlayed, 1)
            }));
        }
        return teams;
    };
}

function TeamStatsDefensiveGridModel() {
    this.load = function(data) {
        var teams = [];
        var values = data.value;
        if (!values || 0 == values.length) {
            return teams;
        }
        for (var i = 0; i < values.length; i++) {
            var teamData = values[i];
            var team = TeamStatsGridBaseModel(teamData);
            team.StatsAndHoverValues = {
                ShotsConceded: "Total Shots Conceded: {0}".format(teamData.ShotsConcededIBox + teamData.ShotsConcededOBox),
                TotalTackle: "Total Tackles: {0}".format(teamData.TotalTackle),
                Interceptions: "Total Interceptions: {0}".format(teamData.Interceptions),
                Fouls: "Total Fouls: {0}".format(teamData.Fouls)
            };
            teams.push(jQuery.extend(true, team, {
                ShotsConceded: NG.getAverage(teamData.ShotsConcededIBox + teamData.ShotsConcededOBox, teamData.GamesPlayed, 1),
                TotalTackle: NG.getAverage(teamData.TotalTackle, teamData.GamesPlayed, 1),
                Interceptions: NG.getAverage(teamData.Interceptions, teamData.GamesPlayed, 1),
                Fouls: NG.getAverage(teamData.Fouls, teamData.GamesPlayed, 1)
            }));
        }
        teams.sort(function(a, b) {
            return NG.sortNumeric(a.Rating, b.Rating);
        });
        return teams;
    };
}

function TeamStatsGridView(records) {
    function getMaxStat(teams, maxes, f) {
        if (maxes[f]) {
            return maxes[f];
        }
        var max = 0;
        for (var j = 0; j < teams.length; j++) {
            if (teams[i][f]) {
                if (max < teams[j][f]) {
                    max = teams[j][f];
                }
            }
        }
        maxes[f] = max;
        return max;
    }
    var teams = records.model.records;
    var exclude = {
        TeamId: 1,
        TeamName: 1,
        RegionId: 1,
        RegionCode: 1,
        TournamentId: 1,
        TournamentName: 1,
        WRating: 1,
        Yellow: 1,
        Red: 1,
        Ranking: 1
    };
    var useBar = {
        Ads: 1,
        Bp: 1,
        Ps: 1,
        Ds: 1,
        Left: 1,
        Centre: 1,
        Right: 1,
        Ib: 1,
        Ob: 1,
        Isb: 1,
        Def: 1,
        Mid: 1,
        Att: 1
    };
    var maxes = {};
    var t = [];
    teams.sort(function(a, b) {
        return NG.sortNumeric(a.Ranking, b.Ranking);
    });
    for (var i = 0; i < teams.length; i++) {
        var o = teams[i];
        t.push("<tr " + ((1 == i % 2) ? 'class="alt"' : "") + ">");
        t.push('<td class="o">' + o.Ranking + "</td>");
        t.push('<td class="tn"><a href="/Teams/' + o.TeamId + '" class="team-link">' + o.TeamName + "</a></td>");
        t.push('<td class="tournament"><a href="/Regions/' + o.RegionId + "/Tournaments/" + o.TournamentId + '" class="tournament-link iconize iconize-icon-left">' + o.TournamentName + '<span class="ui-icon country flg-' + o.RegionCode + '"></span></a></td>');
        for (var f in o.StatsAndHoverValues) {
            if (!exclude[f]) {
                if ("CardPoints" == f) {
                    t.push('<td class="agg">');
                    t.push('<span class="yellow-card-box">' + o.Yellow + "</span>");
                    t.push('<span class="red-card-box">' + o.Red + "</span>");
                    t.push("</td>");
                } else {
                    if (useBar[f]) {
                        var maxStat = getMaxStat(teams, maxes, f);
                        t.push("<td>" + statBar(50, o[f], getPercentage(o[f], maxStat)) + "</td>");
                    } else {
                        if ("Rating" == f) {
                            t.push('<td><span class="stat-value rating">' + NG.roundNumber(o.Rating, 2) + "</span></td>");
                        } else {
                            t.push('<td title="' + o.StatsAndHoverValues[f] + '" class="' + f.toLowerCase() + '">' + o[f] + "</td>");
                        }
                    }
                }
            }
        }
        t.push("</tr>");
    }
    return t.join("");
}
var TopPlayerStatsSummaryGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsSummaryGridModel,
        cache: true
    },
    view: TopPlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "Rating",
            direction: "desc"
        }
    }
});
var TopPlayerStatsOffensiveGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsOffensiveGridModel,
        cache: true
    },
    view: TopPlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "Rating",
            direction: "desc"
        }
    }
});
var TopPlayerStatsDefensiveGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsDefensiveGridModel,
        cache: true
    },
    view: TopPlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "Rating",
            direction: "desc"
        }
    }
});
var TopPlayerStatsPassingGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsPassingGridModel,
        cache: true
    },
    view: TopPlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "Rating",
            direction: "desc"
        }
    }
});
var PlayerStatsSummaryGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsSummaryGridModel,
        cache: true
    },
    view: PlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "Apps",
            direction: "desc"
        }
    }
});
var PlayerStatsDefensiveGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsDefensiveGridModel,
        cache: true
    },
    view: PlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "Apps",
            direction: "desc"
        }
    }
});
var PlayerStatsOffensiveGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsOffensiveGridModel,
        cache: true
    },
    view: PlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "Apps",
            direction: "desc"
        }
    }
});
var PlayerStatsPassingGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerStatsPassingGridModel,
        cache: true
    },
    view: PlayerStatsGridView,
    sorter: {
        sortInfo: {
            property: "Apps",
            direction: "desc"
        }
    }
});

function PlayerStatsGridBaseModel(playerData) {
    return {
        RegionId: playerData.RegionId,
        RegionCode: playerData.TeamRegionCode,
        TournamentId: playerData.TournamentId,
        TournamentName: playerData.TournamentName,
        StageId: playerData.StageId,
        IsOpta: playerData.IsOpta,
        TeamId: playerData.TeamId,
        TeamName: playerData.TeamName,
        Id: playerData.PlayerId,
        PlayerRegionCode: playerData.RegionCode,
        RealPosition: getRealPosition(playerData.PositionShort),
        PositionLong: playerData.PositionLong,
        PlayerName: playerData.Name,
        GameStarted: playerData.GameStarted,
        SubOn: playerData.SubOn,
        Apps: playerData.GameStarted + playerData.SubOn,
        Age: playerData.Age,
        Height: playerData.Height,
        Weight: playerData.Weight,
        IsCurrentPlayer: playerData.IsCurrentPlayer,
        WeightedRating: playerData.WeightedRating,
        Ranking: playerData.Ranking,
        StatsAndHoverValues: {}
    };
}

function PlayerStatsSummaryGridModel() {
    this.load = function(data) {
        var players = [];
        var values = data.value;
        var isOptaTeam = false;
        if (!values || 0 == values.length) {
            $(document).triggerHandler("team-squad-stats-updated", [isOptaTeam]);
            return players;
        }
        for (var i = 0; i < values.length; i++) {
            var playerData = values[i];
            var player = PlayerStatsGridBaseModel(playerData);
            var apps = (player.GameStarted + player.SubOn);
            if ((0 != apps && playerData.Rating) || isOptaTeam) {
                player.StatsAndHoverValues = {
                    Goals: "",
                    Assists: "",
                    Yellow: "",
                    Red: "",
                    TotalShots: "Total Shots: {0}".format(playerData.TotalShots),
                    PassSuccess: "Accurate/Total Passes: {0}/{1}".format(playerData.AccuratePasses, playerData.TotalPasses),
                    AerialWon: "Won/Total Aerials: {0}/{1}".format(playerData.AerialWon, (playerData.AerialWon + playerData.AerialLost)),
                    ManOfTheMatch: "",
                    Rating: ""
                };
                player.StatParams = [playerData.AccuratePasses, playerData.TotalPasses];
                jQuery.extend(true, player, {
                    Goals: playerData.Goals,
                    Assists: playerData.Assists,
                    Yellow: playerData.Yellow,
                    Red: playerData.Red,
                    TotalShots: NG.getAverage(playerData.TotalShots, apps, 1),
                    PassSuccess: NG.percentage(playerData.AccuratePasses, playerData.TotalPasses, false, 1),
                    AerialWon: NG.getAverage(playerData.AerialWon, apps, 1),
                    ManOfTheMatch: playerData.ManOfTheMatch,
                    Rating: NG.roundNumber(playerData.Rating, 2)
                });
                isOptaTeam = true;
            } else {
                player.StatsAndHoverValues = {
                    Goals: "",
                    Yellow: "",
                    Red: ""
                };
                player.Goals = playerData.Goals;
                player.Yellow = playerData.Yellow;
                player.Red = playerData.Red;
            }
            players.push(player);
        }
        $(document).triggerHandler("team-squad-stats-updated", [isOptaTeam]);
        return players;
    };
}

function PlayerStatsOffensiveGridModel() {
    this.load = function(data) {
        var players = [];
        var values = data.value;
        var isOptaTeam = false;
        if (!values || 0 == values.length) {
            $(document).triggerHandler("team-squad-stats-updated", [isOptaTeam]);
            return players;
        }
        for (var i = 0; i < values.length; i++) {
            var playerData = values[i];
            var player = PlayerStatsGridBaseModel(playerData);
            var apps = (player.GameStarted + player.SubOn);
            player.Goals = playerData.Goals;
            if ((0 != apps && playerData.Rating) || isOptaTeam) {
                player.StatsAndHoverValues = {
                    Goals: "",
                    Assists: "",
                    TotalShots: "Total Shots: {0}".format(playerData.TotalShots),
                    KeyPasses: "Total Key Passes: {0}".format(playerData.KeyPasses),
                    Dribbles: "Total Successful Dribbles: {0}".format(playerData.Dribbles),
                    WasFouled: "Total Fouled: {0}".format(playerData.WasFouled),
                    Offsides: "Total Offsides: {0}".format(playerData.Offsides),
                    Dispossesed: "Total Dispossessed: {0}".format(playerData.Dispossesed),
                    Turnovers: "Total Turnovers: {0}".format(playerData.Turnovers),
                    Rating: ""
                };
                jQuery.extend(true, player, {
                    Assists: playerData.Assists,
                    TotalShots: NG.getAverage(playerData.TotalShots, apps, 1),
                    KeyPasses: NG.getAverage(playerData.KeyPasses, apps, 1),
                    Dribbles: NG.getAverage(playerData.Dribbles, apps, 1),
                    WasFouled: NG.getAverage(playerData.WasFouled, apps, 1),
                    Offsides: NG.getAverage(playerData.Offsides, apps, 1),
                    Dispossesed: NG.getAverage(playerData.Dispossesed, apps, 1),
                    Turnovers: NG.getAverage(playerData.Turnovers, apps, 1),
                    Rating: NG.roundNumber(playerData.Rating, 2)
                });
                isOptaTeam = true;
            }
            players.push(player);
        }
        $(document).triggerHandler("team-squad-stats-updated", [isOptaTeam]);
        return players;
    };
}

function PlayerStatsPassingGridModel() {
    this.load = function(data) {
        var players = [];
        var values = data.value;
        var isOptaTeam = false;
        if (!values || 0 == values.length) {
            $(document).triggerHandler("team-squad-stats-updated", [isOptaTeam]);
            return players;
        }
        for (var i = 0; i < values.length; i++) {
            var playerData = values[i];
            var player = PlayerStatsGridBaseModel(playerData);
            var apps = (player.GameStarted + player.SubOn);
            if ((0 != apps && playerData.Rating) || isOptaTeam) {
                player.StatsAndHoverValues = {
                    Assists: "",
                    KeyPasses: "Total Key Passes: {0}".format(playerData.KeyPasses),
                    TotalPasses: "Total Passes: {0}".format(playerData.TotalPasses),
                    PassSuccess: "Accurate/Total Passes: {0}/{1}".format(playerData.AccuratePasses, playerData.TotalPasses),
                    AccurateCrosses: "Accurate/Total Crosses: {0}/{1}".format(playerData.AccurateCrosses, playerData.TotalCrosses),
                    AccurateLongBalls: "Accurate/Total Longballs: {0}/{1}".format(playerData.AccurateLongBalls, playerData.TotalLongBalls),
                    AccurateThroughBalls: "Accurate/Total Throughballs: {0}/{1}".format(playerData.AccurateThroughBalls, playerData.TotalThroughBalls),
                    Rating: ""
                };
                player.StatParams = [playerData.AccuratePasses, playerData.TotalPasses];
                jQuery.extend(true, player, {
                    Assists: playerData.Assists,
                    KeyPasses: NG.getAverage(playerData.KeyPasses, apps, 1),
                    TotalPasses: NG.getAverage(playerData.TotalPasses, apps, 1),
                    PassSuccess: NG.percentage(playerData.AccuratePasses, playerData.TotalPasses, false, 1),
                    AccurateCrosses: NG.getAverage(playerData.AccurateCrosses, apps, 1),
                    AccurateLongBalls: NG.getAverage(playerData.AccurateLongBalls, apps, 1),
                    AccurateThroughBalls: NG.getAverage(playerData.AccurateThroughBalls, apps, 1),
                    Rating: NG.roundNumber(playerData.Rating, 2)
                });
                isOptaTeam = true;
            }
            players.push(player);
        }
        $(document).triggerHandler("team-squad-stats-updated", [isOptaTeam]);
        return players;
    };
}

function PlayerStatsDefensiveGridModel() {
    this.load = function(data) {
        var players = [];
        var values = data.value;
        var isOptaTeam = false;
        if (!values || 0 == values.length) {
            $(document).triggerHandler("team-squad-stats-updated", [isOptaTeam]);
            return players;
        }
        for (var i = 0; i < values.length; i++) {
            var playerData = values[i];
            var player = PlayerStatsGridBaseModel(playerData);
            var apps = (player.GameStarted + player.SubOn);
            if ((0 != apps && playerData.Rating) || isOptaTeam) {
                player.StatsAndHoverValues = {
                    TotalTackles: "Total Tackles: {0}".format(playerData.TotalTackles),
                    Interceptions: "Total Interceptions: {0}".format(playerData.Interceptions),
                    Fouls: "Total Fouls: {0}".format(playerData.Fouls),
                    OffsidesWon: "Total Offsides Won: {0}".format(playerData.OffsidesWon),
                    TotalClearances: "Total Clearances: {0}".format(playerData.TotalClearances),
                    WasDribbled: "Total Dribbled by other players: {0}".format(playerData.WasDribbled),
                    ShotsBlocked: "Total Shots Blocked: {0}".format(playerData.ShotsBlocked),
                    OwnGoals: "",
                    Rating: ""
                };
                jQuery.extend(true, player, {
                    TotalTackles: NG.getAverage(playerData.TotalTackles, apps, 1),
                    Interceptions: NG.getAverage(playerData.Interceptions, apps, 1),
                    Fouls: NG.getAverage(playerData.Fouls, apps, 1),
                    OffsidesWon: NG.getAverage(playerData.OffsidesWon, apps, 1),
                    TotalClearances: NG.getAverage(playerData.TotalClearances, apps, 1),
                    WasDribbled: NG.getAverage(playerData.WasDribbled, apps, 1),
                    ShotsBlocked: NG.getAverage(playerData.ShotsBlocked, apps, 1),
                    OwnGoals: playerData.OwnGoals,
                    Rating: NG.roundNumber(playerData.Rating, 2)
                });
                isOptaTeam = true;
            }
            players.push(player);
        }
        $(document).triggerHandler("team-squad-stats-updated", [isOptaTeam]);
        return players;
    };
}

function PlayerHistoryStatsGridBaseModel(playerData) {
    return {
        RegionId: playerData.RegionId,
        RegionCode: playerData.TeamRegionCode,
        TournamentId: playerData.TournamentId,
        TournamentName: playerData.TournamentName,
        StageId: playerData.StageId,
        IsOpta: playerData.IsOpta,
        TeamId: playerData.TeamId,
        TeamName: playerData.TeamName,
        Id: playerData.PlayerId,
        PlayerRegionCode: playerData.RegionCode,
        RealPosition: getRealPosition(playerData.PositionShort),
        PositionLong: playerData.PositionLong,
        PlayerName: playerData.Name,
        GameStarted: playerData.GameStarted,
        SubOn: playerData.SubOn,
        Apps: playerData.GameStarted + playerData.SubOn,
        Age: playerData.Age,
        Height: playerData.Height,
        Weight: playerData.Weight,
        IsCurrentPlayer: playerData.IsCurrentPlayer,
        WeightedRating: playerData.WeightedRating,
        Ranking: playerData.Ranking,
        TournamentShortName: playerData.TournamentShortName,
        SeasonName: playerData.SeasonName,
        SeasonId: playerData.SeasonId,
        StatsAndHoverValues: {}
    };
}
var PlayerHistoricalStatsSummaryGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerHistoryStatsSummaryGridModel,
        cache: true
    },
    view: PlayerHistoryStatsGridView
});
var PlayerHistoricalStatsDefensiveGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerHistoryStatsDefensiveGridModel,
        cache: true
    },
    view: PlayerHistoryStatsGridView
});
var PlayerHistoricalStatsOffensiveGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerHistoryStatsOffensiveGridModel,
        cache: true
    },
    view: PlayerHistoryStatsGridView
});
var PlayerHistoricalStatsPassingGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: PlayerHistoryStatsPassingGridModel,
        cache: true
    },
    view: PlayerHistoryStatsGridView
});

function PlayerHistoryStatsSummaryGridModel() {
    this.load = function(data) {
        var players = [];
        var values = data.value;
        var isOptaTeam = false;
        if (!values || 0 == values.length) {
            $(document).triggerHandler("team-squad-stats-updated", [isOptaTeam]);
            return players;
        }
        for (var i = 0; i < values.length; i++) {
            var playerData = values[i];
            var player = PlayerHistoryStatsGridBaseModel(playerData);
            var apps = (player.GameStarted + player.SubOn);
            if ((0 != apps && playerData.Rating) || isOptaTeam) {
                player.StatsAndHoverValues = {
                    Goals: "",
                    Assists: "",
                    Yellow: "",
                    Red: "",
                    TotalShots: "Total Shots: {0}".format(playerData.TotalShots),
                    PassSuccess: "Accurate/Total Passes: {0}/{1}".format(playerData.AccuratePasses, playerData.TotalPasses),
                    AerialWon: "Won/Total Aerials: {0}/{1}".format(playerData.AerialWon, (playerData.AerialWon + playerData.AerialLost)),
                    ManOfTheMatch: "",
                    Rating: ""
                };
                player.StatParams = [playerData.AccuratePasses, playerData.TotalPasses];
                jQuery.extend(true, player, {
                    Goals: playerData.Goals,
                    Assists: playerData.Assists,
                    Yellow: playerData.Yellow,
                    Red: playerData.Red,
                    TotalShots: NG.getAverage(playerData.TotalShots, apps, 1),
                    PassSuccess: NG.percentage(playerData.AccuratePasses, playerData.TotalPasses, false, 1),
                    AerialWon: NG.getAverage(playerData.AerialWon, apps, 1),
                    ManOfTheMatch: playerData.ManOfTheMatch,
                    Rating: NG.roundNumber(playerData.Rating, 2)
                });
                isOptaTeam = true;
            } else {
                player.StatsAndHoverValues = {
                    Goals: "",
                    Yellow: "",
                    Red: ""
                };
                player.Goals = playerData.Goals;
                player.Yellow = playerData.Yellow;
                player.Red = playerData.Red;
            }
            players.push(player);
        }
        $(document).triggerHandler("player-tournament-stats-summary-updated", [isOptaTeam]);
        return players;
    };
}

function PlayerHistoryStatsOffensiveGridModel() {
    this.load = function(data) {
        var players = [];
        var values = data.value;
        var isOptaTeam = false;
        if (!values || 0 == values.length) {
            $(document).triggerHandler("team-squad-stats-updated", [isOptaTeam]);
            return players;
        }
        for (var i = 0; i < values.length; i++) {
            var playerData = values[i];
            var player = PlayerHistoryStatsGridBaseModel(playerData);
            var apps = (player.GameStarted + player.SubOn);
            player.Goals = playerData.Goals;
            if ((0 != apps && playerData.Rating) || isOptaTeam) {
                player.StatsAndHoverValues = {
                    Goals: "",
                    Assists: "",
                    TotalShots: "Total Shots: {0}".format(playerData.TotalShots),
                    KeyPasses: "Total Key Passes: {0}".format(playerData.KeyPasses),
                    Dribbles: "Total Successful Dribbles: {0}".format(playerData.Dribbles),
                    WasFouled: "Total Fouled: {0}".format(playerData.WasFouled),
                    Offsides: "Total Offsides: {0}".format(playerData.Offsides),
                    Dispossesed: "Total Dispossessed: {0}".format(playerData.Dispossesed),
                    Turnovers: "Total Turnovers: {0}".format(playerData.Turnovers),
                    Rating: ""
                };
                jQuery.extend(true, player, {
                    Assists: playerData.Assists,
                    TotalShots: NG.getAverage(playerData.TotalShots, apps, 1),
                    KeyPasses: NG.getAverage(playerData.KeyPasses, apps, 1),
                    Dribbles: NG.getAverage(playerData.Dribbles, apps, 1),
                    WasFouled: NG.getAverage(playerData.WasFouled, apps, 1),
                    Offsides: NG.getAverage(playerData.Offsides, apps, 1),
                    Dispossesed: NG.getAverage(playerData.Dispossesed, apps, 1),
                    Turnovers: NG.getAverage(playerData.Turnovers, apps, 1),
                    Rating: NG.roundNumber(playerData.Rating, 2)
                });
                isOptaTeam = true;
            }
            players.push(player);
        }
        $(document).triggerHandler("player-tournament-stats-offensive-updated", [isOptaTeam]);
        return players;
    };
}

function PlayerHistoryStatsPassingGridModel() {
    this.load = function(data) {
        var players = [];
        var values = data.value;
        var isOptaTeam = false;
        if (!values || 0 == values.length) {
            $(document).triggerHandler("team-squad-stats-updated", [isOptaTeam]);
            return players;
        }
        for (var i = 0; i < values.length; i++) {
            var playerData = values[i];
            var player = PlayerHistoryStatsGridBaseModel(playerData);
            var apps = (player.GameStarted + player.SubOn);
            if ((0 != apps && playerData.Rating) || isOptaTeam) {
                player.StatsAndHoverValues = {
                    Assists: "",
                    KeyPasses: "Total Key Passes: {0}".format(playerData.KeyPasses),
                    TotalPasses: "Total Passes: {0}".format(playerData.TotalPasses),
                    PassSuccess: "Accurate/Total Passes: {0}/{1}".format(playerData.AccuratePasses, playerData.TotalPasses),
                    AccurateCrosses: "Accurate/Total Crosses: {0}/{1}".format(playerData.AccurateCrosses, playerData.TotalCrosses),
                    AccurateLongBalls: "Accurate/Total Longballs: {0}/{1}".format(playerData.AccurateLongBalls, playerData.TotalLongBalls),
                    AccurateThroughBalls: "Accurate/Total Throughballs: {0}/{1}".format(playerData.AccurateThroughBalls, playerData.TotalThroughBalls),
                    Rating: ""
                };
                player.StatParams = [playerData.AccuratePasses, playerData.TotalPasses];
                jQuery.extend(true, player, {
                    Assists: playerData.Assists,
                    KeyPasses: NG.getAverage(playerData.KeyPasses, apps, 1),
                    TotalPasses: NG.getAverage(playerData.TotalPasses, apps, 1),
                    PassSuccess: NG.percentage(playerData.AccuratePasses, playerData.TotalPasses, false, 1),
                    AccurateCrosses: NG.getAverage(playerData.AccurateCrosses, apps, 1),
                    AccurateLongBalls: NG.getAverage(playerData.AccurateLongBalls, apps, 1),
                    AccurateThroughBalls: NG.getAverage(playerData.AccurateThroughBalls, apps, 1),
                    Rating: NG.roundNumber(playerData.Rating, 2)
                });
                isOptaTeam = true;
            }
            players.push(player);
        }
        $(document).triggerHandler("player-tournament-stats-passing-updated", [isOptaTeam]);
        return players;
    };
}

function PlayerHistoryStatsDefensiveGridModel() {
    this.load = function(data) {
        var players = [];
        var values = data.value;
        var isOptaTeam = false;
        if (!values || 0 == values.length) {
            $(document).triggerHandler("team-squad-stats-updated", [isOptaTeam]);
            return players;
        }
        for (var i = 0; i < values.length; i++) {
            var playerData = values[i];
            var player = PlayerHistoryStatsGridBaseModel(playerData);
            var apps = (player.GameStarted + player.SubOn);
            if ((0 != apps && playerData.Rating) || isOptaTeam) {
                player.StatsAndHoverValues = {
                    TotalTackles: "Total Tackles: {0}".format(playerData.TotalTackles),
                    Interceptions: "Total Interceptions: {0}".format(playerData.Interceptions),
                    Fouls: "Total Fouls: {0}".format(playerData.Fouls),
                    OffsidesWon: "Total Offsides Won: {0}".format(playerData.OffsidesWon),
                    TotalClearances: "Total Clearances: {0}".format(playerData.TotalClearances),
                    WasDribbled: "Total Dribbled by other players: {0}".format(playerData.WasDribbled),
                    ShotsBlocked: "Total Shots Blocked: {0}".format(playerData.ShotsBlocked),
                    OwnGoals: "",
                    Rating: ""
                };
                jQuery.extend(true, player, {
                    TotalTackles: NG.getAverage(playerData.TotalTackles, apps, 1),
                    Interceptions: NG.getAverage(playerData.Interceptions, apps, 1),
                    Fouls: NG.getAverage(playerData.Fouls, apps, 1),
                    OffsidesWon: NG.getAverage(playerData.OffsidesWon, apps, 1),
                    TotalClearances: NG.getAverage(playerData.TotalClearances, apps, 1),
                    WasDribbled: NG.getAverage(playerData.WasDribbled, apps, 1),
                    ShotsBlocked: NG.getAverage(playerData.ShotsBlocked, apps, 1),
                    OwnGoals: playerData.OwnGoals,
                    Rating: NG.roundNumber(playerData.Rating, 2)
                });
                isOptaTeam = true;
            }
            players.push(player);
        }
        $(document).triggerHandler("player-tournament-stats-defensive-updated", [isOptaTeam]);
        return players;
    };
}

function TopPlayerStatsGridView(records) {
    var t = [];
    var players = records.model.records;
    players.sort(function(a, b) {
        return NG.sortNumeric(a.Ranking, b.Ranking);
    });
    for (var i = 0; i < players.length; i++) {
        var o = players[i];
        t.push("<tr " + ((1 == i % 2) ? 'class="alt"' : "") + ">");
        t.push('<td class="o">' + o.Ranking + "</td>");
        t.push('<td class="rgn"><span class="ui-icon country flg-' + o.PlayerRegionCode + '"></span></td>');
        t.push('<td class="pn">' + WS.PlayerLink(o.Id, o.PlayerName) + "</td>");
        t.push('<td class="tn"><a href="/Teams/' + o.TeamId + '" class="team-link iconize iconize-icon-left"><span class="team-name">' + o.TeamName + '</span><span class="ui-icon country flg-' + o.RegionCode + '"></span></a></td>');
        t.push('<td class="pos" title="' + o.PositionLong + '">' + (o.RealPosition ? o.RealPosition.substring(1, o.RealPosition.length) : "-") + "</td>");
        t.push('<td class="ap" title="Total Appearances: ' + o.Apps + '">' + "{0}{1}".format(o.GameStarted, 0 != o.SubOn ? "({0})".format(o.SubOn) : "") + "</td>");
        for (var statName in o.StatsAndHoverValues) {
            t.push('<td class="{0}" title="{2}">{1}</td>'.format(statName.toLowerCase(), o[statName], o.StatsAndHoverValues[statName]));
        }
    }
    return t.join("");
}

function TeamPlayerStatsGridView(records) {
    var t = [];
    var players = records.model.records;
    for (var i = 0; i < players.length; i++) {
        var o = players[i];
        t.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + "" + (!o.IsCurrentPlayer ? " not-current-player" : "") + '">');
        t.push('<td class="o">' + (i + 1) + "</td>");
        t.push('<td class="rgn"><span class="ui-icon country flg-' + o.PlayerRegionCode + '"></span></td>');
        t.push('<td class="pn">' + WS.PlayerLink(o.Id, o.PlayerName) + "</td>");
        t.push('<td class="pos" title="' + o.PositionLong.replace("/", ",") + '">' + (o.RealPosition ? o.RealPosition.substring(1, o.RealPosition.length) : "-") + "</td>");
        t.push('<td class="age">' + o.Age + "</td>");
        t.push('<td class="hg">' + o.Height + "</td>");
        t.push('<td class="wg">' + o.Weight + "</td>");
        t.push('<td class="ap" title="Total Appearances: ' + o.Apps + '">' + "{0}{1}".format(o.GameStarted, 0 != o.SubOn ? "({0})".format(o.SubOn) : "") + "</td>");
        for (var statName in o.StatsAndHoverValues) {
            t.push('<td class="{0}" title="{2}">{1}</td>'.format(statName.toLowerCase(), o[statName], o.StatsAndHoverValues[statName]));
        }
    }
    return t.join("");
}

function H2HPlayerStatsGridView(records) {
    var t = [];
    var players = records.model.records;
    for (var i = 0; i < players.length; i++) {
        var o = players[i];
        t.push("<tr " + ((1 == i % 2) ? 'class="alt"' : "") + ">");
        t.push('<td class="o">' + (i + 1) + "</td>");
        t.push('<td class="rgn"><span class="ui-icon country flg-' + o.PlayerRegionCode + '"></span></td>');
        t.push('<td class="pn">' + WS.PlayerLink(o.Id, o.PlayerName) + "</td>");
        t.push('<td class="tn"><a href="/Teams/' + o.TeamId + '" class="team-link iconize"><span class="team-name">' + o.TeamName + "</span></a></td>");
        t.push('<td class="pos" title="' + o.PositionLong + '">' + (o.RealPosition ? o.RealPosition.substring(1, o.RealPosition.length) : "-") + "</td>");
        t.push('<td class="hg">' + o.Height + "</td>");
        t.push('<td class="wg">' + o.Weight + "</td>");
        t.push('<td class="ap" title="Total Appearances: ' + o.Apps + '">' + "{0}{1}".format(o.GameStarted, 0 != o.SubOn ? "({0})".format(o.SubOn) : "") + "</td>");
        for (var statName in o.StatsAndHoverValues) {
            t.push('<td class="{0}" title="{2}">{1}</td>'.format(statName.toLowerCase(), o[statName], o.StatsAndHoverValues[statName]));
        }
    }
    return t.join("");
}

function StagePlayerStatsGridView(records) {
    var t = [];
    var players = records.model.records;
    for (var i = 0; i < players.length; i++) {
        var o = players[i];
        t.push("<tr " + ((1 == i % 2) ? 'class="alt"' : "") + ">");
        t.push('<td class="o">' + o.Ranking + "</td>");
        t.push('<td class="rgn"><span class="ui-icon country flg-' + o.PlayerRegionCode + '"></span></td>');
        t.push('<td class="pn">' + WS.PlayerLink(o.Id, o.PlayerName) + "</td>");
        t.push('<td class="tn"><a href="/Teams/' + o.TeamId + '" class="team-link iconize"><span class="team-name">' + o.TeamName + "</span></a></td>");
        t.push('<td class="pos" title="' + o.PositionLong + '">' + (o.RealPosition ? o.RealPosition.substring(1, o.RealPosition.length) : "-") + "</td>");
        t.push('<td class="ap" title="Total Appearances: ' + o.Apps + '">' + "{0}{1}".format(o.GameStarted, 0 != o.SubOn ? "({0})".format(o.SubOn) : "") + "</td>");
        for (var statName in o.StatsAndHoverValues) {
            t.push('<td class="{0}" title="{2}">{1}</td>'.format(statName.toLowerCase(), o[statName], o.StatsAndHoverValues[statName]));
        }
    }
    return t.join("");
}

function PlayerStatsGridView(records) {
    var t = [];
    var tournaments = records.model.records;
    var maxNumberOfStats = 0;
    var hasOpta = false;

    function setParams() {
        for (var i = 0; i < tournaments.length; i++) {
            var o = tournaments[i];
            var l = NG.JsonLength(o.StatsAndHoverValues);
            if (maxNumberOfStats < l) {
                maxNumberOfStats = l;
            }
            if (o.IsOpta) {
                hasOpta = true;
            }
        }
    }
    setParams();
    for (var i = 0; i < tournaments.length; i++) {
        var o = tournaments[i];
        t.push("<tr " + ((1 == i % 2) ? 'class="alt"' : "") + ">");
        t.push('<td class="tournament">');
        t.push(WS.TournamentLink(o.RegionId, o.PlayerRegionCode, o.TournamentId, o.TournamentName));
        if (o.IsOpta) {
            t.push("*");
        }
        if (!o.IsCurrentPlayer) {
            t.push("({0})".format(WS.TeamLink(o.TeamId, getShortDisplayName(o.TeamName), "info")));
        }
        t.push("</td>");
        t.push('<td class="ap" title="Total Appearances: ' + o.Apps + '">' + "{0}{1}".format(o.GameStarted, 0 != o.SubOn ? "({0})".format(o.SubOn) : "") + "</td>");
        if (o.IsOpta) {
            var statParamsStr = [];
            if (o.StatParams) {
                for (var j = 0; j < o.StatParams.length; j++) {
                    statParamsStr.push('data-{0}="{1}"'.format(j, o.StatParams[j]));
                }
            }
            for (var statName in o.StatsAndHoverValues) {
                t.push('<td class="{0}" title="{2}" {3}>{1}</td>'.format(statName.toLowerCase(), o[statName], o.StatsAndHoverValues[statName], statParamsStr.join(" ")));
            }
        } else {
            if (o.Yellow) {
                t.push('<td class="goals" title="">{0}</td>'.format(o.Goals));
                if (hasOpta) {
                    t.push('<td class="assists"><span class="not-available">N/A</span></td>');
                }
                t.push('<td class="yellow" title="Yellow Cards">{0}</td>'.format(o.Yellow));
                t.push('<td class="red" title="Red Cards">{0}</td>'.format(o.Red));
                if (0 != maxNumberOfStats) {
                    for (var j = 0; j < (maxNumberOfStats - 4); j++) {
                        t.push('<td><span class="not-available">N/A</span></td>');
                    }
                }
            } else {
                var fillIns = maxNumberOfStats;
                if (o.Goals) {
                    t.push('<td class="goals" title="">{0}</td>'.format(o.Goals));
                    fillIns--;
                }
                if (0 != fillIns) {
                    for (var j = 0; j < (fillIns); j++) {
                        t.push('<td><span class="not-available">N/A</span></td>');
                    }
                }
            }
        }
    }
    return t.join("");
}

function PlayerHistoryStatsGridView(records) {
    var t = [];
    var tournaments = records.model.records;
    var maxNumberOfStats = 0;
    var hasOpta = false;

    function setParams() {
        for (var i = 0; i < tournaments.length; i++) {
            var o = tournaments[i];
            var l = NG.JsonLength(o.StatsAndHoverValues);
            if (maxNumberOfStats < l) {
                maxNumberOfStats = l;
            }
            if (o.IsOpta) {
                hasOpta = true;
            }
        }
    }
    setParams();
    for (var i = 0; i < tournaments.length; i++) {
        var o = tournaments[i];
        t.push("<tr " + ((1 == i % 2) ? 'class="alt"' : "") + ">");
        t.push('<td class="tournament">{0}</td>'.format(o.SeasonName));
        t.push('<td class="tournament">');
        t.push("{0}".format(WS.TeamLink(o.TeamId, getShortDisplayName(o.TeamName), "")));
        t.push("</td>");
        t.push('<td class="tournament">');
        t.push(WS.TournamentHistoryLink(o.RegionId, o.PlayerRegionCode, o.TournamentId, o.TournamentShortName, o.SeasonId, "", o.TournamentName + " ({0})".format(o.SeasonName)));
        t.push("</td>");
        t.push('<td class="ap" title="Total Appearances: ' + o.Apps + '">' + "{0}{1}".format(o.GameStarted, 0 != o.SubOn ? "({0})".format(o.SubOn) : "") + "</td>");
        if (o.IsOpta) {
            var statParamsStr = [];
            if (o.StatParams) {
                for (var j = 0; j < o.StatParams.length; j++) {
                    statParamsStr.push('data-{0}="{1}"'.format(j, o.StatParams[j]));
                }
            }
            for (var statName in o.StatsAndHoverValues) {
                t.push('<td class="{0}" title="{2}" {3}>{1}</td>'.format(statName.toLowerCase(), o[statName], o.StatsAndHoverValues[statName], statParamsStr.join(" ")));
            }
        } else {
            if (o.Yellow) {
                t.push('<td class="goals" title="">{0}</td>'.format(o.Goals));
                if (hasOpta) {
                    t.push('<td class="assists"><span class="not-available">N/A</span></td>');
                }
                t.push('<td class="yellow" title="Yellow Cards">{0}</td>'.format(o.Yellow));
                t.push('<td class="red" title="Red Cards">{0}</td>'.format(o.Red));
                if (0 != maxNumberOfStats) {
                    for (var j = 0; j < (maxNumberOfStats - 4); j++) {
                        t.push('<td><span class="not-available">N/A</span></td>');
                    }
                }
            } else {
                var fillIns = maxNumberOfStats;
                if (o.Goals) {
                    t.push('<td class="goals" title="">{0}</td>'.format(o.Goals));
                    fillIns--;
                }
                if (0 != fillIns) {
                    for (var j = 0; j < (fillIns); j++) {
                        t.push('<td><span class="not-available">N/A</span></td>');
                    }
                }
            }
        }
    }
    return t.join("");
}

function LiveTopPerformingPlayersPresenter(config) {
    var $view;
    init();

    function init() {
        $view = $(config.view.renderTo);
    }
    this.load = function(data) {
        var model = new LiveTopPerformingPlayersModel(data);
        if (model) {
            $view.html(LiveTopPerformingPlayersView(model));
        }
    };
}

function LiveTopPerformingPlayersModel(data) {
    function getStatValue(stats, statDisplayName) {
        if (!stats) {
            return 0;
        }
        for (var i = 0; i < stats.length; i++) {
            if (statDisplayName == stats[i].DisplayName && stats[i].Value != undefined) {
                return stats[i].Value;
            }
        }
        return 0;
    }
    if (!data) {
        return;
    }
    if (2 != data.length) {
        return;
    }
    var allPlayers = [];
    data[0][4].forEach(function(playerData) {
        allPlayers.push(jQuery.extend({
            TeamId: data[0][0],
            TeamName: data[0][1]
        }, new LivePlayerModel(playerData)));
    });
    data[1][4].forEach(function(playerData) {
        allPlayers.push(jQuery.extend({
            TeamId: data[1][0],
            TeamName: data[1][1]
        }, new LivePlayerModel(playerData)));
    });
    var results = {
        Ratings: [],
        TotalShots: [],
        Tackles: [],
        Dribbles: []
    };
    results.Ratings = allPlayers.where(function(a) {
        return a.Rating && 0 != a.Rating;
    }).sort(function(a, b) {
        if (a.IsManOfTheMatch > 0) {
            return -1;
        }
        if (b.IsManOfTheMatch > 0) {
            return 1;
        }
        return NG.sortNumeric(a.Rating, b.Rating) * (-1);
    }).slice(0, 5);
    results.TotalShots = allPlayers.where(function(a) {
        return 0 != getStatValue(a.Stats, "Total Shots");
    }).sort(function(a, b) {
        var aValue = getStatValue(a.Stats, "Total Shots");
        var bValue = getStatValue(b.Stats, "Total Shots");
        a.TotalShots = aValue;
        b.TotalShots = bValue;
        return NG.sortNumeric(aValue, bValue) * (-1);
    }).slice(0, 5);
    results.Tackles = allPlayers.where(function(a) {
        return 0 != getStatValue(a.Stats, "Tackles");
    }).sort(function(a, b) {
        var aValue = getStatValue(a.Stats, "Tackles");
        var bValue = getStatValue(b.Stats, "Tackles");
        a.Tackles = aValue;
        b.Tackles = bValue;
        return NG.sortNumeric(aValue, bValue) * (-1);
    }).slice(0, 5);
    results.Dribbles = allPlayers.where(function(a) {
        return 0 != getStatValue(a.Stats, "Dribbles Won");
    }).sort(function(a, b) {
        var aValue = getStatValue(a.Stats, "Dribbles Won");
        var bValue = getStatValue(b.Stats, "Dribbles Won");
        a.Dribbles = aValue;
        b.Dribbles = bValue;
        return NG.sortNumeric(aValue, bValue) * (-1);
    }).slice(0, 5);
    return results;
}

function LiveTopPerformingPlayersView(records) {
    var t = [];
    if (!records) {
        return t.join("");
    }
    var listConfig = {
        view: {
            options: {
                displayFunction: function(player) {
                    return WS.TeamEmblemUrl(player.TeamId, player.TeamName) + '<span title="' + player.Name + '" class="player">' + WS.PlayerLink(player.Id, player.Name) + "</span>" + (1 == player.SubstitutionType ? '<span class="incidents-icon ui-icon subst-out"></span>' : "") + '<span class="info"> (' + player.PositionText + ")</span>" + (player.IsManOfTheMatch ? '<span style="margin-left: 0.2em;" class="incident-wrapper"><span class="incidents-icon ui-icon mom" title="Man of the Match"></span></span>' : "");
                }
            }
        }
    };
    var statDisplayFunctionTemplate = function(player, statValueType, clazz) {
        if (undefined == player[statValueType]) {
            return "";
        }
        return '<span class="stat-value number ' + (clazz ? clazz : "") + (1 == player.SubstitutionType ? " is-substituted" : " is-inplay") + '">' + (statValueType == "Rating" ? player[statValueType].toFixed(1) : player[statValueType]) + "</span>";
    };
    t.push('<table class="ws-list-grid with-two-cols">');
    t.push("<tbody>");
    t.push("<tr>");
    if (0 != records.Ratings.length) {
        t.push('<td class="col">');
        t.push(new WS.List(jQuery.extend({}, listConfig, {
            titles: ["Rating", "", ""],
            statTypes: ["Rating"],
            statDisplayFunction: function(player) {
                return statDisplayFunctionTemplate(player, "Rating", "rating");
            }
        })).getHtml(records.Ratings));
        t.push("</td>");
    }
    t.push("</tr>");
    t.push("<tr>");
    if (0 != records.TotalShots.length) {
        t.push('<td class="col">');
        t.push(new WS.List(jQuery.extend({}, listConfig, {
            titles: ["Total Shots", "", ""],
            statTypes: ["TotalShots"],
            statDisplayFunction: function(player) {
                return statDisplayFunctionTemplate(player, "TotalShots");
            }
        })).getHtml(records.TotalShots));
        t.push("</td>");
    }
    t.push("</tr>");
    t.push("<tr>");
    if (0 != records.Tackles.length) {
        t.push('<td class="col">');
        t.push(new WS.List(jQuery.extend({}, listConfig, {
            titles: ["Tackles", "", ""],
            statTypes: ["Tackles"],
            statDisplayFunction: function(player) {
                return statDisplayFunctionTemplate(player, "Tackles");
            }
        })).getHtml(records.Tackles));
        t.push("</td>");
    }
    t.push("</tr>");
    t.push("<tr>");
    if (0 != records.Dribbles.length) {
        t.push('<td class="col">');
        t.push(new WS.List(jQuery.extend({}, listConfig, {
            titles: ["Dribbles", "", ""],
            statTypes: ["Dribbles"],
            statDisplayFunction: function(player) {
                return statDisplayFunctionTemplate(player, "Dribbles");
            }
        })).getHtml(records.Dribbles));
        t.push("</td>");
    }
    t.push("</tr>");
    t.push("</tbody>");
    t.push("</table>");
    return t.join("");
}
WS = WS || {};
WS.Betting = {};
WS.Betting.ComparisionView = {
    "clash": function(records, options) {
        function findSumAndMaxOfValues(records) {
            var max = 0;
            var homeSum = 0;
            var awaySum = 0;
            for (var i = 0; i < records.length; i++) {
                if (max < records[i].home.Value) {
                    max = records[i].home.Value;
                }
                if (max < records[i].away.Value) {
                    max = records[i].away.Value;
                }
                homeSum += records[i].home.Value;
                awaySum += records[i].away.Value;
            }
            return {
                max: Math.max(max, 1),
                homeSum: Math.max(homeSum, 1),
                awaySum: Math.max(awaySum, 1)
            };
        }
        var v = [];
        options = options || {};
        var sumAndMaxes = findSumAndMaxOfValues(records);
        var maxWidth = options.maxBarWidth ? options.maxBarWidth : 150;
        var labelWidth = options.labelWidth ? options.labelWidth : 50;
        var barWrapperWidth = (644 - labelWidth) / 2;
        v.push('<div class="betting-comparision-clash">');
        for (var i = 0; i < records.length; i++) {
            var homeLabel = (records[i].home.Display ? records[i].home.Display : "");
            var awayLabel = (records[i].away.Display ? records[i].away.Display : "");
            v.push('<div class="clash two-cols">');
            v.push('<span class="clash-bar-wrapper home" style="width: ' + barWrapperWidth + 'px">');
            v.push('<span class="clash-bar-label">');
            v.push('<span class="clash-value">' + records[i].home.Value + "</span>");
            if (homeLabel) {
                v.push('<span class="clash-bar-label-text">' + homeLabel + "</span>");
            }
            v.push("</span>");
            v.push('<span class="clash-bar" style="width: ' + Math.max(maxWidth * records[i].home.Value / sumAndMaxes.max, 1) + 'px">');
            v.push("</span>");
            v.push("</span>");
            if (options.splitLabels) {
                v.push('<span class="two-cols" style="width: {0}px;">'.format(labelWidth));
                v.push('<span class="clash-label home">{0}</span>'.format(records[i].Display.home));
                v.push('<span class="clash-label away">{0}</span>'.format(records[i].Display.away));
                v.push("</span>");
            } else {
                v.push('<span class="clash-label" style="width: ' + labelWidth + 'px">' + records[i].Display + "</span>");
            }
            v.push('<span class="clash-bar-wrapper away" style="width: ' + barWrapperWidth + 'px">');
            v.push('<span class="clash-bar" style="width: ' + Math.max(maxWidth * records[i].away.Value / sumAndMaxes.max, 1) + 'px">');
            v.push("</span>");
            v.push('<span class="clash-bar-label">');
            if (awayLabel) {
                v.push('<span class="clash-bar-label-text">' + awayLabel + "</span>");
            }
            v.push('<span class="clash-value">' + records[i].away.Value + "</span>");
            v.push("</span>");
            v.push("</span>");
            v.push("</div>");
        }
        v.push("</div>");
        return v.join("");
    },
    "additive": function(categories, options) {
        function findSumAndMaxOfValues(categories) {
            var max = 0;
            var homeSum = 0;
            var awaySum = 0;
            var homeMax = 0;
            var awayMax = 0;
            for (var i = 0; i < categories.length; i++) {
                for (var j = 0; j < categories[i].Columns.length; j++) {
                    var c = categories[i].Columns[j];
                    max = Math.max(max, c.home);
                    max = Math.max(max, c.away);
                    homeMax = Math.max(max, c.home);
                    awayMax = Math.max(max, c.away);
                    homeSum += c.home;
                    awaySum += c.away;
                }
            }
            return {
                max: max,
                homeSum: homeSum,
                awaySum: awaySum,
                homeMax: homeMax,
                awayMax: awayMax
            };
        }
        var v = [];
        options = options || {};
        var maxAndSums = findSumAndMaxOfValues(categories);
        var maxBarHeight = 60;
        var minBarHeight = 20;
        v.push('<table class="betting-comparision-additive" style="width: 100%;">');
        v.push('<tr class="bar-row">');
        for (var i = 0; i < categories.length; i++) {
            v.push("<td>");
            for (var j = 0; j < categories[i].Columns.length; j++) {
                var c = categories[i].Columns[j];
                v.push('<ul class="additive-column">');
                if (0 != c.home) {
                    v.push('<li class="additive-column-bar home" style="height: ' + (minBarHeight + (maxBarHeight * (c.home / maxAndSums.max))) + 'px;"');
                    v.push('title="' + c.home + " times (" + NG.roundNumber(100 * c.home / maxAndSums.homeMax) + '%)"');
                    v.push(">");
                    v.push(c.home + " (" + NG.roundNumber(100 * c.home / maxAndSums.homeMax) + "%)");
                    v.push("</li>");
                }
                if (0 != c.away) {
                    v.push('<li class="additive-column-bar away" style="height: ' + (minBarHeight + (maxBarHeight * (c.away / maxAndSums.max))) + 'px;"');
                    v.push('title="' + c.away + "times (" + NG.roundNumber(c.away / maxAndSums.awayMax) + '%)"');
                    v.push(">");
                    v.push(c.away + " (" + NG.roundNumber(100 * c.away / maxAndSums.awayMax) + "%)");
                    v.push("</li>");
                }
                v.push("</ul>");
            }
            v.push("</td>");
        }
        v.push("</tr>");
        v.push('<tr class="column-categories">');
        for (var i = 0; i < categories.length; i++) {
            v.push("<td>");
            for (var j = 0; j < categories[i].Columns.length; j++) {
                var c = categories[i].Columns[j];
                v.push('<ul class="additive-column">');
                v.push('<span class="additive-column-label">' + c.Display + "</span>");
                v.push("</ul>");
            }
            v.push("</td>");
        }
        v.push("</tr>");
        v.push('<tr class="categories">');
        for (var i = 0; i < categories.length; i++) {
            v.push("<td>");
            v.push('<span class="additive-category-label">' + categories[i].Display + "</span>");
            v.push("</td>");
        }
        v.push("</tr>");
        v.push("</table>");
        return v.join("");
    }
};
WS.Betting.ComparisionModel = {
    "fulltime": function(homeRecords, awayRecords) {
        var rows = [];
        rows.push({
            Display: "1",
            home: {
                Display: '<span class="l-win rc">Win</span>',
                Value: homeRecords.Win
            },
            away: {
                Display: '<span class="l-lose rc">Lose</span>',
                Value: awayRecords.Lose
            },
            probability: homeRecords.Win + awayRecords.Lose
        });
        rows.push({
            Display: "x",
            home: {
                Display: '<span class="l-draw rc">Draw</span>',
                Value: homeRecords.Draw
            },
            away: {
                Display: '<span class="l-draw rc">Draw</span>',
                Value: awayRecords.Draw
            },
            probability: homeRecords.Draw + awayRecords.Draw
        });
        rows.push({
            Display: "2",
            home: {
                Display: '<span class="l-lose rc">Lose</span>',
                Value: homeRecords.Lose
            },
            away: {
                Display: '<span class="l-win rc">Win</span>',
                Value: awayRecords.Win
            },
            probability: homeRecords.Lose + awayRecords.Win
        });
        return rows;
    },
    "htft": function(homeRecords, awayRecords) {
        var rows = [];
        rows.push({
            Display: "1/1",
            home: {
                Display: '<span class="l-win rc">Win</span> and <span class="l-win rc">Win</span>',
                Value: homeRecords.WinWin
            },
            away: {
                Display: '<span class="l-lose rc">Lose</span> and <span class="l-lose rc">Lose</span>',
                Value: awayRecords.LoseLose
            },
            probability: homeRecords.WinWin + awayRecords.LoseLose
        });
        rows.push({
            Display: "1/X",
            home: {
                Display: '<span class="l-win rc">Win</span> and <span class="l-draw rc">Draw</span>',
                Value: homeRecords.WinDraw
            },
            away: {
                Display: '<span class="l-lose rc">Lose</span> and <span class="l-draw rc">Draw</span>',
                Value: awayRecords.LoseDraw
            },
            probability: homeRecords.WinDraw + awayRecords.LoseDraw
        });
        rows.push({
            Display: "1/2",
            home: {
                Display: '<span class="l-win rc">Win</span> and <span class="l-lose rc">Lose</span>',
                Value: homeRecords.WinLose
            },
            away: {
                Display: '<span class="l-lose rc">Lose</span> and <span class="l-win rc">Win</span>',
                Value: awayRecords.LoseWin
            },
            probability: homeRecords.WinLose + awayRecords.LoseWin
        });
        rows.push({
            Display: "X/1",
            home: {
                Display: '<span class="l-draw rc">Draw</span> and <span class="l-win rc">Win</span>',
                Value: homeRecords.DrawWin
            },
            away: {
                Display: '<span class="l-draw rc">Draw</span> and <span class="l-lose rc">Lose</span>',
                Value: awayRecords.DrawLose
            },
            probability: homeRecords.DrawWin + awayRecords.DrawLose
        });
        rows.push({
            Display: "X/X",
            home: {
                Display: '<span class="l-draw rc">Draw</span> and <span class="l-draw rc">Draw</span>',
                Value: homeRecords.DrawDraw
            },
            away: {
                Display: '<span class="l-draw rc">Draw</span> and <span class="l-draw rc">Draw</span>',
                Value: awayRecords.DrawDraw
            },
            probability: homeRecords.DrawDraw + awayRecords.DrawDraw
        });
        rows.push({
            Display: "X/2",
            home: {
                Display: '<span class="l-draw rc">Draw</span> and <span class="l-lose rc">Lose</span>',
                Value: homeRecords.DrawLose
            },
            away: {
                Display: '<span class="l-draw rc">Draw</span> and <span class="l-win rc">Win</span>',
                Value: awayRecords.DrawWin
            },
            probability: homeRecords.DrawLose + awayRecords.DrawWin
        });
        rows.push({
            Display: "2/1",
            home: {
                Display: '<span class="l-lose rc">Lose</span> and <span class="l-win rc">Win</span>',
                Value: homeRecords.LoseWin
            },
            away: {
                Display: '<span class="l-win rc">Win</span> and <span class="l-lose rc">Lose</span>',
                Value: awayRecords.WinLose
            },
            probability: homeRecords.LoseWin + awayRecords.WinLose
        });
        rows.push({
            Display: "2/X",
            home: {
                Display: '<span class="l-lose rc">Lose</span> and <span class="l-draw rc">Draw</span>',
                Value: homeRecords.LoseDraw
            },
            away: {
                Display: '<span class="l-win rc">Win</span> and <span class="l-draw rc">Draw</span>',
                Value: awayRecords.WinDraw
            },
            probability: homeRecords.LoseDraw + awayRecords.WinDraw
        });
        rows.push({
            Display: "2/2",
            home: {
                Display: '<span class="l-lose rc">Lose</span> and <span class="l-lose rc">Lose</span>',
                Value: homeRecords.LoseLose
            },
            away: {
                Display: '<span class="l-win rc">Win</span> and <span class="l-win rc">Win</span>',
                Value: awayRecords.WinWin
            },
            probability: homeRecords.LoseLose + awayRecords.WinWin
        });
        return rows;
    },
    "doublechance": function(homeRecords, awayRecords) {
        var rows = [];
        rows.push({
            Display: "1/X",
            home: {
                Display: '<span class="l-win rc">Win</span> or <span class="l-draw rc">Draw</span>',
                Value: homeRecords.WinOrDraw
            },
            away: {
                Display: '<span class="l-lose rc">Lose</span> or <span class="l-draw rc">Draw</span>',
                Value: awayRecords.DrawOrLose
            },
            probability: homeRecords.WinOrDraw + awayRecords.DrawOrLose
        });
        rows.push({
            Display: "1/2",
            home: {
                Display: '<span class="l-win rc">Win</span> or <span class="l-lose rc">Lose</span>',
                Value: homeRecords.WinOrLose
            },
            away: {
                Display: '<span class="l-win rc">Win</span> or <span class="l-lose rc">Lose</span>',
                Value: awayRecords.WinOrLose
            },
            probability: homeRecords.WinOrLose + awayRecords.WinOrLose
        });
        rows.push({
            Display: "2/X",
            home: {
                Display: '<span class="l-lose rc">Lose</span> or <span class="l-draw rc">Draw</span>',
                Value: homeRecords.DrawOrLose
            },
            away: {
                Display: '<span class="l-win rc">Win</span> or <span class="l-draw rc">Draw</span>',
                Value: awayRecords.WinOrDraw
            },
            probability: homeRecords.DrawOrLose + awayRecords.WinOrDraw
        });
        return rows;
    },
    "overunder": function(homeRecords, awayRecords) {
        var categories = [];
        var max = 5;
        for (var i = 0; i < max; i++) {
            categories.push({
                Display: i + ".5",
                Columns: [{
                    Display: "Under",
                    home: homeRecords["Under_" + i + "_5"],
                    away: awayRecords["Under_" + i + "_5"]
                }, {
                    Display: "Over",
                    home: homeRecords["Over_" + i + "_5"],
                    away: awayRecords["Over_" + i + "_5"]
                }]
            });
        }
        return categories;
    },
    "correctscore": function(homeRecords, awayRecords) {
        function findScored(records, scored) {
            var sum = 0;
            for (var i = 0; i < records.length; i++) {
                if (records[i].s == scored) {
                    sum += records[i].o;
                }
            }
            return sum;
        }
        var maxGoals = 4;
        var rows = [];
        for (var i = 0; i < maxGoals; i++) {
            for (var j = 0; j < maxGoals; j++) {
                var h = findScored(homeRecords, i);
                var a = findScored(awayRecords, j);
                rows.push({
                    Display: {
                        home: i,
                        away: j
                    },
                    home: {
                        Value: h
                    },
                    away: {
                        Value: a
                    },
                    probability: a + h
                });
            }
        }
        return rows;
    },
    "goaltimes": function(homeRecords, awayRecords) {
        var rows = [];
        var interval = homeRecords.interval;
        var intervalScale = homeRecords.intervalScale;
        for (var i = 0; i <= 90 / interval; i += intervalScale) {
            var h = 0;
            var a = 0;
            for (var j = i; j < i + intervalScale; j++) {
                if (homeRecords.values[j]) {
                    h += homeRecords.values[j];
                }
                if (awayRecords.values[j]) {
                    a += awayRecords.values[j];
                }
            }
            if (h != 0 || a != 0) {
                var label = 90 < ((i + intervalScale) * interval) ? "90+" : i * interval + " - " + ((i + intervalScale) * interval);
                rows.push({
                    Display: label,
                    home: {
                        Value: h
                    },
                    away: {
                        Value: a
                    },
                    probability: a + h
                });
            }
        }
        return rows;
    },
    "csfs": function(homeRecords, awayRecords) {
        var rows = [];
        rows.push({
            Display: "Home cs",
            home: {
                Display: "clean sheet",
                Value: homeRecords.cs
            },
            away: {
                Display: "failed to score",
                Value: awayRecords.fs
            },
            probability: awayRecords.fs + homeRecords.cs
        });
        rows.push({
            Display: "Away cs",
            home: {
                Display: "failed to score",
                Value: homeRecords.fs
            },
            away: {
                Display: "clean sheet",
                Value: awayRecords.cs
            },
            probability: awayRecords.cs + homeRecords.fs
        });
        return rows;
    }
};
WS.Betting.Model = {
    "fulltime": function(data) {
        if (!data) {
            return null;
        }
        return {
            Win: data[0],
            Draw: data[1],
            Lose: data[2]
        };
    },
    "htft": function(data, contentFilter) {
        if (!data) {
            return null;
        }
        var o = {};
        data = data[0][contentFilter.period][1];
        for (var i = 0; i < data.length; i++) {
            var r = data[i];
            o[r[0]] = r[1];
        }
        return o;
    },
    "doublechance": function(data) {
        if (!data) {
            return null;
        }
        return {
            WinOrDraw: data[0] + data[1],
            WinOrLose: data[0] + data[2],
            DrawOrLose: data[1] + data[2]
        };
    },
    "overunder": function(data, contentFilter) {
        if (!data) {
            return null;
        }
        var o = {};
        data = data[0][contentFilter.period][1];
        for (var i = 0; i < data.length; i++) {
            var r = data[i];
            o["Over" + r[0]] = r[1];
            o["Under" + r[0]] = r[2];
        }
        return o;
    },
    "correctscore": function(data, contentFilter) {
        if (!data) {
            return null;
        }
        var o = [];
        data = data[0][contentFilter.period][1];
        for (var i = 0; i < data.length; i++) {
            var r = data[i];
            o.push({
                s: r[0],
                c: r[1],
                o: r[2][0]
            });
        }
        return o;
    },
    "goaltimes": function(data, contentFilter) {
        if (!data) {
            return null;
        }
        var intervalScale = contentFilter.intervalScale ? NG.roundNumber(contentFilter.intervalScale) : 2;
        var o = {
            intervalScale: intervalScale,
            interval: 5,
            values: {},
            against: contentFilter.against
        };
        data = data[0][contentFilter.period][1];
        for (var i = 0; i < data.length; i++) {
            o.values[data[i][0]] = data[i][1];
        }
        return o;
    },
    "csfs": function(data, contentFilter) {
        if (!data) {
            return null;
        }
        data = data[0][contentFilter.period][1];
        return {
            cs: data[0][0],
            fs: data[0][1]
        };
    }
};
WS.Betting.Comparision = function(config) {
    var id, dataType, viewType, options, $view, records, dataModel, comparisionModel, orderByProbability, currentData, self = this;
    init(config);
    this.load = function(data) {
        currentData = data;
        var homeRecords = new dataModel(data.home.value, data.home.contentFilter);
        var awayRecords = new dataModel(data.away.value, data.away.contentFilter);
        var comparisionRecords = new comparisionModel(homeRecords, awayRecords);
        if (orderByProbability) {
            comparisionRecords.sort(function(a, b) {
                return NG.sortNumeric(a.probability, b.probability) * (-1);
            });
        }
        var html = WS.Betting.ComparisionView[viewType](comparisionRecords, options.view);
        $view.html(html);
    };
    this.id = function() {
        return id;
    };

    function bindEvents() {
        $(document).bind("betting-stats-order-changed", function(options, data) {
            orderByProbability = data;
            self.load(currentData);
        });
    }

    function init(config) {
        if (!config.id) {
            return;
        }
        id = config.id;
        $view = $("#" + id);
        options = config.options || {};
        dataType = config.model.type.toLowerCase();
        dataModel = WS.Betting.Model[dataType];
        comparisionModel = WS.Betting.ComparisionModel[dataType];
        viewType = config.view.type.toLowerCase();
        orderByProbability = options.orderByProbability || false;
        bindEvents();
    }
};