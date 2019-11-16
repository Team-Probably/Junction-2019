function InputField(placeholder, origin) {
    var pixiInput = new PIXI.TextInput({
        input: {
            fontSize: '25pt',
            padding: '14px',
            width: '500px',
            color: '#26272E'
        }, 
        box: {fill: 0xE8E9F3, rounded: 16, stroke: {color: 0xCBCEE0, width: 4}}
    })

    pixiInput.x = origin.x;
    pixiInput.y = origin.y;
    pixiInput.placeholder = placeholder;

    return pixiInput;

        

}