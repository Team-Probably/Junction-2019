(function() {
    var imageAddr = "https://upload.wikimedia.org/wikipedia/commons/2/2d/Snake_River_%285mb%29.jpg";
    var downloadSize = 5245329; //bytes
    var oProgress = document.getElementById("speed");

    function ShowProgressMessage(msg) {
        if (console) {
            if (typeof msg == "string") {
                console.log(msg);
            } else {
                for (var i = 0; i < msg.length; i++) {
                    console.log(msg[i]);
                }
            }
        }

        if (oProgress) {
            var actualHTML = (typeof msg == "string") ? msg : msg.join(" ");
            oProgress.innerHTML = actualHTML;
        }
    }

    function InitiateSpeedDetection() {
        window.setTimeout(MeasureConnectionSpeed, 1);
    };

    if (window.addEventListener) {
        window.addEventListener('load', InitiateSpeedDetection, false);
    } else if (window.attachEvent) {
        window.attachEvent('onload', InitiateSpeedDetection);
    }

    function MeasureConnectionSpeed() {
        var startTime, endTime;
        var download = new Image();
        download.onload = function() {
            endTime = (new Date()).getTime();
            showResults();
        }

        download.onerror = function(err, msg) {
            ShowProgressMessage("Invalid image, or error downloading");
        }

        startTime = (new Date()).getTime();
        var cacheBuster = "?nnn=" + startTime;
        download.src = imageAddr + cacheBuster;

        function showResults() {
            var duration = (endTime - startTime) / 1000;
            var bitsLoaded = downloadSize * 8;
            var speedBps = (bitsLoaded / duration).toFixed(2);
            var speedKbps = (speedBps / 1024).toFixed(2);
            var speedMbps = (speedKbps / 1024).toFixed(2);
            ShowProgressMessage([
                "<b>Download Speed:</b>",
                speedKbps + " kbps",
            ]);
        }
    }
    MeasureConnectionSpeed();


    var networkType = document.getElementById("networkType");

    if (navigator.connection && connection.type) {
        var connectionSpeed;
        switch (connection.type) {

            case connection.CELL_3G:
                // 3G
                connectionSpeed = '3G';
                break;
            case connection.CELL_2G:
                // 2G
                connectionSpeed = '2G';
                break;
            default:
                // WIFI, ETHERNET, UNKNOWN
                connectionSpeed = 'WIFI or Ethernet';
        }
        networkType.innerHTML += '<b>Network:</b> ' + connectionSpeed+'     '+connection.type;
    }

}());
