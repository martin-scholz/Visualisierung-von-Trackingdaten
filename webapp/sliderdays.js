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
        clearLayers(layerGroupClear);

        sliderDaysVal_s = ui.values[0] - 1;
        sliderDaysVal_e = ui.values[1] - 1;
        console.log("hour_s: " + sliderHoursVal_s);
        console.log("hour_e: " + sliderHoursVal_e);

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
              var bicycle_uuid = (doc.bicycle_uuid);
              var started = getDate(doc.started);
              var ended = getDate(doc.ended);
              var speed = getSpeed(doc.duration_sec, doc.distance_m);
              createlayers.createLayers(s_lat, s_lng,e_lat, e_lng,bicycle_uuid, started,ended, speed, );
            }
          } else {
            console.log("no data available");
          }
        });
      createlayers.createHeatLayer();
      }
    });
  });
}());
