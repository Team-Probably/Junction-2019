var speech = {
    "intro": {
        "dialogues": [
        "Hey! <br> Welcome to CyberSafe. I am your friend ScriptKiddie",
        "Do you find the world of internet amusing? Accessing tons of websites, emails daily.",
        "Ever wondered how safe the internet is?",
        "Before getting to the fun stuff, let's begin by signing you up"
       ],
       "next": "signedin",
    },
    "signedin": {
        "dialogues": [
        "Great you are signed in!",
        "I am not trying to scare you but the internet is pretty dangeours place if you don't take care",
        "Before we go into the depth's of the interent, here's a little glimpse for you",
        "Every website you visit know's all of this about you"
        ],
        "next": "hack_info",
    }
    "data":[{
        "type": "intro",
        "dialogue":"Hey!! Welcome to CyberSafety",
        "button":"Next"
    },
    {
        "dialouge":"Worried to step in the world of internet?",
        "button":"Next",
        "type":"intro"
    },
    {
        "dialouge":"Don't worry, Be Happy :)",
        "button":"Next",
        "type":"intro"
    },
    {
        "dialouge":"We are her to help you through it :)",
        "button":"Let's Begin",
        "type":"intro"
    },
    {
        "dialouge":"Let's begin with baby Steps",
        "button":"Get Started",
        "type":"signin"
        
    },
    {
        "dialouge":"Sign In!!",
        "button":"Continue",
        "type":"signin"
    },
    {
        "dialouge":"To make your Experience better kindly provide the following permissions!",
        "button":"Next",
        "type":"signin"
    },
    {
        "dialouge":"CyberSafety would like to use audio",
        "button":["Allow","Decline"],
        "type":"signin"
    },
    {
        "dialouge":"CyberSafety would like to use video",
        "button":["Allow","Decline"],
        "type":"signin"
    },
    {
        "dialouge":"Boom you've just gotten Bamboozled!!",
        "button":"Wanna know why??",
        "type":"signin"
    }
    ]

}