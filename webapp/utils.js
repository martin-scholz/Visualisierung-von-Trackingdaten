/*
utils.js
enthält Funktionen, die immer wieder an unterschiedlichen Stellen der Anwendung gebraucht werden
version : 1.0.0
datum: 8.12.2017
autor : Martin Scholz
*/
// gibt Unix-Timestamp in lesbarer Form zurück
function getDate(utc) {
  var dt = new Date(utc * 1000);
  return dt;

}

//gibt die Durchschnittsgeschwindigkeit eines Track szurück
function getSpeed(duration, distance) {
  var speed = Math.round((distance / duration) * 3.6);
  return speed;

}
//setzt die Deckkraft und die mouse-events auf die Marker und gibt einen Marker zurück
function markerFunctions(marker, lat, lng, bicycle_uuid, label, startend, speed, opacity, singletrack) {

  if (arguments.length != 9) {
    throw new Error("9 arguments expected");
  } else {
    marker.setOpacity(opacity)
      .bindPopup("Lat: " + lat + "\nlng: " + lng + "<br>" + "\nbikeId: " + bicycle_uuid + "<br>" + "\n" + label + "ed: " + startend + "\n" + "<br>" + "speed: " + speed + "km/h")
      //.bindPopup("Lat: " + lat + "\nlng: " + lng + "<br>" + "\nFahrradId: " + bicycle_uuid + "<br>" + "\n" + label + "zeit: " + startend + "\n" + "<br>" + "speed: " + speed + "km/h")
      .on('mouseover', function(e) {
        this.openPopup();
      });
    if (singletrack == false) {
      marker.on('click', function(e) {
        route.singleTrack(bicycle_uuid);
      });
    }
    marker.on('mouseout', function(e) {
      this.closePopup();
    });
    return marker;
  }
}

//sortiert ein Array aufsteigend nach der Startzeit
function sortDate(oneBike) {
  oneBike.sort(function(a, b) {
    return a.started1 - b.started1;
  });
  return oneBike;
}

//entfernt eine Gruppe von Layergroups von der Karte
function removeLayers(layers){
  layers.eachLayer(function(doc, err) {
    map.removeLayer(doc);
  });
}

//"leert" die Layer einer Layergroup
function clearLayers(layers) {
  layers.eachLayer(function(doc, err) {
    doc.clearLayers();
  });
}
