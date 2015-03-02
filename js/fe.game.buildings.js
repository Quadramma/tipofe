$.game.hq = {
	create: function() {
		return {
			team: '',
			x: 0,
			y: 0,
			type: 'hq',
			active: true
		};
	},
	draw: function(o) {
		var p = game.grid.point(o.x, o.y);
		$.canvas.ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI, false);
		$.canvas.ctx.fillStyle = 'white';
		$.canvas.ctx.fill();
		$.canvas.ctx.lineWidth = 5;
		$.canvas.ctx.strokeStyle = '#003300';
		$.canvas.ctx.stroke();
	}
};