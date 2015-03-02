$.game = {
	rnd: new Nonsense(),
	grid: {
		xW: 0,
		xH: 0,
		draw: function(p) {
			var c = $.canvas.ctx;
			var x = 0,
				w = $.canvas.elem.width,
				h = $.canvas.elem.height,
				pw = p.w;
			c.beginPath();

			var r = (w / (w / pw)) + 0.5 | 0;
			this.xW = w / r;
			for (x = 0; x <= w; x += this.xW) {
				c.moveTo(x, 0);
				c.lineTo(x, h);
			}
			r = (h / (h / pw)) + 0.5 | 0;
			this.xH = h / r;
			for (x = 0; x <= h; x += this.xH) {
				c.moveTo(0, x);
				c.lineTo(w, x);
			}
			c.stroke();
			return this;
		},
		point: function(x, y) {
			return {
				x: x * this.xW - this.xW / 2,
				y: y * this.xH - this.xH / 2
			};
		}
	},
	player: {
		entities: []
	},
	currentMatch: null,
	ia: [],
	match: [],
	colors: {
		BLUE: 1,
		RED: 2,
		WHITE: 3,
		BLACK: 4,
		YELLOW: 5,
		GREEN: 6
	},
	start: function(c, n) {
		console.log('game.start');
		//show popup to choice a color
		this.currentMatch = {};
		this.match.push(this.currentMatch);
		this.choseColor(c);
		this.choseIa(n);
		$.canvas.update()
		console.info(this.currentMatch);
		console.info(this.ia);
	},
	choseColor: function(c) {
		this.currentMatch.color = c;
		//show popup to choice number of ia
	},
	choseIa: function(n) {
		var self = this;
		this.currentMatch.numberOfIa = n;
		this.currentMatch._colors = {};
		for (var x in this.colors) {
			if (this.colors[x] == this.currentMatch.color) {
				this.currentMatch._colors[x] = true;
			} else {
				this.currentMatch._colors[x] = false;
			}
		}

		//Math.floor(Math.random() * (max - min + 1)) + min;
		for (var x = 0; x < n; x++) {
			$.game.ia.push({
				name: self.rnd.firstName(),
				color: (function() {
					for (var x in self.currentMatch._colors) {
						if (self.currentMatch._colors[x] == false) {
							self.currentMatch._colors[x] = true;
							return self.colors[x];
						}
					}
				})()
			})
		}
	},
	entities: {
		pool: []
	}
};