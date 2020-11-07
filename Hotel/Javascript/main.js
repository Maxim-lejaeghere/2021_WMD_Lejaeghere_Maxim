/* eslint-disable no-unused-vars */
(function() {
  'use strict';
})();

function initMap() {
  // The location of Uluru
  const uluru = {lat: 51.05460503758255, lng: 3.7251363781042324};
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}
