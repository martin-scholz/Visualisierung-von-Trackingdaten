(function() {
  $(document).ready(function() {
    var outputSpan = $("#spanOutputHours");
    $("#sliderHours").slider({
      range: true,
      min: 0,
      max: 24,
      values: [0, 24],
      slide: function(event, ui) {
        outputSpan.html(ui.values[0] + "-" + ui.values[1]);
        startMarkerLayer.clearLayers();
        endMarkerLayer.clearLayers();
        startMarkerHeat.clearLayers();
        endMarkerHeat.clearLayers();
        startClusterGroup.clearLayers();
        endClusterGroup.clearLayers();
        var s_pointsHour = [];
        var e_pointsHour = [];
        sliderHoursVal_s = ui.values[0];
        sliderHoursVal_e = ui.values[1];
        console.log("hours :" + sliderHoursVal_s);
        console.log("hours :" + sliderHoursVal_e);
        //console.log("days_s: " + sliderDaysVal_s);
        //console.log("days_e: " + sliderDaysVal_e);

        dataForSliders.forEach(function(doc, err) {
          var s_point = [];
          var e_point = [];
          if ((new Date(doc.started * 1000).getHours() >= ui.values[0] && new Date(doc.started * 1000).getHours() <= ui.values[1]) &&
            (new Date(doc.started * 1000).getDay() >= sliderDaysVal_s && new Date(doc.started * 1000).getDay() <= sliderDaysVal_e)) {
            //console.log("StartzeitenHours: " + (getDate(doc.started)));
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
              s_pointsHour.push(s_point);
              e_pointsHour.push(e_point);
              var bicycle_uuid = (doc.bicycle_uuid);
              var started = getDate(doc.started);
              var ended = getDate(doc.ended);
              var speed = getSpeed(doc.duration_sec, doc.distance_m);
              //console.log(pointsHour.length);
              s_marker = L.marker(s_point, {
                icon: blueIcon
              });
              e_marker = L.marker(e_point, {
                icon: redIcon
              });

              s_marker.addTo(startMarkerLayer);
              e_marker.addTo(endMarkerLayer);
              s_marker = getPopup(s_marker, s_lat, s_lng, bicycle_uuid, "start", started, speed, 0.9, false);
              e_marker = getPopup(e_marker, e_lat, e_lng, bicycle_uuid, "end", ended, speed, 0.9, false);
              startClusterGroup.addLayer(s_marker);
              endClusterGroup.addLayer(e_marker);
              startMarkerCluster.addLayer(startClusterGroup);
              endMarkerCluster.addLayer(endClusterGroup);
            }

          } else {
            console.log("no data available");
          }
        });
        console.log(s_pointsHour);
        var start_heat = L.heatLayer(s_pointsHour);
        var end_heat = L.heatLayer(e_pointsHour);
        //startHeatmap = showHeatMap(s_pointsHour);
        startMarkerHeat.addLayer(start_heat);
        //endHeatmap = showHeatMap(e_pointsHour);
        endMarkerHeat.addLayer(end_heat);


      }
    });
  });
}());
