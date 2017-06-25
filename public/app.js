var initialize = function () {
  var mapDiv = document.getElementById('main-map')

  var center = { lat: 54.894756536695986 , lng: -2.938477 };
  var mainMap = new MapWrapper( mapDiv, center, 14 );
  //mainMap.geoLocate();
  mainMap.addClickEvent();
  mainMap.addDragMarkerEvent();

  var circleSize = document.getElementById('circle-size')

  circleSize.addEventListener('change', function () {
    var radiusKM = document.getElementById('radius-value');
    mainMap.radius = this.value * 1000;
    console.log("AA",mainMap.googleMap.getCenter());
    mainMap.refresh()
    mainMap.drawCircle();
    radiusKM.innerText = this.value + " Km."

  })



}


window.addEventListener('load', initialize);
