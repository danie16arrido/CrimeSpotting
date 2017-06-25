var CrimeList = function ( url ) {
  this.url = url;
  this.crimes = [];
  this.onUpdate = null;
}

CrimeList.prototype = {

  getData: function ( callback ) {
    var request = new XMLHttpRequest();
    request.open('GET', this.url);
    request.send();
    request.onreadystatechange = function () {
      if(request.readyState < 4){
      } else if( request.readyState === 4 && request.status === 200 ) {
        var jsonString = request.responseText;
        var crimes = JSON.parse(jsonString);
        this.crimes = crimes;
        callback();
      }
    }.bind( this )
  }
}
