(function () {
$(document).ready(function(){
var outputSpan = $("#spanOutput");
$("#slider").slider({
range:true,
min:0,
max:24,
slide:function(event, ui){
outputSpan.html(ui.values[0]+"-" +ui.values[1]);
startMarkerTwentyFourHours.clearLayers();
// map.removeLayer(startMarkerLayer);
// map.removeLayer(startMarkerHeat);
// map.removeLayer(endMarkerLayer);
// map.removeLayer(endMarkerHeat);
// map.removeLayer(startMarkerCluster);
// map.removeLayer(endMarkerCluster);
// map.removeLayer(geoJsonLayer);
// map.removeLayer(startMarkerTwentyFourHours);
map.removeLayer(mainLayerGroup);
console.log(startMarkerTwentyFourHours  + "hallo");
//if(data.started <= new Date().getTime()/1000 && data.started >= (new Date().getTime()/1000)-604800){
data.forEach(function(doc,err){
  point = [];
  if(new Date(doc.started *1000).getHours()>= ui.values[0] && new Date(doc.started *1000).getHours()<= ui.values[1]){
    if(doc.route[0]==null){
          lat=52.521079;
          lng=13.378048;
        }else{
    var lat = parseFloat(doc.route[0].latitude);
    var lng = parseFloat(doc.route[0].longitude);
              point.push(lat);
              point.push(lng);
  pointsTwentyFour.push(point);
  console.log(pointsTwentyFour.length);
  marker = L.marker(point,{icon: yellowIcon});
  //marker = getPopup(marker, lat, lng, bicycle_uuid,"start", started);
  marker.addTo(startMarkerTwentyFourHours);
}

}else{
  console.log("no data available");
}
});
map.addLayer(startMarkerTwentyFourHours);
}
});
});
}());
