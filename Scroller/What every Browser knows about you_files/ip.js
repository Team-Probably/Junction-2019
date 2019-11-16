(function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // document.getElementById("connection").innerHTML += '<b>Public IP:</b> ' + JSON.parse(xhttp.responseText).ip + '<br>'
            var publicip = JSON.parse(xhttp.responseText).ip ;
            console.log( publicip);
        }
    };
    xhttp.open("GET", "https://api.ipify.org?format=json", true);
    xhttp.send();

    

    var xhttp3 = new XMLHttpRequest();
    xhttp3.onreadystatechange = function() {
        if (xhttp3.readyState == 4 && xhttp3.status == 200) {
            //var serviceprovider = JSON.parse(xhttp.responseText).isp;
            console.log(JSON.parse(xhttp3.responseText));
            //document.getElementById("isp").innerHTML += '<b>Service Provider:</b> ' + JSON.parse(xhttp3.responseText).isp + '<br>';

        }
    };
    xhttp3.open("GET", "http://ip-api.com/json", true);
    xhttp3.send();

    if(document.referrer && document.referrer!==''){
           // document.getElementById("referrer").innerHTML = '<b>Previous Page:</b>  '+document.referrer+'<br>';
        var referrer = document.referrer;
        console.log('Referrer: '+referrer);
    }

    //get the IP addresses associated with an account
    
}())


