function SpeechBubble(text, type)
{
    // $('.speech-bubble').html(text);
    $('.speech-bubble').toggleClass('hide');
    // var type_bubble = document.getElementsByClassName('speech-bubble')[0];

    // var typewriter = new Typewriter(type_bubble, {
    //     loop: false
    // });

    typewriter_actions = [{speed: 10}];//10
    for (var i = 0; i < text.length; i++) {
        typewriter_actions.push({type: text[i]});
        typewriter_actions.push({delay: 2000});//2000
        typewriter_actions.push({remove: {num: text[i].length, type: 'whole'}});
    }
    typewriter_actions.pop();
    // typewriter.start();
    // return true;

    $('.speech-bubble')
        .on('typewriteTyped', function (event, data) {
        if(data==text[text.length - 1]){
            if(type=='intro')
                login();
            if(type=='signedin')
                signedin(true);
        }
    }).typewrite({
            actions: typewriter_actions
        });
    return true;
}
