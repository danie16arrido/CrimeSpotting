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
    draggable: true
  });

  this.circle = new google.maps.Polygon({
    map:this.googleMap,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    // fillColor: '#FF0000',
    fillOpacity: 0.35,
    path:this.circlePath(this.googleMap.getCenter(),1000,22)
  });

  this.crimeList = new CrimeList( null );
  this.crimeList.url = this.createRequestAdress( this.circle );
  console.log("urlOnCreate",this.crimeList.url);
  this.crimeList.getData();
  this.updateMarker( this.googleMap.center )
}

MapWrapper.prototype = {

  updateMarker: function(coords){
    this.marker.setPosition( coords )
    this.googleMap.setCenter( coords )
    this.drawCircle();
    var requestAddress = this.createRequestAdress( this.circle );

    this.crimeList.url = requestAddress;
    this.crimeList.getData();
    console.log("updating", this.crimeList);
    this.populateCrime()

    console.log( "center: ", this.googleMap.getCenter().lat(), this.googleMap.getCenter().lng());
  },

  addClickEvent: function(){
    google.maps.event.addListener(this.googleMap, 'click', function( event ){
      var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }
      this.updateMarker( position );
    }.bind( this ));
  },

  addDragMarkerEvent: function(){
      google.maps.event.addListener(this.marker, 'dragend', function( event ){
        var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }
        this.updateMarker( position );
      }.bind( this ));
  },

  addOnLoadEvent: function () {
    google.maps.event.addListenerOnce(this.googleMap, 'idle', function(){
      this.populateCrime();
  }.bind(this));
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
    console.log("reqAddres", requestAddress);
    return requestAddress;
  },

  generatePathFromCircle: function () {
    return this.circlePath(this.googleMap.getCenter(),1000,22)
  },

  drawCircle: function () {
    this.circle.setPath( this.generatePathFromCircle())
  },

  populateCrime: function(){
    for( var crime of this.crimeList.crimes){
      console.log( crime.location );
    }
  }
}
