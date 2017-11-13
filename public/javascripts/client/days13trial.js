(function() {
  $(document).ready(function() {
    var outputSpan = $("#spanOutputDays");
    $("#sliderDays").slider({
      range: true,
      min: 1,
      max: 13,
      values: [ 1, 13],
      slide: function(event, ui) {
          //ui.values.forEach(function(doc, err) {
        switch (ui.values[0]) {
          case 1:
            day1 = "So";
            sliderDaysVal_s = 0;
            break;
          case 2:
            day1 = "Mo";
            sliderDaysVal_s = 1;
            break;
          case 3:
            day1 = "Di";
            sliderDaysVal_s = 2;
            break;
          case 4:
            day1 = "Mi";
            sliderDaysVal_s = 3;
            break;
          case 5:
            day1 = "Do";
            sliderDaysVal_s = 4;
            break;
          case 6:
            day1 = "Fr";
            sliderDaysVal_s = 5;
            break;
          case 7:
            day1 = "Sa";
            sliderDaysVal_s = 6;
            break;
          case 8:
            day1 = "So";
            sliderDaysVal_s = 0;
            break;
          case 9:
            day1 = "Mo";
            sliderDaysVal_s = 1;
            break;
          case 10:
            day1 = "Di";
            sliderDaysVal_s = 2;
            break;
          case 11:
            day1 = "Mi";
            sliderDaysVal_s = 3;
            break;
          case 12:
            day1 = "Do";
            sliderDaysVal_s = 4;
            break;
          case 13:
            day1 = "Fr";
            sliderDaysVal_s = 5;
        }
    //  });
        switch (ui.values[1]) {
          case 1:
            day2 = "So";
            sliderDaysVal_s = 0;
            break;
          case 2:
            day2 = "Mo";
            sliderDaysVal_s = 1;
            break;
          case 3:
            day2 = "Di";
            sliderDaysVal_s = 2;
            break;
          case 4:
            day2 = "Mi";
            sliderDaysVal_s = 3;
            break;
          case 5:
            day2 = "Do";
            sliderDaysVal_s = 4;
            break;
          case 6:
            day2 = "Fr";
            sliderDaysVal_s = 5;
            break;
          case 7:
            day2 = "Sa";
            sliderDaysVal_s = 6;
            break;
          case 8:
            day2 = "So";
            sliderDaysVal_s = 0;
            break;
          case 9:
            day2 = "Mo";
            sliderDaysVal_s = 1;
            break;
          case 10:
            day2 = "Di";
            sliderDaysVal_s = 2;
            break;
          case 11:
            day2 = "Mi";
            sliderDaysVal_s = 3;
            break;
          case 12:
            day2 = "Do";
            sliderDaysVal_s = 4;
            break;
          case 13:
            day2 = "Fr";
            sliderDaysVal_s = 5;
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
        console.log("days :" + sliderDaysVal_s);
        console.log("days :" + sliderDaysVal_e);


        //console.log(startMarkerTwentyFourHours);
        //if(data.started <= new Datee().getTime()/1000 && data.started >= (new Date().getTime()/1000)-604800){
        //data.forEach(function(doc, err) {
        dataForSliders.forEach(function(doc, err) {
          s_point = [];
          e_point = [];
          if ((new Date(doc.started * 1000).getDay() >= sliderDaysVal_s - 1 && new Date(doc.started * 1000).getDay() <= sliderDaysVal_e - 1) &&
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
                icon: blueIcon
              });
              e_marker = L.marker(e_point, {
                icon: redIcon
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
