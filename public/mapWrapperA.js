var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
var MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
    mapTypeId: 'terrain'
  });
}
