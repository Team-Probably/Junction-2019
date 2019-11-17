(function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // document.getElementById("connection").innerHTML += '<b>Public IP:</b> ' + JSON.parse(xhttp.responseText).ip + '<br>'
            var publicip = JSON.parse(xhttp.responseText).ip ;
            console.log( publicip);
            $('#publicip').html(publicip);
        }
    };
    xhttp.open("GET", "https://api.ipify.org?format=json", true);
    xhttp.send();

    

    var xhttp3 = new XMLHttpRequest();
    xhttp3.onreadystatechange = function() {
        if (xhttp3.readyState == 4 && xhttp3.status == 200) {
            //var serviceprovider = JSON.parse(xhttp.responseText).isp;
            var ipdata = JSON.parse(xhttp3.responseText);
            loadMap([ipdata.lat,ipdata.lon])
            var str = '';
            var needlist = ["isp","as","org"];
            Object.keys(ipdata).forEach((key, index) => {
                if(needlist.includes(key)) 
                {
                    str += `<b>${key}</b>: ${ipdata[key]} <br/>`;
                }
                
            });
            console.log(str);
            $('#ipdata').html(str); 
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

function loadMap(center){
    var mymap = L.map('map').setView(center, 12);
    
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.dark',
        accessToken: 'pk.eyJ1Ijoia2l0ZXJldHN1IiwiYSI6ImNqc216MTExNzA2NDE0OW80bWhyNmwyMmoifQ.v7pnFYhTlfA59e_sMBMSBA'
    }).addTo(mymap);
    
    var marker = L.marker(center).addTo(mymap);
    
    //marker.bindPopup("<b>KJSCE</b> CodeCell, <br>K.J. Somaiya College Of Engineering,<br/>Vidyavihar, Mumbai.").openPopup();
    }

