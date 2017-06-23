var initialize = function () {
  var mapDiv = document.getElementById('main-map')

  var center = { lat: 41.878114, lng: -87.629798 };
  var mainMap = new MapWrapper( mapDiv, center, 14 )
  mainMap.addClickEvent();
  mainMap.addDragMarkerEvent();
}

window.addEventListener('load', initialize);
