var initialize = function () {
  var mapDiv = document.getElementById('main-map')

  var center = { lat: 54.894756536695986 , lng: -2.938477 };
  var mainMap = new MapWrapper( mapDiv, center, 14 );
  //mainMap.geoLocate();
  mainMap.addClickEvent();
  mainMap.addDragMarkerEvent();



//extension
  var circleSize = document.getElementById( 'circle-size' );

  circleSize.addEventListener('change', function () {
    var radiusKM = document.getElementById( 'radius-value' );
    mainMap.radius = this.value * 1000;
    mainMap.refresh();
    mainMap.drawCircle();
    radiusKM.innerText = this.value + " Km.";
  });


  var btnMonthPicker = document.getElementById('btnMyDate');
  var currentMonth = document.getElementById('currentYearMonth');
  btnMonthPicker.addEventListener("click", function ( e ) {
    var monthPicker = document.getElementById('myDate');
    mainMap.monthYear = monthPicker.value;
    mainMap.refresh();
    currentYearMonth.innerText = "Current Month: " + monthPicker.value;

  })

  var categorySelector = document.getElementById('select-category');

  var categories = ["all-crime","anti-social-behaviour","bicycle-theft","burglary","criminal-damage-arson","drugs","other-theft","public-order","shoplifting","theft-from-the-person","vehicle-crime","violent-crime"]
  for( var cat of categories){
    var option = document.createElement('option');
		option.value = cat;
		option.innerText = cat;
		categorySelector.appendChild( option );
  }

  categorySelector.addEventListener('change', function () {
    console.log( "mp",this.value);
    mainMap.selectedCategory = this.value;
    mainMap.refresh();
  })


}

window.addEventListener('load', initialize);
