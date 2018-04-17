var map;
var locationInput = "";
var typeInput = "";
var startMapCenter = new google.maps.LatLng(37.09024,-95.71289100000001);
 
function initialize() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: startMapCenter,
        zoom: 3.5
    });
};

function runQuery() {
    locationInput = $("#placeask").val().trim();
    typeInput = $("#typeask").val().trim();
    console.log(typeInput);
    console.log(locationInput);
};

$("#userInputButton").on("click", function() {
    event.preventDefault();
    runQuery();

    // starts the api call
    var geocoder = new google.maps.Geocoder();
    var address = locationInput;
    var queryLatLng = "";

    if (geocoder) {
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                // grabbing the lat and lng that come back from the geocoder api and logging them to console
                console.log(results[0].geometry.location.lat());
                console.log(results[0].geometry.location.lng());
                // defining the variable as the latlng in the right format to sent to the places api
                queryLatLng = new google.maps.LatLng(results[0].geometry.location.lat(),results[0].geometry.location.lng());
            }
            else {
                console.log("Geocoding failed: " + status);
            }
            // this is when the map will chang based on search location
            mapAdjust();
            // start of the places api query

            var request = {
                location: queryLatLng,
                radius: '5000',
                keyword: [ typeInput ]
            };
        
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
        
            function callback(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var place = results[i];
                        createMarker(results[i]);
                        console.log(results[i])
                    }
                }
            }

            function mapAdjust() {
                map = new google.maps.Map(document.getElementById('map'), {
                    center: queryLatLng,
                    zoom: 13
                });
            };

            function createMarker(place) {
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });
            
            };
            
        });
   
    }  
    
});

google.maps.event.addDomListener(window, 'load', initialize);
