var file = document.getElementById('file');
var imageMeta = document.getElementById('imageMeta');
var image = document.querySelector('#exif img');

var toDecimal = function(number) {
    return number[0].numerator + number[1].numerator /
        (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
};


file.addEventListener('change', function(e) {
    var selectedFile = e.target.files[0]
    var fr = new FileReader();
    fr.onload = function(e) { 
        image.src = this.result; 
    };
    fr.readAsDataURL(selectedFile);


    EXIF.getData(selectedFile, function() {
        //Extract Timestamp


        //Extract Location

        var lat = EXIF.getTag(this, 'GPSLatitude');
        var latRef = EXIF.getTag(this, 'GPSLatitudeRef');
        var lng = EXIF.getTag(this, 'GPSLongitude');
        var lngRef = EXIF.getTag(this, 'GPSLongitudeRef');

        if (lat && lng) {
            //Convert coordinates to WGS84 decimal
            latRef = latRef || "N";
            lngRef = lngRef || "W";
            lat = (lat[0] + lat[1] / 60 + lat[2] / 3600) * (latRef == "N" ? 1 : -1);
            lng = (lng[0] + lng[1] / 60 + lng[2] / 3600) * (lngRef == "W" ? -1 : 1);
            var loc = lat + ',' + lng;
            imageMeta.innerHTML = '<a target="_blank" href="http://maps.google.com/maps/place/' + loc + '/@' + loc + ',10z/data=!3m1!1e3"><img src=https://maps.googleapis.com/maps/api/staticmap?zoom=10&size=700x400&maptype=roadmap&markers=color:red%7Clabel:C%7C' + loc + '&key=AIzaSyBM0cQN_J2q4QjjzenttTarUZmvXlj4zl4 ><br><br>';
            imageMeta.innerHTML += '<br> latitude: ' + lat;
            imageMeta.innerHTML += '<br> longitude: ' + lng;
        } else {
            imageMeta.innerHTML = ('<br>No Geotags in this Image.');
        }


        var make = EXIF.getTag(this, "DateTime") || EXIF.getTag(this, "DateTimeOriginal") || EXIF.getTag(this, "Make") || EXIF.getTag(this, "GPSDateStamp"),
            model = EXIF.getTag(this, "Model");

        if (make) {
            imageMeta.innerHTML += "<br>Date: " + make;
        }

        if (model) {
            imageMeta.innerHTML += "<br>Model: " + model;
        }

        console.log('EXIF Data of this Image \n', EXIF.pretty(this))

    });



});

function showImage(src, target) {
    var fr = new FileReader();
    // when image is loaded, set the src of the image where you want to display it
    fr.onload = function(e) { target.src = this.result; };
    src.addEventListener("change", function() {
        // fill fr with image data    
        fr.readAsDataURL(src.files[0]);
    });
}
