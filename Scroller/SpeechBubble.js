function SpeechBubble(text)
{
    this.container = new PIXI.Container();
    var padding = {x: 20, y: 10};
    var radius = 20;
    var origin = {x: 150, y: 200};
    var tx = new PIXI.Text(text, {font: '30px sans-serif', fill: 0x000000, align: 'left', wordWrap: true, wordWrapWidth: 200});
    tx.position = {x: origin.x+padding.x, y: origin.y-padding.y};
    tx.anchor.set(0, 1);

    // backdrop
    var textbg = new PIXI.Graphics();
    textbg.beginFill(0xFFFFFF, 1);
    textbg.drawRoundedRect(origin.x, origin.y-(tx.height+2*padding.y), tx.width+2*padding.x, tx.height+2*padding.y, radius);
    textbg.endFill();

    // Add both to the stage
    this.container.addChild(textbg);
    this.container.addChild(tx);
    
    return this.container;
}