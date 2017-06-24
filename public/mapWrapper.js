var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
var MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
    mapTypeId: 'terrain'
  });

  this.marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap,
    animation: google.maps.Animation.DROP,
    draggable: true,
    icon: image
  });

  this.circle = new google.maps.Polygon({
    map:this.googleMap,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    // fillColor: '#FF0000',
    // fillOpacity: 0.35,
    visible:true,
    path:this.circlePath(this.googleMap.getCenter(),1000,22)
  });

  this.listOfMarkers = [];

  this.crimeList = new CrimeList( null );
  this.showMarkers(this.marker.position)
}

MapWrapper.prototype = {

  addClickEvent: function(){
    google.maps.event.addListener(this.googleMap, 'click', function( event ){
      var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }
      this.clearMarkers();
      this.marker.setPosition( position )
      this.drawCircle()
      this.showMarkers( position )
    }.bind( this ));
  },

  addDragMarkerEvent: function(){
      google.maps.event.addListener(this.marker, 'dragend', function( event ){
        console.log("first");
        var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }
        this.clearMarkers();
        this.marker.setPosition( position )
        this.drawCircle()
        this.showMarkers( position )
      }.bind(this));
  },

  addMarkerRefresh: function () {
    google.maps.event.addListener(this.marker, 'change', function ( event ) {
      console.log("refresh");
      var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }
      this.clearMarkers();
      this.marker.setPosition( position )
      this.drawCircle()
      this.showMarkers( position )
    }.bind(this))
  },

  addOnLoadEvent: function () {
    google.maps.event.addListener(this.googleMap, 'idle', function(){
      this.drawCircle()
      this.showMarkers( this.marker.position )
    }.bind(this));
  },

  drawSquare: function () {

  },


  showMarkers: function ( coords ) {
    this.clearMarkers();
    this.marker.setPosition( coords )
    var requestAddress = this.createRequestAdress( this.circle );

    this.crimeList.url = requestAddress;
    this.crimeList.getData();
    console.log(this.crimeList.crimes.length);

    for(var crime of this.crimeList.crimes){
      var loc = {};
      loc['lat'] = parseFloat(crime.location.latitude);
      loc['lng'] = parseFloat(crime.location.longitude);
      this.addMarker( loc );
      loc = "";
    }

  },


  circlePath: function(center, radius, points){
    var a=[],p=360/points,d=0;
    for(var i=0;i<points;++i,d+=p){
        a.push(google.maps.geometry.spherical.computeOffset(center,radius,d));
    }
    return a;

  },

  createRequestAdress: function( polygon ) {
    var requestAddress = "https://data.police.uk/api/crimes-street/all-crime?";
    requestAddress += "poly="
    for (var i = 0; i < polygon.getPath().getLength(); i++) {
      requestAddress += polygon.getPath().getAt(i).lat();
      requestAddress += ",";
      requestAddress += polygon.getPath().getAt(i).lng();
      requestAddress += ":"
    }
    requestAddress = requestAddress.slice(0, -1);//delete last ":"
    requestAddress += "&date=2013-01";
    console.log("reqAddres", requestAddress, "size", this.crimeList.crimes.length);
    return requestAddress;
  },

  generatePathFromCircle: function () {
    return this.circlePath(this.marker.position,1000,12)
  },

  drawCircle: function () {
    this.circle.setPath( this.generatePathFromCircle())
  },

  getLatLngFromString: function ( string ) {
    var latlng = string.split(/, ?/)
    return new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]));
  },

  populateCrime: function(){
    var coords = "";
    for( var crime of this.crimeList.crimes){
      coords += crime.location.latitude + "," + crime.location.longitude;
      this.addMarker( this.getLatLngFromString( coords ) );
      coords = "";
    }
  },

  addMarker: function( coords ) {
    var newMarker = new google.maps.Marker({
      position: coords,
      map: this.googleMap
    });
    this.listOfMarkers.push( newMarker );
  },

  clearMarkers: function() {
    for(var mark of this.listOfMarkers){
      mark.setMap(null);
    }
    this.listOfMarkers = [];
    // console.log("lenght",this.markers.lenght);
  }


}
