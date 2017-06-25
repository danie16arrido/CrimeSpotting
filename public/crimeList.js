var CrimeList = function ( url ) {
  this.url = url;
  this.crimes = null;
  this.onUpdate = null;
}

CrimeList.prototype = {

  getData: function () {
    var request = new XMLHttpRequest();
    //******trying to make in async
    // request.onreadystatechange = function () {
    //   if(request.readyState == 4 && request.status == 200){
    //     var jsonString = request.responseText;
    //     var crimes = JSON.parse(jsonString);
    //     this.crimes = crimes;
    //   }
    // }
    // request.open('GET', this.url, true);
    request.open('GET', this.url, false);

    request.addEventListener('load', function () {
      if (request.status !== 200) return;
        var jsonString = request.responseText;
        var crimes = JSON.parse(jsonString);

        this.crimes = crimes;
        console.log("getting json", this.crimes);
        // this.onUpdate( crimes );
    }.bind(this));

    request.send();
  },

  parseData: function () {
    this.getData();
    return this.crimes;
  }

}
