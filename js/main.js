//ctx.fillStyle = "rgba(0,0,0,.5)";
//ctx.fillRect(0, 0, c.value[0].clientWidth, c.value[0].clientHeight);
$.canvas.preloadImages([
	['city', 'img/citybg2.png'],
	['bg', 'img/bg1.jpg']
], function(r) {
	$.canvas.create('#myCanvas');
	var img = r['city'];
	//$.canvas.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 64, 64);
	$.canvas._updtFns.push(function() {
		$.canvas.ctx.beginPath();
		$.game.grid.draw({
			w: 10
		});
		for (var x in $.game.entities.pool) {
			var o = $.game.entities.pool[x];
			if (o.active) {
				$.game.entities[o.type].draw(o);
			}
		}
	});
	//INTRO
	//START
	$.game.start($.game.colors.BLACK, 1);
});