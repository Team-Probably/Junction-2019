function Button(text, origin , width, height, onClick)
{

    this.container = new PIXI.Container();
    var padding = {x: 20, y: 20};
    
    // var origin = {x: 150, y: 200};

    var textureButton = PIXI.Texture.fromImage('/png/UI/PNG/blue_button07.png');
    var textureButtonDown = PIXI.Texture.fromImage('/png/UI/PNG/blue_button08.png');
    var textureButtonOver = PIXI.Texture.fromImage('/png/UI/PNG/blue_button07.png');

    var tx = new PIXI.Text(text, {font: '30px sans-serif', fill: 0xffffff, align: 'center', wordWrap: true, wordWrapWidth: 200});
    tx.position = {x: origin.x + padding.x, y: origin.y + padding.y};
    tx.anchor.set(0, 0);

    var noop = function () {
        console.log('click');
    };


    var button = new PIXI.Sprite(textureButton);
    button.buttonMode = true;

    button.anchor.set(0);

    button.position = {x: origin.x, y: origin.y};
    button.width = width;
    button.height = height;

    // make the button interactive...
    button.interactive = true;
	
	

    button
        // set the mousedown and touchstart callback...
        .on('mousedown', onButtonDown)
        .on('touchstart', onButtonDown)

        // set the mouseup and touchend callback...
        .on('mouseup', onButtonUp)
        .on('touchend', onButtonUp)
        .on('mouseupoutside', onButtonUp)
        .on('touchendoutside', onButtonUp)

        // set the mouseover callback...
        .on('mouseover', onButtonOver)

        // set the mouseout callback...
        .on('mouseout', onButtonOut)


        // you can also listen to click and tap events :
        //.on('click', noop)
        
	button.tap = onClick;
	button.click = onClick;
    // add it to the stage
    //stage.addChild(button);

    // add button to array
    //buttons.push(button);





    function onButtonDown()
    {
        this.isdown = true;
        this.texture = textureButtonDown;
        this.alpha = 1;
    }

    function onButtonUp()
    {
        this.isdown = false;

        if (this.isOver)
        {
            this.texture = textureButtonOver;
        }
        else
        {
            this.texture = textureButton;
        }
    }

    function onButtonOver()
    {
        this.isOver = true;

        if (this.isdown)
        {
            return;
        }

        this.texture = textureButtonOver;
    }

    function onButtonOut()
    {
        this.isOver = false;

        if (this.isdown)
        {
            return;
        }

        this.texture = textureButton;
    }
    this.container.addChild(button);
    this.container.addChild(tx);
    return this.container;
}