var map;
var locationInput = "";
var typeInput = "";
var startMapCenter = new google.maps.LatLng(37.09024,-95.71289100000001);
var address


function appendHTML(img , name , address, phone , rating ) {
  var businessCard = "";
  businessCard += "<div class='container' id='pinned_bizzcard1'>"
  businessCard += "<img src=" + img + "alt='Avatar' >"
  businessCard += "<div class='card-body textWrap'>"
  businessCard += "<h5 class='BizzName'>" + name + "</h5>"
  businessCard += "<p class='card-text' id='address1'>Address:" + address + "</p>"
  businessCard += "<p class='card-text' id='phoneNumber1'>Phone Number:" + phone + "</p>"
  businessCard += "<p class='card-text' id='rating1'>Ratings:" + rating + "</p>"
  businessCard += "<button class='btn btn-primary dlt_btn' type='button'>Delete</button>"
  $("#rightSide").append(businessCard);
};

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
  var ipPass = "";
  var photoRef = "";

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
            console.log(results[i]);
            idPass = results[i].place_id;
            console.log(idPass);


            function detailsCall() {



              var request = {
                placeId: idPass
              };

              service = new google.maps.places.PlacesService(map);
              service.getDetails(request, callback);



              function callback(resultsTwo, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                  console.log(resultsTwo);
                  console.log(resultsTwo.photos[0].getUrl({"maxWidth":300,"minWidth":300}));
                  console.log(resultsTwo.name);
                  console.log(resultsTwo.formatted_address);
                  console.log(resultsTwo.formatted_phone_number);
                  console.log(resultsTwo.rating);
                  // function appendHTML(img , name , phone , rating )
                  appendHTML(resultsTwo.photos[0].getUrl({"maxWidth":300,"minWidth":300}) , resultsTwo.name , resultsTwo.formatted_address , resultsTwo.formatted_phone_number , resultsTwo.rating)
                }
              }

            };

            detailsCall();




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
