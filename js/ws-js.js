String.prototype._formatRegExp = /\{(\d+)\}/gm;
String.prototype.format = function() {
    var replacements = arguments;
    return this.replace(this._formatRegExp, function(string, match) {
        return replacements[parseInt(match)];
    });
};
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
String.prototype.trim = function() {
    return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
};
String.prototype.toShortName = function() {
    var name = jQuery.trim(this);
    var names = name.split(" ");
    if (names.length == 1) {
        return name;
    }
    var result = [];
    for (var i = 0; i < names.length - 1; i++) {
        result.push(names[i].charAt(0) + ". ");
    }
    result.push(names[names.length - 1]);
    return result.join("");
};
String.prototype.bool = function() {
    return (/^true$/i).test(this);
};
String.prototype.capitaliseFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.lowercaseFirstLetter = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
};
String.prototype.removeLowercaseLetters = function() {
    return this.replace(/[^A-Z%]/g, "");
};
String.prototype.insertSpacesBetweenWords = function() {
    return this.replace(/([a-z])([A-Z])/g, "$1 $2");
};
String.prototype.containsLowercaseLetters = function() {
    return /[a-z]/.exec(this) !== null;
};
String.prototype.removeWhiteSpace = function() {
    return this.replace(/ /g, "");
};

function areStringsTooSimilar(str1, str2) {
    return str1.toLowerCase().removeWhiteSpace() === str2.toLowerCase().removeWhiteSpace();
}
if (!Array.prototype.map) {
    Array.prototype.map = function(fun) {
        var len = this.length >>> 0;
        if (typeof fun != "function") {
            throw new TypeError();
        }
        var res = new Array(len);
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this) {
                res[i] = fun.call(thisp, this[i], i, this);
            }
        }
        return res;
    };
}
if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun) {
        var len = this.length >>> 0;
        if (typeof fun != "function") {
            throw new TypeError();
        }
        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this) {
                var val = this[i];
                if (fun.call(thisp, val, i, this)) {
                    res.push(val);
                }
            }
        }
        return res;
    };
}
if (!Array.prototype.every) {
    Array.prototype.every = function(fun) {
        var len = this.length >>> 0;
        if (typeof fun != "function") {
            throw new TypeError();
        }
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this && !fun.call(thisp, this[i], i, this)) {
                return false;
            }
        }
        return true;
    };
}
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(fun) {
        var len = this.length >>> 0;
        if (typeof fun != "function") {
            throw new TypeError();
        }
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this) {
                fun.call(thisp, this[i], i, this);
            }
        }
    };
}
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement) {
        if (this === void 0 || this === null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 0) {
            n = Number(arguments[1]);
            if (n !== n) {
                n = 0;
            } else {
                if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    };
}
Array.prototype.subtract = function(a, fun, scope) {
    return this.filter(function(e) {
        return a.every(function(ae) {
            return fun ? fun.call(scope, e, ae) : e != ae;
        });
    });
};
Array.prototype.hashtable = function() {
    var l = this.length >>> 0,
        result = {};
    if (0 == l) {
        return result;
    }
    var mapFn = arguments[0];
    if (typeof mapFn == "function") {
        for (var i = 0; i < l; i++) {
            result[mapFn(this[i])] = this[i];
        }
    } else {
        for (var i = 0; i < l; i++) {
            result[this[i]] = this[i];
        }
    }
    return result;
};
Array.prototype.indextable = function() {
    var l = this.length >>> 0,
        result = {};
    if (0 == l) {
        return result;
    }
    var mapFn = arguments[0];
    if (typeof mapFn == "function") {
        for (var i = 0; i < l; i++) {
            result[mapFn(this[i])] = i;
        }
    } else {
        for (var i = 0; i < l; i++) {
            result[this[i]] = i;
        }
    }
    return result;
};
Array.prototype.max = function() {
    var max = this[0];
    var len = this.length;
    for (var i = 1; i < len; i++) {
        if (this[i] > max) {
            max = this[i];
        }
    }
    return max;
};
Array.prototype.min = function() {
    var min = this[0];
    var len = this.length;
    for (var i = 1; i < len; i++) {
        if (this[i] < min) {
            min = this[i];
        }
    }
    return min;
};
Array.prototype.sum = function() {
    for (var i = 0, len = this.length, sum = 0; i < len; sum += this[i++]) {}
    return sum;
};
Array.prototype.take = function(count) {
    var result = [];
    if (!count) {
        return result;
    }
    if (this.length < count) {
        return result;
    }
    for (var i = 0; i < count; i++) {
        result.push(this[i]);
    }
    return result;
};
Array.prototype.where = function(criteria) {
    var result = [];
    if (!criteria) {
        return this;
    }
    for (var i = 0; i < this.length; i++) {
        if (criteria(this[i])) {
            result.push(this[i]);
        }
    }
    return result;
};
Array.prototype.addArray = function(array) {
    if (!array) {
        return this;
    }
    if (0 == array.length) {
        return this;
    }
    for (var i = 0; i < array.length; i++) {
        this.push(array[i]);
    }
    return this;
};
Array.prototype.contains = function(item) {
    return this.indexOf(item) >= 0;
};
Date.prototype.toTimeStr = function() {
    return this.toTimeString().substr(0, 5);
};
Date.prototype.toDateStr = function() {
    var s = this.toDateString();
    return s.substr(0, s.length - 5);
};
Date.prototype.toLocal = function(timezoneOffset) {
    return new Date((this.valueOf() + (timezoneOffset || 0) * 60000));
};
Date.prototype.getWeek = function() {
    var target = new Date(this.valueOf());
    var dayNr = (this.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    var jan4 = new Date(target.getFullYear(), 0, 4).getStartOfWeek();
    var dayDiff = (target - jan4) / 86400000;
    var weekNr = 1 + Math.floor(dayDiff / 7);
    return weekNr;
};
Date.prototype.getWeekYear = function() {
    var target = new Date(this.valueOf());
    target.setDate(target.getDate() - ((this.getDay() + 6) % 7) + 3);
    return target.getFullYear();
};
Date.prototype.getStartOfWeek = function() {
    var target = new Date(this.valueOf());
    target.setDate(target.getDate() - (6 + target.getDay()) % 7);
    return target;
};
Date.prototype.getEndOfWeek = function() {
    var target = new Date(this.valueOf());
    target.setDate(target.getDate() + (6 - (6 + target.getDay()) % 7));
    return target;
};
Date.prototype.getEndOfMonth = function() {
    return new Date(this.getFullYear(), this.getMonth(), Date.daysInMonth[this.getMonth()]);
};
Date.prototype.getStartOfMonth = function() {
    return new Date(this.getFullYear(), this.getMonth(), 1);
};
Date.parseWeek = function(s) {
    var y = s.substr(0, 4) >>> 0,
        w = s.substr(5, 2) >>> 0,
        date = new Date(y, 0, 4);
    date.setDate(date.getDate() - ((6 + date.getDay()) % 7) + ((w - 1) * 6));
    return date;
};
Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
};
/*
 * Copyright (C) 2004 Baron Schwartz <baron at sequent dot org>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 */
Date.parseFunctions = {
    count: 0
};
Date.parseRegexes = [];
Date.formatFunctions = {
    count: 0
};
Date.prototype.dateFormat = function(format, ignore_offset) {
    if (Date.formatFunctions[format] == null) {
        Date.createNewFormat(format);
    }
    var func = Date.formatFunctions[format];
    if (ignore_offset || !this.offset) {
        return this[func]();
    } else {
        return (new Date(this.valueOf() - this.offset))[func]();
    }
};
Date.createNewFormat = function(format) {
    var funcName = "format" + Date.formatFunctions.count++;
    Date.formatFunctions[format] = funcName;
    var code = "Date.prototype." + funcName + " = function(){return ";
    var special = false;
    var ch = "";
    for (var i = 0; i < format.length; ++i) {
        ch = format.charAt(i);
        if (!special && ch == "\\") {
            special = true;
        } else {
            if (special) {
                special = false;
                code += "'" + String.escape(ch) + "' + ";
            } else {
                code += Date.getFormatCode(ch);
            }
        }
    }
    eval(code.substring(0, code.length - 3) + ";}");
};
Date.getFormatCode = function(character) {
    switch (character) {
        case "d":
            return "String.leftPad(this.getDate(), 2, '0') + ";
        case "D":
            return "Date.dayNames[this.getDay()].substring(0, 3) + ";
        case "j":
            return "this.getDate() + ";
        case "l":
            return "Date.dayNames[this.getDay()] + ";
        case "S":
            return "this.getSuffix() + ";
        case "w":
            return "this.getDay() + ";
        case "z":
            return "this.getDayOfYear() + ";
        case "W":
            return "this.getWeekOfYear() + ";
        case "F":
            return "Date.monthNames[this.getMonth()] + ";
        case "m":
            return "String.leftPad(this.getMonth() + 1, 2, '0') + ";
        case "M":
            return "Date.monthNames[this.getMonth()].substring(0, 3) + ";
        case "n":
            return "(this.getMonth() + 1) + ";
        case "t":
            return "this.getDaysInMonth() + ";
        case "L":
            return "(this.isLeapYear() ? 1 : 0) + ";
        case "Y":
            return "this.getFullYear() + ";
        case "y":
            return "('' + this.getFullYear()).substring(2, 4) + ";
        case "a":
            return "(this.getHours() < 12 ? 'am' : 'pm') + ";
        case "A":
            return "(this.getHours() < 12 ? 'AM' : 'PM') + ";
        case "g":
            return "((this.getHours() %12) ? this.getHours() % 12 : 12) + ";
        case "G":
            return "this.getHours() + ";
        case "h":
            return "String.leftPad((this.getHours() %12) ? this.getHours() % 12 : 12, 2, '0') + ";
        case "H":
            return "String.leftPad(this.getHours(), 2, '0') + ";
        case "i":
            return "String.leftPad(this.getMinutes(), 2, '0') + ";
        case "s":
            return "String.leftPad(this.getSeconds(), 2, '0') + ";
        case "O":
            return "this.getGMTOffset() + ";
        case "T":
            return "this.getTimezone() + ";
        case "Z":
            return "(this.getTimezoneOffset() * -60) + ";
        default:
            return "'" + String.escape(character) + "' + ";
    }
};
Date.parseDate = function(input, format) {
    if (Date.parseFunctions[format] == null) {
        Date.createParser(format);
    }
    var func = Date.parseFunctions[format];
    return Date[func](input);
};
Date.createParser = function(format) {
    var funcName = "parse" + Date.parseFunctions.count++;
    var regexNum = Date.parseRegexes.length;
    var currentGroup = 1;
    Date.parseFunctions[format] = funcName;
    var code = "Date." + funcName + " = function(input){\n" + "var y = -1, m = -1, d = -1, h = -1, i = -1, s = -1, z = 0;\n" + "var d = new Date();\n" + "y = d.getFullYear();\n" + "m = d.getMonth();\n" + "d = d.getDate();\n" + "var results = input.match(Date.parseRegexes[" + regexNum + "]);\n" + "if (results && results.length > 0) {";
    var regex = "";
    var special = false;
    var ch = "";
    for (var i = 0; i < format.length; ++i) {
        ch = format.charAt(i);
        if (!special && ch == "\\") {
            special = true;
        } else {
            if (special) {
                special = false;
                regex += String.escape(ch);
            } else {
                obj = Date.formatCodeToRegex(ch, currentGroup);
                currentGroup += obj.g;
                regex += obj.s;
                if (obj.g && obj.c) {
                    code += obj.c;
                }
            }
        }
    }
    code += "if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0)\n" + "{return new Date(y, m, d, h, i, s).applyOffset(z);}\n" + "else if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0)\n" + "{return new Date(y, m, d, h, i).applyOffset(z);}\n" + "else if (y > 0 && m >= 0 && d > 0 && h >= 0)\n" + "{return new Date(y, m, d, h).applyOffset(z);}\n" + "else if (y > 0 && m >= 0 && d > 0)\n" + "{return new Date(y, m, d).applyOffset(z);}\n" + "else if (y > 0 && m >= 0)\n" + "{return new Date(y, m).applyOffset(z);}\n" + "else if (y > 0)\n" + "{return new Date(y).applyOffset(z);}\n" + "}return null;}";
    Date.parseRegexes[regexNum] = new RegExp("^" + regex + "$");
    eval(code);
};
Date.formatCodeToRegex = function(character, currentGroup) {
    switch (character) {
        case "D":
            return {
                g: 0,
                c: null,
                s: "(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)"
            };
        case "j":
        case "d":
            return {
                g: 1,
                c: "d = parseInt(results[" + currentGroup + "], 10);\n",
                s: "(\\d{1,2})"
            };
        case "l":
            return {
                g: 0,
                c: null,
                s: "(?:" + Date.dayNames.join("|") + ")"
            };
        case "S":
            return {
                g: 0,
                c: null,
                s: "(?:st|nd|rd|th)"
            };
        case "w":
            return {
                g: 0,
                c: null,
                s: "\\d"
            };
        case "z":
            return {
                g: 0,
                c: null,
                s: "(?:\\d{1,3})"
            };
        case "W":
            return {
                g: 0,
                c: null,
                s: "(?:\\d{2})"
            };
        case "F":
            return {
                g: 1,
                c: "m = parseInt(Date.monthNumbers[results[" + currentGroup + "].substring(0, 3)], 10);\n",
                s: "(" + Date.monthNames.join("|") + ")"
            };
        case "M":
            return {
                g: 1,
                c: "m = parseInt(Date.monthNumbers[results[" + currentGroup + "]], 10);\n",
                s: "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"
            };
        case "n":
        case "m":
            return {
                g: 1,
                c: "m = parseInt(results[" + currentGroup + "], 10) - 1;\n",
                s: "(\\d{1,2})"
            };
        case "t":
            return {
                g: 0,
                c: null,
                s: "\\d{1,2}"
            };
        case "L":
            return {
                g: 0,
                c: null,
                s: "(?:1|0)"
            };
        case "Y":
            return {
                g: 1,
                c: "y = parseInt(results[" + currentGroup + "], 10);\n",
                s: "(\\d{4})"
            };
        case "y":
            return {
                g: 1,
                c: "var ty = parseInt(results[" + currentGroup + "], 10);\n" + "y = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",
                s: "(\\d{1,2})"
            };
        case "a":
            return {
                g: 1,
                c: "if (results[" + currentGroup + "] == 'am') {\n" + "if (h == 12) { h = 0; }\n" + "} else { if (h < 12) { h += 12; }}",
                s: "(am|pm)"
            };
        case "A":
            return {
                g: 1,
                c: "if (results[" + currentGroup + "] == 'AM') {\n" + "if (h == 12) { h = 0; }\n" + "} else { if (h < 12) { h += 12; }}",
                s: "(AM|PM)"
            };
        case "g":
        case "G":
        case "h":
        case "H":
            return {
                g: 1,
                c: "h = parseInt(results[" + currentGroup + "], 10);\n",
                s: "(\\d{1,2})"
            };
        case "i":
            return {
                g: 1,
                c: "i = parseInt(results[" + currentGroup + "], 10);\n",
                s: "(\\d{2})"
            };
        case "s":
            return {
                g: 1,
                c: "s = parseInt(results[" + currentGroup + "], 10);\n",
                s: "(\\d{2})"
            };
        case "O":
        case "P":
            return {
                g: 1,
                c: "z = Date.parseOffset(results[" + currentGroup + "], 10);\n",
                s: "(Z|[+-]\\d{2}:?\\d{2})"
            };
        case "T":
            return {
                g: 0,
                c: null,
                s: "[A-Z]{3}"
            };
        case "Z":
            return {
                g: 1,
                c: "s = parseInt(results[" + currentGroup + "], 10);\n",
                s: "([+-]\\d{1,5})"
            };
        default:
            return {
                g: 0,
                c: null,
                s: String.escape(character)
            };
    }
};
Date.parseOffset = function(str) {
    if (str == "Z") {
        return 0;
    }
    var seconds;
    seconds = parseInt(str[0] + str[1] + str[2]) * 3600;
    if (str[3] == ":") {
        seconds += parseInt(str[4] + str[5]) * 60;
    } else {
        seconds += parseInt(str[3] + str[4]) * 60;
    }
    return seconds;
};
Date.prototype.applyOffset = function(offset_seconds) {
    this.offset = offset_seconds * 1000;
    this.setTime(this.valueOf() + this.offset);
    return this;
};
Date.prototype.getTimezone = function() {
    return this.toString().replace(/^.*? ([A-Z]{3}) [0-9]{4}.*$/, "$1").replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/, "$1$2$3").replace(/^.*?[0-9]{4} \(([A-Z]{3})\)/, "$1");
};
Date.prototype.getGMTOffset = function() {
    return (this.getTimezoneOffset() > 0 ? "-" : "+") + String.leftPad(Math.floor(this.getTimezoneOffset() / 60), 2, "0") + String.leftPad(this.getTimezoneOffset() % 60, 2, "0");
};
Date.prototype.getDayOfYear = function() {
    var num = 0;
    Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
    for (var i = 0; i < this.getMonth(); ++i) {
        num += Date.daysInMonth[i];
    }
    return num + this.getDate() - 1;
};
Date.prototype.getWeekOfYear = function() {
    var now = this.getDayOfYear() + (4 - this.getDay());
    var jan1 = new Date(this.getFullYear(), 0, 1);
    var then = (7 - jan1.getDay() + 4);
    return String.leftPad(((now - then) / 7) + 1, 2, "0");
};
Date.prototype.isLeapYear = function() {
    var year = this.getFullYear();
    return ((year & 3) == 0 && (year % 100 || (year % 400 == 0 && year)));
};
Date.prototype.getFirstDayOfMonth = function() {
    var day = (this.getDay() - (this.getDate() - 1)) % 7;
    return (day < 0) ? (day + 7) : day;
};
Date.prototype.getLastDayOfMonth = function() {
    var day = (this.getDay() + (Date.daysInMonth[this.getMonth()] - this.getDate())) % 7;
    return (day < 0) ? (day + 7) : day;
};
Date.prototype.getDaysInMonth = function() {
    Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
    return Date.daysInMonth[this.getMonth()];
};
Date.prototype.getSuffix = function() {
    switch (this.getDate()) {
        case 1:
        case 21:
        case 31:
            return "st";
        case 2:
        case 22:
            return "nd";
        case 3:
        case 23:
            return "rd";
        default:
            return "th";
    }
};
String.escape = function(string) {
    return string.replace(/('|\\)/g, "\\$1");
};
String.leftPad = function(val, size, ch) {
    var result = new String(val);
    if (ch == null) {
        ch = " ";
    }
    while (result.length < size) {
        result = ch + result;
    }
    return result;
};
Date.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
Date.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
Date.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
Date.y2kYear = 50;
Date.monthNumbers = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11
};
Date.patterns = {
    ISO8601LongPattern: "Y\\-m\\-d\\TH\\:i\\:sO",
    ISO8601ShortPattern: "Y\\-m\\-d",
    ShortDatePattern: "n/j/Y",
    LongDatePattern: "l, F d, Y",
    FullDateTimePattern: "l, F d, Y g:i:s A",
    MonthDayPattern: "F d",
    ShortTimePattern: "g:i A",
    LongTimePattern: "g:i:s A",
    SortableDateTimePattern: "Y-m-d\\TH:i:s",
    UniversalSortableDateTimePattern: "Y-m-d H:i:sO",
    YearMonthPattern: "F, Y"
};
/* jQuery v1.10.2 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
 */
(function(e, t) {
    var n, r, i = typeof t,
        o = e.location,
        a = e.document,
        s = a.documentElement,
        l = e.jQuery,
        u = e.$,
        c = {},
        p = [],
        f = "1.10.2",
        d = p.concat,
        h = p.push,
        g = p.slice,
        m = p.indexOf,
        y = c.toString,
        v = c.hasOwnProperty,
        b = f.trim,
        x = function(e, t) {
            return new x.fn.init(e, t, r);
        },
        w = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        T = /\S+/g,
        C = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        k = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        E = /^[\],:{}\s]*$/,
        S = /(?:^|:|,)(?:\s*\[)+/g,
        A = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        j = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
        D = /^-ms-/,
        L = /-([\da-z])/gi,
        H = function(e, t) {
            return t.toUpperCase();
        },
        q = function(e) {
            (a.addEventListener || "load" === e.type || "complete" === a.readyState) && (_(), x.ready());
        },
        _ = function() {
            a.addEventListener ? (a.removeEventListener("DOMContentLoaded", q, !1), e.removeEventListener("load", q, !1)) : (a.detachEvent("onreadystatechange", q), e.detachEvent("onload", q));
        };
    x.fn = x.prototype = {
        jquery: f,
        constructor: x,
        init: function(e, n, r) {
            var i, o;
            if (!e) {
                return this;
            }
            if ("string" == typeof e) {
                if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : N.exec(e), !i || !i[1] && n) {
                    return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
                }
                if (i[1]) {
                    if (n = n instanceof x ? n[0] : n, x.merge(this, x.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : a, !0)), k.test(i[1]) && x.isPlainObject(n)) {
                        for (i in n) {
                            x.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
                        }
                    }
                    return this;
                }
                if (o = a.getElementById(i[2]), o && o.parentNode) {
                    if (o.id !== i[2]) {
                        return r.find(e);
                    }
                    this.length = 1, this[0] = o;
                }
                return this.context = a, this.selector = e, this;
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : x.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), x.makeArray(e, this));
        },
        selector: "",
        length: 0,
        toArray: function() {
            return g.call(this);
        },
        get: function(e) {
            return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e];
        },
        pushStack: function(e) {
            var t = x.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t;
        },
        each: function(e, t) {
            return x.each(this, e, t);
        },
        ready: function(e) {
            return x.ready.promise().done(e), this;
        },
        slice: function() {
            return this.pushStack(g.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : []);
        },
        map: function(e) {
            return this.pushStack(x.map(this, function(t, n) {
                return e.call(t, n, t);
            }));
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: h,
        sort: [].sort,
        splice: [].splice
    }, x.fn.init.prototype = x.fn, x.extend = x.fn.extend = function() {
        var e, n, r, i, o, a, s = arguments[0] || {},
            l = 1,
            u = arguments.length,
            c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, l = 2), "object" == typeof s || x.isFunction(s) || (s = {}), u === l && (s = this, --l); u > l; l++) {
            if (null != (o = arguments[l])) {
                for (i in o) {
                    e = s[i], r = o[i], s !== r && (c && r && (x.isPlainObject(r) || (n = x.isArray(r))) ? (n ? (n = !1, a = e && x.isArray(e) ? e : []) : a = e && x.isPlainObject(e) ? e : {}, s[i] = x.extend(c, a, r)) : r !== t && (s[i] = r));
                }
            }
        }
        return s;
    }, x.extend({
        expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
        noConflict: function(t) {
            return e.$ === x && (e.$ = u), t && e.jQuery === x && (e.jQuery = l), x;
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? x.readyWait++ : x.ready(!0);
        },
        ready: function(e) {
            if (e === !0 ? !--x.readyWait : !x.isReady) {
                if (!a.body) {
                    return setTimeout(x.ready);
                }
                x.isReady = !0, e !== !0 && --x.readyWait > 0 || (n.resolveWith(a, [x]), x.fn.trigger && x(a).trigger("ready").off("ready"));
            }
        },
        isFunction: function(e) {
            return "function" === x.type(e);
        },
        isArray: Array.isArray || function(e) {
            return "array" === x.type(e);
        },
        isWindow: function(e) {
            return null != e && e == e.window;
        },
        isNumeric: function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e);
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? c[y.call(e)] || "object" : typeof e;
        },
        isPlainObject: function(e) {
            var n;
            if (!e || "object" !== x.type(e) || e.nodeType || x.isWindow(e)) {
                return !1;
            }
            try {
                if (e.constructor && !v.call(e, "constructor") && !v.call(e.constructor.prototype, "isPrototypeOf")) {
                    return !1;
                }
            } catch (r) {
                return !1;
            }
            if (x.support.ownLast) {
                for (n in e) {
                    return v.call(e, n);
                }
            }
            for (n in e) {}
            return n === t || v.call(e, n);
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) {
                return !1;
            }
            return !0;
        },
        error: function(e) {
            throw Error(e);
        },
        parseHTML: function(e, t, n) {
            if (!e || "string" != typeof e) {
                return null;
            }
            "boolean" == typeof t && (n = t, t = !1), t = t || a;
            var r = k.exec(e),
                i = !n && [];
            return r ? [t.createElement(r[1])] : (r = x.buildFragment([e], t, i), i && x(i).remove(), x.merge([], r.childNodes));
        },
        parseJSON: function(n) {
            return e.JSON && e.JSON.parse ? e.JSON.parse(n) : null === n ? n : "string" == typeof n && (n = x.trim(n), n && E.test(n.replace(A, "@").replace(j, "]").replace(S, ""))) ? Function("return " + n)() : (x.error("Invalid JSON: " + n), t);
        },
        parseXML: function(n) {
            var r, i;
            if (!n || "string" != typeof n) {
                return null;
            }
            try {
                e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n));
            } catch (o) {
                r = t;
            }
            return r && r.documentElement && !r.getElementsByTagName("parsererror").length || x.error("Invalid XML: " + n), r;
        },
        noop: function() {},
        globalEval: function(t) {
            t && x.trim(t) && (e.execScript || function(t) {
                e.eval.call(e, t);
            })(t);
        },
        camelCase: function(e) {
            return e.replace(D, "ms-").replace(L, H);
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
        },
        each: function(e, t, n) {
            var r, i = 0,
                o = e.length,
                a = M(e);
            if (n) {
                if (a) {
                    for (; o > i; i++) {
                        if (r = t.apply(e[i], n), r === !1) {
                            break;
                        }
                    }
                } else {
                    for (i in e) {
                        if (r = t.apply(e[i], n), r === !1) {
                            break;
                        }
                    }
                }
            } else {
                if (a) {
                    for (; o > i; i++) {
                        if (r = t.call(e[i], i, e[i]), r === !1) {
                            break;
                        }
                    }
                } else {
                    for (i in e) {
                        if (r = t.call(e[i], i, e[i]), r === !1) {
                            break;
                        }
                    }
                }
            }
            return e;
        },
        trim: b && !b.call("\ufeff\u00a0") ? function(e) {
            return null == e ? "" : b.call(e);
        } : function(e) {
            return null == e ? "" : (e + "").replace(C, "");
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (M(Object(e)) ? x.merge(n, "string" == typeof e ? [e] : e) : h.call(n, e)), n;
        },
        inArray: function(e, t, n) {
            var r;
            if (t) {
                if (m) {
                    return m.call(t, e, n);
                }
                for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++) {
                    if (n in t && t[n] === e) {
                        return n;
                    }
                }
            }
            return -1;
        },
        merge: function(e, n) {
            var r = n.length,
                i = e.length,
                o = 0;
            if ("number" == typeof r) {
                for (; r > o; o++) {
                    e[i++] = n[o];
                }
            } else {
                while (n[o] !== t) {
                    e[i++] = n[o++];
                }
            }
            return e.length = i, e;
        },
        grep: function(e, t, n) {
            var r, i = [],
                o = 0,
                a = e.length;
            for (n = !!n; a > o; o++) {
                r = !!t(e[o], o), n !== r && i.push(e[o]);
            }
            return i;
        },
        map: function(e, t, n) {
            var r, i = 0,
                o = e.length,
                a = M(e),
                s = [];
            if (a) {
                for (; o > i; i++) {
                    r = t(e[i], i, n), null != r && (s[s.length] = r);
                }
            } else {
                for (i in e) {
                    r = t(e[i], i, n), null != r && (s[s.length] = r);
                }
            }
            return d.apply([], s);
        },
        guid: 1,
        proxy: function(e, n) {
            var r, i, o;
            return "string" == typeof n && (o = e[n], n = e, e = o), x.isFunction(e) ? (r = g.call(arguments, 2), i = function() {
                return e.apply(n || this, r.concat(g.call(arguments)));
            }, i.guid = e.guid = e.guid || x.guid++, i) : t;
        },
        access: function(e, n, r, i, o, a, s) {
            var l = 0,
                u = e.length,
                c = null == r;
            if ("object" === x.type(r)) {
                o = !0;
                for (l in r) {
                    x.access(e, n, l, r[l], !0, a, s);
                }
            } else {
                if (i !== t && (o = !0, x.isFunction(i) || (s = !0), c && (s ? (n.call(e, i), n = null) : (c = n, n = function(e, t, n) {
                        return c.call(x(e), n);
                    })), n)) {
                    for (; u > l; l++) {
                        n(e[l], r, s ? i : i.call(e[l], l, n(e[l], r)));
                    }
                }
            }
            return o ? e : c ? n.call(e) : u ? n(e[0], r) : a;
        },
        now: function() {
            return (new Date).getTime();
        },
        swap: function(e, t, n, r) {
            var i, o, a = {};
            for (o in t) {
                a[o] = e.style[o], e.style[o] = t[o];
            }
            i = n.apply(e, r || []);
            for (o in t) {
                e.style[o] = a[o];
            }
            return i;
        }
    }), x.ready.promise = function(t) {
        if (!n) {
            if (n = x.Deferred(), "complete" === a.readyState) {
                setTimeout(x.ready);
            } else {
                if (a.addEventListener) {
                    a.addEventListener("DOMContentLoaded", q, !1), e.addEventListener("load", q, !1);
                } else {
                    a.attachEvent("onreadystatechange", q), e.attachEvent("onload", q);
                    var r = !1;
                    try {
                        r = null == e.frameElement && a.documentElement;
                    } catch (i) {}
                    r && r.doScroll && function o() {
                        if (!x.isReady) {
                            try {
                                r.doScroll("left");
                            } catch (e) {
                                return setTimeout(o, 50);
                            }
                            _(), x.ready();
                        }
                    }();
                }
            }
        }
        return n.promise(t);
    }, x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        c["[object " + t + "]"] = t.toLowerCase();
    });

    function M(e) {
        var t = e.length,
            n = x.type(e);
        return x.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e);
    }

    r = x(a),
        function(e, t) {
            var n, r, i, o, a, s, l, u, c, p, f, d, h, g, m, y, v, b = "sizzle" + -new Date,
                w = e.document,
                T = 0,
                C = 0,
                N = st(),
                k = st(),
                E = st(),
                S = !1,
                A = function(e, t) {
                    return e === t ? (S = !0, 0) : 0;
                },
                j = typeof t,
                D = 1 << 31,
                L = {}.hasOwnProperty,
                H = [],
                q = H.pop,
                _ = H.push,
                M = H.push,
                O = H.slice,
                F = H.indexOf || function(e) {
                        var t = 0,
                            n = this.length;
                        for (; n > t; t++) {
                            if (this[t] === e) {
                                return t;
                            }
                        }
                        return -1;
                    },
                B = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                P = "[\\x20\\t\\r\\n\\f]",
                R = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                W = R.replace("w", "w#"),
                $ = "\\[" + P + "*(" + R + ")" + P + "*(?:([*^$|!~]?=)" + P + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + W + ")|)|)" + P + "*\\]",
                I = ":(" + R + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + $.replace(3, 8) + ")*)|.*)\\)|)",
                z = RegExp("^" + P + "+|((?:^|[^\\\\])(?:\\\\.)*)" + P + "+$", "g"),
                X = RegExp("^" + P + "*," + P + "*"),
                U = RegExp("^" + P + "*([>+~]|" + P + ")" + P + "*"),
                V = RegExp(P + "*[+~]"),
                Y = RegExp("=" + P + "*([^\\]'\"]*)" + P + "*\\]", "g"),
                J = RegExp(I),
                G = RegExp("^" + W + "$"),
                Q = {
                    ID: RegExp("^#(" + R + ")"),
                    CLASS: RegExp("^\\.(" + R + ")"),
                    TAG: RegExp("^(" + R.replace("w", "w*") + ")"),
                    ATTR: RegExp("^" + $),
                    PSEUDO: RegExp("^" + I),
                    CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + P + "*(even|odd|(([+-]|)(\\d*)n|)" + P + "*(?:([+-]|)" + P + "*(\\d+)|))" + P + "*\\)|)", "i"),
                    bool: RegExp("^(?:" + B + ")$", "i"),
                    needsContext: RegExp("^" + P + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + P + "*((?:-\\d)?\\d*)" + P + "*\\)|)(?=[^-]|$)", "i")
                },
                K = /^[^{]+\{\s*\[native \w/,
                Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                et = /^(?:input|select|textarea|button)$/i,
                tt = /^h\d$/i,
                nt = /'|\\/g,
                rt = RegExp("\\\\([\\da-f]{1,6}" + P + "?|(" + P + ")|.)", "ig"),
                it = function(e, t, n) {
                    var r = "0x" + t - 65536;
                    return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r);
                };
            try {
                M.apply(H = O.call(w.childNodes), w.childNodes), H[w.childNodes.length].nodeType;
            } catch (ot) {
                M = {
                    apply: H.length ? function(e, t) {
                        _.apply(e, O.call(t));
                    } : function(e, t) {
                        var n = e.length,
                            r = 0;
                        while (e[n++] = t[r++]) {}
                        e.length = n - 1;
                    }
                };
            }

            function at(e, t, n, i) {
                var o, a, s, l, u, c, d, m, y, x;
                if ((t ? t.ownerDocument || t : w) !== f && p(t), t = t || f, n = n || [], !e || "string" != typeof e) {
                    return n;
                }
                if (1 !== (l = t.nodeType) && 9 !== l) {
                    return [];
                }
                if (h && !i) {
                    if (o = Z.exec(e)) {
                        if (s = o[1]) {
                            if (9 === l) {
                                if (a = t.getElementById(s), !a || !a.parentNode) {
                                    return n;
                                }
                                if (a.id === s) {
                                    return n.push(a), n;
                                }
                            } else {
                                if (t.ownerDocument && (a = t.ownerDocument.getElementById(s)) && v(t, a) && a.id === s) {
                                    return n.push(a), n;
                                }
                            }
                        } else {
                            if (o[2]) {
                                return M.apply(n, t.getElementsByTagName(e)), n;
                            }
                            if ((s = o[3]) && r.getElementsByClassName && t.getElementsByClassName) {
                                return M.apply(n, t.getElementsByClassName(s)), n;
                            }
                        }
                    }
                    if (r.qsa && (!g || !g.test(e))) {
                        if (m = d = b, y = t, x = 9 === l && e, 1 === l && "object" !== t.nodeName.toLowerCase()) {
                            c = mt(e), (d = t.getAttribute("id")) ? m = d.replace(nt, "\\$&") : t.setAttribute("id", m), m = "[id='" + m + "'] ", u = c.length;
                            while (u--) {
                                c[u] = m + yt(c[u]);
                            }
                            y = V.test(e) && t.parentNode || t, x = c.join(",");
                        }
                        if (x) {
                            try {
                                return M.apply(n, y.querySelectorAll(x)), n;
                            } catch (T) {} finally {
                                d || t.removeAttribute("id");
                            }
                        }
                    }
                }
                return kt(e.replace(z, "$1"), t, n, i);
            }

            function st() {
                var e = [];

                function t(n, r) {
                    return e.push(n += " ") > o.cacheLength && delete t[e.shift()], t[n] = r;
                }

                return t;
            }

            function lt(e) {
                return e[b] = !0, e;
            }

            function ut(e) {
                var t = f.createElement("div");
                try {
                    return !!e(t);
                } catch (n) {
                    return !1;
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null;
                }
            }

            function ct(e, t) {
                var n = e.split("|"),
                    r = e.length;
                while (r--) {
                    o.attrHandle[n[r]] = t;
                }
            }

            function pt(e, t) {
                var n = t && e,
                    r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || D) - (~e.sourceIndex || D);
                if (r) {
                    return r;
                }
                if (n) {
                    while (n = n.nextSibling) {
                        if (n === t) {
                            return -1;
                        }
                    }
                }
                return e ? 1 : -1;
            }

            function ft(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return "input" === n && t.type === e;
                };
            }

            function dt(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e;
                };
            }

            function ht(e) {
                return lt(function(t) {
                    return t = +t, lt(function(n, r) {
                        var i, o = e([], n.length, t),
                            a = o.length;
                        while (a--) {
                            n[i = o[a]] && (n[i] = !(r[i] = n[i]));
                        }
                    });
                });
            }

            s = at.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? "HTML" !== t.nodeName : !1;
            }, r = at.support = {}, p = at.setDocument = function(e) {
                var n = e ? e.ownerDocument || e : w,
                    i = n.defaultView;
                return n !== f && 9 === n.nodeType && n.documentElement ? (f = n, d = n.documentElement, h = !s(n), i && i.attachEvent && i !== i.top && i.attachEvent("onbeforeunload", function() {
                    p();
                }), r.attributes = ut(function(e) {
                    return e.className = "i", !e.getAttribute("className");
                }), r.getElementsByTagName = ut(function(e) {
                    return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length;
                }), r.getElementsByClassName = ut(function(e) {
                    return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length;
                }), r.getById = ut(function(e) {
                    return d.appendChild(e).id = b, !n.getElementsByName || !n.getElementsByName(b).length;
                }), r.getById ? (o.find.ID = function(e, t) {
                    if (typeof t.getElementById !== j && h) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : [];
                    }
                }, o.filter.ID = function(e) {
                    var t = e.replace(rt, it);
                    return function(e) {
                        return e.getAttribute("id") === t;
                    };
                }) : (delete o.find.ID, o.filter.ID = function(e) {
                    var t = e.replace(rt, it);
                    return function(e) {
                        var n = typeof e.getAttributeNode !== j && e.getAttributeNode("id");
                        return n && n.value === t;
                    };
                }), o.find.TAG = r.getElementsByTagName ? function(e, n) {
                    return typeof n.getElementsByTagName !== j ? n.getElementsByTagName(e) : t;
                } : function(e, t) {
                    var n, r = [],
                        i = 0,
                        o = t.getElementsByTagName(e);
                    if ("*" === e) {
                        while (n = o[i++]) {
                            1 === n.nodeType && r.push(n);
                        }
                        return r;
                    }
                    return o;
                }, o.find.CLASS = r.getElementsByClassName && function(e, n) {
                    return typeof n.getElementsByClassName !== j && h ? n.getElementsByClassName(e) : t;
                }, m = [], g = [], (r.qsa = K.test(n.querySelectorAll)) && (ut(function(e) {
                    e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || g.push("\\[" + P + "*(?:value|" + B + ")"), e.querySelectorAll(":checked").length || g.push(":checked");
                }), ut(function(e) {
                    var t = n.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && g.push("[*^$]=" + P + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || g.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), g.push(",.*:");
                })), (r.matchesSelector = K.test(y = d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && ut(function(e) {
                    r.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), m.push("!=", I);
                }), g = g.length && RegExp(g.join("|")), m = m.length && RegExp(m.join("|")), v = K.test(d.contains) || d.compareDocumentPosition ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        r = t && t.parentNode;
                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
                } : function(e, t) {
                    if (t) {
                        while (t = t.parentNode) {
                            if (t === e) {
                                return !0;
                            }
                        }
                    }
                    return !1;
                }, A = d.compareDocumentPosition ? function(e, t) {
                    if (e === t) {
                        return S = !0, 0;
                    }
                    var i = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t);
                    return i ? 1 & i || !r.sortDetached && t.compareDocumentPosition(e) === i ? e === n || v(w, e) ? -1 : t === n || v(w, t) ? 1 : c ? F.call(c, e) - F.call(c, t) : 0 : 4 & i ? -1 : 1 : e.compareDocumentPosition ? -1 : 1;
                } : function(e, t) {
                    var r, i = 0,
                        o = e.parentNode,
                        a = t.parentNode,
                        s = [e],
                        l = [t];
                    if (e === t) {
                        return S = !0, 0;
                    }
                    if (!o || !a) {
                        return e === n ? -1 : t === n ? 1 : o ? -1 : a ? 1 : c ? F.call(c, e) - F.call(c, t) : 0;
                    }
                    if (o === a) {
                        return pt(e, t);
                    }
                    r = e;
                    while (r = r.parentNode) {
                        s.unshift(r);
                    }
                    r = t;
                    while (r = r.parentNode) {
                        l.unshift(r);
                    }
                    while (s[i] === l[i]) {
                        i++;
                    }
                    return i ? pt(s[i], l[i]) : s[i] === w ? -1 : l[i] === w ? 1 : 0;
                }, n) : f;
            }, at.matches = function(e, t) {
                return at(e, null, null, t);
            }, at.matchesSelector = function(e, t) {
                if ((e.ownerDocument || e) !== f && p(e), t = t.replace(Y, "='$1']"), !(!r.matchesSelector || !h || m && m.test(t) || g && g.test(t))) {
                    try {
                        var n = y.call(e, t);
                        if (n || r.disconnectedMatch || e.document && 11 !== e.document.nodeType) {
                            return n;
                        }
                    } catch (i) {}
                }
                return at(t, f, null, [e]).length > 0;
            }, at.contains = function(e, t) {
                return (e.ownerDocument || e) !== f && p(e), v(e, t);
            }, at.attr = function(e, n) {
                (e.ownerDocument || e) !== f && p(e);
                var i = o.attrHandle[n.toLowerCase()],
                    a = i && L.call(o.attrHandle, n.toLowerCase()) ? i(e, n, !h) : t;
                return a === t ? r.attributes || !h ? e.getAttribute(n) : (a = e.getAttributeNode(n)) && a.specified ? a.value : null : a;
            }, at.error = function(e) {
                throw Error("Syntax error, unrecognized expression: " + e);
            }, at.uniqueSort = function(e) {
                var t, n = [],
                    i = 0,
                    o = 0;
                if (S = !r.detectDuplicates, c = !r.sortStable && e.slice(0), e.sort(A), S) {
                    while (t = e[o++]) {
                        t === e[o] && (i = n.push(o));
                    }
                    while (i--) {
                        e.splice(n[i], 1);
                    }
                }
                return e;
            }, a = at.getText = function(e) {
                var t, n = "",
                    r = 0,
                    i = e.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof e.textContent) {
                            return e.textContent;
                        }
                        for (e = e.firstChild; e; e = e.nextSibling) {
                            n += a(e);
                        }
                    } else {
                        if (3 === i || 4 === i) {
                            return e.nodeValue;
                        }
                    }
                } else {
                    for (; t = e[r]; r++) {
                        n += a(t);
                    }
                }
                return n;
            }, o = at.selectors = {
                cacheLength: 50,
                createPseudo: lt,
                match: Q,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(rt, it), e[3] = (e[4] || e[5] || "").replace(rt, it), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || at.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && at.error(e[0]), e;
                    },
                    PSEUDO: function(e) {
                        var n, r = !e[5] && e[2];
                        return Q.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : r && J.test(r) && (n = mt(r, !0)) && (n = r.indexOf(")", r.length - n) - r.length) && (e[0] = e[0].slice(0, n), e[2] = r.slice(0, n)), e.slice(0, 3));
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(rt, it).toLowerCase();
                        return "*" === e ? function() {
                            return !0;
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t;
                        };
                    },
                    CLASS: function(e) {
                        var t = N[e + " "];
                        return t || (t = RegExp("(^|" + P + ")" + e + "(" + P + "|$)")) && N(e, function(e) {
                                return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== j && e.getAttribute("class") || "");
                            });
                    },
                    ATTR: function(e, t, n) {
                        return function(r) {
                            var i = at.attr(r, e);
                            return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0;
                        };
                    },
                    CHILD: function(e, t, n, r, i) {
                        var o = "nth" !== e.slice(0, 3),
                            a = "last" !== e.slice(-4),
                            s = "of-type" === t;
                        return 1 === r && 0 === i ? function(e) {
                            return !!e.parentNode;
                        } : function(t, n, l) {
                            var u, c, p, f, d, h, g = o !== a ? "nextSibling" : "previousSibling",
                                m = t.parentNode,
                                y = s && t.nodeName.toLowerCase(),
                                v = !l && !s;
                            if (m) {
                                if (o) {
                                    while (g) {
                                        p = t;
                                        while (p = p[g]) {
                                            if (s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) {
                                                return !1;
                                            }
                                        }
                                        h = g = "only" === e && !h && "nextSibling";
                                    }
                                    return !0;
                                }
                                if (h = [a ? m.firstChild : m.lastChild], a && v) {
                                    c = m[b] || (m[b] = {}), u = c[e] || [], d = u[0] === T && u[1], f = u[0] === T && u[2], p = d && m.childNodes[d];
                                    while (p = ++d && p && p[g] || (f = d = 0) || h.pop()) {
                                        if (1 === p.nodeType && ++f && p === t) {
                                            c[e] = [T, d, f];
                                            break;
                                        }
                                    }
                                } else {
                                    if (v && (u = (t[b] || (t[b] = {}))[e]) && u[0] === T) {
                                        f = u[1];
                                    } else {
                                        while (p = ++d && p && p[g] || (f = d = 0) || h.pop()) {
                                            if ((s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) && ++f && (v && ((p[b] || (p[b] = {}))[e] = [T, f]), p === t)) {
                                                break;
                                            }
                                        }
                                    }
                                }
                                return f -= i, f === r || 0 === f % r && f / r >= 0;
                            }
                        };
                    },
                    PSEUDO: function(e, t) {
                        var n, r = o.pseudos[e] || o.setFilters[e.toLowerCase()] || at.error("unsupported pseudo: " + e);
                        return r[b] ? r(t) : r.length > 1 ? (n = [e, e, "", t], o.setFilters.hasOwnProperty(e.toLowerCase()) ? lt(function(e, n) {
                            var i, o = r(e, t),
                                a = o.length;
                            while (a--) {
                                i = F.call(e, o[a]), e[i] = !(n[i] = o[a]);
                            }
                        }) : function(e) {
                            return r(e, 0, n);
                        }) : r;
                    }
                },
                pseudos: {
                    not: lt(function(e) {
                        var t = [],
                            n = [],
                            r = l(e.replace(z, "$1"));
                        return r[b] ? lt(function(e, t, n, i) {
                            var o, a = r(e, null, i, []),
                                s = e.length;
                            while (s--) {
                                (o = a[s]) && (e[s] = !(t[s] = o));
                            }
                        }) : function(e, i, o) {
                            return t[0] = e, r(t, null, o, n), !n.pop();
                        };
                    }),
                    has: lt(function(e) {
                        return function(t) {
                            return at(e, t).length > 0;
                        };
                    }),
                    contains: lt(function(e) {
                        return function(t) {
                            return (t.textContent || t.innerText || a(t)).indexOf(e) > -1;
                        };
                    }),
                    lang: lt(function(e) {
                        return G.test(e || "") || at.error("unsupported lang: " + e), e = e.replace(rt, it).toLowerCase(),
                            function(t) {
                                var n;
                                do {
                                    if (n = h ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) {
                                        return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                                    }
                                } while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1;
                            };
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id;
                    },
                    root: function(e) {
                        return e === d;
                    },
                    focus: function(e) {
                        return e === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                    },
                    enabled: function(e) {
                        return e.disabled === !1;
                    },
                    disabled: function(e) {
                        return e.disabled === !0;
                    },
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected;
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling) {
                            if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) {
                                return !1;
                            }
                        }
                        return !0;
                    },
                    parent: function(e) {
                        return !o.pseudos.empty(e);
                    },
                    header: function(e) {
                        return tt.test(e.nodeName);
                    },
                    input: function(e) {
                        return et.test(e.nodeName);
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t;
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type);
                    },
                    first: ht(function() {
                        return [0];
                    }),
                    last: ht(function(e, t) {
                        return [t - 1];
                    }),
                    eq: ht(function(e, t, n) {
                        return [0 > n ? n + t : n];
                    }),
                    even: ht(function(e, t) {
                        var n = 0;
                        for (; t > n; n += 2) {
                            e.push(n);
                        }
                        return e;
                    }),
                    odd: ht(function(e, t) {
                        var n = 1;
                        for (; t > n; n += 2) {
                            e.push(n);
                        }
                        return e;
                    }),
                    lt: ht(function(e, t, n) {
                        var r = 0 > n ? n + t : n;
                        for (; --r >= 0;) {
                            e.push(r);
                        }
                        return e;
                    }),
                    gt: ht(function(e, t, n) {
                        var r = 0 > n ? n + t : n;
                        for (; t > ++r;) {
                            e.push(r);
                        }
                        return e;
                    })
                }
            }, o.pseudos.nth = o.pseudos.eq;
            for (n in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) {
                o.pseudos[n] = ft(n);
            }
            for (n in {
                submit: !0,
                reset: !0
            }) {
                o.pseudos[n] = dt(n);
            }

            function gt() {}

            gt.prototype = o.filters = o.pseudos, o.setFilters = new gt;

            function mt(e, t) {
                var n, r, i, a, s, l, u, c = k[e + " "];
                if (c) {
                    return t ? 0 : c.slice(0);
                }
                s = e, l = [], u = o.preFilter;
                while (s) {
                    (!n || (r = X.exec(s))) && (r && (s = s.slice(r[0].length) || s), l.push(i = [])), n = !1, (r = U.exec(s)) && (n = r.shift(), i.push({
                        value: n,
                        type: r[0].replace(z, " ")
                    }), s = s.slice(n.length));
                    for (a in o.filter) {
                        !(r = Q[a].exec(s)) || u[a] && !(r = u[a](r)) || (n = r.shift(), i.push({
                            value: n,
                            type: a,
                            matches: r
                        }), s = s.slice(n.length));
                    }
                    if (!n) {
                        break;
                    }
                }
                return t ? s.length : s ? at.error(e) : k(e, l).slice(0);
            }

            function yt(e) {
                var t = 0,
                    n = e.length,
                    r = "";
                for (; n > t; t++) {
                    r += e[t].value;
                }
                return r;
            }

            function vt(e, t, n) {
                var r = t.dir,
                    o = n && "parentNode" === r,
                    a = C++;
                return t.first ? function(t, n, i) {
                    while (t = t[r]) {
                        if (1 === t.nodeType || o) {
                            return e(t, n, i);
                        }
                    }
                } : function(t, n, s) {
                    var l, u, c, p = T + " " + a;
                    if (s) {
                        while (t = t[r]) {
                            if ((1 === t.nodeType || o) && e(t, n, s)) {
                                return !0;
                            }
                        }
                    } else {
                        while (t = t[r]) {
                            if (1 === t.nodeType || o) {
                                if (c = t[b] || (t[b] = {}), (u = c[r]) && u[0] === p) {
                                    if ((l = u[1]) === !0 || l === i) {
                                        return l === !0;
                                    }
                                } else {
                                    if (u = c[r] = [p], u[1] = e(t, n, s) || i, u[1] === !0) {
                                        return !0;
                                    }
                                }
                            }
                        }
                    }
                };
            }

            function bt(e) {
                return e.length > 1 ? function(t, n, r) {
                    var i = e.length;
                    while (i--) {
                        if (!e[i](t, n, r)) {
                            return !1;
                        }
                    }
                    return !0;
                } : e[0];
            }

            function xt(e, t, n, r, i) {
                var o, a = [],
                    s = 0,
                    l = e.length,
                    u = null != t;
                for (; l > s; s++) {
                    (o = e[s]) && (!n || n(o, r, i)) && (a.push(o), u && t.push(s));
                }
                return a;
            }

            function wt(e, t, n, r, i, o) {
                return r && !r[b] && (r = wt(r)), i && !i[b] && (i = wt(i, o)), lt(function(o, a, s, l) {
                    var u, c, p, f = [],
                        d = [],
                        h = a.length,
                        g = o || Nt(t || "*", s.nodeType ? [s] : s, []),
                        m = !e || !o && t ? g : xt(g, f, e, s, l),
                        y = n ? i || (o ? e : h || r) ? [] : a : m;
                    if (n && n(m, y, s, l), r) {
                        u = xt(y, d), r(u, [], s, l), c = u.length;
                        while (c--) {
                            (p = u[c]) && (y[d[c]] = !(m[d[c]] = p));
                        }
                    }
                    if (o) {
                        if (i || e) {
                            if (i) {
                                u = [], c = y.length;
                                while (c--) {
                                    (p = y[c]) && u.push(m[c] = p);
                                }
                                i(null, y = [], u, l);
                            }
                            c = y.length;
                            while (c--) {
                                (p = y[c]) && (u = i ? F.call(o, p) : f[c]) > -1 && (o[u] = !(a[u] = p));
                            }
                        }
                    } else {
                        y = xt(y === a ? y.splice(h, y.length) : y), i ? i(null, a, y, l) : M.apply(a, y);
                    }
                });
            }

            function Tt(e) {
                var t, n, r, i = e.length,
                    a = o.relative[e[0].type],
                    s = a || o.relative[" "],
                    l = a ? 1 : 0,
                    c = vt(function(e) {
                        return e === t;
                    }, s, !0),
                    p = vt(function(e) {
                        return F.call(t, e) > -1;
                    }, s, !0),
                    f = [function(e, n, r) {
                        return !a && (r || n !== u) || ((t = n).nodeType ? c(e, n, r) : p(e, n, r));
                    }];
                for (; i > l; l++) {
                    if (n = o.relative[e[l].type]) {
                        f = [vt(bt(f), n)];
                    } else {
                        if (n = o.filter[e[l].type].apply(null, e[l].matches), n[b]) {
                            for (r = ++l; i > r; r++) {
                                if (o.relative[e[r].type]) {
                                    break;
                                }
                            }
                            return wt(l > 1 && bt(f), l > 1 && yt(e.slice(0, l - 1).concat({
                                value: " " === e[l - 2].type ? "*" : ""
                            })).replace(z, "$1"), n, r > l && Tt(e.slice(l, r)), i > r && Tt(e = e.slice(r)), i > r && yt(e));
                        }
                        f.push(n);
                    }
                }
                return bt(f);
            }

            function Ct(e, t) {
                var n = 0,
                    r = t.length > 0,
                    a = e.length > 0,
                    s = function(s, l, c, p, d) {
                        var h, g, m, y = [],
                            v = 0,
                            b = "0",
                            x = s && [],
                            w = null != d,
                            C = u,
                            N = s || a && o.find.TAG("*", d && l.parentNode || l),
                            k = T += null == C ? 1 : Math.random() || 0.1;
                        for (w && (u = l !== f && l, i = n); null != (h = N[b]); b++) {
                            if (a && h) {
                                g = 0;
                                while (m = e[g++]) {
                                    if (m(h, l, c)) {
                                        p.push(h);
                                        break;
                                    }
                                }
                                w && (T = k, i = ++n);
                            }
                            r && ((h = !m && h) && v--, s && x.push(h));
                        }
                        if (v += b, r && b !== v) {
                            g = 0;
                            while (m = t[g++]) {
                                m(x, y, l, c);
                            }
                            if (s) {
                                if (v > 0) {
                                    while (b--) {
                                        x[b] || y[b] || (y[b] = q.call(p));
                                    }
                                }
                                y = xt(y);
                            }
                            M.apply(p, y), w && !s && y.length > 0 && v + t.length > 1 && at.uniqueSort(p);
                        }
                        return w && (T = k, u = C), x;
                    };
                return r ? lt(s) : s;
            }

            l = at.compile = function(e, t) {
                var n, r = [],
                    i = [],
                    o = E[e + " "];
                if (!o) {
                    t || (t = mt(e)), n = t.length;
                    while (n--) {
                        o = Tt(t[n]), o[b] ? r.push(o) : i.push(o);
                    }
                    o = E(e, Ct(i, r));
                }
                return o;
            };

            function Nt(e, t, n) {
                var r = 0,
                    i = t.length;
                for (; i > r; r++) {
                    at(e, t[r], n);
                }
                return n;
            }

            function kt(e, t, n, i) {
                var a, s, u, c, p, f = mt(e);
                if (!i && 1 === f.length) {
                    if (s = f[0] = f[0].slice(0), s.length > 2 && "ID" === (u = s[0]).type && r.getById && 9 === t.nodeType && h && o.relative[s[1].type]) {
                        if (t = (o.find.ID(u.matches[0].replace(rt, it), t) || [])[0], !t) {
                            return n;
                        }
                        e = e.slice(s.shift().value.length);
                    }
                    a = Q.needsContext.test(e) ? 0 : s.length;
                    while (a--) {
                        if (u = s[a], o.relative[c = u.type]) {
                            break;
                        }
                        if ((p = o.find[c]) && (i = p(u.matches[0].replace(rt, it), V.test(s[0].type) && t.parentNode || t))) {
                            if (s.splice(a, 1), e = i.length && yt(s), !e) {
                                return M.apply(n, i), n;
                            }
                            break;
                        }
                    }
                }
                return l(e, f)(i, t, !h, n, V.test(e)), n;
            }

            r.sortStable = b.split("").sort(A).join("") === b, r.detectDuplicates = S, p(), r.sortDetached = ut(function(e) {
                return 1 & e.compareDocumentPosition(f.createElement("div"));
            }), ut(function(e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
            }) || ct("type|href|height|width", function(e, n, r) {
                return r ? t : e.getAttribute(n, "type" === n.toLowerCase() ? 1 : 2);
            }), r.attributes && ut(function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
            }) || ct("value", function(e, n, r) {
                return r || "input" !== e.nodeName.toLowerCase() ? t : e.defaultValue;
            }), ut(function(e) {
                return null == e.getAttribute("disabled");
            }) || ct(B, function(e, n, r) {
                var i;
                return r ? t : (i = e.getAttributeNode(n)) && i.specified ? i.value : e[n] === !0 ? n.toLowerCase() : null;
            }), x.find = at, x.expr = at.selectors, x.expr[":"] = x.expr.pseudos, x.unique = at.uniqueSort, x.text = at.getText, x.isXMLDoc = at.isXML, x.contains = at.contains;
        }(e);
    var O = {};

    function F(e) {
        var t = O[e] = {};
        return x.each(e.match(T) || [], function(e, n) {
            t[n] = !0;
        }), t;
    }

    x.Callbacks = function(e) {
        e = "string" == typeof e ? O[e] || F(e) : x.extend({}, e);
        var n, r, i, o, a, s, l = [],
            u = !e.once && [],
            c = function(t) {
                for (r = e.memory && t, i = !0, a = s || 0, s = 0, o = l.length, n = !0; l && o > a; a++) {
                    if (l[a].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                        r = !1;
                        break;
                    }
                }
                n = !1, l && (u ? u.length && c(u.shift()) : r ? l = [] : p.disable());
            },
            p = {
                add: function() {
                    if (l) {
                        var t = l.length;
                        (function i(t) {
                            x.each(t, function(t, n) {
                                var r = x.type(n);
                                "function" === r ? e.unique && p.has(n) || l.push(n) : n && n.length && "string" !== r && i(n);
                            });
                        })(arguments), n ? o = l.length : r && (s = t, c(r));
                    }
                    return this;
                },
                remove: function() {
                    return l && x.each(arguments, function(e, t) {
                        var r;
                        while ((r = x.inArray(t, l, r)) > -1) {
                            l.splice(r, 1), n && (o >= r && o--, a >= r && a--);
                        }
                    }), this;
                },
                has: function(e) {
                    return e ? x.inArray(e, l) > -1 : !(!l || !l.length);
                },
                empty: function() {
                    return l = [], o = 0, this;
                },
                disable: function() {
                    return l = u = r = t, this;
                },
                disabled: function() {
                    return !l;
                },
                lock: function() {
                    return u = t, r || p.disable(), this;
                },
                locked: function() {
                    return !u;
                },
                fireWith: function(e, t) {
                    return !l || i && !u || (t = t || [], t = [e, t.slice ? t.slice() : t], n ? u.push(t) : c(t)), this;
                },
                fire: function() {
                    return p.fireWith(this, arguments), this;
                },
                fired: function() {
                    return !!i;
                }
            };
        return p;
    }, x.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", x.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", x.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", x.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function() {
                        return n;
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this;
                    },
                    then: function() {
                        var e = arguments;
                        return x.Deferred(function(n) {
                            x.each(t, function(t, o) {
                                var a = o[0],
                                    s = x.isFunction(e[t]) && e[t];
                                i[o[1]](function() {
                                    var e = s && s.apply(this, arguments);
                                    e && x.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [e] : arguments);
                                });
                            }), e = null;
                        }).promise();
                    },
                    promise: function(e) {
                        return null != e ? x.extend(e, r) : r;
                    }
                },
                i = {};
            return r.pipe = r.then, x.each(t, function(e, o) {
                var a = o[2],
                    s = o[3];
                r[o[1]] = a.add, s && a.add(function() {
                    n = s;
                }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
                    return i[o[0] + "With"](this === i ? r : this, arguments), this;
                }, i[o[0] + "With"] = a.fireWith;
            }), r.promise(i), e && e.call(i, i), i;
        },
        when: function(e) {
            var t = 0,
                n = g.call(arguments),
                r = n.length,
                i = 1 !== r || e && x.isFunction(e.promise) ? r : 0,
                o = 1 === i ? e : x.Deferred(),
                a = function(e, t, n) {
                    return function(r) {
                        t[e] = this, n[e] = arguments.length > 1 ? g.call(arguments) : r, n === s ? o.notifyWith(t, n) : --i || o.resolveWith(t, n);
                    };
                },
                s, l, u;
            if (r > 1) {
                for (s = Array(r), l = Array(r), u = Array(r); r > t; t++) {
                    n[t] && x.isFunction(n[t].promise) ? n[t].promise().done(a(t, u, n)).fail(o.reject).progress(a(t, l, s)) : --i;
                }
            }
            return i || o.resolveWith(u, n), o.promise();
        }
    }), x.support = function(t) {
        var n, r, o, s, l, u, c, p, f, d = a.createElement("div");
        if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = d.getElementsByTagName("*") || [], r = d.getElementsByTagName("a")[0], !r || !r.style || !n.length) {
            return t;
        }
        s = a.createElement("select"), u = s.appendChild(a.createElement("option")), o = d.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t.getSetAttribute = "t" !== d.className, t.leadingWhitespace = 3 === d.firstChild.nodeType, t.tbody = !d.getElementsByTagName("tbody").length, t.htmlSerialize = !!d.getElementsByTagName("link").length, t.style = /top/.test(r.getAttribute("style")), t.hrefNormalized = "/a" === r.getAttribute("href"), t.opacity = /^0.5/.test(r.style.opacity), t.cssFloat = !!r.style.cssFloat, t.checkOn = !!o.value, t.optSelected = u.selected, t.enctype = !!a.createElement("form").enctype, t.html5Clone = "<:nav></:nav>" !== a.createElement("nav").cloneNode(!0).outerHTML, t.inlineBlockNeedsLayout = !1, t.shrinkWrapBlocks = !1, t.pixelPosition = !1, t.deleteExpando = !0, t.noCloneEvent = !0, t.reliableMarginRight = !0, t.boxSizingReliable = !0, o.checked = !0, t.noCloneChecked = o.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !u.disabled;
        try {
            delete d.test;
        } catch (h) {
            t.deleteExpando = !1;
        }
        o = a.createElement("input"), o.setAttribute("value", ""), t.input = "" === o.getAttribute("value"), o.value = "t", o.setAttribute("type", "radio"), t.radioValue = "t" === o.value, o.setAttribute("checked", "t"), o.setAttribute("name", "t"), l = a.createDocumentFragment(), l.appendChild(o), t.appendChecked = o.checked, t.checkClone = l.cloneNode(!0).cloneNode(!0).lastChild.checked, d.attachEvent && (d.attachEvent("onclick", function() {
            t.noCloneEvent = !1;
        }), d.cloneNode(!0).click());
        for (f in {
            submit: !0,
            change: !0,
            focusin: !0
        }) {
            d.setAttribute(c = "on" + f, "t"), t[f + "Bubbles"] = c in e || d.attributes[c].expando === !1;
        }
        d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === d.style.backgroundClip;
        for (f in x(t)) {
            break;
        }
        return t.ownLast = "0" !== f, x(function() {
            var n, r, o, s = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                l = a.getElementsByTagName("body")[0];
            l && (n = a.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", l.appendChild(n).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", o = d.getElementsByTagName("td"), o[0].style.cssText = "padding:0;margin:0;border:0;display:none", p = 0 === o[0].offsetHeight, o[0].style.display = "", o[1].style.display = "none", t.reliableHiddenOffsets = p && 0 === o[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", x.swap(l, null != l.style.zoom ? {
                zoom: 1
            } : {}, function() {
                t.boxSizing = 4 === d.offsetWidth;
            }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(d, null) || {
                width: "4px"
            }).width, r = d.appendChild(a.createElement("div")), r.style.cssText = d.style.cssText = s, r.style.marginRight = r.style.width = "0", d.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), typeof d.style.zoom !== i && (d.innerHTML = "", d.style.cssText = s + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== d.offsetWidth, t.inlineBlockNeedsLayout && (l.style.zoom = 1)), l.removeChild(n), n = d = o = r = null);
        }), n = s = l = u = r = o = null, t;
    }({});
    var B = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        P = /([A-Z])/g;

    function R(e, n, r, i) {
        if (x.acceptData(e)) {
            var o, a, s = x.expando,
                l = e.nodeType,
                u = l ? x.cache : e,
                c = l ? e[s] : e[s] && s;
            if (c && u[c] && (i || u[c].data) || r !== t || "string" != typeof n) {
                return c || (c = l ? e[s] = p.pop() || x.guid++ : s), u[c] || (u[c] = l ? {} : {
                    toJSON: x.noop
                }), ("object" == typeof n || "function" == typeof n) && (i ? u[c] = x.extend(u[c], n) : u[c].data = x.extend(u[c].data, n)), a = u[c], i || (a.data || (a.data = {}), a = a.data), r !== t && (a[x.camelCase(n)] = r), "string" == typeof n ? (o = a[n], null == o && (o = a[x.camelCase(n)])) : o = a, o;
            }
        }
    }

    function W(e, t, n) {
        if (x.acceptData(e)) {
            var r, i, o = e.nodeType,
                a = o ? x.cache : e,
                s = o ? e[x.expando] : x.expando;
            if (a[s]) {
                if (t && (r = n ? a[s] : a[s].data)) {
                    x.isArray(t) ? t = t.concat(x.map(t, x.camelCase)) : t in r ? t = [t] : (t = x.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length;
                    while (i--) {
                        delete r[t[i]];
                    }
                    if (n ? !I(r) : !x.isEmptyObject(r)) {
                        return;
                    }
                }
                (n || (delete a[s].data, I(a[s]))) && (o ? x.cleanData([e], !0) : x.support.deleteExpando || a != a.window ? delete a[s] : a[s] = null);
            }
        }
    }

    x.extend({
        cache: {},
        noData: {
            applet: !0,
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(e) {
            return e = e.nodeType ? x.cache[e[x.expando]] : e[x.expando], !!e && !I(e);
        },
        data: function(e, t, n) {
            return R(e, t, n);
        },
        removeData: function(e, t) {
            return W(e, t);
        },
        _data: function(e, t, n) {
            return R(e, t, n, !0);
        },
        _removeData: function(e, t) {
            return W(e, t, !0);
        },
        acceptData: function(e) {
            if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) {
                return !1;
            }
            var t = e.nodeName && x.noData[e.nodeName.toLowerCase()];
            return !t || t !== !0 && e.getAttribute("classid") === t;
        }
    }), x.fn.extend({
        data: function(e, n) {
            var r, i, o = null,
                a = 0,
                s = this[0];
            if (e === t) {
                if (this.length && (o = x.data(s), 1 === s.nodeType && !x._data(s, "parsedAttrs"))) {
                    for (r = s.attributes; r.length > a; a++) {
                        i = r[a].name, 0 === i.indexOf("data-") && (i = x.camelCase(i.slice(5)), $(s, i, o[i]));
                    }
                    x._data(s, "parsedAttrs", !0);
                }
                return o;
            }
            return "object" == typeof e ? this.each(function() {
                x.data(this, e);
            }) : arguments.length > 1 ? this.each(function() {
                x.data(this, e, n);
            }) : s ? $(s, e, x.data(s, e)) : null;
        },
        removeData: function(e) {
            return this.each(function() {
                x.removeData(this, e);
            });
        }
    });

    function $(e, n, r) {
        if (r === t && 1 === e.nodeType) {
            var i = "data-" + n.replace(P, "-$1").toLowerCase();
            if (r = e.getAttribute(i), "string" == typeof r) {
                try {
                    r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : B.test(r) ? x.parseJSON(r) : r;
                } catch (o) {}
                x.data(e, n, r);
            } else {
                r = t;
            }
        }
        return r;
    }

    function I(e) {
        var t;
        for (t in e) {
            if (("data" !== t || !x.isEmptyObject(e[t])) && "toJSON" !== t) {
                return !1;
            }
        }
        return !0;
    }

    x.extend({
        queue: function(e, n, r) {
            var i;
            return e ? (n = (n || "fx") + "queue", i = x._data(e, n), r && (!i || x.isArray(r) ? i = x._data(e, n, x.makeArray(r)) : i.push(r)), i || []) : t;
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = x.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = x._queueHooks(e, t),
                a = function() {
                    x.dequeue(e, t);
                };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire();
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return x._data(e, n) || x._data(e, n, {
                    empty: x.Callbacks("once memory").add(function() {
                        x._removeData(e, t + "queue"), x._removeData(e, n);
                    })
                });
        }
    }), x.fn.extend({
        queue: function(e, n) {
            var r = 2;
            return "string" != typeof e && (n = e, e = "fx", r--), r > arguments.length ? x.queue(this[0], e) : n === t ? this : this.each(function() {
                var t = x.queue(this, e, n);
                x._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && x.dequeue(this, e);
            });
        },
        dequeue: function(e) {
            return this.each(function() {
                x.dequeue(this, e);
            });
        },
        delay: function(e, t) {
            return e = x.fx ? x.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r);
                };
            });
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", []);
        },
        promise: function(e, n) {
            var r, i = 1,
                o = x.Deferred(),
                a = this,
                s = this.length,
                l = function() {
                    --i || o.resolveWith(a, [a]);
                };
            "string" != typeof e && (n = e, e = t), e = e || "fx";
            while (s--) {
                r = x._data(a[s], e + "queueHooks"), r && r.empty && (i++, r.empty.add(l));
            }
            return l(), o.promise(n);
        }
    });
    var z, X, U = /[\t\r\n\f]/g,
        V = /\r/g,
        Y = /^(?:input|select|textarea|button|object)$/i,
        J = /^(?:a|area)$/i,
        G = /^(?:checked|selected)$/i,
        Q = x.support.getSetAttribute,
        K = x.support.input;
    x.fn.extend({
        attr: function(e, t) {
            return x.access(this, x.attr, e, t, arguments.length > 1);
        },
        removeAttr: function(e) {
            return this.each(function() {
                x.removeAttr(this, e);
            });
        },
        prop: function(e, t) {
            return x.access(this, x.prop, e, t, arguments.length > 1);
        },
        removeProp: function(e) {
            return e = x.propFix[e] || e, this.each(function() {
                try {
                    this[e] = t, delete this[e];
                } catch (n) {}
            });
        },
        addClass: function(e) {
            var t, n, r, i, o, a = 0,
                s = this.length,
                l = "string" == typeof e && e;
            if (x.isFunction(e)) {
                return this.each(function(t) {
                    x(this).addClass(e.call(this, t, this.className));
                });
            }
            if (l) {
                for (t = (e || "").match(T) || []; s > a; a++) {
                    if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(U, " ") : " ")) {
                        o = 0;
                        while (i = t[o++]) {
                            0 > r.indexOf(" " + i + " ") && (r += i + " ");
                        }
                        n.className = x.trim(r);
                    }
                }
            }
            return this;
        },
        removeClass: function(e) {
            var t, n, r, i, o, a = 0,
                s = this.length,
                l = 0 === arguments.length || "string" == typeof e && e;
            if (x.isFunction(e)) {
                return this.each(function(t) {
                    x(this).removeClass(e.call(this, t, this.className));
                });
            }
            if (l) {
                for (t = (e || "").match(T) || []; s > a; a++) {
                    if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(U, " ") : "")) {
                        o = 0;
                        while (i = t[o++]) {
                            while (r.indexOf(" " + i + " ") >= 0) {
                                r = r.replace(" " + i + " ", " ");
                            }
                        }
                        n.className = e ? x.trim(r) : "";
                    }
                }
            }
            return this;
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : x.isFunction(e) ? this.each(function(n) {
                x(this).toggleClass(e.call(this, n, this.className, t), t);
            }) : this.each(function() {
                if ("string" === n) {
                    var t, r = 0,
                        o = x(this),
                        a = e.match(T) || [];
                    while (t = a[r++]) {
                        o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                    }
                } else {
                    (n === i || "boolean" === n) && (this.className && x._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : x._data(this, "__className__") || "");
                }
            });
        },
        hasClass: function(e) {
            var t = " " + e + " ",
                n = 0,
                r = this.length;
            for (; r > n; n++) {
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(U, " ").indexOf(t) >= 0) {
                    return !0;
                }
            }
            return !1;
        },
        val: function(e) {
            var n, r, i, o = this[0];
            if (arguments.length) {
                return i = x.isFunction(e), this.each(function(n) {
                    var o;
                    1 === this.nodeType && (o = i ? e.call(this, n, x(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : x.isArray(o) && (o = x.map(o, function(e) {
                        return null == e ? "" : e + "";
                    })), r = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()], r && "set" in r && r.set(this, o, "value") !== t || (this.value = o));
                });
            }
            if (o) {
                return r = x.valHooks[o.type] || x.valHooks[o.nodeName.toLowerCase()], r && "get" in r && (n = r.get(o, "value")) !== t ? n : (n = o.value, "string" == typeof n ? n.replace(V, "") : null == n ? "" : n);
            }
        }
    }), x.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = x.find.attr(e, "value");
                    return null != t ? t : e.text;
                }
            },
            select: {
                get: function(e) {
                    var t, n, r = e.options,
                        i = e.selectedIndex,
                        o = "select-one" === e.type || 0 > i,
                        a = o ? null : [],
                        s = o ? i + 1 : r.length,
                        l = 0 > i ? s : o ? i : 0;
                    for (; s > l; l++) {
                        if (n = r[l], !(!n.selected && l !== i || (x.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && x.nodeName(n.parentNode, "optgroup"))) {
                            if (t = x(n).val(), o) {
                                return t;
                            }
                            a.push(t);
                        }
                    }
                    return a;
                },
                set: function(e, t) {
                    var n, r, i = e.options,
                        o = x.makeArray(t),
                        a = i.length;
                    while (a--) {
                        r = i[a], (r.selected = x.inArray(x(r).val(), o) >= 0) && (n = !0);
                    }
                    return n || (e.selectedIndex = -1), o;
                }
            }
        },
        attr: function(e, n, r) {
            var o, a, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s) {
                return typeof e.getAttribute === i ? x.prop(e, n, r) : (1 === s && x.isXMLDoc(e) || (n = n.toLowerCase(), o = x.attrHooks[n] || (x.expr.match.bool.test(n) ? X : z)), r === t ? o && "get" in o && null !== (a = o.get(e, n)) ? a : (a = x.find.attr(e, n), null == a ? t : a) : null !== r ? o && "set" in o && (a = o.set(e, r, n)) !== t ? a : (e.setAttribute(n, r + ""), r) : (x.removeAttr(e, n), t));
            }
        },
        removeAttr: function(e, t) {
            var n, r, i = 0,
                o = t && t.match(T);
            if (o && 1 === e.nodeType) {
                while (n = o[i++]) {
                    r = x.propFix[n] || n, x.expr.match.bool.test(n) ? K && Q || !G.test(n) ? e[r] = !1 : e[x.camelCase("default-" + n)] = e[r] = !1 : x.attr(e, n, ""), e.removeAttribute(Q ? n : r);
                }
            }
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!x.support.radioValue && "radio" === t && x.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t;
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, n, r) {
            var i, o, a, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s) {
                return a = 1 !== s || !x.isXMLDoc(e), a && (n = x.propFix[n] || n, o = x.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n];
            }
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = x.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : Y.test(e.nodeName) || J.test(e.nodeName) && e.href ? 0 : -1;
                }
            }
        }
    }), X = {
        set: function(e, t, n) {
            return t === !1 ? x.removeAttr(e, n) : K && Q || !G.test(n) ? e.setAttribute(!Q && x.propFix[n] || n, n) : e[x.camelCase("default-" + n)] = e[n] = !0, n;
        }
    }, x.each(x.expr.match.bool.source.match(/\w+/g), function(e, n) {
        var r = x.expr.attrHandle[n] || x.find.attr;
        x.expr.attrHandle[n] = K && Q || !G.test(n) ? function(e, n, i) {
            var o = x.expr.attrHandle[n],
                a = i ? t : (x.expr.attrHandle[n] = t) != r(e, n, i) ? n.toLowerCase() : null;
            return x.expr.attrHandle[n] = o, a;
        } : function(e, n, r) {
            return r ? t : e[x.camelCase("default-" + n)] ? n.toLowerCase() : null;
        };
    }), K && Q || (x.attrHooks.value = {
        set: function(e, n, r) {
            return x.nodeName(e, "input") ? (e.defaultValue = n, t) : z && z.set(e, n, r);
        }
    }), Q || (z = {
        set: function(e, n, r) {
            var i = e.getAttributeNode(r);
            return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", "value" === r || n === e.getAttribute(r) ? n : t;
        }
    }, x.expr.attrHandle.id = x.expr.attrHandle.name = x.expr.attrHandle.coords = function(e, n, r) {
        var i;
        return r ? t : (i = e.getAttributeNode(n)) && "" !== i.value ? i.value : null;
    }, x.valHooks.button = {
        get: function(e, n) {
            var r = e.getAttributeNode(n);
            return r && r.specified ? r.value : t;
        },
        set: z.set
    }, x.attrHooks.contenteditable = {
        set: function(e, t, n) {
            z.set(e, "" === t ? !1 : t, n);
        }
    }, x.each(["width", "height"], function(e, n) {
        x.attrHooks[n] = {
            set: function(e, r) {
                return "" === r ? (e.setAttribute(n, "auto"), r) : t;
            }
        };
    })), x.support.hrefNormalized || x.each(["href", "src"], function(e, t) {
        x.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4);
            }
        };
    }), x.support.style || (x.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || t;
        },
        set: function(e, t) {
            return e.style.cssText = t + "";
        }
    }), x.support.optSelected || (x.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null;
        }
    }), x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        x.propFix[this.toLowerCase()] = this;
    }), x.support.enctype || (x.propFix.enctype = "encoding"), x.each(["radio", "checkbox"], function() {
        x.valHooks[this] = {
            set: function(e, n) {
                return x.isArray(n) ? e.checked = x.inArray(x(e).val(), n) >= 0 : t;
            }
        }, x.support.checkOn || (x.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value;
        });
    });
    var Z = /^(?:input|select|textarea)$/i,
        et = /^key/,
        tt = /^(?:mouse|contextmenu)|click/,
        nt = /^(?:focusinfocus|focusoutblur)$/,
        rt = /^([^.]*)(?:\.(.+)|)$/;

    function it() {
        return !0;
    }

    function ot() {
        return !1;
    }

    function at() {
        try {
            return a.activeElement;
        } catch (e) {}
    }

    x.event = {
        global: {},
        add: function(e, n, r, o, a) {
            var s, l, u, c, p, f, d, h, g, m, y, v = x._data(e);
            if (v) {
                r.handler && (c = r, r = c.handler, a = c.selector), r.guid || (r.guid = x.guid++), (l = v.events) || (l = v.events = {}), (f = v.handle) || (f = v.handle = function(e) {
                    return typeof x === i || e && x.event.triggered === e.type ? t : x.event.dispatch.apply(f.elem, arguments);
                }, f.elem = e), n = (n || "").match(T) || [""], u = n.length;
                while (u--) {
                    s = rt.exec(n[u]) || [], g = y = s[1], m = (s[2] || "").split(".").sort(), g && (p = x.event.special[g] || {}, g = (a ? p.delegateType : p.bindType) || g, p = x.event.special[g] || {}, d = x.extend({
                        type: g,
                        origType: y,
                        data: o,
                        handler: r,
                        guid: r.guid,
                        selector: a,
                        needsContext: a && x.expr.match.needsContext.test(a),
                        namespace: m.join(".")
                    }, c), (h = l[g]) || (h = l[g] = [], h.delegateCount = 0, p.setup && p.setup.call(e, o, m, f) !== !1 || (e.addEventListener ? e.addEventListener(g, f, !1) : e.attachEvent && e.attachEvent("on" + g, f))), p.add && (p.add.call(e, d), d.handler.guid || (d.handler.guid = r.guid)), a ? h.splice(h.delegateCount++, 0, d) : h.push(d), x.event.global[g] = !0);
                }
                e = null;
            }
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, l, u, c, p, f, d, h, g, m = x.hasData(e) && x._data(e);
            if (m && (c = m.events)) {
                t = (t || "").match(T) || [""], u = t.length;
                while (u--) {
                    if (s = rt.exec(t[u]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
                        p = x.event.special[d] || {}, d = (r ? p.delegateType : p.bindType) || d, f = c[d] || [], s = s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = f.length;
                        while (o--) {
                            a = f[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o, 1), a.selector && f.delegateCount--, p.remove && p.remove.call(e, a));
                        }
                        l && !f.length && (p.teardown && p.teardown.call(e, h, m.handle) !== !1 || x.removeEvent(e, d, m.handle), delete c[d]);
                    } else {
                        for (d in c) {
                            x.event.remove(e, d + t[u], n, r, !0);
                        }
                    }
                }
                x.isEmptyObject(c) && (delete m.handle, x._removeData(e, "events"));
            }
        },
        trigger: function(n, r, i, o) {
            var s, l, u, c, p, f, d, h = [i || a],
                g = v.call(n, "type") ? n.type : n,
                m = v.call(n, "namespace") ? n.namespace.split(".") : [];
            if (u = f = i = i || a, 3 !== i.nodeType && 8 !== i.nodeType && !nt.test(g + x.event.triggered) && (g.indexOf(".") >= 0 && (m = g.split("."), g = m.shift(), m.sort()), l = 0 > g.indexOf(":") && "on" + g, n = n[x.expando] ? n : new x.Event(g, "object" == typeof n && n), n.isTrigger = o ? 2 : 3, n.namespace = m.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : x.makeArray(r, [n]), p = x.event.special[g] || {}, o || !p.trigger || p.trigger.apply(i, r) !== !1)) {
                if (!o && !p.noBubble && !x.isWindow(i)) {
                    for (c = p.delegateType || g, nt.test(c + g) || (u = u.parentNode); u; u = u.parentNode) {
                        h.push(u), f = u;
                    }
                    f === (i.ownerDocument || a) && h.push(f.defaultView || f.parentWindow || e);
                }
                d = 0;
                while ((u = h[d++]) && !n.isPropagationStopped()) {
                    n.type = d > 1 ? c : p.bindType || g, s = (x._data(u, "events") || {})[n.type] && x._data(u, "handle"), s && s.apply(u, r), s = l && u[l], s && x.acceptData(u) && s.apply && s.apply(u, r) === !1 && n.preventDefault();
                }
                if (n.type = g, !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(h.pop(), r) === !1) && x.acceptData(i) && l && i[g] && !x.isWindow(i)) {
                    f = i[l], f && (i[l] = null), x.event.triggered = g;
                    try {
                        i[g]();
                    } catch (y) {}
                    x.event.triggered = t, f && (i[l] = f);
                }
                return n.result;
            }
        },
        dispatch: function(e) {
            e = x.event.fix(e);
            var n, r, i, o, a, s = [],
                l = g.call(arguments),
                u = (x._data(this, "events") || {})[e.type] || [],
                c = x.event.special[e.type] || {};
            if (l[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                s = x.event.handlers.call(this, e, u), n = 0;
                while ((o = s[n++]) && !e.isPropagationStopped()) {
                    e.currentTarget = o.elem, a = 0;
                    while ((i = o.handlers[a++]) && !e.isImmediatePropagationStopped()) {
                        (!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, r = ((x.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, l), r !== t && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
                    }
                }
                return c.postDispatch && c.postDispatch.call(this, e), e.result;
            }
        },
        handlers: function(e, n) {
            var r, i, o, a, s = [],
                l = n.delegateCount,
                u = e.target;
            if (l && u.nodeType && (!e.button || "click" !== e.type)) {
                for (; u != this; u = u.parentNode || this) {
                    if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) {
                        for (o = [], a = 0; l > a; a++) {
                            i = n[a], r = i.selector + " ", o[r] === t && (o[r] = i.needsContext ? x(r, this).index(u) >= 0 : x.find(r, this, null, [u]).length), o[r] && o.push(i);
                        }
                        o.length && s.push({
                            elem: u,
                            handlers: o
                        });
                    }
                }
            }
            return n.length > l && s.push({
                elem: this,
                handlers: n.slice(l)
            }), s;
        },
        fix: function(e) {
            if (e[x.expando]) {
                return e;
            }
            var t, n, r, i = e.type,
                o = e,
                s = this.fixHooks[i];
            s || (this.fixHooks[i] = s = tt.test(i) ? this.mouseHooks : et.test(i) ? this.keyHooks : {}), r = s.props ? this.props.concat(s.props) : this.props, e = new x.Event(o), t = r.length;
            while (t--) {
                n = r[t], e[n] = o[n];
            }
            return e.target || (e.target = o.srcElement || a), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, o) : e;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, n) {
                var r, i, o, s = n.button,
                    l = n.fromElement;
                return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || a, o = i.documentElement, r = i.body, e.pageX = n.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0), e.pageY = n.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)), !e.relatedTarget && l && (e.relatedTarget = l === e.target ? n.toElement : l), e.which || s === t || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e;
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== at() && this.focus) {
                        try {
                            return this.focus(), !1;
                        } catch (e) {}
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === at() && this.blur ? (this.blur(), !1) : t;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return x.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : t;
                },
                _default: function(e) {
                    return x.nodeName(e.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    e.result !== t && (e.originalEvent.returnValue = e.result);
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = x.extend(new x.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? x.event.trigger(i, null, t) : x.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault();
        }
    }, x.removeEvent = a.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1);
    } : function(e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] === i && (e[r] = null), e.detachEvent(r, n));
    }, x.Event = function(e, n) {
        return this instanceof x.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? it : ot) : this.type = e, n && x.extend(this, n), this.timeStamp = e && e.timeStamp || x.now(), this[x.expando] = !0, t) : new x.Event(e, n);
    }, x.Event.prototype = {
        isDefaultPrevented: ot,
        isPropagationStopped: ot,
        isImmediatePropagationStopped: ot,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = it, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = it, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0);
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = it, this.stopPropagation();
        }
    }, x.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        x.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    o = e.handleObj;
                return (!i || i !== r && !x.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n;
            }
        };
    }), x.support.submitBubbles || (x.event.special.submit = {
        setup: function() {
            return x.nodeName(this, "form") ? !1 : (x.event.add(this, "click._submit keypress._submit", function(e) {
                var n = e.target,
                    r = x.nodeName(n, "input") || x.nodeName(n, "button") ? n.form : t;
                r && !x._data(r, "submitBubbles") && (x.event.add(r, "submit._submit", function(e) {
                    e._submit_bubble = !0;
                }), x._data(r, "submitBubbles", !0));
            }), t);
        },
        postDispatch: function(e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && x.event.simulate("submit", this.parentNode, e, !0));
        },
        teardown: function() {
            return x.nodeName(this, "form") ? !1 : (x.event.remove(this, "._submit"), t);
        }
    }), x.support.changeBubbles || (x.event.special.change = {
        setup: function() {
            return Z.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (x.event.add(this, "propertychange._change", function(e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0);
            }), x.event.add(this, "click._change", function(e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), x.event.simulate("change", this, e, !0);
            })), !1) : (x.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                Z.test(t.nodeName) && !x._data(t, "changeBubbles") && (x.event.add(t, "change._change", function(e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || x.event.simulate("change", this.parentNode, e, !0);
                }), x._data(t, "changeBubbles", !0));
            }), t);
        },
        handle: function(e) {
            var n = e.target;
            return this !== n || e.isSimulated || e.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? e.handleObj.handler.apply(this, arguments) : t;
        },
        teardown: function() {
            return x.event.remove(this, "._change"), !Z.test(this.nodeName);
        }
    }), x.support.focusinBubbles || x.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = 0,
            r = function(e) {
                x.event.simulate(t, e.target, x.event.fix(e), !0);
            };
        x.event.special[t] = {
            setup: function() {
                0 === n++ && a.addEventListener(e, r, !0);
            },
            teardown: function() {
                0 === --n && a.removeEventListener(e, r, !0);
            }
        };
    }), x.fn.extend({
        on: function(e, n, r, i, o) {
            var a, s;
            if ("object" == typeof e) {
                "string" != typeof n && (r = r || n, n = t);
                for (a in e) {
                    this.on(a, n, r, e[a], o);
                }
                return this;
            }
            if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1) {
                i = ot;
            } else {
                if (!i) {
                    return this;
                }
            }
            return 1 === o && (s = i, i = function(e) {
                return x().off(e), s.apply(this, arguments);
            }, i.guid = s.guid || (s.guid = x.guid++)), this.each(function() {
                x.event.add(this, e, i, r, n);
            });
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1);
        },
        off: function(e, n, r) {
            var i, o;
            if (e && e.preventDefault && e.handleObj) {
                return i = e.handleObj, x(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            }
            if ("object" == typeof e) {
                for (o in e) {
                    this.off(o, n, e[o]);
                }
                return this;
            }
            return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = ot), this.each(function() {
                x.event.remove(this, e, r, n);
            });
        },
        trigger: function(e, t) {
            return this.each(function() {
                x.event.trigger(e, t, this);
            });
        },
        triggerHandler: function(e, n) {
            var r = this[0];
            return r ? x.event.trigger(e, n, r, !0) : t;
        }
    });
    var st = /^.[^:#\[\.,]*$/,
        lt = /^(?:parents|prev(?:Until|All))/,
        ut = x.expr.match.needsContext,
        ct = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    x.fn.extend({
        find: function(e) {
            var t, n = [],
                r = this,
                i = r.length;
            if ("string" != typeof e) {
                return this.pushStack(x(e).filter(function() {
                    for (t = 0; i > t; t++) {
                        if (x.contains(r[t], this)) {
                            return !0;
                        }
                    }
                }));
            }
            for (t = 0; i > t; t++) {
                x.find(e, r[t], n);
            }
            return n = this.pushStack(i > 1 ? x.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n;
        },
        has: function(e) {
            var t, n = x(e, this),
                r = n.length;
            return this.filter(function() {
                for (t = 0; r > t; t++) {
                    if (x.contains(this, n[t])) {
                        return !0;
                    }
                }
            });
        },
        not: function(e) {
            return this.pushStack(ft(this, e || [], !0));
        },
        filter: function(e) {
            return this.pushStack(ft(this, e || [], !1));
        },
        is: function(e) {
            return !!ft(this, "string" == typeof e && ut.test(e) ? x(e) : e || [], !1).length;
        },
        closest: function(e, t) {
            var n, r = 0,
                i = this.length,
                o = [],
                a = ut.test(e) || "string" != typeof e ? x(e, t || this.context) : 0;
            for (; i > r; r++) {
                for (n = this[r]; n && n !== t; n = n.parentNode) {
                    if (11 > n.nodeType && (a ? a.index(n) > -1 : 1 === n.nodeType && x.find.matchesSelector(n, e))) {
                        n = o.push(n);
                        break;
                    }
                }
            }
            return this.pushStack(o.length > 1 ? x.unique(o) : o);
        },
        index: function(e) {
            return e ? "string" == typeof e ? x.inArray(this[0], x(e)) : x.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(e, t) {
            var n = "string" == typeof e ? x(e, t) : x.makeArray(e && e.nodeType ? [e] : e),
                r = x.merge(this.get(), n);
            return this.pushStack(x.unique(r));
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
        }
    });

    function pt(e, t) {
        do {
            e = e[t];
        } while (e && 1 !== e.nodeType);
        return e;
    }

    x.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null;
        },
        parents: function(e) {
            return x.dir(e, "parentNode");
        },
        parentsUntil: function(e, t, n) {
            return x.dir(e, "parentNode", n);
        },
        next: function(e) {
            return pt(e, "nextSibling");
        },
        prev: function(e) {
            return pt(e, "previousSibling");
        },
        nextAll: function(e) {
            return x.dir(e, "nextSibling");
        },
        prevAll: function(e) {
            return x.dir(e, "previousSibling");
        },
        nextUntil: function(e, t, n) {
            return x.dir(e, "nextSibling", n);
        },
        prevUntil: function(e, t, n) {
            return x.dir(e, "previousSibling", n);
        },
        siblings: function(e) {
            return x.sibling((e.parentNode || {}).firstChild, e);
        },
        children: function(e) {
            return x.sibling(e.firstChild);
        },
        contents: function(e) {
            return x.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : x.merge([], e.childNodes);
        }
    }, function(e, t) {
        x.fn[e] = function(n, r) {
            var i = x.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = x.filter(r, i)), this.length > 1 && (ct[e] || (i = x.unique(i)), lt.test(e) && (i = i.reverse())), this.pushStack(i);
        };
    }), x.extend({
        filter: function(e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? x.find.matchesSelector(r, e) ? [r] : [] : x.find.matches(e, x.grep(t, function(e) {
                return 1 === e.nodeType;
            }));
        },
        dir: function(e, n, r) {
            var i = [],
                o = e[n];
            while (o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !x(o).is(r))) {
                1 === o.nodeType && i.push(o), o = o[n];
            }
            return i;
        },
        sibling: function(e, t) {
            var n = [];
            for (; e; e = e.nextSibling) {
                1 === e.nodeType && e !== t && n.push(e);
            }
            return n;
        }
    });

    function ft(e, t, n) {
        if (x.isFunction(t)) {
            return x.grep(e, function(e, r) {
                return !!t.call(e, r, e) !== n;
            });
        }
        if (t.nodeType) {
            return x.grep(e, function(e) {
                return e === t !== n;
            });
        }
        if ("string" == typeof t) {
            if (st.test(t)) {
                return x.filter(t, e, n);
            }
            t = x.filter(t, e);
        }
        return x.grep(e, function(e) {
            return x.inArray(e, t) >= 0 !== n;
        });
    }

    function dt(e) {
        var t = ht.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement) {
            while (t.length) {
                n.createElement(t.pop());
            }
        }
        return n;
    }

    var ht = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        gt = / jQuery\d+="(?:null|\d+)"/g,
        mt = RegExp("<(?:" + ht + ")[\\s/>]", "i"),
        yt = /^\s+/,
        vt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        bt = /<([\w:]+)/,
        xt = /<tbody/i,
        wt = /<|&#?\w+;/,
        Tt = /<(?:script|style|link)/i,
        Ct = /^(?:checkbox|radio)$/i,
        Nt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        kt = /^$|\/(?:java|ecma)script/i,
        Et = /^true\/(.*)/,
        St = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        At = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: x.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        jt = dt(a),
        Dt = jt.appendChild(a.createElement("div"));
    At.optgroup = At.option, At.tbody = At.tfoot = At.colgroup = At.caption = At.thead, At.th = At.td, x.fn.extend({
        text: function(e) {
            return x.access(this, function(e) {
                return e === t ? x.text(this) : this.empty().append((this[0] && this[0].ownerDocument || a).createTextNode(e));
            }, null, e, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Lt(this, e);
                    t.appendChild(e);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Lt(this, e);
                    t.insertBefore(e, t.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
            });
        },
        remove: function(e, t) {
            var n, r = e ? x.filter(e, this) : this,
                i = 0;
            for (; null != (n = r[i]); i++) {
                t || 1 !== n.nodeType || x.cleanData(Ft(n)), n.parentNode && (t && x.contains(n.ownerDocument, n) && _t(Ft(n, "script")), n.parentNode.removeChild(n));
            }
            return this;
        },
        empty: function() {
            var e, t = 0;
            for (; null != (e = this[t]); t++) {
                1 === e.nodeType && x.cleanData(Ft(e, !1));
                while (e.firstChild) {
                    e.removeChild(e.firstChild);
                }
                e.options && x.nodeName(e, "select") && (e.options.length = 0);
            }
            return this;
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return x.clone(this, e, t);
            });
        },
        html: function(e) {
            return x.access(this, function(e) {
                var n = this[0] || {},
                    r = 0,
                    i = this.length;
                if (e === t) {
                    return 1 === n.nodeType ? n.innerHTML.replace(gt, "") : t;
                }
                if (!("string" != typeof e || Tt.test(e) || !x.support.htmlSerialize && mt.test(e) || !x.support.leadingWhitespace && yt.test(e) || At[(bt.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(vt, "<$1></$2>");
                    try {
                        for (; i > r; r++) {
                            n = this[r] || {}, 1 === n.nodeType && (x.cleanData(Ft(n, !1)), n.innerHTML = e);
                        }
                        n = 0;
                    } catch (o) {}
                }
                n && this.empty().append(e);
            }, null, e, arguments.length);
        },
        replaceWith: function() {
            var e = x.map(this, function(e) {
                    return [e.nextSibling, e.parentNode];
                }),
                t = 0;
            return this.domManip(arguments, function(n) {
                var r = e[t++],
                    i = e[t++];
                i && (r && r.parentNode !== i && (r = this.nextSibling), x(this).remove(), i.insertBefore(n, r));
            }, !0), t ? this : this.remove();
        },
        detach: function(e) {
            return this.remove(e, !0);
        },
        domManip: function(e, t, n) {
            e = d.apply([], e);
            var r, i, o, a, s, l, u = 0,
                c = this.length,
                p = this,
                f = c - 1,
                h = e[0],
                g = x.isFunction(h);
            if (g || !(1 >= c || "string" != typeof h || x.support.checkClone) && Nt.test(h)) {
                return this.each(function(r) {
                    var i = p.eq(r);
                    g && (e[0] = h.call(this, r, i.html())), i.domManip(e, t, n);
                });
            }
            if (c && (l = x.buildFragment(e, this[0].ownerDocument, !1, !n && this), r = l.firstChild, 1 === l.childNodes.length && (l = r), r)) {
                for (a = x.map(Ft(l, "script"), Ht), o = a.length; c > u; u++) {
                    i = l, u !== f && (i = x.clone(i, !0, !0), o && x.merge(a, Ft(i, "script"))), t.call(this[u], i, u);
                }
                if (o) {
                    for (s = a[a.length - 1].ownerDocument, x.map(a, qt), u = 0; o > u; u++) {
                        i = a[u], kt.test(i.type || "") && !x._data(i, "globalEval") && x.contains(s, i) && (i.src ? x._evalUrl(i.src) : x.globalEval((i.text || i.textContent || i.innerHTML || "").replace(St, "")));
                    }
                }
                l = r = null;
            }
            return this;
        }
    });

    function Lt(e, t) {
        return x.nodeName(e, "table") && x.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
    }

    function Ht(e) {
        return e.type = (null !== x.find.attr(e, "type")) + "/" + e.type, e;
    }

    function qt(e) {
        var t = Et.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e;
    }

    function _t(e, t) {
        var n, r = 0;
        for (; null != (n = e[r]); r++) {
            x._data(n, "globalEval", !t || x._data(t[r], "globalEval"));
        }
    }

    function Mt(e, t) {
        if (1 === t.nodeType && x.hasData(e)) {
            var n, r, i, o = x._data(e),
                a = x._data(t, o),
                s = o.events;
            if (s) {
                delete a.handle, a.events = {};
                for (n in s) {
                    for (r = 0, i = s[n].length; i > r; r++) {
                        x.event.add(t, n, s[n][r]);
                    }
                }
            }
            a.data && (a.data = x.extend({}, a.data));
        }
    }

    function Ot(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !x.support.noCloneEvent && t[x.expando]) {
                i = x._data(t);
                for (r in i.events) {
                    x.removeEvent(t, r, i.handle);
                }
                t.removeAttribute(x.expando);
            }
            "script" === n && t.text !== e.text ? (Ht(t).text = e.text, qt(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), x.support.html5Clone && e.innerHTML && !x.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Ct.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue);
        }
    }

    x.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        x.fn[e] = function(e) {
            var n, r = 0,
                i = [],
                o = x(e),
                a = o.length - 1;
            for (; a >= r; r++) {
                n = r === a ? this : this.clone(!0), x(o[r])[t](n), h.apply(i, n.get());
            }
            return this.pushStack(i);
        };
    });

    function Ft(e, n) {
        var r, o, a = 0,
            s = typeof e.getElementsByTagName !== i ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== i ? e.querySelectorAll(n || "*") : t;
        if (!s) {
            for (s = [], r = e.childNodes || e; null != (o = r[a]); a++) {
                !n || x.nodeName(o, n) ? s.push(o) : x.merge(s, Ft(o, n));
            }
        }
        return n === t || n && x.nodeName(e, n) ? x.merge([e], s) : s;
    }

    function Bt(e) {
        Ct.test(e.type) && (e.defaultChecked = e.checked);
    }

    x.extend({
        clone: function(e, t, n) {
            var r, i, o, a, s, l = x.contains(e.ownerDocument, e);
            if (x.support.html5Clone || x.isXMLDoc(e) || !mt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Dt.innerHTML = e.outerHTML, Dt.removeChild(o = Dt.firstChild)), !(x.support.noCloneEvent && x.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e))) {
                for (r = Ft(o), s = Ft(e), a = 0; null != (i = s[a]); ++a) {
                    r[a] && Ot(i, r[a]);
                }
            }
            if (t) {
                if (n) {
                    for (s = s || Ft(e), r = r || Ft(o), a = 0; null != (i = s[a]); a++) {
                        Mt(i, r[a]);
                    }
                } else {
                    Mt(e, o);
                }
            }
            return r = Ft(o, "script"), r.length > 0 && _t(r, !l && Ft(e, "script")), r = s = i = null, o;
        },
        buildFragment: function(e, t, n, r) {
            var i, o, a, s, l, u, c, p = e.length,
                f = dt(t),
                d = [],
                h = 0;
            for (; p > h; h++) {
                if (o = e[h], o || 0 === o) {
                    if ("object" === x.type(o)) {
                        x.merge(d, o.nodeType ? [o] : o);
                    } else {
                        if (wt.test(o)) {
                            s = s || f.appendChild(t.createElement("div")), l = (bt.exec(o) || ["", ""])[1].toLowerCase(), c = At[l] || At._default, s.innerHTML = c[1] + o.replace(vt, "<$1></$2>") + c[2], i = c[0];
                            while (i--) {
                                s = s.lastChild;
                            }
                            if (!x.support.leadingWhitespace && yt.test(o) && d.push(t.createTextNode(yt.exec(o)[0])), !x.support.tbody) {
                                o = "table" !== l || xt.test(o) ? "<table>" !== c[1] || xt.test(o) ? 0 : s : s.firstChild, i = o && o.childNodes.length;
                                while (i--) {
                                    x.nodeName(u = o.childNodes[i], "tbody") && !u.childNodes.length && o.removeChild(u);
                                }
                            }
                            x.merge(d, s.childNodes), s.textContent = "";
                            while (s.firstChild) {
                                s.removeChild(s.firstChild);
                            }
                            s = f.lastChild;
                        } else {
                            d.push(t.createTextNode(o));
                        }
                    }
                }
            }
            s && f.removeChild(s), x.support.appendChecked || x.grep(Ft(d, "input"), Bt), h = 0;
            while (o = d[h++]) {
                if ((!r || -1 === x.inArray(o, r)) && (a = x.contains(o.ownerDocument, o), s = Ft(f.appendChild(o), "script"), a && _t(s), n)) {
                    i = 0;
                    while (o = s[i++]) {
                        kt.test(o.type || "") && n.push(o);
                    }
                }
            }
            return s = null, f;
        },
        cleanData: function(e, t) {
            var n, r, o, a, s = 0,
                l = x.expando,
                u = x.cache,
                c = x.support.deleteExpando,
                f = x.event.special;
            for (; null != (n = e[s]); s++) {
                if ((t || x.acceptData(n)) && (o = n[l], a = o && u[o])) {
                    if (a.events) {
                        for (r in a.events) {
                            f[r] ? x.event.remove(n, r) : x.removeEvent(n, r, a.handle);
                        }
                    }
                    u[o] && (delete u[o], c ? delete n[l] : typeof n.removeAttribute !== i ? n.removeAttribute(l) : n[l] = null, p.push(o));
                }
            }
        },
        _evalUrl: function(e) {
            return x.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            });
        }
    }), x.fn.extend({
        wrapAll: function(e) {
            if (x.isFunction(e)) {
                return this.each(function(t) {
                    x(this).wrapAll(e.call(this, t));
                });
            }
            if (this[0]) {
                var t = x(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    var e = this;
                    while (e.firstChild && 1 === e.firstChild.nodeType) {
                        e = e.firstChild;
                    }
                    return e;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(e) {
            return x.isFunction(e) ? this.each(function(t) {
                x(this).wrapInner(e.call(this, t));
            }) : this.each(function() {
                var t = x(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e);
            });
        },
        wrap: function(e) {
            var t = x.isFunction(e);
            return this.each(function(n) {
                x(this).wrapAll(t ? e.call(this, n) : e);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                x.nodeName(this, "body") || x(this).replaceWith(this.childNodes);
            }).end();
        }
    });
    var Pt, Rt, Wt, $t = /alpha\([^)]*\)/i,
        It = /opacity\s*=\s*([^)]*)/,
        zt = /^(top|right|bottom|left)$/,
        Xt = /^(none|table(?!-c[ea]).+)/,
        Ut = /^margin/,
        Vt = RegExp("^(" + w + ")(.*)$", "i"),
        Yt = RegExp("^(" + w + ")(?!px)[a-z%]+$", "i"),
        Jt = RegExp("^([+-])=(" + w + ")", "i"),
        Gt = {
            BODY: "block"
        },
        Qt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Kt = {
            letterSpacing: 0,
            fontWeight: 400
        },
        Zt = ["Top", "Right", "Bottom", "Left"],
        en = ["Webkit", "O", "Moz", "ms"];

    function tn(e, t) {
        if (t in e) {
            return t;
        }
        var n = t.charAt(0).toUpperCase() + t.slice(1),
            r = t,
            i = en.length;
        while (i--) {
            if (t = en[i] + n, t in e) {
                return t;
            }
        }
        return r;
    }

    function nn(e, t) {
        return e = t || e, "none" === x.css(e, "display") || !x.contains(e.ownerDocument, e);
    }

    function rn(e, t) {
        var n, r, i, o = [],
            a = 0,
            s = e.length;
        for (; s > a; a++) {
            r = e[a], r.style && (o[a] = x._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && nn(r) && (o[a] = x._data(r, "olddisplay", ln(r.nodeName)))) : o[a] || (i = nn(r), (n && "none" !== n || !i) && x._data(r, "olddisplay", i ? n : x.css(r, "display"))));
        }
        for (a = 0; s > a; a++) {
            r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
        }
        return e;
    }

    x.fn.extend({
        css: function(e, n) {
            return x.access(this, function(e, n, r) {
                var i, o, a = {},
                    s = 0;
                if (x.isArray(n)) {
                    for (o = Rt(e), i = n.length; i > s; s++) {
                        a[n[s]] = x.css(e, n[s], !1, o);
                    }
                    return a;
                }
                return r !== t ? x.style(e, n, r) : x.css(e, n);
            }, e, n, arguments.length > 1);
        },
        show: function() {
            return rn(this, !0);
        },
        hide: function() {
            return rn(this);
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                nn(this) ? x(this).show() : x(this).hide();
            });
        }
    }), x.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Wt(e, "opacity");
                        return "" === n ? "1" : n;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": x.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, n, r, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, a, s, l = x.camelCase(n),
                    u = e.style;
                if (n = x.cssProps[l] || (x.cssProps[l] = tn(u, l)), s = x.cssHooks[n] || x.cssHooks[l], r === t) {
                    return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : u[n];
                }
                if (a = typeof r, "string" === a && (o = Jt.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(x.css(e, n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || x.cssNumber[l] || (r += "px"), x.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (u[n] = "inherit"), s && "set" in s && (r = s.set(e, r, i)) === t))) {
                    try {
                        u[n] = r;
                    } catch (c) {}
                }
            }
        },
        css: function(e, n, r, i) {
            var o, a, s, l = x.camelCase(n);
            return n = x.cssProps[l] || (x.cssProps[l] = tn(e.style, l)), s = x.cssHooks[n] || x.cssHooks[l], s && "get" in s && (a = s.get(e, !0, r)), a === t && (a = Wt(e, n, i)), "normal" === a && n in Kt && (a = Kt[n]), "" === r || r ? (o = parseFloat(a), r === !0 || x.isNumeric(o) ? o || 0 : a) : a;
        }
    }), e.getComputedStyle ? (Rt = function(t) {
        return e.getComputedStyle(t, null);
    }, Wt = function(e, n, r) {
        var i, o, a, s = r || Rt(e),
            l = s ? s.getPropertyValue(n) || s[n] : t,
            u = e.style;
        return s && ("" !== l || x.contains(e.ownerDocument, e) || (l = x.style(e, n)), Yt.test(l) && Ut.test(n) && (i = u.width, o = u.minWidth, a = u.maxWidth, u.minWidth = u.maxWidth = u.width = l, l = s.width, u.width = i, u.minWidth = o, u.maxWidth = a)), l;
    }) : a.documentElement.currentStyle && (Rt = function(e) {
        return e.currentStyle;
    }, Wt = function(e, n, r) {
        var i, o, a, s = r || Rt(e),
            l = s ? s[n] : t,
            u = e.style;
        return null == l && u && u[n] && (l = u[n]), Yt.test(l) && !zt.test(n) && (i = u.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), u.left = "fontSize" === n ? "1em" : l, l = u.pixelLeft + "px", u.left = i, a && (o.left = a)), "" === l ? "auto" : l;
    });

    function on(e, t, n) {
        var r = Vt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
    }

    function an(e, t, n, r, i) {
        var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0,
            a = 0;
        for (; 4 > o; o += 2) {
            "margin" === n && (a += x.css(e, n + Zt[o], !0, i)), r ? ("content" === n && (a -= x.css(e, "padding" + Zt[o], !0, i)), "margin" !== n && (a -= x.css(e, "border" + Zt[o] + "Width", !0, i))) : (a += x.css(e, "padding" + Zt[o], !0, i), "padding" !== n && (a += x.css(e, "border" + Zt[o] + "Width", !0, i)));
        }
        return a;
    }

    function sn(e, t, n) {
        var r = !0,
            i = "width" === t ? e.offsetWidth : e.offsetHeight,
            o = Rt(e),
            a = x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = Wt(e, t, o), (0 > i || null == i) && (i = e.style[t]), Yt.test(i)) {
                return i;
            }
            r = a && (x.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0;
        }
        return i + an(e, t, n || (a ? "border" : "content"), r, o) + "px";
    }

    function ln(e) {
        var t = a,
            n = Gt[e];
        return n || (n = un(e, t), "none" !== n && n || (Pt = (Pt || x("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (Pt[0].contentWindow || Pt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = un(e, t), Pt.detach()), Gt[e] = n), n;
    }

    function un(e, t) {
        var n = x(t.createElement(e)).appendTo(t.body),
            r = x.css(n[0], "display");
        return n.remove(), r;
    }

    x.each(["height", "width"], function(e, n) {
        x.cssHooks[n] = {
            get: function(e, r, i) {
                return r ? 0 === e.offsetWidth && Xt.test(x.css(e, "display")) ? x.swap(e, Qt, function() {
                    return sn(e, n, i);
                }) : sn(e, n, i) : t;
            },
            set: function(e, t, r) {
                var i = r && Rt(e);
                return on(e, t, r ? an(e, n, r, x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, i), i) : 0);
            }
        };
    }), x.support.opacity || (x.cssHooks.opacity = {
        get: function(e, t) {
            return It.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : t ? "1" : "";
        },
        set: function(e, t) {
            var n = e.style,
                r = e.currentStyle,
                i = x.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                o = r && r.filter || n.filter || "";
            n.zoom = 1, (t >= 1 || "" === t) && "" === x.trim(o.replace($t, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = $t.test(o) ? o.replace($t, i) : o + " " + i);
        }
    }), x(function() {
        x.support.reliableMarginRight || (x.cssHooks.marginRight = {
            get: function(e, n) {
                return n ? x.swap(e, {
                    display: "inline-block"
                }, Wt, [e, "marginRight"]) : t;
            }
        }), !x.support.pixelPosition && x.fn.position && x.each(["top", "left"], function(e, n) {
            x.cssHooks[n] = {
                get: function(e, r) {
                    return r ? (r = Wt(e, n), Yt.test(r) ? x(e).position()[n] + "px" : r) : t;
                }
            };
        });
    }), x.expr && x.expr.filters && (x.expr.filters.hidden = function(e) {
        return 0 >= e.offsetWidth && 0 >= e.offsetHeight || !x.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || x.css(e, "display"));
    }, x.expr.filters.visible = function(e) {
        return !x.expr.filters.hidden(e);
    }), x.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        x.cssHooks[e + t] = {
            expand: function(n) {
                var r = 0,
                    i = {},
                    o = "string" == typeof n ? n.split(" ") : [n];
                for (; 4 > r; r++) {
                    i[e + Zt[r] + t] = o[r] || o[r - 2] || o[0];
                }
                return i;
            }
        }, Ut.test(e) || (x.cssHooks[e + t].set = on);
    });
    var cn = /%20/g,
        pn = /\[\]$/,
        fn = /\r?\n/g,
        dn = /^(?:submit|button|image|reset|file)$/i,
        hn = /^(?:input|select|textarea|keygen)/i;
    x.fn.extend({
        serialize: function() {
            return x.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var e = x.prop(this, "elements");
                return e ? x.makeArray(e) : this;
            }).filter(function() {
                var e = this.type;
                return this.name && !x(this).is(":disabled") && hn.test(this.nodeName) && !dn.test(e) && (this.checked || !Ct.test(e));
            }).map(function(e, t) {
                var n = x(this).val();
                return null == n ? null : x.isArray(n) ? x.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(fn, "\r\n")
                    };
                }) : {
                    name: t.name,
                    value: n.replace(fn, "\r\n")
                };
            }).get();
        }
    }), x.param = function(e, n) {
        var r, i = [],
            o = function(e, t) {
                t = x.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
            };
        if (n === t && (n = x.ajaxSettings && x.ajaxSettings.traditional), x.isArray(e) || e.jquery && !x.isPlainObject(e)) {
            x.each(e, function() {
                o(this.name, this.value);
            });
        } else {
            for (r in e) {
                gn(r, e[r], n, o);
            }
        }
        return i.join("&").replace(cn, "+");
    };

    function gn(e, t, n, r) {
        var i;
        if (x.isArray(t)) {
            x.each(t, function(t, i) {
                n || pn.test(e) ? r(e, i) : gn(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r);
            });
        } else {
            if (n || "object" !== x.type(t)) {
                r(e, t);
            } else {
                for (i in t) {
                    gn(e + "[" + i + "]", t[i], n, r);
                }
            }
        }
    }

    x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        x.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
        };
    }), x.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e);
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n);
        },
        unbind: function(e, t) {
            return this.off(e, null, t);
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r);
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
        }
    });
    var mn, yn, vn = x.now(),
        bn = /\?/,
        xn = /#.*$/,
        wn = /([?&])_=[^&]*/,
        Tn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Cn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Nn = /^(?:GET|HEAD)$/,
        kn = /^\/\//,
        En = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        Sn = x.fn.load,
        An = {},
        jn = {},
        Dn = "*/".concat("*");
    try {
        yn = o.href;
    } catch (Ln) {
        yn = a.createElement("a"), yn.href = "", yn = yn.href;
    }
    mn = En.exec(yn.toLowerCase()) || [];

    function Hn(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0,
                o = t.toLowerCase().match(T) || [];
            if (x.isFunction(n)) {
                while (r = o[i++]) {
                    "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
                }
            }
        };
    }

    function qn(e, n, r, i) {
        var o = {},
            a = e === jn;

        function s(l) {
            var u;
            return o[l] = !0, x.each(e[l] || [], function(e, l) {
                var c = l(n, r, i);
                return "string" != typeof c || a || o[c] ? a ? !(u = c) : t : (n.dataTypes.unshift(c), s(c), !1);
            }), u;
        }

        return s(n.dataTypes[0]) || !o["*"] && s("*");
    }

    function _n(e, n) {
        var r, i, o = x.ajaxSettings.flatOptions || {};
        for (i in n) {
            n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]);
        }
        return r && x.extend(!0, e, r), e;
    }

    x.fn.load = function(e, n, r) {
        if ("string" != typeof e && Sn) {
            return Sn.apply(this, arguments);
        }
        var i, o, a, s = this,
            l = e.indexOf(" ");
        return l >= 0 && (i = e.slice(l, e.length), e = e.slice(0, l)), x.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && x.ajax({
            url: e,
            type: a,
            dataType: "html",
            data: n
        }).done(function(e) {
            o = arguments, s.html(i ? x("<div>").append(x.parseHTML(e)).find(i) : e);
        }).complete(r && function(e, t) {
            s.each(r, o || [e.responseText, t, e]);
        }), this;
    }, x.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        x.fn[t] = function(e) {
            return this.on(t, e);
        };
    }), x.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: yn,
            type: "GET",
            isLocal: Cn.test(mn[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Dn,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": x.parseJSON,
                "text xml": x.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? _n(_n(e, x.ajaxSettings), t) : _n(x.ajaxSettings, e);
        },
        ajaxPrefilter: Hn(An),
        ajaxTransport: Hn(jn),
        ajax: function(e, n) {
            "object" == typeof e && (n = e, e = t), n = n || {};
            var r, i, o, a, s, l, u, c, p = x.ajaxSetup({}, n),
                f = p.context || p,
                d = p.context && (f.nodeType || f.jquery) ? x(f) : x.event,
                h = x.Deferred(),
                g = x.Callbacks("once memory"),
                m = p.statusCode || {},
                y = {},
                v = {},
                b = 0,
                w = "canceled",
                C = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === b) {
                            if (!c) {
                                c = {};
                                while (t = Tn.exec(a)) {
                                    c[t[1].toLowerCase()] = t[2];
                                }
                            }
                            t = c[e.toLowerCase()];
                        }
                        return null == t ? null : t;
                    },
                    getAllResponseHeaders: function() {
                        return 2 === b ? a : null;
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return b || (e = v[n] = v[n] || e, y[e] = t), this;
                    },
                    overrideMimeType: function(e) {
                        return b || (p.mimeType = e), this;
                    },
                    statusCode: function(e) {
                        var t;
                        if (e) {
                            if (2 > b) {
                                for (t in e) {
                                    m[t] = [m[t], e[t]];
                                }
                            } else {
                                C.always(e[C.status]);
                            }
                        }
                        return this;
                    },
                    abort: function(e) {
                        var t = e || w;
                        return u && u.abort(t), k(0, t), this;
                    }
                };
            if (h.promise(C).complete = g.add, C.success = C.done, C.error = C.fail, p.url = ((e || p.url || yn) + "").replace(xn, "").replace(kn, mn[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = x.trim(p.dataType || "*").toLowerCase().match(T) || [""], null == p.crossDomain && (r = En.exec(p.url.toLowerCase()), p.crossDomain = !(!r || r[1] === mn[1] && r[2] === mn[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (mn[3] || ("http:" === mn[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = x.param(p.data, p.traditional)), qn(An, p, n, C), 2 === b) {
                return C;
            }
            l = p.global, l && 0 === x.active++ && x.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Nn.test(p.type), o = p.url, p.hasContent || (p.data && (o = p.url += (bn.test(o) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = wn.test(o) ? o.replace(wn, "$1_=" + vn++) : o + (bn.test(o) ? "&" : "?") + "_=" + vn++)), p.ifModified && (x.lastModified[o] && C.setRequestHeader("If-Modified-Since", x.lastModified[o]), x.etag[o] && C.setRequestHeader("If-None-Match", x.etag[o])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && C.setRequestHeader("Content-Type", p.contentType), C.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Dn + "; q=0.01" : "") : p.accepts["*"]);
            for (i in p.headers) {
                C.setRequestHeader(i, p.headers[i]);
            }
            if (p.beforeSend && (p.beforeSend.call(f, C, p) === !1 || 2 === b)) {
                return C.abort();
            }
            w = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) {
                C[i](p[i]);
            }
            if (u = qn(jn, p, n, C)) {
                C.readyState = 1, l && d.trigger("ajaxSend", [C, p]), p.async && p.timeout > 0 && (s = setTimeout(function() {
                    C.abort("timeout");
                }, p.timeout));
                try {
                    b = 1, u.send(y, k);
                } catch (N) {
                    if (!(2 > b)) {
                        throw N;
                    }
                    k(-1, N);
                }
            } else {
                k(-1, "No Transport");
            }

            function k(e, n, r, i) {
                var c, y, v, w, T, N = n;
                2 !== b && (b = 2, s && clearTimeout(s), u = t, a = i || "", C.readyState = e > 0 ? 4 : 0, c = e >= 200 && 300 > e || 304 === e, r && (w = Mn(p, C, r)), w = On(p, w, C, c), c ? (p.ifModified && (T = C.getResponseHeader("Last-Modified"), T && (x.lastModified[o] = T), T = C.getResponseHeader("etag"), T && (x.etag[o] = T)), 204 === e || "HEAD" === p.type ? N = "nocontent" : 304 === e ? N = "notmodified" : (N = w.state, y = w.data, v = w.error, c = !v)) : (v = N, (e || !N) && (N = "error", 0 > e && (e = 0))), C.status = e, C.statusText = (n || N) + "", c ? h.resolveWith(f, [y, N, C]) : h.rejectWith(f, [C, N, v]), C.statusCode(m), m = t, l && d.trigger(c ? "ajaxSuccess" : "ajaxError", [C, p, c ? y : v]), g.fireWith(f, [C, N]), l && (d.trigger("ajaxComplete", [C, p]), --x.active || x.event.trigger("ajaxStop")));
            }

            return C;
        },
        getJSON: function(e, t, n) {
            return x.get(e, t, n, "json");
        },
        getScript: function(e, n) {
            return x.get(e, t, n, "script");
        }
    }), x.each(["get", "post"], function(e, n) {
        x[n] = function(e, r, i, o) {
            return x.isFunction(r) && (o = o || i, i = r, r = t), x.ajax({
                url: e,
                type: n,
                dataType: o,
                data: r,
                success: i
            });
        };
    });

    function Mn(e, n, r) {
        var i, o, a, s, l = e.contents,
            u = e.dataTypes;
        while ("*" === u[0]) {
            u.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
        }
        if (o) {
            for (s in l) {
                if (l[s] && l[s].test(o)) {
                    u.unshift(s);
                    break;
                }
            }
        }
        if (u[0] in r) {
            a = u[0];
        } else {
            for (s in r) {
                if (!u[0] || e.converters[s + " " + u[0]]) {
                    a = s;
                    break;
                }
                i || (i = s);
            }
            a = a || i;
        }
        return a ? (a !== u[0] && u.unshift(a), r[a]) : t;
    }

    function On(e, t, n, r) {
        var i, o, a, s, l, u = {},
            c = e.dataTypes.slice();
        if (c[1]) {
            for (a in e.converters) {
                u[a.toLowerCase()] = e.converters[a];
            }
        }
        o = c.shift();
        while (o) {
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift()) {
                if ("*" === o) {
                    o = l;
                } else {
                    if ("*" !== l && l !== o) {
                        if (a = u[l + " " + o] || u["* " + o], !a) {
                            for (i in u) {
                                if (s = i.split(" "), s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                                    a === !0 ? a = u[i] : u[i] !== !0 && (o = s[0], c.unshift(s[1]));
                                    break;
                                }
                            }
                        }
                        if (a !== !0) {
                            if (a && e["throws"]) {
                                t = a(t);
                            } else {
                                try {
                                    t = a(t);
                                } catch (p) {
                                    return {
                                        state: "parsererror",
                                        error: a ? p : "No conversion from " + l + " to " + o
                                    };
                                }
                            }
                        }
                    }
                }
            }
        }
        return {
            state: "success",
            data: t
        };
    }

    x.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return x.globalEval(e), e;
            }
        }
    }), x.ajaxPrefilter("script", function(e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1);
    }), x.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var n, r = a.head || x("head")[0] || a.documentElement;
            return {
                send: function(t, i) {
                    n = a.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, t) {
                        (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success"));
                    }, r.insertBefore(n, r.firstChild);
                },
                abort: function() {
                    n && n.onload(t, !0);
                }
            };
        }
    });
    var Fn = [],
        Bn = /(=)\?(?=&|$)|\?\?/;
    x.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Fn.pop() || x.expando + "_" + vn++;
            return this[e] = !0, e;
        }
    }), x.ajaxPrefilter("json jsonp", function(n, r, i) {
        var o, a, s, l = n.jsonp !== !1 && (Bn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Bn.test(n.data) && "data");
        return l || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = x.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, l ? n[l] = n[l].replace(Bn, "$1" + o) : n.jsonp !== !1 && (n.url += (bn.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function() {
            return s || x.error(o + " was not called"), s[0];
        }, n.dataTypes[0] = "json", a = e[o], e[o] = function() {
            s = arguments;
        }, i.always(function() {
            e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, Fn.push(o)), s && x.isFunction(a) && a(s[0]), s = a = t;
        }), "script") : t;
    });
    var Pn, Rn, Wn = 0,
        $n = e.ActiveXObject && function() {
                var e;
                for (e in Pn) {
                    Pn[e](t, !0);
                }
            };

    function In() {
        try {
            return new e.XMLHttpRequest;
        } catch (t) {}
    }

    function zn() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP");
        } catch (t) {}
    }

    x.ajaxSettings.xhr = e.ActiveXObject ? function() {
        return !this.isLocal && In() || zn();
    } : In, Rn = x.ajaxSettings.xhr(), x.support.cors = !!Rn && "withCredentials" in Rn, Rn = x.support.ajax = !!Rn, Rn && x.ajaxTransport(function(n) {
        if (!n.crossDomain || x.support.cors) {
            var r;
            return {
                send: function(i, o) {
                    var a, s, l = n.xhr();
                    if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields) {
                        for (s in n.xhrFields) {
                            l[s] = n.xhrFields[s];
                        }
                    }
                    n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (s in i) {
                            l.setRequestHeader(s, i[s]);
                        }
                    } catch (u) {}
                    l.send(n.hasContent && n.data || null), r = function(e, i) {
                        var s, u, c, p;
                        try {
                            if (r && (i || 4 === l.readyState)) {
                                if (r = t, a && (l.onreadystatechange = x.noop, $n && delete Pn[a]), i) {
                                    4 !== l.readyState && l.abort();
                                } else {
                                    p = {}, s = l.status, u = l.getAllResponseHeaders(), "string" == typeof l.responseText && (p.text = l.responseText);
                                    try {
                                        c = l.statusText;
                                    } catch (f) {
                                        c = "";
                                    }
                                    s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = p.text ? 200 : 404;
                                }
                            }
                        } catch (d) {
                            i || o(-1, d);
                        }
                        p && o(s, c, p, u);
                    }, n.async ? 4 === l.readyState ? setTimeout(r) : (a = ++Wn, $n && (Pn || (Pn = {}, x(e).unload($n)), Pn[a] = r), l.onreadystatechange = r) : r();
                },
                abort: function() {
                    r && r(t, !0);
                }
            };
        }
    });
    var Xn, Un, Vn = /^(?:toggle|show|hide)$/,
        Yn = RegExp("^(?:([+-])=|)(" + w + ")([a-z%]*)$", "i"),
        Jn = /queueHooks$/,
        Gn = [nr],
        Qn = {
            "*": [function(e, t) {
                var n = this.createTween(e, t),
                    r = n.cur(),
                    i = Yn.exec(t),
                    o = i && i[3] || (x.cssNumber[e] ? "" : "px"),
                    a = (x.cssNumber[e] || "px" !== o && +r) && Yn.exec(x.css(n.elem, e)),
                    s = 1,
                    l = 20;
                if (a && a[3] !== o) {
                    o = o || a[3], i = i || [], a = +r || 1;
                    do {
                        s = s || ".5", a /= s, x.style(n.elem, e, a + o);
                    } while (s !== (s = n.cur() / r) && 1 !== s && --l);
                }
                return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n;
            }]
        };

    function Kn() {
        return setTimeout(function() {
            Xn = t;
        }), Xn = x.now();
    }

    function Zn(e, t, n) {
        var r, i = (Qn[t] || []).concat(Qn["*"]),
            o = 0,
            a = i.length;
        for (; a > o; o++) {
            if (r = i[o].call(n, t, e)) {
                return r;
            }
        }
    }

    function er(e, t, n) {
        var r, i, o = 0,
            a = Gn.length,
            s = x.Deferred().always(function() {
                delete l.elem;
            }),
            l = function() {
                if (i) {
                    return !1;
                }
                var t = Xn || Kn(),
                    n = Math.max(0, u.startTime + u.duration - t),
                    r = n / u.duration || 0,
                    o = 1 - r,
                    a = 0,
                    l = u.tweens.length;
                for (; l > a; a++) {
                    u.tweens[a].run(o);
                }
                return s.notifyWith(e, [u, o, n]), 1 > o && l ? n : (s.resolveWith(e, [u]), !1);
            },
            u = s.promise({
                elem: e,
                props: x.extend({}, t),
                opts: x.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: Xn || Kn(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = x.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                    return u.tweens.push(r), r;
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? u.tweens.length : 0;
                    if (i) {
                        return this;
                    }
                    for (i = !0; r > n; n++) {
                        u.tweens[n].run(1);
                    }
                    return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]), this;
                }
            }),
            c = u.props;
        for (tr(c, u.opts.specialEasing); a > o; o++) {
            if (r = Gn[o].call(u, e, c, u.opts)) {
                return r;
            }
        }
        return x.map(c, Zn, u), x.isFunction(u.opts.start) && u.opts.start.call(e, u), x.fx.timer(x.extend(l, {
            elem: e,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always);
    }

    function tr(e, t) {
        var n, r, i, o, a;
        for (n in e) {
            if (r = x.camelCase(n), i = t[r], o = e[n], x.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = x.cssHooks[r], a && "expand" in a) {
                o = a.expand(o), delete e[r];
                for (n in o) {
                    n in e || (e[n] = o[n], t[n] = i);
                }
            } else {
                t[r] = i;
            }
        }
    }

    x.Animation = x.extend(er, {
        tweener: function(e, t) {
            x.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            var n, r = 0,
                i = e.length;
            for (; i > r; r++) {
                n = e[r], Qn[n] = Qn[n] || [], Qn[n].unshift(t);
            }
        },
        prefilter: function(e, t) {
            t ? Gn.unshift(e) : Gn.push(e);
        }
    });

    function nr(e, t, n) {
        var r, i, o, a, s, l, u = this,
            c = {},
            p = e.style,
            f = e.nodeType && nn(e),
            d = x._data(e, "fxshow");
        n.queue || (s = x._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function() {
            s.unqueued || l();
        }), s.unqueued++, u.always(function() {
            u.always(function() {
                s.unqueued--, x.queue(e, "fx").length || s.empty.fire();
            });
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === x.css(e, "display") && "none" === x.css(e, "float") && (x.support.inlineBlockNeedsLayout && "inline" !== ln(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", x.support.shrinkWrapBlocks || u.always(function() {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2];
        }));
        for (r in t) {
            if (i = t[r], Vn.exec(i)) {
                if (delete t[r], o = o || "toggle" === i, i === (f ? "hide" : "show")) {
                    continue;
                }
                c[r] = d && d[r] || x.style(e, r);
            }
        }
        if (!x.isEmptyObject(c)) {
            d ? "hidden" in d && (f = d.hidden) : d = x._data(e, "fxshow", {}), o && (d.hidden = !f), f ? x(e).show() : u.done(function() {
                x(e).hide();
            }), u.done(function() {
                var t;
                x._removeData(e, "fxshow");
                for (t in c) {
                    x.style(e, t, c[t]);
                }
            });
            for (r in c) {
                a = Zn(f ? d[r] : 0, r, u), r in d || (d[r] = a.start, f && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0));
            }
        }
    }

    function rr(e, t, n, r, i) {
        return new rr.prototype.init(e, t, n, r, i);
    }

    x.Tween = rr, rr.prototype = {
        constructor: rr,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (x.cssNumber[n] ? "" : "px");
        },
        cur: function() {
            var e = rr.propHooks[this.prop];
            return e && e.get ? e.get(this) : rr.propHooks._default.get(this);
        },
        run: function(e) {
            var t, n = rr.propHooks[this.prop];
            return this.pos = t = this.options.duration ? x.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : rr.propHooks._default.set(this), this;
        }
    }, rr.prototype.init.prototype = rr.prototype, rr.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = x.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop];
            },
            set: function(e) {
                x.fx.step[e.prop] ? x.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[x.cssProps[e.prop]] || x.cssHooks[e.prop]) ? x.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
            }
        }
    }, rr.propHooks.scrollTop = rr.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        }
    }, x.each(["toggle", "show", "hide"], function(e, t) {
        var n = x.fn[t];
        x.fn[t] = function(e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ir(t, !0), e, r, i);
        };
    }), x.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(nn).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r);
        },
        animate: function(e, t, n, r) {
            var i = x.isEmptyObject(e),
                o = x.speed(t, n, r),
                a = function() {
                    var t = er(this, x.extend({}, e), o);
                    (i || x._data(this, "finish")) && t.stop(!0);
                };
            return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a);
        },
        stop: function(e, n, r) {
            var i = function(e) {
                var t = e.stop;
                delete e.stop, t(r);
            };
            return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                var t = !0,
                    n = null != e && e + "queueHooks",
                    o = x.timers,
                    a = x._data(this);
                if (n) {
                    a[n] && a[n].stop && i(a[n]);
                } else {
                    for (n in a) {
                        a[n] && a[n].stop && Jn.test(n) && i(a[n]);
                    }
                }
                for (n = o.length; n--;) {
                    o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1));
                }
                (t || !r) && x.dequeue(this, e);
            });
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"), this.each(function() {
                var t, n = x._data(this),
                    r = n[e + "queue"],
                    i = n[e + "queueHooks"],
                    o = x.timers,
                    a = r ? r.length : 0;
                for (n.finish = !0, x.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) {
                    o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                }
                for (t = 0; a > t; t++) {
                    r[t] && r[t].finish && r[t].finish.call(this);
                }
                delete n.finish;
            });
        }
    });

    function ir(e, t) {
        var n, r = {
                height: e
            },
            i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t) {
            n = Zt[i], r["margin" + n] = r["padding" + n] = e;
        }
        return t && (r.opacity = r.width = e), r;
    }

    x.each({
        slideDown: ir("show"),
        slideUp: ir("hide"),
        slideToggle: ir("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        x.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r);
        };
    }), x.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? x.extend({}, e) : {
            complete: n || !n && t || x.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !x.isFunction(t) && t
        };
        return r.duration = x.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in x.fx.speeds ? x.fx.speeds[r.duration] : x.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
            x.isFunction(r.old) && r.old.call(this), r.queue && x.dequeue(this, r.queue);
        }, r;
    }, x.easing = {
        linear: function(e) {
            return e;
        },
        swing: function(e) {
            return 0.5 - Math.cos(e * Math.PI) / 2;
        }
    }, x.timers = [], x.fx = rr.prototype.init, x.fx.tick = function() {
        var e, n = x.timers,
            r = 0;
        for (Xn = x.now(); n.length > r; r++) {
            e = n[r], e() || n[r] !== e || n.splice(r--, 1);
        }
        n.length || x.fx.stop(), Xn = t;
    }, x.fx.timer = function(e) {
        e() && x.timers.push(e) && x.fx.start();
    }, x.fx.interval = 13, x.fx.start = function() {
        Un || (Un = setInterval(x.fx.tick, x.fx.interval));
    }, x.fx.stop = function() {
        clearInterval(Un), Un = null;
    }, x.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, x.fx.step = {}, x.expr && x.expr.filters && (x.expr.filters.animated = function(e) {
        return x.grep(x.timers, function(t) {
            return e === t.elem;
        }).length;
    }), x.fn.offset = function(e) {
        if (arguments.length) {
            return e === t ? this : this.each(function(t) {
                x.offset.setOffset(this, e, t);
            });
        }
        var n, r, o = {
                top: 0,
                left: 0
            },
            a = this[0],
            s = a && a.ownerDocument;
        if (s) {
            return n = s.documentElement, x.contains(n, a) ? (typeof a.getBoundingClientRect !== i && (o = a.getBoundingClientRect()), r = or(s), {
                top: o.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0),
                left: o.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
            }) : o;
        }
    }, x.offset = {
        setOffset: function(e, t, n) {
            var r = x.css(e, "position");
            "static" === r && (e.style.position = "relative");
            var i = x(e),
                o = i.offset(),
                a = x.css(e, "top"),
                s = x.css(e, "left"),
                l = ("absolute" === r || "fixed" === r) && x.inArray("auto", [a, s]) > -1,
                u = {},
                c = {},
                p, f;
            l ? (c = i.position(), p = c.top, f = c.left) : (p = parseFloat(a) || 0, f = parseFloat(s) || 0), x.isFunction(t) && (t = t.call(e, n, o)), null != t.top && (u.top = t.top - o.top + p), null != t.left && (u.left = t.left - o.left + f), "using" in t ? t.using.call(e, u) : i.css(u);
        }
    }, x.fn.extend({
        position: function() {
            if (this[0]) {
                var e, t, n = {
                        top: 0,
                        left: 0
                    },
                    r = this[0];
                return "fixed" === x.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), x.nodeName(e[0], "html") || (n = e.offset()), n.top += x.css(e[0], "borderTopWidth", !0), n.left += x.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - x.css(r, "marginTop", !0),
                    left: t.left - n.left - x.css(r, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent || s;
                while (e && !x.nodeName(e, "html") && "static" === x.css(e, "position")) {
                    e = e.offsetParent;
                }
                return e || s;
            });
        }
    }), x.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, n) {
        var r = /Y/.test(n);
        x.fn[e] = function(i) {
            return x.access(this, function(e, i, o) {
                var a = or(e);
                return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : (a ? a.scrollTo(r ? x(a).scrollLeft() : o, r ? o : x(a).scrollTop()) : e[i] = o, t);
            }, e, i, arguments.length, null);
        };
    });

    function or(e) {
        return x.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1;
    }

    x.each({
        Height: "height",
        Width: "width"
    }, function(e, n) {
        x.each({
            padding: "inner" + e,
            content: n,
            "": "outer" + e
        }, function(r, i) {
            x.fn[i] = function(i, o) {
                var a = arguments.length && (r || "boolean" != typeof i),
                    s = r || (i === !0 || o === !0 ? "margin" : "border");
                return x.access(this, function(n, r, i) {
                    var o;
                    return x.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? x.css(n, r, s) : x.style(n, r, i, s);
                }, n, a ? i : t, a, null);
            };
        });
    }), x.fn.size = function() {
        return this.length;
    }, x.fn.andSelf = x.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = x : (e.jQuery = e.$ = x, "function" == typeof define && define.amd && define("jquery", [], function() {
        return x;
    }));
})(window);
/* jQuery UI - v1.10.4 - 2014-02-13
 * http://jqueryui.com
 * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.button.js, jquery.ui.slider.js
 * Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
(function($, undefined) {
    var uuid = 0,
        runiqueId = /^ui-id-\d+$/;
    $.ui = $.ui || {};
    $.extend($.ui, {
        version: "1.10.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    $.fn.extend({
        focus: (function(orig) {
            return function(delay, fn) {
                return typeof delay === "number" ? this.each(function() {
                    var elem = this;
                    setTimeout(function() {
                        $(elem).focus();
                        if (fn) {
                            fn.call(elem);
                        }
                    }, delay);
                }) : orig.apply(this, arguments);
            };
        })($.fn.focus),
        scrollParent: function() {
            var scrollParent;
            if (($.ui.ie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                scrollParent = this.parents().filter(function() {
                    return (/(relative|absolute|fixed)/).test($.css(this, "position")) && (/(auto|scroll)/).test($.css(this, "overflow") + $.css(this, "overflow-y") + $.css(this, "overflow-x"));
                }).eq(0);
            } else {
                scrollParent = this.parents().filter(function() {
                    return (/(auto|scroll)/).test($.css(this, "overflow") + $.css(this, "overflow-y") + $.css(this, "overflow-x"));
                }).eq(0);
            }
            return (/fixed/).test(this.css("position")) || !scrollParent.length ? $(document) : scrollParent;
        },
        zIndex: function(zIndex) {
            if (zIndex !== undefined) {
                return this.css("zIndex", zIndex);
            }
            if (this.length) {
                var elem = $(this[0]),
                    position, value;
                while (elem.length && elem[0] !== document) {
                    position = elem.css("position");
                    if (position === "absolute" || position === "relative" || position === "fixed") {
                        value = parseInt(elem.css("zIndex"), 10);
                        if (!isNaN(value) && value !== 0) {
                            return value;
                        }
                    }
                    elem = elem.parent();
                }
            }
            return 0;
        },
        uniqueId: function() {
            return this.each(function() {
                if (!this.id) {
                    this.id = "ui-id-" + (++uuid);
                }
            });
        },
        removeUniqueId: function() {
            return this.each(function() {
                if (runiqueId.test(this.id)) {
                    $(this).removeAttr("id");
                }
            });
        }
    });

    function focusable(element, isTabIndexNotNaN) {
        var map, mapName, img, nodeName = element.nodeName.toLowerCase();
        if ("area" === nodeName) {
            map = element.parentNode;
            mapName = map.name;
            if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
                return false;
            }
            img = $("img[usemap=#" + mapName + "]")[0];
            return !!img && visible(img);
        }
        return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element);
    }

    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function() {
                return $.css(this, "visibility") === "hidden";
            }).length;
    }

    $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
            return function(elem) {
                return !!$.data(elem, dataName);
            };
        }) : function(elem, i, match) {
            return !!$.data(elem, match[3]);
        },
        focusable: function(element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")));
        },
        tabbable: function(element) {
            var tabIndex = $.attr(element, "tabindex"),
                isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
        }
    });
    if (!$("<a>").outerWidth(1).jquery) {
        $.each(["Width", "Height"], function(i, name) {
            var side = name === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                type = name.toLowerCase(),
                orig = {
                    innerWidth: $.fn.innerWidth,
                    innerHeight: $.fn.innerHeight,
                    outerWidth: $.fn.outerWidth,
                    outerHeight: $.fn.outerHeight
                };

            function reduce(elem, size, border, margin) {
                $.each(side, function() {
                    size -= parseFloat($.css(elem, "padding" + this)) || 0;
                    if (border) {
                        size -= parseFloat($.css(elem, "border" + this + "Width")) || 0;
                    }
                    if (margin) {
                        size -= parseFloat($.css(elem, "margin" + this)) || 0;
                    }
                });
                return size;
            }

            $.fn["inner" + name] = function(size) {
                if (size === undefined) {
                    return orig["inner" + name].call(this);
                }
                return this.each(function() {
                    $(this).css(type, reduce(this, size) + "px");
                });
            };
            $.fn["outer" + name] = function(size, margin) {
                if (typeof size !== "number") {
                    return orig["outer" + name].call(this, size);
                }
                return this.each(function() {
                    $(this).css(type, reduce(this, size, true, margin) + "px");
                });
            };
        });
    }
    if (!$.fn.addBack) {
        $.fn.addBack = function(selector) {
            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
        };
    }
    if ($("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
        $.fn.removeData = (function(removeData) {
            return function(key) {
                if (arguments.length) {
                    return removeData.call(this, $.camelCase(key));
                } else {
                    return removeData.call(this);
                }
            };
        })($.fn.removeData);
    }
    $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    $.support.selectstart = "onselectstart" in document.createElement("div");
    $.fn.extend({
        disableSelection: function() {
            return this.bind(($.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(event) {
                event.preventDefault();
            });
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection");
        }
    });
    $.extend($.ui, {
        plugin: {
            add: function(module, option, set) {
                var i, proto = $.ui[module].prototype;
                for (i in set) {
                    proto.plugins[i] = proto.plugins[i] || [];
                    proto.plugins[i].push([option, set[i]]);
                }
            },
            call: function(instance, name, args) {
                var i, set = instance.plugins[name];
                if (!set || !instance.element[0].parentNode || instance.element[0].parentNode.nodeType === 11) {
                    return;
                }
                for (i = 0; i < set.length; i++) {
                    if (instance.options[set[i][0]]) {
                        set[i][1].apply(instance.element, args);
                    }
                }
            }
        },
        hasScroll: function(el, a) {
            if ($(el).css("overflow") === "hidden") {
                return false;
            }
            var scroll = (a && a === "left") ? "scrollLeft" : "scrollTop",
                has = false;
            if (el[scroll] > 0) {
                return true;
            }
            el[scroll] = 1;
            has = (el[scroll] > 0);
            el[scroll] = 0;
            return has;
        }
    });
})(jQuery);
(function($, undefined) {
    var uuid = 0,
        slice = Array.prototype.slice,
        _cleanData = $.cleanData;
    $.cleanData = function(elems) {
        for (var i = 0, elem;
             (elem = elems[i]) != null; i++) {
            try {
                $(elem).triggerHandler("remove");
            } catch (e) {}
        }
        _cleanData(elems);
    };
    $.widget = function(name, base, prototype) {
        var fullName, existingConstructor, constructor, basePrototype, proxiedPrototype = {},
            namespace = name.split(".")[0];
        name = name.split(".")[1];
        fullName = namespace + "-" + name;
        if (!prototype) {
            prototype = base;
            base = $.Widget;
        }
        $.expr[":"][fullName.toLowerCase()] = function(elem) {
            return !!$.data(elem, fullName);
        };
        $[namespace] = $[namespace] || {};
        existingConstructor = $[namespace][name];
        constructor = $[namespace][name] = function(options, element) {
            if (!this._createWidget) {
                return new constructor(options, element);
            }
            if (arguments.length) {
                this._createWidget(options, element);
            }
        };
        $.extend(constructor, existingConstructor, {
            version: prototype.version,
            _proto: $.extend({}, prototype),
            _childConstructors: []
        });
        basePrototype = new base();
        basePrototype.options = $.widget.extend({}, basePrototype.options);
        $.each(prototype, function(prop, value) {
            if (!$.isFunction(value)) {
                proxiedPrototype[prop] = value;
                return;
            }
            proxiedPrototype[prop] = (function() {
                var _super = function() {
                        return base.prototype[prop].apply(this, arguments);
                    },
                    _superApply = function(args) {
                        return base.prototype[prop].apply(this, args);
                    };
                return function() {
                    var __super = this._super,
                        __superApply = this._superApply,
                        returnValue;
                    this._super = _super;
                    this._superApply = _superApply;
                    returnValue = value.apply(this, arguments);
                    this._super = __super;
                    this._superApply = __superApply;
                    return returnValue;
                };
            })();
        });
        constructor.prototype = $.widget.extend(basePrototype, {
            widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
        }, proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widgetName: name,
            widgetFullName: fullName
        });
        if (existingConstructor) {
            $.each(existingConstructor._childConstructors, function(i, child) {
                var childPrototype = child.prototype;
                $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
            });
            delete existingConstructor._childConstructors;
        } else {
            base._childConstructors.push(constructor);
        }
        $.widget.bridge(name, constructor);
    };
    $.widget.extend = function(target) {
        var input = slice.call(arguments, 1),
            inputIndex = 0,
            inputLength = input.length,
            key, value;
        for (; inputIndex < inputLength; inputIndex++) {
            for (key in input[inputIndex]) {
                value = input[inputIndex][key];
                if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
                    if ($.isPlainObject(value)) {
                        target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) : $.widget.extend({}, value);
                    } else {
                        target[key] = value;
                    }
                }
            }
        }
        return target;
    };
    $.widget.bridge = function(name, object) {
        var fullName = object.prototype.widgetFullName || name;
        $.fn[name] = function(options) {
            var isMethodCall = typeof options === "string",
                args = slice.call(arguments, 1),
                returnValue = this;
            options = !isMethodCall && args.length ? $.widget.extend.apply(null, [options].concat(args)) : options;
            if (isMethodCall) {
                this.each(function() {
                    var methodValue, instance = $.data(this, fullName);
                    if (!instance) {
                        return $.error("cannot call methods on " + name + " prior to initialization; " + "attempted to call method '" + options + "'");
                    }
                    if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                        return $.error("no such method '" + options + "' for " + name + " widget instance");
                    }
                    methodValue = instance[options].apply(instance, args);
                    if (methodValue !== instance && methodValue !== undefined) {
                        returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue;
                        return false;
                    }
                });
            } else {
                this.each(function() {
                    var instance = $.data(this, fullName);
                    if (instance) {
                        instance.option(options || {})._init();
                    } else {
                        $.data(this, fullName, new object(options, this));
                    }
                });
            }
            return returnValue;
        };
    };
    $.Widget = function() {};
    $.Widget._childConstructors = [];
    $.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: false,
            create: null
        },
        _createWidget: function(options, element) {
            element = $(element || this.defaultElement || this)[0];
            this.element = $(element);
            this.uuid = uuid++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options);
            this.bindings = $();
            this.hoverable = $();
            this.focusable = $();
            if (element !== this) {
                $.data(element, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function(event) {
                        if (event.target === element) {
                            this.destroy();
                        }
                    }
                });
                this.document = $(element.style ? element.ownerDocument : element.document || element);
                this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
            }
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init();
        },
        _getCreateOptions: $.noop,
        _getCreateEventData: $.noop,
        _create: $.noop,
        _init: $.noop,
        destroy: function() {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus");
        },
        _destroy: $.noop,
        widget: function() {
            return this.element;
        },
        option: function(key, value) {
            var options = key,
                parts, curOption, i;
            if (arguments.length === 0) {
                return $.widget.extend({}, this.options);
            }
            if (typeof key === "string") {
                options = {};
                parts = key.split(".");
                key = parts.shift();
                if (parts.length) {
                    curOption = options[key] = $.widget.extend({}, this.options[key]);
                    for (i = 0; i < parts.length - 1; i++) {
                        curOption[parts[i]] = curOption[parts[i]] || {};
                        curOption = curOption[parts[i]];
                    }
                    key = parts.pop();
                    if (arguments.length === 1) {
                        return curOption[key] === undefined ? null : curOption[key];
                    }
                    curOption[key] = value;
                } else {
                    if (arguments.length === 1) {
                        return this.options[key] === undefined ? null : this.options[key];
                    }
                    options[key] = value;
                }
            }
            this._setOptions(options);
            return this;
        },
        _setOptions: function(options) {
            var key;
            for (key in options) {
                this._setOption(key, options[key]);
            }
            return this;
        },
        _setOption: function(key, value) {
            this.options[key] = value;
            if (key === "disabled") {
                this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!value).attr("aria-disabled", value);
                this.hoverable.removeClass("ui-state-hover");
                this.focusable.removeClass("ui-state-focus");
            }
            return this;
        },
        enable: function() {
            return this._setOption("disabled", false);
        },
        disable: function() {
            return this._setOption("disabled", true);
        },
        _on: function(suppressDisabledCheck, element, handlers) {
            var delegateElement, instance = this;
            if (typeof suppressDisabledCheck !== "boolean") {
                handlers = element;
                element = suppressDisabledCheck;
                suppressDisabledCheck = false;
            }
            if (!handlers) {
                handlers = element;
                element = this.element;
                delegateElement = this.widget();
            } else {
                element = delegateElement = $(element);
                this.bindings = this.bindings.add(element);
            }
            $.each(handlers, function(event, handler) {
                function handlerProxy() {
                    if (!suppressDisabledCheck && (instance.options.disabled === true || $(this).hasClass("ui-state-disabled"))) {
                        return;
                    }
                    return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
                }

                if (typeof handler !== "string") {
                    handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++;
                }
                var match = event.match(/^(\w+)\s*(.*)$/),
                    eventName = match[1] + instance.eventNamespace,
                    selector = match[2];
                if (selector) {
                    delegateElement.delegate(selector, eventName, handlerProxy);
                } else {
                    element.bind(eventName, handlerProxy);
                }
            });
        },
        _off: function(element, eventName) {
            eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            element.unbind(eventName).undelegate(eventName);
        },
        _delay: function(handler, delay) {
            function handlerProxy() {
                return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
            }

            var instance = this;
            return setTimeout(handlerProxy, delay || 0);
        },
        _hoverable: function(element) {
            this.hoverable = this.hoverable.add(element);
            this._on(element, {
                mouseenter: function(event) {
                    $(event.currentTarget).addClass("ui-state-hover");
                },
                mouseleave: function(event) {
                    $(event.currentTarget).removeClass("ui-state-hover");
                }
            });
        },
        _focusable: function(element) {
            this.focusable = this.focusable.add(element);
            this._on(element, {
                focusin: function(event) {
                    $(event.currentTarget).addClass("ui-state-focus");
                },
                focusout: function(event) {
                    $(event.currentTarget).removeClass("ui-state-focus");
                }
            });
        },
        _trigger: function(type, event, data) {
            var prop, orig, callback = this.options[type];
            data = data || {};
            event = $.Event(event);
            event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase();
            event.target = this.element[0];
            orig = event.originalEvent;
            if (orig) {
                for (prop in orig) {
                    if (!(prop in event)) {
                        event[prop] = orig[prop];
                    }
                }
            }
            this.element.trigger(event, data);
            return !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented());
        }
    };
    $.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(method, defaultEffect) {
        $.Widget.prototype["_" + method] = function(element, options, callback) {
            if (typeof options === "string") {
                options = {
                    effect: options
                };
            }
            var hasOptions, effectName = !options ? method : options === true || typeof options === "number" ? defaultEffect : options.effect || defaultEffect;
            options = options || {};
            if (typeof options === "number") {
                options = {
                    duration: options
                };
            }
            hasOptions = !$.isEmptyObject(options);
            options.complete = callback;
            if (options.delay) {
                element.delay(options.delay);
            }
            if (hasOptions && $.effects && $.effects.effect[effectName]) {
                element[method](options);
            } else {
                if (effectName !== method && element[effectName]) {
                    element[effectName](options.duration, options.easing, callback);
                } else {
                    element.queue(function(next) {
                        $(this)[method]();
                        if (callback) {
                            callback.call(element[0]);
                        }
                        next();
                    });
                }
            }
        };
    });
})(jQuery);
(function($, undefined) {
    var mouseHandled = false;
    $(document).mouseup(function() {
        mouseHandled = false;
    });
    $.widget("ui.mouse", {
        version: "1.10.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var that = this;
            this.element.bind("mousedown." + this.widgetName, function(event) {
                return that._mouseDown(event);
            }).bind("click." + this.widgetName, function(event) {
                if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
                    $.removeData(event.target, that.widgetName + ".preventClickEvent");
                    event.stopImmediatePropagation();
                    return false;
                }
            });
            this.started = false;
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName);
            if (this._mouseMoveDelegate) {
                $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            }
        },
        _mouseDown: function(event) {
            if (mouseHandled) {
                return;
            }
            (this._mouseStarted && this._mouseUp(event));
            this._mouseDownEvent = event;
            var that = this,
                btnIsLeft = (event.which === 1),
                elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
            if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
                return true;
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function() {
                    that.mouseDelayMet = true;
                }, this.options.delay);
            }
            if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
                this._mouseStarted = (this._mouseStart(event) !== false);
                if (!this._mouseStarted) {
                    event.preventDefault();
                    return true;
                }
            }
            if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
                $.removeData(event.target, this.widgetName + ".preventClickEvent");
            }
            this._mouseMoveDelegate = function(event) {
                return that._mouseMove(event);
            };
            this._mouseUpDelegate = function(event) {
                return that._mouseUp(event);
            };
            $(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            event.preventDefault();
            mouseHandled = true;
            return true;
        },
        _mouseMove: function(event) {
            if ($.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button) {
                return this._mouseUp(event);
            }
            if (this._mouseStarted) {
                this._mouseDrag(event);
                return event.preventDefault();
            }
            if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, event) !== false);
                (this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
            }
            return !this._mouseStarted;
        },
        _mouseUp: function(event) {
            $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                if (event.target === this._mouseDownEvent.target) {
                    $.data(event.target, this.widgetName + ".preventClickEvent", true);
                }
                this._mouseStop(event);
            }
            return false;
        },
        _mouseDistanceMet: function(event) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance);
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet;
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return true;
        }
    });
})(jQuery);
(function($, undefined) {
    var lastActive, baseClasses = "ui-button ui-widget ui-state-default ui-corner-all",
        typeClasses = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
        formResetHandler = function() {
            var form = $(this);
            setTimeout(function() {
                form.find(":ui-button").button("refresh");
            }, 1);
        },
        radioGroup = function(radio) {
            var name = radio.name,
                form = radio.form,
                radios = $([]);
            if (name) {
                name = name.replace(/'/g, "\\'");
                if (form) {
                    radios = $(form).find("[name='" + name + "']");
                } else {
                    radios = $("[name='" + name + "']", radio.ownerDocument).filter(function() {
                        return !this.form;
                    });
                }
            }
            return radios;
        };
    $.widget("ui.button", {
        version: "1.10.4",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: true,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, formResetHandler);
            if (typeof this.options.disabled !== "boolean") {
                this.options.disabled = !!this.element.prop("disabled");
            } else {
                this.element.prop("disabled", this.options.disabled);
            }
            this._determineButtonType();
            this.hasTitle = !!this.buttonElement.attr("title");
            var that = this,
                options = this.options,
                toggleButton = this.type === "checkbox" || this.type === "radio",
                activeClass = !toggleButton ? "ui-state-active" : "";
            if (options.label === null) {
                options.label = (this.type === "input" ? this.buttonElement.val() : this.buttonElement.html());
            }
            this._hoverable(this.buttonElement);
            this.buttonElement.addClass(baseClasses).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                if (options.disabled) {
                    return;
                }
                if (this === lastActive) {
                    $(this).addClass("ui-state-active");
                }
            }).bind("mouseleave" + this.eventNamespace, function() {
                if (options.disabled) {
                    return;
                }
                $(this).removeClass(activeClass);
            }).bind("click" + this.eventNamespace, function(event) {
                if (options.disabled) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }
            });
            this._on({
                focus: function() {
                    this.buttonElement.addClass("ui-state-focus");
                },
                blur: function() {
                    this.buttonElement.removeClass("ui-state-focus");
                }
            });
            if (toggleButton) {
                this.element.bind("change" + this.eventNamespace, function() {
                    that.refresh();
                });
            }
            if (this.type === "checkbox") {
                this.buttonElement.bind("click" + this.eventNamespace, function() {
                    if (options.disabled) {
                        return false;
                    }
                });
            } else {
                if (this.type === "radio") {
                    this.buttonElement.bind("click" + this.eventNamespace, function() {
                        if (options.disabled) {
                            return false;
                        }
                        $(this).addClass("ui-state-active");
                        that.buttonElement.attr("aria-pressed", "true");
                        var radio = that.element[0];
                        radioGroup(radio).not(radio).map(function() {
                            return $(this).button("widget")[0];
                        }).removeClass("ui-state-active").attr("aria-pressed", "false");
                    });
                } else {
                    this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                        if (options.disabled) {
                            return false;
                        }
                        $(this).addClass("ui-state-active");
                        lastActive = this;
                        that.document.one("mouseup", function() {
                            lastActive = null;
                        });
                    }).bind("mouseup" + this.eventNamespace, function() {
                        if (options.disabled) {
                            return false;
                        }
                        $(this).removeClass("ui-state-active");
                    }).bind("keydown" + this.eventNamespace, function(event) {
                        if (options.disabled) {
                            return false;
                        }
                        if (event.keyCode === $.ui.keyCode.SPACE || event.keyCode === $.ui.keyCode.ENTER) {
                            $(this).addClass("ui-state-active");
                        }
                    }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                        $(this).removeClass("ui-state-active");
                    });
                    if (this.buttonElement.is("a")) {
                        this.buttonElement.keyup(function(event) {
                            if (event.keyCode === $.ui.keyCode.SPACE) {
                                $(this).click();
                            }
                        });
                    }
                }
            }
            this._setOption("disabled", options.disabled);
            this._resetButton();
        },
        _determineButtonType: function() {
            var ancestor, labelSelector, checked;
            if (this.element.is("[type=checkbox]")) {
                this.type = "checkbox";
            } else {
                if (this.element.is("[type=radio]")) {
                    this.type = "radio";
                } else {
                    if (this.element.is("input")) {
                        this.type = "input";
                    } else {
                        this.type = "button";
                    }
                }
            }
            if (this.type === "checkbox" || this.type === "radio") {
                ancestor = this.element.parents().last();
                labelSelector = "label[for='" + this.element.attr("id") + "']";
                this.buttonElement = ancestor.find(labelSelector);
                if (!this.buttonElement.length) {
                    ancestor = ancestor.length ? ancestor.siblings() : this.element.siblings();
                    this.buttonElement = ancestor.filter(labelSelector);
                    if (!this.buttonElement.length) {
                        this.buttonElement = ancestor.find(labelSelector);
                    }
                }
                this.element.addClass("ui-helper-hidden-accessible");
                checked = this.element.is(":checked");
                if (checked) {
                    this.buttonElement.addClass("ui-state-active");
                }
                this.buttonElement.prop("aria-pressed", checked);
            } else {
                this.buttonElement = this.element;
            }
        },
        widget: function() {
            return this.buttonElement;
        },
        _destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass(baseClasses + " ui-state-active " + typeClasses).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            if (!this.hasTitle) {
                this.buttonElement.removeAttr("title");
            }
        },
        _setOption: function(key, value) {
            this._super(key, value);
            if (key === "disabled") {
                this.element.prop("disabled", !!value);
                if (value) {
                    this.buttonElement.removeClass("ui-state-focus");
                }
                return;
            }
            this._resetButton();
        },
        refresh: function() {
            var isDisabled = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            if (isDisabled !== this.options.disabled) {
                this._setOption("disabled", isDisabled);
            }
            if (this.type === "radio") {
                radioGroup(this.element[0]).each(function() {
                    if ($(this).is(":checked")) {
                        $(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true");
                    } else {
                        $(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false");
                    }
                });
            } else {
                if (this.type === "checkbox") {
                    if (this.element.is(":checked")) {
                        this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true");
                    } else {
                        this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false");
                    }
                }
            }
        },
        _resetButton: function() {
            if (this.type === "input") {
                if (this.options.label) {
                    this.element.val(this.options.label);
                }
                return;
            }
            var buttonElement = this.buttonElement.removeClass(typeClasses),
                buttonText = $("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(buttonElement.empty()).text(),
                icons = this.options.icons,
                multipleIcons = icons.primary && icons.secondary,
                buttonClasses = [];
            if (icons.primary || icons.secondary) {
                if (this.options.text) {
                    buttonClasses.push("ui-button-text-icon" + (multipleIcons ? "s" : (icons.primary ? "-primary" : "-secondary")));
                }
                if (icons.primary) {
                    buttonElement.prepend("<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>");
                }
                if (icons.secondary) {
                    buttonElement.append("<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>");
                }
                if (!this.options.text) {
                    buttonClasses.push(multipleIcons ? "ui-button-icons-only" : "ui-button-icon-only");
                    if (!this.hasTitle) {
                        buttonElement.attr("title", $.trim(buttonText));
                    }
                }
            } else {
                buttonClasses.push("ui-button-text-only");
            }
            buttonElement.addClass(buttonClasses.join(" "));
        }
    });
    $.widget("ui.buttonset", {
        version: "1.10.4",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset");
        },
        _init: function() {
            this.refresh();
        },
        _setOption: function(key, value) {
            if (key === "disabled") {
                this.buttons.button("option", key, value);
            }
            this._super(key, value);
        },
        refresh: function() {
            var rtl = this.element.css("direction") === "rtl";
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                return $(this).button("widget")[0];
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(rtl ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(rtl ? "ui-corner-left" : "ui-corner-right").end().end();
        },
        _destroy: function() {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function() {
                return $(this).button("widget")[0];
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
        }
    });
}(jQuery));
(function($, undefined) {
    var numPages = 5;
    $.widget("ui.slider", $.ui.mouse, {
        version: "1.10.4",
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._keySliding = false;
            this._mouseSliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider" + " ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all");
            this._refresh();
            this._setOption("disabled", this.options.disabled);
            this._animateOff = false;
        },
        _refresh: function() {
            this._createRange();
            this._createHandles();
            this._setupEvents();
            this._refreshValue();
        },
        _createHandles: function() {
            var i, handleCount, options = this.options,
                existingHandles = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                handle = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                handles = [];
            handleCount = (options.values && options.values.length) || 1;
            if (existingHandles.length > handleCount) {
                existingHandles.slice(handleCount).remove();
                existingHandles = existingHandles.slice(0, handleCount);
            }
            for (i = existingHandles.length; i < handleCount; i++) {
                handles.push(handle);
            }
            this.handles = existingHandles.add($(handles.join("")).appendTo(this.element));
            this.handle = this.handles.eq(0);
            this.handles.each(function(i) {
                $(this).data("ui-slider-handle-index", i);
            });
        },
        _createRange: function() {
            var options = this.options,
                classes = "";
            if (options.range) {
                if (options.range === true) {
                    if (!options.values) {
                        options.values = [this._valueMin(), this._valueMin()];
                    } else {
                        if (options.values.length && options.values.length !== 2) {
                            options.values = [options.values[0], options.values[0]];
                        } else {
                            if ($.isArray(options.values)) {
                                options.values = options.values.slice(0);
                            }
                        }
                    }
                }
                if (!this.range || !this.range.length) {
                    this.range = $("<div></div>").appendTo(this.element);
                    classes = "ui-slider-range" + " ui-widget-header ui-corner-all";
                } else {
                    this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                        "left": "",
                        "bottom": ""
                    });
                }
                this.range.addClass(classes + ((options.range === "min" || options.range === "max") ? " ui-slider-range-" + options.range : ""));
            } else {
                if (this.range) {
                    this.range.remove();
                }
                this.range = null;
            }
        },
        _setupEvents: function() {
            var elements = this.handles.add(this.range).filter("a");
            this._off(elements);
            this._on(elements, this._handleEvents);
            this._hoverable(elements);
            this._focusable(elements);
        },
        _destroy: function() {
            this.handles.remove();
            if (this.range) {
                this.range.remove();
            }
            this.element.removeClass("ui-slider" + " ui-slider-horizontal" + " ui-slider-vertical" + " ui-widget" + " ui-widget-content" + " ui-corner-all");
            this._mouseDestroy();
        },
        _mouseCapture: function(event) {
            var position, normValue, distance, closestHandle, index, allowed, offset, mouseOverHandle, that = this,
                o = this.options;
            if (o.disabled) {
                return false;
            }
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            position = {
                x: event.pageX,
                y: event.pageY
            };
            normValue = this._normValueFromMouse(position);
            distance = this._valueMax() - this._valueMin() + 1;
            this.handles.each(function(i) {
                var thisDistance = Math.abs(normValue - that.values(i));
                if ((distance > thisDistance) || (distance === thisDistance && (i === that._lastChangedValue || that.values(i) === o.min))) {
                    distance = thisDistance;
                    closestHandle = $(this);
                    index = i;
                }
            });
            allowed = this._start(event, index);
            if (allowed === false) {
                return false;
            }
            this._mouseSliding = true;
            this._handleIndex = index;
            closestHandle.addClass("ui-state-active").focus();
            offset = closestHandle.offset();
            mouseOverHandle = !$(event.target).parents().addBack().is(".ui-slider-handle");
            this._clickOffset = mouseOverHandle ? {
                left: 0,
                top: 0
            } : {
                left: event.pageX - offset.left - (closestHandle.width() / 2),
                top: event.pageY - offset.top - (closestHandle.height() / 2) - (parseInt(closestHandle.css("borderTopWidth"), 10) || 0) - (parseInt(closestHandle.css("borderBottomWidth"), 10) || 0) + (parseInt(closestHandle.css("marginTop"), 10) || 0)
            };
            if (!this.handles.hasClass("ui-state-hover")) {
                this._slide(event, index, normValue);
            }
            this._animateOff = true;
            return true;
        },
        _mouseStart: function() {
            return true;
        },
        _mouseDrag: function(event) {
            var position = {
                    x: event.pageX,
                    y: event.pageY
                },
                normValue = this._normValueFromMouse(position);
            this._slide(event, this._handleIndex, normValue);
            return false;
        },
        _mouseStop: function(event) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(event, this._handleIndex);
            this._change(event, this._handleIndex);
            this._handleIndex = null;
            this._clickOffset = null;
            this._animateOff = false;
            return false;
        },
        _detectOrientation: function() {
            this.orientation = (this.options.orientation === "vertical") ? "vertical" : "horizontal";
        },
        _normValueFromMouse: function(position) {
            var pixelTotal, pixelMouse, percentMouse, valueTotal, valueMouse;
            if (this.orientation === "horizontal") {
                pixelTotal = this.elementSize.width;
                pixelMouse = position.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0);
            } else {
                pixelTotal = this.elementSize.height;
                pixelMouse = position.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0);
            }
            percentMouse = (pixelMouse / pixelTotal);
            if (percentMouse > 1) {
                percentMouse = 1;
            }
            if (percentMouse < 0) {
                percentMouse = 0;
            }
            if (this.orientation === "vertical") {
                percentMouse = 1 - percentMouse;
            }
            valueTotal = this._valueMax() - this._valueMin();
            valueMouse = this._valueMin() + percentMouse * valueTotal;
            return this._trimAlignValue(valueMouse);
        },
        _start: function(event, index) {
            var uiHash = {
                handle: this.handles[index],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                uiHash.value = this.values(index);
                uiHash.values = this.values();
            }
            return this._trigger("start", event, uiHash);
        },
        _slide: function(event, index, newVal) {
            var otherVal, newValues, allowed;
            if (this.options.values && this.options.values.length) {
                otherVal = this.values(index ? 0 : 1);
                if ((this.options.values.length === 2 && this.options.range === true) && ((index === 0 && newVal > otherVal) || (index === 1 && newVal < otherVal))) {
                    newVal = otherVal;
                }
                if (newVal !== this.values(index)) {
                    newValues = this.values();
                    newValues[index] = newVal;
                    allowed = this._trigger("slide", event, {
                        handle: this.handles[index],
                        value: newVal,
                        values: newValues
                    });
                    otherVal = this.values(index ? 0 : 1);
                    if (allowed !== false) {
                        this.values(index, newVal);
                    }
                }
            } else {
                if (newVal !== this.value()) {
                    allowed = this._trigger("slide", event, {
                        handle: this.handles[index],
                        value: newVal
                    });
                    if (allowed !== false) {
                        this.value(newVal);
                    }
                }
            }
        },
        _stop: function(event, index) {
            var uiHash = {
                handle: this.handles[index],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                uiHash.value = this.values(index);
                uiHash.values = this.values();
            }
            this._trigger("stop", event, uiHash);
        },
        _change: function(event, index) {
            if (!this._keySliding && !this._mouseSliding) {
                var uiHash = {
                    handle: this.handles[index],
                    value: this.value()
                };
                if (this.options.values && this.options.values.length) {
                    uiHash.value = this.values(index);
                    uiHash.values = this.values();
                }
                this._lastChangedValue = index;
                this._trigger("change", event, uiHash);
            }
        },
        value: function(newValue) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(newValue);
                this._refreshValue();
                this._change(null, 0);
                return;
            }
            return this._value();
        },
        values: function(index, newValue) {
            var vals, newValues, i;
            if (arguments.length > 1) {
                this.options.values[index] = this._trimAlignValue(newValue);
                this._refreshValue();
                this._change(null, index);
                return;
            }
            if (arguments.length) {
                if ($.isArray(arguments[0])) {
                    vals = this.options.values;
                    newValues = arguments[0];
                    for (i = 0; i < vals.length; i += 1) {
                        vals[i] = this._trimAlignValue(newValues[i]);
                        this._change(null, i);
                    }
                    this._refreshValue();
                } else {
                    if (this.options.values && this.options.values.length) {
                        return this._values(index);
                    } else {
                        return this.value();
                    }
                }
            } else {
                return this._values();
            }
        },
        _setOption: function(key, value) {
            var i, valsLength = 0;
            if (key === "range" && this.options.range === true) {
                if (value === "min") {
                    this.options.value = this._values(0);
                    this.options.values = null;
                } else {
                    if (value === "max") {
                        this.options.value = this._values(this.options.values.length - 1);
                        this.options.values = null;
                    }
                }
            }
            if ($.isArray(this.options.values)) {
                valsLength = this.options.values.length;
            }
            $.Widget.prototype._setOption.apply(this, arguments);
            switch (key) {
                case "orientation":
                    this._detectOrientation();
                    this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                    this._refreshValue();
                    break;
                case "value":
                    this._animateOff = true;
                    this._refreshValue();
                    this._change(null, 0);
                    this._animateOff = false;
                    break;
                case "values":
                    this._animateOff = true;
                    this._refreshValue();
                    for (i = 0; i < valsLength; i += 1) {
                        this._change(null, i);
                    }
                    this._animateOff = false;
                    break;
                case "min":
                case "max":
                    this._animateOff = true;
                    this._refreshValue();
                    this._animateOff = false;
                    break;
                case "range":
                    this._animateOff = true;
                    this._refresh();
                    this._animateOff = false;
                    break;
            }
        },
        _value: function() {
            var val = this.options.value;
            val = this._trimAlignValue(val);
            return val;
        },
        _values: function(index) {
            var val, vals, i;
            if (arguments.length) {
                val = this.options.values[index];
                val = this._trimAlignValue(val);
                return val;
            } else {
                if (this.options.values && this.options.values.length) {
                    vals = this.options.values.slice();
                    for (i = 0; i < vals.length; i += 1) {
                        vals[i] = this._trimAlignValue(vals[i]);
                    }
                    return vals;
                } else {
                    return [];
                }
            }
        },
        _trimAlignValue: function(val) {
            if (val <= this._valueMin()) {
                return this._valueMin();
            }
            if (val >= this._valueMax()) {
                return this._valueMax();
            }
            var step = (this.options.step > 0) ? this.options.step : 1,
                valModStep = (val - this._valueMin()) % step,
                alignValue = val - valModStep;
            if (Math.abs(valModStep) * 2 >= step) {
                alignValue += (valModStep > 0) ? step : (-step);
            }
            return parseFloat(alignValue.toFixed(5));
        },
        _valueMin: function() {
            return this.options.min;
        },
        _valueMax: function() {
            return this.options.max;
        },
        _refreshValue: function() {
            var lastValPercent, valPercent, value, valueMin, valueMax, oRange = this.options.range,
                o = this.options,
                that = this,
                animate = (!this._animateOff) ? o.animate : false,
                _set = {};
            if (this.options.values && this.options.values.length) {
                this.handles.each(function(i) {
                    valPercent = (that.values(i) - that._valueMin()) / (that._valueMax() - that._valueMin()) * 100;
                    _set[that.orientation === "horizontal" ? "left" : "bottom"] = valPercent + "%";
                    $(this).stop(1, 1)[animate ? "animate" : "css"](_set, o.animate);
                    if (that.options.range === true) {
                        if (that.orientation === "horizontal") {
                            if (i === 0) {
                                that.range.stop(1, 1)[animate ? "animate" : "css"]({
                                    left: valPercent + "%"
                                }, o.animate);
                            }
                            if (i === 1) {
                                that.range[animate ? "animate" : "css"]({
                                    width: (valPercent - lastValPercent) + "%"
                                }, {
                                    queue: false,
                                    duration: o.animate
                                });
                            }
                        } else {
                            if (i === 0) {
                                that.range.stop(1, 1)[animate ? "animate" : "css"]({
                                    bottom: (valPercent) + "%"
                                }, o.animate);
                            }
                            if (i === 1) {
                                that.range[animate ? "animate" : "css"]({
                                    height: (valPercent - lastValPercent) + "%"
                                }, {
                                    queue: false,
                                    duration: o.animate
                                });
                            }
                        }
                    }
                    lastValPercent = valPercent;
                });
            } else {
                value = this.value();
                valueMin = this._valueMin();
                valueMax = this._valueMax();
                valPercent = (valueMax !== valueMin) ? (value - valueMin) / (valueMax - valueMin) * 100 : 0;
                _set[this.orientation === "horizontal" ? "left" : "bottom"] = valPercent + "%";
                this.handle.stop(1, 1)[animate ? "animate" : "css"](_set, o.animate);
                if (oRange === "min" && this.orientation === "horizontal") {
                    this.range.stop(1, 1)[animate ? "animate" : "css"]({
                        width: valPercent + "%"
                    }, o.animate);
                }
                if (oRange === "max" && this.orientation === "horizontal") {
                    this.range[animate ? "animate" : "css"]({
                        width: (100 - valPercent) + "%"
                    }, {
                        queue: false,
                        duration: o.animate
                    });
                }
                if (oRange === "min" && this.orientation === "vertical") {
                    this.range.stop(1, 1)[animate ? "animate" : "css"]({
                        height: valPercent + "%"
                    }, o.animate);
                }
                if (oRange === "max" && this.orientation === "vertical") {
                    this.range[animate ? "animate" : "css"]({
                        height: (100 - valPercent) + "%"
                    }, {
                        queue: false,
                        duration: o.animate
                    });
                }
            }
        },
        _handleEvents: {
            keydown: function(event) {
                var allowed, curVal, newVal, step, index = $(event.target).data("ui-slider-handle-index");
                switch (event.keyCode) {
                    case $.ui.keyCode.HOME:
                    case $.ui.keyCode.END:
                    case $.ui.keyCode.PAGE_UP:
                    case $.ui.keyCode.PAGE_DOWN:
                    case $.ui.keyCode.UP:
                    case $.ui.keyCode.RIGHT:
                    case $.ui.keyCode.DOWN:
                    case $.ui.keyCode.LEFT:
                        event.preventDefault();
                        if (!this._keySliding) {
                            this._keySliding = true;
                            $(event.target).addClass("ui-state-active");
                            allowed = this._start(event, index);
                            if (allowed === false) {
                                return;
                            }
                        }
                        break;
                }
                step = this.options.step;
                if (this.options.values && this.options.values.length) {
                    curVal = newVal = this.values(index);
                } else {
                    curVal = newVal = this.value();
                }
                switch (event.keyCode) {
                    case $.ui.keyCode.HOME:
                        newVal = this._valueMin();
                        break;
                    case $.ui.keyCode.END:
                        newVal = this._valueMax();
                        break;
                    case $.ui.keyCode.PAGE_UP:
                        newVal = this._trimAlignValue(curVal + ((this._valueMax() - this._valueMin()) / numPages));
                        break;
                    case $.ui.keyCode.PAGE_DOWN:
                        newVal = this._trimAlignValue(curVal - ((this._valueMax() - this._valueMin()) / numPages));
                        break;
                    case $.ui.keyCode.UP:
                    case $.ui.keyCode.RIGHT:
                        if (curVal === this._valueMax()) {
                            return;
                        }
                        newVal = this._trimAlignValue(curVal + step);
                        break;
                    case $.ui.keyCode.DOWN:
                    case $.ui.keyCode.LEFT:
                        if (curVal === this._valueMin()) {
                            return;
                        }
                        newVal = this._trimAlignValue(curVal - step);
                        break;
                }
                this._slide(event, index, newVal);
            },
            click: function(event) {
                event.preventDefault();
            },
            keyup: function(event) {
                var index = $(event.target).data("ui-slider-handle-index");
                if (this._keySliding) {
                    this._keySliding = false;
                    this._stop(event, index);
                    this._change(event, index);
                    $(event.target).removeClass("ui-state-active");
                }
            }
        }
    });
}(jQuery));
(function($, undefined) {
    $.ui = $.ui || {};
    var horizontalPositions = /left|center|right/,
        verticalPositions = /top|center|bottom/,
        center = "center",
        _position = $.fn.position,
        _offset = $.fn.offset;
    $.fn.position = function(options) {
        if (!options || !options.of) {
            return _position.apply(this, arguments);
        }
        options = $.extend({}, options);
        var target = $(options.of),
            targetElem = target[0],
            collision = (options.collision || "flip").split(" "),
            offset = options.offset ? options.offset.split(" ") : [0, 0],
            targetWidth, targetHeight, basePosition;
        if (targetElem.nodeType === 9) {
            targetWidth = target.width();
            targetHeight = target.height();
            basePosition = {
                top: 0,
                left: 0
            };
        } else {
            if (targetElem.setTimeout) {
                targetWidth = target.width();
                targetHeight = target.height();
                basePosition = {
                    top: target.scrollTop(),
                    left: target.scrollLeft()
                };
            } else {
                if (targetElem.preventDefault) {
                    options.at = "left top";
                    targetWidth = targetHeight = 0;
                    basePosition = {
                        top: options.of.pageY,
                        left: options.of.pageX
                    };
                } else {
                    targetWidth = target.outerWidth();
                    targetHeight = target.outerHeight();
                    basePosition = target.offset();
                }
            }
        }
        $.each(["my", "at"], function() {
            var pos = (options[this] || "").split(" ");
            if (pos.length === 1) {
                pos = horizontalPositions.test(pos[0]) ? pos.concat([center]) : verticalPositions.test(pos[0]) ? [center].concat(pos) : [center, center];
            }
            pos[0] = horizontalPositions.test(pos[0]) ? pos[0] : center;
            pos[1] = verticalPositions.test(pos[1]) ? pos[1] : center;
            options[this] = pos;
        });
        if (collision.length === 1) {
            collision[1] = collision[0];
        }
        offset[0] = parseInt(offset[0], 10) || 0;
        if (offset.length === 1) {
            offset[1] = offset[0];
        }
        offset[1] = parseInt(offset[1], 10) || 0;
        if (options.at[0] === "right") {
            basePosition.left += targetWidth;
        } else {
            if (options.at[0] === center) {
                basePosition.left += targetWidth / 2;
            }
        }
        if (options.at[1] === "bottom") {
            basePosition.top += targetHeight;
        } else {
            if (options.at[1] === center) {
                basePosition.top += targetHeight / 2;
            }
        }
        basePosition.left += offset[0];
        basePosition.top += offset[1];
        return this.each(function() {
            var elem = $(this),
                elemWidth = elem.outerWidth(),
                elemHeight = elem.outerHeight(),
                marginLeft = parseInt($.curCSS(this, "marginLeft", true)) || 0,
                marginTop = parseInt($.curCSS(this, "marginTop", true)) || 0,
                collisionWidth = elemWidth + marginLeft + parseInt($.curCSS(this, "marginRight", true)) || 0,
                collisionHeight = elemHeight + marginTop + parseInt($.curCSS(this, "marginBottom", true)) || 0,
                position = $.extend({}, basePosition),
                collisionPosition;
            if (options.my[0] === "right") {
                position.left -= elemWidth;
            } else {
                if (options.my[0] === center) {
                    position.left -= elemWidth / 2;
                }
            }
            if (options.my[1] === "bottom") {
                position.top -= elemHeight;
            } else {
                if (options.my[1] === center) {
                    position.top -= elemHeight / 2;
                }
            }
            position.left = parseInt(position.left);
            position.top = parseInt(position.top);
            collisionPosition = {
                left: position.left - marginLeft,
                top: position.top - marginTop
            };
            $.each(["left", "top"], function(i, dir) {
                if ($.ui.position[collision[i]]) {
                    $.ui.position[collision[i]][dir](position, {
                        targetWidth: targetWidth,
                        targetHeight: targetHeight,
                        elemWidth: elemWidth,
                        elemHeight: elemHeight,
                        collisionPosition: collisionPosition,
                        collisionWidth: collisionWidth,
                        collisionHeight: collisionHeight,
                        offset: offset,
                        my: options.my,
                        at: options.at
                    });
                }
            });
            if ($.fn.bgiframe) {
                elem.bgiframe();
            }
            elem.offset($.extend(position, {
                using: options.using
            }));
        });
    };
    $.ui.position = {
        fit: {
            left: function(position, data) {
                var win = $(window),
                    over = data.collisionPosition.left + data.collisionWidth - win.width() - win.scrollLeft();
                position.left = over > 0 ? position.left - over : Math.max(position.left - data.collisionPosition.left, position.left);
            },
            top: function(position, data) {
                var win = $(window),
                    over = data.collisionPosition.top + data.collisionHeight - win.height() - win.scrollTop();
                position.top = over > 0 ? position.top - over : Math.max(position.top - data.collisionPosition.top, position.top);
            }
        },
        flip: {
            left: function(position, data) {
                if (data.at[0] === center) {
                    return;
                }
                var win = $(window),
                    over = data.collisionPosition.left + data.collisionWidth - win.width() - win.scrollLeft(),
                    myOffset = data.my[0] === "left" ? -data.elemWidth : data.my[0] === "right" ? data.elemWidth : 0,
                    atOffset = data.at[0] === "left" ? data.targetWidth : -data.targetWidth,
                    offset = -2 * data.offset[0];
                position.left += data.collisionPosition.left < 0 ? myOffset + atOffset + offset : over > 0 ? myOffset + atOffset + offset : 0;
            },
            top: function(position, data) {
                if (data.at[1] === center) {
                    return;
                }
                var win = $(window),
                    over = data.collisionPosition.top + data.collisionHeight - win.height() - win.scrollTop(),
                    myOffset = data.my[1] === "top" ? -data.elemHeight : data.my[1] === "bottom" ? data.elemHeight : 0,
                    atOffset = data.at[1] === "top" ? data.targetHeight : -data.targetHeight,
                    offset = -2 * data.offset[1];
                position.top += data.collisionPosition.top < 0 ? myOffset + atOffset + offset : over > 0 ? myOffset + atOffset + offset : 0;
            }
        }
    };
    if (!$.offset.setOffset) {
        $.offset.setOffset = function(elem, options) {
            if (/static/.test($.curCSS(elem, "position"))) {
                elem.style.position = "relative";
            }
            var curElem = $(elem),
                curOffset = curElem.offset(),
                curTop = parseInt($.curCSS(elem, "top", true), 10) || 0,
                curLeft = parseInt($.curCSS(elem, "left", true), 10) || 0,
                props = {
                    top: (options.top - curOffset.top) + curTop,
                    left: (options.left - curOffset.left) + curLeft
                };
            if ("using" in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        };
        $.fn.offset = function(options) {
            var elem = this[0];
            if (!elem || !elem.ownerDocument) {
                return null;
            }
            if (options) {
                return this.each(function() {
                    $.offset.setOffset(this, options);
                });
            }
            return _offset.call(this);
        };
    }
}(jQuery));
/* jQuery UI - v1.10.4 - 2014-03-03
 * http://jqueryui.com
 * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.draggable.js
 * Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
(function($, undefined) {
    var uuid = 0,
        runiqueId = /^ui-id-\d+$/;
    $.ui = $.ui || {};
    $.extend($.ui, {
        version: "1.10.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    $.fn.extend({
        focus: (function(orig) {
            return function(delay, fn) {
                return typeof delay === "number" ? this.each(function() {
                    var elem = this;
                    setTimeout(function() {
                        $(elem).focus();
                        if (fn) {
                            fn.call(elem);
                        }
                    }, delay);
                }) : orig.apply(this, arguments);
            };
        })($.fn.focus),
        scrollParent: function() {
            var scrollParent;
            if (($.ui.ie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                scrollParent = this.parents().filter(function() {
                    return (/(relative|absolute|fixed)/).test($.css(this, "position")) && (/(auto|scroll)/).test($.css(this, "overflow") + $.css(this, "overflow-y") + $.css(this, "overflow-x"));
                }).eq(0);
            } else {
                scrollParent = this.parents().filter(function() {
                    return (/(auto|scroll)/).test($.css(this, "overflow") + $.css(this, "overflow-y") + $.css(this, "overflow-x"));
                }).eq(0);
            }
            return (/fixed/).test(this.css("position")) || !scrollParent.length ? $(document) : scrollParent;
        },
        zIndex: function(zIndex) {
            if (zIndex !== undefined) {
                return this.css("zIndex", zIndex);
            }
            if (this.length) {
                var elem = $(this[0]),
                    position, value;
                while (elem.length && elem[0] !== document) {
                    position = elem.css("position");
                    if (position === "absolute" || position === "relative" || position === "fixed") {
                        value = parseInt(elem.css("zIndex"), 10);
                        if (!isNaN(value) && value !== 0) {
                            return value;
                        }
                    }
                    elem = elem.parent();
                }
            }
            return 0;
        },
        uniqueId: function() {
            return this.each(function() {
                if (!this.id) {
                    this.id = "ui-id-" + (++uuid);
                }
            });
        },
        removeUniqueId: function() {
            return this.each(function() {
                if (runiqueId.test(this.id)) {
                    $(this).removeAttr("id");
                }
            });
        }
    });

    function focusable(element, isTabIndexNotNaN) {
        var map, mapName, img, nodeName = element.nodeName.toLowerCase();
        if ("area" === nodeName) {
            map = element.parentNode;
            mapName = map.name;
            if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
                return false;
            }
            img = $("img[usemap=#" + mapName + "]")[0];
            return !!img && visible(img);
        }
        return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element);
    }

    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function() {
                return $.css(this, "visibility") === "hidden";
            }).length;
    }

    $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
            return function(elem) {
                return !!$.data(elem, dataName);
            };
        }) : function(elem, i, match) {
            return !!$.data(elem, match[3]);
        },
        focusable: function(element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")));
        },
        tabbable: function(element) {
            var tabIndex = $.attr(element, "tabindex"),
                isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
        }
    });
    if (!$("<a>").outerWidth(1).jquery) {
        $.each(["Width", "Height"], function(i, name) {
            var side = name === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                type = name.toLowerCase(),
                orig = {
                    innerWidth: $.fn.innerWidth,
                    innerHeight: $.fn.innerHeight,
                    outerWidth: $.fn.outerWidth,
                    outerHeight: $.fn.outerHeight
                };

            function reduce(elem, size, border, margin) {
                $.each(side, function() {
                    size -= parseFloat($.css(elem, "padding" + this)) || 0;
                    if (border) {
                        size -= parseFloat($.css(elem, "border" + this + "Width")) || 0;
                    }
                    if (margin) {
                        size -= parseFloat($.css(elem, "margin" + this)) || 0;
                    }
                });
                return size;
            }

            $.fn["inner" + name] = function(size) {
                if (size === undefined) {
                    return orig["inner" + name].call(this);
                }
                return this.each(function() {
                    $(this).css(type, reduce(this, size) + "px");
                });
            };
            $.fn["outer" + name] = function(size, margin) {
                if (typeof size !== "number") {
                    return orig["outer" + name].call(this, size);
                }
                return this.each(function() {
                    $(this).css(type, reduce(this, size, true, margin) + "px");
                });
            };
        });
    }
    if (!$.fn.addBack) {
        $.fn.addBack = function(selector) {
            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
        };
    }
    if ($("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
        $.fn.removeData = (function(removeData) {
            return function(key) {
                if (arguments.length) {
                    return removeData.call(this, $.camelCase(key));
                } else {
                    return removeData.call(this);
                }
            };
        })($.fn.removeData);
    }
    $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    $.support.selectstart = "onselectstart" in document.createElement("div");
    $.fn.extend({
        disableSelection: function() {
            return this.bind(($.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(event) {
                event.preventDefault();
            });
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection");
        }
    });
    $.extend($.ui, {
        plugin: {
            add: function(module, option, set) {
                var i, proto = $.ui[module].prototype;
                for (i in set) {
                    proto.plugins[i] = proto.plugins[i] || [];
                    proto.plugins[i].push([option, set[i]]);
                }
            },
            call: function(instance, name, args) {
                var i, set = instance.plugins[name];
                if (!set || !instance.element[0].parentNode || instance.element[0].parentNode.nodeType === 11) {
                    return;
                }
                for (i = 0; i < set.length; i++) {
                    if (instance.options[set[i][0]]) {
                        set[i][1].apply(instance.element, args);
                    }
                }
            }
        },
        hasScroll: function(el, a) {
            if ($(el).css("overflow") === "hidden") {
                return false;
            }
            var scroll = (a && a === "left") ? "scrollLeft" : "scrollTop",
                has = false;
            if (el[scroll] > 0) {
                return true;
            }
            el[scroll] = 1;
            has = (el[scroll] > 0);
            el[scroll] = 0;
            return has;
        }
    });
})(jQuery);
(function($, undefined) {
    var uuid = 0,
        slice = Array.prototype.slice,
        _cleanData = $.cleanData;
    $.cleanData = function(elems) {
        for (var i = 0, elem;
             (elem = elems[i]) != null; i++) {
            try {
                $(elem).triggerHandler("remove");
            } catch (e) {}
        }
        _cleanData(elems);
    };
    $.widget = function(name, base, prototype) {
        var fullName, existingConstructor, constructor, basePrototype, proxiedPrototype = {},
            namespace = name.split(".")[0];
        name = name.split(".")[1];
        fullName = namespace + "-" + name;
        if (!prototype) {
            prototype = base;
            base = $.Widget;
        }
        $.expr[":"][fullName.toLowerCase()] = function(elem) {
            return !!$.data(elem, fullName);
        };
        $[namespace] = $[namespace] || {};
        existingConstructor = $[namespace][name];
        constructor = $[namespace][name] = function(options, element) {
            if (!this._createWidget) {
                return new constructor(options, element);
            }
            if (arguments.length) {
                this._createWidget(options, element);
            }
        };
        $.extend(constructor, existingConstructor, {
            version: prototype.version,
            _proto: $.extend({}, prototype),
            _childConstructors: []
        });
        basePrototype = new base();
        basePrototype.options = $.widget.extend({}, basePrototype.options);
        $.each(prototype, function(prop, value) {
            if (!$.isFunction(value)) {
                proxiedPrototype[prop] = value;
                return;
            }
            proxiedPrototype[prop] = (function() {
                var _super = function() {
                        return base.prototype[prop].apply(this, arguments);
                    },
                    _superApply = function(args) {
                        return base.prototype[prop].apply(this, args);
                    };
                return function() {
                    var __super = this._super,
                        __superApply = this._superApply,
                        returnValue;
                    this._super = _super;
                    this._superApply = _superApply;
                    returnValue = value.apply(this, arguments);
                    this._super = __super;
                    this._superApply = __superApply;
                    return returnValue;
                };
            })();
        });
        constructor.prototype = $.widget.extend(basePrototype, {
            widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
        }, proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widgetName: name,
            widgetFullName: fullName
        });
        if (existingConstructor) {
            $.each(existingConstructor._childConstructors, function(i, child) {
                var childPrototype = child.prototype;
                $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
            });
            delete existingConstructor._childConstructors;
        } else {
            base._childConstructors.push(constructor);
        }
        $.widget.bridge(name, constructor);
    };
    $.widget.extend = function(target) {
        var input = slice.call(arguments, 1),
            inputIndex = 0,
            inputLength = input.length,
            key, value;
        for (; inputIndex < inputLength; inputIndex++) {
            for (key in input[inputIndex]) {
                value = input[inputIndex][key];
                if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
                    if ($.isPlainObject(value)) {
                        target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) : $.widget.extend({}, value);
                    } else {
                        target[key] = value;
                    }
                }
            }
        }
        return target;
    };
    $.widget.bridge = function(name, object) {
        var fullName = object.prototype.widgetFullName || name;
        $.fn[name] = function(options) {
            var isMethodCall = typeof options === "string",
                args = slice.call(arguments, 1),
                returnValue = this;
            options = !isMethodCall && args.length ? $.widget.extend.apply(null, [options].concat(args)) : options;
            if (isMethodCall) {
                this.each(function() {
                    var methodValue, instance = $.data(this, fullName);
                    if (!instance) {
                        return $.error("cannot call methods on " + name + " prior to initialization; " + "attempted to call method '" + options + "'");
                    }
                    if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                        return $.error("no such method '" + options + "' for " + name + " widget instance");
                    }
                    methodValue = instance[options].apply(instance, args);
                    if (methodValue !== instance && methodValue !== undefined) {
                        returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue;
                        return false;
                    }
                });
            } else {
                this.each(function() {
                    var instance = $.data(this, fullName);
                    if (instance) {
                        instance.option(options || {})._init();
                    } else {
                        $.data(this, fullName, new object(options, this));
                    }
                });
            }
            return returnValue;
        };
    };
    $.Widget = function() {};
    $.Widget._childConstructors = [];
    $.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: false,
            create: null
        },
        _createWidget: function(options, element) {
            element = $(element || this.defaultElement || this)[0];
            this.element = $(element);
            this.uuid = uuid++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options);
            this.bindings = $();
            this.hoverable = $();
            this.focusable = $();
            if (element !== this) {
                $.data(element, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function(event) {
                        if (event.target === element) {
                            this.destroy();
                        }
                    }
                });
                this.document = $(element.style ? element.ownerDocument : element.document || element);
                this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
            }
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init();
        },
        _getCreateOptions: $.noop,
        _getCreateEventData: $.noop,
        _create: $.noop,
        _init: $.noop,
        destroy: function() {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus");
        },
        _destroy: $.noop,
        widget: function() {
            return this.element;
        },
        option: function(key, value) {
            var options = key,
                parts, curOption, i;
            if (arguments.length === 0) {
                return $.widget.extend({}, this.options);
            }
            if (typeof key === "string") {
                options = {};
                parts = key.split(".");
                key = parts.shift();
                if (parts.length) {
                    curOption = options[key] = $.widget.extend({}, this.options[key]);
                    for (i = 0; i < parts.length - 1; i++) {
                        curOption[parts[i]] = curOption[parts[i]] || {};
                        curOption = curOption[parts[i]];
                    }
                    key = parts.pop();
                    if (arguments.length === 1) {
                        return curOption[key] === undefined ? null : curOption[key];
                    }
                    curOption[key] = value;
                } else {
                    if (arguments.length === 1) {
                        return this.options[key] === undefined ? null : this.options[key];
                    }
                    options[key] = value;
                }
            }
            this._setOptions(options);
            return this;
        },
        _setOptions: function(options) {
            var key;
            for (key in options) {
                this._setOption(key, options[key]);
            }
            return this;
        },
        _setOption: function(key, value) {
            this.options[key] = value;
            if (key === "disabled") {
                this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!value).attr("aria-disabled", value);
                this.hoverable.removeClass("ui-state-hover");
                this.focusable.removeClass("ui-state-focus");
            }
            return this;
        },
        enable: function() {
            return this._setOption("disabled", false);
        },
        disable: function() {
            return this._setOption("disabled", true);
        },
        _on: function(suppressDisabledCheck, element, handlers) {
            var delegateElement, instance = this;
            if (typeof suppressDisabledCheck !== "boolean") {
                handlers = element;
                element = suppressDisabledCheck;
                suppressDisabledCheck = false;
            }
            if (!handlers) {
                handlers = element;
                element = this.element;
                delegateElement = this.widget();
            } else {
                element = delegateElement = $(element);
                this.bindings = this.bindings.add(element);
            }
            $.each(handlers, function(event, handler) {
                function handlerProxy() {
                    if (!suppressDisabledCheck && (instance.options.disabled === true || $(this).hasClass("ui-state-disabled"))) {
                        return;
                    }
                    return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
                }

                if (typeof handler !== "string") {
                    handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++;
                }
                var match = event.match(/^(\w+)\s*(.*)$/),
                    eventName = match[1] + instance.eventNamespace,
                    selector = match[2];
                if (selector) {
                    delegateElement.delegate(selector, eventName, handlerProxy);
                } else {
                    element.bind(eventName, handlerProxy);
                }
            });
        },
        _off: function(element, eventName) {
            eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            element.unbind(eventName).undelegate(eventName);
        },
        _delay: function(handler, delay) {
            function handlerProxy() {
                return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
            }

            var instance = this;
            return setTimeout(handlerProxy, delay || 0);
        },
        _hoverable: function(element) {
            this.hoverable = this.hoverable.add(element);
            this._on(element, {
                mouseenter: function(event) {
                    $(event.currentTarget).addClass("ui-state-hover");
                },
                mouseleave: function(event) {
                    $(event.currentTarget).removeClass("ui-state-hover");
                }
            });
        },
        _focusable: function(element) {
            this.focusable = this.focusable.add(element);
            this._on(element, {
                focusin: function(event) {
                    $(event.currentTarget).addClass("ui-state-focus");
                },
                focusout: function(event) {
                    $(event.currentTarget).removeClass("ui-state-focus");
                }
            });
        },
        _trigger: function(type, event, data) {
            var prop, orig, callback = this.options[type];
            data = data || {};
            event = $.Event(event);
            event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase();
            event.target = this.element[0];
            orig = event.originalEvent;
            if (orig) {
                for (prop in orig) {
                    if (!(prop in event)) {
                        event[prop] = orig[prop];
                    }
                }
            }
            this.element.trigger(event, data);
            return !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented());
        }
    };
    $.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(method, defaultEffect) {
        $.Widget.prototype["_" + method] = function(element, options, callback) {
            if (typeof options === "string") {
                options = {
                    effect: options
                };
            }
            var hasOptions, effectName = !options ? method : options === true || typeof options === "number" ? defaultEffect : options.effect || defaultEffect;
            options = options || {};
            if (typeof options === "number") {
                options = {
                    duration: options
                };
            }
            hasOptions = !$.isEmptyObject(options);
            options.complete = callback;
            if (options.delay) {
                element.delay(options.delay);
            }
            if (hasOptions && $.effects && $.effects.effect[effectName]) {
                element[method](options);
            } else {
                if (effectName !== method && element[effectName]) {
                    element[effectName](options.duration, options.easing, callback);
                } else {
                    element.queue(function(next) {
                        $(this)[method]();
                        if (callback) {
                            callback.call(element[0]);
                        }
                        next();
                    });
                }
            }
        };
    });
})(jQuery);
(function($, undefined) {
    var mouseHandled = false;
    $(document).mouseup(function() {
        mouseHandled = false;
    });
    $.widget("ui.mouse", {
        version: "1.10.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var that = this;
            this.element.bind("mousedown." + this.widgetName, function(event) {
                return that._mouseDown(event);
            }).bind("click." + this.widgetName, function(event) {
                if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
                    $.removeData(event.target, that.widgetName + ".preventClickEvent");
                    event.stopImmediatePropagation();
                    return false;
                }
            });
            this.started = false;
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName);
            if (this._mouseMoveDelegate) {
                $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            }
        },
        _mouseDown: function(event) {
            if (mouseHandled) {
                return;
            }
            (this._mouseStarted && this._mouseUp(event));
            this._mouseDownEvent = event;
            var that = this,
                btnIsLeft = (event.which === 1),
                elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
            if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
                return true;
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function() {
                    that.mouseDelayMet = true;
                }, this.options.delay);
            }
            if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
                this._mouseStarted = (this._mouseStart(event) !== false);
                if (!this._mouseStarted) {
                    event.preventDefault();
                    return true;
                }
            }
            if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
                $.removeData(event.target, this.widgetName + ".preventClickEvent");
            }
            this._mouseMoveDelegate = function(event) {
                return that._mouseMove(event);
            };
            this._mouseUpDelegate = function(event) {
                return that._mouseUp(event);
            };
            $(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            event.preventDefault();
            mouseHandled = true;
            return true;
        },
        _mouseMove: function(event) {
            if ($.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button) {
                return this._mouseUp(event);
            }
            if (this._mouseStarted) {
                this._mouseDrag(event);
                return event.preventDefault();
            }
            if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, event) !== false);
                (this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
            }
            return !this._mouseStarted;
        },
        _mouseUp: function(event) {
            $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                if (event.target === this._mouseDownEvent.target) {
                    $.data(event.target, this.widgetName + ".preventClickEvent", true);
                }
                this._mouseStop(event);
            }
            return false;
        },
        _mouseDistanceMet: function(event) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance);
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet;
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return true;
        }
    });
})(jQuery);
(function($, undefined) {
    $.widget("ui.draggable", $.ui.mouse, {
        version: "1.10.4",
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            if (this.options.helper === "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
                this.element[0].style.position = "relative";
            }
            if (this.options.addClasses) {
                this.element.addClass("ui-draggable");
            }
            if (this.options.disabled) {
                this.element.addClass("ui-draggable-disabled");
            }
            this._mouseInit();
        },
        _destroy: function() {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
            this._mouseDestroy();
        },
        _mouseCapture: function(event) {
            var o = this.options;
            if (this.helper || o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0) {
                return false;
            }
            this.handle = this._getHandle(event);
            if (!this.handle) {
                return false;
            }
            $(o.iframeFix === true ? "iframe" : o.iframeFix).each(function() {
                $("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1000
                }).css($(this).offset()).appendTo("body");
            });
            return true;
        },
        _mouseStart: function(event) {
            var o = this.options;
            this.helper = this._createHelper(event);
            this.helper.addClass("ui-draggable-dragging");
            this._cacheHelperProportions();
            if ($.ui.ddmanager) {
                $.ui.ddmanager.current = this;
            }
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offsetParent = this.helper.offsetParent();
            this.offsetParentCssPosition = this.offsetParent.css("position");
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            this.offset.scroll = false;
            $.extend(this.offset, {
                click: {
                    left: event.pageX - this.offset.left,
                    top: event.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(event);
            this.originalPageX = event.pageX;
            this.originalPageY = event.pageY;
            (o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));
            this._setContainment();
            if (this._trigger("start", event) === false) {
                this._clear();
                return false;
            }
            this._cacheHelperProportions();
            if ($.ui.ddmanager && !o.dropBehaviour) {
                $.ui.ddmanager.prepareOffsets(this, event);
            }
            this._mouseDrag(event, true);
            if ($.ui.ddmanager) {
                $.ui.ddmanager.dragStart(this, event);
            }
            return true;
        },
        _mouseDrag: function(event, noPropagation) {
            if (this.offsetParentCssPosition === "fixed") {
                this.offset.parent = this._getParentOffset();
            }
            this.position = this._generatePosition(event);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!noPropagation) {
                var ui = this._uiHash();
                if (this._trigger("drag", event, ui) === false) {
                    this._mouseUp({});
                    return false;
                }
                this.position = ui.position;
            }
            if (!this.options.axis || this.options.axis !== "y") {
                this.helper[0].style.left = this.position.left + "px";
            }
            if (!this.options.axis || this.options.axis !== "x") {
                this.helper[0].style.top = this.position.top + "px";
            }
            if ($.ui.ddmanager) {
                $.ui.ddmanager.drag(this, event);
            }
            return false;
        },
        _mouseStop: function(event) {
            var that = this,
                dropped = false;
            if ($.ui.ddmanager && !this.options.dropBehaviour) {
                dropped = $.ui.ddmanager.drop(this, event);
            }
            if (this.dropped) {
                dropped = this.dropped;
                this.dropped = false;
            }
            if (this.options.helper === "original" && !$.contains(this.element[0].ownerDocument, this.element[0])) {
                return false;
            }
            if ((this.options.revert === "invalid" && !dropped) || (this.options.revert === "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
                $(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    if (that._trigger("stop", event) !== false) {
                        that._clear();
                    }
                });
            } else {
                if (this._trigger("stop", event) !== false) {
                    this._clear();
                }
            }
            return false;
        },
        _mouseUp: function(event) {
            $("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this);
            });
            if ($.ui.ddmanager) {
                $.ui.ddmanager.dragStop(this, event);
            }
            return $.ui.mouse.prototype._mouseUp.call(this, event);
        },
        cancel: function() {
            if (this.helper.is(".ui-draggable-dragging")) {
                this._mouseUp({});
            } else {
                this._clear();
            }
            return this;
        },
        _getHandle: function(event) {
            return this.options.handle ? !!$(event.target).closest(this.element.find(this.options.handle)).length : true;
        },
        _createHelper: function(event) {
            var o = this.options,
                helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event])) : (o.helper === "clone" ? this.element.clone().removeAttr("id") : this.element);
            if (!helper.parents("body").length) {
                helper.appendTo((o.appendTo === "parent" ? this.element[0].parentNode : o.appendTo));
            }
            if (helper[0] !== this.element[0] && !(/(fixed|absolute)/).test(helper.css("position"))) {
                helper.css("position", "absolute");
            }
            return helper;
        },
        _adjustOffsetFromHelper: function(obj) {
            if (typeof obj === "string") {
                obj = obj.split(" ");
            }
            if ($.isArray(obj)) {
                obj = {
                    left: +obj[0],
                    top: +obj[1] || 0
                };
            }
            if ("left" in obj) {
                this.offset.click.left = obj.left + this.margins.left;
            }
            if ("right" in obj) {
                this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
            }
            if ("top" in obj) {
                this.offset.click.top = obj.top + this.margins.top;
            }
            if ("bottom" in obj) {
                this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
            }
        },
        _getParentOffset: function() {
            var po = this.offsetParent.offset();
            if (this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
                po.left += this.scrollParent.scrollLeft();
                po.top += this.scrollParent.scrollTop();
            }
            if ((this.offsetParent[0] === document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && $.ui.ie)) {
                po = {
                    top: 0,
                    left: 0
                };
            }
            return {
                top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            };
        },
        _getRelativeOffset: function() {
            if (this.cssPosition === "relative") {
                var p = this.element.position();
                return {
                    top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                };
            } else {
                return {
                    top: 0,
                    left: 0
                };
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: (parseInt(this.element.css("marginLeft"), 10) || 0),
                top: (parseInt(this.element.css("marginTop"), 10) || 0),
                right: (parseInt(this.element.css("marginRight"), 10) || 0),
                bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
            };
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            };
        },
        _setContainment: function() {
            var over, c, ce, o = this.options;
            if (!o.containment) {
                this.containment = null;
                return;
            }
            if (o.containment === "window") {
                this.containment = [$(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, $(window).scrollLeft() + $(window).width() - this.helperProportions.width - this.margins.left, $(window).scrollTop() + ($(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                return;
            }
            if (o.containment === "document") {
                this.containment = [0, 0, $(document).width() - this.helperProportions.width - this.margins.left, ($(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                return;
            }
            if (o.containment.constructor === Array) {
                this.containment = o.containment;
                return;
            }
            if (o.containment === "parent") {
                o.containment = this.helper[0].parentNode;
            }
            c = $(o.containment);
            ce = c[0];
            if (!ce) {
                return;
            }
            over = c.css("overflow") !== "hidden";
            this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
            this.relative_container = c;
        },
        _convertPositionTo: function(d, pos) {
            if (!pos) {
                pos = this.position;
            }
            var mod = d === "absolute" ? 1 : -1,
                scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent;
            if (!this.offset.scroll) {
                this.offset.scroll = {
                    top: scroll.scrollTop(),
                    left: scroll.scrollLeft()
                };
            }
            return {
                top: (pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * mod)),
                left: (pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * mod))
            };
        },
        _generatePosition: function(event) {
            var containment, co, top, left, o = this.options,
                scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                pageX = event.pageX,
                pageY = event.pageY;
            if (!this.offset.scroll) {
                this.offset.scroll = {
                    top: scroll.scrollTop(),
                    left: scroll.scrollLeft()
                };
            }
            if (this.originalPosition) {
                if (this.containment) {
                    if (this.relative_container) {
                        co = this.relative_container.offset();
                        containment = [this.containment[0] + co.left, this.containment[1] + co.top, this.containment[2] + co.left, this.containment[3] + co.top];
                    } else {
                        containment = this.containment;
                    }
                    if (event.pageX - this.offset.click.left < containment[0]) {
                        pageX = containment[0] + this.offset.click.left;
                    }
                    if (event.pageY - this.offset.click.top < containment[1]) {
                        pageY = containment[1] + this.offset.click.top;
                    }
                    if (event.pageX - this.offset.click.left > containment[2]) {
                        pageX = containment[2] + this.offset.click.left;
                    }
                    if (event.pageY - this.offset.click.top > containment[3]) {
                        pageY = containment[3] + this.offset.click.top;
                    }
                }
                if (o.grid) {
                    top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
                    pageY = containment ? ((top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3]) ? top : ((top - this.offset.click.top >= containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;
                    left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
                    pageX = containment ? ((left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2]) ? left : ((left - this.offset.click.left >= containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
                }
            }
            return {
                top: (pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : this.offset.scroll.top)),
                left: (pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : this.offset.scroll.left))
            };
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging");
            if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
                this.helper.remove();
            }
            this.helper = null;
            this.cancelHelperRemoval = false;
        },
        _trigger: function(type, event, ui) {
            ui = ui || this._uiHash();
            $.ui.plugin.call(this, type, [event, ui]);
            if (type === "drag") {
                this.positionAbs = this._convertPositionTo("absolute");
            }
            return $.Widget.prototype._trigger.call(this, type, event, ui);
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            };
        }
    });
    $.ui.plugin.add("draggable", "connectToSortable", {
        start: function(event, ui) {
            var inst = $(this).data("ui-draggable"),
                o = inst.options,
                uiSortable = $.extend({}, ui, {
                    item: inst.element
                });
            inst.sortables = [];
            $(o.connectToSortable).each(function() {
                var sortable = $.data(this, "ui-sortable");
                if (sortable && !sortable.options.disabled) {
                    inst.sortables.push({
                        instance: sortable,
                        shouldRevert: sortable.options.revert
                    });
                    sortable.refreshPositions();
                    sortable._trigger("activate", event, uiSortable);
                }
            });
        },
        stop: function(event, ui) {
            var inst = $(this).data("ui-draggable"),
                uiSortable = $.extend({}, ui, {
                    item: inst.element
                });
            $.each(inst.sortables, function() {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    inst.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) {
                        this.instance.options.revert = this.shouldRevert;
                    }
                    this.instance._mouseStop(event);
                    this.instance.options.helper = this.instance.options._helper;
                    if (inst.options.helper === "original") {
                        this.instance.currentItem.css({
                            top: "auto",
                            left: "auto"
                        });
                    }
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", event, uiSortable);
                }
            });
        },
        drag: function(event, ui) {
            var inst = $(this).data("ui-draggable"),
                that = this;
            $.each(inst.sortables, function() {
                var innermostIntersecting = false,
                    thisSortable = this;
                this.instance.positionAbs = inst.positionAbs;
                this.instance.helperProportions = inst.helperProportions;
                this.instance.offset.click = inst.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    innermostIntersecting = true;
                    $.each(inst.sortables, function() {
                        this.instance.positionAbs = inst.positionAbs;
                        this.instance.helperProportions = inst.helperProportions;
                        this.instance.offset.click = inst.offset.click;
                        if (this !== thisSortable && this.instance._intersectsWith(this.instance.containerCache) && $.contains(thisSortable.instance.element[0], this.instance.element[0])) {
                            innermostIntersecting = false;
                        }
                        return innermostIntersecting;
                    });
                }
                if (innermostIntersecting) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = $(that).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function() {
                            return ui.helper[0];
                        };
                        event.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(event, true);
                        this.instance._mouseStart(event, true, true);
                        this.instance.offset.click.top = inst.offset.click.top;
                        this.instance.offset.click.left = inst.offset.click.left;
                        this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top;
                        inst._trigger("toSortable", event);
                        inst.dropped = this.instance.element;
                        inst.currentItem = inst.element;
                        this.instance.fromOutside = inst;
                    }
                    if (this.instance.currentItem) {
                        this.instance._mouseDrag(event);
                    }
                } else {
                    if (this.instance.isOver) {
                        this.instance.isOver = 0;
                        this.instance.cancelHelperRemoval = true;
                        this.instance.options.revert = false;
                        this.instance._trigger("out", event, this.instance._uiHash(this.instance));
                        this.instance._mouseStop(event, true);
                        this.instance.options.helper = this.instance.options._helper;
                        this.instance.currentItem.remove();
                        if (this.instance.placeholder) {
                            this.instance.placeholder.remove();
                        }
                        inst._trigger("fromSortable", event);
                        inst.dropped = false;
                    }
                }
            });
        }
    });
    $.ui.plugin.add("draggable", "cursor", {
        start: function() {
            var t = $("body"),
                o = $(this).data("ui-draggable").options;
            if (t.css("cursor")) {
                o._cursor = t.css("cursor");
            }
            t.css("cursor", o.cursor);
        },
        stop: function() {
            var o = $(this).data("ui-draggable").options;
            if (o._cursor) {
                $("body").css("cursor", o._cursor);
            }
        }
    });
    $.ui.plugin.add("draggable", "opacity", {
        start: function(event, ui) {
            var t = $(ui.helper),
                o = $(this).data("ui-draggable").options;
            if (t.css("opacity")) {
                o._opacity = t.css("opacity");
            }
            t.css("opacity", o.opacity);
        },
        stop: function(event, ui) {
            var o = $(this).data("ui-draggable").options;
            if (o._opacity) {
                $(ui.helper).css("opacity", o._opacity);
            }
        }
    });
    $.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var i = $(this).data("ui-draggable");
            if (i.scrollParent[0] !== document && i.scrollParent[0].tagName !== "HTML") {
                i.overflowOffset = i.scrollParent.offset();
            }
        },
        drag: function(event) {
            var i = $(this).data("ui-draggable"),
                o = i.options,
                scrolled = false;
            if (i.scrollParent[0] !== document && i.scrollParent[0].tagName !== "HTML") {
                if (!o.axis || o.axis !== "x") {
                    if ((i.overflowOffset.top + i.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity) {
                        i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed;
                    } else {
                        if (event.pageY - i.overflowOffset.top < o.scrollSensitivity) {
                            i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed;
                        }
                    }
                }
                if (!o.axis || o.axis !== "y") {
                    if ((i.overflowOffset.left + i.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity) {
                        i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed;
                    } else {
                        if (event.pageX - i.overflowOffset.left < o.scrollSensitivity) {
                            i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed;
                        }
                    }
                }
            } else {
                if (!o.axis || o.axis !== "x") {
                    if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
                        scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
                    } else {
                        if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
                            scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
                        }
                    }
                }
                if (!o.axis || o.axis !== "y") {
                    if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
                        scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
                    } else {
                        if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
                            scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
                        }
                    }
                }
            }
            if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
                $.ui.ddmanager.prepareOffsets(i, event);
            }
        }
    });
    $.ui.plugin.add("draggable", "snap", {
        start: function() {
            var i = $(this).data("ui-draggable"),
                o = i.options;
            i.snapElements = [];
            $(o.snap.constructor !== String ? (o.snap.items || ":data(ui-draggable)") : o.snap).each(function() {
                var $t = $(this),
                    $o = $t.offset();
                if (this !== i.element[0]) {
                    i.snapElements.push({
                        item: this,
                        width: $t.outerWidth(),
                        height: $t.outerHeight(),
                        top: $o.top,
                        left: $o.left
                    });
                }
            });
        },
        drag: function(event, ui) {
            var ts, bs, ls, rs, l, r, t, b, i, first, inst = $(this).data("ui-draggable"),
                o = inst.options,
                d = o.snapTolerance,
                x1 = ui.offset.left,
                x2 = x1 + inst.helperProportions.width,
                y1 = ui.offset.top,
                y2 = y1 + inst.helperProportions.height;
            for (i = inst.snapElements.length - 1; i >= 0; i--) {
                l = inst.snapElements[i].left;
                r = l + inst.snapElements[i].width;
                t = inst.snapElements[i].top;
                b = t + inst.snapElements[i].height;
                if (x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !$.contains(inst.snapElements[i].item.ownerDocument, inst.snapElements[i].item)) {
                    if (inst.snapElements[i].snapping) {
                        (inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), {
                            snapItem: inst.snapElements[i].item
                        })));
                    }
                    inst.snapElements[i].snapping = false;
                    continue;
                }
                if (o.snapMode !== "inner") {
                    ts = Math.abs(t - y2) <= d;
                    bs = Math.abs(b - y1) <= d;
                    ls = Math.abs(l - x2) <= d;
                    rs = Math.abs(r - x1) <= d;
                    if (ts) {
                        ui.position.top = inst._convertPositionTo("relative", {
                            top: t - inst.helperProportions.height,
                            left: 0
                        }).top - inst.margins.top;
                    }
                    if (bs) {
                        ui.position.top = inst._convertPositionTo("relative", {
                            top: b,
                            left: 0
                        }).top - inst.margins.top;
                    }
                    if (ls) {
                        ui.position.left = inst._convertPositionTo("relative", {
                            top: 0,
                            left: l - inst.helperProportions.width
                        }).left - inst.margins.left;
                    }
                    if (rs) {
                        ui.position.left = inst._convertPositionTo("relative", {
                            top: 0,
                            left: r
                        }).left - inst.margins.left;
                    }
                }
                first = (ts || bs || ls || rs);
                if (o.snapMode !== "outer") {
                    ts = Math.abs(t - y1) <= d;
                    bs = Math.abs(b - y2) <= d;
                    ls = Math.abs(l - x1) <= d;
                    rs = Math.abs(r - x2) <= d;
                    if (ts) {
                        ui.position.top = inst._convertPositionTo("relative", {
                            top: t,
                            left: 0
                        }).top - inst.margins.top;
                    }
                    if (bs) {
                        ui.position.top = inst._convertPositionTo("relative", {
                            top: b - inst.helperProportions.height,
                            left: 0
                        }).top - inst.margins.top;
                    }
                    if (ls) {
                        ui.position.left = inst._convertPositionTo("relative", {
                            top: 0,
                            left: l
                        }).left - inst.margins.left;
                    }
                    if (rs) {
                        ui.position.left = inst._convertPositionTo("relative", {
                            top: 0,
                            left: r - inst.helperProportions.width
                        }).left - inst.margins.left;
                    }
                }
                if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) {
                    (inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), {
                        snapItem: inst.snapElements[i].item
                    })));
                }
                inst.snapElements[i].snapping = (ts || bs || ls || rs || first);
            }
        }
    });
    $.ui.plugin.add("draggable", "stack", {
        start: function() {
            var min, o = this.data("ui-draggable").options,
                group = $.makeArray($(o.stack)).sort(function(a, b) {
                    return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0);
                });
            if (!group.length) {
                return;
            }
            min = parseInt($(group[0]).css("zIndex"), 10) || 0;
            $(group).each(function(i) {
                $(this).css("zIndex", min + i);
            });
            this.css("zIndex", (min + group.length));
        }
    });
    $.ui.plugin.add("draggable", "zIndex", {
        start: function(event, ui) {
            var t = $(ui.helper),
                o = $(this).data("ui-draggable").options;
            if (t.css("zIndex")) {
                o._zIndex = t.css("zIndex");
            }
            t.css("zIndex", o.zIndex);
        },
        stop: function(event, ui) {
            var o = $(this).data("ui-draggable").options;
            if (o._zIndex) {
                $(ui.helper).css("zIndex", o._zIndex);
            }
        }
    });
})(jQuery);
(function($, undefined) {
    $.widget("ui.sortable", $.ui.mouse, {
        widgetEventPrefix: "sort",
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1000
        },
        _create: function() {
            var o = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? (/left|right/).test(this.items[0].item.css("float")) : false;
            this.offset = this.element.offset();
            this._mouseInit();
        },
        destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var i = this.items.length - 1; i >= 0; i--) {
                this.items[i].item.removeData("sortable-item");
            }
            return this;
        },
        _setOption: function(key, value) {
            if (key === "disabled") {
                this.options[key] = value;
                this.widget()[value ? "addClass" : "removeClass"]("ui-sortable-disabled");
            } else {
                $.Widget.prototype._setOption.apply(this, arguments);
            }
        },
        _mouseCapture: function(event, overrideHandle) {
            if (this.reverting) {
                return false;
            }
            if (this.options.disabled || this.options.type == "static") {
                return false;
            }
            this._refreshItems(event);
            var currentItem = null,
                self = this,
                nodes = $(event.target).parents().each(function() {
                    if ($.data(this, "sortable-item") == self) {
                        currentItem = $(this);
                        return false;
                    }
                });
            if ($.data(event.target, "sortable-item") == self) {
                currentItem = $(event.target);
            }
            if (!currentItem) {
                return false;
            }
            if (this.options.handle && !overrideHandle) {
                var validHandle = false;
                $(this.options.handle, currentItem).find("*").andSelf().each(function() {
                    if (this == event.target) {
                        validHandle = true;
                    }
                });
                if (!validHandle) {
                    return false;
                }
            }
            this.currentItem = currentItem;
            this._removeCurrentsFromItems();
            return true;
        },
        _mouseStart: function(event, overrideHandle, noActivation) {
            var o = this.options,
                self = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(event);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            $.extend(this.offset, {
                click: {
                    left: event.pageX - this.offset.left,
                    top: event.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(event);
            this.originalPageX = event.pageX;
            this.originalPageY = event.pageY;
            (o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            if (this.helper[0] != this.currentItem[0]) {
                this.currentItem.hide();
            }
            this._createPlaceholder();
            if (o.containment) {
                this._setContainment();
            }
            if (o.cursor) {
                if ($("body").css("cursor")) {
                    this._storedCursor = $("body").css("cursor");
                }
                $("body").css("cursor", o.cursor);
            }
            if (o.opacity) {
                if (this.helper.css("opacity")) {
                    this._storedOpacity = this.helper.css("opacity");
                }
                this.helper.css("opacity", o.opacity);
            }
            if (o.zIndex) {
                if (this.helper.css("zIndex")) {
                    this._storedZIndex = this.helper.css("zIndex");
                }
                this.helper.css("zIndex", o.zIndex);
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                this.overflowOffset = this.scrollParent.offset();
            }
            this._trigger("start", event, this._uiHash());
            if (!this._preserveHelperProportions) {
                this._cacheHelperProportions();
            }
            if (!noActivation) {
                for (var i = this.containers.length - 1; i >= 0; i--) {
                    this.containers[i]._trigger("activate", event, self._uiHash(this));
                }
            }
            if ($.ui.ddmanager) {
                $.ui.ddmanager.current = this;
            }
            if ($.ui.ddmanager && !o.dropBehaviour) {
                $.ui.ddmanager.prepareOffsets(this, event);
            }
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(event);
            return true;
        },
        _mouseDrag: function(event) {
            this.position = this._generatePosition(event);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) {
                this.lastPositionAbs = this.positionAbs;
            }
            if (this.options.scroll) {
                var o = this.options,
                    scrolled = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
                    } else {
                        if (event.pageY - this.overflowOffset.top < o.scrollSensitivity) {
                            this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;
                        }
                    }
                    if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
                    } else {
                        if (event.pageX - this.overflowOffset.left < o.scrollSensitivity) {
                            this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;
                        }
                    }
                } else {
                    if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
                        scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
                    } else {
                        if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
                            scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
                        }
                    }
                    if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
                        scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
                    } else {
                        if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
                            scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
                        }
                    }
                }
                if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
                    $.ui.ddmanager.prepareOffsets(this, event);
                }
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px";
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px";
            }
            for (var i = this.items.length - 1; i >= 0; i--) {
                var item = this.items[i],
                    itemElement = item.item[0],
                    intersection = this._intersectsWithPointer(item);
                if (!intersection) {
                    continue;
                }
                if (itemElement != this.currentItem[0] && this.placeholder[intersection == 1 ? "next" : "prev"]()[0] != itemElement && !$.ui.contains(this.placeholder[0], itemElement) && (this.options.type == "semi-dynamic" ? !$.ui.contains(this.element[0], itemElement) : true)) {
                    this.direction = intersection == 1 ? "down" : "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(item)) {
                        this._rearrange(event, item);
                    } else {
                        break;
                    }
                    this._trigger("change", event, this._uiHash());
                    break;
                }
            }
            this._contactContainers(event);
            if ($.ui.ddmanager) {
                $.ui.ddmanager.drag(this, event);
            }
            this._trigger("sort", event, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false;
        },
        _mouseStop: function(event, noPropagation) {
            if (!event) {
                return;
            }
            if ($.ui.ddmanager && !this.options.dropBehaviour) {
                $.ui.ddmanager.drop(this, event);
            }
            if (this.options.revert) {
                var self = this;
                var cur = self.placeholder.offset();
                self.reverting = true;
                $(this.helper).animate({
                    left: cur.left - this.offset.parent.left - self.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                    top: cur.top - this.offset.parent.top - self.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                }, parseInt(this.options.revert, 10) || 500, function() {
                    self._clear(event);
                });
            } else {
                this._clear(event, noPropagation);
            }
            return false;
        },
        cancel: function() {
            var self = this;
            if (this.dragging) {
                this._mouseUp();
                if (this.options.helper == "original") {
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
                } else {
                    this.currentItem.show();
                }
                for (var i = this.containers.length - 1; i >= 0; i--) {
                    this.containers[i]._trigger("deactivate", null, self._uiHash(this));
                    if (this.containers[i].containerCache.over) {
                        this.containers[i]._trigger("out", null, self._uiHash(this));
                        this.containers[i].containerCache.over = 0;
                    }
                }
            }
            if (this.placeholder[0].parentNode) {
                this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            }
            if (this.options.helper != "original" && this.helper && this.helper[0].parentNode) {
                this.helper.remove();
            }
            $.extend(this, {
                helper: null,
                dragging: false,
                reverting: false,
                _noFinalSort: null
            });
            if (this.domPosition.prev) {
                $(this.domPosition.prev).after(this.currentItem);
            } else {
                $(this.domPosition.parent).prepend(this.currentItem);
            }
            return this;
        },
        serialize: function(o) {
            var items = this._getItemsAsjQuery(o && o.connected);
            var str = [];
            o = o || {};
            $(items).each(function() {
                var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || (/(.+)[-=_](.+)/));
                if (res) {
                    str.push((o.key || res[1] + "[]") + "=" + (o.key && o.expression ? res[1] : res[2]));
                }
            });
            if (!str.length && o.key) {
                str.push(o.key + "=");
            }
            return str.join("&");
        },
        toArray: function(o) {
            var items = this._getItemsAsjQuery(o && o.connected);
            var ret = [];
            o = o || {};
            items.each(function() {
                ret.push($(o.item || this).attr(o.attribute || "id") || "");
            });
            return ret;
        },
        _intersectsWith: function(item) {
            var x1 = this.positionAbs.left,
                x2 = x1 + this.helperProportions.width,
                y1 = this.positionAbs.top,
                y2 = y1 + this.helperProportions.height;
            var l = item.left,
                r = l + item.width,
                t = item.top,
                b = t + item.height;
            var dyClick = this.offset.click.top,
                dxClick = this.offset.click.left;
            var isOverElement = (y1 + dyClick) > t && (y1 + dyClick) < b && (x1 + dxClick) > l && (x1 + dxClick) < r;
            if (this.options.tolerance == "pointer" || this.options.forcePointerForContainers || (this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"])) {
                return isOverElement;
            } else {
                return (l < x1 + (this.helperProportions.width / 2) && x2 - (this.helperProportions.width / 2) < r && t < y1 + (this.helperProportions.height / 2) && y2 - (this.helperProportions.height / 2) < b);
            }
        },
        _intersectsWithPointer: function(item) {
            var isOverElementHeight = $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
                isOverElementWidth = $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
                isOverElement = isOverElementHeight && isOverElementWidth,
                verticalDirection = this._getDragVerticalDirection(),
                horizontalDirection = this._getDragHorizontalDirection();
            if (!isOverElement) {
                return false;
            }
            return this.floating ? (((horizontalDirection && horizontalDirection == "right") || verticalDirection == "down") ? 2 : 1) : (verticalDirection && (verticalDirection == "down" ? 2 : 1));
        },
        _intersectsWithSides: function(item) {
            var isOverBottomHalf = $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + (item.height / 2), item.height),
                isOverRightHalf = $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + (item.width / 2), item.width),
                verticalDirection = this._getDragVerticalDirection(),
                horizontalDirection = this._getDragHorizontalDirection();
            if (this.floating && horizontalDirection) {
                return ((horizontalDirection == "right" && isOverRightHalf) || (horizontalDirection == "left" && !isOverRightHalf));
            } else {
                return verticalDirection && ((verticalDirection == "down" && isOverBottomHalf) || (verticalDirection == "up" && !isOverBottomHalf));
            }
        },
        _getDragVerticalDirection: function() {
            var delta = this.positionAbs.top - this.lastPositionAbs.top;
            return delta != 0 && (delta > 0 ? "down" : "up");
        },
        _getDragHorizontalDirection: function() {
            var delta = this.positionAbs.left - this.lastPositionAbs.left;
            return delta != 0 && (delta > 0 ? "right" : "left");
        },
        refresh: function(event) {
            this._refreshItems(event);
            this.refreshPositions();
            return this;
        },
        _connectWith: function() {
            var options = this.options;
            return options.connectWith.constructor == String ? [options.connectWith] : options.connectWith;
        },
        _getItemsAsjQuery: function(connected) {
            var self = this;
            var items = [];
            var queries = [];
            var connectWith = this._connectWith();
            if (connectWith && connected) {
                for (var i = connectWith.length - 1; i >= 0; i--) {
                    var cur = $(connectWith[i]);
                    for (var j = cur.length - 1; j >= 0; j--) {
                        var inst = $.data(cur[j], "sortable");
                        if (inst && inst != this && !inst.options.disabled) {
                            queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst]);
                        }
                    }
                }
            }
            queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : $(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (var i = queries.length - 1; i >= 0; i--) {
                queries[i][0].each(function() {
                    items.push(this);
                });
            }
            return $(items);
        },
        _removeCurrentsFromItems: function() {
            var list = this.currentItem.find(":data(sortable-item)");
            for (var i = 0; i < this.items.length; i++) {
                for (var j = 0; j < list.length; j++) {
                    if (list[j] == this.items[i].item[0]) {
                        this.items.splice(i, 1);
                    }
                }
            }
        },
        _refreshItems: function(event) {
            this.items = [];
            this.containers = [this];
            var items = this.items;
            var self = this;
            var queries = [
                [$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, {
                    item: this.currentItem
                }) : $(this.options.items, this.element), this]
            ];
            var connectWith = this._connectWith();
            if (connectWith) {
                for (var i = connectWith.length - 1; i >= 0; i--) {
                    var cur = $(connectWith[i]);
                    for (var j = cur.length - 1; j >= 0; j--) {
                        var inst = $.data(cur[j], "sortable");
                        if (inst && inst != this && !inst.options.disabled) {
                            queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, {
                                item: this.currentItem
                            }) : $(inst.options.items, inst.element), inst]);
                            this.containers.push(inst);
                        }
                    }
                }
            }
            for (var i = queries.length - 1; i >= 0; i--) {
                var targetData = queries[i][1];
                var _queries = queries[i][0];
                for (var j = 0, queriesLength = _queries.length; j < queriesLength; j++) {
                    var item = $(_queries[j]);
                    item.data("sortable-item", targetData);
                    items.push({
                        item: item,
                        instance: targetData,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    });
                }
            }
        },
        refreshPositions: function(fast) {
            if (this.offsetParent && this.helper) {
                this.offset.parent = this._getParentOffset();
            }
            for (var i = this.items.length - 1; i >= 0; i--) {
                var item = this.items[i];
                var t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;
                if (!fast) {
                    item.width = t.outerWidth();
                    item.height = t.outerHeight();
                }
                var p = t.offset();
                item.left = p.left;
                item.top = p.top;
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this);
            } else {
                for (var i = this.containers.length - 1; i >= 0; i--) {
                    var p = this.containers[i].element.offset();
                    this.containers[i].containerCache.left = p.left;
                    this.containers[i].containerCache.top = p.top;
                    this.containers[i].containerCache.width = this.containers[i].element.outerWidth();
                    this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
                }
            }
            return this;
        },
        _createPlaceholder: function(that) {
            var self = that || this,
                o = self.options;
            if (!o.placeholder || o.placeholder.constructor == String) {
                var className = o.placeholder;
                o.placeholder = {
                    element: function() {
                        var el = $(document.createElement(self.currentItem[0].nodeName)).addClass(className || self.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!className) {
                            el.style.visibility = "hidden";
                        }
                        return el;
                    },
                    update: function(container, p) {
                        if (className && !o.forcePlaceholderSize) {
                            return;
                        }
                        if (!p.height()) {
                            p.height(self.currentItem.innerHeight() - parseInt(self.currentItem.css("paddingTop") || 0, 10) - parseInt(self.currentItem.css("paddingBottom") || 0, 10));
                        }
                        if (!p.width()) {
                            p.width(self.currentItem.innerWidth() - parseInt(self.currentItem.css("paddingLeft") || 0, 10) - parseInt(self.currentItem.css("paddingRight") || 0, 10));
                        }
                    }
                };
            }
            self.placeholder = $(o.placeholder.element.call(self.element, self.currentItem));
            self.currentItem.after(self.placeholder);
            o.placeholder.update(self, self.placeholder);
        },
        _contactContainers: function(event) {
            var innermostContainer = null,
                innermostIndex = null;
            for (var i = this.containers.length - 1; i >= 0; i--) {
                if ($.ui.contains(this.currentItem[0], this.containers[i].element[0])) {
                    continue;
                }
                if (this._intersectsWith(this.containers[i].containerCache)) {
                    if (innermostContainer && $.ui.contains(this.containers[i].element[0], innermostContainer.element[0])) {
                        continue;
                    }
                    innermostContainer = this.containers[i];
                    innermostIndex = i;
                } else {
                    if (this.containers[i].containerCache.over) {
                        this.containers[i]._trigger("out", event, this._uiHash(this));
                        this.containers[i].containerCache.over = 0;
                    }
                }
            }
            if (!innermostContainer) {
                return;
            }
            if (this.containers.length === 1) {
                this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
                this.containers[innermostIndex].containerCache.over = 1;
            } else {
                if (this.currentContainer != this.containers[innermostIndex]) {
                    var dist = 10000;
                    var itemWithLeastDistance = null;
                    var base = this.positionAbs[this.containers[innermostIndex].floating ? "left" : "top"];
                    for (var j = this.items.length - 1; j >= 0; j--) {
                        if (!$.ui.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {
                            continue;
                        }
                        var cur = this.items[j][this.containers[innermostIndex].floating ? "left" : "top"];
                        if (Math.abs(cur - base) < dist) {
                            dist = Math.abs(cur - base);
                            itemWithLeastDistance = this.items[j];
                        }
                    }
                    if (!itemWithLeastDistance && !this.options.dropOnEmpty) {
                        return;
                    }
                    this.currentContainer = this.containers[innermostIndex];
                    itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[innermostIndex].element, true);
                    this._trigger("change", event, this._uiHash());
                    this.containers[innermostIndex]._trigger("change", event, this._uiHash(this));
                    this.options.placeholder.update(this.currentContainer, this.placeholder);
                    this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
                    this.containers[innermostIndex].containerCache.over = 1;
                }
            }
        },
        _createHelper: function(event) {
            var o = this.options;
            var helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : (o.helper == "clone" ? this.currentItem.clone() : this.currentItem);
            if (!helper.parents("body").length) {
                $(o.appendTo != "parent" ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);
            }
            if (helper[0] == this.currentItem[0]) {
                this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                };
            }
            if (helper[0].style.width == "" || o.forceHelperSize) {
                helper.width(this.currentItem.width());
            }
            if (helper[0].style.height == "" || o.forceHelperSize) {
                helper.height(this.currentItem.height());
            }
            return helper;
        },
        _adjustOffsetFromHelper: function(obj) {
            if (typeof obj == "string") {
                obj = obj.split(" ");
            }
            if ($.isArray(obj)) {
                obj = {
                    left: +obj[0],
                    top: +obj[1] || 0
                };
            }
            if ("left" in obj) {
                this.offset.click.left = obj.left + this.margins.left;
            }
            if ("right" in obj) {
                this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
            }
            if ("top" in obj) {
                this.offset.click.top = obj.top + this.margins.top;
            }
            if ("bottom" in obj) {
                this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
            }
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var po = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                po.left += this.scrollParent.scrollLeft();
                po.top += this.scrollParent.scrollTop();
            }
            if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && $.browser.msie)) {
                po = {
                    top: 0,
                    left: 0
                };
            }
            return {
                top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            };
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var p = this.currentItem.position();
                return {
                    top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                };
            } else {
                return {
                    top: 0,
                    left: 0
                };
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: (parseInt(this.currentItem.css("marginLeft"), 10) || 0),
                top: (parseInt(this.currentItem.css("marginTop"), 10) || 0)
            };
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            };
        },
        _setContainment: function() {
            var o = this.options;
            if (o.containment == "parent") {
                o.containment = this.helper[0].parentNode;
            }
            if (o.containment == "document" || o.containment == "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, $(o.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, ($(o.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            }
            if (!(/^(document|window|parent)$/).test(o.containment)) {
                var ce = $(o.containment)[0];
                var co = $(o.containment).offset();
                var over = ($(ce).css("overflow") != "hidden");
                this.containment = [co.left + (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0) - this.margins.left, co.top + (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0) - this.margins.top, co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top];
            }
        },
        _convertPositionTo: function(d, pos) {
            if (!pos) {
                pos = this.position;
            }
            var mod = d == "absolute" ? 1 : -1;
            var o = this.options,
                scroll = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
            return {
                top: (pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ($.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (scrollIsRootNode ? 0 : scroll.scrollTop())) * mod)),
                left: (pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ($.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()) * mod))
            };
        },
        _generatePosition: function(event) {
            var o = this.options,
                scroll = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset();
            }
            var pageX = event.pageX;
            var pageY = event.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (event.pageX - this.offset.click.left < this.containment[0]) {
                        pageX = this.containment[0] + this.offset.click.left;
                    }
                    if (event.pageY - this.offset.click.top < this.containment[1]) {
                        pageY = this.containment[1] + this.offset.click.top;
                    }
                    if (event.pageX - this.offset.click.left > this.containment[2]) {
                        pageX = this.containment[2] + this.offset.click.left;
                    }
                    if (event.pageY - this.offset.click.top > this.containment[3]) {
                        pageY = this.containment[3] + this.offset.click.top;
                    }
                }
                if (o.grid) {
                    var top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
                    pageY = this.containment ? (!(top - this.offset.click.top < this.containment[1] || top - this.offset.click.top > this.containment[3]) ? top : (!(top - this.offset.click.top < this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;
                    var left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
                    pageX = this.containment ? (!(left - this.offset.click.left < this.containment[0] || left - this.offset.click.left > this.containment[2]) ? left : (!(left - this.offset.click.left < this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
                }
            }
            return {
                top: (pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ($.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (scrollIsRootNode ? 0 : scroll.scrollTop())))),
                left: (pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ($.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft())))
            };
        },
        _rearrange: function(event, i, a, hardRefresh) {
            a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction == "down" ? i.item[0] : i.item[0].nextSibling));
            this.counter = this.counter ? ++this.counter : 1;
            var self = this,
                counter = this.counter;
            window.setTimeout(function() {
                if (counter == self.counter) {
                    self.refreshPositions(!hardRefresh);
                }
            }, 0);
        },
        _clear: function(event, noPropagation) {
            this.reverting = false;
            var delayedTriggers = [],
                self = this;
            if (!this._noFinalSort && this.currentItem[0].parentNode) {
                this.placeholder.before(this.currentItem);
            }
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var i in this._storedCSS) {
                    if (this._storedCSS[i] == "auto" || this._storedCSS[i] == "static") {
                        this._storedCSS[i] = "";
                    }
                }
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
            } else {
                this.currentItem.show();
            }
            if (this.fromOutside && !noPropagation) {
                delayedTriggers.push(function(event) {
                    this._trigger("receive", event, this._uiHash(this.fromOutside));
                });
            }
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !noPropagation) {
                delayedTriggers.push(function(event) {
                    this._trigger("update", event, this._uiHash());
                });
            }
            if (!$.ui.contains(this.element[0], this.currentItem[0])) {
                if (!noPropagation) {
                    delayedTriggers.push(function(event) {
                        this._trigger("remove", event, this._uiHash());
                    });
                }
                for (var i = this.containers.length - 1; i >= 0; i--) {
                    if ($.ui.contains(this.containers[i].element[0], this.currentItem[0]) && !noPropagation) {
                        delayedTriggers.push((function(c) {
                            return function(event) {
                                c._trigger("receive", event, this._uiHash(this));
                            };
                        }).call(this, this.containers[i]));
                        delayedTriggers.push((function(c) {
                            return function(event) {
                                c._trigger("update", event, this._uiHash(this));
                            };
                        }).call(this, this.containers[i]));
                    }
                }
            }
            for (var i = this.containers.length - 1; i >= 0; i--) {
                if (!noPropagation) {
                    delayedTriggers.push((function(c) {
                        return function(event) {
                            c._trigger("deactivate", event, this._uiHash(this));
                        };
                    }).call(this, this.containers[i]));
                }
                if (this.containers[i].containerCache.over) {
                    delayedTriggers.push((function(c) {
                        return function(event) {
                            c._trigger("out", event, this._uiHash(this));
                        };
                    }).call(this, this.containers[i]));
                    this.containers[i].containerCache.over = 0;
                }
            }
            if (this._storedCursor) {
                $("body").css("cursor", this._storedCursor);
            }
            if (this._storedOpacity) {
                this.helper.css("opacity", this._storedOpacity);
            }
            if (this._storedZIndex) {
                this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex);
            }
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!noPropagation) {
                    this._trigger("beforeStop", event, this._uiHash());
                    for (var i = 0; i < delayedTriggers.length; i++) {
                        delayedTriggers[i].call(this, event);
                    }
                    this._trigger("stop", event, this._uiHash());
                }
                return false;
            }
            if (!noPropagation) {
                this._trigger("beforeStop", event, this._uiHash());
            }
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            if (this.helper[0] != this.currentItem[0]) {
                this.helper.remove();
            }
            this.helper = null;
            if (!noPropagation) {
                for (var i = 0; i < delayedTriggers.length; i++) {
                    delayedTriggers[i].call(this, event);
                }
                this._trigger("stop", event, this._uiHash());
            }
            this.fromOutside = false;
            return true;
        },
        _trigger: function() {
            if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
                this.cancel();
            }
        },
        _uiHash: function(inst) {
            var self = inst || this;
            return {
                helper: self.helper,
                placeholder: self.placeholder || $([]),
                position: self.position,
                originalPosition: self.originalPosition,
                offset: self.positionAbs,
                item: self.currentItem,
                sender: inst ? inst.element : null
            };
        }
    });
    $.extend($.ui.sortable, {
        version: "1.8.6"
    });
})(jQuery);
jQuery.effects || (function($, undefined) {
    $.effects = {};
    $.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function(i, attr) {
        $.fx.step[attr] = function(fx) {
            if (!fx.colorInit) {
                fx.start = getColor(fx.elem, attr);
                fx.end = getRGB(fx.end);
                fx.colorInit = true;
            }
            fx.elem.style[attr] = "rgb(" + Math.max(Math.min(parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2], 10), 255), 0) + ")";
        };
    });

    function getRGB(color) {
        var result;
        if (color && color.constructor == Array && color.length == 3) {
            return color;
        }
        if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)) {
            return [parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10)];
        }
        if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color)) {
            return [parseFloat(result[1]) * 2.55, parseFloat(result[2]) * 2.55, parseFloat(result[3]) * 2.55];
        }
        if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color)) {
            return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
        }
        if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color)) {
            return [parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16), parseInt(result[3] + result[3], 16)];
        }
        if (result = /rgba\(0, 0, 0, 0\)/.exec(color)) {
            return colors["transparent"];
        }
        return colors[$.trim(color).toLowerCase()];
    }

    function getColor(elem, attr) {
        var color;
        do {
            color = $.curCSS(elem, attr);
            if (color != "" && color != "transparent" || $.nodeName(elem, "body")) {
                break;
            }
            attr = "backgroundColor";
        } while (elem = elem.parentNode);
        return getRGB(color);
    }

    var colors = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    };
    var classAnimationActions = ["add", "remove", "toggle"],
        shorthandStyles = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };

    function getElementStyles() {
        var style = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
            newStyle = {},
            key, camelCase;
        if (style && style.length && style[0] && style[style[0]]) {
            var len = style.length;
            while (len--) {
                key = style[len];
                if (typeof style[key] == "string") {
                    camelCase = key.replace(/\-(\w)/g, function(all, letter) {
                        return letter.toUpperCase();
                    });
                    newStyle[camelCase] = style[key];
                }
            }
        } else {
            for (key in style) {
                if (typeof style[key] === "string") {
                    newStyle[key] = style[key];
                }
            }
        }
        return newStyle;
    }

    function filterStyles(styles) {
        var name, value;
        for (name in styles) {
            value = styles[name];
            if (value == null || $.isFunction(value) || name in shorthandStyles || (/scrollbar/).test(name) || (!(/color/i).test(name) && isNaN(parseFloat(value)))) {
                delete styles[name];
            }
        }
        return styles;
    }

    function styleDifference(oldStyle, newStyle) {
        var diff = {
                _: 0
            },
            name;
        for (name in newStyle) {
            if (oldStyle[name] != newStyle[name]) {
                diff[name] = newStyle[name];
            }
        }
        return diff;
    }

    $.effects.animateClass = function(value, duration, easing, callback) {
        if ($.isFunction(easing)) {
            callback = easing;
            easing = null;
        }
        return this.each(function() {
            $.queue(this, "fx", function() {
                var that = $(this),
                    originalStyleAttr = that.attr("style") || " ",
                    originalStyle = filterStyles(getElementStyles.call(this)),
                    newStyle, className = that.attr("className");
                $.each(classAnimationActions, function(i, action) {
                    if (value[action]) {
                        that[action + "Class"](value[action]);
                    }
                });
                newStyle = filterStyles(getElementStyles.call(this));
                that.attr("className", className);
                that.animate(styleDifference(originalStyle, newStyle), duration, easing, function() {
                    $.each(classAnimationActions, function(i, action) {
                        if (value[action]) {
                            that[action + "Class"](value[action]);
                        }
                    });
                    if (typeof that.attr("style") == "object") {
                        that.attr("style").cssText = "";
                        that.attr("style").cssText = originalStyleAttr;
                    } else {
                        that.attr("style", originalStyleAttr);
                    }
                    if (callback) {
                        callback.apply(this, arguments);
                    }
                });
                var queue = $.queue(this),
                    anim = queue.splice(queue.length - 1, 1)[0];
                queue.splice(1, 0, anim);
                $.dequeue(this);
            });
        });
    };
    $.fn.extend({
        _addClass: $.fn.addClass,
        addClass: function(classNames, speed, easing, callback) {
            return speed ? $.effects.animateClass.apply(this, [{
                add: classNames
            }, speed, easing, callback]) : this._addClass(classNames);
        },
        _removeClass: $.fn.removeClass,
        removeClass: function(classNames, speed, easing, callback) {
            return speed ? $.effects.animateClass.apply(this, [{
                remove: classNames
            }, speed, easing, callback]) : this._removeClass(classNames);
        },
        _toggleClass: $.fn.toggleClass,
        toggleClass: function(classNames, force, speed, easing, callback) {
            if (typeof force == "boolean" || force === undefined) {
                if (!speed) {
                    return this._toggleClass(classNames, force);
                } else {
                    return $.effects.animateClass.apply(this, [(force ? {
                        add: classNames
                    } : {
                        remove: classNames
                    }), speed, easing, callback]);
                }
            } else {
                return $.effects.animateClass.apply(this, [{
                    toggle: classNames
                }, force, speed, easing]);
            }
        },
        switchClass: function(remove, add, speed, easing, callback) {
            return $.effects.animateClass.apply(this, [{
                add: add,
                remove: remove
            }, speed, easing, callback]);
        }
    });
    $.extend($.effects, {
        version: "1.8.7",
        save: function(element, set) {
            for (var i = 0; i < set.length; i++) {
                if (set[i] !== null) {
                    element.data("ec.storage." + set[i], element[0].style[set[i]]);
                }
            }
        },
        restore: function(element, set) {
            for (var i = 0; i < set.length; i++) {
                if (set[i] !== null) {
                    element.css(set[i], element.data("ec.storage." + set[i]));
                }
            }
        },
        setMode: function(el, mode) {
            if (mode == "toggle") {
                mode = el.is(":hidden") ? "show" : "hide";
            }
            return mode;
        },
        getBaseline: function(origin, original) {
            var y, x;
            switch (origin[0]) {
                case "top":
                    y = 0;
                    break;
                case "middle":
                    y = 0.5;
                    break;
                case "bottom":
                    y = 1;
                    break;
                default:
                    y = origin[0] / original.height;
            }
            switch (origin[1]) {
                case "left":
                    x = 0;
                    break;
                case "center":
                    x = 0.5;
                    break;
                case "right":
                    x = 1;
                    break;
                default:
                    x = origin[1] / original.width;
            }
            return {
                x: x,
                y: y
            };
        },
        createWrapper: function(element) {
            if (element.parent().is(".ui-effects-wrapper")) {
                return element.parent();
            }
            var props = {
                    width: element.outerWidth(true),
                    height: element.outerHeight(true),
                    "float": element.css("float")
                },
                wrapper = $("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                });
            element.wrap(wrapper);
            wrapper = element.parent();
            if (element.css("position") == "static") {
                wrapper.css({
                    position: "relative"
                });
                element.css({
                    position: "relative"
                });
            } else {
                $.extend(props, {
                    position: element.css("position"),
                    zIndex: element.css("z-index")
                });
                $.each(["top", "left", "bottom", "right"], function(i, pos) {
                    props[pos] = element.css(pos);
                    if (isNaN(parseInt(props[pos], 10))) {
                        props[pos] = "auto";
                    }
                });
                element.css({
                    position: "relative",
                    top: 0,
                    left: 0
                });
            }
            return wrapper.css(props).show();
        },
        removeWrapper: function(element) {
            if (element.parent().is(".ui-effects-wrapper")) {
                return element.parent().replaceWith(element);
            }
            return element;
        },
        setTransition: function(element, list, factor, value) {
            value = value || {};
            $.each(list, function(i, x) {
                unit = element.cssUnit(x);
                if (unit[0] > 0) {
                    value[x] = unit[0] * factor + unit[1];
                }
            });
            return value;
        }
    });

    function _normalizeArguments(effect, options, speed, callback) {
        if (typeof effect == "object") {
            callback = options;
            speed = null;
            options = effect;
            effect = options.effect;
        }
        if ($.isFunction(options)) {
            callback = options;
            speed = null;
            options = {};
        }
        if (typeof options == "number" || $.fx.speeds[options]) {
            callback = speed;
            speed = options;
            options = {};
        }
        if ($.isFunction(speed)) {
            callback = speed;
            speed = null;
        }
        options = options || {};
        speed = speed || options.duration;
        speed = $.fx.off ? 0 : typeof speed == "number" ? speed : speed in $.fx.speeds ? $.fx.speeds[speed] : $.fx.speeds._default;
        callback = callback || options.complete;
        return [effect, options, speed, callback];
    }

    function standardSpeed(speed) {
        if (!speed || typeof speed === "number" || $.fx.speeds[speed]) {
            return true;
        }
        if (typeof speed === "string" && !$.effects[speed]) {
            return true;
        }
        return false;
    }

    $.fn.extend({
        effect: function(effect, options, speed, callback) {
            var args = _normalizeArguments.apply(this, arguments),
                args2 = {
                    options: args[1],
                    duration: args[2],
                    callback: args[3]
                },
                mode = args2.options.mode,
                effectMethod = $.effects[effect];
            if ($.fx.off || !effectMethod) {
                if (mode) {
                    return this[mode](args2.duration, args2.callback);
                } else {
                    return this.each(function() {
                        if (args2.callback) {
                            args2.callback.call(this);
                        }
                    });
                }
            }
            return effectMethod.call(this, args2);
        },
        _show: $.fn.show,
        show: function(speed) {
            if (standardSpeed(speed)) {
                return this._show.apply(this, arguments);
            } else {
                var args = _normalizeArguments.apply(this, arguments);
                args[1].mode = "show";
                return this.effect.apply(this, args);
            }
        },
        _hide: $.fn.hide,
        hide: function(speed) {
            if (standardSpeed(speed)) {
                return this._hide.apply(this, arguments);
            } else {
                var args = _normalizeArguments.apply(this, arguments);
                args[1].mode = "hide";
                return this.effect.apply(this, args);
            }
        },
        __toggle: $.fn.toggle,
        toggle: function(speed) {
            if (standardSpeed(speed) || typeof speed === "boolean" || $.isFunction(speed)) {
                return this.__toggle.apply(this, arguments);
            } else {
                var args = _normalizeArguments.apply(this, arguments);
                args[1].mode = "toggle";
                return this.effect.apply(this, args);
            }
        },
        cssUnit: function(key) {
            var style = this.css(key),
                val = [];
            $.each(["em", "px", "%", "pt"], function(i, unit) {
                if (style.indexOf(unit) > 0) {
                    val = [parseFloat(style), unit];
                }
            });
            return val;
        }
    });
    $.easing.jswing = $.easing.swing;
    $.extend($.easing, {
        def: "easeOutQuad",
        swing: function(x, t, b, c, d) {
            return $.easing[$.easing.def](x, t, b, c, d);
        },
        easeInQuad: function(x, t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOutQuad: function(x, t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOutQuad: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t + b;
            }
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        easeInCubic: function(x, t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOutCubic: function(x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOutCubic: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t + b;
            }
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        easeInQuart: function(x, t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOutQuart: function(x, t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOutQuart: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t + b;
            }
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        easeInQuint: function(x, t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOutQuint: function(x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOutQuint: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t * t + b;
            }
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },
        easeInSine: function(x, t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOutSine: function(x, t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOutSine: function(x, t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        easeInExpo: function(x, t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOutExpo: function(x, t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOutExpo: function(x, t, b, c, d) {
            if (t == 0) {
                return b;
            }
            if (t == d) {
                return b + c;
            }
            if ((t /= d / 2) < 1) {
                return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            }
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function(x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOutCirc: function(x, t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOutCirc: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            }
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        easeInElastic: function(x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) {
                return b;
            }
            if ((t /= d) == 1) {
                return b + c;
            }
            if (!p) {
                p = d * 0.3;
            }
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else {
                var s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOutElastic: function(x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) {
                return b;
            }
            if ((t /= d) == 1) {
                return b + c;
            }
            if (!p) {
                p = d * 0.3;
            }
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else {
                var s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        easeInOutElastic: function(x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) {
                return b;
            }
            if ((t /= d / 2) == 2) {
                return b + c;
            }
            if (!p) {
                p = d * (0.3 * 1.5);
            }
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else {
                var s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            if (t < 1) {
                return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            }
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
        },
        easeInBack: function(x, t, b, c, d, s) {
            if (s == undefined) {
                s = 1.70158;
            }
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOutBack: function(x, t, b, c, d, s) {
            if (s == undefined) {
                s = 1.70158;
            }
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOutBack: function(x, t, b, c, d, s) {
            if (s == undefined) {
                s = 1.70158;
            }
            if ((t /= d / 2) < 1) {
                return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            }
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        easeInBounce: function(x, t, b, c, d) {
            return c - $.easing.easeOutBounce(x, d - t, 0, c, d) + b;
        },
        easeOutBounce: function(x, t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else {
                if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
                } else {
                    if (t < (2.5 / 2.75)) {
                        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
                    } else {
                        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
                    }
                }
            }
        },
        easeInOutBounce: function(x, t, b, c, d) {
            if (t < d / 2) {
                return $.easing.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;
            }
            return $.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
        }
    });
})(jQuery);
(function($, undefined) {
    $.effects.highlight = function(o) {
        return this.queue(function() {
            var elem = $(this),
                props = ["backgroundImage", "backgroundColor", "opacity"],
                mode = $.effects.setMode(elem, o.options.mode || "show"),
                animation = {
                    backgroundColor: elem.css("backgroundColor")
                };
            if (mode == "hide") {
                animation.opacity = 0;
            }
            $.effects.save(elem, props);
            elem.show().css({
                backgroundImage: "none",
                backgroundColor: o.options.color || "#ffff99"
            }).animate(animation, {
                queue: false,
                duration: o.duration,
                easing: o.options.easing,
                complete: function() {
                    (mode == "hide" && elem.hide());
                    $.effects.restore(elem, props);
                    (mode == "show" && !$.support.opacity && this.style.removeAttribute("filter"));
                    (o.callback && o.callback.apply(this, arguments));
                    elem.dequeue();
                }
            });
        });
    };
})(jQuery);
(function($) {
    var $scrollTo = $.scrollTo = function(target, duration, settings) {
        $(window).scrollTo(target, duration, settings);
    };
    $scrollTo.defaults = {
        axis: "xy",
        duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1
    };
    $scrollTo.window = function(scope) {
        return $(window)._scrollable();
    };
    $.fn._scrollable = function() {
        return this.map(function() {
            var elem = this,
                isWin = !elem.nodeName || $.inArray(elem.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
            if (!isWin) {
                return elem;
            }
            var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
            return $.browser.safari || doc.compatMode == "BackCompat" ? doc.body : doc.documentElement;
        });
    };
    $.fn.scrollTo = function(target, duration, settings) {
        if (typeof duration == "object") {
            settings = duration;
            duration = 0;
        }
        if (typeof settings == "function") {
            settings = {
                onAfter: settings
            };
        }
        if (target == "max") {
            target = 9000000000;
        }
        settings = $.extend({}, $scrollTo.defaults, settings);
        duration = duration || settings.speed || settings.duration;
        settings.queue = settings.queue && settings.axis.length > 1;
        if (settings.queue) {
            duration /= 2;
        }
        settings.offset = both(settings.offset);
        settings.over = both(settings.over);
        return this._scrollable().each(function() {
            var elem = this,
                $elem = $(elem),
                targ = target,
                toff, attr = {},
                win = $elem.is("html,body");
            switch (typeof targ) {
                case "number":
                case "string":
                    if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
                        targ = both(targ);
                        break;
                    }
                    targ = $(targ, this);
                case "object":
                    if (targ.is || targ.style) {
                        toff = (targ = $(targ)).offset();
                    }
            }
            $.each(settings.axis.split(""), function(i, axis) {
                var Pos = axis == "x" ? "Left" : "Top",
                    pos = Pos.toLowerCase(),
                    key = "scroll" + Pos,
                    old = elem[key],
                    max = $scrollTo.max(elem, axis);
                if (toff) {
                    attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);
                    if (settings.margin) {
                        attr[key] -= parseInt(targ.css("margin" + Pos)) || 0;
                        attr[key] -= parseInt(targ.css("border" + Pos + "Width")) || 0;
                    }
                    attr[key] += settings.offset[pos] || 0;
                    if (settings.over[pos]) {
                        attr[key] += targ[axis == "x" ? "width" : "height"]() * settings.over[pos];
                    }
                } else {
                    var val = targ[pos];
                    attr[key] = val.slice && val.slice(-1) == "%" ? parseFloat(val) / 100 * max : val;
                }
                if (/^\d+$/.test(attr[key])) {
                    attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
                }
                if (!i && settings.queue) {
                    if (old != attr[key]) {
                        animate(settings.onAfterFirst);
                    }
                    delete attr[key];
                }
            });
            animate(settings.onAfter);

            function animate(callback) {
                $elem.animate(attr, duration, settings.easing, callback && function() {
                    callback.call(this, target, settings);
                });
            }
        }).end();
    };
    $scrollTo.max = function(elem, axis) {
        var Dim = axis == "x" ? "Width" : "Height",
            scroll = "scroll" + Dim;
        if (!$(elem).is("html,body")) {
            return elem[scroll] - $(elem)[Dim.toLowerCase()]();
        }
        var size = "client" + Dim,
            html = elem.ownerDocument.documentElement,
            body = elem.ownerDocument.body;
        return Math.max(html[scroll], body[scroll]) - Math.min(html[size], body[size]);
    };

    function both(val) {
        return typeof val == "object" ? val : {
            top: val,
            left: val
        };
    }
})(jQuery);
jQuery.cookie = function(name, value, options) {
    if (typeof value != "undefined") {
        options = options || {};
        if (value === null) {
            value = "";
            options = $.extend({}, options);
            options.expires = -1;
        }
        var expires = "";
        if (options.expires && (typeof options.expires == "number" || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == "number") {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = "; expires=" + date.toUTCString();
        }
        var path = options.path ? "; path=" + (options.path) : "";
        var domain = options.domain ? "; domain=" + (options.domain) : "";
        var secure = options.secure ? "; secure" : "";
        document.cookie = [name, "=", encodeURIComponent(value), expires, path, domain, secure].join("");
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != "") {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
(function($) {
    $.fn.media = function(options, f1, f2) {
        return this.each(function() {
            if (typeof options == "function") {
                f2 = f1;
                f1 = options;
                options = {};
            }
            var o = getSettings(this, options);
            if (typeof f1 == "function") {
                f1(this, o);
            }
            var r = getTypesRegExp();
            var m = r.exec(o.src.toLowerCase()) || [""];
            o.type ? m[0] = o.type : m.shift();
            for (var i = 0; i < m.length; i++) {
                fn = m[i].toLowerCase();
                if (isDigit(fn[0])) {
                    fn = "fn" + fn;
                }
                if (!$.fn.media[fn]) {
                    continue;
                }
                var player = $.fn.media[fn + "_player"];
                if (!o.params) {
                    o.params = {};
                }
                if (player) {
                    var num = player.autoplayAttr == "autostart";
                    o.params[player.autoplayAttr || "autoplay"] = num ? (o.autoplay ? 1 : 0) : o.autoplay ? true : false;
                }
                var $div = $.fn.media[fn](this, o);
                $div.css("backgroundColor", o.bgColor).width(o.width);
                if (typeof f2 == "function") {
                    f2(this, $div[0], o, player.name);
                }
                break;
            }
        });
    };
    $.fn.media.mapFormat = function(format, player) {
        if (!format || !player || !$.fn.media.defaults.players[player]) {
            return;
        }
        format = format.toLowerCase();
        if (isDigit(format[0])) {
            format = "fn" + format;
        }
        $.fn.media[format] = $.fn.media[player];
        $.fn.media[format + "_player"] = $.fn.media.defaults.players[player];
    };
    $.fn.media.defaults = {
        width: 400,
        height: 400,
        autoplay: 0,
        bgColor: "#ffffff",
        params: {
            wmode: "transparent"
        },
        attrs: {},
        flvKeyName: "file",
        flashvars: {},
        flashVersion: "7",
        expressInstaller: null,
        flvPlayer: "mediaplayer.swf",
        mp3Player: "mediaplayer.swf",
        silverlight: {
            inplaceInstallPrompt: "true",
            isWindowless: "true",
            framerate: "24",
            version: "0.9",
            onError: null,
            onLoad: null,
            initParams: null,
            userContext: null
        }
    };
    $.fn.media.defaults.players = {
        flash: {
            name: "flash",
            types: "flv,mp3,swf",
            oAttrs: {
                classid: "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",
                type: "application/x-oleobject",
                codebase: "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=" + $.fn.media.defaults.flashVersion
            },
            eAttrs: {
                type: "application/x-shockwave-flash",
                pluginspage: "http://www.adobe.com/go/getflashplayer"
            }
        },
        iframe: {
            name: "iframe",
            types: "html,pdf"
        },
        silverlight: {
            name: "silverlight",
            types: "xaml"
        }
    };

    function isFirefoxWMPPluginInstalled() {
        var plugs = navigator.plugins;
        for (i = 0; i < plugs.length; i++) {
            var plugin = plugs[i];
            if (plugin["filename"] == "np-mswmp.dll") {
                return true;
            }
        }
        return false;
    }

    var counter = 1;
    for (var player in $.fn.media.defaults.players) {
        var types = $.fn.media.defaults.players[player].types;
        $.each(types.split(","), function(i, o) {
            if (isDigit(o[0])) {
                o = "fn" + o;
            }
            $.fn.media[o] = $.fn.media[player] = getGenerator(player);
            $.fn.media[o + "_player"] = $.fn.media.defaults.players[player];
        });
    }

    function getTypesRegExp() {
        var types = "";
        for (var player in $.fn.media.defaults.players) {
            if (types.length) {
                types += ",";
            }
            types += $.fn.media.defaults.players[player].types;
        }
        return new RegExp("\\.(" + types.replace(/,/ig, "|") + ")\\b");
    }

    function getGenerator(player) {
        return function(el, options) {
            return generate(el, options, player);
        };
    }

    function isDigit(c) {
        return "0123456789".indexOf(c) > -1;
    }

    function getSettings(el, options) {
        options = options || {};
        var $el = $(el);
        var cls = el.className || "";
        var meta = $.metadata ? $el.metadata() : $.meta ? $el.data() : {};
        meta = meta || {};
        var w = meta.width || parseInt(((cls.match(/w:(\d+)/) || [])[1] || 0));
        var h = meta.height || parseInt(((cls.match(/h:(\d+)/) || [])[1] || 0));
        if (w) {
            meta.width = w;
        }
        if (h) {
            meta.height = h;
        }
        if (cls) {
            meta.cls = cls;
        }
        var a = $.fn.media.defaults;
        var b = options;
        var c = meta;
        var p = {
            params: {
                bgColor: options.bgColor || $.fn.media.defaults.bgColor
            }
        };
        var opts = $.extend({}, a, b, c);
        $.each(["attrs", "params", "flashvars", "silverlight"], function(i, o) {
            opts[o] = $.extend({}, p[o] || {}, a[o] || {}, b[o] || {}, c[o] || {});
        });
        if (typeof opts.caption == "undefined") {
            opts.caption = $el.text();
        }
        opts.src = opts.src || $el.attr("href") || $el.attr("src") || "unknown";
        return opts;
    }

    $.fn.media.swf = function(el, opts) {
        if (!window.SWFObject && !window.swfobject) {
            if (opts.flashvars) {
                var a = [];
                for (var f in opts.flashvars) {
                    a.push(f + "=" + opts.flashvars[f]);
                }
                if (!opts.params) {
                    opts.params = {};
                }
                opts.params.flashvars = a.join("&");
            }
            return generate(el, opts, "flash");
        }
        var id = el.id ? (' id="' + el.id + '"') : "";
        var cls = opts.cls ? (' class="' + opts.cls + '"') : "";
        var $div = $("<div" + id + cls + ">");
        if (window.swfobject) {
            $(el).after($div).appendTo($div);
            if (!el.id) {
                el.id = "movie_player_" + counter++;
            }
            swfobject.embedSWF(opts.src, el.id, opts.width, opts.height, opts.flashVersion, opts.expressInstaller, opts.flashvars, opts.params, opts.attrs);
        } else {
            $(el).after($div).remove();
            var so = new SWFObject(opts.src, "movie_player_" + counter++, opts.width, opts.height, opts.flashVersion, opts.bgColor);
            if (opts.expressInstaller) {
                so.useExpressInstall(opts.expressInstaller);
            }
            for (var p in opts.params) {
                if (p != "bgColor") {
                    so.addParam(p, opts.params[p]);
                }
            }
            for (var f in opts.flashvars) {
                so.addVariable(f, opts.flashvars[f]);
            }
            so.write($div[0]);
        }
        if (opts.caption) {
            $("<div>").appendTo($div).html(opts.caption);
        }
        return $div;
    };
    var BrowserDetect = {
        init: function() {
            this.browser = this.searchString(this.dataBrowser) || "Other";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
        },
        searchString: function(data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;
                if (dataString.indexOf(data[i].subString) != -1) {
                    return data[i].identity;
                }
            }
        },
        searchVersion: function(dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1) {
                return;
            }
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        },
        dataBrowser: [{
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        }, {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer"
        }, {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        }, {
            string: navigator.userAgent,
            subString: "Safari",
            identity: "Safari"
        }, {
            string: navigator.userAgent,
            subString: "Opera",
            identity: "Opera"
        }]
    };
    BrowserDetect.init();

    function generate(el, opts, player) {
        var $el = $(el);
        var o = $.fn.media.defaults.players[player];
        if (player == "iframe") {
            var o = $("<iframe" + ' width="' + opts.width + '" height="' + opts.height + '" >');
            o.attr("src", opts.src);
            o.css("backgroundColor", o.bgColor);
        } else {
            if (BrowserDetect.browser == "Explorer") {
                var a = ['<object id="' + opts.id + '" name="' + opts.id + '" width="' + opts.width + '" height="' + opts.height + '" '];
                for (var key in opts.attrs) {
                    a.push(key + '="' + opts.attrs[key] + '" ');
                }
                for (var key in o.oAttrs || {}) {
                    var v = o.oAttrs[key];
                    if (key == "codebase" && window.location.protocol == "https:") {
                        v = v.replace("http", "https");
                    }
                    a.push(key + '="' + v + '" ');
                }
                a.push("></ob" + "ject" + ">");
                var p = ['<param name="' + (o.oUrl || "src") + '" value="' + opts.src + '">'];
                for (var key in opts.params) {
                    p.push('<param name="' + key + '" value="' + opts.params[key] + '">');
                }
                var o = document.createElement(a.join(""));
                for (var i = 0; i < p.length; i++) {
                    o.appendChild(document.createElement(p[i]));
                }
            } else {
                var a = ['<embed id="' + opts.id + '" name="' + opts.id + '" width="' + opts.width + '" height="' + opts.height + '" style="display:block"'];
                if (opts.src) {
                    a.push(' src="' + opts.src + '" ');
                }
                for (var key in opts.attrs) {
                    a.push(key + '="' + opts.attrs[key] + '" ');
                }
                for (var key in o.eAttrs || {}) {
                    a.push(key + '="' + o.eAttrs[key] + '" ');
                }
                for (var key in opts.params) {
                    if (key == "wmode" && player != "flash") {
                        continue;
                    }
                    a.push(key + '="' + opts.params[key] + '" ');
                }
                a.push("></em" + "bed" + ">");
            }
        }
        var id = el.id ? (' id="' + el.id + '"') : "";
        var cls = opts.cls ? (' class="' + opts.cls + '"') : "";
        var $div = $("<div" + id + cls + ">");
        $el.after($div).remove();
        (BrowserDetect.browser == "Explorer" || player == "iframe") ? $div.append(o): $div.html(a.join(""));
        if (opts.caption) {
            $("<div>").appendTo($div).html(opts.caption);
        }
        return $div;
    }
})(jQuery);
/*
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.94 (20-DEC-2010)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.2.6 or later
 */
(function($) {
    var ver = "2.94";
    if ($.support == undefined) {
        $.support = {
            opacity: !($.browser.msie)
        };
    }

    function debug(s) {
        if ($.fn.cycle.debug) {
            log(s);
        }
    }

    function log() {
        if (window.console && window.console.log) {
            window.console.log("[cycle] " + Array.prototype.join.call(arguments, " "));
        }
    }

    $.fn.cycle = function(options, arg2) {
        var o = {
            s: this.selector,
            c: this.context
        };
        if (this.length === 0 && options != "stop") {
            if (!$.isReady && o.s) {
                log("DOM not ready, queuing slideshow");
                $(function() {
                    $(o.s, o.c).cycle(options, arg2);
                });
                return this;
            }
            log("terminating; zero elements found by selector" + ($.isReady ? "" : " (DOM not ready)"));
            return this;
        }
        return this.each(function() {
            var opts = handleArguments(this, options, arg2);
            if (opts === false) {
                return;
            }
            opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;
            if (this.cycleTimeout) {
                clearTimeout(this.cycleTimeout);
            }
            this.cycleTimeout = this.cyclePause = 0;
            var $cont = $(this);
            var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
            var els = $slides.get();
            if (els.length < 2) {
                log("terminating; too few slides: " + els.length);
                return;
            }
            var opts2 = buildOptions($cont, $slides, els, opts, o);
            if (opts2 === false) {
                return;
            }
            var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.backwards);
            if (startTime) {
                startTime += (opts2.delay || 0);
                if (startTime < 10) {
                    startTime = 10;
                }
                debug("first timeout: " + startTime);
                this.cycleTimeout = setTimeout(function() {
                    go(els, opts2, 0, !opts.backwards);
                }, startTime);
            }
        });
    };

    function handleArguments(cont, options, arg2) {
        if (cont.cycleStop == undefined) {
            cont.cycleStop = 0;
        }
        if (options === undefined || options === null) {
            options = {};
        }
        if (options.constructor == String) {
            switch (options) {
                case "destroy":
                case "stop":
                    var opts = $(cont).data("cycle.opts");
                    if (!opts) {
                        return false;
                    }
                    cont.cycleStop++;
                    if (cont.cycleTimeout) {
                        clearTimeout(cont.cycleTimeout);
                    }
                    cont.cycleTimeout = 0;
                    $(cont).removeData("cycle.opts");
                    if (options == "destroy") {
                        destroy(opts);
                    }
                    return false;
                case "toggle":
                    cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
                    checkInstantResume(cont.cyclePause, arg2, cont);
                    return false;
                case "pause":
                    cont.cyclePause = 1;
                    return false;
                case "resume":
                    cont.cyclePause = 0;
                    checkInstantResume(false, arg2, cont);
                    return false;
                case "prev":
                case "next":
                    var opts = $(cont).data("cycle.opts");
                    if (!opts) {
                        log('options not found, "prev/next" ignored');
                        return false;
                    }
                    $.fn.cycle[options](opts);
                    return false;
                default:
                    options = {
                        fx: options
                    };
            }
            return options;
        } else {
            if (options.constructor == Number) {
                var num = options;
                options = $(cont).data("cycle.opts");
                if (!options) {
                    log("options not found, can not advance slide");
                    return false;
                }
                if (num < 0 || num >= options.elements.length) {
                    log("invalid slide index: " + num);
                    return false;
                }
                options.nextSlide = num;
                if (cont.cycleTimeout) {
                    clearTimeout(cont.cycleTimeout);
                    cont.cycleTimeout = 0;
                }
                if (typeof arg2 == "string") {
                    options.oneTimeFx = arg2;
                }
                go(options.elements, options, 1, num >= options.currSlide);
                return false;
            }
        }
        return options;

        function checkInstantResume(isPaused, arg2, cont) {
            if (!isPaused && arg2 === true) {
                var options = $(cont).data("cycle.opts");
                if (!options) {
                    log("options not found, can not resume");
                    return false;
                }
                if (cont.cycleTimeout) {
                    clearTimeout(cont.cycleTimeout);
                    cont.cycleTimeout = 0;
                }
                go(options.elements, options, 1, !options.backwards);
            }
        }
    }

    function removeFilter(el, opts) {
        if (!$.support.opacity && opts.cleartype && el.style.filter) {
            try {
                el.style.removeAttribute("filter");
            } catch (smother) {}
        }
    }

    function destroy(opts) {
        if (opts.next) {
            $(opts.next).unbind(opts.prevNextEvent);
        }
        if (opts.prev) {
            $(opts.prev).unbind(opts.prevNextEvent);
        }
        if (opts.pager || opts.pagerAnchorBuilder) {
            $.each(opts.pagerAnchors || [], function() {
                this.unbind().remove();
            });
        }
        opts.pagerAnchors = null;
        if (opts.destroy) {
            opts.destroy(opts);
        }
    }

    function buildOptions($cont, $slides, els, options, o) {
        var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
        if (opts.autostop) {
            opts.countdown = opts.autostopCount || els.length;
        }
        var cont = $cont[0];
        $cont.data("cycle.opts", opts);
        opts.$cont = $cont;
        opts.stopCount = cont.cycleStop;
        opts.elements = els;
        opts.before = opts.before ? [opts.before] : [];
        opts.after = opts.after ? [opts.after] : [];
        opts.after.unshift(function() {
            opts.busy = 0;
        });
        if (!$.support.opacity && opts.cleartype) {
            opts.after.push(function() {
                removeFilter(this, opts);
            });
        }
        if (opts.continuous) {
            opts.after.push(function() {
                go(els, opts, 0, !opts.backwards);
            });
        }
        saveOriginalOpts(opts);
        if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg) {
            clearTypeFix($slides);
        }
        if ($cont.css("position") == "static") {
            $cont.css("position", "relative");
        }
        if (opts.width) {
            $cont.width(opts.width);
        }
        if (opts.height && opts.height != "auto") {
            $cont.height(opts.height);
        }
        if (opts.startingSlide) {
            opts.startingSlide = parseInt(opts.startingSlide);
        } else {
            if (opts.backwards) {
                opts.startingSlide = els.length - 1;
            }
        }
        if (opts.random) {
            opts.randomMap = [];
            for (var i = 0; i < els.length; i++) {
                opts.randomMap.push(i);
            }
            opts.randomMap.sort(function(a, b) {
                return Math.random() - 0.5;
            });
            opts.randomIndex = 1;
            opts.startingSlide = opts.randomMap[1];
        } else {
            if (opts.startingSlide >= els.length) {
                opts.startingSlide = 0;
            }
        }
        opts.currSlide = opts.startingSlide || 0;
        var first = opts.startingSlide;
        $slides.css({
            position: "absolute",
            top: 0,
            left: 0
        }).hide().each(function(i) {
            var z;
            if (opts.backwards) {
                z = first ? i <= first ? els.length + (i - first) : first - i : els.length - i;
            } else {
                z = first ? i >= first ? els.length - (i - first) : first - i : els.length - i;
            }
            $(this).css("z-index", z);
        });
        $(els[first]).css("opacity", 1).show();
        removeFilter(els[first], opts);
        if (opts.fit && opts.width) {
            $slides.width(opts.width);
        }
        if (opts.fit && opts.height && opts.height != "auto") {
            $slides.height(opts.height);
        }
        var reshape = opts.containerResize && !$cont.innerHeight();
        if (reshape) {
            var maxw = 0,
                maxh = 0;
            for (var j = 0; j < els.length; j++) {
                var $e = $(els[j]),
                    e = $e[0],
                    w = $e.outerWidth(),
                    h = $e.outerHeight();
                if (!w) {
                    w = e.offsetWidth || e.width || $e.attr("width");
                }
                if (!h) {
                    h = e.offsetHeight || e.height || $e.attr("height");
                }
                maxw = w > maxw ? w : maxw;
                maxh = h > maxh ? h : maxh;
            }
            if (maxw > 0 && maxh > 0) {
                $cont.css({
                    width: maxw + "px",
                    height: maxh + "px"
                });
            }
        }
        if (opts.pause) {
            $cont.hover(function() {
                this.cyclePause++;
            }, function() {
                this.cyclePause--;
            });
        }
        if (supportMultiTransitions(opts) === false) {
            return false;
        }
        var requeue = false;
        options.requeueAttempts = options.requeueAttempts || 0;
        $slides.each(function() {
            var $el = $(this);
            this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr("height") || 0);
            this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr("width") || 0);
            if ($el.is("img")) {
                var loadingIE = ($.browser.msie && this.cycleW == 28 && this.cycleH == 30 && !this.complete);
                var loadingFF = ($.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete);
                var loadingOp = ($.browser.opera && ((this.cycleW == 42 && this.cycleH == 19) || (this.cycleW == 37 && this.cycleH == 17)) && !this.complete);
                var loadingOther = (this.cycleH == 0 && this.cycleW == 0 && !this.complete);
                if (loadingIE || loadingFF || loadingOp || loadingOther) {
                    if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) {
                        log(options.requeueAttempts, " - img slide not loaded, requeuing slideshow: ", this.src, this.cycleW, this.cycleH);
                        setTimeout(function() {
                            $(o.s, o.c).cycle(options);
                        }, opts.requeueTimeout);
                        requeue = true;
                        return false;
                    } else {
                        log("could not determine size of image: " + this.src, this.cycleW, this.cycleH);
                    }
                }
            }
            return true;
        });
        if (requeue) {
            return false;
        }
        opts.cssBefore = opts.cssBefore || {};
        opts.animIn = opts.animIn || {};
        opts.animOut = opts.animOut || {};
        $slides.not(":eq(" + first + ")").css(opts.cssBefore);
        if (opts.cssFirst) {
            $($slides[first]).css(opts.cssFirst);
        }
        if (opts.timeout) {
            opts.timeout = parseInt(opts.timeout);
            if (opts.speed.constructor == String) {
                opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed);
            }
            if (!opts.sync) {
                opts.speed = opts.speed / 2;
            }
            var buffer = opts.fx == "shuffle" ? 500 : 250;
            while ((opts.timeout - opts.speed) < buffer) {
                opts.timeout += opts.speed;
            }
        }
        if (opts.easing) {
            opts.easeIn = opts.easeOut = opts.easing;
        }
        if (!opts.speedIn) {
            opts.speedIn = opts.speed;
        }
        if (!opts.speedOut) {
            opts.speedOut = opts.speed;
        }
        opts.slideCount = els.length;
        opts.currSlide = opts.lastSlide = first;
        if (opts.random) {
            if (++opts.randomIndex == els.length) {
                opts.randomIndex = 0;
            }
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        } else {
            if (opts.backwards) {
                opts.nextSlide = opts.startingSlide == 0 ? (els.length - 1) : opts.startingSlide - 1;
            } else {
                opts.nextSlide = opts.startingSlide >= (els.length - 1) ? 0 : opts.startingSlide + 1;
            }
        }
        if (!opts.multiFx) {
            var init = $.fn.cycle.transitions[opts.fx];
            if ($.isFunction(init)) {
                init($cont, $slides, opts);
            } else {
                if (opts.fx != "custom" && !opts.multiFx) {
                    log("unknown transition: " + opts.fx, "; slideshow terminating");
                    return false;
                }
            }
        }
        var e0 = $slides[first];
        if (opts.before.length) {
            opts.before[0].apply(e0, [e0, e0, opts, true]);
        }
        if (opts.after.length > 1) {
            opts.after[1].apply(e0, [e0, e0, opts, true]);
        }
        if (opts.next) {
            $(opts.next).bind(opts.prevNextEvent, function() {
                return advance(opts, 1);
            });
        }
        if (opts.prev) {
            $(opts.prev).bind(opts.prevNextEvent, function() {
                return advance(opts, 0);
            });
        }
        if (opts.pager || opts.pagerAnchorBuilder) {
            buildPager(els, opts);
        }
        exposeAddSlide(opts, els);
        return opts;
    }

    function saveOriginalOpts(opts) {
        opts.original = {
            before: [],
            after: []
        };
        opts.original.cssBefore = $.extend({}, opts.cssBefore);
        opts.original.cssAfter = $.extend({}, opts.cssAfter);
        opts.original.animIn = $.extend({}, opts.animIn);
        opts.original.animOut = $.extend({}, opts.animOut);
        $.each(opts.before, function() {
            opts.original.before.push(this);
        });
        $.each(opts.after, function() {
            opts.original.after.push(this);
        });
    }

    function supportMultiTransitions(opts) {
        var i, tx, txs = $.fn.cycle.transitions;
        if (opts.fx.indexOf(",") > 0) {
            opts.multiFx = true;
            opts.fxs = opts.fx.replace(/\s*/g, "").split(",");
            for (i = 0; i < opts.fxs.length; i++) {
                var fx = opts.fxs[i];
                tx = txs[fx];
                if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
                    log("discarding unknown transition: ", fx);
                    opts.fxs.splice(i, 1);
                    i--;
                }
            }
            if (!opts.fxs.length) {
                log("No valid transitions named; slideshow terminating.");
                return false;
            }
        } else {
            if (opts.fx == "all") {
                opts.multiFx = true;
                opts.fxs = [];
                for (p in txs) {
                    tx = txs[p];
                    if (txs.hasOwnProperty(p) && $.isFunction(tx)) {
                        opts.fxs.push(p);
                    }
                }
            }
        }
        if (opts.multiFx && opts.randomizeEffects) {
            var r1 = Math.floor(Math.random() * 20) + 30;
            for (i = 0; i < r1; i++) {
                var r2 = Math.floor(Math.random() * opts.fxs.length);
                opts.fxs.push(opts.fxs.splice(r2, 1)[0]);
            }
            debug("randomized fx sequence: ", opts.fxs);
        }
        return true;
    }

    function exposeAddSlide(opts, els) {
        opts.addSlide = function(newSlide, prepend) {
            var $s = $(newSlide),
                s = $s[0];
            if (!opts.autostopCount) {
                opts.countdown++;
            }
            els[prepend ? "unshift" : "push"](s);
            if (opts.els) {
                opts.els[prepend ? "unshift" : "push"](s);
            }
            opts.slideCount = els.length;
            $s.css("position", "absolute");
            $s[prepend ? "prependTo" : "appendTo"](opts.$cont);
            if (prepend) {
                opts.currSlide++;
                opts.nextSlide++;
            }
            if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg) {
                clearTypeFix($s);
            }
            if (opts.fit && opts.width) {
                $s.width(opts.width);
            }
            if (opts.fit && opts.height && opts.height != "auto") {
                $s.height(opts.height);
            }
            s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
            s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();
            $s.css(opts.cssBefore);
            if (opts.pager || opts.pagerAnchorBuilder) {
                $.fn.cycle.createPagerAnchor(els.length - 1, s, $(opts.pager), els, opts);
            }
            if ($.isFunction(opts.onAddSlide)) {
                opts.onAddSlide($s);
            } else {
                $s.hide();
            }
        };
    }

    $.fn.cycle.resetState = function(opts, fx) {
        fx = fx || opts.fx;
        opts.before = [];
        opts.after = [];
        opts.cssBefore = $.extend({}, opts.original.cssBefore);
        opts.cssAfter = $.extend({}, opts.original.cssAfter);
        opts.animIn = $.extend({}, opts.original.animIn);
        opts.animOut = $.extend({}, opts.original.animOut);
        opts.fxFn = null;
        $.each(opts.original.before, function() {
            opts.before.push(this);
        });
        $.each(opts.original.after, function() {
            opts.after.push(this);
        });
        var init = $.fn.cycle.transitions[fx];
        if ($.isFunction(init)) {
            init(opts.$cont, $(opts.elements), opts);
        }
    };

    function go(els, opts, manual, fwd) {
        if (manual && opts.busy && opts.manualTrump) {
            debug("manualTrump in go(), stopping active transition");
            $(els).stop(true, true);
            opts.busy = false;
        }
        if (opts.busy) {
            debug("transition active, ignoring new tx request");
            return;
        }
        var p = opts.$cont[0],
            curr = els[opts.currSlide],
            next = els[opts.nextSlide];
        if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual) {
            return;
        }
        if (!manual && !p.cyclePause && !opts.bounce && ((opts.autostop && (--opts.countdown <= 0)) || (opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
            if (opts.end) {
                opts.end(opts);
            }
            return;
        }
        var changed = false;
        if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
            changed = true;
            var fx = opts.fx;
            curr.cycleH = curr.cycleH || $(curr).height();
            curr.cycleW = curr.cycleW || $(curr).width();
            next.cycleH = next.cycleH || $(next).height();
            next.cycleW = next.cycleW || $(next).width();
            if (opts.multiFx) {
                if (opts.lastFx == undefined || ++opts.lastFx >= opts.fxs.length) {
                    opts.lastFx = 0;
                }
                fx = opts.fxs[opts.lastFx];
                opts.currFx = fx;
            }
            if (opts.oneTimeFx) {
                fx = opts.oneTimeFx;
                opts.oneTimeFx = null;
            }
            $.fn.cycle.resetState(opts, fx);
            if (opts.before.length) {
                $.each(opts.before, function(i, o) {
                    if (p.cycleStop != opts.stopCount) {
                        return;
                    }
                    o.apply(next, [curr, next, opts, fwd]);
                });
            }
            var after = function() {
                $.each(opts.after, function(i, o) {
                    if (p.cycleStop != opts.stopCount) {
                        return;
                    }
                    o.apply(next, [curr, next, opts, fwd]);
                });
            };
            debug("tx firing; currSlide: " + opts.currSlide + "; nextSlide: " + opts.nextSlide);
            opts.busy = 1;
            if (opts.fxFn) {
                opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
            } else {
                if ($.isFunction($.fn.cycle[opts.fx])) {
                    $.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent);
                } else {
                    $.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
                }
            }
        }
        if (changed || opts.nextSlide == opts.currSlide) {
            opts.lastSlide = opts.currSlide;
            if (opts.random) {
                opts.currSlide = opts.nextSlide;
                if (++opts.randomIndex == els.length) {
                    opts.randomIndex = 0;
                }
                opts.nextSlide = opts.randomMap[opts.randomIndex];
                if (opts.nextSlide == opts.currSlide) {
                    opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1;
                }
            } else {
                if (opts.backwards) {
                    var roll = (opts.nextSlide - 1) < 0;
                    if (roll && opts.bounce) {
                        opts.backwards = !opts.backwards;
                        opts.nextSlide = 1;
                        opts.currSlide = 0;
                    } else {
                        opts.nextSlide = roll ? (els.length - 1) : opts.nextSlide - 1;
                        opts.currSlide = roll ? 0 : opts.nextSlide + 1;
                    }
                } else {
                    var roll = (opts.nextSlide + 1) == els.length;
                    if (roll && opts.bounce) {
                        opts.backwards = !opts.backwards;
                        opts.nextSlide = els.length - 2;
                        opts.currSlide = els.length - 1;
                    } else {
                        opts.nextSlide = roll ? 0 : opts.nextSlide + 1;
                        opts.currSlide = roll ? els.length - 1 : opts.nextSlide - 1;
                    }
                }
            }
        }
        if (changed && opts.pager) {
            opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);
        }
        var ms = 0;
        if (opts.timeout && !opts.continuous) {
            ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
        } else {
            if (opts.continuous && p.cyclePause) {
                ms = 10;
            }
        }
        if (ms > 0) {
            p.cycleTimeout = setTimeout(function() {
                go(els, opts, 0, !opts.backwards);
            }, ms);
        }
    }

    $.fn.cycle.updateActivePagerLink = function(pager, currSlide, clsName) {
        $(pager).each(function() {
            $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
        });
    };

    function getTimeout(curr, next, opts, fwd) {
        if (opts.timeoutFn) {
            var t = opts.timeoutFn.call(curr, curr, next, opts, fwd);
            while ((t - opts.speed) < 250) {
                t += opts.speed;
            }
            debug("calculated timeout: " + t + "; speed: " + opts.speed);
            if (t !== false) {
                return t;
            }
        }
        return opts.timeout;
    }

    $.fn.cycle.next = function(opts) {
        advance(opts, 1);
    };
    $.fn.cycle.prev = function(opts) {
        advance(opts, 0);
    };

    function advance(opts, moveForward) {
        var val = moveForward ? 1 : -1;
        var els = opts.elements;
        var p = opts.$cont[0],
            timeout = p.cycleTimeout;
        if (timeout) {
            clearTimeout(timeout);
            p.cycleTimeout = 0;
        }
        if (opts.random && val < 0) {
            opts.randomIndex--;
            if (--opts.randomIndex == -2) {
                opts.randomIndex = els.length - 2;
            } else {
                if (opts.randomIndex == -1) {
                    opts.randomIndex = els.length - 1;
                }
            }
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        } else {
            if (opts.random) {
                opts.nextSlide = opts.randomMap[opts.randomIndex];
            } else {
                opts.nextSlide = opts.currSlide + val;
                if (opts.nextSlide < 0) {
                    if (opts.nowrap) {
                        return false;
                    }
                    opts.nextSlide = els.length - 1;
                } else {
                    if (opts.nextSlide >= els.length) {
                        if (opts.nowrap) {
                            return false;
                        }
                        opts.nextSlide = 0;
                    }
                }
            }
        }
        var cb = opts.onPrevNextEvent || opts.prevNextClick;
        if ($.isFunction(cb)) {
            cb(val > 0, opts.nextSlide, els[opts.nextSlide]);
        }
        go(els, opts, 1, moveForward);
        return false;
    }

    function buildPager(els, opts) {
        var $p = $(opts.pager);
        $.each(els, function(i, o) {
            $.fn.cycle.createPagerAnchor(i, o, $p, els, opts);
        });
        opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass);
    }

    $.fn.cycle.createPagerAnchor = function(i, el, $p, els, opts) {
        var a;
        if ($.isFunction(opts.pagerAnchorBuilder)) {
            a = opts.pagerAnchorBuilder(i, el);
            debug("pagerAnchorBuilder(" + i + ", el) returned: " + a);
        } else {
            a = '<a href="#">' + (i + 1) + "</a>";
        }
        if (!a) {
            return;
        }
        var $a = $(a);
        if ($a.parents("body").length === 0) {
            var arr = [];
            if ($p.length > 1) {
                $p.each(function() {
                    var $clone = $a.clone(true);
                    $(this).append($clone);
                    arr.push($clone[0]);
                });
                $a = $(arr);
            } else {
                $a.appendTo($p);
            }
        }
        opts.pagerAnchors = opts.pagerAnchors || [];
        opts.pagerAnchors.push($a);
        $a.bind(opts.pagerEvent, function(e) {
            e.preventDefault();
            opts.nextSlide = i;
            var p = opts.$cont[0],
                timeout = p.cycleTimeout;
            if (timeout) {
                clearTimeout(timeout);
                p.cycleTimeout = 0;
            }
            var cb = opts.onPagerEvent || opts.pagerClick;
            if ($.isFunction(cb)) {
                cb(opts.nextSlide, els[opts.nextSlide]);
            }
            go(els, opts, 1, opts.currSlide < i);
        });
        if (!/^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble) {
            if (opts.pauseOnPagerHover) {
                $a.hover(function() {
                    opts.$cont[0].cyclePause++;
                }, function() {
                    opts.$cont[0].cyclePause--;
                });
            }
        }
    };
    $.fn.cycle.hopsFromLast = function(opts, fwd) {
        var hops, l = opts.lastSlide,
            c = opts.currSlide;
        if (fwd) {
            hops = c > l ? c - l : opts.slideCount - l;
        } else {
            hops = c < l ? l - c : l + opts.slideCount - c;
        }
        return hops;
    };

    function clearTypeFix($slides) {
        debug("applying clearType background-color hack");

        function hex(s) {
            s = parseInt(s).toString(16);
            return s.length < 2 ? "0" + s : s;
        }

        function getBg(e) {
            for (; e && e.nodeName.toLowerCase() != "html"; e = e.parentNode) {
                var v = $.css(e, "background-color");
                if (v.indexOf("rgb") >= 0) {
                    var rgb = v.match(/\d+/g);
                    return "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
                }
                if (v && v != "transparent") {
                    return v;
                }
            }
            return "#ffffff";
        }

        $slides.each(function() {
            $(this).css("background-color", getBg(this));
        });
    }

    $.fn.cycle.commonReset = function(curr, next, opts, w, h, rev) {
        $(opts.elements).not(curr).hide();
        opts.cssBefore.opacity = 1;
        opts.cssBefore.display = "block";
        if (opts.slideResize && w !== false && next.cycleW > 0) {
            opts.cssBefore.width = next.cycleW;
        }
        if (opts.slideResize && h !== false && next.cycleH > 0) {
            opts.cssBefore.height = next.cycleH;
        }
        opts.cssAfter = opts.cssAfter || {};
        opts.cssAfter.display = "none";
        $(curr).css("zIndex", opts.slideCount + (rev === true ? 1 : 0));
        $(next).css("zIndex", opts.slideCount + (rev === true ? 0 : 1));
    };
    $.fn.cycle.custom = function(curr, next, opts, cb, fwd, speedOverride) {
        var $l = $(curr),
            $n = $(next);
        var speedIn = opts.speedIn,
            speedOut = opts.speedOut,
            easeIn = opts.easeIn,
            easeOut = opts.easeOut;
        $n.css(opts.cssBefore);
        if (speedOverride) {
            if (typeof speedOverride == "number") {
                speedIn = speedOut = speedOverride;
            } else {
                speedIn = speedOut = 1;
            }
            easeIn = easeOut = null;
        }
        var fn = function() {
            $n.animate(opts.animIn, speedIn, easeIn, cb);
        };
        $l.animate(opts.animOut, speedOut, easeOut, function() {
            if (opts.cssAfter) {
                $l.css(opts.cssAfter);
            }
            if (!opts.sync) {
                fn();
            }
        });
        if (opts.sync) {
            fn();
        }
    };
    $.fn.cycle.transitions = {
        fade: function($cont, $slides, opts) {
            $slides.not(":eq(" + opts.currSlide + ")").css("opacity", 0);
            opts.before.push(function(curr, next, opts) {
                $.fn.cycle.commonReset(curr, next, opts);
                opts.cssBefore.opacity = 0;
            });
            opts.animIn = {
                opacity: 1
            };
            opts.animOut = {
                opacity: 0
            };
            opts.cssBefore = {
                top: 0,
                left: 0
            };
        }
    };
    $.fn.cycle.ver = function() {
        return ver;
    };
    $.fn.cycle.defaults = {
        fx: "fade",
        timeout: 4000,
        timeoutFn: null,
        continuous: 0,
        speed: 1000,
        speedIn: null,
        speedOut: null,
        next: null,
        prev: null,
        onPrevNextEvent: null,
        prevNextEvent: "click.cycle",
        pager: null,
        onPagerEvent: null,
        pagerEvent: "click.cycle",
        allowPagerClickBubble: false,
        pagerAnchorBuilder: null,
        before: null,
        after: null,
        end: null,
        easing: null,
        easeIn: null,
        easeOut: null,
        shuffle: null,
        animIn: null,
        animOut: null,
        cssBefore: null,
        cssAfter: null,
        fxFn: null,
        height: "auto",
        startingSlide: 0,
        sync: 1,
        random: 0,
        fit: 0,
        containerResize: 1,
        slideResize: 1,
        pause: 0,
        pauseOnPagerHover: 0,
        autostop: 0,
        autostopCount: 0,
        delay: 0,
        slideExpr: null,
        cleartype: !$.support.opacity,
        cleartypeNoBg: false,
        nowrap: 0,
        fastOnEvent: 0,
        randomizeEffects: 1,
        rev: 0,
        manualTrump: true,
        requeueOnImageNotLoaded: true,
        requeueTimeout: 250,
        activePagerClass: "activeSlide",
        updateActivePagerLink: null,
        backwards: false
    };
})(jQuery);
/*
 * jQuery Form Plugin
 * version: 2.67 (12-MAR-2011)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($) {
    $.fn.ajaxSubmit = function(options) {
        if (!this.length) {
            log("ajaxSubmit: skipping submit process - no element selected");
            return this;
        }
        if (typeof options == "function") {
            options = {
                success: options
            };
        }
        var action = this.attr("action");
        var url = (typeof action === "string") ? $.trim(action) : "";
        if (url) {
            url = (url.match(/^([^#]+)/) || [])[1];
        }
        url = url || window.location.href || "";
        options = $.extend(true, {
            url: url,
            type: this[0].getAttribute("method") || "GET",
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, options);
        var veto = {};
        this.trigger("form-pre-serialize", [this, options, veto]);
        if (veto.veto) {
            log("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
            return this;
        }
        if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
            log("ajaxSubmit: submit aborted via beforeSerialize callback");
            return this;
        }
        var n, v, a = this.formToArray(options.semantic);
        if (options.data) {
            options.extraData = options.data;
            for (n in options.data) {
                if (options.data[n] instanceof Array) {
                    for (var k in options.data[n]) {
                        a.push({
                            name: n,
                            value: options.data[n][k]
                        });
                    }
                } else {
                    v = options.data[n];
                    v = $.isFunction(v) ? v() : v;
                    a.push({
                        name: n,
                        value: v
                    });
                }
            }
        }
        if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
            log("ajaxSubmit: submit aborted via beforeSubmit callback");
            return this;
        }
        this.trigger("form-submit-validate", [a, this, options, veto]);
        if (veto.veto) {
            log("ajaxSubmit: submit vetoed via form-submit-validate trigger");
            return this;
        }
        var q = $.param(a);
        if (options.type.toUpperCase() == "GET") {
            options.url += (options.url.indexOf("?") >= 0 ? "&" : "?") + q;
            options.data = null;
        } else {
            options.data = q;
        }
        var $form = this,
            callbacks = [];
        if (options.resetForm) {
            callbacks.push(function() {
                $form.resetForm();
            });
        }
        if (options.clearForm) {
            callbacks.push(function() {
                $form.clearForm();
            });
        }
        if (!options.dataType && options.target) {
            var oldSuccess = options.success || function() {};
            callbacks.push(function(data) {
                var fn = options.replaceTarget ? "replaceWith" : "html";
                $(options.target)[fn](data).each(oldSuccess, arguments);
            });
        } else {
            if (options.success) {
                callbacks.push(options.success);
            }
        }
        options.success = function(data, status, xhr) {
            var context = options.context || options;
            for (var i = 0, max = callbacks.length; i < max; i++) {
                callbacks[i].apply(context, [data, status, xhr || $form, $form]);
            }
        };
        var fileInputs = $("input:file", this).length > 0;
        var mp = "multipart/form-data";
        var multipart = ($form.attr("enctype") == mp || $form.attr("encoding") == mp);
        if (options.iframe !== false && (fileInputs || options.iframe || multipart)) {
            if (options.closeKeepAlive) {
                $.get(options.closeKeepAlive, fileUpload);
            } else {
                fileUpload();
            }
        } else {
            $.ajax(options);
        }
        this.trigger("form-submit-notify", [this, options]);
        return this;

        function fileUpload() {
            var form = $form[0];
            if ($(":input[name=submit],:input[id=submit]", form).length) {
                alert('Error: Form elements must not have name or id of "submit".');
                return;
            }
            var s = $.extend(true, {}, $.ajaxSettings, options);
            s.context = s.context || s;
            var id = "jqFormIO" + (new Date().getTime()),
                fn = "_" + id;
            var $io = $('<iframe id="' + id + '" name="' + id + '" src="' + s.iframeSrc + '" />');
            var io = $io[0];
            $io.css({
                position: "absolute",
                top: "-1000px",
                left: "-1000px"
            });
            var xhr = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {},
                abort: function() {
                    log("aborting upload...");
                    var e = "aborted";
                    this.aborted = 1;
                    $io.attr("src", s.iframeSrc);
                    xhr.error = e;
                    s.error && s.error.call(s.context, xhr, "error", e);
                    g && $.event.trigger("ajaxError", [xhr, s, e]);
                    s.complete && s.complete.call(s.context, xhr, "error");
                }
            };
            var g = s.global;
            if (g && !$.active++) {
                $.event.trigger("ajaxStart");
            }
            if (g) {
                $.event.trigger("ajaxSend", [xhr, s]);
            }
            if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
                if (s.global) {
                    $.active--;
                }
                return;
            }
            if (xhr.aborted) {
                return;
            }
            var timedOut = 0;
            var sub = form.clk;
            if (sub) {
                var n = sub.name;
                if (n && !sub.disabled) {
                    s.extraData = s.extraData || {};
                    s.extraData[n] = sub.value;
                    if (sub.type == "image") {
                        s.extraData[n + ".x"] = form.clk_x;
                        s.extraData[n + ".y"] = form.clk_y;
                    }
                }
            }

            function doSubmit() {
                var t = $form.attr("target"),
                    a = $form.attr("action");
                form.setAttribute("target", id);
                if (form.getAttribute("method") != "POST") {
                    form.setAttribute("method", "POST");
                }
                if (form.getAttribute("action") != s.url) {
                    form.setAttribute("action", s.url);
                }
                if (!s.skipEncodingOverride) {
                    $form.attr({
                        encoding: "multipart/form-data",
                        enctype: "multipart/form-data"
                    });
                }
                if (s.timeout) {
                    setTimeout(function() {
                        timedOut = true;
                        cb();
                    }, s.timeout);
                }
                var extraInputs = [];
                try {
                    if (s.extraData) {
                        for (var n in s.extraData) {
                            extraInputs.push($('<input type="hidden" name="' + n + '" value="' + s.extraData[n] + '" />').appendTo(form)[0]);
                        }
                    }
                    $io.appendTo("body");
                    io.attachEvent ? io.attachEvent("onload", cb) : io.addEventListener("load", cb, false);
                    form.submit();
                } finally {
                    form.setAttribute("action", a);
                    if (t) {
                        form.setAttribute("target", t);
                    } else {
                        $form.removeAttr("target");
                    }
                    $(extraInputs).remove();
                }
            }

            if (s.forceSync) {
                doSubmit();
            } else {
                setTimeout(doSubmit, 10);
            }
            var data, doc, domCheckCount = 50;

            function cb() {
                if (xhr.aborted) {
                    return;
                }
                var doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;
                if (!doc || doc.location.href == s.iframeSrc) {
                    return;
                }
                io.detachEvent ? io.detachEvent("onload", cb) : io.removeEventListener("load", cb, false);
                var ok = true;
                try {
                    if (timedOut) {
                        throw "timeout";
                    }
                    var isXml = s.dataType == "xml" || doc.XMLDocument || $.isXMLDoc(doc);
                    log("isXml=" + isXml);
                    if (!isXml && window.opera && (doc.body == null || doc.body.innerHTML == "")) {
                        if (--domCheckCount) {
                            log("requeing onLoad callback, DOM not available");
                            setTimeout(cb, 250);
                            return;
                        }
                    }
                    xhr.responseText = doc.body ? doc.body.innerHTML : doc.documentElement ? doc.documentElement.innerHTML : null;
                    xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                    xhr.getResponseHeader = function(header) {
                        var headers = {
                            "content-type": s.dataType
                        };
                        return headers[header];
                    };
                    var scr = /(json|script)/.test(s.dataType);
                    if (scr || s.textarea) {
                        var ta = doc.getElementsByTagName("textarea")[0];
                        if (ta) {
                            xhr.responseText = ta.value;
                        } else {
                            if (scr) {
                                var pre = doc.getElementsByTagName("pre")[0];
                                var b = doc.getElementsByTagName("body")[0];
                                if (pre) {
                                    xhr.responseText = pre.textContent;
                                } else {
                                    if (b) {
                                        xhr.responseText = b.innerHTML;
                                    }
                                }
                            }
                        }
                    } else {
                        if (s.dataType == "xml" && !xhr.responseXML && xhr.responseText != null) {
                            xhr.responseXML = toXml(xhr.responseText);
                        }
                    }
                    data = httpData(xhr, s.dataType, s);
                } catch (e) {
                    log("error caught:", e);
                    ok = false;
                    xhr.error = e;
                    s.error && s.error.call(s.context, xhr, "error", e);
                    g && $.event.trigger("ajaxError", [xhr, s, e]);
                }
                if (xhr.aborted) {
                    log("upload aborted");
                    ok = false;
                }
                if (ok) {
                    s.success && s.success.call(s.context, data, "success", xhr);
                    g && $.event.trigger("ajaxSuccess", [xhr, s]);
                }
                g && $.event.trigger("ajaxComplete", [xhr, s]);
                if (g && !--$.active) {
                    $.event.trigger("ajaxStop");
                }
                s.complete && s.complete.call(s.context, xhr, ok ? "success" : "error");
                setTimeout(function() {
                    $io.removeData("form-plugin-onload");
                    $io.remove();
                    xhr.responseXML = null;
                }, 100);
            }

            var toXml = $.parseXML || function(s, doc) {
                    if (window.ActiveXObject) {
                        doc = new ActiveXObject("Microsoft.XMLDOM");
                        doc.async = "false";
                        doc.loadXML(s);
                    } else {
                        doc = (new DOMParser()).parseFromString(s, "text/xml");
                    }
                    return (doc && doc.documentElement && doc.documentElement.nodeName != "parsererror") ? doc : null;
                };
            var parseJSON = $.parseJSON || function(s) {
                    return window["eval"]("(" + s + ")");
                };
            var httpData = function(xhr, type, s) {
                var ct = xhr.getResponseHeader("content-type") || "",
                    xml = type === "xml" || !type && ct.indexOf("xml") >= 0,
                    data = xml ? xhr.responseXML : xhr.responseText;
                if (xml && data.documentElement.nodeName === "parsererror") {
                    $.error && $.error("parsererror");
                }
                if (s && s.dataFilter) {
                    data = s.dataFilter(data, type);
                }
                if (typeof data === "string") {
                    if (type === "json" || !type && ct.indexOf("json") >= 0) {
                        data = parseJSON(data);
                    } else {
                        if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                            $.globalEval(data);
                        }
                    }
                }
                return data;
            };
        }
    };
    $.fn.ajaxForm = function(options) {
        if (this.length === 0) {
            var o = {
                s: this.selector,
                c: this.context
            };
            if (!$.isReady && o.s) {
                log("DOM not ready, queuing ajaxForm");
                $(function() {
                    $(o.s, o.c).ajaxForm(options);
                });
                return this;
            }
            log("terminating; zero elements found by selector" + ($.isReady ? "" : " (DOM not ready)"));
            return this;
        }
        return this.ajaxFormUnbind().bind("submit.form-plugin", function(e) {
            if (!e.isDefaultPrevented()) {
                e.preventDefault();
                $(this).ajaxSubmit(options);
            }
        }).bind("click.form-plugin", function(e) {
            var target = e.target;
            var $el = $(target);
            if (!($el.is(":submit,input:image"))) {
                var t = $el.closest(":submit");
                if (t.length == 0) {
                    return;
                }
                target = t[0];
            }
            var form = this;
            form.clk = target;
            if (target.type == "image") {
                if (e.offsetX != undefined) {
                    form.clk_x = e.offsetX;
                    form.clk_y = e.offsetY;
                } else {
                    if (typeof $.fn.offset == "function") {
                        var offset = $el.offset();
                        form.clk_x = e.pageX - offset.left;
                        form.clk_y = e.pageY - offset.top;
                    } else {
                        form.clk_x = e.pageX - target.offsetLeft;
                        form.clk_y = e.pageY - target.offsetTop;
                    }
                }
            }
            setTimeout(function() {
                form.clk = form.clk_x = form.clk_y = null;
            }, 100);
        });
    };
    $.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin click.form-plugin");
    };
    $.fn.formToArray = function(semantic) {
        var a = [];
        if (this.length === 0) {
            return a;
        }
        var form = this[0];
        var els = semantic ? form.getElementsByTagName("*") : form.elements;
        if (!els) {
            return a;
        }
        var i, j, n, v, el, max, jmax;
        for (i = 0, max = els.length; i < max; i++) {
            el = els[i];
            n = el.name;
            if (!n) {
                continue;
            }
            if (semantic && form.clk && el.type == "image") {
                if (!el.disabled && form.clk == el) {
                    a.push({
                        name: n,
                        value: $(el).val()
                    });
                    a.push({
                        name: n + ".x",
                        value: form.clk_x
                    }, {
                        name: n + ".y",
                        value: form.clk_y
                    });
                }
                continue;
            }
            v = $.fieldValue(el, true);
            if (v && v.constructor == Array) {
                for (j = 0, jmax = v.length; j < jmax; j++) {
                    a.push({
                        name: n,
                        value: v[j]
                    });
                }
            } else {
                if (v !== null && typeof v != "undefined") {
                    a.push({
                        name: n,
                        value: v
                    });
                }
            }
        }
        if (!semantic && form.clk) {
            var $input = $(form.clk),
                input = $input[0];
            n = input.name;
            if (n && !input.disabled && input.type == "image") {
                a.push({
                    name: n,
                    value: $input.val()
                });
                a.push({
                    name: n + ".x",
                    value: form.clk_x
                }, {
                    name: n + ".y",
                    value: form.clk_y
                });
            }
        }
        return a;
    };
    $.fn.formSerialize = function(semantic) {
        return $.param(this.formToArray(semantic));
    };
    $.fn.fieldSerialize = function(successful) {
        var a = [];
        this.each(function() {
            var n = this.name;
            if (!n) {
                return;
            }
            var v = $.fieldValue(this, successful);
            if (v && v.constructor == Array) {
                for (var i = 0, max = v.length; i < max; i++) {
                    a.push({
                        name: n,
                        value: v[i]
                    });
                }
            } else {
                if (v !== null && typeof v != "undefined") {
                    a.push({
                        name: this.name,
                        value: v
                    });
                }
            }
        });
        return $.param(a);
    };
    $.fn.fieldValue = function(successful) {
        for (var val = [], i = 0, max = this.length; i < max; i++) {
            var el = this[i];
            var v = $.fieldValue(el, successful);
            if (v === null || typeof v == "undefined" || (v.constructor == Array && !v.length)) {
                continue;
            }
            v.constructor == Array ? $.merge(val, v) : val.push(v);
        }
        return val;
    };
    $.fieldValue = function(el, successful) {
        var n = el.name,
            t = el.type,
            tag = el.tagName.toLowerCase();
        if (successful === undefined) {
            successful = true;
        }
        if (successful && (!n || el.disabled || t == "reset" || t == "button" || (t == "checkbox" || t == "radio") && !el.checked || (t == "submit" || t == "image") && el.form && el.form.clk != el || tag == "select" && el.selectedIndex == -1)) {
            return null;
        }
        if (tag == "select") {
            var index = el.selectedIndex;
            if (index < 0) {
                return null;
            }
            var a = [],
                ops = el.options;
            var one = (t == "select-one");
            var max = (one ? index + 1 : ops.length);
            for (var i = (one ? index : 0); i < max; i++) {
                var op = ops[i];
                if (op.selected) {
                    var v = op.value;
                    if (!v) {
                        v = (op.attributes && op.attributes["value"] && !(op.attributes["value"].specified)) ? op.text : op.value;
                    }
                    if (one) {
                        return v;
                    }
                    a.push(v);
                }
            }
            return a;
        }
        return $(el).val();
    };
    $.fn.clearForm = function() {
        return this.each(function() {
            $("input,select,textarea", this).clearFields();
        });
    };
    $.fn.clearFields = $.fn.clearInputs = function() {
        return this.each(function() {
            var t = this.type,
                tag = this.tagName.toLowerCase();
            if (t == "text" || t == "password" || tag == "textarea") {
                this.value = "";
            } else {
                if (t == "checkbox" || t == "radio") {
                    this.checked = false;
                } else {
                    if (tag == "select") {
                        this.selectedIndex = -1;
                    }
                }
            }
        });
    };
    $.fn.resetForm = function() {
        return this.each(function() {
            if (typeof this.reset == "function" || (typeof this.reset == "object" && !this.reset.nodeType)) {
                this.reset();
            }
        });
    };
    $.fn.enable = function(b) {
        if (b === undefined) {
            b = true;
        }
        return this.each(function() {
            this.disabled = !b;
        });
    };
    $.fn.selected = function(select) {
        if (select === undefined) {
            select = true;
        }
        return this.each(function() {
            var t = this.type;
            if (t == "checkbox" || t == "radio") {
                this.checked = select;
            } else {
                if (this.tagName.toLowerCase() == "option") {
                    var $sel = $(this).parent("select");
                    if (select && $sel[0] && $sel[0].type == "select-one") {
                        $sel.find("option").selected(false);
                    }
                    this.selected = select;
                }
            }
        });
    };

    function log() {
        if ($.fn.ajaxSubmit.debug) {
            var msg = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            if (window.console && window.console.log) {
                window.console.log(msg);
            } else {
                if (window.opera && window.opera.postError) {
                    window.opera.postError(msg);
                }
            }
        }
    }
})(jQuery);
if (!$.curCSS) {
    $.curCSS = $.css;
}
jQuery.fn.setupExtras = function(setup, options) {
    for (var extra in setup) {
        var self = this;
        if (setup[extra] instanceof Array) {
            for (var i = 0; i < setup[extra].length; i++) {
                setup[extra][i].call(self, options);
            }
        } else {
            setup[extra].call(self, options);
        }
    }
};
jQuery.fn.exists = function() {
    return this.length > 0;
};
var $$ = function(param) {
    return $.data($(param)[0]);
};
(function($) {
    $.fn.isVisible = function() {
        return $.expr.filters.visible(this[0]);
    };
})(jQuery);
(function($) {
    $.fn.tabs = function(options) {
        options = options || {};
        this.setupExtras(options.setup || $.fn.tabs.base, options);
        if (1 < this.length) {
            throw "Id corresponds to multiple tabs!";
        }
        var tabList = $(this);
        $$(tabList).panels = $([]);
        $("li a", tabList).click(function(e) {
            e.preventDefault();
            tabList.trigger("activated", this);
            return false;
        }).each(function() {
            var panel = $($(this).attr("href"));
            $$(tabList).panels = $$(tabList).panels.add(panel);
            tabList.trigger("setupPanel", [panel]);
        });
        tabList.trigger("initialize");
        return this;
    };
    var getPanel = function(selected) {
        return $($(selected).attr("href"));
    };
    $.fn.tabs.base = {
        setupPanel: [function(options) {
            this.bind("setupPanel", function(e, selector) {
                $(selector).hide();
            });
        }],
        initialize: [function(options) {
            this.bind("initialize", function() {
                var defaultTab = options.defaultTab ? $("li a[href='" + options.defaultTab + "']")[0] : $(this).find("li a:first")[0];
                $(this).trigger("activated", defaultTab);
            });
        }],
        activate: [function(options) {
            this.bind("activated", function(e, selected) {
                var panel = getPanel(selected);
                $$(this).panels.hide();
                $(panel).show();
                $(this).find("li a").removeClass("selected");
                $(selected).addClass("selected").blur();
                $(this).trigger("activation-finished", selected);
            });
        }]
    };
})(jQuery);
(function($) {
    $.widget("ui.listbox", {
        _init: function() {
            var self = this;
            $("dd", this.element).on("click", "a", function() {
                self.element.trigger("selected", $(this).attr("data-value"));
                return false;
            });
            self.element.bind("selected", function(e, value) {
                self.element.find("dd a").removeClass("selected");
                self.element.find('dd a[data-value="' + value + '"]').addClass("selected").blur();
            });
            var defaultOption = $("dd a.selected:first", self.element);
            if (0 == defaultOption.length) {
                defaultOption = $("dd a:first", self.element);
            }
            if (defaultOption) {
                defaultOption.click();
            }
        },
        value: function(value) {
            if (undefined !== value) {
                var option = this.element.find('dd a[data-value="' + value + '"]');
                if (0 < option.length) {
                    option.click();
                } else {
                    this.element.find("dd a.selected").removeClass("selected");
                }
            } else {
                return this.element.find("dd a.selected").attr("data-value");
            }
        }
    });
    $.extend($.ui.listbox, {
        getter: "value"
    });
})(jQuery);
(function($) {
    $.fn.grid = function(options) {
        options = options || {};
        return this.each(function() {
            var $this = $(this);
            if ($this.data("grid")) {
                return;
            }
            var grid = new Grid($this, options);
            grid.init();
            $this.data("grid", grid);
        });
    };
})(jQuery);

function Filter(options) {
    options = options || {};
    var maskFn = options.maskFn;
    var maskState = (options.mask) ? options.mask.hashtable() : undefined;
    var msgCache = (options.mask) ? {
        filter: {
            mask: options.mask
        }
    } : {};
    this.filter = function(msg) {
        if (msg.filter && msg.filter.mask) {
            maskState = msg.filter.mask.hashtable();
        }
        $.extend(msgCache, msg);
        var records = msgCache.model.records;
        if (!records) {
            return records;
        }
        var result = [];
        for (var i = 0, l = records.length; i < l; i++) {
            if (maskState[maskFn(records[i])]) {
                result.push(records[i]);
            }
        }
        msgCache.model.records = result;
        msg = $.extend(msg, msgCache);
    };
}

function Sorter(options) {
    options = options || {};
    var recordsCache = null;
    var msgCache = (options.sortInfo) ? {
        sorter: {
            sortInfo: options.sortInfo
        }
    } : {};
    this.sort = function(msg) {
        $.extend(msgCache, msg);
        if (!msgCache.model) {
            return false;
        }
        recordsCache = msgCache.model.records;
        if (!recordsCache) {
            return recordsCache;
        }
        if (recordsCache.length == 0) {
            return [];
        }
        var compare = ("string" == typeof recordsCache[0][msgCache.sorter.sortInfo.property]) ? sortCaseInsensitive : NG.sortNumeric;
        var self = this;
        if (!msgCache.sorter.sortInfo.isGlobal) {
            recordsCache.sort(function(a, b) {
                return compare(a[msgCache.sorter.sortInfo.property], b[msgCache.sorter.sortInfo.property]) * (("desc" == msgCache.sorter.sortInfo.direction) ? -1 : 1);
            });
        }
        msgCache.model.records = recordsCache;
        msg = $.extend(msg, msgCache);
    };
    var sortCaseInsensitive = function(a, b) {
        aa = a.toLowerCase();
        bb = b.toLowerCase();
        if (aa == bb) {
            return 0;
        }
        if (aa < bb) {
            return -1;
        }
        return 1;
    };
    this.sortInfo = function() {
        if (!msgCache) {
            return;
        }
        if (!msgCache.sorter) {
            return;
        }
        return msgCache.sorter.sortInfo;
    };
}

function Highlighter(options) {
    options = options || {};
    var maskFn = options.maskFn;
    var maskState = (options.mask) ? options.mask.hashtable() : undefined;
    var msgCache = (options.mask) ? {
        filter: {
            mask: options.mask
        }
    } : {};
    this.highlight = function(msg) {
        if (msg.highlighter && msg.highlighter.mask) {
            maskState = msg.highlighter.mask.hashtable();
        }
        $.extend(msgCache, msg);
        var records = msgCache.model.records;
        if (!records) {
            return records;
        }
        var result = [];
        if (!maskState) {
            return result;
        }
        for (var i = 0, l = records.length; i < l; i++) {
            if (maskState[maskFn(records[i])]) {
                result.push(i);
            }
        }
        return result;
    };
}

function Grid(element, options) {
    var self = this;
    var element = element;
    var model, records;
    var view;
    var extraOptions = options.extraOptions || {};
    var filter, isFilterOn;
    var sorter;
    var highlighter, isHighlighterOn;
    this.init = function() {
        if (options.model && options.view) {
            model = new options.model.type(options.model);
            view = options.view;
            bind("loadcomplete", render);
        }
        if (options.filter) {
            filter = new Filter(options.filter);
            if (options.filter.mask) {
                filterOn();
            }
        }
        if (options.sorter) {
            sorter = new Sorter(options.sorter);
            sorterOn();
        }
        if (options.highlighter) {
            highlighter = new Highlighter(options.highlighter);
            if (options.highlighter.mask) {
                highlighterOn();
            }
        }
    };
    this.id = function() {
        return element.attr("id");
    };
    this.reSort = function() {
        if (!sorter) {
            return;
        }
        var lastSortInfo = sorter.sortInfo();
        if (!lastSortInfo) {
            return;
        }
        this.sort(lastSortInfo.property, lastSortInfo.direction);
    };
    this.load = function(parameters) {
        renderLoading();
        var msg;
        if (parameters.model) {
            if (parameters.filter) {
                filterOn();
            }
            extraOptions.field = parameters.model.parameters.field;
            records = model.load(parameters.model ? parameters.model.parameters : parameters);
            var modelMsg = $.extend(parameters.model, {
                records: records
            });
            msg = $.extend(parameters, {
                model: modelMsg,
                extraOptions: extraOptions
            });
        } else {
            extraOptions.field = parameters.field;
            records = model.load(parameters);
            msg = {
                model: {
                    parameters: parameters,
                    records: records
                },
                extraOptions: extraOptions
            };
        }
        if (records == -1) {
            return false;
        }
        if (0 == records.length) {
            render(null, msg);
        }
        trigger("loadcomplete", [msg]);
    };

    function render(e, msg) {
        var html = view(msg);
        html = viewIsEmpty(html) ? emptyViewMessage() : html;
        $("tbody", element).html(html);
        fitText(msg);
        fixZeros(msg);
        trigger("rendercomplete", [msg]);
    }

    function fitText(msg) {
        if (msg.model.parameters && msg.model.parameters.params && msg.model.parameters.params.fitText) {
            setTimeout(function() {
                var fitText = msg.model.parameters.params.fitText;
                $(fitText.container).fitText(fitText.options);
            }, 0);
        }
    }

    function fixZeros(msg) {
        if (msg.model.parameters && msg.model.parameters.params && msg.model.parameters.params.fixZeros) {
            $(document).triggerHandler("fix-zeros", [$("td", element)]);
        }
    }

    function renderLoading() {
        var $tbody = $("tbody ", element);
        var height = $tbody.height();
        $tbody.html('<tr style="height: ' + height + 'px;"><td colspan="99"><div style="position: relative;"><div class="stats-loading"><div class="loading-text">Loading..</div></div></div></td></tr>');
    }

    function viewIsEmpty(html) {
        return html == "";
    }

    function emptyViewMessage() {
        return '<tr><td class="note empty" colspan="99">No current records available..</td></tr>';
    }

    this.filtrate = function(mask) {
        if (!isFilterOn) {
            filterOn();
        }
        var msg = {
            model: {
                records: records
            },
            filter: {
                mask: mask
            }
        };
        filtrate(null, msg);
        return this;
    };

    function filtrate(e, msg) {
        filter.filter(msg);
        trigger("filtercomplete", [msg]);
    }

    function filterOn() {
        if (sorter) {
            unbind("loadcomplete", sort);
            bind("loadcomplete", filtrate);
            bind("filtercomplete", sort);
        } else {
            unbind("loadcomplete", render);
            bind("loadcomplete", filtrate);
            bind("filtercomplete", render);
        }
        isFilterOn = true;
    }

    this.filterOff = function() {
        if (sorter) {
            unbind("loadcomplete", filtrate);
            unbind("filtercomplete", sort);
            bind("loadcomplete", sort);
        } else {
            unbind("loadcomplete", filtrate);
            unbind("filtercomplete", render);
            bind("loadcomplete", render);
        }
        isFilterOn = false;
        trigger("loadcomplete", [{
            model: {
                records: records
            }
        }]);
        return this;
    };
    this.sort = function(property, direction, isGlobal) {
        var msg = {
            sorter: {
                sortInfo: {
                    property: property,
                    direction: direction,
                    isGlobal: isGlobal
                }
            }
        };
        sort(null, msg);
        return this;
    };

    function sort(e, msg) {
        sorter.sort(msg);
        trigger("sortcomplete", [msg]);
    }

    function sorterOn() {
        if (isFilterOn) {
            unbind("filtercomplete", render);
            bind("filtercomplete", sort);
            bind("sortcomplete", render);
        } else {
            unbind("loadcomplete", render);
            bind("loadcomplete", sort);
            bind("sortcomplete", render);
        }
        bind("rendercomplete", markSortColumn);
        $("th.sortable", element).click(function() {
            var $this = $(this);
            property = $this.attr("data-property");
            direction = !($this.hasClass("asc") || $this.hasClass("desc")) ? ($this.attr("data-default-sort-dir") || "desc") : ($this.hasClass("desc") ? "asc" : "desc");
            self.sort(property, direction, $this.hasClass("global"));
            return false;
        });
    }

    function markSortColumn(e, msg) {
        if (msg.sorter) {
            $("th.sortable", element).removeClass("asc desc");
            $("th[data-property=" + msg.sorter.sortInfo.property + "]", element).addClass(msg.sorter.sortInfo.direction);
            $("tbody td.sorted", element).removeClass("sorted");
            var index = $("thead tr:last th", element).index($('th[data-property="' + msg.sorter.sortInfo.property + '"]', element));
            $("tbody tr td:nth-child(" + (index + 1) + ")", element).addClass("sorted");
        }
    }

    this.highlight = function(mask) {
        if (!isHighlighterOn) {
            highlighterOn();
        }
        var msg = {
            model: {
                records: records
            },
            highlighter: {
                mask: mask
            }
        };
        highlight(null, msg);
        return this;
    };

    function highlight(e, msg) {
        removeHighlight();
        var indexes = highlighter.highlight(msg);
        var highlighted = false;
        for (var i = 0, l = indexes.length; i < l; i++) {
            var $row = $("tbody tr:nth-child(" + (indexes[i] + 1) + ")", element);
            $row.addClass("highlight");
            highlighted = true;
        }
        if (highlighted) {
            scrollToHighlightedIfNotVisible();
        }
    }

    function scrollToHighlightedIfNotVisible() {
        if (!NG.isScrolledIntoView(element)) {
            element[0].scrollIntoView();
        }
    }

    function highlighterOn() {
        bind("rendercomplete", highlight);
        isHighlighterOn = true;
    }

    this.highlighterOff = function() {
        unbind("rendercomplete", highlight);
        isHighlighterOn = false;
        removeHighlight();
        return this;
    };

    function removeHighlight() {
        $("tbody tr", element).removeClass("highlight");
    }

    function bind(name, fn) {
        element.bind(name, fn);
    }

    function unbind(name, fn) {
        element.unbind(name, fn);
    }

    function trigger(name, data) {
        element.triggerHandler(name, data);
    }
}
(function($) {
    $.fn.messageBox = function(options) {
        options = options || {};
        return this.each(function() {
            var $item = $(this);
            var $box;
            var timeToLive = options.timeToLive || 1000;
            var align = options.align || "right";
            var removeAfter = false;
            var messageText = options.messageText || "(Empty)";
            var classes = options.classes || "";
            var icon = options.icon || "";
            if (icon != "") {
                icon = '<span class="with-solo-icon is-default-transparent rc"><span class="ui-icon ' + options.icon + '"/></span></span>';
            }
            if (options.id) {
                removeAfter = true;
                $box = $("#" + options.id).hide();
                $box.append(icon);
            } else {
                var html = [];
                html.push("<div ");
                html.push('class="messageBox" >');
                html.push('<span class="rc text ' + classes + '">' + messageText + "</span>");
                html.push("</div>");
                $box = $(html.join(" "));
            }
            var elementOffset = $item.offset();
            var left = elementOffset.left + (options.leftMargin || 0);
            var top = elementOffset.top + (options.topMargin || 0);
            if (align == "right") {
                left += $item.width();
            }
            if (align == "left") {
                left -= (messageText.length);
            }
            if (align == "top") {
                top -= $item.height();
            }
            if (align == "bottom") {
                top += $item.height();
            }
            $box.css("left", left).css("top", top).appendTo("body").fadeIn();
            if (timeToLive != -1) {
                setTimeout(function() {
                    if (!removeAfter) {
                        $box.remove();
                        return false;
                    }
                    $box.fadeOut();
                }, timeToLive);
            }
        });
    };
})(jQuery);
(function($) {
    $.fn.configPanel = function(options) {
        var activePanel = null;

        function show(id) {
            if (null != activePanel) {
                $(activePanel + "-toggle-button").click();
            }
            var panel = $(id);
            panel.show();
            if (options && options.offsetParent) {
                panel.position({
                    my: "right top",
                    at: "right bottom",
                    of: $(options.offsetParent),
                    offset: "0 3"
                });
            }
            $(id + "-toggle-button").addClass("ui-state-active").blur();
            activePanel = id;
        }

        function hide(id) {
            console.log(id);
            $(id).hide();
            $(id + "-toggle-button").removeClass("ui-state-active").blur();
            activePanel = null;
        }

        return this.each(function() {
            var id = this.id;
            var that = this;
            var $toggleButton = $("#" + id + "-toggle-button");
            $toggleButton.on("click", function() {
                if (!$toggleButton.hasClass("ui-state-active")) {
                    show("#" + id);
                } else {
                    hide("#" + id);
                }
                return false;
            });
            $("#" + id + "-close-button").on("click", function() {
                $("#" + id + "-toggle-button").click();
                return false;
            });
            $("#" + id + "-toggle-button").on("hide", function() {
                console.log("div hidden");
            });
        });
    };
})(jQuery);
(function($) {
    $.fn.accumulate = function(options) {
        options = options || {};

        function view(row) {
            var t = [];
            t.push("<tr>");
            for (var i = 0; i < row.meta.columnCount; i++) {
                t.push('<td style="' + (options["col" + i] && options["col" + i].style ? options["col" + i].style : "") + '">');
                t.push("<strong>");
                if (columnHasFixedDisplay(i)) {
                    t.push(options["col" + i].display);
                } else {
                    if (row.data[i]) {
                        var value = columnHasAverageValue(i) ? (row.data[i].total / (row.data[i].count)) : row.data[i].total;
                        t.push(columnHasFixedDisplayFunction(i) ? options["col" + i].displayFunction(value) : value);
                    }
                }
                t.push("</strong>");
                t.push("</td>");
            }
            t.push("</tr>");
            return t.join("");
        }

        function columnHasAverageValue(i) {
            return options["col" + i] && "average" == options["col" + i].type;
        }

        function columnHasFixedDisplay(i) {
            return options["col" + i] && options["col" + i].display;
        }

        function columnHasFixedDisplayFunction(i) {
            return options["col" + i] && options["col" + i].displayFunction;
        }

        function columnHasAccumulatorFunction(i) {
            return options["col" + i] && options["col" + i].accumulatorFunction;
        }

        return this.each(function() {
            var $this = $(this);
            var rows = $("tbody tr", $this);
            var accumulatedRow = {
                meta: {
                    rowCount: rows.length,
                    columnCount: 0
                },
                data: {}
            };
            rows.each(function() {
                var $columns = $("td", $(this));
                accumulatedRow.meta.columnCount = $columns.length;
                for (var i = 0; i < $columns.length; i++) {
                    var value = $columns[i].innerHTML;
                    if (columnHasAccumulatorFunction(i)) {
                        accumulatedRow.data[i] = options["col" + i].accumulatorFunction(accumulatedRow.data[i], value, $columns, i);
                    } else {
                        if (NG.isNumeric(value)) {
                            if (!accumulatedRow.data[i]) {
                                accumulatedRow.data[i] = {
                                    count: 0,
                                    total: (NG.isFloat(value) ? 0 : 0)
                                };
                            }
                            accumulatedRow.data[i].count++;
                            accumulatedRow.data[i].total += NG.isFloat(value) ? parseFloat(value) : parseInt(value);
                        }
                    }
                }
            });
            $("tbody", $this).append(view(accumulatedRow));
        });
    };
})(jQuery);
(function($) {
    $.fn.fitText = function(options) {
        options = options || {};
        return this.each(function() {
            var $text = $(this);
            var originalText = $text.text();
            var temp = originalText;
            if (options.width < $text.outerWidth()) {
                while (options.width < $text.outerWidth()) {
                    $text.text(temp = temp.substr(0, temp.length - 1));
                }
                $text.text(temp = temp.substr(0, temp.length - 3));
                $text.append("...");
                $text.attr("title", originalText);
            }
        });
    };
})(jQuery);
jQuery.fn.pulse = function(properties, duration, numTimes, interval, fireEvent) {
    if (duration === undefined || duration < 0) {
        duration = 500;
    }
    if (duration < 0) {
        duration = 500;
    }
    if (numTimes === undefined) {
        numTimes = 1;
    }
    if (numTimes < 0) {
        numTimes = 0;
    }
    if (interval === undefined || interval < 0) {
        interval = 0;
    }
    return this.each(function() {
        var $this = jQuery(this);
        var origProperties = {};
        for (property in properties) {
            origProperties[property] = $this.css(property);
        }
        for (var i = 0; i < numTimes; i++) {
            var id = window.setTimeout(function() {
                $this.animate(properties, {
                    duration: duration / 2,
                    complete: function() {
                        $this.animate(origProperties, duration / 2);
                    }
                });
            }, (duration + interval) * i);
        }
    });
};
jQuery.curCSS = jQuery.css;
/*
 * Copyright (c) 2009 Next-Game Ltd.
 */
function isBlank(value) {
    return 0 == value.replace(/\s+/g, "").length;
}
var NG = {
    renderDustTemplate: function(templateName, data, callback) {
        NG.loadDustTemplate(templateName, function() {
            dust.render(templateName, data, function(err, out) {
                if (err) {
                    console.log("Dust render error: {0}".format(err));
                    return;
                }
                if (callback) {
                    callback(out);
                }
            });
        });
    },
    loadDustTemplate: function(templateName, callback) {
        if (dust.cache[templateName]) {
            if (callback) {
                callback();
            }
            return;
        } else {
            if (!dust.lockLoad) {
                dust.lockLoad = {};
            }
            if (!dust.lockLoad[templateName]) {
                dust.lockLoad[templateName] = true;
                $.get("/js/templates/" + templateName + ".tl", function(templateData) {
                    if (!dust) {
                        dust.lockLoad[templateName] = false;
                        console.log("Dust is not loaded.. dust please..");
                        return;
                    }
                    if (!dust.cache[templateName]) {
                        var compiled = dust.compile(templateData, templateName);
                        dust.loadSource(compiled);
                    }
                    if (callback) {
                        callback();
                    }
                    dust.lockLoad[templateName] = false;
                });
            } else {
                setTimeout(function() {
                    NG.loadDustTemplate(templateName, callback, 0);
                }, 100);
            }
        }
    },
    querystring: function(o) {
        if (!o) {
            return "";
        }
        o = NG.sortByFieldName(o);
        var a = [];
        for (p in o) {
            if (null != o[p] && undefined !== o[p]) {
                a.push(p + "=" + o[p]);
            }
        }
        return a.join("&");
    },
    sortByFieldName: function(o, isDescending) {
        var sortable = [];
        sorted = {};
        for (var field in o) {
            sortable.push(field);
        }
        sortable.sort();
        for (var i = 0; i < sortable.length; i++) {
            sorted[sortable[i]] = o[sortable[i]];
        }
        return !isDescending ? sorted : sorted.reverse();
    },
    sortByFieldValue: function(o, isDescending) {
        var invertedObject = NG.invert(o);
        var sortedInvertedObjectByValue = NG.sortByFieldName(invertedObject, isDescending);
        return NG.invert(sortedInvertedObjectByValue);
    },
    remove: function(o, p) {
        var result = o[p];
        delete o[p];
        return result;
    },
    isFunction: function(o) {
        return Object.prototype.toString.call(o) === "[object Function]";
    },
    isArray: function(o) {
        return Object.prototype.toString.call(o) === "[object Array]";
    },
    toArray: (function(slice) {
        return function toArray(object) {
            return slice.call(object, 0);
        };
    })(Array.prototype.slice),
    binarySearch: function(o, v, i, f) {
        var h = o.length,
            l = -1,
            m;
        if (NG.isFunction(f)) {
            while (h - l > 1) {
                m = (h + l) >> 1;
                if (f(o[m]) < v) {
                    l = m;
                } else {
                    h = m;
                }
            }
            return (undefined !== o[h]) ? (f(o[h]) != v ? i ? h : -1 : h) : (i ? h : -1);
        } else {
            while (h - l > 1) {
                m = (h + l) >> 1;
                if (o[m] < v) {
                    l = m;
                } else {
                    h = m;
                }
            }
            return o[h] != v ? i ? h : -1 : h;
        }
    },
    indexOf: function(array, value, from, callback) {
        var len = array.length >>> 0;
        var from = Number(from) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) {
            from += len;
        }
        if (callback) {
            for (; from < len; from++) {
                if (from in array && callback(array[from]) === value) {
                    return from;
                }
            }
        } else {
            for (; from < len; from++) {
                if (from in array && array[from] === value) {
                    return from;
                }
            }
        }
        return -1;
    },
    trim: function(str) {
        var str = str.replace(/^\s\s*/, ""),
            ws = /\s/,
            i = str.length;
        while (ws.test(str.charAt(--i))) {}
        return str.slice(0, i + 1);
    },
    async: function(fun, scope) {
        setTimeout(function() {
            fun.call(scope);
        }, 1);
    },
    setTimeout: function(fun, timeout, scope) {
        return setTimeout(function() {
            fun.call(scope);
        }, timeout);
    },
    clearTimeout: function(timeoutId) {
        clearTimeout(timeoutId);
        delete timeoutId;
    },
    clearTimeoutByRef: function(object, property) {
        clearTimeout(object[property]);
        delete object[property];
    },
    replaceHtml: function(el, html) {
        var oldEl = el;
        /*@cc_on // Pure innerHTML is slightly faster in IE
         oldEl.innerHTML = html;
         return oldEl;
         @*/
        var newEl = oldEl.cloneNode(false);
        newEl.innerHTML = html;
        oldEl.parentNode.replaceChild(newEl, oldEl);
        return newEl;
    },
    isNumeric: function(input) {
        var RE = /^-{0,1}\d*\.{0,1}\d+$/;
        return (RE.test(input));
    },
    numberIsGreaterThan: function(value, opponentValue) {
        if (!(IsNumeric(value) && IsNumeric(opponentValue))) {
            return false;
        }
        return parseFloat(opponentValue) < parseFloat(value);
    },
    isFloat: function(input) {
        return /\./.test(input.toString());
    },
    roundNumber: function(number, precision, keepDotsAndZeros) {
        precision = precision || 0;
        var result = String(Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision));
        if (result.indexOf(".") < 0) {
            result += ".";
        }
        while (result.length - result.indexOf(".") <= precision) {
            result += "0";
        }
        if (precision != 0) {
            if (keepDotsAndZeros) {
                return result;
            } else {
                return parseFloat(result).toFixed(precision) / 1;
            }
        } else {
            return parseInt(result);
        }
    },
    roundNumberAsString: function(number, precision) {
        precision = precision || 0;
        var result = String(Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision));
        if (result.indexOf(".") < 0) {
            result += ".";
        }
        while (result.length - result.indexOf(".") <= precision) {
            result += "0";
        }
        return 0 != precision ? parseFloat(Math.round(result * 100) / 100).toFixed(precision) : parseInt(result);
    },
    flattenJson: function(json) {
        var nj = {},
            walk = function(j) {
                var jp;
                for (var prop in j) {
                    jp = j[prop];
                    if (jp.toString() === "[object Object]") {
                        walk(jp);
                    } else {
                        nj[prop] = jp;
                    }
                }
            };
        walk(json);
        return nj;
    },
    getAverage: function(value, total, precision) {
        if (0 == total) {
            return 0;
        }
        return NG.roundNumber(value / total, precision);
    },
    percentage: function(number, whole, inverse, rounder) {
        whole = parseFloat(whole);
        if (!whole) {
            whole = 100;
        }
        number = parseFloat(number);
        if (!number) {
            number = 0;
        }
        if (!whole || !number) {
            return 0;
        }
        rounder = parseFloat(rounder);
        rounder = (rounder && (!(rounder % 10) || rounder == 1)) ? rounder : 100;
        return (!inverse) ? NG.roundNumber(((number * 100) / whole) * rounder, rounder) / rounder : NG.roundNumber(((whole * number) / 100) * rounder) / rounder;
    },
    getPercentage: function(value, total) {
        if (!value || !total) {
            return 0;
        }
        if (0 == total) {
            return 0;
        }
        return NG.roundNumber(100 * value / total);
    },
    JsonLength: function(obj) {
        if (!obj) {
            return 0;
        }
        var i = 0;
        for (var attr in obj) {
            i++;
        }
        return i;
    },
    sortNumeric: function(a, b) {
        if (!NG.isNumeric(a)) {
            a = -1;
        }
        if (!NG.isNumeric(b)) {
            b = -1;
        }
        return a - b;
    },
    sortTextAsc: function(a, b) {
        return a > b;
    },
    getDisplayNameByValue: function(o, value) {
        if (!o) {
            return null;
        }
        for (var f in o) {
            if (o[f] == value) {
                return f;
            }
        }
    },
    isScrolledIntoView: function($selector) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $selector.offset().top;
        var elemBottom = elemTop + $selector.height();
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    },
    invert: function(obj) {
        var new_obj = {};
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                new_obj[obj[prop]] = prop;
            }
        }
        return new_obj;
    },
    reverse: function(oObject) {
        var oResult, sKey, bErrorFound = false;
        if (Object.prototype.toString.call(oObject) === "[object Object]") {
            oResult = {};
            for (sKey in oObject) {
                if (oObject.hasOwnProperty(sKey) && !bErrorFound) {
                    bErrorFound = oObject[sKey] instanceof Object;
                    if (!bErrorFound) {
                        if (oResult[oObject[sKey]] === undefined) {
                            oResult[oObject[sKey]] = sKey;
                        } else {
                            if (!Object.prototype.toString.call(oResult[oObject[sKey]]) === "[object Array]") {
                                oResult[oObject[sKey]] = [oResult[oObject[sKey]]];
                            }
                            oResult[oObject[sKey]].push(sKey);
                        }
                    } else {
                        oResult = undefined;
                    }
                }
            }
        } else {
            oResult = oObject;
        }
        return oResult;
    }
};
NG.Events = (function() {
    var $NGEVENTS = "$NGEVENTS";
    var prepare = function(fn) {
        return function(obj, type, arg, scope) {
            if (typeof type == "object") {
                for (var k in type) {
                    arguments.callee(obj, k, type[k]);
                }
            } else {
                var events = obj[$NGEVENTS] = obj[$NGEVENTS] || {},
                    storage = events[type] = events[type] || {
                        listeners: []
                    };
                fn(obj, type, arg, storage, scope);
            }
        };
    };
    var add = prepare(function(obj, type, fn, storage, scope) {
        var listeners = storage.listeners;
        for (var i = listeners.length; i--;) {
            if (listeners[i] == fn) {
                return;
            }
        }
        listeners.push({
            fn: fn,
            scope: scope || obj
        });
        return;
    });
    var remove = prepare(function(obj, type, fn, storage) {
        var listeners = storage.listeners;
        for (var i = listeners.length; i--;) {
            if (listeners[i].fn === fn) {
                listeners.splice(i, 1);
                break;
            }
        }
    });
    var fire = prepare(function(obj, type, args, storage) {
        if (!args || Object.prototype.toString.call(args) !== "[object Array]") {
            args = [args];
        }
        for (var i = 0, l = storage.listeners.length; i < l; i++) {
            storage.listeners[i].fn.apply(storage.listeners[i].scope, args);
        }
    });
    var addGlobal = function(type, fn, scope) {
        add(window, type, fn, scope);
    };
    var removeGlobal = function(type, fn) {
        remove(window, type, fn);
    };
    var fireGlobal = function(type, args) {
        fire(window, type, args);
    };
    var addOnce = prepare(function(obj, type, fn, storage) {
        add(obj, type, function() {
            remove(obj, type, arguments.callee);
            fn.apply(obj, arguments);
        });
    });
    var toggle = prepare(function(obj, type, fn, storage, toggle) {
        (toggle ? add : remove)(obj, type, fn);
    });
    return {
        add: add,
        remove: remove,
        fire: fire,
        addGlobal: addGlobal,
        removeGlobal: removeGlobal,
        fireGlobal: fireGlobal,
        addOnce: addOnce,
        toggle: toggle
    };
})();
NG.Timer = function() {
    var self, to, cb, scp, intervalId = -1;
    this.set = function(timeout, callback, scope) {
        to = (parseInt(timeout, 10) || -1);
        cb = callback;
        scp = scope;
        if (to < 0) {
            return;
        }
        cb.call(scp, to);
        if (0 == to) {
            return;
        }
        self = this;
        intervalId = setInterval(function() {
            if (0 == --to) {
                self.reset();
            }
            cb.call(scp, to);
        }, 1000);
    };
    this.reset = function() {
        clearInterval(intervalId);
        intervalId = -1;
    };
    this.active = function() {
        return (-1 < intervalId);
    };
    this.pause = function() {
        clearInterval(intervalId);
    };
    this.resume = function() {
        this.set(to, cb, scp);
    };
};
NG.Clock = {
    _date: null,
    _timezoneOffset: null,
    init: function(utc, offset) {
        var self = this;
        this._date = new Date(utc.valueOf() + offset * 60000);
        this._timezoneOffset = offset;
        setInterval(function() {
            self._date = new Date(self._date.valueOf() + 1000);
            if (0 == self._date.getSeconds()) {
                NG.Events.fire(self, "minutetick", [new Date(self._date.valueOf())]);
            }
        }, 1000);
    },
    now: function() {
        return new Date(this._date.valueOf());
    },
    utcNow: function() {
        return new Date(this._date.valueOf() - this._timezoneOffset * 60000);
    }
};
NG.Calendar = function(now) {
    var self = this,
        mode = arguments[1] || "Day",
        mask = arguments[2],
        date = now,
        isDaily = ("Day" == mode),
        isWeekly = ("Week" == mode),
        isMonthly = ("Month" == mode),
        dayList = [],
        min = arguments[3] || new Date(2000, 0, 1),
        max = arguments[4] || new Date(2012, 11, 31);
    if (hasMask()) {
        for (var year in mask) {
            if (String(year >>> 0) == year && year >>> 0 != 4294967295) {
                for (var month in mask[year]) {
                    if (String(month >>> 0) == month && month >>> 0 != 4294967295) {
                        for (var day in mask[year][month]) {
                            if (String(day >>> 0) == day && day >>> 0 != 4294967295) {
                                dayList.push(new Date(year >>> 0, month >>> 0, day >>> 0).valueOf());
                            }
                        }
                    }
                }
            }
        }
        setMaskedDate(date);
    }
    date.setMilliseconds = date.setSeconds = date.setMinutes = date.setHours = 0;
    if (isWeekly) {} else {
        if (isMonthly) {}
    }

    function setMaskedDate(datep) {
        var search = new Date(datep.getFullYear(), datep.getMonth(), datep.getDate()).valueOf();
        if ("undefined" == typeof(dayList[search])) {
            date = new Date(dayList[getDayIndex(dayList, search)]);
        }
    }

    function addDays(num) {
        date.setDate(date.getDate() + num);
    }

    function addWeeks(num) {
        addDays(num * 7);
    }

    function addMonths(num) {
        var tmpdtm = date.getDate();
        date.setMonth(date.getMonth() + num);
        if (tmpdtm > date.getDate()) {
            addDays(-date.getDate());
        }
    }

    function fire() {
        NG.Events.fire(self, "datechanged", []);
    }

    function getDayIndex(list, value) {
        var i = -1,
            search = new Date(value),
            found = false;
        if (isMonthly) {
            search = search.getStartOfMonth();
        }
        if (isWeekly) {
            search = search.getStartOfWeek();
        }
        search = search.valueOf();
        for (var k = 0; k < list.length; k++) {
            if (search <= list[k]) {
                i = k;
                found = true;
                break;
            }
        }
        if (!found) {
            i = list.length - 1;
        }
        return i;
    }

    function hasMask() {
        var hasValue = false;
        for (var value in mask) {
            hasValue = true;
            break;
        }
        return mask && "undefined" != typeof(mask) && hasValue;
    }

    this.hasMask = function() {
        return hasMask();
    };
    this.mask = function() {
        return mask;
    };
    this.min = function() {
        return min;
    };
    this.max = function() {
        return max;
    };
    this.mode = function() {
        return mode;
    };
    this.isDaily = function() {
        return isDaily;
    };
    this.isWeekly = function() {
        return isWeekly;
    };
    this.isMonthly = function() {
        return isMonthly;
    };
    this.getDate = function() {
        return date;
    };
    this.setDate = function(datep) {
        if (hasMask()) {
            setMaskedDate(datep);
        } else {
            date = datep;
        }
        fire();
    };
    this.previousEnabled = function() {
        return min < (isWeekly ? date.getStartOfWeek() : (isMonthly ? date.getStartOfMonth() : date));
    };
    this.nextEnabled = function() {
        return (isWeekly ? date.getEndOfWeek() : (isMonthly ? date.getEndOfMonth() : date)) < max;
    };
    this.previous = function() {
        this["previous" + mode]();
        fire();
    };
    this.next = function() {
        this["next" + mode]();
        fire();
    };
    this.previousDay = function() {
        if (this.hasMask()) {
            var i = getDayIndex(dayList, date.valueOf());
            if (0 < i) {
                date = new Date(dayList[i - 1]);
            }
        } else {
            addDays(-1);
        }
        return date;
    };
    this.nextDay = function() {
        if (this.hasMask()) {
            var i = getDayIndex(dayList, date.valueOf());
            if (i < dayList.length - 1) {
                date = new Date(dayList[i + 1]);
            }
        } else {
            addDays(1);
        }
        return date;
    };
    this.previousWeek = function() {
        if (this.hasMask()) {
            var i = getDayIndex(dayList, date.valueOf()),
                week = date.getWeek(),
                newWeek = week;
            if (0 == i) {
                return;
            }
            var temp = new Date(dayList[i - 1]);
            while (week == newWeek) {
                if (0 < i) {
                    temp = new Date(dayList[--i]);
                    newWeek = temp.getWeek();
                } else {
                    break;
                }
            }
            if (week != newWeek) {
                date = temp;
            }
        } else {
            addWeeks(-1);
        }
        return date;
    };
    this.nextWeek = function() {
        if (this.hasMask()) {
            var i = getDayIndex(dayList, date.valueOf()),
                week = date.getWeek(),
                newWeek = week;
            if (dayList.length - 1 == i) {
                return;
            }
            var temp = new Date(dayList[i + 1]);
            while (week == newWeek) {
                if (i < dayList.length - 1) {
                    temp = new Date(dayList[++i]);
                    newWeek = temp.getWeek();
                } else {
                    break;
                }
            }
            if (week != newWeek) {
                date = temp;
            }
        } else {
            addWeeks(1);
        }
        return date;
    };
    this.previousMonth = function() {
        if (this.hasMask()) {
            var i = getDayIndex(dayList, date.valueOf()),
                month = date.getMonth(),
                newMonth = month;
            if (0 == i) {
                return;
            }
            var temp = new Date(dayList[i - 1]);
            while (month == newMonth) {
                if (0 < i) {
                    temp = new Date(dayList[--i]);
                    newMonth = temp.getMonth();
                } else {
                    break;
                }
            }
            if (month != newMonth) {
                date = temp;
            }
        } else {
            addMonths(-1);
        }
        return date;
    };
    this.nextMonth = function() {
        if (this.hasMask()) {
            var i = getDayIndex(dayList, date.valueOf()),
                month = date.getMonth(),
                newMonth = month;
            if (dayList.length - 1 == i) {
                return;
            }
            var temp = new Date(dayList[i + 1]);
            while (month == newMonth) {
                if (i < dayList.length - 1) {
                    temp = new Date(dayList[++i]);
                    newMonth = temp.getMonth();
                } else {
                    break;
                }
            }
            if (month != newMonth) {
                date = temp;
            }
        } else {
            addMonths(1);
        }
        return date;
    };
    this.parameter = function() {
        if (isDaily) {
            return {
                d: date.dateFormat("Ymd")
            };
        }
        if (isWeekly) {
            return {
                d: date.getWeekYear() + "W" + date.getWeek()
            };
        }
        if (isMonthly) {
            return {
                d: date.dateFormat("Ym")
            };
        }
    };
    this.formatDate = function() {
        if (isDaily) {
            return date.dateFormat("D, M j Y");
        }
        if (isWeekly) {
            return formatWeek(date);
        }
        if (isMonthly) {
            return date.dateFormat("M Y");
        }
    };

    function formatWeek(date) {
        var start = new Date(date.valueOf()).getStartOfWeek(),
            end = new Date(start.valueOf() + 6 * 24 * 60 * 60 * 1000);
        if (start.getMonth() == end.getMonth()) {
            return start.dateFormat("j") + " - " + end.dateFormat("j M Y");
        } else {
            return start.dateFormat("j M") + " - " + end.dateFormat("j M Y");
        }
    }
};
NG.GA = {
    _tracker: null,
    init: function(code, domainName) {
        try {
            this._tracker = _gat._getTracker(code);
            if ("undefined" != domainName) {
                this._tracker._setDomainName(domainName);
            }
        } catch (err) {}
    },
    trackPageView: function(view) {
        if (null != this._tracker) {
            if ("undefined" != typeof view) {
                this._tracker._trackPageview(view);
            } else {
                this._tracker._trackPageview();
            }
        }
    },
    trackEvent: function(category, action, opt_label, opt_value) {
        if ("BreadcrumbNav" == category) {
            return;
        }
        if (null != this._tracker) {
            if ("undefined" != typeof opt_label && "undefined" != typeof opt_value) {
                this._tracker._trackEvent(category, action, opt_label, opt_value);
            } else {
                if ("undefined" != typeof opt_label && "undefined" == typeof opt_value) {
                    this._tracker._trackEvent(category, action, opt_label);
                } else {
                    this._tracker._trackEvent(category, action);
                }
            }
        }
    }
};
var DataStore = function() {
    var cache = {};
    var prime = {};

    function put(key, value, expire) {
        cache[key] = value;
        if (expire) {
            setTimeout(function() {
                delete cache[key];
            }, expire);
        }
    }

    return {
        prime: function(key, parameters, data) {
            var url = Urls.get(key, parameters);
            prime[url] = data;
        },
        load: function(key, options, scope) {
            var options = options || {},
                url = Urls.get(key, options.parameters),
                result = prime[url];
            if (result) {
                if (options.cache) {
                    put(url, result, options.expire);
                }
                delete prime[url];
                if (options.success) {
                    options.success.call(scope || this, options, result);
                    return;
                }
                return result;
            }
            if (options.cache) {
                result = cache[url];
                if (result) {
                    if (options.success) {
                        options.success.call(scope || this, options, result);
                        return;
                    }
                    return result;
                } else {
                    this.ajax(url, options, scope);
                }
            } else {
                delete cache[url];
                this.ajax(url, options, scope);
            }
        },
        ajax: function(url, options, scope) {
            var self = this,
                request = $.ajax({
                    type: "get",
                    url: url,
                    data: null,
                    dataType: "text",
                    cache: true,
                    global: false,
                    success: function() {
                        self.successCallback.apply(scope, [url, options].concat(NG.toArray(arguments)));
                    },
                    error: function() {
                        self.errorCallback.apply(scope, [url, options].concat(NG.toArray(arguments)));
                    },
                    options: options
                });
            $(window).bind("beforeunload", function() {
                request.abort();
            });
        },
        successCallback: function(url, options, data, textStatus) {
            if (options.dataType && "array" == options.dataType) {
                var processedData;
                try {
                    processedData = (new Function("return " + data))();
                } catch (err) {}
                if (NG.isArray(processedData)) {
                    if (options.cache) {
                        put(url, processedData, options.expire);
                    }
                    if (options.success) {
                        options.success.call(this, options, processedData);
                    } else {
                        return processedData;
                    }
                } else {
                    options.error.call(this, options);
                }
                return;
            }
            if (options.success) {
                options.success.call(this, options, data);
            } else {
                return data;
            }
        },
        errorCallback: function(url, options, XMLHttpRequest, textStatus, errorThrown) {
            if (options.error) {
                options.error.call(this, options);
            }
        }
    };
}();
WS = {};
WS.Clock = {
    init: function(clock) {
        this.updateDateTime(clock.now());
        NG.Events.add(clock, "minutetick", this.updateDateTime);
    },
    updateDateTime: function(date) {
        $clock = $("#clock");
        $("#time", $clock).html(date.toTimeStr());
        $("#date", $clock).html(date.toDateString());
    }
};

function IsNumeric(input) {
    var RE = /^-{0,1}\d*\.{0,1}\d+$/;
    return (RE.test(input));
}
WS.FavoriteTournaments = function() {
    var favoritesCount = 0,
        favoritesLimit = 10,
        favoriteTournamentIds;
    var ftAddedMessageOptions = {
        icon: "icon-circle-check",
        messageText: "Added to your favourites.",
        classes: "favorite-tournaments-added-message",
        leftMargin: 5
    };
    var ftLimitMessageOptions = {
        icon: "icon-alert",
        messageText: "At most " + favoritesLimit + " tournaments can be added to your favourites.",
        timeToLive: 1500,
        classes: "favorite-tournaments-limit-message",
        leftMargin: 5
    };
    var ftSignInMessageOptions = {
        icon: "icon-alert",
        messageText: '<a target="_parent" href="/Accounts/Login?originalUrl=' + window.location.pathname + '" id="login">Sign in</a> or <a target="_parent" href="/Accounts/Register?originalUrl=' + window.location.pathname + '" id="register">Join us</a> to add this tournament to your favourites.',
        timeToLive: 5000,
        classes: "favorite-tournaments-signin-message",
        leftMargin: 5
    };
    var ftDuplicateMessageOptions = {
        icon: "icon-alert",
        messageText: "Tournament is already your favorite.",
        timeToLive: 1500,
        classes: "favorite-tournaments-duplicate-message",
        leftMargin: 5
    };
    var ftInfoMessageOptions = {
        id: "favorite-tournaments-info-message",
        timeToLive: -1
    };

    function getTournamentById(id) {
        for (var i = 0, l = allRegions.length; i < l; i++) {
            for (var j = 0, m = allRegions[i].tournaments.length; j < m; j++) {
                if (id == allRegions[i].tournaments[j].id) {
                    tournament = allRegions[i].tournaments[j];
                    tournament.flg = allRegions[i].flg;
                    tournament.regionName = allRegions[i].name;
                    return tournament;
                }
            }
        }
    }

    function createTournament(tournament) {
        if (null != tournament) {
            var clone = $('<li class="hover-target"><a class="pt iconize iconize-icon-left" href="' + tournament.url + '" title="' + tournament.regionName + '">' + tournament.name + '<span class="ui-icon country ' + tournament.flg + '"></span></a><div class="toolbar"></div></li>');
            addButton(clone, "remove", "trash", "Remove from favourites", function() {
                removeFavoriteTournament(clone);
            });
            favoritesCount++;
            return clone;
        }
    }

    function addFavoriteTournament(tournament, $trigger) {
        if (gIdentified) {
            if (favoritesCount == 0) {
                $("#my-favorites-note").hide();
            }
            if (favoritesCount < favoritesLimit) {
                var favoriteTournamentIdsTable = favoriteTournamentIds.hashtable();
                if (!favoriteTournamentIdsTable[tournament.id]) {
                    createTournament(tournament).appendTo($("#favorite-tournaments-list"));
                    $trigger.messageBox(ftAddedMessageOptions);
                    NG.Events.fireGlobal("favoritetournamentsupdate", tournament.id);
                    NG.Events.fireGlobal("favouritetournamentadded-" + tournament.id);
                    NG.GA.trackEvent("MyFavourites", "Add", tournament.url);
                } else {
                    $trigger.messageBox(ftDuplicateMessageOptions);
                }
            } else {
                $trigger.messageBox(ftLimitMessageOptions);
            }
        } else {
            if (0 == $(".favorite-tournaments-signin-message").length) {
                $trigger.messageBox(ftSignInMessageOptions);
            }
        }
    }

    function removeFavoriteTournament($item) {
        $item.remove();
        favoritesCount--;
        if (0 == favoritesCount) {
            $("#my-favorites-note").show();
        }
        NG.Events.fireGlobal("favoritetournamentsupdate", getTournamentId($item));
        NG.Events.fireGlobal("favouritetournamentremoved-" + getTournamentId($item));
        NG.GA.trackEvent("MyFavourites", "Remove", $item.find("a").attr("href"));
    }

    function addPlusButton($li) {
        addButton($li, "add", "star", "Add to favourites", function() {
            addFavoriteTournament(getTournamentById(getTournamentId($li)), $li);
        });
    }

    function addButton($li, css, iconType, title, onClick) {
        var $toolBar = $(".toolbar", $li);
        $button = $toolBar.append('<a class="' + css + ' button-small ui-state-transparent-default" href="#" title="' + title + '"><span class="ui-icon ui-icon-' + iconType + '"></span></a>');
        $("." + css, $toolBar).click(function(e) {
            e.preventDefault();
            if (onClick) {
                onClick();
            }
        });
    }

    function getTournamentId($li) {
        return stripTournamentIdFromHref($li.find("a.pt, a.t").attr("href"));
    }

    function stripTournamentIdFromHref(href) {
        var re = /Tournaments\/(\d*)/;
        var id = href.match(re)[1];
        return id;
    }

    function addTournamentById(tournamentId, $trigger) {
        addFavoriteTournament(getTournamentById(tournamentId), $trigger);
    }

    this.stripTournamentIdFromHref = function(href) {
        return stripTournamentIdFromHref(href);
    };
    this.initX = function(panel) {
        $(panel).on("click", "ul.regions li a.r", function() {
            $a = $(this);
            var tournaments = $a.addClass("e").blur().parent().find("ul.tournaments");
            if (tournaments.is(":visible")) {
                $a.removeClass("e").blur().parent().find("ul.tournaments").hide();
            } else {
                tournaments.show();
                if (!$a.data("decorated")) {
                    $a.parent().find("ul.tournaments li").each(function() {
                        addPlusButton($(this));
                    });
                    $a.data("decorated", true);
                }
            }
            return false;
        });
    };
    this.init = function() {
        NG.Events.addGlobal("favoritetournamentsupdate", function() {
            var id, ids = [];
            $("#favorite-tournaments-list a.pt").each(function() {
                var href = $(this).attr("href");
                id = stripTournamentIdFromHref(href);
                ids.push(id);
            });
            WS.User.favoriteTournaments(ids);
            favoriteTournamentIds = ids;
        });
        favoriteTournamentIds = WS.User.favoriteTournaments();
        if (0 < favoriteTournamentIds.length) {
            $("#my-favorites-note").hide();
            var idIndexes = favoriteTournamentIds.indextable();
            var $favLis = [];
            favoriteTournamentIds.forEach(function(id) {
                if (!IsNumeric(id)) {
                    return;
                }
                var tournament = getTournamentById(id);
                $favLis[idIndexes[id]] = createTournament(tournament);
            });
            var favouriteTournamentslist = $("#favorite-tournaments-list");
            $favLis.forEach(function(t) {
                t.appendTo(favouriteTournamentslist);
            });
        } else {
            $("#my-favorites-note").show();
        }
        $("#favorite-tournaments-list li a span.country").click(function() {
            return false;
        });

        function closeTournamentNavigationHandler(e) {
            console.log(e.keyCode);
        }

        $("#tournament-nav-popup").show();
        var tablesTabsSetup = $.extend({}, $.fn.tabs.base);
        tablesTabsSetup.activate.unshift(function(options) {
            var init = options.init;
            var activate = options.activate;
            this.bind("activated", function(e, selected) {
                var fn = init && init[$(selected).attr("href")];
                if (fn) {
                    if (!$(selected).data("initialized")) {
                        fn();
                        $(selected).data("initialized", true);
                    }
                }
                if (activate && activate[$(selected).attr("href")]) {
                    activate[$(selected).attr("href")]();
                }
            });
        });
        $("#tournament-groups").tabs({
            setup: tablesTabsSetup,
            defaultTab: (0 < WS.User.favoriteTournaments().length) ? "#favourites" : "#popular",
            activate: {
                "#domestic": function() {},
                "#international": function() {}
            },
            init: {
                "#favorites": function() {},
                "#popular": function() {
                    $("#popular").find("#popular-tournaments-list li").each(function() {
                        addPlusButton($(this));
                    });
                },
                "#domestic": function() {
                    var model = allRegions.filter(function(e) {
                        return 0 == e.type;
                    });

                    function createIndex(model) {
                        function getMask() {
                            var mask = [],
                                index = 0;
                            for (var i = 0; i < model.length; i++) {
                                if (-1 == mask.indexOf(model[i].name.charAt(0))) {
                                    mask[index++] = model[i].name.charAt(0);
                                }
                            }
                            mask[index++] = "All";
                            return mask;
                        }

                        function render(mask) {
                            var t = [];
                            mask.forEach(function(o) {
                                t.push('<dd><a data-value="' + o + '" href="#" class="option">' + o + "</a></dd>");
                            });
                            return t.join("");
                        }

                        function init() {
                            var mask = getMask();
                            $index = $("#domestic-index");
                            $index.html(render(mask));
                            $(".option", $index).on("click", function(e) {
                                e.preventDefault();
                                $(".option.selected", $index).removeClass("selected");
                                $(this).addClass("selected").blur();
                                NG.Events.fireGlobal("domesticindexselected", [$(this).attr("data-value")]);
                            });
                            $(".option:first", $index).click();
                        }

                        init();
                    }

                    function updateRegions(index) {
                        var regions = ("All" == index) ? model : model.filter(function(o) {
                            return index == o.name.charAt(0);
                        });
                        var colCount = 5;
                        var itemsPerColCount = Math.ceil(regions.length / colCount);
                        var currentRegionIdx = 0;
                        var currentRegion = null;
                        var idxHtml = "";
                        var html = "";
                        for (var i = 0; i < colCount; i++) {
                            html += '<div class="region-column"><ul class="regions">';
                            for (var j = 0; j < itemsPerColCount; j++) {
                                if (currentRegionIdx == regions.length) {
                                    break;
                                }
                                currentRegion = regions[currentRegionIdx];
                                html += "<li >" + idxHtml + '<a class="r iconize iconize-icon-left" href="#"><span class="ui-icon country ' + currentRegion.flg + '"></span>' + currentRegion.name + "</a>" + '<ul class="tournaments" style="display: none">';
                                for (var l = 0; l < currentRegion.tournaments.length; l++) {
                                    html += '<li class="hover-target"><a class="t" href="' + currentRegion.tournaments[l].url + '">' + currentRegion.tournaments[l].name + '</a><div class="toolbar"></div></li>';
                                }
                                html += "</ul>" + "</li>";
                                currentRegionIdx++;
                            }
                            html += "</ul></div>";
                        }
                        $("#domestic-regions").html(html);
                    }

                    NG.Events.addGlobal("domesticindexselected", function(index) {
                        updateRegions(index);
                    });
                    createIndex(model);
                    favoriteTournaments.initX("#domestic");
                },
                "#international": function() {
                    var regions = allRegions.filter(function(e) {
                        return 1 == e.type;
                    });
                    var colCount = 5;
                    var itemsPerColCount = Math.ceil(regions.length / colCount);
                    var currentRegionIdx = 0;
                    var currentRegion = null;
                    var idxHtml = null;
                    var html = "";
                    for (var i = 0; i < colCount; i++) {
                        html += '<div class="region-column"><ul class="regions">';
                        for (var j = 0; j < itemsPerColCount; j++) {
                            if (currentRegionIdx == regions.length) {
                                break;
                            }
                            currentRegion = regions[currentRegionIdx];
                            html += "<li>" + '<a class="r iconize iconize-icon-left" href="#"><span class="ui-icon country ' + currentRegion.flg + '"></span>' + currentRegion.name + "</a>" + '<ul class="tournaments" style="display: none">';
                            for (var l = 0; l < currentRegion.tournaments.length; l++) {
                                html += '<li class="hover-target"><a class="t" href="' + currentRegion.tournaments[l].url + '">' + currentRegion.tournaments[l].name + '</a><div class="toolbar"></div></li>';
                            }
                            html += "</ul>" + "</li>";
                            currentRegionIdx++;
                        }
                        html += "</ul></div>";
                    }
                    $("#international").html(html);
                    favoriteTournaments.initX("#international");
                }
            }
        });
        NG.Events.addGlobal("addFavouriteTournament", function(tournamentId, $trigger) {
            addTournamentById(tournamentId, $trigger);
        });
    };
};
WS.User = {
    persistentOptions: {
        expires: 365,
        path: "/",
        domain: gDomain
    },
    timezoneOffset: function() {
        if (undefined == arguments[0]) {
            var tzo = $.cookie("tzo");
            if (null == tzo) {
                tzo = gUtcOffset;
                $.cookie("tzo", tzo, this.persistentOptions);
            }
            return tzo;
        } else {
            $.cookie("tzo", arguments[0], this.persistentOptions);
        }
    },
    favoriteTournaments: function() {
        if (undefined == arguments[0]) {
            var ft = $.cookie("ft") || "";
            var ids = ((0 < ft.length) ? ft.split(",") : []);
            var numericIds = [];
            for (var i = 0; i < ids.length; i++) {
                if (IsNumeric(ids[i])) {
                    numericIds.push(ids[i]);
                }
            }
            if (ids.length != numericIds.length) {
                $.cookie("ft", numericIds.join(","), this.persistentOptions);
            }
            return numericIds;
        } else {
            var ids = arguments[0].join(",");
            $.ajax({
                type: "POST",
                url: "/Accounts/FavouriteTournaments",
                cache: false,
                data: "ids=" + ids,
                dataType: "json",
                success: function(json) {
                    if (0 == json.ReturnCode) {
                        $.cookie("ft", json.Data, WS.User.persistentOptions);
                    } else {
                        alert(json.Message);
                    }
                },
                error: function() {
                    alert("Error. Please try again.");
                }
            });
        }
    }
};
var Urls = function() {
    var templates = {
        "livescores": "/matchesfeed/",
        "livescoreincidents": "/matchesfeed/{id}/IncidentsSummary/",
        "stagefixtures": "/tournamentsfeed/{stageId}/Fixtures/",
        "teamfixtures": "/teamsfeed/{teamId}/Fixtures/",
        "standings": "/stagesfeed/{stageId}/standings/",
        "forms": "/stagesfeed/{stageId}/forms/",
        "history": "/stagesfeed/{stageId}/history/",
        "streaks": "/stagesfeed/{stageId}/streaks/",
        "goals": "/tournamentsfeed/{stageId}/PlayerStatistics/",
        "cards": "/tournamentsfeed/{stageId}/PlayerStatistics/",
        "team-goals": "/teamsfeed/{teamId}/PlayerStatistics/",
        "team-cards": "/teamsfeed/{teamId}/PlayerStatistics/",
        "previousmeetings": "/teamsfeed/{homeTeamId}/PreviousMeetings/",
        "statistics": "/statisticsfeed/",
        "side-box-statistics": "/statisticsfeed/{statsType}/SideBoxStatistics/",
        "regionteams": "/teamsfeed/{id}/region",
        "ws-stage-stat": "/stagestatfeed/",
        "ws-teams-stage-stat": "/stagestatfeed/{stageId}/stageteams/",
        "ws-stage-filtered-team-stat": "/stagestatfeed/{stageId}/teamsstagefiltered/",
        "ws-teams-filtered-stage-stat": "/stagestatfeed/{stageId}/stageteamsfiltered/",
        "stage-top-player-stats": "/stagestatfeed/{stageId}/stagetopplayers",
        "live-team-stat": "/optamatchstatfeed/",
        "team-fixtures": "/teamsfeed/{teamId}/H2HFixtures/",
        "match-header": "/matchesfeed/{id}/MatchHeader",
        "match-live-update": "/matchesfeed/{id}/LiveMatch",
        "match-commentary": "/matchesfeed/{id}/MatchCommentary",
        "live-player-stats": "/matchesfeed/{id}/LivePlayerStats",
        "betting-stats": "/bettingstatfeed/",
        "overall-player-stat": "/stageplayerstatfeed/{playerId}/Overall",
        "stage-player-stat": "/stageplayerstatfeed/",
        "overall-team-stat": "/stageteamstatfeed/{teamId}/Overall",
        "stage-team-stat": "/stageteamstatfeed/",
        "stage-h2h-player-stat": "/stageplayerstatfeed/{stageId}/H2HTeamPlayers",
        "player-tournament-stat": "/stageplayerstatfeed/{playerId}/PlayerTournamentStats",
        "facts-filter": "/Facts/Data",
        "player-heatmap": "/Players/{id}/Heatmap",
        "match-centre": "/matchesfeed/{id}/MatchCentre",
        "match-centre2": "/matchesfeed/{id}/MatchCentre2",
        "player-tournament-history-stat": "/stageplayerstatfeed/{playerId}/PlayerHistoryTournamentStats"
    };
    return {
        get: function(key, parameters) {
            var re = /\{(\w*)\}/g,
                url = templates[key] + "",
                matches, parametersCopy = $.extend(true, {}, parameters);
            while (matches = re.exec(url)) {
                url = url.replace(matches[0], parametersCopy[matches[1]]);
                delete parametersCopy[matches[1]];
            }
            var queryString = NG.querystring(parametersCopy);
            url = url + ((0 < queryString.length) ? "?" + queryString : "");
            return url;
        }
    };
}();

function DateController(id, calendarp) {
    var $el = $("#" + id),
        calendar = calendarp,
        self = this,
        disabled = false,
        $dateView = $("#" + id + " .date .text");
    setDate();
    NG.Events.add(calendar, "datechanged", function() {
        setDate();
    });

    function previousClickHandler() {
        var $this = $(this).blur();
        if (disabled) {
            return false;
        }
        disabled = true;
        $this.addClass("ui-state-active");
        calendar.previous();
        return false;
    }

    function nextClickHandler() {
        var $this = $(this).blur();
        if (disabled) {
            return false;
        }
        disabled = true;
        $this.addClass("ui-state-active");
        calendar.next();
        return false;
    }

    function nullClickHandler() {
        return false;
    }

    function setDate() {
        if ($dateView) {
            $dateView.text(calendar.formatDate());
            setButtonMode("previous");
            setButtonMode("next");
        }
    }

    function setButtonMode(type) {
        var $button = $("#" + id + " ." + type);
        if (calendar[type + "Enabled"]()) {
            $button.removeClass("is-disabled").addClass("is-default").unbind("click").click("previous" == type ? previousClickHandler : nextClickHandler);
            $button.attr("title", "View " + type + " " + calendar.mode().toLowerCase());
        } else {
            $button.removeClass("is-default is-active").addClass("is-disabled").unbind("click").click(nullClickHandler);
            $button.attr("title", "No data for " + type + " " + calendar.mode().toLowerCase());
        }
    }

    this.enable = function() {
        disabled = false;
        $el.find(".previous.ui-state-active, .next.ui-state-active").removeClass("ui-state-active");
    };
    this.disable = function() {
        disabled = true;
    };
}

function DatePicker(id, calendarp) {
    var $el = $("#" + id),
        calendar = calendarp,
        isWeekly = calendar.isWeekly(),
        isMonthly = calendar.isMonthly(),
        monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        enabled = true,
        self = this;
    this.enable = function() {
        this.enabled = true;
    };
    this.disable = function() {
        this.enabled = false;
    };

    function getMonthName(monthId) {
        return (monthNames[monthId]) ? monthNames[monthId] : "";
    }

    function getDate(year, month, day) {
        var date = new Date(parseInt(year, 10), parseInt(month, 10), parseInt(day, 10) + 1);
        if (date < calendar.min()) {
            return calendar.min();
        }
        if (calendar.max() < date) {
            return calendar.max();
        }
        return date;
    }

    update(calendar.getDate());
    addPresentTimeButton();
    NG.Events.add(calendar, "datechanged", function() {
        update(calendar.getDate());
    });
    this.update = function(date) {
        calendar.setDate(date);
    };

    function update(date) {
        var selectedDate = date,
            years = [],
            months = [],
            days = [],
            $datepicker = $("table.datepicker tr:first", $el);
        if (calendar.hasMask()) {
            if (calendar.mask()[selectedDate.getFullYear()]) {
                for (var year in calendar.mask()) {
                    if (String(year >>> 0) == year && year >>> 0 != 4294967295) {
                        years.push({
                            value: year,
                            text: year,
                            selected: (year == selectedDate.getFullYear()),
                            selectable: true
                        });
                    }
                }
                var selectableMonths = calendar.mask()[selectedDate.getFullYear()];
                var selectableDays = selectableMonths[selectedDate.getMonth()];
                if ("undefined" == typeof(selectableDays)) {
                    var i = 0;
                    while (i < 12 && "undefined" == typeof(selectableMonths[i])) {
                        i++;
                    }
                    selectableDays = selectableMonths[i];
                    selectedDate = new Date(selectedDate.getFullYear(), i, 1);
                }
                for (var i = 0; i < 12; i++) {
                    months.push({
                        value: i,
                        text: i + 1,
                        selected: (i == selectedDate.getMonth()),
                        selectable: "undefined" != typeof(selectableMonths[i])
                    });
                }
                var selectableDaysPrev = selectableMonths[selectedDate.getMonth() - 1],
                    selectableDaysNext = selectableMonths[selectedDate.getMonth() + 1];
                var startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
                    start = -((startDate.getDay() + 6) % 7),
                    end = 42 + start;
                var checkPrev = "undefined" != typeof(selectableDaysPrev) && (start < 0),
                    checkNext = "undefined" != typeof(selectableDaysNext),
                    daysInMonth = startDate.getDaysInMonth();
                for (var i = start; i < end; i++) {
                    var day = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i).getDate();
                    days.push({
                        value: i,
                        text: day,
                        selected: (i == selectedDate.getDate() - 1),
                        selectable: "undefined" != typeof(selectableDays[i + 1]) || (checkPrev && i < 0 && "undefined" != typeof(selectableDaysPrev[day])) || (checkNext && (i >= daysInMonth) && "undefined" != typeof(selectableDaysNext[day]))
                    });
                }
            }
        } else {
            for (var i = calendar.min().getFullYear(); i <= calendar.max().getFullYear(); i++) {
                years.push({
                    value: i,
                    text: i,
                    selected: (i == selectedDate.getFullYear()),
                    selectable: true
                });
            }
            for (var i = 0; i < 12; i++) {
                months.push({
                    value: i,
                    text: i + 1,
                    selected: (i == selectedDate.getMonth()),
                    selectable: true
                });
            }
            var startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
                start = -((startDate.getDay() + 6) % 7),
                end = 42 + start;
            for (var i = start; i < end; i++) {
                days.push({
                    value: i,
                    text: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i).getDate(),
                    selected: (i == selectedDate.getDate() - 1),
                    selectable: true
                });
            }
        }
        var s = [];
        s.push(renderPart(selectedDate, "years", (12 == years.length) ? 4 : 1, years, true));
        s.push(renderPart(selectedDate, "months", 4, months, true));
        if (!isMonthly) {
            s.push(renderPart(selectedDate, "days", 7, days, equals(date, calendar.getDate()), date.getDaysInMonth()));
        }
        $datepicker.text("");
        $datepicker.append(s.join(""));
        if (isWeekly) {
            $(".days tr:has(td.selectable)", $el).addClass("selectable");
            $(".days tr:has(td.selected)", $el).addClass("selected");
        }
    }

    function addPresentTimeButton() {
        var text = isWeekly ? "View current week" : isMonthly ? "View current month" : "View today";
        $("#date-config").append('<div class="present-time iconize iconize-icon-right"><span class="ui-icon ui-icon-arrowreturnthick-1-w"></span>' + text + "</div>");
        $("#date-config .present-time").click(function() {
            setTimeout(function() {
                calendar.setDate(NG.Clock.now());
                return false;
            }, 0);
        });
    }

    function renderPart(selectedDate, className, colCount, a, select, daysInMonth) {
        var s = [];
        var title = ("years" == className) ? (a[0].text + ((a[a.length - 1].text != a[0].text) ? (" - " + a[a.length - 1].text) : "")) : ("months" == className) ? selectedDate.getFullYear() : (getMonthName(selectedDate.getMonth()) + " " + selectedDate.getFullYear());
        s.push('<td class="part">');
        s.push('<div class="part-padding-ie">');
        s.push("<p>" + title + "</p> ");
        s.push(renderTable(className, colCount, a, select, daysInMonth));
        s.push("</div>");
        s.push("</td>");
        return s.join("");
    }

    function renderTable(className, colCount, a, select, daysInMonth) {
        var t = [];
        t.push('<table class="' + className + '">');
        if (daysInMonth) {
            t.push("<thead>");
            t.push('<tr><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th class="">S</th><th class="">S</th></tr>');
            t.push("</thead>");
        }
        t.push("<tbody>");
        for (var i = 0; i < a.length; i++) {
            if (0 == i % colCount) {
                t.push("<tr>");
            }
            t.push('<td class="' + (select && a[i].selected ? " selected" : "") + (a[i].selectable ? " selectable" : "") + (daysInMonth && (a[i].value < 0 || daysInMonth - 1 < a[i].value) ? " om" : "") + '" data-value="' + a[i].value + '">');
            t.push((className == "months") ? getMonthName(a[i].text - 1) : a[i].text);
            t.push("</td>");
            if (colCount - 1 == i % colCount) {
                t.push("</tr>");
            }
        }
        t.push("</tbody></table>");
        return t.join("");
    }

    function equals(a, b) {
        return a.getFullYear() == b.getFullYear() && a.getMonth() == b.getMonth() && a.getDate() == b.getDate();
    }

    $el.on("click", ".years td.selectable", function() {
        if (!self.enabled) {
            return;
        }
        var $this = $(this),
            year = $this.attr("data-value"),
            month = $el.find(".months td.selected").attr("data-value"),
            day = 0,
            date = getDate(year, month, day);
        update(date);
    });
    $el.on("click", ".months td.selectable", function() {
        if (!self.enabled) {
            return;
        }
        var $this = $(this),
            year = $el.find(".years td.selected").attr("data-value"),
            month = $this.attr("data-value"),
            day = 1,
            date = getDate(year, month, day);
        if (isMonthly) {
            calendar.setDate(date);
        } else {
            update(date);
        }
    });
    var selectable = (isWeekly) ? ".days tr:has(td.selectable)" : ".days td.selectable";
    $el.on("click", selectable, function() {
        if (!self.enabled) {
            return;
        }
        var $this = $(this),
            year = $el.find(".years td.selected").attr("data-value"),
            month = $el.find(".months td.selected").attr("data-value"),
            day = (isWeekly) ? $("td:first", $this).attr("data-value") : $this.attr("data-value"),
            date = getDate(year, month, day);
        calendar.setDate(date);
    });
}

function teamIdMaskFn(obj) {
    return obj["TeamId"];
}
var ViewUtil = {
    zeroFilter: function(value) {
        return (0 == value) ? "." : value;
    },
    zeroClass: function(value) {
        if (0 == value) {
            return " nil";
        }
        return "";
    }
};
var gridDefaults = {
    filter: {
        maskFn: teamIdMaskFn
    },
    sorter: {
        sortInfo: {
            property: "O",
            direction: "asc"
        }
    },
    highlighter: {
        maskFn: teamIdMaskFn
    }
};

function GoalStatsModel(config) {
    var config = config || {};
    var dataLoaded = {
        "Overall": false,
        "Home": false,
        "Away": false
    };
    this.load = function(parameters) {
        var parametersCopy = $.extend({}, config.defaultParameters, parameters);
        var records;
        DataStore.load("goals", {
            parameters: parametersCopy,
            cache: config.cache,
            success: function(options, data) {
                if (!dataLoaded[parametersCopy.field]) {
                    dataLoaded[parametersCopy.field] = true;
                    NG.Events.fireGlobal("goals-grid-model-updated", [parametersCopy.field]);
                }
                records = data;
            },
            dataType: "array"
        });
        return this.prepareData(records);
    };
    this.prepareData = function(rawData) {
        var result = -1;
        if (rawData) {
            result = [];
            for (var i = 0, l = rawData.length; i < l; i++) {
                var o = {};
                jQuery.extend(o, {
                    PlayerName: rawData[i][0],
                    TeamName: rawData[i][1],
                    GoalsScored: rawData[i][2],
                    FirstGoals: rawData[i][3],
                    PenaltyGoals: rawData[i][4],
                    TeamId: rawData[i][5]
                });
                result.push(o);
            }
        }
        return result;
    };
}

function TeamGoalStatsModel(config) {
    var config = config || {};
    var dataLoaded = {};
    this.load = function(parameters) {
        var parametersCopy = $.extend({}, config.defaultParameters, parameters);
        var records;
        DataStore.load("team-goals", {
            parameters: parametersCopy,
            cache: config.cache,
            success: function(options, data) {
                if (!dataLoaded[parametersCopy.field + parametersCopy.tournamentId]) {
                    dataLoaded[parametersCopy.field + parametersCopy.tournamentId] = true;
                    setTimeout(function() {
                        NG.Events.fireGlobal("team-goals-grid-model-updated", [parametersCopy.field]);
                    }, 0);
                }
                records = data;
            },
            dataType: "array"
        });
        return this.prepareData(records);
    };
    this.prepareData = function(rawData) {
        var result = -1;
        if (rawData) {
            result = [];
            for (var i = 0, l = rawData.length; i < l; i++) {
                var o = {};
                jQuery.extend(o, {
                    PlayerName: rawData[i][0],
                    GoalsScored: rawData[i][2],
                    FirstGoals: rawData[i][3],
                    PenaltyGoals: rawData[i][4]
                });
                result.push(o);
            }
        }
        return result;
    };
}
var GoalStatsView = function(eventData) {
    var records = eventData.model.records;
    if (records) {
        var o, t = [];
        for (var i = 0, l = records.length; i < l; i++) {
            o = records[i];
            t.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + '">');
            t.push('<td class="rank">' + (i + 1) + "</td>");
            t.push('<td class="player">' + o.PlayerName + "</td>");
            if (o.TeamId && o.TeamName) {
                t.push('<td class="team">');
                t.push(WS.TeamLink(o.TeamId, o.TeamName));
                t.push("</td>");
            }
            t.push('<td class="fg">' + o.FirstGoals + "</td>");
            t.push('<td class="pg">' + o.PenaltyGoals + "</td>");
            t.push('<td class="gs">' + o.GoalsScored + "</td>");
            t.push("</tr>");
        }
        return t.join("");
    }
    return "";
};

function CardStatsModel(config) {
    var config = config || {};
    var dataLoaded = {
        "Overall": false,
        "Home": false,
        "Away": false
    };
    this.load = function(parameters) {
        var parametersCopy = $.extend({}, config.defaultParameters, parameters);
        var records;
        DataStore.load("cards", {
            parameters: parametersCopy,
            cache: config.cache,
            success: function(options, data) {
                if (!dataLoaded[parametersCopy.field]) {
                    dataLoaded[parametersCopy.field] = true;
                    NG.Events.fireGlobal("cards-grid-model-updated", [parametersCopy.field]);
                }
                records = data;
            },
            dataType: "array"
        });
        return this.prepareData(records);
    };
    this.prepareData = function(rawData) {
        var result = -1;
        if (rawData) {
            result = [];
            for (var i = 0, l = rawData.length; i < l; i++) {
                var o = {};
                jQuery.extend(o, {
                    PlayerName: rawData[i][0],
                    TeamName: rawData[i][1],
                    Yellow: rawData[i][2],
                    SecondYellow: rawData[i][3],
                    Red: rawData[i][4],
                    Points: rawData[i][5],
                    TeamId: rawData[i][6]
                });
                result.push(o);
            }
        }
        return result;
    };
}

function TeamCardStatsModel(config) {
    var config = config || {};
    var dataLoaded = {
        "Overall": false,
        "Home": false,
        "Away": false
    };
    this.load = function(parameters) {
        var parametersCopy = $.extend({}, config.defaultParameters, parameters);
        var records;
        DataStore.load("team-cards", {
            parameters: parametersCopy,
            cache: config.cache,
            success: function(options, data) {
                if (!dataLoaded[parametersCopy.field + parametersCopy.tournamentId]) {
                    dataLoaded[parametersCopy.field + parametersCopy.tournamentId] = true;
                    NG.Events.fireGlobal("team-cards-grid-model-updated", [parametersCopy.field]);
                }
                records = data;
            },
            dataType: "array"
        });
        return this.prepareData(records);
    };
    this.prepareData = function(rawData) {
        var result = -1;
        if (rawData) {
            result = [];
            for (var i = 0, l = rawData.length; i < l; i++) {
                var o = {};
                jQuery.extend(o, {
                    PlayerName: rawData[i][0],
                    Yellow: rawData[i][2],
                    SecondYellow: rawData[i][3],
                    Red: rawData[i][4],
                    Points: rawData[i][5]
                });
                result.push(o);
            }
        }
        return result;
    };
}
var CardStatsView = function(eventData) {
    var records = eventData.model.records;
    if (records) {
        var o, t = [];
        for (var i = 0, l = records.length; i < l; i++) {
            o = records[i];
            t.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + '">');
            t.push('<td class="rank">' + (i + 1) + "</td>");
            t.push('<td class="player">' + o.PlayerName + "</td>");
            if (o.TeamId && o.TeamName) {
                t.push('<td class="team">');
                t.push(WS.TeamLink(o.TeamId, o.TeamName));
                t.push("</td");
            }
            t.push('<td class="y">' + o.Yellow + "</td>");
            t.push('<td class="sy">' + o.SecondYellow + "</td>");
            t.push('<td class="r">' + o.Red + "</td>");
            t.push('<td class="pts">' + o.Points + "</td>");
            t.push("</tr>");
        }
        return t.join("");
    }
    return "";
};

function StandingsModel(config) {
    var config = config || {},
        _stageId = config.defaultParameters.stageId;
    this.load = function(parameters) {
        var parametersCopy = $.extend({}, {
            stageId: _stageId
        }, parameters);
        var field = NG.remove(parametersCopy, "field");
        var data = DataStore.load("standings", {
            parameters: parametersCopy,
            cache: config.cache,
            dataType: "array"
        });
        var result = [];
        for (var i = 0, l = data.length; i < l; i++) {
            var o = {
                TeamId: data[i][1],
                TeamName: data[i][2],
                Matches: data[i][30]
            };
            var offset = 3;
            switch (field) {
                case "home":
                    offset += 9;
                    o.Matches = data[i][31];
                    break;
                case "away":
                    offset += 18;
                    o.Matches = data[i][32];
                    break;
            }
            jQuery.extend(o, {
                O: data[i][offset],
                P: data[i][++offset],
                W: data[i][++offset],
                D: data[i][++offset],
                L: data[i][++offset],
                GF: data[i][++offset],
                GA: data[i][++offset],
                GD: data[i][++offset],
                Pts: data[i][++offset]
            });
            if ("wide" == field) {
                jQuery.extend(o, {
                    HO: data[i][12],
                    HP: data[i][13],
                    HW: data[i][14],
                    HD: data[i][15],
                    HL: data[i][16],
                    HGF: data[i][17],
                    HGA: data[i][18],
                    HGD: data[i][19],
                    HPts: data[i][20],
                    AO: data[i][21],
                    AP: data[i][22],
                    AW: data[i][23],
                    AD: data[i][24],
                    AL: data[i][25],
                    AGF: data[i][26],
                    AGA: data[i][27],
                    AGD: data[i][28],
                    APts: data[i][29]
                });
            }
            result.push(o);
        }
        return result;
    };
}
var StandingsView = function(eventData) {
    var rankColorings = eventData.extraOptions.rankColorings;
    var showRankcolorings = showRankColorings(eventData.extraOptions.field);
    var records = eventData.model.records;
    if (records) {
        var o, t = [];
        var find = /<a class="(\w) (\w)" id="(\d+)" title="(.+?)"\/>/g;
        var replace = '<a class="box $1 $2" href="/Matches/$3/Live" title="$4">$1</a>';
        var lastMatch = /"(\/.+?)" title="(.+?)" /;
        var lastMatch = /title="(?!.*title=")/;
        var replaceLastMatch = 'title="Last Match: ';
        for (var i = 0, l = records.length; i < l; i++) {
            var matches = "";
            o = records[i];
            t.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + '">');
            t.push('<td class="o"><span class="box ' + (showRankcolorings ? getRankCssForIndex(rankColorings, (o.O)) : "") + '">' + o.O + "</span></td>");
            t.push('<td class="team">' + WS.TeamLink(o.TeamId, o.TeamName) + "</td>");
            t.push('<td class="p">' + o.P + "</td>");
            t.push('<td class="w">' + o.W + "</td>");
            t.push('<td class="d">' + o.D + "</td>");
            t.push('<td class="l">' + o.L + "</td>");
            t.push('<td class="gf">' + o.GF + "</td>");
            t.push('<td class="ga">' + o.GA + "</td>");
            t.push('<td class="gd">' + (0 < o.GD ? "+" + o.GD : o.GD) + "</td>");
            t.push('<td class="pts">' + o.Pts + "</td>");
            if (o.Matches) {
                matches = o.Matches.replace(find, replace);
                matches = matches.replace(lastMatch, replaceLastMatch);
            }
            t.push('<td class="form">' + matches + "</td>");
            t.push("</tr>");
        }
        return t.join("");
    }
    return "";
};

function showRankColorings(field) {
    return (field) ? ("overall" == field || "wide" == field) : false;
}

function getRankCssForIndex(rankCssList, index) {
    if (rankCssList) {
        for (var i = 0; i < rankCssList.length; i++) {
            for (var k = 0; k < rankCssList[i][1].length; k++) {
                if (rankCssList[i][1][k] == index) {
                    return rankCssList[i][0];
                }
            }
        }
    }
    return "";
}
var StandingsWideView = function(eventData) {
    var records = eventData.model.records;
    var rankColorings = eventData.extraOptions.rankColorings;
    var showRankcolorings = showRankColorings(eventData.extraOptions.field);
    if (records) {
        var o, t = [];
        for (var i = 0, l = records.length; i < l; i++) {
            o = records[i];
            t.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + '">');
            t.push('<td class="o"><span class="box ' + (showRankcolorings ? getRankCssForIndex(rankColorings, (o.O)) : "") + '">' + o.O + "</span></td>");
            t.push('<td class="team">' + WS.TeamLink(o.TeamId, o.TeamName) + "</td>");
            t.push('<td class="p shade">' + o.P + "</td>");
            t.push('<td class="w shade">' + o.W + "</td>");
            t.push('<td class="d shade">' + o.D + "</td>");
            t.push('<td class="l shade">' + o.L + "</td>");
            t.push('<td class="gf shade">' + o.GF + "</td>");
            t.push('<td class="ga shade">' + o.GA + "</td>");
            t.push('<td class="pts shade">' + o.Pts + "</td>");
            t.push('<td class="p">' + o.HP + "</td>");
            t.push('<td class="w">' + o.HW + "</td>");
            t.push('<td class="d">' + o.HD + "</td>");
            t.push('<td class="l">' + o.HL + "</td>");
            t.push('<td class="gf">' + o.HGF + "</td>");
            t.push('<td class="ga">' + o.HGA + "</td>");
            t.push('<td class="pts">' + o.HPts + "</td>");
            t.push('<td class="p shade">' + o.AP + "</td>");
            t.push('<td class="w shade">' + o.AW + "</td>");
            t.push('<td class="d shade">' + o.AD + "</td>");
            t.push('<td class="l shade">' + o.AL + "</td>");
            t.push('<td class="gf shade">' + o.AGF + "</td>");
            t.push('<td class="ga shade">' + o.AGA + "</td>");
            t.push('<td class="pts shade">' + o.APts + "</td>");
            t.push("</tr>");
        }
        return t.join("");
    }
    return "";
};
var StandingsGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: StandingsModel,
        cache: true
    },
    view: StandingsView,
    sorter: {
        sortInfo: {
            property: "O",
            direction: "asc"
        }
    }
});
var GoalsGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: GoalStatsModel,
        cache: true
    },
    view: GoalStatsView,
    sorter: {
        sortInfo: {
            property: "GoalsScored",
            direction: "desc"
        }
    },
    gridId: "goals-grid"
});
var TeamGoalsGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: TeamGoalStatsModel,
        cache: true
    },
    view: GoalStatsView,
    sorter: {
        sortInfo: {
            property: "GoalsScored",
            direction: "desc"
        }
    },
    gridId: "goals-grid"
});
var CardsGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: CardStatsModel,
        cache: true
    },
    view: CardStatsView,
    sorter: {
        sortInfo: {
            property: "Points",
            direction: "desc"
        }
    }
});
var TeamCardsGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: TeamCardStatsModel,
        cache: true
    },
    view: CardStatsView,
    sorter: {
        sortInfo: {
            property: "Points",
            direction: "desc"
        }
    }
});

function HistoryModel(config) {
    var config = config || {};
    this.load = function(parameters) {
        var parametersCopy = $.extend({}, config.defaultParameters, parameters);
        var field = NG.remove(parametersCopy, "field");
        var data = DataStore.load("history", {
            parameters: parametersCopy,
            cache: config.cache,
            dataType: "array"
        });
        var result = [];
        for (var i = 0, l = data.length; i < l; i++) {
            var o = {
                TeamId: data[i][1],
                TeamName: data[i][2]
            };
            switch (field) {
                case "overall":
                    o.O = data[i][3];
                    o.H = data[i][4];
                    break;
                case "home":
                    o.O = data[i][5];
                    o.H = data[i][6];
                    break;
                case "away":
                    o.O = data[i][7];
                    o.H = data[i][8];
                    break;
            }
            result.push(o);
        }
        return result;
    };
}
var HistoryView = function(eventData) {
    function format(data) {
        return (null != data && 0 < (c = (data.match(/\d/g) || []).length)) ? "<ul>" + '<li class="c">' + (0 < c ? "1" : "0") + "</li>" + data.replace(/(\d)/g, '<li class="r$1"></li>') + '<li class="c">' + (1 < c ? c : "") + "</li>" + "</ul>" : '<ul><li class="c">0</li></ul>';
    }

    var records = eventData.model.records;
    if (records) {
        var o, t = [];
        for (var i = 0, l = records.length; i < l; i++) {
            o = records[i];
            t.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + '">');
            t.push('<td class="o">' + o.O + "</td>");
            t.push('<td class="team">' + WS.TeamLink(o.TeamId, o.TeamName) + "</td>");
            t.push('<td class="progression">' + format(o.H) + "</td>");
            t.push("</tr>");
        }
        return t.join("");
    }
    return "";
};
var HistoryGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: HistoryModel,
        cache: true
    },
    view: HistoryView,
    sorter: {
        sortInfo: {
            property: "O",
            direction: "asc"
        }
    }
});

function getPercentage(stat, played) {
    if (!played || 0 == played) {
        return 0;
    }
    return Math.round(stat * 100 / played);
}

function getAverage(stat, played) {
    return Math.ceil(stat * 10 / played) / 10;
}

function StatisticsPerformancesModel(config) {
    var config = config || {};
    var dataLoaded = {};
    this.load = function(parameters) {
        var parametersCopy = $.extend({}, config.defaultParameters, parameters);
        var field = parametersCopy.field;
        var page = NG.remove(parametersCopy, "page");
        parametersCopy.field = "wide" == field ? "Overall" : field;
        var records;
        var data = DataStore.load("statistics", {
            parameters: parametersCopy,
            cache: config.cache,
            success: function(options, data) {
                var key = field + parametersCopy.order + parametersCopy.filterType;
                if (!dataLoaded[key]) {
                    dataLoaded[key] = true;
                    setTimeout(function() {
                        NG.Events.fireGlobal("statistics-performances-model-updated", []);
                    }, 0);
                }
                records = data;
                var numberOfPages = Math.ceil(records.length / 15);
                NG.Events.fireGlobal("statistics-performances-data-loaded", [numberOfPages, page]);
            },
            dataType: "array",
            extraOptions: {
                page: page
            }
        });
        return this.prepareData(records, field, page);
    };
    this.prepareData = function(data, field, page) {
        var result = -1;
        if (data) {
            page = page || 1;
            var start = page == 1 ? 0 : (15 * (page - 1));
            var end = data.length < (15 * page) ? data.length : (15 * page);
            result = [];
            for (var i = start, l = end; i < l; i++) {
                var o = {
                    TeamId: data[i][0],
                    TeamName: data[i][1],
                    StageId: data[i][2],
                    TournamentName: data[i][3],
                    SeasonId: data[i][4],
                    TournamentId: data[i][5],
                    RegionId: data[i][6],
                    RegionCode: data[i][7]
                };
                var offset = 7;
                switch (field) {
                    case "Home":
                        offset += 8;
                        break;
                    case "Away":
                        offset += 16;
                        break;
                }
                o.P = data[i][++offset];
                jQuery.extend(o, {
                    W: getPercentage(data[i][++offset], o.P),
                    D: getPercentage(data[i][++offset], o.P),
                    L: getPercentage(data[i][++offset], o.P),
                    GF: getAverage(data[i][++offset], o.P),
                    GA: getAverage(data[i][++offset], o.P),
                    GD: getAverage(data[i][++offset], o.P),
                    Pts: getAverage(data[i][++offset], o.P)
                });
                result.push(o);
            }
        }
        return result;
    };
}

function StatisticsFormsModel(config) {
    var config = config || {};
    var dataLoaded = {};
    this.load = function(parameters) {
        var parametersCopy = $.extend({}, config.defaultParameters, parameters);
        var field = parametersCopy.field;
        var page = NG.remove(parametersCopy, "page");
        parametersCopy.field = "wide" == field ? "Overall" : field;
        var records;
        var data = DataStore.load("statistics", {
            parameters: parametersCopy,
            cache: config.cache,
            success: function(options, data) {
                var key = field + parametersCopy.period + parametersCopy.order + parametersCopy.filterType;
                if (!dataLoaded[key]) {
                    dataLoaded[key] = true;
                    setTimeout(function() {
                        NG.Events.fireGlobal("statistics-forms-model-updated", []);
                    }, 0);
                }
                records = data;
                var numberOfPages = Math.ceil(records.length / 15);
                NG.Events.fireGlobal("statistics-forms-data-loaded", [numberOfPages, page]);
            },
            dataType: "array",
            extraOptions: {
                page: page
            }
        });
        return this.prepareData(records, field, page);
    };
    this.prepareData = function(data, field, page) {
        var result = -1;
        if (data) {
            page = page || 1;
            var start = page == 1 ? 0 : (15 * (page - 1));
            var end = data.length < (15 * page) ? data.length : (15 * page);
            result = [];
            for (var i = start, l = end; i < l; i++) {
                var o = {
                    StageId: data[i][0],
                    TournamentName: data[i][1],
                    SeasonId: data[i][2],
                    TournamentId: data[i][3],
                    RegionId: data[i][4],
                    RegionCode: data[i][34],
                    TeamId: data[i][5],
                    TeamName: data[i][6],
                    Matches: data[i][31]
                };
                var offset = 6;
                switch (field) {
                    case "Home":
                        offset += 8;
                        o.Matches = data[i][32];
                        break;
                    case "Away":
                        offset += 16;
                        o.Matches = data[i][33];
                        break;
                }
                jQuery.extend(o, {
                    P: data[i][++offset],
                    W: data[i][++offset],
                    D: data[i][++offset],
                    L: data[i][++offset],
                    GF: data[i][++offset],
                    GA: data[i][++offset],
                    GD: data[i][++offset],
                    Pts: data[i][++offset]
                });
                result.push(o);
            }
        }
        return result;
    };
}

function FormsModel(config) {
    var config = config || {};
    this.load = function(parameters) {
        var parametersCopy = $.extend({}, config.defaultParameters, parameters);
        var field = NG.remove(parametersCopy, "field");
        var data = DataStore.load("forms", {
            parameters: parametersCopy,
            cache: config.cache,
            dataType: "array"
        });
        var result = [];
        for (var i = 0, l = data.length; i < l; i++) {
            var o = {
                TeamId: data[i][1],
                TeamName: data[i][2],
                Matches: data[i][30]
            };
            var offset = 3;
            switch (field) {
                case "home":
                    offset += 9;
                    o.Matches = data[i][31];
                    break;
                case "away":
                    offset += 18;
                    o.Matches = data[i][32];
                    break;
            }
            jQuery.extend(o, {
                O: data[i][offset],
                P: data[i][++offset],
                W: data[i][++offset],
                D: data[i][++offset],
                L: data[i][++offset],
                GF: data[i][++offset],
                GA: data[i][++offset],
                GD: data[i][++offset],
                Pts: data[i][++offset]
            });
            if ("wide" == field) {
                jQuery.extend(o, {
                    HO: data[i][12],
                    HP: data[i][13],
                    HW: data[i][14],
                    HD: data[i][15],
                    HL: data[i][16],
                    HGF: data[i][17],
                    HGA: data[i][18],
                    HGD: data[i][19],
                    HPts: data[i][20],
                    AO: data[i][21],
                    AP: data[i][22],
                    AW: data[i][23],
                    AD: data[i][24],
                    AL: data[i][25],
                    AGF: data[i][26],
                    AGA: data[i][27],
                    AGD: data[i][28],
                    APts: data[i][29]
                });
            }
            result.push(o);
        }
        return result;
    };
}
var FormsView = function(eventData) {
    var records = eventData.model.records;
    if (records) {
        var o, t = [];
        var find = /<a class="(\w) (\w)" id="(\d+)" title="(.+?)"\/>/g;
        var replace = '<a class="box $1 $2" href="/Matches/$3/Live" title="$4">$1</a>';
        var lastMatch = /"(\/.+?)" title="(.+?)" /;
        var replaceLastMatch = '$1 title="Last Match: $2"';
        for (var i = 0, l = records.length; i < l; i++) {
            var matches = "";
            o = records[i];
            t.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + '">');
            t.push('<td class="o">' + o.O + "</td>");
            t.push('<td class="team">' + WS.TeamLink(o.TeamId, o.TeamName) + "</td>");
            t.push('<td class="p">' + o.P + "</td>");
            t.push('<td class="w">' + o.W + "</td>");
            t.push('<td class="d">' + o.D + "</td>");
            t.push('<td class="l">' + o.L + "</td>");
            t.push('<td class="gf">' + o.GF + "</td>");
            t.push('<td class="ga">' + o.GA + "</td>");
            t.push('<td class="gd">' + (0 < o.GD ? "+" + o.GD : o.GD) + "</td>");
            t.push('<td class="pts">' + o.Pts + "</td>");
            if (o.Matches) {
                matches = o.Matches.replace(find, replace);
                matches = matches.replace(lastMatch, replaceLastMatch);
            }
            t.push('<td class="form">' + matches + "</td>");
            t.push("</tr>");
        }
        return t.join("");
    }
    return "";
};
var StatisticsFormsView = function(eventData) {
    var records = eventData.model.records;
    var page = eventData.model.parameters.page ? eventData.model.parameters.page : 1;
    var index = ((page - 1) * 15) + 1;
    if (records) {
        var o, t = [];
        var find = /<a class="(\w) (\w)" id="(\d+)" title="(.+?)"\/>/g;
        var replace = '<a class="box $1 $2" href="/Matches/$3/Live" title="$4">$1</a>';
        var lastMatch = /"(\/.+?)" title="(.+?)" /;
        var replaceLastMatch = '$1 title="Last Match: $2"';
        for (var i = 0, l = records.length; i < l; i++) {
            var matches = "";
            o = records[i];
            t.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + '">');
            t.push('<td class="rank">' + (index++) + "</td>");
            t.push('<td class="tn">' + WS.TeamLink(o.TeamId, o.TeamName) + "</td>");
            t.push('<td class="tournament"><a class="tournament-link iconize iconize-icon-left" href="/Regions/' + o.RegionId + "/Tournaments/" + o.TournamentId + "/Seasons/" + o.SeasonId + "/Stages/" + o.StageId + '"><span class="ui-icon country flg-' + o.RegionCode + '"></span>' + o.TournamentName + "</a></td>");
            t.push('<td class="p">' + o.P + "</td>");
            t.push('<td class="w">' + o.W + "</td>");
            t.push('<td class="d">' + o.D + "</td>");
            t.push('<td class="l">' + o.L + "</td>");
            t.push('<td class="gf">' + o.GF + "</td>");
            t.push('<td class="ga">' + o.GA + "</td>");
            t.push('<td class="gd">' + (0 < o.GD ? "+" + o.GD : o.GD) + "</td>");
            t.push('<td class="pts">' + o.Pts + "</td>");
            if (o.Matches) {
                matches = o.Matches.replace(find, replace);
                matches = matches.replace(lastMatch, replaceLastMatch);
            }
            t.push('<td class="form">' + matches + "</td>");
            t.push("</tr>");
        }
        return t.join("");
    }
    return "";
};
var StatisticsPerformancesView = function(eventData) {
    var records = eventData.model.records;
    var page = eventData.model.parameters.page ? eventData.model.parameters.page : 1;
    var index = ((page - 1) * 15) + 1;
    if (records) {
        var o, t = [];
        var matches = "";
        var find = /<a class="(\w) (\w)" id="(\d+)" title="(.+?)"\/>/g;
        var replace = '<a class="box $1 $2" href="/Matches/$3/Live" title="$4">$1</a>';
        var lastMatch = /"(\/.+?)" title="(.+?)" /;
        var replaceLastMatch = '$1 title="Last Match: $2"';
        for (var i = 0, l = records.length; i < l; i++) {
            o = records[i];
            t.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + '">');
            t.push('<td class="rank">' + (index++) + "</td>");
            t.push('<td class="tn">' + WS.TeamLink(o.TeamId, o.TeamName) + "</td>");
            t.push('<td class="tournament"><a class="tournament-link iconize iconize-icon-left" href="/Regions/' + o.RegionId + "/Tournaments/" + o.TournamentId + "/Seasons/" + o.SeasonId + "/Stages/" + o.StageId + '"><span class="ui-icon country flg-' + o.RegionCode + '"></span>' + o.TournamentName + "</a></td>");
            t.push('<td class="p">' + o.P + "</td>");
            t.push('<td class="w">' + o.W + "</td>");
            t.push('<td class="d">' + o.D + "</td>");
            t.push('<td class="l">' + o.L + "</td>");
            t.push('<td class="gf">' + o.GF + "</td>");
            t.push('<td class="ga">' + o.GA + "</td>");
            t.push('<td class="pts">' + o.Pts + "</td>");
            t.push("</tr>");
        }
        return t.join("");
    }
    return "";
};
var FormsWideView = function(eventData) {
    var records = eventData.model.records;
    if (records) {
        var o, t = [];
        for (var i = 0, l = records.length; i < l; i++) {
            o = records[i];
            t.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + '">');
            t.push('<td class="o">' + o.O + "</td>");
            t.push('<td class="team">' + WS.TeamLink(o.TeamId, o.TeamName) + "</td>");
            t.push('<td class="p shade">' + o.P + "</td>");
            t.push('<td class="w shade">' + o.W + "</td>");
            t.push('<td class="d shade">' + o.D + "</td>");
            t.push('<td class="l shade">' + o.L + "</td>");
            t.push('<td class="gf shade">' + o.GF + "</td>");
            t.push('<td class="ga shade">' + o.GA + "</td>");
            t.push('<td class="pts shade">' + o.Pts + "</td>");
            t.push('<td class="p">' + o.HP + "</td>");
            t.push('<td class="w">' + o.HW + "</td>");
            t.push('<td class="d">' + o.HD + "</td>");
            t.push('<td class="l">' + o.HL + "</td>");
            t.push('<td class="gf">' + o.HGF + "</td>");
            t.push('<td class="ga">' + o.HGA + "</td>");
            t.push('<td class="pts">' + o.HPts + "</td>");
            t.push('<td class="p shade">' + o.AP + "</td>");
            t.push('<td class="w shade">' + o.AW + "</td>");
            t.push('<td class="d shade">' + o.AD + "</td>");
            t.push('<td class="l shade">' + o.AL + "</td>");
            t.push('<td class="gf shade">' + o.AGF + "</td>");
            t.push('<td class="ga shade">' + o.AGA + "</td>");
            t.push('<td class="pts shade">' + o.APts + "</td>");
            t.push("</tr>");
        }
        return t.join("");
    }
    return "";
};
var FormsGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: FormsModel,
        cache: true
    },
    view: FormsView,
    sorter: {
        sortInfo: {
            property: "O",
            direction: "asc"
        }
    }
});
var FormsWideGridDefaults = $.extend({}, FormsGridDefaults, {
    view: FormsWideView
});
var StatisticsFormsGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: StatisticsFormsModel,
        cache: true
    },
    view: StatisticsFormsView,
    sorter: null
});
var StandingsWideGridDefaults = $.extend({}, StandingsGridDefaults, {
    view: StandingsWideView
});
var StatisticsPerformancesGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: StatisticsPerformancesModel,
        cache: true
    },
    view: StatisticsPerformancesView,
    sorter: null
});

function StreaksModel(config) {
    var config = config || {};
    var baseOffset = config.offset || 0;
    this.load = function(parameters) {
        var parametersCopy = $.extend({}, config.defaultParameters, parameters);
        var field = NG.remove(parametersCopy, "field");
        var data = DataStore.load("streaks", {
            parameters: parametersCopy,
            cache: config.cache,
            dataType: "array"
        });
        var result = [];
        for (var i = 0, l = data.length; i < l; i++) {
            var o = {
                TeamId: data[i][1],
                TeamName: data[i][2]
            };
            var offset = baseOffset + 2;
            switch (field) {
                case "home":
                    offset += 8;
                    break;
                case "away":
                    offset += 16;
                    break;
            }
            jQuery.extend(o, {
                O: data[i][++offset],
                W: data[i][++offset],
                WD: data[i][++offset],
                D: data[i][++offset],
                L: data[i][++offset],
                DL: data[i][++offset],
                CS: data[i][++offset],
                FS: data[i][++offset]
            });
            if ("wide" == field) {
                jQuery.extend(o, {
                    HO: data[i][++offset],
                    HW: data[i][++offset],
                    HWD: data[i][++offset],
                    HD: data[i][++offset],
                    HL: data[i][++offset],
                    HDL: data[i][++offset],
                    HCS: data[i][++offset],
                    HFS: data[i][++offset],
                    AO: data[i][++offset],
                    AW: data[i][++offset],
                    AWD: data[i][++offset],
                    AD: data[i][++offset],
                    AL: data[i][++offset],
                    ADL: data[i][++offset],
                    ACS: data[i][++offset],
                    AFS: data[i][++offset]
                });
            }
            result.push(o);
        }
        return result;
    };
}

function StatisticsStreaksModel(config) {
    var config = config || {};
    var baseOffset = config.offset || 0;
    var dataLoaded = {};
    this.load = function(parameters) {
        var parametersCopy = $.extend({}, config.defaultParameters, parameters);
        var field = parametersCopy.field;
        var page = NG.remove(parametersCopy, "page");
        parametersCopy.field = "wide" == field ? "Overall" : field;
        var records;
        DataStore.load("statistics", {
            parameters: parametersCopy,
            cache: config.cache,
            success: function(options, data) {
                var key = field + parametersCopy.statsSubType + parametersCopy.period + parametersCopy.streaksType + parametersCopy.filterType;
                if (!dataLoaded[key]) {
                    dataLoaded[key] = true;
                    setTimeout(function() {
                        NG.Events.fireGlobal("statistics-streaks-model-updated", []);
                    }, 0);
                }
                records = data;
                var numberOfPages = Math.ceil(records.length / 15);
                NG.Events.fireGlobal("statistics-streaks-data-loaded", [numberOfPages, page]);
            },
            dataType: "array",
            extraOptions: {
                page: page
            }
        });
        return this.prepareData(records, field, page);
    };
    this.prepareData = function(data, field, page) {
        var result = -1;
        if (data) {
            page = page || 1;
            var start = page == 1 ? 0 : (15 * (page - 1));
            var end = data.length < (15 * page) ? data.length : (15 * page);
            result = [];
            for (var i = start, l = end; i < l; i++) {
                var o = {
                    TeamId: data[i][0],
                    TeamName: data[i][1],
                    StageId: data[i][2],
                    TournamentName: data[i][3],
                    SeasonId: data[i][4],
                    TournamentId: data[i][5],
                    RegionId: data[i][6],
                    RegionCode: data[i][7],
                    Streak: data[i][8],
                    Type: data[i][11],
                    P: data[i][12]
                };
                switch (field) {
                    case "Home":
                        o.Streak = data[i][9], o.P = data[i][13];
                        break;
                    case "Away":
                        o.Streak = data[i][10], o.P = data[i][14];
                        break;
                }
                result.push(o);
            }
        }
        return result;
    };
}
var StreaksView = function(eventData) {
    function getRowClass(o, sortProperty) {
        if ("O" != sortProperty && "TeamName" != sortProperty && o[sortProperty] < 1) {
            return "dim";
        }
        return "";
    }

    function filter(value) {
        return (0 == value) ? "." : value;
    }

    var records = eventData.model.records;
    if (records) {
        var o, t = [];
        for (var i = 0, l = records.length; i < l; i++) {
            o = records[i];
            t.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + " " + getRowClass(o, eventData.sorter.sortInfo.property) + '">');
            t.push('<td class="o">' + o.O + "</td>");
            t.push('<td class="team">' + WS.TeamLink(o.TeamId, o.TeamName) + "</td>");
            t.push('<td class="w">' + filter(o.W) + "</td>");
            t.push('<td class="wd">' + filter(o.WD) + "</td>");
            t.push('<td class="d">' + filter(o.D) + "</td>");
            t.push('<td class="dl">' + filter(o.DL) + "</td>");
            t.push('<td class="l">' + filter(o.L) + "</td>");
            t.push('<td class="cs">' + filter(o.CS) + "</td>");
            t.push('<td class="fs">' + filter(o.FS) + "</td>");
            t.push("</tr>");
        }
        return t.join("");
    }
    return "";
};
var StatisticsStreaksView = function(eventData) {
    function filter(value) {
        return (0 == value) ? "." : value;
    }

    var records = eventData.model.records;
    var page = eventData.model.parameters.page ? eventData.model.parameters.page : 1;
    var index = ((page - 1) * 15) + 1;
    if (records) {
        var o, t = [];
        for (var i = 0, l = records.length; i < l; i++) {
            o = records[i];
            t.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + ' ">');
            t.push('<td class="rank">' + (index++) + "</td>");
            t.push('<td class="tn">' + WS.TeamLink(o.TeamId, o.TeamName) + "</td>");
            t.push('<td class="tournament"><a class="tournament-link iconize iconize-icon-left" href="/Regions/' + o.RegionId + "/Tournaments/" + o.TournamentId + "/Seasons/" + o.SeasonId + "/Stages/" + o.StageId + '"><span class="ui-icon country flg-' + o.RegionCode + '"></span>' + o.TournamentName + "</a></td>");
            t.push('<td class="' + o.Type + '">' + filter(o.Streak) + ' <span style="color: #999; ">(' + o.P + ")</span></td>");
            t.push("</tr>");
        }
        return t.join("");
    }
    return "";
};
var StreaksWideView = function(eventData) {
    function getRowClass(o, sortProperty) {
        if ("O" != sortProperty && "TeamName" != sortProperty && o[sortProperty] < 1) {
            return "dim";
        }
        return "";
    }

    function filter(value) {
        return (0 == value) ? "." : value;
    }

    var records = eventData.model.records;
    if (records) {
        var o, t = [];
        for (var i = 0, l = records.length; i < l; i++) {
            o = records[i];
            t.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + " " + getRowClass(o, eventData.sorter.sortInfo.property) + '">');
            t.push('<td class="o">' + o.O + "</td>");
            t.push('<td class="team">' + WS.TeamLink(o.TeamId, o.TeamName) + "</td>");
            t.push('<td class="w shade">' + filter(o.W) + "</td>");
            t.push('<td class="wd shade">' + filter(o.WD) + "</td>");
            t.push('<td class="d shade">' + filter(o.D) + "</td>");
            t.push('<td class="dl shade">' + filter(o.DL) + "</td>");
            t.push('<td class="l shade">' + filter(o.L) + "</td>");
            t.push('<td class="cs shade">' + filter(o.CS) + "</td>");
            t.push('<td class="fs shade">' + filter(o.FS) + "</td>");
            t.push('<td class="w">' + filter(o.HW) + "</td>");
            t.push('<td class="wd">' + filter(o.HWD) + "</td>");
            t.push('<td class="d">' + filter(o.HD) + "</td>");
            t.push('<td class="dl">' + filter(o.HDL) + "</td>");
            t.push('<td class="l">' + filter(o.HL) + "</td>");
            t.push('<td class="cs">' + filter(o.HCS) + "</td>");
            t.push('<td class="fs">' + filter(o.HFS) + "</td>");
            t.push('<td class="w shade">' + filter(o.AW) + "</td>");
            t.push('<td class="wd shade">' + filter(o.AWD) + "</td>");
            t.push('<td class="d shade">' + filter(o.AD) + "</td>");
            t.push('<td class="dl shade">' + filter(o.ADL) + "</td>");
            t.push('<td class="l shade">' + filter(o.AL) + "</td>");
            t.push('<td class="cs shade">' + filter(o.ACS) + "</td>");
            t.push('<td class="fs shade">' + filter(o.AFS) + "</td>");
            t.push("</tr>");
        }
        return t.join("");
    }
    return "";
};
var StreaksGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: StreaksModel,
        cache: true
    },
    view: StreaksView,
    sorter: {
        sortInfo: {
            property: "O",
            direction: "asc"
        }
    }
});
var StatisticsStreaksGridDefaults = $.extend({}, gridDefaults, {
    model: {
        type: StatisticsStreaksModel,
        cache: true
    },
    view: StatisticsStreaksView,
    sorter: null
});
var StreaksWideGridDefaults = $.extend({}, StreaksGridDefaults, {
    view: StreaksWideView
});
var SeasonStreaksGridDefaults = $.extend({}, StreaksGridDefaults, {
    model: $.extend({}, StreaksGridDefaults.model, {})
});
var SeasonStreaksWideGridDefaults = $.extend({}, SeasonStreaksGridDefaults, {
    view: StreaksWideView
});

function StageFixturesPresenter(config) {
    var config = config || {},
        self = this,
        selectedMatch = null,
        visibleIncidents = {},
        incidentManager = new IncidentManager({
            rootElement: "#tournament-fixture-wrapper",
            view: StageIncidentsView
        });
    this.highlightMask = null;
    this.load = function(parameters) {
        parameters = parameters || {};
        var parametersCopy = $.extend({}, config.defaultParameters, parameters);
        DataStore.load("stagefixtures", {
            parameters: parametersCopy,
            success: success,
            error: error,
            dataType: "array",
            cache: true
        }, this);
    };

    function success(options, data) {
        var model = new StageFixturesModel(data);
        $(config.wrapper).html(StageFixturesView(model, config.showPins));
        incidentManager.clearIncidents();
        selectedMatch = null;
        self.highlightMask = null;
        NG.Events.fire(this, "highlightoff");
        NG.Events.fire(this, "loaded");
    }

    function error() {}

    function switchOn($el) {
        selectedMatch = $el;
        $el.data("selected", true);
        var ids = [];
        $el.addClass("ui-state-active").parents("tr:first").addClass("highlight").find("td.team").each(function() {
            ids.push($(this).attr("data-id"));
        });
        self.highlightMask = ids;
        NG.Events.fire(self, "highlighton", [self.highlightMask]);
    }

    function switchOff($el) {
        selectedMatch = null;
        $el.data("selected", false);
        $el.removeClass("ui-state-active").parents("tr:first").removeClass("highlight");
        self.highlightMask = null;
        NG.Events.fire(self, "highlightoff");
    }

    $("#tournament-fixture-wrapper").on("click", ".button-small.hilight", function() {
        var $el = $(this);
        if (null == selectedMatch) {
            switchOn($el);
        } else {
            if (selectedMatch && $el.data("selected")) {
                switchOff(selectedMatch);
            } else {
                switchOff(selectedMatch);
                switchOn($el);
            }
        }
        return false;
    });
}

function StageFixturesModel(data) {
    var result = [],
        record;
    if (undefined == data || (undefined == data.length && 0 == data.length)) {
        return result;
    }
    for (var i = 0, l = data.length; i < l; i++) {
        record = data[i];
        var o = {};
        o.Id = record[0];
        o.Status = record[1];
        o.StartDate = record[2];
        o.StartTime = record[3];
        o.HomeTeamId = record[4];
        o.HomeTeamName = record[5];
        o.HomeRCards = record[6];
        o.AwayTeamId = record[7];
        o.AwayTeamName = record[8];
        o.AwayRCards = record[9];
        o.Score = record[10];
        o.HTScore = record[11];
        o.HasIncidents = record[12];
        o.HasPreview = record[13];
        o.Elapsed = record[14];
        o.Result = record[15];
        o.IsInternational = record[16];
        o.IsOpta = record[19] || record[17];
        o.CommentCount = record[18];
        result.push(o);
    }
    return result;
}
var StageFixturesView = function(records, showPins) {
    var o, t = [],
        lastDate = null,
        z, alt = true;
    showPins = (null != showPins) ? showPins : true;
    t.push('<table id="tournament-fixture" class="grid hover fixture"><tbody>');
    for (var i = 0, l = records.length; i < l; i++) {
        o = records[i];
        var matchHasTerminatedUnexpectedly = matchTerminatedUnexpectedly(o.Elapsed);
        if (lastDate != o.StartDate) {
            lastDate = o.StartDate;
            t.push('<tr class="rowgroupheader"><th colspan="7">' + lastDate + "</th></tr>");
            z = 0;
            alt = true;
        }
        t.push('<tr class="item ' + ((alt) ? "alt" : ""));
        t.push('" data-id="');
        t.push(o.Id);
        t.push('">');
        t.push('<td class="toolbar left">');
        if (true == showPins) {
            t.push('<a href="#" class="hilight button-small ui-state-transparent-default rc" title="Highlight teams in tables below"><span class="ui-icon ui-icon-pin-w"></span></a>');
        }
        if (o.HasIncidents) {
            t.push('<a href="#" class="show-incidents button-small ui-state-transparent-default rc" title="Details"><span class="ui-icon ui-icon-triangle-1-e"></span></a>');
        }
        t.push("</td>");
        t.push('<td class="time">' + o.StartTime + "</td>");
        t.push('<td class="status"><span class="status-' + o.Status + ' rc">' + (o.Elapsed ? o.Elapsed : "") + "</span></td>");
        t.push('<td class="team home' + (1 == o.Result ? " winner" : "") + '" data-id="' + o.HomeTeamId + '">');
        if (0 < o.HomeRCards) {
            t.push('<span class="rcard ls-e">' + o.HomeRCards + "</span>");
        }
        t.push(WS.TeamLink(o.HomeTeamId, o.HomeTeamName));
        t.push("</td>");
        t.push('<td class="result">');
        if (matchHasTerminatedUnexpectedly) {
            t.push('<a title="' + matchTerminatedUnexpectedlyToolTip(o.Elapsed) + '" href="/Matches/' + o.Id + '">' + o.Score + "</a>");
        } else {
            if (("2" == o.Status || "1" == o.Status)) {
                t.push('<a class="result-' + o.Status + ' rc" href="/Matches/' + o.Id + '/Live">' + o.Score + "</a>");
            } else {
                t.push('<a class="result-' + o.Status + ' rc"  href="/Matches/' + o.Id + '">' + o.Score + "</a>");
            }
        }
        t.push("</td>");
        t.push('<td class="team away' + (2 == o.Result ? " winner" : "") + '" data-id="' + o.AwayTeamId + '">');
        t.push(WS.TeamLink(o.AwayTeamId, o.AwayTeamName));
        if (0 < o.AwayRCards) {
            t.push('<span class="rcard ls-e">' + o.AwayRCards + "</span>");
        }
        t.push("</td>");
        t.push('<td class="toolbar right">');
        if ("1" == o.Status && o.IsOpta && !matchHasTerminatedUnexpectedly) {
            t.push('<a href="/Matches/' + o.Id + '/MatchReport" class="match-link match-report rc">Match Report</a>');
        }
        if ("2" == o.Status) {
            t.push('<a href="/Matches/' + o.Id + '/Live" class="match-link live rc" title="Live">Match Centre</a>');
        }
        if ("4" == o.Status && o.HasPreview) {
            t.push('<a href="/Matches/' + o.Id + '/Preview" class="match-link preview rc" title="Preview">Preview</a>');
        }
        if (0 < o.CommentCount) {
            t.push('<a title="Comments" class="iconize iconize-icon-right fixture-comments" href="/Matches/' + o.Id + '"><span class="incidents-icon ui-icon comments"></span>' + o.CommentCount + "</a>");
        }
        t.push("</td>");
        t.push("</tr>");
        alt = !alt;
    }
    t.push("</tbody>");
    t.push("</table>");
    return t.join("");
};
var HomeIncidentsView = function(id, data, className) {
    function getIncidentClass(type) {
        return (1 == type) ? "i-goal" : "i-rcard";
    }

    var t = [];
    for (var i = 0, l = data.length; i < l; i++) {
        var incident = data[i];
        var period = incident[7];
        var minute = incident[1];
        if (period) {
            if (1 == period && 45 < minute) {
                minute = 45;
            } else {
                minute = Math.min(period * 45, minute);
            }
        }
        var playerName = incident[3] ? incident[3] : "";
        t.push('<tr class="' + (className || "") + " incident " + (i == data.length - 1 ? "last" : "") + '" data-match-id="m');
        t.push(id);
        t.push('">');
        if ("0" == incident[2]) {
            t.push('<td class="team home" colspan="5">');
            t.push('<span class="iconize iconize-icon-right"><span class="incidents-icon ui-icon ' + getIncidentClass(incident[0]) + '"></span>');
            if (incident[4] != undefined) {
                t.push('<span class="goal-info">(' + incident[4] + ")</span>");
            }
            t.push(0 != incident[6] ? ('<a class="player-link" href="/Players/' + incident[6] + '">' + playerName + "</a>") : playerName);
            t.push("</span>");
            t.push("</td>");
            t.push('<td class="minute">');
            t.push(minute);
            t.push("'</td>");
            t.push('<td class="team away" colspan="3"></td>');
        } else {
            t.push('<td class="team home" colspan="5"></td>');
            t.push('<td class="minute">');
            t.push(minute);
            t.push("'</td>");
            t.push('<td class="team away" colspan="3">');
            t.push('<span class="iconize iconize-icon-left"><span class="ui-icon incidents-icon ' + getIncidentClass(incident[0]) + '"></span>');
            t.push(0 != incident[6] ? ('<a class="player-link" href="/Players/' + incident[6] + '">' + playerName + "</a>") : playerName);
            if (incident[4] != undefined) {
                t.push('<span class="goal-info">(' + incident[4] + ")</span>");
            }
            t.push("</span>");
            t.push("</td>");
        }
        t.push('<td class="toolbar"></td>');
        t.push("</tr>");
    }
    return t.join("");
};
var StageIncidentsView = function(id, data, className) {
    function getIncidentClass(type, subType) {
        return (1 == type) ? "i-goal" : (subType && 2 == subType) ? "i-y2card" : "i-rcard";
    }

    var t = [],
        detail;
    for (var i = 0, l = data.length; i < l; i++) {
        detail = data[i];
        var period = detail[7];
        var minute = detail[1];
        if (period) {
            if (1 == period && 45 < minute) {
                minute = 45;
            } else {
                minute = Math.min(period * 45, minute);
            }
        }
        t.push('<tr class="' + (className || "") + " incident " + (i == data.length - 1 ? "last" : "") + '" data-match-id="m');
        t.push(id);
        t.push('">');
        t.push('<td class="toolbar"></td>');
        t.push('<td class="time"></td>');
        t.push('<td class="status"></td>');
        if ("0" == detail[2]) {
            t.push('<td class="team home">');
            t.push('<span class="iconize iconize-icon-right"><span class="incidents-icon ui-icon ' + getIncidentClass(detail[0], detail[5]) + '"></span>');
            if (detail[4] != undefined) {
                t.push('<span class="goal-info">(' + detail[4] + ")</span>");
            }
            t.push(0 != detail[6] ? (WS.PlayerLink(detail[6], detail[3])) : detail[3]);
            t.push("</span>");
            t.push("</td>");
            t.push('<td class="minute">');
            t.push(minute);
            t.push("'</td>");
            t.push('<td class="team away"></td>');
        } else {
            t.push('<td class="team home"></td>');
            t.push('<td class="minute">');
            t.push(minute);
            t.push("'</td>");
            t.push('<td class="team away">');
            t.push('<span class="iconize iconize-icon-left"><span class="incidents-icon ui-icon ' + getIncidentClass(detail[0], detail[5]) + '"></span>');
            t.push(WS.PlayerLink(detail[6], detail[3]));
            if (detail[4] != undefined) {
                t.push('<span class="goal-info">(' + detail[4] + ")</span>");
            }
            t.push("</span>");
            t.push("</td>");
        }
        t.push('<td class="toolbar"></td>');
        t.push("</tr>");
    }
    return t.join("");
};

function PreviewFormPresenter(config) {
    var config = config || {};
    this.load = function(parameters) {
        $(config.wrapper).html('<table class="grid highlight"><tbody><td class="loading"> Loading.. </td></tbody></table>');
        parameters = parameters || {};
        var parametersCopy = $.extend({}, config.defaultParameters, parameters);
        var overallForm = new PreviewFormModel(parametersCopy.overallForm);
        var fieldForm = new PreviewFormModel(parametersCopy.fieldForm);
        if (overallForm.length == 0 && fieldForm.length == 0) {
            $(config.wrapper).html(PreviewFormEmptyView());
        } else {
            $(config.wrapper).html(PreviewFormView(parametersCopy.teamId, parametersCopy.field, overallForm, fieldForm));
        }
    };
}

function PreviewFormModel(data) {
    var result = [],
        record;
    if (undefined == data || (undefined == data.length && 0 == data.length)) {
        return result;
    }
    for (var i = data.length - 1; 0 <= i; i--) {
        record = data[i];
        var o = {};
        o.Id = record[0];
        o.HomeTeamId = record[4];
        o.HomeTeamName = record[5];
        o.AwayTeamId = record[7];
        o.AwayTeamName = record[8];
        o.Score = record[10];
        o.Result = record[17];
        result.push(o);
    }
    return result;
}

function getResult(o, teamId) {
    if (matchTerminatedUnexpectedly(o.Elapsed)) {
        return;
    }
    var result = o.Result;
    var field = (teamId == o.HomeTeamId) ? 1 : 2;
    if (result == -1) {
        return null;
    }
    if (0 == result) {
        return "d";
    }
    if (result == field) {
        return "w";
    }
    return "l";
}

function PreviewFormEmptyView() {
    return '<div class="empty note"> No recent form..</div>';
}

function PreviewFormView(teamId, field, overallForm, fieldForm) {
    var t = [];

    function getForm(formData, field) {
        var f = [];
        var matches = [];
        var statsField = field || "Overall";
        f.push("<tr>");
        f.push('<td class="title">' + statsField + "</td>");
        f.push('<td class="form">');
        for (var i = 0, l = formData.length; i < l; i++) {
            var o = formData[i];
            var result = getResult(o, teamId);
            if (result) {
                matches.push('<a class="box ' + result + '" href="/Matches/' + o.Id + '/Live" title="' + o.HomeTeamName + " " + o.Score + " " + o.AwayTeamName + '">' + result + "</a>");
            }
        }
        matches = matches.join("");
        f.push(matches);
        f.push("</td>");
        f.push("</tr>");
        return f.join("");
    }

    t.push('<table class="grid gray"><tbody>');
    t.push(getForm(overallForm));
    t.push(getForm(fieldForm, field));
    t.push("</tbody></table>");
    return t.join("");
}

function H2HTeamFixturesPresenter(config) {
    var id, config = config || {},
        view;
    init(config);
    this.load = function(data) {
        renderLoading();
        render(data);
    };
    this.id = function() {
        return id;
    };

    function render(data) {
        var records = new H2HTeamFixturesModel(data.value);
        $("#" + view.renderTo + "-matches").html(H2HTeamFixturesView(records, data.teamId, data.field));
    }

    function init(config) {
        view = config.view;
        id = view.renderTo;
    }

    function renderLoading() {
        var height = $("table", "#" + view.renderTo).height();
        $("#" + view.renderTo).html('<table class="grid hover" style="height:' + height + 'px;"><tbody><tr><td class="note"> <div style="text-align: center; font-weight: bold;">Loading..</div> </td></tr></tbody></table>');
    }
}

function TeamFixturesPresenter(config) {
    var config = config || {},
        incidentManager = new IncidentManager({
            rootElement: "#" + config.gridId,
            view: TeamIncidentsView
        });
    this.load = function(parameters) {
        renderLoading(config.wrapper);
        parameters = parameters || {};
        var parametersCopy = $.extend({}, config.defaultParameters, parameters);
        DataStore.load("teamfixtures", {
            parameters: parametersCopy,
            success: success,
            error: error,
            dataType: "array",
            cache: true
        }, this);
    };

    function renderLoading(element) {
        var height = $("table", config.wrapper).height();
        $(config.wrapper).html('<table class="grid hover" style="height:' + height + 'px;"><tbody><tr><td class="stats-loading"><div class="loading-text">Loading..</div></td></tr></tbody></table>');
    }

    function success(options, data) {
        incidentManager.clearIncidents();
        var model = new TeamFixturesModel(data);
        $(config.wrapper).html(TeamFixturesView(config.gridId, model, config.defaultParameters.teamId));
        NG.Events.fire(this, "loaded");
    }

    function error() {
        $(config.wrapper).html('<table class="grid hover"><tbody><td class="note empty"> No matches found.. </td></tbody></table>');
    }
}

function TeamFixturesSummaryPresenter(config) {
    var id, config = config || {},
        $view, $content, incidentManager;
    init(config);
    this.load = function(data) {
        renderLoading();
        var records = prepareData(data);
        clearLoading();
        render(records);
    };
    this.id = function() {
        return id;
    };

    function render(records) {
        $content.html(TeamFixturesSummaryView(records.teamId, records));
    }

    function prepareData(data) {
        var previousMatches = new TeamFixturesSummaryModel(data[1], true);
        var nextMatches = new TeamFixturesSummaryModel(data[2]);
        return {
            teamId: data[0],
            previous: previousMatches,
            next: nextMatches
        };
    }

    function init(config) {
        id = config.view.renderTo;
        $view = $("#" + id);
        $content = $("#" + id + "-matches");
        incidentManager = new IncidentManager({
            rootElement: "#" + id,
            view: TeamIncidentsView
        });
    }

    function renderLoading() {
        var height = $("table", $view).height();
        $view.append('<table id="' + (id + "-loading") + '"class="grid hover" style="height:' + height + 'px;"><tbody><tr><td class="note"> <div style="text-align: center; font-weight: bold;">Loading..</div> </td></tr></tbody></table>');
    }

    function clearLoading() {
        $("#" + id + "-loading").remove();
    }

    function error() {
        $view.html('<table class="grid hover"><tbody><td class="note empty"> No matches found.. </td></tbody></table>');
    }
}

function PreviousMeetingsPresenter(config) {
    var config = config || {},
        incidentManager = new IncidentManager({
            rootElement: "#" + config.gridId + "-wrapper",
            view: PreviousMeetingsIncidentsView
        });
    this.load = function(parameters) {
        renderLoading(config.wrapper);
        parameters = parameters || {};
        var parametersCopy = $.extend({}, config.defaultParameters, parameters);
        DataStore.load("previousmeetings", {
            parameters: parametersCopy,
            success: success,
            error: error,
            dataType: "array",
            cache: true
        }, this);
    };

    function renderLoading(element) {
        var height = $("table", config.wrapper).height();
        $(element).html('<table class="grid hover" style="height:' + height + 'px;"><tbody><tr><td class="note"> <span class="stats-loading"><span class="loading-text">Loading..</span></span> </td></tr></tbody></table>');
    }

    function success(options, data) {
        incidentManager.clearIncidents();
        var model = new PreviousMeetingsModel(data);
        if (0 == model.length) {
            $("#previous-meetings-container").hide();
            return;
        }
        $("#previous-meetings-count").html(" (Last " + model.length + " matches)");
        var stats = calculateStats(model, config.homeTeamId, config.awayTeamId);
        $(config.statsWrapper).html(PreviousMeetingsStatsView(stats, {
            name: config.homeTeamName,
            id: config.homeTeamId
        }, {
            name: config.awayTeamName,
            id: config.awayTeamId
        }));
        $(document).triggerHandler("fix-zeros", [$(".previous-stat", $(config.statsWrapper))]);
        $(config.wrapper).html(PreviousMeetingsView(config.gridId, model, config.defaultParameters.teamId));
        NG.Events.fire(this, "loaded");
    }

    function getTeamStatsInMatch(match, teamId) {
        if (match.HomeTeamId == teamId) {
            return {
                Red: match.HomeRCards,
                Yellow: match.HomeYellowCards,
                Goal: getTeamScore(match.Score, 0)
            };
        } else {
            return {
                Red: match.AwayRCards,
                Yellow: match.AwayYellowCards,
                Goal: getTeamScore(match.Score, 1)
            };
        }
    }

    function addNewStats(stats, newStats) {
        for (var stat in newStats) {
            stats[stat] += newStats[stat];
        }
    }

    function calculateStats(records, homeTeamId, awayTeamId) {
        if (null != records && undefined != records) {
            var stats = {
                home: 0,
                draw: 0,
                away: 0,
                homeStats: {
                    Red: 0,
                    Yellow: 0,
                    Goal: 0
                },
                awayStats: {
                    Red: 0,
                    Yellow: 0,
                    Goal: 0
                },
                percentages: {}
            };
            var length = records.length;
            for (var i = 0; i < length; i++) {
                var o = records[i];
                var result = getResult(o, homeTeamId);
                if (result == "w") {
                    stats.home++;
                } else {
                    if (result == "l") {
                        stats.away++;
                    } else {
                        stats.draw++;
                    }
                }
                addNewStats(stats.homeStats, getTeamStatsInMatch(o, homeTeamId));
                addNewStats(stats.awayStats, getTeamStatsInMatch(o, awayTeamId));
            }
            stats.percentages.homeWinPercentage = (0 == length) ? 0 : Math.round((stats.home / length) * 100);
            stats.percentages.awayWinPercentage = (0 == length) ? 0 : Math.round((stats.away / length) * 100);
            stats.percentages.drawPercentage = (0 == length) ? 0 : Math.round((stats.draw / length) * 100);
            stats.totalMatches = length;
            return stats;
        }
    }

    function getTeamScore(score, field) {
        score = stripAlphaChars(score);
        var scores = score.split(":");
        if (null == scores || scores.length != 2) {
            return 0;
        }
        return parseInt(scores[field]);
    }

    function error() {
        $(config.wrapper).html('<table class="grid hover"><tbody><td class="note empty"> No matches found.. </td></tbody></table>');
    }
}

function stripAlphaChars(source) {
    if (!source) {
        return;
    }
    var m_strOut = new String(source);
    m_strOut = m_strOut.replace(/[^0-9:]/g, "");
    return m_strOut;
}

function PreviousMeetingsStatsView(stats, homeInfo, awayInfo) {
    var t = [];
    t.push('<table class="grid summary">');
    t.push("<thead>");
    t.push('<th><span class="incidents-icon ui-icon i-goal"></span></span></th>');
    t.push('<th><span class="incidents-icon ui-icon yellow"></span></th>');
    t.push('<th><span class="incidents-icon ui-icon red"></span></th>');
    t.push("<th></th>");
    t.push('<th><span class="title">Won (' + getPercentage(stats.home, stats.totalMatches) + "%)</span></th>");
    t.push('<th><span class="title">Drew (' + getPercentage(stats.draw, stats.totalMatches) + "%)</span></th>");
    t.push('<th><span class="title">Won (' + getPercentage(stats.away, stats.totalMatches) + "%)</span></th>");
    t.push("<th></th>");
    t.push('<th><span class="incidents-icon ui-icon i-goal"></span></th>');
    t.push('<th><span class="incidents-icon ui-icon yellow"></span></th>');
    t.push('<th><span class="incidents-icon ui-icon red"></span></th>');
    t.push("</thead>");
    t.push("<tbody>");
    t.push("<tr>");
    t.push('<td class="previous-stat">' + stats.homeStats.Goal + "</td>");
    t.push('<td class="previous-stat">' + stats.homeStats.Yellow + "</td>");
    t.push('<td class="previous-stat">' + stats.homeStats.Red + "</td>");
    t.push('<td title="' + homeInfo.name + '">' + WS.TeamEmblemUrl(homeInfo.id) + "</td>");
    t.push("<td>");
    t.push('<span class="stat-bars-with-field-colors" title="' + homeInfo.name + ' win percentage in previous matches">');
    t.push('<span class="stat-bar-wrapper home right" style="width: 60px">');
    t.push('<span class="stat-bar rc-r" style="width: ' + getPreviousMeetingsBarWidth(stats, "homeWinPercentage") + '%;">');
    t.push('<span class="stat-value">' + (stats.home + "/" + stats.totalMatches) + "</span>");
    t.push("</span>");
    t.push("</td>");
    t.push("<td>");
    t.push('<span class="stat-bars-with-field-colors" title="Draw percentage in previous matches">');
    t.push('<span class="stat-bar-wrapper draw" style="width: 60px">');
    t.push('<span class="stat-bar rc-r" style="width: ' + getPreviousMeetingsBarWidth(stats, "drawPercentage") + '%;">');
    t.push('<span class="stat-value">' + (stats.draw + "/" + stats.totalMatches) + "</span>");
    t.push("</span>");
    t.push("</span>");
    t.push("</td>");
    t.push("<td>");
    t.push('<span class="stat-bars-with-field-colors" title="' + awayInfo.name + ' win percentage in previous matches">');
    t.push('<span class="stat-bar-wrapper away" style="width: 60px">');
    t.push('<span class="stat-bar rc-r" style="width: ' + getPreviousMeetingsBarWidth(stats, "awayWinPercentage") + '%;">');
    t.push('<span class="stat-value">' + stats.away + "/" + stats.totalMatches + "</span>");
    t.push("</span>");
    t.push("</span>");
    t.push("</td>");
    t.push('<td title="' + awayInfo.name + '">' + WS.TeamEmblemUrl(awayInfo.id) + "</td>");
    t.push('<td class="previous-stat">' + stats.awayStats.Goal + "</td>");
    t.push('<td class="previous-stat">' + stats.awayStats.Yellow + "</td>");
    t.push('<td class="previous-stat">' + stats.awayStats.Red + "</td>");
    t.push("</tr>");
    t.push("</tbody>");
    t.push("</table>");
    return t.join("");
}

function getPreviousMeetingsBarWidth(stats, percentage) {
    if (stats.percentages[percentage] == 0) {
        return 0;
    }
    var sum = 0,
        count = 0;
    for (var p in stats.percentages) {
        sum += stats.percentages[p];
        count++;
    }
    return parseInt(stats.percentages[percentage] - ((sum - 100) / count));
}

function PreviousMeetingsModel(data) {
    var result = [],
        record;
    if (undefined == data || (undefined == data.length && 0 == data.length)) {
        return result;
    }
    for (var i = 0, l = data.length; i < l; i++) {
        record = data[i];
        var o = {};
        o.Id = record[0];
        o.Status = record[1];
        o.StartDate = record[2];
        o.StartTime = record[3];
        o.HomeTeamId = record[4];
        o.HomeTeamName = record[5];
        o.HomeRCards = record[6];
        o.AwayTeamId = record[7];
        o.AwayTeamName = record[8];
        o.AwayRCards = record[9];
        o.Score = record[10];
        o.HTScore = record[11];
        o.HasIncidents = record[12];
        o.HasPreview = record[13];
        o.Elapsed = record[14];
        o.SeasonName = record[15];
        o.TournamentName = record[16];
        o.Result = record[17];
        o.TournamentId = record[18];
        o.RegionId = record[19];
        o.SeasonId = record[20];
        o.StageId = record[21];
        o.HomeYellowCards = record[22];
        o.AwayYellowCards = record[23];
        o.HomeTeamCountryCode = record[24];
        o.AwayTeamCountryCode = record[25];
        o.TournamentShortName = record[26];
        o.IsInternational = record[27];
        o.IsOpta = record[28] || record[29];
        result.push(o);
    }
    return result;
}

function TeamFixturesSummaryModel(data, asc) {
    var result = [],
        record;
    if (undefined == data || (undefined == data.length && 0 == data.length)) {
        return result;
    }
    for (var i = 0, l = data.length; i < l; i++) {
        record = data[i];
        var o = {};
        o.Id = record[0];
        o.Status = record[1];
        o.StartDate = record[2];
        o.StartTime = record[3];
        o.HomeTeamId = record[4];
        o.HomeTeamName = record[5];
        o.HomeRCards = record[6];
        o.AwayTeamId = record[7];
        o.AwayTeamName = record[8];
        o.AwayRCards = record[9];
        o.Score = record[10];
        o.HTScore = record[11];
        o.HasIncidents = record[12];
        o.HasPreview = record[13];
        o.Elapsed = record[14];
        o.SeasonName = record[15];
        o.TournamentName = record[16];
        o.Result = record[17];
        o.TournamentId = record[18];
        o.RegionId = record[19];
        o.SeasonId = record[20];
        o.StageId = record[21];
        o.TournamentShortName = record[22];
        o.HomeTeamCountryCode = record[23];
        o.AwayTeamCountryCode = record[24];
        o.IsInternational = record[25];
        o.IsOpta = record[26] || record[27];
        result.push(o);
    }
    if (asc) {
        var reverted = [];
        for (var i = result.length - 1, l = 0; l <= i; i--) {
            reverted.push(result[i]);
        }
        return reverted;
    }
    return result;
}

function TeamFixturesModel(data) {
    var result = [],
        record;
    if (undefined == data || (undefined == data.length && 0 == data.length)) {
        return result;
    }
    for (var i = 0, l = data.length; i < l; i++) {
        record = data[i];
        var o = {};
        o.Id = record[0];
        o.Status = record[1];
        o.StartDate = record[2];
        o.StartTime = record[3];
        o.HomeTeamId = record[4];
        o.HomeTeamName = record[5];
        o.HomeRCards = record[6];
        o.AwayTeamId = record[7];
        o.AwayTeamName = record[8];
        o.AwayRCards = record[9];
        o.Score = record[10];
        o.HTScore = record[11];
        o.HasIncidents = record[12];
        o.HasPreview = record[13];
        o.Elapsed = record[14];
        o.SeasonName = record[15];
        o.TournamentName = record[16];
        o.Result = record[17];
        o.TournamentId = record[18];
        o.RegionId = record[19];
        o.SeasonId = record[20];
        o.StageId = record[21];
        o.TournamentShortName = record[22];
        o.HomeTeamCountryCode = record[23];
        o.AwayTeamCountryCode = record[24];
        o.IsInternational = record[25];
        o.IsOpta = record[26] || record[27];
        result.push(o);
    }
    return result;
}

function H2HTeamFixturesModel(data) {
    var result = {
            lastMatches: [],
            nextMatch: []
        },
        record;
    var lastMatches = data[0];
    var nextMatch = data[1];
    if (undefined == data || (undefined == data.length && 0 == data.length)) {
        return result;
    }

    function getModel(record) {
        var o = {};
        o.Id = record[0];
        o.Status = record[1];
        o.StartDate = record[2];
        o.StartTime = record[3];
        o.HomeTeamId = record[4];
        o.HomeTeamName = record[5];
        o.HomeRCards = record[6];
        o.AwayTeamId = record[7];
        o.AwayTeamName = record[8];
        o.AwayRCards = record[9];
        o.Score = record[10];
        o.HTScore = record[11];
        o.HasIncidents = record[12];
        o.HasPreview = record[13];
        o.Elapsed = record[14];
        o.SeasonName = record[15];
        o.TournamentName = record[16];
        o.Result = record[17];
        o.TournamentId = record[18];
        o.RegionId = record[19];
        o.SeasonId = record[20];
        o.StageId = record[21];
        o.TournamentShortName = record[22];
        o.HomeTeamCountryCode = record[23];
        o.AwayTeamCountryCode = record[24];
        o.IsInternational = record[25];
        o.IsOpta = record[26] || record[27];
        return o;
    }

    for (var i = 0, l = lastMatches.length; i < l; i++) {
        result.lastMatches.push(getModel(lastMatches[i]));
    }
    for (var i = 0, l = nextMatch.length; i < l; i++) {
        result.nextMatch.push(getModel(nextMatch[i]));
    }
    return result;
}
var unexpectedTerminationStatuses = [{
    v: "Abd",
    t: "Abandoned"
}, {
    v: "Post",
    t: "Postponed"
}, {
    v: "Can",
    t: "Canceled"
}, {
    v: "Susp",
    t: "Suspended"
}];

function matchTerminatedUnexpectedly(elapsed) {
    for (var i = 0; i < unexpectedTerminationStatuses.length; i++) {
        if (elapsed == unexpectedTerminationStatuses[i].v) {
            return true;
        }
    }
    return false;
}

function matchTerminatedUnexpectedlyToolTip(elapsed) {
    for (var i = 0; i < unexpectedTerminationStatuses.length; i++) {
        if (elapsed == unexpectedTerminationStatuses[i].v) {
            return unexpectedTerminationStatuses[i].t;
        }
    }
    return "";
}

function PreviousMeetingsView(gridId, data, teamId) {
    var o, t = [],
        lastDate = null;
    t.push('<table id="' + gridId + '" class="grid fixture"><tbody>');
    var length = data.length;
    if (0 == length) {
        t.push('<td class="note empty"> No matches found.. </td>');
    } else {
        for (var i = 0, l = data.length; i < l; i++) {
            o = data[i];
            var matchHasTerminatedUnexpectedly = matchTerminatedUnexpectedly(o.Elapsed);
            t.push('<tr class="item ' + ((0 == i % 2) ? "alt" : "") + '"');
            t.push(' data-id="');
            t.push(o.Id);
            t.push('">');
            t.push('<td class="toolbar">');
            if (o.HasIncidents) {
                t.push('<a href="#" class="show-incidents button-small ui-state-transparent-default rc" title="Details"><span class="ui-icon ui-icon-triangle-1-e"></span></a>');
            }
            t.push("</td>");
            t.push('<td class="tournament"><a title="' + o.TournamentName + '" class="tournament-link" href="/Regions/' + o.RegionId + "/Tournaments/" + o.TournamentId + "/Seasons/" + o.SeasonId + "/Stages/" + o.StageId + '">' + (o.TournamentShortName ? o.TournamentShortName : o.TournamentName) + "</a></td>");
            t.push('<td class="date">' + o.StartDate + "</td>");
            t.push('<td class="status">');
            if (matchTerminatedUnexpectedly) {
                t.push('<span class="status-' + o.Status + ' rc">' + o.Elapsed + "</span>");
            }
            t.push("</td>");
            t.push('<td class="team home' + (1 == o.Result ? " winner" : "") + '">');
            if (0 < o.HomeRCards) {
                t.push('<span class="rcard ls-e">' + o.HomeRCards + "</span>");
            }
            if (o.IsInternational && o.HomeTeamCountryCode) {
                t.push(WS.TeamLink(o.HomeTeamId, o.HomeTeamName));
            } else {
                t.push(WS.TeamLink(o.HomeTeamId, o.HomeTeamName));
            }
            t.push("</td>");
            t.push('<td class="result">');
            if (o.HasPreview && "4" == o.Status) {
                t.push('<a href="/Matches/' + o.Id + '/Preview" class="iconize" title="Preview"><span class="incidents-icon ui-icon preview"></span></a>');
            } else {
                if (matchHasTerminatedUnexpectedly) {
                    t.push('<a title="' + matchTerminatedUnexpectedlyToolTip(o.Elapsed) + '" href="/Matches/' + o.Id + '">' + o.Score + "</a>");
                } else {
                    if (("2" == o.Status || "1" == o.Status)) {
                        t.push('<a class="result-' + o.Status + ' rc" href="/Matches/' + o.Id + '/Live">' + o.Score + "</a>");
                    } else {
                        t.push('<a class="result-' + o.Status + ' rc"  href="/Matches/' + o.Id + '">' + o.Score + "</a>");
                    }
                }
            }
            t.push("</td>");
            t.push('<td class="team away' + (2 == o.Result ? " winner" : "") + '">');
            if (o.IsInternational && o.AwayTeamCountryCode) {
                t.push(WS.TeamLink(o.AwayTeamId, o.AwayTeamName));
            } else {
                t.push(WS.TeamLink(o.AwayTeamId, o.AwayTeamName));
            }
            if (0 < o.AwayRCards) {
                t.push('<span class="rcard ls-e">' + o.AwayRCards + "</span>");
            }
            t.push("</td>");
            t.push('<td class="toolbar right">');
            t.push('<a href="/Matches/' + o.Id + '" class="iconize" title="Head to head"><span class="incidents-icon ui-icon h2h"></span></a>');
            if (o.HasPreview && "4" != o.Status) {
                t.push('<a href="/Matches/' + o.Id + '/Preview" class="iconize" title="Preview"><span class="incidents-icon ui-icon preview"></span></a>');
            }
            t.push("</td>");
            t.push("</tr>");
        }
    }
    t.push("</tbody></table>");
    return t.join("");
}

function H2HTeamFixturesView(matches, teamId, field) {
    function getRow(o, i, field, clazz) {
        var matchHasTerminatedUnexpectedly = matchTerminatedUnexpectedly(o.Elapsed);
        var row = [];
        row.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + " " + (clazz ? clazz : "") + '">');
        if ("away" == field) {
            row.push('<td class="form">');
            var result = getResult(o, teamId);
            if (result) {
                row.push('<a class=" box ' + result + '" href="/Matches/' + o.Id + '">' + result + "</a>");
            }
            row.push("</td>");
        }
        row.push("<td>");
        row.push('<ul style="text-align: ' + ("home" == field ? "left" : "right") + '">');
        if ("home" == field) {
            row.push('<li class="tournament"><a title="' + o.TournamentName + '" class="tournament-link" href="/Regions/' + o.RegionId + "/Tournaments/" + o.TournamentId + "/Seasons/" + o.SeasonId + "/Stages/" + o.StageId + '">' + (o.TournamentShortName ? o.TournamentShortName : o.TournamentName) + "</a></li>");
            row.push('<li class="team home' + (1 == o.Result ? " winner" : "") + '">');
            row.push(WS.TeamLink(o.HomeTeamId, getShortDisplayName(o.HomeTeamName), null, o.HomeTeamName));
            if (0 < o.HomeRCards) {
                row.push('<span class="rcard ls-e">' + o.HomeRCards + "</span>");
            }
            row.push("</li>");
        } else {
            row.push('<li class="date ta-left">' + o.StartDate + "</li>");
            row.push('<li class="team home' + (1 == o.Result ? " winner" : "") + '">');
            row.push(WS.TeamLink(o.HomeTeamId, getShortDisplayName(o.HomeTeamName), null, o.HomeTeamName));
            if (0 < o.HomeRCards) {
                row.push('<span class="rcard ls-e">' + o.HomeRCards + "</span>");
            }
            row.push("</li>");
        }
        row.push("</ul>");
        row.push("</td>");
        row.push('<td class="result">');
        if (o.HasPreview && "4" == o.Status) {
            row.push('<a href="/Matches/' + o.Id + '/Preview" class="iconize" title="Preview"><span class="incidents-icon ui-icon preview"></span></a>');
        } else {
            if (matchHasTerminatedUnexpectedly) {
                row.push('<a title="' + matchTerminatedUnexpectedlyToolTip(o.Elapsed) + '" href="/Matches/' + o.Id + '/Live">' + o.Elapsed + "</a>");
            } else {
                row.push('<a href="/Matches/' + o.Id + '">' + o.Score + "</a>");
            }
        }
        row.push("</td>");
        row.push("<td>");
        row.push("<ul>");
        if ("home" == field) {
            row.push('<li class="date ta-right">' + o.StartDate + "</li>");
            row.push('<li class="team away' + (2 == o.Result ? " winner" : "") + '">');
            if (0 < o.AwayRCards) {
                row.push('<span class="rcard ls-e">' + o.AwayRCards + "</span>");
            }
            row.push(WS.TeamLink(o.AwayTeamId, getShortDisplayName(o.AwayTeamName), null, o.AwayTeamName));
            row.push("</li>");
        } else {
            row.push('<li class="tournament ta-right"><a title="' + o.TournamentName + '" class="tournament-link" href="/Regions/' + o.RegionId + "/Tournaments/" + o.TournamentId + "/Seasons/" + o.SeasonId + "/Stages/" + o.StageId + '">' + (o.TournamentShortName ? o.TournamentShortName : o.TournamentName) + "</a></li>");
            row.push('<li class="team away' + (2 == o.Result ? " winner" : "") + '">');
            if (0 < o.AwayRCards) {
                row.push('<span class="rcard ls-e">' + o.AwayRCards + "</span>");
            }
            row.push(WS.TeamLink(o.AwayTeamId, getShortDisplayName(o.AwayTeamName), null, o.AwayTeamName));
            row.push("</li>");
        }
        row.push("</ul>");
        row.push("</td>");
        if ("home" == field) {
            row.push('<td class="form">');
            var result = getResult(o, teamId);
            if (result) {
                row.push('<a class=" box ' + result + '" href="/Matches/' + o.Id + '">' + result + "</a>");
            }
            row.push("</td>");
        }
        row.push("</tr>");
        return row.join("");
    }

    var o, t = [];
    t.push('<table class="grid"><tbody>');
    if (0 != matches.lastMatches.length) {
        for (var i = matches.lastMatches.length - 1; 0 <= i; i--) {
            o = matches.lastMatches[i];
            t.push(getRow(o, i, field));
        }
    }
    if (0 != matches.nextMatch.length) {
        for (var i = matches.nextMatch.length - 1; 0 <= i; i--) {
            o = matches.nextMatch[i];
            t.push(getRow(o, i, field, "next-match"));
        }
    }
    t.push("</tbody></table>");
    return t.join("");
}

function TeamFixturesView(gridId, data, teamId) {
    var o, t = [];
    t.push('<table id="' + gridId + '" class="grid fixture"><tbody>');
    var length = data.length;
    if (0 == length) {
        t.push('<tr><td class="note empty"> No matches found.. </td></tr>');
    } else {
        for (var i = 0, l = data.length; i < l; i++) {
            o = data[i];
            var matchHasTerminatedUnexpectedly = matchTerminatedUnexpectedly(o.Elapsed);
            t.push('<tr class="item ' + ((0 == i % 2) ? "alt" : "") + '"');
            t.push('" data-id="');
            t.push(o.Id);
            t.push('">');
            t.push('<td class="toolbar left">');
            if (o.HasIncidents) {
                t.push('<a href="#" class="show-incidents button-small ui-state-transparent-default rc" title="Details"><span class="ui-icon ui-icon-triangle-1-e"></span></a>');
            }
            t.push("</td>");
            t.push('<td class="form">');
            var result = getResult(o, teamId);
            if (result) {
                t.push('<a class=" box ' + getResult(o, teamId) + '" href="/Matches/' + o.Id + '">' + getResult(o, teamId) + "</a>");
            }
            t.push("</td>");
            t.push('<td class="tournament"><a title="' + o.TournamentName + '"class="tournament-link" href="/Regions/' + o.RegionId + "/Tournaments/" + o.TournamentId + "/Seasons/" + o.SeasonId + "/Stages/" + o.StageId + '">' + (o.TournamentShortName ? o.TournamentShortName : o.TournamentName) + "</a></td>");
            t.push('<td class="date">' + o.StartDate + "</td>");
            t.push('<td class="status">');
            if (matchHasTerminatedUnexpectedly) {
                t.push('<span class="status-' + o.Status + ' rc">' + o.Elapsed + "</span>");
            }
            t.push("</td>");
            t.push('<td class="team home' + (1 == o.Result ? " winner" : "") + '">');
            if (0 < o.HomeRCards) {
                t.push('<span class="rcard ls-e">' + o.HomeRCards + "</span>");
            }
            if (o.IsInternational && o.HomeTeamCountryCode) {
                t.push(WS.TeamLink(o.HomeTeamId, o.HomeTeamName));
            } else {
                t.push(WS.TeamLink(o.HomeTeamId, o.HomeTeamName));
            }
            t.push("");
            t.push("</td>");
            t.push('<td class="result">');
            if (matchHasTerminatedUnexpectedly) {
                t.push('<a title="' + matchTerminatedUnexpectedlyToolTip(o.Elapsed) + ' " href="/Matches/' + o.Id + '">' + o.Score + "</a>");
            } else {
                if (("2" == o.Status || "1" == o.Status)) {
                    t.push('<a class="result-' + o.Status + ' rc" href="/Matches/' + o.Id + '/Live">' + o.Score + "</a>");
                } else {
                    t.push('<a class="result-' + o.Status + ' rc"  href="/Matches/' + o.Id + '">' + o.Score + "</a>");
                }
            }
            t.push("</td>");
            t.push('<td class="team away' + (2 == o.Result ? " winner" : "") + '">');
            if (o.IsInternational && o.AwayTeamCountryCode) {
                t.push(WS.TeamLink(o.AwayTeamId, o.AwayTeamName));
            } else {
                t.push(WS.TeamLink(o.AwayTeamId, o.AwayTeamName));
            }
            if (0 < o.AwayRCards) {
                t.push('<span class="rcard ls-e">' + o.AwayRCards + "</span>");
            }
            t.push("</td>");
            t.push('<td class="toolbar right">');
            if ("1" == o.Status && o.IsOpta && !matchHasTerminatedUnexpectedly) {
                t.push('<a href="/Matches/' + o.Id + '/MatchReport" class="match-link match-report rc">Match Report</a>');
            }
            if ("2" == o.Status) {
                t.push('<a href="/Matches/' + o.Id + '/Live" class="match-link live rc" title="Live">Match Centre</a>');
            }
            if ("4" == o.Status && o.HasPreview) {
                t.push('<a href="/Matches/' + o.Id + '/Preview" class="match-link preview rc" title="Preview">Preview</a>');
            }
            t.push("</td>");
            t.push("</tr>");
        }
    }
    t.push("</tbody></table>");
    return t.join("");
}

function TeamFixturesSummaryView(teamId, records, nextMatches) {
    function getHtmlForRecord(record, i) {
        var t = [];
        var matchHasTerminatedUnexpectedly = matchTerminatedUnexpectedly(o.Elapsed);
        t.push('<tr class="item ' + (0 == i % 2 ? "alt" : "") + '"');
        t.push('" data-id="');
        t.push(o.Id);
        t.push('">');
        t.push('<td class="toolbar left">');
        if (o.HasIncidents) {
            t.push('<a href="#" class="show-incidents button-small ui-state-transparent-default rc" title="Details"><span class="ui-icon ui-icon-triangle-1-e"></span></a>');
        }
        t.push("</td>");
        t.push('<td class="form">');
        var result = getResult(o, teamId);
        if (result) {
            t.push('<a class=" box ' + getResult(o, teamId) + '" href="/Matches/' + o.Id + '">' + getResult(o, teamId) + "</a>");
        }
        t.push("</td>");
        t.push('<td class="tournament">');
        t.push('<a title="' + o.TournamentName + '"class="tournament-link" href="/Regions/' + o.RegionId + "/Tournaments/" + o.TournamentId + "/Seasons/" + o.SeasonId + "/Stages/" + o.StageId + '">');
        t.push((o.TournamentShortName ? o.TournamentShortName : o.TournamentName));
        t.push("</a></td>");
        t.push('<td class="date">' + o.StartDate + "</td>");
        t.push('<td class="status">');
        if (matchHasTerminatedUnexpectedly) {
            t.push('<span class="status-' + o.Status + ' rc">' + o.Elapsed + "</span>");
        }
        t.push("</td>");
        t.push('<td class="team home' + (1 == o.Result ? " winner" : "") + '">');
        if (0 < o.HomeRCards) {
            t.push('<span class="rcard ls-e">' + o.HomeRCards + "</span>");
        }
        if (o.IsInternational && o.HomeTeamCountryCode) {
            t.push(WS.TeamLink(o.HomeTeamId, o.HomeTeamName));
        } else {
            t.push(WS.TeamLink(o.HomeTeamId, o.HomeTeamName));
        }
        t.push("");
        t.push("</td>");
        t.push('<td class="result">');
        if (matchHasTerminatedUnexpectedly) {
            t.push('<a   title="' + matchTerminatedUnexpectedlyToolTip(o.Elapsed) + '" href="/Matches/' + o.Id + '">' + o.Score + "</a>");
        } else {
            if (("2" == o.Status || "1" == o.Status)) {
                t.push('<a class="result-' + o.Status + ' rc" href="/Matches/' + o.Id + '/Live">' + o.Score + "</a>");
            } else {
                t.push('<a class="result-' + o.Status + ' rc"  href="/Matches/' + o.Id + '">' + o.Score + "</a>");
            }
        }
        t.push("</td>");
        t.push('<td class="team away' + (2 == o.Result ? " winner" : "") + '">');
        if (o.IsInternational && o.AwayTeamCountryCode) {
            t.push(WS.TeamLink(o.AwayTeamId, o.AwayTeamName));
        } else {
            t.push(WS.TeamLink(o.AwayTeamId, o.AwayTeamName));
        }
        if (0 < o.AwayRCards) {
            t.push('<span class="rcard ls-e">' + o.AwayRCards + "</span>");
        }
        t.push("</td>");
        t.push('<td class="toolbar right">');
        if ("1" == o.Status && o.IsOpta && !matchHasTerminatedUnexpectedly) {
            t.push('<a href="/Matches/' + o.Id + '/MatchReport" class="match-link match-report rc">Match Report</a>');
        }
        if ("2" == o.Status) {
            t.push('<a href="/Matches/' + o.Id + '/Live" class="match-link live rc" title="Live">Match Centre</a>');
        }
        if ("4" == o.Status && o.HasPreview) {
            t.push('<a href="/Matches/' + o.Id + '/Preview" class="match-link preview rc" title="Preview">Preview</a>');
        }
        t.push("</td>");
        t.push("</tr>");
        return t.join("");
    }

    var o, t = [],
        lastDate = null;
    t.push('<table id="team-fixtures-summary" class="grid fixture"><tbody>');
    if (0 == records.previous.length) {
        t.push("");
    } else {
        for (var i = 0, l = records.previous.length; i < l; i++) {
            o = records.previous[i];
            t.push(getHtmlForRecord(o, i));
        }
    }
    if (0 == records.next.length) {
        t.push('<tr><td colspan="99" class="info"> No upcoming matches found.. </td></tr>');
    } else {
        for (var i = 0, l = records.next.length; i < l; i++) {
            o = records.next[i];
            t.push(getHtmlForRecord(o, i));
        }
    }
    t.push("</tbody>");
    t.push("</table>");
    return t.join("");
}
var PreviousMeetingsIncidentsView = function(id, data, className) {
    function getIncidentClass(type, subType) {
        return (1 == type) ? "i-goal" : (subType && 2 == subType) ? "i-y2card" : "i-rcard";
    }

    var t = [],
        detail;
    for (var i = 0, l = data.length; i < l; i++) {
        detail = data[i];
        var period = detail[7];
        var minute = detail[1];
        if (period) {
            if (1 == period && 45 < minute) {
                minute = 45;
            } else {
                minute = Math.min(period * 45, minute);
            }
        }
        t.push('<tr class="' + (className || "") + " incident " + (i == data.length - 1 ? "last" : "") + '" data-match-id="m');
        t.push(id);
        t.push('">');
        t.push('<td class="toolbar"></td>');
        t.push('<td class="tournament"></td>');
        t.push('<td class="date"></td>');
        t.push('<td class="status"></td>');
        if ("0" == detail[2]) {
            t.push('<td class="team home">');
            t.push('<span class="iconize iconize-icon-right"><span class="incidents-icon ui-icon ' + getIncidentClass(detail[0], detail[5]) + '"></span>');
            if (detail[4] != undefined) {
                t.push('<span class="goal-info">(' + detail[4] + ")</span>");
            }
            t.push(WS.PlayerLink(detail[6], detail[3]));
            t.push("</span>");
            t.push("</td>");
            t.push('<td class="minute">');
            t.push(minute);
            t.push("'</td>");
            t.push('<td class="team away"></td>');
            t.push('<td class="toolbar"></td>');
        } else {
            t.push('<td class="team home"></td>');
            t.push('<td class="minute">');
            t.push(minute);
            t.push("'</td>");
            t.push('<td class="team away">');
            t.push('<span class="iconize iconize-icon-left"><span class="incidents-icon ui-icon ' + getIncidentClass(detail[0], detail[5]) + '"></span>');
            t.push(WS.PlayerLink(detail[6], detail[3]));
            if (detail[4] != undefined) {
                t.push('<span class="goal-info">(' + detail[4] + ")</span>");
            }
            t.push("</span>");
            t.push("</td>");
            t.push('<td class="toolbar"></td>');
        }
        t.push("</tr>");
    }
    return t.join("");
};
var TeamIncidentsView = function(id, data, className) {
    function getIncidentClass(type, subType) {
        return (1 == type) ? "i-goal" : (subType && 2 == subType) ? "i-y2card" : "i-rcard";
    }

    var t = [],
        detail;
    for (var i = 0, l = data.length; i < l; i++) {
        detail = data[i];
        var period = detail[7];
        var minute = detail[1];
        if (period) {
            if (1 == period && 45 < minute) {
                minute = 45;
            } else {
                minute = Math.min(period * 45, minute);
            }
        }
        t.push('<tr class="' + (className || "") + " incident " + (i == data.length - 1 ? "last" : "") + '" data-match-id="m');
        t.push(id);
        t.push('">');
        t.push('<td class="toolbar"></td>');
        t.push('<td class="form"></td>');
        t.push('<td class="tournament"></td>');
        t.push('<td class="date"></td>');
        t.push('<td class="status"></td>');
        if ("0" == detail[2]) {
            t.push('<td class="team home">');
            t.push('<span class="iconize iconize-icon-right"><span class="incidents-icon ui-icon ' + getIncidentClass(detail[0], detail[5]) + '"></span>');
            if (detail[4] != undefined) {
                t.push('<span class="goal-info">(' + detail[4] + ")</span>");
            }
            t.push(WS.PlayerLink(detail[6], detail[3]));
            t.push("</span>");
            t.push("</td>");
            t.push('<td class="minute">');
            t.push(minute);
            t.push("'</td>");
            t.push('<td class="team away"></td>');
            t.push('<td class="toolbar"></td>');
        } else {
            t.push('<td class="team home"></td>');
            t.push('<td class="minute">');
            t.push(minute);
            t.push("'</td>");
            t.push('<td class="team away">');
            t.push('<span class="iconize iconize-icon-left"><span class="incidents-icon ui-icon ' + getIncidentClass(detail[0], detail[5]) + '"></span>');
            t.push(WS.PlayerLink(detail[6], detail[3]));
            if (detail[4] != undefined) {
                t.push('<span class="goal-info">(' + detail[4] + ")</span>");
            }
            t.push("</span>");
            t.push("</td>");
            t.push('<td class="toolbar"></td>');
        }
        t.push("</tr>");
    }
    return t.join("");
};

function IncidentManager(config) {
    var config = config || {},
        visibleIncidents = {};
    this.clearIncidents = function() {
        visibleIncidents = {};
    };
    setTimeout(function() {
        $(config.rootElement).on("click", ".button-small.show-incidents", function(e) {
            toggleIncidents($(e.currentTarget));
            return false;
        });
    }, 0);

    function toggleIncidents($el) {
        var id = $el.parents("tr:first").attr("data-id");
        (undefined !== visibleIncidents[id]) ? hideIncidents(id): showIncidents(id);
    }

    function showIncidents(id) {
        var $tr = getTr(id).addClass("hasDetails");
        var $button = $tr.find(".button-small.show-incidents").addClass("ui-state-active").blur().find(".ui-icon").removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-s");
        DataStore.load("livescoreincidents", {
            parameters: {
                id: id
            },
            cache: true,
            tr: $tr,
            success: incidentsSuccess,
            error: null,
            dataType: "array"
        }, this);
    }

    function incidentsSuccess(options, data) {
        var id = options.parameters.id,
            $tr = getTr(id),
            className = (-1 < $tr.attr("class").indexOf("alt")) ? "alt" : undefined;
        visibleIncidents[id] = true;
        $('tr[data-match-id="m' + id + '"]', config.rootElement).remove();
        $tr.after(config.view.call(null, id, data, className));
    }

    function hideIncidents(id) {
        delete visibleIncidents[id];
        var $tr = getTr(id).removeClass("hasDetails");
        var $button = $tr.find(".button-small.show-incidents").removeClass("ui-state-active").blur().find(".ui-icon").removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e");
        $('tr[data-match-id="m' + id + '"]', config.rootElement).remove();
    }

    function getTr(id) {
        return $('tr[data-id="' + id + '"]', config.rootElement);
    }
}

function Regions(config) {
    var id = "#" + config.id;
    var $this = $(id);
    var regions = new RegionsModel(config.regions);
    var $teamsView = $("table.grid.team tbody", $this);
    init();

    function init() {
        NG.Events.addGlobal("regionsfilterchanged", function(filter) {
            renderInitialInfo();
            updateRegions(filter);
        });
        var filter = new RegionsFilter(id, regions);
        filter.load();
    }

    function updateRegions(filter) {
        var regions = loadRegions(filter);
        $("table.grid.region tbody", $this).html(RegionsView(regions));
        $("table.grid.region a", $this).click(function(e) {
            e.preventDefault();
            $("table.grid.region a.selected span.with-solo-icon span").hide();
            $("table.grid.region a.selected", $this).removeClass("selected");
            $(this).addClass("selected");
            $("span.with-solo-icon span", $(this)).addClass("ui-icon-carat-1-e");
            $("span.with-solo-icon span", $(this)).fadeIn();
            updateTeams($(this).attr("data-value"));
        });
    }

    function loadRegions(filter) {
        var filteredRecords = [];
        for (var i = 0; i < regions.length; i++) {
            if (regions[i].Name.charAt(0) == filter) {
                filteredRecords.push(regions[i]);
            }
        }
        return filteredRecords;
    }

    function updateTeams(regionId) {
        var teams = loadTeams(regionId);
    }

    function loadTeams(regionId) {
        renderLoading();
        DataStore.load("regionteams", {
            parameters: {
                id: regionId
            },
            cache: true,
            success: function(options, data) {
                var teams = new RegionsTeamsModel(data);
                if (teams && 0 < teams.length) {
                    renderTeams(teams);
                } else {
                    renderEmptyResult();
                }
            },
            error: function(options, data) {
                renderEmptyResult();
            },
            dataType: "array"
        });
    }

    function renderTeams(teams) {
        $teamsView.html(RegionsTeamsView(teams));
    }

    function renderEmptyResult() {
        $teamsView.html('<div class="info">No teams found..</div>');
    }

    function renderLoading() {
        $teamsView.html('<div class="info iconize iconize-icon-left"><span class="ui-icon ui-icon-refresh"/> Loading..</div>');
    }

    function renderInitialInfo() {
        $teamsView.html('<div class="info iconize iconize-icon-left"><span class="ui-icon ui-icon-carat-1-w"></span> Please select a region to view the teams</div>');
    }
}

function RegionsModel(regions) {
    var records = [];
    for (var i = 0; i < regions.length; i++) {
        var o = {
            Id: regions[i][0],
            Code: regions[i][1],
            Name: regions[i][2]
        };
        records.push(o);
    }
    return records;
}

function RegionsView(records) {
    var t = [];
    for (var i = 0; i < records.length; i = i + 2) {
        t.push("<tr>");
        t.push("<td>");
        t.push('<a class="iconize iconize-icon-left" href="#" data-value="' + records[i].Id + '"><span class="ui-icon country flg-' + records[i].Code + '"></span>' + records[i].Name + '<span class="with-solo-icon"><span class="ui-icon"></span></span></a>');
        t.push("</td>");
        if (i != records.length - 1) {
            t.push("<td>");
            t.push('<a class="iconize iconize-icon-left" href="#" data-value="' + records[i + 1].Id + '"><span class="ui-icon country flg-' + records[i + 1].Code + '"></span>' + records[i + 1].Name + '<span class="with-solo-icon"><span class="ui-icon"></span></span></a>');
            t.push("</td>");
            t.push("</tr>");
        }
    }
    return t.join("");
}

function RegionsFilter(id, regions) {
    var $this = $(id + "-filter-view");

    function getMask() {
        var mask = [];
        var index = 0;
        for (var i = 0; i < regions.length; i++) {
            if (!maskContains(mask, regions[i].Name.charAt(0))) {
                mask[index++] = regions[i].Name.charAt(0);
            }
        }
        return mask;
    }

    function maskContains(mask, key) {
        for (var i = 0; i < mask.length; i++) {
            if (mask[i] == key) {
                return true;
            }
        }
        return false;
    }

    this.load = function() {
        var mask = getMask();
        $this.html(RegionsFilterView(mask));
        $("dd", $this).on("click", "a", function(e) {
            e.preventDefault();
            $("dd a.selected", $this).removeClass("selected");
            $(this).addClass("selected");
            NG.Events.fireGlobal("regionsfilterchanged", [$(this).attr("data-value")]);
        });
        $("dd:first a", $this).click();
    };
}

function RegionsFilterView(mask) {
    var t = [];
    if (mask) {
        t.push("<dt>Countries:</dt>");
        for (var i = 0; i < mask.length; i++) {
            t.push('<dd><a data-value="' + mask[i] + '" href="#" class="option">' + mask[i] + "</a></dd>");
        }
    }
    return t.join("");
}

function RegionsTeamsModel(teams) {
    var records = [];
    for (var i = 0; i < teams.length; i++) {
        var o = {
            Id: teams[i][0],
            Name: teams[i][1]
        };
        records.push(o);
    }
    return records;
}

function RegionsTeamsView(records) {
    var t = [];
    for (var i = 0; i < records.length; i = i + 2) {
        t.push("<tr>");
        t.push("<td>");
        t.push('<a class="iconize iconize-icon-left" href="/Teams/' + records[i].Id + '"><span class="ui-icon ui-icon-carat-1-e"></span>' + records[i].Name + "</a>");
        t.push("</td>");
        if (i != records.length - 1) {
            t.push("<td>");
            t.push('<a class="iconize iconize-icon-left" href="/Teams/' + records[i + 1].Id + '"><span class="ui-icon ui-icon-carat-1-e"></span>' + records[i + 1].Name + "</a>");
            t.push("</td>");
        }
        t.push("</tr>");
    }
    return t.join("");
}

function MatchCommentary(config) {
    var id, summary, timeline, commentaryText, commentaryTextFilter, model, uiState, canMarkComment;
    init(config);
    this.load = function(data) {
        model = new MatchCommentaryModel(data);
        timeline.render(model.timeline);
        text.render(model.text, uiState.teamSelection);
        markSelectedComment();
        if (!uiState.selectedCommentId) {
            timeline.selectLast();
        }
    };

    function markSelectedComment() {
        if (!canMarkComment) {
            return;
        }
        commentaryTextFilter.select({
            field: "all",
            type: "all"
        });
        text.selectComment(uiState.selectedCommentId);
    }

    function init(config) {
        id = config.id;
        summary = new MatchCommentarySummary({
            id: "#" + id + "-summary"
        });
        timeline = new MatchCommentaryTimeLine({
            id: "#" + id + "-time-line"
        });
        var commentaryTextFilterConfig = {
            instanceType: WS.Filter,
            id: id + "-text-filter",
            categories: {
                data: [{
                    value: "field"
                }]
            },
            singular: true
        };
        commentaryTextFilter = new WS.Filter(commentaryTextFilterConfig);
        text = new MatchCommentaryText({
            id: "#" + id + "-text-content"
        });
        bindEvents();
        uiState = {
            teamSelection: null,
            selectedCommentId: null
        };
    }

    function clearSelectedComment() {
        uiState.selectedCommentId = false;
        canMarkComment = false;
    }

    function bindEvents() {
        $("#" + commentaryTextFilter.id()).bind(("selected"), function() {
            uiState.teamSelection = commentaryTextFilter.getSelection();
            text.render(model.text, uiState.teamSelection);
            if ("all" != uiState.teamSelection.data.field) {
                clearSelectedComment();
            }
        });
        $("#" + id + "-time-line").bind("selected", function(options, commentId) {
            uiState.selectedCommentId = commentId;
            canMarkComment = true;
            markSelectedComment();
        });
    }
}

function MatchCommentaryModel(data) {
    var timeLineStatTypes = ["goal", "red", "yellow", "subst-in", "shot", "penalty-missed", "owngoal"];
    var summaryStatTypes = ["goal", "red", "yellow", "subst-in", "shot", "penalty-missed", "corner", "offside", "foul", "owngoal"];
    var statTypes = [{
        v: "red card",
        d: "red"
    }, {
        v: "yellow card",
        d: "yellow"
    }, {
        v: "secondyellow card",
        d: "red"
    }, {
        v: "substitution",
        d: "subst-in"
    }, {
        v: "free kick lost",
        d: "foul"
    }, {
        v: "attempt blocked",
        d: "shot"
    }, {
        v: "attempt saved",
        d: "shot"
    }, {
        v: "post",
        d: "shot"
    }, {
        v: "miss",
        d: "shot"
    }, {
        v: "miss penalty",
        d: "penalty-missed"
    }, {
        v: "penalty saved",
        d: "penalty-missed"
    }, {
        v: "penalty miss",
        d: "penalty-missed"
    }, {
        v: "own goal free kick",
        d: "owngoal"
    }, {
        v: "own goal",
        d: "owngoal"
    }];

    function getRecord(commentData) {
        var record = {};
        var statType = getStatType(commentData[1]);
        var field = commentData[3];
        record.time = commentData[0] ? commentData[0] : "";
        record.type = statType;
        record.text = commentData[2];
        record.field = "owngoal" == statType ? ("home" == field ? "away" : "home") : commentData[3];
        return record;
    }

    function getStatType(type) {
        for (var i = 0; i < statTypes.length; i++) {
            if (statTypes[i].v == type) {
                return statTypes[i].d;
            }
        }
        return type;
    }

    function isSummaryStat(type) {
        for (var i = 0; i < summaryStatTypes.length; i++) {
            if (summaryStatTypes[i] == type) {
                return true;
            }
        }
        return false;
    }

    function isTimeLineStat(type) {
        for (var i = 0; i < timeLineStatTypes.length; i++) {
            if (timeLineStatTypes[i] == type) {
                return true;
            }
        }
        return false;
    }

    function addSummaryComment(records, comment) {
        if (!records[comment.field]) {
            return;
        }
        if (isSummaryStat(comment.type)) {
            if (records[comment.field].value[comment.type]) {
                records[comment.field].value[comment.type] ++;
            } else {
                records[comment.field].value[comment.type] = 1;
            }
            if ("goal" == type || "penalty-missed" == comment.type) {
                addSummaryComment(records, {
                    field: comment.field,
                    type: "shot"
                });
            }
        }
    }

    function addTimeLineComment(records, comment) {
        if (!records[comment.field]) {
            return;
        }
        if (isTimeLineStat(comment.type)) {
            records[comment.field].value.push(comment);
        }
    }

    function getMaxCommentMin(comments) {
        for (var i = 0; i < comments.length; i++) {
            var comment = getRecord(comments[i]);
            if (comment.time && "" != jQuery.trim(comment.time)) {
                return getCommentMinute(comment.time);
            }
        }
    }

    function addTextComment(records, comment) {
        if (!isTimeLineStat(comment.type)) {
            comment.type = "";
        }
        records.value.push(comment);
    }

    if (!data[2]) {
        return;
    }
    var comments = data[4];
    var maxCommentMin = getMaxCommentMin(comments);
    var records = {
        summary: {
            home: {
                name: data[0],
                teamId: data[2],
                value: {}
            },
            away: {
                name: data[1],
                teamId: data[3],
                value: {}
            }
        },
        timeline: {
            currentMinute: maxCommentMin,
            home: {
                name: data[0],
                teamId: data[2],
                value: []
            },
            away: {
                name: data[1],
                teamId: data[3],
                value: []
            }
        },
        text: {
            home: {
                name: data[0],
                teamId: data[2]
            },
            away: {
                name: data[1],
                teamId: data[3]
            },
            value: []
        }
    };
    for (var i = 0; i < comments.length; i++) {
        var comment = getRecord(comments[i]);
        comment.index = i;
        addTimeLineComment(records.timeline, comment);
        addTextComment(records.text, comment);
    }
    return records;
}

function getCommentMinute(time) {
    var endOfNormalDuration = time.indexOf("'");
    var startOfExtraTime = time.indexOf("+");
    var normalDuration = parseInt(time.substring(0, endOfNormalDuration));
    if (-1 != startOfExtraTime) {
        var extraTime = parseInt(time.substring(startOfExtraTime + 1, time.length - 1));
        return normalDuration + extraTime;
    }
    return normalDuration;
}

function MatchCommentarySummary(config) {
    var $view, statsOrder = ["goal", "shot", "red", "yellow", "foul", "corner", "offside", "subst-in", "penalty-missed", "owngoal"];
    init(config);
    this.render = function(data) {
        var view = [];
        view.push(getView(prepareData(data)));
        $view.html(view.join(""));
    };

    function prepareData(data) {
        var records = {
            info: {
                homeName: data.home.name,
                awayName: data.away.name
            },
            stats: {}
        };
        var stats = {
            home: sortStats(data.home.value),
            away: sortStats(data.away.value)
        };
        loadStatsSummaryForTeam(records.stats, stats, "home");
        loadStatsSummaryForTeam(records.stats, stats, "away");
        return records;
    }

    function loadStatsSummaryForTeam(records, stats, field) {
        for (var stat in stats[field]) {
            if (!records[stat]) {
                records[stat] = {
                    home: {},
                    away: {}
                };
            }
            records[stat][field] = stats[field][stat];
        }
    }

    function isGreater(stat, otherStat) {
        if ("-" == stat) {
            return false;
        }
        if ("-" == otherStat) {
            return true;
        }
        return otherStat < stat;
    }

    function getView(records) {
        var html = [];
        html.push('<table class="grid">');
        html.push("<thead>");
        html.push("<th></th>");
        for (var stat in records.stats) {
            html.push('<th title="' + getIncidentToolTip(stat) + '"><span class="incidents-icon ui-icon ' + stat + '"></span></th>');
        }
        html.push("</thead>");
        html.push("<tbody>");
        html.push("<tr>");
        html.push('<td class="tn">' + records.info.homeName + "</td>");
        for (var stat in records.stats) {
            html.push('<td class="' + (isGreater(records.stats[stat].home, records.stats[stat].away) ? "greater" : "") + '">' + records.stats[stat].home + "</td>");
        }
        html.push("</tr>");
        html.push("<tr>");
        html.push('<td class="tn">' + records.info.awayName + "</td>");
        for (var stat in records.stats) {
            html.push('<td class="' + (isGreater(records.stats[stat].away, records.stats[stat].home) ? "greater" : "") + '">' + records.stats[stat].away + "</td>");
        }
        html.push("</tr>");
        html.push("</tbody>");
        html.push("</table>");
        return html.join("");
    }

    function sortStats(stats) {
        if (!stats) {
            return;
        }
        var result = {};
        for (var i = 0; i < statsOrder.length; i++) {
            if (stats[statsOrder[i]]) {
                result[statsOrder[i]] = stats[statsOrder[i]];
            } else {
                result[statsOrder[i]] = "-";
            }
        }
        return result;
    }

    function init(config) {
        $view = $(config.id);
    }
}

function getLeftMarginInPixels(widthInPixels, point, maxPoint) {
    if (!point) {
        return 0;
    }
    return parseInt(widthInPixels * point / maxPoint);
}

function TimeLineBarView(widthInPixels, currentMinute, lastMinute) {
    var view = [];
    view.push('<div id="time-line-bar">');
    view.push('<span class="current-minute" style="left: 0; width: ' + getLeftMarginInPixels(widthInPixels, currentMinute, lastMinute) + 'px;"></span>');
    var fontSize = 12;
    for (var i = 0; i <= 90; i = i + 15) {
        var left = getLeftMarginInPixels(widthInPixels, i, lastMinute);
        if (0 == i) {
            left = +2;
        }
        view.push('<span class="time-period" style="left: ' + left + 'px;">');
        view.push("<span " + ((0 != i) ? 'style="margin-left: -100%;"' : "") + ">" + i + "'</span>");
        view.push("</span>");
    }
    view.push("</div>");
    return view.join("");
}

function MatchCommentaryTimeLine(config) {
    var id, $view, widthInPixels = 644,
        lastMinute = 90;
    init(config);
    this.selectLast = function() {
        var $lastHome = $(".home .time-line-event", $view).last();
        var $lastAway = $(".away .time-line-event", $view).last();
        var homeEventId = NG.roundNumber($lastHome.attr("data-value"));
        var awayEventId = NG.roundNumber($lastAway.attr("data-value"));
        if (homeEventId < awayEventId) {
            $lastHome.click();
        } else {
            $lastAway.click();
        }
    };
    this.render = function(data) {
        var currentMinute = data.currentMinute;
        if (currentMinute) {
            lastMinute = Math.max(currentMinute, 90);
        }
        var view = [];
        view.push(partView(data.home, "home"));
        view.push(TimeLineBarView(widthInPixels, currentMinute, lastMinute));
        view.push(partView(data.away, "away"));
        $view.html(view.join(""));
    };

    function partView(data, field) {
        var view = [],
            lastEventLeftMargin = 0;
        view.push('<div class="' + field + '">');
        view.push(WS.TeamEmblemUrl(data.teamId));
        for (var i = data.value.length - 1; 0 <= i; i--) {
            var minute = getCommentMinute(data.value[i].time);
            var leftMarginInPixels = getLeftMarginInPixels(widthInPixels, minute, lastMinute);
            view.push('<span title="' + getIncidentToolTip(data.value[i].type) + '" data-value="' + data.value[i].index + '" style="left: ' + (leftMarginInPixels - 16) + 'px;" class="time-line-event rc">');
            view.push("<span " + ((0 != minute) ? "" : "") + ' class="incidents-icon ui-icon ' + data.value[i].type + '"></span>');
            view.push("</span>");
        }
        view.push("</div>");
        return view.join("");
    }

    function init(config) {
        id = config.id;
        $view = $(id);
        bindActions();
    }

    function bindActions() {
        $view.on("click", ".time-line-event", function() {
            var $this = $(this);
            var selectedEvent = $this.attr("data-value");
            $(id).triggerHandler("selected", [selectedEvent]);
            $(".time-line-event", $view).removeClass("selected");
            $this.addClass("selected");
        });
    }
}

function MatchCommentaryText(config) {
    var $view;
    init(config);
    this.selectComment = function(commentId) {
        var $comment = $('tr[data-value="' + commentId + '"]', $view);
        $view.scrollTo($comment, 500, {
            offset: -110
        });
        $(".match-comment", $view).removeClass("selected");
        $comment.addClass("selected");
    };
    this.render = function(data, filters) {
        var view = [];
        view.push("<table>");
        view.push("<tbody>");
        for (var i = 0; i < data.value.length; i++) {
            var comment = data.value[i];
            if (isValid(comment, filters)) {
                view.push('<tr class="match-comment ' + comment.field + " " + comment.type + '" data-value="' + comment.index + '">');
                view.push('<td class="minute">' + comment.time + "</td>");
                view.push("<td>" + getTeamEmblem(data, comment.field) + "</td>");
                view.push('<td class="type">');
                if (comment.type) {
                    view.push('<span title="' + getIncidentToolTip(comment.type) + '" class="incidents-icon ui-icon ' + comment.type + '"></span>');
                }
                view.push("</td>");
                view.push('<td class="text">' + prepareText(data, comment.text) + "</td>");
                view.push("</tr>");
            }
        }
        view.push("</tbody>");
        view.push("</table>");
        $view.html(view.join(""));
    };

    function getTeamEmblem(data, field) {
        if (!data[field]) {
            return "";
        }
        return WS.TeamEmblemUrl(data[field].teamId);
    }

    function isValid(comment, filters) {
        if (!filters) {
            return true;
        }
        var valid = true;
        for (var filter in filters.data) {
            if (filter) {
                valid = valid && ("all" == filters.data[filter] || comment[filter] == filters.data[filter]);
            }
        }
        return valid;
    }

    function prepareText(data, text) {
        var result = text.replace("(" + data.home.name + ")", "<b>(" + data.home.name + ")</b>");
        result = result.replace("(" + data.away.name + ")", "<b>(" + data.away.name + ")</b>");
        return result;
    }

    function init(config) {
        $view = $(config.id);
    }
}
var incidentToolTips = {
    "goal": "Goal",
    "assist": "Assist",
    "yellow": "Yellow Card",
    "secondyellow": "Red Card from a Second Yellow Card",
    "red": "Red Card",
    "post": "Shot on Post",
    "clearance-off-line": "Clearance Off the Line",
    "penalty-missed": "Penalty Missed",
    "last-man-tackle": "Last Man Tackle",
    "interception-in-box": "Interception in Box",
    "error-lead-to-goal": "Error Lead to Goal",
    "last-man-dribble": "Last Man Dribble",
    "penalty-conceded": "Caused a Penalty",
    "owngoal": "Own Goal",
    "shot": "Shot",
    "subst-in": "Substitution",
    "mom": "Man of the Match",
    "foul": "Foul",
    "corner": "Corner",
    "offside": "Offside",
    "penalty-save": "Saved a Penalty",
    "penalty-goal": "Goal from a penalty",
    "shotonpost": "Hit Woodwork"
};

function getIncidentToolTip(type) {
    return incidentToolTips[type] ? incidentToolTips[type] : "";
}
var incidentTypeClasses = {
    "1": "i-goal",
    "2": {
        "1": "i-yellow",
        "2": "i-y2card",
        "3": "i-rcard"
    }
};

function getIncidentTypeClass(type, subType) {
    var clazz = incidentTypeClasses[type];
    if (clazz && subType) {
        clazz = clazz[subType];
    }
    return clazz;
}
WS.TeamEmblemUrl = function(teamid, title, style) {
    if (gImageUrl && teamid) {
        return "<img " + (title ? 'title="' + title + '"' : "") + (style ? ' style="' + style + '"' : "") + ' src="' + gImageUrl + "teams/" + teamid + '.png" class="team-emblem">';
    }
    return "";
};
WS.PlayerPictureUrl = function(playerId, title, style) {
    if (gImageUrl && playerId) {
        return "<img " + (title ? 'title="' + title + '"' : "") + (style ? ' style="' + style + '"' : "") + ' src="' + gImageUrl + "players/" + playerId + '.jpg" class="player-picture">';
    }
    return "";
};

function MatchHeader(config) {
    var $view;
    init(config);
    this.load = function(data) {
        var header = MatchHeaderModel(data);
        $view.html(MatchHeaderView(header));
    };

    function init(config) {
        $view = $("#" + config.view.renderTo);
    }
}

function MatchHeaderView(header) {
    var html = [];
    html.push("<table>");
    html.push("<tr>");
    html.push('<td class="team">' + WS.TeamLink(header.HomeTeamId, header.HomeTeamName) + "</td>");
    html.push('<td class="result">' + header.Score + "</td>");
    html.push('<td class="team">' + WS.TeamLink(header.AwayTeamId, header.AwayTeamName) + "</td>");
    html.push("</tr>");
    html.push("<tr>");
    html.push('<td class="crest">' + WS.TeamEmblemUrl(header.HomeTeamId) + "</td>");
    html.push("<td>");
    html.push('<div class="info-block cleared">');
    html.push("<dl>");
    var matchHasTerminatedUnExpectedly = matchTerminatedUnexpectedly(header.Elapsed);
    if (header.Elapsed) {
        html.push('<dt>Elapsed:</dt><dd class="status">');
        if (!matchHasTerminatedUnExpectedly) {
            html.push('<span class="' + (header.Finished ? "finished" : "inplay") + '" rc">' + header.Elapsed + "</span>");
        } else {
            html.push("<span>" + header.Elapsed + "</span>");
        }
        html.push("</dd>");
    }
    html.push("</dl>");
    html.push("</div>");
    html.push('<div class="info-block cleared">');
    html.push("<dl>");
    if (header.HalftimeScore) {
        html.push("<dt>Half time:</dt><dd>" + header.HalftimeScore + "</dd>");
    }
    if (header.FulltimeScore) {
        html.push("<dt>Full time:</dt><dd>" + header.FulltimeScore + "</dd>");
    }
    if (header.ExtratimeScore) {
        html.push("<dt>Extra time:</dt><dd>" + header.ExtratimeScore + "</dd>");
    }
    if (header.PenaltyShootout) {
        html.push("<dt>Penalty shootout:</dt><dd>" + header.PenaltyShootout + "</dd>");
    }
    html.push("</dl>");
    html.push("</div>");
    html.push('<div class="info-block cleared">');
    html.push("<dl>");
    html.push("<dt>Kick off:</dt>");
    html.push("<dd>" + header.StartTime + "</dd>");
    html.push("<dt>Date:</dt>");
    html.push("<dd>" + header.StartDate + "</dd>");
    html.push("</dl>");
    html.push("</div>");
    html.push("</td>");
    html.push('<td class="crest">' + WS.TeamEmblemUrl(header.AwayTeamId) + "</td>");
    html.push("</tr>");
    html.push("</table>");
    return html.join("");
}

function MatchHeaderModel(data) {
    var o = {};
    o.HomeTeamId = data[0];
    o.AwayTeamId = data[1];
    o.HomeTeamName = data[2];
    o.AwayTeamName = data[3];
    o.StartTime = new Date(data[4]).dateFormat("H:i");
    o.StartDate = new Date(data[5]).dateFormat("D, d-M-y");
    o.Status = data[6];
    o.Finished = 6 == o.Status;
    o.Elapsed = data[7];
    o.HalftimeScore = data[8];
    o.FulltimeScore = data[9];
    o.ExtratimeScore = data[10];
    o.PenaltyShootout = data[11];
    o.Score = data[12];
    return o;
}

function LiveTimeLine(config) {
    var $view, $bar;
    init(config);
    this.load = function(data) {
        var incidentRows = LiveTimeLineModel(data[0]);
        $view.html(LiveTimeLineView(incidentRows));
        $(".player-link", $view).fitText({
            width: 150
        });
    };

    function init(config) {
        $view = $("#" + config.view.renderTo);
        $bar = $("#" + config.view.renderTo + "-bar");
    }
}

function LiveTimeLineView(rows) {
    function getIncidentsHtml(incidents, field) {
        var is = [];
        var iconSide = "home" == field ? "right" : "left";
        for (var j = 0; j < incidents.length; j++) {
            var i = incidents[j];
            if ("subst" == i.IncidentType) {
                is.push("<div>");
                if ("home" == field) {
                    is.push('<span class="iconize iconize-icon-' + iconSide + ' weak">');
                    is.push('<span class="incidents-icon ui-icon subst-out"></span>');
                    is.push(WS.PlayerLink(i.PlayerId, i.PlayerName));
                    is.push("</span>");
                }
                is.push('<span class="iconize iconize-icon-' + iconSide + '">');
                is.push('<span class="incidents-icon ui-icon subst-in"></span>');
                is.push(WS.PlayerLink(i.ParticipatingPlayerId, i.ParticipatingPlayerName));
                is.push("</span>");
                if ("away" == field) {
                    is.push('<span class="iconize iconize-icon-' + iconSide + ' weak">');
                    is.push('<span class="incidents-icon ui-icon subst-out"></span>');
                    is.push(WS.PlayerLink(i.PlayerId, i.PlayerName));
                    is.push("</span>");
                }
                is.push("</div>");
            } else {
                if ("goal" == i.IncidentType || "owngoal" == i.IncidentType || "penalty-goal" == i.IncidentType) {
                    is.push("<div>");
                    is.push('<span class="iconize iconize-icon-' + iconSide + ' strong">');
                    is.push('<span class="incidents-icon ui-icon ' + i.IncidentType + '"></span>');
                    if ("home" == field) {
                        is.push('<span class="weak">' + (i.Info ? "(" + i.Info + ") " : "") + "</span>");
                    }
                    is.push("home" == field ? (WS.PlayerLink(i.PlayerId, i.PlayerName) + " " + i.RunningScore) : (i.RunningScore + " " + WS.PlayerLink(i.PlayerId, i.PlayerName)));
                    if ("away" == field) {
                        is.push('<span class="weak">' + (i.Info ? " (" + i.Info + ")" : "") + "</span>");
                    }
                    is.push("</span>");
                    is.push("</div>");
                } else {
                    if ("penaltyshootout-scored" == i.IncidentType) {
                        is.push('<div><span class="iconize iconize-icon-' + iconSide + ' strong"><span class="incidents-icon ui-icon goal"></span><span class="weak">(Pen)</span> ' + i.RunningScore + " " + WS.PlayerLink(i.PlayerId, i.PlayerName) + "</span></div>");
                    } else {
                        if ("penaltyshootout-missed" == i.IncidentType || "penaltyshootout-saved" == i.IncidentType || "penalty-missed" == i.IncidentType) {
                            is.push('<div><span class="iconize iconize-icon-' + iconSide + ' strong"><span class="incidents-icon ui-icon penalty-missed"></span><span class="weak">(Pen)</span> ' + i.RunningScore + " " + WS.PlayerLink(i.PlayerId, i.PlayerName) + "</span></div>");
                        } else {
                            is.push('<div><span class="iconize iconize-icon-' + iconSide + '"><span class="incidents-icon ui-icon ' + i.IncidentType + '"></span>' + WS.PlayerLink(i.PlayerId, i.PlayerName) + "</span></div>");
                        }
                    }
                }
            }
        }
        return is.join("");
    }

    if (!rows) {
        return;
    }
    var html = [];
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        html.push('<tr class="' + (0 == i % 2 ? "alt" : "") + '">');
        html.push('<td class="home-incident">');
        if (row.HasHomeIncidents) {
            html.push(getIncidentsHtml(row.HomeIncidents, "home"));
        }
        html.push("</td>");
        html.push("<td>");
        html.push('<span class="minute rc box">');
        html.push(row.Minute + "'");
        html.push("</span>");
        html.push("</td>");
        html.push('<td class="away-incident">');
        if (row.HasAwayIncidents) {
            html.push(getIncidentsHtml(row.AwayIncidents, "away"));
        }
        html.push("</td>");
        html.push("</tr>");
    }
    return html.join("");
}

function LiveIncidentModel(data) {
    return {
        PlayerName: data[0] ? data[0] : "",
        ParticipatingPlayerName: data[1],
        IncidentType: data[2],
        RunningScore: data[3] ? data[3] : "",
        Info: data[4],
        Minute: data[5],
        PlayerId: data[6],
        ParticipatingPlayerId: data[7]
    };
}

function LiveTimeLineModel(data) {
    function getIncidents(teamIncidents) {
        var incidents = [];
        for (var j = 0; j < teamIncidents.length; j++) {
            incidents.push(LiveIncidentModel(teamIncidents[j]));
        }
        return incidents;
    }

    if (!data) {
        return;
    }
    var rows = [];
    for (var i = 0; i < data.length; i++) {
        var row = {};
        row.Minute = data[i][0];
        row.HasHomeIncidents = data[i][3] == 1;
        row.HasAwayIncidents = data[i][4] == 1;
        if (row.HasHomeIncidents) {
            row.HomeIncidents = getIncidents(data[i][1]);
        }
        if (row.HasAwayIncidents) {
            row.AwayIncidents = getIncidents(data[i][2]);
        }
        rows.push(row);
    }
    return rows;
}

function LiveLineup(config) {
    var $view;
    init(config);

    function init(config) {
        $view = $("#" + config.view.renderTo);
    }

    this.load = function(data) {
        var records = new LiveLineupModel(data);
        $view.html(LiveLineupView(records));
        $(".player-link", $view).fitText({
            width: 200
        });
    };
}

function LiveLineupPlayerModel(data) {
    function getLiveIncidents(data) {
        var incidents = [];
        for (var i = 0; i < data.length; i++) {
            incidents.push(LiveIncidentModel(data[i]));
        }
        return incidents;
    }

    return {
        Name: data[0],
        RegionCode: data[1],
        Incidents: getLiveIncidents(data[2]),
        PlayerId: data[3]
    };
}

function LiveLineupModel(data) {
    function getLiveLineupPlayers(data) {
        var players = [];
        for (var i = 0; i < data.length; i++) {
            players.push(LiveLineupPlayerModel(data[i]));
        }
        return players;
    }

    return {
        HasAnyLineup: data[0],
        HasAnyFirstEleven: data[1],
        HasAnySubstitutes: data[2],
        HasHomeLineup: data[3],
        HasHomeFirstEleven: data[4],
        HasHomeSubstitutes: data[5],
        HasAwayLineup: data[6],
        HasAwayFirstEleven: data[7],
        HasAwaySubstitutes: data[8],
        HomeLineup: getLiveLineupPlayers(data[9]),
        AwayLineup: getLiveLineupPlayers(data[10]),
        HomeSubs: getLiveLineupPlayers(data[11]),
        AwaySubs: getLiveLineupPlayers(data[12])
    };
}

function LiveLineupPartView(players, field) {
    var pv = [];
    pv.push('<div class="' + field + '">');
    pv.push('<table class="grid gray">');
    for (var i = 0; i < players.length; i++) {
        var player = players[i];
        pv.push('<tr class="' + ((1 == i % 2) ? "alt" : "") + '">');
        pv.push("<td>");
        pv.push('<div class="incident-player">');
        pv.push('<span class="country flg-' + player.RegionCode + ' iconize iconize-icon-left">');
        pv.push(WS.PlayerLink(player.PlayerId, player.Name));
        pv.push("</span></div>");
        pv.push('<div class="incident-minute">');
        for (var j = 0; j < player.Incidents.length; j++) {
            pv.push('<span class="iconize iconize-icon-left"><span class="incidents-icon ui-icon ' + player.Incidents[j].IncidentType + '"></span>' + player.Incidents[j].Minute + "'</span>");
        }
        pv.push("</div>");
        pv.push("</td>");
        pv.push("</tr>");
    }
    pv.push("</table>");
    pv.push("</div>");
    return pv.join("");
}

function LiveLineupView(lineups) {
    if (!lineups || !lineups.HasAnyLineup) {
        return;
    }
    var html = [];
    if (lineups.HasAnyFirstEleven) {
        html.push("<h2>Lineups</h2>");
        html.push('<div class="live-line-up two-cols">');
        if (lineups.HasHomeFirstEleven) {
            html.push(LiveLineupPartView(lineups.HomeLineup, "home"));
        }
        if (lineups.HasAwayFirstEleven) {
            html.push(LiveLineupPartView(lineups.AwayLineup, "away"));
        }
        html.push("</div>");
    }
    if (lineups.HasAnySubstitutes) {
        html.push("<h2>Substitutes</h2>");
        html.push('<div class="live-line-up two-cols">');
        if (lineups.HasHomeSubstitutes) {
            html.push(LiveLineupPartView(lineups.HomeSubs, "home"));
        }
        if (lineups.HasAwaySubstitutes) {
            html.push(LiveLineupPartView(lineups.AwaySubs, "away"));
        }
        html.push("</div>");
    }
    return html.join("");
}
WS.LiveDataUpdater = function(config) {
    var dataId, dataUrl, parameters, timer, countDownMonitor, self = this;
    init(config);

    function init(config) {
        dataUrl = config.dataUrl;
        parameters = config.parameters;
        dataId = config.dataId;
        countDownMonitor = config.countDownMonitor;
        timer = new NG.Timer();
    }

    function updateTimer(timeInterval) {
        if (timer.active()) {
            timer.reset();
        }
        timer.set(timeInterval, function(tl) {
            if (tl == 0) {
                self.load();
            }
        }, window);
    }

    this.load = function(data) {
        if (data) {
            update(data);
        } else {
            DataStore.load(dataUrl, {
                parameters: parameters,
                cache: false,
                success: recievedData,
                dataType: "array"
            });
        }
    };
    this.stop = function() {
        timer.pause();
    };

    function recievedData(options, data) {
        update(data);
    }

    function update(data) {
        var newData = data[0];
        timeInterval = data[1] || 0;
        publishNewData(newData);
        updateTimer(timeInterval);
        updateCountDownMonitor(timeInterval);
    }

    function updateCountDownMonitor(timeInterval) {
        if (!countDownMonitor) {
            return;
        }
        if (countDownMonitor.keepCountingDown) {
            if (countDownMonitor.intervalId) {
                window.clearInterval(countDownMonitor.intervalId);
            }
            var i = timeInterval;
            countDownMonitor.intervalId = setInterval(function() {
                if (0 < i) {
                    renderCountDownMonitor(i--);
                }
            }, 1000);
        } else {
            renderCountDownMonitor(timeInterval);
        }
    }

    function renderCountDownMonitor(timeInterval) {
        $("#" + countDownMonitor.view.renderTo).html(countDownMonitor.view.displayFunction(timeInterval));
    }

    function publishNewData(data) {
        $(document).triggerHandler(dataId + "-updated", [data]);
    }
};
WS.TabbedPanels = function(config) {
    var $view, $tabs;
    init(config);

    function init(config) {
        id = config.id;
        initTabs(config.tabs);
    }

    function initTabs(tabsConfig) {
        $tabs = $("#" + tabsConfig.view.id);
        var tabsSetup = $.extend({}, $.fn.tabs.base);
        tabsSetup.activate.unshift(function(options) {
            var init = options.init;
            var activate = options.activate;
            this.bind("activated", function(e, selected) {
                var fn = init && init[$(selected).attr("href")];
                if (fn) {
                    if (!$(selected).data("initialized")) {
                        fn();
                        $(selected).data("initialized", true);
                    }
                }
                if (activate && activate[$(selected).attr("href")]) {
                    activate[$(selected).attr("href")]();
                }
            });
        });
        $tabs.tabs({
            setup: tabsSetup,
            defaultTab: tabsConfig.model.defaultTab,
            activate: tabsConfig.model.activate,
            init: tabsConfig.model.init
        });
    }
};

function SideBoxFormsPresenter(config) {
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
        var model = new SideBoxFormsModel(data);
        var view = SideBoxFormsView(model);
        $view.html(view);
        $(".team-name", $view).fitText({
            width: 130
        });
    };
}

function SideBoxFormsModel(data) {
    if (!data.value || 0 == data.value.length) {
        return;
    }
    var forms = [];
    var formDatas = data.value;
    for (var i = 0; i < formDatas.length; i++) {
        forms.push({
            TeamId: formDatas[i][5],
            TeamName: formDatas[i][6],
            History: formDatas[i][31],
            RegionCode: TeamId = formDatas[i][34]
        });
    }
    return forms;
}

function SideBoxFormsView(forms) {
    var t = [];
    var find = /<a class="(\w) (\w)" id="(\d+)" title="(.+?)"\/>/g;
    var replace = '<a class="box $1 $2" href="/Matches/$3/Live" title="$4">$1</a>';
    t.push('<table class="grid">');
    t.push("<thead>");
    t.push("<tr>");
    t.push('<th colspan="2">');
    t.push("Best Form (Last 6 Matches)");
    t.push("</th>");
    t.push("</tr>");
    t.push("</thead>");
    t.push("<tbody>");
    for (var i = 0; i < forms.length; i++) {
        t.push("<tr>");
        t.push("<td>");
        t.push(WS.TeamLink(forms[i].TeamId, ('<span class="team-name">' + forms[i].TeamName + '</span><span class="ui-icon country flg-' + forms[i].RegionCode + '"></span>'), "iconize iconize-icon-left"));
        t.push("</td>");
        t.push('<td class="form">');
        t.push(forms[i].History.replace(find, replace));
        t.push("</td>");
        t.push("</tr>");
    }
    t.push("</tbody>");
    t.push("</table>");
    return t.join("");
}

function SideBoxStreaksPresenter(config) {
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
        var model = new SideBoxStreaksModel(data);
        var view = SideBoxStreaksView(model);
        $view.html(view);
        $(".team-name", $view).fitText({
            width: 130
        });
    };
}

function SideBoxStreaksModel(data) {
    if (!data.value || 0 == data.value.length) {
        return;
    }
    var streaks = [];
    var streakDatas = data.value;
    for (var i = 0; i < streakDatas.length; i++) {
        streaks.push({
            TeamId: streakDatas[i][0],
            TeamName: streakDatas[i][1],
            Streak: streakDatas[i][8],
            RegionCode: TeamId = streakDatas[i][7]
        });
    }
    return streaks;
}

function SideBoxStreaksView(streaks) {
    var t = [];
    var maxStreak = 0;
    for (var i = 0; i < streaks.length; i++) {
        if (maxStreak < streaks[i].Streak) {
            maxStreak = streaks[i].Streak;
        }
    }
    t.push('<table class="ws-list">');
    t.push("<thead>");
    t.push("<tr>");
    t.push('<th colspan="2">');
    t.push("Winning Streak (Longest Winning Pattern)");
    t.push("</th>");
    t.push("</tr>");
    t.push("</thead>");
    t.push("<tbody>");
    for (var i = 0; i < streaks.length; i++) {
        t.push("<tr>");
        t.push('<td class="list-key">');
        t.push(WS.TeamLink(streaks[i].TeamId, ('<span class="team-name">' + streaks[i].TeamName + '</span><span class="ui-icon country flg-' + streaks[i].RegionCode + '"></span>'), "iconize iconize-icon-left", null));
        t.push("</td>");
        t.push('<td class="stat-value">');
        t.push('<span class="stat-bar-wrapper value" style="width: ' + (125 * streaks[i].Streak) / maxStreak + 'px;">');
        t.push('<span class="stat-bar rc-r" style="width: 100%;">');
        t.push('<span class="stat-value">' + streaks[i].Streak + "</span>");
        t.push("</span>");
        t.push("</span>");
        t.push("</td>");
        t.push("</tr>");
    }
    t.push("</tbody>");
    t.push("</table>");
    return t.join("");
}
WS.Filter = function(config) {
    var id, filters = {},
        singular, hasDisplay, displayFormat;

    function init(config) {
        id = config.id;
        hasDisplay = config.hasDisplay;
        displayFormat = config.displayFormat;
        filters = config.categories;
        singular = config.singular;
        bindActions("data");
        bindActions("content");
        bindEvents();
    }

    init(config);
    this.id = function() {
        return id;
    };
    this.getSelection = function(loadDisplays) {
        var selection = singular ? {} : {
            home: {},
            away: {}
        };
        loadSelectedFilters(selection, "data", loadDisplays);
        loadSelectedFilters(selection, "content", loadDisplays);
        loadBoth(selection);
        return selection;
    };
    this.hasDisplay = function() {
        return hasDisplay;
    };
    this.select = function(filters) {
        for (var filter in filters) {
            if (filters.hasOwnProperty(filter)) {
                $("#" + id + "-" + filter + ' a[data-source="' + filters[filter] + '"]').click();
            }
        }
    };
    this.getDisplayFormat = function() {
        if (this.hasDisplay()) {
            return displayFormat;
        }
    };

    function loadBoth(selection) {
        if (!singular) {
            return;
        }
        for (var i = 0; i < filters.data.length; i++) {
            if (filters["data"][i].both) {
                ensureCategoryExists(selection, "both");
                var contentValue = getContentValue(filters.data[i].value);
                if (contentValue) {
                    selection.both[filters.data[i].value] = contentValue;
                }
            }
        }
    }

    function loadSelectedFilters(selection, category, loadDisplays) {
        if (!filters[category]) {
            return;
        }
        ensureCategoryExists(selection, category);
        for (var i = 0; i < filters[category].length; i++) {
            if (singular) {
                selection[category][filters[category][i].value] = getFilterValue(category, i);
            } else {
                if (filters[category][i].shared) {
                    selection.home[category][filters[category][i].value] = getFilterValue(category, i, "shared-filter", loadDisplays);
                    selection.away[category][filters[category][i].value] = getFilterValue(category, i, "shared-filter", loadDisplays);
                } else {
                    if (filters[category][i].combined) {
                        selection.home[category][filters[category][i].value] = getFilterValue(category, i, "combined-filter", loadDisplays, "home");
                        selection.away[category][filters[category][i].value] = getFilterValue(category, i, "combined-filter", loadDisplays, "away");
                    } else {
                        selection.home[category][filters[category][i].value] = getFilterValue(category, i, "home-team-filter", loadDisplays);
                        selection.away[category][filters[category][i].value] = getFilterValue(category, i, "away-team-filter", loadDisplays);
                    }
                }
            }
        }
    }

    function getContentValue(filterType) {
        return $("#" + id + "-" + filterType + " .selected").attr("data-content");
    }

    function getFilterValue(category, i, field, loadDisplays, combinedField) {
        var fieldClass = field ? "." + field : "";
        combinedField = combinedField ? "-" + combinedField : "";
        var value = loadDisplays ? (combinedField ? $("#" + id + "-" + filters[category][i].value + " " + fieldClass + " .selected").attr("data-display" + combinedField) : $("#" + id + "-" + filters[category][i].value + " " + fieldClass + " .selected").html()) : $("#" + id + "-" + filters[category][i].value + " " + fieldClass + " .selected").attr("data-source" + combinedField);
        if (null != filters[category][i].index) {
            return {
                index: filters[category][i].index,
                value: value
            };
        }
        return value;
    }

    function ensureCategoryExists(selection, category) {
        if (singular) {
            if (!selection[category]) {
                selection[category] = {};
            }
        } else {
            if (!selection.home[category]) {
                selection.home[category] = {};
            }
            if (!selection.away[category]) {
                selection.away[category] = {};
            }
        }
    }

    function rebindActions(action, filterType) {
        filterType = filterType || id;
        bindActionsForFilter(filterType);
    }

    function bindActions(filterType) {
        if (filters[filterType]) {
            for (var i = 0; i < filters[filterType].length; i++) {
                bindActionsForFilter(id + "-" + filters[filterType][i].value);
            }
        }
    }

    function bindActionsForFilter(filterType) {
        $("#" + filterType + " dl").listbox().bind("selected", function(e, value) {
            e.preventDefault();
            var $filter = $(this);
            if (filterIsGlobal($filter)) {
                var selectedId = $filter.attr("data-value");
                var selectedValue = $("a.selected", $filter).attr("data-value");
                $('dl.global-filter[data-value$="' + selectedId + '"] a').removeClass("selected");
                $('dl.global-filter[data-value$="' + selectedId + '"] a[data-value$="' + selectedValue + '"]').addClass("selected");
                $(document).triggerHandler(filterType + "-filter-selected");
            }
            $("#" + id).triggerHandler("filter-selected");
        });
    }

    function bindEvents() {
        $("#" + id).bind("refresh-filters", rebindActions);
    }

    function filterIsGlobal($element) {
        return $element.hasClass("global-filter");
    }
};
WS.Panel = function(config) {
    var id, self = this,
        filter, content, info, params, currentFilterSelection, currentData = {},
        dataRecieved = {},
        splitContent = false,
        singular = false,
        emptyDataMessage, globalSortParams = {},
        paginationParams = {},
        paginator;
    init(config);
    this.load = function(data) {
        if (data) {
            content.load(data);
            return;
        }
        clearData();
        getFilterSelection();
        if (singular) {
            loadData(params.teamId, currentFilterSelection.data);
        } else {
            loadData(params.home.teamId, currentFilterSelection.home.data);
            loadData(params.away.teamId, currentFilterSelection.away.data);
        }
    };

    function loadData(teamId, filter) {
        renderLoading(getFieldByTeamId(teamId));
        DataStore.load(params.data.url, {
            parameters: prepareParameters(teamId, filter),
            cache: true,
            success: recievedData,
            dataType: config.dataType || "array"
        });
    }

    function renderLoading(field) {
        if (splitContent) {
            if (content[field].showLoading) {
                content[field].showLoading();
            } else {
                $("#" + content[field].id()).append('<div class="stats-loading half"><div class="loading-text">Loading..</div></div>');
            }
        } else {
            if (content.showLoading) {
                content.showLoading();
            } else {
                $("#" + content.id()).append('<div class="stats-loading"><div class="loading-text">Loading..</div></div>');
            }
        }
    }

    function renderEmpty(field) {
        if (splitContent) {
            $("#" + content[field].id()).html('<div class="stats-empty"><div class="loading-text">' + emptyDataMessage[field] + "</div></div>");
        } else {
            if (0 != $("tbody", $("#" + content.id())).length) {
                $("tbody", $("#" + content.id())).html('<tr><td colspan="99">' + emptyDataMessage + "</td></tr>");
            } else {
                $("#" + content.id()).html('<div class="stats-empty"><div class="loading-text">' + emptyDataMessage + "</div></div>");
            }
        }
    }

    function getFilterSelection() {
        if (filter) {
            currentFilterSelection = filter.getSelection();
            if (filter.hasDisplay()) {
                renderFilterDisplay();
            }
        } else {
            currentFilterSelection = {
                home: {},
                away: {}
            };
        }
    }

    function renderFilterDisplay() {
        var currentSelectedFilterTexts = filter.getSelection(true);
        var format = filter.getDisplayFormat();
        var homeDisplay = format,
            awayDisplay = format;
        var filters = {
            home: {},
            away: {}
        };
        filters.home = NG.flattenJson(currentSelectedFilterTexts.home);
        filters.away = NG.flattenJson(currentSelectedFilterTexts.away);
        for (var o in filters.home) {
            homeDisplay = homeDisplay.replace("{" + o + "}", filters.home[o].toLowerCase());
        }
        for (var o in filters.away) {
            awayDisplay = awayDisplay.replace("{" + o + "}", filters.away[o].toLowerCase());
        }
        var display = homeDisplay.capitaliseFirstLetter() + ' <span style="color: #808080; font-size: 0.9em;"> vs </span> ' + awayDisplay.capitaliseFirstLetter();
        display = WS.TeamEmblemUrl(params.home.teamId) + display + WS.TeamEmblemUrl(params.away.teamId);
        $("#" + filter.id() + "-display").html(display);
    }

    function clearData() {
        if (singular) {
            currentData = null;
            dataRecieved = 0;
        } else {
            currentData.home = null;
            currentData.away = null;
            dataRecieved.home = 0;
            dataRecieved.away = 0;
        }
    }

    function getFieldByTeamId(teamId) {
        if (!singular) {
            return params.home.teamId == teamId ? "home" : "away";
        }
        return null;
    }

    function recievedData(options, data) {
        var field = getFieldByTeamId(options.parameters.teamId);
        if (!data || 0 == data.length) {
            clearLoading(field);
            renderEmpty(field);
            $(document).triggerHandler("#" + id + "-recieved-empty-data");
            return;
        }
        if (paginator) {
            paginator.update(data);
            paginator.bindFilterActions(filter.id());
            data = data[1];
        }
        if (singular) {
            currentData = data;
            dataRecieved = 1;
            content.load({
                teamId: params.teamId,
                value: data,
                params: params,
                filter: currentFilterSelection
            });
            clearLoading();
        } else {
            currentData[field] = data;
            dataRecieved[field] = 1;
            if (splitContent) {
                content[field].load({
                    teamId: params[field].teamId,
                    value: data,
                    field: field,
                    against: options.parameters.against
                });
                clearLoading(field);
            }
        }
        if (!splitContent) {
            $("#" + id).triggerHandler("data-recieved");
        }
    }

    function clearLoading(field) {
        if (splitContent) {
            if (content[field].hideLoading) {
                content[field].hideLoading();
            } else {
                $("#" + content[field].id() + " .stats-loading").remove();
            }
        } else {
            if (content.hideLoading) {
                content.hideLoading();
            } else {
                $("#" + content.id() + " .stats-loading").remove();
            }
        }
        paginationParams = {};
    }

    function update() {
        if (dataRecieved.home && dataRecieved.away) {
            content.load({
                home: {
                    teamId: params.home.teamId,
                    value: currentData.home,
                    contentFilter: currentFilterSelection.home.content
                },
                away: {
                    teamId: params.away.teamId,
                    value: currentData.away,
                    contentFilter: currentFilterSelection.away.content
                }
            });
        }
        $(document).triggerHandler(id + "-updated");
    }

    function prepareParameters(teamId, filter) {
        var parameters = $.extend({
            teamId: teamId
        }, params.defaultParams, params.extra, globalSortParams, filter, paginationParams);
        return parameters;
    }

    function updateInfo(name, contentFilter) {
        if (dataRecieved.home && dataRecieved.away) {
            info.load({
                home: {
                    contentFilter: prepareFilters([contentFilter, currentFilterSelection.home.content]),
                    played: getPlayed("home"),
                    value: currentData.home,
                    teamId: params.home.teamId
                },
                away: {
                    contentFilter: prepareFilters([contentFilter, currentFilterSelection.away.content]),
                    played: getPlayed("away"),
                    value: currentData.away,
                    teamId: params.away.teamId
                }
            });
            if (splitContent) {
                clearLoading("home");
                clearLoading("away");
            } else {
                clearLoading();
            }
        }
    }

    function prepareFilters(contentFilters) {
        var result = {};
        for (var i = 0; i < contentFilters.length; i++) {
            if (null != contentFilters[i]) {
                $.extend(result, contentFilters[i]);
            }
        }
        if ({} == result) {
            return null;
        }
        return result;
    }

    function getPlayed(field) {
        if (!params[field].played) {
            return;
        }
        if (currentFilterSelection[field].data) {
            return params[field].played[currentFilterSelection[field].data.field];
        }
        return params[field].played[2];
    }

    function init(config) {
        id = config.id;
        params = config.params || {};
        splitContent = config.splitContent || false;
        singular = config.singular || false;
        filter = createInstanceOf(config.filter);
        if (splitContent) {
            content = {};
            content.home = createInstanceOf(config.content, "home");
            content.away = createInstanceOf(config.content, "away");
        } else {
            content = createInstanceOf(config.content);
        }
        info = createInstanceOf(config.info);
        paginator = createInstanceOf(config.paginator);
        setEmptyDataMessage(config.content);
        bindEvents(config);
    }

    function setEmptyDataMessage(config) {
        emptyDataMessage = {};
        if (splitContent) {
            emptyDataMessage.home = config.view.home.emptyDataMessage ? config.view.home.emptyDataMessage : "N/A";
            emptyDataMessage.away = config.view.away.emptyDataMessage ? config.view.away.emptyDataMessage : "N/A";
        } else {
            emptyDataMessage = config.view.emptyDataMessage ? config.view.emptyDataMessage : "N/A";
        }
    }

    function createInstanceOf(config, field) {
        if (null == config) {
            return null;
        }
        if (config.instance) {
            if (field) {
                return config.instance[field];
            }
            return config.instance;
        }
        if (field) {
            return new config.instanceType({
                view: $.extend({}, config.view.shared, config.view[field]),
                model: config.model
            });
        }
        return new config.instanceType(config);
    }

    function updateInfoTitle(options, title) {
        info.updateTitle(title);
    }

    function bindEvents(config) {
        $("#" + id).bind("data-recieved", update);
        if (splitContent) {
            $("#" + content.home.id()).bind("empty-data", function() {
                renderEmpty("home");
            });
            $("#" + content.away.id()).bind("empty-data", function() {
                renderEmpty("away");
            });
        } else {
            $("#" + content.id()).bind("empty-data", function() {
                renderEmpty();
            });
        }
        if (info) {
            if (splitContent) {
                $("#" + content.home.id()).bind("clicked", updateInfo);
                $("#" + content.home.id()).bind("model-updated", updateInfo);
                $("#" + content.away.id()).bind("clicked", updateInfo);
                $("#" + content.away.id()).bind("model-updated", updateInfo);
            } else {
                $("#" + content.id()).bind("info-title-updated", updateInfoTitle);
                $("#" + content.id()).bind("clicked", updateInfo);
                $("#" + content.id()).bind("model-updated", updateInfo);
            }
        }
        if (filter) {
            $("#" + filter.id()).bind("filter-selected", function(event) {
                self.load();
            });
            $("dl.global-filter", $("#" + config.filter.id)).each(function() {
                var filterId = $(this).attr("data-value");
                $(document).bind(filterId + "-filter-selected", function(event) {
                    self.load();
                });
            });
        }
        if (config.hasGlobalSort) {
            $("th.global", $("#" + content.id())).click(function() {
                var $this = $(this);
                globalSortParams = {
                    orderBy: $this.attr("data-property"),
                    isAscending: $(this).hasClass("asc")
                };
                if (paginator) {
                    paginationParams.page = 1;
                }
                self.load();
            });
        }
    }
};
WS.PlayerLink = function(playerId, playerName, clazz, title) {
    if (!playerName) {
        return "";
    }
    if (!playerId || 0 == playerId) {
        return playerName;
    }
    return '<a class="player-link {2}" title="{3}" href="/Players/{0}">{1}</a>'.format(playerId, playerName, clazz ? clazz : "", title ? title : "");
};
WS.TeamLink = function(teamId, teamName, clazz, title) {
    if (!teamName) {
        return;
    }
    if (!teamId || 0 == teamId) {
        return teamName;
    }
    return '<a class="team-link {2}" title="{3}" href="/Teams/{0}">{1}</a>'.format(teamId, teamName, clazz ? clazz : "", title ? title : "");
};
WS.TournamentLink = function(regionId, regionCode, tournamentId, tournamentName, clazz, title) {
    if (!regionId || !tournamentId || !tournamentName) {
        return;
    }
    var icon = regionCode ? '<span class="ui-icon country flg-' + regionCode + '"></span>' : "";
    clazz = clazz || "";
    clazz = regionCode ? "{0} {1}".format(clazz, "iconize iconize-icon-left") : clazz;
    return '<a class="tournament-link {3}" title="{4}" href="/Regions/{0}/Tournaments/{1}">{2}{5}</a>'.format(regionId, tournamentId, tournamentName, clazz, title ? title : "", icon);
};
WS.TournamentHistoryLink = function(regionId, regionCode, tournamentId, tournamentName, seasonId, clazz, title) {
    if (!regionId || !tournamentId || !tournamentName) {
        return;
    }
    var icon = regionCode ? '<span class="ui-icon country flg-' + regionCode + '"></span>' : "";
    clazz = clazz || "";
    clazz = regionCode ? "{0} {1}".format(clazz, "iconize iconize-icon-left") : clazz;
    return '<a class="tournament-link {3}" title="{4}" href="/Regions/{0}/Tournaments/{1}/Seasons/{6}">{2}{5}</a>'.format(regionId, tournamentId, tournamentName, clazz, title ? title : "", icon, seasonId);
};
WS.GridPaginator = function(config) {
    var id, totalPages, totalRecords, currentPage, recordsPerPage, $self;

    function init(config) {
        id = config.id;
        $self = $("#" + id);
    }

    init(config);
    this.id = function() {
        return id;
    };
    this.bindFilterActions = function(filterId) {
        $("#" + filterId).triggerHandler("refresh-filters", [filterId + "-page"]);
    };
    this.update = function(data) {
        if (!data) {
            return;
        }
        if (!data[0]) {
            return;
        }
        var meta = data[0];
        currentPage = meta[0];
        totalPages = meta[1];
        totalRecords = meta[2];
        recordsPerPage = meta[3];
        $self.html(getView());
    };

    function getView() {
        var t = [];
        t.push('<dl class="listbox right">');
        t.push("<dt><b> Page {3}/{4} | Showing {0} - {1} of {2}</b></dt>".format((((currentPage - 1) * recordsPerPage) + 1), Math.min(currentPage * recordsPerPage, totalRecords), totalRecords, currentPage, totalPages));
        var isFirstPage = (1 == currentPage);
        var isLastPage = (totalPages == currentPage);
        if (!isFirstPage && !isLastPage) {
            t.push('<dd style="display: none"><a data-source="10" data-value="10" href="#" class="option selected">dummy</a></dd>');
        }
        t.push('<dd><a data-source="{0}" data-value="11" href="#" class="option {1}">first</a></dd>'.format(1, isFirstPage ? "selected" : ""));
        if (!isFirstPage) {
            t.push('<dd title="Go to page {0}">| <a data-source="{0}" data-value="12" href="#" class="option">prev</a></dd>'.format(currentPage - 1));
        } else {
            t.push('<dd>| <span class="option disabled" href="#">prev</span></dd>');
        }
        if (!isLastPage) {
            t.push('<dd title="Go to page {0}">| <a data-source="{0}" data-value="13" href="#" class="option">next</a></dd>'.format(currentPage + 1));
        } else {
            t.push('<dd>| <span class="option disabled" href="#">next</span></dd>');
        }
        t.push('<dd>| <a data-source="{0}" data-value="14" href="#" class="option {1}">last</a></dd>'.format(totalPages, isLastPage ? "selected" : ""));
        t.push("</dl>");
        return t.join("");
    }
};
WS.FavouriteTournamentsStatusController = {
    init: function() {
        var self = this;
        var favouriteTournamentIds = self.getFavouriteTournamentIds();
        $(".tournament-favourite-status").each(function() {
            self.initTournamentFavouriteStatus($(this), favouriteTournamentIds);
            self.setTournamentFavouriteView($(this));
            self.bindFavouriteTournamentRemoved($(this));
            self.bindFavouriteTournamentAdded($(this));
        });
        $(".tournament-favourite-status").bind("click", function(e) {
            e.preventDefault();
            self.addTournamentAsFavourite($(this));
            return false;
        });
    },
    bindFavouriteTournamentRemoved: function($elem) {
        var tournamentId = $elem.attr("data-tournament-id");
        var self = this;
        NG.Events.addGlobal("favouritetournamentremoved-" + tournamentId, function() {
            $elem.attr("data-is-favourite-tournament", "0");
            self.setTournamentFavouriteView($elem);
        });
    },
    addTournamentAsFavourite: function($elem) {
        var tournamentId = $elem.attr("data-tournament-id");
        if ("0" == $elem.attr("data-is-favourite-tournament")) {
            NG.Events.fireGlobal("addFavouriteTournament", [tournamentId, $elem]);
        }
    },
    bindFavouriteTournamentAdded: function($elem) {
        var tournamentId = $elem.attr("data-tournament-id");
        var self = this;
        NG.Events.addGlobal("favouritetournamentadded-" + tournamentId, function() {
            $elem.attr("data-is-favourite-tournament", "1");
            self.setTournamentFavouriteView($elem);
        });
    },
    initTournamentFavouriteStatus: function($elem, favouriteTournamentIds) {
        var tournamentId = $elem.attr("data-tournament-id");
        $elem.attr("data-is-favourite-tournament", -1 != $.inArray(tournamentId, favouriteTournamentIds) ? "1" : "0");
    },
    setTournamentFavouriteView: function($elem) {
        if ($elem.attr("data-tournament-id")) {
            if ("1" == $elem.attr("data-is-favourite-tournament")) {
                $elem.html("In favourites");
            } else {
                $elem.html('<a class="iconize iconize-icon-right ui-state-transparent-default" href="#popular"><span class="ui-icon ui-icon-star"></span>Add to Favourites</a>');
            }
        }
    },
    getFavouriteTournamentIds: function() {
        var ft = $.cookie("ft") || "";
        return ((0 < ft.length) ? ft.split(",") : []);
    },
    tournamentIsFavourite: function(tournamentId) {
        return tournamentId ? -1 != $.inArray(tournamentId, this.getFavouriteTournamentIds()) : false;
    }
};

function GetTimeRemainingText(startTime) {
    var nTotalDiff = new Date() - new Date(startTime);
    var tD = new Object();
    tD.days = Math.floor(nTotalDiff / 1000 / 60 / 60 / 24);
    nTotalDiff -= tD.days * 1000 * 60 * 60 * 24;
    tD.hours = Math.floor(nTotalDiff / 1000 / 60 / 60);
    nTotalDiff -= tD.hours * 1000 * 60 * 60;
    tD.minutes = Math.floor(nTotalDiff / 1000 / 60);
    if (tD.days > 1) {
        return "in " + tD.days + "days";
    } else {
        if (tD.days > 0) {
            return "in " + tD.days + "days " + tD.hours + "hrs";
        } else {
            if (tD.hours > 1) {
                return "in " + tD.hours + "hrs " + tD.hours + "'";
            } else {
                if (tD.hours > 0) {
                    return "in " + tD.hours + "hr " + tD.minutes + "'";
                } else {
                    if (tD.minutes > 0) {
                        return "in " + tD.minutes + "mins";
                    } else {
                        return "upcoming";
                    }
                }
            }
        }
    }
}

function MatchFacts(config) {
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
        var model = MatchFactsModel(data.value);
        $view.html(MatchFactsView(model));
    };
}

function MatchFactsModel(data) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        result.push({
            MatchLink: data[i][0],
            RegionCode: data[i][1],
            HomeTeamName: data[i][2],
            AwayTeamName: data[i][3],
            StartTime: data[i][4],
            FactPoints: data[i][5],
            Sentence: data[i][6],
            MarketType: data[i][7],
            Odd: {
                Value: data[i][8][0],
                CouponUrl: data[i][8][1],
                ProviderId: data[i][8][2],
                ProviderUrl: data[i][8][3],
                ProviderName: data[i][8][4],
                OddText: data[i][8][5],
                HasOdds: data[i][8][6]
            }
        });
    }
    return result;
}

function MatchFactsView(model) {
    var t = [];
    var f;
    t.push('<ul id="factsBox">');
    for (var i = 0, l = model.length; i < l; i++) {
        f = model[i];
        t.push('<li class="fact">');
        t.push('<div class="factText">' + f.Sentence + "</div>");
        t.push('<a target="_blank" class="matchLink" href="' + f.MatchLink + '">');
        t.push('<span class="iconize iconize-icon-left">');
        t.push('<span class="ui-icon country flg-' + f.RegionCode + '"></span>');
        t.push(f.HomeTeamName + " - " + f.AwayTeamName + " (" + GetTimeRemainingText(f.StartTime) + ")");
        t.push("</span></a>");
        if (f.Odd.HasOdds) {
            t.push('<a class="slip-button factBetWrapper" target="_blank" href="' + f.Odd.CouponUrl + '">' + f.Odd.OddText + '<span class="odds odds-numeric">' + f.Odd.Value + "</span></a>");
        }
        t.push('<a href="http://twitter.com/share" class="twitter-share-button" data-count="none" data-text="' + f.Sentence + ' via @WhoScored"></a>');
        t.push("</li>");
    }
    t.push("</ul>");
    t.push('<div class="info">* Odds from bet365.</div>');
    return t.join("");
}
WS.trackMatchFacts = function($a) {
    NG.GA.trackEvent("MatchFacts", $a.attr("data-market-type"), window.location.href);
    window.setTimeout(function() {
        window.open($a.attr("href"));
    }, 100);
    return false;
};
WS.trackOddSummary = function($a) {
    NG.GA.trackEvent("OddSummary", window.location.href);
    window.setTimeout(function() {
        window.open($a.attr("href"));
    }, 100);
    return false;
};
WS.trackHomeSlides = function($a) {
    NG.GA.trackEvent("Slides", $a.attr("data-slide-type").toLowerCase(), $a.attr("href"));
    window.setTimeout(function() {
        window.open($a.attr("href"), "_self");
    }, 100);
    return false;
};
var ConvertDecimalToFractional = (function() {
    var memoOdds = {};

    function convertDecimalToFractional(numToConvert) {
        if (numToConvert < 1.15) {
            numToConvert = Math.round(numToConvert * 100) / 100;
            numToConvert = (numToConvert % 0.02) + numToConvert;
        } else {
            numToConvert = Math.round(numToConvert * 20) / 20;
        }
        var value;
        if (numToConvert in memoOdds) {
            value = memoOdds[numToConvert];
        } else {
            var wholeNumber = parseInt(numToConvert);
            var decimalPart = Math.round((numToConvert - wholeNumber) * 20) / 20;
            var multiple = parseInt(Math.pow(10, decimalPart.toString().substring(2).length));
            var num = parseInt(multiple * decimalPart);
            var denom = multiple;
            if (num > 0) {
                while (((num % 2) + (denom % 2)) == 0) {
                    num = num / 2;
                    denom = denom / 2;
                }
                while (((num % 5) + (denom % 5)) == 0) {
                    num = num / 5;
                    denom = denom / 5;
                }
                value = (wholeNumber * denom - denom + num) + "/" + denom;
            } else {
                value = wholeNumber - 1 + "/1";
            }
            memoOdds[numToConvert] = value;
        }
        return value;
    }

    return convertDecimalToFractional;
})();
var ChangeAllOddsToFractional = function() {
    var odt = $.cookie("odt");
    if (1 == odt) {
        $(".odds-numeric").each(function() {
            $(this).html(ConvertDecimalToFractional($(this).html()));
        });
    }
};
WS.isOptaTournament = function(tournamentId) {
    var defaultTournamentIds = [2, 5, 4, 3, 22, 13, 77, 95, 85, 7, 12, 30];
    return isInArray(tournamentId, defaultTournamentIds);

    function isInArray(value, array) {
        return array.indexOf(value) > -1 || array.indexOf(Number(value)) > -1;
    }
};
WS = WS || {};
WS.Accounts = function($) {
    function validateEmail(value) {
        var at = value.lastIndexOf("@");
        if (at < 1 || (at + 1) === value.length) {
            return false;
        }
        var local = value.substring(0, at),
            domain = value.substring(at + 1);
        if (254 < value.length || 64 < local.length || 255 < domain.length) {
            return false;
        }
        if (/(^\.|\.$)/.test(local) || /(^\.|\.$)/.test(domain)) {
            return false;
        }
        if (/(^-|-$)/.test(domain)) {
            return false;
        }
        if (/(\.{2,})/.test(domain)) {
            return false;
        }
        if (!/^[-a-zA-Z0-9\.]*$/.test(domain)) {
            return false;
        }
        if (!/^"(.+)"$/.test(local)) {
            if (!/^[a-zA-Z0-9!#$%&'*+-\/=?^_`{|}~\.]*$/.test(local)) {
                return false;
            }
        }
        return true;
    }

    return {
        initializeForm: function($form) {
            $form.submit(function() {
                $(this).find("input[type=submit]").attr("disabled", true);
                return true;
            });
        },
        registrationForm: function($form) {
            var passwordBlacklist = (window.gPasswordBlacklist && 0 < gPasswordBlacklist.length) ? gPasswordBlacklist.split(",") : null;
            var emailAddressTypoChecker = (window.gEmailAddressTypoChecker && 0 < gEmailAddressTypoChecker.length) ? new RegExp(gEmailAddressTypoChecker) : null;

            function setField(type) {
                fields[type] = $("#" + type);
                hints[type] = $("#" + type + "-status");
                if (hasHintType(hints[type], error) || hasHintType(hints[type], ok)) {
                    hints[type].show();
                } else {
                    setHint(hints[type], prompt, messages[type + "Prompt"]);
                    hints[type].hide();
                }
            }

            function hasHintType($el, type) {
                return $el.find("." + type).length;
            }

            function setHint($el, type, message) {
                return $el.html('<div class="' + type + '">' + message + "</div>");
            }

            function focusHandler() {
                var $hint = hints[this.id];
                $hint.show();
            }

            function blurHandler() {
                var $field = fields[this.id],
                    $hint = hints[this.id];
                if (isBlank($field.val())) {
                    $hint.hide();
                }
            }

            function isValidChar(e, validInput) {
                var charCode = e.which;
                var re = validInput;
                var keyChar = String.fromCharCode(charCode);
                var validChar = re.test(keyChar);
                var specialChar = [0, 8, 9, 13].indexOf(charCode) !== -1;
                if (!(validChar || specialChar)) {
                    return false;
                }
                return true;
            }

            function usernameField() {
                setField("username");
                var ajaxHandle = null;
                fields.username.bind("focus", focusHandler);
                fields.username.bind("blur", function(e) {
                    var $field = fields[this.id],
                        $hint = hints[this.id],
                        value = $field.val();
                    if (isBlank(value)) {
                        $hint.hide();
                        return;
                    }
                    if (value.length < 3) {
                        setHint($hint, error, messages.usernameError);
                    }
                });
                fields.username.bind("keypress", function(e) {
                    if (!isValidChar(e, /[a-zA-Z0-9_.]/)) {
                        e.preventDefault();
                    }
                });
                fields.username.bind("keyup", function(e) {
                    var $field = fields[this.id],
                        $hint = hints[this.id],
                        value = $field.val();
                    var charCode = e.which;
                    var isSpecialChar = [16, 17, 18, 20, 27, 33, 34, 35, 37, 38, 39, 40, 144].indexOf(charCode) !== -1;
                    if (isSpecialChar) {
                        return;
                    }
                    if (usernameOldValue == value) {
                        return;
                    }
                    usernameOldValue = value;
                    if (ajaxHandle) {
                        ajaxHandle.abort();
                    }
                    if (value == "") {
                        setHint($hint, prompt, messages.usernamePrompt);
                        return;
                    }
                    if (value.match(/^[a-zA-Z0-9_.]{3,50}$/)) {
                        setHint($hint, prompt, messages.usernameHelper);
                        clearTimeout(timeout);
                        timeout = setTimeout(function() {
                            ajaxHandle = $.ajax({
                                type: "GET",
                                url: "/Accounts/UsernameAvailable",
                                cache: false,
                                data: {
                                    username: value
                                },
                                dataType: "json",
                                success: function(json) {
                                    if (json) {
                                        setHint($hint, ok, messages.usernameOK);
                                    } else {
                                        setHint($hint, error, messages.usernameExistsError);
                                    }
                                }
                            });
                        }, 1650);
                    } else {
                        if (3 <= value.length) {
                            setHint($hint, error, messages.usernameError);
                        }
                    }
                });
            }

            function passwordField() {
                setField("password");
                fields.password.bind("focus", focusHandler);
                fields.password.bind("blur", function() {
                    var $field = fields[this.id],
                        $hint = hints[this.id],
                        value = $field.val();
                    if (isBlank(value)) {
                        $hint.hide();
                        setHint($hint, prompt, messages.passwordPrompt);
                        return;
                    }
                    if (value.length < 6) {
                        setHint($hint, error, messages.passwordError);
                        return;
                    }
                    if (fields.username.val() == value || "sAf3$pW8" == value || (passwordBlacklist && -1 != $.inArray(value.toLowerCase(), passwordBlacklist))) {
                        setHint($hint, error, messages.passwordTooObviousError);
                        return false;
                    }
                    setHint($hint, ok, messages.passwordOK);
                });
                fields.password.bind("keypress", function(e) {
                    if (!isValidChar(e, /[^\s]/)) {
                        e.preventDefault();
                    }
                });
            }

            function passwordConfirmationField() {
                setField("passwordConfirmation");
                fields.passwordConfirmation.bind("focus", focusHandler);
                fields.passwordConfirmation.bind("blur", function() {
                    var $field = fields[this.id],
                        $hint = hints[this.id],
                        value = $field.val();
                    if (isBlank(value)) {
                        $hint.hide();
                        setHint($hint, prompt, messages.passwordConfirmationPrompt);
                        return;
                    }
                    if (value != fields.password.val()) {
                        setHint($hint, error, messages.passwordConfirmationError);
                        return;
                    }
                    setHint($hint, ok, messages.passwordConfirmationOK);
                });
            }

            function emailAddressField() {
                setField("emailAddress");
                fields.emailAddress.bind("focus", focusHandler);
                fields.emailAddress.bind("blur", function() {
                    var $field = fields[this.id],
                        $hint = hints[this.id],
                        value = $field.val().trim();
                    $field.val(value);
                    if (isBlank(value)) {
                        $hint.hide();
                        setHint($hint, prompt, messages.emailAddressPrompt);
                        return;
                    }
                    if (emailAddressOldValue == value) {
                        return;
                    }
                    emailAddressOldValue = value;
                    if (!validateEmail(value)) {
                        setHint($hint, error, messages.emailAddressError);
                        return;
                    }
                    if (emailAddressTypoChecker && emailAddressTypoChecker.test(value)) {
                        setHint($hint, error, messages.emailAddressError);
                        return;
                    }
                    setHint($hint, prompt, messages.emailAddressHelper);
                    $.ajax({
                        type: "GET",
                        url: "/Accounts/EmailAddressAvailable",
                        cache: false,
                        data: {
                            emailAddress: value
                        },
                        dataType: "json",
                        success: function(json) {
                            if (0 == json.ReturnCode) {
                                setHint($hint, ok, messages.emailAddressOK);
                            } else {
                                setHint($hint, error, json.Message);
                            }
                        }
                    });
                });
                fields.emailAddress.bind("keypress", function(e) {
                    var $field = fields[this.id],
                        value = $field.val().trim();
                    $field.val(value);
                    if (13 == e.which && !isBlank(value) && emailAddressOldValue != value) {
                        $field.blur();
                        e.preventDefault();
                    }
                });
            }

            var error = "error",
                prompt = "prompt",
                ok = "ok",
                messages = gMessages,
                fields = {},
                hints = {},
                usernameOldValue = null,
                emailAddressOldValue = null,
                timeout = null;
            usernameField();
            passwordField();
            passwordConfirmationField();
            emailAddressField();
            $form.submit(function() {
                return true;
            });
        }
    };
}(jQuery);
WS = WS || {};
WS.LS = {};
WS.LS.ItemStatus = {
    all: 0,
    live: 2,
    next: 4
};
WS.LS.IncidentManager = function(options) {
    var itemIdPrefix = "i",
        itemIdRegEx = new RegExp("{0}(\\d*)".format(itemIdPrefix)),
        visibleIncidents = {};
    this.toggle = function(button) {
        var itemId = $(button).parents("tr:first").attr("id").match(itemIdRegEx)[1];
        visibleIncidents[itemId] ? hide(itemId) : show(itemId);
    };
    this.showAll = function() {
        for (var itemId in visibleIncidents) {
            show(itemId);
        }
    };

    function show(id) {
        var $tr = $("#" + itemIdPrefix + id).addClass("hasDetails");
        var $button = $tr.find(".show-incidents").addClass("ui-state-active").blur().find(".ui-icon").removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-s");
        visibleIncidents[id] = true;
        $tr.after(options.parent.getIncidentHtml(id));
    }

    function hide(id) {
        delete visibleIncidents[id];
        var $tr = $("#" + itemIdPrefix + id).removeClass("hasDetails");
        var $button = $tr.find(".show-incidents").removeClass("ui-state-active").blur().find(".ui-icon").removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e");
        $('tr[data-match-id="' + itemIdPrefix + id + '"]').remove();
    }
};
WS.LS.TournamentToggleManager = function(options) {
    var groupIdPrefix = "g",
        groupIdRegEx = new RegExp("{0}(\\d*)".format(groupIdPrefix)),
        expandedTournaments = {};
    this.initialize = function(expandedGroups) {
        for (var i = 0, l = expandedGroups.length; i < l; i++) {
            expandedTournaments[expandedGroups[i]] = true;
        }
    };
    this.toggle = function(row) {
        var groupId = $(row).parents("tr:first").attr("id").match(groupIdRegEx)[1];
        expandedTournaments[groupId] ? collapse(groupId) : expand(groupId);
    };
    this.expand = function() {
        for (var groupId in expandedTournaments) {
            expand(groupId);
        }
    };
    this.isExpanded = function(id) {
        return expandedTournaments[id];
    };

    function expand(id) {
        $('tr[id="g' + id + '"]').removeClass("collapsed");
        $('tr[data-group-id="' + id + '"]').removeClass("ls-th");
        expandedTournaments[id] = true;
    }

    function collapse(id) {
        delete expandedTournaments[id];
        $('tr[id="g' + id + '"]').addClass("collapsed");
        $('tr[data-group-id="' + id + '"]').addClass("ls-th");
    }
};
WS.LS.Selection = function() {
    this.items_ = {};
    this.groups_ = {};
    this.totalItemCount_ = 0;
    this.any = function() {
        return (0 < this.totalItemCount_);
    };
    this.selectItem = function(item) {
        if (this.isSelectedItem(item.Id)) {
            return;
        }
        var clone = {
            Id: item.Id,
            GroupId: item.Group.Id
        };
        this.items_[clone.Id] = clone;
        this.totalItemCount_++;
        this.groups_[clone.GroupId] = this.groups_[clone.GroupId] || {
            selectedItemCount: 0
        };
        this.groups_[clone.GroupId].selectedItemCount++;
    };
    this.deselectItem = function(item) {
        if (!this.isSelectedItem(item.Id)) {
            return;
        }
        this.totalItemCount_--;
        delete this.items_[item.Id];
        this.groups_[item.Group.Id].selectedItemCount--;
        if (0 == this.groups_[item.Group.Id].selectedItemCount) {
            delete this.groups_[item.Group.Id];
        }
    };
    this.hasSelectedItems = function(id) {
        return "undefined" != typeof(this.groups_[id]);
    };
    this.isSelectedItem = function(id) {
        return "undefined" != typeof(this.items_[id]);
    };
};
WS.LS.CssToggler = function() {
    var cache = {
        init: false
    };

    function applyCssRules() {
        if (!cache.init) {
            var selectors = [".ls-1", ".ls-2", ".ls-4", ".ls-3", ".ls-5", ".ls-6", ".ls-7", ".ls-e", ".ls-o", ".ls-t", ".ls-s", ".ls-th", ".ls-thb"],
                count = selectors.length,
                selectorsMap = selectors.hashtable(),
                styleSheet, cssRules, cssRule;
            styleSheet = getStyleSheet();
            cssRules = styleSheet.cssRules || styleSheet.rules;
            for (var j = 0, m = cssRules.length; j < m; j++) {
                cssRule = cssRules[j];
                if (undefined != selectorsMap[cssRule.selectorText]) {
                    cache[cssRule.selectorText] = cssRule;
                }
            }
            cache.init = true;
        }
        for (var i = 0, l = arguments[1].length; i < l; i++) {
            cache[arguments[1][i]].style.display = ("show" == arguments[0]) ? "" : "none";
        }
    }

    function getStyleSheet() {
        for (var i = 0, l = document.styleSheets.length; i < l; i++) {
            if ("ls" == document.styleSheets[i].title) {
                return document.styleSheets[i];
            }
        }
        return null;
    }

    this.show = function(selectors) {
        applyCssRules("show", selectors);
    };
    this.hide = function(selectors) {
        applyCssRules("hide", selectors);
    };
};
WS.LS.MapLike = function() {
    this.keys = {};
    this.values = [];
    this.add = function(id, o, position) {
        ("undefined" !== typeof(position)) ? this.values[position] = o: this.values.push(o);
        this.keys[id] = o;
    };
};
WS.LS.Model = function() {
    this.array_ = null;
    this.favoriteGroups_ = null;
    this.create = function(array) {
        this.process_(array);
        NG.Events.fire(this, "modelchanged", this);
    };
    this.update = function(array) {
        this.merge_(array);
        this.process_(this.array_);
        NG.Events.fire(this, "modelchanged", this);
    };
    this.sort = function() {
        NG.async(function() {
            this.process_(this.array_);
            NG.Events.fire(this, "modelsorted", this);
        }, this);
    };
    this.process_ = function(array) {
        this.groups = new WS.LS.MapLike();
        this.items = new WS.LS.MapLike();
        this.itemCounts = {
            "0": 0,
            "1": 0,
            "2": 0,
            "4": 0
        };
        this.scoreUpdates = {
            all: [],
            live: [],
            next: [],
            add: function(item) {
                this.all.push(item);
                if (2 == item.Status) {
                    this.live.push(item);
                } else {
                    if (4 == item.Status) {
                        this.next.push(item);
                    }
                }
            }
        };
        this.array_ = array;
        this.favoriteGroups_ = this.getFavoriteGroups_();
        for (var i = 0, l = this.favoriteGroups_.ids.length; i < l; i++) {
            this.groups.values.push(null);
        }
        var expandAll = this.array_[2].length <= 60;
        for (var i = 0, l = this.array_[1].length; i < l; i++) {
            this.mapGroups_(this.array_[1][i], expandAll);
        }
        for (var i = 0, l = this.array_[2].length; i < l; i++) {
            this.mapItems_(this.array_[2][i]);
        }
        for (var i = 0, l = this.favoriteGroups_.ids.length; i < l; i++) {
            if (null == this.groups.values[i]) {
                this.groups.values.splice(i, 1);
                i--;
                l--;
            }
        }
    };
    this.mapGroups_ = function(props, expandAll) {
        var o = {
            Status: 0,
            Items: [],
            add: function(item) {
                item.Group = this;
                this.Items.push(item);
                this.Status = this.Status | item.Status;
            }
        };
        o.Id = props[0];
        o.CountryId = props[1];
        o.CountryCode = props[2];
        o.CountryName = props[3];
        o.TournamentId = props[4];
        o.TournamentShortName = props[5] || "";
        o.SeasonId = props[6];
        o.Name = props[7];
        o.Expand = (1 == props[8] || 1 == props[11]);
        o.DetailedCoverage = props[9];
        o.IsInternational = props[10];
        o.ItemCount = 0;
        if (o.Id in this.favoriteGroups_.index) {
            o.isFavorite = true;
            o.Expand = true;
            this.groups.add(o.Id, o, this.favoriteGroups_.index[o.Id]);
        } else {
            this.groups.add(o.Id, o);
        }
        if (expandAll) {
            o.Expand = true;
        }
    };
    this.mapItems_ = function(props) {
        var o = {};
        o.Id = props[1];
        o.Status = props[2];
        o.StartTime = props[3];
        o.HomeTeamId = props[4];
        o.HomeTeamName = props[5];
        o.HomeYCards = props[6];
        o.HomeRCards = props[7];
        o.AwayTeamId = props[8];
        o.AwayTeamName = props[9];
        o.AwayYCards = props[10];
        o.AwayRCards = props[11];
        o.Score = props[12];
        o.HTScore = props[13];
        o.HasIncidents = (1 == props[14]);
        o.HasPreview = (1 == props[15]);
        o.ScoreChangedAt = props[16];
        o.Elapsed = props[17] || "";
        o.LastScorer = props[18] || "";
        o.IsTopGame = props[19];
        o.HomeCountryCode = props[20];
        o.AwayCountryCode = props[21];
        o.Incidents = props[22];
        o.CommentCount = props[23];
        o.IsLineupsConfirmed = props[24];
        o.IsStreamAvailable = props[25];
        o.MatchIsDetailedCoverage = props[26];
        o.HasLineup = props[27];
        this.items.add(o.Id, o);
        var group = this.groups.keys[parseInt(props[0])];
        o.DetailedCoverage = group.DetailedCoverage || o.MatchIsDetailedCoverage;
        group.add(o);
        o.Group = group;
        if (2 == o.Status) {
            group.Expand = true;
        }
        group.ItemCount++;
        if (o.ScoreChangedAt && o.Status != "4") {
            this.scoreUpdates.add(o);
        }
        this.itemCounts[0] ++;
        this.itemCounts[o.Status] ++;
    };
    this.getFavoriteGroups_ = function() {
        var result = {
                ids: [],
                index: {}
            },
            favoriteTournaments = WS.User.favoriteTournaments(),
            items = this.array_[1];
        if (0 < favoriteTournaments.length) {
            var groupIdx = items.indextable(function(item) {
                return item[4];
            });
            for (var i = 0, l = favoriteTournaments.length; i < l; i++) {
                if (undefined != groupIdx[favoriteTournaments[i]]) {
                    for (var j = 0, k = items.length; j < k; j++) {
                        if (favoriteTournaments[i] == items[j][4]) {
                            result.ids.push(items[j][0]);
                        }
                    }
                }
            }
            result.index = result.ids.indextable();
        }
        return result;
    };
    this.merge_ = function(delta) {
        var i, l, id, idx, rawGroups = this.array_[1],
            rawItems = this.array_[2],
            deltaGroups = delta[1],
            deltaItems = delta[2];
        for (i = 0, l = deltaGroups.length; i < l; i++) {
            id = deltaGroups[i][0];
            if (id in this.groups.keys) {
                idx = NG.indexOf(rawGroups, id, 0, function(o) {
                    return o[0];
                });
                rawGroups[idx] = deltaGroups[i];
            } else {
                rawGroups.push(deltaGroups[i]);
            }
        }
        for (i = 0, l = deltaItems.length; i < l; i++) {
            id = deltaItems[i][1];
            if (id in this.items.keys) {
                idx = NG.indexOf(rawItems, id, 0, function(o) {
                    return o[1];
                });
                rawItems[idx] = deltaItems[i];
            } else {
                idx = NG.binarySearch(rawItems, deltaItems[i][3], true, function(o) {
                    return o[3];
                });
                rawItems.splice(idx, 0, deltaItems[i]);
            }
        }
    };
};
WS.LS.LiveScores = function(state, selectionItems) {
    var self = this,
        groups, items, itemCounts, currentState = $.extend(true, {}, state),
        el = document.getElementById("livescores"),
        selections = new WS.LS.Selection(),
        selection = selectionItems,
        initializeSelections = selection && 0 < selection.length,
        incidentManager = new WS.LS.IncidentManager({
            parent: self
        }),
        tournamentToggleManager = new WS.LS.TournamentToggleManager({
            parent: self
        }),
        initializeTournamentsToggle = true;
    this.selections = selections;
    var matchSelectedMsgOptions = {
        icon: "icon-circle-check",
        messageText: "Added to your selections",
        classes: "favorite-tournaments-added-message",
        timeToLive: 750,
        leftMargin: 5
    };
    this.dataChanged = function(model) {
        groups = model.groups;
        items = model.items;
        itemCounts = model.itemCounts;
        if (initializeSelections) {
            for (var i = 0, l = selection.length; i < l; i++) {
                selections.selectItem(model.items.keys[selection[i]]);
            }
            initializeSelections = false;
        }
        this.render_();
        incidentManager.showAll();
        if (initializeTournamentsToggle) {
            var expandedGroups = [];
            for (var i = 0, l = groups.values.length; i < l; i++) {
                var group = groups.values[i];
                if (group.Expand) {
                    expandedGroups.push(group.Id);
                }
            }
            tournamentToggleManager.initialize(expandedGroups);
            initializeTournamentsToggle = false;
        }
        tournamentToggleManager.expand();
    };
    this.stateChanged = function(state) {
        var layoutChanged = currentState.layout != state.layout,
            selectionChanged = (currentState.items != state.items) && ("selected" == currentState.items || "selected" == state.items);
        currentState = $.extend(true, {}, state);
        if (layoutChanged || selectionChanged) {
            this.render_();
            incidentManager.showAll();
            tournamentToggleManager.expand();
        }
    };
    this.dispose = function() {
        el = NG.replaceHtml(el, "");
    };
    this.anySelection = function() {
        return selections.any();
    };
    this.clearSelection = function() {
        selections = new WS.LS.Selection();
        NG.Events.fire(self, "selectionchanged", [selections]);
    };
    this.checkboxClicked_ = function(source) {
        var isItemClicked = (-1 < source.id.indexOf("i")) ? true : false;
        if (isItemClicked) {
            var id = source.id.substr(2),
                item = items.keys[id];
            if (source.checked) {
                selections.selectItem(item);
                $(source).messageBox(matchSelectedMsgOptions);
            } else {
                selections.deselectItem(item);
            }
        } else {
            var id = source.id.substr(1),
                group = groups.keys[id],
                itemStatus = WS.LS.ItemStatus[currentState.items],
                checkbox;
            if (source.checked) {
                group.Items.forEach(function(item) {
                    if (("all" == currentState.items) || ("all" != currentState.items && itemStatus == item.Status) || ("selected" == currentState.items)) {
                        var checkbox = document.getElementById("is" + item.Id);
                        if (checkbox && !checkbox.checked) {
                            selections.selectItem(item);
                            checkbox.checked = true;
                        }
                    }
                });
                $(source).messageBox(matchSelectedMsgOptions);
            } else {
                group.Items.forEach(function(item) {
                    var checkbox = document.getElementById("is" + item.Id);
                    if (checkbox && checkbox.checked) {
                        selections.deselectItem(item);
                        document.getElementById("is" + item.Id).checked = false;
                    }
                });
            }
        }
        NG.Events.fire(self, "selectionchanged", [selections]);
    };
    this.getIncidentHtml = function(itemId) {
        var item = items.keys[itemId],
            t = [],
            isExpanded = item.Group.Expand || tournamentToggleManager.isExpanded(item.Group.Id);
        item.Incidents.forEach(function(incident) {
            t.push(applyDetailTmpl(item, incident, "i", isExpanded));
        });
        return t.join("");
    };
    this.showIncidentsClicked_ = function(source) {
        incidentManager.toggle(source);
        return false;
    };
    this.toggleMatchesClicked_ = function(source) {
        tournamentToggleManager.toggle(source);
        return false;
    };
    this.render_ = function() {
        var html;
        var isSelectedStatus = ("selected" == currentState.items),
            isSelectedItem, isExpanded;
        if ("grouped" == currentState.layout) {
            var t = [];
            t.push('<table class="grid highlight livescores"><tbody>');
            groups.values.forEach(function(group, groupIndex, groups) {
                if (!isSelectedStatus || (isSelectedStatus && selections.hasSelectedItems(group.Id))) {
                    t.push(applyGroupTmpl(group, false));
                    group.Items.forEach(function(item, itemIndex, items) {
                        isSelectedItem = selections.isSelectedItem(item.Id);
                        if (!isSelectedStatus || (isSelectedStatus && isSelectedItem)) {
                            t.push(applyItemTmpl(item, itemIndex, isSelectedItem, ""));
                        }
                    });
                }
            });
            t.push("</tbody></table>");
            html = t.join("");
        } else {
            var t = [];
            t.push('<table class="grid highlight livescores"><tbody>');
            items.values.forEach(function(item, itemIndex, items) {
                isSelectedItem = selections.isSelectedItem(item.Id);
                if (!isSelectedStatus || (isSelectedStatus && isSelectedItem)) {
                    t.push(applyItemTmpl(item, itemIndex, isSelectedItem, ""));
                }
            });
            t.push("</tbody></table>");
            html = t.join("");
        }
        el = NG.replaceHtml(el, html);
    };
    var groupHyperlinkTemplate = "/Regions/{0}/Tournaments/{1}/Seasons/{2}/Stages/{3}";

    function applyGroupTmpl(group, checked) {
        var t = [];
        t.push('<tr class="group ls-');
        t.push(group.Status);
        t.push(" collapsed");
        t.push('" id="g');
        t.push(group.Id);
        t.push('">');
        t.push('<td class="ls-s selection"><input type="checkbox" id="g' + group.Id + '"');
        t.push(checked ? 'checked="true"' : "");
        t.push("/></td>");
        t.push('<td colspan="8">');
        t.push('<div class="group-name-container">');
        t.push('<span class="group-name iconize iconize-icon-left"><span class="ui-icon country flg-' + group.CountryCode + '"></span>' + group.CountryName + " - " + group.Name + "</span>");
        if (group.DetailedCoverage) {
            t.push('<span class="detcover rc">Detailed coverage</span>');
        }
        t.push("</div>");
        t.push('<a class="follow-link button-small ui-state-transparent-default rc" href="' + groupHyperlinkTemplate.format(group.CountryId, group.TournamentId, group.SeasonId, group.Id) + '" title="Go to tournament page"><span class="ui-icon ui-icon-circle-arrow-e"></span></a>');
        t.push("</td>");
        t.push("</tr>");
        return t.join("");
    }

    function applyItemTmpl(item, k, checked, prefix) {
        var intl = item.Group.IsInternational;
        var t = [];
        t.push('<tr class="item ls-');
        t.push(item.Status);
        t.push(" ls-th");
        t.push('" id="' + prefix + "i" + item.Id + '"');
        t.push(' data-group-id="' + item.Group.Id + '"');
        t.push(">");
        t.push('<td class="ls-s selection"><input type="checkbox" id="is' + prefix + item.Id + '"');
        t.push(checked ? 'checked="true"' : "");
        t.push("/></td>");
        t.push('<td class="toolbar left">');
        if (item.HasIncidents) {
            t.push('<a href="#" class="show-incidents button-small ui-state-transparent-default rc" title="Expand details"><span class="ui-icon ui-icon-triangle-1-e"></span></a>');
        }
        t.push("</td>");
        t.push('<td class="time">');
        t.push(item.StartTime);
        t.push("</td>");
        t.push('<td class="status">');
        t.push('<span class="status-' + item.Status + ' rc">' + item.Elapsed + "</span>");
        t.push("</td>");
        t.push('<td class="topmatch-column">');
        if (item.IsTopGame) {
            t.push('<span class="incidents-icon ui-icon topmatch" title="Top matches of the day"></span>');
        }
        t.push("</td>");
        t.push('<td class="team home">');
        if (0 < item.HomeRCards) {
            t.push('<span class="rcard ls-e">' + item.HomeRCards + "</span>");
        }
        if (intl) {
            t.push('<a class="team-link iconize iconize-icon-right" href="/Teams/' + item.HomeTeamId + '"><span class="ui-icon country flg-' + item.HomeCountryCode + '"></span><span class="team-name">' + item.HomeTeamName + "</span></a>");
        } else {
            t.push('<a class="team-link" href="/Teams/' + item.HomeTeamId + '"><span class="team-name">' + item.HomeTeamName + "</span></a>");
        }
        t.push("</td>");
        t.push('<td class="result">');
        var matchHasTerminatedUnexpectedly = matchTerminatedUnexpectedly(item.Elapsed);
        if (matchHasTerminatedUnexpectedly) {
            t.push('<a title="' + matchTerminatedUnexpectedlyToolTip(item.Elapsed) + ' " href="/Matches/' + item.Id + '">' + item.Score + "</a>");
        } else {
            if ("2" == item.Status || "1" == item.Status) {
                t.push('<a class="result-' + item.Status + ' rc" href="/Matches/' + item.Id + '/Live">' + item.Score + "</a>");
            } else {
                t.push('<a class="result-' + item.Status + ' rc" href="/Matches/' + item.Id + '">' + item.Score + "</a>");
            }
        }
        t.push("</td>");
        t.push('<td class="team away">');
        if (intl) {
            t.push('<a class="team-link iconize iconize-icon-left" href="/Teams/' + item.AwayTeamId + '"><span class="ui-icon country flg-' + item.AwayCountryCode + '"></span><span class="team-name">' + item.AwayTeamName + "</span></a>");
        } else {
            t.push('<a class="team-link" href="/Teams/' + item.AwayTeamId + '"><span class="team-name">' + item.AwayTeamName + "</span></a>");
        }
        if (0 < item.AwayRCards) {
            t.push('<span class="rcard ls-e">' + item.AwayRCards + "</span>");
        }
        t.push("</td>");
        t.push('<td class="stage ls-t' + prefix + '">');
        t.push('<a href="' + groupHyperlinkTemplate.format(item.Group.CountryId, item.Group.TournamentId, item.Group.SeasonId, item.Group.Id) + '" class="iconize iconize-icon-left"><span class="ui-icon country flg-' + item.Group.CountryCode + '"></span>' + item.Group.TournamentShortName + "</a>");
        t.push("</td>");
        t.push('<td class="toolbar right"><div style="width:12.75em;">');
        if (!item.Group.DetailedCoverage && item.DetailedCoverage && "4" == item.Status) {
            t.push('<span style="margin-right: 4px; vertical-align: middle; float: left; font-size: 10px;" class="detcover rc">Detailed coverage</span>');
        }
        if ("1" == item.Status && item.DetailedCoverage && !matchHasTerminatedUnexpectedly) {
            t.push('<a class="match-link rc match-report" href="/Matches/' + item.Id + '/MatchReport" title="Check Match Report!">Match Report</a>');
        } else {
            if ("2" == item.Status && item.DetailedCoverage) {
                t.push('<a class="match-link rc live" href="/Matches/' + item.Id + '/Live" title="Follow Live!">Match Centre</a>');
            } else {
                if (item.HasPreview && "4" == item.Status) {
                    t.push('<a class="match-link rc preview" href="/Matches/' + item.Id + '/Preview" title="Check Preview!">Preview</a>');
                }
            }
        }
        if ((item.IsLineupsConfirmed) && "4" == item.Status) {
            t.push('<a href="/Matches/' + item.Id + '/Live" class="match-link lineups-confirmed rc" title="Check Lineups!">Lineups</a>');
        }
        if (item.IsStreamAvailable) {
            t.push('<a href="/Matches/' + item.Id + '/LiveStream" class="iconize " title="Stream"><span class="incidents-icon ui-icon stream">Stream</span></a>');
        }
        if (item.CommentCount) {
            t.push('<a href="/Matches/' + item.Id + '" class="iconize iconize-icon-right fixture-comments" title="Comments"><span class="incidents-icon ui-icon comments"></span>' + item.CommentCount + "</a>");
        }
        t.push("</div></td>");
        t.push("</tr>");
        return t.join("");
    }

    function applyDetailTmpl(item, detail, prefix, expanded) {
        function getIncidentClass(type) {
            return (1 == type) ? "i-goal" : "i-rcard";
        }

        var t = [];
        t.push('<tr class="incident ls-' + item.Status);
        if (!expanded) {
            t.push(" ls-th");
        }
        t.push('"');
        t.push(' data-match-id="' + prefix + item.Id + '"');
        t.push(' data-group-id="' + item.Group.Id + '"');
        t.push(">");
        if ("0" == detail[2]) {
            t.push('<td class="team home" colspan="6">');
            t.push('<span class="iconize iconize-icon-right"><span class="incidents-icon ui-icon ' + getIncidentClass(detail[0]) + '"></span>');
            if (detail[4] != undefined) {
                t.push('<span class="goal-info">(' + detail[4] + ")</span>");
            }
            t.push(0 != detail[7] ? ('<a class="player-link" href="/Players/' + detail[7] + '">' + detail[3] + "</a>") : detail[3]);
            t.push("</span>");
            t.push("</td>");
            t.push('<td class="minute">');
            t.push(detail[1]);
            t.push("'</td>");
            t.push('<td class="team away" colspan="3"></td>');
        } else {
            t.push('<td class="team home" colspan="6"></td>');
            t.push('<td class="minute">');
            t.push(detail[1]);
            t.push("'</td>");
            t.push('<td class="team away" colspan="3">');
            t.push('<span class="iconize iconize-icon-left"><span class="ui-icon incidents-icon ' + getIncidentClass(detail[0]) + '"></span>');
            t.push(0 != detail[7] ? ('<a class="player-link" href="/Players/' + detail[7] + '">' + detail[3] + "</a>") : detail[3]);
            if (detail[4] != undefined) {
                t.push('<span class="goal-info">(' + detail[4] + ")</span>");
            }
            t.push("</span>");
            t.push("</td>");
        }
        t.push("</tr>");
        return t.join("");
    }
};
WS.LS.ScoreUpdates = function(state, selectionItems) {
    var model, top10Updates, updateSelections = [],
        allSelections = [],
        currentState = $.extend(true, {}, state),
        $el = $("#ws-content"),
        selection = selectionItems,
        initializeSelections = selection && 0 < selection.length;
    this.dataChanged = function(newModel) {
        model = newModel;
        if (initializeSelections) {
            for (var i = 0, l = selection.length; i < l; i++) {
                allSelections.push(newModel.items.keys[selection[i]]);
            }
            initializeSelections = false;
        }
        var tempTop10Updates = {
                all: getFirst10(newModel.scoreUpdates.all),
                live: getFirst10(newModel.scoreUpdates.live),
                next: getFirst10(newModel.scoreUpdates.next),
                selected: getFirst10(getSelectedItems(newModel, allSelections))
            },
            dataExists = 0 < tempTop10Updates[currentState.items].length,
            dataUpdated = hasUpdates(top10Updates, tempTop10Updates, currentState.items);
        top10Updates = tempTop10Updates;
        if (dataExists) {
            this.render_();
            if (dataUpdated) {
                NG.Events.fireGlobal("scoresupdated");
            }
        } else {
            this.reset_();
        }
    };

    function getSelectedItems(model, selectedItems) {
        var newItems = [];
        for (var i = 0, l = selectedItems.length; i < l; i++) {
            var item = model.items.keys[selectedItems[i].Id];
            if (item && item.ScoreChangedAt) {
                newItems.push(item);
            }
        }
        return newItems;
    }

    this.stateChanged = function(state) {
        var itemCountChanged = currentState.items != state.items;
        currentState = $.extend(true, {}, state);
        if (itemCountChanged) {
            if (0 < top10Updates[state.items].length) {
                this.render_();
            } else {
                this.reset_();
            }
        }
    };
    this.handleSelectionChanged = function(selection) {
        selectedItems = [];
        for (var itemId in selection.items_) {
            if (selection.items_.hasOwnProperty(itemId)) {
                selectedItems.push({
                    Id: itemId
                });
            }
        }
        allSelections = selectedItems;
        updateSelections = getSelectedItems(model, selectedItems);
        top10Updates.selected = getFirst10(updateSelections);
    };
    this.dispose = function() {
        delete data_;
        this.reset_();
    };

    function getIndex(collection, item) {
        for (var i = 0, l = collection.length; i < l; i++) {
            if (item.Id == collection[i].Id) {
                return i;
            }
        }
        return -1;
    }

    function getFirst10(items) {
        if (0 == items.length) {
            return [];
        }
        items.sort(function(a, b) {
            if (a.ScoreChangedAt < b.ScoreChangedAt) {
                return -1 * -1;
            }
            if (b.ScoreChangedAt < a.ScoreChangedAt) {
                return 1 * -1;
            }
            return 0;
        });
        var result = [];
        for (var i = 0; i < Math.min(10, items.length); i++) {
            result.push(items[i]);
        }
        return result;
    }

    function hasUpdates(current, update, field) {
        if (!current) {
            return false;
        }
        var diff = update[field].subtract(current[field], function(a, b) {
            return !(a.Id == b.Id && a.ScoreChangedAt == b.ScoreChangedAt);
        });
        return (0 < diff.length);
    }

    this.render_ = function() {
        var data = top10Updates[currentState.items],
            html, t = [];
        t.push('<table class="grid"><tbody>');
        data.forEach(function(item, itemIndex, items) {
            t.push(applyScoreUpdateTmpl(item));
        });
        t.push("</tbody></table>");
        html = t.join("");
        $el.html(html);
    };
    this.reset_ = function() {
        $el.html('<span class="empty">No goals yet</span>');
    };

    function applyScoreUpdateTmpl(item) {
        var t = [];
        t.push("<tr>");
        t.push('<td class="time">');
        t.push(item.ScoreChangedAt);
        t.push("</td>");
        t.push('<td class="team home">');
        t.push(("0" == item.LastScorer) ? "<strong>" + item.HomeTeamName + "</strong>" : item.HomeTeamName);
        t.push("</td>");
        t.push('<td class="result">');
        t.push(item.Score);
        t.push("</td>");
        t.push('<td class="team away">');
        t.push(("1" == item.LastScorer) ? "<strong>" + item.AwayTeamName + "</strong>" : item.AwayTeamName);
        t.push("</td>");
        t.push('<td class="stage">');
        t.push('<span class="group-name iconize iconize-icon-left" title="' + item.Group.CountryName + "-" + item.Group.Name + '"><span class="ui-icon country flg-' + item.Group.CountryCode + '"></span>' + item.Group.TournamentShortName + "</span>");
        t.push("</td>");
        t.push("</tr>");
        return t.join("");
    }
};
WS.LS.App = {
    isEverLoaded_: false,
    isLoading_: false,
    timer_: new NG.Timer(),
    defaultTimeout_: 15,
    freshLoadTimeout_: 60,
    lastCompleteRefreshAt_: null,
    date_: null,
    version_: null,
    model_: null,
    liveScores_: null,
    scoreUpdates_: null,
    state_: null,
    liveScoresToggleMatchesClicked_: function(source) {
        this.liveScores_.toggleMatchesClicked_(source);
    },
    liveScoresShowIncidentsClicked_: function(source) {
        this.liveScores_.showIncidentsClicked_(source);
    },
    liveScoresCheckboxClicked_: function(source) {
        this.liveScores_.checkboxClicked_(source);
    },
    modelChanged_: function(model) {
        var text = {
            all: "All",
            live: "In Play",
            next: "Upcoming",
            selected: "Selected"
        };
        $("#view-options a").each(function() {
            var key = this.href.substr(this.href.indexOf("#") + 1);
            var count = model.itemCounts[WS.LS.ItemStatus[key]];
            $(this).find("b").html(("undefined" != typeof(count) ? count : 0));
        });
        $('#view-options a[href="#selected"]').find("b").html(this.liveScores_.selections.totalItemCount_);
    },
    selectionChanged_: function(selection) {
        var value = null;
        if (0 < selection.totalItemCount_) {
            value = "*{0}*".format(this.date_.d);
            var items = [];
            for (var item in selection.items_) {
                items.push(item);
            }
            value += items.join("_");
        }
        $.cookie("selection", value, {
            domain: gDomain
        });
        $('#view-options a[href="#selected"]').find("b").html(selection.totalItemCount_);
    },
    init: function(dateController, datePicker, calendar) {
        var self = this;
        this.state_ = this.getState_("default");
        this.cssToggler_ = new WS.LS.CssToggler();
        $('#view-options a[href="#all"]').click(function() {
            ls.handleViewEvent("all");
            NG.GA.trackEvent("LiveScores", "View", "all");
            return false;
        });
        $('#view-options a[href="#live"]').click(function() {
            ls.handleViewEvent("live");
            NG.GA.trackEvent("LiveScores", "View", "live");
            return false;
        });
        $('#view-options a[href="#next"]').click(function() {
            ls.handleViewEvent("next");
            NG.GA.trackEvent("LiveScores", "View", "next");
            return false;
        });
        $('#view-options a[href="#selected"]').click(function() {
            ls.handleViewEvent("selected");
            NG.GA.trackEvent("LiveScores", "View", "selected");
            return false;
        });
        $("#view-sorted dl").listbox().bind("selected", function(e, value) {
            e.preventDefault();
            ls.handleViewEvent(value);
            NG.GA.trackEvent("LiveScores", "View", value);
        });
        $("#clear-selection-button").on("click", function() {
            ls.liveScores_.clearSelection();
            ls.handleViewEvent("all");
            return false;
        });
        NG.Events.add(this, "loadstart", function() {
            dateController.disable();
            datePicker.disable();
        });
        NG.Events.add(this, "loadend", function() {
            dateController.enable();
            datePicker.enable();
        });
        NG.Events.add(calendar, "datechanged", function() {
            self.load(calendar.parameter());
        });
        NG.Events.add(this, "loadstart", function() {
            $("#countdown").html("Loading...").css({
                backgroundColor: "#FFFFCC"
            });
        });
        NG.Events.add(this, "loadend", function() {
            $("#countdown").html("&nbsp;").css({
                backgroundColor: "transparent"
            });
        });
        $("#livescores-wrapper").on("click", ".show-incidents", function(event) {
            self.liveScoresShowIncidentsClicked_(this);
            NG.GA.trackEvent("LiveScores", "Incidents", "Show");
            return false;
        });
        $("#livescores-wrapper").on("click", 'input[type="checkbox"]', function(event) {
            self.liveScoresCheckboxClicked_(this);
        });
        $("#livescores-wrapper").on("click", ".group-name-container", function(event) {
            $(this).blur();
            if ("all" == self.state_.items) {
                self.liveScoresToggleMatchesClicked_(this);
            }
            return false;
        });
        $(".expand-goal-alerts").toggle(function() {
            $(this).addClass("ui-state-active");
            $("#ws-content").removeClass("collapsed");
        }, function() {
            $(this).removeClass("ui-state-active");
            $("#ws-content").addClass("collapsed");
        });
    },
    load: function(date) {
        if (this.isLoading_) {
            return;
        }
        this.isLoading_ = true;
        this.timer_.reset();
        NG.Events.fire(this, "loadstart");
        this.date_ = date;
        this.resetRefreshHistory_();
        var selectionItems;
        var persistentSelection = $.cookie("selection") || "";
        if (0 == persistentSelection.indexOf("*{0}*".format(this.date_.d))) {
            persistentSelection = persistentSelection.substring("*{0}*".format(this.date_.d).length);
            selectionItems = persistentSelection.split("_");
        } else {
            $.cookie("selection", null, {
                domain: gDomain
            });
        }
        if (this.isEverLoaded_) {
            NG.Events.removeGlobal("favoritetournamentsupdate", this.model_.sort, this.model_);
            NG.Events.remove(this.model_, "modelchanged", this.liveScores_.dataChanged);
            NG.Events.remove(this.model_, "modelsorted", this.liveScores_.dataChanged);
            NG.Events.remove(this, "statechanged", this.liveScores_.stateChanged);
            NG.Events.remove(this.model_, "modelchanged", this.scoreUpdates_.dataChanged);
            NG.Events.remove(this, "statechanged", this.scoreUpdates_.stateChanged);
            NG.Events.remove(this.liveScores_, "selectionchanged", this.scoreUpdates_.handleSelectionChanged);
            NG.Events.remove(this.liveScores_, "selectionchanged", this.selectionChanged_);
            NG.Events.remove(this.model_, "modelchanged", this.modelChanged_);
            this.liveScores_.dispose();
            this.scoreUpdates_.dispose();
        }
        this.handleViewEvent(this.state_ ? "all" : "default");
        this.model_ = new WS.LS.Model();
        NG.Events.addGlobal("favoritetournamentsupdate", this.model_.sort, this.model_);
        this.liveScores_ = new WS.LS.LiveScores(this.state_, selectionItems);
        NG.Events.add(this.model_, "modelchanged", this.liveScores_.dataChanged, this.liveScores_);
        NG.Events.add(this.model_, "modelsorted", this.liveScores_.dataChanged, this.liveScores_);
        NG.Events.add(this, "statechanged", this.liveScores_.stateChanged, this.liveScores_);
        this.scoreUpdates_ = new WS.LS.ScoreUpdates(this.state_, selectionItems);
        NG.Events.add(this.model_, "modelchanged", this.scoreUpdates_.dataChanged, this.scoreUpdates_);
        NG.Events.add(this, "statechanged", this.scoreUpdates_.stateChanged, this.scoreUpdates_);
        NG.Events.add(this.liveScores_, "selectionchanged", this.scoreUpdates_.handleSelectionChanged, this.scoreUpdates_);
        NG.Events.add(this.model_, "modelchanged", this.modelChanged_, this);
        NG.Events.add(this.liveScores_, "selectionchanged", this.selectionChanged_, this);
        this.isEverLoaded_ = true;
        DataStore.load("livescores", {
            parameters: this.date_,
            success: this.loadCallback_,
            error: this.errorCallback_,
            dataType: "array"
        }, this);
    },
    resetRefreshHistory_: function() {
        this.version_ = null;
        this.lastCompleteRefreshAt_ = new Date();
    },
    handleViewEvent: function(viewEvent) {
        var state = this.getState_(viewEvent);
        if (state) {
            if (this.applyState1_(state)) {
                NG.async(function() {
                    this.applyState2_(state);
                    NG.Events.fire(this, "statechanged", this.state_);
                }, this);
            }
        }
    },
    getState_: function(state) {
        var result;
        if ("all" == state) {
            result = {
                items: state,
                cssShow: [".ls-1", ".ls-2", ".ls-4", ".ls-3", ".ls-5", ".ls-6", ".ls-7", ".ls-s"],
                cssHide: []
            };
        } else {
            if ("live" == state) {
                result = {
                    items: state,
                    cssShow: [".ls-2", ".ls-3", ".ls-6", ".ls-7", ".ls-s"],
                    cssHide: [".ls-1", ".ls-4", ".ls-5"]
                };
            } else {
                if ("next" == state) {
                    result = {
                        items: state,
                        cssShow: [".ls-4", ".ls-5", ".ls-6", ".ls-7", ".ls-s"],
                        cssHide: [".ls-1", ".ls-2", ".ls-3"]
                    };
                } else {
                    if ("selected" == state) {
                        result = {
                            items: state,
                            cssShow: [".ls-1", ".ls-2", ".ls-4", ".ls-3", ".ls-5", ".ls-6", ".ls-7"],
                            cssHide: []
                        };
                    } else {
                        if ("grouped" == state) {
                            result = {
                                layout: state,
                                cssShow: [],
                                cssHide: [".ls-t"]
                            };
                        } else {
                            if ("sorted" == state) {
                                result = {
                                    layout: state,
                                    cssShow: [".ls-t"],
                                    cssHide: []
                                };
                            } else {
                                if ("default" == state) {
                                    result = {
                                        items: "all",
                                        layout: "grouped",
                                        cssShow: [".ls-1", ".ls-2", ".ls-4", ".ls-3", ".ls-5", ".ls-6", ".ls-7", ".ls-s"],
                                        cssHide: []
                                    };
                                }
                            }
                        }
                    }
                }
            }
        }
        if ("undefined" == typeof result) {
            throw "undefined state";
        }
        result = $.extend({}, this.state_ || {}, result);
        if ("grouped" == result.layout && "all" == result.items) {
            result.cssHide.push(".ls-th");
        } else {
            result.cssShow.push(".ls-th");
        }
        return result;
    },
    applyState1_: function(state) {
        if (!this.state_) {
            this.state_ = state;
            return true;
        }
        var itemStatusChanging = this.state_.items != state.items;
        if (itemStatusChanging) {
            var toSelectedItemState = ("selected" != this.state_.items) && ("selected" == state.items),
                fromSelectedItemState = ("selected" == this.state_.items) && ("selected" != state.items);
            if (toSelectedItemState) {
                $("#clear-selection-button").show();
            } else {
                if (fromSelectedItemState) {
                    $("#clear-selection-button").hide();
                }
            }
            $("#view-options a").removeClass("is-selected");
            $('#view-options a[href="#' + state.items + '"]').addClass("is-selected");
        }
        $("#livescores").removeClass(this.state_.items).addClass(state.items);
        this.state_ = $.extend(this.state_ || {}, state);
        return true;
    },
    applyState2_: function(state) {
        if (state.cssHide) {
            this.cssToggler_.hide(this.state_.cssHide);
        }
        if (state.cssShow) {
            this.cssToggler_.show(this.state_.cssShow);
        }
    },
    errorCallback_: function() {
        $("#results-message").show();
        this.setTimer_(this.defaultTimeout_);
        NG.Events.fire(this, "loadend");
        this.isLoading_ = false;
    },
    loadCallback_: function(options, data) {
        var returnCode = (NG.isArray(data[0])) ? data[0][0] : -1;
        if (0 != returnCode) {
            this.errorCallback_();
            return;
        }
        $("#results-message").hide();
        var responseVersion = data[0][1];
        if (null == this.version_) {
            this.version_ = responseVersion;
            this.model_.create(data);
        } else {
            if (this.version_ < responseVersion) {
                this.version_ = responseVersion;
                this.model_.update(data);
            }
        }
        $("#livescores .team-name").fitText({
            width: 150
        });
        NG.Events.fire(this, "loadend");
        this.isLoading_ = false;
        this.setTimer_(data[0][2]);
    },
    refresh_: function() {
        NG.Events.fire(this, "loadstart");
        var freshRefreshRequired = (this.freshLoadTimeout_ * 1000 < (new Date().valueOf() - (this.lastCompleteRefreshAt_ || 0)));
        if (freshRefreshRequired) {
            this.resetRefreshHistory_();
        }
        var options = (this.version_) ? $.extend({}, this.date_, {
            v: this.version_
        }) : this.date_;
        DataStore.load("livescores", {
            parameters: options,
            success: this.loadCallback_,
            error: this.errorCallback_,
            dataType: "array"
        }, this);
    },
    setTimer_: function(timeout) {
        if (timeout <= 0) {
            return;
        }
        this.timer_.set(timeout, function(seconds) {
            if (0 < seconds) {
                $("#countdown").html(this.getFriendlyRemainingTime_(seconds));
            } else {
                this.refresh_();
            }
        }, this);
    },
    getFriendlyRemainingTime_: function(seconds) {
        var result = "";
        if (seconds < 60) {
            result = "Refreshing in {0} seconds...".format(seconds);
        } else {
            if (seconds < 60 * 60) {
                result = "Matches start in {0} minutes".format((seconds / 60) >> 0);
            } else {
                if (seconds < 60 * 60 * 48) {
                    result = "Matches start in {0} hours {1} minutes".format((seconds / (60 * 60)) >> 0, ((seconds / 60) % 60) >> 0);
                }
            }
        }
        return result;
    },
    configureSoundAlert: function(playerUrl) {
        NG.Events.addGlobal("soundalertloaded", function() {
            var player = document.getElementById("player-obj-core"),
                levelMap = {
                    "5": 25,
                    "20": 50,
                    "50": 75,
                    "100": 100
                };
            NG.Events.addGlobal("scoresupdated", function() {
                player.alert();
            });
            var $volumeToggleButton = $("#volume-toggle-button");

            function volumeOn() {
                $volumeToggleButton.blur();
                $volumeToggleButton.addClass("ui-state-active").find("span").removeClass("ui-icon-volume-off").addClass("ui-icon-volume-on");
                $("#current-level").css("width", levelMap[player.getLevel()] + "%");
                player.toggleMute(false);
                $volumeToggleButton.data("is-on", true);
                return false;
            }

            function volumeOff() {
                $volumeToggleButton.blur();
                $volumeToggleButton.removeClass("ui-state-active").find("span").removeClass("ui-icon-volume-on").addClass("ui-icon-volume-off");
                $("#current-level").css("width", "0");
                player.toggleMute(true);
                $volumeToggleButton.data("is-on", false);
                return false;
            }

            function setVolume(level) {
                $("#current-level").css("width", levelMap[level] + "%");
                player.setLevel(level);
            }

            $volumeToggleButton.on("click", function() {
                if ($volumeToggleButton.data("is-on")) {
                    volumeOff();
                } else {
                    volumeOn();
                }
            });
            $("#volume-level").on("click", "a", function() {
                $this = $(this).blur();
                if (player.isMuted()) {
                    volumeOn();
                }
                setVolume(parseInt($this.text(), 10));
                return false;
            });
            $("#sound-config").on("click", ".themes dd a:nth-child(2)", function(e) {
                $this = $(this);
                player.playClip($this.attr("data-value"));
                return false;
            });
            $("#sound-config").on("click", ".themes dd a:nth-child(3)", function(e) {
                $this = $(this);
                player.setDefaultClip($this.attr("data-value"));
                $this.closest("dl").find("dd").removeClass("selected");
                $this.closest("dd").addClass("selected");
                return false;
            });
            setVolume(player.getLevel());
            if (!player.isMuted()) {
                $("#volume-toggle-button").trigger("click");
            }
            $("#sound-config dd:has(a[data-value=" + player.getActiveClipId() + "])").addClass("selected");
        });
        $("#player-obj").media({
            id: "player-obj-core",
            name: "player-obj-core",
            params: {
                allowScriptAccess: "always"
            },
            width: 1,
            height: 1,
            autoplay: false,
            src: playerUrl,
            caption: false
        });
    }
};
(function(WhoScored) {
    var news = {};
    WhoScored.news = news;
    news.bindNewsListEvents = function() {
        $(".target-language").change(function() {
            var url = $.trim($(this).val());
            if (url != "") {
                window.open(url);
            }
            return false;
        });
        $("#FilterTagId, #FilterLanguage").change(function() {
            $("#filterNews").submit();
        });
        $(".remove-tag").click(function() {
            var linkUrl = $(this).attr("href");
            $(this).parents(".removable-filter-criteria").animate({
                width: 0,
                opacity: 0
            }, function() {
                window.location = linkUrl;
            });
            return false;
        });
        $(".view-more").click(function() {
            toggleNewsAppearance($(this));
            return false;
        });
    };

    function toggleNewsAppearance($el) {
        $el.toggleClass("is-active");
        var $span = $el.find("span");
        $span.toggleClass("ui-icon-triangle-1-e");
        $span.toggleClass("ui-icon-triangle-1-s");
        $el.parents("li").find(".additional-info").slideToggle();
    }
})(WS);
WS = WS || {};
WS.Home = {};
WS.Home.IncidentManager = function() {
    var itemIdPrefix = "i",
        itemIdRegEx = new RegExp("{0}(\\d*)".format(itemIdPrefix)),
        visibleIncidents = {};
    this.toggle = function(button) {
        var itemId = $(button).parents("tr:first").attr("id").match(itemIdRegEx)[1];
        visibleIncidents[itemId] ? hide(itemId) : show(itemId);
    };

    function show(id) {
        var $tr = $("#" + itemIdPrefix + id).addClass("hasDetails");
        var $button = $tr.find(".show-incidents").addClass("ui-state-active").blur().find(".ui-icon").removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-s");
        $('tr[data-match-id="' + itemIdPrefix + id + '"]').show();
        visibleIncidents[id] = true;
    }

    function hide(id) {
        delete visibleIncidents[id];
        var $tr = $("#" + itemIdPrefix + id).removeClass("hasDetails");
        var $button = $tr.find(".show-incidents").removeClass("ui-state-active").blur().find(".ui-icon").removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e");
        $('tr[data-match-id="' + itemIdPrefix + id + '"]').hide();
    }
};
WS = WS || {};
WS.Comments = function($) {
    return {
        init: function() {
            $(".comments-textarea").each(function() {
                var $this = $(this),
                    limit = parseInt($this.attr("maxlength"), 10);
                $(".comments-post-count").html(limit + " characters remaining");
                $this.bind("keyup", function() {
                    var value = $this.val();
                    if (limit <= $this.val().length) {
                        $this.val(value.substr(0, limit));
                    }
                    $(".comments-post-count").html((limit - $this.val().length) + " characters remaining");
                });
            });
            $("#comments-post-form").removeAttr("onsubmit").submit(function() {
                if (0 == $(".comments-textarea").val().length) {
                    $(".comments-post-result").html("Please enter a comment to post.");
                    return false;
                }
                var $form = $(this);
                $(".comments-post-result").html("");
                $form.find(".post-comment").attr("disabled", true);
                $form.find(".post-comment").val("Posting..");
                $.ajax({
                    type: "POST",
                    url: "/Comments/",
                    cache: false,
                    data: $form.serialize(),
                    dataType: "json",
                    success: function(json) {
                        if (0 == json.ReturnCode) {
                            var $newComment = getNewCommentElementFromServerResponseData(json.Data);
                            $(".comments-list").prepend($newComment);
                            $form.find(".comments-textarea").val("").trigger("keyup");
                        } else {
                            if (-1 == json.ReturnCode) {
                                $(".comments-post-result").html("Please sign in to post comments.");
                            } else {
                                $(".comments-post-result").html(jsn.oMessage);
                            }
                        }
                    },
                    error: function() {
                        $(".comments-post-result").html("Error in posting your comment, please try again later.");
                    },
                    complete: function() {
                        $form.find(".post-comment").attr("disabled", false);
                        $form.find(".post-comment").val("Post");
                    }
                });
                return false;
            });

            function rateComment($comment, ratingCount, rating, callback) {
                var $ratingCount = $comment.find(ratingCount);
                $.ajax({
                    type: "POST",
                    url: "/Comments/" + $comment.attr("data-comment-id") + "/Rate",
                    cache: false,
                    data: {
                        rating: rating
                    },
                    dataType: "json",
                    success: function(json) {
                        if (0 == json.ReturnCode) {
                            callback($comment, $ratingCount);
                        } else {
                            if (-1 == json.ReturnCode) {
                                $comment.find(".authentication-message").show();
                            }
                        }
                    },
                    error: function(json) {
                        $ratingCount.replaceWith('<span class="error">Error in rating this comment, please try again later.</span>');
                    }
                });
            }

            $(".comment .rate-positive").click(function(e) {
                e.preventDefault();
                var $this = $(this);
                rateComment($("#comment-" + $(this).attr("data-comment-id")), ".rating-positive", 1, function($comment, $ratingCount) {
                    $this.addClass("done");
                    $ratingCount.addClass("rated").html("+" + ((parseInt($ratingCount.html(), 10) || 0) + 1));
                });
            });
            $(".comment .rate-negative").click(function(e) {
                e.preventDefault();
                var $this = $(this);
                rateComment($("#comment-" + $(this).attr("data-comment-id")), ".rating-negative", -1, function($comment, $ratingCount) {
                    $this.addClass("done");
                    $ratingCount.addClass("rated").html((parseInt($ratingCount.html(), 10) || 0) - 1);
                });
            });
            $(".comment .report").click(function(e) {
                e.preventDefault();
                var $this = $(this),
                    $comment = $("#comment-" + $(this).attr("data-comment-id"));
                $.ajax({
                    type: "POST",
                    url: "/Comments/" + $comment.attr("data-comment-id") + "/Report",
                    cache: false,
                    dataType: "json",
                    success: function(json) {
                        if (0 == json.ReturnCode) {
                            $this.addClass("done").html("Reported");
                        } else {
                            if (-1 == json.ReturnCode) {
                                $comment.find(".authentication-message").show();
                            }
                        }
                    },
                    error: function(json) {
                        $this.after('<span class="error">Error in reporting this comment, please try again later.</span>');
                    }
                });
            });
            $(".expand,.collapse").click(function(e) {
                e.preventDefault();
                var commentToToggleId = $(this).attr("data-comment-id");
                var willShow = $(this).attr("class").indexOf("collapse") < 0;
                var commentToToggleIds = [];
                commentToToggleIds[0] = commentToToggleId;
                var numberOfChildrensToHide = $('li[data-reply-to-id="' + commentToToggleId + '"]').length;
                toggleExpandCollapseButtonHTML(commentToToggleId, willShow, numberOfChildrensToHide);
                toggleCommentContent(commentToToggleId, willShow);
                toggleCommentAndItsChildren(commentToToggleIds, willShow);
            });

            function toggleCommentContent(commentId, willShow) {
                $("#comment-" + commentId + "-content").toggle(willShow);
                $("#comment-" + commentId + "-controls").toggle(willShow);
            }

            function toggleExpandCollapseButtonHTML(commentId, willShow, numberOfChildrensToHide) {
                var $button = $("#comment-" + commentId + "-toggleButton");
                var numberOfCommentsToHide = numberOfChildrensToHide + 1;
                if (!willShow) {
                    $button.html(numberOfChildrensToHide ? "[ +" + numberOfCommentsToHide + " ]" : "[ + ]");
                    $button.addClass("expand");
                    $button.removeClass("collapse");
                } else {
                    $button.html("[ - ]");
                    $button.removeClass("expand");
                    $button.addClass("collapse");
                }
            }

            function toggleCommentAndItsChildren(toggledCommentIds, willShow) {
                for (var i = 0; i < toggledCommentIds.length; i++) {
                    $("li[data-reply-to-id=" + toggledCommentIds[i] + "]").each(function() {
                        $(this).toggle(willShow);
                        var toggledCommentId = $(this).attr("data-comment-id");
                        toggledCommentIds[i] = null;
                        toggleExpandCollapseButtonHTML(toggledCommentId, willShow);
                        toggleCommentContent(toggledCommentId, willShow);
                        if (toggledCommentIds.indexOf(toggledCommentId) < 0) {
                            toggledCommentIds.push(toggledCommentId);
                            toggleCommentAndItsChildren(toggledCommentIds, willShow);
                        }
                    });
                }
            }

            function getNewCommentElementFromServerResponseData(jsonData) {
                var newCommentHTML = jsonData;
                var $newComment = $(newCommentHTML);
                $newComment.removeClass("striped");
                $newComment.css("background-color", "#FFFDD6");
                $newComment.find("[data-display-for-only-existing]").hide();
                return $newComment;
            }

            $(".reply").click(function(e) {
                e.preventDefault();
                var replyToId = $(this).attr("data-comment-id");
                var parentCommentLiElement = $("#comment-" + replyToId);
                var entityId = $("input[name=entityId]").val();
                var replyElementUniqueId = Date.now();
                var parentCommentDepth = $("#comment-" + replyToId + "-depth").val();
                var maxDepth = 1;
                var marginLeft = parentCommentDepth >= maxDepth ? (maxDepth * 2) : parentCommentDepth + 2;
                var $div = $('<div id="comment-div-reply-to-' + replyElementUniqueId + '" style="margin-left: ' + marginLeft + 'em; position: relative"></div>');
                var $form = $('<form id="comment-form-reply-to-' + replyElementUniqueId + '"></form>');
                $form.append('<input type="hidden" name="replyToId" value="' + replyToId + '">');
                $form.append('<textarea id="comment-' + replyElementUniqueId + '-text" name="commentText" class="comments-textarea" style="width:99%" maxlength="1000"></textarea>');
                $form.append('<input type="hidden" name="entityId" value="' + entityId + '">');
                $form.append('<button id="replyToButton' + replyElementUniqueId + '" type="button" class="post-comment">Post</button>');
                $form.append('<span class="comments-post-result-' + replyElementUniqueId + '"></span>');
                $div.append($form);
                var $closeButton = $('<div id="comment-' + replyElementUniqueId + '-close-button" class="comment-close-button" style="position: absolute; top: 0.5em; right: 0.5em;" > x </div>');
                $div.append($closeButton);
                parentCommentLiElement.append($div);
                $("#comment-" + replyElementUniqueId + "-text").val("@" + $("#comment-" + replyToId + "-author").text() + " ");
                var commentText = $("#comment-" + replyElementUniqueId + "-text").val();
                $("#comment-" + replyElementUniqueId + "-text").focus().val("").val(commentText);
                $("#replyToButton" + replyElementUniqueId).on("click", function(e) {
                    $form.find(".post-comment").attr("disabled", true);
                    $(this).html("Posting..");
                    var postButton = $(this);
                    $.ajax({
                        type: "POST",
                        url: "/Comments/" + replyToId + "/Reply",
                        cache: false,
                        data: $form.serialize(),
                        dataType: "json",
                        success: function(json) {
                            if (0 == json.ReturnCode) {
                                var $newComment = getNewCommentElementFromServerResponseData(json.Data);
                                $(".comments-post-result-" + replyElementUniqueId).html("Success");
                                $div.prepend($newComment);
                                $form.hide();
                                $closeButton.hide();
                            } else {
                                if (-1 == json.ReturnCode) {
                                    postButton.html("Post");
                                    $(".comments-post-result-" + replyElementUniqueId).html(" Please " + '<a href="/Accounts/Login" target="_blank" style="border-radius: 3px;padding: 3px;font-weight: bold;color: #fff;background-color: #a6df58;">Sign In</a> or ' + '<a href="/Accounts/Register" target="_blank" style="border-radius: 3px;padding: 3px;font-weight: bold;color: #fff;background-color: #ee4500;">Join Us</a> to comment!');
                                } else {
                                    $(".comments-post-result-" + replyElementUniqueId).html(json.Message);
                                }
                            }
                        },
                        error: function() {
                            $(".comments-post-result-" + replyElementUniqueId).html("Error in posting your comment, please try again later.");
                        },
                        complete: function() {
                            postButton.attr("disabled", false);
                        }
                    });
                });
                $("#comment-" + replyElementUniqueId + "-close-button").on("click", function(e) {
                    $("#comment-div-reply-to-" + replyElementUniqueId).hide();
                });
            });
        }
    };
}(jQuery);