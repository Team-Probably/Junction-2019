class Main {
	constructor() {
		
		this.stage = new PIXI.Container();
		this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { view: document.getElementById("game-canvas") });
		this.scrollSpeed = 0;
		this.loadSpriteSheet();
		this.wallsmoving = false;
		this.animatedSprite = this.getAnimatedSprite();
		this.playAnimatedSprite(this.animatedSprite);

		this.boy = this.createBoy();



	}
	update() {
		this.scroller.moveViewportXBy(this.scrollSpeed);
		document.getElementById("mvforward").onmousedown =  () => {
			this.scrollSpeed = 10;
			this.move = 100 * this.scrollSpeed;
			this.wallsmoving = true;
		};
		if (this.move == 0) {
			this.scrollSpeed = 0;
			this.wallsmoving = false;

		} else {
			this.move -= this.scrollSpeed;
		}
		this.renderer.render(this.stage);
		

		
		this.stage.removeChild(this.animatedSprite);
		this.stage.removeChild(this.boy);
		if(this.wallsmoving)
			this.stage.addChild(this.animatedSprite);
		else
			this.stage.addChild(this.boy);
		
		
		
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

	getAnimatedSprite()
	{
		let textureArray = [];

		for (let i=0; i < 15; i++)
		{
			let texture = PIXI.Texture.from(`/png/Walk (${i+1}).png`);
			textureArray.push(texture);
		};

		var animatedSprite = new PIXI.extras.AnimatedSprite(textureArray);

		return animatedSprite;
	}

	playAnimatedSprite(animatedSprite)
	{
		animatedSprite.x = 100;
		animatedSprite.y = MapBuilder.WALL_HEIGHTS[0] + 50;
		animatedSprite.anchor.set(0, 1);
		animatedSprite.animationSpeed = 0.2;
		animatedSprite.scale.x = 0.5;
		animatedSprite.scale.y = 0.5;
		animatedSprite.play();
		
	}

	createBoy()
	{
		let boy = PIXI.Sprite.from('/png/Idle (1).png');
		boy.scale.x = 0.5;
		boy.scale.y = 0.5;
		boy.anchor.set(0, 1);
		boy.x = 100;
		//console.log(boy.height);
		boy.y = MapBuilder.WALL_HEIGHTS[0] + 50;

		return boy;
	}
}
