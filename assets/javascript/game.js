var map;
var locationInput = "";
var typeInput = "";

function runQuery() {
    locationInput = $("#placeask").val().trim();
    typeInput = $("#typeask").val().trim();
    console.log(typeInput);
    console.log(locationInput);
};

$("#userInputButton").on("click", function() {
    event.preventDefault();
    runQuery();

    // this is the query that is being sent to the api (search parameters)
  
    var request = {
        location: startMapCenter,
        radius: '5000',
        type: [ typeInput ]
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
    
    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
    
    }
    ;


});

var startMapCenter = new google.maps.LatLng(34.1011049,-118.3534514);
function initialize() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: startMapCenter,
        zoom: 13
    });

    // var request = {
    //     location: startMapCenter,
    //     radius: '5000',
    //     type: [ typeInput ]
    // };

    // service = new google.maps.places.PlacesService(map);
    // service.nearbySearch(request, callback);
}
// function callback(results, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//             var place = results[i];
//             createMarker(results[i]);
//             console.log(results[i])
//         }
//     }
// }

// function createMarker(place) {
//     var placeLoc = place.geometry.location;
//     var marker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location
//     });

// }
// ;

google.maps.event.addDomListener(window, 'load', initialize);
