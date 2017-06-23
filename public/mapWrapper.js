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

  this.circle = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: this.googleMap,
    center: coords,
    radius: 1000
  });
}

MapWrapper.prototype = {

  updateMarker: function(coords){
    this.marker.setPosition( coords )
    this.circle.setCenter( coords )
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
