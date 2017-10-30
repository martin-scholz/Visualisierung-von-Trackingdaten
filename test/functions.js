
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

function getDate(utc) {
  var dt = new Date(utc * 1000);
  return dt;

}

function getSpeed(duration, distance) {
  var speed = Math.round((distance / duration) * 3.6);
  return speed;

}

function showHeatMap(points) {
  if (heat) {
    console.log(heat);
    map.removeLayer(heat);
    console.log(heat);
    console.log("heat removed");
  }
  heatPointArray = points.map(function(p) {
    return [p[0], p[1]];
  });

  var heat = L.heatLayer(heatPointArray);

  return heat;
}


function getPopup(marker, lat, lng, bicycle_uuid, label, startend, speed, opacity, singletrack) {
  //marker.url = 'single';
if(arguments.length != 9){
  throw new Error ("9 arguments expected");
}else{
  marker.setOpacity(opacity)
    .bindPopup("Lat: " + lat + "\nlng: " + lng + "<br>" + "\nbikeId: " + bicycle_uuid + "<br>" + "\n" + label + "ed: " + startend + "\n" + "<br>" + "speed: " + speed + "km/h")
    .on('mouseover', function(e) {
      this.openPopup();
    });
  if (singletrack == false) {
    marker.on('click', function(e) { //window.open(this.url);
      singleTrack(bicycle_uuid);
    });
  }
  marker.on('mouseout', function(e) {
    this.closePopup();
  })
  return marker;
}
}
//start= {"Alle Starts": starts}



function showDate(eins, zwei) {
  startMarkerLayer.clearLayers();
  endMarkerLayer.clearLayers();
  startMarkerHeat.clearLayers();
  endMarkerHeat.clearLayers();
  startClusterGroup.clearLayers();
  endClusterGroup.clearLayers();
  var s = getUTC(eins);
  var e = getUTC(zwei);
  pickerVal_start = Date.UTC(s[0], s[1] - 1, s[2], s[3]);
  pickerVal_end = Date.UTC(e[0], e[1] - 1, e[2], e[3]);
  //alert(pickerVal_start +'' + pickerVal_end);

  getLayerTimeRange(pickerVal_start, pickerVal_end);
  console.log("has no Layer");

}

function getUTC(format) {
  var str = format;
  var c = str.split('/').map(function(i) {
    return parseInt(i, 10);
  });
  return c;
}

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/



function getLayerTimeRange(pickerVal_start, pickerVal_end) {
  dataForSliders = [];
  var s_pointsArray = [];
  var e_pointsArray = [];
  var s_marker;
  var e_marker;
  //map.removeLayer
  data.forEach(function(doc, err) {
    s_point = [];
    e_point = [];
    //console.log("Anfang: " + pickerVal_start / 1000 + "Ende: " + pickerVal_end / 1000);
    if (doc.started <= (pickerVal_end / 1000) && doc.started >= (pickerVal_start / 1000)) {
    //  console.log("Startzeiten: " + (getDate(doc.started)) + "stamp :" + doc.started);
      dataForSliders.push(doc);

      if (doc.route[0] == null) {
        lat = null;
        lng = null;
      } else {
        var s_lat = parseFloat(doc.route[0].latitude);
        var s_lng = parseFloat(doc.route[0].longitude);
        var e_lat = parseFloat(doc.route[doc.route.length - 1].latitude);
        var e_lng = parseFloat(doc.route[doc.route.length - 1].longitude);
        s_point.push(s_lat);
        s_point.push(s_lng);
        e_point.push(e_lat);
        e_point.push(e_lng);
        s_pointsArray.push(s_point);
        e_pointsArray.push(e_point);
        var bicycle_uuid = (doc.bicycle_uuid);
        var started = getDate(doc.started);
        var ended = getDate(doc.ended);
        var speed = getSpeed(doc.duration_sec, doc.distance_m);
        s_marker = L.marker(s_point, {
          icon: blueIcon
        });
        e_marker = L.marker(e_point, {
          icon: redIcon
        });
        s_marker_cluster = L.marker(s_point, {
          icon: blueIcon
        });
        e_marker_cluster = L.marker(e_point, {
          icon: redIcon
        });

        //marker = getPopup(marker, lat, lng, bicycle_uuid,"start", started);
        s_marker.addTo(startMarkerLayer);
        e_marker.addTo(endMarkerLayer);

        //  console.log(bicycle_uuid);
        s_marker = getPopup(s_marker, s_lat, s_lng, bicycle_uuid, "start", started, speed, 0.9, false);
        e_marker = getPopup(e_marker, e_lat, e_lng, bicycle_uuid, "end", ended, speed, 0.9, false);
        s_marker_cluster = getPopup(s_marker_cluster, s_lat, s_lng, bicycle_uuid, "start", started, speed, 0.9, false);
        e_marker_cluster = getPopup(e_marker_cluster, e_lat, e_lng, bicycle_uuid, "end", ended, speed, 0.9, false);


        startClusterGroup.addLayer(s_marker_cluster);
        endClusterGroup.addLayer(e_marker_cluster);
        startMarkerCluster.addLayer(startClusterGroup);
        endMarkerCluster.addLayer(endClusterGroup);
      }

    } else {
      console.log("no data available");
    }
  });

  startHeatmap = showHeatMap(s_pointsArray);
  endHeatmap = showHeatMap(e_pointsArray);
  startMarkerHeat.addLayer(startHeatmap);
  endMarkerHeat.addLayer(endHeatmap);
  map.addLayer(startMarkerLayer);
  overLaysStart = {
    "Marker (Start)": startMarkerLayer,
    "Heatmap (Start)": startMarkerHeat,
    "MarkerCluster (Start)": startMarkerCluster,
    "Marker (End)": endMarkerLayer,
    "Heatmap (End)": endMarkerHeat,
    "MarkerCluster (End)": endMarkerCluster,
    "Bezirke (Start)": geoJsonLayer
  }


}
function singleTrack(bicycle_uuid){

console.log("zwei");
if(singleTrackMarker){
  singleTrackMarker.eachLayer(function (layer) {
  singleTrackMarker.removeLayer(layer);

});
}

map.removeLayer(startMarkerLayer);
map.removeLayer(startMarkerHeat);
map.removeLayer(endMarkerLayer);
map.removeLayer(endMarkerHeat);
map.removeLayer(startMarkerCluster);
map.removeLayer(endMarkerCluster);
map.removeLayer(geoJsonLayer);
map.removeControl(overLayStartCon);


var boundaryPoints =[];
var oneBike =[];
data.forEach(function(doc,err){
  if(doc.bicycle_uuid == bicycle_uuid){
    oneBike.push(doc);
    console.log("reached");    //console.log(oneBike);
  }
});

for (var i = 0; i < oneBike.length-1; i++) {
  if (oneBike[i].route[0]!=null) {
    var startPoint = [];
    var lat = parseFloat(oneBike[i].route[0].latitude);
    var lng = parseFloat(oneBike[i].route[0].longitude);
    var started = getDate(oneBike[i].started);
    var bicycle_uuid = (oneBike[i].bicycle_uuid);
    var ended = getDate(oneBike[i].ended);
    var speed = getSpeed(oneBike[i].duration_sec, oneBike[i].distance_m);
    console.log ("lat" + lat +"lng" +lng);
    startPoint.push(lat);
    startPoint.push(lng);
    startMarker = L.marker(startPoint,{icon: blueIcon});
    startmarker = getPopup(startMarker, lat, lng, bicycle_uuid, "start", started, speed,0.9, true);
    startMarker.addTo(singleTrackMarker);
    break;
  }
}

for (var i = oneBike.length-1; i > 0; i--) {
  //if (oneBike[i-1].route[oneBike[i-1].route.length-1]!=null) {
    if (oneBike[i].route!=null) {
    var endPoint = [];
    var lat = parseFloat(oneBike[i].route[oneBike[i].route.length-1].latitude);
    var lng = parseFloat(oneBike[i].route[oneBike[i].route.length-1].longitude);
    var ended = getDate(oneBike[i].ended);
    console.log (lat +lng);
    endPoint.push(lat);
    endPoint.push(lng);
    endMarker = L.marker(endPoint,{icon: redIcon});
    endmarker = getPopup(endMarker, lat, lng, bicycle_uuid, "end", ended,speed, 0.9,true);
    endMarker.addTo(singleTrackMarker);
    break;
  }
}


      map.addLayer(singleTrackMarker);


oneBike.forEach(function(doc,err){
  var startPoint = [];
  if(doc.route[0]==null){
        lat=null;
        lng=null;
        console.log(doc.route[0]);
  }else{
  var lat = parseFloat(doc.route[0].latitude);
  var lng = parseFloat(doc.route[0].longitude);
  var bicycle_uuid = (doc.bicycle_uuid);
  var started = getDate(doc.started);
  var ended = getDate(doc.ended);
  var speed = getSpeed(doc.duration_sec, doc.distance_m);
  console.log(doc.route[0].longitude);
  startPoint.push(lat);
  startPoint.push(lng);
  startMarker = L.marker(startPoint,{icon: blueIcon});
  startMarker = getPopup(startMarker, lat, lng, bicycle_uuid, "start", started, speed, 0.0, true);
  startMarker.addTo(singleTrackMarker);
  var endPoint = [];
  var lat = parseFloat(doc.route[doc.route.length-1].latitude);
  var lng = parseFloat(doc.route[doc.route.length-1].longitude);
  endPoint.push(lat);
  endPoint.push(lng);
  endMarker = L.marker(endPoint,{icon: redIcon});
  endMarker = getPopup(endMarker, lat, lng, bicycle_uuid, "end", ended ,speed, 0.0, true);
  endMarker.addTo(singleTrackMarker);
  }
  //console.log("bikeID :" + bicycle_uuid);
  var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
  var polylinePoints =[];
  polylineOptions.color = hue;
  doc.route.forEach(function(doc,err){
  var lat = parseFloat(doc.latitude);
  var lng = parseFloat(doc.longitude);
  boundaryPoints.push(new L.LatLng(lat,lng));
  polylinePoints.push(new L.LatLng(lat,lng));

  });
  //console.log(polylinePoints);
  map.addLayer(singleTrackMarker);
  polyline = new L.Polyline(polylinePoints,polylineOptions);
  singleTrackMarker.addLayer(polyline);
  });

  //console.log(boundaryPoints);
  var boundary = new L.Polyline(boundaryPoints,polylineOptions);
  map.fitBounds(boundary.getBounds());
  var button = new L.Control.Button('Remove polyline');
  button.addTo(map);
  button.on('click', function () {
    //if(con == "all"){
    map.removeLayer(singleTrackMarker);
    overLayStartCon.addTo(map);
    map.removeControl(button);
    //}
    //if(con == "timeRange"){
    // map.removeLayer(singleTrackMarker);
    // overLayTimeRangeCon.addTo(map);
    // map.removeControl(button);
    //}

  });
}
