function getDate(utc) {
  var dt = new Date(utc * 1000);
  return dt;

}


function getSpeed(duration, distance) {
  var speed = Math.round((distance / duration) * 3.6);
  return speed;

}

function getPopup(marker, lat, lng, bicycle_uuid, label, startend, speed, opacity, singletrack) {

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
function sortDate(oneBike) {
  oneBike.sort(function(a, b) {
    return a.started1 - b.started1;
  });
  console.log("oneBike after :" + oneBike);
  return oneBike;
}

function removeLayers(layers){
  layers.eachLayer(function(doc, err) {
    map.removeLayer(doc);
  });
}

function clearLayers(layers) {
  layers.eachLayer(function(doc, err) {
    doc.clearLayers();
  });
}
