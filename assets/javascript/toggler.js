// hard coded sample api results
var results = [{
  avatar: 'https://picsum.photos/200/200?random',
  name: 'Diplo',
  address: '3700 Hollywood Ave',
  hours: '9am - 5pm',
  rating: '5 Stars'
},
{
  avatar: 'https://picsum.photos/200/200?random',
  name: 'Claude Vonstroke',
  address: '5100 Sunset Blvd',
  hours: '9am - 5pm',
  rating: '5 Stars'
},
{
  avatar: 'https://picsum.photos/200/200?random',
  name: 'Karma',
  address: '6200 Beverly Glen',
  hours: '9am - 5pm',
  rating: '5 Stars'
}];
// end hard coded sample api results

// establish class on DOM as variable
var resultsZone = $('#rightSide');

// for loop creates search results from the results array
for(var i = 0; i < results.length; i++) {

  var business = results[i];

  var businessIndexItem = $('<div>');
  businessIndexItem.addClass('container card-body textWrap');

  var businessAvatar = $('<img>');
  businessAvatar.attr('src', business.avatar);
  businessAvatar.addClass('avatar');

  var businessName = $('<h5>');
  businessName.text(business.name);

  var businessAddress = $('<p>');
  businessAddress.text(business.address);

  var businessHours = $('<p>');
  businessHours.text(business.hours);

  var businessRating = $('<p>');
  businessRating.text(business.rating);

  var deleteBtn = $('<button>');
  deleteBtn.text('Delete');
  deleteBtn.addClass("btn btn-primary dlt_btn");

  businessIndexItem.prepend(deleteBtn);
  businessIndexItem.prepend(businessRating);
  businessIndexItem.prepend(businessHours);
  businessIndexItem.prepend(businessAddress);
  businessIndexItem.prepend(businessAvatar);
  businessIndexItem.prepend(businessName);

  // sends all data from object to DOM
  resultsZone.append(businessIndexItem);
}

// send search results from #rightSide to #leftSide
resultsZone.find('.card-body').on('click', function() {
  $(this).appendTo('#leftSide');
});

$( ".dlt_btn" ).on('click', function() {
  $(this).parent().remove();
});
