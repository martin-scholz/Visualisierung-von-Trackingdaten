//erstellt die Marker, Befüllt die Ebenen Marker, Heatmao, Cluster-Marker
var createlayers = {
  s_pointsArray: [],
  e_pointsArray: [],

  //Erstellt die Ebenen Marker und Cluster-Marker
  createLayers: function(s_lat, s_lng, e_lat, e_lng, bicycle_uuid, started, ended, speed) {
    var s_point = [];
    var e_point = [];
    s_point.push(s_lat, s_lng);
    e_point.push(e_lat, e_lng);
    this.s_pointsArray.push(s_point);
    this.e_pointsArray.push(e_point);

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

    s_marker.addTo(startMarkerLayer);
    e_marker.addTo(endMarkerLayer);

    s_marker = markerFunctions(s_marker, s_lat, s_lng, bicycle_uuid, "start", started, speed, 0.9, false);
    e_marker = markerFunctions(e_marker, e_lat, e_lng, bicycle_uuid, "end", ended, speed, 0.9, false);
    s_marker_cluster = markerFunctions(s_marker_cluster, s_lat, s_lng, bicycle_uuid, "start", started, speed, 0.9, false);
    e_marker_cluster = markerFunctions(e_marker_cluster, e_lat, e_lng, bicycle_uuid, "end", ended, speed, 0.9, false);


    startClusterGroup.addLayer(s_marker_cluster);
    endClusterGroup.addLayer(e_marker_cluster);
    startMarkerCluster.addLayer(startClusterGroup);
    endMarkerCluster.addLayer(endClusterGroup);
  },

  //Erstellt die Ebene Heatmap
  createHeatLayer: function(){
    var start_heat = L.heatLayer(createlayers.s_pointsArray);
    var end_heat = L.heatLayer(createlayers.e_pointsArray);
    startMarkerHeat.addLayer(start_heat);
    endMarkerHeat.addLayer(end_heat);
      createlayers.s_pointsArray = [];
      createlayers.e_pointsArray = [];


  }


}
