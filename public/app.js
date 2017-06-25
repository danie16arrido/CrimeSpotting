var initialize = function () {
  var mapDiv = document.getElementById('main-map')

  var center = { lat: 54.894756536695986 , lng: -2.938477 };
  var mainMap = new MapWrapperA( mapDiv, center, 14 );
  var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

  var marker = new google.maps.Marker({
    position: null,
    draggable: true,
    map: mainMap.googleMap,
    icon: image
  });

  var markersList = [];

  var bermudaTriangle = new google.maps.Polygon({
          // paths: circlePath(mainMap.googleMap.getCenter(), 1000, 22),
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          // fillColor: '#FF0000',
          fillOpacity: 0.35
        });
  bermudaTriangle.setMap(mainMap.googleMap);
  var crimeList = new CrimeList( null );
  // bermudaTriangle.setPath(circlePath(mainMap.googleMap.getCenter(), 1000, 22))
  // crimeList.url = createRequestAdress( bermudaTriangle);
  // crimeList.getData();




  google.maps.event.addListenerOnce( mainMap.googleMap, 'click', function (event) {
    var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }
    marker.setPosition(position)
    mainMap.googleMap.setCenter( position)
    bermudaTriangle.setPath(circlePath(mainMap.googleMap.getCenter(), 1000, 22))
    crimeList.url = createRequestAdress( bermudaTriangle);
    crimeList.getData();

    for(var crime of crimeList.crimes){
      var loc = {};
      loc['lat'] = parseFloat(crime.location.latitude);
      loc['lng'] = parseFloat(crime.location.longitude);
      this.addMarker( loc, mainMap.googleMap, markersList );
      loc = "";
    }

  }.bind(this))

  google.maps.event.addListener( marker, 'load', function () {
    console.log("change");
  })

  google.maps.event.addListener( marker, 'dragend', function ( event ) {
    var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }
    mainMap.googleMap.setCenter(position)
    console.log(position);

    bermudaTriangle.setPath(circlePath(mainMap.googleMap.getCenter(), 1000, 22))
    crimeList.url = createRequestAdress( bermudaTriangle)
    crimeList.getData();
    clearMarkers( markersList )
    for(var crime of crimeList.crimes){
      var loc = {};
      loc['lat'] = parseFloat(crime.location.latitude);
      loc['lng'] = parseFloat(crime.location.longitude);
      this.addMarker( loc, mainMap.googleMap, markersList );
      loc = "";
    }
    console.log("ev",crimeList.crimes.length);

  }.bind(this))
}

var circlePath = function (center,radius,points){
  var a=[],p=360/points,d=0;
  for(var i=0;i<points;++i,d+=p){
      a.push(google.maps.geometry.spherical.computeOffset(center,radius,d));
  }
  return a;
};

var createRequestAdress = function( polygon ) {
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
  // console.log("reqAddres", requestAddress);
  return requestAddress;
}

var getCrimeData = function ( list ) {
  list.getData();
}

addMarker =  function( coords, map, listOfMarkers ) {
  var newMarker = new google.maps.Marker({
    position: coords,
    map: map
  });
  listOfMarkers.push( newMarker );
}

clearMarkers = function( listOfMarkers ){
  for(var mark of listOfMarkers){
    mark.setMap(null);
  };

  listOfMarkers = [];

}

window.addEventListener('load', initialize);
