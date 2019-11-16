function SpeechBubble(text)
{
    // $('.speech-bubble').html(text);
    $('.speech-bubble').toggleClass('hide');
    // var type_bubble = document.getElementsByClassName('speech-bubble')[0];

    // var typewriter = new Typewriter(type_bubble, {
    //     loop: false
    // });
    
    typewriter_actions = [{speed: 100}];//10
    for (var i = 0; i < text.length; i++) {
        typewriter_actions.push({type: text[i]});
        typewriter_actions.push({delay: 20});//2000
        typewriter_actions.push({remove: {num: text[i].length, type: 'whole'}});
    }
    typewriter_actions.pop();
    // typewriter.start();
    // return true;
    
    $('.speech-bubble')
        .on('typewriteTyped', function (event, data) {
        if(data==text[text.length - 1]){
            console.log('typewrite has typed', data);
            login();
        }
    }).typewrite({
            actions: typewriter_actions
        });

}

function signedin(text)
{
    // $('.speech-bubble').html(text);
    // var type_bubble = document.getElementsByClassName('speech-bubble')[0];

    // var typewriter = new Typewriter(type_bubble, {
    //     loop: false
    // });
    
    typewriter_actions = [{speed: 100}];//10
    for (var i = 0; i < text.length; i++) {
        typewriter_actions.push({type: text[i]});
        typewriter_actions.push({delay: 20});//2000
        typewriter_actions.push({remove: {num: text[i].length, type: 'whole'}});
    }
    typewriter_actions.pop();
    // typewriter.start();
    // return true;
    
    $('.speech-bubble')
        .on('typewriteTyped', function (event, data) {
        if(data==text[text.length - 1]){
            console.log('typewrite has typed', data);
            login();
        }
    }).typewrite({
            actions: typewriter_actions
        });

}



