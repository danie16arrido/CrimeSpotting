var CrimeList = function ( url ) {
  this.url = url;
  this.crimes = [];
  this.onUpdate = null;
}

CrimeList.prototype = {

  getData: function () {
    var request = new XMLHttpRequest();
    request.open('GET', this.url);

    request.addEventListener('load', function () {
      if (request.status !== 200) return;
        var jsonString = request.responseText;
        var crimes = JSON.parse(jsonString);
        this.crimes = crimes;
        // this.onUpdate( crimes );
    }.bind(this));

    request.send();
  }
}
