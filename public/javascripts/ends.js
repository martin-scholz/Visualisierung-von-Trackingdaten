function ends(data){
var epoints =[];


data.forEach(function(doc,err){
var epoint=[];
//console.log("reached");
//console.log(doc);

if(doc.route[0]==null){
      lat=52.521079;
      lng=13.378048;
    }else{
var lat = parseFloat(doc.route[doc.route.length-1].latitude);
var lng = parseFloat(doc.route[doc.route.length-1].longitude);
          epoint.push(lat);
          epoint.push(lng);
//var lng = parseFloat(doc.bicycle_uuid);
var bicycle_uuid = (doc.bicycle_uuid);
var ended = getDate(doc.ended);
//console.log(bicycle_uuid);
epoints.push(epoint);

marker = L.marker(epoint,{icon: redIcon});

marker = getPopup(marker, lat, lng, bicycle_uuid, "end", ended);

marker.addTo(endMarkerLayer);
endClusterGroup.addLayer(marker);
}
});
endHeatmap = showHeatMap(epoints);
endMarkerHeat.addLayer(endHeatmap);
endMarkerCluster.addLayer(endClusterGroup);
}

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
