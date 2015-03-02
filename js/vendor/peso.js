(function() {
	var e, t, n;
	n = document, t = function() {
		function e(e, t, s) {
			var l, p, a, c, f;
			if (null == t && (t = {}), e.nodeType) return void(this.e = e);
			if ("" === e) return void(this.e = n.createTextNode(t));
			if ("string" == typeof t && (s || (s = {}), s.text = t, t = s), this.e = n.createElement(o(e, t)), t["class"] && (this.e.className = i(t["class"])) && delete t["class"], t.text && (this.e.innerText = i(t.text)) && delete t.text, t.html && (this.e.innerHTML = i(t.html)) && delete t.html, t.css && (c = this.e.style) && (l = t.css) && delete t.css)
				for (a in l) f = l[a], null != f && (c[a] = f);
			r(t);
			for (p in t) f = t[p], this.e.setAttribute(p, f)
		}
		var t, r, i, o;
		return r = function(e) {
			var t, n, r, i;
			for (t in e)
				if (n = e[t], "object" == typeof e[t]) {
					for (r in n) i = n[r], e[t + "-" + r.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()] = i;
					delete e[t]
				}
		}, t = /[.#]/, o = function(e, n) {
			var r, i, o, s, l, p, a;
			if (!t.test(e)) return e;
			for (n["class"] || (n["class"] = []), "string" == typeof n["class"] && (n["class"] = [n["class"]]), t.test(e.charAt(0)) && (e = "div" + e), s = e.split(t), i = s.shift(), l = i.length, r = n["class"], p = 0, a = s.length; a > p; p++) o = s[p], "#" === e.charAt(l) ? n.id = o : r.push(o), l += o.length + 1;
			return n["class"].length || delete n["class"], i
		}, i = function(e) {
			var t, n, r;
			if ("object" != typeof e) return e;
			for (r = [], t = -1, n = e.length; ++t < n;) e[t] && r.push(e[t]);
			return r.join(" ")
		}, e.prototype.append = function() {
			var e, t, n, r;
			e = arguments, e && e[0] && "splice" in e[0] && (e = e[0]);
			for (n = 0, r = e.length; r > n; n++) t = e[n], t && ("_brew" in t && (t = t.dom()), this.e.appendChild(t));
			return this
		}, e.prototype.prepend = function() {
			var e, t, n, r;
			e = arguments, e && e[0] && "splice" in e[0] && (e = e[0]);
			for (n = 0, r = e.length; r > n; n++) t = e[n], t && ("_brew" in t && (t = t.dom()), this.e.insertBefore(t, this.e.firstChild));
			return this
		}, e.prototype.dom = function() {
			return this.e
		}, e.prototype.html = function() {
			var e;
			return e = n.createElement("div"), e.appendChild(this.e), e.innerHTML
		}, e
	}(), t.prototype.asDOM = t.prototype.dom, t.prototype.asHTML = t.prototype.html, t.prototype._brew = 1, this.DOMBrew = e = function() {
		var e, r, i, o, s, l;
		if (e = arguments, "object" == typeof e[0] && "splice" in e[0] ? o = e[0] : e.length > 1 && "object" == typeof e[1] && "_brew" in e[1] && (o = e), o) {
			for (r = n.createDocumentFragment(), s = 0, l = o.length; l > s; s++) i = o[s], r.appendChild(i.e ? i.e : i);
			e = [r]
		}
		return new t(e[0], e[1], e[2])
	}, e.text = function(e) {
		return new t("", e)
	}, e.VERSION = e.version = "1.5.0", "Microsoft Internet Explorer" !== navigator.appName && !("innerText" in HTMLElement.prototype) && "__defineGetter__" in HTMLElement && (HTMLElement.prototype.__defineGetter__("innerText", function() {
		return this.textContent
	}), HTMLElement.prototype.__defineSetter__("innerText", function(e) {
		return this.textContent = e
	}))
}).call(this);
var $ = function(a) {
	var obj = {
		select: function(a) {
			this.value = Array.prototype.slice.call(document.querySelectorAll(a));
			return this
		},
		each: function(fn) {
			for (var x in this.value) {
				fn(this.value[x], this);
			}
		},
		append: function(elem) {
			this.each(function(e, ctx) {
				e.appendChild(elem);
			});
			return this;
		},
		appendTo: function(target) {
			this.each(function(e, c) {
				target.each(function(a, d) {
					a.appendChild(e);
				});
			});
			return this;
		},
		prepend: function() {
			this.each(function(e, ctx) {
				e.insertBefore(elem, e.firstChild);
			});
			return this;
		},
		prependTo: function(target) {
			this.each(function(e, c) {
				target.each(function(a, d) {
					a.insertBefore(e, a.firstChild);
				});
			});
			return this;
		},
		css: function(a) {
			this.each(function(e, ctx) {
				e.style.cssText = a.toString().replace(',', '');
			});
			return this
		},
		att: function(a) {
			this.each(function(e, ctx) {
				for (var n in a) {
					e.setAttribute(n, a[n]);
				}

			});
			return this
		},
		first: function() {
			return this.value[0];
		},
		off: function(event, fn) {
			var self = this;
			for (var x in this.value) {
				var c = this.value[x];
				self._on(c, event, fn);
				if (c.removeEventListener) {
					c.removeEventListener(event, fn);
				} else if (c.detachEvent) {
					c.detachEvent('on' + event, fn);
				}
			}
			return this
		},
		on: function(event, fn) {
			var self = this;
			for (var x in this.value) {
				$.on(this.value[x], event, fn);
			}
			return this
		}
	};
	for (var x in $.fn) {
		obj[x] = $.fn[x];
	}
	return obj.select(a);
}
$.fn = {};
$.on = function(elem, event, fn) {
	function listenHandler(e) {
		var ret = fn.apply(this, arguments);
		if (ret === false) {
			e.stopPropagation();
			e.preventDefault();
		}
		return (ret);
	}

	function attachHandler() {
		var ret = fn.call(elem, window.event);
		if (ret === false) {
			window.event.returnValue = false;
			window.event.cancelBubble = true;
		}
		return (ret);
	}
	if (elem.addEventListener) {
		elem.addEventListener(event, listenHandler, false);
	} else {
		elem.attachEvent("on" + event, attachHandler);
	}
};
$.create = function(selector) {
	var brew = DOMBrew(selector);
	var dom = brew.dom();
	var local$ = $();
	local$.value = [dom];
	return local$;
};