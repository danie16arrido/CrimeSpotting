var MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });

  this.marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap,
    animation: google.maps.Animation.DROP,
    draggable: true
  });
}

MapWrapper.prototype = {

  updateMarker: function(coords){
    this.marker.setPosition( coords )
    this.googleMap.setCenter( coords )
  },

  addClickEvent: function(){
    google.maps.event.addListener(this.googleMap, 'click', function(event){
      var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }
      this.updateMarker(position);
    }.bind(this));
  },

  addDragMarkerEvent: function(){
      google.maps.event.addListener(this.marker, 'dragend', function(event){
        var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }
        this.updateMarker(position);
      }.bind(this));
  }
}
