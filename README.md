# Project 1

Group Project 1

## Built With

* [Bootstrap](https://getbootstrap.com/) - Twitter CSS.
* [jQuery](https://jquery.com/) - A fast, small, and feature-rich JavaScript library.
* [JavaScript](https://www.javascript.com/) - A high-level, interpreted programming language.
* [Google Firebase](https://firebase.google.com/) - A mobile and web application development platform.
*
More to come...

## Highlights

* It almost works...


event planner page
apis used


Google maps geocoder api
the geocoder api was used to obtain a latitude and longitude of a certain area search using keywords.
Google maps places api
after a response was returned from the geocoder api we then ran a nearby search with additional parameters for businesses
within 5000 meters of our courdinates.
the objects that are returned at first are very incomplete however they do contain a unique ID to google's data base
that we used to send an additional api request to the places api that will will return a object called place details.

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

appendHTML(resultsTwo.photos[0].getUrl({"maxWidth":200,"minWidth":200}) , resultsTwo.name , resultsTwo.formatted_address , resultsTwo.formatted_phone_number , resultsTwo.rating)
}}

           };


this json object contains all relevant info such as address, phone #, user rating, and place holder images.
once the place details object is returned from the api we were able to parse the information accordingly
into thumbnail card to display client side.

we then inculded a feature where you can select certain results and move them to section where they are stored to firebase
next time the page is loaded it will display in the left section all the objects previosly saved
to the firebase.

features to come.......
addition styling,
a built in passport so any user who visits the site can see their unique results.
the ability to clear out the firebase client side.
