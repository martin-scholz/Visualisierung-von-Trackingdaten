function singleTrack(con, bicycle_uuid){
console.log("zwei");
if(singleTrackMarker){
  singleTrackMarker.eachLayer(function (layer) {
  singleTrackMarker.removeLayer(layer);

});
}

map.removeLayer(startMarkerLayer);
map.removeLayer(markerAverageHour);
map.removeLayer(startMarkerHeat);
map.removeLayer(endMarkerLayer);
map.removeLayer(endMarkerHeat);
map.removeLayer(startMarkerCluster);
map.removeLayer(endMarkerCluster);
map.removeLayer(geoJsonLayer);
//if(con == "all"){
map.removeControl(overLayStartCon);
//}
// if(con == "timeRange"){
// map.removeControl(overLayTimeRangeCon);
// }

var boundaryPoints =[];
var oneBike =[];
data.forEach(function(doc,err){
  if(doc.bicycle_uuid == bicycle_uuid){
    oneBike.push(doc);
    console.log("reached");    //console.log(oneBike);
  }
});

// for (var i = 0; i < oneBike.length-1; i++) {
//   if (oneBike[i].route[0]!=null) {
//     var startPoint = [];
//     var lat = parseFloat(oneBike[i].route[0].latitude);
//     var lng = parseFloat(oneBike[i].route[0].longitude);
//     var started = getDate(oneBike[i].started);
//     console.log (lat +lng);
//     startPoint.push(lat);
//     startPoint.push(lng);
//     startMarker = L.marker(startPoint,{icon: blueIcon});
//     startmarker = getPopup(startMarker, lat, lng, bicycle_uuid, "start", started,"single", 0.9);
//     startMarker.addTo(singleTrackMarker);
//     break;
//   }
// }
//
// for (var i = oneBike.length-1; i > 0; i--) {
//   //if (oneBike[i-1].route[oneBike[i-1].route.length-1]!=null) {
//     if (oneBike[i-1].route!=null) {
//     var endPoint = [];
//     var lat = parseFloat(oneBike[i].route[oneBike[i].route.length-1].latitude);
//     var lng = parseFloat(oneBike[i].route[oneBike[i].route.length-1].longitude);
//     var ended = getDate(oneBike[i].ended);
//     console.log (lat +lng);
//     endPoint.push(lat);
//     endPoint.push(lng);
//     endMarker = L.marker(endPoint,{icon: redIcon});
//     endmarker = getPopup(endMarker, lat, lng, bicycle_uuid, "end", ended,"single", 0.9);
//     endMarker.addTo(singleTrackMarker);
//     break;
//   }
// }


oneBike.forEach(function(doc,err){
  var startPoint = [];
  if(doc.route[0]==null){
        lat=52.521079;
        lng=13.378048;
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
  startMarker = getPopup(startMarker, lat, lng, bicycle_uuid, "start", started, speed, 0.9);
  startMarker.addTo(singleTrackMarker);
  var endPoint = [];
  var lat = parseFloat(doc.route[doc.route.length-1].latitude);
  var lng = parseFloat(doc.route[doc.route.length-1].longitude);
  endPoint.push(lat);
  endPoint.push(lng);
  endMarker = L.marker(endPoint,{icon: redIcon});
  endMarker = getPopup(endMarker, lat, lng, bicycle_uuid, "end", ended ,speed, 0.9);
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
