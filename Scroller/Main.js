var screenHeight = window.innerHeight;
var screenWidth = window.innerWidth;
var scene = "intro";
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

		this.scene = "intro";
		this.SpeechBubble(speech[this.scene]['dialogues'], this.scene);
	}

	getScene() {
		this.SpeechBubble(speech[this.scene]['dialogues'], this.scene);	
	}

	changeScene() {
		this.scene = speech[this.scene]['next'];
		this.moveforward();
	}
	
	moveforward() {
		this.scrollSpeed = 10;
		this.move = 100 * this.scrollSpeed;
		this.wallsmoving = true;
	}
		
	login() {
		$('.login-modal').toggleClass('hide');
		$('.login-modal').on('click', () =>
		{
			console.log('login clicked');
			$('.speech-bubble').toggleClass('hide');
			$('.login-modal').toggleClass('hide');
			this.changeScene();
		});
	}

	signedin(status) {
		$('.info-cards').toggleClass('hide');
		console.log("hello");
	}

	SpeechBubble(text, scene){
		$('.speech-bubble').toggleClass('hide');

		let typewriter_actions = [{speed: 100}];//10
		for (var i = 0; i < text.length; i++) {
			typewriter_actions.push({type: text[i]});
			typewriter_actions.push({delay: 20});//2000
			typewriter_actions.push({remove: {num: text[i].length, type: 'whole'}});
		}
		typewriter_actions.pop();
		
		$('.speech-bubble')
			.on('typewriteTyped', (event, data) => {
			if(data==text[text.length - 1]){
				console.log("Speech completed", scene);
				if(scene=='intro')
					this.login();
				if(scene=='signedin')
					this.signedin(true);
			}
		}).typewrite({
				actions: typewriter_actions
			});
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
