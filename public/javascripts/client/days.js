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
        var pointsDay = [];
        sliderDaysVal_s = ui.values[0] - 1;
        sliderDaysVal_e = ui.values[1] - 1;
        console.log("hour_s: " + sliderHoursVal_s);
        console.log("hour_e: " + sliderHoursVal_e);

        //console.log(startMarkerTwentyFourHours);
        //if(data.started <= new Datee().getTime()/1000 && data.started >= (new Date().getTime()/1000)-604800){
        //data.forEach(function(doc, err) {
        dataForSliders.forEach(function(doc, err) {
          point = [];
          if ((new Date(doc.started * 1000).getDay() >= ui.values[0] - 1 && new Date(doc.started * 1000).getDay() <= ui.values[1] - 1) &&
            (new Date(doc.started * 1000).getHours() >= sliderHoursVal_s && new Date(doc.started * 1000).getHours() <= sliderHoursVal_e)) {
            console.log("StartzeitenDays: " + (getDate(doc.started)));
            if (doc.route[0] == null) {
              lat = 52.521079;
              lng = 13.378048;
            } else {
              var lat = parseFloat(doc.route[0].latitude);
              var lng = parseFloat(doc.route[0].longitude);
              console.log("lat: ")
              point.push(lat);
              point.push(lng);
              pointsDay.push(point);
              var bicycle_uuid = (doc.bicycle_uuid);
              var started = getDate(doc.started);
              var ended = getDate(doc.ended);
              var speed = getSpeed(doc.duration_sec, doc.distance_m);
              //console.log(pointsTwentyFour.length);
              marker = L.marker(point, {
                icon: yellowIcon
              });
              //marker = getPopup(marker, lat, lng, bicycle_uuid,"start", started);
              marker.addTo(startMarkerLayer);
              marker = getPopup(marker, lat, lng, bicycle_uuid, "start", started, speed, 0.9, false);
              startClusterGroup.addLayer(marker);
              startMarkerCluster.addLayer(startClusterGroup);
            }



          } else {
            console.log("no data available");
          }
        });
        //map.addLayer(markerAverageDays);
        startHeatmap = showHeatMap(pointsDay);
        startMarkerHeat.addLayer(startHeatmap);
      }
    });
  });
}());
