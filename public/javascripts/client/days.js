(function() {
  $(document).ready(function() {
    var outputSpan = $("#spanOutputDays");
    $("#sliderDays").slider({
      range: true,
      min: 1,
      max: 7,
      values: [ 1, 7],
      slide: function(event, ui) {

        switch (ui.values[0]) {
          case 1:
            day1 = "So";
            break;
          case 2:
            day1 = "Mo";
            break;
          case 3:
            day1 = "Di";
            break;
          case 4:
            day1 = "Mi";
            break;
          case 5:
            day1 = "Do";
            break;
          case 6:
            day1 = "Fr";
            break;
          case 7:
            day1 = "Sa";
        }
        switch (ui.values[1]) {
          case 1:
            day2 = "So";
            break;
          case 2:
            day2 = "Mo";
            break;
          case 3:
            day2 = "Di";
            break;
          case 4:
            day2 = "Mi";
            break;
          case 5:
            day2 = "Do";
            break;
          case 6:
            day2 = "Fr";
            break;
          case 7:
            day2 = "Sa";
        }

        outputSpan.html(day1 + "-" + day2);
        startMarkerLayer.clearLayers();
        endMarkerLayer.clearLayers();
        startMarkerHeat.clearLayers();
        endMarkerHeat.clearLayers();
        startClusterGroup.clearLayers();
        endClusterGroup.clearLayers();
        var s_pointsDay = [];
        var e_pointsDay = [];
        sliderDaysVal_s = ui.values[0] - 1;
        sliderDaysVal_e = ui.values[1] - 1;
        console.log("hour_s: " + sliderHoursVal_s);
        console.log("hour_e: " + sliderHoursVal_e);

        //console.log(startMarkerTwentyFourHours);
        //if(data.started <= new Datee().getTime()/1000 && data.started >= (new Date().getTime()/1000)-604800){
        //data.forEach(function(doc, err) {
        dataForSliders.forEach(function(doc, err) {
          s_point = [];
          e_point = [];
          if ((new Date(doc.started * 1000).getDay() >= ui.values[0] - 1 && new Date(doc.started * 1000).getDay() <= ui.values[1] - 1) &&
            (new Date(doc.started * 1000).getHours() >= sliderHoursVal_s && new Date(doc.started * 1000).getHours() <= sliderHoursVal_e)) {
            console.log("StartzeitenDays: " + (getDate(doc.started)));
            if (doc.route[0] == null) {
              lat = null;
              lng = null;
            } else {
              var s_lat = parseFloat(doc.route[0].latitude);
              var s_lng = parseFloat(doc.route[0].longitude);
              var e_lat = parseFloat(doc.route[doc.route.length - 1].latitude);
              var e_lng = parseFloat(doc.route[doc.route.length - 1].longitude);
              console.log("lat: ")
              s_point.push(s_lat, s_lng);
              e_point.push(e_lat, e_lng);
              s_pointsDay.push(s_point);
              e_pointsDay.push(e_point);
              var bicycle_uuid = (doc.bicycle_uuid);
              var started = getDate(doc.started);
              var ended = getDate(doc.ended);
              var speed = getSpeed(doc.duration_sec, doc.distance_m);
              //console.log(pointsTwentyFour.length);
              s_marker = L.marker(s_point, {
                icon: yellowIcon
              });
              e_marker = L.marker(e_point, {
                icon: blackIcon
              });
              //marker = getPopup(marker, lat, lng, bicycle_uuid,"start", started);
              s_marker.addTo(startMarkerLayer);
              s_marker = getPopup(s_marker, s_lat, s_lng, bicycle_uuid, "start", started, speed, 0.9, false);
              e_marker.addTo(endMarkerLayer);
              e_marker = getPopup(e_marker, e_lat, e_lng, bicycle_uuid, "end", ended, speed, 0.9, false);
              startClusterGroup.addLayer(s_marker);
              startMarkerCluster.addLayer(startClusterGroup);
              endClusterGroup.addLayer(e_marker);
              endMarkerCluster.addLayer(endClusterGroup);
            }



          } else {
            console.log("no data available");
          }
        });
      console.log(s_pointsDay);
        startHeatmap = showHeatMap(s_pointsDay);
        startMarkerHeat.addLayer(startHeatmap);
        endHeatmap = showHeatMap(e_pointsDay);
        endMarkerHeat.addLayer(endHeatmap);

      }
    });
  });
}());
