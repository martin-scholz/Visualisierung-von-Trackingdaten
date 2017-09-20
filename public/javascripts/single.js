function singleTrack(bicycle_uuid){

if(singleTrackMarker){
  singleTrackMarker.eachLayer(function (layer) {
  singleTrackMarker.removeLayer(layer);

});
}
//map.removeLayer(mainLayerGroup);
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
    console.log("reached");
    //console.log(oneBike);
  }
});
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
  console.log(doc.route[0].longitude);
  startPoint.push(lat);
  startPoint.push(lng);
  startMarker = L.marker(startPoint,{icon: blueIcon});
  marker = getPopup(startMarker, lat, lng, bicycle_uuid, "start", started);
  startMarker.addTo(singleTrackMarker);
  var endPoint = [];
  var lat = parseFloat(doc.route[doc.route.length-1].latitude);
  var lng = parseFloat(doc.route[doc.route.length-1].longitude);
  endPoint.push(lat);
  endPoint.push(lng);
  endMarker = L.marker(endPoint,{icon: redIcon});
  marker = getPopup(endMarker, lat, lng, bicycle_uuid, "end", ended);
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
  var button = new L.Control.Button('Click me');
  button.addTo(map);
  button.on('click', function () {
    map.removeLayer(singleTrackMarker);
    overLayStartCon.addTo(map);
    map.removeControl(button);

  });
}
