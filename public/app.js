var initialize = function () {
  var mapDiv = document.getElementById('main-map')

  var center = { lat: 54.894756536695986 , lng: -2.938477 };
  var mainMap = new MapWrapper( mapDiv, center, 14 );

  mainMap.addClickEvent();
  mainMap.addDragMarkerEvent();
  mainMap.addOnLoadEvent();




}


window.addEventListener('load', initialize);
