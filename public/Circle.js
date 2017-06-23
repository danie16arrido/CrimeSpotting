var Circle = function( map, coords) {
  this.circle = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    center: coords,
    radius: Math.sqrt(citymap[city].population) * 100
  });
  return this.circle
}
