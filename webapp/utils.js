function getDate(utc) {
  var dt = new Date(utc * 1000);
  return dt;

}


function getSpeed(duration, distance) {
  var speed = Math.round((distance / duration) * 3.6);
  return speed;

}

function getPopup(marker, lat, lng, bicycle_uuid, label, startend, speed, opacity, singletrack) {
  // var marker;
  //
  // this.bicycle_uuid = bicycle_uuid;
  // this.marker = marker;

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
    })
    //var obj = L.marker();
    //console.log(typeof marker === "object");
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

function clearLayers(callback) {
  //console.log("showDate");
  startMarkerLayer.clearLayers();
  endMarkerLayer.clearLayers();
  startMarkerHeat.clearLayers();
  endMarkerHeat.clearLayers();
  startClusterGroup.clearLayers();
  endClusterGroup.clearLayers();
  callback();
  // console.log("eins :" + eins);
  // console.log("zwei :" + zwei);
  // var s = getUTC(eins);
  // var e = getUTC(zwei);
  // // console.log("s :" + s);
  // // console.log("e :" + e);
  // pickerVal_start = Date.UTC(s[0], s[1] - 1, s[2], s[3],s[4]);
  // pickerVal_end = Date.UTC(e[0], e[1] - 1, e[2], e[3],e[4]);
  // // console.log(pickerVal_s = new Date(Date.UTC(s[0], s[1] - 1, s[2], s[3], s[4])));
  // // console.log(pickerVal_e = new Date(Date.UTC(e[0], e[1] - 1, e[2], e[3], e[4])));
  // console.log("Pickervaluestart :" + pickerVal_start);
  // console.log("Pickervaluestart :" + pickerVal_end);
  // // console.log("Anfangszeit :" + getDate(pickerVal_start / 1000));
  // // console.log("Endzeit :" + getDate(pickerVal_end / 1000));
  // //alert(pickerVal_start +'' + pickerVal_end);

//  rangelayers.getLayerTimeRange(eins, zwei);
  console.log("has no Layer");

}
