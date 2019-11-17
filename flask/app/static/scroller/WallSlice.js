function WallSlice(type, y) {
	this.type   = type;
	this.y      = y;
	this.sprite = null;
}

function getDivisionSize(width){
	division = [{
		screen: 800,
		width: 40
	},
	{
		screen: 1500,
		width: 70
	},
	{
		screen: 2000,
		width: 100
	},
	{
		screen: 4000,
		width: 180
	},
	{
		screen: 6000,
		width: 250
	},
	]
	for (var i=0; i<division.length-1; i++){
		if (width <= division[i].screen){
			WallSlice.WIDTH = division[i].width;
			WallSlice.HEIGHT = (256/64) * division[i].width;
			break
		}
	};
	// console.log([WallSlice.WIDTH, WallSlice.HEIGHT]);
	return [WallSlice.WIDTH, WallSlice.HEIGHT];

}

getDivisionSize(window.innerWidth);