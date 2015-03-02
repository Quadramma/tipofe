$.canvas = {
	_updtFns: [],
	update: function() {
		for (var x in $.canvas._updtFns) {
			$.canvas._updtFns[x]();
		}
	},
	create: function(id) {
		var $canvas = $.create('canvas' + id).appendTo($('body'));
		this.ctx = $canvas.first().getContext('2d');
		this.elem = $canvas.first();
		$.on(window, 'resize', function() {
			$.canvas.update();
		});
		this.fullscreen();
	},
	fullscreen: function() {
		var fnResize = function() {
			var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
			var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
			$('canvas').att(({
				'height': h,
				'width': w
			}));
		};
		fnResize();
		$.canvas._updtFns.push(fnResize);
	},
	preloadImages: function(srcArr, fn) {
		var images = {};
		var interval = setInterval(function() {
			var length = 0;
			for (var i in images) {
				length++;
			}

			if (length == srcArr.length) {

				clearInterval(interval);
				fn(images);
			}
		}, 1000);
		for (var x in srcArr) {
			(function() {
				var srcDef = srcArr[x];
				var image = new Image();
				image.onload = function() {
					images[srcDef[0]] = image;
				};
				image.src = srcDef[1]
			})();
		}
	}

}

$.screen = {
	bounds: function() {
		var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		return {
			w: w,
			h: h
		};
	}
}