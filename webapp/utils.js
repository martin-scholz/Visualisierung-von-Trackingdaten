
function getDate(utc) {
  var dt = new Date(utc * 1000);
  return dt;

}
function getUTC(format) {
  var str = format;
  var c = str.split('/').map(function(i) {
    return parseInt(i, 10);
  });
  return c;
}

function getSpeed(duration, distance) {
  var speed = Math.round((distance / duration) * 3.6);
  return speed;

}
function getPopup(marker, lat, lng, bicycle_uuid, label, startend, speed, opacity, singletrack) {
  this.bicycle_uuid = bicycle_uuid;

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
        single.singleTrack(bicycle_uuid);
      });
    }
    marker.on('mouseout', function(e) {
      this.closePopup();
    })
    return marker;
  }
}
function showHeatMap(points) {
  if (heat) {
    map.removeLayer(heat);
  }
  heatPointArray = points.map(function(p) {
    return [p[0], p[1]];
  });

  var heat = L.heatLayer(heatPointArray);

  return heat;
}
