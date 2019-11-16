class Main {
	constructor() {
		this.stage = new PIXI.Container();
		this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { view: document.getElementById("game-canvas") });
		this.scrollSpeed = 0;
		this.loadSpriteSheet();
	}
	update() {
		this.scroller.moveViewportXBy(this.scrollSpeed);
		document.getElementById("mvforward").onmousedown =  () => {
			this.scrollSpeed = 10;
			this.move = 100 * this.scrollSpeed;
		};
		if (this.move == 0) {
			this.scrollSpeed = 0;

		} else {
			this.move -= this.scrollSpeed;
		}
		this.renderer.render(this.stage);
		requestAnimationFrame(this.update.bind(this));
	}
	loadSpriteSheet() {
		var loader = PIXI.loader;
		loader.add("wall", "resources/wall.json");
		loader.once("complete", this.spriteSheetLoaded.bind(this));
		loader.load();
	}
	spriteSheetLoaded() {
		this.scroller = new Scroller(this.stage);
		requestAnimationFrame(this.update.bind(this));
	}
}
