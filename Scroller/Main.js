var screenHeight = window.innerHeight;
var screenWidth = window.innerWidth;
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

		this.scene = -1;
		this.dialogues = [{
			'type': 'intro',
			'dialogue': 'Let\'s Learn something'
		}, {
			'type': 'intro',
			'dialogue': 'YAYAYAYAYAY'
		}
		]

		
		SpeechBubble([
			'Hey! <br> Welcome to CyberSafe. I am your friend ScriptKiddie',
			'Do you find the world of internet amusing? Accessing tons of websites, emails daily.',
			'Ever wondered how safe the internet is?',
			'Before getting to the fun stuff, let\'s begin by signing you up'
		],login);
		
		// this.button = Button('PLAY', {x: 350, y: 200}, 200, 100, ()=>{
		// 		this.moveforward();
		// 	});
		this.stage.addChild(this.button);

	}

	getScene() {
		if (this.dialogues[this.scene].type == 'intro') {
			this.button = Button('NEXT', {x: 350, y: 200}, 200, 100, ()=>{
					this.moveforward();
				});
			this.stage.addChild(this.button);		
			SpeechBubble([this.dialogues[this.scene].dialogue]);
		}
		if (this.dialogues[this.scene].type == 'signup') {

		}
	}

	moveforward() {
		this.scrollSpeed = 10;
		this.move = 100 * this.scrollSpeed;
		this.wallsmoving = true;
		this.stage.removeChild(this.button);
		$('.speech-bubble').toggleClass('hide');
		this.scene ++;
	}
	
	update() {
		this.scroller.moveViewportXBy(this.scrollSpeed);
		if (this.move == 0 && this.wallsmoving==true) {
			this.scrollSpeed = 0;
			this.wallsmoving = false;
			this.getScene();
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
		
		//move everything 
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

	getAnimatedSprite() {
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
		console.log(animatedSprite.width + ' '+ animatedSprite.height)
		animatedSprite.y = screenHeight - getDivisionSize(screenWidth)[1]*0.6;
		console.log(screenWidth+' '+'yyy '+animatedSprite.y+' '+screenHeight+' '+getDivisionSize(screenWidth)[1]*0.6+ ' '+ getDivisionSize(screenWidth))
		animatedSprite.anchor.set(0, 1);
		animatedSprite.animationSpeed = 0.5;
		animatedSprite.scale.x = (0.25*screenWidth)/614;
		animatedSprite.scale.y = (0.20*screenWidth)/564;
		animatedSprite.play();
	}

	createBoy()
	{
		let boy = PIXI.Sprite.from('/png/Idle (1).png');
		boy.scale.x = (0.25*screenWidth)/614;
		boy.scale.y = (0.20*screenWidth)/564;
		boy.anchor.set(0, 1);
		boy.x = 100;
		boy.y = screenHeight - getDivisionSize(screenWidth)[1]*0.6;

		return boy;
	}

	getScenePos()
	{
		return this.scroller.getViewportX() / 1000;

	}
}
