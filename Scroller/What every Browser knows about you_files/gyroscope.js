(function() {
    var element = document.getElementById('gyroscope');
    var compass = document.getElementById('compass');
    compass.hidden = true;

    function handleOrientation(event) {
        var absolute = event.absolute;
        var alpha = event.alpha;
        var beta = event.beta;
        var gamma = event.gamma;


        element.innerHTML = 'Orientation: ' + absolute


        if (!alpha) {
            compass.hidden = true;
            element.innerHTML += '<br>Your device has no compass ';
        } else {
            compass.hidden = false;
            element.innerHTML += '<br>alpha: ' + alpha
        }

        element.innerHTML += '<br>beta: ' + beta
        element.innerHTML += '<br>gamma: ' + gamma + '<br>'
            // Do stuff with the new orientation data
        if (Math.abs(beta) + Math.abs(gamma) < 1.8) {
            element.innerHTML += 'Your Device is probably laying on a Table';
        } else {
            element.innerHTML += 'Your Device is probably in your Hands';
        }



    }
    window.addEventListener('deviceorientation', handleOrientation);
}());
