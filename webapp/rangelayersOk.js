var rangelayers = {
  getLayerTimeRange: function(pickerVal_start, pickerVal_end) {
    dataForSliders = [];
    var s_pointsArray = [];
    var e_pointsArray = [];
    var s_marker;
    var e_marker;
    data.forEach(function(doc, err) {
      s_point = [];
      e_point = [];

      if (doc.started <= (pickerVal_end / 1000) && doc.started >= (pickerVal_start / 1000)) {

        dataForSliders.push(doc);

        if (doc.route[0] == null) {
          lat = null;
          lng = null;
        } else {
          var s_lat = parseFloat(doc.route[0].latitude);
          var s_lng = parseFloat(doc.route[0].longitude);
          var e_lat = parseFloat(doc.route[doc.route.length - 1].latitude);
          var e_lng = parseFloat(doc.route[doc.route.length - 1].longitude);
          s_point.push(s_lat, s_lng);
          e_point.push(e_lat, e_lng);
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

          s_marker.addTo(startMarkerLayer);
          e_marker.addTo(endMarkerLayer);

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
    var start_heat = L.heatLayer(s_pointsArray);
    var end_heat = L.heatLayer(e_pointsArray);
    //    = showHeatMap(s_pointsArray);
    //endHeatmap = showHeatMap(e_pointsArray);
    startMarkerHeat.addLayer(start_heat);
    endMarkerHeat.addLayer(end_heat);

    map.addLayer(startMarkerLayer);


  }
};
