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
        var pointsHour = [];
        sliderHoursVal_s = ui.values[0];
        sliderHoursVal_e = ui.values[1];

        console.log("days_s: " + sliderDaysVal_s);
        console.log("days_e: " + sliderDaysVal_e);

        dataForSliders.forEach(function(doc, err) {
          point = [];
          if ((new Date(doc.started * 1000).getHours() >= ui.values[0] && new Date(doc.started * 1000).getHours() <= ui.values[1]) &&
            (new Date(doc.started * 1000).getDay() >= sliderDaysVal_s && new Date(doc.started * 1000).getDay() <= sliderDaysVal_e)) {
            console.log("StartzeitenHours: " + (getDate(doc.started)));
            if (doc.route[0] == null) {
              lat = 52.521079;
              lng = 13.378048;
            } else {
              var lat = parseFloat(doc.route[0].latitude);
              var lng = parseFloat(doc.route[0].longitude);
              point.push(lat);
              point.push(lng);
              pointsHour.push(point);
              var bicycle_uuid = (doc.bicycle_uuid);
              var started = getDate(doc.started);
              var ended = getDate(doc.ended);
              var speed = getSpeed(doc.duration_sec, doc.distance_m);
              //console.log(pointsHour.length);
              marker = L.marker(point, {
                icon: yellowIcon
              });

              marker.addTo(startMarkerLayer);
              marker = getPopup(marker, lat, lng, bicycle_uuid, "start", started, speed, 0.9, false);
              startClusterGroup.addLayer(marker);
              startMarkerCluster.addLayer(startClusterGroup);

            }

          } else {
            console.log("no data available");
          }
        });

        startHeatmap = showHeatMap(pointsHour);
        startMarkerHeat.addLayer(startHeatmap);
      }
    });
  });
}());
